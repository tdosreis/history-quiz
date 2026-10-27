
/* ═══════════════════════════════════════════════════
   RETRATO DE ÉPOCA — "Quem você seria na História?"
   Not a quiz: eight questions with no wrong answer. Each answer leans
   towards two of six kinds of people the past is full of (the figures'
   own kinds: governantes, generais, artistas, pensadores, exploradores,
   revolucionários). The strongest is who you are; the second picks which
   of them: a Soberano who loves the arts is Luís XIV, one who loves books
   is Dom Pedro II. The result is a portrait, its kinds as bars, and a card
   to share.
═══════════════════════════════════════════════════ */
const RET_KINDS = {
  GOV: { t: 'O Soberano', ic: 'crown', col: '#8A6416',
         d: 'Você gosta de ver as coisas funcionando e não tem medo de decidir. Onde há caos, você organiza; onde há gente, você lidera.' },
  GEN: { t: 'O Estrategista', ic: 'shield', col: '#7B2D26',
         d: 'Você enxerga o tabuleiro inteiro antes de mexer uma peça. Coragem, sim, mas sempre com um plano.' },
  ART: { t: 'O Artista', ic: 'star', col: '#6A4C93',
         d: 'Você vê beleza onde os outros veem rotina e precisa criar para se sentir vivo.' },
  PEN: { t: 'O Pensador', ic: 'book', col: '#2E5E7E',
         d: 'Você quer entender como tudo funciona. Uma boa pergunta vale mais do que mil respostas prontas.' },
  EXP: { t: 'O Explorador', ic: 'globe', col: '#2E6B3F',
         d: 'O mapa nunca é grande o bastante para você. O desconhecido não assusta: chama.' },
  REV: { t: 'O Revolucionário', ic: 'flame', col: '#B3402F',
         d: 'Você não aceita o mundo como está. Quando algo é injusto, você muda as regras.' },
};
const RET_ORDER = ['GOV', 'GEN', 'ART', 'PEN', 'EXP', 'REV'];
/* who you would be: by your strongest kind, then your second ('' when the second is a tie) */
const RET_WHO = {
  GOV: { ART: ['luis_xiv', 'O Rei Sol fez de Versalhes um palco das artes: balé, ópera, jardins e espelhos.'],
         PEN: ['dom_pedro_ii', 'O imperador que falava várias línguas, se correspondia com cientistas e adorava astronomia.'],
         GEN: ['augusto', 'Venceu a guerra civil e governou Roma por mais de 40 anos, com mão firme.'],
         EXP: ['mansa_musa', 'Atravessou o Saara até Meca com uma caravana tão rica que o mundo nunca esqueceu.'],
         REV: ['dom_pedro_i', 'Rompeu com Portugal e proclamou a independência do Brasil às margens do Ipiranga.'],
         '':  ['elizabeth_i', 'Governou a Inglaterra por mais de 40 anos e deu nome a uma era de ouro.'] },
  GEN: { GOV: ['napoleao', 'De general a imperador: venceu batalhas e reescreveu as leis da França.'],
         PEN: ['sun_tzu', 'Para ele, a melhor vitória era vencer sem lutar. A ele se atribui A Arte da Guerra.'],
         EXP: ['alexandre', 'Levou seu exército da Grécia até a Índia antes de completar 33 anos.'],
         REV: ['joana_darc', 'Uma camponesa que, aos 17 anos, comandou tropas e mudou o rumo de uma guerra.'],
         ART: ['cesar', 'General brilhante e também escritor: contou as próprias guerras na Gália.'],
         '':  ['anibal', 'Atravessou os Alpes com elefantes para surpreender Roma.'] },
  ART: { PEN: ['leonardo', 'Pintor da Mona Lisa e inventor de máquinas que só existiriam séculos depois.'],
         REV: ['frida', 'Transformou a própria dor em arte e pintou o México como ninguém.'],
         EXP: ['camoes', 'Soldado, viajante e poeta: perdeu um olho em combate e cantou as navegações em Os Lusíadas.'],
         GOV: ['michelangelo', 'Comandou obras gigantes, do teto da Capela Sistina à cúpula de São Pedro.'],
         GEN: ['cervantes', 'Lutou na Batalha de Lepanto, foi prisioneiro em Argel e escreveu Dom Quixote.'],
         '':  ['van_gogh', 'Pintou mais de 800 quadros em cerca de dez anos de carreira.'] },
  PEN: { EXP: ['darwin', 'Deu a volta ao mundo no Beagle e voltou com a ideia que mudou a biologia.'],
         ART: ['ada_lovelace', 'Filha do poeta Byron, escreveu o que muitos consideram o primeiro programa de computador.'],
         REV: ['galileu', 'Apontou o telescópio para o céu e defendeu, contra tudo, que a Terra se move.'],
         GOV: ['aristoteles', 'Foi professor de Alexandre, o Grande, e escreveu sobre quase tudo, da política à biologia.'],
         GEN: ['arquimedes', 'Suas máquinas defenderam Siracusa do cerco romano.'],
         '':  ['einstein', 'Mudou para sempre o que sabemos sobre o espaço, o tempo e a luz.'] },
  EXP: { PEN: ['cook', 'Mapeou o Pacífico em três viagens, com cientistas a bordo.'],
         GEN: ['magalhaes', 'Comandou a expedição que fez a primeira volta ao mundo.'],
         GOV: ['henrique_navegador', 'O príncipe que organizou as viagens portuguesas pela costa da África.'],
         REV: ['gagarin', 'O primeiro ser humano a ir ao espaço, em 1961.'],
         ART: ['marco_polo', 'Foi até a China de Kublai Khan e voltou com histórias que encantaram a Europa.'],
         '':  ['amundsen', 'O primeiro a chegar ao Polo Sul, em 1911.'] },
  REV: { GOV: ['mandela', 'Passou 27 anos preso e saiu para presidir uma África do Sul sem apartheid.'],
         PEN: ['mlk', 'Lutou pelos direitos civis com palavras e sem violência.'],
         GEN: ['zumbi', 'Liderou o Quilombo dos Palmares na resistência contra a escravidão.'],
         ART: ['chiquinha', 'Compositora pioneira e abolicionista: vendeu partituras para comprar a liberdade de um músico escravizado.'],
         EXP: ['che', 'Atravessou a América do Sul de motocicleta antes de virar guerrilheiro.'],
         '':  ['gandhi', 'Libertou a Índia com marchas, jejuns e desobediência, sem pegar em armas.'] },
};
/* the questions: each answer gives two points to one kind and one to another */
const RET_QS = [
  { t: 'Um sábado inteiro livre. O que você faz?', o: [
    ['🗺️', 'Pego a estrada para um lugar que nunca vi', 'EXP', 'REV'],
    ['🔬', 'Leio, investigo, desmonto alguma coisa para ver como funciona', 'PEN', 'ART'],
    ['🎨', 'Desenho, toco, escrevo: crio alguma coisa', 'ART', 'PEN'],
    ['🎉', 'Organizo um encontro com a turma toda', 'GOV', 'GEN']] },
  { t: 'Num trabalho em grupo, você é…', o: [
    ['👑', 'Quem decide e distribui as tarefas', 'GOV', 'GEN'],
    ['♟️', 'Quem planeja cada passo', 'GEN', 'PEN'],
    ['💡', 'Quem tem as ideias mais malucas', 'ART', 'EXP'],
    ['📢', 'Quem questiona se o trabalho faz sentido', 'REV', 'PEN']] },
  { t: 'Você vai viajar no tempo e só pode levar um objeto:', o: [
    ['🧭', 'Uma bússola', 'EXP', 'GEN'],
    ['🔭', 'Uma luneta', 'PEN', 'EXP'],
    ['✒️', 'Pena e tinteiro', 'ART', 'REV'],
    ['🛡️', 'Um escudo', 'GEN', 'GOV']] },
  { t: 'O que mais tira você do sério?', o: [
    ['⚖️', 'Injustiça', 'REV', 'GOV'],
    ['😴', 'Tédio e rotina', 'EXP', 'ART'],
    ['🙄', 'Gente que fala sem pensar', 'PEN', 'GEN'],
    ['🌀', 'Bagunça e falta de comando', 'GOV', 'GEN']] },
  { t: 'Seu lugar ideal:', o: [
    ['🏰', 'Um palácio com vista para o reino', 'GOV', 'ART'],
    ['⛵', 'O convés de um navio em alto-mar', 'EXP', 'GEN'],
    ['📚', 'Uma biblioteca antiga, só para mim', 'PEN', 'ART'],
    ['🎭', 'Os bastidores de um teatro em noite de estreia', 'ART', 'REV']] },
  { t: 'Diante de um grande problema, você…', o: [
    ['⚔️', 'Encara de frente, na hora', 'GEN', 'REV'],
    ['🧠', 'Estuda tudo antes de agir', 'PEN', 'GOV'],
    ['✊', 'Junta gente para mudar tudo', 'REV', 'GOV'],
    ['🎲', 'Arrisca um caminho que ninguém tentou', 'EXP', 'ART']] },
  { t: 'Como você gostaria de ser lembrado?', o: [
    ['🏆', 'Como quem venceu as batalhas mais difíceis', 'GEN', 'GOV'],
    ['🕊️', 'Como quem libertou o seu povo', 'REV', 'GOV'],
    ['🖼️', 'Pela obra que deixou', 'ART', 'PEN'],
    ['🌍', 'Por ter ido aonde ninguém tinha ido', 'EXP', 'PEN']] },
  { t: 'Escolha uma palavra:', o: [
    ['🌟', 'Glória', 'GOV', 'GEN'],
    ['❓', 'Curiosidade', 'PEN', 'EXP'],
    ['🔥', 'Liberdade', 'REV', 'EXP'],
    ['✨', 'Beleza', 'ART', 'GOV']] },
];
let ret = null;    // { i, picks: [option index per question], phase: 'intro'|'q'|'res' }

function startRetrato() {
  ret = { i: 0, picks: [], phase: 'intro' };
  sc = 'retrato';
  go();
}
/* the tally: each kind's points, the strongest, the second (none when two tie for it), the figure */
function retTally(picks) {
  const pts = {}; RET_ORDER.forEach(k => { pts[k] = 0; });
  picks.forEach((o, i) => { const a = RET_QS[i] && RET_QS[i].o[o]; if (a) { pts[a[2]] += 2; pts[a[3]] += 1; } });
  /* ties go to the kind chosen first as a main answer, then to the order of the kinds */
  const first = {}; picks.forEach((o, i) => { const a = RET_QS[i] && RET_QS[i].o[o]; if (a && first[a[2]] == null) first[a[2]] = i; });
  const rank = RET_ORDER.slice().sort((a, b) => (pts[b] - pts[a]) || ((first[a] ?? 99) - (first[b] ?? 99)) || (RET_ORDER.indexOf(a) - RET_ORDER.indexOf(b)));
  const top = rank[0], sec = pts[rank[1]] > 0 && pts[rank[1]] !== pts[rank[2]] ? rank[1] : '';
  const [id, why] = RET_WHO[top][sec] || RET_WHO[top][''];
  return { pts, top, sec, id, why, total: picks.length * 3 };
}

function retratoHtml() {
  if (!ret) ret = { i: 0, picks: [], phase: 'intro' };
  if (ret.phase === 'intro') return `
  <div class="pg ret-pg">
    ${topbar('Retrato de época', fromGab ? 'bgab' : '')}
    <div class="ret-intro">
      <div class="ret-frame" aria-hidden="true"><span class="ret-frame-in">${(QICON.bust || QICON.scroll)(150)}</span></div>
      <div class="display" style="font-size:30px;"><em>Quem você seria na História?</em></div>
      <p class="small muted ret-p">Oito perguntas, nenhuma resposta errada. No fim, o personagem que mais combina com o seu jeito.</p>
      <button id="ret-go" class="btn btn-brass btn-lg" type="button">${ICON.play('currentColor', 13)} Pintar o meu retrato</button>
      ${LS.get('retrato', null) ? `<p class="small muted">Da última vez: <b>${(PL.find(p => p.id === LS.get('retrato', {}).id) || {}).n || ''}</b></p>` : ''}
    </div>
  </div>`;
  if (ret.phase === 'res') return retResHtml();
  const q = RET_QS[ret.i];
  return `
  <div class="pg ret-pg">
    ${topbar('Retrato de época', fromGab ? 'bgab' : '')}
    <div class="ret-prog" aria-hidden="true">${RET_QS.map((x, k) => `<i class="${k < ret.i ? 'ok' : k === ret.i ? 'on' : ''}"></i>`).join('')}</div>
    <span class="ret-k">Pergunta ${ret.i + 1} de ${RET_QS.length}</span>
    <div class="display ret-q"><em>${q.t}</em></div>
    <div class="ret-opts">
      ${q.o.map((o, k) => `<button class="ret-opt" data-o="${k}" type="button" style="animation-delay:${(k * .07 + .05).toFixed(2)}s">
        <span class="ret-e" aria-hidden="true">${o[0]}</span><span class="ret-t">${o[1]}</span></button>`).join('')}
    </div>
    ${ret.i > 0 ? '<button id="ret-back" class="btn btn-ghost btn-sm ret-back" type="button">Voltar uma pergunta</button>' : ''}
  </div>`;
}

function retResHtml() {
  const r = retTally(ret.picks), k = RET_KINDS[r.top], p = PL.find(x => x.id === r.id);
  const max = Math.max(...RET_ORDER.map(x => r.pts[x]), 1);
  return `
  <div class="pg pg-center ret-pg ret-res" style="--kc:${k.col}">
    <span class="ret-res-k">Seu retrato de época</span>
    <div class="ret-portrait">${p ? figurinha(p, 'lg', { decorative: true }) : ''}</div>
    <div class="display ret-who"><small>Você seria</small><em>${p ? p.n : ''}</em></div>
    <div class="ret-kind">${(ICON[k.ic] || ICON.star)('currentColor', 13)} ${k.t}${r.sec ? ` <span>com alma de ${RET_KINDS[r.sec].t.replace(/^O /, '').toLowerCase()}</span>` : ''}</div>
    <p class="ret-why">${r.why}</p>
    <p class="ret-d">${k.d}</p>
    <div class="ret-bars" aria-label="${RET_ORDER.map(x => RET_KINDS[x].t + ': ' + r.pts[x]).join(', ')}">
      ${RET_ORDER.map(x => `<span class="ret-bar${x === r.top ? ' is-top' : ''}"><small>${RET_KINDS[x].t.replace(/^O /, '')}</small>
        <i><b style="width:${Math.round(100 * r.pts[x] / max)}%;background:${RET_KINDS[x].col}"></b></i></span>`).join('')}
    </div>
    ${medalChips()}
    <div class="foot-row" style="margin-top:6px;">
      <button id="ret-share" class="btn btn-ghost btn-sm" type="button">Compartilhar</button>
      <button id="ret-again" class="btn btn-brass" type="button">De novo</button>
      <button id="bhome" class="btn btn-ghost btn-sm" type="button">Início</button>
    </div>
  </div>`;
}

function retPick(o) {
  if (!ret || ret.phase !== 'q') return;
  ret.picks[ret.i] = o;
  ret.picks.length = ret.i + 1;
  if (ret.i < RET_QS.length - 1) { ret.i++; snd.select(); go(); return; }
  ret.phase = 'res';
  const r = retTally(ret.picks);
  LS.set('retrato', { id: r.id, top: r.top, sec: r.sec });
  stats.retratos = (stats.retratos || 0) + 1; LS.set('stats', stats);
  window._newMedals = newMedals();
  _retCard = null;
  go();
  /* the portrait comes up: a bell, a little paint */
  try { snd.record(); haptic([14, 40, 14]); } catch (e) {}
  setTimeout(() => { try { fx.rain(30, [RET_KINDS[r.top].col, '#E0B968', '#F3EEDE']); } catch (e) {} }, 500);
  setTimeout(() => { retCard().then(b => { _retCard = b; }).catch(() => {}); }, 900);
}

/* ── the card to share: the portrait, the name, the kind, the bars ── */
let _retCard = null;
async function retCard() {
  const r = retTally(ret.picks), k = RET_KINDS[r.top], p = PL.find(x => x.id === r.id);
  try { await Promise.all(['italic 700 80px Fraunces', '600 40px Fraunces', '800 30px Archivo'].map(f => document.fonts.load(f))); } catch (e) {}
  const img = await new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = p.img; });
  const W = 1080, H = 1350, c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d');
  let pg = g.createRadialGradient(W / 2, H * .4, 80, W / 2, H / 2, H * .8);
  pg.addColorStop(0, '#FBF5E6'); pg.addColorStop(.6, '#F0E3C4'); pg.addColorStop(1, '#D9C397');
  g.fillStyle = pg; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 2400; i++) { g.fillStyle = `rgba(90,60,20,${(.02 + Math.random() * .05).toFixed(3)})`; g.fillRect(Math.random() * W, Math.random() * H, 1.6, 1.6); }
  const text = (t, font, col, y, ls) => { g.font = font; g.fillStyle = col; g.textAlign = 'center'; try { g.letterSpacing = ls || '0px'; } catch (e) {} g.fillText(t, W / 2, y); };
  text('MEU RETRATO DE ÉPOCA', '800 30px Archivo', '#8C6A2A', 120, '9px');
  /* the portrait in a gilt frame */
  const fw = 520, fh = 640, fx0 = (W - fw) / 2, fy0 = 165;
  g.fillStyle = '#7A5420'; g.fillRect(fx0 - 26, fy0 - 26, fw + 52, fh + 52);
  g.fillStyle = '#C9A04E'; g.fillRect(fx0 - 18, fy0 - 18, fw + 36, fh + 36);
  g.fillStyle = '#E8CF8A'; g.fillRect(fx0 - 8, fy0 - 8, fw + 16, fh + 16);
  g.save(); g.beginPath(); g.rect(fx0, fy0, fw, fh); g.clip();
  const s = Math.max(fw / img.width, fh / img.height), iw = img.width * s, ih = img.height * s;
  g.drawImage(img, fx0 + (fw - iw) / 2, fy0 + Math.min(0, (fh - ih) * .25), iw, ih);
  g.restore();
  text('Eu seria', 'italic 600 40px Fraunces', '#6B5B45', 905);
  text(p.n, 'italic 700 80px Fraunces', '#2B2118', 990);
  /* the kind on a ribbon of its colour */
  const kt = k.t + (r.sec ? ' · ' + RET_KINDS[r.sec].t.replace(/^O /, '') : '');
  g.font = '800 30px Archivo'; try { g.letterSpacing = '5px'; } catch (e) {}
  const rw = Math.min(900, g.measureText(kt.toUpperCase()).width + 110);
  g.fillStyle = k.col; g.fillRect((W - rw) / 2, 1030, rw, 70);
  text(kt.toUpperCase(), '800 30px Archivo', '#F6EBD8', 1076, '5px');
  /* the six kinds as six short bars */
  const max = Math.max(...RET_ORDER.map(x => r.pts[x]), 1), bw = 120, gap = 24, x0 = (W - (bw * 6 + gap * 5)) / 2;
  RET_ORDER.forEach((x, i) => { const xx = x0 + i * (bw + gap), h = 8 + 70 * r.pts[x] / max;
    g.fillStyle = 'rgba(107,74,34,.15)'; g.fillRect(xx, 1130, bw, 78);
    g.fillStyle = RET_KINDS[x].col; g.fillRect(xx, 1208 - h, bw, h);
    g.font = '700 19px Archivo'; g.fillStyle = '#5A4A36'; g.textAlign = 'center'; try { g.letterSpacing = '0px'; } catch (e) {}
    g.fillText(RET_KINDS[x].t.replace(/^O /, ''), xx + bw / 2, 1238); });
  text('Quem você seria? · tdosreis.github.io/history-quiz', '700 24px Archivo', '#8C7A60', 1300, '1px');
  return new Promise(ok => c.toBlob(ok, 'image/png'));
}
function retShareText() {
  const r = retTally(ret.picks), p = PL.find(x => x.id === r.id);
  return `Meu retrato de época 🖼️ History Quiz\nEu seria ${p ? p.n : ''}: ${RET_KINDS[r.top].t}${r.sec ? ' com alma de ' + RET_KINDS[r.sec].t.replace(/^O /, '').toLowerCase() : ''}.\nE você, quem seria? ${CHAL_URL}`;
}

function wireRetrato() {
  const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  const ready = tapArmed(260);
  on('ret-go', () => { if (!ready()) return; ret.phase = 'q'; ret.i = 0; ret.picks = []; snd.page(); go(); });
  document.querySelectorAll('.ret-opt').forEach(b => b.addEventListener('click', () => { if (ready()) { b.classList.add('is-picked'); setTimeout(() => retPick(+b.dataset.o), 160); } }));
  on('ret-back', () => { if (!ready() || !ret || ret.i === 0) return; ret.i--; snd.swipe(); go(); });
  on('ret-again', () => { snd.select(); ret = { i: 0, picks: [], phase: 'q' }; go(); });
  on('ret-share', () => {
    const txt = retShareText();
    if (_retCard && navigator.canShare) {
      const file = new File([_retCard], 'meu-retrato.png', { type: 'image/png' });
      if (navigator.canShare({ files: [file] })) { navigator.share({ files: [file], text: txt }).catch(() => {}); return; }
    }
    if (navigator.share) navigator.share({ text: txt }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(txt).then(() => {
      const b = document.getElementById('ret-share'); if (b) { b.dataset.l = b.dataset.l || b.textContent; b.textContent = 'Copiado!'; setTimeout(() => { b.textContent = b.dataset.l; }, 1600); } }).catch(() => {});
  });
}
