/* ═══════════════════════════════════════════════════
   REINOS DA EUROPA — the kingdoms and empires of Europe, each with its
   own arms: England's three leopards, the lilies of France, Florence's
   red giglio, St Mark's lion, the Portuguese quinas and castles,
   Castile and León, the lion of the Seven Provinces, the black eagle
   of Prussia, the Russian double eagle with St George, the two crowns
   of Austria-Hungary and the ragged cross of Burgundy.
═══════════════════════════════════════════════════ */
(() => {
  const f = n => +n.toFixed(2);
  /* a filled path with an outline */
  const fp = (d, fill, stroke, w, extra) => `<path d="${d}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${w || .8}" stroke-linejoin="round"` : ''} ${extra || ''}/>`;
  /* a stroked line */
  const ln = (d, stroke, w, extra) => `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra || ''}/>`;
  /* a line with a darker outline, so it reads as a solid bar */
  const bar = (d, col, lo, w, extra) => ln(d, lo, w + 1, extra) + ln(d, col, w, extra);
  const mirX = (s, cx) => `<g transform="matrix(-1 0 0 1 ${2 * (cx || 0)} 0)">${s}</g>`;
  const at = (x, y, s, inner, rot) => `<g transform="translate(${f(x)} ${f(y)})${rot ? ` rotate(${rot})` : ''} scale(${s})">${inner}</g>`;
  /* the same transform BEAST uses, so a charge can be laid in a beast's own design box */
  const fitTr = (x, y, w, h, vb) => {
    const [vx, vy, vw, vh] = vb, s = Math.min(w / vw, h / vh);
    const ox = x + (w - vw * s) / 2, oy = y + (h - vh * s) / 2;
    return `matrix(${f(s)} 0 0 ${f(s)} ${f(ox - vx * s)} ${f(oy - vy * s)})`;
  };

  /* ── the heraldic fleur-de-lis, centre (0,0), about 22 tall and 23 wide ── */
  const fleur = (fill, lo, hi, lw) => {
    const C = 'M0 -12C2 -9.8 3.8 -7 3.8 -3.8C3.8 -1.6 3 0 2 1H-2C-3 0 -3.8 -1.6 -3.8 -3.8C-3.8 -7 -2 -9.8 0 -12Z';
    const S = 'M2.4 1C2.6 -3.6 4.6 -7.6 7.8 -8C10.6 -8.3 12.2 -6 11.6 -3.2C11.2 -1.2 10.2 .6 10.6 3.4C8.6 2.4 8 .4 8.4 -1.4C8.8 -3.2 8 -4.6 6.8 -4.2C5.4 -3.6 5 -1.4 5.2 1Z';
    const F = 'M1.6 3.6C2.4 5.8 4.4 6.6 6.4 6.6C8.2 6.6 9.4 7.8 9 9.6C8.4 8.8 7.4 8.6 6.4 8.8C4.2 9.2 2.2 8.2 .9 6.6Z';
    const L = 'M-1.8 3.6H1.8C1.6 5.8 1 7.6 0 9.6C-1 7.6 -1.6 5.8 -1.8 3.6Z';
    const Bd = 'M-6 1H6Q7.2 1 7.2 2.3Q7.2 3.6 6 3.6H-6Q-7.2 3.6 -7.2 2.3Q-7.2 1 -6 1Z';
    const side = fp(S, fill, lo, lw) + fp(F, fill, lo, lw);
    return side + mirX(side) + fp(L, fill, lo, lw) + fp(C, fill, lo, lw) + fp(Bd, fill, lo, lw)
      + fp('M-.8 -9.8C-2.2 -7.6 -2.8 -5.2 -2.6 -2.6C-1.8 -5 -1.2 -7.4 -.8 -9.8Z', hi, null, 0, 'opacity=".8"')
      + fp('M3.6 -1.6C4.2 -4.6 5.8 -6.8 8 -7.2C6.4 -6 4.8 -4.2 3.6 -1.6Z', hi, null, 0, 'opacity=".7"')
      + mirX(fp('M3.6 -1.6C4.2 -4.6 5.8 -6.8 8 -7.2C6.4 -6 4.8 -4.2 3.6 -1.6Z', hi, null, 0, 'opacity=".45"'))
      + ln('M-5.4 1.9H5.4', hi, .6, 'opacity=".7"');
  };

  /* ── the Florentine giglio, with its stamens, centre (0,0), about 36 tall and 40 wide ── */
  const giglio = (fill, lo, hi, lw) => {
    const C = 'M0 -20C3 -16.6 5.6 -12.4 5.6 -7.6C5.6 -4 4.2 -1.4 2.6 .6H-2.6C-4.2 -1.4 -5.6 -4 -5.6 -7.6C-5.6 -12.4 -3 -16.6 0 -20Z';
    const S = 'M4 .6C4.8 -6.4 8.6 -12.6 14 -13.2C18.2 -13.6 20.6 -10.4 19.6 -6.2C18.8 -3 16.6 -.6 17.2 3.6C14.2 2 13.4 -1 14.2 -3.8C15 -6.4 13.6 -8.4 11.6 -7.4C9.2 -6.2 8.2 -2.6 8.4 .6Z';
    /* a stamen: a stalk rising between the petals to a bud (the bottone) cupped in two sepals */
    const st = 'M6.8 -1.6C7.4 -5.6 8.6 -9.4 10.6 -12.6';
    const bud = 'M0 .6C-2.1 -.4 -2.4 -3.6 0 -7C2.4 -3.6 2.1 -.4 0 .6Z';
    const sep = 'M-.4 .8C-2.6 .6 -3.6 -1 -3.4 -2.8C-2.2 -1.6 -1.2 -1 .2 -.8Z';
    const stamen = ln(st, lo, 2.8) + ln(st, fill, 1.6)
      + at(10.9, -13.1, 1, fp(sep, fill, lo, lw) + mirX(fp(sep, fill, lo, lw)) + fp(bud, fill, lo, lw)
        + fp('M-.6 -1C-1.2 -2.4 -1 -4 -.2 -5.4', 'none', hi, .5, 'opacity=".6"'), 32);
    const F = 'M2.6 5C4.2 8 7.4 8.6 10 8.6C12.6 8.6 13.8 10.6 12.8 12.8C12 11.4 10.8 10.8 9 11C6 11.4 3.2 9.6 1.6 7.4Z';
    const L = 'M-2.4 4.8H2.4C2.2 8.4 1.4 11.6 0 14.4C-1.4 11.6 -2.2 8.4 -2.4 4.8Z';
    const Bd = 'M-9.6 .6H9.6Q11.2 .6 11.2 2.7Q11.2 4.8 9.6 4.8H-9.6Q-11.2 4.8 -11.2 2.7Q-11.2 .6 -9.6 .6Z';
    const side = stamen + fp(S, fill, lo, lw) + fp(F, fill, lo, lw)
      + fp('M5.4 -1.6C6.4 -6.8 9.6 -10.8 13.8 -12C11 -9.6 8 -6.4 5.4 -1.6Z', hi, null, 0, 'opacity=".5"');
    return side + mirX(side) + fp(L, fill, lo, lw) + fp(C, fill, lo, lw) + fp(Bd, fill, lo, lw)
      + fp('M-1.4 -16.4C-3.4 -13 -4.2 -9.4 -3.8 -5.4C-2.8 -9.2 -2 -12.8 -1.4 -16.4Z', hi, null, 0, 'opacity=".6"')
      + ln('M-8.6 2.2H8.6', hi, .7, 'opacity=".6"');
  };

  /* ── the castle of Castile: three towers, embattled, port and windows azure; base centre (0,0), 16 wide ── */
  const castle = (fill, lo, hole, lw) => {
    const merl = (x0, x1, y) => {
      const w = (x1 - x0) / 5;
      return `M${f(x0)} ${f(y)}V${f(y - 1.6)}H${f(x0 + w)}V${f(y)}H${f(x0 + 2 * w)}V${f(y - 1.6)}H${f(x0 + 3 * w)}V${f(y)}H${f(x0 + 4 * w)}V${f(y - 1.6)}H${f(x1)}V${f(y)}`;
    };
    const body = `M-8 0V-7.2${merl(-8, 8, -7.2).replace(/^M[^V]+/, '')}V0Z`;
    const tw = (x0, x1, y0, y1) => `M${x0} ${y1}V${y0}${merl(x0, x1, y0).replace(/^M[^V]+/, '')}V${y1}Z`;
    return fp(tw(-7.4, -3.4, -11.6, -7), fill, lo, lw) + fp(tw(3.4, 7.4, -11.6, -7), fill, lo, lw)
      + fp(tw(-2.6, 2.6, -15, -7), fill, lo, lw)
      + fp('M-8.6 0V-7.6H8.6V0Z', fill, lo, lw)
      + ln('M-8.6 -5.2H8.6M-8.6 -2.6H8.6M-4.6 -7.6V-5.2M1.4 -7.6V-5.2M6 -7.6V-5.2M-6.4 -5.2V-2.6M5 -5.2V-2.6M-6 -2.6V0M6 -2.6V0', lo, lw * .5, 'opacity=".55"')
      + fp('M-1.8 0V-3.4Q-1.8 -5.6 0 -5.6Q1.8 -5.6 1.8 -3.4V0Z', hole, lo, lw * .6)
      + fp('M-.7 -12H.7V-9.4H-.7Z', hole, null) + fp('M-5.9 -10.2H-4.9V-8.4H-5.9ZM4.9 -10.2H5.9V-8.4H4.9Z', hole, null);
  };

  /* ── a small heater escutcheon (a quina, the Hungarian shield): top (0,0), w wide, h tall ── */
  const esc = (w, h) => `M${-w / 2} 0H${w / 2}V${f(h * .5)}C${w / 2} ${f(h * .82)} ${f(w * .26)} ${f(h * .94)} 0 ${h}C${f(-w * .26)} ${f(h * .94)} ${-w / 2} ${f(h * .82)} ${-w / 2} ${f(h * .5)}Z`;

  Object.assign(BRASAO, {
    /* Gules, three lions passant guardant in pale Or, armed and langued azure */
    inglaterra: { shape: 'heater', field: '#A8222A', rim: '#6E1418', what: 'três leões passantes, ouro sobre vermelho (armas de Ricardo I)',
      draw: () => BEAST.lionPassant(12.6, 10.2, 34.8, 16.6, {})
        + BEAST.lionPassant(13.6, 25.6, 32.8, 15.6, {})
        + BEAST.lionPassant(17.6, 40.4, 24.8, 12.4, {}) },

    /* Azure, three fleurs-de-lis Or — France moderne, from Charles V */
    francia: { shape: 'heater', field: '#1F4A9A', what: 'três flores-de-lis de ouro sobre azul (França moderna)',
      draw: () => {
        const fl = fleur(BK.gold, BK.goldLo, BK.goldHi, .7);
        return at(21, 22.4, .74, fl) + at(39, 22.4, .74, fl) + at(30, 40.6, .74, fl);
      } },

    /* Argent, a fleur-de-lis florencé gules — the giglio bottonato of Florence */
    republica_florentina: { shape: 'french', field: '#F1EDE2', rim: '#8C1C20', what: 'o lírio vermelho (giglio) de Florença, com estames, sobre prata',
      draw: () => at(30, 31.4, 1.04, giglio('#C0232B', '#6E1418', '#E8605E', .8)) },

    /* the lion of St Mark, winged and haloed, its paw on the open Gospel */
    veneza: { shape: 'roundel', field: '#8E1A2B', what: 'o leão alado de São Marcos com o Evangelho aberto',
      draw: () => BEAST.lionWinged(6.6, 9, 47, 43, { halo: BK.goldHi }) },

    /* Argent, five escutcheons azure in cross each with five plates in saltire; a bordure gules with seven castles Or */
    portugal: { shape: 'heater', field: '#B8202A', what: 'as cinco quinas azuis e a bordadura vermelha com sete castelos',
      draw: () => {
        const inner = 'M15.4 14.2H44.6V29C44.6 40.4 38.4 46.6 30 51C21.6 46.6 15.4 40.4 15.4 29Z';
        let s = fp(inner, '#F3EEE2', '#6E1418', .7);
        const quina = (x, y) => {
          let q = fp(esc(6.4, 8.2), '#1F4A9A', '#13305F', .55);
          [[-1.6, 1.8], [1.6, 1.8], [0, 3.6], [-1.6, 5.4], [1.6, 5.4]].forEach(([a, b]) => { q += `<circle cx="${a}" cy="${b}" r=".72" fill="#F6F2E8"/>`; });
          return at(x, y, 1, q);
        };
        s += quina(30, 18.2) + quina(21.8, 27.4) + quina(30, 27.4) + quina(38.2, 27.4) + quina(30, 36.6);
        const c = castle(BK.gold, BK.goldLo, '#1F4A9A', .8);
        [[14.2, 15.2], [30, 13.6], [45.8, 15.2], [12.6, 28], [47.4, 28], [16.8, 42.2], [43.2, 42.2]].forEach(([x, y]) => { s += at(x, y, .28, c); });
        return s;
      } },

    /* Quarterly: 1 and 4 gules a castle Or (Castile), 2 and 3 argent a lion rampant purpure crowned Or (León) */
    espanha: { shape: 'french', field: '#B01E28', what: 'Castela e Leão esquartelados: castelo de ouro e leão púrpura',
      draw: () => {
        const sil = '#F1ECE0';
        let s = `<path d="M30 0H60V31H30Z" fill="${sil}"/><path d="M0 31H30V60H0Z" fill="${sil}"/>`;
        const c = castle(BK.gold, BK.goldLo, '#1F4A9A', .9);
        s += at(20.4, 28, .92, c) + at(39.8, 50, .86, c);
        const lion = { fill: '#6B2A78', crown: true };
        s += BEAST.lionRampant(31.6, 10.6, 17.4, 19.4, lion) + BEAST.lionRampant(12, 32.6, 17.4, 18.4, lion);
        s += ln('M30 9V56M10 31H50', '#0003', .6);
        return s;
      } },

    /* Gules, a lion rampant Or crowned, a sword in one paw and a sheaf of seven arrows in the other — the Generality lion */
    holanda: { shape: 'french', field: '#B3262B', what: 'o leão das Sete Províncias, com a espada e o feixe de sete flechas',
      draw: () => {
        const box = [11.4, 10.6, 37.6, 42], vb = [-12, -8, 112, 108];
        /* the sheaf of seven arrows, held in the lower forepaw (beast coordinates) */
        let ar = '';
        for (let i = 0; i < 7; i++) {
          const a = (-112 + (i - 3) * 6.2) * Math.PI / 180;
          const x0 = 16 - Math.cos(a) * 14, y0 = 54 - Math.sin(a) * 14, x1 = 16 + Math.cos(a) * 26, y1 = 54 + Math.sin(a) * 26;
          ar += bar(`M${f(x0)} ${f(y0)}L${f(x1)} ${f(y1)}`, BK.silver, BK.silverLo, 1.3);
          const hx = x1 + Math.cos(a) * 4, hy = y1 + Math.sin(a) * 4, px = -Math.sin(a) * 2, py = Math.cos(a) * 2;
          ar += fp(`M${f(hx)} ${f(hy)}L${f(x1 + px)} ${f(y1 + py)}L${f(x1 - px)} ${f(y1 - py)}Z`, BK.silver, BK.silverLo, .9);
        }
        return `<g transform="${fitTr(...box, vb)}">${ar}</g>` + BEAST.lionRampant(...box, { crown: true, sword: true });
      } },

    /* Argent, an eagle displayed sable crowned Or, holding sceptre and orb */
    prussia: { shape: 'heater', field: '#EFEBE1', what: 'a águia negra coroada da Prússia, com cetro e globo',
      draw: () => BEAST.eagle(11, 9.4, 38, 40, { heads: 1, crown: true, holds: true }) },

    /* Or, a double eagle sable under three crowns, sceptre and orb, St George on the breast */
    imperio_russo: { shape: 'oval', field: '#D9AC3F', what: 'a águia bicéfala sob três coroas, com São Jorge no peito',
      draw: () => {
        const box = [8.6, 7.4, 42.8, 44], vb = [0, -6, 100, 106];
        const sh = 'M40 37H60V50C60 57 55.6 61.6 50 64C44.4 61.6 40 57 40 50Z';
        const george = fp(sh, '#B4232A', '#6E1418', 1.2)
          /* St George on a white horse riding to dexter, spearing the dragon */
          + fp('M43.6 50.4C44.6 47.4 47.4 46.2 50.6 46.6C52.6 46.8 54.2 46 55 44.6L56.6 45.6C56 47 55.4 47.8 55.6 49.2C55.8 51 54.6 52.4 52.4 52.6L52.8 56.2H51.4L50.8 52.8H47.6L46.6 56.4H45.2L45.8 52.6C44.6 52.4 43.8 51.6 43.6 50.4Z', '#F4F0E6', '#8A8274', .5)
          + fp('M49.6 46.8C49 44.4 49.4 42.2 50.8 41.2C52.2 41.6 52.6 43.6 52.4 46.4Z', '#F4F0E6', '#8A8274', .5)
          + `<circle cx="51.2" cy="40.2" r="1.3" fill="#F4F0E6" stroke="#8A8274" stroke-width=".5"/>`
          + ln('M54.4 42L42.6 57', '#F4F0E6', 1.1)
          + fp('M41.6 58.4C42.8 56.2 45.6 56.4 47.4 57.8C46 58.4 44.6 59.6 43.6 61C42.6 60.4 41.8 59.6 41.6 58.4Z', '#1D1A18', null);
        return BEAST.eagle(...box, { heads: 2, crown: true, imperial: true, holds: true })
          + `<g transform="${fitTr(...box, vb)}">${george}</g>`;
      } },

    /* the two arms of the Dual Monarchy side by side under their crowns:
       Austria (gules a fess argent) and Hungary (barry gules and argent; the double cross on the triple mount) */
    austria_hungria: { shape: 'french', field: '#D7AE45', what: 'os escudos da Áustria e da Hungria lado a lado, sob as coroas',
      draw: () => {
        const W = 14.6, H = 19.6, red = '#B4232A', redLo = '#6E1418', sil = '#F3EFE5';
        const sp = esc(W, H);
        const austria = fp(sp, red, redLo, .8) + `<path d="M${-W / 2} ${f(H * .34)}H${W / 2}V${f(H * .64)}H${-W / 2}Z" fill="${sil}"/>` + fp(sp, 'none', redLo, .8);
        let bars = '';
        for (let i = 0; i < 4; i++) bars += `M${-W / 2} ${f(H / 8 * (2 * i + 1))}h${W / 2}v${f(H / 8)}h${-W / 2}Z`;
        const hung = fp(sp, red, redLo, .8)
          + `<path d="${bars}" fill="${sil}"/>`
          + fp('M.2 19.4V16.4C1.4 14.2 2.6 13.8 3.6 15C4.6 13.4 6.2 13.4 7.2 15V12.2H.2Z'.replace('V12.2H.2Z', 'V19Z'), '#2E7D3E', '#16461F', .5)
          + fp('M3.2 11.4L4 9.8L4.8 11.2L5.6 9.8L6.4 11.4L6.2 12.6H3.4Z', BK.gold, BK.goldLo, .4)
          + bar('M4.8 9.8V2.4M3.2 4.6H6.4M2.6 7H7', sil, '#8A8274', .9)
          + ln(`M0 0V${H}`, redLo, .5) + fp(sp, 'none', redLo, .8);
        /* a closed crown: band, arches and orb with cross */
        const crown = (cap) => fp('M-5.4 0C-6 -3.6 -4.6 -6.6 -2 -7.6H2C4.6 -6.6 6 -3.6 5.4 0Z', cap, BK.goldLo, .6)
          + ln('M0 -8.2V0M-5 -1.4C-4.6 -4.4 -3 -6.6 0 -7.4C3 -6.6 4.6 -4.4 5 -1.4', BK.gold, 1.1)
          + fp('M-6.2 -.6H6.2L5.6 2.4H-5.6Z', BK.gold, BK.goldLo, .6)
          + `<circle cx="0" cy="-9.1" r="1.3" fill="${BK.gold}" stroke="${BK.goldLo}" stroke-width=".5"/>`
          + ln('M0 -10.4V-12.6M-1 -11.6H1', BK.goldLo, .7);
        return at(21.6, 24.8, 1, austria) + at(38.4, 24.8, 1, hung)
          + at(21.6, 20.6, 1, crown(red)) + at(38.4, 20.6, 1, crown('#2E7D3E'));
      } },

    /* Argent, a saltire raguly gules — the Cross of Burgundy, the flag of the Spanish Empire */
    imperio_espanhol: { shape: 'banner', field: '#F2EDE2', what: 'a Cruz de Borgonha, aspas vermelhas raguladas sobre branco',
      draw: () => {
        const branch = (x0, y0, x1, y1) => {
          const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
          let d = `M${f(x0)} ${f(y0)}L${f(x1)} ${f(y1)}`, stubs = '';
          [.14, .27, .38, .62, .73, .86].forEach((t, i) => {
            const k = i % 2 ? 1 : -1, cx = x0 + dx * t, cy = y0 + dy * t, o = 2.6;
            const p = (a, b) => `${f(cx + ux * a + nx * b * k)} ${f(cy + uy * a + ny * b * k)}`;
            stubs += `M${p(-1.6, 1)}L${p(-.6, o + 1.6)}L${p(1.2, o + 1.6)}L${p(1.2, 1)}Z`;
          });
          return { d, stubs };
        };
        const a = branch(9, 15.4, 51, 44.4), b = branch(51, 15.4, 9, 44.4);
        const red = '#B8141E', lo = '#6E0E12';
        return fp(a.stubs + b.stubs, red, lo, 1.2) + ln(a.d + b.d, lo, 6.4) + fp(a.stubs + b.stubs, red, null) + ln(a.d + b.d, red, 5)
          + ln('M11 17.6L49 43.2M49 17.6L11 43.2', '#fff', .7, 'opacity=".25"');
      } },
  });
})();
