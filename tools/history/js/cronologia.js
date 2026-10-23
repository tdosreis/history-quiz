
/* ═══════════════════════════════════════════════════
   CRONOLOGIA — put each event in its place on the line of time
   The line starts with one event, its year shown. Each turn brings a new
   one, year hidden: the player taps the gap where it goes, before, between
   or after the ones already there. Right, and it takes its place with its
   year; wrong, and it still goes where it belongs, but a life goes with
   it. Three lives. The longer the line, the closer the years and the
   harder the gaps. Dealt from a seed, so a line can be sent to a friend.
   ANO_EVENTS (the Que ano? events) are above this line.
═══════════════════════════════════════════════════ */
const CRON_LIVES = 3;
let cron = null;           // { deck, line, cur, lives, score, phase: 'place'|'reveal'|'end', last, log, seed }

function buildCron() {
  const deck = shuf(ANO_EVENTS.slice());
  const first = deck.pop();
  return { deck, line: [first], cur: deck.pop(), lives: CRON_LIVES, score: 0, phase: 'place', last: null, log: [] };
}
function startCron() {
  isDaily = false; isSurv = false; isMil = false; isRev = false;
  runSelos = [];
  /* dealt from a seed, so the game can be sent to a friend as a challenge (js/desafio.js) */
  const seed = chalSeed('c');
  seedFrom(seed); cron = buildCron(); _seed = null;
  cron.seed = seed;
  sc = 'cron';
  go();
}
/* the gaps an event may go in: equal years fit either side of one another */
function cronFits(line, e, i) {
  return (i === 0 || line[i - 1].y <= e.y) && (i === line.length || e.y <= line[i].y);
}
const cronYear = e => (e.c ? 'c. ' : '') + anoYear(e.y);
const cronRow = (e, cls, id) => `<div class="cron-row${cls || ''}"${id ? ` id="${id}"` : ''} role="listitem">
      <b class="cron-y num${cronYear(e).length > 8 ? ' is-long' : ''}">${cronYear(e)}</b><span class="cron-t">${_esc(e.t)}</span></div>`;

function cronHtml() {
  if (!cron) cron = buildCron();
  if (cron.phase === 'end') return cronEndHtml();
  const rev = cron.phase === 'reveal', L = cron.last;
  const lives = Array.from({ length: CRON_LIVES }, (_, i) => `<i class="${i < cron.lives ? 'on' : ''}">${ICON.hourglass('currentColor', 15)}</i>`).join('');
  const rows = [];
  cron.line.forEach((e, i) => {
    if (!rev) rows.push(`<button class="cron-slot" data-slot="${i}" type="button" aria-label="${i ? `Entre ${cronYear(cron.line[i - 1])} e ${cronYear(e)}` : `Antes de ${cronYear(e)}`}"><span>${i ? 'aqui' : 'antes'}</span></button>`);
    const fresh = L && L.e === e;
    rows.push(cronRow(e, fresh && rev ? (L.ok ? ' is-good' : ' is-bad') : '', fresh ? 'cron-fresh' : ''));
  });
  if (!rev) rows.push(`<button class="cron-slot" data-slot="${cron.line.length}" type="button" aria-label="Depois de ${cronYear(cron.line[cron.line.length - 1])}"><span>depois</span></button>`);
  /* the first turn says the rules once, in the room the line has not yet taken */
  if (!rev && cron.line.length === 1) rows.push(`<p class="cron-hint">O ano de cada evento aparece quando ele entra na linha. Errou o lugar, perde uma das ${CRON_LIVES === 3 ? 'três' : CRON_LIVES} ampulhetas.</p>`);
  return `
  <div class="pg cron-pg${rev ? ' is-rev' : ''}">
    ${topbar('Cronologia')}
    <div class="ano-head"><span class="cron-lives" role="img" aria-label="${cron.lives} de ${CRON_LIVES} vidas">${lives}</span>
      <span class="ano-score"><b class="num">${cron.score}</b> na linha</span></div>
    ${rev ? `<div class="cron-res ${L.ok ? 'good' : 'bad'}" aria-live="polite">
        <p class="cron-res-h"><b>${L.ok ? 'Isso!' : 'Não era aí'}</b> <span class="num">${cronYear(L.e)}</span>${L.ok ? '' : ` <small>· ${cron.lives} ${cron.lives === 1 ? 'vida' : 'vidas'}</small>`}</p>
        ${L.selo ? seloWonLine(L.selo) : L.e.x ? `<p class="cron-res-x">${_esc(L.e.x)}</p>` : ''}
      </div>`
      : `<div class="onde-card cron-card">
      ${ondePic(cron.cur)}
      <div class="onde-tt"><p class="onde-t">${_esc(cron.cur.t)}</p><span class="onde-y">Toque onde entra na linha</span></div>
    </div>`}
    <div class="cron-line scroll-y" id="cron-line" role="list" aria-label="A linha do tempo, do mais antigo ao mais recente">${rows.join('')}</div>
    ${rev ? `<button id="cron-next" class="btn btn-brass">${cron.lives <= 0 || !cron.deck.length ? 'Ver resultado' : 'Próximo'}</button>` : ''}
  </div>`;
}

function cronEndHtml() {
  const best = LS.get('cronBest', 0);
  const msg = cron.score >= 20 ? 'Um cronista de verdade!' : cron.score >= 12 ? 'Ótima memória do tempo!' : cron.score >= 6 ? 'Nada mau!' : 'O tempo é traiçoeiro…';
  const wrong = new Set(cron.log.filter(l => !l.ok).map(l => l.e));
  return `
  <div class="pg pg-center ano-end cron-end" style="padding:22px 18px;gap:9px;">
    <div class="eyebrow">Cronologia · ${cron.line.length} eventos</div>
    <div class="display" style="font-size:28px;"><em>${msg}</em></div>
    <div class="display prize-pop brass" style="font-size:50px;letter-spacing:-.03em;">${cron.score}<span class="muted" style="font-size:18px;letter-spacing:0;"> na linha</span></div>
    ${chalBanner() || `<p class="small muted">${cron.isBest ? 'Seu novo recorde!' : `Recorde: ${best}`}</p>`}
    <div class="cron-line cron-line-end scroll-y" role="list" aria-label="A linha do tempo">${cron.line.map(e => cronRow(e, wrong.has(e) ? ' is-bad' : '')).join('')}</div>
    ${selosStrip()}
    ${medalChips()}
    <div class="foot-row" style="margin-top:8px;">
      <button id="cron-share" class="btn btn-ghost btn-sm">${chalMine() ? 'Desafiar' : 'Compartilhar'}</button>
      <button id="cron-again" class="btn btn-brass">De novo</button>
      <button id="bhome" class="btn btn-ghost btn-sm">Início</button>
    </div>
  </div>`;
}

function cronShareText() {
  /* a long line is shared by its first thirty */
  const grid = cron.log.slice(0, 30).map(l => l.ok ? '🟩' : '⬛').join('') + (cron.log.length > 30 ? '…' : '');
  return `Cronologia 📜 History Quiz\n${grid}\n${cron.score} ${cron.score === 1 ? 'evento' : 'eventos'} na linha\n${chalShareTail(chalMine())}`;
}

function cronPlace(i) {
  if (!cron || cron.phase !== 'place') return;
  const e = cron.cur, ok = cronFits(cron.line, e, i);
  /* right or wrong, it goes where it belongs */
  let at = i;
  if (!ok) { at = cron.line.findIndex(x => x.y > e.y); if (at < 0) at = cron.line.length; }
  cron.line.splice(at, 0, e);
  cron.log.push({ e, ok });
  cron.last = { e, ok };
  if (ok) {
    cron.score++;
    /* a long line is hard to place in: from the sixth on, an event with a scene is cancelled into the stamp album */
    if (cron.line.length >= 6 && e.pic && e.pic.scene && awardSelo(e.pic.scene)) cron.last.selo = e.pic.scene;
    snd.correct(Math.min(cron.score, 8));
  } else { cron.lives--; snd.wrong(); }
  try { cron.medals = (cron.medals || []).concat(newMedals()); } catch (err) {}
  cron.phase = 'reveal';
  go();
  if (ok && cron.score % 5 === 0) try { burst(16); } catch (err) {}
}
function cronNext() {
  if (!cron || cron.phase !== 'reveal') return;
  if (cron.lives <= 0 || !cron.deck.length) {
    cron.phase = 'end';
    stats.cronGames = (stats.cronGames || 0) + 1;
    stats.cronBest = Math.max(stats.cronBest || 0, cron.score);
    LS.set('stats', stats);
    cron.isBest = cron.score > LS.get('cronBest', 0);
    if (cron.isBest) LS.set('cronBest', cron.score);
    window._newMedals = (cron.medals || []).concat(newMedals());
    setTimeout(() => snd.final(cron.score >= 8), 200);
  } else {
    cron.cur = cron.deck.pop();
    cron.phase = 'place';
  }
  go();
}

/* the line keeps the newest event in the middle of its window, so the gaps around it are in reach */
function cronScroll() {
  const line = document.getElementById('cron-line'), el = document.getElementById('cron-fresh');
  if (line && el) line.scrollTop = Math.max(0, el.offsetTop - (line.clientHeight - el.offsetHeight) / 2);
}

function wireCron() {
  const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  const ready = tapArmed();
  document.querySelectorAll('.cron-slot').forEach(b => b.addEventListener('click', () => { if (ready()) cronPlace(+b.dataset.slot); }));
  on('cron-next', () => { if (ready()) { snd.swipe(); cronNext(); } });
  on('cron-again', () => { snd.select(); startCron(); });
  on('cron-share', () => {
    const txt = cronShareText();
    if (navigator.share) navigator.share({ text: txt }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(txt).then(() => {
      const b = document.getElementById('cron-share'); if (b) { b.dataset.l = b.dataset.l || b.textContent; b.textContent = 'Copiado!'; setTimeout(() => { b.textContent = b.dataset.l; }, 1600); } }).catch(() => {});
  });
  if (cron && cron.phase !== 'end') cronScroll();
}
