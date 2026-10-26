
/* ═══════════════════════════════════════════════════
   METAS DA SEMANA — three goals, new every Monday
   Drawn from the week's number, so a friend has the same three. Each is
   a count that has to grow by so much this week (right answers, events
   on the line, days of Hoje…): what it was when the week began is kept,
   and the goal is what it has grown by since. A goal met pays a stamp the
   player does not have; the three met, a medal. A banner says so the
   moment it happens, wherever the player is.
═══════════════════════════════════════════════════ */
const METAS = [
  { id: 'acertos', ic: 'check', kind: 'train', n: [30, 45, 60], t: n => `Acerte ${n} perguntas`, v: () => stats.correct || 0 },
  { id: 'rodadas', ic: 'play', kind: 'surv', n: [4, 6, 8], t: n => `Jogue ${n} rodadas de perguntas`, v: () => stats.games || 0 },
  { id: 'diario', ic: 'calendar', kind: 'daily', n: [3, 4, 5], t: n => `Faça o Diário em ${n} dias`, v: () => stats.dailyDays || 0 },
  { id: 'linha', ic: 'timeline', kind: 'cron', n: [15, 25, 35], t: n => `Ponha ${n} eventos na linha da Cronologia`, v: () => stats.cronPlaced || 0 },
  { id: 'anos', ic: 'hourglass', kind: 'ano', n: [1500, 2500, 3500], t: n => `Some ${n.toLocaleString('pt-BR')} pontos no Que\u00a0ano?`, v: () => stats.anoPts || 0 },
  { id: 'onde', ic: 'globe', kind: 'onde', n: [2, 3, 4], t: n => `Jogue ${n} partidas de Onde\u00a0foi?`, v: () => stats.ondeGames || 0 },
  { id: 'hoje', ic: 'sun', kind: 'hoje', n: [3, 4, 5], t: n => `Jogue o Hoje na\u00a0História em ${n} dias`, v: () => stats.hojeDays || 0 },
  { id: 'figs', ic: 'star', kind: 'album', n: [5, 8, 12], t: n => `Cole ${n} figurinhas novas no álbum`, v: () => album.size,
    ok: () => ALL_STICKERS.length - album.size >= 12 },
];
const metasWeek = d => Math.floor(dayIndex(d) / 7);          // dayIndex counts from a Monday
const metasLeft = () => 7 - (dayIndex() % 7);                  // days left, today included

/* the week's three, and what each count was when the week began */
function metasState() {
  const wk = metasWeek();
  let s = LS.get('metas', null);
  if (s && s.wk === wk && Array.isArray(s.picks)) return s;
  /* drawn on the week's own seed, and the game's seed (a challenge being dealt) put back as it was */
  const keep = _seed;
  seedFrom(wk * 7907 + 3);
  const pool = shuf(METAS.filter(m => !m.ok || m.ok()));
  const picks = pool.slice(0, 3).map(m => [m.id, m.n[Math.floor(rnd() * m.n.length)]]);
  _seed = keep;
  s = { wk, picks, base: {}, done: {} };
  picks.forEach(([id]) => { s.base[id] = METAS.find(m => m.id === id).v(); });
  LS.set('metas', s);
  return s;
}
const metasList = () => { const s = metasState();
  return s.picks.map(([id, n]) => { const m = METAS.find(x => x.id === id);
    return m && { m, n, got: Math.max(0, Math.min(n, m.v() - (s.base[id] || 0))), done: s.done[id] }; }).filter(Boolean); };

/* called whenever the medals are counted: a goal just met is paid and announced */
function metasCheck() {
  const s = metasState(), fresh = [];
  for (const g of metasList()) {
    if (g.done || g.got < g.n) continue;
    /* the prize: a stamp not yet in the album, the same one for anyone meeting this goal this week */
    const free = seloAll().filter(id => !selos[id]);
    let prize = true;
    if (free.length) { const keep = _seed; seedFrom(s.wk * 31 + g.m.id.length * 977); prize = free[Math.floor(rnd() * free.length)]; _seed = keep; awardSelo(prize); }
    s.done[g.m.id] = prize;
    fresh.push({ g, prize });
  }
  if (fresh.length) {
    if (!s.full && s.picks.every(([id]) => s.done[id])) { s.full = true; stats.metasWeeks = (stats.metasWeeks || 0) + 1; LS.set('stats', stats); }
    LS.set('metas', s);
    fresh.forEach((f, i) => setTimeout(() => metaToast(f), 400 + i * 3800));
  }
  return fresh;
}
function metaToast({ g, prize }) {
  const el = document.createElement('div');
  el.className = 'meta-toast';
  el.setAttribute('role', 'status');
  el.innerHTML = `<span class="mode-disc mode-${g.m.kind}">${ICON[g.m.ic]('currentColor', 15)}</span>
    <span><small>Meta da semana cumprida</small><b>${g.m.t(g.n)}</b>${typeof prize === 'string' ? `<i>Selo de presente: nº ${seloNum(prize)}</i>` : ''}</span>
    ${typeof prize === 'string' ? `<span class="selo-mini">${seloSvg(prize)}</span>` : ''}`;
  document.body.appendChild(el);
  try { snd.fanfare(); } catch (e) {}
  setTimeout(() => el.classList.add('is-out'), 3300);
  setTimeout(() => el.remove(), 3800);
}

/* the cover's footer link */
const metasTail = () => { const l = metasList(); return `${l.filter(g => g.done).length}/${l.length}`; };

function metasHtml() {
  const l = metasList(), left = metasLeft(), all = l.every(g => g.done);
  return `
  <div class="pg metas-pg">
    ${topbar('Metas da semana')}
    <p class="metas-when">${all ? 'As três cumpridas!' : `${l.filter(g => g.done).length} de ${l.length} cumpridas`} · <b>${left === 1 ? 'último dia' : `faltam ${left} dias`}</b></p>
    <div class="metas-list">
      ${l.map(g => `<div class="meta${g.done ? ' is-done' : ''}">
        <span class="mode-disc mode-${g.done ? 'done' : g.m.kind}">${(g.done ? ICON.check : ICON[g.m.ic])('currentColor', 18)}</span>
        <span class="meta-tx"><b>${g.m.t(g.n)}</b>
          <span class="meta-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${g.n}" aria-valuenow="${g.got}" aria-label="${g.got} de ${g.n}"><i style="width:${Math.round(100 * g.got / g.n)}%"></i></span>
          <small>${g.got.toLocaleString('pt-BR')} de ${g.n.toLocaleString('pt-BR')}${g.done ? ' · cumprida' : ''}</small></span>
        <span class="meta-prize" title="${typeof g.done === 'string' ? 'Selo nº ' + seloNum(g.done) : 'Um selo de presente'}">${typeof g.done === 'string'
          ? `<span class="selo-mini">${seloSvg(g.done)}</span>` : `<span class="meta-gift">${ICON.stamp('currentColor', 18)}</span>`}</span>
      </div>`).join('')}
    </div>
    <p class="small muted metas-foot">Cada meta cumprida dá um selo que falta no seu álbum; as três, uma insígnia. Toda segunda-feira, três metas novas.</p>
  </div>`;
}
