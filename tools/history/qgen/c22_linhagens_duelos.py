"""Linhagens (successions, master-pupil chains, councils and alliances) and
Duelos (two cards only: who came first, who reigned longer...)."""
from qdsl import Cat

# ── Linhagens ── a succession or a council, one link missing
c = Cat('linhagens', 'Dinastias e alianças', '🌳', 'Complete a linhagem', '#7B5E1E', order=64)

# d1
c.LN('Quem é o filho que completa esta linhagem de reis macedônios?', 'alexandre', 'De pai para filho · Macedônia',
     ['Amintas III', 'Filipe II da Macedônia', '?'], d=1, era='ant',
     src=('en', 'Philip II of Macedon', ['Amyntas III']),
     x='Filipe II escolheu Aristóteles para ser o preceptor do filho, que tinha então 13 anos.')
c.LN('Quem completa este grupo de líderes da conjuração mineira?', 'tiradentes', 'Inconfidência Mineira · Vila Rica, 1789',
     ['Tomás Antônio Gonzaga', 'Freire de Andrade', 'Cláudio Manuel da Costa', '?'], d=1, kind='grupo', era='mod',
     src=('pt', 'Inconfidência Mineira', ['Cláudio Manuel da Costa', '1792']),
     x='Dos condenados, só o alferes Joaquim José da Silva Xavier foi executado, em 21 de abril de 1792, no Rio de Janeiro.')
c.LN('Quem foi o primeiro a liderar a União Soviética?', 'lenin', 'Líderes da União Soviética · 1922–1964',
     ['?', 'Josef Stálin', 'Gueorgui Malenkov', 'Nikita Khrushchov'], d=1, era='new',
     src=('en', 'Vladimir Lenin', ['1924']),
     x='Ele morreu em janeiro de 1924, pouco mais de um ano depois da criação da URSS, e seu corpo embalsamado foi exposto num mausoléu na Praça Vermelha.')
c.LN('Qual primeiro-ministro falta nesta sequência?', 'churchill', 'Primeiros-ministros britânicos · 1937–1951',
     ['Neville Chamberlain', '?', 'Clement Attlee'], d=1, era='new',
     src=('pt', 'Winston Churchill', ['Chamberlain', '1940']),
     x='Ele perdeu a eleição de 1945, logo depois da vitória na Europa, mas voltou ao cargo em 1951.')
c.LN('Qual país completa os fundadores do Mercosul?', 'Paraguai', 'Fundadores do Mercosul · 1991',
     ['Brasil', 'Argentina', 'Uruguai', '?'], d=1, kind='grupo', era='new', typ='txt',
     wrong=['Chile', 'Peru', 'Colômbia', 'Equador', 'México'],
     src=('pt', 'Mercosul', ['Assunção', '1991']),
     x='O tratado que criou o bloco foi assinado em março de 1991 em Assunção, a capital paraguaia.')

# d2
c.LN('Quem completa o trio de grandes mestres do Alto Renascimento?', 'rafael', 'Alto Renascimento · Itália',
     ['Leonardo da Vinci', 'Michelangelo', '?'], d=2, kind='grupo', era='mod',
     src=('en', 'Raphael', ['trinity', 'Michelangelo']),
     x='O mais jovem dos três morreu em Roma em 1520, aos 37 anos, e foi sepultado no Panteão.')
c.LN('Qual soberana falta nesta sucessão do trono britânico?', 'victoria', 'Trono britânico · 1760–1910',
     ['Jorge III', 'Jorge IV', 'Guilherme IV', '?', 'Eduardo VII'], d=2, era='new',
     src=('pt', 'Vitória do Reino Unido', ['1837', 'Eduardo VII']),
     x='Ela subiu ao trono aos 18 anos, em 1837, e reinou por mais de 63 anos.')
c.LN('Qual rei falta nesta linhagem bíblica de pai para filho?', 'salomao', 'Reis em Jerusalém · segundo a Bíblia',
     ['Davi', '?', 'Roboão'], d=2, era='ant',
     src=('pt', 'Salomão', ['Davi', 'Roboão']),
     x='Segundo a Bíblia, foi ele quem construiu o primeiro Templo de Jerusalém.')
c.LN('Qual presidente falta nesta sequência da Casa Branca?', 'kennedy', 'Presidentes dos EUA · 1953–1969',
     ['Dwight Eisenhower', '?', 'Lyndon Johnson'], d=2, era='new',
     src=('pt', 'John F. Kennedy', ['Eisenhower', 'Lyndon']),
     x='Ele foi o mais jovem presidente eleito dos Estados Unidos, aos 43 anos, e foi assassinado em Dallas em 1963.')
c.LN('Quem completa os "pais da pátria" da unificação italiana?', 'garibaldi', 'Risorgimento · Itália, século XIX',
     ['Camillo Cavour', 'Giuseppe Mazzini', 'Vítor Emanuel II', '?'], d=2, kind='grupo', era='new',
     src=('en', 'Giuseppe Garibaldi', ['Mazzini', 'Cavour']),
     x='Antes de virar herói na Itália, ele combateu no sul do Brasil, na Revolução Farroupilha, onde conheceu Anita.')
c.LN('Quem ocupa o lugar vazio nesta lista de presidentes do Brasil?', 'getulio', 'Presidentes do Brasil · 1930–1951',
     ['?', 'José Linhares', 'Eurico Gaspar Dutra'], d=2, era='new',
     src=('pt', 'José Linhares', ['Getúlio', 'Dutra']),
     x='Deposto em outubro de 1945, ele voltou ao Palácio do Catete em 1951, desta vez eleito pelo voto direto.')
c.LN('Quem completava o trio de cônsules que governou a França a partir de 1799?', 'napoleao', 'Consulado · França, 1799–1804',
     ['?', 'Cambacérès', 'Lebrun'], d=2, kind='grupo', era='new',
     src=('en', 'French Consulate', ['Cambacérès', 'Lebrun']),
     x='Nascido do golpe do 18 de Brumário, o Consulado durou até 1804, quando deu lugar a um império.')
c.LN('Qual potência completa a Tríplice Entente?', 'Império Russo', 'Tríplice Entente · 1907',
     ['França', 'Reino Unido', '?'], d=2, kind='grupo', era='new', typ='txt',
     wrong=['Império Alemão', 'Áustria-Hungria', 'Itália', 'Império Otomano', 'Espanha'],
     src=('pt', 'Tríplice Entente', ['Rússia', '1907']),
     x='A aliança se fechou em 1907, quando um acordo anglo-russo se somou à Entente Cordiale franco-britânica de 1904.')
c.LN('Quem foi a primeira imperatriz do Brasil?', 'leopoldina', 'Imperatrizes do Brasil · 1822–1889',
     ['?', 'Amélia de Leuchtenberg', 'Teresa Cristina'], d=2, era='new',
     src=('pt', 'Amélia de Leuchtenberg', ['Leopoldina']),
     x='Como regente interina, ela presidiu a reunião do Conselho de Estado de 2 de setembro de 1822, que aconselhou dom Pedro a romper com Portugal.')

# d3
c.LN('Qual grão-cã falta nesta sucessão?', 'kublai', 'Grandes cãs do Império Mongol · 1206–1294',
     ['Gengis Khan', 'Ogodei', 'Guyuk', 'Mongke', '?'], d=3, era='med',
     src=('en', 'Kublai Khan', ['Möngke']),
     x='Ele fundou a dinastia Yuan e fez de Pequim, então chamada Dadu, a capital do seu império.')
c.LN('Qual sultão falta nesta linhagem de pai para filho?', 'solimao', 'Sultões otomanos · 1481–1574',
     ['Bajazeto II', 'Selim I', '?', 'Selim II'], d=3, era='mod',
     src=('en', 'Suleiman the Magnificent', ['Selim I', 'Selim II']),
     x='Seu reinado de 46 anos, de 1520 a 1566, foi o mais longo da história otomana.')
c.LN('Quem ocupa o trono que falta nesta sucessão russa?', 'catarina_grande', 'Soberanos da Rússia · 1741–1825',
     ['Isabel', 'Pedro III', '?', 'Paulo I', 'Alexandre I'], d=3, era='mod',
     src=('pt', 'Catarina II da Rússia', ['Pedro III', 'Paulo']),
     x='Nascida princesa alemã, ela chegou ao poder em 1762, num golpe contra o próprio marido.')
c.LN('Quem completa o Comitê dos Cinco, que redigiu a Declaração de Independência americana?', 'franklin', 'Comitê dos Cinco · Filadélfia, 1776',
     ['John Adams', 'Thomas Jefferson', '?', 'Roger Sherman', 'Robert Livingston'], d=3, kind='grupo', era='mod',
     src=('en', 'Committee of Five', ['Franklin', 'Sherman']),
     x='Com 70 anos em 1776, ele era de longe o mais velho dos cinco.')
c.LN('Quem completa o trio de irmãos Andrada que marcou a Independência?', 'jose_bonifacio', 'Os irmãos Andrada · Independência do Brasil',
     ['?', 'Martim Francisco', 'Antônio Carlos'], d=2, kind='grupo', era='new',
     src=('pt', 'José Bonifácio de Andrada e Silva', ['Martim Francisco']),
     x='Os três nasceram em Santos e, depois que dom Pedro I dissolveu a Constituinte, em 1823, foram presos e exilados na França.')
c.LN('Qual imperador japonês falta nesta linhagem?', 'meiji', 'Imperadores do Japão · 1846–1989',
     ['Komei', '?', 'Taisho', 'Showa (Hirohito)'], d=2, era='new',
     src=('en', 'Emperor Meiji', ['Taishō', 'Kōmei']),
     x='Durante seu reinado, iniciado em 1867, o Japão deixou para trás o regime feudal e se tornou uma potência industrial.')
c.LN('Quem é o elo que falta nesta família ptolomaica?', 'cleopatra', 'Três gerações · Egito ptolomaico',
     ['Ptolomeu XII', '?', 'Cesarião'], d=3, era='ant',
     src=('en', 'Cleopatra', ['Ptolemy XII', 'Caesarion']),
     x='Ela foi a última governante ativa do Egito ptolomaico; seu filho com Júlio César foi morto por ordem de Otaviano.')
c.LN('Qual rei falta nesta sucessão da Prússia?', 'frederico_grande', 'Reis da Prússia · 1701–1797',
     ['Frederico I', 'Frederico Guilherme I', '?', 'Frederico Guilherme II'], d=3, era='mod',
     src=('pt', 'Frederico II da Prússia', ['Frederico Guilherme I']),
     x='Ele reinou de 1740 a 1786, tocava flauta e se correspondia com Voltaire.')
c.LN('Quem fecha esta sucessão de imperadores incas?', 'atahualpa', 'Imperadores incas · 1438–1533',
     ['Pachacútec', 'Túpac Inca Yupanqui', 'Huayna Cápac', 'Huáscar', '?'], d=3, era='mod',
     src=('pt', 'Atahualpa', ['Huáscar']),
     x='Capturado pelos espanhóis em Cajamarca, ele ofereceu encher uma sala de ouro pela liberdade, mas foi executado em 1533.')

# d4
c.LN('Quem é o elo que falta nesta linha de mestres e discípulos da música?', 'beethoven', 'Mestre e discípulo · Viena',
     ['Joseph Haydn', '?', 'Carl Czerny', 'Franz Liszt'], d=4, era='mod',
     src=('en', 'Carl Czerny', ['Beethoven', 'Liszt']),
     x='Haydn deu aulas ao jovem compositor em Viena a partir de 1792; Czerny, aluno dele ainda menino, depois ensinou Liszt.')
c.LN('Qual rei da Babilônia falta nesta linhagem?', 'nabucodonosor', 'De pai para filho · Babilônia',
     ['Nabopolassar', '?', 'Amel-Marduk'], d=3, era='ant',
     src=('en', 'Nebuchadnezzar II', ['Nabopolassar', 'Amel-Marduk']),
     x='Ele conquistou Jerusalém e levou parte de seus habitantes para o cativeiro na Babilônia.')
c.LN('Quem foi o último imperador desta sucessão etíope?', 'haile_selassie', 'Imperadores da Etiópia · 1889–1974',
     ['Menelik II', 'Iyasu V', 'Zauditu', '?'], d=3, era='new',
     src=('en', 'Haile Selassie', ['Zewditu', 'Menelik']),
     x='Coroado em 1930, ele foi deposto por uma junta militar em 1974; a monarquia foi abolida no ano seguinte.')
c.LN('Quem completa esta linhagem de imperadores máurias?', 'ashoka', 'Império Máuria · três gerações',
     ['Chandragupta Máuria', 'Bindusara', '?'], d=4, era='ant',
     src=('en', 'Ashoka', ['Bindusara', 'Kalinga']),
     x='O capitel dos leões que ele mandou erguer em Sarnath, com quatro leões de costas uns para os outros, é hoje o emblema nacional da Índia.')
c.LN('Quem é o elo que falta nesta família que dominou Florença de pai para filho?', 'lorenzo', 'De pai para filho · Florença, 1434–1494',
     ['Cosme, o Velho', 'Piero, o Gotoso', '?', 'Piero, o Desafortunado'], d=4, era='mod',
     src=('en', "Lorenzo de' Medici", ['Piero', 'Botticelli']),
     x='Ele foi patrono de Botticelli e acolheu o jovem Michelangelo em sua casa.')

# d5
c.LN('Quem é o rei amorita que falta nesta linhagem de pai para filho?', 'hamurabi', 'Primeira dinastia da Babilônia',
     ['Sin-Muballit', '?', 'Samsu-iluna'], d=4, era='ant',
     src=('en', 'Hammurabi', ['Sin-Muballit', 'Samsu-iluna']),
     x='Seu código de leis, gravado numa estela de pedra encontrada em Susa, no atual Irã, está hoje no Museu do Louvre, em Paris.')
c.LN('Quem é o avô que abre esta linhagem de governantes da Ásia Central?', 'tamerlao', 'Avô, pai e neto · séculos XIV–XV',
     ['?', 'Shah Rukh', 'Ulugh Beg'], d=5, era='med',
     src=('en', 'Ulugh Beg', ['Shah Rukh']),
     x='O neto, Ulugh Beg, construiu em Samarcanda um dos maiores observatórios astronômicos do século XV.')
c.LN('Quem completa a sucessão dos primeiros chefes da escola estoica?', 'Crisipo', 'A Stoa de Atenas · século III a.C.',
     ['Zenão de Cítio', 'Cleantes', '?'], d=5, era='ant', typ='txt',
     wrong=['Epicuro', 'Sêneca', 'Epicteto', 'Aristóteles', 'Antístenes'],
     src=('en', 'Chrysippus', ['Cleanthes']),
     x='Dizia-se na Antiguidade que, sem Crisipo, não haveria Stoa: foi ele quem deu forma sistemática ao estoicismo.')
c.write()

# ── Duelo ── only two cards on the board
c = Cat('duelos', 'Duelo', '🤺', 'Só dois na disputa', '#5D4037', order=65)

# d1
c.DU('Duelo: quem viveu primeiro?', 'homero', 'virgilio', 1, icon='lyre',
     src=('pt', 'Eneida', ['Homero']),
     x='Virgílio escreveu a Eneida inspirado na Ilíada e na Odisseia, compostas uns sete séculos antes.')
c.DU('Duelo: quem nasceu primeiro?', 'mozart', 'beethoven', 1, icon='lyre',
     src=('pt', 'Wolfgang Amadeus Mozart', ['1756']),
     x='Mozart nasceu em 1756, catorze anos antes de Beethoven, e morreu em 1791, aos 35 anos.')
c.DU('Duelo: qual destes pintores nasceu primeiro?', 'van_gogh', 'picasso', 1, icon='palette',
     src=('pt', 'Vincent van Gogh', ['1853']),
     x='Van Gogh morreu em 1890, quando Picasso tinha apenas 8 anos.')
c.DU('Duelo: qual destes escritores nasceu primeiro?', 'machado', 'drummond', 1, icon='quill',
     src=('pt', 'Machado de Assis', ['1839']),
     x='Machado de Assis morreu em 1908; Drummond nasceu em 1902, em Itabira, Minas Gerais.')
c.DU('Duelo: qual destas invenções surgiu primeiro?', 'Prensa de Gutenberg', 'Máquina a vapor de Watt', 1, typ='txt', icon='gear',
     src=('pt', 'Johannes Gutenberg', ['Bíblia']),
     x='A Bíblia de Gutenberg foi impressa na década de 1450; a máquina a vapor de James Watt foi patenteada em 1769.')
c.DU('Duelo: qual destes monumentos foi inaugurado primeiro?', 'Torre Eiffel', 'Cristo Redentor', 1, typ='txt', icon='hourglass',
     src=('pt', 'Cristo Redentor', ['1931']),
     x='A torre ficou pronta para a Exposição Universal de Paris, em 1889; o Cristo do Corcovado, só em 1931.')
c.DU('Duelo: quem nasceu primeiro?', 'washington', 'napoleao', 1, icon='hourglass',
     src=('pt', 'George Washington', ['1732']),
     x='Washington nasceu em 1732 e morreu em 1799, o ano em que Napoleão tomou o poder na França.')

# d2
c.DU('Duelo: qual destes poetas viveu primeiro?', 'dante', 'camoes', 2, icon='book',
     src=('pt', 'Dante Alighieri', ['1265']),
     x='A Divina Comédia é do início do século XIV; Os Lusíadas só foram publicados em 1572.')
c.DU('Duelo: quem nasceu primeiro?', 'copernico', 'galileu', 2, icon='telescope',
     src=('pt', 'Nicolau Copérnico', ['1473']),
     x='Copérnico morreu em 1543, 21 anos antes do nascimento de Galileu, que defenderia as suas ideias.')
c.DU('Duelo: quem governou Roma por mais tempo?', 'augusto', 'nero', 2, crest='imperio_romano',
     src=('en', 'Augustus', ['Octavian']),
     x='Augusto governou por cerca de 40 anos, de 27 a.C. a 14 d.C.; Nero, por 14, de 54 a 68.')
c.DU('Duelo: quem nasceu primeiro?', 'kublai', 'marco_polo', 2, icon='compass',
     src=('pt', 'Marco Polo', ['Kublai']),
     x='Kublai Khan nasceu em 1215; o viajante veneziano que serviu em sua corte nasceu por volta de 1254.')
c.DU('Duelo: qual destas cidades foi fundada primeiro?', 'São Paulo', 'Rio de Janeiro', 2, typ='txt', icon='map',
     src=('pt', 'São Paulo', ['1554']),
     x='São Paulo nasceu com o colégio dos jesuítas, em 1554; o Rio foi fundado por Estácio de Sá em 1565.')
c.DU('Duelo: qual destas capitais planejadas foi inaugurada primeiro?', 'Belo Horizonte', 'Brasília', 2, typ='txt', icon='map',
     src=('pt', 'Belo Horizonte', ['1897']),
     x='Belo Horizonte foi inaugurada em 1897 para substituir Ouro Preto como capital de Minas Gerais.')
c.DU('Duelo: o que aconteceu primeiro?', 'Declaração de Independência dos EUA', 'Tomada da Bastilha', 2, typ='txt', icon='torch',
     src=('pt', 'Declaração de Independência dos Estados Unidos', ['1776']),
     x='A Declaração é de 4 de julho de 1776; a Bastilha caiu em 14 de julho de 1789.')
c.DU('Duelo: qual destes templos foi construído primeiro?', 'Santa Sofia', 'Notre-Dame de Paris', 2, typ='txt', icon='church',
     src=('en', 'Hagia Sophia', ['537']),
     x='A atual Santa Sofia foi concluída em 537, sob Justiniano; Notre-Dame começou a ser erguida em 1163.')
c.DU('Duelo: quem partiu primeiro para sua grande viagem?', 'vasco_gama', 'magalhaes', 2, icon='ship',
     src=('pt', 'Vasco da Gama', ['1497']),
     x='Vasco da Gama zarpou de Lisboa rumo à Índia em 1497; Magalhães partiu da Espanha em 1519, na expedição que deu a primeira volta ao mundo.')

# d3
c.DU('Duelo: qual destes filósofos nasceu primeiro?', 'voltaire', 'kant', 3, icon='quill',
     src=('pt', 'Voltaire', ['1694']),
     x='Voltaire nasceu em 1694, trinta anos antes de Kant, que passou quase toda a vida em Königsberg.')
c.DU('Duelo: quem reinou por mais tempo?', 'luis_xiv', 'victoria', 3, icon='crown',
     src=('pt', 'Luís XIV de França', ['1643', '1715']),
     x='Luís XIV ficou 72 anos no trono, de 1643 a 1715; a rainha Vitória, 63, de 1837 a 1901.')
c.DU('Duelo: quem ficou mais tempo no trono inglês?', 'elizabeth_i', 'henrique_viii', 3, crest='inglaterra',
     src=('pt', 'Isabel I de Inglaterra', ['1558', '1603']),
     x='Henrique VIII reinou de 1509 a 1547; sua filha, de 1558 a 1603, por 44 anos.')
c.DU('Duelo: quem governou primeiro?', 'moctezuma', 'atahualpa', 3, icon='crown',
     src=('en', 'Moctezuma II', ['1502']),
     x='Montezuma II chegou ao trono asteca em 1502; Atahualpa só se tornou o soberano inca em 1532, depois de vencer o irmão Huáscar numa guerra civil.')
c.DU('Duelo: o que aconteceu primeiro?', 'Chegada da família real portuguesa ao Brasil', 'Batalha de Waterloo', 3, typ='txt', icon='hourglass',
     src=('pt', 'Transferência da corte portuguesa para o Brasil', ['1808']),
     x='A corte desembarcou no Brasil em 1808, fugindo das tropas de Napoleão, sete anos antes de Waterloo.')
c.DU('Duelo: quem viveu mais anos?', 'michelangelo', 'leonardo', 3, icon='palette',
     src=('pt', 'Michelangelo', ['1564']),
     x='Michelangelo morreu em 1564, aos 88 anos; Leonardo morreu em 1519, aos 67.')
c.DU('Duelo: qual destes estados surgiu primeiro?', 'imperio_otomano', 'ming', 3, typ=None, icon='hourglass',
     src=('pt', 'Império Otomano', ['1299']),
     x='Os otomanos surgiram na Anatólia por volta de 1299; a dinastia Ming foi fundada na China em 1368.')

# d4
c.DU('Duelo: qual destes romancistas nasceu primeiro?', 'victor_hugo', 'dickens', 4, icon='book',
     src=('pt', 'Victor Hugo', ['1802']),
     x='Victor Hugo nasceu em 1802, dez anos antes de Dickens, e sobreviveu a ele por quinze anos.')
c.DU('Duelo: quem nasceu primeiro?', 'gandhi', 'churchill', 4, icon='hourglass',
     src=('pt', 'Mahatma Gandhi', ['1869']),
     x='Gandhi nasceu em 1869 e Churchill, em 1874; o indiano morreu em 1948, e o britânico, só em 1965.')
c.DU('Duelo: quem morreu mais jovem?', 'mozart', 'van_gogh', 4, icon='hourglass',
     src=('pt', 'Wolfgang Amadeus Mozart', ['1791']),
     x='Mozart morreu aos 35 anos, em 1791; Van Gogh, aos 37, em 1890.')
c.DU('Duelo: qual destas obras de engenharia ficou pronta primeiro?', 'Estátua da Liberdade', 'Torre Eiffel', 4, typ='txt', icon='hourglass',
     src=('pt', 'Estátua da Liberdade', ['1886', 'Eiffel']),
     x='A estátua foi inaugurada em Nova York em 1886; sua estrutura interna foi projetada por Gustave Eiffel, o mesmo da torre de 1889.')
c.DU('Duelo: qual destes países se tornou independente primeiro?', 'México', 'Brasil', 4, typ='txt', icon='flag',
     src=('pt', 'Independência do México', ['1821']),
     x='O México consumou sua independência em setembro de 1821, um ano antes do Grito do Ipiranga.')

# d5
c.DU('Duelo: quem nasceu primeiro?', 'solimao', 'carlos_v', 5, icon='crown',
     src=('en', 'Suleiman the Magnificent', ['1494', 'Charles V']),
     x='O sultão nasceu poucos anos antes do imperador, que é de 1500: os dois rivais disputaram a Europa Central e o Mediterrâneo por décadas.')
c.DU('Duelo: quem morreu primeiro?', 'bolivar', 'dom_pedro_i', 5, icon='hourglass',
     src=('pt', 'Simón Bolívar', ['1830']),
     x='Bolívar morreu em 1830, aos 47 anos; Dom Pedro I, em 1834, aos 35, em Portugal.')
c.write()
