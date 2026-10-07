function GEN_QS(tier) {
  /* GENCAT — badge shown in the quiz header for generated questions */
  const GC = {
    pol:   { id:'g_pol',   name:'Estados',      emoji:'🏛️', col:'#8A5A2B' },
    nat:   { id:'g_nat',   name:'Origens',      emoji:'🌍', col:'#42A5F5' },
    hist:  { id:'g_hist',  name:'Cronologia',   emoji:'📜', col:'#C8A400' },
    squad: { id:'g_squad', name:'Ligações',     emoji:'🔗', col:'#66BB6A' },
    era:   { id:'g_era',   name:'Época',        emoji:'⏳', col:'#FFA726' },
    path:  { id:'g_path',  name:'Caminhos',     emoji:'🔀', col:'#26C6DA' },
    event: { id:'g_event', name:'Grandes Eventos', emoji:'🌋', col:'#C0562E' },
    nobel: { id:'g_nobel', name:'Prêmio Nobel', emoji:'🏅', col:'#B8860B' },
    nick:  { id:'g_nick',  name:'Epítetos',     emoji:'🏷️', col:'#8E4E9E' },
    flag:  { id:'g_flag',  name:'Bandeiras',    emoji:'🚩', col:'#C0392B' },
    place: { id:'g_place', name:'Lugares',      emoji:'🗺️', col:'#3F6FB5' },
    count: { id:'g_count', name:'Datas',        emoji:'🔢', col:'#5C7F67' },
    duel:  { id:'g_duel',  name:'Duelo',        emoji:'🤺', col:'#5D4037' },
  };
  const out  = [];
  const rndOf = a => a[Math.floor(rnd() * a.length)];
  const pick = (a, n) => shuf(a).slice(0, n);
  const born = p => p.era[0];
  /* a century, as the album would print it: 'século XVIII', 'século V a.C.' */
  const cent = p => centTxt(born(p));
  const overlap = (p, ev) => p.era[0] <= ev.y[1] && p.era[1] >= ev.y[0];
  const natOk = p => !NAT_SKIP.has(p.id) && CTRY_NAME[p.ctry] && FLAGS[p.ctry];

  /* ── 1. Which state is tied to this figure? ── */
  pick(PL.filter(p => (p.clubs || []).length), 26).forEach(p => {
    const mine = p.clubs;
    out.push({
      t: `Qual destes estados está ligado a ${p.n}?`,
      a: [rndOf(mine)],
      pool: CL.filter(c => !mine.includes(c.id)).map(c => c.id),
      face: p.img, _cat: GC.pol,
      d: p.ctry === 'BRA' ? 2 : 3,
    });
  });

  /* ── 2. Birthplace ── */
  const byCtry = {};
  PL.filter(natOk).forEach(p => { (byCtry[p.ctry] = byCtry[p.ctry] || []).push(p); });
  Object.keys(byCtry).forEach(c => {
    const p = rndOf(byCtry[c]);
    out.push({
      t: `Qual destes personagens nasceu ${ctryEm(c)}?`,
      a: [p.id], type: 'player', flag: c,
      pool: PL.filter(x => x.ctry !== c).map(x => x.id), _cat: GC.nat,
      d: c === 'BRA' ? 1 : 2,
    });
  });

  /* ── 3. Oldest / youngest / longest-lived state (comparison, exact ten) ── */
  for (let i = 0; i < 4; i++) {
    const set = pick(CL, 10);
    const oldest = set.reduce((a, b) => (a.f <= b.f ? a : b));
    if (set.filter(c => c.f === oldest.f).length > 1) continue;
    out.push({ t: 'Qual destes estados surgiu primeiro?',
               a: [oldest.id], fixed: set.map(c => c.id), _cat: GC.hist, d: 2 });
  }
  for (let i = 0; i < 4; i++) {
    const set = pick(CL, 10);
    const newest = set.reduce((a, b) => (a.f >= b.f ? a : b));
    if (set.filter(c => c.f === newest.f).length > 1) continue;
    out.push({ t: 'Qual destes estados é o mais recente — surgiu por último?',
               a: [newest.id], fixed: set.map(c => c.id), _cat: GC.hist, d: 3 });
  }
  for (let i = 0; i < 4; i++) {
    const set = pick(CL.filter(c => c.e !== 0), 10);
    const len = c => c.e - c.f;
    const top = set.reduce((a, b) => (len(a) >= len(b) ? a : b));
    if (set.length < 10 || set.filter(c => len(c) === len(top)).length > 1) continue;
    out.push({ t: 'Qual destes estados durou mais tempo?',
               a: [top.id], fixed: set.map(c => c.id), _cat: GC.hist, d: 3 });
  }

  /* ── 4. Multi-select: states of the ancient world among the later ones ── */
  for (let i = 0; i < 3; i++) {
    const old = pick(CL.filter(c => c.f < 0), 3);
    const rest = pick(CL.filter(c => c.f >= 1000), 7);
    if (old.length < 3 || rest.length < 7) break;
    out.push({ t: 'Selecione os estados que já existiam antes de Cristo',
               a: old.map(c => c.id), fixed: old.concat(rest).map(c => c.id), _cat: GC.hist, d: 2 });
  }
  for (let i = 0; i < 3; i++) {
    const gone = pick(CL.filter(c => c.e !== 0), 3);
    const live = pick(CL.filter(c => c.e === 0), 7);
    if (gone.length < 3 || live.length < 7) break;
    out.push({ t: 'Selecione os estados que deixaram de existir',
               a: gone.map(c => c.id), fixed: gone.concat(live).map(c => c.id), _cat: GC.hist, d: 2 });
  }

  /* ── 5. Who else is tied to this state? ── */
  const polFigs = {};
  PL.forEach(p => (p.clubs || []).forEach(c => (polFigs[c] = polFigs[c] || []).push(p)));
  pick(Object.keys(polFigs).filter(c => polFigs[c].length >= 2), 7).forEach(c => {
    const yes = pick(polFigs[c], 2);
    const no  = PL.filter(p => !(p.clubs || []).includes(c));
    if (no.length < 8) return;
    out.push({
      t: `Selecione os 2 personagens ligados ${toClub(c)}`,
      a: yes.map(p => p.id), type: 'player',
      pool: no.map(p => p.id), crest: c, _cat: GC.squad, d: 3,
    });
  });
  pick(Object.keys(polFigs).filter(c => polFigs[c].length >= 3), 6).forEach(c => {
    const yes = rndOf(polFigs[c]);
    out.push({
      t: `Qual destes personagens está ligado ${toClub(c)}?`,
      a: [yes.id], type: 'player',
      pool: PL.filter(p => !(p.clubs || []).includes(c)).map(p => p.id), _cat: GC.squad,
      d: polFigs[c].length >= 6 ? 2 : 3,
    });
  });

  /* ── 6. Century of birth ── */
  pick(PL, 16).forEach(p => {
    const others = PL.filter(x => cent(x) !== cent(p));
    if (others.length < 9) return;
    out.push({
      t: `Qual destes personagens nasceu no ${cent(p)}?`,
      a: [p.id], type: 'player',
      pool: others.map(x => x.id), _cat: GC.era, d: 3,
    });
  });
  pick(PL, 12).forEach(p => {
    const mine = cent(p), key = centNum(born(p)) * (born(p) < 0 ? -1 : 1);
    const pool = [];
    for (let k = -8; k <= 21; k++) { if (k === 0) continue; const y = k < 0 ? (k + 1) * 100 - 50 : k * 100 - 50; pool.push(centTxt(y)); }
    const near = [...new Set(pool)].filter(c => c !== mine);
    const opts = pick(near.sort((a, b) => Math.abs(near.indexOf(a) - near.indexOf(mine)) - Math.abs(near.indexOf(b) - near.indexOf(mine)) + (rnd() - .5) * 4).slice(0, 9), 5);
    out.push({
      t: `Em que século nasceu ${p.n}?`, type: 'txt',
      choices: shuf([mine].concat(opts)), a: [mine], face: p.img, _cat: GC.count, d: 3,
    });
  });

  /* ── 7. The path: which figure is tied to all of these states? ── */
  pick(PL.filter(p => (p.clubs || []).length >= 2), 8).forEach(p => {
    const path = p.clubs.slice(0, 3);
    out.push({
      t: `Que personagem esteve ligado a todos estes estados?\n${path.map(clubName).join('  ·  ')}`,
      a: [p.id], type: 'player',
      path, textTiles: true,
      pool: PL.filter(x => x.id !== p.id && !path.every(c => (x.clubs || []).includes(c))).map(x => x.id),
      _cat: GC.path, d: 3,
    });
  });

  /* ── 8. Monuments ── */
  const STIDS = Object.keys(STAD);
  pick(STIDS.filter(k => STAD[k].p), 6).forEach(k => {
    const owner = STAD[k].p;
    out.push({
      t: `Qual destes estados está ligado ao monumento ${STAD[k].name} (${STAD[k].city})?`,
      a: [owner], pool: CL.filter(c => c.id !== owner).map(c => c.id), stad: k, _cat: GC.place, d: 3,
    });
  });
  pick(STIDS, 8).forEach(k => {
    const mine = STAD[k].city;
    const others = [...new Set(STIDS.map(x => STAD[x].city))].filter(c => c !== mine);
    if (others.length < 5) return;
    out.push({
      t: 'Onde fica este monumento?', type: 'txt',
      choices: shuf([mine].concat(pick(others, 5))), a: [mine], stad: k, _cat: GC.place, d: 2,
    });
  });

  /* ── 9. Region of a state ── */
  const REG_EM = { EU:'na Europa', AS:'na Ásia', AF:'na África', AM:'nas Américas' };
  pick(CL, 10).forEach(c => {
    out.push({
      t: `Qual destes estados surgiu ${REG_EM[c.s]}?`,
      a: [c.id], pool: CL.filter(x => x.s !== c.s).map(x => x.id), _noClub: true, region: c.s, _cat: GC.pol, d: 1,
    });
  });

  /* ── 10. Head-to-head: who lived longer, who was born first ── */
  for (let i = 0; i < 4; i++) {
    const two = pick(PL, 2);
    const span = p => p.era[1] - p.era[0];
    if (span(two[0]) === span(two[1]) || Math.abs(span(two[0]) - span(two[1])) < 8) continue;
    const longer = span(two[0]) > span(two[1]) ? two[0] : two[1];
    out.push({ t: 'Quem viveu mais tempo?', a: [longer.id], type: 'player',
               fixed: two.map(p => p.id), _cat: GC.era, d: 2 });
  }
  for (let i = 0; i < 5; i++) {
    const set = pick(PL, 10);
    const first = set.reduce((a, b) => (born(a) <= born(b) ? a : b));
    if (set.filter(p => born(p) === born(first)).length > 1) continue;
    out.push({ t: 'Qual destes personagens nasceu primeiro?',
               a: [first.id], type: 'player', fixed: set.map(p => p.id), _cat: GC.era, d: 3 });
  }
  for (let i = 0; i < 4; i++) {
    const set = pick(PL, 10);
    const last = set.reduce((a, b) => (born(a) >= born(b) ? a : b));
    if (set.filter(p => born(p) === born(last)).length > 1) continue;
    out.push({ t: 'Qual destes personagens nasceu por último?',
               a: [last.id], type: 'player', fixed: set.map(p => p.id), _cat: GC.era, d: 3 });
  }

  /* ── 11. The intruder from another age ── */
  for (let i = 0; i < 5; i++) {
    const c = rndOf(PL);
    const same = PL.filter(p => cent(p) === cent(c));
    const odd = PL.filter(p => Math.abs(born(p) - born(c)) > 250);
    if (same.length < 9 || !odd.length) continue;
    const o = rndOf(odd);
    out.push({
      t: `Nove destes personagens nasceram no ${cent(c)}. Qual é o intruso?`,
      a: [o.id], type: 'player',
      fixed: pick(same, 9).map(p => p.id).concat(o.id), _cat: GC.era, d: 3,
    });
  }

  /* ── 12. Contemporaries ── */
  pick(PL, 6).forEach(p => {
    const overlaps = x => x.id !== p.id &&
      Math.min(x.era[1], p.era[1]) - Math.max(x.era[0], p.era[0]) >= 25;
    const mates = PL.filter(overlaps);
    const strangers = PL.filter(x => x.id !== p.id && !overlaps(x) && Math.abs(x.era[0] - p.era[0]) > 120);
    if (!mates.length || strangers.length < 9) return;
    const mate = rndOf(mates);
    out.push({
      t: `Quem foi contemporâneo de ${p.n}?`,
      a: [mate.id], type: 'player',
      fixed: pick(strangers, 9).map(x => x.id).concat(mate.id),
      face: p.img, _cat: GC.era, d: 3,
    });
  });

  /* ── 13. Great events: who lived through them ── */
  const evIds = Object.keys(EVENTS);
  pick(evIds, 12).forEach(ev => {
    const E_ = EVENTS[ev];
    const yes = PL.filter(p => p.ev.includes(ev) && overlap(p, E_));
    const no  = PL.filter(p => !overlap(p, E_) && Math.min(Math.abs(p.era[1] - E_.y[0]), Math.abs(p.era[0] - E_.y[1])) > 60);
    if (!yes.length || no.length < 9) return;
    out.push({
      t: `Qual destes personagens viveu durante ${theEvent(ev)} (${yearTxt(E_.y[0])}–${yearTxt(E_.y[1])})?`,
      a: [rndOf(yes).id], type: 'player',
      pool: no.map(p => p.id), _cat: GC.event, d: 3,
    });
  });
  pick(evIds.filter(ev => PL.filter(p => p.ev.includes(ev) && overlap(p, EVENTS[ev])).length >= 2), 5).forEach(ev => {
    const E_ = EVENTS[ev];
    const yes = pick(PL.filter(p => p.ev.includes(ev) && overlap(p, E_)), 2);
    const no  = pick(PL.filter(p => !overlap(p, E_) && Math.abs(p.era[0] - E_.y[0]) < 220), 8);
    if (no.length < 8) return;
    out.push({
      t: `Selecione os 2 personagens que viveram durante ${theEvent(ev)}`,
      a: yes.map(p => p.id), type: 'player',
      fixed: yes.concat(no).map(p => p.id), _cat: GC.event, d: 3,
    });
  });

  /* ── 14. The Nobel Prize ── */
  for (let i = 0; i < 4; i++) {
    const yes = PL.filter(p => p.nb > 0);
    const no  = PL.filter(p => !p.nb && p.era[1] >= 1901);
    if (yes.length < 3 || no.length < 8) break;
    const two = pick(yes, 2);
    out.push({
      t: 'Selecione os 2 personagens que ganharam o Prêmio Nobel',
      a: two.map(p => p.id), type: 'player',
      fixed: two.concat(pick(no, 8)).map(p => p.id), _cat: GC.nobel, d: 3,
    });
  }
  pick(PL.filter(p => p.nb > 0), 5).forEach(p => {
    out.push({
      t: 'Qual destes personagens ganhou o Prêmio Nobel?',
      a: [p.id], type: 'player',
      pool: PL.filter(x => !x.nb && x.era[1] >= 1901).map(x => x.id), _cat: GC.nobel, d: 2,
    });
  });
  { const set = PL.filter(p => p.nb > 0);
    const two = set.filter(p => p.nb === 2);
    if (two.length) out.push({
      t: 'Qual destes personagens ganhou DOIS prêmios Nobel?',
      a: [two[0].id], type: 'player',
      fixed: [two[0]].concat(pick(set.filter(p => p.nb === 1), 9)).map(p => p.id), _cat: GC.nobel, d: 3,
    });
  }

  /* ── 15. Epithets, both ways round ── */
  const nickOk = p => {
    if (!p.nick) return false;
    const nk = _fold(p.nick), nm = _fold(p.n);
    const words = s => s.split(/[^a-z0-9]+/).filter(w => w.length >= 4 && !/^(autor|pintor|pai|primeiro|ultimo|imperador|rainha|lider|rei)$/.test(w));
    if (words(nm).some(w => nk.includes(w))) return false;
    return !PL.some(x => x.id !== p.id && x.nick && _fold(x.nick) === nk);
  };
  pick(PL.filter(nickOk), 12).forEach(p => {
    out.push({
      t: `Quem é conhecido como "${p.nick}"?`,
      a: [p.id], type: 'player',
      pool: PL.filter(x => x.id !== p.id).map(x => x.id), _cat: GC.nick,
      d: FAMOUS.has(p.id) ? 1 : 3,
    });
  });
  pick(PL.filter(nickOk), 8).forEach(p => {
    const others = pick(PL.filter(x => x.nick && x.id !== p.id && x.pos === p.pos && nickOk(x)), 5);
    if (others.length < 5) return;
    out.push({
      t: `Qual epíteto acompanha ${p.n}?`, type: 'txt',
      choices: shuf([p.nick].concat(others.map(x => x.nick))), a: [p.nick], face: p.img, _cat: GC.nick, d: 3,
    });
  });

  /* ── 16. Birthplace, the other way round: a country per figure ── */
  pick(PL.filter(natOk), 12).forEach(p => {
    const all = Object.keys(CTRY_NAME).filter(c => c !== p.ctry && FLAGS[c]);
    out.push({
      t: `Em que país nasceu ${p.n}?`, type: 'txt',
      choices: shuf([CTRY_NAME[p.ctry]].concat(pick(all, 5).map(c => CTRY_NAME[c]))), a: [CTRY_NAME[p.ctry]],
      face: p.img, _cat: GC.nat, d: 2,
    });
  });

  /* ── 17. Flags: whose is this? ── */
  pick(Object.keys(CTRY_NAME).filter(c => FLAGS[c]), 14).forEach(c => {
    const all = Object.keys(CTRY_NAME).filter(x => x !== c && FLAGS[x]);
    out.push({
      t: 'De que país é esta bandeira?', type: 'txt',
      choices: shuf([CTRY_NAME[c]].concat(pick(all, 5).map(x => CTRY_NAME[x]))), a: [CTRY_NAME[c]],
      flag: c, _flagIsQ: true, _cat: GC.flag, d: ['BRA', 'USA', 'FRA', 'ITA', 'GER', 'JPN', 'ESP', 'POR'].includes(c) ? 1 : 3,
    });
  });

  /* ── 18. Years: when did they die? (only where the date is not in dispute) ── */
  pick(PL.filter(p => born(p) >= 1400), 10).forEach(p => {
    const y = p.era[1];
    const opts = new Set();
    while (opts.size < 5) { const o = y + Math.round((rnd() - .5) * 2 * 22); if (o !== y && o > born(p) + 12) opts.add(o); }
    out.push({
      t: `Em que ano morreu ${p.n}?`, type: 'txt',
      choices: shuf([String(y)].concat([...opts].map(String))), a: [String(y)], face: p.img, _cat: GC.count, d: 4,
    });
  });
  pick(PL.filter(p => born(p) >= 1400), 8).forEach(p => {
    const y = born(p);
    const opts = new Set();
    while (opts.size < 5) { const o = y + Math.round((rnd() - .5) * 2 * 20); if (o !== y) opts.add(o); }
    out.push({
      t: `Em que ano nasceu ${p.n}?`, type: 'txt',
      choices: shuf([String(y)].concat([...opts].map(String))), a: [String(y)], face: p.img, _cat: GC.count, d: 4,
    });
  });

  /* ── 19. Duelo: two cards only ──
     Dates before the year 1000 are often approximate in the album, so an
     ancient pair needs a century between them; a modern pair, a decade.
     The closer the two, the harder the duel. */
  const sure = (a, b) => Math.abs(a - b) >= (Math.min(a, b) < 1000 ? 100 : 10);
  const duelD = gap => gap < 40 ? 3 : gap < 150 ? 2 : 1;
  for (let i = 0, made = 0; i < 60 && made < 12; i++) {
    const [p1, p2] = pick(PL.filter(p => p.era), 2);
    if (!p1 || !p2 || !sure(born(p1), born(p2))) continue;
    const first = born(p1) < born(p2) ? p1 : p2;
    out.push({ t: 'Duelo: quem nasceu primeiro?', type: 'player', a: [first.id], fixed: [p1.id, p2.id], duel: true,
               icon: 'hourglass', _cat: GC.duel, d: duelD(Math.abs(born(p1) - born(p2))) });
    made++;
  }
  for (let i = 0, made = 0; i < 40 && made < 6; i++) {
    const [c1, c2] = pick(CL, 2);
    if (!c1 || !c2 || !sure(c1.f, c2.f)) continue;
    const first = c1.f < c2.f ? c1 : c2;
    out.push({ t: 'Duelo: qual destes estados surgiu primeiro?', a: [first.id], fixed: [c1.id, c2.id], duel: true,
               icon: 'hourglass', _cat: GC.duel, d: duelD(Math.abs(c1.f - c2.f)) });
    made++;
  }
  /* who lived longer: only figures born after 1400, whose dates are certain,
     and a lifespan apart by at least eight years */
  for (let i = 0, made = 0; i < 60 && made < 6; i++) {
    const [p1, p2] = pick(PL.filter(p => p.era && born(p) >= 1400 && p.era[1] < 2026), 2);
    if (!p1 || !p2) continue;
    const l1 = p1.era[1] - p1.era[0], l2 = p2.era[1] - p2.era[0];
    if (Math.abs(l1 - l2) < 8) continue;
    out.push({ t: 'Duelo: quem viveu mais anos?', type: 'player', a: [l1 > l2 ? p1.id : p2.id], fixed: [p1.id, p2.id], duel: true,
               icon: 'hourglass', _cat: GC.duel, d: Math.abs(l1 - l2) < 20 ? 3 : 2 });
    made++;
  }

  // Safety net: a generator bug must never put an unanswerable question in front
  // of a player, so drop anything whose answers don't resolve.
  return out.filter(q =>
    !q._skip &&
    q.a && q.a.length &&
    (q.type === 'txt'
      ? Array.isArray(q.choices) && q.choices.length >= 4 &&
        new Set(q.choices).size === q.choices.length &&
        q.a.every(a => q.choices.includes(a))
      : q.a.every(id => (q.type === 'player' ? PL : CL).some(x => x.id === id))));
}
