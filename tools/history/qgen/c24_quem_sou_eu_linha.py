"""Quem sou eu? (clue cards) and Linha do tempo (timelines): a second pack for
both themes, with figures and timelines not used in 40_quem_sou_eu.json,
41_linha_do_tempo.json or the other packs."""
from qdsl import Cat

# ───────────────────────── Quem sou eu? ─────────────────────────
c = Cat('quem_sou_eu', 'Quem sou eu?', '🕵️', 'Pistas escritas: descubra o personagem', '#7E57C2', order=68)
def Q(a, clues, d, src, x=None):
    c.Q('Quem sou eu?', a, clues, d, src=src, x=x)

# d1
Q('armstrong', ['Nasci em Ohio, em 1930, e fui piloto da Marinha na Guerra da Coreia.',
                'Fui piloto de testes do avião-foguete X-15.',
                'Comandei a missão Apollo 11.',
                'Em julho de 1969, fui o primeiro ser humano a pisar na Lua.'], 1,
  ('pt', 'Neil Armstrong', ['Apollo 11']),
  x='Antes da Lua, ele já tinha feito a primeira acoplagem de duas naves no espaço, na missão Gemini 8, em 1966.')
Q('chaplin', ['Nasci em Londres, em 1889, e cresci na pobreza; minha mãe cantava em teatros de variedades.',
              'Fui para os Estados Unidos com uma trupe de comédia e logo entrei no cinema mudo.',
              'Meu personagem mais famoso usava chapéu-coco, bengala e um bigodinho.',
              'Em 1940, ridicularizei Hitler no filme O Grande Ditador.'], 1,
  ('pt', 'Charlie Chaplin', ['Grande Ditador']),
  x='Além de atuar, ele escrevia, dirigia, produzia e compunha a música de muitos de seus filmes.')
Q('madre_teresa', ['Nasci em Skopje, em 1910, numa família albanesa.',
                   'Tornei-me freira e fui dar aulas num colégio na Índia.',
                   'Fundei as Missionárias da Caridade, para cuidar dos mais pobres e dos doentes.',
                   'Recebi o Nobel da Paz em 1979 e fui proclamada santa em 2016.'], 1,
  ('pt', 'Madre Teresa de Calcutá', ['1979']),
  x='Seu nome de batismo era Anjezë Gonxhe Bojaxhiu; ela adotou o nome Teresa ao fazer os votos.')
Q('kennedy', ['Nasci em Massachusetts, em 1917, numa família rica e numerosa.',
              'Na Segunda Guerra, comandei uma lancha torpedeira que foi afundada no Pacífico.',
              'Fui o primeiro católico eleito presidente de meu país.',
              'Fui assassinado em Dallas, em novembro de 1963.'], 1,
  ('pt', 'John F. Kennedy', ['Dallas']),
  x='Aos 43 anos, foi o mais jovem presidente eleito dos Estados Unidos.')
Q('dom_joao_vi', ['Governei como regente porque minha mãe, a rainha, foi considerada incapaz.',
                  'Para escapar das tropas de Napoleão, atravessei o Atlântico com a corte.',
                  'Abri os portos do Brasil às nações amigas e criei o Banco do Brasil.',
                  'Em 1815, elevei o Brasil a Reino Unido a Portugal e Algarves.'], 1,
  ('pt', 'João VI de Portugal', ['1808']),
  x='Ele foi aclamado rei no Rio de Janeiro, em 1818, dois anos depois da morte de sua mãe, D. Maria I.')
Q('che', ['Nasci em Rosário, na Argentina, em 1928, e estudei Medicina.',
          'Atravessei a América do Sul de motocicleta, numa viagem que virou livro e filme.',
          'Lutei na guerrilha de Sierra Maestra ao lado de Fidel Castro.',
          'Fui capturado e executado na Bolívia, em 1967.'], 1,
  ('pt', 'Che Guevara', ['Bolívia']),
  x='O apelido vem da interjeição “che”, muito usada pelos argentinos para chamar alguém.')
Q('niemeyer', ['Nasci no Rio de Janeiro, em 1907, e vivi até quase os 105 anos.',
               'Projetei o conjunto da Pampulha, em Belo Horizonte.',
               'Participei do projeto da sede da ONU, em Nova York.',
               'Desenhei o Congresso Nacional e outros prédios de Brasília, inaugurada em 1960.'], 1,
  ('pt', 'Oscar Niemeyer', ['Pampulha']),
  x='Ele recebeu o Prêmio Pritzker, o mais importante da arquitetura, em 1988.')

# d2
Q('platao', ['Nasci em Atenas, numa família aristocrática, por volta de 428 a.C.',
             'Fui discípulo de um filósofo condenado a beber cicuta.',
             'Escrevi diálogos, como A República, em que conto o mito da caverna.',
             'Fundei a Academia, onde estudou Aristóteles.'], 2,
  ('pt', 'Platão', ['Academia']),
  x='A Academia funcionou por séculos, e seu nome deu origem à palavra que usamos para escolas e instituições de ensino.')
Q('arquimedes', ['Nasci em Siracusa, na Sicília, no século III a.C.',
                 'Calculei com ótima aproximação a razão entre a circunferência e o diâmetro.',
                 'Segundo a lenda, saí do banho gritando “Eureka!”.',
                 'Fui morto por um soldado romano durante o cerco de minha cidade.'], 2,
  ('pt', 'Arquimedes', ['Siracusa']),
  x='Durante o cerco, ele teria inventado máquinas para defender a cidade, como uma garra que erguia os navios inimigos.')
Q('leonidas', ['Fui rei de uma cidade grega famosa pela disciplina militar.',
               'Fui casado com Gorgo, filha de um rei anterior.',
               'Em 480 a.C., marchei para enfrentar o exército de Xerxes.',
               'Morri com meus trezentos guerreiros no desfiladeiro das Termópilas.'], 2,
  ('pt', 'Leônidas I', ['Termópilas']),
  x='Além dos trezentos espartanos, milhares de soldados de outras cidades gregas lutaram nas Termópilas.')
Q('nero', ['Subi ao trono aos 16 anos, adotado por meu tio-avô.',
           'Tive como tutor o filósofo Sêneca.',
           'Mandei matar minha própria mãe, Agripina.',
           'Fui acusado de causar o grande incêndio de Roma, em 64 d.C.'], 2,
  ('pt', 'Nero', ['Sêneca']),
  x='Ele culpou os cristãos pelo incêndio e deu início à primeira grande perseguição contra eles em Roma.')
Q('gutenberg', ['Nasci em Mainz, por volta de 1400, e trabalhei com metais.',
                'Desenvolvi tipos móveis de metal e uma tinta à base de óleo.',
                'Adaptei uma prensa, parecida com as de fazer vinho, para imprimir.',
                'Por volta de 1455, imprimi uma Bíblia de 42 linhas por página.'], 2,
  ('pt', 'Johannes Gutenberg', ['Mainz']),
  x='Restam menos de cinquenta exemplares, completos ou não, de sua famosa Bíblia.')
Q('copernico', ['Nasci em Toruń, em 1473, e estudei na Itália.',
                'Fui cônego de uma catedral e também cuidei de medicina e de economia.',
                'Defendi que a Terra e os planetas giram em torno do Sol.',
                'Meu livro sobre as revoluções das esferas celestes saiu em 1543, ano de minha morte.'], 2,
  ('pt', 'Nicolau Copérnico', ['1543']),
  x='Ele também formulou uma ideia que mais tarde virou a “Lei de Gresham”: a moeda ruim expulsa a boa de circulação.')
Q('maria_antonieta', ['Nasci em Viena, em 1755, filha de uma imperatriz.',
                      'Casei aos 14 anos com o herdeiro do trono francês.',
                      'Atribuíram-me, sem prova, a frase “que comam brioches”.',
                      'Fui guilhotinada em Paris, em outubro de 1793.'], 2,
  ('pt', 'Maria Antonieta', ['1793']),
  x='Ela foi a 15.ª dos 16 filhos da imperatriz Maria Teresa da Áustria.')
Q('edison', ['Nasci em Ohio, em 1847, e quase não frequentei a escola.',
             'Quando garoto, vendi jornais em trens e depois fui telegrafista.',
             'Montei um laboratório em Menlo Park e registrei mais de mil patentes.',
             'Inventei o fonógrafo e aperfeiçoei a lâmpada incandescente.'], 2,
  ('pt', 'Thomas Edison', ['Menlo Park']),
  x='Por causa do laboratório em Menlo Park, ele ganhou o apelido de “O Feiticeiro de Menlo Park”.')
Q('tarsila', ['Nasci no interior de São Paulo, em 1886, filha de fazendeiros.',
              'Estudei pintura em Paris com mestres ligados ao cubismo, como Fernand Léger.',
              'Fui casada com o escritor Oswald de Andrade.',
              'Pintei o Abaporu, que inspirou o Movimento Antropófago.'], 2,
  ('pt', 'Tarsila do Amaral', ['Abaporu']),
  x='“Abaporu” vem do tupi e quer dizer “homem que come gente”.')
Q('oswaldo_cruz', ['Nasci em São Luiz do Paraitinga, em 1872, e formei-me médico no Rio de Janeiro.',
                   'Aperfeiçoei meus estudos no Instituto Pasteur, em Paris.',
                   'Comandei campanhas contra a febre amarela e a peste bubônica no Rio.',
                   'A vacinação obrigatória que defendi provocou uma revolta em 1904.'], 2,
  ('pt', 'Oswaldo Cruz', ['1904']),
  x='O instituto que ele dirigiu, em Manguinhos, hoje leva seu nome e deu origem à Fiocruz.')
Q('fidel', ['Nasci em 1926, filho de um rico fazendeiro, e formei-me advogado.',
            'Liderei um ataque fracassado a um quartel, em 26 de julho de 1953.',
            'Voltei do exílio a bordo do iate Granma e lutei em Sierra Maestra.',
            'Governei uma ilha do Caribe por quase cinquenta anos.'], 2,
  ('pt', 'Fidel Castro', ['Granma']),
  x='O nome do iate, Granma, virou o nome do jornal oficial do Partido Comunista Cubano.')
Q('anita', ['Nasci em Santa Catarina, em 1821.',
            'Ainda casada com outro homem, parti com um revolucionário estrangeiro, em 1839.',
            'Lutei na Revolução Farroupilha e, depois, na Itália.',
            'Sou lembrada como a “heroína dos dois mundos”.'], 2,
  ('pt', 'Anita Garibaldi', ['Laguna']),
  x='Ela morreu em 1849, na Itália, durante a retirada após a queda da República Romana.')

# d3
Q('confucio', ['Nasci no século VI a.C., no pequeno estado de Lu.',
               'Fui funcionário e, depois, mestre itinerante, cercado de discípulos.',
               'Ensinei o respeito aos pais, aos ritos e aos ancestrais.',
               'Meus ditos, reunidos nos Analectos, moldaram a China por dois mil anos.'], 3,
  ('pt', 'Confúcio', ['Analectos']),
  x='Na dinastia Han, seus ensinamentos se tornaram a doutrina oficial do Estado chinês.')
Q('dante', ['Nasci em Florença, em 1265.',
            'Amei desde a infância uma jovem chamada Beatriz.',
            'Fui exilado de minha cidade em 1302, por causa de disputas políticas.',
            'Em meu poema mais famoso, atravesso o Inferno guiado por Virgílio.'], 3,
  ('pt', 'Dante Alighieri', ['Beatriz']),
  x='Ao escrever a Divina Comédia em toscano, e não em latim, ajudou a formar a língua italiana.')
Q('maquiavel', ['Nasci em Florença, em 1469.',
                'Fui secretário e diplomata da república de minha cidade.',
                'Quando os Médici voltaram ao poder, fui preso, torturado e afastado.',
                'Escrevi um pequeno tratado sobre como conquistar e manter o poder.'], 3,
  ('pt', 'Nicolau Maquiavel', ['O Príncipe']),
  x='O Príncipe só foi publicado em 1532, cinco anos depois da morte do autor.')
Q('bach', ['Nasci em Eisenach, em 1685, numa família de músicos.',
           'Tive vinte filhos, e vários deles também foram compositores.',
           'Por 27 anos, dirigi a música da Igreja de São Tomé, em Leipzig.',
           'Compus os Concertos de Brandemburgo e O Cravo Bem Temperado.'], 3,
  ('pt', 'Johann Sebastian Bach', ['Leipzig']),
  x='Depois de sua morte, sua obra ficou meio esquecida até ser redescoberta por Felix Mendelssohn, em 1829.')
Q('bismarck', ['Nasci em 1815, numa família de nobres prussianos.',
               'Disse que as grandes questões se decidem “a ferro e sangue”.',
               'Conduzi meu país em guerras vitoriosas contra a Dinamarca, a Áustria e a França.',
               'Fui o primeiro chanceler do Império Alemão, proclamado em Versalhes em 1871.'], 3,
  ('pt', 'Otto von Bismarck', ['1871']),
  x='Ele criou um dos primeiros sistemas de seguro social do mundo, com seguro-doença e aposentadoria.')
Q('nightingale', ['Nasci em 1820, numa família inglesa rica que não queria que eu trabalhasse.',
                  'Recebi o nome da cidade italiana onde nasci.',
                  'Liderei enfermeiras num hospital militar durante a Guerra da Crimeia.',
                  'Os soldados me chamavam de “a dama da lâmpada”.'], 3,
  ('pt', 'Florence Nightingale', ['Crimeia']),
  x='Ela também foi pioneira da estatística e usou gráficos para mostrar que a maioria dos soldados morria de doenças.')
Q('rondon', ['Nasci em Mato Grosso, em 1865, e tinha ascendência indígena.',
             'Estendi linhas telegráficas pelo sertão até a Amazônia.',
             'Acompanhei o ex-presidente americano Theodore Roosevelt pelo rio da Dúvida.',
             'Meu lema era “morrer, se preciso for; matar, nunca”.'], 3,
  ('pt', 'Cândido Rondon', ['Roosevelt']),
  x='Ele foi o primeiro diretor do Serviço de Proteção aos Índios, criado em 1910.')
Q('luis_gama', ['Nasci livre em Salvador, em 1830, filho de uma africana liberta.',
                'Aos dez anos, fui vendido como escravo por meu próprio pai.',
                'Aprendi a ler aos 17 anos e consegui provar que tinha nascido livre.',
                'Sem diploma, defendi escravizados nos tribunais e libertei centenas deles.'], 3,
  ('pt', 'Luís Gama', ['1830']),
  x='Em 2015, a OAB lhe concedeu, postumamente, o título de advogado.')
Q('turing', ['Nasci em Londres, em 1912, e estudei Matemática em Cambridge.',
             'Em 1936, descrevi uma máquina teórica capaz de executar qualquer cálculo.',
             'Na Segunda Guerra, ajudei a quebrar os códigos da máquina Enigma.',
             'Propus um teste para saber se uma máquina consegue pensar.'], 3,
  ('pt', 'Alan Turing', ['Enigma']),
  x='O prêmio mais importante da computação, criado em 1966, leva o seu nome.')
Q('cook', ['Nasci em Yorkshire, em 1728, filho de um lavrador, e comecei na marinha mercante.',
           'Observei a passagem de Vênus diante do Sol a partir do Taiti, em 1769.',
           'Mapeei a costa da Nova Zelândia e a costa leste da Austrália.',
           'Fui morto no Havaí, em 1779, na minha terceira grande viagem.'], 3,
  ('pt', 'James Cook', ['1779']),
  x='Em suas viagens, ele combateu o escorbuto da tripulação com chucrute e frutas frescas.')
Q('chiquinha', ['Nasci no Rio de Janeiro, em 1847.',
                'Separei-me do marido e passei a me sustentar dando aulas de piano.',
                'Fui a primeira mulher a reger uma orquestra no Brasil.',
                'Compus a marchinha “Ó Abre Alas”, para o Carnaval de 1899.'], 3,
  ('pt', 'Chiquinha Gonzaga', ['Abre Alas']),
  x='Ela também lutou pela abolição e vendeu partituras para comprar a alforria de um músico escravizado.')

# d4
Q('hatexepsute', ['Fui filha de um faraó e esposa de outro.',
                  'Comecei como regente de meu enteado e acabei coroada faraó.',
                  'Fui representada com barba postiça, como os faraós homens.',
                  'Enviei uma expedição à terra de Punt e construí um templo em Deir el-Bahari.'], 4,
  ('pt', 'Hatexepsute', ['Punt']),
  x='Depois de sua morte, muitas de suas imagens foram apagadas dos monumentos.')
Q('justiniano', ['Nasci numa família de camponeses e fui adotado por meu tio, que chegou ao trono.',
                 'Casei-me com Teodora, uma ex-atriz.',
                 'Mandei reunir todo o direito romano num grande código.',
                 'Reconstruí a igreja de Santa Sofia, em Constantinopla.'], 4,
  ('pt', 'Justiniano I', ['Teodora']),
  x='Na Revolta de Nika, em 532, Teodora o convenceu a não fugir da cidade.')
Q('atahualpa', ['Fui filho de um soberano que governava os Andes.',
                'Venci meu meio-irmão Huáscar numa guerra civil.',
                'Fui capturado pelos espanhóis em Cajamarca, em 1532.',
                'Enchi um quarto de ouro como resgate, mas fui executado mesmo assim.'], 4,
  ('pt', 'Atahualpa', ['Cajamarca']),
  x='Em Cajamarca, poucas centenas de espanhóis capturaram o soberano no meio de milhares de soldados.')
Q('nzinga', ['Nasci por volta de 1583, filha de um rei na África Centro-Ocidental.',
             'Fui batizada como Ana de Sousa, durante uma missão diplomática em Luanda.',
             'Conta-se que, sem cadeira, me sentei sobre uma serva para negociar com o governador português.',
             'Governei Ndongo e Matamba e resisti aos portugueses por décadas.'], 4,
  ('en', 'Nzinga of Ndongo and Matamba', ['Matamba', 'Ana de Sousa']),
  x='Ela governou até morrer, em 1663, já com mais de 80 anos.')
Q('amundsen', ['Nasci na Noruega, em 1872.',
               'Fui o primeiro a atravessar por mar a Passagem do Noroeste.',
               'Venci uma corrida contra uma expedição britânica rumo ao sul.',
               'Cheguei ao Polo Sul em dezembro de 1911.'], 4,
  ('pt', 'Roald Amundsen', ['1911']),
  x='Ele desapareceu em 1928, quando voava para resgatar a tripulação de um dirigível perdido no Ártico.')
Q('pankhurst', ['Nasci em Manchester, em 1858, numa família de ativistas políticos.',
                'Em 1903, fundei uma união de mulheres cujo lema era “Ações, não palavras”.',
                'Fui presa várias vezes e fiz greve de fome.',
                'Liderei as sufragistas britânicas na luta pelo voto feminino.'], 4,
  ('pt', 'Emmeline Pankhurst', ['1903']),
  x='Ela morreu em junho de 1928, semanas antes de as britânicas conquistarem o voto em igualdade com os homens.')
Q('kepler', ['Nasci no sul da Alemanha, em 1571.',
             'Fui assistente do astrônomo dinamarquês Tycho Brahe, em Praga.',
             'Defendi minha mãe, acusada de bruxaria.',
             'Descobri que os planetas giram em órbitas elípticas.'], 4,
  ('pt', 'Johannes Kepler', ['Tycho Brahe']),
  x='Um telescópio espacial da NASA, lançado em 2009 para procurar planetas fora do Sistema Solar, recebeu seu nome.')
Q('al_khwarizmi', ['Trabalhei em Bagdá, na Casa da Sabedoria, no século IX.',
                   'Ajudei a difundir os algarismos indianos, que hoje chamamos de arábicos.',
                   'Um livro meu sobre “al-jabr” deu nome à álgebra.',
                   'Meu nome, em latim, deu origem à palavra “algoritmo”.'], 4,
  ('pt', 'Al-Khwarizmi', ['álgebra']),
  x='Ele também trabalhou em astronomia e geografia, corrigindo dados herdados de Ptolomeu.')

# d5
Q('tamerlao', ['Nasci perto de Samarcanda, em 1336.',
               'Ferimentos me deixaram manco do lado direito.',
               'Derrotei e capturei o sultão otomano Bajazeto em Ancara, em 1402.',
               'Morri em 1405, quando marchava para invadir a China.'], 5,
  ('pt', 'Tamerlão', ['Ancara']),
  x='Seu túmulo em Samarcanda, o Gur-e Amir, inspirou mais tarde a arquitetura do Taj Mahal.')
Q('hipacia', ['Vivi em Alexandria, no Egito, quando ele era governado por Roma.',
              'Fui filha do matemático Téon.',
              'Ensinei filosofia, matemática e astronomia a alunos pagãos e cristãos.',
              'Fui assassinada por uma multidão de cristãos, em 415.'], 5,
  ('pt', 'Hipátia', ['415']),
  x='Ela é a primeira mulher matemática cuja vida é razoavelmente bem documentada.')
Q('zheng_he', ['Nasci em Yunnan, numa família muçulmana, em 1371.',
               'Fui capturado ainda menino e servi como eunuco a um príncipe que depois virou imperador.',
               'Comandei sete grandes expedições marítimas, com centenas de navios.',
               'Minhas frotas chegaram à costa oriental da África décadas antes de Vasco da Gama chegar à Índia.'], 5,
  ('pt', 'Zheng He', ['Yongle']),
  x='Depois da última viagem, em 1433, a corte Ming abandonou as grandes expedições marítimas.')
c.write()


# ───────────────────────── Linha do tempo ─────────────────────────
c = Cat('linha_do_tempo', 'Linha do tempo', '⏳', 'Ordene do mais antigo ao mais novo', '#0f7b6c', order=69)
F = lambda x: {'face': x}
C = lambda x: {'crest': x}
G = lambda x: {'flag': x}
def O(t, cards, d, src):
    c.O(t, cards, d, src=src)

# d1
O('Em que ordem nasceram estes personagens, do mais antigo ao mais recente?',
  [('alexandre', 'Alexandre, o Grande', 'Nascimento', -356, F('alexandre')),
   ('gengis', 'Gengis Khan', 'Nascimento', 1162, F('gengis')),
   ('shakespeare', 'William Shakespeare', 'Nascimento', 1564, F('shakespeare')),
   ('gandhi', 'Mahatma Gandhi', 'Nascimento', 1869, F('gandhi'))], 1,
  ('pt', 'Mahatma Gandhi', ['1869']))
O('Do mais antigo ao mais recente, em que ordem aconteceram estes episódios célebres?',
  [('termopilas', 'Batalha das Termópilas', 'Espartanos contra persas', -480, F('leonidas')),
   ('orleans', 'Libertação de Orléans', 'Guerra dos Cem Anos', 1429, F('joana_darc')),
   ('waterloo', 'Batalha de Waterloo', 'Derrota final de Napoleão', 1815, F('napoleao')),
   ('lua', 'Primeiros passos na Lua', 'Apollo 11', 1969, F('armstrong'))], 1,
  ('pt', 'Batalha de Waterloo', ['1815']))
O('Coloque estes marcos da história do Brasil em ordem, do mais antigo ao mais recente?',
  [('corte', 'A corte portuguesa chega ao Brasil', 'Fugindo das tropas de Napoleão', 1808, F('dom_joao_vi')),
   ('aurea', 'Lei Áurea', 'Fim da escravidão', 1888, F('princesa_isabel')),
   ('republica', 'Proclamação da República', '15 de novembro', 1889, F('deodoro')),
   ('constituicao', 'Constituição Cidadã', 'Redemocratização', 1988, G('BRA'))], 1,
  ('pt', 'Proclamação da República do Brasil', ['1889']))
O('Do mais antigo ao mais recente, em que ordem nasceram estes cientistas?',
  [('arquimedes', 'Arquimedes', 'Nascimento', -287, F('arquimedes')),
   ('newton', 'Isaac Newton', 'Nascimento', 1643, F('newton')),
   ('darwin', 'Charles Darwin', 'Nascimento', 1809, F('darwin')),
   ('hawking', 'Stephen Hawking', 'Nascimento', 1942, F('hawking'))], 1,
  ('pt', 'Stephen Hawking', ['1942']))
O('Ordene estes marcos de grandes governantes, do mais antigo ao mais recente?',
  [('hamurabi', 'Hamurabi', 'Torna-se rei da Babilônia', -1792, F('hamurabi')),
   ('qin', 'Qin Shi Huang', 'Unifica a China', -221, F('qin_shi_huang')),
   ('carlos', 'Carlos Magno', 'Coroado imperador', 800, F('carlos_magno')),
   ('napoleao', 'Napoleão Bonaparte', 'Coroado imperador', 1804, F('napoleao'))], 1,
  ('pt', 'Carlos Magno', ['800']))
O('Do mais antigo ao mais recente, em que ordem nasceram estas mulheres?',
  [('cleopatra', 'Cleópatra VII', 'Nascimento', -69, F('cleopatra')),
   ('elizabeth', 'Elizabeth I', 'Nascimento', 1533, F('elizabeth_i')),
   ('curie', 'Marie Curie', 'Nascimento', 1867, F('marie_curie')),
   ('anne', 'Anne Frank', 'Nascimento', 1929, F('anne_frank'))], 1,
  ('pt', 'Anne Frank', ['1929']))

# d2
O('Em que ordem estes presidentes assumiram o governo dos Estados Unidos?',
  [('washington', 'George Washington', 'Toma posse', 1789, F('washington')),
   ('lincoln', 'Abraham Lincoln', 'Toma posse', 1861, F('lincoln')),
   ('fdr', 'Franklin D. Roosevelt', 'Toma posse', 1933, F('fdr')),
   ('kennedy', 'John F. Kennedy', 'Toma posse', 1961, F('kennedy'))], 2,
  ('pt', 'Lista de presidentes dos Estados Unidos', ['Lincoln']))
O('Coloque estas construções em ordem, da mais antiga à mais recente?',
  [('machu', 'Machu Picchu', 'Cidadela inca', 1450, C('inca')),
   ('taj', 'Taj Mahal', 'Início das obras', 1632, C('mogol')),
   ('eiffel', 'Torre Eiffel', 'Exposição Universal de Paris', 1889, G('FRA')),
   ('cristo', 'Cristo Redentor', 'Inauguração', 1931, G('BRA'))], 2,
  ('pt', 'Cristo Redentor', ['1931']))
O('Coloque estes livros em ordem de publicação, do mais antigo ao mais recente?',
  [('lusiadas', 'Os Lusíadas', 'Luís de Camões', 1572, F('camoes')),
   ('quixote', 'Dom Quixote', 'Primeira parte', 1605, F('cervantes')),
   ('miseraveis', 'Os Miseráveis', 'Victor Hugo', 1862, F('victor_hugo')),
   ('casmurro', 'Dom Casmurro', 'Machado de Assis', 1899, F('machado')),
   ('1984', '“1984”', 'George Orwell', 1949, F('orwell'))], 2,
  ('pt', 'Dom Casmurro', ['1899']))
O('Ordene estes brasileiros pela data de nascimento, do mais antigo ao mais recente?',
  [('zumbi', 'Zumbi dos Palmares', 'Nascimento', 1655, F('zumbi')),
   ('tiradentes', 'Tiradentes', 'Nascimento', 1746, F('tiradentes')),
   ('bonifacio', 'José Bonifácio', 'Nascimento', 1763, F('jose_bonifacio')),
   ('pedro2', 'Dom Pedro II', 'Nascimento', 1825, F('dom_pedro_ii')),
   ('dumont', 'Santos Dumont', 'Nascimento', 1873, F('santos_dumont'))], 2,
  ('pt', 'José Bonifácio de Andrada e Silva', ['1763']))
O('Do mais antigo ao mais recente, em que ordem aconteceram estes fatos do Brasil república?',
  [('vacina', 'Revolta da Vacina', 'Rio de Janeiro', 1904, F('oswaldo_cruz')),
   ('semana', 'Semana de Arte Moderna', 'Theatro Municipal de São Paulo', 1922, F('villa_lobos')),
   ('estado_novo', 'Golpe do Estado Novo', 'Ditadura de Vargas', 1937, F('getulio')),
   ('brasilia', 'Inauguração de Brasília', 'Nova capital', 1960, F('niemeyer'))], 2,
  ('pt', 'Semana de Arte Moderna', ['1922']))
O('Coloque estes acontecimentos da segunda metade do século XX em ordem?',
  [('cuba', 'Revolução Cubana', 'Queda de Batista', 1959, F('fidel')),
   ('misseis', 'Crise dos mísseis', 'Cuba, outubro', 1962, F('kennedy')),
   ('thatcher', 'Thatcher vira primeira-ministra', 'Reino Unido', 1979, F('thatcher')),
   ('gorbachev', 'Gorbachev chega ao poder', 'União Soviética', 1985, F('gorbachev')),
   ('mandela', 'Mandela toma posse como presidente', 'África do Sul', 1994, F('mandela'))], 2,
  ('pt', 'Crise dos mísseis de Cuba', ['1962']))
O('Ordene estas façanhas de exploradores, da mais antiga à mais recente?',
  [('polo', 'Marco Polo chega à corte de Kublai Khan', 'China', 1275, F('marco_polo')),
   ('gama', 'Vasco da Gama chega a Calicute', 'Índia', 1498, F('vasco_gama')),
   ('cook', 'Cook explora a costa leste da Austrália', 'Viagem do Endeavour', 1770, F('cook')),
   ('amundsen', 'Amundsen chega ao Polo Sul', 'Antártida', 1911, F('amundsen')),
   ('gagarin', 'Gagarin dá a volta na Terra', 'Vostok 1', 1961, F('gagarin'))], 2,
  ('pt', 'Roald Amundsen', ['1911']))
O('Do mais antigo ao mais recente, em que ordem surgiram estes impérios?',
  [('roma', 'Império Romano', 'Augusto, primeiro imperador', -27, C('imperio_romano')),
   ('mongol', 'Império Mongol', 'Gengis Khan é proclamado', 1206, C('imperio_mongol')),
   ('otomano', 'Império Otomano', 'Osmã I', 1299, C('imperio_otomano')),
   ('brasil', 'Império do Brasil', 'Independência', 1822, C('imperio_brasil')),
   ('alemao', 'Império Alemão', 'Proclamado em Versalhes', 1871, C('imperio_alemao'))], 2,
  ('pt', 'Império Otomano', ['1299']))

# d3
O('Em que ordem estes imperadores romanos subiram ao trono?',
  [('augusto', 'Augusto', 'Primeiro imperador', -27, F('augusto')),
   ('nero', 'Nero', 'Último júlio-claudiano', 54, F('nero')),
   ('adriano', 'Adriano', 'Construtor da muralha', 117, F('adriano')),
   ('marco', 'Marco Aurélio', 'O imperador filósofo', 161, F('marco_aurelio')),
   ('constantino', 'Constantino', 'Aclamado em York', 306, F('constantino'))], 3,
  ('pt', 'Lista de imperadores romanos', ['Adriano']))
O('Do mais antigo ao mais recente, em que ordem estes monarcas subiram ao trono da Inglaterra?',
  [('guilherme', 'Guilherme, o Conquistador', 'Coroado após Hastings', 1066, F('guilherme_conquistador')),
   ('ricardo', 'Ricardo Coração de Leão', 'Coroação', 1189, F('ricardo')),
   ('henrique', 'Henrique VIII', 'Início do reinado', 1509, F('henrique_viii')),
   ('elizabeth', 'Elizabeth I', 'Início do reinado', 1558, F('elizabeth_i')),
   ('vitoria', 'Rainha Vitória', 'Início do reinado', 1837, F('victoria'))], 3,
  ('en', 'List of English monarchs', ['Henry VIII', 'Richard I']))
O('Ordene estes pintores pela data de nascimento, do mais antigo ao mais recente?',
  [('botticelli', 'Sandro Botticelli', 'Nascimento', 1445, F('botticelli')),
   ('rafael', 'Rafael Sanzio', 'Nascimento', 1483, F('rafael')),
   ('rembrandt', 'Rembrandt', 'Nascimento', 1606, F('rembrandt')),
   ('goya', 'Francisco de Goya', 'Nascimento', 1746, F('goya')),
   ('monet', 'Claude Monet', 'Nascimento', 1840, F('monet'))], 3,
  ('pt', 'Rafael Sanzio', ['1483']))
O('Coloque estes episódios da era napoleônica em ordem, do mais antigo ao mais recente?',
  [('coroacao', 'Napoleão é coroado imperador', 'Notre-Dame de Paris', 1804, C('imperio_frances')),
   ('trafalgar', 'Batalha de Trafalgar', 'Vitória naval britânica', 1805, F('nelson')),
   ('corte', 'A corte portuguesa chega ao Rio', 'Fuga para o Brasil', 1808, C('portugal')),
   ('russia', 'Invasão da Rússia', 'Grande Armée', 1812, C('imperio_russo')),
   ('waterloo', 'Batalha de Waterloo', 'Bélgica', 1815, F('wellington'))], 3,
  ('pt', 'Guerras Napoleônicas', ['Trafalgar']))
O('Em que ordem nasceram estes filósofos, do mais antigo ao mais recente?',
  [('descartes', 'René Descartes', 'Nascimento', 1596, F('descartes')),
   ('locke', 'John Locke', 'Nascimento', 1632, F('locke')),
   ('voltaire', 'Voltaire', 'Nascimento', 1694, F('voltaire')),
   ('kant', 'Immanuel Kant', 'Nascimento', 1724, F('kant')),
   ('nietzsche', 'Friedrich Nietzsche', 'Nascimento', 1844, F('nietzsche'))], 3,
  ('pt', 'Immanuel Kant', ['1724']))
O('Coloque estas leis do caminho para a abolição no Brasil em ordem, da mais antiga à mais recente?',
  [('eusebio', 'Lei Eusébio de Queirós', 'Fim do tráfico negreiro', 1850, C('imperio_brasil')),
   ('ventre', 'Lei do Ventre Livre', 'Filhos de escravizadas nascem livres', 1871, F('princesa_isabel')),
   ('sexagenarios', 'Lei dos Sexagenários', 'Libertação dos idosos', 1885, F('dom_pedro_ii')),
   ('aurea', 'Lei Áurea', 'Abolição', 1888, F('patrocinio'))], 3,
  ('pt', 'Lei dos Sexagenários', ['1885']))
O('Ordene estas conquistas da ciência, da mais antiga à mais recente?',
  [('origem', 'A Origem das Espécies', 'Seleção natural', 1859, F('darwin')),
   ('raiva', 'Vacina contra a raiva', 'Primeiro paciente salvo', 1885, F('pasteur')),
   ('nobel', 'Primeiro Nobel de Marie Curie', 'Física', 1903, F('marie_curie')),
   ('relatividade', 'Teoria da relatividade geral', 'Gravidade e espaço-tempo', 1915, F('einstein')),
   ('penicilina', 'Descoberta da penicilina', 'Mofo numa placa', 1928, F('fleming'))], 3,
  ('pt', 'Marie Curie', ['1903']))
O('Do mais antigo ao mais recente, em que ordem nasceram estes músicos?',
  [('bach', 'Johann Sebastian Bach', 'Nascimento', 1685, F('bach')),
   ('chopin', 'Frédéric Chopin', 'Nascimento', 1810, F('chopin')),
   ('chiquinha', 'Chiquinha Gonzaga', 'Nascimento', 1847, F('chiquinha')),
   ('villa', 'Heitor Villa-Lobos', 'Nascimento', 1887, F('villa_lobos'))], 3,
  ('pt', 'Heitor Villa-Lobos', ['1887']))
O('Coloque estas obras de ficção do século XX em ordem de publicação?',
  [('metamorfose', 'A Metamorfose', 'Franz Kafka', 1915, F('kafka')),
   ('velho', 'O Velho e o Mar', 'Ernest Hemingway', 1952, F('hemingway')),
   ('solidao', 'Cem Anos de Solidão', 'Gabriel García Márquez', 1967, F('garcia_marquez')),
   ('estrela', 'A Hora da Estrela', 'Clarice Lispector', 1977, F('clarice'))], 3,
  ('pt', 'Cem Anos de Solidão', ['1967']))

# d4
O('Ordene estas grandes viagens, da mais antiga à mais recente?',
  [('leif', 'Leif Erikson chega à América', 'Vinlândia', 1000, F('leif')),
   ('battuta', 'Ibn Battuta parte de Tânger', 'Rumo a Meca', 1325, F('ibn_battuta')),
   ('zheng', 'Zheng He inicia suas expedições', 'Frota do tesouro', 1405, F('zheng_he')),
   ('magalhaes', 'Magalhães parte da Espanha', 'Primeira volta ao mundo', 1519, F('magalhaes'))], 4,
  ('pt', 'Zheng He', ['1405']))
O('Ordene estes marcos políticos do século XIX, do mais antigo ao mais recente?',
  [('colombia', 'Grã-Colômbia', 'Congresso de Angostura', 1819, F('bolivar')),
   ('italia', 'Reino da Itália', 'Unificação italiana', 1861, F('garibaldi')),
   ('meiji', 'Restauração Meiji', 'Fim do xogunato', 1868, F('meiji')),
   ('alemanha', 'Império Alemão', 'Unificação alemã', 1871, F('bismarck'))], 4,
  ('pt', 'Unificação italiana', ['1861']))
O('Coloque estes momentos do Império Persa em ordem, do mais antigo ao mais recente?',
  [('babilonia', 'Ciro toma a Babilônia', 'Fim do Império Neobabilônico', -539, F('ciro')),
   ('dario', 'Dario I sobe ao trono', 'Aquemênidas', -522, F('dario')),
   ('xerxes', 'Xerxes invade a Grécia', 'Segunda Guerra Médica', -480, F('xerxes')),
   ('gaugamela', 'Batalha de Gaugamela', 'Vitória macedônia', -331, F('alexandre'))], 4,
  ('pt', 'Império Aquemênida', ['Gaugamela']))
O('Em que ordem aconteceram estes fatos da Antiguidade tardia e da Idade Média?',
  [('atila', 'Átila invade a Gália', 'Campos Cataláunicos', 451, F('atila')),
   ('sofia', 'Inauguração da nova Santa Sofia', 'Constantinopla', 537, F('justiniano')),
   ('harun', 'Harune Arraxide torna-se califa', 'Bagdá', 786, F('harun')),
   ('gengis', 'Gengis Khan é proclamado', 'Unificação mongol', 1206, F('gengis')),
   ('yuan', 'Kublai Khan funda a dinastia Yuan', 'China', 1271, F('kublai'))], 4,
  ('pt', 'Kublai Khan', ['Yuan']))
O('Ordene estas governantes pelo início do reinado, do mais antigo ao mais recente?',
  [('wu', 'Wu Zetian', 'Imperatriz da China', 690, F('wu_zetian')),
   ('isabel', 'Isabel I de Castela', 'Rainha de Castela', 1474, F('isabel_castela')),
   ('nzinga', 'Rainha Nzinga', 'Rainha do Ndongo', 1624, F('nzinga')),
   ('maria_teresa', 'Maria Teresa', 'Herda os domínios dos Habsburgo', 1740, F('maria_teresa')),
   ('catarina', 'Catarina, a Grande', 'Imperatriz da Rússia', 1762, F('catarina_grande'))], 4,
  ('pt', 'Catarina II da Rússia', ['1762']))
O('Coloque estes marcos da Península Ibérica em ordem, do mais antigo ao mais recente?',
  [('portugal', 'Portugal reconhecido como reino', 'Tratado de Zamora', 1143, C('portugal')),
   ('ceuta', 'Tomada de Ceuta', 'Início da expansão portuguesa', 1415, F('henrique_navegador')),
   ('granada', 'Queda de Granada', 'Fim da Reconquista', 1492, F('isabel_castela')),
   ('uniao', 'União Ibérica', 'Um só rei para Portugal e Espanha', 1580, F('felipe_ii'))], 4,
  ('pt', 'União Ibérica', ['1580']))
O('Ordene estes marcos da história africana, do mais antigo ao mais recente?',
  [('axum', 'Axum adota o cristianismo', 'Rei Ezana', 330, C('axum')),
   ('mali', 'Fundação do Império do Mali', 'Sundiata Keita', 1235, C('mali')),
   ('tombuctu', 'O Songai toma Tombuctu', 'Sonni Ali', 1468, C('songai')),
   ('selassie', 'Hailé Selassié é coroado', 'Etiópia', 1930, F('haile_selassie'))], 4,
  ('en', 'Songhai Empire', ['Timbuktu', 'Sonni Ali']))

# d5
O('Em que ordem estes faraós começaram a reinar, do mais antigo ao mais recente?',
  [('hatexepsute', 'Hatexepsute', 'A rainha que virou faraó', -1479, F('hatexepsute')),
   ('aquenaton', 'Aquenáton', 'O culto ao deus Aton', -1353, F('aquenaton')),
   ('tutancamon', 'Tutancâmon', 'O faraó menino', -1332, F('tutancamon')),
   ('ramses', 'Ramsés II', 'Batalha de Kadesh', -1279, F('ramses_ii'))], 5,
  ('pt', 'Ramessés II', ['1279']))
O('Coloque estes marcos da Ásia islâmica em ordem, do mais antigo ao mais recente?',
  [('delhi', 'Tamerlão saqueia Délhi', 'Índia', 1398, F('tamerlao')),
   ('safavida', 'Fundação do Império Safávida', 'Xá Ismail I', 1501, C('safavida')),
   ('panipat', 'Babur vence em Panipat', 'Nasce o Império Mogol', 1526, C('mogol')),
   ('bagda', 'Os otomanos tomam Bagdá', 'Campanha de Solimão', 1534, F('solimao'))], 5,
  ('en', 'First Battle of Panipat', ['1526', 'Babur']))
O('Do mais antigo ao mais recente, em que ordem aconteceram estes marcos da Europa Central?',
  [('carlos', 'Carlos V é eleito imperador', 'Sacro Império', 1519, F('carlos_v')),
   ('viena', 'Segundo cerco otomano a Viena', 'Início do recuo otomano', 1683, C('imperio_otomano')),
   ('fim', 'Fim do Sacro Império', 'Dissolvido sob pressão de Napoleão', 1806, C('sacro_imperio')),
   ('dual', 'Criação da Áustria-Hungria', 'Monarquia dual', 1867, C('austria_hungria'))], 5,
  ('pt', 'Sacro Império Romano-Germânico', ['1806']))
c.write()
