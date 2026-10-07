
/* ═══════════════════════════════════════════════════
   BRASÕES — every state's own emblem

   A state is drawn with the sign its own people used, on the kind of
   shield its own soldiers carried: the Λ on a Spartan hoplon, the eagle
   and thunderbolts on a legionary scutum, Athena's owl on a silver coin,
   three lions on an English heater shield, the hollyhock mon of the
   Tokugawa, the eagle on the cactus on an Aztec chimalli, a modern
   republic's own flag. No letters: the sign is the name.

   Each entry in BRASAO (tools/history/js/brasoes/*.js, one file per
   region) is
     { shape: one of BSHAPE, field: '#hex', rim?: '#hex',
       draw: u => svg markup in the 60×60 box (u: an id prefix for defs),
       what: 'the device, in a few words' }
   The shape clips the field and the device; the frame (rim, rivets,
   fringe, milled edge) is drawn on top. Everything stays inside a circle
   of radius 29 round (30,30), because the app shows a brasão inside a
   round ivory disc.
═══════════════════════════════════════════════════ */
const BRASAO = {};

/* palette — heraldic tinctures as enamel and metal, not screen primaries */
const BK = {
  gold: '#D6A93F', goldHi: '#F2D27A', goldLo: '#8C6420',
  silver: '#ECE7DA', silverLo: '#B9B2A2',
  bronze: '#B67E3E', bronzeLo: '#7A4F22',
  red: '#A8262B', redLo: '#6E1418',
  azure: '#1F4F9E', azureLo: '#13305F',
  vert: '#1F6B3C', vertLo: '#114025',
  purple: '#5C2A70', sable: '#1D1A18', ink: '#1A1410',
  lapis: '#1C3D8C', terracotta: '#B5582F', ochre: '#C98F2E', jade: '#3E8E6A', ivory: '#F3EBD6',
};

/* ── drawing helpers, for the regional files ── */
const B = {
  f: n => +n.toFixed(2),
  /* an n-pointed star: outer radius r, inner radius ri (default r·.42) */
  star(cx, cy, r, n, fill, ri, rot) {
    n = n || 5; ri = ri || r * .42; rot = rot === undefined ? -Math.PI / 2 : rot;
    const p = [];
    for (let i = 0; i < n * 2; i++) {
      const a = rot + i * Math.PI / n, rr = i % 2 ? ri : r;
      p.push(B.f(cx + Math.cos(a) * rr) + ' ' + B.f(cy + Math.sin(a) * rr));
    }
    return `<path d="M${p.join('L')}Z" fill="${fill}"/>`;
  },
  /* n straight rays between radii r1 and r2 */
  rays(cx, cy, r1, r2, n, stroke, w, rot) {
    rot = rot || 0;
    let d = '';
    for (let i = 0; i < n; i++) {
      const a = rot + i * 2 * Math.PI / n;
      d += `M${B.f(cx + Math.cos(a) * r1)} ${B.f(cy + Math.sin(a) * r1)}L${B.f(cx + Math.cos(a) * r2)} ${B.f(cy + Math.sin(a) * r2)}`;
    }
    return `<path d="${d}" stroke="${stroke}" stroke-width="${w || 1.6}" stroke-linecap="round" fill="none"/>`;
  },
  /* n wedge-shaped rays (a sunburst) between r1 and r2, each `half` radians wide at the base */
  wedges(cx, cy, r1, r2, n, fill, half, rot) {
    rot = rot || 0; half = half || Math.PI / n * .5;
    let d = '';
    for (let i = 0; i < n; i++) {
      const a = rot + i * 2 * Math.PI / n;
      d += `M${B.f(cx + Math.cos(a - half) * r1)} ${B.f(cy + Math.sin(a - half) * r1)}`
         + `L${B.f(cx + Math.cos(a) * r2)} ${B.f(cy + Math.sin(a) * r2)}`
         + `L${B.f(cx + Math.cos(a + half) * r1)} ${B.f(cy + Math.sin(a + half) * r1)}Z`;
    }
    return `<path d="${d}" fill="${fill}"/>`;
  },
  /* a path and its mirror image across x = 30 — half an eagle makes an eagle */
  sym(d, fill, extra) {
    return `<path d="${d}" fill="${fill}" ${extra || ''}/><path d="${d}" fill="${fill}" ${extra || ''} transform="matrix(-1 0 0 1 60 0)"/>`;
  },
  /* the same, for stroked line-work */
  symLine(d, stroke, w, extra) {
    return `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w || 1.4}" stroke-linecap="round" stroke-linejoin="round" ${extra || ''}/>`
         + `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w || 1.4}" stroke-linecap="round" stroke-linejoin="round" ${extra || ''} transform="matrix(-1 0 0 1 60 0)"/>`;
  },
  ring(cx, cy, r, w, stroke, extra) {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${w}" ${extra || ''}/>`;
  },
  /* small dots round a circle: rivets, pearls, a coin's milled edge */
  dots(cx, cy, r, n, rad, fill, rot) {
    rot = rot || 0;
    let s = '';
    for (let i = 0; i < n; i++) {
      const a = rot + i * 2 * Math.PI / n;
      s += `<circle cx="${B.f(cx + Math.cos(a) * r)}" cy="${B.f(cy + Math.sin(a) * r)}" r="${rad}"/>`;
    }
    return `<g fill="${fill}">${s}</g>`;
  },
  /* letters, for the few devices that are words (SPQR) — a serif every phone has */
  text(x, y, s, size, fill, extra) {
    return `<text x="${x}" y="${y}" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-weight="700" `
         + `font-size="${size}" fill="${fill}" ${extra || ''}>${s}</text>`;
  },
};

/* ── the shapes ──
   d: the outline (clips field and device); edge: the outline drawn on top;
   under / over: what sits behind the field or on top of everything */
const _edge = (d, c, w) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w || 1.6}" stroke-linejoin="round"/>`;
const _circ = r => `M${30 - r} 30a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0Z`;
const BSHAPE = {
  /* the medieval knight's shield */
  heater: { d: 'M10 9H50V29C50 43 41.5 51 30 56.5C18.5 51 10 43 10 29Z',
    edge: (d, r) => _edge(d, r || BK.goldLo, 1.8) + `<path d="M12.4 11.4H47.6V29C47.6 41.6 40 48.6 30 53.8C20 48.6 12.4 41.6 12.4 29Z" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width=".8"/>` },
  /* the early-modern escutcheon, squared off with a point */
  french: { d: 'M10 9H50V38C50 46.5 44 50.5 37 51.6C33.4 52.2 31.2 53.8 30 56.5C28.8 53.8 26.6 52.2 23 51.6C16 50.5 10 46.5 10 38Z',
    edge: (d, r) => _edge(d, r || BK.goldLo, 1.8) },
  /* the Greek hoplite's round bronze shield: a broad rim */
  hoplon: { d: _circ(23),
    under: (b) => `<circle cx="30" cy="30" r="28" fill="${b.rim || BK.bronze}"/><circle cx="30" cy="30" r="28" fill="none" stroke="${BK.bronzeLo}" stroke-width="1.4"/>`
      + `<circle cx="30" cy="30" r="25.5" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width=".9"/>`,
    edge: () => `<circle cx="30" cy="30" r="23" fill="none" stroke="${BK.bronzeLo}" stroke-width="1.4"/>` },
  /* a coin: milled edge, struck field */
  coin: { d: _circ(24),
    under: (b) => `<circle cx="30" cy="30" r="28" fill="${b.rim || BK.silverLo}"/>`,
    edge: (d, r) => `<circle cx="30" cy="30" r="24" fill="none" stroke="#0003" stroke-width="1"/>`,
    over: (b) => B.dots(30, 30, 26.2, 44, .85, '#0002') },
  /* a plain disc: a seal, a medallion */
  roundel: { d: _circ(27),
    edge: (d, r) => `<circle cx="30" cy="30" r="27" fill="none" stroke="${r || BK.goldLo}" stroke-width="1.8"/>`
      + `<circle cx="30" cy="30" r="24.6" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width=".8"/>` },
  /* a Japanese mon: a crest in a circle, flat */
  mon: { d: _circ(27.5), edge: (d, r) => r ? `<circle cx="30" cy="30" r="27.5" fill="none" stroke="${r}" stroke-width="1"/>` : '' },
  /* the legionary's curved oblong shield */
  scutum: { d: 'M16 6Q30 3.4 44 6Q47.6 30 44 54Q30 56.6 16 54Q12.4 30 16 6Z',
    edge: (d, r) => _edge(d, r || BK.goldLo, 1.8) + `<path d="M30 6V54" stroke="#0002" stroke-width="1"/>` },
  /* an oval escutcheon (seals, the Russian and Brazilian imperial arms) */
  oval: { d: 'M30 3C41.6 3 51 15 51 30S41.6 57 30 57S9 45 9 30S18.4 3 30 3Z',
    edge: (d, r) => _edge(d, r || BK.goldLo, 1.8) },
  /* the Egyptian cartouche: a rope oval standing on a bar */
  cartouche: { d: 'M30 4C39.4 4 46 11 46 20V40C46 47.5 39.4 52 30 52C20.6 52 14 47.5 14 40V20C14 11 20.6 4 30 4Z',
    edge: (d, r) => _edge(d, r || BK.goldLo, 2.2) + `<rect x="15" y="52.5" width="30" height="4" rx="1" fill="${r || BK.goldLo}"/>` },
  /* a clay tablet or a glazed brick panel */
  tablet: { d: 'M15 9H45Q51 9 51 15V45Q51 51 45 51H15Q9 51 9 45V15Q9 9 15 9Z',
    edge: (d, r) => _edge(d, r || BK.goldLo, 1.6) },
  /* a Chinese seal: a square with a worn edge */
  seal: { d: 'M11.5 10.5L30 10L48.6 11.2L49.6 30L48.8 49.4L30 50L11 48.8L10.4 30Z',
    edge: (d, r) => r ? _edge(d, r, 1.2) : '' },
  /* a standing stone, round-topped */
  stele: { d: 'M16 56V22Q16 6 30 5Q44 6 44 22V56Z',
    edge: (d, r) => _edge(d, r || BK.goldLo, 1.6) },
  /* a modern national flag, waving a little */
  banner: { d: 'M5 15Q17.5 12.6 30 15T55 15V45Q42.5 42.6 30 45T5 45Z',
    edge: (d, r) => _edge(d, r || '#0004', 1) },
  /* a Roman vexillum: a cloth hung from a crossbar, fringed */
  vexillum: { d: 'M15 11H45V45H15Z',
    under: () => `<path d="M30 2V58" stroke="${BK.goldLo}" stroke-width="2.4"/><circle cx="30" cy="3.6" r="2.2" fill="${BK.gold}"/>`,
    edge: (d, r) => `<path d="M12 10H48" stroke="${BK.goldLo}" stroke-width="2.6" stroke-linecap="round"/>` + _edge(d, r || BK.goldLo, 1.2),
    over: () => `<path d="M15 45${Array.from({ length: 10 }, (_, i) => `l1.5 4l1.5 -4`).join('')}" fill="none" stroke="${BK.gold}" stroke-width="1.3" stroke-linejoin="round"/>` },
  /* the Mesoamerican chimalli: a round shield hung with feathers */
  chimalli: { d: 'M30 4A23 23 0 1 1 29.99 4Z',
    over: (b) => [-2, -1, 0, 1, 2].map(i => `<path d="M${30 + i * 7} 48q-2 6 0 9q2-3 0-9z" fill="${b.feather || BK.jade}" stroke="${BK.vertLo}" stroke-width=".6"/>`).join(''),
    edge: (d, r) => `<circle cx="30" cy="27" r="23" fill="none" stroke="${r || BK.goldLo}" stroke-width="2"/>`,
    dy: -3 },
  /* a caravel's square sail, bellied by the wind */
  sail: { d: 'M11 8Q30 12 49 8Q53.5 30 49 52Q30 48 11 52Q6.5 30 11 8Z',
    under: () => `<path d="M8 6.5Q30 11 52 6.5" stroke="${BK.bronzeLo}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
    edge: (d, r) => _edge(d, r || '#8a7a5a', 1) },
};
/* the chimalli's circle sits a little high, to leave room for its feathers */
BSHAPE.chimalli.d = 'M30 4A23 23 0 1 1 29.99 4Z';

function brasaoSvg(id) {
  const b = BRASAO[id];
  if (!b) return '';
  const S = BSHAPE[b.shape] || BSHAPE.heater;
  const u = 'b' + id.replace(/\W/g, '') + '_' + (typeof _crestN !== 'undefined' ? (++_crestN).toString(36) : Math.random().toString(36).slice(2, 7));
  const sheen = b.sheen === false ? '' : `<path d="${S.d}" fill="url(#${u}g)" pointer-events="none"/>`;
  let dev = '';
  try { dev = b.draw(u, b) || ''; } catch (e) { dev = ''; }
  return `<defs><clipPath id="${u}c"><path d="${S.d}"/></clipPath>`
    + `<radialGradient id="${u}g" cx="36%" cy="26%" r="82%"><stop offset="0" stop-color="#fff" stop-opacity=".2"/>`
    + `<stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".2"/></radialGradient></defs>`
    + (S.under ? S.under(b) : '')
    + `<g clip-path="url(#${u}c)"><path d="${S.d}" fill="${b.field || BK.red}"/>${dev}${sheen}</g>`
    + (S.edge ? S.edge(S.d, b.rim) : '')
    + (S.over ? S.over(b) : '');
}
