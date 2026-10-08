/* ═══════════════════════════════════════════════════
   ANTIGUIDADE — the ancient states, each on the sign its own people used:
   the wedjat of Egypt, the Ishtar Gate lion of Babylon, Ashur's winged disc,
   the Faravahar of the Achaemenids, the Temple menorah, Athena's owl,
   the Vergina sun, the sign of Tanit, the legionary scutum, the Hunnic bow.
═══════════════════════════════════════════════════ */
(() => {
  const f = n => +n.toFixed(2);
  /* a filled path with an outline */
  const fp = (d, fill, stroke, w, extra) => `<path d="${d}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${w || .8}" stroke-linejoin="round"` : ''} ${extra || ''}/>`;
  /* a stroked line */
  const ln = (d, stroke, w, extra) => `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra || ''}/>`;
  /* a stroked line with an outline in a darker tone (line-work that reads as a solid bar) */
  const bar = (d, col, lo, w, extra) => ln(d, lo, w + 1.1, extra) + ln(d, col, w, extra);
  const mir = s => `<g transform="matrix(-1 0 0 1 60 0)">${s}</g>`;

  /* ── Egypt: the wedjat, drawn in its own box (eye looking left, the cosmetic line running right) ── */
  const LAP = '#1C3D8C', LAPLO = '#0D2152';
  const wedjat = () => {
    const brow = 'M2.6 10.4C4.8 5 10.4 2.2 18 2.2L39.6 3.1V6.9L18.4 6.4C12.6 6.4 8.2 8.4 5.6 12.2Z';
    const eye = 'M4.4 17.4C7.8 12.8 11.8 11 16.4 11C22 11 26.6 13.4 30.6 16.4C26.4 19.8 21.6 22.6 16 22.6C11 22.6 7.4 20.6 4.4 17.4Z';
    const line = 'M27.4 14.2C31 15 35 15.2 39.6 15.2V19C35 19 31 18.8 28.2 18.2Z';
    const drop = 'M11.8 21.8H15.4L14.6 31.4C14.4 33.6 11.8 33.6 11.9 31.4Z';
    const curl = 'M22.4 21.8C25.4 25.2 28.2 28.8 31.4 30.8C34.8 32.8 38.4 30.8 38.2 27.6C38 25.2 35 24.4 33.8 26.4C33 27.8 34 29.2 35.4 28.8';
    return fp(brow, LAP, LAPLO, .7)
      + ln(curl, LAPLO, 3.4) + ln(curl, LAP, 2.4)
      + fp(drop, LAP, LAPLO, .7)
      + fp(line, LAP, LAPLO, .7)
      + fp(eye, BK.ivory, LAP, 2.2)
      + `<circle cx="16.8" cy="16" r="4.9" fill="${LAP}" stroke="${LAPLO}" stroke-width=".6"/>`
      + `<circle cx="15.3" cy="14.6" r="1.3" fill="#fff" opacity=".55"/>`
      + ln('M9 6.2C12 4.6 15 4 18 4L30 4.4', '#fff', .7, 'opacity=".35"');
  };

  /* ── Babylon: a glazed rosette, white petals and a yellow heart ── */
  const rosette = (x, y, r) => {
    let p = '';
    for (let i = 0; i < 8; i++) p += `<ellipse cx="${x}" cy="${f(y - r * .52)}" rx="${f(r * .27)}" ry="${f(r * .46)}" transform="rotate(${i * 45} ${x} ${y})"/>`;
    return `<g fill="#F2EEDF" stroke="#13336F" stroke-width=".35">${p}</g>`
      + `<circle cx="${x}" cy="${y}" r="${f(r * .34)}" fill="#E8B83C" stroke="#8C6420" stroke-width=".4"/>`;
  };

  Object.assign(BRASAO, {
    /* the wedjat, the sound eye of Horus, in lapis on gold */
    egito_antigo: { shape: 'cartouche', field: '#D9AE48', what: 'o olho de Hórus (wedjat) em lápis-lazúli sobre ouro',
      draw: () => {
        const rope = 'M30 5.6C38.8 5.6 44.4 12.2 44.4 20.2V40C44.4 46.6 38.8 50.4 30 50.4C21.2 50.4 15.6 46.6 15.6 40V20.2C15.6 12.2 21.2 5.6 30 5.6Z';
        return ln(rope, BK.goldLo, 1.5) + ln(rope, BK.goldHi, .8, 'stroke-dasharray=".9 .9" stroke-linecap="butt"')
          + `<g transform="translate(14.8 15) scale(.72)">${wedjat()}</g>`;
      } },

    /* a lion of the Processional Way between bands of rosettes, glazed brick */
    babilonia: { shape: 'tablet', field: '#1F4C9C', what: 'o leão da Via Processional (Porta de Ishtar), tijolo vitrificado',
      draw: () => {
        let bricks = '';
        for (let k = 1; k < 10; k++) bricks += `M9 ${f(9 + k * 4.2)}H51`;
        for (let k = 0; k < 10; k++) for (let j = 0; j < 6; j++) {
          const x = 9 + j * 8.4 + (k % 2 ? 4.2 : 0);
          bricks += `M${f(x)} ${f(9 + k * 4.2)}v4.2`;
        }
        let ros = '';
        [15.6, 22.8, 30, 37.2, 44.4].forEach(x => { ros += rosette(x, 14.4, 3) + rosette(x, 45.6, 3); });
        return ln(bricks, '#123373', .45, 'opacity=".6"')
          + ros
          + ln('M9 18.6H51M9 41.4H51', '#E8B83C', .8)
          + BEAST.lionStriding(10, 19.8, 40, 21, { fill: '#E9BE4E', mane: '#C4682C', accent: '#F4EAD0' });
      } },

    /* Ashur's winged disc above registers of cuneiform, on a royal stele */
    assiria: { shape: 'stele', field: '#8E3B22', what: 'o disco alado de Assur numa estela real, sobre registros cuneiformes',
      draw: () => {
        const G = BK.gold, GL = BK.goldLo, cy = 22.4;
        /* the right wing: five rows of long feathers, coverts at the root */
        const rows = [[17.4, 19.4, 42.5], [19.4, 21.4, 42.2], [21.4, 23.4, 41.6], [23.4, 25.4, 40.6], [25.4, 27.4, 39.2]];
        let d = `M33 ${rows[0][0]}`;
        rows.forEach(([t, b, x]) => { d += `L${f(x - 1)} ${t}Q${f(x + .3)} ${t} ${f(x + .3)} ${f((t + b) / 2)}Q${f(x + .3)} ${b} ${f(x - 1)} ${b}`; });
        d += `L33 ${rows[4][1]}Z`;
        let fl = 'M36.8 17.4V27.4';
        rows.slice(0, 4).forEach(([t, b, x], i) => { fl += `M36.8 ${b}H${f(Math.min(x, rows[i + 1][2]) - 1.1)}`; });
        let sc = '';
        for (let y = 17.4; y < 27; y += 2) sc += `M34.6 ${f(y)}q1.6 1 0 2`;
        const wing = fp(d, G, GL, .7) + ln(fl, GL, .5) + ln(sc, GL, .5)
          + ln('M37.6 18.3H41.2', BK.goldHi, .5, 'opacity=".8"');
        /* the tail, a fan of five feathers */
        const xs = [35.2, 33.12, 31.04, 28.96, 26.88, 24.8];
        let tail = 'M27.6 26.4H32.4L35.2 37.2';
        for (let i = 0; i < 5; i++) tail += `Q${f((xs[i] + xs[i + 1]) / 2)} 39.6 ${xs[i + 1]} 37.2`;
        tail += 'Z';
        let tl = '';
        for (let i = 1; i < 5; i++) tl += `M${f(27.6 + i * .96)} 27.6L${xs[i]} 37.2`;
        const streamer = 'M27.4 27.8C24.6 28.8 21.8 29.8 20.4 32C19.4 33.8 20.4 35.8 22.2 35.6C23.6 35.4 23.8 33.6 22.6 33.2';
        /* cuneiform: wedges in registers below */
        let wedge = '', rule = '';
        const W = (x, y, k) => k === 0 ? `M${f(x)} ${f(y - .8)}L${f(x + 1.3)} ${f(y)}L${f(x)} ${f(y + .8)}ZM${f(x + 1)} ${f(y - .18)}h1.9v.36h-1.9Z`
          : k === 1 ? `M${f(x - .8)} ${f(y - 1.4)}L${f(x + .8)} ${f(y - 1.4)}L${f(x)} ${f(y - .1)}ZM${f(x - .18)} ${f(y - .4)}h.36v1.9h-.36Z`
          : `M${f(x + 1.4)} ${f(y - 1.2)}L${f(x)} ${f(y)}L${f(x + 1.4)} ${f(y + 1.2)}L${f(x + .9)} ${f(y)}Z`;
        const seq = [0, 1, 2, 0, 0, 1, 1, 2, 0, 1, 0, 2, 2, 0, 1, 0, 0, 2, 1, 1, 0, 2, 0, 1, 2, 0, 1, 0];
        let n = 0;
        [43.6, 48.2, 52.8].forEach((y, r) => {
          rule += `M17.4 ${f(y + 2.3)}H42.6`;
          for (let x = 18.6 + (r % 2) * 1.2; x < 40.4; x += 3.1) wedge += W(x, y, seq[n++ % seq.length]);
        });
        return fp(wedge, '#5A2010', null, 0, 'opacity=".6"') + ln(rule, '#5A2010', .5, 'opacity=".5"')
          + ln('M17 41.2H43', G, 1.2) + ln('M17 41.2H43', GL, .4, 'opacity=".6"')
          + bar(streamer, G, GL, 1.4) + bar(streamer, G, GL, 1.4, 'transform="matrix(-1 0 0 1 60 0)"')
          + fp(tail, G, GL, .7) + ln(tl, GL, .5)
          + wing + mir(wing)
          + `<circle cx="30" cy="${cy}" r="4.5" fill="${G}" stroke="${GL}" stroke-width=".8"/>`
          + B.ring(30, cy, 2.9, 1, GL) + `<circle cx="30" cy="${cy}" r="1.5" fill="${BK.goldHi}" stroke="${GL}" stroke-width=".5"/>`
          + `<path d="M26.9 ${cy - 2.2}Q28.2 ${cy - 3.6} 30 ${cy - 3.7}" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width=".6" stroke-linecap="round"/>`;
      } },

    /* the Faravahar of Persepolis: the winged disc with the crowned figure */
    persia: { shape: 'roundel', field: '#8A1B2C', what: 'o Faravahar, o disco alado com a figura coroada (Persépolis)',
      draw: () => {
        const G = BK.gold, GL = BK.goldLo;
        const qb = (p0, p1, p2, t) => [0, 1].map(i => (1 - t) * (1 - t) * p0[i] + 2 * (1 - t) * t * p1[i] + t * t * p2[i]);
        /* a wing: three tiers of feathers, the lowest the longest, the ends curling up */
        let wing = '';
        [[25.2, 44, 2.2], [28.4, 48.2, 3.4], [31.6, 51.8, 4.6]].reverse().forEach(([y, L, rise]) => {
          const m = 34 + (L - 34) * .6;
          const T0 = [34, y - 1.6], T1 = [m, y - 1.6], T2 = [L, y - 1.6 - rise];
          const B0 = [34, y + 1.6], B1 = [m, y + 1.6], B2 = [L - 1.6, y + 1.5 - rise * .8];
          const P = p => f(p[0]) + ' ' + f(p[1]);
          const d = `M${P(T0)}Q${P(T1)} ${P(T2)}Q${f(L + 1.4)} ${f(y - rise * .9)} ${P(B2)}Q${P(B1)} ${P(B0)}Z`;
          let fl = '';
          for (let t = .1; t < .95; t += .085) fl += `M${P(qb(T0, T1, T2, t))}L${P(qb(B0, B1, B2, t))}`;
          wing += fp(d, G, GL, .7) + ln(fl, GL, .4, 'opacity=".8"');
        });
        /* the tail: three tiers widening downwards */
        let tail = '';
        [[41.2, 45.6, 7, 8.8], [37.6, 41.2, 5.4, 7], [34.2, 37.6, 4.2, 5.4]].forEach(([t, b, w0, w1]) => {
          tail += fp(`M${f(30 - w0)} ${t}H${f(30 + w0)}L${f(30 + w1)} ${b}Q30 ${f(b + 1)} ${f(30 - w1)} ${b}Z`, G, GL, .7);
          let fl = '';
          for (let k = -3; k <= 3; k++) fl += `M${f(30 + k * w0 / 3.6)} ${f(t + .5)}L${f(30 + k * w1 / 3.6)} ${f(b - .3)}`;
          tail += ln(fl, GL, .4, 'opacity=".8"');
        });
        const streamer = 'M26.8 33.6C24.8 35.8 22.8 38.2 21.6 41C20.8 42.8 18.8 43 18.2 41.4C17.8 40.2 19 39.4 19.8 40.2';
        /* the figure, facing right: robe, ring, head with crown and beard, arms */
        /* (drawn round the base of the neck, at the origin, and scaled up) */
        const robe = 'M-3.4 1.2C-2.6 .2 -1.2 -.2 .2 -.2C1.8 -.2 3 .4 3.4 1.4L3.8 12.6H-3.8Z';
        const head = 'M2.6 -10.8C3 -10 3.2 -9.4 3.4 -8.8L4.9 -7.2C5.1 -6.9 4.9 -6.6 4.5 -6.6L3.9 -6.6L4.1 -5.8L4.5 -.4C3 .3 1.2 .4 -.2 -.2'
          + 'L-.4 -1.6C-2.6 -1.2 -4.6 -2.4 -4.8 -4.8C-5 -7.4 -4 -9.8 -2.8 -10.8Z';
        const crown = 'M-3 -10.6L-3.3 -15H-1.9V-13.9H-.7V-15H.7V-13.9H1.9V-15H3.3L3 -10.6Z';
        const arm1 = 'M2.6 1.6L6 3.4L7 -.6';
        const arm2 = 'M2.8 3.8L7.2 5.6';
        const k = 1.08, fig = s => `<g transform="translate(30 21) scale(${k})">${s}</g>`;
        return '<g transform="translate(0 2.4)">' + tail + bar(streamer, G, GL, 1.3) + bar(streamer, G, GL, 1.3, 'transform="matrix(-1 0 0 1 60 0)"')
          + wing + mir(wing)
          + fig(fp(robe, G, GL, .6) + ln('M-1.6 2.4V12M.2 2.4V12M2 2.4V12', GL, .35))
          + `<path d="M24.4 29.6a5.6 5.6 0 1 0 11.2 0a5.6 5.6 0 1 0 -11.2 0ZM26.2 29.6a3.8 3.8 0 1 1 7.6 0a3.8 3.8 0 1 1 -7.6 0Z" fill="${G}" fill-rule="evenodd" stroke="${GL}" stroke-width=".7"/>`
          + B.ring(30, 29.6, 4.7, .4, BK.goldHi, 'opacity=".6"')
          + fig(fp(head, G, GL, .6) + fp(crown, G, GL, .6)
            + ln('M-3.1 -11.8H3.1M.6 -4.6Q2.4 -4 4.2 -4.6M.4 -3Q2.4 -2.4 4.3 -3M.2 -1.4Q2.2 -.8 4.4 -1.4M-2.4 -9Q-1.4 -7 -2.2 -5M-3.6 -6.6Q-2.6 -4.6 -3.4 -2.8', GL, .35)
            + fp('M1.2 -8.4Q1.9 -9 2.7 -8.4Q1.9 -8 1.2 -8.4Z', GL)
            + bar(arm2, G, GL, 1.1) + `<circle cx="8.7" cy="5.8" r="1.4" fill="none" stroke="${GL}" stroke-width="1.3"/><circle cx="8.7" cy="5.8" r="1.4" fill="none" stroke="${G}" stroke-width=".65"/>`
            + bar(arm1, G, GL, 1.1) + fp('M6.2 -.2L5.9 -3.6C5.8 -4.4 6.4 -4.8 6.9 -4.8H7.6C8.2 -4.8 8.5 -4.4 8.4 -3.8L8.1 -1.4L9 -2.2C9.4 -2.5 9.8 -2.1 9.6 -1.7L8.2 .4C7.8 .9 6.6 .9 6.2 -.2Z', G, GL, .45)
              + ln('M6.6 -3.4V-1.6M7.4 -3.6V-1.6', GL, .3)) + '</g>';
      } },

    /* the seven-branched menorah of the Temple */
    israel_antigo: { shape: 'oval', field: '#1A2C60', what: 'a menorá de sete braços do Templo',
      draw: () => {
        const G = BK.gold, GL = BK.goldLo, T = 17.6, R = [3.9, 7.8, 11.7];
        let arms = '', knops = '', cups = '', flames = '';
        R.forEach(r => { arms += `M${f(30 - r)} ${T}A${r} ${r} 0 0 0 ${f(30 + r)} ${T}`; });
        arms += `M30 ${T}V41`;
        R.forEach(r => [-1, 1].forEach(s => {
          const x = 30 + s * r * Math.SQRT1_2, y = T + r * Math.SQRT1_2;
          knops += `<circle cx="${f(x)}" cy="${f(y)}" r="1.25"/>`;
        }));
        [-11.7, -7.8, -3.9, 0, 3.9, 7.8, 11.7].forEach(dx => {
          const x = 30 + dx;
          cups += `M${f(x - 2)} ${f(T - 2.4)}H${f(x + 2)}L${f(x + 1)} ${f(T + .4)}H${f(x - 1)}Z`;
          flames += `M${f(x)} ${f(T - 2.6)}C${f(x - 1.7)} ${f(T - 3.8)} ${f(x - 1.3)} ${f(T - 5.8)} ${f(x)} ${f(T - 7.6)}C${f(x + 1.3)} ${f(T - 5.8)} ${f(x + 1.7)} ${f(T - 3.8)} ${f(x)} ${f(T - 2.6)}Z`;
        });
        const base = 'M30 40.4L23.4 49.6M30 40.4L36.6 49.6M30 40.4V50';
        return fp(flames, '#F0A23A', '#9A5A14', .5)
          + bar(base, G, GL, 1.9) + ln('M21.6 50H25.2M34.8 50H38.4M28.2 50.6H31.8', GL, 2.2) + ln('M21.6 50H25.2M34.8 50H38.4M28.2 50.6H31.8', G, 1.2)
          + bar(arms, G, GL, 2.1)
          + `<g fill="${G}" stroke="${GL}" stroke-width=".55">${knops}<circle cx="30" cy="${T + 6}" r="1.25"/><circle cx="30" cy="35.4" r="1.45"/></g>`
          + fp(cups, G, GL, .6);
      } },

    /* Athena's owl, olive sprig and crescent, as on the silver tetradrachm, with ΑΘΕ */
    atenas: { shape: 'coin', field: '#D8D2C4', what: 'a coruja de Atena com o ramo de oliveira, do tetradracma (ΑΘΕ)',
      draw: () => `<rect x="11.5" y="11.5" width="37" height="37" rx="5" fill="#CBC4B3"/>`
        + `<path d="M11.5 44V16.5Q11.5 11.5 16.5 11.5H44" fill="none" stroke="#8F8878" stroke-width="1" opacity=".5"/>`
        + `<path d="M48.5 16V43.5Q48.5 48.5 43.5 48.5H16" fill="none" stroke="#fff" stroke-width=".8" opacity=".35"/>`
        + BEAST.owl(9, 11.6, 36.5, 36.5, { fill: '#EFEADF', line: '#5A5345', leaf: '#C9C2B0' })
        + B.text(43.6, 23.4, 'Α', 6.2, '#5A5345') + B.text(43.6, 30.6, 'Θ', 6.2, '#5A5345') + B.text(43.6, 37.8, 'Ε', 6.2, '#5A5345') },

    /* the sixteen-rayed star of the Vergina larnax */
    macedonia: { shape: 'hoplon', field: '#4A1F5E', rim: '#BE8A45', what: 'o sol de Vergina de 16 raios, do larnax de Filipe II',
      draw: () => {
        const G = BK.gold, GL = BK.goldLo;
        let rays = '', shade = '';
        for (let i = 0; i < 16; i++) {
          const a = -Math.PI / 2 + i * Math.PI / 8, h = Math.PI / 16 * .74, r1 = 5.4, r2 = 20.6;
          rays += `M${f(30 + Math.cos(a - h) * r1)} ${f(30 + Math.sin(a - h) * r1)}L${f(30 + Math.cos(a) * r2)} ${f(30 + Math.sin(a) * r2)}L${f(30 + Math.cos(a + h) * r1)} ${f(30 + Math.sin(a + h) * r1)}Z`;
          shade += `M${f(30 + Math.cos(a) * r1 * .9)} ${f(30 + Math.sin(a) * r1 * .9)}L${f(30 + Math.cos(a) * r2)} ${f(30 + Math.sin(a) * r2)}L${f(30 + Math.cos(a + h) * r1)} ${f(30 + Math.sin(a + h) * r1)}Z`;
        }
        let petals = '';
        for (let i = 0; i < 8; i++) petals += `<ellipse cx="30" cy="27.4" rx=".9" ry="1.7" transform="rotate(${i * 45} 30 30)"/>`;
        return fp(rays, G) + fp(shade, BK.goldHi, null, 0, 'opacity=".7"') + fp(rays, 'none', GL, .55)
          + `<circle cx="30" cy="30" r="6" fill="${G}" stroke="${GL}" stroke-width=".8"/>`
          + `<g fill="${BK.goldHi}" stroke="${GL}" stroke-width=".35">${petals}</g><circle cx="30" cy="30" r="1.1" fill="${GL}"/>`;
      } },

    /* the sign of Tanit under the crescent and disc, carved on a tophet stele */
    cartago: { shape: 'stele', field: '#5C1236', what: 'o sinal de Tanit sob o crescente e o disco, numa estela do tofet',
      draw: () => {
        const I = '#F1E7CE', IL = '#A8946C';
        return '<g transform="translate(0 1)">' + fp('M30 26L39.8 50.2H20.2Z', I) + fp('M30 26L39.8 50.2H30Z', '#D8CAA8', null, 0, 'opacity=".6"') + fp('M30 26L39.8 50.2H20.2Z', 'none', IL, .8)
          + bar('M19.8 21.2V27.4H40.2V21.2', I, IL, 2.4)
          + `<circle cx="30" cy="21.2" r="4.3" fill="${I}" stroke="${IL}" stroke-width=".8"/>`
          + fp('M25.81 12.9A4.6 4.6 0 1 1 34.19 12.9A4.2 4.2 0 1 0 25.81 12.9Z', I, IL, .6)
          + `<circle cx="30" cy="13.1" r="1.9" fill="${I}" stroke="${IL}" stroke-width=".6"/>`
          + fp('M18.2 51.6H41.8V53.2H18.2Z', I, IL, .5) + '</g>';
      } },

    /* the legionary scutum: wings and thunderbolts round the boss */
    imperio_romano: { shape: 'scutum', field: '#A8262B', what: 'o escudo do legionário: asas e raios em volta do umbo',
      draw: u => {
        const G = BK.gold, GL = BK.goldLo;
        const bolt = 'M26 24.4L22 19.4L25 18.2L20.6 12';
        const head = (() => {
          const A = [25, 18.2], Z = [20.6, 12], L = Math.hypot(Z[0] - A[0], Z[1] - A[1]);
          const d = [(Z[0] - A[0]) / L, (Z[1] - A[1]) / L], n = [-d[1], d[0]];
          const at = (k, j) => f(Z[0] + d[0] * k + n[0] * j) + ' ' + f(Z[1] + d[1] * k + n[1] * j);
          return `M${at(3.4, 0)}L${at(-.6, 1.9)}L${at(.3, 0)}L${at(-.6, -1.9)}Z`;
        })();
        const bolts = bar(bolt, G, GL, 1.5) + fp(head, G, GL, .6);
        const wing = 'M24.8 27.2C22.6 26.2 20.2 24.6 18 22.4C17.4 24.2 17.6 25.8 18.4 27C17.6 27.8 17.4 29 17.8 30C19 30.8 20.4 31 21.6 30.6C22.4 31.8 23.6 32.4 25 32.2Z';
        const wl = 'M24.6 28.4L19.4 25.4M24.6 29.8L19.6 28.6M24.6 31L22.2 30.4';
        const half = bolts + `<g transform="matrix(1 0 0 -1 0 60)">${bolts}</g>` + fp(wing, G, GL, .7) + ln(wl, GL, .5);
        return ln('M17.7 8.1Q30 5.8 42.3 8.1Q45.6 30 42.3 51.9Q30 54.2 17.7 51.9Q14.4 30 17.7 8.1Z', G, 1.1)
          + half + mir(half)
          + `<defs><radialGradient id="${u}ub" cx="40%" cy="36%" r="65%"><stop offset="0" stop-color="${BK.goldHi}"/><stop offset=".6" stop-color="${G}"/><stop offset="1" stop-color="${GL}"/></radialGradient></defs>`
          + `<circle cx="30" cy="30" r="5.2" fill="url(#${u}ub)" stroke="${GL}" stroke-width=".9"/>`
          + B.ring(30, 30, 3.4, .5, GL, 'opacity=".7"');
      } },

    /* the Hunnic composite bow, bone-plated, with two arrows, on dark felt */
    hunos: { shape: 'roundel', field: '#3A2C22', rim: '#7A5A2E', what: 'o arco composto huno com duas flechas, sobre feltro',
      draw: () => {
        const BONE = '#EADFC4', BONEL = '#8F8063', HORN = '#B5662E', DK = '#2A1A0E';
        /* felt border: a red band with an ochre zigzag */
        let zz = '';
        for (let i = 0; i <= 36; i++) {
          const a = i * Math.PI / 18, r = i % 2 ? 21.3 : 23.5;
          zz += (i ? 'L' : 'M') + f(30 + Math.cos(a) * r) + ' ' + f(30 + Math.sin(a) * r);
        }
        /* an arrow from the nock (x0, y0) to the point (x1, y1) */
        const arrow = (x0, y0, x1, y1) => {
          const L = Math.hypot(x1 - x0, y1 - y0), a = Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI;
          return `<g transform="translate(${x0} ${y0}) rotate(${f(a)})">`
            + ln(`M0 0H${f(L - 4)}`, DK, 2.3) + ln(`M0 0H${f(L - 4)}`, '#D8BF86', 1.2)
            + fp(`M${f(L - 4.6)} -1.5L${f(L)} 0L${f(L - 4.6)} 1.5L${f(L - 3.8)} 0Z`, '#B9BDBF', '#3E4244', .5)
            + fp('M.6 0L1 -2.5Q4.4 -2.6 6.4 -1.6Q7.6 -.8 8.4 0ZM.6 0L1 2.5Q4.4 2.6 6.4 1.6Q7.6 .8 8.4 0Z', '#A8322A', '#4E140F', .45)
            + ln('M1.6 -1.6L5.6 -1.2M1.6 1.6L5.6 1.2', '#D9685E', .35)
            + `</g>`;
        };
        /* the bow (left half): ear, limb and grip, string below */
        const limb = 'M30 15.6C24.4 15.6 19 16.8 15.2 20C12.8 22.1 11.4 24.8 10.6 27.8L14 28.8C14.6 26.2 16 24 17.8 22.6C21.2 20.1 25.4 19.8 30 19.8Z';
        const ear = 'M10.8 28.6L5.8 23.4Q6 21.6 7.7 21.4L13.8 27.2Z';
        const grip = 'M30 15.2C27.6 15.2 25.6 15.4 24.2 15.8L24.6 20.2C26 20 28 19.9 30 19.9Z';
        const half = fp(limb, HORN, DK, .6)
          + ln('M28 17.4C23.6 17.6 19.6 18.8 16.4 21.6', '#E3A267', .6, 'opacity=".8"')
          + ln('M12.4 25.2L15 26.4M13.1 24L15.6 25.3', DK, .5)
          + fp(ear, BONE, DK, .55) + ln('M7.6 22.6L11.8 27', BONEL, .4) + fp(grip, BONE, DK, .55);
        return B.ring(30, 30, 22.4, 3.4, '#7E2C1F') + ln(zz, '#C98F2E', .8)
          + arrow(18, 46.6, 43.6, 12.6) + arrow(42, 46.6, 16.4, 12.6)
          + ln('M6.6 22.6L12.4 28.8H47.6L53.4 22.6', BONE, 1)
          + half + mir(half);
      } },
  });
})();
