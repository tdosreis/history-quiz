
/* ═══════════════════════════════════════════════════
   AS PROVAS — the other games, played for a rung
   Five of the sixteen rungs are not a question to mark: they are a turn of
   one of the games that live behind the cover, played for the rung. The
   ruler of years (Que ano?), the pin on the mapa-múndi (Onde foi?), an event
   to set in a line of time (Cronologia), three "before or after?" in a row,
   two or three legends to stamp (Mito ou fato?), a name to spell from letter
   tiles and pairs to tie (js/maos.js). Each climb draws the five
   in its own order, from the climb's seed, so a climb sent to a friend has
   the same provas; the higher the rung, the narrower the margin. A prova is
   announced on a card, like a carta especial — and that card is where the
   player may still stop — and is played on its game's own screen, under the
   climb's bar instead of the game's.
═══════════════════════════════════════════════════ */
const PROVA_RUNGS = [1, 4, 7, 10, 13];       // none a checkpoint, none a carta especial, never the first or the last
const GC_PROVA = { id: 'g_prova', name: 'Prova', emoji: '🧭', col: '#8C2F2F' };
const PROVA = {
  ano:  { n: 'Que ano?',         ic: ICON.hourglass, tag: d => `Leve a régua até o ano: vale errar por até ${d.tol} ${d.tol === 1 ? 'ano' : 'anos'}` },
  onde: { n: 'Onde foi?',        ic: ICON.globe,     tag: d => `Crave o alfinete no mapa: vale até ${d.km.toLocaleString('pt-BR')} km do lugar` },
  cron: { n: 'Cronologia',       ic: ICON.timeline,  tag: d => d.cur.length === 1 ? 'Um evento para pôr no seu lugar na linha do tempo' : 'Dois eventos para pôr no lugar na linha do tempo, sem errar' },
  aod:  { n: 'Antes ou depois?', ic: ICON.clock,     tag: d => `${d.need === 3 ? 'Três' : 'Duas'} seguidas, sem errar: veio antes ou depois?` },
  mito: { n: 'Mito ou fato?',    ic: ICON.stamp,     tag: d => `${d.need === 3 ? 'Três' : 'Duas'} cartas, nenhuma dúvida: lenda ou verdade?` },
  /* and two that are not games of the cover but ways of answering with the hands (js/maos.js) */
  soletra: { n: 'Soletre',       ic: ICON.quill,     tag: d => d.level >= 4 ? 'Monte o nome de quem está no retrato — há letras que não entram' : 'Monte o nome de quem está no retrato, letra por letra' },
  pares:   { n: 'Pares',         ic: ICON.chain,     tag: d => PR_REL[d.rel].h + ', sem errar nenhum' },
};
const _pvTier = (tier, arr) => arr[Math.max(0, Math.min(arr.length - 1, tier - 1))];
const _pvEvt = id => ANO_EVENTS.find(e => e.id === id);

/* What each prova is, dealt once when the climb is built (so the seed that deals the questions deals these too) */
const PROVA_DEAL = {
  ano(tier, used) {
    const e = shuf(ANO_EVENTS.filter(x => !used.has(x.id)))[0];
    if (!e) return null;
    used.add(e.id);
    const [lo, hi] = anoWindow(e, rnd()), mid = Math.round((lo + hi) / 2 / 5) * 5;
    return { e: e.id, lo, hi, start: mid === 0 ? 1 : mid, tol: Math.max(2, Math.round(anoTol(e) * _pvTier(tier, [3, 2.6, 2.2, 1.8, 1.4]))) };
  },
  onde(tier, used) {
    const e = shuf(ANO_EVENTS.filter(x => ONDE_AT[x.id] && !used.has(x.id)))[0];
    if (!e) return null;
    used.add(e.id);
    return { e: e.id, km: _pvTier(tier, [2500, 2000, 1600, 1200, 900]) };
  },
  cron(tier, used) {
    /* three events already on the line and one or two to place, none too near another to be fair */
    const gap = _pvTier(tier, [150, 100, 60, 40, 25]), n = tier >= 3 ? 5 : 4, got = [];
    for (const e of shuf(ANO_EVENTS.filter(x => !used.has(x.id) && (!x.c || gap >= 100)))) {
      if (got.every(o => anoGap(o.y, e.y) >= gap)) got.push(e);
      if (got.length === n) break;
    }
    if (got.length < n) return null;
    got.forEach(e => used.add(e.id));
    return { line: got.slice(0, 3).sort((a, b) => a.y - b.y).map(e => e.id), cur: got.slice(3).map(e => e.id) };
  },
  aod(tier) { return { seed: Math.floor(rnd() * CHAL_SEED_MAX), need: 3, band: _pvTier(tier, [0, 3, 6, 10, 15]) }; },
  mito(tier) { return { seed: Math.floor(rnd() * CHAL_SEED_MAX), need: tier >= 3 ? 3 : 2 }; },
  soletra(tier) {
    const st = { rs: Math.floor(rnd() * CHAL_SEED_MAX) };
    const pool = slPool().filter(p => tier > 2 || FAMOUS.has(p.id));
    return pool.length ? slDeal(pool[Math.floor(_mRnd(st) * pool.length)], tier, st) : null;
  },
  pares(tier) {
    const st = { rs: Math.floor(rnd() * CHAL_SEED_MAX) };
    return prDeal(['nick', 'ctry', 'cent'][Math.floor(_mRnd(st) * 3)], tier >= 3 ? 4 : 3, tier <= 2, st);
  },
};
/* Deals the provas into a ladder that is already built, as dealSpecials does its cards */
function dealProvas(qs) {
  const kinds = shuf(Object.keys(PROVA)), used = new Set();
  PROVA_RUNGS.forEach((i, k) => {
    if (i >= qs.length) return;
    const kind = kinds[k % kinds.length], tier = LADDER[i].tier, d = PROVA_DEAL[kind](tier, used);
    if (!d) return;                             // nothing fair to deal: the rung keeps its question
    qs[i] = { t: PROVA[kind].n, type: 'txt', a: [], choices: [], _prova: kind, _p: d, _cat: GC_PROVA, _d: tier };
  });
  return qs;
}

/* is a prova being played right now (on its game's screen, for the rung in hand)? */
const PROVA_SC = { ano: 'ano', onde: 'onde', cron: 'cron', aod: 'aod', mito: 'mito', soletra: 'soletra', pares: 'pares' };
const provaQ = () => (isMil && cat && cat.qs && cat.qs[qi] && cat.qs[qi]._prova ? cat.qs[qi] : null);
const provaOn = () => { const q = provaQ(); return !!(q && sc === PROVA_SC[q._prova]); };

/* the card turned: the game's own state, set for one turn under the climb */
function startProva() {
  const q = provaQ();
  if (!q) return;
  const d = q._p, k = q._prova;
  clearInterval(tmr);
  if (k === 'ano') {
    ano = { qs: [{ e: _pvEvt(d.e), lo: d.lo, hi: d.hi, start: d.start }], i: 0, guess: d.start, log: [], pts: 0, phase: 'guess', quest: { tol: d.tol } };
  } else if (k === 'onde') {
    const e = _pvEvt(d.e);
    onde = { qs: [{ e, at: ONDE_AT[e.id] }], i: 0, pin: null, log: [], pts: 0, phase: 'guess', v: { cx: 0, cy: 0, z: 1 }, quest: { km: d.km } };
  } else if (k === 'cron') {
    const cur = d.cur.map(_pvEvt);
    cron = { deck: cur.slice(1).reverse(), line: d.line.map(_pvEvt), cur: cur[0], lives: 1, score: 0, phase: 'place', last: null, log: [], picks: [], quest: { need: cur.length } };
  } else if (k === 'aod') {
    aodNew(d.seed); aod.quest = { need: d.need, band: d.band };
    /* the second event is drawn again, now that the run knows how near the years may be */
    aod.used.delete(aod.b.id); aod.b = aodPick(aod.a); aod.used.add(aod.b.id);
  } else if (k === 'mito') {
    mfNew(d.seed); mf.quest = { need: d.need }; mf.lives = 1;
  } else if (k === 'soletra') slSet(d, { quest: true });
  else if (k === 'pares') prSet(d, { quest: true });
  sc = PROVA_SC[k];
  go();
}

/* the bar a prova is played under: the way out, what it is, the rung it is for and what the rung is worth */
function provaBar() {
  const q = provaQ(), k = q ? PROVA[q._prova] : null;
  if (!k) return topbar('Prova');
  return `<div class="pv-bar">
    <div class="pv-top">
      <button id="bexit" class="btn btn-ghost btn-icon" aria-label="Sair">${ICON.close('currentColor', 12)}</button>
      <span class="chip pv-chip">${k.ic('currentColor', 11)}<span>Prova · ${k.n}</span></span>
      <span class="pv-stake"><small>degrau ${rung + 1} · vale</small><b>${fama(RUNG().v)}</b></span>
    </div>
    <div class="rail">${LADDER.map((step, i) => `<span class="notch${
      i < rung ? ' notch-done' : ''}${step.safe ? ' notch-safe' : ''}${i === rung ? ' notch-now' : ''}"></span>`).join('')}</div>
  </div>`;
}
/* how far along a prova of several turns is: "1 de 3" as pips */
const provaPips = (done, need, bad) => `<span class="pv-pips" role="img" aria-label="${done} de ${need}">${
  Array.from({ length: need }, (_, i) => `<i class="${i < done ? 'on' : ''}${bad && i === done ? ' bad' : ''}"></i>`).join('')}</span>`;
/* the verdict, once the prova is settled: what the name keeps */
function provaVerdict(pass) {
  return `<div class="pv-verdict ${pass ? 'is-good' : 'is-bad'}" role="status">
    <b>${pass ? ICON.check('currentColor', 14) + ' Prova vencida!' : ICON.cross('currentColor', 14) + ' Não foi desta vez'}</b>
    <small>${pass ? `Seu nome, lembrado ${famaPor(RUNG().v)}${rung + 1 < LADDER.length ? ` · próximo degrau: ${fama(LADDER[rung + 1].v)}` : ''}`
      : `Seu nome fica ${safetyNet() ? 'lembrado ' + famaPor(safetyNet()) : 'por um instante'}`}</small>
  </div>`;
}
const provaGoLabel = pass => pass ? `Continuar ${ICON.back('currentColor', 11).replace('<svg', '<svg style="transform:scaleX(-1)"')}` : 'Ver resultado';

/* The prova is settled: the climb takes it as it takes an answer — up a rung, or down to the last one engraved */
function provaDone(pass) {
  const q = provaQ();
  if (!q) return;
  const k = q._prova, p = pass ? 3 : 0;
  /* the game's own state is put away: its screen, opened later from the cover, starts a game of its own */
  if (k === 'ano') ano = null; else if (k === 'onde') onde = null; else if (k === 'cron') cron = null;
  else if (k === 'aod') { clearTimeout(aod && aod.adv); aod = null; } else if (k === 'mito') mf = null;
  else if (k === 'soletra') sl = null; else if (k === 'pares') pr = null;
  prevPts = pts;
  if (pass) { streak++; nCorrect++; pts += Math.round(4 * (streak >= 6 ? 3 : streak >= 3 ? 2 : 1) * DCFG().pmul); }
  else streak = 0;
  bestStreak = Math.max(bestStreak, streak);
  runLog.push(p);
  /* the provas won, and of which kinds (the insígnias count them) */
  if (pass) { stats.provas = (stats.provas || 0) + 1; stats.provaK = stats.provaK || {}; stats.provaK[k] = 1; LS.set('stats', stats); }
  if (pass) snd.rung(rung); else { snd.drop(); banked = safetyNet(); }
  sc = 'reveal';
  advanceAfterReveal(p);
  go();
}

/* Plays the prova in hand to its verdict, right or wrong, and stops on that verdict's screen; provaGo is the tap
   that follows it. The suite and the layout probe drive whole climbs with these (tools/history/test_all.py). */
function provaAuto(pass) {
  const q = provaQ();
  if (!q || !provaOn()) return false;
  const k = q._prova, slots = line => line.map((_, i) => i).concat(line.length);
  if (k === 'ano') {
    const x = ano.qs[0], off = ano.quest.tol + 3;
    ano.guess = pass ? x.e.y : x.e.y + off <= x.hi ? x.e.y + off : x.e.y - off;
    anoCommit();
  } else if (k === 'onde') {
    const at = onde.qs[0].at;
    ondeSetPin(pass ? [at[0], at[1]] : [Math.max(-80, Math.min(80, -at[0] * .5 - 20)), at[1] + 150]);
    ondeCommit();
  } else if (k === 'cron') {
    for (;;) {
      cronPlace(slots(cron.line).find(i => cronFits(cron.line, cron.cur, i) === pass));
      if (cron.lives <= 0 || !cron.deck.length) break;
      cronNext();
    }
  } else if (k === 'aod') {
    for (;;) {
      const truth = aod.b.y < aod.a.y ? 'antes' : 'depois';
      aodAnswer(pass ? truth : truth === 'antes' ? 'depois' : 'antes');
      if (!aod.ok || aod.score >= aod.quest.need) break;
      aodNext();
    }
  } else if (k === 'mito') {
    for (;;) {
      const v = mfCard().v;
      mfAnswer(pass ? v : v === 'f' ? 'm' : 'f');
      if (!mf.ok || mf.score >= mf.quest.need) break;
      mfNext();
    }
  } else if (k === 'soletra') {
    sl.flat.forEach((ch, i) => { if (!sl.given.has(i)) sl.put[i] = sl.tray.findIndex((t, j) => !sl.put.includes(j) && slFold(t) === slFold(ch)); });
    if (!pass) {
      /* two different letters change places */
      const a = sl.put.findIndex(v => v !== null), b = sl.put.findIndex(v => v !== null && slFold(sl.tray[v]) !== slFold(sl.tray[sl.put[a]]));
      if (b >= 0) [sl.put[a], sl.put[b]] = [sl.put[b], sl.put[a]];
    }
    slCheck();
  } else if (k === 'pares') {
    pr.link = pr.left.map((_, i) => pr.right.indexOf(i));
    if (!pass) [pr.link[0], pr.link[1]] = [pr.link[1], pr.link[0]];
    prCheck();
  }
  return true;
}
function provaGo() {
  const q = provaQ();
  if (q && provaOn()) ({ ano: anoNext, onde: ondeNext, cron: cronNext, aod: aodNext, mito: mfNext, soletra: slGo, pares: prGo })[q._prova]();
}
