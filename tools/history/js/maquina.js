
/* ═══════════════════════════════════════════════════
   MÁQUINA DO TEMPO — short adventures in a moment of history. The machine
   drops you in Lisbon in 1500, in Rome the day before the Ides of March,
   in Paris on 14 July 1789, in Rio when the court arrives in 1808. Each
   scene is a page with its picture and a choice; most choices ask what
   you know of where you are — a wrong one costs one of three hourglasses
   (and tells you how it really was), and with none left the machine pulls
   you home. The last choice is yours alone, and decides the ending.
   History does not change; you only decide how you come out of it.
   Each scene: [picture, what happens, [[choice, right?, what you learn]…]];
   the last scene's choices lead to the endings, [title, picture, text].
═══════════════════════════════════════════════════ */
const MT_LIVES = 3;
const MT_ADV = [
  { id: 'cabral', t: 'Na frota de Cabral', y: 1500, place: 'Lisboa → Terra de Vera Cruz', s: 'chegada_cabral', col: '#2E5E7E',
    intro: 'Você embarca como grumete numa frota de treze navios. O capitão-mor tem uns 32 anos e uma missão do rei.',
    scenes: [
      ['ev_grandes_navegacoes', 'Lisboa, 9 de março de 1500. No cais do Restelo, marinheiros carregam biscoito, vinho e pólvora em treze navios. O capitão-mor é Pedro Álvares Cabral. Qual é o destino oficial da frota?',
        [['Calicute, nas Índias', true, 'Isso: a frota seguia a rota que Vasco da Gama abrira em 1498, contornando a África.'],
         ['As terras que Colombo achou a oeste', false, 'O destino oficial era Calicute, na Índia, pela rota de Vasco da Gama.'],
         ['A China', false, 'Os portugueses só chegariam à China anos depois. O destino era Calicute, na Índia.']]],
      ['dhow_oceano', 'Passadas as ilhas de Cabo Verde, o piloto explica: para contornar a África, não se vai colado à costa, onde há calmarias e ventos contrários. Para que lado a frota deve abrir?',
        [['Para oeste, mar adentro, numa grande volta', true, 'É a «volta do mar»: os navios se afastavam para oeste para pegar ventos que os levassem ao sul.'],
         ['Para leste, junto à costa da África', false, 'Junto à costa as calmarias atrasavam tudo; os pilotos portugueses aprenderam a abrir para oeste, na «volta do mar».']]],
      ['chegada_cabral', '22 de abril. Do alto do mastro, alguém grita: terra à vista! Primeiro surge um monte alto e redondo. Que nome os portugueses dão a ele?',
        [['Monte Pascoal', true, 'Era a semana da Páscoa — por isso, Pascoal. O monte fica no sul da Bahia.'],
         ['Pão de Açúcar', false, 'O Pão de Açúcar fica no Rio de Janeiro. O monte avistado, no sul da Bahia, ganhou o nome de Pascoal, pela Páscoa.'],
         ['Corcovado', false, 'O Corcovado fica no Rio de Janeiro. O monte avistado foi o Pascoal, na Bahia.']]],
      ['chegada_cabral', 'Na praia aparecem homens com arcos e flechas, que trocam presentes com os marinheiros. Um escrivão anota tudo numa longa carta ao rei. Quem é ele?',
        [['Pero Vaz de Caminha', true, 'A carta de Caminha é considerada a «certidão de nascimento» do Brasil.'],
         ['Bartolomeu Dias', false, 'Bartolomeu Dias estava na frota, mas como capitão de um navio. A carta é de Pero Vaz de Caminha.'],
         ['Luís de Camões', false, 'Camões só nasceria por volta de 1524. A carta é de Pero Vaz de Caminha.']]],
      ['chegada_cabral', 'No domingo, 26 de abril, frei Henrique de Coimbra reza a primeira missa, observada pelos indígenas. Que nome Cabral dá à terra, pensando que é uma ilha?',
        [['Ilha de Vera Cruz', true, 'Depois veio Terra de Santa Cruz — e só mais tarde o nome Brasil, do pau-brasil.'],
         ['Brasil', false, 'O nome Brasil, do pau-brasil, só pegou anos depois. Cabral, achando que era uma ilha, chamou-a de Ilha de Vera Cruz.'],
         ['Nova Lusitânia', false, 'Cabral, achando que era uma ilha, chamou-a de Ilha de Vera Cruz.']]],
      ['adamastor', 'Em 2 de maio a frota parte para a Índia, e um navio volta a Lisboa com a carta de Caminha. Você precisa escolher o seu.',
        [['Volto a Lisboa com a notícia', null, 'mensageiro'], ['Sigo com a frota para a Índia', null, 'india']]],
    ],
    ends: {
      mensageiro: ['O mensageiro', 'ev_grandes_navegacoes', 'Você desembarca em Lisboa com a carta. Caminha escreveu ao rei D. Manuel que a terra era tão graciosa que, querendo aproveitá-la, «dar-se-á nela tudo».'],
      india: ['Rumo às Índias', 'adamastor', 'Perto do Cabo da Boa Esperança, uma tempestade afunda quatro navios — num deles ia Bartolomeu Dias, o primeiro a dobrar aquele cabo. Você sobrevive e chega a Calicute em setembro de 1500.'],
    } },
  { id: 'cesar', t: 'Os Idos de Março', y: -44, place: 'Roma', s: 'forum_romano', col: '#7B2D26',
    intro: 'Você acorda no Fórum, copista na casa de um senador. A cidade fala de um homem só: Júlio César.',
    scenes: [
      ['forum_romano', 'Roma, março de 44 a.C. César venceu a guerra civil, e o Senado lhe deu um título que nenhum romano tivera. Qual?',
        [['Ditador perpétuo', true, 'Ditador para sempre: para muitos senadores, era um rei sem a coroa.'],
         ['Imperador de Roma', false, 'Roma ainda era uma república; o primeiro imperador seria Augusto, em 27 a.C.'],
         ['Rei de Roma', false, 'Os romanos odiavam a palavra «rei» — e o medo de que César quisesse ser um ajudou a matá-lo.']]],
      ['loba_capitolina', 'Na rua, um adivinho chamado Espurina repete a quem quiser ouvir o aviso que já deu a César. Qual era?',
        [['Que o perigo viria até os Idos de Março', true, 'Os Idos de Março são o dia 15. Shakespeare imortalizou o aviso: «Cuidado com os Idos de Março».'],
         ['Que não atravessasse o Rubicão', false, 'O Rubicão César já tinha atravessado em 49 a.C. — «a sorte está lançada».'],
         ['Que desconfiasse de Cleópatra', false, 'O aviso de Espurina era sobre os Idos de Março, o dia 15.']]],
      ['estatua_equestre', 'Na manhã de 15 de março, Calpúrnia, a esposa de César, conta um sonho ruim e pede que ele fique em casa. Quem o convence a ir ao Senado assim mesmo?',
        [['Décimo Bruto, um dos conspiradores', true, 'Décimo Bruto zombou dos agouros e levou César pela mão.'],
         ['Marco Antônio', false, 'Marco Antônio era fiel a César — tanto que um conspirador o segurou conversando do lado de fora.'],
         ['Cícero', false, 'Quem o convenceu foi Décimo Bruto, um dos conspiradores.']]],
      ['forum_romano', 'A reunião do Senado não é na Cúria do Fórum. Onde os senadores se reúnem naquele dia?',
        [['Numa sala do teatro de Pompeu', true, 'A Cúria antiga tinha queimado anos antes; o Senado se reunia no complexo do teatro de Pompeu.'],
         ['No Coliseu', false, 'O Coliseu só seria inaugurado em 80 d.C., mais de um século depois.'],
         ['No Capitólio', false, 'Foi numa sala do teatro de Pompeu — César caiu junto à estátua do antigo rival.']]],
      ['ev_fim_republica', 'Lá dentro, os conspiradores cercam César com punhais escondidos nas togas. Segundo o historiador Suetônio, quantas punhaladas ele recebe?',
        [['Vinte e três', true, 'E, diz Suetônio, só uma delas foi mortal.'],
         ['Três', false, 'Suetônio conta vinte e três punhaladas — e só uma delas teria sido mortal.'],
         ['Cem', false, 'Suetônio conta vinte e três.']]],
      ['forum_romano', 'Roma vai ferver. Você precisa levar a notícia a alguém.',
        [['A Marco Antônio, que fará o discurso no funeral', null, 'funeral'], ['A Otaviano, o jovem herdeiro de César', null, 'herdeiro']]],
    ],
    ends: {
      funeral: ['O discurso', 'forum_romano', 'No funeral, Marco Antônio mostra a toga furada de César e lê o testamento que deixa dinheiro a cada romano. O povo se volta contra os conspiradores, que fogem da cidade.'],
      herdeiro: ['O herdeiro', 'estatua_equestre', 'Você encontra Otaviano em Apolônia, do outro lado do mar Adriático. Ele tem 18 anos e acaba de saber que é filho adotivo de César. Em 27 a.C. será Augusto, o primeiro imperador.'],
    } },
  { id: 'bastilha', t: 'O dia da Bastilha', y: 1789, place: 'Paris', s: 'ev_revolucao_francesa', col: '#2E4A7A',
    intro: 'A máquina para numa rua estreita do bairro de Saint-Antoine, de manhã cedo. Ouve-se um tambor.',
    scenes: [
      ['ev_revolucao_francesa', 'Paris, 14 de julho de 1789. O povo está furioso: dias antes, o rei Luís XVI demitiu um ministro querido. Quem?',
        [['Jacques Necker', true, 'Necker era o ministro das finanças, popular entre o povo; a demissão, em 11 de julho, incendiou Paris.'],
         ['Robespierre', false, 'Robespierre ainda era um deputado pouco conhecido. O demitido foi Jacques Necker.'],
         ['Napoleão', false, 'Napoleão era um jovem tenente de artilharia, longe de Paris. O demitido foi Jacques Necker.']]],
      ['guilhotina', 'De manhã, a multidão invade o hospital dos Inválidos e leva milhares de fuzis. Mas falta uma coisa para atirar. O quê?',
        [['Pólvora — e ela está na Bastilha', true, 'A pólvora tinha sido levada para a Bastilha dias antes. Para lá a multidão marchou.'],
         ['Canhões', false, 'Faltava pólvora — e ela estava guardada na Bastilha.'],
         ['Cavalos', false, 'Faltava pólvora — e ela estava guardada na Bastilha.']]],
      ['ev_revolucao_francesa', 'Diante da fortaleza, alguém jura que lá dentro há centenas de presos políticos. É verdade?',
        [['Não: são só sete presos', true, 'Sete: quatro falsários, dois loucos e um nobre. A Bastilha valia como símbolo — e pela pólvora.'],
         ['Sim, centenas', false, 'Eram só sete presos. A Bastilha valia como símbolo — e pela pólvora.'],
         ['Nenhum', false, 'Havia sete presos — quatro falsários, dois loucos e um nobre.']]],
      ['ev_revolucao_francesa', 'À tarde, depois de horas de tiros, o comandante da fortaleza se rende. Qual é o nome dele?',
        [['Bernard-René de Launay', true, 'De Launay foi levado pela multidão e morto a caminho da prefeitura.'],
         ['Marquês de Lafayette', false, 'Lafayette assumiria, no dia seguinte, a nova Guarda Nacional de Paris. O comandante era De Launay.'],
         ['Luís XVI', false, 'O rei estava em Versalhes. O comandante da Bastilha era Bernard-René de Launay.']]],
      ['versalhes_espelhos', 'Em Versalhes, o rei ouve a notícia. Conta-se que perguntou: «É uma revolta?» O que lhe responderam?',
        [['«Não, Majestade, é uma revolução»', true, 'A resposta é atribuída ao duque de La Rochefoucauld-Liancourt.'],
         ['«Que comam brioches»', false, 'Essa frase é atribuída, sem prova nenhuma, a Maria Antonieta.'],
         ['«O Estado sou eu»', false, 'Essa frase é atribuída a Luís XIV, mais de um século antes.']]],
      ['ev_revolucao_francesa', 'Nos dias seguintes a Bastilha começa a ser demolida. O que você leva de lembrança?',
        [['Uma pedra da fortaleza', null, 'pedra'], ['A chave da Bastilha', null, 'chave']]],
    ],
    ends: {
      pedra: ['A pedra', 'ev_revolucao_francesa', 'Um empreiteiro chamado Palloy, encarregado da demolição, mandou esculpir pedras da Bastilha em miniaturas da fortaleza e as vendeu pela França. Você chegou antes dele.'],
      chave: ['A chave', 'versalhes_espelhos', 'Você entrega a chave ao marquês de Lafayette. Em 1790 ele a manda de presente a George Washington — e ela está até hoje em Mount Vernon, nos Estados Unidos.'],
    } },
  { id: 'corte', t: 'A corte chega ao Rio', y: 1808, place: 'Rio de Janeiro', s: 'corte_1808', col: '#2E6B3F',
    intro: 'A máquina para no cais do Rio de Janeiro. A cidade inteira está na rua, olhando para o mar.',
    scenes: [
      ['corte_1808', 'Março de 1808. Navios entram na baía de Guanabara trazendo a família real portuguesa. Do que ela fugiu?',
        [['Das tropas de Napoleão, que invadiram Portugal', true, 'Em novembro de 1807, com o exército francês às portas de Lisboa, a corte embarcou para o Brasil.'],
         ['De uma peste em Lisboa', false, 'A corte fugiu das tropas de Napoleão, que invadiram Portugal em 1807.'],
         ['De um terremoto', false, 'O grande terremoto de Lisboa foi em 1755. Em 1807, a fuga era das tropas de Napoleão.']]],
      ['salvador_colonial', 'Antes do Rio, a corte parou em Salvador, onde o príncipe regente assinou um decreto famoso. Qual?',
        [['A abertura dos portos às nações amigas', true, 'Em janeiro de 1808: o Brasil podia, enfim, comerciar com outros países além de Portugal.'],
         ['A abolição da escravidão', false, 'A abolição só viria em 1888, com a Lei Áurea. O decreto foi a abertura dos portos.'],
         ['A independência do Brasil', false, 'A independência seria em 1822. O decreto de Salvador foi a abertura dos portos.']]],
      ['corte_1808', 'Quem governa no lugar da mãe, a rainha D. Maria I, considerada incapaz?',
        [['O príncipe regente D. João', true, 'D. João só seria aclamado rei, D. João VI, em 1818, no Rio de Janeiro.'],
         ['D. Pedro', false, 'D. Pedro tinha só nove anos. Quem governava era o príncipe regente D. João.'],
         ['D. Sebastião', false, 'D. Sebastião sumiu na batalha de Alcácer-Quibir, em 1578, e virou lenda. Quem governava era D. João.']]],
      ['rio_oitocentista', 'Faltam casas para tantos nobres. Nas portas escolhidas os funcionários pintam P.R., de «Príncipe Regente». Como os cariocas leem as letras?',
        [['«Ponha-se na rua»', true, 'Os donos das casas marcadas tinham de entregá-las à corte.'],
         ['«Por respeito»', false, 'Os cariocas liam «Ponha-se na rua»: os donos tinham de entregar as casas à corte.'],
         ['«Pague a renda»', false, 'Os cariocas liam «Ponha-se na rua»: os donos tinham de entregar as casas à corte.']]],
      ['prensa_tipos', 'Ainda em 1808 a corte cria coisas novas no Rio. Qual destas é desse ano?',
        [['A Imprensa Régia, a primeira gráfica oficial', true, 'Até então era proibido imprimir no Brasil. A Imprensa Régia começou a funcionar em maio de 1808.'],
         ['A Universidade de São Paulo', false, 'A USP é de 1934. Em 1808 nasceu a Imprensa Régia, a primeira gráfica oficial.'],
         ['O Cristo Redentor', false, 'O Cristo foi inaugurado em 1931. Em 1808 nasceu a Imprensa Régia.']]],
      ['rio_oitocentista', 'D. João tem dois projetos para aquele ano, e você pode ajudar num deles.',
        [['Plantar o jardim de aclimatação', null, 'jardim'], ['Abrir o primeiro banco do Brasil', null, 'banco']]],
    ],
    ends: {
      jardim: ['O jardim', 'rio_oitocentista', 'Em junho de 1808 nasce o Real Horto, para aclimatar plantas vindas do Oriente, como chá e especiarias. Hoje é o Jardim Botânico do Rio, e suas palmeiras-imperiais descendem da primeira, plantada pelo próprio D. João.'],
      banco: ['O banco', 'corte_1808', 'Em outubro de 1808 é fundado o Banco do Brasil, para pagar as contas da corte e pôr moeda em circulação. Você assina como testemunha.'],
    } },
];

let mt = null;   // { adv, i, lives, mistakes, phase: 'menu'|'warp'|'scene'|'after'|'end', pick, ok, end }
const mtSaved = () => LS.get('maquina', {});
function startMaquina() { isDaily = false; isSurv = false; isMil = false; isRev = false; mt = { phase: 'menu' }; sc = 'maquina'; go(); }
function mtGo(id) {
  const a = MT_ADV.find(x => x.id === id); if (!a) return;
  mt = { adv: a, i: 0, lives: MT_LIVES, mistakes: 0, phase: 'warp', pick: null };
  try { snd.warp(); } catch (e) {}
  go();
  setTimeout(() => { if (mt && mt.phase === 'warp' && mt.adv === a) { mt.phase = 'scene'; go(); } }, FX_STILL ? 0 : 1700);
}
function mtChoose(k) {
  if (!mt || mt.phase !== 'scene') return;
  const sc0 = mt.adv.scenes[mt.i], c = sc0[2][k];
  if (!c) return;
  if (c[1] === null) return mtEnd(c[2]);
  mt.pick = k; mt.ok = c[1]; mt.phase = 'after';
  if (!c[1]) { mt.lives--; mt.mistakes++; try { snd.wrong(); haptic([28, 45, 28]); } catch (e) {} }
  else try { snd.correct(mt.i); } catch (e) {}
  go();
}
function mtNext() {
  if (!mt || mt.phase !== 'after') return;
  if (mt.lives <= 0) return mtEnd(null);
  mt.i++; mt.pick = null; mt.phase = 'scene';
  try { snd.page(); } catch (e) {}
  go();
}
function mtEnd(key) {
  mt.phase = 'end'; mt.end = key;
  const stars = key ? Math.max(1, MT_LIVES - mt.mistakes) : 0;
  mt.stars = stars;
  const sv = mtSaved(); if (stars > (sv[mt.adv.id] || 0)) { sv[mt.adv.id] = stars; LS.set('maquina', sv); }
  const ends = LS.get('maquinaFins', {}); if (key) { ends[mt.adv.id + ':' + key] = 1; LS.set('maquinaFins', ends); }
  stats.mtTrips = (stats.mtTrips || 0) + 1;
  stats.mtDone = Object.keys(mtSaved()).length; stats.mtEnds = Object.keys(ends).length;
  LS.set('stats', stats);
  window._newMedals = newMedals();
  go();
  setTimeout(() => { try { if (key) { snd.fanfare(); if (stars === 3) fx.rain(50); } else snd.final(false); } catch (e) {} }, 300);
}

const mtYear = y => y < 0 ? `${-y} a.C.` : String(y);
const mtStars = n => `<span class="mt-stars" aria-label="${n} de 3 estrelas">${[0, 1, 2].map(i => `<i class="${i < n ? 'on' : ''}">★</i>`).join('')}</span>`;
const mtHg = () => `<span class="mt-hg" aria-label="${mt.lives} de ${MT_LIVES} ampulhetas">${Array.from({ length: MT_LIVES }, (_, i) => `<i class="${i < mt.lives ? 'on' : ''}">${ICON.hourglass('currentColor', 14)}</i>`).join('')}</span>`;
function maquinaHtml() {
  if (!mt) mt = { phase: 'menu' };
  if (mt.phase === 'menu') {
    const sv = mtSaved(), fins = LS.get('maquinaFins', {});
    return `
  <div class="pg mt-pg">
    ${topbar('Máquina do tempo', fromGab ? 'bgab' : '')}
    <div class="mt-menu">
      <span class="mt-dial" aria-hidden="true">${mtDial(2026)}</span>
      <div class="display" style="font-size:26px;"><em>Para quando vamos?</em></div>
      <p class="small muted mt-p">Escolha um momento. Lá, o que você sabe decide como você sai — mas a História não muda.</p>
      <div class="mt-trips">${MT_ADV.map(a => { const n = Object.keys(a.ends).filter(k => fins[a.id + ':' + k]).length;
        return `<button class="mt-trip" data-a="${a.id}" type="button" style="--ac:${a.col}">
          <span class="mt-trip-pic">${sceneSvg({ id: a.s }, 120)}</span>
          <span class="mt-trip-tx"><b class="mt-trip-y">${mtYear(a.y)}</b><span class="mt-trip-t">${a.t}</span><small>${a.place}${n ? ` · ${n} de ${Object.keys(a.ends).length} finais` : ''}</small></span>
          ${mtStars(sv[a.id] || 0)}</button>`; }).join('')}</div>
    </div>
  </div>`;
  }
  const a = mt.adv;
  if (mt.phase === 'warp') return `
  <div class="pg pg-center mt-pg mt-warp" style="--ac:${a.col}">
    <span class="mt-vortex" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
    <span class="mt-dial mt-dial-spin" aria-hidden="true">${mtDial(a.y)}</span>
    <div class="display" style="font-size:24px;"><em>Viajando para ${mtYear(a.y)}…</em></div>
    <p class="small muted">${_esc(a.intro)}</p>
  </div>`;
  if (mt.phase === 'end') return mtEndHtml();
  const [pic, text, chs] = a.scenes[mt.i], after = mt.phase === 'after', c = after ? chs[mt.pick] : null, last = chs.every(x => x[1] === null);
  return `
  <div class="pg mt-pg mt-scene" style="--ac:${a.col}">
    ${topbar(`${a.t} · ${mtYear(a.y)}`, 'mt-quit')}
    <div class="mt-head"><span class="mt-step">Cena ${mt.i + 1} de ${a.scenes.length}</span>${mtHg()}</div>
    <div class="mt-plate">${sceneSvg({ id: pic }, 320)}</div>
    <p class="mt-text">${_esc(text)}</p>
    ${after ? `<div class="mt-after ${c[1] ? 'is-ok' : 'is-bad'}" role="status">
        <b>${c[1] ? `${ICON.check('currentColor', 13)} Isso!` : `${ICON.cross('currentColor', 13)} ${mt.lives > 0 ? 'Não foi bem assim — uma ampulheta a menos' : 'A última ampulheta se esvaziou'}`}</b>
        <p>${_esc(c[2])}</p>
        <button id="mt-next" class="btn btn-brass" type="button">${mt.lives > 0 ? 'Seguir em frente' : 'Voltar ao presente'}</button></div>`
    : `<div class="mt-chs${last ? ' is-last' : ''}">${chs.map((x, k) => `<button class="mt-ch" data-k="${k}" type="button">${last ? ICON.map('currentColor', 13) : `<b>${'ABC'[k]}</b>`}<span>${_esc(x[0])}</span></button>`).join('')}</div>`}
  </div>`;
}
function mtEndHtml() {
  const a = mt.adv, e = mt.end && a.ends[mt.end];
  return `
  <div class="pg pg-center mt-pg mt-end" style="--ac:${a.col}">
    <div class="eyebrow">${_esc(a.t)} · ${mtYear(a.y)}</div>
    ${e ? `<div class="mt-plate mt-plate-end">${sceneSvg({ id: e[1] }, 320)}<span class="mt-fim">Fim · ${_esc(e[0])}</span></div>
      <p class="mt-text">${_esc(e[2])}</p>
      ${mtStars(mt.stars)}
      <p class="small muted" style="margin:0;">${mt.mistakes ? `${mt.mistakes} ${mt.mistakes === 1 ? 'ampulheta gasta' : 'ampulhetas gastas'}` : 'Sem gastar nenhuma ampulheta!'} · ${Object.keys(a.ends).length - Object.keys(a.ends).filter(k => LS.get('maquinaFins', {})[a.id + ':' + k]).length ? 'há outro final para descobrir' : 'você viu todos os finais'}</p>`
    : `<span class="mt-dial" aria-hidden="true">${mtDial(2026)}</span>
      <div class="display" style="font-size:24px;"><em>A máquina puxou você de volta</em></div>
      <p class="mt-text">As três ampulhetas se esvaziaram antes do fim da aventura. Tente de novo: agora você sabe um pouco mais sobre ${mtYear(a.y)}.</p>`}
    ${medalChips()}
    <div class="foot-row" style="margin-top:6px;">
      <button id="mt-again" class="btn btn-brass" type="button">${e ? 'Outra viagem' : 'Tentar de novo'}</button>
      <button id="${fromGab ? 'bgab' : 'bhome'}" class="btn btn-ghost btn-sm" type="button">${fromGab ? 'Gabinete' : 'Início'}</button>
    </div>
  </div>`;
}
/* the machine's dial: a brass ring with the year in its window */
function mtDial(y) {
  return `<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="56" fill="#2A1D10"/><circle cx="60" cy="60" r="52" fill="none" stroke="#C9A04E" stroke-width="3"/>
    ${Array.from({ length: 24 }, (_, i) => { const t = i / 24 * Math.PI * 2, r1 = i % 2 ? 44 : 41; return `<path d="M${(60 + Math.cos(t) * r1).toFixed(1)} ${(60 + Math.sin(t) * r1).toFixed(1)}L${(60 + Math.cos(t) * 48).toFixed(1)} ${(60 + Math.sin(t) * 48).toFixed(1)}" stroke="#C9A04E" stroke-width="${i % 2 ? 1 : 2}"/>`; }).join('')}
    <g class="mt-hand"><path d="M60 60L60 22" stroke="#E0B968" stroke-width="3" stroke-linecap="round"/><path d="M60 60L84 70" stroke="#E0B968" stroke-width="2" stroke-linecap="round"/></g>
    <circle cx="60" cy="60" r="5" fill="#E0B968"/>
    <rect x="30" y="78" width="60" height="20" rx="3" fill="#F6EEDA" stroke="#C9A04E" stroke-width="1.5"/>
    <text x="60" y="92.5" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="${String(mtYear(y)).length > 6 ? 11 : 14}" fill="#2A1D10">${mtYear(y)}</text></svg>`;
}
function wireMaquina() {
  if (!mt) return;
  const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  const ready = tapArmed(250);
  document.querySelectorAll('.mt-trip').forEach(b => b.addEventListener('click', () => { if (ready()) mtGo(b.dataset.a); }));
  document.querySelectorAll('.mt-ch').forEach(b => b.addEventListener('click', () => { if (ready()) mtChoose(+b.dataset.k); }));
  on('mt-next', () => { if (ready()) mtNext(); });
  on('mt-quit', () => { snd.swipe(); mt = { phase: 'menu' }; go(); });
  on('mt-again', () => { snd.select(); if (mt.end) mt = { phase: 'menu' }, go(); else mtGo(mt.adv.id); });
}
