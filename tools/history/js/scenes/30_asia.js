/* Ásia — the scenes of the steppe, China, India, Japan, Korea, Persia and the Ottomans (conventions in _core.js) */
Object.assign(SCENE, {
  /* the open steppe: three white felt gers, a black horsetail standard and a small herd under a huge sky */
  mongois_estepe: {
    label: 'Iurtas brancas na estepe, com cavalos e um estandarte de crina',
    rx: /\b(mongol|mongois|yurta|yurtas|iurta|iurtas|estepe)\b/,
    draw: () => {
      const f = n => +n.toFixed(1);
      const ger = (x, y, w) => {
        const h = w * .34, r = w * .19, t = y - h;
        return `<path d="M${f(x - w / 2)} ${y}V${f(t)}h${w}V${y}z" fill="${SCK.white}"/>
          <path d="M${f(x - w / 2 - 1.6)} ${f(t + .8)}Q${f(x - w * .36)} ${f(t - r * .95)} ${f(x - w * .12)} ${f(t - r)}H${f(x + w * .12)}Q${f(x + w * .36)} ${f(t - r * .95)} ${f(x + w / 2 + 1.6)} ${f(t + .8)}zM${f(x - w * .1)} ${f(t - r)}v-1.6h${f(w * .2)}v1.6" fill="#E4DAC0"/>
          <path d="M${f(x - w * .09)} ${y}V${f(t + h * .3)}h${f(w * .18)}V${y}z" fill="#C0522E" stroke-width="1.1"/>`
          + `<path d="M${f(x - w / 2)} ${f(t + 2)}h${w}" stroke="${SCK.sea}" stroke-width="1.4" fill="none"/>`
          + `<path d="M${f(x - w * .12)} ${f(t - r)}L${f(x - w * .38)} ${f(t - .4)}M${f(x + w * .12)} ${f(t - r)}L${f(x + w * .38)} ${f(t - .4)}" stroke-width=".8" opacity=".45" fill="none"/>`;
      };
      const horse = (x, y, s, c, flip) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})" fill="none" stroke="#2E2218"><path d="M-7-6.5C-7-9-5-9.6-2-9.4H3.6L7.6-13.4 8.4-14.8 9-13.4 12-9.6 11.4-8.2 7.4-9.4 5.8-5.6 6.4 0H4.6L4.4-3.4H-3.6L-4.4 0H-6.2L-6.4-3.8Q-7.4-5-7-6.5z" fill="${c}" stroke="${SCK.ink}"/><path d="M-7-7.4q-3.4 1-2.8 6.6M3.4-9.6Q6-10.8 8-14" stroke-width="2"/></g>`;
      return SCH.bg('#C4D8DD')
        + `<ellipse cx="34" cy="14" rx="18" ry="4" fill="${SCK.white}" opacity=".75"/><ellipse cx="96" cy="22" rx="14" ry="3" fill="${SCK.white}" opacity=".6"/>`
        + `<path d="M0 44l14-7 10 4 14-8 14 8 12-4 16 5 16-8 14 6 10-3v13H0z" fill="#9FB1B3"/>`
        + `<path d="M0 52Q20 42 44 48T84 46T120 47v33H0z" fill="${SCK.green}"/>`
        + `<path d="M0 62Q40 55 80 60T120 58v22H0z" fill="#C9B26B"/>`
        + `<path d="M8 70q6-2 12 0M30 74q8-2 14 0M58 68q6-1.6 10 0M96 66q6-1.6 12 0" stroke="${SCK.olive}" stroke-width="1" fill="none" opacity=".6"/>`
        + SCH.g(ger(108, 56, 18) + ger(84, 60, 28) + ger(48, 67, 42), 1.4)
        + horse(26, 57, .6, '#5A3A22') + horse(84, 77, 1.2, SCK.wood) + horse(108, 75, 1.1, '#D7BE86', 1)
        + SCH.g(`<path d="M16 78V9" stroke-width="3.2"/><path d="M16 78V9" stroke="${SCK.wood}" stroke-width="1.4"/>
          <path d="M16 1.6q2.6 4.4 0 8.4q-2.6-4-0-8.4z" fill="${SCK.stone}" stroke-width="1.1"/><path d="M12.4 10.6h7.2v2.2h-7.2z" fill="${SCK.gold}" stroke-width="1.1"/>
          <path d="M12.6 12.8Q9.6 20 10.6 28q2.6 2 5.4.6 2.8 1.4 5.4-.6 1-8-2-15.2z" fill="#2E2620" stroke-width="1.2"/>`, 1.4)
        + `<path d="M13 15q-1 6-.4 12M16 14v14M19 15q1 6 .4 12" stroke="#8A7E70" stroke-width=".7" fill="none"/>`;
    } },

  /* the clay army in its earthen pit: rank behind rank of armoured foot soldiers, a chariot horse in front */
  exercito_terracota: {
    label: 'Fileiras de guerreiros de terracota numa vala de escavação',
    rx: /\b(terracota)\b/,
    draw: () => {
      const id = SCH.uid('tc');
      const rank = (x, y, s, w) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="0" y="-30" width="${w}" height="30" fill="url(#${id})"/></g>`;
      return SCH.bg('#B58A57')
        + `<defs><pattern id="${id}" width="14" height="30" x="0" y="-30" patternUnits="userSpaceOnUse"><g stroke="${SCK.ink}" stroke-width=".8" stroke-linejoin="round">
          <path d="M4.4 30v-5.4h2.2V30zM7.4 30v-5.4h2.2V30z" fill="#7E6C58"/>
          <path d="M3 25.4 3.8 18.6h6.4l.8 6.8z" fill="#A8937A"/>
          <path d="M3.8 19V11.6Q7 10 10.2 11.6V19z" fill="#8C7862"/>
          <path d="M3.8 11.8 1.8 13.4 1.6 20.4h2.2zM10.2 11.8l2 1.6.2 7h-2.2z" fill="#A8937A"/>
          <ellipse cx="7" cy="7.6" rx="2.4" ry="2.8" fill="#BBA488"/><circle cx="8.6" cy="4.4" r="1.3" fill="#7E6C58"/></g>
          <path d="M4.6 13.6h4.8M4.6 15.6h4.8M4.6 17.6h4.8" stroke="${SCK.ink}" stroke-width=".7" stroke-dasharray=".6 .9" opacity=".6"/></pattern></defs>`
        + `<path d="M0 0h120v16H0z" fill="#9C7244"/><path d="M0 5h120M0 10h120" stroke="#7E5A34" stroke-width="1" opacity=".6"/><path d="M0 16h120" stroke="${SCK.ink}" stroke-width="1.4"/>`
        + `<path d="M0 30h120v2H0zM0 50h120v2H0z" fill="#D8B887"/>`
        + rank(-3, 31, .6, 220) + rank(-6, 51, .8, 160) + rank(36, 80, 1.1, 80)
        + SCH.g(`<path d="M-2 49C4 48 8 47 11 46 15 40 18 33 22.6 29L23 23.6 26 27.4 28.2 22.8 28.8 28.4C32 30 36 36 39.8 41.6 41.4 44.4 40.6 47.4 37.6 47.2 35 46.8 31.4 45.4 29.4 41.8 28.8 46 29.6 52 30.6 57 31 61 30 64 29.4 66L30 80H24L23.6 67H12.4L12.6 80H6.6L6 66H-2z" fill="#A6917A"/>
          <path d="M11 46C15 40 18 33 22.8 29.2" stroke-width="4.4" fill="none"/>`, 1.5)
        + `<path d="M11 46C15 40 18 33 22.8 29.2" stroke="#7E6C58" stroke-width="2.2" fill="none"/><path d="M24.6 28q2-1.6 3.6-.6l-1 2.4z" fill="#7E6C58"/>
          <circle cx="29.4" cy="33.6" r="1.3" fill="${SCK.ink}"/><circle cx="37.4" cy="43" r=".9" fill="${SCK.ink}"/>
          <path d="M33.6 45.6l5.4.6M29.6 41.8q2-6 0-10M14 60q6 2 12 0M9 70v8M26.6 70v8" stroke="${SCK.ink}" stroke-width=".8" fill="none" opacity=".55"/>`;
    } },

  /* the scholar's low red table: a book of bamboo slips unrolled, the inkstone and the brush on its rest, a pine at the moon window */
  rolo_bambu: {
    label: 'Um livro de tiras de bambu desenrolado sobre uma mesa baixa, com pincel e tinta',
    rx: /\b(bambu|tiras de bambu|pincel)\b/,
    draw: () => {
      let slips = '', marks = '', cord = '';
      for (let i = 0; i < 13; i++) {
        const x = 24 + i * 3.7;
        slips += `M${x.toFixed(1)} 28h3.2v26h-3.2z`;
        marks += `M${(x + 1.6).toFixed(1)} ${30 + (i % 3)}v${19 - (i % 4) * 2}`;
        cord += `q1.9 ${i % 2 ? 1.4 : -1.4} 3.7 0`;
      }
      const tuft = (x, y) => `M${x} ${y}l-3.4-2.6M${x} ${y}h-4M${x} ${y}l-3 3M${x} ${y}l-.4-4M${x} ${y}l2.6-3`;
      return SCH.bg('#E6D7B4')
        + SCH.g(`<path d="M80 1h24v21H80z" fill="#CFE0DD" stroke-width="4.4"/>`, 1)
        + `<path d="M80 1h24v21H80z" fill="none" stroke="${SCK.wood}" stroke-width="2.4"/><path d="M80 4.4h24M80 18.6h24M83.4 1v3.4M88 1v3.4M92 1v3.4M96 1v3.4M100.6 1v3.4M83.4 18.6V22M88 18.6V22M92 18.6V22M96 18.6V22M100.6 18.6V22" stroke="${SCK.wood}" stroke-width="1"/>`
        + `<path d="M104 7Q94 8 84 15M95 9q-2 3 0 7" stroke="#5A3A22" stroke-width="1.6" fill="none"/>
          <path d="${tuft(87, 13)}${tuft(92, 10)}${tuft(99, 10)}${tuft(96, 16)}" stroke="${SCK.olive}" stroke-width="1.3" stroke-linecap="round"/>`
        + `<path d="M0 64h120v16H0z" fill="#9C6B3E"/><path d="M0 70h120M0 76h120" stroke="#7E5230" stroke-width=".8"/>`
        + SCH.g(`<path d="M8 75l2-14h5l-1 14zM112 75l-2-14h-5l1 14z" fill="#5E1616"/>
          <path d="M12 24h96l8 32H4z" fill="${SCK.red}"/><path d="M4 56h112v5H4z" fill="#6E1414"/>
          <path d="M10 33h11v16H10z" fill="#3A3436" stroke-width="1.2"/><path d="M12 35h7v5h-7z" fill="#151214" stroke-width=".8"/><path d="M12 47.6l7-5.6 1.6 1.8-7 5.6z" fill="#151214" stroke-width=".8"/>
          <path d="${slips}" fill="#DCC47E" stroke-width=".8"/>
          <path d="M72.4 54V30q6-3.4 12 0v24z" fill="#C8AE62" stroke-width="1.2"/><ellipse cx="78.4" cy="54" rx="6" ry="4.4" fill="#DCC47E" stroke-width="1.2"/>`, 1.6)
        + `<path d="M23.6 33${cord}M23.6 49${cord}" stroke="#5A3A22" stroke-width="1.2" fill="none"/><path d="${marks}" stroke="${SCK.ink}" stroke-width=".8" stroke-dasharray="1.6 1.2" opacity=".55"/>
          <path d="M74.4 31v20M76.4 30v20M78.4 29.6v20M80.4 30v20M82.4 31v20" stroke="#8C7440" stroke-width=".7" opacity=".7"/>
          <path d="M78.4 54m-3.6 0a3.6 2.6 0 1 1 3.6 2.6M78.4 54m-1.6 0a1.6 1.2 0 1 1 1.6 1.2" stroke="#8C7440" stroke-width=".8" fill="none"/>`
        + SCH.g(`<path d="M96 55l2.6-5 2.4 2.6 3-6.4 3 6.4 2.4-2.6 2.6 5z" fill="#7E9C8A" stroke-width="1.1"/><path d="M90 52.6 116 45.6" stroke-width="4.2"/><path d="M90 52.6 116 45.6" stroke="#D8C08A" stroke-width="2.2"/>
          <path d="M90.6 50.8Q85 52 81 55Q86 55.4 91.2 53.6z" fill="${SCK.ink}" stroke-width=".8"/>`, 1)
        + `<path d="M14 25.4h92" stroke="#C84A3A" stroke-width=".8" opacity=".7"/>`;
    } },

  /* the great stupa behind its carved stone gateway, a sacred fig spreading beside it */
  stupa_bodhi: {
    label: 'Uma grande estupa com portais de pedra, ao lado de uma figueira sagrada',
    rx: /\b(stupa|estupa|sanchi|bodhi|figueira)\b/,
    draw: () => {
      let posts = '';
      for (let x = 30; x <= 108; x += 4) posts += `M${x} 61v8`;
      const leaf = (x, y, r) => `<path d="M0 0q-3-2.4-2.4-4.6q.8-1.6 2.4-.4q1.6-1.2 2.4.4q.6 2.2-2.4 4.6v1.6" transform="translate(${x} ${y}) rotate(${r})"/>`;
      const vol = [48, 32, 88, 32, 48, 38, 88, 38, 48, 44, 88, 44].reduce((a, v, i, l) => i % 2 ? a : a + `<circle cx="${v}" cy="${l[i + 1] + 1.6}" r="2.4"/>`, '');
      return SCH.bg('#CBDCD6') + SCH.sun(106, 13, 7, '#F4E3B6')
        + `<path d="M0 66h120v14H0z" fill="#D9BD86"/>`
        + SCH.g(`<path d="M68 3v13" stroke-width="1.4"/><path d="M63 5.4h10M61 8.8h14M59 12.2h18" stroke-width="2.8"/>
          <path d="M62 16h12v8H62z" fill="${SCK.stone}" stroke-width="1.2"/>
          <path d="M37 56A31 32 0 0 1 99 56z" fill="#E2D8BE"/>
          <path d="M33 54h70v7H33zM26 61h84v8H26z" fill="${SCK.stone}"/>`, 1.6)
        + `<path d="M63 5.4h10M61 8.8h14M59 12.2h18" stroke="${SCK.gold}" stroke-width="1.1"/><path d="M62 19h12M66 16v8M70 16v8" stroke="${SCK.ink}" stroke-width=".7" opacity=".6"/>
          <path d="M44 38q24-7 48 0M33 57.4h70" stroke="${SCK.ink}" stroke-width=".8" opacity=".35" fill="none"/>
          <path d="${posts}M26 64h84M26 66.6h84" stroke="${SCK.ink}" stroke-width=".8" opacity=".5"/>`
        + SCH.g(`<path d="M58.6 76V48h4v28zM73.4 76V48h4v28z" fill="#C7B48E"/><path d="M56.6 49.6h8v-3.6h-8zM71.4 49.6h8v-3.6h-8z" fill="#B49F78" stroke-width="1.1"/>
          <path d="M48 44h40v3.2H48zM48 38h40v3.2H48zM48 32h40v3.2H48z" fill="#D6C59E"/>
          <g fill="#D6C59E" stroke-width="1.1">${vol}</g>
          <path d="M62.6 38v-2.8M68 38v-2.8M73.4 38v-2.8M62.6 44v-2.8M68 44v-2.8M73.4 44v-2.8" stroke-width="1.1"/>
          <path d="M68 32v-3M65.4 28.4q2.6 3 5.2 0M50 32v-2.4M86 32v-2.4" stroke-width="1.3" fill="none"/>`, 1.3)
        + `<path d="M59.6 54h2M59.6 62h2M59.6 70h2M74.4 54h2M74.4 62h2M74.4 70h2" stroke="${SCK.ink}" stroke-width=".9" opacity=".5"/>`
        + SCH.g(`<path d="M14 76q4-14 3-30q-4-6-8-8M17 46q4-8 10-10M17 54q-8-2-12 0" stroke="${SCK.wood}" stroke-width="5" fill="none"/>
          <path d="M-2 40q-4-12 6-18q0-12 14-14q8-8 18-2q10-1 12 8q6 6 1 13q1 9-9 11q-6 6-16 2q-8 6-16 2q-11 4-10-2z" fill="${SCK.green}"/>`, 1.6)
        + `<path d="M14 76q4-14 3-30q-4-6-8-8M17 46q4-8 10-10" stroke="${SCK.wood}" stroke-width="2.4" fill="none"/>`
        + `<g fill="#86AB6C" stroke="${SCK.ink}" stroke-width=".7">${leaf(6, 22, 150)}${leaf(20, 11, 180)}${leaf(36, 16, 220)}${leaf(39, 33, 290)}${leaf(24, 44, 0)}${leaf(4, 40, 60)}</g>`
        + `<g fill="${SCK.gold}" stroke="${SCK.ink}" stroke-width=".6"><circle cx="54" cy="73" r="1.5"/><circle cx="57" cy="75" r="1.5"/><circle cx="80" cy="74.4" r="1.5"/><circle cx="83" cy="72.6" r="1.5" fill="#C0522E"/><circle cx="66" cy="76" r="1.3" fill="#C0522E"/></g>`;
    } },

  /* Shen Kuo's compass: a magnetised needle hung on one silk thread over the bronze dial, the lodestone beside it */
  bussola_chinesa: {
    label: 'Uma agulha magnetizada suspensa por um fio de seda sobre um disco de bronze',
    rx: /\b(bussola|bussolas|agulha|agulhas|agulha magnetica|magnetita|colher magnetica)\b/,
    draw: () => SCH.bg(SCK.red)
      + `<path d="M0 54h120v26H0z" fill="#7A1414"/><path d="M0 54h120" stroke="#5E1010" stroke-width="1.4"/>`
      + `<circle cx="59" cy="34" r="22" fill="#A8241F"/><path d="M4 4h112v72H4z" fill="none" stroke="${SCK.gold}" stroke-width=".8" opacity=".5"/>`
      + SCH.g(`<path d="M30 52V12M88 52V12" stroke-width="4.6"/><path d="M30 52V12M88 52V12" stroke="#3A2418" stroke-width="2.6"/>
        <path d="M22 12q2-4 8-4h58q6 0 8 4l-2 1.6q-2-2-6-2H30q-4 0-6 2z" fill="#3A2418"/>`, 1.4)
      + `<path d="M28 13h62" stroke="${SCK.gold}" stroke-width=".8"/>`
      + SCH.g(`<ellipse cx="59" cy="61" rx="42" ry="13" fill="#7A5714"/><ellipse cx="59" cy="58" rx="42" ry="13" fill="${SCK.goldLo}"/>
        <ellipse cx="59" cy="58" rx="26" ry="8.4" fill="${SCK.gold}" stroke-width="1"/><ellipse cx="59" cy="58" rx="10" ry="3.2" fill="#C29234" stroke-width="1"/>`, 1.6)
      + `<ellipse cx="59" cy="58" rx="36" ry="11.6" fill="none" stroke="${SCK.ink}" stroke-width="2.6" stroke-dasharray=".7 2.2" opacity=".75"/>
        <ellipse cx="59" cy="58" rx="20" ry="6.4" fill="none" stroke="${SCK.ink}" stroke-width="1.8" stroke-dasharray=".6 2" opacity=".6"/>
        <ellipse cx="59" cy="58" rx="31" ry="10" fill="none" stroke="${SCK.goldHi}" stroke-width=".7" opacity=".7"/>`
      + `<path d="M59 13.4V35.6" stroke="${SCK.white}" stroke-width="1"/>`
      + SCH.g(`<path d="M34 38.8 59 35.2 84 32.2 59 37z" fill="#DDE2E4" stroke-width="1.2"/>`, 1)
      + `<path d="M34 38.8 59 35.2" stroke="${SCK.red}" stroke-width=".8"/><circle cx="59" cy="36" r="1.8" fill="${SCK.goldHi}" stroke="${SCK.ink}" stroke-width=".8"/>`
      + `<ellipse cx="59" cy="60" rx="14" ry="2.6" fill="#7A5714" opacity=".5"/>`
      + SCH.g(`<path d="M92 75l-3-7 4-7 8-2 8 3 3 7-4 6-9 2z" fill="#3E3B40"/>`, 1.5)
      + `<path d="M94 64l7-2 5 5M98 71l7-1M90 68l4-1" stroke="#77737A" stroke-width="1.1" fill="none"/><path d="M90 61l-1.6-2.4M93 59.4l-.6-2.8M110 63l2-2M112 67l2.6-.6M88 64l-2.6-.6" stroke="${SCK.ink}" stroke-width="1" stroke-linecap="round"/>` },
  /* a white keep of stacked grey roofs on its sloping stone base, over the moat, between cherry trees in flower */
  castelo_japones: {
    label: 'Um castelo japonês branco de vários telhados sobre muralhas de pedra',
    rx: /\b(castelo|castelos|himeji)\b/,
    draw: () => {
      const f = n => +n.toFixed(1);
      const roof = (cx, y, w, h) => { const L = cx - w / 2, R = cx + w / 2; return `M${L} ${f(y - 2.6)}Q${L + 2} ${y + .4} ${L + 6} ${y}H${R - 6}Q${R - 2} ${y + .4} ${R} ${f(y - 2.6)}L${f(R - h * 1.5)} ${y - h}H${f(L + h * 1.5)}z`; };
      const sakura = (d, dots) => SCH.g(`<path d="${d}" fill="#EDBBC2"/>`, 1.4) + `<g fill="#D98C9C">${dots.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6"/>`).join('')}</g>`;
      let win = '';
      [[44, 41], [50, 41], [56, 41], [64, 41], [70, 41], [76, 41], [48, 29.4], [54, 29.4], [66, 29.4], [72, 29.4], [56, 10.4], [62, 10.4]].forEach(([x, y]) => { win += `M${x - .6} ${y}h2.4v2.4h-2.4z`; });
      return SCH.bg('#C6DAE0')
        + `<ellipse cx="20" cy="14" rx="14" ry="3.4" fill="${SCK.white}" opacity=".7"/><ellipse cx="102" cy="22" rx="12" ry="3" fill="${SCK.white}" opacity=".6"/>`
        + `<path d="M0 64h120v16H0z" fill="${SCK.sea}"/>` + SCH.waves(71, '#7FA3B8', 1.2) + SCH.waves(77, '#6D95AD', 1.2)
        + SCH.g(`<path d="M0 59h31v6H0zM89 59h31v6H89z" fill="${SCK.stoneLo}"/><path d="M0 55h30v4H0zM90 55h30v4H90z" fill="${SCK.white}" stroke-width="1"/><path d="M0 53.4h31v2H0zM89 53.4h31v2H89z" fill="#5F6B75" stroke-width="1"/>
          <path d="M22 66Q38 64 39 45H81Q82 64 98 66z" fill="${SCK.stone}"/>
          <path d="M40 45V38h40v7z" fill="${SCK.white}"/><path d="${roof(60, 38, 54, 5)}" fill="#66737E"/>
          <path d="M45 38l5-5.4 5 5.4zM65 38l5-5.4 5 5.4z" fill="${SCK.white}" stroke-width="1.1"/>
          <path d="M44 33v-6h32v6z" fill="${SCK.white}"/><path d="${roof(60, 27, 44, 4.4)}" fill="#66737E"/>
          <path d="M53 27q3 0 4-2.6q3-3 6 0q1 2.6 4 2.6z" fill="${SCK.white}" stroke-width="1.1"/>
          <path d="M48 22.6V18h24v4.6z" fill="${SCK.white}"/><path d="${roof(60, 18, 36, 4)}" fill="#66737E"/>
          <path d="M55.6 18l4.4-4 4.4 4z" fill="${SCK.white}" stroke-width="1"/>
          <path d="M52 14V9h16v5z" fill="${SCK.white}"/><path d="${roof(60, 9, 28, 5)}" fill="#66737E"/>`, 1.4)
        + `<path d="M52 4q-2-2.4 0-4M68 4q2-2.4 0-4" stroke="${SCK.gold}" stroke-width="1.6" fill="none"/>`
        + `<path d="${win}" fill="#3A3A44"/><path d="M40 39h40M44 28h32M48 19h24M52 10h16" stroke="${SCK.ink}" stroke-width=".8" opacity=".35"/>
          <path d="M30 62.4h60M35 58h50M37.4 53.4h45.2M38.4 49h43.2M44 62.4V58M58 62.4V58M72 62.4V58M50 58v-4.6M66 58v-4.6M44 53.4V49M60 53.4V49M76 53.4V49" stroke="${SCK.ink}" stroke-width=".7" opacity=".35"/>
          <path d="M36 70h48" stroke="#E6EEF0" stroke-width="1.2" opacity=".6"/>`
        + SCH.g(`<path d="M10 76q2-10-1-18M10 64q4-4 8-4M112 76q-2-10 1-18M112 66q-4-4-8-4" stroke="#4A2E22" stroke-width="3" fill="none"/>`, 1.2)
        + sakura('M-3 60q-3-8 4-11q1-8 9-7q5-6 11 0q7 1 6 8q5 5-1 10q0 5-7 4q-4 4-10 1q-6 2-9-2q-4 0-3-3z', [[6, 50], [14, 46], [20, 54], [8, 58], [16, 58]])
        + sakura('M123 62q3-8-3-11q-1-7-8-6q-5-5-11 1q-6 1-5 8q-5 5 1 9q0 5 7 4q4 4 10 1q6 2 9-2z', [[110, 50], [104, 56], [114, 58], [118, 52]]);
    } },

  /* Meiji Tokyo: brick arcades with verandas, a gas lamp, telegraph wires, a rickshaw and its runner, snowy Fuji beyond */
  meiji_ginza: {
    label: 'Uma rua de tijolos com lampiões a gás e um riquixá, com o monte Fuji ao fundo',
    rx: /\b(fuji|riquixa|lampioes|ginza)\b/,
    draw: () => {
      const bld = (x, w, top) => {
        let col = '', dark = '';
        for (let c = x + 3; c < x + w - 2; c += 9) { col += `M${c} ${top + 4}h2v13h-2zM${c} ${top + 21}h2v15h-2z`; dark += `M${c + 2} ${top + 5}h7v12h-7zM${c + 2} ${top + 21}h7v15h-7z`; }
        return SCH.g(`<path d="M${x} ${top + 36}V${top}h${w}v36z" fill="#A9503A"/><path d="M${x - 1} ${top}l4-5h${w - 6}l4 5z" fill="#59606A"/>`, 1.4)
          + `<path d="${dark}" fill="#6E2E22"/><path d="M${x} ${top + 17}h${w}v4H${x}z" fill="${SCK.white}" stroke="${SCK.ink}" stroke-width=".9"/>`
          + `<path d="${col}" fill="${SCK.white}" stroke="${SCK.ink}" stroke-width=".8"/>`;
      };
      return SCH.bg('#C9DCE3')
        + SCH.g(`<path d="M8 46 50 16q10-5 20 0l42 30z" fill="#7E97AE"/>`, 1.4)
        + `<path d="M50 16q10-5 20 0l6 4.2-3-.4-2.4 3-3-2.2-3 3.2-3-3-3 2.8-2.8-3-3 2.4-2.4-2.4-3.4.2z" fill="${SCK.white}" stroke="${SCK.ink}" stroke-width="1"/>`
        + `<path d="M0 66h120v14H0z" fill="#D8C49A"/><path d="M0 67.6h120" stroke="${SCK.ink}" stroke-width="1"/>`
        + bld(-2, 48, 30) + bld(76, 46, 32)
        + `<path d="M46 66V50h6v16zM68 66V48h8v18z" fill="#9AA7B0" stroke="${SCK.ink}" stroke-width="1"/>`
        + `<path d="M0 20Q52 27 103 14M0 25Q52 32 103 19" stroke="${SCK.ink}" stroke-width=".7" fill="none" opacity=".7"/>`
        + SCH.g(`<path d="M108 80V9M101 14h14M102 19h12" stroke-width="2.6" fill="none"/>`, 1)
        + `<path d="M108 80V9" stroke="${SCK.wood}" stroke-width="1"/>`
        + SCH.g(`<path d="M13 78V45" stroke-width="2.8"/><path d="M9.4 44h7.2l1.4-6.4h-10z" fill="${SCK.goldHi}" stroke-width="1.1"/><path d="M7.6 37.6h10.8L13 34z" fill="#2E3A36" stroke-width="1.1"/><path d="M9.6 48h6.8" stroke-width="1.4"/>`, 1.4)
        + SCH.g(`<path d="M72 61 100 65" stroke-width="3.2"/><path d="M72 61 100 65" stroke="${SCK.wood}" stroke-width="1.4"/>
          <path d="M54 62V55q0-3 3-3h11l4 10z" fill="#2B2A33"/><path d="M53 55q-3-11 8-13q7-1 9 4l-4 1.4q-2-2.4-5-1.4q-5 2-4 9z" fill="#2B2A33"/>
          <path d="M70 62l5 4h6M98 56l2 8" stroke-width="1.8" fill="none"/>
          <circle cx="62" cy="68" r="9.4" fill="none" stroke-width="2.6"/><circle cx="62" cy="68" r="9.4" fill="none" stroke="${SCK.wood}" stroke-width="1"/>
          <path d="M62 58.6v18.8M52.6 68h18.8M55.4 61.4l13.2 13.2M68.6 61.4 55.4 74.6" stroke-width=".8"/><circle cx="62" cy="68" r="1.8" fill="${SCK.gold}" stroke-width=".8"/>
          <path d="M99 64l-4.4 12.6M101 64l4.6 12" stroke-width="2.6"/><path d="M96.6 53h7l1 11.4h-8.6z" fill="#2E3A55" stroke-width="1.2"/>
          <circle cx="100" cy="50" r="2.4" fill="#E2C29A" stroke-width="1"/><path d="M93.6 48.6q6.4-6 12.8 0z" fill="#C9A66B" stroke-width="1.1"/>`, 1.4);
    } },

  /* the treasure ship: a towering junk under nine battened red sails, a giraffe on deck, an African shore with palms */
  navio_tesouro: {
    label: 'Um enorme junco de nove mastros, com uma girafa no convés',
    rx: /\b(junco|juncos|navio do tesouro|navios do tesouro|girafa)\b/,
    draw: () => {
      const M = [[12, 16, 9], [21, 10, 11], [30, 6, 12], [40, 2, 13], [50, 4, 13], [60, 8, 12], [69, 12, 11], [77, 17, 10], [85, 22, 8]];
      let sails = '', masts = '';
      M.forEach(([x, t, w], i) => {
        let bat = '';
        for (let y = t + 6; y < 40; y += 6) bat += `M${x - 2} ${y}h${w + 1}`;
        masts += `M${x} 44V${t - 3}`;
        sails += `<path d="M${x - 2} ${t}L${x + w} ${t + 1.6}Q${x + w + 2.4} ${(t + 40) / 2} ${x + w} 40H${x - 2}z" fill="${i % 2 ? '#B33A2C' : SCK.red}"/><path d="${bat}" stroke-width=".8" opacity=".7"/>`;
      });
      return SCH.bg('#CFE0E3') + SCH.sun(106, 12, 6, '#F4E3B6')
        + SCH.g(`<path d="M100 58Q106 46 122 44v16z" fill="${SCK.sand}"/>
          <path d="M108 52q-1-10 4-18M116 50q0-8-2-14" stroke="${SCK.wood}" stroke-width="2.6" fill="none"/>
          <path d="M112 34q-7-3-11 2q5-1 11-2zM112 34q4-6 10-4q-6 0-10 4zM112 34q2 4 6 8q-1-6-6-8zM114 36q-6 1-7 6q4-4 7-6z" fill="${SCK.olive}" stroke-width="1"/>`, 1.2)
        + `<path d="M0 56h120v24H0z" fill="${SCK.sea}"/>`
        + SCH.g(`<path d="${masts}" stroke-width="1.8" fill="none"/>${sails}`, 1.2)
        + SCH.g(`<path d="M77 43Q77 36 83 36H88L95 21 97 18.6Q99 16 101 17.6L104.4 19.4Q105.4 21.4 103 21.4L99.4 21.6 92 38.6Q91 43 88 43z" fill="#E3B65E"/>
          <path d="M98.4 17.4l-.6-3.4M100.4 17.6l.4-3.4" stroke-width="1.2" fill="none"/><path d="M96.6 19.4l-3-1.4" stroke-width="1.4"/>`, 1.2)
        + `<path d="M84 38h3v2.4h-3zM80 40h2.6v2h-2.6zM90 32l2 1-1 2.4-2-.8zM93 26l1.8.8-.8 2-1.8-.8zM89.4 39l1.4.6-.6 1.8h-1.4z" fill="${SCK.wood}"/><circle cx="100.6" cy="19" r=".7" fill="${SCK.ink}"/>`
        + SCH.g(`<path d="M3 30H22L24 42H86L99 38 95 50Q88 64 70 66H24Q8 64 5 52z" fill="${SCK.wood}"/>
          <path d="M5 30V21h15v9z" fill="#B33A2C" stroke-width="1.2"/><path d="M2 21h21l-3-3.4H5z" fill="#3A3436" stroke-width="1.2"/>
          <path d="M2 50l6 2-1 14-7-4z" fill="#5A3A22" stroke-width="1.2"/>`, 1.6)
        + `<path d="M24 46H96M7 36h15" stroke="${SCK.red}" stroke-width="2.2"/><path d="M14 52h78M20 58h66" stroke="${SCK.ink}" stroke-width=".8" opacity=".4"/>
          <path d="M8 24h3v3H8zM14 24h3v3h-3z" fill="${SCK.goldHi}"/><circle cx="89" cy="50" r="2.8" fill="${SCK.white}" stroke="${SCK.ink}" stroke-width="1"/><circle cx="89.6" cy="50" r="1.3" fill="${SCK.ink}"/>`
        + SCH.waves(66, '#EAF2F4', 1.6) + SCH.waves(74, '#6D95AD', 1.6);
    } },

  /* the Süleymaniye on its hill: cascading lead domes, four pencil minarets, red roofs running down to the water */
  suleymaniye: {
    label: 'Uma grande mesquita de cúpulas e quatro minaretes sobre a cidade à beira do Bósforo',
    rx: /\b(suleymaniye|minarete|minaretes|istambul)\b/,
    draw: () => {
      const min = (x, b, t, n) => {
        let bal = '';
        for (let i = 0; i < n; i++) bal += `M${x - 2.8} ${t + 9 + i * 8}h5.6v1.8h-5.6z`;
        return `<path d="M${x - 1.6} ${b}V${t}h3.2V${b}z" fill="${SCK.white}"/><path d="${bal}" fill="${SCK.stone}" stroke-width="1"/><path d="M${x - 2} ${t}L${x} ${t - 10}L${x + 2} ${t}z" fill="#7D8892" stroke-width="1.1"/>`;
      };
      let walls = '', roofs = '';
      [[62, -2], [68, 3], [73.6, -1]].forEach(([y, o]) => { for (let x = o; x < 118; x += 10) { const yy = y + Math.round(Math.sin(x / 9) * 1.4); walls += `M${x} ${yy}v-4h6v4z`; roofs += `M${x - 1} ${yy - 4}l4-3 4 3z`; } });
      return SCH.bg('#C3D7DD') + ``
        + `<path d="M0 56Q30 47 60 50T120 55v25H0z" fill="#A79B66"/>`
        + SCH.g(`<path d="M6 54V47h16v7zM98 54V47h16v7z" fill="#D8CDB4"/>
          <path d="M22 54V40h76v14z" fill="#E6DDC8"/>
          <path d="M23 41a6.4 6.4 0 0 1 12.8 0zM84.2 41a6.4 6.4 0 0 1 12.8 0z" fill="#8C979F"/>
          <path d="M29 37a11 10 0 0 1 22 0zM69 37a11 10 0 0 1 22 0z" fill="#8C979F"/>
          <path d="M38 31a4.6 4.6 0 0 1 9.2 0zM72.8 31a4.6 4.6 0 0 1 9.2 0z" fill="#8C979F" stroke-width="1"/>
          <path d="M42.6 30v-4h34.8v4z" fill="#E6DDC8"/><path d="M44 26a16 16 0 0 1 32 0z" fill="#8C979F"/>`
          + min(8, 54, 20, 2) + min(112, 54, 20, 2) + min(22, 47, 10, 3) + min(98, 47, 10, 3), 1.3)
        + `<path d="M60 10V5" stroke="${SCK.goldLo}" stroke-width="1.2"/><circle cx="60" cy="4.4" r="1.2" fill="${SCK.gold}"/>`
        + `<path d="M48 13Q53 10 58 10" stroke="#B4BDC4" stroke-width="1.4" fill="none"/><path d="M8 10V7M112 10V7M22 0V-1M98 0V-1" stroke="${SCK.goldLo}" stroke-width="1"/>`
        + `<path d="M46 28.2h1.6M50 28.2h1.6M54 28.2h1.6M58 28.2h1.6M62.4 28.2h1.6M66.4 28.2h1.6M70.4 28.2h1.6" stroke="${SCK.ink}" stroke-width="2.2" opacity=".5"/><path d="M27 45h68" stroke="${SCK.ink}" stroke-width="2.2" stroke-dasharray="2 3" opacity=".5"/>
          <path d="M57 54v-6a3 3 0 0 1 6 0v6z" fill="#5F5A55"/><path d="M8 47q2-2 4 0q2-2 4 0q2-2 4 0M100 47q2-2 4 0q2-2 4 0q2-2 4 0" stroke="${SCK.ink}" stroke-width=".9" fill="#8C979F"/>`
        + SCH.g(`<path d="${walls}" fill="${SCK.white}"/><path d="${roofs}" fill="#B5462E"/>`, .9)
        + `<path d="M0 72h120v8H0z" fill="${SCK.sea}"/>` + SCH.waves(76.6, '#7FA3B8', 1.2);
    } },

  /* Timur's Samarkand: the ribbed turquoise dome of the Gur-e-Amir on its tall drum, the tiled portal and two minarets */
  samarcanda: {
    label: 'Um mausoléu de cúpula azul canelada e um grande portal de azulejos',
    rx: /\b(samarcanda|registan|madrassa|madrassas|gur-e-amir|mausoleu|mausoleus)\b/,
    draw: () => {
      let ribs = '';
      for (let i = 1; i < 8; i++) { const x = 44 + 4 * i; ribs += `M${x} 31Q${60 + (x - 60) * 1.7} 16 60 7`; }
      const minar = x => `<path d="M${x - 2.6} 68 ${x - 2} 18h4l.6 50z" fill="#D9C08A"/><path d="M${x - 3.6} 18h7.2v-2.4h-7.2z" fill="#2E5C8A" stroke-width="1"/><path d="M${x - 2.4} 15.6q2.4-5 4.8 0z" fill="#3A9AA6" stroke-width="1"/>`;
      const pop = x => `<path d="M${x} 68q-4.4-22 0-46q4.4 24 0 46z" fill="${SCK.green}"/>`;
      return SCH.bg('#EADBB4')
        + `<path d="M0 66h120v14H0z" fill="#D9BD86"/><path d="M8 72q10-2 20 0M84 74q12-2 24 0" stroke="#B89A63" stroke-width="1" fill="none"/>`
        + SCH.g(pop(8) + pop(14) + pop(106) + pop(112) + minar(28) + minar(92), 1.3)
        + `<path d="M25.6 28h4.8M25.4 40h5.2M25.2 52h5.6M89.6 28h4.8M89.4 40h5.2M89.2 52h5.6" stroke="#2E5C8A" stroke-width="2.4"/>`
        + SCH.g(`<path d="M36 66V46h48v20z" fill="#C9A66B"/><path d="M45 46V31h30v15z" fill="#D9C08A"/>
          <path d="M45 31C36 25 40 10 60 5C80 10 84 25 75 31z" fill="#3A9AA6"/>`, 1.6)
        + `<path d="${ribs}" stroke="#1F6E78" stroke-width=".9" fill="none"/><path d="M48 24Q47 13 56 8" stroke="#8ED0D4" stroke-width="1.4" fill="none" opacity=".8"/>
          <path d="M45 34h30v8H45z" fill="#2E5C8A" stroke="${SCK.ink}" stroke-width=".8"/><path d="M45 38l4-4 4 4-4 4zM53 38l4-4 4 4-4 4zM61 38l4-4 4 4-4 4zM69 38l4-4 4 4-4 4z" fill="#8ED0D4" opacity=".8"/>
          <path d="M60 5V1" stroke="${SCK.goldLo}" stroke-width="1.4"/><circle cx="60" cy="2.6" r="1.2" fill="${SCK.gold}"/>`
        + SCH.g(`<path d="M44 70V44h32v26z" fill="#D9C08A"/><path d="M47 70V47h26v23z" fill="#2E5C8A" stroke-width="1"/>
          <path d="M51 70V58q0-8 9-11q9 3 9 11v12z" fill="#1E3550" stroke-width="1.2"/>`, 1.6)
        + `<path d="M47 50l2.6-2.6L52 50l-2.4 2.4zM68 50l2.4-2.6L73 50l-2.6 2.4zM48 60h2M48 64h2M70 60h2M70 64h2" fill="${SCK.goldHi}" stroke="${SCK.goldHi}" stroke-width=".8"/>
          <path d="M54 60q6-8 12 0M56 64h8v6h-8z" fill="none" stroke="#3A9AA6" stroke-width="1"/>`;
    } },
  /* the divine wind: a curling storm wave, junks with snapped masts, a pine on the black rocks, lightning */
  frota_tufao: {
    label: 'Uma frota de juncos destroçada por um tufão junto à costa',
    rx: /\b(tufao|tufoes|frota|tempestade)\b/,
    draw: () => {
      const junk = (x, y, r, s) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">` + SCH.g(`<path d="M-2 -8V-24l2-3.4 1.2 3.4M9 -8 21 -22" stroke-width="1.8" fill="none"/>
        <path d="M-1 -24 10 -22 8 -17 11 -13.6H-1z" fill="#7A3426" stroke-width="1.2"/><path d="M20 -21 26 -16 22 -14z" fill="#7A3426" stroke-width="1.2"/>
        <path d="M-18 -4-16 -11-8 -8H12L18 -12 16 -2Q8 6-4 6-14 6-18 -4z" fill="${SCK.wood}"/>`, 1.4) + `<path d="M-1 -19h9M-16 -2H15" stroke="${SCK.ink}" stroke-width=".8" opacity=".6"/></g>`;
      return SCH.bg('#26324A')
        + `<path d="M0 0h120v26Q100 30 84 22Q70 32 52 24Q34 32 16 24Q8 28 0 26z" fill="#3A4A68"/>
          <path d="M30 14a6 6 0 1 1-6-6M94 12a7 7 0 1 0 7 7M62 8a4 4 0 1 1 4 4M14 22q-6 0-6-6" stroke="#6A7C98" stroke-width="1.4" fill="none"/>`
        + `<path d="M8 30l-6 12M26 34l-6 12M70 30l-6 12M88 34l-4 8M46 32l-5 10" stroke="#9AAAC0" stroke-width=".8" opacity=".5"/>`
        + `<path d="M84 4 78 18h4.6L74 34" stroke="${SCK.goldHi}" stroke-width="1.8" fill="none" stroke-linejoin="round"/>`
        + `<path d="M0 52Q30 44 60 54T120 50v30H0z" fill="#2E5670"/>`
        + junk(76, 56, -16, 1.2) + junk(102, 52, 20, .6)
        + SCH.g(`<path d="M96 80V58l4-8 6-4 3-10 7-4 6 3v45z" fill="#4A4844"/>
          <path d="M116 33q-2-7-7-10q-3-2-7 0M109 23q1-4 5-6" stroke="#3A2A20" stroke-width="2.6" fill="none"/>
          <path d="M93 26q5-6 13-3q-2 5-8 5zM105 18q5-6 13-2q-2 5-8 4zM110 25q5-4 10-1q-2 4-6 4z" fill="#3E4A2E" stroke-width="1.2"/>`, 1.4)
        + `<path d="M104 46l6-3M100 54l4-2" stroke="#6E6A64" stroke-width="1" fill="none"/><path d="M92 74q2-6 6-6q-1 4 2 6M94 64q3-4 6-2" stroke="${SCK.white}" stroke-width="1.6" fill="none"/>`
        + SCH.g(`<path d="M0 80V40C4 24 20 12 38 12C50 12 58 18 58 28C52 22 44 24 44 32C44 38 50 40 54 37C46 48 48 62 64 70L66 80z" fill="${SCK.sea}"/>`, 1.6)
        + `<path d="M8 72Q6 46 26 30M18 76Q16 54 32 40M30 78Q28 60 42 48" stroke="#7FA3B8" stroke-width="1.4" fill="none"/>
          <path d="M14 22Q26 12 40 13Q52 14 57 24l-3.4-1.6.4 3.2-3.4-2 0 3.4-3.2-2.4-.8 3.6-2-3.4Q40 22 38 18Q28 16 20 22z" fill="${SCK.white}" stroke="${SCK.ink}" stroke-width=".9"/>`
        + junk(26, 54, 38, .6)
        + `<path d="M58 60q4-3 8 0M84 70q6-4 12 0M66 76q6-4 12 0" stroke="${SCK.white}" stroke-width="1.4" fill="none" opacity=".8"/>`;
    } },

  /* a Tang night: the square brick pagoda of seven storeys, the full moon in the pond, a willow and a little pavilion */
  tang_pagode: {
    label: 'Um pagode de vários andares sob a lua cheia',
    rx: /\b(pagode|pagodes|changan)\b/,
    draw: () => {
      const H = [9, 7.6, 6.8, 6.2, 5.6, 5.2, 4.8];
      let y = 64, w = 28, body = '', eave = '', win = '';
      H.forEach(h => {
        const t = +(y - h).toFixed(1), x = +(78 - w / 2).toFixed(1);
        body += `M${x} ${y}V${t}h${+w.toFixed(1)}V${y}z`;
        eave += `M${+(x - 2.4).toFixed(1)} ${t}h${+(w + 4.8).toFixed(1)}v-1.8h-${+(w + 4.8).toFixed(1)}z`;
        win += `M76.8 ${+(t + h * .8).toFixed(1)}v-${+(h * .4).toFixed(1)}a1.2 1.2 0 0 1 2.4 0v${+(h * .4).toFixed(1)}z`;
        y = +(t - 1.8).toFixed(1); w *= .88;
      });
      return SCH.bg('#25314B')
        + `<g fill="${SCK.goldHi}" opacity=".8"><circle cx="50" cy="8" r=".9"/><circle cx="108" cy="12" r=".9"/><circle cx="60" cy="24" r=".7"/><circle cx="8" cy="34" r=".7"/><circle cx="112" cy="40" r=".7"/></g>`
        + `<circle cx="28" cy="18" r="13" fill="${SCK.goldHi}" opacity=".15"/>` + SCH.sun(28, 18, 9, SCK.goldHi)
        + `<path d="M0 62h120v18H0z" fill="#33433A"/><path d="M0 64h62q4 8-2 16H0z" fill="#1E4450"/>`
        + `<ellipse cx="30" cy="70" rx="7" ry="2.2" fill="${SCK.goldHi}" opacity=".85"/><path d="M18 74h24M22 77h16M14 67h8M40 67h8" stroke="${SCK.goldHi}" stroke-width=".8" opacity=".5"/>`
        + SCH.g(`<path d="M58 68v-4h40v4z" fill="#A9895A"/><path d="${body}" fill="${SCK.ochre}"/><path d="${eave}" fill="#A9895A" stroke-width="1"/>
          <path d="M78 ${y}v-8M75.6 ${y - 3}h4.8" stroke-width="1.4" fill="none"/><path d="M76 ${y}q2-4 4 0z" fill="#A9895A" stroke-width="1"/>`, 1.3)
        + `<path d="${win}" fill="#2A2234"/><path d="M68 60h20M70 51h16" stroke="${SCK.ink}" stroke-width=".6" opacity=".35"/>`
        + SCH.g(`<path d="M10 64q2-14-2-26M8 44q-6-6-6-10" stroke="#3A2A20" stroke-width="2.6" fill="none"/>
          <path d="M0 40q2-14 14-14q10 0 12 8z" fill="#3F7C74"/>`, 1.2)
        + `<path d="M4 34q-2 12 0 22M9 32q-1 14 1 26M14 30q2 12 0 24M19 31q3 10 2 20M24 33q3 8 3 14" stroke="#5E9C90" stroke-width="1.1" fill="none"/>`
        + SCH.g(`<path d="M44 64h16v-2H44z" fill="#6E5A44" stroke-width="1"/><path d="M46 62v-7M58 62v-7" stroke="${SCK.red}" stroke-width="1.6"/>
          <path d="M41 55q4-1 6-5h10q2 4 6 5z" fill="#2B2A33" stroke-width="1.1"/><path d="M52 50v-2.4" stroke-width="1"/>`, 1);
    } },

  /* a Joseon throne hall: the double roof with painted eaves, red columns, the stone terraces, granite peaks behind */
  palacio_coreano: {
    label: 'Um palácio coreano com telhados curvos e montanhas atrás',
    rx: /\b(palacio coreano|gyeongbokgung)\b/,
    draw: () => {
      let posts = '';
      for (let x = 18; x <= 102; x += 6) posts += `M${x} 61v-2`;
      for (let x = 8; x <= 112; x += 6) posts += `M${x} 67v-2`;
      return SCH.bg('#C9DCE0')
        + SCH.g(`<path d="M0 46 16 30l10 4 16-22 12 9 10-5 14 13 16-7 26 16v20H0z" fill="#B7B1A3"/>`, 1.2)
        + `<path d="M42 12l-4 12 6 6M66 16l2 10M96 26l-4 8M16 30l2 8" stroke="${SCK.ink}" stroke-width=".8" fill="none" opacity=".35"/>
          <path d="M0 50q10-8 22-4q10-6 20-2q12-5 22 0q12-5 22 0q12-5 34 2v10H0z" fill="${SCK.olive}"/>`
        + `<path d="M0 66h120v14H0z" fill="#D8D0BC"/><path d="M0 74h120M20 66l-8 14M60 66v14M100 66l8 14" stroke="${SCK.ink}" stroke-width=".6" opacity=".25"/>`
        + SCH.g(`<path d="M4 72V66h112v6zM14 66v-6h92v6z" fill="${SCK.stone}"/><path d="M50 74V60h20v14z" fill="#B7AE98"/>
          <path d="M24 60V48h72v12z" fill="#7A3426"/>`, 1.3)
        + `<path d="M50 63h20M50 66h20M50 69h20M50 72h20" stroke="${SCK.ink}" stroke-width=".7" opacity=".5"/><path d="${posts}M14 59h92M4 65h112" stroke="${SCK.ink}" stroke-width="1"/>`
        + `<path d="M30 50h8v10h-8zM42 50h8v10h-8zM70 50h8v10h-8zM82 50h8v10h-8zM54 50h12v10H54z" fill="#C49A5A"/><path d="M34 50v10M46 50v10M74 50v10M86 50v10M60 50v10M30 55h60" stroke="#7A3426" stroke-width=".7"/>`
        + SCH.g(`<path d="M28 48V60M40 48V60M52 48V60M68 48V60M80 48V60M92 48V60" stroke-width="3.4"/>`, 1)
        + `<path d="M28 48V60M40 48V60M52 48V60M68 48V60M80 48V60M92 48V60" stroke="${SCK.red}" stroke-width="1.8"/>`
        + SCH.g(`<path d="M34 38V30h52v8z" fill="#3F8C84"/><path d="M22 44h76v4H22z" fill="#3F8C84"/>
          <path d="M5 41Q16 47 32 45H88Q104 47 115 41Q102 41 88 35H32Q18 41 5 41z" fill="#555D67"/>
          <path d="M17 30Q28 35 40 32H80Q92 35 103 30Q91 29 80 20H40Q29 29 17 30z" fill="#555D67"/>
          <path d="M38 20H82" stroke-width="3.6"/>`, 1.4)
        + `<path d="M38 20H82" stroke="#8A929C" stroke-width="1.4"/><path d="M38 20q-2-1-2-4M82 20q2-1 2-4" stroke="${SCK.ink}" stroke-width="2" fill="none"/>
          <path d="M24 46h72M36 34h48" stroke="${SCK.red}" stroke-width="1.2" stroke-dasharray="2 2"/><path d="M24 45h72M36 32h48" stroke="${SCK.white}" stroke-width=".7" stroke-dasharray="1 3"/>
          <path d="M34 42l-8 0M44 38v4M54 38v4M64 38v4M74 38v4M84 38v4M48 24v6M58 24v6M68 24v6M78 24v6" stroke="#2E333A" stroke-width=".7" opacity=".7"/>`;
    } },

  /* Mohenjo-daro from above: brick house walls along straight streets, the stepped Great Bath, the stupa mound behind */
  mohenjo_daro: {
    label: 'Ruínas de tijolo de uma cidade antiga, com ruas retas e um grande tanque de banho',
    rx: /\b(mohenjo|mohenjo-daro|harappa|vale do indo|grande banho)\b/,
    draw: () => {
      const T = (u, v) => `${+(.9 * u - .4 * v + 14).toFixed(1)} ${+(76 - v).toFixed(1)}`;
      const poly = pts => pts.map((p, i) => (i ? 'L' : 'M') + T(p[0], p[1])).join('');
      const rect = (u1, v1, u2, v2) => poly([[u1, v1], [u2, v1], [u2, v2], [u1, v2], [u1, v1 + .01]]);
      const ln = l => l.map(q => poly([[q[0], q[1]], [q[2], q[3]]])).join('');
      const W = rect(4, 4, 38, 20) + rect(82, 4, 116, 20) + rect(6, 28, 38, 46) + rect(82, 28, 112, 46)
        + ln([[16, 4, 16, 20], [28, 4, 28, 12], [4, 12, 16, 12], [28, 12, 38, 12], [94, 4, 94, 20], [106, 12, 106, 20], [94, 12, 116, 12], [18, 28, 18, 46], [28, 36, 28, 46], [6, 37, 38, 37], [94, 28, 94, 46], [94, 37, 112, 37], [104, 28, 104, 37], [42, 46, 78, 46], [52, 40, 52, 46], [62, 40, 62, 46], [72, 40, 72, 46], [54, 12, 66, 12]])
        + poly([[46, 12], [42, 12], [42, 40], [78, 40], [78, 12], [74, 12]]);
      const ring = (k, c) => `<path d="${poly([[48 + k, 17 + k * .8], [72 - k, 17 + k * .8], [72 - k, 35 - k * .8], [48 + k, 35 - k * .8]])}z" fill="${c}"/>`;
      return SCH.bg('#E6D9B8')
        + `<path d="M0 22h120v58H0z" fill="#D9BD86"/>`
        + SCH.g(`<path d="M40 28q4-6 12-7l4-4q6-4 14-4h16l4 3q10 1 14 6l4 1q4 2 6 5z" fill="#C49260"/><path d="M71 13.6V10q0-4 4-4.6l2 1.4 2-1.6q4 .6 4 4.8v3.6z" fill="#B07A48" stroke-width="1.2"/>`, 1.4)
        + `<path d="M58 21h36M52 24.4h50M66 17.6h22M72 10h8" stroke="${SCK.ink}" stroke-width=".7" opacity=".4"/>`
        + `<path d="${W}" fill="none" stroke="${SCK.ink}" stroke-width="4" stroke-linecap="square" transform="translate(0 1.8)"/>`
        + `<path d="${W}" fill="none" stroke="${SCK.ink}" stroke-width="4" stroke-linecap="square"/>`
        + `<path d="${W}" fill="none" stroke="#9A5E34" stroke-width="2" stroke-linecap="square" transform="translate(0 1.8)"/>`
        + `<path d="${W}" fill="none" stroke="#D6A066" stroke-width="2" stroke-linecap="square"/>`
        + SCH.g(ring(0, '#C98E58') + ring(2.4, '#B07A48') + ring(4.6, '#9A6A3C'), 1.2)
        + `<path d="${poly([[53.4, 21.4], [66.6, 21.4], [66.6, 30.6], [53.4, 30.6]])}z" fill="${SCK.sea}" stroke="${SCK.ink}" stroke-width="1.2"/>`
        + `<path d="M${T(55, 24)}h8M${T(56, 27.6)}h6" stroke="#A9C6D4" stroke-width="1"/>`
        + `<path d="M${T(49, 24)}l2.6 0M${T(49, 26)}l2.6 0M${T(49, 28)}l2.6 0M${T(68.4, 24)}l2.6 0M${T(68.4, 26)}l2.6 0M${T(68.4, 28)}l2.6 0" stroke="${SCK.ink}" stroke-width=".9"/>`
        + `<circle cx="${T(30, 24).split(' ')[0]}" cy="${T(30, 24).split(' ')[1]}" r="2.6" fill="#3A4A55" stroke="#D6A066" stroke-width="1.6"/>`;
    } },

  /* Delhi, 1398: the fluted red-and-buff Qutb Minar over the crenellated walls, a long dust cloud of riders on the plain */
  qutb_minar: {
    label: 'Uma alta torre canelada de arenito vermelho sobre as muralhas de Délhi, e uma nuvem de poeira na planície',
    rx: /\b(qutb|minar|delhi)\b/,
    draw: () => {
      const S = [[62, 44, 22, 17.8], [44, 29, 16.4, 13.6], [29, 18, 12.6, 10.8], [18, 10, 10, 8.8], [10, 3, 8, 7.2]], r = n => +n.toFixed(1);
      let tower = '', bal = '', brk = '', flutes = '';
      S.forEach(([b, t, wb, wt], i) => {
        tower += `<path d="M${r(78 - wb / 2)} ${b}L${r(78 - wt / 2)} ${t}h${wt}L${r(78 + wb / 2)} ${b}z" fill="${i < 3 ? '#B5523B' : '#D2A47A'}"/>`;
        bal += `M${r(78 - wt / 2 - 2.2)} ${t + 2}h${r(wt + 4.4)}v-2h-${r(wt + 4.4)}z`;
        brk += `M${r(78 - wt / 2 - 1.6)} ${t + 2}h${r(wt + 3.2)}l-1.6 2.6h-${r(wt)}z`;
        for (let k = -3; k <= 3; k++) flutes += `M${r(78 + k * wb / 7.4)} ${b}L${r(78 + k * wt / 7.4)} ${t + 2}`;
      });
      const id = SCH.uid('qr');
      return SCH.bg('#C8DBDF')
        + SCH.g(tower + `<path d="${brk}" fill="#7A3426" stroke-width="1"/><path d="${bal}" fill="#E2C79A" stroke-width="1"/>`, 1.3)
        + `<path d="${flutes}" stroke="${SCK.ink}" stroke-width=".7" opacity=".4"/><path d="M73.6 14.6h8.8M74 7h8" stroke="#B5523B" stroke-width="1.4"/>`
        + SCH.g(`<path d="M46 52V40h14v12z" fill="${SCK.sand}"/><path d="M49 52v-7q4-5 8 0v7z" fill="#8A6A44" stroke-width="1"/>
          <path d="M0 62V51h120v11z" fill="${SCK.ochre}"/>`, 1.3) + `<path d="M0 49.4h120" stroke="${SCK.ink}" stroke-width="4.4" stroke-dasharray="4 1" stroke-dashoffset="-1.4"/><path d="M0 49.4h120" stroke="${SCK.ochre}" stroke-width="2.4" stroke-dasharray="2.8 2.2" stroke-dashoffset="-2"/>` + SCH.g(`
          <path d="M12 62V46h14v16zM96 62V46h14v16z" fill="#BE9A5E"/><path d="M12 46q7-4 14 0M96 46q7-4 14 0" fill="#BE9A5E" stroke-width="1"/>`, 1.3)
        + `<path d="M0 56h120M30 51v11M60 51v11M84 51v11M18 50v4M102 50v4" stroke="${SCK.ink}" stroke-width=".7" opacity=".35"/>`
        + `<path d="M0 62h120v18H0z" fill="#D9BD86"/>`
        + `<path d="M-2 74q0-7 7-7q1-7 9-6q3-7 11-4q4-6 11-2q5-4 11 0q5-3 9 2q5-1 7 3q4 0 5 4l-1 10z" fill="#D8C095" stroke="#A98A5C" stroke-width="1" stroke-linejoin="round"/>
          <path d="M8 66q4-3 8-1M26 59q5-3 10 0M44 60q4-2 8 1" stroke="#EADBB8" stroke-width="1.6" fill="none"/>`
        + `<defs><pattern id="${id}" width="11" height="12" patternUnits="userSpaceOnUse"><g fill="#3A2A1E"><path d="M1.6 6.2Q4 5.4 6.6 6L8.6 3.8 10.2 5.4 9.6 6 8.2 5.4 7.6 7.8 9.4 10.8H8.4L6.8 8.6H3L.8 11H0L1.8 8Q1 7.6 0 8.6Q.4 6.6 1.6 6.2zM3.8 6 4.4 2.6H5.8L6 6z"/><circle cx="5.1" cy="1.7" r=".9"/></g></pattern></defs>`
        + `<rect x="50" y="60" width="44" height="12" fill="url(#${id})"/><g transform="translate(5.5 2.4)"><rect x="38" y="60" width="44" height="12" fill="url(#${id})"/></g>`
        + `<path d="M98 72l12 0M102 76h14M20 77q10-1.6 20 0" stroke="#B89A63" stroke-width="1" fill="none"/>`;
    } },

  /* the Si-o-se-pol: a long two-storey bridge of buff brick, its arches mirrored in the river, poplars, a turquoise dome far off */
  ponte_isfahan: {
    label: 'Uma longa ponte de muitos arcos sobre um rio, com álamos nas margens',
    rx: /\b(isfahan|ponte|pontes|si-o-se-pol|zayandeh)\b/,
    draw: () => {
      const top = x => 24 + .1 * x, base = x => 62 - .15 * x, r = n => +n.toFixed(1);
      let low = '', up = '', x = -4;
      while (x < 118) {
        const h = base(x) - top(x), w = h * .5, a = x + w * .16, b = x + w * .84, m = (a + b) / 2;
        const spring = top(m) + h * .72, apex = top(m) + h * .5;
        low += `M${r(a)} ${r(base(a))}V${r(spring)}Q${r(a)} ${r(apex + h * .06)} ${r(m)} ${r(apex)}Q${r(b)} ${r(apex + h * .06)} ${r(b)} ${r(spring)}V${r(base(b))}z`;
        const ua = x + w * .3, ub = x + w * .7, um = (ua + ub) / 2;
        up += `M${r(ua)} ${r(top(um) + h * .38)}V${r(top(um) + h * .22)}Q${r(ua)} ${r(top(um) + h * .14)} ${r(um)} ${r(top(um) + h * .12)}Q${r(ub)} ${r(top(um) + h * .14)} ${r(ub)} ${r(top(um) + h * .22)}V${r(top(um) + h * .38)}z`;
        x += w;
      }
      const body = `<path d="M-2 ${r(top(-2))}L122 ${r(top(122))}V${r(base(122))}L-2 ${r(base(-2))}z" fill="#D9B77E"/>`;
      const pop = (x, y, h) => `<path d="M${x} ${y}q-3.4-${h / 2} 0-${h}q3.4 ${h / 2} 0 ${h}z"/>`;
      return SCH.bg('#CBDCDC')
        + `<path d="M92 34v-2h2.4v-2.6a4.4 4.4 0 0 1 8.8 0v2.6h2.4v2zM98.6 25v-2" fill="#3A9AA6" stroke="${SCK.ink}" stroke-width=".9"/>`
        + `<g fill="${SCK.green}" stroke="${SCK.ink}" stroke-width="1">${pop(4, 26, 24)}${pop(11, 24, 20)}${pop(106, 40, 18)}${pop(112, 40, 22)}${pop(118, 40, 16)}</g>`
        + `<path d="M80 44 120 37v8z" fill="#9AAE7A"/>`
        + `<path d="M0 62 120 44v36H0z" fill="${SCK.sea}"/>`
        + `<g transform="matrix(1 -.3 0 -1 0 124)" opacity=".45"><path d="${low}" fill="#2E4A5A"/></g><path d="M0 62 120 44v10L0 86z" fill="#B9A57A" opacity=".35"/>`
        + `<path d="M6 68h30M50 66h40M20 74h50M80 70h30M60 78h40" stroke="#A9C6D4" stroke-width="1" opacity=".7"/>`
        + SCH.g(body, 1.6)
        + `<path d="M-2 ${r(top(-2) + 1.4)}L122 ${r(top(122) + .6)}" stroke="#A9864F" stroke-width="2.4"/><path d="M-2 ${r(top(-2) + 13)}L122 ${r(top(122) + 3.4)}" stroke="${SCK.ink}" stroke-width=".8" opacity=".5"/>`
        + SCH.g(`<path d="${up}" fill="#E6EEEA"/>`, .9) + SCH.g(`<path d="${low}" fill="#34505E"/>`, 1.2);
    } },
});
