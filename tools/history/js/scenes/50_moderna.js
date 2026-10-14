/* Idade Moderna — the scenes of the Discoveries, the Renaissance, the Reformation and the age of kings (conventions in _core.js) */
Object.assign(SCENE, {
  /* a Portuguese nau under square sails with the red cross of the Order of Christ rounds a brown headland crowned by a stone padrão; gulls */
  ev_grandes_navegacoes: {
    label: 'Uma nau de velas com cruzes contorna um cabo, onde se ergue um padrão de pedra',
    rx: /\b(grandes navegacoes|nau|naus|caravela|caravelas|padrao|padroes)\b/,
    ev: 'grandes_navegacoes',
    draw: () => {
      const R = v => Math.round(v * 10) / 10;
      const X = (x, y, r) => { const a = R(r * .42), b = R(r * .14); return `M${R(x - a)} ${y - r}H${R(x + a)}L${R(x + b)} ${R(y - b)}L${x + r} ${R(y - a)}V${R(y + a)}L${R(x + b)} ${R(y + b)}L${R(x + a)} ${y + r}H${R(x - a)}L${R(x - b)} ${R(y + b)}L${x - r} ${R(y + a)}V${R(y - a)}L${R(x - b)} ${R(y - b)}z`; };
      return SCH.bg('#C9DCE0') + SCH.sun(104, 13, 6, '#F4E3B6') + `<ellipse cx="44" cy="11" rx="15" ry="2.6" fill="${SCK.white}" opacity=".6"/>`
        + `<path d="M0 50h120v30H0z" fill="${SCK.sea}"/>` + SCH.waves(68, '#7FA3B8', 1.4) + SCH.waves(76, '#6D95AD', 1.4)
        + SCH.g(`<path d="M-2 82V42q5-8 12-8h15l5 3q5 1 7 7l2 9 5 5 2 8 3 16z" fill="#A9825A"/><path d="M-2 82V60q8-6 16-2l8 8 4 16z" fill="#8C6844" stroke-width="1.2"/>`, 1.6)
        + `<path d="M10 44l6-5 5 4M26 40l4 7-3 8M34 52l-3 9M6 54l7-4" fill="none" stroke="${SCK.ink}" stroke-width="1" opacity=".45"/><path d="M36 58q4-2 8 0M42 66q4-2 8 1" stroke="${SCK.white}" stroke-width="1.6" fill="none"/>`
        + SCH.g(`<path d="M12 34h13v-3H12z" fill="${SCK.stoneLo}"/><path d="M16 31V17h5v14z" fill="${SCK.white}"/><path d="M14 17v-7h9v7z" fill="${SCK.white}"/>
          <path d="M18.5 10V3M15.6 6h5.8" fill="none" stroke-width="3.4"/>`, 1.4)
        + `<path d="M18.5 9.4V3.6M16.2 6h4.6" stroke="${SCK.white}" stroke-width="1.4"/><path d="M16.6 11.4h3.8v2.4q0 1.6-1.9 2q-1.9-.4-1.9-2z" fill="${SCK.red}"/>`
        + `<path d="M28 21q2.4-2.4 4.8 0q2.4-2.4 4.8 0M42 27q2-2 4 0q2-2 4 0M108 25q1.8-1.8 3.6 0q1.8-1.8 3.6 0" stroke="${SCK.ink}" stroke-width="1.1" fill="none"/>`
        + `<path d="M74 5V46M96 14V42M54 15V41M103 41L117 33" stroke="${SCK.ink}" stroke-width="1.8"/><path d="M74 6L106 40M74 6L47 40M96 15L116 33M54 16L46 40" stroke="${SCK.ink}" stroke-width=".6" opacity=".55"/>`
        + SCH.g(`<path d="M44 39L62 9" fill="none" stroke-width="1.6"/><path d="M45.6 37.6L60.6 12Q62 27 58 39z" fill="${SCK.white}"/>
          <path d="M62 18h24q3 11 0 22H62q-3-11 0-22zM65 7h18q2 4.5 0 9H65q-2-4.5 0-9zM88 22h16q2 8 0 16H88q-2-8 0-16zM90 13h12q1.4 3 0 6H90q-1.4-3 0-6zM105 35h9q1 3 0 6h-9q-1-3 0-6z" fill="${SCK.white}"/>
          <path d="M60 18h28M63 7h22M86 22h20M88 13h16" fill="none" stroke-width="1.6"/>`, 1.3)
        + `<path d="${X(74, 29, 7)}${X(96, 30, 5)}" fill="${SCK.red}"/><path d="M74 4.6l11 2.2-11 2.2z" fill="${SCK.red}"/>`
        + SCH.g(`<path d="M46 40h12l2 5h34l4-4 9-1-2 7q-4 15-20 17H62q-12-1-16-12z" fill="#6E4426"/>`, 1.6)
        + `<path d="M47 50q30 4 58-2M50 55q26 4 50-2" stroke="${SCK.ochre}" stroke-width="1.6" fill="none"/><path d="M47 43h10M48 46h9" stroke="${SCK.ink}" stroke-width=".8" opacity=".6"/>`
        + `<path d="M40 61q8-3 16 0t16 0t16 0t16 0t16 0v4H40z" fill="${SCK.sea}"/><path d="M40 61q8-3 16 0t16 0t16 0t16 0t16 0" stroke="${SCK.white}" stroke-width="1.6" fill="none"/>`;
    } },

  /* the giant of the storms: a bearded face of black cloud over the sea off the Cape, lightning, and a small ship riding the swell */
  adamastor: {
    label: 'Um gigante de nuvens de tempestade ergue-se sobre um navio no mar revolto',
    rx: /\b(adamastor|gigante|tormenta|tormentas)\b/,
    draw: () => SCH.bg('#80949E') + `<path d="M0 40h120v18H0z" fill="#D2DAD2"/>`
      + SCH.g(`<path d="M-2 56V40q2-9 10-10q0-8 9-9q4-5 11-3q-1-9 6-14q7-5 15-2q6-5 15-1q8 0 11 7q6 4 4 12q8-1 11 5q8-1 10 6q8 2 6 10q2 6-6 8l-12-2-12-4-10 12-8 8H54l-8-8-10-12-14 2-14 4z" fill="${SCK.night}"/>`, 1.6)
      + `<path d="M8 32q2-6 9-7M28 19q1-8 9-11M48 6q7-4 13-1M70 9q6 1 7 7M84 25q6-1 9 4M96 33q5 0 7 5" stroke="#5A6F8E" stroke-width="1.6" fill="none"/>`
      + `<path d="M42 23q7-6 15-1M61 22q8-5 15 1" stroke="#7A90AA" stroke-width="2.4" fill="none"/>`
      + `<path d="M45 27q5-3 10 0q-5 2.4-10 0zM63 27q5-3 10 0q-5 2.4-10 0z" fill="#E6ECE4"/>`
      + `<path d="M59 25q-1 8-4 12q4 2 8 0M47 42q6-4 12-1q6-3 12 1" stroke="#7A90AA" stroke-width="1.6" fill="none"/>`
      + `<path d="M46 45q-2 6 1 12M53 46q-1 7 1 13M60 46v14M67 46q1 7-1 13M74 45q2 6-1 12M38 16q4-4 9-4M70 12q5 0 8 4" stroke="#4E6382" stroke-width="1.4" fill="none"/>`
      + `<g transform="translate(101 62) rotate(-10) scale(1.2)">` + SCH.g(`<path d="M-1 -4V-25M8 -3V-19M-9 -4V-17" fill="none" stroke-width="1.1"/>
        <path d="M-6 -22h10q1.6 6 0 12H-6q-1.6-6 0-12zM5 -17h7q1 4 0 8H5q-1-4 0-8zM-13 -16l5-1v8h-5z" fill="${SCK.white}" stroke-width="1"/>
        <path d="M-14 -6h6l1 2h12l3-2 6-1-2 4q-3 7-12 7H-7q-6 0-7-6z" fill="#6E4426" stroke-width="1.2"/>`) + `<path d="M-1 -19.6v5M-3.4 -17h4.8" stroke="${SCK.red}" stroke-width="1.4"/></g>`
      + `<path d="M0 62q8-12 18-8q-6 4 0 8q10-12 24-6q-8 6 0 10q14-14 30-6q-8 6 2 8q10-10 22-6q-6 6 4 6q8-8 20-4V80H0z" fill="${SCK.sea}"/>`
      + `<path d="M0 62q8-12 18-8q-6 4 0 8q10-12 24-6q-8 6 0 10q14-14 30-6q-8 6 2 8q10-10 22-6q-6 6 4 6q8-8 20-4" stroke="${SCK.white}" stroke-width="1.8" fill="none"/>`
      + `<path d="M0 74q10-5 20 0t20 0t20 0t20 0t20 0t20 0" stroke="#7FA3B8" stroke-width="1.4" fill="none"/>`
      + SCH.g(`<path d="M27 37h10l-8 11h6L16 69l6-16h-6z" fill="${SCK.goldHi}"/>`, 1.3) },

  /* the Armada in its crescent on a grey Channel: galleons with high castles, and fire-ships ablaze drifting down on them; the white cliffs far off */
  invencivel_armada: {
    label: 'Galeões em formação de meia-lua e brulotes em chamas, no canal',
    rx: /\b(armada|invencivel armada|galeao|galeoes|brulote|brulotes)\b/,
    draw: () => {
      const R = v => Math.round(v * 10) / 10;
      const gal = (x, y, s, top) => `<g transform="translate(${x} ${y}) scale(${s})">` + SCH.g(`<path d="M-18 -17V-40M-4 -10V-54M11 -14V-44M20 -12L32 -20" fill="none"/>
        <path d="M-28 -22L-12 -46Q-12 -32 -16 -20zM-14 -36h20q2 8 0 16h-20q-2-8 0-16zM3 -34h16q2 7 0 14H3q-2-7 0-14z${top ? 'M-11 -51h14q1.6 4.5 0 9h-14q-1.6-4.5 0-9zM5 -43h12q1.4 3.5 0 7H5q-1.4-3.5 0-7z' : ''}" fill="#EFE4C8"/>
        <path d="M-26 -17h10l1 7h20l3-4h8l8 2-4 4q-3 12-18 13H-14q-10-1-12-10z" fill="${SCK.wood}"/>`, R(1.5 / s)) + `<path d="M-25 -7q22 4 44-1" stroke="${SCK.gold}" stroke-width="${R(1.8 / s)}" fill="none"/></g>`;
      const fire = (x, y) => `<g transform="translate(${x} ${y})"><path d="M3 -15a5 5 0 0 1 8-5a5 5 0 0 1 9 2a4 4 0 0 1 2 7z" fill="#8E9696" opacity=".8"/>`
        + SCH.g(`<path d="M-1 -2V-22" stroke-width="1.2"/><path d="M-13 -5l3 2h20l3-3-3 8H-9z" fill="#4A3020"/><path d="M-10 -3q-2-7 2-11q1 4 3 3q-1-8 4-12q1 6 4 8q1-3 0-6q6 6 3 18z" fill="${SCK.red}"/>`, 1.2)
        + `<path d="M-5 -4q0-4 2-6q1 3 2 2q0-4 3-6q1 5 2 6q1 2-1 4z" fill="${SCK.goldHi}"/></g>`;
      return SCH.bg('#C8CDC8') + `<ellipse cx="86" cy="10" rx="26" ry="4" fill="${SCK.white}" opacity=".5"/>`
        + SCH.g(`<path d="M-2 35V27q8-5 16-3q10-4 20 1l6 10z" fill="#F1EBDC"/>`, 1.2) + `<path d="M-2 27q8-5 16-3q10-4 20 1" stroke="${SCK.green}" stroke-width="2.4" fill="none"/>`
        + `<path d="M0 35h120v45H0z" fill="#6F8794"/><path d="M4 42h20M60 38h14M90 37h20M40 50h14" stroke="#93A8B2" stroke-width="1.2"/>`
        + gal(40, 41, .3, 0) + gal(108, 42, .4, 0) + gal(62, 46, .5, 1) + gal(88, 57, .8, 1)
        + SCH.waves(66, '#93A8B2', 1.2)
        + fire(16, 66) + fire(42, 74);
    } },

  /* a Dutch East Indiaman with its high gilt stern moored at the quay; brick warehouses with stepped gables hoist a crate, barrels and bales stacked below */
  porto_amsterda: {
    label: 'Um navio mercante sendo carregado num cais com armazéns de frontões escalonados',
    rx: /\b(amsterda|amsterdam|fluyt|indiaman)\b/,
    draw: () => {
      const R = v => Math.round(v * 10) / 10;
      const gab = (x, w, e, t) => { const n = 3, sx = R(w / 2 / (n + 1)), sy = R((e - t) / (n + 1)); let d = `M${x} 58V${e}`; for (let i = 0; i < n; i++) d += `h${sx}v-${sy}`; d += `v-${sy}h${R(w - 2 * n * sx)}`; for (let i = 0; i < n; i++) d += `v${sy}h${sx}`; return d + `V58z`; };
      const win = (x, y) => `M${x} ${y}h4v5h-4z`;
      return SCH.bg('#C7D6D8') + `<ellipse cx="96" cy="8" rx="18" ry="3" fill="${SCK.white}" opacity=".6"/>`
        + SCH.g(`<path d="${gab(1, 18, 24, 8)}" fill="#A0503A"/><path d="${gab(19, 20, 20, 3)}" fill="#8A3E2C"/><path d="${gab(39, 17, 26, 12)}" fill="#B0613F"/>`, 1.5)
        + `<path d="${[[4, 28], [12, 28], [4, 38], [12, 38], [22, 24], [33, 24], [22, 34], [33, 34], [42, 30], [50, 30], [42, 40], [50, 40]].map(([x, y]) => win(x, y)).join('')}" fill="${SCK.white}"/>`
        + `<path d="${[[5, 29], [13, 29], [5, 39], [13, 39], [23, 25], [34, 25], [23, 35], [34, 35], [43, 31], [51, 31], [43, 41], [51, 41]].map(([x, y]) => `M${x} ${y}h2v3.4h-2z`).join('')}" fill="#3B3A3E"/>`
        + `<path d="M27.6 12h4.8v6h-4.8zM27.6 24h4.8v6h-4.8zM27.6 36h4.8v6h-4.8zM7.6 46h4.8v12H7.6zM45.6 48h4.8v10h-4.8z" fill="#2F4A3A" stroke="${SCK.ink}" stroke-width=".8"/>`
        + `<path d="M1 50h18M19 46h20M39 52h17M3 18h14M41 22h13" stroke="${SCK.ink}" stroke-width=".7" opacity=".35"/>`
        + SCH.g(`<path d="M30 6h7M36 6v20" fill="none" stroke-width="1.2"/><path d="M33 26h6v5h-6z" fill="${SCK.ochre}" stroke-width="1.1"/>`, 1)
        + SCH.g(`<path d="M-1 58h66v6H-1z" fill="${SCK.stone}"/><path d="M-1 64h66v3H-1z" fill="${SCK.stoneLo}"/>
          <ellipse cx="12" cy="53.6" rx="3.4" ry="4.6" fill="${SCK.wood}"/><ellipse cx="19" cy="53.6" rx="3.4" ry="4.6" fill="${SCK.wood}"/><ellipse cx="15.6" cy="45.6" rx="3.4" ry="4.4" fill="${SCK.wood}"/>
          <path d="M24 50h9v8h-9zM26 43h7v7h-7z" fill="${SCK.sand}"/><path d="M52 52q4-3 8 0v6h-8z" fill="${SCK.parch}" stroke-width="1.1"/>`, 1.2)
        + `<path d="M9 52h6M16 52h6M12.4 44h6.4M24 54h9" stroke="${SCK.ink}" stroke-width=".8" opacity=".55"/>`
        + `<path d="M0 67h120v13H0z" fill="${SCK.sea}"/>`
        + `<path d="M70 30V10M86 38V3M104 35V8M112 36L119 29" stroke="${SCK.ink}" stroke-width="1.8"/><path d="M86 4L113 36M86 4L64 27M104 9L118 31M70 11L61 26" stroke="${SCK.ink}" stroke-width=".6" opacity=".55"/>`
        + SCH.g(`<path d="M75 23h22v3.4H75zM79 11h14v3H79zM95 17h18v3H95zM98 8h12v2.6H98z" fill="${SCK.parch}"/><path d="M62 24L76 12" stroke-width="3.6"/>`, 1)
        + `<path d="M62 24L76 12" stroke="${SCK.parch}" stroke-width="1.8" stroke-linecap="round"/>`
        + SCH.g(`<path d="M60 26h8l2 4 4 2v6h30l6-3h6l-2 6q-4 14-24 18H70q-8-1-10-10z" fill="#4E3422"/>`, 1.6)
        + `<path d="M63 26v-3h4v3" fill="${SCK.goldHi}" stroke="${SCK.ink}" stroke-width=".8"/><path d="M61 46q28 6 52-5M62 51q24 5 44-1" stroke="${SCK.gold}" stroke-width="1.6" fill="none"/><path d="M61 30h7M61 34h9" stroke="${SCK.gold}" stroke-width="1.4"/>`
        + `<path d="M76 42h3v2.6h-3zM84 42h3v2.6h-3zM92 42h3v2.6h-3zM100 41.4h3v2.6h-3z" fill="${SCK.gold}"/><path d="M62.6 37h2.4v4h-2.4zM66 37h2.4v4H66z" fill="${SCK.goldHi}" stroke="${SCK.ink}" stroke-width=".7"/>`
        + SCH.g(`<path d="M86 24V34" fill="none" stroke-width="1"/><path d="M83 34h6v5h-6z" fill="${SCK.ochre}" stroke-width="1.1"/>`, 1)
        + `<path d="M64 62q24 4 46-2v4q-22 6-46 2z" fill="#3E6478"/>` + SCH.waves(70, '#7FA3B8', 1.3) + SCH.waves(77, '#6D95AD', 1.3);
    } },

  /* a portolan chart of the Atlantic: the coasts of Guinea and of the bulge of Brazil, painted islands, rhumb lines from a compass rose, a small nau, and the red meridian */
  tordesilhas: {
    label: 'Um mapa antigo do Atlântico cortado por uma linha vertical, com ilhas e uma rosa dos ventos',
    rx: /\b(tordesilhas|meridiano|linha do tratado)\b/,
    draw: () => {
      const R = v => Math.round(v * 10) / 10, fc = SCH.uid('fc'), cx = 60, cy = 16;
      let rh = '', d1 = '', d2 = '';
      for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8; rh += `M${cx} ${cy}L${R(cx + Math.cos(a) * 140)} ${R(cy + Math.sin(a) * 140)}`; }
      for (const k of [1, 0]) for (let i = k; i < 8; i += 2) { const a = i * Math.PI / 4 - Math.PI / 2, L = k ? 7 : 12, w = 2.4;
        const t = `L${R(cx + Math.cos(a) * L)} ${R(cy + Math.sin(a) * L)}`;
        d1 += `M${cx} ${cy}${t}L${R(cx + Math.cos(a - Math.PI / 4) * w)} ${R(cy + Math.sin(a - Math.PI / 4) * w)}z`;
        d2 += `M${cx} ${cy}${t}L${R(cx + Math.cos(a + Math.PI / 4) * w)} ${R(cy + Math.sin(a + Math.PI / 4) * w)}z`; }
      return SCH.bg(SCK.parch) + `<clipPath id="${fc}"><path d="M4 4h112v72H4z"/></clipPath><g clip-path="url(#${fc})">`
        + `<path d="${rh}" stroke="${SCK.ink}" stroke-width=".5" opacity=".35"/>`
        + SCH.g(`<path d="M98 -2L96 3L91 6L89 9L85 18L84 26L86 34L91 38L100 44L110 43L122 42V-2z" fill="#D9BF86"/>
          <path d="M-2 34L11 34L14 38L19 40L24 42L28 43L30 46L32 51L34 53L41 55L50 57L56 60L56 64L55 67L50 72L50 75L49 82H-2z" fill="#D9BF86"/>`, 1.4)
        + `<path d="M100 20l3-5 3 5M106 26l3-5 3 5M14 60l3-5 3 5M24 66l3-5 3 5" fill="none" stroke="${SCK.ink}" stroke-width="1" opacity=".6"/><path d="M112 34v4M28 52v4" stroke="${SCK.ink}" stroke-width="1"/><circle cx="112" cy="32" r="2.4" fill="${SCK.green}"/><circle cx="28" cy="50" r="2.4" fill="${SCK.green}"/>`
        + SCH.g(`<ellipse cx="72" cy="24" rx="1.8" ry="1.3" fill="${SCK.red}"/><ellipse cx="75.6" cy="24.6" rx="1.6" ry="1.4" fill="${SCK.gold}"/><ellipse cx="74.4" cy="28" rx="2" ry="1.4" fill="${SCK.sea}"/><ellipse cx="70.6" cy="28.2" rx="1.4" ry="1.2" fill="${SCK.red}"/>
          <ellipse cx="85" cy="6" rx="1.6" ry="1.1" fill="${SCK.gold}"/><ellipse cx="89" cy="5.6" rx="1.4" ry="1" fill="${SCK.red}"/><ellipse cx="7" cy="21" rx="2.6" ry="1.4" fill="${SCK.red}"/><ellipse cx="14" cy="26" rx="1.3" ry="1.6" fill="${SCK.gold}"/><ellipse cx="15" cy="30" rx="1.2" ry="1.4" fill="${SCK.sea}"/>`, .9)
        + `<path d="M38 2V78" stroke="${SCK.ink}" stroke-width="4.4"/><path d="M38 2V78" stroke="${SCK.red}" stroke-width="2.6"/>`
        + `<circle cx="${cx}" cy="${cy}" r="9" fill="none" stroke="${SCK.ink}" stroke-width=".8"/><path d="${d1}" fill="${SCK.red}"/><path d="${d2}" fill="${SCK.white}"/><path d="${d1}${d2}" fill="none" stroke="${SCK.ink}" stroke-width=".7" stroke-linejoin="round"/><circle cx="${cx}" cy="${cy}" r="1.6" fill="${SCK.gold}" stroke="${SCK.ink}" stroke-width=".7"/>`
        + `<g transform="translate(66 50) scale(-1.1 1.1)">` + SCH.g(`<path d="M-1 -2V-16M5 -2V-11M-6 -2V-10" stroke-width=".9"/><path d="M-5 -14h8q1 3.5 0 7h-8q-1-3.5 0-7zM2.4 -10h5q.8 2.5 0 5h-5q-.8-2.5 0-5zM-10 -3l4-6v6z" fill="${SCK.white}"/><path d="M-9 -4h4l1 2h9l2-2h3l-2 4q-2 3-6 3h-7q-3 0-4-3z" fill="${SCK.wood}"/>`, .9)
        + `<path d="M-2 -12v3M-3.4 -10.6h3" stroke="${SCK.red}" stroke-width="1.4"/></g>`
        + `<path d="M50 56q3-1.4 6 0t6 0M70 56q3-1.4 6 0t6 0" stroke="${SCK.sea}" stroke-width="1" fill="none"/></g>`
        + `<path d="M4 4h112v72H4z" fill="none" stroke="${SCK.ink}" stroke-width="1.4"/><path d="M6.4 6.4h107.2v67.2H6.4z" fill="none" stroke="${SCK.ink}" stroke-width=".6"/>`;
    } },
  /* Florence from the hills: the ribbed brick dome on its drum with the white lantern, Giotto's banded bell tower, red roofs, cypresses */
  ev_renascimento: {
    label: 'A grande cúpula de tijolo vermelho sobre os telhados de Florença',
    rx: /\b(renascimento|renascenca|florenca|duomo|cupula de florenca)\b/,
    ev: 'renascimento',
    draw: () => {
      const house = (x, y, w, c) => `<path d="M${x} 82V${y}h${w}V82z" fill="${c}"/><path d="M${x - 2} ${y}l4-5h${w - 4}l4 5z" fill="#B5532F"/>`;
      const wins = [[3, 67], [12, 67], [24, 71], [32, 71], [45, 65], [55, 65], [68, 69], [86, 65], [95, 65], [108, 71]].map(([x, y]) => `M${x} ${y}h3v4h-3z`).join('');
      return SCH.bg('#CFE0E2') + `<path d="M0 40q16-10 34-6t36-4 50-2v24H0z" fill="#B3BE92"/><path d="M0 50q20-8 40-4t40-2 40-4v20H0z" fill="#8C9A62"/>`
        + SCH.g(`<path d="M7 48q0-9 3-15q3 6 3 15zM14 48q0-6 2.4-11q2.4 5 2.4 11zM107 44q0-9 3-15q3 6 3 15z" fill="${SCK.olive}"/>`, 1.1)
        + SCH.g(`<path d="M16 60V52h16v-4h52v4h8v8z" fill="#EFE8D6"/><path d="M33 48V40h50v8z" fill="#EFE8D6"/>
          <path d="M34 40C34 24 46 16 54 13h8c8 3 20 11 20 27z" fill="#C0623A"/><path d="M54 13V7h8v6z" fill="${SCK.white}"/><path d="M53 7l5-3.6 5 3.6z" fill="${SCK.stone}" stroke-width="1.2"/>`, 1.6)
        + `<path d="M38 32q20-4 40 0M42 24q16-4 32 0M36 38q22-4 44 0" stroke="${SCK.ink}" stroke-width=".7" opacity=".35" fill="none"/><path d="M56 7.4v5M58 7.4v5M60 7.4v5" stroke="${SCK.ink}" stroke-width=".7"/>`
        + `<path d="M58 13V40M54.6 13.4Q45 22 44 40M61.4 13.4Q71 22 72 40" stroke="${SCK.ink}" stroke-width="3.6" fill="none"/><path d="M58 13V40M54.6 13.4Q45 22 44 40M61.4 13.4Q71 22 72 40" stroke="${SCK.white}" stroke-width="1.8" fill="none"/>`
        + `<circle cx="58" cy="2.4" r="1.2" fill="${SCK.gold}" stroke="${SCK.ink}" stroke-width=".6"/><path d="M33 41h50M33 47h50M16 53h76" stroke="${SCK.olive}" stroke-width="1"/><path d="M41.6 44a2 2 0 1 0 .1 0zM57.6 44a2 2 0 1 0 .1 0zM73.6 44a2 2 0 1 0 .1 0z" fill="#3B3A3E"/>`
        + SCH.g(`<path d="M90 66V10h12v56z" fill="#F1EADA"/><path d="M88 10V6.6h16V10z" fill="${SCK.stone}" stroke-width="1.2"/>`, 1.5)
        + `<path d="M91 11v55M101 11v55" stroke="${SCK.olive}" stroke-width="1.6"/><path d="M90 26h12M90 40h12M90 54h12" stroke="#C98A8A" stroke-width="2"/>`
        + `<path d="M93 23v-8q3-4 6 0v8zM94 36v-5q2-3 4 0v5zM94 50v-5q2-3 4 0v5z" fill="#3B3A3E"/>`
        + SCH.g(house(-2, 62, 22, '#E6CC9A') + house(20, 66, 20, '#D9B47A') + house(40, 60, 24, '#EDD9AE') + house(64, 64, 18, '#E0BE86') + house(82, 60, 22, '#E6CC9A') + house(104, 66, 18, '#D9B47A'), 1.3)
        + `<path d="${wins}" fill="#5A3A22"/><path d="M2 59h16M44 57h16M86 57h16" stroke="${SCK.ink}" stroke-width=".7" opacity=".4"/>`;
    } },

  /* the church door at Wittenberg: a pointed stone portal, oak leaves with iron straps, a sheet nailed up; the hammer on the step, a candle burning */
  ev_reforma: {
    label: 'Uma folha pregada na porta de madeira de uma igreja, com o martelo ao lado',
    rx: /\b(reforma protestante|teses|wittenberg|porta da igreja)\b/,
    ev: 'reforma',
    draw: () => SCH.bg('#D3C8AE')
      + `<path d="M0 12h120M0 26h120M0 40h120M0 54h120M8 0v12M100 0v12M14 12v14M110 12v14M6 26v14M104 26v14M16 40v14M112 40v14M8 54v16M106 54v16" stroke="${SCK.ink}" stroke-width=".7" opacity=".25"/>`
      + SCH.g(`<path d="M24 70V34Q24 8 60 2Q96 8 96 34V70z" fill="#BCAF92"/><path d="M31 70V36Q31 14 60 8Q89 14 89 36V70z" fill="${SCK.stone}"/>
        <path d="M38 70V38Q38 20 60 14Q82 20 82 38V70z" fill="#7A4A28"/>`, 1.6)
      + `<path d="M60 14V70M44 30V70M50 22V70M55 17V70M65 17V70M70 22V70M76 30V70" stroke="${SCK.ink}" stroke-width=".8" opacity=".45"/>`
      + `<path d="M38 32h18q2-3 4 0M38 60h18q2-3 4 0M82 32H64M82 60H64" stroke="#2A2A2E" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M41 29v6M41 57v6M79 29v6M79 57v6" stroke="#2A2A2E" stroke-width="1.6"/>`
      + `<circle cx="56" cy="48" r="2.4" fill="none" stroke="#2A2A2E" stroke-width="1.4"/>`
      + `<g transform="rotate(3 64 40)">` + SCH.g(`<path d="M52 26h24v30H52z" fill="${SCK.paper}"/><path d="M71 56l5-5v5z" fill="${SCK.parch}" stroke-width=".8"/>`, 1.2)
      + `<path d="M56 30h16" stroke="${SCK.ink}" stroke-width="1.6"/><path d="M55 34.6h18M55 37.6h16M55 40.6h18M55 43.6h14M55 46.6h18M55 49.6h15M55 52.6h10" stroke="${SCK.ink}" stroke-width=".8" opacity=".5"/><circle cx="64" cy="27.6" r="1.1" fill="${SCK.ink}"/></g>`
      + SCH.g(`<path d="M16 70h88v4H16z" fill="${SCK.stone}"/><path d="M6 74h108v8H6z" fill="${SCK.stoneLo}"/>`, 1.4)
      + SCH.g(`<path d="M10 66.4h24v3H10z" fill="${SCK.wood}"/><path d="M32 62h6v8.4h-6zM38 64l3.4 2-3.4 2z" fill="#6B6E73"/>`, 1.2)
      + `<circle cx="98" cy="49" r="7" fill="${SCK.goldHi}" opacity=".35"/>` + SCH.g(`<path d="M96 66V53h4v13z" fill="${SCK.white}"/><path d="M92 70l2-4h8l2 4z" fill="${SCK.gold}"/>`, 1.2)
      + `<path d="M98 53v-2" stroke="${SCK.ink}" stroke-width="1"/><path d="M98 51q-2.4-3 0-7q2.4 4 0 7z" fill="${SCK.gold}" stroke="${SCK.goldLo}" stroke-width=".6"/>` },

  /* a wooden screw press: the twin cheeks and head, the iron screw and its bar, the tympan raised with a fresh sheet; the case of metal sorts and the ink balls in front */
  prensa_tipos: {
    label: 'Uma prensa de madeira de parafuso, com uma caixa de tipos móveis',
    rx: /\b(prensa|imprensa|tipos moveis|tipografia)\b/,
    draw: () => {
      let dots = '';
      for (let i = 0; i < 26; i++) dots += `M${5 + (i * 37 % 36)} ${62.6 + (i * 7 % 12)}h1.2`;
      return SCH.bg('#E2D3B0') + `<path d="M0 70h120v10H0z" fill="#9C7048"/><path d="M0 70h120" stroke="${SCK.ink}" stroke-width="1.2"/>`
        + `<path d="M78 4q20 3 40 0" stroke="${SCK.ink}" stroke-width=".8" fill="none"/>` + SCH.g(`<path d="M82 4.6h10v13H82zM98 5h10v13H98z" fill="${SCK.paper}"/>`, 1)
        + `<path d="M84 8h6M84 10.6h6M84 13.2h4M100 8.4h6M100 11h6M100 13.6h4" stroke="${SCK.ink}" stroke-width=".6" opacity=".5"/>`
        + SCH.g(`<path d="M24 74V6h7v68zM65 74V6h7v68z" fill="${SCK.wood}"/><path d="M18 4h60v7H18z" fill="#6E4426"/><path d="M20 18h56v6H20z" fill="#6E4426"/>
          <path d="M44 11h8v24h-8z" fill="#8C9096"/><path d="M34 35h28v5H34z" fill="${SCK.wood}"/>
          <path d="M74 48L84 20h20l-8 28z" fill="#6E4426"/><path d="M79 45l7-22h14l-6 22z" fill="${SCK.paper}" stroke-width="1"/>
          <path d="M18 48h96v5H18z" fill="#6E4426"/><path d="M30 44h36v4H30z" fill="#7C8188"/><path d="M106 53h5v19h-5zM24 58h48v5H24z" fill="${SCK.wood}"/><path d="M14 72h66v4H14z" fill="#6E4426"/>`, 1.5)
        + `<path d="M44 14l8-2M44 18l8-2M44 22l8-2M44 26l8-2M44 30l8-2" stroke="${SCK.ink}" stroke-width="1"/><path d="M83 28h10M82 31h12M81 34h8M80 37h12M79 40h10" stroke="${SCK.ink}" stroke-width=".7" opacity=".5"/>`
        + `<path d="M26 10v60M69 10v60" stroke="${SCK.ink}" stroke-width=".7" opacity=".35"/><path d="M32 46h32" stroke="${SCK.ink}" stroke-width=".8" stroke-dasharray="1.6 1" opacity=".7"/>`
        + SCH.g(`<path d="M48 27L10 36" stroke-width="5" fill="none"/>`, 1) + `<path d="M48 27L10 36" stroke="#8C9096" stroke-width="2.6"/>` + SCH.g(`<path d="M5 33.4l6-1.4 1.4 6-6 1.4z" fill="${SCK.wood}"/>`, 1.2)
        + SCH.g(`<path d="M4 60h40l-2 16H2z" fill="${SCK.wood}"/><path d="M6 62h36l-1.4 12H4.6z" fill="#7C8188" stroke-width=".9"/>`, 1.5)
        + `<path d="${dots}" stroke="#C3C7CC" stroke-width="1.2"/><path d="M5.6 66h36M5 70h36M12 62l-.4 4M18 62l-.4 4M24 62l-.4 4M30 62l-.4 4M36 62l-.4 4M16 66l-.6 8M29 66l-.6 8M10 70l-.3 4M22 70l-.3 4M35 70l-.3 4" stroke="${SCK.wood}" stroke-width="1.2"/>`
        + SCH.g(`<path d="M81 63h22v7H81z" fill="${SCK.wood}"/><path d="M82 61.4h20V63H82z" fill="#1E1A18" stroke-width=".9"/>
          <path d="M83 61.4q0-5 5-5t5 5zM91.6 61.4q0-5 5-5t5 5z" fill="#5A3A26"/><path d="M87 56.4v-2.4h2v2.4zM95.6 56.4v-2.4h2v2.4z" fill="${SCK.wood}" stroke-width="1"/>`, 1.2)
        + `<path d="M84.6 59.6q3.4-2.4 6.8 0M93.2 59.6q3.4-2.4 6.8 0M83 66h20" stroke="#A0805A" stroke-width=".8" fill="none"/>`;
    } },

  /* a brass orrery by night: the gold Sun on its column, planets on their arms, Jupiter with four moons and ringed Saturn; a telescope on its tripod aimed out of the window at the cratered Moon */
  ev_revolucao_cientifica: {
    label: 'Um planetário de latão com o Sol no centro e uma luneta apontada para a Lua',
    rx: /\b(revolucao cientifica|heliocentrico|heliocentrismo|sistema solar|planetario|orrery|telescopio|telescopios|luneta|lunetas)\b/,
    ev: 'revolucao_cientifica',
    draw: () => SCH.bg('#3A3046') + `<path d="M0 70h120v10H0z" fill="#5A3E2A"/><path d="M0 70h120" stroke="${SCK.ink}" stroke-width="1.2"/>`
      + SCH.g(`<path d="M68 60V24q0-18 23-18t23 18v36z" fill="${SCK.stone}"/><path d="M73 58V25q0-14 18-14t18 14v33z" fill="#1E2A44"/><path d="M64 58h52v4H64z" fill="${SCK.stoneLo}"/>`, 1.6)
      + `<path d="M78 30h.1M84 16h.1M104 44h.1M80 48h.1M106 32h.1M100 52h.1" stroke="${SCK.white}" stroke-width="1.4" stroke-linecap="round"/>`
      + `<circle cx="96" cy="26" r="9" fill="#EDE6C8" stroke="${SCK.ink}" stroke-width="1.2"/><path d="M95 23a2.4 2.4 0 1 0 .1 0zM100.4 29a1.6 1.6 0 1 0 .1 0zM92 29.6a1.2 1.2 0 1 0 .1 0zM99 20.4a1 1 0 1 0 .1 0z" fill="#C9C0A0"/>`
      + SCH.g(`<path d="M80 52L70 74M80 52v22M80 52l10 22" stroke-width="2" fill="none"/>`, 1) + `<path d="M80 52L70 74M80 52v22M80 52l10 22" stroke="${SCK.wood}" stroke-width=".9"/>`
      + SCH.g(`<path d="M60.9 61.3L93.4 41.2 90.6 37 59.1 58.7z" fill="${SCK.burg}"/><path d="M93.6 41.6l2-1.4-3.4-5-2 1.4z" fill="${SCK.gold}" stroke-width="1"/><path d="M57.6 62.4l3-2-1.6-2.4-3 2z" fill="${SCK.goldLo}" stroke-width="1"/>`, 1.4)
      + `<path d="M70.8 54.4l-1.8-2.6M82 47.4l-1.8-2.6" stroke="${SCK.gold}" stroke-width="1.4"/>`
      + `<path d="M8 40a28 7 0 0 1 56 0" stroke="${SCK.ink}" stroke-width="3" fill="none"/><path d="M8 40a28 7 0 0 1 56 0" stroke="${SCK.goldLo}" stroke-width="1.4" fill="none"/>`
      + `<path d="M36 40L20 24M36 40L57 31M36 40L13 46M36 40l14 6" stroke="${SCK.goldHi}" stroke-width="1"/>`
      + SCH.g(`<path d="M27 74l3-5h12l3 5z" fill="${SCK.wood}"/><path d="M34 69V44h4v25z" fill="${SCK.goldLo}"/>
        <circle cx="36" cy="39" r="6.4" fill="${SCK.gold}"/><circle cx="57" cy="31" r="4" fill="#D9B48A"/><circle cx="13" cy="46" r="2.8" fill="${SCK.sea}"/><circle cx="50" cy="46" r="2" fill="#B5532F"/>
        <circle cx="20" cy="24" r="3" fill="${SCK.sand}"/>`, 1.3)
      + `<path d="M14 25.6l12-3.2" stroke="${SCK.ink}" stroke-width="2.6"/><path d="M14 25.6l12-3.2" stroke="${SCK.goldHi}" stroke-width="1.2"/>`
      + `<path d="M54 30.2h6M54 32h6" stroke="#9A6A44" stroke-width=".8"/><path d="M49.4 31h.1M51.6 31h.1M62.6 31h.1M65 31h.1M9.6 43h.1" stroke="${SCK.white}" stroke-width="1.4" stroke-linecap="round"/>`
      + `<path d="M33 36q2-3 5-2.4" stroke="${SCK.goldHi}" stroke-width="1.2" fill="none"/>`
      + `<path d="M8 40a28 7 0 0 0 56 0" stroke="${SCK.ink}" stroke-width="3" fill="none"/><path d="M8 40a28 7 0 0 0 56 0" stroke="${SCK.gold}" stroke-width="1.4" fill="none"/>` },

  /* Folly's cap: a three-pointed jester's hood with its bells lying on an open book, a quill in the inkwell, a candle, a Gothic window */
  gorro_bobo: {
    label: 'Um gorro de bobo com guizos sobre um livro aberto',
    rx: /\b(bobo|guizos|gorro de bobo)\b/,
    draw: () => SCH.bg('#D9CBA8')
      + SCH.g(`<path d="M6 46V18q0-12 12-15q12 3 12 15v28z" fill="${SCK.stone}"/><path d="M9.4 44V19q0-9 8.6-12q8.6 3 8.6 12v25z" fill="#7FA3B8"/>`, 1.5)
      + `<path d="M18 7v37M9.4 26h17.2M9.4 35h17.2" stroke="${SCK.ink}" stroke-width="1.2"/><circle cx="18" cy="16" r="3" fill="none" stroke="${SCK.ink}" stroke-width="1"/><path d="M10 20l16 14M26 20L10 34" stroke="${SCK.ink}" stroke-width=".6" opacity=".4"/>`
      + `<path d="M0 60h120v20H0z" fill="${SCK.wood}"/><path d="M0 60h120" stroke="${SCK.ink}" stroke-width="1.4"/><path d="M0 66h120" stroke="#6E4426" stroke-width="1"/>`
      + SCH.g(`<path d="M26 72q20-5 40 1q20-6 40-1l-2-4q-18-4-38 1q-20-5-38-1z" fill="${SCK.burg}"/>
        <path d="M66 70q-16-5-36-1l3-15q16-4 33 2zM66 70q16-5 36-1l-3-15q-16-4-33 2z" fill="${SCK.paper}"/>`, 1.4)
      + `<path d="M36 58q12-2 24 1M35 62q12-2 25 1M34.4 66q12-2 26 1M72 59q12-3 24-1M72 63q12-3 25-1M72 67q12-3 26-1" stroke="${SCK.ink}" stroke-width=".8" opacity=".4" fill="none"/>`
      + SCH.g(`<path d="M50 52Q36 22 28 40Q42 34 58 47z" fill="${SCK.red}"/><path d="M76 49Q92 24 104 40Q90 36 82 54z" fill="${SCK.red}"/>
        <path d="M56 48Q54 6 84 16Q66 18 72 47z" fill="${SCK.gold}"/>
        <path d="M48 53q18-9 36 0q-2 6-18 7q-16-1-18-7z" fill="${SCK.sea}"/>
        <circle cx="28" cy="41" r="3.4" fill="${SCK.goldHi}"/><circle cx="85" cy="16.4" r="3.4" fill="${SCK.goldHi}"/><circle cx="104.4" cy="41" r="3.4" fill="${SCK.goldHi}"/>
        <circle cx="54" cy="57" r="1.8" fill="${SCK.goldHi}" stroke-width="1"/><circle cx="66" cy="59" r="1.8" fill="${SCK.goldHi}" stroke-width="1"/><circle cx="78" cy="57" r="1.8" fill="${SCK.goldHi}" stroke-width="1"/>`, 1.5)
      + `<path d="M26 42.4h4M83 17.8h4M102.4 42.4h4" stroke="${SCK.ink}" stroke-width="1"/><path d="M44 36q4 4 8 11M62 22q2 12 6 25M86 36q-3 6-4 12" stroke="${SCK.ink}" stroke-width=".8" opacity=".35" fill="none"/>`
      + SCH.g(`<path d="M13 70h10v-6q0-3-5-3t-5 3z" fill="#2E3440"/><path d="M19 62Q14 46 4 34Q16 38 19 62z" fill="${SCK.white}"/>`, 1.2) + `<path d="M19 62Q13 46 5 35" stroke="${SCK.ink}" stroke-width=".7" fill="none"/>`
      + `<circle cx="111" cy="30" r="8" fill="${SCK.goldHi}" opacity=".35"/>` + SCH.g(`<path d="M108 66V35h6v31z" fill="${SCK.white}"/><path d="M104 70l2-4h10l2 4z" fill="${SCK.gold}"/>`, 1.2)
      + `<path d="M111 35v-2" stroke="${SCK.ink}" stroke-width="1"/><path d="M111 33q-2.6-3.4 0-8q2.6 4.6 0 8z" fill="${SCK.gold}" stroke="${SCK.goldLo}" stroke-width=".6"/>` },
  /* the Commons in St Stephen's: green benches facing across the floor, the table with the gilt mace, the Speaker's canopied chair under tall windows */
  camara_comuns: {
    label: 'Bancadas frente a frente numa câmara de parlamento, com a maça cerimonial sobre a mesa',
    rx: /\b(camara dos comuns|parlamento|maca cerimonial|bancadas)\b/,
    draw: () => {
      const R = v => Math.round(v * 10) / 10, P = (x, y, s) => `${R(60 + (x - 60) * s)} ${R(30 + (y - 30) * s)}`, B = .35, fc = SCH.uid('fc');
      let face = '', top = '', beam = '', win = '';
      for (const [x, y] of [[10, 50], [24, 58], [38, 66]]) for (const X of [v => v, v => 120 - v]) {
        face += `M${P(X(x), y, 1)}L${P(X(x), y, B)}L${P(X(x), y + 8, B)}L${P(X(x), y + 8, 1)}z`;
        top += `M${P(X(x), y, 1)}L${P(X(x), y, B)}L${P(X(x - 14), y, B)}L${P(X(x - 14), y, 1)}z`; }
      for (let x = 10; x < 120; x += 20) beam += `M${P(x, 0, 1)}L${P(x, 0, B)}`;
      for (const [a, b] of [[.9, .7], [.56, .46]]) for (const x of [0, 120]) win += `M${P(x, 44, a)}L${P(x, 12, a)}Q${P(x, 2, (a + b) / 2)} ${P(x, 12, b)}L${P(x, 44, b)}z`;
      return SCH.bg('#D8CCB0') + `<clipPath id="${fc}"><path d="M0 0h120v80H0z"/></clipPath><g clip-path="url(#${fc})">`
        + SCH.g(`<path d="M0 0h120L81 19.5H39z" fill="#6E4426"/><path d="M39 19.5h42v26H39z" fill="#C9B48A"/>`, 1.4)
        + `<path d="${beam}M${P(0, 0, .7)}H${P(120, 0, .7).split(' ')[0]}M${P(0, 0, .5)}H${P(120, 0, .5).split(' ')[0]}" stroke="${SCK.ink}" stroke-width="1.2" opacity=".6"/>`
        + SCH.g(`<path d="${win}M42 38V25a3.5 3.5 0 0 1 7 0v13zM71 38V25a3.5 3.5 0 0 1 7 0v13z" fill="#DCE8EA"/>`, 1.2)
        + `<path d="M45.5 22v16M74.5 22v16M42 31h7M71 31h7" stroke="${SCK.ink}" stroke-width=".7"/>`
        + SCH.g(`<path d="M54 46V29h12v17z" fill="#4E3422"/><path d="M52 29l2-5h12l2 5z" fill="${SCK.green}"/><path d="M57 46v-9h6v9z" fill="${SCK.green}" stroke-width="1"/>`, 1.2)
        + `<path d="M60 24v-3" stroke="${SCK.gold}" stroke-width="2"/><circle cx="60" cy="20.4" r="1.4" fill="${SCK.gold}"/>`
        + `<path d="M0 74L39 45.4h42L120 74v6H0z" fill="#B59C72"/>`
        + SCH.g(`<path d="${face}" fill="${SCK.wood}"/><path d="${top}" fill="#4E7A4A"/>`, 1.2)
        + SCH.g(`<path d="M45 50h30l5 11H40z" fill="${SCK.wood}"/><path d="M40 61h40v3.6H40z" fill="#6E4426"/><path d="M43 64.6v8.4M77 64.6v8.4" fill="none" stroke-width="2"/>
          <path d="M45 56h20" stroke-width="5" fill="none"/>`, 1.2)
        + `<path d="M45 56h20" stroke="${SCK.gold}" stroke-width="2.8" stroke-linecap="round"/><path d="M50 54v4M55.6 54v4M61 54v4" stroke="${SCK.goldLo}" stroke-width="1.6"/>`
        + SCH.g(`<path d="M64 54.4l7-2.8v8.8l-7-2.8z" fill="${SCK.gold}"/><path d="M71 51.6q5.6.4 5.6 4.4T71 60.4z" fill="${SCK.gold}"/><circle cx="78.2" cy="56" r="1.4" fill="${SCK.gold}" stroke-width="1"/>`, 1.2)
        + `<path d="M79.6 56h2.2M80.8 54.8v2.4" stroke="${SCK.ink}" stroke-width="1"/><path d="M73 52.6v6.8" stroke="${SCK.red}" stroke-width="1.4"/><path d="M46 55h18" stroke="${SCK.goldHi}" stroke-width=".8"/></g>`;
    } },

  /* the Hall of Mirrors down its length: tall windows on the left, arched mirrors answering them on the right, crystal chandeliers under the gilded painted vault, a parquet floor */
  versalhes_espelhos: {
    label: 'Uma longa galeria de espelhos com lustres de cristal e teto dourado',
    rx: /\b(versalhes|galeria dos espelhos|espelhos|lustres)\b/,
    draw: () => {
      const R = v => Math.round(v * 10) / 10, P = (x, y, s) => `${R(60 + (x - 60) * s)} ${R(40 + (y - 40) * s)}`, S = d => 1 / (1 + .35 * d), fc = SCH.uid('fc');
      let win = '', mir = '', pil = '', vault = '', rib = '', par = '', grid = '';
      for (let i = 0; i < 3; i++) { const a = S(2 * i + .4), b = S(2 * i + 1.4), m = S(2 * i + .9), c = S(2 * i + 1.6), e = S(2 * i + 2.2);
        const q = x => `M${P(x, 72, a)}L${P(x, 36, a)}Q${P(x, 24, m)} ${P(x, 36, b)}L${P(x, 72, b)}z`;
        win += q(0); mir += q(120);
        grid += `M${P(120, 54, a)}L${P(120, 54, b)}M${P(120, 72, m)}L${P(120, 32, m)}`;
        for (const x of [0, 120]) pil += `M${P(x, 22, c)}L${P(x, 22, e)}L${P(x, 78, e)}L${P(x, 78, c)}z`; }
      const ks = [1, .78, .6, .46, .36, .25];
      ks.forEach((k, i) => { const arc = `${P(0, 20, k)}Q${P(60, -26, k)} ${P(120, 20, k)}`; rib += 'M' + arc; if (i % 2 === 0) vault += `M${arc}L${P(120, 20, ks[i + 1])}Q${P(60, -26, ks[i + 1])} ${P(0, 20, ks[i + 1])}z`; });
      for (let x = -48; x <= 168; x += 24) par += `M${x} 80L${P(x, 80, .25)}`;
      for (const k of [.8, .6, .46, .36]) par += `M0 ${R(40 + 38 * k)}H120`;
      const ch = (y, k) => `<g transform="translate(60 ${y}) scale(${k})">` + SCH.g(`<path d="M0 -32V-13" fill="none"/><path d="M-3 -14h6l1 3h-8z" fill="${SCK.gold}"/>
        <path d="M-13 -7q1 12 13 18q12-6 13-18z" fill="${SCK.white}"/><path d="M-2 10.4l2 5 2-5z" fill="${SCK.white}"/><path d="M-12 -2V-9M-6 -1.4V-10M0 -1V-10.4M6 -1.4V-10M12 -2V-9" fill="none" stroke-width="${R(2.8 / k)}"/><ellipse cy="-7" rx="13.6" ry="3" fill="${SCK.gold}"/>`, R(1.1 / k))
        + `<path d="M-12 -9.4V-11M-6 -10V-12M0 -10.4V-12.4M6 -10V-12M12 -9.4V-11" stroke="${SCK.white}" stroke-width="${R(1.6 / k)}"/><path d="M-12 -13h.1M-6 -14h.1M0 -14.6h.1M6 -14h.1M12 -13h.1" stroke="${SCK.goldHi}" stroke-width="${R(2.6 / k)}" stroke-linecap="round"/>`
        + `<path d="M-7 -3q2 7 7 12M7 -3q-2 7-7 12M0 -3v13" stroke="#9FB8C2" stroke-width="${R(.9 / k)}" fill="none"/><path d="M-11.4 -1q11.4 7 22.8 0" stroke="${SCK.goldLo}" stroke-width="${R(1.4 / k)}" stroke-dasharray="${R(.8 / k)} ${R(1 / k)}" fill="none"/></g>`;
      return SCH.bg('#EADFC6') + `<clipPath id="${fc}"><path d="M0 0h120v80H0z"/></clipPath><g clip-path="url(#${fc})">`
        + `<path d="M0 -2h120v22L75 35H45L0 20z" fill="${SCK.gold}"/><path d="${vault}" fill="#9A4A3A" opacity=".55"/><path d="${rib}" stroke="${SCK.goldHi}" stroke-width="2.4" fill="none"/>`
        + `<path d="M0 78L45 49.5h30L120 78v2H0z" fill="#B07A48"/><path d="${par}" stroke="#7A4E2C" stroke-width=".8" opacity=".7"/>`
        + `<path d="M0 20L45 35v14.5L0 78zM120 20L75 35v14.5L120 78zM45 35h30v14.5H45z" fill="#EFE6D2" stroke="${SCK.ink}" stroke-width="1"/><path d="${pil}" fill="${SCK.burg}"/><path d="M55 49.5V41q5-6 10 0v8.5z" fill="#DCE8EA" stroke="${SCK.ink}" stroke-width=".8"/>`
        + `<path d="${win}" fill="#E8F1F2" stroke="${SCK.goldLo}" stroke-width="1.6"/><path d="${mir}" fill="#9DB3BC" stroke="${SCK.goldLo}" stroke-width="1.6"/><path d="${grid}" stroke="${SCK.goldHi}" stroke-width=".8"/>`
        + ch(31, .4) + ch(17, .9) + '</g>';
    } },

  /* Schönbrunn from the parterre: the long yellow palace with green shutters, beds and a fountain in front, the Gloriette's colonnade on the hill behind */
  schonbrunn: {
    label: 'Um palácio amarelo com jardins e uma colunata no alto da colina',
    rx: /\b(schonbrunn|gloriette|palacio imperial)\b/,
    draw: () => {
      let w = '', a = '';
      for (let i = 0; i < 17; i++) { const x = Math.round(60 + i * 64) / 10; if (x < 44 || x > 74) w += `M${x} 35h3v5h-3zM${x} 45h3v5h-3z`; }
      for (const x of [47, 52.4, 57.8, 63.2, 68.6]) w += `M${x} 30h3v6h-3zM${x} 40h3v6h-3z`;
      for (const x of [34, 38, 42, 46, 72, 76, 80, 84]) a += `M${x} 16v-3a1.2 1.2 0 0 1 2.4 0v3z`;
      return SCH.bg('#C4DCE4') + `<ellipse cx="22" cy="8" rx="14" ry="2.6" fill="${SCK.white}" opacity=".6"/>`
        + SCH.g(`<path d="M-2 30q18-16 62-16t62 16v4H-2z" fill="#7E9A5C"/>`, 1.2)
        + SCH.g(`<path d="M32 16.6V11h56v5.6z" fill="#EFE8D6"/><path d="M50 16.6V6h20v10.6z" fill="#EFE8D6"/><path d="M31 11h58M49 6h22" fill="none" stroke-width="1.6"/>`, 1.2)
        + `<path d="${a}M52 16v-5a2 2 0 0 1 4 0v5zM58 16v-5a2 2 0 0 1 4 0v5zM64 16v-5a2 2 0 0 1 4 0v5z" fill="#9FC0CC"/><path d="M58 6l2-3 2 3z" fill="${SCK.ink}"/>`
        + SCH.g(`<path d="M2 58V32h116v26z" fill="#E6BE5A"/><path d="M44 58V27h32v31z" fill="#ECC562"/>
          <path d="M0 32l3-4h114l3 4zM42 27l3-4h30l3 4z" fill="#8C9890"/><path d="M53 58v-6a3 3 0 0 1 6 0v6zM61 58v-6a3 3 0 0 1 6 0v6z" fill="#5A4632" stroke-width="1"/>`, 1.4)
        + `<path d="${w}" fill="#4E6B3E" stroke="${SCK.white}" stroke-width=".8"/><path d="M2 42.4h116M44 37.6h32" stroke="${SCK.white}" stroke-width="1"/><path d="M46 27v31M74 27v31" stroke="${SCK.white}" stroke-width="1.4"/>`
        + `<path d="M0 58h120v22H0z" fill="${SCK.sand}"/><path d="M0 58h120" stroke="${SCK.ink}" stroke-width="1.2"/>`
        + SCH.g(`<path d="M-2 62h48l-6 8H-2zM74 62h48v8H80zM-2 73h34l-4 8H-2zM88 73h34v8H92z" fill="${SCK.green}"/>`, 1.2)
        + `<path d="M4 66q8-3 16 0t16 0M84 66q8-3 16 0t16 0M2 77q8-3 16 0M96 77q8-3 16 0" stroke="#A9C08A" stroke-width="1.2" fill="none"/>`
        + SCH.g(`<ellipse cx="60" cy="71" rx="16" ry="4.4" fill="${SCK.stone}"/><ellipse cx="60" cy="70.4" rx="12.6" ry="2.8" fill="${SCK.sea}" stroke-width="1"/><path d="M8 62q0-6 3-10q3 4 3 10zM106 62q0-6 3-10q3 4 3 10z" fill="${SCK.olive}"/>`, 1.2)
        + `<path d="M60 70V60M60 60q-4 2-6 8M60 60q4 2 6 8" stroke="${SCK.white}" stroke-width="1.4" fill="none"/>`;
    } },

  /* the Prince's two beasts: a lion and a fox sitting side by side on the step of a rusticated Florentine palazzo */
  leao_raposa: {
    label: 'Um leão e uma raposa lado a lado diante de um palácio renascentista',
    rx: /\b(raposa|leao|leoes)\b/,
    draw: () => {
      const R = v => Math.round(v * 10) / 10;
      let mane = '';
      for (let i = 0; i < 20; i++) { const a = i * Math.PI / 10, r = i % 2 ? 11.4 : 15.6; mane += (i ? 'L' : 'M') + R(Math.cos(a) * r) + ' ' + R(-34 + Math.sin(a) * r); }
      let rus = '';
      for (let r = 0; r < 4; r++) for (let x = (r % 2) * 9; x < 120; x += 18) rus += `M${x} ${33 + r * 8.4}v8.4`;
      return SCH.bg('#A99C84') + `<path d="M0 0h120v7H0z" fill="#8E826C"/><path d="M0 7h120M0 30h120M0 33h120" stroke="${SCK.ink}" stroke-width="1.2"/><path d="M0 30h120v3H0z" fill="#C9BCA0"/>`
        + `<path d="M0 41.4h120M0 49.8h120M0 58.2h120${rus}" stroke="#5E5444" stroke-width="1.6" opacity=".7"/>`
        + SCH.g(`<path d="M6 27V17a7 7 0 0 1 14 0v10zM100 27V17a7 7 0 0 1 14 0v10zM53 27V17a7 7 0 0 1 14 0v10z" fill="#D3C6AA"/>`, 1.2)
        + `<path d="M8 26v-8a2.4 2.4 0 0 1 4.8 0v8zM13.2 26v-8a2.4 2.4 0 0 1 4.8 0v8zM102 26v-8a2.4 2.4 0 0 1 4.8 0v8zM107.2 26v-8a2.4 2.4 0 0 1 4.8 0v8zM55 26v-8a2.4 2.4 0 0 1 4.8 0v8zM60.2 26v-8a2.4 2.4 0 0 1 4.8 0v8z" fill="#3A2E26"/>`
        + SCH.g(`<path d="M47 66V48a13 13 0 0 1 26 0v18z" fill="#3A2E26"/><path d="M0 66h120v5H0z" fill="#CFC3A6"/><path d="M0 71h120v9H0z" fill="${SCK.ochre}"/>`, 1.4)
        + `<path d="M60 35v-4M50 38l-3-3M70 38l3-3M44.6 45l-4-1.6M75.4 45l4-1.6" stroke="${SCK.ink}" stroke-width="1.2" opacity=".7"/>`
        + `<g transform="translate(31 68)">` + SCH.g(`<path d="M15 -3q10 1 11-6q0-4-3-6" fill="none" stroke-width="4"/>`, 1) + `<path d="M15 -3q10 1 11-6q0-4-3-6" fill="none" stroke="${SCK.gold}" stroke-width="2"/>`
        + SCH.g(`<ellipse cx="23" cy="-16" rx="2.6" ry="3.4" fill="#8A4E1C" stroke-width="1.2"/><path d="M-21 0q-2-14 9-16h24q11 2 9 16z" fill="${SCK.gold}"/><path d="M-9 0V-24q0-6 9-6t9 6V0z" fill="#E2B24A"/>
          <path d="${mane}z" fill="#8A4E1C"/><path d="M-8 -2v-18h6.4v18zM1.6 -2v-18H8v18z" fill="${SCK.gold}"/><path d="M-10 0q0-4 4.4-4t4.4 4zM1.2 0q0-4 4.4-4t4.4 4z" fill="${SCK.gold}"/>
          <circle cx="-7.4" cy="-42.6" r="3" fill="${SCK.gold}"/><circle cx="7.4" cy="-42.6" r="3" fill="${SCK.gold}"/><path d="M-8.4 -36q0-9 8.4-9t8.4 9q0 4-2 7l-2 3q-4.4 2.4-8.8 0l-2-3q-2-3-2-7z" fill="#E2B24A"/>`, 1.4)
        + `<path d="M-2.6 -32.6h5.2L0 -29.8z" fill="${SCK.ink}"/><path d="M0 -29.8v2M-3 -26.8q3 1.6 6 0M-5.4 -37.6l3 .8M5.4 -37.6l-3 .8M-7.4 -1.6v-2M-4.4 -1.6v-2M4.4 -1.6v-2M7.4 -1.6v-2" stroke="${SCK.ink}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`
        + `<path d="M-14 -3q-3-6 1-10M14 -3q3-6-1-10M-6 -40q6-3 12 0" stroke="#A8691E" stroke-width="1.2" fill="none"/></g>`
        + `<g transform="translate(89 68) scale(.9)">` + SCH.g(`<path d="M10 -8Q26 -2 12 1L-12 1Q-17 0-14 -3Q-2 -2 6 -7z" fill="#C0582C"/>
          <path d="M10 -2Q16 -16 6 -26L-2 -30Q-8 -24 -6 -14V0z" fill="#C0582C"/><path d="M-6 0v-14h3.6V0zM-1 0v-12h3.6V0z" fill="#3A2A22"/>
          <path d="M-4 -41l1-10 6 7zM1 -43l4-8 3 9z" fill="#C0582C"/>
          <path d="M6 -34Q4 -42 -2 -42Q-8 -41 -10 -38L-16 -35Q-17 -33 -15 -32.6L-8 -31Q-2 -27 4 -29z" fill="#C0582C"/>`, 1.6)
        + `<path d="M-2 -28q-6 6-4 15l3-4 2 4q2-8-1-15zM-15 -32.6l7 1.6q6 4 10 1q-6-1-9-4zM-14 -3q-3 3-1 4h6l-1-4z" fill="${SCK.white}"/><path d="M-2.6 -44l1-5 3 3.6zM2.6 -44l2.4-5 1.6 5z" fill="#3A2A22"/>`
        + `<path d="M-8 -37.4l3-.6" stroke="${SCK.ink}" stroke-width="1.6" stroke-linecap="round"/><path d="M-16.2 -34.6h.1" stroke="${SCK.ink}" stroke-width="2.4" stroke-linecap="round"/></g>`;
    } },

  /* Münster, 1648: the town hall's tall Gothic gable with its pinnacles and arcade, burgher houses and a spire, and a post rider galloping off sounding his horn */
  prefeitura_munster: {
    label: 'Um mensageiro com corneta parte a galope diante de uma prefeitura gótica de frontão alto',
    rx: /\b(munster|osnabruck|vestfalia|prefeitura|corneta)\b/,
    draw: () => {
      const L = 'M-8 -14l-9 4-8 2M-5 -13l-8 6-8 3M11 -14l8 5 8 1M14 -15l6 8 7 3';
      let pin = '', tr = '';
      [[38, 34], [44, 26], [50, 18], [56, 10], [64, 10], [70, 18], [76, 26], [82, 34]].forEach(([x, y]) => { pin += `M${x - 1.2} ${y}v-6l1.2-3 1.2 3v6z`; });
      for (const x of [44, 52, 60, 68, 76]) tr += `M${x - 3} 46V38q3-5 6 0v8z`;
      return SCH.bg('#C6DADF') + `<ellipse cx="96" cy="10" rx="16" ry="2.6" fill="${SCK.white}" opacity=".6"/>`
        + SCH.g(`<path d="M104 40V14h8v26z" fill="#B8AE96"/><path d="M104 14l4-14 4 14z" fill="#8E9A90"/>`, 1.2)
        + SCH.g(`<path d="M-2 68V30l8-10 8 10v38zM84 68V30h4v-4h4v-4h4v-4h4v4h4v4h4v4h4v38z" fill="#C98A5A"/><path d="M14 68V34l10-12 10 12v34z" fill="${SCK.ochre}"/>`, 1.4)
        + `<path d="M1 36h3v5H1zM8 36h3v5H8zM1 48h3v5H1zM8 48h3v5H8zM19 38h3v5h-3zM26 38h3v5h-3zM19 50h3v5h-3zM26 50h3v5h-3zM88 36h3v5h-3zM96 30h3v5h-3zM104 36h3v5h-3zM112 36h3v5h-3zM88 48h3v5h-3zM96 48h3v5h-3zM104 48h3v5h-3zM112 48h3v5h-3z" fill="#3A3A40"/>`
        + SCH.g(`<path d="M36 68V34h6v-8h6v-8h6v-8h12v8h6v8h6v8h6v34z" fill="#E2D6BA"/>`, 1.5)
        + `<path d="${pin}" fill="#E2D6BA" stroke="${SCK.ink}" stroke-width=".9"/>`
        + `<path d="${tr}M50 32v-6q2-4 4 0v6zM56 32v-8q4-6 8 0v8zM66 32v-6q2-4 4 0v6zM58 18v-4q2-3 4 0v4z" fill="#4A4A55"/><path d="M36 34h48M36 48h48M42 26h36M48 18h24" stroke="${SCK.ink}" stroke-width="1"/>`
        + `<path d="M38 68V58q3-6 6-6t6 6v10zM48 68V58q3-6 6-6t6 6v10zM58 68V58q3-6 6-6t6 6v10zM68 68V58q3-6 6-6t6 6v10z" fill="#3A3A40" stroke="${SCK.ink}" stroke-width="1"/>`
        + `<path d="M0 68h120v12H0z" fill="#B8AE96"/><path d="M0 68h120" stroke="${SCK.ink}" stroke-width="1.2"/><path d="M4 72h8M18 76h10M40 72h8M60 76h12M80 72h10M100 76h10" stroke="${SCK.ink}" stroke-width=".8" opacity=".4"/>`
        + `<path d="M40 76q4-4 9-2q3-4 7-1" fill="none" stroke="${SCK.stone}" stroke-width="2"/>`
        + `<g transform="translate(29 75)">` + SCH.g(`<path d="${L}" fill="none" stroke-width="5"/><path d="M16 -22q8-3 14 3" fill="none" stroke-width="4.6"/>`, 1)
        + `<path d="${L}" fill="none" stroke="#6E4426" stroke-width="3" stroke-linecap="round"/><path d="M16 -22q8-3 14 3" stroke="#3A2A1E" stroke-width="2.8" fill="none" stroke-linecap="round"/>`
        + SCH.g(`<path d="M-12 -20q0-8 10-8h13q7 0 7 7q0 9-9 10H-4q-8 0-8-9z" fill="#6E4426"/><path d="M-6 -26Q-12 -35 -16 -39L-21 -39Q-26 -35 -29 -30Q-30 -27 -27 -27L-22 -28Q-17 -25 -12 -16z" fill="#6E4426"/>
          <path d="M2 -36q10-2 17 7q-8-3-15 1z" fill="${SCK.red}"/><path d="M-5 -27l1-11 6-2 4 4 1 9z" fill="${SCK.red}"/><circle cx="-1" cy="-43" r="2.8" fill="#E8C3A0"/><path d="M-6.4 -44.6h10l-1.6-3h-5.6z" fill="#2A2A2E"/>`, 1.2)
        + `<path d="M-7 -27Q-12 -35 -16 -39M2 -28v9l-2 3" stroke="#2A2010" stroke-width="2.4" fill="none"/><path d="M-18 -39.6l-1-3M-23 -34h.1" stroke="${SCK.ink}" stroke-width="1.6" stroke-linecap="round"/><path d="M2 -46q4-3 6 0" stroke="${SCK.white}" stroke-width="1.4" fill="none"/>`
        + `<path d="M-4 -42.6q-6-1-10-7M0 -36l-6-5" stroke="${SCK.ink}" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M-4 -42.6q-6-1-10-7" stroke="${SCK.gold}" stroke-width="1.8" fill="none"/><path d="M0 -36l-6-5" stroke="${SCK.red}" stroke-width="1.6" stroke-linecap="round"/>`
        + SCH.g(`<path d="M-12.6 -48.4l-5-4.6 4.4-1.4 3 3.6z" fill="${SCK.gold}"/>`, 1) + `<path d="M33 -3a2.4 2.4 0 1 1 4 -1a2 2 0 1 1 1 3z" fill="${SCK.stone}" opacity=".9"/></g>`;
    } },
});
