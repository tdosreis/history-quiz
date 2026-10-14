/* Brasil — the scenes of colonial and imperial Brazil, from the landfall of 1500 to the Republic (conventions in _core.js) */
Object.assign(SCENE, {
  /* the landfall of 1500: a long forested coast with its beach, the great round hill inland, naus with plain sails anchored in the bay and a boat rowing in */
  chegada_cabral: {
    label: 'Uma costa verde com praia e um monte alto e redondo, com naus ancoradas na baía',
    rx: /\b(monte pascoal|porto seguro|nau|naus)\b/,
    draw: () => {
      const R = v => Math.round(v * 10) / 10;
      const nau = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">` + SCH.g(`<path d="M-1-5V-27M-9.4-5V-21M8-8V-20" fill="none" stroke-width="1.8"/><path d="M-6.4-19h10.8q1.6 5.4 0 10.8H-6.4q-1.6-5.4 0-10.8zM-4.8-26.6h7.6q1 3 0 6h-7.6q-1-3 0-6zM-14-18h9.2q1.4 4.4 0 8.8H-14q-1.4-4.4 0-8.8zM8.6-20.6 14-10H8.6z" fill="${SCK.white}" stroke-width="1.3"/><path d="M-16-6h20l3-3.4h6.4L12-3q-2 5-9 5H-9q-6 0-7-8z" fill="#6E4426"/><path d="M-14-2.6h24" stroke="${SCK.ochre}" stroke-width="1.2"/>`, 1.5) + `</g>`;
      let top = '';
      for (let i = 0; i < 14; i++) top += `q3 ${R(-1.4 - i * .32 - (i % 2) * .8)} 6 -.7`;
      return SCH.bg('#CDE0E1') + SCH.sun(22, 15, 6, '#F6EBCB')
        + `<path d="M0 44h120v36H0z" fill="${SCK.sea}"/>`
        + SCH.g(`<path d="M44 47C54 40 60 26 70 17 78 9 92 8 99 16 106 24 110 34 120 37V50H44z" fill="#5E7A44"/>`, 1.8)
        + `<path d="M72 22q8-6 16-5M66 32q6-2 10 1M94 24q5 4 7 10M82 30q4-2 8 0" stroke="#3E5430" stroke-width="1.2" fill="none" opacity=".7"/><path d="M76 14q8-4 16 0" stroke="#89A46C" stroke-width="1.6" fill="none"/>`
        + SCH.g(`<path d="M26 48Q60 50 82 62 94 70 98 80H120V44H26z" fill="${SCK.sand}"/><path d="M34 48.4${top}H122V62Q104 60 90 56 66 50 34 48.4z" fill="#4A6636"/>`, 1.6)
        + `<path d="M50 51v-3M60 52v-4M72 54v-5M84 55v-6M98 57v-6M110 58v-7M66 46v-2M90 43v-3M104 41v-3" stroke="#2E4422" stroke-width="1.2" opacity=".6"/>`
        + `<path d="M26 49.6Q60 52 80 63 90 70 93 80H84Q80 70 70 64 52 54 26 50z" fill="#6F9AAE"/><path d="M26 48.8Q60 51 82 63 94 71 98 80" stroke="${SCK.white}" stroke-width="1.8" fill="none"/>`
        + `<path d="M0 58q8-3 16 0t16 0M30 62q8-3 16 0M0 76q8-3 16 0t16 0t16 0" stroke="#7FA3B8" stroke-width="1.2" fill="none"/>`
        + nau(9, 49, .5) + nau(55, 55, .6) + nau(26, 70, 1)
        + SCH.g(`<path d="M63 68h12l-1.6 2.6H65z" fill="#6E4426"/><path d="M60 72l5-3M70 72l3-3M80 72l-4-4" fill="none" stroke-width=".9"/>`, 1.1)
        + `<path d="M66.6 65a1.3 1.3 0 1 0 .1 0zM70.6 65a1.3 1.3 0 1 0 .1 0zM74 64.6a1.3 1.3 0 1 0 .1 0z" fill="${SCK.ink}"/>`;
    } },

  /* the mission on the plateau, 1554: a whitewashed chapel with its bell gable and a long thatched college inside a palisade, Atlantic forest and an araucaria, the river below, two black-robed fathers */
  patio_do_colegio: {
    label: 'Uma pequena igreja e colégio de taipa no alto do planalto, entre a mata',
    rx: /\b(colegio|taipa|piratininga|planalto)\b/,
    draw: () => {
      const id = SCH.uid('pl');
      let fr = '', fh = '', fc = '';
      for (const [x, y] of [[31, 70], [50, 72]]) { fr += `M${x - 2.4} ${y}q0-7 2.4-9 2.4 2 2.4 9z`; fh += `M${x} ${y - 12}a1.6 1.6 0 1 0 .1 0z`; fc += `M${x - 2.6} ${y - 11.4}h5.2`; }
      return SCH.bg('#C8DCDD') + `<ellipse cx="94" cy="12" rx="14" ry="2.4" fill="${SCK.white}" opacity=".7"/>`
        + `<path d="M0 36Q20 26 44 32T86 28 120 32V50H0z" fill="#A3B9A6"/>`
        + SCH.g(`<path d="M-2 82V56Q10 50 24 49H96Q110 50 122 56V82z" fill="#A7AE6A"/><path d="M-2 82V40q4-6 9-2 3-6 9-1 4-5 8 0 3 4 2 12-4 4-8 6l-6 6Q8 66 14 82zM122 82V42q-4-6-9-2-4-5-9 0-4-3-7 2-1 6 3 10l6 5q4 6-1 25z" fill="#4A6636"/>`, 1.6)
        + SCH.g(`<path d="M11.6 52V28h2.8v24zM13 32l-6-6M13 30l5-6" fill="#5A3E26" stroke-width="1.2"/><path d="M1 26q-3-6 3-9 0-7 7-7 4-5 10 0 7 0 6 7 4 4 0 8-3 4-8 2-3 3-8 1-4 3-8 0-4 1-2-2z" fill="#3E5A30"/>`, 1.4)
        + `<path d="M6 18q3-2 6 0M15 14q3-2 6 0M14 22q3-2 6 0" stroke="#2A3E20" stroke-width="1.1" fill="none"/>`
        + SCH.g(`<path d="M46 50V36h44v14z" fill="${SCK.white}"/><path d="M43 37 49 28.6H88L94 37z" fill="${SCK.ochre}"/><path d="M30 51V34l8-8 8 8v17z" fill="${SCK.white}"/><path d="M35.6 26.6V19.4q2.4-3 4.8 0v7.2z" fill="${SCK.white}" stroke-width="1.3"/><path d="M35.4 51V45q2.6-4 5.2 0v6z" fill="#4A3523" stroke-width="1.3"/>`, 1.6)
        + `<path d="M36.8 22.4h2.4v2.6h-2.4z" fill="${SCK.goldLo}"/><path d="M37 38h2v3h-2zM51 40h3v4h-3zM60 40h3v4h-3zM69 40h3v4h-3zM78 40h3v4h-3z" fill="#4A3523"/>`
        + `<path d="M50 32h36M47 35h42" stroke="#8A6A3A" stroke-width=".8" opacity=".8"/><path d="M30 46h60" stroke="${SCK.ochre}" stroke-width="1" opacity=".6"/>`
        + `<defs><pattern id="${id}" x="13.5" y="50.6" width="3.4" height="13" patternUnits="userSpaceOnUse"><path d="M.5 11.4V3l1.2-2.4L2.9 3v8.4z" fill="${SCK.wood}" stroke="${SCK.ink}" stroke-width=".9" stroke-linejoin="round"/></pattern></defs>`
        + `<path d="M13.5 50.6h20.4V62H13.5zM40.7 50.6h68V62h-68z" fill="url(#${id})"/><path d="M14 58h20M43 58h65" stroke="${SCK.ink}" stroke-width=".8" opacity=".5"/>`
        + `<path d="M35 62q-2 8 8 12t2 8h8q4-6-4-11t-6-9z" fill="#C9B07A" opacity=".8"/>`
        + `<path d="${fr}" fill="#1E1A1C"/><path d="${fh}" fill="#D4A47C"/><path d="${fc}" stroke="#1E1A1C" stroke-width="1.4"/>`
        + `<path d="M-2 76Q20 70 36 76T70 78 122 74" stroke="${SCK.sea}" stroke-width="3.6" fill="none"/><path d="M-2 76Q20 70 36 76T70 78 122 74" stroke="#9CC0CF" stroke-width="1" fill="none"/>`;
    } },

  /* Palmares on the Serra da Barriga: big thatched houses crowd the flat top of the forested mountain inside a curving stockade of pointed stakes, the smoke of the cooking fires rising, palms all round */
  quilombo_palmares: {
    label: 'Uma aldeia cercada por paliçada no alto da serra, entre palmeiras',
    rx: /\b(quilombo|quilombos|palicada|serra da barriga)\b/,
    draw: () => {
      const R = v => Math.round(v * 10) / 10;
      const F = 'M0 0q9-6 17 3-9-3-17 1zM0 0q-9-6-17 3 9-3 17 1zM0 0q5-9 13-8-7 2-13 9zM0 0q-5-9-13-8 7 2 13 9zM0 0q7 1 10 9-4-6-10-7zM0 0q-7 1-10 9 4-6 10-7zM0 0q-1-8 3-11-1 5-1 11z';
      const palms = ps => { let t = '', f = ''; for (const [x, y, h, b, s] of ps) { const w = R(1.8 * s); t += `M${R(x - w)} ${y}Q${R(x + b * .3)} ${R(y - h / 2)} ${R(x + b - w / 2)} ${y - h}h${w}Q${R(x + b * .3 + w)} ${R(y - h / 2)} ${R(x + w)} ${y}z`; f += F.replace(/-?\d*\.?\d+/g, n => R(n * s)).replace(/M0 0/g, `M${R(x + b)} ${y - h}`); } return SCH.g(`<path d="${t}" fill="#7A5A3A"/><path d="${f}" fill="#3F6B34"/>`, 1.3); };
      const top = x => R(35.4 + 8.6 * ((x - 60) / 37) ** 2);
      let st = '', hw = '', hr = '', hd = '', th = '';
      for (let x = 23.6; x < 96; x += 3) st += `M${R(x)} ${R(top(x) + 11)}V${top(x)}l1.3-2.4 1.3 2.4V${R(top(x) + 11)}z`;
      for (const [x, y, w] of [[60, 37, 20], [42, 40, 16], [78, 40, 16], [29, 45, 12], [91, 45, 12]]) {
        hw += `M${x - w / 2} ${y}v-12h${w}v12z`; hr += `M${x - w / 2 - 3} ${y - 11}L${x} ${R(y - 12 - w * .62)} ${x + w / 2 + 3} ${y - 11}z`;
        hd += `M${x - 2} ${y - 2}v-6q2-2 4 0v6z`; th += `M${R(x - w * .3)} ${R(y - 15)}l-3 3M${R(x + w * .3)} ${R(y - 15)}l3 3M${x} ${R(y - 17 - w * .2)}v4`;
      }
      return SCH.bg('#DCE5CF') + SCH.sun(104, 12, 6, '#F6EBCB')
        + `<path d="M0 46Q16 36 34 40T76 36 120 42V64H0z" fill="#A6BBA4"/>`
        + `<path d="M53 18q-4-5 1-9t0-9M70 21q4-5-1-9t2-10" stroke="${SCK.white}" stroke-width="2.6" fill="none" opacity=".85" stroke-linecap="round"/>`
        + SCH.g(`<path d="${hw}" fill="#B98552"/><path d="${hr}" fill="${SCK.ochre}"/>`, 1.4) + `<path d="${hd}" fill="#3A2A1C"/><path d="${th}" stroke="#8A6A3A" stroke-width=".9"/>`
        + SCH.g(`<path d="M-2 82V64Q8 60 14 52 20 44 26 44H94Q100 44 106 52 112 60 122 64V82z" fill="#6E8C5A"/>`, 1.6)
        + SCH.g(`<path d="${st}" fill="${SCK.wood}"/>`, .9) + `<path d="M24 ${R(top(24) + 6)}Q60 32 96 ${R(top(96) + 6)}" stroke="${SCK.ink}" stroke-width="1" fill="none" opacity=".6"/>`
        + `<path d="M18 60q5-3 10 0M40 58q5-3 10 0M70 58q5-3 10 0M92 60q5-3 10 0M50 64q5-3 10 0" stroke="#3E5430" stroke-width="1.1" fill="none" opacity=".8"/>`
        + SCH.g(`<path d="M-2 82V72q5-5 11-2 5-5 11-1 6-5 12-1 5-4 11 0 6-5 12-1 5-4 11 0 6-5 12-1 5-4 11 0 6-5 12-1 5-4 11 0V82z" fill="#4A6636" stroke-width="1.4"/>`, 1.6)
        + `<path d="M14 77q4-2 8 0M40 76q4-2 8 0M66 77q4-2 8 0M92 76q4-2 8 0" stroke="#2E4422" stroke-width="1.1" fill="none" opacity=".7"/>`
        + palms([[30, 72, 18, -2, .7], [90, 72, 18, 2, .7], [11, 82, 50, 5, 1], [109, 82, 46, -5, 1]]);
    } },

  /* Olinda: a white baroque church with twin towers and its convent crown the green hill above red roofs and coconut palms; a sugar caravel in the bay, the reef breaking offshore */
  olinda: {
    label: 'Igrejas brancas no alto das colinas de uma vila costeira, com o mar e coqueiros',
    rx: /\b(olinda|pernambuco)\b/,
    draw: () => {
      const R = v => Math.round(v * 10) / 10;
      const F = 'M0 0q8-5 15 2-8-2-15 1zM0 0q-8-5-15 2 8-2 15 1zM0 0q4-8 11-7-6 2-11 8zM0 0q-4-8-11-7 6 2 11 8zM0 0q6 1 9 8-4-5-9-6zM0 0q-6 1-9 8 4-5 9-6z';
      let t = '', f = '', hr = '', hn = '';
      const hw = {};
      for (const [x, y, h, b, s] of [[9, 82, 32, 4, 1], [22, 82, 16, -2.4, .8], [74, 80, 11.2, -2.1, .7]]) {
        const w = R(1.4 * s); t += `M${R(x - w)} ${y}Q${R(x + b * .3)} ${R(y - h / 2)} ${R(x + b - w / 2)} ${R(y - h)}h${w}Q${R(x + b * .3 + w)} ${R(y - h / 2)} ${R(x + w)} ${y}z`;
        f += F.replace(/-?\d*\.?\d+/g, n => R(n * s)).replace(/M0 0/g, `M${R(x + b)} ${R(y - h)}`);
      }
      for (const [x, y, w, c] of [[36, 46, 8, '#E9C98B'], [26, 54, 8, SCK.white], [40, 54, 7, '#C9DAB8'], [52, 54, 8, SCK.white], [32, 62, 8, '#E8B9A8'], [46, 62, 7, '#E9C98B'], [60, 62, 8, SCK.white], [52, 70, 7, SCK.white], [66, 70, 8, '#E9C98B']]) {
        hw[c] = (hw[c] || '') + `M${x} ${y}v-6h${w}v6z`; hr += `M${x - 1} ${y - 6}l2-3.4h${w - 2}l2 3.4z`; hn += `M${x + 1.6} ${y - 4.4}h1.8v2.6h-1.8z`;
      }
      return SCH.bg('#CBDFE2') + `<ellipse cx="94" cy="12" rx="13" ry="2.4" fill="${SCK.white}" opacity=".7"/>`
        + `<path d="M0 36h120v44H0z" fill="${SCK.sea}"/><path d="M72 45h48" stroke="#3E6278" stroke-width="2.6"/><path d="M72 44q4-2 8 0t8 0 8 0 8 0 8 0 8 0" stroke="${SCK.white}" stroke-width="1.4" fill="none"/>`
        + `<path d="M84 58q8-3 16 0t16 0M92 74q8-3 16 0" stroke="#7FA3B8" stroke-width="1.2" fill="none"/>`
        + SCH.g(`<path d="M92 62h22l-3 4.4H95z" fill="#6E4426"/><path d="M100 62V46M108 62V50" fill="none" stroke-width="1.3"/><path d="M100.6 47q7 6 0 13.4zM108.6 51q5 4 0 9.6z" fill="${SCK.white}" stroke-width="1"/>`, 1.2)
        + SCH.g(`<path d="M-2 82V38H48Q58 40 66 50 78 64 86 82z" fill="${SCK.green}" stroke-width="1.6"/>` + Object.keys(hw).map(c => `<path d="${hw[c]}" fill="${c}"/>`).join('') + `<path d="${hr}" fill="#B0533A"/>`, 1.1) + `<path d="${hn}" fill="#4A3523"/>`
        + SCH.g(`<path d="M44 38V28h20v10z" fill="${SCK.white}"/><path d="M43 28.6l3-4h16l3 4z" fill="#B0533A" stroke-width="1.2"/><path d="M8 38V15h8v23zM36 38V15h8v23zM16 38V21h20v17z" fill="${SCK.white}"/><path d="M16 21q0-3 3-3 2 0 3-3 1-4 4-4t4 4q1 3 3 3 3 0 3 3z" fill="${SCK.white}"/><path d="M7 12.6h10V15H7zM35 12.6h10V15H35z" fill="${SCK.stone}" stroke-width="1.2"/><path d="M8 12.6l4-6.6 4 6.6zM36 12.6l4-6.6 4 6.6z" fill="${SCK.stone}" stroke-width="1.2"/><path d="M26 11V4.6M23.6 6.8h4.8" fill="none" stroke-width="1.4"/>`, 1.5)
        + `<path d="M12 4.2a1 1 0 1 0 .1 0zM40 4.2a1 1 0 1 0 .1 0z" fill="${SCK.ink}"/><path d="M10.4 22.4v-4q1.6-2.6 3.2 0v4zM38.4 22.4v-4q1.6-2.6 3.2 0v4z" fill="#4A3523"/>`
        + `<path d="M23.4 38v-6q2.6-4 5.2 0v6z" fill="#4A3523" stroke="${SCK.ink}" stroke-width="1"/><path d="M19 25h3v4h-3zM30 25h3v4h-3zM47 31h2.4v3H47zM52 31h2.4v3H52zM57 31h2.4v3H57zM10.4 28h3.2v3h-3.2zM38.4 28h3.2v3h-3.2zM26 14.8a1.6 1.6 0 1 0 .1 0z" fill="#4A3523"/>`
        + `<path d="M16 21h20M8 24.6h8M36 24.6h8" stroke="${SCK.ochre}" stroke-width="1"/>`
        + SCH.g(`<path d="${t}" fill="#7A5A3A"/><path d="${f}" fill="#3F6B34"/>`, 1.2);
    } },

  /* the bandeira on the great river: two long dugouts of men in wide hats with muskets and paddles, the rainforest walls, the morning mist */
  bandeira_canoas: {
    label: 'Canoas de exploradores descendo um rio largo na floresta',
    rx: /\b(canoa|canoas|rio amazonas|amazonas)\b/,
    draw: () => {
      const R = v => Math.round(v * 10) / 10;
      const crew = (ms, cx, w) => {
        const b = {}; let hd = '', ht = '', gn = '';
        for (const [x, c, g] of ms) { b[c] = (b[c] || '') + `M${x - 3} 0q0-6 3-6.6 3 .6 3 6.6z`; hd += `M${x}-9.8a1.8 1.8 0 1 0 .1 0z`; ht += `M${R(x - 4.4)}-9.2h8.8M${x - 2}-9.4q0-2.6 2-2.6t2 2.6`; gn += g ? `M${R(x + 2.4)}-3 ${x + 6}-17` : `M${x + 1}-4 ${x + 7} 6`; }
        return SCH.g(Object.keys(b).map(c => `<path d="${b[c]}" fill="${c}"/>`).join('') + `<path d="${hd}" fill="#C79A6E"/><path d="${ht}" fill="#5A4026"/><path d="${gn}" fill="none" stroke-width="1.4"/><path d="M${cx} 0q2 4 8 4h${w - 16}q6 0 8-4z" fill="#5E3A1E" stroke-width="1.3"/>`, 1)
          + `<path d="M${cx + 3} 1h${w - 6}" stroke="#8A5A34" stroke-width="1"/>`;
      };
      const L = '#E9DDBF', O = SCK.ochre;
      return SCH.bg('#E8E0C0') + SCH.sun(64, 22, 8, '#F7EBC4')
        + `<path d="M0 32h120v48H0z" fill="#A9864F"/><path d="M50 33q12 2 24 0M30 40q30 3 60 0M12 52q48 4 96 0" stroke="#C8A76C" stroke-width="1.4" fill="none"/>`
        + SCH.g(`<path d="M-2 66V8q4-4 8 0 3-6 9-2 4-3 7 2 4-2 6 3 4-1 5 4 3 0 4 5 4 1 4 6 3 2 3 6 3 2 3 6Q24 44 -2 66z" fill="#4A6636"/><path d="M122 66V10q-4-4-8 0-3-5-8-1-4-2-6 3-4-1-5 4-3 0-4 5-3 1-3 6-3 2-2 6l-2 6q30 10 38 27z" fill="#3E5430"/>`, 1.6)
        + `<path d="M8 20q3-2 6 0M14 32q3-2 6 0M6 44q3-2 6 0M24 30q2-2 4 0M104 22q3-2 6 0M98 36q3-2 6 0M108 46q3-2 6 0M88 28q2-2 4 0" stroke="#2A3E20" stroke-width="1.2" fill="none"/>`
        + `<path d="M0 30q20-4 40-1t40 0 40-2v5q-20 3-40 1t-40 1-40-1z" fill="${SCK.white}" opacity=".5"/><path d="M14 41q16-3 32 0t32 0 30-1v3q-16 3-32 1t-32 0-30 0z" fill="${SCK.white}" opacity=".35"/>`
        + `<g transform="translate(64 45) scale(.7)">` + crew([[-6, L], [0, O, 1], [6, L]], -14, 28) + `</g>`
        + `<g transform="translate(-4 72.4) scale(1.1)">` + crew([[26, L], [38, SCK.burg, 1], [50, O], [62, L, 1], [74, L], [86, O]], 16, 82) + `</g>`
        + `<path d="M14 78q8-2 16 0M44 79q10-2 20 0M78 78q8-2 16 0" stroke="#C8A76C" stroke-width="1.2" fill="none"/>`;
    } },

  /* an engenho on its stream: the overshot water wheel turning the mill under its tiled roof, the three rollers inside, the boiling-house chimney smoking, the casa-grande with its veranda and the chapel on the rise, cane in front */
  engenho_moenda: {
    label: "Um engenho de açúcar com roda d'água, casa-grande e capela, sem pessoas",
    rx: /\b(engenho|engenhos|moenda|cana|canavial|acucar|casa-grande)\b/,
    draw: () => {
      let pad = '', cane = '';
      for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6, c = Math.cos(a), s = Math.sin(a); pad += `M${(c * 12.6).toFixed(1)} ${(s * 12.6).toFixed(1)}L${(c * 17).toFixed(1)} ${(s * 17).toFixed(1)}`; }
      for (let x = 66; x < 122; x += 3) cane += `M${x} 81V${62 + (x % 2) * 3}`;
      const sp = 'M-12 0H12M0-12V12M-8.5-8.5 8.5 8.5M8.5-8.5-8.5 8.5', W = '#A87A4A';
      return SCH.bg('#CFE0DF')
        + `<path d="M0 30Q24 18 50 24T100 20 120 24V50H0z" fill="#A3B9A6"/>`
        + `<path d="M78 15q6-3 4-7M82 17q8-2 10-8" stroke="${SCK.white}" stroke-width="2.6" fill="none" opacity=".8" stroke-linecap="round"/>`
        + SCH.g(`<path d="M-2 50V46Q14 44 30 38 60 30 90 31T122 30V50z" fill="#9DB57A"/><path d="M110 40V29l5-5 5 5v11z" fill="${SCK.white}"/><path d="M113 24.4V20q2-2.6 4 0v4.4z" fill="${SCK.white}" stroke-width="1.1"/><path d="M84 40V27h24v13z" fill="${SCK.white}"/><path d="M81 28l5-6h20l5 6z" fill="#B0533A"/><path d="M81 33h28l1.6 2.6H79.4z" fill="#B0533A" stroke-width="1.1"/><path d="M74 50V18h6v32z" fill="#B0533A"/><path d="M73 18h8v2.6h-8z" fill="#8E3F2C" stroke-width="1.1"/>`, 1.4)
        + `<path d="M113.6 40v-4q1.4-2.4 2.8 0v4zM114.2 21.4h1.6v2h-1.6zM88 28.4h2v2.4h-2zM94 28.4h2v2.4h-2zM100 28.4h2v2.4h-2z" fill="#4A3523"/><path d="M82 35.6v4.4M88 35.6v4.4M94 35.6v4.4M100 35.6v4.4M106 35.6v4.4" stroke="${SCK.ink}" stroke-width="1"/>`
        + `<path d="M75 26h4M75 34h4M75 42h4" stroke="${SCK.ink}" stroke-width=".7" opacity=".5"/>`
        + SCH.g(`<path d="M64 81V58Q92 52 122 54V81z" fill="#7FA05A"/>`, 1.4) + `<path d="${cane}" stroke="#4E6B3A" stroke-width="1.6"/><path d="M66 64l4-3M72 62l-3-2M78 63l4-3M84 61l-3-2M90 62l4-3M96 60l-3-2M102 61l4-3M108 59l-3-2M114 60l4-3" stroke="#4E6B3A" stroke-width="1.2" fill="none"/>`
        + SCH.g(`<path d="M36 68V46h36v22z" fill="#4E3A28"/><path d="M47 66V52h4v14zM52 66V52h4v14zM57 66V52h4v14z" fill="${SCK.ochre}" stroke-width="1"/><path d="M45 52h18" stroke-width="2"/>`, 1.4)
        + `<path d="M38 46v22M54 46v6M70 46v22" stroke="${SCK.wood}" stroke-width="2.6"/>`
        + SCH.g(`<path d="M30 48l8-13h34l8 13z" fill="#A8553A"/>`, 1.6) + `<path d="M36 39h38M33 43.4h44" stroke="#6E2E1E" stroke-width="1" opacity=".7"/>`
        + `<path d="M-2 75Q14 71 30 75T66 77V82H-2z" fill="${SCK.sea}"/><path d="M4 76q6-2 12 0M36 78q6-2 12 0" stroke="#9CC0CF" stroke-width="1.2" fill="none"/>`
        + SCH.g(`<path d="M-2 34.6h28v4H-2z" fill="${SCK.wood}"/><path d="M4 38.6v24M16 38.6v18" fill="none" stroke-width="2"/>`, 1.3)
        + `<path d="M25 37q4 0 5 4" stroke="#9CC0CF" stroke-width="2.6" fill="none"/>`
        + `<g transform="translate(22 56)" fill="none"><path d="${pad}" stroke="${SCK.ink}" stroke-width="3.8"/><path d="${pad}" stroke="${W}" stroke-width="2"/><circle r="13" stroke="${SCK.ink}" stroke-width="3.6"/><circle r="13" stroke="${W}" stroke-width="1.8"/><path d="${sp}" stroke="${SCK.ink}" stroke-width="2.8"/><path d="${sp}" stroke="${W}" stroke-width="1.2"/><circle r="3" fill="${SCK.wood}" stroke="${SCK.ink}" stroke-width="1.4"/></g>`;
    } },

  /* Salvador, the city on the cliff: churches, towers and the governor's palace along the top of the escarpment, ladeiras climbing the green face, the warehouses of the lower town at the water's edge, ships riding in the bay */
  salvador_colonial: {
    label: 'A cidade alta com igrejas sobre a escarpa e a baía com veleiros',
    rx: /\b(salvador|baia de todos os santos|pelourinho)\b/,
    draw: () => {
      const ship = (x, y, s, f) => `<g transform="translate(${x} ${y}) scale(${s})">` + SCH.g(`<path d="M-8-6V-${f ? 27 : 21}M0-6V-${f ? 30 : 23}M8-6V-${f ? 25 : 20}M-14-6l-7-4" fill="none" stroke-width="1.6"/><path d="M-12.4-17h8.8q1 4.4 0 8.8h-8.8q-1-4.4 0-8.8zM-4.4-19h8.8q1 5 0 10h-8.8q-1-5 0-10zM4-16h8q1 4 0 8H4q-1-4 0-8z${f ? 'M-11.4-25h6.8q.8 3 0 6h-6.8q-.8-3 0-6zM-3.4-28h6.8q.8 3.4 0 6.8h-6.8q-.8-3.4 0-6.8zM4.8-23h6.4q.8 2.6 0 5.2H4.8q-.8-2.6 0-5.2z' : ''}" fill="${SCK.white}" stroke-width="1.2"/><path d="M-16-6h31l-2 5q-2 3-6 3H-10q-4 0-6-8z" fill="#5E3A1E"/><path d="M-14-3.4h27" stroke="${SCK.ochre}" stroke-width="1.2"/>`, 1.5) + `</g>`;
      const row = hs => { const w = {}; let r = ''; for (const [x, y, wd, h, c] of hs) { w[c] = (w[c] || '') + `M${x} ${y}v${-h}h${wd}v${h}z`; r += `M${x - 1} ${y - h}l2-3h${wd - 2}l2 3z`; } return Object.keys(w).map(c => `<path d="${w[c]}" fill="${c}"/>`).join('') + `<path d="${r}" fill="#B0533A"/>`; };
      const Y = '#E9C98B', P = '#E8B9A8', Wh = SCK.white;
      return SCH.bg('#CBDFE2') + `<ellipse cx="96" cy="8" rx="14" ry="2.4" fill="${SCK.white}" opacity=".7"/>`
        + SCH.g(row([[0, 36, 9, 8, Wh], [10, 36, 9, 10, Y], [94, 36, 10, 9, Wh], [106, 36, 14, 7, P], [50, 36, 28, 14, Wh]])
          + `<path d="M82 36V14h8v22z" fill="${SCK.white}"/><path d="M81 14.4l5-7 5 7z" fill="${SCK.stone}"/><path d="M22 36V12h7v24zM40 36V12h7v24zM29 36V20h11v16z" fill="${SCK.white}"/><path d="M29 20q0-2 2-2 1.4-4 3.6-4t3.4 4q2 0 2 2z" fill="${SCK.white}"/><path d="M21 9.6h9V12h-9zM39 9.6h9V12h-9z" fill="${SCK.stone}" stroke-width="1.1"/><path d="M22 9.6l3.5-5.6 3.5 5.6zM40 9.6l3.5-5.6 3.5 5.6z" fill="${SCK.stone}" stroke-width="1.1"/>`, 1.3)
        + `<path d="M24 19v-3q1.5-2 3 0v3zM42 19v-3q1.5-2 3 0v3zM84.4 21v-3q1.6-2 3.2 0v3zM33 36v-5q1.6-2.6 3.2 0v5zM53 25h2v3h-2zM58 25h2v3h-2zM63 25h2v3h-2zM68 25h2v3h-2zM73 25h2v3h-2zM53 30.6h2v3h-2zM58 30.6h2v3h-2zM68 30.6h2v3h-2zM73 30.6h2v3h-2zM63 30.4h2v5.6h-2zM3 29h2v3H3zM13 28h2v3h-2zM16 31h2v3h-2zM98 30h2v3h-2zM110 32h2v2.6h-2z" fill="#4A3523"/>`
        + SCH.g(`<path d="M-2 82V36H122V82z" fill="${SCK.green}"/>`, 1.6)
        + `<path d="M4 53 26 45 10 40M46 53 70 45 54 39 62 37M90 53 110 45 96 39" stroke="#D9BC8C" stroke-width="2.6" fill="none" stroke-linejoin="round"/>`
        + `<path d="M30 40q2-3 5-2 3-2 5 1 2 3-1 4h-8q-3-1-1-3zM78 46q2-3 5-2 3-2 5 1 2 3-1 4h-8q-3-1-1-3zM112 51q2-3 5-2 3-2 5 1 2 3-1 4h-8q-3-1-1-3zM16 49q2-3 5-2 3-2 5 1 2 3-1 4h-8q-3-1-1-3z" fill="#4A6636"/>`
        + SCH.g(row([[2, 60, 10, 6, Wh], [14, 60, 12, 7, Y], [28, 60, 10, 6, Wh], [40, 60, 14, 7, P], [56, 60, 10, 6, Wh], [68, 60, 12, 7, Y], [82, 60, 10, 6, Wh], [94, 60, 12, 7, '#C9DAB8'], [108, 60, 12, 6, Wh]]), 1.1)
        + `<path d="M6 57.4h2v2.6H6zM19 57h2v3h-2zM32 57.4h2v2.6h-2zM46 57h2v3h-2zM60 57.4h2v2.6h-2zM73 57h2v3h-2zM86 57.4h2v2.6h-2zM99 57h2v3h-2zM113 57.4h2v2.6h-2z" fill="#4A3523"/>`
        + `<path d="M-2 60h124v22H-2z" fill="${SCK.sea}" stroke="${SCK.ink}" stroke-width="1.4"/><path d="M0 62h120" stroke="${SCK.stone}" stroke-width="1.4"/>`
        + `<path d="M8 72q8-3 16 0t16 0M50 78q8-3 16 0" stroke="#7FA3B8" stroke-width="1.2" fill="none"/>`
        + ship(28, 72, .6) + ship(94, 77, .9, 1);
    } },

  /* 1808: a squadron of ships of the line under full sail enters the bay at sunrise, past the granite Sugarloaf and the fort at its foot */
  corte_1808: {
    label: 'Uma frota de naus entra numa baía guardada por um morro de pedra em forma de pão',
    rx: /\b(pao de acucar|baia de guanabara|esquadra)\b/,
    draw: () => {
      const sail = (mx, y, w, h) => `M${mx - w / 2} ${y}h${w}q1 ${h / 2} 0 ${h}h${-w}q-1 ${-h / 2} 0 ${-h}z`;
      const ship = (x, y, s, f) => `<g transform="translate(${x} ${y}) scale(${s})">` + SCH.g(`<path d="M-10-8V-40M2-8V-44M13-8V-36M-20-10l-10-6" fill="none" stroke-width="1.8"/><path d="${sail(-10, -22, 12, 12) + sail(-10, -31, 10, 8) + sail(2, -24, 14, 14) + sail(2, -35, 11, 9) + sail(13, -20, 10, 10) + sail(13, -28, 8, 7) + (f ? sail(-10, -38, 7, 5) + sail(2, -43, 8, 6) + sail(13, -34, 6, 4.6) + 'M-20-10l-10-6v6z' : '')}" fill="${SCK.white}" stroke-width="1.3"/><path d="M-22-10h40l4-3h4l-2 9q-3 6-10 6H-14q-6 0-8-12z" fill="#4A2E1A"/><path d="M-19-6.6h38M-17-2.4h34" stroke="${SCK.ochre}" stroke-width="2"/>`, 1.6)
        + (f ? `<path d="M-17-6.6h34M-15-2.4h30" stroke="${SCK.ink}" stroke-width="1.4" stroke-dasharray="1.4 2.6"/>` : '') + `</g>`;
      return SCH.bg('#EFD3A4') + `<path d="M0 30h120v24H0z" fill="#F4DFB4"/>` + SCH.sun(100, 30, 9, '#F8E9BC')
        + `<path d="M40 54Q54 40 68 44T98 38 122 42V56H40z" fill="#8FA894"/>`
        + SCH.g(`<path d="M-2 58V30Q0 10 12 6 22 4 26 20 28 36 34 58z" fill="#B3A991"/>`, 1.8)
        + `<path d="M8 12q-4 10-3 24M16 9q2 12 0 30M22 14q4 14 4 30" stroke="${SCK.ink}" stroke-width="1" fill="none" opacity=".35"/><path d="M6 10q4-3 10-3" stroke="${SCK.white}" stroke-width="1.6" fill="none" opacity=".7"/>`
        + SCH.g(`<path d="M-2 58V48q8-6 16-2 8-8 18-2 6-4 12 2 4 4 4 12z" fill="${SCK.green}"/><path d="M26 58q4-14 14-14 10 0 12 14z" fill="#5E7A44"/>`, 1.6)
        + `<path d="M0 56h120v26H0z" fill="#5F86A0"/><path d="M84 60h22M88 64h14M90 68h10" stroke="#F4D88E" stroke-width="1.4"/>`
        + SCH.g(`<path d="M-2 58v-7h30l5 7z" fill="${SCK.stone}"/><path d="M24 51v-4.4h5V51z" fill="${SCK.stone}" stroke-width="1.1"/><path d="M23.4 46.8q3.1-4 6.2 0z" fill="${SCK.stoneLo}" stroke-width="1.1"/>`, 1.4)
        + `<path d="M2 53h3v2H2zM9 53h3v2H9zM16 53h3v2h-3z" fill="#4A3523"/><path d="M0 56.4h30" stroke="${SCK.ink}" stroke-width=".7" opacity=".5"/>`
        + `<path d="M6 66q8-3 16 0M30 74q8-3 16 0t16 0M88 76q8-3 16 0" stroke="#86A6BA" stroke-width="1.2" fill="none"/>`
        + ship(84, 57, .3) + ship(103, 65, .5) + ship(60, 77, .95, 1);
    } },

  /* the Paraguay river, 1868: low casemate ironclads, one funnel each, steam upstream past the long brick battery on the bank, its guns smoking in the arched embrasures under the earth parapet, a shot splashing short */
  humaita: {
    label: 'Encouraçados de casco baixo avançam num rio diante de uma fortaleza',
    rx: /\b(humaita|encouracado|encouracados|fortaleza)\b/,
    draw: () => {
      const iron = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">`
        + `<path d="M-4-20q-8-6-18-4t-18-6" stroke="#3E3E44" stroke-width="5" fill="none" stroke-linecap="round" opacity=".85"/>`
        + SCH.g(`<path d="M-30-6V-20M24-6V-18" fill="none" stroke-width="1.4"/><path d="M-38-6H30l8 3-6 5H-34z" fill="#34363C"/><path d="M-14-6l3-8h22l3 8z" fill="#5A5C64"/><path d="M-3-14V-25h5v11z" fill="#26262C"/>`, 1.5)
        + `<path d="M-9-10h3v2.4h-3zM-1-10h3v2.4h-3zM7-10h3v2.4H7z" fill="#E9DDBF"/><path d="M-3-22.6h5" stroke="${SCK.red}" stroke-width="1.4"/><path d="M38-3q4 2 8 1M30 2q6 1 10-1M-30 3q8 2 16 0" stroke="${SCK.white}" stroke-width="1.4" fill="none"/></g>`;
      let emb = '', mz = '';
      for (let x = 47; x < 120; x += 9) { emb += `M${x} 44v-5q2.4-3.6 4.8 0v5z`; mz += `M${x + .8} 41.6h3.2`; }
      return SCH.bg('#D3DED8') + SCH.sun(22, 14, 6, '#F2EAD0')
        + `<path d="M-2 36q8-4 14-2 6-4 12-1 6-3 12 0 5-3 10-1V46H-2z" fill="${SCK.olive}"/>`
        + `<path d="M0 44h120v36H0z" fill="#6F8C98"/>`
        + SCH.g(`<path d="M24 50q8-1 12-10l8-12h78v22z" fill="#8C8A52"/><path d="M44 47V30h78v17z" fill="#A8553A"/><path d="M41 30l3-8h14v4h6v-4h7v4h6v-4h7v4h6v-4h7v4h6v-4h7v4h6v-4h6v8z" fill="#6E7E40"/>`, 1.6)
        + `<path d="M44 34.4h78M44 38.8h78M30 44l6-1M34 40l6-1" stroke="#6E2E1E" stroke-width=".7" opacity=".55"/><path d="M45 27h77" stroke="#4E5A2C" stroke-width="1" opacity=".6"/>`
        + `<path d="${emb}" fill="${SCK.ink}"/><path d="${mz}" stroke="#6A6A70" stroke-width="1.8"/><path d="M59.4 25.4h3.2M72.4 25.4h3.2M98.4 25.4h3.2M111.4 25.4h3.2" stroke="#26262C" stroke-width="2.4"/>`
        + `<path d="M62 44q-7 1-8-3 0-5 6-4 1-5 6-3 5-1 5 4 0 4-4 5zM89 44q-7 1-8-3 0-5 6-4 1-5 6-3 5-1 5 4 0 4-4 5zM87 25q-6 0-6-3t5-3q2-4 6-2 4 0 3 4-1 3-5 3z" fill="${SCK.white}" opacity=".9"/><path d="M68 34a3 3 0 1 0 .1 0zM96 33a3.4 3.4 0 1 0 .1 0zM90 16a2.4 2.4 0 1 0 .1 0z" fill="${SCK.white}" opacity=".6"/>`
        + `<path d="M0 47h120" stroke="#9FB6BE" stroke-width="1.4"/><path d="M8 56q6-2 12 0M58 58q6-2 12 0M100 64q6-2 12 0M20 77q8-2 16 0M74 78q8-2 16 0" stroke="#A8C0C8" stroke-width="1.2" fill="none"/>`
        + `<path d="M76 66q1-8 3-9 2 1 3 9z" fill="${SCK.white}" stroke="#A8C0C8" stroke-width=".8"/><path d="M73 66q6-2 12 0" stroke="${SCK.white}" stroke-width="1.4" fill="none"/>`
        + iron(98, 59, .58) + iron(42, 74, 1.12);
    } },

  /* the Lei Áurea: a golden quill on a sealed parchment beside a vase of white camellias, on a green velvet table */
  ev_abolicao_br: {
    label: 'Uma pena de ouro sobre um pergaminho com selo, entre camélias brancas',
    rx: /\b(lei aurea|abolicao|camelia|camelias|pena de ouro)\b/,
    ev: 'abolicao_br',
    draw: () => {
      const R = v => Math.round(v * 10) / 10;
      let cb = '', cp = '', cc = '';
      for (const [x, y, r] of [[86, 30, 6.4], [104, 26, 6.4], [95, 16, 5.6], [100, 38, 5.6], [80, 40, 5]]) {
        cb += `M${x} ${R(y - r)}a${r} ${r} 0 1 0 .1 0z`; cc += `M${x} ${R(y - r * .25)}a${R(r * .25)} ${R(r * .25)} 0 1 0 .1 0z`;
        cp += `M${R(x - r * .6)} ${R(y - r * .2)}q${R(r * .6)} ${R(-r * .7)} ${R(r * 1.2)} 0M${R(x - r * .7)} ${R(y + r * .3)}q${R(r * .7)} ${R(r * .6)} ${R(r * 1.4)} 0M${R(x - r * .3)} ${R(y - r * .6)}q${R(r * .3)} ${R(r * .5)} ${R(r * .6)} 0`;
      }
      return SCH.bg('#2F3B35') + `<path d="M0 0h120v40H0z" fill="#34433B"/><path d="M8 0v40M40 0v40M72 0v40M104 0v40" stroke="#26302B" stroke-width="2"/>`
        + SCH.g(`<path d="M-2 40h124v42H-2z" fill="#3E6B4A"/>`, 1.6) + `<path d="M0 43h120" stroke="#5A8A64" stroke-width="1.4"/><path d="M10 60q10 2 20 0M60 76q12 2 24 0M4 74q8 2 16 0" stroke="#2E5238" stroke-width="1.2" fill="none"/>`
        + `<g transform="rotate(-7 44 60)">` + SCH.g(`<path d="M14 46h58v28H14z" fill="${SCK.paper}"/><path d="M14 46q-4 0-4 3t4 3M72 74q4 0 4-3t-4-3" fill="#E2D4AE"/>`, 1.5)
        + `<path d="M22 52h40M22 56.4h44M22 60.8h36M22 65.2h30" stroke="${SCK.ink}" stroke-width="1.2" opacity=".3" stroke-linecap="round"/>`
        + SCH.g(`<path d="M60 68l-3 9 4-2 2 3 1-9z" fill="${SCK.red}" stroke-width=".9"/><path d="M62 61.6a5.4 5.4 0 1 0 .1 0z" fill="${SCK.red}"/>`, 1.3) + `<path d="M62 64a3 3 0 1 0 .1 0z" fill="none" stroke="#C8504A" stroke-width="1"/></g>`
        + SCH.g(`<path d="M26 74 72 34q4-2 4 2-8 14-40 34z" fill="${SCK.goldHi}"/><path d="M26 74l10-8" fill="none" stroke-width="2.6"/>`, 1.4)
        + `<path d="M34 67 72 36M44 60l3 4M52 53l3 4M60 46l3 4M66 41l3 3" stroke="${SCK.goldLo}" stroke-width="1" fill="none"/><path d="M26 74l5-4" stroke="${SCK.gold}" stroke-width="1.4"/>`
        + SCH.g(`<path d="M84 34q8 6 18-2M88 30q-4-10-10-12M98 28q2-10 10-12" fill="none" stroke="#2E4422" stroke-width="1.6"/><path d="M80 30q-6-6-2-12 6 4 2 12zM110 30q6-6 2-12-6 4-2 12zM94 40q-4-8 2-12 4 6-2 12zM104 40q8-2 10 4-6 2-10-4z" fill="#3E6B3A" stroke-width="1.1"/><path d="M86 74q-4-14 2-26h18q6 12 2 26z" fill="${SCK.sea}"/><path d="M86 48h22v-4H86z" fill="#3E6278" stroke-width="1.2"/>`, 1.4)
        + `<path d="M88 58h18M87 66h20" stroke="${SCK.white}" stroke-width="1.6" opacity=".8"/>`
        + SCH.g(`<path d="${cb}" fill="${SCK.white}"/>`, 1.3) + `<path d="${cp}" stroke="#B9AE97" stroke-width=".9" fill="none"/><path d="${cc}" fill="${SCK.gold}"/>`;
    } },

  /* dawn, 15 November 1889: a rank of infantry in blue tunics and kepis with shouldered rifles and a line of lancers on matched bays, drawn up in the tree-lined square before the long white barracks with its clock */
  republica_1889: {
    label: 'Tropas a cavalo em formação numa praça arborizada, ao amanhecer',
    rx: /\b(campo de santana|tropas|quartel|cavalaria)\b/,
    draw: () => {
      const I = SCH.uid('in'), C = SCH.uid('cv'), B = '#2B3A6A';
      let win = '', tt = '', tc = '', inf = '';
      for (let x = 14; x < 108; x += 7) if (x < 46 || x > 72) win += `M${x} 31h3v4h-3zM${x} 39.6h3v5h-3z`;
      for (const [x, y, r] of [[5, 56, 11], [115, 56, 11], [33, 51, 6], [87, 51, 6]]) { tt += `M${x - 1.6} ${y}v${-r}h3.2V${y}z`; const k = Math.round(r * 6) / 10; tc += `M${x - r} ${y - r}q0-${r} ${r}-${r}t${r} ${r}q0 ${k}-${r} ${k}t-${r}-${k}z`; }
      for (let i = 0; i < 9; i++) inf += `<use href="#${I}" transform="translate(${16 + i * 11} 56.6) scale(1.1)"/>`;
      return SCH.bg('#EDC9A2') + `<path d="M0 32h120v18H0z" fill="#F4DDBA"/>` + SCH.sun(98, 14, 7, '#F9EAC8')
        + `<defs><g id="${I}" stroke-linejoin="round"><path d="M-2.2 0v-5h4.4v5z" fill="${SCK.white}" stroke="${SCK.ink}" stroke-width=".8"/><path d="M-2.6-5.4V-11q2.6-1.4 5.2 0v5.6z" fill="${B}" stroke="${SCK.ink}" stroke-width=".8"/><circle cy="-12.6" r="1.6" fill="#C9906A"/><path d="M-1.8-13.4v-2.6h3.6v2.6z" fill="${B}"/><path d="M-1.8-14h3.6" stroke="${SCK.red}" stroke-width=".8"/><path d="M2.6-5V-20" stroke="${SCK.ink}" stroke-width="1"/></g>`
        + `<g id="${C}">` + SCH.g(`<path d="M-8-1V-10M-5-1V-10M7-1V-10M10-1V-10" fill="none" stroke-width="2.6"/><path d="M-12-15q0-5 5-5h12q3 0 4-2l3-6q1-2 3-1l3 2 3 5q1 2-1 2h-3l-3 1-2 6q-1 4-5 4H-7q-5 0-5-6z" fill="#6E4426"/><path d="M-12-15q-3 3-3 9" fill="none" stroke-width="2"/><path d="M-4-20l1-9h6l1 9z" fill="${B}"/><circle cy="-31" r="2.2" fill="#C9906A"/><path d="M-2-32.6v-3h4v3z" fill="${B}" stroke-width="1"/><path d="M0-20l2 6" fill="none" stroke-width="2"/><path d="M5-14 9-44" fill="none" stroke-width="1.2"/><path d="M8.6-44l.6-4 .8 4z" fill="#C3C8CE" stroke-width=".8"/>`, 1.7) + `<path d="M-1.6-33h4" stroke="${SCK.red}" stroke-width="1"/><path d="M-6-18.6h7" stroke="${SCK.ochre}" stroke-width="1.6"/></g></defs>`
        + SCH.g(`<path d="M10 49V27h100v22z" fill="${SCK.white}"/><path d="M8 27.6h104V24H8z" fill="${SCK.stone}"/><path d="M47 49V21h26v28z" fill="${SCK.white}"/><path d="M45 21.6 60 11l15 10.6z" fill="${SCK.stone}"/>`, 1.4)
        + `<path d="${win}M50 30h3v4h-3zM67 30h3v4h-3zM55.6 39q4.4-5 8.8 0v10h-8.8z" fill="#4A3523"/><path d="M47 24h26M10 46h100" stroke="${SCK.stoneLo}" stroke-width="1"/><circle cx="60" cy="17" r="3" fill="${SCK.white}" stroke="${SCK.ink}" stroke-width="1"/><path d="M60 15v2l1.4 1" stroke="${SCK.ink}" stroke-width=".8" fill="none"/>`
        + `<path d="M0 49h120v31H0z" fill="#D8BE8A"/><path d="M0 49h120" stroke="${SCK.ink}" stroke-width="1.2"/><path d="M4 70h12M50 72h14M100 70h12" stroke="#B89A62" stroke-width="1.4"/>`
        + SCH.g(`<path d="${tt}" fill="#6E4A2A"/><path d="${tc}" fill="#4E6B3A"/>`, 1.4) + `<path d="M0 50h6M114 50h6" stroke="#3E5430" stroke-width="1" opacity=".6"/>`
        + inf + `<path d="M12 56.6h100" stroke="${SCK.ink}" stroke-width=".8" opacity=".4"/>`
        + [21, 61, 101].map(x => `<use href="#${C}" transform="translate(${x} 79.4) scale(.98)"/>`).join('');
    } },

  /* the Rua do Ouvidor in the 1880s: two-storey sobrados with iron balconies and striped shop awnings, a gas lamp, a hooded carriage passing, a top hat and a parasol on the pavement */
  rio_oitocentista: {
    label: 'Uma rua estreita do Rio do século XIX, com sobrados de sacadas de ferro e uma carruagem',
    rx: /\b(rua do ouvidor|sobrado|sobrados|carruagem)\b/,
    draw: () => {
      let fa = '', op = '', bal = '', aw = '';
      const st = {};
      for (const [x, w, c, a] of [[-2, 40, '#E9DDBF', SCK.red], [38, 42, '#C9DAB8', SCK.sea], [80, 42, '#E8C8B0', SCK.red]]) {
        fa += `<path d="M${x} 58V14h${w}v44z" fill="${c}"/><path d="M${x - 1} 14h${w + 2}v-3H${x - 1}z" fill="${SCK.stone}"/><path d="M${x} 40.6h${w}" fill="none" stroke-width="1.2"/>`;
        for (let i = 0; i < 3; i++) { const cx = x + w * (i + .5) / 3, X = d => Math.round((cx + d) * 10) / 10; op += `M${X(-2.4)} 33V24q2.4-2.4 4.8 0v9zM${X(-2.6)} 58V47q2.6-3 5.2 0v11z`; bal += `M${X(-4)} 33h8v4h-8zM${X(-2.6)} 33v4M${X(0)} 33v4M${X(2.6)} 33v4`; }
        const ax = x + 4; aw += `M${ax} 42h22l3 5H${ax - 3}z`; st[a] = (st[a] || '') + `M${ax + 1} 42.4l-1.4 4.4M${ax + 7} 42.4l.6 4.4M${ax + 13} 42.4l2 4.4M${ax + 19} 42.4l3 4.4`;
      }
      return SCH.bg('#CFE0E2') + SCH.g(fa, 1.4)
        + `<path d="${op}" fill="#3A3540"/><path d="${bal}" fill="none" stroke="${SCK.ink}" stroke-width="1"/>`
        + `<path d="M-2 11h124" stroke="#B0533A" stroke-width="2.4"/>` + SCH.g(`<path d="${aw}" fill="${SCK.white}"/>`, 1.1) + Object.keys(st).map(c => `<path d="${st[c]}" stroke="${c}" stroke-width="3"/>`).join('')
        + `<path d="M0 58h120v22H0z" fill="${SCK.stone}"/><path d="M0 58h120M0 61h120" stroke="${SCK.ink}" stroke-width="1"/><path d="M6 68h8M24 74h10M96 70h8M108 76h8" stroke="${SCK.ink}" stroke-width=".8" opacity=".35"/>`
        + SCH.g(`<path d="M10 62V30" fill="none" stroke-width="1.8"/><path d="M7 30h6l-1-5H8z" fill="${SCK.goldHi}" stroke-width="1.1"/><path d="M8 25l2-2.4 2 2.4z" fill="${SCK.ink}" stroke-width=".8"/><path d="M18 63q0-10 3-12h1q3 2 3 12z" fill="#7B1E3A" stroke-width="1"/><path d="M21.6 46.8a1.8 1.8 0 1 0 .1 0zM106 45.6a1.8 1.8 0 1 0 .1 0z" fill="#E2B892" stroke-width=".8"/><path d="M21 47q-5-7 0-10M15 40q6-6 13 0z" fill="${SCK.white}" stroke-width="1"/><path d="M104 62v-6h4v6zM102.6 56.4q0-7 3.4-7.4 3.4.4 3.4 7.4zM104.2 46v-4.6h3.6V46zM103 46h6" fill="#26262E" stroke-width="1"/>`, 1.2)
        + `<g transform="translate(70 78)">` + SCH.g(`<path d="M-16-1l2-10M-20-1l-2-10M-30-1l3-9M-34-1l-1-9" fill="none" stroke-width="2.4"/><path d="M-38-16q0-5 5-5h10l4-6q1-2 3-1l2 2 2 4q0 1.6-1.6 1.6H-19l-2 6q-1 4-5 4h-7q-5 0-5-5z" fill="#3A2A1E"/><path d="M-18-14h28" fill="none" stroke-width="1.2"/><path d="M-8-9V-18h20v9q0 3-3 3H-5q-3 0-3-3z" fill="${SCK.burg}"/><path d="M-2-18q0-10 10-12 6 0 6 12z" fill="#26262E"/><path d="M-1-10a5 5 0 1 0 .1 0zM13-8a4 4 0 1 0 .1 0z" fill="none" stroke-width="1.6"/><path d="M-9-18v-5h3v5zM-9.6-23h4.2v-3h-4.2z" fill="#26262E" stroke-width="1"/>`, 1.3)
        + `<path d="M-1-10v10M-6-5h10M13-8v8M9-4h8" stroke="${SCK.ink}" stroke-width=".7"/></g>`;
    } },

  /* a carnival cordão of the 1890s: a banner-bearer, a pierrot, a masked dancer and a drummer dance under a fringed banner on a pole, confetti and paper streamers in the night air */
  carnaval_cordao: {
    label: 'Um cordão de Carnaval com confetes, serpentinas e um tambor',
    rx: /\b(carnaval|confete|confetes|serpentina|serpentinas)\b/,
    draw: () => {
      const C = [SCK.goldHi, SCK.red, SCK.white, '#7FB0D0', '#E58AA0'], cf = ['', '', '', '', ''];
      for (let i = 0; i < 30; i++) cf[i % 5] += `M${i * 37 % 112 + 4} ${i * 23 % 40 + 3}h.1`;
      return SCH.bg('#33416A')
        + `<path d="M34 64V22h18v42zM88 64V18h22v46z" fill="#283453"/><path d="M38 28h4v6h-4zM45 28h4v6h-4zM92 24h4v6h-4zM101 24h4v6h-4zM96 40h4v6h-4z" fill="#F2C94C" opacity=".8"/>`
        + `<path d="M-2 64h124v18H-2z" fill="#8A7A64" stroke="${SCK.ink}" stroke-width="1.2"/><path d="M10 72h14M56 76h12M92 72h12" stroke="#6E604C" stroke-width="1.2"/>`
        + cf.map((d, i) => `<path d="${d}" stroke="${C[i]}" stroke-width="2.6" stroke-linecap="round"/>`).join('')
        + `<g fill="none" stroke-width="1.8"><path d="M30 4q10 10 22 6t20 8 24-4M70 2q8 12 20 8t32 6" stroke="${SCK.goldHi}"/><path d="M34 20q14 6 28-2t26 6M64 30q14-8 28 0t30-4" stroke="#E58AA0"/><path d="M40 12q10-6 22 0M86 12q10 6 20-2" stroke="#7FB0D0"/></g>`
        + `<g transform="translate(-13 -6)">` + SCH.g(`<path d="M30 84V14" fill="none" stroke="${SCK.wood}" stroke-width="2"/><path d="M18 16h24v18l-12 6-12-6z" fill="${SCK.red}"/><path d="M28 12h4v4h-4z" fill="${SCK.gold}" stroke-width="1"/>`, 1.4)
        + `<path d="M21 19h18v13l-9 4.6-9-4.6z" fill="none" stroke="${SCK.goldHi}" stroke-width="1"/><path d="M22.6 24q0-3.6 4-3.6 2.6 0 3.4 1.6.8-1.6 3.4-1.6 4 0 4 3.6t-4 3.6q-2.6 0-3.4-2-.8 2-3.4 2-4 0-4-3.6zM24.6 23.6q1.4-1.4 3 0-1.6 1.6-3 0zM32.4 23.6q1.4-1.4 3 0-1.6 1.6-3 0z" fill="${SCK.goldHi}" fill-rule="evenodd" stroke="${SCK.ink}" stroke-width=".9"/>`
        + `<path d="M18 34l1 3M24 37v3M30 40v3M36 37v3M42 34l-1 3" stroke="${SCK.gold}" stroke-width="1.4"/></g>`
        + SCH.g(`<g transform="translate(13 80) scale(1.38)"><path d="M-6 0l1-14h8l2 14z" fill="${SCK.sea}"/><path d="M-5-14l1-10h6l1 10z" fill="${SCK.white}"/><path d="M0-30a3 3 0 1 0 .1 0z" fill="#C9906A"/><path d="M-4-29q4-4 8 0l-1-3q-3-2-6 0z" fill="${SCK.ink}" stroke-width=".8"/><path d="M-3-22l3-2" fill="none" stroke-width="1.6"/></g><g transform="translate(42 80) scale(1.38)"><path d="M-7 0q-1-10 2-20h10q3 10 2 20z" fill="${SCK.white}"/><path d="M-8-20q8 4 16 0l-2-3H-6z" fill="${SCK.white}"/><path d="M0-29.6a3.6 3.6 0 1 0 .1 0z" fill="#F4ECD8"/><path d="M-3.6-28q3.6-5 7.2 0l-1-3q-2.6-2-5.2 0z" fill="${SCK.ink}"/><path d="M-7-17l-7-8M7-17l6-9" fill="none" stroke-width="2.6"/><path d="M0-15.4a1.4 1.4 0 1 0 .1 0zM0-9.4a1.4 1.4 0 1 0 .1 0z" fill="${SCK.ink}" stroke="none"/><path d="M-2-26.6h1.4M1-26.6h1.4" stroke-width=".9"/><path d="M-7-21.6q7 3 14 0" stroke-width="1" fill="none"/></g><g transform="translate(74 80) scale(1.38)"><path d="M-8 0q2-12 4-16h8q2 4 4 16z" fill="${SCK.goldHi}"/><path d="M-4-16l1-8h6l1 8z" fill="${SCK.red}"/><path d="M0-30a3 3 0 1 0 .1 0z" fill="#B98060"/><path d="M-4-30q4-6 9-2l-1 2q-4-1-8 0z" fill="${SCK.red}" stroke-width=".9"/><path d="M4-31q6-6 8 0-4-2-8 0z" fill="${SCK.white}" stroke-width=".9"/><path d="M-4-22l-6-7M4-22l6-6" fill="none" stroke-width="2.2"/><path d="M-3.4-27.6h6.8v2h-6.8z" fill="${SCK.ink}" stroke="none"/><path d="M-6-8h12M-7-4h14" stroke="${SCK.red}" stroke-width="1.4"/></g><g transform="translate(104 80) scale(1.38)"><path d="M-6 0l1-14h8l1 14z" fill="${SCK.burg}"/><path d="M-5-14l1-10h6l1 10z" fill="${SCK.white}"/><path d="M0-30a3 3 0 1 0 .1 0z" fill="#8A5A3A"/><path d="M-4-29.4h8v-3h-8z" fill="${SCK.red}" stroke-width=".9"/><path d="M-10-20h16v10h-16z" fill="${SCK.red}"/><path d="M-10-20l4 10 4-10 4 10 4-10" fill="none" stroke="${SCK.goldHi}" stroke-width="1.1"/><path d="M-8-20v10M4-20v10" fill="none" stroke-width="1.1"/><path d="M3-22 10-30M-4-22-12-27" fill="none" stroke-width="1.4"/><ellipse cx="-2" cy="-20" rx="8" ry="1.6" fill="${SCK.white}" stroke-width="1"/></g>`, 1.2);
    } },

  /* the Farroupilha: gauchos in ponchos and wide hats gallop with levelled lances across the open green pampa, a lone ombu tree under a huge sky */
  farrapos_pampa: {
    label: 'Cavaleiros de poncho e lança galopam pelo pampa',
    rx: /\b(pampa|pampas|farrapos|gaucho|gauchos)\b/,
    draw: () => {
      const id = SCH.uid('gr'), lg = 'M6-12 13-8 19-9M4-12 9-6 14-5M-9-12-15-8-21-7M-7-11-11-5-16-4';
      const rider = (pc, hc) => SCH.g(`<path d="${lg}" fill="none" stroke-width="3"/><path d="${lg}" fill="none" stroke="${hc}" stroke-width="1.6"/><path d="M-13-17Q-20-16-23-9-18-12-14-13z" fill="${SCK.ink}" stroke-width="1"/><path d="M-13-17C-8-19 0-18 5-19L11-26 13-30 15-28 19-23 19-21 16-21 13-23 10-17Q9-12 4-11H-8Q-13-11-14-14Z" fill="${hc}"/><path d="M-9-26 30-38" fill="none" stroke-width="1.4"/><path d="M29-39.6 34-39.4 30-36.4z" fill="#C3C8CE" stroke-width=".8"/><path d="M-1-17l1 7" fill="none" stroke-width="2.2"/><path d="M-7-17l3-10h7l3 10q-6 2-13 0z" fill="${pc}"/><path d="M1-31.8a2.2 2.2 0 1 0 .1 0z" fill="#C9906A" stroke-width=".9"/><path d="M-4-31.6q5-1.6 10 0" fill="none" stroke-width="1.8"/><path d="M-1-31.8v-2.4h4.4v2.4z" fill="${SCK.ink}" stroke-width=".8"/><path d="M5-19 11-26" stroke-width="1.6"/>`, 1.3);
      const far = (x, y, s) => `<use href="#${id}" transform="translate(${x} ${y}) scale(${s})"/>`;
      return SCH.bg('#C7DCE3') + `<ellipse cx="30" cy="14" rx="18" ry="4" fill="${SCK.white}" opacity=".8"/><ellipse cx="82" cy="8" rx="14" ry="3" fill="${SCK.white}" opacity=".7"/><ellipse cx="66" cy="22" rx="10" ry="2.4" fill="${SCK.white}" opacity=".6"/>`
        + `<defs><g id="${id}">${rider('#7B1E3A', '#8A5A34')}</g></defs>`
        + `<path d="M0 50q30-3 60-1t60-1v32H0z" fill="#8FAE6A"/><path d="M0 50q30-3 60-1t60-1" stroke="${SCK.ink}" stroke-width="1.2" fill="none"/>`
        + SCH.g(`<path d="M100 52q-1-6 1-10l-3-4h4l2 3 2-3 2 2 1-2h3l-3 4q2 4 1 10z" fill="#5A4030"/><path d="M84 36q-4-8 4-12 0-8 10-8 6-6 14-2 8-1 10 6 6 4 2 10 2 6-6 8-8 4-16 2-6 3-12 0-8 0-8-4z" fill="#3E5A30"/>`, 1.5)
        + `<path d="M92 26q4-3 8 0M104 20q4-3 8 0M100 32q4-3 8 0M112 30q3-2 6 0" stroke="#2A3E20" stroke-width="1.2" fill="none"/>`
        + `<path d="M6 60h14M30 72h20M70 64h12M96 74h16M10 76h10" stroke="#5E7A44" stroke-width="1.2"/>`
        + far(16, 55, .5) + far(91, 61, .58)
        + `<g transform="translate(46 79) scale(1.3)">${rider(SCK.red, '#5A3A22')}<path d="M-5-23h9" stroke="${SCK.white}" stroke-width="1" opacity=".7"/></g>`
        + `<path d="M18 79.4h18M64 79.4h12" stroke="#B8A27A" stroke-width="1.6" opacity=".8"/>`;
    } },

  /* inside a colonial church: a gilded carved pulpit with its crowned sounding board on a white pillar, the curved stair with its gilt rail, candles burning, a blue-and-white azulejo dado */
  pulpito_barroco: {
    label: 'Um púlpito barroco de talha dourada numa igreja colonial, à luz de velas',
    rx: /\b(pulpito|pulpitos|sermao|sermoes|talha dourada)\b/,
    draw: () => {
      const id = SCH.uid('az');
      let cg = '', cs = '', cw = '', cl = '';
      for (const [x, h] of [[96, 30], [108, 24]]) {
        const t = 78 - h;
        cg += `M${x} ${t - 10}a5 5 0 1 0 .1 0z`; cs += `M${x - 4} 78l2-4h4l2 4zM${x - .8} 74V${t + 4}h1.6V74zM${x - 3} ${t + 4}h6l-1 2h-4z`;
        cw += `M${x - 1.2} ${t + 4}v-6h2.4v6z`; cl += `M${x} ${t - 2}q-2-2 0-5 2 3 0 5z`;
      }
      const st = 'M6 75Q18 68 22 58 26 44 40 38', rl = 'M5 66Q15 60 18 50 22 37 38 30';
      return SCH.bg('#3E302A') + `<path d="M0 72V30q0-14 10-22M120 72V30q0-14-10-22" stroke="#54443A" stroke-width="5" fill="none"/>`
        + `<defs><pattern id="${id}" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#F1ECE0"/><path d="M3 .6 5.4 3 3 5.4.6 3z" fill="#3F6AA0"/><circle cx="3" cy="3" r=".9" fill="#F1ECE0"/><path d="M0 0h1M5 0h1M0 6h1" stroke="#3F6AA0" stroke-width="1"/></pattern></defs>`
        + SCH.g(`<path d="M36 82V-2h48v84z" fill="#F1E7CF"/><path d="M-2 54h124v20H-2z" fill="url(#${id})"/><path d="M-2 52h124v2.4H-2z" fill="#2F5A8A" stroke-width="1"/>`, 1.4)
        + `<path d="M40 0v52M80 0v52" stroke="#D8CCB0" stroke-width="1.6"/>`
        + `<path d="M-2 74h124v8H-2z" fill="#6A5444" stroke="${SCK.ink}" stroke-width="1.4"/><path d="M20 74l-6 8M60 74v8M100 74l6 8" stroke="${SCK.ink}" stroke-width=".8" opacity=".5"/>`
        + SCH.g(`<path d="${st}V74H6z" fill="#5A3E2A"/>`, 1.4) + `<path d="M12 74V70M18 74V65M24 74V56M30 74V44" stroke="#3E2A1C" stroke-width="1" opacity=".8"/>`
        + `<path d="M8 72.6v-6M12 70.4v-6.4M16 67.4v-6.6M19 63.6v-7M21.4 58.6v-7.4M23.4 52.6v-7.6M26 46v-7.6M30 41.4v-7.4M34.4 39v-7" stroke="${SCK.goldLo}" stroke-width="1.6"/>`
        + `<path d="${st}${rl}" fill="none" stroke="${SCK.ink}" stroke-width="4.4" stroke-linecap="round"/><path d="${st}" fill="none" stroke="${SCK.gold}" stroke-width="2.8" stroke-linecap="round"/><path d="${rl}" fill="none" stroke="${SCK.goldHi}" stroke-width="2.4" stroke-linecap="round"/>`
        + SCH.g(`<path d="M51 14h18v22H51z" fill="${SCK.burg}"/><path d="M38 9h44l-3 4H41zM44 9q16-12 32 0z" fill="${SCK.gold}"/><path d="M58.4 3.4h3.2V1h-3.2z" fill="${SCK.goldHi}" stroke-width="1"/><path d="M41 13h38l-1 3q-2 2-4 0-2 2-4 0-2 2-4 0-2 2-4 0-2 2-4 0-2 2-4 0-2 2-4 0-2 2-4 0-2 2-4 0z" fill="${SCK.goldHi}" stroke-width="1.1"/><path d="M41 36h38v2q0 11-9 15H50q-9-4-9-15zM51 53h18l-6 9h-6z" fill="${SCK.gold}"/><path d="M38 33h44v3.4H38zM60 62a2 2 0 1 0 .1 0z" fill="${SCK.goldHi}"/>`, 1.5)
        + `<path d="M53 17h14v16H53z" fill="none" stroke="${SCK.gold}" stroke-width="1"/><path d="M60 19v12M55 25h10" stroke="#9E4A5E" stroke-width="1"/><path d="M50 7q10-7 20 0" stroke="${SCK.goldLo}" stroke-width="1.2" fill="none"/>`
        + `<path d="M46 39q4 6 0 10M74 39q-4 6 0 10M52 40q8-4 16 0M52 47q8 4 16 0M56 56h8" stroke="${SCK.goldLo}" stroke-width="1.3" fill="none"/><path d="M60 40.6a3 3 0 1 0 .1 0z" fill="${SCK.red}" stroke="${SCK.goldLo}" stroke-width="1"/>`
        + `<path d="${cg}" fill="${SCK.goldHi}" opacity=".25"/>` + SCH.g(`<path d="${cs}" fill="${SCK.gold}"/><path d="${cw}" fill="${SCK.white}"/>`, 1) + `<path d="${cl}" fill="#F7C14A" stroke="#C0601E" stroke-width=".6"/>`;
    } },
});
