
/* ═══════════════════════════════════════════════════
   MÍMICA HISTÓRICA — the party game, for a room full of people and one
   phone. Two teams take turns; whoever holds the phone gets a card and a
   minute, and the card says how to play it: act it out without a word,
   draw it, or describe it without the three words printed under it. The
   team shouts the answer; Acertou! scores, Pular passes. After each turn
   the phone goes to the other team. The cards are the game's own: its
   figures, its monuments and its events.
═══════════════════════════════════════════════════ */
const MM_TIME = 60;
const MM_HOW = { act: ['🎭', 'Faça mímica', 'sem falar nada'], draw: ['✏️', 'Desenhe', 'sem letras nem números'], talk: ['🗣️', 'Descreva', 'sem dizer'] };
const MM_COL = ['#2E5E7E', '#9B2226'];
let mm = null;   // { teams, pts, rounds, turn, done, phase: 'setup'|'pass'|'play'|'sum'|'end', deck, card, log, t0, left }

/* the cards: a figure (with its portrait to help whoever plays it), a monument, an event; and how each is played */
function mmDeck() {
  const figs = PL.filter(p => p.img).map(p => ({ k: 'fig', t: p.n, p, sub: p.nick || POS_NAME[p.pos] }));
  const mons = (typeof MASCOTES !== 'undefined' ? MASCOTES : []).map(id => ({ k: 'mon', t: (stk(SK.msc(id)) || {}).n, sid: SK.msc(id), at: MONUMENT_AT[id], sub: 'Monumento' })).filter(c => c.t);
  const evs = ANO_EVENTS.filter(e => e.t.length <= 46).map(e => ({ k: 'ev', t: e.t, e, sub: anoYear(e.y) }));
  return shuf(shuf(figs).slice(0, 80).concat(shuf(mons), shuf(evs).slice(0, 60))).map(c => {
    c.how = c.k === 'ev' ? (rnd() < .5 ? 'talk' : 'act') : ['act', 'draw', 'talk'][Math.floor(rnd() * 3)];
    if (c.how === 'talk') c.no = mmBan(c);
    if (c.how === 'talk' && !c.no.length) c.how = 'draw';      // nothing to forbid: it is drawn instead
    return c;
  });
}
/* three words that may not be said: what would give the card away at once */
function mmBan(c) {
  const words = [];
  if (c.p) {
    words.push(CTRY_NAME[c.p.ctry] || '', { GOV: 'governo', GEN: 'guerra', PEN: 'ideia', ART: 'arte', REV: 'revolução', EXP: 'viagem' }[c.p.pos]);
    const nick = (c.p.nick || '').split(/\s+/).filter(w => w.length > 4).sort((a, b) => b.length - a.length)[0];
    if (nick) words.push(nick.replace(/[^\p{L}-]/gu, ''));
    const sur = c.p.n.split(' ').filter(w => w.length > 3).pop();
    if (sur && sur !== c.p.n && words.length < 4) words.push(sur);
  } else {
    if (c.at) words.push(placeName(c.at));
    (c.t.split(/\s+/).filter(w => w.length > 4).sort((a, b) => b.length - a.length)).slice(0, 3).forEach(w => words.push(w.replace(/[^\p{L}-]/gu, '')));
  }
  return [...new Set(words.filter(Boolean).map(w => w.toLowerCase()))].slice(0, 3);
}
/* a monument as its own picture, without the sticker's frame */
function mmMonArt(sid) {
  const st = stk(sid), m = st && MASCOTS[st.id] || {}, br = CL.find(c => c.id === m.p);
  return (MASC_ART[m.art] || (() => ''))(br && br.c1, br && br.c2);
}
function mmNew() {
  const kept = LS.get('mimica', null);
  mm = { teams: kept && kept.teams || ['Time Azul', 'Time Vermelho'], rounds: kept && kept.rounds || 3, pts: [0, 0], turn: 0, done: 0, phase: 'setup' };
}
function startMimica() { isDaily = false; isSurv = false; isMil = false; isRev = false; mmNew(); sc = 'mimica'; go(); }
function mmStart() {
  LS.set('mimica', { teams: mm.teams, rounds: mm.rounds });
  mm.deck = mmDeck(); mm.pts = [0, 0]; mm.turn = 0; mm.done = 0; mm.phase = 'pass';
  go();
}
function mmGo() {
  mm.phase = 'play'; mm.log = []; mm.card = mm.deck.shift(); mm.t0 = performance.now(); mm.left = MM_TIME;
  try { snd.rung(); } catch (e) {}
  go();
}
function mmMark(ok) {
  if (!mm || mm.phase !== 'play') return;
  mm.log.push({ c: mm.card, ok });
  if (ok) { mm.pts[mm.turn]++; try { snd.correct(Math.min(mm.log.filter(l => l.ok).length - 1, 6)); haptic(18); } catch (e) {} }
  else try { snd.swipe(); } catch (e) {}
  if (!mm.deck.length) mm.deck = mmDeck();
  mm.card = mm.deck.shift();
  const el = document.getElementById('mm-card');
  if (el && !FX_STILL) { el.classList.remove('is-in', 'is-ok', 'is-skip'); void el.offsetWidth; el.classList.add(ok ? 'is-ok' : 'is-skip'); setTimeout(() => { if (mm && mm.phase === 'play') go(); }, 180); }
  else go();
}
function mmTimeUp() {
  if (!mm || mm.phase !== 'play') return;
  mm.phase = 'sum';
  try { snd.drop(); haptic([60, 40, 60]); } catch (e) {}
  go();
}
function mmAfter() {
  mm.done++;
  if (mm.done >= mm.rounds * 2) {
    mm.phase = 'end';
    stats.mmGames = (stats.mmGames || 0) + 1; LS.set('stats', stats);
    window._newMedals = newMedals();
    setTimeout(() => { try { snd.fanfare(); fx.rain(70, [MM_COL[mm.pts[0] >= mm.pts[1] ? 0 : 1], '#E0B968', '#F3EEDE']); } catch (e) {} }, 250);
  } else { mm.turn = 1 - mm.turn; mm.phase = 'pass'; }
  go();
}

function mimicaHtml() {
  if (!mm) mmNew();
  const T = i => _esc(mm.teams[i] || 'Time ' + (i + 1));
  if (mm.phase === 'setup') return `
  <div class="pg mm-pg">
    ${topbar('Mímica histórica', fromGab ? 'bgab' : '')}
    <div class="mm-setup">
      <span class="mm-masks" aria-hidden="true">${(QICON.masks || QICON.scroll)(96)}</span>
      <div class="display" style="font-size:27px;"><em>Para jogar em turma</em></div>
      <p class="small muted mm-p">Dois times e um celular. Na sua vez, você recebe uma carta e um minuto: faça mímica, desenhe ou descreva sem dizer as palavras proibidas. Seu time grita a resposta!</p>
      <div class="duo-names mm-names">${[0, 1].map(i => `<label style="--pc:${MM_COL[i]}"><span>Time ${i + 1}</span>
        <input id="mm-n${i}" type="text" maxlength="16" autocomplete="off" value="${T(i)}"></label>`).join('')}</div>
      <div class="duo-opts" role="group" aria-label="Rodadas">${[2, 3, 4].map(n => `<button class="duo-opt${mm.rounds === n ? ' is-on' : ''}" data-r="${n}" type="button">${n}<small>rodadas</small></button>`).join('')}</div>
      <button id="mm-start" class="btn btn-brass btn-lg" type="button">${ICON.play('currentColor', 13)} Começar a festa</button>
    </div>
  </div>`;
  if (mm.phase === 'pass') return `
  <div class="pg mm-pg mm-pass" style="--pc:${MM_COL[mm.turn]}">
    ${topbar('Mímica histórica', 'mm-quit')}
    <div class="mm-board">${[0, 1].map(i => `<span class="mm-team${i === mm.turn ? ' is-on' : ''}" style="--pc:${MM_COL[i]}"><b>${T(i)}</b><span class="num">${mm.pts[i]}</span></span>`).join('')}</div>
    <div class="mm-pass-in">
      <span class="eyebrow">Rodada ${Math.floor(mm.done / 2) + 1} de ${mm.rounds}</span>
      <div class="display mm-vez"><small>Vez do</small><em>${T(mm.turn)}</em></div>
      <p class="small muted">Quem vai jogar pega o celular; o resto do time se prepara para adivinhar.</p>
      <span class="mm-hour" aria-hidden="true">${ICON.hourglass('currentColor', 30)}<b>${MM_TIME} s</b></span>
      <button id="mm-go" class="btn btn-brass btn-lg" type="button">${ICON.play('currentColor', 13)} Valendo!</button>
    </div>
  </div>`;
  if (mm.phase === 'play') { const c = mm.card, h = MM_HOW[c.how];
    return `
  <div class="pg mm-pg mm-play" style="--pc:${MM_COL[mm.turn]}">
    <div class="mm-bar"><span class="mm-team is-on" style="--pc:${MM_COL[mm.turn]}"><b>${T(mm.turn)}</b><span class="num" id="mm-pts">${mm.pts[mm.turn]}</span></span>
      <span class="mm-clock" id="mm-clock"><b class="num" id="mm-left">${Math.ceil(mm.left)}</b>s</span></div>
    <div class="mm-time"><i id="mm-tf" style="width:${(mm.left / MM_TIME * 100).toFixed(1)}%"></i></div>
    <div class="mm-card mm-${c.how} is-in" id="mm-card">
      <span class="mm-how">${h[0]} ${h[1]}<small>${h[2]}</small></span>
      ${c.p ? `<span class="mm-pic"><img src="${c.p.img}" alt="" draggable="false"></span>` : c.sid ? `<span class="mm-pic mm-pic-art">${mmMonArt(c.sid)}</span>` : `<span class="mm-pic mm-pic-ev">${anoPic(c.e)}</span>`}
      <b class="mm-t">${_esc(c.t)}</b>
      <small class="mm-sub">${_esc(c.sub || '')}</small>
      ${c.no ? `<span class="mm-ban">${c.no.map(w => `<s>${_esc(w)}</s>`).join('')}</span>` : ''}
    </div>
    <div class="mm-btns">
      <button id="mm-skip" class="mm-btn is-skip" type="button">Pular</button>
      <button id="mm-ok" class="mm-btn is-ok" type="button">${ICON.check('currentColor', 18)} Acertou!</button>
    </div>
  </div>`; }
  if (mm.phase === 'sum') { const got = mm.log.filter(l => l.ok).length;
    return `
  <div class="pg mm-pg" style="--pc:${MM_COL[mm.turn]}">
    ${topbar('Mímica histórica', 'mm-quit')}
    <div class="mm-sum">
      <span class="mm-times-up">Tempo!</span>
      <div class="display" style="font-size:26px;"><em>${T(mm.turn)}: ${got} ${got === 1 ? 'acerto' : 'acertos'}</em></div>
      <div class="mm-list">${mm.log.map(l => `<span class="mm-li${l.ok ? ' is-ok' : ''}">${l.ok ? ICON.check('currentColor', 12) : ICON.cross('currentColor', 12)} ${_esc(l.c.t)}</span>`).join('') || '<span class="mm-li">Nenhuma carta jogada</span>'}</div>
      <div class="mm-board">${[0, 1].map(i => `<span class="mm-team${i === mm.turn ? ' is-on' : ''}" style="--pc:${MM_COL[i]}"><b>${T(i)}</b><span class="num">${mm.pts[i]}</span></span>`).join('')}</div>
      <button id="mm-next" class="btn btn-brass btn-lg" type="button">${mm.done + 1 >= mm.rounds * 2 ? 'Ver o placar final' : `Passar para o ${T(1 - mm.turn)}`}</button>
    </div>
  </div>`; }
  const w = mm.pts[0] === mm.pts[1] ? -1 : mm.pts[0] > mm.pts[1] ? 0 : 1;
  return `
  <div class="pg pg-center mm-pg mm-end">
    <div class="eyebrow">Mímica histórica · ${mm.rounds} rodadas</div>
    <span class="mm-masks" aria-hidden="true">${(QICON.masks || QICON.scroll)(84)}</span>
    <div class="display" style="font-size:30px;"><em>${w < 0 ? 'Empate!' : T(w) + ' venceu!'}</em></div>
    <div class="mm-board mm-board-end">${[0, 1].map(i => `<span class="mm-team${i === w ? ' is-on' : ''}" style="--pc:${MM_COL[i]}"><b>${T(i)}</b><span class="num">${mm.pts[i]}</span></span>`).join('')}</div>
    ${medalChips()}
    <div class="foot-row" style="margin-top:8px;">
      <button id="mm-again" class="btn btn-brass" type="button">Revanche</button>
      <button id="mm-setup" class="btn btn-ghost btn-sm" type="button">Trocar times</button>
      <button id="${fromGab ? 'bgab' : 'bhome'}" class="btn btn-ghost btn-sm" type="button">${fromGab ? 'Gabinete' : 'Início'}</button>
    </div>
  </div>`;
}
let _mmTmr = null;
function wireMimica() {
  if (!mm) return;
  const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  const ready = tapArmed(220);
  [0, 1].forEach(i => { const el = document.getElementById('mm-n' + i); if (el) el.addEventListener('input', () => { mm.teams[i] = el.value.slice(0, 16); }); });
  document.querySelectorAll('[data-r]').forEach(b => b.addEventListener('click', () => { mm.rounds = +b.dataset.r; snd.tap(); go(); }));
  on('mm-start', () => { if (ready()) { snd.select(); mmStart(); } });
  on('mm-go', () => { if (ready()) mmGo(); });
  on('mm-ok', () => mmMark(true));
  on('mm-skip', () => mmMark(false));
  on('mm-next', () => { if (ready()) { snd.page(); mmAfter(); } });
  on('mm-again', () => { snd.select(); mmStart(); });
  on('mm-setup', () => { snd.swipe(); mm.phase = 'setup'; go(); });
  on('mm-quit', () => { snd.swipe(); clearInterval(_mmTmr); mm.phase = 'setup'; go(); });
  /* the minute: a bar that empties and a tick in the last five seconds */
  clearInterval(_mmTmr);
  if (mm.phase === 'play') {
    _mmTmr = setInterval(() => {
      if (sc !== 'mimica' || !mm || mm.phase !== 'play') { clearInterval(_mmTmr); return; }
      if (document.hidden) { mm.t0 += 100; return; }
      const left = MM_TIME - (performance.now() - mm.t0) / 1000, el = document.getElementById('mm-left'), tf = document.getElementById('mm-tf');
      mm.left = Math.max(0, left);
      if (el && +el.textContent !== Math.ceil(mm.left)) { el.textContent = Math.ceil(mm.left); if (mm.left <= 5 && mm.left > 0) try { snd.tick(Math.ceil(mm.left)); } catch (e) {} }
      if (tf) { tf.style.width = (mm.left / MM_TIME * 100).toFixed(1) + '%'; tf.className = mm.left <= 10 ? 't-bad' : ''; }
      if (left <= 0) { clearInterval(_mmTmr); mmTimeUp(); }
    }, 100);
  }
}
