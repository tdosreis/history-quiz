/* Ciência — the scenes of the scientists and inventors: their gardens, desks, benches and workshops, from the apple tree to the cloned sheep (conventions in _core.js) */
Object.assign(SCENE, {
  /* Woolsthorpe in late summer: the old apple tree heavy with red fruit, one apple dropping towards an open book in the grass, the grey stone manor behind */
  macieira_newton: {
    label: 'Uma maçã caindo de uma macieira sobre um livro aberto',
    rx: /\b(maca|macas|macieira|gravitacao|gravidade)\b/,
    draw: () => {
      const K = SCK.ink;
      const fruit = [[10, 24], [22, 13], [36, 20], [48, 9], [58, 22], [17, 35], [31, 31], [45, 33], [56, 38], [64, 12]];
      return SCH.bg('#C4D8DC') + `<ellipse cx="100" cy="10" rx="14" ry="2.6" fill="${SCK.white}" opacity=".7"/>`
        + `<path d="M0 50q30-8 62-5t58-3v14H0z" fill="#A3B88F"/>`
        + SCH.g(`<path d="M83 29h4v-8h-4zM107 29h4v-8h-4z" fill="${SCK.stone}"/><path d="M77 37l6-10h28l6 10z" fill="#6E6A66"/><path d="M80 56V37h34v19z" fill="#D9CDA8"/><path d="M94 56v-8h6v8z" fill="${SCK.wood}" stroke-width="1.1"/>`, 1.4)
        + `<path d="M84 40h5v5h-5zM94.5 40h5v5h-5zM105 40h5v5h-5zM84 48h5v5h-5zM105 48h5v5h-5z" fill="#4A4038"/><path d="M86.5 40v5M97 40v5M107.5 40v5M86.5 48v5M107.5 48v5" stroke="${SCK.stone}" stroke-width=".8"/>`
        + `<path d="M78 32h38M82 29.6h30" stroke="${K}" stroke-width=".7" opacity=".35"/>`
        + `<path d="M0 59q34-6 64-3t56-1v25H0z" fill="${SCK.green}"/>`
        + `<path d="M4 66l2-3M10 70l1-3M44 64l2-3M96 66l1-3M108 70l2-3M112 62l1-3M90 76l2-3" stroke="#4A6636" stroke-width="1.2" stroke-linecap="round"/>`
        + SCH.g(`<path d="M18 77q6-16 4-33l-9-9 3-2.4 8 7q1-7-2-14l4-1q3 8 1 17l8-9 3 2.4-10 11q-1 16 5 31z" fill="#6B4A2E"/>`, 1.6)
        + SCH.g(`<path d="M6 41a9 9 0 0 1-3-16 10 10 0 0 1 10-16 12 12 0 0 1 21-4 12 12 0 0 1 21 2 10 10 0 0 1 12 14 9 9 0 0 1-4 16 10 10 0 0 1-16 6 12 12 0 0 1-21 0 11 11 0 0 1-20-2z" fill="#4E6B3C"/>`, 1.8)
        + `<path d="M12 22a8 8 0 0 1 10-10 10 10 0 0 1 16-2M42 10a9 9 0 0 1 16 4M8 34a8 8 0 0 1 6-8M28 40a9 9 0 0 1 14-6M50 30a8 8 0 0 1 12-2" stroke="#7E9E62" stroke-width="2.2" fill="none" stroke-linecap="round"/>`
        + SCH.g(fruit.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.7" fill="${SCK.red}"/>`).join(''), 1)
        + `<path d="${fruit.map(([x, y]) => `M${x - 1} ${y - 1}h0`).join('')}" stroke="#E07A6A" stroke-width="1.2" stroke-linecap="round"/>`
        + `<path d="M71 37v6M67.6 40v5M74.4 40v5" stroke="${K}" stroke-width="1" stroke-linecap="round" opacity=".55"/>`
        + SCH.g(`<circle cx="71" cy="51" r="3.6" fill="${SCK.red}"/><path d="M71 47.6q.4-2 2-2.6" fill="none" stroke-width="1"/><path d="M72.4 46q3-2 4.6 0-2.6 1.6-4.6 0z" fill="#7E9E62" stroke-width=".8"/>`, 1.2)
        + `<path d="M69.6 49.6h0" stroke="#E07A6A" stroke-width="1.4" stroke-linecap="round"/>`
        + SCH.g(`<path d="M50 74.6l.8-1.8h40.4l.8 1.8q-10-1.2-21 1.2-11-2.4-21-1.2z" fill="${SCK.burg}"/><path d="M71 67q-9-3.4-18-1.4l-2 7.6q10-2 20 1.4zM71 67q9-3.4 18-1.4l2 7.6q-10-2-20 1.4z" fill="${SCK.paper}"/>`, 1.3)
        + `<path d="M55 68.6q6-1 13 .8M54.4 71q6-1 13 .8M74 69.4q7-1.8 13-.8M74.4 71.8q7-1.8 13-.8" stroke="${K}" stroke-width=".7" fill="none" opacity=".45"/>`;
    } },

  /* a scholar's desk of the 1640s by candlelight: a sheet with two crossed axes and a parabola on a faint grid, a brass box of spoked calculating wheels, Torricelli's glass tube of mercury standing in its dish, the quill in the inkwell */
  mesa_matematica: {
    label: 'Uma folha com eixos e uma curva, ao lado de uma caixa de rodas de calcular e um tubo de mercúrio',
    rx: /\b(plano cartesiano|eixos|grafico|parabola|pascalina|calculadora|barometro|mercurio)\b/,
    draw: () => {
      const K = SCK.ink;
      let grid = '';
      for (let i = 0; i < 6; i++) grid += `M${Math.round(370 + i * 64) / 10} 40v34M33 ${Math.round(436 + i * 64) / 10}h46`;
      const wheel = x => `<g transform="translate(${x} 56)"><circle r="3.6" fill="#3A2A18"/><path d="M-3.6 0h7.2M0-3.6v7.2M-2.5-2.5l5 5M2.5-2.5l-5 5" stroke="${SCK.goldHi}" stroke-width=".8"/><circle r="1.1" fill="${SCK.gold}"/><path d="M2.6 2.6l2 2" stroke="${K}" stroke-width="1.2"/></g>`;
      return SCH.bg('#5A2632') + `<path d="M0 4h120M40 4v26M80 4v26" stroke="#3E1520" stroke-width="1.2" opacity=".8"/>`
        + `<circle cx="100" cy="14" r="17" fill="${SCK.goldHi}" opacity=".16"/><circle cx="100" cy="14" r="10" fill="${SCK.goldHi}" opacity=".18"/>`
        + SCH.g(`<path d="M-2 30h124v52H-2z" fill="#8A5A34"/>`, 1.6)
        + `<path d="M0 36h28M40 34h40M0 62h8M0 76h30" stroke="#5E3A1E" stroke-width=".9" opacity=".6"/>`
        + `<g transform="rotate(-3 56 58)">` + SCH.g(`<path d="M32 39h47v38H32z" fill="${SCK.paper}"/>`, 1.4)
        + `<path d="${grid}" stroke="${K}" stroke-width=".5" opacity=".22"/>`
        + `<path d="M35 66h40M56 74V42" stroke="${K}" stroke-width="1.3"/><path d="M77 66l-3.6-1.8v3.6zM56 40l-1.8 3.6h3.6z" fill="${K}"/>`
        + `<path d="M42.4 42Q56 90 69.6 42" stroke="${SCK.red}" stroke-width="1.8" fill="none"/><path d="M46.4 53h0M65.6 53h0" stroke="${SCK.red}" stroke-width="2.6" stroke-linecap="round"/></g>`
        + SCH.g(`<path d="M5 68.6q0 4.4 10 4.4t10-4.4l-1-2.6H6z" fill="#6E4A2E"/><ellipse cx="15" cy="66" rx="9" ry="2.6" fill="#A3ACB2"/>
          <rect x="12.4" y="4" width="5.2" height="64" rx="2.6" fill="#D9E8EC"/><path d="M13.6 24.6q1.4-1.2 2.8 0V67h-2.8z" fill="#7E8A92" stroke-width=".8"/>`, 1.3)
        + `<path d="M14.2 7v15" stroke="${SCK.white}" stroke-width="1" stroke-linecap="round"/><path d="M19 24.6h3M19 30h2M19 35.4h3M19 40.8h2" stroke="${SCK.goldHi}" stroke-width=".9" opacity=".8"/>`
        + SCH.g(`<path d="M31 30.6q-1.6-13 13-27.6 1 9-4.6 17.6-3.4 5.4-8.4 10z" fill="${SCK.white}"/><path d="M31.6 34 42 9" fill="none" stroke-width=".8"/><path d="M26 39.4h10l-1-6h-8z" fill="#232020"/>`, 1.2)
        + SCH.g(`<ellipse cx="100" cy="40" rx="7" ry="2" fill="${SCK.goldLo}"/><path d="M98.4 39v-6h3.2v6z" fill="${SCK.gold}"/><path d="M94 33h12l-2-2h-8z" fill="${SCK.gold}"/><path d="M97.6 31V17h4.8v14z" fill="${SCK.white}"/>`, 1.2)
        + `<path d="M100 16.4q-3.2-4 0-9.4 3.2 5.4 0 9.4z" fill="${SCK.goldHi}"/><path d="M100 15.6q-1.4-2 0-4.4 1.4 2.4 0 4.4z" fill="#D9602E"/>`
        + SCH.g(`<path d="M83 61h36v7H83z" fill="${SCK.goldLo}"/><path d="M83 44h36v17H83z" fill="${SCK.gold}"/>`, 1.5)
        + `<path d="M86.4 46.6h4.8v3h-4.8zm8 0h4.8v3h-4.8zm8 0h4.8v3h-4.8zm8 0h4.8v3h-4.8z" fill="${SCK.paper}" stroke="${K}" stroke-width=".7"/><path d="M88.8 48.1h0m8 0h0m8 0h0m8 0h0" stroke="${K}" stroke-width="1.4" stroke-linecap="round"/>`
        + wheel(88.8) + wheel(96.8) + wheel(104.8) + wheel(112.8)
        + `<path d="M86 64.6h30" stroke="${SCK.goldHi}" stroke-width=".8" opacity=".7"/>`;
    } },

  /* the Galápagos, 1835: the little three-masted survey ship riding at anchor with her sails furled off a black volcanic island, a giant tortoise plodding over the lava shore, two finches with different beaks on a dead branch, a tree cactus */
  beagle_galapagos: {
    label: 'Um veleiro ancorado ao largo de uma ilha vulcânica, com uma tartaruga gigante e tentilhões',
    rx: /\b(beagle|galapagos|tentilhao|tentilhoes|tartaruga)\b/,
    draw: () => {
      const K = SCK.ink, B = '#5E4A34';
      /* a stubby ground finch facing right on the branch; c its plumage, b its beak */
      const finch = (x, y, c, b) => `<g transform="translate(${x} ${y})">` + SCH.g(`<path d="M-4 1-8.6 3.4-8 .6-4.4-1.6z" fill="${c}"/><path d="M-5 1q-1-5 3-6.4 1.4-3 4.6-2.4 3 .8 2.6 4.4Q5 2.4 0 3.4-3.4 4-5 1z" fill="${c}"/>${b}`, 1)
        + `<circle cx="2.8" cy="-4.6" r=".6" fill="${SCK.white}"/><path d="M-1 3.4v2.6M1.4 3.2v2.8" stroke="${K}" stroke-width=".8"/></g>`;
      return SCH.bg('#D3E0DF') + `<ellipse cx="30" cy="10" rx="16" ry="2.6" fill="${SCK.white}" opacity=".8"/><ellipse cx="94" cy="6" rx="10" ry="2" fill="${SCK.white}" opacity=".7"/>`
        + `<path d="M0 44h120v20H0z" fill="${SCK.sea}"/>`
        + SCH.g(`<path d="M54 48l12-7 9-15q5-7 11-7.6 6 .6 10 6.6l8 11q8 4 18 7v5z" fill="#47423F"/>`, 1.5)
        + `<path d="M64 44q6-3 12-1M86 30q5-1 8 3M98 40q6 0 10 3" stroke="#6E8C5A" stroke-width="2" fill="none" stroke-linecap="round"/>`
        + `<path d="M0 50q10-3 20 0m8 6q10-3 20 0" stroke="#86A6B8" stroke-width="1.2" fill="none"/>`
        + SCH.g(`<path d="M30 18V48M40 16V48M49 22V47M51 45l10-7" fill="none" stroke-width="1.3"/>
          <path d="M25 24h10M26 31h8M35 22h10M36 29h8M37 36h6M46 28h6" fill="none" stroke="${SCK.white}" stroke-width="1.8"/>
          <path d="M24 46h30l4-3-1.6 5.6q-1 3-4 3H28q-3 0-4-5.6z" fill="#2E2A26" stroke-width="1.2"/>`, 1)
        + `<path d="M25 47.6h31" stroke="${SCK.white}" stroke-width=".9"/><path d="M30 18 61 38M40 16l9 6M30 18l-6 28M49 22l5 24M57 48q2 4 1 8" stroke="${K}" stroke-width=".5" fill="none" opacity=".6"/>`
        + SCH.g(`<path d="M-2 64q20-4 44-2t80 0v20H-2z" fill="#B59A6A"/>`, 1.4)
        + `<path d="M6 70q4-2 8 0zM34 76q5-2 10 0zM96 74q5-2 9 0zM110 68q3-1.6 7 0z" fill="#5A4E44"/>`
        + SCH.g(`<path d="M110 72v-26q0-4-3-8M110 52q3-4 6-5" fill="none" stroke="${B}" stroke-width="2.6"/>`, 1)
        + SCH.g(`<g fill="#84A262"><ellipse cx="104" cy="35" rx="4.6" ry="7" transform="rotate(-20 104 35)"/><ellipse cx="113" cy="32" rx="4.4" ry="6.6" transform="rotate(16 113 32)"/><ellipse cx="118" cy="44" rx="4" ry="6" transform="rotate(40 118 44)"/><ellipse cx="108" cy="25" rx="3.6" ry="5.4"/></g>`, 1.2)
        + SCH.g(`<path d="M61 66q-3 5-2 10h8l1-10zM94 66l1 10h8q1-5-2-10z" fill="#7A7262"/>
          <path d="M63 61q-7 2-11-4-2-4-6-4.6-6-.4-6.4 3t4.4 3.6q3 0 5 2.6 4 5 13 6z" fill="#8A8272"/>
          <path d="M58 68C58 52 68 44.6 80 44.6S102 52 102 68z" fill="#5C5446"/><path d="M57 68h46" fill="none" stroke-width="2.4"/>`, 1.6)
        + `<path d="M70 48.6l4 8.4-4 11M90 48.6l-4 8.4 4 11M74 57h12M80 45v12M64 57h10M86 57h10M62 62.6l2-5.6M98 62.6l-2-5.6" stroke="${K}" stroke-width="1.1" fill="none" opacity=".7"/>`
        + `<circle cx="43.4" cy="54.6" r=".8" fill="${K}"/><path d="M40 56.6q2 .6 3.6 0" stroke="${K}" stroke-width=".7" fill="none"/>`
        + SCH.g(`<path d="M-2 74Q10 70 16 64t16-10" fill="none" stroke="${B}" stroke-width="2.6"/><path d="M12 67l-5-5M25 58l6 0" fill="none" stroke="${B}" stroke-width="1.4"/>`, 1)
        + finch(12, 60, '#2E2824', `<path d="M4.6-5.6q3.4 0 3.4 2.8-2 .8-4.2.4z" fill="#B59A6A"/>`)
        + finch(27, 51, '#8A6A48', `<path d="M4.8-4.6l4.8 1-4.6 .8z" fill="#3A3028"/>`)
        + `<path d="M24.4 51.4q3 .6 5.4-1.6" stroke="#D9C49A" stroke-width="1.2" fill="none"/>`;
    } },

  /* the abbey garden at Brno: pea plants climbing their stakes, heavy with pods, one plant in purple flower and one in white, the monastery wall with its arched window behind, a watering can at their feet */
  ervilhas_mendel: {
    label: 'Pés de ervilha com vagens e flores roxas e brancas no jardim de um mosteiro',
    rx: /\b(ervilha|ervilhas|vagem|vagens)\b/,
    draw: () => {
      const K = SCK.ink, P = SCH.uid('pea'), F = SCH.uid('pf');
      const leaf = (x, y, a) => `<ellipse cx="${x}" cy="${y}" rx="4.8" ry="2.6" transform="rotate(${a} ${x} ${y})"/>`;
      const pod = (x, y, a) => `<path transform="translate(${x} ${y}) rotate(${a})" d="M0 0q2.8 0 2.8 3.4L2 14.6q-.6 3.4-2.6 3.4Q-2 17-2.4 13.4L-2.8 3.4Q-2.8 0 0 0z"/>`;
      const fl = (x, y, c) => `<use href="#${F}" x="${x}" y="${y}" fill="${c}"/>`;
      return SCH.bg(SCK.stone) + `<path d="M0 8h120M0 16h120M0 24h120M0 32h120M0 40h120M0 48h120M0 56h120" stroke="${SCK.stoneLo}" stroke-width=".9"/>`
        + `<path d="M0 4h120M0 20h120M0 36h120M0 52h120M9 12h111M9 28h111M9 44h111M9 60h111" stroke="${SCK.stoneLo}" stroke-width="8" stroke-dasharray=".9 17.1"/>`
        + SCH.g(`<path d="M47 50V24q0-13 13-13t13 13v26z" fill="#E4DCC6"/><path d="M51 48V24.6q0-9 9-9t9 9V48z" fill="#3E4652"/>`, 1.6)
        + `<path d="M60 16v32M51 30h18" stroke="${SCK.stone}" stroke-width="1.6"/><path d="M45 50h30v3H45z" fill="${SCK.stoneLo}" stroke="${K}" stroke-width="1.2"/>`
        + SCH.g(`<path d="M-2 66h124v16H-2z" fill="#7A5A3A"/>`, 1.4) + `<path d="M6 72h8M30 76h10M60 71h6M86 75h10M104 70h8" stroke="#4E3420" stroke-width="1.2" stroke-linecap="round"/>`
        + `<defs><g id="${P}">` + SCH.g(`<path d="M0 72V6" stroke="${SCK.wood}" stroke-width="2.4"/>`, 1)
        + `<path d="M0 72q-5-6 0-12t0-12 0-12 0-12 0-12M-4 18q-5-1-5 3 0 3 3 2M4 30q5-1 5 3 0 3-3 2" stroke="#4A6636" stroke-width="1.4" fill="none"/>`
        + SCH.g(`<g fill="#7FA05E">${leaf(-7, 62, 20) + leaf(7, 56, -20) + leaf(-7, 46, 25) + leaf(7, 38, -25) + leaf(-6, 28, 20) + leaf(6, 20, -20)}</g>`
          + `<g fill="#A3C46E">${pod(-10, 47, 18) + pod(10, 40, -14) + pod(8, 58, -8) + pod(-9, 30, 10)}</g>`, 1.1)
        + `</g><g id="${F}"><path d="M0 1.6C-5.6 1.6-7-2-6-4.6-4.8-7.4-1.6-7 0-5.6 1.6-7 4.8-7.4 6-4.6 7-2 5.6 1.6 0 1.6z"/><path d="M-4.4 2.6a2.2 2 0 0 1 4.4 0 2.2 2 0 0 1 4.4 0Q4 5.4 0 4.4-4 5.4-4.4 2.6z" fill="${K}" fill-opacity=".22" stroke-width=".8"/><path d="M0-5v6" stroke-width=".6" opacity=".5"/></g></defs>`
        + `<use href="#${P}" x="26"/><use href="#${P}" x="94"/>`
        + SCH.g(fl(20, 12, '#8A4A8C') + fl(32, 8, '#8A4A8C') + fl(27, 24, '#8A4A8C') + fl(88, 12, SCK.white) + fl(100, 8, SCK.white) + fl(95, 24, SCK.white), 1)
        + SCH.g(`<path d="M68 76V62q0-3 3-3h10q3 0 3 3v14z" fill="#B0673A"/><path d="M84 66l14-9" stroke="${K}" stroke-width="4.2"/><path d="M84 66l14-9" stroke="#B0673A" stroke-width="2.2"/><path d="M96 54l4.6 5.6 2.6-6z" fill="#B0673A"/><path d="M70 60q6-10 12 0" fill="none" stroke-width="1.8"/>`, 1.3)
        + `<path d="M71 66h10M71 70h10" stroke="${K}" stroke-width=".8" opacity=".45"/>`
        + SCH.g(`<path d="M34 70.4q15 11 30 0-15-6.4-30 0z" fill="#A3C46E"/><path d="M37 70.6q12 5.6 24 0-12-3.4-24 0z" fill="#5E7A40" stroke-width=".8"/><path d="M${[41.8, 46.6, 51.4, 56.2, 60.8].map(x => `M${x} 71a2.2 2.2 0 1 0 0 .1z`).join('').slice(1)}" fill="#C2DE84" stroke-width=".8"/>`, 1.3);
    } },
  /* a laboratory bench: the swan-necked flask of clear broth, a dish of agar with a fuzzy green mould and the clear ring round it, the brass microscope, test tubes in their rack, a little spirit burner */
  bancada_microbiologia: {
    label: 'Um frasco de pescoço de cisne e uma placa com bolor verde, numa bancada de laboratório',
    rx: /\b(frasco|pescoco de cisne|placa de petri|bolor|fungo|microscopio)\b/,
    draw: () => {
      const K = SCK.ink, G = '#D6E8EC';
      const tube = (x, c) => `<path d="M${x - 2.2} 34v19a2.2 2.2 0 0 0 4.4 0V34z" fill="${G}"/><path d="M${x - 2.2} 45v8a2.2 2.2 0 0 0 4.4 0v-8z" fill="${c}" stroke-width=".8"/>`;
      return SCH.bg('#D5DDD6') + `<path d="M0 12h120M0 24h120M0 36h120M0 48h120M10 0v58M30 0v58M50 0v58M70 0v58M90 0v58M110 0v58" stroke="#B9C6BE" stroke-width="1"/>`
        + SCH.g(`<path d="M-2 58h124v24H-2z" fill="#8A5A34"/>`, 1.6) + `<path d="M0 61.6h120" stroke="#5E3A1E" stroke-width="1.2" opacity=".7"/>`
        + SCH.g(`<path d="M40 40h28v3H40zM40 55h28v3H40z" fill="${SCK.wood}"/>` + tube(45, '#E2B860') + tube(51.5, '#7E9E62') + tube(58, '#C97A6A') + tube(64.5, '#E2B860'), 1.1)
        + SCH.g(`<path d="M86 58l3-5h18l3 5z" fill="#3A332C"/><path d="M96 53V43h4v10z" fill="${SCK.goldLo}"/><path d="M88 41h20v3H88z" fill="${SCK.gold}"/><path d="M102 41q9-8 2-24" fill="none" stroke="${SCK.goldLo}" stroke-width="3.4"/>
          <g transform="rotate(-14 97 26)"><path d="M94 12h6v24h-6z" fill="${SCK.gold}"/><path d="M93 7h8v5h-8z" fill="${SCK.goldLo}"/><path d="M95 36h4l-.6 4h-2.8z" fill="${SCK.goldLo}"/><path d="M93 22h8" stroke-width="1"/></g>
          <ellipse cx="98" cy="48.6" rx="3" ry="1.6" fill="${SCK.sky}" stroke-width="1"/>`, 1.3)
        + `<path d="M95 15l2 18" stroke="${SCK.goldHi}" stroke-width="1" opacity=".8"/>`
        + SCH.g(`<path d="M72 58q0-6 5-6t5 6z" fill="${G}"/><path d="M76 52v-2.4h2V52z" fill="${SCK.goldLo}" stroke-width=".8"/>`, 1.1) + `<path d="M77 49.4q-2.4-3 0-6.8 2.4 3.8 0 6.8z" fill="${SCK.goldHi}"/><path d="M77 49q-1-1.4 0-3 1 1.6 0 3z" fill="#6F9AAE"/>`
        + `<path d="M24 41V28q0-10 9-10 8 0 8 9 0 6 5 8.4 2 .8 4-1" stroke="${K}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M24 41V28q0-10 9-10 8 0 8 9 0 6 5 8.4 2 .8 4-1" stroke="${G}" stroke-width="2.8" fill="none" stroke-linecap="round"/>`
        + SCH.g(`<circle cx="24" cy="50" r="11.4" fill="${G}"/><path d="M13 47.6A11.4 11.4 0 1 0 35 47.6z" fill="#E8D49A" stroke-width="1"/>`, 1.6)
        + `<path d="M16 46a9 9 0 0 1 5-5M26.4 26q1-5 5.6-6.4" stroke="${SCK.white}" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M14 52h20" stroke="#C9A66B" stroke-width=".8" opacity=".7"/>`
        + SCH.g(`<ellipse cx="60" cy="69.6" rx="17" ry="7.4" fill="${G}"/><ellipse cx="60" cy="68" rx="17" ry="7.4" fill="${G}"/><ellipse cx="60" cy="68.4" rx="15" ry="6.2" fill="#E2CC86" stroke-width=".8"/>`, 1.4)
        + `<ellipse cx="54.6" cy="67.4" rx="7.6" ry="3.6" fill="#F4EBC6"/><ellipse cx="54.6" cy="67.4" rx="4.4" ry="2.2" fill="#5E8C4A" stroke="#A8C88A" stroke-width="1.6" stroke-dasharray=".6 .8"/>`
        + `<path d="M67 64.4h0M71 67.6h0M66.6 71h0M62.4 72.4h0M49 71.6h0M70 70.6h0" stroke="${SCK.white}" stroke-width="2" stroke-linecap="round"/>`
        + `<path d="M46 63.6q14-4.4 28 0" stroke="${SCK.white}" stroke-width="1" fill="none" opacity=".8"/>`;
    } },

  /* Babbage's engine by candlelight: a tall brass frame of stacked toothed wheels in three columns, the great cog of its drive, and the laced chain of punched cards climbing into it from the pile on the floor */
  maquina_analitica: {
    label: 'Uma coluna de engrenagens de latão e uma fila de cartões perfurados',
    rx: /\b(cartoes perfurados|engrenagens|maquina analitica)\b/,
    draw: () => {
      const K = SCK.ink, R = v => Math.round(v * 10) / 10, Y = [-5.6, -2.8, 0, 2.8, 5.6];
      let disc = '', teeth = '', cards = '', holes = '';
      for (let i = 0; i < 7; i++) {
        const y = R(15 + i * 6.8);
        disc += `M49.6 ${y}h12.8v3.6h-12.8zm14 0h12.8v3.6h-12.8zm14 0h12.8v3.6h-12.8z`; teeth += `M49.6 ${R(y + 1.8)}h12.8m1.2 0h12.8m1.2 0h12.8`;
      }
      [22, 13, 26, 11, 21, 14].forEach((b, i) => {
        const x = R(1 + i * 8.2); cards += `M${x} -8h7.4v16h-7.4z`;
        for (let r = 0; r < 5; r++) { if (b >> r & 1) holes += `M${R(x + 2.2)} ${Y[r]}h0`; if ((b * 7) >> r & 1) holes += `M${R(x + 5.2)} ${Y[r]}h0`; }
      });
      return SCH.bg('#3A2A22') + `<path d="M0 8h120M0 30h120M20 8v58" stroke="#2A1D16" stroke-width="1.4"/><path d="M4 12h12v14H4z" fill="none" stroke="#5A4232" stroke-width=".9"/>`
        + `<circle cx="14" cy="20" r="16" fill="${SCK.goldHi}" opacity=".14"/><circle cx="14" cy="20" r="9" fill="${SCK.goldHi}" opacity=".16"/>`
        + `<path d="M0 66h120v14H0z" fill="#5A3E2A"/><path d="M0 72h120M40 66l-4 14M70 66l-2 14M106 66l2 14" stroke="#3A2A1C" stroke-width="1"/>`
        + SCH.g(`<path d="M10 32h8v2h-8z" fill="${SCK.goldLo}"/><path d="M12 32V21h4v11z" fill="${SCK.white}"/>`, 1.1) + `<path d="M14 20q-2.6-3.4 0-8 2.6 4.6 0 8z" fill="${SCK.goldHi}"/>`
        + `<circle cx="104" cy="30" r="12.6" fill="none" stroke="${K}" stroke-width="6" stroke-dasharray="2.4 2.3"/><circle cx="104" cy="30" r="12.6" fill="none" stroke="${SCK.goldLo}" stroke-width="3.8" stroke-dasharray="2.4 2.3"/>`
        + SCH.g(`<circle cx="104" cy="30" r="11" fill="${SCK.gold}"/><circle cx="104" cy="30" r="3" fill="${SCK.goldLo}"/><path d="M104 21v18M95 30h18M97.6 23.6l12.8 12.8M110.4 23.6 97.6 36.4" fill="none" stroke-width="1"/><path d="M104 30l12 10" fill="none" stroke-width="2.4"/><circle cx="116" cy="40" r="2" fill="${SCK.wood}"/>`, 1.4)
        + SCH.g(`<path d="M45 12V64M95 12V64" stroke="${SCK.goldLo}" stroke-width="3"/><path d="M56 12V64M70 12V64M84 12V64" stroke-width="1.6"/><path d="M40 6h60v6H40z" fill="${SCK.gold}"/><path d="M38 62h64v6H38z" fill="${SCK.wood}"/><path d="${disc}" fill="${SCK.gold}" stroke-width="1"/>`, 1.4)
        + `<path d="${teeth}" stroke="${SCK.goldLo}" stroke-width="3.4" stroke-dasharray="1 1.2"/><path d="M40 9h60" stroke="${SCK.goldHi}" stroke-width="1" opacity=".7"/>`
        + SCH.g(`<path d="M2 77h28l-3-2.4H5zM3 74.6h26l-3-2.4H6zM4 72.2h24l-3-2.4H7z" fill="${SCK.paper}"/>`, 1)
        + `<g transform="translate(46 30) rotate(126)"><path d="${cards}" fill="${SCK.paper}" stroke="${K}" stroke-width="1.1"/><path d="${holes}" stroke="${K}" stroke-width="1.7" stroke-linecap="round"/><path d="M1 0h49" stroke="${SCK.burg}" stroke-width=".8" stroke-dasharray="1.6 6.6" stroke-dashoffset="2.4"/></g>`;
    } },

  /* an inventor's workshop in the 1880s at night: a glowing carbon-filament bulb on its stand, a cylinder phonograph with its brass horn, and behind them a tall coil throwing branching sparks; wires running to a little dynamo */
  eletricidade_1880: {
    label: 'Uma lâmpada incandescente acesa, um fonógrafo de corneta e uma bobina soltando faíscas',
    rx: /\b(lampada|lampadas|fonografo|bobina|faiscas|dinamo)\b/,
    draw: () => {
      const K = SCK.ink, sp = 'M53 17l-6-4 2-3-7-4M71 17l7-5-1-3 7-3M62 14l-2-6 3-3 -1-4M50 22l-8 1-2 4M74 22l8 2 2-4';
      return SCH.bg('#232B42') + `<circle cx="62" cy="16" r="20" fill="#3A4766"/><circle cx="28" cy="38" r="22" fill="${SCK.goldHi}" opacity=".16"/><circle cx="28" cy="38" r="13" fill="${SCK.goldHi}" opacity=".2"/>`
        + SCH.g(`<path d="M-2 58h124v24H-2z" fill="#5A3E2A"/>`, 1.6) + `<path d="M0 62h120" stroke="#3A2A1C" stroke-width="1.2"/>`
        + SCH.g(`<path d="M52 58v-4h20v4z" fill="${SCK.wood}"/><path d="M56 54V22h12v32z" fill="#B06A3A"/>`, 1.4)
        + `<path d="M62 23v30" stroke="#7A4424" stroke-width="12" stroke-dasharray=".7 1.1"/>`
        + SCH.g(`<ellipse cx="62" cy="20" rx="10" ry="3.6" fill="#C9CFD4"/>`, 1.4)
        + `<path d="${sp}" stroke="${SCK.goldHi}" stroke-width="2.4" fill="none" stroke-linejoin="round" opacity=".7"/><path d="${sp}" stroke="${SCK.white}" stroke-width=".9" fill="none" stroke-linejoin="round"/>`
        + `<path d="M52 57q-6 6-14 2M72 57q5 5 0 10" stroke="${K}" stroke-width="1.2" fill="none"/>`
        + SCH.g(`<path d="M18 60v-3h20v3z" fill="${SCK.wood}"/><path d="M22 57v-3h12v3zM23 54v-3h10v3z" fill="${SCK.gold}"/><path d="M28 21c-8 0-12 6-12 12 0 6 4 9 6 13v5h12v-5c2-4 6-7 6-13 0-6-4-12-12-12z" fill="#FBEBB0"/>`, 1.4)
        + `<path d="M25.6 50V37q2.4-7 4.8 0v13" stroke="#E8862E" stroke-width="1.6" fill="none"/><path d="M25.6 44v-7q2.4-7 4.8 0v7" stroke="${SCK.white}" stroke-width=".7" fill="none"/><path d="M21 30q2-5 6-6" stroke="${SCK.white}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`
        + `<path d="M16 22l-4-3M14 33H9M40 22l4-3M42 33h5M28 15v-5" stroke="${SCK.goldHi}" stroke-width="1.4" stroke-linecap="round"/>`
        + SCH.g(`<path d="M76 58v-9h34v9z" fill="${SCK.wood}"/><path d="M80 49v-7h22v7z" fill="#3A2E24"/><path d="M102 45h6v-6" fill="none" stroke-width="1.6"/>
          <path d="M86 42l2-5 9-17 18 12-23 10z" fill="${SCK.goldLo}"/><ellipse cx="106" cy="26" rx="10.4" ry="5" transform="rotate(34 106 26)" fill="${SCK.gold}"/><ellipse cx="106" cy="26" rx="7" ry="3" transform="rotate(34 106 26)" fill="#6B4E1E" stroke-width="1"/>`, 1.4)
        + `<path d="M82 44h18M82 47h18" stroke="#6B5A48" stroke-width=".7"/><path d="M91 34l10-12" stroke="${SCK.goldHi}" stroke-width="1" opacity=".7"/>`
        + SCH.g(`<path d="M46 76v-3h24v3z" fill="#3A332C"/><path d="M49 73V64q0-6 9-6t9 6v9h-4v-8q0-3-5-3t-5 3v8z" fill="${SCK.red}"/><circle cx="58" cy="67.6" r="3.6" fill="#B06A3A"/>`, 1.2)
        + `<path d="M58 64v7.2M54.4 67.6h7.2" stroke="#7A4424" stroke-width=".8"/>`;
    } },

  /* Bell's workbench, 1876: a wooden box telephone on its pedestal, its brass funnel mouthpiece turned to the room, wires looping across the bench to a glass battery jar, a coil of copper wire on the wall */
  telefone_bell: {
    label: 'Um dos primeiros telefones de madeira, com bocal em funil',
    rx: /\b(telefone|telefones)\b/,
    draw: () => {
      const K = SCK.ink;
      return SCH.bg('#DCC9A0') + `<path d="M0 6h120M0 14h120M0 22h120M0 30h120M0 38h120M0 46h120" stroke="#CDB98E" stroke-width="2.6"/>`
        + SCH.g(`<path d="M106 4v6" fill="none" stroke-width="1.2"/><ellipse cx="106" cy="17" rx="8" ry="7" fill="none" stroke="#B06A3A" stroke-width="3.4"/>`, 1) + `<path d="M98.6 15q7.4-5 14.8 0M98.6 19q7.4 5 14.8 0" stroke="#7A4424" stroke-width=".8" fill="none"/>`
        + SCH.g(`<path d="M-2 56h124v26H-2z" fill="${SCK.wood}"/>`, 1.6) + `<path d="M0 60h120M10 68h30M70 74h40" stroke="#5E3A1E" stroke-width="1" opacity=".6"/>`
        + SCH.g(`<path d="M6 61v-5h62v5z" fill="#6B4426"/><path d="M36 56v-8h12v8z" fill="#6B4426"/>
          <path d="M26 48V18l10-7h34l-10 7v30z" fill="#B07A44"/><path d="M60 48V18l10-7v30z" fill="#8A5A30"/><path d="M26 18h34" fill="none" stroke-width="1.2"/>`, 1.7)
        + `<path d="M30 22h26v22H30z" fill="none" stroke="${K}" stroke-width=".9" opacity=".5"/><path d="M40 14h3M52 14h3" stroke="${K}" stroke-width="2.8" stroke-linecap="round"/>`
        + SCH.g(`<path d="M24 26h4v16h-4z" fill="${SCK.goldLo}"/><path d="M25 27L6 16v36l19-11z" fill="${SCK.gold}"/><ellipse cx="6" cy="34" rx="4.4" ry="18" fill="${SCK.goldLo}"/><ellipse cx="6" cy="34" rx="2.2" ry="12" fill="#4A3418" stroke-width="1"/>`, 1.6)
        + `<path d="M10 21l14 8" stroke="${SCK.goldHi}" stroke-width="1.4" opacity=".9"/>`
        + `<path d="M41.6 12.6q8-14 26-6t24 13M53.6 12.6q6-8 18-3t24 14" stroke="${K}" stroke-width="1.3" fill="none"/>`
        + SCH.g(`<path d="M80 62V31h26v31q0 2-2 2H82q-2 0-2-2z" fill="#CFE0E4"/><path d="M80.8 40h24.4v21.4q0 1.6-1.6 1.6H82.4q-1.6 0-1.6-1.6z" fill="${SCK.sea}" stroke-width="1"/>
          <path d="M86 56V24h4.4v32zM96 56V24h4.4v32z" fill="${SCK.stone}" stroke-width="1"/><path d="M97 56V24h2.4v32z" fill="#B06A3A" stroke="none"/><path d="M78 31h30" fill="none" stroke-width="1.8"/>`, 1.5)
        + `<path d="M88.2 24v-3M98.2 24v-3" stroke="${K}" stroke-width="2.6" stroke-linecap="round"/><path d="M83 35v24" stroke="${SCK.white}" stroke-width="1.2" opacity=".8"/>`;
    } },

  /* the consulting room in Vienna: the couch draped in a red oriental rug, its head heaped with cushions, the armchair at its head, shelves of books and little antique figurines, a green lamp; nobody there */
  diva_freud: {
    label: 'Um divã coberto por um tapete oriental e uma poltrona, num consultório',
    rx: /\b(diva|diva de analise|consultorio)\b/,
    draw: () => {
      const K = SCK.ink;
      let books = '';
      [[66, '#7B1E3A'], [70, '#2F5D62'], [74, '#A87A22'], [79, '#5E6B3A'], [83, '#7B1E3A'], [88, '#8A5A34'], [92, '#2F5D62'], [96, '#A87A22']].forEach(([x, c]) => { books += `<path d="M${x} 36v-10h3.4v10z" fill="${c}"/>`; });
      const loz = [48, 62, 76, 90].map(x => `M${x} 58.6l5-4.2 5 4.2-5 4.2z`).join('');
      return SCH.bg('#3E4636') + `<path d="M0 8h120M0 20h120M0 32h120M0 44h120" stroke="#46503D" stroke-width="5" stroke-dasharray="2 6"/>`
        + `<path d="M0 64h120v16H0z" fill="#5A3A22"/><path d="M20 70h90l6 10H14z" fill="${SCK.night}"/><path d="M22 72.6h88M17 77.4h96" stroke="${SCK.gold}" stroke-width="1" stroke-dasharray="3 2" opacity=".8"/>`
        + SCH.g(`<path d="M62 4h40v34H62z" fill="#6B4426"/><path d="M62 22h40M62 37h40" fill="none" stroke-width="1.2"/>`, 1.4) + SCH.g(books.replace(/36v/g, '21v') + books, .9)
        + SCH.g(`<path d="M66 21v-6q2-2 4 0v6zM74 21v-8a2 2 0 0 1 4 0v8zM84 21v-4l2-3 2 3v4zM92 21l1-6h4l1 6z" fill="${SCK.stone}"/><path d="M75 13.6a1.6 1.6 0 1 1 2 0" fill="${SCK.stone}"/>`, 1)
        + SCH.g(`<path d="M106 66V48h8v18z" fill="${SCK.wood}"/><path d="M110 48V36" fill="none" stroke-width="1.4"/><path d="M104 38l2-7h8l2 7z" fill="#4E7A4A"/>`, 1.3)
        + `<circle cx="110" cy="40" r="6" fill="${SCK.goldHi}" opacity=".3"/>`
        + SCH.g(`<path d="M4 66V24q0-6 10-6t10 6v40" fill="#5E6B3A"/><path d="M0 46q0-6 6-6h18v26H0z" fill="#6E7B46"/><path d="M2 66v6M22 66v6" fill="none" stroke-width="2"/>`, 1.5)
        + `<path d="M9 24v20M14 22v22M19 24v20" stroke="${K}" stroke-width=".8" opacity=".35"/>`
        + SCH.g(`<path d="M30 66v5M102 66v5" fill="none" stroke-width="2.6"/><path d="M28 52V36q0-4 4-3l18 15h52v4z" fill="#B0402F"/>
          <path d="M28 52h76v14l-3 2H31l-3-2z" fill="${SCK.red}"/>
          <path d="M31 34q10-1 14 9l-3 4q-8-6-12-5z" fill="${SCK.gold}"/><path d="M36 44q8-6 16 0l-1 4H37z" fill="${SCK.burg}"/><path d="M90 48q6-4 12 0v4H90z" fill="${SCK.teal}"/>`, 1.5)
        + `<path d="M28 55.4h76M28 62h76" stroke="${SCK.gold}" stroke-width="1.4"/><path d="${loz}" fill="${SCK.goldHi}" stroke="${K}" stroke-width=".9"/><path d="${loz.replace(/l5-4.2 5 4.2-5 4.2z/g, 'h0')}" stroke="${SCK.burg}" stroke-width="2.4" stroke-linecap="round" transform="translate(5 0)"/>`
        + `<path d="M31 69.6h70" stroke="${SCK.goldHi}" stroke-width="2.6" stroke-dasharray=".7 1.3"/><path d="M52 50h46M40 50q2-2 6-2" stroke="#E07A6A" stroke-width="1" opacity=".7" fill="none"/>`;
    } },
  /* the fabric of space as a grid, pulled down into a deep well; in its throat a black sphere ringed by a glowing tilted disc, a ray of starlight bending as it passes */
  espaco_curvo: {
    label: 'Um buraco negro com disco brilhante curvando a grade do espaço, e um raio de luz que se dobra',
    rx: /\b(relatividade|espaco-tempo|buraco negro|buracos negros|disco de acrecao)\b/,
    draw: () => {
      const R = v => Math.round(v * 10) / 10;
      /* a point of the sheet: u across, v in depth; the well pulls it down near the middle */
      const P = (u, v) => `${R(60 + u * 66)} ${R(42 + v * 26 + 26 / (1 + (u * u + v * v) * 8))}`;
      const U = [-1, -.6, -.4, -.28, -.18, -.08, 0, .08, .18, .28, .4, .6, 1];
      const rows = (v0, v1) => { let g = ''; for (let v = v0; v <= v1 + .01; v += .25) g += 'M' + U.map(u => P(u, v)).join('L'); return g; };
      const cols = (v0, v1) => { let g = ''; for (let u = -1; u <= 1.01; u += .2) { const V = []; for (let v = v0; v <= v1 + .01; v += .25) V.push(P(u, v)); g += 'M' + V.join('L'); } return g; };
      const grid = d => `<path d="${d}" stroke="#9CC0D0" stroke-width=".8" fill="none" opacity=".8"/>`;
      let st = '';
      for (const [x, y] of [[6, 6], [18, 12], [30, 4], [44, 9], [78, 5], [94, 11], [108, 4], [116, 15], [8, 20], [112, 24], [70, 2], [52, 3]]) st += `M${x} ${y}h0`;
      return SCH.bg('#1C2440') + `<path d="${st}" stroke="${SCK.white}" stroke-width="1.4" stroke-linecap="round"/>`
        + grid(rows(-1, 0) + cols(-1, 0))
        + `<ellipse cx="60" cy="46" rx="27" ry="6.4" fill="none" stroke="#C9762E" stroke-width="5"/><ellipse cx="60" cy="46" rx="27" ry="6.4" fill="none" stroke="${SCK.gold}" stroke-width="2.4"/>`
        + `<circle cx="60" cy="44" r="14" fill="${SCK.goldHi}" opacity=".22"/><circle cx="60" cy="44" r="10" fill="#0B0B12" stroke="${SCK.goldHi}" stroke-width="1.8"/>`
        + `<path d="M33 46a27 6.4 0 0 0 54 0" fill="none" stroke="#C9762E" stroke-width="5"/><path d="M33 46a27 6.4 0 0 0 54 0" fill="none" stroke="${SCK.goldHi}" stroke-width="2.4"/><path d="M40 49.4a22 4.4 0 0 0 40 0" fill="none" stroke="${SCK.white}" stroke-width=".8"/>`
        + grid(rows(.25, 1) + cols(0, 1))
        + `<path d="M0 22L32 26Q56 28 72 22T120 6" stroke="${SCK.white}" stroke-width="1.6" fill="none"/><path d="M119 6.2l-7 .2 3.4 4.8z" fill="${SCK.white}"/>`;
    } },

  /* Gloucestershire, 1796: a milkmaid in cap and apron on her stool with a wooden pail, milking a brown-and-white cow in a green pasture, a thatched cottage behind */
  vaca_jenner: {
    label: 'Uma ordenhadeira com balde junto a uma vaca num pasto inglês',
    rx: /\b(vaca|vacas|ordenhadeira|leiteira)\b/,
    draw: () => {
      const K = SCK.ink, C = '#6B3E24';
      return SCH.bg('#C6DADD') + `<ellipse cx="88" cy="9" rx="14" ry="2.6" fill="${SCK.white}" opacity=".8"/>`
        + `<path d="M0 40q30-8 60-4t60-3v10H0z" fill="#9DB688"/><path d="M60 38q4-6 10-4 6-4 10 2 5 0 5 4H60z" fill="#4E6B3C"/>`
        + SCH.g(`<path d="M4 44V32h22v12z" fill="${SCK.white}"/><path d="M1 33l7-11h16l5 11z" fill="#C9A66B"/><path d="M20 22v-5h3v5" fill="${SCK.stone}"/><path d="M13 44v-6h4v6z" fill="${SCK.wood}" stroke-width="1"/>`, 1.3)
        + `<path d="M7 35h4v3H7zM19 35h4v3h-4z" fill="#4A4038"/><path d="M4 29h22M6 26h16" stroke="${K}" stroke-width=".6" opacity=".4"/>`
        + `<path d="M0 44q40-6 70-2t50 0v38H0z" fill="${SCK.green}"/><path d="M6 72l1-3M30 76l1-3M84 76l1-3M112 70l1-3M100 76l1-3" stroke="#4A6636" stroke-width="1.2" stroke-linecap="round"/>`
        + SCH.g(`<path d="M50 56l-1 15h4l2-14zM58 56l1 15h4v-14zM90 56l-1 15h4l2-14zM97 54l1 17h4v-16z" fill="${C}"/>
          <path d="M44 38q-3 10-5 20" fill="none" stroke-width="1.4"/><path d="M37 57q2-3 4 0l-1 4h-2z" fill="${SCK.white}" stroke-width="1"/>
          <path d="M44 38q0-8 10-8h32q8 0 12 5l3 16q-2 7-10 7H56q-12 0-12-8z" fill="${C}"/>
          <path d="M98 34q8-7 14-2l4 15q1 6-4 6t-6-3l-9-10z" fill="${C}"/><path d="M106 31q-4-5-7-4M110 31q2-6 6-6" fill="none" stroke-width="2"/><path d="M98 34l-5-1 3 4z" fill="${C}" stroke-width="1"/>
          <path d="M66 57q4 7 10 0z" fill="#E8B0A0" stroke-width="1"/>`, 1.5)
        + `<path d="M54 31q16 3 34 0 6 0 9 3-12 2-20 1-10 2-23-4zM56 56q12 3 34 0-2-4-4-4-12 2-27 0z" fill="${SCK.white}"/><path d="M110.6 51.4q2 .6 4 0" stroke="#E8B0A0" stroke-width="2.4" stroke-linecap="round"/><circle cx="106" cy="39" r=".9" fill="${K}"/>`
        + SCH.g(`<path d="M28 72l4-10M40 72l-4-10" fill="none" stroke="${SCK.wood}" stroke-width="2"/>
          <path d="M26 64q2-13 8-14h6q6 1 8 14z" fill="${SCK.teal}"/><path d="M33 62q1-10 4-12h3q4 4 3 12z" fill="${SCK.white}"/>
          <path d="M32 52q0-8 5-10h3q4 2 5 9l-4 2z" fill="${SCK.burg}"/><path d="M42 46q6 4 14 9" fill="none" stroke="#E8C3A0" stroke-width="2.2"/>
          <circle cx="38" cy="38" r="3.6" fill="#E8C3A0"/><path d="M33.6 37q0-6 4.6-6 4.6 0 4.6 5-4.6-2.4-9.2 1z" fill="${SCK.white}" stroke-width="1"/>
          <path d="M57 72v-9h11v9z" fill="#B0844E"/>`, 1.3)
        + `<path d="M57 66h11M57 70h11" stroke="${K}" stroke-width="1"/><path d="M58.6 63.6h7.8" stroke="${SCK.white}" stroke-width="1.4"/>`;
    } },

  /* Kill Devil Hills, 17 December 1903: the frail biplane, its elevator out in front and its twin rudder behind, lifting off its wooden launching rail over the sand, the sea beyond the dunes, the beach grass bent by the wind */
  voo_wright: {
    label: 'Um planador motorizado decola sobre as dunas de uma praia ventosa',
    rx: /\b(kitty hawk|dunas|flyer)\b/,
    draw: () => {
      const K = SCK.ink, W = '#FBF6EA', R = v => Math.round(v * 10) / 10;
      /* the machine in three dimensions: X along the span, Y up, Z forward (towards the lower left) */
      const P = (X, Y, Z) => `${R(64 + X * .64 - Z * .92)} ${R(38 - Y - X * .4 + Z * .08)}`;
      const quad = (x0, x1, y, z0, z1) => `M${P(x0, y, z1)}L${P(x1, y, z1)}L${P(x1, y, z0)}L${P(x0, y, z0)}z`;
      let struts = '', ribs = '';
      for (const X of [-52, -39, -26, -13, 13, 26, 39, 52]) for (const Z of [7, -7]) struts += `M${P(X, 0, Z)}L${P(X, 15, Z)}`;
      for (let X = -48; X < 52; X += 8) ribs += `M${P(X, 0, 8)}L${P(X, 0, -8)}M${P(X, 15, 8)}L${P(X, 15, -8)}`;
      return SCH.bg('#A8C6D4') + `<ellipse cx="22" cy="9" rx="14" ry="2.4" fill="${SCK.white}" opacity=".8"/><ellipse cx="98" cy="7" rx="12" ry="2" fill="${SCK.white}" opacity=".7"/>`
        + `<path d="M0 36h120v6H0z" fill="${SCK.sea}"/>`
        + SCH.g(`<path d="M-2 82V42q30-4 50 0t40-4q20-4 34 0v44z" fill="#DDBC7E"/>`, 1.4)
        + `<path d="M84 44q10-3 22-3M94 50q10-3 20-2M10 52q10-2 18 0" stroke="#C9A66B" stroke-width="1.2" fill="none"/>`
        + `<ellipse cx="58" cy="68" rx="36" ry="3.4" fill="#B39A62" opacity=".7"/>`
        + SCH.g(`<path d="M108 46 44 76h5l63-30z" fill="${SCK.wood}"/>`, 1.1)
        + `<path d="M6 80q2-8 10-12M14 80q4-6 12-8M100 80q4-8 12-10M110 80q2-5 9-7" stroke="#6E8C5A" stroke-width="1.4" fill="none" stroke-linecap="round"/>`
        + SCH.g(`<path d="M${P(1.6, 2, -27)}L${P(1.6, 13, -27)}L${P(1.6, 13, -22)}L${P(1.6, 2, -22)}zM${P(-1.6, 2, -27)}L${P(-1.6, 13, -27)}L${P(-1.6, 13, -22)}L${P(-1.6, 2, -22)}z" fill="${W}"/>`, 1)
        + `<path d="M${P(-3, 0, -8)}L${P(0, 2, -22)}M${P(3, 15, -8)}L${P(0, 13, -22)}" stroke="${K}" stroke-width=".7"/>`
        + SCH.g(`<path d="M${P(-17, 1.5, -9)}L${P(-15, 13.5, -9)}M${P(15, 1.5, -9)}L${P(17, 13.5, -9)}" fill="none" stroke="${SCK.wood}" stroke-width="2.2"/>`, 1)
        + SCH.g(`<path d="${quad(-52, 52, 0, -8, 8)}" fill="${W}"/>`, 1.6)
        + `<path d="M${P(-3, 1.6, 6)}L${P(-3, 1.6, -3)}" stroke="#3A2E24" stroke-width="2.8" stroke-linecap="round"/><path d="M${P(5, 1, 3)}L${P(9, 1, 3)}L${P(9, 1, -4)}L${P(5, 1, -4)}z" fill="#3A2E24" stroke="${K}" stroke-width=".8"/>`
        + `<path d="${struts}" stroke="${K}" stroke-width="1.1"/>`
        + SCH.g(`<path d="${quad(-52, 52, 15, -8, 8)}" fill="${W}"/>`, 1.6)
        + `<path d="${ribs}" stroke="${K}" stroke-width=".5" opacity=".45"/>`
        + `<path d="M${P(-5, 0, 8)}L${P(-5, 3, 25)}M${P(5, 0, 8)}L${P(5, 3, 25)}M${P(-5, 15, 8)}L${P(-5, 10, 25)}M${P(5, 15, 8)}L${P(5, 10, 25)}" stroke="${K}" stroke-width=".8"/>`
        + SCH.g(`<path d="${quad(-15, 15, 3, 24, 30)}" fill="${W}"/><path d="${quad(-15, 15, 10, 24, 30)}" fill="${W}"/><path d="M${P(-15, 3, 27)}L${P(-15, 10, 27)}M${P(15, 3, 27)}L${P(15, 10, 27)}" fill="none" stroke-width=".9"/>`, 1.1);
    } },

  /* a cliff on the Cornish coast, 1901: the tall wooden aerial mast with its fan of wires and the little operating hut, rings of waves spreading out over the sea to a steamship on the horizon */
  antena_marconi: {
    label: 'Uma antena alta na costa enviando ondas sobre o mar até um navio',
    rx: /\b(antena|ondas de radio|telegrafia sem fio)\b/,
    draw: () => {
      const K = SCK.ink;
      let arcs = '';
      for (const r of [12, 24, 36, 48, 60, 72, 84]) {
        const a = -.5, b = .55, x0 = 24, y0 = 6, P = t => `${(x0 + r * Math.cos(t)).toFixed(1)} ${(y0 + r * Math.sin(t) + r * .42).toFixed(1)}`;
        arcs += `<path d="M${P(a)}A${r} ${r} 0 0 1 ${P(b)}" stroke="${SCK.red}" stroke-width="${(2.2 - r / 70).toFixed(1)}" fill="none" opacity="${(1 - r / 130).toFixed(2)}"/>`;
      }
      return SCH.bg('#C4D8DE') + `<ellipse cx="74" cy="10" rx="16" ry="2.6" fill="${SCK.white}" opacity=".8"/>`
        + `<path d="M0 44h120v36H0z" fill="${SCK.sea}"/>` + SCH.waves(56, '#86A6B8', 1.2) + SCH.waves(68, '#86A6B8', 1.2)
        + SCH.g(`<path d="M84 46l3 6h26l4-6z" fill="#3A332C"/><path d="M93 46v-7h5v7zM102 46v-8h5v8z" fill="${SCK.red}"/><path d="M88 46l1-3h24l1 3z" fill="${SCK.white}"/><path d="M90 46V36M111 46V37" fill="none" stroke-width="1"/>`, 1.2)
        + `<path d="M93 38h5M102 37h5" stroke="${K}" stroke-width="1.4"/><path d="M96 37q-3-5 2-10M105 36q-3-6 4-10" stroke="#8C8A86" stroke-width="2.2" fill="none" stroke-linecap="round"/>`
        + SCH.g(`<path d="M-2 82V32h14q8 0 12 6l8 14q4 8 4 30z" fill="#8C7F68"/><path d="M-2 32h14q8 0 12 6l2 4q-8-4-28-2z" fill="${SCK.green}"/>`, 1.6)
        + `<path d="M6 48l8 6M16 60l10 4M4 66l12 2M24 72l6 6" stroke="${K}" stroke-width="1" opacity=".4"/>`
        + `<path d="M24 4 4 33M24 4l16 30M24 16 8 34" stroke="${K}" stroke-width=".6" opacity=".7"/>`
        + SCH.g(`<path d="M24 36V2" fill="none" stroke="${SCK.wood}" stroke-width="2.8"/><path d="M14 4h20M17 12h14M19 20h10" fill="none" stroke="${SCK.wood}" stroke-width="1.8"/>`, 1)
        + `<path d="M15 4.6 26 31M18.4 4.6 27 31M29.6 4.6 28 31M33 4.6 29 31" stroke="${K}" stroke-width=".5"/>`
        + SCH.g(`<path d="M25 37v-7h14v7z" fill="${SCK.white}"/><path d="M24 30.6l2-4h12l2 4z" fill="${SCK.burg}"/><path d="M29 37v-4h3v4z" fill="${SCK.wood}" stroke-width=".8"/>`, 1.2)
        + arcs;
    } },
  /* Joule's apparatus, 1845: two weights sinking on cords over pulleys, the cords unwinding from a roller that turns the paddle wheel inside a closed copper vessel of water (cut away to show it), a thermometer standing in its lid */
  joule_aparelho: {
    label: 'Um peso que desce e gira pás num recipiente de água com termômetro',
    rx: /\b(calor|termometro|roda de pas|pas)\b/,
    draw: () => {
      const K = SCK.ink, C = '#B06A3A';
      const pulley = (x, a) => `<path d="M${x + a * 8} 70V12h${-a * 6}" fill="none" stroke="${SCK.wood}" stroke-width="3"/><circle cx="${x}" cy="12" r="6" fill="${SCK.goldLo}"/><circle cx="${x}" cy="12" r="1.4" fill="${K}" stroke="none"/>`;
      const weight = x => `<path d="M${x - 6} 40h12v15h-12z" fill="#55585E"/><path d="M${x} 37v3" fill="none" stroke-width="1.4"/>`;
      return SCH.bg('#E4D6B4') + `<path d="M0 10h120M0 30h120M0 50h120" stroke="#D2C29C" stroke-width="1.2"/>`
        + SCH.g(`<path d="M-2 70h124v12H-2z" fill="${SCK.wood}"/>`, 1.6) + `<path d="M0 74h120" stroke="#5E3A1E" stroke-width="1" opacity=".6"/>`
        + `<path d="M16 6H56M64 6h40M10 12v25M110 12v25" stroke="${K}" stroke-width="1"/>`
        + SCH.g(pulley(16, 1) + pulley(104, -1) + weight(10) + weight(110), 1.3)
        + `<path d="M5 43h10M105 43h10" stroke="#8A8D92" stroke-width="1.2"/><path d="M20 44v8l-2-2.6M20 52l2-2.6M100 44v8l-2-2.6M100 52l2-2.6" stroke="${SCK.red}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`
        + SCH.g(`<path d="M60 44V2" fill="none" stroke-width="2"/><path d="M54 2h12v9H54z" fill="${SCK.wood}"/>
          <path d="M38 46v22q0 2 2 2h40q2 0 2-2V46z" fill="${C}"/><ellipse cx="60" cy="46" rx="22" ry="4.6" fill="#D08A50"/>
          <path d="M46 52h28v14H46z" fill="${SCK.sea}" stroke-width="1.2"/>`, 1.5)
        + `<path d="M48 54q12 2 24 0" stroke="#9CC0D0" stroke-width="1" fill="none"/><path d="M60 46v20" stroke="${K}" stroke-width="1.6"/>`
        + SCH.g(`<path d="M49 56h22v3H49zM53 61.6h14v3H53z" fill="${SCK.white}"/>`, .9)
        + `<path d="M58 57.5v0M62 57.5v0" stroke="${SCK.sea}" stroke-width="2"/><path d="M42 50v16M78 50v16" stroke="#7A4424" stroke-width="1.2"/><path d="M55 4h10M55 7h10" stroke="#5E3A1E" stroke-width=".8"/>`
        + SCH.g(`<path d="M72.6 47V18.6a1.6 1.6 0 0 1 3.2 0V47z" fill="${SCK.white}"/>`, 1.1) + `<path d="M74.2 46V30" stroke="#7E8A92" stroke-width="1.2"/>`
        + `<path d="M76 22h2M76 26h1.4M76 30h2M76 34h1.4M76 38h2" stroke="${K}" stroke-width=".7"/>`;
    } },

  /* a modern research barn, 1996: a white-faced sheep standing in a pen of clean straw behind steel rails, strip lights overhead, a window into the laboratory with a microscope on its bench */
  ovelha_clonada: {
    label: 'Uma ovelha branca num cercado de palha dentro de um celeiro de pesquisa',
    rx: /\b(ovelha|ovelhas)\b/,
    draw: () => {
      const K = SCK.ink, R = v => Math.round(v * 10) / 10;
      /* the fleece: a ring of little bumps round an ellipse */
      let wool = '';
      for (let i = 0; i <= 16; i++) { const t = i / 16 * Math.PI * 2; wool += (i ? `A4.4 4.4 0 0 1 ` : 'M') + `${R(58 + 27 * Math.cos(t))} ${R(48 + 13.4 * Math.sin(t))}`; }
      return SCH.bg('#8E9CA2') + `<path d="M0 29h120" stroke="#7E8C92" stroke-width="58" stroke-dasharray="1.2 3.8"/>`
        + `<rect x="10" y="2" width="38" height="5" rx="2.5" fill="${SCK.white}" opacity=".35"/><rect x="72" y="2" width="38" height="5" rx="2.5" fill="${SCK.white}" opacity=".35"/>`
        + SCH.g(`<path d="M12 3.4h34v2.2H12zM74 3.4h34v2.2H74z" fill="${SCK.white}" stroke-width="1"/>`, 1)
        + SCH.g(`<path d="M76 12h38v26H76z" fill="${SCK.sky}"/>`, 1.6)
        + `<path d="M77 31h36" stroke="#8EA4AE" stroke-width="2"/><path d="M90 30v-2h8v2zM93 28l1-8 3-2 2 1-3 3-1 6zM95.6 17l3.6 3.4" stroke="#4A5A64" stroke-width="1.6" fill="#4A5A64"/><path d="M104 30v-5l2-3 2 3v5z" fill="#4A5A64"/><path d="M80 14l8 8M84 14l8 8" stroke="${SCK.white}" stroke-width="1" opacity=".6"/>`
        + `<path d="M0 58h120v22H0z" fill="#D9B866"/><path d="M4 64l6-2M18 70l7 1M34 63l5 3M50 74l7-2M70 68l6 1M88 74l6-3M100 64l6 2M110 72l7 1M24 77l5-1M80 62l5-1" stroke="#A8862E" stroke-width="1.1" stroke-linecap="round"/>`
        + SCH.g(`<path d="M3 58V40M117 58V40" fill="none" stroke="#A9B2B6" stroke-width="3.6"/><path d="M0 43h120M0 51h120" fill="none" stroke="#A9B2B6" stroke-width="2.8"/>`, 1)
        + `<path d="M0 42.2h120M0 50.2h120" stroke="${SCK.white}" stroke-width=".8" opacity=".7"/>`
        + SCH.g(`<path d="M40 58v14h4.6V58zM50 60v12h4.6V60zM68 60v12h4.6V60zM76 58v14h4.6V58z" fill="${SCK.white}"/><path d="M40 70h4.6v2H40zM50 70h4.6v2H50zM68 70h4.6v2h-4.6zM76 70h4.6v2h-4.6z" fill="${K}" stroke-width=".8"/>`, 1.3)
        + SCH.g(`<path d="${wool}z" fill="#F1E9D6"/>`, 1.6)
        + `<path d="M44 44a3 3 0 0 1 5 0M56 40a3 3 0 0 1 5 0M68 44a3 3 0 0 1 5 0M50 52a3 3 0 0 1 5 0M64 54a3 3 0 0 1 5 0M76 50a3 3 0 0 1 5 0M42 52a3 3 0 0 1 4 0" stroke="${K}" stroke-width=".8" fill="none" opacity=".35"/>`
        + SCH.g(`<path d="M27 40q4 0 8 6" fill="none" stroke-width="6"/><path d="M27 40q4 0 8 6" fill="none" stroke="#F1E9D6" stroke-width="3.6"/>
          <path d="M32 36q-8-4-14 2l-4 10q0 5 5 5 4 0 6-3l7-6q3-4 0-8z" fill="${SCK.white}"/><path d="M25 37.6l-8-3.4 2 4zM31 37l5-5 .6 5z" fill="${SCK.white}" stroke-width="1"/>
          <path d="M23 34q4-5 10 0" fill="#F1E9D6" stroke-width="1"/>`, 1.4)
        + `<circle cx="23.4" cy="41" r="1" fill="${K}"/><path d="M15.6 48.6h0" stroke="#B07A70" stroke-width="2.2" stroke-linecap="round"/><path d="M21 38.4l-3-1" stroke="#E8B0A0" stroke-width="1" />`;
    } },

  /* the sea floor off Antikythera, 1900: a sponge diver in canvas suit and copper helmet sinking on his air hose towards the broken ribs of an ancient ship, amphorae strewn in the sand and the bronze arm of a statue lying among them */
  naufragio_anticitera: {
    label: 'Um mergulhador de esponjas junto aos destroços de um navio antigo, entre ânforas',
    rx: /\b(naufragio|mergulhador|anforas|destrocos)\b/,
    draw: () => {
      const K = SCK.ink, T = '#B0673A', A = SCH.uid('am');
      const amph = (x, y, a, s) => `<use href="#${A}" transform="translate(${x} ${y}) rotate(${a}) scale(${s})"/>`;
      return SCH.bg('#33656F') + `<path d="M0 0h120v5q-30 3-60 0T0 5z" fill="#6F9AAE"/><path d="M58 0 40 62h16L72 0zM96 0l-8 60h12l8-60z" fill="#4E8290" opacity=".55"/>`
        + `<path d="M0 62q30-6 60-2t60-3v23H0z" fill="${SCK.ochre}"/><path d="M8 74h10M44 77h8M90 76h12M62 72h6" stroke="#9A7A4A" stroke-width="1.2" stroke-linecap="round"/>`
        + SCH.g(`<path d="M70 64q3-16 8-22M80 64q2-18 6-26M90 64q1-16 4-22M100 64q0-14 2-18M110 64q-1-10 0-14" fill="none" stroke="#4A3523" stroke-width="3"/><path d="M64 64q26 4 58-2" fill="none" stroke="#4A3523" stroke-width="4"/><path d="M74 52l40-5" fill="none" stroke="#5A4230" stroke-width="2.2"/>`, 1)
        + `<defs><g id="${A}"><path d="M-2.4-13h4.8v3.4q5.6 2.4 6 9.6.4 7-5 13.4L0 15.6l-1.4-2.6Q-6.8 6.6-6.4-.6q.4-7 6-9.6z" fill="${T}"/><path d="M-3.2-14.4h6.4v2h-6.4z" fill="${T}"/><path d="M-2.4-11.4q-4.6 0-4 5.6M2.4-11.4q4.6 0 4 5.6" fill="none" stroke-width="1.6"/><path d="M-3.6-4q-1 6 1.4 11" fill="none" stroke="#D99A6C" stroke-width="1.2"/></g></defs>`
        + SCH.g(amph(84, 58, 16, .9) + amph(100, 62, -24, .8) + amph(50, 73, 84, .8) + amph(112, 54, 8, .6) + amph(70, 64, -10, .7), 1.2)
        + SCH.g(`<path d="M5 70.6 26 62l2.4 5.8L7.6 76z" fill="#4E8A78"/><path d="M25 61.4l5.4-2.4 3 6.6-5.4 2.6z" fill="#4E8A78"/><ellipse cx="6.2" cy="73.4" rx="1.8" ry="3.2" transform="rotate(-22 6.2 73.4)" fill="#1E3A34" stroke-width="1"/>`, 1.3)
        + `<path d="M29.4 60 31 55.4M31.4 60.6l5.6-3M32.4 62.6l6.2-1M33.2 64.6l5.8 1M33.2 66.4l4.6 2.4" stroke="${K}" stroke-width="3.6" stroke-linecap="round"/><path d="M29.4 60 31 55.4M31.4 60.6l5.6-3M32.4 62.6l6.2-1M33.2 64.6l5.8 1M33.2 66.4l4.6 2.4" stroke="#4E8A78" stroke-width="1.8" stroke-linecap="round"/>`
        + `<path d="M9 70.6 25 64" stroke="#9CCAB4" stroke-width="1" fill="none"/>`
        + `<path d="M58 14q4-8 0-16" stroke="${K}" stroke-width="3" fill="none"/><path d="M58 14q4-8 0-16" stroke="#6E6A60" stroke-width="1.6" fill="none"/>`
        + `<g transform="translate(56 20) rotate(-8)">` + SCH.g(`<path d="M-7 10h14l1.6 15H-8.6z" fill="#C9BFA8"/><path d="M-7 13-15 19l2 2.4 7-4M7 13l7 5-1.6 2.6L6 17" fill="#C9BFA8"/>
          <path d="M-7 25l-1 12h5l1-12zM1 25l1 12h5l-1-12z" fill="#B5AB92"/><path d="M-9.6 37h7.6v3.6h-8.6zM1 37h7.6l1 3.6H1z" fill="#2E2A26"/>
          <path d="M-8 9l2-4h12l2 4z" fill="${SCK.gold}"/><circle r="6.6" fill="#C27C44"/><circle cx="2" cy=".6" r="3.4" fill="#22343A" stroke="${SCK.gold}" stroke-width="1.6"/>`, 1.3)
        + `<path d="M.4-1.4h3.2M.4 1.2h3.2M.4 3h3.2" stroke="${SCK.gold}" stroke-width=".6"/><path d="M-4-4q2-2 4-2" stroke="${SCK.goldHi}" stroke-width="1" fill="none"/><path d="M-6 16h12" stroke="#55585E" stroke-width="2.4"/></g>`
        + `<circle cx="68" cy="8" r="1.4" fill="none" stroke="#BFE0EA" stroke-width=".9"/><circle cx="65" cy="12" r="1" fill="none" stroke="#BFE0EA" stroke-width=".8"/><circle cx="70" cy="2" r="1.8" fill="none" stroke="#BFE0EA" stroke-width=".9"/>`
        + `<path d="M98 22q4-3 8 0-4 3-8 0l-3-2v4zM18 30q3-2 6 0-3 2-6 0l-2-1.6v3.2zM26 40q3-2 6 0-3 2-6 0l-2-1.6v3.2z" fill="#1E3E46"/>`;
    } },
});
