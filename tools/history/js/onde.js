
/* ═══════════════════════════════════════════════════
   ONDE FOI? — put the pin where it happened
   Ten events, each with its picture, its line and its year. The player
   drops a pin on the album's old atlas (ALB_MAP): a tap marks the spot and
   zooms in, another tap moves the pin, a drag looks around, a pinch or the
   +/− buttons zoom. Then they nail it in. The nearer, the more points, out
   of 100 an event; within 50 km is a bull's-eye. ONDE_AT (where each of
   the Que ano? events happened: [lat, lon, place], from
   tools/history/onde_events.json) is above this line.
═══════════════════════════════════════════════════ */
const ONDE_N = 10;
const ONDE_ZMAX = 12;
let onde = null;           // the game being played: { qs, i, pin, log, pts, phase, v }

/* the atlas is equirectangular, a unit a degree, 78°N at the top, centred on 10°E */
const ondeXY = (lat, lon) => [(((lon + 170) % 360) + 360) % 360, 78 - lat];
const ondeLL = ([x, y]) => [78 - y, x - 170];
/* the distance on the globe, in km, between two [lat, lon] */
function ondeKm(a, b) {
  const r = Math.PI / 180, dLat = (b[0] - a[0]) * r, dLon = (b[1] - a[1]) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.min(1, Math.sqrt(h)));
}
/* within 50 km is 100; a near miss tops out at 99 and fades over a few thousand km */
const ondePts = d => d <= 50 ? 100 : Math.max(0, Math.min(99, Math.round(99 * Math.exp(-(d - 50) / 900))));
const ondeKmTxt = d => d < 10 ? 'menos de 10 km' : `${Math.round(d).toLocaleString('pt-BR')} km`;
/* the four corners of the world a game is dealt from */
const ondeReg = ([lat, lon]) => lon < -25 ? 'AM' : lat > 35 && lon < 45 ? 'EU' : lon < 63 && lat < 42 ? 'AF' : 'AS';
const ondeBR = e => /Brasil$/.test(ONDE_AT[e.id][2]);

/* ten events: three from Europe, three from the Americas (no more than two
   of them in Brazil), two from Africa and the Middle East, two from Asia —
   never two in the same spot */
function buildOnde() {
  const by = { EU: [], AM: [], AF: [], AS: [] };
  shuf(ANO_EVENTS.filter(e => ONDE_AT[e.id])).forEach(e => by[ondeReg(ONDE_AT[e.id])].push(e));
  const qs = [];
  const take = (list, n, ok) => {
    for (const e of list) {
      if (n <= 0) break;
      const a = ONDE_AT[e.id];
      if (qs.includes(e) || (ok && !ok(e)) || qs.some(o => ondeKm(ONDE_AT[o.id], a) < 150)) continue;
      qs.push(e); n--;
    }
  };
  const br = rnd() < 0.5 ? 2 : 1;
  take(by.EU, 3);
  take(by.AM, br, ondeBR); take(by.AM, 3 - br, e => !ondeBR(e));
  take(by.AF, 2); take(by.AS, 2);
  take(shuf([].concat(by.EU, by.AM, by.AF, by.AS)), ONDE_N - qs.length);
  return { qs: shuf(qs).slice(0, ONDE_N).map(e => ({ e, at: ONDE_AT[e.id] })), i: 0, pin: null, log: [], pts: 0, phase: 'guess', v: { cx: 180, cy: 67, z: 1 } };
}
function startOnde() {
  isDaily = false; isSurv = false; isMil = false; isRev = false;
  runSelos = [];
  /* dealt from a seed, so the game can be sent to a friend as a challenge (js/desafio.js) */
  const seed = chalSeed('o');
  seedFrom(seed); onde = buildOnde(); _seed = null;
  onde.seed = seed;
  sc = 'onde';
  go();
}

/* the picture of an event, small: its scene, or a face, a brasão, a flag */
function ondePic(e) {
  const p = e.pic || {};
  if (p.scene && SCENE[p.scene]) return `<span class="onde-pic onde-scene">${sceneSvg({ id: p.scene }, 120)}</span>`;
  if (p.face) { const f = PL.find(x => x.id === p.face); if (f && f.img) return `<span class="onde-pic onde-face"><img src="${f.img}" alt="" aria-hidden="true"></span>`; }
  if (p.crest && CL.some(c => c.id === p.crest)) return `<span class="onde-pic onde-crest">${clubArt(p.crest, '', false)}</span>`;
  if (p.flag && FLAGS[p.flag]) return `<span class="onde-pic onde-flag"><svg viewBox="0 0 9 6" preserveAspectRatio="none" aria-hidden="true">${FLAGS[p.flag]}</svg></span>`;
  return `<span class="onde-pic onde-scene">${ART.hourglass(120)}</span>`;
}

function ondeHtml() {
  if (!onde) onde = buildOnde();
  if (onde.phase === 'end') return ondeEndHtml();
  const q = onde.qs[onde.i], e = q.e, rev = onde.phase === 'reveal';
  const last = onde.log[onde.log.length - 1];
  const dots = onde.qs.map((x, i) => {
    const l = onde.log[i];
    return `<i class="${l ? (l.p >= 80 ? 'rl-3' : l.p >= 50 ? 'rl-1' : 'rl-0') : i === onde.i ? 'ano-dot-on' : ''}"></i>`;
  }).join('');
  let grat = '';
  for (let x = 0; x <= 360; x += 15) grat += `M${x} 0V134`;
  for (let y = 3; y <= 134; y += 15) grat += `M0 ${y}H360`;
  return `
  <div class="pg onde-pg${rev ? ' is-rev' : ''}">
    ${topbar('Onde foi?')}
    <div class="ano-head"><div class="runlog" aria-hidden="true">${dots}</div>
      <span class="ano-score"><b class="num">${onde.pts}</b> pts</span></div>
    <div class="onde-card">
      ${ondePic(e)}
      <div class="onde-tt"><p class="onde-t">${_esc(e.t)}</p><span class="onde-y">${e.c ? 'c. ' : ''}${anoYear(e.y)}</span></div>
    </div>
    <div class="onde-map" id="onde-map" tabindex="0" role="application"
      aria-label="${rev ? 'Mapa com a resposta' : 'Mapa: toque onde aconteceu. No teclado, as setas movem, mais e menos aproximam, espaço marca o centro e Enter crava.'}">
      <svg class="onde-svg" id="onde-svg" preserveAspectRatio="none" aria-hidden="true">
        ${(() => {
          /* the album's old atlas (js/atlas.js): the paper shows through, the coasts water-lined, the coast a firm line in ink */
          const X = { u: 'og', ve: true, rings: 'chart' }, box = [-400, -300, 1160, 734];
          return `<defs>${_atlShapes(X, ALB_MAP.land, {}, [])}${_atlCoast(X, box)}
            <pattern id="og-wave" width="30" height="17" patternUnits="userSpaceOnUse">
              <path d="M2 5q2.2-2 4.4 0t4.4 0M17 13.5q2.2-2 4.4 0t4.4 0" fill="none" stroke="#5B4A33" stroke-width=".5" stroke-linecap="round" opacity=".5"/></pattern></defs>
            <rect x="-400" y="-300" width="1160" height="734" fill="#7A6236" fill-opacity=".22"/>
            <rect x="0" y="0" width="360" height="134" fill="#8FA89A" fill-opacity=".18"/>
            <rect x="0" y="0" width="360" height="134" fill="url(#og-wave)"/>
            <rect x="0" y="0" width="360" height="134" fill="${ATL_INK}" fill-opacity=".8" mask="url(#og-coast)"/>`;
        })()}
        <path d="${grat}" stroke="#5B4A33" stroke-opacity=".3" stroke-width=".5" fill="none" vector-effect="non-scaling-stroke"/>
        <use href="#og-land" fill="#FBF3DC" fill-opacity=".62"/>
        <path d="${ALB_MAP.borders}" fill="none" stroke="#2E2116" stroke-opacity=".5" stroke-width=".6" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
        <use href="#og-land" fill="none" stroke="#2E2116" stroke-width="1" stroke-linejoin="round" stroke-opacity=".9"/>
        <rect x="0" y="0" width="360" height="134" fill="none" stroke="#6E5836" stroke-width="1.5" vector-effect="non-scaling-stroke"/>
      </svg>
      <span class="onde-deco onde-deco-t" aria-hidden="true"><svg class="onde-cart" viewBox="0 0 240 110">${_atlCartouche(120, 55, 240, 'Mapa-Múndi', 'onde foi?')}</svg></span>
      <span class="onde-deco onde-deco-b" aria-hidden="true">${ATLAS_ART.rosa ? `<svg class="onde-rose" viewBox="${ATLAS_ART.rosa.vb}">${ATLAS_ART.rosa.svg}</svg>` : ''}${
        ATLAS_ART.caravela ? `<svg class="onde-ship" viewBox="${ATLAS_ART.caravela.vb}">${ATLAS_ART.caravela.svg}</svg>` : ''}</span>
      <svg class="onde-ov" id="onde-ov" aria-hidden="true"><line id="onde-line" x1="0" y1="0" x2="0" y2="0"/></svg>
      <span class="onde-mk onde-mk-g" id="onde-pin" hidden aria-hidden="true">${ondePinSvg()}</span>
      ${rev ? `<span class="onde-mk onde-mk-t" id="onde-truth" aria-hidden="true"><i></i><b>${_esc(q.at[2])}</b></span>` : ''}
      <div class="onde-zoom">
        <button class="onde-zb" data-zoom="in" type="button" aria-label="Aproximar">+</button>
        <button class="onde-zb" data-zoom="out" type="button" aria-label="Afastar">−</button>
        <button class="onde-zb" data-zoom="world" type="button" aria-label="O mundo todo">${ICON.globe('currentColor', 13)}</button>
      </div>
      ${rev || onde.pin ? '' : `<span class="onde-tip" id="onde-tip">Toque no mapa onde aconteceu</span>`}
    </div>
    ${rev ? `<div class="onde-after" aria-live="polite">
        <div class="onde-res"><span class="display ${last.p >= 80 ? 'good' : last.p >= 50 ? 'brass' : 'bad'}" style="font-size:17px;">+${last.p}</span>
          <span><b>${anoVerdict(last.p)}</b> · ${last.p === 100 ? 'no lugar certo' : `a ${ondeKmTxt(last.d)}`}</span></div>
        ${last.selo ? seloWonLine(last.selo) : ''}
        ${e.x ? `<div class="story"><span class="story-k">${ICON.book('currentColor', 11)} Você sabia?</span><p>${_esc(e.x)}</p></div>` : ''}
        <button id="onde-next" class="btn btn-brass">${onde.i >= onde.qs.length - 1 ? 'Ver resultado' : 'Próximo'}</button></div>`
      : `<button id="onde-go" class="btn btn-brass btn-lg"${onde.pin ? '' : ' disabled'}>${ICON.check('currentColor', 14)} Cravar aqui</button>`}
  </div>`;
}
const ondePinSvg = () => `<svg viewBox="0 0 24 32"><path d="M12 31C12 31 2 18.6 2 11.5A10 10 0 0 1 22 11.5C22 18.6 12 31 12 31Z" fill="#8E2F2F" stroke="#3A1208" stroke-width="1.4"/><circle cx="12" cy="11.5" r="4" fill="#F7F1E2"/></svg>`;

function ondeEndHtml() {
  const best = LS.get('ondeBest', 0);
  const msg = onde.pts >= 800 ? 'Um atlas ambulante!' : onde.pts >= 600 ? 'Ótimo senso de direção!' : onde.pts >= 400 ? 'Nada mau!' : 'O mundo é grande…';
  return `
  <div class="pg pg-center ano-end" style="padding:22px 18px;gap:9px;">
    <div class="eyebrow">Onde foi? · ${ONDE_N} eventos</div>
    <div class="display" style="font-size:28px;"><em>${msg}</em></div>
    ${wreathed(onde.pts >= ONDE_N * 60, `<div class="display prize-pop brass" style="font-size:50px;letter-spacing:-.03em;">${onde.pts}<span class="muted" style="font-size:18px;"> / ${ONDE_N * 100}</span></div>`)}
    ${chalBanner() || `<p class="small muted">${onde.isBest ? 'Seu novo recorde!' : `Recorde: ${best} pts`}</p>`}
    <div class="ano-list">
      ${onde.log.map(l => `<div class="ano-li"><span class="ano-li-p ${l.p >= 80 ? 'good' : l.p >= 50 ? 'brass' : 'bad'}">${l.p}</span>
        <span class="ano-li-t">${_esc(l.e.t)}</span><span class="ano-li-y"><b>${_esc(l.at[2].split(', ').pop())}</b><small>${l.p === 100 ? 'na mosca' : ondeKmTxt(l.d)}</small></span></div>`).join('')}
    </div>
    ${selosStrip()}
    ${medalChips()}
    <div class="foot-row" style="margin-top:8px;">
      <button id="onde-share" class="btn btn-ghost btn-sm">${chalMine() ? 'Desafiar' : 'Compartilhar'}</button>
      <button id="onde-again" class="btn btn-brass">De novo</button>
      <button id="bhome" class="btn btn-ghost btn-sm">Início</button>
    </div>
  </div>`;
}

function ondeShareText() {
  const grid = onde.log.map(l => l.p === 100 ? '🎯' : l.p >= 80 ? '🟩' : l.p >= 50 ? '🟨' : '⬛').join('');
  return `Onde foi? 🌍 History Quiz\n${grid}\n${onde.pts}/${ONDE_N * 100} pts\n${chalShareTail(chalMine())}`;
}

/* ── the map's camera: a centre (in map units), a zoom, and how tall a degree is drawn ── */
function ondeBox() {
  const m = document.getElementById('onde-map');
  return m ? { W: m.clientWidth, H: m.clientHeight } : { W: 340, H: 300 };
}
/* an equirectangular map squashes the north: zoomed in, a degree is drawn
   as tall as an atlas would print it there; the whole world keeps one stretch */
function ondeSt(v) {
  const lat = Math.max(-60, Math.min(70, 78 - v.cy));
  const here = Math.min(1.6, Math.max(1, 1 / Math.cos(lat * Math.PI / 180)));
  return 1.2 + (here - 1.2) * Math.min(1, Math.max(0, (v.z - 1) / 2));
}
function ondeCam(v, box) {
  box = box || ondeBox();
  const st = ondeSt(v), sx = box.W / 360 * v.z, sy = sx * st;
  const vw = box.W / sx, vh = box.H / sy;
  return { sx, sy, vw, vh, vx: v.cx - vw / 2, vy: v.cy - vh / 2 };
}
/* the camera never looks past the edges of the map */
function ondeClamp(v, box) {
  v.z = Math.max(1, Math.min(ONDE_ZMAX, v.z));
  const c = ondeCam(v, box);
  v.cx = c.vw >= 360 ? 180 : Math.max(c.vw / 2, Math.min(360 - c.vw / 2, v.cx));
  v.cy = c.vh >= 134 ? 67 : Math.max(c.vh / 2, Math.min(134 - c.vh / 2, v.cy));
  return v;
}
const ondeToPx = (c, [x, y]) => [(x - c.vx) * c.sx, (y - c.vy) * c.sy];

/* The water-lining is a mask, and the browser keeps a mask drawn at the scale it first had: once the
   camera settles, a fresh copy of it is drawn at the new scale, so the rings stay fine lines */
let _ondeMaskT = 0;
function _ondeRemask() {
  clearTimeout(_ondeMaskT);
  _ondeMaskT = setTimeout(() => { const m = document.getElementById('og-coast'); if (m) m.replaceWith(m.cloneNode(true)); }, 160);
}
function ondeApply() {
  const svg = document.getElementById('onde-svg');
  if (!svg || !onde) return;
  _ondeRemask();
  const box = ondeBox();
  if (box.W < 1 || box.H < 1) return;
  const v = ondeClamp(onde.v, box), c = ondeCam(v, box);
  svg.setAttribute('viewBox', `${c.vx.toFixed(3)} ${c.vy.toFixed(3)} ${c.vw.toFixed(3)} ${c.vh.toFixed(3)}`);
  /* the little waves are drawn a pixel size, however far in the camera is */
  const wv = document.getElementById('og-wave');
  if (wv) wv.setAttribute('patternTransform', `scale(${(1 / c.sx).toFixed(4)} ${(1 / c.sy).toFixed(4)})`);
  /* the whole world leaves the page above and below it: an atlas's title and its compass rose */
  const m = document.getElementById('onde-map');
  const top = Math.max(0, -c.vy * c.sy), bot = Math.max(0, box.H - (134 - c.vy) * c.sy);
  m.style.setProperty('--ob-t', top.toFixed(0) + 'px'); m.style.setProperty('--ob-b', bot.toFixed(0) + 'px');
  m.classList.toggle('has-top', top >= 100); m.classList.toggle('has-bot', bot >= 56);
  const ov = document.getElementById('onde-ov');
  if (ov) ov.setAttribute('viewBox', `0 0 ${box.W} ${box.H}`);
  const place = (el, p) => {
    if (!el) return;
    if (!p) { el.hidden = true; return; }
    const [x, y] = ondeToPx(c, p);
    el.hidden = false;
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    el.classList.toggle('is-off', x < -4 || y < -4 || x > box.W + 4 || y > box.H + 4);
  };
  place(document.getElementById('onde-pin'), onde.pin);
  const rev = onde.phase === 'reveal', q = onde.qs[onde.i];
  const truth = rev ? ondeXY(q.at[0], q.at[1]) : null;
  const t = document.getElementById('onde-truth');
  place(t, truth);
  /* the place's name stands away from the player's pin (so the pin and the line between stay in sight), or where there is room */
  if (t && truth) {
    const tx = ondeToPx(c, truth)[0], gx = onde.pin ? ondeToPx(c, onde.pin)[0] : null, lb = t.querySelector('b');
    let left = gx != null && Math.abs(gx - tx) > 6 ? gx > tx : tx > box.W * 0.58;
    if (left && tx < 110) left = false; else if (!left && box.W - tx < 110) left = true;
    t.classList.toggle('is-left', left);
    if (lb) lb.style.maxWidth = Math.max(90, (left ? tx : box.W - tx) - 24).toFixed(0) + 'px';
  }
  const ln = document.getElementById('onde-line');
  if (ln) {
    if (rev && onde.pin) {
      const [x1, y1] = ondeToPx(c, onde.pin), [x2, y2] = ondeToPx(c, truth);
      ln.setAttribute('x1', x1.toFixed(1)); ln.setAttribute('y1', y1.toFixed(1)); ln.setAttribute('x2', x2.toFixed(1)); ln.setAttribute('y2', y2.toFixed(1));
      ln.style.display = '';
    } else ln.style.display = 'none';
  }
  const zi = document.querySelector('[data-zoom="in"]'), zo = document.querySelector('[data-zoom="out"]'), zw = document.querySelector('[data-zoom="world"]');
  if (zi) zi.disabled = v.z >= ONDE_ZMAX - 0.01;
  if (zo) zo.disabled = v.z <= 1.01;
  if (zw) zw.disabled = v.z <= 1.01;
}

/* the camera glides to a new view */
let _ondeAnim = 0;
function ondeFly(to, ms) {
  const from = Object.assign({}, onde.v), id = ++_ondeAnim, t0 = performance.now();
  ms = ms == null ? 380 : ms;
  if (ms <= 0 || matchMedia('(prefers-reduced-motion: reduce)').matches) { Object.assign(onde.v, to); ondeApply(); return; }
  const step = now => {
    if (id !== _ondeAnim || !onde) return;
    const k = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - k, 3);
    onde.v.z = from.z * Math.pow(to.z / from.z, e);
    onde.v.cx = from.cx + (to.cx - from.cx) * e;
    onde.v.cy = from.cy + (to.cy - from.cy) * e;
    ondeApply();
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
/* zoom by a factor, keeping the map point under (px, py) where it is */
function ondeZoomAt(f, px, py, fly) {
  const box = ondeBox(), v = onde.v, c = ondeCam(v, box);
  if (px == null) { px = box.W / 2; py = box.H / 2; }
  const mx = c.vx + px / c.sx, my = c.vy + py / c.sy;
  const n = { z: Math.max(1, Math.min(ONDE_ZMAX, v.z * f)), cx: v.cx, cy: v.cy };
  const c2 = ondeCam(n, box);
  n.cx = mx - (px / c2.sx) + c2.vw / 2;
  n.cy = my - (py / c2.sy) + c2.vh / 2;
  ondeClamp(n, box);
  if (fly) ondeFly(n); else { _ondeAnim++; Object.assign(v, n); ondeApply(); }
}
/* after the guess: both the pin and the right place in view */
function ondeFitBoth() {
  const q = onde.qs[onde.i], a = onde.pin, b = ondeXY(q.at[0], q.at[1]), box = ondeBox();
  const bw = Math.abs(a[0] - b[0]) + 8, bh = Math.abs(a[1] - b[1]) + 6;
  let z = 360 / (bw * 1.5);
  const st = ondeSt({ cy: (a[1] + b[1]) / 2, z: Math.min(z, 3) });
  z = Math.min(z, box.H * 360 / (box.W * st * bh * 1.6), 6);
  ondeFly(ondeClamp({ z: Math.max(1, z), cx: (a[0] + b[0]) / 2, cy: (a[1] + b[1]) / 2 }, box), 650);
}

function ondeSetPin(p) {
  onde.pin = [Math.max(0, Math.min(360, p[0])), Math.max(0, Math.min(134, p[1]))];
  const b = document.getElementById('onde-go');
  if (b) b.disabled = false;
  const tip = document.getElementById('onde-tip');
  if (tip) tip.remove();
  const el = document.getElementById('onde-pin');
  if (el) { el.classList.remove('is-drop'); void el.offsetWidth; el.classList.add('is-drop'); }
  ondeApply();
}

function ondeCommit() {
  if (!onde.pin || onde.phase !== 'guess') return;
  const q = onde.qs[onde.i], e = q.e;
  const d = ondeKm(ondeLL(onde.pin), [q.at[0], q.at[1]]), p = ondePts(d);
  const selo = p >= 80 && e.pic && e.pic.scene && awardSelo(e.pic.scene) ? e.pic.scene : null;
  onde.log.push({ e, at: q.at, pin: onde.pin, d, p, selo });
  if (p === 100) { stats.ondeExact = (stats.ondeExact || 0) + 1; LS.set('stats', stats); }
  try { onde.medals = (onde.medals || []).concat(newMedals()); } catch (err) {}
  onde.pts += p;
  onde.phase = 'reveal';
  if (p === 100) snd.fanfare(); else if (p >= 80) snd.correct(0); else if (p >= 50) snd.almost(); else snd.wrong();
  go();
  requestAnimationFrame(() => ondeFitBoth());
  if (p >= 80) try { burst(p === 100 ? 28 : 14); } catch (err) {}
}
function ondeNext() {
  if (!onde || onde.phase !== 'reveal') return;
  if (onde.i >= onde.qs.length - 1) {
    onde.phase = 'end';
    stats.ondeGames = (stats.ondeGames || 0) + 1;
    LS.set('stats', stats);
    onde.isBest = onde.pts > LS.get('ondeBest', 0);
    if (onde.isBest) LS.set('ondeBest', onde.pts);
    window._newMedals = (onde.medals || []).concat(newMedals());
    setTimeout(() => snd.final(onde.pts >= 500), 200);
  } else {
    onde.i++;
    onde.pin = null;
    onde.phase = 'guess';
    onde.v = { cx: 180, cy: 67, z: 1 };
  }
  go();
}

function wireOnde() {
  const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  const ready = tapArmed();   // js/ano.js: a double tap's second half is not an answer
  on('onde-go', () => { if (ready()) ondeCommit(); });
  on('onde-next', () => { if (ready()) { snd.swipe(); ondeNext(); } });
  on('onde-again', () => { snd.select(); startOnde(); });
  on('onde-share', () => {
    const txt = ondeShareText();
    if (navigator.share) navigator.share({ text: txt }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(txt).then(() => {
      const b = document.getElementById('onde-share'); if (b) { b.dataset.l = b.dataset.l || b.textContent; b.textContent = 'Copiado!'; setTimeout(() => { b.textContent = b.dataset.l; }, 1600); } }).catch(() => {});
  });
  const m = document.getElementById('onde-map');
  if (!m) return;
  ondeApply();
  if (window.ResizeObserver) { const ro = new ResizeObserver(() => { if (document.body.contains(m)) ondeApply(); else ro.disconnect(); }); ro.observe(m); }
  const guessing = () => onde.phase === 'guess';
  document.querySelectorAll('[data-zoom]').forEach(b => b.addEventListener('click', ev => {
    ev.stopPropagation(); snd.tap();
    const k = b.dataset.zoom;
    if (k === 'world') ondeFly({ cx: 180, cy: 67, z: 1 });
    else if (onde.pin && k === 'in') { const c = ondeCam(onde.v), [x, y] = ondeToPx(c, onde.pin), box = ondeBox();
      ondeZoomAt(2, Math.max(0, Math.min(box.W, x)), Math.max(0, Math.min(box.H, y)), true); }
    else ondeZoomAt(k === 'in' ? 2 : 0.5, null, null, true);
  }));
  /* touch and mouse: a tap marks, a drag looks around, two fingers zoom */
  const pts = new Map();
  let g = null;
  const rel = ev => { const r = m.getBoundingClientRect(); return [ev.clientX - r.left, ev.clientY - r.top]; };
  m.addEventListener('pointerdown', ev => {
    if (ev.target.closest('.onde-zoom')) return;
    try { m.setPointerCapture(ev.pointerId); } catch (e) {}
    pts.set(ev.pointerId, rel(ev));
    _ondeAnim++;
    if (pts.size === 1) g = { p0: rel(ev), v0: Object.assign({}, onde.v), moved: false, pinch: false };
    else if (pts.size === 2 && g) {
      const [a, b] = [...pts.values()];
      g.pinch = true; g.moved = true;
      g.d0 = Math.hypot(a[0] - b[0], a[1] - b[1]) || 1; g.z0 = onde.v.z;
      const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], c = ondeCam(onde.v);
      g.anchor = [c.vx + mid[0] / c.sx, c.vy + mid[1] / c.sy];
    }
  });
  m.addEventListener('pointermove', ev => {
    if (!g || !pts.has(ev.pointerId)) return;
    pts.set(ev.pointerId, rel(ev));
    const box = ondeBox();
    if (g.pinch && pts.size >= 2) {
      const [a, b] = [...pts.values()];
      const d = Math.hypot(a[0] - b[0], a[1] - b[1]) || 1, mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      const n = { z: Math.max(1, Math.min(ONDE_ZMAX, g.z0 * d / g.d0)), cx: onde.v.cx, cy: onde.v.cy };
      const c = ondeCam(n, box);
      n.cx = g.anchor[0] - mid[0] / c.sx + c.vw / 2; n.cy = g.anchor[1] - mid[1] / c.sy + c.vh / 2;
      Object.assign(onde.v, ondeClamp(n, box)); ondeApply();
      return;
    }
    const p = rel(ev), dx = p[0] - g.p0[0], dy = p[1] - g.p0[1];
    if (!g.moved && Math.hypot(dx, dy) < 7) return;
    g.moved = true;
    const c = ondeCam(g.v0, box);
    Object.assign(onde.v, ondeClamp({ z: g.v0.z, cx: g.v0.cx - dx / c.sx, cy: g.v0.cy - dy / c.sy }, box));
    ondeApply();
  });
  const up = ev => {
    if (!pts.has(ev.pointerId)) return;
    const p = rel(ev);
    pts.delete(ev.pointerId);
    if (!g) return;
    if (pts.size === 0) {
      const tap = !g.moved && ev.type === 'pointerup';
      g = null;
      if (!tap || !guessing()) return;
      const c = ondeCam(onde.v), x = c.vx + p[0] / c.sx, y = c.vy + p[1] / c.sy;
      if (x < 0 || x > 360 || y < 0 || y > 134) return;
      try { snd.pin(); } catch (e) { snd.tap(); }
      ondeSetPin([x, y]);
      /* the first tap on the whole world zooms in there, to place it finer */
      if (onde.v.z < 2.5) ondeFly(ondeClamp({ z: 4, cx: x, cy: y }, ondeBox()));
    } else if (pts.size === 1 && g.pinch) {
      /* one finger left after a pinch: carry on as a drag from here */
      g = { p0: [...pts.values()][0], v0: Object.assign({}, onde.v), moved: true, pinch: false };
    }
  };
  m.addEventListener('pointerup', up);
  m.addEventListener('pointercancel', up);
  m.addEventListener('wheel', ev => {
    ev.preventDefault();
    const p = rel(ev);
    ondeZoomAt(Math.pow(1.2, -Math.sign(ev.deltaY)), p[0], p[1], false);
  }, { passive: false });
  /* the keyboard: arrows move the pin (or the map, before there is one), + and − zoom, Enter marks the centre */
  m.addEventListener('keydown', ev => {
    const k = ev.key, c = ondeCam(onde.v), box = ondeBox();
    const mv = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[k];
    if (mv) {
      ev.preventDefault();
      const step = (ev.shiftKey ? 60 : 16);
      if (onde.pin && guessing()) ondeSetPin([onde.pin[0] + mv[0] * step / c.sx, onde.pin[1] + mv[1] * step / c.sy]);
      else { Object.assign(onde.v, ondeClamp({ z: onde.v.z, cx: onde.v.cx + mv[0] * step * 2 / c.sx, cy: onde.v.cy + mv[1] * step * 2 / c.sy }, box)); ondeApply(); }
    } else if (k === '+' || k === '=') { ev.preventDefault(); ondeZoomAt(2, null, null, true); }
    else if (k === '-' || k === '_') { ev.preventDefault(); ondeZoomAt(0.5, null, null, true); }
    /* Space marks the centre of the view; Enter marks it too, or nails in a pin already there */
    else if ((k === 'Enter' || k === ' ') && guessing()) {
      ev.preventDefault();
      if (onde.pin && k === 'Enter') ondeCommit(); else ondeSetPin([onde.v.cx, onde.v.cy]);
    }
  });
}
