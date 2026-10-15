/* Letras e música — the scenes of the writers and composers: their playhouses, organs, stages and pianos, the streets and shores of their books (conventions in _core.js) */
Object.assign(SCENE, {
  /* the Globe on Bankside: the round playhouse of whitewash and oak posts under its ring of thatch, the stage hut and its pennant rising inside, a wherry and a barge on the Thames */
  teatro_globe: {
    label: 'Um teatro redondo de madeira com telhado de palha e bandeirola, à beira do rio',
    rx: /\b(globe|teatro|teatros)\b/,
    draw: () => {
      const K = SCK.ink, T = '#5A3A22', f = n => n.toFixed(1);
      let posts = '', thatch = '';
      for (let a = -81; a <= 81; a += 18) {
        const t = a * Math.PI / 180, x = f(60 + 34 * Math.sin(t)), c = 8 * Math.cos(t);
        posts += `M${x} ${f(30 + c)}V${f(58 + c)}`;
      }
      for (let a = 4; a < 360; a += 11) {
        const t = a * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
        thatch += `M${f(60 + 35 * c)} ${f(29.4 + 9 * s)}L${f(60 + 28 * c)} ${f(26.2 + 6.6 * s)}`;
      }
      return SCH.bg(SCK.sky) + `<ellipse cx="22" cy="12" rx="13" ry="2.6" fill="${SCK.white}" opacity=".8"/><ellipse cx="100" cy="18" rx="10" ry="2" fill="${SCK.white}" opacity=".7"/>`
        + `<path d="M0 50q10-6 20-3 8-8 18-2l44 0q10-7 20 0 8-5 18 1v20H0z" fill="#58784A"/>`
        + `<path d="M0 56h120v12H0z" fill="${SCK.green}"/>`
        + `<path d="M0 66h120v14H0z" fill="${SCK.sea}"/>` + SCH.waves(72, '#86A8BC', 1.1) + SCH.waves(78, '#86A8BC', 1)
        + `<path d="M0 66h120" stroke="${T}" stroke-width="1.6"/>`
        + SCH.g(`<path d="M26 30A34 8 0 0 0 94 30V58A34 8 0 0 1 26 58Z" fill="${SCK.white}"/>`, 1.8)
        + `<path d="M26 39.4A34 8 0 0 0 94 39.4M26 48.8A34 8 0 0 0 94 48.8" fill="none" stroke="${T}" stroke-width="1.5"/>`
        + `<path d="${posts}" stroke="${T}" stroke-width="1.7"/>`
        + `<path d="M45.5 39.6l9.5 2.2M65 41.8l9.5-2.2M37.4 46.6l8.1 2.6M74.5 49.2l8.1-2.6M55 51.2l10 0" stroke="${T}" stroke-width="1" opacity=".7"/>`
        + SCH.g(`<path d="M57.4 66v-5.4a2.6 2.6 0 0 1 5.2 0V66z" fill="${T}" stroke-width="1.2"/>`, 1)
        + SCH.g(`<ellipse cx="60" cy="29" rx="37" ry="9.8" fill="#D2AA5E"/><ellipse cx="60" cy="25.6" rx="23" ry="5.2" fill="#6B4A2E" stroke-width="1.3"/>`, 1.8)
        + `<path d="${thatch}" stroke="#94703A" stroke-width=".8" opacity=".7"/>`
        + `<path d="M38 24.4A23 5.2 0 0 1 82 24.4L80 26.4A21 3.6 0 0 0 40 26.4Z" fill="${SCK.white}" opacity=".9"/>`
        + SCH.g(`<path d="M51 25.6V15.4h18v10.2z" fill="${SCK.white}"/><path d="M48.6 16 60 8.6 71.4 16z" fill="#B0703C"/><path d="M60 8.6V1.4" fill="none" stroke-width="1.3"/><path d="M60.6 1.6 75 4 60.6 6.4z" fill="${SCK.red}" stroke-width="1.1"/>`, 1.5)
        + `<path d="M55.4 15.6v10M64.6 15.6v10M51 20.4h18" stroke="${T}" stroke-width="1.1"/>`
        + SCH.g(`<path d="M12 71h28q-3 4.4-9 4.4H18q-4 0-6-4.4z" fill="${SCK.wood}"/><path d="M20 69l-6 8M32 69l6 8" fill="none" stroke-width="1.2"/>
          <path d="M84 72h28l-3 4H87z" fill="#6B4426"/><path d="M97 72V54" fill="none" stroke-width="1.3"/><path d="M97.6 55q6 1 9 2l1.4 13H97.6z" fill="#B0703C" stroke-width="1.2"/>`, 1.3);
    } },

  /* La Mancha: white conical windmills on a dry ridge, their lattice sails spread, and in the stubble a fallen lance and a dented brass barber's basin */
  moinhos_mancha: {
    label: 'Moinhos de vento brancos numa planície seca, com uma lança caída',
    rx: /\b(moinho|moinhos|la mancha)\b/,
    draw: () => {
      const K = SCK.ink;
      const S = SCH.uid('ws'), L = SCH.uid('wl'), T = SCH.uid('wt');
      const mill = (x, y, s, r0, lite) => `<g transform="translate(${x} ${y}) scale(${s})">` + SCH.g(`<use href="#${T}"/>`
        + [0, 90, 180, 270].map(r => `<use href="#${lite ? L : S}" transform="translate(0 -24) rotate(${r0 + r})"/>`).join('')
        + `<circle cy="-24" r="2" fill="${SCK.wood}" stroke-width="1"/>`, 1.4) + `</g>`;
      return SCH.bg('#C3D7DE') + `<defs><path id="${S}" d="M2 0H22M5.6-.6h16v-5.6h-16zM9.6-.6v-5.6M13.6-.6v-5.6M17.6-.6v-5.6M5.6-3.4h16" fill="${SCK.paper}" stroke-width="1"/><path id="${L}" d="M2 0H22M5.6-.6h16v-5.6h-16z" fill="${SCK.paper}" stroke-width="1.6"/>
        <g id="${T}"><path d="M-8 0-6.4-22h12.8L8 0z" fill="${SCK.white}"/><path d="M2.6 0 3.4-22h3L8 0z" fill="${SCK.stone}" stroke="none"/><path d="M-2.4 0v-5.4a2.4 2.4 0 0 1 4.8 0V0z" fill="#4A3A2C" stroke-width="1"/><path d="M-7.6-21.4Q-3-33 0-33.6 3-33 7.6-21.4z" fill="#5E5348"/></g></defs>`
        + `<ellipse cx="22" cy="14" rx="15" ry="3" fill="${SCK.white}" opacity=".85"/><ellipse cx="104" cy="8" rx="11" ry="2.4" fill="${SCK.white}" opacity=".75"/>`
        + `<path d="M0 50q30-4 60-2t60-1v33H0z" fill="#DCC48E"/>`
        + mill(106, 51, .5, 15, 1)
        + `<path d="M0 60C18 50 40 46 66 46S106 52 120 56v24H0z" fill="#CBA868"/>`
        + mill(30, 55, .7, 40) + mill(70, 50, 1.1, 30)
        + `<path d="M0 66Q60 59 120 66v14H0z" fill="${SCK.ochre}"/>`
        + `<path d="M4 70l1-4M8 71l-1-4M30 64l1-3M44 66l-1-4M80 64l1-4M84 65l2-3M112 68l-1-4M116 69l1-3M24 78l1-4M100 78l1-3" stroke="${SCK.olive}" stroke-width="1.2" stroke-linecap="round"/>`
        + `<path d="M4 77.6 68 64.6" stroke="${K}" stroke-width="3.8" stroke-linecap="round"/><path d="M4 77.6 68 64.6" stroke="${SCK.wood}" stroke-width="2"/>`
        + SCH.g(`<path d="M67 63.2 77.6 62.6 68.6 67z" fill="#C3C8CE"/>`, 1.2)
        + SCH.g(`<path d="M85.4 70q1 7.6 9 7.6t9-7.6z" fill="${SCK.goldLo}"/><ellipse cx="94.4" cy="69.6" rx="14.6" ry="5.4" fill="${SCK.gold}"/><ellipse cx="94.4" cy="70.2" rx="8.6" ry="3.2" fill="${SCK.goldHi}" stroke-width="1.1"/>`, 1.5)
        + `<path d="M86.4 69.8q8-3.6 16 0-8-1.6-16 0z" fill="${SCK.goldLo}" opacity=".8"/>`
        + `<path d="M90.4 63.4h8v1.2a4 3 0 0 1-8 0z" fill="${SCK.ochre}"/><path d="M90.6 64.4a3.8 3 0 0 0 7.6 0" fill="none" stroke="${K}" stroke-width="1.2"/>`
        + `<path d="M103.4 66.6l1.4 2.4-1.6 1.6" stroke="${SCK.goldLo}" stroke-width="1.1" fill="none"/>`;
    } },

  /* a Baroque church organ: towers of silver pipes in a dark case with gilded cornices and carving, the console with its two keyboards and a manuscript on the rack, light falling from a tall window */
  orgao_bach: {
    label: 'Um grande órgão de tubos numa igreja barroca',
    rx: /\b(orgao|tubos)\b/,
    draw: () => {
      const K = SCK.ink;
      let pipes = '', mouths = '';
      const field = (x0, n, w, top, slope, bot) => { for (let i = 0; i < n; i++) {
        const x = x0 + i * (w + .8), t = top + slope * i, c = x + w / 2;
        pipes += `M${x.toFixed(1)} ${t.toFixed(1)}h${w}V${bot}l${(-w / 2 + .6).toFixed(1)} 4.6h-1.2z`;
        mouths += `M${(x + .7).toFixed(1)} ${bot - 2}h${(w - 1.4).toFixed(1)}l${(-w / 2 + .7).toFixed(1)}-2.4z`; } };
      field(35, 3, 2.6, 19, 0, 44); field(45.4, 4, 2.4, 30, -1.4, 46); field(57.4, 6, 3, 13, 0, 43); field(80.4, 4, 2.4, 25.8, 1.4, 46); field(92.4, 3, 2.6, 19, 0, 44);
      return SCH.bg(SCK.stone) + `<path d="M0 6h120M28 0v70M110 0v70" stroke="${SCK.stoneLo}" stroke-width="1.4"/>`
        + SCH.g(`<path d="M5 58V17a8 8 0 0 1 16 0v41z" fill="#E4ECEC"/>`, 1.6)
        + `<path d="M13 9v49M5 22h16M5 34h16M5 46h16" stroke="${SCK.stoneLo}" stroke-width="1"/>`
        + `<path d="M0 70h120v10H0z" fill="${SCK.stoneLo}"/><path d="M0 75h120M10 70l-6 10M30 70l-6 10M50 70l-6 10M70 70l-6 10M90 70l-6 10M110 70l-6 10" stroke="${K}" stroke-width=".7" opacity=".35"/>`
        + SCH.g(`<path d="M32 62V16h12v8h12V10h24v14h12v-8h12v46z" fill="#4A2E18"/>`, 1.8)
        + SCH.g(`<path d="${pipes}" fill="#D3D7D6"/>`, 1)
        + `<path d="${mouths}" fill="${K}"/>`
        + SCH.g(`<path d="M31 14h14v3.4H31zM91 14h14v3.4H91zM55 8h26v3.4H55zM43 22h14v2.6H43zM79 22h14v2.6H79z" fill="${SCK.gold}"/>
          <path d="M34 14q4-6 4-10 0 4 4 10zM94 14q4-6 4-10 0 4 4 10z" fill="${SCK.gold}" stroke-width="1"/>
          <path d="M60 8q2-5 8-6.4 6 1.4 8 6.4z" fill="${SCK.gold}" stroke-width="1"/>
          <path d="M32 24C24 26 22 33 26.4 38.6 29 42 26.6 47 24 50l8 4zM104 24c8 2 10 9 5.6 14.6-2.6 3.4-.2 8.4 2.4 11.4l-8 4z" fill="${SCK.gold}" stroke-width="1.1"/>`, 1.2)
        + `<path d="M68 2.6v4M66 4.6h4" stroke="${SCK.goldLo}" stroke-width="1"/>`
        + SCH.g(`<path d="M46 52h44v18H46z" fill="#6B4226"/><path d="M50 57h36v3.4H50zM50 62.6h36v3.4H50z" fill="${SCK.white}" stroke-width="1"/>
          <path d="M58 45h20l-2 8H60z" fill="${SCK.paper}" stroke-width="1.1"/>`, 1.5)
        + `<path d="M53 57v2M56 57v2M60 57v2M63 57v2M66 57v2M70 57v2M73 57v2M76 57v2M80 57v2M83 57v2M53 62.6v2M56 62.6v2M60 62.6v2M63 62.6v2M66 62.6v2M70 62.6v2M73 62.6v2M76 62.6v2M80 62.6v2M83 62.6v2" stroke="${K}" stroke-width="1.4"/>`
        + `<path d="M60.4 47.4h15.2M60.2 49.4h15.6M60 51.4h16" stroke="${K}" stroke-width=".5" opacity=".7"/><path d="M63 47.4v2M67 49.4v2M71 47.4v2" stroke="${K}" stroke-width="1.2" opacity=".8"/>`
        + `<path d="M21 18 21 58 74 80H98Z" fill="${SCK.goldHi}" opacity=".18"/>`;
    } },
  /* an opera house stage between red curtains and gilded boxes: the painted backdrop of a moonlit lake with a castle on its hill, an arch of stars across the night, footlights along the empty boards */
  palco_luar: {
    label: 'Um palco de teatro com cortinas vermelhas e um cenário de lago ao luar sob um arco de estrelas',
    rx: /\b(palco|opera|bale|cenario)\b/,
    draw: () => {
      const K = SCK.ink, f = n => n.toFixed(1);
      const st = SCH.uid('st'); let stars = '', lights = '', glow = '';
      for (let a = 192; a <= 348; a += 15.6) { const t = a * Math.PI / 180; stars += `<use href="#${st}" x="${f(60 + 37 * Math.cos(t))}" y="${f(50 + 34 * Math.sin(t))}"/>`; }
      for (let x = 18; x <= 102; x += 12) { lights += `M${x - 2.4} 71a2.4 2 0 0 1 4.8 0z`; glow += `<circle cx="${x}" cy="70" r="4" fill="${SCK.goldHi}" opacity=".3"/>`; }
      const drape = `<path d="M12 3H34C31 18 26 30 21 40C25 47 23 56 25 64H12Z" fill="${SCK.red}"/>`;
      return SCH.bg('#3A1418')
        + `<defs>${SCH.star(0, 0, 2.4, SCK.goldHi).replace('<path', `<path id="${st}"`)}</defs><path d="M14 8h92v56H14z" fill="${SCK.night}"/>` + stars
        + `<circle cx="60" cy="30" r="6.4" fill="${SCK.goldHi}"/><circle cx="62.8" cy="28.4" r="5.6" fill="${SCK.night}"/>`
        + `<path d="M14 50q10-6 22-2 14-2 30 0l40 1v15H14z" fill="#22304A"/>`
        + `<path d="M14 52q24-3 46-2t46 1v13H14z" fill="#466892"/>`
        + `<path d="M54 54h12M56 57h8M57.4 60h5.2" stroke="${SCK.goldHi}" stroke-width="1.2" stroke-linecap="round" opacity=".9"/>`
        + `<path d="M76 51q8-12 18-12 8 0 12 6v6z" fill="#1B2438"/>`
        + `<path d="M84 41v-7h2v-3l1.6-3.4 1.6 3.4v3h2v-4l2-4 2 4v4h2v7h2v-6l1.6-3 1.6 3v6z" fill="#1B2438" stroke="#0F1626" stroke-width=".8"/>`
        + `<path d="M93.4 33.6h.1M88.2 35.6h.1" stroke="${SCK.goldHi}" stroke-width="1.4" stroke-linecap="round"/>`
        + `<path d="M18 52l2-8 2 8zM24 51l2.6-11 2.6 11zM31 50l2-7 2 7z" fill="#17202F"/>`
        + `<path d="M0 0h12v80H0zM108 0h12v80h-12z" fill="${SCK.burg}"/>`
        + SCH.g(`<path d="M-1 19h11v5H-1zM-1 42h11v5H-1zM110 19h11v5h-11zM110 42h11v5h-11z" fill="${SCK.gold}"/>`, 1.2)
        + `<path d="M0 8h9v11H0zM0 31h9v11H0zM111 8h9v11h-9zM111 31h9v11h-9z" fill="#22080D"/>`
        + `<path d="M2 21.6h6M2 44.6h6M112 21.6h6M112 44.6h6" stroke="${SCK.goldLo}" stroke-width="1" stroke-dasharray="1 1"/>`
        + SCH.g(drape + `<g transform="translate(120 0) scale(-1 1)">${drape}</g>`, 1.5)
        + `<path d="M16 6v56M20 8c1 12 0 22-2 31M27 7c-2 12-5 22-8 32M104 6v56M100 8c-1 12 0 22 2 31M93 7c2 12 5 22 8 32" stroke="#5E0E0E" stroke-width="1.1" fill="none" opacity=".8"/>`
        + SCH.g(`<circle cx="21.4" cy="40" r="2.2" fill="${SCK.gold}"/><circle cx="98.6" cy="40" r="2.2" fill="${SCK.gold}"/>`, 1)
        + SCH.g(`<path d="M10 0h100v8q-6.2 6-12.5 0-6.2 6-12.5 0-6.2 6-12.5 0-6.2 6-12.5 0-6.2 6-12.5 0-6.2 6-12.5 0-6.2 6-12.5 0-6.2 6-12.5 0V0z" fill="${SCK.red}"/>`, 1.5)
        + `<path d="M10 3h100" stroke="${SCK.gold}" stroke-width="2"/>`
        + SCH.g(`<path d="M12 64h96l8 8H4z" fill="#8A5A34"/>`, 1.5)
        + `<path d="M36 64l-6 8M48 64l-3 8M60 64v8M72 64l3 8M84 64l6 8" stroke="#5E3A1E" stroke-width=".9"/>`
        + `<path d="M0 72h120v8H0z" fill="#1A0C0E"/>` + glow + `<path d="${lights}" fill="${SCK.goldHi}" stroke="${K}" stroke-width=".8"/>`;
    } },

  /* the concert platform: the choir in black on its three risers, each singer with a white score, the kettledrums behind the orchestra, the violins and cellos in their half-circle, and in front the empty podium with the open score on its desk */
  sinfonia_coro: {
    label: 'Uma orquestra e um coro num palco de concerto',
    rx: /\b(orquestra|coro|sinfonia|regente)\b/,
    draw: () => {
      const K = SCK.ink, R = '#17120E', ch = SCH.uid('ch'), V = SCH.uid('vn'), C = SCH.uid('vc');
      const row = (y, dx) => `<rect x="-10" width="140" height="10" fill="url(#${ch})" transform="translate(${dx} ${y})"/><path d="M0 ${y + 9.6}h120" stroke="#8A5A34" stroke-width="1.6"/>`;
      const P = (id, x, y, s) => `<use href="#${id}" transform="translate(${x} ${y}) scale(${s})"/>`;
      const body = `<path d="M-4.6 0q0-8.6 4.6-8.6t4.6 8.6z" fill="${R}" stroke="${K}" stroke-width=".8"/>`, head = `<circle cy="-11" r="2.8" fill="#E2C29A" stroke="${K}" stroke-width=".8"/>`;
      return SCH.bg('#5A3820') + `<defs><pattern id="${ch}" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M1 10.4Q1 4.6 5 4.6t4 5.8z" fill="${R}"/><circle cx="5" cy="2.8" r="2.3" fill="#E2C29A" stroke="${K}" stroke-width=".6"/><path d="M3 6.4h4v3H3z" fill="${SCK.white}"/></pattern>
        <g id="${V}">${body + head}<ellipse cx="3.4" cy="-8.4" rx="2.8" ry="1.4" transform="rotate(-24 3.4 -8.4)" fill="#B0682E" stroke="${K}" stroke-width=".6"/><path d="M-.6-13.4 8.6-5" stroke="#E8DCC0" stroke-width=".9"/></g>
        <g id="${C}">${body}<g transform="rotate(-16)"><path d="M0-16v18" stroke="${K}" stroke-width="1.1"/><path d="M0-10c2.8 0 3 2.6 1.6 3.8 2.2.8 2.2 5.8-1.6 5.8s-3.8-5-1.6-5.8C-3-7.4-2.8-10 0-10z" fill="#9A5626" stroke="${K}" stroke-width=".7"/></g><circle cx="1" cy="-11" r="2.8" fill="#E2C29A" stroke="${K}" stroke-width=".8"/><path d="M-5.4-3.4h10" stroke="#E8DCC0" stroke-width=".9"/></g></defs>`
        + `<path d="M12 0v34M36 0v34M60 0v34M84 0v34M108 0v34" stroke="#4A2C16" stroke-width="1.4"/>`
        + row(2, 0) + row(11, 5) + row(20, 0)
        + `<path d="M0 32h120v48H0z" fill="#B98A5A"/><path d="M0 32h120" stroke="${K}" stroke-width="1.6"/><path d="M0 44h120M0 56h120M0 68h120" stroke="#9C7046" stroke-width=".8"/>`
        + SCH.g(`<path d="M42 41h15q0 8-7.5 9-7.5-1-7.5-9zM63 41h15q0 8-7.5 9-7.5-1-7.5-9z" fill="#B8732E"/><ellipse cx="49.5" cy="41" rx="7.5" ry="2" fill="${SCK.white}"/><ellipse cx="70.5" cy="41" rx="7.5" ry="2" fill="${SCK.white}"/>
          <path d="M45 49l-1.4 4M54 49l1.4 4M66 49l-1.4 4M75 49l1.4 4" fill="none" stroke-width="1.2"/>`, 1.3)
        + `<path d="M45 42.4q4.4 1.6 9 0M66 42.4q4.4 1.6 9 0" stroke="#E8C79A" stroke-width=".8" fill="none" opacity=".8"/>`
        + P(V, 34, 54.3, 1.1) + P(C, 86, 54.3, 1.1) + P(V, 20.2, 61.4, 1.2) + P(C, 99.8, 61.4, 1.2)
        + P(V, 11, 71, 1.4) + P(C, 109, 71, 1.4) + P(V, 34, 74, 1.4) + P(C, 86, 74, 1.4)
        + SCH.g(`<path d="M50 72h20v7H50z" fill="#6B4426"/><path d="M60 72v-7" fill="none" stroke-width="1.6"/><path d="M51 59h18l2.4 6H48.6z" fill="#3A2A1C" stroke-width="1.2"/>
          <path d="M52 59.6 60 59l.4 5.2H50.2zM68 59.6 60 59l-.4 5.2h10.2z" fill="${SCK.white}" stroke-width=".9"/>`, 1.5)
        + `<path d="M52.4 61.2h6.4M52 62.8h6.8M61.2 61.2h6.4M61.2 62.8h6.8" stroke="${K}" stroke-width=".5" opacity=".7"/>`;
    } },
  /* a salon at night: the grand piano with its lid raised and the gilded frame bright inside, sheet music on the desk, a tall candelabrum burning, and the casement open on a moonlit garden */
  noturno_piano: {
    label: 'Um piano de cauda junto a uma janela aberta para uma noite de lua',
    rx: /\b(piano|piano de cauda|noturno)\b/,
    draw: () => {
      const K = SCK.ink, P = '#1E1916';
      return SCH.bg('#34405A') + `<path d="M0 50h64M0 52.4h64" stroke="#28324A" stroke-width="1.2"/>`
        + SCH.g(`<path d="M63 64V8a4 4 0 0 1 4-4h44a4 4 0 0 1 4 4v56z" fill="#D9CFB4"/>`, 1.6)
        + `<path d="M67 62V8h44v54z" fill="#7F98B8"/><circle cx="100" cy="17" r="10" fill="${SCK.white}" opacity=".22"/><circle cx="100" cy="17" r="5.6" fill="${SCK.white}"/>`
        + `<path d="M76 12h.1M88 20h.1M108 30h.1M72 26h.1" stroke="${SCK.white}" stroke-width="1.2" stroke-linecap="round"/>`
        + `<path d="M67 44q6-5 11-1 5-6 11-2 6-5 12 0 6-3 10 1v20H67z" fill="#2E4A3A"/><path d="M95 48q-3-15 2.4-28 5 13 1.6 28z" fill="#22382C"/>`
        + `<path d="M67 52h44M70 52v10M74 52v10M78 52v10M82 52v10M86 52v10M90 52v10M94 52v10M98 52v10M102 52v10M106 52v10" stroke="#B8B19C" stroke-width="1.4"/>`
        + SCH.g(`<path d="M67 8 58 12v48l9 2zM111 8l6 4v48l-6 2z" fill="#A9BCCF"/>`, 1.2)
        + `<path d="M62.6 10v50M58 30l9 .6M58 44l9 .3M114 10v50" stroke="${K}" stroke-width=".8" opacity=".6"/>`
        + `<path d="M0 66h120v14H0z" fill="#4A3426"/><path d="M0 71h120M0 76h120" stroke="#3A281C" stroke-width=".8"/><path d="M63 66h48l-14 14H44z" fill="#7F98B8" opacity=".18"/>`
        + `<circle cx="9" cy="24" r="15" fill="${SCK.goldHi}" opacity=".12"/><circle cx="9" cy="24" r="8" fill="${SCK.goldHi}" opacity=".18"/>`
        + SCH.g(`<path d="M9 74V30M3 77l6-5 6 5M2.4 28.6Q9 36 15.6 28.6" fill="none" stroke="${SCK.gold}" stroke-width="1.8"/>`, 1)
        + SCH.g(`<path d="M1.4 28.6h2v-7h-2zM8 26h2v-7H8zM14.6 28.6h2v-7h-2z" fill="${SCK.white}" stroke-width=".8"/>`, 1)
        + `<path d="M2.4 21q-1.4-2 0-4 1.4 2 0 4zM9 18.4q-1.4-2 0-4 1.4 2 0 4zM15.6 21q-1.4-2 0-4 1.4 2 0 4z" fill="${SCK.goldHi}"/>`
        + SCH.g(`<path d="M18 52l1.2 17h3.2L23 52zM56.4 56l.6 15h3.2l.6-15zM94 49l-.4 16h3l1-16z" fill="${P}"/><path d="M30 57v10h4V57z" fill="${SCK.gold}" stroke-width="1"/>`, 1.3)
        + SCH.g(`<path d="M34 41.4 37 20C56 15 74 11 88 12.4 99 13.6 105 22 102.4 34L98 37z" fill="${P}"/>`, 1.6)
        + `<path d="M39 21.4C57 17 74 13.4 87 14.6" stroke="#5C5550" stroke-width="1.1" fill="none"/>`
        + SCH.g(`<path d="M24 50h36c20 0 36-2 41-8v6c-5 6-21 9-41 9H24z" fill="${P}"/><path d="M22 42 24 50H60C80 50 96 48 101 42 103 39 101 37 98 37Z" fill="#C9A040"/>`, 1.6)
        + `<path d="M28 43.4 96 38.8M27 45.6 95 41.6M26.4 47.8 84 45.6" stroke="${SCK.goldHi}" stroke-width=".8" opacity=".9"/>`
        + `<path d="M71 50 74.4 14" stroke="${P}" stroke-width="1.8"/>`
        + SCH.g(`<path d="M14 43.4 22 42l2 8-8 1.4z" fill="${SCK.white}" stroke-width="1.2"/><path d="M16 51.4 24 50v2.4l-8 1.4z" fill="${P}" stroke-width="1"/>
          <path d="M24 42 28.6 29.6 42 28.4 38 41z" fill="${P}" stroke-width="1.2"/><path d="M28.4 38.6 31.4 31.4 39.6 30.6 37 38z" fill="${SCK.white}" stroke-width=".8"/>`, 1.2)
        + `<path d="M15.6 44.6l5.6-.9M16 46.2l5.6-.9M16.4 47.8l5.6-.9M16.8 49.4l5.6-.9" stroke="${K}" stroke-width="1" stroke-dasharray="1.2 1"/>`
        + `<path d="M30.6 33.4 38.4 32.6M30 35 37.8 34.2M29.4 36.6l7.8-.8" stroke="${K}" stroke-width=".5" opacity=".7"/>`;
    } },

  /* St Petersburg in a snowy dusk: yellow and ochre houses along a frozen canal, an iron bridge with its lamps, the gilded dome far off, and a one-horse sledge with its painted arch crossing the ice */
  sao_petersburgo: {
    label: 'Um canal gelado de São Petersburgo com prédios amarelos e um trenó',
    rx: /\b(sao petersburgo|petersburgo|treno)\b/,
    draw: () => {
      const K = SCK.ink, f = n => n.toFixed(1);
      let wl = '', wd = '', snow = '', q = 7;
      const facade = (x0, x1, t0, t1, b0, b1, lit) => { const Y = (x, a, b) => a + (b - a) * (x - x0) / (x1 - x0);
        const step = (x1 - x0) / 4;
        for (let i = 0; i < 4; i++) { const xa = x0 + step * (i + .26), xb = x0 + step * (i + .7);
          [.2, .46, .72].forEach((r, j) => { const r2 = r + .14, ya = x => Y(x, t0, t1) + (Y(x, b0, b1) - Y(x, t0, t1)) * r, yb = x => Y(x, t0, t1) + (Y(x, b0, b1) - Y(x, t0, t1)) * r2;
            const d = `M${f(xa)} ${f(ya(xa))}L${f(xb)} ${f(ya(xb))}V${f(yb(xb))}L${f(xa)} ${f(yb(xa))}z`;
            if ((i * 3 + j) % lit === 1) wl += d; else wd += d; }); } };
      facade(0, 42, 6, 30, 58, 47, 4); facade(120, 80, 9, 31, 58, 47, 3);
      for (let i = 0; i < 20; i++) { q = (q * 37 + 11) % 101; const x = (i * 47 + q) % 120, y = (i * 29 + q * 3) % 78; snow += `M${x} ${y}h0`; }
      return SCH.bg('#3B4A68')
        + `<path d="M40 44V36l6-1 6 2V31h18v6l6-2 6 1v8z" fill="#8C8494"/><path d="M52 31h18" stroke="${SCK.white}" stroke-width="1.4"/>`
        + SCH.g(`<path d="M53 34V27h16v7z" fill="${SCK.stone}"/><path d="M51.6 27.4C51 18 56 14.6 61 14.4 66 14.6 71 18 70.4 27.4z" fill="${SCK.gold}"/><path d="M59.4 14.6v-4h3.2v4z" fill="${SCK.gold}" stroke-width="1"/>`, 1.3)
        + `<path d="M61 10.6V7M55 29v4.4M58 29v4.4M61 29v4.4M64 29v4.4M67 29v4.4" stroke="${K}" stroke-width=".8"/><path d="M55.6 25q.4-6 4.4-8.6" stroke="${SCK.goldHi}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`
        + SCH.g(`<path d="M0 6 42 30V47L0 58z" fill="#E2B84A"/><path d="M120 9 80 31V47l40 11z" fill="#C99A5B"/>`, 1.6)
        + `<path d="${wd}" fill="#3A3448"/><path d="${wl}" fill="${SCK.goldHi}"/>`
        + `<path d="M0 6 42 30M120 9 80 31" stroke="${SCK.white}" stroke-width="2.6"/><path d="M0 44 42 39M120 44 80 39.6" stroke="${SCK.white}" stroke-width="1" opacity=".6"/>`
        + `<path d="M0 58 42 47v3L0 63zM120 58 80 47v3l40 13z" fill="#8E7E78" stroke="${K}" stroke-width="1"/>`
        + `<path d="M0 63 42 50h38l40 13v17H0z" fill="#DCE6EA"/><path d="M50 50 30 80M70 50l20 30M58 50 54 80" stroke="#AFC0C8" stroke-width="1"/>`
        + SCH.g(`<path d="M36 43h50v2.4H36z" fill="#2E3038"/><path d="M40 50Q61 41.6 82 50" fill="none" stroke="#2E3038" stroke-width="2.4"/><path d="M42 45.4v3M46 45.4v2.4M50 45.4v2M72 45.4v2M76 45.4v2.4M80 45.4v3" fill="none" stroke-width="1"/>`, 1.2)
        + `<path d="M44 43v-5M78 43v-5" stroke="${K}" stroke-width="1"/><path d="M44 37.4h.1M78 37.4h.1" stroke="${SCK.goldHi}" stroke-width="2.6" stroke-linecap="round"/>`
        + `<g transform="translate(72 73)">` + SCH.g(`<path d="M-37-2H-14Q-10-2-10-6" fill="none" stroke-width="1.6"/><path d="M-36-12.6H-16l2 6.6-21 .6z" fill="${SCK.red}"/><path d="M-35-13q-1-6 2-9l5 1 1 7z" fill="#2A2420"/>
          <path d="M-16-8 4-10" fill="none" stroke="${SCK.wood}" stroke-width="1.6"/>
          <path d="M-9-8C-11-11-10-15-6-15H4C6-15 7-17 9-19L12-22 16-18 15.4-16.4 12-17C10.6-15 10-12 9-9 6-7-6-7-9-8Z" fill="#4A3226" stroke-width="1.3"/>
          <path d="M8-8 9 0M5.6-8 5 0M-5.6-8-6.4-4-5.6 0M-8-8.6-9.4-4.4-9 0M-9.4-13q-3 2-2.6 8" fill="none" stroke-width="1.8"/>
          <path d="M3-9C2-20 9-22 10-12" fill="none" stroke="${SCK.red}" stroke-width="2"/><circle cx="-31" cy="-23" r="2.6" fill="#2A2420" stroke-width="1"/>`, 1.2) + `</g>`
        + `<path d="${snow}" stroke="${SCK.white}" stroke-width="1.4" stroke-linecap="round" opacity=".85"/>`;
    } },

  /* a foggy London street of the 1880s: a gas lamp burning in the foreground, sooty brick terraces fading into the mist, a hansom cab and its horse on the wet cobbles, a church spire grey in the fog */
  londres_nevoeiro: {
    label: 'Uma rua de Londres no nevoeiro, com lampiões a gás e um cabriolé de aluguel',
    rx: /\b(londres|nevoeiro|lampioes|cabriole)\b/,
    draw: () => {
      const K = SCK.ink, f = n => n.toFixed(1);
      let win = '', lit = '', spokes = '';
      for (let i = 0; i < 6; i++) { const x = 3 + i * 9.4, w = 4.2 - i * .4, t = 2 + x * .47;
        [[.16, .14], [.42, .14]].forEach(([a, h], j) => { const H = (66 - 10 * x / 60) - t, y = t + H * a;
          const d = `M${f(x)} ${f(y)}h${f(w)}v${f(H * h)}h${f(-w)}z`; if ((i + j) % 3 === 1) lit += d; else win += d; }); }
      for (let a = 0; a < 180; a += 22.5) { const t = a * Math.PI / 180; spokes += `M${f(88 + 10 * Math.cos(t))} ${f(63 + 10 * Math.sin(t))}L${f(88 - 10 * Math.cos(t))} ${f(63 - 10 * Math.sin(t))}`; }
      return SCH.bg('#BFC1B4')
        + `<path d="M76 46V22h7v24zM76 22l3.5-18 3.5 18z" fill="#A4A79B"/><path d="M84 50V34h10v-4h8v4h10v16z" fill="#AFB1A5"/>`
        + `<path d="M0 54h120v6H0z" fill="#C9CABF" opacity=".7"/>`
        + `<path d="M0 66 60 56h60v24H0z" fill="#5E5A52"/>`
        + `<path d="M8 72q4-2 8 0M30 70q4-2 8 0M52 66q4-2 8 0M70 64q4-1.6 8 0M100 62q4-1.6 8 0M18 77q4-2 8 0M44 76q4-2 8 0M108 70q4-2 8 0" stroke="#3E3A34" stroke-width="1" fill="none"/>`
        + SCH.g(`<path d="M0 2 60 30V56L0 66z" fill="#6B4A3A"/>`, 1.6)
        + `<path d="${win}" fill="#3A2C26"/><path d="${lit}" fill="${SCK.goldHi}"/>`
        + `<path d="M6 4.6v-5h4v7M24 13v-5h4v7M42 21v-5h3.4v6.6" fill="#4A3A30" stroke="${K}" stroke-width="1"/>`
        + `<path d="M0 50 60 46M0 55 60 49" stroke="#3A2C26" stroke-width="1"/><path d="M36 26 60 30V56L36 60z" fill="#BFC1B4" opacity=".55"/>`
        + `<circle cx="55" cy="40" r="5" fill="${SCK.goldHi}" opacity=".35"/><path d="M55 56V42" stroke="#3E4A42" stroke-width="1.2"/><path d="M53.6 38.6h2.8v3h-2.8z" fill="${SCK.goldHi}"/>`
        + `<path d="M15 70v8M55 58v6" stroke="${SCK.goldHi}" stroke-width="2.4" opacity=".4"/>`
        + `<g transform="translate(58 74) scale(-1.5 1.5)">` + SCH.g(`<path d="M-9-8C-11-11-10-15-6-15H4C6-15 7-17 9-19L12-22 16-18 15.4-16.4 12-17C10.6-15 10-12 9-9 6-7-6-7-9-8Z" fill="#3A2A20" stroke-width="1"/>
          <path d="M8-8 9 0M5.6-8 5 0M-5.6-8-6.4-4-5.6 0M-8-8.6-9.4-4.4-9 0M-9.4-13q-3 2-2.6 8" fill="none" stroke-width="1.4"/>`, 1) + `</g>`
        + SCH.g(`<path d="M77 58 50 56.4" fill="none" stroke="#4A3A2E" stroke-width="1.6"/><path d="M53 50.6v8" fill="none" stroke-width="1.1"/><path d="M73 36h25v3H73z" fill="#2A221C"/><path d="M74 39h22l1 18q0 6-6 6H79q-5-3-5-10z" fill="#2E2620"/>
          <path d="M96 39l2-8h6v3h-4l-1 5z" fill="#2A221C"/><path d="M75 42h5v9h-5z" fill="#8C8A7C" stroke-width="1"/><path d="M99 31l-28 12" fill="none" stroke-width=".7"/>`, 1.4)
        + `<circle cx="88" cy="63" r="11" fill="none" stroke="${K}" stroke-width="3.4"/><circle cx="88" cy="63" r="11" fill="none" stroke="#3A2A20" stroke-width="1.6"/><path d="${spokes}" stroke="${K}" stroke-width=".9"/><circle cx="88" cy="63" r="2" fill="#3A2A20" stroke="${K}"/>`
        + `<circle cx="16" cy="26" r="14" fill="${SCK.goldHi}" opacity=".22"/><circle cx="16" cy="26" r="8" fill="${SCK.goldHi}" opacity=".3"/>`
        + SCH.g(`<path d="M14.6 76V31h2.8v45zM12 78h8l-1-4h-6zM10 34h12" fill="#2E3A34" stroke-width="1.3"/><path d="M11 22h10l-1.6 8h-6.8z" fill="${SCK.goldHi}" stroke-width="1.3"/><path d="M10 22.4l6-5 6 5z" fill="#2E3A34" stroke-width="1.3"/>`, 1.3)
        + `<path d="M16 17.4v-2.4" stroke="${K}" stroke-width="1.2"/>`;
    } },
  /* a modest bedroom in Prague: on the bed a huge brown beetle lies helpless on its domed, banded back, thin legs waving in the air; the alarm clock on the night table, the spires of the Old Town through the window */
  inseto_metamorfose: {
    label: 'Um grande inseto de costas sobre uma cama, num quarto modesto',
    rx: /\b(inseto|barata|besouro)\b/,
    draw: () => {
      const K = SCK.ink;
      return SCH.bg('#C9B48C') + `<path d="M8 0v66M20 0v66M32 0v66M44 0v66M56 0v66M68 0v66M80 0v66M92 0v66M104 0v66M116 0v66" stroke="#B59E74" stroke-width="2.4" opacity=".6"/>`
        + SCH.g(`<path d="M74 40V6h38v34z" fill="${SCK.sky}"/>`, 1.8)
        + `<path d="M74 34l6-6 6 6 5-5 6 5 6-6 9 6v6H74z" fill="#B5532F"/><path d="M74 34h38" stroke="#7A3420" stroke-width=".8"/>`
        + `<path d="M86 30V18l2.4-9 2.4 9v12zM94 30V18l2.4-9 2.4 9v12z" fill="#3A3A40"/><path d="M85 19h1.4l-.7-3zM90.2 19h1.4l-.7-3zM93 19h1.4l-.7-3zM98.2 19h1.4l-.7-3z" fill="#3A3A40"/>`
        + `<path d="M93 6v34M74 23h38" stroke="${SCK.wood}" stroke-width="2.2"/><path d="M74 40h38" stroke="${K}" stroke-width="1.6"/><path d="M72 41h42" stroke="${SCK.wood}" stroke-width="3"/>`
        + `<path d="M0 68h120v12H0z" fill="#6B4A2E"/><path d="M0 73h120" stroke="#4E3420" stroke-width=".8"/>`
        + SCH.g(`<path d="M3 70V30q5-5 10 0v40zM88 70V46h7v24z" fill="${SCK.wood}"/><path d="M12 56h78v8H12z" fill="#E8DCC0"/><path d="M12 48q38-4 78 1v9H12z" fill="#8FA4A8"/><path d="M13 49q-1-9 6-9h12q5 1 4 8z" fill="${SCK.white}"/>`, 1.6)
        + `<path d="M16 59h72M16 61.6h72" stroke="#B9A985" stroke-width=".8"/><path d="M30 52l6 4M54 51l6 4M76 51l6 4" stroke="#6E8488" stroke-width="1"/>`
        + SCH.g(`<ellipse cx="60" cy="42.6" rx="27.6" ry="7.6" fill="#3E2614"/><path d="M33 40c0-8 12-12.6 27-12.6S87 32 87 40c-6 4.6-48 4.6-54 0z" fill="#A86E3C"/>`, 1.6)
        + `<path d="M57 28.6q-3.4 7 0 14.6M65.4 28.4q-3.4 7.4 0 15M73.4 29.6q-3 6.6 0 13.6M80.6 32.4q-2.4 5 0 10.4" stroke="#5E3A1E" stroke-width="1.4" fill="none"/>`
        + `<path d="M38 34q8-5 16-5.6" stroke="#D2A06A" stroke-width="1.8" fill="none" stroke-linecap="round"/>`
        + SCH.g(`<path d="M39 32.4 32 23l-6-3M43 30.6 40 18l-6-5M47.4 29.4 49 16l-4-7M51.6 28.8 59 17l-1-7M56 28.4 67 20l3-7M60 28.2 73 24l6-5" fill="none" stroke-width="1.6"/>
          <ellipse cx="29.6" cy="38.6" rx="5.4" ry="4.4" fill="#3E2614" stroke-width="1.4"/><path d="M27 35.4q-6-5-5-14M30.4 34.4q-1-9 4.6-13" fill="none" stroke-width="1.2"/>`, 1)
        + `<path d="M22 19l-3-1M32 9l-2-2M44 5l-1-3M58 6v-3M72 9l2-2M82 17l3-1" stroke="${K}" stroke-width="1" opacity=".5" stroke-linecap="round"/><path d="M27.6 37.4h.1" stroke="${SCK.goldHi}" stroke-width="1.6" stroke-linecap="round"/>`
        + SCH.g(`<path d="M98 52h20v18H98z" fill="${SCK.wood}"/><path d="M98 60h20" fill="none" stroke-width="1"/><circle cx="108" cy="44" r="6" fill="${SCK.white}"/><path d="M102 39a3 3 0 0 1 4-3zM110 36a3 3 0 0 1 4 3z" fill="${SCK.gold}" stroke-width="1.1"/><path d="M104 49.4l-1.6 2.6M112 49.4l1.6 2.6" fill="none" stroke-width="1.2"/>`, 1.5)
        + `<path d="M108 44v-4M108 44l2.6 1.4" stroke="${K}" stroke-width="1.2" stroke-linecap="round"/><path d="M107.4 64h1.2" stroke="${K}" stroke-width="2" stroke-linecap="round"/>`;
    } },

  /* the farmyard: a pig standing upright on its hind legs before a dark weatherboarded English barn, a sheep, the big cart horse and two hens looking on */
  fazenda_bichos: {
    label: 'Um porco de pé sobre duas patas diante de um celeiro, com outros animais',
    rx: /\b(porco|porcos|fazenda|celeiro)\b/,
    draw: () => {
      const K = SCK.ink, PK = '#E6A99B', PD = '#C98274';
      const H = SCH.uid('hn'), hen = (x, c) => `<use href="#${H}" x="${x}" y="74" fill="${c}"/>`;
      return SCH.bg('#C6DCE0') + `<defs><g id="${H}">` + SCH.g(`<path d="M-4-1C-6-4-5-8-2-7-1-10 1-11 2.4-9.4L4.4-9 3-7.6C4-6 4-2 0-.6z"/><path d="M1-10.6l.6-1.6 1 .8z" fill="${SCK.red}" stroke-width=".6"/><path d="M-1-.6v1M1-.6v1" fill="none" stroke-width=".9"/>`, 1) + `</g></defs>` + `<ellipse cx="24" cy="12" rx="13" ry="2.6" fill="${SCK.white}" opacity=".8"/>`
        + `<path d="M0 46q30-8 60-4t60 0v20H0z" fill="#8FAE78"/>`
        + SCH.g(`<path d="M62 60V30L87 11l25 19v30z" fill="#4E3E32"/><path d="M58.6 32.6 87 10.6l28.4 22" fill="none" stroke-width="4"/><path d="M58.6 32.6 87 10.6l28.4 22" fill="none" stroke="${SCK.stoneLo}" stroke-width="1.6"/>
          <path d="M75 60V39h24v21z" fill="${SCK.wood}" stroke-width="1.4"/><path d="M83 21h8v8h-8z" fill="#2E241C" stroke-width="1.2"/>`, 1.6)
        + `<path d="M81 40v20M87 40v20M93 40v20" stroke="#5E3A1E" stroke-width="1"/><path d="M76 49.6h22" stroke="#5E3A1E" stroke-width="1.2"/>`
        + `<path d="M72 24.4h10M92 24.4h10M65 31h44M63 35.6h11M100 35.6h11M63 39h11M100 39h11M63 44h11M100 44h11M63 49h11M100 49h11M63 54h11M100 54h11" stroke="#382C24" stroke-width="1"/>`
        + `<path d="M0 58h120v22H0z" fill="${SCK.green}"/><path d="M14 80q14-14 46-14t44 14z" fill="${SCK.ochre}"/>`
        + SCH.g(`<path d="M0 46h58M0 53h58" fill="none" stroke="${SCK.wood}" stroke-width="2.2"/><path d="M4 42v18M22 42v18M40 42v18M56 42v18" fill="none" stroke="${SCK.wood}" stroke-width="2.6"/>`, 1)
        + SCH.g(`<path d="M5 66q-3-3 0-6 0-4 4-4 2-3 6-1 4-1 5 3 3 2 1 6 1 3-3 4H8q-4-1-3-2z" fill="${SCK.white}"/><path d="M19 58q2-5 6-3 2 2 0 6l-3 2q-3-1-3-5z" fill="#3A3230"/><path d="M9 68v5M16 68v5" fill="none" stroke-width="1.6"/>`, 1.2)
        + SCH.g(`<path d="M99 58 98 74h5.6l1.4-15zM109 60l.6 14h5.6l.4-14z" fill="#7A4C2A"/><path d="M122 64V42c-8-2-14-2-18-4-4-4-6-10-8-14l1-4.4-3 3-2-3-.4 4.6C88 30 85 36 84 40c-.4 3 2 4.4 4 3.6 2-2.6 4-5.6 7-6.6 2 3 3 9 4 13 1 6 5 10 9 12z" fill="${SCK.wood}"/>`, 1.5)
        + `<path d="M104.6 38.6c-4-4-6.6-10-8.6-14.6" stroke="#3A2418" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M91.4 27.4 86.6 39" stroke="${SCK.white}" stroke-width="1.8" stroke-linecap="round"/>`
        + `<path d="M92.6 28.6h.1" stroke="${K}" stroke-width="1.8" stroke-linecap="round"/><path d="M98.6 73h6.4M109 73h6.4" stroke="${SCK.white}" stroke-width="2.4"/><path d="M85.4 41.4h.1" stroke="${K}" stroke-width="1.2" stroke-linecap="round"/>`
        + hen(60, SCK.white) + hen(70, '#C98A3E')
        + SCH.g(`<path d="M30 74v-8h4v8zM38 74v-8h4v8z" fill="${PK}" stroke-width="1.2"/><path d="M27 67c-3-12-1-24 9-25.4 10 1.4 12 13.4 9 25.4z" fill="${PK}"/>
          <path d="M28 47c-5 3-6 8-5 12h3.4c0-4 1-7 3.6-9zM44 47c5 3 6 8 5 12h-3.4c0-4-1-7-3.6-9z" fill="${PK}" stroke-width="1.2"/>
          <path d="M29 27.6l-3-7 7 3zM43 27.6l3-7-7 3z" fill="${PD}" stroke-width="1.2"/><circle cx="36" cy="33" r="9" fill="${PK}"/><ellipse cx="36" cy="37" rx="4.2" ry="3" fill="${PD}" stroke-width="1.2"/>`, 1.5)
        + `<path d="M30 72h4M38 72h4M23 57.6h3.4M46 57.6h3.4" stroke="#5E3A30" stroke-width="2.2"/><path d="M34.4 37h.1M37.6 37h.1M32.6 31h.1M39.4 31h.1" stroke="${K}" stroke-width="1.6" stroke-linecap="round"/>`
        + `<path d="M31 56q5 3 10 0" stroke="${PD}" stroke-width="1" fill="none"/><path d="M45 62c4 0 4-4 1-4" stroke="${K}" stroke-width="1.1" fill="none"/>`;
    } },

  /* the Gulf Stream at sundown: an old wooden skiff with its patched sail, a great marlin lashed along its side, longer than the boat, its sickle fin and forked tail out of the water, gulls overhead and the low sun on the sea */
  velho_e_o_mar: {
    label: 'Um pequeno barco a remo com um enorme marlim preso ao lado',
    rx: /\b(marlim|peixe|esquife|barco a remo)\b/,
    draw: () => {
      const K = SCK.ink, B = '#2E3E6A';
      return SCH.bg('#EBCB98') + `<path d="M0 28h120v16H0z" fill="#E5B47E"/>` + SCH.sun(94, 44, 11, SCK.goldHi)
        + `<path d="M0 44h120v36H0z" fill="#3F6A86"/><path d="M86 48h16M88 52h12M90 56h8" stroke="${SCK.goldHi}" stroke-width="1.4" stroke-linecap="round"/>`
        + `<path d="M14 14q3-3 6 0 3-3 6 0M100 10q2-2 4 0 2-2 4 0" stroke="${K}" stroke-width="1.3" fill="none"/>`
        + SCH.g(`<path d="M48 48V8" fill="none" stroke-width="1.8"/><path d="M49 9q14 0 26 5 5 15 3 32H49z" fill="${SCK.white}"/>
          <path d="M57 13.4l9.4 1.4-1 8-9.6-1.6zM66 29.6l10.6-.6.8 8.4-11 1.2zM49 35.4l8.6.6-.6 7.4H49z" fill="#DCCDA6" stroke-width=".8"/>
          <path d="M16 40q6 3 16 4 30 2 64 3l-2 7q-1 4-6 4H36q-12-2-20-18z" fill="${SCK.wood}"/>`, 1.6)
        + `<path d="M22 45q20 3 72 5" stroke="#5E3A1E" stroke-width="1.1" fill="none"/><path d="M93 47V40" stroke="${K}" stroke-width="1.4"/>`
        + SCH.g(`<path d="M3 56.4 25 56" fill="none" stroke-width="1.6"/><path d="M31 55c1-6 4-12 9-16 1 5 2 8 5 10.4l30 1.8-4 4z" fill="${B}"/><path d="M100 60 112 47l-4 13 5 13z" fill="${B}"/>
          <path d="M23 57.4c4-4 10-6 18-6 22 0 44 3 60 8.6-14 3-38 6-60 5-8 0-14-3-18-7.6z" fill="${B}"/>`, 1.4)
        + `<path d="M25 59.6c6 3 10 4.4 16 4.4 22 0 44-2 58-4" stroke="#D9DEE0" stroke-width="2.6" fill="none"/>`
        + `<path d="M48 54.6v7.4M60 55v8M72 56v7.6M84 57.6v5" stroke="#8A9AC8" stroke-width="1.3"/><circle cx="29.6" cy="56.4" r="1.1" fill="${SCK.white}"/>`
        + `<path d="M40 47.6l-1 16M66 49.4l-1 14.6M88 50.4l1 11" stroke="#D9C59A" stroke-width="1.3"/>`
        + `<path d="M0 63q10-3 20 0t20 0 20 0 20 0 20 0 20 0v17H0z" fill="#3F6A86" opacity=".8"/>` + SCH.waves(72, '#6D95AD', 1.2) + SCH.waves(79, '#6D95AD', 1.1);
    } },

  /* Macondo: a cloud of small yellow butterflies swirling over a whitewashed village house with a red tile roof, an almond tree on one side and banana plants on the other */
  borboletas_macondo: {
    label: 'Borboletas amarelas sobre uma casa de aldeia tropical com amendoeira',
    rx: /\b(borboletas|borboleta|macondo)\b/,
    draw: () => {
      const K = SCK.ink, f = n => n.toFixed(1);
      const B = SCH.uid('bf'); let bf = '', q = 3;
      for (let i = 0; i < 30; i++) { q = (q * 53 + 17) % 97;
        const a = i * 2.4, r = 6 + i * .9, x = 62 + r * 1.6 * Math.cos(a), y = 22 + r * .6 * Math.sin(a) - (q % 5);
        bf += `<use href="#${B}" transform="translate(${f(x)} ${f(y)}) rotate(${(q * 7) % 60 - 30})"/>`; }
      return SCH.bg('#BFD9DC') + `<path d="M0 54q30-6 60-3t60 1v28H0z" fill="#8FAE6A"/>`
        + SCH.g(`<path d="M10 66q2-14 0-26M14 40c-6-2-8 2-10 6M14 40c4-6 8-6 12-4" fill="none" stroke="${SCK.wood}" stroke-width="3.2"/>
          <path d="M0 38c-2-8 6-12 10-10 2-8 14-8 16 0 8-1 10 6 6 10 2 6-6 9-10 6-4 5-12 4-14 0-6 2-10-2-8-6z" fill="#4E7A3C"/>`, 1.5)
        + SCH.g(`<path d="M28 66V40h62v26z" fill="${SCK.white}"/><path d="M22 41 36 26h46l14 15z" fill="#B5532F"/>
          <path d="M53 66V50h10v16zM36 46h9v9h-9zM72 46h9v9h-9z" fill="#3F7A6E" stroke-width="1.3"/>`, 1.6)
        + `<path d="M28 44 37 29M38 41 44 29M52 41 55 29M66 41 64 29M80 41 75 29M90 41 82 29" stroke="#8A3A20" stroke-width="1"/><path d="M40.5 46v9M76.5 46v9M58 50v16" stroke="${K}" stroke-width=".8"/>`
        + `<path d="M28 63h62" stroke="${SCK.stoneLo}" stroke-width="3"/>`
        + SCH.g(`<path d="M103 70l1.6-30h3.4l1 30z" fill="#8A9A50"/><path d="M106 41c-6-9-14-11-20-6 8 0 14 2 20 8zM107 41c4-9 10-12 14-10-4 4-8 8-13 12zM106 41c-2-9 0-16 4-19 1 7 0 13-3 19zM105.4 45c-8 0-14 5-16 11 6-3 11-6 16-9zM108 45c6 0 10 4 12 9-5-2-8-4-12-7z" fill="#6E9A4A" stroke-width="1.2"/>`, 1.3)
        + `<path d="M100 38l-3 3M92 36l-1 3M116 34l-2 3M98 50l2 2M114 49l-1 3" stroke="${K}" stroke-width=".9"/>`
        + `<defs><path id="${B}" d="M0 0C-1-3-4-3-3.4 0-4 2.4-1 2.4 0 0 1 2.4 4 2.4 3.4 0 4-3 1-3 0 0z"/></defs><g fill="#F2C93C" stroke="${K}" stroke-width=".6">${bf}</g>`;
    } },
  /* the Mississippi: a white side-wheel steamboat with two tall black chimneys trailing smoke, and in the foreground a log raft with its little wigwam and steering sweep, the wooded bank beyond */
  vapor_mississippi: {
    label: 'Um barco a vapor de rodas no rio largo e uma jangada de troncos',
    rx: /\b(mississippi|barco a vapor|jangada)\b/,
    draw: () => {
      const K = SCK.ink, f = n => n.toFixed(1);
      let sun = '';
      for (let a = 200; a <= 340; a += 20) { const t = a * Math.PI / 180; sun += `M83 55L${f(83 + 10 * Math.cos(t))} ${f(55 + 10 * Math.sin(t))}`; }
      return SCH.bg('#CFE0E2') + `<ellipse cx="96" cy="10" rx="12" ry="2.4" fill="${SCK.white}" opacity=".8"/>`
        + `<path d="M0 40V30q6-6 12-2 6-6 12-1 6-5 12 0 6-4 12 0 8-5 14 1 6-4 12 0 6-5 12 0 8-4 14 1 6-3 10 1v10z" fill="#56784A"/>`
        + `<path d="M0 38h120v42H0z" fill="#A88A5A"/><path d="M4 46h16M28 44h12M96 66h18M70 74h20M10 78h12" stroke="#C9AE7E" stroke-width="1.2" stroke-linecap="round"/>`
        + `<path d="M58 10q6-6 14-3 6-4 12 1 7-1 8 5-6 4-12 1-6 3-12 0-6 2-10-4z" fill="#8C8C88" opacity=".85"/>`
        + SCH.g(`<path d="M38 50h78l-4 8H44z" fill="#3A2E28"/><path d="M40 42h74v8H40zM46 34h64v8H46zM68 28h28v6H68zM76 21h10v7H76z" fill="${SCK.white}"/>`, 1.4)
        + `<path d="M44 42v8M50 42v8M98 42v8M104 42v8M110 42v8M50 34v8M56 34v8M100 34v8M106 34v8M72 28v6M92 28v6" stroke="${K}" stroke-width=".7"/><path d="M40 45h74M46 37h64M68 30.6h28" stroke="${K}" stroke-width=".5" opacity=".7"/>`
        + `<path d="M78 23.6h2.4v2.4H78zM82 23.6h2.4v2.4H82z" fill="${SCK.night}"/><path d="M74 21h14" stroke="${K}" stroke-width="1.6"/>`
        + SCH.g(`<path d="M71 56a12 12 0 0 1 24 0z" fill="${SCK.white}"/><path d="M52 44V10h4.4v34zM61 44V10h4.4v34z" fill="#1E1A18"/><path d="M50.6 10l1.4-3 1.4 2 1.4-2 1.4 2 1.4-3zM59.6 10l1.4-3 1.4 2 1.4-2 1.4 2 1.4-3z" fill="#1E1A18" stroke-width="1"/>`, 1.4)
        + `<path d="${sun}" stroke="${SCK.red}" stroke-width="1"/><path d="M71 56a12 12 0 0 1 24 0" stroke="${SCK.red}" stroke-width="1.4" fill="none"/>`
        + `<path d="M56.4 20h4.6M56.4 30h4.6" stroke="${K}" stroke-width="1.2"/><path d="M38 50 34 40" stroke="${K}" stroke-width="1"/><path d="M34 40l6 1.6-6 1.6z" fill="${SCK.red}"/>`
        + `<path d="M70 59q4 2 8 0t8 0 8 0" stroke="${SCK.white}" stroke-width="1.4" fill="none"/>`
        + SCH.g(`<path d="M4 70h44l-4 6H0zM6 66h44l-2 4H4z" fill="#B8874E"/><path d="M14 66l9-14 9 14z" fill="#E4D6B4"/><path d="M23 52v-2.6" fill="none" stroke-width="1.2"/>`, 1.4)
        + `<path d="M2 73h43M6 68h42M12 70v6M22 70v6M32 70v6M42 70v6" stroke="#6B4426" stroke-width=".9"/><path d="M23 52v14M17 61l6-9" stroke="${K}" stroke-width=".8" opacity=".6"/>`
        + SCH.g(`<path d="M44 66 62 79" fill="none" stroke="${SCK.wood}" stroke-width="2"/><path d="M38 66V52" fill="none" stroke="${SCK.wood}" stroke-width="1.6"/>`, 1.2)
        + `<path d="M38.6 53l6 1.6-6 1.6z" fill="${SCK.white}" stroke="${K}" stroke-width=".8"/>`;
    } },

  /* Lisbon: a yellow tram grinding up a steep street under its wire, tiled houses climbing beside it and the Tagus below the red roofs; on the wavy pavement a café table with three little cups, three empty chairs and an open notebook */
  eletrico_lisboa: {
    label: 'Um bonde amarelo subindo uma ladeira de Lisboa e uma mesa de café com três xícaras',
    rx: /\b(eletrico|bonde|lisboa|xicara|xicaras)\b/,
    draw: () => {
      const K = SCK.ink, az = SCH.uid('az'), cz = SCH.uid('cz'), cu = SCH.uid('cu'), ch = SCH.uid('ch'), M = '#2A2622';
      const chair = (x, y) => `<use href="#${ch}" x="${x}" y="${y}"/>`;
      return SCH.bg('#CFE2EA') + `<defs><pattern id="${az}" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0 0h5v5H0z" fill="#EEF1EE"/><path d="M2.5.5 4.5 2.5 2.5 4.5.5 2.5z" fill="#3F6FA0"/></pattern><pattern id="${cz}" width="10" height="6.4" patternUnits="userSpaceOnUse"><path d="M0 0h10v6.4H0z" fill="#EDE7D8"/><path d="M0 4q2.5-3 5 0t5 0" stroke="#A8A194" fill="none"/></pattern>`
        + `<g id="${cu}" stroke="${K}" stroke-width=".9"><ellipse rx="3.2" ry="1" fill="${SCK.white}"/><path d="M-2.2-3.6h4.4l-.6 3.2h-3.2z" fill="${SCK.white}"/><ellipse cy="-3.6" rx="2.2" ry=".7" fill="#5E3A1E" stroke-width=".5"/></g><path id="${ch}" d="M-3.6 0-3-8.6M3.6 0 3-8.6M-4-8.6h8M-3-8.6V-17q3-3.4 6 0v8.4M-3-13h6" fill="none" stroke="${M}" stroke-width="1.5" stroke-linecap="round"/></defs>`
        + `<path d="M0 29q12-5 26-2 14-4 30 0v3H0z" fill="#9DB09C"/><path d="M0 30h56v14H0z" fill="${SCK.sea}"/><path d="M4 34h10M26 37h14M8 40h8" stroke="#BFD3D9" stroke-width="1" stroke-linecap="round"/>`
        + `<path d="M20 38.6V31l5 7.6z" fill="${SCK.white}" stroke="${K}" stroke-width=".7"/>`
        + SCH.g(`<path d="M-2 62V45h36v17z" fill="#EDE4CF"/><path d="M-3 46 6 40l9 6zM13 46l10-7 10 7z" fill="#B5532F"/>`, 1.2)
        + `<path d="M4 50h3v4H4zM18 50h3v4h-3zM26 50h3v4h-3z" fill="#3A3A40"/>`
        + SCH.g(`<path d="M50 54V16h26v38zM98 52V4h24v48z" fill="url(#${az})"/><path d="M76 52V10h22v42z" fill="#DE9A76"/><path d="M49 16h28M75 10h24M97 4h24" fill="none" stroke="#B5532F" stroke-width="2.6"/>`, 1.5)
        + `<path d="M55 20h5v8h-5zM66 20h5v8h-5zM80 14h5v8h-5zM90 14h5v8h-5zM103 9h5v8h-5zM113 9h5v8h-5zM103 24h5v8h-5zM113 24h5v8h-5zM103 39h5v9h-5zM113 39h5v9h-5z" fill="#2E3A48" stroke="${SCK.white}" stroke-width="1"/>`
        + `<path d="M79 22.6h7M89 22.6h7M102 17.6h7M112 17.6h7M102 32.6h7M112 32.6h7" stroke="${K}" stroke-width="1.2"/>`
        + `<path d="M0 18.4 120-1.6" stroke="${K}" stroke-width=".8"/>`
        + `<path d="M0 60 120 40v13L0 73z" fill="#8C8478"/><path d="M0 65 120 45M0 68.4l120-20" stroke="#5A5248" stroke-width="1"/>`
        + `<g transform="translate(64 54.3) rotate(-9.5)">` + SCH.g(`<path d="M-12-29-30-46" fill="none" stroke-width="1.3"/><path d="M-21-3.6h42" fill="none" stroke-width="3"/>
          <circle cx="-12" cy="-3.4" r="3.4" fill="${M}"/><circle cx="12" cy="-3.4" r="3.4" fill="${M}"/>
          <path d="M-27-4V-25H26q2.6 0 2.6 3V-6.6Q28.6-4 26-4z" fill="${SCK.gold}"/><path d="M-28.4-25q0-3.6 4-3.6H24.4q4 0 4.4 3.6z" fill="${SCK.white}"/>
          <path d="M-24.4-22.6h7v7.4h-7zM-15-22.6h7v7.4h-7zM-5.6-22.6h7v7.4h-7zM3.8-22.6h7v7.4h-7zM13.2-22.6h7v7.4h-7zM22.4-22.6h4.2v8h-4.2z" fill="#A9C6D2" stroke-width="1.1"/>`, 1.5)
        + `<path d="M-27-12.6h55.6" stroke="${SCK.white}" stroke-width="1.4"/><path d="M-13.6-11.6v7.6M0-11.6v7.6M13.6-11.6v7.6" stroke="${SCK.goldLo}" stroke-width=".9"/><circle cx="26.6" cy="-8" r="1.4" fill="${SCK.goldHi}" stroke="${K}" stroke-width=".8"/></g>`
        + `<path d="M0 73 120 53v27H0z" fill="url(#${cz})"/>`
        + chair(94, 64)
        + SCH.g(`<path d="M94 64v13M88 78h12" fill="none" stroke="${M}" stroke-width="2"/><ellipse cx="94" cy="64" rx="17" ry="4.8" fill="${SCK.white}"/>` + `<use href="#${cu}" x="86.6" y="63.4"/><use href="#${cu}" x="95" y="61.6"/><use href="#${cu}" x="103" y="64"/>`
          + `<path d="M89 67.6l5.4-1.6 5.4 1.6-5.4 1.8z" fill="${SCK.paper}" stroke-width=".8"/>`, 1.1)
        + `<path d="M94.4 66v3.4" stroke="${K}" stroke-width=".6"/>` + chair(75, 78) + chair(113, 78);
    } },

  /* a summer night by a lake below the Alps: a forked bolt of lightning splits the storm over the snowy peaks, and on the dark hillside above the water the villa with its columned loggia stands pale in the flash, one window glowing with a candle */
  villa_diodati: {
    label: 'Uma casa senhorial à beira de um lago sob uma tempestade de relâmpagos',
    rx: /\b(villa diodati|lago de genebra|relampago|relampagos)\b/,
    draw: () => {
      const K = SCK.ink;
      return SCH.bg('#27334E') + `<ellipse cx="28" cy="20" rx="34" ry="22" fill="#5E6E96" opacity=".4"/><ellipse cx="28" cy="16" rx="18" ry="11" fill="#9AA8CA" opacity=".35"/>`
        + `<path d="M0 0h120v13q-8 6-18 2-8 6-18 1-10 6-20 0-10 5-20-1-10 5-22 0-12 4-22-2z" fill="#1A2236"/><path d="M4 15q8 4 16 0 8 6 18 0 8 5 16 0" stroke="#B4C0DA" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".8"/>`
        + `<path d="M0 50 12 38l9 5 15-17 12 11 10-7 14 12 10-8 12 8 12-7 14 11v4H0z" fill="#56627A"/><path d="M31 31.6 36 26l5.6 4.6-4 .4-1.6-1.6zM53 33l5-3 4.6 3.4zM81 37l5-3 4 3z" fill="${SCK.white}"/>`
        + [[K, 3], [SCK.goldHi, 1.4]].map(([c, w]) => `<path d="M34.6 20.6 41 25.4l-2.2 4.2 3.6 5" fill="none" stroke="${c}" stroke-width="${w}"/>`).join('')
        + SCH.g(`<path d="M30.6 9h5l-4 9.4 5 2-6.2 10.2 3.6 1L25.4 46l3-12.4-3.6-1.2 3.8-9.8-3.2-1.6z" fill="${SCK.goldHi}"/>`, 1.2) + `<path d="M33 10.6l-3.6 9.2 4.4 1.6-5.2 9.2 3.2 1-4.4 11.4" fill="none" stroke="${SCK.white}" stroke-width=".8"/>`
        + `<path d="M0 50h120v30H0z" fill="#2E4466"/><path d="M26 54v6M27 63v4M84 60v6M85 69v3" stroke="${SCK.goldHi}" stroke-width="1.6" opacity=".55"/><path d="M6 56h14M40 60h12M10 68h12M44 72h10" stroke="#5A7090" stroke-width="1" stroke-linecap="round"/>`
        + `<path d="M46 80V70q22-16 74-22v32z" fill="#22352A"/><path d="M56 74q24-14 60-20M66 79q20-10 52-16" stroke="#34503E" stroke-width="1.1" fill="none"/>`
        + SCH.g(`<path d="M62 60V30h44v30z" fill="#E4DDCA"/><path d="M57 31 68 21h32l11 10z" fill="#7A6E66"/><path d="M59 43.6h50v3.4H59z" fill="${SCK.stone}"/>`, 1.6)
        + `<path d="M62 60V47h44v13z" fill="#3A3640"/><path d="M64 47h3.4v13H64zM74.6 47H78v13h-3.4zM85.3 47h3.4v13h-3.4zM96 47h3.4v13H96zM101.4 47h3.4v13h-3.4z" fill="#EEE8D6" stroke="${K}" stroke-width=".9"/>`
        + `<path d="M60 41.6h48M62 38.6v5M67 38.6v5M72 38.6v5M77 38.6v5M82 38.6v5M87 38.6v5M92 38.6v5M97 38.6v5M102 38.6v5M107 38.6v5" stroke="${K}" stroke-width=".9"/>`
        + `<path d="M67 27.6h5.4V36H67zM78.4 27.6h5.4V36h-5.4zM90 27.6h5.4V36H90zM100 27.6h4V36h-4z" fill="#2A2E3A"/><path d="M78.4 27.6h5.4V36h-5.4z" fill="${SCK.goldHi}"/><path d="M81.1 32.4q-1-1.4 0-2.8 1 1.4 0 2.8z" fill="#D9602E"/>`
        + `<path d="M54 68q-4-20 2.4-38 6 18 2 38zM112 58q-3.6-18 2.4-34 4.6 16 2 34z" fill="#16241C" stroke="${K}" stroke-width="1"/>`
        + `<path d="M10 4 4 16M52 18l-6 12M70 4l-6 12M100 18l-6 12M116 34l-5 10M18 54l-6 12M42 64l-6 12M88 0l-5 10M8 34 3 44" stroke="${SCK.white}" stroke-width=".8" opacity=".3"/>`;
    } },

  /* a Paris café terrace on the boulevard: under the striped awning a round marble table with a stack of books, a cup of coffee and an open notebook between two woven bistro chairs; across the street the old Romanesque bell tower with its slate spire and the cream stone houses */
  cafe_flore: {
    label: 'A esplanada de um café parisiense com livros e uma xícara, junto a uma torre de igreja',
    rx: /\b(cafe|esplanada|xicara)\b/,
    draw: () => {
      const K = SCK.ink, C = SCH.uid('cc'), chair = (x, y, s) => `<use href="#${C}" transform="translate(${x} ${y}) scale(${s})"/>`;
      return SCH.bg('#D3DEDD') + `<defs><g id="${C}">` + SCH.g(`<path d="M-5 0-4.4-10M5 0l-.6-10" fill="none" stroke="#9A6A34" stroke-width="2"/><path d="M-5-22q0-3 5-3t5 3v11H-5z" fill="${SCK.green}" stroke="#9A6A34" stroke-width="2"/>
        <path d="M-4-19.4h8M-4-16.4h8M-4-13.4h8" fill="none" stroke="${SCK.white}" stroke-width="1.2"/><path d="M-6.4-11h12.8v2.6H-6.4z" fill="#B07A3E" stroke-width="1"/>`, 1) + `</g></defs>`
        + SCH.g(`<path d="M0 52V15h66v37z" fill="#E6DCC2"/><path d="M-1 15 4 7h58l5 8z" fill="#6E7A86"/><path d="M0 42h66v10H0z" fill="#5E5248"/>`, 1.3)
        + `<path d="M4 22.5h54M4 34.5h54" stroke="#4A4E58" stroke-width="7" stroke-dasharray="4 6"/><path d="M2 28.4h62M2 40h62" stroke="${K}" stroke-width="1.2"/><path d="M6 44h8v8H6zM28 44h8v8h-8zM50 44h8v8h-8z" fill="#2E2824"/>`
        + SCH.g(`<path d="M98 52V36l22-5v21z" fill="#BDB298"/><path d="M71 52V19h22v33z" fill="${SCK.stone}"/><path d="M93 19l5-2.4V52h-5z" fill="${SCK.stoneLo}"/>
          <path d="M69.6 19.4 82 1l16 15.6v2.8z" fill="#4E5660"/><path d="M69.6 18h24v2.8h-24zM70 32.4h23V35H70z" fill="${SCK.stoneLo}" stroke-width="1"/>`, 1.5)
        + `<path d="M93 18 82 1" stroke="${K}" stroke-width=".7" opacity=".5"/>`
        + `<path d="M74 30.4V24a2 2 0 0 1 4 0v6.4zM78.6 30.4V24a2 2 0 0 1 4 0v6.4zM85 30.4V24a2 2 0 0 1 4 0v6.4zM89.4 30.4V24a1.8 1.8 0 0 1 2.6-1.6v8zM80.6 44.6V39a1.4 1.4 0 0 1 2.8 0v5.6z" fill="#3A3E46"/><path d="M74 39.6q3.6-5 7.2 0M82.8 39.6q3.6-5 7.2 0M76 47v5M88 47v5" stroke="${SCK.stoneLo}" stroke-width="1.2" fill="none"/>`
        + `<path d="M0 50h120v6H0z" fill="#77746C"/><path d="M0 56h120v24H0z" fill="#C2B79C"/><path d="M0 56h120M0 63h120M0 71h120M14 56 8 80M42 56l-2 24M72 56l2 24M102 56l6 24" stroke="#A39878" stroke-width=".8"/>`
        + SCH.g(`<path d="M0 0H70L66 8H0z" fill="${SCK.white}"/><path d="M0 7h66v3q-3.3 3.4-6.6 0-3.3 3.4-6.6 0-3.3 3.4-6.6 0-3.3 3.4-6.6 0-3.3 3.4-6.6 0-3.3 3.4-6.6 0-3.3 3.4-6.6 0-3.3 3.4-6.6 0-3.3 3.4-6.6 0-3.3 3.4-6.6 0z" fill="#3E6B4A"/>`, 1.4)
        + `<path d="M3.3 3.5h64" stroke="#3E6B4A" stroke-width="7" stroke-dasharray="3.4 6.6"/>`
        + chair(116, 72, .7) + SCH.g(`<path d="M104 61v10M100 71h8" fill="none" stroke="#2E2A26" stroke-width="1.6"/><ellipse cx="104" cy="61" rx="9" ry="2.6" fill="${SCK.white}"/>`, 1.1)
        + chair(11, 80, 1.1) + chair(86, 80, 1.1)
        + SCH.g(`<path d="M46 72v6M39 79h14" fill="none" stroke="#2E2A26" stroke-width="2.4"/><ellipse cx="46" cy="66.6" rx="28" ry="8" fill="${SCK.white}"/>
          <path d="M23 62.6h19.4V66H23z" fill="${SCK.red}"/><path d="M24.4 59.2h17v3.4h-17z" fill="${SCK.teal}"/><path d="M26 55.8h14v3.4H26z" fill="${SCK.gold}"/>
          <ellipse cx="56" cy="66.4" rx="4.8" ry="1.5" fill="${SCK.white}"/><path d="M52.6 60.8h6.8l-1 5h-4.8z" fill="${SCK.white}"/><path d="M59.2 61.8q2.4.4.8 2.6" fill="none" stroke-width="1"/>
          <path d="M57 71.4l8-2.8 8 2.8-8 3z" fill="${SCK.paper}" stroke-width="1"/>`, 1.3)
        + `<path d="M39.4 57.4h-.1M41 60.8h-.1M41 64.2h.1" stroke="${SCK.white}" stroke-width="1.6"/><ellipse cx="56" cy="60.8" rx="3.4" ry=".9" fill="#5E3A1E"/>`
        + `<path d="M59.6 71.2l5-1.6M61 72.4l4.6-1.6M65.6 70.8l4.6 1.4M65 72.2l4 1.2M65 68.6v5.8" stroke="${K}" stroke-width=".6" opacity=".7"/><path d="M69 67.4l6 4.2" stroke="${SCK.burg}" stroke-width="1.4" stroke-linecap="round"/>`;
    } },
});
