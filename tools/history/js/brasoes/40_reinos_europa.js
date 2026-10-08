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
    const S = 'M2.2 1C2.4 -3.8 4.6 -8 8 -8.4C11 -8.7 12.8 -6.2 12.1 -3.2C11.6 -1 10.6 .8 11 3.8C8.8 2.8 8.3 .6 8.8 -1.2C9.2 -2.8 8.6 -3.8 7.6 -3.6C6.4 -3.3 6 -1.4 6.1 1Z';
    const F = 'M1.4 3.6C2 5.4 3.8 6 5.8 6C8.4 6 10 7.6 9.4 10.2C8.6 9 7.4 8.6 6 8.8C3.6 9.2 1.6 8.4 .6 6.8Z';
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
      draw: () => {
        /* the leopards of England are long-bodied: each lion is drawn, then drawn out sideways */
        const L = (cy, h, k) => {
          const w = h * 100 / 64;
          return `<g transform="translate(30 ${cy}) scale(${k} 1) translate(-30 ${-cy})">${BEAST.lionPassant(30 - w / 2, cy - h / 2, w, h, {})}</g>`;
        };
        return L(18.2, 13.6, 1.34) + L(32, 12.8, 1.34) + L(44.8, 10.6, 1.3);
      } },

    /* Azure, three fleurs-de-lis Or — France moderne, from Charles V */
    francia: { shape: 'heater', field: '#1F4A9A', what: 'três flores-de-lis de ouro sobre azul (França moderna)',
      draw: () => {
        const fl = fleur(BK.gold, BK.goldLo, BK.goldHi, .7);
        return at(20.4, 22.2, .78, fl) + at(39.6, 22.2, .78, fl) + at(30, 41.4, .78, fl);
      } },

    /* Argent, a fleur-de-lis florencé gules — the giglio bottonato of Florence */
    republica_florentina: { shape: 'french', field: '#F1EDE2', rim: '#8C1C20', what: 'o lírio vermelho (giglio) de Florença, com estames, sobre prata',
      draw: () => at(30, 32.4, .9, giglio('#C0232B', '#6E1418', '#E8605E', .8)) },

    /* the lion of St Mark, winged and haloed, its paw on the open Gospel */
    veneza: { shape: 'roundel', field: '#8E1A2B', what: 'o leão alado de São Marcos com o Evangelho aberto',
      draw: () => BEAST.lionWinged(9.6, 13, 42, 38.6, { halo: BK.goldHi }) },
    /* Argent, five escutcheons azure in cross each with five plates in saltire; a bordure gules with seven castles Or */
    portugal: { shape: 'heater', field: '#B8202A', what: 'as cinco quinas azuis e a bordadura vermelha com sete castelos',
      draw: () => {
        const inner = 'M17.2 16.6H42.8V29.4C42.8 39.8 37.4 45.6 30 49.6C22.6 45.6 17.2 39.8 17.2 29.4Z';
        let s = fp(inner, '#F3EEE2', '#6E1418', .8)
          + ln('M18.4 17.8H41.6', '#fff', .7, 'opacity=".5"');
        const quina = (x, y) => {
          let q = fp(esc(6.6, 8.4), '#1F4A9A', '#13305F', .6)
            + fp('M-2.6 .9H-1.2V5.6C-1.6 4.2 -2.3 2.6 -2.6 .9Z', '#4B78C4', null, 0, 'opacity=".7"');
          [[-1.65, 1.85], [1.65, 1.85], [0, 3.7], [-1.65, 5.55], [1.65, 5.55]].forEach(([a, b]) => { q += `<circle cx="${a}" cy="${b}" r=".78" fill="#F6F2E8"/>`; });
          return at(x, y, 1, q);
        };
        s += quina(30, 19.2) + quina(22.4, 28) + quina(30, 28) + quina(37.6, 28) + quina(30, 36.8);
        const c = castle(BK.gold, BK.goldLo, '#1F4A9A', .8);
        [[14.5, 15.4], [30, 15.1], [45.5, 15.4], [13.9, 30], [46.1, 30], [17.6, 43.4], [42.4, 43.4]].forEach(([x, y]) => { s += at(x, y, .36, c); });
        return s;
      } },

    /* Quarterly: 1 and 4 gules a castle Or (Castile), 2 and 3 argent a lion rampant purpure crowned Or (León) */
    espanha: { shape: 'french', field: '#B01E28', what: 'Castela e Leão esquartelados: castelo de ouro e leão púrpura',
      draw: () => {
        const sil = '#F1ECE0';
        let s = `<path d="M30 0H60V31H30Z" fill="${sil}"/><path d="M0 31H30V60H0Z" fill="${sil}"/>`;
        const c = castle(BK.gold, BK.goldLo, '#1F4A9A', .9);
        s += at(20.2, 28, .9, c) + at(40, 47.2, .76, c);
        const lion = { fill: '#6B2A78', crown: true };
        s += BEAST.lionRampant(31.4, 10.8, 17.4, 19.2, lion) + BEAST.lionRampant(12.6, 32.4, 16, 15.4, lion);
        s += ln('M30 9V56M10 31H50', '#0003', .6);
        return s;
      } },

    /* Gules, a lion rampant Or crowned, a sword in one paw and a sheaf of seven arrows in the other — the Generality lion */
    holanda: { shape: 'french', field: '#B3262B', what: 'o leão das Sete Províncias, com a espada e o feixe de sete flechas',
      draw: () => {
        const box = [11.6, 10.4, 37.6, 42.4], vb = [-12, -8, 112, 108];
        /* the sheaf of seven arrows, bound Or, gripped in the lower forepaw (beast coordinates):
           fanned above and below the binding, points down */
        const bx = 15.4, by = 57, up = 25, dn = 14;
        let shafts = '', heads = '', fl = '';
        for (let i = 0; i < 7; i++) {
          const a = (118 + (i - 3) * 6.4) * Math.PI / 180, ux = Math.cos(a), uy = Math.sin(a), nx = -uy, ny = ux;
          const hx = bx + ux * up, hy = by + uy * up, tx = bx - ux * dn, ty = by - uy * dn;
          shafts += `M${f(tx)} ${f(ty)}L${f(hx)} ${f(hy)}`;
          heads += `M${f(hx + ux * 6.6)} ${f(hy + uy * 6.6)}L${f(hx + nx * 1.45)} ${f(hy + ny * 1.45)}L${f(hx + ux * .7)} ${f(hy + uy * .7)}L${f(hx - nx * 1.45)} ${f(hy - ny * 1.45)}Z`;
          fl += `M${f(tx + ux * 5 + nx * .2)} ${f(ty + uy * 5 + ny * .2)}L${f(tx + nx * 1.6)} ${f(ty + ny * 1.6)}M${f(tx + ux * 5 - nx * .2)} ${f(ty + uy * 5 - ny * .2)}L${f(tx - nx * 1.6)} ${f(ty - ny * 1.6)}`;
        }
        const sheaf = ln(fl, BK.silverLo, 1.2)
          + ln(shafts, BK.silverLo, 2.3) + ln(shafts, BK.silver, 1.2)
          + fp(heads, BK.gold, BK.goldLo, .9)
          + `<g transform="rotate(28 ${bx} ${by})"><rect x="${bx - 4.6}" y="${by - 2}" width="9.2" height="4" rx="1.2" fill="${BK.gold}" stroke="${BK.goldLo}" stroke-width="1"/>`
          + ln(`M${bx - 3.6} ${by - .9}H${bx + 3.6}`, BK.goldHi, .8, 'opacity=".8"') + `</g>`;
        return BEAST.lionRampant(...box, { crown: true, sword: true })
          + `<g transform="${fitTr(...box, vb)}">${sheaf}</g>`;
      } },

    /* Argent, an eagle displayed sable crowned Or, holding sceptre and orb */
    prussia: { shape: 'heater', field: '#EFEBE1', what: 'a águia negra coroada da Prússia, com cetro e globo',
      draw: () => BEAST.eagle(12.4, 9.8, 35.2, 38.4, { heads: 1, crown: true, holds: true }) },

    /* Or, a double eagle sable under three crowns, sceptre and orb, St George on the breast */
    imperio_russo: { shape: 'oval', field: '#D9AC3F', what: 'a águia bicéfala negra sob três coroas, com São Jorge no peito, sobre ouro',
      draw: () => {
        const box = [10.2, 7.8, 39.6, 43.2], vb = [0, -6, 100, 106];
        /* the arms of Moscow on the breast (beast coordinates; the shield is 22 by 29 from 39,36):
           St George in silver on a silver horse, his cloak azure, riding to dexter and spearing
           the black dragon; the shield edged gold, as the collar of St Andrew rings it */
        const sh = 'M0 0H22V14C22 21.6 17.4 26.4 11 29C4.6 26.4 0 21.6 0 14Z';
        const W = '#F4F0E6', Wl = '#8A8274';
        /* the horse and rider as one silhouette: outline every part, then fill every part */
        const parts = [
          ['e', 12, 14.4, 5.2, 2.9, -10], ['e', 4.8, 9.4, 2.2, 1.25, 38],
          ['l', 'M8.2 13L6 9.6', 2.8], ['l', 'M8 15.2L5 15.6L4.4 17.8', 1.3], ['l', 'M8.8 15.8L6.8 17.6L7 19.6', 1.3],
          ['l', 'M15.8 15.6L17.4 18.6L16.8 21.6', 1.4], ['l', 'M14.6 16.4L14.4 19.4L13.2 22', 1.4],
          ['l', 'M16.8 13.2Q19.8 13.6 19.4 17.6', 1.3], ['l', 'M6.4 8.4L6.2 6.8', .9],
          ['l', 'M12 12.4L11.4 7.6', 2.4], ['c', 11.2, 6, 1.35], ['l', 'M12 12.4L10.6 14.8L10.8 16.4', 1.2],
        ];
        const shape = (p, stroke, extra) => p[0] === 'e'
          ? `<ellipse cx="${p[1]}" cy="${p[2]}" rx="${p[3]}" ry="${p[4]}" transform="rotate(${p[5]} ${p[1]} ${p[2]})" ${stroke}/>`
          : p[0] === 'c' ? `<circle cx="${p[1]}" cy="${p[2]}" r="${p[3]}" ${stroke}/>`
          : `<path d="${p[1]}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${extra(p[2])}/>`;
        const sil = `<g fill="${Wl}" stroke="${Wl}" stroke-width="1">${parts.map(p => shape(p, '', w => `stroke="${Wl}" stroke-width="${w + 1}"`)).join('')}</g>`
          + `<g fill="${W}">${parts.map(p => shape(p, '', w => `stroke="${W}" stroke-width="${w}"`)).join('')}</g>`;
        const cloak = fp('M12.2 7.4C14.4 7.2 16.6 8 17.6 9.6C16 9.4 15.2 10.2 14.6 11.4C13.8 10.2 12.8 9.6 12 9.6Z', '#2E5FB0', '#173A75', .5);
        const dragon = fp('M2.2 22.6C3.6 20.6 6.6 20.2 9.4 21.4C11.6 22.4 13.6 22.6 15.4 21.4C15 23.6 12.6 25 10 24.4C7.6 23.8 5.2 23.8 3.4 25Z', '#1D1A18', null)
          + fp('M7.6 21.2L9.4 18.8L10.4 21.6Z', '#1D1A18', null) + `<circle cx="2.8" cy="22" r="1.4" fill="#1D1A18"/>`;
        const spear = ln('M16.4 4.2L2.8 22.4', '#5A4A2A', 1.3) + ln('M16.4 4.2L2.8 22.4', BK.goldHi, .6);
        const george = at(39, 36, 1, fp(sh, '#B4232A', null) + dragon + cloak + sil + spear
          + fp('M2 1.4H4.2V14C3 12 2.2 8 2 1.4Z', '#fff', null, 0, 'opacity=".18"')
          + fp(sh, 'none', BK.gold, 1.4) + fp(sh, 'none', BK.goldLo, .5));
        return BEAST.eagle(...box, { heads: 2, crown: true, imperial: true, holds: true })
          + `<g transform="${fitTr(...box, vb)}">${george}</g>`;
      } },

    /* the Dual Monarchy as its 1915 arms show it: Austria and Hungary side by side, each under
       its own crown — the Rudolfine imperial crown (mitre and arch) over Austria's gules a fess
       argent, the Holy Crown of St Stephen (its cross bent) over Hungary's arms: barry gules and
       argent, and the patriarchal cross on a crown on the green triple mount. Sable and Or: the
       Habsburg colours. */
    austria_hungria: { shape: 'french', field: '#26221E', rim: BK.gold, what: 'a Áustria e a Hungria lado a lado, cada uma sob a sua coroa (a imperial e a de Santo Estêvão)',
      draw: u => {
        const W = 16, H = 21, red = '#BE2A2E', redLo = '#6E1418', sil = '#F3EFE5', silLo = '#9A9282';
        const g = BK.gold, gl = BK.goldLo, gh = BK.goldHi;
        const sp = esc(W, H);
        const xa = 20.4, xh = 39.6, y0 = 27.6;
        const defs = `<defs><clipPath id="${u}hu"><path d="${sp}" transform="translate(${xh} ${y0})"/></clipPath>`
          + `<clipPath id="${u}au"><path d="${sp}"/></clipPath></defs>`;
        /* Austria: gules, a fess argent */
        const austria = `<g clip-path="url(#${u}au)">` + fp(sp, red, null)
          + `<path d="M${-W / 2} ${f(H * .34)}H${W / 2}V${f(H * .64)}H${-W / 2}Z" fill="${sil}"/>`
          + ln(`M${-W / 2} ${f(H * .34)}H${W / 2}M${-W / 2} ${f(H * .64)}H${W / 2}`, silLo, .5)
          + fp('M-6.2 1.2H-4.4V10.6C-5.4 8.4 -6 5.2 -6.2 1.2Z', '#fff', null, 0, 'opacity=".22"') + `</g>`
          + fp(sp, 'none', redLo, 1);
        /* Hungary, per pale: barry of eight gules and argent | gules, the double cross on the triple mount */
        let bars = '';
        for (let i = 1; i < 8; i += 2) bars += `M${-W / 2} ${f(H / 8 * i)}h${W / 2}v${f(H / 8)}h${-W / 2}Z`;
        const hung = `<g clip-path="url(#${u}hu)"><g transform="translate(${xh} ${y0})">`
          + `<path d="M${-W / 2} 0H${W / 2}V${H}H${-W / 2}Z" fill="${red}"/><path d="${bars}" fill="${sil}"/>`
          + fp(`M0 ${H}V15.4Q1.1 13.6 2.4 14.8Q4 11.6 5.6 14.8Q6.9 13.6 8 15.4V${H}Z`, '#2F7D3F', '#16461F', .6)
          + fp('M2.3 12.6L2 10.4L3 11.3L4 9.8L5 11.3L6 10.4L5.7 12.6Z', g, gl, .45)
          + bar('M4 10.2V2.2M2.1 4.4H5.9M1.5 7.2H6.5', sil, silLo, 1.1)
          + `</g></g>` + at(xh, y0, 1, ln(`M0 0V${H}`, redLo, .6) + fp(sp, 'none', redLo, 1));
        /* the Austrian imperial crown: two gold half-mitres, the red cap between, the arch with its sapphire and cross */
        const half = 'M-6.8 -2.4C-7 -7.6 -5.6 -11 -2.8 -12.4C-2 -9.4 -1.9 -5.6 -2.1 -2.4Z';
        const crownA = fp('M-3.4 -2.4C-3.6 -8.6 -2 -12 0 -12.6C2 -12 3.6 -8.6 3.4 -2.4Z', red, redLo, .6)
          + fp(half, g, gl, .6) + mirX(fp(half, g, gl, .6))
          + fp('M-5.4 -3.4C-5.4 -7 -4.6 -9.4 -3 -10.6C-3.4 -8 -3.6 -5.6 -3.6 -3.4Z', gh, null, 0, 'opacity=".7"')
          + bar('M0 -2.4V-12.4', g, gl, 1)
          + `<circle cx="0" cy="-13.7" r="1.5" fill="#3E6FC4" stroke="#1C3D8C" stroke-width=".6"/>`
          + bar('M0 -15.2V-17.6M-1.1 -16.5H1.1', g, gl, .8)
          + fp('M-7.6 -3.2H7.6L7 .8H-7Z', g, gl, .6)
          + `<circle cx="-4.6" cy="-1.2" r=".85" fill="${red}"/><circle cx="0" cy="-1.2" r=".95" fill="#3E6FC4"/><circle cx="4.6" cy="-1.2" r=".85" fill="${red}"/>`;
        /* the Holy Crown of Hungary: the enamelled band and its plaques, the dome of crossed bands, the bent cross */
        const crownH = fp('M-6.6 -3C-6.6 -9.6 -3.6 -13 0 -13.2C3.6 -13 6.6 -9.6 6.6 -3Z', g, gl, .6)
          + fp('M-4.6 -4C-4.6 -8.8 -2.8 -11.2 -1 -11.8C-2 -9 -2.4 -6.6 -2.4 -4Z', gh, null, 0, 'opacity=".55"')
          + ln('M-6 -6.6Q0 -9.4 6 -6.6', gl, .6) + bar('M0 -3V-13', g, gl, 1.1)
          + `<circle cx="0" cy="-8.2" r=".9" fill="${red}"/>`
          + fp('M-2.6 -2.6L0 -6.4L2.6 -2.6Z', '#2E6FA8', gl, .5)
          + fp('M-7.2 -2.6L-5.8 -5L-4.4 -2.6ZM7.2 -2.6L5.8 -5L4.4 -2.6Z', g, gl, .5)
          + fp('M-7.6 -3H7.6L7.2 1H-7.2Z', g, gl, .6)
          + `<circle cx="-4.4" cy="-1" r=".85" fill="#2F7D3F"/><circle cx="0" cy="-1" r=".95" fill="${red}"/><circle cx="4.4" cy="-1" r=".85" fill="#2F7D3F"/>`
          + `<g transform="rotate(18 0 -13)">${bar('M0 -13V-17.6M-1.4 -15.9H1.4', g, gl, .9)}</g>`
          + ln('M-7.2 .4Q-8 2.6 -7.4 4.8M7.2 .4Q8 2.6 7.4 4.8', gl, .7) + `<circle cx="-7.4" cy="5" r=".7" fill="${g}"/><circle cx="7.4" cy="5" r=".7" fill="${g}"/>`;
        return defs + at(xa, y0, 1, austria) + hung + at(xa, 26.3, .88, crownA) + at(xh, 26.3, .88, crownH);
      } },

    /* Argent, a saltire raguly gules — the Cross of Burgundy, the flag of the Spanish Empire */
    imperio_espanhol: { shape: 'banner', field: '#F2EDE2', what: 'a Cruz de Borgonha, aspas vermelhas raguladas sobre branco',
      draw: () => {
        const red = '#B8141E', lo = '#6E0E12', hi = '#D9454B', cut = '#E58A80';
        /* a rough-hewn stave: the trunk a little uneven, the lopped branches standing off
           alternately to either side, each leaning toward the nearer end, its cut face showing */
        const stave = (x0, y0, x1, y1) => {
          const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
          const P = (t, b) => [x0 + dx * t + nx * b, y0 + dy * t + ny * b];
          const S = p => `${f(p[0])} ${f(p[1])}`;
          /* the trunk: 5.2 wide, a slight swell and pinch along each edge */
          const w = [2.7, 2.55, 2.75, 2.5, 2.7, 2.55, 2.7];
          let up = '', dn = '';
          w.forEach((h, i) => { const t = i / (w.length - 1); up += (i ? 'L' : 'M') + S(P(t, h)); });
          w.slice().reverse().forEach((h, i) => { const t = 1 - i / (w.length - 1); dn += 'L' + S(P(t, -h * .98)); });
          const trunk = up + dn + 'Z';
          let knots = '', faces = '';
          [.13, .26, .38, .62, .74, .87].forEach((t, i) => {
            const k = i % 2 ? 1 : -1, lean = t < .5 ? -1 : 1;
            /* the stub's axis: out from the trunk, tipped toward the nearer end */
            let ax = nx * k + ux * lean * .22, ay = ny * k + uy * lean * .22;
            const al = Math.hypot(ax, ay); ax /= al; ay /= al;
            const bx = -ay, by = ax;
            const c = P(t, k * 1.4), tip = [c[0] + ax * 3.6, c[1] + ay * 3.6];
            const q = (o, a, b) => [o[0] + bx * a + ax * b, o[1] + by * a + ay * b];
            knots += `M${S(q(c, -1.45, 0))}L${S(q(tip, -1.2, 0))}L${S(q(tip, 1.2, 0))}L${S(q(c, 1.45, 0))}Z`;
            faces += `M${S(q(tip, -.75, -.5))}L${S(q(tip, .75, -.5))}`;
          });
          return { trunk, knots, faces, hl: `M${S(P(.08, -1))}L${S(P(.92, -1))}` };
        };
        const A = stave(5.4, 13.2, 54.6, 46.6), Bv = stave(54.6, 13.2, 5.4, 46.6);
        /* outline everything first, then fill it, so the saltire reads as one flat charge */
        const all = [A.knots, Bv.knots, A.trunk, Bv.trunk];
        return all.map(d => fp(d, 'none', lo, 1.3)).join('') + all.map(d => fp(d, red, null)).join('')
          + ln(A.faces + Bv.faces, cut, .7, 'opacity=".8"')
          + ln(A.hl + Bv.hl, hi, .8, 'opacity=".5"');
      } },
  });
})();
