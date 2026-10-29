
/* ═══════════════════════════════════════════════════
   SUPER TRUNFO DA HISTÓRIA — the album becomes a deck. Ten of your own
   stickers (or cards on loan, while the album is thin) against ten of the
   Arquivista's. Each card has five numbers: how long ago its figure was
   born, how many years they lived, how famous they are in this game (how
   many questions are about them), their Poder and their Saber. Whoever
   won the last round calls a number from their top card; the higher one
   takes both cards. One card of the twenty is the Super Trunfo: it beats
   every card except those of group A, the Antiguidade.
═══════════════════════════════════════════════════ */
const TF_N = 10, TF_MAX = 18;
const TF_STATS = [['ant', 'Antiguidade', 'anos atrás', 'hourglass'], ['vida', 'Longevidade', 'anos de vida', 'flame'],
  ['fama', 'Fama', 'pontos', 'star'], ['poder', 'Poder', 'pontos', 'crown'], ['saber', 'Saber', 'pontos', 'book']];
const TF_GROUP = y => y < 476 ? 'A' : y < 1453 ? 'B' : y < 1789 ? 'C' : 'D';
/* fame: how many questions in the game are about the figure, as a place among them all (1 to 99) */
let _tfFame = null;
function tfFame(id) {
  if (!_tfFame) {
    const n = {};
    CATS.forEach(c => c.qs.forEach(q => (q.a || []).forEach(a => { n[a] = (n[a] || 0) + 1; })));
    const order = PL.slice().sort((a, b) => (n[a.id] || 0) - (n[b.id] || 0) || a.era[0] - b.era[0]);
    _tfFame = {}; order.forEach((p, i) => { _tfFame[p.id] = 1 + Math.round(i / (order.length - 1) * 98); });
  }
  return _tfFame[id] || 1;
}
/* Poder and Saber lean on what the figure was (a ruler is strong, a thinker wise), and the rest is the card's own luck */
const TF_LEAN = { GOV: [70, 30], GEN: [68, 24], REV: [54, 44], EXP: [42, 54], PEN: [22, 70], ART: [16, 60] };
function tfStats(p) {
  let h = 7; for (const c of p.id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const [pw, sb] = TF_LEAN[p.pos] || [40, 40];
  return { ant: ANO_NOW - p.era[0], vida: p.era[1] - p.era[0], fama: tfFame(p.id), poder: Math.min(99, pw + h % 30), saber: Math.min(99, sb + (h >>> 8) % 30) };
}
let tf = null;   // { me: [card], cpu: [card], pot: [card], turn, phase: 'pick'|'cpu'|'show'|'end', stat, win, round, loaned }

function tfNew() {
  const own = shuf(PL.filter(p => p.img && album.has(p.id)));
  const mine = own.slice(0, TF_N), loaned = Math.max(0, TF_N - mine.length);
  const rest = shuf(PL.filter(p => p.img && !mine.includes(p)));
  mine.push(...rest.splice(0, loaned));
  const theirs = rest.slice(0, TF_N);
  const card = (p, i, side) => ({ p, s: tfStats(p), g: TF_GROUP(p.era[0]), loan: side === 'me' && i >= TF_N - loaned });
  const me = mine.map((p, i) => card(p, i, 'me')), cpu = theirs.map((p, i) => card(p, i, 'cpu'));
  /* the Super Trunfo: the most famous card of the twenty */
  const all = me.concat(cpu), st = all.reduce((a, b) => b.s.fama > a.s.fama ? b : a);
  st.st = true;
  /* each card's number in its group, as the printed decks had them: A1, A2…, B1… */
  const num = {}; all.slice().sort((a, b) => a.p.era[0] - b.p.era[0]).forEach(c => { num[c.g] = (num[c.g] || 0) + 1; c.code = c.g + num[c.g]; });
  tf = { me, cpu, pot: [], turn: 'me', phase: 'pick', stat: null, round: 1, loaned };
}
function startTrunfo() { isDaily = false; isSurv = false; isMil = false; isRev = false; tfNew(); sc = 'trunfo'; go(); }

/* who takes the round on a number: the Super Trunfo beats all but group A; otherwise the higher number */
function tfBeats(a, b, k) {
  if (a.st && b.g !== 'A') return 1;
  if (b.st && a.g !== 'A') return -1;
  return Math.sign(a.s[k] - b.s[k]);
}
/* the Arquivista calls the number its card is best at, against the whole pack */
let _tfRank = null;
function tfCpuPick(c) {
  if (!_tfRank) { _tfRank = {}; TF_STATS.forEach(([k]) => { _tfRank[k] = PL.map(p => tfStats(p)[k]).sort((a, b) => a - b); }); }
  const pct = k => { const a = _tfRank[k]; let i = 0; while (i < a.length && a[i] < c.s[k]) i++; return i / a.length; };
  return TF_STATS.map(([k]) => k).reduce((a, b) => pct(b) > pct(a) ? b : a);
}
function tfPlay(k) {
  if (!tf || (tf.phase !== 'pick' && tf.phase !== 'cpu')) return;
  const a = tf.me.shift(), b = tf.cpu.shift(), r = tfBeats(a, b, k);
  tf.stat = k; tf.shown = [a, b]; tf.win = r; tf.phase = 'show';
  if (r > 0) { tf.me.push(a, b, ...tf.pot); tf.pot = []; tf.turn = 'me'; }
  else if (r < 0) { tf.cpu.push(b, a, ...tf.pot); tf.pot = []; tf.turn = 'cpu'; }
  else tf.pot.push(a, b);
  try { r > 0 ? snd.correct(0) : r < 0 ? snd.wrong() : snd.almost(); } catch (e) {}
  go();
  if (r > 0) requestAnimationFrame(() => { try { fx.splash(document.querySelector('.tf-card.is-me'), '#3A9C6E', 9); } catch (e) {} });
}
function tfNext() {
  if (!tf || tf.phase !== 'show') return;
  tf.round++;
  if (!tf.me.length || !tf.cpu.length || tf.round > TF_MAX) return tfEnd();
  tf.shown = null; tf.stat = null;
  tf.phase = tf.turn === 'me' ? 'pick' : 'cpu';
  go();
}
function tfEnd() {
  tf.phase = 'end';
  const m = tf.me.length, c = tf.cpu.length;
  tf.result = m > c ? 1 : m < c ? -1 : 0;
  stats.tfGames = (stats.tfGames || 0) + 1;
  if (tf.result > 0) { stats.tfWins = (stats.tfWins || 0) + 1; if (!tf.loaned) stats.tfOwnWins = (stats.tfOwnWins || 0) + 1; }
  LS.set('stats', stats);
  window._newMedals = newMedals();
  go();
  setTimeout(() => { try { if (tf.result > 0) { snd.fanfare(); fx.rain(60); } else snd.final(tf.result === 0); } catch (e) {} }, 250);
}

/* a card as the old decks printed it: its code and group colour, the portrait, the name, five numbers */
function tfCardHtml(c, side, open) {
  if (!open) return `<div class="tf-card tf-back is-${side}" aria-label="Carta virada"><span class="tf-back-in">${ICON.crown('currentColor', 26)}<b>Super Trunfo</b><small>da História</small></span></div>`;
  const pick = side === 'me' && tf.phase === 'pick', shown = tf.phase === 'show';
  return `<div class="tf-card tf-g${c.g} is-${side}${c.st ? ' is-st' : ''}${shown ? (tf.win === 0 ? ' is-tie' : (tf.win > 0) === (side === 'me') ? ' is-win' : ' is-lose') : ''}">
    <span class="tf-top"><b class="tf-code">${c.code}</b>${c.st ? '<span class="tf-st">Super Trunfo</span>' : c.loan ? '<span class="tf-loan">emprestada</span>' : ''}</span>
    <span class="tf-pic"><img src="${c.p.img}" alt="" draggable="false"></span>
    <span class="tf-nm">${_esc(c.p.n)}</span>
    <span class="tf-rows">${TF_STATS.map(([k, n, u, ic]) => `<${pick ? 'button type="button"' : 'span'} class="tf-row${tf.stat === k ? ' is-on' : ''}" data-k="${k}">
      ${(ICON[ic] || ICON.star)('currentColor', 11)}<span class="tf-k">${n}</span><b class="num">${c.s[k].toLocaleString('pt-BR')}</b></${pick ? 'button' : 'span'}>`).join('')}</span>
    ${c.st ? '<span class="tf-st-rule">vence todas, menos as do grupo A</span>' : ''}
  </div>`;
}
function trunfoHtml() {
  if (!tf) tfNew();
  if (tf.phase === 'end') return tfEndHtml();
  const show = tf.phase === 'show', [a, b] = show ? tf.shown : [tf.me[0], tf.cpu[0]];
  const S = tf.stat && TF_STATS.find(s => s[0] === tf.stat);
  const why = show && S ? (a.st && b.g !== 'A' && tf.win > 0 ? 'O Super Trunfo vence!' : b.st && a.g !== 'A' && tf.win < 0 ? 'O Super Trunfo do Arquivista vence!'
    : `${S[1]}: ${a.s[tf.stat].toLocaleString('pt-BR')} × ${b.s[tf.stat].toLocaleString('pt-BR')}`) : '';
  return `
  <div class="pg tf-pg">
    ${topbar('Super Trunfo', fromGab ? 'bgab' : '')}
    <div class="tf-score">
      <span class="tf-pile is-me"><b class="num">${tf.me.length}</b><small>suas cartas</small></span>
      <span class="tf-round">Rodada ${tf.round}${tf.pot.length ? ` · <b>${tf.pot.length}</b> na mesa` : ''}</span>
      <span class="tf-pile is-cpu"><b class="num">${tf.cpu.length}</b><small>do Arquivista</small></span>
    </div>
    <div class="tf-table">
      ${tfCardHtml(a, 'me', true)}
      <span class="tf-vs" aria-hidden="true">×</span>
      ${tfCardHtml(b, 'cpu', show)}
    </div>
    <div class="tf-say" role="status">${tf.phase === 'pick' ? '<b>Sua vez:</b> toque no número em que a sua carta é mais forte.'
      : tf.phase === 'cpu' ? '<b>O Arquivista</b> está escolhendo…'
      : `<b class="${tf.win > 0 ? 'good' : tf.win < 0 ? 'bad' : 'brass'}">${tf.win > 0 ? 'Você leva as cartas!' : tf.win < 0 ? 'O Arquivista leva.' : 'Empate: as cartas ficam na mesa.'}</b> <span>${why}</span>`}</div>
    ${show ? '<button id="tf-next" class="btn btn-brass" type="button">Próxima rodada</button>' : ''}
  </div>`;
}
function tfEndHtml() {
  const r = tf.result;
  return `
  <div class="pg pg-center tf-pg tf-end">
    <div class="eyebrow">Super Trunfo da História</div>
    <div class="tf-fan" aria-hidden="true">${(r >= 0 ? tf.me : tf.cpu).slice(0, 5).map((c, i) => `<span style="--i:${i}"><img src="${c.p.img}" alt=""></span>`).join('')}</div>
    <div class="display" style="font-size:28px;"><em>${r > 0 ? 'Você venceu o Arquivista!' : r < 0 ? 'O Arquivista venceu' : 'Empate!'}</em></div>
    <p class="small muted" style="margin:0;">${tf.me.length} × ${tf.cpu.length} cartas${tf.round > TF_MAX ? ' no fim das rodadas' : ''}${tf.loaned ? ` · ${tf.loaned} ${tf.loaned === 1 ? 'carta emprestada' : 'cartas emprestadas'}: cole mais figurinhas para jogar só com as suas` : ''}</p>
    ${medalChips()}
    <div class="foot-row" style="margin-top:6px;">
      <button id="tf-again" class="btn btn-brass" type="button">Nova partida</button>
      <button id="${fromGab ? 'bgab' : 'bhome'}" class="btn btn-ghost btn-sm" type="button">${fromGab ? 'Gabinete' : 'Início'}</button>
    </div>
  </div>`;
}
function wireTrunfo() {
  if (!tf) return;
  const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  const ready = tapArmed(250);
  document.querySelectorAll('button.tf-row').forEach(b => b.addEventListener('click', () => { if (ready()) tfPlay(b.dataset.k); }));
  on('tf-next', () => { if (ready()) { snd.swipe(); tfNext(); } });
  on('tf-again', () => { snd.select(); startTrunfo(); });
  /* the Arquivista thinks, then calls */
  if (tf.phase === 'cpu') { const r = tf.round; setTimeout(() => { if (sc === 'trunfo' && tf && tf.phase === 'cpu' && tf.round === r) tfPlay(tfCpuPick(tf.cpu[0])); }, 1100); }
}
