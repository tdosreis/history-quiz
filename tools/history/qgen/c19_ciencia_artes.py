"""Ciência e Invenções + Artes e Letras: a second pack, all formats mixed.
Adds rows to the existing 'ciencia' and 'artes' categories."""
from qdsl import Cat

# ───────────────────────── Ciência e Invenções ─────────────────────────
c = Cat('ciencia', 'Ciência e Invenções', '💡', 'Descobertas que mudaram o mundo', '#2E7D4F', order=60)

# ── Texto: seis alternativas ──
c.T('Qual descoberta do físico alemão Wilhelm Röntgen, em 1895, permitiu ver os ossos dentro do corpo humano?', 'Os raios X',
    ['A radioatividade', 'O ultrassom', 'A ressonância magnética', 'O eletrocardiograma', 'A tomografia'], d=1, crest='imperio_alemao',
    src=('en', 'Wilhelm Röntgen', ['1895', '1901']),
    x='A primeira radiografia famosa mostra a mão da esposa de Röntgen, com o anel de casamento. Em 1901, ele recebeu o primeiro Nobel de Física.')
c.T('Qual instrumento, inventado pelo médico francês René Laennec em 1816, serve para ouvir os batimentos do coração e a respiração?', 'Estetoscópio',
    ['Termômetro clínico', 'Esfigmomanômetro', 'Otoscópio', 'Eletrocardiógrafo', 'Oxímetro'], d=1, flag='FRA',
    src=('en', 'Stethoscope', ['Laennec', '1816']),
    x='Laennec improvisou o primeiro com uma folha de papel enrolada, para não ter de encostar o ouvido no peito de uma jovem paciente; depois o fez de madeira.')
c.T('Qual era o nome da ovelha que, em 1996, se tornou o primeiro mamífero clonado a partir de uma célula adulta?', 'Dolly',
    ['Lucy', 'Bella', 'Daisy', 'Shaun', 'Flora'], d=1, icon='flask',
    src=('en', 'Dolly (sheep)', ['1996', 'Roslin']),
    x='Ela nasceu no Instituto Roslin, na Escócia, e ganhou o nome em homenagem à cantora Dolly Parton, porque foi clonada de uma célula de glândula mamária.')
c.T('Qual médico brasileiro descreveu, em 1909, a doença transmitida pelo inseto barbeiro que hoje leva o seu nome?', 'Carlos Chagas',
    ['Oswaldo Cruz', 'Vital Brazil', 'Adolfo Lutz', 'Emílio Ribas', 'Miguel Couto'], d=2, flag='BRA',
    src=('pt', 'Carlos Chagas', ['1909', 'Trypanosoma cruzi']),
    x='Chagas descreveu o parasita, o inseto transmissor e a doença, e batizou o parasita de Trypanosoma cruzi em homenagem ao mestre Oswaldo Cruz.')
c.T('Qual químico russo organizou os elementos numa tabela periódica, em 1869, deixando lacunas para elementos ainda não descobertos?', 'Dmitri Mendeleiev',
    ['Antoine Lavoisier', 'John Dalton', 'Amedeo Avogadro', 'Robert Boyle', 'Ivan Pavlov'], d=2, crest='imperio_russo',
    src=('en', 'Dmitri Mendeleev', ['1869', 'gallium']),
    x='Ele previu as propriedades de elementos que faltavam na tabela; o gálio, descoberto em 1875, confirmou suas previsões.')
c.T('Qual instrumento o comerciante de tecidos holandês Antonie van Leeuwenhoek aperfeiçoou, no século XVII, para observar seres invisíveis a olho nu?', 'Microscópio',
    ['Telescópio', 'Periscópio', 'Caleidoscópio', 'Estetoscópio', 'Sextante'], d=2, crest='holanda',
    src=('en', 'Antonie van Leeuwenhoek', ['microscope', 'Delft']),
    x='Ele foi o primeiro a descrever bactérias e protozoários, que chamou de "animálculos", em cartas enviadas à Royal Society de Londres.')
c.T('Qual químico francês, guilhotinado em 1794, é considerado o pai da química moderna?', 'Antoine Lavoisier',
    ['Louis Pasteur', 'Joseph Priestley', 'John Dalton', 'Claude Berthollet', 'Joseph-Louis Gay-Lussac'], d=3, crest='franca_revolucionaria',
    src=('en', 'Antoine Lavoisier', ['1794', 'oxygen']),
    x='Ele mostrou que a massa se conserva nas reações químicas e deu nome ao oxigênio e ao hidrogênio. Foi executado por ter sido cobrador de impostos do Antigo Regime.')
c.T('Qual médico americano apresentou, em 1955, a primeira vacina eficaz contra a poliomielite, aplicada por injeção?', 'Jonas Salk',
    ['Albert Sabin', 'Edward Jenner', 'Louis Pasteur', 'Robert Koch', 'Alexander Fleming'], d=3, flag='USA',
    src=('en', 'Jonas Salk', ['1955', 'patent']),
    x='Salk não patenteou a vacina. Perguntado na TV sobre quem era o dono da patente, respondeu: "O povo. Pode-se patentear o Sol?"')
c.T('Qual médico mineiro foi o primeiro diretor do Instituto Butantan e criou soros contra o veneno de cobras?', 'Vital Brazil',
    ['Carlos Chagas', 'Oswaldo Cruz', 'Adolfo Lutz', 'Emílio Ribas', 'Miguel Couto'], d=3, flag='BRA',
    src=('pt', 'Vital Brazil', ['Butantan']),
    x='Ele descobriu que cada tipo de veneno exige um soro específico: o soro contra a jararaca não serve para a picada de cascavel.')
c.T('Qual engenho grego de engrenagens, retirado de um naufrágio em 1901, calculava a posição do Sol e da Lua e previa eclipses?', 'Mecanismo de Anticítera',
    ['Eolípila de Heron', 'Clepsidra de Ctesíbio', 'Astrolábio de Hiparco', 'Dioptra de Heron', 'Odômetro de Vitrúvio'], d=4, icon='gear',
    src=('en', 'Antikythera mechanism', ['1901', 'eclipses']),
    x='Feito há mais de 2 mil anos, é chamado de primeiro computador analógico: nada tão complexo voltou a ser construído por mais de mil anos.')
c.T('Qual sábio grego calculou a circunferência da Terra, no século III a.C., comparando as sombras do Sol em Siena (atual Assuã) e em Alexandria?', 'Eratóstenes',
    ['Ptolomeu', 'Hiparco', 'Aristarco de Samos', 'Euclides', 'Arquimedes'], d=4, icon='globe',
    src=('en', 'Eratosthenes', ['circumference', 'Syene']),
    x='Ele também dirigiu a Biblioteca de Alexandria e é apontado como o criador da palavra "geografia".')
c.T('Qual médico mapeou os mortos por cólera em Londres, em 1854, e mostrou que a doença vinha da água de uma bomba pública?', 'John Snow',
    ['Joseph Lister', 'Edward Jenner', 'William Harvey', 'Robert Koch', 'Ignaz Semmelweis'], d=4, crest='reino_unido',
    src=('en', 'John Snow', ['Broad Street', '1854']),
    x='Convencidas por ele, as autoridades retiraram a alavanca da bomba da Broad Street. Seu mapa dos casos é visto como um marco da epidemiologia.')
c.T('Qual sábio chinês do século XI descreveu pela primeira vez a bússola de agulha magnética e a declinação magnética?', 'Shen Kuo',
    ['Bi Sheng', 'Zhang Heng', 'Cai Lun', 'Su Song', 'Zu Chongzhi'], d=5, icon='compass',
    src=('en', 'Shen Kuo', ['compass', 'Dream Pool']),
    x='Ele registrou a descoberta nos "Ensaios do Lago dos Sonhos", de 1088, livro que trata de astronomia, geologia, medicina e música.')

# ── Personagens e estados ──
c.P('Qual sábio grego foi morto por um soldado romano durante a tomada de Siracusa, em 212 a.C.?', 'arquimedes', d=3, crest='republica_romana',
    src=('en', 'Archimedes', ['212 BC', 'Marcellus']),
    x='Segundo os relatos antigos, o general romano Marcelo tinha mandado poupá-lo e lamentou sua morte.')
c.C('Sob qual dinastia chinesa foi impresso o Sutra do Diamante, de 868, o livro impresso com data mais antigo que se conhece?', 'tang', d=4, icon='scroll',
    src=('en', 'Diamond Sutra', ['868', 'Dunhuang']),
    x='O rolo foi encontrado em 1900 nas grutas de Mogao, em Dunhuang, e hoje está na Biblioteca Britânica, em Londres.')

# ── Quem sou eu? ──
c.Q('Quem sou eu?', 'tesla', ['Nasci em 1856, numa aldeia da atual Croácia, filho de um padre ortodoxo sérvio.',
                             'Em 1884, emigrei para Nova York e trabalhei por alguns meses para um inventor famoso, de quem depois fui rival.',
                             'Defendi a corrente alternada na chamada Guerra das Correntes.',
                             'A unidade de indução magnética do Sistema Internacional leva o meu nome.'], 2,
    src=('en', 'Nikola Tesla', ['Smiljan', '1884']),
    x='Apesar das centenas de patentes, morreu endividado num quarto de hotel em Nova York, em 1943.')
c.Q('Quem sou eu?', 'ada_lovelace', ['Sou a única filha legítima de um célebre poeta romântico, que se separou da minha mãe quando eu tinha pouco mais de um mês.',
                                    'Minha mãe me fez estudar matemática desde menina.',
                                    'Traduzi um artigo sobre a Máquina Analítica de Charles Babbage e acrescentei notas mais longas que o próprio texto.',
                                    'Numa dessas notas, descrevi um método para calcular os números de Bernoulli, visto como o primeiro programa de computador.'], 3,
    src=('en', 'Ada Lovelace', ['Bernoulli', 'Byron']),
    x='A linguagem de programação Ada, criada para o Departamento de Defesa dos Estados Unidos, recebeu o seu nome em homenagem a ela.')

# ── Quem disse? ──
c.QT('Estou convencido de que Ele não joga dados.', 'einstein', 2, t='Quem escreveu esta frase?', kind='carta',
     ctx='Carta ao físico Max Born, 1926, contra o papel do acaso na mecânica quântica',
     src=('en', 'Bohr–Einstein debates', ['dice']),
     x='A frase ficou famosa como "Deus não joga dados com o universo" e resume sua desconfiança da física quântica.')
c.QT('A vida é breve, a arte é longa, a ocasião é fugaz, a experiência enganosa e o julgamento difícil.', 'hipocrates', 3, t='Quem escreveu esta frase?',
     ctx='Abertura dos Aforismos, coleção de conselhos médicos da Grécia antiga',
     src=('en', 'Ars longa, vita brevis', ['Hippocrates']),
     x='Em latim, a frase ficou famosa como "Ars longa, vita brevis"; a "arte" de que ela fala é a medicina, que leva uma vida inteira para ser aprendida.')
c.QT('Proponho considerar a questão: as máquinas podem pensar?', 'turing', 3, t='Quem escreveu esta frase?',
     ctx='Primeira frase de um artigo de 1950 que propôs o "jogo da imitação"',
     src=('en', 'Computing Machinery and Intelligence', ['Can machines think']),
     x='O "jogo da imitação" descrito no artigo ficou conhecido como teste de Turing e virou referência nos debates sobre inteligência artificial.')

# ── Duelo ──
c.DU('Duelo: quem nasceu primeiro?', 'galileu', 'newton', 1, icon='telescope',
     src=('pt', 'Galileu Galilei', ['1564']),
     x='Galileu nasceu em 1564 e morreu em janeiro de 1642; Newton nasceu no fim daquele mesmo ano, pelo calendário inglês da época.')
c.DU('Duelo: quem nasceu primeiro?', 'edison', 'tesla', 2, icon='gear',
     src=('en', 'Thomas Edison', ['1847']),
     x='Edison nasceu em 1847, e Tesla, em 1856; o jovem Tesla chegou a trabalhar para Edison em Nova York, em 1884.')
c.DU('Duelo: quem nasceu primeiro?', 'mendel', 'pasteur', 5, icon='flask',
     src=('en', 'Gregor Mendel', ['20 July 1822']),
     x='Os dois nasceram em 1822: Mendel em 20 de julho, e Pasteur em 27 de dezembro.')

# ── Fato ou mito? ──
c.MY('Thomas Edison inventou sozinho a primeira lâmpada elétrica da história?', False, 2, who='edison',
     src=('en', 'Incandescent light bulb', ['Swan', '1879']),
     x='Vários inventores já tinham feito lâmpadas incandescentes, como o inglês Joseph Swan. Em 1879, Edison criou uma versão durável e barata e montou o sistema para levar luz às casas.')
c.MY('Galileu Galilei foi o inventor do telescópio?', False, 2, who='galileu',
     src=('en', 'Telescope', ['1608', 'Galileo']),
     x='Os primeiros telescópios surgiram nos Países Baixos, em 1608. Galileu soube da novidade, construiu os seus, mais potentes, e os apontou para o céu em 1609.')
c.MY('Albert Einstein ganhou o Prêmio Nobel pela teoria da relatividade?', False, 3, who='einstein',
     src=('en', 'Albert Einstein', ['photoelectric', '1921']),
     x='O Nobel de Física de 1921 premiou seus serviços à física teórica e, em especial, a lei do efeito fotoelétrico; a relatividade não foi citada.')

# ── Linha do tempo ──
c.O('Coloque estes marcos da ciência em ordem, do mais antigo ao mais recente?', [
    ('prensa', 'Prensa de tipos móveis', 'Johannes Gutenberg', 1440, {'face': 'gutenberg'}),
    ('jupiter', 'Luas de Júpiter vistas ao telescópio', 'Galileu, Pádua', 1610, {'face': 'galileu'}),
    ('ervilhas', 'Leis da hereditariedade', 'Mendel e suas ervilhas', 1866, {'face': 'mendel'}),
    ('lua', 'Primeiros passos na Lua', 'Missão Apollo 11', 1969, {'face': 'armstrong'}),
], d=1, src=('en', 'Gregor Mendel', ['1866']))
c.O('Coloque estes marcos da medicina em ordem, do mais antigo ao mais recente?', [
    ('harvey', 'Descrita a circulação do sangue', 'William Harvey, Londres', 1628, {'crest': 'inglaterra'}),
    ('jenner', 'Primeira vacina, contra a varíola', 'Edward Jenner, Inglaterra', 1796, {'crest': 'reino_unido'}),
    ('eter', 'Primeira cirurgia pública com anestesia de éter', 'Boston, Estados Unidos', 1846, {'crest': 'estados_unidos'}),
    ('penicilina', 'Descoberta da penicilina', 'Alexander Fleming, Londres', 1928, {'face': 'fleming'}),
], d=2, src=('en', 'History of medicine', ['Harvey', 'penicillin']))
c.O('Coloque estes marcos da computação em ordem, do mais antigo ao mais recente?', [
    ('ada', 'Publicado o primeiro algoritmo para uma máquina', 'Ada Lovelace, Londres', 1843, {'face': 'ada_lovelace'}),
    ('turing', 'Descrita a máquina universal', 'Alan Turing, Cambridge', 1936, {'face': 'turing'}),
    ('eniac', 'O ENIAC é apresentado ao público', 'Filadélfia, Estados Unidos', 1946, {'flag': 'USA'}),
    ('web', 'Proposta a World Wide Web', 'Tim Berners-Lee, CERN', 1989, {'flag': 'CHE'}),
], d=3, src=('en', 'History of computing hardware', ['ENIAC']))

# ── Linhagem ──
c.LN('Quem completa esta linha de mestres e discípulos da física atômica?', 'niels_bohr', 'Mestres e discípulos · física atômica',
     ['J. J. Thomson', 'Ernest Rutherford', '?'], d=4, era='new',
     src=('en', 'Niels Bohr', ['Rutherford', 'Thomson']),
     x='Thomson descobriu o elétron, Rutherford o núcleo atômico, e o discípulo seguinte pôs os elétrons em órbitas fixas ao redor do núcleo.')

# ── Manchetes ──
c.NW('Quem é o cientista desta manchete?', 'pasteur', 'Menino mordido por cão raivoso é salvo por nova vacina', 2, paper='Le Temps',
     sub='Joseph Meister, de nove anos, recebeu treze injeções num laboratório de Paris', typ='player',
     src=('en', 'Louis Pasteur', ['Joseph Meister']),
     x='Meister sobreviveu e, já adulto, trabalhou como zelador do Instituto Pasteur, em Paris.')
c.NW('Em que ano saiu esta manchete?', '1967', 'Cirurgião faz o primeiro transplante de coração humano', 3, paper='Gazeta do Cabo',
     sub='Na Cidade do Cabo, um paciente recebe o coração de uma jovem morta num acidente de trânsito',
     wrong=['1954', '1960', '1963', '1971', '1975'],
     src=('en', 'Christiaan Barnard', ['1967', 'Washkansky']),
     x='O cirurgião era Christiaan Barnard. O paciente, Louis Washkansky, viveu 18 dias depois da operação e morreu de pneumonia.')
c.write()


# ───────────────────────── Artes e Letras ─────────────────────────
c = Cat('artes', 'Artes e Letras', '🎭', 'Pinturas, livros e partituras', '#8E4E9E', order=61)

# ── Texto: seis alternativas ──
c.T('Qual estilo musical nasceu no Rio de Janeiro no fim dos anos 1950, com João Gilberto, Tom Jobim e Vinicius de Moraes?', 'Bossa nova',
    ['Tropicália', 'Jovem Guarda', 'Choro', 'Samba-enredo', 'Baião'], d=1, flag='BRA',
    src=('pt', 'Bossa nova', ['João Gilberto']),
    x='"Garota de Ipanema", de Tom Jobim e Vinicius de Moraes, está entre as canções mais gravadas do mundo.')
c.T('Como se chama o fiel escudeiro que acompanha Dom Quixote em suas aventuras?', 'Sancho Pança',
    ['Rocinante', 'Dulcineia', 'Lazarilho', 'Sansão Carrasco', 'Gil Blas'], d=1, who='cervantes',
    src=('pt', 'Dom Quixote', ['Sancho Pança']),
    x='O romance saiu em duas partes, em 1605 e 1615, e muitos o consideram o primeiro romance moderno.')
c.T('Qual romance de 1818, que Mary Shelley começou a escrever aos 18 anos, conta a história de um cientista que dá vida a uma criatura?', 'Frankenstein',
    ['Drácula', 'O Médico e o Monstro', 'O Retrato de Dorian Gray', 'O Homem Invisível', 'A Ilha do Dr. Moreau'], d=1, icon='book',
    src=('en', 'Frankenstein', ['1818', 'Villa Diodati']),
    x='A ideia surgiu em 1816, numa casa perto de Genebra, quando Lord Byron desafiou os amigos a escrever histórias de fantasmas.')
c.T('Qual arquiteto catalão projetou a Sagrada Família, em Barcelona, e trabalhou nela por mais de 40 anos?', 'Antoni Gaudí',
    ['Joan Miró', 'Le Corbusier', 'Santiago Calatrava', 'Lluís Domènech i Montaner', 'Ricardo Bofill'], d=2, stad='sagrada_familia',
    src=('en', 'Antoni Gaudí', ['Sagrada Família', '1926']),
    x='Gaudí morreu em 1926, atropelado por um bonde; a basílica seguiu em obras, financiada por doações e pela venda de ingressos.')
c.T('Qual compositor veneziano do Barroco escreveu os concertos para violino As Quatro Estações?', 'Antonio Vivaldi',
    ['Arcangelo Corelli', 'Claudio Monteverdi', 'Domenico Scarlatti', 'Tomaso Albinoni', 'Giuseppe Verdi'], d=2, crest='veneza',
    src=('en', 'The Four Seasons (Vivaldi)', ['1725']),
    x='Ele era padre, conhecido como "o Padre Ruivo", e ensinava música às meninas de um orfanato de Veneza, o Ospedale della Pietà.')
c.T('Qual foi o primeiro longa-metragem de animação dos estúdios Disney, lançado em 1937?', 'Branca de Neve e os Sete Anões',
    ['Pinóquio', 'Fantasia', 'Dumbo', 'Bambi', 'Cinderela'], d=2, flag='USA',
    src=('en', 'Snow White and the Seven Dwarfs (1937 film)', ['1937']),
    x='Em Hollywood, muitos chamavam o projeto de "a loucura de Disney", certos de que ninguém aguentaria um desenho tão longo.')
c.T('Em qual país fica a caverna de Lascaux, com pinturas pré-históricas de cavalos e touros, descoberta por adolescentes em 1940?', 'França',
    ['Espanha', 'Portugal', 'Itália', 'Alemanha', 'Inglaterra'], d=3, icon='palette',
    src=('en', 'Lascaux', ['1940', '1963']),
    x='As pinturas têm cerca de 17 mil anos. A caverna foi fechada ao público em 1963, porque o fôlego dos visitantes estava danificando as imagens.')
c.T('Qual ópera de Carlos Gomes, baseada num romance de José de Alencar, estreou com sucesso no Teatro alla Scala de Milão, em 1870?', 'Il Guarany',
    ['Lo Schiavo', 'Fosca', 'Salvator Rosa', 'Aida', 'Maria Tudor'], d=3, crest='imperio_brasil',
    src=('en', 'Il Guarany', ['La Scala', '1870']),
    x='A abertura da ópera virou o tema de abertura do programa de rádio A Voz do Brasil.')
c.T('Qual pintor francês chegou ao Brasil com a Missão Artística de 1816 e retratou o cotidiano do Rio no livro Viagem Pitoresca e Histórica ao Brasil?', 'Jean-Baptiste Debret',
    ['Johann Moritz Rugendas', 'Nicolas-Antoine Taunay', 'Grandjean de Montigny', 'Frans Post', 'Victor Meirelles'], d=4, crest='brasil_colonia',
    src=('pt', 'Jean-Baptiste Debret', ['Viagem Pitoresca']),
    x='Debret também desenhou a bandeira do Império do Brasil, com o losango amarelo sobre o fundo verde.')
c.T('Qual arquiteto romano escreveu o único tratado de arquitetura da Antiguidade que sobreviveu até hoje?', 'Vitrúvio',
    ['Apolodoro de Damasco', 'Ictino', 'Fídias', 'Hipódamo de Mileto', 'Calícrates'], d=4, icon='column',
    src=('en', 'Vitruvius', ['De architectura']),
    x='Dele vem a ideia das proporções ideais do corpo humano, desenhadas por Leonardo da Vinci no Homem Vitruviano.')
c.T('Qual pintor flamengo concluiu em 1432, depois da morte do irmão Hubert, o Retábulo de Gante?', 'Jan van Eyck',
    ['Hieronymus Bosch', 'Pieter Bruegel', 'Rogier van der Weyden', 'Hans Memling', 'Peter Paul Rubens'], d=5, icon='church',
    src=('en', 'Ghent Altarpiece', ['1432', 'Hubert']),
    x='O retábulo foi levado de Gante várias vezes ao longo dos séculos; um de seus painéis, roubado em 1934, nunca foi encontrado.')

# ── Personagens ──
c.P('Qual ator e diretor ridicularizou Hitler no filme O Grande Ditador, de 1940?', 'chaplin', d=1, icon='masks',
    src=('pt', 'O Grande Ditador', ['1940']),
    x='Foi o primeiro filme totalmente falado de Chaplin, e termina com um longo discurso do protagonista em defesa da liberdade e da paz.')
c.P('Qual pintor holandês retratou, em 1632, uma aula pública de dissecação em A Lição de Anatomia do Dr. Tulp?', 'rembrandt', d=3, crest='holanda',
    src=('en', 'The Anatomy Lesson of Dr. Nicolaes Tulp', ['1632']),
    x='Pintado logo depois de sua mudança para Amsterdã, o quadro fez a sua fama; hoje está no museu Mauritshuis, em Haia.')
c.P('Qual pintor espanhol retratou a família do rei Carlos IV e, já velho e surdo, cobriu as paredes de sua casa com as "Pinturas Negras"?', 'goya', d=4, crest='espanha',
    src=('en', 'Black Paintings', ['Quinta del Sordo']),
    x='A casa, nos arredores de Madri, era chamada de Quinta del Sordo, "casa do surdo"; o apelido vinha do dono anterior, também surdo.')

# ── Quem sou eu? ──
c.Q('Quem sou eu?', 'michelangelo', ['Nasci em Caprese, na Toscana, em 1475.',
                                    'Considerava-me antes de tudo escultor, e não pintor.',
                                    'Ainda com vinte e poucos anos, esculpi uma Pietà hoje guardada na Basílica de São Pedro.',
                                    'Pintei o teto da Capela Sistina e, anos depois, o Juízo Final na parede do altar.'], 1,
    src=('pt', 'Michelangelo', ['Caprese']),
    x='Viveu quase 89 anos, idade raríssima no século XVI, e trabalhou numa escultura até poucos dias antes de morrer.')
c.Q('Quem sou eu?', 'aleijadinho', ['Nasci em Vila Rica, filho de um mestre de obras português e de uma mulher escravizada.',
                                   'Trabalhei como escultor e entalhador nas igrejas barrocas de Minas Gerais.',
                                   'Uma doença deformou meu corpo na idade adulta, mas não parei de trabalhar.',
                                   'Esculpi em pedra-sabão os doze profetas do santuário de Congonhas.'], 2,
    src=('pt', 'Aleijadinho', ['Congonhas']),
    x='Seu nome de batismo era Antônio Francisco Lisboa; o apelido veio da doença que o deformou.')
c.Q('Quem sou eu?', 'dickens', ['Nasci em Portsmouth, na Inglaterra, em 1812.',
                               'Aos doze anos, trabalhei numa fábrica de graxa de sapato enquanto meu pai estava preso por dívidas.',
                               'Publiquei quase todos os meus romances em capítulos, em revistas e fascículos.',
                               'Criei o órfão Oliver e o avarento Ebenezer Scrooge.'], 2,
    src=('en', 'Charles Dickens', ['Portsmouth', 'Marshalsea']),
    x='A miséria que viu na infância aparece em vários de seus livros, que denunciavam o trabalho infantil e as prisões por dívida.')
c.Q('Quem sou eu?', 'chopin', ['Nasci perto de Varsóvia, em 1810, filho de pai francês.',
                              'Aos vinte anos deixei minha terra natal e nunca mais voltei.',
                              'Em Paris, vivi um longo romance com a escritora George Sand.',
                              'Compus quase só para piano: noturnos, mazurcas e polonaises.',
                              'Meu coração foi levado de volta e está numa igreja de Varsóvia.'], 3,
    src=('en', 'Frédéric Chopin', ['George Sand', 'Żelazowa Wola']),
    x='Morreu em Paris aos 39 anos, de uma doença pulmonar; a irmã levou o seu coração para a Polônia, como ele havia pedido.')

# ── Quem disse? ──
c.QT('Amor é fogo que arde sem se ver; é ferida que dói, e não se sente.', 'camoes', 2, t='Quem escreveu estes versos?',
     ctx='Primeiros versos de um soneto português do século XVI',
     src=('pt', 'Luís de Camões', ['sonetos']),
     x='O soneto tenta definir o amor por uma série de contradições, e é um dos poemas mais recitados da língua portuguesa.')
c.QT('Ao vencido, ódio ou compaixão; ao vencedor, as batatas.', 'machado', 3, t='Quem escreveu esta frase?',
     ctx='Lema do "Humanitismo", filosofia inventada por um personagem de romance carioca de 1891',
     src=('pt', 'Quincas Borba', ['batatas']),
     x='A frase resume, com ironia, a filosofia do personagem Quincas Borba, que já aparecia em Memórias Póstumas de Brás Cubas.')

# ── Duelo ──
c.DU('Duelo: quem nasceu primeiro?', 'bach', 'mozart', 1, icon='lyre',
     src=('pt', 'Johann Sebastian Bach', ['1685']),
     x='Bach nasceu em 1685 e morreu em 1750, seis anos antes do nascimento de Mozart.')
c.DU('Duelo: qual destas obras foi publicada primeiro?', 'Os Lusíadas', 'Dom Quixote', 3, typ='txt', icon='book',
     src=('pt', 'Os Lusíadas', ['1572']),
     x='Os Lusíadas saíram em 1572; a primeira parte do Dom Quixote, em 1605.')
c.DU('Duelo: qual destes quadros foi pintado primeiro?', 'A Ronda Noturna', 'As Meninas', 4, typ='txt', icon='palette',
     src=('en', 'The Night Watch', ['1642']),
     x='Rembrandt terminou A Ronda Noturna em 1642; Velázquez pintou As Meninas em 1656.')
c.DU('Duelo: quem nasceu primeiro?', 'tchaikovsky', 'monet', 5, icon='hourglass',
     src=('en', 'Pyotr Ilyich Tchaikovsky', ['1840']),
     x='Os dois nasceram em 1840: Tchaikovsky em 7 de maio, e Monet em 14 de novembro.')

# ── Fato ou mito? ──
c.MY('O compositor Antonio Salieri envenenou Mozart por inveja?', False, 2, who='mozart',
     src=('en', 'Antonio Salieri', ['Pushkin', 'Amadeus']),
     x='Não há prova alguma: o boato surgiu após a morte de Mozart e ganhou fama com uma peça de Púchkin, de 1830, e com o filme Amadeus, de 1984.')
c.MY('A Mona Lisa já foi roubada do Museu do Louvre?', True, 2, who='leonardo',
     src=('en', 'Mona Lisa', ['Peruggia', '1911']),
     x='Em 1911, o italiano Vincenzo Peruggia, que tinha trabalhado no museu, saiu com o quadro escondido. A pintura só foi recuperada em Florença, em 1913.')
c.MY('Shakespeare e Cervantes morreram exatamente no mesmo dia?', False, 3, who='cervantes',
     src=('en', 'Miguel de Cervantes', ['1616', 'Shakespeare']),
     x='As datas registradas são 22 e 23 de abril de 1616, mas a Espanha já usava o calendário gregoriano e a Inglaterra, o juliano: Shakespeare morreu 11 dias depois.')
c.MY('A escultura O Pensador, de Rodin, foi criada originalmente para representar o poeta Dante?', True, 4, icon='bust',
     src=('en', 'The Thinker', ['Dante', 'Gates of Hell']),
     x='A figura nasceu no alto da "Porta do Inferno", inspirada na Divina Comédia, e mostrava Dante meditando sobre o seu poema; só depois ganhou vida própria.')

# ── Linha do tempo ──
c.O('Coloque estas pinturas em ordem, da mais antiga à mais recente?', [
    ('mona', 'Mona Lisa', 'Leonardo da Vinci', 1503, {'face': 'leonardo'}),
    ('ronda', 'A Ronda Noturna', 'Rembrandt', 1642, {'face': 'rembrandt'}),
    ('impressao', 'Impressão, Nascer do Sol', 'Claude Monet', 1872, {'face': 'monet'}),
    ('avignon', 'As Senhoritas de Avignon', 'Pablo Picasso', 1907, {'face': 'picasso'}),
    ('memoria', 'A Persistência da Memória', 'Salvador Dalí', 1931, {'face': 'dali'}),
], d=2, src=('en', 'Impression, Sunrise', ['1872']))
c.O('Coloque estes livros brasileiros em ordem de publicação, do mais antigo ao mais recente?', [
    ('guarani', 'O Guarani', 'José de Alencar', 1857, {'crest': 'imperio_brasil'}),
    ('bras', 'Memórias Póstumas de Brás Cubas', 'Machado de Assis', 1881, {'face': 'machado'}),
    ('sertoes', 'Os Sertões', 'Euclides da Cunha', 1902, {'flag': 'BRA'}),
    ('macunaima', 'Macunaíma', 'Mário de Andrade', 1928, {'flag': 'BRA'}),
    ('veredas', 'Grande Sertão: Veredas', 'Guimarães Rosa', 1956, {'flag': 'BRA'}),
], d=3, src=('pt', 'Grande Sertão: Veredas', ['1956']))

# ── Linhagens ──
c.LN('Quem é o elo que falta nesta linha de mestres e discípulos?', 'leonardo', 'Mestre e discípulo · Florença e Milão',
     ['Andrea del Verrocchio', '?', 'Francesco Melzi'], d=2, era='mod',
     src=('en', 'Francesco Melzi', ['Leonardo']),
     x='Melzi acompanhou o mestre até a França e herdou os seus cadernos e desenhos.')
c.LN('Quem completa este grupo de participantes da Semana de Arte Moderna?', 'villa_lobos', 'Semana de Arte Moderna · São Paulo, 1922',
     ['Mário de Andrade', 'Oswald de Andrade', 'Anita Malfatti', '?', 'Menotti Del Picchia'], d=3, kind='grupo', era='new',
     src=('pt', 'Semana de Arte Moderna', ['Villa-Lobos']),
     x='Tarsila do Amaral, tão ligada ao Modernismo, não participou: em fevereiro de 1922, ela estava em Paris.')

# ── Manchetes ──
c.NW('Quem é o escritor desta manchete?', 'dostoievski', 'Escritor condenado à morte é poupado diante do pelotão de fuzilamento', 3,
     paper='Gazeta de São Petersburgo', sub='Membros do Círculo Petrachevski souberam no último instante que o czar trocou a pena por trabalhos forçados na Sibéria',
     typ='player', src=('en', 'Fyodor Dostoevsky', ['Petrashevsky', '1849']),
     x='Ele passou quatro anos num presídio na Sibéria; a experiência inspirou o livro Recordações da Casa dos Mortos.')
c.write()
