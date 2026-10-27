
/* ═══════════════════════════════════════════════════
   ANTES OU DEPOIS? — one event, its year shown; the next, its year hidden:
   did it happen before or after? Right, and it becomes the one to beat;
   wrong, or too slow, and the run is over. The further the run goes, the
   closer the two years are and the shorter the clock. The Que ano? events
   (ANO_EVENTS) are the deck; none comes up twice in a run.
═══════════════════════════════════════════════════ */
/* from this many right, the next year is this many years away, at least and at most */
const AOD_BANDS = [[0, 200, 6000], [3, 70, 800], [6, 30, 320], [10, 12, 150], [15, 4, 80]];
let aod = null;   // { a, b, score, used, phase: 'guess'|'reveal'|'end', pick, ok, t0, tMax, log, tok }

const aodYear = e => (e.c ? 'c. ' : '') + anoYear(e.y);
const aodClock = n => Math.max(6, 12 - Math.floor(n / 3));      // seconds to answer, by the run so far

/* the next event: one not seen in this run, a fair distance from the last (an event dated "c." needs more
   room: its year is a guess too), and closer as the run grows; any unseen one when nothing fits */
function aodPick(a) {
  const [, lo, hi] = AOD_BANDS.filter(b => aod.score >= b[0]).pop();
  const free = ANO_EVENTS.filter(e => !aod.used.has(e.id) && e.y !== a.y);
  const fair = e => anoGap(a.y, e.y) >= ((a.c || e.c) ? Math.max(lo, 80) : lo);
  let pool = free.filter(e => fair(e) && anoGap(a.y, e.y) <= hi);
  if (!pool.length) pool = free.filter(fair);
  if (!pool.length) pool = free;
  return pool.length ? pool[Math.floor(aodRnd() * pool.length)] : null;
}

/* The run is dealt from its own seed, on its own generator (nothing else drawing numbers in between can
   change it), so a friend sent the link gets the same events in the same order for as long as they keep
   answering right (js/desafio.js). */
function aodRnd() {
  let t = (aod.rs = (aod.rs + 0x6D2B79F5) | 0);
  t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
/* a new run: the first event is one with a sure year */
function aodNew(seed) {
  clearTimeout(aod && aod.adv);
  if (seed == null) seed = (Math.random() * CHAL_SEED_MAX) | 0;
  aod = { seed, rs: seed, a: null, b: null, score: 0, used: new Set(), phase: 'guess', pick: null, ok: null, log: [], tok: 0, best0: LS.get('aodBest', 0) };
  const deck = ANO_EVENTS.filter(e => !e.c);
  aod.a = deck[Math.floor(aodRnd() * deck.length)]; aod.used.add(aod.a.id);
  aod.b = aodPick(aod.a); aod.used.add(aod.b.id);
  aodArm();
}
function startAod() {
  isDaily = false; isSurv = false; isMil = false; isRev = false;
  runSelos = [];
  aodNew(chalSeed('d'));
  sc = 'aod';
  go();
}
/* a new guess: the clock starts again, shorter as the run grows */
function aodArm() { aod.tMax = aodClock(aod.score); aod.t0 = performance.now(); aod.tok++; }

function aodAnswer(dir) {
  if (!aod || aod.phase !== 'guess') return;
  const { a, b } = aod, truth = b.y < a.y ? 'antes' : 'depois';
  aod.pick = dir; aod.ok = dir === truth; aod.phase = 'reveal'; aod.rolled = false;
  aod.log.push({ a, b, dir, ok: aod.ok });
  aod.selo = null;
  if (aod.ok) {
    aod.score++;
    stats.aodRight = (stats.aodRight || 0) + 1; LS.set('stats', stats);
    /* every fifth in a row, the event's scene goes into the stamp album, if it has one not yet there */
    if (aod.score % 5 === 0 && b.pic && b.pic.scene && awardSelo(b.pic.scene)) aod.selo = b.pic.scene;
    try { snd.correct(Math.min(aod.score - 1, 8)); } catch (e) {}
  } else {
    try { snd.wrong(); } catch (e) {}
    try { haptic([28, 45, 28]); } catch (e) {}
  }
  go();
  if (aod.ok) requestAnimationFrame(() => {
    const el = document.querySelector('.aod-b');
    try { fx.splash(el, '#3A9C6E', 10); haptic(12); streakMark(aod.score); } catch (e) {}
  });
  else requestAnimationFrame(() => { try { fx.edge('#B3402F', false); } catch (e) {} });
}

function aodNext() {
  if (!aod || aod.phase !== 'reveal') return;
  clearTimeout(aod.adv);
  if (!aod.ok) return aodEnd();
  const nb = aodPick(aod.b);
  if (!nb) { aod.all = true; return aodEnd(); }      // every event seen: the deck is spent
  aod.a = aod.b; aod.b = nb; aod.used.add(nb.id);
  aod.phase = 'guess'; aod.pick = null; aod.ok = null; aod.shift = true;
  aodArm();
  go();
}

function aodEnd() {
  aod.phase = 'end';
  stats.aodGames = (stats.aodGames || 0) + 1;
  stats.aodBest = Math.max(stats.aodBest || 0, aod.score);
  aod.isBest = aod.score > aod.best0;
  if (aod.isBest) LS.set('aodBest', aod.score);
  LS.set('stats', stats);
  window._newMedals = newMedals();
  setTimeout(() => { try { snd.final(aod.score >= 5); } catch (e) {} }, 200);
  go();
  if (aod.isBest && aod.score >= 5) setTimeout(() => { try { fx.rain(aod.score >= 15 ? 80 : 34); } catch (e) {} }, 350);
}

function aodCard(e, which, rev) {
  const hid = which === 'b' && !rev;
  return `<div class="aod-card aod-${which}${which === 'b' && rev ? (aod.ok ? ' is-good' : ' is-bad') : ''}${which === 'a' && aod.shift ? ' is-shifted' : ''}">
    <span class="aod-pic">${anoPic(e)}</span>
    <span class="aod-tx"><span class="aod-t">${_esc(e.t)}</span>
      <b class="aod-y num${hid ? ' is-hid' : ''}" ${which === 'b' ? 'id="aod-yb"' : ''}${hid ? ' aria-label="ano escondido"' : ''}>${hid ? '????' : aodYear(e)}</b></span>
  </div>`;
}

function aodHtml() {
  if (!aod) aodNew();
  if (aod.phase === 'end') return aodEndHtml();
  const { a, b } = aod, rev = aod.phase === 'reveal';
  const best = Math.max(aod.best0, aod.score);
  const up = ICON.back('currentColor', 15).replace('<svg', '<svg style="transform:rotate(90deg)"');
  const down = ICON.back('currentColor', 15).replace('<svg', '<svg style="transform:rotate(-90deg)"');
  const gap = anoGap(a.y, b.y), when = b.y < a.y ? 'antes' : 'depois';
  const wait = b.x ? Math.min(7000, 2000 + b.x.length * 32) : 1500;
  const html = `
  <div class="pg aod-pg${rev ? ' is-rev' : ''}">
    ${topbar('Antes ou depois?')}
    <div class="aod-head">
      <span class="aod-run">${ICON.flame('currentColor', 13)} <b class="num">${aod.score}</b> ${aod.score === 1 ? 'acerto' : 'acertos'} seguidos</span>
      <span class="aod-best">Recorde <b class="num">${best}</b></span>
    </div>
    <div class="timer aod-timer"><i id="aod-tf" style="width:${rev ? 0 : 100}%"></i></div>
    ${aodCard(a, 'a', rev)}
    <div class="aod-q"><span>${rev ? (aod.ok ? 'Isso!' : aod.pick ? 'Não…' : 'O tempo acabou') : 'E este aconteceu…'}</span></div>
    ${aodCard(b, 'b', rev)}
    ${rev ? `<div class="aod-res" role="status">
        <p class="aod-verdict ${aod.ok ? 'good' : 'bad'}">${gap === 0 ? 'No mesmo ano' : `${gap} ${gap === 1 ? 'ano' : 'anos'} ${when}`}</p>
        ${aod.selo ? seloWonLine(aod.selo) : ''}
        ${b.x ? `<div class="story"><span class="story-k">${ICON.book('currentColor', 11)} Você sabia?</span><p>${_esc(b.x)}</p></div>` : ''}
        <button id="aod-next" class="btn ${aod.ok ? 'btn-ghost btn-sm btn-next' : 'btn-brass'}" style="--wait:${wait}ms">
          ${aod.ok ? `Próximo ${ICON.back('currentColor', 11).replace('<svg', '<svg style="transform:scaleX(-1)"')}<i class="next-fill"></i>` : 'Ver resultado'}</button>
      </div>`
    : `<div class="aod-btns">
        <button id="aod-antes" class="aod-btn" type="button">${up}<b>Antes</b><small>de ${aodYear(a)}</small></button>
        <button id="aod-depois" class="aod-btn" type="button">${down}<b>Depois</b><small>de ${aodYear(a)}</small></button>
      </div>`}
  </div>`;
  aod.wait = wait;
  return html;
}

function aodEndHtml() {
  const n = aod.score, last = aod.log[aod.log.length - 1];
  const msg = aod.all ? 'Você viu a História inteira!' : n >= 20 ? 'Senhor do tempo!' : n >= 12 ? 'Que memória!' : n >= 6 ? 'Muito bem!' : n >= 3 ? 'Nada mau!' : 'O tempo engana…';
  const miss = last && !last.ok ? last : null;
  return `
  <div class="pg pg-center aod-end" style="padding:22px 18px;gap:9px;">
    <div class="eyebrow">Antes ou depois?</div>
    <div class="display" style="font-size:28px;"><em>${msg}</em></div>
    ${wreathed(n >= 8, `<div class="display prize-pop brass aod-end-n">${n}</div>`)}
    <div class="aod-end-k">${n === 1 ? 'acerto seguido' : 'acertos seguidos'}</div>
    ${chalBanner() || `<p class="small muted">${aod.isBest ? 'Seu novo recorde!' : `Recorde: ${aod.best0}`}</p>`}
    ${miss ? `<div class="aod-miss">
        <span class="aod-miss-k">${miss.dir ? 'Onde a corrente quebrou' : 'O tempo acabou em'}</span>
        <span class="aod-miss-row"><b class="num">${aodYear(miss.b)}</b><span>${_esc(miss.b.t)}</span></span>
        <span class="aod-miss-vs">${miss.b.y < miss.a.y ? 'antes de' : 'depois de'}</span>
        <span class="aod-miss-row"><b class="num">${aodYear(miss.a)}</b><span>${_esc(miss.a.t)}</span></span>
      </div>` : ''}
    ${selosStrip()}
    ${medalChips()}
    <div class="foot-row" style="margin-top:8px;">
      <button id="aod-share" class="btn btn-ghost btn-sm">${chalMine() ? 'Desafiar' : 'Compartilhar'}</button>
      <button id="aod-again" class="btn btn-brass">De novo</button>
      <button id="bhome" class="btn btn-ghost btn-sm">Início</button>
    </div>
  </div>`;
}

const aodShareText = () => `Antes ou depois? ⏳ History Quiz\n${'🟩'.repeat(Math.min(aod.score, 20))}${aod.score > 20 ? '…' : ''}${aod.all ? '' : '🟥'}\n${aod.score} ${aod.score === 1 ? 'acerto' : 'acertos'} seguidos${aod.isBest ? ' · recorde!' : ''}\n${chalShareTail(chalMine())}`;

/* the clock: a bar that empties; at zero the guess is a miss */
let _aodTmr = null;
function aodTick() {
  clearInterval(_aodTmr);
  const tok = aod.tok;
  _aodTmr = setInterval(() => {
    if (sc !== 'aod' || !aod || aod.phase !== 'guess' || aod.tok !== tok) { clearInterval(_aodTmr); return; }
    if (document.hidden) return;
    const left = aod.tMax - (performance.now() - aod.t0) / 1000;
    const tf = document.getElementById('aod-tf');
    if (tf) {
      tf.style.width = Math.max(0, left / aod.tMax * 100).toFixed(1) + '%';
      tf.className = left <= 2.5 ? 't-bad timer-low' : left <= 5 ? 't-warn' : '';
    }
    if (left <= 3 && left > 0 && Math.ceil(left) !== aod.lastTick) { aod.lastTick = Math.ceil(left); try { snd.tick(aod.lastTick); } catch (e) {} }
    if (left <= 0) { clearInterval(_aodTmr); aodAnswer(null); }
  }, 100);
}

/* the hidden year, at the reveal, runs from the last year to its own, like the drum of a date stamp */
function aodRoll() {
  const el = document.getElementById('aod-yb');
  if (!el || aod.rolled) return;
  aod.rolled = true;
  const { a, b } = aod, txt = aodYear(b);
  if (FX_STILL) { el.textContent = txt; return; }
  const t0 = performance.now(), dur = 520;
  const land = setTimeout(() => { el.textContent = txt; }, dur + 80);
  let lastK = 0;
  const step = now => {
    if (!document.body.contains(el)) return clearTimeout(land);
    const k = Math.min(1, (now - t0) / dur), y = Math.round(a.y + (b.y - a.y) * (1 - Math.pow(1 - k, 3)));
    el.textContent = k >= 1 ? txt : anoYear(y === 0 ? (b.y < 0 ? -1 : 1) : y);
    if (k - lastK > .12) { lastK = k; try { snd.count(k); } catch (e) {} }
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function wireAod() {
  if (!aod) return;
  const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  const ready = tapArmed();
  on('aod-antes', () => { if (ready()) aodAnswer('antes'); });
  on('aod-depois', () => { if (ready()) aodAnswer('depois'); });
  on('aod-next', () => { if (ready()) { snd.swipe(); aodNext(); } });
  on('aod-again', () => { snd.select(); startAod(); });
  on('aod-share', () => {
    const txt = aodShareText();
    if (navigator.share) navigator.share({ text: txt }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(txt).then(() => {
      const b = document.getElementById('aod-share'); if (b) { b.dataset.l = b.dataset.l || b.textContent; b.textContent = 'Copiado!'; setTimeout(() => { b.textContent = b.dataset.l; }, 1600); } }).catch(() => {});
  });
  aod.shift = false;
  if (aod.phase === 'guess') aodTick();
  if (aod.phase === 'reveal') {
    aodRoll();
    /* a right answer moves on by itself (a tap is quicker); a miss waits to be read */
    if (aod.ok && !aod.adv) {
      const tok = aod.tok;
      aod.adv = setTimeout(() => { aod.adv = null; if (sc === 'aod' && aod.phase === 'reveal' && aod.tok === tok) aodNext(); }, aod.wait || 1500);
    }
  } else aod.adv = null;
}
/* the clock stops while the app is away (a call, another app) and goes on from where it was */
document.addEventListener('visibilitychange', () => {
  if (!aod || aod.phase !== 'guess') return;
  if (document.hidden) aod.hid = performance.now();
  else if (aod.hid) { aod.t0 += performance.now() - aod.hid; aod.hid = 0; }
});
/* the keyboard: up or left is before, down or right is after, Enter goes on */
document.addEventListener('keydown', ev => {
  if (sc !== 'aod' || !aod || ev.altKey || ev.ctrlKey || ev.metaKey) return;
  if (aod.phase === 'guess' && (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft')) { ev.preventDefault(); aodAnswer('antes'); }
  else if (aod.phase === 'guess' && (ev.key === 'ArrowDown' || ev.key === 'ArrowRight')) { ev.preventDefault(); aodAnswer('depois'); }
  else if (aod.phase === 'reveal' && ev.key === 'Enter' && document.activeElement === document.body) { ev.preventDefault(); aodNext(); }
});
