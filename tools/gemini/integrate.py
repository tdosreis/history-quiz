#!/usr/bin/env python3
"""Swap the reviewed paintings from the gemini-batch staging tree into the app.

  python3 tools/gemini/integrate.py <staging ai-batch dir> [--reject tools/gemini/reject.txt] [--dry]
  python3 tools/history/build.py          # then rebuild index.html from the data

Every staged painting whose status is ok, and which is not on the reject list,
is written to img/ under a NEW content-hashed name, and the figure's or
monument's entry in data/history_images.json / history_monument_images.json is
pointed at it. A new name, not the old one overwritten: the service worker keeps
pictures cache-first for ever on the strength of their names never changing, so
a painting saved over a photograph's file would never reach a phone that had
already cached the photograph. The credit stays the source's (the painting is
made from it) and is marked "painted".

Rejected or failed paintings keep their original picture — the app never shows
a blank. The old files are deleted once nothing names them; git history keeps
them, and reverting the commit restores everything.
"""
import argparse, glob, hashlib, json, os, sys
import cv2

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
DATA = {'figure': 'history_images.json', 'monument': 'history_monument_images.json'}
CAP = {'figure': 640, 'monument': 640}   # as large as the app ever draws it, at 2x


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('stage')
    ap.add_argument('--reject', default=os.path.join(HERE, 'reject.txt'))
    ap.add_argument('--dry', action='store_true')
    ap.add_argument('--kinds', default='figure,monument')
    a = ap.parse_args()
    reject = set()
    if a.reject and os.path.exists(a.reject):
        reject = {l.split('#')[0].strip() for l in open(a.reject) if l.split('#')[0].strip()}
    data = {k: json.load(open(os.path.join(ROOT, 'data', f), encoding='utf-8')) for k, f in DATA.items()}
    by_img = {(k, v['img']): i for k in data for i, v in data[k].items() if v.get('img')}
    done = skipped = 0
    retired = []
    for st in sorted(glob.glob(os.path.join(a.stage, 'status', '**', '*.json'), recursive=True)):
        r = json.load(open(st))
        rel, kind = r['path'], r['kind']
        if not r.get('ok') or rel in reject or (r.get('id') or '') in reject or kind not in a.kinds.split(','):
            skipped += 1
            continue
        key = r.get('id') or by_img.get((kind, rel))
        if not key or key not in data.get(kind, {}) or data[kind][key].get('img') != rel:
            skipped += 1       # the app no longer uses this picture, or it was swapped already
            continue
        im = cv2.imread(os.path.join(a.stage, rel), cv2.IMREAD_UNCHANGED)
        if im is None:
            skipped += 1
            continue
        h, w = im.shape[:2]
        if max(h, w) > CAP[kind]:
            k = CAP[kind] / max(h, w)
            im = cv2.resize(im, (round(w * k), round(h * k)), interpolation=cv2.INTER_AREA)
        ok, buf = cv2.imencode('.webp', im, [cv2.IMWRITE_WEBP_QUALITY, 86])
        if not ok:
            skipped += 1
            continue
        blob = buf.tobytes()
        new = 'img/%s.webp' % hashlib.sha1(blob).hexdigest()[:16]
        if not a.dry:
            open(os.path.join(ROOT, new), 'wb').write(blob)
        entry = data[kind][key]
        entry.setdefault('source_img', rel)
        entry['img'] = new
        entry['painted'] = r.get('model', 'gemini')
        retired.append(rel)
        done += 1
    if not a.dry:
        for k, f in DATA.items():
            json.dump(data[k], open(os.path.join(ROOT, 'data', f), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        still = {v['img'] for k in data for v in data[k].values() if v.get('img')}
        for rel in retired:
            if rel not in still and os.path.exists(os.path.join(ROOT, rel)):
                os.remove(os.path.join(ROOT, rel))
    print(f'{done} paintings swapped in, {skipped} kept as they were'
          + ('' if a.dry else ' — now run python3 tools/history/build.py'))


if __name__ == '__main__':
    main()
