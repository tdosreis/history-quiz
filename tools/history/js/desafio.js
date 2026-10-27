
/* ═══════════════════════════════════════════════════
   O DESAFIO — a link that deals a friend the very same game
   Every run is dealt from a seed (O BARALHO DA RODADA): the same seed deals
   the same questions, in the same order, with the same tiles, on any phone.
   So a result can travel as a link, ?d=<game>.<seed>.<score>[.<more>] in
   base 36. Whoever opens it is shown what they are up against, plays that
   game, and is told at the end who won; their own share sends it back.
═══════════════════════════════════════════════════ */
const CHAL_URL = 'https://tdosreis.github.io/history-quiz/';
const CHAL_GAMES = {
  tf: { n: 'Treino · Fácil', diff: 'facil', ic: 'check' },
  tm: { n: 'Treino · Moderado', diff: 'moderado', ic: 'bolt' },
  td: { n: 'Treino · Difícil', diff: 'dificil', ic: 'flame' },
  m:  { n: 'Rumo ao Milhão', ic: 'crown' },
  a:  { n: 'Que ano?', ic: 'hourglass' },
  o:  { n: 'Onde foi?', ic: 'globe' },
  c:  { n: 'Cronologia', ic: 'timeline' },
  d:  { n: 'Antes ou depois?', ic: 'hourglass' },
};
const CHAL_SEED_MAX = 2147483647;
let chal = null;           // a challenge received: { g, seed, score, more, code, used }

/* The game a seed deals depends on the questions and events the app has: a link made with one version of them
   and opened with another would deal a different game. So a link carries two characters that fingerprint them,
   and a link from another version is still played, but no winner is called. */
let _chalVer = null;
function chalVer() {
  if (_chalVer) return _chalVer;
  let h = 5381;
  const add = s => { for (let i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) | 0; };
  CATS.forEach(c => { add(c.id); c.qs.forEach(q => add(q.t)); });
  ANO_EVENTS.forEach(e => add(e.id)); Object.keys(ONDE_AT).forEach(add); PL.forEach(p => add(p.id)); add(String(LADDER.length));
  return (_chalVer = ((h >>> 0) % 1296).toString(36).padStart(2, '0'));
}
function chalCode(c) {
  return [c.g, c.seed.toString(36), Math.max(0, Math.round(c.score)).toString(36),
    c.more != null ? Math.max(0, Math.round(c.more)).toString(36) : '', c.ver || chalVer()].join('.');
}
const chalLink = c => CHAL_URL + '?d=' + chalCode(c);
function chalParse(s) {
  const m = /^(tf|tm|td|m|a|o|c|d)\.([0-9a-z]{1,6})\.([0-9a-z]{1,6})\.([0-9a-z]{0,3})\.([0-9a-z]{2})$/.exec(String(s || '').trim().toLowerCase());
  if (!m) return null;
  const seed = parseInt(m[2], 36), score = parseInt(m[3], 36), more = m[4] ? parseInt(m[4], 36) : null;
  if (!(seed >= 0 && seed <= CHAL_SEED_MAX)) return null;
  const cap = m[1] === 'm' ? 1000000 : m[1][0] === 't' ? 99999 : m[1] === 'c' || m[1] === 'd' ? ANO_EVENTS.length : 1000;
  if (!(score <= cap)) return null;
  if (m[1] === 'm' && !(more != null && more <= LADDER.length)) return null;
  if (m[1][0] === 't' && more != null && more > 50) return null;
  return { g: m[1], seed, score, more, code: m[0], ver: m[5], old: m[5] !== chalVer() };
}

/* the seed a new game is dealt from: the challenge's, the first time that game is started after accepting it */
function chalSeed(g) {
  if (chal && chal.accepted && !chal.used && chal.g === g) { chal.used = true; return chal.seed; }
  return (Math.random() * CHAL_SEED_MAX) | 0;
}

/* the game that just ended, as a challenge to send */
function chalMine() {
  if (sc === 'ano' && ano && ano.phase === 'end' && ano.seed != null) return { g: 'a', seed: ano.seed, score: ano.pts };
  if (sc === 'onde' && onde && onde.phase === 'end' && onde.seed != null) return { g: 'o', seed: onde.seed, score: onde.pts };
  if (sc === 'cron' && cron && cron.phase === 'end' && cron.seed != null) return { g: 'c', seed: cron.seed, score: cron.score };
  if (sc === 'aod' && aod && aod.phase === 'end' && aod.seed != null) return { g: 'd', seed: aod.seed, score: aod.score };
  if (sc !== 'end' || runSeed == null || isDaily || isSurv || (typeof isRev !== 'undefined' && isRev)) return null;
  if (isMil) return { g: 'm', seed: runSeed, score: banked, more: rung };
  const g = 't' + String(diffKey)[0];
  return CHAL_GAMES[g] ? { g, seed: runSeed, score: pts, more: nCorrect } : null;
}
/* is this the very game the friend was challenged with? */
const chalIsThis = mine => !!(mine && chal && chal.used && chal.g === mine.g && chal.seed === mine.seed);
/* better, worse or the same: the money first on the ladder, then how far up */
const chalCmp = (a, b) => a.g === 'm' ? (a.score - b.score) || ((a.more || 0) - (b.more || 0)) : a.score - b.score;
function chalScoreTxt(c) {
  if (c.g === 'm') return `${money(c.score)} · degrau ${c.more || 0}`;
  if (c.g === 'c') return `${c.score} na linha`;
  if (c.g === 'd') return `${c.score} ${c.score === 1 ? 'acerto seguido' : 'acertos seguidos'}`;
  return `${c.score} pts`;
}

/* the line the share card ends on */
function chalShareTail(mine) {
  if (!mine) return CHAL_URL;
  let head = '';
  if (chalIsThis(mine) && !chal.old) {
    const r = chalCmp(mine, chal);
    head = `Desafio: ${chalScoreTxt(mine)} × ${chalScoreTxt(chal)} — ${r > 0 ? 'venci! 🏆' : r < 0 ? 'perdi, desta vez' : 'empate'}\n`;
  }
  return `${head}${mine.g === 'm' ? 'Encara as mesmas 16 perguntas?' : mine.g === 'a' || mine.g === 'o' ? 'Encara os mesmos 10 eventos?' : mine.g === 'c' ? 'Encara a mesma linha do tempo?' : mine.g === 'd' ? 'Encara a mesma sequência de eventos?' : 'Encara as mesmas perguntas?'} ${chalLink(mine)}`;
}

/* on the results: who won */
function chalBanner() {
  const mine = chalMine();
  if (!chalIsThis(mine)) return '';
  /* a link from another version of the game dealt a different game: no winner is called */
  const r = chal.old ? 0 : chalCmp(mine, chal), say = chal.old ? 'outra versão do jogo' : r > 0 ? 'Você venceu!' : r < 0 ? 'Não foi dessa vez' : 'Empate!';
  /* on the ladder the money decides, and the rung when the money is the same — then the rung is said too */
  const tie = mine.g === 'm' && mine.score === chal.score;
  const n = c => c.g === 'm' ? money(c.score) + (tie ? ` · degrau ${c.more || 0}` : '') : c.score + (c.g[0] === 't' ? ' pts' : '');
  return `<div class="chal-res ${r > 0 ? 'is-win' : r < 0 ? 'is-lose' : 'is-tie'}" role="status"
      aria-label="Desafio: você ${chalScoreTxt(mine)}, seu amigo ${chalScoreTxt(chal)}. ${say}.">
    <span class="chal-res-k" aria-hidden="true">${ICON.sword('currentColor', 11)} Desafio</span>
    <span class="chal-res-v" aria-hidden="true"><small>você</small> <b>${n(mine)}</b> <i>×</i> <b>${n(chal)}</b> <small>amigo</small></span>
    <em aria-hidden="true">${say}</em></div>`;
}

/* ── the screen a challenge link opens on ── */
function chalHtml() {
  const c = chal, G = c && CHAL_GAMES[c.g];
  if (!G) { sc = 'home'; return html(); }
  const what = c.g === 'm' ? 'As mesmas 16 perguntas da escada até o milhão, com as mesmas alternativas.'
             : c.g === 'a' ? 'Os mesmos 10 eventos, na mesma régua de anos.'
             : c.g === 'o' ? 'Os mesmos 10 eventos, para achar no mapa.'
             : c.g === 'c' ? 'Os mesmos eventos, na mesma ordem, para pôr na linha do tempo. Três vidas.'
             : c.g === 'd' ? 'Os mesmos eventos, na mesma ordem: o próximo veio antes ou depois? Até errar um.'
             : `As mesmas ${(DIFFS.find(d => d.key === G.diff) || DIFFS[0]).n} perguntas, na mesma ordem, com as mesmas alternativas.`;
  const more = c.g[0] === 't' && c.more != null ? `${c.more} ${c.more === 1 ? 'acerto' : 'acertos'}` : '';
  return `
  <div class="pg pg-center chal-pg">
    <div class="eyebrow">Desafio recebido</div>
    <span class="chal-ic mode-disc mode-${c.g === 'm' ? 'album' : c.g === 'a' ? 'ano' : c.g === 'o' ? 'onde' : c.g === 'c' ? 'cron' : c.g === 'd' ? 'aod' : 'train'}">${(ICON[G.ic] || ICON.sword)('currentColor', 26)}</span>
    <div class="display" style="font-size:31px;"><em>Um amigo te desafiou!</em></div>
    <p class="chal-g">${G.n}</p>
    <div class="chal-card"><small>Placar a bater</small><b class="num">${chalScoreTxt(c)}</b>${more ? `<span>${more}</span>` : ''}</div>
    <p class="small muted" style="max-width:30ch;">${c.old ? 'Este desafio veio de outra versão do jogo: as perguntas podem não ser as mesmas.' : what}</p>
    <button id="chal-go" class="btn btn-brass btn-lg">${ICON.sword('currentColor', 15)} Aceitar o desafio</button>
    <button id="chal-no" class="btn btn-ghost btn-sm">Agora não</button>
  </div>`;
}
function chalAccept() {
  if (!chal) return;
  chal.accepted = true;
  LS.set('chal', null);
  const G = CHAL_GAMES[chal.g];
  if (chal.g[0] === 't') { diffKey = G.diff; startGame(); }
  else if (chal.g === 'm') startMilhao();
  else if (chal.g === 'a') startAno();
  else if (chal.g === 'o') startOnde();
  else if (chal.g === 'c') startCron();
  else if (chal.g === 'd') startAod();
}
function wireChal() {
  document.getElementById('chal-go')?.addEventListener('click', () => { snd.select(); chalAccept(); });
  document.getElementById('chal-no')?.addEventListener('click', () => { snd.swipe(); sc = 'home'; go(); });
}
/* the cover's line for a challenge put off for later */
function chalNews() {
  if (!chal || chal.accepted) return '';
  const G = CHAL_GAMES[chal.g];
  return `<button id="bchal" class="home-news" type="button">
    <span class="hn-ic">${ICON.sword('currentColor', 13)}</span>
    <span>Desafio de um amigo · <b>${G.n}</b> · ${chalScoreTxt(chal)}</span></button>`;
}

/* At start: a link with a challenge opens on it (and leaves the address
   clean, so a reload is not a second challenge); one put off waits on the cover. */
function chalBoot() {
  let code = null;
  try {
    const q = new URLSearchParams(location.search).get('d');
    if (q !== null) {
      code = q;
      const u = new URL(location.href); u.searchParams.delete('d');
      history.replaceState(history.state, '', u.pathname + (u.search || '') + u.hash);
    }
  } catch (e) {}
  const fresh = code !== null ? chalParse(code) : null;
  if (fresh) { chal = fresh; LS.set('chal', fresh.code); sc = 'desafio'; return; }
  const kept = chalParse(LS.get('chal', null));
  if (kept) chal = kept;
}
