
/* The icon a question can be drawn with, by name — what merge_questions.py
   checks `art.icon` against. */
const QICON = {
  column: w => ART.column(w), pyramid: w => ART.pyramid(w), ship: w => ART.ship(w),
  castle: w => ART.castle(w), crown: w => ART.crown(w), sword: w => ART.sword(w),
  scroll: w => ART.scroll(w), book: w => ART.book(w), globe: w => ART.globe(w),
  torch: w => ART.torch(w), cannon: w => ART.cannon(w), map: w => ART.map(w),
  hourglass: w => ART.hourglass(w), trophy: w => ART.trophy(w), gear: w => ART.gear(w),
  rocket: w => ART.rocket(w), flag: w => ART.flag(w), bust: w => ART.bust(w),
  quill: w => ART.quill(w), telescope: w => ART.telescope(w), flask: w => ART.flask(w), palette: w => ART.palette(w),
  lyre: w => ART.lyre(w), masks: w => ART.masks(w), helmet: w => ART.helmet(w), compass: w => ART.compass(w),
  train: w => ART.train(w), plane: w => ART.plane(w), chains: w => ART.chains(w), scales: w => ART.scales(w),
  dove: w => ART.dove(w), church: w => ART.church(w), coins: w => ART.coins(w), amphora: w => ART.amphora(w),
};
/* A writer picks from the vignettes they know; a book over a question about a
   symphony, or a sword over a Greek hoplite, is the nearest they had. The
   question's own words choose a closer one when there is one. */
const ICON_REFINE = [
  [/\b(sinfonia|opera|compos\w*|compositor\w*|musica\w*|piano|violino|cancao|hino|samba|choro|valsa)\b/, 'lyre'],
  [/\b(teatro|peca|tragedia|comedia|dramaturg\w*|ator|atriz|cinema|filme)\b/, 'masks'],
  [/\b(pint\w*|quadro|tela|afresco|mural|retrato|impressionis\w*|cubis\w*|surreal\w*|barroco|museu)\b/, 'palette'],
  [/\b(telescop\w*|astronom\w*|planeta\w*|orbita\w*|estrela\w*|cometa|eclipse|heliocentr\w*|galaxia)\b/, 'telescope'],
  [/\b(quimic\w*|elemento|vacina\w*|medic\w*|doenca\w*|penicilina|antibiotic\w*|laboratori\w*|radioativ\w*|microb\w*|virus)\b/, 'flask'],
  [/\b(poema|poeta|poesia|romance|escrit\w*|livro|obra literaria|soneto|epopeia|literatura|autor\w*)\b/, 'quill'],
  [/\b(locomotiva|ferrovia\w*|trem|vapor|revolucao industrial|fabrica\w*|maquina a vapor)\b/, 'train'],
  [/\b(aviao|avioes|voo|aviador\w*|aeronave|14-bis|zepelim)\b/, 'plane'],
  [/\b(escrav\w*|abolic\w*|lei aurea|quilombo\w*|alforria|cativ\w*)\b/, 'chains'],
  [/\b(lei|leis|codigo|constituicao|direito\w*|tribunal|juiz|julgamento|justica)\b/, 'scales'],
  [/\b(paz|armisticio|nobel da paz|nao violencia|onu)\b/, 'dove'],
  [/\b(igreja|catedral|papa\w*|bispo|monge\w*|mosteiro|cristianismo|catolic\w*|protestant\w*|reforma protestante|concilio|cruzada\w*)\b/, 'church'],
  [/\b(moeda\w*|dinheiro|comerci\w*|banco|economia|imposto\w*|ouro|tributo|mercad\w*|inflacao|plano real)\b/, 'coins'],
  [/\b(hoplita\w*|legiao|legionari\w*|falange|cavaleiro\w*|samurai|gladiador\w*|guerreiro\w*|espartan\w*)\b/, 'helmet'],
  [/\b(navega\w*|bussola|rota|descobriment\w*|expedic\w*|circum-navega\w*|cartograf\w*|astrolabio)\b/, 'compass'],
  [/\b(grecia antiga|ceramica|anfora|vaso grego|olimpiad\w*|jogos olimpicos)\b/, 'amphora'],
];
const ICON_GENERIC = new Set(['book', 'bust', 'scroll', 'globe', 'gear', 'map', 'crown', 'sword', 'flag', 'torch', 'ship', 'column']);
function refineIcon(q, key) {
  if (!ICON_GENERIC.has(key)) return key;
  const t = _fold(q.t || '');
  for (const [rx, k] of ICON_REFINE) if (rx.test(t)) return k;
  return key;
}
/* the mark of a category when a question carries no picture of its own */
const CAT_ART = {
  egito_mesopotamia: 'pyramid', grecia: 'column', roma: 'sword', medieval: 'castle', oriente: 'globe',
  africa: 'map', americas: 'pyramid', descobrimentos: 'ship', renascimento: 'book', absolutismo: 'crown',
  idade_moderna: 'compass', revolucoes: 'torch', seculo19: 'gear', guerras_mundiais: 'cannon', seculo20: 'plane',
  guerra_fria: 'rocket', brasil_colonia: 'ship', brasil_republica: 'flag',
  ciencia: 'gear', artes: 'bust', mulheres: 'crown', personagens: 'bust', monumentos: 'column', curiosidades: 'scroll',
  quem_sou_eu: 'bust', linha_do_tempo: 'hourglass', imperios: 'crown', citacoes: 'quill', batalhas: 'sword',
  linhagens: 'crown', manchetes: 'scroll', duelos: 'hourglass', fato_mito: 'scales',
};
const FALLBACK_PHOTO = {};
const NONFREE_CRESTS = new Set([]);
const CTRY_ISO = {};

/* ── The flag of a country, large, for a question card ── */
function qFlagInner(code) {
  return `<svg viewBox="0 0 9 6" preserveAspectRatio="none" aria-hidden="true">${FLAGS[code] || ''}</svg>`;
}

/* ═══════════════════════════════════════════════════
   EMBLEMS — every polity's brasão, drawn
   No state of the ancient world left a flag to photograph, and the ones
   that did are public domain only in spirit. Each is therefore a shield in
   its own two colours with one device on it — a crown, a sun, an eagle —
   the way a schoolbook marks an empire on its map.
═══════════════════════════════════════════════════ */
function _lum(hex) {
  let h = String(hex).replace('#', '');
  if (h.length === 3) h = h.split('').map(x => x + x).join('');
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}
function _dist(a, b) {
  const p = hex => {
    let h = String(hex).replace('#', '');
    if (h.length === 3) h = h.split('').map(x => x + x).join('');
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  };
  const [r1, g1, b1] = p(a), [r2, g2, b2] = p(b);
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

/* devices, all centred on (30,24) inside a 24-unit box; `k` is the fill */
const EMBLEM = {
  crown:   k => `<path d="M17 33 L15 17 L23 24 L30 13 L37 24 L45 17 L43 33Z M17 36h26" fill="${k}" stroke="${k}" stroke-width="2" stroke-linejoin="round"/>`,
  sun:     k => `<circle cx="30" cy="24" r="6" fill="${k}"/>` + Array.from({ length: 12 }, (_, i) => {
             const a = i * Math.PI / 6; return `<path d="M${(30 + Math.cos(a) * 9).toFixed(1)} ${(24 + Math.sin(a) * 9).toFixed(1)}L${(30 + Math.cos(a) * 13).toFixed(1)} ${(24 + Math.sin(a) * 13).toFixed(1)}" stroke="${k}" stroke-width="2.2" stroke-linecap="round"/>`; }).join(''),
  moon:    k => `<path d="M36 14a12 12 0 1 0 0 20a9.5 9.5 0 1 1 0-20Z" fill="${k}"/><path d="M40 21l1.4 3 3.2.3-2.4 2.1.8 3.1-3-1.7-3 1.7.8-3.1-2.4-2.1 3.2-.3z" fill="${k}"/>`,
  eagle:   k => `<path d="M30 12l4 6 11-4-4 10 5 3-9 1-2 11-5-6-5 6-2-11-9-1 5-3-4-10 11 4z" fill="${k}"/>`,
  column:  k => `<path d="M17 13h26v4H17zM20 17h20v3H20zM22 20h4v14h-4zM28 20h4v14h-4zM34 20h4v14h-4zM17 34h26v4H17z" fill="${k}"/>`,
  pyramid: k => `<path d="M30 11L47 36H13z" fill="${k}"/><path d="M30 11V36" stroke="#0003" stroke-width="2"/>`,
  sword:   k => `<path d="M30 9l3 4v18h-6V13z" fill="${k}"/><path d="M21 31h18v3H21zM28 34h4v8h-4z" fill="${k}"/>`,
  laurel:  k => `<path d="M30 38C20 36 15 28 17 16M30 38C40 36 45 28 43 16" fill="none" stroke="${k}" stroke-width="2.6" stroke-linecap="round"/>` +
             [[17,18],[16,24],[19,30],[43,18],[44,24],[41,30]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2.4" ry="4" fill="${k}"/>`).join('') + _STAR(30, 22, 6, k),
  star:    k => _STAR(30, 24, 13, k),
  lion:    k => `<circle cx="30" cy="25" r="8" fill="${k}"/>` + Array.from({ length: 10 }, (_, i) => {
             const a = i * Math.PI / 5; return `<path d="M${(30 + Math.cos(a) * 8).toFixed(1)} ${(25 + Math.sin(a) * 8).toFixed(1)}L${(30 + Math.cos(a + .16) * 14).toFixed(1)} ${(25 + Math.sin(a + .16) * 14).toFixed(1)}L${(30 + Math.cos(a + .31) * 8).toFixed(1)} ${(25 + Math.sin(a + .31) * 8).toFixed(1)}Z" fill="${k}"/>`; }).join('') +
             `<circle cx="27.4" cy="24" r="1.3" fill="#0008"/><circle cx="32.6" cy="24" r="1.3" fill="#0008"/>`,
  ship:    k => `<path d="M15 31h30q-3 7-9 8H24q-6-1-9-8zM30 12v19M32 14q9 4 9 15H32zM28 17q-8 4-8 12h8z" fill="${k}" stroke="${k}" stroke-width="1" stroke-linejoin="round"/>`,
  wheel:   k => `<circle cx="30" cy="24" r="11" fill="none" stroke="${k}" stroke-width="2.6"/><circle cx="30" cy="24" r="3" fill="${k}"/>` +
             Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<path d="M30 24L${(30 + Math.cos(a) * 11).toFixed(1)} ${(24 + Math.sin(a) * 11).toFixed(1)}" stroke="${k}" stroke-width="1.6"/>`; }).join(''),
  tower:   k => `<path d="M20 36V17h4v3h4v-3h4v3h4v-3h4v19zM27 36v-7a3 3 0 0 1 6 0v7z" fill="${k}" fill-rule="evenodd"/>`,
  cross:   k => `<path d="M27 11h6v9h9v6h-9v13h-6V26h-9v-6h9z" fill="${k}"/>`,
  book:    k => `<path d="M30 16q-8-4-16-1v20q8-3 16 1zM30 16q8-4 16-1v20q-8-3-16 1z" fill="${k}"/>`,
  hammer:  k => `<path d="M20 36L36 14M33 11l8 7-3 3-8-7z" stroke="${k}" stroke-width="3" fill="${k}" stroke-linecap="round"/><path d="M40 34a11 11 0 0 1-17-13" fill="none" stroke="${k}" stroke-width="3" stroke-linecap="round"/>`,
};

/* every drawing of a brasão gets its own clip-path id: the same crest can sit in
   an album pocket and in the zoom at once, and a shared id clips the zoomed
   one against the hidden pocket's shape — the shield came out as a bare outline */
let _crestN = 0;
function genericCrest(id) {
  if (BRASAO[id]) return brasaoSvg(id);   /* its own emblem (js/brasoes/) */
  const c = CL.find(x => x.id === id);
  if (!c) return '';
  const uid  = 'c' + id.replace(/\W/g, '') + '_' + (++_crestN).toString(36);
  const base = c.c1;
  const alt  = _dist(c.c1, c.c2) > 70 ? c.c2 : (_lum(base) < 0.5 ? '#ececec' : '#1a1a1a');
  const ink  = _lum(base) < 0.55 ? (_lum(alt) > 0.6 ? alt : '#ffffff') : '#141414';
  const edge = _lum(base) < 0.5 ? '#f0f0f0' : '#1a1a1a';
  const SHIELD = 'M30 2 L55.8 10.4 L55.8 31.2 C55.8 45.6 43.8 55.2 30 59.1 '
               + 'C16.2 55.2 4.2 45.6 4.2 31.2 L4.2 10.4 Z';
  const dev = (EMBLEM[c.em] || EMBLEM.star)(ink);
  return `
    <defs><clipPath id="${uid}s"><path d="${SHIELD}"/></clipPath></defs>
    <g clip-path="url(#${uid}s)">
      <path d="${SHIELD}" fill="${base}"/>
      <rect x="0" y="45" width="60" height="16" fill="${alt}" opacity=".9"/>
    </g>
    <path d="${SHIELD}" fill="none" stroke="${edge}" stroke-width="2.2" stroke-linejoin="round"/>
    ${dev}
    <text x="30" y="52.6" text-anchor="middle"
      font-family="'Archivo','Arial Black',Impact,sans-serif"
      font-size="8.4" font-weight="800" letter-spacing=".5" fill="${_lum(alt) < .5 ? '#fff' : '#141414'}">${c.a}</text>`;
}

function clubArt(id, style, label) {
  const name = clubName(id);
  const inner = LOGOS[id]
    ? `<img src="${LOGOS[id]}" alt="" aria-hidden="true" onerror="clubFallback(this,'${id}')" />`
    : `<svg viewBox="0 0 60 60" class="fill" aria-hidden="true">${genericCrest(id)}</svg>`;
  return `<span class="crest-disc" style="${style || ''}"
    ${label ? `role="img" aria-label="${name}"` : 'aria-hidden="true"'}>${inner}</span>`;
}
function clubFallback(img, id) {
  try { img.outerHTML = `<svg viewBox="0 0 60 60" class="fill" aria-hidden="true">${genericCrest(id)}</svg>`; }
  catch (e) { img.style.opacity = '.3'; }
}

/* ═══════════════════════════════════════════════════
   ANSWER TILES — every written choice carries a picture

   A choice that names a figure, a polity, a country or a monument wears that
   face, emblem, flag or photograph when most of the board does. Any other
   board — years, centuries, rivers, scripts, treaties, battles — is drawn:
   each answer gets a little engraving of the kind of thing it is, the same
   kind on every slip of the board, so the pictures say what the question is
   about and never which slip is right.
═══════════════════════════════════════════════════ */
let _optIdx = null;
function optIndex() {
  if (_optIdx) return _optIdx;
  const club = {}, flag = {}, face = {}, stad = {};
  CL.forEach(c => { club[_fold(c.n)] = c.id; });
  Object.entries(CTRY_NAME).forEach(([c, n]) => { if (FLAGS[c]) flag[_fold(n)] = c; });
  /* a name two figures share is nobody's in particular; a surname or a first
     name the album holds once ("Bonaparte", "Napoleão") is that figure's */
  const seen = {}, part = {};
  PL.forEach(p => {
    if (!p.img || !p.n) return;
    const n = _fold(p.n); seen[n] = (seen[n] || 0) + 1; face[n] = p;
    /* first names and titles are nobody's in particular: "Heitor" on a board
       of Trojan heroes is Hector, not Villa-Lobos (see ART_STOP) */
    const all = n.replace(/[(),]/g, ' ').split(/\s+/).filter(Boolean);
    const w = all.filter(x => x.length >= 4 && !/^(the|von|van|der|dos|das|del|della)$/.test(x) && !ART_STOP.has(x));
    /* "Cleópatra VII" is two words even though "VII" is too short to stand for her */
    if (all.length > 1) w.forEach(x => { part[x] = part[x] === undefined ? p : null; });
  });
  Object.keys(seen).forEach(n => { if (seen[n] > 1) delete face[n]; });
  Object.keys(part).forEach(x => { if (part[x] && !(x in face) && !club[x] && !flag[x]) face[x] = part[x]; });
  Object.keys(STAD).forEach(k => { if (STAD_IMGS[k]) stad[_fold(STAD[k].name)] = k; });
  return (_optIdx = { club, flag, face, stad });
}

/* What one written choice is a picture of, if anything. */
function optResolve(text) {
  const raw = _fold(text).trim(), X = optIndex();
  /* "Luxor (antiga Tebas)": the name before the brackets is the thing */
  const f = raw.replace(/\s*\(.*\)\s*$/, '').trim();
  for (const k of [raw, f]) {
    if (X.club[k]) return { k: 'club', id: X.club[k] };
    if (X.flag[k]) return { k: 'ctry', iso: [X.flag[k]] };
    if (X.face[k]) return { k: 'face', img: X.face[k].img, id: X.face[k].id };
    if (X.stad[k]) return { k: 'stad', id: X.stad[k], img: STAD_IMGS[X.stad[k]] };
  }
  /* "Gregos e romanos": two peoples, two flags */
  const two = f.split(/\s+e\s+/);
  if (two.length === 2 && X.flag[two[0]] && X.flag[two[1]]) return { k: 'ctry', iso: [X.flag[two[0]], X.flag[two[1]]] };
  return null;
}

/* asked about the look of the thing: its picture would be the answer */
const OPT_LOOKS = /\b(bandeira|brasao|emblema|simbolo|cores?|retrato|rosto|foto|fotografia|imagem|aparencia)\b/;

/* ── What kind of thing an answer is ──
   Read from the question first ("qual rio…", "em que século…"), then from
   the answer itself (a year is a year whatever the question says). */
const ROMAN_RX = /^(s[eé]c(ulo|\.)?\s*)?([ivxlc]+)(\s*a\.?\s?c\.?)?$/i;
const OPT_TOPIC_Q = [
  /* a question that opens by asking for a person wants people, whatever war or
     treaty it mentions on the way ("Qual herói grego da Guerra de Troia…") */
  ['person',  /^(qual|quais|que) (heroi|heroina|herois|rei|rainha|reis|imperador|imperatriz|farao|papa|presidente|general|lider|governante|filosofo|cientista|pintor|escritor|poeta|navegador|explorador|conquistador|sultao|czar|califa|santo|profeta|apostolo|faraos|imperadores|generais|lideres)\b/],
  ['century', /\bem que seculo\b|\bqual seculo\b|\bseculo em que\b/],
  ['year',    /\bem que ano\b|\bqual ano\b|\bano em que\b|\bque data\b|\bem que data\b/],
  ['date',    /\bem que (data|dia|mes)\b|\bque dia\b|\bqual (data|dia|mes)\b/],
  ['river',   /\b(rio|rios|afluente|delta|nascente)\b/],
  ['sea',     /\b(mar|mares|oceano|oceanos|golfo|estreito|canal|baia)\b/],
  ['build',   /\b(cidadela|ruinas?|sitio arqueologico|fortaleza|castelo|muralha|piramide|palacio|aqueduto|maravilhas?|colosso|farol|mausoleu)\b/],
  ['road',    /\b(estrada|estradas|via|vias|caminho|rota da seda|rota terrestre)\b/],
  ['mount',   /\b(montanha|monte|cordilheira|vulcao|serra|pico|alpes|andes)\b/],
  ['land',    /\b(vale|planicie|planalto|deserto|regiao|territorio|estepe|floresta|selva|savana|colonia)\b/],
  ['island',  /\b(ilha|ilhas|arquipelago|peninsula)\b/],
  ['script',  /\b(escrita|alfabeto|hieroglif\w*|cuneiform\w*|idioma|lingua|linguas|letras)\b/],
  ['battle',  /\b(batalha|batalhas|guerra|guerras|revolta|cerco|invasao|conflito|exercito|derrota|vitoria)\b/],
  ['treaty',  /\b(tratado|acordo|lei|leis|codigo|constituicao|decreto|carta|edito|bula|manifesto|declaracao|pacto|documento|conferencia|congresso|concilio|assembleia|cupula|conven[cç]ao)\b/],
  ['book',    /\b(livro|obra|romance|poema|epopeia|peca|poesia|escreveu|escrito|publicou)\b/],
  ['art',     /\b(pintura|quadro|tela|escultura|estatua|afresco|mural|pintou|esculpiu|estilo|movimento artistico)\b/],
  ['music',   /\b(sinfonia|opera|musica|compos|compositor|cancao|hino)\b/],
  ['temple',  /\b(religiao|religioes|deus|deusa|deuses|templo|igreja|catedral|mesquita|crenca|culto|profeta|santo|papa|ordem religiosa|heresia)\b/],
  ['build',   /\b(construiu|construcao|monumento|palacio|piramide|muralha|castelo|fortaleza|ponte|aqueduto|arquitet\w*)\b/],
  ['invent',  /\b(invent\w*|descobr\w*|maquina|tecnologia|cientific\w*|teoria|vacina|experiment\w*|elemento quimico|ferramenta|instrumento|aparelho|criad[oa]|criou|tecnica|motor)\b/],
  ['plague',  /\b(peste|epidemia|pandemia|doenca|praga|gripe|varicela|variola)\b/],
  ['crop',    /\b(cultivo|cultura|plantacao|lavoura|cafe|acucar|algodao|borracha|trigo|cana|planta|alimento|fruta|cereal)\b/],
  ['weapon',  /\b(arma|armas|canhao|polvora|espada|lanca|arco|catapulta|bomba)\b/],
  ['ship',    /\b(navio|navios|caravela|nau|frota|esquadra|navega\w*|viagem|expedicao|rota)\b/],
  ['coin',    /\b(moeda|dinheiro|comercio|imposto|tributo|ouro|prata|especiaria|mercadoria|produto|exportava)\b/],
  ['city',    /\b(cidade|cidades|capital|capitais|porto|vila|sede|local|lugar|bairro|onde (fica|ficava|foi|nasceu|morreu|aconteceu))\b/],
  ['people',  /\b(povo|povos|tribo|tribos|civilizacao|civilizacoes|dinastia|cla|casta|classe|grupo)\b/],
  ['idea',    /\b(ideologia|doutrina|filosofia|movimento|regime|sistema|corrente|escola|reforma)\b/],
  ['person',  /^quem\b|\bquem (foi|era|liderou|fundou|governou|escreveu|pintou|descobriu|inventou)\b|\b(rei|rainha|imperador|imperatriz|farao|papa|presidente|general|lider|governante|filosofo|cientista|pintor|escritor|navegador|explorador|personagem|sultao|czar|califa)\b/],
  ['title',   /\b(titulo|cargo|apelido|epiteto|conhecid[oa] como|chamad[oa])\b/],
];
function optTopic(choice, tq) {
  const c = _fold(choice).trim();
  if (/^-?\d{1,4}(\s*a\.?\s?c\.?)?$/.test(c)) return 'year';
  if (/^\d{1,2}(º|o)? de [a-z]+( de -?\d{1,4}( a\.?\s?c\.?)?)?$/.test(c) || /^(janeiro|fevereiro|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)( de \d{1,4})?$/.test(c)) return 'date';
  if (ROMAN_RX.test(c) && /[ivxlc]/.test(c) && c.length <= 14) return 'century';
  if (/^[\d.,]+(\s+[a-z]+)?$/.test(c)) return 'number';
  for (const [k, rx] of OPT_TOPIC_Q) if (rx.test(tq)) return k;
  if (/^(o|a|os|as) /.test(c) && c.split(/\s+/).length >= 3) return 'title';
  return '';
}

const _hh = s => { let h = 0; for (const ch of String(s)) h = (h * 33 + ch.charCodeAt(0)) >>> 0; return h; };
const G_INK = '#2A1D10', G_GOLD = '#B08A3E', G_PAPER = '#F1E7CF';
const G_DYES = ['#7B1E3A', '#2F5D62', '#8A5A2B', '#3F4F7A', '#5E6B3A', '#7A4F86', '#9A5B1E'];
/* the era a board belongs to, so a person drawn on it wears its clothes */
function optEra(q) {
  const y = (typeof qCues === 'function' ? qCues(q).year : null);
  if (y !== null && y !== undefined) return y < 500 ? 'ant' : y < 1500 ? 'med' : y < 1800 ? 'mod' : 'new';
  const cid = (q._cat && q._cat.id) || '';
  if (/egito|grecia|roma|antig/.test(cid)) return 'ant';
  if (/medieval|oriente/.test(cid)) return 'med';
  if (/renasc|absolut|descobr|colonia|idade_moderna/.test(cid)) return 'mod';
  return 'new';
}
const _disc = (inner, rim) => `<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18.5" fill="${G_PAPER}"/>${inner}
  <circle cx="20" cy="20" r="18.5" fill="none" stroke="${rim || G_GOLD}" stroke-width="1"/></svg>`;
const _esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

/* a bust in the clothes of its age, the hair, skin and dye chosen from the
   name so six unknown people read as six people */
function bustGlyph(name, era) {
  const h = _hh(name);
  const skin = ['#C9A07E', '#9A7458', '#B88C68', '#6E503B', '#D8B392', '#82614A'][h % 6];
  const hair = ['#2A211B', '#3A2C22', '#5A3E28', '#1C1815', '#8C7A62', '#A79D8C'][(h >> 3) % 6];
  const dye = G_DYES[(h >> 5) % G_DYES.length];
  const head = `<path d="M17.2 19.5h5.6v6.8h-5.6Z" fill="${skin}"/><ellipse cx="20" cy="14.6" rx="6.2" ry="7.2" fill="${skin}"/>`;
  const body = {
    ant: `<path d="M4 40c.8-9 7-14.4 16-14.4S35.2 31 36 40Z" fill="#EDE3CC"/><path d="M8 40c3-8 8-12 14-13l-5 13Z" fill="${dye}" opacity=".85"/>
          ${[[13, 8, -30], [11.5, 12.5, -10], [12.4, 17, 20], [27, 8, 30], [28.5, 12.5, 10], [27.6, 17, -20]].map(([x, y, a]) =>
            `<ellipse cx="${x}" cy="${y}" rx="1.4" ry="2.6" fill="#6E7A3A" transform="rotate(${a} ${x} ${y})"/>`).join('')}`,
    med: `<path d="M4 40c.8-9 7-14.4 16-14.4S35.2 31 36 40Z" fill="${dye}"/><path d="M14 26.4c2 1.6 4 2.2 6 2.2s4-.6 6-2.2" fill="none" stroke="${G_GOLD}" stroke-width="1.4"/>
          <path d="M13.4 9.6 14.6 4l3 3.2L20 2.6l2.4 4.6 3-3.2 1.2 5.6Z" fill="${G_GOLD}" stroke="${G_INK}" stroke-width=".5"/>`,
    mod: `<path d="M4 40c.8-9 7-14.4 16-14.4S35.2 31 36 40Z" fill="${dye}"/>
          <path d="M12 25.6c2.6 2.6 5 3.4 8 3.4s5.4-.8 8-3.4c0 1.8-.8 3-2 3.8 1.2.8 1.4 2 .6 2.8-2 1-4.4 1.4-6.6 1.4s-4.6-.4-6.6-1.4c-.8-.8-.6-2 .6-2.8-1.2-.8-2-2-2-3.8Z" fill="#F7F1E2" stroke="${G_INK}" stroke-width=".4"/>`,
    new: `<path d="M4 40c.8-9 7-14.4 16-14.4S35.2 31 36 40Z" fill="${['#3B3229', '#2A3244', '#4A3A2C', '#2F2F33'][h % 4]}"/>
          <path d="M15.6 25.6 20 32l4.4-6.4-4.4-1Z" fill="#EFE6CF"/><path d="M18.9 27.3h2.2l.9 8.2-2 2-2-2Z" fill="${dye}"/>`,
  }[era] || '';
  const hairs = [
    `<path d="M13.6 13.2c0-5.6 3-8.4 6.4-8.4s6.4 2.8 6.4 8.4c-1.4-2.6-3.6-3.9-6.4-3.9s-5 1.3-6.4 3.9Z" fill="${hair}"/>`,
    `<path d="M13.2 15c-.4-6.6 2.6-10.4 6.8-10.4 4.6 0 7.4 3.6 6.8 10.4-.8-1.4-1.6-4.6-3-5.6-2.2 1.4-5.6 1.6-8.6.8-1.2 1.4-1.6 3.2-2 4.8Z" fill="${hair}"/>`,
    `<path d="M13 12.4c0-5 3-7.8 7-7.8s7 2.8 7 7.8l-1.2-.6c-.4-2-1.4-3.2-2.6-3.6-1 .8-5.4.8-6.4 0-1.2.4-2.2 1.6-2.6 3.6Z" fill="${hair}"/><path d="M15.4 19.6c1.2 2.6 2.8 3.4 4.6 3.4s3.4-.8 4.6-3.4c-.2 2.8-2 4.8-4.6 4.8s-4.4-2-4.6-4.8Z" fill="${hair}" opacity=".9"/>`,
    `<path d="M11.6 24c-1.4-9.4 1.6-18 8.4-18s9.8 8.6 8.4 18c-1-4-1.6-8.6-3.2-10.2-2 1-6.4 1-8.4 0-1.6 1.6-2.2 6.2-3.2 10.2Z" fill="${hair}"/>`,
  ];
  return `<svg viewBox="0 0 40 40" aria-hidden="true"><defs><clipPath id="bg${h % 9973}"><circle cx="20" cy="20" r="18.5"/></clipPath></defs>
    <circle cx="20" cy="20" r="18.5" fill="${G_PAPER}"/><g clip-path="url(#bg${h % 9973})">${head}${hairs[(h >> 7) % hairs.length]}${body}</g>
    <circle cx="20" cy="20" r="18.5" fill="none" stroke="${G_GOLD}" stroke-width="1"/></svg>`;
}

/* a state the album has no brasão for: a shield in a dye from its name,
   with its initials on a ribbon, the same size as the real ones beside it */
function shieldGlyph(name) {
  const h = _hh(name), a = G_DYES[h % G_DYES.length], b = ['#E9DDC1', '#C9A04E', '#F4EEDC'][(h >> 4) % 3];
  const w = String(name).replace(/[()'".]/g, ' ').split(/[\s-]+/).filter(x => x && !/^(de|da|do|dos|das|e|o|a|os|as|of|the)$/i.test(x));
  const ini = ((w[0] || '?')[0] + (w.length > 1 ? w[w.length - 1][0] : (w[0] || '')[1] || '')).toUpperCase();
  return `<svg viewBox="0 0 40 46" aria-hidden="true"><path d="M3 4.5C10 6 15 4 20 2C25 4 30 6 37 4.5V22C37 33 29 40.5 20 44C11 40.5 3 33 3 22Z" fill="${a}" stroke="${G_INK}" stroke-width=".8"/>
    <path d="M20 2V44" stroke="${b}" stroke-width="6" opacity=".55"/>
    <path d="M0 18h40v9.5H0z" fill="#F4F1E7" stroke="${G_INK}" stroke-width=".7"/>
    <text x="20" y="25.6" text-anchor="middle" font-size="8.4" font-weight="800" font-family="Archivo, system-ui" fill="${G_INK}" letter-spacing=".5">${_esc(ini)}</text></svg>`;
}

/* the little engravings, one per kind of answer */
function topicGlyph(topic, text, era) {
  const t = String(text).trim(), f = _fold(t).trim(), h = _hh(t), dye = G_DYES[h % G_DYES.length];
  let m;
  switch (topic) {
    case 'year': {
      m = f.match(/^(-?\d{1,4})(\s*a\.?\s?c\.?)?$/);
      const y = m ? m[1].replace('-', '') : t, bc = m && (m[2] || m[1].startsWith('-'));
      return _disc(`<circle cx="20" cy="20" r="14.5" fill="#E2C67E" stroke="${G_INK}" stroke-width=".7"/>
        <circle cx="20" cy="20" r="12.2" fill="none" stroke="${G_INK}" stroke-width=".4" stroke-dasharray="1 1.2"/>
        <text x="20" y="${bc ? 21 : 24}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="${y.length > 3 ? 10.5 : 12.5}" fill="${G_INK}">${_esc(y)}</text>
        ${bc ? `<text x="20" y="28.6" text-anchor="middle" font-family="Archivo Narrow, sans-serif" font-weight="700" font-size="5.2" fill="${G_INK}" letter-spacing=".5">A.C.</text>` : ''}`);
    }
    case 'century': {
      m = f.match(ROMAN_RX);
      const r = m ? m[3].toUpperCase() : t, bc = m && m[4];
      return _disc(`<path d="M20 4.5c3 0 4 2.4 6.6 3 2.6.6 5-.6 6.6 1.6 1.6 2.2.2 4.4 1 7 .8 2.6 3 4 2.4 6.6-.6 2.6-3.2 3-4.4 5.4-1.2 2.4-.4 5-2.6 6.4-2.2 1.4-4.4-.2-7 .2-2.6.4-4 2.4-6.6 1.8-2.6-.6-3-3.2-5.4-4.4-2.4-1.2-5-.4-6.4-2.6-1.4-2.2.2-4.4-.2-7C2.6 21 .6 19.6 1.2 17c.6-2.6 3.2-3 4.4-5.4 1.2-2.4.4-5 2.6-6.4 2.2-1.4 4.4.2 7-.2 2.6-.4 2.2-.5 4.8-.5Z" fill="#8E2A2A" transform="translate(1.6 1.4) scale(.92)"/>
        <circle cx="20" cy="20" r="11.6" fill="none" stroke="#5E1616" stroke-width="1"/>
        <text x="20" y="16.4" text-anchor="middle" font-family="Archivo Narrow, sans-serif" font-weight="700" font-size="5" fill="#F3D9B8" letter-spacing=".6">SÉC.</text>
        <text x="20" y="${bc ? 25 : 27}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="${r.length > 4 ? 8.6 : 11}" fill="#F7E6CC">${_esc(r)}</text>
        ${bc ? `<text x="20" y="31" text-anchor="middle" font-family="Archivo Narrow, sans-serif" font-weight="700" font-size="4.6" fill="#F3D9B8">A.C.</text>` : ''}`, '#5E1616');
    }
    case 'number': {
      const n = (f.match(/^[\d.,]+/) || [t])[0];
      return _disc(`<circle cx="20" cy="20" r="15" fill="none" stroke="${G_GOLD}" stroke-width="1.6"/><circle cx="20" cy="20" r="12.4" fill="none" stroke="${G_GOLD}" stroke-width=".5" stroke-dasharray="1 1.4"/>
        <text x="20" y="24.5" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="${n.length > 4 ? 9 : n.length > 2 ? 11.5 : 15}" fill="${G_INK}">${_esc(n)}</text>`);
    }
    case 'person': return bustGlyph(t, era);
    case 'people': return _disc(`${[[12, 8], [28, 8], [20, 3]].map(([x, s], i) => `<g transform="translate(${x - 20} ${s - 3})">
        <ellipse cx="20" cy="17" rx="4.4" ry="5.2" fill="${['#C9A07E', '#9A7458', '#B88C68'][(h + i) % 3]}"/>
        <path d="M11.5 36c.6-7 3.8-11 8.5-11s7.9 4 8.5 11Z" fill="${G_DYES[(h + i * 2) % G_DYES.length]}"/></g>`).join('')}`);
    case 'river': return _disc(`<path d="M3 26c6-6 10 4 17-2s11-6 17 0" fill="none" stroke="#3E7CA6" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M5 31c5-4 9 2 15-1.6s10-3 15 1" fill="none" stroke="#6FA3C4" stroke-width="1.6" stroke-linecap="round"/>
        ${[11, 15, 25, 29].map((x, i) => `<path d="M${x} 22c0-5 ${i % 2 ? 1.4 : -1.4}-9 ${i % 2 ? 3 : -2} -12" fill="none" stroke="#5E6B3A" stroke-width="1.1" stroke-linecap="round"/>`).join('')}
        <ellipse cx="${10 + h % 20}" cy="14" rx="1.6" ry="3.4" fill="#8A6A3A"/>`);
    case 'sea': return _disc(`<rect x="1.5" y="22" width="37" height="16" fill="#4F7A94"/>
        <path d="M2 24q4-3 8 0t8 0 8 0 8 0 8 0" fill="none" stroke="#EAF2F4" stroke-width="1.3"/><path d="M2 30q4-3 8 0t8 0 8 0 8 0 8 0" fill="none" stroke="#9DC0D3" stroke-width="1.1"/>
        <path d="M14 22h12l-2 3h-8Z" fill="#8A5A34" stroke="${G_INK}" stroke-width=".6"/><path d="M20 9v13M21 10q6 4 5 11h-5ZM19 12q-4 3-4 9h4Z" fill="#F5EFE0" stroke="${G_INK}" stroke-width=".6"/>`);
    case 'mount': return _disc(`<path d="M2 32 14 13l7 10 5-7 12 16Z" fill="#8C8A7A" stroke="${G_INK}" stroke-width=".8" stroke-linejoin="round"/>
        <path d="M14 13 10.4 18.6l2.4-1 1.6 2 1.6-2.2ZM26 16l-2.6 3.6 1.6-.4 1 1.4 1.2-1.6Z" fill="#F7F3EA"/><path d="M2 32h36v4H2Z" fill="#6E8C5A"/>`);
    case 'island': return _disc(`<rect x="1.5" y="24" width="37" height="14" fill="#4F7A94"/><path d="M8 26c2-5 8-7 12-7s10 2 12 7Z" fill="#D9B16B" stroke="${G_INK}" stroke-width=".7"/>
        <path d="M21 20c0-5 1-8 3-10M24 10c-3-1-6 0-7 2M24 10c3-1 6 1 6 3M24 10c-1-2-4-3-6-2" fill="none" stroke="#4E6B2E" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M2 30q4-2 8 0t8 0 8 0 8 0 8 0" fill="none" stroke="#EAF2F4" stroke-width="1"/>`);
    case 'script': return _disc(`<rect x="10" y="7" width="20" height="26" rx="3" fill="#C9A66B" stroke="${G_INK}" stroke-width=".8"/>
        ${[11, 16, 21, 26].map((y, r) => Array.from({ length: 4 }, (_, i) => {
          const x = 13 + i * 4.2, k = (h >> (r * 4 + i)) & 3;
          return k === 0 ? `<path d="M${x} ${y}l2 1.4-2 1.4" fill="none" stroke="${G_INK}" stroke-width=".9"/>`
               : k === 1 ? `<path d="M${x} ${y}h2.6M${x + 1.3} ${y}v2.6" stroke="${G_INK}" stroke-width=".9"/>`
               : k === 2 ? `<circle cx="${x + 1.2}" cy="${y + 1.2}" r="1.1" fill="none" stroke="${G_INK}" stroke-width=".8"/>`
               : `<path d="M${x} ${y + 2.4}l1.3-2.4 1.3 2.4" fill="none" stroke="${G_INK}" stroke-width=".9"/>`; }).join('')).join('')}`);
    case 'battle': return _disc(`<g stroke="${G_INK}" stroke-width=".7" stroke-linejoin="round">
        <path d="M8 31 27 9l2.4 1.4L11 33Z" fill="#D9DCE0"/><path d="M32 31 13 9l-2.4 1.4L29 33Z" fill="#C9CDD2"/>
        <path d="M7.4 28.6l4 4M32.6 28.6l-4 4" stroke="${G_GOLD}" stroke-width="2.6"/></g>
        <path d="M14 34h12l-1.6 3h-8.8Z" fill="${dye}"/>`);
    case 'treaty': return _disc(`<path d="M11 8h17a3 3 0 0 1 3 3v19H14a3 3 0 0 1-3-3Z" fill="#F4ECD8" stroke="${G_INK}" stroke-width=".8"/>
        <path d="M14 13h13M14 16.6h13M14 20.2h10" stroke="${G_INK}" stroke-width=".7" opacity=".55"/>
        <path d="M11 27a3 3 0 0 0 3 3h3" fill="none" stroke="${G_INK}" stroke-width=".8"/>
        <circle cx="27" cy="28" r="5" fill="#8E2A2A"/><circle cx="27" cy="28" r="3.2" fill="none" stroke="#5E1616" stroke-width=".7"/>
        <path d="M25 32.6l-1.4 4.4 2.8-1.6M29 32.6l1.4 4.4-2.8-1.6" fill="${dye}"/>`);
    case 'book': return _disc(`<path d="M20 12q-6-3.6-13-1v18q7-2.6 13 1Z" fill="#F4ECD8" stroke="${G_INK}" stroke-width=".8"/>
        <path d="M20 12q6-3.6 13-1v18q-7-2.6-13 1Z" fill="#F4ECD8" stroke="${G_INK}" stroke-width=".8"/>
        <path d="M10 15q4-1 8 .6M10 19q4-1 8 .6M22 15.6q4-1.6 8-.6M22 19.6q4-1.6 8-.6" fill="none" stroke="${G_INK}" stroke-width=".5" opacity=".6"/>
        <path d="M20 30v5" stroke="${dye}" stroke-width="2.2"/>`);
    case 'art': return _disc(`<rect x="8" y="9" width="24" height="20" fill="${G_GOLD}" stroke="${G_INK}" stroke-width=".8"/>
        <rect x="11" y="12" width="18" height="14" fill="#BFD3D9"/><path d="M11 26l5-6 4 4 3-3 6 5Z" fill="${dye}"/><circle cx="25" cy="15.6" r="2" fill="#E9C46A"/>
        <path d="M17 29l-2 6M23 29l2 6" stroke="${G_INK}" stroke-width="1.2"/>`);
    case 'music': return _disc(`<path d="M13 32c-3-6-3-16 1-22h12c4 6 4 16 1 22Z" fill="none" stroke="${G_GOLD}" stroke-width="2.2" stroke-linejoin="round"/>
        <path d="M13 32h14M14 10h12" stroke="${G_INK}" stroke-width="1.2"/>${[16, 18.6, 21.4, 24].map(x => `<path d="M${x} 11v20" stroke="${G_INK}" stroke-width=".55"/>`).join('')}`);
    case 'temple': return _disc(`<path d="M7 15 20 7l13 8Z" fill="#EFE3C8" stroke="${G_INK}" stroke-width=".8" stroke-linejoin="round"/>
        <rect x="8" y="15" width="24" height="2.6" fill="#D9C9A4" stroke="${G_INK}" stroke-width=".6"/>
        ${[10.5, 16, 21.4, 26.8].map(x => `<rect x="${x}" y="17.6" width="2.8" height="11" fill="#F4ECD8" stroke="${G_INK}" stroke-width=".5"/>`).join('')}
        <rect x="6.5" y="28.6" width="27" height="3" fill="#D9C9A4" stroke="${G_INK}" stroke-width=".6"/><circle cx="20" cy="11.6" r="1.4" fill="${dye}"/>`);
    case 'build': return _disc(`<path d="M5 33h30" stroke="${G_INK}" stroke-width="1"/>
        <path d="M8 33V18h3v-2.6h3V18h3v-2.6h3V18h3v-2.6h3V18h3v-2.6h3V18h0v15Z" fill="#C9BFA8" stroke="${G_INK}" stroke-width=".7"/>
        <path d="M17 33v-6a3 3 0 0 1 6 0v6Z" fill="#4A3523"/><path d="M20 15V7l5 2-5 2" fill="${dye}" stroke="${G_INK}" stroke-width=".5"/>`);
    case 'invent': return _disc(`<g transform="translate(14 17)">${Array.from({ length: 8 }, (_, i) => `<rect x="-1.6" y="-10" width="3.2" height="4" fill="${G_GOLD}" transform="rotate(${i * 45})"/>`).join('')}
        <circle r="7" fill="${G_GOLD}" stroke="${G_INK}" stroke-width=".7"/><circle r="2.6" fill="${G_PAPER}" stroke="${G_INK}" stroke-width=".6"/></g>
        <path d="M24 14h6M25.4 14v6l-4 10a2 2 0 0 0 2 2.6h7.2a2 2 0 0 0 2-2.6l-4-10v-6" fill="#DCEAF0" stroke="${G_INK}" stroke-width=".8" stroke-linejoin="round"/>
        <path d="M22.4 28.4h11.2l1 2.4a1.4 1.4 0 0 1-1.4 1.8h-9.4a1.4 1.4 0 0 1-1.4-1.8Z" fill="${dye}"/>`);
    case 'ship': return _disc(`<path d="M7 25h26q-3 6-9 7h-8q-6-1-9-7Z" fill="#8A5A34" stroke="${G_INK}" stroke-width=".8"/>
        <path d="M20 7v18M21 8q8 4 8 15h-8ZM19 11q-6 3-7 12h7Z" fill="#F5EFE0" stroke="${G_INK}" stroke-width=".7"/>
        <path d="M24 13v6M21 16h6" stroke="${dye}" stroke-width="1.6"/><path d="M4 34q4-2 8 0t8 0 8 0 8 0" fill="none" stroke="#4F7A94" stroke-width="1.4"/>`);
    case 'coin': return _disc(`<circle cx="16" cy="22" r="9" fill="#E2C67E" stroke="${G_INK}" stroke-width=".8"/><circle cx="16" cy="22" r="6.6" fill="none" stroke="${G_INK}" stroke-width=".5"/>
        <circle cx="25" cy="16" r="9" fill="#D8B45E" stroke="${G_INK}" stroke-width=".8"/><circle cx="25" cy="16" r="6.6" fill="none" stroke="${G_INK}" stroke-width=".5"/>
        <path d="M22 18c1-4 4.6-5 6.6-2.6M23 14.2h1.4" fill="none" stroke="${G_INK}" stroke-width=".8"/>`);
    case 'city': return _disc(`<path d="M4 31V20h4v-4h3v15M12 31V13l4-4 4 4v18M21 31V18a4 4 0 0 1 8 0v13M30 31V16h3v-3h3v18" fill="#D6CCB5" stroke="${G_INK}" stroke-width=".7" stroke-linejoin="round"/>
        <path d="M3 31h34" stroke="${G_INK}" stroke-width="1"/><path d="M25 14v-4" stroke="${G_INK}" stroke-width=".7"/>
        <path d="M20 4c-3 0-5 2.2-5 5 0 4 5 9 5 9s5-5 5-9c0-2.8-2-5-5-5Z" fill="${dye}" stroke="${G_INK}" stroke-width=".6"/><circle cx="20" cy="9" r="1.8" fill="${G_PAPER}"/>`);
    case 'idea': return _disc(`<path d="M17 21h6l-1 13h-4Z" fill="#8A5A34" stroke="${G_INK}" stroke-width=".7"/><path d="M15.6 19h8.8v2.6h-8.8Z" fill="${G_GOLD}" stroke="${G_INK}" stroke-width=".6"/>
        <path d="M20 5c4 4 5.6 7.6 3.4 11.4-1 1.8-2.4 2.6-3.4 2.6s-2.4-.8-3.4-2.6C14.4 12.6 16 9 20 5Z" fill="#E9893A"/><path d="M20 10c2 2 2.6 4 1.4 6-.4.8-.9 1.2-1.4 1.2s-1-.4-1.4-1.2c-1.2-2-.6-4 1.4-6Z" fill="#F4D35E"/>`);
    case 'title': return _disc(`<path d="M10 9h20v20l-10-6-10 6Z" fill="${dye}" stroke="${G_INK}" stroke-width=".7" stroke-linejoin="round"/>
        <text x="20" y="21" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="14" fill="${G_PAPER}">“</text>`);
    case 'date': {
      m = f.match(/^(\d{1,2})(?:º|o)? de ([a-z]+)(?: de (\d{1,4}))?/) || f.match(/^()([a-z]+)(?: de (\d{1,4}))?$/) || [];
      const MES = { janeiro:'JAN', fevereiro:'FEV', marco:'MAR', abril:'ABR', maio:'MAI', junho:'JUN', julho:'JUL', agosto:'AGO', setembro:'SET', outubro:'OUT', novembro:'NOV', dezembro:'DEZ' };
      const d = m[1] || '', mo = MES[m[2]] || (m[2] || '').slice(0, 3).toUpperCase(), y = m[3] || '';
      return _disc(`<rect x="8" y="7" width="24" height="27" rx="2.4" fill="#F7F1E2" stroke="${G_INK}" stroke-width=".8"/>
        <rect x="8" y="7" width="24" height="7.6" rx="2.4" fill="${dye}"/><rect x="8" y="11.6" width="24" height="3" fill="${dye}"/>
        <circle cx="13.6" cy="7" r="1.3" fill="${G_INK}"/><circle cx="26.4" cy="7" r="1.3" fill="${G_INK}"/>
        <text x="20" y="13.2" text-anchor="middle" font-family="Archivo Narrow, sans-serif" font-weight="700" font-size="5.4" fill="#F6EBD8" letter-spacing=".5">${_esc(mo)}</text>
        <text x="20" y="${y ? 25 : 28}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="${d ? 11.5 : 9}" fill="${G_INK}">${_esc(d || mo)}</text>
        ${y ? `<text x="20" y="31.6" text-anchor="middle" font-family="Archivo Narrow, sans-serif" font-weight="700" font-size="5.4" fill="${G_INK}" opacity=".7">${_esc(y)}</text>` : ''}`);
    }
    case 'road': return _disc(`<path d="M2 34 15 10h10l13 24Z" fill="#B9A27A"/><path d="M15 10h10l13 24H2Z" fill="none" stroke="${G_INK}" stroke-width=".7"/>
        <path d="M20 12v3M20 18v4M20 25v5" stroke="#F4ECD8" stroke-width="1.6"/>
        ${[[9, 22], [31, 22], [6, 29], [34, 29]].map(([x, y]) => `<rect x="${x - 1.2}" y="${y - 3}" width="2.4" height="4" rx="1" fill="#E9E0CC" stroke="${G_INK}" stroke-width=".5"/>`).join('')}
        <path d="M2 10h13" stroke="#6E8C5A" stroke-width="5" opacity=".6"/><path d="M25 10h13" stroke="#6E8C5A" stroke-width="5" opacity=".6"/>`);
    case 'land': return _disc(`<rect x="1.5" y="1.5" width="37" height="37" rx="18.5" fill="#CFE0E6"/>
        <path d="M1 27c8-8 13-2 19-6s12-6 19 0v18H1Z" fill="#A6B87A"/><path d="M1 31c10-5 16 0 22-3s11-3 16 1v10H1Z" fill="#7E9A55"/>
        <path d="M18 39c1-6 3-10 7-14" fill="none" stroke="#D9C9A4" stroke-width="2"/><circle cx="${12 + h % 16}" cy="11" r="3.4" fill="#E9C46A"/>`);
    case 'plague': return _disc(`<path d="M12 33c0-9 3-14 8-14s8 5 8 14Z" fill="#2A2522"/>
        <path d="M14 15a6 6 0 0 1 12 0v3H14Z" fill="#2A2522"/><path d="M11 15h18" stroke="#2A2522" stroke-width="2"/>
        <path d="M17.6 19.4 26 25l-7-1.6Z" fill="#D9CBA6" stroke="${G_INK}" stroke-width=".6"/><circle cx="18.4" cy="18.6" r="1.4" fill="${dye}"/>`);
    case 'crop': return _disc(`${[14, 20, 26].map((x, i) => `<path d="M${x} 34c0-8 ${i - 1}-14 ${i - 1 + 0} -20" fill="none" stroke="#6E7A3A" stroke-width="1.4"/>
        ${[0, 1, 2, 3].map(k => `<ellipse cx="${x + (i - 1) * (k / 4) + (k % 2 ? 1.8 : -1.8)}" cy="${16 + k * 3.6}" rx="1.4" ry="2.6" fill="#C9A04E" transform="rotate(${k % 2 ? 30 : -30} ${x + (k % 2 ? 1.8 : -1.8)} ${16 + k * 3.6})"/>`).join('')}`).join('')}
        <path d="M12 30h16" stroke="${dye}" stroke-width="2.4"/>`);
    case 'weapon': return _disc(`<path d="M6 30h20l4-4H10Z" fill="#6E4A2A" stroke="${G_INK}" stroke-width=".7"/>
        <path d="M14 26l14-9 3 3-14 9Z" fill="#4A4A52" stroke="${G_INK}" stroke-width=".7"/><circle cx="13" cy="30" r="4.4" fill="#8A5A34" stroke="${G_INK}" stroke-width=".7"/>
        <circle cx="13" cy="30" r="1.2" fill="${G_INK}"/><circle cx="33" cy="13" r="2.6" fill="${G_INK}"/><circle cx="31" cy="9" r="1.6" fill="#8C8A7A" opacity=".7"/>`);
    case 'flag': {
      const w = String(t).split(/[\s-]+/).filter(x => x && !/^(de|da|do|dos|das|e)$/i.test(x));
      const ini = ((w[0] || '?')[0] + (w.length > 1 ? w[w.length - 1][0] : '')).toUpperCase();
      return _disc(`<path d="M11 7v28" stroke="${G_INK}" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M12 8c6-2 9 2 15 0v14c-6 2-9-2-15 0Z" fill="${dye}" stroke="${G_INK}" stroke-width=".6"/>
        <text x="19.6" y="18.6" text-anchor="middle" font-family="Archivo, system-ui" font-weight="800" font-size="6.4" fill="${G_PAPER}">${_esc(ini)}</text>`);
    }
    case 'club': return shieldGlyph(t);
  }
  /* nothing more specific: a compass rose, the mark of every old map */
  return _disc(`<g transform="translate(20 20)"><circle r="12" fill="none" stroke="${G_GOLD}" stroke-width=".6"/>
    ${[0, 90, 180, 270].map(a => `<path d="M0-13 3 0 0 3-3 0Z" fill="${a === 0 ? dye : G_INK}" transform="rotate(${a})"/>`).join('')}
    ${[45, 135, 225, 315].map(a => `<path d="M0-8 1.6 0 0 1.6-1.6 0Z" fill="${G_GOLD}" transform="rotate(${a})"/>`).join('')}
    <circle r="1.6" fill="${G_PAPER}" stroke="${G_INK}" stroke-width=".5"/></g>`);
}

const _optMemo = new WeakMap();
function optArtFor(q) {
  if (!q || q.type !== 'txt' || !q.choices) return null;
  if (_optMemo.has(q)) return _optMemo.get(q);
  /* fato ou mito: the two slips are the two rubber stamps */
  if (q.myth) {
    const out = { _kind: 'stamp' };
    q.choices.forEach(c => { out[c] = { k: 'stamp', kind: /^fato$/i.test(c) ? 'fato' : 'mito' }; });
    _optMemo.set(q, out);
    return out;
  }
  const res = q.choices.map(optResolve);
  const t = _fold(q.t || '');
  const looks = OPT_LOOKS.test(t);
  /* a question that asks for a person wants people: "Constantino" is the
     emperor here, not a polity with that word in it */
  const asksPerson = /^quem\b|\bquem (foi|era)\b/.test(t);
  if (asksPerson) res.forEach((r, i) => { if (r && r.k !== 'face') res[i] = null; });
  const count = {};
  res.forEach(r => { if (r) count[r.k] = (count[r.k] || 0) + 1; });
  const kind = Object.keys(count).sort((a, b) => count[b] - count[a])[0];
  const n = q.choices.length;
  /* the question's own picture, printed again on one tile, would point at it */
  const clash = res.some((r, i) => r && t.indexOf(_fold(q.choices[i])) !== -1) ||
    res.some(r => r && ((r.k === 'face' && (r.id === q.who || r.img === q.face)) || (r.k === 'club' && r.id === q.crest) ||
                        (r.k === 'ctry' && r.iso.includes(q.flag)) || (r.k === 'stad' && r.id === q.stad)));
  let out = {};
  if (kind && count[kind] >= Math.min(n, Math.max(4, n - 2)) && !clash && !(looks && kind !== 'face')) {
    q.choices.forEach((c, i) => { out[c] = res[i] && res[i].k === kind ? res[i] : { k: kind, blank: true, n: c }; });
    out._kind = kind;
  } else {
    const era = optEra(q);
    const tops = q.choices.map(c => optTopic(c, t));
    /* every slip is drawn as the kind most of the board is: a river among
       five battles would be the answer printed in pictures */
    const tally = {}; tops.forEach(x => { if (x) tally[x] = (tally[x] || 0) + 1; });
    const major = Object.keys(tally).sort((a, b) => tally[b] - tally[a])[0] || (kind === 'club' ? 'club' : '');
    q.choices.forEach((c, i) => {
      const r = res[i];
      /* a known face among drawn busts says nothing about which is right */
      out[c] = r && r.k === 'face' && !looks && !clash && (major === 'person' || asksPerson) ? r
             : { k: 'glyph', n: c, topic: major || tops[i] || (r && r.k === 'club' ? 'club' : ''), era };
    });
    out._kind = 'glyph';
  }
  _optMemo.set(q, out);
  return out;
}
function optArtHtml(r) {
  if (!r) return '';
  if (r.k === 'stamp') return `<span class="opt-art opt-stamp">${stampSVG(r.kind)}</span>`;
  if (r.k === 'club') return r.blank
    ? `<span class="opt-art opt-crest opt-ink">${shieldGlyph(r.n)}</span>`
    : `<span class="opt-art opt-crest">${clubArt(r.id, 'width:100%;height:100%;', false)}</span>`;
  if (r.k === 'ctry') return r.blank
    ? `<span class="opt-art opt-face opt-ink opt-glyph">${topicGlyph('flag', r.n)}</span>`
    : `<span class="opt-art opt-flags">${r.iso.map(c =>
      `<svg class="opt-flag" viewBox="0 0 9 6" preserveAspectRatio="none" aria-hidden="true">${FLAGS[c] || ''}</svg>`).join('')}</span>`;
  if (r.k === 'face') return r.blank
    ? `<span class="opt-art opt-face opt-ink">${bustGlyph(r.n, 'new')}</span>`
    : `<span class="opt-art opt-face"><img src="${r.img}" alt="" aria-hidden="true"
        onerror="this.style.visibility='hidden'" /></span>`;
  if (r.k === 'stad') return r.blank
    ? `<span class="opt-art opt-face opt-ink opt-glyph">${topicGlyph('build', r.n)}</span>`
    : `<span class="opt-art opt-face"><img src="${r.img}" alt="" aria-hidden="true" style="object-position:50% 50%"
        onerror="this.style.visibility='hidden'" /></span>`;
  if (r.k === 'glyph') return r.topic === 'club'
    ? `<span class="opt-art opt-crest opt-ink">${shieldGlyph(r.n)}</span>`
    : `<span class="opt-art opt-face opt-ink opt-glyph">${r.topic === 'person' ? bustGlyph(r.n, r.era) : topicGlyph(r.topic, r.n, r.era)}</span>`;
  return '';
}

/* ═══════════════════════════════════════════════════
   POCKET — one answer tile

   Ten of these make the board. Each is a pocket in the album page with
   a numbered tab in the corner, and can carry the audience vote, the
   guest's pick, or the lock-in dimming, depending on what the player
   has spent.
═══════════════════════════════════════════════════ */
function badge(item, idx) {
  const isPlayer = 'img' in item;
  const isSel   = sel.has(item.id);
  const live    = sc === 'quiz' || sc === 'ask' || sc === 'lock';
  const isAns   = (sc === 'reveal') && cat.qs[qi].a.includes(item.id);
  const isWrong = (sc === 'reveal') && isSel && !isAns;
  const curQ    = (cat && cat.qs && cat.qs[qi]) || {};
  const delay   = `animation-delay:${Math.min(9, idx || 0) * 28}ms;`;

  if (hidden.has(item.id) && live) {
    return `<div class="b-gone" style="${delay}${isTextQ(curQ) ? 'min-height:44px' : 'aspect-ratio:1/1.22'}"></div>`;
  }

  let cls = 'b';
  if (sc === 'reveal') {
    if (isAns)        cls += ' b-correct';
    else if (isWrong) cls += ' b-wrong';
  } else if (sc === 'ask' || sc === 'lock') {
    cls += isSel ? ' b-locked' : ' b-faded';       // the board holds its breath
  } else if (isSel) {
    cls += ' b-sel';
  } else if (expert && expert.id === item.id) {
    cls += ' expert-ring';
  }

  /* ── a card to be placed in order: its number is the place you gave it ── */
  if (curQ.order) {
    const at = [...sel].indexOf(item.id);
    let oc = 'b b-ord' + (at >= 0 ? ' b-ord-on' : '');
    if (sc === 'reveal') oc += curQ.a[at] === item.id ? ' b-correct' : ' b-wrong';
    return `<div class="${oc}" data-id="${item.id}" style="${delay}">
      <span class="ord-n">${at >= 0 ? at + 1 : ''}</span>
      ${item.crest ? `<span class="ord-art crest-box">${clubArt(item.crest, '', false)}</span>`
        : item.face && PL.find(p => p.id === item.face) ? `<span class="ord-art ord-face"><img src="${PL.find(p => p.id === item.face).img}" alt="" aria-hidden="true" /></span>`
        : item.flag ? `<span class="ord-art ord-flag"><svg viewBox="0 0 9 6" preserveAspectRatio="none" aria-hidden="true">${FLAGS[item.flag] || ''}</svg></span>`
        : `<span class="ord-art ord-photo">${ART.hourglass(60)}</span>`}
      <span class="ord-t">${item.label}${item.sub ? `<em>${item.sub}</em>` : ''}</span>
      ${sc === 'reveal' ? `<span class="ord-y num">${yearTxt(item.y)}</span>` : ''}
    </div>`;
  }

  const tab = `<span class="tab">${NUM(idx)}</span>`;
  const votePct = poll && poll[item.id] !== undefined ? poll[item.id] : null;
  if (votePct !== null) {
    cls += ' b-voted';
    if (poll && votePct === Math.max(...Object.values(poll))) cls += ' b-top-vote';
  }
  const voteEl  = votePct === null ? '' :
    `<span class="vote-pct">${votePct}%</span>
     <span class="vote"><i style="width:${votePct}%;animation-delay:${(idx || 0) * 45}ms;"></i></span>`;
  const longCls = item.n.length > 15 ? ' tile-name-long' : '';

  if (isTextQ(curQ)) {
    const oa = optArtFor(curQ), art = oa ? optArtHtml(oa[item.id]) : '';
    return `<div class="${cls} b-text${art ? ' b-art' : ''}${curQ.myth ? ' b-myth' : ''}" data-id="${item.id}" style="${delay}">
      ${tab}${voteEl}${art}<span class="tile-name${longCls}">${item.n}</span></div>`;
  }

  if (isPlayer) {
    return `<div class="${cls} b-fig" data-id="${item.id}" style="${delay}">
      ${tab}${voteEl}
      ${figurinha(item, 'sm', { decorative: true, sub: '', noFlag: curQ._noFlag,
                                hideCtry: curQ._hideCtry, hideEra: curQ._hideEra })}
    </div>`;
  }

  // ── Polity pocket ──
  return `<div class="${cls} b-crest" data-id="${item.id}" style="${delay}">
    ${tab}${voteEl}
    <div class="crest-box">${clubArt(item.id, '', false)}</div>
    <span class="tile-name tile-club${longCls}">${item.n}</span>
  </div>`;
}

/* ═══════════════════════════════════════════════════
   THE PICTURE ON A QUESTION CARD
   Every question carries one: a figure's face, a polity's emblem, a flag, a
   monument, or the drawn vignette of its subject. None of them may be the
   answer — merge_questions.py refuses a row that does that, and the
   generated ones are checked here.
═══════════════════════════════════════════════════ */
function _answerIsFace(q, id) { return (q.a || []).includes(id); }
function _answerNames(q, name) {
  const F = _fold, n = F(name || '');
  return !!n && (q.a || []).some(a => F(a) === n || F((optResolve(a) || {}).id || '') === F(name));
}
function faceHtml(img) {
  return `<div class="qart qart-face print"><img src="${img}" alt="" aria-hidden="true"
        onerror="this.parentElement.style.display='none'" /></div>`;
}
/* ── A continent on an old atlas page ──
   "Qual destes estados surgiu na Ásia?" shows the world with that continent
   inked in. The coastlines are Natural Earth's (public domain, 1:110m),
   simplified and projected equirectangular, 78°N to 56°S, centred on 10°E
   (200 × 74.4); `regions` are the rough lands of each continent (the
   Urals, the Caucasus, Suez and the Red Sea as borders) used as clips, and
   `views` the inset each one is shown in. Regenerate with
   tools/history/mapgen.mjs. */
const REGION_MAP = {"W":200,"H":74.4,"land":"M194.4,52.5L194.1,52.7L194.1,52.4L194.4,52.3ZM122.3,50.9L122.5,51.8L120.6,57.2L118.9,57.2L118.5,55.6L119.1,52.3ZM174.2,51L175.8,53.9L179.4,57.4L179.4,60.9L177.8,64.1L175.7,65L172.6,64.5L167.4,60.8L164.5,61.2L163.1,62.2L160,62.8L158.3,62.3L158.8,61.2L157.4,56.9L157.9,55.4L161.6,54.3L162.8,52.4L165,51L165.8,51.6L168,49.5L170.5,50.2L169.7,51.5L172.7,53L173.6,49.3ZM169,44L169.7,45.2L171.3,44.3L174.8,45.5L177.1,48.4L174.9,47.6L173.7,48.5L171.5,47.4L171.1,46.3L167,43.9ZM153.2,46.6L151.4,45.7L149.2,42.3L147.4,40.6L148.6,40.4L152.1,43.3L153.4,45ZM159.9,42.3L159,45.6L155.7,45L155.1,43.6L159.5,39.5L160.7,40.3ZM92.8,10.8L94.7,13.9L94.7,15.1L91.2,15.5L92.4,13L91,11.8ZM121.7,20.4L121.8,22.5L124.3,22.8L123.8,20.6L124.9,20.6L122.4,18.6L123.9,18.2L122.9,17.2L120.4,18.6ZM0,6.7L0.1,6.7L0,6.7L0,6.7ZM200,6.7L197.8,7.6L194.4,7.2L194.4,7.2L194.1,8.3L189.1,10.1L185.3,10.1L184.5,12.9L181.6,15L180.8,12.6L185.4,9.4L181.5,9.2L180.1,10.1L173.4,10.5L169.5,12.9L173,13.8L172.3,16.4L169.4,19.2L167.9,19.3L165.3,21.2L166.4,22.9L164.7,24.2L163.5,21.2L162,20.6L159.7,21.8L161.7,23L160.6,23.9L162.3,26.8L160.4,29.7L158.8,30.7L154.7,31.3L153.1,32.7L154.9,34.8L155.1,36.9L152.8,37.8L150.1,35.9L149.5,37.8L151.9,40.6L152,42.7L150.8,41.8L149,38.7L149.3,37L148.4,33.9L146.8,34.4L146.8,33.2L145.2,30.7L142.8,31.4L139.1,34.5L138.8,37.6L137.5,38.9L135.3,34.4L134.8,31.5L133.6,31.7L131.3,29.2L128.6,29.4L123.1,27.9L121.1,26.7L123.2,30L125.8,29.5L127.7,30.9L126.5,32.7L121.5,35.6L118.6,36.3L118.1,34L114,27.7L112.6,27.4L114.9,31.1L116.3,34.5L119,37.5L122.8,36.7L121.9,39.6L120.3,41.7L116.8,44.8L116,46.9L117.1,51.5L113.8,54.3L113.9,56.9L110.1,61.5L105.3,62.7L102.9,58.4L102.4,55.6L100.9,52.6L102,50L101.1,46.1L99.3,44L99.9,41.6L96.8,39.8L93.4,40.7L90.3,40.9L87.3,39L85.2,36.6L85,31.7L86.4,28.7L89.1,26.7L89.6,24.9L91.1,23.5L93.2,23.8L95.3,23L99.7,22.6L100.6,24.8L105,26.5L106,25.2L110.5,26.2L113.5,26L114.5,23.4L109.8,23L109,21.4L110.7,20.4L114,20L115.7,20.6L117.5,19.6L114.8,18.2L116.2,17.1L113.1,17.9L111.5,17.5L109.8,19.7L110.4,20.5L107.1,20.8L107.8,22.1L106.5,22.9L105.3,20.2L101.7,17.9L101.4,18.8L104.7,20.9L103.4,22.2L103,21.1L99.4,18.7L96.2,19.4L93.3,23L89.5,22.9L89.2,19.4L93.4,19.2L93.8,17.8L91.9,16.3L93.5,16.3L99.3,13.3L99.2,11.6L100.5,13.3L102.3,13.5L106.3,12.7L107.4,10.5L106.1,8.6L108.6,7.2L106.8,6.8L104.4,8.5L104.9,10L103.3,12.2L101.6,12.6L100.2,10.3L97.6,10.8L97.2,8.9L100.3,7.5L102.6,5.7L105.1,4.5L110.1,3.8L111.1,4.3L116.8,5.6L115.8,6.7L113.3,6.2L113.9,7.5L124.3,5.1L128.1,4.5L132.5,5.5L131.5,3.9L133.3,2.8L135.4,5.3L135.1,3.6L138.7,3.2L139.2,2.4L142.7,2.3L142.9,1.6L150.4,0.9L151.1,0.4L156.2,0.7L157.7,1.5L155.2,2.1L162.9,2.8L165.9,2.8L167.9,3.4L172.2,3.6L172.5,2.9L177.5,3.2L179.4,4L182.8,4L183.9,4.8L189.1,4.4L193.7,4.8L194.4,5L194.4,5L200,6.7L200,6.7ZM194.4,3.6L194.4,4L193.7,3.8ZM44.1,4.7L45.9,6L46.9,4.5L49.3,4.9L49.2,6L46.8,6.4L42.1,9.5L43.2,11.6L48.7,12.7L49.2,14.4L50.8,14.1L50.1,13L51.9,11.9L50.8,10.7L51.1,8.7L53.4,8.6L55.8,9.4L56.9,11L58.6,9.8L60.1,12L62.6,13L63.5,14.4L61.1,15.4L57.6,15.4L58.6,17.6L61.2,17.8L58.1,19.1L55.5,19.1L55.6,20.2L54,20.4L52.4,22.3L52.4,23.6L49.2,26.3L50,28.4L49.3,29.3L47.9,26.7L41.8,27L40.4,28.1L40.1,30.9L42,33.3L46.1,31.4L45,34.5L48.3,35L47.9,37L49.2,38.5L51.8,38.5L54.6,36.4L54.8,37.2L60.1,37.4L59.8,37.8L62.7,40L65.1,40.3L67.4,43.5L72.2,44.9L74.9,46.4L74.9,48.3L72.8,51L72.4,54.2L71.1,56.1L68.6,56.7L67.3,59.3L63.9,62.8L61.9,62.5L62.9,63.8L59.8,64.9L59.2,67L56.9,69.1L58,69.6L56,71.5L56.6,72.4L55,73.2L52.8,72.4L52.4,69.2L54.8,61.3L55.5,55.2L55.3,53.5L52.2,51.5L49.2,46L49.9,42.9L51.6,41.2L50.5,38.3L50,39.1L46.8,37.7L45.7,36.2L41.8,34.3L40.8,34.6L36.9,33.2L35.5,30.7L32.1,27.2L30.7,26.6L33.7,30.4L30.9,28.3L29.3,25L27.6,24.2L25.7,21.7L25.2,16.5L20,11L12.7,9.5L9.3,10.6L6.4,12.2L2.8,13L6.8,11.4L2.2,9.2L5.1,7.3L2.8,7.5L1.1,6.8L3.1,6.3L2.6,5.5L4.5,4.3L7.5,3.7L14.7,4.4L18.6,5.1L23.3,4.2L31.2,5.3L35.5,5.1L36.5,5.5L41.8,5.5L41.6,3.4ZM31,2.7L35.9,3L38.3,4.4L31.5,5.3L28.1,3.6ZM46.4,2.7L48.7,2.4L49.6,3.3L51.2,2.9L56.2,4.2L56.2,5.2L60.1,6.2L58.9,7.2L57.4,6.5L58.3,8.5L56.2,8.7L51.2,7.1L53.4,7L53.7,5.5L50.6,4.4L45.2,4.2L44.3,3.2ZM27.5,3.7L24.5,3.4L25,2.1L30.3,2.5ZM126.4,4L123.1,3.6L125.4,1.6L132.3,0.6L128.7,1.5L125.2,3.1ZM51.9,0L49.7,1L44.7,0.8L46,0L51.9,0ZM83.5,0L83.7,2.1L81,3L82,4.4L76.8,5.5L72.3,7L70.7,8.5L70.3,9.9L67.6,9.5L64.5,6L64,3L61.9,1.4L56.4,1.1L54.3,0L83.5,0Z","regions":{"EU":"M77.8 23.3L91.3 23.4L100 22.2L100.6 22.6L106.7 24.2L108.9 23.7L109.1 21.1L110.6 20.4L117.5 20.3L117.6 19.1L120.8 19.8L121.7 17.8L123.1 17.2L127.2 15L127.8 12.8L127.8 10L130.6 5L132.2 0.6L132.2 -3.3L88.9 -3.3L88.9 2.2L80 5.8L77.8 10Z","AF":"M77.8 23.3L91.3 23.4L100 22.2L100.6 22.6L106.7 24.2L108.9 24.7L112.4 25.9L112.5 26.7L113.2 27.9L116.1 33.3L118.5 36.3L123.3 36.4L128.9 37.8L128.9 68.3L77.8 68.3Z","AS":"M108.9 23.7L109.1 21.1L110.6 20.4L117.5 20.3L117.6 19.1L120.8 19.8L121.7 17.8L123.1 17.2L127.2 15L127.8 12.8L127.8 10L130.6 5L132.2 0.6L132.2 -3.3L199.8 -3.3L199.8 40.6L172.8 40.6L172.8 50L147.2 50L128.9 37.8L123.3 36.4L118.5 36.3L116.1 33.3L113.2 27.9L112.5 26.7L112.4 25.9L113.7 25.2L114.6 23.3L108.9 23.3Z","AM":"M0.6 -3.3L80.6 -3.3L80.6 76.7L0.6 76.7Z"},"views":{"EU":[86.7,3.3,40,23.3],"AS":[107.8,0,70,50],"AF":[80,21.1,48.9,43.3],"AM":[0,1.1,78.9,74.4]}};
const REGION_NAME = { EU: 'Europa', AS: 'Ásia', AF: 'África', AM: 'Américas' };
let _mapN = 0;
function regionMapSvg(r) {
  const M = REGION_MAP, v = M.views[r];
  if (!v) return '';
  const u = 'rm' + (++_mapN).toString(36), K = M.W / 360;
  const [x, y, w, h] = [v[0] - v[2] * .1, v[1] - v[3] * .1, v[2] * 1.2, v[3] * 1.2].map(n => +n.toFixed(1));
  let grat = '';
  for (let lon = -165; lon <= 180; lon += 15) { const gx = (M.W / 2 + (lon - 10) * K).toFixed(1); grat += `M${gx} 0V${M.H}`; }
  for (let lat = -45; lat <= 75; lat += 15) { const gy = ((78 - lat) * K).toFixed(1); grat += `M0 ${gy}H${M.W}`; }
  return `<svg viewBox="${x} ${y} ${w} ${h}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <defs><clipPath id="${u}"><path d="${M.regions[r]}"/></clipPath></defs>
    <rect x="-60" y="-60" width="${M.W + 120}" height="${M.H + 120}" fill="#D9CAA2"/>
    <path d="${grat}" stroke="#7d6a45" stroke-opacity=".28" stroke-width=".14" fill="none"/>
    <path d="${M.land}" fill="#F2E8CD" stroke="#76603C" stroke-width=".2" stroke-linejoin="round"/>
    <g clip-path="url(#${u})"><path d="${M.land}" fill="#9B2B2A" stroke="#5A1515" stroke-width=".2" stroke-linejoin="round"/></g>
  </svg>`;
}

function questionArtRaw(q) {
  if (q.order) return '';   // the cards themselves are the question
  if (q.region && REGION_MAP.views[q.region])
    return `<div class="qart qart-wide print qart-ink qart-map" role="img" aria-label="Mapa: ${REGION_NAME[q.region]}">${regionMapSvg(q.region)}</div>`;
  if (q.stad) {
    return STAD_IMGS[q.stad]
      ? `<div class="qart qart-wide print"><img src="${STAD_IMGS[q.stad]}" alt="" aria-hidden="true"
          onerror="this.parentElement.outerHTML='<div class=\\'qart qart-wide qart-draw\\'>' + ART.column(104) + '</div>'" /></div>`
      : `<div class="qart qart-wide print qart-ink">${ART.column(104)}</div>`;
  }
  if (q.face) {
    const fp = PL.find(x => x.img === q.face);
    if (!fp || !_answerIsFace(q, fp.id)) return faceHtml(q.face);
  }
  if (q.who) {
    const w = PL.find(p => p.id === q.who);
    if (w && w.img && !_answerIsFace(q, w.id)) return faceHtml(w.img);
  }
  if (q.crest && !(q.a || []).includes(q.crest) && !_answerNames(q, clubName(q.crest)))
    return `<div class="qart qart-crest${q._crestIsQ ? ' qart-hero' : ''}">${
      clubArt(q.crest, 'max-width:100%;max-height:100%;object-fit:contain;', true)}</div>`;
  if (q.flag && FLAGS[q.flag] && (q._flagIsQ || !_answerNames(q, CTRY_NAME[q.flag])) &&
      (q._flagIsQ || !(q.type === 'player' && (q.a || []).some(id => (PL.find(p => p.id === id) || {}).ctry === q.flag))))
    return `<div class="qart qart-flag" role="img" aria-label="${CTRY_NAME[q.flag] || q.flag}">${qFlagInner(q.flag)}</div>`;
  if (q.path && q.path.length) {
    const shown = q.path.filter(c => CL.some(x => x.id === c)).slice(0, 4);
    if (shown.length >= 2)
      return `<div class="qart qart-path" role="img" aria-label="Estados da trajetória">
        ${shown.map((c, i) => `<span class="qp crest-box" style="animation-delay:${i * 90}ms">${
          clubArt(c, '', false)}</span>`).join('')}</div>`;
    return `<div class="qart qart-wide print qart-ink">${ART.map(104)}</div>`;
  }
  if (q.clues || /\bquem sou eu\b/i.test(q.t || ''))
    return `<div class="qart qart-wide print qart-ink" role="img" aria-label="Busto misterioso">${ART.bust(104)}</div>`;
  /* a question drawn with a generic vignette that names someone or something
     the album has a picture of shows that picture instead */
  const inf = inferArt(q);
  if (inf) return inf;
  const key = refineIcon(q, q.icon || CAT_ART[(q._cat && q._cat.id) || ''] || 'scroll');
  return `<div class="qart qart-wide print qart-ink" role="img" aria-label="Ilustração">${(QICON[key] || QICON.scroll)(104)}</div>`;
}

/* ── Every question pictures its own subject ──
   "Qual a ferramenta criada por Gutenberg?" is about Gutenberg, and the album
   has his face; "Em que país fica o Coliseu?" has its photograph. Names are
   matched whole (or by a part that belongs to one figure only, never a title
   like "imperador" or "rainha"), longest first, and never when the picture
   would be the answer or one of the choices. */
const ART_STOP = new Set(['imperador', 'imperatriz', 'rainha', 'princesa', 'principe', 'marechal', 'duque', 'barao',
  'madre', 'infante', 'grande', 'magnifico', 'conquistador', 'navegador', 'coracao', 'sentado', 'touro', 'santo',
  'dona', 'calcuta', 'teresa', 'maria', 'joao', 'pedro', 'carlos', 'henrique', 'luis', 'jose', 'francisco', 'isabel',
  'maome', 'filipe', 'guilherme', 'ricardo', 'frederico', 'catarina', 'alexandre', 'constantino', 'justiniano',
  /* first names and plain words that would put the wrong face on a question:
     "a vitória em Little Bighorn", "São Paulo", "o litoral africano", "James Watt",
     "as Cortes de Lisboa", "a Marcha sobre Washington" */
  'vitoria', 'paulo', 'africano', 'santos', 'cruz', 'castro', 'branco', 'cortes', 'washington', 'roosevelt',
  'gonzaga', 'andrade', 'assis', 'mendes', 'albert', 'charles', 'george', 'john', 'james', 'thomas', 'william',
  'pablo', 'miguel', 'jorge', 'antonio', 'martin', 'nelson', 'mikhail', 'gabriel', 'simon', 'diego', 'candido',
  'oscar', 'ernest', 'franz', 'claude', 'victor', 'vincent', 'blaise', 'johann', 'johannes', 'gottfried',
  'immanuel', 'adam', 'benjamin', 'abraham', 'woodrow', 'winston', 'margaret', 'frida', 'stephen', 'emmeline',
  'florence', 'sigmund', 'nikola', 'henry', 'ludwig', 'wolfgang', 'friedrich', 'vladimir', 'mustafa', 'niels',
  'charlie', 'ernesto', 'salvador', 'gregor', 'frederic', 'david', 'marie', 'mahatma', 'nicolau', 'sandro',
  'heitor', 'tarsila', 'carlos', 'clarice', 'chico', 'juscelino', 'getulio', 'barao', 'zumbi']);
/* monuments whose name is also a plain word ("o panteão egípcio") */
const STAD_STOP = new Set(['panteao', 'capitolio', 'forum romano']);
let _artIdx = null;
function artIndex() {
  if (_artIdx) return _artIdx;
  const byLen = (a, b) => b[0].length - a[0].length;
  const faces = [], part = {};
  PL.forEach(p => {
    if (!p.img || !p.n) return;
    faces.push([_fold(p.n), p]);
    _fold(p.n).replace(/[(),.]/g, ' ').split(/\s+/).forEach(w => {
      if (w.length >= 5 && !ART_STOP.has(w)) part[w] = part[w] === undefined ? p : null;
    });
  });
  Object.keys(part).forEach(w => { if (part[w]) faces.push([w, part[w]]); });
  const stads = Object.keys(STAD).filter(k => STAD_IMGS[k]).map(k => [_fold(STAD[k].name), k]).filter(([n]) => !STAD_STOP.has(n));
  const crests = CL.map(c => [_fold(c.n), c.id]).filter(([k]) => k.length >= 5);
  return (_artIdx = { faces: faces.sort(byLen), stads: stads.sort(byLen), crests: crests.sort(byLen) });
}
const _artMemo = new WeakMap();
/* names of things that are not the thing: a painting is not the city-state */
const ART_PHRASES = /escola de atenas|cortes de lisboa|cortes portuguesas|euclides da cunha/g;
function inferArt(q) {
  if (!q || q.order || q.clues || hasStrip(q)) return '';
  if (_artMemo.has(q)) return _artMemo.get(q);
  const t = ' ' + _fold(q.t || '').replace(ART_PHRASES, ' ') + ' ', I = artIndex();
  /* a state's brasão only for a question set in its own time: "a Índia" of
     1498 is not the republic of 1947 */
  const yr = typeof qCues === 'function' ? qCues(q).year : null;
  const alive = id => { const c = CL.find(x => x.id === id); if (!c) return false;
    return yr === null || yr === undefined ? c.f < 1900 : yr >= c.f - 10 && yr <= (c.e || 3000) + 10; };
  const at = k => new RegExp('[^a-z0-9]' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[^a-z0-9]').test(t);
  const named = (q.a || []).map(a => _fold(q.type === 'txt' ? a : q.type === 'player' ? (PL.find(p => p.id === a) || {}).n : clubName(a)))
    .concat((q.choices || []).map(_fold)).filter(Boolean);
  const clash = k => named.some(a => a.includes(k) || k.includes(a));
  let out = '';
  for (const [k, id] of I.stads) if (at(k) && !clash(k)) {
    out = `<div class="qart qart-wide print"><img src="${STAD_IMGS[id]}" alt="" aria-hidden="true"
      onerror="this.parentElement.style.display='none'" /></div>`; break; }
  if (!out) for (const [k, p] of I.faces) if (at(k) && !clash(k) && !(q.a || []).includes(p.id)) { out = faceHtml(p.img); break; }
  if (!out) for (const [k, id] of I.crests) if (at(k) && !clash(k) && !(q.a || []).includes(id) && alive(id)) {
    out = `<div class="qart qart-crest">${clubArt(id, 'max-width:100%;max-height:100%;object-fit:contain;', true)}</div>`; break; }
  _artMemo.set(q, out);
  return out;
}
/* which name a question's inferred picture came from (for the tests) */
function inferArtKey(q) {
  const t = ' ' + _fold(q.t || '').replace(ART_PHRASES, ' ') + ' ', I = artIndex();
  const at = k => new RegExp('[^a-z0-9]' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[^a-z0-9]').test(t);
  for (const [k] of I.stads) if (at(k)) return 'stad:' + k;
  for (const [k, p] of I.faces) if (at(k)) return 'face:' + k + '=' + p.id;
  for (const [k] of I.crests) if (at(k)) return 'crest:' + k;
  return '';
}

/* The frame is the era, never the picture: a cream mat with a sepia rule for
   the ancient and medieval world, the cream card of the printed schoolbook
   up to the Great War, and a clean modern mount after it. */
function qEra(q) {
  const m = /(^|\D)(\d{3,4})(\s*a\.?\s?C\.?)?(\D|$)/.exec(q.t || '');
  if (!m) return '';
  const y = m[3] ? -(+m[2]) : +m[2];
  return y < 1500 ? 'era-vintage' : y < 1914 ? 'era-retro' : 'era-modern';
}
function questionArt(q) {
  const html = questionArtRaw(q);
  const era = qEra(q);
  return era ? html.replace('class="qart', `class="qart ${era}`) : html;
}

/* A polity's brasão as a standalone picture: the share card draws it on a canvas. */
function crestURI(id) {
  return 'data:image/svg+xml,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">${genericCrest(id)}</svg>`);
}
