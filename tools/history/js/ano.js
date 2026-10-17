
/* ═══════════════════════════════════════════════════
   QUE ANO? — drag the slider to the year
   Ten events, each with its picture and one line. The player slides a
   ruler of years to where they think it happened and nails it in; the
   closer, the more points, out of 100 an event. A guess is judged by the
   age it is set in: ten years off is close for the pyramids and far for
   the Moon landing. ANO_EVENTS (built from tools/history/ano_events.json)
   is above this line.
═══════════════════════════════════════════════════ */
const ANO_N = 10;
const ANO_NOW = new Date().getFullYear();
let ano = null;            // the game being played: { qs, i, guess, log, pts, phase }

const anoYear = y => y < 0 ? `${-y} a.C.` : String(y);
/* how many years count as "close" for an event of this age */
const anoTol = e => (e.y < -1000 ? 80 : e.y < 0 ? 50 : e.y < 1000 ? 35 : e.y < 1500 ? 22 : e.y < 1800 ? 12 : e.y < 1900 ? 8 : 5) * (e.c ? 2 : 1);
/* the years between two dates, with no year zero between 1 a.C. and 1 d.C. */
const anoGap = (a, b) => Math.abs(a - b) - (a < 0 !== b < 0 ? 1 : 0);
/* only the exact year is worth 100: a near miss, however near, tops out at 99 */
const anoPts = (e, g) => { const d = anoGap(e.y, g); return d === 0 ? 100 : Math.min(99, Math.max(0, Math.round(100 * (1 - d / (anoTol(e) * 5))))); };
const anoVerdict = p => p === 100 ? 'Na mosca!' : p >= 80 ? 'Muito perto!' : p >= 50 ? 'Perto' : p > 0 ? 'Longe' : 'Passou longe';

/* The ruler each event is guessed on: wide for the ancient world, narrow
   for the last century, and never centred on the answer. */
function anoWindow(e, r) {
  const W = e.y < -1000 ? 2000 : e.y < 0 ? 1000 : e.y < 1000 ? 700 : e.y < 1500 ? 450 : e.y < 1800 ? 320 : e.y < 1900 ? 220 : 140;
  let lo = Math.round((e.y - W * (0.18 + r * 0.64)) / 10) * 10;
  let hi = lo + W;
  if (hi > ANO_NOW) { lo -= hi - ANO_NOW; hi = ANO_NOW; }
  /* a ruler never ends on year 0, which did not exist */
  if (hi === 0) { lo -= 10; hi -= 10; } else if (lo === 0) { lo += 10; hi += 10; }
  return [lo, hi];
}

/* ten events, two from each age, in no order */
function buildAno() {
  const bands = [[-1e9, 0], [0, 1500], [1500, 1800], [1800, 1900], [1900, 1e9]];
  const pickd = [];
  bands.forEach(([a, b]) => pickd.push(...shuf(ANO_EVENTS.filter(e => e.y >= a && e.y < b)).slice(0, 2)));
  const qs = shuf(pickd).slice(0, ANO_N).map(e => {
    const [lo, hi] = anoWindow(e, rnd());
    const mid = Math.round((lo + hi) / 2 / 5) * 5;
    return { e, lo, hi, start: mid === 0 ? 1 : mid };
  });
  return { qs, i: 0, guess: qs[0].start, log: [], pts: 0, phase: 'guess' };
}
function startAno() {
  isDaily = false; isSurv = false; isMil = false;
  runSelos = [];
  ano = buildAno();
  sc = 'ano';
  go();
}

/* the picture of an event: its scene, or a face, a brasão, a flag */
function anoPic(e) {
  const p = e.pic || {};
  if (p.scene && SCENE[p.scene]) return `<div class="ano-pic ano-scene">${sceneSvg({ id: p.scene }, 240)}</div>`;
  if (p.face) { const f = PL.find(x => x.id === p.face); if (f && f.img) return `<div class="ano-pic ano-face"><img src="${f.img}" alt="" aria-hidden="true"></div>`; }
  if (p.crest && CL.some(c => c.id === p.crest)) return `<div class="ano-pic ano-crest">${clubArt(p.crest, '', false)}</div>`;
  if (p.flag && FLAGS[p.flag]) return `<div class="ano-pic ano-flag"><svg viewBox="0 0 9 6" preserveAspectRatio="none" aria-hidden="true">${FLAGS[p.flag]}</svg></div>`;
  return `<div class="ano-pic ano-scene">${ART.hourglass(240)}</div>`;
}

function anoHtml() {
  if (!ano) ano = buildAno();
  if (ano.phase === 'end') return anoEndHtml();
  const q = ano.qs[ano.i], e = q.e, rev = ano.phase === 'reveal';
  const last = ano.log[ano.log.length - 1];
  const dots = ano.qs.map((x, i) => {
    const l = ano.log[i];
    return `<i class="${l ? (l.p >= 80 ? 'rl-3' : l.p >= 50 ? 'rl-1' : 'rl-0') : i === ano.i ? 'ano-dot-on' : ''}"></i>`;
  }).join('');
  /* a mark sits where the thumb would: the thumb travels inside the track, half its width in from each end */
  const pos = y => `calc(var(--ano-th0) + (100% - 2 * var(--ano-th0)) * ${((y - q.lo) / (q.hi - q.lo)).toFixed(4)})`;
  return `
  <div class="pg ano-pg${rev ? ' is-rev' : ''}">
    ${topbar('Que ano?')}
    <div class="ano-head"><div class="runlog" aria-hidden="true">${dots}</div>
      <span class="ano-score"><b class="num">${ano.pts}</b> pts</span></div>
    <div class="ano-card">
      ${anoPic(e)}
      <p class="ano-t">${_esc(e.t)}</p>
    </div>
    <div class="ano-dial">
      <div class="ano-year num${rev ? ' is-set' : ''}${rev && last.d === 0 ? ' is-hit' : ''}" id="ano-year"${rev ? ' aria-live="polite"' : ''}>${anoYear(rev ? last.g : ano.guess)}</div>
      ${rev ? `<div class="ano-truth"><span>${anoVerdict(last.p)}</span> <b>${e.c ? 'c. ' : ''}${anoYear(e.y)}</b>
          · ${last.d === 0 ? 'o ano exato' : `${last.d} ${last.d === 1 ? 'ano' : 'anos'} de diferença`}</div>` : ''}
      <div class="ano-rule">
        <input type="range" id="ano-range" min="${q.lo}" max="${q.hi}" step="1" value="${rev ? last.g : ano.guess}"
          aria-label="Ano" aria-valuetext="${anoYear(rev ? last.g : ano.guess)}" ${rev ? 'disabled' : ''}>
        ${rev ? `<span class="ano-mark ano-mark-g" style="left:${pos(last.g)}"></span>
                 <span class="ano-mark ano-mark-y" style="left:${pos(e.y)}"></span>` : ''}
        <div class="ano-ends"><span>${anoYear(q.lo)}</span><span>${anoYear(q.hi)}</span></div>
      </div>
      ${rev ? '' : `<div class="ano-nudge">
        <button class="btn btn-ghost btn-sm" data-nudge="-10" aria-label="Menos 10 anos">−10</button><button class="btn btn-ghost btn-sm" data-nudge="-1" aria-label="Menos 1 ano">−1</button>
        <button class="btn btn-ghost btn-sm" data-nudge="1" aria-label="Mais 1 ano">+1</button><button class="btn btn-ghost btn-sm" data-nudge="10" aria-label="Mais 10 anos">+10</button></div>`}
    </div>
    ${rev ? `<div class="ano-after">
        <span class="display ${last.p >= 80 ? 'good' : last.p >= 50 ? 'brass' : 'bad'}" style="font-size:17px;">+${last.p}</span>
        ${last.selo ? seloWonLine(last.selo) : ''}
        ${e.x ? `<div class="story"><span class="story-k">${ICON.book('currentColor', 11)} Você sabia?</span><p>${_esc(e.x)}</p></div>` : ''}
        <button id="ano-next" class="btn btn-brass">${ano.i >= ano.qs.length - 1 ? 'Ver resultado' : 'Próximo'}</button></div>`
      : `<button id="ano-go" class="btn btn-brass btn-lg">${ICON.check('currentColor', 14)} Cravar o ano</button>`}
  </div>`;
}

function anoEndHtml() {
  const best = LS.get('anoBest', 0);
  const isBest = !!ano.isBest;
  const msg = ano.pts >= 800 ? 'Uma máquina do tempo!' : ano.pts >= 600 ? 'Ótimo senso de tempo!' : ano.pts >= 400 ? 'Nada mau!' : 'O tempo é traiçoeiro…';
  return `
  <div class="pg pg-center ano-end" style="padding:22px 18px;gap:9px;">
    <div class="eyebrow">Que ano? · ${ANO_N} eventos</div>
    <div class="display" style="font-size:28px;"><em>${msg}</em></div>
    <div class="display prize-pop brass" style="font-size:50px;letter-spacing:-.03em;">${ano.pts}<span class="muted" style="font-size:18px;"> / ${ANO_N * 100}</span></div>
    <p class="small muted">${isBest ? 'Seu novo recorde!' : `Recorde: ${best} pts`}</p>
    <div class="ano-list">
      ${ano.log.map(l => `<div class="ano-li"><span class="ano-li-p ${l.p >= 80 ? 'good' : l.p >= 50 ? 'brass' : 'bad'}">${l.p}</span>
        <span class="ano-li-t">${_esc(l.e.t)}</span><span class="ano-li-y"><b>${l.e.c ? 'c. ' : ''}${anoYear(l.e.y)}</b><small>${l.d === 0 ? 'exato' : 'você: ' + anoYear(l.g)}</small></span></div>`).join('')}
    </div>
    ${selosStrip()}
    ${medalChips()}
    <div class="foot-row" style="margin-top:8px;">
      <button id="ano-share" class="btn btn-ghost btn-sm">Compartilhar</button>
      <button id="ano-again" class="btn btn-brass">De novo</button>
      <button id="bhome" class="btn btn-ghost btn-sm">Início</button>
    </div>
  </div>`;
}

function anoShareText() {
  const grid = ano.log.map(l => l.p === 100 ? '🎯' : l.p >= 80 ? '🟩' : l.p >= 50 ? '🟨' : '⬛').join('');
  return `Que ano? 📜 History Quiz\n${grid}\n${ano.pts}/${ANO_N * 100} pts\nhttps://tdosreis.github.io/history-quiz/`;
}

function anoCommit() {
  const q = ano.qs[ano.i], e = q.e, g = ano.guess;
  const p = anoPts(e, g), d = anoGap(e.y, g);
  const selo = p >= 80 && e.pic && e.pic.scene && awardSelo(e.pic.scene) ? e.pic.scene : null;
  ano.log.push({ e, g, p, d, selo });
  if (d === 0) { stats.anoExact = (stats.anoExact || 0) + 1; LS.set('stats', stats); }
  /* a medal is won the moment it is earned, and announced on this game's results */
  try { ano.medals = (ano.medals || []).concat(newMedals()); } catch (err) {}
  ano.pts += p;
  ano.phase = 'reveal';
  if (p === 100) snd.fanfare(); else if (p >= 80) snd.correct(0); else if (p >= 50) snd.almost(); else snd.wrong();
  go();
  if (p >= 80) try { burst(p === 100 ? 28 : 14); } catch (err) {}
}
function anoNext() {
  if (ano.i >= ano.qs.length - 1) {
    ano.phase = 'end';
    stats.anoGames = (stats.anoGames || 0) + 1;
    LS.set('stats', stats);
    ano.isBest = ano.pts > LS.get('anoBest', 0);
    if (ano.isBest) LS.set('anoBest', ano.pts);
    window._newMedals = (ano.medals || []).concat(newMedals());
    setTimeout(() => snd.final(ano.pts >= 500), 200);
  } else {
    ano.i++;
    ano.guess = ano.qs[ano.i].start;
    ano.phase = 'guess';
  }
  go();
}

function wireAno() {
  const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  const r = document.getElementById('ano-range'), yEl = document.getElementById('ano-year');
  const set = v => {
    const q = ano.qs[ano.i];
    v = Math.max(q.lo, Math.min(q.hi, Math.round(v)));
    if (v === 0) v = ano.guess < 0 ? 1 : -1;   // there is no year zero
    ano.guess = v;
    if (r) { r.value = v; r.setAttribute('aria-valuetext', anoYear(v)); }
    if (yEl) yEl.textContent = anoYear(v);
  };
  if (r && ano.phase === 'guess') {
    r.addEventListener('input', () => set(+r.value));
    let last = 0;
    r.addEventListener('input', () => { const t = Date.now(); if (t - last > 70) { last = t; try { snd.tick && snd.tick(); } catch (e) {} } });
  }
  /* ten years after 2 a.C. is 9 d.C.: there is no year zero to count */
  document.querySelectorAll('[data-nudge]').forEach(b => b.addEventListener('click', () => {
    snd.tap();
    const g = ano.guess, d = +b.dataset.nudge;
    let v = g + d;
    if (g < 0 && v >= 0) v += 1; else if (g > 0 && v <= 0) v -= 1;
    set(v);
  }));
  on('ano-go', () => anoCommit());
  on('ano-next', () => { snd.swipe(); anoNext(); });
  on('ano-again', () => { snd.select(); startAno(); });
  on('ano-share', () => {
    const txt = anoShareText();
    if (navigator.share) navigator.share({ text: txt }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(txt).then(() => {
      const b = document.getElementById('ano-share'); if (b) { b.textContent = 'Copiado!'; setTimeout(() => { b.textContent = 'Compartilhar'; }, 1600); } }).catch(() => {});
  });
}
