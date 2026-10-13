#!/usr/bin/env node
/* Preview the scenes as the app shows them.
     node tools/history/scene_preview.js <out.png> [id[:param] ... | file.js ...]
   With no ids, every scene; a name ending in .js previews the ids that file
   (in tools/history/js/scenes/) defines. Each row: the scene large, then in
   the printed mat at the question-card size of a phone (124×82) and of a
   short phone (88×58), on the light paper and on the dark one, with its id
   and label. Needs Playwright; CHROME may point at a Chromium binary. */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const H = __dirname;
const DIR = path.join(H, 'js', 'scenes');
const read = f => fs.readFileSync(path.join(DIR, f), 'utf8');
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.js') && f !== '_core.js').sort();
const core = read('_core.js');
/* what the scenes lean on from the rest of the page */
const page = fs.readFileSync(path.join(H, '..', '..', 'index.html'), 'utf8');
const grab = name => { const m = page.match(new RegExp('\\n(const ' + name + ' = [^\\n]*(\\n  [^\\n]*)*)')); return m ? m[1] : ''; };
const shim = [
  `const _esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');`,
  grab('ROMAN'), grab('centNum'), grab('centTxt'), grab('yearTxt'),
  `const _fold = s => String(s || '').normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase();`,
].join('\n');
const src = [shim, core, ...files.map(read)].join('\n;\n');
const idsOf = body => Object.keys(new Function(shim + '\n;\n' + core + '\n;\n' + body + '\n;return SCENE;')());

const [out, ...want] = process.argv.slice(2);
if (!out) { console.error('usage: scene_preview.js <out.png> [ids | file.js]'); process.exit(2); }
const ids = want.length
  ? want.flatMap(w => w.endsWith('.js') ? (path.basename(w) === '_core.js' ? idsOf('') : idsOf(read(path.basename(w))).filter(i => !idsOf('').includes(i))) : [w])
  : idsOf(files.map(read).join('\n;\n'));

(async () => {
  const exe = process.env.CHROME || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
  const browser = await chromium.launch(exe ? { executablePath: exe, args: ['--no-sandbox'] } : {});
  const pg = await browser.newPage({ viewport: { width: 900, height: 400 }, deviceScaleFactor: 1 });
  const errs = [];
  pg.on('pageerror', e => errs.push(e.message));
  await pg.setContent(`<!doctype html><html><head><style>
    body { margin: 0; font: 12px/1.3 Georgia, serif; background: #EFE8D8; }
    .row { display: grid; grid-template-columns: 170px 300px 1fr 1fr; align-items: center; gap: 10px; padding: 6px 10px; border-bottom: 1px solid #0001; }
    .lab b { display: block; font-size: 12px; } .lab code { color: #8a2020; font-size: 11px; }
    .big svg { width: 300px; height: 200px; }
    .pair { display: flex; gap: 12px; align-items: center; justify-content: center; padding: 10px; border-radius: 6px; }
    .light { background: #EFE8D8; } .dark { background: #1B2133; }
    .mat { padding: 4px 4px 5px; background: #EFE6CF; box-shadow: 0 1px 3px #0004; display: flex; }
    .mat svg { width: 100%; height: 100%; display: block; }
    .m124 { width: 116px; height: 73px; } .m88 { width: 80px; height: 49px; }
    .missing { color: #b00; font-weight: 700; }
  </style></head><body><div id="g"></div></body></html>`);
  await pg.addScriptTag({ content: src });
  const res = await pg.evaluate(ids => {
    const bad = [];
    document.getElementById('g').innerHTML = ids.map(full => {
      const i = full.indexOf(':'), id = i < 0 ? full : full.slice(0, i), p = i < 0 ? undefined : full.slice(i + 1);
      if (!SCENE[id]) { bad.push(full); return `<div class="row"><div class="lab"><code>${full}</code></div><div class="missing">no SCENE entry</div></div>`; }
      let svg = '';
      try { svg = sceneSvg({ id, p }, 120); } catch (e) { bad.push(full + ': ' + e.message); }
      const lab = SCENE[id].label, l = typeof lab === 'function' ? lab(p) : lab;
      return `<div class="row"><div class="lab"><code>${full}</code><b>${l}</b>${SCENE[id].ev ? `<i>ev: ${SCENE[id].ev}</i>` : ''}</div><div class="big">${svg}</div>
        <div class="pair light"><span class="mat m124">${svg}</span><span class="mat m88">${svg}</span></div>
        <div class="pair dark"><span class="mat m124">${svg}</span><span class="mat m88">${svg}</span></div></div>`;
    }).join('');
    return bad;
  }, ids);
  await pg.waitForTimeout(150);
  const h = await pg.evaluate(() => document.body.scrollHeight);
  await pg.setViewportSize({ width: 900, height: Math.max(200, h) });
  await pg.screenshot({ path: out, fullPage: true });
  console.log(JSON.stringify({ out, rows: ids.length, problems: res, errors: errs }));
  await browser.close();
})();
