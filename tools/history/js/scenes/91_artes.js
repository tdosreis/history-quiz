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

  /* a papal chapel under its painted barrel vault: painted cornices dividing the vault into bays, robed figures painted in the near bay, tall windows, the marble floor, and in the middle a tall wooden scaffold with its ladder and pigment pots, the blue painted end wall seen through it */
  afresco_vaticano: {
    label: 'Um andaime de madeira sob abóbadas cobertas de afrescos, num salão de palácio',
    rx: /\b(capela sistina|abobada|abobadas|andaime|andaimes|afresco|afrescos)\b/,
    draw: () => {
      const K = SCK.ink, W = SCK.wood, f = v => Math.round(v * 10) / 10, r = a => a * Math.PI / 180;
      const P = (s, a) => f(60 + 60 * s * Math.cos(r(a))) + ' ' + f(46 - 2 * s - 50 * s * Math.sin(r(a)));
      const arc = (s, a, w) => `A${f(60 * s)} ${f(50 * s)} 0 0 ${w} ${P(s, a)}`;
      const cell = (s1, s2, a1, a2) => `M${P(s1, a1)}${arc(s1, a2, 0)}L${P(s2, a2)}${arc(s2, a1, 1)}Z`;
      const S = [1, .58, .3], A = [0, 28, 66, 114, 152, 180], R = [SCK.burg, SCK.teal, SCK.red, SCK.sea, SCK.green, SCK.goldLo];
      const beam = (d, w) => `<path d="${d}" stroke="${K}" stroke-width="${w + 1.8}" fill="none"/><path d="${d}" stroke="${W}" stroke-width="${w}" fill="none"/>`;
      let lun = '', side = '', crown = ['', ''], figs = '', ribs = '', n = 0;
      for (let i = 0; i < 2; i++) {
        lun += cell(S[i], S[i + 1], 0, A[1]) + cell(S[i], S[i + 1], A[4], 180);
        side += cell(S[i], S[i + 1], A[1], A[2]) + cell(S[i], S[i + 1], A[3], A[4]);
        crown[i] += cell(S[i], S[i + 1], A[2], A[3]);
        if (!i) for (const j of [1, 2, 3]) {
          const s = S[i + 1] + (S[i] - S[i + 1]) * (j === 2 ? .35 : .62), a = (A[j] + A[j + 1]) / 2, [x, y] = P(s, a).split(' ');
          figs += `<g transform="translate(${x} ${y}) scale(${f(s * 1.4)})${a === 90 ? '' : ` rotate(${f(a - 90)})`}"><path d="M-4 5q-1-6 1.6-8h4.8q2.6 2 1.6 8z" fill="${R[n++ % 6]}"/><circle cy="-5" r="2.4" fill="#E8C3A0"/></g>`;
        }
      }
      S.slice(1).forEach(s => ribs += `M${P(s, 0)}${arc(s, 180, 0)}`);
      A.slice(1, 5).forEach(a => ribs += `M${P(1, a)}L${P(.3, a)}`);
      return SCH.bg('#D9C9A4') + `<path d="${cell(1, .3, 0, 180)}" fill="${SCK.parch}"/><path d="${lun}" fill="#9DB08C"/><path d="${side}" fill="#E4CFA0"/>`
        + `<path d="${crown[0]}" fill="#A9C4D0"/><path d="${crown[1]}" fill="${SCK.sand}"/>` + SCH.g(figs, .7)
        + `<path d="${ribs}" stroke="${K}" stroke-width="3.2" fill="none"/><path d="${ribs}" stroke="${SCK.stone}" stroke-width="1.6" fill="none"/>`
        + SCH.g(`<path d="M0 44 42 45.4V56.2L0 80zM120 44 78 45.4V56.2L120 80z" fill="#CDBF9F"/><path d="M42 56.2h36L120 80H0z" fill="#D8CCB0"/>
          <path d="M42 45.4A18 15 0 0 1 78 45.4V56.2H42z" fill="#6F8FB0"/>
          <path d="M117 61V47q-4.5-5-9 0v12zM3 61V47q4.5-5 9 0v12z" fill="#4E5A66"/>`, 1.4)
        + `<path d="M120 64 78 51.4v2.4L120 72zM0 64l42-12.6v2.4L0 72z" fill="#B98A56"/><path d="M60 56.2V80M14 74h92" stroke="${SCK.stoneLo}" stroke-width=".9"/>`
        + beam('M30 80V35M90 80V35', 2.8) + beam('M30 56h60M30 36 90 56M90 36 30 56', 1.5)
        + `<path d="M97 80l-6-46M104 80l-6-46M96 72h7M95 63h7M94 54h7M93 45h7" stroke="${K}" stroke-width="1.5"/>`
        + SCH.g(`<path d="M24 32h72v3.6H24z" fill="${W}"/><path d="M31 25h6l-1 7h-4z" fill="${SCK.red}"/><path d="M40 26h6l-1 6h-4z" fill="${SCK.sea}"/><path d="M79 25h6l-1 7h-4z" fill="${SCK.gold}"/>`, 1.2)
        + `<path d="M33 25l-2-6M35 25l3-6M82 25l2-7" stroke="${K}" stroke-width="1.1"/>`;
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
      const K = SCK.ink, h = SCH.uid('kh'), L = '#ECE3CB', M = '#A89A7C', D = '#6E6250';
      const limb = (d, w, c) => `<path d="${d}" stroke="${K}" stroke-width="${w}"/><path d="${d}" stroke="${c || L}" stroke-width="${(w - 2.2).toFixed(1)}"/>`;
      return SCH.bg('#EFE6CF') + `<pattern id="${h}" width="2" height="2" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><path d="M0 0v2" stroke="${K}" stroke-width=".6"/></pattern>`
        + `<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M0 5h120M0 8h120M0 11h120M0 14h120M0 17h120" stroke="${K}" stroke-width=".35" opacity=".5"/>`
        + SCH.g(`<path d="M0 36V18l6-4 5 2 6-4 7 7 6 8 6 9z" fill="${M}"/><path d="M5 14V7h3V5h2v2h2v7M13 12V3h2V1h2v2h2v10" fill="#F4ECD8" stroke-width=".8"/>`, 1)
        + SCH.g(`<path d="M96 80V42l5-12 4 2 4-14 6 4 5-6v64z" fill="${D}"/><path d="M0 80V71l12-3 14 3 24-2 40 1 30-2v12z" fill="${M}"/>`, 1.4)
        + `<path d="M96 80V42l5-12 4 2 4-14 6 4 5-6v64zM0 80V71l12-3 14 3 24-2 40 1 30-2v12z" fill="url(#${h})" opacity=".5"/>`
        + `<path d="M104 38l8 6M110 26l6 10M100 54l10 4M112 50l6 8" stroke="${K}" stroke-width=".8"/>`
        + limb('M54 38 102-2', 3.3) + limb('M42 54l-4 10-2 9M78 56l-4 9-1 8', 5.6, M) + `<path d="M33 73h5M70 73.4h5" stroke="${K}" stroke-width="2.4"/>`
        + SCH.g(`<path d="M92 40q10 8 6 28-4-8-9-15z" fill="${D}"/>
          <path d="M13 34q0-4 3-7l6-8 1-6 3.6 4q9.4-1 15.4 8 4 6 10 8 14-2 30 0 11 2 11 13 0 8-7 11-18 4-36 0-9-2-13-7-4-9-12-18-3 3-7 5-4 1-5-3z" fill="${L}"/>`, 1.5)
        + `<path d="M27 17.4q9 0 14 8 5 6 10 7.6M28 21q6 2 9 8" stroke="${D}" stroke-width="1.8"/><circle cx="20.4" cy="22.6" r="1.1" fill="${K}"/><path d="M15.4 29.4l5 3.6M20.4 33 24 26M15 31.6h.1M55 30 21 32" stroke="${K}" stroke-width=".9"/>`
        + `<path d="M50 55q18 3 36 0M60 52q0-6 2-9M80 51q2-5 7-7" stroke="${K}" stroke-width=".7"/>`
        + limb('M46 55l-6 8 2 7M84 55l6 9-2 9', 5.6) + `<path d="M40 70.6h5M86 73.4h5" stroke="${K}" stroke-width="2.4"/>`
        + SCH.g(`<path d="M55 34q8-4 18 0l-2 6H58z" fill="${D}"/><path d="M59 35l-1-12q1-5 6-5t6 5l-1 12z" fill="${M}"/><path d="M59 15q0-8 5.4-8 6 0 6 7l-1 3h-10z" fill="${D}"/><path d="M60 13h9" stroke="${L}" stroke-width="1.2"/>
          <path d="M65 7q6-7 14-2-6 0-11 4zM66 8q8-3 13 3-6-2-11 0z" fill="${L}" stroke-width="1"/>`, 1.3)
        + `<path d="M60 27h9M60 31h9" stroke="${K}" stroke-width=".7"/>` + limb('M65 34l-9 8 1 10', 5.6, M) + `<path d="M54 52.6h6" stroke="${K}" stroke-width="2.2"/>` + limb('M62 23l-7 7', 4.6, M)
        + `<g transform="translate(2 60) scale(1.2)">` + limb('M15 7 8 10l-5 1M17 8l-4 4-3 1.6M33 5l6 4h5M31 6l4 5 3 1.6M37.6 1q5-2 8-7', 3.4)
        + SCH.g(`<path d="M0 0l7-3q3-2 6-1.6 3 .6 5 2.6 7-1 14-1 5 0 6 3 0 3-4 4-4-1-7 0-5 3-10 3-4-1-6-5L4 2.6Q0 2 0 0z" fill="${L}"/><path d="M12-4.4q4 1.4 3.6 5.4-2.6-1-3.6-5.4z" fill="${D}" stroke-width=".7"/>`, 1.1)
        + `<circle cx="7.6" cy="-1.6" r=".7" fill="${K}"/></g></g>`;
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
        + `<circle cx="66" cy="50" r="10" fill="${SCK.goldHi}" opacity=".35"/><ellipse cx="66" cy="55" rx="7" ry="1.6" fill="#4E0F22"/><path d="M66 45q5.8 2.6 5.8 7.8a5.8 5.8 0 0 1-11.6 0q0-5.2 5.8-7.8z" fill="#EEEBE2" stroke="${K}" stroke-width="1.2"/>`
        + `<path d="M61.2 55a5.8 5.8 0 0 0 9.6 0q-4.8 2.2-9.6 0z" fill="#AEB6BC"/><circle cx="63.8" cy="50.4" r="1.7" fill="#FFFFFF"/><path d="M68.6 55.4h.1" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round"/><path d="M66 45v-2.4a2.2 2.2 0 1 1 3.4-1.8" stroke="${SCK.goldLo}" stroke-width="1.4" fill="none"/>`
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
        + `<path d="M46.5 7.5h23v15h-23zM82.5 7.5h19v15h-19zM40 34h8v10h-8zM111.4 12.8l4.2 1.2v9.6l-4.2-1.2z" fill="#2A2018"/><path d="M46.5 11h23M82.5 11h19" stroke="#5A4A34" stroke-width="3"/><path d="M46.5 19q6-6 12-3t11-1v7.5h-23zM82.5 18q5-5 10-2t9 1v5.5h-19zM40 41q4-4 8 0v3h-8z" fill="#5E4C34"/><path d="M63 16v-4" stroke="#5E4C34" stroke-width="1.2"/><circle cx="63" cy="11.4" r="2.6" fill="#5E4C34"/>`
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

  /* a night outside the city: a big square lantern on the ground throwing its light over the bare hillside, and the firing party seen from behind, a row of tall shakos with pompoms, greatcoats, white crossbelts, knapsacks and levelled muskets */
  goya_fuzilamentos: {
    label: 'Um grande lampião no chão ilumina uma colina de noite, com uma fila de soldados de costas',
    rx: /\b(fuzilamento|fuzilamentos|pelotao|pelotoes|lampiao|lampioes)\b/,
    draw: () => {
      const K = SCK.ink, r = v => +v.toFixed(1), X = [[66, 0, '#524C3E'], [82, 1.4, '#74684E'], [98, -.6, '#524C3E'], [114, .8, '#74684E']], all = f => X.map(f).join('');
      /* one soldier from behind, leaning into his aim at the left: the shako with its pompom tipped forward, greatcoat, white crossbelt, knapsack, wide stance */
      const sol = ([x, d, c]) => `<g transform="translate(${x} ${r(76 + d)})"><path d="M2-22h6l8 22h-6zM-10-22h6l-5 11V0h-6v-12z" fill="#2A2620"/>
        <path d="M-17-40q9-5 19-2l6 14 6 14h-24l-2-13z" fill="${c}"/><path d="M-13-38 6-17" stroke="#E9E1CC" stroke-width="2.4"/><path d="M-5-41h10l2 11H-3z" fill="#6E4A2C"/>
        <path d="M-19-41q4-3 8-1l-1 3h-7z" fill="#3A2E24"/><g transform="translate(-15 -42) rotate(-18)"><path d="M-3.6 0h7.2l1-11.6h-9.2z" fill="#17110B"/><path d="M-4.6-11.6h9.2" stroke="#6E6658" stroke-width="1"/><circle cx="-2" cy="-13" r="1.8" fill="${SCK.white}"/></g></g>`;
      return SCH.bg('#141B28') + `<path d="M14 36V26h5v-6h3v6h7v-3a6 6 0 0 1 12 0v3h5v-9l3-5 3 5v9h6v10zM64 36v-6h7v-5h5v5h12v6z" fill="#27324A"/>`
        + `<path d="M0 22q22 2 34 16 10 10 18 20H0z" fill="#4A3A28"/><path d="M0 40q18 2 30 10l10 8H0z" fill="#8A6A3E"/><path d="M0 50h120v30H0z" fill="#3B2E20"/>`
        + `<ellipse cx="42" cy="68" rx="46" ry="13" fill="${SCK.ochre}"/><ellipse cx="42" cy="68" rx="28" ry="8" fill="${SCK.sand}"/>`
        + `<circle cx="42" cy="62" r="17" fill="${SCK.goldHi}" opacity=".2"/>`
        + SCH.g(`<path d="M33 56h18v17H33z" fill="#FBEFB8"/><path d="M31 56l4-5h14l4 5z" fill="#2E2A24"/><path d="M42 56v17M33 64.6h18" fill="none" stroke-width="1.2"/><path d="M38 51q4-6 8 0" fill="none" stroke-width="1.3"/>`, 1.6)
        + SCH.g(all(sol), 1.2)
        + `<path d="${all(([x, d]) => `M${x - 14} ${r(37 + d)} ${x - 24} ${r(35.4 + d)}`)}" stroke="#5B5446" stroke-width="3.4" stroke-linecap="round"/>`
        + `<path d="${all(([x, d]) => `M${x} ${r(36 + d)} ${x - 38} ${r(34 + d)}`)}" stroke="${K}" stroke-width="2.8"/><path d="${all(([x, d]) => `M${x} ${r(36 + d)} ${x - 32} ${r(34.3 + d)}`)}" stroke="${SCK.wood}" stroke-width="1.2"/>`
        + `<path d="${all(([x, d]) => `M${x - 38} ${r(34 + d)} ${x - 46} ${r(33.6 + d)}`)}" stroke="${SCK.stone}" stroke-width="1"/>`;
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
  /* Guernica's world in black, white and grey: angular planes like broken walls and an open door, the bull's white head full face with its horns and ears out and both eyes thrown to one side, the bare bulb blazing like an eye, a broken sword and one small flower */
  guernica_touro: {
    label: 'Um touro e uma lâmpada nua, em preto, branco e cinza',
    rx: /\b(touro|touros|lampada nua|guernica)\b/,
    draw: () => {
      const K = '#1E1A16', W = '#F2EFE6', G1 = '#8E8A82', G2 = '#5E5A54', G3 = '#C4C0B6';
      return SCH.bg(G2) + `<path d="M0 0h50l-14 80H0z" fill="#3E3A36"/><path d="M50 0h70v40L80 80H36z" fill="${G1}"/><path d="M120 40v40H80z" fill="${G3}"/><path d="M84 0h36v24L96 44z" fill="#3E3A36"/>`
        + `<path d="M0 70h120v10H0z" fill="${G3}"/><path d="M8 76h104M30 70l-4 10M56 70l-2 10M82 70v10M104 70l2 10" stroke="${G1}" stroke-width=".8"/>`
        + `<path d="M98 0 70 70h10L120 6z" fill="${W}" opacity=".3"/><path d="M104 46h10v22h-10z" fill="#3E3A36"/><path d="M104 46l-6 4v22l6-4z" fill="${G3}"/>`
        + SCH.g(`<path d="M0 34q8-10 18-4l4 30-8 12H0z" fill="${K}"/>
          <path d="M13 20Q-1 16 4 1q3 10 13 14zM39 20q14-4 9-19-3 10-13 14z" fill="${G3}"/><path d="M14 27 1 29l12 5zM38 27l13 2-12 5z" fill="${G1}"/>
          <path d="M12 17h28l2 13-6 18q-10 6-20 0l-6-18z" fill="${W}"/><path d="M16 44q10-5 20 0l-1 7q-9 4-18 0z" fill="${G3}"/>`, 1.4)
        + `<path d="M17 20q2.4-3 4.8 0t4.8 0 4.8 0 4.8 0" fill="none" stroke="${K}" stroke-width="1"/><path d="M15 27q4-3 8 0-4 3-8 0zM17 34q4-3 8 0-4 3-8 0z" fill="${K}"/><circle cx="19" cy="27" r="1" fill="${W}"/><circle cx="21" cy="34" r="1" fill="${W}"/>`
        + `<path d="M21 47.4h.1M31 47.4h.1" stroke="${K}" stroke-width="2.6" stroke-linecap="round"/><path d="M30 24q4 8 2 16M26 52v4" stroke="${K}" stroke-width="1" fill="none"/>`
        + SCH.g(`<path d="M54 16l4-6 3 4 4-7 3 6 5-5 2 6 6-3-1 6 6 1-4 4 5 4-6 2 2 5-6-1-2 5-4-4-4 5-2-5-5 3 1-5-6-1 4-4-6-3z" fill="${W}"/>`, 1.2)
        + `<path d="M62 19q9-7 18 0-9 7-18 0z" fill="${G3}" stroke="${K}" stroke-width="1.1"/><circle cx="71" cy="19" r="3" fill="${W}" stroke="${K}" stroke-width="1.1"/><path d="M71 12V3" stroke="${K}" stroke-width="1.1"/>`
        + SCH.g(`<path d="M42 66l28-7 1 3.4-28 7z" fill="${G3}"/><path d="M70 57l4-1.4 2.4 8-4 1.2z" fill="${W}"/><path d="M74 60l7 1.6" fill="none" stroke-width="3"/>`, 1.3)
        + `<path d="M46 66.2l22-5.4" stroke="${G1}" stroke-width=".7"/><path d="M42 66l-3 1 4 2z" fill="${W}" stroke="${K}" stroke-width=".9"/><path d="M86 66q0-8 2-13" stroke="${K}" stroke-width="1.3" fill="none"/>`
        + SCH.g(`<path d="M88 50l2-3.4 2 3.4-2 3.4zM88 50l-3.4-2 1 4.4zM92 50l3.4-2-1 4.4zM88 53.4l-2.4 2.4h4.4zM92 53.4l2.4 2.4h-4.4z" fill="${W}"/><circle cx="90" cy="51.4" r="1.6" fill="${G2}"/>`, .9)
        + `<path d="M86 60q-4-3-7-1 3 3 7 1z" fill="${G1}" stroke="${K}" stroke-width=".8"/>`;
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

  /* the Roman builder's kit before a column going up drum by drum, the next drum hanging from a wooden lifting boom: the groma with its cross and four plumb bobs, a plan of a temple on a parchment sheet, the set square and the compasses */
  groma_vitruvio: {
    label: 'Instrumentos de um arquiteto romano: groma, prumo, esquadro e a planta de um templo',
    rx: /\b(groma|prumo|esquadro|compasso|tratado de arquitetura)\b/,
    draw: () => {
      const K = SCK.ink, W = SCK.wood, Z = '#B8854E';
      let cols = '';
      for (let i = 0; i < 8; i++) cols += `M${(64 + i * 3.2).toFixed(1)} ${(63.4 - i * .3).toFixed(1)}h.1M${(61.6 + i * 3.2).toFixed(1)} ${(73.4 - i * .3).toFixed(1)}h.1`;
      return SCH.bg('#CFDDE0') + `<ellipse cx="30" cy="10" rx="16" ry="3" fill="${SCK.white}" opacity=".7"/><path d="M0 52q30-6 60-2t60-4v34H0z" fill="#D9BC85"/><path d="M0 54h120" stroke="${SCK.ochre}" stroke-width="1"/>`
        + `<path d="M80 62 100 6" stroke="${K}" stroke-width="4.4" stroke-linecap="round"/><path d="M80 62 100 6" stroke="${W}" stroke-width="2.6" stroke-linecap="round"/><path d="M100 7v10M100 6 119 60M100 7 72 62" stroke="${K}" stroke-width=".9"/>`
        + SCH.g(`<path d="M84 63h30v-5H84z" fill="${SCK.stoneLo}"/><path d="M91 56V34h16v22z" fill="${SCK.stone}"/><path d="M89 53h20v5H89z" fill="${SCK.stoneLo}"/><path d="M93 18h14v8H93z" fill="${SCK.stone}"/><circle cx="100" cy="6" r="2.4" fill="${SCK.gold}"/>`, 1.4)
        + `<path d="M93 35h3v18h-3zM94 19h3v6h-3z" fill="${SCK.white}" opacity=".6"/><path d="M97 35v18M101 35v18M104 35v18M98 19v6M102 19v6M105 19v6" stroke="${K}" stroke-width=".7" opacity=".45"/><path d="M91 41.4h16M91 48.6h16" stroke="${K}" stroke-width="1.1"/><path d="M100 17l-6 1.4M100 17l6 1.4" stroke="${K}" stroke-width=".9"/>`
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
      return SCH.bg('#6E5438') + `<path d="M0 62h120v18H0z" fill="#4E3A26"/><path d="M22 8 86 62H38L22 15z" fill="#E9D2A0" opacity=".35"/><ellipse cx="62" cy="68" rx="30" ry="7" fill="#E9D2A0" opacity=".45"/>`
        + `<path d="M30 16l1 1M38 22l1 1M48 32l1 1M42 20l1 1M56 44l1 1M34 26l1 1" stroke="${SCK.goldHi}" stroke-width="1.2" stroke-linecap="round"/><path d="M96 0v80M106 10v40M8 40v30" stroke="#8A7050" stroke-width=".6" opacity=".6"/>`
        + SCH.g(`<circle cx="7" cy="7" r="4.4" fill="#3A2A1C"/><circle cx="16" cy="7.6" r="3.4" fill="#3A2A1C"/><path d="M3 9h16v10H3z" fill="#3A2A1C"/><path d="M19 12l4-2.4v8.8l-4-2.4z" fill="${SCK.stone}"/>`, 1.2)
        + SCH.g(`<path d="M50 54l-4 20M74 54l4 20M51 62h22" fill="none" stroke="${SCK.wood}" stroke-width="2.6"/><path d="M44 50h36v5H44z" fill="${SCK.wood}"/>`, 1.4)
        + SCH.g(`<path d="M44 48q4 3 18 3t18-3q2 1-1 3-6 3-17 3t-17-3q-3-2-1-3z" fill="${H}"/><path d="M50 48q-1-14 12-15 13 1 12 15-5 1.6-12 1.6T50 48z" fill="${H}"/>`, 1.4)
        + `<path d="M50.6 45q11 2 22.8 0" stroke="#4A3A2C" stroke-width="2"/><path d="M55 38q3-3 7-3" stroke="#6E6050" stroke-width="1.2" fill="none"/>`
        + `<path d="M90 76 80 34q-2-7 3-8 5 0 5 5" stroke="${K}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M90 76 80 34q-2-7 3-8 5 0 5 5" stroke="#C9A66B" stroke-width="2.2" fill="none" stroke-linecap="round"/>`
        + `<path d="M81.4 40l2-.4M83.6 50l2-.4M85.8 60l2-.4M88 70l2-.4" stroke="${K}" stroke-width="1"/>`
        + SCH.g(`<path d="M30 76q20 1 80-2v-5q-60 3-80 2z" fill="#2E2A26"/><circle cx="20" cy="66" r="14" fill="${SCK.stone}"/><circle cx="20" cy="66" r="4" fill="#4E3A26"/>`, 1.3)
        + `<path d="${holes}" stroke="${SCK.stone}" stroke-width="1.2"/><circle cx="20" cy="58" r="3.4" fill="#4E3A26"/><circle cx="27" cy="68.6" r="3.4" fill="#4E3A26"/><circle cx="13" cy="68.6" r="3.4" fill="#4E3A26"/><circle cx="20" cy="66" r="1.2" fill="${SCK.stone}"/>`;
    } },
});
