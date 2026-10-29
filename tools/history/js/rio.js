
/* ═══════════════════════════════════════════════════
   RIO DO TEMPO — an arcade game on the river of the centuries. Notes in
   bottles float down, each with an event on it; the banner says which
   century to fish. Tap the ones from that century: a catch scores, more
   for a run of them; a note from another century costs one of three
   nets. Every few catches the banner moves to another century. The river
   runs faster as the minute and a half goes on. Pure reflex and a sense
   of when things happened — the opposite of the slow, thinking games.
═══════════════════════════════════════════════════ */
const RIO_TIME = 90, RIO_LIVES = 3, RIO_LANES = 3;
const rioCent = y => y > 0 ? Math.ceil(y / 100) : -Math.ceil(-y / 100);
const RIO_ROM = n => { let s = ''; [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]
  .forEach(([v, r]) => { while (n >= v) { s += r; n -= v; } }); return s; };
const rioCentName = c => `século ${RIO_ROM(Math.abs(c))}${c < 0 ? ' a.C.' : ''}`;
const rioRange = c => c > 0 ? `de ${(c - 1) * 100 + 1} a ${c * 100}` : `de ${-c * 100} a ${(-c - 1) * 100 + 1} a.C.`;
let rio = null;   // { t, lives, score, combo, best, target, caught, notes: [], next, id, phase, log, speed }

/* the centuries that have enough events to be fished for */
let _rioByC = null;
function rioByC() {
  if (_rioByC) return _rioByC;
  _rioByC = {};
  ANO_EVENTS.filter(e => !e.c && e.t.length <= 64).forEach(e => { const c = rioCent(e.y); (_rioByC[c] = _rioByC[c] || []).push(e); });
  return _rioByC;
}
const rioTargets = () => Object.keys(rioByC()).map(Number).filter(c => rioByC()[c].length >= 6);

function rioNew() {
  rio = { t: 0, lives: RIO_LIVES, score: 0, combo: 0, best: 0, target: null, inTarget: 0, notes: [], next: .4, id: 0, phase: 'intro', log: [], used: new Set(), best0: LS.get('rioBest', 0) };
  rioNewTarget();
}
function rioNewTarget() {
  const ts = rioTargets().filter(c => c !== rio.target);
  rio.target = ts[Math.floor(Math.random() * ts.length)];
  rio.inTarget = 0; rio.flash = performance.now();
}
function startRio() { isDaily = false; isSurv = false; isMil = false; isRev = false; rioNew(); sc = 'rio'; go(); }

/* a new note: about half from the century being fished, the rest from its neighbours, never one already seen */
function rioSpawn() {
  const by = rioByC(), want = Math.random() < .46;
  const near = Object.keys(by).map(Number).filter(c => c !== rio.target && Math.abs(c - rio.target) <= 3);
  const cs = want ? [rio.target] : (near.length ? near : Object.keys(by).map(Number).filter(c => c !== rio.target));
  const c = cs[Math.floor(Math.random() * cs.length)], pool = (by[c] || []).filter(e => !rio.used.has(e.id));
  const e = pool.length ? pool[Math.floor(Math.random() * pool.length)] : (by[c] || [])[0];
  if (!e) return;
  rio.used.add(e.id);
  /* a lane no note is still entering */
  const free = [...Array(RIO_LANES).keys()].filter(l => !rio.notes.some(n => n.lane === l && n.y < 34));
  if (!free.length) return;
  rio.notes.push({ id: ++rio.id, e, lane: free[Math.floor(Math.random() * free.length)], y: -30, rot: (Math.random() * 8 - 4).toFixed(1), state: 'float' });
}
const rioSpeed = () => 15 + rio.t * .32;      // % of the river's height a second

/* the river moves on by dt seconds (the game loop calls it; the tests can too) */
function rioStep(dt) {
  if (!rio || rio.phase !== 'play') return;
  rio.t += dt;
  rio.next -= dt;
  if (rio.next <= 0) { rioSpawn(); rio.next = Math.max(.62, 1.35 - rio.t * .008); }
  const v = rioSpeed();
  rio.notes.forEach(n => {
    if (n.state !== 'float') { n.age = (n.age || 0) + dt; return; }
    n.y += v * dt;
    if (n.y > 104) { n.state = 'gone'; if (rioCent(n.e.y) === rio.target) { rio.combo = 0; n.missed = true; } }
  });
  rio.notes = rio.notes.filter(n => n.state === 'float' || (n.age || 0) < .7);
  if (rio.t >= RIO_TIME) rioEnd();
}
function rioTap(id) {
  const n = rio && rio.phase === 'play' && rio.notes.find(x => x.id === id && x.state === 'float');
  if (!n) return;
  const ok = rioCent(n.e.y) === rio.target;
  n.state = ok ? 'caught' : 'wrong'; n.age = 0;
  rio.log.push({ e: n.e, ok, target: rio.target });
  if (ok) {
    rio.combo++; rio.best = Math.max(rio.best, rio.combo);
    const gain = 10 * Math.min(5, 1 + Math.floor(rio.combo / 3));
    rio.score += gain; n.gain = gain; rio.inTarget++;
    try { snd.correct(Math.min(rio.combo - 1, 8)); haptic(12); } catch (e) {}
    if (rio.inTarget >= 6) rioNewTarget();
  } else {
    rio.combo = 0; rio.lives--;
    try { snd.wrong(); haptic([28, 45, 28]); } catch (e) {}
    if (rio.lives <= 0) { rioEnd(); return; }
  }
  rioDraw();
}
function rioEnd() {
  if (rio.phase === 'end') return;
  rio.phase = 'end';
  stats.rioGames = (stats.rioGames || 0) + 1; stats.rioBest = Math.max(stats.rioBest || 0, rio.score);
  rio.isBest = rio.score > rio.best0;
  if (rio.isBest) LS.set('rioBest', rio.score);
  LS.set('stats', stats);
  window._newMedals = newMedals();
  go();
  setTimeout(() => { try { snd.final(rio.score >= 200); if (rio.isBest && rio.score >= 100) fx.rain(50, ['#2E6B8A', '#E0B968', '#F3EEDE']); } catch (e) {} }, 250);
}

/* the notes are drawn straight into the river, frame by frame, without a full redraw of the page */
function rioNoteHtml(n) {
  const yr = n.state !== 'float';
  return `<button class="rio-note is-${n.state}" data-id="${n.id}" type="button" style="--l:${n.lane};--r:${n.rot}deg" tabindex="-1">
    <span class="rio-pic">${anoPic(n.e)}</span><span class="rio-t">${_esc(n.e.t)}</span>
    ${yr ? `<b class="rio-y">${anoYear(n.e.y)}${n.gain ? ` · +${n.gain}` : ''}</b>` : ''}</button>`;
}
function rioDraw() {
  const box = document.getElementById('rio-water');
  if (!box || !rio) return;
  const have = new Map([...box.querySelectorAll('.rio-note')].map(el => [+el.dataset.id, el]));
  rio.notes.forEach(n => {
    let el = have.get(n.id);
    if (!el || el.dataset.st !== n.state) {
      const tmp = document.createElement('div'); tmp.innerHTML = rioNoteHtml(n).trim();
      const nel = tmp.firstChild; nel.dataset.st = n.state;
      if (el) el.replaceWith(nel); else box.appendChild(nel);
      el = nel;
    }
    el.style.top = n.y.toFixed(2) + '%';
    have.delete(n.id);
  });
  have.forEach(el => el.remove());
  const set = (id, v) => { const el = document.getElementById(id); if (el && el.textContent !== String(v)) el.textContent = v; };
  set('rio-score', rio.score); set('rio-combo', rio.combo >= 3 ? `×${Math.min(5, 1 + Math.floor(rio.combo / 3))}` : '');
  const tf = document.getElementById('rio-tf'); if (tf) tf.style.width = Math.max(0, 100 - rio.t / RIO_TIME * 100).toFixed(1) + '%';
  const tg = document.getElementById('rio-target'); if (tg && tg.dataset.c !== String(rio.target)) {
    tg.dataset.c = rio.target; tg.querySelector('b').textContent = rioCentName(rio.target);
    tg.classList.remove('is-new'); void tg.offsetWidth; tg.classList.add('is-new');
    const yr = tg.querySelector('small'); if (yr) yr.textContent = rioRange(rio.target);
  }
  const lv = document.getElementById('rio-lives'); if (lv) lv.innerHTML = rioLives();
}
const rioLives = () => Array.from({ length: RIO_LIVES }, (_, i) => `<i class="${i < rio.lives ? 'on' : ''}">${ICON.shield('currentColor', 13)}</i>`).join('');

function rioHtml() {
  if (!rio) rioNew();
  if (rio.phase === 'end') return rioEndHtml();
  return `
  <div class="pg rio-pg">
    ${topbar('Rio do tempo', fromGab ? 'bgab' : '')}
    <div class="rio-head">
      <span class="rio-lives" id="rio-lives" aria-label="Redes">${rioLives()}</span>
      <span class="rio-score"><b class="num" id="rio-score">${rio.score}</b> pts <em id="rio-combo"></em></span>
    </div>
    <div class="rio-target" id="rio-target" data-c="${rio.target}" role="status"><span>Pesque o</span><b>${rioCentName(rio.target)}</b><small>${rioRange(rio.target)}</small></div>
    <div class="rio-time"><i id="rio-tf" style="width:100%"></i></div>
    <div class="rio-water" id="rio-water">
      ${rio.phase === 'intro' ? `<div class="rio-intro">
        <span class="rio-intro-ic" aria-hidden="true">${(QICON.ship || QICON.scroll)(80)}</span>
        <p>Bilhetes descem o rio, cada um com um acontecimento. <b>Toque só nos do século da faixa</b> — a faixa muda de século de tempos em tempos. Errou, perde uma rede.</p>
        <button id="rio-go" class="btn btn-brass btn-lg" type="button">${ICON.play('currentColor', 13)} Remar!</button></div>` : ''}
    </div>
  </div>`;
}
function rioEndHtml() {
  const ok = rio.log.filter(l => l.ok), bad = rio.log.filter(l => !l.ok).slice(-3);
  return `
  <div class="pg pg-center rio-pg rio-end">
    <div class="eyebrow">Rio do tempo</div>
    <div class="display" style="font-size:28px;"><em>${rio.lives <= 0 ? 'As redes se rasgaram!' : 'Fim da correnteza!'}</em></div>
    ${wreathed(rio.score >= 300, `<div class="display prize-pop brass" style="font-size:54px;">${rio.score}<span class="muted" style="font-size:16px;"> pts</span></div>`)}
    <p class="small muted" style="margin:0;">${ok.length} ${ok.length === 1 ? 'pesca' : 'pescas'} · maior sequência ${rio.best} · ${rio.isBest ? 'seu novo recorde!' : 'recorde ' + rio.best0}</p>
    ${bad.length ? `<div class="mf-miss"><span class="mf-miss-k">Fisgados por engano</span>${bad.map(l => `<span class="mf-miss-row"><b class="is-m">${anoYear(l.e.y)}</b><span>${_esc(l.e.t)} <small class="muted">(pescando o ${rioCentName(l.target)})</small></span></span>`).join('')}</div>` : ''}
    ${medalChips()}
    <div class="foot-row" style="margin-top:6px;">
      <button id="rio-again" class="btn btn-brass" type="button">De novo</button>
      <button id="${fromGab ? 'bgab' : 'bhome'}" class="btn btn-ghost btn-sm" type="button">${fromGab ? 'Gabinete' : 'Início'}</button>
    </div>
  </div>`;
}
let _rioRaf = 0;
function wireRio() {
  if (!rio) return;
  const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  on('rio-go', () => { snd.rung(); rio.phase = 'play'; go(); });
  on('rio-again', () => { snd.select(); startRio(); });
  const box = document.getElementById('rio-water');
  if (box) box.addEventListener('pointerdown', e => { const n = e.target.closest('.rio-note'); if (n) { e.preventDefault(); rioTap(+n.dataset.id); } });
  cancelAnimationFrame(_rioRaf);
  if (rio.phase === 'play') {
    rioDraw();
    let last = performance.now();
    const loop = now => {
      if (sc !== 'rio' || !rio || rio.phase !== 'play') return;
      const dt = Math.min(.1, (now - last) / 1000); last = now;
      if (!document.hidden) { rioStep(dt); if (rio.phase === 'play') rioDraw(); }
      if (rio.phase === 'play') _rioRaf = requestAnimationFrame(loop);
    };
    _rioRaf = requestAnimationFrame(loop);
  }
}
