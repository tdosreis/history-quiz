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
        const g = BK.gold, gl = BK.goldLo, gr = `url(#${u}ga)`;
        let s = `<defs>${rad(u, 'ga', '38%', '30%', '75%', [[0, '#C9303F'], [.55, '#8A1626'], [1, '#4E0912']])}</defs>`;
        /* the right half, cell by cell; the left is its mirror */
        const wing = 'M34 21C40.8 19.6 46 24.4 45.6 31.6C45.2 38.2 42.6 44 39.8 48.2C37 42 34.9 33.4 34 21Z';
        const body = 'M30 24.4H33.9C34.7 32.6 33.4 41.2 30 50.4Z';
        const head = 'M30 10.2C33.7 10.2 35.5 12.6 35.5 15.3C35.5 18 33.4 19.8 30 19.8Z';
        const thorax = 'M30 19.6H34.3Q36.2 22 34.3 24.4H30Z';
        const half = P(wing, gr, gl, .8) + P(body, gr, gl, .8)
          + L('M35.4 23.2C39 26.6 40.8 33.4 40.6 44M30 29.8H33.8M30 35.2H33.6M30 40.4H32.6M30 45.4H31.6', g, 1.25)
          + L(wing, g, 1.3) + L('M33.9 24.4C34.7 32.6 33.4 41.2 30 50.4', g, 1.3)
          + P(thorax, g, gl, .8) + P('M30 20.9H33.5Q34.6 22 33.5 23.1H30Z', gr)
          + P(head, g, gl, .8) + `<circle cx="32.4" cy="14.9" r="1.55" fill="${gr}" stroke="${gl}" stroke-width=".5"/>`
          + L('M36.6 22.2C39.6 21.6 42.4 22.8 43.8 25.4', '#fff', .6, 'opacity=".35"');
        s += both(half);
        s += L('M30 20V50', gl, .5, 'opacity=".6"') + L('M28.2 11.6Q30 10.9 31.8 11.6', BK.goldHi, .6);
        return s;
      } },

    /* ── HOLY ROMAN EMPIRE: the Reichsadler, double-headed and haloed, sable on or ── */
    sacro_imperio: { shape: 'heater', field: '#E4B940', what: 'a águia bicéfala imperial negra, com auréolas de ouro, sobre ouro',
      draw: () => BEAST.eagle(11, 12, 38, 42, { heads: 2, halo: true, accent: BK.red, tongue: BK.red }) },

    /* ── UMAYYADS: the Dome of the Rock, raised by Abd al-Malik in 691 ── */
    califado_omiada: { shape: 'roundel', field: '#F2EEE3', what: 'a Cúpula da Rocha de Abd al-Malik: cúpula de ouro sobre o octógono, no branco omíada',
      draw: u => {
        const tq = '#2A7A80', tqLo = '#174A50', tqHi = '#4C9EA0', win = '#142A33';
        let s = `<defs>${lin(u, 'dm', [0, 0], [1, 0], [[0, BK.goldHi], [.4, BK.gold], [1, BK.goldLo]])}</defs>`;
        /* the platform of the Haram */
        s += P('M0 46.4H60V60H0Z', '#D9CFBA') + L('M0 46.4H60', '#A29478', 1);
        /* the octagon: a face to the front, two turned away */
        s += P('M12.8 32.4H23V46.4H12.8Z', tqHi, tqLo, .9) + P('M23 32.4H37V46.4H23Z', tq, tqLo, .9) + P('M37 32.4H47.2V46.4H37Z', tqLo, tqLo, .9);
        /* the marble dado */
        s += P('M12.8 42.4H47.2V46.4H12.8Z', '#E4DED0', '#9C9482', .7);
        /* arched windows */
        const arch = (x, w, y0, y1) => `M${F(x - w / 2)} ${y1}V${F(y0 + w * .6)}Q${F(x - w / 2)} ${y0} ${x} ${F(y0 - w * .25)}Q${F(x + w / 2)} ${y0} ${F(x + w / 2)} ${F(y0 + w * .6)}V${y1}Z`;
        let w = '';
        [26, 30, 34].forEach(x => { w += arch(x, 2.4, 35, 41.2); });
        [15.6, 20.2].forEach(x => { w += arch(x, 1.7, 35, 41.2); });
        [39.8, 44.4].forEach(x => { w += arch(x, 1.7, 35, 41.2); });
        s += P(w, win, BK.gold, .6);
        /* the parapet */
        s += P('M12.2 31.2H47.8V33.4H12.2Z', BK.gold, BK.goldLo, .7);
        /* the drum, with its windows */
        s += P('M19.4 24.8H40.6V31.2H19.4Z', tq, tqLo, .9);
        let dw = '';
        [22.4, 26.2, 30, 33.8, 37.6].forEach((x, i) => { dw += arch(x, i === 0 || i === 4 ? 1.3 : 1.8, 26.8, 30.2); });
        s += P(dw, win);
        s += P('M18.8 24H41.2V25.4H18.8Z', BK.gold, BK.goldLo, .6);
        /* the golden dome and its finial */
        s += L('M30 9V4.6', BK.goldLo, 1.4) + `<circle cx="30" cy="6.4" r="1.1" fill="${BK.gold}" stroke="${BK.goldLo}" stroke-width=".5"/>`;
        s += P('M18.6 24.4C18.6 16.4 23.2 10.6 30 8.6C36.8 10.6 41.4 16.4 41.4 24.4Z', `url(#${u}dm)`, BK.goldLo, 1);
        s += P('M21.6 22.6C21.8 17.4 24.2 13.4 27.8 11C26 14 25 18 25 22.6Z', BK.goldHi, null, 0, 'opacity=".7"');
        return s;
      } },

    /* ── ABBASIDS: Madinat al-Salam, al-Mansur's Round City of Baghdad, from above ── */
    califado_abassida: { shape: 'roundel', field: '#17130F', what: 'a Cidade Redonda de Bagdá vista de cima: muralhas, quatro portas e a Cúpula Verde, em ouro sobre o negro abássida',
      draw: u => {
        const g = BK.gold, gl = BK.goldLo, gh = BK.goldHi, blk = '#17130F';
        let s = '';
        /* the moat, the outer wall, the great wall with its towers */
        s += B.ring(30, 30, 23.2, 1.3, '#2C5476');
        s += B.ring(30, 30, 21.6, 1.1, g);
        s += B.ring(30, 30, 18.8, 2.6, g) + B.dots(30, 30, 18.8, 28, 1.35, g, Math.PI / 28);
        /* the ring of houses: faint radial lanes */
        let lanes = '';
        for (let i = 0; i < 40; i++) {
          const a = i * Math.PI / 20;
          lanes += `M${pol(30, 30, a, 12.8).join(' ')}L${pol(30, 30, a, 17).join(' ')}`;
        }
        s += L(lanes, gl, .6, 'opacity=".75"') + B.ring(30, 30, 14.9, .7, gl);
        /* the inner wall */
        s += B.ring(30, 30, 12, 1.5, g);
        /* four roads from the four gates (Khorasan, Basra, Kufa, Syria) */
        let roads = '', gates = '';
        [1, 3, 5, 7].forEach(k => {
          const a = k * Math.PI / 4;
          roads += `<g transform="rotate(${k * 45} 30 30)"><path d="M41 28.2H52.6V31.8H41Z" fill="${blk}"/><path d="M41.6 28.2H52.4M41.6 31.8H52.4" stroke="${g}" stroke-width=".9"/></g>`;
          gates += `<g transform="rotate(${k * 45} 30 30)"><path d="M46.6 26.6H51.6V33.4H46.6Z" fill="${g}" stroke="${gl}" stroke-width=".7"/><path d="M48 29Q49.1 27.8 50.2 29V31H48Z" fill="${blk}"/>`
            + `<path d="M40.6 27.6H43.4V32.4H40.6Z" fill="${g}" stroke="${gl}" stroke-width=".6"/></g>`;
        });
        s += roads + gates;
        /* the central court: the palace of the Golden Gate under its Green Dome, and the mosque */
        s += `<g transform="rotate(45 30 30)"><path d="M25.6 25.6H34.4V34.4H25.6Z" fill="${g}" stroke="${gl}" stroke-width=".8"/>`
          + `<path d="M34.8 26.8H38.4V33.2H34.8Z" fill="${g}" stroke="${gl}" stroke-width=".7"/></g>`;
        s += `<circle cx="30" cy="30" r="3.1" fill="#2E8A55" stroke="#14492B" stroke-width=".8"/><circle cx="29" cy="29" r="1" fill="#7FCB98" opacity=".8"/>`;
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
        s += tower(18, 8, 6.4, 22, 4.4) + tower(42, 8, 6.4, 22, 4.4) + tower(30, 10.4, 8.4, 16.6, 6);
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
        const m = '#B2643A', mHi = '#D48A58', mLo = '#844222', ln = '#55280F', tor = '#2E1808';
        let s = `<defs>${lin(u, 'nk', [0, 0], [0, 1], [[0, '#163C66'], [1, '#2F6C9E']])}</defs>`;
        s += P('M0 0H60V60H0Z', `url(#${u}nk)`);
        /* the river at its foot */
        s += P('M0 51H60V60H0Z', '#C59A62') + L('M0 51.2H60', '#8E6A3C', .8);
        /* five tiers, each a little set back from the one below */
        const T = [[50.6, 12.6], [43, 10.6], [35.6, 8.6], [28.2, 6.8], [21, 5.2], [14, 3.8]];
        let body = '';
        for (let i = 0; i < 5; i++) {
          const [y0, h0] = T[i], [y1, h1] = T[i + 1];
          const hw = h1 + .6;
          body += `M${F(30 - h0)} ${y0}Q${F(30 - h0 + .4)} ${F((y0 + y1) / 2)} ${F(30 - hw)} ${F(y1 + .6)}L${F(30 - hw)} ${y1}H${F(30 + hw)}L${F(30 + hw)} ${F(y1 + .6)}Q${F(30 + h0 - .4)} ${F((y0 + y1) / 2)} ${F(30 + h0)} ${y0}Z`;
        }
        body += `M${F(30 - 4.4)} 14H${F(30 + 4.4)}V12.4H${F(30 - 4.4)}Z`;
        s += P(body, m, ln, .9);
        /* the shaded east face */
        let sh = '';
        for (let i = 0; i < 5; i++) {
          const [y0, h0] = T[i], [y1, h1] = T[i + 1];
          sh += `M${F(30 + h0 * .55)} ${y0}L${F(30 + (h1 + .6) * .55)} ${y1}H${F(30 + h1 + .6)}L${F(30 + h1 + .6)} ${F(y1 + .6)}Q${F(30 + h0 - .4)} ${F((y0 + y1) / 2)} ${F(30 + h0)} ${y0}Z`;
        }
        s += P(sh, mLo, null, 0, 'opacity=".55"');
        s += L('M21.6 49Q22.2 45 23.2 43.6M23.6 41.6Q24 38 25 36.4', mHi, .8, 'opacity=".8"');
        /* the beams, out past both sides and in rows across the face */
        let t = '';
        for (let i = 0; i < 5; i++) {
          const [y0, h0] = T[i], [y1] = T[i + 1];
          [.3, .7].forEach(k => {
            const y = F(y0 + (y1 - y0) * k), hw = h0 - (h0 - T[i + 1][1]) * k;
            t += `M${F(30 - hw - 2.2)} ${y}H${F(30 - hw + .4)}M${F(30 + hw - .4)} ${y}H${F(30 + hw + 2.2)}`;
          });
          const y = F((y0 + y1) / 2 + .2);
          for (let x = -h0 + 3; x < h0 - 2.4; x += 3.2) t += `M${F(30 + x)} ${y}h1.1`;
        }
        t += 'M30 12.4V9.4';
        s += L(t, tor, 1.1, 'stroke-linecap="butt"');
        return s;
      } },

    /* ── AYYUBIDS: the Eagle of Saladin, from the Citadel of Cairo ── */
    ayubida: { shape: 'heater', field: '#1E3B2F', what: 'a águia de Saladino (Cidadela do Cairo), de cabeça voltada, em ouro',
      draw: () => BEAST.eagle(10.5, 11, 39, 43, { fill: BK.gold, wings: 'down', tongue: false }) },

    /* ── OTTOMANS: a sultan's tughra — loops, three staffs with their pennants, the long arms ── */
    imperio_otomano: { shape: 'roundel', field: '#A11B1F', what: 'a tughra, o monograma caligráfico do sultão, em ouro sobre o vermelho otomano',
      draw: u => {
        const g = BK.gold, gl = BK.goldLo, gh = BK.goldHi;
        /* a reed pen: the same stroke laid along a slanted nib, broad across and fine along it */
        const nx = .7, ny = -1.25, n = 6;
        const nib = (d, w, col) => {
          let r = '';
          for (let i = 0; i <= n; i++) r += `<path d="${d}" transform="translate(${F(nx * (i / n - .5))} ${F(ny * (i / n - .5))})"/>`;
          return `<g fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${r}</g>`;
        };
        /* the two loops (beyze), whose upper strokes run on to the right as the arms */
        const outer = 'M31 40.6C24 43.6 12.6 42.6 10.2 35C8.2 28.6 13 23.6 20 24C25 24.4 28 25.6 31.4 26.2';
        const inner = 'M30.4 39C26 40.8 18.6 40.4 16.9 35.4C15.7 31.8 18.2 29.4 22 29.6C25.4 29.8 28 30.6 31.4 31';
        const arms = 'M29 25.3C37 25.6 45 25.1 52.4 24.1C45 26.3 37 27.5 29 27.9Z' + 'M29 30.1C37 30.5 44 30.5 50.6 30.1C44 31.9 37 32.7 29 32.7Z';
        /* the three staffs (tuğ), each with its pennant (zülfe) */
        const shafts = [[31.6, 10.6], [35.6, 11.2], [39.6, 12]].map(([x, t]) => `M${F(x - .95)} 41L${F(x - .6)} ${F(t + 1.4)}L${F(x + .3)} ${t}L${F(x + .7)} ${F(t + .7)}L${F(x + .95)} 41Z`).join('');
        const zulfe = [0, 1, 2].map(i => { const x = 31.6 + i * 4, y = 17.4 + i * 1.6; return `M${x} ${F(y)}C${F(x + 2.2)} ${F(y - 2.6)} ${F(x + 3.6)} ${F(y + 2.4)} ${F(x + 7)} ${F(y + .6)}`; }).join('');
        /* the base (sere): the name and titles, written small */
        const sere = 'M24.6 43.4C30 45.8 38 45.2 44.6 41.2M41.8 41C43 39.2 41.8 37.4 40.2 38C39 38.6 39.6 40.4 41 40.2M27.6 42V38.6M35.4 42.4C36.4 41 36 39.6 34.8 39.2';
        let s = '';
        /* the loops' insides, illuminated in lapis */
        s += P(outer + 'Z', '#1C3D8C', null, 0, 'opacity=".9"') + P(inner + 'Z', '#2A55A8');
        s += L('M14.6 33.6Q15.4 30.6 18 29.8M13.4 37.4Q14.4 39.8 18 40.4', g, .6, 'opacity=".7"');
        /* the dark edge of every stroke, then the gold */
        s += nib(outer + inner + sere, 2.2, gl) + nib(zulfe, 1.8, gl) + L(arms + shafts, gl, 1.2);
        s += nib(outer + inner + sere, 1, g) + nib(zulfe, .6, g) + P(arms + shafts, g);
        s += P('M33.6 37.4l.9-.9l.9.9l-.9.9zM37.8 38.6l.9-.9l.9.9l-.9.9z', g, gl, .4);
        s += L('M11.4 32.6C11.6 28.6 15 25.6 19.6 25.6', gh, .5, 'opacity=".7"');
        return s;
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
