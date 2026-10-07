"""Ásia: China, Japão, Coreia, Índia, as estepes e o Sudeste Asiático, de todas as épocas."""
from qdsl import Cat

c = Cat('oriente', 'Ásia e Oriente', '🏯', 'China, Japão, Índia e as estepes', '#B23A2E', order=53)

# ── d1 ──
c.T('Que material um funcionário da corte chinesa passou a fabricar, por volta do ano 105, com casca de árvore, cânhamo, trapos e redes de pesca velhas?', 'Papel',
    ['Papiro', 'Pergaminho', 'Porcelana', 'Seda', 'Vidro'], d=1, crest='han',
    src=('en', 'Cai Lun', ['105']),
    x='A tradição atribui a invenção a Cai Lun, funcionário da corte Han, por volta do ano 105; depois, arqueólogos acharam papéis ainda mais antigos.')
c.T('Como eram chamados os pilotos japoneses que, na Segunda Guerra, jogavam seus aviões carregados de explosivos contra navios inimigos?', 'Kamikazes',
    ['Samurais', 'Ninjas', 'Ronins', 'Xoguns', 'Daimiôs'], d=1, icon='plane',
    src=('en', 'Kamikaze', ['Okinawa']),
    x='A palavra quer dizer "vento divino" e lembra os tufões que, segundo a tradição, salvaram o Japão de duas invasões mongóis no século XIII.')
c.T('Qual cidade a China cedeu aos britânicos depois da Primeira Guerra do Ópio e só recuperou em 1997?', 'Hong Kong',
    ['Macau', 'Xangai', 'Cantão', 'Nanquim', 'Cingapura'], d=1, crest='reino_unido',
    src=('en', 'Hong Kong', ['1997']),
    x='O Reino Unido devolveu a cidade sob a fórmula "um país, dois sistemas", com a promessa de 50 anos de autonomia.')
c.T('Como se chama a espada longa e curva que se tornou o símbolo dos samurais?', 'Katana',
    ['Cimitarra', 'Gládio', 'Florete', 'Montante', 'Rapieira'], d=1, stad='himeji',
    src=('en', 'Katana', ['samurai']),
    x='Nos primeiros séculos, a arma mais importante do samurai era o arco, usado a cavalo; a espada só depois virou o seu emblema.')
c.T('Como se chama o sistema social da Índia que dividia as pessoas em grupos hereditários, cada um com suas profissões e regras?', 'Sistema de castas',
    ['Feudalismo', 'Mandarinato', 'Sistema de guildas', 'Sistema de clãs', 'Servidão'], d=1, flag='IND',
    src=('en', 'Caste system in India', ['varna']),
    x='A Constituição da Índia, de 1950, proibiu a discriminação por casta e aboliu a prática da "intocabilidade".')
c.T('Qual religião, nascida na Índia, tem entre seus deuses mais venerados Brahma, Vishnu e Shiva?', 'Hinduísmo',
    ['Budismo', 'Jainismo', 'Siquismo', 'Xintoísmo', 'Zoroastrismo'], d=1, flag='IND',
    src=('en', 'Trimurti', ['Vishnu']),
    x='Com mais de 1 bilhão de fiéis, é a terceira maior religião do mundo, atrás apenas do cristianismo e do islã.')
c.Q('Quem sou eu?', 'sidarta', ['Nasci príncipe, perto do Himalaia, há uns 2.500 anos.',
    'Meu pai quis me afastar de toda visão de velhice, doença e morte.',
    'Deixei o palácio, a esposa e o filho para buscar o fim do sofrimento.',
    'Alcancei a iluminação meditando sob uma figueira, em Bodh Gaya.'], 1,
    src=('en', 'The Buddha', ['Bodh Gaya']),
    x='A árvore ficou conhecida como Bodhi; uma muda que se diz descender dela é venerada há mais de 2 mil anos em Anuradhapura, no Sri Lanka.')
c.NW('Quem é o líder desta manchete?', 'gandhi', 'Marcha chega ao mar e desafia a lei do sal', 1, paper='Jornal de Bombaim',
     sub='Depois de 24 dias a pé, líder pacifista recolhe sal na praia de Dandi', typ='player',
     src=('en', 'Salt March', ['Dandi']),
     x='Nos meses seguintes, a desobediência se espalhou pela Índia e mais de 60 mil pessoas foram presas, entre elas o próprio líder.')
c.NW('Em que ano saiu esta manchete?', '1947', 'Índia livre: termina o domínio britânico', 1, paper='Diário de Délhi',
     sub='À meia-noite, nascem dois países independentes: Índia e Paquistão',
     wrong=['1919', '1930', '1942', '1945', '1950'], src=('en', 'Partition of India', ['1947']),
     x='A partilha provocou uma das maiores migrações da história: entre 12 e 20 milhões de pessoas deixaram suas casas.')
c.MY('O Japão é o único país que já foi atacado com bombas atômicas numa guerra?', True, 1, flag='JPN',
     src=('en', 'Atomic bombings of Hiroshima and Nagasaki', ['Nagasaki']),
     x='Hiroshima foi atingida em 6 de agosto de 1945, e Nagasaki, três dias depois; desde então, nenhuma arma nuclear foi usada em combate.')
c.DU('Duelo: quem governou a China primeiro?', 'qin_shi_huang', 'kublai', 1, flag='CHN',
     src=('en', 'Qin Shi Huang', ['221']),
     x='Qin Shi Huang unificou a China em 221 a.C.; Kublai Khan fundou a dinastia Yuan quase 1.500 anos depois, em 1271.')
c.DU('Duelo: qual destes monumentos começou a ser erguido primeiro?', 'Grande Muralha da China', 'Taj Mahal', 1, typ='txt', icon='hourglass',
     src=('en', 'Great Wall of China', ['Qin']),
     x='Trechos de muralha já eram erguidos na China séculos antes de Cristo; o Taj Mahal só começou a subir em 1632.')
c.O('Coloque estes marcos da história da Ásia em ordem, do mais antigo ao mais recente?', [
    ('qin', 'China unificada pela primeira vez', 'Qin Shi Huang', -221, {'face': 'qin_shi_huang'}),
    ('mongois', 'Fundação do Império Mongol', 'Gengis Khan', 1206, {'face': 'gengis'}),
    ('india', 'Independência da Índia', 'Fim do domínio britânico', 1947, {'face': 'gandhi'})], d=1,
    src=('en', 'Genghis Khan', ['1206']))

# ── d2 ──
c.T('Que produto chinês os britânicos compravam em tal quantidade, no século XIX, que passaram a vender ópio à China para pagar a conta?', 'Chá',
    ['Café', 'Tabaco', 'Cacau', 'Açúcar', 'Borracha'], d=2, crest='qing',
    src=('en', 'First Opium War', ['tea']),
    x='Em 1839, o comissário Lin Zexu mandou destruir mais de mil toneladas de ópio apreendido em Humen; foi o estopim da guerra.')
c.T('Como se chama o código de honra associado aos samurais, que exaltava a lealdade ao senhor e a coragem diante da morte?', 'Bushido',
    ['Xintoísmo', 'Ikebana', 'Kabuki', 'Sumô', 'Haicai'], d=2, flag='JPN',
    src=('en', 'Bushido', ['samurai']),
    x='O livro que levou a palavra ao Ocidente, "Bushido: a alma do Japão", foi escrito em inglês pelo japonês Inazo Nitobe, por volta de 1900.')
c.T('Qual cidade do atual Uzbequistão, famosa pelas cúpulas azuis, foi uma das grandes paradas da Rota da Seda?', 'Samarcanda',
    ['Bagdá', 'Damasco', 'Cabul', 'Teerã', 'Lhasa'], d=2, flag='UZB',
    src=('en', 'Samarkand', ['Silk Road']),
    x='A praça Registan, cercada por três madraçais cobertos de azulejos, é o cartão-postal da cidade.')
c.T('Qual país europeu governou Macau, no sul da China, até 1999?', 'Portugal',
    ['Espanha', 'Holanda', 'França', 'Inglaterra', 'Itália'], d=2, flag='CHN',
    src=('en', 'Macau', ['1999']),
    x='Os portugueses se instalaram ali em meados do século XVI; Macau foi a última colônia europeia na Ásia a ser devolvida.')
c.T('Qual era o antigo nome de Tóquio, a cidade dos xoguns Tokugawa?', 'Edo',
    ['Quioto', 'Osaka', 'Nara', 'Kamakura', 'Nagasaki'], d=2, who='tokugawa_ieyasu',
    src=('en', 'Edo', ['Tokugawa']),
    x='Em 1868, quando o poder voltou ao imperador, a cidade foi rebatizada Tóquio, "capital do leste", e o imperador passou a morar ali.')
c.T('Que fio precioso a China guardou em segredo por séculos, até que monges levaram ovos do inseto que o produz para Bizâncio, no século VI?', 'Seda',
    ['Algodão', 'Linho', 'Lã', 'Caxemira', 'Juta'], d=2, crest='bizancio',
    src=('en', 'Byzantine silk', ['Justinian']),
    x='Segundo um relato bizantino, os ovos viajaram escondidos dentro de bengalas ocas, a pedido do imperador Justiniano.')
c.C('Qual dinastia, contemporânea do Império Romano, deu nome à etnia de mais de 90% dos chineses?', 'han', d=2, flag='CHN',
    src=('en', 'Han Chinese', ['Han dynasty']),
    x='Foi nessa época que a Rota da Seda se firmou e que os chineses inventaram o papel.')
c.Q('Quem sou eu?', 'marco_polo', ['Nasci numa família de mercadores de Veneza, no século XIII.',
    'Ainda adolescente, parti com meu pai e meu tio rumo ao Oriente.',
    'Passei 17 anos a serviço do grande cã dos mongóis, na China.',
    'Preso pelos genoveses, ditei minhas memórias a um companheiro de cela.'], 2,
    src=('en', 'Marco Polo', ['Rustichello']),
    x='O companheiro de cela era Rustichello da Pisa, autor de romances de cavalaria, e o livro virou um sucesso na Europa.')
c.Q('Quem sou eu?', 'qin_shi_huang', ['Subi ao trono de um reino do oeste da China aos 13 anos.',
    'Conquistei, um a um, todos os reinos rivais.',
    'Padronizei a escrita, as moedas, os pesos e as medidas.',
    'Meu túmulo, perto de Xi\'an, é guardado por milhares de guerreiros de terracota.'], 2,
    src=('en', 'Qin Shi Huang', ['terracotta']),
    x='Obcecado pela imortalidade, mandou expedições em busca de um elixir da vida eterna.')
c.QT('Não faças aos outros o que não queres que façam a ti.', 'confucio', 2,
     ctx='Resposta a um discípulo que pediu uma só palavra para guiar a vida inteira; China, por volta de 500 a.C.',
     src=('en', 'Golden Rule', ['Confucius']),
     x='A mesma ideia, chamada de "regra de ouro", aparece em muitas tradições, do judaísmo ao cristianismo e ao islã.')
c.QT('Se você conhece o inimigo e conhece a si mesmo, não precisa temer o resultado de cem batalhas.', 'sun_tzu', 2,
     ctx='Tratado militar chinês em treze capítulos, do século V a.C.',
     src=('en', 'The Art of War', ['Sun Tzu']),
     x='O livro é estudado até hoje em escolas militares e virou leitura também de executivos e técnicos esportivos.')
c.BT('Qual potência colonial foi derrotada pelos vietnamitas nesta batalha?', 'França', 'Dien Bien Phu · 1954', 'VNM', '?', d=2, typ='txt',
     wrong=['Estados Unidos', 'Reino Unido', 'Japão', 'China', 'Holanda'],
     x='A derrota levou aos Acordos de Genebra, que dividiram o Vietnã em dois na altura do paralelo 17.',
     src=('en', 'Battle of Dien Bien Phu', ['Geneva']))
c.NW('Em que ano saiu esta manchete?', '1949', 'Comunistas proclamam a República Popular da China', 2, paper='Jornal de Pequim',
     sub='Na Praça da Paz Celestial, Mao Tsé-tung anuncia o novo governo',
     wrong=['1911', '1927', '1937', '1945', '1959'], src=('pt', 'República Popular da China', ['1949']),
     x='Derrotados na guerra civil, Chiang Kai-shek e os nacionalistas transferiram seu governo para a ilha de Taiwan.')
c.O('Coloque estes marcos da história do Japão em ordem, do mais antigo ao mais recente?', [
    ('mongois', 'Invasões mongóis', 'As frotas de Kublai Khan', 1274, {'crest': 'imperio_mongol'}),
    ('sekigahara', 'Batalha de Sekigahara', 'Vitória de Tokugawa', 1600, {'face': 'tokugawa_ieyasu'}),
    ('meiji', 'Restauração Meiji', 'Fim do poder dos xoguns', 1868, {'face': 'meiji'}),
    ('hiroshima', 'Bomba atômica em Hiroshima', 'Fim da Segunda Guerra', 1945, {'flag': 'JPN'})], d=2,
    src=('en', 'History of Japan', ['Sekigahara']))
c.O('Coloque estes marcos da história da Índia em ordem, do mais antigo ao mais recente?', [
    ('ashoka', 'Ashoka governa o Império Máuria', 'Éditos gravados em pedra', -268, {'face': 'ashoka'}),
    ('vasco', 'Vasco da Gama chega a Calicute', 'A rota do Cabo', 1498, {'face': 'vasco_gama'}),
    ('mogol', 'Fundação do Império Mogol', 'Babur vence em Panipat', 1526, {'crest': 'mogol'}),
    ('independencia', 'Independência da Índia', 'Partilha com o Paquistão', 1947, {'face': 'gandhi'})], d=2,
    src=('en', 'History of India', ['Babur']))
c.MY('Marco Polo trouxe o macarrão da China para a Itália?', False, 2, who='marco_polo',
     src=('en', 'Pasta', ['Marco Polo']),
     x='A lenda ganhou força com uma revista americana da indústria de massas; em 1154, o geógrafo al-Idrisi já descrevia a fabricação de massa seca na Sicília.')
c.MY('A Grande Muralha da China é uma única muralha contínua, erguida de uma só vez?', False, 2, stad='muralha_china',
     src=('en', 'Great Wall of China', ['Ming']),
     x='É um conjunto de muralhas erguidas e refeitas por várias dinastias ao longo de uns 2 mil anos; os trechos mais visitados são da dinastia Ming.')
c.MY('Os antigos chineses usavam a pólvora só para fogos de artifício, e nunca na guerra?', False, 2, icon='cannon',
     src=('en', 'Gunpowder', ['Song dynasty']),
     x='Já no século X os chineses tinham lanças de fogo e, depois, bombas e foguetes; as primeiras armas de fogo da história surgiram na China.')
c.DU('Duelo: quem nasceu primeiro?', 'confucio', 'socrates', 2, icon='hourglass',
     src=('en', 'Confucius', ['551']),
     x='Confúcio nasceu por volta de 551 a.C.; Sócrates, cerca de 80 anos depois, em Atenas.')
c.DU('Duelo: quem viveu primeiro?', 'sidarta', 'ashoka', 2, icon='hourglass',
     src=('en', 'Ashoka', ['Buddhism']),
     x='Buda viveu por volta dos séculos VI e V a.C.; Ashoka reinou no século III a.C. e ajudou a espalhar o budismo pela Ásia.')

# ── d3 ──
c.T('Como eram chamados os samurais sem senhor, como os 47 da célebre história de vingança do Japão do século XVIII?', 'Ronins',
    ['Ninjas', 'Xoguns', 'Daimiôs', 'Ashigarus', 'Hatamotos'], d=3, crest='tokugawa',
    src=('en', 'Forty-seven rōnin', ['Kira']),
    x='Depois da vingança, o xogunato ordenou que se matassem pelo ritual do seppuku; seus túmulos, no templo Sengaku-ji, em Tóquio, ainda recebem visitantes.')
c.T('Em que ano o navio Kasato Maru trouxe ao porto de Santos a primeira leva oficial de imigrantes japoneses?', '1908',
    ['1888', '1898', '1918', '1924', '1934'], d=3, flag='JPN',
    src=('pt', 'Imigração japonesa no Brasil', ['Kasato Maru']),
    x='Vieram 781 imigrantes para trabalhar nos cafezais; hoje o Brasil tem a maior comunidade de origem japonesa fora do Japão.')
c.T('Qual cidade da Índia foi conquistada por Afonso de Albuquerque em 1510 e virou a capital do Estado Português da Índia?', 'Goa',
    ['Calicute', 'Cochim', 'Diu', 'Bombaim', 'Malaca'], d=3, who='vasco_gama',
    src=('pt', 'Afonso de Albuquerque', ['Goa']),
    x='Goa continuou portuguesa por mais de 450 anos, até ser ocupada pela Índia em 1961.')
c.T('Como se chama o alfabeto coreano criado no século XV pelo rei Sejong, o Grande?', 'Hangul',
    ['Kanji', 'Hiragana', 'Katakana', 'Pinyin', 'Devanágari'], d=3, icon='book',
    src=('en', 'Hangul', ['Sejong']),
    x='Antes dele, os coreanos escreviam com caracteres chineses, que poucos dominavam; o rei queria uma escrita que qualquer pessoa aprendesse.')
c.C('Qual império, fundado por Chandragupta por volta de 322 a.C., foi o primeiro a unir quase todo o subcontinente indiano?', 'maurya', d=3, who='alexandre',
    src=('en', 'Maurya Empire', ['Chandragupta']),
    x='Chandragupta teve como conselheiro o sábio Kautilya, a quem se atribui o Arthashastra, um manual sobre a arte de governar.')
c.C('Qual governo expulsou os portugueses do Japão, em 1639, e fechou o país quase por completo aos estrangeiros?', 'tokugawa', d=3, crest='imperio_portugues',
    src=('en', 'Sakoku', ['Portuguese']),
    x='Entre os europeus, só os holandeses puderam continuar negociando, confinados na ilhota artificial de Dejima, em Nagasaki.')
c.P('Qual governante mongol mandou duas grandes frotas invadir o Japão, em 1274 e em 1281?', 'kublai', d=3, icon='ship',
    src=('en', 'Mongol invasions of Japan', ['Kublai']),
    x='As duas invasões fracassaram; na segunda, um tufão destruiu boa parte dos navios ancorados perto da costa de Kyushu.')
c.P('Qual conquistador turco-mongol invadiu a Índia e saqueou Délhi em 1398?', 'tamerlao', d=3, icon='sword',
    src=('en', 'Timur', ['Delhi']),
    x='Um de seus descendentes, Babur, voltaria à Índia mais de um século depois para fundar o Império Mogol, em 1526.')
c.Q('Quem sou eu?', 'ashoka', ['Fui neto do fundador de um grande império do norte da Índia.',
    'Conquistei o reino de Kalinga numa guerra que deixou cerca de cem mil mortos.',
    'Arrependido, adotei o budismo e passei a pregar a não violência.',
    'Mandei gravar meus éditos em rochas e colunas espalhadas pelo império.'], 3,
    src=('en', 'Ashoka', ['Kalinga']),
    x='O capitel com quatro leões de uma de suas colunas, achado em Sarnath, virou o emblema oficial da Índia.')
c.Q('Quem sou eu?', 'ho_chi_minh', ['Ainda jovem, deixei meu país trabalhando como ajudante de cozinha num navio francês.',
    'Vivi em Paris e em Moscou e ajudei a fundar partidos comunistas.',
    'Em 1945, em Hanói, li uma declaração de independência que citava a dos Estados Unidos.',
    'Morri em 1969, e a antiga Saigon passou a levar o meu nome.'], 3,
    src=('en', 'Ho Chi Minh', ['Saigon']),
    x='Ele pediu para ser cremado, mas seu corpo foi embalsamado e está exposto até hoje num mausoléu em Hanói.')
c.QT('Ao soar da meia-noite, enquanto o mundo dorme, a Índia despertará para a vida e a liberdade.', 'Jawaharlal Nehru', 3, typ='txt',
     wrong=['Mahatma Gandhi', 'Muhammad Ali Jinnah', 'Indira Gandhi', 'Lorde Mountbatten', 'Subhas Chandra Bose'],
     ctx='Discurso na Assembleia Constituinte, em Nova Délhi, na noite de 14 para 15 de agosto de 1947',
     src=('en', 'Tryst with Destiny', ['midnight']),
     x='Gandhi não estava em Délhi naquela noite: estava em Calcutá, tentando conter a violência entre hindus e muçulmanos.')
c.LN('Qual dinastia falta nesta sequência?', 'Yuan', 'Grandes dinastias da China · 618–1912', ['Tang', 'Song', '?', 'Ming', 'Qing'], d=3,
     era='med', typ='txt', wrong=['Han', 'Qin', 'Sui', 'Zhou', 'Shang'],
     src=('en', 'Yuan dynasty', ['Kublai']),
     x='Fundada pelo mongol Kublai Khan, neto de Gengis Khan, foi a primeira dinastia estrangeira a governar toda a China.')
c.LN('Quem completa os três grandes unificadores do Japão?', 'tokugawa_ieyasu', 'Os unificadores do Japão · 1568–1603',
     ['Oda Nobunaga', 'Toyotomi Hideyoshi', '?'], d=3, era='mod',
     src=('en', 'Tokugawa Ieyasu', ['Hideyoshi']),
     x='Venceu a batalha de Sekigahara, em 1600, e três anos depois recebeu do imperador o título de xogum.')
c.BT('Quem derrotou o nababo de Bengala e seus aliados franceses nesta batalha?', 'Companhia Britânica das Índias Orientais', 'Plassey · 1757',
     '?', 'Nababo de Bengala', d=3, typ='txt',
     wrong=['Companhia Holandesa das Índias Orientais', 'Companhia Francesa das Índias Orientais', 'Império Mogol', 'Império Português', 'Império Maratha'],
     x='Robert Clive venceu com um exército bem menor, depois de comprar a traição de Mir Jafar, comandante das tropas do nababo.',
     src=('en', 'Battle of Plassey', ['Mir Jafar']))
c.BT('Qual império teve sua frota destruída pelo Japão nesta batalha naval?', 'imperio_russo', 'Tsushima · 1905', 'imperio_japones', '?', d=3,
     x='A frota derrotada navegou cerca de 30 mil km, do mar Báltico ao Extremo Oriente, para ser aniquilada em dois dias.',
     src=('en', 'Battle of Tsushima', ['Baltic']))
c.NW('Em que ano saiu esta manchete?', '1974', 'Camponeses acham exército de barro enterrado na China', 3, paper='Gazeta do Oriente',
     sub='Guerreiros em tamanho natural guardavam o túmulo do primeiro imperador, perto de Xi\'an',
     wrong=['1922', '1949', '1962', '1981', '1989'], src=('en', 'Terracotta Army', ['1974']),
     x='Os camponeses cavavam um poço quando acharam os primeiros fragmentos; estima-se que haja mais de 8 mil soldados.')
c.MY('Gandhi ganhou o Prêmio Nobel da Paz?', False, 3, who='gandhi',
     src=('en', 'Mahatma Gandhi', ['Nobel']),
     x='Foi indicado cinco vezes, a última em 1948; naquele ano, depois do assassinato dele, o comitê preferiu não dar o prêmio a ninguém.')
c.O('Coloque estas dinastias chinesas em ordem, da mais antiga à mais recente?', [
    ('qin', 'Dinastia Qin', 'O primeiro imperador', -221, {'crest': 'dinastia_qin'}),
    ('han', 'Dinastia Han', 'O papel e a Rota da Seda', -206, {'crest': 'han'}),
    ('tang', 'Dinastia Tang', "Capital em Chang'an", 618, {'crest': 'tang'}),
    ('ming', 'Dinastia Ming', 'A Cidade Proibida', 1368, {'crest': 'ming'}),
    ('qing', 'Dinastia Qing', 'Os últimos imperadores', 1644, {'crest': 'qing'})], d=3,
    src=('en', 'Dynasties of China', ['Tang']))

# ── d4 ──
c.T('Qual cidade, erguida nas estepes no tempo de Gengis Khan e de seu filho Ögedei, foi a capital do Império Mongol?', 'Karakorum',
    ['Samarcanda', 'Ulan Bator', 'Bucara', 'Sarai', 'Tabriz'], d=4, flag='MNG',
    src=('en', 'Karakorum', ['Ögedei']),
    x='O frade flamengo Guilherme de Rubruck viu ali uma árvore de prata que servia bebidas por bicas, obra de um ourives parisiense.')
c.T('Qual imperador Ming transferiu a capital para Pequim e mandou erguer a Cidade Proibida?', 'Yongle',
    ['Hongwu', 'Kangxi', 'Qianlong', 'Wanli', 'Jiajing'], d=4, stad='cidade_proibida',
    src=('en', 'Yongle Emperor', ['Forbidden City']),
    x='Foi também ele quem enviou o almirante Zheng He nas grandes viagens pelo oceano Índico.')
c.T('Qual império do norte da Índia, entre os séculos IV e VI, é lembrado como a "idade de ouro" da cultura clássica indiana?', 'Império Gupta',
    ['Império Máuria', 'Império Mogol', 'Império Kushan', 'Império Maratha', 'Império Sikh'], d=4, flag='IND',
    src=('en', 'Gupta Empire', ['golden age']),
    x='Na época, o astrônomo Aryabhata calculou pi com quatro casas decimais e defendeu que a Terra gira em torno do próprio eixo.')
c.T('Em que material foram gravados os textos chineses mais antigos que se conhecem, da dinastia Shang?', 'Ossos e cascos de tartaruga',
    ['Tabuletas de argila', 'Folhas de palmeira', 'Rolos de seda', 'Tiras de bambu', 'Pergaminho'], d=4, flag='CHN',
    src=('en', 'Oracle bone', ['Shang']),
    x='Os adivinhos aqueciam os ossos até rachar e liam nas rachaduras a resposta dos ancestrais; depois gravavam ao lado a pergunta e o resultado.')
c.C('Em qual dinastia chinesa viveram Li Bai e Du Fu, considerados os maiores poetas clássicos da China?', 'tang', d=4, icon='quill',
    src=('en', 'Tang dynasty', ['Li Bai']),
    x='A antologia "Trezentos Poemas Tang", reunida no século XVIII, até hoje é decorada por estudantes chineses.')
c.QT('Eis um mantra, bem curto, que lhes dou: "fazer ou morrer".', 'gandhi', 4,
     ctx='Discurso que lançou o movimento "Deixem a Índia", em Bombaim, agosto de 1942',
     src=('en', 'Quit India Movement', ['Do or Die']),
     x='No dia seguinte, o orador e quase toda a direção do Partido do Congresso foram presos pelos britânicos.')
c.QT('Não importa se o gato é preto ou branco: se pega ratos, é um bom gato.', 'Deng Xiaoping', 4, typ='txt',
     wrong=['Mao Tsé-tung', 'Zhou Enlai', 'Sun Yat-sen', 'Chiang Kai-shek', 'Liu Shaoqi'],
     ctx='Ditado do interior da China, adaptado num discurso de 1962; anos depois, virou o lema das reformas de mercado',
     src=('en', 'Deng Xiaoping', ['cat']),
     x='O dirigente foi afastado duas vezes do poder durante a era Mao, mas voltou e, a partir de 1978, abriu a economia chinesa ao mercado.')
c.LN('Qual imperador mogol falta nesta linhagem?', 'Akbar', 'Imperadores mogóis · 1526–1658', ['Babur', 'Humayun', '?', 'Jahangir', 'Shah Jahan'], d=4,
     era='mod', typ='txt', wrong=['Aurangzeb', 'Bahadur Shah Zafar', 'Tipu Sultan', 'Ranjit Singh', 'Shah Abbas'],
     src=('en', 'Akbar', ['Humayun']),
     x='Akbar, que segundo os relatos nunca aprendeu a ler, reunia na corte sábios de várias religiões para debater.')
c.BT('Qual dinastia chinesa foi derrotada pelos árabes nesta batalha, na Ásia Central?', 'tang', 'Talas · 751', 'califado_abassida', '?', d=4,
     x='Segundo a tradição, prisioneiros chineses levados a Samarcanda ensinaram aos árabes a fabricar papel.',
     src=('en', 'Battle of Talas', ['Abbasid']))
c.BT('Qual país invasor perdeu esta batalha naval para o almirante coreano Yi Sun-sin?', 'Japão', 'Ilha Hansan · 1592', 'Coreia (Joseon)', '?', d=4,
     typ='txt', wrong=['China', 'Mongólia', 'Rússia', 'Portugal', 'Holanda'],
     x='O almirante usava os "navios-tartaruga", cobertos por um teto cravejado de pontas de ferro contra a abordagem.',
     src=('en', 'Battle of Hansan Island', ['Yi Sun-sin']))
c.NW('Em que ano saiu esta manchete?', '1900', 'Rebeldes cercam as legações estrangeiras em Pequim', 4, paper='Correio do Oriente',
     sub='Diplomatas resistem há semanas; tropas de oito nações marcham sobre a capital chinesa',
     wrong=['1842', '1860', '1895', '1911', '1927'], src=('en', 'Boxer Rebellion', ['Eight-Nation Alliance']),
     x='Os ocidentais chamavam os rebeldes de "boxers" porque praticavam artes marciais, que julgavam capazes de torná-los imunes às balas.')
c.MY('Puyi, o último imperador da China, passou seus últimos anos como cidadão comum e chegou a trabalhar num jardim botânico?', True, 4, crest='qing',
     src=('en', 'Puyi', ['Botanical']),
     x='Depois de quase dez anos preso num centro de reeducação, foi libertado em 1959 e trabalhou no jardim botânico de Pequim; morreu em 1967.')

# ── d5 ──
c.T('Qual artesão chinês do século XI inventou os tipos móveis de argila, cerca de 400 anos antes de Gutenberg?', 'Bi Sheng',
    ['Cai Lun', 'Zhang Heng', 'Shen Kuo', 'Su Song', 'Zu Chongzhi'], d=5, who='gutenberg',
    src=('en', 'Bi Sheng', ['movable type']),
    x='O que se sabe dele vem do erudito Shen Kuo, que descreveu o método em 1088, num livro de ensaios.')
c.T('Qual rei khmer mandou construir Angkor Wat, no início do século XII?', 'Suryavarman II',
    ['Jayavarman VII', 'Jayavarman II', 'Yasovarman I', 'Indravarman I', 'Rajendravarman II'], d=5, stad='angkor_wat',
    src=('en', 'Angkor Wat', ['Suryavarman II']),
    x='O templo foi dedicado ao deus hindu Vishnu e só mais tarde se tornou budista; sua silhueta está na bandeira do Camboja.')
c.BT('Qual senhor da guerra do norte foi derrotado nesta batalha pelas forças de Liu Bei e Sun Quan?', 'Cao Cao', 'Penhascos Vermelhos · 208',
     'Liu Bei e Sun Quan', '?', d=5, typ='txt', wrong=['Dong Zhuo', 'Yuan Shao', 'Zhuge Liang', 'Lü Bu', 'Sima Yi'],
     x='A batalha impediu a reunificação da China e abriu caminho para a era dos Três Reinos, tema de um dos grandes romances chineses.',
     src=('en', 'Battle of Red Cliffs', ['Cao Cao']))
c.NW('Em que ano saiu esta manchete?', '1857', 'Cipaios se revoltam em Meerut e marcham sobre Délhi', 5, paper='Gazeta de Calcutá',
     sub='Soldados indianos da Companhia se rebelam contra os oficiais britânicos',
     wrong=['1757', '1799', '1818', '1876', '1905'], src=('en', 'Indian Rebellion of 1857', ['Meerut']),
     x='Esmagada a revolta, a Coroa britânica tirou o governo da Índia das mãos da Companhia das Índias Orientais, em 1858.')
c.QT('Possuímos todas as coisas. Não damos valor a objetos estranhos ou engenhosos e não precisamos dos produtos do seu país.', 'Imperador Qianlong', 5,
     typ='txt', wrong=['Imperador Kangxi', 'Imperatriz Cixi', 'Imperador Yongle', 'Imperador Puyi', 'Imperador Guangxu'],
     ctx='Carta ao rei Jorge III, depois da visita de uma embaixada britânica à China, 1793', kind='carta',
     src=('en', 'Macartney Embassy', ['Qianlong']),
     x='A embaixada de lorde Macartney queria abrir portos ao comércio e instalar um embaixador em Pequim; voltou sem conseguir nada.')

c.write()
