
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
/* the rulers' last year: fixed, so a game sent to a friend as a challenge is the same game next year */
const ANO_NOW = 2026;
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
  isDaily = false; isSurv = false; isMil = false; isRev = false;
  runSelos = [];
  /* dealt from a seed, so the game can be sent to a friend as a challenge (js/desafio.js) */
  const seed = chalSeed('a');
  seedFrom(seed); ano = buildAno(); _seed = null;
  ano.seed = seed;
  sc = 'ano';
  go();
}

/* ── HOJE NA HISTÓRIA ──
   The almanac (js/almanac.js) as a game: the dates on it nearest to today,
   with the birthdays of the figures, each to be dated on the same ruler. The
   day and the month are shown, the year is the question. The same five for
   everyone on the same day, in the order of the calendar. */
const HOJE_N = 5;
/* the days from today to a day of the year, the short way round, on the real calendar (a 29 de fevereiro
   is there only in a leap year): negative for one just past */
function hojeOff(md, now) {
  now = now || new Date();
  const t = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  let k = null;
  for (let yy = now.getFullYear() - 1; yy <= now.getFullYear() + 1; yy++) {
    const x = Math.round((Date.UTC(yy, md[0] - 1, md[1]) - t) / 864e5);
    if (k === null || Math.abs(x) < Math.abs(k)) k = x;
  }
  return k;
}
function hojePool() {
  const picOf = id => PL.some(p => p.id === id) ? { face: id } : CL.some(c => c.id === id) ? { crest: id } : FLAGS[id] ? { flag: id } : {};
  const out = ALMANAC.map(([m, d, y, t, pic], i) => ({ id: 'alm' + i, t, y, c: false, md: [m, d], pic: picOf(pic) }));
  Object.keys(BDAYS).forEach(id => {
    const p = PL.find(x => x.id === id);
    if (!p || !PL_META[id]) return;
    /* a birth already among the Que ano? events keeps its line and its "Você sabia?" */
    const known = ANO_EVENTS.find(e => e.id === 'nasc_' + id && e.y === p.era[0]);
    out.push(Object.assign({}, known || { id: 'nasc_' + id, t: 'Nasce ' + p.n, y: p.era[0], c: false, pic: { face: id } }, { md: BDAYS[id] }));
  });
  return out;
}
function buildHoje(now) {
  now = now || new Date();
  const day = dayIndex(now);
  seedFrom(day * 7919 + 17);
  /* the dates of the days around this one (the ten nearest, or any within ten days), and from them the
     day's five: today's own always, the rest drawn, so that tomorrow is not today again */
  const near = shuf(hojePool()).map(e => ({ e, k: hojeOff(e.md, now) })).sort((a, b) => Math.abs(a.k) - Math.abs(b.k));
  const cand = near.filter((x, i) => i < 10 || Math.abs(x.k) <= 10);
  const five = cand.filter(x => x.k === 0).concat(shuf(cand.filter(x => x.k !== 0))).slice(0, HOJE_N);
  const qs = five.sort((a, b) => a.k - b.k).map(({ e, k }) => {
    const [lo, hi] = anoWindow(e, rnd());
    const mid = Math.round((lo + hi) / 2 / 5) * 5;
    return { e, k, lo, hi, start: mid === 0 ? 1 : mid };
  });
  _seed = null;
  return { qs, i: 0, guess: qs[0].start, log: [], pts: 0, phase: 'guess', hoje: { day, d: now.getDate(), m: now.getMonth() + 1 } };
}
function startHoje() {
  isDaily = false; isSurv = false; isMil = false; isRev = false;
  runSelos = [];
  ano = buildHoje();
  /* a replay of the day's game is played with the answers known: it counts for nothing */
  ano.replay = !!hojeRes();
  /* a game left halfway goes on where it was: the answers given stand, and the dates already seen are not dealt again */
  const run = !ano.replay && hojeOpen();
  if (run) {
    run.log.forEach(([id, g], i) => {
      const q = ano.qs[i];
      if (!q || q.e.id !== id || ano.log.length !== i) return;
      const p = anoPts(q.e, g);
      ano.log.push({ e: q.e, g, p, d: anoGap(q.e.y, g), selo: null });
      ano.pts += p;
    });
    if (ano.log.length) {
      const n = ano.log.length;
      if (n < ano.qs.length) { ano.i = n; ano.guess = ano.qs[n].start; }
      else { ano.i = n - 1; ano.phase = 'reveal'; ano.guess = ano.log[n - 1].g; }
    }
  }
  sc = 'ano';
  go();
}
/* the day's game begun and not finished: its answers so far, as [event id, year guessed] */
function hojeOpen() {
  const r = LS.get('hojeRun', null);
  return r && r.day === dayIndex() && Array.isArray(r.log) && r.log.length && !hojeRes() ? r : null;
}
/* today's first result, kept for the cover */
const hojeRes = () => { const r = LS.get('hojeRes', null); return r && r.day === dayIndex() ? r : null; };
const hojeDate = h => `${h.d} de ${MES_LONGO[h.m - 1]}`;
function hojeWhen(q) {
  const k = q.k, [m, d] = q.e.md;
  return `${d} de ${MES_LONGO[m - 1]} · ${k === 0 ? 'hoje' : k === -1 ? 'ontem' : k === 1 ? 'amanhã' : k < 0 ? `há ${-k} dias` : `daqui a ${k} dias`}`;
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
    ${topbar(ano.hoje ? 'Hoje na História' : 'Que ano?')}
    <div class="ano-head"><div class="runlog" aria-hidden="true">${dots}</div>
      <span class="ano-score"><b class="num">${ano.pts}</b> pts</span></div>
    <div class="ano-card">
      ${anoPic(e)}
      ${ano.hoje ? `<span class="ano-date">${ICON.calendar('currentColor', 12)} ${hojeWhen(q)}</span>` : ''}
      <p class="ano-t">${_esc(e.t).replace(/\S+-\S+/g, w => `<span class="ano-nw">${w}</span>`)}</p>
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
  const isBest = !!ano.isBest, n = ano.qs.length, f = ano.pts / (n * 100), h = ano.hoje, r = h && hojeRes();
  const msg = f >= .8 ? 'Uma máquina do tempo!' : f >= .6 ? 'Ótimo senso de tempo!' : f >= .4 ? 'Nada mau!' : 'O tempo é traiçoeiro…';
  return `
  <div class="pg pg-center ano-end" style="padding:22px 18px;gap:9px;">
    <div class="eyebrow${h ? ' eb-keep' : ''}">${h ? 'Hoje na História · ' + hojeDate(h) : `Que ano? · ${n} eventos`}</div>
    <div class="display" style="font-size:28px;"><em>${msg}</em></div>
    <div class="display prize-pop brass" style="font-size:50px;letter-spacing:-.03em;">${ano.pts}<span class="muted" style="font-size:18px;"> / ${n * 100}</span></div>
    ${h ? `<p class="small muted">${!ano.hojeFirst && r ? `Vale o primeiro de hoje: <b>${r.pts} pts</b> · ` : ''}Amanhã, outras datas</p>`
      : chalBanner() || `<p class="small muted">${isBest ? 'Seu novo recorde!' : `Recorde: ${best} pts`}</p>`}
    <div class="ano-list">
      ${ano.log.map(l => `<div class="ano-li"><span class="ano-li-p ${l.p >= 80 ? 'good' : l.p >= 50 ? 'brass' : 'bad'}">${l.p}</span>
        <span class="ano-li-t">${_esc(l.e.t)}</span><span class="ano-li-y"><b>${l.e.c ? 'c. ' : ''}${anoYear(l.e.y)}</b><small>${l.d === 0 ? 'exato' : 'você: ' + anoYear(l.g)}</small></span></div>`).join('')}
    </div>
    ${selosStrip()}
    ${medalChips()}
    <div class="foot-row" style="margin-top:8px;">
      <button id="ano-share" class="btn btn-ghost btn-sm">${chalMine() ? 'Desafiar' : 'Compartilhar'}</button>
      <button id="ano-again" class="btn btn-brass">${h ? 'Que ano?' : 'De novo'}</button>
      <button id="bhome" class="btn btn-ghost btn-sm">Início</button>
    </div>
  </div>`;
}

function anoShareText() {
  const grid = ano.log.map(l => l.p === 100 ? '🎯' : l.p >= 80 ? '🟩' : l.p >= 50 ? '🟨' : '⬛').join('');
  if (ano.hoje) return `Hoje na História 📅 ${hojeDate(ano.hoje)}\n${grid}\n${ano.pts}/${ano.qs.length * 100} pts\n${CHAL_URL}`;
  return `Que ano? 📜 History Quiz\n${grid}\n${ano.pts}/${ano.qs.length * 100} pts\n${chalShareTail(chalMine())}`;
}

function anoCommit() {
  if (!ano || ano.phase !== 'guess') return;
  const q = ano.qs[ano.i], e = q.e, g = ano.guess;
  const p = anoPts(e, g), d = anoGap(e.y, g);
  const selo = p >= 80 && !ano.replay && e.pic && e.pic.scene && awardSelo(e.pic.scene) ? e.pic.scene : null;
  ano.log.push({ e, g, p, d, selo });
  if (ano.hoje && !ano.replay) LS.set('hojeRun', { day: ano.hoje.day, log: ano.log.map(l => [l.e.id, l.g]) });
  if (d === 0 && !ano.replay) { stats.anoExact = (stats.anoExact || 0) + 1; LS.set('stats', stats); }
  /* a medal is won the moment it is earned, and announced on this game's results */
  try { ano.medals = (ano.medals || []).concat(newMedals()); } catch (err) {}
  ano.pts += p;
  ano.phase = 'reveal';
  if (p === 100) snd.fanfare(); else if (p >= 80) snd.correct(0); else if (p >= 50) snd.almost(); else snd.wrong();
  go();
  if (p >= 80) try { burst(p === 100 ? 28 : 14); } catch (err) {}
}
function anoNext() {
  if (!ano || ano.phase !== 'reveal') return;
  if (ano.i >= ano.qs.length - 1) {
    ano.phase = 'end';
    if (ano.hoje) {
      /* the day's game is the same all day: only its first result is kept, and no record is set on a replay */
      stats.hojeGames = (stats.hojeGames || 0) + 1;
      /* the game's own day, not the clock's: a replay begun before midnight and finished after is still a replay */
      const prev = LS.get('hojeRes', null);
      if (!ano.replay && !(prev && prev.day === ano.hoje.day)) { ano.hojeFirst = true; stats.hojeBest = Math.max(stats.hojeBest || 0, ano.pts); LS.set('hojeRes', { day: ano.hoje.day, pts: ano.pts }); LS.set('hojeRun', null); }
    } else {
      stats.anoGames = (stats.anoGames || 0) + 1;
      ano.isBest = ano.pts > LS.get('anoBest', 0);
      if (ano.isBest) LS.set('anoBest', ano.pts);
    }
    LS.set('stats', stats);
    window._newMedals = (ano.medals || []).concat(newMedals());
    setTimeout(() => snd.final(ano.pts >= ano.qs.length * 50), 200);
  } else {
    ano.i++;
    ano.guess = ano.qs[ano.i].start;
    ano.phase = 'guess';
  }
  go();
}

/* A screen's buttons wait a moment before they listen: the second tap of a double tap lands on whatever
   the first one drew under the finger, and would answer a question nobody has read. */
function tapArmed(ms) {
  const t0 = performance.now();
  return () => performance.now() - t0 >= (ms || 350);
}

function wireAno() {
  const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  const ready = tapArmed();
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
    if (!ready()) return;
    snd.tap();
    const g = ano.guess, d = +b.dataset.nudge;
    let v = g + d;
    if (g < 0 && v >= 0) v += 1; else if (g > 0 && v <= 0) v -= 1;
    set(v);
  }));
  on('ano-go', () => { if (ready()) anoCommit(); });
  on('ano-next', () => { if (ready()) { snd.swipe(); anoNext(); } });
  on('ano-again', () => { snd.select(); startAno(); });
  on('ano-share', () => {
    const txt = anoShareText();
    if (navigator.share) navigator.share({ text: txt }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(txt).then(() => {
      const b = document.getElementById('ano-share'); if (b) { b.dataset.l = b.dataset.l || b.textContent; b.textContent = 'Copiado!'; setTimeout(() => { b.textContent = b.dataset.l; }, 1600); } }).catch(() => {});
  });
}
