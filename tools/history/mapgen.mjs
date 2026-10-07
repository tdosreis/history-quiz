// Regenerates REGION_MAP (tools/history/js/art_tail.js): node tools/history/mapgen.mjs <dir with world-atlas, topojson-client, topojson-simplify, d3-geo installed> <out.json> 3
import { createRequire } from 'module';
import fs from 'fs';
const [nm, out, minW] = process.argv.slice(2);
const require = createRequire(nm + '/package.json');
const topo = require('topojson-client'), simp = require('topojson-simplify');
const d3 = await import(nm + '/node_modules/d3-geo/src/index.js');
let land = JSON.parse(fs.readFileSync(nm + '/node_modules/world-atlas/land-110m.json', 'utf8'));
land = simp.presimplify(land);
land = simp.simplify(land, +minW);
land = simp.filter(land, simp.filterWeight(land, +minW * 6));
const geo = topo.feature(land, land.objects.land);
const W = 200, K = W / 360, H = +(134 * K).toFixed(1);   // latitudes 78N..56S
// equirectangular, latitudes 78N..56S, longitudes -170..190 (so Chukotka is not cut)
const proj = d3.geoEquirectangular().rotate([-10, 0]).scale(W / (2 * Math.PI)).translate([W / 2, 78 * K]);
const clip = d3.geoClipRectangle(0, 0, W, H);
const path = d3.geoPath(proj.postclip ? proj.postclip(clip) : proj).digits(1);
const dLand = path(geo);
const P = pts => 'M' + pts.map(([lo, la]) => proj([lo, la]).map(v => +v.toFixed(1)).join(' ')).join('L') + 'Z';
const R = {
  EU: [[-30,36],[-5.6,35.8],[10,38],[11,37.4],[22,34.5],[26,35.4],[26.3,40],[29,41.2],[41.5,41.4],[41.6,43.6],[47.5,42.3],[49,46],[51.5,47],[59,51],[60,55],[60,60],[65,69],[68,77],[68,84],[-10,84],[-10,74],[-26,67.5],[-30,60]],
  AF: [[-30,36],[-5.6,35.8],[10,38],[11,37.4],[22,34.5],[26,33.5],[32.3,31.4],[32.5,30],[33.8,27.8],[39,18],[43.3,12.6],[52,12.5],[62,10],[62,-45],[-30,-45]],
  AS: [[26,35.4],[26.3,40],[29,41.2],[41.5,41.4],[41.6,43.6],[47.5,42.3],[49,46],[51.5,47],[59,51],[60,55],[60,60],[65,69],[68,77],[68,84],[189.6,84],[189.6,5],[141,5],[141,-12],[95,-12],[62,10],[52,12.5],[43.3,12.6],[39,18],[33.8,27.8],[32.5,30],[32.3,31.4],[34.6,32.6],[36.2,36],[26,36]],
  AM: [[-169,84],[-25,84],[-25,-60],[-169,-60]],
};
const V = { EU: [-14, 72, 58, 30], AS: [24, 78, 150, -12], AF: [-26, 40, 62, -38], AM: [-170, 76, -28, -58] };
const views = Object.fromEntries(Object.entries(V).map(([k, [w, n, e, s]]) => { const [x0, y0] = proj([w, n]), [x1, y1] = proj([e, s]);
  return [k, [x0, y0, x1 - x0, y1 - y0].map(v => +v.toFixed(1))]; }));
const regions = Object.fromEntries(Object.entries(R).map(([k, v]) => [k, P(v)]));
fs.writeFileSync(out, JSON.stringify({ W, H, land: dLand, regions, views }));
console.log('land path chars', dLand.length, 'points ~', (dLand.match(/[ML]/g) || []).length);
