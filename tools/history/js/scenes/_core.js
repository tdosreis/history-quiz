
/* ═══════════════════════════════════════════════════
   SCENES — the question's own subject, drawn
   A question about the fall of the Bastille shows the Bastille; one about
   the Nobel shows the medal; one about a century shows that century on the
   long ruler of time. Each scene is a 120×80 engraving in the album's inks
   (the same hand as ART in art_head.js): flat colour, one ink outline, no
   gradients, no gloss, and no lettering unless the scene is a sign that
   repeats what the question itself reads out (a century, an epithet).
   A scene never pictures an answer: merge_questions.py checks the written
   questions against `rx`, gen.js only names scenes of what it asks about.

   An entry:  id: { label, draw(p), rx?, ev? }
     label  what a screen reader hears (a string, or p => string)
     draw   p => the SVG body, in a 0 0 120 80 box; p is the parameter
            after the colon in "seculo:1750", or undefined
     rx     the words (accent-folded, lower case) whose presence among the
            choices means the scene would show an answer
     ev     the EVENTS id this scene stands for ("viveu durante…")
═══════════════════════════════════════════════════ */
const SCENE = {};
/* the album's inks */
const SCK = {
  ink: '#2A1D10', paper: '#F1E7CF', parch: '#E9DDBF', sand: '#E9C98B', ochre: '#C9A66B',
  gold: '#D9A93E', goldLo: '#A87A22', goldHi: '#F2D27A', red: '#9E1B1B', burg: '#7B1E3A',
  teal: '#2F5D62', sea: '#4F7A94', sky: '#BFD3D9', night: '#2B3A55', green: '#6E8C5A',
  olive: '#5E6B3A', stone: '#C9BFA8', stoneLo: '#A99E86', wood: '#8A5A34', white: '#F4ECD8',
};
let _sceneN = 0;
const SCH = {
  /* a group drawn with the one ink outline */
  g: (body, sw) => `<g stroke="${SCK.ink}" stroke-width="${sw || 2}" stroke-linejoin="round" stroke-linecap="round">${body}</g>`,
  bg: c => `<rect width="120" height="80" fill="${c}"/>`,
  /* a fresh id for a clip-path or pattern: the same scene can be on screen twice */
  uid: p => (p || 'sc') + (++_sceneN).toString(36),
  text: (x, y, s, size, fill, extra) => `<text x="${x}" y="${y}" ${/text-anchor/.test(extra || '') ? '' : 'text-anchor="middle"'} font-family="Fraunces, Georgia, serif" font-weight="700" font-size="${size}" fill="${fill}" ${extra || ''}>${_esc(s)}</text>`,
  caps: (x, y, s, size, fill, extra) => `<text x="${x}" y="${y}" ${/text-anchor/.test(extra || '') ? '' : 'text-anchor="middle"'} font-family="'Archivo Narrow', Archivo, system-ui, sans-serif" font-weight="700" font-size="${size}" fill="${fill}" ${/letter-spacing/.test(extra || '') ? '' : 'letter-spacing="1.2"'} ${extra || ''}>${_esc(s)}</text>`,
  sun: (x, y, r, c) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c || '#F4E3B6'}"/>`,
  waves: (y, c, sw) => `<path d="M0 ${y} q10 -5 20 0 t20 0 t20 0 t20 0 t20 0 t20 0" stroke="${c || '#EAF2F4'}" stroke-width="${sw || 2}" fill="none"/>`,
  /* a five-pointed star */
  star: (x, y, r, c) => `<path d="${Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .42 : r;
    return (i ? 'L' : 'M') + (x + Math.cos(a) * rr).toFixed(1) + ' ' + (y + Math.sin(a) * rr).toFixed(1); }).join('')}Z" fill="${c}"/>`,
};

/* "seculo:1750" → { id: 'seculo', p: '1750' } */
function sceneOf(q) {
  const v = q && q.scene;
  if (!v) return null;
  const s = String(v), i = s.indexOf(':');
  const id = i < 0 ? s : s.slice(0, i);
  return SCENE[id] ? { id, p: i < 0 ? undefined : s.slice(i + 1) } : null;
}
function sceneSvg(sc, w) {
  const s = SCENE[sc.id];
  if (!s) return '';
  const label = typeof s.label === 'function' ? s.label(sc.p) : s.label;
  return `<svg viewBox="0 0 120 80" width="${w || 120}" role="img" aria-label="${_esc(label)}"
    style="display:block;max-width:100%;height:auto;">${s.draw(sc.p)}</svg>`;
}
/* the scene a generated question about this event wears, if one is drawn */
function eventScene(ev) {
  for (const id in SCENE) if (SCENE[id].ev === ev) return id;
  return null;
}

/* ── the little motifs of each age, for the ruler of time ── */
function _ageMotif(y, k) {
  k = k || SCK.ink;
  if (y < 500) return `<path d="M0 0h22v3H0zM2 3h18v2H2zM3 5h3v13H3zM9.5 5h3v13h-3zM16 5h3v13h-3zM0 18h22v3H0z" fill="${k}"/><path d="M-1 0 11-6 23 0Z" fill="${k}"/>`;
  if (y < 1400) return `<path d="M2 21V6h3V3h3v3h3V3h3v3h3V3h3v3h-0V21zM9 21v-5a2 2 0 0 1 4 0v5z" fill="${k}" fill-rule="evenodd"/><path d="M11 3V-4l5 1.6-5 1.6" fill="${k}"/>`;
  if (y < 1650) return `<path d="M0 14h22q-3 7-8 7H8q-5 0-8-7zM11 -4v18M12 -3q8 3 8 13h-8zM10 0q-7 3-7 10h7z" fill="${k}"/>`;
  if (y < 1800) return `<path d="M3 21c0-6 3.4-9 8-9s8 3 8 9zM11 12a4.6 4.6 0 1 0 0-9.2a4.6 4.6 0 0 0 0 9.2z" fill="${k}"/><path d="M4.4 6c0-5 13.2-5 13.2 0l2.4.6-2 2.2C15 7 7 7 4 8.8L2 6.6z" fill="${k}"/><path d="M15.6 4c3-.8 5 1.2 4.4 4" fill="none" stroke="${k}" stroke-width="1.6"/>`;
  if (y < 1900) return `<path d="M0 12h14V5h4v7h4v6H0zM3 5h5v7H3zM4 1h3v4H4z" fill="${k}"/><circle cx="4" cy="19" r="2.6" fill="${k}"/><circle cx="12" cy="19" r="2.6" fill="${k}"/><circle cx="19" cy="19" r="2" fill="${k}"/><path d="M5 -1q3-3 6-1t6-1" fill="none" stroke="${k}" stroke-width="1.4"/>`;
  if (y < 2000) return `<path d="M0 10l8-1 4-8h3l-2 8 7-.6 2-3h2l-1 4.6 1 4.6h-2l-2-3-7-.6 2 8h-3l-4-8-8-1z" fill="${k}"/>`;
  return `<path d="M11 0q5 4 5 12v6h-10v-6q0-8 5-12zM6 14l-4 6h4zM16 14l4 6h-4z" fill="${k}"/><circle cx="11" cy="9" r="2" fill="${SCK.parch}"/>`;
}

/* the long ruler of time: 800 a.C. to 2000, with one span lit */
function _ruler(y0, from, to, lit) {
  const X = yr => 10 + (Math.max(-800, Math.min(2000, yr)) + 800) / 2800 * 100;
  const ticks = [-500, 0, 500, 1000, 1500].map(t => `<path d="M${X(t).toFixed(1)} ${y0 - (t === 0 ? 5 : 3)}V${y0 + (t === 0 ? 5 : 3)}" stroke="${SCK.ink}" stroke-width="${t === 0 ? 1.6 : 1}"/>`).join('');
  const a = X(from), b = X(to);
  return `<rect x="10" y="${y0 - 2.4}" width="100" height="4.8" rx="2.4" fill="${SCK.paper}" stroke="${SCK.ink}" stroke-width="1.2"/>${ticks}
    <rect x="${a.toFixed(1)}" y="${y0 - 3.4}" width="${Math.max(3.2, b - a).toFixed(1)}" height="6.8" rx="1" fill="${lit || SCK.red}" stroke="${SCK.ink}" stroke-width="1"/>
    <path d="M${((a + b) / 2).toFixed(1)} ${y0 - 5}l-3.2 -5h6.4z" fill="${lit || SCK.red}" stroke="${SCK.ink}" stroke-width="1" stroke-linejoin="round"/>`;
}

/* a mystery figure in a medallion, for the duels */
function _medal(x, fill, flip, bare) {
  return `<g transform="translate(${x} 38)${flip ? ' scale(-1 1)' : ''}">
    <ellipse rx="19" ry="23" fill="${SCK.gold}" stroke="${SCK.ink}" stroke-width="2"/>
    <ellipse rx="15" ry="19" fill="${fill}" stroke="${SCK.ink}" stroke-width="1.2"/>
    ${bare ? '' : `<path d="M-12 17c1-8 5-11 11-11s10 3 11 11z" fill="${SCK.ink}" opacity=".85"/>
    <path d="M-1 6.6c-5 0-8-4-8-9.4s3.6-9 8.4-9 8 3.6 7.6 8.6c2 .6 2.4 2.6.6 3.4l-1.6 4.4c-1.6 1.6-4.6 2-7 2z" fill="${SCK.ink}" opacity=".85"/>`}
    <text x="0" y="${bare ? 6 : 1}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="${bare ? 18 : 12}" fill="${SCK.goldHi}"${flip ? ' transform="scale(-1 1)"' : ''}>?</text></g>`;
}
/* the little sign over a duel that says what is being compared */
const DUEL_CUE = {
  nasceu:    `<path d="M-8 -1h16q0 7-8 7t-8-7z" fill="${SCK.wood}"/><path d="M-8 -1a8 8 0 0 1 8-6" fill="none" stroke="${SCK.ink}" stroke-width="1.4"/><path d="M-6 -1q6-4 12 0" fill="${SCK.white}"/><circle cx="-2" cy="-3.4" r="2" fill="#E8C3A0"/><path d="M-6 9l-2 2M6 9l2 2" stroke="${SCK.ink}" stroke-width="1.4"/>`,
  viveu:     `<path d="M-6 -9h12M-6 9h12" stroke="${SCK.ink}" stroke-width="2"/><path d="M-5 -8q0 6 5 8q-5 2-5 8h10q0-6-5-8q5-2 5-8z" fill="${SCK.white}" stroke="${SCK.ink}" stroke-width="1.2"/><path d="M-3 7h6l-3-3z" fill="${SCK.sand}"/>`,
  surgiu:    `<path d="M-9 4h18v6h-18z" fill="${SCK.stone}" stroke="${SCK.ink}" stroke-width="1.2"/><path d="M-7 4l-1-9 4 3 4-6 4 6 4-3-1 9z" fill="${SCK.gold}" stroke="${SCK.ink}" stroke-width="1.2" stroke-linejoin="round"/>`,
  governou:  `<path d="M-9 6l-1.4-11 5.4 4.4 5-7 5 7 5.4-4.4-1.4 11z" fill="${SCK.gold}" stroke="${SCK.ink}" stroke-width="1.2" stroke-linejoin="round"/><path d="M-9 6h18v3h-18z" fill="${SCK.goldLo}" stroke="${SCK.ink}" stroke-width="1"/>`,
  aconteceu: `<rect x="-8" y="-8" width="16" height="17" rx="1.6" fill="${SCK.white}" stroke="${SCK.ink}" stroke-width="1.2"/><path d="M-8 -3h16" stroke="${SCK.ink}" stroke-width="1"/><rect x="-8" y="-8" width="16" height="5" rx="1.6" fill="${SCK.red}"/><path d="M-4 1h8M-4 4.6h5" stroke="${SCK.ink}" stroke-width="1.2"/>`,
  invencao:  `<path d="M0 -10a7 7 0 0 1 4.4 12.4V5h-8.8V2.4A7 7 0 0 1 0 -10z" fill="${SCK.goldHi}" stroke="${SCK.ink}" stroke-width="1.2"/><path d="M-4 7h8M-3 9.4h6" stroke="${SCK.ink}" stroke-width="1.4"/><path d="M-2 0l2 3 2-3" fill="none" stroke="${SCK.ink}" stroke-width="1"/>`,
  construiu: `<path d="M-9 -3 0 -9l9 6z" fill="${SCK.stone}" stroke="${SCK.ink}" stroke-width="1.1" stroke-linejoin="round"/><path d="M-8 -3h16v2h-16z" fill="${SCK.stoneLo}" stroke="${SCK.ink}" stroke-width=".9"/><path d="M-6.4 -1h2.6v8h-2.6zM-1.3 -1h2.6v8h-2.6zM3.8 -1h2.6v8h-2.6z" fill="${SCK.white}" stroke="${SCK.ink}" stroke-width=".8"/><path d="M-9 7h18v2.4h-18z" fill="${SCK.stoneLo}" stroke="${SCK.ink}" stroke-width=".9"/>`,
  morreu:    `<path d="M-6 -9h12M-6 9h12" stroke="${SCK.ink}" stroke-width="2"/><path d="M-5 -8q0 6 5 8q-5 2-5 8h10q0-6-5-8q5-2 5-8z" fill="${SCK.white}" stroke="${SCK.ink}" stroke-width="1.2"/><path d="M-4 -7h8l-4 5z" fill="${SCK.sand}"/>`,
};
function _duel(cue) {
  return SCH.bg('#D8C39A') + `<path d="M0 64h120v16H0z" fill="#C9A66B"/>`
    + _medal(26, SCK.burg, false, /^(construiu|invencao|aconteceu|surgiu)$/.test(cue)) + _medal(94, SCK.teal, true, /^(construiu|invencao|aconteceu|surgiu)$/.test(cue))
    + SCH.g(`<path d="M44 58 76 22" stroke="#E4E6EA" stroke-width="4.4" fill="none"/><path d="M76 58 44 22" stroke="#D4D7DC" stroke-width="4.4" fill="none"/>
      <path d="M41 52l9 9M79 52l-9 9" stroke="${SCK.gold}" stroke-width="3.4" fill="none"/>`, 1.2)
    + `<g transform="translate(60 18)"><circle r="11.5" fill="${SCK.paper}" stroke="${SCK.ink}" stroke-width="1.6"/>${DUEL_CUE[cue] || DUEL_CUE.aconteceu}</g>`;
}

Object.assign(SCENE, {
  /* "Qual destes personagens nasceu no século XVIII?" — the century in its
     cartouche, the age's own silhouette behind it, and its span lit on the
     long ruler of time */
  seculo: {
    label: p => centTxt(+p || 0),
    draw: p => {
      const y = +p || 1, num = centTxt(y).replace(/^século /, ''), bc = / a\.C\.$/.test(num), r = num.replace(/ a\.C\.$/, '');
      const c = centNum(y), from = y < 0 ? -c * 100 : (c - 1) * 100, to = y < 0 ? -(c - 1) * 100 : c * 100;
      return SCH.bg(SCK.parch)
        + `<g transform="translate(83 13) scale(1.5)" opacity=".2">${_ageMotif(y)}</g><g transform="translate(3 13) scale(1.5)" opacity=".2">${_ageMotif(y)}</g>`
        + SCH.g(`<path d="M8 16h14v22H8l5-11z" fill="#5E1616"/><path d="M112 16H98v22h14l-5-11z" fill="#5E1616"/>
          <path d="M20 8h80v34H20z" fill="${SCK.burg}"/>`, 1.6)
        + `<path d="M24 12h72v26H24z" fill="none" stroke="${SCK.goldHi}" stroke-width=".8" opacity=".8"/>`
        + SCH.caps(60, 19.6, 'SÉCULO', 6, SCK.goldHi, 'letter-spacing="2.4"')
        + SCH.text(60, bc ? 33 : 36, r, r.length > 5 ? 13 : 16, SCK.paper)
        + (bc ? SCH.caps(60, 40.2, 'ANTES DE CRISTO', 4.4, SCK.goldHi) : '')
        + _ruler(60, from, to)
        + SCH.caps(10 + 800 / 2800 * 100, 74, 'ANO 1', 4.6, SCK.ink, 'opacity=".7"') + SCH.caps(110, 74, '2000', 4.6, SCK.ink, 'text-anchor="end" opacity=".7"');
    } },

  /* "Qual destes personagens nasceu primeiro / por último?" — a row of
     people along the arrow of time, a pointing hand at one end */
  nasceu_primeiro: { label: 'Uma fila de personagens ao longo do tempo; a mão aponta para o primeiro', draw: () => _queue(true) },
  nasceu_ultimo:   { label: 'Uma fila de personagens ao longo do tempo; a mão aponta para o último', draw: () => _queue(false) },

  /* "Quem viveu mais tempo?" — three lives as bars, from birth (✶) to death (†) */
  viveu_mais: {
    label: 'Três vidas medidas na régua, do nascimento à morte',
    draw: () => {
      const life = (y, x0, x1, c) => `<path d="M${x0} ${y}H${x1}" stroke="${c}" stroke-width="6" stroke-linecap="round"/>
        <path d="M${x0} ${y}H${x1}" stroke="${SCK.ink}" stroke-width="1" stroke-dasharray="0" opacity=".0"/>
        ${SCH.star(x0 - 6, y, 4.6, SCK.goldHi).replace('/>', ` stroke="${SCK.ink}" stroke-width=".9"/>`)}
        <path d="M${x1 + 6} ${y - 5}v10M${x1 + 2.6} ${y - 2}h6.8" stroke="${SCK.ink}" stroke-width="1.8"/>`;
      let ruler = '';
      for (let i = 0; i <= 20; i++) ruler += `<path d="M${14 + i * 4.6} 14v${i % 5 ? 3 : 6}" stroke="${SCK.ink}" stroke-width="${i % 5 ? .8 : 1.2}"/>`;
      return SCH.bg('#E4D6B4') + `<rect x="10" y="9" width="100" height="12" rx="1.5" fill="${SCK.sand}" stroke="${SCK.ink}" stroke-width="1.4"/>` + ruler
        + `<path d="M14 21V72M106 21V72" stroke="${SCK.ink}" stroke-width=".8" stroke-dasharray="2 2" opacity=".5"/>`
        + life(34, 24, 66, SCK.teal) + life(48, 24, 96, SCK.gold) + life(62, 24, 50, SCK.burg);
    } },

  /* the duels: two mystery medallions, crossed swords, and the sign of what
     the duel is about */
  duelo_nasceu:    { label: 'Duelo de dois medalhões, sob um berço', draw: () => _duel('nasceu') },
  duelo_viveu:     { label: 'Duelo de dois medalhões, sob uma ampulheta', draw: () => _duel('viveu') },
  duelo_morreu:    { label: 'Duelo de dois medalhões, sob uma ampulheta quase vazia', draw: () => _duel('morreu') },
  duelo_surgiu:    { label: 'Duelo de dois medalhões, sob uma coroa na pedra fundamental', draw: () => _duel('surgiu') },
  duelo_governou:  { label: 'Duelo de dois medalhões, sob uma coroa', draw: () => _duel('governou') },
  duelo_aconteceu: { label: 'Duelo de dois medalhões, sob uma folha de calendário', draw: () => _duel('aconteceu') },
  duelo_construiu: { label: 'Duelo de dois medalhões, sob um templo', draw: () => _duel('construiu') },
  duelo_invencao:  { label: 'Duelo de dois medalhões, sob uma lâmpada', draw: () => _duel('invencao') },

  /* the states: which came first, which is the newest, which lasted, which fell */
  estado_primeiro: {
    label: 'A pedra fundamental, com a colher de pedreiro, ao amanhecer',
    draw: () => SCH.bg('#E9C98B') + SCH.sun(60, 52, 26, '#F4D88E') + SCH.sun(60, 52, 18, '#F7E4AE')
      + `<path d="M0 58h120v22H0z" fill="#B99A63"/>`
      + SCH.g(`<path d="M34 40h52v26H34z" fill="${SCK.stone}"/><path d="M34 40l6-6h52l-6 6zM86 40l6-6v26l-6 6z" fill="${SCK.stoneLo}"/>
        <path d="M48 58l-1.6-11 5.4 4.4 4.2-6.6 4.2 6.6 5.4-4.4L64.6 58z" fill="${SCK.gold}" stroke-width="1.4"/>
        <path d="M66 39l16-9 14 3-16 9z" fill="#C3C8CE" stroke-width="1.4"/><path d="M90 31.6l4-6 6-2" fill="none" stroke-width="1.6"/>
        <path d="M99 24.6l7-4" stroke="${SCK.wood}" stroke-width="3.6" fill="none"/>`, 1.8)
      + `<path d="M40 46h10M70 46h10" stroke="${SCK.ink}" stroke-width="1" opacity=".4"/>` },
  estado_ultimo: {
    label: 'Uma bandeira nova hasteada num edifício recém-construído',
    draw: () => SCH.bg('#BFD3D9') + SCH.sun(98, 18, 9, '#F4E3B6')
      + `<path d="M0 62q30-10 60-4t60-2v24H0z" fill="${SCK.green}"/>`
      + SCH.g(`<path d="M30 64V38h60v26z" fill="${SCK.white}"/><path d="M26 38l34-14 34 14z" fill="${SCK.stone}"/>
        <path d="M40 46h8v10h-8zM56 46h8v10h-8zM72 46h8v10h-8z" fill="${SCK.sea}" stroke-width="1.2"/>
        <path d="M60 24V4" stroke-width="2" fill="none"/><path d="M61 5q9 -3 18 1v12q-9-4-18-1z" fill="${SCK.red}" stroke-width="1.4"/>`, 1.8)
      + SCH.star(70, 11.4, 3.6, SCK.goldHi)
      + `<path d="M16 30l3-3M14 22h4M20 16l2 3M100 34l3 3M104 28h4" stroke="${SCK.goldLo}" stroke-width="1.6" stroke-linecap="round"/>` },
  estado_durou: {
    label: 'Uma coroa sobre um tronco de árvore com muitos anéis',
    draw: () => {
      let rings = '';
      for (let r = 4; r <= 30; r += 3.4) rings += `<ellipse cx="60" cy="54" rx="${(r * 1.5).toFixed(1)}" ry="${(r * .52).toFixed(1)}" fill="none" stroke="#8A5A34" stroke-width=".9" opacity=".8"/>`;
      return SCH.bg('#C8D9C0') + `<path d="M0 66h120v14H0z" fill="${SCK.green}"/>`
        + SCH.g(`<path d="M14 54v12q46 14 92 0V54" fill="#7A4A24"/><ellipse cx="60" cy="54" rx="46" ry="16" fill="#E2C08A"/>`, 1.8) + rings
        + SCH.g(`<path d="M46 44l-2.4-17 8.4 7 8-11 8 11 8.4-7L74 44z" fill="${SCK.gold}"/><path d="M46 44h28v5H46z" fill="${SCK.goldLo}"/>`, 1.6)
        + `<circle cx="60" cy="20" r="2.4" fill="${SCK.goldHi}" stroke="${SCK.ink}" stroke-width="1"/>`;
    } },
  estado_extinto: {
    label: 'Ruínas de colunas e uma coroa caída, ao pôr do sol',
    draw: () => SCH.bg('#D99A6C') + SCH.sun(88, 44, 16, '#F2C27A') + `<path d="M0 50h120v30H0z" fill="#B88A5A"/>`
      + SCH.g(`<path d="M18 66V30h10v36zM16 28h14v4H16z" fill="${SCK.stone}"/><path d="M40 66V44l4-3 3 4 3-2v23z" fill="${SCK.stone}"/>
        <path d="M68 66V36l5 2 5-4v32z" fill="${SCK.stone}"/><path d="M58 70l22-8 3 6-22 8z" fill="${SCK.stoneLo}"/>
        <path d="M14 66h72v5H14z" fill="${SCK.stoneLo}"/>
        <path d="M90 72l2-11 5 4 4-6 3 7 5-3-1 11z" fill="${SCK.gold}" transform="rotate(14 100 66)"/>`, 1.6)
      + `<path d="M21 34v28M25 34v28M71 40v24M75 40v24" stroke="${SCK.ink}" stroke-width=".8" opacity=".4"/>` },
  antes_de_cristo: {
    label: 'A régua do tempo partida no ano 1: antes e depois de Cristo',
    draw: () => SCH.bg(SCK.parch)
      + `<path d="M8 22h52v28H8z" fill="${SCK.sand}" stroke="${SCK.ink}" stroke-width="1.4"/><path d="M60 22h52v28H60z" fill="${SCK.paper}" stroke="${SCK.ink}" stroke-width="1.4"/>`
      + `<g transform="translate(24 27) scale(.9)">${_ageMotif(-300)}</g><g transform="translate(76 27) scale(.9)" opacity=".35">${_ageMotif(1200)}</g>`
      + `<path d="M60 14v44" stroke="${SCK.red}" stroke-width="2.4"/>`
      + SCH.caps(34, 64, 'A.C.', 9, SCK.ink) + SCH.caps(86, 64, 'D.C.', 9, SCK.ink, 'opacity=".45"')
      + `<path d="M14 72h40l4-2.6-4-2.6M106 72H66" fill="none" stroke="${SCK.ink}" stroke-width="1.6"/>` },

  /* the Nobel: the gold medal on its velvet ("DOIS prêmios": two of them) */
  nobel: {
    label: p => +p === 2 ? 'Duas medalhas de ouro do Prêmio Nobel' : 'A medalha de ouro do Prêmio Nobel',
    draw: p => {
      const medal = (x, y, r) => `<g transform="translate(${x} ${y})">
        <circle r="${r}" fill="${SCK.gold}" stroke="${SCK.ink}" stroke-width="1.8"/><circle r="${r - 3}" fill="none" stroke="${SCK.goldLo}" stroke-width="1.2"/>
        <g transform="scale(${(r / 22).toFixed(2)})"><path d="M-2 14c-6-1-9-4-9-8 0-2 2-3 2-6-3-1-2-4 0-5 0-6 4-10 10-10 7 0 11 5 11 11 0 4-2 6-2 9 2 3 3 6 3 9z" fill="${SCK.goldLo}"/>
        <path d="M-9 -1c-2 3-1 7 2 9 3 2 6 2 7 6" fill="none" stroke="${SCK.goldHi}" stroke-width="1" opacity=".8"/></g>
        <path d="M${-r + 4} 4a${r - 4} ${r - 4} 0 0 0 ${2 * r - 8} 0" fill="none" stroke="${SCK.goldHi}" stroke-width="1" stroke-dasharray="1.4 1.6" opacity=".9"/></g>`;
      return SCH.bg('#5A1E2A') + `<rect x="6" y="6" width="108" height="68" rx="6" fill="#6E2434" stroke="#3E0F18" stroke-width="2"/>`
        + `<rect x="12" y="12" width="96" height="56" rx="4" fill="none" stroke="${SCK.goldLo}" stroke-width=".8" stroke-dasharray="2 2"/>`
        + (+p === 2 ? medal(46, 38, 20) + medal(76, 42, 20) : medal(60, 38, 23))
        + SCH.caps(60, 72, 'NOBEL', 6.4, SCK.goldHi, 'letter-spacing="3"');
    } },

  /* "Quem é conhecido como "O Libertador"?" — a veiled bust on its plinth,
     the epithet on the brass plate */
  epiteto: {
    label: p => 'Um busto coberto por um pano de veludo, com a placa: ' + (p || ''),
    draw: p => {
      const t = String(p || '').trim(), words = t.split(/\s+/);
      let l1 = t, l2 = '';
      if (t.length > 20) { let n = 0; const half = t.length / 2; const i = words.findIndex(w => (n += w.length + 1) >= half);
        l1 = words.slice(0, i + 1).join(' '); l2 = words.slice(i + 1).join(' '); }
      const len = Math.max(l1.length, l2.length), fs = Math.min(8.2, 96 / (len * .52));
      return SCH.bg('#2F3A4A') + `<path d="M0 0h120v80H0z" fill="#3B4B5E"/><ellipse cx="60" cy="10" rx="50" ry="26" fill="#4A5D73" opacity=".7"/>`
        + SCH.g(`<path d="M34 50h52v4H34z" fill="${SCK.stone}"/><path d="M28 54h64v22H28z" fill="${SCK.stone}"/>
          <path d="M60 6c-7 0-11 5-11 11 0 4 1.6 7 3.4 9-8 1.4-14 5-16 11l-3 13q4 2.4 7 0 3 2.4 6 0 3 2.4 6 0 3 2.4 6 0 3 2.4 6 0 3 2.4 6 0 3 2.4 6 0 3 2.4 7 0l-3-13c-2-6-8-9.6-16-11 1.8-2 3.4-5 3.4-9 0-6-4-11-11-11z" fill="${SCK.burg}"/>`, 1.6)
        + `<path d="M55 12c-1 5 0 10 2 13M65 11c1 5 1 10-1 14M44 38c-1 4-1 8 0 12M52 34c-1 6-1 11 0 16M68 34c1 6 1 11 0 16M76 38c1 4 1 8 0 12" fill="none" stroke="#4E0F22" stroke-width="1" opacity=".8"/>`
        + `<path d="M56 9c2-1.4 5-1.4 7 0" fill="none" stroke="#B5546C" stroke-width="1.2" opacity=".8"/>`
        + `<rect x="10" y="58" width="100" height="${l2 ? 18 : 12}" rx="1.6" fill="${SCK.gold}" stroke="${SCK.ink}" stroke-width="1.4"/>`
        + `<rect x="12.4" y="60.4" width="95.2" height="${l2 ? 13.2 : 7.2}" rx="1" fill="none" stroke="${SCK.goldLo}" stroke-width=".7"/>`
        + SCH.text(60, l2 ? 66.4 : 66.6, l1, fs.toFixed(1), '#3A2608', 'font-style="italic"')
        + (l2 ? SCH.text(60, 73.4, l2, fs.toFixed(1), '#3A2608', 'font-style="italic"') : '');
    } },
});

/* a row of five people on the arrow of time, a pointing hand over one end */
function _queue(first) {
  const xs = [20, 40, 60, 80, 100], hs = [0, 2, -1, 1, 0];
  const pick = first ? 0 : 4;
  const person = (x, i) => `<g transform="translate(${x} ${50 + hs[i]})">
    ${i === pick ? `<ellipse cy="-1" rx="11" ry="13" fill="${SCK.goldHi}" opacity=".75"/>` : ''}
    <path d="M-7.4 11c0-7.4 3.2-10.6 7.4-10.6s7.4 3.2 7.4 10.6z" fill="${i === pick ? SCK.burg : SCK.ink}"/>
    <circle cy="-5.6" r="5.2" fill="${i === pick ? SCK.burg : SCK.ink}"/></g>`;
  /* the manicule of the old printers, pointing down */
  const hand = `<g transform="translate(${xs[pick]} 22)">
    <path d="M-5 -16h10v6h-10z" fill="${SCK.burg}" stroke="${SCK.ink}" stroke-width="1.2"/>
    <path d="M-5.6 -10h11.2v4q2.6 .4 2.6 3t-2.6 2.6v1.4q2 .4 2 2.6t-2.4 2.4H1.6V12q0 2.6-2.6 2.6T-3.6 12V5.6H-5.6z" fill="${SCK.white}" stroke="${SCK.ink}" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M1.6 -6h3.4M1.6 -1.6h3" stroke="${SCK.ink}" stroke-width=".9"/></g>`;
  return SCH.bg(SCK.parch) + `<path d="M0 64h120v16H0z" fill="${SCK.ochre}" opacity=".55"/>`
    + `<path d="M6 64H110" stroke="${SCK.ink}" stroke-width="2.2"/><path d="M106 59.6 113.4 64l-7.4 4.4z" fill="${SCK.ink}"/>`
    + SCH.caps(8, 75, 'ANTES', 5, SCK.ink, 'text-anchor="start" opacity=".7"') + SCH.caps(112, 75, 'DEPOIS', 5, SCK.ink, 'text-anchor="end" opacity=".7"')
    + xs.map(person).join('') + hand;
}
