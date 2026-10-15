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
        + SCH.g(`<path d="M82 71.6Q83 60 94 59.4 105 60 106 71.6z" fill="${SCK.gold}"/><ellipse cx="94" cy="71.6" rx="14" ry="3.6" fill="${SCK.gold}"/>`, 1.5)
        + `<path d="M89.6 74.8a4.4 2.6 0 0 1 8.8 0z" fill="${SCK.ochre}" stroke="${K}" stroke-width="1.1"/><path d="M87 66q2-4 6-5" stroke="${SCK.goldHi}" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M99 63.4l1.6 3.6-2.4 2" stroke="${SCK.goldLo}" stroke-width="1.1" fill="none"/>`;
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

  /* the concert platform: the choir on its risers in black with white scores, the kettledrums behind, the strings in their half-circle, and in front the empty podium with the open score on its desk */
  sinfonia_coro: {
    label: 'Uma orquestra e um coro num palco de concerto',
    rx: /\b(orquestra|coro|sinfonia|regente)\b/,
    draw: () => {
      const K = SCK.ink, f = n => n.toFixed(1);
      const id = SCH.uid('ch');
      const ce = SCH.uid('ce'); let pl = '', ph = '', vio = '', cel = '';
      const seat = (x, y) => {
        ph += `M${f(x)} ${f(y - 7.4)}h0`; pl += `M${f(x)} ${f(y - 3.4)}v2.6`;
        if (x < 60) vio += `M${f(x + .6)} ${f(y - 4.6)}l3.4-1.8M${f(x - 1.6)} ${f(y - 8.6)}l7.4 5`;
        else cel += `<use href="#${ce}" x="${f(x + 3.4)}" y="${f(y - 4.6)}"/>`; };
      [198, 214, 230, 246, 294, 310, 326, 342].forEach(a => { const t = a * Math.PI / 180; seat(60 + 54 * Math.cos(t), 72 + 24 * Math.sin(t)); });
      for (let a = 205; a <= 336; a += 21.8) { const t = a * Math.PI / 180; seat(60 + 34 * Math.cos(t), 71 + 13 * Math.sin(t)); }
      const riser = y => `<path d="M0 ${y}h120v2.6H0z" fill="#8A5A34" stroke="${K}" stroke-width=".8"/>`, row = (y, dx) => `<rect x="-8" y="${y}" width="136" height="9" fill="url(#${id})" transform="translate(${dx} 0)"/>`;
      return SCH.bg('#6E4426') + `<defs><pattern id="${id}" width="7" height="9" patternUnits="userSpaceOnUse"><path d="M.3 9.4Q.3 4.6 3.5 4.6t3.2 4.8z" fill="#17120E"/><circle cx="3.5" cy="2.6" r="1.9" fill="#E2C29A" stroke="${K}" stroke-width=".7"/><path d="M2 6.4h3v2.2H2z" fill="${SCK.white}"/></pattern></defs>`
        + `<path d="M10 0v40M30 0v40M50 0v40M70 0v40M90 0v40M110 0v40" stroke="#5A3418" stroke-width="1.2"/>`
        + row(5, 0) + riser(13.4) + row(13, 3.5) + riser(21.4) + row(21, 0) + riser(29.4) + row(29, 3.5)
        + `<path d="M0 39h120v41H0z" fill="#B98A5A"/><path d="M0 39h120" stroke="${K}" stroke-width="1.4"/>`
        + `<path d="M0 50h120M0 62h120M0 74h120" stroke="#9C7046" stroke-width=".8"/>`
        + SCH.g(`<path d="M42 42h13q0 7-6.5 8-6.5-1-6.5-8zM65 42h13q0 7-6.5 8-6.5-1-6.5-8z" fill="#B8732E"/><ellipse cx="48.5" cy="42" rx="6.5" ry="1.8" fill="${SCK.white}"/><ellipse cx="71.5" cy="42" rx="6.5" ry="1.8" fill="${SCK.white}"/>`, 1.2)
        + `<path d="M44.6 51v3M52.4 51v3M67.6 51v3M75.4 51v3" stroke="${K}" stroke-width="1.2"/>`
        + `<path d="${pl}" stroke="#17120E" stroke-width="6.4" stroke-linecap="round"/><path d="${ph}" stroke="${K}" stroke-width="5.4" stroke-linecap="round"/><path d="${ph}" stroke="#E2C29A" stroke-width="3.8" stroke-linecap="round"/>`
        + `<path d="${vio}" stroke="#A8642E" stroke-width="1.8" stroke-linecap="round"/>`
        + `<defs><path id="${ce}" d="M0 0c2.4 0 2.4 2.6 1.2 3.4 1.6.6 1.6 4-1.2 4s-2.8-3.4-1.2-4C-2.4 2.6-2.4 0 0 0zm0 0v-6"/></defs><g fill="${SCK.wood}" stroke="${K}" stroke-width=".8">${cel}</g>`
        + SCH.g(`<path d="M48 70h24v9H48z" fill="${SCK.wood}"/><path d="M60 70v-6" fill="none" stroke-width="1.4"/><path d="M50 58h20l2 6H48z" fill="#3A2A1C" stroke-width="1.2"/>
          <path d="M51 58.6 60 58l.4 5H49.6zM69 58.6 60 58l-.4 5h10.8z" fill="${SCK.white}" stroke-width=".9"/>`, 1.5)
        + `<path d="M52 60h6M51.6 61.6h6.4M62 60h6M62 61.6h6.4" stroke="${K}" stroke-width=".5" opacity=".7"/><path d="M54 56.6l14 4" stroke="${SCK.white}" stroke-width="1"/>`;
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
        const step = (x1 - x0) / 5;
        for (let i = 0; i < 5; i++) { const xa = x0 + step * (i + .25), xb = x0 + step * (i + .72);
          [.2, .46, .72].forEach((r, j) => { const r2 = r + .14, ya = x => Y(x, t0, t1) + (Y(x, b0, b1) - Y(x, t0, t1)) * r, yb = x => Y(x, t0, t1) + (Y(x, b0, b1) - Y(x, t0, t1)) * r2;
            const d = `M${f(xa)} ${f(ya(xa))}L${f(xb)} ${f(ya(xb))}V${f(yb(xb))}L${f(xa)} ${f(yb(xa))}z`;
            if ((i * 3 + j) % lit === 1) wl += d; else wd += d; }); } };
      facade(0, 42, 6, 30, 58, 47, 4); facade(120, 80, 9, 31, 58, 47, 3);
      for (let i = 0; i < 26; i++) { q = (q * 37 + 11) % 101; const x = (i * 47 + q) % 120, y = (i * 29 + q * 3) % 78; snow += `M${x} ${y}h0`; }
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
        + `<g transform="translate(44 74) scale(-1.1 1.1)">` + SCH.g(`<path d="M-9-8C-11-11-10-15-6-15H4C6-15 7-17 9-19L12-22 16-18 15.4-16.4 12-17C10.6-15 10-12 9-9 6-7-6-7-9-8Z" fill="#3A2A20" stroke-width="1.3"/>
          <path d="M8-8 9 0M5.6-8 5 0M-5.6-8-6.4-4-5.6 0M-8-8.6-9.4-4.4-9 0M-9.4-13q-3 2-2.6 8" fill="none" stroke-width="1.8"/>`, 1.2) + `</g>`
        + SCH.g(`<path d="M76 60 50 55" fill="none" stroke="#3A2A20" stroke-width="1.8"/><path d="M73 36h25v3H73z" fill="#2A221C"/><path d="M74 39h22l1 18q0 6-6 6H79q-5-3-5-10z" fill="#2E2620"/>
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
        + SCH.g(`<path d="M34 44c-2-4 1-7 5-6l-4-6M38 40c2-6 7-8 6-12" fill="none" stroke-width="1.2"/>`, 1)
        + SCH.g(`<path d="M36 47c-6 0-8-6-3-8 3-2 6 0 7 2z" fill="#6B4426"/><path d="M38 47c0-11 9-17 21-17s23 5 24 17z" fill="#8A5A34"/>`, 1.6)
        + `<path d="M46 47c-1-6 1-11 4-14M54 47c-1-7 0-12 2-16M62 47c0-7 1-12 3-15.6M70 47c1-6 2-10 4-12.6M77 47c1-4 1.6-7 3-9" stroke="#5E3A1E" stroke-width="1.4" fill="none"/>`
        + `<path d="M44 37q6-5 13-5.4" stroke="#B9844E" stroke-width="1.8" fill="none" stroke-linecap="round"/>`
        + SCH.g(`<path d="M47 34l-5-8-6-2M50 32l-2-9-5-5M58 30.6l1-9-3-6M62 30.6l5-8 1-6M70 32l6-7 5-1M74 34l8-4 5 1" fill="none" stroke-width="1.4"/>`, 1)
        + SCH.g(`<path d="M98 52h20v18H98z" fill="${SCK.wood}"/><path d="M98 60h20" fill="none" stroke-width="1"/><circle cx="108" cy="44" r="6" fill="${SCK.white}"/><path d="M102 39a3 3 0 0 1 4-3zM110 36a3 3 0 0 1 4 3z" fill="${SCK.gold}" stroke-width="1.1"/><path d="M104 49.4l-1.6 2.6M112 49.4l1.6 2.6" fill="none" stroke-width="1.2"/>`, 1.5)
        + `<path d="M108 44v-4M108 44l2.6 1.4" stroke="${K}" stroke-width="1.2" stroke-linecap="round"/><path d="M107.4 64h1.2" stroke="${K}" stroke-width="2" stroke-linecap="round"/>`;
    } },

  /* the farmyard: a pig standing upright on its hind legs before the red barn, a sheep, the big cart horse and two hens looking on */
  fazenda_bichos: {
    label: 'Um porco de pé sobre duas patas diante de um celeiro, com outros animais',
    rx: /\b(porco|porcos|fazenda|celeiro)\b/,
    draw: () => {
      const K = SCK.ink, PK = '#E6A99B', PD = '#C98274';
      const H = SCH.uid('hn'), hen = (x, c) => `<use href="#${H}" x="${x}" y="74" fill="${c}"/>`;
      return SCH.bg('#C6DCE0') + `<defs><g id="${H}">` + SCH.g(`<path d="M-4-1C-6-4-5-8-2-7-1-10 1-11 2.4-9.4L4.4-9 3-7.6C4-6 4-2 0-.6z"/><path d="M1-10.6l.6-1.6 1 .8z" fill="${SCK.red}" stroke-width=".6"/><path d="M-1-.6v1M1-.6v1" fill="none" stroke-width=".9"/>`, 1) + `</g></defs>` + `<ellipse cx="24" cy="12" rx="13" ry="2.6" fill="${SCK.white}" opacity=".8"/>`
        + `<path d="M0 46q30-8 60-4t60 0v20H0z" fill="#8FAE78"/>`
        + SCH.g(`<path d="M62 60V30L87 11l25 19v30z" fill="${SCK.red}"/><path d="M58.6 32.6 87 10.6l28.4 22" fill="none" stroke-width="4"/><path d="M58.6 32.6 87 10.6l28.4 22" fill="none" stroke="${SCK.white}" stroke-width="1.6"/>
          <path d="M75 60V39h24v21z" fill="#7E1414" stroke="${SCK.white}" stroke-width="1.8"/><path d="M83 21h8v8h-8z" fill="#5A1010" stroke="${SCK.white}" stroke-width="1.4"/>`, 1.6)
        + `<path d="M75 39l12 21M87 39 75 60M87 39l12 21M99 39 87 60M87 39v21" stroke="${SCK.white}" stroke-width="1.4"/><path d="M66 34v26M108 34v26" stroke="#7E1414" stroke-width="1"/>`
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

  /* the Gulf Stream at sundown: an old wooden skiff with a patched sail, a great marlin lashed along its side, longer than the boat, a gull overhead and the low sun on the water */
  velho_e_o_mar: {
    label: 'Um pequeno barco a remo com um enorme marlim preso ao lado',
    rx: /\b(marlim|peixe|esquife|barco a remo)\b/,
    draw: () => {
      const K = SCK.ink;
      return SCH.bg('#EBCB98') + `<path d="M0 30h120v14H0z" fill="#E5B47E"/>` + SCH.sun(92, 44, 11, SCK.goldHi)
        + `<path d="M0 44h120v36H0z" fill="#3F6A86"/><path d="M84 48h16M86 52h12M88 56h8" stroke="${SCK.goldHi}" stroke-width="1.4" stroke-linecap="round"/>`
        + SCH.waves(68, '#6D95AD', 1.2)
        + `<path d="M16 16q3-3 6 0 3-3 6 0" stroke="${K}" stroke-width="1.4" fill="none"/><path d="M104 12q2-2 4 0 2-2 4 0" stroke="${K}" stroke-width="1" fill="none"/>`
        + SCH.g(`<path d="M49 54V12" fill="none" stroke-width="1.8"/><path d="M50 13Q63 13 75 18q5 15 3 32H50z" fill="${SCK.white}"/><path d="M49 50h31" fill="none" stroke-width="2"/>
          <path d="M55 19.6l8-.6.6 8.4-8 .4zM64.4 32.6l8.6.4-.4 9-8.4-.6zM53 39.6h7.4l-.4 7h-7z" fill="${SCK.sand}" stroke-width=".9"/>
          <path d="M22 47q4 3 10 3.4 30 1.6 64 3.6-4 9-12 10H40q-12-3-18-17z" fill="${SCK.wood}"/>`, 1.6)
        + `<path d="M30 55q24 2 62 3M36 59q20 1.6 50 2" stroke="#5E3A1E" stroke-width=".9" fill="none"/>`
        + SCH.g(`<path d="M6 61.4 26 60" fill="none" stroke-width="1.6"/><path d="M38 56l6-11 10 9z" fill="#36456E"/><path d="M98 62 112 52l-5 10 6 9z" fill="#36456E"/>
          <path d="M24 60c4-4 10-5 16-5 22 0 44 2 58 6-14 3-36 6-58 5-6 0-12-2-16-6z" fill="#36456E"/>`, 1.4)
        + `<path d="M26 61.6c6 3 10 4 16 4 22 0 42-2 54-4" stroke="#D9DEE0" stroke-width="2.4" fill="none"/>`
        + `<path d="M48 57v6M60 57v7M72 57.6v6.4M84 59v4" stroke="#8A9AC8" stroke-width="1.2"/><circle cx="31" cy="59" r="1" fill="${SCK.white}"/>`
        + `<path d="M34 52 32 64M92 55l2 8" stroke="#C9A66B" stroke-width="1.2"/>`
        + `<path d="M0 64q10-3 20 0t20 0 20 0 20 0 20 0 20 0v16H0z" fill="#3F6A86" opacity=".75"/>` + SCH.waves(74, '#6D95AD', 1.2);
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

  /* Lisbon: a yellow tram grinding up a steep street of tiled houses, the Tagus shining below, and at a café table on the pavement three little coffee cups, three empty chairs and an open notebook */
  eletrico_lisboa: {
    label: 'Um bonde amarelo subindo uma ladeira de Lisboa e uma mesa de café com três xícaras',
    rx: /\b(eletrico|bonde|lisboa|xicara|xicaras)\b/,
    draw: () => {
      const K = SCK.ink, id = SCH.uid('az');
      const chair = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s} ${Math.abs(s)})">` + SCH.g(`<path d="M-4-10-5 0M4-10 5 0M-5.4-10h10.8M-4.6-10v-11" fill="none" stroke="#2E2A26" stroke-width="1.8"/>`, 1) + `</g>`;
      return SCH.bg('#CFE2EA') + `<defs><pattern id="${id}" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0 0h5v5H0z" fill="#E9EEF0"/><path d="M2.5.6 4.4 2.5 2.5 4.4.6 2.5z" fill="#3F6FA0"/></pattern></defs>`
        + `<path d="M70 34q14-6 26-3 12-4 24 0v6H70z" fill="#9FB0A0"/><path d="M70 36h50v12H70z" fill="${SCK.sea}"/><path d="M78 40h10M96 42h14M84 45h8" stroke="#BFD3D9" stroke-width="1" stroke-linecap="round"/>`
        + `<path d="M100 38V30l5 7z" fill="${SCK.white}" stroke="${K}" stroke-width=".7"/>`
        + SCH.g(`<path d="M0 46V10h24v38zM24 48V16h26v4l22 2v32z" fill="url(#${id})"/><path d="M50 52V20h22v34z" fill="${SCK.gold}"/><path d="M-1 10h26M23 16h28M49 20h24" fill="none" stroke="#B5532F" stroke-width="2.6"/>`, 1.5)
        + `<path d="M4 16h5v9H4zM14 16h5v9h-5zM4 31h5v9H4zM14 31h5v9h-5zM29 22h5v9h-5zM39 23h5v9h-5zM29 37h5v9h-5zM39 38h5v9h-5zM55 26h5v9h-5zM64 27h5v9h-5zM55 41h5v8h-5zM64 42h5v8h-5z" fill="#2E3A48" stroke="${SCK.white}" stroke-width="1"/>`
        + `<path d="M3 25.6h7M13 25.6h7M28 31.6h7M38 32.6h7M54 35.6h7M63 36.6h7" stroke="${K}" stroke-width="1.2"/>`
        + `<path d="M0 6 120 26" stroke="${K}" stroke-width=".7"/>`
        + `<path d="M0 44l120 16v16L0 60z" fill="#8C8478"/><path d="M0 52.6 120 69M0 55.4 120 72" stroke="#5A5248" stroke-width=".9"/>`
        + `<g transform="translate(42 54) rotate(7.6)">` + SCH.g(`<path d="M-1-22 14-38" fill="none" stroke-width="1.2"/><path d="M-20-2V-18h40V-2z" fill="${SCK.gold}"/><path d="M-21-18q0-4 4-4h34q4 0 4 4z" fill="${SCK.white}"/>
          <path d="M-17-16h7v7h-7zM-8-16h7v7h-7zM1-16h7v7H1zM10-16h7v7h-7z" fill="#9FC0CF" stroke="#7A4E2C" stroke-width="1.3"/><path d="M-14 0a2.4 2.4 0 0 0 4.8 0M10 0a2.4 2.4 0 0 0 4.8 0" fill="#2E2A26" stroke-width="1"/>`, 1.5)
        + `<path d="M-20-7h40" stroke="${SCK.white}" stroke-width="1.2"/><circle cx="-18" cy="-4.4" r="1.2" fill="${SCK.goldHi}" stroke="${K}" stroke-width=".7"/></g>`
        + `<path d="M0 60l120 16v4H0z" fill="#ECE6D6"/><path d="M0 69q5-3 10 0t10 0 10 0 10 0 10 0M0 74.6q5-3 10 0t10 0 10 0 10 0 10 0 10 0 10 0M0 79.4q5-3 10 0t10 0 10 0 10 0 10 0 10 0 10 0 10 0" stroke="#6E685E" stroke-width="1" fill="none" opacity=".55"/>`
        + chair(30, 70, -.7) + chair(9, 80, 1) + chair(46, 80, -1)
        + SCH.g(`<path d="M27 70v9M22 79h10" fill="none" stroke="#2E2A26" stroke-width="2"/><ellipse cx="27" cy="69" rx="16" ry="4.2" fill="${SCK.white}"/>`, 1.4)
        + SCH.g(`<path d="M15.6 64.8h6l-.8 3.4h-4.4zM24 63.2h6l-.8 3.4h-4.4zM32.4 64.8h6l-.8 3.4h-4.4z" fill="${SCK.white}" stroke-width=".9"/><path d="M21 72.4l6-1.8 6 1.8-6 2z" fill="${SCK.paper}" stroke-width=".8"/>`, 1)
        + `<path d="M16.4 65.2h4.4M24.8 63.6h4.4M33.2 65.2h4.4" stroke="#5E3A1E" stroke-width="1"/><path d="M14.6 68.4h8M23 66.8h8M31.4 68.4h8" stroke="${K}" stroke-width=".9"/><path d="M27 70.6v3.8" stroke="${K}" stroke-width=".6"/>`;
    } },

  /* a summer night by a lake below the Alps: a lightning bolt splits the storm over the mountains, and on the dark hillside the columned villa stands lit by the flash, one window glowing with a candle */
  villa_diodati: {
    label: 'Uma casa senhorial à beira de um lago sob uma tempestade de relâmpagos',
    rx: /\b(villa diodati|lago de genebra|relampago|relampagos)\b/,
    draw: () => {
      const K = SCK.ink;
      return SCH.bg(SCK.night) + `<path d="M0 0h120v16q-10 6-22 2-10 6-22 0-12 6-24 1-12 6-26 0-12 4-26-2z" fill="#1E2940"/><path d="M8 20q12 4 22 0 10 5 22 0" stroke="#43557A" stroke-width="2" fill="none" stroke-linecap="round"/>`
        + `<path d="M0 46 14 34l10 6 14-14 12 10 10-6 14 12 10-8 12 8 10-6 14 10v4H0z" fill="#5E6A80"/><path d="M34 30l4-4 5 4-4 1zM56 32l4-2 5 4zM84 36l4-2 4 3z" fill="${SCK.white}" opacity=".9"/>`
        + `<path d="M24 0 44 0 38 14 46 14 28 44 33 22 24 22z" fill="${SCK.white}" opacity=".18"/>`
        + SCH.g(`<path d="M30 0h8l-4 12h7l-12 22 3-15h-6z" fill="${SCK.goldHi}"/>`, 1.2)
        + `<path d="M0 46h120v34H0z" fill="#33496A"/><path d="M32 50v8M33 62v5" stroke="${SCK.goldHi}" stroke-width="1.6" opacity=".6"/><path d="M8 54h14M48 58h12M16 66h10" stroke="#5A7090" stroke-width="1" stroke-linecap="round"/>`
        + `<path d="M50 80V70q24-20 70-24v34z" fill="#26372E"/>`
        + `<path d="M58 72q20-14 50-18M64 76q20-12 52-16" stroke="#3A5040" stroke-width="1" fill="none"/>`
        + SCH.g(`<path d="M66 60V34h40v26z" fill="#DCD5C2"/><path d="M62 35 72 26h28l10 9z" fill="#7A6E66"/><path d="M64 46h44v3H64z" fill="${SCK.stone}"/>`, 1.5)
        + `<path d="M66 60V49h40v11z" fill="#3E3A40"/><path d="M68 49h3v11h-3zM78 49h3v11h-3zM91 49h3v11h-3zM101 49h3v11h-3z" fill="#E8E2D0" stroke="${K}" stroke-width=".9"/>`
        + `<path d="M64 44h44M66 41v5M72 41v5M78 41v5M84 41v5M90 41v5M96 41v5M102 41v5" stroke="${K}" stroke-width=".9"/>`
        + `<path d="M71 31.4h5v7h-5zM81 31.4h5v7h-5zM91 31.4h5v7h-5zM101 31.4h3.6v7H101z" fill="#2A2E3A"/><path d="M81 31.4h5v7h-5z" fill="${SCK.goldHi}"/><path d="M83.5 34.6q-.8-1.2 0-2.4.8 1.2 0 2.4z" fill="#D9602E"/>`
        + `<path d="M58 66q-3-18 2-34 5 16 2 34zM112 58q-3-16 2-30 4 14 2 30z" fill="#1A2620" stroke="${K}" stroke-width="1"/>`
        + `<path d="M10 4l-6 12M50 22l-6 12M70 10l-6 12M96 14l-6 12M112 30l-6 12M18 50l-6 12M44 62l-6 12M86 0l-6 12" stroke="${SCK.white}" stroke-width=".8" opacity=".35"/>`;
    } },

  /* the café terrace on the boulevard in Paris: little round marble tables and woven chairs under the awning, a stack of books, a cup and an open notebook; across the street the old Romanesque bell tower */
  cafe_flore: {
    label: 'A esplanada de um café parisiense com livros e uma xícara, junto a uma torre de igreja',
    rx: /\b(cafe|esplanada|xicara)\b/,
    draw: () => {
      const K = SCK.ink;
      const C = SCH.uid('cc'), chair = (x, y, s) => `<use href="#${C}" transform="translate(${x} ${y}) scale(${s})"/>`;
      return SCH.bg('#D5DEDC') + `<defs><g id="${C}">` + SCH.g(`<path d="M-5 0v-17q0-3 5-3t5 3V0" fill="none" stroke="#9A6A34" stroke-width="2.2"/><path d="M-4-16h8M-4-13h8M-4-10h8" fill="none" stroke="${SCK.green}" stroke-width="1.6"/><path d="M-6-6h12v2h-12z" fill="#9A6A34" stroke-width="1"/>`, 1) + `</g></defs>`
        + `<path d="M100 50V30l10-8 10 8v20z" fill="#5A6068"/><path d="M98 50V36h22v14z" fill="${SCK.stone}"/>`
        + SCH.g(`<path d="M72 52V20h24v32z" fill="${SCK.stone}"/><path d="M70 21 84 4l14 17z" fill="#4E5660"/><path d="M71 20h26v2.6H71zM71 35h26v2.4H71z" fill="${SCK.stoneLo}" stroke-width="1"/>`, 1.5)
        + `<path d="M76 32v-6a2 2 0 0 1 4 0v6zM82 32v-6a2 2 0 0 1 4 0v6zM88 32v-6a2 2 0 0 1 4 0v6zM76 48v-6a2 2 0 0 1 4 0v6zM82 48v-6a2 2 0 0 1 4 0v6zM88 48v-6a2 2 0 0 1 4 0v6z" fill="#3A3E46"/>`
        + `<path d="M84 4V1" stroke="${K}" stroke-width="1"/><path d="M74 28h20M74 44h20" stroke="${K}" stroke-width=".6" opacity=".4"/>`
        + `<path d="M50 52V38" stroke="#5E4A34" stroke-width="2.4"/><path d="M38 36q-2-8 6-10 2-6 10-4 8-2 10 6 6 4 0 9-8 4-14 1-8 3-12-2z" fill="${SCK.olive}" stroke="${K}" stroke-width="1.2"/>`
        + `<path d="M0 50h120v6H0z" fill="#8C8A82"/><path d="M0 56h120v24H0z" fill="${SCK.stone}"/><path d="M0 62h120M0 70h120M20 56l-6 24M50 56l-4 24M80 56l-2 24M110 56v24" stroke="${SCK.stoneLo}" stroke-width=".8"/>`
        + SCH.g(`<path d="M0 0h66v8q-3.3 4-6.6 0-3.3 4-6.6 0-3.3 4-6.6 0-3.3 4-6.6 0-3.3 4-6.6 0-3.3 4-6.6 0-3.3 4-6.6 0-3.3 4-6.6 0-3.3 4-6.6 0-3.3 4-6.6 0H0z" fill="#3E6B4A"/>`, 1.4)
        + `<path d="M0 5h66" stroke="${SCK.white}" stroke-width="1.2"/>`
        + chair(10, 62, .8) + SCH.g(`<path d="M24 62v-8M20 62h8" fill="none" stroke="#2E2A26" stroke-width="1.4"/><ellipse cx="24" cy="54" rx="9" ry="2.4" fill="${SCK.white}"/>`, 1.1) + chair(38, 62, .8)
        + chair(16, 80, 1.1) + chair(96, 80, 1.1)
        + SCH.g(`<path d="M56 68v11M50 79h12" fill="none" stroke="#2E2A26" stroke-width="2"/><ellipse cx="56" cy="67" rx="22" ry="5.4" fill="${SCK.white}"/>`, 1.5)
        + SCH.g(`<path d="M38 64.4h16v2.6H38z" fill="${SCK.red}"/><path d="M39 61.8h14v2.6H39z" fill="${SCK.sea}"/><path d="M40 59.2h12v2.6H40z" fill="${SCK.gold}"/>
          <path d="M58 67.6l7-2 7 2-7 2.4z" fill="${SCK.paper}"/><path d="M68 62.6h6l-.8 3h-4.4z" fill="${SCK.white}"/>`, 1)
        + `<path d="M65 65.6v4.4M60 67.4l4 .8M66 68.2l4-.8" stroke="${K}" stroke-width=".6"/><path d="M66.4 66h8.8" stroke="${K}" stroke-width="1"/><path d="M68.8 62.8h4.4" stroke="#5E3A1E" stroke-width="1"/>`;
    } },
});
