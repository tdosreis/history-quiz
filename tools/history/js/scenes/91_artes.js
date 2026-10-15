/* Artes — the scenes of the painters, engravers and builders: their workshops, canvases, walls and stages, from the cave of Lascaux to the silent screen (conventions in _core.js) */
Object.assign(SCENE, {
  /* Leonardo's ornithopter on its trestle in the workshop: two great bat wings of canvas stretched on wooden ribs, the mast with its pulley and ropes, the cradle and the pedal crank, on sketch paper */
  maquina_voadora: {
    label: 'Uma máquina voadora de madeira e lona com asas de morcego',
    rx: /\b(maquina voadora|maquinas voadoras|ornitoptero|asas)\b/,
    draw: () => {
      const K = SCK.ink, W = SCK.wood;
      const beam = (d, w) => `<path d="${d}" stroke="${K}" stroke-width="${w + 1.8}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${W}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
      const half = SCH.g(`<path d="M57 33Q36 7 4 9Q15 19 10 30Q21 29 23 40Q34 37 37 46Q47 41 56 46Z" fill="#F4ECD8"/>`, 1.5)
        + `<path d="M15 17q8 3 13 11M18 29q6 3 9 9M29 35q4 3 6 7M40 38q4 2 6 5" stroke="${SCK.ochre}" stroke-width=".8" fill="none"/>`
        + beam('M31 16 10 30M35 19 23 40M41 24 37 46M48 29 56 46', 1.2) + beam('M57 33Q36 7 4 9', 2.2);
      return SCH.bg('#D2B57E') + `<path d="M4 4h112v62H4z" fill="none" stroke="${K}" stroke-width=".6" opacity=".35"/>`
        + `<circle cx="18" cy="52" r="9" fill="none" stroke="${K}" stroke-width=".6" opacity=".3"/><path d="M9 52h18M18 43v18M92 58l18-6M96 62l14-4" stroke="${K}" stroke-width=".6" opacity=".3"/>`
        + `<path d="M0 68h120v12H0z" fill="#7A4A24"/><path d="M0 73h120M20 68v5M58 73v7M96 68v5" stroke="#4E2E16" stroke-width=".8"/>`
        + beam('M45 54 36 69M75 54l9 15M40 63h40', 2.4)
        + half + `<g transform="matrix(-1 0 0 1 120 0)">${half}</g>`
        + beam('M60 12V54', 2.6) + `<path d="M60 12 31 16M60 12l29 4M60 12 41 24M60 12l19 12" stroke="${K}" stroke-width=".8"/>`
        + SCH.g(`<circle cx="60" cy="12" r="3.4" fill="${SCK.stone}"/><path d="M40 45h40l-5 9H45z" fill="${W}"/>
          <circle cx="60" cy="61" r="5.4" fill="#B8854E"/><path d="M60 55.6v10.8M54.6 61h10.8" stroke-width="1"/><path d="M45 54l9 7M75 54l-9 7" fill="none" stroke-width="1.2"/>`, 1.5)
        + `<circle cx="60" cy="12" r="1" fill="${K}"/><path d="M46 48h28M48 51h24" stroke="#5E3A1E" stroke-width=".8"/>`;
    } },

  /* a papal chapel under its painted vault: coloured panels framed by painted cornices, robed figures floating in the bays, the far wall painted too, and a tall wooden scaffold with pigment pots rising to the ceiling */
  afresco_vaticano: {
    label: 'Um andaime de madeira sob abóbadas cobertas de afrescos, num salão de palácio',
    rx: /\b(capela sistina|abobada|abobadas|andaime|andaimes|afresco|afrescos)\b/,
    draw: () => {
      const K = SCK.ink, fc = SCH.uid('fv');
      const pt = (r, a) => +(60 + r * Math.cos(a * Math.PI / 180)).toFixed(1) + ' ' + +(44 - r * Math.sin(a * Math.PI / 180)).toFixed(1);
      const sec = (r1, r2, a1, a2) => `M${pt(r2, a1)}A${r2} ${r2} 0 0 0 ${pt(r2, a2)}L${pt(r1, a2)}A${r1} ${r1} 0 0 1 ${pt(r1, a1)}Z`;
      const robe = (x, y, c, r) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-5 5.5q-1-6.6 2.4-8.8L0-4.4l2.6 1.1q3.4 2.2 2.4 8.8z" fill="${c}"/><circle cy="-5.5" r="2.4" fill="#E8C3A0"/></g>`;
      const beam = (d, w) => `<path d="${d}" stroke="${K}" stroke-width="${w + 1.6}" fill="none"/><path d="${d}" stroke="${SCK.wood}" stroke-width="${w}" fill="none"/>`;
      const pan = ['', ''];
      let figs = '', med = '';
      [[23.4, 32.6, 4], [35.4, 46.6, 5], [49.4, 80, 4]].forEach(([r1, r2, n], b) => {
        for (let i = 0; i < n; i++) {
          const a1 = 180 * i / n + 2.6, a2 = 180 * (i + 1) / n - 2.6, am = (a1 + a2) / 2, rm = b === 2 ? 56 : (r1 + r2) / 2;
          pan[(i + b) % 2] += sec(r1, r2, a1, a2);
          const [fx, fy] = pt(rm, am).split(' ').map(Number);
          if (b === 1) figs += robe(fx, fy, [SCK.burg, SCK.teal, SCK.goldLo, SCK.sea, SCK.red][i], Math.round(90 - am));
          if (b === 0) med += `<circle cx="${fx}" cy="${fy}" r="2.6"/>`;
        }
      });
      return SCH.bg('#D9C9A4') + `<clipPath id="${fc}"><path d="M0 0h120v80H0z"/></clipPath><g clip-path="url(#${fc})"><path d="${pan[0]}" fill="#E4C9A0"/><path d="${pan[1]}" fill="#9DB6C0"/>` + figs + `<g fill="${SCK.gold}" stroke="${K}" stroke-width=".9">${med}</g>`
        + `<path d="M26 42.1A34 34 0 0 1 94 42.1M12 39.9A48 48 0 0 1 108 39.9" stroke="${K}" stroke-width="3.4" fill="none"/><path d="M26 42.1A34 34 0 0 1 94 42.1M12 39.9A48 48 0 0 1 108 39.9" stroke="${SCK.stone}" stroke-width="1.8" fill="none"/></g>`
        + SCH.g(`<path d="M38 60V44A22 22 0 0 1 82 44V60z" fill="#6F8FA8"/><path d="M0 38 38 44V60L0 70zM120 38 82 44V60l38 10z" fill="#CDBF9F"/>
          <path d="M0 70 38 60h44l38 10v10H0z" fill="#D8CCB0"/><path d="M8 50l6 1v10l-6 2zM112 50l-6 1v10l6 2z" fill="#5E5444" stroke-width="1"/>`, 1.4)
        + `<circle cx="60" cy="36" r="5" fill="#E9D9A8" opacity=".8"/><path d="M44 42h8M42 47h12M66 42h8M66 47h12M48 53h24" stroke="${SCK.ochre}" stroke-width="1.6" stroke-dasharray="1.4 1.2"/>`
        + `<path d="M30 63h60M18 67h84M8 74h104M60 60v20M40 60l-16 20M80 60l16 20" stroke="${SCK.stoneLo}" stroke-width=".9"/>`
        + beam('M70 20V77M97 20V77', 2.6) + beam('M70 38h27M70 56h27M70 74h27M70 38l27 18M97 56 70 74', 1.4)
        + SCH.g(`<path d="M63 18h41v3H63z" fill="${SCK.wood}"/><path d="M73 13h6l-1 5h-4z" fill="${SCK.red}"/><path d="M82 14h6l-1 4h-4z" fill="${SCK.sea}"/><path d="M91 13h6l-1 5h-4z" fill="${SCK.gold}"/>`, 1.2)
        + `<path d="M75 13l-2-7M77 13l3-6" stroke="${K}" stroke-width="1.1"/><path d="M62 21v56M66 21v56M62 30h4M62 40h4M62 50h4M62 60h4M62 70h4" stroke="${SCK.wood}" stroke-width="1.2"/>`;
    } },

  /* the great scallop shell sailing in to the shore on a pale green sea marked with little V waves, pink roses tumbling in the wind, the dark wooded coast at the right */
  concha_venus: {
    label: 'Uma grande concha de vieira chegando à praia, entre flores ao vento',
    rx: /\b(concha|conchas|vieira|vieiras|venus)\b/,
    draw: () => {
      const K = SCK.ink, n = 12, P = [];
      for (let i = 0; i <= n; i++) { const t = (200 + 140 * i / n) * Math.PI / 180; P.push([57 + 33 * Math.cos(t), 54 + 26 * Math.sin(t)]); }
      const f = v => v.toFixed(1);
      const wd = ['', ''];
      let rim = `M57 68L${f(P[0][0])} ${f(P[0][1])}`;
      for (let i = 0; i < n; i++) {
        const [a, b] = [P[i], P[i + 1]], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, ox = (mx - 57) * .12, oy = (my - 68) * .12;
        wd[i % 2] += `M57 68L${f(a[0])} ${f(a[1])}Q${f(mx + ox)} ${f(my + oy)} ${f(b[0])} ${f(b[1])}Z`;
        rim += `Q${f(mx + ox)} ${f(my + oy)} ${f(b[0])} ${f(b[1])}`;
      }
      const rose = (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-1 2-5 4.4-4 1zM1 2l4 2.4-1-3.4z" fill="${SCK.green}"/><path d="M-2.8.6q-1-3.4 1.4-3.6 1.4-1.6 2.8 0 2.4.2 1.4 3.6-1.4 1.6-2.8 1.6t-2.8-1.6z" fill="#E3A0A0"/></g>`;
      return SCH.bg('#D6E0CF') + `<ellipse cx="34" cy="12" rx="18" ry="3" fill="${SCK.white}" opacity=".6"/><path d="M0 28q14-2 26 0v4H0z" fill="#9DB08C"/><path d="M0 30h120v50H0z" fill="#8FB29E"/>`
        + `<path d="M4 36l2 1.4 2-1.4M16 44l2 1.4 2-1.4M8 54l2 1.4 2-1.4M24 74l2 1.4 2-1.4M90 70l2 1.4 2-1.4M84 40l2 1.4 2-1.4M96 58l2 1.4 2-1.4M6 66l2 1.4 2-1.4M30 38l2 1.4 2-1.4" stroke="${SCK.white}" stroke-width=".9" fill="none"/>`
        + SCH.g(`<path d="M120 80H104q-2-14 2-26l4-14 10-8z" fill="#B9A06E"/><path d="M107 46V20M114 44V16" stroke="#4A3523" stroke-width="2" fill="none"/>
          <path d="M100 26q-3-8 3-11 3-7 10-4 8-2 7 7v12q-5 4-10 1-6 2-10-5z" fill="#3E5A30"/>`, 1.4)
        + `<path d="M104 18q4-3 9-1M110 26q4-2 8 0" stroke="#6E8C5A" stroke-width="1.4" fill="none"/><circle cx="105" cy="22" r="1.1" fill="${SCK.gold}"/><circle cx="116" cy="20" r="1.1" fill="${SCK.gold}"/><circle cx="111" cy="13" r="1.1" fill="${SCK.gold}"/>`
        + `<path d="M2 20q20-8 42 2M10 28q16-6 30 0" stroke="${SCK.white}" stroke-width="1" fill="none" opacity=".8"/>`
        + `<ellipse cx="57" cy="70" rx="30" ry="4" fill="#6E9684"/>`
        + SCH.g(`<path d="${wd[0]}" fill="#EBCFA6"/><path d="${wd[1]}" fill="#F4ECD8"/>`, .8)
        + SCH.g(`<path d="${rim}Z" fill="none"/><path d="M57 68 45 63l2 7zM57 68l12-5-2 7z" fill="#E1BE8E" stroke-width="1.2"/>`, 1.6)
        + `<path d="M30 70q6-3 12 0t12 0M62 71q6-3 12 0t12 0" stroke="${SCK.white}" stroke-width="1.1" fill="none"/>`
        + SCH.g(rose(12, 12, 20) + rose(26, 5, -30) + rose(22, 24, 60) + rose(40, 15, 10) + rose(8, 34, -50) + rose(53, 7, 40), .7);
    } },
  /* the engraver's bench: the famous print of the armoured rhinoceros pegged up to dry, with its riveted plates, scaly legs and the little horn on its back; below, the copper plate on its leather cushion and the burin */
  gravura_rinoceronte: {
    label: 'Um rinoceronte de couraça desenhado numa gravura, sobre a mesa de um gravador',
    rx: /\b(gravura|gravuras|buril|rinoceronte|rinocerontes)\b/,
    draw: () => {
      const K = SCK.ink, h = SCH.uid('rh');
      return SCH.bg('#4A3828') + `<path d="M0 18h120M0 40h120" stroke="#3A2A1C" stroke-width="1.2"/><path d="M0 5q60 4 120 0" stroke="${SCK.stone}" stroke-width=".9" fill="none"/>`
        + `<pattern id="${h}" width="1.8" height="1.8" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><path d="M0 0v1.8" stroke="${K}" stroke-width=".5"/></pattern>`
        + `<g transform="rotate(-1.5 60 30)">` + SCH.g(`<path d="M17 7h86v49H17z" fill="${SCK.paper}"/>`, 1.4)
        + `<path d="M20.5 10.5h79v42h-79z" fill="none" stroke="${K}" stroke-width=".7"/><path d="M22 48h76" stroke="${K}" stroke-width=".8"/><path d="M24 50h70" stroke="${K}" stroke-width=".5" opacity=".6"/>`
        + SCH.g(`<path d="M52 41h7v6h-7zM74 41h7v6h-7z" fill="#B3A485"/><path d="M38 40h11l1 8H37zM83 38h10l1 10H82z" fill="#E2D6B8"/>
          <path d="M25 40l2-4q-4-6-3-13 4 5 8 10l8-5 2-5 3 4 7-4q14-10 30-6 12 3 13 12 2 6 1 11l-3 3H40q-6 3-12 1z" fill="#E2D6B8"/>`, 1.3)
        + `<path d="M25 40l2-4q-4-6-3-13 4 5 8 10l8-5 2-5 3 4 7-4q14-10 30-6 12 3 13 12 2 6 1 11l-3 3H40q-6 3-12 1z" fill="url(#${h})" opacity=".3"/>`
        + `<path d="M47 24q-5 9-1 19M64 15q-5 13-1 28M80 17q-5 11-1 26" stroke="${K}" stroke-width="1.1" fill="none"/><path d="M49.4 23.6q-4.4 9-.8 19M66.4 15q-4.6 13-.8 28M82.4 17.6q-4.6 11-.8 25" stroke="${K}" stroke-width=".6" fill="none"/>`
        + `<path d="M55 21l-.4-6 3.6 5z" fill="${K}"/><path d="M48 28h0M47 33h0M47 38h0M65 20h0M64 26h0M64 32h0M64 38h0M81 22h0M80 28h0M80 34h0M40 44h0M44 46h0M47 44h0M85 42h0M89 45h0M91 41h0" stroke="${K}" stroke-width="1.3" stroke-linecap="round"/>`
        + `<circle cx="36" cy="34" r="1" fill="${K}"/><path d="M29 38q3 2 7 1M32 41q4 1 8-1M40 30q3 5 1 11" stroke="${K}" stroke-width=".7" fill="none"/></g>`
        + SCH.g(`<path d="M22 4h3v8h-3zM95 4h3v8h-3z" fill="${SCK.wood}"/>`, 1)
        + SCH.g(`<path d="M-2 60h124v22H-2z" fill="${SCK.wood}"/>`, 1.6) + `<path d="M0 66h30M44 64h40M96 70h24" stroke="#5E3A1E" stroke-width=".9"/>`
        + SCH.g(`<ellipse cx="36" cy="72" rx="26" ry="6" fill="#7B3A22"/><path d="M14 64l40-2 2 12-40 2z" fill="#C27A48"/>`, 1.4)
        + `<path d="M18 66l33-1.6M18 69l20-1M30 72l22-1.2" stroke="#E8B488" stroke-width=".8"/><path d="M22 66.6q6-3 10 0t9 0" stroke="#5A2A12" stroke-width=".7" fill="none"/>`
        + SCH.g(`<path d="M66 73l28-7" stroke="#C3C8CE" stroke-width="2.2" fill="none"/><path d="M93 62q8-4 12 2t-8 8z" fill="#9A6A3E"/>`, 1.2)
        + `<path d="M67 72.4l26-6.4" stroke="${SCK.white}" stroke-width=".6"/>`;
    } },

  /* an old copperplate engraving on cream paper: an armoured knight with a lance on his shoulder rides a strong horse down a rocky gorge, his dog running beside, a castle high on its crag behind */
  cavaleiro_gravura: {
    label: 'Uma gravura em preto e branco de um cavaleiro de armadura a cavalo, com um cão, numa garganta rochosa',
    rx: /\b(cavaleiro|cavaleiros|armadura|armaduras|gravura|gravuras)\b/,
    draw: () => {
      const K = SCK.ink, h = SCH.uid('kh'), L = '#E4D8BC', M = '#A89A7C', D = '#6E6250';
      const limb = (d, w) => `<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${d}" stroke="${K}" stroke-width="${w || 5.6}"/><path d="${d}" stroke="${L}" stroke-width="${((w || 5.6) - 2).toFixed(1)}"/></g>`;
      return SCH.bg('#EFE6CF') + `<pattern id="${h}" width="2" height="2" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><path d="M0 0v2" stroke="${K}" stroke-width=".55"/></pattern>`
        + `<path d="M0 6h120M0 9h120M0 12h120M0 15h120" stroke="${K}" stroke-width=".35" opacity=".5"/>`
        + SCH.g(`<path d="M0 30V16l5-3 4 2 5-4 6 6 6 8 4 5z" fill="${M}"/><path d="M5 13V7h3v-2h2v2h2v6M13 11V4h2V2h2v2h2v9" fill="${L}" stroke-width=".8"/>`, 1)
        + SCH.g(`<path d="M86 80V40l6-12 6 2 4-14 8 4 10-8v68z" fill="${D}"/><path d="M0 80V70l10-4 12 4 20-2 40 1 38-3v14z" fill="${M}"/>`, 1.4)
        + `<path d="M86 80V40l6-12 6 2 4-14 8 4 10-8v68z" fill="url(#${h})" opacity=".55"/><path d="M0 80V70l10-4 12 4 20-2 40 1 38-3v14z" fill="url(#${h})" opacity=".35"/>`
        + `<path d="M96 36l8 6M104 24l6 10M92 52l10 4M108 48l8 8" stroke="${K}" stroke-width=".8"/>`
        + `<path d="M46 42 94 -4" stroke="${K}" stroke-width="2.8"/><path d="M46 42 94 -4" stroke="${L}" stroke-width="1.2"/><path d="M90 0l6-6M92 2l7-4" stroke="${K}" stroke-width="1" fill="none"/>`
        + limb('M74 53l1 9-3 8M50 54l-1 8 1 8')
        + SCH.g(`<path d="M83 38q10 6 6 22-3-8-8-13z" fill="${D}"/>
          <path d="M22 32q-3 4-1 7l3 2q6 1 9-4 4 7 7 13 1 5 6 6 14 2 28 0 6 0 8-4 6-8 2-16-6-4-16-2-10 2-18-2-8-10-17-14v-5l-3 4q-4 2-8 15z" fill="${L}"/>`, 1.4)
        + limb('M42 52l-6 7 4 6M80 50l3 11-2 9M62 35l-6 9 1 8') + `<path d="M38 65.5h4M79 70.5h5M70 70.5h5M45 70.5h5" stroke="${K}" stroke-width="2.6"/>`
        + `<path d="M50 57q14 2 28-1" stroke="${K}" stroke-width=".7" fill="none"/><path d="M33 19q8 2 16 13M34 22q7 3 12 10M31 22q7 4 10 11" stroke="${D}" stroke-width="1.6" fill="none"/><circle cx="27" cy="27" r="1.1" fill="${K}"/><path d="M22 34l9-3 2 6M28 24l3 7" stroke="${K}" stroke-width=".8" fill="none"/>`
        + SCH.g(`<path d="M56 36l-1-12q1-5 6-5 5 1 5 6l1 11z" fill="${M}"/><path d="M55 19q0-9 6-9 6 1 6 8l-1 2H56z" fill="${D}"/>
          <path d="M62 11q8-8 16-1-8-2-14 4z" fill="${L}"/><path d="M57 23l-8 8" fill="none" stroke-width="2.4"/>`, 1.3)
        + `<path d="M48 31l-20 6" stroke="${K}" stroke-width=".8"/><path d="M56 17h9" stroke="${L}" stroke-width="1"/>`
        + `<path d="M53 53h7" stroke="${K}" stroke-width="2"/>`
        + limb('M17 64l-7 4M20 65l-5 6M33 64l6 3M31 65l3 6M37 61q5-2 6-7', 3.6)
        + SCH.g(`<path d="M15 62q2-4 8-4h9q6 0 6 4-1 4-6 4H21q-5 0-6-4zM3 62l4-3q3-3 8-2l3 4-4 4-6-1z" fill="${L}"/><path d="M11 58q-1 4 1 7 3-1 3-5z" fill="${D}" stroke-width=".8"/>`, 1.2)
        + `<circle cx="9" cy="60" r=".7" fill="${K}"/><circle cx="3.4" cy="62" r=".8" fill="${K}"/><path d="M22 62q6 2 12 0" stroke="${K}" stroke-width=".6" fill="none"/>`;
    } },
  /* the militia company marching out of the dark under its arch: hats, ruffs and pikes against the shadow, the drummer at the right, the captain in black with his red sash and the lieutenant in pale gold lit at the front */
  ronda_noturna: {
    label: 'Uma companhia de milicianos com lanças, tambor e bandeira, saindo da sombra para a luz',
    rx: /\b(ronda noturna|ronda da noite|milicia|milicias|milicianos|piques)\b/,
    draw: () => {
      const K = SCK.ink;
      /* a militiaman, feet at (x, y): coat c, face f, collar w, hat h */
      const man = (x, y, s, c, f, w, h, extra) => `<g transform="translate(${x} ${y})${s === 1 ? '' : ` scale(${s})`}"><path d="M-5 0v-15l-3-17q0-6 8-6t8 6l-1 17V0h-3l-1-15h-2l-1 15z" fill="${c}"/>${extra || ''}<ellipse cy="-38" rx="6.6" ry="2.4" fill="${w}"/><circle cy="-42" r="3.6" fill="${f}"/><path d="M-8.4-45.4a8.4 1.8 0 0 0 16.8 0h-4q0-6-4.4-6t-4.4 6z" fill="${h}"/></g>`;
      const D = '#4E3C2A', F = '#9A7A5A', W = '#8C7E64', H = '#17110B';
      return SCH.bg('#211810') + SCH.g(`<path d="M24 80V30q0-26 36-26t36 26v50z" fill="#33261A"/>`, 1.2)
        + `<ellipse cx="58" cy="56" rx="46" ry="26" fill="${SCK.goldHi}" opacity=".1"/><ellipse cx="60" cy="58" rx="28" ry="18" fill="${SCK.goldHi}" opacity=".12"/>`
        + `<path d="M26 2 30 48M47 2 44 44M66 2l-2 44M100 4 90 46M114 12l-14 34M8 8l14 40" stroke="${K}" stroke-width="2.6"/><path d="M26 2 30 48M47 2 44 44M66 2l-2 44M100 4 90 46M114 12l-14 34M8 8l14 40" stroke="${SCK.ochre}" stroke-width="1.1"/>`
        + SCH.g(`<path d="M35 6h20l-4 9 5 10H35z" fill="#3E5468"/><path d="M35 6V48" fill="none"/>`
          + man(18, 64, .7, D, F, W, H) + man(38, 62, .7, '#5E4A32', F, W, H) + man(88, 62, .7, '#5A4030', F, W, H)
          + `<path d="M4 50l26-6" stroke-width="2.4"/>` + man(32, 78, .7, '#E9D49A', '#F2DDB8', SCK.white, SCK.ochre)
          + man(106, 78, 1, '#3E2E20', F, W, H, `<path d="M-7-24h14v9H-7z" fill="${SCK.red}"/><ellipse cy="-24" rx="7" ry="2" fill="${SCK.stone}"/>`)
          + man(50, 80, 1.2, H, '#E8C3A0', SCK.white, H, `<path d="M-6-34 8-18l2-3-14-15zM7-32l11 2-1 3-11-1z" fill="${SCK.red}"/>`)
          + man(74, 80, 1.2, SCK.gold, '#F2D2B0', SCK.white, SCK.goldLo, `<path d="M-8-26h16v2.4H-8z" fill="${SCK.white}"/>`), 1.3)
        + `<path d="M98 54l3.4 6 3.6-6 3.6 6 3.4-6" fill="none" stroke="${SCK.white}" stroke-width=".8"/><path d="M4 50l26-6" stroke="${SCK.wood}" stroke-width="1"/>`
        + `<path d="M84 76V18" stroke="${K}" stroke-width="2.8"/><path d="M84 76V18" stroke="${SCK.wood}" stroke-width="1.2"/><path d="M84 12l-2.6 7h5.2z" fill="${SCK.stone}" stroke="${K}" stroke-width="1"/>`
        + `<path d="M76 26q6-8 12-3-6-1-10 5z" fill="${SCK.white}" stroke="${K}" stroke-width=".8"/>`;
    } },

  /* a quiet Dutch room: a leaded window with a little stained-glass roundel letting in the morning light, a map on its rods on the white wall, a rug-covered table with a white jug and one pearl shining in the light */
  janela_delft: {
    label: 'Uma pérola sobre a mesa, junto a uma janela de vitral por onde entra a luz',
    rx: /\b(perola|perolas|brinco|brincos|vitral|vitrais)\b/,
    draw: () => {
      const K = SCK.ink, dw = SCH.uid('dw');
      let lead = '';
      for (let i = -3; i < 8; i++) lead += `M${8 + i * 5} 46l${Math.min(20, 38 - i * 5)} -${Math.min(20, 38 - i * 5) * 2}M${8 + i * 5} 6l${Math.min(20, 38 - i * 5)} ${Math.min(20, 38 - i * 5) * 2}`;
      return SCH.bg('#DDD3BA') + `<path d="M0 66h120v14H0z" fill="#4A3A2C"/><path d="M0 70h40M8 66l-4 14M24 66l-4 14" stroke="#2A1D10" stroke-width=".8" opacity=".6"/>`
        + `<path d="M30 8 92 56H30z" fill="${SCK.white}" opacity=".45"/>`
        + SCH.g(`<path d="M6 4h24v46H6z" fill="#D6E3E2"/>`, 1.6) + `<clipPath id="${dw}"><path d="M6 4h24v46H6z"/></clipPath>`
        + `<path d="${lead}" stroke="#7E8A8C" stroke-width=".6" fill="none" clip-path="url(#${dw})"/>`
        + SCH.g(`<path d="M6 26h24M18 4v46" fill="none" stroke="${SCK.wood}" stroke-width="2.4"/><circle cx="12" cy="15" r="3.6" fill="${SCK.sea}" stroke-width="1"/><path d="M4 50h28v3H4z" fill="${SCK.wood}"/>`, 1.2)
        + `<path d="M12 12v6M9 15h6" stroke="${SCK.gold}" stroke-width="1.4"/><circle cx="12" cy="15" r="1" fill="${SCK.red}"/>`
        + SCH.g(`<path d="M48 9h56v26H48z" fill="#E3CFA0"/><path d="M46 7h60v3H46zM46 34h60v3H46z" fill="#5E3A1E"/>`, 1.2)
        + `<path d="M48 10h18q-4 6 2 10t-2 14H48zM104 10H86q4 5-2 9t4 15h16z" fill="#9DB6C0"/><path d="M66 16q6-2 10 2M74 26q4 2 8-1M56 24q3 4 6 2" stroke="${SCK.wood}" stroke-width=".8" fill="none" opacity=".7"/><path d="M48 18h56M48 26h56M60 10v24M76 10v24M92 10v24" stroke="${K}" stroke-width=".4" opacity=".4"/>`
        + SCH.g(`<path d="M40 52h80v28H44l-4-18z" fill="${SCK.burg}"/>`, 1.6)
        + `<path d="M42 58h78M43 64h77M44 74h76" stroke="${SCK.gold}" stroke-width="1.6" stroke-dasharray="3 2"/><path d="M48 62l4 4 4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4" stroke="#2F4A6A" stroke-width="1.4" fill="none"/><path d="M44 52h76" stroke="${SCK.red}" stroke-width="2"/>`
        + SCH.g(`<path d="M90 52q-6-1-6-8 0-6 4-9l-1-5h12l-1 5q4 3 4 9 0 7-6 8z" fill="${SCK.white}"/><path d="M101 36q6 0 5 6-1 4-6 5" fill="none" stroke-width="1.6"/><path d="M87 30l-3-2" fill="none" stroke-width="1.4"/>`, 1.4)
        + `<path d="M86 42h16M87 46h14" stroke="${SCK.sea}" stroke-width="1.6"/><path d="M89 34v14" stroke="${SCK.white}" stroke-width="1.2" opacity=".7"/>`
        + `<ellipse cx="66" cy="54" rx="5" ry="1.4" fill="#4E0F22"/><circle cx="66" cy="50.6" r="3.4" fill="#F4F1E8" stroke="${K}" stroke-width="1.2"/><circle cx="64.8" cy="49.4" r="1" fill="#FFFFFF"/><path d="M63.4 52q2.6 2 5.4-.6" stroke="#C9C4B8" stroke-width=".8" fill="none"/>`
        + `<path d="M58 46l-3-3M74 46l3-3M66 44v-4" stroke="${SCK.goldHi}" stroke-width="1" stroke-linecap="round"/>`
        + SCH.g(`<path d="M11 58h3v22h-3zM31 58h3v22h-3z" fill="${SCK.wood}"/><path d="M14 60h17v14H14z" fill="#2F4A6A"/><circle cx="12.5" cy="56" r="2.6" fill="${SCK.gold}"/><circle cx="32.5" cy="56" r="2.6" fill="${SCK.gold}"/>`, 1.3)
        + `<path d="M16 62h13M16 72h13" stroke="${SCK.goldHi}" stroke-width="1.2" stroke-dasharray=".1 2.4" stroke-linecap="round"/>`;
    } },
  /* a palace room in shadow: a huge canvas on its stretcher seen from behind at the left, a palette and brushes on a stool, dark paintings hung high on the walls, a small mirror, and an open door at the back full of light */
  atelie_meninas: {
    label: 'Uma tela enorme virada de costas, num salão de palácio com quadros nas paredes',
    rx: /\b(cavalete|cavaletes|tela|telas|paleta|paletas)\b/,
    draw: () => {
      const K = SCK.ink;
      return SCH.bg('#2E261C') + `<path d="M30 0h90v62H30z" fill="#4A3E2E"/><path d="M108 0h12v72l-12-10z" fill="#5E503C"/>`
        + SCH.g(`<path d="M44 5h28v20H44zM80 5h24v20H80z" fill="${SCK.goldLo}"/><path d="M38 32h12v14H38z" fill="${SCK.goldLo}"/><path d="M110 10l7 2v14l-7-2z" fill="${SCK.goldLo}"/>`, 1.2)
        + `<path d="M46.5 7.5h23v15h-23zM82.5 7.5h19v15h-19zM40 34h8v10h-8zM111.4 12.8l4.2 1.2v9.6l-4.2-1.2z" fill="#2A2018"/><path d="M49 20q5-9 9-3t9-4M85 20l5-8 4 5 5-4M42 42q2-5 4 0" stroke="#7A6446" stroke-width="1" fill="none"/>`
        + SCH.g(`<path d="M60 34h10v13H60z" fill="#17110B"/><path d="M84 30h12v32H84z" fill="${SCK.goldHi}"/><path d="M84 30l-5 2v32l5-2z" fill="${SCK.wood}"/>`, 1.3)
        + `<path d="M62 36h6v9h-6z" fill="#6E6A5E"/><path d="M84 54h12M84 58h12M88 30v20" stroke="${SCK.goldLo}" stroke-width="1"/>`
        + `<path d="M0 62h120v18H0z" fill="#5A4632"/><path d="M84 62h12l20 18H74z" fill="${SCK.goldHi}" opacity=".22"/><path d="M0 68h120M0 75h120" stroke="#3E3024" stroke-width=".8"/>`
        + SCH.g(`<path d="M50 62l-3 14M66 62l3 14" fill="none" stroke="${SCK.wood}" stroke-width="2.4"/><path d="M45 60h26v3H45z" fill="${SCK.wood}"/>
          <path d="M44 57q-2-6 6-7 9-1 16 1 5 2 2 5-4 0-2 3-4 3-14 2-7-1-8-4z" fill="#B8854E"/><path d="M60 46l12 10M64 45l9 12" fill="none" stroke-width="1.2"/>`, 1.3)
        + `<circle cx="64" cy="54.4" r="1.6" fill="#2E261C"/><circle cx="49" cy="54" r="1.8" fill="${SCK.white}"/><circle cx="54" cy="52" r="1.8" fill="${SCK.red}"/><circle cx="59" cy="52" r="1.6" fill="${SCK.gold}"/><circle cx="53" cy="57" r="1.6" fill="${K}"/><circle cx="58" cy="57" r="1.5" fill="#C98F6E"/>`
        + `<path d="M60 46l-1-1M64 45l-1-1.4" stroke="${SCK.red}" stroke-width="1.6" stroke-linecap="round"/><path d="M40 74 44 8" stroke="${K}" stroke-width="3.4"/><path d="M40 74 44 8" stroke="${SCK.wood}" stroke-width="1.8"/>`
        + `<path d="M8 78l6-14M30 76l-4-12M20 2v76" stroke="${K}" stroke-width="3.6"/><path d="M8 78l6-14M30 76l-4-12M20 2v76" stroke="${SCK.wood}" stroke-width="2"/>`
        + SCH.g(`<path d="M2 6l36 5v52L2 68z" fill="#BFA77A"/><path d="M2 68l36-5v2.4L2 71z" fill="${SCK.wood}"/>`, 1.6)
        + `<path d="M5 9.6l30 4.2v46.4L5 64.4zM5 37h30" stroke="${K}" stroke-width="3" fill="none" stroke-linejoin="round"/><path d="M5 9.6l30 4.2v46.4L5 64.4zM5 37h30" stroke="#9A6A3E" stroke-width="1.6" fill="none" stroke-linejoin="round"/>`
        + `<path d="M8 17h24M8 21h24M8 25h24M8 29h24M8 45h24M8 49h24M8 53h24M8 57h24" stroke="#A88F64" stroke-width=".5"/><path d="M38 11l2 1v51l-2 0z" fill="${SCK.red}" stroke="${K}" stroke-width=".8"/><path d="M39 20v6M39 40v8" stroke="${SCK.gold}" stroke-width="1.4"/>`;
    } },

  /* a night outside the city: a big square lantern on the ground throwing its light over the bare hillside, and the firing party seen from behind, a row of shakos, greatcoats, crossbelts and levelled muskets */
  goya_fuzilamentos: {
    label: 'Um grande lampião no chão ilumina uma colina de noite, com uma fila de soldados de costas',
    rx: /\b(fuzilamento|fuzilamentos|pelotao|pelotoes|lampiao|lampioes)\b/,
    draw: () => {
      const K = SCK.ink;
      const X = [72, 84, 96, 108, 120], all = f => X.map(f).join('');
      const sol = x => `<g transform="translate(${x} 74)"><path d="M-2-18l-10 18h4.4l8-13 4 13h4.6l-3-18z" fill="#2E2A24"/><path d="M-9-35q6-3 13-1l3 3 3 19-4 2H-4l-5-2z" fill="#4A4438"/><path d="M-1-33h8v10h-8z" fill="#6E4A2E"/><circle cx="-8" cy="-37" r="3" fill="#7A6450"/><path d="M-12-46l8-1 1 8-9 1z" fill="#17110B"/></g>`;
      return SCH.bg('#161D2B') + `<path d="M20 30V18h4v-4h3v4h6v-6l3-4 3 4v6h8v-4a5 5 0 0 1 10 0v4h6v12z" fill="#2C364A"/><path d="M70 30v-8h8v-4h6v4h10v8z" fill="#252E40"/>`
        + `<path d="M0 26q24-4 40 10 10 10 14 24L50 80H0z" fill="#3A2E22"/><path d="M0 44q20-6 34 4l16 16-6 16H0z" fill="${SCK.ochre}"/><path d="M0 44q20-6 34 4l16 16" stroke="${SCK.goldHi}" stroke-width="1" fill="none" opacity=".6"/>`
        + `<path d="M0 72h120v8H0z" fill="#241C14"/><circle cx="51" cy="64" r="22" fill="${SCK.goldHi}" opacity=".12"/><circle cx="51" cy="64" r="12" fill="${SCK.goldHi}" opacity=".18"/>`
        + `<path d="M6 54q8-2 14 2M10 64q10-2 18 2M24 58q6 0 10 3" stroke="#8A6A3E" stroke-width="1" fill="none"/>`
        + SCH.g(`<path d="M44 58h14v14H44z" fill="${SCK.goldHi}"/><path d="M42 58l4-5h10l4 5z" fill="#2E2A24"/><path d="M51 58v14M44 65h14" fill="none" stroke-width="1.2"/><path d="M48 53q3-6 6 0" fill="none" stroke-width="1.2"/>`, 1.5)
        + SCH.g(all(sol), 1.1) + `<path d="${all(x => `M${x - 7} 40l11 16M${x + 4} 40l-10 16`)}" stroke="#A9A496" stroke-width=".8"/><path d="${all(x => `M${x + 3} 58l8 12`)}" stroke="${SCK.stone}" stroke-width="1.4"/>`
        + `<path d="${all(x => `M${x + 3} 42 ${x - 34} 40`)}" stroke="${K}" stroke-width="2.4"/><path d="${all(x => `M${x + 3} 42 ${x - 28} 40.4`)}" stroke="${SCK.wood}" stroke-width="1"/>`
        + `<path d="M63 40q-1 10 0 19M75 40q-1 10 0 19M87 40q-1 10 0 19M99 40q-1 10 0 19" stroke="${SCK.goldHi}" stroke-width=".9" fill="none" opacity=".55"/>`;
    } },
  /* a harbour at dawn in blue-grey mist: the faint masts, cranes and chimneys, the small orange sun and its broken reflection on the water, a rowing boat dark in the foreground and two more fading behind */
  impressao_sol: {
    label: 'Um porto na névoa azul, com um sol laranja e um barco a remo',
    rx: /\b(impressao|nascer do sol|porto|portos)\b/,
    draw: () => {
      const M = '#6E8494', S = '#E2632B';
      return SCH.bg('#93A5AE') + `<ellipse cx="74" cy="22" rx="30" ry="14" fill="#C2A592" opacity=".45"/><path d="M0 8q30-4 60 0t60-2M0 16q40-4 80 1" stroke="#A9B4B4" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".7"/>`
        + `<path d="M10 40V12M18 40V16M24 40V20M90 40V10M98 40V14M108 40V18M40 40V26l10-6M44 26l-8 10" stroke="${M}" stroke-width="1.3" fill="none"/>`
        + `<path d="M8 15h12M86 13h14M94 18h12M8 22h10" stroke="${M}" stroke-width=".9"/><path d="M58 40V28h3v12zM114 40V30h3v10z" fill="${M}"/><path d="M59 27q-2-6 3-9t2-8M115 29q-3-5 2-8" stroke="#A9B4B4" stroke-width="2" fill="none" stroke-linecap="round"/>`
        + `<path d="M4 40h36l-3 3H7zM82 40h34l-3 3H86z" fill="${M}"/><path d="M0 42h120v38H0z" fill="#7F96A3"/>`
        + `<path d="M4 47h14M28 46h18M90 47h16M8 54h10M98 55h18M14 63h20M84 64h16M2 72h14M100 72h16M40 76h18M76 70h10" stroke="#A3B6BF" stroke-width="2" stroke-linecap="round"/><path d="M20 50h12M50 52h8M90 52h8M24 68h12M80 77h14M104 60h10" stroke="#5F7888" stroke-width="2" stroke-linecap="round"/>`
        + `<circle cx="74" cy="22" r="6" fill="${S}"/><path d="M70 45h9M68 49h12M72 53h7M67 57h11M71 61h8M69 66h9M72 71h5" stroke="${S}" stroke-width="2.2" stroke-linecap="round"/>`
        + `<path d="M84 47q5 2 10 0l-1 1.6h-8zM96 51q6 2 12 0l-1 2h-10z" fill="#4E5E6A"/><path d="M88 47v-4M101 51v-5" stroke="#4E5E6A" stroke-width="1.2"/>`
        + `<path d="M22 64q14 5 30 0l-3 3.6H26z" fill="#232A33"/><path d="M44 63v-9l-1.6-2.4a2 2 0 1 1 3.4 0L45 54v9zM32 64v-4.6a2 2 0 1 1 4 0V64z" fill="#232A33"/><path d="M45 56l-12 14M30 61l-10 6" stroke="#232A33" stroke-width="1.4" stroke-linecap="round"/>`
        + `<path d="M22 69q14 2 28-1" stroke="#4E5E6A" stroke-width="1.6" stroke-linecap="round"/>`;
    } },

  /* a night sky rolling in great swirls over a sleeping village, haloed stars, a crescent moon, hills, the church spire, and a tall dark cypress flaming up in front */
  noite_estrelada: {
    label: 'Um céu noturno em redemoinhos sobre uma aldeia, com um cipreste escuro',
    rx: /\b(noite estrelada|cipreste|ciprestes|estrelas)\b/,
    draw: () => {
      const K = SCK.ink, G = SCK.goldHi;
      const star = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r + 3}" fill="#6F8FB8" opacity=".55"/><circle cx="${x}" cy="${y}" r="${r + 1.4}" fill="none" stroke="#E9DFA0" stroke-width="1"/><circle cx="${x}" cy="${y}" r="${r}" fill="${G}"/>`;
      return SCH.bg('#25385F') + `<path d="M0 36q20-10 40-4t44-6 36 0" stroke="#3E5A88" stroke-width="7" fill="none"/>`
        + `<path d="M22 26q10-12 26-8 10 3 16 0 10-6 18-2 8 5 4 11-6 5-12 1-2-5 3-6" stroke="#7FA0C8" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M24 24q10-10 24-6 10 3 16 0 10-6 17-2 7 4 4 10-5 4-10 1" stroke="#C9D6DE" stroke-width="1.2" fill="none" stroke-linecap="round"/>`
        + `<path d="M4 44q16-8 30-2t30-2 32 0 24-4M8 12q10-4 18 0M60 8q10-4 20 0" stroke="#5E82B0" stroke-width="1.6" fill="none" stroke-linecap="round"/>`
        + star(60, 10, 2.4) + star(92, 30, 2.6) + star(30, 40, 2) + star(48, 34, 1.8) + star(78, 44, 1.6) + star(110, 44, 1.8)
        + `<circle cx="104" cy="13" r="10" fill="${SCK.gold}" opacity=".35"/><circle cx="104" cy="13" r="7" fill="none" stroke="#E9DFA0" stroke-width="1"/><path d="M101 7a6 6 0 1 0 8 8 6.6 6.6 0 0 1-8-8z" fill="${G}" stroke="${K}" stroke-width="1"/>`
        + SCH.g(`<path d="M0 56q20-8 40-4t40-4 40 2v30H0z" fill="#22344F"/><path d="M0 64q30-4 60 0t60-2v18H0z" fill="#2E4A3E"/>`, 1.4)
        + SCH.g(`<path d="M44 66v-6l4-3 4 3v6zM54 66v-5l5-4 5 4v5zM78 66v-6l4-3 4 3v6zM90 66v-5l5-4 5 4v5zM100 68v-5l4-3 4 3v5z" fill="#4A5D73"/><path d="M66 68V54l2-12 2 12v14zM64 68v-8h8v8z" fill="#5E6E80"/>`, 1)
        + `<path d="M46 63h1M56 63h1M60 63h1M80 63h1M93 63h1M97 63h1M103 65h1" stroke="${G}" stroke-width="1.6" stroke-linecap="square"/>`
        + SCH.g(`<path d="M10 80q-6-18 0-34 2-14 6-24 2-10 6-20 1 10 3 18 4 12 2 24 6 18 1 36z" fill="#1E2A1A"/>`, 1.4)
        + `<path d="M14 72q-2-12 2-24M18 66q0-14 2-28M21 54q0-14 1-36M24 70q2-12 0-22" stroke="#4E6B3C" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
    } },

  /* a soft pocket watch melting over the branch of a dead tree on a dark block, another sliding over the edge, a bare plain running to golden cliffs and a calm sea under a pale sky */
  relogios_derretidos: {
    label: 'Relógios moles derretendo sobre um galho seco numa paisagem deserta',
    rx: /\b(relogio|relogios|derretido|derretidos|derretendo)\b/,
    draw: () => {
      const K = SCK.ink;
      const dial = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0-4.6v1.6M0 4.6v-1.6M-4.6 0h1.6M4.6 0h-1.6" stroke="${K}" stroke-width=".8"/><path d="M0 0l2.4-1.6M0 0v-3" stroke="${K}" stroke-width=".9"/></g>`;
      return SCH.bg('#A9C2CB') + `<path d="M0 30h120v12H0z" fill="#E9D9A8"/><path d="M0 40h120v6H0z" fill="#6F92A0"/>`
        + SCH.g(`<path d="M76 46l6-10 8-2 4-8 10-4 6 4 10-2v22z" fill="${SCK.ochre}"/>`, 1.3) + `<path d="M84 38l6 6M98 30l4 12M108 28l2 14" stroke="${SCK.goldLo}" stroke-width="1" fill="none"/>`
        + `<path d="M0 46h120v34H0z" fill="#8A6A44"/><path d="M0 54h120M0 64h120" stroke="#6E5236" stroke-width="1.2"/><path d="M80 52q14 2 30 0" stroke="#6E5236" stroke-width="1"/>`
        + SCH.g(`<path d="M2 54h46v16H2z" fill="#5E3A1E"/><path d="M2 54l6-6h46l-6 6z" fill="${SCK.wood}"/><path d="M48 54l6-6v16l-6 6z" fill="#4A2E16"/>
          <path d="M33 50q-3-10 1-19l-7-6 2-1.6 7 5q6-9 25-14l1 2q-16 6-21 15-3 9 0 18z" fill="#6E5236"/>`, 1.3)
        + `<path d="M35 46q-1-8 2-14M40 27q8-6 18-9" stroke="#3A2A1C" stroke-width=".7" fill="none"/>`
        + SCH.g(`<path d="M42 21q8-4 16-5 3 8 1 16-2 12-6 14-4 1-5-6-1-9-6-11-2-4 0-8z" fill="#DDE4DC"/><path d="M2 49q8-3 18-2l3 2q2 8-1 13-4 4-7-1-1-6-6-8-6-1-7-4z" fill="#DDE4DC"/>`, 1.3)
        + `<path d="M42 21q8-4 16-5 3 8 1 16-2 12-6 14-4 1-5-6-1-9-6-11-2-4 0-8zM2 49q8-3 18-2l3 2q2 8-1 13-4 4-7-1-1-6-6-8-6-1-7-4z" fill="none" stroke="${SCK.gold}" stroke-width="1.2"/>`
        + dial(51, 27, 1) + dial(14, 52, .8) + SCH.g(`<path d="M58 15l2-2.6 2 1.4-1.4 2.4z" fill="${SCK.gold}"/><ellipse cx="28" cy="51.4" rx="5" ry="2.2" fill="#C9602E"/>`, 1)
        + `<path d="M26 51h.1M28.6 50.6h.1M30 52h.1M27.4 52.2h.1" stroke="${K}" stroke-width="1" stroke-linecap="round"/>`;
    } },
  /* Guernica's world in black, white and grey: angular planes like broken walls, the bull's white head with its black horns, the bare bulb blazing like an eye, a broken sword and one small flower */
  guernica_touro: {
    label: 'Um touro e uma lâmpada nua, em preto, branco e cinza',
    rx: /\b(touro|touros|lampada nua|guernica)\b/,
    draw: () => {
      const K = '#1E1A16', W = '#F2EFE6', G1 = '#8E8A82', G2 = '#5E5A54', G3 = '#C4C0B6';
      return SCH.bg(G2) + `<path d="M0 0h50l-14 80H0z" fill="#3E3A36"/><path d="M50 0h70v40L80 80H36z" fill="${G1}"/><path d="M120 40v40H80z" fill="${G3}"/><path d="M84 0h36v24L96 44z" fill="#3E3A36"/>`
        + `<path d="M100 50h12v16h-12z" fill="${K}"/><path d="M0 70h120v10H0z" fill="${G3}"/><path d="M8 76h104M30 70l-4 10M56 70l-2 10M82 70v10" stroke="${G1}" stroke-width=".8"/>`
        + `<path d="M98 0 72 70h8L120 6z" fill="${W}" opacity=".35"/>`
        + SCH.g(`<path d="M0 22q10-6 20 0l6 18-4 22H0z" fill="${K}"/><path d="M2 44q-6 8 0 16" fill="none" stroke="${W}" stroke-width="1.4"/>`, 1.2)
        + SCH.g(`<path d="M17 16l9-7 7 2 13 20-1 6h-9l-10-5-9-4z" fill="${W}"/><path d="M25 10q-9-3-9-9 4 5 11 6zM31 10q3-7 11-8-6 4-8 10z" fill="${K}"/><path d="M19 16l-9 2 8 3z" fill="${G3}"/>`, 1.4)
        + `<path d="M26 15q3-2.4 6 0-3 2.4-6 0zM24 22q2.4-2 5 0-2.4 2-5 0z" fill="${K}"/><path d="M41 31h.1M38 35l5-.4M34 20q4 6 3 14" stroke="${K}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`
        + SCH.g(`<path d="M50 14l4-5 3 3 4-6 3 5 5-5 2 5 6-3-1 5 6 1-4 4 5 3-6 2 2 5-6-1-2 5-4-4-4 5-2-5-5 3 1-5-6-1 4-4-6-3z" fill="${W}"/>`, 1.2)
        + `<path d="M58 17q8-6 16 0-8 6-16 0z" fill="${G3}" stroke="${K}" stroke-width="1"/><circle cx="66" cy="17" r="2.6" fill="${W}" stroke="${K}" stroke-width="1"/><path d="M66 11v-4" stroke="${K}" stroke-width="1"/>`
        + SCH.g(`<path d="M30 66l26-6 1 3-26 6z" fill="${G3}"/><path d="M56 60l4-2 2 6-4 1zM58 56l2 12" fill="${W}"/><path d="M60 62l6 2" fill="none" stroke-width="2.6"/>`, 1.3)
        + `<path d="M34 65.4l20-4.6" stroke="${G1}" stroke-width=".6"/><path d="M70 66q0-8 2-12" stroke="${K}" stroke-width="1.2" fill="none"/>`
        + SCH.g(`<path d="M72 50l2-3 2 3-2 3zM72 50l-3-2 1 4zM76 50l3-2-1 4zM72 53l-2 2 4 0zM76 53l2 2-4 0z" fill="${W}"/><circle cx="74" cy="51" r="1.4" fill="${G2}"/>`, .9)
        + `<path d="M70 62q-4-2-6 0 3 2 6 0z" fill="${G1}" stroke="${K}" stroke-width=".8"/>`;
    } },

  /* the blue house in Coyoacán: cobalt walls trimmed in red, green shutters, tall organ-pipe cacti, clay pots, a little stepped pyramid in the garden and a spider monkey sitting on the wall */
  casa_azul: {
    label: 'Uma casa de paredes azuis com cactos, vasos de barro e um macaquinho',
    rx: /\b(casa azul|coyoacan|cacto|cactos)\b/,
    draw: () => {
      const K = SCK.ink, B = '#3561A3', R = SCK.red, T = '#B8653A', C = '#4E7A3C';
      const pot = (x, w) => `<path d="M${x - w} 66h${2 * w}l-${(w * .25).toFixed(1)} ${(w * 1.2).toFixed(1)}h-${(w * 1.5).toFixed(1)}z" fill="${T}"/><path d="M${x - w - 1} 64h${2 * w + 2}v2.4h-${2 * w + 2}z" fill="${T}"/>`;
      return SCH.bg('#C6DCE2') + `<ellipse cx="96" cy="8" rx="14" ry="2.6" fill="${SCK.white}" opacity=".8"/>`
        + SCH.g(`<path d="M0 18h120v50H0z" fill="${B}"/><path d="M0 16h120v4H0z" fill="${R}"/>
          <path d="M8 28h16v26H8zM96 28h16v26H96z" fill="${R}"/><path d="M11 31h10v23H11zM99 31h10v23H99z" fill="#4E8A5A"/>`, 1.4)
        + `<path d="M16 31v23M104 31v23M11 38h10M11 46h10M99 38h10M99 46h10" stroke="${K}" stroke-width=".8"/><path d="M0 60h120" stroke="${R}" stroke-width="2"/>`
        + `<path d="M0 66h120v14H0z" fill="#D9BC85"/><path d="M0 72h120M20 66v14M48 66v14M76 66v14M104 66v14" stroke="${SCK.ochre}" stroke-width=".8"/>`
        + SCH.g(`<path d="M44 66h32l-2-5H46zM48 61h24l-2-5H50zM52 56h16l-2-5H54zM56 51h8l-1-4h-6z" fill="${SCK.ochre}"/>`, 1.2)
        + `<path d="M46 63.4h28M50 58.4h20M54 53.4h12" stroke="${R}" stroke-width="1.2"/>`
        + SCH.g(`<path d="M28 66V22a3 3 0 0 1 6 0v44zM34 66V30a3 3 0 0 1 6 0v36zM22 66V34a3 3 0 0 1 6 0v32z" fill="${C}"/><path d="M84 66V26a3 3 0 0 1 6 0v40zM90 66V36a3 3 0 0 1 6 0v30z" fill="${C}"/>`, 1.3)
        + `<path d="M31 24v40M37 32v32M25 36v28M87 28v36M93 38v26" stroke="#7FA868" stroke-width=".9"/>`
        + SCH.g(pot(12, 5) + pot(108, 5) + pot(62, 4), 1.2) + `<path d="M9 64q-2-6 3-8 4 2 3 8M106 64q0-7 4-8 2 4 0 8M60 64q2-6 4-5" stroke="${C}" stroke-width="2" fill="none" stroke-linecap="round"/>`
        + SCH.g(`<path d="M106 16q-1-6 3-7 3 0 3 3l1 4z" fill="#4A3020"/><circle cx="110" cy="7.6" r="2.8" fill="#4A3020"/><path d="M113 15q6 4 4 12-2 4-5 2" fill="none" stroke="#4A3020" stroke-width="1.6"/><path d="M106 16l-3 8M108 16l1 8" fill="none" stroke="#4A3020" stroke-width="1.6"/>`, 1)
        + `<path d="M109 7.6h2.4" stroke="#C9A07A" stroke-width="1.6" stroke-linecap="round"/>`;
    } },
  /* deep in the painted cave: the rock wall lit gold by a flickering lamp, a great black aurochs with lyre horns striding across the vault, red horses with black manes below, the little stone lamp burning on the floor */
  caverna_lascaux: {
    label: 'Pinturas de cavalos e touros na parede de uma caverna, à luz de uma lamparina',
    rx: /\b(caverna|cavernas|gruta|grutas|pintura rupestre|pinturas rupestres|lascaux)\b/,
    draw: () => {
      const K = '#1E1610', R = '#B5532E';
      const horse = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-14-4q0-7 8-9 6-2 12 0l6-6 6 2-2 4-6 3q2 6-2 10-10 3-20 1z" fill="${c}"/><path d="M6-13l6-6 3 1" stroke="${K}" stroke-width="2.6" fill="none"/>`
        + `<path d="M-10 1v8M-6 2v7M6 1l1 8M9 0l2 8M-14-6q-6 2-4 10" stroke="${K}" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`;
      return SCH.bg('#D7BF91') + `<path d="M0 0h120v10q-20 6-40 0T40 6 0 12z" fill="#3A2A1C"/><path d="M0 12q8 20 0 40zM120 8q-10 26 0 48z" fill="#3A2A1C"/><path d="M0 71q30-4 60-1t60-2v12H0z" fill="#4E3A26"/>`
        + `<path d="M14 20q8-4 16 2M70 50q10-4 18 2M96 30q6 4 4 12M50 58q8 2 14-2" stroke="#B89A6A" stroke-width="1.2" fill="none"/><ellipse cx="100" cy="46" rx="14" ry="8" fill="#E9D3A2" opacity=".6"/><ellipse cx="62" cy="40" rx="30" ry="12" fill="#E9D3A2" opacity=".35"/>`
        + `<path d="M30 28q0-5 4-8l6-4q8-5 20-4 16-2 28 1 10 2 11 10 0 6-4 8l1 9h-4l-2-8h-5l1 8h-4l-2-9q-14 2-26 1l-2 8h-4l-1-9h-4l-1 8h-4v-9q-5 1-8-2z" fill="${K}"/><circle cx="35" cy="22" r=".9" fill="#D7BF91"/>`
        + `<path d="M38 17q-5-9-13-9M41 16q0-9-8-13M98 20q6 6 4 16" stroke="${K}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M50 24q16-4 36 0" stroke="${R}" stroke-width="2.4" fill="none" opacity=".55"/>`
        + horse(28, 59, 1, R) + horse(64, 61, .8, '#C98A3E')
        + SCH.g(`<path d="M86 75q0-6 9-6t10 4h9v2.4q-12 2-28-.4z" fill="#C9A07A"/>`, 1.3) + `<circle cx="95" cy="66" r="10" fill="${SCK.goldHi}" opacity=".25"/>`
        + `<path d="M95 70q-4-4-1-9 1 3 2 2 1-4 0-6 5 4 3 13z" fill="${SCK.gold}" stroke="${K}" stroke-width=".9"/><path d="M95 69q-1.4-2 0-4 1.4 2 0 4z" fill="${SCK.white}"/>`;
    } },

  /* the Roman builder's kit before a column going up drum by drum: the groma with its cross and four plumb bobs, a plan of a temple on a parchment sheet, the set square and the compasses */
  groma_vitruvio: {
    label: 'Instrumentos de um arquiteto romano: groma, prumo, esquadro e a planta de um templo',
    rx: /\b(groma|prumo|esquadro|compasso|tratado de arquitetura)\b/,
    draw: () => {
      const K = SCK.ink, W = SCK.wood, Z = '#B8854E';
      let cols = '';
      for (let i = 0; i < 8; i++) cols += `M${(64 + i * 3.2).toFixed(1)} ${(63.4 - i * .3).toFixed(1)}h.1M${(61.6 + i * 3.2).toFixed(1)} ${(73.4 - i * .3).toFixed(1)}h.1`;
      return SCH.bg('#CFDDE0') + `<ellipse cx="30" cy="10" rx="16" ry="3" fill="${SCK.white}" opacity=".7"/><path d="M0 52q30-6 60-2t60-4v34H0z" fill="#D9BC85"/><path d="M0 54h120" stroke="${SCK.ochre}" stroke-width="1"/>`
        + SCH.g(`<path d="M92 56V26h16v30zM94 22h12v4H94z" fill="${SCK.stone}"/><path d="M90 56h20v4H90zM86 64l4-6h14l-2 6z" fill="${SCK.stoneLo}"/>`, 1.4)
        + `<path d="M93 27h3v29h-3z" fill="${SCK.white}" opacity=".6"/><path d="M104 27h4v29h-4z" fill="${SCK.stoneLo}"/><path d="M96 28v26M100 28v26M104 28v26" stroke="${K}" stroke-width=".7" opacity=".45"/><path d="M92 36h16M92 46h16" stroke="${K}" stroke-width="1.1"/>`
        + `<path d="M42 68V20h2v-6" stroke="${K}" stroke-width="4" fill="none" stroke-linejoin="round"/><path d="M42 68V20h2v-6" stroke="${W}" stroke-width="2.4" fill="none" stroke-linejoin="round"/>`
        + `<path d="M28.7 18.5 59.3 9.5M28.7 9.5l30.6 9" stroke="${K}" stroke-width="3.2" stroke-linecap="round"/><path d="M28.7 18.5 59.3 9.5M28.7 9.5l30.6 9" stroke="${W}" stroke-width="1.8" stroke-linecap="round"/>`
        + `<path d="M28.7 19v22M59.3 10v26M28.7 10v18M59.3 19v28" stroke="${K}" stroke-width=".7"/><circle cx="44" cy="14" r="1.8" fill="${SCK.gold}" stroke="${K}" stroke-width="1"/>`
        + SCH.g(`<path d="M28.7 41l2.2 2.4-2.2 4-2.2-4zM59.3 36l2.2 2.4-2.2 4-2.2-4zM28.7 28l2.2 2.4-2.2 4-2.2-4zM59.3 47l2.2 2.4-2.2 4-2.2-4z" fill="${SCK.gold}"/>`, 1)
        + SCH.g(`<path d="M50 60l36-2 4 18-42 2z" fill="${SCK.paper}"/>`, 1.4)
        + `<path d="M60 62l26-1.6 1.6 12-26 1.4z" fill="none" stroke="${K}" stroke-width=".8"/><path d="M66 64.2l14-.8.8 7.4-14 .8z" fill="${SCK.sand}" stroke="${K}" stroke-width=".7"/><path d="${cols}" stroke="${K}" stroke-width="1.4" stroke-linecap="round"/>`
        + SCH.g(`<path d="M8 76 24 60l3 3-13 13h14v3H8z" fill="${Z}"/><path d="M28 78l6-18 6 18" fill="none" stroke="${SCK.goldLo}" stroke-width="1.6"/><circle cx="34" cy="60" r="1.6" fill="${SCK.gold}"/>`, 1.2);
    } },

  /* the great altarpiece standing open in a dark chapel: gold frames and arches, robed figures in red, blue and green above, and below, in a flowered meadow under golden rays, the white lamb standing on a red altar */
  retabulo_gante: {
    label: 'Um grande retábulo de painéis abertos, com um cordeiro sobre um altar',
    rx: /\b(retabulo|retabulos|cordeiro|altar|poliptico)\b/,
    draw: () => {
      const K = SCK.ink;
      const saint = (x, c, s) => `<g transform="translate(${x} 34) scale(${s || 1})"><circle cy="-15" r="4.6" fill="${SCK.goldHi}"/><path d="M-6 0q0-10 3-12h6q3 2 3 12z" fill="${c}"/><circle cy="-15" r="2.4" fill="#E8C3A0"/></g>`;
      return SCH.bg('#2B221C') + `<path d="M0 74h120v6H0z" fill="#4A3A2C"/>`
        + SCH.g(`<path d="M6 4h108v72H6z" fill="${SCK.gold}"/>
          <path d="M10 38V16a5 5 0 0 1 10 0v22zM24 38V14a10 10 0 0 1 20 0v24zM48 38V13a12 12 0 0 1 24 0v25zM76 38V14a10 10 0 0 1 20 0v24zM100 38V16a5 5 0 0 1 10 0v22z" fill="#2F4A3A"/>
          <path d="M10 42h12v30H10zM24 42h12v30H24zM84 42h12v30H84zM98 42h12v30H98z" fill="${SCK.green}"/><path d="M38 42h44v30H38z" fill="${SCK.green}"/>`, 1.4)
        + `<path d="M24 38V14a10 10 0 0 1 20 0v24z" fill="${SCK.sea}"/><path d="M48 38V13a12 12 0 0 1 24 0v25z" fill="${SCK.red}"/><path d="M76 38V14a10 10 0 0 1 20 0v24z" fill="#4E7A5A"/>`
        + saint(34, '#2F4A6A') + saint(60, '#6E1414', 1.2) + saint(86, '#2E5A3A') + saint(15, SCK.burg, .7) + saint(105, SCK.burg, .7)
        + `<path d="M10 42h12v8H10zM24 42h12v8H24zM84 42h12v8H84zM98 42h12v8H98zM38 42h44v9H38z" fill="#A9C4D0"/><path d="M38 51q22-4 44 0" stroke="#4E6B3C" stroke-width="1" fill="none"/>`
        + `<path d="M60 42l-14 18M60 42l-6 18M60 42v16M60 42l6 18M60 42l14 18" stroke="${SCK.goldHi}" stroke-width="1" opacity=".9"/><circle cx="60" cy="44" r="2" fill="${SCK.white}"/>`
        + `<path d="M13 60h.1M17 62h.1M27 58h.1M31 63h.1M88 60h.1M92 63h.1M102 58h.1M106 62h.1M42 66h.1M46 64h.1M74 64h.1M78 66h.1M44 58h.1M76 58h.1" stroke="${SCK.red}" stroke-width="2.4" stroke-linecap="round"/><path d="M15 66h.1M29 66h.1M90 66h.1M104 66h.1M48 68h.1M72 68h.1" stroke="${SCK.white}" stroke-width="2.4" stroke-linecap="round"/>`
        + SCH.g(`<path d="M53 60h14v10H53z" fill="${SCK.red}"/><path d="M52 58h16v2.6H52z" fill="${SCK.white}"/><path d="M55 58v-3M58 58v-3M61 58v-3M64 58v-3" fill="none" stroke-width="1.2"/><circle cx="68" cy="47" r="4.4" fill="none" stroke="${SCK.goldHi}" stroke-width="1.2"/>
          <path d="M54 56q-3-1-2-4 1-3 4-3 2-2 5 0 3-1 4 1 3 1 1 5-6 1.6-12 1z" fill="${SCK.white}"/><path d="M64 51l2-5q2-2 4 0l1 4-2 2-4 1z" fill="${SCK.white}"/><path d="M66 46l-3-1 1 2" fill="${SCK.white}" stroke-width=".8"/>`, 1.1)
        + `<circle cx="68.4" cy="48" r=".6" fill="${K}"/><path d="M6 40h108" stroke="${K}" stroke-width="1.4"/>`;
    } },

  /* a silent-film stage: in the cone of the projector's beam, a black bowler hat on a wooden stool and a bamboo cane with its crook leaning beside it, a film reel and its strip on the floor, the scratched sepia air */
  chapeu_bengala: {
    label: 'Um chapéu-coco e uma bengala de bambu num palco de cinema mudo',
    rx: /\b(chapeu-coco|chapeu coco|chapeus-coco|bengala|bengalas)\b/,
    draw: () => {
      const K = SCK.ink, H = '#1E1812';
      let holes = '';
      for (let i = 0; i < 9; i++) holes += `M${38 + i * 6} ${(74.6 - i * .2).toFixed(1)}h2.4`;
      return SCH.bg('#6E5438') + `<path d="M0 62h120v18H0z" fill="#4E3A26"/><path d="M0 0h18L84 62H40z" fill="#E9D2A0" opacity=".35"/><ellipse cx="62" cy="68" rx="30" ry="7" fill="#E9D2A0" opacity=".45"/>`
        + `<path d="M20 8l1 1M30 20l1 1M44 30l1 1M36 14l1 1M52 42l1 1M26 30l1 1" stroke="${SCK.goldHi}" stroke-width="1.2" stroke-linecap="round"/><path d="M96 0v80M106 10v40M8 40v30" stroke="#8A7050" stroke-width=".6" opacity=".6"/>`
        + SCH.g(`<path d="M2 2h16v10H2z" fill="#3A2A1C"/><circle cx="6" cy="2" r="4" fill="#3A2A1C"/><circle cx="15" cy="2" r="3" fill="#3A2A1C"/><path d="M18 5l4-2v8l-4-2z" fill="${SCK.stone}"/>`, 1.2)
        + SCH.g(`<path d="M50 54l-4 20M74 54l4 20M51 62h22" fill="none" stroke="${SCK.wood}" stroke-width="2.6"/><path d="M44 50h36v5H44z" fill="${SCK.wood}"/>`, 1.4)
        + SCH.g(`<path d="M44 48q4 3 18 3t18-3q2 1-1 3-6 3-17 3t-17-3q-3-2-1-3z" fill="${H}"/><path d="M50 48q-1-14 12-15 13 1 12 15-5 1.6-12 1.6T50 48z" fill="${H}"/>`, 1.4)
        + `<path d="M50.6 45q11 2 22.8 0" stroke="#4A3A2C" stroke-width="2"/><path d="M55 38q3-3 7-3" stroke="#6E6050" stroke-width="1.2" fill="none"/>`
        + `<path d="M90 76 80 34q-2-7 3-8 5 0 5 5" stroke="${K}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M90 76 80 34q-2-7 3-8 5 0 5 5" stroke="#C9A66B" stroke-width="2.2" fill="none" stroke-linecap="round"/>`
        + `<path d="M81.4 40l2-.4M83.6 50l2-.4M85.8 60l2-.4M88 70l2-.4" stroke="${K}" stroke-width="1"/>`
        + SCH.g(`<path d="M30 76q20 1 80-2v-5q-60 3-80 2z" fill="#2E2A26"/><circle cx="20" cy="66" r="14" fill="${SCK.stone}"/><circle cx="20" cy="66" r="4" fill="#4E3A26"/>`, 1.3)
        + `<path d="${holes}" stroke="${SCK.stone}" stroke-width="1.2"/><circle cx="20" cy="58" r="3.4" fill="#4E3A26"/><circle cx="27" cy="68.6" r="3.4" fill="#4E3A26"/><circle cx="13" cy="68.6" r="3.4" fill="#4E3A26"/><circle cx="20" cy="66" r="1.2" fill="${SCK.stone}"/>`;
    } },
});
