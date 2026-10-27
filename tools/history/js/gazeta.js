
/* ═══════════════════════════════════════════════════
   A GAZETA DO SEU DIA — a front page for any day of the year
   Pick a day (your birthday, today, any day) and the Gazeta da História
   prints its front page: the day's great headline with its picture, the
   other things that happened on it, who was born on it, and, for a day the
   almanac knows little about, the week around it. Under the fold, a small
   ad and the weather, as a paper of the past would have them (in jest).
   It comes off the press spinning, and can be sent as a picture.
═══════════════════════════════════════════════════ */
/* the small ads: one per edition, the same for the same day */
const GZ_ADS = [
  'Vende-se: cavalo de madeira, grande, pouco usado. Tratar em Troia.',
  'Aluga-se: barril em Atenas, ideal para filósofos. Falar com Diógenes.',
  'Precisa-se de marinheiros para viagem longa às Índias. Salário em pimenta. Falar com Cristóvão.',
  'Oferece-se pintor para tetos de capela. Prazo: quatro anos. Tratar com M. B.',
  'Troco relógios moles por relógios que funcionem. S. D.',
  'Compro tinta azul para noites estreladas. Pago em girassóis. Vincent.',
  'Vendo mapa-múndi completo. Atenção: ainda falta a América.',
  'Escola de navegação aceita alunos. Medo do mar não é desculpa.',
  'Procura-se mensageiro para levar notícia de Maratona a Atenas. Ótimo preparo físico.',
  'Vende-se tábua de argila com receita de cerveja. Ur, Mesopotâmia.',
  'Aluga-se quarto com vista para a Bastilha. Barulho garantido em julho.',
  'Procura-se professor para rapaz da Macedônia, de gênio forte. Falar com Filipe.',
  'Doa-se um ponto de apoio. Interessados em mover o mundo, procurar Arquimedes.',
  'Clube de leitura: esta semana, Dom Quixote. Traga sua lança.',
  'Telégrafo: aceitam-se mensagens curtas. Cobra-se por palavra.',
  'Vende-se carruagem sem cavalos. Anda sozinha, juram. K. Benz.',
  'Muralha à venda: comprimento enorme, ótima vista, vizinhos do norte agitados.',
  'Perdeu-se um diário num sótão de Amsterdã. Quem achar, guarde com carinho.',
  'Precisa-se de engenheiro para torre que insiste em entortar. Pisa, urgente.',
  'Vendem-se ingressos para o Coliseu. Lugares longe da arena, por segurança.',
  'Ofereço aulas de latim: veni, vidi, vici em três lições. J. César.',
  'Procura-se quem saiba ler hieróglifos. Tratar com um tal Champollion.',
];
/* the weather, as each age would print it */
const GZ_WX = [
  'Céu limpo sobre o Mediterrâneo; ventos favoráveis às caravelas.',
  'Neblina em Londres, como de costume. Leve o guarda-chuva.',
  'Calor no Nilo; cheia prevista para o fim do verão.',
  'Frio intenso nas estepes. Cavaleiros mongóis, agasalhem-se.',
  'Chuva de ideias em Florença, com pancadas de genialidade à tarde.',
  'Tempo instável em Paris: possibilidade de revolução no fim de semana.',
  'Monção chegando à Índia; mercadores, protejam a pimenta.',
  'Sol forte no sertão; levar água para a travessia.',
  'Ventos de mudança por toda parte. Segurem os chapéus.',
  'Noite clara: ótima para observar as luas de Júpiter.',
  'Mar agitado no Cabo das Tormentas. Navegadores, cuidado com o gigante.',
  'Garoa em São Paulo; nada que estrague um bom café.',
];

let gz = null;   // { m, d, phase: 'pick'|'paper', spun }
const gzDoy = (m, d) => { const n = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; let k = d; for (let i = 0; i < m - 1; i++) k += n[i]; return k; };
const gzDate = (m, d) => `${d} de ${MES_LONGO[m - 1]}`;

function startGazeta() {
  const kept = LS.get('gazetaDia', null), now = new Date();
  gz = { m: kept ? kept[0] : now.getMonth() + 1, d: kept ? kept[1] : now.getDate(), phase: 'pick' };
  sc = 'gazeta';
  go();
}
/* the day's news: what happened on it, who was born on it, and the days around it for a thin day */
function gzNews(m, d) {
  const doy = gzDoy(m, d);
  const same = ALMANAC.filter(e => e[0] === m && e[1] === d).sort((a, b) => a[2] - b[2]);
  const births = Object.keys(BDAYS).filter(id => BDAYS[id][0] === m && BDAYS[id][1] === d)
    .map(id => PL.find(p => p.id === id)).filter(p => p && p.img).sort((a, b) => a.era[0] - b.era[0]);
  const week = ALMANAC.filter(e => !(e[0] === m && e[1] === d)).map(e => ({ e, k: Math.min(Math.abs(gzDoy(e[0], e[1]) - doy), 366 - Math.abs(gzDoy(e[0], e[1]) - doy)) }))
    .filter(x => x.k <= 4).sort((a, b) => a.k - b.k || a.e[2] - b.e[2]).map(x => x.e);
  /* the headline: the day's own, a portrait if there is one, else the nearest of the week */
  const pics = same.filter(e => PL.some(p => p.id === e[4] && p.img));
  const lead = pics[0] || same[0] || week[0] || null;
  const rest = same.filter(e => e !== lead);
  return { lead, leadSame: !!(lead && same.includes(lead)), rest, births, week: week.filter(e => e !== lead) };
}
/* the riddle of the day, for a thin day: one of the charadas, the same for the same day */
function gzRiddle(doy) {
  const qs = CATS.flatMap(c => c.qs).filter(q => q.rebus && q.d <= 2);
  if (!qs.length) return null;
  const q = qs[(doy * 13) % qs.length];
  const a = q.type === 'player' ? (PL.find(p => p.id === q.a[0]) || {}).n : q.a[0];
  return { e: q.rebus.e, k: q.rebus.k ? maskAnswer(q.rebus.k, q) : '', a };
}
/* the lead's picture, large: a portrait, a brasão, a flag, or the printer's ornament */
function gzPic(id) {
  const p = PL.find(x => x.id === id);
  if (p && p.img) return `<span class="gz-pic gz-face"><img src="${p.img}" alt="" aria-hidden="true"></span>`;
  if (CL.some(c => c.id === id)) return `<span class="gz-pic gz-crest">${clubArt(id, '', false)}</span>`;
  if (FLAGS[id]) return `<span class="gz-pic gz-flag"><svg viewBox="0 0 9 6" preserveAspectRatio="none" aria-hidden="true">${FLAGS[id]}</svg></span>`;
  return `<span class="gz-pic gz-orn">${QICON.scroll(90)}</span>`;
}

function gazetaHtml() {
  if (!gz) { const now = new Date(); gz = { m: now.getMonth() + 1, d: now.getDate(), phase: 'pick' }; }
  if (gz.phase === 'paper') return gzPaperHtml();
  const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][gz.m - 1];
  return `
  <div class="pg gz-pg">
    ${topbar('A Gazeta do seu dia', 'gz-back')}
    <div class="cron-menu-in">
      <span class="gz-fold" aria-hidden="true">${ICON.news('currentColor', 30)}</span>
      <div class="display" style="font-size:30px;"><em>Que dia é o seu?</em></div>
      <p class="small muted cron-menu-p">Escolha um dia do ano (o do seu aniversário, por exemplo) e a Gazeta da História imprime a primeira página dele: tudo o que aconteceu, quem nasceu.</p>
      <div class="gz-sel">
        <label><span>Dia</span><select id="gz-d" aria-label="Dia">${Array.from({ length: days }, (_, i) => `<option value="${i + 1}"${i + 1 === gz.d ? ' selected' : ''}>${i + 1}</option>`).join('')}</select></label>
        <label><span>Mês</span><select id="gz-m" aria-label="Mês">${MES_LONGO.map((n, i) => `<option value="${i + 1}"${i + 1 === gz.m ? ' selected' : ''}>${n}</option>`).join('')}</select></label>
      </div>
      <button id="gz-today" class="btn btn-ghost btn-sm" type="button">${ICON.calendar('currentColor', 12)} Hoje</button>
      <button id="gz-print" class="btn btn-brass btn-lg" type="button">${ICON.news('currentColor', 14)} Imprimir a edição</button>
    </div>
  </div>`;
}

function gzPaperHtml() {
  const { m, d } = gz, n = gzNews(m, d), doy = gzDoy(m, d);
  const ad = GZ_ADS[(doy * 7) % GZ_ADS.length], wx = GZ_WX[(doy * 5 + 3) % GZ_WX.length];
  const L = n.lead;
  const also = n.rest.slice(0, 4);
  /* the left column: the day's other news, or the week's; the right: who was born, or more of the week,
     or (a thin day) the riddle of the day, its answer printed upside down as the old papers did */
  const left = also.length ? also : n.week.slice(0, 4);
  const right = n.births.length ? null : (also.length ? n.week.slice(0, 4) : n.week.slice(4, 8));
  const riddle = !n.births.length && !(right && right.length) ? gzRiddle(doy) : null;
  const item = (e, withDate) => `<p><b class="num">${yearTxt(e[2])}${withDate ? ' · ' + e[1] + '/' + e[0] : ''}</b> ${_esc(e[3])}</p>`;
  return `
  <div class="pg gz-pg gz-on">
    ${topbar('A Gazeta do seu dia', 'gz-back')}
    <article class="gz-paper${gz.spun ? '' : ' is-new'}" id="gz-paper" aria-label="A Gazeta da História, ${gzDate(m, d)}">
      <div class="gz-ears"><span>Edição nº ${doy}</span><span>Ano: todos</span><span>Preço: 1 vintém</span></div>
      <header class="gz-mast">
        <h1><span aria-hidden="true">❦</span> A Gazeta da História <span aria-hidden="true">❦</span></h1>
      </header>
      <div class="gz-dateline"><b>${gzDate(m, d)}</b><span>Edição especial · tudo o que aconteceu neste dia, em todos os anos</span></div>
      ${L ? `<section class="gz-lead">
        ${gzPic(L[4])}
        <div class="gz-lead-t"><small>${yearTxt(L[2])}${n.leadSame ? '' : ' · ' + gzDate(L[0], L[1])}</small><h2>${_esc(L[3])}</h2></div>
      </section>` : `<section class="gz-lead gz-quiet"><h2>Dia tranquilo na História: nenhuma grande notícia nos nossos arquivos.</h2></section>`}
      <div class="gz-cols">
        <section class="gz-col">
          <h3>${also.length ? 'Também neste dia' : 'Na mesma semana'}</h3>
          ${left.map(e => item(e, !also.length)).join('') || '<p class="gz-none">Nada mais nos arquivos.</p>'}
        </section>
        <section class="gz-col">
          ${n.births.length ? `<h3>Nasceram neste dia</h3>${n.births.slice(0, 4).map(p => `<p class="gz-born"><span class="gz-born-pic"><img src="${p.img}" alt="" aria-hidden="true"></span>
              <span><b>${p.n}</b><small>${yearTxt(p.era[0])}</small></span></p>`).join('')}`
          : riddle ? `<h3>Charada do dia</h3><div class="gz-riddle"><span class="gz-rb">${riddle.e.map(x => `<i>${x}</i>`).join('')}</span>
              ${riddle.k ? `<small>${riddle.k}</small>` : ''}<span class="gz-upside" aria-label="Resposta: ${_esc(riddle.a)}">Resposta: ${riddle.a}</span></div>`
          : `<h3>${also.length ? 'Na mesma semana' : 'Também na semana'}</h3>${right.map(e => item(e, true)).join('')}`}
        </section>
      </div>
      <footer class="gz-foot">
        <div><h4>Classificados</h4><p>${ad}</p></div>
        <div><h4>O tempo</h4><p>${wx}</p></div>
      </footer>
    </article>
    <div class="foot-row gz-actions">
      <button id="gz-share" class="btn btn-ghost btn-sm" type="button">Compartilhar</button>
      <button id="gz-other" class="btn btn-brass" type="button">Outro dia</button>
      <button id="bhome" class="btn btn-ghost btn-sm" type="button">Início</button>
    </div>
  </div>`;
}

/* the press: a run of clacks, faster and faster, and the page landing */
Object.assign(snd, {
  press() {
    for (let i = 0; i < 9; i++) {
      const t = .05 + i * (.11 - i * .007);
      noise(.03, { type: 'bandpass', freq: 900 + i * 60, q: 1.2, vol: .045, attack: .002, delay: t });
      tone(140, .05, { type: 'square', vol: .012, to: 90, delay: t });
    }
    noise(.16, { type: 'lowpass', freq: 600, q: .7, vol: .07, attack: .004, delay: .82 });
  },
});

function gzPrint() {
  gz.phase = 'paper'; gz.spun = false;
  LS.set('gazetaDia', [gz.m, gz.d]);
  stats.gazetas = (stats.gazetas || 0) + 1; LS.set('stats', stats);
  try { snd.press(); haptic([10, 30, 10, 30, 40]); } catch (e) {}
  _gzCard = null;
  go();
  setTimeout(() => { if (gz) gz.spun = true; }, 50);
  setTimeout(() => { gzCard().then(b => { _gzCard = b; }).catch(() => {}); }, 1100);
}

/* ── the front page as a picture, to send: masthead, headline, the other news, the ad ── */
let _gzCard = null;
async function gzCard() {
  const { m, d } = gz, n = gzNews(m, d), doy = gzDoy(m, d);
  try { await Promise.all(['italic 700 90px Fraunces', '700 50px Fraunces', '700 28px Archivo'].map(f => document.fonts.load(f))); } catch (e) {}
  const W = 1080, H = 1350, c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d'), ink = '#1E1A16';
  g.fillStyle = '#F3EAD3'; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 3200; i++) { g.fillStyle = `rgba(60,40,15,${(.02 + Math.random() * .045).toFixed(3)})`; g.fillRect(Math.random() * W, Math.random() * H, 1.5, 1.5); }
  const T = (t, font, x, y, al, col) => { g.font = font; g.fillStyle = col || ink; g.textAlign = al || 'left'; g.fillText(t, x, y); };
  const rule = (y, w) => { g.fillStyle = ink; g.fillRect(60, y, W - 120, w || 3); };
  /* text in a column, wrapped to its width, at most so many lines */
  const wrap = (t, font, x, y, w, lh, max, col) => {
    g.font = font; g.fillStyle = col || ink; g.textAlign = 'left';
    const words = String(t).split(/\s+/); let line = '', n2 = 0;
    for (let i = 0; i < words.length; i++) {
      const test = line ? line + ' ' + words[i] : words[i];
      if (g.measureText(test).width > w && line) {
        if (n2 === max - 1) { g.fillText(line.replace(/[,;:]?$/, '…'), x, y + n2 * lh); return y + (n2 + 1) * lh; }
        g.fillText(line, x, y + n2 * lh); n2++; line = words[i];
      } else line = test;
    }
    if (line) { g.fillText(line, x, y + n2 * lh); n2++; }
    return y + n2 * lh;
  };
  T(`EDIÇÃO Nº ${doy}`, '700 22px Archivo', 70, 92); T('PREÇO: 1 VINTÉM', '700 22px Archivo', W - 70, 92, 'right');
  T('A Gazeta da História', 'italic 700 92px Fraunces', W / 2, 190, 'center');
  rule(214, 4); rule(222, 1.5);
  T(gzDate(m, d).toUpperCase(), '700 28px Archivo', 70, 262);
  T('TUDO O QUE ACONTECEU NESTE DIA', '700 20px Archivo', W - 70, 260, 'right', '#5A4A36');
  rule(282, 1.5);
  let y = 340;
  const L = n.lead;
  if (L) {
    const p = PL.find(x => x.id === L[4] && x.img);
    let tx = 70, tw = W - 140;
    if (p) {
      try {
        const img = await new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = p.img; });
        const pw = 300, ph = 380, s = Math.max(pw / img.width, ph / img.height);
        g.save(); g.beginPath(); g.rect(70, 316, pw, ph); g.clip();
        g.filter = 'grayscale(1) contrast(1.1) sepia(.25)';
        g.drawImage(img, 70 + (pw - img.width * s) / 2, 316 + Math.min(0, (ph - img.height * s) * .25), img.width * s, img.height * s);
        g.restore(); g.filter = 'none';
        g.strokeStyle = ink; g.lineWidth = 2; g.strokeRect(70, 316, pw, ph);
        tx = 400; tw = W - 470;
      } catch (e) {}
    }
    T(yearTxt(L[2]) + (n.leadSame ? '' : ' · ' + gzDate(L[0], L[1])), '700 26px Archivo', tx, y, 'left', '#7B1E1E');
    y = wrap(L[3], '700 50px Fraunces', tx, y + 62, tw, 60, p ? 6 : 4);
    y = Math.max(y, p ? 720 : y) + 20;
  }
  rule(y, 1.5); y += 54;
  const also = n.rest.slice(0, 3), news = also.length ? also : n.week.slice(0, 3);
  T(also.length ? 'TAMBÉM NESTE DIA' : 'NA MESMA SEMANA', '700 24px Archivo', 70, y); y += 46;
  news.forEach(e => { T(yearTxt(e[2]) + (also.length ? '' : ' · ' + e[1] + '/' + e[0]), '700 26px Archivo', 70, y, 'left', '#7B1E1E');
    y = wrap(e[3], '500 30px Fraunces', 270, y, W - 340, 38, 2) + 18; });
  if (n.births.length) { y += 8; rule(y, 1.5); y += 50; T('NASCERAM NESTE DIA', '700 24px Archivo', 70, y); y += 46;
    y = wrap(n.births.slice(0, 4).map(p => `${p.n} (${yearTxt(p.era[0])})`).join(' · '), 'italic 600 32px Fraunces', 70, y, W - 140, 42, 2) + 10; }
  /* the ad, boxed, at the foot */
  const fy = H - 190; rule(fy - 30, 4);
  T('CLASSIFICADOS', '700 22px Archivo', 70, fy + 6);
  wrap(GZ_ADS[(doy * 7) % GZ_ADS.length], 'italic 500 28px Fraunces', 70, fy + 48, W - 140, 36, 2, '#3B2A16');
  T('Qual é o seu dia? · tdosreis.github.io/history-quiz', '700 22px Archivo', W / 2, H - 40, 'center', '#6B5B45');
  return new Promise(ok => c.toBlob(ok, 'image/png'));
}
function gzShareText() {
  const n = gzNews(gz.m, gz.d), L = n.lead;
  return `📰 A Gazeta da História · ${gzDate(gz.m, gz.d)}\n${L ? `${yearTxt(L[2])}: ${L[3]}` : 'Um dia tranquilo na História.'}\n${n.births.length ? 'Nasceram neste dia: ' + n.births.slice(0, 3).map(p => p.n).join(', ') + '\n' : ''}Qual é o seu dia? ${CHAL_URL}`;
}

function wireGazeta() {
  const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  const ready = tapArmed(260);
  const dSel = document.getElementById('gz-d'), mSel = document.getElementById('gz-m');
  if (mSel) mSel.addEventListener('change', () => { gz.m = +mSel.value; const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][gz.m - 1]; gz.d = Math.min(gz.d, days); snd.tap(); go(); });
  if (dSel) dSel.addEventListener('change', () => { gz.d = +dSel.value; snd.tap(); });
  on('gz-today', () => { const t = new Date(); gz.m = t.getMonth() + 1; gz.d = t.getDate(); snd.tap(); go(); });
  on('gz-print', () => { if (ready()) gzPrint(); });
  on('gz-other', () => { if (!ready()) return; gz.phase = 'pick'; snd.swipe(); go(); });
  on('gz-back', () => { snd.swipe(); if (gz && gz.phase === 'paper') { gz.phase = 'pick'; go(); } else { sc = 'anoMenu'; go(); } });
  on('gz-share', () => {
    const txt = gzShareText();
    if (_gzCard && navigator.canShare) {
      const file = new File([_gzCard], 'gazeta-' + gz.d + '-' + gz.m + '.png', { type: 'image/png' });
      if (navigator.canShare({ files: [file] })) { navigator.share({ files: [file], text: txt }).catch(() => {}); return; }
    }
    if (navigator.share) navigator.share({ text: txt }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(txt).then(() => {
      const b = document.getElementById('gz-share'); if (b) { b.dataset.l = b.dataset.l || b.textContent; b.textContent = 'Copiado!'; setTimeout(() => { b.textContent = b.dataset.l; }, 1600); } }).catch(() => {});
  });
}
