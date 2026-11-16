
/* ═══════════════════════════════════════════════════
   A CAPA — the cover, quiet
   One thing to do, said once: the climb. Under it, the plaque the player's
   name is on so far; the day's five games as five small seals; the album;
   and one door to every other game (the Jogos page below). Everything that
   used to crowd the cover — eight tiles, the stamp album, the strip of
   insígnias — is one tap in, where it has room.
═══════════════════════════════════════════════════ */
/* the day's five games: the same for everyone, each played once */
function hojeJogos() {
  const k = cronDiaKept();
  return [
    ['daily-btn', 'Diário',   ICON.calendar, dailyDone()],
    ['hoje-btn',  'Datas',    ICON.sun,      !!hojeRes()],
    ['hj-onde',   'Mapa',     ICON.globe,    !!ondeDiaRes()],
    ['hj-cron',   'Linha',    ICON.timeline, !!(k && k.done)],
    ['hj-graus',  'Corrente', ICON.chain,    !!sgDiaRes()],
  ];
}
/* one line of news, when there is some: a friend's challenge, the welcome packet, a birthday edition to win today */
function homeNews() {
  const v = V();
  if (chal && !chal.accepted) return chalNews();
  if (v.welcome && v.welcome.length) return `<button id="bwelc" class="home-news is-gift" type="button">
    <span class="hn-ic">${ICON.star('currentColor', 13)}</span>
    <span><b>Pacote de boas-vindas</b> · suas figurinhas foram certificadas</span></button>`;
  const t = todaysBdays().filter(id => !v.lim[`${id}:${new Date().getFullYear()}`]);
  if (t.length) return `<button id="bvit" class="home-news" type="button">
    <span class="hn-ic">${ICON.star('currentColor', 13)}</span>
    <span>Aniversário de <b>${PL.find(p => p.id === t[0]).n}</b> · edição do dia</span></button>`;
  return '';
}
function homeHtml() {
  const best = milBest(), kept = famaIdx(best) + 1;
  const { p: hero, num } = heroSticker();
  const d = new Date(), pct = albumPct();
  /* three faces for the album's fan: the latest you hold, else great ones still to find */
  const held = PL.filter(p => album.has(p.id) && !UNPAINTED.has(p.id));
  const fan = (held.length >= 3 ? held.slice(-3)
    : [...held, ...PL.filter(p => FAMOUS.has(p.id) && !album.has(p.id) && !UNPAINTED.has(p.id))].slice(0, 3));
  const dia = hojeJogos(), feitos = dia.filter(g => g[3]).length, prox = dia.findIndex(g => !g[3]);
  const e = earnedMedals().length;
  return `
  <div class="pg pg-home cover hm">
    <figure class="cv-art">
      <img class="cv-bg" src="${hero.img}" alt="" aria-hidden="true" decoding="async">
      <img src="${hero.img}" alt="${hero.n}" decoding="async">
      <div class="cv-mast"><span>History Quiz</span><span>Edição ${d.getFullYear()}</span></div>
      <figcaption class="cv-cap"><b>Nº ${String(num).padStart(3, '0')}</b> ${hero.n}<i>${POS_NAME[hero.pos]} · ${CTRY_NAME[hero.ctry] || hero.ctry}</i></figcaption>
    </figure>

    <div class="cv-body">
      <h1 class="display cv-title">Entre para a <em class="brass">História</em></h1>
      <p class="cv-dek">Dezesseis degraus. A cada um, o seu nome é lembrado por mais tempo — de <b>um dia</b> até <b>para sempre</b>.</p>

      <div class="cv-cta">
        <button id="mil-btn" class="btn btn-brass btn-lg">${ICON.play('currentColor', 15)} ${best > 0 ? 'Subir de novo' : 'Começar a subir'}</button>
        <button id="beu" class="hm-placa" type="button" aria-label="Sua figurinha: ${nomeJog() || 'Você'}, lembrado ${kept ? famaPor(best) : 'por um instante'}">${placaHtml(kept, { sm: true })}</button>
      </div>

      ${homeNews()}

      <section class="hm-hoje" aria-label="Os jogos de hoje">
        <h2 class="cv-h"><span>Hoje · ${d.getDate()} de ${MES_LONGO[d.getMonth()]}</span><small>${feitos === dia.length ? 'tudo feito' : feitos + ' de ' + dia.length}</small></h2>
        <div class="hm-dia">
          ${dia.map(([id, n, ic, done], i) => `<button id="${id}" class="hm-d${done ? ' is-done' : ''}${i === prox ? ' is-next' : ''}" type="button" aria-label="${n}${done ? ': feito hoje' : ''}">
            <span class="hm-seal">${(done ? ICON.check : ic)('currentColor', 15)}</span><small>${n}</small></button>`).join('')}
        </div>
      </section>

      <div class="cv-cols hm-cols">
        <button id="balb" class="cv-album" type="button">
          <span class="cv-fan" aria-hidden="true">${fan.map((p, i) => `<i class="${album.has(p.id) ? 'on' : ''}" style="--i:${i}"><img src="${p.img}" alt="" aria-hidden="true" loading="lazy"></i>`).join('')}</span>
          <span class="cv-at">
            <span class="cv-h">Meu álbum</span>
            <b>${album.size}<small> de ${ALL_STICKERS.length}</small></b>
            <span class="cv-bar"><i style="width:${Math.max(2, pct)}%"></i></span>
          </span>
        </button>
        <button id="bjogos" class="cv-album hm-jogos" type="button">
          <span class="hm-jg-ic" aria-hidden="true">${[ICON.map, ICON.hourglass, ICON.globe].map((ic, i) => `<i class="mode-disc mode-${['jor', 'ano', 'onde'][i]}" style="--i:${i}">${ic('currentColor', 13)}</i>`).join('')}</span>
          <span class="cv-at"><span class="cv-h">Jogos</span><b>${JOGOS_N + GAB.length}<small> jeitos de jogar</small></b></span>
        </button>
      </div>

      <div class="home-foot">
        <button id="bmute" class="btn btn-ghost btn-icon" title="Som" aria-label="Som">${
          muted ? ICON.mute('currentColor', 14) : ICON.sound('currentColor', 14)}</button>
        <button id="bmetas" class="link">Metas <span class="num">${(() => { try { return metasTail(); } catch (err) { return ''; } })()}</span></button>
        <button id="bmed"  class="link">Insígnias <span class="num">${e}/${MEDALS.length}</span></button>
        <button id="bcred" class="link">Créditos</button>
      </div>
      <p class="home-indep">App independente · imagens da Wikimedia Commons</p>
    </div>
  </div>`;
}

/* ═══════════════════════════════════════════════════
   JOGOS — every other way to play, on one page
   The rounds to train on, the games of time and place, and the door of the
   Gabinete de curiosidades. The cover used to carry all of these as tiles.
═══════════════════════════════════════════════════ */
const JOGOS_N = 9;
function jogosHtml() {
  const tile = (id, label, tail, kind, ic) => `
    <button id="${id}" class="jg-t mode-${kind}" type="button">
      <span class="mode-disc jg-ic">${ic('currentColor', 16)}</span>
      <span class="jg-tx"><b>${label}</b><small>${tail}</small></span>
    </button>`;
  const nx = jorNextIdx(), jt = jorTotal();
  const rA = hojeRes(), bA = LS.get('anoBest', 0), bO = LS.get('ondeBest', 0), bC = LS.get('cronBest', 0);
  return `
  <div class="pg jg-pg">
    ${topbar('Jogos')}
    <div class="display jg-h"><em>Outros jeitos de jogar</em></div>
    <h2 class="cv-h jg-sec"><span>Para treinar</span></h2>
    <div class="jg-grid">
      ${tile('jor-btn', 'Jornada', nx < 0 ? 'Completa · ' + jt + ' estrelas' : nx === 0 ? 'Seis eras, 19 paradas' : 'Parada ' + (nx + 1) + ' de ' + JOR_STOPS.length, 'jor', ICON.map)}
      ${tile('cta-btn', 'Treino', 'Sem pressa, três níveis', 'train', ICON.ladder)}
      ${tile('surv-btn', 'Mata-mata', (stats.survBest || 0) > 0 ? 'Recorde ' + stats.survBest : 'Até errar uma', 'surv', ICON.shield)}
      ${tile('rev-btn', 'Revisar', revTail(), revDue().length ? 'rev' : 'rev is-off', ICON.book)}
    </div>
    <h2 class="cv-h jg-sec"><span>No tempo e no mapa</span></h2>
    <div class="jg-grid jg-grid-3">
      ${tile('ano-btn', 'Que ano?', bA > 0 ? 'Recorde ' + bA : 'Na régua', rA ? 'ano' : 'hoje', ICON.hourglass)}
      ${tile('onde-btn', 'Onde foi?', bO > 0 ? 'Recorde ' + bO : 'No mapa', 'onde', ICON.globe)}
      ${tile('cron-btn', 'Cronologia', bC > 0 ? 'Recorde ' + bC : 'Na linha', 'cron', ICON.timeline)}
    </div>
    <h2 class="cv-h jg-sec"><span>Com as mãos</span></h2>
    <div class="jg-grid">
      ${tile('sl-btn', 'Soletre', LS.get('soletraBest', 0) > 0 ? 'Recorde ' + LS.get('soletraBest', 0) : 'O nome, letra por letra', 'soletra', ICON.quill)}
      ${tile('pr-btn', 'Pares', LS.get('paresBest', 0) > 0 ? 'Recorde ' + LS.get('paresBest', 0) : 'Ligue quem com o quê', 'pares', ICON.chain)}
    </div>
    <h2 class="cv-h jg-sec"><span>Curiosidades</span></h2>
    <button id="bgab2" class="jg-gab" type="button">
      <span class="jg-gab-art" aria-hidden="true">${GAB.slice(0, 5).map((g, i) => `<i style="--i:${i}">${(QICON[g.art] || QICON.scroll)(40)}</i>`).join('')}</span>
      <span class="jg-tx"><b>Gabinete de curiosidades</b><small>${GAB.length} jogos de outro tipo: cartas, rostos, mímica, um rio, uma máquina do tempo…</small></span>
    </button>
  </div>`;
}
