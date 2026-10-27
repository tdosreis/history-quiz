
/* ═══════════════════════════════════════════════════
   THE ROUND'S CERTIFICATE
   A round ends on a sheet: the score inside a laurel, a title earned
   (Aprendiz up to Mestre da História) and a wax seal pressed on its corner
   with a thud. The seal's wax and its emblem rise with the title. A review
   round is practice, not an exam: it gets the sheet without the title.
═══════════════════════════════════════════════════ */
const END_TITLES = [
  { min: 90, surv: 20, t: 'Mestre da História', ic: 'crown', wax: '#7A1F2B' },
  { min: 70, surv: 12, t: 'Historiador', ic: 'book', wax: '#8A4A16' },
  { min: 50, surv: 7, t: 'Cronista', ic: 'quill', wax: '#3E5B2F' },
  { min: 30, surv: 3, t: 'Escriba', ic: 'scroll', wax: '#3F4A6B' },
  { min: 0, surv: 0, t: 'Aprendiz', ic: 'hourglass', wax: '#5F574F' },
];
/* by the share of right answers; a Mata-mata, which has no total, by how many in a row */
const endTitle = (pct, run) => END_TITLES.find(e => run != null ? run >= e.surv : pct >= e.min);
let _endSealed = false;

/* the laurel: two branches of leaves round the score, open at the top, tied at the bottom */
let _laurel = '';
function laurelSvg() {
  if (_laurel) return _laurel;
  const cx = 100, cy = 54, rx = 86, ry = 44, P = (a, r) => [cx + rx * r * Math.cos(a), cy + ry * r * Math.sin(a)];
  const rad = d => d * Math.PI / 180, f = n => n.toFixed(1);
  let g = '';
  const a0 = 104, a1 = 232;
  const [sx, sy] = P(rad(a0), 1), [ex, ey] = P(rad(a1), 1);
  g += `<path d="M${f(sx)} ${f(sy)}A${rx} ${ry} 0 0 1 ${f(ex)} ${f(ey)}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`;
  for (let i = 0, a = a0 + 6; a <= a1 - 2; a += 13, i++) {
    const t = rad(a), [x, y] = P(t, 1);
    /* along the branch, towards its tip, then turned out or in */
    const along = Math.atan2(ry * Math.cos(t), -rx * Math.sin(t)) * 180 / Math.PI;
    const turn = i % 2 ? 34 : -30, sz = 1 - (a - a0) / (a1 - a0) * .28;
    g += `<path transform="translate(${f(x)} ${f(y)}) rotate(${f(along + turn)}) scale(${sz.toFixed(2)})" d="M0 0Q6-4.2 14 0Q6 4.2 0 0Z" fill="currentColor"/>`;
  }
  /* the tip: one last leaf along the branch */
  const at = Math.atan2(ry * Math.cos(rad(a1)), -rx * Math.sin(rad(a1))) * 180 / Math.PI;
  g += `<path transform="translate(${f(ex)} ${f(ey)}) rotate(${f(at)}) scale(.7)" d="M0 0Q6-4 14 0Q6 4 0 0Z" fill="currentColor"/>`;
  _laurel = `<svg class="end-laurel" viewBox="0 0 200 106" aria-hidden="true">
    <g>${g}</g><g transform="translate(200 0) scale(-1 1)">${g}</g>
    <path d="M100 99l-9 7M100 99l9 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="100" cy="98" r="3.2" fill="currentColor"/></svg>`;
  return _laurel;
}

/* the wax: a blob with a scalloped rim, a ring pressed into it, the emblem in the middle */
let _waxRim = '';
function waxSeal(ti, still) {
  if (!_waxRim) {
    const n = 18, r1 = 33, r2 = 37.5, pt = (a, r) => [40 + r * Math.cos(a), 40 + r * Math.sin(a)].map(v => v.toFixed(2)).join(' ');
    let d = 'M' + pt(0, r1);
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, b = (i + 1) / n * Math.PI * 2; d += 'Q' + pt((a + b) / 2, r2) + ' ' + pt(b, r1); }
    _waxRim = d + 'Z';
  }
  return `<span class="end-seal${still ? ' is-still' : ''}" style="--wax:${ti.wax}" aria-hidden="true">
    <svg viewBox="0 0 80 80"><defs><radialGradient id="wax-hl" cx="36%" cy="30%" r="70%">
      <stop offset="0" stop-color="#fff" stop-opacity=".34"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity=".3"/></radialGradient></defs>
      <path d="${_waxRim}" fill="var(--wax)"/><path d="${_waxRim}" fill="url(#wax-hl)"/>
      <circle cx="40" cy="40" r="24.5" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="2.4"/>
      <circle cx="40" cy="40" r="24.5" fill="none" stroke="rgba(255,240,215,.22)" stroke-width="1" transform="translate(-.8 -.8)"/></svg>
    <span class="end-seal-ic">${(ICON[ti.ic] || ICON.star)('#F3DDB0', 22)}</span></span>`;
}

/* ═══════════════════════════════════════════════════
   SMALL CELEBRATIONS — a streak called out, a record rung in, a badge chimed
   Paint on the fx layer (skipped when the phone asks for less motion), sounds
   from the same voices as the rest (silent when muted), and a short buzz in
   the hand on a phone that has one (only with the sound on: one switch for
   both, which is what players expect of it).
═══════════════════════════════════════════════════ */
Object.assign(snd, {
  /* a run of right answers: the pentatonic climbs past the answer's own chord, a bell on top */
  streak(k) {
    const n = k >= 10 ? 6 : k >= 5 ? 5 : 4, up = k >= 10 ? 2 : 1;
    for (let i = 0; i < n; i++) kalimba(pStep(i + 3) * up, { vol: .048, delay: .36 + i * .055, dur: .7 });
    bell(k >= 10 ? 1046.5 : 783.99, { vol: .026, delay: .38 + n * .055, dur: 1.8 });
  },
  /* a record: three bells rising, the stands pleased */
  record() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => bell(f, { vol: .034, delay: i * .13, dur: 1.5 }));
    crowd(1.8, { shape: 'cheer', vol: .03, delay: .2 });
  },
  /* a badge: a little shimmer, high and short */
  medal() { [1318.51, 1567.98, 2093].forEach((f, i) => kalimba(f, { vol: .032, delay: i * .05, dur: .55 })); },
  /* a pin pushed into the map's cork: a tick, then a soft tok */
  pin() { noise(.018, { freq: 3200, q: 2.5, vol: .05, attack: .001 });
          tone(330, .09, { type: 'sine', vol: .07, to: 170, delay: .012 });
          noise(.05, { type: 'lowpass', freq: 700, q: .7, vol: .05, attack: .002, delay: .014 }); },
});
const haptic = pat => { if (!muted) buzz(pat); };

Object.assign(fx, {
  /* lettering across the middle of the screen: big, gold, gone in under two seconds */
  banner(txt, sub, col) {
    if (FX_STILL) return;
    const e = this.add('fx-banner', `--c:${col || '#E0B968'}`, 2000);
    e.innerHTML = `<b>${txt}</b>${sub ? `<small>${sub}</small>` : ''}`;
  },
});

/* the streaks worth calling out, and what each is called */
const STREAK_MARKS = { 3: 'Esquentando', 5: 'Em chamas', 8: 'Que memória', 10: 'Lendário', 15: 'Enciclopédia viva', 20: 'Fora de série' };
function streakMark(k) {
  const w = STREAK_MARKS[k];
  if (!w) return;
  fx.banner(`${k} seguidas!`, w);
  try { snd.streak(k); } catch (e) {}
  haptic([14, 40, 14]);
}
