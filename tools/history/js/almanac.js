
/* ═══════════════════════════════════════════════════
   HOJE NA HISTÓRIA — the almanac on the cover

   One line of history for the day the app is opened: what happened on this
   date, with the face, flag or brasão of who it happened to. On a day the
   list has nothing for, it says what is coming next. Only dates that are
   beyond dispute; a birthday is left to the birthday editions.
   [month, day, year, text, picture] — picture is a figure id, a country
   code (FLAGS) or a polity id.
═══════════════════════════════════════════════════ */
const ALMANAC = [
  [1, 1, 1804, 'O Haiti declara sua independência, a primeira república fundada por ex-escravizados', 'HAI'],
  [1, 1, 1959, 'Batista foge de Cuba e os revolucionários de Sierra Maestra chegam ao poder', 'fidel'],
  [1, 2, 1492, 'Os Reis Católicos recebem Granada, último reino muçulmano da Península Ibérica', 'isabel_castela'],
  [1, 7, 1610, 'Galileu aponta o telescópio para Júpiter e avista pela primeira vez suas luas', 'galileu'],
  [1, 9, 1822, 'Dia do Fico: o príncipe regente decide ficar no Brasil', 'dom_pedro_i'],
  [1, 12, 1616, 'Francisco Caldeira Castelo Branco funda o Forte do Presépio, origem de Belém', 'BRA'],
  [1, 13, 1898, 'Émile Zola publica "J\'accuse…!" em defesa do capitão Dreyfus', 'FRA'],
  [1, 17, 1773, 'O navio de James Cook é o primeiro a cruzar o Círculo Polar Antártico', 'cook'],
  [1, 18, 1871, 'O Império Alemão é proclamado no Salão dos Espelhos de Versalhes', 'bismarck'],
  [1, 20, 1567, 'No dia de São Sebastião, os portugueses vencem franceses e tamoios em Uruçumirim, no Rio', 'BRA'],
  [1, 21, 1793, 'Luís XVI é guilhotinado na Praça da Revolução, em Paris', 'franca_revolucionaria'],
  [1, 24, 1848, 'James Marshall acha ouro em Sutter\'s Mill e começa a Corrida do Ouro da Califórnia', 'USA'],
  [1, 25, 1554, 'Jesuítas fundam o colégio que dá origem à cidade de São Paulo', 'BRA'],
  [1, 26, 1926, 'John Logie Baird faz em Londres a primeira demonstração pública da televisão', 'SCO'],
  [1, 27, 1945, 'Tropas soviéticas libertam o campo de Auschwitz', 'urss'],
  [1, 28, 1808, 'Em Salvador, D. João decreta a abertura dos portos do Brasil às nações amigas', 'dom_joao_vi'],
  [1, 31, 1865, 'A Câmara dos EUA aprova a 13ª Emenda, que abole a escravidão no país', 'estados_unidos'],
  [2, 2, 1943, 'As últimas tropas alemãs se rendem em Stalingrado', 'urss'],
  [2, 6, 1962, 'Morre no Rio de Janeiro o pintor Candido Portinari, autor dos painéis "Guerra e Paz"', 'portinari'],
  [2, 8, 1865, 'Gregor Mendel apresenta em Brno seus experimentos com ervilhas, base da genética', 'mendel'],
  [2, 10, 1912, 'Morre o Barão do Rio Branco, patrono da diplomacia brasileira', 'rio_branco'],
  [2, 11, 1990, 'Nelson Mandela deixa a prisão depois de 27 anos', 'mandela'],
  [2, 13, 1922, 'O Theatro Municipal de São Paulo recebe a primeira noite da Semana de Arte Moderna', 'villa_lobos'],
  [2, 18, 1564, 'Morre em Roma Michelangelo Buonarroti', 'michelangelo'],
  [2, 20, 1962, 'John Glenn torna-se o primeiro americano a dar a volta na Terra em órbita', 'USA'],
  [2, 21, 1945, 'A Força Expedicionária Brasileira conquista Monte Castelo, na Itália', 'BRA'],
  [2, 24, 1891, 'É promulgada a primeira Constituição republicana do Brasil', 'deodoro'],
  [2, 28, 1935, 'Morre a compositora Chiquinha Gonzaga, autora da marchinha "Ó Abre Alas"', 'chiquinha'],
  [3, 1, 1565, 'Estácio de Sá funda a cidade do Rio de Janeiro', 'BRA'],
  [3, 2, 1969, 'O Concorde, avião supersônico de passageiros, faz seu primeiro voo em Toulouse', 'FRA'],
  [3, 4, 1933, 'Roosevelt toma posse e diz que a única coisa a temer é o próprio medo', 'fdr'],
  [3, 7, 1808, 'A esquadra que traz a corte portuguesa chega à baía de Guanabara, no Rio de Janeiro', 'dom_joao_vi'],
  [3, 10, 1876, 'Graham Bell faz a primeira chamada telefônica: "Sr. Watson, venha cá"', 'USA'],
  [3, 12, 1930, 'Gandhi parte de Ahmedabad na Marcha do Sal', 'gandhi'],
  [3, 15, -44, 'Nos Idos de Março, Júlio César é assassinado no Senado', 'cesar'],
  [3, 17, 180, 'Morre o imperador e filósofo estoico Marco Aurélio', 'marco_aurelio'],
  [3, 18, 1965, 'Alexei Leonov sai da nave Voskhod 2 e faz a primeira caminhada espacial', 'urss'],
  [3, 20, 1602, 'É fundada a Companhia Holandesa das Índias Orientais, a VOC', 'holanda'],
  [3, 21, 1804, 'Napoleão promulga o Código Civil dos franceses', 'napoleao'],
  [3, 24, 1882, 'Robert Koch anuncia em Berlim a descoberta do bacilo da tuberculose', 'GER'],
  [3, 25, 1824, 'D. Pedro I outorga a primeira Constituição do Brasil', 'dom_pedro_i'],
  [3, 26, 1827, 'Morre em Viena Ludwig van Beethoven', 'beethoven'],
  [3, 29, 1549, 'Tomé de Sousa funda Salvador, a primeira capital do Brasil', 'BRA'],
  [3, 31, 1889, 'Gustave Eiffel hasteia a bandeira francesa no alto da torre recém-concluída', 'FRA'],
  [4, 4, 1968, 'Martin Luther King é assassinado em Memphis', 'mlk'],
  [4, 6, 1896, 'Abrem-se em Atenas os primeiros Jogos Olímpicos da era moderna', 'GRC'],
  [4, 7, 1831, 'D. Pedro I abdica do trono do Brasil em favor do filho, o futuro D. Pedro II', 'dom_pedro_i'],
  [4, 9, 1865, 'A rendição em Appomattox encerra a Guerra de Secessão', 'lincoln'],
  [4, 12, 1961, 'Iuri Gagarin torna-se o primeiro ser humano a ir ao espaço', 'gagarin'],
  [4, 15, 1912, 'O Titanic afunda no Atlântico Norte em sua viagem inaugural', 'ENG'],
  [4, 18, 1955, 'Morre em Princeton Albert Einstein', 'einstein'],
  [4, 21, 1792, 'Tiradentes é executado no Rio de Janeiro', 'tiradentes'],
  [4, 21, 1960, 'Brasília é inaugurada como nova capital do Brasil', 'jk'],
  [4, 22, 1500, 'A frota de Cabral avista o Monte Pascoal', 'cabral'],
  [4, 24, 1990, 'O ônibus espacial Discovery decola levando o telescópio Hubble', 'USA'],
  [4, 25, 1974, 'A Revolução dos Cravos derruba a ditadura em Portugal', 'POR'],
  [4, 26, 1500, 'Frei Henrique de Coimbra celebra a primeira missa no Brasil', 'cabral'],
  [4, 30, 1789, 'George Washington toma posse como primeiro presidente dos Estados Unidos', 'washington'],
  [5, 1, 1943, 'Getúlio Vargas assina a Consolidação das Leis do Trabalho, a CLT', 'getulio'],
  [5, 2, 1519, 'Morre Leonardo da Vinci em Amboise, na França', 'leonardo'],
  [5, 7, 1880, 'Morre o Duque de Caxias, patrono do Exército Brasileiro', 'duque_caxias'],
  [5, 8, 1945, 'A rendição alemã encerra a Segunda Guerra na Europa', 'churchill'],
  [5, 10, 1869, 'Um cravo de ouro em Promontory marca o fim da primeira ferrovia transcontinental dos EUA', 'USA'],
  [5, 13, 1888, 'A Lei Áurea extingue a escravidão no Brasil', 'princesa_isabel'],
  [5, 14, 1796, 'Edward Jenner aplica a primeira vacina contra a varíola, no menino James Phipps', 'ENG'],
  [5, 16, 1929, 'Hollywood realiza a primeira cerimônia do Oscar', 'USA'],
  [5, 20, 1498, 'Vasco da Gama chega a Calicute, na Índia, por mar', 'vasco_gama'],
  [5, 22, 1885, 'Morre em Paris Victor Hugo, autor de "Os Miseráveis"', 'victor_hugo'],
  [5, 25, 1810, 'A Revolução de Maio instala em Buenos Aires a Primeira Junta de governo', 'ARG'],
  [5, 27, 1564, 'Morre em Genebra o reformador João Calvino', 'calvino'],
  [5, 29, 1453, 'Constantinopla cai diante do sultão otomano', 'maome_ii'],
  [5, 30, 1431, 'Joana d\'Arc é executada em Ruão', 'joana_darc'],
  [6, 3, 1924, 'Morre Franz Kafka, autor de "A Metamorfose"', 'kafka'],
  [6, 6, 1944, 'Dia D: os Aliados desembarcam na Normandia', 'de_gaulle'],
  [6, 7, 1494, 'Portugal e Castela assinam o Tratado de Tordesilhas', 'portugal'],
  [6, 9, 1870, 'Morre o escritor Charles Dickens, em sua casa de Gad\'s Hill', 'dickens'],
  [6, 10, 1580, 'Morre em Lisboa Luís de Camões; a data é hoje o Dia de Portugal', 'camoes'],
  [6, 15, 1215, 'O rei da Inglaterra sela a Magna Carta em Runnymede', 'inglaterra'],
  [6, 16, 1963, 'Valentina Tereshkova torna-se a primeira mulher a ir ao espaço', 'urss'],
  [6, 18, 1815, 'Napoleão é derrotado em Waterloo', 'napoleao'],
  [6, 20, 1789, 'Deputados do Terceiro Estado fazem o Juramento do Jogo da Pela, em Versalhes', 'FRA'],
  [6, 22, 1633, 'Condenado pela Inquisição, Galileu abjura o heliocentrismo em Roma', 'galileu'],
  [6, 24, 1821, 'Bolívar vence em Carabobo e garante a independência da Venezuela', 'bolivar'],
  [6, 25, 1876, 'Sioux e cheienes vencem a cavalaria americana em Little Bighorn', 'touro_sentado'],
  [6, 26, 1541, 'O conquistador Francisco Pizarro é assassinado em Lima', 'pizarro'],
  [6, 28, 1914, 'O arquiduque Francisco Fernando é assassinado em Sarajevo', 'austria_hungria'],
  [6, 28, 1919, 'É assinado o Tratado de Versalhes', 'wilson'],
  [6, 29, 1958, 'O Brasil vence a Suécia por 5 a 2 e conquista sua primeira Copa do Mundo', 'BRA'],
  [7, 2, 1823, 'As tropas portuguesas deixam Salvador, e a Bahia consolida a independência', 'BRA'],
  [7, 4, 1776, 'As treze colônias aprovam a Declaração de Independência', 'jefferson'],
  [7, 5, 1811, 'A Venezuela declara sua independência da Espanha', 'VEN'],
  [7, 8, 1497, 'Vasco da Gama parte de Lisboa na viagem que abrirá o caminho marítimo para a Índia', 'vasco_gama'],
  [7, 13, 1954, 'Morre Frida Kahlo na Casa Azul, em Coyoacán', 'frida'],
  [7, 14, 1789, 'O povo de Paris toma a Bastilha', 'FRA'],
  [7, 16, 1950, 'O Uruguai vence o Brasil no Maracanã e conquista a Copa do Mundo', 'URU'],
  [7, 20, 1969, 'A Apollo 11 pousa na Lua', 'armstrong'],
  [7, 23, 1840, 'O Senado declara antecipada a maioridade de D. Pedro II, que assume o trono', 'dom_pedro_ii'],
  [7, 25, 1909, 'Louis Blériot faz a primeira travessia aérea do Canal da Mancha', 'FRA'],
  [7, 28, 1914, 'A Áustria-Hungria declara guerra à Sérvia: começa a Primeira Guerra', 'austria_hungria'],
  [7, 30, 1912, 'Morre o imperador Meiji, que modernizou o Japão', 'meiji'],
  [8, 1, 1944, 'Começa a Revolta de Varsóvia contra a ocupação alemã', 'POL'],
  [8, 3, 1492, 'Colombo parte de Palos com a Santa Maria, a Pinta e a Niña', 'colombo'],
  [8, 6, 1945, 'Uma bomba atômica é lançada sobre Hiroshima', 'JPN'],
  [8, 7, 1819, 'Bolívar vence em Boyacá e liberta Nova Granada, atual Colômbia', 'bolivar'],
  [8, 10, 1519, 'A frota de Fernão de Magalhães deixa Sevilha na viagem que dará a volta ao mundo', 'magalhaes'],
  [8, 13, 1961, 'Começa a ser erguido o Muro de Berlim', 'GER'],
  [8, 14, 1385, 'Portugal vence Castela na Batalha de Aljubarrota', 'portugal'],
  [8, 15, 1947, 'A Índia torna-se independente do Império Britânico', 'gandhi'],
  [8, 17, 1850, 'Morre em Boulogne-sur-Mer o general José de San Martín', 'san_martin'],
  [8, 19, 14, 'Morre em Nola Augusto, o primeiro imperador romano', 'augusto'],
  [8, 21, 1911, 'A Mona Lisa é roubada do Museu do Louvre', 'leonardo'],
  [8, 24, 1954, 'Getúlio Vargas morre no Palácio do Catete', 'getulio'],
  [8, 25, 1944, 'Paris é libertada da ocupação alemã e De Gaulle discursa no Hôtel de Ville', 'de_gaulle'],
  [8, 28, 1963, 'Martin Luther King discursa na Marcha sobre Washington', 'mlk'],
  [8, 29, 1825, 'Portugal assina o tratado em que reconhece a independência do Brasil', 'imperio_brasil'],
  [9, 1, 1939, 'A Alemanha invade a Polônia', 'POL'],
  [9, 2, 1945, 'O Japão assina a rendição e termina a Segunda Guerra', 'JPN'],
  [9, 3, 1783, 'Pelo Tratado de Paris, a Grã-Bretanha reconhece a independência dos Estados Unidos', 'franklin'],
  [9, 4, 476, 'Odoacro depõe Rômulo Augusto, o último imperador romano do Ocidente', 'imperio_romano'],
  [9, 6, 1522, 'Os sobreviventes da expedição de Magalhães completam a primeira volta ao mundo', 'magalhaes'],
  [9, 7, 1822, 'D. Pedro proclama a independência do Brasil', 'dom_pedro_i'],
  [9, 8, 1504, 'O Davi de Michelangelo é apresentado na Piazza della Signoria, em Florença', 'michelangelo'],
  [9, 13, 1598, 'Morre Filipe II da Espanha, no palácio do Escorial', 'felipe_ii'],
  [9, 14, 1812, 'Napoleão entra em Moscou, abandonada pelos russos', 'napoleao'],
  [9, 15, 1835, 'O Beagle, com Charles Darwin a bordo, chega às ilhas Galápagos', 'darwin'],
  [9, 16, 1810, 'O padre Hidalgo lança o Grito de Dolores, início da independência do México', 'MEX'],
  [9, 17, 1787, 'A Constituição dos Estados Unidos é assinada na Filadélfia', 'estados_unidos'],
  [9, 18, 1810, 'Santiago forma a Primeira Junta de Governo, hoje a data nacional do Chile', 'CHI'],
  [9, 20, 1835, 'Começa a Revolução Farroupilha, com a tomada de Porto Alegre', 'BRA'],
  [9, 22, 1862, 'Lincoln publica a versão preliminar da Proclamação de Emancipação', 'lincoln'],
  [9, 23, 1846, 'Em Berlim, Johann Galle encontra Netuno no ponto previsto por Le Verrier', 'GER'],
  [9, 24, 1834, 'D. Pedro I morre no Palácio de Queluz, onde nascera', 'dom_pedro_i'],
  [9, 25, 1555, 'A Paz de Augsburgo deixa cada príncipe alemão escolher a religião de suas terras', 'sacro_imperio'],
  [9, 27, 1822, 'Champollion apresenta em Paris a chave para decifrar os hieróglifos egípcios', 'egito_antigo'],
  [9, 28, 1871, 'A Lei do Ventre Livre liberta os filhos de escravizadas nascidos dali em diante', 'princesa_isabel'],
  [9, 29, 1908, 'Morre no Rio de Janeiro Machado de Assis', 'machado'],
  [9, 30, 1791, 'Mozart rege em Viena a estreia de "A Flauta Mágica"', 'mozart'],
  [10, 1, 1949, 'Mao Tsé-tung proclama a República Popular da China', 'china_popular'],
  [10, 3, 1990, 'A Alemanha Oriental se une à Ocidental e o país volta a ser um só', 'GER'],
  [10, 4, 1957, 'A União Soviética lança o Sputnik, o primeiro satélite artificial', 'urss'],
  [10, 5, 1910, 'Uma revolução em Lisboa derruba a monarquia e proclama a República Portuguesa', 'POR'],
  [10, 7, 1571, 'A Liga Santa derrota a frota otomana na Batalha de Lepanto', 'espanha'],
  [10, 9, 1967, 'Che Guevara é executado na Bolívia, um dia depois de capturado', 'che'],
  [10, 12, 1492, 'Colombo desembarca nas Bahamas', 'colombo'],
  [10, 14, 1066, 'Guilherme da Normandia vence em Hastings', 'guilherme_conquistador'],
  [10, 16, 1846, 'Em Boston, uma cirurgia com éter é a primeira demonstração pública de anestesia', 'USA'],
  [10, 17, 1849, 'Morre em Paris o compositor Frédéric Chopin', 'chopin'],
  [10, 19, 1781, 'Os britânicos se rendem em Yorktown, diante de Washington', 'washington'],
  [10, 21, 1805, 'Nelson vence a esquadra franco-espanhola em Trafalgar, mas morre na batalha', 'nelson'],
  [10, 23, 1906, 'Santos Dumont voa com o 14-Bis em Paris', 'santos_dumont'],
  [10, 24, 1945, 'Entra em vigor a Carta das Nações Unidas', 'fdr'],
  [10, 28, 312, 'Constantino vence Maxêncio na Batalha da Ponte Mílvia', 'constantino'],
  [10, 29, 1929, 'A Bolsa de Nova York desaba na Terça-Feira Negra', 'USA'],
  [10, 31, 1517, 'Lutero divulga suas 95 teses', 'lutero'],
  [11, 1, 1755, 'Um terremoto seguido de tsunami destrói Lisboa no Dia de Todos os Santos', 'POR'],
  [11, 3, 1957, 'A cadela Laika, a bordo do Sputnik 2, é o primeiro animal a orbitar a Terra', 'urss'],
  [11, 4, 1922, 'Howard Carter encontra a escadaria da tumba de Tutancâmon', 'tutancamon'],
  [11, 7, 1917, 'Os bolcheviques tomam o poder em Petrogrado', 'lenin'],
  [11, 8, 1519, 'Hernán Cortés entra em Tenochtitlán e é recebido por Montezuma', 'cortes'],
  [11, 9, 1989, 'Cai o Muro de Berlim', 'gorbachev'],
  [11, 10, 1938, 'Morre Atatürk, fundador da Turquia moderna, no Palácio de Dolmabahçe', 'ataturk'],
  [11, 11, 1918, 'O armistício encerra os combates da Primeira Guerra', 'FRA'],
  [11, 13, 1460, 'Morre o Infante D. Henrique, o Navegador', 'henrique_navegador'],
  [11, 15, 1889, 'É proclamada a República no Brasil', 'deodoro'],
  [11, 17, 1869, 'É inaugurado o Canal de Suez, que liga o Mediterrâneo ao Mar Vermelho', 'EGY'],
  [11, 19, 1863, 'Lincoln pronuncia o Discurso de Gettysburg', 'lincoln'],
  [11, 20, 1695, 'Zumbi dos Palmares é morto; a data é hoje o Dia da Consciência Negra', 'zumbi'],
  [11, 21, 1783, 'Num balão dos irmãos Montgolfier, dois homens fazem o primeiro voo livre tripulado', 'FRA'],
  [11, 22, 1963, 'John F. Kennedy é assassinado em Dallas', 'kennedy'],
  [11, 24, 1859, 'Darwin publica "A Origem das Espécies"', 'darwin'],
  [11, 27, 1895, 'Alfred Nobel assina em Paris o testamento que cria o Prêmio Nobel', 'SWE'],
  [11, 29, 1807, 'A esquadra com a família real portuguesa zarpa de Lisboa rumo ao Brasil', 'imperio_portugues'],
  [12, 1, 1955, 'Rosa Parks se recusa a ceder o lugar no ônibus em Montgomery', 'rosa_parks'],
  [12, 2, 1804, 'Napoleão é coroado imperador em Notre-Dame', 'napoleao'],
  [12, 3, 1967, 'Christiaan Barnard faz na Cidade do Cabo o primeiro transplante de coração', 'ZAF'],
  [12, 5, 1791, 'Morre Mozart em Viena, deixando inacabado o seu Réquiem', 'mozart'],
  [12, 7, 1941, 'O Japão ataca Pearl Harbor', 'USA'],
  [12, 9, 1824, 'Sucre vence em Ayacucho e sela a independência do Peru', 'PER'],
  [12, 11, 1826, 'Morre no Rio de Janeiro a imperatriz Leopoldina', 'leopoldina'],
  [12, 14, 1911, 'A expedição de Amundsen chega ao Polo Sul', 'amundsen'],
  [12, 16, 1815, 'O Brasil é elevado a reino, unido a Portugal e Algarves', 'portugal'],
  [12, 17, 1903, 'Os irmãos Wright fazem seus voos em Kitty Hawk', 'USA'],
  [12, 21, 1968, 'A Apollo 8 parte rumo à Lua, a primeira missão tripulada a orbitá-la', 'USA'],
  [12, 22, 1988, 'O seringueiro e ambientalista Chico Mendes é assassinado em Xapuri, no Acre', 'chico_mendes'],
  [12, 24, 1524, 'Morre em Cochim, na Índia, o vice-rei Vasco da Gama', 'vasco_gama'],
  [12, 25, 800, 'Carlos Magno é coroado imperador em Roma', 'carlos_magno'],
  [12, 25, 1991, 'Gorbachev renuncia e a União Soviética deixa de existir', 'gorbachev'],
  [12, 26, 1898, 'Pierre e Marie Curie anunciam a descoberta do rádio', 'marie_curie'],
  [12, 28, 1895, 'Os irmãos Lumière fazem em Paris a primeira sessão pública paga de cinema', 'FRA'],
  [12, 30, 1922, 'Um congresso em Moscou aprova a criação da União Soviética', 'urss'],
];
const MES_LONGO = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

/* today's entry (one of them, the same all day), or the next one coming up */
function almanacFor(d) {
  d = d || new Date();
  const m = d.getMonth() + 1, day = d.getDate();
  const today = ALMANAC.filter(e => e[0] === m && e[1] === day);
  if (today.length) return { e: today[(d.getFullYear() + day) % today.length], days: 0 };
  for (let k = 1; k <= 366; k++) {
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + k);
    const hit = ALMANAC.find(e => e[0] === x.getMonth() + 1 && e[1] === x.getDate());
    if (hit) return { e: hit, days: k };
  }
  return null;
}
function almanacPic(id) {
  const p = PL.find(x => x.id === id);
  if (p && p.img) return `<span class="alm-pic alm-face"><img src="${p.img}" alt="" aria-hidden="true" onerror="this.style.visibility='hidden'" /></span>`;
  if (CL.some(c => c.id === id)) return `<span class="alm-pic alm-crest">${clubArt(id, '', false)}</span>`;
  if (FLAGS[id]) return `<span class="alm-pic alm-flag"><svg viewBox="0 0 9 6" preserveAspectRatio="none" aria-hidden="true">${FLAGS[id]}</svg></span>`;
  return `<span class="alm-pic">${ICON.scroll('currentColor', 16)}</span>`;
}
function almanacHtml() {
  const a = almanacFor();
  if (!a) return '';
  const [m, day, y, txt, pic] = a.e;
  const when = a.days === 0 ? `Hoje na História · ${day} de ${MES_LONGO[m - 1]}`
             : a.days === 1 ? `Amanhã na História · ${day} de ${MES_LONGO[m - 1]}`
             : `Daqui a ${a.days} dias · ${day} de ${MES_LONGO[m - 1]}`;
  /* a tap on it plays the day's dates (Hoje na História, js/ano.js) */
  return `<button id="balm" class="almanac${a.days === 0 ? ' is-today' : ''}" type="button" aria-label="${when}: ${yearTxt(y)}, ${_esc(txt).replace(/"/g, '&quot;')}. Jogar Hoje na História">
    ${almanacPic(pic)}
    <span class="alm-t"><small>${when}</small><span><b class="num">${yearTxt(y)}</b> — ${_esc(txt).replace(/\S+-\S+/g, w => `<span class="ano-nw">${w}</span>`)}</span></span>
    <span class="alm-go" aria-hidden="true">${ICON.play('currentColor', 11)}</span></button>`;
}
