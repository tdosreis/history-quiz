
/* ═══════════════════════════════════════════════════
   SELFIE DE ÉPOCA — your face in a portrait of the past. Pick one of the six
   kinds of people of Retrato de época (yours, if you have played it), and
   the camera shows you inside an oval, in costume: the Soberano's crown and
   ermine, the Estrategista's bicorne and epaulettes, the Artista's beret
   and ruff, the Pensador's laurel and toga, the Explorador's helmet, the
   Revolucionário's red cap. The shot is painted in sepia into a gilt frame
   with a brass plate, ready to share. Without a camera, a photo from the
   gallery does. Nothing leaves the phone.
═══════════════════════════════════════════════════ */
const SF_W = 300, SF_H = 400, SF_FACE = { cx: 150, cy: 182, rx: 84, ry: 106 };
/* the costumes, drawn on the portrait's own 300 × 400 field around the face's oval */
const SF_COST = {
  GOV: { t: 'O Soberano', hat: `<path d="M78 96L72 44l26 22 18-36 18 30 16-38 16 38 18-30 18 36 26-22-6 52z" fill="#D4A73A" stroke="#7A5A14" stroke-width="3" stroke-linejoin="round"/>
      <rect x="74" y="88" width="152" height="18" rx="4" fill="#B8862F" stroke="#7A5A14" stroke-width="3"/>
      <circle cx="150" cy="97" r="6" fill="#B3402F"/><circle cx="112" cy="97" r="4.5" fill="#2E5E7E"/><circle cx="188" cy="97" r="4.5" fill="#2E7D4F"/>
      <circle cx="72" cy="42" r="6" fill="#F6EEDA" stroke="#7A5A14" stroke-width="2"/><circle cx="116" cy="28" r="6" fill="#F6EEDA" stroke="#7A5A14" stroke-width="2"/><circle cx="150" cy="22" r="7" fill="#F6EEDA" stroke="#7A5A14" stroke-width="2"/><circle cx="184" cy="28" r="6" fill="#F6EEDA" stroke="#7A5A14" stroke-width="2"/><circle cx="228" cy="42" r="6" fill="#F6EEDA" stroke="#7A5A14" stroke-width="2"/>`,
    body: `<path d="M0 400V336Q150 262 300 336V400z" fill="#7B1E2A"/><path d="M34 400Q52 312 150 300Q248 312 266 400z" fill="#F7F3EA" stroke="#C9BFA8" stroke-width="2"/>
      ${[[70, 360], [104, 330], [150, 322], [196, 330], [230, 360], [92, 384], [150, 360], [208, 384], [124, 352], [176, 352]].map(([x, y]) => `<path d="M${x} ${y}l-4 9h8z" fill="#20180E"/>`).join('')}` },
  GEN: { t: 'O Estrategista', hat: `<path d="M26 104Q150 -10 274 104Q150 70 26 104z" fill="#1A1A22" stroke="#C9A04E" stroke-width="4" stroke-linejoin="round"/>
      <circle cx="206" cy="68" r="15" fill="#2E4A7A"/><circle cx="206" cy="68" r="10" fill="#F6EEDA"/><circle cx="206" cy="68" r="5" fill="#B3402F"/>`,
    body: `<path d="M0 400V340Q150 270 300 340V400z" fill="#1E2E5A"/><path d="M112 292L150 330 188 292 196 316 150 360 104 316z" fill="#B3402F"/>
      ${[56, 244].map(x => `<g><ellipse cx="${x}" cy="330" rx="34" ry="12" fill="#D4A73A" stroke="#7A5A14" stroke-width="2"/>${Array.from({ length: 7 }, (_, i) => `<path d="M${x - 27 + i * 9} 340v18" stroke="#D4A73A" stroke-width="4" stroke-linecap="round"/>`).join('')}</g>`).join('')}
      <circle cx="150" cy="378" r="4" fill="#D4A73A"/><circle cx="150" cy="396" r="4" fill="#D4A73A"/>` },
  ART: { t: 'O Artista', hat: `<ellipse cx="138" cy="84" rx="100" ry="34" transform="rotate(-9 138 84)" fill="#6B1E2E" stroke="#3A0E16" stroke-width="3"/>
      <path d="M150 52l4-12" stroke="#3A0E16" stroke-width="5" stroke-linecap="round"/>`,
    body: `<path d="M0 400V346Q150 290 300 346V400z" fill="#1F1A1C"/>
      <path d="M34 318a116 34 0 1 0 232 0a116 34 0 1 0-232 0zM96 314a54 14 0 1 0 108 0a54 14 0 1 0-108 0z" fill="#FBF8F0" fill-rule="evenodd" stroke="#B8AE98" stroke-width="2"/>
      ${Array.from({ length: 28 }, (_, i) => { const t = i / 28 * Math.PI * 2, c = Math.cos(t), sn = Math.sin(t);
        return `<path d="M${(150 + c * 56).toFixed(1)} ${(314 + sn * 15).toFixed(1)}Q${(150 + c * 92).toFixed(1)} ${(316 + sn * 22 + 6).toFixed(1)} ${(150 + c * 114).toFixed(1)} ${(318 + sn * 32).toFixed(1)}" fill="none" stroke="#C9BFA8" stroke-width="1.6"/>`; }).join('')}` },
  PEN: { t: 'O Pensador', hat: `${Array.from({ length: 9 }, (_, i) => { const t = Math.PI * (1.08 + i * .1), x = 150 + Math.cos(t) * 92, y = 150 + Math.sin(t) * 96;
        return `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="15" ry="7" transform="rotate(${(t * 180 / Math.PI + 60).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})" fill="#5E7F3A" stroke="#33481E" stroke-width="2"/>`; }).join('')}
      ${Array.from({ length: 9 }, (_, i) => { const t = Math.PI * (1.92 - i * .1), x = 150 + Math.cos(t) * 92, y = 150 + Math.sin(t) * 96;
        return `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="15" ry="7" transform="rotate(${(t * 180 / Math.PI - 60).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})" fill="#6E9244" stroke="#33481E" stroke-width="2"/>`; }).join('')}`,
    body: `<path d="M0 400V340Q150 280 300 340V400z" fill="#EDE6D4"/><path d="M30 400Q90 330 210 300Q260 312 300 350V400z" fill="#F8F4EA" stroke="#C9BFA8" stroke-width="2"/>
      <path d="M86 400Q120 352 200 318" stroke="#C9BFA8" stroke-width="2" fill="none"/><path d="M130 400Q160 362 228 330" stroke="#C9BFA8" stroke-width="2" fill="none"/>` },
  EXP: { t: 'O Explorador', hat: `<ellipse cx="150" cy="104" rx="128" ry="20" fill="#C8B080" stroke="#7A6440" stroke-width="3"/>
      <path d="M62 104Q62 22 150 22T238 104z" fill="#DCC898" stroke="#7A6440" stroke-width="3"/><path d="M64 92Q150 80 236 92v10Q150 90 64 102z" fill="#6E5836"/>`,
    body: `<path d="M0 400V342Q150 282 300 342V400z" fill="#8A7650"/><path d="M110 298Q150 330 190 298L200 330Q150 372 100 330z" fill="#B3402F"/>
      <path d="M150 340l-10 30h20z" fill="#8E2F2F"/><path d="M60 400V360M240 400V360" stroke="#6E5836" stroke-width="4"/>` },
  REV: { t: 'O Revolucionário', hat: `<path d="M64 112C58 50 120 18 186 30C232 38 262 66 258 98C252 120 226 118 214 104C200 88 196 108 236 112Q150 96 64 112z" fill="#B3262F" stroke="#6E1018" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="96" cy="94" r="14" fill="#2E4A7A"/><circle cx="96" cy="94" r="9.5" fill="#F6EEDA"/><circle cx="96" cy="94" r="5" fill="#B3262F"/>`,
    body: `<path d="M0 400V340Q150 280 300 340V400z" fill="#F4F1E8"/><path d="M118 298L150 352 182 298" stroke="#C9BFA8" stroke-width="3" fill="none"/>
      <path d="M10 360L290 400H260L0 380z" fill="#2E4A7A"/><path d="M0 380L260 400H230L0 396z" fill="#F6EEDA"/><path d="M20 352L300 396V376L40 342z" fill="#B3262F"/>` },
};
const SF_KINDS = ['GOV', 'GEN', 'ART', 'PEN', 'EXP', 'REV'];
let sf = null;   // { kind, name, phase: 'pick'|'cam'|'shot'|'nocam', stream, shot (object URL), blob }

function startSelfie() {
  isDaily = false; isSurv = false; isMil = false; isRev = false;
  const r = LS.get('retrato', null);
  sf = { kind: r && SF_COST[r.top] ? r.top : 'GOV', name: LS.get('selfieName', ''), phase: 'pick' };
  sc = 'selfie'; go();
}
const sfCostume = (k, part) => `<svg class="sf-cost" viewBox="0 0 ${SF_W} ${SF_H}" aria-hidden="true">${SF_COST[k][part]}</svg>`;
function sfStop() { if (sf && sf.stream) { sf.stream.getTracks().forEach(t => t.stop()); sf.stream = null; } }
async function sfCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { sf.phase = 'nocam'; go(); return; }
  try {
    sf.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 960 } }, audio: false });
    sf.phase = 'cam'; go();
  } catch (e) { sf.phase = 'nocam'; sf.err = e && e.name; go(); }
}
/* the portrait painted: a dark painted ground, the face in sepia inside the oval, the costume, the gilt frame and the plate */
async function sfPaint(src, sw, sh, mirror) {
  const K = 3, c = document.createElement('canvas'); c.width = SF_W * K; c.height = (SF_H + 70) * K;
  const g = c.getContext('2d'); g.scale(K, K);
  const bg = g.createRadialGradient(150, 170, 30, 150, 200, 260); bg.addColorStop(0, '#5A4A36'); bg.addColorStop(1, '#1E1710');
  g.fillStyle = bg; g.fillRect(0, 0, SF_W, SF_H);
  /* the face: the picture scaled to cover the oval's box, clipped to the oval */
  const { cx, cy, rx, ry } = SF_FACE, bw = rx * 2.5, bh = ry * 2.5, s = Math.max(bw / sw, bh / sh);
  g.save(); g.beginPath(); g.ellipse(cx, cy, rx * 1.18, ry * 1.12, 0, 0, Math.PI * 2); g.clip();
  try { g.filter = 'sepia(.62) saturate(.85) contrast(1.08) brightness(1.03)'; } catch (e) {}
  if (mirror) { g.translate(cx * 2, 0); g.scale(-1, 1); }
  g.drawImage(src, cx - sw * s / 2, cy - sh * s / 2, sw * s, sh * s);
  g.restore(); try { g.filter = 'none'; } catch (e) {}
  /* a soft vignette, as old paintings darken at the edges */
  const vg = g.createRadialGradient(cx, cy, ry * .7, cx, cy, ry * 1.3); vg.addColorStop(0, 'rgba(30,20,10,0)'); vg.addColorStop(1, 'rgba(30,20,10,.55)');
  g.fillStyle = vg; g.fillRect(0, 0, SF_W, SF_H);
  /* the costume, from its own drawing */
  for (const part of ['body', 'hat']) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SF_W} ${SF_H}">${SF_COST[sf.kind][part]}</svg>`;
    const img = await new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); });
    g.drawImage(img, 0, 0, SF_W, SF_H);
  }
  /* the gilt frame */
  const fr = g.createLinearGradient(0, 0, SF_W, SF_H); fr.addColorStop(0, '#8A6416'); fr.addColorStop(.35, '#E8CF8A'); fr.addColorStop(.6, '#B8862F'); fr.addColorStop(1, '#6E4C14');
  g.lineWidth = 16; g.strokeStyle = fr; g.strokeRect(8, 8, SF_W - 16, SF_H - 16);
  g.lineWidth = 2; g.strokeStyle = '#4A3410'; g.strokeRect(17, 17, SF_W - 34, SF_H - 34); g.strokeRect(1, 1, SF_W - 2, SF_H - 2);
  /* the plate */
  g.fillStyle = '#1E1710'; g.fillRect(0, SF_H, SF_W, 70);
  const pl = g.createLinearGradient(0, SF_H + 14, 0, SF_H + 58); pl.addColorStop(0, '#E8CF8A'); pl.addColorStop(1, '#A97A22');
  g.fillStyle = pl; g.fillRect(40, SF_H + 12, SF_W - 80, 46);
  g.fillStyle = '#2A1F08'; g.textAlign = 'center';
  try { await document.fonts.load('italic 700 18px Fraunces'); } catch (e) {}
  g.font = 'italic 700 17px Fraunces, Georgia, serif'; g.fillText(sf.name ? sf.name.slice(0, 22) : SF_COST[sf.kind].t, 150, SF_H + 33);
  g.font = '700 7.5px Archivo, sans-serif'; try { g.letterSpacing = '2px'; } catch (e) {}
  g.fillText(((sf.name ? SF_COST[sf.kind].t + ' · ' : '') + 'retrato de época · ' + new Date().getFullYear()).toUpperCase(), 150, SF_H + 49);
  return new Promise(ok => c.toBlob(ok, 'image/jpeg', .9));
}
async function sfShoot() {
  const v = document.getElementById('sf-video');
  if (!v || !v.videoWidth) return;
  try { snd.stamp(); } catch (e) {}
  const fl = document.getElementById('sf-flash'); if (fl) { fl.classList.remove('is-on'); void fl.offsetWidth; fl.classList.add('is-on'); }
  const blob = await sfPaint(v, v.videoWidth, v.videoHeight, true);
  sfStop(); sfDone(blob);
}
async function sfFromFile(file) {
  if (!file) return;
  const url = URL.createObjectURL(file);
  const img = await new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = url; }).catch(() => null);
  if (!img) return;
  const blob = await sfPaint(img, img.naturalWidth, img.naturalHeight, false);
  URL.revokeObjectURL(url); sfDone(blob);
}
function sfDone(blob) {
  if (!blob) return;
  if (sf.shot) URL.revokeObjectURL(sf.shot);
  sf.blob = blob; sf.shot = URL.createObjectURL(blob); sf.phase = 'shot';
  stats.selfies = (stats.selfies || 0) + 1; LS.set('stats', stats);
  window._newMedals = newMedals();
  go();
  try { snd.fanfare(); } catch (e) {}
}

function selfieHtml() {
  if (!sf) startSelfie();
  const k = sf.kind, frame = (inner, cls) => `<div class="sf-frame ${cls || ''}"><div class="sf-canvas">${inner}</div><span class="sf-plate">${_esc(sf.name || SF_COST[k].t)}</span></div>`;
  const kinds = `<div class="sf-kinds" role="group" aria-label="Fantasia">${SF_KINDS.map(x => `<button class="sf-kind${x === k ? ' is-on' : ''}" data-k="${x}" type="button" style="--kc:${RET_KINDS[x].col}">${(ICON[RET_KINDS[x].ic] || ICON.star)('currentColor', 13)}<span>${SF_COST[x].t.replace(/^O /, '')}</span></button>`).join('')}</div>`;
  if (sf.phase === 'shot') return `
  <div class="pg pg-center sf-pg sf-done">
    <div class="eyebrow">Selfie de época</div>
    <img class="sf-shot" src="${sf.shot}" alt="Seu retrato de época">
    ${medalChips()}
    <div class="foot-row">
      <button id="sf-share" class="btn btn-brass" type="button">${ICON.share('currentColor', 13)} Compartilhar</button>
      <a id="sf-save" class="btn btn-ghost btn-sm" href="${sf.shot}" download="selfie-de-epoca.jpg">Salvar</a>
      <button id="sf-redo" class="btn btn-ghost btn-sm" type="button">Outra</button>
    </div>
  </div>`;
  const live = sf.phase === 'cam';
  return `
  <div class="pg sf-pg">
    ${topbar('Selfie de época', 'sf-back')}
    ${frame(`${live ? '<video id="sf-video" autoplay playsinline muted></video>' : `<span class="sf-ghost">${QICON.bust(110)}</span>`}
      <svg class="sf-oval" viewBox="0 0 ${SF_W} ${SF_H}" aria-hidden="true"><defs><mask id="sf-m"><rect width="${SF_W}" height="${SF_H}" fill="#fff"/><ellipse cx="${SF_FACE.cx}" cy="${SF_FACE.cy}" rx="${SF_FACE.rx}" ry="${SF_FACE.ry}" fill="#000"/></mask></defs>
        <rect width="${SF_W}" height="${SF_H}" fill="rgba(30,23,16,.55)" mask="url(#sf-m)"/><ellipse cx="${SF_FACE.cx}" cy="${SF_FACE.cy}" rx="${SF_FACE.rx}" ry="${SF_FACE.ry}" fill="none" stroke="#E0B968" stroke-width="2" stroke-dasharray="6 5"/></svg>
      ${sfCostume(k, 'body')}${sfCostume(k, 'hat')}<span class="sf-flash" id="sf-flash"></span>`, live ? 'is-live' : '')}
    ${kinds}
    <input id="sf-name" class="sf-name" type="text" maxlength="22" placeholder="Seu nome na placa (opcional)" value="${_esc(sf.name)}" autocomplete="off">
    ${live ? `<div class="sf-btns"><button id="sf-snap" class="btn btn-brass btn-lg" type="button">${ICON.star('currentColor', 14)} Posar!</button></div><p class="small muted sf-p">Encaixe o rosto no oval e pose como um retrato a óleo.</p>`
      : `<div class="sf-btns"><button id="sf-cam" class="btn btn-brass btn-lg" type="button">${ICON.play('currentColor', 13)} Abrir a câmera</button>
        <label class="btn btn-ghost btn-sm sf-file">Usar uma foto<input id="sf-file" type="file" accept="image/*" hidden></label></div>
        <p class="small muted sf-p">${sf.phase === 'nocam' ? 'A câmera não abriu — use uma foto da galeria.' : 'A foto fica só no seu celular.'}</p>`}
  </div>`;
}
let _sfWatch = 0;
function wireSelfie() {
  if (!sf) return;
  const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  const ready = tapArmed(200);
  document.querySelectorAll('.sf-kind').forEach(b => b.addEventListener('click', () => { sf.kind = b.dataset.k; snd.tap(); go(); }));
  const nm = document.getElementById('sf-name'); if (nm) nm.addEventListener('input', () => { sf.name = nm.value.slice(0, 22); LS.set('selfieName', sf.name); const pl = document.querySelector('.sf-plate'); if (pl) pl.textContent = sf.name || SF_COST[sf.kind].t; });
  on('sf-cam', () => { if (ready()) sfCamera(); });
  on('sf-snap', () => { if (ready()) sfShoot(); });
  const fi = document.getElementById('sf-file'); if (fi) fi.addEventListener('change', () => sfFromFile(fi.files && fi.files[0]));
  on('sf-redo', () => { snd.swipe(); sf.phase = 'pick'; go(); });
  on('sf-back', () => { snd.swipe(); sfStop(); sc = fromGab ? 'gabinete' : 'home'; go(); });
  on('sf-share', () => {
    const txt = `Meu retrato de época 🖼️ — History Quiz\n${CHAL_URL}`;
    if (sf.blob && navigator.canShare) { const f = new File([sf.blob], 'selfie-de-epoca.jpg', { type: 'image/jpeg' });
      if (navigator.canShare({ files: [f] })) { navigator.share({ files: [f], text: txt }).catch(() => {}); return; } }
    if (navigator.share) navigator.share({ text: txt }).catch(() => {});
  });
  const v = document.getElementById('sf-video');
  if (v && sf.stream) { v.srcObject = sf.stream; v.play().catch(() => {}); }
  /* the camera is let go the moment the screen is left, whichever way */
  clearInterval(_sfWatch);
  if (sf.stream) _sfWatch = setInterval(() => { if (sc !== 'selfie' || !sf || sf.phase !== 'cam') { sfStop(); clearInterval(_sfWatch); } }, 500);
}
