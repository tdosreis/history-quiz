
/* ═══════════════════════════════════════════════════
   O MAPA-MÚNDI — the album is a map of the world
   Every sticker lives somewhere: a figure in the country they were born
   in, a state's brasão where its seat was, a monument where it stands, a
   nation's flag in that nation. The album opens on an old atlas page with
   each country inked in as its pockets fill — parchment, then gold, then
   the deep red of a finished page — and a continent to zoom into. A
   country's pin opens its page of pockets; the pockets themselves are the
   album's own (flip, zoom, copies). ALB_MAP (tools/history/album_map.json,
   from tools/history/albmapgen.mjs) is above this line.
═══════════════════════════════════════════════════ */
const AMAP_CONT = [['EU', 'Europa'], ['AS', 'Ásia'], ['AF', 'África e Oriente Médio'], ['AM', 'Américas']];
const AMAP_TAB = { EU: 'Europa', AS: 'Ásia', AF: 'África', AM: 'Américas' };
const AMAP_PLACE_CONT = {
  POR: 'EU', ESP: 'EU', FRA: 'EU', NED: 'EU', BEL: 'EU', GER: 'EU', ENG: 'EU', SCO: 'EU', IRL: 'EU', ITA: 'EU', CHE: 'EU',
  AUT: 'EU', CZE: 'EU', POL: 'EU', HUN: 'EU', DEN: 'EU', NOR: 'EU', SWE: 'EU', SRB: 'EU', CRO: 'EU', MKD: 'EU', GRC: 'EU',
  BUL: 'EU', UKR: 'EU', RUS: 'EU',
  TUR: 'EU',
  IND: 'AS', NPL: 'AS', CHN: 'AS', MNG: 'AS', JPN: 'AS', VNM: 'AS', UZB: 'AS', KHM: 'AS',
  EGY: 'AF', TUN: 'AF', MAR: 'AF', MLI: 'AF', ETH: 'AF', AGO: 'AF', ZAF: 'AF',
  ISR: 'AF', SYR: 'AF', JOR: 'AF', IRQ: 'AF', IRN: 'AF',
  USA: 'AM', MEX: 'AM', CUB: 'AM', HAI: 'AM', VEN: 'AM', COL: 'AM', PER: 'AM', CHI: 'AM', URU: 'AM', PAR: 'AM', ARG: 'AM', BRA: 'AM',
};
/* the places with no figure of their own: only a state or a monument stands there */
const AMAP_EXTRA = { SYR: 'Síria', KHM: 'Camboja', SWE: 'Suécia', JOR: 'Jordânia' };
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
  sao_pedro: 'ITA', sao_marcos: 'ITA', sagrada_familia: 'ESP', kremlin: 'RUS', palacio_inverno: 'RUS', brandemburgo: 'GER',
  muro_berlim: 'GER', estatua_liberdade: 'USA', capitolio: 'USA', monte_rushmore: 'USA', cristo_redentor: 'BRA',
  museu_ipiranga: 'BRA', ouro_preto: 'BRA', museu_imperial: 'BRA', catedral_brasilia: 'BRA',
};
/* the old album printed each country's name in all its languages across the band */
const AMAP_LANGS = {
  BRA: 'Brazil · Brasilien · Brésil · Brasile', ARG: 'Argentina · Argentinien · Argentine',
  ITA: 'Italy · Italien · Italie · Italia', GER: 'Germany · Deutschland · Allemagne',
  ENG: 'England · Angleterre · Inghilterra', FRA: 'France · Frankreich · Francia',
  ESP: 'Spain · Spanien · Espagne · Spagna', POR: 'Portugal · Portogallo',
  NED: 'Holland · Niederlande · Pays-Bas', URU: 'Uruguay · Uruguai',
  USA: 'United States · Vereinigte Staaten', GRC: 'Greece · Griechenland · Grèce · Grecia',
  RUS: 'Russia · Russland · Russie · Russia', EGY: 'Egypt · Ägypten · Égypte · Egitto',
  CHN: 'China · Chine · Cina', AUT: 'Austria · Österreich · Autriche',
  IRQ: 'Iraq · Irak · Irak · Iraq', TUR: 'Turkey · Türkei · Turquie · Turchia',
  IRN: 'Iran · Persia · Perse', POL: 'Poland · Polen · Pologne · Polonia',
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

/* a place's pages: its people by age, then its nation, its states, its monuments */
function placePages(c) {
  const its = albPlaces().items[c] || [];
  const era = g => g.p.era ? g.p.era[0] : 1800;
  const figs = its.filter(g => g.p).sort((a, b) => era(a) - era(b) || a.n - b.n);
  const rank = g => ({ 's:': 0, 'e:': 1, 'm:': 2 }[g.sid.slice(0, 2)] || 3);
  const ext = its.filter(g => !g.p).sort((a, b) => rank(a) - rank(b) || a.n - b.n);
  const all = figs.concat(ext), pages = [];
  for (let i = 0; i < all.length; i += ALB_PER) {
    const pgIts = all.slice(i, i + ALB_PER), ds = pgIts.filter(g => g.p).map(era);
    pages.push(ds.length
      ? { from: ds[0], to: ds[ds.length - 1], main: ds[Math.floor(ds.length / 2)], items: pgIts }
      : { from: 1800, to: 1800, main: 1800, items: pgIts, label: 'Nações, brasões e monumentos' });
  }
  return pages.length ? pages : [{ from: 1800, to: 1800, main: 1800, items: [], label: '' }];
}

/* the badge a place wears on the map and on its page: its flag, or the brasão of its first state */
function placeBadge(c, h) {
  if (FLAGS[c]) return flagSVG(c, h);
  const pol = Object.keys(POLITY_AT).find(id => POLITY_AT[id] === c);
  return pol ? `<span class="amap-crest" style="width:${h * 1.3}px;height:${h * 1.3}px">${clubArt(pol, '', false)}</span>` : ICON.column('currentColor', h);
}

/* the ink of a country, by how much of it is in the album */
function _mix(a, b, f) {
  const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const A = p(a), B = p(b);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * f).toString(16).padStart(2, '0')).join('');
}
const amapInk = f => f >= 1 ? '#8E2F2F' : f <= 0 ? '#EDE1C2' : _mix('#E6CF97', '#B07A2E', Math.min(1, f * 1.15));

/* pins pushed apart until none sits on another (in map units, for a map about `px` wide) */
function _amapPins(codes, view, px, st) {
  /* worked out in screen proportions: y is stretched like the map */
  const [, , vw] = view, k = vw / px, min = 27 * k;
  st = st || 1;
  const pts = codes.map(c => { const [x, y] = ALB_MAP.pins[c]; return { c, x0: x, y0: y * st, x, y: y * st }; });
  for (let it = 0; it < 60; it++) {
    let moved = false;
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i], b = pts[j];
      let dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy);
      if (d >= min) continue;
      if (d < 1e-6) { dx = 1; dy = 0; d = 1; }
      const push = (min - d) / 2;
      a.x -= dx / d * push; a.y -= dy / d * push; b.x += dx / d * push; b.y += dy / d * push;
      moved = true;
    }
    /* and a pin never strays far from its country */
    pts.forEach(p => { const dx = p.x - p.x0, dy = p.y - p.y0, d = Math.hypot(dx, dy), max = 40 * k;
      if (d > max) { p.x = p.x0 + dx / d * max; p.y = p.y0 + dy / d * max; } });
    if (!moved) break;
  }
  pts.forEach(p => { p.y /= st; p.y0 /= st; });
  return pts;
}

function albMapHtml() {
  const P = albPlaces();
  const view = ALB_MAP.views[amapView] || ALB_MAP.views.WORLD;
  const [vx, vy, vw, vh] = view;
  /* an equirectangular map squashes the north: each part of the world is
     drawn as tall as an atlas would print it there (1 / cos of its middle latitude) */
  const midLat = 78 - (vy + vh / 2), stretch = amapView === 'WORLD' ? 1.25 : Math.min(1.7, 1 / Math.cos(midLat * Math.PI / 180));
  const ar = vw / (vh * stretch);
  const total = ALL_STICKERS.length;
  const fresh = new Set(runNewIds.map(placeOf).filter(Boolean));
  const shown = amapView === 'WORLD' ? [] : P.order.filter(c => AMAP_PLACE_CONT[c] === amapView);
  const pins = _amapPins(shown, view, 340, stretch);
  let grat = '';
  for (let x = 0; x <= 360; x += 15) grat += `M${x} 0V134`;
  for (let y = 3; y <= 134; y += 15) grat += `M0 ${y}H360`;
  const shapes = P.order.filter(c => ALB_MAP.shapes[c]).map(c => {
    const f = placeGot(c) / Math.max(1, placeAll(c));
    return `<path class="amap-c${fresh.has(c) ? ' is-fresh' : ''}" d="${ALB_MAP.shapes[c]}" fill="${amapInk(f)}"/>`;
  }).join('');
  const contStat = id => {
    const cs = P.order.filter(c => AMAP_PLACE_CONT[c] === id);
    return [cs.reduce((a, c) => a + placeGot(c), 0), cs.reduce((a, c) => a + placeAll(c), 0)];
  };
  const pct = albumPct();
  /* the pages nearest to finished, to send them back for the last few */
  const near = (amapView === 'WORLD' ? P.order : shown).map(c => [c, placeGot(c), placeAll(c)]).filter(([, g, t]) => g < t)
    .sort((a, b) => (b[1] > 0) - (a[1] > 0) || (a[2] - a[1]) - (b[2] - b[1]) || b[1] / b[2] - a[1] / a[2]).slice(0, 3);
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
    <div class="amap-tabs" id="amap-tabs" role="tablist" aria-label="Partes do mundo">
      <button class="amap-tab${amapView === 'WORLD' ? ' is-on' : ''}" data-view="WORLD" role="tab" aria-selected="${amapView === 'WORLD'}">Mundo</button>
      ${AMAP_CONT.map(([id, n]) => { const [g, t] = contStat(id);
        return `<button class="amap-tab${amapView === id ? ' is-on' : ''}" data-view="${id}" role="tab" aria-selected="${amapView === id}" aria-label="${n}, ${g} de ${t}">${AMAP_TAB[id]}<small>${g}/${t}</small></button>`; }).join('')}
    </div>
    <div class="amap-wrap">
      <div class="amap" id="amap" style="aspect-ratio:${ar.toFixed(4)};--amap-ar:${ar.toFixed(4)}">
        <svg class="amap-svg" viewBox="${vx} ${vy} ${vw} ${vh}" preserveAspectRatio="none" aria-hidden="true">
          <rect x="-20" y="-20" width="400" height="180" fill="#D7C79C"/>
          <path d="${grat}" stroke="#7d6a45" stroke-opacity=".25" stroke-width="${(vw / 360 * .5).toFixed(2)}" fill="none"/>
          <path d="${ALB_MAP.land}" fill="#F2E8CD" stroke="#76603C" stroke-width="${(vw / 360 * .5).toFixed(2)}" stroke-linejoin="round"/>
          ${shapes}
          <path d="${ALB_MAP.borders}" fill="none" stroke="#6E5836" stroke-opacity=".6" stroke-width="${(vw / 360 * .35).toFixed(2)}" stroke-linejoin="round"/>
          ${pins.map(p => (Math.hypot(p.x - p.x0, p.y - p.y0) > vw / 120)
            ? `<path d="M${p.x0} ${p.y0}L${p.x.toFixed(2)} ${p.y.toFixed(2)}" stroke="#2A1D10" stroke-width="${(vw / 360 * .5).toFixed(2)}" stroke-opacity=".55"/>
               <circle cx="${p.x0}" cy="${p.y0}" r="${(vw / 360 * 1.1).toFixed(2)}" fill="#2A1D10"/>` : '').join('')}
        </svg>
        ${amapView === 'WORLD' ? `<svg class="amap-rose" viewBox="-12 -12 24 24" aria-hidden="true"><circle r="9" fill="none" stroke="#6E5836" stroke-width=".6"/>
          <path d="M0-11 2 0 0 2-2 0Z" fill="#8E2F2F"/><path d="M0 11 2 0 0-2-2 0Z" fill="#2A1D10"/><path d="M-11 0 0 2 2 0 0-2ZM11 0 0-2-2 0 0 2Z" fill="#B07A2E"/></svg>` : ''}
        ${pins.map(p => {
          const g = placeGot(p.c), t = placeAll(p.c), done = g === t;
          return `<button class="amap-pin${done ? ' is-done' : ''}${g ? '' : ' is-empty'}${fresh.has(p.c) ? ' is-fresh' : ''}" data-place="${p.c}"
              style="left:${((p.x - vx) / vw * 100).toFixed(2)}%;top:${((p.y - vy) / vh * 100).toFixed(2)}%;--f:${(g / Math.max(1, t) * 100).toFixed(1)}%"
              aria-label="${_esc(placeName(p.c))}: ${g} de ${t} figurinhas" title="${_esc(placeName(p.c))} · ${g}/${t}">
              <span class="amap-flag">${placeBadge(p.c, 14)}</span></button>`;
        }).join('')}
      </div>
    ${near.length ? `<div class="amap-near" aria-label="Falta pouco">
      <span class="amap-near-h">Falta pouco</span>
      ${near.map(([c, g, t]) => `<button class="amap-nr" data-place="${c}" aria-label="${_esc(placeName(c))}: faltam ${t - g}">
        <span class="amap-flag">${placeBadge(c, 12)}</span><span><b>${_esc(placeName(c))}</b><small>falta${t - g > 1 ? 'm' : ''} ${t - g}</small></span></button>`).join('')}
    </div>` : ''}
    ${amapView === 'WORLD' ? `
    <div class="amap-conts">
      ${AMAP_CONT.map(([id, n]) => { const [g, t] = contStat(id);
        return `<button class="amap-cont" data-view="${id}" aria-label="${n}, ${g} de ${t}"><b>${id === 'AF' ? 'África e O. Médio' : n}</b>
          <span class="amap-cbar"><i style="width:${Math.round(g / Math.max(1, t) * 100)}%"></i></span><small>${g} de ${t}</small></button>`; }).join('')}
    </div>` : ''}
    </div>
    ${amapView === 'WORLD' ? `<p class="amap-hint small muted">Cada país se pinta conforme você cola as figurinhas dele. Toque num continente.</p>`
    : `<p class="amap-hint small muted">${shown.length} lugares · toque num país para abrir a página</p>`}
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
      ${topbar('Meu álbum', 'amap-back')}
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
          <span class="langs">${AMAP_LANGS[albCtry] || AMAP_CONT.find(c => c[0] === AMAP_PLACE_CONT[albCtry])[1]}</span>
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
                : `<span class="ph" aria-hidden="true">${albGhost(p ? 'player' : (stk(sid) || {}).kind)}</span><span class="nm">a colar</span>`}
            </div>`;
          }).join('')}
          ${(() => {
            const left = ALB_PER - spread.items.length;
            if (left <= 0) return '';
            const used = Math.ceil(spread.items.length / ALB_COLS), rows = ALB_PER / ALB_COLS - used;
            return Array.from({ length: left }, () => '<div class="alb-slot alb-blank" aria-hidden="true"></div>').join('')
              + (rows > 0 ? `<div class="alb-colo${rows <= 2 ? '' : ' is-tall'}" style="grid-row:${used + 1} / span ${rows}" aria-hidden="true">
                  ${albPitch(rows <= 2)}
                  <span class="alb-colo-em">${placeBadge(albCtry, 14)}</span>
                  <span class="alb-colo-txt"><span class="alb-colo-t">${_esc(nm)}</span><span class="alb-colo-s">fim da página</span></span>
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

function albumHtml() {
  /* A run that just stuck something in opens the album on that sticker's
     page — the reward is the reason they came here. */
  if (runNewIds.length && movedScreen) {
    const c = placeOf(runNewIds[0]);
    if (c) {
      albView = 'place'; albCtry = c; amapView = AMAP_PLACE_CONT[c] || 'WORLD';
      const i = placePages(c).findIndex(pg => pg.items.some(g => _sidOf(g) === runNewIds[0]));
      albPage = i < 0 ? 0 : i;
    }
  }
  return albView === 'place' ? albPlaceHtml() : albMapHtml();
}

/* the map as large as the room left for it allows, at its own proportions */
function fitAlbMap() {
  const w = document.querySelector('.amap-wrap'), m = w && w.querySelector('.amap');
  if (!m) return;
  const ar = parseFloat(m.style.getPropertyValue('--amap-ar')) || 2;
  /* the strip and the cards that share the room keep their height; the map takes the rest */
  const cs = getComputedStyle(w), gap = parseFloat(cs.rowGap) || 0;
  let others = 0;
  [...w.children].forEach(el => { if (el !== m) others += el.offsetHeight + gap; });
  const W = w.clientWidth, H = w.clientHeight - others;
  if (W < 1 || H < 1) return;
  m.style.width = Math.floor(Math.min(W - 10, (H - 10) * ar)) + 'px';
}
function wireAlbMap() {
  fitAlbMap();
  if (!window._amapRs) { window._amapRs = true; window.addEventListener('resize', () => { if (sc === 'album') fitAlbMap(); }); }
  const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  const toMap = () => { snd.swipe(); albView = 'map'; go(); };
  on('amap-back', toMap);
  on('amap-back2', toMap);
  document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.view === amapView) return;
    snd.page(); amapView = b.dataset.view; go();
  }));
  document.querySelectorAll('.amap-pin, .amap-nr').forEach(b => b.addEventListener('click', () => {
    snd.swipe(); albCtry = b.dataset.place; albPage = 0; albView = 'place'; go();
  }));
  /* on the whole world, a tap zooms into the continent under the finger */
  const m = document.getElementById('amap');
  if (m && amapView === 'WORLD') m.addEventListener('click', e => {
    const r = m.getBoundingClientRect(), [vx, vy, vw, vh] = ALB_MAP.views.WORLD;
    const x = vx + (e.clientX - r.left) / r.width * vw, y = vy + (e.clientY - r.top) / r.height * vh;
    const lon = x - 170, lat = 78 - y;
    const id = lon < -25 ? 'AM' : lat > 35.5 && lon < 45 ? 'EU' : lon < 63 && lat < 41 ? 'AF' : 'AS';
    snd.page(); amapView = id; go();
  });
}
