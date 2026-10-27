
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
/* the other games' results: a good one gets its score inside the same laurel */
const wreathed = (good, html) => good ? `<div class="end-wreath end-wreath-mode">${laurelSvg()}${html}</div>` : html;

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

/* ═══════════════════════════════════════════════════
   THE CERTIFICATE AS A PICTURE — to share
   The same sheet drawn on a canvas (1080×1350, a phone's share size) in the
   app's own fonts: the frame, the score in its laurel, the title on its
   ribbon, the answers as a row of dots, the wax seal. Drawn in the
   background once the round's sheet is up, so a tap on Compartilhar can hand
   it straight to the phone's share sheet (which wants to be asked right away).
═══════════════════════════════════════════════════ */
let _certBlob = null;
const _svgImg = svg => new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no;
  i.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); });
async function certImage() {
  const total = cat.qs.length, pct = Math.round(nCorrect / total * 100);
  const ti = endTitle(pct, isSurv ? nCorrect : null), d = DCFG();
  const msg = pct === 100 ? 'Perfeito!' : pct >= 80 ? 'Excelente!' : pct >= 50 ? 'Muito bem!' : 'Hora de estudar!';
  try { await Promise.all(['italic 700 96px Fraunces', '600 230px Fraunces', '800 34px Archivo', '700 30px Archivo'].map(f => document.fonts.load(f))); } catch (e) {}
  waxSeal(ti);    // the rim's path, made once
  const [laurel, seal] = await Promise.all([
    _svgImg(laurelSvg().replace('<svg class="end-laurel"', '<svg xmlns="http://www.w3.org/2000/svg"').replace(/currentColor/g, '#A67C2E')),
    _svgImg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><defs><radialGradient id="h" cx="36%" cy="30%" r="70%">
      <stop offset="0" stop-color="#fff" stop-opacity=".34"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></radialGradient></defs>
      <path d="${_waxRim}" fill="${ti.wax}"/><path d="${_waxRim}" fill="url(#h)"/>
      <circle cx="40" cy="40" r="24.5" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="2.4"/>
      ${(ICON[ti.ic] || ICON.star)('#F3DDB0', 30).replace('<svg', '<svg x="25" y="25"')}</svg>`)]);
  const W = 1080, H = 1350, c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d');
  /* the paper: warm in the middle, browner to the edges, a little grain */
  let p = g.createRadialGradient(W / 2, H * .42, 80, W / 2, H / 2, H * .78);
  p.addColorStop(0, '#FBF5E6'); p.addColorStop(.6, '#F1E5C8'); p.addColorStop(1, '#DCC79B');
  g.fillStyle = p; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 2600; i++) { g.fillStyle = `rgba(90,60,20,${(.02 + Math.random() * .05).toFixed(3)})`; g.fillRect(Math.random() * W, Math.random() * H, 1.6, 1.6); }
  /* the frame: a brass rule, a fainter one inside it, diamonds at the corners */
  g.strokeStyle = '#B08A3E'; g.lineWidth = 6; g.strokeRect(54, 54, W - 108, H - 108);
  g.strokeStyle = 'rgba(176,138,62,.5)'; g.lineWidth = 2; g.strokeRect(74, 74, W - 148, H - 148);
  g.fillStyle = '#B08A3E';
  [[74, 74], [W - 74, 74], [74, H - 74], [W - 74, H - 74]].forEach(([x, y]) => { g.beginPath(); g.moveTo(x, y - 14); g.lineTo(x + 14, y); g.lineTo(x, y + 14); g.lineTo(x - 14, y); g.closePath(); g.fill(); });
  const text = (t, font, col, y, ls) => { g.font = font; g.fillStyle = col; g.textAlign = 'center'; g.textBaseline = 'alphabetic';
    try { g.letterSpacing = ls || '0px'; } catch (e) {} g.fillText(t, W / 2, y); };
  text('HISTORY QUIZ', '800 34px Archivo', '#8C6A2A', 172, '10px');
  text((isDaily ? `Desafio Diário nº ${dayIndex()}` : isSurv ? 'Mata-mata' : `${isThemed() ? cat.themed.label : d.label} · ${total} perguntas`).toUpperCase(), '700 26px Archivo', '#6B5B45', 222, '5px');
  text(msg, 'italic 700 96px Fraunces', '#2B2118', 352);
  g.drawImage(laurel, (W - 760) / 2, 392, 760, 403);
  text(String(pts), '600 230px Fraunces', '#2B2118', 668, '-4px');
  text(`pontos · ${nCorrect}/${total} acertos (${pct}%)`, '700 32px Archivo', '#7A6A55', 852);
  /* the ribbon, its tails folded behind */
  const rw = 640, rx = (W - rw) / 2, ry = 896, rh = 128;
  g.fillStyle = '#6E2419'; [[rx - 34, 1], [rx + rw + 34, -1]].forEach(([x, s]) => { g.beginPath(); g.moveTo(x + s * 60, ry + 22); g.lineTo(x, ry + 22); g.lineTo(x + s * 22, ry + 22 + rh / 2); g.lineTo(x, ry + rh + 22); g.lineTo(x + s * 60, ry + rh + 22); g.fill(); });
  g.fillStyle = '#8E2A20'; g.beginPath(); g.rect(rx, ry, rw, rh); g.fill();
  text('SEU TÍTULO NESTA RODADA', '800 22px Archivo', 'rgba(246,235,216,.8)', ry + 44, '6px');
  text(ti.t, '600 58px Fraunces', '#F6EBD8', ry + 104);
  /* the answers, one dot each */
  const log = runLog.slice(0, 20), step = log.length > 15 ? 30 : 36, x0 = W / 2 - (log.length - 1) * step / 2;
  log.forEach((r, i) => { g.fillStyle = r === 3 ? '#3A9C6E' : r === 1 ? '#C79A4E' : r === -1 ? '#BDB3A0' : '#B3402F';
    g.beginPath(); g.arc(x0 + i * step, 1098, 13, 0, Math.PI * 2); g.fill(); });
  if (bestStreak >= 3) text(`melhor sequência: ${bestStreak}`, '700 28px Archivo', '#9A6B1F', 1166);
  text('tdosreis.github.io/history-quiz', '700 26px Archivo', '#8C7A60', 1256, '2px');
  /* the seal, pressed on the corner */
  g.save(); g.translate(W - 172, H - 196); g.rotate(-14 * Math.PI / 180);
  g.shadowColor = 'rgba(40,14,8,.35)'; g.shadowBlur = 14; g.shadowOffsetY = 6;
  g.drawImage(seal, -100, -100, 200, 200); g.restore();
  return new Promise(ok => c.toBlob(ok, 'image/png'));
}
/* drawn once the sheet is up; kept until the next round ends */
function certPrep() { _certBlob = null; certImage().then(b => { _certBlob = b; }).catch(() => {}); }
/* the round's share: the picture with the text, where the phone can share files; the text alone elsewhere */
function certShare(txt) {
  if (!_certBlob || !navigator.share || !navigator.canShare) return false;
  const file = new File([_certBlob], 'history-quiz.png', { type: 'image/png' });
  if (!navigator.canShare({ files: [file] })) return false;
  navigator.share({ files: [file], text: txt }).catch(() => {});
  return true;
}
