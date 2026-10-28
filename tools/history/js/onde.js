
/* ═══════════════════════════════════════════════════
   ONDE FOI? — put the pin where it happened
   Ten events, each with its picture, its line and its year. The player
   drops a pin on an old mapa-múndi in two hemispheres (ONDE_MAP, drawn by
   tools/history/ondemapgen.mjs, in the album's engraving: js/atlas.js): a tap marks the spot and
   zooms in, another tap moves the pin, a drag looks around, a pinch or the
   +/− buttons zoom. Then they nail it in. The nearer, the more points, out
   of 100 an event; within 50 km is a bull's-eye. ONDE_AT (where each of
   the Que ano? events happened: [lat, lon, place], from
   tools/history/onde_events.json) is above this line.
═══════════════════════════════════════════════════ */
const ONDE_N = 10;
const ONDE_ZMAX = 14;
let onde = null;           // the game being played: { qs, i, pin, log, pts, phase, v }

/* The map is the world in two hemispheres split on the meridian of 20°W, as the album's mapa-múndi
   prints it, each a disc of radius 100 in the azimuthal equidistant projection, which turns back
   exactly: a tap on a disc is a latitude and a longitude, and a pin is kept as one. The two discs
   stand one over the other on a tall map and side by side on a wide one, whichever draws them larger;
   the map's own units have the meeting of the two at 0, 0. */
const OM = ONDE_MAP, OM_R = OM.r, OM_S = OM_R / (Math.PI / 2);
const OM_B = 7, OM_G = 14, OM_M = 5;          // the frame's band round each disc, the gap between them, the margin
const _rad = Math.PI / 180, _wrap = d => ((d + 540) % 360) - 180;
const ondeHemi = lon => Math.abs(_wrap(lon - OM.W.lon0)) <= 90 ? 'W' : 'E';
function ondeProj(h, lat, lon) {
  const dl = _wrap(lon - OM[h].lon0) * _rad, ph = lat * _rad;
  const c = Math.acos(Math.max(-1, Math.min(1, Math.cos(ph) * Math.cos(dl)))), k = c < 1e-9 ? 1 : c / Math.sin(c);
  return [OM_S * k * Math.cos(ph) * Math.sin(dl), -OM_S * k * Math.sin(ph)];
}
function ondeUnproj(h, x, y) {
  const u = x / OM_S, v = -y / OM_S, r = Math.hypot(u, v);
  if (r < 1e-9) return [0, OM[h].lon0];
  return [Math.asin(Math.max(-1, Math.min(1, v * Math.sin(r) / r))) / _rad, _wrap(OM[h].lon0 + Math.atan2(u * Math.sin(r), r * Math.cos(r)) / _rad)];
}
let _ondeLay = null;
function ondeLayout(box) {
  const e = OM_R + OM_B, d = e + OM_G / 2, a = 2 * (e + OM_M), b = 2 * (d + e + OM_M);
  const row = Math.min(box.W / b, box.H / a) > Math.min(box.W / a, box.H / b) * 1.04;
  const key = row ? 'row' : 'col';
  if (!_ondeLay || _ondeLay.key !== key)
    _ondeLay = row ? { key, C: { W: [-d, 0], E: [d, 0] }, x0: -b / 2, y0: -a / 2, w: b, h: a, cart: [0, e - 18] }
                   : { key, C: { W: [0, -d], E: [0, d] }, x0: -a / 2, y0: -b / 2, w: a, h: b, cart: [0, 0] };
  return _ondeLay;
}
const ondeLay = () => _ondeLay || ondeLayout(ondeBox());
/* a [lat, lon] to the map's units, and back (null off the two discs) */
function ondeXY(lat, lon) { const L = ondeLay(), h = ondeHemi(lon), [x, y] = ondeProj(h, lat, lon); return [x + L.C[h][0], y + L.C[h][1]]; }
function ondeLL([x, y]) {
  const L = ondeLay();
  for (const h of ['W', 'E']) { const dx = x - L.C[h][0], dy = y - L.C[h][1]; if (Math.hypot(dx, dy) <= OM_R + .01) return ondeUnproj(h, dx, dy); }
  return null;
}
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
  return { qs: shuf(qs).slice(0, ONDE_N).map(e => ({ e, at: ONDE_AT[e.id] })), i: 0, pin: null, log: [], pts: 0, phase: 'guess', v: { cx: 0, cy: 0, z: 1 } };
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
      ${ondeMapSvg()}
      <div class="onde-lbls" id="onde-lbls" aria-hidden="true">${ondeLabels()}</div>
      <svg class="onde-ov" id="onde-ov" aria-hidden="true"><line id="onde-line" x1="0" y1="0" x2="0" y2="0"/></svg>
      <span class="onde-mk onde-mk-g" id="onde-pin" hidden aria-hidden="true">${ondePinSvg()}</span>
      ${rev ? `<span class="onde-mk onde-mk-t" id="onde-truth" aria-hidden="true"><i></i><b>${_esc(q.at[2])}</b></span>
        <span class="onde-dist" id="onde-dist" aria-hidden="true">${last.p === 100 ? 'na mosca!' : ondeKmTxt(last.d)}</span>` : ''}
      <span class="onde-coord" id="onde-coord" aria-hidden="true"></span>
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
/* the two hemispheres, once, in the map's units (the camera moves the viewBox): the sea washed and ruled with
   little waves, the coasts water-lined, the graticule with the equator and the tropics, the lands with their hills,
   the borders dotted, a rose with its rhumb lines, ships and monsters, each disc in the album's ruled band, and the
   cartouche over the meeting of the two. Lines are drawn a pixel wide however near the camera is. */
/* both discs drawn with ids under a prefix, so the game's map and the results' little map can each have their own */
function _ondeDiscs(p) {
  const R = OM_R, B = OM_B, k = .55;
  let defs = `<radialGradient id="${p}-sea" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#BFD3C3"/><stop offset=".72" stop-color="#A9C2B2"/><stop offset="1" stop-color="#8FAD9E"/></radialGradient>
    <pattern id="${p}-wave" width="30" height="17" patternUnits="userSpaceOnUse">
      <path d="M2 5q2.2-2 4.4 0t4.4 0M17 13.5q2.2-2 4.4 0t4.4 0" fill="none" stroke="#3E5A4C" stroke-width=".6" stroke-linecap="round" opacity=".45"/></pattern>
    <symbol id="${p}-hill" viewBox="-6 -5 12 6" overflow="visible">
      <path d="M-5.6 0C-3.6-.6-1.6-4.6 0-4.6S3.6-.6 5.6 0" fill="#F3E8CB" stroke="${ATL_INK}" stroke-width=".55" stroke-linecap="round"/>
      <path d="M.6-3.6L1.3-.3M1.7-2.9L2.6-.3M2.8-2L3.7-.3M3.9-1.2L4.6-.2" stroke="${ATL_INK}" stroke-width=".38" stroke-linecap="round"/></symbol>`;
  const body = {};
  for (const h of ['W', 'E']) {
    const o = OM[h], u = p + h, X = { u, ve: true, rings: 'chart' }, box = [-R, -R, 2 * R, 2 * R];
    defs += _atlShapes(X, o.land, {}, []) + _atlCoast(X, box) + `<clipPath id="${u}-disc"><circle r="${R}"/></clipPath>`;
    const rose = o.deco.find(d => d[0] === 'rosa');
    const lines = o.lines, circles = lines.tropN + lines.tropS + lines.polN + lines.polS;
    body[h] = `
      <g clip-path="url(#${u}-disc)">
        <circle r="${R}" fill="url(#${p}-sea)"/>
        <rect x="${-R}" y="${-R}" width="${2 * R}" height="${2 * R}" fill="url(#${p}-wave)"/>
        <rect x="${-R}" y="${-R}" width="${2 * R}" height="${2 * R}" fill="${ATL_INK}" fill-opacity=".72" mask="url(#${u}-coast)"/>
        ${rose ? _atlRhumbs(X, rose[1], rose[2], R * 2.2) : ''}
        <path d="${o.grat}" fill="none" stroke="${ATL_INK2}" stroke-width=".5" stroke-opacity=".4" vector-effect="non-scaling-stroke"/>
        <path d="${circles}" fill="none" stroke="#8A3B22" stroke-width=".8" stroke-opacity=".5" stroke-dasharray="5 3" vector-effect="non-scaling-stroke"/>
        <path d="${lines.eq}" fill="none" stroke="${ATL_INK}" stroke-width="3" stroke-opacity=".5" vector-effect="non-scaling-stroke"/>
        <path d="${lines.eq}" fill="none" stroke="#F1E5C4" stroke-width="1.6" stroke-dasharray="6 6" vector-effect="non-scaling-stroke"/>
        <use href="#${u}-land" fill="#FBF3DC" fill-opacity=".86"/>
        <g class="og-hills">${o.hills.map(([x, y, s]) => `<use href="#${p}-hill" x="${_f(x - 2.3 * s)}" y="${_f(y - 1.9 * s)}" width="${_f(4.6 * s)}" height="${_f(2.3 * s)}"/>`).join('')}</g>
        <path d="${o.borders}" fill="none" stroke="${ATL_INK}" stroke-width="1.1" stroke-opacity=".62" stroke-linecap="round" stroke-dasharray=".1 2.6" vector-effect="non-scaling-stroke"/>
        <use href="#${u}-land" fill="none" stroke="${ATL_INK}" stroke-width="1" stroke-linejoin="round" stroke-opacity=".9" vector-effect="non-scaling-stroke"/>
        <g class="og-deco">${o.deco.map(([n, x, y, f]) => _atlPiece(n, x, y, f * 2 * R * (n === 'rosa' ? .8 : .85), n === 'caravela' && h === 'W')).join('')}</g>
      </g>
      <circle r="${_f(R + B / 2)}" fill="none" stroke="#F1E5C4" stroke-width="${B}"/>
      <g class="og-band">
        <circle r="${_f(R + B * .72)}" fill="none" stroke="${ATL_INK}" stroke-width="${_f(B * .3)}" stroke-dasharray="${_f(Math.PI * 2 * (R + B * .72) / 72)}"/>
        <circle r="${_f(R + B * .5)}" fill="none" stroke="${ATL_INK}" stroke-width="${_f(k * .7)}"/>
        <circle r="${_f(R + B * .25)}" fill="none" stroke="${ATL_INK}" stroke-width="${_f(B * .28)}" stroke-opacity=".7" stroke-dasharray="${_f(k * .5)} ${_f(Math.PI * 2 * (R + B * .25) / 180 - k * .5)}"/>
      </g>
      <circle r="${R}" fill="none" stroke="${ATL_INK}" stroke-width="1.6" vector-effect="non-scaling-stroke"/>
      <circle r="${R + B}" fill="none" stroke="${ATL_INK}" stroke-width="1.8" vector-effect="non-scaling-stroke"/>`;
  }
  return { defs, body };
}
/* the two hemispheres, once, in the map's units (the camera moves the viewBox): the sea washed and ruled with
   little waves, the coasts water-lined, the graticule with the equator and the tropics, the lands with their hills,
   the borders dotted, a rose with its rhumb lines, ships and monsters, each disc in the album's ruled band, and the
   cartouche over the meeting of the two. Lines are drawn a pixel wide however near the camera is. */
let _ondeSvg = null;
function ondeMapSvg() {
  if (_ondeSvg) return _ondeSvg;
  const d = _ondeDiscs('og');
  return (_ondeSvg = `<svg class="onde-svg" id="onde-svg" preserveAspectRatio="none" aria-hidden="true">
    <defs>${d.defs}</defs><g id="og-gW" class="og-h">${d.body.W}</g><g id="og-gE" class="og-h">${d.body.E}</g>
    <g id="og-cart" class="og-cart">${_atlCartouche(0, 0, 112, 'Mapa-Múndi', 'onde foi?')}</g></svg>`);
}
/* the game on one little map, the two worlds side by side: where each event was, numbered and coloured by how
   near the pin came, the pin, and the line between; they come up one after the other */
function ondeResultsMap() {
  const e = OM_R + OM_B, dd = e + OM_G / 2, a = 2 * (e + 2), b = 2 * (dd + e + 2), C = { W: [-dd, 0], E: [dd, 0] };
  const at = ([la, lo]) => { const h = ondeHemi(lo), [x, y] = ondeProj(h, la, lo); return [x + C[h][0], y + C[h][1]]; };
  const d = _ondeDiscs('oe');
  const marks = onde.log.map((l, i) => {
    const [tx, ty] = at(l.at), [gx, gy] = at(l.pin), cls = l.p >= 80 ? 'good' : l.p >= 50 ? 'brass' : 'bad';
    return `<g class="oe-m oe-${cls}" style="--i:${i}">
      ${l.p < 100 ? `<path d="M${_f(gx)} ${_f(gy)}L${_f(tx)} ${_f(ty)}" class="oe-ln" pathLength="1"/><circle cx="${_f(gx)}" cy="${_f(gy)}" r="2.4" class="oe-g"/>` : ''}
      <circle cx="${_f(tx)}" cy="${_f(ty)}" r="5.6" class="oe-t"/><text x="${_f(tx)}" y="${_f(ty)}" class="oe-n">${i + 1}</text></g>`;
  }).join('');
  return `<div class="onde-res-map" aria-hidden="true"><svg viewBox="${_f(-b / 2)} ${_f(-a / 2)} ${_f(b)} ${_f(a)}">
    <defs>${d.defs}</defs><g transform="translate(${C.W[0]} 0)">${d.body.W}</g><g transform="translate(${C.E[0]} 0)">${d.body.E}</g>${marks}</svg></div>`;
}
/* the lettering stands over the map at a size the camera does not change: the parts of the world on the whole
   world, the great seas always, the small seas from a closer look, and a country's name once its land is drawn
   big enough to hold it */
function ondeLabels() {
  let out = '';
  for (const h of ['W', 'E']) {
    OM[h].labels.forEach(([t, x, y, kind, rot, tier]) => {
      out += `<span class="ol ol-${kind}" data-h="${h}" data-x="${x}" data-y="${y}" data-r="${rot}" data-t="${kind === 'sea' ? tier : 0}">${_esc(t)}</span>`; });
    OM[h].names.forEach(([t, x, y, a]) => {
      out += `<span class="ol ol-nm" data-h="${h}" data-x="${x}" data-y="${y}" data-a="${a}" data-w="${(t.length * 5.6 + 6).toFixed(0)}">${_esc(t)}</span>`; });
  }
  return out;
}
const ondeCoordTxt = ([la, lo]) => `${Math.abs(la).toFixed(0)}° ${la >= 0 ? 'N' : 'S'} · ${Math.abs(lo).toFixed(0)}° ${lo >= 0 ? 'L' : 'O'}`;
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
    ${ondeResultsMap()}
    <div class="ano-list onde-list">
      ${onde.log.map((l, i) => `<div class="ano-li"><span class="ano-li-p ${l.p >= 80 ? 'good' : l.p >= 50 ? 'brass' : 'bad'}"><i class="onde-li-n">${i + 1}</i>${l.p}</span>
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

/* ── the map's camera: a centre (in map units), and a zoom — at 1 the two discs fill the map ── */
function ondeBox() {
  const m = document.getElementById('onde-map');
  return m ? { W: m.clientWidth, H: m.clientHeight } : { W: 340, H: 300 };
}
function ondeCam(v, box) {
  box = box || ondeBox();
  const L = ondeLayout(box), s = Math.min(box.W / L.w, box.H / L.h) * v.z;
  const vw = box.W / s, vh = box.H / s;
  return { sx: s, sy: s, vw, vh, vx: v.cx - vw / 2, vy: v.cy - vh / 2, L };
}
/* the camera never looks past the edges of the map */
function ondeClamp(v, box) {
  v.z = Math.max(1, Math.min(ONDE_ZMAX, v.z));
  const c = ondeCam(v, box), L = c.L;
  v.cx = c.vw >= L.w ? L.x0 + L.w / 2 : Math.max(L.x0 + c.vw / 2, Math.min(L.x0 + L.w - c.vw / 2, v.cx));
  v.cy = c.vh >= L.h ? L.y0 + L.h / 2 : Math.max(L.y0 + c.vh / 2, Math.min(L.y0 + L.h - c.vh / 2, v.cy));
  return v;
}
const ondeToPx = (c, [x, y]) => [(x - c.vx) * c.sx, (y - c.vy) * c.sy];

/* The water-lining is a mask, and the browser keeps a mask drawn at the scale it first had: once the
   camera settles, a fresh copy of it is drawn at the new scale, so the rings stay fine lines */
let _ondeMaskT = 0;
function _ondeRemask() {
  clearTimeout(_ondeMaskT);
  _ondeMaskT = setTimeout(() => ['ogW-coast', 'ogE-coast'].forEach(id => { const m = document.getElementById(id); if (m) m.replaceWith(m.cloneNode(true)); }), 160);
}
/* the lettering, placed for this camera; a name shows when its country is drawn at least this many times its label's size */
function ondeLetter(c, box) {
  const L = c.L, z = onde.v.z, s = c.sx, lb = document.getElementById('onde-lbls');
  if (!lb) return;
  for (const el of lb.children) {
    const d = el.dataset, C = L.C[d.h], x = (+d.x + C[0] - c.vx) * s, y = (+d.y + C[1] - c.vy) * s;
    let on = x > -60 && y > -20 && x < box.W + 60 && y < box.H + 20;
    if (on) {
      if (d.a) on = z >= 1.7 && +d.a * s * s >= +d.w * 15 * 2.4;
      else if (el.classList.contains('ol-sea')) on = +d.t < 2 || z >= 2.2;
      else on = z < 1.7;
    }
    el.style.display = on ? '' : 'none';
    if (on) el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%)${+d.r ? ` rotate(${d.r}deg)` : ''}`;
  }
}
function ondeApply() {
  const svg = document.getElementById('onde-svg');
  if (!svg || !onde) return;
  _ondeRemask();
  const box = ondeBox();
  if (box.W < 1 || box.H < 1) return;
  const v = ondeClamp(onde.v, box), c = ondeCam(v, box), L = c.L;
  /* the discs stand where this map's shape puts them */
  if (svg.dataset.lay !== L.key) {
    svg.dataset.lay = L.key;
    ['W', 'E'].forEach(h => { const g = document.getElementById('og-g' + h); if (g) g.setAttribute('transform', `translate(${L.C[h][0]} ${L.C[h][1]})`); });
    const ct = document.getElementById('og-cart');
    if (ct) ct.setAttribute('transform', `translate(${L.cart[0]} ${L.cart[1]})`);
  }
  svg.setAttribute('viewBox', `${c.vx.toFixed(3)} ${c.vy.toFixed(3)} ${c.vw.toFixed(3)} ${c.vh.toFixed(3)}`);
  /* the little waves are drawn a pixel size, however far in the camera is */
  const wv = document.getElementById('og-wave');
  if (wv) wv.setAttribute('patternTransform', `scale(${(1 / c.sx).toFixed(4)})`);
  /* close in, the hills and the pieces at sea give way to the coasts and the names */
  const m = document.getElementById('onde-map');
  m.classList.toggle('is-zoomed', v.z >= 1.35); m.classList.toggle('is-near', v.z >= 3.2); m.classList.toggle('is-close', v.z >= 6);
  ondeLetter(c, box);
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
  const pin = onde.pin ? ondeXY(onde.pin[0], onde.pin[1]) : null;
  place(document.getElementById('onde-pin'), pin);
  /* the pin's latitude and longitude in the corner, as a chart marks a position */
  const co = document.getElementById('onde-coord');
  if (co) { co.hidden = !onde.pin; if (onde.pin) co.textContent = ondeCoordTxt(onde.pin); }
  const rev = onde.phase === 'reveal', q = onde.qs[onde.i];
  const truth = rev ? ondeXY(q.at[0], q.at[1]) : null;
  const t = document.getElementById('onde-truth');
  place(t, truth);
  /* the place's name stands away from the player's pin (so the pin and the line between stay in sight), or where there is room */
  if (t && truth) {
    const tx = ondeToPx(c, truth)[0], gx = pin ? ondeToPx(c, pin)[0] : null, lb = t.querySelector('b');
    let left = gx != null && Math.abs(gx - tx) > 6 ? gx > tx : tx > box.W * 0.58;
    if (left && tx < 110) left = false; else if (!left && box.W - tx < 110) left = true;
    t.classList.toggle('is-left', left);
    if (lb) lb.style.maxWidth = Math.max(90, (left ? tx : box.W - tx) - 24).toFixed(0) + 'px';
  }
  const ln = document.getElementById('onde-line'), dist = document.getElementById('onde-dist');
  if (ln) {
    if (rev && pin) {
      const [x1, y1] = ondeToPx(c, pin), [x2, y2] = ondeToPx(c, truth), long = Math.hypot(x2 - x1, y2 - y1) > 70;
      ln.setAttribute('x1', x1.toFixed(1)); ln.setAttribute('y1', y1.toFixed(1)); ln.setAttribute('x2', x2.toFixed(1)); ln.setAttribute('y2', y2.toFixed(1));
      ln.style.display = '';
      /* the distance rides the middle of the line, when the line is long enough to carry it */
      if (dist) { dist.hidden = !long; dist.style.transform = `translate(${((x1 + x2) / 2).toFixed(1)}px, ${((y1 + y2) / 2).toFixed(1)}px) translate(-50%, -50%)`; }
    } else { ln.style.display = 'none'; if (dist) dist.hidden = true; }
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
  const q = onde.qs[onde.i], a = ondeXY(onde.pin[0], onde.pin[1]), b = ondeXY(q.at[0], q.at[1]), box = ondeBox(), L = ondeLayout(box);
  const s0 = Math.min(box.W / L.w, box.H / L.h), bw = Math.abs(a[0] - b[0]) + 26, bh = Math.abs(a[1] - b[1]) + 22;
  const z = Math.min(box.W / (bw * s0), box.H / (bh * s0), 6) * .9;
  ondeFly(ondeClamp({ z: Math.max(1, z), cx: (a[0] + b[0]) / 2, cy: (a[1] + b[1]) / 2 }, box), 650);
}

/* the pin is a [lat, lon] */
function ondeSetPin(ll) {
  if (!ll) return;
  onde.pin = [Math.max(-89.9, Math.min(89.9, ll[0])), _wrap(ll[1])];
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
  const d = ondeKm(onde.pin, [q.at[0], q.at[1]]), p = ondePts(d);
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
    onde.v = { cx: 0, cy: 0, z: 1 };
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
  /* the results' little map takes the room the page leaves it, and stands down when that is too little to read */
  const rm = document.querySelector('.onde-res-map');
  if (rm && rm.clientHeight < 96) rm.classList.add('is-tiny');
  const m = document.getElementById('onde-map');
  if (!m) return;
  ondeApply();
  if (window.ResizeObserver) { const ro = new ResizeObserver(() => { if (document.body.contains(m)) ondeApply(); else ro.disconnect(); }); ro.observe(m); }
  const guessing = () => onde.phase === 'guess';
  document.querySelectorAll('[data-zoom]').forEach(b => b.addEventListener('click', ev => {
    ev.stopPropagation(); snd.tap();
    const k = b.dataset.zoom;
    if (k === 'world') ondeFly({ cx: 0, cy: 0, z: 1 });
    else if (onde.pin && k === 'in') { const c = ondeCam(onde.v), [x, y] = ondeToPx(c, ondeXY(onde.pin[0], onde.pin[1])), box = ondeBox();
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
      const c = ondeCam(onde.v), x = c.vx + p[0] / c.sx, y = c.vy + p[1] / c.sy, ll = ondeLL([x, y]);
      if (!ll) return;                 // between the two worlds, or past their rims
      try { snd.pin(); } catch (e) { snd.tap(); }
      ondeSetPin(ll);
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
      if (onde.pin && guessing()) { const q = ondeXY(onde.pin[0], onde.pin[1]); ondeSetPin(ondeLL([q[0] + mv[0] * step / c.sx, q[1] + mv[1] * step / c.sy])); }
      else { Object.assign(onde.v, ondeClamp({ z: onde.v.z, cx: onde.v.cx + mv[0] * step * 2 / c.sx, cy: onde.v.cy + mv[1] * step * 2 / c.sy }, box)); ondeApply(); }
    } else if (k === '+' || k === '=') { ev.preventDefault(); ondeZoomAt(2, null, null, true); }
    else if (k === '-' || k === '_') { ev.preventDefault(); ondeZoomAt(0.5, null, null, true); }
    /* Space marks the centre of the view; Enter marks it too, or nails in a pin already there */
    else if ((k === 'Enter' || k === ' ') && guessing()) {
      ev.preventDefault();
      if (onde.pin && k === 'Enter') ondeCommit(); else ondeSetPin(ondeLL([onde.v.cx, onde.v.cy]));
    }
  });
}
