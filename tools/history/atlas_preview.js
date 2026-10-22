// Renders the atlas's engraved pieces (tools/history/js/atlas_art/*.js) on the map's own paper, to look at them:
//   NODE_PATH=$(npm root -g) node tools/history/atlas_preview.js <out.png> <piece> [<piece> ...]
// Each piece is shown at the sizes it is used at on a phone (small, middle) and large, on the sea and on land,
// in light and dark surroundings. A piece file sets ATLAS_ART.<name> = { vb: 'x y w h', svg: `...` }.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), vm = require('vm');
const [out, ...names] = process.argv.slice(2);
const DIR = path.join(__dirname, 'js', 'atlas_art');
const ATLAS_ART = {};
const ctx = vm.createContext({ ATLAS_ART });
const want = names.length ? names : fs.readdirSync(DIR).filter(f => f.endsWith('.js')).map(f => f.slice(0, -3));
for (const n of want) vm.runInContext(fs.readFileSync(path.join(DIR, n + '.js'), 'utf8'), ctx, { filename: n + '.js' });
const font = f => 'file://' + path.resolve(process.env.FONTS || '/tmp/claude-0/-home-user/3101ded6-0082-5b79-a207-667e5a76ada4/scratchpad/npmgeo/node_modules/@fontsource', f);
const sea = `<pattern id="pv-waves" width="9" height="5" patternUnits="userSpaceOnUse"><path d="M0 3.2q2.25-1.6 4.5 0t4.5 0" fill="none" stroke="#5B4A33" stroke-width=".45" opacity=".45"/></pattern>`;
const rows = want.map(n => {
  const a = ATLAS_ART[n];
  if (!a) return `<p>missing ${n}</p>`;
  const [, , w, h] = a.vb.split(/\s+/).map(Number), ar = w / h;
  const cell = (px, bg) => `<div class="cell ${bg}"><svg width="${px}" height="${(px / ar).toFixed(0)}" viewBox="${a.vb}">${a.svg}</svg><small>${px}px</small></div>`;
  return `<section><h2>${n} <small>${a.vb} · ${(a.svg.length / 1024).toFixed(1)} KB</small></h2>
    <div class="row">${cell(48, 'sea')}${cell(90, 'sea')}${cell(150, 'sea')}${cell(150, 'land')}${cell(380, 'sea')}${cell(150, 'dark')}</div></section>`;
}).join('');
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face { font-family: 'IM Fell English'; src: url(${font('im-fell-english/files/im-fell-english-latin-400-normal.woff2')}); }
@font-face { font-family: 'IM Fell English'; font-style: italic; src: url(${font('im-fell-english/files/im-fell-english-latin-400-italic.woff2')}); }
body { margin: 0; padding: 14px; background: #EFE6CF; font: 13px Georgia, serif; color: #2E2116; }
h2 { margin: 10px 0 6px; font-size: 16px; } h2 small { font-weight: normal; color: #7a6a50; }
.row { display: flex; flex-wrap: wrap; gap: 10px; align-items: flex-end; }
.cell { display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 10px; border: 1px solid #6E5836; }
.cell small { color: #7a6a50; font-size: 10px; }
.sea { background: #D5CBA6 url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='9' height='5'><path d='M0 3.2q2.25-1.6 4.5 0t4.5 0' fill='none' stroke='#5B4A33' stroke-width='.45' opacity='.45'/></svg>`)}"); }
.land { background: #F1E6C8; } .dark { background: #1E1B24; }
</style><svg width="0" height="0" style="position:absolute"><defs>${sea}</defs></svg>${rows}`;
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files', '--no-sandbox'] });
  const p = await (await b.newContext({ viewport: { width: 1180, height: 400 }, deviceScaleFactor: 2 })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  const tmp = path.join(path.dirname(path.resolve(out)), '.atlas_preview.html');
  fs.writeFileSync(tmp, html); await p.goto('file://' + tmp); await p.waitForTimeout(300);
  await p.screenshot({ path: out, fullPage: true });
  console.log(JSON.stringify({ out, pieces: want, errs }));
  await b.close();
})();
