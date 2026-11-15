
/* ═══════════════════════════════════════════════════
   PARA A HISTÓRIA — what the climb is played for
   Not money: memory. Each of the sixteen rungs is a length of time your name
   will be remembered, from a day to forever, and from the fifth up each one
   is the time the world has already remembered someone real — ten years like
   Hawking, two centuries like Beethoven, three thousand years like
   Tutankhamun. The two safe rungs are where the name is engraved; a miss
   lets it fade back to the last of them. The values in LADDER (v) are kept
   as they always were — they are what a record, a medal and a challenge
   link compare — and this file says what each of them is called, draws the
   ladder, the plaque the name ends up on, and the end of a climb.
═══════════════════════════════════════════════════ */
const FAMA = [
  { t: 'um dia',        as: 'o sol de hoje',             ic: 'sun' },
  { t: 'uma semana',    as: 'a manchete de um jornal',   ic: 'news' },
  { t: 'um mês',        as: 'a folha do calendário',     ic: 'calendar' },
  { t: 'um ano',        as: 'uma volta ao redor do Sol', ic: 'globe' },
  { t: 'dez anos',      who: 'hawking' },
  { t: 'uma geração',   who: 'madre_teresa' },
  { t: 'meio século',   who: 'chaplin' },
  { t: 'um século',     who: 'monet' },
  { t: 'dois séculos',  who: 'beethoven' },
  { t: 'três séculos',  who: 'newton' },
  { t: 'cinco séculos', who: 'leonardo' },
  { t: 'um milênio',    who: 'avicena' },
  { t: 'dois milênios', who: 'cesar' },
  { t: '2.500 anos',    who: 'confucio' },
  { t: 'três milênios', who: 'tutancamon' },
  { t: 'para sempre',   ic: 'star' },
];
/* the rung a value is (−1 for nothing banked), what it is called, and the words that go round it */
const famaIdx = v => LADDER.findIndex(s => s.v === v);
const fama = v => { const i = famaIdx(v); return i < 0 ? 'um instante' : FAMA[i].t; };
const famaPor = v => (famaIdx(v) === LADDER.length - 1 ? '' : 'por ') + fama(v);
const famaWho = i => (FAMA[i] && FAMA[i].who && PL.find(p => p.id === FAMA[i].who)) || null;
/* "como Charlie Chaplin", "como o sol de hoje"; the last rung is like nobody */
const famaComo = i => { const p = famaWho(i); return p ? 'como ' + p.n : FAMA[i] && FAMA[i].as ? 'como ' + FAMA[i].as : ''; };
/* the little disc a rung wears: the face of whoever has been remembered that long, or a sign of that span */
function famaDisc(i) {
  const p = famaWho(i);
  if (p) return `<span class="fm-disc"><img src="${p.img}" alt="" loading="lazy" draggable="false"></span>`;
  return `<span class="fm-disc fm-disc-ic">${(ICON[(FAMA[i] || {}).ic] || ICON.star)('currentColor', 12)}</span>`;
}

/* ── the player's name: what the plaque says. Asked once, on the plaque itself; "Você" until then ── */
const NOME_MAX = 16;
const nomeJog = () => String(LS.get('nome', '') || LS.get('selfieName', '') || '').replace(/\s+/g, ' ').trim().slice(0, NOME_MAX);
let nomeEdit = false;      // the plaque's name is being typed

/* ── the plaque ──
   What the name is written on says how long it will last: breath on a cold pane, a finger in the sand, chalk
   on a slate, ink on paper, cast bronze, cut marble, the stars. One for each stretch of the ladder. */
const PLACAS = [
  [0,  'ar',       'dito ao vento'],
  [1,  'areia',    'escrito na areia'],
  [4,  'giz',      'a giz, na lousa'],
  [6,  'tinta',    'a tinta, no papel'],
  [9,  'bronze',   'fundido em bronze'],
  [12, 'marmore',  'talhado em mármore'],
  [16, 'estrelas', 'escrito nas estrelas'],
];
const placaOf = r => PLACAS.filter(p => r >= p[0]).pop();
/* r: rungs kept (0–16). opts.edit: the name can be changed by a tap; opts.sm: the small one on the cover */
function placaHtml(r, opts) {
  opts = opts || {};
  const [, k, how] = placaOf(r), nm = nomeJog(), v = r > 0 ? LADDER[r - 1].v : 0;
  const stars = k !== 'estrelas' ? '' : `<svg class="pl-sky" viewBox="0 0 300 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${
    [[22, 18, 1.2], [58, 44, .8], [41, 96, 1], [96, 14, .7], [133, 104, .9], [171, 12, 1.1], [209, 100, .7], [246, 26, 1.3], [278, 78, .9], [262, 108, .6], [12, 66, .7], [118, 30, .5], [188, 58, .5], [228, 60, .6], [76, 76, .6]]
      .map(([x, y, s], i) => `<circle cx="${x}" cy="${y}" r="${s}" style="--i:${i}"/>`).join('')}
    <path d="M22 18L58 44L41 96M246 26L278 78L262 108" fill="none" stroke="currentColor" stroke-width=".5" opacity=".35"/></svg>`;
  const name = opts.edit && nomeEdit
    ? `<span class="pl-edit"><input id="pl-in" class="pl-in" type="text" maxlength="${NOME_MAX}" value="${_esc(nm)}" placeholder="Seu nome" autocomplete="off" autocapitalize="words" enterkeyhint="done" aria-label="Seu nome">
        <button id="pl-ok" class="pl-ok" type="button" aria-label="Gravar o nome">${ICON.check('currentColor', 14)}</button></span>`
    : `<${opts.edit ? 'button id="pl-nome" type="button"' : 'span'} class="pl-nome${nm ? '' : ' is-blank'}${nm.length > 11 ? ' is-long' : ''}"${opts.edit ? ` aria-label="${nm ? 'Mudar o nome: ' + _esc(nm) : 'Escrever o seu nome'}"` : ''}>${
        nm ? _esc(nm) : opts.edit ? 'seu nome aqui' : 'Você'}${opts.edit ? `<i class="pl-pen" aria-hidden="true">${ICON.quill('currentColor', 11)}</i>` : ''}</${opts.edit ? 'button' : 'span'}>`;
  return `<div class="placa pl-${k}${opts.sm ? ' pl-sm' : ''}">
    ${stars}
    <span class="pl-k">${how}</span>
    ${name}
    <span class="pl-por">${r >= LADDER.length ? 'lembrado para sempre' : 'lembrado ' + famaPor(v)}</span>
  </div>`;
}
function wirePlaca() {
  const save = () => {
    const el = document.getElementById('pl-in');
    if (!el) return;
    LS.set('nome', el.value.replace(/\s+/g, ' ').trim().slice(0, NOME_MAX));
    nomeEdit = false; snd.tap(); go();
  };
  document.getElementById('pl-nome')?.addEventListener('click', () => { nomeEdit = true; snd.tap(); go(); });
  document.getElementById('pl-ok')?.addEventListener('click', save);
  const el = document.getElementById('pl-in');
  if (el) {
    el.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); save(); } });
    try { el.focus({ preventScroll: true }); el.setSelectionRange(el.value.length, el.value.length); } catch (e) {}
  }
}

/* ── the board's line of stakes: what this rung is worth, and what is already engraved ── */
function famaStakes() {
  const top = isFinal(), net = safetyNet();
  return `
    <div class="stakes fm-stakes">
      <div style="min-width:0;">
        <div class="eyebrow">Degrau ${rung + 1} de ${LADDER.length} · ${top ? 'seu nome' : 'lembrado por'}</div>
        <div class="stakes-v prize-pop"><em>${fama(RUNG().v)}</em></div>
      </div>
      <button id="bladder" class="safe-box" aria-label="Ver a escada. Garantido: ${net ? fama(net) : 'nada ainda'}">
        ${famaDisc(rung)}
        <div>
          <div class="k">Garantido</div>
          <div class="v ${net ? 'good' : 'muted'}">${net ? fama(net) : '—'}</div>
        </div>
      </button>
    </div>`;
}

/* ── the full ladder, as a sheet over the board: a line of time that climbs from a day to forever, each rung
   with the face of whoever has been remembered that long ── */
function ladderOverlay() {
  const n = LADDER.length;
  return `
  <div class="sheet ld-sheet fm-sheet">
    <div class="ld-head">
      <span class="eyebrow" style="color:var(--brass);">Para a História · degrau ${Math.min(rung + 1, n)} de ${n}</span>
      <button id="bladderclose" class="btn btn-ghost btn-icon" aria-label="Fechar">${ICON.close('currentColor', 13)}</button>
    </div>
    <div class="display ld-title"><em>Por quanto tempo vão lembrar de você?</em></div>
    <div class="fm-ld" role="list">
      ${LADDER.map((step, i) => {
        const st = i < rung ? ' is-done' : i === rung ? ' is-now' : '', top = i === n - 1;
        return `<div class="fm-r${st}${step.safe ? ' is-safe' : ''}${top ? ' is-top' : ''}" role="listitem">
          <span class="fm-n">${i + 1}</span>
          ${famaDisc(i)}
          <span class="fm-t"><b>${FAMA[i].t}</b><small>${top ? 'sua figurinha vira ouro' : famaComo(i)}</small></span>
          <span class="fm-ok">${i < rung ? ICON.check('currentColor', 12) : step.safe ? ICON.shield('currentColor', 12) : i === rung ? '<i>você</i>' : ''}</span>
        </div>`;
      }).reverse().join('')}
    </div>
    <p class="small muted fm-foot">${ICON.shield('var(--ink-3)', 10)} degraus gravados: passou de um, esse tempo é seu aconteça o que acontecer.</p>
  </div>`;
}

/* ── how a climb ends: the plaque, in what the name earned, and how long it will be read ── */
function famaEndHtml() {
  const n = LADDER.length, won = banked >= LADDER[n - 1].v;
  const kept = famaIdx(banked) + 1;                     // rungs kept: 0 when the name fades at once
  const who = kept > 0 ? famaWho(kept - 1) : null;
  const head = won ? 'Imortal!' : cashed ? 'Você assinou e parou' : banked ? 'Caiu, mas ficou' : 'Fama de um instante';
  const fell = FAMA[Math.min(rung, n - 1)].t;
  const sub = won ? 'Dezesseis degraus, dezesseis acertos. A sua figurinha foi reimpressa em ouro.'
    : cashed ? (who ? `O mundo já lembra de <b>${_esc(who.n)}</b> há esse tempo.` : 'Saiu com o nome escrito — decisão de quem sabe a hora.')
    : banked ? `Tropeçou no degrau de <b>${fell}</b> — o degrau gravado segurou.`
    : 'Escorregou antes do primeiro degrau gravado. Da próxima, considere parar.';
  const best = Math.max(milBest(), banked);
  return `
  <div class="pg pg-center scroll-y fm-end" style="padding:22px 22px;gap:8px;">
    <div class="eyebrow">Para a História · degrau ${rung} de ${n}</div>
    ${placaHtml(kept, { edit: true })}
    <div class="display ${won ? 'brass' : banked ? 'good' : 'bad'} fm-end-h"><em>${head}</em></div>
    <p class="small muted fm-end-p">${sub}</p>
    ${chalBanner()}
    <div class="rail" style="width:100%;max-width:300px;margin:4px 0;">
      ${LADDER.map((step, i) => `<span class="notch${i < rung ? ' notch-done' : ''}${step.safe ? ' notch-safe' : ''}"></span>`).join('')}
    </div>
    <div class="stats">
      <div><div class="v num">${nCorrect}</div><div class="k">Acertos</div></div>
      <div><div class="v num">${pts}</div><div class="k">Pontos</div></div>
      <div><div class="v brass fm-best">${best ? fama(best) : '—'}</div><div class="k">Recorde</div></div>
    </div>
    ${packStrip()}
    ${selosStrip()}
    ${medalChips()}
    <div class="foot-row" style="margin-top:10px;">
      <button id="bshare"  class="btn btn-ghost btn-sm">${chalMine() ? 'Desafiar' : 'Compartilhar'}</button>
      <button id="bmilrep" class="btn btn-brass">De novo</button>
      <button id="bhome"   class="btn btn-ghost btn-sm">Início</button>
    </div>
  </div>`;
}
/* the climb as a message: the column of rungs, and what the name earned */
function famaShareText() {
  const climb = LADDER.map((s, i) => i < rung ? '🟨' : '⬛').join('');
  const kept = famaIdx(banked) + 1, who = kept > 0 ? famaWho(kept - 1) : null;
  const say = banked >= LADDER[LADDER.length - 1].v ? 'ENTREI PARA A HISTÓRIA: meu nome será lembrado para sempre!'
    : `Meu nome será lembrado ${famaPor(banked)}${who ? ' — como ' + who.n : ''}.`;
  const albM = runNew ? `\n📔 ${runNew} ${runNew === 1 ? 'figurinha nova' : 'figurinhas novas'} · ${album.size}/${ALL_STICKERS.length} no álbum` : '';
  return `Para a História 📜 History Quiz\n${climb}\n${say} · degrau ${rung}/${LADDER.length}${albM}\n${chalShareTail(chalMine())}`;
}
