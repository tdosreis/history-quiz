/* Século XX — the scenes of the twentieth century: the two world wars, the liners and the poles, the Russian revolution, the laboratory and the factory (conventions in _core.js) */
Object.assign(SCENE, {
  /* the Western Front: a sandbag parapet with a British and a French helmet on it, a ladder, the duckboards; beyond, barbed wire and shattered trees under a grey sky */
  ev_primeira_guerra: {
    label: 'Uma trincheira com sacos de areia, arame farpado e capacetes de aço, sob céu cinzento',
    rx: /\b(primeira guerra|grande guerra|trincheira|trincheiras|arame farpado)\b/,
    ev: 'primeira_guerra',
    draw: () => {
      const K = SCK.ink;
      /* the sandbags: each row one dashed stroke, ink under paper-sack */
      const row = (y, o, c) => `<path d="M${o} ${y}h130" stroke="${K}" stroke-width="9.8" stroke-dasharray="7 8" stroke-linecap="round"/><path d="M${o} ${y}h130" stroke="${c}" stroke-width="7.4" stroke-dasharray="7 8" stroke-linecap="round"/>`;
      const stake = x => `M${x - 3} 47 ${x + 2.4} 35M${x + 3} 47 ${x - 2.4} 35`;
      return SCH.bg('#B8BEB6') + `<path d="M0 8q30-6 60-2t60-1v8q-30 4-60 0T0 16z" fill="#A9B0A9"/>`
        + `<path d="M0 36q20-4 40-1t40 0 40-2v17H0z" fill="#867857"/>`
        + `<ellipse cx="50" cy="41" rx="9" ry="2.2" fill="#6C5F44"/><ellipse cx="50" cy="41.4" rx="5" ry="1" fill="#A3ADA8"/><ellipse cx="96" cy="43" rx="7" ry="1.8" fill="#6C5F44"/>`
        + SCH.g(`<path d="M18 42l1-17-4-7 4.4 3.4L20 8l2.4 9.4 4-5.4-2.6 9.6.4 20.4z" fill="#3E352A"/>
          <path d="M82 40l.6-12-3.6-5 4 2 .6-9 2 8 3-3-2.4 6.4.4 12.6z" fill="#3E352A"/><path d="M110 38l.4-7-2.4-3 2.8 1.4 1-5 1 5.6-.4 8z" fill="#3E352A"/>`, 1.2)
        + `<path d="${[8, 34, 62, 92, 114].map(stake).join('')}" stroke="${K}" stroke-width="1.4"/>`
        + `<path d="M0 41h120" stroke="${K}" stroke-width="6" stroke-dasharray=".6 2.2" opacity=".55"/><path d="M0 38q8 3 15 0t15 0 15 0 15 0 15 0 15 0 15 0 15 0" fill="none" stroke="${K}" stroke-width=".8" opacity=".7"/>`
        + `<path d="M0 66h120v8H0z" fill="#5A4632"/><path d="M0 70h120" stroke="${K}" stroke-width="8" stroke-dasharray="1 13" opacity=".5"/>`
        + row(65, -1, '#B09968') + row(58, -8.5, '#C4AD80') + row(51, -1, '#BDA578')
        + `<path d="M-1 51h130M-8.5 58h130M-1 65h130" stroke="${K}" stroke-width="5" stroke-dasharray=".7 14.3" stroke-dashoffset="-1.6" opacity=".3"/>`
        + SCH.g(`<path d="M0 74h120v6H0z" fill="${SCK.wood}"/>`, 1.4)
        + `<path d="M2 77h120" stroke="${K}" stroke-width="5" stroke-dasharray="1.2 4.8" opacity=".55"/>`
        + `<path d="M97 78 100 40M108 78 105 40" fill="none" stroke="${K}" stroke-width="3.8"/><path d="M97 78 100 40M108 78 105 40M97.6 70h10M98.2 62h8.6M98.8 54h7.4M99.4 46h6.2" fill="none" stroke="${SCK.wood}" stroke-width="2.2"/>`
        + `<g stroke="${K}" stroke-width="1.4" stroke-linejoin="round"><g transform="translate(34 47.2) scale(1.4)"><path d="M-6.6 0q.6-6.6 6.6-6.6T6.6 0z" fill="#6A6A40"/><path d="M-11 .3q11 3 22 0-11-2.6-22 0z" fill="#5E5E38"/></g>
          <g transform="translate(70 47.2) scale(1.4)"><path d="M-6.2 0q0-7.4 6.2-7.4T6.2 0z" fill="#7D91A8"/><path d="M-10 1.6q2-2.4 4.6-2h10.8q2.6-.4 4.6 2z" fill="#6E8299"/><path d="M-4.2-5.8q4.2-4.4 8.4 0" fill="none" stroke-width="2"/></g></g>`
        + `<path d="M27 43q2-4 6-4.8M64 43q1.6-4.6 5-5.4" fill="none" stroke="#F4ECD8" stroke-width="1.2" opacity=".5"/>`;
    } },

  /* D-Day: landing craft with their square ramps run in towards a beach of steel hedgehogs below the bluffs; warships and barrage balloons on the grey horizon */
  ev_segunda_guerra: {
    label: 'Lanchas de desembarque aproximam-se de uma praia, com balões de barragem no céu',
    rx: /\b(segunda guerra|desembarque|normandia|dia d|lancha de desembarque|lanchas de desembarque)\b/,
    ev: 'segunda_guerra',
    draw: () => {
      const K = SCK.ink, G = '#7C867D';
      const balloon = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M3-2 9.4-6.4h3L11 0l1.4 6.4h-3L3 2z" fill="#A4AAA6"/><ellipse rx="8.6" ry="4.6" fill="#CDD0CB"/><path d="M4 0h8.4" stroke-width="1.4"/></g>`;
      const lcvp = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">`
        + `<path d="M11 -9.6h23" stroke="${K}" stroke-width="4.4" stroke-dasharray="0 3.6" stroke-linecap="round"/><path d="M11 -9.6h23" stroke="#5E6B3A" stroke-width="2.6" stroke-dasharray="0 3.6" stroke-linecap="round"/>`
        + SCH.g(`<path d="M0 0 1-9h35l4-2.4 1.6 10.4q-3 4-11 4H4Q1 3 0 0z" fill="${G}"/><path d="M1-9h6v-4.4H2z" fill="#6A746B"/>`, (1.6 / s).toFixed(1))
        + `<path d="M3-4.6h33M36.4-9.6l1.4 10" stroke="${K}" stroke-width="${(.8 / s).toFixed(1)}" opacity=".45"/></g>`;
      const hog = x => `M${x - 3.4} 57.6l6.8-7M${x + 3.4} 57.6l-6.8-7M${x} 58.4v-8.8`;
      return SCH.bg('#C5CDC9') + `<path d="M0 0h120v10q-40 5-120 0z" fill="#B4BEBB"/>`
        + `<path d="M16 16v22M42 13v24M72 18v19" stroke="${K}" stroke-width=".6" opacity=".6"/>`
        + SCH.g(balloon(17, 12, 1) + balloon(43, 9, .9) + balloon(73, 15, .8), 1.2)
        + `<path d="M92 9h10M96 7v5M104 16h7M107 14.6v3.6" stroke="${K}" stroke-width="1.6" stroke-linecap="round"/>`
        + `<path d="M0 38h4l2-3h3l1-4h3l1 4h6l1-6h2l1 6h8l2-3h4l2 3h5v3H0zM48 38h3l1-2h3l1 2h5v1H48z" fill="#7D8790"/>`
        + `<path d="M0 39h120v41H0z" fill="${SCK.sea}"/>`
        + SCH.g(`<path d="M120 26q-14 0-24 6t-22 8l6 4h40z" fill="#8C8A58"/><path d="M68 44q20-6 52-4v18H62z" fill="#D9C08C"/>`, 1.4)
        + `<path d="M76 41q10-4 20-6M90 38q8-4 18-6" stroke="${K}" stroke-width=".8" opacity=".35" fill="none"/>`
        + `<path d="${[72, 84, 96, 108].map(hog).join('')}" stroke="${K}" stroke-width="1.8" stroke-linecap="round"/>`
        + `<path d="M58 59q16 2 62-2" stroke="${SCK.white}" stroke-width="1.6" fill="none"/>`
        + lcvp(56, 52, .6) + `<path d="M40 52.6h14" stroke="${SCK.white}" stroke-width="1.2" opacity=".8"/>`
        + lcvp(14, 70, 1)
        + `<path d="M0 71q5 2 13 0M56 66q2-4 0-8" stroke="${SCK.white}" stroke-width="2" fill="none" stroke-linecap="round"/>`
        + SCH.waves(76, '#7FA2B8', 1.2) + `<path d="M0 46q10-2 20 0t20 0" stroke="#7FA2B8" stroke-width="1" fill="none"/>`;
    } },

  /* the four-funnelled liner at full speed on a starry, moonless night, black sea, steaming bow-first towards the iceberg that looms ahead */
  titanic: {
    label: 'Um transatlântico de quatro chaminés à noite, junto a um iceberg',
    rx: /\b(titanic|iceberg|transatlantico)\b/,
    draw: () => {
      const K = SCK.ink;
      let st = '';
      for (const [x, y] of [[8, 8], [22, 14], [34, 5], [47, 12], [58, 4], [70, 10], [84, 6], [96, 12], [112, 5], [14, 26], [40, 22], [76, 18], [116, 22], [5, 34], [64, 24]]) st += `M${x} ${y}h0`;
      let ports = '';
      for (let x = 10; x < 76; x += 3.6) ports += `M${x.toFixed(1)} 50.4h0`;
      /* a funnel raked aft (to the left), r its forward foot */
      const fun = r => `<path d="M${r} 38l-3-18h-6.4l2.6 18z" fill="#D2A050"/><path d="M${r - 3} 20h-6.4l.7 4.2h6.4z" fill="#1A1714"/>`;
      return SCH.bg('#26324D') + `<path d="${st}" stroke="#F4ECD8" stroke-width="1.4" stroke-linecap="round"/>`
        + `<path d="M0 58h120v22H0z" fill="#111722"/>`
        + `<path d="M94 64h18M88 70h26M100 75h14" stroke="#9FB4BE" stroke-width="1.2" opacity=".5"/><path d="M16 62h6M30 64h4M44 62h6M58 64h4" stroke="${SCK.goldHi}" stroke-width="1" opacity=".55"/>`
        + SCH.g(`<path d="M86 58l4-14 5-6 3-14 6-6 4 6 3-2 4 10 2-2 3 14v14z" fill="#DCE5E8"/>`, 1.6)
        + `<path d="M104 18l-2 18-6 10 2 12h22V44l-3-14-2 2-4-10-3 2z" fill="#AFC2CB"/><path d="M95 40l5 6M110 26l2 10M90 50l6 2" stroke="${K}" stroke-width=".8" opacity=".5"/>`
        + `<path d="M72 46V17M11 44V13M72 18 11 14" stroke="#C9BFA8" stroke-width=".8"/>`
        + SCH.g(`<path d="M66 45V40h-4v-3H16v3h-4v5z" fill="${SCK.white}"/>` + fun(26) + fun(37) + fun(48) + fun(59)
          + `<path d="M2 45h66l13-2.4-1.6 15.4H10q-5.4-3-8-13z" fill="#1A1714"/>`, 1.4)
        + `<path d="M8 55.6h71.4" stroke="${SCK.red}" stroke-width="1.6"/><path d="M4 46.6h76" stroke="${SCK.goldHi}" stroke-width=".7" opacity=".7"/>`
        + `<path d="${ports}" stroke="${SCK.goldHi}" stroke-width="1.3" stroke-linecap="round"/>`
        + `<path d="M18 42.6h44" stroke="${SCK.goldHi}" stroke-width="1.2" stroke-dasharray="1.2 1.6"/>`;
    } },

  /* a Second World War aircraft carrier steaming in profile on a calm sea: the long flat-top with planes ranged aft, the island with its funnel and mast, an escort far off */
  porta_avioes: {
    label: 'Um porta-aviões no mar aberto sob nuvens',
    rx: /\b(porta-avioes|porta avioes|porta-aviao)\b/,
    draw: () => {
      const K = SCK.ink, H = '#8D979B';
      const cloud = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 0h30q0-6-6-6-1-6-8-6-6 0-8 5Q0-7 0 0z" fill="${SCK.white}"/>`;
      /* a plane parked on the deck, seen from the side: the fin, the cockpit, the wing under it, the wheels */
      const pl = x => `<g transform="translate(${x} 35.4) scale(1.4)"><path d="M0-2 .4-7H2l1.2 3.6 4.6-.8Q11-4.6 11.6-3.4V-2q-1 .8-3.6.8H1z" fill="#3B4C63"/><path d="M5.8-4q.6-2 2.6-1.8l.8 1.4z" fill="#D7E4E8" stroke-width=".6"/><path d="M5.4-2h5.8l-.6 1.1H5.8z" fill="#2E3A4C" stroke-width=".6"/><path d="M12.2-5.6v4.6M9.8-1v1M-.6-3H3" fill="none"/></g>`;
      return SCH.bg(SCK.sky) + cloud(8, 16, .8) + cloud(88, 12, .6)
        + `<path d="M0 38h120v42H0z" fill="${SCK.sea}"/><path d="M8 37.6l.8-2h4.4l.6-1.6h1.4l.6 1.6h4l.8 2z" fill="#6E7E8A"/>`
        + SCH.g(`<path d="M12 43.4h100l-8.4 14H19q-4-6-7-14z" fill="${H}"/>
          <path d="M14 40h92v3.4H14z" fill="#6F7A7F" stroke-width="1.2"/><path d="M1 37.4h117l1 3H2z" fill="#6F7A7F"/><path d="M4 34.6h110l4 2.8H1z" fill="#B4AA8E" stroke-width="1.2"/>`, 1.6)
        + `<path d="M18 41.7h10M34 41.7h10M50 41.7h10M90 41.7h10" stroke="#2E3A44" stroke-width="1.8"/><path d="M6 40.4l6 3M114 40.4l-4 3" stroke="${K}" stroke-width="1.2"/><path d="M16 49h93" stroke="${K}" stroke-width=".8" opacity=".35"/>`
        + `<path d="M0 56q10-3 20 0t20 0 20 0 20 0 20 0 20 0v24H0z" fill="${SCK.sea}"/><path d="M100 56q8-1 12-6M22 57q-10-3-20-1" stroke="${SCK.white}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`
        + SCH.waves(68, '#7FA2B8', 1.2) + SCH.waves(76, '#7FA2B8', 1)
        + SCH.g(pl(6) + pl(24) + pl(42), .8)
        + SCH.g(`<path d="M80 20V5M76 8.6h8" fill="none" stroke-width="1.4"/><path d="M77.6 8v-3h4.8v3z" fill="#6F7A7F" stroke-width="1"/>
          <path d="M64 34.6 65.4 22h7.8l.8 12.6z" fill="#6F7A7F"/><path d="M65.4 22h7.8l-.4-3.6h-7z" fill="#2E2A28" stroke-width="1.2"/>
          <path d="M73 34.6V24h13l2.4 4v6.6z" fill="${H}"/><path d="M75.4 24v-4.4h8.4V24z" fill="#A3ACAF" stroke-width="1.2"/>`, 1.4)
        + `<path d="M75.6 27.4h11" stroke="#2E3A44" stroke-width="1.8"/><path d="M74 31.4h13" stroke="${K}" stroke-width=".8" opacity=".5"/>`;
    } },

  /* the P-47 Thunderbolt in olive drab, banking past in three-quarter view: the fat body, the big radial cowling seen face-on, the bubble canopy, the elliptical wings and the blur of the propeller, over the green Apennines and a hill town with its bell tower and cypresses */
  caca_p47: {
    label: 'Um caça de motor radial sobrevoando montanhas da Itália',
    rx: /\b(thunderbolt|caca|avioes de caca|aviao de caca|cacas)\b/,
    draw: () => {
      const K = SCK.ink, O = '#646C3E';
      return SCH.bg(SCK.sky) + `<path d="M6 10h20M12 7h9M84 7h24M92 4h10" stroke="${SCK.white}" stroke-width="2.4" stroke-linecap="round"/>`
        + `<path d="M0 48q14-8 30-4t30-6 30 2 30-4v44H0z" fill="#9DB08A"/><path d="M0 64q20-10 46-4t26-2q16-10 30-8t18 2v28H0z" fill="${SCK.green}"/>`
        + SCH.g(`<path d="M97 60v-6h5v-4l3-2.4 3 2.4v4h4v-3h3l2 3v6zM104 47.6V36h3.4v11.6z" fill="#DCCDA8" stroke-width="1"/><path d="M96.4 54.4l3.2-2.6 3.2 2.6zM111.4 51.4l3-2.2 3 2.2zM103.2 36l2.4-3.4 2.4 3.4z" fill="#B5583A" stroke-width=".9"/>`, 1)
        + `<path d="M105.2 39.4h1.2" stroke="${K}" stroke-width="2"/><path d="M94 62q-2.4-7 0-14 2.4 7 0 14zM118.6 60q-2.4-7 0-14 2.4 7 0 14z" fill="#3E4A2A"/>`
        + `<path d="M0 72q30-8 60-2t60-4v14H0z" fill="${SCK.olive}"/><path d="M8 76h10M40 73h12M70 76h14" stroke="${K}" stroke-width=".8" opacity=".3"/>`
        + SCH.g(`<path d="M69.9 40.3L71.3 37.5L72.6 34.8L73.9 32.1L75 29.3L76 26.6L76.7 23.8L77.2 21L77.4 18.2L76.8 15.4L72.6 12.4L66.6 14.8L63.5 17.5L61 20.1L58.9 22.8L56.9 25.5L55.1 28.2L53.5 30.9L51.9 33.6L50.4 36.4L49 39.1Z" fill="#545B32"/><path d="M24 33.2L25 31.7L25.9 30.2L26.7 28.6L27.3 27.1L27.4 25.6L25.7 23.9L21.2 25.2L19 26.7L17.3 28.1L15.9 29.6L14.6 31.1L13.5 32.6Z" fill="#545B32"/><path d="M32.2 28.5L23 23.8L17.2 18.6L13.5 17.5L10.9 18.3L10.3 22.4L11.3 30.8Z" fill="${O}"/><path d="M86 29.4L78.9 28.6L65.1 28.2L48.5 27.7L35.1 29.4L17.4 30.5L11.3 30.8L12 34.5L22.7 36.7L37.2 40.1L51.7 44.2L67.2 45.9L82.3 46.1L89.2 46.1Z" fill="${O}"/><path d="M53 28L53.3 26.2L54.9 24.8L57.6 23.9L60.8 23.8L64.2 24.3L67.2 25.5L69.4 27.1L70.4 28.9Z" fill="#D7E4E8"/><path d="M78.2 28.5L85.9 28.9L89.3 46.5L81.7 46.1Z" fill="#5A6236"/><path d="M86.2 29L85.1 31L84.3 33.7L83.9 36.9L83.8 40.1L84.2 43L84.9 45.5L85.9 47.2L87.1 47.9L88.4 47.7L89.6 46.5L90.7 44.5L91.5 41.7L92 38.6L92.1 35.4L91.7 32.5L91 30L90 28.3L88.8 27.5L87.5 27.8Z" fill="#4A5030"/><path d="M87.3 32.5L86.6 33.7L86.1 35.4L85.9 37.2L85.8 39.1L86 40.9L86.5 42.4L87.1 43.4L87.8 43.9L88.6 43.7L89.3 43L90 41.8L90.4 40.2L90.7 38.3L90.8 36.4L90.6 34.6L90.1 33.1L89.5 32.1L88.8 31.6L88 31.8Z" fill="#2E3020"/><path d="M24 33.2L22.9 34.7L21.6 36.2L20.3 37.7L18.7 39.1L16.7 40.6L12.8 41.9L10.5 40.2L10.5 38.7L10.9 37.1L11.6 35.6L12.5 34.1L13.5 32.6Z" fill="#737C47"/><path d="M69.9 40.3L67.8 42.4L65.7 44.5L63.5 46.6L61.1 48.8L58.6 50.9L55.9 53L53 55L49.6 57.1L45.6 59.1L37.9 60.9L35.4 58.5L35.8 56.3L36.8 54.1L38.1 51.9L39.6 49.8L41.3 47.6L43.1 45.5L45 43.4L47 41.2L49 39.1Z" fill="#737C47"/>`, 1.4)
        + `<path d="M61 24v4.6M78.2 28.5 81.7 46.1" stroke="${K}" stroke-width=".9" opacity=".6"/><path d="M36 30.6l14-2 15 .4" stroke="#A0A86E" stroke-width="1.4" fill="none"/><path d="M45 50.6l13-9" stroke="${K}" stroke-width=".8" opacity=".45"/>`
        + `<path d="M88.6 21.7L86.9 24.8L85.5 28.8L84.6 33.4L84.1 38.3L84.2 43.2L84.8 47.7L85.8 51.6L87.3 54.6L89.1 56.4L91 56.9L93 56.2L94.9 54.2L96.6 51.1L98 47.1L98.9 42.5L99.4 37.6L99.3 32.7L98.8 28.2L97.7 24.3L96.2 21.4L94.5 19.5L92.5 19L90.5 19.7Z" fill="${SCK.white}" opacity=".4"/><path d="M91.8 38 87.9 23.5M91.8 38 95.6 52.4" stroke="${K}" stroke-width="2.2" stroke-linecap="round"/><circle cx="92.5" cy="38" r="1.8" fill="${K}"/>`;
    } },
  /* the secret annex: the hinged bookcase of binders swung open on the steep stair behind it; under the attic window and its chestnut tree, a desk with an open checked diary and a pencil */
  anexo_secreto: {
    label: 'Uma estante giratória que esconde uma escada e, sobre a mesa, um diário aberto',
    rx: /\b(estante|diario|anexo|esconderijo)\b/,
    draw: () => {
      const K = SCK.ink, P = SCH.uid('ck');
      let st = '';
      for (let i = 0; i < 8; i++) { const y = 66 - i * 6.8, a = 22 + i * .7, b = 46 - i * .7; st += `M${a.toFixed(1)} ${y.toFixed(1)}H${b.toFixed(1)}`; }
      const sh = t => `M50 ${(14 + t * 52).toFixed(1)} 72 ${(9 + t * 62).toFixed(1)}`;
      const bk = {};
      [[0, .25, [53, 56, 59, 62, 65, 68]], [.25, .5, [53, 56, 59, 63, 66, 69]], [.5, .75, [52, 55, 58, 61, 64, 68]], [.75, 1, [53, 56, 60, 63, 66, 69]]].forEach(([t0, t1, xs], j) => xs.forEach((x, i) => {
        const c = [SCK.burg, SCK.sand, SCK.teal, SCK.stone][(i + j) % 4], y0 = 14 + t0 * 52 + (x - 50) * (-5 + 10 * t0) / 22, y1 = 14 + t1 * 52 + (x - 50) * (-5 + 10 * t1) / 22;
        bk[c] = (bk[c] || '') + `M${x} ${(y1 - .8).toFixed(1)}V${(y0 + 2.4).toFixed(1)}`; }));
      return SCH.bg('#D3BE94') + `<path d="M0 40h120" stroke="#C6B084" stroke-width="80" stroke-dasharray="1.2 5"/>`
        + `<defs><pattern id="${P}" width="3" height="3" patternUnits="userSpaceOnUse"><rect width="3" height="3" fill="${SCK.white}"/><path d="M0 0h1.5v1.5H0zM1.5 1.5H3V3H1.5z" fill="${SCK.red}"/></pattern></defs>`
        + SCH.g(`<path d="M0 68h120v12H0z" fill="#7A5232"/><path d="M20 12h28v56H20z" fill="#2E2116"/>`, 1.6)
        + `<path d="M0 74h120" stroke="${K}" stroke-width=".8" opacity=".4"/>`
        + `<path d="${st}" stroke="#6B4A2E" stroke-width="6.4"/><path d="${st}" stroke="#C4996A" stroke-width="1.8"/><path d="M45 66 43 14" stroke="#C9A66B" stroke-width="1"/>`
        + SCH.g(`<path d="M48 12 74 5v70l-26-7z" fill="#9A6A3E"/><path d="M51 15.4 71 10v61.6l-20-5z" fill="#4E3622" stroke-width="1"/>`, 1.6)
        + Object.entries(bk).map(([c, d]) => `<path d="${d}" stroke="${c}" stroke-width="2.8"/>`).join('')
        + `<path d="${sh(.25)}${sh(.5)}${sh(.75)}" stroke="#9A6A3E" stroke-width="2"/><path d="M47 14v52" stroke="${K}" stroke-width="1.2" opacity=".5"/>`
        + SCH.g(`<path d="M84 8h30v32H84z" fill="${SCK.sky}"/>`, 1.8)
        + `<path d="M99 40V27M99 31l-5-4M99 29l4-4" stroke="#4A3626" stroke-width="2"/><path d="M88 28q-4-8 3-12 2-8 10-6 8-2 10 6 6 3 2 10-4 6-12 4-9 4-13-2z" fill="${SCK.green}" stroke="${K}" stroke-width="1.2"/><path d="M92 20q4-3 8 0M101 16q4-2 7 1" stroke="#4E6B40" stroke-width="1.4" fill="none"/>`
        + SCH.g(`<path d="M84 24h30M99 8v32" stroke="${SCK.white}" stroke-width="2.6" fill="none"/>`, 1)
        + `<path d="M84 24h30M99 8v32" stroke="${SCK.white}" stroke-width="1.6"/><path d="M82 40h34v3H82z" fill="${SCK.white}" stroke="${K}" stroke-width="1.2"/>`
        + SCH.g(`<path d="M78 54h42v4H78zM81 58h4v14h-4zM114 58h4v14h-4z" fill="${SCK.wood}"/>
          <path d="M84 54l4-6h22l4 6z" fill="url(#${P})"/><path d="M86 53.4l3.4-4.6h9.4V53.4zM99 53.4v-4.6h9.6l3 4.6z" fill="${SCK.white}" stroke-width="1"/>`, 1.4)
        + `<path d="M90 50.4h7M89 52h8M101 50.4h7M101 52h8" stroke="${K}" stroke-width=".5" opacity=".5"/>`
        + `<path d="M104 56.4l12-4" stroke="${K}" stroke-width="2.6" stroke-linecap="round"/><path d="M105 56l10.6-3.6" stroke="${SCK.gold}" stroke-width="1.4"/><path d="M103.6 56.6l1.4-.6" stroke="#F0C9A0" stroke-width="1.4"/>`;
    } },

  /* the cipher machine in its open wooden case: three serrated rotors at the back, the lampboard with one lamp lit, the keyboard, the plugboard and its cables, under a desk lamp */
  maquina_enigma: {
    label: 'Uma máquina de cifrar com rotores e teclado, numa caixa de madeira',
    rx: /\b(enigma|maquina de cifrar|rotores|maquina de criptografia)\b/,
    draw: () => {
      const K = SCK.ink;
      /* a row of n round keys or lamps: one dashed stroke for the rim, one for the face */
      const row = (y, n, r, f, s) => { const w = 54 + (y - 22) * .5, d = (w / (n - 1)).toFixed(1), m = `M${(60 - w / 2).toFixed(1)} ${y}h${w.toFixed(1)}`;
        return `<path d="${m}" stroke="${s}" stroke-width="${2 * r + 1.2}" stroke-dasharray="0 ${d}" stroke-linecap="round"/><path d="${m}" stroke="${f}" stroke-width="${(2 * r - .6).toFixed(1)}" stroke-dasharray="0 ${d}" stroke-linecap="round"/>`; };
      return SCH.bg('#2C3830') + `<path d="M0 33h120" stroke="#33423A" stroke-width="66" stroke-dasharray="2 5"/>`
        + `<path d="M0 66h120v14H0z" fill="#5A3C22"/><path d="M0 66h120" stroke="${K}" stroke-width="1.4"/>`
        + `<path d="M4 2 20 2 46 64H-14z" fill="#F2D27A" opacity=".1"/>`
        + SCH.g(`<path d="M22 22 26 4h68l4 18z" fill="#6E4A2A"/><path d="M26 18 29 8h62l3 10z" fill="#4A3220" stroke-width="1"/>
          <path d="M22 22h76l8 40v10H14V62z" fill="${SCK.wood}"/><path d="M26 25h68l6.4 34H19.6z" fill="#2E2A26" stroke-width="1.2"/>
          <path d="M14 62h92" fill="none" stroke-width="1.2"/>`, 1.8)
        + `<path d="M49 21.6h0M60 21.6h0M71 21.6h0" stroke="${K}" stroke-width="15" stroke-linecap="round"/><path d="M49 21.6h0M60 21.6h0M71 21.6h0" stroke="#B9B3A3" stroke-width="12.4" stroke-linecap="round"/>`
        + `<g fill="none" stroke="${K}" stroke-width="2.2" stroke-dasharray="1.2 1.1"><circle cx="49" cy="21.6" r="5.6"/><circle cx="60" cy="21.6" r="5.6"/><circle cx="71" cy="21.6" r="5.6"/></g>`
        + SCH.g(`<path d="M40 24h40v4.6H40z" fill="#8E8A80"/>`, 1.2)
        + `<path d="M49 18v4M60 18v4M71 18v4" stroke="${K}" stroke-width="1" opacity=".5"/>`
        + row(32, 9, 1.9, '#D9D2BC', '#1A1714') + row(37, 8, 1.9, '#D9D2BC', '#1A1714') + row(42, 9, 1.9, '#D9D2BC', '#1A1714')
        + `<circle cx="56" cy="37" r="5" fill="${SCK.goldHi}" opacity=".35"/><circle cx="56" cy="37" r="2" fill="${SCK.goldHi}" stroke="${K}" stroke-width="1"/>`
        + row(48, 9, 2.4, '#1A1714', '#C9C3B4') + row(53.4, 8, 2.4, '#1A1714', '#C9C3B4') + row(58.6, 9, 2.4, '#1A1714', '#C9C3B4')
        + `<path d="M22 66h76" stroke="#1A1714" stroke-width="2.4" stroke-dasharray="1.4 2.2"/><path d="M20 69h80" stroke="#1A1714" stroke-width="1.6" stroke-dasharray="1 2.6" opacity=".7"/>`
        + `<path d="M31 66q-2 10 8 12t14-4 2-8M71 66q4 12-6 12-8 0-10-8M88 69q2 10 10 8" fill="none" stroke="${K}" stroke-width="2.6"/><path d="M31 66q-2 10 8 12t14-4 2-8M71 66q4 12-6 12-8 0-10-8M88 69q2 10 10 8" fill="none" stroke="${SCK.red}" stroke-width="1.4"/>`
        + SCH.g(`<path d="M6 0 12 10" stroke-width="2.4" fill="none"/><path d="M4 8q8-6 16-2l2 6q-10-2-18 4z" fill="${SCK.teal}" stroke-width="1.4"/>`, 1)
        + `<path d="M8 16q6-4 14-3" stroke="${SCK.goldHi}" stroke-width="1.6" fill="none"/>`;
    } },

  /* the hat reform: a red fez with its black tassel and a grey brimmed hat side by side on a table, a window on the new city */
  fez_chapeu: {
    label: 'Um fez vermelho e um chapéu de aba lado a lado sobre uma mesa',
    rx: /\b(fez|chapeu de aba|chapeu|chapeus|lei do chapeu)\b/,
    draw: () => {
      const K = SCK.ink;
      return SCH.bg('#E2D2AE') + `<path d="M0 0h120v80H0z" fill="none" stroke="#D6C49C" stroke-width="160" stroke-dasharray="1 7"/>`
        + SCH.g(`<path d="M26 4h68v42H26z" fill="#C7D8DE"/>`, 1.8)
        + `<path d="M28 46V28h8v-6h6v24zM44 46V18h10v28zM58 46V24h6v-4h4v4h6v22zM78 46V30h14v16z" fill="#A9A493"/><path d="M47 22v22M51 22v22M61 28v16M71 28v16M81 34h8M81 38h8M81 42h8M30 32h4M30 36h4M30 40h4" stroke="#7E7A6A" stroke-width="1.2"/>`
        + `<path d="M64 20h4l-2-6z" fill="#A9A493"/>`
        + SCH.g(`<path d="M60 4v42M26 25h68" fill="none" stroke="${SCK.white}" stroke-width="3"/>`, 1)
        + `<path d="M60 5v40M27 25h66" stroke="${SCK.white}" stroke-width="2"/><path d="M22 46h76v4H22z" fill="${SCK.white}" stroke="${K}" stroke-width="1.4"/>`
        + SCH.g(`<path d="M0 60h120v20H0z" fill="${SCK.wood}"/><path d="M0 60h120v4H0z" fill="#A06C40"/>`, 1.6)
        + `<path d="M0 70h120M0 76h120" stroke="${K}" stroke-width=".8" opacity=".3"/>`
        + `<ellipse cx="38" cy="63" rx="14" ry="2.4" fill="#5A3A20" opacity=".6"/><ellipse cx="84" cy="64" rx="22" ry="3" fill="#5A3A20" opacity=".6"/>`
        + SCH.g(`<path d="M26 62l4-25h18l4 25q-13 3-26 0z" fill="#B0242A"/><ellipse cx="39" cy="37" rx="9" ry="2.6" fill="#8E1A1F"/>
          <path d="M66 62q18 4 36 0 6 1 0 3-18 4-36 0-6-2 0-3z" fill="#8C8A82"/>
          <path d="M70 61q-1-10 2-18 4-4 12-4t12 4q3 8 2 18-14 3-28 0z" fill="#9B998F"/><path d="M70.6 55q13.4 3 26.8 0l.4 5q-14 3-27.6 0z" fill="#2E2A28"/>`, 1.6)
        + `<path d="M74 43q10-5 20 0" stroke="${K}" stroke-width="1.2" fill="none" opacity=".55"/><path d="M73 52q2-8 1-11M95 52q-2-8-1-11" stroke="#B5B3AA" stroke-width="1.4" fill="none"/><path d="M45 40l2 20" stroke="#D44A4E" stroke-width="1.4" opacity=".6"/>`
        + `<path d="M39 37q10-1 12 7l1 4" fill="none" stroke="#1A1714" stroke-width="1.8"/><path d="M52 47l-2.4 10h5.4z" fill="#1A1714" stroke="${K}" stroke-width="1"/>`;
    } },

  /* the pole reached: a small dark tent with a plain pennant on the white plateau, the loaded sledge and the harnessed huskies, a low sun on the horizon */
  polo_sul: {
    label: 'Uma barraca solitária no planalto gelado, com trenó e cães',
    rx: /\b(polo sul|treno|tenda|barraca|caes de treno)\b/,
    draw: () => {
      const K = SCK.ink;
      const dog = (x, y) => `<g transform="translate(${x} ${y}) scale(1.2)"><path d="M0-4q2-3 5-2l1.4-2.4.8 2.6q2 1 1.4 3l-3 .6-1 2.6h6q4-2 7 0l2.6-3.6q1 4-1.6 5.6l1 4.4h-1.6l-1-3.4h-6l-1 3.4H8l-.4-4Q2 1 0-4z" fill="#686E74"/><path d="M2-3.4q2 1 4 .2" stroke="${SCK.white}" stroke-width="1" fill="none"/></g>`;
      return SCH.bg('#C9D9E0') + `<path d="M0 30h120v16H0z" fill="#D9E3E4"/>` + SCH.sun(34, 44, 9, '#F4E3B6') + `<circle cx="34" cy="44" r="14" fill="none" stroke="#F4E3B6" stroke-width="1.2" opacity=".8"/>`
        + `<path d="M0 44h120v36H0z" fill="#F1EEE6"/><path d="M0 44h120" stroke="#A9B8BE" stroke-width="1.2"/>`
        + `<path d="M8 52q10-2 18 0M40 50q8-1 14 0M66 52q12-2 20 0M98 50q8-1 16 0M6 76q14-3 26 0M60 74q16-3 30 0" stroke="#A9B8BE" stroke-width="1" fill="none"/>`
        + `<path d="M78 66h42l-8-3H84zM42 66h38l-6-3H46zM0 72h48l-4-2H2z" fill="#C3D0D6"/>`
        + SCH.g(`<path d="M97 13V30" stroke-width="1.4" fill="none"/><path d="M97.6 13l9 2.4-9 2.4z" fill="${SCK.burg}" stroke-width="1"/>
          <path d="M80 66 97 28l17 38z" fill="#2E3440"/><path d="M93 66l4-14 4 14z" fill="#1A1E26"/>`, 1.6)
        + `<path d="M97 28 122 62M97 28 76 62" stroke="${K}" stroke-width=".6" opacity=".5"/><path d="M88 46q-3 10-4 20M106 46q3 10 4 20" stroke="#4A5466" stroke-width="1" fill="none"/>`
        + SCH.g(`<path d="M77 64H50q-4 0-5-4" fill="none" stroke-width="2"/><path d="M51 60v4M63 60v4M75 60v4" stroke-width="1.4"/>
          <path d="M48 60l2-8h24l2 8z" fill="${SCK.ochre}"/><path d="M53 52l2-5h14l2 5z" fill="#8A7A5A"/>`, 1.4)
        + `<path d="M56 52l1.6 8M63 52v8M70 52l-1.6 8" stroke="${K}" stroke-width=".9" opacity=".6"/><path d="M45 61 8 60" stroke="${K}" stroke-width=".8"/>`
        + SCH.g(dog(2, 63) + dog(23, 66), .8);
    } },

  /* the discovery of radium: on a dim laboratory bench, a rack of glass tubes glowing a pale blue-green in the dark, a small balance, a gold-leaf electrometer under its bell jar, a crucible on its tripod */
  radio_curie: {
    label: 'Frascos que brilham no escuro, sobre a bancada de um laboratório',
    rx: /\b(radio|polonio|frascos luminosos|radioatividade|radioativo)\b/,
    draw: () => {
      const K = SCK.ink, gl = '#A8EAD6';
      const tube = x => `<path d="M${x - 3.4} 27v24.6a3.4 3.4 0 0 0 6.8 0V27z" fill="${gl}"/>`;
      const X = [45, 55, 65, 75];
      return SCH.bg('#1F2A3E') + `<path d="M6 10h32v24H6z" fill="#26344A" stroke="#33445E" stroke-width="1.4"/><path d="M22 10v24M6 22h32" stroke="#33445E" stroke-width="1.4"/>`
        + `<circle cx="60" cy="42" r="34" fill="${gl}" opacity=".06"/><circle cx="60" cy="42" r="25" fill="${gl}" opacity=".1"/><circle cx="60" cy="42" r="17" fill="${gl}" opacity=".14"/>`
        + SCH.g(`<path d="M0 60h120v20H0z" fill="#4A3220"/><path d="M0 60h120v4H0z" fill="${SCK.wood}"/>`, 1.6)
        + `<path d="M0 72h120" stroke="${K}" stroke-width=".8" opacity=".4"/>`
        + `<g transform="translate(2 12) scale(.8)">` + SCH.g(`<path d="M8 60h28v-3H8zM20 57V30h4v27z" fill="${SCK.goldLo}"/><path d="M6 31h32" stroke-width="1.8" fill="none"/><path d="M8 31v12M36 31v10" stroke-width=".9" fill="none"/>
          <path d="M3 43h10l-2 3H5zM31 41h10l-2 3h-6z" fill="${SCK.gold}" stroke-width="1.2"/><path d="M22 27l-2 3h4z" fill="${SCK.gold}" stroke-width="1"/>`, 1.6) + `</g>`
        + SCH.g(`<path d="M38 57h44v3H38zM38 40h44v3.4H38z" fill="${SCK.wood}"/><path d="M40 43.4v13.6M80 43.4v13.6" stroke-width="1.6"/>`, 1.2)
        + SCH.g(X.map(tube).join(''), 1.4)
        + `<path d="${X.map(x => `M${x - 1.6} 29v20`).join('')}" stroke="${SCK.white}" stroke-width="1" opacity=".9"/>`
        + `<path d="${X.map(x => `M${x - 4} 27h8`).join('')}" stroke="${SCK.stone}" stroke-width="2.6"/><path d="${X.map(x => `M${x - 4} 27h8`).join('')}" stroke="${K}" stroke-width=".8" opacity=".6"/>`
        + `<g transform="translate(17.8 9) scale(.85)">` + SCH.g(`<path d="M84 60V40q0-9 8-9t8 9v20z" fill="#3C4C64"/><path d="M92 31v-6" stroke-width="1.6" fill="none"/><circle cx="92" cy="23.4" r="2.6" fill="${SCK.gold}" stroke-width="1.2"/>
          <path d="M82 60h20v-3H82z" fill="${SCK.goldLo}"/>`, 1.6)
        + `<path d="M92 31v13" stroke="${SCK.goldLo}" stroke-width="1.4"/><path d="M92 44l-4 7M92 44l4 7" stroke="${SCK.goldHi}" stroke-width="1.8" stroke-linecap="round"/><path d="M87 38q0-4 3-5" stroke="${SCK.white}" stroke-width="1" fill="none" opacity=".6"/></g>`
        + SCH.g(`<path d="M108 60l4-10 4 10M106 50h12" fill="none" stroke-width="1.4"/><path d="M108 50l1-6h6l1 6z" fill="${SCK.white}" stroke-width="1.2"/>`, 1)
        + `<path d="M110 42q1-3 0-5M113 42q-1-3 0-6" stroke="${SCK.stone}" stroke-width=".9" fill="none" opacity=".6"/>`;
    } },
  /* a New Deal dam rising across a forested valley: concrete blocks poured to uneven heights, wooden forms, derricks, a cableway between two towers, tiny workers in hard hats, the river let through below */
  new_deal_represa: {
    label: 'Operários constroem uma grande represa de concreto num cânion',
    rx: /\b(represa|barragem|new deal|usina hidreletrica)\b/,
    draw: () => {
      const K = SCK.ink, T = [27, 25, 28, 24, 26, 22, 27, 25, 21, 26, 23, 28, 24, 22, 27, 25, 26];
      let blk = 'M8 76', j = '', lift = '';
      T.forEach((t, i) => { blk += `V${t}h6`; if (i) j += `M${8 + i * 6} ${Math.max(t, T[i - 1])}V72`; });
      for (let y = 32; y < 72; y += 5) lift += `M8 ${y}h102`;
      const W = [[37, 25], [41, 25], [56, 24], [74, 21], [88, 24]];
      const tree = [[3, 16], [8, 21], [4, 27], [12, 28], [6, 34], [14, 38], [3, 42], [20, 44], [10, 48], [24, 54], [4, 55], [16, 58], [28, 62], [8, 64], [20, 68], [32, 71], [2, 72], [14, 75],
        [116, 14], [110, 18], [117, 24], [108, 27], [112, 32], [102, 37], [117, 40], [107, 43], [97, 48], [112, 50], [100, 54], [118, 58], [90, 61], [106, 62], [96, 66], [114, 68], [86, 72], [102, 74]];
      return SCH.bg(SCK.sky) + `<path d="M0 22q20-10 40-6t40-4 40 4v14H0z" fill="#9DB08A"/>`
        + SCH.g(`<path d="${blk}V76z" fill="#D6CFBD"/>`, 1.6)
        + `<path d="${j}" stroke="${K}" stroke-width=".9" opacity=".45"/><path d="${lift}" stroke="${K}" stroke-width=".6" opacity=".25"/>`
        + SCH.g(`<path d="M44 25h6v-3h-6zM62 28h6v-3h-6zM80 30h6v-3h-6z" fill="${SCK.wood}" stroke-width="1"/>
          <path d="M48 72v-7h5v7zM57.4 72v-7h5.2v7zM67 72v-7h5v7z" fill="#3A3330" stroke-width="1.2"/>`, 1)
        + `<path d="M0 72h120v8H0z" fill="${SCK.sea}"/><path d="M48 73q2.6 4 5 0M57.4 73q2.6 4 5.2 0M67 73q2.6 4 5 0M40 78q20 3 40 0" stroke="${SCK.white}" stroke-width="1.6" fill="none"/>`
        + SCH.g(`<path d="M0 8q8 0 12 6l30 62H0zM120 6q-6 0-10 4L78 76h42z" fill="${SCK.green}"/>`, 1.6)
        + `<path d="${tree.map(([x, y]) => `M${x} ${y}h0`).join('')}" stroke="${SCK.olive}" stroke-width="6" stroke-linecap="round"/>`
        + `<path d="M5 12 8 1l3 11M109 10l3-10 3 10M6 7h4M110 5h4" fill="none" stroke="${K}" stroke-width="1.4"/><path d="M8 2q52 10 104 -1" fill="none" stroke="${K}" stroke-width=".9"/>`
        + `<path d="M62 7v6" stroke="${K}" stroke-width=".8"/>` + SCH.g(`<path d="M58.4 13h7.2l-1.4 4.6h-4.4z" fill="${SCK.goldLo}"/>`, 1)
        + `<path d="M34 25V10l13 9M34 11l-6 14M90 24V9l-12 9M90 10l6 14" fill="none" stroke="${K}" stroke-width="1.2"/><path d="M47 19v3M78 18v3" stroke="${K}" stroke-width=".7"/>`
        + `<path d="${W.map(([x, y]) => `M${x} ${y}v-3`).join('')}" stroke="#2E3A4A" stroke-width="1.8"/><path d="${W.map(([x, y]) => `M${x} ${y - 4}h0`).join('')}" stroke="${SCK.white}" stroke-width="2.2" stroke-linecap="round"/>`;
    } },

  /* the suffragettes marching down a London street in white and dark Edwardian dress, wide plumed hats and sashes, under a striped purple, white and green banner; a gas lamp */
  sufragistas: {
    label: 'Mulheres em marcha com faixas e chapéus, numa rua de Londres',
    rx: /\b(sufragistas|sufragista|sufragetes|sufragete|faixas|marcha)\b/,
    draw: () => {
      const K = SCK.ink, F = SCH.uid('sf'), V = '#5E2B5C';
      const wom = (x, y, c) => `<use href="#${F}" x="${x}" y="${y}" fill="${c}"/>`;
      return SCH.bg('#C7BFAE') + `<path d="M0 6h120v58H0z" fill="#A65E44"/><path d="M0 12h120M0 24h120M0 36h120M0 48h120M0 60h120" stroke="#8C4A34" stroke-width="1"/>`
        + `<path d="M6 30h14v24H6zM34 30h14v24H34zM62 30h14v24H62zM90 30h14v24H90z" fill="#3A3330" stroke="${SCK.white}" stroke-width="2"/><path d="M13 30v24M41 30v24M69 30v24M97 30v24M6 42h14M34 42h14M62 42h14M90 42h14" stroke="${SCK.white}" stroke-width="1"/>`
        + `<path d="M0 64h120v16H0z" fill="#B5AB93"/><path d="M0 64h120" stroke="${K}" stroke-width="1.2"/><path d="M0 70h120" stroke="${K}" stroke-width=".7" opacity=".3"/>`
        + SCH.g(`<path d="M113 66V20" stroke-width="2.6" fill="none"/><path d="M109 20h8l-1-7h-6z" fill="${SCK.goldHi}" stroke-width="1.2"/><path d="M108.4 13h9.2l-4.6-3.4z" fill="#3A3330" stroke-width="1.2"/>`, 1.2)
        + `<defs><g id="${F}" stroke="${K}" stroke-width="1" stroke-linejoin="round"><path d="M-6.4 0-3.6-16h7.2L6.8 0z"/><path d="M-3.6-16-3.2-26q3.2-2 6.4 0l.4 10z"/>
          <path d="M2.8-25.6-3.4-16.6" stroke="${SCK.white}" stroke-width="2.8"/><path d="M2.8-25.6-3.4-16.6" stroke="${V}" stroke-width=".8" stroke-dasharray="3 1 3 1"/>
          <circle cx=".4" cy="-29" r="2.6" fill="#E3B48C"/><path d="M-6.6-31q7-2.6 13.4 0l-1.6-1.6q-5-1.4-10 0zM-3-32.4q0-3.6 3-3.6t3 3.6z" fill="#2E2A28"/><path d="M-3.4-35.4q-4-1-5 2" fill="none" stroke="${SCK.white}" stroke-width="1.6"/></g></defs>`
        + `<path d="M22 54V8M96 54V8" stroke="${K}" stroke-width="2.4"/><path d="M22 54V8M96 54V8" stroke="${SCK.wood}" stroke-width="1"/>`
        + SCH.g(`<path d="M22 10h74v24H22z" fill="${SCK.white}"/>`, 1.6)
        + `<path d="M23 13.4h72M23 30.6h72" stroke="${V}" stroke-width="5.6"/><path d="M23 18h72M23 26h72" stroke="${SCK.green}" stroke-width="2.6"/><path d="M22 10h74v24H22z" fill="none" stroke="${K}" stroke-width="1.6"/>`
        + `<path d="M24 34h70" stroke="${SCK.goldHi}" stroke-width="2.2" stroke-dasharray="1 1.4"/>`
        + wom(22, 76, SCK.white) + wom(42, 74, '#3A3A4A') + wom(60, 76, SCK.white) + wom(78, 74, SCK.stone) + wom(96, 76, '#3A3A4A')
        + `<path d="M20 50h4M94 50h4" stroke="#E3B48C" stroke-width="2.4" stroke-linecap="round"/>`;
    } },

  /* October 1917, a snowy night: the long green-and-white Baroque front of the palace with its lit windows and its roofline of statues, a few armed men in greatcoats on the quay before it, and on the river the three-funnelled cruiser, its searchlight raking the sky */
  ev_revolucao_russa: {
    label: 'O cruzador atracado no rio, diante da longa fachada de um palácio, na noite de neve',
    rx: /\b(revolucao russa|revolucao de outubro|palacio de inverno|aurora|cruzador)\b/,
    ev: 'revolucao_russa',
    draw: () => {
      const K = SCK.ink;
      let sn = '';
      for (let i = 0; i < 30; i++) sn += `M${(i * 37 % 117 + 1.5)} ${(i * 23 % 76 + 2)}h0`;
      const man = x => `M${x - 2.2} 44l.6-5.6q.2-1.6 1.6-1.8 1.4.2 1.6 1.8l.6 5.6zM${x - 1.1} 37.2a1.2 1.2 0 1 0 2.2 0 1.2 1.2 0 1 0-2.2 0z`;
      const M = [101, 106, 111, 116];
      return SCH.bg('#1E2842')
        + SCH.g(`<path d="M0 44V16h44v-4h32v4h44v28z" fill="#4F8270"/>`, 1.4)
        + `<path d="M0 14.6h44M76 14.6h44M44 10.6h32" stroke="#D8DCD4" stroke-width="2.6" stroke-dasharray="1.2 4.8"/>`
        + `<path d="M0 17h44M76 17h44M44 13h32M0 29h120" stroke="${SCK.white}" stroke-width="1.4"/>`
        + `<path d="M5.5 16v28M8.5 16v28M17.5 16v28M20.5 16v28M29.5 16v28M32.5 16v28M45 12v32M48 12v32M72 12v32M75 12v32M87.5 16v28M90.5 16v28M99.5 16v28M102.5 16v28M111.5 16v28M114.5 16v28" stroke="${SCK.white}" stroke-width="1.3"/>`
        + `<path d="M-1 22.6h120" stroke="${SCK.goldHi}" stroke-width="5" stroke-dasharray="3.4 8.6"/><path d="M-1 36.4h120" stroke="${SCK.goldHi}" stroke-width="6.4" stroke-dasharray="3.4 8.6"/>`
        + `<path d="M0 44h120v3H0z" fill="#5E5A56" stroke="${K}" stroke-width="1"/>`
        + `<path d="M0 47h120v33H0z" fill="#172033"/><path d="M-1 51h120M5 55h120" stroke="${SCK.goldHi}" stroke-width="1" stroke-dasharray="2.4 9.6" opacity=".45"/>`
        + `<path d="M83 45 101 0h19z" fill="#E8F0F2" opacity=".14"/>`
        + `<path d="${M.map(x => `M${x + 2.4} 43.4l.8-12.4`).join('')}" stroke="${K}" stroke-width="1.6"/><path d="${M.map(x => `M${x + 3.2} 31l.3-3.4`).join('')}" stroke="#E4E6EA" stroke-width="1"/>`
        + `<path d="${M.map(man).join('')}" fill="#15110E"/><path d="${M.map(x => `M${x - 1.6} 36.2h3.4`).join('')}" stroke="#15110E" stroke-width="1.2"/>`
        + `<g transform="translate(0 5)"><path d="M24 50V15M70 49V11M18 18h12M64 15h12" stroke="${K}" stroke-width="1.4"/><path d="M67.4 22h5.2" stroke="${K}" stroke-width="3"/>`
        + SCH.g(`<path d="M35 50l1-25h5l-1 25zM47 50l1-25h5l-1 25zM59 50l1-25h5l-1 25z" fill="#5A5650"/>
          <path d="M20 54v-5h56v5zM74 49v-6h9v6z" fill="#7A7A72" stroke-width="1.2"/>
          <path d="M5 54.6 92 53q1 6 6 11H12q-5-3-7-9.4z" fill="#33363E"/>`, 1.6)
        + `<path d="M36 26.6h5M48 26.6h5M60 26.6h5" stroke="${K}" stroke-width="2.4"/><path d="M6 56.6h86" stroke="#7A7A72" stroke-width="1.6"/><path d="M14 59.6h76" stroke="${SCK.goldHi}" stroke-width="1.3" stroke-dasharray="1.2 3.2"/>`
        + `<path d="M84 52h8M10 53h-6" stroke="${K}" stroke-width="1.6"/><circle cx="81" cy="41.4" r="2" fill="${SCK.goldHi}" stroke="${K}" stroke-width="1"/></g>`
        + SCH.waves(75, '#3A4A66', 1.2) + `<path d="M0 69.4h120" stroke="#2C3A56" stroke-width="1"/>`
        + `<path d="${sn}" stroke="${SCK.white}" stroke-width="1.4" stroke-linecap="round" opacity=".85"/>`;
    } },

  /* Bohr's atom: a nucleus of red and blue spheres, three circular orbits with their electrons, one electron leaping down an orbit and giving off a wavy photon */
  atomo_bohr: {
    label: 'Um núcleo cercado por órbitas circulares com elétrons',
    rx: /\b(atomo|atomos|orbita|orbitas|eletron|eletrons|modelo atomico)\b/,
    draw: () => {
      const K = SCK.ink;
      const e = (a, r) => { const x = 60 + r * Math.cos(a), y = 40 + r * Math.sin(a); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.3"/>`; };
      const N = [[0, 0, 1], [-4, -2, 0], [4, -2.4, 1], [-2, 3.6, 1], [3, 3.4, 0], [-5.4, 2, 1], [5.6, 1.6, 0], [0, -5, 0], [.6, 6, 0], [-.6, .6, 0]];
      return SCH.bg('#22304A') + `<path d="M8 8h0M112 10h0M20 70h0M104 72h0M6 44h0M114 40h0" stroke="${SCK.sky}" stroke-width="1.4" stroke-linecap="round" opacity=".6"/>`
        + `<circle cx="60" cy="40" r="12.4" fill="${SCK.goldHi}" opacity=".14"/>`
        + `<g fill="none" stroke="${SCK.sky}" stroke-width="1.8"><circle cx="60" cy="40" r="14"/><circle cx="60" cy="40" r="24"/><circle cx="60" cy="40" r="35"/></g>`
        + `<g stroke="${K}" stroke-width="1.2">${N.map(([x, y, r]) => `<circle cx="${(60 + x * 1.2).toFixed(1)}" cy="${(40 + y * 1.2).toFixed(1)}" r="4.3" fill="${r ? '#B5332E' : SCK.sea}"/>`).join('')}</g>`
        + `<path d="${N.map(([x, y]) => `M${(58.8 + x * 1.2).toFixed(1)} ${(38.4 + y * 1.2).toFixed(1)}h0`).join('')}" stroke="${SCK.white}" stroke-width="1.4" stroke-linecap="round" opacity=".6"/>`
        + `<g fill="${SCK.goldHi}" stroke="${K}" stroke-width="1.2">${e(2.4, 14) + e(-.8, 14) + e(-2.2, 24) + e(.7, 24) + e(1.9, 35) + e(3.4, 35)}</g>`
        + `<path d="M89 21.6q-2 3-5.8 4.6" fill="none" stroke="${SCK.goldHi}" stroke-width="1.2" stroke-dasharray="1.6 1.4"/><path d="M82 27.6l1.6-3.4 1.6 3z" fill="${SCK.goldHi}"/>`
        + `<circle cx="82.4" cy="27.4" r="3.3" fill="${SCK.goldHi}" stroke="${K}" stroke-width="1.2"/><circle cx="90.4" cy="19.6" r="3.3" fill="none" stroke="${SCK.goldHi}" stroke-width="1" stroke-dasharray="1.4 1.2"/>`
        + `<path d="M86 30q2-3 4 0t4 0 4 0 4 0 4 0" fill="none" stroke="${SCK.goldHi}" stroke-width="1.8" transform="rotate(20 86 30)"/><path d="M107 42l3.6-.6-2.4-3z" fill="${SCK.goldHi}" stroke="${SCK.goldHi}" stroke-width="1" stroke-linejoin="round"/>`;
    } },

  /* the moving assembly line: identical black motor cars on the track under a sawtooth roof, wheels coming down the overhead conveyor, workers in caps at their stations */
  linha_montagem: {
    label: 'Automóveis pretos alinhados numa linha de montagem de fábrica',
    rx: /\b(linha de montagem|automovel|automoveis|modelo t|fabrica de automoveis)\b/,
    draw: () => {
      const K = SCK.ink, C = SCH.uid('lm'), M = SCH.uid('lw');
      const wheel = (x, y) => `<circle cx="${x}" cy="${y}" r="4.8" fill="#3A3330" stroke="${K}" stroke-width="1.4"/><circle cx="${x}" cy="${y}" r="3" fill="none" stroke="${SCK.stone}" stroke-width="2" stroke-dasharray=".5 1.4"/><circle cx="${x}" cy="${y}" r="1" fill="${SCK.stone}"/>`;
      return SCH.bg('#D9D2C0') + `<path d="M0 0h120v16H0z" fill="#8E8A80"/><path d="M0 16 10 4V16zM20 16 30 4V16zM40 16 50 4V16zM60 16 70 4V16zM80 16 90 4V16zM100 16 110 4V16z" fill="${SCK.sky}" stroke="${K}" stroke-width="1"/><path d="M0 16h120" stroke="${K}" stroke-width="1.6"/>`
        + `<path d="M0 22h120" stroke="${K}" stroke-width="2"/><path d="M10 22v6M34 22v6M58 22v6M82 22v6M106 22v6" stroke="${K}" stroke-width="1"/>`
        + `<path d="M10 28.6h0M34 28.6h0M58 28.6h0M82 28.6h0M106 28.6h0" stroke="${K}" stroke-width="8.4" stroke-linecap="round"/><path d="M10 28.6h0M34 28.6h0M58 28.6h0M82 28.6h0M106 28.6h0" stroke="#3A3330" stroke-width="6" stroke-linecap="round"/><path d="M10 28.6h0M34 28.6h0M58 28.6h0M82 28.6h0M106 28.6h0" stroke="${SCK.stone}" stroke-width="2.4" stroke-linecap="round"/>`
        + `<path d="M0 34h120v28H0z" fill="#C9C1AC"/><path d="M0 40h120M0 48h120M0 56h120" stroke="${K}" stroke-width=".6" opacity=".25"/>`
        + `<defs><g id="${C}"><g stroke="${K}" stroke-width="1.4" stroke-linejoin="round"><path d="M1 -6h8v-6.6l3-.6 1-9h14l1 9.6h2q2 0 2 3v4z" fill="#1E1C1A"/>
          <path d="M-1 -4q1-6 7-6t7 5h8q1-5 7-5t7 6z" fill="#1E1C1A"/></g><path d="M15-20h4v6h-4zM21-20h4v6h-4z" fill="${SCK.sky}"/><path d="M1-12h3" stroke="${SCK.goldLo}" stroke-width="2"/></g></defs>`
        + `<path d="M0 66h120v14H0z" fill="#8E8A80"/><path d="M0 64h120" stroke="${K}" stroke-width="3"/><path d="M0 64h120" stroke="${SCK.goldLo}" stroke-width="1.4" stroke-dasharray="3 1.4"/>`
        + [4, 42, 80].map(x => `<use href="#${C}" x="${x}" y="60"/>` + wheel(x + 6, 59) + wheel(x + 25, 59)).join('')
        + `<defs><g id="${M}" stroke="${K}" stroke-width="1" stroke-linejoin="round"><path d="M-3 0v-9q0-3 3-3t3 3v9z" fill="${SCK.sea}"/><circle cy="-14.4" r="2.4" fill="#E3B48C"/><path d="M-2.8-15.6q0-2.6 2.8-2.6t2.8 2.6z" fill="#3A3330"/></g></defs>`
        + `<use href="#${M}" x="39" y="66"/><use href="#${M}" x="77" y="66"/><use href="#${M}" x="115" y="66"/>`;
    } },
});
