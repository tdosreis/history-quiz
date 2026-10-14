/* Grécia antiga — the scenes of the Greek world, from Cnossos to Alexandria (conventions in _core.js) */
Object.assign(SCENE, {
  /* a plain clay kylix on the stone bench of a bare cell, in the light of the barred window */
  cicuta: {
    label: 'Uma taça sobre um banco de pedra numa cela, iluminada por um feixe de luz',
    rx: /\b(cicuta|taca|calice|prisao)\b/,
    draw: () => SCH.bg('#6E6252')
      + `<path d="M0 62h120v18H0z" fill="#574C40"/>`
      + `<path d="M0 14h120M0 28h120M0 42h120M0 56h120M18 0v14M58 0v14M98 0v14M38 14v14M78 14v14M118 14v14M18 28v14M58 28v14M98 28v14M38 42v14M78 42v14M8 42v14" stroke="#2A1D10" stroke-width=".8" opacity=".35"/>`
      + `<path d="M12 8h20v14H12z" fill="#F4E3B6" stroke="#2A1D10" stroke-width="1.6"/>`
      + `<path d="M12 8h20l84 46H36z" fill="#F4E3B6" opacity=".22"/>`
      + `<path d="M17 8v14M22 8v14M27 8v14" stroke="#2A1D10" stroke-width="1.8"/>`
      + SCH.g(`<path d="M34 50h80v4H34z" fill="${SCK.stone}"/><path d="M34 54h80v14H34z" fill="${SCK.stoneLo}"/>
        <path d="M38 68h8v6h-8zM102 68h8v6h-8z" fill="#8C826C"/>
        <path d="M94 43q0-3 3-3h12q3 0 3 3v7H94z" fill="${SCK.parch}" stroke-width="1.4"/><path d="M93 46.4h20v3.6H93z" fill="${SCK.burg}" stroke-width="1.2"/>
        <g transform="translate(58 50) scale(1.3) translate(-62 -50)"><path d="M44 31q3 0 4 3M80 31q-3 0-4 3" fill="none" stroke-width="2.4"/>
        <path d="M44 31q-6-3-8 1t5 4M80 31q6-3 8 1t-5 4" fill="none" stroke-width="1.6"/>
        <path d="M45 31h34q-2 11-17 11t-17-11z" fill="#C0683A"/>
        <path d="M59 42h6l2 5h-10z" fill="#C0683A" stroke-width="1.4"/><path d="M54 47h16q1 3-8 3t-8-3z" fill="#8E4424" stroke-width="1.4"/>
        <ellipse cx="62" cy="31" rx="16.6" ry="2.4" fill="#4A2412" stroke-width="1.4"/>
        <path d="M47 35.4q15 4 30 0" fill="none" stroke-width="2.2"/><path d="M52 38h4M72 38h-4" stroke="#F0B080" stroke-width="1" opacity=".7"/></g>`, 1.6)
      + `<path d="M97 43.4h12" stroke="${SCK.ink}" stroke-width=".8" opacity=".5"/><path d="M40 58h20M70 62h30" stroke="${SCK.ink}" stroke-width=".8" opacity=".35"/>` },

  /* the figure of the right triangle and its squares, traced in smooth sand; a compass, a stick and a column's foot beside it */
  geometria_areia: {
    label: 'Um triângulo e quadrados traçados na areia, com um compasso e uma vara',
    rx: /\b(geometria|teorema|triangulo|triangulos|compasso)\b/,
    draw: () => {
      const fig = `M36 30v18h24zM18 30h18v18H18zM36 48h24v18H36zM36 30l18-24 24 18-18 24zM6 16a8 8 0 1 0 16 0a8 8 0 1 0-16 0z`;
      return SCH.bg('#E6C88E')
        + `<path d="M64 74q10 3 20 0M82 30q6 2 12 0M2 66q8 3 16 0M20 4q6 2 12 0" stroke="#B8955C" stroke-width="1" fill="none" opacity=".7"/>`
        + `<path d="${fig}" fill="none" stroke="#F8E6BC" stroke-width="2.6" transform="translate(1 1)"/>`
        + `<path d="${fig}" fill="none" stroke="#6E4C1E" stroke-width="2.6" stroke-linejoin="round"/>`
        + `<path d="M36 43h5v5" fill="none" stroke="#6E4C1E" stroke-width="1.4"/><circle cx="14" cy="16" r="1.4" fill="#6E4C1E"/>`
        + SCH.g(`<path d="M62 76 104 66" stroke-width="5.6" fill="none"/><path d="M62 76 104 66" stroke="${SCK.wood}" stroke-width="3" fill="none"/>`, 1.6)
        + SCH.g(`<path d="M88 9 76 56l2.6.7L90.4 12zM88 9l13 46-2.6.7L85.6 12z" fill="${SCK.gold}"/><circle cx="88" cy="10" r="3.8" fill="${SCK.goldHi}"/>
          <path d="M81.6 36q7 2.4 14.4-.4" fill="none" stroke-width="1.6"/>`, 1.4)
        + `<path d="M77 55l-1.4 5M100 54l1.8 5" stroke="${SCK.ink}" stroke-width="1.4"/>`
        + SCH.g(`<path d="M107 0h14v44h-14z" fill="${SCK.white}"/><path d="M104 44h17q2 3 0 6h-17q-2-3 0-6z" fill="${SCK.stone}"/><path d="M101 50h20v6h-20z" fill="${SCK.stoneLo}"/>`, 1.6)
        + `<path d="M111 0v43M115 0v43M119 0v43" stroke="${SCK.ink}" stroke-width="1" opacity=".45"/>`;
    } },

  /* the brimming bath spilling over, the golden wreath weighed on a balance, a lever lifting a stone */
  banheira_eureka: {
    label: 'Uma banheira transbordando, com uma coroa de ouro e uma alavanca ao lado',
    rx: /\b(banheira|banho|empuxo|alavanca|coroa de ouro)\b/,
    draw: () => SCH.bg('#E4D3AE')
      + `<path d="M0 8h120M0 12h120" stroke="${SCK.burg}" stroke-width="1.6" opacity=".6"/>`
      + `<path d="M0 60h120v20H0z" fill="${SCK.stone}"/><path d="M0 67h120M0 75h120M30 60l-4 20M90 60l2 20" stroke="${SCK.ink}" stroke-width=".8" opacity=".35"/>`
      + `<path d="M0 63q22 5 58 3q12 4 2 9q-30 4-60-1z" fill="${SCK.sea}" opacity=".85"/>`
      + SCH.g(`<path d="M7 32h52v18q0 9-9 9H16q-9 0-9-9z" fill="${SCK.stone}"/><path d="M12 59h7v3h-7zM47 59h7v3h-7z" fill="${SCK.stoneLo}" stroke-width="1.2"/>
        <path d="M5 29q28-12 56 0z" fill="${SCK.sea}" stroke-width="1.4"/>
        <path d="M5 33h56v4q-3.5 4-7 0t-7 0-7 0-7 0-7 0-7 0-7 0-7 0z" fill="${SCK.sea}" stroke-width="1.2"/>
        <path d="M4 28h58v5H4z" fill="${SCK.white}"/>
        <path d="M4 31q-5 10-1 18t-2 14M62 31q5 8 1 16t3 16" fill="none" stroke="${SCK.sea}" stroke-width="3.4"/>`, 1.8)
      + `<path d="M4 31q-5 10-1 18t-2 14M62 31q5 8 1 16t3 16" fill="none" stroke="#BFD9E6" stroke-width="1"/><path d="M14 25q12-4 26-2M10 35.4h8M30 35.4h10" stroke="#BFD9E6" stroke-width="1.2" fill="none"/>`
      + `<path d="M14 44h40M14 51h38" stroke="${SCK.ink}" stroke-width=".8" opacity=".35"/>`
      + `<circle cx="16" cy="18" r="2" fill="${SCK.sea}"/><circle cx="30" cy="14" r="2.4" fill="${SCK.sea}"/><circle cx="46" cy="17" r="1.8" fill="${SCK.sea}"/><circle cx="68" cy="24" r="1.8" fill="${SCK.sea}"/><circle cx="72" cy="38" r="1.4" fill="${SCK.sea}"/>`
      + SCH.g(`<path d="M70 42h28v4H70z" fill="${SCK.wood}"/><path d="M73 46l-3 14M95 46l3 14" fill="none" stroke-width="2.6"/>
        <path d="M84 42V12M68 14h32" fill="none" stroke-width="2.2"/><circle cx="84" cy="11" r="2" fill="${SCK.gold}" stroke-width="1.2"/>
        <path d="M69 14l-4 12M69 14l4 12M99 14l-4 12M99 14l4 12" fill="none" stroke-width="1"/>
        <path d="M62 26h14q-1 5-7 5t-7-5zM92 26h14q-1 5-7 5t-7-5z" fill="${SCK.goldLo}" stroke-width="1.4"/>
        <ellipse cx="69" cy="22.6" rx="6.4" ry="3" fill="none" stroke-width="4.4"/><path d="M96 20h6v6h-6z" fill="${SCK.gold}" stroke-width="1.4"/>`, 1.6)
      + `<ellipse cx="69" cy="22.6" rx="6.4" ry="3" fill="none" stroke="${SCK.gold}" stroke-width="2.4"/><ellipse cx="69" cy="22.6" rx="6.4" ry="3" fill="none" stroke="${SCK.goldLo}" stroke-width="2.4" stroke-dasharray="1.2 1.8"/>`
      + SCH.g(`<path d="M94 77l6-8 6 8z" fill="${SCK.stoneLo}"/><path d="M74 78l46-13 .8 3-46 13z" fill="${SCK.wood}"/><circle cx="114" cy="61" r="5.4" fill="#9A8E78"/>`, 1.4) },

  /* the great wooden horse on its wheeled platform, before the walls and gate of the city; the black ships drawn up on the shore */
  cavalo_de_troia: {
    label: 'O grande cavalo de madeira diante das muralhas de uma cidade',
    rx: /\b(troia|cavalo de madeira|cavalo de troia)\b/,
    draw: () => SCH.bg(SCK.sky)
      + `<path d="M0 44h86v10H0z" fill="${SCK.sea}"/>`
      + `<path d="M0 54h120v26H0z" fill="${SCK.sand}"/><path d="M4 74h20M92 74h22M50 77h14" stroke="${SCK.ink}" stroke-width=".8" opacity=".4"/>`
      + SCH.g(`<path d="M-4 47h18q-2 5-7 5H-2zM14 47q5-1 5-8" fill="#2A1D10" stroke-width="1.4"/><path d="M5 47V30" fill="none" stroke-width="1.4"/>`, 1.2)
      + SCH.g(`<path d="M88 64l4-48h28v48z" fill="${SCK.stone}"/><path d="M98 10h20v54H98z" fill="#D6CCB5"/>
        <path d="M98 10v-4h4v4h4v-4h4v4h4v-4h4v4z" fill="#D6CCB5"/><path d="M103 64V50q0-6 5-6t5 6v14z" fill="#3A2A1A"/>`, 1.6)
      + `<path d="M90 30h8M89 44h9M92 22h6M98 24h20M98 38h20M108 17v7M104 31v7M112 31v7" stroke="${SCK.ink}" stroke-width=".8" opacity=".45"/>`
      + `<g transform="translate(5 0)">`
      + SCH.g(`<path d="M10 57h66v5H10z" fill="#6A4226"/>
        <circle cx="18" cy="64" r="4" fill="#6A4226"/><circle cx="34" cy="64" r="4" fill="#6A4226"/><circle cx="54" cy="64" r="4" fill="#6A4226"/><circle cx="70" cy="64" r="4" fill="#6A4226"/>
        <path d="M22 42h5v15h-5zM30 42h5v15h-5zM56 42h5v15h-5zM64 42h5v15h-5z" fill="#9C6838"/>
        <path d="M18 34q-6 6-5 18l3 1q1-10 5-14z" fill="#6A4226"/>
        <path d="M66 44H24q-8 0-8-8t8-8h32l8-16 1-6 3 5h2l9 12-3 4-8-2-3 9q4 6 0 12-2 1-4 0z" fill="#B57D46"/>`, 1.8)
      + `<path d="M57 26l6-13 2 3-6 12zM61 18l2 2M59 22l2 2" fill="#6A4226" stroke="${SCK.ink}" stroke-width="1"/>`
      + `<path d="M20 33h44M18 38h44M24 28v16M40 28v16M54 28v16" stroke="${SCK.ink}" stroke-width=".9" opacity=".45"/>`
      + `<path d="M36 31h10v8H36z" fill="#8A5A34" stroke="${SCK.ink}" stroke-width="1.2"/><circle cx="72" cy="16" r="1.3" fill="${SCK.ink}"/>`
      + `<circle cx="18" cy="64" r="1.2" fill="${SCK.ink}"/><circle cx="34" cy="64" r="1.2" fill="${SCK.ink}"/><circle cx="54" cy="64" r="1.2" fill="${SCK.ink}"/><circle cx="70" cy="64" r="1.2" fill="${SCK.ink}"/></g>` },

  /* a tortoise-shell barbitos leaning on a rock above the Aegean at sunset */
  lira_lesbos: {
    label: 'Uma lira apoiada numa rocha sobre o mar Egeu, ao pôr do sol',
    rx: /\b(lira|liras|barbitos)\b/,
    draw: () => SCH.bg('#EDB47A')
      + `<path d="M0 0h120v22H0z" fill="#E59A66" opacity=".6"/>`
      + SCH.sun(64, 50, 17, '#F6D58A')
      + `<path d="M0 44q10-6 22-4t20 4H0z" fill="#7C6A55"/>`
      + `<path d="M0 50h120v30H0z" fill="#2F7C7A"/>` + SCH.waves(56, '#F2C88E', 1.2) + SCH.waves(64, '#5FA3A0', 1.4)
      + SCH.g(`<path d="M28 80q4-16 20-20 18-4 32 2 12 6 16 18z" fill="#8C7A62"/>`, 1.8)
      + `<path d="M40 70l8-4M66 66l10 4M56 74l6-2" stroke="${SCK.ink}" stroke-width=".9" opacity=".45"/>`
      + `<g transform="rotate(-14 62 62)">`
      + SCH.g(`<path d="M52 50q-7-14-6-28 1-10-6-14M72 50q7-14 6-28-1-10 6-14" fill="none" stroke="#5A3A1E" stroke-width="4.4"/>
        <path d="M52 50q-7-14-6-28 1-10-6-14M72 50q7-14 6-28-1-10 6-14" fill="none" stroke="${SCK.wood}" stroke-width="2.2" stroke-linecap="butt"/>`, 1.4)
      + SCH.g(`<path d="M42 15l40 0" stroke-width="3.4" fill="none"/><path d="M42 15h40" stroke="${SCK.goldHi}" stroke-width="1.6" fill="none"/>`, 1.4)
      + SCH.g(`<ellipse cx="62" cy="58" rx="14" ry="12" fill="${SCK.ochre}"/>`, 1.8)
      + `<path d="M56 50l6-3 6 3v7l-6 3-6-3zM56 50l-6-1M68 50l6-1M56 57l-7 3M68 57l7 3M62 60v8" fill="none" stroke="#5A3A1E" stroke-width="1.2"/>`
      + `<path d="M55 64h14" stroke="${SCK.ink}" stroke-width="2"/>`
      + `<path d="M56 15v49M60 15v49M64 15v49M68 15v49" stroke="#F4ECD8" stroke-width=".8"/>`
      + `</g>`
      + SCH.g(`<path d="M120 52q-14 2-22 16" fill="none" stroke="#5A3A1E" stroke-width="1.6"/>
        <path d="M114 53q-2-6 4-8q0 6-4 8zM108 56q-6-2-6-8q6 2 6 8zM104 61q2-6 8-6q-2 6-8 6zM100 64q-6 0-8-6q6 0 8 6z" fill="${SCK.olive}" stroke-width="1"/>
        <circle cx="111" cy="59" r="1.8" fill="#3A3A28" stroke-width=".8"/>`, 1.2) },

  /* Thermopylae: a wall of hoplites, round shields locked, between the cliff and the sea, arrows falling from the right */
  ev_guerras_persas: {
    label: 'Hoplitas gregos com escudos redondos fecham um desfiladeiro entre a montanha e o mar',
    rx: /\b(termopilas|guerras medicas|guerras greco-persas|hoplita|hoplitas)\b/,
    ev: 'guerras_persas',
    draw: () => {
      const X = [34, 52, 70, 88], S = [49, 67, 85, ...X], d = (xs, f) => xs.map(f).join('');
      const sp = d(S, x => `M${x + 8} 68 ${x + 12} 7`);
      const disc = (xs, r) => d(xs, x => `M${x - r} 50a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0-${2 * r} 0z`);
      const arrow = (x, y, a) => `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M0 0h15M11 0l3-2.6M11 0l3 2.6M13.4 0l3-2.6M13.4 0l3 2.6" stroke-width="1.1"/><path d="M0 0l4-2v4z" fill="${SCK.ink}" stroke-width=".8"/></g>`;
      return SCH.bg('#E6D8B2')
        + `<path d="M100 10q-14-8-30-2M118 22q-10-12-26-10M120 36q-8-8-18-8" fill="none" stroke="${SCK.ink}" stroke-width=".8" stroke-dasharray="2 2.4" opacity=".4"/>`
        + `<path d="M96 46h24v34H96z" fill="${SCK.sea}"/><path d="M98 54q5-3 10 0t10 0M100 62q5-3 10 0t10 0" stroke="#E4EEF0" stroke-width="1.4" fill="none"/>`
        + SCH.g(`<path d="M-2 -2h30q-6 9-1 17-7 10-2 20-6 10-3 22l4 25H-2z" fill="#8E7C60"/><path d="M0 68h104l18 8v6H0z" fill="${SCK.ochre}"/>`, 1.8)
        + `<path d="M6 12l10 4M4 30l12 2M8 48l12-2M14 22l6 6M2 58l14 2" stroke="${SCK.ink}" stroke-width="1" opacity=".4"/>`
        + SCH.g(`<path d="${sp}" stroke-width="3.6"/><path d="${sp}" stroke="${SCK.wood}" stroke-width="1.6"/><path d="${d(S, x => `M${x + 12} 1l-2 7h4z`)}" fill="#C3C8CE" stroke-width="1.2"/>
          <path d="${d(X, x => `M${x - 5} 59h3v10h-3zM${x + 2} 59h3v10h-3z`)}" fill="${SCK.gold}" stroke-width="1.4"/>
          <path d="${disc([34, 70], 10.4)}" fill="${SCK.gold}"/><path d="${disc([52, 88], 10.4)}" fill="${SCK.red}"/>
          <path d="${disc([34, 70], 7.6)}" fill="none" stroke="${SCK.goldLo}" stroke-width="2"/><path d="${disc([52, 88], 7.6)}" fill="none" stroke="${SCK.gold}" stroke-width="2"/>
          <path d="${d(X, x => `M${x - 2.4} 26q-1.4-9 2.4-12 3.8 3 2.4 12z`)}" fill="${SCK.red}"/>
          <path d="${d(X, x => `M${x - 6.4} 40v-8q0-8.6 6.4-8.6t6.4 8.6v8h-3.6l-.6-4h-4.4l-.6 4z`)}" fill="${SCK.goldLo}"/>`
          + arrow(100, 14, -24) + arrow(84, 6, -30) + arrow(110, 28, -18) + arrow(64, 2, -34), 1.6)
        + `<path d="${d(X, x => `M${x - 4.6} 30.4h9.2v2.6h-3.2v6.4h-2.8v-6.4h-3.2z`)}" fill="${SCK.ink}"/>`
        + `<path d="M74 47l7-3" stroke="${SCK.ink}" stroke-width="1.2"/><path d="M80.4 44.2l2.6-2.6M80.4 44.2l3.4.4" stroke="${SCK.ink}" stroke-width=".9"/>`;
    } },

  /* the Peloponnesian War: a crested hoplite raises his axe against the olive groves; beyond, the Long Walls run from the city down to its harbour */
  ev_peloponeso: {
    label: 'Hoplitas devastam os olivais diante das Longas Muralhas da cidade',
    rx: /\b(peloponeso|longos muros|longas muralhas)\b/,
    ev: 'peloponeso',
    draw: () => {
      const olive = (x, y) => `<path d="M${x - 2} ${y + 30}q3-8 0-14 1-4 4-6h3q-2 4 0 6 3 6 1 14z" fill="#6A4A2E"/>
        <path d="M${x - 16} ${y + 8}q-2-8 8-8 4-6 12-3 8-3 13 3 9 1 7 8 3 7-7 8-6 4-13 1-7 3-13-1-9 0-7-8z" fill="${SCK.olive}"/>`;
      const leaf = (x, y) => `<path d="M${x - 9} ${y + 4}l4-1.4M${x + 3} ${y + 1}l4-1.4M${x - 1} ${y + 9}l4-1.4M${x + 9} ${y + 8}l4-1.4M${x - 12} ${y + 10}l4-1.4" stroke="#B4C286" stroke-width="2" stroke-linecap="round"/>`;
      return SCH.bg('#C9D9D8')
        + `<path d="M84 34h36v10H84z" fill="${SCK.sea}"/><path d="M0 38q24-6 50-2t36 2V48H0z" fill="#A7AF83"/>`
        + SCH.g(`<path d="M-2 40q6-6 10-8 2-8 8-10h14q6 2 8 10 6 2 12 8z" fill="#A9A27C"/>
          <path d="M18 22v-4h12v4zM17 18l7-4 7 4z" fill="${SCK.white}" stroke-width="1"/>
          <path d="M6 33h8v-4H6zM14 33h8v-5h-8zM34 33h8v-4h-8zM24 28h8v-4h-8z" fill="${SCK.white}" stroke-width="1"/><path d="M4 34h44" stroke-width="1.4"/>
          <path d="M42 33 100 40 101 44 43 37z" fill="${SCK.stone}"/><path d="M98 37h10v4H98z" fill="${SCK.white}" stroke-width="1"/>`, 1.3)
        + `<path d="M54 34.6v2.4M66 36v2.4M78 37.4v2.4M90 38.8v2.4" stroke="${SCK.ink}" stroke-width="1"/>`
        + `<path d="M104 42.6h12M110 39h8" stroke="${SCK.ink}" stroke-width="1.8"/><path d="M105 42.6l-1 2M107.4 42.6l-1 2M109.8 42.6l-1 2M112.2 42.6l-1 2M114.6 42.6l-1 2" stroke="${SCK.ink}" stroke-width=".6"/>`
        + `<path d="M0 46h120v34H0z" fill="#C9A66B"/><path d="M4 62q8-2 16 0M96 76q8-2 16 0M40 52q8-2 16 0" stroke="${SCK.ink}" stroke-width=".8" fill="none" opacity=".4"/>`
        + SCH.g(olive(18, 44), 1.8) + leaf(18, 44)
        + `<g transform="rotate(-16 56 76)">` + SCH.g(olive(56, 46), 1.8) + leaf(56, 46) + `</g>`
        + `<path d="M55 70l6-3v6z" fill="#E9C98B" stroke="${SCK.ink}" stroke-width="1"/><path d="M62 62l3-2M63 66l4-1" stroke="${SCK.ink}" stroke-width="1.2"/>`
        + SCH.g(`<path d="M88 36q13 6 13 28l-6 2q-1-16-9-22z" fill="${SCK.burg}"/>
          <path d="M79 60l-7 15h5l7-14zM86 60l5 15h5l-5-15z" fill="${SCK.gold}" stroke-width="1.3"/><path d="M70 75h7v2.4h-8zM91 75h7l1 2.4h-8z" fill="#3A2A1A" stroke-width="1"/>
          <path d="M77 47h13l2 14H75z" fill="${SCK.red}"/><path d="M77 34h12l1 14H76z" fill="${SCK.white}"/><path d="M76 44h14" stroke-width="2.6"/>
          <path d="M88 37l3-20" stroke-width="4.4"/><path d="M88 37l3-20" stroke="#C98F62" stroke-width="2.2"/>
          <path d="M95 23 78 7.4" stroke-width="3.4"/><path d="M95 23 78 7.4" stroke="${SCK.wood}" stroke-width="1.6"/>
          <path d="M75 13.4q-4-7 2-11l3 4 4 1q-3 6-9 6z" fill="#C3C8CE" stroke-width="1.3"/>
          <path d="M77 30q-1-10 6.4-10 7.6 0 7.6 7.4V32h-3l-.6 2.4h-3.4l-.6-2.4h-3l-.6 1.6h-2.2z" fill="${SCK.goldLo}" stroke-width="1.5"/>
          <path d="M78 21q6-9 15-1-8-2-15 1z" fill="${SCK.red}" stroke-width="1.2"/>`, 1.6)
        + `<path d="M76.6 25.4h5v1.8h-2v4.8h-1.8v-4.8h-1.2z" fill="${SCK.ink}"/><path d="M89.4 16.6l2.6 2" stroke="${SCK.ink}" stroke-width="2.2"/>`
        + SCH.g(`<circle cx="106" cy="70" r="7.4" fill="${SCK.gold}"/><circle cx="106" cy="70" r="5" fill="none" stroke="${SCK.goldLo}" stroke-width="1.4"/>`, 1.6);
    } },

  /* Alexander's conquests: the Macedonian phalanx, sarissas lowered and raised, marches on the snowy mountains and palms of the East; a Companion horseman on its flank */
  ev_conquistas_alexandre: {
    label: 'Uma falange de longas lanças marchando rumo às montanhas do Oriente',
    rx: /\b(sarissa|sarissas|falange|falanges)\b/,
    ev: 'conquistas_alexandre',
    draw: () => {
      const d = (xs, f) => xs.map(f).join('');
      const rank = (xs, y, skin, tunic, shield, helm) => (skin ? `<path d="${d(xs, x => `M${x - 3} ${y - 9}l-3 9h3l2-7zM${x + 1} ${y - 9}l3 9h3l-3-9z`)}" fill="${skin}" stroke-width="1.2"/>` : '') + `<path d="${d(xs, x => `M${x - 5} ${y - 20}h10l1 11h-12z`)}" fill="${tunic}" stroke-width="1.3"/>${shield ? `<path d="${d(xs, x => `M${x - 3} ${y - 15}a6 6 0 1 0 12 0a6 6 0 1 0-12 0z`)}" fill="${shield}"/><path d="${d(xs, x => `M${x + 3} ${y - 15}h.1`)}" stroke="${SCK.goldLo}" stroke-width="4.4"/>` : ''}<path d="${d(xs, x => `M${x - 4} ${y - 20}q-1-8 4-9 6-1 8 4l-2 1q0 2-1 4z`)}" fill="${helm}" stroke-width="1.4"/>`;
      const P = [[40, 46, 72, 5], [48, 46, 82, 7], [56, 46, 92, 10], [64, 46, 102, 14], [38, 56, 104, 49], [50, 58, 108, 52], [62, 59, 112, 55]];
      const raised = P.slice(0, 4).map(([x, y, x2, y2]) => `M${x} ${y} ${x2} ${y2}`).join(''), pk = raised + P.slice(4).map(([x, y, x2, y2]) => `M${x} ${y} ${x2} ${y2}`).join('');
      const f = v => +v.toFixed(1), heads = P.map(([x, y, x2, y2]) => { const L = Math.hypot(x2 - x, y2 - y), u = (x2 - x) / L, v = (y2 - y) / L;
        return `M${f(x2 + u * 2)} ${f(y2 + v * 2)}L${f(x2 - u * 4 - v * 1.7)} ${f(y2 - v * 4 + u * 1.7)}L${f(x2 - u * 4 + v * 1.7)} ${f(y2 - v * 4 - u * 1.7)}z`; }).join('');
      return SCH.bg('#CBDCDF')
        + SCH.g(`<path d="M40 52l12-18 6 6 12-20 10 12 8-8 12 16 6-4 14 16z" fill="#7C8CA3"/><path d="M64 30l6-10 6 7-3-1-3 3-2-2zM84 26l4-4 5 7-3-1-2 2z" fill="${SCK.white}" stroke-width="1"/>`, 1.4)
        + `<path d="M0 50h120v30H0z" fill="${SCK.ochre}"/>`
        + SCH.g(`<path d="M112 64q-1-12 3-24M102 62q2-10 0-20" fill="none" stroke="#6A4A2E" stroke-width="2.6"/><path d="M115 40q-6-4-12 0 6-2 12 0zM115 40q6-5 10 0-6-2-10 0zM102 42q-6-4-10 0 5-1 10 0zM102 42q-2-6 3-8-3 4-3 8z" fill="${SCK.green}" stroke-width="1"/>`, 1.4)
        + `<g transform="translate(5 0)">` + SCH.g(`<path d="${raised}" stroke-width="2.6"/><path d="${raised}" stroke="${SCK.wood}" stroke-width="1"/>`
          + rank([40, 52, 64], 62, '', '#5A1428', '', '#8C6A2A')
          + `<path d="${pk.slice(raised.length)}" stroke-width="2.6"/><path d="${pk.slice(raised.length)}" stroke="${SCK.wood}" stroke-width="1"/>`
          + rank([34, 46, 58, 70], 72, '#C98F62', SCK.burg, SCK.gold, SCK.goldLo), 1.4)
        + SCH.g(`<path d="${heads}" fill="#C3C8CE" stroke-width="1"/>`, 1) + `</g>`
        + `<g transform="translate(0 17.8) scale(.76)">` + SCH.g(`<path d="M10 58l-2 15h3.4l2-14zM15 58l1 15h3.4l-1-15zM27 58l1 15h3.4l-1-15zM31 56l4 17h3.4l-3.4-17z" fill="#6A4226" stroke-width="1.4"/><path d="M8 52q0-5 6-5h12q3-1 5-4l4-6q2-2 4 0l3 5q1 2-1 3l-3-1-3 3q-1 6-5 10v3H12q-4 0-4-4z" fill="#8A5A34"/><path d="M8 52q-6 2-5 13h2.4q0-7 4-10zM27 47l6-9 2.4 1-5.4 9z" fill="#3A2A1A" stroke-width="1.2"/><path d="M18 46l7 1 1 11h-3l-1-8-5-1z" fill="#C98F62" stroke-width="1.3"/><path d="M17 37q-7 3-9 11l3 1q2-6 7-8zM17 47l2-11h5l1 11z" fill="${SCK.burg}" stroke-width="1.4"/><path d="M18 56 39 21" stroke-width="3.2"/><path d="M18 56 39 21" stroke="${SCK.wood}" stroke-width="1.4"/><path d="M41 17.6l-4.6 4.4 3.8 2.2z" fill="#C3C8CE" stroke-width="1"/><path d="M23 38l4 3" stroke-width="4"/><path d="M23 38l4 3" stroke="#C98F62" stroke-width="2"/><circle cx="21.6" cy="32.4" r="3.2" fill="#C98F62" stroke-width="1.2"/><path d="M17.4 31.4q0-6 4.2-6t4.2 6zM16 31.4h11.4" fill="${SCK.gold}" stroke-width="1.4"/>`, 1.8) + `</g>`;
    } },

  /* the agoge: Spartan boys drilling with small shields and short spears, a grey-bearded veteran in a crimson cloak watching, the Taygetus behind */
  agoge_esparta: {
    label: 'Meninos treinando com pequenos escudos e lanças sob o olhar de um veterano',
    rx: /\b(agoge|taigeto)\b/,
    draw: () => {
      const boy = (x, y) => `<path d="M${x - 2} ${y - 11}l-4 11M${x + 2} ${y - 11}l4 11" stroke-width="4.2" fill="none"/><path d="M${x - 2} ${y - 11}l-4 11M${x + 2} ${y - 11}l4 11" stroke="#C98F62" stroke-width="2.2" fill="none"/>
        <path d="M${x - 5} ${y - 24}h10l2 13h-14z" fill="${SCK.red}"/>
        <path d="M${x - 8} ${y - 24}l26 -14" stroke-width="2.6" fill="none"/><path d="M${x - 8} ${y - 24}l26 -14" stroke="${SCK.wood}" stroke-width="1" fill="none"/><path d="M${x + 18} ${y - 38}l-4.6 1 2 2.6z" fill="#C3C8CE" stroke-width="1"/>
        <circle cx="${x}" cy="${y - 28}" r="4.2" fill="#C98F62"/><path d="M${x - 4.2} ${y - 28}q0-5 4.2-5 4 0 4.2 4z" fill="#3A2A1A" stroke-width="1"/>
        <circle cx="${x + 5}" cy="${y - 18}" r="6.4" fill="${SCK.ochre}"/><circle cx="${x + 5}" cy="${y - 18}" r="2" fill="${SCK.goldLo}" stroke-width="1"/>`;
      return SCH.bg('#D7DDCF')
        + SCH.g(`<path d="M0 46 10 26l6 6 10-18 8 12 8-6 10 14 10-16 10 10 8-12 12 14 8-8 10 10 10-6v26z" fill="${SCK.stone}"/>`, 1.6)
        + `<path d="M26 14l-4 14 8-2zM62 18l-2 14 8-4zM80 16l2 14 6-4zM10 26l2 12 4-6" fill="${SCK.stoneLo}" opacity=".9"/>`
        + `<path d="M0 46h120v34H0z" fill="#D2B07A"/><path d="M6 76q6-3 12 0M40 78q6-3 12 0M64 52q6-3 12 0M4 54q6-3 12 0" stroke="${SCK.ink}" stroke-width=".8" fill="none" opacity=".4"/>`
        + `<ellipse cx="34" cy="73" rx="10" ry="2" fill="#E8D2A6"/><ellipse cx="62" cy="73" rx="10" ry="2" fill="#E8D2A6"/>`
        + SCH.g(boy(14, 72) + boy(36, 72) + boy(58, 72), 1.6)
        + SCH.g(`<path d="M86 74l1-48" stroke-width="3.2" fill="none"/><path d="M86 74l1-48" stroke="${SCK.wood}" stroke-width="1.4" fill="none"/>
          <path d="M94 34q-6 2-6 12l-2 28h22l-2-28q0-10-6-12z" fill="${SCK.white}"/>
          <path d="M104 36q-12 2-16 22l-1 16h9l1-12q5-8 13-12-2-10-6-14z" fill="${SCK.burg}"/>
          <path d="M89 42l-2 6 2 1 3-5z" fill="#C98F62" stroke-width="1.2"/>
          <circle cx="99" cy="28" r="5" fill="#C98F62"/><path d="M94 28q0 9 4 9 4 0 4-6-2 1-4 1-2 0-4-4z" fill="#BDB4A2"/><path d="M93.6 30q-1-8 5.4-8 6.4 0 5.4 8-1-4-1.4-5-2-1-4-1t-4 1q-.4 1-1.4 5z" fill="#BDB4A2"/>`, 1.6);
    } },

  /* a Greek physician bends over a patient on his couch; the serpent staff of Asclepius leans on a column, remedies on the shelf */
  medico_grego: {
    label: 'Um médico grego examina um paciente num leito, junto ao bastão com a serpente',
    rx: /\b(medico|medicina|juramento|asclepio)\b/,
    draw: () => SCH.bg('#E9DDBF')
      + `<path d="M0 50h120v30H0z" fill="${SCK.stone}"/><path d="M0 50h120" stroke="${SCK.burg}" stroke-width="2.4"/><path d="M0 72h120v8H0z" fill="${SCK.stoneLo}"/>`
      + SCH.g(`<path d="M66 22h50v3H66z" fill="${SCK.wood}"/>
        <path d="M72 22q-4 0-4-5t3-6v-3h2v3q3 1 3 6t-4 5z" fill="${SCK.ochre}" stroke-width="1.2"/><path d="M86 22q-6 0-6-5 0-5 6-5t6 5q0 5-6 5z" fill="#2A1D10" stroke-width="1.2"/>
        <path d="M100 22v-10q0-2 2-2h2q2 0 2 2v10z" fill="${SCK.white}" stroke-width="1.2"/><path d="M109 22q-1-6 3-8 4 2 3 8z" fill="${SCK.ochre}" stroke-width="1.2"/>
        <path d="M4 8h12v66H4z" fill="${SCK.white}"/><path d="M1 4h18v5H1zM2 72h16v4H2z" fill="${SCK.stone}"/>`, 1.6)
      + `<path d="M8 10v62M12 10v62" stroke="${SCK.ink}" stroke-width=".9" opacity=".45"/><path d="M81 15q5-2 10 0" stroke="${SCK.ochre}" stroke-width="1.2" fill="none"/>`
      + SCH.g(`<path d="M24 76 20 12" stroke-width="3.6"/><path d="M24 76 20 12" stroke="${SCK.wood}" stroke-width="1.8"/>
        <path d="M23 64q-8-4 0-10t0-12 0-12q4-3 2-8" fill="none" stroke-width="4"/><path d="M23 64q-8-4 0-10t0-12 0-12q4-3 2-8" fill="none" stroke="${SCK.green}" stroke-width="2.2"/>
        <path d="M24 22q2-4 5-2-1 3-4 2z" fill="${SCK.green}" stroke-width="1.2"/>`, 1.2)
      + SCH.g(`<path d="M30 60h60v5H30z" fill="${SCK.wood}"/><path d="M33 65l-1 10h4l1-10zM84 65l1 10h4l-1-10z" fill="${SCK.wood}"/>
        <path d="M30 60q0-12 6-12l6 1v11z" fill="${SCK.wood}"/>
        <path d="M34 60v-6q0-3 4-3h48q4 0 4 3v6z" fill="${SCK.white}"/>
        <path d="M34 52q0-4 6-4h6v6h-12z" fill="${SCK.white}"/>
        <path d="M50 51q0-6 8-6h24q8 0 8 9H50z" fill="${SCK.teal}"/>
        <circle cx="42" cy="44" r="5" fill="#C98F62"/><path d="M37 43q0-6 5-6t5 4q-3-1-5 0t-5 2z" fill="#3A2A1A" stroke-width="1"/>`, 1.6)
      + `<path d="M56 50q8-2 14 0M74 49q6-1 12 1" stroke="#7FA6A8" stroke-width="1.2" fill="none"/>`
      + SCH.g(`<path d="M100 74l-4-26q0-6 4-10l6-4q6 2 8 8l2 32z" fill="${SCK.ochre}"/>
        <path d="M100 38q-6 4-14 8l2 3q8-2 14-6z" fill="${SCK.ochre}"/><path d="M86 46l-6 3 1 2 6-2z" fill="#C98F62" stroke-width="1.2"/>
        <circle cx="98" cy="31" r="5" fill="#C98F62"/><path d="M93 32q-2 6 2 8 3 1 5-2-2-2-3-6z" fill="#3A2A1A" stroke-width="1"/><path d="M93 30q0-5 5-5 5 0 6 4-4-1-6 0t-5 1z" fill="#3A2A1A" stroke-width="1"/>
        <path d="M104 36q-6 14-4 38" fill="none" stroke-width="1.2"/>`, 1.6)
      + `<path d="M104 42l6 30M100 50l-2 22" stroke="${SCK.ink}" stroke-width=".8" opacity=".4"/>` },

  /* an open-air theatre cut into the hillside, tiers round the orchestra, two tragic masks hanging in front */
  teatro_grego: {
    label: 'Um teatro grego em semicírculo na encosta, com máscaras de tragédia sobre o palco',
    rx: /\b(teatro|teatros|tragedia|mascara|mascaras)\b/,
    draw: () => {
      let tiers = '';
      for (let r = 50, i = 0; r >= 20; r -= 5, i++) tiers += `<path d="M${60 - r} 62a${r} ${r * .9} 0 0 1 ${2 * r} 0z" fill="${i % 2 ? SCK.stone : '#DDD4BE'}"/>`;
      const mask = (x, f, h) => `<g transform="translate(${x} 26)"><path d="M0 -5v-12" stroke-width="1.2"/>
        <path d="M-9 -2q0-12 9-12t9 12q0 4-1 8-1 10-8 12h-0q-7-2-8-12-1-4-1-8z" fill="${h}"/>
        <path d="M-8 4q-1-12 8-12t8 12q-1 10-8 12-7-2-8-12z" fill="${f}"/>
        <path d="M-7 0l5-3M7 0l-5-3" fill="none" stroke-width="1.6"/><ellipse cx="-4" cy="2.6" rx="2.2" ry="1.4" fill="${SCK.ink}" stroke="none"/><ellipse cx="4" cy="2.6" rx="2.2" ry="1.4" fill="${SCK.ink}" stroke="none"/>
        <path d="M-3.4 12.6q3.4-5 6.8 0q-3.4 1.6-6.8 0z" fill="${SCK.ink}" stroke-width="1"/></g>`;
      return SCH.bg(SCK.sky)
        + `<path d="M0 34q20-14 40-16 20-6 40 0 20 2 40 16v30H0z" fill="${SCK.green}"/><path d="M4 30q10-4 18-4M96 26q10 2 18 6" stroke="${SCK.olive}" stroke-width="1.4" fill="none"/>`
        + `<path d="M0 60h120v20H0z" fill="#B9A06A"/>` + SCH.g(tiers, 1.2)
        + `<path d="M60 62 25 29M60 62 41 20M60 62 60 17M60 62 79 20M60 62 95 29" stroke="${SCK.ink}" stroke-width="1.6" opacity=".5"/>`
        + SCH.g(`<ellipse cx="60" cy="63" rx="20" ry="6" fill="${SCK.sand}"/><circle cx="60" cy="63" r="1.6" fill="${SCK.ink}"/>
          <path d="M20 70h80v10H20z" fill="${SCK.ochre}"/><path d="M28 70v-4h64v4z" fill="${SCK.stoneLo}"/>
          <path d="M42 80v-6h6v6zM57 80v-7h6v7zM72 80v-6h6v6z" fill="#4A3523"/>`, 1.6)
        + `<path d="M0 3q30 6 60 2t60-2" stroke="${SCK.wood}" stroke-width="1.6" fill="none"/>`
        + SCH.g(mask(17, SCK.white, '#3A2A1A') + mask(103, '#C9A66B', SCK.burg), 1.6);
    } },

  /* a lone runner in a short chiton on the dusty hill road, olive trees, a walled city far off under the noon sun */
  mensageiro_maratona: {
    label: 'Um mensageiro grego correndo pelas colinas rumo a uma cidade distante',
    rx: /\b(corredor|corrida|mensageiro|fidipides)\b/,
    draw: () => {
      const limb = d => `<path d="${d}" fill="none" stroke-width="5"/><path d="${d}" fill="none" stroke="#C98F62" stroke-width="2.8"/>`;
      return SCH.bg('#D3E2E2') + SCH.sun(74, 10, 6, '#F6E7B4')
        + `<path d="M0 40q30-8 60-4t60-2v10H0z" fill="#B7B48A"/>`
        + SCH.g(`<path d="M92 38v-8h22v8z" fill="${SCK.stone}"/><path d="M94 30v-3h3v3h3v-3h3v3h3v-3h3v3h3v-3h2v3z" fill="${SCK.stone}"/><path d="M100 26v-6h8v6zM99 20l5-3 5 3z" fill="${SCK.white}"/>`, 1.1)
        + `<path d="M0 46q40-12 120-6v40H0z" fill="${SCK.sand}"/><path d="M0 56q50-14 120-10v34H0z" fill="${SCK.ochre}"/>`
        + `<path d="M104 41q-20 6-40 12T0 76v4h34q10-10 30-18t40-21z" fill="#EBD5A4"/>`
        + SCH.g(`<path d="M18 50v-6M10 44q-2-6 4-7 2-5 8-3 6-1 6 5 4 4-2 6-4 2-8 0-4 2-8-1z" fill="${SCK.olive}" stroke-width="1.3"/>
          <path d="M84 47v-4M78 43q-1-4 3-5 2-3 6-1 4 0 3 4 2 3-2 4-6 1-10-2z" fill="${SCK.olive}" stroke-width="1.1"/>`, 1.3)
        + `<circle cx="22" cy="70" r="3.4" fill="#F4E6C4"/><circle cx="16" cy="71" r="2.6" fill="#F4E6C4"/><circle cx="11" cy="72" r="1.8" fill="#F4E6C4"/>`
        + `<g transform="translate(50 44)">` + SCH.g(limb('M-1 2 -8 10-20 7') + limb('M2 -16-8 -10-11 -16')
          + `<path d="M-3 -20q4-3 9 0l3 14q2 4 0 8l-12 3-5-4z" fill="${SCK.white}"/><path d="M-6 -2l13-4" stroke-width="1.4"/>`
          + limb('M3 4 12 13l-2 13 4 1') + limb('M4 -17 13 -9 18 -15')
          + `<circle cx="5" cy="-27" r="5" fill="#C98F62"/><path d="M0 -27q0-6 6-6 5 0 4 3-4 0-5 3t-5 0z" fill="#3A2A1A" stroke-width="1.1"/>`, 1.5) + `</g>`;
    } },

  /* the stadium of the ancient games: a long earth track between grassy banks, the stone starting line, the vaulted tunnel at the far end */
  estadio_olimpia: {
    label: 'Corredores no estádio de terra dos jogos antigos, vistos de longe',
    rx: /\b(estadio|corrida|corredores|atletas|pista)\b/,
    draw: () => {
      const run = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${SCK.ink}"><circle cx="1" cy="-9" r="1.7"/><path d="M-1 -7h3l1 5 3 3-1 1-3-2-2 2 1 4h-2l-1-5 1-3-2 1-2 2-1-1 3-3z"/></g>`;
      return SCH.bg(SCK.sky) + `<path d="M0 22q30-4 60-2t60 2v8H0z" fill="#9DB08A"/>`
        + SCH.g(`<path d="M0 30l48-4v6L0 80z" fill="${SCK.green}"/><path d="M120 30l-48-4v6l48 48z" fill="${SCK.green}"/>
          <path d="M48 32h24l48 48H0z" fill="#D9B577"/>`, 1.6)
        + `<path d="M8 50l40-16M112 50 72 34" stroke="#8FAA74" stroke-width="2" fill="none"/><path d="M12 62 46 38M108 62 74 38" stroke="#4E6B40" stroke-width="1.2" opacity=".6" fill="none"/>`
        + SCH.g(`<path d="M50 32v-12h20v12z" fill="${SCK.stone}"/><path d="M54 32v-6q0-4 6-4t6 4v6z" fill="#2A1D10"/><path d="M48 20h24v-3H48z" fill="${SCK.stoneLo}"/>`, 1.4)
        + `<path d="M56 24q4-3 8 0" stroke="${SCK.white}" stroke-width=".8" fill="none" opacity=".6"/>`
        + `<path d="M54 32 34 80M66 32 86 80M60 32v48" stroke="#B8955C" stroke-width="1" opacity=".7"/>`
        + run(56, 42, .9) + run(62, 41, .8) + run(51, 47, 1.1) + run(67, 46, 1)
        + SCH.g(`<path d="M10 66h100l4 6H6z" fill="${SCK.white}"/>`, 1.4)
        + `<path d="M12 69h96" stroke="${SCK.ink}" stroke-width="1"/><path d="M30 66v6M50 66v6M70 66v6M90 66v6" stroke="${SCK.ink}" stroke-width="2"/>`;
    } },

  /* Delphi: in the dim temple the priestess, veiled in white over a dark red chiton, sits on the tall bronze tripod, a laurel sprig in hand, vapours rising from the cleft */
  oraculo_delfos: {
    label: 'A sacerdotisa sentada na trípode, envolta em vapores, no templo do oráculo',
    rx: /\b(oraculo|pitia|tripode|sacerdotisa)\b/,
    draw: () => SCH.bg('#25333F') + `<ellipse cx="60" cy="36" rx="40" ry="34" fill="#34495A"/>`
      + `<path d="M0 68h120v12H0z" fill="#1C2630"/><path d="M36 73l8-2 6 3 8-3 6 3 8-2 8 2" stroke="#0B1015" stroke-width="2.2" fill="none"/>`
      + SCH.g(`<path d="M0 0h120v5H0z" fill="${SCK.stoneLo}"/><path d="M4 5h14v64H4zM102 5h14v64h-14z" fill="${SCK.stone}"/><path d="M2 66h18v4H2zM100 66h18v4h-18z" fill="${SCK.stoneLo}"/>`, 1.6)
      + `<path d="M8 6v60M12 6v60M106 6v60M110 6v60" stroke="${SCK.ink}" stroke-width=".9" opacity=".5"/>`
      + `<path d="M46 72q-8-8 0-14t-2-14q-4-6 2-12M76 72q8-8 0-16t4-14q4-6-2-12M60 72q-6-6 2-12" stroke="#CFE0E4" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".55"/>`
      + SCH.g(`<path d="M51 48l-7 22M69 48l7 22M60 50v20M44.4 39.6a3.4 3.4 0 1 1 0-6.8M75.6 39.6a3.4 3.4 0 1 0 0-6.8" fill="none" stroke-width="3.8"/>`, 1)
      + `<path d="M51 48l-7 22M69 48l7 22M60 50v20M44.4 39.6a3.4 3.4 0 1 1 0-6.8M75.6 39.6a3.4 3.4 0 1 0 0-6.8" fill="none" stroke="${SCK.gold}" stroke-width="1.8"/>`
      + SCH.g(`<path d="M41 40h38q-1 11-19 11t-19-11z" fill="${SCK.gold}"/>`, 1.6) + `<path d="M45 43.6q15 4 30 0" stroke="${SCK.goldLo}" stroke-width="1.2" fill="none"/>`
      + SCH.g(`<path d="M58 21q6 0 7 6l1 9 11 1q2.4 1 1.6 4.4l-1.2 12.6h-6V43l-15.4-1z" fill="${SCK.burg}"/><path d="M71.4 54h6l2.6 2.6h-8.6z" fill="#C98F62" stroke-width="1.2"/>
        <path d="M62 10q4.4 0 4.6 4l1.8 2.6-1.6.6q.2 2.2-1.8 2.8L62 21z" fill="#C98F62" stroke-width="1.3"/>
        <path d="M66.4 9.6Q60 4.4 53.4 8 49 12 48.6 22 48 32 48.4 42H57q-2-10 0-16 2-4 5-5v-8q1.4-2.6 4.4-3.4z" fill="${SCK.white}"/>
        <path d="M71 28q4-10 8-21" fill="none" stroke="#5A3A1E" stroke-width="1.4"/>
        <path d="M63 32l8-4" stroke-width="4.2"/><path d="M63 32l8-4" stroke="#C98F62" stroke-width="2"/>
        <path d="M73 22q-5-1-6 2 4 1 6-2zM75 17q5-2 6 1-4 1.4-6-1zM76 13q-5-2-6 1 4 1.4 6-1zM78 9q4-3 6-1-2 3-6 1zM79 7q-1-5 1-6 2 2-1 6z" fill="${SCK.green}" stroke-width=".9"/>`, 1.5)
      + `<path d="M52 14q-3 10-2 26M55 26q-1 8 0 14M66 41l10 .6" stroke="${SCK.ink}" stroke-width=".9" fill="none" opacity=".45"/>` },

  /* Knossos: the red Minoan columns, wider at the top, the charging-bull fresco behind them, horns of consecration on the roof */
  knossos: {
    label: 'O palácio de Cnossos com colunas vermelhas e um afresco de touro',
    rx: /\b(cnossos|creta|touro|touros|minotauro|labirinto)\b/,
    draw: () => {
      const col = x => `<path d="M${x - 5.4} 34h10.8l-2.4 30h-6z" fill="${SCK.red}"/><path d="M${x - 7} 28.6h14v5.4H${x - 7}z" fill="${SCK.ink}"/><path d="M${x - 6} 64h12v3H${x - 6}z" fill="${SCK.ink}"/>`;
      const horns = x => `<path d="M${x - 7} 14v-6l2.4 2.4q4.6 3 9.2 0l2.4-2.4v6z" fill="${SCK.white}"/>`;
      return SCH.bg(SCK.sky)
        + `<path d="M0 26q20-10 40-6t40-4 40 4v20H0z" fill="${SCK.olive}"/>`
        + SCH.g(`<path d="M4 14h112v15H4z" fill="${SCK.ochre}"/>` + [18, 46, 74, 102].map(horns).join('')
          + `<path d="M8 34h104v34H8z" fill="#E4D2A8"/><path d="M27 36h66v27H27z" fill="#6FA3BE"/>`, 1.6)
        + `<path d="M4 18.4h112" stroke="${SCK.red}" stroke-width="2.6"/><path d="M4 25h112" stroke="${SCK.ink}" stroke-width="2.4" stroke-dasharray="3 3"/>`
        + `<path d="M27 59q4-3 8 0t8 0 8 0 8 0 8 0 8 0 8 0 8 0" stroke="${SCK.white}" stroke-width="1.4" fill="none"/>`
        + SCH.g(`<path d="M41 44q-5-3-6-9" fill="none" stroke-width="1.4"/>
          <path d="M70 52l14 4-1 2.4-15-3zM66 53l12 7-1.6 2-12-6zM48 51l-14 3 .6 2.4 14-2zM52 52l-11 7 1.6 1.8 11-6z" fill="#8E3A20" stroke-width="1.2"/>
          <path d="M40 47q0-9 12-9h12q4-3 9-1 6 2 9 4l5 2 2 6-4 2-6-1q-3 4-8 5H52q-12 0-12-8z" fill="#B5502E" stroke-width="1.4"/>
          <path d="M78 40q-2-7 3-11 0 6 1 10zM82 41q3-7 9-7-3 4-6 8z" fill="${SCK.white}" stroke-width="1.1"/>`, 1.3)
        + `<circle cx="82" cy="44" r="1" fill="${SCK.ink}"/><path d="M52 43q8 2 16 0M66 41q2 5 0 12" stroke="#D97A50" stroke-width="1.4" fill="none"/>`
        + `<path d="M0 67h120v13H0z" fill="#CDB485"/><path d="M0 72h120" stroke="${SCK.ink}" stroke-width="1" opacity=".4"/>`
        + SCH.g([17, 103].map(col).join(''), 1.4);
    } },

  /* Alexandria: shelves of scrolls in a colonnaded hall, a scroll open on the table; through the doorway the Pharos on its promontory */
  biblioteca_alexandria: {
    label: 'Uma sala de colunas com estantes de rolos e, pela porta, um farol à beira-mar',
    rx: /\b(alexandria|biblioteca|farol|rolos)\b/,
    draw: () => {
      let ends = '';
      for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) for (let k = 0; k < 3; k++)
        ends += `<circle cx="${(8.4 + c * 12 + k * 3.6).toFixed(1)}" cy="${(18 + r * 12 - (k % 2) * 2.8).toFixed(1)}" r="1.9"/>`;
      return SCH.bg('#E4D6B4') + `<path d="M0 66h120v14H0z" fill="${SCK.stone}"/><path d="M0 72h120" stroke="${SCK.ink}" stroke-width=".8" opacity=".35"/>`
        + SCH.g(`<path d="M68 8h44v58H68z" fill="${SCK.sky}"/><path d="M68 44h44v22H68z" fill="${SCK.sea}"/><path d="M84 66q4-10 14-12 8 0 14 4v8z" fill="${SCK.ochre}"/>
          <path d="M92 54l2-10h8l2 10zM93.6 44l1-10h6.8l1 10zM95.6 34v-8h4.8v8z" fill="${SCK.white}" stroke-width="1.2"/><path d="M91 44h14M93 34h10M95 26h6" stroke-width="1.4"/><path d="M98 26v-4" stroke-width="1.6"/>`, 1.3)
        + `<path d="M72 54q4-2 8 0M74 60q4-2 8 0" stroke="#E4EEF0" stroke-width="1.2" fill="none"/>`
        + SCH.g(`<path d="M62 4h56v6H62z" fill="${SCK.stoneLo}"/><path d="M64 10h6v56h-6zM110 10h6v56h-6z" fill="${SCK.white}"/>
          <path d="M3 8h52v54H3z" fill="${SCK.wood}"/><path d="M6 11h46v48H6z" fill="#4A3020"/><path d="M6 23h46M6 35h46M6 47h46M17.5 11v48M29 11v48M40.5 11v48" stroke="${SCK.wood}" stroke-width="2.2"/>`, 1.6)
        + `<g fill="${SCK.parch}" stroke="${SCK.ink}" stroke-width=".8">${ends}</g>`
        + SCH.g(`<path d="M20 60h70v4H20z" fill="${SCK.wood}"/><path d="M26 64h4v12h-4zM80 64h4v12h-4z" fill="${SCK.wood}"/>
          <path d="M38 58h34v3H38z" fill="${SCK.white}" stroke-width="1.2"/><path d="M36 56h4v6h-4zM70 56h4v6h-4z" fill="${SCK.parch}" stroke-width="1.2"/>`, 1.6)
        + `<path d="M43 59.4h22" stroke="${SCK.ink}" stroke-width=".8" stroke-dasharray="2 1.4" opacity=".6"/>`;
    } },

  /* Croton: a broad-bean pod split open on the headland, the bean plants in flower behind it, the archaic Doric temple of Hera on the cape over the Ionian sea */
  favas_crotona: {
    label: 'Um campo de favas em flor num promontório sobre o mar, com um templo dórico no cabo',
    rx: /\b(fava|favas|crotona|templo dorico)\b/,
    draw: () => {
      const lv = [[-54, 7, 3.5, 5.7], [-44, 9, 4.5, 6.6], [-32, 10, 5, 7], [-20, 10, 5, 7]].map(([y, l, a, b]) => `M0 ${y}q-${a}-${b}-${l}-5q${a} ${b} ${l} 5zM0 ${y}q${a}-${b} ${l}-5q-${a} ${b}-${l} 5z`).join('');
      const fw = [[-1, -50, -1], [1, -52, 1], [1, -39, 1], [-1, -29, -1]];
      const plant = (x, s) => `<g transform="translate(${x} 76) scale(${s})"><path d="M0 0V-58" stroke-width="4.6"/><path d="M0 0V-58" stroke="#4E7A38" stroke-width="2.4"/>
        <path d="${lv}" fill="#7E9C76" stroke-width="1.1"/><path d="M1-14q9 1 9 12 0 5-3 5-3 0-4-6zM-1-27q-8 1-9 11 0 5 3 5 3 0 4-6z" fill="#8DB255" stroke-width="1.2"/>
        <path d="${fw.map(([x, y, d]) => `M${x} ${y}q${d}-4.4 ${4.6 * d}-3.4q${d} 2.8 ${-1.6 * d} 4.4z`).join('')}" fill="${SCK.white}"/><path d="${fw.map(([x, y, d]) => `M${x} ${y}l${2.6 * d}-2v2.6z`).join('')}" fill="${SCK.ink}" stroke="none"/></g>`;
      return SCH.bg('#CFE0E4')
        + `<path d="M0 28h120v52H0z" fill="#2E5A7E"/>` + SCH.waves(36, '#5E88A8', 1.2)
        + SCH.g(`<path d="M58 50q4-10 14-14 20-4 50-4v26H58z" fill="#A68A58"/><path d="M66 38q20-6 56-6v4q-30 0-56 4z" fill="${SCK.green}"/>`, 1.6)
        + SCH.g(`<path d="M80 30l2-3.6h28l2 3.6zM82 26.4l14-7 14 7zM80 37h32v3H80z" fill="${SCK.ochre}"/><path d="M83 30h4v7h-4zM90 30h4v7h-4zM97 30h4v7h-4zM104 30h4v7h-4z" fill="#E2C890"/>`, 1.2)
        + `<path d="M0 54q46-10 84 4l10 22H0z" fill="#8FA45E"/>`
        + SCH.g(plant(15, 1.2) + plant(42, .9), 1.2)
        + `<g transform="translate(64 69) rotate(-10)">` + SCH.g(`<path d="M-34-3q-5-1-7-6" fill="none" stroke-width="2.4"/><path d="M-34-3q-5-1-7-6" fill="none" stroke="#4E7A38" stroke-width="1"/>
          <path d="M-35-3q2-5 8-5h54q7 0 8 5-4 13-35 13t-35-13z" fill="#6E9A3E"/><path d="M-29-3h58q-4 9-29 9t-29-9z" fill="#EFEBCB" stroke-width="1.1"/>
          <path d="M-25-2.4a6 4.4 0 1 0 12 0a6 4.4 0 1 0-12 0zM-12.4-2.4a6 4.4 0 1 0 12 0a6 4.4 0 1 0-12 0zM.4-2.4a6 4.4 0 1 0 12 0a6 4.4 0 1 0-12 0zM13-2.4a6 4.4 0 1 0 12 0a6 4.4 0 1 0-12 0z" fill="#C3D67E"/>`, 1.5)
        + `<path d="M-21.6-6q2.6-1.6 5.2 0M-9-6q2.6-1.6 5.2 0M3.8-6q2.6-1.6 5.2 0M16.4-6q2.6-1.6 5.2 0" stroke="${SCK.ink}" stroke-width="1.6" fill="none"/></g>`;
    } },
});
