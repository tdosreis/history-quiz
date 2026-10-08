/* ═══════════════════════════════════════════════════
   BIZÂNCIO, ISLÃ E ÁFRICA — the Palaiologan cross, Childeric's bees, the
   Reichsadler, the Dome of the Rock, the Round City of Baghdad, Saladin's
   eagle, a sultan's tughra, the Ay Yıldız; the stele of Aksum, the mosque
   of Djenné, the tomb of Askia, the flag of 1994.
═══════════════════════════════════════════════════ */
(() => {
  const F = B.f;
  const mir = s => `<g transform="matrix(-1 0 0 1 60 0)">${s}</g>`;
  const both = s => s + mir(s);
  const P = (d, fill, stroke, w, extra) => `<path d="${d}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${w || 1}" stroke-linejoin="round"` : ''}${extra ? ' ' + extra : ''}/>`;
  const L = (d, stroke, w, extra) => `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w || 1}" stroke-linecap="round" stroke-linejoin="round"${extra ? ' ' + extra : ''}/>`;
  /* line-work that reads as a solid bar: a darker edge under a lighter core */
  const bar = (d, col, lo, w, extra) => L(d, lo, w + 1.2, extra) + L(d, col, w, extra);
  const stops = s => s.map(([o, c, op]) => `<stop offset="${o}" stop-color="${c}"${op !== undefined ? ` stop-opacity="${op}"` : ''}/>`).join('');
  const lin = (u, id, a, b, s) => `<linearGradient id="${u}${id}" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}">${stops(s)}</linearGradient>`;
  const rad = (u, id, cx, cy, r, s) => `<radialGradient id="${u}${id}" cx="${cx}" cy="${cy}" r="${r}">${stops(s)}</radialGradient>`;
  const ell = (cx, cy, rx, ry) => `M${F(cx - rx)} ${F(cy)}a${rx} ${ry} 0 1 0 ${F(2 * rx)} 0a${rx} ${ry} 0 1 0 ${F(-2 * rx)} 0Z`;
  const pol = (cx, cy, a, r) => [F(cx + Math.cos(a) * r), F(cy + Math.sin(a) * r)];

  Object.assign(BRASAO, {
    /* ── BYZANTIUM: the tetragrammic cross of the Palaiologoi — four firesteels (betas) ── */
    bizancio: { shape: 'heater', field: '#A3201F', what: 'a cruz tetragramática dos Paleólogos: cruz de ouro e quatro fuzis (betas) sobre vermelho',
      draw: () => {
        const cross = 'M27.4 8H32.6V25.6H51V30.8H32.6V58H27.4V30.8H9V25.6H27.4Z';
        /* a beta, its back to the cross: spine at x = 0, 10.4 high */
        const beta = 'M0 0H4C6.5 0 7.5 1.3 7.5 2.7C7.5 3.9 6.7 4.7 5.5 5.05C7.1 5.35 8.1 6.5 8.1 7.8C8.1 9.3 6.9 10.4 4.2 10.4H0Z'
          + 'M2.3 1.75V4.25H3.8C4.8 4.25 5.3 3.7 5.3 3C5.3 2.3 4.8 1.75 3.8 1.75ZM2.3 5.95V8.65H4C5.2 8.65 5.8 8.05 5.8 7.3C5.8 6.55 5.2 5.95 4 5.95Z';
        const b = (x, y, k) => `<g transform="translate(${x} ${y}) scale(${k})">${P(beta, BK.gold, BK.goldLo, .9 / k, 'fill-rule="evenodd"')}`
          + L('M.8 .9V9.5', BK.goldHi, .6 / k, 'opacity=".7"') + '</g>';
        return P(cross, BK.gold, BK.goldLo, 1)
          + L('M28.3 9.6V24.8M28.3 31.8V56M10.6 26.5H26.6M33.6 26.5H49.4', BK.goldHi, .6, 'opacity=".6"')
          + both(b(36.8, 12.2, 1) + b(36.4, 33.8, .94));
      } },

    /* ── AKSUM: the great stele, a granite tower-house of storeys, windows and a false door ── */
    axum: { shape: 'stele', field: '#1E5E40', what: 'a grande estela de Axum: obelisco de granito com porta falsa, janelas e vigas',
      draw: u => {
        const ln = '#554C3E', dk = '#3A332A', st = '#6E6555';
        let s = `<defs>${lin(u, 'gr', [0, 0], [1, 0], [[0, '#E0D8C6'], [.5, '#B9AF9B'], [1, '#8A806E']])}</defs>`;
        /* the ground and the stepped base */
        s += P('M0 52.4H60V60H0Z', '#4E5A2E') + P('M18.4 51.2H41.6V57H18.4Z', '#958B79', ln, .8) + P('M21.6 48.6H38.4V51.4H21.6Z', '#AAA08D', ln, .8);
        /* the shaft, tapering a little, under its rounded head */
        s += P('M23.8 48.8L24.9 14.2C24.9 11 27.2 8.8 30 8.8C32.8 8.8 35.1 11 35.1 14.2L36.2 48.8Z', `url(#${u}gr)`, ln, 1);
        s += P('M34.2 48.8L33.3 14.4C33.4 12.2 33.9 11.2 34.3 10.9C34.8 11.8 35.1 13 35.1 14.2L36.2 48.8Z', st, null, 0, 'opacity=".5"');
        /* storeys: a jutting band of beam-ends ('monkey heads'), and a pair of windows */
        const edge = y => (48.8 - y) / 34.6 * 1.1;
        let bands = '', ends = '', wins = '';
        [43, 36.8, 30.6, 24.4, 18.2].forEach(y => {
          const a = 23.8 + edge(y), b = 36.2 - edge(y);
          bands += `M${F(a - .3)} ${y}H${F(b + .3)}V${F(y + 1.9)}H${F(a - .3)}Z`;
          for (let i = 0; i < 4; i++) ends += `M${F(a + 1.5 + i * (b - a - 3) / 3)} ${F(y + .95)}m-.75 0a.75 .75 0 1 0 1.5 0a.75 .75 0 1 0 -1.5 0`;
          if (y > 20) wins += `M${F(a + 1.7)} ${F(y - 4.3)}h2.5v3.3h-2.5zM${F(b - 4.2)} ${F(y - 4.3)}h2.5v3.3h-2.5z`;
        });
        s += P(bands, '#CFC6B2', ln, .6) + P(ends, st) + P(wins, dk, ln, .4);
        /* the false door at the foot, with its knocker */
        s += P('M27.4 44.9H32.6V48.8H27.4Z', dk, ln, .6) + `<circle cx="31.4" cy="46.9" r=".6" fill="#B9AF9B"/>`;
        /* the head: a carved boss in a hollow */
        s += P('M26.2 16.4C26.4 13.6 28 11.6 30 11.6C32 11.6 33.6 13.6 33.8 16.4Z', '#A69C88', ln, .6) + `<circle cx="30" cy="14.4" r="1.2" fill="${st}"/>`;
        s += L('M25.6 15.6V42.4', '#F6F1E4', .7, 'opacity=".55"');
        return s;
      } },

    /* ── FRANKS: a gold-and-garnet bee from the tomb of Childeric I at Tournai ── */
    francos: { shape: 'roundel', field: '#1F3F78', what: 'uma abelha de ouro e granadas do túmulo de Childerico I (Tournai)',
      draw: u => {
        const g = BK.gold, gl = BK.goldLo, gh = BK.goldHi, gr = `url(#${u}ga)`;
        let s = `<defs>${rad(u, 'ga', '36%', '28%', '80%', [[0, '#D03A44'], [.5, '#921A2A'], [1, '#520A14']])}</defs>`;
        /* the right half, cloison by cloison; the left is its mirror */
        const wing = 'M33.6 20.6C38.6 18.8 44.4 20.8 46.4 26.2C48.2 31.4 46 39.2 41.2 46.6C38 40.4 35 31.6 33.6 20.6Z';
        const body = 'M30 23.2C33.2 23.2 35.2 26 35.2 30.8C35.2 37.8 33.2 44.4 30 50.4Z';
        const thorax = 'M30 17.8H33.4C35.4 18.6 35.8 22.6 33.6 24.2H30Z';
        const head = 'M30 9.6C32.4 9.8 34 11.2 34.4 13.4C34.7 15.4 33.6 17.4 31.6 18.4H30Z';
        const half = P(wing, gr, gl, .8)
          /* the wing's cloisons: its gold border, a long vein and the cross walls */
          + L(wing, g, 1.4) + L('M34.6 22.4C38.8 25.8 41.6 33.4 41.6 44.4M36.6 27L46.6 28.6M39.4 36.4L45.4 36.2', g, 1.1)
          + L('M36.4 21.4C40.2 20.6 43.6 22 45.4 25', '#fff', .55, 'opacity=".4"')
          + P(body, gr, gl, .8) + L(body.replace('Z', ''), g, 1.4)
          + L('M30 28.2H34.8M30 33.4H35.1M30 38.6H34.4M30 43.6H33.2', g, 1.15)
          + P(thorax, g, gl, .8) + P('M30 19.4H32.8C33.8 20 34 21.8 33 22.6H30Z', gr)
          + P(head, g, gl, .8) + P('M30 12.4H31.6L30 15.6Z', gr)
          /* the eye: a round garnet set on the side of the head */
          + `<circle cx="33.5" cy="14.2" r="2" fill="${gr}" stroke="${g}" stroke-width="1"/>`
          + `<circle cx="33" cy="13.6" r=".55" fill="#fff" opacity=".55"/>`;
        s += both(half);
        s += L('M30 23.6V49', gl, .6, 'opacity=".7"') + L('M28.4 10.6Q30 10 31.6 10.6', gh, .6);
        return s;
      } },

    /* ── HOLY ROMAN EMPIRE: the Reichsadler, double-headed and haloed, sable on or ── */
    sacro_imperio: { shape: 'heater', field: '#E4B940', what: 'a águia bicéfala imperial negra, com auréolas de ouro, sobre ouro',
      draw: () => {
        /* the eagle's box, and the design-box points of its two haloes (centre 32.31,10.37 r 11.24 and its mirror) */
        const x = 12, y = 11.6, w = 36, h = 40, sc = Math.min(w / 100, h / 106);
        const ox = x + (w - 100 * sc) / 2, oy = y + (h - 106 * sc) / 2 + 6 * sc;
        /* a sable rim under each nimbus, so the gold haloes read against the gold field */
        const rim = [32.31, 67.69].map(hx => `<circle cx="${F(ox + hx * sc)}" cy="${F(oy + 10.37 * sc)}" r="${F(11.24 * sc + .75)}" fill="${BK.sable}"/>`).join('');
        return rim + BEAST.eagle(x, y, w, h, { heads: 2, halo: '#F3D477', accent: BK.red, tongue: BK.red });
      } },

    /* ── UMAYYADS: the Dome of the Rock, raised by Abd al-Malik in 691 ── */
    califado_omiada: { shape: 'roundel', field: '#F2EEE3', what: 'a Cúpula da Rocha de Abd al-Malik: cúpula de ouro sobre o octógono, no branco omíada',
      draw: u => {
        const tq = '#2A7A80', tqLo = '#174A50', tqHi = '#4C9EA0', win = '#142A33';
        let s = `<defs>${lin(u, 'dm', [0, 0], [1, 0], [[0, BK.goldHi], [.4, BK.gold], [1, BK.goldLo]])}</defs>`;
        /* the platform of the Haram */
        s += P('M0 46.4H60V60H0Z', '#D9CFBA') + L('M0 46.4H60', '#A29478', 1);
        /* the octagon, seen corner-on: one face square to us, two turned 45° away (0.71 as wide) */
        const x0 = 9.6, x1 = 21.6, x2 = 38.4, x3 = 50.4, top = 33, foot = 46.4;
        s += P(`M${x0} ${top}H${x1}V${foot}H${x0}Z`, tqHi, tqLo, .9) + P(`M${x1} ${top}H${x2}V${foot}H${x1}Z`, tq, tqLo, .9)
          + P(`M${x2} ${top}H${x3}V${foot}H${x2}Z`, tqLo, tqLo, .9);
        /* the marble dado */
        s += P(`M${x0} 42.6H${x3}V${foot}H${x0}Z`, '#E4DED0', '#9C9482', .7) + L(`M${x1} 42.6V${foot}M${x2} 42.6V${foot}`, '#9C9482', .6);
        /* arched windows: five on the near face, four (foreshortened) on each far one */
        const arch = (x, w, y0, y1) => `M${F(x - w / 2)} ${y1}V${F(y0 + w * .6)}Q${F(x - w / 2)} ${y0} ${x} ${F(y0 - w * .25)}Q${F(x + w / 2)} ${y0} ${F(x + w / 2)} ${F(y0 + w * .6)}V${y1}Z`;
        let w = '';
        [0, 1, 2, 3, 4].forEach(i => { w += arch(F(x1 + 2.4 + i * 3), 1.9, 35.6, 41.2); });
        [0, 1, 2, 3].forEach(i => { w += arch(F(x0 + 2 + i * 2.67), 1.3, 35.6, 41.2) + arch(F(x2 + 2 + i * 2.67), 1.3, 35.6, 41.2); });
        s += P(w, win, BK.gold, .55);
        /* the parapet */
        s += P(`M${x0 - .6} 31.6H${x3 + .6}V33.8H${x0 - .6}Z`, BK.gold, BK.goldLo, .7);
        /* the drum, with its windows */
        s += P('M20.4 25.4H39.6V31.6H20.4Z', tq, tqLo, .9) + P('M33.6 25.4H39.6V31.6H33.6Z', tqLo, null, 0, 'opacity=".5"');
        let dw = '';
        [23.2, 26.8, 30.4, 34, 37].forEach((x, i) => { dw += arch(x, i === 0 || i === 4 ? 1.2 : 1.7, 27.2, 30.4); });
        s += P(dw, win);
        s += P('M19.8 24.6H40.2V26H19.8Z', BK.gold, BK.goldLo, .6);
        /* the golden dome, a little pointed, and its finial */
        s += L('M30 12V6.6', BK.goldLo, 1.3) + `<circle cx="30" cy="8.6" r="1.15" fill="${BK.gold}" stroke="${BK.goldLo}" stroke-width=".5"/>`
          + `<circle cx="30" cy="11.3" r=".8" fill="${BK.gold}" stroke="${BK.goldLo}" stroke-width=".45"/>`;
        s += P('M19.2 25C19.2 18.2 23.4 13.6 30 11.8C36.6 13.6 40.8 18.2 40.8 25Z', `url(#${u}dm)`, BK.goldLo, 1);
        s += P('M22 23.4C22.2 19.2 24.2 16 27.8 13.8C26.2 16.6 25.4 19.8 25.4 23.4Z', BK.goldHi, null, 0, 'opacity=".7"');
        return `<g transform="translate(0 1.8)">${s}</g>`;
      } },

    /* ── ABBASIDS: Madinat al-Salam, al-Mansur's Round City of Baghdad (762), from above ── */
    califado_abassida: { shape: 'roundel', field: '#17130F', what: 'a Cidade Redonda de Bagdá vista de cima: fosso, muralhas, quatro portas e a Cúpula Verde, em ouro sobre o negro abássida',
      draw: () => {
        const g = BK.gold, gl = BK.goldLo, gh = BK.goldHi, blk = '#17130F';
        let s = '';
        /* the moat, fed from the Tigris */
        s += B.ring(30, 30, 23.5, 2.2, '#2D5C86') + B.ring(30, 30, 22.8, .5, '#5E8DB4', 'opacity=".8"');
        /* the outer wall, then the great wall with its round towers */
        s += B.ring(30, 30, 21.1, 1.2, g);
        s += B.dots(30, 30, 19.3, 28, 1.45, gl, Math.PI / 28) + B.ring(30, 30, 18.7, 2.8, g) + B.dots(30, 30, 19.3, 28, 1.05, g, Math.PI / 28);
        s += B.ring(30, 30, 17.6, .5, gh, 'opacity=".7"');
        /* the ring of houses, cut by lanes, round a circular street */
        let lanes = '';
        for (let i = 0; i < 48; i++) {
          const a = (i + .5) * Math.PI / 24;
          lanes += `M${pol(30, 30, a, 13.4).join(' ')}L${pol(30, 30, a, 16.6).join(' ')}`;
        }
        s += B.ring(30, 30, 15, 3.4, '#6B4E22') + L(lanes, blk, .7) + B.ring(30, 30, 15, .8, blk);
        /* the inner wall round the great court */
        s += B.ring(30, 30, 12.3, 1.7, g);
        /* the four arcaded avenues, from the four gates (Khorasan, Basra, Kufa, Syria) to the court */
        let roads = '', gates = '';
        [0, 90, 180, 270].forEach(k => {
          const R = s2 => `<g transform="rotate(${k} 30 30)">${s2}</g>`;
          roads += R(`<path d="M41.4 28.3H54V31.7H41.4Z" fill="${blk}"/>` + L('M42.4 28.3H47M42.4 31.7H47', g, .8));
          gates += R(
            /* the bridge over the moat and the outer gate */
            P('M50.4 28H54.4V32H50.4Z', g, gl, .7)
            /* the great gate-house with its domed audience hall */
            + P('M45.6 26.4H50.2V33.6H45.6Z', g, gl, .8) + `<circle cx="47.9" cy="30" r="1.55" fill="${gh}" stroke="${gl}" stroke-width=".6"/>`
            /* the gate of the inner wall */
            + P('M40.6 28.4H42.8V31.6H40.6Z', g, gl, .6));
        });
        s += roads + gates;
        /* the court: the mosque against the palace of the Golden Gate, under its Green Dome */
        s += P('M27.4 19.6H32.6V24.2H27.4Z', g, gl, .7) + P('M28.8 20.8H31.2V22.8H28.8Z', blk);
        s += P('M24.8 24.8H35.2V35.2H24.8Z', g, gl, .8);
        s += `<circle cx="30" cy="30" r="3.5" fill="#2E8A55" stroke="#14492B" stroke-width=".8"/>`
          + `<path d="M28 28.6A2.6 2.6 0 0 1 30.6 27.4" fill="none" stroke="#9CDDB0" stroke-width=".8" stroke-linecap="round"/>`;
        return s;
      } },

    /* ── MALI: the Great Mosque of Djenné, mud brick bristling with toron beams ── */
    mali: { shape: 'tablet', field: '#9EC4DA', what: 'a Grande Mesquita de Djenné: barro cru, três torres e as vigas toron',
      draw: u => {
        const m = '#C68A48', mHi = '#E2AE6C', mLo = '#9A6230', ln = '#6A3F1A', tor = '#3E2410';
        let s = `<defs>${lin(u, 'sk', [0, 0], [0, 1], [[0, '#7FB0D2'], [.7, '#CBE0E4'], [1, '#EBDDB8']])}</defs>`;
        s += P('M0 0H60V60H0Z', `url(#${u}sk)`);
        /* a pinnacle: a rounded cone */
        const cone = (x, y, w, h) => `M${F(x - w / 2)} ${y}C${F(x - w / 2)} ${F(y - h * .55)} ${F(x - w * .16)} ${F(y - h)} ${x} ${F(y - h)}C${F(x + w * .16)} ${F(y - h)} ${F(x + w / 2)} ${F(y - h * .55)} ${F(x + w / 2)} ${y}Z`;
        /* the facade wall with its row of little pinnacles */
        let wall = 'M10 31H50V46H10Z';
        for (let x = 11.5; x < 49; x += 3) wall += cone(F(x), 31.2, 1.8, 2.6);
        s += P(wall, m, ln, .9);
        /* a tower: tapering, crowned by a big cone and two small */
        const tower = (x, w0, w1, top, big) => {
          const d = `M${F(x - w0 / 2)} 46L${F(x - w1 / 2)} ${top}H${F(x + w1 / 2)}L${F(x + w0 / 2)} 46Z`
            + cone(x, top + .2, w1 * .46, big) + cone(F(x - w1 * .36), top + .2, w1 * .26, big * .5) + cone(F(x + w1 * .36), top + .2, w1 * .26, big * .5);
          return P(d, m, ln, .9) + P(`M${F(x + w0 / 2 - 1.8)} 46L${F(x + w1 / 2 - 1.4)} ${top}H${F(x + w1 / 2)}L${F(x + w0 / 2)} 46Z`, mLo, null, 0, 'opacity=".55"')
            + `<ellipse cx="${x}" cy="${F(top - big - .6)}" rx=".85" ry="1.05" fill="#F6F0E2" stroke="${ln}" stroke-width=".4"/>`
            + L(`M${F(x - w0 / 2 + 1.2)} 44L${F(x - w1 / 2 + 1)} ${top + 1.5}`, mHi, .8, 'opacity=".8"');
        };
        s += tower(18, 8, 6.4, 23, 4.2) + tower(42, 8, 6.4, 23, 4.2) + tower(30, 10.4, 8.4, 18.4, 5.2);
        /* the toron: palm beams sticking out in rows */
        let t = '';
        const row = (x0, x1, y) => { for (let x = x0; x <= x1 + .01; x += 2.6) t += `M${F(x)} ${y}h1.3`; };
        [20, 25, 30, 35, 40].forEach(y => row(26.6, 32, y));
        [25.4, 30.4, 35.4, 40.4].forEach(y => { row(15.2, 18.4, y); row(39.2, 42.4, y); });
        [35, 40].forEach(y => { row(11.4, 11.4, y); row(22.4, 22.4, y); row(36.4, 36.4, y); row(47.2, 47.2, y); });
        /* and out past the edges of the towers */
        [19, 24, 29, 34, 39].forEach(y => { t += `M${F(24.6 + (46 - y) * .04)} ${y}h-1.6M${F(35.4 - (46 - y) * .04)} ${y}h1.6`; });
        [25, 30, 35, 40].forEach(y => { t += `M13.8 ${y}h-1.4M22.2 ${y}h1.2M37.8 ${y}h-1.2M46.2 ${y}h1.4`; });
        s += L(t, tor, 1.1, 'stroke-linecap="butt"');
        /* the raised plinth */
        s += P('M8 46H52V52H8Z', '#B07A3E', ln, .9) + L('M9 47.2H51', mHi, .7, 'opacity=".7"');
        return s;
      } },

    /* ── SONGHAI: the Tomb of Askia at Gao (1495), a mud pyramid bristling with beams ── */
    songai: { shape: 'stele', field: '#1C4A78', what: 'o Túmulo dos Áskia em Gao: pirâmide de barro eriçada de vigas, sobre o azul do Níger',
      draw: u => {
        const m = '#B5683C', mHi = '#D99460', mLo = '#82401E', ln = '#55280F', tor = '#2E1808';
        let s = `<defs>${lin(u, 'nk', [0, 0], [0, 1], [[0, '#143862'], [.75, '#2C6A9E'], [1, '#5B8FB8']])}</defs>`;
        s += P('M0 0H60V60H0Z', `url(#${u}nk)`);
        /* the sand of the court at its foot */
        s += P('M0 50.6H60V60H0Z', '#C99E64') + L('M0 50.8H60', '#8E6A3C', .8);
        /* tiers: [base y, half-width at the base, half-width under the next ledge] */
        const T = [[51, 12.6, 11.4], [45.2, 10.6, 9.4], [39.6, 8.7, 7.6], [34.2, 6.9, 5.9], [29, 5.2, 4.3], [24.2, 3.7, 3]];
        const TOP = 20.2;
        const yAt = i => i + 1 < T.length ? T[i + 1][0] : TOP;
        let body = '', shade = '', hi = '';
        T.forEach(([y0, a, b], i) => {
          const y1 = yAt(i), r = .9;
          /* a tier with slightly bowed sides and rounded shoulders */
          body += `M${F(30 - a)} ${y0}Q${F(30 - (a + b) / 2 - .5)} ${F((y0 + y1) / 2)} ${F(30 - b)} ${F(y1 + r)}Q${F(30 - b)} ${y1} ${F(30 - b + r)} ${y1}`
            + `H${F(30 + b - r)}Q${F(30 + b)} ${y1} ${F(30 + b)} ${F(y1 + r)}Q${F(30 + (a + b) / 2 + .5)} ${F((y0 + y1) / 2)} ${F(30 + a)} ${y0}Z`;
          /* the east face in shadow, the west catching the light */
          shade += `M${F(30 + a * .42)} ${y0}L${F(30 + b * .42)} ${y1}H${F(30 + b - r)}Q${F(30 + b)} ${y1} ${F(30 + b)} ${F(y1 + r)}Q${F(30 + (a + b) / 2 + .5)} ${F((y0 + y1) / 2)} ${F(30 + a)} ${y0}Z`;
          hi += `M${F(30 - a + 1.2)} ${F(y0 - .8)}Q${F(30 - (a + b) / 2 + .3)} ${F((y0 + y1) / 2)} ${F(30 - b + .8)} ${F(y1 + 1.4)}`;
        });
        /* the little cap on top, and the stake through it */
        body += 'M27.6 20.6Q27.8 18.2 30 17.8Q32.2 18.2 32.4 20.6Z';
        s += P(body, m, ln, .9) + P(shade, mLo, null, 0, 'opacity=".5"') + L(hi, mHi, .8, 'opacity=".75"');
        /* the toron: beams out past both edges of every tier, and their ends across its face */
        let side = '', ends = '';
        T.forEach(([y0, a, b], i) => {
          const y1 = yAt(i);
          [.28, .7].forEach(k => {
            const y = F(y0 + (y1 - y0) * k), hw = a + (b - a) * k - .2;
            side += `M${F(30 - hw - 2.1)} ${y}H${F(30 - hw + .6)}M${F(30 + hw - .6)} ${y}H${F(30 + hw + 2.1)}`;
          });
          const y = F(y0 + (y1 - y0) * .5), hw = (a + b) / 2 - 2.2;
          const n = Math.max(1, Math.round(hw * 2 / 3));
          for (let j = 0; j <= n; j++) {
            const x = F(30 - hw + j * 2 * hw / n);
            ends += `M${F(x - .55)} ${F(y - .55)}h1.1v1.1h-1.1Z`;
          }
        });
        s += L(side, tor, 1.1, 'stroke-linecap="butt"') + P(ends, tor) + L('M30 18V13.6', tor, 1.1);
        return s;
      } },

    /* ── AYYUBIDS: the Eagle of Saladin, from the Citadel of Cairo ── */
    ayubida: { shape: 'roundel', field: '#1E3B2F', what: 'a águia de Saladino (relevo da Cidadela do Cairo), toda em ouro, num brasão redondo à maneira aiúbida e mameluca',
      draw: () => BEAST.eagle(11, 10, 38, 40, { fill: BK.gold, accent: BK.goldLo, wings: 'down', tongue: false }) },

    /* ── OTTOMANS: a sultan's tughra — the two loops, three staffs with their pennants, the long arms ── */
    imperio_otomano: { shape: 'roundel', field: '#A11B1F', what: 'a tughra, o monograma caligráfico do sultão, em ouro sobre o vermelho otomano',
      draw: () => {
        const g = BK.gold, gl = BK.goldLo, gh = BK.goldHi;
        /* points along a smooth (Catmull-Rom) curve through pts, k samples per span */
        const curve = (pts, k) => {
          const out = [], n = pts.length, at = i => pts[Math.max(0, Math.min(n - 1, i))];
          for (let i = 0; i < n - 1; i++) {
            const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
            for (let j = 0; j < k; j++) {
              const t = j / k, t2 = t * t, t3 = t2 * t;
              out.push([0, 1].map(c => .5 * (2 * p1[c] + (p2[c] - p0[c]) * t + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2 + (3 * p1[c] - p0[c] - 3 * p2[c] + p3[c]) * t3)));
            }
          }
          out.push(pts[n - 1]);
          return out;
        };
        /* a reed-pen stroke along that curve: broad across the nib, fine along it, tapering at the ends */
        const NIB = 62 * Math.PI / 180;
        const pen = (pts, wmax, wmin, t0, t1) => {
          const c = curve(pts, 14), L = [], R = [];
          let len = [0];
          for (let i = 1; i < c.length; i++) len.push(len[i - 1] + Math.hypot(c[i][0] - c[i - 1][0], c[i][1] - c[i - 1][1]));
          const tot = len[len.length - 1];
          c.forEach((p, i) => {
            const a = c[Math.max(0, i - 1)], b = c[Math.min(c.length - 1, i + 1)];
            const th = Math.atan2(b[1] - a[1], b[0] - a[0]);
            const s = len[i] / tot;
            const tp = Math.min(1, t0 ? Math.sqrt(s / t0) : 1, t1 ? Math.sqrt((1 - s) / t1) : 1);
            const w = (wmin + (wmax - wmin) * Math.abs(Math.sin(th - NIB))) * Math.max(.18, tp) / 2;
            const nx = -Math.sin(th) * w, ny = Math.cos(th) * w;
            L.push(F(p[0] + nx) + ' ' + F(p[1] + ny)); R.push(F(p[0] - nx) + ' ' + F(p[1] - ny));
          });
          return 'M' + L.join('L') + 'L' + R.reverse().join('L') + 'Z';
        };
        const smoothClosed = pts => 'M' + curve(pts.concat([pts[0]]), 10).map(p => F(p[0]) + ' ' + F(p[1])).join('L') + 'Z';

        /* the loops (beyze), each running on to the right as an arm (kol) */
        const outer = [[33, 42.4], [24, 43.6], [14.6, 41.6], [9.6, 35.2], [10.8, 28.2], [16.6, 24.4], [24.4, 24.2], [32.4, 24.8], [41.4, 24.4], [47.6, 23.3], [51, 22.2]];
        const inner = [[32.4, 39.4], [25.2, 40], [19, 38.6], [15.8, 34.6], [16.8, 30.6], [21, 28.9], [27.4, 29.1], [34.4, 29.8], [42.2, 29.7], [49.6, 28.6]];
        /* the three staffs (tuğ), each with its pennant (zülfe) streaming to the right */
        const tug = [[31.6, 9.8], [35.6, 10.6], [39.6, 11.8]].map(([x, t]) => [[x - .4, 42.4], [x - .1, 32], [x, 20], [x + .4, t + 1.6], [x + 1.4, t]]);
        const zul = [0, 1, 2].map(i => { const x = 31.4 + i * 4, y = 14.6 + i * 1.4; return [[x - .4, y], [x + 1.8, y - .4], [x + 3.6, y + 1.4], [x + 5.4, y + 3.8], [x + 8, y + 4.6]]; });
        /* the base (sere): the sultan's name and titles, in a few strokes */
        const sere = [
          [[22.6, 44.2], [30, 46.6], [38.6, 46], [44.6, 42.6], [46, 38.8]],
          [[41, 36.2], [42.6, 38.6], [42.4, 41.2], [40.4, 43.4]],
          [[36.8, 37.4], [37.6, 39.8], [37, 42.2], [35.4, 43.8]],
          [[27.6, 44], [27.8, 40.4], [28.6, 37.6]],
        ];
        const strokes = [
          pen(outer, 2.9, .9, .05, .3), pen(inner, 2.5, .8, .06, .3),
          ...tug.map(t => pen(t, 1.9, 1.2, 0, .12)),
          ...zul.map(z => pen(z, 1.7, .7, .1, .3)),
          pen(sere[0], 2.4, .9, .1, .2), ...sere.slice(1).map(q => pen(q, 1.7, .9, .15, .25)),
        ].join('');

        let s = '';
        /* the loops' insides, illuminated in lapis, with gold scrolls */
        s += P(smoothClosed(outer.slice(0, 8)), BK.lapis) + P(smoothClosed(inner.slice(0, 8)), '#2F5DB0');
        s += L('M13.6 33.4Q14.6 29.4 18.4 27.4M12.4 36.6Q14 40.2 19 41.2', g, .7, 'opacity=".75"');
        s += B.dots(23, 34.2, 0, 1, .9, g) + P('M21.8 34.2Q23 32.8 24.2 34.2Q23 35.6 21.8 34.2Z', g);
        /* every stroke edged in dark gold, then laid in gold */
        s += `<path d="${strokes}" fill="${gl}" stroke="${gl}" stroke-width="1.3" stroke-linejoin="round"/>`;
        s += `<path d="${strokes}" fill="${g}"/>`;
        /* the dots (nuqta), lozenges as a reed pen leaves them */
        s += P('M33.2 36.4l1-1l1 1l-1 1zM44.4 35.6l1-1l1 1l-1 1zM24.4 41.6l.9-.9l.9.9l-.9.9z', g, gl, .5);
        /* light along the loops */
        s += L('M11.2 31.8C11.8 27.8 14.6 25.4 18.8 24.9M16.9 32.6C17.4 30.6 18.8 29.6 21 29.4', gh, .55, 'opacity=".8"');
        return `<g transform="translate(1.4 0)">${s}</g>`;
      } },

    /* ── TURKEY: the Ay Yıldız, to the proportions of the Turkish Flag Law ── */
    turquia: { shape: 'banner', field: '#E30A17', what: 'a lua crescente e a estrela brancas sobre o vermelho (Ay Yıldız)',
      draw: () => {
        /* height G = 30 (y 15–45), hoist at x = 5: outer circle at G/2 with diameter G/2, inner circle G/16 further with diameter 0.4G */
        const crescent = 'M26.34 34.01A7.5 7.5 0 1 1 26.34 25.99A6 6 0 1 0 26.34 34.01Z';
        const star = 'M25.88 30L32.66 27.8L28.47 33.57V26.43L32.66 32.2Z';
        return P(crescent + star, '#fff');
      } },

    /* ── SOUTH AFRICA: the flag of 1994 ── */
    africa_do_sul: { shape: 'banner', field: '#E03C31', what: 'a bandeira de 1994: o Y verde unindo as seis cores',
      draw: u => {
        /* the 2:3 flag at height 30: unit k = 5; the pall's centre lines meet at the flag's centre */
        const Y = 'M5 15L27.5 30L5 45M27.5 30H60';
        return P('M0 30H60V60H0Z', '#001489')
          + L(Y, '#fff', 10, 'stroke-linecap="butt" stroke-linejoin="miter"')
          + `<clipPath id="${u}t"><path d="M5 15L27.5 30L5 45Z"/></clipPath>`
          + `<g clip-path="url(#${u}t)"><path d="M5 15L27.5 30L5 45Z" fill="#000"/>${L('M5 15L27.5 30L5 45', '#FFB81C', 10, 'stroke-linecap="butt" stroke-linejoin="miter"')}</g>`
          + L(Y, '#007749', 6, 'stroke-linecap="butt" stroke-linejoin="miter"');
      } },
  });
})();
