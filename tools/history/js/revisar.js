
/* ═══════════════════════════════════════════════════
   REVISAR — the questions you got wrong, again, spaced out
   A written question missed in any game goes into a box to come back to.
   The boxes are a Leitner file: right on review, a question comes back a
   day later, then three, then seven, and after that it is learned and
   leaves; missed again, it starts over. Knowing it before it is due proves
   little, so that does not move it. The game is a round of up to ten of
   those that are due, with a slower clock than training.
═══════════════════════════════════════════════════ */
const REV_N = 10;
const REV_GAPS = [0, 1, 3, 7];      // days until a question comes back, by box
const REV_MAX = 300;                // the file keeps the most recent misses
let _revPool = null;
/* A question is known by all of it, not by its line: a fifth of them share a line ("Quem disse esta frase?",
   "Quem sou eu?") and differ only in the quote, the clues or the answer. The key is a short hash of the
   question as written (a copy made for a game carries the same fields, and its own underscored ones are left out). */
const _revHash = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); };
const revKey = q => _revHash(JSON.stringify(q, (k, v) => (k && k[0] === '_' ? undefined : v)));
/* the written questions — the only ones that stay the same from one game to the next — by key */
function revPool() {
  if (_revPool) return _revPool;
  _revPool = new Map();
  CATS.forEach(c => c.qs.forEach(q => { const k = revKey(q); if (!_revPool.has(k)) _revPool.set(k, { q, c }); }));
  return _revPool;
}
/* the file of misses; anything in it the pool no longer knows (an older file's keys, a question since removed) is let go */
function revFile() {
  const r = LS.get('rev', {});
  if (!r || typeof r !== 'object' || Array.isArray(r)) return {};
  if (!Object.keys(r).length) return r;   // nothing filed: the questions need not be counted (it costs the cover's first draw)
  const pool = revPool(), gone = Object.keys(r).filter(k => !pool.has(k));
  if (gone.length) { gone.forEach(k => delete r[k]); LS.set('rev', r); }
  return r;
}
/* an answer, from any game: a miss is filed, a right answer to a due one moves it on */
function revNote(q, p) {
  if (!q || !q.t) return;
  const key = revKey(q);
  if (!revPool().has(key)) return;
  const R = revFile(), now = dayIndex(), e = R[key];
  if (p !== 3) { delete R[key]; R[key] = [0, now]; }
  else if (e && e[1] <= now) {
    const box = e[0] + 1;
    if (box >= REV_GAPS.length) { delete R[key]; stats.revLearned = (stats.revLearned || 0) + 1; LS.set('stats', stats); }
    else R[key] = [box, now + REV_GAPS[box]];
  } else return;
  const ks = Object.keys(R);
  ks.slice(0, Math.max(0, ks.length - REV_MAX)).forEach(k => delete R[k]);
  LS.set('rev', R);
}
const revDue = () => { const R = revFile(), now = dayIndex(); return Object.keys(R).filter(t => R[t][1] <= now && revPool().has(t)); };
/* how many days until the next one is due (or null, with none filed) */
function revWait() {
  const R = revFile(), now = dayIndex(), ds = Object.keys(R).filter(t => revPool().has(t)).map(t => R[t][1] - now);
  return ds.length ? Math.max(0, Math.min(...ds)) : null;
}
function revTail() {
  const n = revDue().length;
  if (n) return `${n} ${n === 1 ? 'pendente' : 'pendentes'}`;
  const w = revWait();
  return w === null ? 'Nenhum ainda' : `Em ${w} ${w === 1 ? 'dia' : 'dias'}`;
}

function startRev() {
  const due = revDue();
  if (!due.length) return false;
  isDaily = false; isSurv = false; isMil = false; isRev = true;
  diffKey = 'moderado';
  _seed = null; runSeed = null;
  /* the longest waiting first, then the rest in no order */
  const R = revFile();
  const pick = due.sort((a, b) => R[a][1] - R[b][1]).slice(0, REV_N);
  const qs = shuf(pick).map(t => { const { q, c } = revPool().get(t); return { ...q, _cat: c }; });
  cat = { id: 'revisar', name: 'Revisar erros', emoji: '📖', tag: 'Os que você errou', col: '#2F5D62', diff: 'Revisão', qs };
  qi = 0; sel.clear(); pts = 0; prevPts = 0; streak = 0;
  nCorrect = 0; nPartial = 0; bestStreak = 0; lastGain = 0; runLog = []; runNew = 0; runNewIds = []; runPulls = []; runSelos = []; runPackOpened = false; gameN++;
  resetLifes();
  sc = 'quiz'; tMax = qTime(); tLeft = tMax; lastMsg = '';
  disp = getDisp(cat.qs[0]);
  startTmr();
  go();
  return true;
}
