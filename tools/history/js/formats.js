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

   Every one of them arrives with its own little moment (the ink writing the
   sentence, the swords crossing, the paper spinning in, the stamp coming
   down) and plays it once, when the question is dealt — never on a repaint.
═══════════════════════════════════════════════════ */

/* the strip a question carries, if any: it is the question's picture */
const hasStrip = q => !!(q && (q.quote || q.battle || q.line || q.news));
function qStrip(q) {
  if (!q) return '';
  if (q.quote)  return quoteStrip(q.quote, q);
  if (q.battle) return battleStrip(q.battle, q);
  if (q.line)   return lineStrip(q.line, q);
  if (q.news)   return newsStrip(q.news, q);
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
function quoteStrip(st, q) {
  const words = String(st.q || '').split(/\s+/);
  const ink = words.map((w, i) => `<i style="animation-delay:${(i * 0.055 + 0.15).toFixed(3)}s">${w}</i>`).join(' ');
  const ctx = maskAnswer(st.ctx || '', q);
  /* at the reveal the sheet is signed */
  const sign = revealedSlot(q);
  return `<div class="qstrip hs-quote" role="img" aria-label="Citação: ${String(st.q || '').replace(/"/g, '&quot;')}">
    <span class="hs-quill">${QUILL}</span>
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

/* ── a linhagem ── a succession reads left to right with arrows; a council
   or an alliance ("grupo") is joined by plus signs */
function lineStrip(st, q) {
  const grp = st.kind === 'grupo';
  const shown = revealedSlot(q);
  const rows = (st.rows || []).map(n => n === '?' && shown ? '\u0001' + shown : n);
  const cells = rows.map((n, i) => `${i ? `<span class="hs-join" style="animation-delay:${(i * .14).toFixed(2)}s">${grp ? '+' : '→'}</span>` : ''}
    <span class="hs-link${n === '?' ? ' hs-link-q' : ''}${n[0] === '\u0001' ? ' hs-link-shown' : ''}" style="animation-delay:${(i * .14 + .05).toFixed(2)}s">
      ${n === '?' ? '<span class="hs-mark hs-q">?</span>' : (n = n.replace('\u0001', ''), (() => { const r = optResolve(n); return r && r.k === 'face' ? `<span class="hs-mark hs-face"><img src="${r.img}" alt="" aria-hidden="true" onerror="this.style.visibility='hidden'" /></span>` : `<span class="hs-mark hs-ink">${bustGlyph(n, st.era || 'med')}</span>`; })())}
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

/* ── fato ou mito ── the two slips are rubber stamps */
function stampSVG(kind) {
  const fato = kind === 'fato';
  const ink = fato ? '#2F6B45' : '#9B2226';
  return `<svg viewBox="0 0 64 40" aria-hidden="true"><g transform="rotate(${fato ? -6 : 5} 32 20)">
    <rect x="3" y="5" width="58" height="30" rx="5" fill="none" stroke="${ink}" stroke-width="2.6"/>
    <rect x="6.6" y="8.6" width="50.8" height="22.8" rx="3" fill="none" stroke="${ink}" stroke-width="1"/>
    <text x="32" y="26.4" text-anchor="middle" font-family="Archivo, system-ui" font-weight="800" font-size="15" letter-spacing="2" fill="${ink}">${fato ? 'FATO' : 'MITO'}</text></g></svg>`;
}

/* ── the moment each format arrives with ── */
function stripFx(q) {
  if (!q || sc !== 'quiz') return;
  if (q.quote) snd.quill();
  else if (q.battle) snd.clang();
  else if (q.news) snd.extra();
  else if (q.line) snd.chain();
  else if (q.duel || q.myth) snd.duel();
}
/* the stamp coming down on the right slip, at the reveal */
function revealFx(q) {
  if (q && q.myth) setTimeout(() => snd.stamp(), 120);
}

/* ── their sounds ── */
Object.assign(snd, {
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
  /* the rubber stamp coming down on the desk */
  stamp() { tone(92, .22, { type: 'sine', vol: .14, to: 48 }); noise(.08, { type: 'lowpass', freq: 600, q: .8, vol: .09, attack: .002 });
            crackle(.08, { grains: 6, vol: .015, delay: .03 }); },
});
