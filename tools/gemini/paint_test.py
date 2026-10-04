#!/usr/bin/env python3
"""Gemini image-to-image test: repaint a few album pictures of historical
figures in the atelier hand (gouache and watercolour), into a test folder.

Nothing in img/ is touched. The script reads the pictures the album uses
(data/history_images.json), sends each one with the style prompt to a Gemini
image model, and writes the results — plus the originals and a side-by-side
sheet — to OUT.

The album's sources are not all photographs, as Futebol Quiz's were: they are
oil paintings, engravings, busts, statues, coins and a few photographs. The
prompt says so, and BUSTS decides what a sculpture becomes:
  sculpture  (default) the bust stays a bust, painted as a sculpture — nothing
             about the face is invented
  alive      the person the sculpture portrays, painted as a living face with
             natural skin — more vivid, but the painter fills in what stone
             cannot show; review these closely

Environment:
  GEMINI_API_KEY  required; read from the environment and never printed
  GEMINI_MODEL    image model id (default gemini-3-pro-image-preview)
  STYLE           atelier_full (default: full bleed), atelier (dissolving into
                  bare paper) or gouache (smooth editorial gouache, edge to edge)
  BUSTS           sculpture (default) or alive
  FIGURES         comma-separated album ids (default: five representative ones)
  OUT             output folder (default ai-test/local)
"""
import base64, json, os, re, sys, time, urllib.request, urllib.error

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
API = 'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent'
# an oil painting, a marble bust, a b/w photograph, a gold mask, an engraving
DEFAULT_FIGURES = 'napoleao,cesar,einstein,tutancamon,tiradentes'

# What every style keeps: the person, exactly as the source shows them.
IDENTITY = """Preserve, exactly as in the source picture: the person's identity and exact facial structure, \
eyes, apparent age, hairstyle, facial hair, expression, head angle, pose, body proportions and clothing \
(robes, armour, uniform, crown, jewels, insignia and every period detail). The result must remain \
immediately recognizable as the same historical figure, as this picture portrays them. Facial hair stays \
exactly as shown — never add a beard or moustache. Where the face is small in the frame, paint it with \
extra care from the source's own features rather than inventing them. A black-and-white photograph or an \
engraving becomes a monochrome painting (ink, charcoal and grey washes); a colour source keeps its colours.
Do not: add anime features, enlarge the eyes, caricature, beautify, slim, de-age, modernise the clothing, \
change facial proportions, change the identity, add or remove people, add text, captions, coins, frames, \
inscriptions or signatures of any kind. Return only the image."""

SOURCE = {
    # the default: what the source shows stays what it is
    'sculpture': """The source may be a photograph, an oil painting, an engraving, a coin, a mask, a bust or \
a statue. Whatever it is, paint what it shows: a painting or photograph of a person becomes a painted \
portrait of that person; a bust, statue, mask or coin stays that object — painted stone, bronze or gold \
with its own colour and wear, the light falling on it as in the source — never turned into living skin.""",
    # brings the sculpture to life: more vivid, but invents what stone cannot show
    'alive': """The source may be a photograph, an oil painting, an engraving, a coin, a mask, a bust or a \
statue. Whatever it is, paint the living person it portrays: a bust, statue or mask becomes that same face \
alive, with natural skin, eyes with irises and the hair coloured as is plausible for the person and era, \
keeping every feature, the proportions, the expression and the angle of the sculpture exactly. Where the \
sculpture is broken (a missing nose, an ear), restore it plainly and soberly.""",
}

STYLES = {
    'atelier': """Repaint this picture as a museum-quality hand-painted portrait study, in the manner of a \
contemporary master portrait painter working in gouache and watercolour on heavy cold-press paper.
The subject — face, hair, shoulders and clothing — is fully and confidently painted: sculpted planes of \
light and shadow, expressive visible brushstrokes, warm glazes with cool shadow notes, crisp highlights. \
Away from the subject the painting deliberately loosens: the background is re-imagined as soft abstract \
washes and a few gestural strokes in colours taken from the source, with wet-in-wet blooms and drips, \
and towards the outer edges the paint thins and dissolves into bare, textured off-white paper, as in an \
unfinished artist's study. The paper grain shows through the thin washes. It must read unmistakably as \
a painting, never as a filtered photograph or a copy of the old picture.""",
    # the approved look of Futebol Quiz: the same hand, washes reaching every edge
    'atelier_full': """Repaint this picture as a museum-quality hand-painted portrait, in the manner of a \
contemporary master portrait painter working in gouache and watercolour on heavy cold-press paper.
The subject — face, hair, shoulders and clothing — is fully and confidently painted: sculpted planes of \
light and shadow, expressive visible brushstrokes, warm glazes with cool shadow notes, crisp \
highlights. Away from the subject the painting deliberately loosens: the background is re-imagined as \
soft abstract washes and gestural strokes in colours taken from the source, with wet-in-wet blooms, \
layered glazes and a few drips. The paper grain shows through the thin washes.
Full bleed, painted on a toned ground: the artist first covered the whole sheet with a wash in the \
source's own background colours, so there is no white paper anywhere in the picture. Every edge and every \
corner is solid paint — background washes, strokes and blooms run straight off all four sides of the \
image, as if the painting were cropped from a larger canvas. No vignette, no white or cream border, no \
unpainted margin, no fade-out, no drips ending on white paper, no museum frame. Keep the original framing \
and crop. It must read unmistakably as a fresh painting, never as a filtered photograph or a copy of \
the old picture.""",
    'gouache': """Transform this picture into a premium painterly illustration: editorial gouache realism, \
as if a skilled portrait painter had hand-painted this exact image, edge to edge. Subtle visible \
brushwork, sophisticated matte gouache texture, natural slightly warm colours, the background gently \
simplified while the subject stays detailed. The whole image, face and clothes included, must look \
brushed, not retouched. No borders, frames or vignettes.""",
}


def prompt_for(style, busts=None):
    busts = busts or os.environ.get('BUSTS', '').strip() or 'sculpture'
    return STYLES.get(style, STYLES['atelier']) + '\n\n' + SOURCE.get(busts, SOURCE['sculpture']) + '\n\n' + IDENTITY


def figures():
    """album id -> (name, image path), from the data the app is built from"""
    imgs = json.load(open(os.path.join(ROOT, 'data', 'history_images.json'), encoding='utf-8'))
    names = {}
    for l in open(os.path.join(ROOT, 'tools', 'history', 'figures.tsv'), encoding='utf-8'):
        if l.strip() and not l.startswith('#'):
            r = l.rstrip('\n').split('|')
            names[r[0]] = r[1]
    return {k: (names.get(k, k), v['img']) for k, v in imgs.items() if v.get('img')}


PROMPT_TEXT = ''


def call(model, key, img_bytes, mime, attempts=4):
    body = {
        'contents': [{'parts': [
            {'text': PROMPT_TEXT},
            {'inline_data': {'mime_type': mime, 'data': base64.b64encode(img_bytes).decode()}},
        ]}],
        'generationConfig': {'responseModalities': ['TEXT', 'IMAGE']},
    }
    req = urllib.request.Request(API.format(model=model), data=json.dumps(body).encode(),
                                 headers={'Content-Type': 'application/json', 'x-goog-api-key': key})
    last = None
    for i in range(attempts):
        try:
            with urllib.request.urlopen(req, timeout=180) as r:
                return json.loads(r.read())
        except urllib.error.HTTPError as e:
            # the body explains the error; the key is in a header, so it is not in here
            last = f'HTTP {e.code}: {e.read()[:400].decode("utf-8", "replace")}'
            if e.code not in (429, 500, 502, 503, 504):
                break
        except Exception as e:
            last = f'{type(e).__name__}: {e}'
        time.sleep(4 * (2 ** i))
    raise RuntimeError(last)


def main():
    key = os.environ.get('GEMINI_API_KEY', '').strip()
    if not key:
        sys.exit('GEMINI_API_KEY is not set')
    model = os.environ.get('GEMINI_MODEL', '').strip() or 'gemini-3-pro-image-preview'
    style = os.environ.get('STYLE', '').strip() or 'atelier_full'
    busts = os.environ.get('BUSTS', '').strip() or 'sculpture'
    global PROMPT_TEXT
    PROMPT_TEXT = prompt_for(style, busts)
    ids = [x.strip() for x in (os.environ.get('FIGURES') or DEFAULT_FIGURES).split(',') if x.strip()]
    out = os.environ.get('OUT') or os.path.join('ai-test', 'local')
    os.makedirs(out, exist_ok=True)
    fg = figures()
    report = {'model': model, 'style': style, 'busts': busts, 'prompt': PROMPT_TEXT, 'results': []}
    for fid in ids:
        if fid not in fg:
            print(f'· {fid}: not an album id, skipped'); report['results'].append({'id': fid, 'ok': False, 'error': 'unknown id'}); continue
        name, rel = fg[fid]
        raw = open(os.path.join(ROOT, rel), 'rb').read()
        open(os.path.join(out, f'{fid}-original.webp'), 'wb').write(raw)
        t0 = time.time()
        try:
            res = call(model, key, raw, 'image/webp')
            parts = (res.get('candidates') or [{}])[0].get('content', {}).get('parts', [])
            img = next((p.get('inlineData') or p.get('inline_data') for p in parts
                        if p.get('inlineData') or p.get('inline_data')), None)
            note = ' '.join(p.get('text', '') for p in parts if p.get('text')).strip()
            if not img:
                reason = (res.get('candidates') or [{}])[0].get('finishReason') or res.get('promptFeedback')
                raise RuntimeError(f'no image returned ({reason}) {note[:200]}')
            ext = 'png' if 'png' in img.get('mimeType', img.get('mime_type', 'image/png')) else 'jpg'
            data = base64.b64decode(img['data'])
            fixed = finish_edges(data) if style == 'atelier_full' else None
            if fixed:
                open(os.path.join(out, f'{fid}-raw.{ext}'), 'wb').write(data)
                data, ext, edge_info = fixed[0], 'jpg', fixed[1]
            else:
                edge_info = None
            open(os.path.join(out, f'{fid}-painted.{ext}'), 'wb').write(data)
            report['results'].append({'id': fid, 'name': name, 'source': rel, 'ok': True,
                                      'file': f'{fid}-painted.{ext}', 'seconds': round(time.time() - t0, 1), 'note': note[:300],
                                      'edges': edge_info})
            print(f'✓ {fid} ({name}) in {time.time() - t0:.1f}s')
        except Exception as e:
            report['results'].append({'id': fid, 'name': name, 'source': rel, 'ok': False, 'error': str(e)[:500]})
            print(f'✗ {fid} ({name}): {str(e)[:300]}')
        time.sleep(2)
    json.dump(report, open(os.path.join(out, 'report.json'), 'w'), ensure_ascii=False, indent=1)
    sheet(out, report)
    ok = sum(r['ok'] for r in report['results'])
    print(f'{ok}/{len(ids)} painted → {out}')
    if ok == 0:
        sys.exit(1)


def finish_edges(data):
    """Safety net for full bleed: trim unpainted paper off the edges and paint
    over any left in the margin (tools/gemini/fill_edges.py). Returns None when
    OpenCV is not installed, so the raw image is kept."""
    try:
        import cv2, numpy as np
        sys.path.insert(0, os.path.dirname(__file__))
        from fill_edges import finish
    except ImportError:
        return None
    img = cv2.imdecode(np.frombuffer(data, np.uint8), cv2.IMREAD_COLOR)
    if img is None:
        return None
    fixed, info = finish(img)
    ok, buf = cv2.imencode('.jpg', fixed, [cv2.IMWRITE_JPEG_QUALITY, 92])
    return (buf.tobytes(), info) if ok else None


def sheet(out, report):
    """original | painted, one row per figure, to look at on a phone"""
    try:
        from PIL import Image, ImageDraw
    except ImportError:
        return
    rows = []
    for r in report['results']:
        if not r.get('ok'):
            continue
        a = Image.open(os.path.join(out, f"{r['id']}-original.webp")).convert('RGB')
        b = Image.open(os.path.join(out, r['file'])).convert('RGB')
        H = 520
        a = a.resize((int(a.width * H / a.height), H)); b = b.resize((int(b.width * H / b.height), H))
        row = Image.new('RGB', (a.width + b.width + 30, H + 40), (26, 21, 23))
        row.paste(a, (0, 40)); row.paste(b, (a.width + 30, 40))
        ImageDraw.Draw(row).text((8, 10), f"{r['name']}  -  original | {report['model']} · {report.get('style', '')} · {report.get('busts', '')}", fill=(236, 227, 206))
        rows.append(row)
    if not rows:
        return
    W = max(r.width for r in rows)
    out_im = Image.new('RGB', (W, sum(r.height for r in rows)), (26, 21, 23))
    y = 0
    for r in rows:
        out_im.paste(r, (0, y)); y += r.height
    out_im.save(os.path.join(out, 'compare.jpg'), quality=88)


if __name__ == '__main__':
    main()
