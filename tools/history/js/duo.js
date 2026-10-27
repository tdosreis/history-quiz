
/* ═══════════════════════════════════════════════════
   DUELO A DOIS — two players, one phone
   Two names, so many questions each, a difficulty. The questions take
   turns: before each one the phone is passed ("Vez de Ana"), the player
   plays it on the game's own board with their own score, streak and
   lifelines, and the bar over the board shows both scores. The questions
   are dealt in pairs of the same difficulty, so neither gets the easier
   game. At the end, the winner is crowned.
═══════════════════════════════════════════════════ */
const DUO_COL = ['#2E5E7E', '#9B2226'];
let duo = null;    // { names, n, diff, p: [{ pts, nc, np, streak, best, log, lifes }], phase: 'setup'|'pass'|'end' }

function duoNew() {
  const kept = LS.get('duo', null);
  return { names: kept && kept.names || ['', ''], n: kept && kept.n || 8, diff: kept && kept.diff || 'moderado', phase: 'setup' };
}
function startDuoSetup() { duo = duoNew(); sc = 'duo'; go(); }
const duoName = i => (duo.names[i] || '').trim() || 'Jogador ' + (i + 1);
const duoTurn = () => qi % 2;

/* deal: twice as many questions as each plays, no answer twice, paired by difficulty (one for each) */
function startDuo() {
  isDaily = false; isSurv = false; isMil = false; isRev = false;
  diffKey = duo.diff; runSeed = null;
  const want = duo.n * 2, seenA = new Set(), pool = [];
  for (let k = 0; k < 6 && pool.length < want; k++)
    buildGame(duo.diff).qs.forEach(q => { const a = ansKey(q); if (pool.length < want && !seenA.has(a)) { seenA.add(a); pool.push(q); } });
  pool.sort((a, b) => (a._d || 0) - (b._d || 0));
  cat = { id: 'duo', name: 'Duelo a dois', emoji: '⚔️', tag: duoName(0) + ' × ' + duoName(1), col: '#7B2D26', diff: (DIFFS.find(d => d.key === duo.diff) || {}).label, qs: pool, duo: true };
  LS.set('duo', { names: duo.names, n: duo.n, diff: duo.diff });
  resetLifes();
  duo.p = [0, 1].map(() => ({ pts: 0, nc: 0, np: 0, streak: 0, best: 0, log: [], hist: [], lifes: Object.assign({}, lifes) }));
  qi = 0; sel.clear(); lastGain = 0; runNew = 0; runNewIds = []; runPulls = []; runSelos = []; runPackOpened = false; gameN++;
  duo.phase = 'pass';
  sc = 'duo';
  go();
}
/* a player's own score, streak and lifelines, in and out of the board */
function duoLoad(i) {
  const s = duo.p[i];
  pts = s.pts; prevPts = s.pts; nCorrect = s.nc; nPartial = s.np; streak = s.streak; bestStreak = s.best; runLog = s.log; lifes = s.lifes;
  hidden = new Set(); frozen = false; poll = null; expert = null;
}
function duoSave(i) { Object.assign(duo.p[i], { pts, nc: nCorrect, np: nPartial, streak, best: bestStreak, log: runLog, lifes }); }
/* "Estou pronto": the question comes up, the clock starts */
function duoGo() {
  duoLoad(duoTurn());
  sel.clear(); clearHelpers(); lastMsg = '';
  disp = dealDisp(qi); tMax = qTime(); tLeft = tMax;
  sc = 'quiz';
  startTmr();
  go();
}
/* after a reveal: the score goes back to its player, and the phone to the other one (or the duel ends) */
function duoAfter() {
  duoSave(duoTurn());
  duo.p[duoTurn()].hist.push(pts);
  qi++;
  sel.clear(); clearHelpers(); lastMsg = '';
  if (qi >= cat.qs.length) { duoEnd(); return; }
  duo.phase = 'pass';
  sc = 'duo';
  try { snd.page(); } catch (e) {}
}
function duoEnd() {
  clearInterval(tmr);
  duo.phase = 'end'; sc = 'duo';
  stats.duoGames = (stats.duoGames || 0) + 1;
  stats.games += 1; stats.correct += duo.p[0].nc + duo.p[1].nc; stats.answered += cat.qs.length;
  LS.set('stats', stats);
  window._newMedals = newMedals();
  _duoCel = true;
}
let _duoCel = false;

/* the last pass, said out loud: what the second player needs to turn it */
function duoStakes(t, k) {
  if (k !== duo.n) return '';
  if (t === 0) return `<span class="duo-stakes">Última pergunta de ${_esc(duoName(0))}</span>`;
  const need = duo.p[0].pts - duo.p[1].pts;
  return `<span class="duo-stakes is-hot">${need < 0 ? 'Já é seu: jogue pela glória.'
    : need === 0 ? 'Empate: qualquer ponto decide!'
    : `Precisa de ${need + 1} pontos para virar`}</span>`;
}
/* how the duel went, in one line: read from both scores after each round */
function duoVerdict() {
  const [a, b] = duo.p, n = Math.min(a.hist.length, b.hist.length);
  if (!n) return '';
  const lead = a.hist.slice(0, n).map((x, k) => x > b.hist[k] ? 0 : x < b.hist[k] ? 1 : -1);
  const win = a.pts === b.pts ? -1 : a.pts > b.pts ? 0 : 1, gap = Math.abs(a.pts - b.pts);
  if (win < 0) return a.pts ? 'Ponto a ponto até o fim: ninguém cedeu.' : 'Zero a zero. Fica para a revanche.';
  const W = _esc(duoName(win)), lose = 1 - win;
  let swaps = 0, was = -1;
  lead.forEach(l => { if (l >= 0) { if (was >= 0 && l !== was) swaps++; was = l; } });
  if (n >= 2 && lead[n - 2] === lose) return 'Virada na última rodada!';
  if (swaps >= 3) return `Vai e vem: a liderança trocou de mãos ${swaps} vezes.`;
  if (lead.includes(lose)) return `Virada! ${W} esteve atrás e terminou na frente.`;
  if (duo.p[win].nc === duo.n) return `${W} não errou nenhuma.`;
  if (gap <= 3) return `Por um fio: ${gap} ponto${gap > 1 ? 's' : ''} de diferença.`;
  if (!duo.p[lose].pts || duo.p[win].pts >= 3 * duo.p[lose].pts) return 'Vitória arrasadora.';
  if (lead.every(l => l === win)) return `${W} liderou do começo ao fim.`;
  return `${gap} pontos de vantagem.`;
}

const duoDots = s => `<span class="duo-dots" aria-hidden="true">${Array.from({ length: duo.n }, (_, k) => {
  const r = s.log[k]; return `<i class="${r === 3 ? 'rl-3' : r === 1 ? 'rl-1' : r === 0 || r === -1 ? 'rl-0' : ''}"></i>`; }).join('')}</span>`;
/* over the board: both players and their scores, the one playing lit */
function duoBar() {
  if (!cat || !cat.duo || !duo || !duo.p) return '';
  const t = duoTurn();
  return `<div class="duo-bar">${[0, 1].map(i => `<span class="duo-who${i === t ? ' is-on' : ''}" style="--pc:${DUO_COL[i]}">
    <b>${_esc(duoName(i))}</b><span class="num">${i === t ? pts : duo.p[i].pts}</span></span>`).join('<i class="duo-x">×</i>')}</div>`;
}

function duoHtml() {
  if (!duo) duo = duoNew();
  if (duo.phase === 'setup') return duoSetupHtml();
  if (duo.phase === 'end') return duoEndHtml();
  const t = duoTurn(), k = Math.floor(qi / 2) + 1, nm = duoName(t);
  return `
  <div class="pg duo-pg duo-pass" style="--pc:${DUO_COL[t]}">
    ${topbar('Duelo a dois', 'duo-quit')}
    <div class="duo-pass-in">
      <span class="duo-phone" aria-hidden="true"><svg viewBox="0 0 40 64"><rect x="3" y="3" width="34" height="58" rx="6" fill="#2A2420" stroke="#E8D8B0" stroke-width="2"/>
        <rect x="7" y="9" width="26" height="42" rx="2" fill="#F3EAD3"/><circle cx="20" cy="56" r="2.4" fill="#E8D8B0"/></svg></span>
      <span class="duo-disc" aria-hidden="true">${_esc(nm.slice(0, 1).toUpperCase())}</span>
      <div class="display duo-vez"><small>Vez de</small><em>${_esc(nm)}</em></div>
      <p class="small muted">Passe o celular. Sem espiar a pergunta do outro!</p>
      <span class="duo-k">Pergunta ${k} de ${duo.n}</span>
      ${duoStakes(t, k)}
      <div class="duo-score">${[0, 1].map(i => `<span class="duo-col${i === t ? ' is-on' : ''}" style="--pc:${DUO_COL[i]}"><b>${_esc(duoName(i))}</b>
        <span class="num">${duo.p[i].pts}</span>${duoDots(duo.p[i])}</span>`).join('')}</div>
      <button id="duo-go" class="btn btn-brass btn-lg" type="button">${ICON.play('currentColor', 13)} Estou pronto</button>
    </div>
  </div>`;
}

function duoSetupHtml() {
  return `
  <div class="pg duo-pg">
    ${topbar('Duelo a dois', 'duo-back')}
    <div class="duo-setup">
      <span class="chal-ic mode-disc mode-duo" aria-hidden="true">${ICON.sword('currentColor', 26)}</span>
      <div class="display" style="font-size:28px;"><em>Dois jogadores, um celular</em></div>
      <p class="small muted cron-menu-p">Cada um responde às suas perguntas, na sua vez, com os seus pontos e as suas ajudas. As perguntas vêm em pares do mesmo nível: ninguém fica com o jogo mais fácil.</p>
      <div class="duo-names">${[0, 1].map(i => `<label style="--pc:${DUO_COL[i]}"><span>Jogador ${i + 1}</span>
        <input id="duo-n${i}" type="text" maxlength="14" autocomplete="off" placeholder="Jogador ${i + 1}" value="${_esc(duo.names[i] || '')}"></label>`).join('')}</div>
      <div class="duo-opts" role="group" aria-label="Perguntas para cada um">${[5, 8, 10].map(n => `<button class="duo-opt${duo.n === n ? ' is-on' : ''}" data-n="${n}" type="button" aria-pressed="${duo.n === n}">${n}<small>cada</small></button>`).join('')}</div>
      <div class="duo-opts" role="group" aria-label="Dificuldade">${DIFFS.map(d => `<button class="duo-opt${duo.diff === d.key ? ' is-on' : ''}" data-d="${d.key}" type="button" aria-pressed="${duo.diff === d.key}">${d.label}</button>`).join('')}</div>
      <button id="duo-start" class="btn btn-brass btn-lg" type="button">${ICON.sword('currentColor', 13)} Começar o duelo</button>
    </div>
  </div>`;
}

function duoEndHtml() {
  const [a, b] = duo.p, win = a.pts === b.pts ? -1 : a.pts > b.pts ? 0 : 1;
  const crown = ICON.crown('#B8862F', 26);
  return `
  <div class="pg pg-center duo-pg duo-end">
    <div class="eyebrow">Duelo · ${duo.n} cada · ${(DIFFS.find(d => d.key === duo.diff) || {}).label}</div>
    <div class="display duo-win"><em>${win < 0 ? 'Empate!' : _esc(duoName(win)) + ' venceu!'}</em></div>
    <p class="duo-verdict">${duoVerdict()}</p>
    <div class="duo-podium">${[0, 1].map(i => { const s = duo.p[i];
      return `<div class="duo-pod${i === win ? ' is-win' : win >= 0 ? ' is-lose' : ''}" style="--pc:${DUO_COL[i]}">
        ${i === win ? `<span class="duo-crown">${crown}</span>` : ''}
        <span class="duo-disc">${_esc(duoName(i).slice(0, 1).toUpperCase())}</span>
        <b class="duo-pn">${_esc(duoName(i))}</b>
        <span class="duo-pts num">${s.pts}</span><small>pontos</small>
        <span class="duo-stat">${s.nc} de ${duo.n} certas${s.best >= 3 ? ` · ${ICON.flame('currentColor', 11)} ${s.best}` : ''}</span>
        ${duoDots(s)}
      </div>`; }).join('')}</div>
    ${medalChips()}
    <div class="foot-row" style="margin-top:8px;">
      <button id="duo-share" class="btn btn-ghost btn-sm" type="button">Compartilhar</button>
      <button id="duo-again" class="btn btn-brass" type="button">Revanche</button>
      <button id="duo-setup" class="btn btn-ghost btn-sm" type="button">Trocar</button>
      <button id="bhome" class="btn btn-ghost btn-sm" type="button">Início</button>
    </div>
  </div>`;
}

function wireDuo() {
  const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  const ready = tapArmed();
  /* the names are kept as they are typed */
  [0, 1].forEach(i => { const el = document.getElementById('duo-n' + i); if (el) el.addEventListener('input', () => { duo.names[i] = el.value.slice(0, 14); }); });
  document.querySelectorAll('.duo-opt').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.n) duo.n = +b.dataset.n; if (b.dataset.d) duo.diff = b.dataset.d; snd.tap(); go(); }));
  on('duo-start', () => { if (ready()) { snd.rung(); startDuo(); } });
  on('duo-go', () => { if (ready()) { snd.select(); duoGo(); } });
  on('duo-again', () => { if (ready()) { snd.rung(); startDuo(); } });
  on('duo-setup', () => { snd.swipe(); duo.phase = 'setup'; go(); });
  on('duo-back', () => { snd.swipe(); sc = fromGab ? 'gabinete' : 'difficulty'; go(); });
  on('duo-quit', () => { snd.swipe(); clearInterval(tmr); duo.phase = 'setup'; sc = fromGab ? 'gabinete' : 'difficulty'; go(); });
  on('duo-share', () => {
    const [a, b] = duo.p, sq = s => s.log.map(r => r === 3 ? '🟩' : r === 1 ? '🟨' : '🟥').join('');
    const txt = `⚔️ Duelo a dois · History Quiz\n${duoName(0)} ${a.pts} × ${b.pts} ${duoName(1)}\n${sq(a)} ${duoName(0)}\n${sq(b)} ${duoName(1)}\n${a.pts === b.pts ? 'Empate!' : (a.pts > b.pts ? duoName(0) : duoName(1)) + ' venceu!'} ${duoVerdict()}\n${CHAL_URL}`;
    if (navigator.share) navigator.share({ text: txt }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(txt).then(() => {
      const el = document.getElementById('duo-share'); if (el) { el.dataset.l = el.dataset.l || el.textContent; el.textContent = 'Copiado!'; setTimeout(() => { el.textContent = el.dataset.l; }, 1600); } }).catch(() => {});
  });
  /* the duel's end, the first time it is drawn: the winner's fanfare and paint */
  if (duo && duo.phase === 'end' && _duoCel) {
    _duoCel = false;
    const [a, b] = duo.p;
    setTimeout(() => { try { if (a.pts === b.pts) snd.final(true); else { snd.fanfare(); fx.rain(70, [DUO_COL[a.pts > b.pts ? 0 : 1], '#E0B968', '#F3EEDE']); } } catch (e) {} }, 250);
  }
}
