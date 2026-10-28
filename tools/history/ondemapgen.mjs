// The "Onde foi?" map (tools/history/onde_map.json):
//   node tools/history/ondemapgen.mjs <dir with world-atlas, topojson-client, d3-geo installed> tools/history/onde_map.json
// Natural Earth 1:110m (public domain): the world in two hemispheres split on the meridian of 20°W, as the album's
// mapa-múndi prints it, but in the azimuthal equidistant projection, which has an exact inverse — a tap on the map is a
// latitude and a longitude (js/onde.js projects and unprojects with the same formulas). Each hemisphere is a disc of
// radius 100 around 0,0, y down. Drawn at full detail, since the player zooms in up to ×10: the land, the borders, the
// graticule, the equator, tropics and polar circles, the mountain ranges as rows of little hills, the seas and the parts
// of the world lettered, every country's name with its area on the map (the game letters it once the zoom gives it room),
// and where the compass roses, ships and monsters sit.
import { createRequire } from 'module';
import fs from 'fs';
import { round, hillsOf, NAMES_PT, labelPoint, LABELS, DECO } from './atlas_common.mjs';
const [nm, out] = process.argv.slice(2);
const require = createRequire(nm + '/package.json');
const topo = require('topojson-client');
const d3 = await import(nm + '/node_modules/d3-geo/src/index.js');
const T = JSON.parse(fs.readFileSync(nm + '/node_modules/world-atlas/countries-110m.json', 'utf8'));
const landF = topo.feature(T, T.objects.land);
const bordersM = topo.mesh(T, T.objects.countries, (a, b) => a !== b);
const R = 100, RAD = Math.PI / 180;

/* the seas lettered on top of the parts of the world (LABELS): [text, lat, lon, tier] — tier 1 always, 2 from a closer look */
const SEAS = {
  W: [['Mar do Norte', 52, -40, 2], ['Mar das Antilhas', 14.6, -75, 2],
      ['Golfo do México', 24.8, -90.5, 2], ['Mar do Sul', 20, -150, 2]],
  E: [['Mar Mediterrâneo', 35, 18, 2], ['Mar do Norte', 56.5, 3.4, 2], ['Mar Báltico', 57.8, 19.4, 2], ['Mar Negro', 43.2, 34.4, 2],
      ['Mar Cáspio', 42, 50.6, 2], ['Mar Vermelho', 20, 38.4, 2], ['Golfo Pérsico', 27, 51.6, 2], ['Mar da Arábia', 15, 63, 2],
      ['Golfo de Bengala', 15, 88.5, 2], ['Mar do Japão', 40.5, 134.5, 2], ['Mar da Etiópia', -22, 2, 1], ['Mar Oceano', 22, -15, 2]],
};

function hemisphere(key, lon0) {
  const p = d3.geoAzimuthalEquidistant().rotate([-lon0, 0]).scale(R / (Math.PI / 2)).translate([0, 0]).clipAngle(90).precision(0.1);
  const g = d3.geoPath(p).digits(1);
  const gl = d3.geoPath(d3.geoAzimuthalEquidistant().rotate([-lon0, 0]).scale(R / (Math.PI / 2)).translate([0, 0]).clipAngle(90).precision(1)).digits(1);
  const near = ([la, lo]) => Math.cos(la * RAD) * Math.cos((((lo - lon0 + 540) % 360) - 180) * RAD);
  const at = ([la, lo]) => (near([la, lo]) > 0 ? p([lo, la]) : null);
  const line = lat => { const c = []; for (let lo = -180; lo <= 180; lo += 2) c.push([lo, lat]); return gl({ type: 'LineString', coordinates: c }); };
  const o = {
    lon0, land: g(landF), borders: g(bordersM),
    grat: gl(d3.geoGraticule().step([15, 15]).precision(2).extentMinor([[-180, -80.01], [180, 80.01]])()),
    lines: { eq: line(0), tropN: line(23.44), tropS: line(-23.44), polN: line(66.56), polS: line(-66.56) },
    hills: hillsOf(at, q => near(q) > .1, 4.2),
  };
  /* the parts of the world and the seas, each turned along its parallel */
  const turn = (la, lo) => { const a = at([la, lo - 1]), b = at([la, lo + 1]); return a && b ? round(Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI) : 0; };
  o.labels = LABELS[key].map(([t, la, lo, size, kind]) => { const q = at([la, lo]); return q && [t, round(q[0]), round(q[1]), kind, turn(la, lo), 0, size]; })
    .concat(SEAS[key].map(([t, la, lo, tier]) => { const q = at([la, lo]); return q && [t, round(q[0]), round(q[1]), 'sea', turn(la, lo), tier, 9]; }))
    .filter(Boolean);
  /* every country lettered at the heart of its largest landmass, with that landmass's area on the map (units²) */
  o.names = [];
  for (const geo of T.objects.countries.geometries) {
    const nm = NAMES_PT[geo.properties.name];
    if (!nm) continue;
    const f = topo.feature(T, geo), polys = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates];
    const big = polys.map(c => ({ type: 'Polygon', coordinates: c })).sort((a, b) => d3.geoArea(b) - d3.geoArea(a))[0];
    const [clo, cla] = d3.geoCentroid(big);
    if (near([cla, clo]) <= 0) continue;
    const ring = big.coordinates[0].map(q => (near([q[1], q[0]]) > 0 ? p(q) : null)).filter(Boolean);
    if (ring.length < 4) continue;
    const [x, y] = labelPoint(ring);
    o.names.push([nm, round(x), round(y), round(g.area(big))]);
  }
  /* the compass rose, the ship and the monsters, each where the album's mapa-múndi has it; a piece on land is reported */
  o.deco = DECO[key].map(([pc, la, lo, f]) => {
    if (d3.geoContains(landF, [lo, la])) console.warn('deco on land:', key, pc, la, lo);
    const q = at([la, lo]); return q ? [pc, round(q[0]), round(q[1]), f] : null;
  }).filter(Boolean);
  return o;
}
const W = hemisphere('W', -110), E = hemisphere('E', 70);
fs.writeFileSync(out, JSON.stringify({ r: R, W, E }));
const kb = o => (JSON.stringify(o).length / 1024).toFixed(0) + ' KB';
console.log('onde map', kb({ W, E }), '· W', kb(W), '(land', kb(W.land), 'borders', kb(W.borders) + ')', '· E', kb(E), '· names', W.names.length + E.names.length);
