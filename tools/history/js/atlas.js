
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
/* the colourist's pots: rose madder, ochre, sap green, lilac, carmine, orange, gamboge (album_map.json's `ink` picks one per
   country). Nothing blue or blue-green: on a map such a land reads as water */
const ATL_WASH = ['#C47A66', '#D6A84F', '#8C9A44', '#9B82B6', '#C2606F', '#D48745', '#D9C060'];
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
function _atlLand(X, hills, hs, gilt) {
  const { u, k } = X, h = (hs || 1) * 12;
  return `<use href="#${u}-land" fill="${gilt ? '#EBD39A' : '#FBF3DC'}" fill-opacity="${gilt ? '.7' : '.62'}"/>` + (hills || []).map(([x, y, s]) =>
    `<use href="#${u}-hill" x="${_f(x - h / 2 * s * k)}" y="${_f(y - h * 5 / 12 * s * k)}" width="${_f(h * s * k)}" height="${_f(h / 2 * s * k)}"/>`).join('');
}
/* a country washed by how much of it is in the album: none is the engraving's own hatching,
   some is a thin wash with its border coloured deeper (the colourist's way), all is a full wash with a gilt edge */
function _atlWash(X, c, f, fresh) {
  const { u } = X, id = `${u}-s-${c}`, col = ATL_WASH[(ALB_MAP.ink || {})[c] || 0];
  if (f <= 0) return `<use href="#${id}" fill="url(#${u}-hatch)" class="atl-c" data-place="${c}"/>`;
  /* a great state was coloured along its borders and only lightly within, or it would flood the sheet */
  const a = (ALB_MAP.area || {})[c] || 0, big = a > .1 ? .4 : a > .03 ? .6 : 1;
  return `<g class="atl-c${fresh ? ' is-fresh' : ''}${f >= 1 ? ' is-done' : ''}" data-place="${c}">
    <use href="#${id}" fill="${col}" fill-opacity="${_f((.12 + .34 * f) * big)}" class="atl-wash"/>
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
    const s = size * X.k * (X.ls || 1), big = kind === 'big';
    return `<text x="${_f(x)}" y="${_f(y)}"${rot ? ` transform="rotate(${_f(rot)} ${_f(x)} ${_f(y)})"` : ''} font-size="${_f(s)}"
      class="atl-t atl-t-${kind}" letter-spacing="${_f(s * (big ? .42 : kind === 'land' ? .18 : .06))}" stroke-width="${_f(2.2 * X.k * (X.ls || 1))}">${_esc(t)}</text>`;
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
  const fs = Math.min(bh * s * (sub ? .4 : .5), bw * s / (title.length * .46));
  const ss = Math.min(bh * s * .19, bw * s * .92 / (sub ? sub.length * .48 : 1));
  const two = sub && ss >= 8.5;
  return `${_atlPiece('cartela', x, y, w)}
    <text x="${_f(tx)}" y="${_f(two ? ty - bh * s * .12 : ty)}" font-size="${_f(fs)}" class="atl-t atl-title">${_esc(title)}</text>
    ${two ? `<text x="${_f(tx)}" y="${_f(ty + bh * s * .27)}" font-size="${_f(ss)}" class="atl-t atl-sub">${_esc(sub)}</text>` : ''}`;
}
/* the neatline round a sheet: a double rule with a band ruled black and white between */
function _atlNeat(X, x, y, w, h) {
  const k = X.k, b = 5 * k, r = (i, sw) => `<rect x="${_f(x + i)}" y="${_f(y + i)}" width="${_f(w - 2 * i)}" height="${_f(h - 2 * i)}" stroke-width="${_f(sw)}"`;
  return `<g fill="none">${r(b / 2, b)} stroke="#F1E5C4" stroke-opacity=".85"/>
    ${r(b / 2, b * .5)} stroke="${ATL_INK}" stroke-opacity=".55" stroke-dasharray="${_f(.6 * k)} ${_f(3.4 * k)}"/>
    ${r(.6 * k, 1.2 * k)} stroke="${ATL_INK}"/>${r(b, .6 * k)} stroke="${ATL_INK}"/></g>`;
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
    const o = M[h], [hx, hy] = C[h], X = { u: u + h, k: kk, rings: 'world', ls: Math.max(.72, Math.min(1, R / 170)) };
    defs += _atlDefs(X) + _atlShapes(X, o.land, o.shapes, cs) + _atlCoast(X, [-M.r, -M.r, 2 * M.r, 2 * M.r])
         + `<clipPath id="${X.u}-disc"><circle r="${M.r}"/></clipPath>`;
    const rose = o.deco.find(d => d[0] === 'rosa');
    body += `<g transform="translate(${_f(hx)} ${_f(hy)}) scale(${_f(sc)})" class="atl-hemi" data-hemi="${h}">
      <g clip-path="url(#${X.u}-disc)">
        ${_atlSea(X, [-M.r, -M.r, 2 * M.r, 2 * M.r])}
        ${rose ? _atlRhumbs(X, rose[1], rose[2], M.r * 2.2) : ''}
        ${_atlGrat(X, o)}
        ${_atlLand(X, o.hills, .8, cs.every(c => _atlFill(c) >= 1))}
        ${Object.keys(o.shapes).filter(c => cs.includes(c)).map(c => _atlWash(X, c, _atlFill(c), fresh.has(c))).join('')}
        ${_atlLines(X, o.borders)}
        ${o.deco.map(([n, x, y, f]) => _atlPiece(n, x, y, f * 2 * M.r * (n === 'rosa' ? .9 : 1), n === 'caravela' && h === 'W')).join('')}
        ${_atlLabels(X, o.labels)}
      </g>
      <circle r="${_f(rr)}" fill="none" stroke="#F1E5C4" stroke-width="${_f(bu)}"/>
      <circle r="${_f(M.r + bu * .72)}" fill="none" stroke="${ATL_INK}" stroke-width="${_f(bu * .3)}" stroke-dasharray="${_f(Math.PI * 2 * (M.r + bu * .72) / 72)}"/>
      <circle r="${_f(M.r + bu * .57)}" fill="none" stroke="${ATL_INK}" stroke-width="${_f(kk * .4)}"/>
      <circle r="${_f(M.r + bu * .28)}" fill="none" stroke="${ATL_INK}" stroke-width="${_f(bu * .3)}" stroke-opacity=".7" stroke-dasharray="${_f(kk * .45)} ${_f(Math.PI * 2 * (M.r + bu * .28) / 180 - kk * .45)}"/>
      <circle r="${M.r}" fill="none" stroke="${ATL_INK}" stroke-width="${_f(kk * .9)}"/>
      <circle r="${_f(M.r + bu)}" fill="none" stroke="${ATL_INK}" stroke-width="${_f(kk * 1.3)}"/>
    </g>`;
  }
  /* the title over the meeting of the two worlds, the armillary sphere where there is room */
  const cw = Math.min(row ? Rt * 1.2 : D * .64, 260), ch = cw * .46;
  const tY = row ? Math.max(ins + ch / 2 + 2, cy - Rt * .84) : cy;
  const title = _atlCartouche(cx, tY, cw, 'Mapa-Múndi', 'nova e exata descrição de toda a Terra');
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
const ATL_CHART_TITLE = { EU: 'Europa', AS: 'Ásia', AF: 'África', AM: 'América' };
/* Is this spot of a chart at sea? The land's outline, read once from its path (d3 writes only M, L and Z),
   and an even-odd test against all its rings */
const _atlRings = {};
function _atlAtSea(key, x, y) {
  const rings = _atlRings[key] || (_atlRings[key] = ALB_MAP.charts[key].land.split('M').filter(Boolean).map(r =>
    r.replace(/Z/g, '').split('L').map(q => q.split(',').map(Number))));
  let inside = false;
  for (const ring of rings) for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
  }
  return !inside;
}
function atlasChart(key, W, H, fresh) {
  const o = ALB_MAP.charts[key], u = 'atc' + (++_atlN);
  const [cx0, cy0, cw, ch] = o.core, [ex, ey, ew, eh] = o.ext, A = W / H;
  const cs = albPlaces().order, own = Object.entries(o.pins).filter(([c]) => cs.includes(c));
  let vw = cw * 1.04, vh = ch * 1.04;
  if (vw / vh < A) vw = vh * A; else vh = vw / A;
  if (vw > ew) { vw = ew; vh = vw / A; }
  if (vh > eh) { vh = eh; vw = vh * A; }
  /* centred on the pins, as far as the whole part of the world still fits */
  const qx = own.map(([, q]) => q[0]), qy = own.map(([, q]) => q[1]);
  let vx = (own.length ? (Math.min(...qx) + Math.max(...qx)) / 2 : cx0 + cw / 2) - vw / 2;
  let vy = (own.length ? (Math.min(...qy) + Math.max(...qy)) / 2 : cy0 + ch / 2) - vh / 2;
  if (vw >= cw) vx = Math.min(cx0, Math.max(cx0 + cw - vw, vx));
  if (vh >= ch) vy = Math.min(cy0, Math.max(cy0 + ch - vh, vy));
  vx = Math.max(ex, Math.min(ex + ew - vw, vx)); vy = Math.max(ey, Math.min(ey + eh - vh, vy));
  const s = W / vw, X = { u, k: 1 / s }, k = X.k, box = [vx, vy, vw, vh];
  const pins = _amapSpread(own.map(([c, [x, y]]) => ({ c, x: (x - vx) * s, y: (y - vy) * s })), W, H, 31);
  /* everything that is lettered or drawn claims its room, in pixels: the pins first, then the scale,
     the cartouche, the pieces and the names, each only where nothing is yet */
  const taken = pins.map(p => [p.x, p.y, 17, 17]);
  const hit = (bx, by, hw, hh) => taken.some(([ax, ay, aw, ah]) => Math.abs(ax - bx) < aw + hw && Math.abs(ay - by) < ah + hh);
  const fits = (bx, by, hw, hh) => bx - hw > 9 && bx + hw < W - 9 && by - hh > 9 && by + hh < H - 9;
  const lg = o.deg / 17.5, bar = 100 * lg * s;                 // a hundred Portuguese leagues, 17½ to a degree, in px
  const showScale = bar < W * .42 && bar > 30;
  if (showScale) taken.push([16 + bar / 2, H - 24, bar / 2 + 6, 13]);
  const cwPx = Math.min(W * .5, 210), chPx = cwPx * .46;
  let cart = null;
  /* a stretch of open sea for a w × h px piece: the chart's own spots first, then anywhere on the sheet, nearest the edges first */
  const seaFor = (spots, hw, hh) => {
    const sea = (bx, by) => { let n = 0, t = 0;
      for (let i = -2; i <= 2; i++) for (let j = -1; j <= 1; j++) { t++; if (_atlAtSea(key, vx + (bx + i * hw / 2) * k, vy + (by + j * hh) * k)) n++; }
      return n / t >= .8; };
    const scan = [];
    for (let j = 0; j < 9; j++) for (let i = 0; i < 5; i++) scan.push([hw + 10 + (W - 2 * hw - 20) * i / 4, hh + 10 + (H - 2 * hh - 20) * (j % 2 ? 8 - (j >> 1) : j >> 1) / 8]);
    for (const [bx, by] of spots.map(([x, y]) => [(x - vx) * s, (y - vy) * s]).concat(scan))
      if (fits(bx, by, hw, hh) && !hit(bx, by, hw + 4, hh + 4) && sea(bx, by)) return [bx, by];
    return null;
  };
  let cartW = cwPx;
  for (const f of [1, .84, .7]) {
    cartW = Math.max(118, cwPx * f);
    if ((cart = seaFor(o.cart || [], cartW / 2, cartW * .23))) break;
  }
  if (cart) taken.push([cart[0], cart[1], cartW / 2, cartW * .23]);
  const deco = [];
  for (const d of o.deco) {
    const [n, x, y, f] = d, bx = (x - vx) * s, by = (y - vy) * s, r = f * W / 2;
    const hw = r * .8, hh = r * (n === 'rosa' ? .8 : .5);
    if (deco.some(e => e[0] === n) || !fits(bx, by, hw, hh) || hit(bx, by, hw, hh)) continue;
    deco.push(d); taken.push([bx, by, hw, hh]);
  }
  if (!deco.some(d => d[0] === 'rosa')) {
    const r = Math.min(W, H) * .085, at = seaFor([], r, r);
    if (at) { deco.push(['rosa', vx + at[0] * k, vy + at[1] * k, r * 2 / .9 / W]); taken.push([at[0], at[1], r, r]); }
  }
  const rose = deco.find(d => d[0] === 'rosa');
  /* a sea's or a land's name never sits under a pin, a piece or the frame; the cartouche names the part of the world itself */
  const labels = [];
  for (const [t, x, y, size, kind, rot] of o.labels) {
    if (cart && kind === 'big') continue;
    const bx = (x - vx) * s, by = (y - vy) * s, hw = t.length * size * (kind === 'big' ? .62 : .3) + 5, hh = size * .6 + 4;
    /* where it is meant to go, or a little above, below or to either side, if that is clear */
    const at = [[0, 0], [0, hh * 1.7], [0, -hh * 1.7], [hw * .5, 0], [-hw * .5, 0], [0, hh * 3]].find(([dx, dy]) =>
      fits(bx + dx, by + dy, hw, hh) && !hit(bx + dx, by + dy, hw, hh));
    if (!at) continue;
    taken.push([bx + at[0], by + at[1], hw, hh]);
    labels.push([t, x + at[0] * k, y + at[1] * k, size, kind, rot]);
  }
  const defs = _atlDefs(X) + _atlShapes(X, o.land, o.shapes, cs) + _atlCoast(X, box)
    + `<clipPath id="${u}-frame"><rect x="${_f(vx)}" y="${_f(vy)}" width="${_f(vw)}" height="${_f(vh)}"/></clipPath>`;
  const bu = bar * k, bx = vx + 16 * k, by = vy + vh - 20 * k;
  const scale = showScale ? `<g class="atl-scale"><rect x="${_f(bx - 5 * k)}" y="${_f(by - 14 * k)}" width="${_f(bu + 10 * k)}" height="${_f(21 * k)}" fill="#F4EBD2" fill-opacity=".75" stroke="${ATL_INK}" stroke-width="${_f(.6 * k)}"/>
    ${[0, 1, 2, 3, 4].map(i => `<rect x="${_f(bx + i * bu / 5)}" y="${_f(by)}" width="${_f(bu / 5)}" height="${_f(3 * k)}" fill="${i % 2 ? '#F1E5C4' : ATL_INK}" stroke="${ATL_INK}" stroke-width="${_f(.5 * k)}"/>`).join('')}
    <text x="${_f(bx + bu / 2)}" y="${_f(by - 4 * k)}" font-size="${_f(8 * k)}" class="atl-t atl-t-sea">100 léguas</text></g>` : '';
  const done = own.length && own.every(([c]) => _atlFill(c) >= 1);
  const svg = `<svg class="atl-svg" viewBox="${_f(vx)} ${_f(vy)} ${_f(vw)} ${_f(vh)}" width="${_f(W)}" height="${_f(H)}" aria-hidden="true">
    <defs>${defs}</defs>
    <g clip-path="url(#${u}-frame)">
      ${_atlSea(X, box)}
      ${rose ? _atlRhumbs(X, rose[1], rose[2], Math.hypot(vw, vh)) : ''}
      ${_atlGrat(X, o)}
      ${_atlLand(X, o.hills, 1, done)}
      ${Object.keys(o.shapes).filter(c => cs.includes(c)).map(c => _atlWash(X, c, _atlFill(c), fresh.has(c))).join('')}
      ${_atlLines(X, o.borders)}
      ${deco.map(([n, x, y, f]) => _atlPiece(n, x, y, f * vw * (n === 'rosa' ? .9 : 1), false)).join('')}
      ${_atlLabels(X, labels)}
      ${scale}
      ${cart ? _atlCartouche(vx + cart[0] * k, vy + cart[1] * k, cartW * k, ATL_CHART_TITLE[key], 'nova e exata descrição') : ''}
    </g>
    ${_atlNeat(X, vx, vy, vw, vh)}</svg>`;
  return { svg, pins, s, box };
}

/* ── the little chart at the foot of a country's page: where it is, its neighbours round it ── */
function atlasInset(c, W, H, plateW) {
  const M = ALB_MAP, X = { u: 'ati' + (++_atlN), ve: true, rings: 'inset' };
  const [x0, y0, x1, y1] = M.bbox[c] || [0, 0, 360, 134];
  const p = M.pins[c] || [(x0 + x1) / 2, (y0 + y1) / 2];
  const lat = 78 - (y0 + y1) / 2;
  /* an equirectangular map squashes the north: drawn here as tall as an atlas would print it */
  const st = Math.min(1.7, 1 / Math.cos(Math.max(-70, Math.min(70, lat)) * Math.PI / 180));
  let vw = Math.max(14, (x1 - x0) * 1.8), vh = Math.max(7, (y1 - y0) * 1.8);
  const A = W / H * st;                     // the room's shape in map units
  if (vw / vh < A) vw = vh * A; else vh = vw / A;
  if (vw > 360) { vw = 360; vh = vw / A; }
  /* the page's name plate takes a corner of the chart: the country is set off to the other side of it, in the middle
     of the room the plate leaves; where there is too little room the plate gives way (the page's title names it) */
  const pw = (plateW || 150) + 16, tall = H > W * .8 && H > 150;
  const plate = tall ? 'bottom' : W - pw >= 70 ? 'left' : 'none';
  const fx = plate === 'left' ? (pw + (W - pw) / 2) / W : .5, fy = tall ? .4 : .5;
  const vx = Math.max(0, Math.min(360 - vw, p[0] - vw * fx)), vy = Math.max(-25, Math.min(159 - vh, p[1] - vh * fy));
  X.k = vw / W;
  const box = [vx, vy, vw, vh];
  /* the graticule, every five degrees */
  let g = '';
  for (let lo = Math.ceil((vx - 170) / 5) * 5; lo + 170 <= vx + vw; lo += 5) g += `M${lo + 170} ${_f(vy)}V${_f(vy + vh)}`;
  for (let la = Math.ceil((78 - vy - vh) / 5) * 5; 78 - la >= vy; la += 5) g += `M${_f(vx)} ${78 - la}H${_f(vx + vw)}`;
  const o = { grat: g, lines: {} };
  if (vy < 78 && vy + vh > 78) o.lines.eq = `M${_f(vx)} 78H${_f(vx + vw)}`;
  const near = Object.keys(M.shapes).filter(n => { const b = M.bbox[n]; return b && b[2] > vx && b[0] < vx + vw && b[3] > vy && b[1] < vy + vh; });
  if (M.shapes[c] && !near.includes(c)) near.push(c);
  const col = ATL_WASH[(M.ink || {})[c] || 0], f = _atlFill(c), u = X.u;
  const pc = q => [(q[0] - vx) / vw * 100, (q[1] - vy) / vh * 100];
  const pin = pc(p);
  const svg = `<svg class="atl-svg" viewBox="${_f(vx)} ${_f(vy)} ${_f(vw)} ${_f(vh)}" width="${_f(W)}" height="${_f(H)}" preserveAspectRatio="none" aria-hidden="true">
    <defs>${_atlDefs(X)}${_atlShapes(X, M.land, M.shapes, near)}${_atlCoast(X, box)}</defs>
    ${_atlSea(X, box)}
    ${_atlGrat(X, o)}
    ${_atlLand(X, (M.hills || []).filter(([x, y]) => x > vx && x < vx + vw && y > vy && y < vy + vh), .8)}
    ${near.filter(n => n !== c).map(n => _atlFill(n) > 0 ? `<use href="#${u}-s-${n}" fill="${ATL_WASH[(M.ink || {})[n] || 0]}" fill-opacity=".16"/>` : '').join('')}
    ${M.shapes[c] ? (f > 0 ? `<use href="#${u}-s-${c}" fill="${col}" fill-opacity="${_f(.3 + .45 * f)}"/>
      <use href="#${u}-s-${c}" fill="none" stroke="${col}" ${_sw(X, 5)} stroke-opacity=".85" clip-path="url(#${u}-k-${c})"/>`
      : `<use href="#${u}-s-${c}" fill="url(#${u}-hatch)"/>`)
      + `<use href="#${u}-s-${c}" fill="none" stroke="${f > 0 ? '#A97A22' : ATL_INK}" ${_sw(X, f > 0 ? 1.4 : 1.1)}/>` : ''}
    ${_atlLines(X, M.borders)}
    </svg>`;
  /* the lettering, in pixels: the neighbours by size, then the seas, none on another, on the pin or under the plate */
  const pr = plate === 'bottom' ? [W / 2, H - 25, pw / 2, 25] : plate === 'left' ? [pw / 2, H - 25, pw / 2, 25] : [-99, -99, 0, 0];
  const taken = [pr, [pin[0] * W / 100, pin[1] * H / 100, 13, 13], [W - 22, 22, 20, 20]];
  const keep = (list, size, max, wide) => list.filter(([t, x, y]) => {
    const bx = x * W / 100, by = y * H / 100, hw = t.length * size * wide + 4, hh = size * .7;
    if (bx - hw < 5 || bx + hw > W - 5 || by - hh < 5 || by + hh > H - 5) return false;
    if (taken.some(([ax, ay, aw, ah]) => Math.abs(ax - bx) < aw + hw && Math.abs(ay - by) < ah + hh)) return false;
    taken.push([bx, by, hw, hh]);
    return true;
  }).slice(0, max);
  const [bx0, by0, bx1, by1] = M.bbox[c] || [0, 0, 0, 0];
  const own = (x, y) => x > bx0 && x < bx1 && y > by0 && y < by1;
  const names = (M.names || []).filter(([t, x, y]) => x > vx && x < vx + vw && y > vy && y < vy + vh && !own(x, y) && t !== placeName(c))
    .sort((a, b) => b[3] - a[3]).map(([t, x, y]) => [t, ...pc([x, y])]);
  const seas = (M.labels || []).map(([t, x, y]) => [t, ...pc([x, y])]);
  /* where it lies, as an old chart would say it: degrees north or south, east (leste) or west (oeste) */
  const la = Math.round(78 - p[1]), lo = Math.round(p[0] - 170);
  const coord = `${Math.abs(la)}° ${la >= 0 ? 'N' : 'S'} · ${Math.abs(lo)}° ${lo >= 0 ? 'L' : 'O'}`;
  return { svg, pin, plate, coord, names: keep(names, 9.5, 4, .38), seas: keep(seas, 11, 2, .3) };
}
