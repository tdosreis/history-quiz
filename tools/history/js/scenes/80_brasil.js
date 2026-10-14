/* Brasil — the scenes of colonial and imperial Brazil, from the landfall of 1500 to the Republic (conventions in _core.js) */
Object.assign(SCENE, {
  /* the landfall of 1500: a long forested coast with its beach, the great round hill inland, naus with plain sails anchored in the bay and a boat rowing in */
  chegada_cabral: {
    label: 'Uma costa verde com praia e um monte alto e redondo, com naus ancoradas na baía',
    rx: /\b(monte pascoal|porto seguro|nau|naus)\b/,
    draw: () => {
      const R = v => Math.round(v * 10) / 10;
      const nau = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">` + SCH.g(`<path d="M-1-5V-27M-9.4-5V-21M8-8V-20" fill="none" stroke-width="1.8"/>
        <path d="M-6.4-19h10.8q1.6 5.4 0 10.8H-6.4q-1.6-5.4 0-10.8zM-4.8-26.6h7.6q1 3 0 6h-7.6q-1-3 0-6zM-14-18h9.2q1.4 4.4 0 8.8H-14q-1.4-4.4 0-8.8zM8.6-20.6 14-10H8.6z" fill="${SCK.white}" stroke-width="1.3"/>
        <path d="M-16-6h20l3-3.4h6.4L12-3q-2 5-9 5H-9q-6 0-7-8z" fill="#6E4426" stroke-width="1.5"/>`, 1.5)
        + `<path d="M-14-2.6h24" stroke="${SCK.ochre}" stroke-width="1.2"/></g>`;
      let top = '';
      for (let i = 0; i < 14; i++) top += `q3 ${R(-1.4 - i * .32 - (i % 2) * .8)} 6 -.7`;
      return SCH.bg('#CDE0E1') + SCH.sun(22, 15, 6, '#F6EBCB') + `<ellipse cx="50" cy="12" rx="14" ry="2.4" fill="${SCK.white}" opacity=".7"/>`
        + `<path d="M0 44h120v36H0z" fill="${SCK.sea}"/><path d="M0 44q14-4 30-1v1H0z" fill="#8FA89A"/>`
        + SCH.g(`<path d="M44 47C54 40 60 26 70 17 78 9 92 8 99 16 106 24 110 34 120 37V50H44z" fill="#5E7A44"/>`, 1.8)
        + `<path d="M72 22q8-6 16-5M66 32q6-2 10 1M94 24q5 4 7 10M82 30q4-2 8 0" stroke="#3E5430" stroke-width="1.2" fill="none" opacity=".7"/><path d="M76 14q8-4 16 0" stroke="#89A46C" stroke-width="1.6" fill="none"/>`
        + SCH.g(`<path d="M26 48Q60 50 82 62 94 70 98 80H120V44H26z" fill="${SCK.sand}"/>`, 1.6)
        + SCH.g(`<path d="M34 48.4${top}H122V62Q104 60 90 56 66 50 34 48.4z" fill="#4A6636"/>`, 1.6)
        + `<path d="M50 51v-3M60 52v-4M72 54v-5M84 55v-6M98 57v-6M110 58v-7M66 46v-2M90 43v-3M104 41v-3" stroke="#2E4422" stroke-width="1.2" opacity=".6"/>`
        + `<path d="M26 48.8Q60 51 82 63 94 71 98 80" stroke="${SCK.white}" stroke-width="1.8" fill="none"/>`
        + `<path d="M104 70q4-1 8 1M108 76q5-1 9 1" stroke="${SCK.ochre}" stroke-width="1.2" fill="none"/>`
        + `<path d="M26 49.6Q60 52 80 63 90 70 93 80H84Q80 70 70 64 52 54 26 50z" fill="#6F9AAE"/><path d="M0 58q8-3 16 0t16 0M30 62q8-3 16 0M0 76q8-3 16 0t16 0t16 0" stroke="#7FA3B8" stroke-width="1.2" fill="none"/>`
        + nau(9, 49, .5) + nau(55, 55, .62) + nau(26, 70, 1)
        + SCH.g(`<path d="M63 68h12l-1.6 2.6H65z" fill="#6E4426"/><path d="M60 72l5-3M70 72l3-3M80 72l-4-4" fill="none" stroke-width=".9"/>`, 1.1)
        + `<circle cx="66.6" cy="66.4" r="1.3" fill="${SCK.ink}"/><circle cx="70.6" cy="66.4" r="1.3" fill="${SCK.ink}"/><circle cx="74" cy="66" r="1.3" fill="${SCK.ink}"/>`;
    } },

  /* the mission on the plateau, 1554: a whitewashed chapel with its bell gable and a long thatched college inside a palisade, Atlantic forest and an araucaria, the river below, two black-robed fathers */
  patio_do_colegio: {
    label: 'Uma pequena igreja e colégio de taipa no alto do planalto, entre a mata',
    rx: /\b(colegio|taipa|piratininga|planalto)\b/,
    draw: () => {
      let st = '';
      for (let x = 14; x < 108; x += 3.4) if (x < 34 || x > 41) st += `M${x.toFixed(1)} 62V53.6l1.2-2.4 1.2 2.4V62z`;
      const fr = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-2.4 0q0-7 2.4-9 2.4 2 2.4 9z" fill="#1E1A1C"/><circle cy="-10.4" r="1.6" fill="#D4A47C"/><path d="M-2.6-11.4h5.2" stroke="#1E1A1C" stroke-width="1.4"/></g>`;
      return SCH.bg('#C8DCDD') + `<ellipse cx="94" cy="12" rx="14" ry="2.4" fill="${SCK.white}" opacity=".7"/>`
        + `<path d="M0 36Q20 26 44 32T86 28 120 32V50H0z" fill="#A3B9A6"/>`
        + SCH.g(`<path d="M-2 82V56Q10 50 24 49H96Q110 50 122 56V82z" fill="#A7AE6A"/>`, 1.6)
        + SCH.g(`<path d="M-2 82V40q4-6 9-2 3-6 9-1 4-5 8 0 3 4 2 12-4 4-8 6l-6 6Q8 66 14 82z" fill="#4A6636"/><path d="M122 82V42q-4-6-9-2-4-5-9 0-4-3-7 2-1 6 3 10l6 5q4 6-1 25z" fill="#4A6636"/>`, 1.6)
        + SCH.g(`<path d="M13 52V12M13 30q-6 0-9-7M13 30q6 0 9-7M13 22q-4 0-6-6M13 22q4 0 6-6" fill="none" stroke="#5A3E26" stroke-width="2"/>
          <path d="M-1 23.4q5-3.6 10 0zM17 23.4q5-3.6 10 0zM2 16.4q4-3 8 0zM16 16.4q4-3 8 0zM8 12.4q5-4 10 0z" fill="#2F4A2A" stroke-width="1.2"/>`, 1.2)
        + SCH.g(`<path d="M46 50V36h44v14z" fill="${SCK.white}"/><path d="M43 37 49 28.6H88L94 37z" fill="${SCK.ochre}"/>
          <path d="M30 51V34l8-8 8 8v17z" fill="${SCK.white}"/><path d="M35.6 26.6V19.4q2.4-3 4.8 0v7.2z" fill="${SCK.white}" stroke-width="1.3"/>
          <path d="M35.4 51V45q2.6-4 5.2 0v6z" fill="#4A3523" stroke-width="1.3"/>`, 1.6)
        + `<path d="M36.8 22.4h2.4v2.6h-2.4z" fill="${SCK.goldLo}"/><path d="M37 38h2v3h-2zM51 40h3v4h-3zM60 40h3v4h-3zM69 40h3v4h-3zM78 40h3v4h-3z" fill="#4A3523"/>`
        + `<path d="M50 32h36M47 35h42" stroke="#8A6A3A" stroke-width=".8" opacity=".8"/><path d="M30 46h60" stroke="${SCK.ochre}" stroke-width="1" opacity=".6"/>`
        + `<path d="${st}" fill="${SCK.wood}" stroke="${SCK.ink}" stroke-width=".9" stroke-linejoin="round"/><path d="M14 58h20M43 58h65" stroke="${SCK.ink}" stroke-width=".8" opacity=".5"/>`
        + `<path d="M35 62q-2 8 8 12t2 8h8q4-6-4-11t-6-9z" fill="#C9B07A" opacity=".8"/>`
        + fr(31, 70) + fr(50, 72)
        + `<path d="M-2 76Q20 70 36 76T70 78 122 74" stroke="${SCK.sea}" stroke-width="3.6" fill="none"/><path d="M-2 76Q20 70 36 76T70 78 122 74" stroke="#9CC0CF" stroke-width="1" fill="none"/>`;
    } },

  /* Palmares on the Serra da Barriga: thatched huts behind a stake palisade on the forested ridge, tall palms all round, the smoke of the cooking fires */
  quilombo_palmares: {
    label: 'Uma aldeia cercada por paliçada no alto da serra, entre palmeiras',
    rx: /\b(quilombo|quilombos|palicada|serra da barriga)\b/,
    draw: () => {
      const palm = (x, y, h, b, s) => `<g transform="translate(${x} ${y}) scale(${s})">` + SCH.g(`<path d="M-1.4 0Q${b - 1} ${-h / 2} ${b - .6} ${-h}h1.6Q${b + 1} ${-h / 2} 1.4 0z" fill="#8A6A44" stroke-width="1.4"/>
        <path d="M${b} ${-h}q-8-5-15 1 8-3 15-1zM${b} ${-h}q8-5 15 1-8-3-15-1zM${b} ${-h}q-4-8-11-9 7 4 11 9zM${b} ${-h}q4-8 11-9-7 4-11 9zM${b} ${-h}q-7 0-11 6 5-5 11-6zM${b} ${-h}q7 0 11 6-5-5-11-6z" fill="#4F7A3C" stroke-width="1.3"/>`, 1.3) + `</g>`;
      let st = '';
      for (let x = 22; x < 102; x += 3.2) st += `M${x.toFixed(1)} 50V40.6l1.1-2.2 1.1 2.2V50z`;
      const hut = (x, y, w) => SCH.g(`<path d="M${x - w / 2} ${y}v-6h${w}v6z" fill="#B98552"/><path d="M${x - w / 2 - 3} ${y - 6}L${x} ${y - 6 - w * .8} ${x + w / 2 + 3} ${y - 6}z" fill="${SCK.ochre}"/>`, 1.4)
        + `<path d="M${x - 1.6} ${y}v-3.6h3.2V${y}z" fill="#3A2A1C"/><path d="M${x - w / 4} ${y - 8}l${-w / 5} 2M${x + w / 4} ${y - 8}l${w / 5} 2" stroke="#8A6A3A" stroke-width=".8"/>`;
      return SCH.bg('#D3E2D6') + SCH.sun(98, 14, 6, '#F6EBCB')
        + `<path d="M0 40Q16 30 34 34T70 30 120 36V60H0z" fill="#A6BBA4"/>`
        + `<path d="M50 26q-4-6 1-10t0-10M79 26q4-5-1-9t2-10" stroke="${SCK.white}" stroke-width="2.4" fill="none" opacity=".75" stroke-linecap="round"/>`
        + hut(44, 40, 12) + hut(62, 38, 14) + hut(80, 40, 11) + hut(32, 42, 9) + hut(94, 42, 9)
        + palm(70, 38, 14, 2, .7) + palm(28, 40, 12, -2, .6)
        + `<path d="${st}" fill="${SCK.wood}" stroke="${SCK.ink}" stroke-width=".9" stroke-linejoin="round"/><path d="M22 46h80" stroke="${SCK.ink}" stroke-width=".9" opacity=".6"/>`
        + SCH.g(`<path d="M-2 82V54Q8 48 20 49H104Q114 49 122 55V82z" fill="#5E7A44"/>`, 1.6)
        + `<path d="M8 60q6-4 12 0M30 56q6-3 12 0M70 57q6-3 12 0M92 58q6-3 12 0M18 70q6-3 12 0M54 66q6-3 12 0M82 70q6-3 12 0" stroke="#3E5430" stroke-width="1.2" fill="none"/>`
        + palm(12, 82, 46, 4, 1) + palm(106, 82, 40, -5, 1) + palm(88, 80, 22, 3, .8);
    } },

  /* Olinda: white baroque churches and a convent crown the green hill above red roofs and coconut palms; a sugar ship in the bay, the reef breaking offshore */
  olinda: {
    label: 'Igrejas brancas no alto das colinas de uma vila costeira, com o mar e coqueiros',
    rx: /\b(olinda|pernambuco)\b/,
    draw: () => {
      const house = (x, y, w, c) => SCH.g(`<path d="M${x} ${y}v-5h${w}v5z" fill="${c}"/><path d="M${x - 1} ${y - 5}l2-3h${w - 2}l2 3z" fill="#B0533A"/>`, 1.1);
      const palm = (x, y, h, b) => SCH.g(`<path d="M${x - 1} ${y}Q${x + b - 1} ${y - h / 2} ${x + b} ${y - h}h1.2Q${x + b + 1} ${y - h / 2} ${x + 1} ${y}z" fill="#8A6A44" stroke-width="1"/>
        <path d="M${x + b} ${y - h}q-6-4-11 1 6-2 11-1zM${x + b} ${y - h}q6-4 11 1-6-2-11-1zM${x + b} ${y - h}q-3-6-8-7 5 3 8 7zM${x + b} ${y - h}q3-6 8-7-5 3-8 7z" fill="#4F7A3C" stroke-width="1"/>`, 1.1);
      return SCH.bg('#CBDFE2') + `<ellipse cx="96" cy="12" rx="13" ry="2.4" fill="${SCK.white}" opacity=".7"/>`
        + `<path d="M0 38h120v42H0z" fill="${SCK.sea}"/><path d="M62 47h58" stroke="#3E6278" stroke-width="2.4"/><path d="M62 46q4-2 8 0t8 0 8 0 8 0 8 0 8 0 8 0" stroke="${SCK.white}" stroke-width="1.4" fill="none"/>`
        + SCH.waves(66, '#7FA3B8', 1.2).replace('M0 66', 'M60 66')
        + SCH.g(`<path d="M-2 82V30Q10 22 22 22 38 22 50 32 64 44 76 56 86 66 92 82z" fill="${SCK.green}"/>`, 1.6)
        + SCH.g(`<path d="M76 56h22l-3 4H79z" fill="#6E4426"/><path d="M84 56V40M92 56V44" fill="none" stroke-width="1.3"/><path d="M84.6 41.4q6 6 0 12zM92.6 45q4.6 4 0 9.4z" fill="${SCK.white}" stroke-width="1"/>`, 1.2)
        + house(46, 42, 8, SCK.white) + house(56, 48, 7, '#E9C98B') + house(64, 55, 7, SCK.white) + house(40, 50, 7, '#C9DAB8') + house(52, 58, 8, '#E9C98B') + house(70, 62, 8, '#E8B9A8') + house(30, 58, 8, SCK.white) + house(42, 63, 7, '#E9C98B')
        + SCH.g(`<path d="M37 34V27h14v7z" fill="${SCK.white}"/><path d="M36 27.4l2.6-3.4h10.8l2.6 3.4z" fill="#B0533A" stroke-width="1.2"/>
          <path d="M8 36V12h4.6V8q2.2-3 4.4 0v4h0V36zM28 36V12h4.6V8q2.2-3 4.4 0v4V36z" fill="${SCK.white}"/>
          <path d="M12.6 36V18q2-2 4-2l2-3q4-3 8 0l2 3q2 0 4 2v18z" fill="${SCK.white}"/>`, 1.5)
        + `<path d="M8.6 11h11.4M28.6 11h8.6" stroke="${SCK.ink}" stroke-width="0"/><path d="M9.6 15h1.6v3H9.6zM31 15h1.6v3H31zM21.4 20.6a1.4 1.4 0 1 1 .1 0z" fill="#4A3523"/>`
        + `<path d="M19.4 36v-6q2.2-3.4 4.4 0v6z" fill="#4A3523" stroke="${SCK.ink}" stroke-width="1"/><path d="M14 28h3v3h-3zM26.4 28h3v3h-3zM40 29h2v3h-2zM45 29h2v3h-2z" fill="#4A3523"/>`
        + `<path d="M8 24h4.6M28 24h4.6M12.6 25h20" stroke="${SCK.ochre}" stroke-width="1"/>`
        + palm(20, 68, 18, 4) + palm(6, 78, 26, 3) + palm(64, 72, 14, -3);
    } },

  /* the bandeira on the great river: two long dugouts of men in wide hats with muskets and paddles, the rainforest walls, the morning mist */
  bandeira_canoas: {
    label: 'Canoas de exploradores descendo um rio largo na floresta',
    rx: /\b(canoa|canoas|rio amazonas|amazonas)\b/,
    draw: () => {
      const man = (x, y, c, gun) => `<g transform="translate(${x} ${y})">` + SCH.g(`<path d="M-3 0q0-6 3-6.6 3 .6 3 6.6z" fill="${c}" stroke-width="1"/><circle cy="-8" r="1.8" fill="#C79A6E" stroke-width=".8"/>
        <path d="M-4.4-9.2h8.8M-2-9.4q0-2.6 2-2.6t2 2.6" fill="#5A4026" stroke-width="1"/>${gun ? '<path d="M2.4-3 6-17" stroke-width="1.4" fill="none"/>' : '<path d="M1-4 7 6" stroke-width="1.3" fill="none"/>'}`, 1) + `</g>`;
      const canoe = (x, y, w) => SCH.g(`<path d="M${x} ${y - 1}q2 4 8 4h${w - 16}q6 0 8-4z" fill="#5E3A1E"/>`, 1.3) + `<path d="M${x + 3} ${y}h${w - 6}" stroke="#8A5A34" stroke-width="1"/>`;
      return SCH.bg('#E8E0C0') + SCH.sun(64, 22, 8, '#F7EBC4')
        + `<path d="M0 32h120v48H0z" fill="#A9864F"/><path d="M50 33q12 2 24 0M30 40q30 3 60 0M12 52q48 4 96 0" stroke="#C8A76C" stroke-width="1.4" fill="none"/>`
        + SCH.g(`<path d="M-2 66V8q4-4 8 0 3-6 9-2 4-3 7 2 4-2 6 3 4-1 5 4 3 0 4 5 4 1 4 6 3 2 3 6 3 2 3 6Q24 44 -2 66z" fill="#4A6636"/>`, 1.6)
        + SCH.g(`<path d="M122 66V10q-4-4-8 0-3-5-8-1-4-2-6 3-4-1-5 4-3 0-4 5-3 1-3 6-3 2-2 6l-2 6q30 10 38 27z" fill="#3E5430"/>`, 1.6)
        + `<path d="M8 20q3-2 6 0M14 32q3-2 6 0M6 44q3-2 6 0M24 30q2-2 4 0M104 22q3-2 6 0M98 36q3-2 6 0M108 46q3-2 6 0M88 28q2-2 4 0" stroke="#2A3E20" stroke-width="1.2" fill="none"/>`
        + `<path d="M0 30q30-4 60 0t60-2v6q-30 4-60 1T0 36z" fill="${SCK.white}" opacity=".55"/><path d="M20 42q20-3 40 0t40-1v4q-20 3-40 0t-40 1z" fill="${SCK.white}" opacity=".4"/>`
        + man(56, 44, '#E9DDBF') + man(62, 44, '#C9A66B', 1) + man(68, 44, '#E9DDBF') + canoe(50, 45, 26)
        + `<g transform="translate(-4 2) scale(1.1)">` + man(26, 64, '#E9DDBF') + man(38, 64, '#7B1E3A', 1) + man(50, 64, '#C9A66B') + man(62, 64, '#E9DDBF', 1) + man(74, 64, '#E9DDBF') + man(86, 64, '#C9A66B') + canoe(16, 65, 82) + `</g>`
        + `<path d="M14 78q8-2 16 0M44 79q10-2 20 0M78 78q8-2 16 0" stroke="#C8A76C" stroke-width="1.2" fill="none"/>`;
    } },
});
