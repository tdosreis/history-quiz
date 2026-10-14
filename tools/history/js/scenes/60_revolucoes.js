/* Revoluções — the scenes of the age of revolutions: the Bastille and the Terror, Napoleon's wars and Trafalgar, the American independence, steam and the mills, the Enlightenment, the 19th century's nations, wonders and voyages (conventions in _core.js) */
Object.assign(SCENE, {
  /* the Bastille: four great round towers and their battlements in the smoke, the crowd in Phrygian caps and cockades raising pikes before it, a cannon firing */
  ev_revolucao_francesa: {
    label: 'A multidão com barretes frígios cerca a fortaleza de oito torres da Bastilha',
    rx: /\b(bastilha|revolucao francesa|barrete frigio|barretes frigios)\b/,
    ev: 'revolucao_francesa',
    draw: () => {
      const T = SCH.uid('bt'), K = SCK.ink;
      let mer = '';
      for (const x of [0, 27, 31, 56, 61, 86, 90, 116]) mer += `M${x} 20v-3.4h3v3.4z`;
      const puff = cs => { const c = cs.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join(''); return `<g stroke="${SCK.ink}" stroke-width="2.6">${c}</g><g fill="${SCK.white}">${c}</g>`; };
      /* the crowd: [x, head y, coat, cap (1) or cockaded hat (0)]; shoulders and heads are round dots */
      const C = SCH.uid('bc'), H = SCH.uid('bh');
      const crowd = (rows, dark) => {
        const coat = {}; let head = '', cap = '', cock = '';
        for (const [x, h, c, k] of rows) {
          coat[c] = (coat[c] || '') + `M${x} ${h + 10.6}h0`; head += `M${x} ${h}h0`;
          cap += `<use href="#${k ? C : H}" x="${x}" y="${h}"/>`; if (!k) cock += `M${x + 2.6} ${h - 2.8}h0`;
        }
        return `<g stroke-linecap="round">${Object.entries(coat).map(([c, d]) => `<path d="${d}" stroke="${c}" stroke-width="12"/>`).join('')}<path d="${head}" stroke="${dark ? '#8C6A50' : '#D9A77E'}" stroke-width="6.4"/></g>`
          + cap + `<g stroke-linecap="round"><path d="${cock}" stroke="${SCK.red}" stroke-width="2.6"/><path d="${cock}" stroke="${SCK.white}" stroke-width="1.2"/></g>`;
      };
      const pk = [[44, 59], [64, 58], [86, 59], [104, 58]], pole = pk.map(([x, h]) => `M${x} ${h}V${h - 26}`).join('');
      return SCH.bg('#CBD3D0') + `<path d="M0 0h120v30H0z" fill="#BCC7C6"/>`
        + puff([[100, 6, 6], [111, 8, 7], [91, 4, 4]])
        + `<defs><path id="${C}" d="M-3.6-.2q-.6-4.8 3.4-5.8 4.2-1 6 2.6l-1.4 2.4q-1.2-1.8-2.4-1.4l.4 2.4z" fill="${SCK.red}"/><path id="${H}" d="M-5.6-1.6q5.6-1.6 11.2 0l-1.6-3.2q-4-1.6-8 0z" fill="#2A2420"/><g id="${T}">` + SCH.g(`<path d="M-10 60V14h20v46z" fill="#B5AD9C"/>`, 1.6)
        + `<path d="M3.6 15h5.6v44.2H3.6z" fill="#978F7E"/><path d="M-8.6 15h2.6v44.2h-2.6z" fill="#CBC4B3"/><path d="M-9 26h18M-9 38h18M-9 50h18" stroke="${K}" stroke-width=".7" opacity=".3"/>`
        + SCH.g(`<path d="M-11.5 14.4V6h3v2.4h2V6h3v2.4h2V6h3v2.4h2V6h3v2.4h2V6h3v8.4z" fill="#A49C8B"/>`, 1.4)
        + `<path d="M-9.6 16.4H9.6" stroke="${K}" stroke-width="2.2" stroke-dasharray="1.2 2" opacity=".5"/><path d="M-1 30h2v5h-2zM1 44h2v4H1z" fill="${K}" opacity=".75"/></g></defs>`
        + SCH.g(`<path d="M0 60V20h120v40z" fill="#8F8778"/><path d="${mer}" fill="#8F8778" stroke-width="1.2"/>`, 1.6)
        + [16, 45, 75, 104].map(x => `<use href="#${T}" x="${x}"/>`).join('')
        + `<path d="M0 60h120v20H0z" fill="#C2AE86"/><path d="M0 60h120" stroke="${SCK.ink}" stroke-width="1.6"/>`
        + puff([[6, 48, 8], [17, 42, 9], [28, 47, 8], [38, 52, 6], [32, 38, 5]])
        + SCH.g(`<circle cx="15" cy="70" r="6" fill="${SCK.wood}"/><path d="M6 68.6 31 58.4l1.6 4-24.4 9z" fill="#5C5650"/><path d="M30.6 57.6l2.4 5.6" stroke-width="2.4"/>`, 1.4)
        + `<path d="M15 64.4v11.2M9.4 70h11.2" stroke="${SCK.ink}" stroke-width=".9"/>`
        + `<path d="${pole}" stroke="${SCK.ink}" stroke-width="2.6"/><path d="${pole}" stroke="${SCK.wood}" stroke-width="1.2"/>`
        + `<path d="${pk.map(([x, h]) => `M${x} ${h - 33}l1.8 4.4-1.8 3-1.8-3z`).join('')}" fill="#C3C8CE" stroke="${SCK.ink}" stroke-width=".9" stroke-linejoin="round"/>`
        + crowd([[40, 64, '#3A3330', 1], [52, 63, '#3A3330', 0], [72, 63, '#3A3330', 1], [94, 64, '#3A3330', 0], [114, 63, '#3A3330', 1]], 1)
        + crowd([[34, 70, SCK.sea, 1], [47, 68, SCK.burg, 0], [60, 70, SCK.sea, 1], [76, 68, '#5C5650', 1], [90, 70, SCK.burg, 1], [104, 69, SCK.sea, 0], [117, 71, SCK.olive, 1]]);
    } },

  /* the guillotine on its scaffold in the great square at dawn: the two red-brown uprights, the raised blade, the steps, the silent crowd below */
  guilhotina: {
    label: 'A guilhotina sobre um cadafalso numa praça, ao amanhecer',
    rx: /\b(guilhotina|cadafalso)\b/,
    draw: () => {
      let cols = '';
      for (let x = 3; x < 36; x += 5) cols += `M${x} 46v10`;
      for (let x = 86; x < 120; x += 5) cols += `M${x} 46v10`;
      const P = [[4, 74], [13, 72], [22, 75], [31, 73], [40, 74], [49, 72], [58, 75], [67, 73], [76, 74], [85, 72], [94, 75], [103, 73], [112, 74], [120, 72]];
      const crowd = `<path d="${P.map(([x, h]) => `M${x} ${h + 8.6}h0`).join('')}" stroke="#2E2824" stroke-width="11" stroke-linecap="round"/><path d="${P.map(([x, h]) => `M${x} ${h}h0`).join('')}" stroke="#4E443C" stroke-width="5.6" stroke-linecap="round"/>`
        + `<path d="${P.filter((_, i) => i % 3 === 1).map(([x, h]) => `M${x - 4.4} ${h - 1}q4.4-1.6 8.8 0l-1.4-2.8q-3-1.4-6 0z`).join('')}" fill="#2E2824"/>`
        + `<path d="${P.filter((_, i) => i % 3 === 2).map(([x, h]) => `M${x - 3} ${h - .4}q-.4-4 3-4.8 3.6-.8 5 2.2l-1.2 2-2-.6z`).join('')}" fill="${SCK.red}"/>`;
      return SCH.bg('#B4BFC2') + `<path d="M0 34h120v26H0z" fill="#CFCBBB"/><path d="M0 44h120v16H0z" fill="#DCD3BB"/>`
        + SCH.sun(100, 42, 7, '#F2E6C8')
        + SCH.g(`<path d="M0 58V44h36v14zM0 44l2-3h32l2 3zM84 58V44h36v14zM84 44l2-3h34v3z" fill="#A9A597"/>`, 1)
        + `<path d="${cols}" stroke="${SCK.ink}" stroke-width="1" opacity=".4"/>`
        + `<path d="M0 58h120v22H0z" fill="#B5AB93"/><path d="M0 64h120M12 58l-6 22M108 58l6 22" stroke="${SCK.ink}" stroke-width=".6" opacity=".25"/>`
        + SCH.g(`<path d="M26 68V54h68v14z" fill="#6E4A2A"/><path d="M22 50h76v4.4H22z" fill="${SCK.wood}"/>
          <path d="M22 50h-4v3h-3.6v3h-3.6v3h-3.6v3H3.6v3H0v4h26V54.4h-4z" fill="${SCK.wood}"/>
          <path d="M49 50h-6.4l6.4-8zM71 50h6.4l-6.4-8z" fill="#7A3B24"/>
          <path d="M49 50V6h5v44zM66 50V6h5v44z" fill="#8A3A2A"/><path d="M45 2h30v5H45z" fill="#8A3A2A"/>
          <path d="M54 37h12v6.4H54z" fill="#7A3B24"/>
          <path d="M54 10h12v3.4H54z" fill="#4A3A30"/><path d="M54 13.4h12v5.6l-12 5z" fill="#C9CED3"/>`, 1.6)
        + `<path d="M51.5 8v41M68.5 8v41" stroke="${SCK.ink}" stroke-width=".8" opacity=".5"/><path d="M56 40.6a4 4 0 0 1 8 0" fill="none" stroke="${SCK.ink}" stroke-width="1.1"/>`
        + `<path d="M71.6 7.4q3.6 10 .8 24" fill="none" stroke="${SCK.ink}" stroke-width=".9"/><path d="M55.6 15h8.8" stroke="${SCK.white}" stroke-width=".9" opacity=".7"/>`
        + `<path d="M34 54.4v13.6M42 54.4v13.6M50 54.4v13.6M58 54.4v13.6M66 54.4v13.6M74 54.4v13.6M82 54.4v13.6" stroke="${SCK.ink}" stroke-width=".7" opacity=".45"/>`
        + `<path d="M24 70V52M98 70V52" stroke="${SCK.ink}" stroke-width="1"/><path d="M24 52l-1 3h2zM98 52l-1 3h2z" fill="#C3C8CE"/>`
        + crowd;
    } },
  /* sunrise in the mist: a column of line infantry in blue coats, white breeches and shakos marching with fixed bayonets behind the gilded eagle, a field gun in front */
  ev_guerras_napoleonicas: {
    label: 'Infantaria de casacas azuis com a águia imperial avança na névoa, ao nascer do sol',
    rx: /\b(austerlitz|aguia imperial|guerras napoleonicas|granadeiros)\b/,
    ev: 'guerras_napoleonicas',
    draw: () => {
      const B = SCH.uid('nb'), M = SCH.uid('nm'), K = SCK.ink, W = SCK.white, blue = '#34508A';
      const use = (id, x, y, s) => `<use href="#${id}" transform="translate(${x} ${y})${s ? ` scale(${s})` : ''}"/>`;
      const man = (x, y, s) => use(M, x, y, s) + use(B, x, y, s);
      return SCH.bg('#EBD3A4') + `<path d="M0 0h120v16H0z" fill="#DFC7A2"/>`
        + `<defs><g id="${M}"><path d="M2.6-20-4-54" stroke="${K}" stroke-width="3"/><path d="M2.6-20-4-54" stroke="#6E4A2A" stroke-width="1.4"/><path d="M-4-54-5.2-62" stroke="#C3C8CE" stroke-width="1.1"/></g>
          <g id="${B}" stroke="${K}" stroke-width="1" stroke-linejoin="round">
          <path d="M-1.6-18-4.4-8.6-6.4 0H-3l2-8.4 2.6-9.6zM.4-18 3.4-8.6 4.6 0H8L6.4-8.6 3.6-18z" fill="${W}"/>
          <path d="M-4.6-8.6h3.4L-3 0h-3.4zM3.4-8.6h3L8 0H4.6z" fill="#2A2420"/>
          <path d="M-8.4-31h4.2v8.4h-4.2z" fill="#8A6A44"/><path d="M-9-34h5.4v3H-9z" fill="#C9CED3"/>
          <path d="M-4.4-32H3.6L4.6-18H-1L-4.6-11.4-6-12.6-4.8-18z" fill="${blue}"/><path d="M1.4-31.6h2.2l.6 8.4H1.8z" fill="${W}"/>
          <path d="M-2-30.6 2.4-22.6l2.2-1L1-31z" fill="${blue}"/>
          <circle cx=".6" cy="-35" r="2.6" fill="#E3B48C"/><path d="M-2.6-36.4h6.4l.6-6.6h-7.6z" fill="#2A2420"/>
          <circle cx="2.2" cy="-44.2" r="1.4" fill="${SCK.red}"/><path d="M.6-40.4h2.2v2.4H.6z" fill="${SCK.gold}" stroke-width=".5"/></g></defs>`
        + SCH.sun(24, 42, 17, '#F2DBA6') + SCH.sun(24, 42, 11, '#FAEBC2')
        + `<path d="M0 48q20-8 44-4t46-4 30 4v16H0z" fill="#A9A88E"/><path d="M0 46h120v9H0z" fill="#F4E8CA" opacity=".75"/>`
        + `<path d="M0 56q60-6 120 0v24H0z" fill="#8A9460"/>`
        + [52, 64, 76, 88, 100].map(x => man(x + 6, 71, .9)).join('')
        + `<path d="M0 52h120v12H0z" fill="#F4E8CA" opacity=".55"/><path d="M0 70q60-5 120 0v10H0z" fill="#76804E"/>`
        + [46, 58, 70, 82, 94].map((x, i) => man(x, 76 - i % 2)).join('')
        + `<path d="M110 52V14" stroke="${K}" stroke-width="2.4"/><path d="M110 52V14" stroke="${SCK.goldLo}" stroke-width="1"/>` + use(B, 108, 76)
        + `<g transform="translate(110 15) scale(1.5)" fill="${SCK.gold}" stroke="${K}" stroke-width=".7" stroke-linejoin="round"><path d="M-2.4 0h4.8v2.2h-4.8z"/>
          <path d="M-1-2.6C-4-4-6-7-6.6-11-4.6-9.6-3-9-1.4-7.4zM1-2.6C4-4 6-7 6.6-11 4.6-9.6 3-9 1.4-7.4z"/><path d="M-1.6 0C-2-3-1.6-6 0-7.6 1.6-6 2-3 1.6 0z"/><path d="M-.6-7.4a1.4 1.4 0 1 1 1.8 1.2l1.2.4-1.8.4z"/></g>`
        + SCH.g(`<path d="M10 58.4 42 54l.6 3.8L11 62.4z" fill="${SCK.goldLo}"/><path d="M41.4 53.2l1.6 5.4" stroke-width="2.4"/><circle cx="9" cy="60.4" r="2" fill="${SCK.goldLo}"/>
          <path d="M14 61h16l-1 6L2 79-1 76z" fill="${SCK.olive}"/><circle cx="22" cy="67" r="10" fill="none" stroke-width="3.6"/><circle cx="22" cy="67" r="10" fill="none" stroke="#8A6A44" stroke-width="1.8"/>`, 1.4)
        + `<path d="M22 57v20M12 67h20M15 60l14 14M29 60 15 74" stroke="#8A6A44" stroke-width="1.6"/><circle cx="22" cy="67" r="2.2" fill="${K}"/>`;
    } },

  /* Trafalgar: a three-decker with the black-and-yellow chequer of her gun decks fires her broadside, torn sails above, another ship of the line beyond in the smoke */
  trafalgar: {
    label: 'Naus de linha trocam bordadas no mar, envoltas em fumaça',
    rx: /\b(trafalgar|nau de linha|naus de linha|bordada)\b/,
    draw: () => {
      const id = SCH.uid('tf'), K = SCK.ink, sail = '#EFE6D0';
      const hull = 'M12 43Q46 49 84 40h2l-2 10q-4 8-12 12H24q-9-5-12-19z';
      const sq = ([x, y, w, h]) => `M${x - w / 2} ${y}h${w}l1.4 ${h}q-${w / 2 + 1.4} 3-${w + 2.8} 0z`;
      const S = [[30, 31, 22, 11], [30, 19, 18, 10], [30, 11, 12, 7], [50, 31, 26, 12], [50, 18, 22, 11], [50, 8, 15, 8], [70, 23, 16, 9], [70, 16, 11, 6]];
      const puff = cs => { const c = cs.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join(''); return `<g stroke="${K}" stroke-width="2.4">${c}</g><g fill="${SCK.white}">${c}</g>`; };
      const flash = (x, y) => `M${x} ${y - 3.4}l1 2.4 2.4-1-1 2.4 2.4 1-2.4 1 1 2.4-2.4-1-1 2.4-1-2.4-2.4 1 1-2.4-2.4-1 2.4-1-1-2.4 2.4 1z`;
      return SCH.bg('#CDD3CC') + `<path d="M0 0h120v14H0z" fill="#BFC7C2"/>`
        + `<path d="M0 52h120v28H0z" fill="${SCK.sea}"/>`
        + SCH.g(`<path d="M98 50V18M110 50V22" stroke-width="1.6"/><path d="M90 30h16l1 9q-9 2-18 0zM92 21h12l1 7.6q-7 2-14 0zM103 32h14l1 8q-8 2-16 0z" fill="#DCD4C0" stroke-width="1.1"/>
          <path d="M88 46q16 3 34-2v9H92z" fill="#3A3330" stroke-width="1.2"/>`, 1.2)
        + `<path d="M90 49.4h32" stroke="${SCK.ochre}" stroke-width="1.4"/>`
        + puff([[92, 44, 6], [102, 46, 7], [114, 44, 6], [108, 52, 6]])
        + SCH.g(`<path d="M30 14 3 36l14 3z" fill="${sail}" stroke-width="1.2"/><path d="M14 42-1 31" stroke-width="2.4"/>
          <path d="M30 44V7M50 44V3M70 44V13" stroke-width="2.4"/><path d="M70 27 88 30v12H70z" fill="${sail}" stroke-width="1.2"/>
          <path d="${S.map(sq).join('')}" fill="${sail}" stroke-width="1.3"/><path d="${hull}" fill="#2A2420"/>`, 1.6)
        + `<path d="M46 23l3 2 3-1-1 4 2 2-4 .6-2 2-1-4z" fill="#CDD3CC" stroke="${K}" stroke-width=".8"/><path d="M19 42l3-3 3 2 4-3 3 3 3-2 3 3 4-2 3 3" fill="none" stroke="${K}" stroke-width="1"/>`
        + `<defs><clipPath id="${id}"><path d="${hull}"/></clipPath></defs><g clip-path="url(#${id})">`
        + `<path d="M0 48h90M0 52.6h90M0 57.2h90" stroke="${SCK.gold}" stroke-width="2.6"/><path d="M14 48h70M18 52.6h64M22 57.2h56" stroke="${K}" stroke-width="1.6" stroke-dasharray="1.6 2.6"/></g>`
        + `<path d="M79 42.4h4v3h-4z" fill="${SCK.goldHi}"/><path d="${flash(26, 53)}${flash(42, 53)}${flash(60, 53)}" fill="#F2B23A" stroke="${K}" stroke-width=".6"/>`
        + puff([[14, 66, 5], [23, 68, 7.4], [30, 60, 4], [36, 64, 6], [46, 68, 8], [56, 62, 5], [64, 67, 7], [72, 61, 4], [78, 65, 6], [86, 61, 4.4], [10, 60, 3]])
        + SCH.waves(74, '#7FA2B8', 1.2);
    } },

  /* the cracked bell under its wooden yoke in the arched doorway of a brick tower; through the snow, Continental soldiers in tricorns march with their muskets */
  ev_independencia_eua: {
    label: 'O sino rachado da liberdade, com soldados de tricórnio ao fundo',
    rx: /\b(sino da liberdade|liberty bell|independencia americana|revolucao americana|tricornio)\b/,
    ev: 'independencia_eua',
    draw: () => {
      const C = SCH.uid('ct'), K = SCK.ink, blue = '#34508A';
      let brick = '', snow = '';
      for (let y = 4; y < 80; y += 4) brick += `M0 ${y}h66` + (y % 8 ? 'M8 ' + (y - 4) + 'v4M30 ' + (y - 4) + 'v4M52 ' + (y - 4) + 'v4' : 'M19 ' + (y - 4) + 'v4M41 ' + (y - 4) + 'v4M62 ' + (y - 4) + 'v4');
      for (const [x, y] of [[70, 8], [84, 16], [98, 6], [112, 18], [76, 30], [92, 26], [106, 34], [118, 4], [4, 6], [62, 22], [80, 44], [116, 46], [6, 70], [60, 62], [100, 74], [72, 60], [88, 36]]) snow += `M${x} ${y}h0`;
      return SCH.bg('#C9D4D6') + `<path d="M60 52q30-10 60-6v34H60z" fill="#E8E8E2"/>`
        + `<path d="M104 50V34M104 42l-5-5M104 39l4-5M116 50V36M116 42l3-4M84 52V40M84 45l-3-3" stroke="${K}" stroke-width="1.1" opacity=".7"/>`
        + `<defs><g id="${C}" stroke="${K}" stroke-width="1" stroke-linejoin="round"><path d="M2.6-20-4-54" stroke-width="3"/><path d="M2.6-20-4-54" stroke="#6E4A2A" stroke-width="1.4"/><path d="M-4-54-5.2-61" stroke="#C3C8CE" stroke-width="1.1"/>
          <path d="M-1.6-18-4.4-8.6-6.4 0H-3l2-8.4 2.6-9.6zM.4-18 3.4-8.6 4.6 0H8L6.4-8.6 3.6-18z" fill="#E2CFA0"/><path d="M-4.6-8.6h3.4L-3 0h-3.4zM3.4-8.6h3L8 0H4.6z" fill="#2A2420"/>
          <path d="M-4.4-32H3.6L4.6-18H2L-4.6-8-6.4-9.6-4.8-18z" fill="${blue}"/><path d="M1.4-31.6h2.2l.6 8.4H1.8z" fill="#E2CFA0"/><path d="M-2-30.6 2.4-22.6l2.2-1L1-31z" fill="${blue}"/>
          <circle cx=".6" cy="-35" r="2.6" fill="#E3B48C"/><path d="M-5-36.6q5.4-2.4 10.6 0l-1.8-4.4q-3.6-1.8-7.2 0z" fill="#2A2420"/></g></defs>`
        + [74, 86, 98, 110].map((x, i) => `<use href="#${C}" transform="translate(${x} ${68 + i % 2}) scale(.55)"/>`).join('')
        + `<path d="M60 68q30-6 60-2v14H60z" fill="#F4F2EC"/>`
        + `<path d="M0 0h66v80H0z" fill="#A44A30"/><path d="${brick}" stroke="#6E2A1A" stroke-width=".8" opacity=".7"/>`
        + SCH.g(`<path d="M0 0h66v80" fill="none"/><path d="M7 80V31a26 26 0 0 1 52 0v49z" fill="#E2D6C0"/><path d="M11 80V31a22 22 0 0 1 44 0v49z" fill="#3A2620"/>
          <path d="M11 13h44v5H11z" fill="${SCK.wood}"/><path d="M30 18v-2.4h6V18z" fill="#3A2620"/>
          <path d="M33 18c-7 0-11 3-11.6 9-.6 8-1.4 15-3.6 19.4-2 3.8-4.8 5.4-4.8 7.6h40c0-2.2-2.8-3.8-4.8-7.6-2.2-4.4-3-11.4-3.6-19.4C44 21 40 18 33 18z" fill="${SCK.goldLo}"/>
          <path d="M13 54h40v3.4H13z" fill="#8A6018"/>`, 1.6)
        + `<path d="M22 24.6h22M18.6 46h28.8" stroke="${K}" stroke-width="1" opacity=".5"/><path d="M24.6 28q-1 13-4.6 21" fill="none" stroke="${SCK.goldHi}" stroke-width="1.6" opacity=".8"/>`
        + `<path d="M36.6 54.4l-1-4 1.4-3.4-1.6-4.2 1.2-3.6-1-3" fill="none" stroke="${K}" stroke-width="1.5"/>`
        + `<path d="M33 57.4v3.6" stroke="${K}" stroke-width="1.6"/><circle cx="33" cy="62" r="2" fill="#5C4A2A" stroke="${K}" stroke-width="1"/>`
        + `<path d="M7 33l-2-1M59 33l2-1" stroke="${K}" stroke-width="1" opacity=".5"/>`
        + `<path d="${snow}" stroke="${SCK.white}" stroke-width="1.8" stroke-linecap="round"/>`;
    } },
  /* an engine of the 1820s: tall chimney, vertical cylinders and rods driving the coupled wheels, the tender with its water cask, a wagon of passengers and a coach, a stone bridge in the fields */
  locomotiva_vapor: {
    label: 'Uma das primeiras locomotivas a vapor puxando vagões numa via férrea no campo',
    rx: /\b(locomotiva|locomotivas|ferrovia|ferrovias|trem|trens|maria-fumaca)\b/,
    draw: () => {
      const K = SCK.ink;
      const wheel = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${SCK.red}"/>`;
      const spokes = (x, y, r) => { const d = (r * .7).toFixed(1), e = (r * 1.4).toFixed(1); return `M${(x - r).toFixed(1)} ${y}h${(2 * r).toFixed(1)}M${x} ${(y - r).toFixed(1)}v${(2 * r).toFixed(1)}M${(x - d).toFixed(1)} ${(y - d).toFixed(1)}l${e} ${e}M${(x + +d).toFixed(1)} ${(y - d).toFixed(1)}l-${e} ${e}`; };
      const W = [[72, 58, 8], [94, 58, 8], [45, 61.4, 4.6], [56, 61.4, 4.6], [21, 61.4, 4.6], [32, 61.4, 4.6], [2, 61.4, 4.6], [12, 61.4, 4.6]];
      const puff = cs => { const c = cs.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join(''); return `<g stroke="${K}" stroke-width="2.2">${c}</g><g fill="#E9E6DE">${c}</g>`; };
      return SCH.bg('#C6D8DA') + `<path d="M0 44q30-8 60-2t60-4v42H0z" fill="#9DB07E"/>`
        + SCH.g(`<path d="M0 34h52v14H0z" fill="${SCK.stone}"/><path d="M4 48v-4a6 6 0 0 1 12 0v4zM22 48v-4a6 6 0 0 1 12 0v4zM40 48v-4a6 6 0 0 1 12 0v4z" fill="#7F9A6A"/>`, 1.2)
        + `<path d="M0 37h52" stroke="${K}" stroke-width=".8" opacity=".4"/>`
        + `<path d="M0 52q60-6 120-2v30H0z" fill="${SCK.green}"/><path d="M0 70h120v10H0z" fill="#B9A57E"/>`
        + `<path d="M0 70h120" stroke="${K}" stroke-width="1.8"/><path d="M2 72.4h5M15 72.4h5M28 72.4h5M41 72.4h5M54 72.4h5M67 72.4h5M80 72.4h5M93 72.4h5M106 72.4h5" stroke="#6E4A2A" stroke-width="2.6"/>`
        + `<g transform="translate(120 70) scale(1.1) translate(-120 -66)">` + puff([[100, 7, 4], [93, 9, 5.4], [84, 7, 6], [74, 10, 6.4], [64, 8, 5.6], [55, 11, 5], [47, 9, 4]])
        + SCH.g(`<path d="M-2 42h18v14H-2z" fill="${SCK.burg}"/><path d="M0 45h5v5H0zM9 45h5v5H9z" fill="${SCK.sky}" stroke-width="1"/><path d="M-3 41h20v-2H-3z" fill="#5C2A1E" stroke-width="1"/>
          <path d="M19 47h16v9H19z" fill="${SCK.wood}"/><path d="M38 47h22v9H38z" fill="${SCK.wood}"/>
          <path d="M40 38h18a3 4.6 0 0 1 0 9.2H40a3 4.6 0 0 1 0-9.2z" fill="#B98552"/>
          <path d="M62 48h44v4.4H62z" fill="#6E4A2A"/><path d="M64 30h40a3 9 0 0 1 0 18H64a3 9 0 0 1 0-18z" fill="#45634A"/>
          <path d="M97.6 30V5h5.4v25z" fill="#2A2420"/><path d="M96.4 5h7.8V2.6h-7.8z" fill="#2A2420"/>
          <path d="M72 32V21h5v11zM88 32V21h5v11z" fill="#3A3A3A"/><path d="M69 18.6h11v2.6H69zM85 18.6h11v2.6H85z" fill="${SCK.gold}"/>`, 1.4)
        + `<path d="M44 38v9.2M54 38v9.2M70 30.4v17.2M84 30.4v17.2M98 30.4v17.2" stroke="${SCK.gold}" stroke-width="1.6"/><path d="M66 34h36" stroke="#6E8C6A" stroke-width="1.4"/>`
        + `<path d="M22 47v-4M27 47v-4M32 47v-4" stroke="${K}" stroke-width="2.8" stroke-linecap="round"/><path d="M20 43h4M25 43h4M30 43h4" stroke="#2A2420" stroke-width="1.6"/>`
        + SCH.g(W.map(a => wheel(...a)).join(''), 1.4) + `<path d="${W.map(a => spokes(...a)).join('')}" stroke="${K}" stroke-width=".8"/>`
        + `<path d="M70 20 67 58M95 20l3 38M72 61.4h22M16 56h3M35 56h3M60 56h2" stroke="${K}" stroke-width="1.6"/></g>`;
    } },

  /* a red-brick mill of four storeys with rows of windows and tall smoking chimneys, terraced houses beside it, workers in flat caps and shawls at the gate */
  fabrica_chamines: {
    label: 'Uma fábrica de tijolos com chaminés fumegantes e operários à porta',
    rx: /\b(fabrica|fabricas|chamine|chamines|operarios)\b/,
    draw: () => {
      const K = SCK.ink;
      let win = '';
      for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) if (!(r === 3 && (c === 4))) win += `M${(44 + c * 7.4).toFixed(1)} ${29 + r * 9}h3.6v5.4h-3.6z`;
      const puff = cs => { const c = cs.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join(''); return `<g stroke="${K}" stroke-width="2.2">${c}</g><g fill="#8C8A86">${c}</g>`; };
      const ppl = [[60, 72], [66, 74], [80, 73], [86, 75], [92, 72]];
      return SCH.bg('#C3C6C0') + `<path d="M0 0h120v18H0z" fill="#B2B6B2"/>`
        + puff([[23, 5, 4], [29, 3, 5], [36, 5, 5.4], [43, 3, 5], [50, 5, 4.6], [57, 2, 4.4], [64, 3, 3.6], [101, 6, 3.6], [106, 4, 4.6], [113, 5, 5], [119, 2, 4.6]])
        + SCH.g(`<path d="M18 66 20 10h6l2 56z" fill="#8E3F2A"/><path d="M18.6 10h8.8V7h-8.8z" fill="#5C2A1E"/>
          <path d="M98 22V12h7v10z" fill="#8E3F2A"/><path d="M97.4 12h8.2V9.6h-8.2z" fill="#5C2A1E"/>
          <path d="M38 68V24h76v44z" fill="#A44A30"/><path d="M36 25l6-5h68l6 5z" fill="#5E6168"/>`, 1.6)
        + `<path d="${win}" fill="#EBDDB0" stroke="${K}" stroke-width=".8"/><path d="M38 34h76M38 43h76M38 52h76M38 61h76" stroke="#6E2A1A" stroke-width=".8" opacity=".6"/>`
        + `<path d="M20 20h6M19.6 34h7M19.2 48h7.6" stroke="${K}" stroke-width=".8" opacity=".45"/>`
        + SCH.g(`<path d="M69 68V57a5 5 0 0 1 10 0v11z" fill="#3A2620"/>
          <path d="M0 68V50l9-7 9 7 9-7 9 7v18z" fill="#B0573A"/><path d="M0 50l9-7 9 7 9-7 9 7" fill="none"/><path d="M6 45.6V41h3v2.2M24 45.6V41h3v2.2" fill="#8E3F2A" stroke-width="1"/>`, 1.4)
        + `<path d="M3 54h4v4H3zM12 54h4v4h-4zM21 54h4v4h-4zM30 54h4v4h-4z" fill="#EBDDB0" stroke="${K}" stroke-width=".7"/><path d="M7 68v-6h4v6zM25 68v-6h4v6z" fill="#3A2620"/>`
        + `<path d="M0 68h120v12H0z" fill="#9C968A"/><path d="M0 68h120" stroke="${K}" stroke-width="1.4"/><path d="M0 74h120M10 68l-2 12M40 68l-2 12M104 68l2 12" stroke="${K}" stroke-width=".6" opacity=".35"/>`
        + `<g fill="#3A3330">${ppl.map(([x, y]) => `<path d="M${x - 3.4} ${y + 6}l.8-8q.4-2.4 2.6-2.4t2.6 2.4l.8 8z"/><circle cx="${x}" cy="${y - 5}" r="2"/>`).join('')}</g>`
        + `<path d="${ppl.map(([x, y], i) => i % 2 ? `M${x - 2.4} ${y - 6.2}q2.4-1.6 4.8 0` : `M${x - 2.8} ${y - 6.6}h5`).join('')}" stroke="#3A3330" stroke-width="1.6"/>`
        + `<path d="M64 74l2-10q1-1 2.4 0l2 10z" fill="${SCK.burg}"/><circle cx="67" cy="62.4" r="2" fill="#D9A77E"/><path d="M64.6 62.4q2.4-4.4 4.8 0" fill="none" stroke="${SCK.burg}" stroke-width="1.4"/>`;
    } },
  /* an 18th-century salon at dawn: tall window and draped curtains, a candelabrum lit over a round table of open books, papers and quill, a classical bust on its pedestal, an empty chair */
  ev_iluminismo: {
    label: 'Um salão iluminado por velas, com livros abertos e um busto clássico',
    rx: /\b(iluminismo|iluminista|iluministas|salao|saloes|candelabro|candelabros)\b/,
    ev: 'iluminismo',
    draw: () => {
      const K = SCK.ink, fl = [[52, 26], [62, 20], [72, 26]];
      return SCH.bg('#7B1E3A') + `<path d="M44 8h30v30H44zM82 8h30v26H82z" fill="none" stroke="#9A3550" stroke-width="1.6"/>`
        + `<path d="M0 70h120v10H0z" fill="#8A5A34"/><path d="M0 70h120" stroke="${K}" stroke-width="1.4"/><path d="M10 70l-6 10M30 70l-4 10M54 70l-2 10M78 70l2 10M100 70l4 10" stroke="${K}" stroke-width=".7" opacity=".4"/>`
        + SCH.g(`<path d="M8 66V8h26v58z" fill="#E9DDBF"/><path d="M11 63V11h20v52z" fill="#DCE5E0"/>`, 1.4)
        + `<path d="M11 44h20v19H11z" fill="#F2E2BC"/><path d="M21 11v52M11 24h20M11 37h20M11 50h20" stroke="#E9DDBF" stroke-width="1.6"/>`
        + SCH.g(`<path d="M2 4h12q-2 30 3 66H2zM40 4H28q2 30-3 66h15z" fill="#5E1630"/><path d="M2 2h38v5q-19 6-38 0z" fill="#5E1630"/>`, 1.3)
        + `<path d="M7 10q-1 28 3 58M35 10q1 28-3 58" stroke="#3E0E20" stroke-width="1" fill="none"/><path d="M2 3.6h38" stroke="${SCK.gold}" stroke-width="1.4"/>`
        + SCH.g(`<path d="M90 70v-4h24v4zM93 66V46h18v20zM90 42h24v4H90z" fill="${SCK.stone}"/>
          <path d="M91 42q1-8 6-10h10q5 2 6 10z" fill="#EDE6D6"/><path d="M99 33v-4h6v5z" fill="#EDE6D6"/>
          <path d="M102 12c-5 0-8 3-8.4 7l-1.6 3.4 1.6.6-.6 2.4 1.2.6-.4 2c.4 1.6 2 2 4 1.6l1.4 3h8c1.4-3 2.6-6 2.6-11 0-6-3.4-9.6-7.8-9.6z" fill="#EDE6D6"/>`, 1.4)
        + `<path d="M95.6 16c1.4-4 5.4-5 9.4-4 3.6 1.2 5.4 4.6 5 9.4l-1.4 4-2.2-.4c.4-2.4-.4-4.4-2.6-5.4-1 2-3.6 2-4.4.2-1.6 1.4-3.4.8-3.8-1.2z" fill="#CFC5B0" stroke="${SCK.ink}" stroke-width="1"/><path d="M99 14.6q1 2 0 3.4M103 13.6q1.4 2 .4 4M107 15q1 2.4 0 4.4" stroke="${SCK.ink}" stroke-width=".7" fill="none" opacity=".6"/><circle cx="96" cy="21" r=".7" fill="${SCK.ink}"/><path d="M96 34q3 4 5 8M106 34q-1 4-3 8M97 50v14M101 50v14M105 50v14" stroke="${K}" stroke-width=".8" opacity=".4" fill="none"/>`
        + SCH.g(`<path d="M22 70l2-14h-2l1-18q4-6 10 0l1 18h-2l2 14" fill="#5E1630"/><path d="M24 40q4-4 8 0l.6 12h-9.2z" fill="${SCK.gold}" stroke-width="1"/>`, 1.3)
        + SCH.g(`<path d="M46 70q2-8-2-14M74 70q-2-8 2-14" fill="none" stroke-width="2.4"/><path d="M60 59.6c-12 0-22-1.6-22-4.2s10-4.2 22-4.2 22 1.6 22 4.2-10 4.2-22 4.2z" fill="#6E3A1E"/>`, 1.5)
        + SCH.g(`<path d="M40 53.4l1.6-4.4q5-1.4 10 .4 5-1.8 10-.4l1.6 4.4q-5.6-1-11.6.6-6-1.6-11.6-.6z" fill="${SCK.paper}" stroke-width="1"/><path d="M51.6 49.4v4.6" stroke-width=".8"/><path d="M66 52.6l2-4h12l-2 4zM67 48.6l2-3.4h11l-2 3.4z" fill="${SCK.teal}" stroke-width="1"/>
          <path d="M60 52.4v-3h4v3zM61 49.4V36M57 38q4 4 8 0" fill="${SCK.gold}" stroke-width="1"/>
          <path d="M52 32q0 6 10 6t10-6M62 38V28" fill="none" stroke="${SCK.gold}" stroke-width="1.8"/>
          <path d="M50.6 32V25h2.8v7zM60.6 26V19h2.8v7zM70.6 32V25h2.8v7z" fill="${SCK.white}" stroke-width=".9"/>`, 1)
        + `<path d="M52 32q0 6 10 6t10-6M62 38V28" fill="none" stroke="${K}" stroke-width=".6" opacity=".0"/>`
        + `<path d="${fl.map(([x, y]) => `M${x} ${y}h0`).join('')}" stroke="${SCK.goldHi}" stroke-width="9" stroke-linecap="round" opacity=".35"/>`
        + `<path d="${fl.map(([x, y]) => `M${x} ${y - 5}q2.6 3.4 0 5.4q-2.6-2-0-5.4z`).join('')}" fill="${SCK.goldHi}" stroke="${K}" stroke-width=".7"/>`
        + `<path d="M43 51q3.6-.8 7 .2M43.4 52.4q3.4-.6 6.6 .2M53.4 50.4q3.4-.8 6.6-.2M53 51.8q3.6-.6 7 .2M84 50l-6 2" stroke="${K}" stroke-width=".6" fill="none"/><path d="M84 52l1-7 2 1-2 6" fill="${SCK.white}" stroke="${K}" stroke-width=".6"/>`;
    } },

  /* a black leather spiked helmet with its plain brass plate, spike and chinscales, on a table with a rolled map and a pair of gloves; a grey window behind */
  pickelhaube: {
    label: 'Um capacete prussiano de ponta sobre uma mesa com um mapa',
    rx: /\b(pickelhaube|capacete prussiano|capacete de ponta|capacetes de ponta)\b/,
    draw: () => {
      const K = SCK.ink, hl = '#1F1B18', gl = 'M96 64.2l8-1.4M96 66.4l9.6-.2M96 68.6l9 1M95 70.6l6 2M90 63l2-4.6';
      return SCH.bg('#B9B09A') + `<path d="M0 0h120v6H0z" fill="#A99E86"/>`
        + SCH.g(`<path d="M6 50V8h28v42z" fill="#EDE6D6"/><path d="M9 47V11h22v36z" fill="#C9D0D2"/>`, 1.4)
        + `<path d="M20 11v36M9 23h22M9 35h22" stroke="#EDE6D6" stroke-width="1.6"/><path d="M9 40q10-4 22-2v9H9z" fill="#A9B2B4"/>`
        + `<path d="M0 56h120v24H0z" fill="#7A4A2A"/><path d="M0 56h120" stroke="${K}" stroke-width="1.6"/><path d="M0 64h120M0 73h120" stroke="${K}" stroke-width=".6" opacity=".3"/>`
        + SCH.g(`<path d="M2 66l34-6 6 14-36 5z" fill="${SCK.parch}"/><path d="M35 59.6a3 7.4-20 1 1 6 14.4z" fill="${SCK.sand}"/>
          `, 1.3)
        + `<path d="${gl}" stroke="${K}" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"/><path d="${gl}" stroke="#ECE3CC" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`
        + SCH.g(`<path d="M84 63h12v8H84z" fill="#ECE3CC"/><path d="M80 62h5v10h-5z" fill="#D8C9A6"/>`, 1.2)
        + `<path d="M88 70.6h4" stroke="${K}" stroke-width=".6" opacity=".5"/>`
        + `<path d="M8 70q8-4 14 0t12-2M14 63l4 12M26 61l3 12" stroke="${SCK.teal}" stroke-width=".9" fill="none" opacity=".8"/><path d="M6 67l30-5" stroke="${SCK.red}" stroke-width=".8" stroke-dasharray="2 1.4"/>`
        + SCH.g(`<path d="M44 60 30 64q8 3 18-1zM86 58l14 6q-8 3-16-1z" fill="${hl}"/>
          <path d="M44 61C40 42 50 26 66 26s26 16 22 35z" fill="${hl}"/>
          <path d="M63 24 66 4l3 20z" fill="${SCK.gold}"/><path d="M57 29q9-8 18 0l-2 2H59z" fill="${SCK.gold}"/><path d="M62 24h8v3h-8z" fill="${SCK.goldLo}" stroke-width="1"/>
          <path d="M47 33q5-3 10 0l1 12q-5 7-10 4-3-8-1-16z" fill="${SCK.gold}"/>`, 1.6)
        + `<path d="M48.6 35.4q3.6-2 7 0l.8 9q-3.6 5-7.2 3-2-6-.6-12z" fill="none" stroke="${SCK.goldLo}" stroke-width=".9"/>`
        + `<path d="M58 33q8-6 18-3" stroke="#5E5650" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M31 63.6q8 2.6 16-.6" stroke="${SCK.gold}" stroke-width="1" fill="none"/>`
        + `<path d="M81 50Q70 70 46 61" stroke="${K}" stroke-width="3.6" fill="none"/><path d="M81 50Q70 70 46 61" stroke="${SCK.gold}" stroke-width="2" fill="none"/><path d="M81 50Q70 70 46 61" stroke="${SCK.goldLo}" stroke-width="2" fill="none" stroke-dasharray=".8 1.6"/>`
        + `<circle cx="81" cy="50" r="3" fill="${SCK.gold}" stroke="${K}" stroke-width="1.2"/>`;
    } },
  /* the landing of the Thousand: volunteers in red shirts and kepis wade ashore from a rowboat and advance up the beach, two paddle steamers offshore, a yellow-stone town and the smoking cone of Etna behind */
  ev_unificacao_italia: {
    label: 'Voluntários de camisas vermelhas desembarcam numa praia da Sicília',
    rx: /\b(camisas vermelhas|camisa vermelha|marsala|unificacao italiana|expedicao dos mil)\b/,
    ev: 'unificacao_italia',
    draw: () => {
      const R = SCH.uid('gr'), K = SCK.ink, red = '#B8322A';
      const steamer = (x, y, k) => `<g transform="translate(${x} ${y}) scale(${k})">` + SCH.g(`<path d="M0 0h24l-2.4 3.6H2z" fill="#2A2420"/><path d="M9 0a3.4 3.4 0 0 1 6.8 0z" fill="#2A2420"/><path d="M11-.4v-8h3v8z" fill="#2A2420"/><path d="M4 0v-10M20 0v-9" stroke-width="1" fill="none"/>`, (.9 / k).toFixed(1))
        + `<path d="M12.6-10q-2-4 2-5t4-4" stroke="#9A948C" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`;
      return SCH.bg('#C6DADC')
        + `<defs><g id="${R}" stroke="${K}" stroke-width="1" stroke-linejoin="round">
          <path d="M-1.6-18-4.4-8.6-6.4 0H-3l2-8.4 2.6-9.6zM.4-18 3.4-8.6 4.6 0H8L6.4-8.6 3.6-18z" fill="#6B6E78"/><path d="M-5.6-3.4h3L-3 0h-3.4zM4.2-3.4h3L8 0H4.6z" fill="#2A2420"/>
          <path d="M-4.6-32H3.8l1.6 7-1 6.4H-5.2l-.8-6.4z" fill="${red}"/><path d="M-5-19.6h9.6v2.2H-5z" fill="#5C3A1E"/><path d="M-1-31l1 3.4" stroke-width=".7"/>
          <path d="M-6-14 9-37" stroke-width="3"/><path d="M-6-14 9-37" stroke="#6E4A2A" stroke-width="1.4"/>
          <path d="M-2-31 4-24.6l2-1.6L.6-31.4z" fill="${red}"/><circle cx="5" cy="-25.4" r="1.4" fill="#D9A77E"/>
          <circle cx=".6" cy="-35" r="2.6" fill="#D9A77E"/><path d="M-2.6-36.6h6.2l-.2-3-5.8-2.4z" fill="#3A3A44"/><path d="M3.4-37l3.2.6-3.2 1z" fill="#2A2420"/><path d="M1.4-33.6q1.6 1.6 3.4-.2" stroke="#5C3A1E" stroke-width="1.4" fill="none"/></g></defs>`
        + `<path d="M50 44 84 16q8-5 16 0l20 16v12z" fill="#8F8480"/><path d="M83.4 17q8.6-6 17.2-.6l-3 3-3.4-2-3.6 3-3.4-2.4-3.6 2z" fill="${SCK.white}"/>`
        + `<path d="M92 13q-4-5 2-8t6-6" stroke="#E4E4DE" stroke-width="3.4" fill="none" stroke-linecap="round"/>`
        + `<path d="M0 44q20-12 52-4v6H0z" fill="#C9B07A"/>`
        + SCH.g(`<path d="M4 41v-6h8v6zM12 41v-8h7v8zM22 40v-5h8v5zM31 40v-7h7v7zM19 33v-5h3v5z" fill="#E7CB86"/><path d="M18 33a5 5 0 0 1 10 0z" fill="#D9A95A"/><path d="M38 40V27h4v13z" fill="#E7CB86"/>`, .9)
        + `<path d="M0 44h120v16H0z" fill="${SCK.sea}"/>` + SCH.waves(50, '#7FA2B8', 1.1)
        + steamer(8, 50, .7) + steamer(34, 52, .8)
        + `<path d="M0 60q60-6 120-2v22H0z" fill="#E2C68E"/><path d="M0 60q60-6 120-2" stroke="#F4ECD8" stroke-width="2" fill="none"/>`
        + `<g transform="translate(0 6)">` + SCH.g(`<path d="M2 58h34q-4 7-14 7H10q-6-2-8-7z" fill="${SCK.wood}"/><path d="M30 60l12 6M8 60 0 66" fill="none" stroke-width="1.6"/>`, 1.3)
        + `<path d="M8 58l1-6q2-2 4 0l1 6zM20 58l1-6q2-2 4 0l1 6z" fill="${red}" stroke="${K}" stroke-width="1"/><circle cx="11" cy="49.6" r="2.2" fill="#D9A77E" stroke="${K}" stroke-width=".8"/><circle cx="23" cy="49.6" r="2.2" fill="#D9A77E" stroke="${K}" stroke-width=".8"/>`
        + `<path d="M9 48.6l.4-4h4l-.4 4zM21 48.6l.4-4h4l-.4 4z" fill="#3A3A44" stroke="${K}" stroke-width=".8"/>` + `</g>`
        + [[66, 72, .9], [80, 76, 1], [95, 71, .9], [110, 75, 1]].map(([x, y, k]) => `<use href="#${R}" transform="translate(${x} ${y}) scale(${k})"/>`).join('');
    } },

  /* the Crystal Palace: tier on tier of glass in a slender iron grid, the great arched transept in the middle, a fountain and flower beds before it, tiny visitors in top hats and crinolines */
  palacio_cristal: {
    label: 'O Palácio de Cristal, de ferro e vidro, num parque',
    rx: /\b(palacio de cristal|cristal|estufa)\b/,
    draw: () => {
      const K = SCK.ink, gl = '#DCE8EA', ir = SCK.teal;
      let grid = '';
      for (let x = 7; x < 116; x += 3.6) grid += `M${x.toFixed(1)} 40v18`;
      for (let x = 14; x < 106; x += 3.6) grid += `M${x.toFixed(1)} 31v9`;
      for (let x = 24; x < 96; x += 3.6) grid += `M${x.toFixed(1)} 24v7`;
      const ppl = [[24, 66, SCK.burg], [30, 68, K], [90, 66, SCK.teal], [96, 67, K], [46, 72, SCK.red], [76, 73, K]];
      return SCH.bg('#BFD3D9') + SCH.sun(104, 12, 6, '#F4E3B6')
        + `<path d="M0 54q20-10 40-6t50-4 30 2v14H0z" fill="#8FA87A"/>`
        + SCH.g(`<path d="M3 58V40h114v18z" fill="${gl}"/><path d="M11 40v-9h98v9z" fill="${gl}"/><path d="M21 31v-7h78v7z" fill="${gl}"/>`, 1.4)
        + `<path d="${grid}M3 49h114M11 35.6h98M21 27.6h78" stroke="${ir}" stroke-width=".7" opacity=".75"/>`
        + `<path d="M3 40h114M11 31h98M21 24h78" stroke="${SCK.white}" stroke-width="1.4"/>`
        + SCH.g(`<path d="M45 58V26a15 15 0 0 1 30 0v32z" fill="${gl}"/>`, 1.6)
        + `<path d="M60 26 60 11M60 26 49.4 15.4M60 26 70.6 15.4M60 26 46 20M60 26 74 20M49 30v28M55 30v28M65 30v28M71 30v28M45 40h30M45 49h30" stroke="${ir}" stroke-width=".8" opacity=".85"/>`
        + `<path d="M48.6 26a11.4 11.4 0 0 1 22.8 0" fill="none" stroke="${ir}" stroke-width="1"/><path d="M45 30h30" stroke="${SCK.white}" stroke-width="1.4"/>`
        + `<path d="M0 58h120v22H0z" fill="${SCK.green}"/><path d="M0 58h120" stroke="${K}" stroke-width="1.4"/><path d="M52 80l5-22h6l5 22z" fill="#D8C9A6"/>`
        + SCH.g(`<ellipse cx="60" cy="68" rx="15" ry="4.4" fill="${SCK.stone}"/><ellipse cx="60" cy="67.4" rx="12" ry="3" fill="${SCK.sea}" stroke-width=".8"/>
          <circle cx="8" cy="52" r="7" fill="${SCK.olive}"/><circle cx="113" cy="52" r="7" fill="${SCK.olive}"/>`, 1.3)
        + `<path d="M60 67V52M60 53q-5 2-7 10M60 53q5 2 7 10" stroke="${SCK.white}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`
        + `<path d="M10 64h26M12 70h30M84 64h26M78 70h30" stroke="${SCK.red}" stroke-width="2.2" stroke-dasharray="1.4 1.8" stroke-linecap="round"/>`
        + ppl.map(([x, y, c], i) => i % 2 ? `<path d="M${x - 1.4} ${y}v-5h2.8v5zM${x - 1.4} ${y - 7.4}h2.8v-2.6h-2.8z" fill="${c}"/><circle cx="${x}" cy="${y - 6.4}" r="1.3" fill="${c}"/>`
          : `<path d="M${x - 3.4} ${y}q1-5 3.4-6.6 2.4 1.6 3.4 6.6z" fill="${c}"/><circle cx="${x}" cy="${y - 7.6}" r="1.3" fill="${c}"/>`).join('');
    } },

  /* a field gun of the 1860s beside a zig-zag split-rail fence on a green rise, a blue kepi and a grey kepi in the grass, a farmhouse, a barn and the wheat behind */
  ev_guerra_secessao: {
    label: 'Um canhão de campanha junto a uma cerca de madeira, com dois quepes, um azul e um cinzento',
    rx: /\b(guerra de secessao|guerra civil americana|secessao|gettysburg|quepe|quepes)\b/,
    ev: 'guerra_secessao',
    draw: () => {
      const K = SCK.ink;
      const fence = 'M0 58l12-6 12 6 12-6 12 6 12-6 12 6 12-6 12 6 12-6 12 6';
      const kepi = (x, y, c, t, f) => `<g transform="translate(${x} ${y}) scale(${f * 1.6} 1.6)"><ellipse cx="3" cy=".8" rx="10" ry="1.8" fill="#3E5A30"/>` + SCH.g(`<path d="M0 0h12l-1-10.4-8.4 3.6z" fill="${c}"/><path d="M2.8-6.8 10.8-10.2" stroke="${t}" stroke-width="1.6"/><path d="M.8-.4-6.6 1q-.6 1.4 1.4 1.6L1.4 1z" fill="#2A2420"/>`, .9)
        + `<path d="M.3-1.8h11.6" stroke="#2A2420" stroke-width="2.4"/><circle cx="1.4" cy="-1.8" r=".8" fill="${SCK.gold}"/></g>`;
      return SCH.bg('#CBD9D6') + `<path d="M70 14q4-6 10-3 6-4 10 1 6 0 5 4H70z" fill="${SCK.white}" opacity=".8"/><path d="M0 40q30-8 60-4t60-2v14H0z" fill="#9EAF86"/>`
        + SCH.g(`<circle cx="92" cy="35" r="5"/><circle cx="100" cy="33" r="6"/><circle cx="108" cy="36" r="4.4"/>`, 1) + `<g fill="#56703F"><circle cx="92" cy="35" r="5"/><circle cx="100" cy="33" r="6"/><circle cx="108" cy="36" r="4.4"/></g>`
        + `<path d="M0 46q40-6 80-3t40 0v10H0z" fill="#D9B95E"/><path d="M6 46v-3M14 45v-3M22 45v-3M30 44v-3M70 44v-3M78 44v-3M86 44v-3M94 44v-3M102 44v-3M110 45v-3" stroke="#A8862F" stroke-width="1" opacity=".8"/>`
        + SCH.g(`<path d="M8 44V34h16v10z" fill="${SCK.white}"/><path d="M6 34l10-7 10 7z" fill="#5E6168"/><path d="M28 44V33l6-5 6 5v11z" fill="#9E3B2A"/>`, 1.1)
        + `<path d="M11 37h3v3h-3zM18 37h3v3h-3z" fill="#3A3A44"/><path d="M32 44v-5h4v5z" fill="#5C2A1E"/>`
        + `<path d="M0 54q50-8 120-6v32H0z" fill="${SCK.green}"/><path d="M0 70q60-6 120-2v12H0z" fill="#5E7A44"/>`
        + `<g stroke-linecap="round" stroke-linejoin="round"><path d="${fence}M0 54l12-6 12 6 12-6 12 6 12-6 12 6 12-6 12 6 12-6 12 6" stroke="${K}" stroke-width="3.6" fill="none"/><path d="${fence}M0 54l12-6 12 6 12-6 12 6 12-6 12 6 12-6 12 6 12-6 12 6" stroke="#A47A50" stroke-width="1.8" fill="none"/></g>`
        + `<path d="M12 52v-8M36 52v-8M60 52v-8M84 52v-8M108 52v-8" stroke="${K}" stroke-width="1" opacity=".5"/>`
        + `<g transform="translate(8 0)">` + SCH.g(`<path d="M38 52.4 74 57.6l-1 5.4-34.4-6.2z" fill="${SCK.goldLo}"/><path d="M37.4 52 36 57.6" stroke-width="3"/><circle cx="77" cy="58" r="3" fill="${SCK.goldLo}"/>
          <path d="M66 58h14l34 14-3 3-38-10z" fill="#6B6A44"/><circle cx="72" cy="64" r="12" fill="none" stroke-width="3.8"/><circle cx="72" cy="64" r="12" fill="none" stroke="#7A5A34" stroke-width="2"/>`, 1.4)
        + `<path d="M72 52v24M60 64h24M63.6 55.6l16.8 16.8M80.4 55.6 63.6 72.4" stroke="#7A5A34" stroke-width="1.7"/><circle cx="72" cy="64" r="2.6" fill="${K}"/></g>`
        + kepi(14, 74, '#3D5288', '#6478B0', 1) + kepi(60, 77, '#8E9196', '#B8BBC0', -1)
        + `<path d="M4 78l2-5 1 5M52 74l1-4 2 4M100 78l2-5 1 5" stroke="#3E5A30" stroke-width="1.2" fill="none"/>`;
    } },
  /* the smoke that thunders: a mile-wide curtain of water falling into a narrow gorge, the spray rising in a cloud with a rainbow, rainforest on the near lip, a dugout canoe on the river above */
  cataratas_vitoria: {
    label: 'Uma imensa cachoeira em cortina, com nuvem de vapor e arco-íris',
    rx: /\b(cataratas|cachoeira|cachoeiras|catarata|queda d'agua|quedas d'agua)\b/,
    draw: () => {
      const K = SCK.ink;
      let st = '';
      for (let x = 2; x < 120; x += 3.4) st += `M${x.toFixed(1)} ${34 + Math.round(x * 7) % 5}v${14 + Math.round(x * 3) % 12}`;
      const puff = (cs, c, o) => { const d = cs.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join(''); return `<g stroke="${o}" stroke-width="2">${d}</g><g fill="${c}">${d}</g>`; };
      return SCH.bg('#C3D8DC')
        + puff([[100, 4, 6], [96, 12, 6], [104, 14, 6], [98, 22, 7], [108, 22, 6]], '#F2F5F2', '#A9BCC2')
        + `<path d="M0 22q6-6 12-2 6-5 13-1 7-4 14 0 6-5 13-1 7-4 14 0 6-4 12 0 7-5 14-1 6-4 12 0 7-4 16 0v12H0z" fill="#56703F"/>`
        + `<path d="M0 25h120v6H0z" fill="#6F97AE"/><path d="M8 27.6h10M50 28h14M96 27.4h12" stroke="#A9C4D0" stroke-width=".9"/>`
        + `<path d="M70 27.4h11l-1.6 1.8h-8z" fill="#5C3A1E" stroke="${K}" stroke-width=".6"/>`
        + SCH.g(`<path d="M0 31h120v34H0z" fill="#EEF3F2"/>`, 1.4)
        + `<path d="M0 32h120v3H0z" fill="#8FB4BC"/><path d="${st}" stroke="#9DB5C0" stroke-width="1.4"/>`
        + SCH.g(`<path d="M32 31h10l2 12-1 16H33l-2-14zM86 31h8l1 12-1 16h-8l-1-14z" fill="#5A4A3C"/><path d="M34 40l3 6M40 50l-2 5M88 40l2 6" stroke="#3A2E24" stroke-width="1"/><path d="M30 31q7-7 14 0zM84 31q5-6 11 0z" fill="#56703F"/>`, 1.2)
        + `<path d="M0 60h120v20H0z" fill="#3E3A34"/>`
        + puff([[6, 62, 5], [16, 60, 6], [28, 61, 6], [40, 58, 6], [52, 60, 7], [64, 57, 6], [76, 60, 7], [88, 58, 6], [100, 61, 6], [112, 59, 6], [120, 62, 5]], '#F7F8F4', '#A9BCC2')
        + `<g fill="none" stroke-width="1.8" opacity=".9"><path d="M30 66a30 30 0 0 1 60 0" stroke="#C8463A"/><path d="M31.8 66a28.2 28.2 0 0 1 56.4 0" stroke="#E2B13E"/><path d="M33.6 66a26.4 26.4 0 0 1 52.8 0" stroke="#7FA05A"/><path d="M35.4 66a24.6 24.6 0 0 1 49.2 0" stroke="#5C7EAA"/></g>`
        + SCH.g(`<path d="M0 80V66q6-5 12-2 6-5 12 0 8-4 14 1 8-3 14 2 8-4 14 0 8-5 14 0 8-4 14 0 7-4 14-1 6-3 12 1v14z" fill="#3F5A2E"/>`, 1.4)
        + `<path d="M8 70q4-2 8 2M30 69q4 0 6 4M66 70q4-1 7 3M100 70q-4 0-6 4" stroke="#7F9C5A" stroke-width="1.4" fill="none"/>`;
    } },

  /* a long military hospital ward at night: arched windows full of moonlight, iron beds receding in rows, and in front a folding Turkish lantern glowing on a little table */
  dama_lampada: {
    label: 'Uma lamparina turca acesa numa enfermaria militar à noite',
    rx: /\b(lampada|lampadas|lamparina|lamparinas|lanterna|lanternas|enfermaria|enfermarias)\b/,
    draw: () => {
      const K = SCK.ink, moon = '#9FB2C8';
      const BD = SCH.uid('bd');
      const bed = (x, y, s) => `<use href="#${BD}" transform="translate(${x} ${y}) scale(${s} ${Math.abs(s)})"/>`;
      return SCH.bg('#26324A') + `<path d="M0 0h120L80 24H40z" fill="#1E2840"/><path d="M40 24h40v22H40z" fill="#33425E"/><path d="M0 80 40 46h40l40 34z" fill="#3A4256"/>`
        + `<path d="M0 0 40 24v22L0 80zM120 0 80 24v22l40 34z" fill="#2E3C58"/>`
        + `<path d="M54 46V33a6 6 0 0 1 12 0v13z" fill="${moon}"/><path d="M60 27v19M54 37h12" stroke="#33425E" stroke-width="1"/>`
        + `<path d="M6 44V18q4-6 9 0v29zM22 41V25q3-4 6 1v15zM31 40V29q2-3 4 1v10z" fill="${moon}"/><path d="M10.6 15v31M6 31l9 1M25 25v16M33 29v11" stroke="#2E3C58" stroke-width="1"/>`
        + `<path d="M0 80 22 62l18 2v16z" fill="${moon}" opacity=".18"/>`
        + `<defs><g id="${BD}"><path d="M0 4V-5q3-3 6 0v12" fill="none" stroke="#C9CED6" stroke-width="1.4"/><path d="M2 0h22l5 5H7z" fill="#E4E0D4"/><path d="M10 0h14l5 5H15z" fill="#7E8CA6"/>
          <path d="M2.6.4h5l2 3.6h-5z" fill="${SCK.white}"/><path d="M7 5h22v3H7z" fill="#A9AEB8"/><path d="M8 8v3M28 8v3M28 6V-1" stroke="#C9CED6" stroke-width="1.2"/></g></defs>`
        + bed(34, 49, .3) + bed(24, 52.6, .5) + bed(3, 59, .9) + bed(86, 49, -.3) + bed(96, 52.6, -.5)
        
        + SCH.sun(94, 44, 26, '#F2D27A33') + SCH.sun(94, 44, 17, '#F2D27A44') + `<path d="M70 80l12-16h26l10 16z" fill="#F2D27A" opacity=".16"/>`
        + SCH.g(`<path d="M76 66h36v4H76zM80 70l-2 10M108 70l2 10" fill="${SCK.wood}"/>
          <path d="M87 60h14v6H87zM88 30h12l1 4H87z" fill="${SCK.goldLo}"/><path d="M87.6 34h12.8v26H87.6z" fill="#F7E7B0"/>
          <path d="M91 30q3-6 6 0" fill="none" stroke-width="1.4"/><path d="M94 24v-2" stroke-width="1.2"/>`, 1.4)
        + `<path d="M87.6 38.4h12.8M87.6 42.8h12.8M87.6 47.2h12.8M87.6 51.6h12.8M87.6 56h12.8" stroke="#D9A93E" stroke-width="1"/>`
        + `<path d="M94 50q-2.4-3 0-7 2.4 4 0 7z" fill="#F2A23A"/>`;
    } },

  /* a three-masted ship of the 1770s at anchor in a Hawaiian bay, sails furled, below green volcanic ridges and palms, with outrigger canoes under crab-claw sails around her */
  endeavour_havai: {
    label: 'Um navio de três mastros numa baía havaiana, rodeado de canoas com balancins',
    rx: /\b(havai|canoa|canoas|polinesia|balancim|balancins)\b/,
    draw: () => {
      const K = SCK.ink, mat = '#D9B77A';
      const canoe = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">` + SCH.g(`
          <path d="M0-2-14-32Q-2-20 12-37z" fill="${mat}"/><path d="M0-2-14-32M0-2 12-37" stroke-width="1.8"/><path d="M-18 0h30q-2 3-5 3h-22q-3-1-3-3zM-4 0l-2 6M8 0l2 6" fill="#5C3A1E"/><path d="M-14 6.4h28" stroke-width="2.6"/>`, (1.3 / s).toFixed(1))
        + `<path d="M-2-6-8-23M1-5-1-23.6M3-7 6-28" stroke="#A8862F" stroke-width=".9" fill="none"/><path d="M-12 0q-1-4 1-5 2 1 1 5zM4 0q-1-4 1-5 2 1 1 5z" fill="#3A2A1C"/></g>`;
      return SCH.bg('#BFD8DA') + SCH.sun(20, 12, 6, '#F7EED6')
        + `<path d="M0 44 12 26l10 6 18-22 16 14 14-8 18 12 14-4 18 10v14H0z" fill="#8FA49A"/>`
        + SCH.g(`<path d="M0 48V36l14-6 12 8 18-12 14 10 12-4 20 8 30-2v10z" fill="#56703F"/>`, 1.3)
        + `<path d="M14 32l4 14M44 28l-2 18M58 36l3 10M90 42l-2 6" stroke="#3E5A30" stroke-width="1" opacity=".8"/>`
        + `<path d="M0 46h40v3H0z" fill="#E2C68E"/><path d="M0 49h120v31H0z" fill="${SCK.sea}"/>` + SCH.waves(70, '#7FA2B8', 1.1)
        + `<path d="M8 47q0-10 4-17M20 47q1-9-2-15" stroke="#5C3A1E" stroke-width="1.6" fill="none"/><path d="M12 30l-6 2M12 30l6 1M12 30l-3 5M12 30l4 4M18 32l-5 1M18 32l5 0M18 32l-2 5M18 32l4 4" stroke="#3E5A30" stroke-width="1.8" stroke-linecap="round"/>`
        + SCH.g(`<path d="M60 12v38M78 8v42M94 16v34" stroke-width="1.8"/><path d="M58 44l-14-8" stroke-width="1.8"/>
          <path d="M54 22h12M54 33h12M71 18h14M70 30h16M89 24h10M88 34h12" stroke="${SCK.white}" stroke-width="2.6"/>
          <path d="M52 44q28 3 54-2l-2 7q-4 5-12 5H62q-7-2-10-10z" fill="${SCK.wood}"/>`, 1.1)
        + `<path d="M53 47.6q26 2.4 52-1.6" stroke="${SCK.ochre}" stroke-width="1.4" fill="none"/><path d="M56 44 60 12 64 44M74 44l4-36 4 36M90 44l4-28 4 28M44 36 60 12" stroke="${K}" stroke-width=".5" opacity=".6" fill="none"/>`
        + `<path d="M53 48q-6 6-10 6" stroke="${K}" stroke-width=".7" fill="none"/>`
        + canoe(30, 68, 1) + canoe(98, 62, .7) + canoe(118, 74, .5);
    } },
});
