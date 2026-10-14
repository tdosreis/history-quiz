/* Guerra Fria — the scenes of the Cold War and its age: the Wall, the race to space and the Moon, Cuba, Dallas, Vietnam, the end of empires, the civil rights, India and Mandela's island (conventions in _core.js) */
Object.assign(SCENE, {
  /* the Wall at dusk: the concrete slabs with their round coping and coils of wire, a watchtower sweeping its searchlight, the Brandenburg Gate and its Quadriga against a low red sun */
  ev_guerra_fria: {
    label: 'Um muro de concreto com torre de vigia corta a cidade diante de um portão de colunas',
    rx: /\b(guerra fria|muro de berlim|cortina de ferro|berlim)\b/,
    ev: 'guerra_fria',
    draw: () => {
      let cols = '', joints = '', coil = 'M0 44.6';
      for (const x of [33, 43, 53, 67, 77, 87]) cols += `M${x - 2.4} 31h4.8v18h-4.8z`;
      for (let x = 6; x < 120; x += 12) joints += `M${x} 50v19`;
      for (let i = 0; i < 40; i++) coil += 'c5-4.4-2-4.4 3 0';
      return SCH.bg('#7C8BA3') + `<path d="M0 22h120v30H0z" fill="#9A8C98"/><path d="M0 34h120v18H0z" fill="#C0907E"/>`
        + SCH.sun(60, 19, 13, '#B4462F')
        + `<path d="M0 52V38h5v-5h7v3h5v-8h8v24zM95 52V36h5v-5h6v3h4v-7h6v6h4v19z" fill="#4E586B"/><path d="M105.6 52V14h1.8v38zM106.5 14V2" stroke="#4E586B" stroke-width="1.4"/><circle cx="106.5" cy="18" r="3.4" fill="#4E586B"/>`
        + `<path d="M19 6.6 92 -1 96 16z" fill="${SCK.white}" opacity=".26"/>`
        + SCH.g(`<path d="M18 52V38h14v14zM88 52V38h14v14z" fill="${SCK.stoneLo}"/><path d="M16 38.4h18v-3H16zM86 38.4h18v-3H86z" fill="${SCK.stone}"/>
          <path d="M29 50V31h62v19z" fill="#4E586B"/><path d="${cols}" fill="#DCD2B8" stroke-width="1.2"/>
          <path d="M27 31.4h66v-7.4H27z" fill="${SCK.stone}"/><path d="M42 24h36v-5H42z" fill="#D6CCB2"/>`, 1.4)
        + `<path d="M28 27.6h64" stroke="${SCK.ink}" stroke-width=".8" opacity=".5"/>`
        + `<path d="M49.4 19l.6-3.4 1.6-1.4.6-2.6h1.6l.2 2.4 1.4-.2.8-2.4h1.6l-.2 2.6h4.2l-.2-2.6h1.6l.8 2.4 1.4.2.2-2.4h1.6l.6 2.6 1.6 1.4.6 3.4z" fill="#3F6B62" stroke="${SCK.ink}" stroke-width=".7"/><path d="M59 13.6V7.6l1-1.4 1 1.4v6zM62.4 13V3.4" fill="#3F6B62" stroke="${SCK.ink}" stroke-width=".8"/><circle cx="62.4" cy="3" r="1.4" fill="none" stroke="${SCK.ink}" stroke-width=".7"/>`
        + SCH.g(`<path d="M13.4 50V20h7v30z" fill="#BDB8AE"/><path d="M9.4 20.4v-9.4h15.2v9.4z" fill="#D2CEC4"/><path d="M8.4 11.2h17.2V8.6H8.4z" fill="#A9A498"/><path d="M14.6 8.6V5h4.8v3.6z" fill="#3A4250"/>`, 1.3)
        + `<path d="M10.6 12.6h12.8v4.2H10.6z" fill="#3A4250"/><path d="M14.4 12.6v4.2M18.6 12.6v4.2" stroke="#D2CEC4" stroke-width=".8"/><circle cx="19.4" cy="6.8" r="1.2" fill="${SCK.goldHi}"/>`
        + SCH.g(`<path d="M-2 49h124v21H-2z" fill="#CFCBC1"/><path d="M-2 46.6h124v3.6H-2z" fill="#E1DDD3"/>`, 1.6)
        + `<path d="${joints}" stroke="${SCK.ink}" stroke-width=".8" opacity=".4"/><path d="M0 64.6h120v4.6H0z" fill="#B3AEA3"/><path d="M0 52h120" stroke="${SCK.white}" stroke-width="1" opacity=".6"/><path d="M14 52v7M37 52v10M62 52v5M86 52v9M105 52v6" stroke="#ADA89C" stroke-width="2" opacity=".7"/>`
        + `<path d="${coil}" fill="none" stroke="${SCK.ink}" stroke-width=".7"/>`
        + `<path d="M0 70h120v10H0z" fill="#7F7A70"/><path d="M0 70h120" stroke="${SCK.ink}" stroke-width="1.6"/><path d="M0 75h120" stroke="#9A958A" stroke-width="1.4" stroke-dasharray="10 6"/>`;
    } },

  /* lift-off at night: a white rocket rising from its red launch tower on a column of fire, white smoke billowing over the pad, a crescent moon */
  ev_corrida_espacial: {
    label: 'Um foguete decola da plataforma de lançamento numa coluna de fogo',
    rx: /\b(corrida espacial|foguete|foguetes|lancamento)\b/,
    ev: 'corrida_espacial',
    draw: () => {
      const puff = cs => { const c = cs.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join(''); return `<g stroke="${SCK.ink}" stroke-width="3.4">${c}</g><g fill="${SCK.white}">${c}</g>`; };
      let lat = '';
      for (let y = 6; y < 62; y += 6) lat += `M30 ${y}l8 6M38 ${y}l-8 6`;
      return SCH.bg(SCK.night) + `<path d="M98 6a8 8 0 1 0 8.6 11.4 6.6 6.6 0 1 1-8.6-11.4z" fill="#F2E6C0"/>`
        + `<path d="M12 10h0M22 26h0M8 40h0M90 30h0M112 36h0M100 48h0M80 8h0M48 14h0M20 52h0M84 40h0" stroke="${SCK.goldHi}" stroke-width="1.4" stroke-linecap="round"/>`
        + SCH.star(84, 22, 2.2, SCK.goldHi) + SCH.star(16, 30, 1.8, SCK.goldHi)
        + `<path d="M30 66V4h8v62M40 16h16M40 30h16M28 4h12" fill="none" stroke="${SCK.ink}" stroke-width="3.4"/><path d="M30 66V4h8v62M40 16h16M40 30h16M28 4h12" fill="none" stroke="${SCK.red}" stroke-width="1.6"/>`
        + `<path d="${lat}" stroke="${SCK.red}" stroke-width="1.1"/>`
        + `<path d="M56 55q1 16 6 26 5-10 6-26z" fill="${SCK.red}"/><path d="M58 55q1 11 4 19 3-8 4-19z" fill="${SCK.gold}"/><path d="M60 55q.8 6 2 10 1.2-4 2-10z" fill="#FFF3CC"/>`
        + puff([[10, 72, 10], [24, 66, 9], [38, 70, 9], [48, 64, 7], [76, 64, 7], [86, 70, 9], [100, 66, 9], [112, 72, 10], [62, 79, 7], [30, 80, 7], [94, 80, 7]])
        + SCH.g(`<path d="M56 52l-4.4 4v-7l4.4-5zM68 52l4.4 4v-7l-4.4-5zM58 52l-1 3.4h4.4L60.4 52zM63.6 52l-1 3.4H67L66 52z" fill="#4A4E58"/>
          <path d="M56 52V30h12v22z" fill="${SCK.white}"/><path d="M56 30l1.6-4h8.8l1.6 4z" fill="${SCK.stone}"/>
          <path d="M57.6 26V12h8.8v14z" fill="${SCK.white}"/><path d="M57.6 12q.4-6 4.4-11 4 5 4.4 11z" fill="${SCK.white}"/>`, 1.5)
        + `<path d="M66.4 31v21M65.2 13v13" stroke="${SCK.stoneLo}" stroke-width="2.2" opacity=".7"/><path d="M56.6 34H62v7h-5.4zM62 41h5.4v7H62zM58.2 16H62v5h-3.8z" fill="${SCK.ink}" opacity=".85"/><path d="M57.6 12h8.8" stroke="${SCK.ink}" stroke-width=".9"/>`;
    } },

  /* Tranquillity: the lunar module standing on its four legs on the grey dust, a bootprint in front, the blue Earth in the black sky */
  pouso_lua: {
    label: 'O módulo lunar sobre o solo da Lua, com uma pegada e a Terra no céu negro',
    rx: /\b(lua|modulo lunar|pegada|alunissagem)\b/,
    draw: () => {
      const C = SCH.uid('lm');
      return SCH.bg('#12161F') + `<path d="M8 40h0M44 8h0M58 22h0M110 12h0M100 30h0M30 44h0M114 44h0M78 6h0" stroke="${SCK.white}" stroke-width="1" stroke-linecap="round" opacity=".8"/>`
        + `<defs><clipPath id="${C}"><circle cx="24" cy="20" r="10"/></clipPath></defs><circle cx="24" cy="20" r="10" fill="${SCK.sea}"/>`
        + `<g clip-path="url(#${C})"><path d="M18 12q4-2 6 1-1 4 2 6-2 3-6 2-3-4-2-9zM27 24q4-1 5 3l-3 4q-3-2-2-7z" fill="${SCK.green}"/><path d="M14 17q6-3 12 0M20 26q6 2 14-1M24 13q4-2 8 1" stroke="${SCK.white}" stroke-width="1.4" fill="none"/><path d="M27 8a12 12 0 0 1 0 24h12V8z" fill="#12161F" opacity=".72"/></g><circle cx="24" cy="20" r="10" fill="none" stroke="${SCK.ink}" stroke-width="1"/>`
        + `<path d="M0 50q20-4 36-1t30-2 30 1 24-1v33H0z" fill="#8F8C86"/><path d="M0 58q30-4 60-1t60-1v24H0z" fill="#B5B0A6"/>`
        + `<g fill="#9A958C" stroke="${SCK.ink}" stroke-width=".7" opacity=".9"><ellipse cx="18" cy="62" rx="8" ry="2.6"/><ellipse cx="104" cy="74" rx="10" ry="3"/><ellipse cx="44" cy="53" rx="5" ry="1.4"/><ellipse cx="110" cy="56" rx="5" ry="1.4"/></g>`
        + `<path d="M11 62.4q7-2.4 14 .6M95 74.4q9-2.4 18 .6" stroke="#CFCAC0" stroke-width="1" fill="none"/>`
        + `<path d="M50 70l58 0-8-4H58z" fill="#6E6A62" opacity=".55"/>`
        + SCH.g(`<path d="M62 44 49 64M62 53l-11 10M98 44l13 20M98 53l11 10M80 56v10" fill="none" stroke-width="3.2"/>`, 1)
        + `<path d="M62 44 49 64M62 53l-11 10M98 44l13 20M98 53l11 10M80 56v10" fill="none" stroke="${SCK.goldHi}" stroke-width="1.4" stroke-linecap="round"/>`
        + SCH.g(`<ellipse cx="49" cy="65" rx="4.4" ry="1.6" fill="${SCK.goldHi}"/><ellipse cx="111" cy="65" rx="4.4" ry="1.6" fill="${SCK.goldHi}"/><ellipse cx="80" cy="67" rx="4.6" ry="1.6" fill="${SCK.goldHi}"/>
          <path d="M63 40h34l3 4v10l-3 3H63l-3-3V44z" fill="${SCK.gold}"/>
          <path d="M66 40V29l7-8h16l6 8v11z" fill="#D9D5CC"/><path d="M72 29l3.6-4.6H78V29zM82 29v-4.6h2.4L88 29z" fill="#2B3A55" stroke-width="1"/>
          <path d="M77 33h6v7h-6z" fill="#B8B3A8" stroke-width="1"/><path d="M76 21v-3h8v3z" fill="#B8B3A8" stroke-width="1"/><path d="M95 26l6-6" fill="none" stroke-width="1.2"/>`, 1.4)
        + `<circle cx="102" cy="19" r="2.4" fill="${SCK.white}" stroke="${SCK.ink}" stroke-width="1"/><path d="M66 46h31M70 50l6 4M86 44l5 6" stroke="${SCK.goldLo}" stroke-width="1" fill="none"/><path d="M64 43h10M86 48h8" stroke="${SCK.goldHi}" stroke-width="1"/>`
        + `<path d="M78 58h4M78 61h4M78 64h4" stroke="${SCK.ink}" stroke-width=".8"/>`
        + `<g transform="translate(30 71) rotate(-14) scale(1 .62)"><path d="M-12 0c0-4 2-6 6-6s5 2 7 2 4-2 7-2 4 3 4 6-1 6-4 6-5-2-7-2-3 2-7 2-6-2-6-6z" fill="#8E8A80" stroke="${SCK.ink}" stroke-width="1"/>`
        + `<path d="M-9-4v8M-6-5v10M-3-4v8M3-4v8M6-5v10M9-4v8" stroke="${SCK.ink}" stroke-width="1.2" opacity=".6"/></g>`;
    } },

  /* the reconnaissance photograph: a missile on its trailer in a clearing among royal palms, tents and trucks beside it, the long-winged spy plane passing over */
  crise_misseis: {
    label: 'Um míssil num lançador entre palmeiras, visto de um avião espião',
    rx: /\b(missil|misseis|aviao espiao)\b/,
    draw: () => {
      const P = [[12, 30], [22, 66], [106, 62], [110, 24], [64, 24], [8, 50], [82, 66]], T = [[24, 56], [36, 63], [48, 67], [86, 58], [97, 52]];
      const fr = P.map(([x, y]) => `M${x} ${y}q-4-3-9 1m9-1q4-3 9 1m-9-1q-3-5-7-6m7 6q3-5 7-6m-7 6q-2 3-6 6m6-6q2 3 6 6m-6-6q0-4 1-7`).join(''), tr = P.map(([x, y]) => `M${x} ${y + 1}v11`).join(''), K = SCH.uid('cp');
      return SCH.bg(SCK.green) + `<path d="M0 0h120v13H0z" fill="${SCK.sky}"/><path d="M0 14q12-6 24-2t26-3 30 2 40-2v6H0z" fill="#557055"/>`
        + `<path d="M0 22q30-4 60 0t60-2" stroke="#5E7A4C" stroke-width="3" fill="none"/><path d="M0 40q40-5 80 0t40-1" stroke="#7C9A66" stroke-width="2" fill="none" opacity=".7"/>`
        + `<path d="M18 52q6-18 34-22t48 4q10 14-6 26t-50 8-26-16z" fill="#D7C597" stroke="#8C7A50" stroke-width="1"/>`
        + `<path d="M30 54q30-18 70-20" stroke="#B8A374" stroke-width="5" fill="none" opacity=".6"/>`
        + `<path d="${T.map(([x, y]) => `M${x} ${y}h9l1.6 4h-9z`).join('')}" fill="#B8B49A" stroke="${SCK.ink}" stroke-width=".9" stroke-linejoin="round"/><path d="${T.map(([x, y]) => `M${x + .8} ${y + 2}h9`).join('')}" stroke="${SCK.ink}" stroke-width=".6"/>`
        + SCH.g(`<path d="M70 62h12v5H70zM82 62.6h3.6v3.8H82zM90 36h11v5H90zM101 36.6h3.6v3.8H101z" fill="${SCK.olive}"/>`, .9)
        + `<g transform="translate(58 48) rotate(-17)">`
        + SCH.g(`<path d="M-27-5h44v10h-44z" fill="#4C5534"/><path d="M-30-3.4h40l12 3.4-12 3.4h-40z" fill="${SCK.white}"/><path d="M-30-3.4l-5-3.4h6l3 3.4zM-30 3.4l-5 3.4h6l3-3.4z" fill="${SCK.stone}" stroke-width="1"/>`, 1.2)
        + `<path d="M-26-5v-1.6h3V-5M-18-5v-1.6h3V-5M-26 5v1.6h3V5M-18 5v1.6h3V5M8-5v-1.6h3V-5M8 5v1.6h3V5" fill="${SCK.ink}"/><path d="M-30 0h40" stroke="${SCK.stoneLo}" stroke-width="1"/><path d="M4-3.4v6.8" stroke="${SCK.ink}" stroke-width=".8"/></g>`
        + `<path d="${P.map(([x, y]) => `M${x + 2} ${y + 12}l9-4`).join('')}" stroke="#3E5532" stroke-width="2.4" opacity=".55" stroke-linecap="round"/>`
        + `<defs><path id="${K}" d="${fr}"/></defs><g stroke-linecap="round" fill="none"><path d="${tr}" stroke="${SCK.ink}" stroke-width="2.8"/><path d="${tr}" stroke="#D6D2C6" stroke-width="1.2"/><use href="#${K}" stroke="${SCK.ink}" stroke-width="3.4"/><use href="#${K}" stroke="#4E7A3A" stroke-width="1.8"/></g>`
        + `<g transform="translate(92 15) rotate(-12)" fill="#2A2F38" stroke="${SCK.ink}" stroke-width=".6" stroke-linejoin="round" opacity=".92"><path d="M-14-1.4h22q4 0 6 1.4-2 1.4-6 1.4h-22zM-1-1-1-17h3.4L4-1zM-1 1-1 17h3.4L4 1zM-13-1l-2-5.6h2.4l3 5.6zM-13 1l-2 5.6h2.4l3-5.6z"/></g>`
        + `<path d="M4 12V4h8M116 12V4h-8M4 68v8h8M116 68v8h-8M56 40h8M60 36v8" fill="none" stroke="${SCK.white}" stroke-width="1.4" opacity=".9"/>`;
    } },

  /* the guerrilla on the mountain: bearded men in olive fatigues and field caps, rifles on their shoulders, climbing a trail through palms and mist */
  sierra_maestra: {
    label: 'Guerrilheiros barbudos de boina na mata de uma serra tropical',
    rx: /\b(sierra maestra|guerrilheiros|guerrilha|guerrilheiro)\b/,
    draw: () => {
      const M = SCH.uid('sm'), L = SCH.uid('sp'), u = (id, x, y, k) => `<use href="#${id}" transform="translate(${x} ${y}) scale(${k})"/>`;
      return SCH.bg(SCK.sky) + SCH.sun(92, 14, 7, '#F2EBD4')
        + `<defs><g id="${M}"><path d="M-1-10-4.4 0M1-10 4 0" stroke="${SCK.ink}" stroke-width="4.8" stroke-linecap="round"/><path d="M-1-10-4.4 0M1-10 4 0" stroke="#55603A" stroke-width="2.8" stroke-linecap="round"/>`
        + `<path d="M-6 0h3M3 0h3" stroke="${SCK.ink}" stroke-width="2.4" stroke-linecap="round"/>`
        + `<path d="M4-12.6-7-33" stroke="${SCK.ink}" stroke-width="2.6" stroke-linecap="round"/><path d="M4-12.6-7-33" stroke="#4A3523" stroke-width="1" stroke-linecap="round"/>`
        + SCH.g(`<path d="M-7.6-21h4v9h-4z" fill="${SCK.wood}"/><path d="M-3.6-10-3.8-19.6Q0-21.6 3.6-19.6L3.4-10z" fill="${SCK.olive}"/>
          <path d="M3-18.4 5-13.4 3.4-12.6" fill="none"/><circle cx=".6" cy="-23.6" r="2.8" fill="#C79A72"/>
          <path d="M-1.4-22.6q.6 3.6 3 3.4 1.8-.2 1.8-3.2l-1.2-.6q-1.4 1.2-3.6.4z" fill="#2E2620" stroke-width=".6"/>
          <path d="M-2.4-24.8v-3.2h5.6v3.2zM3.2-25.4h2.4" fill="${SCK.olive}" stroke-width="1"/>`, 1)
        + `<path d="M-2.4-15.6h5.8" stroke="${SCK.ink}" stroke-width=".6" opacity=".5"/></g>`
        + `<g id="${L}">` + SCH.g(`<path d="M-1 0q-1-14 2-26h2q-2 12-1 26z" fill="${SCK.wood}"/>
          <path d="M2-26q-10-4-16 2 8-2 16-1zM2-26q10-4 16 2-8-2-16-1zM2-26q-6-8-14-8 8 3 13 9zM2-26q6-8 14-8-8 3-13 9zM2-26q-3 8-10 12 5-6 9-12zM2-26q3 8 10 12-5-6-9-12z" fill="#3E6B3A" stroke-width="1"/>`, 1.1) + `</g></defs>`
        + `<path d="M0 34 18 16l10 8 14-14 18 18 14-10 18 14 12-8 16 10v14H0z" fill="#93AAA2"/>`
        + `<path d="M0 30h120v8H0z" fill="${SCK.white}" opacity=".5"/>`
        + `<path d="M0 46q14-14 28-12t24 4 20-10 24 6 24-2v24H0z" fill="#6E8F66"/>`
        + `<path d="M0 44h120v6H0z" fill="${SCK.white}" opacity=".4"/>`
        + `<path d="M0 54q30-10 60-6t60-6v38H0z" fill="${SCK.green}"/><path d="M0 80V64q30-4 60-12t60-8v36z" fill="#577447"/>`
        + `<path d="M24 80q14-8 38-16t58-20v6q-34 12-56 20t-30 10z" fill="#C9B48A" stroke="#8C7A50" stroke-width="1"/>`
        + u(L, 10, 66, .9) + u(L, 110, 56, .8) + u(L, 98, 50, .6)
        + u(M, 46, 72, 1.1) + u(M, 64, 66, 1) + u(M, 81, 60, .9)
        + u(L, 4, 82, 1.2) + `<path d="M108 80q-4-10 2-16 0 8 6 10-2-8 4-12v18z" fill="#3E6B3A" stroke="${SCK.ink}" stroke-width="1"/>`;
    } },
  /* Dealey Plaza, 1963: the dark open-top limousine gliding down the curving avenue, empty, the grassy knoll and its white pergola on one side, the red-brick warehouse on the other */
  carreata_dallas: {
    label: 'Um carro conversível preto numa avenida com edifício de tijolos ao fundo',
    rx: /\b(carreata|dallas|limusine|conversivel)\b/,
    draw: () => {
      const W = SCH.uid('dw');
      return SCH.bg(SCK.sky) + SCH.sun(22, 12, 6, '#F4E9CC')
        + `<defs><pattern id="${W}" x="74" y="12" width="6" height="6.4" patternUnits="userSpaceOnUse"><path d="M0 0h3.6v4H0z" fill="#3A2A24"/><path d="M0 0h3.6" stroke="#D9C9A4" stroke-width=".8"/></pattern></defs>`
        + `<path d="M0 50V30q14-6 30-4t40 6v18z" fill="#4E7A3A"/>`
        + SCH.g(`<path d="M70 50V8h46v42z" fill="#9C4A32"/><path d="M68 9.4h50V6H68z" fill="#B66A4E"/><path d="M68 22h50" fill="none" stroke-width="1"/>`, 1.4)
        + `<rect x="74" y="12" width="40" height="36" fill="url(#${W})"/><path d="M73 10.6h42" stroke="${SCK.ink}" stroke-width="1" opacity=".5"/>`
        + `<path d="M64 50q-2-10 6-12 2-6 8-4 6-4 10 2 6 0 6 8v6z" fill="#56763E" stroke="${SCK.ink}" stroke-width="1.2"/>`
        + `<path d="M0 30q-2-10 8-12 4-8 14-4 8-4 12 4 8 2 6 12z" fill="#3E6431" stroke="${SCK.ink}" stroke-width="1.2"/>`
        + SCH.g(`<path d="M6 40q16-6 34-4v-4q-18-2-34 4z" fill="${SCK.white}"/><path d="M9 39.4v5M15 37.6v5M21 36.4v5M27 35.6v5M33 35.2v5M39 35.2v5" fill="none" stroke-width="2.4"/>`, 1.2)
        + `<path d="M9 39.4v5M15 37.6v5M21 36.4v5M27 35.6v5M33 35.2v5M39 35.2v5" stroke="${SCK.white}" stroke-width="1"/><path d="M40 33q10-1 22 2" stroke="${SCK.ink}" stroke-width="1" stroke-dasharray="1 1.4" fill="none"/>`
        + `<path d="M0 48q60-6 120 2v30H0z" fill="#8C877C"/><path d="M0 48q60-6 120 2" stroke="${SCK.ink}" stroke-width="1.4" fill="none"/><path d="M0 56q60-6 120 2" stroke="${SCK.white}" stroke-width="1" stroke-dasharray="6 5" fill="none" opacity=".7"/>`
        + `<path d="M14 72h90l-4 3H18z" fill="#5E5A52" opacity=".6"/>`
        + SCH.g(`<path d="M14 69v-6q0-4 5-5l9-1h70q6 0 7 4v8z" fill="#1E2430"/><path d="M36 57l6-7h2l-3 7z" fill="#A9C4D0" stroke-width="1"/>
          <path d="M60 57v-6h8v6" fill="none" stroke="#C3C8CE" stroke-width="1.2"/>
          <circle cx="28" cy="69" r="6" fill="#26262A"/><circle cx="90" cy="69" r="6" fill="#26262A"/>
          <path d="M11 63h5v4h-5zM103 63h4v4h-4z" fill="#C3C8CE" stroke-width="1"/>`, 1.5)
        + `<circle cx="28" cy="69" r="3.6" fill="${SCK.white}"/><circle cx="90" cy="69" r="3.6" fill="${SCK.white}"/><circle cx="28" cy="69" r="2" fill="#A9AFB6"/><circle cx="90" cy="69" r="2" fill="#A9AFB6"/>`
        + `<path d="M46 56.4v-2.4h10v2.4M72 56.4v-2.6h12v2.6" stroke="#46506A" stroke-width="2" fill="none"/><path d="M17 61h85" stroke="#C3C8CE" stroke-width="1"/><path d="M19 64h4" stroke="${SCK.goldHi}" stroke-width="1.6"/>`;
    } },

  /* the paddies of the north: terraces of young rice mirroring the sky, women in conical hats bent over the shoots, a bicycle laden with bundles pushed along the dyke, karst peaks in the mist */
  arrozal_vietna: {
    label: 'Arrozais em socalcos com chapéus cônicos e uma bicicleta carregada de fardos',
    rx: /\b(arrozal|arrozais|chapeu conico|chapeus conicos|bicicleta)\b/,
    draw: () => {
      const H = SCH.uid('vh'), R = SCH.uid('vr'), A = 'M0 37q30-4 60-2t60-3V80H0z', B = 'M0 45q30-2 60 0t60-2V80H0z', C = 'M0 52q30 3 60 1t60 0V80H0z';
      const bent = (x, y) => `<use href="#${H}" x="${x}" y="${y}"/>`;
      return SCH.bg('#D3DED8')
        + `<defs><pattern id="${R}" width="4.6" height="3.2" patternUnits="userSpaceOnUse"><path d="M1 3l1-2.4M2 3V.4M3 3 2.2.6" stroke="#4E7A34" stroke-width=".7"/></pattern>`
        + `<g id="${H}"><path d="M-1 0 0-6M3 0 2-6" stroke="${SCK.ink}" stroke-width="1.6"/><path d="M3.6-5.6Q4.4-12 0-13.6L-4-12-2-5.6z" fill="#3A4258" stroke="${SCK.ink}" stroke-width=".9"/><path d="M-3-11-5.4-4" stroke="${SCK.ink}" stroke-width="1.1"/><path d="M-9-12.4 5.6-14.6-2.4-20.6z" fill="#E9D49B" stroke="${SCK.ink}" stroke-width=".9" stroke-linejoin="round"/><path d="M-3 .8h8" stroke="${SCK.white}" stroke-width="1" opacity=".7"/></g></defs>`
        + `<path d="M0 36V22l6-12q4-4 7 0l3 10 6-14q4-5 7 0l4 14 4-6q3-3 5 0l3 22z" fill="#A7BCB2"/><path d="M60 36l4-18q3-6 7 0l3 8 5-16q4-5 7 0l5 18 5-8q3-3 5 0l4 10 4-6q4-3 6 2l5 10z" fill="#8FA89C"/>`
        + `<path d="M0 30h120v8H0z" fill="${SCK.white}" opacity=".5"/>`
        + `<path d="${A}" fill="#A3C07A"/><path d="${A}" fill="url(#${R})"/><path d="${B}" fill="#C3D8DA"/><path d="M8 48h30M70 49h40M20 51h24" stroke="${SCK.white}" stroke-width="1"/>`
        + `<path d="${C}" fill="#B3CB8C"/><path d="${C}" fill="url(#${R})" opacity=".8"/>`
        + `<path d="M0 37q30-4 60-2t60-3M0 45q30-2 60 0t60-2M0 52q30 3 60 1t60 0" stroke="#6E7A44" stroke-width="2.2" fill="none"/><path d="M0 44q30-2 60 0t60-2M0 51q30 3 60 1t60 0" stroke="#E2D6A6" stroke-width=".8" fill="none"/>`
        + bent(22, 43) + bent(80, 43) + bent(62, 50) + bent(104, 50)
        + `<path d="M0 58q30-1 60-1t60-1v24H0z" fill="#B9C9A6"/><path d="M0 64q50-6 120-2v18H0z" fill="#C9B08A"/><path d="M0 66q50-6 120-2" stroke="#8C7A50" stroke-width="1" fill="none"/>`
        + `<path d="M0 74q60-6 120-2v8H0z" fill="${SCK.green}"/>`
        + SCH.g(`<circle cx="32" cy="68" r="8" fill="none" stroke-width="2.2"/><circle cx="66" cy="68" r="8" fill="none" stroke-width="2.2"/>
          <path d="M32 68l12-12h14l8 12M44 56l6 12h-18M58 56l-2-6h-6" fill="none" stroke="#3A4258" stroke-width="1.6"/>
          <path d="M22 54q0-6 6-6h18q5 0 5 6v4H22z" fill="${SCK.ochre}"/><path d="M26 48q0-6 5-6h12q4 0 4 6z" fill="${SCK.sand}"/><path d="M46 62h10v-5H46z" fill="${SCK.ochre}"/>`, 1.3)
        + `<path d="M30 48v10M40 48v10M33 42v6M40 42v6" stroke="${SCK.ink}" stroke-width=".8" opacity=".6"/>`
        + SCH.g(`<path d="M80 72l3-10M85 72l-.4-10" fill="none" stroke-width="2.6"/><path d="M79 63q0-11 4-12h3q3 1 3 12z" fill="#3A4258"/>
          <path d="M83 54l-12 2M83 54l-6 4" fill="none" stroke-width="1.6"/><circle cx="84.6" cy="48" r="2.4" fill="#C79A72"/><path d="M76 49l8.6-6 8.4 6z" fill="#E9D49B"/>`, 1.2)
        + `<path d="M78 72h4M83 72h4" stroke="${SCK.ink}" stroke-width="1.6"/>`;
    } },

  /* No. 10: the black Georgian door with its fanlight and lion knocker, the iron lantern above, black railings, sooty brick and white sashes, an empty step */
  downing_street: {
    label: 'Uma porta preta georgiana com lampião, numa fachada de tijolo escuro',
    rx: /\b(downing street|porta preta)\b/,
    draw: () => {
      const B = SCH.uid('db');
      let rail = '';
      for (let x = 3; x < 38; x += 4.4) rail += `M${x.toFixed(1)} 74V57`;
      for (let x = 85; x < 120; x += 4.4) rail += `M${x.toFixed(1)} 74V57`;
      return SCH.bg('#2E2622')
        + `<defs><pattern id="${B}" width="8" height="5" patternUnits="userSpaceOnUse"><path d="M0 4.6h8M4 0v2.4M0 2.4h8M0 2.4v2.2" stroke="#4A3C34" stroke-width=".7" fill="none"/></pattern></defs><rect width="120" height="80" fill="url(#${B})"/>`
        + SCH.g(`<path d="M6 8h24v40H6zM90 8h24v40H90z" fill="${SCK.white}"/><path d="M8.6 10.6h18.8v34.8H8.6zM92.6 10.6h18.8v34.8H92.6z" fill="#3E4A5A"/><path d="M4 48h28v3H4zM88 48h28v3H88z" fill="${SCK.stone}"/>`, 1.4)
        + `<path d="M8.6 28h18.8M14.9 10.6v34.8M21.1 10.6v34.8M8.6 19.4h18.8M8.6 36.6h18.8M92.6 28h18.8M98.9 10.6v34.8M105.1 10.6v34.8M92.6 19.4h18.8M92.6 36.6h18.8" stroke="${SCK.white}" stroke-width="1.2"/><path d="M10 12l6 6M94 12l6 6" stroke="${SCK.white}" stroke-width="1" opacity=".4"/>`
        + SCH.g(`<path d="M40 74V30a20 20 0 0 1 40 0v44z" fill="#E6DCC4"/><path d="M45 72V31a15 15 0 0 1 30 0v41z" fill="#141416"/>
          <path d="M45 31h30" fill="none" stroke-width="1.6"/><path d="M48 31a12 12 0 0 1 24 0z" fill="#3E4A5A" stroke-width="1"/>`, 1.6)
        + `<path d="M60 31V19M60 31l-8.4-8.4M60 31l8.4-8.4M60 31l-11-5M60 31l11-5" stroke="${SCK.white}" stroke-width=".9"/><path d="M50.4 31a9.6 9.6 0 0 1 19.2 0" fill="none" stroke="${SCK.white}" stroke-width=".9"/>`
        + `<path d="M48.6 35h10v11h-10zM61.4 35h10v11h-10zM48.6 49h10v9h-10zM61.4 49h10v9h-10zM48.6 61h10v8h-10zM61.4 61h10v8h-10z" fill="none" stroke="#3A3A42" stroke-width="1.4"/>`
        + `<circle cx="60" cy="40" r="2.6" fill="#141416" stroke="#4A4A52" stroke-width="1.2"/><path d="M57 59.6h6" stroke="${SCK.goldHi}" stroke-width="1.8"/><circle cx="60" cy="53" r="1.4" fill="${SCK.goldHi}"/>`
        + `<path d="M60 8q-14-6-18 4" fill="none" stroke="${SCK.ink}" stroke-width="1.6"/>`
        + SCH.g(`<path d="M55 6h10l-2 10h-6z" fill="${SCK.goldHi}"/><path d="M54 6l6-4 6 4zM56 16h8v2h-8z" fill="#141416"/>`, 1.2)
        + `<path d="M60 6v10" stroke="${SCK.ink}" stroke-width="1"/>`
        + `<path d="M0 74h120v6H0z" fill="#6E6A64"/>` + SCH.g(`<path d="M36 74h48v4H36z" fill="${SCK.white}"/>`, 1.2)
        + `<path d="${rail}" stroke="#141416" stroke-width="1.6"/><path d="M0 58h37M84 58h36M0 70h37M84 70h36" stroke="#141416" stroke-width="2"/>`
        + `<path d="${rail.replace(/M([\d.]+) 74V57/g, (m, x) => `M${x} 54.6l1.2 2.4h-2.4z`)}" fill="#141416" stroke="#141416" stroke-width="1"/>`;
    } },

  /* the island prison seen from the cold Atlantic: low stone blocks behind a fence, the white lighthouse, and far across the bay the flat top of Table Mountain under its cloth of cloud */
  robben_island: {
    label: 'Uma ilha com prisão de pedra, vista do mar, com a montanha da Mesa ao fundo',
    rx: /\b(robben|ilha|prisao)\b/,
    draw: () => {
      let win = '';
      for (let x = 24; x < 74; x += 5) win += `M${x} 44h2v3h-2z`;
      for (let x = 40; x < 66; x += 5) win += `M${x} 35h2v3h-2z`;
      return SCH.bg('#C6D6DA') + `<path d="M0 0h120v12H0z" fill="#B4C8CE"/>`
        + `<path d="M12 30l8-8 4 2 6-6h34l4 3 4-4q6 0 8 6 4 0 6 7z" fill="#8FA2AE"/><path d="M28 18.6q16-4 36 0" stroke="${SCK.white}" stroke-width="2" fill="none" opacity=".8"/>`
        + `<path d="M0 30h120v50H0z" fill="${SCK.sea}"/>` + SCH.waves(36, '#9DB8C6', 1)
        + `<path d="M0 52q8-6 20-7h80q12 1 20 6v5H0z" fill="#B3A884"/><path d="M0 55q60-5 120 0v3H0z" fill="#8E8466"/>`
        + SCH.g(`<path d="M20 51V42h56v9z" fill="${SCK.stone}"/><path d="M18 42.4 22 39h52l4 3.4z" fill="#7E8890"/>
          <path d="M36 42v-8h32v8z" fill="#D6CCB5"/><path d="M34 34.4l3-3h30l3 3z" fill="#7E8890"/>
          <path d="M80 51v-5h12v5z" fill="${SCK.stone}"/><path d="M79 46.4l2-2h10l2 2z" fill="#7E8890"/>`, 1.2)
        + `<path d="${win}" fill="${SCK.ink}" opacity=".75"/><path d="M14 52V44M28 52V45M42 52V45M56 52V45M70 52V45M84 52V45M8 52h80M8 48h80" stroke="${SCK.ink}" stroke-width=".6" opacity=".7" fill="none"/>`
        + SCH.g(`<path d="M99 52l1.6-30h6.8l1.6 30z" fill="${SCK.white}"/><path d="M99 22h10v-2H99z" fill="#4A5258"/><path d="M100.6 20v-5h6.8v5z" fill="#F2E6C0"/><path d="M99.6 15a4.4 4 0 0 1 8.8 0z" fill="#4A5258"/>`, 1.2)
        + `<path d="M101 30h6M100.6 38h7" stroke="${SCK.ink}" stroke-width=".7" opacity=".4"/><path d="M98 24 74 20v8z" fill="${SCK.white}" opacity=".18"/>`
        + `<path d="M0 60h120v20H0z" fill="#46708A"/>` + SCH.waves(62, '#A9C4D2', 1.4) + SCH.waves(70, '#7FA2B8', 1.4) + SCH.waves(77, '#A9C4D2', 1.2)
        + SCH.g(`<path d="M2 62q4-6 10-4l4 4zM108 63q4-5 10-3v3z" fill="#5A5E60"/>`, 1)
        + `<path d="M84 10q3-2.6 5 0 2-2.6 5 0M64 14q2-2 4 0 2-2 4 0" stroke="${SCK.ink}" stroke-width="1" fill="none"/>`;
    } },

  /* the March: a great peaceful crowd lining the long reflecting pool, blank placards held high, the white colonnade of the memorial at its end and in the water */
  ev_direitos_civis: {
    label: 'Uma multidão em marcha ao longo do espelho d\'água, diante de um memorial de colunas',
    rx: /\b(direitos civis|marcha|lincoln memorial|espelho d'agua)\b/,
    ev: 'direitos_civis',
    draw: () => {
      let cols = '', heads = '', shirts = '', signs = '';
      for (let x = 42.4; x < 78; x += 3.2) cols += `M${x.toFixed(1)} 20.6v9`;
      const R = [[37, 1.2], [39.4, 1.6], [42.4, 2.1], [46.2, 2.7], [51, 3.4], [57, 4.2], [64.4, 5.2], [73.4, 6.4]];
      for (const [y, s] of R) {
        const e = (y - 34) * .74;
        heads += `<path d="M1 ${y}H${(53 - e - s).toFixed(1)}M${(67 + e + s).toFixed(1)} ${y}H120" stroke="${y % 2 ? '#5A3E2E' : '#7A563E'}" stroke-width="${s}" stroke-dasharray="0 ${(s * 1.25).toFixed(1)}" stroke-linecap="round"/>`;
        shirts += `<path d="M${(s * .6).toFixed(1)} ${(y + s).toFixed(1)}H${(53 - e - s).toFixed(1)}M${(67 + e + s).toFixed(1)} ${(y + s).toFixed(1)}H120" stroke="${SCK.white}" stroke-width="${(s * 1.2).toFixed(1)}" stroke-dasharray="0 ${(s * 2.5).toFixed(1)}" stroke-linecap="round"/>`;
      }
      for (const [x, y, w] of [[6, 52, 7], [22, 44, 5], [34, 39, 4], [92, 46, 5], [106, 54, 7], [82, 40, 4], [14, 62, 8], [100, 64, 8]]) signs += `M${x} ${y + w * 2}v-${(w * 1.2).toFixed(1)}M${x - w / 2} ${y}h${w}v${(w * .8).toFixed(1)}h-${w}z`;
      return SCH.bg(SCK.sky) + `<path d="M0 20q10-6 20-2 8-6 16 0v18H0zM120 20q-10-6-20-2-8-6-16 0v18h36z" fill="#4E6B3E" stroke="${SCK.ink}" stroke-width="1"/>`
        + SCH.g(`<path d="M36 34v-4h48v4z" fill="#D9CFB6"/><path d="M41 30v-1.4h38V30z" fill="${SCK.stone}"/><path d="M42 20.6V17h36v3.6z" fill="${SCK.white}"/><path d="M45 17v-3.4h30V17z" fill="#E6DCC4"/>`, 1.2)
        + `<path d="M42 20.6h36v8H42z" fill="#6E7C86"/><path d="${cols}" stroke="${SCK.white}" stroke-width="2"/><path d="M58.4 22h3.2v6.6h-3.2z" fill="#3A3330"/>`
        + `<path d="M0 34h120v46H0z" fill="#B7AE96"/><path d="M53 35h14l36 45H17z" fill="#6E93A8" stroke="${SCK.ink}" stroke-width="1.2"/>`
        + `<path d="M50 38h20M52 40.6h16M54 43h12" stroke="${SCK.white}" stroke-width="1.4" opacity=".7"/><path d="M40 60h40M30 72h60" stroke="#9DB8C6" stroke-width="1.2"/>`
        + `<path d="M0 36h50l-34 44H0zM120 36H70l34 44h16z" fill="#3A3330"/>` + shirts + heads
        + `<path d="${signs}" fill="${SCK.white}" stroke="${SCK.ink}" stroke-width=".9"/>`;
    } },
  /* Montgomery, 1955: a round-nosed city bus of the fifties, green and cream with its ochre stripe, halted at the curb with its front door folded open, oaks along the street */
  onibus_montgomery: {
    label: 'Um ônibus urbano dos anos 1950 parado num ponto',
    rx: /\b(onibus)\b/,
    draw: () => {
      const C = SCH.uid('ob'), body = 'M11 66q-4 0-4-4V36q0-16 16-16h74q12 0 15 10l2 8v24q0 4-4 4z';
      let win = '';
      for (let x = 17; x < 88; x += 10.4) win += `<rect x="${x.toFixed(1)}" y="26.6" width="8" height="12.4" rx="1.6"/>`;
      return SCH.bg(SCK.sky)
        + `<path d="M-4 34q-2-14 12-16 4-12 18-10 10-8 22 0 12-2 14 8 8 4 4 12zM70 30q-2-12 10-16 6-10 18-6 10-4 16 4 10 2 8 14z" fill="#4E6B3E" stroke="${SCK.ink}" stroke-width="1.2"/>`
        + `<path d="M8 26v8M14 22v10M24 22v8M34 20v6M84 22v8M92 18v12M104 18v8M112 22v8" stroke="#A9B49A" stroke-width="1.2" opacity=".9"/>`
        + `<path d="M0 64h120v16H0z" fill="#8C877C"/><path d="M0 70h120v10H0z" fill="#C9BFA8"/><path d="M0 70h120" stroke="${SCK.ink}" stroke-width="1.4"/><path d="M0 72h120" stroke="${SCK.white}" stroke-width="1" opacity=".6"/>`
        + `<path d="M6 70h110l-3 3H8z" fill="#5E5A52" opacity=".4"/>`
        + `<defs><clipPath id="${C}"><path d="${body}"/></clipPath></defs><path d="${body}" fill="${SCK.white}"/>`
        + `<g clip-path="url(#${C})"><path d="M0 47h120v20H0z" fill="#3F6B4A"/><path d="M0 43.6h120v3.4H0z" fill="${SCK.gold}"/></g>`
        + SCH.g(`<path d="${body}" fill="none"/><g fill="#3E4A5A" stroke-width="1.1">${win}<path d="M8.6 39V33q0-8 6-10.4V39z"/><path d="M106 27h5q3 1 3.6 6l.4 6H106z"/></g>
          <path d="M94 26h10v38H94z" fill="#23262C" stroke-width="1.2"/><path d="M94 26h2.4v38H94zM101.6 26h2.4v38h-2.4z" fill="#8C9AA4" stroke-width=".8"/><path d="M96.4 59h5.2v5h-5.2z" fill="${SCK.stone}" stroke-width=".8"/>
          <path d="M104 21.6h8v3.4h-8z" fill="#F4F0E4" stroke-width="1"/><path d="M18 64a8 8 0 0 1 16 0zM76 64a8 8 0 0 1 16 0z" fill="#23262C" stroke-width="1"/>
          <circle cx="26" cy="65" r="5.6" fill="#26262A"/><circle cx="84" cy="65" r="5.6" fill="#26262A"/><circle cx="114" cy="54" r="1.8" fill="${SCK.goldHi}" stroke-width="1"/>
          <path d="M3 76V44" stroke-width="2.4"/><path d="M-1 34h8v10h-8z" fill="${SCK.white}" stroke-width="1.2"/>`, 1.4)
        + `<path d="M3 75V45" stroke="#7E8890" stroke-width="1"/><path d="M0 36.4h6" stroke="#3F6B4A" stroke-width="2"/>`
        + `<circle cx="26" cy="65" r="2.4" fill="#A9AFB6"/><circle cx="84" cy="65" r="2.4" fill="#A9AFB6"/><path d="M99 28v28" stroke="#C3C8CE" stroke-width=".8"/><path d="M19 30l4 4M40 30l4 4M61 30l4 4M108 29l3 3" stroke="${SCK.sky}" stroke-width="1.2" opacity=".6"/>`
        + `<path d="M9 51h5M9 54h5M9 57h5" stroke="${SCK.ink}" stroke-width=".9" opacity=".7"/><path d="M7 57.4h87M104 57.4h11" stroke="${SCK.ink}" stroke-width=".7" opacity=".5"/><path d="M106 63.6h10" stroke="#C3C8CE" stroke-width="2"/><path d="M20 20.6h0M60 20h0M96 20.6h0" stroke="${SCK.gold}" stroke-width="1.8" stroke-linecap="round"/>`;
    } },

  /* the spinning wheel: a wooden charkha on a plain mat, its spokes laced with cord, a thread drawn from the spindle to a puff of raw cotton, a mud wall and a window on the fields */
  roca_gandhi: {
    label: 'Uma roca de fiar de madeira com um fio de algodão, sobre um tapete simples',
    rx: /\b(roca|roca de fiar|charkha|algodao)\b/,
    draw: () => {
      let sp = '', rim = '';
      for (let i = 0; i < 8; i++) {
        const a = i * Math.PI / 4, b = a + Math.PI / 8;
        sp += `M68 38L${(68 + 19 * Math.cos(a)).toFixed(1)} ${(38 + 19 * Math.sin(a)).toFixed(1)}`;
        rim += `${i ? 'L' : 'M'}${(68 + 19 * Math.cos(a)).toFixed(1)} ${(38 + 19 * Math.sin(a)).toFixed(1)}L${(68 + 16.4 * Math.cos(b)).toFixed(1)} ${(38 + 16.4 * Math.sin(b)).toFixed(1)}`;
      }
      return SCH.bg('#C49A62') + `<path d="M4 12q8 2 14 0M26 30q6 2 10 0M94 48q8 2 14 0M8 44q6 2 12 0" stroke="#A87A48" stroke-width="1.4" fill="none"/>`
        + SCH.g(`<path d="M86 6h28v32H86z" fill="${SCK.wood}"/>`, 1.4) + `<path d="M89 9h22v12H89z" fill="${SCK.sky}"/><path d="M89 21h22v14H89z" fill="${SCK.green}"/><path d="M89 25q11-3 22 0M89 30q11-2 22 1" stroke="#8FB06A" stroke-width="1.2" fill="none"/><path d="M104 21v-7" stroke="${SCK.wood}" stroke-width="1"/><path d="M104 14l-4 2M104 14l4 2M104 14l-3-1M104 14l3-1" stroke="#3E6B3A" stroke-width="1.6"/>`
        + `<path d="M100 9v26M89 22h22" stroke="${SCK.ink}" stroke-width="1.2"/>`
        + `<path d="M0 56h120v24H0z" fill="#8A6A44"/>`
        + SCH.g(`<path d="M6 60h108l6 20H0z" fill="#D9C08A"/>`, 1.2) + `<path d="M5 64h110M4 68h112M2 73h116" stroke="${SCK.burg}" stroke-width="1.2" opacity=".55"/><path d="M14 60 8 80M34 60l-3 20M56 60v20M80 60l2 20M104 60l5 20" stroke="#A88A50" stroke-width=".8"/>`
        + SCH.g(`<path d="M18 62h68v4H18z" fill="${SCK.wood}"/><path d="M64 62l3-24h2l3 24zM28 62v-14h4v14z" fill="${SCK.wood}"/>`, 1.3)
        + `<path d="M30 48 68 19.4M30 48 68 56.6" stroke="${SCK.ink}" stroke-width=".7" fill="none"/>`
        + SCH.g(`<path d="${sp}" fill="none" stroke-width="2.6"/>`, 1) + `<path d="${sp}" stroke="#B07A46" stroke-width="1.2"/>`
        + `<path d="${rim}z" fill="none" stroke="${SCK.ink}" stroke-width="1.6" stroke-linejoin="round"/><path d="${rim}z" fill="none" stroke="${SCK.white}" stroke-width=".7" stroke-linejoin="round"/>`
        + SCH.g(`<circle cx="68" cy="38" r="3" fill="${SCK.wood}"/><path d="M68 38l9 8" stroke-width="2.4"/><circle cx="77.6" cy="46.6" r="1.8" fill="${SCK.wood}"/>`, 1.2)
        + `<path d="M22 48h16" stroke="${SCK.ink}" stroke-width="1.6"/><ellipse cx="30" cy="48" rx="1.6" ry="2.6" fill="${SCK.white}" stroke="${SCK.ink}" stroke-width=".8"/>`
        + `<path d="M22 48Q14 50 13 60" stroke="${SCK.white}" stroke-width="1" fill="none"/>`
        + SCH.g(`<path d="M2 70q-2-8 6-9 2-6 8-4 6-2 8 4 4 3 0 9z" fill="${SCK.white}" stroke-width="1.2"/>`, 1)
        + `<path d="M8 64q3-2 5 0M14 62q2 2 6 0" stroke="${SCK.stoneLo}" stroke-width=".8" fill="none"/>`;
    } },

  /* Calcutta's great bridge: the cantilevered steel trusses of Howrah striding over the brown Hooghly, country boats with woven hoods below, the bathing ghats and the far city in the haze */
  ponte_howrah: {
    label: 'Uma grande ponte de aço sobre um rio largo, com barcos e uma cidade movimentada',
    rx: /\b(ponte howrah|howrah|ponte de aco)\b/,
    draw: () => {
      const top = x => x < 22 ? 40 - x / 22 * 32 : x <= 30 || x >= 90 && x <= 98 ? 8 : x > 98 ? 8 + (x - 98) / 22 * 32 : 30 - 22 * ((x - 60) / 30) ** 2;
      let zig = 'M0 46', ver = '';
      for (let x = 4; x < 124; x += 8) { zig += `L${x} ${top(x).toFixed(1)}L${x + 4} 46`; ver += `M${x} ${top(x).toFixed(1)}V46`; }
      const boat = (x, y, k) => `<g transform="translate(${x} ${y}) scale(${k})">` + SCH.g(`<path d="M-14-2q14 7 28 0l4-5q-18 5-36 0z" fill="${SCK.wood}"/><path d="M-6-3q0-6 6-6t6 6z" fill="${SCK.ochre}"/>`, 1.2) + `<path d="M-3-8v5M0-9v6M3-8v5" stroke="${SCK.ink}" stroke-width=".6" opacity=".6"/></g>`;
      return SCH.bg('#C6D3D3') + SCH.sun(104, 14, 7, '#F2E6C8')
        + `<path d="M0 50V38h7v-4h6v4h5v-6h9v18zM33 50V36h8v-3h8v3h4v-6l3-3 3 3v6h10v-5h8v5h6v14zM93 50V38h6v-4h9v4h4v-6h8v18z" fill="#B0A893"/><path d="M52 30a4 4 0 0 1 8 0zM72 33a3 3 0 0 1 6 0z" fill="#B0A893"/>`
        + `<path d="M36 40h3v3h-3zM44 38h3v3h-3zM66 40h3v3h-3zM80 39h3v3h-3zM100 41h3v3h-3zM10 40h3v3h-3z" fill="#8E8670"/>`
        + `<path d="M0 50h120v30H0z" fill="#A98A5C"/><path d="M6 58h30M60 62h40M20 70h30M84 74h30" stroke="#C4A876" stroke-width="1.4"/>`
        + `<path d="M20 50h12v8H20zM88 50h12v8H88z" fill="${SCK.stoneLo}" stroke="${SCK.ink}" stroke-width="1.2"/>`
        + `<path d="${ver}" stroke="#4E5860" stroke-width=".7"/><path d="${zig}" stroke="${SCK.ink}" stroke-width="2.6" fill="none" stroke-linejoin="round"/><path d="${zig}" stroke="#8C979E" stroke-width="1.1" fill="none" stroke-linejoin="round"/>`
        + `<path d="M38 42h5v4h-5zM70 42h4v4h-4z" fill="${SCK.gold}"/><path d="M52 41h8v5h-8z" fill="${SCK.red}"/>`
        + SCH.g(`<path d="M0 40 22 8h8Q60 52 90 8h8l22 32" fill="none" stroke-width="4.4"/><path d="M-2 46h124" stroke-width="4.6"/><path d="M22 8v42M30 8v42M90 8v42M98 8v42" stroke-width="4"/>`, 1)
        + `<path d="M0 40 22 8h8Q60 52 90 8h8l22 32" fill="none" stroke="#9AA6AC" stroke-width="2.4" stroke-linejoin="round"/><path d="M-2 46h124" stroke="#9AA6AC" stroke-width="2.6"/><path d="M22 9v41M30 9v41M90 9v41M98 9v41" stroke="#9AA6AC" stroke-width="2"/>`
        + `<path d="M22 12l8 8m0-8-8 8M22 22l8 8m0-8-8 8M22 32l8 8m0-8-8 8M90 12l8 8m0-8-8 8M90 22l8 8m0-8-8 8M90 32l8 8m0-8-8 8" stroke="#4E5860" stroke-width="1"/>`
        + `<path d="M20 7h12V4H20zM88 7h12V4H88z" fill="#9AA6AC" stroke="${SCK.ink}" stroke-width="1"/>`
        + boat(48, 63, 1) + boat(86, 71, 1.2) + boat(106, 58, .7)
        + SCH.g(`<path d="M0 62h18l4 4h-4l4 4h-4l4 4h-4l4 4h-4l2 2H0z" fill="${SCK.stone}"/>`, 1.2) + `<path d="M0 66h18M0 70h22M0 74h22M0 78h22" stroke="${SCK.ink}" stroke-width=".7" opacity=".4"/>`;
    } },

  /* the border line: a double fence of barbed wire dipping over green hills and through the valley, a lone guard post on the ridge, blank warning plates, and the road stopped short at a barrier */
  zona_desmilitarizada: {
    label: 'Uma cerca de arame atravessa colinas verdes, com um posto de guarda',
    rx: /\b(zona desmilitarizada|fronteira|cerca)\b/,
    draw: () => {
      const f = x => 42 + 8 * Math.cos((x - 60) * Math.PI / 60), F = x => f(x).toFixed(1), B = x => (f(x) - 5).toFixed(1);
      let back = '', front = '', bw = '', fw = '';
      for (let x = 0; x < 124; x += 6) back += `M${x} ${B(x)}v-6.4l1.6-1.6`;
      for (let x = 2; x < 124; x += 8) front += `M${x} ${(f(x) + 2).toFixed(1)}v-13l3.4-3`;
      const X = [0, 15, 30, 45, 60, 75, 90, 105, 120];
      for (let i = 0; i < 3; i++) bw += 'M' + X.map(x => `${x} ${(f(x) - 6 - i * 2).toFixed(1)}`).join('L');
      for (let i = 0; i < 5; i++) fw += 'M' + X.map(x => `${x} ${(f(x) - 1 - i * 2.6).toFixed(1)}`).join('L');
      return SCH.bg(SCK.sky) + `<path d="M0 22q14-10 30-6t28-2 30 2 32-4v20H0z" fill="#8FA89C"/><path d="M0 28q20-8 40-2t40-4 40 2v20H0z" fill="#6E8F66"/>`
        + `<path d="M0 30C30 30 40 47 60 47S90 30 120 30V80H0z" fill="${SCK.green}"/>`
        + SCH.g(`<path d="M90 33v-10h13v10z" fill="${SCK.stone}"/><path d="M88 23.4l3-4h11l3 4z" fill="${SCK.olive}"/>`, 1.2) + `<path d="M92 25.4h9v2.6h-9z" fill="${SCK.ink}"/>`
        + `<path d="${back}" stroke="${SCK.ink}" stroke-width="1.2" fill="none"/><path d="${bw}" stroke="${SCK.ink}" stroke-width=".5" fill="none"/>`
        + `<path d="M0 46C30 46 40 60 60 60S90 46 120 46V80H0z" fill="#5E7A44"/><path d="M50 80l7-28h6l9 28z" fill="#B5AD96"/><path d="M60 62v4M60 70v6" stroke="${SCK.white}" stroke-width="1"/>`
        + `<path d="${front}" stroke="${SCK.ink}" stroke-width="3" fill="none"/><path d="${front}" stroke="${SCK.stone}" stroke-width="1.4" fill="none"/>`
        + `<path d="${fw}" stroke="${SCK.ink}" stroke-width=".7" fill="none"/><path d="${fw}" stroke="${SCK.ink}" stroke-width="2.2" stroke-dasharray=".6 3" fill="none"/>`
        + `<path d="M22 ${F(22)}h6l-3-5zM96 ${F(96)}h6l-3-5zM38 ${F(38)}h6l-3-5z" fill="${SCK.red}" stroke="${SCK.ink}" stroke-width=".8" stroke-linejoin="round"/>`
        + SCH.g(`<path d="M51 64v-9M69 64v-9" stroke-width="2.6"/><path d="M48 55.6h24v3.4H48z" fill="${SCK.white}"/>`, 1.2)
        + `<path d="M51 55.6h3.4v3.4H51zM58.2 55.6h3.4v3.4h-3.4zM65.4 55.6h3.4v3.4h-3.4z" fill="${SCK.red}"/>`
        + `<path d="M4 72q4-4 8 0M100 70q5-4 10 0M30 76q4-3 8 0M84 78q4-3 8 0" stroke="#3E5532" stroke-width="1.4" fill="none"/>`;
    } },

  /* independence day: a white colonial residency with its arcaded veranda and an empty flagpole, a crowd dancing with raised arms and drums before it, and a white pith helmet left behind on the steps */
  ev_descolonizacao: {
    label: 'Uma multidão festeja com tambores diante de um edifício colonial; um capacete colonial ficou nos degraus',
    rx: /\b(descolonizacao|capacete colonial|independencias)\b/,
    ev: 'descolonizacao',
    draw: () => {
      const F = SCH.uid('df');
      let arms = '';
      const fig = (x, y, c, up) => { if (up) arms += `M${x - 3} ${y - 9}l-3-9M${x + 3} ${y - 9}l3-9`; return `<use href="#${F}" x="${x}" y="${y}" fill="${c}"/>`; };
      let arch = '';
      for (let x = 24; x < 96; x += 12) arch += `M${x} 48v-7a4 4 0 0 1 8 0v7z`;
      return SCH.bg('#BFD9DE') + SCH.sun(14, 12, 7, '#F7EBC4')
        + `<defs><g id="${F}"><path d="M-6 8q0-12 6-12t6 12z" stroke="${SCK.ink}" stroke-width="1.2"/><circle cy="-8" r="3.6" fill="#6B4630" stroke="${SCK.ink}" stroke-width="1.2"/></g></defs>`
        + SCH.g(`<path d="M60 14V2" stroke-width="1.6"/><path d="M14 22h92l-8-8H22z" fill="${SCK.red}"/><path d="M18 50V22h84v28z" fill="${SCK.white}"/>
          <path d="M18 34h84v2H18z" fill="${SCK.stone}" stroke-width="1"/><path d="M52 22l8-6 8 6z" fill="${SCK.white}" stroke-width="1.2"/>`, 1.4)
        + `<path d="M22 24h76v10H22z" fill="#E6DCC4"/><path d="M26 24v10M36 24v10M46 24v10M56 24v10M64 24v10M74 24v10M84 24v10M94 24v10" stroke="${SCK.ochre}" stroke-width="2"/>`
        + `<path d="${arch}" fill="#7A6A54" stroke="${SCK.ink}" stroke-width="1"/><path d="M18 38h84" stroke="${SCK.ink}" stroke-width=".8" opacity=".5"/>`
        + `<path d="M0 50h120v30H0z" fill="${SCK.sand}"/>`
        + SCH.g(`<path d="M40 50h40v3H40zM36 53h48v3H36zM32 56h56v3H32z" fill="${SCK.stone}"/>`, 1)
        + SCH.g(`<path d="M52 57.6q0-10 9-10 9 0 9 10z" fill="${SCK.white}"/><path d="M48 58.6q13-3.4 26 0" stroke-width="3.4" fill="none"/>`, 1.2) + `<path d="M48 58.6q13-3.4 26 0" stroke="${SCK.white}" stroke-width="1.6" fill="none"/><path d="M52.4 54.4q8.6-1.6 17.2 0" stroke="${SCK.ochre}" stroke-width="2" fill="none"/><path d="M56 51q3-2 7-1" stroke="${SCK.stoneLo}" stroke-width=".9" fill="none"/>`
        + SCH.g(`<path d="M4 50q2-18 4-34h2q-1 16 0 34zM112 50q-2-18-4-34h-2q1 16 0 34z" fill="${SCK.wood}"/>
          <path d="M9 16q-10-4-14 4 6-3 14-3zM9 16q8-6 14 0-8-1-14 1zM9 16q-4-8-12-7 6 2 11 8zM9 16q4 7 9 10-4-6-8-10zM107 16q10-4 14 4-6-3-14-3zM107 16q-8-6-14 0 8-1 14 1zM107 16q4-8 12-7-6 2-11 8zM107 16q-4 7-9 10 4-6 8-10z" fill="#3E6B3A" stroke-width="1"/>`, 1.1)
        + fig(10, 70, SCK.red, 1) + fig(22, 66, SCK.gold, 0) + fig(34, 70, SCK.green, 1) + fig(86, 70, SCK.gold, 1) + fig(98, 66, SCK.red, 0) + fig(110, 70, SCK.green, 1)
        + SCH.g(`<path d="M17 80l1-12h8l1 12zM93 80l1-12h8l1 12z" fill="${SCK.wood}"/><ellipse cx="22" cy="68" rx="4" ry="1.4" fill="${SCK.white}"/><ellipse cx="98" cy="68" rx="4" ry="1.4" fill="${SCK.white}"/>`, 1.2)
        + `<path d="M18 72l7 6M25 72l-7 6M94 72l7 6M101 72l-7 6" stroke="${SCK.ink}" stroke-width=".7"/>`
        + fig(46, 78, SCK.burg, 1) + fig(74, 78, SCK.teal, 1) + fig(4, 82, SCK.teal, 0) + fig(116, 82, SCK.burg, 0)
        + `<g stroke-linecap="round"><path d="${arms}" stroke="${SCK.ink}" stroke-width="2.6"/><path d="${arms}" stroke="#6B4630" stroke-width="1.2"/></g>`;
    } },
});
