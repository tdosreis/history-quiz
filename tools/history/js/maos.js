
/* ═══════════════════════════════════════════════════
   COM AS MÃOS — two ways to answer that are not a tile to mark
   SOLETRE: a portrait and a line about whoever it is; the name is spelled
   from a tray of letter tiles, one tap a letter, into the blanks. The easy
   ones give the first letter of each word; the hard ones mix in letters that
   do not belong. PARES: three or four figures on the left, as many epithets,
   countries or centuries on the right; a tap on one and then on the other
   ties them with a numbered knot; all tied, it is checked.
   Both are provas of the climb (js/prova.js deals them) and both are games
   of their own on the Jogos page, played in a row until the first miss.
═══════════════════════════════════════════════════ */
const _mRnd = st => { let t = (st.rs = (st.rs + 0x6D2B79F5) | 0); t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const _mShuf = (a, st) => { a = a.slice(); for (let k = a.length - 1; k > 0; k--) { const j = Math.floor(_mRnd(st) * (k + 1)); [a[k], a[j]] = [a[j], a[k]]; } return a; };
/* a right answer sticks the figure in the album, as on the board; `fresh` is true when it was not there */
function _mStick(id, inRun) {
  const fresh = collect([id]);
  try { const pulls = pullCopies([id], fresh, 1); if (inRun) { runNew += fresh.length; runNewIds.push(...fresh); runPulls.push(...pulls); } } catch (e) {}
  return fresh.length > 0;
}

/* ── SOLETRE ── */
const SL_DECOY = 'AEIORSNLTMCDUPBGV';
/* the words to spell: the name up to a comma ("Alexandre, o Grande" is ALEXANDRE), one or two words, five to twelve letters */
function slWords(p) {
  const w = p.n.split(',')[0].trim().split(/\s+/);
  if (!w.length || w.length > 2 || w.some(x => /^[IVX]+$/.test(x) || /[^A-Za-zÀ-ÿ]/.test(x))) return null;
  const n = w.join('').length;
  if (n < 5 || n > 12 || (w.length === 2 && w.some(x => x.length < 3))) return null;
  return w.map(x => [...x.toUpperCase()]);
}
const slPool = () => PL.filter(p => p.img && slWords(p));
/* what is dealt: who, which blanks come filled, and the tray in its shuffled order.
   level 1–5: the first letter of each word given (1–2), of the first word only (3), none and three stray letters (4–5) */
function slDeal(p, level, st) {
  const words = slWords(p), flat = words.flat();
  const given = new Set();
  let at = 0;
  words.forEach((w, k) => { if (level <= 2 || (level === 3 && k === 0)) given.add(at); at += w.length; });
  const tray = flat.map((ch, i) => ({ ch, i })).filter(t => !given.has(t.i)).map(t => t.ch);
  const stray = level >= 4 ? 3 : level === 3 ? 1 : 0;
  for (let k = 0; k < stray; k++) tray.push(SL_DECOY[Math.floor(_mRnd(st) * SL_DECOY.length)]);
  return { id: p.id, given: [...given], tray: _mShuf(tray, st), level };
}
let sl = null;   // { p, words, flat, given:Set, tray:[ch], put:[tray index | null per blank], phase:'play'|'rev', ok, quest, run, best0, rs, level, fresh }
function slSet(d, extra) {
  const p = PL.find(x => x.id === d.id), words = slWords(p), flat = words.flat();
  sl = Object.assign({ p, words, flat, given: new Set(d.given), tray: d.tray.slice(), put: flat.map(() => null), phase: 'play', ok: null, level: d.level }, extra || {});
}
function slNext() {
  /* a game of one's own: the names get harder as the run grows, and none comes twice */
  const level = sl.run < 2 ? 2 : sl.run < 5 ? 3 : 4;
  const pool = slPool().filter(p => !sl.used.has(p.id) && (level > 2 || FAMOUS.has(p.id) || sl.run > 0));
  const p = (pool.length ? pool : slPool())[Math.floor(_mRnd(sl) * (pool.length || slPool().length))];
  const keep = { run: sl.run, used: sl.used, rs: sl.rs, best0: sl.best0, free: true };
  keep.used.add(p.id);
  const d = slDeal(p, level, keep);
  slSet(d, keep);
}
function startSoletra() {
  isDaily = false; isSurv = false; isMil = false; isRev = false;
  sl = { run: 0, used: new Set(), rs: (Math.random() * 2147483647) | 0, best0: LS.get('soletraBest', 0) };
  slNext();
  sc = 'soletra'; go();
}
const slFold = s => _fold(s).toUpperCase();
/* a letter of the tray goes to the first empty blank; a tap on a blank sends its letter back */
function slTap(k) {
  if (!sl || sl.phase !== 'play' || sl.put.includes(k)) return;
  const at = sl.flat.findIndex((ch, i) => !sl.given.has(i) && sl.put[i] === null);
  if (at < 0) return;
  sl.put[at] = k; snd.tap(); go();
}
function slBack(i) {
  if (!sl || sl.phase !== 'play' || sl.put[i] === null) return;
  sl.put[i] = null; snd.swipe(); go();
}
const slFull = () => sl.flat.every((ch, i) => sl.given.has(i) || sl.put[i] !== null);
function slCheck() {
  if (!sl || sl.phase !== 'play' || !slFull()) return;
  sl.ok = sl.flat.every((ch, i) => sl.given.has(i) || slFold(sl.tray[sl.put[i]]) === slFold(ch));
  sl.phase = 'rev';
  if (sl.ok) {
    sl.fresh = _mStick(sl.p.id, !!sl.quest);
    stats.soletras = (stats.soletras || 0) + 1;
    if (sl.free) { sl.run++; if (sl.run > LS.get('soletraBest', 0)) LS.set('soletraBest', sl.run); }
    LS.set('stats', stats);
    try { snd.correct(Math.min(sl.run || 0, 8)); } catch (e) {}
  } else { try { snd.wrong(); haptic([28, 45, 28]); } catch (e) {} }
  go();
  if (sl.ok) requestAnimationFrame(() => { try { fx.splash(document.querySelector('.sl-word'), '#3A9C6E', 12); } catch (e) {} });
  else requestAnimationFrame(() => { try { fx.edge('#B3402F', false); } catch (e) {} });
}
function slGo() {
  if (!sl || sl.phase !== 'rev') return;
  if (sl.quest) return provaDone(sl.ok);
  if (sl.ok) { slNext(); go(); } else startSoletra();
}
function soletraHtml() {
  if (!sl) { sl = { run: 0, used: new Set(), rs: (Math.random() * 2147483647) | 0, best0: LS.get('soletraBest', 0) }; slNext(); }
  const p = sl.p, rev = sl.phase === 'rev', Q = sl.quest;
  let at = 0;
  const word = sl.words.map(w => `<span class="sl-w">${w.map(ch => {
    const i = at++, k = sl.put[i], giv = sl.given.has(i);
    const shown = rev ? ch : giv ? ch : k !== null ? sl.tray[k] : '';
    const bad = rev && !giv && (k === null || slFold(sl.tray[k]) !== slFold(ch));
    return `<button class="sl-b${giv ? ' is-given' : ''}${shown ? ' is-on' : ''}${rev ? (bad ? ' is-bad' : ' is-good') : ''}" data-b="${i}" type="button"${giv || rev || k === null ? ' disabled' : ''}
      aria-label="${shown ? 'Letra ' + shown : 'Vazio'}">${shown}</button>`;
  }).join('')}</span>`).join('');
  const clue = [POS_NAME[p.pos], 'nasceu no ' + centTxt(p.era[0]), sl.level <= 3 && CTRY_NAME[p.ctry] && !NAT_SKIP.has(p.id) ? ctryEm(p.ctry) : ''].filter(Boolean).join(' · ');
  return `
  <div class="pg sl-pg${rev ? ' is-rev' : ''}">
    ${Q ? provaBar() : topbar('Soletre')}
    ${Q ? '' : `<div class="ano-head pv-head"><span class="aod-run">${ICON.flame('currentColor', 13)} <b class="num">${sl.run}</b> ${sl.run === 1 ? 'nome' : 'nomes'} seguidos</span><span class="aod-best">Recorde <b class="num">${Math.max(sl.best0, sl.run)}</b></span></div>`}
    <div class="sl-card">
      <span class="sl-pic"><img src="${p.img}" alt="" draggable="false"></span>
      <p class="sl-clue">${clue}</p>
      ${sl.level <= 2 && prNickOk(p) ? `<p class="sl-nick">“${_esc(p.nick)}”</p>` : ''}
    </div>
    <div class="sl-word" role="group" aria-label="O nome, letra por letra">${word}</div>
    ${rev ? `<div class="sl-after">
        ${Q ? provaVerdict(sl.ok) : `<div class="pv-verdict ${sl.ok ? 'is-good' : 'is-bad'}" role="status"><b>${sl.ok ? ICON.check('currentColor', 14) + ' Isso!' : ICON.cross('currentColor', 14) + ' Não era assim'}</b>
          <small>${sl.ok ? `${_esc(p.n)}${sl.fresh ? ' · figurinha nova no álbum' : ''}` : `Era ${_esc(p.n)} · ${sl.run} ${sl.run === 1 ? 'nome' : 'nomes'} seguidos`}</small></div>`}
        ${Q && sl.ok && sl.fresh ? '<p class="pv-rule">Figurinha nova no álbum</p>' : ''}
        ${Q && !sl.ok ? `<p class="pv-rule">Era <b>${_esc(p.n)}</b></p>` : ''}
        <button id="sl-go" class="btn btn-brass" type="button">${Q ? provaGoLabel(sl.ok) : sl.ok ? 'Próximo nome' : 'De novo'}</button>
      </div>`
    : `<div class="sl-tray" role="group" aria-label="Letras">${sl.tray.map((ch, k) =>
        `<button class="sl-t${sl.put.includes(k) ? ' is-used' : ''}" data-t="${k}" type="button"${sl.put.includes(k) ? ' disabled' : ''}>${ch}</button>`).join('')}</div>
      <div class="foot-row">
        <button id="sl-clear" class="btn btn-ghost btn-sm" type="button"${sl.put.some(k => k !== null) ? '' : ' disabled'}>Limpar</button>
        <button id="sl-ok" class="btn btn-brass btn-lg" type="button"${slFull() ? '' : ' disabled'}>${ICON.check('currentColor', 14)} Confirmar</button>
      </div>`}
  </div>`;
}
function wireSoletra() {
  if (!sl) return;
  const ready = tapArmed(250);
  document.querySelectorAll('.sl-t').forEach(b => b.addEventListener('click', () => slTap(+b.dataset.t)));
  document.querySelectorAll('.sl-b').forEach(b => b.addEventListener('click', () => slBack(+b.dataset.b)));
  document.getElementById('sl-clear')?.addEventListener('click', () => { sl.put = sl.put.map(() => null); snd.swipe(); go(); });
  document.getElementById('sl-ok')?.addEventListener('click', () => { if (ready()) slCheck(); });
  document.getElementById('sl-go')?.addEventListener('click', () => { if (ready()) { snd.swipe(); slGo(); } });
}

/* ── PARES ── */
const PR_REL = {
  nick: { h: 'Ligue cada personagem ao seu epíteto',          of: p => '“' + p.nick + '”' },
  ctry: { h: 'Ligue cada personagem ao país onde nasceu',     of: p => CTRY_NAME[p.ctry] },
  cent: { h: 'Ligue cada personagem ao século em que nasceu', of: p => centTxt(p.era[0]).replace(/^s/, 'S') },
};
/* an epithet may not give its owner away: no word of the name in it */
function prNickOk(p) {
  if (!p.nick) return false;
  const nk = _fold(p.nick);
  return !_fold(p.n).split(/[^a-z0-9]+/).filter(w => w.length >= 4).some(w => nk.includes(w));
}
const prFits = { nick: prNickOk, ctry: p => !NAT_SKIP.has(p.id) && !!CTRY_NAME[p.ctry], cent: p => !!p.era };
/* n figures whose answers are all different, and the answers in a shuffled order (never the order of the figures) */
function prDeal(rel, n, famous, st) {
  const of = PR_REL[rel].of, got = [], seen = new Set();
  for (const p of _mShuf(PL.filter(p => p.img && prFits[rel](p) && (!famous || FAMOUS.has(p.id))), st)) {
    const v = of(p);
    if (seen.has(v)) continue;
    seen.add(v); got.push(p);
    if (got.length === n) break;
  }
  if (got.length < n) return null;
  let order;
  do { order = _mShuf(got.map((_, i) => i), st); } while (order.every((v, i) => v === i));
  return { rel, ids: got.map(p => p.id), order };
}
let pr = null;   // { rel, left:[p], right:[left index shown at each place on the right], link:[right place | null per left], cur, phase, ok, quest, run, best0, rs, free }
function prSet(d, extra) {
  pr = Object.assign({ rel: d.rel, left: d.ids.map(id => PL.find(p => p.id === id)), right: d.order.slice(), link: d.ids.map(() => null), cur: null, phase: 'play', ok: null }, extra || {});
}
function prNext() {
  const keep = { run: pr.run, rs: pr.rs, best0: pr.best0, free: true };
  const rel = ['nick', 'ctry', 'cent'][Math.floor(_mRnd(keep) * 3)], n = keep.run < 3 ? 3 : 4;
  const d = prDeal(rel, n, keep.run < 2, keep) || prDeal('ctry', 3, false, keep);
  prSet(d, keep);
}
function startPares() {
  isDaily = false; isSurv = false; isMil = false; isRev = false;
  pr = { run: 0, rs: (Math.random() * 2147483647) | 0, best0: LS.get('paresBest', 0) };
  prNext();
  sc = 'pares'; go();
}
function prTapLeft(i) {
  if (!pr || pr.phase !== 'play') return;
  pr.cur = pr.cur === i ? null : i; snd.tap(); go();
}
function prTapRight(r) {
  if (!pr || pr.phase !== 'play') return;
  const owner = pr.link.indexOf(r);
  if (pr.cur === null) {                     // no figure in hand: a tied answer comes loose, with its figure in hand again
    if (owner >= 0) { pr.link[owner] = null; pr.cur = owner; snd.swipe(); go(); }
    return;
  }
  if (owner >= 0) pr.link[owner] = null;     // the answer changes hands
  pr.link[pr.cur] = r;
  /* the next figure still loose is in hand, so three taps in a row tie three pairs */
  const nx = pr.link.findIndex(v => v === null);
  pr.cur = nx >= 0 ? nx : null;
  try { snd.pin(); } catch (e) { snd.tap(); }
  go();
}
function prCheck() {
  if (!pr || pr.phase !== 'play' || pr.link.includes(null)) return;
  pr.ok = pr.link.every((r, i) => pr.right[r] === i);
  pr.phase = 'rev'; pr.cur = null;
  if (pr.ok) {
    stats.pares = (stats.pares || 0) + 1;
    if (pr.free) { pr.run++; if (pr.run > LS.get('paresBest', 0)) LS.set('paresBest', pr.run); }
    LS.set('stats', stats);
    try { snd.correct(Math.min(pr.run || 0, 8)); } catch (e) {}
  } else { try { snd.wrong(); haptic([28, 45, 28]); } catch (e) {} }
  go();
  if (!pr.ok) requestAnimationFrame(() => { try { fx.edge('#B3402F', false); } catch (e) {} });
}
function prGo() {
  if (!pr || pr.phase !== 'rev') return;
  if (pr.quest) return provaDone(pr.ok);
  if (pr.ok) { prNext(); go(); } else startPares();
}
function paresHtml() {
  if (!pr) { pr = { run: 0, rs: (Math.random() * 2147483647) | 0, best0: LS.get('paresBest', 0) }; prNext(); }
  const rev = pr.phase === 'rev', Q = pr.quest, of = PR_REL[pr.rel].of, n = pr.left.length;
  const knot = i => `<i class="pr-k pr-k${i}" aria-hidden="true">${i + 1}</i>`;
  const left = pr.left.map((p, i) => {
    const tied = pr.link[i] !== null, good = rev && pr.right[pr.link[i]] === i;
    return `<button class="pr-l${pr.cur === i ? ' is-cur' : ''}${tied ? ' is-tied' : ''}${rev ? (good ? ' is-good' : ' is-bad') : ''}" data-l="${i}" type="button"${rev ? ' disabled' : ''}
      aria-label="${_esc(p.n)}${tied ? ', ligado a ' + _esc(of(pr.left[pr.right[pr.link[i]]])) : ''}">
      <span class="pr-pic"><img src="${p.img}" alt="" draggable="false"></span><b>${_esc(p.n)}</b>${tied ? knot(i) : ''}
      ${rev && !good ? `<small>${_esc(of(p))}</small>` : ''}</button>`;
  }).join('');
  const right = pr.right.map((li, r) => {
    const owner = pr.link.indexOf(r), good = rev && owner === li;
    return `<button class="pr-r${owner >= 0 ? ' is-tied' : ''}${rev ? (good ? ' is-good' : ' is-bad') : ''}" data-r="${r}" type="button"${rev ? ' disabled' : ''}>
      ${owner >= 0 ? knot(owner) : ''}<span>${pr.rel === 'ctry' && FLAGS[pr.left[li].ctry] ? `<i class="pr-flag">${flagSVG(pr.left[li].ctry, 12)}</i>` : ''}${_esc(of(pr.left[li]))}</span></button>`;
  }).join('');
  return `
  <div class="pg pr-pg pr-n${n}${rev ? ' is-rev' : ''}">
    ${Q ? provaBar() : topbar('Pares')}
    ${Q ? '' : `<div class="ano-head pv-head"><span class="aod-run">${ICON.flame('currentColor', 13)} <b class="num">${pr.run}</b> ${pr.run === 1 ? 'rodada' : 'rodadas'} seguidas</span><span class="aod-best">Recorde <b class="num">${Math.max(pr.best0, pr.run)}</b></span></div>`}
    <p class="pr-h display"><em>${PR_REL[pr.rel].h}</em></p>
    <div class="pr-board"><div class="pr-col">${left}</div><div class="pr-col">${right}</div></div>
    ${rev ? `<div class="sl-after">
        ${Q ? provaVerdict(pr.ok) : `<div class="pv-verdict ${pr.ok ? 'is-good' : 'is-bad'}" role="status"><b>${pr.ok ? ICON.check('currentColor', 14) + ' Todos certos!' : ICON.cross('currentColor', 14) + ' Não foi desta vez'}</b>
          <small>${pr.ok ? 'Pares feitos' : `${pr.run} ${pr.run === 1 ? 'rodada' : 'rodadas'} seguidas`}</small></div>`}
        <button id="pr-go" class="btn btn-brass" type="button">${Q ? provaGoLabel(pr.ok) : pr.ok ? 'Próxima rodada' : 'De novo'}</button>
      </div>`
    : `<p class="pv-rule">${pr.cur !== null ? `Agora toque ${pr.rel === 'nick' ? 'no epíteto' : pr.rel === 'ctry' ? 'no país' : 'no século'} de <b>${_esc(pr.left[pr.cur].n)}</b>` : pr.link.includes(null) ? 'Toque num personagem e depois na resposta dele' : 'Tudo ligado: confira, ou toque numa resposta para soltá-la'}</p>
      <div class="foot-row"><button id="pr-ok" class="btn btn-brass btn-lg" type="button"${pr.link.includes(null) ? ' disabled' : ''}>${ICON.check('currentColor', 14)} Confirmar</button></div>`}
  </div>`;
}
function wirePares() {
  if (!pr) return;
  const ready = tapArmed(250);
  document.querySelectorAll('.pr-l').forEach(b => b.addEventListener('click', () => prTapLeft(+b.dataset.l)));
  document.querySelectorAll('.pr-r').forEach(b => b.addEventListener('click', () => prTapRight(+b.dataset.r)));
  document.getElementById('pr-ok')?.addEventListener('click', () => { if (ready()) prCheck(); });
  document.getElementById('pr-go')?.addEventListener('click', () => { if (ready()) { snd.swipe(); prGo(); } });
}
