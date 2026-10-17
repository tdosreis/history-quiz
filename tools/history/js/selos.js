
/* ═══════════════════════════════════════════════════
   O ÁLBUM DE SELOS — every scene a postage stamp
   The drawn scenes (js/scenes/) are the stamps: answer a question that
   wears one and it is cancelled with the day's postmark and stuck in the
   stamp album for good; place an event's year close enough in "Que ano?"
   and its scene is yours too. The stamps are grouped by the theme file the
   scene was drawn in, nine to a page.
═══════════════════════════════════════════════════ */
const SELO_THEMES = [
  ['10_antiguidade',      'Antiguidade',      'Egito, Mesopotâmia e Roma', 'ANT', 'scroll'],
  ['11_grecia',           'Grécia',           'Das pólis a Alexandre',     'GRÉ', 'column'],
  ['20_medieval',         'Idade Média',      'Cruzados, vikings e califas', 'MED', 'shield'],
  ['30_asia',             'Ásia',             'Da China ao Japão',         'ÁSI', 'globe'],
  ['40_africa_americas',  'África e Américas', 'Reinos, impérios e Andes',  'AFR', 'coins'],
  ['50_moderna',          'Idade Moderna',    'Navegações e Renascimento', 'MOD', 'book'],
  ['60_revolucoes',       'Revoluções',       'Bastilha, vapor e Napoleão', 'REV', 'torch'],
  ['70_seculo20',         'Século XX',        'As grandes guerras',        'XX',  'news'],
  ['71_guerra_fria',      'Guerra Fria',      'Muros, foguetes e direitos', 'GF',  'rocket'],
  ['80_brasil',           'Brasil Colônia',   'Da costa ao Império',       'BR1', 'crown'],
  ['81_brasil_republica', 'Brasil República', 'De Canudos à Copa',         'BR2', 'flag'],
  ['90_ciencia',          'Ciência',          'Inventos e descobertas',    'CIÊ', 'bolt'],
  ['91_artes',            'Artes',            'Pintura, palco e pedra',    'ART', 'star'],
  ['92_letras_musica',    'Letras e Música',  'Livros, poemas e notas',    'LET', 'quill'],
];
const SELO_PER = 9;                     // stamps to a page: three rows of three
let selos = LS.get('selos', {});        // scene id → 'YYYY-MM-DD' it was won
let runSelos = [];                      // stamps won in this run
let seloTheme = null, seloPage = 0;

/* The stamps there are: every theme scene that something in the game can
   win — a written question that wears it, an event of the generated
   questions, or an event of "Que ano?". In the order they were drawn. */
let _seloBy = null, _seloNum = null;
function seloBy() {
  if (_seloBy) return _seloBy;
  const won = new Set();
  CATS.forEach(c => c.qs.forEach(q => { const s = sceneOf(q); if (s) won.add(s.id); }));
  Object.keys(SCENE).forEach(k => { if (SCENE[k].ev) won.add(k); });
  if (typeof ANO_EVENTS !== 'undefined') ANO_EVENTS.forEach(e => { if (e.pic && e.pic.scene) won.add(e.pic.scene); });
  const by = {};
  SELO_THEMES.forEach(([t]) => { by[t] = []; });
  Object.keys(SCENE).forEach(k => { const t = SCENE_T[k]; if (by[t] && won.has(k)) by[t].push(k); });
  _seloNum = {};
  let n = 0;
  SELO_THEMES.forEach(([t]) => by[t].forEach(k => { _seloNum[k] = ++n; }));
  return (_seloBy = by);
}
const seloAll = () => SELO_THEMES.flatMap(([t]) => seloBy()[t]);
const seloNum = id => (seloBy(), _seloNum[id] || 0);
const seloHas = id => !!selos[id];
const seloCount = () => seloAll().filter(seloHas).length;

function _todayISO() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
/* Stick a stamp in, if it is one and is new. True when it was. */
function awardSelo(id) {
  if (!id || selos[id] || !seloNum(id)) return false;
  selos[id] = _todayISO();
  LS.set('selos', selos);
  runSelos.push(id);
  return true;
}
/* the stamp a question wears, if answering it can win one */
function seloOfQ(q) {
  const s = sceneOf(q);
  return s && seloNum(s.id) ? s.id : null;
}

/* ── the stamp itself ──
   A white paper with perforated edges, the scene printed inside a thin
   frame, the stamp's number in the margin — and, once won, the round
   postmark of the day it was won, its wavy cancellation running off the
   right edge. `big` prints the postmark's words large enough to read. */
const _MES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
let _seloN = 0;
function seloSvg(id, opts) {
  opts = opts || {};
  const u = 'sl' + (++_seloN).toString(36);
  const W = 132, H = 104, R = 2.6, STEP = 8;
  let holes = '';
  for (let x = STEP / 2; x < W; x += STEP) holes += `<circle cx="${x}" cy="0" r="${R}"/><circle cx="${x}" cy="${H}" r="${R}"/>`;
  for (let y = STEP / 2; y < H; y += STEP) holes += `<circle cx="0" cy="${y}" r="${R}"/><circle cx="${W}" cy="${y}" r="${R}"/>`;
  const got = opts.got !== undefined ? opts.got : seloHas(id);
  const num = String(seloNum(id)).padStart(3, '0');
  if (!got) return `<svg class="selo-svg" viewBox="0 0 ${W} ${H}" aria-hidden="true">
    <rect x="3" y="3" width="${W - 6}" height="${H - 6}" rx="2" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="4 3" opacity=".55"/>
    <text x="${W / 2}" y="${H / 2 + 6}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="17" fill="currentColor" opacity=".5">Nº ${num}</text></svg>`;
  const d = String(selos[id] || _todayISO()).split('-');
  const date = `${+d[2]} ${_MES[(+d[1] || 1) - 1]} ${d[0]}`;
  const scene = SCENE[id] ? SCENE[id].draw() : '';
  return `<svg class="selo-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${_esc(typeof SCENE[id].label === 'function' ? SCENE[id].label() : SCENE[id].label)}">
    <defs><mask id="${u}m"><rect width="${W}" height="${H}" fill="#fff"/><g fill="#000">${holes}</g></mask>
      <clipPath id="${u}c"><rect x="0" y="0" width="120" height="80"/></clipPath></defs>
    <g mask="url(#${u}m)"><rect width="${W}" height="${H}" fill="#FBF7EC"/></g>
    <rect x="5.4" y="5.4" width="121.2" height="81.2" fill="none" stroke="#2A1D10" stroke-width=".8" opacity=".5"/>
    <g transform="translate(6 6)" clip-path="url(#${u}c)">${scene}</g>
    <text x="7" y="98" font-family="'Archivo Narrow', Archivo, sans-serif" font-weight="700" font-size="7.4" fill="#5E1616" letter-spacing=".6">CORREIO DA HISTÓRIA</text>
    <text x="${W - 7}" y="98.4" text-anchor="end" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="9" fill="#5E1616">${num}</text>
    ${opts.noMark ? '' : `<g class="selo-mark" transform="translate(96 26) rotate(-12)" fill="none" stroke="#1F2A44" stroke-width="1.3" opacity=".72">
      <circle r="17"/><circle r="12.6" stroke-width=".7"/>
      <path d="M17 -6q6 -4 12 0t12 0t12 0M17 0q6 -4 12 0t12 0t12 0M17 6q6 -4 12 0t12 0t12 0" stroke-width="1.1"/>
      <text y="-4.2" text-anchor="middle" stroke="none" fill="#1F2A44" font-family="'Archivo Narrow', Archivo, sans-serif" font-weight="700" font-size="${opts.big ? 4.6 : 4.2}" letter-spacing=".3">HISTORY QUIZ</text>
      <text y="3.4" text-anchor="middle" stroke="none" fill="#1F2A44" font-family="'Archivo Narrow', Archivo, sans-serif" font-weight="700" font-size="${opts.big ? 5.4 : 5}">${date}</text>
      <path d="M-9 7h18" stroke-width=".6"/></g>`}
  </svg>`;
}
const _seloLabel = id => { const l = SCENE[id] && SCENE[id].label; return typeof l === 'function' ? l() : (l || ''); };

/* ── the stamp album screen ── */
function selosHtml() {
  const by = seloBy();
  if (!seloTheme || !by[seloTheme]) {
    /* open on the theme of the stamp just won, else the first with stamps to find */
    const fresh = runSelos[runSelos.length - 1];
    seloTheme = (fresh && SCENE_T[fresh]) || SELO_THEMES[0][0];
    seloPage = fresh ? Math.floor(by[seloTheme].indexOf(fresh) / SELO_PER) : 0;
  }
  const th = SELO_THEMES.find(t => t[0] === seloTheme);
  const ids = by[seloTheme];
  const pages = Math.max(1, Math.ceil(ids.length / SELO_PER));
  seloPage = Math.max(0, Math.min(seloPage, pages - 1));
  const show = ids.slice(seloPage * SELO_PER, (seloPage + 1) * SELO_PER);
  const all = seloAll(), got = all.filter(seloHas).length;
  const pct = Math.round(got / Math.max(1, all.length) * 100);
  return `
  <div class="pg selo-pg">
    <div class="alb-top">
      ${topbar('Selos')}
      <div class="alb-head">
        <button id="bselalb" class="alb-vit" type="button">${ICON.book('currentColor', 12)} Figurinhas</button>
        <span class="small muted">${pct}% colado</span>
        <span class="display" style="font-size:20px;">${got}<span class="muted" style="font-size:13px;"> / ${all.length}</span></span>
      </div>
    </div>
    <div class="alb-bar"><i style="width:${Math.max(1, pct)}%"></i></div>
    <div class="alb-tabs" id="selo-tabs">
      ${SELO_THEMES.map(([t, n, , ab, ic]) => {
        const g = by[t], k = g.filter(seloHas).length;
        return `<button class="alb-tab${t === seloTheme ? ' is-on' : ''}${k === g.length && g.length ? ' is-done' : ''}" data-th="${t}" title="${n}">
          <span class="alb-tab-fl">${(ICON[ic] || ICON.stamp)('currentColor', 13)}</span>
          <span class="alb-tab-c">${ab}</span><span class="alb-tab-n">${k}/${g.length}</span></button>`;
      }).join('')}
    </div>
    <div class="selo-sheet">
      <div class="selo-band"><b>${th[1]}</b><span>${th[2]}</span></div>
      <div class="selo-grid">
        ${show.map((id, i) => `<button class="selo${seloHas(id) ? ' is-got' : ''}${runSelos.includes(id) ? ' is-new' : ''}" data-selo="${id}"
            style="animation-delay:${i * 40}ms" aria-label="${seloHas(id) ? _esc(_seloLabel(id)) : 'Selo nº ' + seloNum(id) + ', ainda por ganhar'}">${seloSvg(id)}</button>`).join('')}
        ${Array.from({ length: SELO_PER - show.length }, () => '<span class="selo selo-void" aria-hidden="true"></span>').join('')}
      </div>
      <div class="selo-pager">
        <button id="selo-prev" class="btn btn-ghost btn-icon" aria-label="Página anterior"${seloPage === 0 ? ' disabled' : ''}>${ICON.back('currentColor', 12)}</button>
        <span class="small muted">página ${seloPage + 1} de ${pages} · ${ids.filter(seloHas).length} de ${ids.length} selos</span>
        <button id="selo-next" class="btn btn-ghost btn-icon" aria-label="Próxima página"${seloPage >= pages - 1 ? ' disabled' : ''}>${ICON.back('currentColor', 12).replace('<svg', '<svg style="transform:scaleX(-1)"')}</button>
      </div>
      <p class="selo-hint small muted">Acerte uma pergunta com esta ilustração — ou crave o ano no <b>Que ano?</b> — e o selo é seu.</p>
    </div>
  </div>`;
}

/* a stamp up close, with what it shows and the day it was won */
function seloZoom(id) {
  const old = document.getElementById('selo-zoom');
  if (old) old.remove();
  const got = seloHas(id);
  const d = got ? String(selos[id]).split('-') : null;
  const z = document.createElement('div');
  z.id = 'selo-zoom';
  z.className = 'selo-zoom';
  z.setAttribute('role', 'dialog');
  z.setAttribute('aria-label', 'Selo');
  z.innerHTML = `<div class="selo-zoom-card">
      <div class="selo-zoom-st">${seloSvg(id, { big: true })}</div>
      <p class="selo-zoom-t">${got ? _esc(_seloLabel(id)) : 'Ainda por ganhar'}</p>
      <p class="small muted">Selo nº ${seloNum(id)} · ${(SELO_THEMES.find(t => t[0] === SCENE_T[id]) || [])[1] || ''}${
        got ? ` · carimbado em ${+d[2]}/${+d[1]}/${d[0]}` : ''}</p>
      <button class="btn btn-ghost btn-sm" id="selo-zoom-x">Fechar</button></div>`;
  document.body.appendChild(z);
  const close = () => { z.remove(); };
  z.addEventListener('click', e => { if (e.target === z || e.target.id === 'selo-zoom-x') close(); });
  document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
}

function wireSelos() {
  const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  on('bselalb', () => { snd.swipe(); sc = 'album'; go(); });
  on('selo-prev', () => { snd.page(); seloPage--; go(); });
  on('selo-next', () => { snd.page(); seloPage++; go(); });
  const tabs = document.getElementById('selo-tabs');
  if (tabs) {
    tabs.addEventListener('click', e => {
      const b = e.target.closest && e.target.closest('.alb-tab');
      if (!b || b.dataset.th === seloTheme) return;
      seloTheme = b.dataset.th; seloPage = 0; snd.swipe(); go();
    });
    const on_ = tabs.querySelector('.is-on');
    if (on_) try { on_.scrollIntoView({ inline: 'center', block: 'nearest' }); } catch (e) {}
  }
  const grid = document.querySelector('.selo-grid');
  if (grid) grid.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('.selo[data-selo]');
    if (b) { snd.tap(); seloZoom(b.dataset.selo); }
  });
  /* a swipe turns the page, as in the album */
  const sh = document.querySelector('.selo-sheet');
  if (sh) {
    let x0 = null;
    sh.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    sh.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) < 50) return;
      const b = document.getElementById(dx < 0 ? 'selo-next' : 'selo-prev');
      if (b && !b.disabled) b.click();
    }, { passive: true });
  }
}

/* the stamps a run won, on its end screen */
function selosStrip() {
  if (!runSelos.length) return '';
  const show = runSelos.slice(-4);
  return `<button id="bselos-end" class="selo-strip" type="button">
    <span class="eyebrow" style="color:var(--brass);">${runSelos.length} ${runSelos.length === 1 ? 'selo novo' : 'selos novos'} · ver no álbum</span>
    <span class="selo-strip-row">${show.map((id, i) => `<span class="selo-mini" style="animation-delay:${i * 80}ms">${seloSvg(id)}</span>`).join('')}</span>
  </button>`;
}
/* one line under a reveal when the answer won a stamp */
function seloWonLine(id) {
  return `<div class="selo-won"><span class="selo-mini">${seloSvg(id)}</span>
    <span><b>Selo novo!</b> nº ${seloNum(id)} · ${_esc((SELO_THEMES.find(t => t[0] === SCENE_T[id]) || [])[1] || '')}</span></div>`;
}
/* the home screen's stamp tile: the last three stamps won, or blank ones */
function seloHomeTile() {
  const all = seloAll(), mine = all.filter(seloHas).sort((a, b) => String(selos[a]).localeCompare(String(selos[b])));
  const three = mine.slice(-3);
  while (three.length < 3) three.unshift(null);
  return `<button id="bselo" class="cv-album cv-selo" type="button">
    <span class="cv-stk" aria-hidden="true">${three.map((id, i) => `<i style="--i:${i}">${id ? seloSvg(id, { noMark: i < 2 }) : `<svg class="selo-svg" viewBox="0 0 132 104"><rect x="3" y="3" width="126" height="98" rx="2" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="7 5" opacity=".45"/></svg>`}</i>`).join('')}</span>
    <span class="cv-at"><span class="cv-h">Selos</span>
      <b>${mine.length}<small> de ${all.length}</small></b>
      <span class="cv-bar"><i style="width:${Math.max(2, Math.round(mine.length / Math.max(1, all.length) * 100))}%"></i></span></span>
  </button>`;
}
