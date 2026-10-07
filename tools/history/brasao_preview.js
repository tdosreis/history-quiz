#!/usr/bin/env node
/* Preview the brasões as the app shows them.
     node tools/history/brasao_preview.js <out.png> [id ... | file.js ...]
   With no ids, every brasão; a name ending in .js previews the ids that
   file (in tools/history/js/brasoes/) defines. Each row: the brasão large
   (as in the zoom), then in the round ivory disc at board size (64px) and
   at answer-tile size (34px), on the light paper and on the dark one, with
   its id, name and `what` line. Needs Playwright; CHROME may point at a
   Chromium binary. */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const H = __dirname;
const DIR = path.join(H, 'js', 'brasoes');
const read = f => fs.readFileSync(path.join(DIR, f), 'utf8');
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.js') && f !== '_core.js').sort();
const core = read('_core.js');
const src = [core, ...files.map(read)].join('\n;\n');
const idsOf = body => Object.keys(new Function(core + '\n;\n' + body + '\n;return BRASAO;')());
const names = Object.fromEntries(fs.readFileSync(path.join(H, 'polities.tsv'), 'utf8').split('\n')
  .filter(l => l.trim() && !l.startsWith('#')).map(l => l.split('|')).map(r => [r[0], r[1]]));

const [out, ...want] = process.argv.slice(2);
if (!out) { console.error('usage: brasao_preview.js <out.png> [ids | file.js]'); process.exit(2); }
const ids = want.length
  ? want.flatMap(w => w.endsWith('.js') ? idsOf(read(path.basename(w))) : [w])
  : idsOf(files.map(read).join('\n;\n'));

(async () => {
  const exe = process.env.CHROME || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
  const browser = await chromium.launch(exe ? { executablePath: exe, args: ['--no-sandbox'] } : {});
  const page = await browser.newPage({ viewport: { width: 760, height: 400 }, deviceScaleFactor: 1 });
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.setContent(`<!doctype html><html><head><style>
    body { margin: 0; font: 12px/1.3 Georgia, serif; background: #EFE8D8; }
    .row { display: grid; grid-template-columns: 150px 132px 1fr 1fr; align-items: center; gap: 10px; padding: 6px 10px; border-bottom: 1px solid #0001; }
    .lab b { display: block; font-size: 13px; } .lab i { color: #6a5f4b; font-size: 11px; } .lab code { color: #8a2020; font-size: 10px; }
    .big { width: 132px; height: 132px; } .big svg { width: 132px; height: 132px; }
    .pair { display: flex; gap: 14px; align-items: center; justify-content: center; padding: 10px; border-radius: 6px; }
    .light { background: #EFE8D8; } .dark { background: #1B2133; }
    .disc { border-radius: 50%; overflow: hidden; background: #F4F1E7; box-shadow: inset 0 0 0 1px rgba(32,36,30,.16), 0 2px 6px #0003;
      display: flex; align-items: center; justify-content: center; }
    .disc svg { width: 100%; height: 100%; display: block; }
    .d64 { width: 64px; height: 64px; } .d34 { width: 34px; height: 34px; }
    .missing { color: #b00; font-weight: 700; }
  </style></head><body><div id="g"></div></body></html>`);
  await page.addScriptTag({ content: src });
  const missing = await page.evaluate(([ids, names]) => {
    const svg = id => `<svg viewBox="0 0 60 60" aria-hidden="true">${brasaoSvg(id)}</svg>`;
    const lab = id => `<div class="lab"><code>${id}</code><b>${names[id] || '?'}</b><i>${(BRASAO[id] || {}).what || ''} · ${(BRASAO[id] || {}).shape || ''}</i></div>`;
    document.getElementById('g').innerHTML = ids.map(id => BRASAO[id] ? `
      <div class="row">${lab(id)}<div class="big">${svg(id)}</div>
        <div class="pair light"><span class="disc d64">${svg(id)}</span><span class="disc d34">${svg(id)}</span></div>
        <div class="pair dark"><span class="disc d64">${svg(id)}</span><span class="disc d34">${svg(id)}</span></div></div>`
      : `<div class="row">${lab(id)}<div class="missing">no BRASAO entry</div></div>`).join('');
    return ids.filter(id => !BRASAO[id]);
  }, [ids, names]);
  await page.waitForTimeout(150);
  const h = await page.evaluate(() => document.body.scrollHeight);
  await page.setViewportSize({ width: 760, height: Math.max(200, h) });
  await page.screenshot({ path: out, fullPage: true });
  console.log(JSON.stringify({ out, rows: ids.length, missing, errors: errs }));
  await browser.close();
})();
