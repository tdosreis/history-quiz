/* Brasil República — the scenes of the Republic, from Canudos and the sanitary brigades to the Modernists, the coup of 1964 and the rubber forest (conventions in _core.js) */
Object.assign(SCENE, {
  /* Canudos in the backlands: a sprawl of mud houses on the flat plain round a white two-towered church, the dry river bed, thorny caatinga and a mandacaru under a white sun */
  arraial_canudos: {
    label: 'Um arraial de casas de barro no sertão, com as torres de uma igreja e a caatinga',
    rx: /\b(canudos|arraial|sertao|caatinga|vaza-barris)\b/,
    draw: () => {
      const R = v => Math.round(v * 10) / 10;
      const huts = (hs, sw, nd) => { let w0 = '', w1 = '', rf = '', dr = '';
        hs.forEach(([x, y, w], i) => { const h = R(w * .62), p = `M${x} ${y}v${-h}h${w}v${h}z`;
          if (i % 3 === 1) w1 += p; else w0 += p;
          rf += `M${R(x - .8)} ${R(y - h + .3)}L${R(x + w * .5)} ${R(y - h - w * .28)} ${R(x + w + .8)} ${R(y - h + .3)}z`;
          if (!nd) dr += `M${R(x + w * .38)} ${y}v${R(-h * .6)}h${R(w * .24)}v${R(h * .6)}z`; });
        return SCH.g(`<path d="${w0}" fill="#B98552"/><path d="${w1}" fill="${SCK.white}"/><path d="${rf}" fill="#7A4E2C"/>`, sw) + `<path d="${dr}" fill="#3A2A1C"/>`; };
      const shrub = (x, y, s) => `<path d="M${x} ${y}l${R(-5 * s)} ${R(-9 * s)}M${x} ${y}l${R(1 * s)} ${R(-12 * s)}M${x} ${y}l${R(6 * s)} ${R(-8 * s)}M${R(x - 3 * s)} ${R(y - 6 * s)}l${R(-4 * s)} ${R(-2 * s)}M${R(x + 4 * s)} ${R(y - 5 * s)}l${R(4 * s)} ${R(-3 * s)}M${R(x + .6 * s)} ${R(y - 8 * s)}l${R(-3 * s)} ${R(-3 * s)}" stroke="#4A3A2C" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
      return SCH.bg('#EFE0B6') + SCH.sun(20, 14, 12, '#F6EACB') + SCH.sun(20, 14, 8, '#FFF8E6')
        + `<path d="M0 38q30-1.6 60 0t60-.6V80H0z" fill="#D2AC6C"/><path d="M0 38q30-1.6 60 0t60-.6" stroke="${SCK.ink}" stroke-width="1" fill="none" opacity=".5"/>`
        + `<path d="M2 38.4q2-2.4 4 0M14 38q3-3 6 0M34 37.6q2-2 4 0M98 37.8q3-2.6 6 0M110 37.6q2-2 4 0" fill="#8C8A5A" opacity=".8"/>`
        + huts([[3, 42, 6], [11, 41.6, 6], [19, 42, 6], [27, 41.4, 6], [35, 42, 6], [43, 41.6, 6], [97, 41.6, 6], [105, 42, 6], [113, 41.4, 6]], 1, 1)
        + SCH.g(`<path d="M66 47V27l10-6 10 6v20z" fill="${SCK.white}"/><path d="M58 47V19h8v28zM86 47V19h8v28z" fill="${SCK.white}"/>
          <path d="M57 19l5-7 5 7zM85 19l5-7 5 7z" fill="${SCK.ochre}"/><path d="M73 47v-8q3-4 6 0v8z" fill="#3A2A1C" stroke-width="1.1"/>`, 1.5)
        + `<path d="M62 12V7M60.4 8.6h3.2M90 12V7M88.4 8.6h3.2M76 21v-5M74.4 17.4h3.2" stroke="${SCK.ink}" stroke-width="1.2"/>`
        + `<path d="M60.6 27v-3.4q1.4-2 2.8 0V27zM88.6 27v-3.4q1.4-2 2.8 0V27zM74.8 31.4q1.2-2.4 2.4 0" fill="#3A2A1C"/><path d="M58 30h8M86 30h8" stroke="${SCK.ochre}" stroke-width="1"/>`
        + huts([[1, 52, 8], [10, 51.4, 8], [20, 52, 8], [30, 51.6, 8], [40, 52, 8], [50, 51.4, 8], [96, 51.6, 8], [105, 52, 8], [114, 51.4, 8]], 1.2)
        + huts([[0, 63, 12], [15, 62.4, 12], [31, 63, 12], [47, 62.6, 12], [63, 63, 12], [79, 62.4, 12]], 1.4)
        + SCH.g(`<path d="M-2 82V69Q30 63 62 68T122 65V82z" fill="#EAD9B0"/>`, 1.4)
        + `<path d="M10 74l4 2 3-2M30 71l3 3 4-1M52 76l4-2 3 2M76 72l3 3 4-1M90 77l3-2" stroke="${SCK.ink}" stroke-width=".9" fill="none" opacity=".45"/>`
        + `<ellipse cx="22" cy="76" rx="2.4" ry="1.4" fill="${SCK.stoneLo}"/><ellipse cx="66" cy="73" rx="2" ry="1.2" fill="${SCK.stoneLo}"/><ellipse cx="44" cy="70" rx="1.6" ry="1" fill="${SCK.stoneLo}"/>`
        + shrub(9, 74, 1.5) + shrub(93, 69, 1.3) + shrub(50, 80, 1) + `<path d="M3 64a1.4 1.4 0 1 0 .1 0zM13 63a1.4 1.4 0 1 0 .1 0zM90 59a1.4 1.4 0 1 0 .1 0zM99 60a1.4 1.4 0 1 0 .1 0z" fill="${SCK.olive}"/>`
        + SCH.g(`<path d="M104 82V50q0-3 3-3t3 3v32z" fill="#6F8250"/><path d="M104 66h-4q-3.4 0-3.4-3.4V55q0-2.6 2.4-2.6t2.4 2.6v6.6h2.6zM110 62h3q1.6 0 1.6-1.6V52q0-2.6 2.2-2.6T119 52v9q0 5-5 5h-4z" fill="#6F8250"/>`, 1.5)
        + `<path d="M107 50v30M99 56v6M116.8 52v9" stroke="#46562F" stroke-width="1" opacity=".8"/>`;
    } },

  /* the yellow-fever brigade in old Rio: a ladder up to the gutters of the tiled sobrados, a man peering into a water barrel, the fumigation machine on its hand-cart puffing smoke, and one huge striped mosquito in the corner */
  brigada_sanitaria: {
    label: 'Uma brigada sanitária com escadas e uma bomba de fumigação numa rua do Rio antigo',
    rx: /\b(mosquito|mosquitos|mata-mosquitos|fumigacao|brigada sanitaria|brigadas sanitarias)\b/,
    draw: () => {
      const win = (x, y) => `M${x} ${y}v-9q2.4-2.4 4.8 0v9z`;
      const man = (x, y, c) => `<path d="M${x - 2.6} ${y}v-6.4q0-3.4 2.6-3.4t2.6 3.4V${y}z" fill="${c}"/><circle cx="${x}" cy="${y - 12.2}" r="2" fill="#C99A72"/><path d="M${x - 2.4} ${y - 13.4}h4.8v-1.8h-4.8zM${x - 2.4} ${y - 13.4}h5.8" fill="${SCK.night}"/>`;
      return SCH.bg('#CFE0E2')
        + SCH.g(`<path d="M0 62V20h40v42z" fill="${SCK.white}"/><path d="M40 62V18h42v44z" fill="#D9B77A"/><path d="M82 62V20h40v42z" fill="#9DBBC9"/>
          <path d="M-2 20l5-8h34l5 8zM38 18l5-8h36l5 8zM80 20l5-8h36v8z" fill="#B5583A"/>`, 1.6)
        + `<path d="M4 16h32M44 14h34M86 16h34" stroke="${SCK.ink}" stroke-width=".9" opacity=".45"/>`
        + SCH.g(`<path d="${win(7, 36)}${win(18, 36)}${win(29, 36)}${win(48, 34)}${win(70, 34)}${win(88, 36)}${win(100, 36)}${win(111, 36)}" fill="#3D5566"/>
          <path d="M8 56v-9q3-3 6 0v9zM24 62V48q4-4 8 0v14zM46 62V48q4-4 8 0v14zM68 56v-8q3-3 6 0v8zM90 62V48q4-4 8 0v14zM104 56v-8q3-3 6 0v8z" fill="#5A3E26"/>`, 1.1)
        + `<path d="M6 37h7M17 37h7M28 37h7M47 35h7M69 35h7M87 37h7M99 37h7M110 37h7" stroke="${SCK.ink}" stroke-width="1.6"/>`
        + `<path d="M0 21h40M40 19h42M82 21h38" stroke="${SCK.ink}" stroke-width="1.4"/>`
        + `<path d="M0 62h120v18H0z" fill="#BDAE90"/><path d="M0 62h120v4H0z" fill="${SCK.stone}"/><path d="M0 66h120" stroke="${SCK.ink}" stroke-width="1" opacity=".6"/>`
        + `<path d="M40 70h8M58 72h8M30 76h8M52 78h8M70 76h6M8 72h6" stroke="${SCK.ink}" stroke-width=".8" opacity=".3"/>`
        + SCH.g(`<path d="M55 70 63 20M61.4 70 69.4 20" stroke="${SCK.wood}" stroke-width="1.8" fill="none"/>`, 1.8)
        + `<path d="M55.6 66h6.4M56.4 61h6.4M57.2 56h6.4M58 51h6.4M58.8 46h6.4M59.6 41h6.4M60.4 36h6.4M61.2 31h6.4M62 26h6.4" stroke="${SCK.wood}" stroke-width="1.3"/>`
        + SCH.g(`<g transform="translate(65 40)">${man(0, 0, '#ECE3CC')}</g><path d="M66.6 29.4l4-6" stroke-width="1.6" fill="none"/>`, 1)
        + SCH.g(`<path d="M24 64V53q4-1.6 8 0v11q-4 1.6-8 0z" fill="${SCK.wood}"/><path d="M24 56.4q4 1.4 8 0M24 61q4 1.4 8 0" fill="none" stroke-width=".9"/>`, 1.2)
        + SCH.g(`<g transform="translate(37 65)">${man(0, 0, '#ECE3CC')}</g><path d="M35 57.4l-3-1.6M39.6 56l3 2.4" stroke-width="1.4" fill="none"/><path d="M41.6 58h3l-.6 4h-1.8z" fill="${SCK.stone}" stroke-width=".9"/>`, 1)
        + SCH.g(`<path d="M80 66h34v3H80z" fill="${SCK.wood}"/><path d="M84 66V56q0-6 6-6h16q6 0 6 6v10z" fill="${SCK.teal}"/><path d="M98 50v-6h4v6z" fill="${SCK.night}"/>
          <path d="M84 60q-10 0-14 4t-14-2" fill="none" stroke="${SCK.ink}" stroke-width="2.4"/>
          <circle cx="88" cy="72" r="6" fill="#5A3E26"/><circle cx="108" cy="72" r="6" fill="#5A3E26"/><path d="M114 66l6-6" stroke-width="2" fill="none"/>`, 1.4)
        + `<path d="M88 66.6v10.8M82.6 72h10.8M108 66.6v10.8M102.6 72h10.8" stroke="${SCK.ochre}" stroke-width="1"/><path d="M88 56h20M88 61h20" stroke="${SCK.white}" stroke-width=".8" opacity=".5"/>`
        + `<path d="M100 41a4 4 0 1 0 .1 0zM103 34a5 5 0 1 0 .1 0zM98 27a4.4 4.4 0 1 0 .1 0zM104 21a3.6 3.6 0 1 0 .1 0zM52 60a4 4 0 1 0 .1 0zM48 54a3.4 3.4 0 1 0 .1 0z" fill="${SCK.white}" opacity=".85"/>`
        + `<g transform="translate(17 65) rotate(-16) scale(1.2)">`
          + `<path d="M-1-1q-10-11-20-10 7 5 20 10zM1-1.4q-5-12-14-15 3 7 14 15z" fill="#EEF4F6" opacity=".85" stroke="${SCK.ink}" stroke-width=".8"/>`
          + `<path d="M3 1.6l4 7 6 7M2 2l1 8 2 8M-1 2l-3 9-1 8M-3 1.4q-6 6-12 5t-9-6" fill="none" stroke="${SCK.ink}" stroke-width="1.5"/>`
          + `<path d="M3 1.6l4 7 6 7M2 2l1 8 2 8M-1 2l-3 9-1 8M-3 1.4q-6 6-12 5t-9-6" fill="none" stroke="${SCK.white}" stroke-width=".8" stroke-dasharray="1.2 2.6"/>`
          + `<path d="M-2-2q-9-1-17 3 0 2.4 2.4 2.4 8-1 14.6-1.4z" fill="${SCK.ink}"/><path d="M-6-2.2v3M-10-1.6v3M-14-.6v2.6" stroke="${SCK.white}" stroke-width=".9"/>`
          + `<ellipse cx="1" cy="-.4" rx="4" ry="3" fill="${SCK.ink}"/><path d="M0-2.4q1 2 0 3.6M2.4-2.4q-1 2 0 3.6" stroke="${SCK.white}" stroke-width=".7" fill="none"/>`
          + `<circle cx="6" cy=".4" r="2" fill="${SCK.ink}"/><path d="M7.6 1.4l9 3.4M7.4-.8l5-3.6" stroke="${SCK.ink}" stroke-width="1"/></g>`;
    } },

  /* the 14-bis lifting off the lawn at Bagatelle: the box-kite cells of its wings, the long boom out to the canard cell, the aviator standing in his basket, the wheels just clear of the grass, the iron tower far off */
  catorze_bis: {
    label: 'Um aeroplano de células de pipa decola num gramado, com uma torre de ferro ao fundo',
    rx: /\b(14-bis|aeroplano|biplano)\b/,
    draw: () => {
      const R = v => Math.round(v * 10) / 10;
      const L = (a, b, t) => [R(a[0] + (b[0] - a[0]) * t), R(a[1] + (b[1] - a[1]) * t)];
      const cells = (t0, b0, t1, b1, n) => { let o = '', i = '';
        for (let k = 0; k < n; k++) { const q = [L(t0, t1, k / n), L(t0, t1, (k + 1) / n), L(b0, b1, (k + 1) / n), L(b0, b1, k / n)];
          const cx = (q[0][0] + q[1][0] + q[2][0] + q[3][0]) / 4, cy = (q[0][1] + q[1][1] + q[2][1] + q[3][1]) / 4;
          o += 'M' + q.map(p => p.join(' ')).join('L') + 'z';
          i += 'M' + q.map(p => R(cx + (p[0] - cx) * .64) + ' ' + R(cy + (p[1] - cy) * .56)).join('L') + 'z'; }
        return [o, i]; };
      const [lo, li] = cells([58, 34], [58, 45], [16, 26], [16, 37], 3), [ro, ri] = cells([58, 34], [58, 45], [100, 26], [100, 37], 3);
      return SCH.bg('#CFE0E8') + `<ellipse cx="30" cy="62" rx="40" ry="3" fill="${SCK.white}" opacity=".4"/>`
        + `<path d="M101 59q4-12 5.4-28l1.2-18 1.2 18q1.4 16 5.4 28h-3q-2-6-3.6-6t-3.6 6z" fill="#8EA3AE"/><path d="M103 45h9.4M105 31h5M106.4 22h2.4" stroke="#6E8592" stroke-width="1.2"/>`
        + `<path d="M0 60q20-4 40-1t40-1 40 1v22H0z" fill="#557A47"/><path d="M0 62h120v18H0z" fill="${SCK.green}"/>`
        + `<path d="M0 68h120M0 74h120" stroke="#87A570" stroke-width="2.4" opacity=".6"/>`
        + `<ellipse cx="56" cy="69" rx="20" ry="2.4" fill="#3E5A34" opacity=".5"/>`
        + SCH.g(`<path d="M50 45 48 55M54 45l2 10M62 45l-2 10M66 45l2 10" fill="none" stroke-width="1.2"/><circle cx="48" cy="56" r="3.4" fill="${SCK.wood}"/><circle cx="68" cy="56" r="3.4" fill="${SCK.wood}"/>`, 1.2)
        + SCH.g(`<path d="${lo}${ro}" fill="${SCK.white}"/><path d="${li}${ri}" fill="#C9BB98" stroke-width="1"/>`, 1.5)
        + SCH.g(`<path d="M24 16 56 35v6L24 22z" fill="${SCK.white}"/>`, 1.3) + `<path d="M28 18.4v5.4M33 21.4v5.4M38 24.4v5.4M43 27.4v5.4M48 30.4v5.4M28 23.8l5-2.4M33 26.8l5-2.4M38 29.8l5-2.4M43 32.8l5-2.4" stroke="${SCK.ink}" stroke-width=".8" opacity=".6"/>`
        + SCH.g(`<path d="M8 10h18v14H8z" fill="${SCK.white}"/><path d="M26 10l6 3v14l-6-3z" fill="#E4D9BE"/><path d="M8 10l6-3h18l-6 3z" fill="${SCK.white}"/><path d="M11.6 13.4h10.8v7.2H11.6z" fill="#C9BB98" stroke-width="1"/>`, 1.4)
        + SCH.g(`<path d="M53 44v-6h10v6z" fill="${SCK.ochre}"/><path d="M55.6 38v-5q0-2 2.4-2t2.4 2v5z" fill="${SCK.ink}"/><circle cx="58" cy="29" r="1.8" fill="#D9B48E" stroke-width="1"/><path d="M56 27.6h4v-1.6h-4z" fill="${SCK.ink}" stroke-width=".8"/>`, 1.2)
        + `<path d="M54 41h8" stroke="${SCK.ink}" stroke-width=".8" opacity=".6"/>`;
    } },

  /* Rondon's line across the cerrado: telegraph poles marching to the horizon with their sagging wires, twisted trees, red termite mounds, and a mule cart hauling a coil of wire */
  linha_telegrafica: {
    label: 'Postes de telégrafo atravessam o cerrado, entre árvores retorcidas e cupinzeiros',
    rx: /\b(telegrafo|telegrafica|telegraficas|postes)\b/,
    draw: () => {
      const R = v => Math.round(v * 10) / 10;
      const P = [[13, 82, 4], [46, 66, 24], [67, 58, 34.6], [82, 53.4, 40.6], [93, 50.6, 44], [101, 48.8, 46], [107, 47.6, 47], [112, 47, 47.4]];
      let poles = '', arms = '', ins = '', wires = '';
      P.forEach(([x, b, t], i) => { const h = b - t, w = R(Math.max(1.2, h * .07)), a = R(h * .22), ay = R(t + h * .07);
        poles += `M${R(x - w / 2)} ${b}V${t}h${w}V${b}z`; arms += `M${R(x - a)} ${ay}h${R(2 * a)}`;
        if (h > 12) ins += `M${R(x - a * .8)} ${ay}a${R(h * .025 + .4)} ${R(h * .025 + .4)} 0 1 0 .1 0zM${R(x + a * .8)} ${ay}a${R(h * .025 + .4)} ${R(h * .025 + .4)} 0 1 0 .1 0z`;
        if (i) { const [px, pb, pt] = P[i - 1], ph = pb - pt, pa = R(ph * .22), py = R(pt + ph * .07);
          for (const s of [-1, 1]) { const x1 = R(px + s * pa * .8), x2 = R(x + s * a * .8); wires += `M${x1} ${py}Q${R((x1 + x2) / 2)} ${R(Math.max(py, ay) + (pb - b) * .12 + 1)} ${x2} ${ay}`; } } });
      const tree = (x, y, s) => `<path d="M${x} ${y}q${R(-2.4 * s)} ${R(-5 * s)} ${R(.6 * s)} ${R(-9 * s)}t${R(-1.4 * s)} ${R(-9 * s)}M${R(x + .4 * s)} ${R(y - 9 * s)}q${R(4 * s)} ${R(-1 * s)} ${R(6 * s)} ${R(-7 * s)}M${R(x - .6 * s)} ${R(y - 14 * s)}l${R(-5 * s)} ${R(-3 * s)}" fill="none" stroke="#4A3220" stroke-width="${R(2.2 * s)}" stroke-linecap="round"/>`
        + SCH.g(`<path d="M${R(x - 13 * s)} ${R(y - 16 * s)}q${R(1 * s)} ${R(-5 * s)} ${R(7 * s)} ${R(-4 * s)} ${R(3 * s)} ${R(3 * s)} 0 ${R(5 * s)}t${R(-7 * s)} ${R(-1 * s)}zM${R(x - 6 * s)} ${R(y - 19 * s)}q${R(2 * s)} ${R(-6 * s)} ${R(8 * s)} ${R(-5 * s)} ${R(4 * s)} ${R(3 * s)} 0 ${R(6 * s)}t${R(-8 * s)} ${R(-1 * s)}zM${R(x + 2 * s)} ${R(y - 15 * s)}q${R(2 * s)} ${R(-6 * s)} ${R(8 * s)} ${R(-4 * s)} ${R(3 * s)} ${R(3 * s)} 0 ${R(5 * s)}t${R(-8 * s)} ${R(-1 * s)}z" fill="#6B7A40"/>`, 1.2);
      return SCH.bg('#CFDDE0') + `<ellipse cx="34" cy="14" rx="16" ry="2.6" fill="${SCK.white}" opacity=".7"/>`
        + `<path d="M0 46q14-5 30-3t30-2 30 2 30-1v6H0z" fill="#9FB096"/>`
        + `<path d="M0 46q30-2 60 0t60 0v34H0z" fill="#D8BA6C"/><path d="M0 62q40-6 80 0t40 2v16H0z" fill="#CBA85A"/>`
        + tree(58, 50, .6) + tree(118, 64, .9)
        + `<path d="${wires}" stroke="${SCK.ink}" stroke-width=".8" fill="none" opacity=".85"/>`
        + SCH.g(`<path d="${poles}" fill="#7A5232"/><path d="${arms}" stroke-width="1.6" fill="none"/>`, 1) + `<path d="${ins}" fill="${SCK.white}" stroke="${SCK.ink}" stroke-width=".6"/>`
        + SCH.g(`<path d="M22 78q2-12 5-14 3 1 6 14z" fill="#B9774A"/><path d="M88 62q1-7 3-8 2 1 3 8z" fill="#B9774A"/>`, 1.2)
        + `<path d="M26 70v4M29 68v6M91 58v2" stroke="${SCK.ink}" stroke-width=".8" opacity=".4"/>`
        + tree(34, 62, .8)
        + SCH.g(`<path d="M76 66h18v-5H76z" fill="${SCK.wood}"/><path d="M58 63q0-5 5-5h7q3 0 4-3l2 1q0 4-3 6v8h-2v-5h-9v5h-2z" fill="#8E7E6E"/><path d="M74 62h3" stroke-width="1.2" fill="none"/>
          <ellipse cx="85" cy="59.4" rx="6" ry="3" fill="none" stroke="#B87333" stroke-width="2.4"/><circle cx="85" cy="68" r="4.4" fill="#5A3E26"/>`, 1.2)
        + `<ellipse cx="85" cy="59.4" rx="6" ry="3" fill="none" stroke="${SCK.ink}" stroke-width=".6" opacity=".6"/><path d="M85 64.6v6.8M81.6 68h6.8" stroke="${SCK.ochre}" stroke-width=".9"/>`
        + `<path d="M6 72l1-4M10 74l-1-4M48 76l1-4M60 76l-1-3M100 74l1-4M106 78l-1-4" stroke="#8A6A2A" stroke-width="1" opacity=".7"/>`;
    } },

  /* the foyer of the Theatro Municipal, 1909: the marble flight up to the landing, the two curving flights to the gallery, gilded balustrades, bronze lamp-bearers on the newels and the stained-glass window glowing above */
  theatro_municipal: {
    label: 'O saguão de um teatro com escadaria de mármore em curva, vitrais e luminárias de bronze',
    rx: /\b(theatro municipal|teatro municipal|escadaria|saguao|vitral|vitrais)\b/,
    draw: () => {
      const id = SCH.uid('vt');
      const arch = 'M46 36V17a14 14 0 0 1 28 0v19z';
      const pc = [SCK.gold, SCK.teal, SCK.burg, SCK.sea, SCK.goldHi], pp = ['', '', '', '', ''];
      for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) pp[(r + c * 2) % 5] += `M${46 + c * 7} ${Math.round(30 + r * 56) / 10}h7v5.6h-7z`;
      const panes = pp.map((d, i) => `<path d="${d}" fill="${pc[i]}"/>`).join('');
      const bearer = x => `<g transform="translate(${x} 58)">` + SCH.g(`<path d="M-4.6 0h9.2v16h-9.2z" fill="${SCK.stone}"/><path d="M-2.6 0l.6-8q-1.4-3 .6-5l1.6-.2q2 2 .8 5l1 8zM.2-16.8a1.8 1.8 0 1 0 .1 0z" fill="#7A5A2E"/><path d="M1.4-12.6 3-20v-5M0-24.6h6" fill="none" stroke-width="1.2"/>
          <path d="M-1.9-26.4a1.9 1.9 0 1 0 3.8 0a1.9 1.9 0 1 0-3.8 0zM4.1-26.4a1.9 1.9 0 1 0 3.8 0a1.9 1.9 0 1 0-3.8 0zM1.1-29.4a1.9 1.9 0 1 0 3.8 0a1.9 1.9 0 1 0-3.8 0z" fill="#FFF6DC" stroke-width="1"/>`, 1.2) + `</g>`;
      return SCH.bg('#D7CCB2') + `<path d="M0 0h120v40H0z" fill="#CDBF9F"/>`
        + `<ellipse cx="60" cy="20" rx="24" ry="20" fill="#E9DDBF" opacity=".55"/>`
        + `<defs><clipPath id="${id}"><path d="${arch}"/></clipPath></defs><g clip-path="url(#${id})">${panes}</g>`
        + `<path d="M53 3v33M60 3v33M67 3v33M46 20h28M46 28h28" stroke="${SCK.ink}" stroke-width=".9" opacity=".7"/><circle cx="60" cy="17" r="4.4" fill="${SCK.goldHi}" stroke="${SCK.ink}" stroke-width="1"/>`
        + SCH.g(`<path d="${arch}" fill="none" stroke-width="1.6"/><path d="M43 36V16a17 17 0 0 1 34 0v20" fill="none" stroke="${SCK.goldLo}" stroke-width="2.4"/>`, 1.6)
        + SCH.g(`<path d="M-2 22h22q8 0 12 8l6 12H24L18 30q-2-3-6-3H-2zM122 22h-22q-8 0-12 8l-6 12h14l6-12q2-3 6-3h14z" fill="#E6DCC4"/>
          <path d="M24 42h72v4H24z" fill="${SCK.stone}"/>`, 1.4)
        + `<path d="M4 23.4v3.6M9 23.4v3.6M14 24v3.4M19 25.4l-1 3M23 28l-1.6 2.6M27 33l-2 2M31 38l-2 2M116 23.4v3.6M111 23.4v3.6M106 24v3.4M101 25.4l1 3M97 28l1.6 2.6M93 33l2 2M89 38l2 2" stroke="${SCK.ink}" stroke-width=".8" opacity=".5"/>`
        + `<path d="M-2 17h21q9 0 13 8l7 14M122 17h-21q-9 0-13 8l-7 14" fill="none" stroke="${SCK.gold}" stroke-width="2.2"/><path d="M-2 17h21q9 0 13 8l7 14M122 17h-21q-9 0-13 8l-7 14" fill="none" stroke="${SCK.ink}" stroke-width=".7"/>`
        + `<path d="M3 17v5M8 17v5M13 17v5M18 17v5M23 18.6l-1 4.4M27 21.6l-2 4M30 26l-2 4.4M33 31l-2 4M36 35.6l-2 4M117 17v5M112 17v5M107 17v5M102 17v5M97 18.6l1 4.4M93 21.6l2 4M90 26l2 4.4M87 31l2 4M84 35.6l2 4" stroke="${SCK.goldLo}" stroke-width="1.2"/>`
        + SCH.g(`<path d="M36 46h48l14 28H22z" fill="#EFE6D2"/>`, 1.6)
        + `<path d="M48 46h24l7 28H41z" fill="${SCK.burg}"/><path d="M48 46h24M48 46l-7 28M72 46l7 28" stroke="${SCK.goldLo}" stroke-width=".9" fill="none"/>`
        + `<path d="M34.6 49h50.8M32.8 52.6h54.4M30.6 57h58.8M28 62.4h64M25 68.4h70" stroke="${SCK.ink}" stroke-width="1" opacity=".55"/>`
        + `<path d="M34 41 22 60M86 41l12 19" stroke="${SCK.gold}" stroke-width="2.4"/><path d="M34 41 22 60M86 41l12 19" stroke="${SCK.ink}" stroke-width=".7"/>`
        + `<path d="M33 43.6v3.4M31 46.8v3.4M29 50v3.4M27 53.2v3.4M25 56.4v3.4M87 43.6v3.4M89 46.8v3.4M91 50v3.4M93 53.2v3.4M95 56.4v3.4" stroke="${SCK.goldLo}" stroke-width="1.2"/>`
        + bearer(20) + bearer(100)
        + `<path d="M0 74h120v6H0z" fill="#E6DCC4"/><path d="M0 74h120" stroke="${SCK.ink}" stroke-width="1.2"/><path d="M0 75.6h120M6 78.6h114" stroke="${SCK.stoneLo}" stroke-width="3" stroke-dasharray="6 6"/>`
        + SCH.g(`<path d="M0 0h7v74H0zM113 0h7v74h-7z" fill="#3F6E66"/><path d="M-1 6h9v3h-9zM112 6h9v3h-9z" fill="${SCK.gold}" stroke-width="1.1"/>`, 1.4)
        + `<path d="M2.6 12q2 14-.4 30t1 30M117.4 12q-2 14 .4 30t-1 30" stroke="#8FB3A8" stroke-width=".8" fill="none" opacity=".7"/>`;
    } },

  /* homage to the Modernist canvas of 1928: a huge bare leg and foot planted on the green, a paddle cactus crowned by a round lemon sun, flat planes of blue and green */
  abaporu: {
    label: 'Um pé gigante, um cacto e um sol redondo, em cores vivas',
    rx: /\b(abaporu|cacto|mandacaru)\b/,
    draw: () => SCH.bg('#5C8DB0') + `<path d="M60 0h60v40H60z" fill="#6E9CC0"/>`
      + `<path d="M0 58q40-10 70-6t50 0v28H0z" fill="#3F7A44"/><path d="M0 66q50-6 120 2v12H0z" fill="#6FA052"/>`
      + SCH.sun(88, 20, 13, '#F2C230') + `<circle cx="88" cy="20" r="13" fill="none" stroke="${SCK.ink}" stroke-width="1.8"/><circle cx="88" cy="20" r="8.4" fill="#F7DE7A"/><path d="M88 11.6v16.8M79.6 20h16.8M82 14l12 12M94 14 82 26" stroke="#E2AE22" stroke-width="1"/>`
      + SCH.g(`<path d="M86 76V48q0-4 3-4t3 4v28z" fill="#3C7A3A"/><ellipse cx="89" cy="38" rx="6.4" ry="9" fill="#4E9444"/>
        <ellipse cx="77" cy="52" rx="5.4" ry="8" fill="#4E9444" transform="rotate(-24 77 52)"/><ellipse cx="101" cy="50" rx="5.4" ry="8" fill="#4E9444" transform="rotate(26 101 50)"/>
        <ellipse cx="72" cy="40" rx="4" ry="6" fill="#5FA850" transform="rotate(-10 72 40)"/><ellipse cx="107" cy="38" rx="4" ry="6" fill="#5FA850" transform="rotate(12 107 38)"/>`, 1.6)
      + `<path d="M89 31v14M77 46v12M101 44v12M72 36v8M107 34v8" stroke="#2C5A2A" stroke-width="1" opacity=".7"/>`
      + SCH.g(`<path d="M0-2h38q10 22 4 44-2 8-4 14 14 2 26 7 6 3 5 7-1 4-10 4H16q-9 0-10-8 0-9 4-16Q2 36 0 16z" fill="#E3A47A"/>`, 2)
      + `<path d="M52 64.6q3 1 2.6 4M58 66q2.6 1 2.2 3.6M63 67.4q2 1 1.6 3M24 50q-4 6-2 14M30 10q4 14 2 30" stroke="${SCK.ink}" stroke-width="1.1" fill="none" opacity=".55"/>`
      + `<path d="M14 6q6 20 4 36" stroke="#F2C6A2" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>` },

  /* the composer's forest: a cello standing on its endpin on the pale river beach, the bow leaning on it, the rainforest wall on the far bank and red macaws flying over */
  violoncelo_floresta: {
    label: 'Um violoncelo de pé numa praia de rio, com a floresta tropical e araras ao fundo',
    rx: /\b(violoncelo|cello|violoncelos)\b/,
    draw: () => {
      const arara = (x, y, s, f) => `<g transform="translate(${x} ${y}) scale(${f ? -s : s} ${s})">` + SCH.g(`<path d="M-1-1-6-10l7 5z" fill="${SCK.sea}"/><path d="M-7 1-15 5l7-1.4zM-8 1q4-4 12-3 3 1 4 3-6 2-16 0zM-2 0 0-7l5 5z" fill="${SCK.red}"/>`, .9) + `</g>`;
      return SCH.bg('#DCE6DC') + `<ellipse cx="96" cy="8" rx="20" ry="3" fill="${SCK.white}" opacity=".6"/>`
        + SCH.g(`<path d="M-2 48V30q6-6 12-3 3-8 11-6 6-5 12 0 6-6 13-1 5-9 13-4 7-2 9 4 6-4 12 0 5-7 12-2 6-3 10 2 5-3 10 2V48z" fill="#3F6B34"/>`, 1.4)
        + `<path d="M6 32q4-3 8 0M22 26q4-3 8 0M48 24q4-3 8 0M70 22q4-3 8 0M92 26q4-3 8 0M106 30q4-3 8 0M34 32q4-3 8 0M80 32q4-3 8 0" stroke="#7FA86A" stroke-width="1.3" fill="none"/>`
        + `<path d="M14 40v8M40 38v10M66 36v12M98 38v10" stroke="#2A4A22" stroke-width="1.2" opacity=".8"/>`
        + `<path d="M-2 48h124v12H-2z" fill="#5E8AA0"/><path d="M4 52h14M30 55h18M70 52h12M94 56h16" stroke="${SCK.white}" stroke-width="1.2" opacity=".7"/>`
        + SCH.g(`<path d="M-2 82V60q30-4 62-2t62 4v20z" fill="#EADBB4"/>`, 1.4)
        + `<path d="M10 70q4-1 8 0M86 72q4-1 8 0M98 66q4-1 8 0" stroke="${SCK.ochre}" stroke-width="1" fill="none"/>`
        + `<ellipse cx="62" cy="76" rx="18" ry="2.6" fill="${SCK.ochre}" opacity=".55"/>`
        + arara(84, 14, .9) + arara(102, 10, .8) + arara(112, 22, .7) + arara(72, 6, .6)
        + SCH.g(`<path d="M52 74.6v4.4" stroke-width="1.4" fill="none"/>
          <path d="M52 32q-10 0-10 8 0 4 2 7-3 3-3 7 1 3-3 7-3 4-3 8 0 6 9 7h16q9-1 9-7 0-4-3-8-4-4-3-7 0-4-3-7 2-3 2-7 0-8-10-8z" fill="#9A4E24"/>
          <path d="M50.6 34V12h2.8v22z" fill="#2E2218"/><path d="M50.4 12q-1-3 1.6-6 3-1.4 3.6 1.6.4 2.4-2 2.8-1.6-.4-1.2-1.6" fill="#7A3E1C" stroke-width="1.2"/>
          <path d="M49 52v-18h6v18z" fill="#2E2218" stroke-width="1"/><path d="M48 66h8l-1.4 7h-5.2z" fill="#2E2218" stroke-width="1"/>`, 1.6)
        + `<path d="M46.4 61h11.2" stroke="${SCK.sand}" stroke-width="1.8"/><path d="M50.8 14v47M51.6 14v47M52.4 14v47M53.2 14v47" stroke="#E9DDBF" stroke-width=".4"/>`
        + `<path d="M50.4 16l-1.6-1M50.4 19l-1.6-1M53.6 16l1.6-1M53.6 19l1.6-1" stroke="${SCK.ink}" stroke-width="1"/>`
        + `<path d="M45 54q-1 3 0 6t0 6M59 54q1 3 0 6t0 6" stroke="#2E2218" stroke-width="1.1" fill="none"/>`
        + `<path d="M44 40q2-4 6-5M45 63q0 5 3 7" stroke="#C47A44" stroke-width="1.2" fill="none" opacity=".8"/>`
        + SCH.g(`<path d="M84 77 61 33" stroke="#5A3420" stroke-width="1.6" fill="none"/><path d="M82.4 77.4 60 34.4" stroke="#F1E9D4" stroke-width="1" fill="none"/>`, 1)
        + SCH.g(`<path d="M81 72h4l2 4h-4z" fill="#2E2218"/>`, 1);
    } },

  /* the uprooted family on the dry road: a man with a bundle on a stick, a woman with a sack on her head and a baby in her arm, two children, a bare tree, cracked earth, the pale sun and the circling vultures */
  retirantes_cafe: {
    label: 'Uma família de retirantes com trouxas caminhando por uma terra seca',
    rx: /\b(retirantes|retirante|terra seca|seca)\b/,
    draw: () => {
      const legs = (x, y, h, w, c) => `<path d="M${x - 1.6} ${y}l${(-h * .28).toFixed(1)} ${h}M${x + 1.6} ${y}l${(h * .2).toFixed(1)} ${h}" stroke="${c}" stroke-width="${w}" fill="none"/>`;
      return SCH.bg('#E8DEC4') + SCH.sun(96, 14, 10, '#F4EAD0') + SCH.sun(96, 14, 6.4, '#FAF4E4')
        + `<path d="M58 10q2.4-2.4 4.8 0 2.4-2.4 4.8 0M76 20q1.8-1.8 3.6 0 1.8-1.8 3.6 0M46 18q1.6-1.6 3.2 0 1.6-1.6 3.2 0" stroke="${SCK.ink}" stroke-width="1.3" fill="none"/>`
        + `<path d="M0 44q16-8 34-4t30-2 30 0 26-2v10H0z" fill="#C2AE88"/>`
        + `<path d="M0 46q60-4 120 0v34H0z" fill="#CFA466"/>`
        + `<path d="M0 66q60-8 120-6v8q-60 0-120 6z" fill="#E2C690"/>`
        + `<path d="M2 52l8 2 4-3 10 1M88 56l8-3 10 2M98 50l6 2M4 78l10-2 6 3M30 79l6-4 10 1M58 78l8 2 6-3M84 78l10-3 8 3 10-1" stroke="${SCK.ink}" stroke-width=".9" fill="none" opacity=".4"/>`
        + `<path d="M106 66q-1-12 1-20-4-6-10-8M107 52q3-6 9-8M106 46q2-8 0-14M106 38q-4-2-6-6M106 34l4-6M98 38l-4-1M115 44l4-4" stroke="#5A4636" stroke-width="2.2" fill="none" stroke-linecap="round"/>`
        + `<path d="M106 66q-1-12 1-20" stroke="#5A4636" stroke-width="3.6" fill="none"/>`
        + `<ellipse cx="48" cy="72" rx="40" ry="2.6" fill="#B8925A" opacity=".55"/>`
        + SCH.g(legs(24, 52, 19, 3.4, '#6A5A4A') + legs(48, 60, 11, 2.6, '#7A4E30') + legs(68, 58, 14, 2.6, '#6A5A4A') + legs(84, 62, 10, 2.2, '#7A4E30'), 1)
        + SCH.g(`<path d="M18 53l-1-13q0-6 7-6t7 6l-1 13z" fill="#EFE6D0"/><circle cx="24" cy="30" r="3.6" fill="#7A4E30"/><path d="M15.6 27.6h16.8M19.6 27.6q0-5 4.4-5t4.4 5z" fill="${SCK.ochre}"/>
          <path d="M27 36q6-4 10 2 4 8-1 14-6 1-9-3z" fill="${SCK.stone}"/><path d="M27 38l3-3" fill="none" stroke-width="1.6"/>
          <path d="M42 62l1-16q0-7 5-7t5 7l1 16z" fill="${SCK.burg}"/><circle cx="48" cy="34" r="3.2" fill="#7A4E30"/><path d="M44.4 33q0-5 3.6-5t3.6 5l1 3-1.6-2q-3-2.4-6 0l-1.6 2z" fill="${SCK.white}"/>
          <path d="M40 27q1-7 8-7t8 7z" fill="#E9DDBF"/><path d="M44 44q-4 2-3 6t6 3 3-5-6-4z" fill="${SCK.white}"/>
          <path d="M64 58v-9q0-4 4-4t4 4v9z" fill="${SCK.stone}"/><circle cx="68" cy="41.6" r="2.6" fill="#7A4E30"/>
          <path d="M81 62v-6q0-3 3-3t3 3v6z" fill="${SCK.white}"/><circle cx="84" cy="50" r="2.2" fill="#7A4E30"/>`, 1.3)
        + `<path d="M53 48l11 3M71 50l10 4" stroke="${SCK.ink}" stroke-width="1.2" opacity=".75"/>`;
    } },

  /* the oil of the coast: a steel lattice derrick with black oil gushing from its crown, the white storage tanks and the refinery stack behind, palms and the sea */
  torre_petroleo: {
    label: 'Uma torre de petróleo de aço sobre um poço jorrando',
    rx: /\b(petroleo|torre de petroleo|refinaria|poco)\b/,
    draw: () => {
      const R = v => Math.round(v * 10) / 10;
      const X = (y, s) => R(52 + s * (2.6 + (y - 12) * .23));
      let lat = '';
      const ys = [16, 25, 35, 46, 58, 70];
      for (let i = 0; i < ys.length; i++) { lat += `M${X(ys[i], -1)} ${ys[i]}H${X(ys[i], 1)}`; if (i) lat += `M${X(ys[i - 1], -1)} ${ys[i - 1]}L${X(ys[i], 1)} ${ys[i]}M${X(ys[i - 1], 1)} ${ys[i - 1]}L${X(ys[i], -1)} ${ys[i]}`; }
      const palm = (x, y, h) => `<path d="M${x} ${y}q1-${h / 2} 3-${h}" stroke="#5A3E26" stroke-width="1.8" fill="none"/><path d="M${x + 3} ${y - h}q-6-3-9 1M${x + 3} ${y - h}q6-3 9 1M${x + 3} ${y - h}q-4-5-8-4M${x + 3} ${y - h}q4-5 8-4M${x + 3} ${y - h}q1-5 3-6" stroke="#3E6A34" stroke-width="2" fill="none" stroke-linecap="round"/>`;
      return SCH.bg('#CFE3E6')
        + `<path d="M0 50h120v8H0z" fill="${SCK.sea}"/><path d="M76 52h14M100 54h12" stroke="${SCK.white}" stroke-width="1" opacity=".7"/>`
        + `<path d="M98 20q-6-4-2-9t-2-10M106 14q4-4 0-8" stroke="#8C8C86" stroke-width="3.4" fill="none" stroke-linecap="round" opacity=".7"/>`
        + SCH.g(`<path d="M96 56V22h5v34z" fill="${SCK.stone}"/><path d="M96 26h5M96 31h5" stroke="${SCK.red}" stroke-width="1.6"/>
          <path d="M72 58V48q0-2.4 9-3 9 .6 9 3v10zM88 58V50q0-2 8-2.6 8 .6 8 2.6v8zM104 58V52q0-1.6 7-2 7 .4 7 2v6z" fill="${SCK.white}"/>`, 1.3)
        + `<path d="M72 52h18M88 53h16M104 54.6h14" stroke="${SCK.ink}" stroke-width=".8" opacity=".5"/>`
        + `<path d="M0 56q30-3 60 0t60 0v24H0z" fill="#8FA86A"/><path d="M0 64q60-6 120 0v16H0z" fill="${SCK.green}"/>`
        + palm(8, 62, 22) + palm(20, 60, 16) + palm(112, 66, 20)
        + `<path d="M34 72h36l2 4H32z" fill="${SCK.stoneLo}" stroke="${SCK.ink}" stroke-width="1.4" stroke-linejoin="round"/>`
        + `<path d="${lat}" stroke="${SCK.ink}" stroke-width="1" fill="none" opacity=".85"/>`
        + `<path d="M${X(10, -1)} 10L${X(72, -1)} 72M${X(10, 1)} 10L${X(72, 1)} 72" stroke="${SCK.ink}" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M${X(10, -1)} 10L${X(72, -1)} 72M${X(10, 1)} 10L${X(72, 1)} 72" stroke="${SCK.stone}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`
        + SCH.g(`<path d="M48 12h8v-4h-8z" fill="${SCK.stone}"/>`, 1.3)
        + `<path d="M52 8C50 2 40-2 30 4 24 8 22 16 20 26M52 8c2-6 12-10 22-4 6 4 8 12 10 22M52 8V0" stroke="#1E1712" stroke-width="4.4" fill="none" stroke-linecap="round"/>`
        + `<path d="M52 8C48 3 42 2 36 6 30 10 28 18 28 30M52 8c4-5 10-6 16-2 6 4 8 12 8 24" stroke="#1E1712" stroke-width="2" fill="none" stroke-linecap="round"/>`
        + `<path d="M19 31a1.4 1.4 0 1 0 .1 0zM23 36a1.2 1.2 0 1 0 .1 0zM27.4 34a1.2 1.2 0 1 0 .1 0zM85 31a1.4 1.4 0 1 0 .1 0zM81 36a1.2 1.2 0 1 0 .1 0zM76.4 35a1.2 1.2 0 1 0 .1 0zM18 40a1.2 1.2 0 1 0 .1 0zM86 41a1.2 1.2 0 1 0 .1 0z" fill="#1E1712"/>`
        + `<path d="M40 76q4-3 10-2t14-1 8 3z" fill="#1E1712"/>`;
    } },

  /* the coup of 1964: an olive tank on the wide avenue between the modern slab blocks, a jeep behind it, helmeted soldiers on guard on the empty pavements */
  tanques_1964: {
    label: 'Tanques e soldados ocupam uma avenida de uma grande cidade',
    rx: /\b(tanque|tanques|blindado|blindados)\b/,
    draw: () => {
      const sol = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">` + SCH.g(`<path d="M-2.4 0v-9q0-3 2.4-3t2.4 3V0z" fill="#5E6B3A"/><path d="M-2.6-12.6q0-3.4 2.6-3.4t2.6 3.4z" fill="#46512A"/><path d="M3.4-14V2" stroke-width="1.2" fill="none"/>`, 1) + `</g>`;
      const R = v => Math.round(v * 10) / 10;
      let bands = '', mul = '', pil = '';
      for (const [x0, x1, a0, a1, b0, b1] of [[0, 44, 0, 26, 62, 44], [120, 76, 6, 30, 62, 44]]) {
        const yl = f => R(a0 + f * (b0 - a0)), yr = f => R(a1 + f * (b1 - a1));
        for (let i = 0; i < 7; i++) { const f0 = .06 + i * .115, f1 = f0 + .06; bands += `M${x0} ${yl(f0)}L${x1} ${yr(f0)}V${yr(f1)}L${x0} ${yl(f1)}z`; }
        for (const t of [.25, .5, .75]) { const x = R(x0 + t * (x1 - x0)); mul += `M${x} ${R(a0 + t * (a1 - a0))}V${R(b0 + t * (b1 - b0) - (b0 - a0 + t * (b1 - a1 - b0 + a0)) * .12)}`; }
        pil += `M${x0} ${yl(.88)}L${x1} ${yr(.88)}V${b1}L${x0} ${b0}z`; }
      return SCH.bg('#C9D3D6')
        + SCH.g(`<path d="M46 44V18h8v26zM55 44V24h10v20zM66 44V14h7v30z" fill="#B7B2A4"/>`, 1)
        + SCH.g(`<path d="M0 0 44 26V44L0 62z" fill="${SCK.stone}"/><path d="M120 6 76 30V44l44 18z" fill="#D9D1BC"/>`, 1.4)
        + `<path d="${bands}" fill="#5E7480"/><path d="${pil}" fill="#6E6A60"/><path d="${mul}" stroke="${SCK.ink}" stroke-width=".8" opacity=".5"/>`
        + `<path d="M0 62 44 44h32l44 18v18H0z" fill="#8E8A80"/><path d="M0 62 44 44 40 44 0 58zM120 62 76 44h4l40 14z" fill="#D8D0BC"/>`
        + `<path d="M60 46v2M60 51v3M60 58v4M60 67v6" stroke="${SCK.white}" stroke-width="1.4" opacity=".8"/>`
        + sol(10, 66, 1.2) + sol(36, 50, .7) + sol(100, 60, 1) + sol(110, 63, 1.1)
        + SCH.g(`<path d="M80 60v-6l3-4h10l2 4h6v6z" fill="#5E6B3A"/><path d="M84 50l2-4h6" fill="none" stroke-width="1.2"/>`, 1.3)
        + `<circle cx="85" cy="61" r="2.6" fill="${SCK.ink}"/><circle cx="97" cy="61" r="2.6" fill="${SCK.ink}"/>`
        + SCH.g(`<path d="M20 62h58q7 0 7 6.4t-7 6.4H24q-6 0-8-6.4z" fill="#3A3A30"/>
          <path d="M14 62l5-8h60l7 8z" fill="#5E6B3A"/><path d="M36 54l4-9h26l5 9z" fill="#6B7A44"/><path d="M50 45v-3h8v3z" fill="#5E6B3A"/>
          <path d="M40 48H6v3.4h34z" fill="#5E6B3A"/><path d="M4 47.2h5v5H4z" fill="#46512A"/>`, 1.5)
        + SCH.g(`<circle cx="27" cy="68.4" r="4" fill="#5E6B3A"/><circle cx="38" cy="68.4" r="4" fill="#5E6B3A"/><circle cx="49" cy="68.4" r="4" fill="#5E6B3A"/><circle cx="60" cy="68.4" r="4" fill="#5E6B3A"/><circle cx="71" cy="68.4" r="4" fill="#5E6B3A"/>`, 1.1)
        + `<path d="M20 64h60M40 57h30" stroke="${SCK.ink}" stroke-width=".8" opacity=".5"/><path d="M58 42V22" stroke="${SCK.ink}" stroke-width=".9"/>`;
    } },

  /* the rubber forest: a great seringueira trunk scored with diagonal tapping cuts, white latex running down into a little cup, the tapper's lamp-cap and hooked knife hanging on it, the dense green forest behind */
  seringueiro: {
    label: 'Uma seringueira com cortes no tronco e uma tigelinha recolhendo o látex',
    rx: /\b(seringueira|seringueiras|seringa|latex|borracha)\b/,
    draw: () => {
      let sc = '', sh = '';
      for (let i = 0; i < 6; i++) { const y = 8 + i * 4.8; sc += `M41 ${y.toFixed(1)}L69 ${(y + 11.6).toFixed(1)}`; sh += `M41 ${(y + 1.4).toFixed(1)}L69 ${(y + 13).toFixed(1)}`; }
      const lv = L => L.map(([x, y, k]) => `M${x} ${y}q${Math.round(40 * k) / 10} ${Math.round(-70 * k) / 10} ${Math.round(120 * k) / 10} ${Math.round(-60 * k) / 10}q${Math.round(-30 * k) / 10} ${Math.round(60 * k) / 10} ${Math.round(-120 * k) / 10} ${Math.round(60 * k) / 10}z`).join('');
      return SCH.bg('#2B4428')
        + `<path d="M5-2h7v84H5zM102-2h6v84h-6zM113-2h5v84h-5z" fill="#20331D"/>`
        + `<g stroke="#1E3018" stroke-width=".8"><path d="${lv([[-2, 12, 1.4], [-4, 46, 1.3], [96, 28, 1.2], [90, 78, 1.2]])}" fill="#4E7A3E"/><path d="${lv([[10, 30, 1.1], [-2, 78, 1.4], [88, 10, 1.3], [98, 60, 1.3]])}" fill="#5E8C4A"/>`
        + `<path d="${lv([[8, 62, 1.2], [86, 46, 1.1], [18, 6, .9], [104, 4, .8]])}" fill="#6E9A54"/><path d="${lv([[20, 74, .9], [100, 44, .9]])}" fill="#86A86A"/></g>`
        + SCH.g(`<path d="M34-2h48q-2 40 0 64 2 10 12 20H22q10-10 12-20 2-24 0-64z" fill="#8C7A62"/>`, 1.8)
        + `<path d="M37 4q1 30-1 56M79 4q-1 30 1 56M38 64q-2 10-10 16M78 64q2 10 10 16" stroke="#5E5040" stroke-width="1" fill="none" opacity=".7"/>`
        + `<path d="M40 4h30v2.4H40z" fill="#7A6A54"/>`
        + `<path d="${sh}" stroke="#B5A386" stroke-width=".8" fill="none"/><path d="${sc}" stroke="#4A3828" stroke-width="1.6" fill="none"/>`
        + SCH.g(`<path d="M41 37.6 69 49.2v3L41 40.6z" fill="#F6EEDA"/>`, 1.1)
        + `<path d="M43 40.6 68.6 51.4" stroke="${SCK.white}" stroke-width="1.6"/><path d="M69 8v41.6" stroke="#4A3828" stroke-width="1.4"/><path d="M69 51v8" stroke="${SCK.white}" stroke-width="2.2"/>`
        + `<path d="M66.6 56.4h5" stroke="#C3C8CE" stroke-width="1.8"/>`
        + SCH.g(`<path d="M62 61h14l-1.8 8q-5.2 2.4-10.4 0z" fill="#9C8A72"/><ellipse cx="69" cy="61" rx="7" ry="1.8" fill="${SCK.white}"/>`, 1.4)
        + `<circle cx="36" cy="30" r="1.4" fill="${SCK.ink}"/><path d="M36 30 24 42M36 30l4 10" stroke="${SCK.ink}" stroke-width="1" fill="none"/>`
        + SCH.g(`<path d="M16 50q0-10 12-10t12 10z" fill="#5A4636"/><path d="M13 50h28v3H13z" fill="#4A3828"/><path d="M33 42v-8h7v8z" fill="#B9B2A0"/><path d="M34.6 34v-5h3.8v5z" fill="#8C8A80"/><path d="M40 39h3" fill="none" stroke-width="1.4"/>`, 1.3)
        + `<path d="M36.4 41q-1.6-3 0-5 1.6 2 0 5z" fill="${SCK.goldHi}"/><path d="M20 46q2-4 6-5" stroke="#8A7462" stroke-width="1.2" fill="none"/>`
        + `<circle cx="80" cy="20" r="1.2" fill="${SCK.ink}"/><path d="M80 20l3 4" stroke="${SCK.ink}" stroke-width="1"/>`
        + SCH.g(`<path d="M81.6 24h3.4v12h-3.4z" fill="${SCK.wood}"/><path d="M83.3 36v6q0 3-3 3" fill="none" stroke="#C3C8CE" stroke-width="2"/>`, 1.1);
    } },

  /* the opera house of the rubber boom: the rose façade with its white columns and pediment, the great dome tiled in green, gold and blue, the wavy black-and-white mosaic of the square, palms and the river */
  teatro_amazonas: {
    label: 'Um teatro de ópera de cúpula colorida no meio da cidade da floresta',
    rx: /\b(teatro amazonas|manaus|cupula colorida)\b/,
    draw: () => {
      const id = SCH.uid('cp');
      let tiles = '';
      const tc = ['#3E8A4A', SCK.gold, '#3F6FA8'];
      const tp = ['', '', ''];
      for (let i = 0; i < 12; i++) { const x = Math.round(400 + i * 34) / 10; tp[i % 3] += `M${x} 40L${Math.round(x * 10 + 40) / 10} 6h3.4L${Math.round(x * 10 + 34) / 10} 40z`; }
      tiles = tp.map((d, i) => `<path d="${d}" fill="${tc[i]}"/>`).join('');
      const palm = (x, h, f) => `<path d="M${x} 66q${f}-${h / 2} ${f * 2}-${h}" stroke="#7A6A56" stroke-width="2.4" fill="none"/>` + SCH.g(`<path d="M${x + f * 2} ${66 - h}q-8-4-12 2 6-2 12-2zM${x + f * 2} ${66 - h}q8-4 12 2-6-2-12-2zM${x + f * 2} ${66 - h}q-5-7-11-6 6 1 11 6zM${x + f * 2} ${66 - h}q5-7 11-6-6 1-11 6zM${x + f * 2} ${66 - h}q0-7 3-9-1 4-3 9z" fill="#3E6A34"/>`, 1);
      return SCH.bg('#CFE3E6')
        + `<path d="M0 52h120v8H0z" fill="${SCK.sea}"/><path d="M0 52q10-3 20 0M100 52q10-3 20 0" stroke="#3E6A34" stroke-width="3" fill="none"/>`
        + `<defs><clipPath id="${id}"><path d="M42 36q0-24 18-24t18 24z"/></clipPath></defs><g clip-path="url(#${id})">${tiles}</g>`
        + SCH.g(`<path d="M42 36q0-24 18-24t18 24z" fill="none"/><path d="M56 12V6h8v6z" fill="${SCK.white}"/><path d="M55 6l5-4 5 4z" fill="${SCK.gold}"/>`, 1.6)
        + `<path d="M44 30q16-4 32 0M48 22q12-3 24 0" stroke="${SCK.ink}" stroke-width=".8" fill="none" opacity=".5"/>`
        + SCH.g(`<path d="M16 64V40h88v24z" fill="#D9908A"/><path d="M14 40h92v-4H14z" fill="${SCK.white}"/><path d="M36 40 60 26l24 14z" fill="#D9908A"/><path d="M33 40.4 60 24.6l27 15.8" fill="none" stroke-width="1.4"/>`, 1.6)
        + `<path d="M50 36q10-5 20 0" stroke="${SCK.white}" stroke-width="1.2" fill="none"/>`
        + SCH.g(`<path d="M39 64V42h3v22zM47 64V42h3v22zM55 64V42h3v22zM62 64V42h3v22zM70 64V42h3v22zM78 64V42h3v22z" fill="${SCK.white}"/>`, 1)
        + `<path d="M36 42h48M36 52h48" stroke="${SCK.white}" stroke-width="1.6"/>`
        + `<path d="M20 50v-5q2-3 4-0v5zM28 50v-5q2-3 4 0v5zM88 50v-5q2-3 4 0v5zM96 50v-5q2-3 4 0v5zM20 63v-6q2-3 4 0v6zM28 63v-6q2-3 4 0v6zM88 63v-6q2-3 4 0v6zM96 63v-6q2-3 4 0v6z" fill="#5A2A2A"/>`
        + `<path d="M43 64v-6q1.6-2.4 3.2 0v6zM51 64v-6q1.6-2.4 3.2 0v6zM66 64v-6q1.6-2.4 3.2 0v6zM74 64v-6q1.6-2.4 3.2 0v6z" fill="#5A2A2A"/>`
        + `<path d="M0 64h120v16H0z" fill="${SCK.white}"/><path d="M0 64h120" stroke="${SCK.ink}" stroke-width="1.4"/>`
        + `<path d="M-4 68q8-3 16 0t16 0 16 0 16 0 16 0 16 0 16 0 16 0M-4 74q8-3 16 0t16 0 16 0 16 0 16 0 16 0 16 0 16 0M-4 80q8-3 16 0t16 0 16 0 16 0 16 0 16 0 16 0 16 0" stroke="#2A2620" stroke-width="2.4" fill="none"/>`
        + palm(6, 46, 1) + palm(112, 44, -1);
    } },

  /* a night class in a country room: the kerosene lamp glowing, adults on a bench with notebooks on their knees, and on the little blackboard a chalk drawing of a house and a brick */
  alfabetizacao: {
    label: 'Adultos aprendem a ler à luz de um lampião, com lousa e cartilhas',
    rx: /\b(lousa|alfabetizacao|cartilha|cartilhas|lampiao)\b/,
    draw: () => {
      const back = (x, c, hat) => SCH.g(`<path d="M${x - 7} 62q0-16 7-17t7 17z" fill="${c}"/><circle cx="${x}" cy="40" r="4.4" fill="#5A3A26"/>`
        + (hat ? `<path d="M${x - 8} 37.6h16M${x - 4.4} 37.6q0-6 4.4-6t4.4 6z" fill="${SCK.ochre}"/>` : `<path d="M${x - 4.6} 39q0-6 4.6-6t4.6 6l-1 2q-3.6-4-7.2 0z" fill="#2A1D10"/>`)
        + `<path d="M${x + 4} 54l8-2v4l-8 1z" fill="${SCK.white}" stroke-width="1"/>`, 1.4);
      return SCH.bg('#26324A') + `<path d="M0 64h120v16H0z" fill="#4A3424"/><path d="M0 70h120M0 76h120" stroke="#2A1D10" stroke-width=".8" opacity=".6"/>`
        + `<circle cx="50" cy="26" r="36" fill="${SCK.goldHi}" opacity=".12"/><circle cx="50" cy="26" r="24" fill="${SCK.goldHi}" opacity=".16"/><circle cx="50" cy="26" r="12" fill="${SCK.goldHi}" opacity=".25"/>`
        + `<path d="M0 6h120" stroke="#4A3424" stroke-width="5"/><path d="M0 8.4h120" stroke="${SCK.ink}" stroke-width=".8"/>`
        + SCH.g(`<path d="M6 16h18v20H6z" fill="#1A2238"/><path d="M15 16v20M6 26h18" fill="none" stroke="#5A4636" stroke-width="1.6"/>`, 1.4) + SCH.star(10, 20, 1.6, SCK.goldHi) + SCH.star(20, 30, 1.2, SCK.goldHi)
        + `<path d="M50 8.4v8" stroke="${SCK.ink}" stroke-width="1"/>`
        + SCH.g(`<path d="M46 30h8l-1 3h-6z" fill="${SCK.goldLo}"/><path d="M47.4 30q-1.4-6 2.6-9 4 3 2.6 9z" fill="#FFF6DC"/><path d="M47 21h6v-2h-6zM46.4 16.4h7.2l-.8 2.6h-5.6z" fill="${SCK.goldLo}"/>`, 1.2)
        + `<path d="M50 27.6q-1.4-2 0-4 1.4 2 0 4z" fill="${SCK.gold}"/>`
        + SCH.g(`<path d="M74 16h40v28H74z" fill="#2E3B32" stroke="#8A5A34" stroke-width="2.4"/><path d="M72 44h44v2H72z" fill="#8A5A34"/>`, 1.4)
        + `<path d="M80 34l8-7 8 7v6H80zM86 40v-4h4v4M80 34h16" stroke="#EDE6D6" stroke-width="1.2" fill="none" stroke-linejoin="round"/><path d="M100 30h10v8h-10zM100 34h10M105 30v4M102 34v4M108 34v4" stroke="#EDE6D6" stroke-width="1.1" fill="none"/>`
        + back(22, '#E9DDBF', true) + back(42, SCK.burg) + back(62, '#C9A66B', true)
        + SCH.g(`<path d="M8 62h68v4H8z" fill="${SCK.wood}"/><path d="M12 66v8M72 66v8" stroke-width="2.4"/>`, 1.4)
        + `<path d="M16 50q4-3 8 0M36 52q4-3 8 0M56 50q4-3 8 0" stroke="${SCK.goldHi}" stroke-width="1" fill="none" opacity=".55"/>`;
    } },

  /* the writer's desk: a portable typewriter with a blank sheet in the roller, a cup of coffee, and the open window over the seafront with its palms */
  maquina_escrever: {
    label: 'Uma máquina de escrever portátil numa escrivaninha, junto a uma janela sobre o mar',
    rx: /\b(maquina de escrever|datilografia)\b/,
    draw: () => {
      let keys = '';
      for (let r = 0; r < 3; r++) for (let k = 0; k < 9 - r; k++) keys += `M${(37 + r * 2.6 + k * 5).toFixed(1)} ${54 - r * 4.4}a1.6 1.6 0 1 0 .1 0z`;
      return SCH.bg('#E9DDBF')
        + SCH.g(`<path d="M30 4h80v42H30z" fill="#BFD8E0"/>`, 1.8)
        + `<path d="M31 30h78v15H31z" fill="${SCK.sea}"/><path d="M31 29q20-6 40-3t38-6v10H31z" fill="#6E9A62"/><path d="M31 41q40-4 78-2v6H31z" fill="#EADBB4"/>`
        + `<path d="M34 34h10M60 36h12M88 33h10" stroke="${SCK.white}" stroke-width="1" opacity=".8"/>`
        + `<path d="M98 40q1-10 3-16M101 24q-5-2-8 1M101 24q5-2 8 1M101 24q-3-4-7-3M101 24q3-4 7-3M40 41q0-8 2-12M42 29q-4-2-7 1M42 29q4-2 7 1M42 29q-2-4-6-3" stroke="#2E5A2C" stroke-width="1.6" fill="none" stroke-linecap="round"/>`
        + `<path d="M70 4v42M30 22h80" stroke="${SCK.white}" stroke-width="2.4"/><path d="M70 4v42M30 22h80" stroke="${SCK.ink}" stroke-width=".6" opacity=".5"/>`
        + SCH.g(`<path d="M18 2h12q2 20-2 44H18z" fill="${SCK.burg}"/>`, 1.4) + `<path d="M22 6q2 18 0 38M26 6q1 18-1 38" stroke="#5A1428" stroke-width="1" fill="none"/>`
        + SCH.g(`<path d="M-2 56h124v6H-2z" fill="${SCK.wood}"/><path d="M-2 62h124v20H-2z" fill="#6E4426"/>`, 1.6)
        + `<path d="M0 70h120" stroke="${SCK.ink}" stroke-width=".8" opacity=".4"/>`
        + SCH.g(`<path d="M44 34V12h26v22z" fill="${SCK.white}"/>`, 1.3) + `<path d="M48 17h18M48 21h18M48 25h18M48 29h12" stroke="${SCK.sea}" stroke-width=".8" opacity=".6"/>`
        + SCH.g(`<path d="M30 60l4-20h46l4 20z" fill="#2E2A2C"/><path d="M28 32h58v6H28z" fill="#2E2A2C"/><path d="M26 33.4h4v3h-4zM84 33.4h4v3h-4z" fill="#C3C8CE" stroke-width="1"/>
          <path d="M22 30l6 4" fill="none" stroke="#C3C8CE" stroke-width="1.8"/><path d="M40 40l3-4h28l3 4z" fill="${SCK.burg}" stroke-width="1"/>`, 1.5)
        + `<path d="${keys}" fill="${SCK.white}" stroke="${SCK.ink}" stroke-width=".7"/><path d="M42 58h30" stroke="${SCK.white}" stroke-width="1.6"/>`
        + SCH.g(`<path d="M94 56v-9h10v6q0 3-3 3z" fill="${SCK.white}"/><path d="M104 49q4 0 3 3t-3 2" fill="none" stroke-width="1.3"/><path d="M90 56h18l-2 2h-14z" fill="${SCK.white}" stroke-width="1.1"/>`, 1.3)
        + `<path d="M97 44q-2-3 0-5t0-5M101 43q2-3 0-5" stroke="${SCK.white}" stroke-width="1.2" fill="none" opacity=".9"/>`;
    } },

  /* the poet's road: one big round stone sitting in the middle of a red-earth road that winds between the green hills of Minas, a little white church on a far hill */
  pedra_caminho: {
    label: 'Uma pedra no meio de uma estrada de terra entre montanhas',
    rx: /\b(pedra|caminho|estrada de terra)\b/,
    draw: () => SCH.bg('#D3E2E4') + `<ellipse cx="30" cy="12" rx="14" ry="2.4" fill="${SCK.white}" opacity=".8"/>`
      + `<path d="M0 34q14-12 30-8t28-6 30 4 32-4v24H0z" fill="#A7BC98"/>`
      + SCH.g(`<path d="M85 25.4v-6h10v6zM80 25.4V15h5v10.4z" fill="${SCK.white}"/><path d="M84.4 19.4l5.6-3.4 5.6 3.4zM79.4 15l3.1-3.4 3.1 3.4z" fill="${SCK.ochre}"/>`, 1) + `<path d="M82.5 11.6V8.4M81.3 9.6h2.4" stroke="${SCK.ink}" stroke-width=".8"/>`
      + `<path d="M0 44q18-14 40-10t34-2 46 6v42H0z" fill="#7E9E60"/>`
      + `<path d="M-2 56q24-14 52-10t40-4 32 6v34H-2z" fill="#5E8448"/>`
      + SCH.g(`<path d="M70 36q8 1 6 4-6 4-20 7-18 4-18 10 0 6 22 12 14 4 24 13H24Q22 74 14 70 0 63 8 55q8-7 30-12 22-5 32-7z" fill="#B96A3E"/>`, 1.4)
      + `<path d="M28 70q-8-4-10-10M46 48q-10 3-14 7M60 72q10 4 14 8" stroke="#8E4A26" stroke-width="1" fill="none" opacity=".7"/>`
      + `<ellipse cx="55" cy="71" rx="20" ry="3.6" fill="#7E3E1C" opacity=".6"/>`
      + SCH.g(`<path d="M36 70q-5-14 7-22 10-6 21-3 12 4 13 15 1 10-9 11H40q-4 0-4-1z" fill="${SCK.stoneLo}"/>`, 1.8)
      + `<path d="M42 56q4-7 13-8M45 52q2-2 5-3" stroke="${SCK.white}" stroke-width="1.6" fill="none" opacity=".6" stroke-linecap="round"/><path d="M66 52q6 6 4 14M52 66q6 2 12 0" stroke="${SCK.ink}" stroke-width="1" fill="none" opacity=".4"/>`
      + `<path d="M100 60v-8M106 60v-8M112 61v-8M98 56h16" stroke="${SCK.wood}" stroke-width="1.4"/><path d="M6 76l2-4M10 77l1-4M96 74l2-4M110 76l1-4" stroke="#3E5A30" stroke-width="1.2"/>` },

  /* the World Cup in Sweden, 1958: a laced leather ball on the penalty spot, the goal and its net behind, a wooden stand with a tiny crowd and pines under a pale northern sky */
  copa_1958: {
    label: 'Uma bola de couro sobre o gramado de um estádio, sob céu nórdico',
    rx: /\b(futebol|bola|estadio|gramado)\b/,
    draw: () => {
      const crowd = [SCK.white, SCK.red, SCK.night, SCK.ochre, SCK.sea].map((c, i) => `<path d="M${1 + i * 3} 25H120M${8.5 + i * 3} 28.4H120M${4 + i * 3} 31.8H120" stroke="${c}" stroke-width="2.6" stroke-linecap="round" stroke-dasharray=".1 14.9"/>`).join('');
      let net = '';
      for (let x = 31; x <= 89; x += 4) net += `M${x} 36v21`;
      for (let y = 38; y <= 56; y += 4) net += `M29 ${y}h62`;
      const R = v => Math.round(v * 10) / 10;
      const pine = (x, h) => `<path d="M${x} ${22 - h}l-4 ${R(h * .4)}h2.4l-3.4 ${R(h * .34)}h2.6L${x - 6} 22h12l-3.6-${R(h * .26)}h2.6l-3.4-${R(h * .34)}h2.4z" fill="#3E5A40"/>`;
      return SCH.bg('#DDE7EC') + `<ellipse cx="60" cy="8" rx="30" ry="2.4" fill="${SCK.white}" opacity=".8"/>`
        + SCH.g(pine(8, 18) + pine(18, 13) + pine(104, 16) + pine(114, 20), 1)
        + SCH.g(`<path d="M-2 22l8-5h108l8 5v14H-2z" fill="#7A5232"/><path d="M-2 22h124v14H-2z" fill="#8A6A4A"/>`, 1.4) + crowd
        + `<path d="M0 36h120v44H0z" fill="#5E8C48"/><path d="M0 36h120v3H0z" fill="#A9886A"/>`
        + `<path d="M0 44h120v8H0zM0 60h120v10H0z" fill="#6E9A54"/>`
        + `<path d="${net}" stroke="${SCK.white}" stroke-width=".6" opacity=".75"/>`
        + SCH.g(`<path d="M28 57V33h64v24h-3V36H31v21z" fill="${SCK.white}"/>`, 1.3)
        + `<path d="M2 57h116M16 57 8 80M104 57l8 23" stroke="${SCK.white}" stroke-width="1.4" opacity=".9"/>`
        + `<ellipse cx="62" cy="77" rx="15" ry="3" fill="#3E5A30" opacity=".6"/>`
        + SCH.g(`<circle cx="58" cy="63" r="14" fill="#A8642E"/>`, 1.8)
        + `<path d="M46 57q12 4 24-4M45 67q14 2 26-6M52 50q-2 14 4 26M62 49q4 14-2 27" stroke="${SCK.ink}" stroke-width="1" fill="none" opacity=".6"/>`
        + `<path d="M55 52l8 2M54.6 54.6l8 2" stroke="${SCK.ink}" stroke-width="1.6"/><path d="M56 51.6l-1 4.6M58.4 52.2l-1 4.6M60.8 52.8l-1 4.6" stroke="${SCK.white}" stroke-width="1"/>`
        + `<path d="M48 59q2-6 8-8" stroke="#D99A5E" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    } },

  /* the revolt in the bay, 1910: a grey dreadnought with its twin turrets fore and aft, smoke pouring from both funnels, searchlights sweeping the night over the dark hills */
  revolta_chibata: {
    label: 'Um encouraçado cinzento fumegando na baía à noite, varrida por holofotes',
    rx: /\b(encouracado|encouracados|dreadnought|minas geraes)\b/,
    draw: () => {
      const tur = (x, y, d) => `<path d="M${x + d * 5} ${y - 4.2}h${d * 11}M${x + d * 5} ${y - 2}h${d * 11}" stroke-width="1.7" fill="none"/><path d="M${x - 6} ${y}v-4q0-2.6 2.6-2.6h6.8q2.6 0 2.6 2.6V${y}z" fill="#9AA2A6"/>`;
      return SCH.bg('#1C263A')
        + `<path d="M8 8h.1M24 4h.1M62 4h.1M104 10h.1M114 4h.1M92 3h.1M6 26h.1" stroke="${SCK.white}" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>`
        + `<path d="M40 18 2-2h24zM82 20l36-22h-16z" fill="#F2E6B0" opacity=".26"/><path d="M40 18 10-2h8zM82 20l24-22h-6z" fill="#FFF6DC" opacity=".3"/>`
        + `<path d="M0 42q14-10 30-8t26 2 22-6 24 4 18-2v20H0z" fill="#121A28"/><path d="M0 46q30-6 60-2t60-2v10H0z" fill="#18233A"/>`
        + `<path d="M0 56h120v24H0z" fill="#22314A"/><path d="M6 64h20M40 68h26M84 64h22M14 74h18M70 76h30" stroke="#5A6E8A" stroke-width="1" opacity=".7"/>`
        + `<path d="M60 26q8-6 18-5t20-6 22-2M72 25q8-4 16-2t16-4" stroke="#4A5468" stroke-width="5" fill="none" stroke-linecap="round" opacity=".9"/>`
        + SCH.g(`<path d="M40 44V16M37 42l3-22 3 22M82 44V18M79.6 42l2.4-20 2.4 20" fill="none" stroke-width="1.4"/><path d="M36.4 18h7.2v3h-7.2zM78.4 20h7.2v3h-7.2z" fill="#7E868A" stroke-width="1.1"/>`, 1.2)
        + `<circle cx="40" cy="16.4" r="2.2" fill="#FFF6DC"/><circle cx="82" cy="18.4" r="2.2" fill="#FFF6DC"/>`
        + SCH.g(`<path d="M54 48V27h8v21zM67 48V28h8v20z" fill="#7E868A"/><path d="M53.6 27h8.8M66.6 28h8.8" stroke-width="1.8" fill="none"/>
          <path d="M33 48v-9h12v-5h5v14zM77 48v-7h11v7zM25 48v-4h12v4zM83 48v-4h12v4z" fill="#A3AAAD"/>`, 1.4)
        + SCH.g(tur(20, 48, -1) + tur(31, 44, -1) + tur(64, 48, -1) + tur(89, 44, 1) + tur(101, 48, 1), 1.2)
        + SCH.g(`<path d="M2 48h114l-4 10H16Q8 56 2 48z" fill="#9AA2A6"/>`, 1.6)
        + `<path d="M8 50.6h104" stroke="${SCK.ink}" stroke-width=".8" opacity=".5"/><path d="M15 55.4h96" stroke="#5A6266" stroke-width="2"/>`
        + `<path d="M24 53h.1M34 53h.1M44 53h.1M54 53h.1M64 53h.1M74 53h.1M84 53h.1M94 53h.1M104 53h.1" stroke="${SCK.goldHi}" stroke-width="1.4" stroke-linecap="round"/>`
        + `<path d="M20 61h80M34 65h50" stroke="#8E969A" stroke-width="1" opacity=".5"/>`;
    } },

  /* the disputed plateau of the Contestado: candelabra araucarias over the grassland, a little train steaming along its embankment in the misty distance */
  araucarias: {
    label: 'Um bosque de araucárias no planalto, com uma linha de trem ao longe',
    rx: /\b(araucaria|araucarias|pinheiro|pinheiros)\b/,
    draw: () => {
      const R = v => Math.round(v * 10) / 10;
      const arauc = (x, b, t, w, sw) => { let br = '', tf = '';
        const tuft = (cx, cy) => { const rx = R(w * .2), ry = R(w * .13); return `M${R(cx - rx)} ${R(cy + ry * .3)}q${rx} ${R(-ry * 2.4)} ${R(2 * rx)} 0q${-rx} ${R(ry * .9)} ${R(-2 * rx)} 0z`; };
        for (const [k, dy] of [[1, .62], [.72, .4], [.42, .2]]) for (const s of [-1, 1]) {
          const ex = R(x + s * w * k), ey = R(t + w * .04 * (1 - k)), sy = R(t + w * dy);
          br += `M${x} ${sy}Q${R(x + s * w * k * .8)} ${sy} ${ex} ${ey}`; tf += tuft(ex, ey); }
        tf += tuft(x, R(t - w * .04));
        return `<path d="M${x} ${b}V${t}" stroke="${SCK.ink}" stroke-width="${R(sw + 1.4)}"/><path d="M${x} ${b}V${t}" stroke="#6A4A2E" stroke-width="${sw}"/>`
          + `<path d="${br}" stroke="#4A3220" stroke-width="${R(Math.max(.8, sw * .45))}" fill="none"/>` + SCH.g(`<path d="${tf}" fill="#2F4A2A"/>`, R(Math.max(.7, sw * .4))); };
      return SCH.bg('#DCE4DE') + `<ellipse cx="80" cy="18" rx="30" ry="3" fill="${SCK.white}" opacity=".7"/>`
        + `<path d="M0 40q20-8 40-4t40-4 40 4v12H0z" fill="#B9C6B6"/>`
        + arauc(14, 44, 32, 5, 1) + arauc(100, 42, 30, 5, 1)
        + `<path d="M0 46q30-4 60-2t60-2v38H0z" fill="#9DB06E"/>`
        + `<path d="M0 50q60-6 120-4v4q-60-2-120 4z" fill="#A9965E"/><path d="M0 50q60-6 120-4" stroke="${SCK.ink}" stroke-width=".9" fill="none"/>`
        + `<path d="M56 34q-6-4-2-8t-2-8M60 34q4-4 0-8" stroke="${SCK.white}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".85"/>`
        + SCH.g(`<path d="M52 46v-7h8v-3h3v3h3v7zM68 46v-6h10v6zM80 46v-6h10v6z" fill="${SCK.night}"/>`, 1) + `<path d="M54 47h.1M58 47h.1M64 47h.1M72 47h.1M76 47h.1M84 47h.1M88 47h.1" stroke="${SCK.ink}" stroke-width="2" stroke-linecap="round"/>`
        + `<path d="M0 62q40-6 120-2v20H0z" fill="#8AA25E"/>`
        + arauc(70, 58, 26, 12, 2) + arauc(28, 82, 8, 24, 3.4) + arauc(102, 78, 16, 18, 2.6)
        + `<path d="M8 74l1-4M14 76l-1-4M48 72l1-4M58 76l1-4M84 74l-1-4M116 76l1-4" stroke="#4A6036" stroke-width="1.2"/>`;
    } },

  /* a Sunday in the square: the cast-iron bandstand with its blue pagoda roof and lace valance, the military band behind the railing with brass and a big drum, trees and benches round it */
  banda_coreto: {
    label: 'Uma banda militar toca num coreto de ferro, numa praça',
    rx: /\b(banda|coreto|partitura)\b/,
    draw: () => {
      const mus = x => `<path d="M${x - 3.4} 52v-9q0-3 3.4-3t3.4 3v9z" fill="${SCK.night}"/><circle cx="${x}" cy="37" r="2.4" fill="#C99A72"/><path d="M${x - 2.6} 35.6h5.2v-2.6h-5.2z" fill="${SCK.white}"/>`;
      let val = '';
      for (let i = 0; i < 12; i++) val += `M${Math.round(260 + i * 56) / 10} 32q2.8 3.6 5.6 0`;
      return SCH.bg('#CFE0E2')
        + SCH.g(`<path d="M-2 56q-6-14 2-22 0-12 12-12 10 0 14 10 6 10-2 24z" fill="${SCK.green}"/><path d="M122 56q6-14-2-22 0-12-12-12-10 0-14 10-6 10 2 24z" fill="${SCK.green}"/>`, 1.5)
        + `<path d="M8 56v10M112 56v10" stroke="${SCK.wood}" stroke-width="3"/><path d="M4 34q4-3 8 0M106 34q4-3 8 0M10 44q4-3 8 0M100 44q4-3 8 0" stroke="#4A6636" stroke-width="1.2" fill="none"/>`
        + `<path d="M0 62h120v18H0z" fill="#E3D2A8"/><path d="M0 62h120" stroke="${SCK.ink}" stroke-width=".8" opacity=".5"/>`
        + SCH.g(`<path d="M30 52V31M43 52V31M60 52V31M77 52V31M90 52V31" stroke="${SCK.white}" stroke-width="2.2" fill="none"/>`, 1.1)
        + `<path d="M30 52V31M43 52V31M60 52V31M77 52V31M90 52V31" stroke="${SCK.ink}" stroke-width=".7"/>`
        + SCH.g(mus(36) + mus(51) + mus(68) + mus(84), 1)
        + SCH.g(`<path d="M50 44q-4-2-4-6t4-4" fill="none" stroke="${SCK.gold}" stroke-width="2.4"/><path d="M45 34q0-4 4-4" fill="none" stroke="${SCK.gold}" stroke-width="3.4"/>`, 1)
        + `<path d="M38 42l9-3M70 42l9-4M86 44h7" stroke="${SCK.gold}" stroke-width="1.8"/><circle cx="93" cy="44" r="1.6" fill="${SCK.gold}"/><circle cx="79" cy="38" r="1.4" fill="${SCK.gold}"/>`
        + SCH.g(`<path d="M24 52h72v12H24z" fill="${SCK.stone}"/><path d="M22 52h76" stroke-width="1.6"/><path d="M50 64h20v4H50z" fill="${SCK.stoneLo}"/>`, 1.4)
        + `<path d="M24 46h72" stroke="${SCK.ink}" stroke-width="1.4"/><path d="M28 46v6M32 46v6M36 46v6M40 46v6M44 46v6M48 46v6M52 46v6M56 46v6M64 46v6M68 46v6M72 46v6M76 46v6M80 46v6M84 46v6M88 46v6M92 46v6" stroke="${SCK.ink}" stroke-width=".9"/>`
        + SCH.g(`<circle cx="60" cy="48" r="5.6" fill="${SCK.white}"/><path d="M54.4 48h11.2" stroke="${SCK.red}" stroke-width="1.2" fill="none"/>`, 1.2)
        + `<path d="M28 56h64" stroke="${SCK.ink}" stroke-width=".8" opacity=".4"/>`
        + SCH.g(`<path d="M22 31q16-4 26-14l12-9 12 9q10 10 26 14z" fill="${SCK.sea}"/><path d="M58 8V3h4v5z" fill="${SCK.gold}"/><path d="M60 3V-1" fill="none" stroke-width="1.2"/>`, 1.6)
        + `<path d="${val}" stroke="${SCK.white}" stroke-width="1.4" fill="none"/><path d="M36 26q12-6 18-13M84 26q-12-6-18-13" stroke="#8FB3C8" stroke-width="1.2" fill="none"/>`
        + SCH.g(`<path d="M4 70h14v2H4zM102 70h14v2h-14z" fill="${SCK.wood}"/><path d="M5 72v4M17 72v4M103 72v4M115 72v4M4 68h14M102 68h14" fill="none" stroke-width="1.2"/>`, 1);
    } },

  /* the line on the map made stone: a plain boundary pillar on the point where two jungle rivers meet, a brass theodolite on its tripod and a rolled map tied with ribbon on a camp stool */
  marco_fronteira: {
    label: 'Um marco de pedra numa margem de rio na floresta, com um teodolito e um mapa enrolado',
    rx: /\b(marco|marcos|teodolito|fronteira|fronteiras|limites)\b/,
    draw: () => SCH.bg('#D4E2DE') + `<ellipse cx="90" cy="10" rx="18" ry="2.6" fill="${SCK.white}" opacity=".7"/>`
      + SCH.g(`<path d="M-2 40V22q6-6 12-2 4-6 10-3 6-6 12 0 6-5 12 0 6-4 11 0 6-6 12 0 6-4 11 1 6-5 12 0 6-3 10 2 6-4 12 1V40z" fill="#3F6B34"/>`, 1.3)
      + `<path d="M6 24q4-3 8 0M30 20q4-3 8 0M54 20q4-3 8 0M78 21q4-3 8 0M100 22q4-3 8 0" stroke="#7FA86A" stroke-width="1.2" fill="none"/>`
      + `<path d="M0 40h120v40H0z" fill="${SCK.sea}"/><path d="M8 46h16M90 44h18M14 70h12M96 66h16" stroke="#A9C6D4" stroke-width="1.2"/>`
      + SCH.g(`<path d="M18 82q20-24 40-34 6-2 10 0 22 10 36 34z" fill="#7C8A4A"/>`, 1.6)
      + `<path d="M24 80q16-18 34-28 6-2 10 0 18 10 30 28z" fill="#B99A63"/><path d="M40 70l2-3M86 72l-2-3M30 78l2-3" stroke="#4A5A2A" stroke-width="1.2"/>`
      + SCH.g(`<path d="M55 66V34l5-6 5 6v32z" fill="${SCK.stone}"/><path d="M65 34l3-2v32l-3 2z" fill="${SCK.stoneLo}"/><path d="M60 28l8 4-3 2z" fill="${SCK.stoneLo}"/><path d="M52 66h18v4H52z" fill="${SCK.stoneLo}"/>`, 1.6)
      + `<path d="M57 40v22" stroke="${SCK.white}" stroke-width="1.2" opacity=".6"/>`
      + SCH.g(`<path d="M36 50 28 74M38 50v26M40 50l8 24" stroke="${SCK.wood}" stroke-width="1.8" fill="none"/>`, 1.8)
      + `<path d="M36 50 28 74M38 50v26M40 50l8 24" stroke="${SCK.wood}" stroke-width="1.4" fill="none"/>`
      + SCH.g(`<path d="M33 50h10v-2H33z" fill="${SCK.goldLo}"/><path d="M35 48v-7h6v7z" fill="${SCK.gold}"/><path d="M28 40h16v-3.4H28z" fill="${SCK.gold}"/><path d="M26 40.4v-4.2h2v4.2z" fill="${SCK.goldLo}"/><circle cx="38" cy="44" r="2" fill="${SCK.goldHi}" stroke-width="1"/>`, 1.2)
      + SCH.g(`<path d="M78 74 92 60M92 74 78 60" stroke="${SCK.wood}" stroke-width="1.6" fill="none"/><path d="M76 59h18v3H76z" fill="${SCK.red}"/>`, 1.4)
      + SCH.g(`<path d="M74 58V52h22v6z" fill="${SCK.parch}"/><ellipse cx="96" cy="55" rx="1.6" ry="3" fill="#D8C69A"/>`, 1.2)
      + `<path d="M84 52v6M86 52v6" stroke="${SCK.red}" stroke-width="1.4"/><path d="M85 58l-2 4M85 58l2 4" stroke="${SCK.red}" stroke-width="1.2"/>` },

  /* a flower born in the street: one small red flower forcing its way up through a crack in the grey asphalt beside the tram rails and the kerb, grey office blocks and blurred passers-by behind */
  flor_asfalto: {
    label: 'Uma pequena flor rompe o asfalto de uma rua cinzenta da cidade',
    rx: /\b(flor|flores|rosa|rosas|asfalto)\b/,
    draw: () => {
      let w = '';
      for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) w += `M${4 + c * 7} ${8 + r * 8}h4v5h-4zM${44 + c * 6} ${4 + r * 8}h3v5h-3zM${84 + c * 8} ${10 + r * 7}h4v4h-4z`;
      const ped = (x, s) => `<g transform="translate(${x} 46) scale(${s})" opacity=".55"><path d="M-3 0v-11q0-3 3-3t3 3V0z" fill="#6E6E6A"/><circle cy="-16" r="2.2" fill="#6E6E6A"/><path d="M-3.4-17.4h6.8v-.8h-6.8z" stroke="#6E6E6A" stroke-width="1.4"/></g>`;
      return SCH.bg('#DCE2E2')
        + SCH.g(`<path d="M0 44V2h34v42zM40 44V-2h28v46zM80 44V6h40v38z" fill="#A9A8A0"/><path d="M34 44V12h6v32zM68 44V16h12v28z" fill="#8E8D86"/>`, 1.3)
        + `<path d="${w}" fill="#5E6268"/>`
        + `<path d="M0 44h120v6H0z" fill="#C2C0B6"/>` + ped(20, 1) + ped(30, .9) + ped(92, 1) + ped(104, 1)
        + SCH.g(`<path d="M-2 50h124v3H-2z" fill="${SCK.stone}"/>`, 1.2)
        + `<path d="M0 53h120v27H0z" fill="#6E6E6A"/>`
        + `<path d="M16 80 46 53M30 80 52 53M104 80 74 53M90 80 68 53" stroke="#B9B6AC" stroke-width="1.6"/><path d="M16 80 46 53M30 80 52 53M104 80 74 53M90 80 68 53" stroke="${SCK.ink}" stroke-width=".5" opacity=".5"/>`
        + `<path d="M36 74l8-3 4 2 6-2 4 1M70 66l6 2 8-3" stroke="#4A4A46" stroke-width="1" fill="none"/>`
        + `<path d="M48 73l4 1 5-2 3 1 4-1 6 2" stroke="${SCK.ink}" stroke-width="1.6" fill="none"/>`
        + SCH.g(`<path d="M60 74q-3-11 1-24" fill="none" stroke="#3E6A34" stroke-width="2.2"/><path d="M60 67q-10-2-11-10 9 0 11 10zM60.6 61q9-6 12-1-4 5-12 1z" fill="#5E8C4A" stroke-width="1.1"/>`, 1)
        + SCH.g(`<path d="${[0, 1, 2, 3, 4].map(i => { const a = -Math.PI / 2 + i * 1.2566; return `M${(61 + Math.cos(a) * 4.8 - 4.2).toFixed(1)} ${(46 + Math.sin(a) * 4.8).toFixed(1)}a4.2 4.2 0 1 0 8.4 0a4.2 4.2 0 1 0-8.4 0z`; }).join('')}" fill="${SCK.red}"/>`, 1.3)
        + `<circle cx="61" cy="46" r="2.6" fill="${SCK.goldHi}" stroke="${SCK.ink}" stroke-width="1"/>`;
    } },
});
