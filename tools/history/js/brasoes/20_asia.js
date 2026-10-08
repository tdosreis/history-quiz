/* ═══════════════════════════════════════════════════
   ÁSIA — China, Índia, Mongólia, Japão, Camboja, Pérsia
═══════════════════════════════════════════════════ */
(() => {
  const F = B.f;
  const mir = s => `<g transform="matrix(-1 0 0 1 60 0)">${s}</g>`;
  const both = s => s + mir(s);
  const P = (d, fill, stroke, w, extra) => `<path d="${d}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${w || 1}" stroke-linejoin="round"` : ''}${extra ? ' ' + extra : ''}/>`;
  const L = (d, stroke, w, extra) => `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w || 1}" stroke-linecap="round" stroke-linejoin="round"${extra ? ' ' + extra : ''}/>`;
  /* a ribbon: the line drawn twice, a darker edge under a lighter core */
  const rib = (d, fill, edge, w) => L(d, edge, w + 1) + L(d, fill, w);
  const pt = p => F(p[0]) + ' ' + F(p[1]);
  const pol = (cx, cy, a, r) => [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  /* a smooth closed curve through points (midpoint quadratics) */
  const smooth = pts => {
    const n = pts.length, m = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    let d = 'M' + pt(m(pts[n - 1], pts[0]));
    for (let i = 0; i < n; i++) d += 'Q' + pt(pts[i]) + ' ' + pt(m(pts[i], pts[(i + 1) % n]));
    return d + 'Z';
  };
  /* a tapering tube along a Catmull-Rom spine [[x, y, width], ...]; returns the outline and its samples */
  const tube = (S, k) => {
    k = k || 8;
    const C = (a, b, c, d, t) => .5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t);
    const sp = [];
    for (let i = 0; i < S.length - 1; i++) {
      const a = S[Math.max(0, i - 1)], b = S[i], c = S[i + 1], d = S[Math.min(S.length - 1, i + 2)];
      for (let j = 0; j < k; j++) {
        const t = j / k;
        sp.push([C(a[0], b[0], c[0], d[0], t), C(a[1], b[1], c[1], d[1], t), b[2] + (c[2] - b[2]) * t]);
      }
    }
    sp.push(S[S.length - 1]);
    const lft = [], rgt = [], tan = [], nrm = [];
    sp.forEach((p, i) => {
      const q = sp[Math.min(sp.length - 1, i + 1)], o = sp[Math.max(0, i - 1)];
      let dx = q[0] - o[0], dy = q[1] - o[1];
      const l = Math.hypot(dx, dy) || 1; dx /= l; dy /= l;
      tan.push([dx, dy]); nrm.push([dy, -dx]);
      lft.push([p[0] + dy * p[2] / 2, p[1] - dx * p[2] / 2]);
      rgt.push([p[0] - dy * p[2] / 2, p[1] + dx * p[2] / 2]);
    });
    return { d: smooth(lft.concat(rgt.slice().reverse())), sp, lft, rgt, tan, nrm };
  };
  /* a disc edged with n flame-like tufts that swirl one way (a lion's mane) */
  const tufts = (cx, cy, r, n, dep, rot) => {
    rot = rot || 0;
    const st = 2 * Math.PI / n;
    let d = 'M' + pt(pol(cx, cy, rot, r));
    for (let i = 0; i < n; i++) {
      const a = rot + i * st;
      d += 'Q' + pt(pol(cx, cy, a + st * .12, r + dep * .85)) + ' ' + pt(pol(cx, cy, a + st * .62, r + dep))
        + 'Q' + pt(pol(cx, cy, a + st * .8, r + dep * .3)) + ' ' + pt(pol(cx, cy, a + st, r));
    }
    return d + 'Z';
  };
  const stops = s => s.map(([o, c, op]) => `<stop offset="${o}" stop-color="${c}"${op !== undefined ? ` stop-opacity="${op}"` : ''}/>`).join('');
  const lin = (u, id, a, b, s) => `<linearGradient id="${u}${id}" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}">${stops(s)}</linearGradient>`;
  const rad = (u, id, cx, cy, r, s) => `<radialGradient id="${u}${id}" cx="${cx}" cy="${cy}" r="${r}">${stops(s)}</radialGradient>`;

  /* ── the Ashoka chakra: rim, hub and 24 tapering spokes ── */
  const chakra = (cx, cy, r, c, w) => {
    let d = '';
    for (let i = 0; i < 24; i++) {
      const a = i * Math.PI / 12, h = Math.PI / 12 * .24;
      d += `M${pt(pol(cx, cy, a, r * .2))}L${pt(pol(cx, cy, a - h, r * .55))}L${pt(pol(cx, cy, a, r * .97))}L${pt(pol(cx, cy, a + h, r * .55))}Z`;
    }
    return `<path d="${d}" fill="${c}"/>` + B.ring(cx, cy, F(r - w / 2), w, c) + `<circle cx="${cx}" cy="${cy}" r="${F(r * .22)}" fill="${c}"/>`;
  };

  /* a hooked claw from the foot (fx, fy), heading a°, curling by c° */
  const talon = (fx, fy, a, len, w, c) => {
    const r = a * Math.PI / 180, r2 = (a + c) * Math.PI / 180, n = [-Math.sin(r), Math.cos(r)];
    const m = [fx + Math.cos(r) * len * .6, fy + Math.sin(r) * len * .6], t = [m[0] + Math.cos(r2) * len * .5, m[1] + Math.sin(r2) * len * .5];
    return `M${pt([fx + n[0] * w / 2, fy + n[1] * w / 2])}Q${pt([m[0] + n[0] * w * .45, m[1] + n[1] * w * .45])} ${pt(t)}`
      + `Q${pt([m[0] - n[0] * w * .25, m[1] - n[1] * w * .25])} ${pt([fx - n[0] * w / 2, fy - n[1] * w / 2])}Z`;
  };

  /* ── the azure dragon of the Qing flag ── */
  const dragon = c => {
    const T = tube([[20.8, 31, 4.2], [22.6, 34.6, 4.8], [26.6, 37, 5.2], [31.6, 34.4, 5.4], [34.4, 27.4, 5.2], [38.6, 21.4, 5], [44, 21, 4.6],
      [47.4, 26.2, 4.2], [47.6, 32.4, 3.6], [49.4, 36.8, 2.8], [52.6, 36, 2], [53.8, 32, .9]], 10);
    const N = T.sp.length;
    let s = '';
    /* dorsal fins, swept back along the spine */
    let fins = '';
    for (let i = 8; i < N - 8; i += 5) {
      const a = T.lft[i], b = T.lft[i + 4], o = T.nrm[i + 3], t = T.tan[i + 3];
      const tip = [b[0] + o[0] * 1.9 + t[0] * 1.1, b[1] + o[1] * 1.9 + t[1] * 1.1];
      fins += `M${pt(a)}Q${pt([a[0] + o[0] * 1.6, a[1] + o[1] * 1.6])} ${pt(tip)}Q${pt([b[0] + o[0] * .6, b[1] + o[1] * .6])} ${pt(b)}Z`;
    }
    s += P(fins, c.fin, c.line, .6);
    /* a leg: thigh, foreleg and a five-clawed foot */
    const leg = (pts, ang) => {
      const t = tube(pts, 6), f = pts[pts.length - 1];
      let cl = '';
      for (let i = -2; i <= 2; i++) cl += talon(f[0], f[1], ang + i * 26, 3, 1.1, 40);
      return P(cl, c.claw, c.line, .5) + P(t.d, c.body, c.line, .7);
    };
    s += leg([[24, 33, 3], [20.6, 38.6, 2.4], [17.4, 40.4, 2]], 165);
    s += leg([[44.4, 22.6, 3], [48.4, 18.6, 2.4], [51.2, 17.6, 2]], -25);
    /* tail tip: a flame */
    s += P('M53.4 33.4C55.2 31.4 55.4 28.4 53.8 26.6C54.2 28.6 53.4 29.6 52.6 30.6C52.6 29 51.8 28 50.8 27.6C51.6 29.6 51.4 31.6 50.8 33Z', c.fin, c.line, .5);
    s += P(T.d, c.body, c.line, .8);
    /* scales on the back half, the pale belly scutes on the near side */
    let sc = '';
    for (let i = 4; i < N - 14; i += 3) {
      const p = T.sp[i], o = T.nrm[i], t = T.tan[i], w = p[2];
      [.12, .3].forEach((k, j) => {
        if ((i + j) % 2) return;
        const q = [p[0] + o[0] * w * k, p[1] + o[1] * w * k];
        sc += `M${pt([q[0] + o[0] * .7, q[1] + o[1] * .7])}Q${pt([q[0] + t[0] * 1.1, q[1] + t[1] * 1.1])} ${pt([q[0] - o[0] * .7, q[1] - o[1] * .7])}`;
      });
    }
    s += L(sc, c.scale, .5);
    const bi = [], bo = [];
    for (let i = 2; i < N - 12; i++) {
      const p = T.sp[i], o = T.nrm[i], w = p[2];
      bi.push([p[0] - o[0] * w * .06, p[1] - o[1] * w * .06]); bo.push([p[0] - o[0] * w * .42, p[1] - o[1] * w * .42]);
    }
    s += P(smooth(bi.concat(bo.reverse())), c.belly, c.line, .4);
    let cuts = '';
    for (let i = 4; i < N - 14; i += 3) {
      const p = T.sp[i], o = T.nrm[i], w = p[2];
      cuts += `M${pt([p[0] - o[0] * w * .06, p[1] - o[1] * w * .06])}L${pt([p[0] - o[0] * w * .42, p[1] - o[1] * w * .42])}`;
    }
    s += L(cuts, c.line, .4, 'opacity=".6"');
    s += leg([[29, 37, 3.2], [28.2, 42, 2.4], [26.2, 44, 2]], 150);
    s += leg([[47.4, 30.4, 3], [51.4, 33.2, 2.4], [52.6, 37.6, 2]], 75);
    return s;
  };

  /* the dragon's head in profile, after the 1889 flag: a long muzzle with the nose turned up, a heavy
     brow over a small almond eye, the jaw a little open, antlers, mane and whiskers streaming back.
     Drawn pointing left with the jaw hinge at (0,0). */
  const dragonHead = c =>
    /* mane: flame-locks streaming back from the nape */
    P('M1.4 -5C3.6 -6.4 6.6 -6.8 10.2 -9C9.6 -6.6 8.2 -5 6.6 -4.2C8.8 -4 10.8 -2.8 12 -.6C9.8 -1 8 -.8 6.6 -.2'
      + 'C8.4 1 9.4 2.8 9.4 5C7.6 3.4 5.6 2.6 3.6 2.6C4.2 3.8 4.2 5.4 3.4 6.6C2.8 4.8 1.4 3.6 -.4 3.2Z', c.mane, c.line, .65)
    + L('M3.4 -4.2C5.6 -5 7.6 -6 9 -7.4M4.4 -1.2C6.6 -1.4 8.6 -1.2 10.4 -.4M4 1.6C5.6 2.2 7 3 8 4.2', c.line, .55, 'opacity=".55"')
    /* antlers, rising back, one tine */
    + P(tube([[.6, -8.6, 1.5], [-.4, -10.8, 1.1], [-2.4, -12.4, .45]], 5).d + tube([[-1.6, -4.6, 2.5], [-.6, -8.2, 2], [2, -11.2, 1.4], [6, -13, .5]], 6).d, c.horn, c.line, .6)
    /* the lower jaw, a little open, and the dark of the mouth */
    + P('M-4.4 .4L-13 .6C-13.8 .8 -14 2.2 -13.2 2.6C-10.4 3.6 -6.6 3.8 -3.6 3.2C-2 2.8 -1 1.8 -1.2 .8Z', c.body, c.line, .75)
    + P('M-4.6 0L-14 -1.2L-13.2 .7Z', c.mouth)
    + P('M-12.6 -1.2L-12.1 .5L-11.4 -1Z', c.claw)
    /* beard under the chin */
    + P('M-10.6 3.2C-11.4 5.2 -10.4 7 -8.4 7.8C-9 6.2 -8.4 4.8 -7.2 3.6Z', c.fin, c.line, .55)
    /* skull and upper jaw: the crown, the long bridge, the bulbous nose turned up */
    + P('M2.6 -1C2.4 -3.6 .6 -5.6 -2 -5.8C-3.8 -5.9 -5.4 -5 -6.8 -4.4C-8.6 -3.8 -10.4 -3.8 -12 -4.8'
      + 'C-13.2 -5.8 -15 -5.8 -15.8 -4.6C-16.4 -3.6 -16 -2 -14.6 -1.4L-4.6 0C-3.4 .2 -2.2 1.8 -.4 2.4C1.2 2.8 2.8 1.2 2.6 -1Z', c.body, c.line, .85)
    /* light along the bridge, the nostril curl, the cheek fold */
    + L('M-12.4 -3.2C-10.4 -2.6 -8.4 -2.8 -6.6 -3.4', c.scale, .8)
    + L('M-14.8 -3.4C-14.6 -4.4 -13.4 -4.4 -13.6 -3.4', c.line, .65)
    + L('M-1.2 1.4C-2.8 1 -2.8 -1.2 -1.1 -1.5C.4 -1.7 1.3 -.3 .5 .6', c.line, .6)
    /* the heavy brow ridge, flaring back into a flame */
    + P('M-8.4 -4.2C-7.2 -6.4 -4.8 -7.4 -2.4 -7C-.8 -6.8 .6 -7.6 1.6 -8.8C1.8 -6.6 .6 -5 -1 -4.6C-3 -4.2 -5 -4.6 -6.6 -3.6Z', c.mane, c.line, .65)
    /* the eye: a small almond under the brow, no white */
    + P('M-7.2 -3.2C-6.2 -4.4 -4.6 -4.5 -3.8 -3.8C-4.8 -2.8 -6.2 -2.7 -7.2 -3.2Z', c.eye)
    + `<circle cx="-4.9" cy="-3.6" r=".34" fill="${c.glint}"/>`
    /* whiskers: long barbels from the lip, trailing back */
    + L('M-15.4 -1.8C-17.4 .6 -16.6 3.8 -13.6 4.8C-10.6 5.8 -7.2 5 -4.4 6.4C-2.6 7.4 -2.4 9.2 -3.8 9.8', c.whisker, .75)
    + L('M-14.2 -5.8C-13.6 -8.4 -11 -9.6 -8.2 -9.2C-6.2 -9 -5 -10 -5.2 -11.6', c.whisker, .75);

  Object.assign(BRASAO, {
    /* ── QIN: the Ban Liang, the round coin with the square hole that Qin imposed on all China ── */
    dinastia_qin: { shape: 'coin', field: '#161311', rim: '#2B2520', what: 'a moeda Ban Liang (半兩) de bronze, de furo quadrado, sobre o negro de Qin',
      draw: u => {
        const R = 21.4, h = 4.3;
        const disc = `M${30 - R} 30a${R} ${R} 0 1 0 ${2 * R} 0a${R} ${R} 0 1 0 ${-2 * R} 0ZM${30 - h} ${30 - h}V${30 + h}H${30 + h}V${30 - h}Z`;
        /* 半 (right) and 兩 (left), small-seal script, cast in relief */
        const ban = 'M38.8 20.4L40.1 23.4M44.4 20.4L43.1 23.4M41.6 21V40.4M37.8 24.6Q38.6 27.4 41.6 27.4Q44.6 27.4 45.4 24.6M37.2 32.2H46';
        const liang = 'M14 20.8H22.8M18.4 20.8V29M14.6 40.2V24.8H22.2V40.2M18.4 29L15.8 36.6M18.4 29L21 36.6M16.6 33.8L17.4 37.6M20.2 33.8L19.4 37.6';
        return `<defs>${rad(u, 'bz', '38%', '30%', '78%', [[0, '#DDAE6B'], [.55, '#A8733A'], [1, '#6A4420']])}</defs>`
          + `<path d="${disc}" fill="url(#${u}bz)" fill-rule="evenodd" stroke="#4A2F14" stroke-width="1"/>`
          + `<g fill="#5E8C6E" opacity=".5"><path d="M21 45q3-2 5 0q-1 3-4 2z"/><path d="M44.6 38.6q2-1 3 1q-2 2-3 0z"/><path d="M33 13q3-1 4 1q-2 2-4 0z"/></g>`
          + L(`M${30 + h} ${30 - h}V${30 + h}H${30 - h}`, '#F0CB8A', .8, 'opacity=".7"')
          + L(`M${30 - h} ${30 + h}V${30 - h}H${30 + h}`, '#3C2510', .9)
          + `<g transform="translate(.45 .55)">${L(ban + liang, '#3E260E', 1.5)}</g>` + L(ban + liang, '#E9C185', 1.25);
      } },

    /* ── HAN: the Vermilion Bird of the South, as on Han eave tiles and pictorial seals ── */
    han: { shape: 'seal', field: '#A21E1C', rim: '#6E1418', what: 'o Pássaro Vermelho (Zhuque) dos telhados Han, em ouro sobre laca vermelha',
      draw: u => {
        const G = `url(#${u}gd)`, Gs = '#D6A93F', Gl = '#6E4510', Gh = '#F6DC8E';
        let s = `<defs>${lin(u, 'gd', [0, 0], [.4, 1], [[0, '#F0CF74'], [.5, '#D6A93F'], [1, '#B07F2A']])}</defs>`;
        /* Han cloud scrolls, painted faint in the lacquer, and a gold border */
        s += L('M14.6 41.6C16.6 39.4 19.8 40 20 42.4C20.2 44.2 18 44.6 17.4 43.4M45.4 41.8C43.6 40.2 41 40.8 41 43C41 44.6 43 44.8 43.4 43.6M15 17.2C16.8 15.4 19.4 16 19.4 18', Gs, .9, 'opacity=".4"');
        s += `<rect x="12.8" y="12.6" width="34.4" height="35" fill="none" stroke="${Gs}" stroke-opacity=".6" stroke-width=".8"/>`;
        let b = '';
        /* three tail plumes, sweeping back and curling */
        b += rib('M38.6 30.6C43.6 29.8 47.4 26.6 47.6 21.6C47.8 18.6 45.4 17.2 43.8 18.6C42.6 19.8 43.6 21.6 45.2 21', Gs, Gl, 2.2);
        b += rib('M39.6 32.4C44.6 33 48.6 34 50 38C50.8 40.6 48.8 42.2 47.2 41C46 40 47 38.6 48.2 39.2', Gs, Gl, 2.2);
        b += rib('M38.2 34.6C41.6 37.4 43.6 41.4 42.6 45.4C42 47.6 39.4 47.8 39 46C38.8 44.8 40 44.2 40.8 45', Gs, Gl, 2);
        /* legs, striding, three toes forward */
        b += rib('M28.4 37.2L26.6 41.4L24.6 45.6M21.8 45.8H26.4M32.2 37.6L34 41.6L33 45.6M30.6 45.8H35.4', Gs, Gl, 1.3);
        /* the raised wing: four pinions fanned back */
        b += P('M25.6 28C25 21 27.6 13.4 33.8 7.6C34.2 9.6 34 11 33.4 12.4C35.2 10.4 37 9.6 38.8 9.6C38.6 11.6 37.8 13.2 36.8 14.4C38.8 13.4 40.6 13.2 42.2 13.6'
          + 'C41.6 15.4 40.2 16.8 38.8 17.8C40.6 17.6 42 17.8 43.4 18.6C41.8 21.6 39.6 23.6 37.6 25C37.6 26.6 37.2 28 36.6 29Z', G, Gl, .9);
        b += L('M29 23.6C30.4 19.6 31.6 15.6 33.4 12.4M31.6 25C33.4 20.8 34.8 17.4 36.8 14.4M34 26.2C35.6 23 37 20.2 38.8 17.8', Gl, .8);
        b += L('M27 26.6Q28.6 24.6 29.6 21.6M29.6 27.8Q31.8 26.4 33 23.4', Gh, .8, 'opacity=".85"');
        /* crest plume */
        b += rib('M22 14.8C22.2 11.6 25 9.6 27.2 10.4C28.8 11 28.6 13 27.2 13.2C26.2 13.4 25.8 12.4 26.4 11.8', Gs, Gl, 1.5);
        /* body, S-necked, and head */
        b += P('M14.2 18.4L18 16.4C18.8 14.6 20.6 14 22 14.6C23.6 15.4 23.8 17.4 23 18.8C22.2 20.4 22.4 22.6 24 24.4C25.6 26 27.8 26.6 30 26.6'
          + 'C34.2 26.6 37.4 27.8 39.4 30C40.6 31.6 40.4 33.6 38.6 35C35.6 37.4 31 38 27.4 37C23.6 36 21 33 20.8 29.4C20.6 26.4 21.4 23.6 20.6 21.4'
          + 'C20.2 20.2 19.2 19.4 18 19.2Z', G, Gl, .9);
        b += P('M22.4 28.6C22.6 32.4 24.8 35 28.6 35.8C25.6 34 23.8 31.6 23.6 28.2Z', Gh, null, 0, 'opacity=".8"');
        b += L('M27.6 31.8Q31.4 34.8 37 33M29.6 29.6Q33.2 31.6 37.6 30.4', Gl, .7);
        b += `<circle cx="20.4" cy="16.6" r=".95" fill="#4A0C0C"/>` + L('M14.4 18.4L18.6 17.8', Gl, .6);
        return s + `<g transform="translate(3.4 3.6) scale(.86)">${b}</g>`;
      } },

    /* ── MAURYA: Ashoka's lion capital at Sarnath, in polished Chunar sandstone ── */
    maurya: { shape: 'roundel', field: '#1D5A63', what: 'o capitel dos leões de Ashoka (Sarnath), em arenito polido',
      draw: u => {
        const S = '#E8D9B2', Sd = '#BFA676', Sl = '#6A5232', Sh = '#FBF4DE', M = '#4E3218';
        let s = '';
        /* the bell: an inverted lotus, its petals ribbed, on a round plinth */
        s += both(P('M30 37.2H37.6C38.8 41.4 41.6 45.8 45.2 49.2H30Z', S, Sl, .9));
        let ribs = '';
        [[2.6, 5.4], [5.2, 10.6], [7.4, 15]].forEach(([a, b]) => { ribs += `M${30 + a} 38.6L${30 + b} 48.8M${30 - a} 38.6L${30 - b} 48.8`; });
        s += L(ribs + 'M30 38.6V48.8', Sd, 1);
        s += L('M24.4 39Q22 44 18.6 48', Sh, 1.1, 'opacity=".9"');
        s += `<rect x="13.6" y="48.8" width="32.8" height="3.6" rx="1.4" fill="${S}" stroke="${Sl}" stroke-width=".9"/>`;
        s += `<rect x="22" y="35.6" width="16" height="1.8" fill="${Sd}" stroke="${Sl}" stroke-width=".7"/>`;
        /* the abacus: the wheel of the law between a galloping horse and a bull */
        s += `<rect x="15" y="30.2" width="30" height="5.6" rx="1" fill="${S}" stroke="${Sl}" stroke-width=".9"/>`;
        s += B.ring(30, 33, 2.1, .7, Sl) + B.rays(30, 33, .5, 1.9, 12, Sl, .35) + `<circle cx="30" cy="33" r=".6" fill="${Sl}"/>`;
        s += P('M18 34.6L18.6 32.8Q19 31.6 20.8 31.8L23.6 31.8L24.6 30.8L25.4 31.4L24.8 32.6L24.2 34.6L23.6 34.6L23.4 33.2L19.8 33.2L19 34.6Z', Sd);
        s += P('M42 34.6L41.4 32.8Q41 31.6 39.2 31.8L36.6 31.8L35.6 31L35 31.6L35.6 32.8L36 34.6L36.6 34.6L36.8 33.2L40.2 33.2L41 34.6Z', Sd);
        /* a side lion, in profile, roaring outward (drawn left, mirrored right) */
        let side = '';
        side += P('M15.6 30.2L16 23.4Q17 20.6 20 20.6L22.6 21L23 30.2Z', S, Sl, .8);
        side += L('M17.6 24.4V30M20.4 24.4V30', Sd, .8) + L('M16.4 30.2V29.2M18.8 30.2V29.2M21.4 30.2V29.2', Sl, .5);
        side += P(tufts(19.8, 16.6, 4.8, 11, 1.5, 1.1), S, Sl, .8);
        side += L(tufts(19.8, 16.6, 2.8, 8, .9, 1.4), Sd, .6);
        side += P('M18.4 12C16.2 11.8 14 12.6 12.6 14.2C12 14.8 12 15.8 12.6 16.2L15.6 16.6L12.8 17.4C12.6 18.6 13.4 19.4 14.6 19.4C16.6 19.4 18.4 18.4 19.2 16.8Z', S, Sl, .8);
        side += P('M12.6 16.2L15.6 16.6L12.8 17.4C12.4 17 12.4 16.6 12.6 16.2Z', M) + P('M13.2 16.3L13.6 17.1L14 16.4Z', '#fff');
        side += `<circle cx="15.6" cy="13.9" r=".65" fill="${M}"/>` + L('M14.6 13Q15.8 12.4 17 13', Sl, .5);
        s += both(side);
        /* the front lion: chest and forelegs, the mane of flame-curls, the roaring face */
        s += P('M24.6 30.2V22H35.4V30.2Z', Sd, Sl, .8);
        s += both(P('M24.4 30.4V21.6Q25.4 20.4 27.8 21.2L28 30.4Z', S, Sl, .8) + L('M25.4 30.2V29.2M26.8 30.2V29.2', Sl, .5));
        s += P(tufts(30, 15.6, 5.8, 14, 1.6, -Math.PI / 2), S, Sl, .9);
        s += L(tufts(30, 15.6, 4.6, 12, .9, -Math.PI / 2 + .2), Sd, .6);
        s += `<ellipse cx="30" cy="16.2" rx="3.7" ry="4.2" fill="${S}" stroke="${Sl}" stroke-width=".7"/>`;
        s += L('M27.6 14.4Q30 13 32.4 14.4', Sl, .6);
        s += `<ellipse cx="28.6" cy="15.3" rx=".7" ry=".5" fill="${M}"/><ellipse cx="31.4" cy="15.3" rx=".7" ry=".5" fill="${M}"/>`;
        s += P('M29 16.8H31L30 17.8Z', M);
        s += `<ellipse cx="30" cy="19.2" rx="1.7" ry="1.1" fill="${M}"/>` + P('M28.8 18.5L29.2 19.4L29.6 18.4ZM31.2 18.5L30.8 19.4L30.4 18.4Z', '#fff');
        s += P('M25.4 11.2Q27.2 9.8 29 10.8Q26.8 11.2 26 12.8Z', Sh, null, 0, 'opacity=".9"');
        return s;
      } },

    /* ── TANG: a sancai horse, three-colour glazed earthenware from a Tang tomb ── */
    tang: { shape: 'roundel', field: '#4E2141', what: 'um cavalo de cerâmica sancai (três cores) dos túmulos Tang',
      draw: u => {
        const A = `url(#${u}am)`, Ad = '#93531E', Al = '#5E300E', Ah = '#F0BC72', Cr = '#F2E6C6', Crl = '#9C8556', Gr = '#3D8C55', Grl = '#1D4A2B';
        let s = `<defs>${lin(u, 'am', [0, 0], [0, 1], [[0, '#E3A55A'], [.55, '#C27630'], [1, '#9A5520']])}</defs>`;
        /* the glazed plinth */
        s += `<path d="M14.4 46.4H46.6V49.6H14.4Z" fill="${Gr}" stroke="${Grl}" stroke-width=".8"/>`
          + `<path d="M17 46.4q1 2.2 2 0M24 46.4q1.2 2.6 2.4 0M33 46.4q1 2.2 2 0M40.6 46.4q1.2 2.6 2.4 0" fill="${Cr}" opacity=".85"/>`;
        /* the legs: far pair a shade darker */
        const fore = 'M17.8 32.6C18.8 36.4 18.6 38.6 18.8 40.4C18.8 42 18.8 43.8 19 45.4H21.6C21.4 43.6 21.2 42 21.4 40.4C21.8 38.4 22.8 36.2 23.4 33.4Z';
        const hind = 'M41.6 32.6C42 36 43 38.4 43.6 40.4C43.6 42.4 43.6 43.8 43.8 45.4H46.4C46.2 43.6 46.2 42.2 46.6 40.6C47.4 38.2 48 35 47.6 31Z';
        s += `<g transform="translate(5 .2)">${P(fore, Ad, Al, .7)}</g><g transform="translate(-4.6 .2)">${P(hind, Ad, Al, .7)}</g>`;
        s += P(fore, A, Al, .7) + P(hind, A, Al, .7);
        s += P('M18.6 45.2H22L22.4 46.6H18.2ZM23.6 45.4H26.8L27.2 46.6H23.2ZM38.8 45.4H42L42.4 46.6H38.4ZM43.4 45.2H46.8L47.2 46.6H43Z', '#3A2210');
        /* the tail, tied in a knot */
        s += P('M47 25C49.8 25.4 51.2 28 50.6 31.4C50.2 33.6 49.2 35.4 48.2 36C48.4 34 48.6 31.4 47.6 29.4Z', Cr, Crl, .7);
        s += L('M48.4 27.6Q50 28.4 49.8 30', Crl, .6);
        /* body, arched neck and the head bowed */
        s += P('M11.4 22.4C12.4 19 14.4 15.6 16.6 13.4C17.6 12.4 18.8 12 19.8 12.2C22.6 11.4 25.6 13 27.6 15.8C29 17.8 30 20.2 31.6 21.6C34.4 23 38 22.4 41 22'
          + 'C44.6 21.6 47.4 23.6 47.8 27.6C48.2 31 47.2 33.4 45.6 34.6C43.4 36.4 41.6 36.6 40.4 36.8C36 38.2 30 38.6 25.6 38C23 37.6 21 36.4 19.6 35'
          + 'C17.6 33 16.6 31 16.8 28.8C17 26.4 18.4 24.4 18.6 22.6C18.8 21.4 18.4 20.6 17.4 20.8C16.2 21.4 15.4 23.2 14.2 24.6C13.2 25.6 11.6 25.4 11.2 24.2C11 23.6 11 23 11.4 22.4Z', A, Al, .9);
        /* glaze highlights on shoulder and rump */
        s += P('M19.4 27.6C19.6 25 21.4 23.4 22.8 23.6C21.6 25.4 21 27.6 21 30.4Z', Ah, null, 0, 'opacity=".75"');
        s += P('M42 24.2C44.6 24 46.2 25.6 46.4 28C45.2 26.6 43.8 25.4 42 24.2Z', Ah, null, 0, 'opacity=".75"');
        s += L('M23.6 33.6Q22.4 31 23.2 27.6M41.8 33.4Q44 31.6 44.6 28.4', Ad, .7);
        /* ear, eye, nostril */
        s += P('M18.8 12.8L19.2 8.6L21 12.4Z', A, Al, .7);
        s += `<circle cx="16.4" cy="16" r=".75" fill="#2E1A0A"/><circle cx="12.6" cy="21.8" r=".5" fill="#2E1A0A"/>`;
        /* the mane, clipped into three tufts, and the forelock */
        s += P('M19.4 12.6C20.6 10.2 22.4 10.6 22.8 11.6C23.8 10.4 25.6 11 25.8 12.6C27 11.8 28.6 13 28.4 14.8C29.6 16.6 30.6 18.8 32 20.8L30.4 21.6C28.6 19.4 27.4 17 25.8 15.4C24 13.6 21.8 12.8 19.4 12.6Z', Cr, Crl, .6);
        s += P('M18 12.6C17 11.6 16.8 10.6 17.4 9.8C17.8 10.8 18.6 11.4 19.4 11.8Z', Cr, Crl, .5);
        /* bridle */
        s += L('M18.8 13.4L14.4 23.4M12.2 20.6Q14 22.4 16.2 21.4', Al, .7);
        /* saddle-cloth, cream splashed with green, and the green saddle */
        s += P('M28.6 22.6C32.2 23.6 37.6 23.6 41.4 22.4L42 31.4C37.6 33.2 32 33.2 28.8 31.6Z', Gr, Grl, .7);
        /* the glaze runs: cream and amber drips down the green */
        s += `<g fill="${Cr}"><path d="M29.8 23.2h1.5v5.4q-.75 1.8-1.5 0z"/><path d="M33.4 23.6h1.5v7q-.75 1.8-1.5 0z"/><path d="M37 23.4h1.5v4.6q-.75 1.8-1.5 0z"/><path d="M40 22.8h1.2v6.4q-.6 1.6-1.2 0z"/></g>`
          + `<g fill="${Ah}"><path d="M31.7 23.4h1.1v3.4q-.55 1.4-1.1 0z"/><path d="M35.3 23.6h1.1v5.2q-.55 1.4-1.1 0z"/><path d="M38.7 23.2h.9v2.6q-.45 1.2-.9 0z"/></g>`;
        s += L('M29 31.8Q30 33.4 31 31.9Q32 33.6 33 32.2Q34.2 33.8 35.2 32.2Q36.4 33.6 37.4 32Q38.6 33.2 39.6 31.6Q40.8 32.8 41.8 31.2', Cr, .9);
        s += P('M29.6 22.8C29.6 20.6 30.2 19.2 31.4 19C32 20.8 33.4 21.6 34.8 21.6C36.4 21.6 37.6 20.6 38.4 19C39.6 19.4 40.2 20.8 40 22.8Z', Gr, Grl, .7);
        /* breast strap and crupper, hung with apricot-leaf pendants */
        s += L('M29.6 24.6C25.4 26.4 20.6 28.4 17.4 29.6M41.4 23.6C44 24.2 46.6 26.2 47.6 29.6', Al, 1);
        s += `<g fill="${Gr}" stroke="${Grl}" stroke-width=".4"><path d="M19.6 29.2q-1.2 2.2.4 3.2q1.4-1.2-.4-3.2z"/><path d="M23 27.8q-1.2 2.2.4 3.2q1.4-1.2-.4-3.2z"/><path d="M26.4 26.4q-1.2 2.2.4 3.2q1.4-1.2-.4-3.2z"/><path d="M45.4 25.6q-1.2 2.2.4 3.2q1.4-1.2-.4-3.2z"/></g>`;
        return s;
      } },

    /* ── MONGOL EMPIRE: the black sülde of Chinggis Khan, under the Eternal Blue Sky ── */
    imperio_mongol: { shape: 'roundel', field: '#3B79C0', what: 'o sülde negro de Gengis Cã: o tridente e a crina de cavalo, sob o Céu Azul',
      draw: u => {
        const G = `url(#${u}gd)`, Gl = '#7A5418', Gh = BK.goldHi;
        let s = `<defs>${lin(u, 'sk', [0, 0], [0, 1], [[0, '#1F5296'], [.65, '#3D80C6'], [1, '#8CBDE6']])}${lin(u, 'gd', [0, 0], [1, 0], [[0, '#F2D27A'], [.5, '#D6A93F'], [1, '#A87A26']])}</defs>`
          + `<rect x="0" y="0" width="60" height="60" fill="url(#${u}sk)"/>`;
        s += `<rect x="28.8" y="40" width="2.4" height="20" fill="#6B4423" stroke="#3A230F" stroke-width=".7"/>`;
        /* the horsehair: long black hair falling from the disc, ragged at the ends */
        const hair = 'M30.3 21.6H36.4C38.6 24 40.4 28.4 41 33.4C41.4 37 41.8 40.4 43 44.6Q41.2 43.4 40.4 46Q39.4 43.6 37.8 47Q37 44 35.4 47.8Q34.4 44.4 32.8 48Q31.8 44.8 30.3 47.6Z';
        s += both(P(hair, '#1C1916', '#0B0A09', .6));
        s += both(L('M32 24Q33 34 32.6 44.6M34 23.6Q35.6 32.6 36.2 44.4M35.6 23.2Q38.2 31 39.6 42.6', '#4C4741', .7));
        s += L('M25 24.6Q23.4 31 22.6 38', '#77716A', .9, 'opacity=".8"');
        /* the disc and the socket */
        s += `<ellipse cx="30" cy="21.6" rx="6.6" ry="1.9" fill="${G}" stroke="${Gl}" stroke-width=".8"/>`;
        s += `<path d="M28.4 20.4L28.8 17.4H31.2L31.6 20.4Z" fill="${G}" stroke="${Gl}" stroke-width=".7"/>`;
        /* the trident: a leaf-shaped spear blade between two upright prongs */
        s += both(P('M30.3 18C26.6 18 23.2 16.6 22.4 13C22 11 22.4 9 23.6 7.2C24.4 9 24.6 11 24.4 12.6C25 14.4 27 15.2 30.3 15.4Z', G, Gl, .8));
        s += P('M30 3C32.6 6.4 33.4 10 32.1 13.4L31.2 17.4H28.8L27.9 13.4C26.6 10 27.4 6.4 30 3Z', G, Gl, .8);
        s += L('M30 5.6V15.4', Gh, .8);
        return s;
      } },

    /* ── MING: blue-and-white porcelain, a meiping vase with a cobalt dragon ── */
    ming: { shape: 'roundel', field: '#1B2C5E', what: 'um vaso meiping de porcelana azul e branca, com dragão de cobalto',
      draw: u => {
        const W = '#F6F5F0', Co = '#2148A0', Col = '#132B66';
        const vase = 'M30 8.4H33.2V10.6H32.4V12.6C36 12.8 42.4 15.2 43.2 21.6C44 28 40.6 38 38.2 45.2C37.6 47.4 37.6 48.8 38 50.2V51.8H22V50.2C22.4 48.8 22.4 47.4 21.8 45.2C19.4 38 16 28 16.8 21.6C17.6 15.2 24 12.8 27.6 12.6V10.6H26.8V8.4Z';
        let s = `<defs>${lin(u, 'pv', [0, 0], [1, 0], [[0, '#FFFFFF'], [.35, W], [1, '#B9C2D6']])}<clipPath id="${u}vc"><path d="${vase}"/></clipPath></defs>`;
        s += P(vase, `url(#${u}pv)`);
        let dec = '';
        /* ruyi lappets hanging round the shoulder */
        let lap = '', lapi = '';
        [-2, -1, 0, 1, 2].forEach(k => {
          const x = 30 + k * 6.6, y = 12.4 + Math.abs(k) * 1.5, l = 7.4 - Math.abs(k) * .6;
          lap += `M${F(x - 3.3)} ${y}C${F(x - 3.3)} ${F(y + l * .55)} ${F(x - .7)} ${F(y + l * .62)} ${F(x)} ${F(y + l)}C${F(x + .7)} ${F(y + l * .62)} ${F(x + 3.3)} ${F(y + l * .55)} ${F(x + 3.3)} ${y}Z`;
          lapi += `M${F(x - 1.7)} ${F(y + 1.4)}C${F(x - 1.7)} ${F(y + l * .5)} ${F(x - .4)} ${F(y + l * .52)} ${F(x)} ${F(y + l * .78)}C${F(x + .4)} ${F(y + l * .52)} ${F(x + 1.7)} ${F(y + l * .5)} ${F(x + 1.7)} ${F(y + 1.4)}`;
        });
        dec += P(lap, Co, Col, .5) + L(lapi, W, .6);
        dec += L('M15 23.4H45', Co, 1);
        /* the main band: a dragon among ruyi clouds, outlined in dark cobalt and washed in a lighter blue */
        const Wa = '#5A7FCC';
        const cloud = (x, y) => `<g fill="${Wa}" stroke="${Col}" stroke-width=".5"><circle cx="${x - 1.3}" cy="${y}" r="1.1"/><circle cx="${x + 1.3}" cy="${y}" r="1.1"/><circle cx="${x}" cy="${y - .8}" r="1.3"/></g>`
          + L(`M${x + 2.2} ${y + .4}q1.6 .6 2.8 -.2`, Col, .6);
        let dg = cloud(27.6, 38.4) + cloud(33.6, 26.4) + cloud(19.6, 37);
        const D = tube([[22.4, 30.6, 3.2], [25.4, 27.6, 3.6], [29.4, 29.6, 3.6], [32.8, 33.8, 3.4], [36.8, 32.6, 3], [39.4, 28.8, 2.2], [41.8, 27, .9]], 8);
        const limb = (pts, f) => P(tube(pts, 4).d, Wa, Col, .5) + L(f, Col, .7);
        dg += limb([[24, 31.4, 1.5], [22.8, 34.2, 1.2], [22, 35.6, 1]], 'M22 35.6l-1.2 .4M22 35.6l-.4 1.2M22 35.6l.8 .9');
        dg += limb([[37.4, 34, 1.4], [38.4, 36.6, 1.1], [38.6, 37.8, .9]], 'M38.6 37.8l-.8 .9M38.6 37.8l.3 1.2M38.6 37.8l1.1 .4');
        let fin = '';
        for (let i = 6; i < D.sp.length - 10; i += 4) {
          const a = D.lft[i], b = D.lft[i + 2], o = D.nrm[i + 1], t = D.tan[i + 1];
          fin += `M${pt(a)}L${pt([b[0] + o[0] * 1.1 + t[0] * .6, b[1] + o[1] * 1.1 + t[1] * .6])}L${pt(b)}Z`;
        }
        dg += P(fin, Col);
        dg += P(D.d, Wa, Col, .6);
        let sc = '';
        for (let i = 3; i < D.sp.length - 8; i += 2) {
          const p = D.sp[i], o = D.nrm[i], t = D.tan[i];
          sc += `M${pt([p[0] + o[0] * .8, p[1] + o[1] * .8])}Q${pt([p[0] + t[0] * .9, p[1] + t[1] * .9])} ${pt([p[0] - o[0] * .8, p[1] - o[1] * .8])}`;
        }
        dg += L(sc, Col, .45);
        dg += limb([[26.6, 26.6, 1.4], [27.2, 24.4, 1.1], [26.6, 23.6, .9]], 'M26.6 23.6l-1.2 -.2M26.6 23.6l-.2 -1.1M26.6 23.6l.9 -.6');
        dg += limb([[39, 30.6, 1.3], [41, 31.4, 1], [42, 32.6, .8]], 'M42 32.6l1.1 -.2M42 32.6l.4 1.1M42 32.6l-.6 .9');
        /* the head, jaws open, horns and mane streaming back */
        dg += L('M22.2 28.2C23 26.6 24.2 25.8 25.4 25.6M23.4 28.8C24.8 28.2 25.8 27.4 26.4 26.4', Col, .7);
        dg += P('M23.8 28.6C22.4 27.4 20.4 27.4 19 28.2C18.2 28.6 17.4 28.6 16.6 28.4C15.8 28.4 15.4 29.4 16 29.8L18.8 30.4L16.2 31.4C15.8 32.2 16.4 32.8 17.2 32.6C19.4 32.4 21.6 32.4 23.6 31.8Z', Wa, Col, .6);
        dg += `<circle cx="20.4" cy="29.2" r=".6" fill="${W}" stroke="${Col}" stroke-width=".3"/>` + L('M16.4 28.6C15 27.4 15.2 26 16.2 25.4', Col, .45);
        dec += `<g transform="translate(1.4 0)">${dg}</g>`;
        /* lotus panels round the foot */
        dec += L('M17 41.2H43', Co, 1);
        let pan = '';
        for (let i = 0; i < 5; i++) { const x = 23 + i * 3.5; pan += `M${x - 1.4} 50V44.6Q${x} 42.4 ${x + 1.4} 44.6V50Z`; }
        dec += P(pan, 'none', Co, .8);
        dec += L('M18 50.6H42', Col, 1);
        s += L('M19.8 22.4Q19.4 30 22 38', '#fff', 1.4, 'opacity=".8"');
        s += `<g clip-path="url(#${u}vc)">${dec}</g>`;
        s += P(vase, 'none', '#7D8AA8', .9);
        return s;
      } },

    /* ── QING: the Yellow Dragon Flag (1889): an azure dragon on imperial yellow, after the red pearl ── */
    qing: { shape: 'banner', field: '#ECC232', what: 'a Bandeira do Dragão Amarelo: dragão azul perseguindo a pérola vermelha',
      draw: u => {
        let s = '';
        /* the flaming pearl, top of the hoist */
        s += B.wedges(9.8, 20, 2.4, 5.8, 9, '#E2652A', .24, -Math.PI / 2);
        s += `<circle cx="9.8" cy="20" r="3.1" fill="#C8211E" stroke="#7E1210" stroke-width=".7"/>`;
        s += L('M8.3 19.4Q9.2 17.7 10.8 18.6', '#F9B2A0', .8);
        const c = { body: '#2D63B8', line: '#13336E', fin: '#1C4A94', belly: '#C9DCF2', scale: '#6C9BDD', claw: '#F4E8BE', horn: '#8DB3E8', mane: '#4F86D4',
          mouth: '#5E0E0E', eye: '#0D1F45', glint: '#F6D36A', whisker: '#13336E' };
        /* body, legs and tail, drawn a little smaller so the tail stays on the cloth */
        s += `<g transform="translate(1.8 2.2) scale(.92)">${dragon(c)}</g>`;
        /* the head, raised toward the pearl */
        s += `<g transform="translate(23 33.4) rotate(18) scale(.84)">${dragonHead(c)}</g>`;
        return s;
      } },

    /* ── KHMER: Angkor Wat, its five lotus-bud towers against the dawn ── */
    khmer: { shape: 'stele', field: '#D9822B', what: 'as cinco torres de Angkor Wat ao amanhecer, refletidas no fosso',
      draw: u => {
        const T = '#3A2629', Tl = '#5E423D';
        let s = `<defs>${lin(u, 'dw', [0, 0], [0, 1], [[0, '#5B2B5C'], [.3, '#B8423C'], [.55, '#EC8A3A'], [.72, '#F8C766']])}`
          + `${lin(u, 'wt', [0, 0], [0, 1], [[0, '#E39A4A'], [1, '#6E2E44']])}`
          + `${rad(u, 'sn', '50%', '50%', '50%', [[0, '#FFF1C0', .95], [.4, '#FFD68A', .6], [1, '#FFD68A', 0]])}</defs>`
          + `<rect x="0" y="0" width="60" height="42" fill="url(#${u}dw)"/><rect x="0" y="41.4" width="60" height="20" fill="url(#${u}wt)"/>`;
        s += `<circle cx="30" cy="30" r="12" fill="url(#${u}sn)"/>`;
        /* a prasat: a lotus-bud tower of stacked tiers */
        const tower = (cx, by, ty, hw) => {
          const h = by - ty;
          return `M${F(cx - hw)} ${by}V${F(by - h * .2)}C${F(cx - hw * 1.2)} ${F(by - h * .55)} ${F(cx - hw * .62)} ${F(by - h * .92)} ${cx} ${ty}`
            + `C${F(cx + hw * .62)} ${F(by - h * .92)} ${F(cx + hw * 1.2)} ${F(by - h * .55)} ${F(cx + hw)} ${F(by - h * .2)}V${by}Z`;
        };
        const tiers = (cx, by, ty, hw) => {
          const h = by - ty;
          let d = '';
          [[.4, 1.04], [.6, .86]].forEach(([k, w]) => { d += `M${F(cx - hw * w)} ${F(by - h * k)}H${F(cx + hw * w)}`; });
          return d;
        };
        const T5 = [[20, 39.8, 22.6, 2.1], [40, 39.8, 22.6, 2.1], [24.8, 38, 17.4, 2.4], [35.2, 38, 17.4, 2.4], [30, 36, 10.6, 3.1]];
        const base = 'M15 41.6V39.6H17.6V37.8H22.2V35.8H37.8V37.8H42.4V39.6H45V41.6Z';
        const sil = T5.map(t => tower(...t)).join('') + base;
        const lines = T5.map(t => tiers(...t)).join('') + 'M17.6 39.6H42.4M22.2 37.8H37.8M30 10.6V8.8';
        s += `<g transform="matrix(1 0 0 -.55 0 64.6)" opacity=".4">${P(sil, T)}</g>`;
        s += P(sil, T) + L(lines, Tl, .6);
        s += L('M18 44.6H26M34 46.6H42M21 49.4H39M25 52.4H35', '#FFD68A', .8, 'opacity=".5"');
        return s;
      } },

    /* ── TOKUGAWA: mitsuba-aoi, the three hollyhock leaves in a ring ── */
    tokugawa: { shape: 'mon', field: '#D9AE48', what: 'o mitsuba-aoi: as três folhas de aoi num círculo, o mon dos Tokugawa',
      draw: u => {
        const K = '#1C1814', Gd = '#D9AE48';
        /* a heart-shaped leaf, tip outward, its cleft (and stem) toward the centre */
        const leaf = 'M0 -5.8C1.4 -3.8 3.4 -3.4 4.8 -3.8C7.6 -4.6 10.2 -7 11.4 -10.2C12.6 -13.6 12 -17.2 9.8 -19.8C7.4 -22.4 3.6 -23.4 0 -24.2'
          + 'C-3.6 -23.4 -7.4 -22.4 -9.8 -19.8C-12 -17.2 -12.6 -13.6 -11.4 -10.2C-10.2 -7 -7.6 -4.6 -4.8 -3.8C-3.4 -3.4 -1.4 -3.8 0 -5.8Z';
        const v = [[[0, -7.4], [3.4, -7.8], [6.4, -4.2]], [[0, -9.4], [5.4, -10.4], [10.8, -8]], [[0, -12], [6.6, -13.6], [12.4, -12.8]],
          [[0, -14.8], [6.4, -16.6], [11.2, -17.6]], [[0, -17.8], [5, -19.6], [8.2, -21.6]], [[0, -20.6], [2.6, -21.8], [4.2, -23.4]]];
        let veins = 'M0 -6.6V-22.6';
        v.forEach(([a, c, b]) => { veins += `M${pt(a)}Q${pt(c)} ${pt(b)}M${pt([-a[0], a[1]])}Q${pt([-c[0], c[1]])} ${pt([-b[0], b[1]])}`; });
        let s = B.ring(30, 30, 25.9, 2.8, K);
        [0, 120, 240].forEach(a => { s += `<g transform="translate(30 30) rotate(${a})">${P(leaf, K)}${L(veins, Gd, .85)}</g>`; });
        /* the three stems, curling together at the centre */
        [0, 120, 240].forEach(a => { s += `<g transform="translate(30 30) rotate(${a})">${L('M0 -6.4C.4 -3.6 -.6 -1.6 -2.6 -.6', Gd, 2.6)}${L('M0 -6.4C.4 -3.6 -.6 -1.6 -2.6 -.6', K, 1.1)}</g>`; });
        return s;
      } },

    /* ── MUGHAL: the Taj Mahal in white marble, inlaid like a pietra-dura panel (parchin kari) in Mughal green ── */
    mogol: { shape: 'tablet', field: '#185A39', rim: '#8F879E', what: 'o Taj Mahal em mármore branco, num painel embutido (pietra dura): a cúpula, o grande iwan e os minaretes',
      draw: u => {
        const W = '#F7F4EE', Ws = '#D9D4DE', Wl = '#857E92', Ar = '#A39DB2', Ad = '#5E5772', G = BK.gold, Gl = BK.goldLo, In = '#C9C3D2';
        let s = `<defs>${lin(u, 'dm', [0, 0], [1, 0], [[0, '#FFFFFF'], [.42, W], [1, '#C4BDCF']])}${lin(u, 'mn', [0, 0], [1, 0], [[0, '#FFFFFF'], [.5, W], [1, '#CFC9D8']])}</defs>`;
        /* the inlaid marble border, a gold boss at each corner */
        s += `<rect x="11.4" y="11.4" width="37.2" height="37.2" rx="3.8" fill="none" stroke="${In}" stroke-width=".9"/>`;
        s += [[12.5, 12.5], [47.5, 12.5], [12.5, 47.5], [47.5, 47.5]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.05" fill="${G}" stroke="${Gl}" stroke-width=".4"/>`).join('');
        /* the long pool of the charbagh, running down to the foot of the panel */
        s += P('M28.4 45.6H31.6L32.6 51H27.4Z', '#5FA3A0', '#2D6461', .6) + L('M29.2 46.6L28.8 50.4', '#A9DCD6', .7);
        /* minarets on the corners of the platform: tapering, three galleries, a chhatri on top */
        const mx = 15.2;
        const minaret = P(`M${mx - 1.55} 43.6L${mx - 1.1} 24.8H${mx + 1.1}L${mx + 1.55} 43.6Z`, `url(#${u}mn)`, Wl, .7)
          + L(`M${mx - 2.1} 25H${mx + 2.1}M${mx - 2.2} 31.4H${mx + 2.2}M${mx - 2.3} 37.8H${mx + 2.3}`, Wl, 1.1)
          + P(`M${mx - 1.9} 24.8Q${mx - 1.9} 22.2 ${mx} 21.2Q${mx + 1.9} 22.2 ${mx + 1.9} 24.8Z`, W, Wl, .6) + L(`M${mx} 21.2V19.8`, Gl, .7);
        s += both(minaret);
        /* the platform */
        s += P('M13.8 43.2H46.2V45.9H13.8Z', W, Wl, .7) + L('M14.4 44.6H45.6', Ws, .6);
        /* dome on its drum, the gilt finial */
        s += L('M30 12.6V15.2', Gl, 1.2) + L('M30 12.6V15.2', G, .6) + `<circle cx="30" cy="13.8" r=".85" fill="${G}" stroke="${Gl}" stroke-width=".4"/>`;
        s += P('M24.6 26.4V24.6H35.4V26.4Z', Ws, Wl, .6);
        s += P('M30 14.8C31 16.8 34.6 17.5 36.6 19.6C38.6 21.8 38 24.4 35.6 25.6H24.4C22 24.4 21.4 21.8 23.4 19.6C25.4 17.5 29 16.8 30 14.8Z', `url(#${u}dm)`, Wl, .8);
        s += L('M27.8 17.6Q30 18.6 32.2 17.6', Ws, .7) + L('M25 20.4Q24.2 22.2 25 24', '#fff', .9, 'opacity=".9"');
        /* chhatris on the corners of the roof */
        s += both(P('M20.2 30.4V27.2H23.4V30.4Z', W, Wl, .6) + P('M19.8 27.4Q19.8 24.4 21.8 23.4Q23.8 24.4 23.8 27.4Z', W, Wl, .6) + L('M21.8 23.4V22.4', Gl, .6));
        /* the main block, its pishtaq and the great iwan */
        s += P('M19.2 43.2V30H40.8V43.2Z', W, Wl, .8);
        s += P('M24.4 43.2V27.6H35.6V43.2Z', W, Wl, .8);
        s += P('M26 43.2V35.6C26 32.8 28.2 31.2 30 30C31.8 31.2 34 32.8 34 35.6V43.2Z', Ws, Wl, .6);
        s += P('M27.5 43.2V38C27.5 36.2 28.8 35.2 30 34.4C31.2 35.2 32.5 36.2 32.5 38V43.2Z', Ad);
        s += both(P('M20.4 36.6V33.6C20.4 32.4 21.1 31.6 21.9 31.1C22.7 31.6 23.4 32.4 23.4 33.6V36.6Z', Ar) + P('M20.4 42.6V39.8C20.4 38.6 21.1 37.8 21.9 37.3C22.7 37.8 23.4 38.6 23.4 39.8V42.6Z', Ar));
        return s;
      } },

    /* ── SAFAVID: the Lion and Sun, gold on the green of the Safavid standard ── */
    safavida: { shape: 'roundel', field: '#2C7A45', what: 'o Leão e o Sol (Shir-o-Khorshid), em ouro sobre o verde safávida',
      draw: u => BEAST.lionSun(8.4, 11, 43.2, 39.8, { accent: '#8C5A1E', tongue: BK.red }) },

    /* ── EMPIRE OF JAPAN: the Imperial Seal, the sixteen-petalled double chrysanthemum (jūroku-yae-giku) ── */
    imperio_japones: { shape: 'mon', field: '#B8202E', rim: '#7A1019', what: 'o Selo Imperial: o crisântemo dourado de dezesseis pétalas, em fileira dupla',
      draw: u => {
        /* one petal pointing up from (0,0): two radial sides at ±th, closed by a round cap tangent to both */
        const petal = (r0, rc, th) => {
          const s = Math.sin(th), c = Math.cos(th), w = rc * s;
          const a = [rc * c * s, -rc * c * c], i0 = [r0 * s, -r0 * c];
          return `M${pt([-i0[0], i0[1]])}L${pt([-a[0], a[1]])}A${F(w)} ${F(w)} 0 1 1 ${pt(a)}L${pt(i0)}Z`;
        };
        const back = petal(4, 21.8, Math.PI / 16 * .9), front = petal(4, 19.9, Math.PI / 16 * .94);
        const ring = (d, rot0) => Array.from({ length: 16 }, (_, i) => `<path d="${d}" transform="rotate(${F(rot0 + i * 22.5)})"/>`).join('');
        let s = `<defs>${lin(u, 'kf', [0, 0], [.7, 1], [[0, '#F8DE8C'], [.45, '#E2B547'], [1, '#B98425']])}`
          + `${rad(u, 'kd', '40%', '35%', '70%', [[0, '#FBE7A6'], [.6, '#E0B248'], [1, '#B07A22']])}</defs>`;
        s += `<g transform="translate(30 30)">`
          /* the back row shows its tips between the front petals */
          + `<g fill="#A97B2C" stroke="#5A3A0E" stroke-width=".7" stroke-linejoin="round">${ring(back, 11.25)}</g>`
          + `<g fill="url(#${u}kf)" stroke="#6E4A12" stroke-width=".75" stroke-linejoin="round">${ring(front, 0)}</g>`
          + `<circle r="5.2" fill="url(#${u}kd)" stroke="#6E4A12" stroke-width=".8"/>`
          + `<circle r="3.9" fill="none" stroke="#FFF0B8" stroke-opacity=".45" stroke-width=".6"/>`
          + `</g>`;
        return s;
      } },

    /* ── PEOPLE'S REPUBLIC OF CHINA: the five gold stars on red ── */
    china_popular: { shape: 'banner', field: '#C8201F', what: 'as cinco estrelas douradas sobre o vermelho',
      draw: u => {
        const Y = '#F6CB2B', k = 1.7, ox = 6, oy = 14;
        const bx = ox + 5 * k, by = oy + 5 * k;
        let s = B.star(F(bx), F(by), 3 * k, 5, Y);
        [[10, 2], [12, 4], [12, 7], [10, 9]].forEach(([x, y]) => {
          const sx = ox + x * k, sy = oy + y * k;
          s += B.star(F(sx), F(sy), k, 5, Y, k * .42, Math.atan2(by - sy, bx - sx));
        });
        return s;
      } },

    /* ── INDIA: saffron, white and green, the Ashoka Chakra in navy ── */
    india: { shape: 'banner', field: '#F6F3EA', what: 'o tricolor açafrão, branco e verde, com a Ashoka Chakra',
      draw: u => `<path d="M5 15Q17.5 12.6 30 15T55 15V25Q42.5 25.8 30 25T5 25Z" fill="#E8862C"/>`
        + `<path d="M5 35Q17.5 35.8 30 35T55 35V45Q42.5 42.6 30 45T5 45Z" fill="#1E7C3A"/>`
        + chakra(30, 30, 4.4, '#1B2F7E', .8) },
  });
})();
