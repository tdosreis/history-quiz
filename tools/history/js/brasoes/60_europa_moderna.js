/* ═══════════════════════════════════════════════════
   EUROPA MODERNA — the states of revolutionary and modern Europe, each
   with the sign it put on its own flags and uniforms: the tricolour
   cockade and the red cap of liberty, Napoleon's eagle among the bees,
   the Union Flag, the Imperial State Crown, the black-white-red of the
   Kaiserreich under its crown, the fasces of Fascist Italy, and — for
   Nazi Germany, soberly and with no party sign — the soldier's steel
   helmet.
═══════════════════════════════════════════════════ */
(() => {
  const f = n => +n.toFixed(2);
  /* a filled path with an outline */
  const fp = (d, fill, stroke, w, extra) => `<path d="${d}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${w || .8}" stroke-linejoin="round"` : ''} ${extra || ''}/>`;
  /* a stroked line */
  const ln = (d, stroke, w, extra) => `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra || ''}/>`;
  const mirX = (s, cx) => `<g transform="matrix(-1 0 0 1 ${2 * (cx === undefined ? 30 : cx)} 0)">${s}</g>`;
  /* a half drawn and mirrored across x = 30 */
  const both = s => s + mirX(s);
  const at = (x, y, s, inner, rot) => `<g transform="translate(${f(x)} ${f(y)})${rot ? ` rotate(${rot})` : ''} scale(${s})">${inner}</g>`;
  const pearl = (x, y, r, fill, lo, w) => `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${fill}" stroke="${lo}" stroke-width="${w || .35}"/>`;

  /* a flag's cloth, waving: soft light and shade bands across the banner */
  const wave = u => `<defs><linearGradient id="${u}wv" x1="5" y1="0" x2="55" y2="0" gradientUnits="userSpaceOnUse">`
    + `<stop offset="0" stop-color="#000" stop-opacity=".1"/><stop offset=".22" stop-color="#fff" stop-opacity=".13"/>`
    + `<stop offset=".5" stop-color="#000" stop-opacity=".13"/><stop offset=".76" stop-color="#fff" stop-opacity=".1"/>`
    + `<stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient></defs>`
    + `<rect x="0" y="0" width="60" height="60" fill="url(#${u}wv)"/>`;

  /* a solid cross pattée, centre (0,0), arms reaching r */
  const patteeSolid = (r, fill, lo, w) => {
    const a = r * .3, b = r * .56;
    const d = `M${f(-a)} ${f(-a)}L${f(-b)} ${f(-r)}H${f(b)}L${f(a)} ${f(-a)}L${f(r)} ${f(-b)}V${f(b)}L${f(a)} ${f(a)}L${f(b)} ${f(r)}H${f(-b)}L${f(-a)} ${f(a)}L${f(-r)} ${f(b)}V${f(-b)}Z`;
    return fp(d, fill, lo, w);
  };

  /* the Napoleonic bee, seen from above, head up, about 6 tall; centre (0,0) */
  const bee = (G, Lo, Hi) => {
    const wing = fp('M-.6 -1.2C-2.4 -3.6 -4.6 -4 -5 -2.6C-5.3 -1.4 -3.4 -.2 -.8 -.2Z', G, Lo, .35)
      + fp('M-.6 .2C-2.4 .4 -4 1.6 -3.6 2.6C-3.2 3.4 -1.6 2.4 -.6 1Z', G, Lo, .35);
    return wing + mirX(wing, 0)
      + ln('M-.8 .4L-2 1.8M-.8 1.2L-1.6 3M.8 .4L2 1.8M.8 1.2L1.6 3', Lo, .4)
      + fp('M0 -.4C1.4 -.4 1.7 1.2 1.6 2.6C1.4 4.2 .8 5 0 5.8C-.8 5 -1.4 4.2 -1.6 2.6C-1.7 1.2 -1.4 -.4 0 -.4Z', G, Lo, .4)
      + ln('M-1.5 2.2Q0 2.8 1.5 2.2M-1.3 3.8Q0 4.4 1.3 3.8', Lo, .4)
      + `<ellipse cx="0" cy="-1.1" rx="1.05" ry="1" fill="${G}" stroke="${Lo}" stroke-width=".35"/>`
      + `<circle cx="0" cy="-2.8" r=".75" fill="${G}" stroke="${Lo}" stroke-width=".35"/>`
      + ln('M-.3 -3.4Q-.8 -4.6 -1.6 -4.8M.3 -3.4Q.8 -4.6 1.6 -4.8', Lo, .35)
      + fp('M-.4 .6Q-.6 2.4 -.2 4.2Q-.9 2.4 -.4 .6Z', Hi, null, 0, 'opacity=".9"');
  };

  Object.assign(BRASAO, {
    /* ── the cocarde tricolore of 1789, pleated ribbon round a blue button, with the bonnet rouge ── */
    franca_revolucionaria: { shape: 'roundel', field: '#B91F2A', rim: '#13305F', what: 'a cocarde tricolor de fita plissada com o barrete frígio vermelho',
      draw: () => {
        const R = '#B91F2A', Rlo = '#6E1418', W = '#F4F0E6', Wlo = '#B9B2A2', Bl = '#1F3F8F', Blo = '#13285C';
        const C = '#C9282D', Clo = '#6E1418', Chi = '#EC7A72';
        /* the pleats: thin darker folds round each ring of ribbon */
        const pleats = (r1, r2, n, col, op, rot) => {
          let d = '';
          for (let i = 0; i < n; i++) {
            const a = (rot || 0) + i * 2 * Math.PI / n, b = a + Math.PI / n * .55;
            d += `M${f(30 + Math.cos(a) * r1)} ${f(30 + Math.sin(a) * r1)}L${f(30 + Math.cos(a) * r2)} ${f(30 + Math.sin(a) * r2)}`
              + `L${f(30 + Math.cos(b) * r2)} ${f(30 + Math.sin(b) * r2)}L${f(30 + Math.cos(b) * r1)} ${f(30 + Math.sin(b) * r1)}Z`;
          }
          return `<path d="${d}" fill="${col}" opacity="${op}"/>`;
        };
        let s = pleats(21.6, 28, 40, Rlo, .3);
        s += `<circle cx="30" cy="30" r="21.6" fill="${W}" stroke="${Rlo}" stroke-width=".8"/>` + pleats(15.6, 21.6, 32, Wlo, .45, .05);
        s += `<circle cx="30" cy="30" r="15.6" fill="${Bl}" stroke="${Blo}" stroke-width=".9"/>`
          + `<circle cx="30" cy="30" r="13.8" fill="none" stroke="#fff" stroke-opacity=".16" stroke-width=".8"/>`;
        /* the Phrygian cap: a soft cone whose peak falls forward over the brow */
        const cap = 'M22.2 36C21.4 32.6 21.4 29.4 22.4 26.8C21 27.2 19.6 28.4 18.6 30.4C17.4 25.6 18.2 20.8 21.4 17.8'
          + 'C24.8 14.6 30.4 13.6 34.4 15.6C38.6 17.8 40 23 39.6 28.6C39.4 31.4 39 33.8 38.4 36Z';
        s += fp(cap, C, Clo, 1);
        /* shade down the back, light on the front of the crown */
        s += fp('M34.4 15.6C38.6 17.8 40 23 39.6 28.6C39.4 31.4 39 33.8 38.4 36H34.6C35.6 31.4 36 26.6 35.4 22.4C35 19.6 33.4 17.4 31.2 15.4C32.4 15.2 33.4 15.2 34.4 15.6Z', Clo, null, 0, 'opacity=".32"');
        s += fp('M20.2 26C19.6 22.6 20.8 19.6 23.4 17.6C26 15.8 29 15.2 31.4 15.6C27.6 16.6 24.4 18.6 22.4 21.6C21.6 23 21 24.4 20.2 26Z', Chi, null, 0, 'opacity=".85"');
        /* the fold where the peak turns down */
        s += ln('M22.4 26.8C23.6 22.8 26.8 20.4 31 20', Clo, .9);
        /* the headband */
        s += fp('M21.4 35.2Q30 37 39.2 35.2L39.5 39.4Q30 41.4 21.1 39.4Z', C, Clo, .9);
        s += ln('M22.2 36.5Q30 38.2 38.6 36.5', Chi, .6, 'opacity=".75"');
        /* a little cockade pinned on the cap */
        s += `<circle cx="33.4" cy="28.8" r="3.2" fill="${R}" stroke="${Clo}" stroke-width=".6"/><circle cx="33.4" cy="28.8" r="2.2" fill="${W}"/><circle cx="33.4" cy="28.8" r="1.15" fill="${Bl}"/>`;
        return s;
      } },

    /* ── Napoleon's imperial arms: azure, an eagle or on a thunderbolt, the field strewn with golden bees ── */
    imperio_frances: { shape: 'french', field: '#1C3D8C', what: 'a águia imperial napoleônica de ouro sobre o raio, entre abelhas de ouro, em azul',
      draw: () => {
        const G = BK.gold, Lo = BK.goldLo, Hi = BK.goldHi;
        let s = '';
        [[14.8, 30.4], [45.2, 30.4], [15.6, 45.2], [44.4, 45.2], [30, 51.4]].forEach(([x, y]) => { s += at(x, y, .7, bee(G, Lo, Hi)); });
        s += BEAST.eagleNapoleon(13.6, 13.2, 32.8, 35, { fill: G });
        return s;
      } },

    /* ── the Union Flag: the crosses of St George, St Andrew and St Patrick, counterchanged ── */
    reino_unido: { shape: 'banner', field: '#1B3A80', what: 'a Union Jack: as cruzes de São Jorge, Santo André e São Patrício',
      draw: u => {
        const W = '#F4F1EA', R = '#BC1C2E';
        const C = [30, 30];
        /* the white saltire, 6 wide (the flag 30 high) */
        let s = ln('M-20 0L80 60M80 0L-20 60', W, 6, 'stroke-linecap="butt"');
        /* St Patrick's red saltire, 2 wide, set against the centre line so that the broad white
           lies uppermost at the hoist: each arm offset the same way round (the pinwheel) */
        const arm = (px, py, rx, ry) => {
          const dx = px - C[0], dy = py - C[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
          let nx = -uy, ny = ux;
          if ((rx - C[0]) * nx + (ry - C[1]) * ny < 0) { nx = -nx; ny = -ny; }
          const E = [C[0] + ux * L * 1.4, C[1] + uy * L * 1.4];
          return `M${f(C[0])} ${f(C[1])}L${f(E[0])} ${f(E[1])}L${f(E[0] + nx * 2)} ${f(E[1] + ny * 2)}L${f(C[0] + nx * 2)} ${f(C[1] + ny * 2)}Z`;
        };
        s += `<path d="${arm(5, 15, 5, 30) + arm(55, 15, 30, 15) + arm(55, 45, 55, 30) + arm(5, 45, 30, 45)}" fill="${R}"/>`;
        /* St George's cross, fimbriated white */
        s += `<path d="M25 0H35V60H25ZM0 25H60V35H0Z" fill="${W}"/><path d="M27 0H33V60H27ZM0 27H60V33H0Z" fill="${R}"/>`;
        return s + wave(u);
      } },

    /* ── the Imperial State Crown (1838): crosses pattées and fleurs-de-lis, the arches, the monde,
          the Black Prince's Ruby in front, the purple cap and the ermine ── */
    imperio_britanico: { shape: 'roundel', field: '#7E1530', what: 'a Coroa Imperial do Estado, de ouro e pedras, com o barrete púrpura, sobre carmesim',
      draw: () => {
        const G = BK.gold, Lo = BK.goldLo, Hi = BK.goldHi, P = '#5C2A70', Plo = '#341540', Pe = '#F4EFE2', Pel = '#9C9282';
        let s = '';
        /* the purple velvet cap inside the arches */
        s += both(fp('M30 36H17.2C15.4 25 17.4 17 23 16C26 15.5 28.2 16.6 30 18.6Z', P, Plo, .7));
        s += fp('M19.6 33C18.4 26 19.6 20.6 23.4 19.2C21.6 22 21 27 22 33Z', '#8A4AA0', null, 0, 'opacity=".6"');
        /* the two side arches, edged with pearls, dipping to the monde */
        const archD = 'M17.4 34C15 24 17 16.6 22.8 15.4C26 14.8 28.4 16 30 18';
        s += both(ln(archD, Lo, 3.4) + ln(archD, G, 2.2) + ln('M17.9 30C16.6 23 18.4 17.6 22.8 16.6', Hi, .6, 'opacity=".9"'));
        let pr = '';
        for (let i = 0; i <= 6; i++) {
          const t = i / 6, u2 = 1 - t;
          /* points along the arch curve (cubic from (17.4,34) via (15,24),(17,16.6) to (22.8,15.4)) */
          const x = u2 * u2 * u2 * 17.4 + 3 * u2 * u2 * t * 15 + 3 * u2 * t * t * 17 + t * t * t * 22.8;
          const y = u2 * u2 * u2 * 34 + 3 * u2 * u2 * t * 24 + 3 * u2 * t * t * 16.6 + t * t * t * 15.4;
          if (i > 0) pr += pearl(x, y, .62, Pe, Pel, .3);
        }
        s += both(pr + pearl(26.2, 15.6, .62, Pe, Pel, .3));
        /* the front half-arch rising from the centre cross to the monde */
        s += fp('M28.8 25H31.2V16.6H28.8Z', G, Lo, .6) + [17.6, 20, 22.4].map(y => pearl(30, y, .55, Pe, Pel, .3)).join('');
        /* the monde and its cross */
        s += `<circle cx="30" cy="13.2" r="3.4" fill="${G}" stroke="${Lo}" stroke-width=".8"/>`
          + ln('M26.8 13.6Q30 15 33.2 13.6M30 9.9V16.6', Lo, .55) + `<circle cx="28.8" cy="12" r=".9" fill="${Hi}"/>`;
        s += at(30, 6.6, 1, patteeSolid(3.1, G, Lo, .6)) + `<rect x="29.3" y="9" width="1.4" height="1.2" fill="${G}"/>`;
        s += pearl(30, 6.6, .9, BK.red, BK.redLo, .3);
        /* the ornaments on the circlet: crosses at the front and sides, fleurs-de-lis between */
        const fleur = (x, y, k) => at(x, y, k,
          fp('M0 -6.4C1.4 -5 2.2 -3.4 2 -1.4C1.9 0 1.2 .8 .9 1.2H-.9C-1.2 .8 -1.9 0 -2 -1.4C-2.2 -3.4 -1.4 -5 0 -6.4Z', G, Lo, .5)
          + both2(fp('M1.2 1C1.4 -1.6 2.8 -3.8 4.6 -3.8C6 -3.8 6.6 -2.6 6.2 -1.2C5.6 .4 4.6 1.2 4.6 2.6C3.4 2 3.4 .6 3.9 -.4C3.4 -.6 2.6 .2 2.4 1Z', G, Lo, .5))
          + fp('M-3.4 1H3.4V2.8H-3.4Z', G, Lo, .5));
        const both2 = sh => sh + mirX(sh, 0);
        s += fleur(22.6, 32.6, .78) + fleur(37.4, 32.6, .78);
        s += at(17.4, 31.2, 1, `<g transform="scale(.55 1)">${patteeSolid(3.4, G, Lo, .6)}</g>`) + at(42.6, 31.2, 1, `<g transform="scale(.55 1)">${patteeSolid(3.4, G, Lo, .6)}</g>`);
        s += at(30, 29.4, 1, patteeSolid(5.4, G, Lo, .7));
        s += `<ellipse cx="30" cy="29.4" rx="2.3" ry="2.7" fill="#C0182A" stroke="#6E0E12" stroke-width=".5"/><ellipse cx="29.3" cy="28.5" rx=".7" ry=".9" fill="#F58A8A"/>`;
        /* the circlet, set with stones and edged with pearls */
        s += fp('M15.8 35.2Q30 37.4 44.2 35.2V40.6Q30 42.8 15.8 40.6Z', G, Lo, .8);
        s += ln('M16.6 36.4Q30 38.4 43.4 36.4', Hi, .5, 'opacity=".8"');
        let row = '';
        for (let i = 0; i < 11; i++) { const x = 17.4 + i * 2.52; if (Math.abs(x - 30) > 2.4) row += pearl(x, 36.1 + .9 * (1 - ((x - 30) / 14) ** 2) * 1.2 - .2, .48, Pe, Pel, .25); }
        s += row;
        s += `<rect x="28" y="37.1" width="4" height="3.4" rx=".8" fill="#E9EEF2" stroke="#7D8890" stroke-width=".4"/>`;
        s += `<ellipse cx="22.4" cy="39.3" rx="1.5" ry="1.1" fill="#1E8A55" stroke="#0E4A2C" stroke-width=".35"/><ellipse cx="37.6" cy="39.3" rx="1.5" ry="1.1" fill="#1E8A55" stroke="#0E4A2C" stroke-width=".35"/>`;
        s += `<ellipse cx="18.4" cy="38.8" rx="1.1" ry="1" fill="#2848A8" stroke="#13285C" stroke-width=".35"/><ellipse cx="41.6" cy="38.8" rx="1.1" ry="1" fill="#2848A8" stroke="#13285C" stroke-width=".35"/>`;
        /* the ermine band beneath */
        s += fp('M16.2 40.8Q30 43 43.8 40.8V45.2Q30 47.4 16.2 45.2Z', '#F4F0E6', '#9C9282', .7);
        /* ermine tails, following the curve of the band */
        s += [19.4, 24.7, 30, 35.3, 40.6].map(x => {
          const y = 42 + 1.05 * (1 - ((x - 30) / 13.8) ** 2);
          return fp(`M${x} ${f(y)}C${f(x + .6)} ${f(y + .7)} ${f(x + .8)} ${f(y + 1.7)} ${f(x + .7)} ${f(y + 2.5)}L${x} ${f(y + 2)}L${f(x - .7)} ${f(y + 2.5)}C${f(x - .8)} ${f(y + 1.7)} ${f(x - .6)} ${f(y + .7)} ${x} ${f(y)}Z`, BK.sable)
            + `<g fill="${BK.sable}"><circle cx="${x}" cy="${f(y - .55)}" r=".3"/><circle cx="${f(x - .65)}" cy="${f(y - .15)}" r=".3"/><circle cx="${f(x + .65)}" cy="${f(y - .15)}" r=".3"/></g>`;
        }).join('');
        /* set the whole crown a little lower and smaller, clear of the rim */
        return `<g transform="matrix(.9 0 0 .9 3 7.65)">${s}</g>`;
      } },

    /* ── the Kaiserreich's black-white-red with the German imperial crown of 1871 ── */
    imperio_alemao: { shape: 'banner', field: '#1D1A18', what: 'o tricolor imperial preto-branco-vermelho sob a coroa imperial alemã',
      draw: u => {
        const G = BK.gold, Lo = BK.goldLo, Hi = BK.goldHi, Pe = '#F4EFE2', Pel = '#9C9282', Cap = '#6E4C1A';
        let s = '';
        /* the crown: a dark brocade cap inside four arches */
        s += both(fp('M30 37H19.4C18 29 19.6 22.4 24 21C26.6 20.2 28.6 21 30 22.6Z', Cap, Lo, .8));
        s += both(ln('M21.6 34L27.6 24M24.6 35.4L29.4 27.6M20.8 29.6L25 22.6', '#8A6424', .6));
        const archD = 'M19.8 36C18.2 28.6 19.6 22.4 24 21.2C26.6 20.6 28.6 21.4 30 22.8';
        s += both(ln(archD, Lo, 3.6) + ln(archD, G, 2.4) + ln('M20.4 32C19.6 27 20.6 23.2 23.6 22.2', Hi, .6));
        s += fp('M28.7 30H31.3V22.4H28.7Z', G, Lo, .6);
        s += both([[19.6, 30.4], [19.8, 26.6], [21.6, 23.2], [25, 21.6]].map(([x, y]) => pearl(x, y, .62, Pe, Pel, .3)).join(''))
          + pearl(30, 25, .58, Pe, Pel, .3) + pearl(30, 27.6, .58, Pe, Pel, .3);
        /* the orb and its cross */
        s += `<circle cx="30" cy="18.6" r="2.9" fill="${G}" stroke="${Lo}" stroke-width=".8"/>` + ln('M27.2 19Q30 20.2 32.8 19', Lo, .5)
          + `<circle cx="29" cy="17.6" r=".8" fill="${Hi}"/>`;
        s += fp('M29.1 9.6H30.9V12.2H33.4V14H30.9V16H29.1V14H26.6V12.2H29.1Z', G, Lo, .6);
        /* the circlet: rounded plates, the great ones bearing crosses */
        const plate = (x, w, h) => fp(`M${f(x - w / 2)} 37V${f(37 - h + w / 2)}A${f(w / 2)} ${f(w / 2)} 0 0 1 ${f(x + w / 2)} ${f(37 - h + w / 2)}V37Z`, G, Lo, .7);
        s += plate(30, 7, 9.4) + both(plate(20.6, 5, 7.2));
        s += both(plate(25.4, 3.4, 5.4));
        const cross = (x, y, k) => at(x, y, k, fp('M-.9 -3.2H.9V-1.4H2.7V.4H.9V2.4H-.9V.4H-2.7V-1.4H-.9Z', G, Lo, .5));
        s += cross(30, 25.6, 1.15) + both(cross(20.6, 28, .9));
        s += `<ellipse cx="30" cy="32.4" rx="1.7" ry="2.2" fill="#C0182A" stroke="#6E0E12" stroke-width=".4"/>`
          + both(`<ellipse cx="20.6" cy="33.4" rx="1.2" ry="1.5" fill="#2350A8" stroke="#13285C" stroke-width=".4"/>`);
        s += fp('M17.8 36.6Q30 38.6 42.2 36.6V41.4Q30 43.4 17.8 41.4Z', G, Lo, .8) + ln('M18.6 37.8Q30 39.6 41.4 37.8', Hi, .5);
        s += both([20.4, 23.4, 26.4].map(x => pearl(x, 39.7, .55, Pe, Pel, .3)).join('')) + `<rect x="28.6" y="38.4" width="2.8" height="2.6" rx=".6" fill="#1E8A55" stroke="#0E4A2C" stroke-width=".4"/>`;
        /* the flag behind it: black, white and red */
        return `<path d="M0 25.4H60V34.6H0Z" fill="#F2EEE4"/><path d="M0 34.6H60V60H0Z" fill="#BE1E2A"/>` + wave(u)
          + `<g transform="matrix(.85 0 0 .85 4.5 7.5)">${s}</g>`;
      } },

    /* ── the fascio littorio: rods bound round an axe, bronze on black ── */
    italia_fascista: { shape: 'heater', field: '#1B1816', rim: '#7A4F22', what: 'o fascio littorio: o feixe de varas atado em volta do machado, em bronze sobre negro',
      draw: () => {
        const Bz = '#BC8442', Lo = '#6A4118', Hi = '#EBC384', Mid = '#9A6630';
        let s = '';
        /* the helve, rising out of the bundle */
        s += fp('M28.8 13.4H31.2V24H28.8Z', Mid, Lo, .8) + `<circle cx="30" cy="13.6" r="1.4" fill="${Bz}" stroke="${Lo}" stroke-width=".7"/>`;
        /* the axe-head: a socket on the helve and a broad blade standing out to the left */
        s += fp('M28.2 15.4C24.8 15.6 21 14.6 17.8 12.8C15.4 16.4 15.2 21.6 17.4 25C20.6 23.2 24.6 22.2 28.2 22.4Z', Bz, Lo, 1);
        s += fp('M18.5 14.6C16.8 17.4 16.7 20.8 17.9 23.4C18.4 20.4 18.7 17.6 18.5 14.6Z', Hi, null, 0, 'opacity=".95"');
        s += ln('M27.2 16.6C24.6 16.6 22 16 19.6 15', Lo, .55, 'opacity=".6"');
        s += fp('M27.6 14.8H32.4V23H27.6Z', Bz, Lo, .8) + ln('M28.5 15.8V22', Hi, .55, 'opacity=".8"');
        /* the rods: five, their heads rounded */
        const rods = [[24, 22.8], [27, 21.9], [30, 21.5], [33, 21.9], [36, 22.8]];
        rods.forEach(([x, top]) => {
          const L = x - 1.5, R = x + 1.5;
          s += fp(`M${f(L)} 46.4V${f(top + 1.5)}Q${f(L)} ${f(top)} ${x} ${f(top)}Q${f(R)} ${f(top)} ${f(R)} ${f(top + 1.5)}V46.4Z`, Bz, Lo, .6);
          s += ln(`M${f(x - .6)} ${f(top + 1.3)}V45.8`, Hi, .6, 'opacity=".75"');
        });
        /* the thongs: a band at head and foot, a criss-cross between */
        let lace = '';
        [[27.2, 34.8], [34.8, 42.4]].forEach(([a, b]) => { lace += `M22.6 ${a}L37.4 ${b}M37.4 ${a}L22.6 ${b}`; });
        s += ln(lace, Lo, 2.3) + ln(lace, Mid, 1.2);
        const band = y => fp(`M22 ${y}Q30 ${f(y + 1.3)} 38 ${y}V${f(y + 2.4)}Q30 ${f(y + 3.7)} 22 ${f(y + 2.4)}Z`, Mid, Lo, .7)
          + ln(`M22.8 ${f(y + .8)}Q30 ${f(y + 2)} 37.2 ${f(y + .8)}`, Hi, .45, 'opacity=".7"');
        s += band(24.6) + band(42);
        s += fp('M22.6 46H37.4L36.7 47.8H23.3Z', Mid, Lo, .6);
        return s;
      } },

    /* ── the Wehrmacht's M1935 steel helmet, in profile: a soldier's helmet, no insignia ── */
    alemanha_nazista: { shape: 'roundel', field: '#161513', rim: '#4C4F45', what: 'o capacete de aço M1935 (Stahlhelm) de perfil, cinza-campo sobre negro, sem insígnias',
      draw: () => {
        const Fg = '#6E7362', Lo = '#34382E', Hi = '#A6AB94', Dk = '#535848';
        /* facing left: the deep dome, the short visor, the side skirt over the ear and the
           flared neck-guard behind */
        const shell = 'M29.4 14C21.4 14.2 16.8 20 16.2 27.4C15 29 13.6 30.2 11.8 31.2C11.4 31.6 11.8 32.4 12.6 32.4'
          + 'C15.6 32 18.4 32.4 20.6 33.4C24 35 26.4 37.6 30.4 39C34.4 40.2 40 40.2 44.8 39.6C46.6 39.4 48 39 49 38.4'
          + 'C50 37.8 50 37 49.4 36.6C47 34.4 45.8 31.4 45.4 27.8C44.6 19.6 38.4 13.8 29.4 14Z';
        let s = fp(shell, Fg, Lo, 1);
        /* the flared skirt below the step, turned from the light */
        const step = 'M16.2 27.4C20.4 28.6 24.4 31.6 29.6 33C34.8 34.4 40.6 34 45.6 31';
        s += fp(step + 'C46.4 33.2 47.6 35 49.4 36.6C50 37 50 37.8 49 38.4C48 39 46.6 39.4 44.8 39.6C40 40.2 34.4 40.2 30.4 39'
          + 'C26.4 37.6 24 35 20.6 33.4C18.4 32.4 15.6 32 12.6 32.4C11.8 32.4 11.4 31.6 11.8 31.2C13.6 30.2 15 29 16.2 27.4Z', Dk, null, 0);
        s += ln(step, Lo, .9);
        /* light on the dome */
        s += fp('M18.4 25.2C19.4 20 23.6 16.2 29.4 15.8C25.4 17.4 21.8 20.8 20.6 25.6Z', Hi, null, 0, 'opacity=".9"');
        s += fp('M33.4 16.2C38 17.2 41.6 20.4 42.8 24.8C40.4 21.4 37.2 18.6 33.4 16.2Z', Hi, null, 0, 'opacity=".45"');
        /* the rolled rim catching the light */
        s += ln('M13.4 31.6C16.6 31.4 19.2 32 21.4 33.2C24.6 35 27 37.4 30.8 38.4C35 39.4 40.4 39.4 44.8 38.8C46.4 38.6 47.6 38.2 48.4 37.8', Hi, .5, 'opacity=".55"');
        /* the ventilation lug */
        s += `<circle cx="24.4" cy="24.4" r="1.5" fill="${Fg}" stroke="${Lo}" stroke-width=".7"/><circle cx="24.4" cy="24.4" r=".55" fill="${Lo}"/>`;
        return `<g transform="translate(.4 1.6)">${s}</g>`;
      } },
  });
})();
