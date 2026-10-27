
/* ═══════════════════════════════════════════════════
   JORNADA PELA HISTÓRIA — the history of the world as a road, stop by stop
   Six eras, three stops each, and at the end of the road the Arquivo Secreto.
   A stop is a round of its own part of history, eight questions from easy to
   hard: half of them right passes it and opens the next stop, more give more
   stars (three at most). The road is drawn as an old map, an era a page, the
   stops as medallions with their scene; an era with all its stops passed is
   sealed. The rounds are the game's own (its clock, its lifelines, its
   stickers), only kept apart from the difficulty records.
═══════════════════════════════════════════════════ */
const JOR_N = 8;
const JOR_ERAS = [
  { id: 'antiga', n: 'Antiguidade', roman: 'I', ic: 'pyramid', col: '#9E1B1B', stops: [
    { id: 'nilo', n: 'Às margens do Nilo', sub: 'Egito e Mesopotâmia', cats: ['egito_mesopotamia'], scene: 'piramides_gize' },
    { id: 'atenas', n: 'A Grécia dos filósofos', sub: 'Atenas, Esparta e Alexandre', cats: ['grecia'], scene: 'teatro_grego' },
    { id: 'roma', n: 'Todos os caminhos', sub: 'Da República ao Império Romano', cats: ['roma'], scene: 'forum_romano' } ] },
  { id: 'media', n: 'Idade Média', roman: 'II', ic: 'castle', col: '#6B4A2E', stops: [
    { id: 'castelos', n: 'Castelos e cruzadas', sub: 'A Europa medieval', cats: ['medieval'], scene: 'torre_branca' },
    { id: 'seda', n: 'A Rota da Seda', sub: 'China, Japão, Índia e as estepes', cats: ['oriente'], scene: 'samarcanda' },
    { id: 'mali', n: 'O ouro do Mali', sub: 'Reinos e impérios africanos', cats: ['africa'], scene: 'caravana_mali' } ] },
  { id: 'navegacoes', n: 'Navegações e Renascimento', roman: 'III', ic: 'ship', col: '#2E5E7E', stops: [
    { id: 'mar', n: 'Mares nunca dantes navegados', sub: 'As Grandes Navegações', cats: ['descobrimentos'], scene: 'adamastor' },
    { id: 'florenca', n: 'Florença e a Reforma', sub: 'Renascimento, Reforma e artes', cats: ['renascimento', 'artes'], scene: 'afresco_vaticano' },
    { id: 'novo_mundo', n: 'O Novo Mundo', sub: 'Maias, astecas, incas e independências', cats: ['americas'], scene: 'tenochtitlan' } ] },
  { id: 'revolucoes', n: 'Reis e revoluções', roman: 'IV', ic: 'crown', col: '#7B2D26', stops: [
    { id: 'versalhes', n: 'O Rei Sol', sub: 'Absolutismo e Luzes', cats: ['absolutismo', 'idade_moderna'], scene: 'versalhes_espelhos' },
    { id: 'bastilha', n: 'A queda da Bastilha', sub: 'A era das revoluções', cats: ['revolucoes'], scene: 'guilhotina' },
    { id: 'vapor', n: 'O século do vapor', sub: 'O século XIX, a ciência e as invenções', cats: ['seculo19', 'ciencia'], scene: 'locomotiva_vapor' } ] },
  { id: 'brasil', n: 'Brasil', roman: 'V', ic: 'flag', col: '#2E6B3F', stops: [
    { id: 'terra', n: 'Terra à vista', sub: 'O Brasil Colônia e Império', cats: ['brasil_colonia'], scene: 'chegada_cabral' },
    { id: 'republica', n: 'Viva a República', sub: 'O Brasil republicano', cats: ['brasil_republica'], scene: 'republica_1889' },
    { id: 'gente', n: 'Gente que fez o Brasil', sub: 'Brasileiros de todas as épocas', who: 'BRA', scene: 'abaporu' } ] },
  { id: 'seculo20', n: 'O século XX', roman: 'VI', ic: 'rocket', col: '#3A4A5C', stops: [
    { id: 'guerras', n: 'As grandes guerras', sub: 'A Primeira e a Segunda Guerra', cats: ['guerras_mundiais'], scene: 'ev_segunda_guerra' },
    { id: 'lua', n: 'Rumo à Lua', sub: 'A Guerra Fria e a corrida espacial', cats: ['guerra_fria'], scene: 'pouso_lua' },
    { id: 'seculo', n: 'Um século de mudanças', sub: 'Do voto das mulheres aos direitos civis', cats: ['seculo20', 'mulheres'], scene: 'onibus_montgomery' } ] },
  /* the end of the road: one stop, ten of the hardest questions from anywhere */
  { id: 'arquivo', n: 'O Arquivo Secreto', roman: 'VII', ic: 'book', col: '#5A3E1B', fin: true, stops: [
    { id: 'arquivo', n: 'O Arquivo Secreto', sub: 'As perguntas mais difíceis, de todas as épocas', all: true, size: 10, scene: 'biblioteca_alexandria' } ] },
];
const JOR_STOPS = JOR_ERAS.flatMap(e => e.stops.map(s => Object.assign(s, { era: e })));
/* where the stops of a page stand on its map, in per cent of it */
const JOR_AT = { 3: [[27, 17], [71, 45], [31, 74]], 1: [[50, 44]] };
let jorPage = null, jorSel = null;

const jorProg = () => { const p = LS.get('jornada', null); return p && p.st ? p : { st: {}, pts: {} }; };
const jorStars = id => jorProg().st[id] || 0;
/* the first stop not yet passed (or none: the road is done) */
const jorNextIdx = () => { const p = jorProg(); const i = JOR_STOPS.findIndex(s => !(p.st[s.id] > 0)); return i; };
const jorOpen = i => i === 0 || jorStars(JOR_STOPS[i - 1].id) > 0;
const jorTotal = () => JOR_STOPS.reduce((n, s) => n + jorStars(s.id), 0);
/* how many right for one, two and three stars, out of n */
const jorNeed = n => [Math.ceil(n / 2), Math.ceil(n * .65), Math.ceil(n * .875)];
const jorStarsFor = (right, n) => jorNeed(n).filter(k => right >= k).length;
const jorEraDone = (e, p) => e.stops.every(s => (p.st[s.id] || 0) > 0);
const isJorRun = () => !!(cat && cat.themed && cat.themed.jor != null);

/* a stop's questions: its categories (or its people, or the hardest of all), dealt easy to hard */
function jorPool(stop) {
  const all = CATS.flatMap(c => c.qs.map(q => ({ ...q, _cat: c })));
  if (stop.all) return all.filter(q => q.d >= 3);
  if (stop.who) return all.filter(q => {
    const id = q.type === 'player' && !q.order ? q.a[0] : q.detail ? q.detail.who : null;
    const p = id && PL.find(x => x.id === id);
    return p && p.ctry === stop.who;
  });
  return all.filter(q => stop.cats.includes(q._cat.id));
}
function jorDeal(stop) {
  const n = stop.size || JOR_N, pool = shuf(jorPool(stop)), took = new Set(), ans = new Set(), out = [];
  const take = (f, k) => { for (const q of pool) {
    if (out.length >= n || k <= 0) return;
    if (took.has(q) || ans.has(ansKey(q)) || !f(q)) continue;
    took.add(q); ans.add(ansKey(q)); out.push(q); k--;
  } };
  const third = Math.round(n * 3 / 8);
  take(q => q.d <= 2, third);
  take(q => q.d >= 2 && q.d <= 3, third);
  take(q => q.d >= 3, n - 2 * third);
  take(() => true, n);
  return out.sort((a, b) => a.d - b.d);
}
/* a themed round on the game's own board: Novidades and the Jornada's stops */
function startThemed(c) {
  isDaily = false; isSurv = false; isMil = false; isRev = false;
  diffKey = 'moderado';
  runSeed = null;
  cat = c;
  qi = 0; sel.clear(); pts = 0; prevPts = 0; streak = 0;
  nCorrect = 0; nPartial = 0; bestStreak = 0; lastGain = 0; runLog = []; runNew = 0; runNewIds = []; runPulls = []; runSelos = []; runPackOpened = false; gameN++;
  resetLifes();
  sc = 'quiz'; tMax = qTime(); tLeft = tMax; lastMsg = '';
  disp = dealDisp(0);
  startTmr();
  go();
}
function startJor(i) {
  const s = JOR_STOPS[i];
  if (!s || !jorOpen(i)) return;
  window._jorRes = null;
  startThemed({ id: 'jor', name: s.n, emoji: '🗺️', tag: s.sub, col: s.era.col, diff: 'Jornada', qs: jorDeal(s),
    themed: { label: 'Jornada · ' + s.n, again: () => startJor(i), jor: i } });
}
/* the round is over: its stars kept (the best of them), what it opened said on the results */
function jorFinish(i) {
  const s = JOR_STOPS[i], n = cat.qs.length, st = jorStarsFor(nCorrect, n), p = jorProg();
  const prev = p.st[s.id] || 0, eraWas = jorEraDone(s.era, p);
  if (st > prev) p.st[s.id] = st;
  p.pts[s.id] = Math.max(p.pts[s.id] || 0, pts);
  LS.set('jornada', p);
  const need = jorNeed(n);
  stats.jorRounds = (stats.jorRounds || 0) + 1;
  stats.jorStars = jorTotal();
  stats.jorDone = JOR_STOPS.filter(x => (p.st[x.id] || 0) > 0).length;
  stats.jorEras = JOR_ERAS.filter(e => jorEraDone(e, p)).length;
  window._jorRes = { i, st, prev, best: Math.max(st, prev), more: st < 3 ? need[st] - nCorrect : 0,
    next: st > 0 && i + 1 < JOR_STOPS.length ? i + 1 : null, opened: st > 0 && prev === 0 && i + 1 < JOR_STOPS.length,
    eraNew: !eraWas && jorEraDone(s.era, p) ? s.era : null, end: st > 0 && prev === 0 && i === JOR_STOPS.length - 1 };
}

/* ── the pictures ── */
const JOR_STAR = (on, s) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" aria-hidden="true"><path d="M12 2.6l2.9 6 6.5.8-4.8 4.5 1.2 6.5L12 17.2l-5.8 3.2 1.2-6.5L2.6 9.4l6.5-.8Z"
  fill="${on ? '#E0B04A' : 'none'}" stroke="${on ? '#8A5A14' : 'currentColor'}" stroke-width="1.4" stroke-linejoin="round"/></svg>`;
const jorStarRow = (n, s, cls) => `<span class="jor-stars${cls ? ' ' + cls : ''}" aria-label="${n} de 3 estrelas">${[0, 1, 2].map(k => JOR_STAR(k < n, s)).join('')}</span>`;
const jorScene = (id, w) => (sceneSvg({ id }, w) || ART.hourglass(w))
  .replace('<svg ', '<svg preserveAspectRatio="xMidYMid slice" ').replace('style="display:block;max-width:100%;height:auto;"', 'style="display:block;width:100%;height:100%"');
const JOR_ROSE = `<svg class="jor-rose" viewBox="0 0 60 60" aria-hidden="true"><g fill="none" stroke="#6B4A22" stroke-width=".8"><circle cx="30" cy="30" r="21"/><circle cx="30" cy="30" r="17" stroke-dasharray="1.2 1.6"/></g>
  <path d="M30 4 34 26 56 30 34 34 30 56 26 34 4 30 26 26Z" fill="#B8862F" stroke="#6B4A22" stroke-width=".8" stroke-linejoin="round"/>
  <path d="M30 4 34 26 30 30ZM56 30 34 34 30 30ZM30 56 26 34 30 30ZM4 30 26 26 30 30Z" fill="#7A5420"/>
  <text x="30" y="3.2" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="5" fill="#6B4A22">N</text></svg>`;
const JOR_PIN = `<svg viewBox="0 0 30 40" aria-hidden="true"><path d="M15 38C6 24 3 19 3 13a12 12 0 0 1 24 0c0 6-3 11-12 25Z" fill="#9B2226" stroke="#4A0E10" stroke-width="1.2"/>
  <circle cx="15" cy="13" r="5" fill="#F4E4C0" stroke="#4A0E10" stroke-width="1"/></svg>`;
const JOR_LOCK = `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2" fill="#5C4A36"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="#5C4A36" stroke-width="2.2"/><circle cx="12" cy="15.3" r="1.6" fill="#E8DCC4"/></svg>`;

/* the road through a page's stops: in from the top, out at the bottom (a smooth line through them) */
function jorRoad(pts, fin) {
  const P = [[9, -6]].concat(pts).concat(fin ? [] : [[90, 106]]);
  let d = `M${P[0][0]} ${P[0][1]}`;
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1.map(v => v.toFixed(1)).join(' ')} ${c2.map(v => v.toFixed(1)).join(' ')} ${p2.join(' ')}`;
  }
  return d;
}

function jorHtml() {
  const p = jorProg(), nx = jorNextIdx();
  if (jorPage == null) jorPage = Math.max(0, JOR_ERAS.indexOf((JOR_STOPS[nx] || JOR_STOPS[JOR_STOPS.length - 1]).era));
  const e = JOR_ERAS[jorPage], at = JOR_AT[e.stops.length] || JOR_AT[3];
  const base = JOR_STOPS.indexOf(e.stops[0]), done = jorEraDone(e, p);
  const total = jorTotal(), max = JOR_STOPS.length * 3, passed = JOR_STOPS.filter(s => (p.st[s.id] || 0) > 0).length;
  const eraOpen = jorOpen(base);
  const stops = e.stops.map((s, k) => {
    const i = base + k, open = jorOpen(i), st = p.st[s.id] || 0, here = i === nx;
    const [x, y] = at[k];
    return `<button class="jor-stop${open ? '' : ' is-locked'}${here ? ' is-here' : ''}${st === 3 ? ' is-gold' : st ? ' is-done' : ''}" data-i="${i}" type="button"
        style="left:${x}%;top:${y}%" aria-label="Parada ${i + 1}: ${_esc(s.n)}. ${open ? st + ' de 3 estrelas' : 'bloqueada'}">
      ${here ? `<span class="jor-pin">${JOR_PIN}</span>` : ''}
      <span class="jor-medal">${jorScene(s.scene, 120)}${open ? '' : `<span class="jor-lock">${JOR_LOCK}</span>`}</span>
      <span class="jor-name"><i>${i + 1}</i>${s.n}</span>
      ${open ? jorStarRow(st, 15) : ''}
    </button>`;
  }).join('');
  const go = nx >= 0 ? JOR_STOPS[nx] : null;
  return `
  <div class="pg jor-pg">
    ${topbar('Jornada pela História')}
    <div class="jor-head">
      <button id="jor-prev" class="jor-arrow" type="button" aria-label="Era anterior"${jorPage === 0 ? ' disabled' : ''}>${ICON.back('currentColor', 14)}</button>
      <div class="jor-cart"><small>${e.fin ? 'O fim da estrada' : 'Era ' + e.roman}</small><b>${e.n}</b></div>
      <button id="jor-next" class="jor-arrow" type="button" aria-label="Próxima era"${jorPage === JOR_ERAS.length - 1 ? ' disabled' : ''}>${ICON.back('currentColor', 14).replace('<svg', '<svg style="transform:scaleX(-1)"')}</button>
    </div>
    <div class="jor-sum"><span>${JOR_STAR(true, 13)} <b class="num">${total}</b>/${max}</span><span>${passed} de ${JOR_STOPS.length} paradas</span>
      <span class="jor-dots" aria-hidden="true">${JOR_ERAS.map((x, k) => `<i class="${k === jorPage ? 'on' : ''}${jorEraDone(x, p) ? ' ok' : ''}"></i>`).join('')}</span></div>
    <div class="jor-map${eraOpen ? '' : ' is-fog'}${e.fin ? ' is-fin' : ''}" id="jor-map" style="--era:${e.col}">
      <span class="jor-mark" aria-hidden="true">${(QICON[e.ic] || QICON.scroll)(220)}</span>
      <svg class="jor-road" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="${jorRoad(at, e.fin)}" fill="none" stroke="#6B4A22" stroke-width="2.4" stroke-dasharray="2 7" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>
      ${JOR_ROSE}
      ${stops}
      ${done ? `<span class="jor-sealed" aria-hidden="true"><small>Era</small>${e.roman}<small>${e.fin ? 'vencida' : 'concluída'}</small></span>` : ''}
      ${!eraOpen ? '<span class="jor-fog-t">Terra incógnita</span>' : ''}
    </div>
    <div class="jor-foot">
      ${go ? `<button id="jor-go" class="btn btn-brass btn-lg" type="button">${ICON.play('currentColor', 13)} Parada ${nx + 1}: ${go.n}</button>`
        : `<p class="jor-endline">${JOR_STAR(true, 16)} A Jornada inteira, percorrida. Volte às paradas para mais estrelas.</p>`}
    </div>
    ${jorSel != null ? jorSheet(jorSel) : ''}
  </div>`;
}

/* a stop, close up: what it is, what it takes, what it has given */
function jorSheet(i) {
  const s = JOR_STOPS[i], open = jorOpen(i), st = jorStars(s.id), n = s.size || JOR_N, need = jorNeed(n);
  return `<div class="jor-veil" id="jor-veil"></div>
  <div class="jor-sheet" role="dialog" aria-label="Parada ${i + 1}: ${_esc(s.n)}" style="--era:${s.era.col}">
    <span class="jor-sheet-pic">${jorScene(s.scene, 240)}</span>
    <span class="jor-sheet-k">Parada ${i + 1} · ${s.era.fin ? 'o fim da estrada' : 'Era ' + s.era.roman}</span>
    <b class="jor-sheet-n">${s.n}</b>
    <span class="jor-sheet-sub">${s.sub}</span>
    ${open ? `<span class="jor-sheet-need">${n} perguntas, do fácil ao difícil ·
        ${need.map((k, j) => `<span>${JOR_STAR(true, 11).repeat(j + 1)} ${k}</span>`).join('')}</span>
      ${jorStarRow(st, 22, 'jor-sheet-st')}
      <button id="jor-start" class="btn btn-brass" type="button" data-i="${i}">${ICON.play('currentColor', 12)} ${st ? 'Jogar de novo' : 'Partir'}</button>`
    : `<span class="jor-sheet-lock">${JOR_LOCK} Passe pela parada ${i} para chegar aqui.</span>`}
    <button id="jor-close" class="btn btn-ghost btn-sm" type="button">Voltar ao mapa</button>
  </div>`;
}

function wireJor() {
  const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  const ready = tapArmed();
  const page = d => { const k = Math.max(0, Math.min(JOR_ERAS.length - 1, jorPage + d)); if (k !== jorPage) { jorPage = k; jorSel = null; snd.page(); go(); } };
  on('jor-prev', () => page(-1));
  on('jor-next', () => page(1));
  document.querySelectorAll('.jor-stop').forEach(b => b.addEventListener('click', () => { if (!ready()) return; jorSel = +b.dataset.i; snd.select(); go(); }));
  on('jor-go', () => { if (!ready()) return; const i = jorNextIdx(); if (i >= 0) { jorSel = i; jorPage = JOR_ERAS.indexOf(JOR_STOPS[i].era); snd.select(); go(); } });
  on('jor-start', () => { if (!ready()) return; const i = +document.getElementById('jor-start').dataset.i; jorSel = null; snd.rung(); startJor(i); });
  const close = () => { jorSel = null; snd.swipe(); go(); };
  on('jor-close', close);
  on('jor-veil', close);
  /* a swipe across the map turns the page */
  const map = document.getElementById('jor-map');
  if (map) {
    let x0 = null;
    map.addEventListener('pointerdown', ev => { x0 = ev.clientX; }, { passive: true });
    map.addEventListener('pointerup', ev => { if (x0 == null) return; const dx = ev.clientX - x0; x0 = null; if (Math.abs(dx) > 60 && jorSel == null) page(dx < 0 ? 1 : -1); }, { passive: true });
  }
}
document.addEventListener('keydown', ev => {
  if (sc !== 'jornada' || ev.altKey || ev.ctrlKey || ev.metaKey) return;
  if (jorSel != null && ev.key === 'Escape') { jorSel = null; go(); return; }
  if (jorSel == null && (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight')) {
    const k = Math.max(0, Math.min(JOR_ERAS.length - 1, jorPage + (ev.key === 'ArrowRight' ? 1 : -1)));
    if (k !== jorPage) { jorPage = k; go(); }
  }
});

/* the round's results, for a stop: its stars instead of a title, and the way on */
function jorEndHtml() {
  const r = window._jorRes;
  if (!r) return '';
  const s = JOR_STOPS[r.i];
  const say = r.st === 3 ? 'Três estrelas!' : r.st === 0 ? `Acerte ${jorNeed(cat.qs.length)[0]} para seguir viagem`
    : `Faltou ${r.more} ${r.more === 1 ? 'acerto' : 'acertos'} para ${r.st + 1} estrelas`;
  return `<div class="jor-end">
    <span class="jor-end-k">Parada ${r.i + 1} · ${s.n}</span>
    ${jorStarRow(r.st, 30, 'jor-end-st')}
    <small>${say}${r.best > r.st ? ` · sua melhor: ${r.best}` : ''}</small>
    ${r.eraNew ? `<span class="chip chip-brass jor-era-chip">${ICON.flag('currentColor', 11)} ${r.eraNew.fin ? 'A Jornada inteira, vencida!' : 'Era ' + r.eraNew.roman + ' concluída: ' + r.eraNew.n}</span>`
      : r.opened ? `<span class="chip chip-soft jor-open-chip">${ICON.play('currentColor', 10)} Parada ${r.next + 1} aberta: ${JOR_STOPS[r.next].n}</span>` : ''}
  </div>`;
}
