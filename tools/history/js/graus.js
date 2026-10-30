
/* ═══════════════════════════════════════════════════
   SEIS GRAUS DA HISTÓRIA — get from one figure to another through people
   who were alive at the same time. Two figures are linked when their lives
   overlapped by ten years or more; from Cleópatra to Napoleão is a chain
   of such links across the centuries. At each step four contemporaries of
   the last one are offered (their dates hidden until chosen), one of them
   always a step closer; the target is the end. The fewest steps the chain
   could take is the par. A puzzle of the day, the same for everyone, and
   free ones.
═══════════════════════════════════════════════════ */
const SG_OVER = 10, SG_OPTS = 4;
let _sgG = null;
/* the links, and the people linked to the most of the others (the ones a chain can be built through) */
function sgGraph() {
  if (_sgG) return _sgG;
  const ps = PL.filter(p => p.img), adj = {};
  ps.forEach(p => { adj[p.id] = []; });
  for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
    const a = ps[i], b = ps[j], o = Math.min(a.era[1], b.era[1]) - Math.max(a.era[0], b.era[0]);
    if (o >= SG_OVER) { adj[a.id].push(b.id); adj[b.id].push(a.id); }
  }
  return (_sgG = { ps, adj, by: Object.fromEntries(ps.map(p => [p.id, p])) });
}
/* a chain worth playing: the shortest way can be walked through figures with several contemporaries each, so no step
   offers a single face */
function sgWide(from, d) {
  const { adj } = sgGraph();
  let cur = from;
  while (d[cur] > 1) {
    if (adj[cur].length < 5) return false;
    cur = adj[cur].filter(v => d[v] === d[cur] - 1).sort((x, y) => adj[y].length - adj[x].length)[0];
    if (!cur) return false;
  }
  return adj[from].length >= 5;
}
/* how many links from every figure to one */
function sgDist(to) {
  const { adj } = sgGraph(), d = { [to]: 0 }, q = [to];
  while (q.length) { const u = q.shift(); adj[u].forEach(v => { if (d[v] == null) { d[v] = d[u] + 1; q.push(v); } }); }
  return d;
}
let sg = null;   // { a, b, chain: [id], opts: [id], d: {id: dist to b}, par, max, phase: 'play'|'end', day, last }

function sgNew(day) {
  const { ps } = sgGraph();
  if (day) seedFrom(dayIndex() * 4241 + 77);
  let a, b, d;
  for (let k = 0; k < 400; k++) {
    a = ps[Math.floor(rnd() * ps.length)]; b = ps[Math.floor(rnd() * ps.length)];
    if (a === b) continue;
    d = sgDist(b.id);
    if (d[a.id] >= 3 && d[a.id] <= 5 && sgWide(a.id, d)) break;
  }
  if (day) _seed = null;
  sg = { a: a.id, b: b.id, chain: [a.id], d, par: d[a.id], max: d[a.id] + 4, phase: 'play', day: !!day, last: null };
  sg.opts = sgOptions();
}
/* four contemporaries of the last link: the target itself when it is one; always at least one a step closer */
function sgOptions() {
  const { adj } = sgGraph(), cur = sg.chain[sg.chain.length - 1], here = sg.d[cur];
  const free = adj[cur].filter(id => !sg.chain.includes(id));
  const closer = shuf(free.filter(id => sg.d[id] === here - 1)), other = shuf(free.filter(id => sg.d[id] !== here - 1));
  const out = [];
  if (free.includes(sg.b)) out.push(sg.b);
  if (closer.length && !out.length) out.push(closer[0]);
  other.concat(closer.slice(1)).forEach(id => { if (out.length < SG_OPTS && !out.includes(id)) out.push(id); });
  return shuf(out);
}
function startGraus(day) { isDaily = false; isSurv = false; isMil = false; isRev = false; sgNew(day); sc = 'graus'; go(); }
const sgDiaRes = () => { const r = LS.get('grausDia', null); return r && r.day === dayIndex() ? r : null; };

function sgPick(id) {
  if (!sg || sg.phase !== 'play' || !sg.opts.includes(id)) return;
  const before = sg.d[sg.chain[sg.chain.length - 1]];
  sg.chain.push(id);
  sg.last = sg.d[id] < before ? 'perto' : sg.d[id] > before ? 'longe' : 'igual';
  if (id === sg.b) return sgEnd(true);
  if (sg.chain.length - 1 >= sg.max) return sgEnd(false);
  sg.opts = sgOptions();
  if (!sg.opts.length) return sgEnd(false);
  try { sg.last === 'perto' ? snd.correct(0) : sg.last === 'longe' ? snd.almost() : snd.tap(); } catch (e) {}
  go();
}
function sgEnd(won) {
  sg.phase = 'end'; sg.won = won;
  const steps = sg.chain.length - 1;
  sg.stars = !won ? 0 : steps <= sg.par ? 3 : steps <= sg.par + 1 ? 2 : 1;
  stats.sgGames = (stats.sgGames || 0) + 1;
  if (won) stats.sgWins = (stats.sgWins || 0) + 1;
  if (sg.stars === 3) stats.sgPar = (stats.sgPar || 0) + 1;
  if (sg.day && !sgDiaRes()) LS.set('grausDia', { day: dayIndex(), stars: sg.stars, steps });
  LS.set('stats', stats);
  window._newMedals = newMedals();
  go();
  setTimeout(() => { try { if (won) { snd.fanfare(); if (sg.stars === 3) fx.rain(50); } else snd.final(false); } catch (e) {} }, 250);
}

const sgYears = p => `${anoYear(p.era[0])}–${anoYear(p.era[1])}`;
const sgFace = (p, cls, extra) => `<span class="sg-face ${cls || ''}"><img src="${p.img}" alt="" loading="lazy" draggable="false"></span>`;
function grausHtml() {
  if (!sg) sgNew();
  const G = sgGraph().by, A = G[sg.a], B = G[sg.b], steps = sg.chain.length - 1;
  if (sg.phase === 'end') return sgEndHtml();
  return `
  <div class="pg sg-pg">
    ${topbar(sg.day ? 'Seis graus · do dia' : 'Seis graus', fromGab ? 'bgab' : '')}
    <div class="sg-goal">
      <span class="sg-end-p">${sgFace(A)}<b>${_esc(A.n)}</b><small>${sgYears(A)}</small></span>
      <span class="sg-arrow" aria-hidden="true"><i></i><small>par ${sg.par}</small></span>
      <span class="sg-end-p is-b">${sgFace(B)}<b>${_esc(B.n)}</b><small>${sgYears(B)}</small></span>
    </div>
    <div class="sg-chain scroll-x" aria-label="A corrente até agora">${sg.chain.map((id, i) => { const p = G[id];
      return `${i ? '<i class="sg-link" aria-hidden="true"></i>' : ''}<span class="sg-node${i === sg.chain.length - 1 ? ' is-last' : ''}">${sgFace(p)}<small>${anoYear(p.era[0])}</small></span>`; }).join('')}</div>
    <p class="sg-say" role="status">${!steps ? `Quem viveu no tempo de <b>${_esc(A.n)}</b> e leva você para mais perto de ${_esc(B.n.split(' ')[0])}?`
      : `<span class="sg-hot is-${sg.last}">${sg.last === 'perto' ? 'Mais perto!' : sg.last === 'longe' ? 'Mais longe…' : 'Na mesma distância'}</span> ${steps} de no máximo ${sg.max} passos.`}</p>
    <div class="sg-opts">${sg.opts.map(id => { const p = G[id];
      return `<button class="sg-opt${id === sg.b ? ' is-goal' : ''}" data-id="${id}" type="button">${sgFace(p)}<span><b>${_esc(p.n)}</b><small>${_esc(p.nick || POS_NAME[p.pos])}</small></span></button>`; }).join('')}</div>
  </div>`;
}
function sgEndHtml() {
  const G = sgGraph().by, steps = sg.chain.length - 1;
  return `
  <div class="pg pg-center sg-pg sg-end">
    <div class="eyebrow">Seis graus da História${sg.day ? ` · nº ${dayIndex()}` : ''}</div>
    <div class="display" style="font-size:26px;"><em>${sg.won ? (sg.stars === 3 ? 'No par! Corrente perfeita.' : 'Corrente fechada!') : 'A corrente se partiu'}</em></div>
    ${sg.won ? `<span class="mt-stars">${[0, 1, 2].map(i => `<i class="${i < sg.stars ? 'on' : ''}">★</i>`).join('')}</span>` : ''}
    <p class="small muted" style="margin:0;">${steps} ${steps === 1 ? 'passo' : 'passos'} · o menor caminho tinha ${sg.par}</p>
    <div class="sg-final">${sg.chain.map((id, i) => { const p = G[id];
      return `${i ? '<i class="sg-vlink" aria-hidden="true"></i>' : ''}<span class="sg-row${id === sg.b ? ' is-b' : ''}">${sgFace(p)}<b>${_esc(p.n)}</b><small>${sgYears(p)}</small></span>`; }).join('')}</div>
    ${medalChips()}
    <div class="foot-row" style="margin-top:6px;">
      <button id="sg-share" class="btn btn-ghost btn-sm" type="button">Compartilhar</button>
      <button id="sg-again" class="btn btn-brass" type="button">Outra corrente</button>
      <button id="${fromGab ? 'bgab' : 'bhome'}" class="btn btn-ghost btn-sm" type="button">${fromGab ? 'Gabinete' : 'Início'}</button>
    </div>
  </div>`;
}
const sgShareText = () => { const G = sgGraph().by;
  return `🔗 Seis graus da História${sg.day ? ' nº ' + dayIndex() : ''}\n${sg.chain.map(id => G[id].n).join(' → ')}\n${sg.won ? `${sg.chain.length - 1} passos (par ${sg.par}) ${'⭐'.repeat(sg.stars)}` : 'A corrente se partiu'}\n${CHAL_URL}`; };
function wireGraus() {
  if (!sg) return;
  const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  const ready = tapArmed(250);
  document.querySelectorAll('.sg-opt').forEach(b => b.addEventListener('click', () => { if (ready()) sgPick(b.dataset.id); }));
  on('sg-again', () => { snd.select(); startGraus(); });
  on('sg-share', () => { const txt = sgShareText();
    if (navigator.share) navigator.share({ text: txt }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(txt).then(() => { const b = document.getElementById('sg-share'); if (b) { b.dataset.l = b.dataset.l || b.textContent; b.textContent = 'Copiado!'; setTimeout(() => { b.textContent = b.dataset.l; }, 1600); } }).catch(() => {}); });
  const ch = document.querySelector('.sg-chain'); if (ch) ch.scrollLeft = ch.scrollWidth;
}
