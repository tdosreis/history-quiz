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
import { round, RANGES, hillsOf, NAMES_PT, labelPoint, LABELS, DECO } from './atlas_common.mjs';

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
