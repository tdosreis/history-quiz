/* `pick` lives inside the generators, so these rounds carry their own. */
const pickN = (arr, n) => shuf(arr).slice(0, n);

/* The clues, cheapest first: when and where, what the figure did, the states
   they were tied to, and only at the end the epithet that all but names them. */
function whoClues(p) {
  const cl = [];
  cl.push(`Viveu no ${centTxt(p.era[0])} · ${POS_NAME[p.pos]}`);
  if (!NAT_SKIP.has(p.id) && CTRY_NAME[p.ctry]) cl.push(`Nasceu ${ctryEm(p.ctry)}`);
  const pols = (p.clubs || []).slice(0, 3).map(clubName).filter(Boolean);
  if (pols.length) cl.push(`Ligado a: ${pols.join(', ')}`);
  const h = [];
  if (p.nb) h.push(p.nb === 1 ? 'Ganhou o Prêmio Nobel' : `Ganhou ${p.nb} Prêmios Nobel`);
  if (p.ev && p.ev.length) h.push(`Viveu ${EVENTS[p.ev[0]].n.replace(/^(.)/, c => c.toLowerCase())}`);
  const nmw = _fold(p.n).split(/[^a-z]+/).filter(w => w.length >= 5);
  if (p.nick && !nmw.some(w => _fold(p.nick).includes(w))) h.push(`Ficou conhecido como “${p.nick}”`);
  if (h.length) cl.push(h.join(' · '));
  return cl;
}
function buildWho(n) {
  const rich = PL.filter(p => p.img && p.era && (p.clubs || []).length >= 1 && p.nick);
  /* Half the cards come from the written clue sets — a story told in four
     steps reads better than a record read aloud — and half are built from
     the data, so every figure can still turn up. */
  const written = pickN(CATS.flatMap(c => c.qs.filter(q => q.clues && q.a && q.a.length === 1)), Math.ceil(n / 2))
    .map(q => ({ ...q, clues: q.clues.slice(), _shown: 1, _cat: GC_WHO }));
  const taken = new Set(written.map(q => q.a[0]));
  const qs = written.concat(pickN(rich.filter(p => !taken.has(p.id)), n - written.length).map(p => ({
    t: 'Quem sou eu?', type: 'player', a: [p.id], clues: whoClues(p), _shown: 1,
    opts: 6, strict: 1, _cat: GC_WHO, _noFlag: true, _hideCtry: true, _hideEra: true,
  })));
  return { id:'who', name:'Quem sou eu?', emoji:'🕵️', tag:'Pistas, uma de cada vez',
           col:'#7E57C2', diff:'Variado', qs };
}

/* Dated events the Linha do tempo can deal. [id, year, label, sub, picture]
   where the picture is {face: figure}, {crest: polity} or {flag: country}. Years
   are the ones the books agree on; where a date is traditional it is the traditional one. */
const TL_DATES = [
  ['maratona', -490, 'Batalha de Maratona', 'Gregos contra persas', { crest:'atenas' }],
  ['alexandre_morre', -323, 'Morte de Alexandre, o Grande', 'Babilônia', { face:'alexandre' }],
  ['cesar_morte', -44, 'Assassinato de Júlio César', 'Idos de Março', { face:'cesar' }],
  ['vesuvio', 79, 'Erupção do Vesúvio', 'Pompeia soterrada', { crest:'imperio_romano' }],
  ['queda_roma', 476, 'Queda do Império Romano do Ocidente', 'Fim da Antiguidade', { crest:'imperio_romano' }],
  ['carlos_magno_coroa', 800, 'Coroação de Carlos Magno', 'Natal em Roma', { face:'carlos_magno' }],
  ['hastings', 1066, 'Batalha de Hastings', 'Normandos conquistam a Inglaterra', { face:'guilherme_conquistador' }],
  ['gengis_khan', 1206, 'Gengis Khan é proclamado soberano', 'Nasce o Império Mongol', { face:'gengis' }],
  ['peste', 1347, 'A Peste Negra chega à Europa', 'Século XIV', { crest:'veneza' }],
  ['joana_darc_morte', 1431, 'Joana d\'Arc é queimada em Rouen', 'Guerra dos Cem Anos', { face:'joana_darc' }],
  ['constantinopla', 1453, 'Queda de Constantinopla', 'Fim do Império Bizantino', { face:'maome_ii' }],
  ['colombo_america', 1492, 'Colombo chega à América', 'Ilha de Guanahani', { face:'colombo' }],
  ['india_gama', 1498, 'Vasco da Gama chega à Índia', 'Calicute', { face:'vasco_gama' }],
  ['cabral_brasil', 1500, 'Cabral chega ao Brasil', 'Porto Seguro', { face:'cabral' }],
  ['teses', 1517, 'Lutero publica as 95 teses', 'Início da Reforma', { face:'lutero' }],
  ['tenochtitlan', 1521, 'Queda de Tenochtitlán', 'Cortés conquista os astecas', { face:'cortes' }],
  ['copernico_livro', 1543, 'Copérnico publica sua obra', 'O Sol no centro', { face:'copernico' }],
  ['armada', 1588, 'Derrota da Invencível Armada', 'Inglaterra de Elizabeth I', { face:'elizabeth_i' }],
  ['principia', 1687, 'Newton publica os Principia', 'A lei da gravitação', { face:'newton' }],
  ['versalhes_luis', 1682, 'A corte se muda para Versalhes', 'O Rei Sol', { face:'luis_xiv' }],
  ['independencia_eua', 1776, 'Independência dos Estados Unidos', 'Filadélfia', { face:'jefferson' }],
  ['bastilha', 1789, 'Queda da Bastilha', 'Revolução Francesa', { crest:'franca_revolucionaria' }],
  ['coroa_napoleao', 1804, 'Napoleão se coroa imperador', 'Notre-Dame', { face:'napoleao' }],
  ['haiti_indep', 1804, 'Independência do Haiti', 'Primeira república negra', { face:'toussaint' }],
  ['familia_real', 1808, 'A corte portuguesa chega ao Rio', 'Dom João VI no Brasil', { face:'dom_joao_vi' }],
  ['waterloo', 1815, 'Batalha de Waterloo', 'Derrota final de Napoleão', { face:'wellington' }],
  ['independencia_br', 1822, 'Independência do Brasil', 'Grito do Ipiranga', { face:'dom_pedro_i' }],
  ['darwin_origem', 1859, 'Darwin publica A Origem das Espécies', 'Evolução', { face:'darwin' }],
  ['lincoln_morte', 1865, 'Assassinato de Lincoln', 'Fim da Guerra de Secessão', { face:'lincoln' }],
  ['lei_aurea', 1888, 'Lei Áurea', 'Abolição no Brasil', { face:'princesa_isabel' }],
  ['republica_br', 1889, 'Proclamação da República', 'Marechal Deodoro', { face:'deodoro' }],
  ['avião', 1906, 'Santos Dumont voa em Paris', 'O 14-Bis', { face:'santos_dumont' }],
  ['primeira_guerra_inicio', 1914, 'Começa a Primeira Guerra Mundial', 'Sarajevo', { crest:'austria_hungria' }],
  ['revolucao_russa', 1917, 'Revolução Russa', 'Lênin toma o poder', { face:'lenin' }],
  ['crash', 1929, 'Quebra da Bolsa de Nova York', 'A Grande Depressão', { crest:'estados_unidos' }],
  ['segunda_guerra_inicio', 1939, 'Começa a Segunda Guerra Mundial', 'Invasão da Polônia', { flag:'POL' }],
  ['pearl_harbor', 1941, 'Ataque a Pearl Harbor', 'EUA entram na guerra', { face:'fdr' }],
  ['fim_guerra', 1945, 'Fim da Segunda Guerra Mundial', 'Rendição do Japão', { face:'churchill' }],
  ['india_indep', 1947, 'Independência da Índia', 'Fim do domínio britânico', { face:'gandhi' }],
  ['cuba_rev', 1959, 'Revolução Cubana', 'Fidel chega a Havana', { face:'fidel' }],
  ['brasilia', 1960, 'Inauguração de Brasília', 'JK', { face:'jk' }],
  ['gagarin_voo', 1961, 'Gagarin vai ao espaço', 'Primeiro humano em órbita', { face:'gagarin' }],
  ['muro_construido', 1961, 'Construção do Muro de Berlim', 'Guerra Fria', { crest:'urss' }],
  ['lua', 1969, 'O homem pisa na Lua', 'Apollo 11', { face:'armstrong' }],
  ['muro_queda', 1989, 'Queda do Muro de Berlim', 'Fim da divisão alemã', { flag:'GER' }],
  ['mandela_livre', 1990, 'Mandela é libertado', 'Fim do apartheid', { face:'mandela' }],
  ['urss_fim', 1991, 'Fim da União Soviética', 'Gorbachev renuncia', { face:'gorbachev' }],
  ['mlk_marcha', 1963, 'Marcha sobre Washington', 'Eu tenho um sonho', { face:'mlk' }],
  ['constituicao_88', 1988, 'Constituição Cidadã', 'Redemocratização do Brasil', { crest:'brasil_republica' }],
  ['vargas_1930', 1930, 'Getúlio Vargas chega ao poder', 'Revolução de 1930', { face:'getulio' }],
  ['tiradentes_morte', 1792, 'Execução de Tiradentes', 'Inconfidência Mineira', { face:'tiradentes' }],
  ['zumbi_morte', 1695, 'Morte de Zumbi dos Palmares', 'Fim de Palmares', { face:'zumbi' }],
];
/* Every card the timeline can deal: a dated event, a figure's birth, a polity's
   rise — all from tables the app already tests. */
function tlEvents() {
  const ev = [];
  TL_DATES.forEach(([id, y, label, sub, pic]) => {
    const e = { id: 'd' + id, y, label, sub };
    if (pic.face && PL.find(p => p.id === pic.face)) e.face = pic.face;
    else if (pic.crest && CL.find(c => c.id === pic.crest)) e.crest = pic.crest;
    else if (pic.flag && FLAGS[pic.flag]) e.flag = pic.flag;
    else return;
    ev.push(e);
  });
  /* the birth of a figure — only where the year is not in dispute */
  PL.filter(p => p.era[0] >= 1300 && p.id !== 'tamerlao').forEach(p =>
    ev.push({ id: 'b' + p.id, y: p.era[0], label: p.n, sub: 'Nascimento', face: p.id }));
  PL.filter(p => p.era[1] >= 1300).forEach(p =>
    ev.push({ id: 'm' + p.id, y: p.era[1], label: p.n, sub: 'Morte', face: p.id }));
  /* and the rise of a state */
  CL.filter(c => c.f > -3000 && c.f !== 0).forEach(c =>
    ev.push({ id: 'f' + c.id, y: c.f, label: `Surgimento ${ofClub(c.id)}`, sub: REGION[c.s], crest: c.id }));
  return ev;
}
function buildTimeline(n) {
  const all = tlEvents(), used = new Set(), qs = [];
  for (let guard = 0; qs.length < n && guard < 400; guard++) {
    const four = pickN(all.filter(e => !used.has(e.id)), 4);
    if (four.length < 4) break;
    /* the same person twice on one board gives the order away */
    const who = four.map(e => e.face).filter(Boolean);
    if (new Set(who).size !== who.length) continue;
    const ys = four.map(e => e.y).sort((a, b) => a - b);
    if (ys.some((y, i) => i && y - ys[i - 1] < Math.max(6, Math.abs(y) * 0.03))) continue;   // too close to be fair
    four.forEach(e => used.add(e.id));
    qs.push({ t: 'Coloque em ordem, do mais antigo para o mais recente', type: 'order',
              order: shuf(four), a: four.slice().sort((a, b) => a.y - b.y).map(e => e.id), _cat: GC_TL });
  }
  return { id:'tl', name:'Linha do tempo', emoji:'⏳', tag:'Do mais antigo ao mais novo',
           col:'#0F7B6C', diff:'Variado', qs };
}
