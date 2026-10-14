/* África e Américas — the scenes of the Saharan and African kingdoms, the Aztecs, Maya, Incas and Olmecs, the plains and the Andes (conventions in _core.js) */
Object.assign(SCENE, {
  /* a salt caravan crossing the dunes: a veiled rider on his dromedary, slabs of salt slung on its flank, the line of camels heading for a low mud town */
  caravana_mali: {
    label: 'Uma caravana de dromedários com barras de sal atravessando as dunas do Saara',
    rx: /\b(caravana|caravanas|camelo|camelos|dromedario|dromedarios|barras de sal|tuaregue|tuaregues|azalai)\b/,
    draw: () => {
      const body = 'M-13-17C-10-22-6-26-1-26 3-26 5-22 7-19 10-17 12-14 15-14 17-14 18-17 19-21L20-23 22-24C25-24 27-22 28-20L27.4-18.6H22C19-17 17-12 14-9.6 12-8 10-8 8-9Q-2-6.6-11-9-14-10-15-13-13-17Z';
      const legs = 'M7-9 7.6-4.6 8.6 0M3.6-9 2.6-4.6 1 0M-10-9.4-11.6-4.6-10.6 0M-7-9.4-6.4-4.6-4.6 0', id = SCH.uid('cv');
      return SCH.bg('#CFDDD8') + SCH.sun(98, 16, 9, '#F7EED6')
        + `<path d="M84 42h36v8H84z" fill="#D9BC8C"/>`
        + SCH.g(`<path d="M98 43v-4h5v-2h4v2h4v-3h3v3h7v7H98z" fill="#B57F4E"/>`, .9)
        + `<path d="M102 41.6h2M109 42h2M115 41h2" stroke="${SCK.ink}" stroke-width="1.2" opacity=".7"/>`
        + `<path d="M0 48Q30 38 60 46T120 46v34H0z" fill="#E7C27C"/>`
        + `<defs><pattern id="${id}" x="-16" y="-31" width="46" height="31" patternUnits="userSpaceOnUse"><g transform="translate(16 30)" fill="#6E4A2A" stroke="#6E4A2A" stroke-width="3.4"><path d="${body}${legs}"/><path d="M-11-27h12v8h-12z" fill="${SCK.white}" stroke-width="2"/></g></pattern></defs><g transform="translate(84 50.6) scale(.28)"><rect x="-16" y="-31" width="138" height="31" fill="url(#${id})"/></g>`
        + `<path d="M0 62Q36 52 70 60T120 56v24H0z" fill="#D9A95A"/><path d="M64 59Q92 52 120 57v23H90q-6-10-26-21z" fill="#C48E45"/>`
        + `<path d="M4 70q8-2.6 16 0M92 70q8-2.6 16 0M70 76q8-2 14 0" stroke="#A8762F" stroke-width="1" fill="none" opacity=".7"/>`
        + `<g transform="translate(36 76) scale(1.7)">`
        + SCH.g(`<path d="${legs}" stroke-width="2.6" fill="none"/>`, 1) + `<path d="${legs}" stroke="#B98552" stroke-width="1.1" fill="none" stroke-linejoin="round"/>`
        + SCH.g(`<path d="${body}" fill="#C79459"/><path d="M-14-15q-2 3-1.4 6" fill="none"/>
          <path d="M-11-21.4h11.4l.4 4h-11.4zM-11.2-17.2h11.4l.4 4h-11.4z" fill="${SCK.white}" stroke-width=".8"/>
          <path d="M4-21q-1.6 3-1 6.4h3.2q.6-3.4-.6-6.4z" fill="${SCK.wood}" stroke-width=".7"/>
          <path d="M3.4-20Q4-27 6.4-28.6H9.4Q11.4-27 12-21L15.6-17.4 14.4-16 9.6-19.4Q6-18.4 3.4-20Z" fill="#34406E" stroke-width=".9"/>
          <circle cx="7.8" cy="-31" r="2.6" fill="#2A3358" stroke-width=".9"/>
          <path d="M10.6-26.6 12.6-23.6" fill="none" stroke-width="1.1"/><path d="M10.4-21.4l1.4-3" stroke-width="1.2"/>`, .9)
        + `<path d="M5.4-31.6Q3-31 1.6-27.6" stroke="#2A3358" stroke-width="1.4" fill="none"/><path d="M8.4-31.4h2" stroke="#E9C98B" stroke-width=".7"/><path d="M12.6-23.6Q18-24 23-21.4" stroke="${SCK.ink}" stroke-width=".5" fill="none"/>
          <path d="M-12-22c2 3 3 6 2.4 10M1.2-22c.6 3 .4 6-.4 10" stroke="${SCK.ink}" stroke-width=".6" fill="none"/>
          <path d="M-9-19.4h8M-9.4-15.2h8" stroke="${SCK.stoneLo}" stroke-width=".5" opacity=".8"/>
          <circle cx="23.4" cy="-21.6" r=".6" fill="${SCK.ink}"/><path d="M-6-11q2 2 6 1.6M9-16q2 2 5 1" stroke="${SCK.ink}" stroke-width=".5" fill="none" opacity=".45"/></g>`;
    } },
  /* an impi on the green hills: warriors with tall dappled cowhide shields, short stabbing spears, feathered headbands and cow-tail fringes */
  impi_zulu: {
    label: 'Guerreiros zulus com escudos de couro de boi e lanças curtas',
    rx: /\b(zulu|zulus|iklwa|azagaia|azagaias|impi|isihlangu)\b/,
    draw: () => {
      const id = SCH.uid('iz'), skin = '#5B3A24';
      const rank = (x, y, s, w) => `<g transform="translate(${x} ${y}) scale(${s})"><rect y="-80" width="${w}" height="80" fill="url(#${id})"/></g>`;
      return SCH.bg('#CADCD6')
        + `<defs><pattern id="${id}" width="38" height="80" y="-80" patternUnits="userSpaceOnUse"><g transform="translate(19 79)">` + SCH.g(`<path d="M-5-30-6-16-5.4-1H-1.6L-1.4-16-.6-30zM1.4-30 2.6-16 2.4-1H6.2L6.4-16 6.6-30zM-7.4-55Q0-58 7.4-55L8.4-44 6.6-33.6H-6.6L-8.4-44zM7.4-54.6 11-46.6 11.6-38.6 13.4-38 13-47 10-55.4zM-1.6-60.4H1.6V-56H-1.6zM.2-68.2A4.2 4.6 0 1 0 .3-68.2z" fill="${skin}"/>
<path d="M-7.4-17.4H.2L1-10H-8.2zM1.4-17.4H8.2L8.8-10H1zM-8.4-56Q0-59.6 8.4-56L9-49.6Q0-46.6-9-49.6zM9-52.6 12.6-51.6 13-47.6 9.4-48.6z" fill="${SCK.white}" stroke-width="1.1"/>
<path d="M-7.4-34H8.4L9.4-24H-8.4z" fill="#6B4A2A"/><path d="M12.6-18V-58" stroke-width="2.6"/><path d="M12.6-56.4 10.8-61.6 12.6-69 14.4-61.6z" fill="#C3C8CE" stroke-width="1.1"/>
<path d="M-1.4-67.4C-7-70-10-74-8-78.6-4-76-1-72 2-67.6z" fill="${SCK.ink}" stroke-width=".8"/><path d="M-4.2-66.4Q0-68.4 4.4-66.4V-64.2Q0-66-4.2-64.2z" fill="${SCK.gold}" stroke-width="1"/>
<path d="M-6-62.4V-14" stroke-width="2"/><ellipse cx="-6" cy="-38" rx="9" ry="21.6" fill="${SCK.white}"/><path d="M-6-63Q-8.6-66.6-6-70.4-3.4-66.6-6-63z" fill="#8A6A44" stroke-width=".8"/>`, 1.4)
        + `<path d="M-12-48q3-4 6-1t-1 5q-5 1-5-4zM-1-34q3-1 3 3l-1 4q-3-1-2-7zM-13-30q3 1 2 6M-2-52q2 1 1 4t-2-1zM-9-22q3-1 4 2l-3 2z" fill="${SCK.ink}"/>
<path d="M-7.6-56V-20M-4.4-56V-20" stroke="#8A5A34" stroke-width="2" stroke-dasharray="1.6 3.4"/><path d="M-6-62.4V-13.6" stroke="${SCK.wood}" stroke-width="1.2"/>
<path d="M-7-14h15M-8-53h16M-5.4-29h11" stroke="${SCK.ink}" stroke-width="4" stroke-dasharray=".6 1.8" opacity=".4"/></g></pattern></defs>`
        + `<ellipse cx="22" cy="12" rx="14" ry="3.4" fill="${SCK.white}" opacity=".7"/><ellipse cx="100" cy="8" rx="12" ry="2.6" fill="${SCK.white}" opacity=".6"/>`
        + `<path d="M0 40Q20 28 44 36T88 32T120 34v46H0z" fill="#93AE86"/>`
        + rank(-4, 50, .4, 320) + `<path d="M0 40Q20 28 44 36T88 32T120 34v46H0z" fill="#A5BC98" opacity=".5"/>`
        + `<path d="M0 54Q30 44 62 50T120 46v34H0z" fill="${SCK.green}"/><path d="M0 70Q40 62 80 68T120 66v14H0z" fill="#5E7A44"/>`
        + rank(9, 79, .9, 114)
        + `<g transform="translate(60.3 78.1) scale(.9)">` + SCH.g(`<ellipse cx="-6" cy="-38" rx="9" ry="21.6" fill="${SCK.ink}"/>`, 1.4)
        + `<path d="M-12-52q4-3 6 0t-3 5q-4-1-3-5zM-2-40q2-4 3 0v6q-3 0-3-6zM-13-34q4-1 4 4t-4 2zM-7-22q3-2 5 0t-3 4z" fill="${SCK.white}"/>
          <path d="M-7.6-56V-20M-4.4-56V-20" stroke="${SCK.white}" stroke-width="2" stroke-dasharray="1.6 3.4"/><path d="M-6-62.4V-13.6" stroke="${SCK.wood}" stroke-width="1.2"/></g>`;
    } },

  /* the star fort above the bay: pointed bastions with domed sentry boxes and gun ports, bare baobabs on the red slope, a nau riding at anchor */
  fortaleza_luanda: {
    label: 'Uma fortaleza portuguesa sobre a baía, com uma nau ancorada',
    rx: /\b(luanda|fortaleza|forte|sao miguel|baoba|baobas|embondeiro|embondeiros)\b/,
    draw: () => {
      const bast = x => `<path d="M${x - 12} 25 ${x} 29.6 ${x} 50 ${x - 11} 44z" fill="#C9B48A"/><path d="M${x} 29.6 ${x + 12} 25 ${x + 11} 44 ${x} 50z" fill="#EFE5C8"/>
        <path d="M${x - 2.2} 30V22.4h4.4V30z" fill="#EFE5C8" stroke-width="1.1"/><path d="M${x - 3} 22.6Q${x} 16.4 ${x + 3} 22.6z" fill="#C9B48A" stroke-width="1.1"/>`;
      const port = x => `M${x} 29.4h2.4v3.6h-2.4z`;
      const lf = 'M-10-22h1.4M-3.4-26.4h1.4M2.6-27h1.4M8.4-23.4h1.4';
      const baob = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">` + SCH.g(`<path d="M-6.4 0C-7.6-6-7.2-12-4.6-16.4L-10-20.6-9-22.4-3.8-18.6-4.4-24.6-2.2-24.8-1.4-19 1.6-25.4 3.6-24.6 1.6-18.6 7.4-22.6 8.6-21 4.6-16.6C7.2-12 7.6-6 6.4 0Z" fill="#B3A48C"/><path d="${lf}" stroke-width="6.6"/><path d="${lf}" stroke="${SCK.olive}" stroke-width="4.4"/>`, (1.3 / s).toFixed(1))
        + `<path d="M-3-2c-1-5-1-9 0-12M2.6-2c1-5 1-9 0-12" stroke="#7E705C" stroke-width="1" fill="none"/></g>`;
      return SCH.bg('#BFD3D9')
        + `<path d="M0 44h120v36H0z" fill="${SCK.sea}"/><path d="M0 44.4q20-2.4 40 0" stroke="#E9C98B" stroke-width="1.6" fill="none"/>`
        + SCH.waves(72, '#7FA2B8', 1.2)
        + SCH.g(`<path d="M120 80H30L38 70 50 58 56 50H120z" fill="#B4693E"/>`, 1.8)
        + `<path d="M120 80H44L58 66 72 60 120 56z" fill="#C98A4E"/>`
        + baob(49, 69, 1.2) + baob(100, 78, .9)
        + SCH.g(`<path d="M76 27V19H96V27z" fill="${SCK.white}"/><path d="M74.4 19.6 78.4 14H93.6L97.6 19.6z" fill="#B0533A" stroke-width="1.3"/>
          <path d="M71 26h29v20H71z" fill="#E2D5B2"/>` + bast(62) + bast(110)
          + `<path d="${[52, 57, 65.6, 70.4, 100, 105, 113.6, 78, 86, 94].map(port).join('')}" fill="#3A2A1C" stroke-width=".8"/>`, 1.6)
        + `<path d="M51 31.6 62 35.6 73 31.6M73 31.4H98M99 31.6 110 35.6 121 31.6" stroke="${SCK.ink}" stroke-width="1" fill="none" opacity=".7"/>`
        + SCH.g(`<path d="M20 52V18M29 52V28M11 52V30" stroke-width="1.6" fill="none"/>
          <path d="M3 52 2 44H11L13 52H27L30 48H36L34 53Q30 62 20 62H11Q5 60 3 52z" fill="${SCK.wood}"/>
          <path d="M12 26h16M14 21.6h12M24 33h10M6 35l9-2" stroke="${SCK.white}" stroke-width="3" fill="none"/>`, 1.3)
        + `<path d="M4.6 55H32M7 58h24" stroke="#5E3A1E" stroke-width="1" opacity=".8"/>
          <path d="M20 18l8 1.6-8 1.4z" fill="${SCK.red}"/><path d="M20 19 5 44M20 19l14 29M29 28l5 20M11 30 3 44" stroke="${SCK.ink}" stroke-width=".5" opacity=".6" fill="none"/>`;
    } },

  /* the crowned Lion of Judah, walking, holding the staff with the cross and its pennant, on a plain field */
  leao_de_juda: {
    label: 'O leão coroado de Judá segurando um estandarte com cruz',
    rx: /\b(leao de juda|leao)\b/,
    draw: () => SCH.bg('#E9DDBF')
      + `<rect x="4" y="4" width="112" height="72" fill="none" stroke="${SCK.burg}" stroke-width="2"/><rect x="7" y="7" width="106" height="66" fill="none" stroke="${SCK.burg}" stroke-width=".7"/><g transform="translate(5 4.4) scale(.95)">`
      + `<path d="M20 70.6h90" stroke="${SCK.ochre}" stroke-width="1.6"/>`
      + SCH.g(`<path d="M93 36C100 31 98 23 103 19" stroke-width="3.4" fill="none"/>`, 1)
      + `<path d="M93 36C100 31 98 23 103 19" stroke="${SCK.gold}" stroke-width="1.6" fill="none"/>`
      + SCH.g(`<path d="M102 20Q101 13 106 12Q108 16 109 13Q111 18 106 20Q108 22 104 23z" fill="#B0702A"/>
        <path d="M81 48 79 62 77 66.6 76 70H85.6V67.4L86.6 62 89 50z" fill="#B88A2E"/>
        <path d="M48 30C60 28 78 28 88 30 94 31 97 36 96 42 98 48 100 54 100 60L101 67 104 68V70.6H94V67.6L96 66 95 61C94 56 90 53 86 52Q70 55 56 52L54 66 56 67.6V70.6H46V67.6L48 66 47 54C44 52 42 48 42 44z" fill="${SCK.gold}"/>`, 1.6)
      + `<path d="M86 40q6 2 8 10M60 46q8 3 18 1" stroke="${SCK.goldLo}" stroke-width="1" fill="none"/>`
      + SCH.g(`<path d="M30 15Q36 10 41 15Q47 13 48 19Q54 19 53 25Q59 28 55 32Q59 37 53 40Q56 45 50 47Q49 52 43 50Q38 54 35 48Q29 49 29 44z" fill="#B0702A"/>
        <path d="M22 62 53 12" stroke-width="3.4"/>`, 1.5)
      + `<path d="M22 62 53 12" stroke="${SCK.wood}" stroke-width="1.6"/>`
      + `<path d="M51.8 14 80 16 75 20.5 80 25H44.9z" fill="${SCK.red}"/><path d="M51.8 14 80 16 75 20.5 75.9 21.3H47.2z" fill="${SCK.gold}"/><path d="M51.8 14 80 16 78.2 17.6H49.5z" fill="${SCK.green}"/>`
      + SCH.g(`<path d="M51.8 14 80 16 75 20.5 80 25H44.9z" fill="none"/><path d="M53.6 4.6v11M50 8.2h7.2" stroke-width="3.6" fill="none"/>`, 1.2)
      + `<path d="M53.6 4.6v11M50 8.2h7.2" stroke="${SCK.gold}" stroke-width="1.6"/>`
      + SCH.g(`<path d="M34 18C30 17 26 19 24 22L20 24C18 25 18 28 19 29V31C20 34 23 35 26 35 28 37 31 38 33 36 36 34 37 28 37 24 37 21 36 19 34 18z" fill="${SCK.gold}"/>
        <path d="M46 46C42 48 38 48 34 46L30 44C29 42 30 40 32 40L35 41C38 42 42 41 46 39z" fill="${SCK.gold}"/>
        <path d="M24.8 19.4 24 12.4 27.6 15 30.4 9.4 33.2 14.4 36.4 11 36.2 17.6z" fill="${SCK.gold}"/>`, 1.4)
      + `<path d="M24.6 16.6 36.2 15.2" stroke="${SCK.ink}" stroke-width="1"/><circle cx="27.4" cy="17.8" r=".8" fill="${SCK.red}"/><circle cx="31" cy="17.4" r=".8" fill="${SCK.green}"/><circle cx="34.4" cy="17" r=".8" fill="${SCK.red}"/><path d="M30.4 9.6V4.8M28.8 6.6h3.2" stroke="${SCK.ink}" stroke-width="1.4"/>
        <circle cx="26.6" cy="23.6" r="1" fill="${SCK.ink}"/><path d="M19 26.4h2M20 31h5M24.6 22.6l3.6-1" stroke="${SCK.ink}" stroke-width="1" fill="none"/>
        <path d="M30.6 41.4v3M33 41.6v3.4" stroke="${SCK.ink}" stroke-width=".8"/><path d="M49 70.6v-2.4M52 70.6v-2.4M97 70.6v-2.4M100 70.6v-2.4" stroke="${SCK.ink}" stroke-width=".8"/></g>`,
  },

  /* a gold coin of the highland kingdom — a crowned bust between ears of wheat, a cross above — and a second coin bearing the cross, over the flat-topped ambas and a Red Sea harbour */
  ouro_axumita: {
    label: 'Uma moeda de ouro com uma cruz, sobre as terras altas etíopes',
    rx: /\b(moeda|moedas|moeda de ouro|adulis|cruz)\b/,
    draw: () => SCH.bg('#C7D8D8')
      + `<path d="M-2 50 8 44 11 30 14 27H36L39 30 41 40 56 50zM96 46 104 40 106 31 108 29H122V46z" fill="#ABA584"/><path d="M14 27H36L39 30 38.6 32H11.4L11 30zM108 29H122V33H106.4z" fill="#C9C09A"/>`
      + `<path d="M16 34l-2 8M22 34l-1 6M30 34l1 7M35 33l2 8M110 34l-1 5M116 34v5" stroke="#7E7A5A" stroke-width="1" opacity=".8"/>`
      + SCH.g(`<path d="M-2 58 2 50 4 41 6 39H24L26 41 28 50 40 58z" fill="#7E8A55"/><path d="M6 39H24L26 41 25.6 43.4H4.4L4 41z" fill="#A3A872" stroke-width="1"/>`, 1.4)
      + `<path d="M9 46l-1 6M15 46v7M21 46l1 6M30 54h6" stroke="#4E5A30" stroke-width="1" opacity=".8"/>`
      + `<path d="M0 56h120v24H0z" fill="${SCK.sea}"/>` + SCH.waves(66, '#7FA2B8', 1.1)
      + SCH.g(`<path d="M17 44V62" stroke-width="1.6"/><path d="M9.6 46.6Q17 45 24.4 46.6 25.4 52 24.4 58.4 17 57 9.6 58.4 8.6 52 9.6 46.6z" fill="${SCK.white}" stroke-width="1.2"/>
        <path d="M3 61Q2 58.6 4.6 59.6H29.4Q32 58.6 31 61L28 66H7z" fill="${SCK.wood}" stroke-width="1.4"/>`, 1)
      + `<path d="M17 46v12M7 62.4h21" stroke="${SCK.ink}" stroke-width=".6" opacity=".5"/>`
      + `<circle cx="84" cy="44" r="28" fill="${SCK.ink}" opacity=".3"/><circle cx="48" cy="66" r="13" fill="${SCK.ink}" opacity=".3"/>`
      + SCH.g(`<circle cx="46" cy="63" r="13" fill="${SCK.gold}"/><circle cx="46" cy="63" r="9.4" fill="none" stroke-width=".8"/>
        <path d="M43.6 55.6h4.8v5h5v4.8h-5v5h-4.8v-5h-5v-4.8h5z" fill="${SCK.goldLo}" stroke-width="1"/>
        <circle cx="80" cy="40" r="28" fill="${SCK.gold}"/>`, 1.8)
      + `<circle cx="80" cy="40" r="24.6" fill="none" stroke="${SCK.goldLo}" stroke-width="1.2"/><circle cx="80" cy="40" r="26.4" fill="none" stroke="${SCK.goldHi}" stroke-width="1.2" stroke-dasharray=".1 2.6" stroke-linecap="round"/>`
      + SCH.g(`<path d="M66 61C66 54 70 50 76 49L76.6 45C74 43 73 40 73 37 73 31 76 27 80.6 27 85 27 88 30.6 88 34.4L90.4 39 88.4 40.2 89 42.4 87.4 43.4 87.6 45.4C87 47 85 47.6 83.6 47.6L83.8 49.4C90 51 94 55 94 61z" fill="${SCK.goldLo}"/>
        <path d="M73.6 30.6 73 24.6 76.6 27.4 80.4 22.6 84 27.4 87.6 24.6 87.4 31Q80.6 28.6 73.6 30.6z" fill="${SCK.goldHi}" stroke-width=".9"/>
        <path d="M80 13.4v7M76.6 16.8h6.8" stroke-width="2.6" fill="none"/>`, 1.1)
      + `<path d="M80 13.4v7M76.6 16.8h6.8" stroke="${SCK.goldHi}" stroke-width="1.2"/>
        <path d="M63 58Q58 46 63 32M97 58Q102 46 97 32" stroke="${SCK.goldLo}" stroke-width="1.4" fill="none"/>
        <path d="M61.6 52l-3-2M60.6 46l-3-2M60.6 40l-3-2.4M61.6 35l-2.6-2.6M98.4 52l3-2M99.4 46l3-2M99.4 40l3-2.4M98.4 35l2.6-2.6" stroke="${SCK.goldLo}" stroke-width="1.4"/>
        <path d="M70 56q8-4 18 0M84 33.4h1.6" stroke="${SCK.gold}" stroke-width="1" fill="none"/>
        <path d="M60 22a26 26 0 0 1 14-9" stroke="${SCK.goldHi}" stroke-width="1.6" fill="none" opacity=".8"/>`,
  },
  /* the Great Enclosure seen from the hill: a ring of curving dry-stone wall with its chevron frieze, the conical tower inside, granite boulders and msasa trees */
  muralhas_zimbabue: {
    label: 'Muralhas curvas de pedra seca e uma torre cônica no planalto',
    rx: /\b(grande zimbabue|zimbabue|muralhas de pedra|torre conica)\b/,
    draw: () => {
      const f = n => n.toFixed(1);
      /* a course of the great wall, k from 0 (its top) to 1 (its foot) */
      const course = k => `M-2 ${f(8 + k * 70)}Q66 ${f(40 + k * 16)} 122 ${f(16 + k * 58)}`;
      const at = (t, k) => { const y0 = 8 + k * 70, y1 = 40 + k * 16, y2 = 16 + k * 58, u = 1 - t;
        return [u * u * -2 + 2 * u * t * 66 + t * t * 122, u * u * y0 + 2 * u * t * y1 + t * t * y2]; };
      let zig = 'M', rows = '';
      for (let i = 0; i <= 40; i++) { const p = at(i / 40, i % 2 ? .07 : .12); zig += f(p[0]) + ' ' + f(p[1]) + (i < 40 ? 'L' : ''); }
      for (let k = .17, j = 0; k < 1; k += .06, j++) rows += `<path d="${course(k)}" stroke-dashoffset="${j % 2 ? 2 : 0}"/>`;
      const tree = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0V-12M0-8l-6-5M0-9l5-5" stroke="#5A3A22" stroke-width="2.4" fill="none"/>`
        + SCH.g(`<path d="M-14-12q-1-6 6-7 2-5 8-4 6-2 9 2 7 0 6 7-5 3-14 2-9 2-15 0z" fill="#7E8C4A"/>`, 1.3) + `<path d="M-8-17q3-2 6 0M3-18q3-1 5 1M-2-21q2-1.6 4 0" stroke="#B0553A" stroke-width="1.6" fill="none"/></g>`;
      return SCH.bg('#C3D6D8')
        + `<path d="M0 34q20-8 40-4t30-2 50 2v10H0z" fill="#9DB0B4"/>`
        + SCH.g(`<path d="M58 36Q76 18 94 16 110 15 122 22V38H58z" fill="#8C9A7A" stroke-width="1.2"/><path d="M80 19q-1-6 5-7 2-5 8-4 5-1 6 4 5 1 5 6-1 3-4 3H82q-2 0-2-2zM100 19q0-5 5-5.4 5 0 6 4.4 0 2.6-2 3.4h-7q-2-.4-2-2.4z" fill="#A49A84" stroke-width="1.2"/>`, 1)
        + `<path d="M85 14q2-2 5-1.6M94 11q2-1 4 .6M103 16q2-1.4 4 0" stroke="#C9BFA8" stroke-width="1.2" fill="none"/>`
        + SCH.g(`<path d="M-2 8Q66 40 122 16V74Q66 56-2 78z" fill="#B3A68C"/>`, 1.8)
        + `<g stroke="${SCK.ink}" stroke-width=".8" fill="none" stroke-dasharray="3.4 1" opacity=".55">${rows}</g>`
        + `<path d="${course(.04)}" stroke="#D1C6AC" stroke-width="2.4" fill="none"/>`
        + `<path d="${zig}" stroke="${SCK.ink}" stroke-width="1.3" fill="none" stroke-linejoin="round"/>`
        + `<path d="M0 76Q60 58 120 70V80H0z" fill="#9A9A5E"/>`
        + SCH.g(`<path d="M52 70 57.4 20.6Q64 17.6 70.6 20.6L76 70Q64 73 52 70z" fill="#D3C8AE"/>`, 1.6)
        + `<path d="M53.4 62q10.6 2.4 21.2 0M54.4 54q9.6 2.2 19.2 0M55.4 46q8.6 2 17.2 0M56.4 38q7.6 1.8 15.2 0M57.2 30q6.8 1.6 13.6 0M57.8 24.6q6.2 1.4 12.4 0" stroke="${SCK.ink}" stroke-width=".8" fill="none" stroke-dasharray="4 1" opacity=".55"/>`
        + `<path d="M0 74Q50 66 120 72V80H0z" fill="#8E8A50"/>`
        + tree(106, 78, 1.1)
        + SCH.g(`<path d="M8 80q-2-9 6-10 3-5 10-3 7 0 7 7 4 2 3 6z" fill="#B5AD9A"/>`, 1.4)
        + `<path d="M14 74q3-2 6-1" stroke="${SCK.ink}" stroke-width=".8" fill="none"/>`;
    } },

  /* a bronze memorial head with its high collar of beads and beaded cap, a relief plaque of two standing figures behind, on red cloth */
  bronzes_benin: {
    label: 'Uma cabeça comemorativa de bronze e uma placa em relevo',
    rx: /\b(bronze|bronzes|placa|placas|cabeca de bronze)\b/,
    draw: () => {
      const fig = (x, sh) => `<circle cx="${x}" cy="20.6" r="2.8" fill="#B08A3E"/><path d="M${x - 3} 18.4Q${x} 13 ${x + 3} 18.4zM${x - 4.6} 24.4h9.2l1.6 13.6h-12.4zM${x - 3.6} 38h3v12h-3zM${x + .6} 38h3v12h-3z" fill="#B08A3E"/>`
        + (sh ? `<ellipse cx="${x - 6}" cy="31" rx="3" ry="6" fill="#B08A3E"/>` : `<path d="M${x + 6.6} 14V50" stroke="#B08A3E" stroke-width="1.4"/>`);
      return SCH.bg('#D9C7A0')
        + `<path d="M0 0h120v8H0z" fill="#C9B48A"/>`
        + SCH.g(`<path d="M8 6h44v52H8z" fill="#4E7466"/><path d="M11.4 9.4h37.2v45.2H11.4z" fill="#3E5E54" stroke-width="1"/>`, 1.8)
        + `<path d="M15 13h.1M30 12h.1M45 13h.1M15 52h.1M45 52h.1M45 30h.1M15 30h.1M30 52h.1" stroke="#6E9486" stroke-width="2.6" stroke-linecap="round"/>`
        + SCH.g(fig(21, 1) + fig(38), .9)
        + SCH.g(`<path d="M0 56Q30 52 60 56T120 54v26H0z" fill="${SCK.red}"/>`, 1.6)
        + `<path d="M10 64q8 6 6 16M40 60q4 8 2 20M110 60q-6 8-4 20" stroke="#6E1414" stroke-width="1.4" fill="none"/>`
        + `<ellipse cx="76" cy="73" rx="25" ry="5" fill="${SCK.ink}" opacity=".35"/>`
        + SCH.g(`<path d="M55 71Q76 77 97 71L93 64H59z" fill="#7A5418"/>
          <path d="M60 65 61.6 44H90.4L92 65Q76 68.4 60 65z" fill="#9C6E22"/>
          <path d="M64.4 46Q63 32 64.6 22H87.4Q89 32 87.6 46Q76 49 64.4 46z" fill="${SCK.goldLo}"/>
          <path d="M61 26Q60 10 76 8 92 10 91 26 88 24 87.4 23 76 19 64.6 23 64 24 61 26z" fill="#8A6018"/>`, 1.6)
        + `<path d="M64.6 23Q64 34 65.6 46.6 70 48 72 48 67 40 68 24z" fill="#7E5A16" opacity=".8"/>`
        + `<path d="M61.6 48h28.8M61.4 52h29.2M61 56h30M60.8 60h30.4M60.4 63.6h31.2" stroke="#5E400E" stroke-width="2.6" stroke-dasharray="1.4 .9" fill="none"/>`
        + `<path d="M64 14 88 24M70 9.6 90 19M62 19 80 9M62 24 86 10.4M86 13 72 8.6" stroke="#5E400E" stroke-width="1" fill="none"/>`
        + `<path d="M62.4 26v20M89.6 26v20" stroke="#5E400E" stroke-width="2" stroke-dasharray="1.2 .8"/>`
        + `<circle cx="64" cy="24" r="2.6" fill="${SCK.goldLo}" stroke="${SCK.ink}" stroke-width="1"/><circle cx="88" cy="24" r="2.6" fill="${SCK.goldLo}" stroke="${SCK.ink}" stroke-width="1"/>`
        + SCH.g(`<path d="M68 32q3.2-2.6 6.4 0-3.2 1.8-6.4 0zM77.6 32q3.2-2.6 6.4 0-3.2 1.8-6.4 0z" fill="#E8D49A" stroke-width=".8"/><path d="M75.6 31.4q-.6 4 0 7M72.6 39.6q1.4 1.8 3.4 1 2 .8 3.4-1" fill="none" stroke-width=".9"/><path d="M71.6 43.8q4.4-1.4 8.8 0-4.4 1.6-8.8 0z" fill="#8A6018" stroke-width=".9"/>`, 1)
        + `<circle cx="71.2" cy="32" r=".9" fill="${SCK.ink}"/><circle cx="80.8" cy="32" r=".9" fill="${SCK.ink}"/>
          <path d="M69.6 26.4v2.6M71.4 26.2v2.6M80.6 26.2v2.6M82.4 26.4v2.6" stroke="#5E400E" stroke-width=".8"/>
          <path d="M84 30q2 6 1.4 14" stroke="${SCK.goldHi}" stroke-width="1" fill="none" opacity=".6"/><path d="M60.6 52h1M90.4 58h1M84 70h1" stroke="#5E9A88" stroke-width="2.4" stroke-linecap="round"/>`;
    } },
  /* a trading post on the great river: a jetty in the rainforest piled with ivory tusks and baskets of black rubber, a sternwheel steamboat moored, a bare flagpole */
  rio_congo: {
    label: 'Cestos de borracha e presas de marfim num posto à beira de um rio na floresta',
    rx: /\b(borracha|marfim|rio congo|presas de marfim|barco a vapor)\b/,
    draw: () => {
      const tusk = (x, y, l) => `<path d="M${x} ${y - 3}Q${x + l * .6} ${y - 3.4} ${x + l} ${+(y - l * .42).toFixed(1)}Q${x + l * .5} ${y + 2.4} ${x} ${y + 3}z" fill="#EFE3C0"/><ellipse cx="${x}" cy="${y}" rx="1.4" ry="3" fill="#CDBB8A" stroke-width="1"/>`;
      const balls = [[87, 52], [92, 51], [97, 52], [89.4, 48], [94.6, 47.6], [92, 44.4], [103, 50], [108, 49], [113, 50], [105.4, 46], [110.6, 45.6], [108, 42.4]].map(([x, y]) => `M${x} ${y}h0`).join('');
      return SCH.bg('#D4DCC8')
        + `<path d="M0 30Q4 18 12 22 16 12 26 16 32 8 42 14 50 8 58 16 66 10 74 16 84 8 92 16 102 10 110 18 116 14 120 18V48H0z" fill="#4E6A3A"/>`
        + `<path d="M0 38Q8 28 18 34 26 26 36 34 46 28 54 36 64 30 72 38 82 32 92 40V48H0z" fill="${SCK.green}"/>`
        + `<path d="M64 14Q60 8 54 8M64 14q2-7 8-8M64 14q-6-3-10 1M64 14q6-2 10 2M64 14V30M24 18q-4-6-10-6M24 18q2-7 8-8M24 18q6-2 10 2M24 18V32" stroke="#3A5228" stroke-width="2" fill="none"/>`
        + `<path d="M0 46h120v34H0z" fill="#8A8460"/><path d="M0 46h120" stroke="#5E6A3A" stroke-width="2"/>`
        + `<path d="M4 70h16M30 76h20" stroke="#A8A27A" stroke-width="1.2"/>`
        + SCH.g(`<path d="M88 50V14" stroke-width="1.6"/><path d="M87 14h2" stroke-width="2"/>
          <path d="M92 46V36H118V46z" fill="#D8C9A4"/><path d="M89 37 96 28H114L121 37z" fill="#8A6A44"/><path d="M100 46v-6h5v6z" fill="#3A2A1C" stroke-width="1"/>`, 1.4)
        + `<path d="M26 21a5 3.4 0 1 0-.1 0M21 13a4 2.6 0 1 0-.1 0" fill="#E9E9E2"/>`
        + SCH.g(`<path d="M24 46V24h4v22z" fill="${SCK.ink}"/><path d="M10 47h34v8H10z" fill="${SCK.white}"/><path d="M8 45.4h38v2.4H8z" fill="${SCK.white}"/>
          <path d="M4 61h41l-4 4H8z" fill="#7A2A20"/><path d="M6 55h40l-1 6H5z" fill="${SCK.white}"/>
          <path d="M2 61a6 6 0 0 1 9-9v9z" fill="${SCK.red}"/>`, 1.3)
        + `<path d="M14 50h4M20 50h3M31 50h4M37 50h4" stroke="${SCK.ink}" stroke-width="2"/><path d="M4 58l5-3M6 55l1-3" stroke="${SCK.ink}" stroke-width=".8"/>`
        + SCH.g(`<path d="M44 63 120 58V63L44 68z" fill="${SCK.wood}"/><path d="M50 67V78M68 66V77M88 64V76M108 63V75" stroke-width="2.6"/>`, 1.4)
        + `<path d="M50 67V78M68 66V77M88 64V76M108 63V75" stroke="${SCK.wood}" stroke-width="1"/><path d="M60 62v4M76 61v4M96 60v4M114 59v4" stroke="${SCK.ink}" stroke-width=".7" opacity=".6"/>`
        + SCH.g(tusk(50, 60, 30) + tusk(51, 55, 30) + tusk(52, 50, 28), 1.3)
        + `<path d="${balls}" stroke="${SCK.ink}" stroke-width="6.6" stroke-linecap="round"/><path d="${balls}" stroke="#2E2620" stroke-width="5" stroke-linecap="round"/>`
        + SCH.g(`<path d="M85 52H99L97 61H87zM101 50H115L113 59H103z" fill="${SCK.ochre}"/>`, 1.2)
        + `<path d="M86 55h12M86.6 58h11M102 53h12M102.6 56h11" stroke="#8A6A3E" stroke-width=".8"/>`;
    } },

  /* the island city on its lake: the great pyramid with its twin stairs and the blue and red shrines on top, white houses, a causeway, chinampa gardens and canoes, the snow volcanoes behind */
  tenochtitlan: {
    label: 'A cidade sobre o lago, com o templo de duas capelas no topo da pirâmide e canoas',
    rx: /\b(tenochtitlan|templo mayor|texcoco|chinampas|chinampa|popocatepetl)\b/,
    draw: () => {
      let tiers = '', steps = '';
      for (let i = 0; i < 4; i++) { const w = 30 - i * 5, y = 64 - i * 8; tiers += `M${60 - w} ${y}L${60 - w + 1.4} ${y - 8}H${60 + w - 1.4}L${60 + w} ${y}z`; }
      for (let y = 35; y < 64; y += 3.6) steps += `M50.6 ${y.toFixed(1)}h8M61.4 ${y.toFixed(1)}h8`;
      const houses = [[4, 58, 9], [14, 57, 8], [8, 64, 10], [20, 63, 9], [94, 57, 8], [103, 58, 10], [90, 63, 9], [100, 65, 11], [30, 66, 8], [82, 67, 8]].map(([x, y, w]) => `M${x} ${y}h${w}v-6h-${w}z`).join('');
      const merl = x => `M${x} 21v-2.4h2.4V21zM${x + 3.4} 21v-2.4h2.4V21zM${x + 6.8} 21v-2.4h2.4V21zM${x + 10.2} 21v-2.4h2.4V21z`;
      return SCH.bg('#BFD3D9')
        + SCH.g(`<path d="M-2 42 10 30 22 26 34 20 46 24 60 28 70 34 80 28 96 8 112 26 122 32V42z" fill="#8EA3B4" stroke-width="1.2"/>`, 1)
        + `<path d="M28 23 34 20 40 22 37 24 33 23zM90 14.6 96 8 102 14.6 99 16 96 14 93 16z" fill="${SCK.white}"/>`
        + `<path d="M0 42h120v38H0z" fill="${SCK.sea}"/><path d="M4 46h12M104 46h12M8 77h14" stroke="#7FA2B8" stroke-width="1.2"/>`
        + SCH.g(`<path d="M0 66 4 52 30 49H90L116 52 120 66z" fill="#C9BFA8"/><path d="M0 74 10 66H18L6 74z" fill="#D8CFB8"/>`, 1.4)
        + `<path d="M34 52q3-5 6 0zM82 52q3-5 6 0zM114 54q3-4 6 0z" fill="${SCK.olive}"/>`
        + SCH.g(`<path d="${houses}" fill="${SCK.white}"/><path d="M30 52V44h7v8zM28.6 44.4 33.5 39 38.4 44.4z" fill="${SCK.white}"/><path d="M28.6 44.4 33.5 39 38.4 44.4z" fill="#C9A66B"/>`, 1)
        + `<path d="M6 54h3M16 53h2M96 53h3M106 54h2M10 60h3M92 59h3M102 61h3" stroke="${SCK.red}" stroke-width="1.4"/>`
        + SCH.g(`<path d="${tiers}" fill="#E8DFC8"/><path d="M49.6 64 51 32H58.6V64zM61.4 64V32H69L70.4 64z" fill="#D8CDB2" stroke-width="1"/>
          <path d="M45 32V21H58.6V32zM61.4 32V21H75V32z" fill="${SCK.white}" stroke-width="1.3"/><path d="${merl(45.6)}${merl(62)}" fill="${SCK.white}" stroke-width=".8"/>`, 1.5)
        + `<path d="M46.4 21.6V31.4M49.2 21.6V31.4M55 21.6V31.4M57.6 21.6V31.4" stroke="#3E6E9A" stroke-width="1.8"/>
          <path d="M62 21.6h12.4v3.2H62zM62 28.4h12.4v3H62z" fill="${SCK.red}"/><path d="M50 32v-5h4.6v5zM65.8 32v-5h4.6v5z" fill="${SCK.ink}"/>
          <path d="${steps}" stroke="${SCK.ink}" stroke-width=".6" opacity=".55"/><path d="M59.4 32V64M60.6 32V64" stroke="${SCK.red}" stroke-width="1.6"/>`
        + SCH.g(`<path d="M86 69h14v4H86zM102 69h18v4H102zM92 75h14v4H92zM108 75h12v4H108z" fill="${SCK.green}" stroke-width="1.1"/>
          <path d="M30 74h16l-2 2.4H32zM50 78h14l-2 2.4H52z" fill="#5A3A22" stroke-width="1"/>`, 1)
        + `<path d="M94 69V61M114 69V60M100 75V67" stroke="#3E5A2A" stroke-width="1.6"/><path d="M94 61v-2M114 60v-2M100 67v-2" stroke="${SCK.olive}" stroke-width="3" stroke-linecap="round"/>
          <path d="M38 74v-4.4M57 78v-4.4" stroke="${SCK.ink}" stroke-width="1.6"/><circle cx="38" cy="68.4" r="1.4" fill="${SCK.ink}"/><circle cx="57" cy="72.4" r="1.4" fill="${SCK.ink}"/><path d="M40 68l3 8M59 72l2.4 6" stroke="${SCK.wood}" stroke-width="1"/>`;
    } },

  /* fitted Inca stonework with a trapezoidal doorway, terraces climbing a steep green peak behind, a llama in front */
  muralha_inca: {
    label: 'Muros de pedras poligonais encaixadas, terraços nas montanhas e uma lhama',
    rx: /\b(cuzco|cusco|machu picchu|lhama|lhamas|muralha inca)\b/,
    draw: () => {
      let ter = '';
      for (let i = 0; i < 7; i++) { const y = 44 + i * 5.4; ter += `M${(84 - i * 4.4).toFixed(1)} ${y.toFixed(1)}Q102 ${(y - 3).toFixed(1)} 122 ${(y + 1).toFixed(1)}`; }
      const stones = 'M0 16 18 15 20 32 0 34zM18 15 36 17 40 32.2 26 33 20 32zM36 17 52 14 54 31 40 32.2zM52 14 68 16 68 32 54 31zM0 34 20 32 26 33 29 41 33 41 32.4 50 18 52 0 50zM0 50 18 52 16 66 0 64zM18 52 32.4 50 31.2 66 16 66zM0 64 16 66 18 80H0zM16 66H31.2L30 80H18zM47 41H51L54 31 68 32V47L56 49H47.7zM47.7 49H56L58 64H48.9zM56 49 68 47V66L58 64zM48.9 64H58L60 80H50zM58 64 68 66V80H60z';
      return SCH.bg('#BCD2DE')
        + `<path d="M56 40 70 20 78 24 88 12 100 24 112 18 122 26V60H56z" fill="#93A8B4"/>`
        + SCH.g(`<path d="M60 80 70 52 78 30 88 14 94 12 102 24 110 34 122 38V80z" fill="${SCK.green}"/>`, 1.6)
        + `<path d="${ter}" stroke="#C9BFA8" stroke-width="1.6" fill="none"/><path d="${ter}" stroke="${SCK.ink}" stroke-width=".6" fill="none" transform="translate(0 1)" opacity=".6"/>`
        + `<path d="M88 14 94 12 98 18 92 20z" fill="#A8C08A"/>`
        + SCH.g(`<path d="M68 16h4v64h-4z" fill="#A99E86"/><path d="${stones}" fill="${SCK.stone}"/><path d="M26 33 40 32.2 54 31 51 41H29z" fill="#D6CDB6"/><path d="M33 41H47L50 80H30z" fill="#3A3026"/>`, 1.3)
        + `<path d="M3 19 15 18.4M21 18.4 33 20M39 20 50 17.6M55 17.6 65 19M3 37 17 35.4M3 53 15 55M21 55 29 53.4M3 67 13 68.6M19 69 28 69M51 44l4-10M50.6 52 54 52M59 52 65 50.6M52 67 56 67M61 67 65 68.6" stroke="#E6DFCC" stroke-width="1.4" fill="none"/>`
        + `<path d="M33 41H47L50 80H30zM35 80l2-12h7l3 12" fill="#4E4236" opacity=".6"/>`
        + `<path d="M0 76h120v4H0z" fill="#8E9A5C"/>`
        + `<g transform="translate(84 77)">` + SCH.g(`<path d="M-2-10V0M2-10V0M13-10V0M16.6-10V0" stroke-width="2.6"/>
          <path d="M-4-18-3-38-9-38.4Q-12-39-11.6-41.4-11-43.6-6-44.6L-2.4-46-2-51 0-46.4 1.6-51 3-45.6Q4.4-43 4-40V-26Q8-27 14-26.6 21-26 21-19 21-12 15-11 6-9-1-10-4-12-4-18Z" fill="${SCK.white}"/>`, 1.4)
        + `<path d="M-2-10V0M2-10V0M13-10V0M16.6-10V0" stroke="${SCK.white}" stroke-width=".9"/><path d="M8-25q6 0 8 6-4 3-9 1z" fill="#8A5A34"/><circle cx="-6" cy="-42" r=".8" fill="${SCK.ink}"/>
          <path d="M-2-51l-1-2.4M1.6-51l.6-2.6" stroke="${SCK.red}" stroke-width="1.8" stroke-linecap="round"/><path d="M-3.2-31h7" stroke="${SCK.red}" stroke-width="1.6"/></g>`;
    } },
  /* a steep Maya temple-pyramid with its tall roof comb rising out of the rainforest, a lesser temple behind, toucans */
  tikal: {
    label: 'Um templo maia de degraus íngremes erguendo-se acima da selva',
    rx: /\b(tikal|templo maia|templos maias|selva|tucano|tucanos)\b/,
    draw: () => {
      let t = '', e = '';
      for (let i = 0; i < 8; i++) { const y = 60 - i * 4.4, w = 22 - i * 1.4; t += `M${(62 - w).toFixed(1)} ${y.toFixed(1)}V${(y - 3.6).toFixed(1)}L${(62 - w + 1.2).toFixed(1)} ${(y - 4.4).toFixed(1)}H${(62 + w - 1.2).toFixed(1)}L${(62 + w).toFixed(1)} ${(y - 3.6).toFixed(1)}V${y.toFixed(1)}z`; e += `M${(62 - w).toFixed(1)} ${(y - 3.6).toFixed(1)}H${(62 + w).toFixed(1)}`; }
      const crowns = (y, c, n, o) => `<path d="M-4 80V${y}` + Array.from({ length: n }, (_, i) => `q${(124 / n / 2).toFixed(1)}-${(i + o) % 3 ? 7 : 10} ${(124 / n).toFixed(1)} 0`).join('') + `V80z" fill="${c}"/>`;
      const toucan = (x, y, s, r) => `<g transform="translate(${x} ${y}) scale(${s}) rotate(${r || 0})">` + SCH.g(`<path d="M0-8Q-5-8-6-3-6 4-3 9L-1 14H3L2 8Q5 2 4-4 3-8 0-8z" fill="#1E1A16"/><path d="M-1-6Q-5-4-4 2-1 1 1-2z" fill="#F2D27A" stroke-width=".6"/>
        <path d="M1-6Q8-9 15-5 10-2 2-2z" fill="#8DB85E"/>`, 1.1) + `<path d="M5-7.2Q9-8.4 12-6.8 9.6-4.8 5.6-4.6z" fill="#E8902E"/><path d="M12-6.8 14.6-5.2 12.4-4.2z" fill="#B5402A"/><path d="M2.6-3.2Q8-3.4 12-4.2" stroke="#5E8FB8" stroke-width="1" fill="none"/><circle cx="-.4" cy="-5" r="1.3" fill="#B5D66A"/><circle cx="-.4" cy="-5" r=".5" fill="${SCK.ink}"/><path d="M-2 12h4" stroke="${SCK.red}" stroke-width="1.6"/></g>`;
      return SCH.bg('#C9DCE0')
        + SCH.g(`<path d="M10 50V40L13 37H31L34 40V50zM14 37V31H30V37zM16 31V26H28V31zM15 26V21H29V26zM18 21V13H26V21z" fill="#C9C3B0" stroke-width="1.1"/>`, 1)
        + crowns(46, '#5E7A44', 9, 1)
        + SCH.g(`<path d="${t}" fill="#D8D0BC"/><path d="M57 60 58.6 25H65.4L67 60z" fill="#C9C0A8" stroke-width="1"/>
          <path d="M53 25V14.6H71V25zM55 14.6V3.4L57.4 2H66.6L69 3.4V14.6z" fill="#D8D0BC"/>`, 1.5)
        + `<path d="M62 60V25.6H70.6L74 26.8 84 60z" fill="#A9A088" opacity=".45"/><path d="${e}" stroke="#A9A088" stroke-width="1.2" fill="none"/><path d="M58 30h7.8M57.6 35h8.8M57.4 40h9.2M57.2 45h9.6M57 50h10M56.8 55h10.4" stroke="${SCK.ink}" stroke-width=".6" opacity=".5"/>
          <path d="M59.6 25v-5.6h4.8V25z" fill="#3A3026"/><path d="M60.6 4.6h2.8v6h-2.8z" fill="#A9A088"/>`
        + crowns(58, SCK.green, 7, 0) + crowns(68, '#4E6A3A', 6, 2)
        + SCH.g(`<path d="M86 48Q100 52 122 46" stroke-width="3" fill="none"/>`, 1) + `<path d="M86 48Q100 52 122 46" stroke="${SCK.wood}" stroke-width="1.4" fill="none"/>`
        + toucan(102, 38, 1) + toucan(30, 58, .7, -10);
    } },

  /* a colossal stone head in its close-fitting helmet, sunk among broad jungle leaves, a palm behind for scale */
  cabeca_olmeca: {
    label: 'Uma colossal cabeça de pedra com capacete, na selva do Golfo',
    rx: /\b(cabeca colossal|cabecas colossais|cabeca de pedra|cabecas de pedra)\b/,
    draw: () => {
      const leaf = (x, y, r, s, c) => `<path transform="translate(${x} ${y}) rotate(${r}) scale(${s})" d="M0 0Q4-10 0-22-4-10 0 0z" fill="${c}"/>`;
      return SCH.bg('#B9CDB0')
        + `<path d="M0 0h120v30Q100 22 86 28 70 18 52 24 30 14 14 24 6 20 0 24z" fill="#C9DAD6"/>`
        + `<path d="M0 40Q10 26 22 32 30 22 42 30V80H0zM84 34Q94 24 104 30 112 22 120 28V80H84z" fill="#6E8C5A"/>`
        + `<path d="M104 80Q104 50 98 22" stroke="#6A5236" stroke-width="2.6" fill="none"/><path d="M98 22q-8-6-16-2M98 22q-6-8-2-14M98 22q4-8 12-8M98 22q8-2 12 6M98 22q-2 8-8 12" stroke="${SCK.olive}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
        + SCH.g(`<path d="M30 60Q28 40 30 26 32 8 58 6 84 8 86 26 88 40 86 60 80 72 58 74 36 72 30 60z" fill="#9C978B"/>`, 1.8)
        + SCH.g(`<path d="M30 30Q30 8 58 6 86 8 86 30 80 26 76 25 58 22 40 25 36 26 30 30z" fill="#8A857A"/><path d="M33 22Q58 14 83 22" fill="none" stroke-width="1.2"/>
          <path d="M30 30 36 26 37 52 31 54zM86 30 80 26 79 52 85 54z" fill="#8A857A"/>
          <circle cx="33" cy="44" r="3.4" fill="#A9A498" stroke-width="1.1"/><circle cx="83" cy="44" r="3.4" fill="#A9A498" stroke-width="1.1"/>`, 1.4)
        + `<path d="M40 22.6v-4M46 20.6v-4.4M52 19.6v-4.4M58 19.2v-4.4M64 19.6v-4.4M70 20.6v-4.4M76 22.6v-4" stroke="${SCK.ink}" stroke-width="1" opacity=".55"/>`
        + SCH.g(`<path d="M42 35q5-4 10 0-5 2.6-10 0zM64 35q5-4 10 0-5 2.6-10 0z" fill="#C2BCAE" stroke-width="1.1"/>
          <path d="M41 32.6q6-4 12 0M63 32.6q6-4 12 0" fill="none" stroke-width="1.4"/>
          <path d="M55 38Q54 45 50 48.6 53 51 58 50 63 51 66 48.6 62 45 61 38" fill="#A9A498" stroke-width="1.3"/>
          <path d="M48 56Q58 52.6 68 56 63 61 58 61 53 61 48 56z" fill="#8A857A" stroke-width="1.3"/>`, 1)
        + `<path d="M48.6 56.2h18.8" stroke="${SCK.ink}" stroke-width="1"/><path d="M38 40q-2 10 2 18M78 40q2 10-2 18M52 66q6 2 12 0" stroke="${SCK.ink}" stroke-width=".9" fill="none" opacity=".45"/>
          <path d="M34 30q-1 12 1 22M40 14q8-5 18-6" stroke="#B9B4A8" stroke-width="1.4" fill="none" opacity=".8"/><circle cx="47" cy="35" r="1.2" fill="#6E6A60"/><circle cx="69" cy="35" r="1.2" fill="#6E6A60"/>`
        + SCH.g(leaf(14, 80, -40, 1.4, SCK.green) + leaf(24, 82, -14, 1.3, SCK.olive) + leaf(36, 82, 8, 1, SCK.green) + leaf(84, 82, -10, 1.1, SCK.olive) + leaf(96, 82, 22, 1.4, SCK.green) + leaf(108, 82, 50, 1.3, SCK.olive) + leaf(60, 84, -4, .9, '#7E9C5A'), 1.3)
        + `<path d="M14 80 2.6 66.6M24 82 18.6 61M96 82l7.6-19.6M108 82l14-11" stroke="${SCK.ink}" stroke-width=".7" opacity=".5"/>`;
    } },
  /* the high plains above the Little Bighorn: a cavalry guidon, red over white, left leaning in the tall grass of a hilltop; below, a river winds between cottonwoods to the dark pine hills under a huge sky */
  pradarias_sioux: {
    label: 'Colinas de capim alto junto a um rio sinuoso, sob um céu imenso',
    rx: /\b(little bighorn|black hills|pradaria|pradarias)\b/,
    draw: () => {
      const f = n => +n.toFixed(1), T = [[39, 46.6, 2], [52, 47.8, 2.2], [72, 51, 2.6], [24, 56.6, 3.4], [46, 59, 3], [6, 59.6, 4]];
      return SCH.bg('#C9DBE2')
        + `<path d="M8 22q3-7 11-5 4-7 12-3 7-2 8 4 6 0 6 4H5q-1-1 3 0zM58 14q4-6 11-3 5-5 11 0 7 0 7 4H56q0-1 2-1zM104 20h12M100 24h8" fill="${SCK.white}" stroke="${SCK.white}" stroke-width="1.6" stroke-linecap="round" opacity=".9"/>`
        + SCH.g(`<path d="M-2 46Q10 38 24 41 36 33 50 37 62 30 76 33 90 27 104 32 114 30 122 33V48H-2z" fill="#3B4A3C"/>`, 1.2)
        + `<path d="M12 41.4l1.4-3.4 1.4 3.4M30 37.6l1.4-3.4 1.4 3.4M44 37l1.4-3.4 1.4 3.4M58 33.4l1.4-3.4 1.4 3.4M70 32.6l1.4-3.4 1.4 3.4M84 30.4l1.4-3.4 1.4 3.4M110 31l1.4-3.4 1.4 3.4" stroke="#6A7A5E" stroke-width="1.2" fill="none"/>`
        + `<path d="M-2 47Q40 41 80 45T122 44V80H-2z" fill="#DDC27E"/><path d="M-2 62Q30 54 60 60T122 56V80H-2z" fill="#CFAA5E"/>`
        + SCH.g(`<path d="M36 45.4Q66 47 58 50 48 53 30 55.6 10 59-2 63V75Q14 67 36 61 60 55.6 66 51.4 70 47.6 40 45.6z" fill="#5F8EAB"/>`, 1.2)
        + `<path d="M2 70Q16 64 34 59.4M44 55.6q8-2 14-3.4" stroke="#B5CFDC" stroke-width="1.2" fill="none"/>`
        + `<path d="${T.map(([x, y, r]) => `M${x} ${y}v-${f(r * 1.3)}`).join('')}" stroke="#5A3A22" stroke-width="1.4"/>`
        + SCH.g(T.map(([x, y, r]) => `<ellipse cx="${x}" cy="${f(y - r * 1.6)}" rx="${f(r * 1.3)}" ry="${r}" fill="${SCK.green}"/>`).join(''), 1.1)
        + `<path d="${T.map(([x, y, r]) => `M${f(x - r * .7)} ${f(y - r * 1.9)}q${f(r * .5)}-${f(r * .5)} ${f(r * 1.1)} 0`).join('')}" stroke="#93AE7A" stroke-width="1" fill="none"/>`
        + SCH.g(`<path d="M52 81Q66 68 90 66T122 62V81z" fill="#E6CB86"/>`, 1.4)
        + SCH.g(`<path d="M76 81 97 20" stroke-width="3.6"/>`, 1) + `<path d="M76 81 97 20" stroke="${SCK.wood}" stroke-width="1.8"/>`
        + SCH.g(`<path d="M96.6 21Q82 16 63 21.6L74 30Q84 27.4 94.2 28z" fill="${SCK.red}"/><path d="M94.2 28Q84 27.4 74 30L61 38.6Q78 34.4 91.8 35.2z" fill="${SCK.white}"/>`, 1.4)
        + `<path d="M89 21.4q-8-1-16 1.6M88 32q-8 .6-15 3" stroke="${SCK.ink}" stroke-width=".7" fill="none" opacity=".4"/>`
        + `<path d="M96.2 21.4l1.8-5.6 1.4 6z" fill="${SCK.gold}" stroke="${SCK.ink}" stroke-width=".9" stroke-linejoin="round"/>`
        + `<path d="M62 80l3-10 1 10M68 80l4-12 0 12M74 80l-1-9 3 9M84 80l2-9 2 9M92 80l-3-10 4 10M100 80l3-9v9M110 80l2-11 1 11M116 80l-2-8 3 8M88 73l1.6-6 1 6M104 72l1-5 1.4 5" stroke="#A8823A" stroke-width="1.2" fill="none"/>`;
    } },

  /* the silver mountain: a red cone pocked with mine mouths and their spoil, the white colonial town with its church at its foot, llamas carrying sacks */
  potosi: {
    label: 'Uma montanha cônica perfurada por bocas de mina, com lhamas carregando prata',
    rx: /\b(potosi|cerro rico|prata|mina|minas|lhama|lhamas)\b/,
    draw: () => {
      const mines = [[57, 15], [47, 27], [66, 22], [37, 38], [61, 32], [76, 34], [29, 48], [50, 43], [89, 47], [68, 45], [41, 51]];
      const id = SCH.uid('po');
      const llamas = `<defs><pattern id="${id}" x="30" y="-56" width="44" height="56" patternUnits="userSpaceOnUse"><g transform="translate(14 56)">` + SCH.g(`<path d="M-2-10V0M2-10V0M13-10V0M16.6-10V0" stroke-width="2.6"/><path d="M-4-18-3-38-9-38.4Q-12-39-11.6-41.4-11-43.6-6-44.6L-2.4-46-2-51 0-46.4 1.6-51 3-45.6Q4.4-43 4-40V-26Q8-27 14-26.6 21-26 21-19 21-12 15-11 6-9-1-10-4-12-4-18Z" fill="#D9C7A0"/><path d="M5-28H17V-18H5z" fill="${SCK.burg}" stroke-width="1.6"/>`, 2.4)
        + `<path d="M5-24.6h12M5-21.4h12" stroke="${SCK.gold}" stroke-width="1.6"/><path d="M-2-10V0M2-10V0M13-10V0M16.6-10V0" stroke="#D9C7A0" stroke-width="1"/></g></pattern></defs><g transform="translate(0 77) scale(.5)"><rect x="30" y="-56" width="176" height="56" fill="url(#${id})"/></g>`;
      return SCH.bg('#8DB1CC')
        + `<path d="M8 14q6-5 12-1 6-3 10 1 4 0 4 3H6q0-3 2-3zM92 22q6-4 10 0 5-2 8 1 3 0 3 2H90q0-3 2-3z" fill="${SCK.white}" opacity=".85"/>`
        + `<path d="M-2 56 10 46 22 50V58H-2zM98 50 110 44 122 48V58H98z" fill="#8E7C6A"/>`
        + SCH.g(`<path d="M10 58 40 22Q52 8 60 8 68 8 80 22L112 58z" fill="#B5603A"/>`, 1.8)
        + `<path d="M60 8Q56 30 46 58M60 8Q66 30 76 58M52 14Q42 32 28 58M68 14Q80 34 96 58" stroke="#8E4A2A" stroke-width="1.6" fill="none" opacity=".8"/><path d="M57 21l-6 5 9 5-8 6M47 33l-8 4M66 28l8 5M61 38l-9 4 16 2" stroke="#E0B88A" stroke-width=".9" fill="none" opacity=".9"/>`
        + `<path d="M56 9Q52 20 50 26M66 12q2 6 6 12M36 30q-6 8-10 16" stroke="#D08A54" stroke-width="2" fill="none" opacity=".8"/>`
        + `<path d="${mines.map(([x, y]) => `M${x - 2.6} ${y + 2}q-2 2.4-2.4 4.4h10q-.4-2-2.4-4.4z`).join('')}" fill="#CF9C68"/><path d="${mines.map(([x, y]) => `M${x - 2.6} ${y + 2.4}v-2a2.6 2.6 0 0 1 5.2 0v2z`).join('')}" fill="#2A1D10"/>`
        + SCH.g(`<path d="M-2 58H122V68H-2z" fill="#B9A57A"/>
          <path d="M4 62v-6h10v6zM16 62v-5h9v5zM28 63v-6h8v6zM92 62v-6h8v6zM102 63v-5h10v5zM112 62v-6h8v6zM40 62v-5h8v5z" fill="${SCK.white}" stroke-width="1"/>
          <path d="M3 56.4 9 53 15 56.4zM15 57.4 20.4 54.4 26 57.4zM91 56.4 96 53 101 56.4zM101 57.4 107 54.4 113 57.4zM39 57.4 44 54.6 49 57.4z" fill="${SCK.red}" stroke-width="1"/>
          <path d="M62 64V48h7v16zM69 64V54h14v10zM61.4 48 65.5 42 69.6 48z" fill="${SCK.white}" stroke-width="1.2"/><path d="M71 54a5 5 0 0 1 10 0z" fill="${SCK.white}" stroke-width="1.2"/>`, 1.3)
        + `<path d="M65.5 42v-4M64 39.6h3" stroke="${SCK.ink}" stroke-width="1"/><path d="M64 52.6h3v3h-3z" fill="${SCK.ink}"/><path d="M74 64v-5h4v5z" fill="${SCK.ink}"/><path d="M61.4 48 65.5 42 69.6 48z" fill="${SCK.red}" stroke="${SCK.ink}" stroke-width="1"/>`
        + `<path d="M-2 68h124v12H-2z" fill="#C9B07A"/>`
        + llamas;
    } },

  /* the crossing of the Andes: a blue-coated horseman in a shako rides up the snow, and behind him the column of soldiers and pack mules climbs the switchbacks to the pass under a deep blue sky, a condor overhead */
  ev_independencias_latam: {
    label: 'Um exército com mulas e cavalos atravessa os picos nevados dos Andes',
    rx: /\b(andes|cordilheira|mulas|independencias|condor|condores)\b/,
    ev: 'independencias_latam',
    draw: () => {
      /* the column, far to near: a polygon list placed at x y, scaled (and flipped) */
      const P = (pts, x, y, s, f) => pts.map(q => 'M' + q.map(([a, b]) => `${+(x + (f ? -a : a) * s).toFixed(1)} ${+(y + b * s).toFixed(1)}`).join(' ') + 'z').join('');
      const MAN = [[[-2, 0], [-1.8, -11], [1.8, -11], [2, 0]], [[-1.4, -11], [-1.4, -16], [1.4, -16], [1.4, -11]]];
      const MULE = [[[-8, 0], [-8, -10], [-4, -12], [5, -12], [8, -16], [10, -15], [9, -11], [6, -8], [6, 0], [4, 0], [4, -4], [-6, -4], [-6, 0]]];
      let men = '', mules = '', packs = '';
      [[46, 70.4, .7, 1, 1], [33, 67.4, .6, 1], [30, 60.6, .45], [38, 58, .45, 0, 1], [45, 55.4, .45], [41, 51.4, .36, 1], [35, 48.8, .36, 1, 1], [29.6, 46.4, .36, 1], [36, 39.8, .28], [44, 36.2, .28]].forEach(([x, y, s, f, m]) => {
        if (m) { mules += P(MULE, x, y, s * 1.3, f); packs += P([[[-6, -12], [-6, -16], [3, -16], [3, -12]]], x, y, s * 1.3, f); } else men += P(MAN, x, y, s, f); });
      const legs = 'M-8-9-8.6-4-8 0M-5-8.6-4.6-4-5.4 0M4.6-8.6 5-4 4.4 0M7.6-9 8.4-4 9 0';
      return SCH.bg('#5B86B5')
        + SCH.g(`<path d="M-2 40 16 18 24 22 40 6 54 20 62 16 78 2 96 22 104 18 122 36V60H-2z" fill="#E9EEF0" stroke-width="1.4"/>`, 1)
        + `<path d="M40 6 46 20 42 30M78 2 74 18 82 30M16 18 20 30 14 40M104 18 100 30 108 40" stroke="#9AA8B8" stroke-width="2.4" fill="none" stroke-linejoin="round"/><path d="M40 6 30 20 34 22 28 30M78 2 66 16 70 18 62 28" stroke="#C3CDD8" stroke-width="2" fill="none"/>`
        + `<path d="M-2 46Q30 30 60 40T122 38V80H-2z" fill="#F4F2EC"/><path d="M-2 66Q40 54 80 62T122 60V80H-2z" fill="#DCE3EA"/>`
        + `<path d="M70 75Q30 70 24 64.6 18 58 46 55 30 50 29 45 28 38 54 32" stroke="#B4BFCC" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
        + `<path d="${mules}" fill="#5A3A22"/><path d="${packs}" fill="${SCK.ochre}"/><path d="${men}" fill="#2E4A7A"/>`
        + `<g transform="translate(88 79) scale(-1.7 1.7)">` + SCH.g(`<path d="${legs}" stroke-width="2.4" fill="none"/><path d="M-9.6-13Q-14-11-13.4-4.6L-11.4-5Q-11.6-10-9-11.6z" fill="#2A1D10" stroke-width=".6"/>
          <path d="M-10-14Q-10-16.4-6-16.4H4L9-22 10.6-26 12.2-23.4 16.4-18.6 15.4-16.6 11.6-18 9-14 8-9Q0-7.4-9-8.6-11-10-10-14Z" fill="#7A4E2E"/>
          <path d="M-4.6-16.4V-11.4H3.4V-16.4z" fill="${SCK.burg}" stroke-width=".7"/><path d="M-2.4-16.6-1.6-25H2.4L2.8-16.6z" fill="#2E4A7A" stroke-width=".8"/>
          <path d="M-1.6-17.4H1.6L2.6-10.6H.6z" fill="${SCK.white}" stroke-width=".7"/><circle cx=".6" cy="-26.8" r="1.8" fill="#C79A72" stroke-width=".7"/><path d="M-1.4-28V-32.4H2.6V-28z" fill="${SCK.ink}" stroke-width=".6"/>`, .8)
        + `<path d="M8.6-22.4Q5-20 4-16.4" stroke="${SCK.ink}" stroke-width="1.4" fill="none"/><path d="M2-22.6 9.6-19.6" stroke="${SCK.ink}" stroke-width=".7"/>
          <path d="M.6-32.4v-2.6" stroke="${SCK.red}" stroke-width="1.2"/></g>`
        + `<g transform="translate(96 12) scale(.8)">` + SCH.g(`<path d="M0 0Q-8-5-20-3L-26 0-22 1-24 3-19 3-20 5Q-10 4-2 3 0 5 2 3 10 4 20 5L19 3 24 3 22 1 26 0 20-3Q8-5 0 0z" fill="#1E1A16" stroke-width=".8"/>`, 1)
        + `<path d="M-14-1.6Q-8-2.6-3-.4M14-1.6Q8-2.6 3-.4" stroke="${SCK.white}" stroke-width="1.6" fill="none"/><circle cy="-1" r="1.6" fill="${SCK.white}"/><circle cy="-2.4" r="1.1" fill="#C98A7A"/></g>`;
    } },
});
