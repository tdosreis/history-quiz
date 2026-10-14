/* Antiguidade — the scenes of Egypt, Mesopotamia, Israel, Phoenicia and Rome (conventions in _core.js) */
Object.assign(SCENE, {
  /* a scribe cross-legged on the floor, papyrus on his lap, his palette leaning on a chest */
  escriba_egipcio: {
    label: 'Um escriba egípcio sentado de pernas cruzadas, com um rolo de papiro aberto no colo',
    rx: /\b(escriba|escribas|papiro|papiros|paleta de escriba)\b/,
    draw: () => {
      const sk = '#A95E36', limb = (d, w) => `<path d="${d}" stroke="${SCK.ink}" stroke-width="${w + 2}" fill="none"/><path d="${d}" stroke="${sk}" stroke-width="${w}" fill="none"/>`;
      const lotus = [12, 36, 60, 84, 108].map(x => `<path d="M${x - 1.5} 11l-5-7 3.4 1.4L${x} 2l3.1 4.4 3.4-1.4-5 7z"/><path d="M${x + 12} 10q-3-3 0-6q3 3 0 6z" fill="${SCK.red}"/>`).join('');
      return SCH.bg('#DDBB80')
        + `<path d="M0 0h120v12H0z" fill="${SCK.teal}"/><path d="M0 12h120v2.6H0z" fill="${SCK.red}"/><path d="M0 12h120M0 14.6h120" stroke="${SCK.ink}" stroke-width="1"/><g fill="#EADFC4">${lotus}</g>`
        + `<path d="M0 68h120v12H0z" fill="${SCK.stone}"/><path d="M0 68h120" stroke="${SCK.ink}" stroke-width="1.4"/><path d="M4 75h16M96 76h20" stroke="${SCK.ink}" stroke-width=".8" opacity=".35"/>`
        + SCH.g(`<path d="M86 58h20v10H86z" fill="${SCK.wood}"/><path d="M84 54h24v4H84z" fill="#A8744A"/><path d="M88 54l4-24h6.4l-3 24z" fill="#EFE3C4"/><path d="M100 54q-4-1-4-6t4-6h3q4 1 4 6t-4 6z" fill="#3E7C8C"/>`, 1.6)
        + `<circle cx="93.4" cy="33.4" r="1.6" fill="${SCK.red}" stroke="${SCK.ink}" stroke-width=".6"/><circle cx="96.6" cy="33.6" r="1.6" fill="#1E1A16"/><path d="M93 38l-2.4 13M95.2 38l-2.4 13" stroke="${SCK.ink}" stroke-width=".9" opacity=".7"/>`
        + limb('M25 68l31 7M75 68l-31 7', 5.4)
        + SCH.g(`<path d="M38.6 35q-3.6-19 11.4-19t11.4 19z" fill="#1E1A16"/><path d="M47.4 31h5.2v7h-5.2z" fill="${sk}"/><path d="M35 43q0-5 7-6.4h16q7 1.4 7 6.4l-3 15H38z" fill="${sk}"/><path d="M38 57h24l14 7q1.6 4.6-4 5.6H28q-5.6-1-4-5.6z" fill="${SCK.white}"/><ellipse cx="50" cy="26.4" rx="4.8" ry="6" fill="${sk}"/><path d="M44.6 24.6q0-7.4 5.4-7.4t5.4 7.4q-5.4-2.6-10.8 0z" fill="#1E1A16"/><path d="M33 55h30l4 8H30z" fill="#EEDDA8"/><rect x="27.4" y="54" width="6" height="10" rx="2.6" fill="#D2B472"/>`, 1.6)
        + `<path d="M42.4 38.4q7.6 7 15.2 0" stroke="${SCK.teal}" stroke-width="2.8" fill="none"/><path d="M42.6 40.4q7.4 5.6 14.8 0" stroke="${SCK.gold}" stroke-width="1" fill="none"/>`
        + `<path d="M36 59h8M47 59h6M55.6 59h7M35 61.4h11M49 61.4h9" stroke="${SCK.ink}" stroke-width=".7" opacity=".3"/>`
        + limb('M39 41l-5 10 1 5', 3.4) + limb('M61 41l5 9-4 6', 3.4)
        + `<path d="M62 57l5.4-10" stroke="${SCK.ink}" stroke-width="1.4"/><path d="M48 43q2 2 4 0M51 48v4" stroke="${SCK.ink}" stroke-width=".8" opacity=".45" fill="none"/>`;
    } },

  /* a decipherer's desk at night: lamp, open notebook, sheets of unknown signs */
  decifracao: {
    label: 'A escrivaninha de um decifrador: lamparina acesa, folhas de sinais desconhecidos e um caderno aberto',
    rx: /\b(decifracao|decifrador|escrivaninha|lamparina)\b/,
    draw: () => {
      const M = ['q.8-1.6 1.6 0', 'm1.2 0', 'l.8 1.4.8-1.4', 'q.8 1.6 1.6 0', 'm1.2 0', 'v-1.4m1 1.4', 'q1-1 .2-1.6'];
      const row = (x, y, n, k) => `M${x} ${y}` + Array.from({ length: n }, (_, i) => M[(i * 3 + k) % 7]).join('');
      const marks = [row(49, 59.5, 10, 1), row(49, 62.5, 9, 4), row(48.5, 65.5, 10, 2), row(69, 58.5, 10, 0), row(69, 61.5, 10, 5), row(70, 64.5, 9, 3),
        row(20, 67, 12, 6), row(20, 70.5, 11, 2), row(20, 74, 9, 5)].join('');
      return SCH.bg('#33261C')
        + `<circle cx="100" cy="40" r="36" fill="${SCK.gold}" opacity=".1"/><circle cx="100" cy="40" r="23" fill="${SCK.gold}" opacity=".14"/>`
        + SCH.g(`<path d="M10 4h38v36H10z" fill="#5A3B22"/><path d="M13 7h32v30H13z" fill="#3B5376"/><path d="M29 7v30M13 22h32" stroke="#5A3B22" stroke-width="2.4"/>`, 1.4)
        + `<circle cx="38" cy="14" r="4.4" fill="${SCK.white}"/><circle cx="40" cy="12.6" r="3.8" fill="#3B5376"/><circle cx="19" cy="12" r=".9" fill="${SCK.white}"/><circle cx="24" cy="29" r=".7" fill="${SCK.white}"/><circle cx="40" cy="30" r=".8" fill="${SCK.white}"/>`
        + `<path d="M0 54h120v26H0z" fill="#7E5232"/><path d="M0 54h120" stroke="${SCK.ink}" stroke-width="1.6"/><ellipse cx="84" cy="66" rx="44" ry="12" fill="${SCK.goldHi}" opacity=".14"/>`
        + `<path d="M4 60h20M30 76h24M90 76h26M96 59h20" stroke="${SCK.ink}" stroke-width=".8" opacity=".35"/>`
        + SCH.g(`<path d="M5 47h29v7H5z" fill="${SCK.burg}"/><path d="M8 41h25v6H8z" fill="${SCK.teal}"/><path d="M6 36h23v5H6z" fill="${SCK.olive}"/><path d="M38 55h9v-5q0-2-2-2h-1v-2h-3v2h-1q-2 0-2 2z" fill="#1E2433"/><path d="M42 47q2-14 12-21q-1 11-10 21z" fill="${SCK.white}" stroke-width="1.2"/><path d="M16 63l26 2-1 13-26-2z" fill="#E2D3AE" stroke-width="1.2"/><path d="M56 66l30-3 2 13-30 3z" fill="#D9C79E" stroke-width="1.2"/><path d="M48 57l19-2 1 12-22 2zM67 55l19 1 3 12-21-1z" fill="${SCK.paper}"/><path d="M67 55l1 12" fill="none" stroke-width="1.2"/><path d="M92 66h16l-3-4h-10z" fill="${SCK.goldLo}"/><path d="M98 62v-4h4v4z" fill="${SCK.gold}"/><ellipse cx="100" cy="54" rx="7" ry="5" fill="${SCK.gold}"/><path d="M97 50h6v-2.6h-6z" fill="${SCK.goldLo}"/><path d="M97.6 47.4q-3.4-3-3.4-7.4t3.4-6v-8h4.8v8q3.4 2 3.4 6t-3.4 7.4z" fill="#F8E9B8"/>`, 1.6)
        + `<path d="M100 45q-2.8-3.6 0-9q2.8 5.4 0 9z" fill="${SCK.gold}"/><path d="M100 44q-1-2 0-4q1 2 0 4z" fill="${SCK.red}"/>`
        + `<path d="M8 38.5h20M10 44h22M7 50h26" stroke="${SCK.goldHi}" stroke-width=".8" opacity=".6"/><path d="M47 34l-4 12" stroke="${SCK.ink}" stroke-width=".7" opacity=".6"/>`
        + `<path d="${marks}" fill="none" stroke="${SCK.ink}" stroke-width=".7" opacity=".7"/>`;
    } },

  /* a candle held up to a breach in a sealed wall: the gilded things inside */
  tumba_aberta: {
    label: 'A lanterna de um arqueólogo ilumina, por uma brecha na parede, uma câmara cheia de tesouros dourados',
    rx: /\b(tumba|tumbas|camara funeraria|tesouro|tesouros)\b/,
    draw: () => {
      const id = SCH.uid('tb'), hole = 'M32 14l12-5 9 4 12-6 13 5 12-3 12 9 1 13-4 11 6 12-10 10-17-2-14 6-16-4-13 2-5-11 4-12-6-12z';
      return SCH.bg('#D6C29A')
        + `<path d="M8 10l10 6M110 6l-8 10M112 70l-10-8M14 74l18-8M60 76l2-8" stroke="${SCK.ink}" stroke-width=".9" opacity=".4"/>`
        + `<clipPath id="${id}"><path d="${hole}"/></clipPath><g clip-path="url(#${id})"><rect width="120" height="80" fill="#2B1B0E"/>`
        + `<path d="M24 34L120 4v76z" fill="${SCK.goldHi}" opacity=".1"/><circle cx="34" cy="34" r="40" fill="${SCK.gold}" opacity=".14"/><path d="M0 60h120v20H0z" fill="#1A1008"/>`
        + SCH.g(`<path d="M86 44V34h14v10z" fill="${SCK.parch}"/><path d="M85 34q8-5 16 0z" fill="${SCK.white}"/><path d="M64 44V31h22v13z" fill="${SCK.gold}"/><path d="M63 31q12-7 24 0z" fill="${SCK.goldHi}"/><path d="M66 35.5h18M66 40h18" fill="none" stroke="${SCK.goldLo}" stroke-width="1.6"/><path d="M53 49l1 10h-3v3h7l-1-13zM93 49l1 10h-3v3h7l-1-13z" fill="${SCK.goldLo}"/><path d="M46 44h56v5H46z" fill="${SCK.gold}"/><path d="M102 45q6-3 4-10" fill="none" stroke-width="2"/><path d="M46 46l-1-15h7l1 15z" fill="${SCK.gold}"/><path d="M53 32h-9q-3 0-4-3l-2-1q-2-2 0-4l1-4q2-5 7-5h3q5 1 5 6z" fill="${SCK.gold}"/><path d="M48 16l2-4 3 5z" fill="${SCK.gold}"/><ellipse cx="72" cy="57" rx="8" ry="3.4" fill="${SCK.parch}"/><path d="M64 57v-3a8 3.4 0 0 1 16 0v3" fill="${SCK.white}"/><path d="M38 64q-3-6-1-12l1-3q-2-1-1-3h6q1 2-1 3l1 3q2 6-1 12z" fill="#E9E2D0"/><path d="M104 64q-5-1-5-7t5-7h2q5 1 5 7t-5 7z" fill="${SCK.goldLo}"/>`, 1.4)
        + `<circle cx="44.5" cy="21.5" r="1.1" fill="${SCK.ink}"/><path d="M49 22v9M51.5 21v10" stroke="${SCK.goldLo}" stroke-width="1"/><path d="M68 33l3-1M79 33l3-1M48 47h10M80 47h10" stroke="${SCK.white}" stroke-width="1" opacity=".7"/>`
        + `<path d="${hole}" fill="none" stroke="#7A6440" stroke-width="5"/></g><path d="${hole}" fill="none" stroke="${SCK.ink}" stroke-width="1.8"/>`
        + SCH.g(`<path d="M50 72l4-4 5 2-1 3zM72 73l5-3 3 3-6 2z" fill="${SCK.stoneLo}"/>`, 1.2)
        + `<circle cx="21.5" cy="31" r="10" fill="#FBEBC0" opacity=".6"/>`
        + SCH.g(`<path d="M19.5 38h4v18h-4z" fill="${SCK.white}"/><path d="M0 80V67q6-4 12-9l7 6q-6 6-10 16z" fill="#A89870"/><path d="M14 61q0-6 5-7h4q3 1 3 4v3q-1 3-4 3h-5q-3 0-3-3z" fill="#D9A57A"/>`, 1.5)
        + `<path d="M21.5 37q-3.4-4.4 0-10q3.4 5.6 0 10z" fill="${SCK.goldHi}" stroke="${SCK.goldLo}" stroke-width=".8"/><path d="M21.5 37v-3" stroke="${SCK.ink}" stroke-width=".8"/>`
        + `<path d="M18 58h7M18 61h7" stroke="${SCK.ink}" stroke-width=".7" opacity=".5"/>`;
    } },

  /* the Aten: the sun disk whose rays end in little hands, over an altar of offerings */
  disco_aton: {
    label: 'O disco solar cujos raios terminam em pequenas mãos, sobre um altar de oferendas',
    rx: /\b(aton|disco solar)\b/,
    draw: () => {
      let rays = '', hands = '';
      for (let i = 0; i < 9; i++) {
        const deg = 30 + i * 15, a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
        const x = (60 + 32 * c).toFixed(1), y = (15 + 32 * s).toFixed(1);
        rays += `M${(60 + 13 * c).toFixed(1)} ${(15 + 13 * s).toFixed(1)}L${x} ${y}`;
        hands += `<path transform="translate(${x} ${y}) rotate(${deg}) scale(1.5)" d="M-.6-1.4h3.2q1.4 0 1.4 1.4t-1.4 1.4H-.6zM1-1.4l1.2-1.6"/>`;
      }
      return SCH.bg('#F3E3B6')
        + `<path d="M0 62h120v18H0z" fill="#D9B477"/><path d="M0 62h120" stroke="${SCK.ink}" stroke-width="1.2" opacity=".6"/>`
        + SCH.g(`<path d="M33 62V42h5v20zM82 62V42h5v20z" fill="#E6CB94"/><path d="M3 64l3-40h22l3 40zM89 64l3-40h22l3 40z" fill="#D4A86A"/><path d="M4 24h26l1-3H3zM90 24h26l1-3H89z" fill="#B98448"/>`, 1.5)
        + `<path d="M9 64V3M25 64V3M95 64V3M111 64V3" stroke="${SCK.ink}" stroke-width="1.3"/><path d="M9 4l6 1.4-6 1.6zM25 4l6 1.4-6 1.6zM95 4l6 1.4-6 1.6zM111 4l6 1.4-6 1.6z" fill="${SCK.red}"/>`
        + `<path d="M6 34h20M8 46h20M94 34h20M93 46h20" stroke="${SCK.ink}" stroke-width=".8" opacity=".35"/>`
        + `<path d="${rays}" stroke="${SCK.goldLo}" stroke-width="1.8"/><g fill="${SCK.goldHi}" stroke="${SCK.ink}" stroke-width=".6" stroke-linejoin="round">${hands}</g>`
        + SCH.g(`<circle cx="60" cy="15" r="12.4" fill="${SCK.gold}"/><path d="M40 64h40v-4H40z" fill="${SCK.stoneLo}"/><path d="M44 60V50h32v10z" fill="#EADBB4"/><path d="M42 50h36v-3H42z" fill="#D9C38E"/><path d="M47 47q0-5 4-5t4 5zM65 47q0-5 4-5t4 5z" fill="#C98A40"/><path d="M55 47l2-7 2 7zM61 47l2-7 2 7z" fill="#E0B060"/>`, 1.5)
        + `<circle cx="60" cy="15" r="8.6" fill="none" stroke="${SCK.goldHi}" stroke-width="1.2"/>`
        + SCH.g(`<circle cx="52" cy="40" r="2" fill="${SCK.red}"/><circle cx="68" cy="40" r="2" fill="${SCK.red}"/><path d="M60 41l-3-6 3 1.6 3-1.6zM56 41l-5-4 3 0zM64 41l5-4-3 0z" fill="${SCK.white}"/>`, 1)
        + `<path d="M50 53h20M52 57h16" stroke="${SCK.ink}" stroke-width=".8" opacity=".35"/>`;
    } },

  /* the three pyramids of Giza and the Sphinx, at sunset */
  piramides_gize: {
    label: 'As pirâmides de Gizé e a Esfinge ao entardecer',
    rx: /\b(piramide|piramides|giza|gize|esfinge)\b/,
    draw: () => SCH.bg('#EDBB7C')
      + `<path d="M0 0h120v12H0z" fill="#93404A"/><path d="M0 12h120v11H0z" fill="#C86C56"/>` + SCH.sun(20, 46, 11, '#F8DFA4')
      + `<path d="M0 60h120v20H0z" fill="#DDB271"/>`
      + SCH.g(`<path d="M30 38L14 60l20 2zM60 20L34 62l32 4zM94 10L62 64l38 6z" fill="#E2B06A"/><path d="M30 38l4 24 12-4zM60 20l6 46 22-8zM94 10l6 60 24-8z" fill="#A66C3A"/>`, 1.6)
      + `<path d="M60 20l-4.6 7.6 5.6.7z" fill="#F4DDAE"/><path d="M60 20l1 8.3 4-1.5z" fill="#C99A68"/>`
      + `<path d="M25 46h7M20 54h12M50 36h10M44 46h18M40 55h24M84 26h11M77 38h20M70 50h28M66 58h33" stroke="${SCK.ink}" stroke-width=".8" opacity=".25"/>`
      + SCH.g(`<path d="M12 70V61q0-4 5-4h23q7 0 9 6l2 7z" fill="#C8955A"/><path d="M1 70v-3.6h16V70z" fill="#B88550"/><path d="M12 62V50q0-6 5-6.4q6 .4 7 6.4l4 12z" fill="#C8955A"/><path d="M13.6 49.6H9.4l-.4 2.4-1 1.4 1 1-.4 2.6 1.4 1.6h3.6z" fill="#DDB074"/><path d="M13.6 55v8h3.4v-8z" fill="#C8955A"/>`, 1.5)
      + `<path d="M18 45v8M21 46v9M24 50v8M14 57.6h3.4M14 60.4h3.4" stroke="${SCK.ink}" stroke-width=".8" opacity=".45"/><circle cx="11" cy="52" r=".8" fill="${SCK.ink}"/>`
      + `<path d="M0 72q20-5 40-1t40 0 40-2v11H0z" fill="#D2A361"/><path d="M0 72q20-5 40-1t40 0 40-2" stroke="${SCK.ink}" stroke-width="1.2" fill="none" opacity=".5"/>` },
  /* the great balance of the judgement hall: a heart on one pan, the other pan veiled */
  julgamento_mortos: {
    label: 'A balança do julgamento dos mortos: um coração num prato, o outro prato coberto por um pano',
    rx: /\b(balanca|balancas|coracao|pesagem)\b/,
    draw: () => {
      const col = x => `<path d="M${x} 70l1-42h8l1 42z" fill="${SCK.ochre}"/><path d="M${x - 1} 28q-1-9 6-13q7 4 6 13z" fill="${SCK.green}"/><path d="M${x + 2} 15h6v-3h-6z" fill="${SCK.stoneLo}"/>`;
      const lotus = [24, 36, 84, 96].map(x => `<path d="M${x - 1} 10l-3.4-5.4 2.4 1L${x} 2l2 3.6 2.4-1L${x + 1} 10z"/>`).join('');
      return SCH.bg('#E8D7AE')
        + `<path d="M0 0h120v11H0z" fill="${SCK.burg}"/><path d="M0 11h120" stroke="${SCK.gold}" stroke-width="1.4"/><g fill="#EADFC4">${lotus}</g>`
        + `<path d="M0 70h120v10H0z" fill="${SCK.stone}"/><path d="M0 62h120v8H0z" fill="#C9B68A"/><path d="M0 62h120M0 70h120" stroke="${SCK.ink}" stroke-width="1.2"/>`
        + SCH.g(`<path d="M32 70V14h56v56z" fill="${SCK.teal}"/>` + col(4) + col(106), 1.6)
        + `<path d="M36 18h48v48H36z" fill="none" stroke="${SCK.gold}" stroke-width=".8" opacity=".7"/><path d="M5 34h10M5 37h10M107 34h10M107 37h10" stroke="${SCK.red}" stroke-width="1.4"/>`
        + SCH.g(`<path d="M24 24L13 48M24 24l11 24M96 24L85 48M96 24l11 24" fill="none" stroke-width="1"/><path d="M48 76h24v-4H48z" fill="${SCK.goldLo}"/><path d="M52 72h16v-4H52z" fill="${SCK.gold}"/><path d="M58 68V22h4v46z" fill="${SCK.gold}"/><path d="M20 20h80v4H20z" fill="${SCK.gold}"/><path d="M56 20l4-9 4 9z" fill="${SCK.goldHi}"/><path d="M12 48h24q-2 6-12 6t-12-6zM84 48h24q-2 6-12 6t-12-6z" fill="${SCK.gold}"/><path d="M24 47.4q-5.4 0-5.4-5.6q0-3.6 3-4.6V35h4.8v2.2q3 1 3 4.6q0 5.6-5.4 5.6z" fill="${SCK.red}"/><path d="M84 49q1-11 12-11t12 11l-1 5q-11 3-22 0z" fill="#26304A"/>`, 1.6)
        + `<path d="M18.6 40.4l-2-1.4M29.4 40.4l2-1.4" stroke="${SCK.ink}" stroke-width="1.4"/><path d="M21 42q1-3 3-3.6" stroke="#E07A6A" stroke-width="1" fill="none"/>`
        + `<path d="M90 41l-2 12M96 38.6V53M102 41l2 12" stroke="#5A6C8C" stroke-width="1"/><path d="M85 54.6v2M89 55.4v2M93 55.8v2M97 55.8v2M101 55.4v2M105 54.6v2" stroke="${SCK.gold}" stroke-width="1.2"/>`
        + `<path d="M62.6 24v10" stroke="${SCK.ink}" stroke-width=".8"/><path d="M62.6 34l-1.2 2.4h2.4z" fill="${SCK.ink}"/><path d="M22 22h76" stroke="${SCK.goldHi}" stroke-width=".8" opacity=".8"/>`;
    } },

  /* a hand pressing a reed stylus into a fresh clay tablet; finished tablets on the shelves */
  tabuleta_cuneiforme: {
    label: 'Uma mão pressiona um estilete de junco numa tabuleta de argila fresca',
    rx: /\b(cuneiforme|cuneiformes|tabuleta|tabuletas|argila|estilete)\b/,
    draw: () => {
      const id = SCH.uid('br'), T = [0, 0, 1, 2, 1, 0, 2, 1, 0, 2, 0, 1, 1, 2, 0, 0, 2, 1, 0, 1, 2, 0];
      const f = v => v.toFixed(1), W = (x, y, t) => t === 0 ? `M${f(x)} ${y - 1.6}l3 1.6-3 1.6zM${f(x + 3)} ${y}h3` : t === 1 ? `M${f(x - 1.6)} ${y - 3}l1.6 3 1.6-3zM${f(x)} ${y}v3.4` : `M${f(x + 3)} ${y - 2}l-3 2 3 2z`;
      let w = '', i = 0;
      for (const [y, n] of [[38, 8], [46, 8], [54, 5]]) for (let k = 0; k < n; k++) w += W(31 + k * 5.6, y, T[i++ % T.length]);
      const tabs = (x0, y0) => [0, 9, 18].map((d, j) => `<rect x="${x0 + d}" y="${y0 + j % 2}" width="8" height="${11 - j % 2}" rx="2" fill="${['#B88A54', '#C99D64', '#A87C48'][j]}"/>`).join('');
      return SCH.bg('#B4895A')
        + `<pattern id="${id}" width="18" height="16" patternUnits="userSpaceOnUse"><path d="M0 .5h18M0 8.5h18M.5 0v8M9.5 8v8" stroke="#8C643C" stroke-width="1"/></pattern><rect width="120" height="80" fill="url(#${id})"/>`
        + SCH.g(`<path d="M0 21h44v3H0zM86 17h34v3H86z" fill="${SCK.wood}"/>` + tabs(4, 10) + tabs(90, 6), 1.3)
        + `<path d="M6 13h4M6 15h4M15 12h4M15 14h4M24 13h4M92 9h4M101 8h4M110 9h4" stroke="${SCK.ink}" stroke-width=".7" opacity=".5"/>`
        + `<g transform="rotate(-5 54 52)">` + SCH.g(`<rect x="27" y="29" width="56" height="48" rx="6" fill="#9C7040"/><rect x="25" y="27" width="56" height="48" rx="6" fill="#DCB27A"/>`, 1.8)
        + `<path d="${w}" fill="#6E4A26" stroke="#6E4A26" stroke-width=".8" stroke-linejoin="round"/><path d="M30 60h46M30 66h40" stroke="#B88A54" stroke-width=".8"/></g>`
        + `<path d="M64.6 55l40-14" stroke="${SCK.ink}" stroke-width="4" stroke-linecap="round"/><path d="M64.6 55l40-14" stroke="#E2CB86" stroke-width="2.2" stroke-linecap="round"/>`
        + `<path d="M122 78L94 58" stroke="${SCK.ink}" stroke-width="11" stroke-linecap="round"/><path d="M122 78L94 58" stroke="#B07A4E" stroke-width="8" stroke-linecap="round"/>`
        + SCH.g(`<path d="M82 48q3-4 8-2l5 3q3 3 1 7l-3 3q-3 2-6 0l-4-3q-3-4-1-8z" fill="#B07A4E"/><path d="M84 48l-8 4.4q-1.6 1.6.4 2.4l8.6-2.4" fill="#B07A4E"/>`, 1.4)
        + `<path d="M86 54q2 1 4 0M88 57q2 1 3.4 0" stroke="${SCK.ink}" stroke-width=".8" fill="none" opacity=".6"/>`;
    } },

  /* the ziggurat of Ur over the plain, date palms, an onager cart and a seed-plough */
  zigurate_ur: {
    label: 'O zigurate de Ur sobre a planície com tamareiras, e um carro de rodas maciças puxado por onagros',
    rx: /\b(zigurate|zigurates|ur|roda|rodas|arado|arados)\b/,
    draw: () => {
      const fr = 'M0 0q-6-6-13-1q7-2 13 1zM0 0q-3-7-9-8q5 3 9 8zM0 0q3-7 9-8q-5 3-9 8zM0 0q6-6 13-1q-7-2-13 1zM0 0q-7-1-11 5q5-4 11-5zM0 0q7-1 11 5q-5-4-11-5z';
      const palm = (x, y, h) => `<path d="M${x} ${y}q-3-${h / 2} 2-${h}" stroke="${SCK.ink}" stroke-width="3.6" fill="none"/><path d="M${x} ${y}q-3-${h / 2} 2-${h}" stroke="${SCK.wood}" stroke-width="2" fill="none"/><path transform="translate(${x + 2} ${y - h})" d="${fr}" fill="${SCK.olive}" stroke="${SCK.ink}" stroke-width=".9"/>`;
      const lg = 'M3-9l-2 9M7-9l1 9M17-9l2 9M21-9l-1 9';
      const ona = (x, y, c) => `<g transform="translate(${x} ${y})"><path d="${lg}" stroke="${SCK.ink}" stroke-width="3.2"/><path d="${lg}" stroke="${c}" stroke-width="1.6"/><path d="M0-10q0-5 5-5h13l5-7q2-2 4-.4l3.4 4.4q1 2-1 2.4l-3-.2-3 2.6-1 5.2q-1 3-4 3H4q-4 0-4-5z" fill="${c}"/><path d="M25-21l-1.6-5 2.6 4.6M27.4-21.6l.6-5 1 5.2M0-10q-3 3-2 8" fill="none"/><path d="M18.6-15l5-7" stroke-width="2.2"/></g>`;
      const wd = d => `<path d="${d}" stroke-width="3.8"/><path d="${d}" stroke="${SCK.wood}" stroke-width="1.8"/>`;
      return SCH.bg(SCK.sky) + `<path d="M0 50h120v30H0z" fill="#E3C68E"/>` + palm(9, 52, 26)
        + SCH.g(`<path d="M24 50l6-17h68l6 17z" fill="#C9A66B"/><path d="M40 33l3-10h42l3 10z" fill="#BE9A5E"/><path d="M51 23l2-6h22l2 6z" fill="#B48F55"/><path d="M57 17v-7h14v7z" fill="#C9A66B"/><path d="M56 10h16V8H56z" fill="#A8834E"/><path d="M29 50l32-15v3L35 50zM99 50L67 35v3l26 12zM61 50l1.8-33h4.4l1.8 33z" fill="#E6CF9C"/>`, 1.5)
        + `<path d="M62.6 17v-4.2h2.8V17z" fill="${SCK.ink}"/><path d="M36 37v12M44 37v8M52 37v4M76 37v4M84 37v8M92 37v12M48 25v7M55 25v7M73 25v7M80 25v7M62.4 25h3.2M62 33h4M61.6 42h4.8" stroke="${SCK.ink}" stroke-width=".8" opacity=".4"/>`
        + palm(112, 52, 24) + `<path d="M0 55q50-4 120-3" stroke="${SCK.sea}" stroke-width="2.4" fill="none"/>`
        + `<path d="M78 80l6-21h36v21z" fill="#C2985C"/><path d="M84 64h36M82 70h38M80 76h40" stroke="#7A5A34" stroke-width="1" opacity=".6"/>`
        + SCH.g(wd('M30 62L63 59') + ona(45, 74, '#6E5A44') + ona(40, 76, '#A88C6A')
          + `<path d="M8 64v-8h4v4h14l3-10h3l-2 14z" fill="#A8744A"/><circle cx="19" cy="70" r="7.6" fill="${SCK.wood}"/><path d="M16.4 63v14M21.6 63v14" stroke-width="1"/><ellipse cx="19" cy="70" rx="2" ry="2.6" fill="#C9A66B"/>`
          + wd('M90 71h18M106 70l7-13M98 70V59M92 70l-12-7') + `<path d="M93 54h10l-2.4 4.6h-5.2zM86 71.4l5-2.6v4.6z" fill="#A8744A"/>`, 1.4)
        + `<path d="M44 70.6q6 1.6 12 0" stroke="#E6DAC0" stroke-width="1.4" fill="none"/>`;
    } },

  /* the Nile in flood at sunrise: shaduf, flooded fields, a papyrus boat, a far pylon */
  cheia_do_nilo: {
    label: 'O Nilo na cheia, ao nascer do sol, com palmeiras, campos alagados e um shaduf',
    rx: /\b(nilo|cheia|cheias|inundacao|shaduf)\b/,
    draw: () => {
      const fr = 'M0 0q-6-6-13-1q7-2 13 1zM0 0q-3-7-9-8q5 3 9 8zM0 0q3-7 9-8q-5 3-9 8zM0 0q6-6 13-1q-7-2-13 1zM0 0q-7-1-11 5q5-4 11-5zM0 0q7-1 11 5q-5-4-11-5z';
      const tiny = x => `<path d="M${x} 38v-6" stroke="${SCK.olive}" stroke-width="1"/><path transform="translate(${x} 32) scale(.4)" d="${fr}" fill="${SCK.olive}"/>`;
      return SCH.bg('#C6DADF') + `<path d="M0 22h120v16H0z" fill="#F2D59A"/>` + SCH.sun(96, 36, 5, '#FCEBB8')
        + `<path d="M0 36h120v3H0z" fill="${SCK.olive}"/>` + [10, 24, 108].map(tiny).join('')
        + SCH.g(`<path d="M38 38l2-15h9l.8 5h4.4l.8-5h9l2 15z" fill="#C9AA78"/>`, 1.2) + `<path d="M51 38v-5h3.4v5zM42 27h6M42 31h6M56.6 27h6M56.6 31h6" stroke="${SCK.ink}" stroke-width=".8" opacity=".5"/><path d="M50.6 38v-5h4.2v5z" fill="${SCK.ink}" opacity=".6"/><path d="M20 12l3 2 3-2M30 8l2.4 1.6L35 8M96 14l2.4 1.6 2.4-1.6" stroke="${SCK.ink}" stroke-width="1" fill="none"/>`
        + `<path d="M0 39h120v41H0z" fill="${SCK.sea}"/>`
        + SCH.g(`<path d="M8 45h26l-1.6 2.4H6zM78 44h30l-1 2H80zM96 50h24v3H94z" fill="${SCK.green}"/>`, .9) + `<path d="M10 45v-2.4M14 45v-2.4M18 45v-2.4M22 45v-2.4M26 45v-2.4M30 45v-2.4M82 44v-2.4M86 44v-2.4M90 44v-2.4M94 44v-2.4M98 44v-2.4M102 44v-2.4M98 50v-2.6M102 50v-2.6M106 50v-2.6M110 50v-2.6M114 50v-2.6M118 50v-2.6" stroke="${SCK.olive}" stroke-width="1.2"/>`
        + SCH.waves(58, '#7FA3B8', 1.2).replace('M0', 'M40') + SCH.waves(70, '#7FA3B8', 1.2) + `<path d="M86 41h22M88 43.4h18" stroke="#F2D59A" stroke-width="1" opacity=".7"/>`
        + SCH.g(`<path d="M0 56q16-2 26 4t12 20H0z" fill="${SCK.green}"/><path d="M0 72q20-2 34 2l2 6H0z" fill="#8A6A40"/><path d="M15 68V44h3v24z" fill="${SCK.wood}"/><path d="M44 28v22" fill="none" stroke-width="1"/><path d="M41 50h6l-1 4h-4z" fill="${SCK.wood}"/><path d="M4 51L44 28" stroke-width="3.6"/><path d="M4 51L44 28" stroke="#C9A66B" stroke-width="1.8"/><circle cx="5" cy="51.6" r="3.8" fill="#6E4528"/><g transform="translate(8 4)"><path d="M66 56V36" stroke-width="1.6"/><path d="M58 37h16v14H58z" fill="${SCK.white}"/><path d="M50 54q16 7 34 0l5-9q-2 7-9 9H58q-7-2-10-9z" fill="#C9A66B"/><path d="M52 52l-8 10" stroke-width="1.6"/></g>`, 1.4)
        + `<path d="M66 48h16M64 61v-3M70 62.6v-4M76 63v-4M82 62.6v-4M88 61v-3" stroke="${SCK.ink}" stroke-width=".8" opacity=".5"/><path d="M4 76q8-1 14 0" stroke="${SCK.ink}" stroke-width=".8" opacity=".4"/>`
        + `<path d="M116 80q-6-24-6-48" stroke="${SCK.ink}" stroke-width="4" fill="none"/><path d="M116 80q-6-24-6-48" stroke="${SCK.wood}" stroke-width="2.4" fill="none"/>`
        + `<path transform="translate(110 32)" d="${fr}" fill="${SCK.olive}" stroke="${SCK.ink}" stroke-width="1"/>`;
    } },

  /* the Ark of the Covenant on its poles, carried across the desert */
  arca_alianca: {
    label: 'A Arca da Aliança carregada em varas pelo deserto',
    rx: /\b(arca|arca da alianca)\b/,
    draw: () => {
      const fig = (x, c) => `<path d="M${x - 7} 76l3-24q1-5 6-5h2q5 0 6 5l3 24z" fill="${c}"/><path d="M${x + 3} 53l5-6 2 1.4-4 6.4z" fill="${c}"/><path d="M${x - 1} 42q0-5 4-5t4 4l-1 4h-6z" fill="#B98A62"/><path d="M${x - 5} 51q-1-15 7.4-15q3 0 4 2l-5 1.4.6 9.6z" fill="#5C7AA8"/>`;
      const cher = `<path d="M43 29Q35 13 47 7q7-3 13.4 3Q52 11 50.6 24z" fill="${SCK.goldHi}"/><path d="M41 29q0-7 4-8.6l4-1 3 3 1 6.6z" fill="${SCK.gold}"/><circle cx="51" cy="18.4" r="2.8" fill="${SCK.gold}"/>`;
      return SCH.bg('#DCE3DC') + SCH.sun(104, 14, 6, '#F4ECD8')
        + `<path d="M0 54l14-10 10 6 16-14 14 10 12-6 18 12 14-8 22 10v20H0z" fill="#BCA690"/><path d="M0 60q30-3 60 0t60 0v20H0z" fill="#E2C489"/><path d="M30 70h16M64 77h22M100 68h14" stroke="${SCK.ink}" stroke-width=".8" opacity=".3"/>`
        + SCH.g(fig(20, '#CFC6B0') + fig(102, '#CFC6B0') + `<path d="M4 44.4h112" stroke-width="3.6"/><path d="M4 44.4h112" stroke="${SCK.goldLo}" stroke-width="1.8"/>`
          + fig(15, '#F1E9D6') + fig(97, '#F1E9D6')
          + `<path d="M38 50V32h44v18z" fill="${SCK.gold}"/><path d="M36 32h48v-3H36z" fill="${SCK.goldLo}"/><path d="M40 50v3h4v-3zM76 50v3h4v-3z" fill="${SCK.goldLo}"/>`
          + cher + `<g transform="matrix(-1 0 0 1 120 0)">${cher}</g>`
          + `<path d="M2 47h116" stroke-width="3.6"/><path d="M2 47h116" stroke="${SCK.gold}" stroke-width="1.8"/>`, 1.4)
        + `<path d="M41 35h38v9H41z" fill="none" stroke="${SCK.goldLo}" stroke-width="1"/><path d="M60 35v9" stroke="${SCK.goldLo}" stroke-width=".8"/>`
        + `<path d="M10 61h13M92 61h13" stroke="#5C7AA8" stroke-width="1.6"/><path d="M45 13q2 5 3 10M50 9q1.6 3 2 6M75 13q-2 5-3 10M70 9q-1.6 3-2 6" stroke="${SCK.goldLo}" stroke-width=".8" fill="none"/>`;
    } },
  /* from inside a cave: a tall lidded jar, and the cliffs full of caves across the wadi */
  qumran: {
    label: 'Falésias do deserto com grutas escuras e um jarro de barro com tampa',
    rx: /\b(qumran|caverna|cavernas|gruta|grutas|jarro|jarros)\b/,
    draw: () => SCH.bg('#EEE2C4')
      + `<path d="M0 22l12-6 14 3 12-5 16 3 14-6 16 4 14-3 22 4v64H0z" fill="#E0C795"/><path d="M0 62q40-6 120-2v20H0z" fill="#CDAE78"/>`
      + `<path d="M20 24v30M34 22v34M52 20v20M86 20v36M100 22v30M60 44v12" stroke="#A8865A" stroke-width="1.2" opacity=".6"/><path d="M0 40q30-4 60 0t60-2" stroke="#B89466" stroke-width="1.4" fill="none" opacity=".6"/>`
      + SCH.g(`<path d="M66 35q-1-6 3-8t6 2q2 3 1 6zM90 47q0-6 4-7t4 3l-1 4zM59 56q0-4 3-5t4 2v3zM98 29q0-5 3-6t3 3l-1 3zM80 56q1-4 3-5t3 3v2zM24 44q1-3 3-3t2 3z" fill="#3E2C1C"/>`, 1)
      + SCH.g(`<path fill-rule="evenodd" d="M0 0h120v80H0zM12 10q22-8 46-4 32-4 50 6 8 18 2 36-4 14-14 20H24q-12-8-14-28-2-18 2-30z" fill="#5A4432"/><path d="M0 80V72q30-8 60-6t60 4v10z" fill="#7E6046"/>`, 1.8)
      + `<path d="M4 20q4 10 2 24M112 30q-4 12-2 26M30 74q20-3 40-2M6 4q20-2 30 0" stroke="#3A2A1C" stroke-width="1.2" fill="none" opacity=".7"/>`
      + SCH.g(`<path d="M37 74q-2-20 0-36q1-5 6-5h8q5 0 6 5q2 16 0 36z" fill="#C47F4E"/><path d="M42 33v-3h10v3z" fill="#B06E40"/><path d="M39 30q8-8 16 0z" fill="#D49464"/><path d="M45.6 23.6h2.8v2h-2.8z" fill="#B06E40"/><path d="M60 75l4-3 4 2-2 2zM26 76l3-4 3 3z" fill="#B06E40"/>`, 1.6)
      + `<path d="M53 38q1.6 16 0 34" stroke="#8C5432" stroke-width="2.4" fill="none"/><path d="M40 44h14M40 62h14" stroke="${SCK.ink}" stroke-width=".8" opacity=".4"/>` },

  /* a Phoenician merchant ship: horse-head prow, striped sail, a deck of amphorae */
  navio_fenicio: {
    label: 'Um navio mercante fenício com proa em cabeça de cavalo, carregado de ânforas',
    rx: /\b(fenicio|fenicios|fenicia|navio mercante)\b/,
    draw: () => {
      const amph = [30, 37, 44, 51, 65, 72, 79, 86].map(x => `<path d="M${x} 49v-6q0-3 2.6-3v-2h1.8v2q2.6 0 2.6 3v6z"/>`).join('');
      const sail = [0, 1, 2, 3, 4].map(i => `<path d="M${40 + i * 8} 11h8v${i % 2 ? 25 : 25}h-8z" fill="${i % 2 ? SCK.paper : SCK.burg}"/>`).join('');
      return SCH.bg('#CFE0E4') + SCH.sun(98, 14, 6, '#F4ECD8')
        + `<path d="M0 47q10-8 22-6t22-1 14 7H0z" fill="#8FA07A"/><path d="M0 47h120v33H0z" fill="${SCK.sea}"/>`
        + SCH.waves(70, '#7FA3B8', 1.4) + SCH.waves(76, '#EAF2F4', 1.2).replace('M0', 'M-10')
        + SCH.g(`<path d="M59 50V7" stroke-width="2.4"/><path d="M36 10h46" stroke-width="2.2"/>`, 1.8)
        + `<g stroke="${SCK.ink}" stroke-width="1.4">${sail}</g><path d="M40 11h40v25H40z" fill="none" stroke="${SCK.ink}" stroke-width="1.8"/><path d="M40 18h40M40 26h40" stroke="${SCK.ink}" stroke-width=".7" opacity=".5"/>`
        + `<path d="M40 36l19 14M80 36L59 50" stroke="${SCK.ink}" stroke-width=".8"/>`
        + `<g fill="#C2662D" stroke="${SCK.ink}" stroke-width="1.1" stroke-linejoin="round">${amph}</g>`
        + SCH.g(`<path d="M23 44L11 64" stroke-width="3.4"/><path d="M23 44L11 64" stroke="${SCK.wood}" stroke-width="1.6"/><path d="M11 64l-3 6 3 1 3-5z" fill="${SCK.wood}"/><path d="M14 40q2 15 14 21q12 5 31 5q20 0 30-6q8-5 11-20l-4-1q-2 8-6 10H25q-4-2-6-9zM14 40q-6-6-2-14q4 2 4 8z" fill="${SCK.wood}"/><path d="M96 41l2-11q1-4 5-4l6 3q2 1 0 3h-4l-2 3v7z" fill="${SCK.wood}"/><path d="M101 26.4l.8-3.4 1.8 3.2" fill="none" stroke-width="1.2"/>`, 1.6)
        + `<path d="M18 49h80" stroke="${SCK.burg}" stroke-width="2.4"/><path d="M24 54q34 6 70 0M28 59q30 4 56 0" stroke="${SCK.ink}" stroke-width=".8" opacity=".5" fill="none"/><path d="M98 30q1-3 3-3.6" stroke="${SCK.ink}" stroke-width="1.6" fill="none"/><circle cx="104.4" cy="28.4" r=".8" fill="${SCK.ink}"/>`;
    } },

  /* the terraced temple of Deir el-Bahari under its cliffs, incense trees in pots */
  deir_el_bahari: {
    label: 'O templo em terraços de Deir el-Bahari ao pé das falésias, com árvores de incenso em vasos',
    rx: /\b(deir|bahari|punt|terraco|terracos|incenso)\b/,
    draw: () => {
      const cols = (x0, x1, y, h) => { let d = ''; for (let x = x0; x < x1; x += 5) if (x < 52 || x > 64) d += `M${x} ${y}h2.4v${h}H${x}z`; return d; };
      const tree = x => `<path d="M${x - 4} 72q0 6 4 6t4-6z" fill="#B5643A"/><path d="M${x} 72v-4" stroke-width="1.4"/><path d="M${x - 5} 66q0-6 5-6t5 6q-2 3-5 2-3 1-5-2z" fill="${SCK.green}"/>`;
      return SCH.bg('#C8DCE2')
        + SCH.g(`<path d="M0 12l8-4 10 2 8-6 12 3 10-2 14 4 12-3 10 2 12-4 14 3 10-1v60H0z" fill="#C98A4E"/>`, 1.4)
        + `<path d="M8 14l2 22M22 10l-2 30M36 12l3 16M84 10l-2 20M98 12l2 26M112 10l-3 30" stroke="#A06634" stroke-width="2.4" opacity=".7"/><path d="M30 32q30-18 60 0" stroke="#A06634" stroke-width="1.4" fill="none" opacity=".6"/>`
        + `<path d="M0 64h120v16H0z" fill="#E2C48E"/>`
        + SCH.g(`<path d="M28 39h64v-11H28zM14 52h92V40H14zM4 65h112V53H4z" fill="#ECE3CC"/><path d="M53 65l3-26h8l3 26z" fill="#F6F0E0"/>`, 1.4)
        + `<path d="${cols(31, 90, 30.6, 6.6) + cols(17, 104, 43, 7.6) + cols(7, 114, 56, 7.6)}" fill="#4A3828"/>`
        + `<path d="M56 60h8M56.6 54h6.8M57.2 47h5.6M57.8 42h4.4" stroke="${SCK.ink}" stroke-width=".8" opacity=".45"/>`
        + SCH.g([10, 26, 42, 78, 94, 110].map(tree).join(''), 1.2);
    } },

  /* the Roman Forum: temple columns, an arch, and an orator on the Rostra with its ship-rams */
  forum_romano: {
    label: 'O Fórum Romano com templos de colunas e a tribuna dos oradores',
    rx: /\b(forum|foro|rostra|rostros|tribuna)\b/,
    draw: () => {
      const cit = (x, y) => `<path d="M${x - 5.4} ${y + 20}l1.4-13q1-4 4-4h1.4q3 0 4 4l1.4 13z" fill="${SCK.white}"/><path d="M${x - 3.4} ${y + 5}q5 3 6 11" fill="none" stroke="${SCK.burg}" stroke-width="1.2"/><circle cx="${x}" cy="${y}" r="3.2" fill="#5A3B22"/>`;
      return SCH.bg(SCK.sky)
        + `<path d="M40 64V36h14v-6h18v8h10v26z" fill="#CFC3A8"/><path d="M46 40h4M58 34h4M66 34h4M74 42h4" stroke="${SCK.ink}" stroke-width="1" opacity=".3"/>`
        + `<path d="M0 64h120v16H0z" fill="#D8CDB4"/><path d="M0 70h120M20 64l-6 16M50 64l-2 16M80 64l2 16M108 64l6 16" stroke="${SCK.ink}" stroke-width=".7" opacity=".3"/>`
        + SCH.g(`<path d="M2 66V48h42v18z" fill="${SCK.stoneLo}"/><path d="M6 48V20h5v28zM16 48V20h5v28zM26 48V20h5v28zM36 48V20h5v28z" fill="${SCK.white}"/><path d="M3 20h40v-7H3z" fill="${SCK.stone}"/><path d="M2 13l21-10 21 10z" fill="${SCK.stone}"/><path d="M86 66V22h28v44h-7V46q0-8-7-8t-7 8v20z" fill="${SCK.stone}"/><path d="M84 22h32v-8H84z" fill="${SCK.stoneLo}"/><path d="M44 66V52h36v14z" fill="${SCK.stone}"/><path d="M42 52h40v-3H42z" fill="${SCK.stoneLo}"/>`, 1.5)
        + `<path d="M5 21q3-3 7 0M15 21q3-3 7 0M25 21q3-3 7 0M35 21q3-3 7 0" stroke="${SCK.ink}" stroke-width="1" fill="none"/><path d="M8.6 24v22M18.6 24v22M28.6 24v22M38.6 24v22M90 30h20" stroke="${SCK.ink}" stroke-width=".8" opacity=".35"/>`
        + SCH.g(`<path d="M47 56l7 2.6-7 2.6zM57 56l7 2.6-7 2.6zM67 56l7 2.6-7 2.6z" fill="#3F6E66"/><path d="M57 49l2-11q1-3 4-3h2q3 0 4 3l2 11z" fill="${SCK.white}"/><circle cx="64" cy="31.6" r="2.8" fill="#C98E64"/>`, 1.2)
        + `<path d="M67 37l4-8.6" stroke="${SCK.ink}" stroke-width="3.6" stroke-linecap="round"/><path d="M67 37l4-8.6" stroke="${SCK.white}" stroke-width="2" stroke-linecap="round"/><path d="M60 38l7 10" stroke="${SCK.burg}" stroke-width="1.4"/>`
        + SCH.g(cit(27, 59) + cit(39, 62) + cit(88, 61) + cit(100, 58) + cit(111, 62), 1.3);
    } },

  /* a Roman war galley under sail, its boarding-bridge raised at the bow */
  corvo_romano: {
    label: 'Uma galera de guerra romana com a ponte de abordagem erguida, no Mediterrâneo',
    rx: /\b(corvo|quinquerreme|galera|galeras|mediterraneo)\b/,
    draw: () => {
      let oars = '', sh = '';
      for (let x = 26; x < 100; x += 5) { oars += `M${x} 50l-6 16M${(x + 1.6).toFixed(1)} 53l-5.4 14M${(x + 3.2).toFixed(1)} 56l-4.6 12`; sh += `<circle cx="${x + 2}" cy="42" r="2.6"/>`; }
      return SCH.bg(SCK.sky) + `<path d="M0 56h120v24H0z" fill="${SCK.sea}"/>` + SCH.waves(72, '#7FA3B8', 1.4)
        + `<path d="${oars}" stroke="${SCK.ink}" stroke-width="1.2"/>`
        + SCH.g(`<path d="M55 45V6" stroke-width="2.4"/><path d="M38 9h34" stroke-width="2"/><path d="M40 9h30q2 14 0 24H40q-2-10 0-24z" fill="${SCK.red}"/><path d="M90 45V12" stroke-width="2.4"/>`, 1.6)
        + `<path d="M48 9v24M62 9v24" stroke="${SCK.ink}" stroke-width=".7" opacity=".45"/><path d="M90 13l12-1" stroke="${SCK.ink}" stroke-width="1"/>`
        + SCH.g(`<path d="M86 45l14-36 4 1.4-12 35.6z" fill="#C9A66B"/><path d="M102.6 9.6l5 6-4.6-2z" fill="#4A4A52"/><path d="M12 45h90l6 7-6 6H30q-14-1-18-13zM12 45q-8-4-8-16q4 2 6 6t4 7z" fill="#6A4428"/><path d="M104 52l11 3-11 3z" fill="${SCK.goldLo}"/>`, 1.6)
        + `<g fill="${SCK.gold}" stroke="${SCK.ink}" stroke-width="1">${sh}</g>`
        + `<path d="M14 49h92" stroke="${SCK.goldLo}" stroke-width="1.6"/><path d="M89.4 40l3 1M91.6 34l3 1M94 28l3 1M96.2 22l3 1M98.4 16l3 1" stroke="${SCK.ink}" stroke-width=".9"/><path d="M6 30q2 6 6 10M8 28q2 6 5 10" stroke="${SCK.ink}" stroke-width=".8" fill="none"/>`
        + SCH.waves(64, '#EAF2F4', 1.4);
    } },
  /* two gladiators face to face on the sand of the amphitheatre, before the fight */
  arena_gladiadores: {
    label: 'Dois gladiadores frente a frente na arena de um anfiteatro',
    rx: /\b(arena|anfiteatro|coliseu|gladiador|gladiadores|polegar)\b/,
    draw: () => {
      let arc = '', crowd = '';
      for (let x = 1; x < 120; x += 12) arc += `M${x} 30v-6q0-5 5-5t5 5v6z`;
      const cr = ['', '', '', ''];
      for (let i = 0, x = 2; x < 120; x += 3, i++) cr[i % 4] += `M${x} ${38 + i % 3 * 2}h0`;
      crowd = cr.map((d, i) => `<path d="${d}" stroke="${['#9E1B1B', '#F4ECD8', '#4F7A94', '#6E4528'][i]}" stroke-width="2.6" stroke-linecap="round"/>`).join('');
      const sk = '#C98E64', limb = (d, c) => `<path d="${d}" stroke="${SCK.ink}" stroke-width="4.4" fill="none"/><path d="${d}" stroke="${c || sk}" stroke-width="2.6" fill="none"/>`;
      return SCH.bg(SCK.sky)
        + `<path d="M0 8h120v26H0z" fill="${SCK.stone}"/><path d="M0 8h120M0 18h120M0 33h120" stroke="${SCK.ink}" stroke-width="1.2"/><path d="${arc}" fill="#5A4632"/><path d="M4 11h4v4H4zM28 11h4v4h-4zM52 11h4v4h-4zM76 11h4v4h-4zM100 11h4v4h-4z" fill="#5A4632"/>`
        + `<path d="M0 34h120v12H0z" fill="#B9AE97"/><path d="M0 40h120" stroke="${SCK.ink}" stroke-width=".8" opacity=".4"/>${crowd}`
        + `<path d="M0 46h120v8H0z" fill="${SCK.burg}"/><path d="M0 46h120M0 54h120" stroke="${SCK.ink}" stroke-width="1.4"/><path d="M0 48h120" stroke="${SCK.gold}" stroke-width="1"/>`
        + `<path d="M0 54h120v26H0z" fill="#E9C98B"/>`
        + limb('M33 56l-4 19M39 56l4 19M29 38l-4 8 3 6M84 56l-4 19M90 56l4 19M81 38l-4 9') + limb('M92 38l4 7-1 6', '#D9D4C8')
        + `<path d="M28 66l-1.6 8h4l1.6-8z" fill="${SCK.gold}" stroke="${SCK.ink}" stroke-width="1"/><path d="M28 52l-2-10" stroke="#D4D7DC" stroke-width="2.4"/>`
        + SCH.g(`<path d="M30 52h12l1 6H29z" fill="${SCK.white}"/><path d="M30 49h12v3H30z" fill="${SCK.gold}"/><path d="M31 49l-1-11q0-3 3-3h6q3 0 3 3l-1 11z" fill="${sk}"/><path d="M30 31q0-8 6-8t6 8z" fill="#B8BCC0"/><path d="M27 31h18l-2 3H29z" fill="#B8BCC0"/><path d="M34 23q1-9 11-7q-4 2-5 7z" fill="${SCK.red}"/><path d="M38 36h11l1 26H39z" fill="${SCK.red}"/>`, 1.5)
        + `<path d="M40.6 38h7v22h-7z" fill="none" stroke="${SCK.gold}" stroke-width="1"/><circle cx="44.4" cy="49" r="2" fill="${SCK.gold}" stroke="${SCK.ink}" stroke-width=".8"/><path d="M33 27h6M33 29h6" stroke="${SCK.ink}" stroke-width=".8"/>`
        + `<path d="M77 76V14" stroke="${SCK.ink}" stroke-width="3"/><path d="M77 76V16" stroke="${SCK.wood}" stroke-width="1.4"/>`
        + SCH.g(`<path d="M74 17v-6M77 16v-7M80 17v-6M74 17h6" fill="none" stroke-width="1.4"/>`, 1.4)
        + SCH.g(`<path d="M81 52h12l1 6H80z" fill="${SCK.white}"/><path d="M81 49h12v3H81z" fill="${SCK.gold}"/><path d="M82 49l-1-11q0-3 3-3h6q3 0 3 3l-1 11z" fill="${sk}"/><circle cx="87" cy="29" r="4" fill="${sk}"/><path d="M83 28q0-5 4-5t4 4q-4-1-8 1z" fill="#3A2A1A"/><path d="M90 37l2-11h3l-1 11z" fill="#B8BCC0"/><path d="M95 50q8 6 7 22l-9-3q-2-10 2-19z" fill="#D9CFB0" fill-opacity=".6"/>`, 1.3)
        + `<path d="M96 54l5 4M95 60l7 5M94 66l5 3M99 52l-4 6M101 58l-6 9M102 66l-5 4" stroke="${SCK.ink}" stroke-width=".7" opacity=".7"/>`;
    } },

  /* Rome burning at night, seen across the Tiber */
  incendio_roma: {
    label: 'Roma em chamas à noite, vista do outro lado do Tibre',
    rx: /\b(incendio|chamas)\b/,
    draw: () => {
      const F = 'M-8 0C-10-8-4-14-2-22C-1-16 2-14 3-12C4-18 2-24 0-30C8-22 12-12 8 0z';
      const fl = (pts, c, sw) => `<g fill="${c}" stroke="${SCK.ink}" stroke-width="${sw}">` + pts.map(([x, sc]) => `<path transform="translate(${x} 50) scale(${sc})" d="${F}"/>`).join('') + '</g>';
      return SCH.bg(SCK.night)
        + `<path d="M0 22h120v32H0z" fill="#7A2E2A" opacity=".55"/><path d="M4 24q-4-12 10-16 6-10 18-4 10-6 18 2 14-6 20 6 12-2 12 12z" fill="#4A3A40" opacity=".8"/><path d="M58 16q4-12 18-10 10-6 18 2 12 0 14 12z" fill="#3E3038" opacity=".8"/>`
        + fl([[12, 1], [30, 1.2], [52, .9], [70, 1.3], [92, 1.1], [110, .9]], SCK.red, 1) + fl([[20, .7], [40, .8], [62, .7], [80, .9], [100, .7]], '#E8A33C', .8) + fl([[30, .5], [70, .5], [92, .4]], SCK.goldHi, .6)
        + `<path d="M0 60V44h8v-6h12v6h4v-8l12-6 12 6v24zM50 60V38h6v-4h10v8h8v-8h12v10h8V36h12v6h14v18z" fill="#1E1A24"/>`
        + `<path d="M20 30l14-9 14 9zM22 30h24v3H22zM22 44h24v4H22z" fill="#1E1A24"/><path d="M24 33h2.4v11H24zM29.6 33H32v11h-2.4zM35.2 33h2.4v11h-2.4zM40.8 33h2.4v11h-2.4z" fill="#1E1A24"/>`
        + `<path d="M3 48h2v2H3zM12 42h2v2h-2zM12 50h2v2h-2zM58 42h2v2h-2zM68 48h2v2h-2zM78 44h2v2h-2zM90 40h2v2h-2zM96 46h2v2h-2zM90 52h2v2h-2zM108 46h2v2h-2zM114 52h2v2h-2z" fill="${SCK.gold}"/>`
        + `<path d="M0 60h120v20H0z" fill="#1C2740"/><path d="M0 60h120" stroke="#3A2A2A" stroke-width="1.4"/>`
        + `<path d="M18 63h16M22 67h10M40 64h22M46 68h12M50 72h6M64 63h20M70 67h10M90 64h14" stroke="#E8A33C" stroke-width="1.4" opacity=".75"/><path d="M28 71h6M74 71h6" stroke="${SCK.red}" stroke-width="1.4"/>`
        + `<path d="M0 76q20-3 40 0t40 0 40 0v4H0z" fill="#121826"/><path d="M8 76v-6M11 76l2-7M100 76v-7M103 76l2-6" stroke="#121826" stroke-width="1.2"/>`;
    } },

  /* inside a commander's tent at night: wax tablets, stylus and lamp; the river beyond */
  tenda_meditacoes: {
    label: 'Uma tenda de campanha romana à noite, à margem do Danúbio, com tabuinhas e um estilete sobre a mesa',
    rx: /\b(tenda|acampamento|danubio)\b/,
    draw: () => {
      let pal = '';
      for (let x = 42; x < 80; x += 3) pal += `M${x} 48v-6l1.5-2 1.5 2v6z`;
      return SCH.bg('#6E4528')
        + SCH.g(`<path d="M0 28L60 4l60 24v52H0z" fill="#9A6A3E"/>`, 1.6)
        + `<path d="M20 20v60M100 20v60M8 25v55M112 25v55" stroke="#6E4528" stroke-width="1" stroke-dasharray="2 1.6"/>`
        + `<path d="M38 66L60 10l22 56z" fill="${SCK.night}"/><circle cx="66" cy="24" r="3.6" fill="${SCK.white}"/><circle cx="54" cy="20" r=".7" fill="${SCK.white}"/><circle cx="62" cy="34" r=".6" fill="${SCK.white}"/>`
        + `<path d="M48 54h24v12H48z" fill="#3E5878"/><path d="M60 55h10M62 58h6M58 61h8" stroke="${SCK.white}" stroke-width="1" opacity=".7"/><path d="${pal}" fill="#1A1F30"/><path d="M40 48h40v6H40z" fill="#22283A"/>`
        + SCH.g(`<path d="M60 10Q50 34 32 66h8Q50 40 60 10zM60 10q10 24 28 56h-8Q70 40 60 10z" fill="#B88350"/>`, 1.4)
        + `<circle cx="40" cy="46" r="1.6" fill="${SCK.goldLo}"/><circle cx="80" cy="46" r="1.6" fill="${SCK.goldLo}"/>`
        + `<circle cx="24" cy="50" r="20" fill="${SCK.goldHi}" opacity=".18"/><circle cx="24" cy="50" r="11" fill="${SCK.goldHi}" opacity=".18"/>`
        + SCH.g(`<path d="M14 58h76l-4-5H18z" fill="#A8744A"/><path d="M14 58h76v3H14z" fill="${SCK.wood}"/><path d="M22 61l14 19M36 61L22 80M68 61l14 19M82 61L68 80" fill="none" stroke-width="2"/><path d="M30 56l3-6h12l-1 6zM45 56l1-6h12l3 6z" fill="#B88350"/><path d="M17 55q0-3 5-3h4q3 0 6-2-1 4-4 5z" fill="#B5643A"/><path d="M94 62h22v3H94z" fill="${SCK.wood}"/><path d="M96 65l18 15M114 65L96 80" fill="none" stroke-width="2"/><path d="M94 62q0-7 5-8h12q5 1 5 8z" fill="${SCK.red}"/><path d="M97 61l-1.6 10 4-1.6 2.4 2 1.2-10.4z" fill="${SCK.red}"/>`, 1.3)
        + `<path d="M33 54.4l1.6-3h9l-.6 3zM47 54.4l.6-3h9l1.6 3z" fill="#3A3328"/><path d="M36 53h6M49 53h6" stroke="#C9B48A" stroke-width=".6" opacity=".7"/><path d="M62 56.6l18-3" stroke="${SCK.ink}" stroke-width="1.2"/><circle cx="80" cy="53.6" r=".9" fill="${SCK.ink}"/>`
        + `<path d="M30 52q-1-4 1-6 2 3 0 6z" fill="${SCK.goldHi}" stroke="${SCK.gold}" stroke-width=".6"/><path d="M98 58h14M100 61q6-2 12 0" stroke="#5E1010" stroke-width="1" fill="none"/><circle cx="105" cy="56.4" r="1.6" fill="${SCK.gold}" stroke="${SCK.ink}" stroke-width=".6"/>`;
    } },

  /* a bronze horseman on his pedestal, in a hilltop square of palaces */
  estatua_equestre: {
    label: 'Uma estátua equestre de bronze sobre um pedestal, numa praça no alto da colina',
    rx: /\b(estatua equestre|estatua|bronze)\b/,
    draw: () => {
      const br = '#4F8A80', lg = 'M46 36l-1.4 11M51 37l1 10M68 37l1 10M71 35l4 5-2 5', limbs = d => `<path d="${d}" stroke="${SCK.ink}" stroke-width="4.4" fill="none"/><path d="${d}" stroke="${br}" stroke-width="2.6" fill="none"/>`;
      let win = '';
      for (let x = 18; x < 104; x += 8) win += `M${x} 39h3v5h-3zM${x} 50h3v5h-3z`;
      return SCH.bg(SCK.sky)
        + SCH.g(`<path d="M14 62V34h92v28z" fill="#E3D3B0"/><path d="M12 34h96v-3H12z" fill="${SCK.stoneLo}"/><path d="M0 62V24l14 6v32zM120 62V24l-14 6v32z" fill="${SCK.stone}"/>`, 1.3)
        + `<path d="M16 31v-2h4v2zM28 31v-2h4v2zM88 31v-2h4v2zM100 31v-2h4v2z" fill="${SCK.stoneLo}"/><path d="${win}" fill="#8A7A62"/><path d="M3 60v-8q0-3 2.5-3t2.5 3v8zM112 60v-8q0-3 2.5-3t2.5 3v8z" fill="#8A7A62"/><path d="M4 26v24M10 28v22M110 28v22M116 26v24" stroke="${SCK.ink}" stroke-width=".8" opacity=".4"/>`
        + `<path d="M0 62h120v18H0z" fill="#D9CDB0"/><path d="M0 62h120" stroke="${SCK.ink}" stroke-width="1.2"/><ellipse cx="60" cy="74" rx="56" ry="9" fill="none" stroke="${SCK.ink}" stroke-width=".8" opacity=".35"/><path d="M14 74l14-6M106 74l-14-6M30 79l12-9M90 79l-12-9" stroke="${SCK.ink}" stroke-width=".8" opacity=".3"/>`
        + SCH.g(`<path d="M48 74V57h24v17z" fill="#EDE5D2"/><path d="M45 57h30v-4H45zM45 74h30v3H45z" fill="${SCK.stone}"/>`, 1.5)
        + `<path d="M52 60h16v11H52z" fill="none" stroke="${SCK.ink}" stroke-width=".8" opacity=".4"/>`
        + `<g transform="translate(60 53) scale(1.2) translate(-60 -47)">` + limbs(lg + 'M43 30q-4 4-3 12M64 17l9-2.6M60 28l2 8')
        + SCH.g(`<path d="M44 28q5-2 10-1h12l5-6 3-6 1-3 2 3 4 7q1 2-1 2.4l-2-.4-3-1-1 6q-1 5-3 7l-2 2H50q-6 0-8-4q-2-4 2-6z" fill="${br}"/><path d="M57 28l1-10q1-3 4-3t4 3l1 10z" fill="${br}"/><circle cx="62" cy="11.4" r="2.8" fill="${br}"/><path d="M58 17q-5 4-7 12h7z" fill="#3F7068"/>`, 1.5)
        + `<path d="M52 30q6-2 12 0M47 30q4 4 1 6M70 20l3-4" stroke="#9CC8BC" stroke-width="1" fill="none" opacity=".8"/></g>`;
    } },

  /* the labarum: a purple banner under the gold wreath with the Chi-Rho, a legion behind */
  labaro_constantino: {
    label: 'O lábaro com o monograma de Cristo erguido sobre as legiões',
    rx: /\b(labaro|crismon|qui-ro)\b/,
    draw: () => {
      let back = '', front = '', sp = '';
      for (let x = 6; x < 120; x += 12) { back += `M${x - 4} 66q0-6 4-6t4 6z`; sp += `M${x + 4} 66V40`; }
      for (let x = 0; x < 124; x += 14) front += `<path d="M${x - 6} 80v-6q0-4 6-4t6 4v6z" fill="#6A2430"/><path d="M${x - 5} 71q0-7 5-7t5 7z" fill="#B8BCC0"/><path d="M${x} 64v7M${x - 5} 71l-1 4M${x + 5} 71l1 4" fill="none"/>`;
      return SCH.bg('#C9D6DA') + `<path d="M0 36h120v44H0z" fill="#F2CB8A"/>` + SCH.sun(98, 60, 10, '#F8E3AE')
        + `<path d="M0 54q30-4 60 0t60-2v28H0z" fill="#B9A07A"/>`
        + `<path d="${sp}" stroke="${SCK.ink}" stroke-width="1.2"/><path d="${sp.replace(/V40/g, 'l-1.4 0 1.4-5 1.4 5z').replace(/M(\d+) 66/g, 'M$1 40')}" fill="#D4D7DC" stroke="${SCK.ink}" stroke-width=".8"/>`
        + `<path d="${back}" fill="#4A4652"/><path d="M0 66h120v6H0z" fill="#3A2A30"/>`
        + SCH.g(front, 1.2)
        + SCH.g(`<path d="M59 80V20h3v60z" fill="${SCK.wood}"/><path d="M38 27h45v-3H38z" fill="${SCK.gold}"/><path d="M40 27h41v26l-3.4 3-3.4-3-3.4 3-3.4-3-3.4 3-3.4-3-3.4 3-3.4-3-3.4 3-3.4-3-3.4 3L40 53z" fill="${SCK.burg}"/><circle cx="60.5" cy="13" r="9.4" fill="#4E1626"/>`, 1.5)
        + `<circle cx="60.5" cy="13" r="8" fill="none" stroke="${SCK.gold}" stroke-width="3"/><path d="M53 9l2 1.4M53 17l2-1M68 9l-2 1.4M68 17l-2-1M58 5.6l1 1.6M63 5.6l-1 1.6" stroke="${SCK.goldLo}" stroke-width="1"/>`
        + `<path d="M56.6 9.4l7.8 7.8M64.4 9.4l-7.8 7.8M60.5 7v12" stroke="${SCK.goldHi}" stroke-width="1.6" fill="none"/><path d="M60.5 7.2q3.6 0 3.6 2.6t-3.6 2.6" stroke="${SCK.goldHi}" stroke-width="1.6" fill="none"/>`
        + `<path d="M43 30h35v19H43z" fill="none" stroke="${SCK.gold}" stroke-width="1"/><circle cx="50" cy="40" r="2.4" fill="${SCK.gold}"/><circle cx="60.5" cy="40" r="2.4" fill="${SCK.gold}"/><circle cx="71" cy="40" r="2.4" fill="${SCK.gold}"/>`;
    } },
  /* the she-wolf on the riverbank, the twins beneath her, the fig tree behind */
  loba_capitolina: {
    label: 'A loba que amamenta os gêmeos, junto ao rio',
    rx: /\b(loba|romulo|remo|gemeos)\b/,
    draw: () => {
      const bz = '#7A4E2A', lg = 'M40 47l-2 19M47 49l1 17M81 49l1 17M87 46l3 19M89 40q7 6 4 20', inf = '#E2B48A';
      return SCH.bg('#D9E4DA')
        + SCH.g(`<path d="M106 66q-3-18 0-34" stroke-width="5" fill="none"/><path d="M106 66q-3-18 0-34" stroke="${SCK.wood}" stroke-width="3" fill="none"/><path d="M84 30q-4-12 8-16 4-12 18-8 12 0 12 12 4 10-6 16-8 6-18 2-10 4-14-6z" fill="${SCK.green}"/>`, 1.4)
        + `<path d="M92 20q4 2 6 6M104 12q2 4 0 8M110 26q4 0 6-4M96 30q4-2 8 0" stroke="${SCK.olive}" stroke-width="2" fill="none"/><path d="M96 16h0M114 18h0M102 26h0M90 30h0M110 34h0" stroke="#5E2A4A" stroke-width="3" stroke-linecap="round"/>`
        + `<path d="M0 56q40-6 80-2t40 0v26H0z" fill="#9AB078"/><path d="M0 68q30-4 60 0t60-2v14H0z" fill="${SCK.sea}"/>` + SCH.waves(74, '#9DBACB', 1.2)
        + `<path d="M4 66V36M8 66V40M12 66V34M16 66V44" stroke="${SCK.olive}" stroke-width="1.4"/><path d="M4 36v6M12 34v6M8 40v5" stroke="${SCK.wood}" stroke-width="2.4" stroke-linecap="round"/>`
        + `<path d="${lg}" stroke="${SCK.ink}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="${lg}" stroke="${bz}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`
        + SCH.g(`<path d="M14 30l10-5q4-2 6-1l1-8 4 6 2-5 2 7q2 3 3 6l4 2h34q8 0 9 6l-1 10q-2 3-8 3H52q-8 0-12-2-4-4-6-10l-6 2q-4 1-8 0l-4-4 6-3z" fill="${bz}"/>`, 1.6)
        + `<path d="M40 30q2 2 0 4M45 31q2 2 0 4M38 36q2 2 0 4M43 37q2 2 0 4M48 37q2 2 0 4M58 36q8-2 18 0" stroke="${SCK.goldLo}" stroke-width="1.2" fill="none"/><circle cx="27" cy="27.4" r="1" fill="${SCK.ink}"/><path d="M17 32.4l2 1.4M30 25q3-1 5 1M56 51q1 3 2 0M63 51q1 3 2 0M70 51q1 3 2 0" stroke="${SCK.ink}" stroke-width="1" fill="none"/>`
        + `<path d="M61 60l4-7M58 61l-3-5M73 60l-3-7M76 61l3-5" stroke="${SCK.ink}" stroke-width="3.4" stroke-linecap="round"/><path d="M61 60l4-7M58 61l-3-5M73 60l-3-7M76 61l3-5" stroke="${inf}" stroke-width="1.8" stroke-linecap="round"/>`
        + SCH.g(`<path d="M54 67q0-9 6-9t6 9zM68 67q0-9 6-9t6 9z" fill="${inf}"/><circle cx="60" cy="55.4" r="3.4" fill="${inf}"/><circle cx="74" cy="55.4" r="3.4" fill="${inf}"/><path d="M56.8 54.6q.4-4 3.6-4.4 3 .4 3.4 3.4-3.6-1.4-7 1zM70.8 54.6q.4-4 3.6-4.4 3 .4 3.4 3.4-3.6-1.4-7 1z" fill="#6E4528" stroke-width=".8"/>`, 1.2);
    } },

  /* Hun horse archers galloping across the plain toward a walled Gallo-Roman town */
  hunos_cavaleiros: {
    label: 'Cavaleiros hunos com arcos curvos galopando diante de uma cidade romana da Gália',
    rx: /\b(huno|hunos)\b/,
    draw: () => {
      const HR = `<path d="M24 3l10 5M22 4l9 7M6 3L-4 8M8 4l-10 7M0-1l-8-5M22-6l6-6" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M0 0q2-6 10-6h12l6-6q2-2 5 0l4 4q1 2-1 2l-4-1-4 5q-2 6-8 7H8q-6 0-8-5zM14-5l2-12q1-3 4-2l2 2-2 12z"/><circle cx="20" cy="-21" r="3"/><path d="M17-22q3-7 7-1z" fill="${SCK.sand}"/><path d="M19-15l10-1" stroke="currentColor" stroke-width="1.6"/><path d="M29-26q-3 1-1 4 5 6 0 12-2 3 1 4" fill="none" stroke="${SCK.goldLo}" stroke-width="1.4"/><path d="M29-26L21-16l8 10" fill="none" stroke="${SCK.ink}" stroke-width=".5"/>`;
      const rider = (x, y, k) => `<g transform="translate(${x} ${y}) scale(${k})" fill="#3E2A1C" color="#3E2A1C" stroke-linejoin="round">${HR}</g>`;
      return SCH.bg('#E6D9B6') + SCH.sun(24, 18, 7, '#F4ECD8')
        + `<path d="M0 50q30-4 60-2t60-6v38H0z" fill="${SCK.ochre}"/><path d="M76 52q16-16 44-14v14z" fill="#B99A63"/>`
        + SCH.g(`<path d="M84 50V36h4v-4h5v4h10v-4h5v4h5v-4h5v18z" fill="${SCK.stone}"/><path d="M90 30l2-5 3 5zM104 30l2-5 3 5z" fill="#B5643A"/><path d="M93 34l5-6 5 6zM110 34l4-5 4 5z" fill="#B5643A"/>`, 1.2)
        + `<path d="M96 50v-5q0-3 2.4-3t2.4 3v5z" fill="#4A3828"/><path d="M84 42h36" stroke="${SCK.ink}" stroke-width=".7" opacity=".4"/>`
        + `<path d="M10 70h30M60 76h40M2 58h20" stroke="${SCK.ink}" stroke-width=".8" opacity=".3"/>`
        + rider(12, 40, .6) + rider(34, 52, .8) + rider(54, 68, 1)
        + SCH.g(`<path d="M4 78v-3h12v3zM6 75V62h8v13z" fill="${SCK.stone}"/><ellipse cx="10" cy="62" rx="4" ry="1.4" fill="${SCK.stoneLo}"/>`, 1.3) + `<path d="M12 64v10" stroke="${SCK.ink}" stroke-width=".8" opacity=".4"/>`;
    } },

  /* night: Gauls climbing the Capitoline cliff toward the temple, under the moon */
  capitolio_noite: {
    label: 'Guerreiros gauleses escalando o rochedo do Capitólio à luz da lua',
    rx: /\b(capitolio|gauleses|gaules)\b/,
    draw: () => {
      const G = `<circle cx="0" cy="-12" r="2.2"/><path d="M-1-14q-5 2-4 8M-2-10h4l1 7h-6zM1-9l3-6M-1-9l-3-5M0-3l2 4-1 4M-1-3l-3 3 1 5" stroke="currentColor" stroke-width="1.4" fill="currentColor" stroke-linecap="round"/><ellipse cx="-3.6" cy="-6" rx="2.4" ry="4.4" fill="#4E5A70" stroke="#C9D0DC" stroke-width=".6"/><path d="M3-15l2-6" stroke="currentColor" stroke-width=".8"/>`;
      const gaul = (x, y, k, r) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${k})" fill="#14141C" color="#14141C">${G}</g>`;
      return SCH.bg('#1F2B44') + `<circle cx="22" cy="18" r="13" fill="${SCK.white}" opacity=".12"/>` + SCH.sun(22, 18, 8, '#F1E7CF')
        + `<path d="M50 8h.1M8 40h.1M44 30h.1M110 6h.1" stroke="${SCK.white}" stroke-width="1.4" stroke-linecap="round"/>`
        + SCH.g(`<path d="M20 80l8-14 6-4 4-10 8-6 4-10 8-6 4-8 6-4h52v62z" fill="#8E97A8"/>`, 1.6)
        + `<path d="M40 62l6-4M48 50l4 6M58 42l-2 8M64 34l6 4M74 30l-4 10M86 34l2 14M98 30l-6 16M108 36l2 20M60 60l8-6M84 58l6-8" stroke="#4E5668" stroke-width="2.2" stroke-linecap="round"/>`
        + `<path d="M36 70l10-6M52 58l10-4M66 46l10-2" stroke="#B9C2D0" stroke-width="1.2" opacity=".7"/>`
        + SCH.g(`<path d="M68 22h52v-4H68z" fill="#6E7688"/><path d="M76 18v-4h40v4z" fill="#C9C6BC"/><path d="M78 14V6h36v8z" fill="#D9D4C6"/><path d="M74 6l22-6 22 6z" fill="#B5643A"/>`, 1.2)
        + `<path d="M82 7v7M89 7v7M96 7v7M103 7v7M110 7v7" stroke="#14141C" stroke-width="2.2"/>`
        + gaul(36, 74, 1.4, 20) + gaul(54, 62, 1.3, 12) + gaul(76, 52, 1.2, 4) + gaul(84, 34, 1.1, 0)
        + `<path d="M0 80V70q10-4 22 0v10z" fill="#14141C"/>`;
    } },

  /* war elephants and a column of soldiers on a narrow snowy pass in the Alps */
  ev_guerras_punicas: {
    label: 'Elefantes de guerra atravessando os Alpes nevados',
    rx: /\b(guerras punicas|elefante|elefantes|alpes)\b/,
    ev: 'guerras_punicas',
    draw: () => {
      const E = `<path d="M15-9v9h4v-9zM22-9v9h4v-9z" fill="#6E6A66"/><path d="M2-12q0-12 14-12h10q8 0 10 6l1 5q-1 4-4 4l-1 1v8h-5l-1-9H14l-1 9H8v-8q-6-1-6-4z" fill="#8E8A86"/><path d="M10-23q7-3 14 0l-1 10H11z" fill="${SCK.red}"/><path d="M26-20q-6 0-6 6t6 7q3-2 3-6z" fill="#A6A29C"/><path d="M26-27h5l1 4h-7zM31-28l4-9" fill="${SCK.ochre}"/><circle cx="28.4" cy="-29.6" r="2" fill="#C98E64"/>`;
      const el = (x, y, k) => `<g transform="translate(${x} ${y}) scale(${k})">` + SCH.g(E, 1.4) + `<path d="M36-14q3 8 1 13q0 2 2.6 1" stroke="${SCK.ink}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M36-14q3 8 1 13q0 2 2.6 1" stroke="#8E8A86" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M33-10q4 0 7-4" stroke="${SCK.white}" stroke-width="1.6" fill="none"/><circle cx="32" cy="-17" r=".9" fill="${SCK.ink}"/><path d="M11-14h12" stroke="${SCK.gold}" stroke-width="1.2"/></g>`;
      let men = '';
      for (let x = 3; x < 26; x += 6) men += `<circle cx="${x}" cy="${51 + x / 6 | 0}" r="1.8"/><path d="M${x - 2} ${61 + x / 6 | 0}l1-8h2l1 8zM${x + 2} ${45 + x / 6 | 0}v16" stroke="#3A2A1A" stroke-width="1"/>`;
      return SCH.bg('#C9D6DE')
        + SCH.g(`<path d="M0 40L14 18l8 8 12-18 12 16 10-10 14 16 12-24 14 18 10-8 14 14v40H0z" fill="#EEF2F2"/>`, 1.3)
        + `<path d="M14 18l4 22 4-14zM34 8l2 26 10-10zM56 14l2 18 12-2zM82 6l2 30 12-12zM106 16l2 18 12-4z" fill="#B4C2CC"/>`
        + `<path d="M0 50q40-10 120-16v46H0z" fill="#DDE4E8"/><path d="M0 64l120-10v10L0 72z" fill="#C9C4BA" stroke="${SCK.ink}" stroke-width="1"/><path d="M0 72l120-8v16H0z" fill="#7E8A96"/>`
        + `<path d="M10 76l6-4M40 78l8-6M80 76l6-6M104 74l6-6" stroke="#5A6470" stroke-width="1.4"/>`
        + `<g fill="#3A2A1A">${men}</g>` + el(28, 61, .8) + el(64, 58, 1)
        + `<path d="M50 10h.1M70 20h.1M96 8h.1M30 30h.1M112 28h.1M60 34h.1" stroke="${SCK.white}" stroke-width="1.6" stroke-linecap="round"/>`;
    } },

  /* legionaries wade a small river at dawn, the gold eagle carried ahead */
  ev_fim_republica: {
    label: 'Legionários atravessam um pequeno rio com o estandarte da águia',
    rx: /\b(rubicao|aquila|aguia|aguias|legionario|legionarios|queda da republica)\b/,
    ev: 'fim_republica',
    draw: () => {
      const P = [[16, 66], [34, 67], [52, 66], [70, 67]], A = [...P, [90, 66]], J = (a, f) => a.map(([x, y]) => f(x, y)).join('');
      const pil = J(P, (x, y) => `M${x + 3} ${y - 10}l6-30`);
      return SCH.bg('#C9D6DA') + `<path d="M0 26h120v24H0z" fill="#F0CF92"/>` + SCH.sun(104, 44, 8, '#F8E3AE')
        + `<path d="M0 46q30-6 60-2t60-2v10H0z" fill="${SCK.olive}"/><path d="M0 52h120v16H0z" fill="${SCK.sea}"/>`
        + `<path d="${pil}" stroke="${SCK.ink}" stroke-width="2"/><path d="${pil}" stroke="#A8744A" stroke-width=".8"/><path d="${J(P, (x, y) => `M${x + 8} ${y - 34}l1.4-7`)}" stroke="#D4D7DC" stroke-width="1.2"/>`
        + `<path d="M95 54V22" stroke="${SCK.ink}" stroke-width="2.6"/><path d="M95 54V22" stroke="${SCK.wood}" stroke-width="1.2"/>`
        + SCH.g(`<path d="${J(A, (x, y) => `M${x - 3} ${y - 10}h7l1 10h-9z`)}" fill="${SCK.red}"/><path d="${J(A, (x, y) => `M${x - 3} ${y - 20}h6l1 10h-8z`)}" fill="#8E949A"/><path d="${J(A, (x, y) => `M${x - 2.6} ${y - 23}a2.6 2.6 0 1 0 5.2 0a2.6 2.6 0 1 0-5.2 0`)}" fill="#C98E64"/><path d="${J(A, (x, y) => `M${x - 3} ${y - 24}q0-5 3-5t3 5z`)}" fill="${SCK.goldLo}"/><path d="${J(P, (x, y) => `M${x - 6} ${y - 20}h9q2 0 2 2v14q0 2-2 2h-9q-2 0-2-2v-14q0-2 2-2z`)}" fill="${SCK.red}"/><path d="M92 23v-2.4q0-2 2-2.6l-1.6-1q2-2 4 .6 2 1.4 0 3.4l-.4 2zM93 21q-7-1-10-11 5 2 9 7zM97 21q7-1 10-11-5 2-9 7z" fill="${SCK.gold}"/><path d="M90 24h10" stroke-width="1.6"/>`, 1.2)
        + `<path d="${J(P, (x, y) => `M${x - 5.6} ${y - 18.6}h7.2v13.2h-7.2z`)}" fill="none" stroke="${SCK.gold}" stroke-width=".8"/><path d="${J(P, (x, y) => `M${x - 3.6} ${y - 11}a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0-3.2 0`)}" fill="${SCK.gold}"/>`
        + `<path d="M0 60q5-2 10 0t10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0V68H0z" fill="${SCK.sea}"/>`
        + `<path d="M10 60q3-2 6 0M28 61q3-2 6 0M46 60q3-2 6 0M64 61q3-2 6 0M84 60q3-2 6 0" stroke="${SCK.white}" stroke-width="1.2" fill="none"/>`
        + `<path d="M0 66q30-3 60 0t60-2v16H0z" fill="${SCK.green}"/><path d="M0 66q30-3 60 0t60-2" stroke="${SCK.ink}" stroke-width="1.2" fill="none"/><path d="M8 72h12M50 76h20M96 72h14" stroke="${SCK.ink}" stroke-width=".8" opacity=".35"/>`;
    } },
});
