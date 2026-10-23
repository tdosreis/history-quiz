// The album's maps (tools/history/album_map.json):
//   node tools/history/albmapgen.mjs <dir with world-atlas, topojson-client, d3-geo, d3-geo-projection installed> tools/history/album_map.json
// Natural Earth 1:110m (public domain), drawn three ways:
//  · `land`/`borders`/`shapes`/`pins`/`views`: the whole world, equirectangular, 78°N to 56°S, centred on 10°E, one unit
//    a degree (360 × 134). "Onde foi?" plays on it, and each album page's own little chart is cut from it (`bbox`).
//  · `hemi`: the world as the atlases of the 1600s printed it, two hemispheres in Nicolosi's globular projection
//    (the meridians are arcs of circles), split on the meridian of 20°W; each a disc of radius 100 around 0,0.
//  · `charts`: one chart per part of the world, each in the projection an atlas would use for it (conic for Europe and
//    Asia, azimuthal for Africa and the Americas). `core` is what the chart must show; `ext` is how far the data goes, so
//    the chart can widen or heighten to any screen without running out of map.
// `shapes` are the countries the album has a page for, `pins` where each page's pin stands (a capital or the heart of
// the country, chosen by hand: a centroid puts France in the Atlantic and the United States in Canada), `ink` the
// watercolour each country is washed with (no two neighbours alike), `labels` the seas and lands lettered on each map,
// `deco` where its compass rose, ships and monsters may sit.
import { createRequire } from 'module';
import fs from 'fs';
const [nm, out] = process.argv.slice(2);
const require = createRequire(nm + '/package.json');
const topo = require('topojson-client');
const simp = require('topojson-simplify');
const d3 = await import(nm + '/node_modules/d3-geo/src/index.js');
const d3p = await import(nm + '/node_modules/d3-geo-projection/src/index.js');
const T = JSON.parse(fs.readFileSync(nm + '/node_modules/world-atlas/countries-110m.json', 'utf8'));
const W = 360, H = 134;
const round = (v, k = 10) => Math.round(v * k) / k;

/* the great mountain ranges, drawn as old maps drew them: a row of little shaded hills — [lat, lon] along each crest */
const RANGES = [
  [[10, -73], [5, -76], [0, -78], [-5, -79], [-10, -77], [-15, -72], [-20, -68], [-25, -68], [-30, -69.8], [-35, -70.4], [-40, -71.4], [-45, -72], [-50, -73.2]],
  [[62, -132], [58, -126], [54, -121], [50, -116], [46, -112], [42, -108], [38, -106], [34, -106.5]],
  [[29, -107.5], [25.5, -105.5], [21.5, -103.8], [18.5, -100]], [[46, -70], [43, -73.8], [40, -77.5], [37, -81], [34.8, -84]],
  [[44.2, 7], [45.9, 7.6], [46.5, 9.8], [47, 11.8], [47.3, 13.8], [47.6, 15.6]], [[42.8, -1.6], [42.6, .6], [42.5, 2.4]],
  [[49.4, 19.4], [49, 22.4], [47.6, 24.8], [46, 25.6], [45.5, 23]], [[43.6, 40], [43, 43.2], [42.2, 46], [41.2, 48.6]],
  [[67, 65], [63, 59.6], [59, 59.2], [55, 58.8], [52, 58.2]], [[35.2, -1], [33.6, -4.6], [31.8, -7], [30.8, -9], [35.4, 6.4]],
  [[35.6, 74], [33, 77], [31, 80], [29.2, 83.4], [28, 86.6], [27.8, 89.8], [28.2, 93.4]], [[36, 69.6], [37.6, 73]],
  [[41.8, 76], [42.6, 80], [43.2, 84], [43.4, 88]], [[37.2, 44.8], [35.2, 46.6], [32.8, 48.6], [30.6, 51.2], [28.6, 53.6]],
  [[13, 38.2], [10.6, 38.8], [8.2, 38], [6.4, 37.4]], [[-28.6, 29.4], [-30.6, 28.2], [-32.4, 26.2]],
  [[69.4, 19.6], [67, 15.6], [64.4, 13.4], [62.4, 10.4], [60.4, 7.8]], [[44.2, 10.4], [43.2, 12.6], [41.8, 13.8], [40.4, 15.8], [39, 16.4]],
  [[49.6, 87.4], [47.4, 91], [45.6, 94.6]], [[-19.8, -42.6], [-22.4, -44.6], [-24.2, -47.4]], [[40.2, 21.4], [41.8, 20.4], [43.4, 18.6], [44.6, 16.6]],
  [[39.6, 33], [37.6, 35.4], [38.8, 39.8], [39.4, 42.6]], [[33.6, 36], [32, 35.4]], [[-14, 48.6], [-18.6, 47.2], [-22.6, 46.4]],
  [[34.6, 103], [32, 102.6], [28.6, 101.4], [25.6, 101.2]], [[37.4, 138.4], [36, 137.6], [35.2, 136.2]],
];
function hillsOf(at, ok, step) {
  const out = [];
  for (const r of RANGES) {
    const pts = r.map(([la, lo]) => (ok([la, lo]) ? at([la, lo]) : null));
    let carry = 0, n = 0;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i];
      if (!a || !b) { carry = 0; continue; }
      const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const nx = -(b[1] - a[1]) / (d || 1), ny = (b[0] - a[0]) / (d || 1);
      for (let t = carry; t < d; t += step) {
        const f = t / d, i = n++, s = .72 + ((i * 7) % 6) * .1, off = ((i % 3) - 1) * step * .32;
        out.push([round(a[0] + (b[0] - a[0]) * f + nx * off), round(a[1] + (b[1] - a[1]) * f + ny * off), round(s, 100)]);
      }
      carry = (carry - d) % step; if (carry < 0) carry += step;
    }
  }
  return out;
}

/* album page → [ISO 3166 numeric of its shape (or null: a pin on another's shape), pin lat, lon] */
const PLACES = {
  BRA: ['076', -12, -50], ARG: ['032', -35, -64], POR: ['620', 39.6, -8.1], FRA: ['250', 46.6, 2.4], NED: ['528', 52.2, 5.6],
  GER: ['276', 51, 10.3], BUL: ['100', 42.7, 25.3], ITA: ['380', 42.6, 12.6], ENG: ['826', 52.4, -1.6], SCO: [null, 56.9, -4.3],
  IRL: ['372', 53.2, -7.9], ESP: ['724', 40, -3.7], POL: ['616', 52.1, 19.3], RUS: ['643', 56, 40], HUN: ['348', 47.1, 19.4],
  CZE: ['203', 49.8, 15.4], AUT: ['040', 47.5, 14.4], CHE: ['756', 46.8, 8.2], DEN: ['208', 56, 9.3], NOR: ['578', 61.5, 9.5],
  SWE: ['752', 62, 15.5], SRB: ['688', 44, 20.9], MKD: ['807', 41.6, 21.7], GRC: ['300', 39.4, 22], TUR: ['792', 39, 34.5],
  IRN: ['364', 32.6, 54], IRQ: ['368', 33.2, 43.6], ISR: ['376', 31.4, 34.9], SYR: ['760', 35, 38.5], JOR: ['400', 30.6, 36.3],
  EGY: ['818', 26.6, 30.2], TUN: ['788', 34, 9.5], MAR: ['504', 31.8, -6.4], MLI: ['466', 17, -3.5], ETH: ['231', 9, 39.6],
  AGO: ['024', -12.3, 17.6], ZAF: ['710', -29, 24.7], IND: ['356', 22.5, 79], NPL: ['524', 28.3, 84], CHN: ['156', 34, 104],
  MNG: ['496', 46.8, 103], JPN: ['392', 36.5, 138.5], VNM: ['704', 16.2, 107.6], UZB: ['860', 41.4, 64.6], KHM: ['116', 12.6, 104.9],
  USA: ['840', 39, -98], MEX: ['484', 23.6, -102.5], CUB: ['192', 21.8, -79], HAI: ['332', 19, -72.4], VEN: ['862', 7.2, -66.2],
  COL: ['170', 4.2, -73.4], PER: ['604', -9.6, -75], CHI: ['152', -32, -71], URU: ['858', -32.8, -56], PAR: ['600', -23.3, -58.3],
  BEL: ['056', 50.6, 4.6], CRO: ['191', 45.4, 15.6], UKR: ['804', 49, 31.4], VAT: [null, 41.9, 12.45],
};
/* which chart a page belongs to (the same split as js/mapa.js's AMAP_PLACE_CONT) */
const CHART_OF = {
  EU: 'POR ESP FRA NED BEL GER ENG SCO IRL ITA VAT CHE AUT CZE POL HUN DEN NOR SWE SRB CRO MKD GRC BUL UKR RUS TUR',
  AS: 'IND NPL CHN MNG JPN VNM UZB KHM', AF: 'EGY TUN MAR MLI ETH AGO ZAF ISR SYR JOR IRQ IRN',
  AM: 'USA MEX CUB HAI VEN COL PER CHI URU PAR ARG BRA',
};
const chartOf = {};
for (const [k, s] of Object.entries(CHART_OF)) s.split(' ').forEach(c => { chartOf[c] = k; });

/* the countries' names, as a Brazilian atlas prints them (Natural Earth's English → Portuguese) */
const NAMES_PT = {
  'Fiji': 'Fiji', 'Tanzania': 'Tanzânia', 'W. Sahara': 'Saara Ocidental', 'Canada': 'Canadá', 'United States of America': 'Estados Unidos',
  'Kazakhstan': 'Cazaquistão', 'Uzbekistan': 'Uzbequistão', 'Papua New Guinea': 'Papua-Nova Guiné', 'Indonesia': 'Indonésia', 'Argentina': 'Argentina',
  'Chile': 'Chile', 'Dem. Rep. Congo': 'Congo', 'Somalia': 'Somália', 'Kenya': 'Quênia', 'Sudan': 'Sudão', 'Chad': 'Chade', 'Haiti': 'Haiti',
  'Dominican Rep.': 'Rep. Dominicana', 'Russia': 'Rússia', 'Bahamas': 'Bahamas', 'Falkland Is.': 'Malvinas', 'Norway': 'Noruega', 'Greenland': 'Groenlândia',
  'Fr. S. Antarctic Lands': '', 'Timor-Leste': 'Timor', 'South Africa': 'África do Sul', 'Lesotho': 'Lesoto', 'Mexico': 'México', 'Uruguay': 'Uruguai',
  'Brazil': 'Brasil', 'Bolivia': 'Bolívia', 'Peru': 'Peru', 'Colombia': 'Colômbia', 'Panama': 'Panamá', 'Costa Rica': 'Costa Rica', 'Nicaragua': 'Nicarágua',
  'Honduras': 'Honduras', 'El Salvador': 'El Salvador', 'Guatemala': 'Guatemala', 'Belize': 'Belize', 'Venezuela': 'Venezuela', 'Guyana': 'Guiana',
  'Suriname': 'Suriname', 'France': 'França', 'Ecuador': 'Equador', 'Puerto Rico': 'Porto Rico', 'Jamaica': 'Jamaica', 'Cuba': 'Cuba',
  'Zimbabwe': 'Zimbábue', 'Botswana': 'Botsuana', 'Namibia': 'Namíbia', 'Senegal': 'Senegal', 'Mali': 'Mali', 'Mauritania': 'Mauritânia', 'Benin': 'Benin',
  'Niger': 'Níger', 'Nigeria': 'Nigéria', 'Cameroon': 'Camarões', 'Togo': 'Togo', 'Ghana': 'Gana', "Côte d'Ivoire": 'Costa do Marfim', 'Guinea': 'Guiné',
  'Guinea-Bissau': 'Guiné-Bissau', 'Liberia': 'Libéria', 'Sierra Leone': 'Serra Leoa', 'Burkina Faso': 'Burkina Faso', 'Central African Rep.': 'Rep. Centro-Africana',
  'Congo': 'Congo', 'Gabon': 'Gabão', 'Eq. Guinea': 'Guiné Equatorial', 'Zambia': 'Zâmbia', 'Malawi': 'Malawi', 'Mozambique': 'Moçambique', 'eSwatini': 'Essuatíni',
  'Angola': 'Angola', 'Burundi': 'Burundi', 'Israel': 'Israel', 'Lebanon': 'Líbano', 'Madagascar': 'Madagascar', 'Palestine': 'Palestina', 'Gambia': 'Gâmbia',
  'Tunisia': 'Tunísia', 'Algeria': 'Argélia', 'Jordan': 'Jordânia', 'United Arab Emirates': 'Emirados Árabes', 'Qatar': 'Catar', 'Kuwait': 'Kuwait',
  'Iraq': 'Iraque', 'Oman': 'Omã', 'Vanuatu': 'Vanuatu', 'Cambodia': 'Camboja', 'Thailand': 'Tailândia', 'Laos': 'Laos', 'Myanmar': 'Mianmar',
  'Vietnam': 'Vietnã', 'North Korea': 'Coreia do Norte', 'South Korea': 'Coreia do Sul', 'Mongolia': 'Mongólia', 'India': 'Índia', 'Bangladesh': 'Bangladesh',
  'Bhutan': 'Butão', 'Nepal': 'Nepal', 'Pakistan': 'Paquistão', 'Afghanistan': 'Afeganistão', 'Tajikistan': 'Tajiquistão', 'Kyrgyzstan': 'Quirguistão',
  'Turkmenistan': 'Turcomenistão', 'Iran': 'Irã', 'Syria': 'Síria', 'Armenia': 'Armênia', 'Sweden': 'Suécia', 'Belarus': 'Bielorrússia', 'Ukraine': 'Ucrânia',
  'Poland': 'Polônia', 'Austria': 'Áustria', 'Hungary': 'Hungria', 'Moldova': 'Moldávia', 'Romania': 'Romênia', 'Lithuania': 'Lituânia', 'Latvia': 'Letônia',
  'Estonia': 'Estônia', 'Germany': 'Alemanha', 'Bulgaria': 'Bulgária', 'Greece': 'Grécia', 'Turkey': 'Turquia', 'Albania': 'Albânia', 'Croatia': 'Croácia',
  'Switzerland': 'Suíça', 'Luxembourg': 'Luxemburgo', 'Belgium': 'Bélgica', 'Netherlands': 'Holanda', 'Portugal': 'Portugal', 'Spain': 'Espanha',
  'Ireland': 'Irlanda', 'New Caledonia': 'Nova Caledônia', 'Solomon Is.': 'Ilhas Salomão', 'New Zealand': 'Nova Zelândia', 'Australia': 'Austrália',
  'Sri Lanka': 'Ceilão', 'China': 'China', 'Taiwan': 'Formosa', 'Italy': 'Itália', 'Denmark': 'Dinamarca', 'United Kingdom': 'Grã-Bretanha', 'Iceland': 'Islândia',
  'Azerbaijan': 'Azerbaijão', 'Georgia': 'Geórgia', 'Philippines': 'Filipinas', 'Malaysia': 'Malásia', 'Brunei': 'Brunei', 'Slovenia': 'Eslovênia',
  'Finland': 'Finlândia', 'Slovakia': 'Eslováquia', 'Czechia': 'Tchéquia', 'Eritrea': 'Eritreia', 'Japan': 'Japão', 'Paraguay': 'Paraguai', 'Yemen': 'Iêmen',
  'Saudi Arabia': 'Arábia', 'Antarctica': '', 'N. Cyprus': '', 'Cyprus': 'Chipre', 'Morocco': 'Marrocos', 'Egypt': 'Egito', 'Libya': 'Líbia',
  'Ethiopia': 'Etiópia', 'Djibouti': 'Djibuti', 'Somaliland': '', 'Uganda': 'Uganda', 'Rwanda': 'Ruanda', 'Bosnia and Herz.': 'Bósnia', 'Macedonia': 'Macedônia',
  'Serbia': 'Sérvia', 'Montenegro': 'Montenegro', 'Kosovo': 'Kosovo', 'Trinidad and Tobago': 'Trinidad', 'S. Sudan': 'Sudão do Sul',
};
/* a country's own point for its name: the spot of its largest landmass farthest from any of its coasts or borders */
function labelPoint(ring) {
  const xs = ring.map(p => p[0]), ys = ring.map(p => p[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const inside = (x, y) => { let c = false; for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
  const dist = (x, y) => { let m = Infinity; for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [ax, ay] = ring[j], [bx, by] = ring[i], dx = bx - ax, dy = by - ay, l = dx * dx + dy * dy;
    const t = l ? Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / l)) : 0;
    m = Math.min(m, Math.hypot(x - ax - t * dx, y - ay - t * dy)); } return m; };
  let best = [(x0 + x1) / 2, (y0 + y1) / 2], bd = -1;
  for (let i = 0; i <= 24; i++) for (let j = 0; j <= 24; j++) {
    const x = x0 + (x1 - x0) * i / 24, y = y0 + (y1 - y0) * j / 24;
    if (!inside(x, y)) continue;
    const d = dist(x, y); if (d > bd) { bd = d; best = [x, y]; }
  }
  return best;
}

const byId = {};
T.objects.countries.geometries.forEach(g => { byId[g.id] = g; });
const feat = iso => topo.feature(T, byId[iso]);
const landF = topo.feature(T, T.objects.land);
const bordersM = topo.mesh(T, T.objects.countries, (a, b) => a !== b);
/* the small-scale maps (a hemisphere is ~1 px a degree on a phone) need far fewer points than "Onde foi?" zoomed in */
const PS = simp.presimplify(JSON.parse(JSON.stringify(T)));
const lite = keep => {
  const t = simp.simplify(PS, simp.quantile(PS, 1 - keep));
  const by = {}; t.objects.countries.geometries.forEach(g => { by[g.id] = g; });
  return { land: topo.feature(t, t.objects.land), borders: topo.mesh(t, t.objects.countries, (a, b) => a !== b), feat: iso => topo.feature(t, by[iso]) };
};
const LITE_H = lite(.42), LITE_C = lite(.6);

/* ── the watercolours: neighbours never share one ── */
const INKS = 7;
const geoms = T.objects.countries.geometries, nb = topo.neighbors(geoms);
const idx = {}; geoms.forEach((g, i) => { idx[g.id] = i; });
const ink = {};
const order = Object.keys(PLACES).filter(c => PLACES[c][0]).sort((a, b) => nb[idx[PLACES[b][0]]].length - nb[idx[PLACES[a][0]]].length);
const inkOfIso = {};
for (const c of order) {
  const i = idx[PLACES[c][0]], used = new Set(nb[i].map(j => inkOfIso[geoms[j].id]).filter(v => v != null));
  // the first ink no neighbour wears, starting from a different one for each so the map is not striped in one colour
  let k = (c.charCodeAt(0) + c.charCodeAt(2)) % INKS;
  for (let t = 0; t < INKS && used.has(k); t++) k = (k + 1) % INKS;
  inkOfIso[PLACES[c][0]] = k; ink[c] = k;
}
for (const c of Object.keys(PLACES)) if (ink[c] == null) ink[c] = (c.charCodeAt(1) * 3) % INKS;

/* ── 1. the whole world, equirectangular ── */
const proj = d3.geoEquirectangular().rotate([-10, 0]).scale(W / (2 * Math.PI)).translate([W / 2, 78]);
const path = d3.geoPath(proj.postclip(d3.geoClipRectangle(0, 0, W, H))).digits(1);
const shapes = {}, pins = {}, bbox = {};
for (const [k, [iso, la, lo]] of Object.entries(PLACES)) {
  if (iso) {
    if (!byId[iso]) throw new Error('no shape ' + k + ' ' + iso);
    shapes[k] = path(feat(iso));
    /* the country's own extent (its largest part decides, so France is not widened to Guiana) */
    const f = feat(iso), polys = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates];
    const big = polys.map(c => ({ type: 'Polygon', coordinates: c })).sort((a, b) => d3.geoArea(b) - d3.geoArea(a))[0];
    bbox[k] = path.bounds(big).flat().map(v => round(v));
  }
  pins[k] = proj([lo, la]).map(v => round(v));
  if (!bbox[k]) bbox[k] = [pins[k][0] - 1.5, pins[k][1] - 1.5, pins[k][0] + 1.5, pins[k][1] + 1.5];
}
const land = path(landF);
/* every country's name, where to letter it on the equirectangular world, and its area (steradians) */
const names = [], area = {};
for (const g of T.objects.countries.geometries) {
  const nm = NAMES_PT[g.properties.name];
  if (nm === undefined) throw new Error('no Portuguese name for ' + g.properties.name);
  const f = topo.feature(T, g), polys = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates];
  const big = polys.map(c => ({ type: 'Polygon', coordinates: c })).sort((a, b) => d3.geoArea(b) - d3.geoArea(a))[0];
  const ring = big.coordinates[0].map(q => proj(q)).filter(Boolean);
  if (nm && ring.length > 3) { const [x, y] = labelPoint(ring); if (y > 0 && y < H) names.push([nm, round(x), round(y), round(d3.geoArea(big) * 1e4)]); }
}
for (const [k, [iso]] of Object.entries(PLACES)) if (iso) area[k] = round(d3.geoArea(feat(iso)), 1e4);
const worldHills = hillsOf(([la, lo]) => proj([lo, la]), () => true, 1.6);
const WORLD_SEAS = [['Mar Oceano', 36, -32], ['Mar Oceano', -6, -22], ['Mar do Norte', 56.5, 3.4], ['Mar Báltico', 57.6, 19.4], ['Mar Mediterrâneo', 35.2, 18.5],
  ['Mar Negro', 43.1, 34.4], ['Mar Cáspio', 42.2, 50.6], ['Mar Vermelho', 20, 38.4], ['Golfo Pérsico', 27, 51.6], ['Mar da Arábia', 15, 63],
  ['Golfo de Bengala', 15, 88.5], ['Mar da China', 14, 114], ['Mar do Japão', 40.5, 134.5], ['Mar do Sul', 0, -100], ['Mar do Sul', -24, -84],
  ['Mar das Antilhas', 15, -75], ['Golfo do México', 25, -90.5], ['Mar das Índias', -14, 76], ['Mar da Etiópia', -22, 4], ['Mar do Norte', 50, -40]]
  .map(([t, la, lo]) => [t, ...proj([lo, la]).map(v => round(v))]);
const borders = path(bordersM);
const V = { WORLD: [-170, 78, 190, -56], EU: [-13, 71.5, 45, 34], AS: [56, 55, 147, 5], AF: [-21, 41, 63, -36], AM: [-128, 56, -32, -56] };
const views = Object.fromEntries(Object.entries(V).map(([k, [w, n, e, s]]) => {
  const [x0, y0] = proj([w, n]), [x1, y1] = proj([e, s]);
  return [k, [x0, y0, x1 - x0, y1 - y0].map(v => round(v))];
}));
views.WORLD = [0, 0, W, H];

/* ── 2. the two hemispheres ── */
const R = 100;
const lines = (p, lat) => { const pts = []; for (let lo = -180; lo <= 180; lo += 6) pts.push([lo, lat]); return { type: 'LineString', coordinates: pts }; };
function hemisphere(lon0) {
  const p = d3p.geoNicolosi().rotate([-lon0, 0]).scale(R / (Math.PI / 2)).translate([0, 0]).clipAngle(90).precision(0.2);
  const g = d3.geoPath(p).digits(1);
  const out = { lon0, land: g(LITE_H.land), borders: g(LITE_H.borders), shapes: {}, pins: {} };
  for (const [k, [iso, la, lo]] of Object.entries(PLACES)) {
    if (iso) { const d = g(LITE_H.feat(iso)); if (d) out.shapes[k] = d; }
    const dl = ((lo - lon0 + 540) % 360) - 180;
    if (Math.abs(dl) < 90) out.pins[k] = p([lo, la]).map(v => round(v));
  }
  /* the graticule and the circles need no fine resampling: they are smooth curves at this scale */
  const gl = d3.geoPath(d3p.geoNicolosi().rotate([-lon0, 0]).scale(R / (Math.PI / 2)).translate([0, 0]).clipAngle(90).precision(2)).digits(1);
  out.grat = gl(d3.geoGraticule().step([15, 15]).precision(6).extentMinor([[-180, -80], [180, 80]])());
  const L = lat => gl(lines(p, lat));
  out.lines = { eq: L(0), tropN: L(23.44), tropS: L(-23.44), polN: L(66.56), polS: L(-66.56) };
  out.at = ([la, lo]) => p([lo, la]);
  out.hills = hillsOf(out.at, ([la, lo]) => Math.cos(la * Math.PI / 180) * Math.cos(((lo - lon0 + 540) % 360 - 180) * Math.PI / 180) > .12, 7.5);
  return out;
}
const hemi = { r: R, W: hemisphere(-110), E: hemisphere(70) };

/* ── 3. the charts of the parts of the world ── */
const CH = {
  EU: { proj: () => d3.geoConicConformal().rotate([-16, 0]).parallels([40, 62]), core: [-11, 71.5, 44, 34.5] },
  AS: { proj: () => d3.geoConicConformal().rotate([-102, 0]).parallels([15, 45]), core: [58, 54, 146, 6] },
  AF: { proj: () => d3.geoAzimuthalEqualArea().rotate([-21, -3]), core: [-19, 40, 62, -36] },
  AM: { proj: () => d3.geoAzimuthalEqualArea().rotate([82, -2]), core: [-126, 55, -34, -56] },
};
const NOMINAL = 400;   // the core's width in chart units (a unit is about a pixel on a phone)
const ASPECTS = [.6, 1.9];   // the narrowest and the widest room a chart is fitted to
function chart(k) {
  const spec = CH[k], [w, n, e, s] = spec.core;
  const p = spec.proj();
  /* the core's outline, sampled, decides the scale */
  const ring = [];
  for (let i = 0; i <= 20; i++) { ring.push([w + (e - w) * i / 20, n]); ring.push([w + (e - w) * i / 20, s]); ring.push([w, n + (s - n) * i / 20]); ring.push([e, n + (s - n) * i / 20]); }
  p.fitWidth(NOMINAL, { type: 'MultiPoint', coordinates: ring });
  const pts = ring.map(c => p(c));
  const xs = pts.map(q => q[0]), ys = pts.map(q => q[1]);
  const core = [Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)];
  /* the data reaches well past the core on every side */
  const cx = core[0] + core[2] / 2, cy = core[1] + core[3] / 2;
  const ew = Math.max(core[2], core[3] * ASPECTS[1]) * 1.1, eh = Math.max(core[3], core[2] / ASPECTS[0]) * 1.1;
  const ext = [cx - ew / 2, cy - eh / 2, ew, eh];
  const clip = d3.geoClipRectangle(ext[0], ext[1], ext[0] + ext[2], ext[1] + ext[3]);
  const pc = spec.proj().scale(p.scale()).translate(p.translate()).postclip(clip).precision(0.3);
  const g = d3.geoPath(pc).digits(0);
  const o = { core: core.map(v => round(v)), ext: ext.map(v => round(v)), land: g(LITE_C.land), borders: g(LITE_C.borders), shapes: {}, pins: {} };
  for (const [c, [iso, la, lo]] of Object.entries(PLACES)) {
    if (iso) { const d = g(LITE_C.feat(iso)); if (d) o.shapes[c] = d; }
    const q = pc([lo, la]);
    if (chartOf[c] === k && q) o.pins[c] = q.map(v => round(v));
  }
  const gl = d3.geoPath(spec.proj().scale(p.scale()).translate(p.translate()).postclip(clip).precision(2)).digits(0);
  o.grat = gl(d3.geoGraticule().step([10, 10]).precision(6).extentMinor([[-180, -80], [180, 84]])());
  o.lines = { eq: gl(lines(pc, 0)), tropN: gl(lines(pc, 23.44)), tropS: gl(lines(pc, -23.44)), polN: gl(lines(pc, 66.56)) };
  o.at = ([la, lo]) => pc([lo, la]);
  o.hills = hillsOf(o.at, ([la, lo]) => { const q = pc([lo, la]); return q && q[0] > ext[0] && q[0] < ext[0] + ext[2] && q[1] > ext[1] && q[1] < ext[1] + ext[3]; }, 10.5);
  /* the scale: how many chart units a degree of latitude is, in the middle */
  const mid = [(w + e) / 2, (n + s) / 2], a = pc([mid[0], mid[1] - 0.5]), b = pc([mid[0], mid[1] + 0.5]);
  o.deg = round(Math.hypot(a[0] - b[0], a[1] - b[1]), 100);
  return o;
}
const charts = Object.fromEntries(Object.keys(CH).map(k => [k, chart(k)]));

/* ── the lettering: seas, oceans and the parts of the world, in the names the Portuguese charts gave them ──
   [text, lat, lon, size (px on a phone), kind: 'sea' | 'land' | 'big'] — 'big' is a part of the world, spaced out */
const LABELS = {
  W: [['AMÉRICA', 42, -104, 11, 'big'], ['SETENTRIONAL', 34, -100, 7, 'land'], ['AMÉRICA', -8, -62, 11, 'big'], ['MERIDIONAL', -16, -60, 7, 'land'],
      ['Mar do Sul', -15, -128, 9, 'sea'], ['Mar Oceano', 28, -48, 9, 'sea']],
  E: [['EUROPA', 52, 24, 9, 'big'], ['ÁFRICA', 8, 20, 11, 'big'], ['ÁSIA', 48, 92, 12, 'big'], ['Mar das Índias', -27, 82, 9, 'sea'],
      ['Mar Oceano', -12, -8, 8, 'sea'], ['Mar da China', 13, 113, 7, 'sea'], ['TERRA AUSTRAL', -76, 70, 7, 'land'], ['NOVA HOLANDA', -26, 133, 6, 'land']],
  EU: [['EUROPA', 53, 26, 15, 'big'], ['Mar Oceano', 46, -18, 11, 'sea'], ['Mar do Norte', 56.5, 3.2, 8, 'sea'], ['Mar Báltico', 58, 19.6, 7, 'sea'],
       ['Mar Mediterrâneo', 35.6, 18, 9, 'sea'], ['Mar Negro', 43.2, 34.6, 7, 'sea'], ['ÁFRICA', 30, 6, 10, 'big'], ['Mar Cáspio', 42.5, 50.5, 6, 'sea']],
  AS: [['ÁSIA', 62, 96, 17, 'big'], ['TARTÁRIA', 47, 84, 8, 'land'], ['Mar da China', 15, 116, 9, 'sea'], ['Mar das Índias', 2, 78, 10, 'sea'], ['Golfo de Bengala', 15, 88, 7, 'sea'],
       ['Mar do Sul', 26, 150, 9, 'sea'], ['Mar da Arábia', 15, 64, 8, 'sea'], ['Mar do Japão', 41, 134, 6, 'sea']],
  AF: [['ÁFRICA', 6, 21, 17, 'big'], ['Mar Oceano', 2, -18, 11, 'sea'], ['Mar Oceano', 20, -30, 10, 'sea'], ['Mar das Índias', -18, 64, 11, 'sea'], ['Mar das Índias', -8, 58, 10, 'sea'], ['Mar Mediterrâneo', 34.3, 18, 8, 'sea'],
       ['Mar Vermelho', 20, 38.6, 6, 'sea'], ['ARÁBIA', 23, 46, 9, 'land'], ['Golfo Pérsico', 27, 51.5, 5.5, 'sea'], ['Mar da Etiópia', -24, 1, 8, 'sea']],
  AM: [['AMÉRICA', 44, -100, 16, 'big'], ['AMÉRICA', -10, -62, 16, 'big'], ['Mar do Sul', -9, -110, 12, 'sea'], ['Mar Oceano', 26, -50, 12, 'sea'],
       ['Mar das Antilhas', 14.6, -76, 7, 'sea'], ['Golfo do México', 24.6, -91, 7, 'sea'], ['Mar do Norte', 52, -42, 9, 'sea'], ['Mar Oceano', -32, -36, 10, 'sea']],
};
/* where a compass rose, a ship or a monster may sit (all at sea) — [piece, lat, lon, size as a fraction of the map's width] */
const DECO = {
  W: [['rosa', 8, -140, .2], ['serpente', -38, -120, .32], ['caravela', 14, -38, .2], ['baleia', 50, -160, .2]],
  E: [['caravela', -34, -4, .2], ['baleia', -43, 64, .24], ['rosa', -46, 120, .17], ['serpente', -9, 84, .16]],
  EU: [['rosa', 44, -23, .2], ['caravela', 38, -15, .16], ['serpente', 66, -12, .26], ['baleia', 72, 22, .2], ['rosa', 61.5, -21, .17], ['caravela', 55.5, -24, .14],
       ['rosa', 34, -16, .16], ['baleia', 76, 30, .17], ['serpente', 63, -14, .18], ['caravela', 33.5, 19, .12]],
  AS: [['rosa', -2, 128, .18], ['caravela', 6, 92, .14], ['baleia', 28, 152, .17], ['serpente', 50, 152, .2], ['baleia', -26, 92, .18], ['serpente', -20, 72, .2]],
  AF: [['rosa', -6, -28, .16], ['caravela', -30, 8, .14], ['baleia', -34, 52, .2], ['serpente', 30, -34, .18]],
  AM: [['rosa', -24, -118, .18], ['caravela', 18, -48, .14], ['serpente', 34, -140, .22], ['baleia', -44, -24, .18]],
};
const CART = {
  EU: [[73, -6], [72, 34], [41, -26], [30, -24]],
  AS: [[-30, 90], [-12, 76], [-34, 110], [24, 146], [44, 158], [-6, 66]],
  AF: [[-34, -2], [-38, 30], [-30, 52], [-42, 10], [8, -24], [-10, 62]],
  AM: [[-46, -96], [-52, -46], [-38, -36], [-20, -104], [28, -56], [-6, -102]],
};
function letter(o, list, key) {
  o.labels = (list || []).map(([t, la, lo, size, kind]) => {
    const q = o.at([la, lo]); if (!q) return null;
    const a = o.at([la, lo - 1]), b = o.at([la, lo + 1]);
    const rot = a && b ? Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI : 0;
    return [t, round(q[0]), round(q[1]), size, kind, round(rot)];
  }).filter(Boolean);
  o.deco = (DECO[key] || []).map(([pc, la, lo, f]) => { const q = o.at([la, lo]); return q ? [pc, round(q[0]), round(q[1]), f] : null; }).filter(Boolean);
  if (CART[key]) o.cart = CART[key].map(([la, lo]) => o.at([la, lo])).filter(Boolean).map(q => q.map(v => round(v)));
  delete o.at;
}
letter(hemi.W, LABELS.W, 'W'); letter(hemi.E, LABELS.E, 'E');
for (const k of Object.keys(charts)) letter(charts[k], LABELS[k], k);

/* where a tap on the world (between the pins' countries) should take you: the pins of each part of the world, by hemisphere */
for (const h of ['W', 'E']) {
  hemi[h].anchors = {};
  for (const [c, q] of Object.entries(hemi[h].pins)) { const k = chartOf[c]; (hemi[h].anchors[k] = hemi[h].anchors[k] || []).push(q); }
  for (const k of Object.keys(hemi[h].anchors)) { const a = hemi[h].anchors[k]; hemi[h].anchors[k] = [round(a.reduce((s, q) => s + q[0], 0) / a.length), round(a.reduce((s, q) => s + q[1], 0) / a.length)]; }
}

fs.writeFileSync(out, JSON.stringify({ W, H, land, borders, shapes, pins, views, bbox, ink, area, names, hills: worldHills, labels: WORLD_SEAS, hemi, charts }));
const size = fs.statSync(out).size, part = o => (JSON.stringify(o).length / 1024).toFixed(0) + ' KB';
console.log('album map', (size / 1024).toFixed(0), 'KB;', Object.keys(shapes).length, 'shapes,', Object.keys(pins).length, 'pins; world', part({ land, borders, shapes }),
  '· hemispheres', part(hemi), '· charts', Object.entries(charts).map(([k, c]) => k + ' ' + part(c)).join(', '));
