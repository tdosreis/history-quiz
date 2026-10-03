
/* The icon a question can be drawn with, by name — what merge_questions.py
   checks `art.icon` against. */
const QICON = {
  column: w => ART.column(w), pyramid: w => ART.pyramid(w), ship: w => ART.ship(w),
  castle: w => ART.castle(w), crown: w => ART.crown(w), sword: w => ART.sword(w),
  scroll: w => ART.scroll(w), book: w => ART.book(w), globe: w => ART.globe(w),
  torch: w => ART.torch(w), cannon: w => ART.cannon(w), map: w => ART.map(w),
  hourglass: w => ART.hourglass(w), trophy: w => ART.trophy(w), gear: w => ART.gear(w),
  rocket: w => ART.rocket(w), flag: w => ART.flag(w), bust: w => ART.bust(w),
};
/* the mark of a category when a question carries no picture of its own */
const CAT_ART = {
  antiguidade: 'column', egito_mesopotamia: 'pyramid', grecia_roma: 'column', medieval: 'castle',
  descobrimentos: 'ship', renascimento: 'book', revolucoes: 'torch', imperios: 'crown',
  guerras: 'cannon', guerra_fria: 'rocket', brasil: 'map', brasil_imperio: 'crown', brasil_republica: 'flag',
  invencoes: 'gear', mundo_variado: 'globe', quem_sou_eu: 'bust', linha_do_tempo: 'hourglass',
};
const FALLBACK_PHOTO = {};
const NONFREE_CRESTS = new Set([]);
const CTRY_ISO = {};

/* ── The flag of a country, large, for a question card ── */
function qFlagInner(code) {
  return `<svg viewBox="0 0 9 6" preserveAspectRatio="none" aria-hidden="true">${FLAGS[code] || ''}</svg>`;
}

/* ═══════════════════════════════════════════════════
   EMBLEMS — every polity's brasão, drawn
   No state of the ancient world left a flag to photograph, and the ones
   that did are public domain only in spirit. Each is therefore a shield in
   its own two colours with one device on it — a crown, a sun, an eagle —
   the way a schoolbook marks an empire on its map.
═══════════════════════════════════════════════════ */
function _lum(hex) {
  let h = String(hex).replace('#', '');
  if (h.length === 3) h = h.split('').map(x => x + x).join('');
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}
function _dist(a, b) {
  const p = hex => {
    let h = String(hex).replace('#', '');
    if (h.length === 3) h = h.split('').map(x => x + x).join('');
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  };
  const [r1, g1, b1] = p(a), [r2, g2, b2] = p(b);
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

/* devices, all centred on (30,24) inside a 24-unit box; `k` is the fill */
const EMBLEM = {
  crown:   k => `<path d="M17 33 L15 17 L23 24 L30 13 L37 24 L45 17 L43 33Z M17 36h26" fill="${k}" stroke="${k}" stroke-width="2" stroke-linejoin="round"/>`,
  sun:     k => `<circle cx="30" cy="24" r="6" fill="${k}"/>` + Array.from({ length: 12 }, (_, i) => {
             const a = i * Math.PI / 6; return `<path d="M${(30 + Math.cos(a) * 9).toFixed(1)} ${(24 + Math.sin(a) * 9).toFixed(1)}L${(30 + Math.cos(a) * 13).toFixed(1)} ${(24 + Math.sin(a) * 13).toFixed(1)}" stroke="${k}" stroke-width="2.2" stroke-linecap="round"/>`; }).join(''),
  moon:    k => `<path d="M36 14a12 12 0 1 0 0 20a9.5 9.5 0 1 1 0-20Z" fill="${k}"/><path d="M40 21l1.4 3 3.2.3-2.4 2.1.8 3.1-3-1.7-3 1.7.8-3.1-2.4-2.1 3.2-.3z" fill="${k}"/>`,
  eagle:   k => `<path d="M30 12l4 6 11-4-4 10 5 3-9 1-2 11-5-6-5 6-2-11-9-1 5-3-4-10 11 4z" fill="${k}"/>`,
  column:  k => `<path d="M17 13h26v4H17zM20 17h20v3H20zM22 20h4v14h-4zM28 20h4v14h-4zM34 20h4v14h-4zM17 34h26v4H17z" fill="${k}"/>`,
  pyramid: k => `<path d="M30 11L47 36H13z" fill="${k}"/><path d="M30 11V36" stroke="#0003" stroke-width="2"/>`,
  sword:   k => `<path d="M30 9l3 4v18h-6V13z" fill="${k}"/><path d="M21 31h18v3H21zM28 34h4v8h-4z" fill="${k}"/>`,
  laurel:  k => `<path d="M30 38C20 36 15 28 17 16M30 38C40 36 45 28 43 16" fill="none" stroke="${k}" stroke-width="2.6" stroke-linecap="round"/>` +
             [[17,18],[16,24],[19,30],[43,18],[44,24],[41,30]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2.4" ry="4" fill="${k}"/>`).join('') + _STAR(30, 22, 6, k),
  star:    k => _STAR(30, 24, 13, k),
  lion:    k => `<circle cx="30" cy="25" r="8" fill="${k}"/>` + Array.from({ length: 10 }, (_, i) => {
             const a = i * Math.PI / 5; return `<path d="M${(30 + Math.cos(a) * 8).toFixed(1)} ${(25 + Math.sin(a) * 8).toFixed(1)}L${(30 + Math.cos(a + .16) * 14).toFixed(1)} ${(25 + Math.sin(a + .16) * 14).toFixed(1)}L${(30 + Math.cos(a + .31) * 8).toFixed(1)} ${(25 + Math.sin(a + .31) * 8).toFixed(1)}Z" fill="${k}"/>`; }).join('') +
             `<circle cx="27.4" cy="24" r="1.3" fill="#0008"/><circle cx="32.6" cy="24" r="1.3" fill="#0008"/>`,
  ship:    k => `<path d="M15 31h30q-3 7-9 8H24q-6-1-9-8zM30 12v19M32 14q9 4 9 15H32zM28 17q-8 4-8 12h8z" fill="${k}" stroke="${k}" stroke-width="1" stroke-linejoin="round"/>`,
  wheel:   k => `<circle cx="30" cy="24" r="11" fill="none" stroke="${k}" stroke-width="2.6"/><circle cx="30" cy="24" r="3" fill="${k}"/>` +
             Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<path d="M30 24L${(30 + Math.cos(a) * 11).toFixed(1)} ${(24 + Math.sin(a) * 11).toFixed(1)}" stroke="${k}" stroke-width="1.6"/>`; }).join(''),
  tower:   k => `<path d="M20 36V17h4v3h4v-3h4v3h4v-3h4v19zM27 36v-7a3 3 0 0 1 6 0v7z" fill="${k}" fill-rule="evenodd"/>`,
  cross:   k => `<path d="M27 11h6v9h9v6h-9v13h-6V26h-9v-6h9z" fill="${k}"/>`,
  book:    k => `<path d="M30 16q-8-4-16-1v20q8-3 16 1zM30 16q8-4 16-1v20q-8-3-16 1z" fill="${k}"/>`,
  hammer:  k => `<path d="M20 36L36 14M33 11l8 7-3 3-8-7z" stroke="${k}" stroke-width="3" fill="${k}" stroke-linecap="round"/><path d="M40 34a11 11 0 0 1-17-13" fill="none" stroke="${k}" stroke-width="3" stroke-linecap="round"/>`,
};

function genericCrest(id) {
  const c = CL.find(x => x.id === id);
  if (!c) return '';
  const uid  = 'c' + id.replace(/\W/g, '');
  const base = c.c1;
  const alt  = _dist(c.c1, c.c2) > 70 ? c.c2 : (_lum(base) < 0.5 ? '#ececec' : '#1a1a1a');
  const ink  = _lum(base) < 0.55 ? (_lum(alt) > 0.6 ? alt : '#ffffff') : '#141414';
  const edge = _lum(base) < 0.5 ? '#f0f0f0' : '#1a1a1a';
  const SHIELD = 'M30 2 L55.8 10.4 L55.8 31.2 C55.8 45.6 43.8 55.2 30 59.1 '
               + 'C16.2 55.2 4.2 45.6 4.2 31.2 L4.2 10.4 Z';
  const dev = (EMBLEM[c.em] || EMBLEM.star)(ink);
  return `
    <defs><clipPath id="${uid}s"><path d="${SHIELD}"/></clipPath></defs>
    <g clip-path="url(#${uid}s)">
      <path d="${SHIELD}" fill="${base}"/>
      <rect x="0" y="45" width="60" height="16" fill="${alt}" opacity=".9"/>
    </g>
    <path d="${SHIELD}" fill="none" stroke="${edge}" stroke-width="2.2" stroke-linejoin="round"/>
    ${dev}
    <text x="30" y="52.6" text-anchor="middle"
      font-family="'Archivo','Arial Black',Impact,sans-serif"
      font-size="8.4" font-weight="800" letter-spacing=".5" fill="${_lum(alt) < .5 ? '#fff' : '#141414'}">${c.a}</text>`;
}

function clubArt(id, style, label) {
  const name = clubName(id);
  const inner = LOGOS[id]
    ? `<img src="${LOGOS[id]}" alt="" aria-hidden="true" onerror="clubFallback(this,'${id}')" />`
    : `<svg viewBox="0 0 60 60" class="fill" aria-hidden="true">${genericCrest(id)}</svg>`;
  return `<span class="crest-disc" style="${style || ''}"
    ${label ? `role="img" aria-label="${name}"` : 'aria-hidden="true"'}>${inner}</span>`;
}
function clubFallback(img, id) {
  try { img.outerHTML = `<svg viewBox="0 0 60 60" class="fill" aria-hidden="true">${genericCrest(id)}</svg>`; }
  catch (e) { img.style.opacity = '.3'; }
}

/* ═══════════════════════════════════════════════════
   ANSWER TILES — what a written choice can be a picture of
   A choice that is the name of a figure, a polity or a country wears that
   face, emblem or flag when the whole board does; any other board is words.
═══════════════════════════════════════════════════ */
let _optIdx = null;
function optIndex() {
  if (_optIdx) return _optIdx;
  const club = {}, flag = {}, face = {};
  CL.forEach(c => { club[_fold(c.n)] = c.id; });
  Object.entries(CTRY_NAME).forEach(([c, n]) => { if (FLAGS[c]) flag[_fold(n)] = c; });
  const seen = {};
  PL.forEach(p => { if (!p.img || !p.n) return; const n = _fold(p.n); seen[n] = (seen[n] || 0) + 1; face[n] = p; });
  Object.keys(seen).forEach(n => { if (seen[n] > 1) delete face[n]; });
  return (_optIdx = { club, flag, face });
}
function optResolve(text) {
  const f = _fold(text).trim(), X = optIndex();
  if (X.club[f]) return { k: 'club', id: X.club[f] };
  if (X.flag[f]) return { k: 'ctry', iso: [X.flag[f]] };
  if (X.face[f]) return { k: 'face', img: X.face[f].img, id: X.face[f].id };
  return null;
}
const _optMemo = new WeakMap();
function optArtFor(q) {
  if (!q || q.type !== 'txt' || !q.choices) return null;
  if (_optMemo.has(q)) return _optMemo.get(q);
  let out = null;
  const res = q.choices.map(optResolve);
  const kinds = {};
  res.forEach(r => { if (r) kinds[r.k] = (kinds[r.k] || 0) + 1; });
  const kind = Object.keys(kinds).sort((a, b) => kinds[b] - kinds[a])[0];
  const n = q.choices.length;
  /* a board that is all emblems, flags or faces wears them — unless the
     question's own picture is one of them, which would point at it */
  const t = _fold(q.t || '');
  const clash = res.some((r, i) => r && t.indexOf(_fold(q.choices[i])) !== -1);
  if (kind && kinds[kind] >= n - 1 && !clash && !(q.crest || q.flag || q.face || q.who)) {
    out = {};
    q.choices.forEach((c, i) => { out[c] = res[i] && res[i].k === kind ? res[i] : { k: kind, blank: true, n: c }; });
    out._kind = kind;
  }
  _optMemo.set(q, out);
  return out;
}
function optArtHtml(r) {
  if (!r) return '';
  if (r.k === 'club') return r.blank ? '' : `<span class="opt-art opt-crest">${clubArt(r.id, 'width:100%;height:100%;', false)}</span>`;
  if (r.k === 'ctry') return r.blank ? '' : `<span class="opt-art opt-flags">${r.iso.map(c =>
    `<svg class="opt-flag" viewBox="0 0 9 6" preserveAspectRatio="none" aria-hidden="true">${FLAGS[c] || ''}</svg>`).join('')}</span>`;
  if (r.k === 'face') return r.blank ? '' : `<span class="opt-art opt-face"><img src="${r.img}" alt="" aria-hidden="true"
        onerror="this.style.visibility='hidden'" /></span>`;
  return '';
}

/* ═══════════════════════════════════════════════════
   POCKET — one answer tile

   Ten of these make the board. Each is a pocket in the album page with
   a numbered tab in the corner, and can carry the audience vote, the
   guest's pick, or the lock-in dimming, depending on what the player
   has spent.
═══════════════════════════════════════════════════ */
function badge(item, idx) {
  const isPlayer = 'img' in item;
  const isSel   = sel.has(item.id);
  const live    = sc === 'quiz' || sc === 'ask' || sc === 'lock';
  const isAns   = (sc === 'reveal') && cat.qs[qi].a.includes(item.id);
  const isWrong = (sc === 'reveal') && isSel && !isAns;
  const curQ    = (cat && cat.qs && cat.qs[qi]) || {};
  const delay   = `animation-delay:${Math.min(9, idx || 0) * 28}ms;`;

  if (hidden.has(item.id) && live) {
    return `<div class="b-gone" style="${delay}${isTextQ(curQ) ? 'min-height:44px' : 'aspect-ratio:1/1.22'}"></div>`;
  }

  let cls = 'b';
  if (sc === 'reveal') {
    if (isAns)        cls += ' b-correct';
    else if (isWrong) cls += ' b-wrong';
  } else if (sc === 'ask' || sc === 'lock') {
    cls += isSel ? ' b-locked' : ' b-faded';       // the board holds its breath
  } else if (isSel) {
    cls += ' b-sel';
  } else if (expert && expert.id === item.id) {
    cls += ' expert-ring';
  }

  /* ── a card to be placed in order: its number is the place you gave it ── */
  if (curQ.order) {
    const at = [...sel].indexOf(item.id);
    let oc = 'b b-ord' + (at >= 0 ? ' b-ord-on' : '');
    if (sc === 'reveal') oc += curQ.a[at] === item.id ? ' b-correct' : ' b-wrong';
    return `<div class="${oc}" data-id="${item.id}" style="${delay}">
      <span class="ord-n">${at >= 0 ? at + 1 : ''}</span>
      ${item.crest ? `<span class="ord-art crest-box">${clubArt(item.crest, '', false)}</span>`
        : item.face && PL.find(p => p.id === item.face) ? `<span class="ord-art ord-face"><img src="${PL.find(p => p.id === item.face).img}" alt="" aria-hidden="true" /></span>`
        : item.flag ? `<span class="ord-art ord-flag"><svg viewBox="0 0 9 6" preserveAspectRatio="none" aria-hidden="true">${FLAGS[item.flag] || ''}</svg></span>`
        : `<span class="ord-art ord-photo">${ART.hourglass(60)}</span>`}
      <span class="ord-t">${item.label}${item.sub ? `<em>${item.sub}</em>` : ''}</span>
      ${sc === 'reveal' ? `<span class="ord-y num">${yearTxt(item.y)}</span>` : ''}
    </div>`;
  }

  const tab = `<span class="tab">${NUM(idx)}</span>`;
  const votePct = poll && poll[item.id] !== undefined ? poll[item.id] : null;
  if (votePct !== null) {
    cls += ' b-voted';
    if (poll && votePct === Math.max(...Object.values(poll))) cls += ' b-top-vote';
  }
  const voteEl  = votePct === null ? '' :
    `<span class="vote-pct">${votePct}%</span>
     <span class="vote"><i style="width:${votePct}%;animation-delay:${(idx || 0) * 45}ms;"></i></span>`;
  const longCls = item.n.length > 15 ? ' tile-name-long' : '';

  if (isTextQ(curQ)) {
    const oa = optArtFor(curQ), art = oa ? optArtHtml(oa[item.id]) : '';
    return `<div class="${cls} b-text${art ? ' b-art' : ''}" data-id="${item.id}" style="${delay}">
      ${tab}${voteEl}${art}<span class="tile-name${longCls}">${item.n}</span></div>`;
  }

  if (isPlayer) {
    return `<div class="${cls} b-fig" data-id="${item.id}" style="${delay}">
      ${tab}${voteEl}
      ${figurinha(item, 'sm', { decorative: true, sub: '', noFlag: curQ._noFlag,
                                hideCtry: curQ._hideCtry, hideEra: curQ._hideEra })}
    </div>`;
  }

  // ── Polity pocket ──
  return `<div class="${cls} b-crest" data-id="${item.id}" style="${delay}">
    ${tab}${voteEl}
    <div class="crest-box">${clubArt(item.id, '', false)}</div>
    <span class="tile-name tile-club${longCls}">${item.n}</span>
  </div>`;
}

/* ═══════════════════════════════════════════════════
   THE PICTURE ON A QUESTION CARD
   Every question carries one: a figure's face, a polity's emblem, a flag, a
   monument, or the drawn vignette of its subject. None of them may be the
   answer — merge_questions.py refuses a row that does that, and the
   generated ones are checked here.
═══════════════════════════════════════════════════ */
function _answerIsFace(q, id) { return (q.a || []).includes(id); }
function _answerNames(q, name) {
  const F = _fold, n = F(name || '');
  return !!n && (q.a || []).some(a => F(a) === n || F((optResolve(a) || {}).id || '') === F(name));
}
function faceHtml(img) {
  return `<div class="qart qart-face print"><img src="${img}" alt="" aria-hidden="true"
        onerror="this.parentElement.style.display='none'" /></div>`;
}
function questionArtRaw(q) {
  if (q.order) return '';   // the cards themselves are the question
  if (q.stad) {
    return STAD_IMGS[q.stad]
      ? `<div class="qart qart-wide print"><img src="${STAD_IMGS[q.stad]}" alt="" aria-hidden="true"
          onerror="this.parentElement.outerHTML='<div class=\\'qart qart-wide qart-draw\\'>' + ART.column(104) + '</div>'" /></div>`
      : `<div class="qart qart-wide print qart-ink">${ART.column(104)}</div>`;
  }
  if (q.face) {
    const fp = PL.find(x => x.img === q.face);
    if (!fp || !_answerIsFace(q, fp.id)) return faceHtml(q.face);
  }
  if (q.who) {
    const w = PL.find(p => p.id === q.who);
    if (w && w.img && !_answerIsFace(q, w.id)) return faceHtml(w.img);
  }
  if (q.crest && !(q.a || []).includes(q.crest) && !_answerNames(q, clubName(q.crest)))
    return `<div class="qart qart-crest${q._crestIsQ ? ' qart-hero' : ''}">${
      clubArt(q.crest, 'max-width:100%;max-height:100%;object-fit:contain;', true)}</div>`;
  if (q.flag && FLAGS[q.flag] && !_answerNames(q, CTRY_NAME[q.flag]) &&
      !(q.type === 'player' && (q.a || []).some(id => (PL.find(p => p.id === id) || {}).ctry === q.flag)))
    return `<div class="qart qart-flag" role="img" aria-label="${CTRY_NAME[q.flag] || q.flag}">${qFlagInner(q.flag)}</div>`;
  if (q.path && q.path.length) {
    const shown = q.path.filter(c => CL.some(x => x.id === c)).slice(0, 4);
    if (shown.length >= 2)
      return `<div class="qart qart-path" role="img" aria-label="Estados da trajetória">
        ${shown.map((c, i) => `<span class="qp crest-box" style="animation-delay:${i * 90}ms">${
          clubArt(c, '', false)}</span>`).join('')}</div>`;
    return `<div class="qart qart-wide print qart-ink">${ART.map(104)}</div>`;
  }
  if (q.clues || /\bquem sou eu\b/i.test(q.t || ''))
    return `<div class="qart qart-wide print qart-ink" role="img" aria-label="Busto misterioso">${ART.bust(104)}</div>`;
  const key = q.icon || CAT_ART[(q._cat && q._cat.id) || ''] || 'scroll';
  return `<div class="qart qart-wide print qart-ink" role="img" aria-label="Ilustração">${(QICON[key] || QICON.scroll)(104)}</div>`;
}

/* The frame is the era, never the picture: a cream mat with a sepia rule for
   the ancient and medieval world, the cream card of the printed schoolbook
   up to the Great War, and a clean modern mount after it. */
function qEra(q) {
  const m = /(^|\D)(\d{3,4})(\s*a\.?\s?C\.?)?(\D|$)/.exec(q.t || '');
  if (!m) return '';
  const y = m[3] ? -(+m[2]) : +m[2];
  return y < 1500 ? 'era-vintage' : y < 1914 ? 'era-retro' : 'era-modern';
}
function questionArt(q) {
  const html = questionArtRaw(q);
  const era = qEra(q);
  return era ? html.replace('class="qart', `class="qart ${era}`) : html;
}
