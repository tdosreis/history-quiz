
/* ═══════════════════════════════════════════════════
   NO RASTRO DO LADRÃO — a relic stolen, and a thief who runs from city to
   city. At each stop the witnesses leave clues to the next one: something
   that happened there (one of the Que ano? events, with its year), what
   the thief bought or wore, a photograph left behind. Three places are on
   the map; the player flies to one. The right one and the trail goes on;
   a wrong one and the trail is cold there, and the way back costs hours.
   The clock is the case's: when it runs out, the thief is gone. The map is
   Onde foi?'s two hemispheres (js/onde.js), drawn small, its camera
   following the chase.
═══════════════════════════════════════════════════ */
const LR_STOPS = 5;                 // the cities the thief runs to after the theft
const LR_RELICS = ['a coroa de ferro da Lombardia', 'o elmo de Sutton Hoo', 'a máscara de Agamenon', 'o astrolábio de Vasco da Gama',
  'a luneta de Galileu', 'o diamante Koh-i-Noor', 'o caderno de anotações de Leonardo', 'o cetro de D. Pedro II', 'o tinteiro de Machado de Assis',
  'a pena de Shakespeare', 'o violino Stradivarius “Messias”', 'o relógio de bolso de Santos Dumont', 'o cálice de Ardagh', 'o mapa de Piri Reis',
  'a espada de Carlos Magno', 'o selo imperial de Qin Shi Huang'];
const LR_THIEVES = [['a Raposa do Tempo', 'capa xadrez e luvas de veludo'], ['o Barão do Sumiço', 'chapéu-coco e bigode encerado'],
  ['a Condessa das Relíquias', 'chapéu de plumas e um leque de marfim'], ['o Mestre dos Disfarces', 'uma barba que muda de cor a cada cidade'],
  ['a Sombra de Veneza', 'máscara de carnaval e sapatos sem barulho'], ['o Gato das Catedrais', 'botas de alpinista e uma corda de seda']];
/* a country's flag, from the name at the end of a place */
const LR_FLAG_EXTRA = { 'Países Baixos': 'NED', 'Suécia': 'SWE', 'Coreia do Sul': 'KOR', 'Gana': 'GHA', 'Senegal': 'SEN', 'Nigéria': 'NGA',
  'Argélia': 'ALG', 'Romênia': 'ROU', 'País de Gales': 'WAL', 'Costa do Marfim': 'CIV', 'Camarões': 'CMR', 'Libéria': 'LBR', 'Reino Unido': 'ENG',
  'República Tcheca': 'CZE', 'Escócia': 'SCO', 'Irlanda do Norte': 'NIR', 'Síria': 'SYR', 'Bolívia': 'BOL', 'Lituânia': 'LTU',
  'Bahamas': 'BHS', 'Cazaquistão': 'KAZ', 'Bósnia e Herzegovina': 'BIH', 'Equador': 'ECU', 'Vaticano': 'VAT', 'Arábia Saudita': 'SAU', 'Canadá': 'CAN' };
let _lrFlagOf = null;
function lrFlag(place) {
  if (!_lrFlagOf) { _lrFlagOf = Object.assign({}, LR_FLAG_EXTRA); Object.entries(CTRY_NAME).forEach(([c, n]) => { _lrFlagOf[n] = c; }); }
  const c = _lrFlagOf[place.split(', ').pop().split('/')[0]];   // 'França/Itália': the first
  return c && FLAGS[c] ? c : null;
}
/* the places of the events, one stop each, with the events that happened there */
let _lrPlaces = null;
function lrPlaces() {
  if (_lrPlaces) return _lrPlaces;
  const by = {};
  ANO_EVENTS.forEach(e => { const a = ONDE_AT[e.id]; if (!a) return;
    (by[a[2]] = by[a[2]] || { name: a[2], at: [a[0], a[1]], evs: [] }).evs.push(e); });
  return (_lrPlaces = Object.values(by));
}
const lrHours = km => Math.round(2 + km / 900);

let lr = null;   // { seed, relic, thief, chain: [place], stop, at, opts, wrong, hours, max, phase, log, cam, fly }

/* the case: a chain of cities far apart, each with its three choices */
function lrNew(seed) {
  if (seed == null) seed = (Math.random() * CHAL_SEED_MAX) | 0;
  seedFrom(seed);
  const P = shuf(lrPlaces().slice()), far = (a, b, km) => ondeKm(a.at, b.at) >= km;
  const chain = [P[0]];
  for (const p of P) {
    if (chain.length > LR_STOPS) break;
    const last = chain[chain.length - 1];
    if (!chain.includes(p) && far(p, last, 1800) && (chain.length < 2 || ondeReg(p.at) !== ondeReg(last.at) || rnd() < .35)) chain.push(p);
  }
  for (const p of P) { if (chain.length > LR_STOPS) break; if (!chain.includes(p) && far(p, chain[chain.length - 1], 900)) chain.push(p); }
  /* the time the case allows: the flights it takes, and room for two wrong turns */
  let ideal = 0;
  for (let i = 1; i < chain.length; i++) ideal += lrHours(ondeKm(chain[i - 1].at, chain[i].at));
  const th = LR_THIEVES[Math.floor(rnd() * LR_THIEVES.length)];
  lr = { seed, relic: LR_RELICS[Math.floor(rnd() * LR_RELICS.length)], thief: th[0], looks: th[1], chain, stop: 0, at: chain[0],
    hours: ideal + 26, max: ideal + 26, phase: 'brief', log: [], wrong: [], n: 1000 + (seed % 9000) };
  lr.clues = chain.map((p, i) => i ? lrClues(p, i) : null);
  lr.opts = chain.map((p, i) => i ? lrOpts(p, i) : null);
  _seed = null;
}
/* the three places on the map for a stop: the right one and two far from it and from each other; from the third
   stop on, the wrong ones are sought in the same part of the world, so the clue has to be known */
function lrOpts(ans, i) {
  const P = shuf(lrPlaces().filter(p => p !== ans && !lr.chain.slice(0, i).includes(p)));
  const reg = ondeReg(ans.at), out = [ans];
  const ok = p => out.every(o => ondeKm(o.at, p.at) >= 1300);
  if (i >= 3) for (const p of P) { if (out.length >= 3) break; if (ondeReg(p.at) === reg && ok(p)) out.push(p); }
  for (const p of P) { if (out.length >= 3) break; if (ok(p)) out.push(p); }
  return shuf(out);
}
/* what the witnesses saw: something that happened at the next city, with its year; what the thief bought or wore
   for its weather; and, sometimes, a photograph left behind */
/* the note the thief dropped has the place itself smudged out — "Batalha de ▒▒▒▒▒▒" — or the clue would name the answer */
function lrBlot(t, place) {
  /* word by word, without accents: a word is smudged when it starts as one of the place's names does (Chernobyl
     for Chernobil, babilônicos for Babilônia) — four letters for a short name, five for a longer one */
  const bare = w => w.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const keys = place.split(/[^\p{L}]+/u).filter(w => w.length >= 4 && !/^(perto|della|ocidentais)$/i.test(w)).map(w => bare(w).slice(0, w.length > 4 ? 5 : 4));
  return t.replace(/\p{L}+/gu, w => w.length >= 4 && keys.some(k => bare(w).startsWith(k)) ? '▒'.repeat(Math.min(9, w.length)) : w);
}
function lrClues(p, i) {
  const e = p.evs[Math.floor(rnd() * p.evs.length)], [la, lo] = p.at, et = lrBlot(e.t, p.name);
  const ev = [`Deixou cair um bilhete com uma data e um rabisco: «${et}», ${e.c ? 'c. ' : ''}${anoYear(e.y)}.`,
    `Perguntou ao porteiro como chegar ao lugar onde aconteceu isto: «${et}» (${e.c ? 'c. ' : ''}${anoYear(e.y)}).`,
    `Comprou um livro de História aberto na página: «${et}», ${e.c ? 'c. ' : ''}${anoYear(e.y)}.`][Math.floor(rnd() * 3)];
  const wx = Math.abs(la) < 23.4 ? 'Levou chapéu de palha e protetor solar: ia para os trópicos.'
    : la > 49 ? 'Comprou um casaco de lã grosso e luvas para o frio.'
    : la < -23.4 ? 'Disse que ia para o sul, para baixo do Trópico de Capricórnio.'
    : lo < -30 ? 'Trocou dinheiro por moedas das Américas.' : 'Levava um guarda-chuva e uma capa leve, de meia-estação.';
  const pic = e.pic && (e.pic.scene || e.pic.face) ? e : null;
  return { e, ev, wx, pic };
}

function startLadrao(seed) {
  isDaily = false; isSurv = false; isMil = false; isRev = false;
  runSelos = [];
  lrNew(seed);
  sc = 'ladrao';
  go();
}

/* ── the map: the two hemispheres side by side, drawn once; a camera on the viewBox follows the chase ── */
const _lrE = OM_R + OM_B, _lrD = _lrE + OM_G / 2, LR_C = { W: [-_lrD, 0], E: [_lrD, 0] };
const LR_BOX = [-_lrD - _lrE - 4, -_lrE - 4, 2 * (_lrD + _lrE + 4), 2 * (_lrE + 4)];
const lrXY = ([la, lo]) => { const h = ondeHemi(lo), [x, y] = ondeProj(h, la, lo); return [x + LR_C[h][0], y + LR_C[h][1]]; };
let _lrSvg = null;
function lrMapSvg() {
  if (!_lrSvg) { const d = _ondeDiscs('lr');
    _lrSvg = `<defs>${d.defs}</defs><g transform="translate(${LR_C.W[0]} 0)">${d.body.W}</g><g transform="translate(${LR_C.E[0]} 0)">${d.body.E}</g>`; }
  return `<svg class="lr-svg" id="lr-svg" viewBox="${LR_BOX.join(' ')}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${_lrSvg}</svg>`;
}
/* the view that holds these points, with a margin, shaped like the box it is drawn in */
function lrFit(pts, box) {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]), A = box.W / Math.max(1, box.H);
  let w = Math.max(70, Math.max(...xs) - Math.min(...xs) + 46), h = Math.max(46, Math.max(...ys) - Math.min(...ys) + 40);
  if (w / h < A) w = h * A; else h = w / A;
  if (w > LR_BOX[2]) { w = LR_BOX[2]; h = w / A; }
  if (h > LR_BOX[3] && h / A > LR_BOX[2]) { h = LR_BOX[3]; w = h * A; }
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const clampC = (c, s, a, b) => s >= b ? a + b / 2 : Math.max(a + s / 2, Math.min(a + b - s / 2, c));
  return { x: clampC(cx, w, LR_BOX[0], LR_BOX[2]) - w / 2, y: clampC(cy, h, LR_BOX[1], LR_BOX[3]) - h / 2, w, h };
}
const lrBox = () => { const m = document.getElementById('lr-map'); return m ? { W: m.clientWidth, H: m.clientHeight } : { W: 340, H: 200 }; };
/* where the camera should look in this phase: the city, the three choices, the flight */
function lrWant() {
  const pts = [lrXY(lr.at.at)];
  if (lr.phase === 'clue') lr.opts[lr.stop + 1].forEach(p => pts.push(lrXY(p.at)));
  if (lr.phase === 'fly' || lr.phase === 'cold') pts.push(lrXY(lr.to.at));
  if (lr.phase === 'end') lr.chain.slice(0, lr.stop + 1).forEach(p => pts.push(lrXY(p.at)));
  return lrFit(pts, lrBox());
}
function lrPlaceOverlay() {
  const svg = document.getElementById('lr-svg'), box = lrBox(), c = lr.cam;
  if (!svg || !c) return;
  svg.setAttribute('viewBox', `${c.x.toFixed(2)} ${c.y.toFixed(2)} ${c.w.toFixed(2)} ${c.h.toFixed(2)}`);
  const s = box.W / c.w, px = q => [(q[0] - c.x) * s, (q[1] - c.y) * s];
  document.querySelectorAll('#lr-map [data-ll]').forEach(el => {
    const [x, y] = px(lrXY(el.dataset.ll.split(',').map(Number)));
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  });
  /* the trail flown so far, and the flight under way, drawn in pixels */
  const ov = document.getElementById('lr-ov');
  if (ov) {
    ov.setAttribute('viewBox', `0 0 ${box.W} ${box.H}`);
    const seg = (a, b) => { const [x1, y1] = px(lrXY(a)), [x2, y2] = px(lrXY(b)), mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * .18;
      return `M${x1.toFixed(1)} ${y1.toFixed(1)}Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`; };
    const trail = lr.chain.slice(0, lr.stop + 1).map((p, i, a) => i ? seg(a[i - 1].at, p.at) : '').join('');
    const fly = lr.to && (lr.phase === 'fly' || lr.phase === 'cold') ? seg(lr.at.at, lr.to.at) : '';
    const t = document.getElementById('lr-trail'), f = document.getElementById('lr-fly');
    if (t) t.setAttribute('d', trail);
    if (f) f.setAttribute('d', fly);
  }
}
function lrCamTo(want, ms, done) {
  const from = lr.cam || want, t0 = performance.now(), id = (lr.camId = (lr.camId || 0) + 1);
  if (!ms || FX_STILL) { lr.cam = want; lrPlaceOverlay(); requestAnimationFrame(lrRemask); if (done) done(); return; }
  const step = now => {
    if (!lr || lr.camId !== id) return;
    const k = Math.min(1, (now - t0) / ms), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    lr.cam = { x: from.x + (want.x - from.x) * e, y: from.y + (want.y - from.y) * e, w: from.w * Math.pow(want.w / from.w, e), h: from.h * Math.pow(want.h / from.h, e) };
    lrPlaceOverlay();
    if (k < 1) requestAnimationFrame(step); else { lrRemask(); if (done) done(); }
  };
  requestAnimationFrame(step);
}
/* the coasts' water-lining is a mask, kept at the scale it was first drawn: a fresh copy once the camera has settled */
function lrRemask() { ['lrW-coast', 'lrE-coast'].forEach(id => { const m = document.getElementById(id); if (m) m.replaceWith(m.cloneNode(true)); }); }

/* ── the moves ── */
function lrGo(i) {
  if (!lr || lr.phase !== 'clue') return;
  const to = lr.opts[lr.stop + 1][i];
  if (!to || lr.wrong.includes(to)) return;
  const h = lrHours(ondeKm(lr.at.at, to.at));
  lr.to = to; lr.phase = 'fly'; lr.flyH = h;
  try { snd.swipe(); } catch (e) {}
  go();
  /* the plane crosses the map while the clock spends the hours */
  const plane = document.getElementById('lr-plane'), path = document.getElementById('lr-fly'), clock = document.getElementById('lr-h');
  const h0 = lr.hours, ms = FX_STILL ? 0 : 1500, t0 = performance.now();
  const tick = now => {
    if (!lr || lr.phase !== 'fly') return;
    const k = ms ? Math.min(1, (now - t0) / ms) : 1;
    if (plane && path && path.getTotalLength) {
      const L = path.getTotalLength(), a = path.getPointAtLength(L * k), b = path.getPointAtLength(Math.min(L, L * k + 1));
      plane.style.transform = `translate(${a.x.toFixed(1)}px, ${a.y.toFixed(1)}px) rotate(${(Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI).toFixed(0)}deg)`;
    }
    if (clock) clock.textContent = Math.max(0, Math.round(h0 - h * k));
    if (k < 1) requestAnimationFrame(tick); else lrLand();
  };
  requestAnimationFrame(tick);
}
function lrLand() {
  lr.hours -= lr.flyH;
  const right = lr.to === lr.chain[lr.stop + 1];
  lr.log.push({ from: lr.at, to: lr.to, ok: right, h: lr.flyH });
  if (right) {
    lr.stop++; lr.at = lr.to; lr.to = null; lr.wrong = [];
    if (lr.stop >= lr.chain.length - 1) return lrEnd(true);
    if (lr.hours <= 0) return lrEnd(false);
    lr.phase = 'clue'; lr.hot = true;
    try { snd.correct(lr.stop - 1); } catch (e) {}
  } else {
    lr.wrong.push(lr.to);
    if (lr.hours <= 0) return lrEnd(false);
    lr.phase = 'cold';
    try { snd.wrong(); haptic([28, 45, 28]); } catch (e) {}
  }
  go();
}
/* from a cold trail, back to the city the clues were found in */
function lrBack() {
  if (!lr || lr.phase !== 'cold') return;
  const h = lrHours(ondeKm(lr.to.at, lr.at.at));
  lr.hours -= h;
  lr.log.push({ from: lr.to, to: lr.at, back: true, h });
  lr.to = null;
  if (lr.hours <= 0) return lrEnd(false);
  lr.phase = 'clue'; lr.hot = false;
  try { snd.swipe(); } catch (e) {}
  go();
}
function lrEnd(caught) {
  lr.phase = 'end'; lr.caught = caught; lr.hours = Math.max(0, lr.hours);
  stats.lrCases = (stats.lrCases || 0) + 1;
  if (caught) { stats.lrCaught = (stats.lrCaught || 0) + 1; stats.lrBest = Math.max(stats.lrBest || 0, lr.hours); }
  LS.set('stats', stats);
  window._newMedals = newMedals();
  go();
  setTimeout(() => { try { if (caught) { snd.fanfare(); fx.rain(60, ['#8E1F1C', '#E0B968', '#F3EEDE']); } else snd.final(false); } catch (e) {} }, 300);
}
const LR_RANKS = [[30, 'Inspetor-chefe'], [16, 'Detetive de primeira'], [6, 'Detetive'], [0, 'Agente novato']];

/* ── the screens ── */
function ladraoHtml() {
  if (!lr) lrNew();
  if (lr.phase === 'brief') return lrBriefHtml();
  if (lr.phase === 'end') return lrEndHtml();
  const next = lr.stop + 1, c = lr.clues[next], opts = lr.opts[next], low = lr.hours <= 12;
  const pin = (p, cls, k) => `<span class="lr-pin ${cls}" data-ll="${p.at[0]},${p.at[1]}"${k != null ? ` data-k="${k}"` : ''}>${k != null ? `<b>${k + 1}</b>` : '<i></i>'}</span>`;
  return `
  <div class="pg lr-pg">
    ${topbar('No rastro do ladrão')}
    <div class="lr-head">
      <span class="lr-case">Caso nº ${lr.n} · <b>${_esc(lr.relic)}</b></span>
      <span class="lr-clock${low ? ' is-low' : ''}" title="Horas que restam">${ICON.clock('currentColor', 13)} <b class="num" id="lr-h">${lr.hours}</b> h</span>
    </div>
    <div class="lr-map" id="lr-map">
      ${lrMapSvg()}
      <svg class="lr-ov" id="lr-ov" aria-hidden="true"><path id="lr-trail" class="lr-trail"/><path id="lr-fly" class="lr-flyp"/></svg>
      ${lr.chain.slice(0, lr.stop).map(p => pin(p, 'lr-been')).join('')}
      ${lr.phase === 'clue' ? opts.map((p, k) => lr.wrong.includes(p) ? pin(p, 'lr-cold') : pin(p, 'lr-cho', k)).join('') : ''}
      ${lr.to ? pin(lr.to, lr.phase === 'cold' ? 'lr-cold' : 'lr-dest') : ''}
      ${pin(lr.at, 'lr-here')}
      ${lr.phase === 'fly' ? `<span class="lr-plane" id="lr-plane" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" fill="#2A1D10" stroke="#F7F1E2" stroke-width=".8" transform="rotate(90 12 12)"/></svg></span>` : ''}
    </div>
    ${lr.phase === 'cold' ? `
    <div class="lr-file lr-cold-file" role="status">
      <span class="lr-stamp is-cold">Pista fria</span>
      <p class="lr-at">${_esc(lr.to.name)}</p>
      <p class="lr-note">Ninguém por aqui viu ${_esc(lr.thief)}. O rastro ficou em ${_esc(lr.at.name.split(', ')[0])}.</p>
      <button id="lr-back" class="btn btn-brass" type="button">Voltar para ${_esc(lr.at.name.split(', ')[0])} · ${lrHours(ondeKm(lr.to.at, lr.at.at))} h</button>
    </div>`
    : lr.phase === 'fly' ? `
    <div class="lr-file"><p class="lr-at">Voando para ${_esc(lr.to.name)}…</p><p class="lr-note">${lr.flyH} horas de viagem.</p></div>`
    : `
    <div class="lr-file">
      ${lr.hot ? `<span class="lr-stamp is-hot">${lr.stop ? 'Pista quente!' : 'Início do rastro'}</span>` : ''}
      <p class="lr-at">${ICON.map('currentColor', 12)} Em ${_esc(lr.at.name)}${lr.stop ? ` · parada ${lr.stop} de ${LR_STOPS}` : ''}</p>
      <div class="lr-clues">
        ${c.pic ? `<span class="lr-photo">${anoPic(c.pic)}</span>` : ''}
        <p class="lr-clue">${_esc(c.ev)}</p>
        <p class="lr-clue lr-wx">${_esc(c.wx)}</p>
      </div>
    </div>
    <div class="lr-opts">${opts.map((p, k) => { const f = lrFlag(p.name), off = lr.wrong.includes(p), h = lrHours(ondeKm(lr.at.at, p.at));
      return `<button class="lr-opt${off ? ' is-off' : ''}" data-o="${k}" type="button"${off ? ' disabled' : ''}>
        <b class="lr-k">${k + 1}</b>${f ? `<span class="lr-flag">${flagSVG(f, 14)}</span>` : ''}
        <span class="lr-nm">${_esc(p.name)}</span><small>${off ? 'pista fria' : h + ' h'}</small></button>`; }).join('')}</div>`}
  </div>`;
}
function lrBriefHtml() {
  return `
  <div class="pg pg-center lr-pg lr-brief">
    ${topbar('No rastro do ladrão')}
    <div class="lr-poster">
      <span class="lr-poster-k">Interpol do Tempo · caso nº ${lr.n}</span>
      <span class="lr-mug">${LR_MUG}</span>
      <span class="lr-poster-h">Procura-se</span>
      <b class="lr-poster-n">${_esc(lr.thief)}</b>
      <small>visto pela última vez com ${_esc(lr.looks)}</small>
    </div>
    <p class="lr-brief-p">Roubou <b>${_esc(lr.relic)}</b> em <b>${_esc(lr.at.name)}</b> e fugiu. Siga as pistas por ${LR_STOPS} cidades e prenda o ladrão em menos de <b>${lr.hours} horas</b>.</p>
    <button id="lr-start" class="btn btn-brass btn-lg" type="button">${ICON.map('currentColor', 13)} Começar a caçada</button>
    ${stats.lrCaught ? `<p class="small muted">Ladrões presos: ${stats.lrCaught}</p>` : ''}
  </div>`;
}
/* the wanted man: a silhouette in a hat and coat */
const LR_MUG = `<svg viewBox="0 0 100 110" aria-hidden="true"><rect width="100" height="110" fill="#E9DDC1"/>
  ${[20, 40, 60, 80, 100].map(y => `<path d="M0 ${y}H100" stroke="#B8A27A" stroke-width=".8"/>`).join('')}
  <path d="M50 30c-9 0-15 7-15 17 0 7 3 12 7 15l-1 6c-14 3-24 12-26 42h70c-2-30-12-39-26-42l-1-6c4-3 7-8 7-15 0-10-6-17-15-17z" fill="#2E2116"/>
  <path d="M28 33c4-2 9-3 22-3s18 1 22 3l-3-14c-2-6-8-9-19-9s-17 3-19 9z" fill="#1A120A"/><path d="M22 33c8 3 20 4 28 4s20-1 28-4" stroke="#1A120A" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M38 56c4 3 8 4 12 4s8-1 12-4" stroke="#E9DDC1" stroke-width="2" fill="none" stroke-linecap="round" opacity=".55"/>
  <circle cx="44" cy="47" r="2" fill="#E9DDC1"/><circle cx="56" cy="47" r="2" fill="#E9DDC1"/></svg>`;
function lrEndHtml() {
  const rank = lr.caught ? LR_RANKS.find(r => lr.hours >= r[0])[1] : null, ok = lr.log.filter(l => l.ok).length, bad = lr.log.filter(l => !l.ok && !l.back).length;
  return `
  <div class="pg pg-center lr-pg lr-end">
    <div class="eyebrow">No rastro do ladrão · caso nº ${lr.n}</div>
    <div class="lr-poster${lr.caught ? ' is-caught' : ' is-gone'}">
      <span class="lr-poster-k">${lr.caught ? `Preso em ${_esc(lr.at.name.split(', ')[0])}` : 'Caso arquivado'}</span>
      <span class="lr-mug">${LR_MUG}</span>
      <b class="lr-poster-n">${_esc(lr.thief)}</b>
      <span class="lr-stamp-big">${lr.caught ? 'Preso!' : 'Escapou'}</span>
    </div>
    <div class="display" style="font-size:24px;"><em>${lr.caught ? `${rank}!` : 'O ladrão escapou desta vez'}</em></div>
    <p class="small muted" style="margin:0;">${lr.caught ? `${_esc(lr.relic).replace(/^./, m => m.toUpperCase())} voltou ao museu, com <b>${lr.hours} h</b> de sobra.` : `O relógio parou com ${ok} de ${LR_STOPS} cidades no rastro.`} ${bad ? `${bad} ${bad === 1 ? 'pista fria' : 'pistas frias'}.` : 'Nenhuma pista fria!'}</p>
    <div class="lr-map lr-map-end" id="lr-map">${lrMapSvg()}<svg class="lr-ov" id="lr-ov" aria-hidden="true"><path id="lr-trail" class="lr-trail"/><path id="lr-fly" class="lr-flyp"/></svg>
      ${lr.chain.slice(0, lr.stop + 1).map((p, i) => `<span class="lr-pin ${i === lr.stop ? 'lr-here' : 'lr-been'}" data-ll="${p.at[0]},${p.at[1]}"><b>${i ? i : '★'}</b></span>`).join('')}</div>
    ${medalChips()}
    <div class="foot-row" style="margin-top:6px;">
      <button id="lr-share" class="btn btn-ghost btn-sm" type="button">Compartilhar</button>
      <button id="lr-again" class="btn btn-brass" type="button">Novo caso</button>
      <button id="bhome" class="btn btn-ghost btn-sm" type="button">Início</button>
    </div>
  </div>`;
}
const lrShareText = () => `🕵️ No rastro do ladrão · History Quiz\n${lr.caught ? `Prendi ${lr.thief} em ${lr.at.name.split(', ')[0]} com ${lr.hours} h de sobra!` : `${lr.thief.replace(/^./, m => m.toUpperCase())} escapou…`}\n${lr.log.filter(l => !l.back).map(l => l.ok ? '✈️' : '❄️').join('')}${lr.caught ? '🚔' : '💨'}\n${CHAL_URL}`;

function wireLadrao() {
  if (!lr) return;
  const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  const ready = tapArmed();
  on('lr-start', () => { if (!ready()) return; snd.page(); lr.phase = 'clue'; lr.hot = true; go(); });
  on('lr-back', () => { if (ready()) lrBack(); });
  on('lr-again', () => { snd.select(); startLadrao(); });
  on('lr-share', () => {
    const txt = lrShareText();
    if (navigator.share) navigator.share({ text: txt }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(txt).then(() => {
      const b = document.getElementById('lr-share'); if (b) { b.dataset.l = b.dataset.l || b.textContent; b.textContent = 'Copiado!'; setTimeout(() => { b.textContent = b.dataset.l; }, 1600); } }).catch(() => {});
  });
  document.querySelectorAll('.lr-opt').forEach(b => b.addEventListener('click', () => { if (ready()) lrGo(+b.dataset.o); }));
  document.querySelectorAll('.lr-pin.lr-cho').forEach(b => b.addEventListener('click', () => { if (ready()) lrGo(+b.dataset.k); }));
  if (!document.getElementById('lr-map')) return;
  /* the camera: from where it was to where this phase wants it */
  const want = lrWant();
  lrCamTo(want, lr.cam ? 700 : 0);
  if (lr.hot && lr.phase === 'clue') { lr.hot = false; requestAnimationFrame(() => { try { fx.splash(document.querySelector('.lr-pin.lr-here'), '#8E1F1C', 8); } catch (e) {} }); }
}
/* the keyboard: 1, 2, 3 fly there; Enter goes back from a cold trail */
document.addEventListener('keydown', ev => {
  if (sc !== 'ladrao' || !lr || ev.altKey || ev.ctrlKey || ev.metaKey) return;
  if (lr.phase === 'clue' && /^[123]$/.test(ev.key)) { ev.preventDefault(); lrGo(+ev.key - 1); }
  else if (lr.phase === 'cold' && ev.key === 'Enter') { ev.preventDefault(); lrBack(); }
});
