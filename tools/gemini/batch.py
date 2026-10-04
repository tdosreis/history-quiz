#!/usr/bin/env python3
"""Repaint every raster picture in the app with a Gemini image model, into a
staging tree — never over the live images.

What gets painted, and how:
  figure    the album's portraits (data/history_images.json)   -> atelier_full, the
            hand Futebol Quiz's players were painted in; BUSTS decides whether a
            sculpture stays a sculpture (default) or comes alive (paint_test.py)
  monument  the monuments sheet (data/history_monument_images.json) -> the same hand,
            for places: ruins, temples, towers, landscapes

The brasões of the states and the flags of the nations are drawn in SVG by the
app itself, so there is no raster emblem or flag to repaint here.

Output: OUT/<same relative path as the source>, as .webp, cropped to the
source's proportions; OUT/status/<path>.json records how each one went.
An image whose output already exists is skipped, so a run that stops can
simply be started again. FORCE lists paths to redo regardless.
tools/gemini/integrate.py swaps the reviewed paintings into the app.

Environment:
  GEMINI_API_KEY   required, never printed
  GEMINI_MODEL     default gemini-3-pro-image-preview
  KINDS            comma list of kinds to do (default: figure,monument)
  BUSTS            sculpture (default) or alive
  SHARD, SHARDS    do only items i where i % SHARDS == SHARD
  ONLY             comma list of source paths, figure ids or monument keys (overrides kinds)
  FORCE            comma list of source paths, figure ids or monument keys to redo
  OUT              staging root (default ai-batch)
  COMMIT_EVERY     if set, call ./publish.sh every N new images
  LIMIT            stop after this many new images (0 = no limit)
"""
import base64, json, os, subprocess, sys, time

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
sys.path.insert(0, HERE)
import paint_test as pt          # the portrait prompts and the API call
from fill_edges import finish

MONUMENT = """Repaint this photograph as a museum-quality hand-painted picture, in the manner of a \
contemporary master painter working in gouache and watercolour on heavy cold-press paper. This is a \
complete re-rendering in paint, not a filter: there must be no photographic detail left anywhere — \
stone, columns, domes, walls, sky, water, trees, people and signs are all rebuilt from visible \
brushstrokes, simplified into confident painted planes, broken edges and loose washes, the way a \
travelling painter of the Grand Tour would paint the place on location.

The main subject — the monument, ruin, temple, tower, wall or building the photo is of — is fully and \
confidently painted with expressive visible brushstrokes, sculpted light and shadow and crisp highlights, \
its architecture exact. Secondary areas loosen into soft washes and gestural strokes in the photo's own \
colours, with wet-in-wet blooms and layered glazes; the paper grain shows through the thin washes.

Preserve exactly: the composition, framing and crop, the architecture and every object, any people \
and their poses, the colours and the time of day. Add no lettering and keep none that is not carved \
into the monument itself.

Full bleed, painted on a toned ground: no white paper anywhere, every edge and corner solid paint, \
as if cropped from a larger canvas. No vignette, border, frame or signature. It must read \
unmistakably as a painting, never as a filtered photograph. Return only the image."""


def load(name):
    p = os.path.join(ROOT, 'data', name)
    return json.load(open(p, encoding='utf-8')) if os.path.exists(p) else {}


def manifest():
    """every raster picture the app uses -> kind, and id -> path for ONLY/FORCE"""
    items, by_id = {}, {}
    for fid, v in load('history_images.json').items():
        if v.get('img') and os.path.exists(os.path.join(ROOT, v['img'])):
            items[v['img']] = 'figure'; by_id[fid] = v['img']
    for key, v in load('history_monument_images.json').items():
        if v.get('img') and os.path.exists(os.path.join(ROOT, v['img'])):
            items[v['img']] = 'monument'; by_id[key] = v['img']
    return items, by_id


def prompt(kind):
    return pt.prompt_for('atelier_full') if kind == 'figure' else MONUMENT


def fit_to(img, w, h):
    """centre-crop to the source's proportions"""
    ih, iw = img.shape[:2]
    if iw / ih > w / h:
        nw = int(ih * w / h); x = (iw - nw) // 2; img = img[:, x:x + nw]
    else:
        nh = int(iw * h / w); y = (ih - nh) // 2; img = img[y:y + nh]
    return img


def postprocess(kind, data, src_path):
    import cv2, numpy as np
    img = cv2.imdecode(np.frombuffer(data, np.uint8), cv2.IMREAD_COLOR)
    if img is None:
        raise RuntimeError('undecodable image')
    srcim = cv2.imread(src_path, cv2.IMREAD_UNCHANGED)
    sh, sw = srcim.shape[:2]
    img, info = finish(img)
    img = fit_to(img, sw, sh)
    # keep it light: never smaller than the source, at most 720px long side
    h, w = img.shape[:2]
    scale = max(min(1.0, 720 / max(h, w)), min(1.0, max(sh, sw) / max(h, w)))
    if scale < 1:
        img = cv2.resize(img, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)
    ok, buf = cv2.imencode('.webp', img, [cv2.IMWRITE_WEBP_QUALITY, 86])
    if not ok:
        raise RuntimeError('encode failed')
    return buf.tobytes(), info


def main():
    key = os.environ.get('GEMINI_API_KEY', '').strip()
    if not key:
        sys.exit('GEMINI_API_KEY is not set')
    model = os.environ.get('GEMINI_MODEL', '').strip() or 'gemini-3-pro-image-preview'
    out = os.environ.get('OUT') or 'ai-batch'
    kinds = set(x for x in (os.environ.get('KINDS') or 'figure,monument').split(',') if x)
    shard, shards = int(os.environ.get('SHARD') or 0), int(os.environ.get('SHARDS') or 1)
    limit = int(os.environ.get('LIMIT') or 0)
    every = int(os.environ.get('COMMIT_EVERY') or 0)
    items, by_id = manifest()
    resolve = lambda s: by_id.get(s.strip(), s.strip())
    only = [resolve(x) for x in (os.environ.get('ONLY') or '').split(',') if x.strip()]
    force = set(resolve(x) for x in (os.environ.get('FORCE') or '').split(',') if x.strip())
    todo = [p for p in sorted(items) if (p in only if only else items[p] in kinds)]
    todo = [p for i, p in enumerate(todo) if i % shards == shard]
    ids = {v: k for k, v in by_id.items()}
    print(f'{len(items)} pictures in the app; this shard: {len(todo)} ({", ".join(sorted(kinds)) if not only else "selected"})')
    done = new = failed = 0
    for rel in todo:
        dst = os.path.join(out, rel)
        st = os.path.join(out, 'status', rel + '.json')
        if os.path.exists(dst) and rel not in force:
            done += 1
            continue
        kind = items[rel]
        t0 = time.time()
        rec = {'path': rel, 'kind': kind, 'model': model, 'id': ids.get(rel),
               'busts': os.environ.get('BUSTS', '').strip() or 'sculpture' if kind == 'figure' else None}
        try:
            raw = open(os.path.join(ROOT, rel), 'rb').read()
            pt.PROMPT_TEXT = prompt(kind)
            res = pt.call(model, key, raw, 'image/webp', attempts=6)
            parts = (res.get('candidates') or [{}])[0].get('content', {}).get('parts', [])
            img = next((p.get('inlineData') or p.get('inline_data') for p in parts
                        if p.get('inlineData') or p.get('inline_data')), None)
            if not img:
                raise RuntimeError(f"no image ({(res.get('candidates') or [{}])[0].get('finishReason')})")
            data, info = postprocess(kind, base64.b64decode(img['data']), os.path.join(ROOT, rel))
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            open(dst, 'wb').write(data)
            rec.update(ok=True, seconds=round(time.time() - t0, 1), edges=info)
            new += 1
            print(f'✓ {rel} [{kind} {ids.get(rel, "")}] {time.time() - t0:.0f}s', flush=True)
        except Exception as e:
            rec.update(ok=False, error=str(e)[:400])
            failed += 1
            print(f'✗ {rel} [{kind} {ids.get(rel, "")}] {str(e)[:200]}', flush=True)
            if 'HTTP 402' in str(e) or 'HTTP 403' in str(e):
                # no credit (or no access): every call after this fails the same way
                os.makedirs(os.path.dirname(st), exist_ok=True)
                json.dump(rec, open(st, 'w'), ensure_ascii=False)
                print('stopping: the Gemini account has no credit for this model', flush=True)
                break
        os.makedirs(os.path.dirname(st), exist_ok=True)
        json.dump(rec, open(st, 'w'), ensure_ascii=False)
        if every and new and new % every == 0:
            subprocess.run([os.path.join(HERE, 'publish.sh'), f'{new} more'], check=False)
        if limit and new >= limit:
            break
    print(f'shard {shard}/{shards}: {new} painted, {done} already done, {failed} failed')


if __name__ == '__main__':
    main()
