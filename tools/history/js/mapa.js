
/* ═══════════════════════════════════════════════════
   O MAPA-MÚNDI — the album is a map of the world
   Every sticker lives somewhere: a figure in the country they were born
   in, a state's brasão where its seat was, a monument where it stands, a
   nation's flag in that nation. The album opens on an old mapa-múndi in
   two hemispheres (js/atlas.js draws it), each country an uncoloured
   engraving until its stickers come, and washed in watercolour as they
   do; a tap on a country opens the chart of its part of the world, where
   each country's pin opens its page of pockets (the album's own: flip,
   zoom, copies), with the country's own little chart at the foot of it.
   ALB_MAP (tools/history/album_map.json, from tools/history/albmapgen.mjs)
   is above this line.
═══════════════════════════════════════════════════ */
const AMAP_CONT = [['EU', 'Europa'], ['AS', 'Ásia'], ['AF', 'África e Oriente Médio'], ['AM', 'Américas']];
const AMAP_TAB = { EU: 'Europa', AS: 'Ásia', AF: 'África', AM: 'Américas' };
const AMAP_PLACE_CONT = {
  POR: 'EU', ESP: 'EU', FRA: 'EU', NED: 'EU', BEL: 'EU', GER: 'EU', ENG: 'EU', SCO: 'EU', IRL: 'EU', ITA: 'EU', CHE: 'EU',
  AUT: 'EU', CZE: 'EU', POL: 'EU', HUN: 'EU', DEN: 'EU', NOR: 'EU', SWE: 'EU', SRB: 'EU', CRO: 'EU', MKD: 'EU', GRC: 'EU',
  BUL: 'EU', UKR: 'EU', RUS: 'EU', VAT: 'EU',
  TUR: 'EU',
  IND: 'AS', NPL: 'AS', CHN: 'AS', MNG: 'AS', JPN: 'AS', VNM: 'AS', UZB: 'AS', KHM: 'AS',
  EGY: 'AF', TUN: 'AF', MAR: 'AF', MLI: 'AF', ETH: 'AF', AGO: 'AF', ZAF: 'AF',
  ISR: 'AF', SYR: 'AF', JOR: 'AF', IRQ: 'AF', IRN: 'AF',
  USA: 'AM', MEX: 'AM', CUB: 'AM', HAI: 'AM', VEN: 'AM', COL: 'AM', PER: 'AM', CHI: 'AM', URU: 'AM', PAR: 'AM', ARG: 'AM', BRA: 'AM',
};
/* the places with no figure of their own: only a state or a monument stands there */
const AMAP_EXTRA = { SYR: 'Síria', KHM: 'Camboja', SWE: 'Suécia', JOR: 'Jordânia', VAT: 'Vaticano' };
/* where each state had its seat */
const POLITY_AT = {
  egito_antigo: 'EGY', babilonia: 'IRQ', assiria: 'IRQ', persia: 'IRN', israel_antigo: 'ISR', atenas: 'GRC', esparta: 'GRC',
  macedonia: 'GRC', cartago: 'TUN', republica_romana: 'ITA', imperio_romano: 'ITA', bizancio: 'TUR', hunos: 'HUN', han: 'CHN',
  maurya: 'IND', axum: 'ETH', maia: 'MEX', francos: 'FRA', sacro_imperio: 'GER', califado_omiada: 'SYR', califado_abassida: 'IRQ',
  tang: 'CHN', imperio_mongol: 'MNG', ming: 'CHN', qing: 'CHN', khmer: 'KHM', mali: 'MLI', songai: 'MLI', inglaterra: 'ENG',
  francia: 'FRA', republica_florentina: 'ITA', veneza: 'ITA', portugal: 'POR', espanha: 'ESP', imperio_otomano: 'TUR',
  safavida: 'IRN', mogol: 'IND', tokugawa: 'JPN', asteca: 'MEX', inca: 'PER', imperio_espanhol: 'ESP', imperio_portugues: 'POR',
  holanda: 'NED', suecia: 'SWE', prussia: 'GER', reino_unido: 'ENG', imperio_russo: 'RUS', austria_hungria: 'AUT',
  franca_revolucionaria: 'FRA', imperio_frances: 'FRA', estados_unidos: 'USA', haiti: 'HAI', gran_colombia: 'COL',
  imperio_britanico: 'ENG', imperio_brasil: 'BRA', brasil_colonia: 'BRA', brasil_republica: 'BRA', imperio_alemao: 'GER',
  imperio_japones: 'JPN', italia_fascista: 'ITA', alemanha_nazista: 'GER', urss: 'RUS', china_popular: 'CHN', india: 'IND',
  turquia: 'TUR', cuba: 'CUB', africa_do_sul: 'ZAF', dinastia_qin: 'CHN', ayubida: 'EGY',
};
/* where each monument stands */
const MONUMENT_AT = {
  coliseu: 'ITA', panteao: 'ITA', forum_romano: 'ITA', muralha_adriano: 'ENG', aqueduto_segovia: 'ESP', pompeia: 'ITA',
  partenon: 'GRC', piramide_queops: 'EGY', esfinge: 'EGY', abu_simbel: 'EGY', karnak: 'EGY', portao_ishtar: 'IRQ',
  persepolis: 'IRN', petra: 'JOR', muralha_china: 'CHN', cidade_proibida: 'CHN', taj_mahal: 'IND', angkor_wat: 'KHM',
  himeji: 'JPN', machu_picchu: 'PER', chichen_itza: 'MEX', moai: 'CHI', santa_sofia: 'TUR', mesquita_azul: 'TUR',
  alhambra: 'ESP', stonehenge: 'ENG', torre_londres: 'ENG', notre_dame: 'FRA', versalhes: 'FRA', arco_triunfo: 'FRA',
  torre_eiffel: 'FRA', escorial: 'ESP', torre_belem: 'POR', jeronimos: 'POR', duomo_florenca: 'ITA', torre_pisa: 'ITA',
  sao_pedro: 'VAT', sao_marcos: 'ITA', sagrada_familia: 'ESP', kremlin: 'RUS', palacio_inverno: 'RUS', brandemburgo: 'GER',
  muro_berlim: 'GER', estatua_liberdade: 'USA', capitolio: 'USA', monte_rushmore: 'USA', cristo_redentor: 'BRA',
  museu_ipiranga: 'BRA', ouro_preto: 'BRA', museu_imperial: 'BRA', catedral_brasilia: 'BRA',
};
/* the old album printed each country's name in all its languages across the band */
const AMAP_LANGS = {
  BRA: 'Brazil · Brasilien · Brésil · Brasile', ARG: 'Argentina · Argentinien · Argentine',
  ITA: 'Italy · Italien · Italie · Italia', GER: 'Germany · Deutschland · Allemagne',
  ENG: 'England · Angleterre · Inghilterra', FRA: 'France · Frankreich · Francia',
  ESP: 'Spain · Spanien · Espagne · Spagna', POR: 'Portugal · Portogallo',
  NED: 'Holland · Niederlande · Pays-Bas', URU: 'Uruguay',
  USA: 'United States · Vereinigte Staaten', GRC: 'Greece · Griechenland · Grèce · Grecia',
  RUS: 'Russia · Russland · Russie', EGY: 'Egypt · Ägypten · Égypte · Egitto',
  CHN: 'China · Chine · Cina', AUT: 'Austria · Österreich · Autriche',
  IRQ: 'Iraq · Irak', TUR: 'Turkey · Türkei · Turquie · Turchia',
  IRN: 'Iran · Irán', POL: 'Poland · Polen · Pologne · Polonia',
  JPN: 'Japan · Japon · Giappone', IND: 'India · Indien · Inde', MEX: 'Mexico · Mexiko · Mexique',
};
const placeName = c => CTRY_NAME[c] || AMAP_EXTRA[c] || c;

let albView = 'map';        // 'map' or 'place'
let amapView = 'WORLD';     // which part of the world the map shows

/* Every page of the album and what is in it, numbered as the album always
   numbered them: the figures first, then the brasões, the nations and the
   monuments. */
let _places = null;
function albPlaces() {
  if (_places) return _places;
  const items = {}, lost = [];
  const add = (c, it) => { if (!c || !ALB_MAP.pins[c]) { lost.push(it); return; } (items[c] = items[c] || []).push(it); };
  PL.forEach((p, i) => add(p.ctry, { p, n: i + 1 }));
  let nx = PL.length;
  ESCUDOS.forEach(id => add(POLITY_AT[id], { sid: SK.esc(id), n: ++nx }));
  SELECOES.forEach(c => add(c, { sid: SK.sel(c), n: ++nx }));
  MASCOTES.forEach(id => add(MONUMENT_AT[id], { sid: SK.msc(id), n: ++nx }));
  const order = Object.keys(items).sort((a, b) =>
    a === 'BRA' ? -1 : b === 'BRA' ? 1 : items[b].length - items[a].length || placeName(a).localeCompare(placeName(b), 'pt'));
  return (_places = { items, order, lost });
}
const _sidOf = g => g.sid || g.p.id;
const placeGot = c => (albPlaces().items[c] || []).filter(g => album.has(_sidOf(g))).length;
const placeAll = c => (albPlaces().items[c] || []).length;
/* the place a sticker belongs to */
function placeOf(sid) {
  const P = albPlaces();
  return P.order.find(c => P.items[c].some(g => _sidOf(g) === sid)) || null;
}

/* what a page of stickers that are not people holds, said as it is: 'Nação e brasões', 'Monumento', … */
function _kindsLabel(its) {
  const n = k => its.filter(g => g.sid && g.sid.startsWith(k)).length;
  const parts = [[n('s:'), 'Nação', 'Nações'], [n('e:'), 'Brasão', 'Brasões'], [n('m:'), 'Monumento', 'Monumentos']]
    .filter(([c]) => c).map(([c, one, many], i) => (c === 1 ? one : many).toLowerCase());
  const t = parts.length > 1 ? parts.slice(0, -1).join(', ') + ' e ' + parts[parts.length - 1] : parts[0] || '';
  return t.charAt(0).toUpperCase() + t.slice(1);
}
/* a place's pages: its people by age, then its nation, its states, its monuments */
function placePages(c) {
  const its = albPlaces().items[c] || [];
  const era = g => g.p.era ? g.p.era[0] : 1800;
  const figs = its.filter(g => g.p).sort((a, b) => era(a) - era(b) || a.n - b.n);
  const rank = g => ({ 's:': 0, 'e:': 1, 'm:': 2 }[g.sid.slice(0, 2)] ?? 3);
  const ext = its.filter(g => !g.p).sort((a, b) => rank(a) - rank(b) || a.n - b.n);
  const all = figs.concat(ext), pages = [];
  for (let i = 0; i < all.length; i += ALB_PER) {
    const pgIts = all.slice(i, i + ALB_PER), ds = pgIts.filter(g => g.p).map(era);
    /* a page that is mostly brasões and monuments is named for them, not for the one figure on it */
    const extra = pgIts.length - ds.length;
    pages.push(ds.length && extra * 2 <= pgIts.length
      ? { from: ds[0], to: ds[ds.length - 1], main: ds[Math.floor(ds.length / 2)], items: pgIts }
      : { from: 1800, to: 1800, main: 1800, items: pgIts, label: _kindsLabel(pgIts) });
  }
  return pages.length ? pages : [{ from: 1800, to: 1800, main: 1800, items: [], label: '' }];
}

/* the badge a place wears on the map and on its page: its flag, or the brasão of its first state */
function placeBadge(c, h) {
  if (FLAGS[c]) return flagSVG(c, h);
  const pol = Object.keys(POLITY_AT).find(id => POLITY_AT[id] === c);
  return pol ? `<span class="amap-crest" style="width:${h * 1.3}px;height:${h * 1.3}px">${clubArt(pol, '', false)}</span>` : ICON.column('#6E5836', h);
}

/* pins pushed apart until none sits on another, in pixels on the map as drawn, and never far from their country */
function _amapSpread(pins, W, H, min) {
  pins.forEach(p => { p.x0 = p.x; p.y0 = p.y; });
  for (let it = 0; it < 90; it++) {
    let moved = false;
    for (let i = 0; i < pins.length; i++) for (let j = i + 1; j < pins.length; j++) {
      const a = pins[i], b = pins[j];
      let dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy);
      if (d >= min) continue;
      if (d < 1e-6) { dx = 1; dy = 0; d = 1; }
      const push = (min - d) / 2;
      a.x -= dx / d * push; a.y -= dy / d * push; b.x += dx / d * push; b.y += dy / d * push;
      moved = true;
    }
    pins.forEach(p => {
      const dx = p.x - p.x0, dy = p.y - p.y0, d = Math.hypot(dx, dy);
      if (d > 46) { p.x = p.x0 + dx / d * 46; p.y = p.y0 + dy / d * 46; }
      p.x = Math.max(24, Math.min(W - 24, p.x)); p.y = Math.max(24, Math.min(H - 24, p.y));
    });
    if (!moved) break;
  }
  return pins;
}

function albMapHtml() {
  const P = albPlaces(), total = ALL_STICKERS.length;
  const contStat = id => {
    const cs = P.order.filter(c => AMAP_PLACE_CONT[c] === id);
    return [cs.reduce((a, c) => a + placeGot(c), 0), cs.reduce((a, c) => a + placeAll(c), 0)];
  };
  const pct = albumPct();
  const shown = amapView === 'WORLD' ? P.order : P.order.filter(c => AMAP_PLACE_CONT[c] === amapView);
  /* the pages begun and nearest to finished, to send the player back for the last few */
  const near = shown.map(c => [c, placeGot(c), placeAll(c)]).filter(([, g, t]) => g > 0 && g < t)
    .sort((a, b) => (a[2] - a[1]) - (b[2] - b[1]) || b[1] / b[2] - a[1] / a[2]).slice(0, 3);
  const [sg, st] = amapView === 'WORLD' ? [album.size, total] : contStat(amapView);
  const strip = album.size === 0
    ? `<div class="amap-first"><span>Cada acerto cola uma figurinha e pinta o país dela no mapa.</span>
        <button id="amap-play" class="btn btn-brass btn-sm" type="button">${ICON.play('currentColor', 12)} Jogar</button></div>`
    : sg >= st
    ? `<div class="amap-done" role="status">${ICON.star('currentColor', 13)} ${({ WORLD: `Álbum completo! ${total} figurinhas em ${P.order.length} lugares`,
        EU: 'Europa completa!', AS: 'Ásia completa!', AF: 'África e Oriente Médio completos!', AM: 'Américas completas!' })[amapView]}</div>`
    : near.length ? `<div class="amap-near" role="group" aria-label="Falta pouco">
      <span class="amap-near-h" aria-hidden="true">Falta pouco</span>
      ${near.map(([c, g, t]) => `<button class="amap-nr" data-place="${c}" type="button" aria-label="${_esc(placeName(c))}: falta${t - g > 1 ? 'm' : ''} ${t - g}">
        <span class="amap-flag">${placeBadge(c, 12)}</span><span><b>${_esc(placeName(c))}</b><small>falta${t - g > 1 ? 'm' : ''} ${t - g}</small></span></button>`).join('')}
    </div>` : '';
  return `
  <div class="pg alb-pg amap-pg">
    <div class="alb-top">
      ${topbar('Álbum')}
      <div class="alb-head">
        <button id="balbvit" class="alb-vit" type="button">${ICON.star('currentColor', 12)} Vitrine</button>
        <button id="balbselo" class="alb-vit" type="button">${ICON.stamp('currentColor', 12)} Selos</button>
        <span class="display" style="font-size:20px;">${album.size}<span class="muted" style="font-size:13px;"> / ${total}</span></span>
      </div>
    </div>
    <div class="alb-bar"><i style="width:${Math.max(1, pct)}%"></i></div>
    <div class="amap-tabs" id="amap-tabs" aria-label="Partes do mundo">
      <button class="amap-tab${amapView === 'WORLD' ? ' is-on' : ''}" data-view="WORLD" type="button" aria-pressed="${amapView === 'WORLD'}">Mundo<small>${album.size}/${total}</small></button>
      ${AMAP_CONT.map(([id, n]) => { const [g, t] = contStat(id);
        return `<button class="amap-tab${amapView === id ? ' is-on' : ''}" data-view="${id}" type="button" aria-pressed="${amapView === id}" aria-label="${n}, ${g} de ${t}">${AMAP_TAB[id]}<small>${g}/${t}</small></button>`; }).join('')}
    </div>
    <div class="amap-wrap" id="amap-wrap">
      <div class="amap" id="amap" role="group" aria-label="${amapView === 'WORLD' ? 'O mapa-múndi: toque num continente para abrir o mapa dele'
        : `Carta: ${AMAP_CONT.find(c => c[0] === amapView)[1]}`}"></div>
    </div>
    ${strip}
    <p class="amap-hint small muted">${amapView === 'WORLD' ? (album.size ? 'Cada figurinha pinta o seu país. Toque num continente para abrir o mapa.' : 'Toque num continente para abrir o mapa.')
      : `${shown.length} lugares · toque num país para abrir a página`}</p>
  </div>`;
}

/* a place's page: the album's own spread, with the way back to the map */
function albPlaceHtml() {
  const P = albPlaces();
  if (!albCtry || !P.items[albCtry]) { albView = 'map'; return albMapHtml(); }
  const pages = placePages(albCtry);
  albPage = Math.max(0, Math.min(albPage, pages.length - 1));
  const spread = pages[albPage];
  const got = placeGot(albCtry), all = placeAll(albCtry);
  const label = spread.label || (pages.length === 1 && spread.items.some(g => g.p) ? 'Todas as épocas' : decLabel(spread));
  const nm = placeName(albCtry);
  return `
  <div class="pg alb-pg">
    <div class="alb-top">
      ${topbar('Álbum', 'amap-back')}
      <div class="alb-head">
        <button id="amap-back2" class="alb-vit" type="button">${ICON.globe('currentColor', 12)} Mapa</button>
        <span class="display" style="font-size:20px;">${got}<span class="muted" style="font-size:13px;"> / ${all}</span></span>
      </div>
    </div>
    <div class="alb-bar"><i style="width:${Math.max(1, Math.round(got / Math.max(1, all) * 100))}%"></i></div>
    <div class="alb-book ${decStyle(pages.length === 1 ? spread.to : spread.main)}" id="alb-book">
      ${(() => {
        const px = n => Math.min(9, n) * 1.6;
        const edge = (side, n) => n <= 0 ? '' : `<span class="alb-edge alb-edge-${side}" aria-hidden="true" style="width:${px(n)}px"></span>`;
        return edge('l', albPage) + edge('r', pages.length - 1 - albPage);
      })()}
      <div class="alb-band">
        <span class="crest-box" style="width:30px;flex:none;">${placeBadge(albCtry, 20)}</span>
        <span style="min-width:0;flex:1;">
          <span class="t">${_esc(nm)}</span>
          ${AMAP_LANGS[albCtry] ? `<span class="langs">${AMAP_LANGS[albCtry]}</span>` : ''}
        </span>
        <span class="alb-dec">${label}</span>
      </div>
      <div class="alb-sheet scroll-y${albTurning ? ' turn-' + albTurning : ''}">
        <div class="alb-grid">
          ${spread.items.map(it => {
            const { p, n } = it;
            const sid = it.sid || p.id;
            const has = album.has(sid);
            const name = p ? p.n : (stk(sid) || {}).n || '';
            const cp = has ? copyOf(sid) : null;
            const front = p
              ? figurinha(p, 'lg', { sub: (p.clubs && p.clubs[0]) ? clubName(p.clubs[0]) : POS_NAME[p.pos], noYear: true, copy: cp })
              : figExtra(sid, 'lg', { copy: cp });
            const back = p ? figurinhaBack(p, n) : figExtraBack(sid, n);
            return `<div class="alb-slot${has ? ' alb-turn' : ' empty'}${runNewIds.includes(sid) ? ' alb-fresh' : ''}"${
              has ? ` data-fig="${sid}" role="button" tabindex="0" aria-label="${name}${copyAria(cp)} — toque para ampliar"` : ''}>
              <span class="alb-n">${String(n).padStart(3, '0')}</span>
              ${has
                ? `<span class="flip"><span class="flip-in"><span class="flip-face flip-front">${front}</span><span class="flip-face flip-back">${back}</span></span></span>`
                : p && p.img
                ? `<span class="ph ph-face" aria-hidden="true"><img src="${p.img}" alt="" loading="lazy" draggable="false"></span><span class="nm-who">${_esc(name)}</span><span class="nm">a colar</span>`
                : `<span class="ph" aria-hidden="true">${albGhost(p ? 'player' : (stk(sid) || {}).kind)}</span>${name ? `<span class="nm-who">${_esc(name)}</span>` : ''}<span class="nm">a colar</span>`}
            </div>`;
          }).join('')}
          ${(() => {
            const left = ALB_PER - spread.items.length;
            if (left <= 0) return '';
            const used = Math.ceil(spread.items.length / ALB_COLS), rows = ALB_PER / ALB_COLS - used;
            return Array.from({ length: left }, () => '<div class="alb-slot alb-blank" aria-hidden="true"></div>').join('')
              /* the rest of the page: the country's own chart, cut from the old mapa-múndi */
              + (rows > 0 ? `<div class="alb-colo alb-colo-map${rows <= 2 ? '' : ' is-tall'}" style="grid-row:${used + 1} / span ${rows}" aria-hidden="true">
                  <span class="alb-inset" data-inset="${albCtry}"></span>
                  <span class="alb-colo-txt"><span class="alb-colo-t">${_esc(nm)}</span><span class="alb-colo-s"></span></span>
                </div>` : '');
          })()}
        </div>
      </div>
      <div class="alb-foot">
        <button id="alb-prev" class="alb-arrow" ${albPage === 0 ? 'disabled' : ''} aria-label="Página anterior">${ICON.back('currentColor', 14)}</button>
        <div class="alb-foot-mid">
          <div class="alb-pips" aria-hidden="true">${pages.map((pg, i) => `<span class="alb-pip${i === albPage ? ' is-on' : ''}${
            pg.items.every(g => album.has(_sidOf(g))) ? ' is-full' : ''}"></span>`).join('')}</div>
          <span class="alb-folio">${album.size === 0 ? 'cada acerto cola uma figurinha'
            : !LS.get('albFlipped', false) ? 'toque numa figurinha para ampliá-la'
            : `pág. ${albPage + 1} de ${pages.length} · ${got} de ${all}`}</span>
        </div>
        <button id="alb-next" class="alb-arrow alb-fwd" ${albPage >= pages.length - 1 ? 'disabled' : ''} aria-label="Próxima página">${ICON.back('currentColor', 14)}</button>
      </div>
    </div>
  </div>`;
}

/* A run that just stuck something in opens the album on that sticker's
   page, once: the reward is the reason they came here. Coming back to the
   album later in the same run's wake finds the map where it was left. */
let _albJumped = -1, _amapFreshAt = -1;
function albumHtml() {
  if (runNewIds.length && movedScreen && _albJumped !== gameN) {
    const c = placeOf(runNewIds[0]);
    _albJumped = gameN;
    if (c) {
      albView = 'place'; albCtry = c; amapView = AMAP_PLACE_CONT[c] || 'WORLD';
      const i = placePages(c).findIndex(pg => pg.items.some(g => _sidOf(g) === runNewIds[0]));
      albPage = i < 0 ? 0 : i;
    }
  }
  return albView === 'place' ? albPlaceHtml() : albMapHtml();
}

/* the countries the last run coloured in glow, the first time the map is drawn after it */
function _amapFresh() {
  if (!runNewIds.length || _amapFreshAt === gameN) return new Set();
  _amapFreshAt = gameN;
  return new Set(runNewIds.map(placeOf).filter(Boolean));
}
/* the map drawn to the room left for it, filling it */
function fitAlbMap() {
  const w = document.getElementById('amap-wrap'), m = document.getElementById('amap');
  if (!w || !m) return;
  let W = Math.floor(w.clientWidth), H = Math.floor(w.clientHeight);
  if (W < 60 || H < 60) return;
  /* a chart is drawn for rooms from a little taller than wide to twice as wide as tall; beyond that it is centred */
  if (amapView !== 'WORLD') { if (W > H * 2) W = Math.floor(H * 2); if (H > W / .62) H = Math.floor(W / .62); }
  m.style.left = Math.floor((w.clientWidth - W) / 2) + 'px'; m.style.top = Math.floor((w.clientHeight - H) / 2) + 'px';
  const key = `${W}x${H}:${amapView}:${album.size}`;
  if (m.dataset.drawn === key) return;
  const fresh = m.dataset.drawn ? new Set() : _amapFresh();
  m.dataset.drawn = key;
  if (_amapArrive) { m.classList.add(_amapArrive === 'out' ? 'is-arriving-out' : 'is-arriving-in'); _amapArrive = null; }
  m.style.width = W + 'px'; m.style.height = H + 'px';
  if (amapView === 'WORLD') {
    const wd = atlasWorld(W, H, fresh);
    m._world = wd;
    m.innerHTML = wd.svg;
    return;
  }
  const ch = atlasChart(amapView, W, H, fresh);
  const pins = ch.pins;                    // already spread apart, in pixels, by the chart
  const lead = pins.filter(p => Math.hypot(p.x - p.x0, p.y - p.y0) > 13);
  m.innerHTML = ch.svg
    + (lead.length ? `<svg class="amap-lead" viewBox="0 0 ${W} ${H}" aria-hidden="true">${lead.map(p =>
        `<path d="M${p.x0.toFixed(1)} ${p.y0.toFixed(1)}L${p.x.toFixed(1)} ${p.y.toFixed(1)}"/><circle cx="${p.x0.toFixed(1)}" cy="${p.y0.toFixed(1)}" r="2.2"/>`).join('')}</svg>` : '')
    + pins.sort((a, b) => a.y - b.y || a.x - b.x).map(p => {
      const g = placeGot(p.c), t = placeAll(p.c);
      return `<button class="amap-pin${g === t ? ' is-done' : ''}${g ? '' : ' is-empty'}${fresh.has(p.c) ? ' is-fresh' : ''}" data-place="${p.c}" type="button"
          style="left:${p.x.toFixed(1)}px;top:${p.y.toFixed(1)}px;--f:${(g / Math.max(1, t) * 100).toFixed(1)}%"
          aria-label="${_esc(placeName(p.c))}: ${g} de ${t} figurinhas" title="${_esc(placeName(p.c))} · ${g}/${t}">
          <span class="amap-flag">${placeBadge(p.c, 14)}</span></button>`;
    }).join('');
}
/* the little chart at the foot of a page, drawn to the room the page leaves */
function fitAlbInsets() {
  document.querySelectorAll('.alb-inset[data-inset]').forEach(el => {
    const W = Math.floor(el.clientWidth), H = Math.floor(el.clientHeight);
    if (W < 40 || H < 30 || el.dataset.drawn === W + 'x' + H) return;
    el.dataset.drawn = W + 'x' + H;
    const txt = el.closest('.alb-colo') && el.closest('.alb-colo').querySelector('.alb-colo-txt');
    const c = el.dataset.inset, d = atlasInset(c, W, H, txt ? txt.offsetWidth : 150);
    const at = (x, y) => `left:${x.toFixed(1)}%;top:${y.toFixed(1)}%`;
    el.innerHTML = d.svg
      + d.seas.map(([t, x, y]) => `<span class="alb-inset-sea" style="${at(x, y)}">${_esc(t)}</span>`).join('')
      + d.names.map(([t, x, y]) => `<span class="alb-inset-nm" style="${at(x, y)}">${_esc(t)}</span>`).join('')
      + (ATLAS_ART.rosa ? `<svg class="alb-inset-rose" viewBox="${ATLAS_ART.rosa.vb}" aria-hidden="true">${ATLAS_ART.rosa.svg}</svg>` : '')
      + (d.pin ? `<span class="alb-inset-pin" style="${at(d.pin[0], d.pin[1])}">${placeBadge(c, 12)}</span>` : '');
    /* the name plate stands where the little chart left room for it, with where the country lies */
    const box = el.closest('.alb-colo');
    if (box) {
      box.classList.toggle('plate-left', d.plate === 'left');
      box.classList.toggle('plate-none', d.plate === 'none');
      const sub = box.querySelector('.alb-colo-s');
      if (sub) sub.textContent = d.coord;
    }
  });
}
/* from the world into a part of it: the map leans in towards the spot tapped and the chart comes up out of it;
   back to the world, the chart draws away and the world comes back from afar */
let _amapArrive = null;
function _amapFly(id, x, y) {
  const m = document.getElementById('amap');
  snd.page();
  if (!m || FX_STILL) { amapView = id; go(); return; }
  const out = id === 'WORLD';
  if (x == null) { x = m.clientWidth / 2; y = m.clientHeight / 2; }
  m.style.transformOrigin = `${x.toFixed(0)}px ${y.toFixed(0)}px`;
  m.classList.add(out ? 'is-leaving-out' : 'is-leaving-in');
  setTimeout(() => { if (sc !== 'album') return; amapView = id; _amapArrive = out ? 'out' : 'in'; go(); }, 230);
}
function _amapOpen(c) {
  snd.swipe();
  albCtry = c;
  /* the first page that still has a pocket to fill */
  const i = placePages(c).findIndex(pg => pg.items.some(g => !album.has(_sidOf(g))));
  albPage = Math.max(0, i);
  albView = 'place';
  go();
}
function wireAlbMap() {
  const refit = () => { if (sc !== 'album') return; if (albView === 'map') fitAlbMap(); else fitAlbInsets(); };
  if (albView === 'map') refit();          // a page's inset waits for the page's own layout, a frame later
  requestAnimationFrame(refit);
  if (!window._amapRs) { window._amapRs = true; window.addEventListener('resize', refit); }
  const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  const toMap = () => { snd.swipe(); albView = 'map'; go(); };
  on('amap-back', toMap);
  on('amap-back2', toMap);
  on('amap-play', () => { snd.select(); startMilhao(); });
  document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.view === amapView) return;
    _amapFly(b.dataset.view);
  }));
  document.querySelectorAll('.amap-nr').forEach(b => b.addEventListener('click', () => _amapOpen(b.dataset.place)));
  const m = document.getElementById('amap');
  if (!m) return;
  m.addEventListener('click', e => {
    const pin = e.target.closest('.amap-pin');
    if (pin) { _amapOpen(pin.dataset.place); return; }
    const hit = e.target.closest('[data-place]'), c = hit && hit.dataset.place;
    if (amapView !== 'WORLD') { if (c && placeAll(c)) _amapOpen(c); return; }
    /* on the world, a tap opens the chart of the part of the world under the finger: the country's own,
       or, at sea, the nearest part of the hemisphere tapped */
    let id = c ? AMAP_PLACE_CONT[c] : null;
    const wd = m._world;
    if (!id && wd) {
      const r = m.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      const h = ['W', 'E'].find(k => Math.hypot(x - wd.C[k][0], y - wd.C[k][1]) <= wd.R * 1.05);
      if (h) {
        const ux = (x - wd.C[h][0]) / wd.sc, uy = (y - wd.C[h][1]) / wd.sc, an = ALB_MAP.hemi[h].anchors;
        id = Object.keys(an).sort((a, b) => Math.hypot(an[a][0] - ux, an[a][1] - uy) - Math.hypot(an[b][0] - ux, an[b][1] - uy))[0];
      }
    }
    if (id) { const r = m.getBoundingClientRect(); _amapFly(id, e.clientX - r.left, e.clientY - r.top); }
  });
}
