
/* ═══════════════════════════════════════════════════
   A SUA FIGURINHA — Nº 000
   The album has a sticker of the player. It is there from the first day,
   printed on common paper with a silhouette where the face goes; the
   climb is what changes it. The first engraved rung reprints it in silver,
   the second in holographic foil, and the sixteenth in gold — and a Selfie
   de época (js/selfie.js) puts the player's own painted portrait on it. The
   plaque under it is where the name is written.

   And the album is one book with three sections — the figurinhas on the
   map, the stamps, the showcase of rare copies — so each of the three wears
   the same strip of tabs under its header (albNav).
═══════════════════════════════════════════════════ */
const EU_BLANK = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"><defs><radialGradient id="g" cx="50%" cy="36%" r="78%"><stop offset="0" stop-color="#6B5A45"/><stop offset="1" stop-color="#241B12"/></radialGradient></defs><rect width="300" height="400" fill="url(#g)"/><ellipse cx="150" cy="168" rx="60" ry="76" fill="#C9B38C" opacity=".5"/><path d="M36 400c0-92 52-142 114-142s114 50 114 142z" fill="#C9B38C" opacity=".5"/><text x="150" y="196" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="88" fill="#241B12" opacity=".65">?</text></svg>');
/* the painted portrait kept from the last Selfie de época, or the silhouette */
const euImg = () => { const d = LS.get('euImg', ''); return typeof d === 'string' && d.startsWith('data:image/') ? d : EU_BLANK; };
/* rungs kept at best, and the paper that earns: common, silver from the first engraved rung, foil from the second, gold at the top */
const euKept = () => famaIdx(milBest()) + 1;
const euFin = k => k >= LADDER.length ? 3 : k >= 9 ? 2 : k >= 4 ? 1 : 0;
let euFrom = 'home';       // where the way back leads

function euCard(pw) {
  const kept = euKept(), f = euFin(kept), nm = nomeJog() || 'Você';
  const p = { id: '_eu', n: nm, img: euImg(), era: [1500, 1500], pos: 'GOV', ctry: 'BRA' };
  let card = figurinha(p, 'lg', { hideEra: true, band: kept >= LADDER.length ? 'IMORTAL' : 'VOCÊ', sub: kept ? 'lembrado ' + famaPor(milBest()) : 'um instante de fama', decorative: true });
  if (f > 0) {
    card = card.replace('class="fig ', `class="fig fin-${f} `);
    const foil = '<span class="fl-frame" aria-hidden="true"></span><span class="fl-foil" aria-hidden="true"></span><span class="fl-glare" aria-hidden="true" style="--d:-1.3s"></span>'
      + (f === 3 ? '<span class="fl-glitter" aria-hidden="true"></span>' : '');
    card = card.replace(/<\/span>\s*$/, foil + '</span>');
  }
  return `<div class="figx eu-card" style="--pw:${pw}px"><span class="alb-n">000</span>${card}</div>`;
}
function euHtml() {
  const kept = euKept(), f = euFin(kept);
  const pw = Math.max(104, Math.min(200, Math.round((innerHeight - 400) * 29 / 50)));
  const nx = f === 0 ? ['prata', 4] : f === 1 ? ['holográfico', 9] : f === 2 ? ['ouro', LADDER.length] : null;
  return `
  <div class="pg eu-pg">
    ${topbar('Sua figurinha', 'beu-back')}
    <div class="eu-stage">${euCard(pw)}</div>
    <p class="eu-paper">Papel <b>${FIN_NAME[f].toLowerCase()}</b>${nx ? ` · no ${nx[1]}º degrau ela é reimpressa em <b>${nx[0]}</b>` : ' · você é <b>Imortal</b>'}</p>
    ${placaHtml(kept, { edit: true })}
    <div class="eu-stats">
      <span><b class="num">${album.size}</b>figurinhas</span><span><b class="num">${seloCount()}</b>selos</span>
      <span><b class="num">${earnedMedals().length}</b>insígnias</span><span><b class="num">${stats.games || 0}</b>partidas</span>
    </div>
    <div class="foot-row">
      <button id="eu-selfie" class="btn btn-ghost btn-sm" type="button">${ICON.star('currentColor', 12)} ${LS.get('euImg', '') ? 'Novo retrato' : 'Pôr o meu rosto'}</button>
      <button id="mil-btn" class="btn btn-brass" type="button">${ICON.play('currentColor', 13)} Subir a escada</button>
    </div>
  </div>`;
}
function wireEu() {
  document.getElementById('beu-back')?.addEventListener('click', () => { snd.swipe(); nomeEdit = false; sc = euFrom; go(); });
  document.getElementById('eu-selfie')?.addEventListener('click', () => { snd.select(); startSelfie(); });
  wirePlaca();
}
function openEu(from) { euFrom = from || 'home'; nomeEdit = false; snd.swipe(); sc = 'eu'; go(); }

/* ── one album, three sections: the strip of tabs each of them wears ── */
function albNav(on) {
  const v = V(), rare = Object.keys(v.c || {}).filter(sid => v.c[sid] && (v.c[sid].f > 0 || v.c[sid].v)).length;
  const tabs = [
    ['fig',  'Figurinhas', `${album.size}/${ALL_STICKERS.length}`, ICON.book],
    ['selo', 'Selos',      `${seloCount()}/${seloAll().length}`,   ICON.stamp],
    ['vit',  'Vitrine',    rare === 1 ? '1 rara' : rare + ' raras', ICON.star],
  ];
  return `<div class="alb-nav" role="tablist" aria-label="Seções do álbum">
    ${tabs.map(([id, n, tail, ic]) => `<button id="alb-nav-${id}" class="alb-nv${id === on ? ' is-on' : ''}" type="button" role="tab" aria-selected="${id === on}">
      <span class="alb-nv-l">${ic('currentColor', 11)}<b>${n}</b></span><small>${tail}</small></button>`).join('')}
    <button id="balbeu" class="alb-eu" type="button" aria-label="Sua figurinha"><img src="${euImg()}" alt="" draggable="false"></button>
  </div>`;
}
