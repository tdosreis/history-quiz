
/* ═══════════════════════════════════════════════════
   CARA A CARA DA HISTÓRIA — the board game of faces, with history's.
   Sixteen portraits; one of them is the mystery. Ask yes-or-no questions
   (born before Christ? from the Americas? a painter?) and the faces that
   do not fit fold down by themselves. Point at the one left — or guess
   early, if you dare: two wrong guesses and the mystery walks away. The
   fewer the questions, the more the points.
═══════════════════════════════════════════════════ */
const CC_N = 16;
const ccCont = p => AMAP_PLACE_CONT[p.ctry] || '';
/* [id, the question, what a figure answers, the group it is listed under] */
const CC_QS = [
  ['ac', 'Nasceu antes de Cristo?', p => p.era[0] < 0, 'Época'],
  ['m10', 'Nasceu antes do ano 1000?', p => p.era[0] < 1000, 'Época'],
  ['m15', 'Nasceu antes de 1500?', p => p.era[0] < 1500, 'Época'],
  ['m18', 'Nasceu antes de 1800?', p => p.era[0] < 1800, 'Época'],
  ['s20', 'Nasceu depois de 1900?', p => p.era[0] > 1900, 'Época'],
  ['v70', 'Viveu mais de 70 anos?', p => p.era[1] - p.era[0] > 70, 'Vida'],
  ['v45', 'Morreu antes dos 45?', p => p.era[1] - p.era[0] < 45, 'Vida'],
  ['eu', 'É da Europa?', p => ccCont(p) === 'EU', 'Lugar'],
  ['am', 'É das Américas?', p => ccCont(p) === 'AM', 'Lugar'],
  ['as', 'É da Ásia?', p => ccCont(p) === 'AS', 'Lugar'],
  ['af', 'É da África ou do Oriente Médio?', p => ccCont(p) === 'AF', 'Lugar'],
  ['br', 'É do Brasil?', p => p.ctry === 'BRA', 'Lugar'],
  ['gov', 'Governou um povo?', p => p.pos === 'GOV', 'Ofício'],
  ['gen', 'Foi um chefe militar?', p => p.pos === 'GEN', 'Ofício'],
  ['pen', 'Foi pensador ou cientista?', p => p.pos === 'PEN', 'Ofício'],
  ['art', 'Foi artista?', p => p.pos === 'ART', 'Ofício'],
  ['rev', 'Quis mudar as regras do seu tempo?', p => p.pos === 'REV', 'Ofício'],
  ['exp', 'Foi explorador ou viajante?', p => p.pos === 'EXP', 'Ofício'],
];
let cc = null;   // { board: [p], secret: p, down: Set(id), asked: [[qid, yes]], tries, pick, phase, flip: [ids just folded] }

function ccNew() {
  const pool = shuf(PL.filter(p => p.img));
  const board = pool.slice(0, CC_N);
  cc = { board, secret: board[Math.floor(Math.random() * CC_N)], down: new Set(), asked: [], tries: 2, pick: null, phase: 'play', flip: [], said: null };
}
function startCaraCara() { isDaily = false; isSurv = false; isMil = false; isRev = false; ccNew(); sc = 'caracara'; go(); }
const ccUp = () => cc.board.filter(p => !cc.down.has(p.id));
/* a question that would fold none of the faces still up tells nothing: it is offered greyed */
const ccHelps = q => { const up = ccUp(), y = up.filter(q[2]).length; return y > 0 && y < up.length; };

function ccAsk(qid) {
  if (!cc || cc.phase !== 'play' || cc.asked.some(a => a[0] === qid)) return;
  const q = CC_QS.find(x => x[0] === qid), yes = !!q[2](cc.secret);
  cc.asked.push([qid, yes]);
  cc.flip = ccUp().filter(p => !!q[2](p) !== yes).map(p => p.id);
  cc.flip.forEach(id => cc.down.add(id));
  cc.said = yes; cc.pick = null;
  try { snd.tap(); } catch (e) {}
  go();
  if (cc.flip.length) setTimeout(() => { try { snd.page(); } catch (e) {} }, 200);
}
function ccGuess(id) {
  if (!cc || cc.phase !== 'play') return;
  if (id === cc.secret.id) return ccEnd(true);
  cc.tries--; cc.down.add(id); cc.flip = [id]; cc.pick = null; cc.said = 'nao-e';
  try { snd.wrong(); haptic([28, 45, 28]); } catch (e) {}
  if (cc.tries <= 0) return ccEnd(false);
  go();
}
const ccScore = () => Math.max(10, 100 - 8 * cc.asked.length - 15 * (2 - cc.tries));
function ccEnd(won) {
  cc.phase = 'end'; cc.won = won; cc.score = won ? ccScore() : 0;
  stats.ccGames = (stats.ccGames || 0) + 1;
  if (won) { stats.ccWins = (stats.ccWins || 0) + 1; stats.ccBest = Math.max(stats.ccBest || 0, cc.score); }
  if (won && cc.asked.length <= 3) stats.ccSharp = (stats.ccSharp || 0) + 1;
  LS.set('stats', stats);
  window._newMedals = newMedals();
  go();
  setTimeout(() => { try { if (won) { snd.fanfare(); fx.rain(50); } else snd.final(false); } catch (e) {} }, 250);
}

function caracaraHtml() {
  if (!cc) ccNew();
  if (cc.phase === 'end') return ccEndHtml();
  const up = ccUp().length, last = cc.asked[cc.asked.length - 1], lq = last && CC_QS.find(q => q[0] === last[0]);
  const pick = cc.pick && cc.board.find(p => p.id === cc.pick);
  const groups = ['Época', 'Lugar', 'Ofício', 'Vida'];
  return `
  <div class="pg cc-pg">
    ${topbar('Cara a cara', fromGab ? 'bgab' : '')}
    <div class="cc-head">
      <span class="cc-who" aria-hidden="true"><span class="cc-q">?</span></span>
      <span class="cc-bubble${cc.said == null ? '' : cc.said === 'nao-e' ? ' is-no' : cc.said ? ' is-yes' : ' is-no'}" role="status">${cc.said == null
        ? 'Sou um destes dezesseis. Pergunte!'
        : cc.said === 'nao-e' ? `<b>Não sou eu!</b> ${cc.tries === 1 ? 'Só mais um palpite.' : ''}`
        : `<small>${_esc(lq[1])}</small><b>${cc.said ? 'Sim!' : 'Não.'}</b>`}</span>
      <span class="cc-meta"><b class="num">${cc.asked.length}</b><small>${cc.asked.length === 1 ? 'pergunta' : 'perguntas'}</small><i class="cc-tries">${'●'.repeat(cc.tries)}${'○'.repeat(2 - cc.tries)}</i></span>
    </div>
    <div class="cc-board" role="group" aria-label="Os dezesseis rostos; ${up} ainda de pé">
      ${cc.board.map((p, i) => { const dn = cc.down.has(p.id), fl = cc.flip.includes(p.id);
        return `<button class="cc-face${dn ? ' is-down' : ''}${fl ? ' is-folding' : ''}${cc.pick === p.id ? ' is-pick' : ''}" data-id="${p.id}" type="button"${dn ? ' disabled' : ''}
          style="--d:${fl ? cc.flip.indexOf(p.id) * 45 : 0}ms" aria-label="${_esc(p.n)}${dn ? ' (descartado)' : ''}">
          <span class="cc-in"><span class="cc-front"><img src="${p.img}" alt="" loading="lazy" draggable="false"><span class="cc-nm">${_esc(p.n)}</span></span>
          <span class="cc-back" aria-hidden="true"></span></span></button>`; }).join('')}
    </div>
    ${pick ? `<div class="cc-accuse"><button id="cc-yes" class="btn btn-brass" type="button">É você, ${_esc(pick.n.split(' ')[0])}?</button>
        <button id="cc-no" class="btn btn-ghost btn-sm" type="button">Ainda não</button></div>`
    : `<div class="cc-asks scroll-x" role="group" aria-label="Perguntas">${groups.map(g => `<span class="cc-grp"><small>${g}</small>${
        CC_QS.filter(q => q[3] === g).map(q => { const done = cc.asked.find(a => a[0] === q[0]), help = !done && ccHelps(q);
          return `<button class="cc-ask${done ? (done[1] ? ' is-yes' : ' is-no') : help ? '' : ' is-idle'}" data-q="${q[0]}" type="button"${done ? ' disabled' : ''}>${q[1]}${done ? ` <b>${done[1] ? 'sim' : 'não'}</b>` : ''}</button>`; }).join('')}</span>`).join('')}</div>
      <p class="cc-tip small muted">${up === 1 ? 'Só sobrou um rosto: toque nele para acusar!' : 'Toque num rosto para dar o seu palpite.'}</p>`}
  </div>`;
}
function ccEndHtml() {
  const p = cc.secret, cont = { EU: 'Europa', AM: 'Américas', AS: 'Ásia', AF: 'África e Oriente Médio' }[ccCont(p)] || '';
  return `
  <div class="pg pg-center cc-pg cc-end">
    <div class="eyebrow">Cara a cara</div>
    <div class="cc-reveal${cc.won ? ' is-won' : ''}">
      <span class="cc-reveal-pic"><img src="${p.img}" alt=""></span>
      <span class="cc-stamp">${cc.won ? 'Achou!' : 'Fugiu!'}</span>
    </div>
    <div class="display" style="font-size:26px;"><em>${cc.won ? `Era ${_esc(p.n)}!` : `Era ${_esc(p.n)}…`}</em></div>
    <p class="small muted" style="margin:0;">${_esc(p.nick || '')}${p.nick ? ' · ' : ''}${POS_NAME[p.pos]} · ${cont} · ${anoYear(p.era[0])}–${anoYear(p.era[1])}</p>
    ${cc.won ? `<div class="display prize-pop brass" style="font-size:44px;">${cc.score}<span class="muted" style="font-size:15px;"> pts</span></div>
      <p class="small muted" style="margin:0;">${cc.asked.length} ${cc.asked.length === 1 ? 'pergunta' : 'perguntas'}${cc.tries < 2 ? ' · um palpite errado' : ''}</p>` : ''}
    ${medalChips()}
    <div class="foot-row" style="margin-top:6px;">
      <button id="cc-again" class="btn btn-brass" type="button">De novo</button>
      <button id="${fromGab ? 'bgab' : 'bhome'}" class="btn btn-ghost btn-sm" type="button">${fromGab ? 'Gabinete' : 'Início'}</button>
    </div>
  </div>`;
}
function wireCaraCara() {
  if (!cc) return;
  const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  const ready = tapArmed(200);
  document.querySelectorAll('.cc-ask').forEach(b => b.addEventListener('click', () => { if (ready()) ccAsk(b.dataset.q); }));
  document.querySelectorAll('.cc-face:not(.is-down)').forEach(b => b.addEventListener('click', () => {
    if (!ready()) return; cc.pick = cc.pick === b.dataset.id ? null : b.dataset.id; snd.tap(); go(); }));
  on('cc-yes', () => { if (ready()) ccGuess(cc.pick); });
  on('cc-no', () => { cc.pick = null; snd.swipe(); go(); });
  on('cc-again', () => { snd.select(); startCaraCara(); });
  cc.flip = [];
}
