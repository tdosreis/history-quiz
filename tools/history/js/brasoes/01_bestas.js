/* ═══════════════════════════════════════════════════
   BESTAS — the heraldic beasts the regional brasões share.

   BEAST.name(x, y, w, h, opts) → SVG markup: the beast drawn in its own
   design box and fitted, uniformly scaled and centred, into the box whose
   top-left corner is (x, y) in the 60×60 brasão space. No <defs>, no ids.
   Common opts: fill (the beast), line (outline / darker tone), accent
   (beak, claws), tongue, flip (mirror it, to face the other way).

     eagle          displayed eagle: heads 1|2, crown, imperial, halo, wings 'up'|'down',
                    holds (sceptre + orb), shield, legs, tongue          box 100×100
     eagleNapoleon  wings raised, head to the left, on a thunderbolt: bolt, crown  100×100
     thunderbolt    Jupiter's fulmen / the Napoleonic foudre, lying across     100×40
     lionRampant    facing left: crown, sword, tail 'forked'                   100×100
     lionPassant    walking left, forepaw raised: guardant (default), crown    100×64
     lionWinged     St Mark's lion: haloed, winged, paw on the Gospel: halo, book  100×92
     lionStriding   the Babylonian glazed-brick lion: mane, tail 'up'|'down'   ~110×62
     lionSun        the Persian lion and sun: sun, face, sword                 100×92
     owl            Athena's owl of the tetradrachm: olive, moon, leaf         100×100
   (lions default to gold armed azure; eagle to sable armed or; owl to silver)
   Helpers: BEAST.mix(a, b, t) blends two colours; BEAST.feather(...) one pinion.
═══════════════════════════════════════════════════ */
const BEAST = (() => {
  const N = n => +n.toFixed(2);
  const rgb = c => {
    c = String(c).replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    return [0, 2, 4].map(i => parseInt(c.substr(i, 2), 16) || 0);
  };
  const mix = (a, b, t) => '#' + rgb(a).map((v, i) => Math.round(v + (rgb(b)[i] - v) * t).toString(16).padStart(2, '0')).join('');
  const lum = c => { const [r, g, b] = rgb(c); return (.299 * r + .587 * g + .114 * b) / 255; };
  const isGold = c => { const [r, g, b] = rgb(c); return r > 140 && g > 90 && r - b > 70; };

  /* the tones of a beast, from its fill */
  const pal = (o, def) => {
    const fill = o.fill || def;
    const dark = lum(fill) < .3;
    const line = o.line || mix(fill, '#000', dark ? .4 : .52);
    const accent = o.accent || (isGold(fill) ? BK.red : BK.gold);
    return {
      fill, line, dark, accent,
      accentLo: o.accentLo || mix(accent, '#000', .45),
      detail: o.detail || (dark ? mix(fill, '#fff', .3) : mix(fill, line, .75)),
      shade: o.shade || (dark ? mix(fill, '#fff', .12) : mix(fill, line, .3)),
      hi: o.hi || mix(fill, '#fff', dark ? .2 : .4),
      tongue: o.tongue || BK.red,
      eye: o.eye || (dark ? BK.ivory : line),
    };
  };

  /* fit a design box vb = [x, y, w, h] into the target box */
  const fit = (x, y, w, h, vb, flip) => {
    const [vx, vy, vw, vh] = vb;
    const s = Math.min(w / vw, h / vh);
    const ox = x + (w - vw * s) / 2, oy = y + (h - vh * s) / 2;
    const f = n => +n.toFixed(4);
    const tr = flip ? `matrix(${f(-s)} 0 0 ${f(s)} ${f(ox + (vx + vw) * s)} ${f(oy - vy * s)})`
      : `matrix(${f(s)} 0 0 ${f(s)} ${f(ox - vx * s)} ${f(oy - vy * s)})`;
    /* outline width: ~.8 units on a beast 44 wide, never under .45 */
    const lw = Math.max(.45, Math.min(1, vw * s * .018)) / s;
    return { s, tr, lw };
  };

  const bez = (p0, p1, p2, p3, t) => {
    const u = 1 - t;
    return [0, 1].map(i => u * u * u * p0[i] + 3 * u * u * t * p1[i] + 3 * u * t * t * p2[i] + t * t * t * p3[i]);
  };
  const P2 = p => N(p[0]) + ' ' + N(p[1]);

  /* a pinion: root (x, y), heading a°, length L, root width wd; the tip droops by bend°;
     tip = width at the tip (fraction of wd), pt = how pointed the end is */
  const feather = (x, y, a, L, wd, bend, tip, pt) => {
    bend = bend || 0; tip = tip === undefined ? .62 : tip; pt = pt === undefined ? 1.25 : pt;
    const r = a * Math.PI / 180, b = (a + bend) * Math.PI / 180;
    const d = [Math.cos(r), Math.sin(r)], e = [Math.cos(b), Math.sin(b)];
    const p = [-d[1], d[0]], q = [-e[1], e[0]];
    const m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    const hw = wd / 2, tw = wd * tip / 2;
    const R = [x, y], C = [x + d[0] * L * .55, y + d[1] * L * .55], T = [C[0] + e[0] * L * .45, C[1] + e[1] * L * .45];
    const add = (A, v, k) => [A[0] + v[0] * k, A[1] + v[1] * k];
    const tp = add(T, e, tw * pt);
    const l0 = add(R, p, hw), l1 = add(C, m, (hw + tw) / 2), l2 = add(T, q, tw);
    const r0 = add(R, p, -hw), r1 = add(C, m, -(hw + tw) / 2), r2 = add(T, q, -tw);
    const dd = `M${P2(l0)}Q${P2(l1)} ${P2(l2)}C${P2(add(l2, e, tw * .6 * pt))} ${P2(add(tp, q, tw * .6))} ${P2(tp)}`
      + `C${P2(add(tp, q, -tw * .6))} ${P2(add(r2, e, tw * .6 * pt))} ${P2(r2)}Q${P2(r1)} ${P2(r0)}Z`;
    const shaft = `M${P2(add(R, d, 1))}Q${P2(C)} ${P2(add(T, e, tw * .2))}`;
    /* the edge on the -p side, inset a little: where this feather lies over its neighbour */
    const ri = (A, k) => add(A, k, .5);
    const edge = `M${P2(ri(r0, p))}Q${P2(ri(r1, m))} ${P2(ri(r2, q))}`;
    const edgeL = `M${P2(add(l0, p, -.5))}Q${P2(add(l1, m, -.5))} ${P2(add(l2, q, -.5))}`;
    return { d: dd, shaft, edge, edgeL, tip: tp };
  };

  const mirror = s => `<g transform="matrix(-1 0 0 1 100 0)">${s}</g>`;
  const path = (d, fill, stroke, w, extra) => `<path d="${d}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${N(w)}" stroke-linejoin="round"` : ''}${extra ? ' ' + extra : ''}/>`;
  const line = (d, stroke, w, extra) => `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${N(w)}" stroke-linecap="round" stroke-linejoin="round"${extra ? ' ' + extra : ''}/>`;

  /* scallops (overlapping covert feathers) along a cubic, bulging to side k (±1) */
  const scallops = (c, n, depth, k) => {
    let d = '';
    for (let i = 0; i < n; i++) {
      const a = bez(...c, i / n), b = bez(...c, (i + 1) / n);
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1;
      d += `M${P2(a)}Q${N(mx - dy / l * depth * k)} ${N(my + dx / l * depth * k)} ${P2(b)}`;
    }
    return d;
  };

  /* ── a small open crown, base centre (0,0), width 10 ── */
  const crownSmall = (P, lw, gold, goldLo) => {
    gold = gold || BK.gold; goldLo = goldLo || BK.goldLo;
    return path('M-5 0L-5.6 -6.2L-3 -3.4L0 -7.6L3 -3.4L5.6 -6.2L5 0Z', gold, goldLo, lw * .8)
      + path('M-5.4 -1.6H5.4V1.2H-5.4Z', gold, goldLo, lw * .8)
      + `<circle cx="0" cy="-8.2" r="1.2" fill="${BK.goldHi}" stroke="${goldLo}" stroke-width="${N(lw * .5)}"/>`
      + `<circle cx="-5.7" cy="-6.8" r="1" fill="${BK.goldHi}" stroke="${goldLo}" stroke-width="${N(lw * .5)}"/>`
      + `<circle cx="5.7" cy="-6.8" r="1" fill="${BK.goldHi}" stroke="${goldLo}" stroke-width="${N(lw * .5)}"/>`;
  };

  /* ── the eagle's head, facing left, neck base at (0,0) ── */
  const eagleHead = (P, lw, o) => {
    const sil = 'M6.2 3Q8.6 1.4 8.8 -.6Q7 -.4 6 -1.6Q8.2 -3.4 8.2 -5.8Q6.4 -5.2 5.6 -6.6Q7.4 -8.6 7.2 -10.8Q5.8 -10.2 5 -11.4'
      + 'C4.8 -17 1.2 -21.2 -3.6 -21.2C-6.6 -21.2 -8.8 -20.2 -10.2 -18.8C-11 -17 -10.8 -15.4 -10.2 -14.4'
      + 'C-9.4 -12.8 -7.8 -11.4 -6.8 -9C-5.8 -6 -6.2 -2 -6.8 3';
    let s = '';
    if (o.halo) s += `<circle cx="-2.4" cy="-13.6" r="10.6" fill="${typeof o.halo === 'string' ? o.halo : BK.gold}" stroke="${BK.goldLo}" stroke-width="${N(lw)}"/>`;
    /* tongue, issuing from the open beak */
    if (o.tongue !== false) s += path('M-9 -14.2C-13 -14.2 -16.6 -12.8 -19 -10.4C-20 -9.4 -21.4 -8.8 -23.2 -9.2L-21.9 -10.4L-23.2 -11.9'
      + 'C-21.3 -11.7 -20.3 -12.5 -19.5 -13.5C-16.8 -15.3 -13 -15.6 -9 -15.4Z', P.tongue, mix(P.tongue, '#000', .4), lw * .6);
    /* beak: the hooked upper mandible and the lower one, their roots under the head */
    s += path('M-6 -19.8C-9.6 -20.8 -13.6 -20.4 -16.2 -18C-18.2 -16 -18.4 -12.8 -16.8 -10.4C-17 -12.2 -16.2 -13.8 -14.4 -14.2L-7 -14.6Z', P.accent, P.accentLo, lw * .8);
    s += path('M-7 -13.6L-13.6 -13.2C-12.8 -11.8 -10.6 -11 -7 -11.4Z', P.accent, P.accentLo, lw * .8);
    s += line('M-11.4 -19.6C-13.6 -19.2 -15.4 -18 -16.4 -16.2', mix(P.accent, '#fff', .45), lw * .7);
    s += path(sil + 'Z', P.fill) + line(sil, P.line, lw);
    /* the eye under a frowning brow */
    s += `<circle cx="-5.2" cy="-16.2" r="1.5" fill="${P.eye}"/><circle cx="-5.6" cy="-16.2" r=".75" fill="${P.dark ? P.line : P.fill}"/>`;
    s += line('M-1.8 -18.8Q-5 -19.8 -8.8 -17.6', P.detail, lw * .7);
    s += line('M2.6 -8.4Q1.8 -6 2.6 -3.8M3 -14Q2 -12 2.4 -10.2', P.detail, lw * .5);
    if (o.crown) s += `<g transform="translate(-2.4 -20.6) rotate(-6) scale(.8)">${crownSmall(P, lw / .8)}</g>`;
    return s;
  };

  /* a toe with its claw: from the foot (fx, fy) heading a°, length L, width wd;
     the claw hooks clockwise (c = 1) or anticlockwise (c = -1) */
  const toe = (P, fx, fy, a, L, wd, c, lw) => {
    const r = a * Math.PI / 180, v = [Math.cos(r), Math.sin(r)], n = [-v[1], v[0]];
    const at = (k, j) => P2([fx + v[0] * k + n[0] * j * c, fy + v[1] * k + n[1] * j * c]);
    const w0 = wd / 2, w1 = wd * .42, cl = wd * 1.3;
    return path(`M${at(0, -w0)}Q${at(L * .5, -w1 * 1.35)} ${at(L, -w1)}`
      + `Q${at(L + cl * 1.05, -w1 * .8)} ${at(L + cl * .82, cl * .78)}`
      + `Q${at(L + cl * .42, w1 * .55)} ${at(L, w1)}Q${at(L * .5, w1 * 1.35)} ${at(0, w0)}Z`, P.accent, P.accentLo, lw * .7)
      + line(`M${at(L * .55, -w1 * 1.1)}L${at(L * .55, w1 * 1.1)}`, P.accentLo, lw * .5);
  };
  /* a foot at (fx, fy): toes [heading, length, curl] — the hind toe first */
  const foot = (P, fx, fy, toes, wd, lw) => toes.map(t => toe(P, fx, fy, t[0], t[1], wd, t[2], lw)).join('');

  /* ── EAGLE ─────────────────────────────────────────
     opts: heads 1|2, crown (a crown on each head), imperial (one great crown above
     the heads), halo (nimbus round each head: true or a colour), wings 'up' (raised, German style,
     default) | 'down' (pinions hanging, as Saladin's), legs (default true),
     tongue (colour, or false), shield (tincture of a little escutcheon on the breast),
     holds (sceptre in the dexter talon, orb in the sinister — the Russian and Prussian eagles).
     Design box 100×100 (the breast centre is at 50,47 of it). */
  function eagle(x, y, w, h, o) {
    o = o || {};
    const P = pal(o, BK.sable);
    const two = o.heads === 2;
    const top = o.imperial ? (two ? -6 : -31) : (o.crown || o.halo) ? -6 : 0;
    const vb = [0, top, 100, 100 - top];
    const { tr, lw } = fit(x, y, w, h, vb, o.flip);
    const down = o.wings === 'down';

    /* the wing: pinions (tip-most first, so each lies over the next one out), then the arm */
    let pin = '', det = '';
    const PS = down ? [ // root x, y, heading°, length, width, bend°
      [62, 44, 100, 24, 11.5, 2], [67, 38.6, 94, 30, 12, 2], [73, 34.4, 88, 34, 12.2, 2],
      [79, 31.4, 82, 34, 12, 2], [85, 29.6, 76, 31, 11.4, 2], [90.4, 29.4, 70, 25, 10.4, 2]]
      : [[62.6, 45, 96, 23, 11.5, 5], [68, 39, 77, 27, 12, 7], [73.6, 32.6, 57, 26, 12, 8],
        [78.6, 25.6, 37, 21, 11.4, 8], [82.6, 18.4, 16, 15.5, 10.6, 6], [85.4, 11.6, -6, 10.5, 9.4, 4]];
    for (let i = PS.length - 1; i >= 0; i--) {
      const f = feather(...PS[i], .5, 1.9);
      pin += path(f.d, P.fill, P.line, lw);
      det += f.shaft + (i < PS.length - 1 ? f.edge : '');
    }
    const arm = down
      ? 'M54 28C60 18 72 12.6 84 14.6C90 15.6 94.6 20 95 26C95.2 29.4 92.6 31.6 90 30.6C84 29 78 30 72 33.6C66.4 37 62.4 42.6 60.2 49.6L55 46Z'
      : 'M54 29C60 18.6 71.4 9 82.6 4.6C88 2.4 92.2 6.4 89.4 11C85 18.2 78.4 26.4 71.4 34C66.6 39.4 62.4 44.6 60.2 50.4L55 46Z';
    const cov1 = down ? [[57.4, 38], [66, 30.6], [78, 25.6], [92, 25.6]] : [[57.6, 39.4], [64, 32], [75.4, 20.6], [87, 8.4]];
    const cov2 = down ? [[56.4, 31], [64, 23.6], [76, 18.6], [88, 19]] : [[56.4, 33], [61.4, 25.4], [69, 17], [80, 8.6]];
    let half = pin + line(det, P.detail, lw * .6);
    half += path(arm, P.fill, P.line, lw);
    half += path(down ? 'M58 24C64 18 72 15.6 82 16.4C72 18 65 21 59.4 26.4Z' : 'M57 28C61.6 20 69.6 12.6 78.6 8C70.4 13.6 63.6 20.6 59 29Z', P.hi, null, 0, 'opacity=".75"');
    half += line(scallops(cov1, 6, 2.8, 1) + scallops(cov2, 5, 2, 1), P.detail, lw * .65);

    /* tail: a fan of five feathers */
    let tside = '', tdet = '';
    [[55, 60, 50, 17, 10, 6], [52.6, 62, 69, 21, 11, 4]].forEach((t, i) => {
      const f = feather(...t, .5, 1.9);
      tside += path(f.d, P.fill, P.line, lw); tdet += f.shaft + (i ? f.edge : '');
    });
    const tc = feather(50, 62, 90, 23, 12, 0, .5, 1.9);
    let s = tside + line(tdet, P.detail, lw * .6);
    s += mirror(s) + path(tc.d, P.fill, P.line, lw) + line(tc.shaft, P.detail, lw * .6);

    /* wings */
    s += half + mirror(half);

    /* the body */
    const body = 'M50 23C58.6 23 62.4 31 62.2 41C62 52 57.6 61.6 50 68C42.4 61.6 38 52 37.8 41C37.6 31 41.4 23 50 23Z';
    s += path(body, P.fill, P.line, lw);
    s += path('M44.2 30C41.8 36 41.6 46 44 54C43.4 46 43.2 37 44.2 30Z', P.hi, null, 0, 'opacity=".8"');
    s += line(scallops([[43, 38], [46.4, 41], [53.6, 41], [57, 38]], 4, 2.4, 1)
      + scallops([[43.2, 45.6], [46.6, 48.8], [53.4, 48.8], [56.8, 45.6]], 4, 2.4, 1)
      + scallops([[45, 53], [47.6, 55.8], [52.4, 55.8], [55, 53]], 3, 2.2, 1), P.detail, lw * .6);

    /* legs: feathered thigh, scaled shank, three talons forward and one behind */
    if (o.legs !== false) {
      let leg = path('M60.8 60.2L67.6 70.4L71.2 67.6L64.6 58.6Z', P.accent, P.accentLo, lw * .7);
      leg += line('M62.6 62.2L66 60.4M64.4 64.8L67.8 63M66.2 67.4L69.4 65.6', P.accentLo, lw * .5);
      leg += foot(P, 69.6, 69.4, [[166, 3.8, -1], [-26, 4.8, 1], [16, 5.6, 1], [60, 4.8, 1]], 4.4, lw);
      leg += `<circle cx="69.6" cy="69.4" r="2.8" fill="${P.accent}"/>`;
      leg += path('M53.4 48.6C60.6 49.2 65.8 54 66.8 61L64.4 60.2L63.8 63.4L61.6 61.6L60.2 64.4L58.6 61.6L56 63Z', P.fill, P.line, lw);
      leg += line('M56.4 53.4Q59 55.2 59.8 58.2M59.8 52.6Q62.6 54.6 63.2 57.6', P.detail, lw * .5);
      s += leg + mirror(leg);
    }
    if (o.shield) s += path('M43.4 40H56.6V48.6C56.6 53.4 53.8 56.6 50 58.2C46.2 56.6 43.4 53.4 43.4 48.6Z', o.shield, mix(o.shield, '#000', .45), lw);
    if (o.holds && o.legs !== false) {
      const g = BK.gold, gl = BK.goldLo;
      /* the sceptre, held slanting up and out */
      s += line('M36.6 79.6L19.4 47.4', gl, 3.4) + line('M36.6 79.6L19.4 47.4', g, 2) + line('M35 75.4L21.6 50.2', BK.goldHi, .7, 'opacity=".8"');
      s += path('M16.2 45.6C15.4 42.6 17 40.4 19.4 40.2C21.8 40.2 23 42.6 22 45.4L20.6 48.4L18 48.8Z', g, gl, lw * .8)
        + path('M16.4 40.6L18.2 35.6L19.8 38.4L22.6 36.4L21.4 41.2Z', g, gl, lw * .7);
      /* the orb with its band and cross */
      s += `<circle cx="72.4" cy="75.6" r="5.6" fill="${g}" stroke="${gl}" stroke-width="${N(lw * .8)}"/>`
        + line('M66.8 75.6H78M72.4 70V81.2', gl, lw * .8) + `<circle cx="70.6" cy="73.6" r="1.4" fill="${BK.goldHi}"/>`
        + line('M72.4 70V65.4M70.4 67.2H74.4', g, 1.6);
      s += foot(P, 69.6, 69.4, [[60, 4.4, 1], [100, 4.8, 1]], 4.4, lw);
    }

    /* the head or heads */
    if (two) {
      /* two necks fork from the breast */
      const neck = 'M35.4 27.4C37 31 39.4 34 42 36.6L50 37V27.6C48.8 26.6 47.8 25 47.2 22.4';
      const nk = path(neck + 'Z', P.fill) + line(neck.replace('L50 37V27.6', 'M50 27.6'), P.line, lw);
      const hd = `<g transform="translate(40.5 22.5) rotate(-24) scale(1.06)">${eagleHead(P, lw / 1.06, o)}</g>`;
      s += nk + mirror(nk) + hd + mirror(hd);
    } else {
      s += `<g transform="translate(50 27) scale(1.18)">${eagleHead(P, lw / 1.18, o)}</g>`;
    }
    if (o.imperial) s += two ? imperialCrown(50, 16, 18, lw, o.cap) : imperialCrown(50, -1, 20, lw, o.cap);
    return `<g transform="${tr}">${s}</g>`;
  }

  /* a great closed crown (the imperial crown above a double eagle): base centre (cx, by), width wd */
  const imperialCrown = (cx, by, wd, lw, cap) => {
    const g = BK.gold, gl = BK.goldLo, k = wd / 20;
    cap = cap || BK.red;
    const halfDome = 'M-8.8 -3C-8.8 -12 -5.4 -17 -.8 -17.8V-3Z';
    return `<g transform="translate(${cx} ${by}) scale(${N(k)})">`
      + path('M-8.6 -3C-8.6 -12.6 -5 -17.8 0 -18.4C5 -17.8 8.6 -12.6 8.6 -3Z', cap, mix(cap, '#000', .45), lw / k * .8)
      + path(halfDome, g, gl, lw / k * .8) + path(halfDome, g, gl, lw / k * .8, 'transform="scale(-1 1)"')
      + path('M-6.8 -4.4C-6.8 -10.6 -4.8 -14.4 -2.6 -15.6C-3.8 -12.6 -4.6 -8.8 -4.6 -4.4Z', BK.goldHi, null, 0, 'opacity=".75"')
      + path('M-1.8 -18.6H1.8V-3H-1.8Z', g, gl, lw / k * .7)
      + path('M-10.4 -3.8H10.4L9.6 1.6H-9.6Z', g, gl, lw / k * .8)
      + [-6.8, -3.4, 0, 3.4, 6.8].map((x, i) => `<circle cx="${x}" cy="-1.1" r="${i % 2 ? .9 : 1.15}" fill="${i % 2 ? BK.goldHi : BK.red}"/>`).join('')
      + `<circle cx="0" cy="-20.6" r="2.6" fill="${g}" stroke="${gl}" stroke-width="${N(lw / k * .7)}"/>`
      + path('M-.9 -22.6V-26.4H-2.6V-28.2H-.9V-29.8H.9V-28.2H2.6V-26.4H.9V-22.6Z', g, gl, lw / k * .5)
      + `</g>`;
  };

  /* a smooth closed (or open) curve through points [x, y, corner?] — Catmull-Rom as cubics;
     a point with a third element truthy is a sharp corner */
  const smooth = (pts, open) => {
    const n = pts.length, at = i => open ? pts[Math.max(0, Math.min(n - 1, i))] : pts[(i + n) % n];
    let d = `M${P2(pts[0])}`;
    for (let i = 0; i < (open ? n - 1 : n); i++) {
      const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
      const k1 = p1[2] ? 0 : 1, k2 = p2[2] ? 0 : 1;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6 * k1, p1[1] + (p2[1] - p0[1]) / 6 * k1];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6 * k2, p2[1] - (p3[1] - p1[1]) / 6 * k2];
      d += `C${P2(c1)} ${P2(c2)} ${P2(p2)}`;
    }
    return d + (open ? '' : 'Z');
  };
  /* a limb or a tail: a tube along a centre line [x, y, width], round at the far end */
  const tube = (pts, capStart) => {
    const L = [], R = [];
    pts.forEach((p, i) => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1;
      const nx = -dy / l * p[2] / 2, ny = dx / l * p[2] / 2;
      L.push([p[0] + nx, p[1] + ny]); R.push([p[0] - nx, p[1] - ny]);
    });
    const e = pts[pts.length - 1], e0 = pts[pts.length - 2];
    const dl = Math.hypot(e[0] - e0[0], e[1] - e0[1]) || 1;
    const cap = [e[0] + (e[0] - e0[0]) / dl * e[2] * .45, e[1] + (e[1] - e0[1]) / dl * e[2] * .45];
    const ring = L.concat([cap], R.reverse());
    return smooth(capStart ? ring : ring.map((p, i) => i === 0 || i === ring.length - 1 ? [p[0], p[1], 1] : p));
  };
  /* a lion's paw at (x, y) reaching heading a°, size sz: three toes, each with a hooked claw
     (c = ±1: which way the claws hook) */
  const paw = (P, x, y, a, sz, lw, c) => {
    c = c || 1;
    const r = a * Math.PI / 180, v = [Math.cos(r), Math.sin(r)], n = [-v[1], v[0]];
    const at = (k, j) => [x + (v[0] * k + n[0] * j * c) * sz, y + (v[1] * k + n[1] * j * c) * sz];
    let claws = '';
    [[.66, -.36, -18], [.8, -.02, 4], [.7, .32, 24]].forEach(([k, j, da]) => {
      const rr = r + da * c * Math.PI / 180, tv = [Math.cos(rr), Math.sin(rr)], tn = [-tv[1] * c, tv[0] * c];
      const b = at(k, j);
      const o = (kk, jj) => P2([b[0] + (tv[0] * kk + tn[0] * jj) * sz, b[1] + (tv[1] * kk + tn[1] * jj) * sz]);
      claws += `M${o(-.1, -.13)}Q${o(.42, -.14)} ${o(.56, .2)}Q${o(.3, .02)} ${o(-.1, .12)}Z`;
    });
    const pad = smooth([at(-.1, -.46), at(.36, -.56), at(.7, -.38), at(.6, -.18, 1), at(.84, -.02), at(.62, .14, 1), at(.74, .32), at(.4, .54), at(-.1, .44)]);
    return path(claws, P.accent, mix(P.accent, '#000', .4), lw * .6)
      + path(pad, P.fill, P.line, lw)
      + line(`M${P2(at(.6, -.18))}L${P2(at(.36, -.2))}M${P2(at(.62, .14))}L${P2(at(.38, .14))}`, P.line, lw * .7);
  };

  /* the tones of a lion: armed and langued azure if gold, gules if silver, or if red */
  const lionPal = (o, def) => {
    const f = o.fill || def;
    const [r, g] = rgb(f);
    const acc = o.accent || (isGold(f) || r - g > 70 ? BK.azure : lum(f) > .7 ? BK.gold : BK.red);
    return pal(Object.assign({}, o, { accent: acc, tongue: o.tongue || acc }), def);
  };

  /* a lion's head in profile, facing left, roaring; centred near (0, 0), about 22 across */
  const lionHeadProfile = (P, lw) => {
    const head = smooth([[4, -9], [-1, -11.4], [-6.6, -10.8], [-10.6, -8.8], [-13.8, -7.8], [-15.8, -6.6, 1], [-15.4, -3.6], [-13.4, -2.4, 1],
      [-6.4, -.8, 1], [-13.6, 3, 1], [-12.6, 6], [-7, 7.8], [-1, 7.4], [5, 4]]);
    return path('M-7.6 -.6C-11 0 -14 2 -16 4.8C-16.8 6 -18.4 6.6 -20 6L-18.6 5L-19.4 3.4C-17.6 3.4 -17 2.4 -16.2 1C-14 -1.6 -10.8 -2.2 -7.4 -2Z', P.tongue, mix(P.tongue, '#000', .4), lw * .6)
      + path(head, P.fill, P.line, lw)
      + path('M-13.4 -2.4L-12.4 .5L-11.4 -2.2ZM-12.9 2.9L-11.9 .1L-11 2.9Z', '#fff', P.line, lw * .4)
      + path('M-8.6 -6.4Q-6.2 -8.4 -3.6 -6.8Q-6.2 -5.4 -8.6 -6.4Z', mix(P.fill, '#fff', .7), P.line, lw * .5)
      + `<circle cx="-6.6" cy="-6.6" r=".85" fill="${P.line}"/>`
      + line('M-2.4 -8.4Q-6 -10.2 -10.2 -7.6M-14.8 -5.2Q-13.6 -4.4 -12.2 -4.8M-11.6 -8.2Q-11 -6.6 -11.6 -5.2M-6 -.6Q-3.2 1.4 -3.6 4.6M-9.8 4.8Q-6 6.4 -2.4 5.4', P.line, lw * .6)
      + path('M.6 -10.4C1.4 -13.4 3.4 -15 6.2 -14.8C5.4 -12.4 4.4 -10.6 2.6 -9.4Z', P.fill, P.line, lw);
  };

  /* a lion's face seen from the front (guardant), centred at (0, 0), about 20 across */
  const lionFace = (P, lw) => {
    const ear = 'M-9.4 -4.6C-11.6 -8.6 -10 -12.4 -6.6 -12.2C-6 -9.8 -6.6 -7.6 -8 -5.8Z';
    return path(ear, P.fill, P.line, lw) + path(ear, P.fill, P.line, lw, 'transform="scale(-1 1)"')
      + path(smooth([[0, -10.4], [6.4, -9], [9.8, -4], [9.6, 2], [7, 7], [3.4, 10], [0, 10.8], [-3.4, 10], [-7, 7], [-9.6, 2], [-9.8, -4], [-6.4, -9]]), P.fill, P.line, lw)
      + path('M-2.2 7.2Q0 6.6 2.2 7.2L2.2 10.6Q1.6 13.4 -.4 13.6Q.6 12 -.4 11Q-2 10.4 -2.2 9Z', P.tongue, mix(P.tongue, '#000', .4), lw * .5)
      + path('M-2.8 7.1L-2 9.6L-1.2 6.9ZM2.8 7.1L2 9.6L1.2 6.9Z', '#fff', P.line, lw * .35)
      + path('M-6.6 -2.8Q-4.4 -5.2 -1.8 -3.4Q-4.2 -1.6 -6.6 -2.8ZM6.6 -2.8Q4.4 -5.2 1.8 -3.4Q4.2 -1.6 6.6 -2.8Z', mix(P.fill, '#fff', .75), P.line, lw * .5)
      + `<circle cx="-3.9" cy="-3.1" r="1.05" fill="${P.line}"/><circle cx="3.9" cy="-3.1" r="1.05" fill="${P.line}"/>`
      + path('M-3.2 1.4Q0 .2 3.2 1.4Q2.6 3.8 0 4.6Q-2.6 3.8 -3.2 1.4Z', P.line)
      + line('M-1.4 -5Q-4.4 -7.2 -8 -5.8M1.4 -5Q4.4 -7.2 8 -5.8M-1.2 -3Q-1.6 -.6 -2.4 1.2M1.2 -3Q1.6 -.6 2.4 1.2'
        + 'M0 4.6V6.4M0 6.4Q-2.8 8.2 -5.6 6.2M0 6.4Q2.8 8.2 5.6 6.2', P.line, lw * .6);
  };

  /* a mane of curling locks round (cx, cy): from heading a0° to a1°, roots at radius r */
  const mane = (P, lw, cx, cy, r, a0, a1, n, L, wd, swirl) => {
    let locks = '', det = '';
    for (let i = 0; i < n; i++) {
      const a = a0 + (a1 - a0) * i / (n - 1), rr = a * Math.PI / 180;
      const f = feather(cx + Math.cos(rr) * r, cy + Math.sin(rr) * r, a + swirl, L, wd, 55, .18, 2.2);
      locks += path(f.d, P.fill, P.line, lw); det += f.shaft;
    }
    return locks + line(det, P.detail, lw * .55);
  };

  /* the walking lion shared by passant, St Mark's and the Persian lion: facing left, box 100×64.
     o.face 'front' | 'profile'; the near forepaw is raised (its paw at about 10, 38);
     o.underPaw: markup laid under that forepaw (a book, a sword's hilt); o.halo: a nimbus colour. */
  const walker = (P, lw, o) => {
    const far = Object.assign({}, P, { fill: P.shade });
    let s = '';
    /* tail arching up over the back, its tuft turned forward */
    if (o.tail !== false) {
      s += path(tube([[84, 29, 4.8], [91, 22, 4.2], [92, 12, 3.8], [87, 5.4, 3.4], [80, 5, 3]]), P.fill, P.line, lw);
      s += path(smooth([[81, 2.6], [74, 1, 1], [76, 4.6], [70, 5, 1], [75, 8], [71, 12, 1], [78, 10.4], [82, 8]]), P.fill, P.line, lw);
    }
    /* far legs */
    s += path(tube([[68, 36, 12], [66, 46, 9.4], [63.6, 52, 7.4], [60, 57, 6.6], [57.6, 59.4, 6.2]]), P.shade, P.line, lw) + paw(far, 55.6, 60, 186, 7.6, lw, -1);
    s += path(tube([[35, 36, 10.6], [33, 46, 8.4], [31.6, 53, 7.2], [30.4, 58.4, 6.8]]), P.shade, P.line, lw) + paw(far, 28.4, 60.2, 186, 7.6, lw, -1);
    /* body */
    s += path(smooth([[30, 21], [41, 22], [53, 25.4], [65, 25], [77, 21.6], [85, 24.6], [88, 32], [85, 40], [77, 44], [65, 42], [53, 43.6], [41, 45], [30, 43], [23.6, 35], [24.6, 26]]), P.fill, P.line, lw);
    s += path('M40 25.4C50 27.4 60 28 70 26C61 30 50 30 40 27.6Z', P.hi, null, 0, 'opacity=".7"');
    s += line('M72 30Q77 36 74 42M46 32Q49 37 46 42', P.detail, lw * .6);
    /* near hind leg, the hock bent back */
    s += path(tube([[77, 33, 14.4], [80.6, 44, 10.4], [82, 50, 8], [78.6, 56.4, 7], [74, 59.4, 6.6]]), P.fill, P.line, lw) + paw(P, 71.6, 60, 184, 7.8, lw, -1);
    /* near foreleg, raised */
    s += (o.underPaw || '') + path(tube([[31, 36, 11.4], [24.6, 44, 8.6], [18, 44.4, 7.4], [13, 40.6, 7]]), P.fill, P.line, lw) + paw(P, 10.8, 38.4, 206, 8, lw, 1);
    /* mane and head */
    if (o.halo) {
      const hc = o.face === 'profile' ? [21, 15] : [22, 17];
      s += `<circle cx="${hc[0]}" cy="${hc[1]}" r="18.6" fill="${o.halo}" stroke="${P.line}" stroke-width="${N(lw)}"/>`
        + B.ring(hc[0], hc[1], 16.4, lw * .6, P.line, 'opacity=".55"');
    }
    if (o.face === 'profile') {
      s += path(smooth([[14, 8], [24, 3], [35, 8], [38, 18], [36, 30], [28, 36], [20, 30], [14, 20]]), P.fill, P.line, lw);
      s += mane(P, lw, 25, 17, 8, -110, 110, 9, 9, 7.4, 22);
      s += `<g transform="translate(20 16) scale(1.12)">${lionHeadProfile(P, lw / 1.12)}</g>`;
    } else {
      s += mane(P, lw, 22, 17, 9.4, -180, 160, 12, 8.4, 7.6, 18);
      s += `<g transform="translate(22 17) scale(.98)">${lionFace(P, lw / .98)}</g>`;
    }
    return s;
  };

  /* ── LION PASSANT ─────────────────────────────────
     walking left, the near forepaw raised; opts: guardant (face turned to the viewer,
     default true — England's leopards), crown. Design box 100×64. */
  function lionPassant(x, y, w, h, o) {
    o = o || {};
    const P = lionPal(o, BK.gold);
    const { tr, lw } = fit(x, y, w, h, [0, o.crown ? -6 : 0, 100, o.crown ? 70 : 64], o.flip);
    let s = walker(P, lw, { face: o.guardant === false ? 'profile' : 'front' });
    if (o.crown) s += `<g transform="translate(22 ${o.guardant === false ? 3 : 4.6}) scale(1.05)">${crownSmall(P, lw / 1.05)}</g>`;
    return `<g transform="${tr}">${s}</g>`;
  }

  /* ── LION RAMPANT ─────────────────────────────────
     standing on one hind leg, facing left (dexter). opts: crown, sword (a sword raised in
     the upper forepaw), tail 'single' | 'forked'. Design box 100×100. */
  function lionRampant(x, y, w, h, o) {
    o = o || {};
    const P = lionPal(o, BK.gold);
    const top = o.crown ? -8 : 0, left = o.sword ? -12 : 0;
    const { tr, lw } = fit(x, y, w, h, [left, top, 100 - left, 100 - top], o.flip);
    let s = '';
    /* tail, sweeping up behind in an S, tufted — or forked, as Bohemia's */
    const tuft = (dx, dy) => path(smooth([[82, 25], [82, 16], [86, 8, 1], [88, 15], [93, 9, 1], [92, 18], [98, 18, 1], [93, 24], [87, 27]].map(p => [p[0] + dx, p[1] + dy, p[2]])), P.fill, P.line, lw);
    if (o.tail === 'forked') {
      s += path(tube([[79, 50, 3.8], [72, 40, 3.4], [69, 30, 3.2], [72, 21, 2.8]]), P.fill, P.line, lw) + tuft(-12, -3);
    }
    s += path(tube([[68, 66, 5.4], [78, 60, 4.6], [82, 49, 4.2], [78, 39, 3.8], [79, 29, 3.4], [85, 22, 3]]), P.fill, P.line, lw) + tuft(0, 0);
    /* the far legs, a shade darker */
    const far = Object.assign({}, P, { fill: P.shade });
    s += path(tube([[58, 71, 14], [47, 73.4, 10.6], [40, 79, 8.4], [34, 83, 7.6]]), P.shade, P.line, lw) + paw(far, 31.6, 84, 160, 9, lw, -1);
    s += path(tube([[43, 52, 10.6], [35, 59, 8.4], [25, 57, 7.2], [19, 55, 6.8]]), P.shade, P.line, lw) + paw(far, 16.4, 54.2, 192, 8.6, lw, -1);
    /* body with the standing hind leg */
    s += path(smooth([[42, 20], [49, 30], [54, 41], [58, 48], [64, 55], [70, 61], [73.4, 69.6], [71.6, 78], [67.6, 84, 1], [67.6, 90.6], [65.4, 95.6, 1],
      [56.4, 96.4], [55, 92], [57.8, 86], [58, 80], [52.6, 76], [47.2, 68], [44, 61], [38, 53], [31, 46], [28, 36], [32, 26]]), P.fill, P.line, lw);
    s += paw(P, 57, 94, 182, 9, lw, -1);
    s += line('M63 62.6Q65.6 70.6 61 78M51.4 47Q54.6 53 53.8 59.4M65.4 86.4Q62.8 88 61.8 91', P.detail, lw * .6);
    s += path('M47 33C52.4 38 55.4 43.6 57.4 49.4C53.6 45.6 50 40.4 47 35.4Z', P.hi, null, 0, 'opacity=".7"');
    /* mane: locks of hair curling back round the head, the neck and over the chest */
    s += path(smooth([[22, 4], [34, -1], [47, 6], [53, 19], [51, 32], [44, 42], [32, 47], [24, 38], [20, 24]]), P.fill, P.line, lw);
    let locks = '', ldet = '';
    [[26, 2, -100, 9, 7.4, 70], [32, 0, -70, 10, 7.8, 70], [39, 3, -40, 11, 8.2, 70], [45, 8, -14, 12, 8.6, 68], [49, 15, 10, 12, 8.6, 66],
      [50, 23, 32, 12, 8.6, 62], [48, 31, 54, 11.6, 8.4, 60], [44, 37, 76, 11, 8.2, 58], [38, 42, 98, 10.4, 8, 54], [31, 44, 120, 9.6, 7.4, 50],
      [25, 40, 140, 8.4, 6.8, 46]].forEach(l => {
      const f = feather(...l, .18, 2.2);
      locks = path(f.d, P.fill, P.line, lw) + locks; ldet += f.shaft;
    });
    s += locks + line(ldet, P.detail, lw * .55);
    /* the near forepaw, raised */
    s += path(tube([[41, 38, 11.4], [31, 44, 8.8], [21, 39, 7.4], [15, 35.4, 7]]), P.fill, P.line, lw) + paw(P, 12.6, 33.8, 212, 9, lw, 1);
    /* the head */
    s += `<g transform="translate(29 15.4) scale(1.28)">${lionHeadProfile(P, lw / 1.28)}</g>`;
    if (o.crown) s += `<g transform="translate(30.6 2.6) rotate(-6) scale(1.1)">${crownSmall(P, lw / 1.1)}</g>`;
    if (o.sword) {
      /* a straight sword brandished up and forward from the raised forepaw */
      s += path('M10.4 30.8L-9.4 -1.4L-9.6 -6.4L-5.4 -3.6L14.2 28.4Z', BK.silver, BK.silverLo, lw * .8)
        + line('M11.2 27.4L-6.8 -2.2', '#fff', lw * .6, 'opacity=".7"')
        + path('M5.8 32.6L16.4 26L17.8 28.2L7.2 34.8Z', BK.gold, BK.goldLo, lw * .8)
        + line('M13.4 33.4L17 39.2', BK.goldLo, 3.6) + line('M13.4 33.4L17 39.2', BK.gold, 2.2);
      s += paw(P, 12.6, 33.8, 212, 9, lw, 1);
    }
    return `<g transform="${tr}">${s}</g>`;
  }

  /* ── LION OF ST MARK ──────────────────────────────
     the winged lion of Venice: walking left, haloed, its forepaw on the open Gospel.
     opts: halo (colour), book (page colour), guardant (default true). Design box 100×92. */
  function lionWinged(x, y, w, h, o) {
    o = o || {};
    const P = lionPal(o, BK.gold);
    const { tr, lw } = fit(x, y, w, h, [0, -28, 100, 92], o.flip);
    const fa = o.guardant === false ? 'profile' : 'front';
    /* two wings rising from the shoulders, swept back */
    const wing = (dx, dy, tone) => {
      let pin = '', det = '';
      /* root x, y, heading, length, width, bend — from the shoulder up to the wrist */
      const PS = [[42.4, 20, 28, 21, 9.4, 10], [45, 13.6, 13, 27, 10, 10], [47.8, 7.4, -1, 31, 10.4, 8], [50.6, 1.4, -15, 32, 10.4, 6],
        [53.4, -4.6, -30, 30, 10.2, 4], [56, -10, -46, 25, 9.6, 2]];
      PS.forEach((q, i) => {
        const f = feather(q[0] + dx, q[1] + dy, ...q.slice(2), .48, 1.9);
        pin += path(f.d, tone, P.line, lw); det += f.shaft + (i ? f.edgeL : '');
      });
      const arm = `M${33 + dx} ${29 + dy}C${38 + dx} ${15 + dy} ${45 + dx} ${1 + dy} ${53 + dx} ${-11.6 + dy}C${55 + dx} ${-15.4 + dy} ${60.4 + dx} ${-14.6 + dy} ${59.4 + dx} ${-9.6 + dy}C${56.4 + dx} ${-1 + dy} ${51.6 + dx} ${10 + dy} ${46 + dx} ${24 + dy}Z`;
      return pin + line(det, P.detail, lw * .55) + path(arm, tone, P.line, lw)
        + line(scallops([[38 + dx, 25 + dy], [42 + dx, 13 + dy], [47 + dx, 2 + dy], [55 + dx, -10 + dy]], 5, 2.4, -1), P.detail, lw * .6);
    };
    /* the open Gospel, standing, the raised forepaw resting on it */
    const pg = o.book || BK.ivory, cov = o.cover || BK.redLo, ink = mix(pg, '#000', .4);
    const book = path('M1 41.4L20 40.4L21.6 61.4L2.4 62.4Z', cov, mix(cov, '#000', .4), lw)
      + path('M2.6 41.4Q7 39.4 11.2 41V60.2Q7 58.8 3.8 60.6Z', pg, mix(pg, '#000', .45), lw * .7)
      + path('M11.2 41Q15.4 39 19.6 40.4L20.4 59.4Q16 58.2 11.2 60.2Z', pg, mix(pg, '#000', .45), lw * .7)
      + line('M4.6 45.2L9.6 44.6M4.8 48.4L9.6 47.8M5 51.6L9.6 51M5.2 54.8L9.6 54.2M12.8 44.4L18.2 44M12.8 47.6L18.4 47.2M12.8 50.8L18.6 50.4M12.8 54L18.8 53.6', ink, lw * .6);
    let s = wing(-8, -5, P.shade);
    s += walker(P, lw, { face: fa, underPaw: book + wing(0, 0, P.fill), halo: o.halo || BK.goldHi });
    return `<g transform="${tr}">${s}</g>`;
  }

  /* ── LION AND SUN ─────────────────────────────────
     the Persian Shir-o-Khorshid: a lion walking left, the sun rising behind its back.
     opts: sun (colour), face (a face in the sun, default true), sword (raised in the forepaw).
     Design box 100×92. */
  function lionSun(x, y, w, h, o) {
    o = o || {};
    const P = lionPal(o, BK.gold);
    const { tr, lw } = fit(x, y, w, h, o.sword ? [-12, -28, 112, 92] : [0, -28, 100, 92], o.flip);
    const sun = o.sun || BK.goldHi, sunLo = mix(sun, '#000', .45);
    const cx = 57, cy = 6, r = 15;
    let s = B.wedges(cx, cy, r + 1, r + 12, 16, sun, Math.PI / 16 * .55, Math.PI / 16)
      .replace('/>', ` stroke="${sunLo}" stroke-width="${N(lw * .8)}" stroke-linejoin="round"/>`)
      + B.wedges(cx, cy, r + 1, r + 7.6, 16, sun, Math.PI / 16 * .5, 0).replace('/>', ` stroke="${sunLo}" stroke-width="${N(lw * .8)}" stroke-linejoin="round"/>`);
    s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${sun}" stroke="${sunLo}" stroke-width="${N(lw)}"/>`;
    if (o.face !== false) {
      s += `<g transform="translate(${cx} ${cy - 1})">`
        + line('M-7 -3.4Q-4.4 -5.2 -1.8 -3.6M7 -3.4Q4.4 -5.2 1.8 -3.6M-.6 -2.6Q-1.6 1.6 -.6 3.2Q.6 3.6 1.4 3M-3.6 6.4Q0 8.2 3.6 6.4', sunLo, lw * .7)
        + `<ellipse cx="-4.2" cy="-1.4" rx="1.8" ry="1.1" fill="${sunLo}"/><ellipse cx="4.2" cy="-1.4" rx="1.8" ry="1.1" fill="${sunLo}"/></g>`;
    }
    /* a shamshir brandished forward, its blade curving back at the point */
    const sword = o.sword ? path('M8.6 35.4C2.6 28 -3.6 18 -6.6 7.6C-8 2.6 -8 -2.4 -6.4 -6.6C-5 -1.8 -2.6 3 .4 8.6C3.8 15 8 22 11.6 32.8Z', BK.silver, BK.silverLo, lw * .8)
      + line('M8 31.6C3.6 25 -1.6 16.6 -4.6 6.6', '#fff', lw * .6, 'opacity=".75"')
      + path('M4.4 37.6L13.6 30.2L15.2 32L6 39.4Z', BK.gold, BK.goldLo, lw * .8) : '';
    s += walker(P, lw, { face: 'profile', underPaw: sword });
    return `<g transform="${tr}">${s}</g>`;
  }

  /* ── THE BABYLONIAN LION ───────────────────────────
     the striding lion of the Processional Way, as glazed on the bricks (black outline, white
     body, ochre mane): profile, jaws open, the mane running on as a fringe under the belly,
     legs stiff in stride. opts: fill, mane, line, tail 'up' (raised in an arch, default) |
     'down' (hanging, the tip turned up). Design box about 110×62. */
  function lionStriding(x, y, w, h, o) {
    o = o || {};
    const P = pal(Object.assign({ line: '#211C17', accent: '#E6D9B4', tongue: BK.red }, o), '#F1E6C8');
    const M = Object.assign({}, P, { fill: o.mane || '#D9A43A' });
    M.line = P.line; M.detail = mix(M.fill, P.line, .55);
    const { tr, lw } = fit(x, y, w, h, [-6.6, -1, 112, 62], o.flip);
    const far = Object.assign({}, P, { fill: P.shade });
    let s = '';
    if (o.tail === 'down') {
      s += path(tube([[83, 21, 4.2], [90, 25, 3.6], [93, 33, 3.2], [92, 42, 3], [94, 47.6, 2.8], [98.4, 45.6, 2.6]]), P.fill, P.line, lw);
      s += path(smooth([[96.8, 46.6], [98, 40], [99.4, 37.4, 1], [100, 41.6], [100, 47]]), M.fill, P.line, lw);
    } else {
      /* raised from the rump in an arch, the tufted tip falling */
      s += path(tube([[83, 20, 4.2], [88.6, 12.6, 3.8], [94, 8.4, 3.4], [99, 9.6, 3.1], [101.4, 14, 2.9]]), P.fill, P.line, lw);
      s += path(smooth([[99.4, 13.6], [103.6, 13.4], [104.4, 18], [103, 22.4, 1], [101.6, 19], [99.4, 22, 1], [99, 17.4]]), M.fill, P.line, lw);
    }
    /* far legs */
    s += path(tube([[36, 30, 9.6], [38, 40, 7.4], [40, 48, 6.2], [40.6, 53.6, 6]]), P.shade, P.line, lw) + paw(far, 38.6, 55.4, 180, 7, lw, -1);
    s += path(tube([[71, 30, 11], [67.6, 40, 8], [66, 47, 6.4], [65.4, 53.6, 6]]), P.shade, P.line, lw) + paw(far, 63.4, 55.4, 180, 7, lw, -1);
    /* body */
    s += path(smooth([[26, 14], [40, 15.4], [56, 18], [70, 15.4], [80, 15.4], [86, 20], [86.6, 28], [81, 35], [68, 35.4], [52, 36.6], [36, 37.4], [25, 36], [19.6, 28], [21, 19]]), P.fill, P.line, lw);
    s += line('M71 19.6Q79 21 80.6 30M56 22Q61 27 59 33M70.4 33Q74 30 76.4 33', P.detail, lw * .6);
    /* near legs, stiff in stride */
    s += path(tube([[80, 27, 12.6], [84, 37, 9], [86, 44, 7], [84.6, 50, 6.4], [83.2, 53.8, 6.2]]), P.fill, P.line, lw) + paw(P, 81.2, 55.4, 180, 7.2, lw, -1);
    s += line('M78.4 34Q82.6 37 83.4 42', P.detail, lw * .6);
    s += path(tube([[26, 30, 11], [22.6, 40, 8], [20, 47, 6.6], [18.6, 53.4, 6.2]]), P.fill, P.line, lw) + paw(P, 16.4, 55.4, 180, 7.2, lw, -1);
    s += line('M27 33Q23.6 37 23 42', P.detail, lw * .6);
    /* the mane: a golden cape over neck and shoulder, a fringe under the belly */
    s += path(smooth([[30, 34.6], [40, 35], [52, 35], [64, 34], [66, 37.6, 1], [62, 36.6], [61, 40, 1], [57, 37], [55, 40.6, 1], [51, 37.6], [49, 41, 1],
      [45, 38], [43, 41.4, 1], [39, 38.4], [37, 41.6, 1], [33, 38.6], [30, 40, 1]]), M.fill, P.line, lw);
    s += path(smooth([[14, 4], [22, 1], [32, 1.6], [41, 6], [47, 12], [46, 16, 1], [50, 18], [47, 21.6, 1], [50, 25], [46, 27, 1], [48, 31], [43, 31.6, 1],
      [43.6, 36], [39, 34.6, 1], [37.6, 38.4], [33, 35.4, 1], [30, 39], [27.6, 34, 1], [22, 34], [16, 26]]), M.fill, P.line, lw);
    let tufts = '';
    [[22, 6], [29, 5], [36, 8], [24, 12], [31, 12], [38, 14], [42, 20], [27, 19], [34, 20], [40, 26], [29, 26], [35, 29.4]].forEach(([tx, ty]) => {
      tufts += `M${tx - 2} ${ty - 1.6}Q${tx + .4} ${ty - .4} ${tx + 1.4} ${ty + 2.2}`;
    });
    s += line(tufts, M.detail, lw * .65);
    /* the roaring head */
    s += `<g transform="translate(17 13) scale(1.12)">${lionHeadProfile(P, lw / 1.12)}</g>`;
    return `<g transform="${tr}">${s}</g>`;
  }

  /* ── OWL ──────────────────────────────────────────
     Athena's owl as on the Athenian tetradrachm: standing right, head turned to face us,
     with great round eyes. opts: olive (the sprig behind, default true), moon (the crescent,
     default true), olive colour 'leaf'. Design box 100×100. */
  function owl(x, y, w, h, o) {
    o = o || {};
    const P = pal(Object.assign({ line: '#57503F' }, o), BK.silver);
    const { tr, lw: lw0 } = fit(x, y, w, h, [0, 0, 100, 100], o.flip);
    const lw = lw0 * 1.2; /* the coin owl is line-work: a touch heavier */
    let s = '';
    /* olive sprig and crescent, upper left */
    if (o.olive !== false) {
      const leaf = o.leaf || P.shade;
      s += line('M8 46C14 36 20 28 30 22', P.line, lw * 1.4);
      s += path('M15 35.6C9 32 5.6 25 6 17.6C12.4 21 16 27.4 15 35.6Z', leaf, P.line, lw)
        + path('M21 28C21.6 20.6 26 14 32.6 11.2C32.6 18.4 28.4 24.6 21 28Z', leaf, P.line, lw)
        + line('M14.4 33.6Q10.6 27 7.8 20M22.6 25.6Q26 18.6 30.6 13.4', P.line, lw * .5)
        + `<circle cx="27.4" cy="26.6" r="2.6" fill="${leaf}" stroke="${P.line}" stroke-width="${N(lw)}"/>`;
    }
    if (o.moon !== false) s += path('M9.6 50C3.6 54 3 63.6 9 68.6C5.6 63 6.6 55.4 12.6 51.6C11.6 50.8 10.6 50.2 9.6 50Z', P.fill, P.line, lw);
    /* tail and legs */
    s += path('M40 74L27 93.4L33.6 94.6L46 80Z', P.shade, P.line, lw);
    s += line('M38.4 79.4L31 91M42 79.4L34.6 92', P.line, lw * .5);
    const tal = 'M57.4 82V91M65 82V91';
    s += line(tal, P.line, 5) + line(tal, P.shade, 3.2);
    s += path('M52 94.6Q54.4 89.8 57.4 90.6Q60.6 89.8 62.8 94.6L60.4 93.4L58.6 95.2L57 93.2L54.6 95.2ZM59.6 94.6Q62 89.8 65 90.6Q68.2 89.8 70.4 94.6L68 93.4L66.2 95.2L64.6 93.2L62.2 95.2Z', P.shade, P.line, lw * .8);
    /* body in profile, breast to the right */
    s += path(smooth([[44, 40], [58, 39], [72, 44], [78, 56], [76, 70], [68, 82], [56, 86], [45, 82], [38, 72], [37, 56]]), P.fill, P.line, lw);
    /* breast feathering */
    let dots = '';
    [[66, 52], [71, 56], [62, 57], [68, 61], [73, 64], [64, 66], [70, 70], [60, 71], [66, 75], [61, 79]].forEach(([dx, dy]) => {
      dots += `M${dx - 1.6} ${dy}q1.6 2 3.2 0`;
    });
    s += line(dots, P.line, lw * .6);
    /* the folded wing */
    s += path(smooth([[46, 46], [56, 47], [60, 56], [58, 70], [52, 82], [42, 86, 1], [39, 72], [40, 58]]), P.shade, P.line, lw);
    s += line(scallops([[42, 52], [47, 55], [53, 55], [58, 51]], 3, 2.4, 1) + scallops([[41, 59], [46, 62], [53, 62], [59, 58]], 3, 2.4, 1)
      + 'M44 66L43 80M48.6 66.4L46.6 81.6M53.4 65.6L50.4 80.4M57.4 64.4L54 77', P.line, lw * .6);
    /* the head, facing us: a broad disc, brows in a V, two great eyes */
    s += path(smooth([[58, 10.6], [70, 13], [76, 22], [75, 34], [67, 42], [58, 44], [49, 42], [41, 34], [40, 22], [46, 13]]), P.fill, P.line, lw);
    s += path('M58 24.6C55 19.6 50 18 44.6 19.6C43.6 20 43 21 43.2 22.4C47.6 20.4 53.4 21 58 26.4C62.6 21 68.4 20.4 72.8 22.4C73 21 72.4 20 71.4 19.6C66 18 61 19.6 58 24.6Z', P.shade, P.line, lw * .7);
    s += `<g stroke="${P.line}" stroke-width="${N(lw)}"><circle cx="50.4" cy="28.6" r="7.2" fill="${mix(P.fill, '#fff', .5)}"/><circle cx="65.6" cy="28.6" r="7.2" fill="${mix(P.fill, '#fff', .5)}"/></g>`
      + B.ring(50.4, 28.6, 4.8, lw * .6, P.line) + B.ring(65.6, 28.6, 4.8, lw * .6, P.line)
      + `<circle cx="50.4" cy="28.6" r="2.7" fill="${P.line}"/><circle cx="65.6" cy="28.6" r="2.7" fill="${P.line}"/>`
      + `<circle cx="49.4" cy="27.6" r=".9" fill="#fff" opacity=".85"/><circle cx="64.6" cy="27.6" r=".9" fill="#fff" opacity=".85"/>`;
    s += path('M58 31.6L55.6 35L58 40.6L60.4 35Z', P.accent === BK.gold ? P.shade : P.accent, P.line, lw * .7);
    s += line('M45 38.6Q51 42.6 58 42.6Q65 42.6 71 38.6', P.line, lw * .5);
    return `<g transform="${tr}">${s}</g>`;
  }

  /* a thunderbolt (Jupiter's fulmen, the Napoleonic foudre): a bound spindle with zigzag
     flashes from both ends. Design box 100×40, lying across. */
  function thunderbolt(x, y, w, h, o) {
    o = o || {};
    const fill = o.fill || BK.gold, ln = o.line || mix(fill, '#000', .5);
    const { tr, lw } = fit(x, y, w, h, [0, 0, 100, 40], o.flip);
    const bolt = 'M72 18L80 11L78.4 9.6L88.6 3.4L84.6 8.6L86.4 9.8L79 16.6Z';
    const flash = path(bolt, fill, ln, lw * .8) + path(bolt, fill, ln, lw * .8, 'transform="matrix(1 0 0 -1 0 40)"');
    let s = flash + mirror(flash);
    s += path('M78 18.8L95 16.6L93.4 20L95 23.4L78 21.2Z', fill, ln, lw * .8) + mirror(path('M78 18.8L95 16.6L93.4 20L95 23.4L78 21.2Z', fill, ln, lw * .8));
    s += path('M22 20C30 12.4 42 11 50 11S70 12.4 78 20C70 27.6 58 29 50 29S30 27.6 22 20Z', fill, ln, lw);
    s += path('M30 17.4C38 13.8 46 13.4 50 13.4S62 13.8 70 17.4C62 15.6 56 15.2 50 15.2S38 15.6 30 17.4Z', mix(fill, '#fff', .45), null, 0, 'opacity=".8"');
    s += line('M40 12.4L36 27.6M44 12L40.6 28.2M56 11.8L59.4 28.2M60 12.4L64 27.6', ln, lw * .7);
    s += path('M47 11.2H53V28.8H47Z', fill, ln, lw * .8);
    return `<g transform="${tr}">${s}</g>`;
  }

  /* ── NAPOLEON'S EAGLE ──────────────────────────────
     the imperial eagle 'à l'antique': wings raised, head turned to the left, talons
     gripping a thunderbolt. opts: fill (gold), line, bolt (thunderbolt colour). Box 100×100. */
  function eagleNapoleon(x, y, w, h, o) {
    o = o || {};
    const P = pal(Object.assign({ accent: o.fill || BK.gold }, o), BK.gold);
    const { tr, lw } = fit(x, y, w, h, [0, 0, 100, 100], o.flip);
    /* a raised wing: the arm out to the side, the pinions standing up from it */
    let pin = '', det = '';
    const PS = [[57.6, 33, -96, 22, 11.4, -4], [62.6, 29.6, -89, 25, 12, -2], [68, 27, -80, 27, 12.2, 0], [73.6, 25, -69, 26, 12, 2],
      [79, 23.4, -56, 23.6, 11.4, 4], [83.6, 22.8, -41, 19, 10.4, 6], [87.2, 24, -24, 13, 9, 6]];
    for (let i = PS.length - 1; i >= 0; i--) {
      const f = feather(...PS[i], .6, 1.5);
      pin += path(f.d, P.fill, P.line, lw); det += f.shaft + (i < PS.length - 1 ? f.edge.replace(/./, 'M') : '');
    }
    const arm = 'M53 40C57 33 64 27.6 72 24.6C78 22.4 84 20.8 88 21.4C91.6 22 92 26 89 28.4C84 31 77 33 70 36.6C64 39.6 60 44 57.4 49Z';
    let wing = pin + line(det, P.detail, lw * .55) + path(arm, P.fill, P.line, lw)
      + path('M57 37.6C62 31.6 69 27 77 24.6C70 28.6 64 33 59.4 39Z', P.hi, null, 0, 'opacity=".75"')
      + line(scallops([[57, 45], [64, 37.6], [74, 31.6], [87, 26.4]], 6, 2.6, 1), P.detail, lw * .6);
    let s = '';
    /* tail, behind the thunderbolt */
    const tside = path(feather(53, 68, 70, 21, 10, 4, .5, 1.9).d, P.fill, P.line, lw);
    s += tside + mirror(tside) + path(feather(50, 68, 90, 24, 11, 0, .5, 1.9).d, P.fill, P.line, lw);
    s += wing + mirror(wing);
    /* the body, upright */
    s += path(smooth([[50, 28], [57.6, 32], [60.6, 44], [59, 58], [54.6, 68], [50, 72], [45.4, 68], [41, 58], [39.4, 44], [42.4, 32]]), P.fill, P.line, lw);
    s += path('M44.4 36C42.6 42 42.6 52 44.8 60C44 52 43.8 43 44.4 36Z', P.hi, null, 0, 'opacity=".8"');
    s += line(scallops([[43, 44], [46.4, 47], [53.6, 47], [57, 44]], 4, 2.4, 1) + scallops([[43, 52], [46.4, 55], [53.6, 55], [57, 52]], 4, 2.4, 1)
      + scallops([[44.6, 60], [47.4, 63], [52.6, 63], [55.4, 60]], 3, 2.2, 1), P.detail, lw * .6);
    /* feathered thighs and the talons round the bolt */
    const thigh = path('M53 58C58.6 60 62 64.6 62.6 71L60.4 70L59.6 73.2L57.6 71.4L56.4 74L55 71.2L52.6 72Z', P.fill, P.line, lw);
    s += thigh + mirror(thigh);
    s += thunderbolt(12, 70, 76, 30.4, { fill: o.bolt || P.fill, line: P.line });
    const grip = foot(P, 58.6, 76.6, [[-30, 2.6, -1], [50, 4, 1], [84, 4.6, 1], [118, 4, 1]], 3.8, lw) + `<circle cx="58.6" cy="76.6" r="2.4" fill="${P.accent}"/>`;
    s += grip + mirror(grip);
    /* the head, turned to the left */
    s += `<g transform="translate(48.6 31) scale(1.16)">${eagleHead(P, lw / 1.16, { tongue: false, crown: o.crown })}</g>`;
    return `<g transform="${tr}">${s}</g>`;
  }

  return { eagle, eagleNapoleon, thunderbolt, lionRampant, lionPassant, lionWinged, lionStriding, lionSun, owl, mix, feather };
})();
