#!/usr/bin/env python3
"""The whole suite, in one headless-Chrome boot.

  python3 tools/history/test_all.py

Checks the data (figures, polities, flags, pictures), every written and generated
question at every difficulty (answers present, tiles distinct), whole runs of each
mode, the picture on every question card and every sticker in the album.
Exit status is non-zero if anything failed.
"""
import html, io, json, os, re, subprocess, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
CHROME = os.environ.get("CHROME", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
EXTRA = ["--no-sandbox"] if os.environ.get("CI") else []

JS = r"""
(function () {
  const fails = [], note = {};
  const F = m => { if (fails.length < 60) fails.push(m); };
  const T0 = Date.now();

  /* ── data ── */
  const ids = new Set();
  PL.forEach(p => {
    if (ids.has(p.id)) F('duplicate figure ' + p.id); ids.add(p.id);
    if (!p.img) F('no picture: ' + p.id);
    if (!p.era || !(p.era[0] < p.era[1])) F('bad era: ' + p.id);
    if (!POS_NAME[p.pos]) F('bad role: ' + p.id);
    if (!FLAGS[p.ctry] || !CTRY_NAME[p.ctry]) F('no flag/name for ' + p.ctry + ' (' + p.id + ')');
    (p.clubs || []).forEach(c => { if (!CL.some(x => x.id === c)) F('unknown polity ' + c + ' on ' + p.id); });
    (p.ev || []).forEach(e => { if (!EVENTS[e]) F('unknown event ' + e + ' on ' + p.id); });
  });
  const cids = new Set();
  CL.forEach(c => { if (cids.has(c.id)) F('duplicate polity ' + c.id); cids.add(c.id);
    if (!REGION[c.s]) F('region ' + c.id); if (!(c.f < (c.e || 3000))) F('polity dates ' + c.id);
    if (!EMBLEM[c.em]) F('emblem ' + c.id); if (!genericCrest(c.id)) F('crest ' + c.id); });
  Object.keys(STAD).forEach(k => { if (!STAD_IMGS[k]) F('monument without picture ' + k);
    if (STAD[k].p && !cids.has(STAD[k].p)) F('monument polity ' + k); });
  note.figures = PL.length; note.polities = CL.length; note.monuments = Object.keys(STAD).length;
  note.stickers = ALL_STICKERS.length;

  /* ── written questions ── */
  let nq = 0; const texts = new Set();
  CATS.forEach(c => c.qs.forEach(q => {
    nq++; const w = c.id + ': ' + q.t.slice(0, 50);
    if (!q.t.endsWith('?')) F('no ? ' + w);
    if (texts.has(q.t + JSON.stringify(q.stad || q.who || q.crest || q.flag || q.icon || '') + (q.clues ? q.clues[0] : ''))) F('duplicate ' + w);
    texts.add(q.t + JSON.stringify(q.stad || q.who || q.crest || q.flag || q.icon || '') + (q.clues ? q.clues[0] : ''));
    if (!q.a || !q.a.length) F('no answer ' + w);
    if (q.type === 'txt') {
      if (q.choices.length !== 6 || new Set(q.choices).size !== 6) F('choices ' + w);
      q.a.forEach(a => { if (!q.choices.includes(a)) F('answer not among choices ' + w); });
    } else if (q.type === 'player') q.a.forEach(a => { if (!PL.some(p => p.id === a)) F('unknown figure ' + a + ' ' + w); });
    else if (q.type === 'order') {
      const ys = q.a.map(i => q.order.find(e => e.id === i).y);
      if (ys.some((y, i) => i && y <= ys[i - 1])) F('order not sorted ' + w);
    } else q.a.forEach(a => { if (!cids.has(a)) F('unknown polity ' + a + ' ' + w); });
  }));
  note.written = nq;

  /* ── every question, at every difficulty: the answer is on the board, the tiles are distinct ── */
  const gen = GEN_QS(3); note.generated = gen.length;
  const all = gen.concat(CATS.flatMap(c => c.qs.map(q => Object.assign({}, q, { _cat: c }))));
  let boards = 0;
  ['facil', 'moderado', 'dificil'].forEach(k => {
    diffKey = k;
    all.forEach(q => {
      try {
        const d = getDisp(q); boards++;
        const dd = d.map(x => x.id);
        if (new Set(dd).size !== dd.length) F(k + ' duplicate tile :: ' + q.t.slice(0, 60));
        if (!q.a.every(a => dd.includes(a))) F(k + ' answer missing :: ' + q.t.slice(0, 60));
        if (!q.order && !q.fixed && dd.length < Math.min(6, 10)) F(k + ' few tiles(' + dd.length + ') :: ' + q.t.slice(0, 60));
        const art = questionArt(q); if (typeof art !== 'string') F('art ' + q.t);
        if (q.type === 'txt') optArtFor(q);
      } catch (e) { F('EXC ' + e.message + ' :: ' + q.t.slice(0, 60)); }
    });
  });
  note.boards = boards;

  /* ── whole runs ── */
  ['facil', 'moderado', 'dificil'].forEach(k => {
    for (let i = 0; i < 6; i++) {
      try {
        const g = buildGame(k);
        if (g.qs.length < DIFFS.find(d => d.key === k).n) F('short game ' + k + ' ' + g.qs.length);
        const answers = g.qs.map(q => ansKey(q)); if (new Set(answers).size !== answers.length) F('repeated answer in a ' + k + ' game');
        g.qs.forEach(q => getDisp(q));
      } catch (e) { F('game EXC ' + k + ' ' + e.message); }
    }
  });
  for (let i = 0; i < 8; i++) {
    try { isMil = true; diffKey = 'moderado'; const m = buildMilhao(); isMil = false;
      if (m.qs.length !== 16) F('milhao has ' + m.qs.length + ' questions');
      m.qs.forEach(q => { const d = getDisp(q); if (!q.a.every(a => d.map(x => x.id).includes(a))) F('milhao answer missing ' + q.t.slice(0, 50)); });
    } catch (e) { isMil = false; F('milhao EXC ' + e.message); }
  }
  note.specials = { who: buildWho(6).qs.length, tl: buildTimeline(6).qs.length };
  if (note.specials.who < 6 || note.specials.tl < 6) F('specials short ' + JSON.stringify(note.specials));
  buildWho(10).qs.forEach(q => { if (!q.clues || q.clues.length < 3) F('who clues ' + q.a);
    const nm = (PL.find(p => p.id === q.a[0]) || {}).n || ''; const last = _fold(nm.split(' ').pop()); q.clues.forEach(c => { if (nm && last.length > 4 && new RegExp('\\b' + last + '\\b').test(_fold(c))) F('clue names answer: ' + nm); }); });

  /* ── the album: every sticker prints, front and back ── */
  ALL_STICKERS.forEach((sid, i) => {
    try {
      const st = stk(sid); if (!st) { F('no sticker ' + sid); return; }
      if (st.kind === 'player') { figurinha(st.p, 'lg', {}); figurinhaBack(st.p, i + 1); stickerBack(st.p, true, false); }
      else { figExtra(sid, 'lg', {}); figExtraBack(sid, i + 1); }
    } catch (e) { F('sticker EXC ' + sid + ' ' + e.message); }
  });
  try { albumPages(PL.map((p, i) => ({ p, n: i + 1 }))); } catch (e) { F('albumPages ' + e.message); }
  try { MEDALS.forEach(m => { m.t({ games: 0, correct: 0 }); }); } catch (e) { F('medals ' + e.message); }
  note.ms = Date.now() - T0;
  return { fails, note };
})()
"""

head = "<script>window.__errs=[];window.addEventListener('error',function(e){__errs.push((e.message||'')+' @line '+e.lineno);});</script>"
src = io.open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
tail = ("<script>window.addEventListener('load',function(){setTimeout(function(){var v;try{v=JSON.stringify((%s))}catch(x){v=JSON.stringify({fails:['TEST CRASH '+x+' '+(x.stack||'').slice(0,300)],note:{}})}"
        "var p=document.createElement('pre');p.id='probe';p.textContent=JSON.stringify({errs:__errs,v:v});document.body.appendChild(p);},1500);});</script>") % JS
tmp = os.path.join(ROOT, "_test_all.html")
io.open(tmp, "w", encoding="utf-8").write(src.replace("<head>", "<head>" + head, 1).replace("</body>", tail + "</body>"))
try:
    r = subprocess.run([CHROME] + EXTRA + ["--headless=new", "--disable-gpu", "--allow-file-access-from-files",
                        "--virtual-time-budget=60000", "--dump-dom", "file://" + tmp],
                       capture_output=True, text=True, timeout=300)
finally:
    os.remove(tmp)
m = re.search(r'<pre id="probe">(.*?)</pre>', r.stdout, re.S)
if not m:
    print("no probe output", r.stderr[-300:]); sys.exit(2)
d = json.loads(html.unescape(m.group(1)))
res = json.loads(d["v"])
for e in d["errs"]: print("  PAGE ERROR", e)
for f in res["fails"]: print("  FAIL", f)
print(json.dumps(res["note"], ensure_ascii=False))
bad = len(d["errs"]) + len(res["fails"])
print("%d problem(s)" % bad)
sys.exit(1 if bad else 0)
