
/* ═══════════════════════════════════════════════════
   O ATLAS — the album drawn as an old mapa-múndi
   The engraver's shop for the album's maps: the world in two hemispheres,
   a chart for each part of the world, and the little chart at the foot of
   a country's page. Drawn the way the atlases of the 1600s were: the coasts
   water-lined (the rings an engraver cut along every shore), the sea
   ruled with little waves, the borders dotted, the graticule and the
   tropics, rhumb lines out of a compass rose, ships and monsters at sea, a
   cartouche for the title — and the lands washed in watercolour by hand.
   Here the hand is the player's: a country is uncoloured engraving until
   its stickers are stuck, and the wash deepens with every one, to a full
   wash with a gilt edge when its page is complete.
   ALB_MAP (the maps' lines) and ATLAS_ART (the engraved pieces) are above.
═══════════════════════════════════════════════════ */
const ATL_INK = '#2E2116', ATL_INK2 = '#5B4A33';
/* the colourist's pots: rose madder, ochre, verdigris, lilac, carmine, orange, olive (album_map.json's `ink` picks one per country).
   No blue: on a map a blue land reads as water */
const ATL_WASH = ['#C47A66', '#D6A84F', '#6F9C82', '#9B82B6', '#C2606F', '#D48745', '#A3A85C'];
let _atlN = 0;
const _f = v => (Math.round(v * 100) / 100).toString();

/* ── what every map shares ──
   A drawing is drawn in its own map units; X = { u: the prefix of its ids, k: how many map units make a pixel,
   ve: true when the map is stretched unevenly (a page's little chart), so its lines are drawn in pixels instead } */
const _sw = (X, px) => `stroke-width="${_f(X.ve ? px : px * X.k)}"${X.ve ? ' vector-effect="non-scaling-stroke"' : ''}`;
const _ve = X => X.ve ? ' vector-effect="non-scaling-stroke"' : '';
/* the patterns and the hill, in map units */
function _atlDefs(X) {
  const { u } = X, K = v => _f(v * X.k);
  return `
  <pattern id="${u}-wave" width="${K(30)}" height="${K(17)}" patternUnits="userSpaceOnUse">
    <path d="M${K(2)} ${K(5)}q${K(2.2)} ${K(-2)} ${K(4.4)} 0t${K(4.4)} 0M${K(17)} ${K(13.5)}q${K(2.2)} ${K(-2)} ${K(4.4)} 0t${K(4.4)} 0"
      fill="none" stroke="${ATL_INK2}" stroke-width="${K(.5)}" stroke-linecap="round" opacity=".5"/></pattern>
  <pattern id="${u}-hatch" width="${K(3.2)}" height="${K(3.2)}" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
    <path d="M0 0V${K(3.2)}" stroke="${ATL_INK2}" stroke-width="${K(.45)}" opacity=".32"/></pattern>
  <symbol id="${u}-hill" viewBox="-6 -5 12 6" overflow="visible">
    <path d="M-5.6 0C-3.6-.6-1.6-4.6 0-4.6S3.6-.6 5.6 0" fill="#F3E8CB" fill-opacity=".85" stroke="${ATL_INK}" stroke-width=".55" stroke-linecap="round"/>
    <path d="M.6-3.6L1.3-.3M1.7-2.9L2.6-.3M2.8-2L3.7-.3M3.9-1.2L4.6-.2" stroke="${ATL_INK}" stroke-width=".38" stroke-linecap="round"/></symbol>`;
}
/* the land's outline and the album's countries, once, for everything else to refer to */
function _atlShapes(X, land, shapes, cs) {
  const { u } = X;
  return `<path id="${u}-land" d="${land}"${_ve(X)}/>` + cs.filter(c => shapes[c])
    .map(c => `<path id="${u}-s-${c}" d="${shapes[c]}"${_ve(X)}/><clipPath id="${u}-k-${c}"><use href="#${u}-s-${c}"/></clipPath>`).join('');
}
/* the rings an engraver cut along every coast, fading out to sea: a mask of
   nested strokes of the land's outline, each cut back by a thinner one */
/* the rings for a map's scale: fewer and closer where the coasts are drawn small */
const ATL_RINGS = { world: [[6.4, .26], [4.4, .48], [2.7, .72], [1.3, 1]], chart: [[7.4, .22], [5.1, .4], [3.1, .64], [1.5, .95]], inset: [[4.6, .3], [2.9, .55], [1.4, .9]] };
function _atlCoast(X, box) {
  const { u } = X, rings = ATL_RINGS[X.rings || 'chart'];
  let m = '';
  for (const [o, a] of rings) {
    const g = Math.round(a * 255);
    m += `<use href="#${u}-land" fill="none" stroke="rgb(${g},${g},${g})" ${_sw(X, 2 * o)} stroke-linejoin="round"/>`
       + `<use href="#${u}-land" fill="none" stroke="#000" ${_sw(X, 2 * (o - .6))} stroke-linejoin="round"/>`;
  }
  const [x, y, w, h] = box.map(_f);
  return `<mask id="${u}-coast" maskUnits="userSpaceOnUse" x="${x}" y="${y}" width="${w}" height="${h}">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#000"/>${m}<use href="#${u}-land" fill="#000"/></mask>`;
}
/* the sea: a cool wash over the paper, ruled with little waves, the coasts water-lined */
function _atlSea(X, box) {
  const { u } = X, [x, y, w, h] = box.map(_f), r = `x="${x}" y="${y}" width="${w}" height="${h}"`;
  return `<rect ${r} fill="#8FA89A" fill-opacity=".26"/><rect ${r} fill="url(#${u}-wave)"/>
    <rect ${r} fill="${ATL_INK}" fill-opacity=".85" mask="url(#${u}-coast)"/>`;
}
/* thirty-two rhumb lines out of a rose, as on a portolan chart: the eight winds in ink, the half-winds green, the quarter-winds red */
function _atlRhumbs(X, cx, cy, len) {
  let a = '', b = '', c = '';
  for (let i = 0; i < 32; i++) {
    const t = i / 32 * Math.PI * 2, seg = `M${_f(cx)} ${_f(cy)}L${_f(cx + Math.cos(t) * len)} ${_f(cy + Math.sin(t) * len)}`;
    if (i % 4 === 0) a += seg; else if (i % 2 === 0) b += seg; else c += seg;
  }
  return `<g fill="none"><path d="${a}" stroke="${ATL_INK}" stroke-opacity=".34" ${_sw(X, .55)}/>
    <path d="${b}" stroke="#4E7F62" stroke-opacity=".38" ${_sw(X, .55)}/><path d="${c}" stroke="#A8442E" stroke-opacity=".3" ${_sw(X, .55)}/></g>`;
}
/* the graticule, the tropics dashed and the equator ruled black and white like a scale */
function _atlGrat(X, o) {
  const L = o.lines || {}, K = v => _f(v * (X.ve ? 1 : X.k)), circles = (L.tropN || '') + (L.tropS || '') + (L.polN || '') + (L.polS || '');
  return `<path d="${o.grat}" fill="none" stroke="${ATL_INK2}" ${_sw(X, .45)} stroke-opacity=".34"/>
    ${circles ? `<path d="${circles}" fill="none" stroke="${ATL_INK2}" ${_sw(X, .7)} stroke-opacity=".5" stroke-dasharray="${K(4)} ${K(2.5)}"/>` : ''}
    ${L.eq ? `<path d="${L.eq}" fill="none" stroke="${ATL_INK}" ${_sw(X, 2.6)} stroke-opacity=".55"/>
      <path d="${L.eq}" fill="none" stroke="#F1E5C4" ${_sw(X, 1.5)} stroke-dasharray="${K(5)} ${K(5)}"/>` : ''}`;
}
/* the lands: paper a shade lighter than the sea, and hills where the mountains are */
function _atlLand(X, hills, hs) {
  const { u, k } = X, h = (hs || 1) * 12;
  return `<use href="#${u}-land" fill="#FBF3DC" fill-opacity=".62"/>` + (hills || []).map(([x, y, s]) =>
    `<use href="#${u}-hill" x="${_f(x - h / 2 * s * k)}" y="${_f(y - h * 5 / 12 * s * k)}" width="${_f(h * s * k)}" height="${_f(h / 2 * s * k)}"/>`).join('');
}
/* a country washed by how much of it is in the album: none is the engraving's own hatching,
   some is a thin wash with its border coloured deeper (the colourist's way), all is a full wash with a gilt edge */
function _atlWash(X, c, f, fresh) {
  const { u } = X, id = `${u}-s-${c}`, col = ATL_WASH[(ALB_MAP.ink || {})[c] || 0];
  if (f <= 0) return `<use href="#${id}" fill="url(#${u}-hatch)" class="atl-c" data-place="${c}"/>`;
  return `<g class="atl-c${fresh ? ' is-fresh' : ''}${f >= 1 ? ' is-done' : ''}" data-place="${c}">
    <use href="#${id}" fill="${col}" fill-opacity="${_f(.12 + .34 * f)}" class="atl-wash"/>
    <use href="#${id}" fill="none" stroke="${col}" ${_sw(X, 5.5)} stroke-opacity="${_f(.42 + .5 * f)}" clip-path="url(#${u}-k-${c})"/>
    ${f >= 1 ? `<use href="#${id}" fill="none" stroke="#A97A22" ${_sw(X, 1.3)} stroke-opacity=".9"/>` : ''}</g>`;
}
/* the borders dotted, the coast a firm line */
function _atlLines(X, borders) {
  const K = v => _f(v * (X.ve ? 1 : X.k));
  return `<path d="${borders}" fill="none" stroke="${ATL_INK}" ${_sw(X, 1)} stroke-opacity=".7" stroke-linecap="round" stroke-dasharray="${K(.05)} ${K(2.1)}"/>
    <use href="#${X.u}-land" fill="none" stroke="${ATL_INK}" ${_sw(X, .95)} stroke-linejoin="round" stroke-opacity=".92"/>`;
}
/* the lettering: the seas in italic, the parts of the world in spaced capitals, with a halo of paper */
function _atlLabels(X, labels) {
  return (labels || []).map(([t, x, y, size, kind, rot]) => {
    const s = size * X.k, big = kind === 'big';
    return `<text x="${_f(x)}" y="${_f(y)}"${rot ? ` transform="rotate(${_f(rot)} ${_f(x)} ${_f(y)})"` : ''} font-size="${_f(s)}"
      class="atl-t atl-t-${kind}" letter-spacing="${_f(s * (big ? .42 : kind === 'land' ? .18 : .06))}" stroke-width="${_f(2.2 * X.k)}">${_esc(t)}</text>`;
  }).join('');
}
/* an engraved piece, centred on x, y, `w` map units wide */
function _atlPiece(n, x, y, w, flip) {
  const a = ATLAS_ART[n];
  if (!a) return '';
  const [vx, vy, vw, vh] = a.vb.split(/\s+/).map(Number), h = w * vh / vw;
  return `<svg x="${_f(x - w / 2)}" y="${_f(y - h / 2)}" width="${_f(w)}" height="${_f(h)}" viewBox="${a.vb}" overflow="visible" class="atl-p atl-p-${n}">${
    flip ? `<g transform="matrix(-1 0 0 1 ${_f(2 * vx + vw)} 0)">${a.svg}</g>` : a.svg}</svg>`;
}
/* the cartouche with its title */
function _atlCartouche(x, y, w, title, sub) {
  const a = ATLAS_ART.cartela;
  if (!a) return '';
  const [, , vw, vh] = a.vb.split(/\s+/).map(Number), s = w / vw, h = vh * s;
  const [bx, by, bw, bh] = a.box || [46, 26, 148, 60];
  const tx = x - w / 2 + (bx + bw / 2) * s, ty = y - h / 2 + (by + bh / 2) * s;
  const fs = Math.min(bh * s * .44, bw * s / (title.length * .46));
  return `${_atlPiece('cartela', x, y, w)}
    <text x="${_f(tx)}" y="${_f(sub ? ty + fs * .1 : ty + fs * .32)}" font-size="${_f(fs)}" class="atl-t atl-title">${_esc(title)}</text>
    ${sub ? `<text x="${_f(tx)}" y="${_f(ty + bh * s * .34)}" font-size="${_f(Math.min(fs * .4, bw * s / (sub.length * .5)))}" class="atl-t atl-sub">${_esc(sub)}</text>` : ''}`;
}
/* the neatline round a sheet: a double rule with a band ruled black and white between */
function _atlNeat(X, x, y, w, h) {
  const k = X.k, b = 6 * k, seg = 9 * k, r = (i, sw) => `<rect x="${_f(x + i)}" y="${_f(y + i)}" width="${_f(w - 2 * i)}" height="${_f(h - 2 * i)}" stroke-width="${_f(sw)}"`;
  return `<g fill="none">${r(b / 2, b)} stroke="#F1E5C4"/>${r(b / 2, b * .38)} stroke="${ATL_INK}" stroke-dasharray="${_f(seg)} ${_f(seg)}"/>
    ${r(.6 * k, 1.2 * k)} stroke="${ATL_INK}"/>${r(b, .8 * k)} stroke="${ATL_INK}"/></g>`;
}
const _atlFill = c => { const a = placeAll(c); return a ? placeGot(c) / a : 0; };

/* ── the world, in two hemispheres, on a sheet W × H px ── */
function atlasWorld(W, H, fresh) {
  const u = 'atw' + (++_atlN), M = ALB_MAP.hemi, cs = albPlaces().order;
  const fr = 9, ins = fr + 6, iw = W - 2 * ins, ih = H - 2 * ins;
  const dRow = Math.min(iw / 2, ih), dCol = Math.min(iw, ih / 2);
  const row = dRow >= dCol, D = Math.max(dRow, dCol) * .985, Rt = D / 2, band = Math.max(5, Rt * .065), R = Rt - band;
  const cx = ins + iw / 2, cy = ins + ih / 2;
  const C = { W: row ? [cx - Rt, cy] : [cx, cy - Rt], E: row ? [cx + Rt, cy] : [cx, cy + Rt] };
  const sc = R / M.r, kk = 1 / sc, bu = band / sc, rr = M.r + bu / 2;
  let defs = '', body = '';
  for (const h of ['W', 'E']) {
    const o = M[h], [hx, hy] = C[h], X = { u: u + h, k: kk, rings: 'world' };
    defs += _atlDefs(X) + _atlShapes(X, o.land, o.shapes, cs) + _atlCoast(X, [-M.r, -M.r, 2 * M.r, 2 * M.r])
         + `<clipPath id="${X.u}-disc"><circle r="${M.r}"/></clipPath>`;
    const rose = o.deco.find(d => d[0] === 'rosa');
    body += `<g transform="translate(${_f(hx)} ${_f(hy)}) scale(${_f(sc)})" class="atl-hemi" data-hemi="${h}">
      <g clip-path="url(#${X.u}-disc)">
        ${_atlSea(X, [-M.r, -M.r, 2 * M.r, 2 * M.r])}
        ${rose ? _atlRhumbs(X, rose[1], rose[2], M.r * 2.2) : ''}
        ${_atlGrat(X, o)}
        ${_atlLand(X, o.hills, .8)}
        ${Object.keys(o.shapes).filter(c => cs.includes(c)).map(c => _atlWash(X, c, _atlFill(c), fresh.has(c))).join('')}
        ${_atlLines(X, o.borders)}
        ${o.deco.map(([n, x, y, f]) => _atlPiece(n, x, y, f * 2 * M.r * (n === 'rosa' ? .9 : 1), n === 'caravela' && h === 'W')).join('')}
        ${_atlLabels(X, o.labels)}
      </g>
      <circle r="${_f(rr)}" fill="none" stroke="#F1E5C4" stroke-width="${_f(bu)}"/>
      <circle r="${_f(rr)}" fill="none" stroke="${ATL_INK}" stroke-width="${_f(bu * .34)}" stroke-dasharray="${_f(Math.PI * 2 * rr / 144)}"/>
      <circle r="${_f(M.r + bu * .2)}" fill="none" stroke="${ATL_INK}" stroke-width="${_f(kk * .45)}"/>
      <circle r="${_f(M.r + bu * .8)}" fill="none" stroke="${ATL_INK}" stroke-width="${_f(kk * .45)}"/>
      <circle r="${M.r}" fill="none" stroke="${ATL_INK}" stroke-width="${_f(kk * .9)}"/>
      <circle r="${_f(M.r + bu)}" fill="none" stroke="${ATL_INK}" stroke-width="${_f(kk * 1.3)}"/>
    </g>`;
  }
  /* the title over the meeting of the two worlds, the armillary sphere where there is room */
  const cw = Math.min(row ? Rt * 1.2 : D * .64, 260), ch = cw * .46;
  const tY = row ? Math.max(ins + ch / 2 + 2, cy - Rt * .84) : cy;
  const title = _atlCartouche(cx, tY, cw, 'Mapa-Múndi', `${album.size} de ${ALL_STICKERS.length} figurinhas`);
  const side = row ? 0 : (iw - D) / 2;
  const sph = row ? _atlPiece('esfera', cx, Math.min(H - ins - Rt * .3, cy + Rt * .72), Rt * .44)
            : side > 54 ? _atlPiece('esfera', ins + side / 2, cy - Rt * 1.3, Math.min(70, side * .82))
            : _atlPiece('esfera', cx - Rt * .9, cy - Rt * 1.78, Rt * .34);
  const rose2 = !row && side > 54 ? _atlPiece('rosa', W - ins - side / 2, cy + Rt * 1.3, Math.min(64, side * .8)) : '';
  return { row, C, R, sc,
    svg: `<svg class="atl-svg" viewBox="0 0 ${_f(W)} ${_f(H)}" width="${_f(W)}" height="${_f(H)}" aria-hidden="true">
      <defs>${defs}</defs>${body}${sph}${rose2}${title}${_atlNeat({ k: 1 }, 0, 0, W, H)}</svg>` };
}

/* ── a part of the world, on a sheet W × H px: the chart widens or heightens to fill it ── */
function atlasChart(key, W, H, fresh) {
  const o = ALB_MAP.charts[key], u = 'atc' + (++_atlN);
  const [cx0, cy0, cw, ch] = o.core, [ex, ey, ew, eh] = o.ext, A = W / H;
  let vw = cw * 1.04, vh = ch * 1.04;
  if (vw / vh < A) vw = vh * A; else vh = vw / A;
  if (vw > ew) { vw = ew; vh = vw / A; }
  if (vh > eh) { vh = eh; vw = vh * A; }
  let vx = cx0 + cw / 2 - vw / 2, vy = cy0 + ch / 2 - vh / 2;
  vx = Math.max(ex, Math.min(ex + ew - vw, vx)); vy = Math.max(ey, Math.min(ey + eh - vh, vy));
  const s = W / vw, X = { u, k: 1 / s }, k = X.k, box = [vx, vy, vw, vh];
  const cs = albPlaces().order;
  const pins = Object.entries(o.pins).filter(([c]) => cs.includes(c)).map(([c, [x, y]]) => ({ c, x: (x - vx) * s, y: (y - vy) * s }));
  const inView = (x, y, m) => x > vx + m && x < vx + vw - m && y > vy + m && y < vy + vh - m;
  const clear = (x, y, r) => pins.every(p => Math.hypot(p.x - (x - vx) * s, p.y - (y - vy) * s) > r + 15);
  const deco = [];
  for (const d of o.deco) {
    const [n, x, y, f] = d, r = f * vw / 2;
    if (deco.some(e => e[0] === n) || !inView(x, y, r * .75) || !clear(x, y, r * s * .75)) continue;
    if (deco.some(e => Math.hypot(e[1] - x, e[2] - y) < (e[3] * vw / 2 + r) * .9)) continue;
    deco.push(d);
  }
  const rose = deco.find(d => d[0] === 'rosa');
  /* a sea's or a land's name gives way to the pins it would sit under */
  const labels = o.labels.filter(([t, x, y, size, kind]) => {
    const px = (x - vx) * s, py = (y - vy) * s, hw = t.length * size * (kind === 'big' ? .62 : .3) + 6, hh = size * .7 + 8;
    if (px - hw < 10 || px + hw > W - 10 || py - hh < 10 || py + hh > H - 10) return false;   // never cut by the frame
    return pins.every(p => Math.abs(p.x - px) > hw + 10 || Math.abs(p.y - py) > hh + 10);
  });
  const defs = _atlDefs(X) + _atlShapes(X, o.land, o.shapes, cs) + _atlCoast(X, box)
    + `<clipPath id="${u}-frame"><rect x="${_f(vx)}" y="${_f(vy)}" width="${_f(vw)}" height="${_f(vh)}"/></clipPath>`;
  /* a scale of Portuguese leagues, 17½ to a degree, in the bottom left corner */
  const lg = o.deg / 17.5, bar = 100 * lg, bx = vx + 16 * k, by = vy + vh - 20 * k;
  const scale = bar < vw * .42 && bar > 30 * k ? `<g class="atl-scale"><rect x="${_f(bx - 5 * k)}" y="${_f(by - 14 * k)}" width="${_f(bar + 10 * k)}" height="${_f(21 * k)}" fill="#F4EBD2" fill-opacity=".75" stroke="${ATL_INK}" stroke-width="${_f(.6 * k)}"/>
    ${[0, 1, 2, 3, 4].map(i => `<rect x="${_f(bx + i * bar / 5)}" y="${_f(by)}" width="${_f(bar / 5)}" height="${_f(3 * k)}" fill="${i % 2 ? '#F1E5C4' : ATL_INK}" stroke="${ATL_INK}" stroke-width="${_f(.5 * k)}"/>`).join('')}
    <text x="${_f(bx + bar / 2)}" y="${_f(by - 4 * k)}" font-size="${_f(8 * k)}" class="atl-t atl-t-sea">100 léguas</text></g>` : '';
  const svg = `<svg class="atl-svg" viewBox="${_f(vx)} ${_f(vy)} ${_f(vw)} ${_f(vh)}" width="${_f(W)}" height="${_f(H)}" aria-hidden="true">
    <defs>${defs}</defs>
    <g clip-path="url(#${u}-frame)">
      ${_atlSea(X, box)}
      ${rose ? _atlRhumbs(X, rose[1], rose[2], Math.hypot(vw, vh)) : ''}
      ${_atlGrat(X, o)}
      ${_atlLand(X, o.hills, 1)}
      ${Object.keys(o.shapes).filter(c => cs.includes(c)).map(c => _atlWash(X, c, _atlFill(c), fresh.has(c))).join('')}
      ${_atlLines(X, o.borders)}
      ${deco.map(([n, x, y, f]) => _atlPiece(n, x, y, f * vw * (n === 'rosa' ? .9 : 1), false)).join('')}
      ${_atlLabels(X, labels)}
      ${scale}
    </g>
    ${_atlNeat(X, vx, vy, vw, vh)}</svg>`;
  return { svg, pins, s, box };
}

/* ── the little chart at the foot of a country's page: where it is, its neighbours round it ── */
function atlasInset(c, W, H) {
  const M = ALB_MAP, X = { u: 'ati' + (++_atlN), ve: true, rings: 'inset' };
  const [x0, y0, x1, y1] = M.bbox[c] || [0, 0, 360, 134];
  const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, lat = 78 - my;
  /* an equirectangular map squashes the north: drawn here as tall as an atlas would print it */
  const st = Math.min(1.7, 1 / Math.cos(Math.max(-70, Math.min(70, lat)) * Math.PI / 180));
  let vw = Math.max(26, (x1 - x0) * 2.3), vh = Math.max(13, (y1 - y0) * 2.3);
  const A = W / H * st;                     // the room's shape in map units
  if (vw / vh < A) vw = vh * A; else vh = vw / A;
  if (vw > 360) { vw = 360; vh = vw / A; }
  const vx = Math.max(0, Math.min(360 - vw, mx - vw / 2)), vy = Math.max(-25, Math.min(159 - vh, my - vh / 2));
  X.k = vw / W;
  const box = [vx, vy, vw, vh];
  /* the graticule, every five degrees */
  let g = '';
  for (let lo = Math.ceil((vx - 170) / 5) * 5; lo + 170 <= vx + vw; lo += 5) g += `M${lo + 170} ${_f(vy)}V${_f(vy + vh)}`;
  for (let la = Math.ceil((78 - vy - vh) / 5) * 5; 78 - la >= vy; la += 5) g += `M${_f(vx)} ${78 - la}H${_f(vx + vw)}`;
  const o = { grat: g, lines: {} };
  if (vy < 78 && vy + vh > 78) o.lines.eq = `M${_f(vx)} 78H${_f(vx + vw)}`;
  const near = Object.keys(M.shapes).filter(n => { const b = M.bbox[n]; return b && b[2] > vx && b[0] < vx + vw && b[3] > vy && b[1] < vy + vh; });
  const col = ATL_WASH[(M.ink || {})[c] || 0], f = _atlFill(c), u = X.u;
  const p = M.pins[c];
  const svg = `<svg class="atl-svg" viewBox="${_f(vx)} ${_f(vy)} ${_f(vw)} ${_f(vh)}" width="${_f(W)}" height="${_f(H)}" preserveAspectRatio="none" aria-hidden="true">
    <defs>${_atlDefs(X)}${_atlShapes(X, M.land, M.shapes, near.includes(c) ? near : near.concat(M.shapes[c] ? [c] : []))}${_atlCoast(X, box)}</defs>
    ${_atlSea(X, box)}
    ${_atlGrat(X, o)}
    ${_atlLand(X, (M.hills || []).filter(([x, y]) => x > vx && x < vx + vw && y > vy && y < vy + vh), .8)}
    ${near.filter(n => n !== c).map(n => `<use href="#${u}-s-${n}" fill="${ATL_WASH[(M.ink || {})[n] || 0]}" fill-opacity=".16"/>`).join('')}
    ${M.shapes[c] ? `<use href="#${u}-s-${c}" fill="${col}" fill-opacity="${_f(.32 + .45 * f)}"/>
      <use href="#${u}-s-${c}" fill="none" stroke="${col}" ${_sw(X, 5)} stroke-opacity=".85" clip-path="url(#${u}-k-${c})"/>
      <use href="#${u}-s-${c}" fill="none" stroke="#A97A22" ${_sw(X, 1.4)}/>` : ''}
    ${_atlLines(X, M.borders)}
    </svg>`;
  const pc = q => [(q[0] - vx) / vw * 100, (q[1] - vy) / vh * 100];
  const inside = ([x, y]) => x > 8 && x < 92 && y > 8 && y < 90;
  const pin = p ? pc(p) : null;
  /* the neighbours named where their own pins would be, and the seas round about */
  const names = near.filter(n => n !== c && M.pins[n] && placeAll(n)).map(n => [placeName(n), ...pc(M.pins[n])])
    .filter(q => inside(q.slice(1)) && (!pin || Math.hypot((q[1] - pin[0]) * W / 100, (q[2] - pin[1]) * H / 100) > 44));
  const seas = (M.labels || []).map(([t, x, y]) => [t, ...pc([x, y])]).filter(q => inside(q.slice(1)));
  /* the page's name plate stands clear of the country: below or above it on a tall chart, beside it on a wide one */
  const tall = H > W * .8, py = pin ? pin[1] : 50, pxx = pin ? pin[0] : 50;
  const plate = tall ? (py > 55 ? 'top' : 'bottom') : (pxx >= 50 ? 'left' : 'right');
  const pr = plate === 'bottom' ? [W / 2, H - 26, 62, 26] : plate === 'top' ? [W / 2, 26, 62, 26]
           : plate === 'left' ? [80, H - 26, 74, 26] : [W - 80, H - 26, 74, 26];
  /* no word on another, nor on the country's own pin, nor under the plate */
  const taken = [pr].concat(pin ? [[pin[0] * W / 100, pin[1] * H / 100, 16, 16]] : []);
  const keep = (list, size, max) => list.filter(([t, x, y]) => {
    const bx = x * W / 100, by = y * H / 100, hw = t.length * size * .36 + 4, hh = size * .75;
    if (bx - hw < 4 || bx + hw > W - 44 && by < 46 || bx + hw > W - 4) return false;
    if (taken.some(([ax, ay, aw, ah]) => Math.abs(ax - bx) < aw + hw && Math.abs(ay - by) < ah + hh)) return false;
    taken.push([bx, by, hw, hh]);
    return true;
  }).slice(0, max);
  return { svg, pin, plate, names: keep(names, 9.5, 3), seas: keep(seas, 11, 2) };
}
