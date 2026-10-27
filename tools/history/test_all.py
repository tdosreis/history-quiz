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
    /* a question is told apart by its words, its picture, its clue, its strip and its duel */
    const key = q.t + JSON.stringify(q.stad || q.who || q.crest || q.flag || q.icon || '') + (q.clues ? q.clues[0] : '')
              + JSON.stringify(q.quote || q.battle || q.line || q.news || q.rebus || q.detail || q.odd || '')
              + (q.duel || q.odd ? JSON.stringify(q.fixed || q.choices) : '');
    if (texts.has(key)) F('duplicate ' + w);
    texts.add(key);
    if (!q.a || !q.a.length) F('no answer ' + w);
    if (q.type === 'txt') {
      const need = q.duel ? 2 : q.odd ? 4 : 6;
      if (q.choices.length !== need || new Set(q.choices).size !== need) F('choices ' + w);
      if (q.myth && q.choices.slice().sort().join() !== 'Fato,Mito') F('a myth is stamped Fato or Mito ' + w);
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
        if (!q.order && !q.fixed && !q.duel && !q.odd && dd.length < Math.min(6, 10)) F(k + ' few tiles(' + dd.length + ') :: ' + q.t.slice(0, 60));
        if (q.odd && dd.length !== 4) F(k + ' an odd one out is four tiles :: ' + q.t.slice(0, 60));
        /* Detalhe: the face is behind the glass, so no tile may show a face to match it by eye */
        if (q.detail) { const oa = optArtFor(q);
          if (!(PL.find(p => p.id === q.detail.who) || {}).img) F('detail without a portrait :: ' + q.detail.who);
          if (q.choices.some(c => !oa || !oa[c] || oa[c].k !== 'glyph')) F('a detail tile shows a face :: ' + q.detail.who); }
        if (q.rebus && !(q.rebus.e.length >= 2 && q.rebus.e.length <= 6)) F('a charada is 2-6 pictures :: ' + q.t.slice(0, 60));
        if (q.duel && dd.length !== 2) F(k + ' a duel needs exactly two tiles :: ' + q.t.slice(0, 60));
        if (hasStrip(q) && !/class="qstrip/.test(qStrip(q))) F('strip did not draw :: ' + q.t.slice(0, 60));
        const art = questionArt(q); if (typeof art !== 'string' || (!q.order && !hasStrip(q) && !/<(img|svg)\b/.test(art))) F('question without a picture :: ' + q.t.slice(0, 60));
        if (q.type === 'txt') { const oa = optArtFor(q);
          /* every written answer carries a picture: never a bare word on a slip */
          q.choices.forEach(c => { if (!oa || !optArtHtml(oa[c])) F('txt answer without a picture: ' + c + ' :: ' + q.t.slice(0, 50)); }); }
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
  /* ── the album's world map: every sticker on a page, every page on the map ── */
  try {
    const P = albPlaces();
    if (P.lost.length) F('stickers with no place on the map: ' + P.lost.map(g => g.sid || g.p.id).slice(0, 5).join(', '));
    const n = P.order.reduce((a, c) => a + P.items[c].length, 0);
    if (n !== ALL_STICKERS.length) F('the map holds ' + n + ' of ' + ALL_STICKERS.length + ' stickers');
    P.order.forEach(c => {
      if (!ALB_MAP.pins[c]) F('a place with no pin ' + c);
      if (!AMAP_PLACE_CONT[c]) F('a place in no part of the world ' + c);
      if (!placeBadge(c, 12)) F('a place with no badge ' + c);
      const [vx, vy, vw, vh] = ALB_MAP.views[AMAP_PLACE_CONT[c]], [x, y] = ALB_MAP.pins[c];
      if (x < vx || x > vx + vw || y < vy || y > vy + vh) F('pin outside its map ' + c);
    });
    note.places = P.order.length;
    /* the old atlas draws every part of the world, at a phone's shape and a tablet's, and every page's little chart */
    [[340, 420], [340, 240], [620, 420]].forEach(([w, h]) => {
      const wd = atlasWorld(w, h, new Set());
      if (!/<svg/.test(wd.svg) || !(wd.R > 40)) F('the world does not draw at ' + w + 'x' + h);
      ['EU', 'AS', 'AF', 'AM'].forEach(v => {
        const ch = atlasChart(v, w, h, new Set());
        if (!/<svg/.test(ch.svg)) F('the chart does not draw ' + v);
        const mine = P.order.filter(c => AMAP_PLACE_CONT[c] === v);
        if (ch.pins.length !== mine.length) F('chart ' + v + ' has ' + ch.pins.length + ' pins for ' + mine.length + ' places');
        ch.pins.forEach(p => { if (!(p.x > 0 && p.x < w && p.y > 0 && p.y < h)) F('pin off the chart ' + v + ' ' + p.c + ' at ' + w + 'x' + h); });
      });
    });
    P.order.forEach(c => { const d = atlasInset(c, 300, 120); if (!/<svg/.test(d.svg) || !d.pin) F('no little chart for ' + c);
      else if (!(d.pin[0] > 0 && d.pin[0] < 100 && d.pin[1] > 0 && d.pin[1] < 100)) F('the little chart misses ' + c); });
    Object.keys(ATLAS_ART).forEach(n => { const a = ATLAS_ART[n]; if (!a.vb || !/^</.test(a.svg.trim()) || /<text|<image|<script|filter=|<style|href="http/.test(a.svg)) F('engraving breaks the rules: ' + n); });
    ['rosa', 'caravela', 'serpente', 'baleia', 'cartela', 'esfera'].forEach(n => { if (!ATLAS_ART[n]) F('engraving missing: ' + n); });
    /* a country can be tapped: the point at its pin on the world map is its own shape, washed or not */
    const keepAlb = album;
    album = new Set(ALL_STICKERS.slice(0, 60)); runNewIds = [];
    sc = 'album'; albView = 'map'; amapView = 'WORLD'; go();
    const am = document.getElementById('amap'), wd = am && am._world;
    if (wd) {
      const r = am.getBoundingClientRect();
      ['TUN', 'UZB', 'ESP', 'BRA', 'RUS', 'MAR', 'CHN'].forEach(c => {
        const h = ALB_MAP.hemi.W.pins[c] ? 'W' : 'E', q = ALB_MAP.hemi[h].pins[c];
        const x = r.left + wd.C[h][0] + q[0] * wd.sc, y = r.top + wd.C[h][1] + q[1] * wd.sc;
        if (x < 0 || y < 0 || x > innerWidth || y > innerHeight) return;
        const e = document.elementFromPoint(x, y), t = e && e.closest('[data-place]');
        if (!t || t.dataset.place !== c) F('a tap on ' + c + ' on the world map does not reach it (' + (e ? e.tagName + '.' + e.getAttribute('class') : 'nothing') + ')');
      });
    } else F('the world map was not drawn for the tap test');
    album = keepAlb; sc = 'home'; go();
    amapView = 'WORLD';
  } catch (e) { F('mapa EXC ' + e.message); }
  /* ── the stamp album: every stamp a scene with a page, printed won and unwon ── */
  try {
    const ids = seloAll(); note.selos = ids.length;
    if (ids.length < 150) F('only ' + ids.length + ' stamps');
    if (new Set(ids).size !== ids.length) F('a stamp is on two pages');
    ids.forEach(id => {
      if (!SCENE[id]) F('stamp without a scene ' + id);
      if (!SELO_THEMES.some(t => t[0] === SCENE_T[id])) F('stamp without a theme ' + id);
      if (!/<svg/.test(seloSvg(id, { got: true })) || !/<svg/.test(seloSvg(id, { got: false }))) F('stamp does not print ' + id);
    });
  } catch (e) { F('selos EXC ' + e.message); }
  /* ── Que ano?: every event a clear line, a real year and a picture that exists ── */
  try {
    note.ano = ANO_EVENTS.length;
    if (ANO_EVENTS.length < 100) F('only ' + ANO_EVENTS.length + ' year events');
    const aid = new Set();
    ANO_EVENTS.forEach(e => {
      const w = 'ano ' + e.id + ': ';
      if (aid.has(e.id)) F(w + 'duplicate id'); aid.add(e.id);
      if (!e.t || /\d{3,4}|s[eé]culo/i.test(e.t)) F(w + 'the line names its date');
      if (!Number.isInteger(e.y) || e.y === 0 || e.y > new Date().getFullYear()) F(w + 'bad year ' + e.y);
      const p = e.pic || {};
      if (!(p.scene ? SCENE[p.scene] : p.face ? PL.some(x => x.id === p.face) : p.crest ? CL.some(c => c.id === p.crest) : p.flag ? FLAGS[p.flag] : false)) F(w + 'no picture');
      for (let r = 0; r <= 1; r += .25) { const [lo, hi] = anoWindow(e, r); if (!(lo <= e.y && e.y <= hi)) F(w + 'the ruler misses the year'); }
      if (anoPts(e, e.y) !== 100) F(w + 'the exact year is not 100');
    });
    for (let i = 0; i < 6; i++) { const g = buildAno(); if (g.qs.length !== ANO_N) F('a Que ano? game has ' + g.qs.length + ' events');
      if (new Set(g.qs.map(q => q.e.id)).size !== g.qs.length) F('a Que ano? game repeats an event'); }
  } catch (e) { F('ano EXC ' + e.message); }
  /* ── Onde foi?: every place a real spot on the map, every game ten events spread over the world ── */
  try {
    const ids = Object.keys(ONDE_AT);
    note.onde = ids.length;
    if (ids.length < 200) F('only ' + ids.length + ' events with a place');
    const aid = new Set(ANO_EVENTS.map(e => e.id));
    ids.forEach(id => {
      const [la, lo, pl] = ONDE_AT[id], w = 'onde ' + id + ': ';
      if (!aid.has(id)) F(w + 'no such event');
      if (!(la > -56 && la < 78 && lo >= -180 && lo <= 180)) F(w + 'off the map ' + la + ',' + lo);
      if (!pl || pl.length > 60 || /^,|,$|\s{2}/.test(pl)) F(w + 'odd place name ' + pl);
      const [x, y] = ondeXY(la, lo), [la2, lo2] = ondeLL([x, y]);
      if (ondeKm([la, lo], [la2, lo2]) > 1) F(w + 'the projection does not round-trip');
    });
    if (Math.abs(ondeKm([0, 0], [0, 1]) - 111.2) > 0.5) F('ondeKm is off');
    if (ondeKm([0, 179], [0, -179]) > 230) F('ondeKm does not wrap at the date line');
    if (ondePts(0) !== 100 || ondePts(50) !== 100 || ondePts(51) > 99 || ondePts(20000) !== 0) F('ondePts scale is off');
    for (let i = 0; i < 40; i++) {
      const g = buildOnde(), w = 'an Onde foi? game ';
      if (g.qs.length !== ONDE_N) F(w + 'has ' + g.qs.length + ' events');
      if (new Set(g.qs.map(q => q.e.id)).size !== g.qs.length) F(w + 'repeats an event');
      const reg = {}; g.qs.forEach(q => { const r = ondeReg(q.at); reg[r] = (reg[r] || 0) + 1; });
      if ((reg.EU || 0) < 2 || (reg.AM || 0) < 2 || (reg.AF || 0) < 1 || (reg.AS || 0) < 1) F(w + 'is lopsided ' + JSON.stringify(reg));
      if (g.qs.filter(q => ondeBR(q.e)).length > 3) F(w + 'has too much of Brazil');
      for (let a = 0; a < g.qs.length; a++) for (let b = a + 1; b < g.qs.length; b++)
        if (ondeKm(g.qs[a].at, g.qs[b].at) < 150) F(w + 'has two events in one spot: ' + g.qs[a].e.id + ' / ' + g.qs[b].e.id);
    }
  } catch (e) { F('onde EXC ' + e.message); }
  /* ── O desafio: a code travels intact, a bad one is turned away, and a seed always deals the same game ── */
  try {
    const c = { g: 'm', seed: 2147483647, score: 1000000, more: 16 }, back = chalParse(chalCode(c));
    if (!back || back.seed !== c.seed || back.score !== c.score || back.more !== 16 || back.old) F('a challenge code does not round-trip');
    const o2 = chalParse(chalCode({ g: 'o', seed: 5, score: 815 }));
    if (!o2 || o2.more !== null || o2.score !== 815) F('a challenge code without a rung does not round-trip');
    if (!chalParse('o.5.mn..zz') || !chalParse('o.5.mn..zz').old) F('a challenge from another version is not told apart');
    ['zz.1.2..aa', 'o.', 'o.1', 'm.1.2..aa', 'o.zzzzzzz.1..aa', 'a.1.zzz..aa', 'tm.1.2.zzzz.aa', 'o.1.2', '<script>', ''].forEach(x => { if (chalParse(x)) F('a bad challenge code is accepted: ' + x); });
    const deal = { a: () => buildAno().qs.map(q => q.e.id + q.lo), o: () => buildOnde().qs.map(q => q.e.id),
      m: () => buildMilhao().qs.map(q => q.t), t: () => buildGame('dificil').qs.map(q => q.t) };
    Object.keys(deal).forEach(k => { seedFrom(31337); const x = JSON.stringify(deal[k]()); rnd(); rnd(); seedFrom(31337);
      if (JSON.stringify(deal[k]()) !== x) F('the same seed deals a different ' + k); });
    _seed = null;
  } catch (e) { F('desafio EXC ' + e.message); }
  /* ── Revisar: a miss is filed, comes back when due, moves on when right, and is learned after the last box ── */
  try {
    const keep = LS.get('rev', {}), keepSt = stats.revLearned;
    LS.set('rev', {});
    const q = CATS[0].qs[0], now = dayIndex(), K = revKey(q);
    revNote({ ...q, _cat: CATS[0] }, 0); if (!revDue().includes(K)) F('a missed question is not due for review');
    revNote(q, 3); if (revFile()[K][0] !== 1 || revFile()[K][1] !== now + REV_GAPS[1]) F('a reviewed question does not move to the next box');
    revNote(q, 3); if (revFile()[K][0] !== 1) F('a question answered before it is due moves anyway');
    const R = revFile(); R[K] = [REV_GAPS.length - 1, now]; LS.set('rev', R);
    const was = stats.revLearned || 0; revNote(q, 3);
    if (revFile()[K] || (stats.revLearned || 0) !== was + 1) F('a question past the last box is not learned');
    /* questions that share a line are still told apart */
    const byLine = {}; CATS.forEach(c => c.qs.forEach(x => { (byLine[x.t] = byLine[x.t] || new Set()).add(JSON.stringify(x, (k, v) => (k && k[0] === '_' ? undefined : v))); }));
    const kinds = Object.values(byLine).reduce((a, st) => a + st.size, 0);
    if (revPool().size !== kinds) F('review keys collide: ' + revPool().size + ' keys for ' + kinds + ' different questions');
    revNote({ t: 'not a written question' }, 0); if (Object.keys(revFile()).length) F('an unknown question is filed');
    for (let i = 0; i < REV_MAX + 20; i++) revNote(CATS.flatMap(c => c.qs)[i], 0);
    if (Object.keys(revFile()).length > REV_MAX) F('the review file grows past ' + REV_MAX);
    LS.set('rev', keep); stats.revLearned = keepSt;
  } catch (e) { F('revisar EXC ' + e.message); }
  /* ── Cronologia: the line stays in order whatever is tapped, a miss costs a life, and a seed deals the same line ── */
  try {
    for (let g = 0; g < 30; g++) {
      seedFrom(1000 + g); cron = buildCron(); _seed = null; cron.phase = 'place';
      const w = 'a Cronologia game ';
      let lives = CRON_LIVES, score = 0, turns = 0;
      while (cron.lives > 0 && turns < 60) {
        const n = cron.line.length, slot = Math.floor(Math.random() * (n + 1)), ok = cronFits(cron.line, cron.cur, slot);
        cron.phase = 'place'; const e = cron.cur;
        const right = cron.line.findIndex(x => x.y > e.y), at = right < 0 ? n : right;
        if (ok !== (slot === at || cronFits(cron.line, e, slot))) F(w + 'judges a slot oddly');
        cronPlace(slot); turns++;
        if (ok) score++; else lives--;
        if (cron.line.length !== n + 1 || !cron.line.includes(e)) F(w + 'loses the event');
        for (let i = 1; i < cron.line.length; i++) if (cron.line[i - 1].y > cron.line[i].y) { F(w + 'is out of order after a ' + (ok ? 'right' : 'wrong') + ' tap'); break; }
        if (cron.lives !== lives || cron.score !== score) F(w + 'counts lives or the score wrong');
        if (cron.lives > 0) { cron.cur = cron.deck.pop(); cron.phase = 'place'; }
      }
      if (new Set(cron.line.map(e => e.id)).size !== cron.line.length) F(w + 'repeats an event');
    }
    if (!cronFits([{ y: 1500 }, { y: 1600 }], { y: 1500 }, 0) || !cronFits([{ y: 1500 }, { y: 1600 }], { y: 1500 }, 1)) F('an event of the same year does not fit beside it');
    if (cronFits([{ y: 1500 }, { y: 1600 }], { y: 1700 }, 1)) F('a later event fits before an earlier one');
    seedFrom(4242); const d1 = buildCron().deck.map(e => e.id).join(); seedFrom(4242); const d2 = buildCron().deck.map(e => e.id).join(); _seed = null;
    if (d1 !== d2) F('the same seed deals a different Cronologia');
    const cc = chalParse(chalCode({ g: 'c', seed: 77, score: 23 }));
    if (!cc || cc.g !== 'c' || cc.score !== 23) F('a Cronologia challenge does not round-trip');
    if (chalParse('c.1.' + (ANO_EVENTS.length + 1).toString(36) + '..' + chalVer())) F('a Cronologia score above the deck is accepted');
    cron = null; sc = 'home';
    /* the Linha do dia: one line for the day, kept tap by tap, counted once */
    const keepCD = LS.get('cronDia', null), keepCS = JSON.stringify(stats), keepCB = LS.get('cronBest', 0);
    LS.set('cronDia', null);
    seedFrom(cronDiaSeed(500)); const dA = buildCron().deck.map(e => e.id).join(); seedFrom(cronDiaSeed(501)); const dB = buildCron().deck.map(e => e.id).join(); _seed = null;
    if (dA === dB) F('two days deal the same Linha do dia');
    const right = () => { const e = cron.cur, r = cron.line.findIndex(x => x.y > e.y); return r < 0 ? cron.line.length : r; };
    startCronDia(); const first = cron.cur.id + cron.line[0].id;
    for (let k = 0; k < 5; k++) { cronPlace(k === 2 ? (right() === 0 ? cron.line.length : 0) : right()); cronNext(); }
    const mid = { n: cron.line.length, s: cron.score, l: cron.lives, cur: cron.cur.id };
    cron = null; sc = 'home'; go();
    startCronDia();
    if (cron.line[0].id + '' === '' || cron.line.length !== mid.n || cron.score !== mid.s || cron.lives !== mid.l || cron.cur.id !== mid.cur || cron.phase !== 'place') F('a Linha do dia left halfway does not go on where it was');
    const games = stats.cronDiaGames || 0;
    while (cron.phase !== 'end') { if (cron.phase === 'place') cronPlace(right() === 0 ? cron.line.length : 0); else cronNext(); }
    if ((stats.cronDiaGames || 0) !== games + 1 || !(cronDiaKept() || {}).done) F('finishing the Linha do dia does not keep it');
    const laid = cron.line.map(e => e.id).join();
    startCronDia();
    if (cron.phase !== 'end' || !cron.replay || cron.line.map(e => e.id).join() !== laid || (stats.cronDiaGames || 0) !== games + 1) F('the Linha do dia, once laid, is not shown as it was');
    /* an app updated during the day (a new event) still deals the day's line as it was, half-played or laid */
    ANO_EVENTS.unshift(Object.assign({}, ANO_EVENTS[0], { id: 'zz_test_event', y: 1500 }));
    startCronDia();
    if (cron.line.map(e => e.id).join() !== laid || cron.phase !== 'end') F('a new event in the app breaks the day\'s laid line');
    ANO_EVENTS.shift();
    seedFrom(cronDiaSeed(dayIndex())); const again = buildCron(); _seed = null;
    if (again.cur.id + again.line[0].id !== first) F('the Linha do dia is not the same line all day');
    LS.set('cronDia', keepCD); Object.assign(stats, JSON.parse(keepCS)); LS.set('stats', stats); LS.set('cronBest', keepCB); cron = null; sc = 'home';
  } catch (e) { F('cronologia EXC ' + e.stack); }
  /* ── Antes ou depois?: a run answered right to the end never deals an event twice nor two of one year,
       always judges the right answer right, and ends only when the deck is spent ── */
  try {
    const keepAS = JSON.stringify(stats), keepAB = LS.get('aodBest', 0);
    aodNew(); sc = 'aod';
    const seen = new Set([aod.a.id, aod.b.id]); let n = 0;
    while (aod.phase !== 'end' && n < 400) {
      if (aod.b.y === aod.a.y) F('aod: two of one year ' + aod.a.id + ' ' + aod.b.id);
      aodAnswer(aod.b.y < aod.a.y ? 'antes' : 'depois');
      if (!aod.ok) F('aod: a right answer judged wrong ' + aod.a.id + ' ' + aod.b.id);
      aodNext(); n++;
      if (aod.phase === 'guess') { if (seen.has(aod.b.id)) F('aod: dealt twice ' + aod.b.id); seen.add(aod.b.id); }
    }
    note.aod = n;
    if (n < ANO_EVENTS.length - 12) F('aod: a run ended at ' + n + ' with events left');
    /* and a wrong one, and one too slow, end it */
    aodNew(); aodAnswer(aod.b.y < aod.a.y ? 'depois' : 'antes'); if (aod.ok) F('aod: a wrong answer judged right'); aodNext(); if (aod.phase !== 'end') F('aod: a miss does not end the run');
    aodNew(); aodAnswer(null); if (aod.ok) F('aod: no answer judged right');
    /* the same seed, answered right, deals the same run: what a challenge link sends */
    const deal = seed => { aodNew(seed); const ids = [aod.a.id]; for (let i = 0; i < 30 && aod.phase !== 'end'; i++) { ids.push(aod.b.id);
      try { fx.banner = () => {}; } catch (e) {} aodAnswer(aod.b.y < aod.a.y ? 'antes' : 'depois'); rnd(); rnd(); aodNext(); } return ids.join(); };
    if (deal(4242) !== deal(4242)) F('aod: one seed deals two runs');
    if (deal(4242) === deal(4243)) F('aod: two seeds deal one run');
    const cd = chalParse(chalCode({ g: 'd', seed: 4242, score: 17 }));
    if (!cd || cd.g !== 'd' || cd.seed !== 4242 || cd.score !== 17) F('an Antes ou depois? challenge does not round-trip');
    if (chalParse('d.1.' + (ANO_EVENTS.length + 1).toString(36) + '..' + chalVer())) F('an Antes ou depois? score above the deck is accepted');
    Object.assign(stats, JSON.parse(keepAS)); LS.set('stats', stats); LS.set('aodBest', keepAB); aod = null; sc = 'home';
  } catch (e) { F('aod EXC ' + e.stack); }
  /* ── the cover's round of the newest kinds: four of each, every answer on its board, no record kept ── */
  try {
    const keepSc = JSON.stringify(scores), keepNG = stats.novasGames, keepNV = stats.novasV;
    for (let i = 0; i < 4; i++) {
      startNovas(); clearInterval(tmr);
      if (cat.qs.length !== NOVAS.length * NOVAS_EACH) F('novas: a round of ' + cat.qs.length);
      NOVAS.forEach(id => { if (cat.qs.filter(q => q._cat.id === id).length !== NOVAS_EACH) F('novas: not ' + NOVAS_EACH + ' of ' + id); });
      cat.qs.forEach(q => { const d = getDisp(q); if (!q.a.every(a => d.map(x => x.id).includes(a))) F('novas: answer missing ' + q.t); });
    }
    pts = 99999; nCorrect = 15; finishRun(); clearInterval(tmr);
    if (JSON.stringify(scores) !== keepSc) F('novas: a record was kept');
    stats.novasGames = keepNG; stats.novasV = keepNV; LS.set('stats', stats); sc = 'home';
  } catch (e) { F('novas EXC ' + e.stack); }
  /* ── Jornada: every stop deals a full round of distinct answers, easy to hard, each on its board; stars, unlocking, the end ── */
  try {
    const keepJ = LS.get('jornada', null), keepJS = JSON.stringify(stats), keepSc2 = JSON.stringify(scores);
    if (JOR_STOPS.length !== 19) F('jornada: ' + JOR_STOPS.length + ' stops');
    JOR_STOPS.forEach((s, i) => {
      if (!SCENE[s.scene]) F('jornada: no scene ' + s.scene + ' for ' + s.id);
      const pool = jorPool(s); if (pool.length < 24) F('jornada: a small pool for ' + s.id + ' (' + pool.length + ')');
      for (let k = 0; k < 3; k++) {
        const qs = jorDeal(s), n = s.size || JOR_N;
        if (qs.length !== n) F('jornada: ' + s.id + ' dealt ' + qs.length);
        if (new Set(qs.map(q => ansKey(q))).size !== qs.length) F('jornada: ' + s.id + ' repeats an answer');
        qs.forEach((q, j) => { if (j && qs[j - 1].d > q.d) F('jornada: ' + s.id + ' not easy to hard');
          const d = getDisp(q); if (!q.a.every(a => d.map(x => x.id).includes(a))) F('jornada: answer missing ' + q.t); });
      }
    });
    if (jorStarsFor(3, 8) !== 0 || jorStarsFor(4, 8) !== 1 || jorStarsFor(6, 8) !== 2 || jorStarsFor(7, 8) !== 3 || jorStarsFor(9, 10) !== 3) F('jornada: stars wrong');
    LS.set('jornada', null);
    if (!jorOpen(0) || jorOpen(1) || jorNextIdx() !== 0) F('jornada: a fresh road does not start at the first stop');
    /* play the whole road: every stop with its pass mark, then the last with all right */
    JOR_STOPS.forEach((s, i) => { startJor(i); clearInterval(tmr); if (!isJorRun()) F('jornada: stop ' + i + ' did not start');
      nCorrect = i === JOR_STOPS.length - 1 ? cat.qs.length : jorNeed(cat.qs.length)[0]; pts = 100; finishRun(); clearInterval(tmr);
      if (!(jorStars(s.id) >= 1)) F('jornada: stop ' + i + ' not passed');
      if (i < JOR_STOPS.length - 1 && !jorOpen(i + 1)) F('jornada: stop ' + (i + 1) + ' not opened'); go(); });
    if (jorNextIdx() !== -1 || stats.jorDone !== JOR_STOPS.length || stats.jorEras !== JOR_ERAS.length) F('jornada: the road is not done at its end');
    if (!window._jorRes || !window._jorRes.end || window._jorRes.st !== 3) F('jornada: the last stop does not end the road');
    if (JSON.stringify(scores) !== keepSc2) F('jornada: a difficulty record was kept');
    for (let k = 0; k < JOR_ERAS.length; k++) { jorPage = k; sc = 'jornada'; go(); if (document.querySelectorAll('.jor-stop').length !== JOR_ERAS[k].stops.length) F('jornada: page ' + k + ' stops'); }
    LS.set('jornada', keepJ); Object.assign(stats, JSON.parse(keepJS)); LS.set('stats', stats); jorPage = null; sc = 'home';
  } catch (e) { F('jornada EXC ' + e.stack); }
  /* ── Hoje na História: every day of the year has five dates near it, the same five all day, each with its picture ── */
  try {
    const pool = hojePool();
    note.hoje = pool.length;
    pool.forEach(e => { if (!e.pic || !(e.pic.face || e.pic.crest || e.pic.flag || e.pic.scene)) F('hoje: no picture for ' + e.t);
      if (!(e.y < ANO_NOW) || !e.md || !(e.md[0] >= 1 && e.md[0] <= 12 && e.md[1] >= 1 && e.md[1] <= 31)) F('hoje: bad date for ' + e.t); });
    if (hojeOff([1, 2], new Date(2026, 11, 30)) !== 3 || hojeOff([12, 30], new Date(2026, 0, 2)) !== -3 || hojeOff([3, 1], new Date(2026, 2, 1)) !== 0) F('hojeOff does not wrap the year');
    if (hojeOff([3, 1], new Date(2026, 1, 28)) !== 1 || hojeOff([2, 24], new Date(2026, 2, 1)) !== -5 || hojeOff([3, 1], new Date(2028, 1, 28)) !== 2) F('hojeOff counts a 29 de fevereiro that is not there');
    let far = 0, same = 0, prev = '';
    for (let k = 0; k < 365; k++) {
      const day = new Date(2026, 0, 1 + k), g = buildHoje(day), w = 'hoje ' + (day.getMonth() + 1) + '/' + day.getDate() + ': ';
      if (g.qs.length !== HOJE_N) F(w + g.qs.length + ' dates');
      if (new Set(g.qs.map(q => q.e.id)).size !== g.qs.length) F(w + 'repeats a date');
      g.qs.forEach((q, i) => { if (i && g.qs[i - 1].k > q.k) F(w + 'not in calendar order');
        if (!(q.lo <= q.e.y && q.e.y <= q.hi)) F(w + 'the ruler misses ' + q.e.t); far = Math.max(far, Math.abs(q.k)); });
      if (JSON.stringify(buildHoje(new Date(2026, 0, 1 + k, 23, 30)).qs.map(q => q.e.id + q.lo)) !== JSON.stringify(g.qs.map(q => q.e.id + q.lo))) F(w + 'changes in the course of the day');
      const ids = g.qs.map(q => q.e.id).sort().join(); if (ids === prev) same++; prev = ids;
    }
    note.hojeFar = far; note.hojeSame = same;
    if (far > 14) F('a Hoje na História date is ' + far + ' days away');
    if (same > 2) F(same + ' days of Hoje na História are the day before again');
    /* a replay of a day already played, finished after midnight, leaves that day's first result alone */
    const keepR = LS.get('hojeRes', null), keepB = stats.hojeBest, keepX = stats.anoExact;
    ano = buildHoje(new Date(2026, 4, 10)); LS.set('hojeRes', { day: ano.hoje.day, pts: 100 });
    ano.qs.forEach(q => { ano.guess = q.e.y; anoCommit(); anoCommit(); anoNext(); anoNext(); });
    if (ano.log.length !== HOJE_N) F('a second tap on Cravar or Próximo is taken: ' + ano.log.length + ' answers');
    if (ano.phase !== 'end' || (LS.get('hojeRes', {}) || {}).pts !== 100) F('a replay of a day already played replaces its first result');
    LS.set('hojeRes', keepR); stats.hojeBest = keepB; stats.anoExact = keepX; LS.set('stats', stats);
    /* a game of the day left halfway goes on where it was, and only its finish keeps a result */
    const keepRun = LS.get('hojeRun', null), keepR2 = LS.get('hojeRes', null), keepSt = JSON.stringify(stats);
    LS.set('hojeRes', null); LS.set('hojeRun', null);
    startHoje(); const deal = ano.qs.map(q => q.e.id).join();
    ano.guess = ano.qs[0].e.y; anoCommit(); anoNext(); ano.guess = ano.qs[1].e.y + 3; anoCommit();
    const pts2 = ano.pts; sc = 'home'; go(); ano = null;
    startHoje();
    if (ano.qs.map(q => q.e.id).join() !== deal || ano.log.length !== 2 || ano.i !== 2 || ano.phase !== 'guess' || ano.pts !== pts2) F('a Hoje left halfway does not go on where it was (' + ano.log.length + ' answers, at ' + ano.i + ')');
    while (ano.phase !== 'end') { if (ano.phase === 'guess') { ano.guess = ano.qs[ano.i].start; anoCommit(); } else anoNext(); }
    if (!hojeRes() || LS.get('hojeRun', null)) F('finishing a Hoje that went on does not keep its result');
    startHoje(); if (!ano.replay || ano.log.length) F('a Hoje already finished is resumed instead of replayed');
    LS.set('hojeRun', keepRun); LS.set('hojeRes', keepR2); Object.assign(stats, JSON.parse(keepSt)); LS.set('stats', stats); ano = null;
    /* the cover's almanac line is one button whose label survives any quote in the text */
    const keepAF = almanacFor;
    ALMANAC.forEach(e => { almanacFor = () => ({ e, days: 0 }); const t = document.createElement('template'); t.innerHTML = almanacHtml().trim();
      const b = t.content.querySelector('#balm');
      if (t.content.children.length !== 1 || !b || !b.getAttribute('aria-label').includes(e[3]) || !b.textContent.includes(e[3])) F('the almanac line breaks on: ' + e[3]); });
    almanacFor = keepAF;
    /* the almanac's own lines never print their year */
    ALMANAC.forEach(([m, d, y, t]) => { if (new RegExp('\\b' + Math.abs(y) + '\\b').test(t)) F('the almanac line gives its year away: ' + t); });
    /* the first tap on a screen just drawn is the second of a double tap, and is not taken */
    startCron(); document.querySelector('.cron-slot').click();
    if (cron.phase !== 'place') F('a tap the moment a Cronologia screen is drawn is taken');
    cron = null; sc = 'home'; go();
    ano = null;
  } catch (e) { F('hoje EXC ' + e.stack); }
  /* ── Metas da semana: three goals a week, the same all week; one met pays a stamp, the three a medal ── */
  try {
    const keepM = LS.get('metas', null), keepSel = JSON.stringify(selos), keepSt = JSON.stringify(stats);
    LS.set('metas', null);
    _seed = 424242; const s1 = metasState();
    if (_seed !== 424242) F('drawing the week\'s goals changes the game\'s seed');
    _seed = null;
    if (s1.picks.length !== 3 || new Set(s1.picks.map(p => p[0])).size !== 3) F('the week does not have three different goals');
    if (JSON.stringify(metasState().picks) !== JSON.stringify(s1.picks)) F('the week\'s goals change during the week');
    LS.set('metas', null);
    if (metasList().some(g => g.got !== 0 || g.done)) F('a new week starts with progress');
    /* meet the first goal: its count grows by what it asks */
    const g0 = metasList()[0], s0 = metasState(); s0.base[g0.m.id] = g0.m.v() - g0.n; LS.set('metas', s0);
    const owned = Object.keys(selos).length, fresh = metasCheck();
    if (fresh.length !== 1 || !metasState().done[g0.m.id]) F('a goal met is not marked');
    if (typeof fresh[0].prize === 'string' && (!selos[fresh[0].prize] || Object.keys(selos).length !== owned + 1)) F('a goal met does not pay its stamp');
    if (metasCheck().length) F('a goal met pays twice');
    const before = stats.metasWeeks || 0, s2 = metasState();
    metasList().forEach(g => { s2.base[g.m.id] = g.m.v() - g.n; }); LS.set('metas', s2); metasCheck();
    if ((stats.metasWeeks || 0) !== before + 1 || !metasState().full) F('the three goals met do not count as a full week');
    metasCheck(); if ((stats.metasWeeks || 0) !== before + 1) F('a full week counts twice');
    /* a new week starts from the counts as last seen: a game played before its first screen counts in it */
    const sp = metasState(); sp.wk -= 1; sp.snap = metasVals(); Object.keys(sp.snap).forEach(k => { sp.snap[k] -= 1; }); LS.set('metas', sp);
    if (metasList().some(g => g.got !== 1)) F('the first game of a new week does not count: ' + JSON.stringify(metasList().map(g => g.got)));
    /* a clock gone back across a Monday keeps the week there is */
    const sf = metasState(); sf.wk += 1; LS.set('metas', sf);
    if (metasState().wk !== sf.wk) F('a clock gone back redraws the week');
    /* everyone draws the same: a goal a player cannot play is left out after the draw, not before */
    LS.set('metas', null); const normal = metasState().picks;
    const fm = METAS.find(m => m.id === 'figs'), okF = fm.ok; fm.ok = () => false;
    LS.set('metas', null); const nofig = metasState().picks; fm.ok = okF;
    const kept3 = normal.filter(p => p[0] !== 'figs');
    if (kept3.some(p => { const q = nofig.find(x => x[0] === p[0]); return !q || (q[1] !== p[1] && !METAS.find(m => m.id === p[0]).days); })) F('a nearly full album changes the other goals: ' + JSON.stringify([normal, nofig]));
    /* Que ano? pays its goal on the answer that meets it; Hoje's points are not Que ano?'s */
    LS.set('metas', null); const sa = metasState(); sa.picks = [['anos', 100], sa.picks[1], sa.picks[2]].filter(Boolean).slice(0, 3); sa.base.anos = stats.anoPts || 0; sa.done = {}; LS.set('metas', sa);
    startAno(); ano.guess = ano.qs[0].e.y; anoCommit();
    if (!metasState().done.anos) F('the Que ano? goal is not paid by the answer that meets it');
    const ap = stats.anoPts || 0; ano = buildHoje(new Date(2026, 4, 10)); ano.guess = ano.qs[0].e.y; anoCommit();
    if ((stats.anoPts || 0) !== ap) F('Hoje na História points count as Que ano? points');
    ano = null; sc = 'home';
    document.querySelectorAll('.meta-toast').forEach(e => e.remove()); _metaQ.length = 0;
    LS.set('metas', keepM); selos = JSON.parse(keepSel); LS.set('selos', selos); Object.assign(stats, JSON.parse(keepSt)); LS.set('stats', stats);
    runSelos = [];
  } catch (e) { F('metas EXC ' + e.stack); }
  note.ms = Date.now() - T0;
  return { fails, note };
})()
"""

head = "<script>window.__errs=[];window.addEventListener('error',function(e){__errs.push((e.message||'')+' @line '+e.lineno);});</script>"
src = io.open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()

# Every picture the page or the service worker names must be in the repo. The
# atelier textures (paper, brush strokes, slips) were once left behind in a
# port, and the page still booted: it just lost its buttons and backgrounds.
missing = []
for name in ("index.html", "app.js", "sw.js", "manifest.json"):
    text = io.open(os.path.join(ROOT, name), encoding="utf-8").read()
    for ref in sorted(set(re.findall(r"(?:img|icons)/[A-Za-z0-9_./-]+\.(?:webp|png|jpg|jpeg|svg|gif|woff2)", text))):
        if not os.path.isfile(os.path.join(ROOT, ref)):
            missing.append("%s names %s" % (name, ref))
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
for f in missing: print("  MISSING FILE", f)
print(json.dumps(res["note"], ensure_ascii=False))
bad = len(d["errs"]) + len(res["fails"]) + len(missing)
print("%d problem(s)" % bad)
sys.exit(1 if bad else 0)
