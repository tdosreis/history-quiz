/* ═══════════════════════════════════════════════════
   AMÉRICAS E BRASIL — the peoples and states of the Americas, each with
   its own sign: the temple-pyramid of Tikal on a Maya stele, the eagle
   on the nopal of Tenochtitlan on a turquoise chimalli, Inti in a
   tocapu frame, the armillary sphere and the Cross of the Order of
   Christ of the Portuguese voyages, the caravel's sail of colonial
   Brazil, the arms of the Empire of Brazil, and the flags of the
   American republics (the United States, Haiti, Gran Colombia, Brazil,
   Cuba), their designs laid on the waving banner's cloth.
═══════════════════════════════════════════════════ */
(() => {
  const f = n => +n.toFixed(2);
  const pt = p => f(p[0]) + ' ' + f(p[1]);
  /* a filled path with an outline */
  const fp = (d, fill, stroke, w, extra) => `<path d="${d}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${w || .8}" stroke-linejoin="round"` : ''} ${extra || ''}/>`;
  /* a stroked line */
  const ln = (d, stroke, w, extra) => `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra || ''}/>`;
  /* a line with a darker outline, so it reads as a solid bar */
  const bar = (d, col, lo, w, extra) => ln(d, lo, w + .9, extra) + ln(d, col, w, extra);
  const mirX = (s, cx) => `<g transform="matrix(-1 0 0 1 ${2 * (cx === undefined ? 30 : cx)} 0)">${s}</g>`;
  const both = s => s + mirX(s);
  const at = (x, y, s, inner, rot) => `<g transform="translate(${f(x)} ${f(y)})${rot ? ` rotate(${rot})` : ''}${s !== 1 ? ` scale(${s})` : ''}">${inner}</g>`;
  const circ = (x, y, r, fill, stroke, w, extra) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${w || .6}"` : ''} ${extra || ''}/>`;

  /* ── the banner's cloth ──
     The banner's top edge dips by w(x) and its foot rises by the same w(x): the left half is
     nearer (taller), the right half further. A point (x, v) of the flat flag, x 5–55 and v 15–45,
     lies on the cloth at y = 30 + (v − 30)(1 − w(x)/15). */
  const wave = x => { const t = (x <= 30 ? x - 5 : x - 30) / 25; return (x <= 30 ? -4.8 : 4.8) * t * (1 - t); };
  const W = (x, v) => [x, 30 + (v - 30) * (1 - wave(x) / 15)];
  /* a polygon of the flat flag, its edges cut fine and laid on the cloth */
  const wpoly = (P, step) => {
    step = step || 1.2;
    const out = [];
    P.forEach((p, i) => {
      const q = P[(i + 1) % P.length], n = Math.max(1, Math.ceil(Math.hypot(q[0] - p[0], q[1] - p[1]) / step));
      for (let k = 0; k < n; k++) out.push(W(p[0] + (q[0] - p[0]) * k / n, p[1] + (q[1] - p[1]) * k / n));
    });
    return 'M' + out.map(pt).join('L') + 'Z';
  };
  /* a horizontal band of the flat flag, v1 to v2, overrunning the hoist and the fly */
  const wband = (v1, v2, x1, x2) => wpoly([[x1 === undefined ? 3 : x1, v1], [x2 === undefined ? 57 : x2, v1], [x2 === undefined ? 57 : x2, v2], [x1 === undefined ? 3 : x1, v2]]);
  const ngon = (cx, cy, r, n, rot) => Array.from({ length: n }, (_, i) => [cx + r * Math.cos((rot || 0) + i * 2 * Math.PI / n), cy + r * Math.sin((rot || 0) + i * 2 * Math.PI / n)]);
  const starPts = (cx, cy, r, ri, rot) => Array.from({ length: 10 }, (_, i) => {
    const a = (rot === undefined ? -Math.PI / 2 : rot) + i * Math.PI / 5, rr = i % 2 ? (ri || r * .382) : r;
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
  });
  /* the fold of the cloth: the near half catches the light, the far half falls into shade */
  const fold = u => `<defs><linearGradient id="${u}fo" x1="0" x2="60" y1="0" y2="0" gradientUnits="userSpaceOnUse">`
    + `<stop offset=".05" stop-color="#000" stop-opacity=".07"/><stop offset=".3" stop-color="#fff" stop-opacity=".16"/>`
    + `<stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset=".72" stop-color="#000" stop-opacity=".13"/>`
    + `<stop offset=".95" stop-color="#000" stop-opacity=".02"/></linearGradient></defs><path d="M0 0H60V60H0Z" fill="url(#${u}fo)"/>`;

  /* ── the Cross of the Order of Christ: a red cross formy, its arms flaring on curved
     sides to straight ends, a slim white cross within. Centre (cx, cy), arm R. ── */
  const crossChrist = (cx, cy, R, o) => {
    o = o || {};
    const a = R * .2, b = R * .52;
    const rot = (p, k) => { let [x, y] = p; for (let i = 0; i < k; i++) [x, y] = [y, -x]; return [cx + x, cy + y]; };
    let d = '';
    for (let k = 0; k < 4; k++) {
      const P = p => pt(rot(p, k));
      d += (k ? 'L' : 'M') + P([a, -a]) + 'Q' + P([a * 1.1, -R * .66]) + ' ' + P([b, -R])
        + 'Q' + P([0, -R * .955]) + ' ' + P([-b, -R]) + 'Q' + P([-a * 1.1, -R * .66]) + ' ' + P([-a, -a]);
    }
    d += 'Z';
    const red = o.red || '#B51F2A', lo = o.lo || '#6A1016', wh = o.white || '#F7F3EA';
    const t = R * .075, L = R * .8;
    const inner = `M${f(cx - t)} ${f(cy - L)}H${f(cx + t)}V${f(cy - t)}H${f(cx + L)}V${f(cy + t)}H${f(cx + t)}V${f(cy + L)}H${f(cx - t)}V${f(cy + t)}H${f(cx - L)}V${f(cy - t)}H${f(cx - t)}Z`;
    return (o.fim ? fp(d, 'none', o.fim, o.fimW || 2.4) : '')
      + fp(d, red, lo, o.lw || .9)
      + fp(inner, wh, o.whLo || null, o.whLo ? .4 : 0);
  };

  /* ── the armillary sphere of King Manuel, gold: the meridian ring, the equator and the
     tropics, the broad zodiac band, the axis. Centre (cx, cy), radius r. The far halves of
     the rings are drawn first and darker, the near halves over them. ── */
  const sphere = (cx, cy, r, o) => {
    o = o || {};
    const G = o.gold || BK.gold, L = o.lo || '#7A5418', H = o.hi || BK.goldHi, w = o.w || Math.max(1, r * .1);
    const tilt = -24, k = .3;
    let back = '', front = '';
    /* a horizontal small circle at height y (relative): far half up, near half down */
    const ring = (y, wd) => {
      const rx = r * Math.sqrt(1 - (y / r) * (y / r)), ry = rx * k, x1 = cx - rx, x2 = cx + rx, yy = cy + y;
      back += ln(`M${f(x1)} ${f(yy)}A${f(rx)} ${f(ry)} 0 0 1 ${f(x2)} ${f(yy)}`, L, wd * .75);
      front += bar(`M${f(x1)} ${f(yy)}A${f(rx)} ${f(ry)} 0 0 0 ${f(x2)} ${f(yy)}`, G, L, wd);
    };
    ring(-r * .44, w * .75); ring(r * .44, w * .75);
    ring(0, w);
    /* the zodiac band: a great circle tilted across */
    const c = Math.cos(tilt * Math.PI / 180), s = Math.sin(tilt * Math.PI / 180);
    const e1 = [cx - r * c, cy - r * s], e2 = [cx + r * c, cy + r * s];
    back += ln(`M${pt(e1)}A${f(r)} ${f(r * .34)} ${tilt} 0 1 ${pt(e2)}`, L, w * 1.2);
    const zod = `M${pt(e1)}A${f(r)} ${f(r * .34)} ${tilt} 0 0 ${pt(e2)}`;
    front += ln(zod, L, w * 1.9 + .9) + ln(zod, G, w * 1.9)
      + ln(zod, L, w * 1.2, `stroke-dasharray="${f(w * .45)} ${f(w * 1.1)}" stroke-linecap="butt" opacity=".4"`);
    /* the axis, and its knobs at the poles */
    const axis = bar(`M${f(cx)} ${f(cy - r - w * 1.6)}V${f(cy + r + w * 1.6)}`, G, L, w * .7)
      + circ(cx, cy - r - w * 1.8, w * .75, G, L, .5) + circ(cx, cy + r + w * 1.8, w * .75, G, L, .5);
    /* the meridian: the great outer ring, with a glint on its upper left */
    const mer = B.ring(cx, cy, r, w * 1.25 + .9, L) + B.ring(cx, cy, r, w * 1.25, G)
      + ln(`M${f(cx - r * .94)} ${f(cy - r * .34)}A${f(r)} ${f(r)} 0 0 1 ${f(cx - r * .34)} ${f(cy - r * .94)}`, H, w * .45, 'opacity=".9"');
    return back + axis + mer + front + (o.globe ? circ(cx, cy, r * .2, G, L, .6) : '');
  };

  Object.assign(BRASAO, {
    /* ── MAYA: Temple I of Tikal, the Temple of the Great Jaguar: nine terraces, the
       stair, the temple and its tall roof comb, rising out of the forest canopy ── */
    maia: { shape: 'stele', field: '#D9A441', rim: '#6B4A22', what: 'o Templo I de Tikal (Grande Jaguar), nove terraços e crista, sobre a floresta',
      draw: u => {
        const st = '#E7DBBE', lo = '#5A4528', hi = '#FAF2DC', sh = '#B7A27A', dk = '#2E2216';
        let s = `<defs><linearGradient id="${u}sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E6B04E"/><stop offset="1" stop-color="#B8721E"/></linearGradient>`
          + `<linearGradient id="${u}st" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${hi}"/><stop offset=".45" stop-color="${st}"/><stop offset="1" stop-color="${sh}"/></linearGradient></defs>`
          + `<path d="M0 0H60V60H0Z" fill="url(#${u}sk)"/>`
          + circ(30, 16, 10.5, '#F4CF78', null, 0, 'opacity=".6"');
        /* nine terraces, each battered, an apron moulding at its top casting a shadow below */
        const n = 9, yb0 = 50, th = 2.9;
        let ter = '';
        for (let i = 0; i < n; i++) {
          const yb = yb0 - i * th, yt = yb - th, hw = 12.8 - i * .82, ht = hw - .36;
          ter += fp(`M${f(30 - hw)} ${f(yb)}L${f(30 - ht)} ${f(yt)}H${f(30 + ht)}L${f(30 + hw)} ${f(yb)}Z`, `url(#${u}st)`, lo, .55);
          ter += fp(`M${f(30 - ht)} ${f(yt)}H${f(30 + ht)}L${f(30 + ht + .1)} ${f(yt + .75)}H${f(30 - ht - .1)}Z`, hi, null, 0, 'opacity=".75"');
          ter += ln(`M${f(30 - ht + .2)} ${f(yt + 1.05)}H${f(30 + ht - .2)}`, sh, .5);
          /* the inset corners of the terrace */
          ter += ln(`M${f(30 - hw + 1.3)} ${f(yt + 1)}V${f(yb - .2)}M${f(30 + hw - 1.3)} ${f(yt + 1)}V${f(yb - .2)}`, '#8C7652', .45);
        }
        s += ter;
        /* the stair, straight up the front */
        const ys = yb0 - n * th;
        s += fp(`M26.4 ${yb0}L27.3 ${f(ys)}H32.7L33.6 ${yb0}Z`, '#EFE5CC', lo, .6);
        let steps = '';
        for (let y = yb0 - .9; y > ys + .4; y -= .95) steps += `M${f(26.4 + (yb0 - y) / (yb0 - ys) * .9 + .2)} ${f(y)}H${f(33.6 - (yb0 - y) / (yb0 - ys) * .9 - .2)}`;
        s += ln(steps, '#A8946C', .38, 'stroke-linecap="butt"');
        s += ln(`M27 ${yb0}L27.8 ${f(ys)}M33 ${yb0}L32.2 ${f(ys)}`, lo, .4, 'opacity=".5"');
        /* the temple on the summit platform */
        s += fp(`M23.6 ${f(ys)}L24 ${f(ys - 1.6)}H36L36.4 ${f(ys)}Z`, `url(#${u}st)`, lo, .55);
        const yt = ys - 1.6;
        s += fp(`M25 ${f(yt)}V${f(yt - 6.6)}H35V${f(yt)}Z`, `url(#${u}st)`, lo, .6);
        s += fp(`M28.5 ${f(yt)}V${f(yt - 4.2)}H31.5V${f(yt)}Z`, dk);
        s += fp(`M27.9 ${f(yt - 4.2)}H32.1V${f(yt - 5)}H27.9Z`, '#7A5232');
        /* the medial moulding and the roof comb */
        const ym = yt - 6.6;
        s += fp(`M24.2 ${f(ym + .3)}H35.8V${f(ym - 1.3)}H24.2Z`, hi, lo, .55);
        s += fp(`M26.1 ${f(ym - 1.3)}L26.5 ${f(ym - 5.2)}H33.5L33.9 ${f(ym - 1.3)}Z`, `url(#${u}st)`, lo, .55);
        s += fp(`M27.3 ${f(ym - 5.2)}L27.6 ${f(ym - 8.8)}H32.4L32.7 ${f(ym - 5.2)}Z`, `url(#${u}st)`, lo, .55);
        /* the seated lord carved on the comb, in relief */
        s += fp(`M29 ${f(ym - 2)}V${f(ym - 3.4)}Q29 ${f(ym - 4.4)} 30 ${f(ym - 4.4)}Q31 ${f(ym - 4.4)} 31 ${f(ym - 3.4)}V${f(ym - 2)}Z`, sh);
        s += circ(30, ym - 7, .9, sh);
        s += ln(`M28 ${f(ym - 2)}H32`, sh, .6);
        /* the canopy of the forest, jade-green, closing round the foot */
        const crowns = (pts, fill, line) => pts.map(([x, y, r]) => circ(x, y, r, fill, line, .5)).join('');
        const back = [[15.5, 46, 3.4], [19.4, 47.6, 3.1], [23.2, 49.4, 2.8], [44.5, 46, 3.4], [40.6, 47.6, 3.1], [36.8, 49.4, 2.8]];
        const front = [[14.6, 50.6, 3.4], [18.8, 51.4, 3.2], [23, 52.6, 3.2], [27.4, 53.4, 3], [32.6, 53.4, 3], [37, 52.6, 3.2], [41.2, 51.4, 3.2], [45.4, 50.6, 3.4]];
        s += crowns(back, '#2C6B4C', '#16402C') + `<path d="M10 52H50V60H10Z" fill="#2C6B4C"/>` + crowns(front, '#3E8E6A', '#1D5038');
        s += front.map(([x, y, r]) => ln(`M${f(x - r * .6)} ${f(y - r * .35)}Q${f(x - r * .2)} ${f(y - r * .8)} ${f(x + r * .35)} ${f(y - r * .65)}`, '#79BE96', .6, 'opacity=".8"')).join('');
        return s;
      } },

    /* ── AZTEC: the sign of Tenochtitlan — the eagle alighting on the nopal that grows from
       the stone (Codex Mendoza, fol. 2r) — on a turquoise shield hung with quetzal feathers ── */
    asteca: { shape: 'chimalli', field: '#2B9A93', rim: '#8C6420', feather: '#2F8A5C', what: 'a águia pousada no nopal que nasce da pedra (Códice Mendoza), num chimalli de turquesa',
      draw: u => {
        let s = '';
        /* turquoise mosaic: a ring of tesserae inside the rim */
        s += B.ring(30, 27, 21.9, 1.7, '#1E7A75') + B.ring(30, 27, 21.9, 1.7, '#5CC2B6', 'stroke-dasharray="1 .6" opacity=".6"');
        const E = '#6A4024', EL = '#2E1A0C', ED = '#A0703E', EF = '#4E2E18', EH = '#B9854A', Y = '#E8B53A', YL = '#7A5410';
        /* a wing spread to the left: the flight feathers fanned, the coverts over their roots */
        const wing = (fill, line, hi) => {
          let w = '';
          [[112, 9], [123, 9.8], [134, 10.4], [145, 10.8], [156, 11.1], [167, 11.2], [178, 11], [-171, 10.6]].forEach(([a, L]) => {
            const F = BEAST.feather(23.6, 18.8, a, L, 3.9, -6, .62, 1.1);
            w += fp(F.d, fill, line, .6) + ln(F.shaft, line, .3, 'opacity=".55"');
          });
          w += fp('M28.4 15C24.6 12.6 20.2 12.2 16.8 13.6C15.4 16.6 15.8 20.4 17.8 23.4C20 25.2 23.4 25.6 26.4 24.4Z', fill, line, .7);
          w += ln('M17.2 16.4Q19 15.6 20.8 16.4Q22.6 15.4 24.4 16.4Q26 15.6 27.6 16.6M17.4 19.6Q19.2 18.8 21 19.8Q22.8 18.8 24.6 19.8Q26.2 19 27.4 20', hi, .55, 'opacity=".9"');
          return w;
        };
        /* the far wing, behind */
        s += mirX(wing(EF, EL, '#7A5030'));
        /* the tail, fanned down behind the perch */
        [[66, 8.4], [80, 8.8], [94, 8.6], [108, 8]].forEach(([a, L]) => { const F = BEAST.feather(30.6, 26.6, a, L, 3, 0, .85, .9); s += fp(F.d, ED, EL, .55); });
        /* the stone, tetl: a rounded rock with its curls */
        const stone = 'M20.6 46.4C19.2 44.2 20 41 22.8 40C24.6 38.4 27.4 38.6 29 39.4C31 38.2 34.4 38.2 36 39.8C38.6 40.4 40.4 42.8 39.4 46.4Z';
        s += fp(stone, '#A9733D', '#5A3618', .9);
        s += ln('M23.4 43.6c.2-1.6 2-1.8 2.4-.6c.3 1-1 1.4-1.4.6M33.4 43.6c.2-1.6 2-1.8 2.4-.6c.3 1-1 1.4-1.4.6', '#5A3618', .7);
        s += ln('M28.6 45.2c.8-.9 2-.9 2.8 0', '#5A3618', .7) + ln('M22.4 41.2Q25 39.6 27.8 40.4', '#D4A06A', .7, 'opacity=".9"');
        /* the nopal: its pads, spined, with red tunas */
        const pad = (x, y, rx, ry, a) => at(x, y, 1, fp(`M0 ${-ry}C${f(rx * 1.3)} ${-ry} ${f(rx * 1.3)} ${ry} 0 ${ry}C${f(-rx * 1.3)} ${ry} ${f(-rx * 1.3)} ${-ry} 0 ${-ry}Z`, '#4E9140', '#1F4A22', .8)
          + ln(`M${f(-rx * .45)} ${f(-ry * .55)}Q${f(-rx * .7)} 0 ${f(-rx * .4)} ${f(ry * .5)}`, '#8CC36A', .6, 'opacity=".8"')
          + `<g fill="#DCEBB4">${[[.3, -.3], [-.2, .2], [.35, .45], [-.1, -.6]].map(([p, q]) => `<circle cx="${f(p * rx)}" cy="${f(q * ry)}" r=".32"/>`).join('')}</g>`, a);
        const tuna = (x, y, a) => at(x, y, 1, `<ellipse cx="0" cy="0" rx="1.15" ry="1.45" fill="#C8322C" stroke="#6E1418" stroke-width=".5"/>`
          + circ(-.35, -.45, .35, '#E8786A') + circ(0, -1.3, .32, '#6E1418'), a);
        s += pad(30, 38.2, 2.8, 3.4, 0);
        s += pad(24.3, 35.3, 2.5, 3.4, -46) + pad(35.7, 35.3, 2.5, 3.4, 46);
        s += tuna(20.9, 31.9, -45) + tuna(39.1, 31.9, 45) + tuna(20.2, 35.9, -95) + tuna(39.8, 35.9, 95) + tuna(26.6, 38.4, -70) + tuna(33.4, 38.4, 70);
        s += pad(30, 32.6, 2.5, 3.1, 0);
        /* the near wing */
        s += wing(E, EL, ED);
        /* body: the breast, and the feathered thighs */
        s += fp('M26.6 14.2C24.6 16.2 24.2 20.2 25.6 23.4C26.4 25.4 27.2 26.8 27.6 28.6H32.8C33.4 26.2 34.2 23 33.8 19.6C33.4 16.6 31.8 14.6 29.8 14Z', E, EL, .8);
        s += ln('M26.6 18.6q1 .8 2 0q1 .8 2 0M26.8 21.4q1 .8 2 0q1 .8 2 0q1 .8 2 0M27.6 24.2q1 .8 2 0q1 .8 2 0', ED, .55);
        s += fp('M27 25.4C27.2 27.4 27.8 28.8 28.8 29.6H31.4C32.4 28.8 33 27.4 33 25.4Z', EF, EL, .6);
        /* legs and talons gripping the pad */
        s += fp('M28.6 29.2L28.9 30.4H30.3L30.2 29.2ZM31 29.2L31.2 30.4H32.4L32.2 29.2Z', Y, YL, .45);
        s += ln('M27.6 31.2Q28.2 30.2 29.4 30.4L30.4 31.2M30.4 31.2Q31 30.2 32.2 30.4L33.4 31.2', YL, .75);
        /* head and hooked beak, looking left */
        s += fp('M29 16C29 12.8 28.2 9.8 25.8 8.4C23.8 7.3 21.4 7.7 20.2 9.2L19.8 12C21 12.8 22.4 13.8 23.2 15.4C23.8 16.4 24.6 17 25.4 17.2Z', EH, EL, .7);
        s += ln('M27.4 10.4Q26.2 12.4 27 14.6M25.6 11.6Q25 13.2 25.6 15', '#8A5A2C', .5);
        s += fp('M20.6 9.1C18.6 8.9 17 9.8 16.6 11.4C16.4 12.2 16.8 12.8 17.4 13.2C17.4 12.4 17.8 11.9 18.6 11.8L20.6 12Z', Y, YL, .55);
        s += fp('M18.8 12.3H20.6L20.4 13.1C19.6 13.3 19 13 18.8 12.3Z', Y, YL, .45);
        s += circ(22.4, 10.4, .85, '#F3E2A0', EL, .35) + circ(22.2, 10.4, .42, EL);
        s += ln('M21.2 9.5Q22.6 8.8 24 9.4', EL, .55);
        return s;
      } },

    /* ── INCA: Inti, the gold sun with a face, as on the Coricancha's disc, in a frame of
       tocapu — the squared emblems woven on Inca royal tunics ── */
    inca: { shape: 'tablet', field: '#A8262B', rim: '#5E3A12', what: 'Inti, o sol de ouro com rosto, numa moldura de tocapus',
      draw: u => {
        const K = '#1E1612', Y = '#E2B13C', R = '#B5302A', Wt = '#EFE6D2', G = '#2F6A55';
        /* the tocapu: four squared designs, round the frame */
        const toc = [
          (x, y) => fp(`M${x} ${y}h6v6h-6Z`, K) + fp(`M${x + 1} ${y + 1}h2v2h-2ZM${x + 3} ${y + 3}h2v2h-2Z`, Wt) + fp(`M${x + 3} ${y + 1}h2v2h-2ZM${x + 1} ${y + 3}h2v2h-2Z`, R),
          (x, y) => fp(`M${x} ${y}h6v6h-6Z`, Y) + fp(`M${x + 2.2} ${y + .9}h1.6v1.3h1.3v1.6h-1.3v1.3h-1.6v-1.3h-1.3v-1.6h1.3Z`, R),
          (x, y) => fp(`M${x} ${y}h6v6h-6Z`, Wt) + fp(`M${x} ${y}h1.7l4.3 4.3v1.7h-1.7l-4.3-4.3Z`, K) + fp(`M${x + 4} ${y + .6}h1.4v1.4h-1.4ZM${x + .6} ${y + 4}h1.4v1.4h-1.4Z`, R),
          (x, y) => fp(`M${x} ${y}h6v6h-6Z`, G) + fp(`M${x + 1.2} ${y + 1.2}h3.6v3.6h-3.6Z`, Y) + fp(`M${x + 2.3} ${y + 2.3}h1.4v1.4h-1.4Z`, K),
        ];
        let s = '', i = 0;
        const cells = [];
        for (let k = 0; k < 7; k++) cells.push([9 + k * 6, 9]);
        for (let k = 1; k < 7; k++) cells.push([45, 9 + k * 6]);
        for (let k = 5; k >= 0; k--) cells.push([9 + k * 6, 45]);
        for (let k = 5; k >= 1; k--) cells.push([9, 9 + k * 6]);
        cells.forEach(([x, y]) => { s += toc[i++ % 4](x, y); });
        let grid = 'M9 15H51M9 45H51M15 9V51M45 9V51';
        for (let k = 1; k < 6; k++) grid += `M${15 + k * 6 - 6} 9V15M${15 + k * 6 - 6} 45V51M9 ${15 + k * 6 - 6}H15M45 ${15 + k * 6 - 6}H51`;
        s += ln(grid, K, .5, 'stroke-linecap="butt"');
        s += fp('M15 15H45V45H15Z', 'none', BK.gold, 1);
        /* the sun: straight rays and waving rays, alternately */
        const c = 30, Gd = BK.gold, GL = '#7C5414';
        let rays = '';
        for (let k = 0; k < 16; k++) {
          const a = k * Math.PI / 8 - Math.PI / 2;
          if (k % 2 === 0) {
            const h = .14, r1 = 8, r2 = 14.2;
            rays += `M${pt([c + Math.cos(a - h) * r1, c + Math.sin(a - h) * r1])}L${pt([c + Math.cos(a) * r2, c + Math.sin(a) * r2])}L${pt([c + Math.cos(a + h) * r1, c + Math.sin(a + h) * r1])}Z`;
          } else {
            /* a flame: a tapering S along the ray */
            const P = (r, off) => pt([c + Math.cos(a) * r - Math.sin(a) * off, c + Math.sin(a) * r + Math.cos(a) * off]);
            rays += `M${P(8, -1.2)}C${P(9.6, -2)} ${P(10.4, .6)} ${P(11.4, .9)}C${P(12.2, 1.1)} ${P(12.4, -.2)} ${P(13.2, -.4)}`
              + `C${P(12.4, .8)} ${P(11.6, 2.2)} ${P(10.4, 1.8)}C${P(9.4, 1.5)} ${P(9.4, .2)} ${P(8, 1.2)}Z`;
          }
        }
        s += fp(rays, Gd, GL, .6);
        s += circ(c, c, 8.4, Gd, GL, 1) + B.ring(c, c, 7.1, .5, GL, 'opacity=".7"');
        s += ln('M23.6 27.2A7.4 7.4 0 0 1 28.6 22.8', BK.goldHi, .9, 'opacity=".9"');
        /* the face: brows running into the nose, eyes, the mouth with its teeth */
        s += ln('M25 27.4Q27.3 26.2 29.4 27.4V31.6M35 27.4Q32.7 26.2 30.6 27.4V31.6', GL, .9);
        s += fp('M28.7 31.4H31.3Q31.9 32.6 30 32.8Q28.1 32.6 28.7 31.4Z', GL);
        s += fp('M25.6 29.1Q27.2 27.9 28.6 29.1Q27.2 30.1 25.6 29.1ZM34.4 29.1Q32.8 27.9 31.4 29.1Q32.8 30.1 34.4 29.1Z', '#4A300C');
        s += fp('M26.8 34.2H33.2Q33.2 35.8 30 35.8Q26.8 35.8 26.8 34.2Z', '#4A300C');
        s += ln('M28.2 34.3V35.3M29.4 34.3V35.6M30.6 34.3V35.6M31.8 34.3V35.3', Gd, .45);
        return s;
      } },

    /* ── PORTUGUESE EMPIRE: King Manuel's armillary sphere over the Cross of the Order of
       Christ, the cross the caravels carried on their sails ── */
    imperio_portugues: { shape: 'roundel', field: '#1D3F8E', rim: '#8C6420', what: 'a esfera armilar de D. Manuel sobre a Cruz da Ordem de Cristo',
      draw: u => crossChrist(30, 30, 21.6, { fim: BK.gold, fimW: 2.2, lw: .8 })
        + circ(30, 30, 12.6, '#173373')
        + sphere(30, 30, 12, { w: 1.45, globe: true }) },

    /* ── UNITED STATES: the Stars and Stripes — thirteen stripes, fifty stars ── */
    estados_unidos: { shape: 'banner', field: '#F4F1EA', what: 'as Estrelas e Listras: treze listras e cinquenta estrelas',
      draw: u => {
        const R = '#B4202F', Bl = '#26336E', h = 30 / 13;
        let s = '';
        for (let k = 0; k < 13; k += 2) s += fp(wband(15 + k * h - (k ? 0 : 3), 15 + (k + 1) * h + (k === 12 ? 3 : 0)), R);
        const cw = 21, ch = 7 * h;
        s += fp(wpoly([[3, 12], [5 + cw, 12], [5 + cw, 15 + ch], [3, 15 + ch]]), Bl);
        let st = '';
        for (let r = 0; r < 9; r++) {
          const v = 15 + (r + 1) * ch / 10, odd = r % 2;
          for (let c = 0; c < (odd ? 5 : 6); c++) {
            const x = 5 + (odd ? 2 * c + 2 : 2 * c + 1) * cw / 12, p = W(x, v);
            st += 'M' + starPts(p[0], p[1], .9, .36).map(pt).join('L') + 'Z';
          }
        }
        s += fp(st, '#F7F4EC');
        return s + fold(u);
      } },

    /* ── HAITI: the arms of the Republic, from Pétion's day — the royal palm under the cap
       of liberty, the trophy of flags, cannons and drum on the green, on the blue and red ── */
    haiti: { shape: 'french', field: '#1E3F99', what: 'a palmeira real sob o barrete da liberdade, com bandeiras, canhões e tambor sobre o verde',
      draw: u => {
        const BLU = '#1E3F99', RED = '#C5202F', IV = '#F3EEE2';
        let s = fp('M0 32.5H60V60H0Z', RED);
        /* a Haitian flag: its staff from the foot (x0, y0) to the spear-point (x1, y1), the cloth
           flying out to side k, blue over red, edged in white so it stands off the field */
        const flag = (x0, y0, x1, y1, k) => {
          const L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L, uy = (y1 - y0) / L;
          const A = [x1 - ux * 1.8, y1 - uy * 1.8];
          const tr = `matrix(${k} .2 ${f(-ux)} ${f(-uy)} ${f(A[0])} ${f(A[1])})`;
          const cloth = 'M0 0Q1.4 -.6 2.8 0T5.6 0V4.8Q4.2 5.4 2.8 4.8T0 4.8Z';
          return bar(`M${f(x0)} ${f(y0)}L${f(x1)} ${f(y1)}`, '#C9A24A', '#5E4214', .6)
            + `<g transform="${tr}">${fp(cloth, 'none', IV, 1.1)}${fp('M0 0Q1.4 -.6 2.8 0T5.6 0V2.4Q4.2 3 2.8 2.4T0 2.4Z', BLU)}`
            + `${fp('M0 2.4Q1.4 1.8 2.8 2.4T5.6 2.4V4.8Q4.2 5.4 2.8 4.8T0 4.8Z', RED)}</g>`
            + fp(`M${f(x1 + ux * 1.4)} ${f(y1 + uy * 1.4)}L${f(x1 - uy * .7)} ${f(y1 + ux * .7)}L${f(x1 - ux * .6)} ${f(y1 - uy * .6)}L${f(x1 + uy * .7)} ${f(y1 - ux * .7)}Z`, BK.gold, BK.goldLo, .35);
        };
        s += flag(27.4, 44, 18.4, 13.6, -1) + flag(27.4, 44, 15.6, 23.4, -1) + flag(32.6, 44, 41.6, 13.6, 1) + flag(32.6, 44, 44.4, 23.4, 1);
        /* the green */
        s += fp('M8 60V47.6C14 44.4 22 43.4 30 43.4S46 44.4 52 47.6V60Z', '#3D8A34', '#1D4A1A', .8);
        s += ln('M14 47Q22 44.6 30 44.6', '#79C062', .7, 'opacity=".8"');
        /* the palm: grey trunk ringed, the green crownshaft, the arching fronds */
        s += fp('M28.3 45L28.9 22.6H31.1L31.7 45Z', '#D8CBA8', '#5E5030', .7);
        s += ln('M29 41H31M29.1 37.2H30.9M29.1 33.4H30.9M29.2 29.6H30.8M29.2 25.8H30.8', '#8E7F58', .45);
        s += ln('M29.4 44V23.6', '#F3EAD0', .5, 'opacity=".7"');
        const frond = (d, mid) => fp(d, '#4EA03E', '#1F5320', .7) + ln(mid, '#9AD27A', .45, 'opacity=".85"');
        const half = frond('M30 22.4C26.4 19.4 21 19.2 16.4 22.4C20.6 21.6 24.4 22.2 27.4 24Z', 'M29 22.4C25.6 20.6 21.6 20.6 17.8 21.8')
          + frond('M30 21.8C27.4 17.4 22.6 15.6 18.2 16.6C22.4 17.6 25.6 19.4 28 22.6Z', 'M29.4 21.6C27 18.6 23.6 17 19.6 16.8')
          + frond('M30 22.6C26.8 22.8 23 25.4 21 29.2C24 26.8 26.8 25.2 29.4 24.4Z', 'M29.2 23.2C26.4 23.8 23.6 25.8 21.8 28.2');
        s += both(half);
        s += fp('M28.5 21.8H31.5L31.2 25.2H28.8Z', '#3E7A2E', '#1F4A1A', .5);
        /* the cap of liberty, crowning the palm, its point falling forward */
        s += fp('M34.4 18.2C34.8 15 33.8 12.4 31.2 11.8C28.8 11.2 26.2 12 25 13.8C24.4 14.7 24.6 15.8 25.4 16.1C26 15.2 27 14.9 27.6 15.4C26.8 16.2 26.4 17.2 26.4 18.2Z', RED, '#5E0E12', .7);
        s += ln('M27.6 15.4Q29.4 14 31.6 14.6M30.6 12.4Q32.8 13 33.2 15.6', '#E8606A', .55, 'opacity=".8"');
        s += fp('M26 17.6H34.8V19H26Z', '#8E141E', '#5E0E12', .4);
        /* a cannon on its carriage, its muzzle out to the left */
        const barrel = 'M0 -1.5L10 -1L10.2 -1.3H11.4V1.3H10.2L10 1L0 1.5Q-.7 1.5 -.7 0Q-.7 -1.5 0 -1.5Z';
        const cannon = fp('M19.4 43.8L27.4 41.6L28.2 44.6L21.2 46Z', '#7A4A22', '#3E220C', .55)
          + at(28, 42, 1, fp(barrel, '#3C4148', '#15181C', .55) + circ(-1.3, 0, .75, '#3C4148', '#15181C', .45)
            + ln('M3.4 -1.3V1.3M7 -1.1V1.1', '#7A818A', .5) + ln('M.4 -.8H9.6', '#8C949E', .45, 'opacity=".8"'), 193)
          + circ(22.2, 45, 2.3, 'none', '#3E220C', 1.4) + circ(22.2, 45, 2.3, 'none', '#9A6634', .8)
          + ln('M22.2 42.9V47.1M20.1 45H24.3', '#7A4A22', .5) + circ(22.2, 45, .55, '#3E220C');
        s += both(cannon);
        /* the drum, before the palm's foot */
        s += fp('M26.4 43.4V47.4Q30 48.8 33.6 47.4V43.4Z', BLU, '#0E1F52', .6);
        s += ln('M26.6 44.2L28.4 47.6L30 44.4L31.6 47.6L33.4 44.2', '#E8C46A', .5);
        s += fp('M26.4 47.2Q30 48.6 33.6 47.2V47.9Q30 49.3 26.4 47.9Z', RED, '#5E0E12', .35);
        s += `<ellipse cx="30" cy="43.4" rx="3.6" ry=".95" fill="${IV}" stroke="#6A5A38" stroke-width=".5"/>`;
        return s;
      } },

    /* ── GRAN COLOMBIA: the flag of 1821, gold over blue over red, gold the double width,
       with the arms of the Republic: the lictor's fasces between two cornucopias ── */
    gran_colombia: { shape: 'banner', field: '#F1C232', what: 'o tricolor amarelo, azul e vermelho, com as armas: o feixe de lictor entre duas cornucópias',
      draw: u => {
        let s = fp(wband(30, 37.5), '#1F3F95') + fp(wband(37.5, 48), '#C3202F');
        /* the arms, in an oval */
        const ov = wpoly(ngon(30, 30, 1, 48).map(([x, y]) => [30 + (x - 30) * 8, 30 + (y - 30) * 9.4]), 9);
        s += fp(ov, '#F3EEE2', '#7A5520', 1.7) + fp(ov, 'none', BK.gold, .8);
        /* two cornucopias, crossed at the foot, pouring their fruit out to either side */
        const horn = (() => {
          const Mc = [24.8, 27.6], T = [33.4, 37.2], n = [.745, -.667], w = 1.75;
          const P = (t, k) => pt([Mc[0] + (T[0] - Mc[0]) * t + n[0] * k, Mc[1] + (T[1] - Mc[1]) * t + n[1] * k]);
          let h = fp(`M${P(0, -w)}Q26.4 35.2 ${P(1, 0)}Q34.8 37 34.6 35.4Q34 36.4 32.8 36Q29.4 33.4 ${P(0, w)}Z`, BK.gold, BK.goldLo, .55);
          h += ln([.28, .5, .7].map(t => `M${P(t, -w * (1 - t * .8) + .15)}L${P(t, w * (1 - t * .8) - .15)}`).join(''), BK.goldLo, .5);
          h += ln(`M${P(.12, -w * .55)}L${P(.62, -w * .3)}`, BK.goldHi, .5, 'opacity=".8"');
          h += `<ellipse cx="${Mc[0]}" cy="${Mc[1]}" rx="${w}" ry=".75" transform="rotate(-41.8 ${Mc[0]} ${Mc[1]})" fill="#7A5520" stroke="${BK.goldLo}" stroke-width=".4"/>`;
          return h + circ(23.7, 26.1, 1, '#C3202F', '#6E1418', .35) + circ(25.8, 25.4, .9, '#4E9140', '#1F4A22', .35)
            + circ(24.4, 24.3, .8, '#E07A2A', '#7A3A10', .35) + circ(26.6, 24.1, .55, '#6A3A8A') + circ(25.9, 23.3, .55, '#6A3A8A');
        })();
        s += both(horn);
        /* the fasces: a bundle of rods, bound crosswise with red, the axe-head standing out */
        s += fp('M28.7 22.6H31.3V34.4H28.7Z', '#9A6A34', '#5A3A14', .5);
        s += ln('M29.55 22.8V34.2M30.45 22.8V34.2', '#5A3A14', .35) + ln('M28.9 23.4H31.1', '#C9A06A', .5);
        s += ln('M28.7 25.6L31.3 26.8M28.7 29.2L31.3 30.4M28.7 32.4L31.3 33.6', '#C3202F', .65);
        s += fp('M31.2 23.4L34.2 22Q35.4 24.7 34.2 27.2L31.2 25.9Z', '#D3D8DF', '#4A5058', .45);
        return s + fold(u);
      } },

    /* ── EMPIRE OF BRAZIL: the green shield, the gold armillary sphere over the Cross of the
       Order of Christ, the blue ring of twenty silver stars, the imperial crown, and the
       branches of coffee and tobacco ── */
    imperio_brasil: { shape: 'oval', field: '#1C7A3E', what: 'esfera armilar sobre a Cruz de Cristo, círculo azul de estrelas, coroa imperial, café e tabaco',
      draw: u => {
        const cy = 36.6, G = BK.gold, GL = BK.goldLo;
        let s = '';
        /* a branch curving up the left of the ring: coffee (red berries) or, mirrored, tobacco (pink flowers) */
        const branch = (leaf, lo, wd, fruit) => {
          const R = 17.6, P = a => [30 + Math.cos(a * Math.PI / 180) * R, cy + Math.sin(a * Math.PI / 180) * R];
          let b = ln(`M${pt(P(98))}A${R} ${R} 0 0 1 ${pt(P(204))}`, '#5A4620', .9);
          [108, 122, 136, 150, 164, 178, 192].forEach((a, i) => {
            const p = P(a), tan = a + 90, k = i % 2 ? 1 : -1, dir = tan + k * 34;
            b += at(p[0], p[1], 1, fp(`M0 0Q1.8 ${-wd} 4.2 0Q1.8 ${wd} 0 0Z`, leaf, lo, .45) + ln('M.4 0H3.6', lo, .3, 'opacity=".7"'), dir);
          });
          [115, 143, 171, 199].forEach(a => { const p = P(a); b += fruit(p[0], p[1]); });
          return b;
        };
        s += branch('#3A8434', '#123A14', 1.4, (x, y) => circ(x - .6, y, .75, '#C3202F', '#5E0E12', .3) + circ(x + .5, y + .4, .75, '#C3202F', '#5E0E12', .3));
        s += mirX(branch('#5E9E3C', '#24521C', 1.8, (x, y) => B.star(x, y, 1.1, 5, '#E98AA0', .5) + circ(x, y, .3, '#F6E0A0')));
        /* the blue ring of stars, edged with gold */
        s += B.ring(30, cy, 13.6, 4.7, GL) + B.ring(30, cy, 13.6, 3.7, '#1F4F9E');
        let st = '';
        for (let k = 0; k < 20; k++) {
          const a = -Math.PI / 2 + k * Math.PI / 10;
          st += 'M' + starPts(30 + Math.cos(a) * 13.6, cy + Math.sin(a) * 13.6, 1.4, .56, a - Math.PI / 2).map(pt).join('L') + 'Z';
        }
        s += fp(st, '#F3F0E6');
        s += crossChrist(30, cy, 11.6, { lw: .7 });
        s += circ(30, cy, 8.6, '#196B37');
        s += sphere(30, cy, 8.2, { w: 1.1 });
        /* the imperial crown: red cap, gold arches set with pearls, the jewelled circlet, orb and cross */
        s += fp('M23.6 20.4L23.2 15.8C23.2 13.4 26 11.8 30 11.6C34 11.8 36.8 13.4 36.8 15.8L36.4 20.4Z', '#A01E28', '#5E0E12', .6);
        const arch = 'M23.4 20.6C22.6 16.4 24.6 12.8 30 11.8';
        const arch2 = 'M26.8 20.6C26.2 16.6 27.4 13.2 30 11.8';
        s += both(bar(arch, G, GL, 1.1) + bar(arch2, G, GL, .9)) + bar('M30 20.6V11.8', G, GL, 1);
        s += `<g fill="#F6F0DC">${[[23.3, 17.6], [24.2, 14.6], [26.6, 17.6], [27.4, 14.4], [36.7, 17.6], [35.8, 14.6], [33.4, 17.6], [32.6, 14.4], [30, 16.4], [30, 13.8]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".42"/>`).join('')}</g>`;
        s += fp('M22.6 19.8H37.4V23H22.6Z', G, GL, .7) + ln('M23.2 20.5H36.8', BK.goldHi, .5, 'opacity=".9"');
        s += circ(25.8, 21.5, .8, '#1F6B3C', '#0E3A1E', .3) + circ(30, 21.5, .9, '#C3202F', '#5E0E12', .3) + circ(34.2, 21.5, .8, '#1F6B3C', '#0E3A1E', .3);
        s += circ(30, 10.2, 1.6, G, GL, .6) + bar('M30 8.6V5.4M28.6 6.7H31.4', G, GL, .8);
        return s;
      } },

    /* ── COLONIAL BRAZIL: the Cross of the Order of Christ on a caravel's sail ── */
    brasil_colonia: { shape: 'sail', field: '#EEE5CE', what: 'a Cruz da Ordem de Cristo na vela de uma caravela',
      draw: u => {
        let s = `<defs><radialGradient id="${u}sl" cx="50%" cy="46%" r="60%"><stop offset="0" stop-color="#fff" stop-opacity=".35"/>`
          + `<stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#6A5530" stop-opacity=".35"/></radialGradient></defs>`;
        /* the cloths of the sail, seamed, bellying with it */
        let seams = '';
        [-15, -9, -3, 3, 9, 15].forEach(k => { seams += `M${f(30 + k * 1.08)} 9.6Q${f(30 + k * 1.3)} 30 ${f(30 + k * 1.08)} 50.4`; });
        s += ln(seams, '#BFAF8A', .5);
        s += crossChrist(30, 30, 15.4, { lw: .9 });
        s += `<path d="M0 0H60V60H0Z" fill="url(#${u}sl)"/>`;
        /* the bolt-rope along the foot */
        s += ln('M11.2 50.6Q30 46.6 48.8 50.6', '#9C8A62', .8);
        return s;
      } },

    /* ── BRAZILIAN REPUBLIC: the flag of 1889, to the proportions of its law: green, the gold
       lozenge, the blue globe of the sky over Rio with the white band ── */
    brasil_republica: { shape: 'banner', field: '#1C8442', what: 'o losango amarelo e o globo azul estrelado com a faixa branca',
      draw: u => {
        const M = 30 / 14;
        let s = fp(wpoly([[9.25, 30], [30, 15 + 1.7 * M], [50.75, 30], [30, 45 - 1.7 * M]], 1), '#F2CB2E', '#C79A16', .5);
        const R = 3.5 * M;
        const globe = wpoly(ngon(30, 30, R, 56), 9);
        s += `<clipPath id="${u}gl"><path d="${globe}"/></clipPath>` + fp(globe, '#203A8A');
        /* the band: arcs about a point 2 modules left of the globe's foot-line, radii 8 and 8.5 modules */
        const ax = 30 - 2 * M, ay = 30 + 7 * M, r1 = 7.9 * M, r2 = 8.6 * M;
        const arc = (r, a0, a1, n) => Array.from({ length: n + 1 }, (_, i) => { const a = a0 + (a1 - a0) * i / n; return [ax + Math.cos(a) * r, ay + Math.sin(a) * r]; });
        const band = arc(r2, -2.2, -.9, 30).concat(arc(r1, -.9, -2.2, 30));
        s += `<g clip-path="url(#${u}gl)">${fp(wpoly(band, 9), '#F6F3EA')}`;
        /* stars: the Southern Cross, Scorpius, Canis Major, Spica above the band */
        const stars = [[.08, .32, .55], [.1, .82, .62], [-.12, .55, .5], [.3, .5, .48], [.15, .6, .3],
          [-.58, .32, .58], [-.7, .48, .4], [-.5, .5, .38], [-.44, .76, .5], [-.8, .12, .45],
          [.56, .36, .42], [.64, .46, .36], [.7, .58, .36], [.68, .7, .4], [.58, .8, .36], [.46, .76, .34],
          [.32, .9, .36], [.24, .8, .3], [-.02, .97, .28], [.66, -.32, .55], [-.26, .2, .3], [.42, .12, .3]];
        s += fp(stars.map(([x, y, r]) => { const p = W(30 + x * R, 30 + y * R); return 'M' + starPts(p[0], p[1], r * 1.15, r * .46).map(pt).join('L') + 'Z'; }).join(''), '#F6F3EA');
        s += `</g>`;
        return s + fold(u);
      } },

    /* ── CUBA: the Lone Star flag — the red equilateral triangle, the white star, three blue
       and two white stripes ── */
    cuba: { shape: 'banner', field: '#F4F1EA', what: 'a Estrela Solitária: triângulo vermelho e listras azuis e brancas',
      draw: u => {
        const Bl = '#1F3F95';
        let s = fp(wband(12, 21), Bl) + fp(wband(27, 33), Bl) + fp(wband(39, 48), Bl);
        const tip = 5 + 15 * Math.sqrt(3);
        s += fp(wpoly([[3, 15 - 2 / Math.sqrt(3)], [tip, 30], [3, 45 + 2 / Math.sqrt(3)]], 1), '#C8202B');
        s += fp(wpoly(starPts(5 + (tip - 5) / 3, 30, 5, 1.91), 1), '#F7F4EC');
        return s + fold(u);
      } },
  });
})();
