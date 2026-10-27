/* ═══════════════════════════════════════════════════
   HISTORY'S OWN WAYS TO ASK

   Futebol Quiz had two pictures that were the question itself: a scoreboard
   with one side hidden and a team-sheet with one name missing. History has
   its own, and each is the picture on its card, in place of the vignette:

     · a citação  — a sentence written out on a sheet; name who said it
     · a batalha  — two banners and the crossed swords, one side hidden
     · a linhagem — a dynasty, a succession or a council, one link missing
     · a manchete — the front page of the day it happened
     · o duelo    — only two cards on the board: which came first?
     · fato ou mito — something everybody repeats, stamped true or false
     · a charada  — a story told in pictures, one after another
     · o detalhe  — a portrait seen through a magnifying glass; the reveal
                    pulls back to the whole face
     · o intruso  — four on the board and three of them alike; the reveal
                    says what the three share and stamps the odd one

   Every one of them arrives with its own little moment (the ink writing the
   sentence, the swords crossing, the paper spinning in, the stamp coming
   down) and plays it once, when the question is dealt — never on a repaint.
═══════════════════════════════════════════════════ */

/* the strip a question carries, if any: it is the question's picture */
const hasStrip = q => !!(q && (q.quote || q.battle || q.line || q.news || q.rebus || q.detail || q.odd || q.anachro));
function qStrip(q) {
  if (!q) return '';
  if (q.quote)  return quoteStrip(q.quote, q);
  if (q.battle) return battleStrip(q.battle, q);
  if (q.line)   return lineStrip(q.line, q);
  if (q.news)   return newsStrip(q.news, q);
  if (q.rebus)  return rebusStrip(q.rebus, q);
  if (q.detail) return detailStrip(q.detail, q);
  if (q.odd)    return oddStrip(q.odd, q);
  if (q.anachro) return anachroStrip(q.anachro, q);
  return '';
}

/* Words a strip prints under its picture must not name the answer while the
   question is open: they are masked until the reveal. */
function maskAnswer(text, q) {
  let x = String(text || '');
  if (!x || !q || sc === 'reveal') return x;
  (q.a || []).forEach(a => {
    const nm = q.type === 'player' ? (PL.find(p => p.id === a) || {}).n : q.type === 'txt' ? a : clubName(a);
    if (!nm) return;
    const parts = [nm].concat(String(nm).split(/\s+/).filter(w => w.length >= 5));
    parts.forEach(w => { x = x.replace(new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '???'); });
  });
  return x;
}

/* What fills the hidden '?' once the answer is shown: the answer's own id
   (a state, a figure) or its words. */
function revealedSlot(q) {
  if (!q || sc !== 'reveal' || !(q.a || []).length) return null;
  const a = q.a[0];
  if (q.type === 'player') { const p = PL.find(x => x.id === a); return p ? p.n : a; }
  return a;   // a polity id (stripMark draws its brasão) or the text answer
}

/* One side of a battle, one link of a line: a state's brasão, a country's
   flag, a figure's face — or a drawn shield with its initials. */
function stripMark(name) {
  if (!name || name === '?') return `<span class="hs-mark hs-q">?</span>`;
  const c = CL.find(x => x.id === name);
  if (c) return `<span class="hs-mark hs-crest">${clubArt(c.id, '', false)}</span>`;
  if (FLAGS[name] && CTRY_NAME[name]) return `<span class="hs-mark hs-flag"><svg viewBox="0 0 9 6" preserveAspectRatio="none" aria-hidden="true">${FLAGS[name]}</svg></span>`;
  const r = optResolve(name);
  if (r && r.k === 'club') return `<span class="hs-mark hs-crest">${clubArt(r.id, '', false)}</span>`;
  if (r && r.k === 'ctry') return `<span class="hs-mark hs-flag"><svg viewBox="0 0 9 6" preserveAspectRatio="none" aria-hidden="true">${FLAGS[r.iso[0]] || ''}</svg></span>`;
  if (r && r.k === 'face') return `<span class="hs-mark hs-face"><img src="${r.img}" alt="" aria-hidden="true" onerror="this.style.visibility='hidden'" /></span>`;
  return `<span class="hs-mark hs-ink">${shieldGlyph(name)}</span>`;
}
const stripName = n => {
  if (!n || n === '?') return '???';
  const c = CL.find(x => x.id === n);
  if (c) return c.n;
  if (CTRY_NAME[n]) return CTRY_NAME[n];
  return n;
};

/* ── a citação ── the sentence is inked in word by word */
const QUILL = `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M33 4C22 7 13 17 9.4 31l2 1C16 20 24 12 33 4Z" fill="#F4ECD8" stroke="#2A1D10" stroke-width=".9" stroke-linejoin="round"/>
  <path d="M33 4c-4 7-9 11-15 13M30 8c-3 4-7 7-11 8.6M26 12c-2 3-5 5-8 6" fill="none" stroke="#2A1D10" stroke-width=".6" opacity=".6"/>
  <path d="M9.4 31 7 37" stroke="#2A1D10" stroke-width="1.4" stroke-linecap="round"/><circle cx="6.6" cy="37.6" r="1.1" fill="#2A1D10"/></svg>`;
/* What the sentence is written on. A writer may say (kind), otherwise it is
   read from the speaker and the context: the ancients carved theirs in stone,
   the navigators wrote in a ship's log, and a letter is a letter. */
function quoteKind(st, q) {
  if (st.kind) return st.kind;
  const ctx = _fold(st.ctx || '');
  if (/\b(carta|bilhete|escreveu a |escrita a )/.test(ctx)) return 'carta';
  const p = q && q.type === 'player' ? PL.find(x => x.id === (q.a || [])[0]) : null;
  if (p && p.era && p.era[0] < 400) return 'pedra';
  if ((p && p.pos === 'EXP') || /\b(diario de bordo|bordo|viagem|expedicao)\b/.test(ctx)) return 'diario';
  return '';
}
const COMPASS = `<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" fill="#F4ECD8" stroke="#2A1D10" stroke-width="1"/>
  <circle cx="20" cy="20" r="13.5" fill="none" stroke="#8A6A2C" stroke-width=".6"/>
  <path d="M20 4 23 20 20 23 17 20Z" fill="#7B1E3A"/><path d="M20 36 17 20 20 17 23 20Z" fill="#2A1D10"/>
  <path d="M4 20 20 17 23 20 20 23Z" fill="#8A6A2C" opacity=".7"/><path d="M36 20 20 23 17 20 20 17Z" fill="#8A6A2C" opacity=".7"/>
  <circle cx="20" cy="20" r="1.6" fill="#F4ECD8" stroke="#2A1D10" stroke-width=".5"/></svg>`;
const WAX = `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 3c4 0 5 3 8 3.6s5.6-.8 7 2 .2 5.2 1 8 3.4 4.2 2.6 7-3.8 3.2-5 5.8-.4 5.6-3 7-5-.4-7.8.2-4.4 2.6-7.2 1.8-3-3.6-5.6-4.8-5.6-.4-7-3 .4-5-.2-7.8S.8 18.6 1.6 15.8s3.8-3.2 5-5.8.4-5.6 3-7 5 .4 7.8-.2S17 3 20 3Z" fill="#8E2A2A"/>
  <circle cx="20" cy="20" r="11" fill="none" stroke="#5E1616" stroke-width="1.2"/>
  <text x="20" y="25" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-style="italic" font-weight="700" font-size="14" fill="#F3D9B8">H</text></svg>`;
function quoteStrip(st, q) {
  const kind = quoteKind(st, q);
  const words = String(st.q || '').split(/\s+/);
  /* Complete a frase: a word left out of the line, written in at the reveal (and then the sheet is not signed with it) */
  const blank = /_{3,}/.test(st.q || ''), fill = blank ? revealedSlot(q) : null;
  const ink = words.map((w, i) => `<i style="animation-delay:${(i * 0.055 + 0.15).toFixed(3)}s">${blank ? w.replace(/_{3,}/,
    fill ? `<span class="hs-blank is-filled">${fill}</span>` : '<span class="hs-blank"></span>') : w}</i>`).join(' ');
  const ctx = maskAnswer(st.ctx || '', q);
  /* at the reveal the sheet is signed */
  const sign = blank ? null : revealedSlot(q);
  const mark = kind === 'diario' ? COMPASS : kind === 'carta' ? WAX : kind === 'pedra' ? '' : QUILL;
  return `<div class="qstrip hs-quote${kind ? ' hs-quote-' + kind : ''}" role="img" aria-label="Citação: ${String(st.q || '').replace(/_{3,}/g, fill || 'lacuna').replace(/"/g, '&quot;')}">
    ${kind === 'pedra' ? '' : `<span class="hs-quill">${mark}</span>`}
    <blockquote class="hs-q-text">${ink}</blockquote>
    ${ctx ? `<span class="hs-ctx">— ${ctx}</span>` : ''}
    ${sign ? `<span class="hs-sign">${sign}</span>` : ''}</div>`;
}

/* ── a batalha ── two banners, crossed swords, one side hidden */
const SWORDS = `<svg viewBox="0 0 60 44" aria-hidden="true">
  <g class="hs-sw hs-sw-l"><path d="M10 40 44 6l3 2.4L13 42Z" fill="#E4E6EA" stroke="#1A1410" stroke-width="1"/><path d="M8 33l9 9M6.6 38.6l3 3" stroke="#C9A04E" stroke-width="3.2" stroke-linecap="round"/></g>
  <g class="hs-sw hs-sw-r"><path d="M50 40 16 6l-3 2.4L47 42Z" fill="#D4D7DC" stroke="#1A1410" stroke-width="1"/><path d="M52 33l-9 9M53.4 38.6l-3 3" stroke="#C9A04E" stroke-width="3.2" stroke-linecap="round"/></g>
  <circle class="hs-spark" cx="30" cy="22" r="5" fill="#FFE9A8"/></svg>`;
function battleStrip(st, q) {
  const x = maskAnswer(st.x || '', q);
  const shown = revealedSlot(q);
  const side = n => n === '?' && shown
    ? `<span class="hs-side hs-side-shown">${stripMark(shown)}<b>${stripName(shown)}</b></span>`
    : `<span class="hs-side${n === '?' ? ' hs-side-q' : ''}">${stripMark(n)}<b>${stripName(n)}</b></span>`;
  return `<div class="qstrip hs-battle" role="img" aria-label="Batalha">
    <span class="hs-lbl">${st.lbl || ''}</span>
    <div class="hs-row">${side(st.a)}<span class="hs-swords">${SWORDS}</span>${side(st.b)}</div>
    ${x ? `<span class="hs-x">${x}</span>` : ''}</div>`;
}

/* One link of a line: a figure's face, a state's brasão, a country's flag —
   the Security Council is five flags, not five strangers — or, for a link
   that is none of these, a bust in the clothes of its age when the line is
   of people, and the engraving of its kind otherwise (a regime, a dynasty). */
function lineMark(n, q, st) {
  const r = optResolve(n) || (() => {
    /* "Tang" in a line of Chinese dynasties is the Dinastia Tang */
    const f = _fold(n), c = CL.find(x => _fold(x.n) === 'dinastia ' + f || _fold(x.n) === 'imperio ' + f);
    return c ? { k: 'club', id: c.id } : null; })();
  if (r && r.k === 'face') return `<span class="hs-mark hs-face"><img src="${r.img}" alt="" aria-hidden="true" onerror="this.style.visibility='hidden'" /></span>`;
  if (r && r.k === 'club') return `<span class="hs-mark hs-crest">${clubArt(r.id, '', false)}</span>`;
  if (r && r.k === 'ctry') return `<span class="hs-mark hs-flag"><svg viewBox="0 0 9 6" preserveAspectRatio="none" aria-hidden="true">${FLAGS[r.iso[0]] || ''}</svg></span>`;
  const topic = optTopic('', _fold((q && q.t) || ''));
  return topic && topic !== 'person' && topic !== 'title'
    ? `<span class="hs-mark hs-ink">${topicGlyph(topic, n, st.era || 'med')}</span>`
    : `<span class="hs-mark hs-ink">${bustGlyph(n, st.era || 'med')}</span>`;
}

/* ── a linhagem ── a succession reads left to right with arrows; a council
   or an alliance ("grupo") is joined by plus signs */
function lineStrip(st, q) {
  const grp = st.kind === 'grupo';
  const shown = revealedSlot(q);
  const rows = (st.rows || []).map(n => n === '?' && shown ? '\u0001' + shown : n);
  const cells = rows.map((n, i) => `${i ? `<span class="hs-join" style="animation-delay:${(i * .14).toFixed(2)}s">${grp ? '+' : '→'}</span>` : ''}
    <span class="hs-link${n === '?' ? ' hs-link-q' : ''}${n[0] === '\u0001' ? ' hs-link-shown' : ''}" style="animation-delay:${(i * .14 + .05).toFixed(2)}s">
      ${n === '?' ? '<span class="hs-mark hs-q">?</span>' : (n = n.replace('\u0001', ''), lineMark(n, q, st))}
      <b>${n === '?' ? '???' : n}</b>${st.sub && st.sub[i] ? `<em>${st.sub[i]}</em>` : ''}</span>`).join('');
  return `<div class="qstrip hs-line${grp ? ' hs-line-grp' : ''}" role="img" aria-label="${grp ? 'Grupo' : 'Linhagem'}">
    <span class="hs-lbl">${st.t || ''}</span><div class="hs-chain">${cells}</div></div>`;
}

/* ── a manchete ── the front page of the day, spinning in like a newsreel */
function newsStrip(st, q) {
  const sub = maskAnswer(st.sub || '', q);
  return `<div class="qstrip hs-news" role="img" aria-label="Manchete de jornal">
    <div class="hs-mast"><span>${st.paper || 'A Gazeta'}</span></div>
    <div class="hs-dateline"><span>${st.city || ''}</span><span>${st.date ? maskAnswer(st.date, q) : 'Edição extra'}</span><span>${st.price || ''}</span></div>
    <p class="hs-head">${maskAnswer(st.h || '', q)}</p>
    ${sub ? `<p class="hs-sub">${sub}</p>` : ''}
    <div class="hs-cols" aria-hidden="true"><i></i><i></i><i></i></div></div>`;
}

/* ── a charada ── the pictures come up one by one on a puzzle page, the way
   a rebus is read; the label above may give the kind of thing to guess */
function rebusStrip(st, q) {
  const e = st.e || [];
  const pics = e.map((x, i) => `${i ? '<span class="hs-rb-plus" aria-hidden="true">+</span>' : ''}<span class="hs-rb-e" style="animation-delay:${(i * .24 + .12).toFixed(2)}s">${x}</span>`).join('');
  return `<div class="qstrip hs-rebus" role="img" aria-label="Charada em figuras: ${e.join(' ')}">
    <span class="hs-lbl">${st.k ? maskAnswer(st.k, q) : 'Charada em figuras'}</span>
    <div class="hs-rb-row">${pics}</div></div>`;
}

/* ── o detalhe ── a famous face, close up, under a brass magnifying glass.
   x, y: where the glass is held (per cent of the picture as framed); z: how
   close. At the reveal the glass pulls back and the whole face is there. */
function detailStrip(st, q) {
  const p = PL.find(x => x.id === st.who);
  if (!p || !p.img) return '';
  const shown = sc === 'reveal';
  const z = st.z || 3, x = st.x == null ? 50 : st.x, y = st.y == null ? 30 : st.y;
  return `<div class="qstrip hs-detail${shown ? ' is-shown' : ''}" role="img" aria-label="${shown ? 'O retrato inteiro: ' + p.n : 'Um detalhe de retrato, visto de perto'}">
    <span class="hs-lbl">${shown ? p.n : 'Um detalhe, de perto'}</span>
    <span class="hs-lens" style="--z:${z};--x:${x}%;--y:${y}%"><img src="${p.img}" alt="" aria-hidden="true" onerror="this.style.visibility='hidden'" /><i aria-hidden="true"></i></span></div>`;
}

/* ── o intruso ── what the three share is said only at the reveal */
const ODD_GLASS = `<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="16.5" cy="16.5" r="10.5" fill="#F4ECD8" stroke="#2A1D10" stroke-width="2.2"/>
  <path d="M24.4 24.4 35 35" stroke="#2A1D10" stroke-width="4.4" stroke-linecap="round"/><path d="M24.4 24.4 35 35" stroke="#C9A04E" stroke-width="2" stroke-linecap="round"/>
  <text x="16.5" y="21.6" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="14" fill="#7B1E3A">?</text></svg>`;
function oddStrip(st, q) {
  const shown = sc === 'reveal';
  return `<div class="qstrip hs-odd${shown ? ' is-shown' : ''}" role="note">
    <span class="hs-odd-ic">${ODD_GLASS}</span>
    <span class="hs-odd-t">${shown ? `<b>Os outros três</b> ${st.k}.` : '<b>Três destes têm algo em comum.</b> Um não tem: qual?'}</span></div>`;
}

/* ── fato ou mito ── the two slips are rubber stamps */
function stampSVG(kind) {
  const fato = kind === 'fato';
  const ink = fato ? '#2F6B45' : '#9B2226';
  return `<svg viewBox="0 0 64 40" aria-hidden="true"><g transform="rotate(${fato ? -6 : 5} 32 20)">
    <rect x="3" y="5" width="58" height="30" rx="5" fill="none" stroke="${ink}" stroke-width="2.6"/>
    <rect x="6.6" y="8.6" width="50.8" height="22.8" rx="3" fill="none" stroke="${ink}" stroke-width="1"/>
    <text x="32" y="26.4" text-anchor="middle" font-family="Archivo, system-ui" font-weight="800" font-size="15" letter-spacing="2" fill="${ink}">${fato ? 'FATO' : 'MITO'}</text></g></svg>`;
}

/* ── um anacronismo ── a scene of its time and place, four things pinned on it by number (the numbers of
   the slips below); one of them could not have been there. At the reveal it is ringed in red and stamped,
   the others ticked. The pins follow the board's own order, so pin 3 is always slip 03. */
const AN_AT = [[15, 31], [85, 31], [15, 75], [85, 75]];
function anachroStrip(st, q) {
  const items = st.items || [], rev = sc === 'reveal', a = (q.a || [])[0];
  const names = items.map(it => it.n);
  const order = (typeof disp !== 'undefined' && disp && disp.length === items.length && disp.every(d => names.includes(d.id)))
    ? disp.map(d => items.find(it => it.n === d.id)) : items;
  const pic = (sceneSvg({ id: st.scene }, 360) || '')
    .replace('<svg ', '<svg preserveAspectRatio="xMidYMid slice" ').replace('style="display:block;max-width:100%;height:auto;"', 'style="display:block;width:100%;height:100%"');
  return `<div class="qstrip hs-anachro" role="img" aria-label="Cena: ${_esc(st.place || '')}. Objetos: ${order.map((it, k) => (k + 1) + ', ' + _esc(it.n)).join('; ')}">
    <span class="hs-an-scene">${pic}
      <span class="hs-an-place">${ICON.calendar('currentColor', 11)} ${st.place || ''}</span>
      ${order.map((it, k) => `<span class="hs-an-st${rev ? (it.n === a ? ' is-bad' : ' is-ok') : ''}" style="left:${AN_AT[k][0]}%;top:${AN_AT[k][1]}%;animation-delay:${(k * .16 + .2).toFixed(2)}s">
        <b>${it.e}</b><i>${k + 1}</i></span>`).join('')}
      ${rev ? '<span class="hs-an-stamp">Anacronismo!</span>' : ''}
    </span></div>`;
}

/* ── the moment each format arrives with ── */
function stripFx(q) {
  if (!q || sc !== 'quiz') return;
  if (q.quote) snd.quill();
  else if (q.battle) snd.clang();
  else if (q.news) snd.extra();
  else if (q.line) snd.chain();
  else if (q.duel || q.myth) snd.duel();
  else if (q.rebus) snd.pops((q.rebus.e || []).length);
  else if (q.detail) snd.lens();
  else if (q.odd) snd.oddOne();
  else if (q.anachro) snd.warp();
}
/* the stamp coming down on the right slip, at the reveal; the glass pulling back */
function revealFx(q) {
  if (q && (q.myth || q.odd)) setTimeout(() => snd.stamp(), q.odd ? 260 : 120);
  if (q && q.detail) snd.unzoom();
  if (q && q.anachro) setTimeout(() => { snd.stamp(); snd.warp(true); }, 280);
}

/* ── their sounds ── */
Object.assign(snd, {
  /* a slip in time: a falling whistle over a crackle, and back up again at the reveal */
  warp(back) {
    tone(back ? 260 : 980, .55, { type: 'sine', vol: .028, to: back ? 900 : 250 });
    tone(back ? 390 : 1470, .5, { type: 'triangle', vol: .012, to: back ? 1350 : 370, delay: .04 });
    crackle(.4, { grains: 12, vol: .012, delay: .05 });
  },
  /* a nib on laid paper: three quick scratches */
  quill() { [0, .16, .34].forEach((d, i) => { crackle(.12, { grains: 10, vol: .02, delay: d });
            noise(.09, { type: 'bandpass', freq: 3200 + i * 300, q: 2.2, vol: .02, attack: .01, delay: d }); }); },
  /* two blades meeting: a bright ring with inharmonic partials, twice */
  clang() { [0, .5].forEach((d, k) => { const v = k ? .03 : .045;
            [1840, 2710, 3950, 5230].forEach((f, i) => tone(f * (k ? 1.04 : 1), .55 - i * .08, { type: 'sine', vol: v / (i + 1), delay: d + .02 }));
            noise(.04, { type: 'highpass', freq: 3000, q: .7, vol: v * 1.4, attack: .001, delay: d }); }); },
  /* the newsreel: a sheet whipping round and the presses' rattle */
  extra() { noise(.7, { type: 'bandpass', freq: 500, to: 2600, q: .6, vol: .05, attack: .15 });
            crackle(.4, { grains: 22, vol: .016, delay: .35 });
            [0, 1, 2, 3, 4, 5].forEach(i => noise(.02, { type: 'lowpass', freq: 1200, q: 1, vol: .03, attack: .001, delay: .78 + i * .07 })); },
  /* a chain being laid out, link by link */
  chain() { [0, 1, 2, 3, 4].forEach(i => { tone(1500 + i * 120, .06, { type: 'sine', vol: .022, delay: .05 + i * .14 });
            noise(.015, { freq: 4200, q: 3, vol: .02, attack: .001, delay: .05 + i * .14 }); }); },
  /* the two corners of the ring: a drum and a low horn */
  duel() { tone(98, .5, { type: 'sine', vol: .11, to: 62 }); noise(.12, { type: 'lowpass', freq: 300, q: .8, vol: .06 });
           tone(146.83, .7, { type: 'sawtooth', vol: .012, delay: .18 }); tone(220, .6, { type: 'triangle', vol: .02, delay: .2 }); },
  /* the charada: each picture comes up with a soft pop, in time with it */
  pops(n) { for (let i = 0; i < Math.min(n || 3, 6); i++) { const d = i * .24 + .14;
            tone(520 + i * 70, .09, { type: 'sine', vol: .05, to: 860 + i * 90, delay: d });
            noise(.02, { type: 'bandpass', freq: 2400, q: 2, vol: .025, attack: .001, delay: d }); } },
  /* the magnifying glass: a glint on the lens and the air of it being raised */
  lens() { noise(.45, { type: 'bandpass', freq: 700, to: 2200, q: .7, vol: .03, attack: .12 });
           [2093, 2637, 3136].forEach((f, i) => tone(f, .7 - i * .12, { type: 'sine', vol: .016 / (i + 1), delay: .22 + i * .05 })); },
  /* …and pulled back, as the whole face comes into view */
  unzoom() { noise(.5, { type: 'bandpass', freq: 2200, to: 500, q: .7, vol: .03, attack: .05 });
             kalimba(659.25, { vol: .05, delay: .35 }); kalimba(987.77, { vol: .045, delay: .45, dur: 1.1 }); },
  /* o intruso: three taps alike, and one that is not */
  oddOne() { [0, .17, .34].forEach(d => { noise(.03, { type: 'lowpass', freq: 1100, q: .8, vol: .05, attack: .002, delay: d }); tone(440, .08, { type: 'sine', vol: .03, delay: d }); });
             tone(932.33, .2, { type: 'triangle', vol: .04, delay: .58 }); noise(.03, { type: 'bandpass', freq: 3200, q: 2, vol: .03, attack: .001, delay: .58 }); },
  /* the rubber stamp coming down on the desk */
  stamp() { tone(92, .22, { type: 'sine', vol: .14, to: 48 }); noise(.08, { type: 'lowpass', freq: 600, q: .8, vol: .09, attack: .002 });
            crackle(.08, { grains: 6, vol: .015, delay: .03 }); },
});
