// The album's world map (tools/history/album_map.json):
//   node tools/history/albmapgen.mjs <dir with world-atlas, topojson-client, d3-geo installed> tools/history/album_map.json
// Natural Earth 1:110m (public domain), equirectangular, 78°N to 56°S, centred on 10°E, one unit a degree (360 × 134).
// `shapes` are the countries the album has a page for, `pins` where each page's pin stands (a capital or the heart
// of the country, chosen by hand: a centroid puts France in the Atlantic and the United States in Canada), `views`
// the world and the four continents as viewBoxes.
import { createRequire } from 'module';
import fs from 'fs';
const [nm, out] = process.argv.slice(2);
const require = createRequire(nm + '/package.json');
const topo = require('topojson-client');
const d3 = await import(nm + '/node_modules/d3-geo/src/index.js');
const T = JSON.parse(fs.readFileSync(nm + '/node_modules/world-atlas/countries-110m.json', 'utf8'));
const W = 360, H = 134;
const proj = d3.geoEquirectangular().rotate([-10, 0]).scale(W / (2 * Math.PI)).translate([W / 2, 78]);
const path = d3.geoPath(proj.postclip(d3.geoClipRectangle(0, 0, W, H))).digits(1);

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
  BEL: ['056', 50.6, 4.6], CRO: ['191', 45.4, 15.6], UKR: ['804', 49, 31.4],
};
const byId = {};
T.objects.countries.geometries.forEach(g => { byId[g.id] = g; });
const shapes = {}, pins = {};
for (const [k, [iso, la, lo]] of Object.entries(PLACES)) {
  if (iso) {
    if (!byId[iso]) throw new Error('no shape ' + k + ' ' + iso);
    shapes[k] = path(topo.feature(T, byId[iso]));
  }
  pins[k] = proj([lo, la]).map(v => +v.toFixed(1));
}
const land = path(topo.feature(T, T.objects.land || { type: 'GeometryCollection', geometries: T.objects.countries.geometries }));
const borders = path(topo.mesh(T, T.objects.countries, (a, b) => a !== b));
const V = { WORLD: [-170, 78, 190, -56], EU: [-13, 71.5, 45, 34], AS: [56, 55, 147, 5], AF: [-21, 41, 63, -36], AM: [-128, 56, -32, -56] };
const views = Object.fromEntries(Object.entries(V).map(([k, [w, n, e, s]]) => {
  const [x0, y0] = proj([w, n]), [x1, y1] = proj([e, s]);
  return [k, [x0, y0, x1 - x0, y1 - y0].map(v => +v.toFixed(1))];
}));
views.WORLD = [0, 0, W, H];   // the whole width: its two edges are the same meridian
fs.writeFileSync(out, JSON.stringify({ W, H, land, borders, shapes, pins, views }));
const size = fs.statSync(out).size;
console.log('album map', size, 'bytes;', Object.keys(shapes).length, 'shapes,', Object.keys(pins).length, 'pins');
