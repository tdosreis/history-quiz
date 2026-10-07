/* ═══════════════════════════════════════════════════
   BESTAS — the heraldic beasts the regional brasões share.

   BEAST.name(x, y, w, h, opts) → SVG markup: the beast drawn in its own
   design box and fitted, uniformly scaled and centred, into the box whose
   top-left corner is (x, y) in the 60×60 brasão space.
   Common opts: fill (the beast), line (outline / darker tone), accent
   (beak, claws), tongue, flip (mirror it, to face the other way).
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
      detail: o.detail || (dark ? mix(fill, '#fff', .4) : mix(fill, line, .8)),
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
    return { d: dd, shaft, tip: tp };
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
    const sil = 'M6 3C6.4 -3 5.6 -8 5 -12C4.6 -17.2 1.6 -21.4 -3 -21.4C-6.6 -21.4 -9.2 -19.8 -10.8 -17.6L-10.6 -13.4C-9.2 -11.8 -7.4 -10.4 -6.6 -8C-5.6 -5 -6 -1 -6.6 3';
    let s = '';
    if (o.halo) s += `<circle cx="-2.6" cy="-14.2" r="10.2" fill="${o.haloFill || BK.gold}" stroke="${BK.goldLo}" stroke-width="${N(lw)}"/>`;
    /* tongue, behind the beak */
    if (o.tongue !== false) s += path('M-11 -14.6C-14.6 -14.8 -17.6 -13.6 -19.4 -10.8C-20.2 -9.6 -21.4 -9.4 -22.6 -10.2C-21.6 -10.4 -20.8 -11.2 -20.4 -12.2C-18.6 -15.6 -15 -16.4 -11 -15.8Z', P.tongue, mix(P.tongue, '#000', .4), lw * .6);
    s += path(sil + 'Z', P.fill) + line(sil, P.line, lw);
    /* the nape feathers */
    s += line('M5.6 -6.5Q3.4 -6 3 -8.4M6 -1.5Q3.6 -1 3.4 -3.6M5.3 -11.2Q3.4 -11 3.2 -13', P.detail, lw * .7);
    /* beak: upper mandible with its hook, lower mandible */
    s += path('M-10.2 -18.4C-13.4 -20 -17.6 -19.4 -19.4 -16.4C-20.2 -15 -20 -13.2 -18.8 -12.4C-18.6 -13.8 -17.6 -15 -15.6 -15.2L-10.4 -15.2Z', P.accent, P.accentLo, lw * .8);
    s += path('M-10.4 -14.2L-16 -13.8C-15.2 -12.4 -13 -11.6 -10.2 -12.2Z', P.accent, P.accentLo, lw * .8);
    /* eye */
    s += `<circle cx="-5.6" cy="-16.4" r="1.7" fill="${P.eye}"/><circle cx="-6" cy="-16.4" r=".75" fill="${P.dark ? P.line : P.fill}"/>`;
    s += line('M-3.6 -18.6Q-6 -19.6 -8.2 -18.2', P.detail, lw * .6);
    if (o.crown) s += `<g transform="translate(-2.2 -20.6) rotate(-6) scale(.8)">${crownSmall(P, lw / .8)}</g>`;
    return s;
  };

  /* ── EAGLE ─────────────────────────────────────────
     opts: heads 1|2, crown (a crown on each head), imperial (one great crown above
     the heads), halo (nimbus round each head), wings 'up' (raised, German style,
     default) | 'down' (pinions hanging, as Saladin's), legs (default true),
     tongue (colour, or false), shield (tincture of a little escutcheon on the breast).
     Design box 100×100 (the breast centre is at 50,50 of it). */
  function eagle(x, y, w, h, o) {
    o = o || {};
    const P = pal(o, BK.sable);
    const two = o.heads === 2;
    const top = o.imperial ? -14 : (o.crown || o.halo) ? -3 : 0;
    const vb = [0, top, 100, 100 - top];
    const { tr, lw } = fit(x, y, w, h, vb, o.flip);
    const down = o.wings === 'down';
    let half = '';

    /* the wing: pinions first, then the arm with its coverts */
    let pin = '', shafts = '';
    const P_UP = [ // root x, y, heading, length, width, bend
      [62, 41, 92, 25, 7, 6], [67.5, 35.5, 72, 29, 7.2, 8], [73, 29.5, 52, 29, 7.2, 8],
      [78, 23.5, 32, 25, 7, 8], [82, 17.5, 12, 19, 6.6, 6], [84.5, 12.5, -12, 13.5, 6, 4]];
    const P_DOWN = [
      [61, 42, 98, 26, 7.4, 4], [66.5, 38, 88, 32, 7.6, 3], [72.5, 34.5, 78, 35, 7.6, 2],
      [78.5, 31.5, 66, 34, 7.4, 0], [84, 29, 53, 29, 7, -2], [88.5, 27.5, 38, 21, 6.4, -4]];
    const PS = down ? P_DOWN : P_UP;
    for (let i = PS.length - 1; i >= 0; i--) {
      const f = feather(...PS[i], .64, 1.35);
      pin += path(f.d, i % 2 ? P.fill : P.fill, P.line, lw);
      shafts += f.shaft;
    }
    const arm = down
      ? 'M54 30C63 24.4 77 21 88 21.6C92.2 21.8 94 24.6 92.2 27.6C89 30.4 84 30.6 78 32.6C70 35.4 64 39 59.6 45.4Z'
      : 'M54 31C61 22 72 13.6 82.4 8.8C86.6 7 89.4 9.6 87.4 13.2C84 18 79 23.4 73.2 29.2C67.4 35 62.6 40 59.6 45.4Z';
    const cov = down ? [[57, 33], [66, 27.6], [78, 25], [88.6, 25]] : [[57, 34], [64, 26], [73.4, 18.4], [84, 11.4]];
    half += pin + line(shafts, P.detail, lw * .55);
    half += path(arm, P.fill, P.line, lw);
    half += line(scallops(cov, 6, 2.4, 1), P.detail, lw * .65);

    /* tail: a fan of five feathers */
    let tside = '', tmid = '', tsh = '';
    [[54, 64, 56, 19, 6.8, 8], [52, 66, 72, 23, 7.4, 6]].forEach(t => {
      const f = feather(...t, .62, 1.3);
      tside += path(f.d, P.fill, P.line, lw); tsh += f.shaft;
    });
    { const f = feather(50, 66, 90, 25, 8, 0, .62, 1.3); tmid = path(f.d, P.fill, P.line, lw); tsh += f.shaft; }

    /* leg: feathered thigh, scaled shank, three talons forward and one behind */
    let leg = '';
    if (o.legs !== false) {
      const shank = down ? 'M60.2 64.4L64.6 72.6L67.6 71L63.4 62.6Z' : 'M60.2 64.4L64.6 72.6L67.6 71L63.4 62.6Z';
      const toes = 'M65.6 71.6Q71 68.6 76.6 69.6M66 72.2Q71.4 72.6 75.4 76.4M65.4 72.8Q68 77 68.4 81.4M64.2 72.4Q60.4 74 58.6 77.8';
      leg += line(toes, P.accentLo, 3.2) + line(toes, P.accent, 1.9);
      /* claws */
      leg += path('M76.2 68.2Q79.6 68.8 80 72.2Q78.4 70.6 76.2 71Z', P.accent, P.accentLo, lw * .6)
        + path('M75 75Q78.6 76.6 77.4 80Q76.6 78 74.4 77.6Z', P.accent, P.accentLo, lw * .6)
        + path('M67.2 80.6Q69.4 83.4 67.2 86Q67.4 83.8 66 82Z', P.accent, P.accentLo, lw * .6)
        + path('M59.8 76.6Q56.6 78 57 81.6Q58.2 79.6 60.2 79.2Z', P.accent, P.accentLo, lw * .6);
      leg += path(shank, P.accent, P.accentLo, lw * .8);
      leg += line('M61 66.2L63.6 65M62 68.2L64.8 67M63 70.2L65.8 69', P.accentLo, lw * .5);
      leg += path('M53.6 52.6C59.4 54 63.8 58.6 64.6 64.4L62.8 63.4L62 66L60 64.2L58.4 66.4L57 63.6L54.6 64.8Z', P.fill, P.line, lw);
      leg += line('M56.4 57Q58.6 58.6 59.2 61.2M59.4 56Q61.6 58 62 60.6', P.detail, lw * .6);
    }

    half = leg + half;
    let s = half + mirror(half);
    s += tside + mirror(tside + line(tsh, P.detail, lw * .55)) + tmid + line(tsh, P.detail, lw * .55);

    /* the body */
    const body = 'M50 25C57.4 25 60.6 33 60.4 43C60.2 54 56.6 63.6 50 70C43.4 63.6 39.8 54 39.6 43C39.4 33 42.6 25 50 25Z';
    s += path(body, P.fill, P.line, lw);
    s += path('M45.4 33C43.6 38 43.6 47 45.6 54C44 49 43.6 40 45.4 33Z', P.hi, null, 0, 'opacity=".8"');
    s += line(scallops([[44, 40], [47, 42.6], [53, 42.6], [56, 40]], 4, 2.2, 1)
      + scallops([[44.4, 47], [47.4, 49.6], [52.6, 49.6], [55.6, 47]], 4, 2.2, 1)
      + scallops([[45.6, 54], [48, 56.6], [52, 56.6], [54.4, 54]], 3, 2, 1), P.detail, lw * .6);
    if (o.shield) {
      s += path('M43 41H57V50C57 55 54 58.4 50 60C46 58.4 43 55 43 50Z', o.shield, mix(o.shield, '#000', .45), lw);
    }

    /* the head or heads */
    if (two) {
      const hd = `<g transform="translate(46 30) rotate(-20)">${eagleHead(P, lw, o)}</g>`;
      s += hd + mirror(hd);
    } else {
      s += `<g transform="translate(50 30)">${eagleHead(P, lw, o)}</g>`;
    }
    if (o.imperial) s += imperialCrown(lw, two ? -1 : 3);
    return `<g transform="${tr}">${s}</g>`;
  }

  /* a great crown (the imperial crown above a double eagle), base centre (50, y0+16) */
  const imperialCrown = (lw, y0) => {
    const g = BK.gold, gl = BK.goldLo;
    return `<g transform="translate(0 ${y0})">`
      + path('M41 0C41 -7 45 -10.6 49 -11L50 -2L51 -11C55 -10.6 59 -7 59 0Z', BK.red, BK.redLo, lw * .8)
      + path('M41 0C41 -7 45 -10.6 49.2 -11.2L49.2 0Z', g, gl, lw * .8, 'opacity=".001"')
      + line('M41.6 -1C41.6 -7.4 45.4 -10.6 49.6 -11.4M58.4 -1C58.4 -7.4 54.6 -10.6 50.4 -11.4', g, 2)
      + line('M50 -12V0', g, 2.4)
      + path('M40 -1H60L59 3.6H41Z', g, gl, lw * .8)
      + `<circle cx="50" cy="-13.4" r="2" fill="${g}" stroke="${gl}" stroke-width="${N(lw * .7)}"/>`
      + line('M50 -15.2V-19.8M48 -17.8H52', g, 1.3)
      + B.dots(50, 1.2, 0, 1, 0, 'none') + `</g>`;
  };

  return { eagle, mix, pal, fit, feather };
})();

/* demo — to be removed */
Object.assign(BRASAO, {
  __eagle1: { shape: 'heater', field: BK.gold, what: 'test', draw: () => BEAST.eagle(8, 8, 44, 44, { fill: BK.sable }) },
  __eagle2: { shape: 'heater', field: BK.gold, what: 'test', draw: () => BEAST.eagle(8, 8, 44, 44, { heads: 2, fill: BK.sable, halo: true }) },
  __eagleR: { shape: 'oval', field: BK.gold, what: 'test', draw: () => BEAST.eagle(8, 6, 44, 46, { heads: 2, fill: BK.sable, crown: true, imperial: true }) },
  __eagleP: { shape: 'heater', field: BK.silver, what: 'test', draw: () => BEAST.eagle(10, 10, 40, 40, { fill: BK.sable, crown: true }) },
  __aquila: { shape: 'scutum', field: BK.red, what: 'test', draw: () => BEAST.eagle(10, 10, 40, 40, { fill: BK.gold }) },
  __saladin: { shape: 'banner', field: BK.silver, what: 'test', draw: () => BEAST.eagle(14, 14, 32, 32, { fill: BK.gold, wings: 'down', accent: BK.goldLo }) },
});
