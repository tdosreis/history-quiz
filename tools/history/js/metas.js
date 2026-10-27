
/* ═══════════════════════════════════════════════════
   METAS DA SEMANA — three goals, new every Monday
   Drawn from the week's number, so a friend has the same three. Each is
   a count that has to grow by so much this week (right answers, events
   on the line, days of Hoje…): what it was when the week began is kept,
   and the goal is what it has grown by since. A goal met pays a stamp the
   player does not have; the three met, a full week. A banner says so,
   one at a time, and never over a question with its clock running.
═══════════════════════════════════════════════════ */
const METAS = [
  { id: 'acertos', ic: 'check', kind: 'train', n: [30, 45, 60], t: n => `Acerte ${n} perguntas`, v: () => stats.correct || 0 },
  { id: 'rodadas', ic: 'play', kind: 'surv', n: [4, 6, 8], t: n => `Jogue ${n} rodadas de perguntas`, v: () => stats.games || 0 },
  { id: 'diario', ic: 'calendar', kind: 'daily', n: [3, 4, 5], days: true, t: n => `Faça o Diário em ${n} dias`, v: () => stats.dailyDays || 0 },
  { id: 'linha', ic: 'timeline', kind: 'cron', n: [15, 25, 35], t: n => `Ponha ${n} eventos na linha da Cronologia`, v: () => stats.cronPlaced || 0 },
  { id: 'anos', ic: 'hourglass', kind: 'ano', n: [1500, 2500, 3500], t: n => `Some ${n.toLocaleString('pt-BR')} pontos no Que\u00a0ano?`, v: () => stats.anoPts || 0 },
  { id: 'onde', ic: 'globe', kind: 'onde', n: [2, 3, 4], t: n => `Jogue ${n} partidas de Onde\u00a0foi?`, v: () => stats.ondeGames || 0 },
  { id: 'hoje', ic: 'sun', kind: 'hoje', n: [3, 4, 5], days: true, t: n => `Jogue o Hoje na\u00a0História em ${n} dias`, v: () => stats.hojeDays || 0 },
  { id: 'aod', ic: 'hourglass', kind: 'aod', n: [15, 25, 40], t: n => `Acerte ${n} no Antes ou\u00a0depois?`, v: () => stats.aodRight || 0 },
  { id: 'figs', ic: 'star', kind: 'album', n: [5, 8, 12], t: n => `Cole ${n} figurinhas novas no álbum`, v: () => album.size,
    ok: () => ALL_STICKERS.length - album.size >= 12 },
];
const metasWeek = d => Math.floor(dayIndex(d) / 7);          // dayIndex counts from a Monday
const metasLeft = () => 7 - (dayIndex() % 7);                  // days left, today included

const metasVals = () => { const o = {}; METAS.forEach(m => { o[m.id] = m.v(); }); return o; };
/* the week's three, and what each count was when the week began. Called at every screen drawn (go()),
   so the counts as last seen are always kept: a new week starts from them, and a game begun before the
   week's first screen (on a cover left open over the weekend, from a friend's link) still counts in it. */
function metasState() {
  const wk = metasWeek();
  let s = LS.get('metas', null);
  /* this week's; or a later one's, when the clock has gone back: what there is stays */
  if (s && Array.isArray(s.picks) && s.wk >= wk) {
    if (s.wk === wk) { const v = metasVals(); if (JSON.stringify(v) !== JSON.stringify(s.snap)) { s.snap = v; LS.set('metas', s); } }
    return s;
  }
  /* drawn on the week's own seed, the whole list and every target, so everyone has the same three;
     the ones a player cannot play are left out after; the game's seed (a challenge being dealt) is put back */
  const keep = _seed;
  seedFrom(wk * 7907 + 3);
  const drawn = shuf(METAS).map(m => [m, m.n[Math.floor(rnd() * m.n.length)]]);
  _seed = keep;
  const left = metasLeft(), now = metasVals(), from = (s && s.snap) || now;
  /* a goal counted in days asks no more days than the week has left */
  const picks = drawn.filter(([m]) => !m.ok || m.ok()).slice(0, 3).map(([m, n]) => [m.id, m.days ? Math.min(n, left) : n]);
  s = { wk, picks, base: {}, done: {}, snap: now };
  picks.forEach(([id]) => { s.base[id] = Math.min(from[id] != null ? from[id] : now[id], now[id]); });
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
    let h = 0; for (const c of g.m.id) h = (h * 31 + c.charCodeAt(0)) | 0;
    if (free.length) { const keep = _seed; seedFrom(s.wk * 31 + h); prize = free[Math.floor(rnd() * free.length)]; _seed = keep; awardSelo(prize); }
    s.done[g.m.id] = prize;
    fresh.push({ g, prize });
  }
  if (fresh.length) {
    if (!s.full && s.picks.every(([id]) => s.done[id])) { s.full = true; stats.metasWeeks = (stats.metasWeeks || 0) + 1; LS.set('stats', stats); }
    LS.set('metas', s);
    _metaQ.push(fresh);
    setTimeout(metaFlush, 400);
  }
  return fresh;
}

/* The banners: one at a time, in turn; held while a question's clock is running (they wait for the
   next screen without one); never in the way of a tap; read out by a live region that is always there. */
const _metaQ = [];
let _metaBusy = false;
const META_HOLD = ['quiz', 'ask', 'lock', 'reveal', 'card'];
function metaFlush() {
  if (_metaBusy || !_metaQ.length || META_HOLD.includes(sc) || (sc === 'aod' && aod && aod.phase !== 'end') || !document.body) return;
  const met = _metaQ.shift(), one = met.length === 1, prizes = met.map(f => f.prize).filter(p => typeof p === 'string');
  _metaBusy = true;
  const el = document.createElement('div');
  el.className = 'meta-toast';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `<span class="mode-disc mode-${one ? met[0].g.m.kind : 'done'}">${(one ? ICON[met[0].g.m.ic] : ICON.check)('currentColor', 15)}</span>
    <span><small>${one ? 'Meta da semana cumprida' : 'Metas da semana cumpridas'}</small>${met.map(f => `<b>${f.g.m.t(f.g.n)}</b>`).join('')}
      ${prizes.length ? `<i>${prizes.length === 1 ? 'Selo de presente: nº ' + seloNum(prizes[0]) : 'Selos de presente: nº ' + prizes.map(seloNum).join(', ')}</i>` : ''}</span>
    ${prizes.map(p => `<span class="selo-mini">${seloSvg(p)}</span>`).join('')}`;
  document.body.appendChild(el);
  let live = document.getElementById('meta-live');
  if (!live) { live = document.createElement('div'); live.id = 'meta-live'; live.className = 'meta-live'; live.setAttribute('aria-live', 'polite'); document.body.appendChild(live); }
  live.textContent = (one ? 'Meta da semana cumprida: ' : 'Metas da semana cumpridas: ') + met.map(f => f.g.m.t(f.g.n)).join('; ')
    + (prizes.length ? '. ' + (prizes.length === 1 ? 'Um selo de presente.' : prizes.length + ' selos de presente.') : '.');
  try { snd.fanfare(); } catch (e) {}
  setTimeout(() => el.classList.add('is-out'), 3300);
  setTimeout(() => { el.remove(); _metaBusy = false; metaFlush(); }, 3800);
}

/* the cover's footer link */
const metasTail = () => { const l = metasList(); return `${l.filter(g => g.done).length}/${l.length}`; };

function metasHtml() {
  const l = metasList(), left = metasLeft(), all = l.every(g => g.done), free = seloAll().some(id => !selos[id]);
  return `
  <div class="pg metas-pg">
    ${topbar('Metas da semana')}
    <p class="metas-when">${all ? 'As três cumpridas!' : `${l.filter(g => g.done).length} de ${l.length} cumpridas`} · <b>${left === 1 ? 'último dia' : `faltam ${left} dias`}</b></p>
    <div class="metas-list">
      ${l.map(g => `<div class="meta${g.done ? ' is-done' : ''}">
        <span class="mode-disc mode-${g.done ? 'done' : g.m.kind}">${(g.done ? ICON.check : ICON[g.m.ic])('currentColor', 18)}</span>
        <span class="meta-tx"><b>${g.m.t(g.n)}</b>
          <span class="meta-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${g.n}" aria-valuenow="${g.got}" aria-label="${g.m.t(g.n)}: ${g.got} de ${g.n}"><i style="width:${Math.round(100 * g.got / g.n)}%"></i></span>
          <small>${g.got.toLocaleString('pt-BR')} de ${g.n.toLocaleString('pt-BR')}${g.done ? ' · cumprida' : ''}</small></span>
        <span class="meta-prize" title="${typeof g.done === 'string' ? 'Selo nº ' + seloNum(g.done) : g.done ? 'Cumprida' : free ? 'Um selo de presente' : 'Álbum de selos completo'}">${typeof g.done === 'string'
          ? `<span class="selo-mini">${seloSvg(g.done)}</span>` : g.done || !free ? '' : `<span class="meta-gift">${ICON.stamp('currentColor', 18)}</span>`}</span>
      </div>`).join('')}
    </div>
    <p class="small muted metas-foot">${free ? 'Cada meta cumprida dá um selo que ainda falta no seu álbum. ' : 'Seu álbum de selos está completo. '}As três cumpridas fazem uma semana cheia. Toda segunda-feira, três metas novas.</p>
  </div>`;
}
