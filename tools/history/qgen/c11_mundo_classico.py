"""Grécia e Roma: pólis, legiões e imperadores — all formats in one pack."""
from qdsl import Cat

c = Cat('mundo_classico', 'Grécia e Roma', '🏛️', 'Pólis, legiões e imperadores', '#7B1E3A', order=51)

# ── Texto: seis alternativas ──
c.T('Qual herói grego da Guerra de Troia só podia ser ferido no calcanhar?', 'Aquiles',
    ['Heitor', 'Ulisses', 'Agamenon', 'Pátroclo', 'Ájax'], d=1, who='homero',
    src=('pt', 'Aquiles', ['calcanhar']),
    x='A Ilíada termina antes da morte do herói; a história do banho no rio Estige, que o deixou invulnerável exceto no calcanhar, é bem posterior a Homero.')
c.T('Qual criatura mitológica, metade homem e metade touro, vivia no Labirinto de Creta?', 'Minotauro',
    ['Centauro', 'Ciclope', 'Sátiro', 'Quimera', 'Medusa'], d=1, flag='GRC',
    src=('pt', 'Minotauro', ['Creta']),
    x='Na lenda, o labirinto foi construído por Dédalo para o rei Minos, cujo nome batizou a civilização minoica.')
c.T('Segundo a lenda, que estratagema permitiu aos gregos entrar em Troia?', 'Um cavalo de madeira',
    ['Um túnel sob as muralhas', 'Uma torre de cerco', 'Uma ponte de barcos', 'Escadas de corda', 'Um aríete de bronze'], d=1, flag='TUR',
    src=('pt', 'Cavalo de Troia', ['Troia']),
    x='As ruínas de Troia ficam na colina de Hisarlik, na atual Turquia, escavada pelo alemão Heinrich Schliemann no século XIX.')
c.T('Como se chamava, na Roma antiga, a camada de cidadãos comuns que lutou por direitos contra os patrícios?', 'Plebeus',
    ['Escravos', 'Libertos', 'Clientes', 'Equestres', 'Senadores'], d=1, crest='republica_romana',
    src=('en', 'Conflict of the Orders', ['plebeians']),
    x='Na primeira secessão da plebe, em 494 a.C., eles conquistaram tribunos próprios; em 367 a.C., ganharam o direito de chegar ao consulado.')
c.T('Como se chamavam os grandes banhos públicos dos romanos, com piscinas quentes e frias?', 'Termas',
    ['Fóruns', 'Basílicas', 'Ínsulas', 'Aquedutos', 'Átrios'], d=1, icon='column',
    src=('en', 'Thermae', ['Caracalla']),
    x='As Termas de Caracala, em Roma, recebiam cerca de 1.600 banhistas ao mesmo tempo.')
c.T('Que prêmio recebia o vencedor nos Jogos Olímpicos da Antiguidade?', 'Uma coroa de ramos de oliveira',
    ['Uma medalha de ouro', 'Uma coroa de louros', 'Uma taça de prata', 'Um escudo de bronze', 'Um saco de moedas'], d=2, icon='trophy',
    src=('en', 'Ancient Olympic Games', ['olive']),
    x='Os ramos vinham de uma oliveira sagrada de Olímpia; em casa, porém, os campeões podiam ganhar banquetes e honras para a vida toda.')
c.T('Que nó, segundo a lenda, Alexandre, o Grande, cortou com a espada em vez de desatar?', 'O nó górdio',
    ['O nó de Hércules', 'O nó de Troia', 'O nó de Delfos', 'O nó persa', 'O nó de Creta'], d=2, icon='sword',
    src=('pt', 'Nó górdio', ['Frígia']),
    x='Um oráculo dizia que quem desatasse o nó, em Górdio, na Frígia, dominaria a Ásia.')
c.T('O que significava a sigla SPQR, gravada em monumentos e estandartes de Roma?', 'O Senado e o Povo Romano',
    ['A Sagrada Pátria de Quirino e Rômulo', 'O Senado e os Pretores de Roma', 'Salve a Paz e a Rainha Roma',
     'Os Soldados e o Povo de Roma', 'O Sumo Pontífice e a República'], d=2, stad='forum_romano',
    src=('en', 'SPQR', ['Senatus Populusque Romanus']),
    x='A abreviação de Senatus Populusque Romanus ainda aparece nas tampas de bueiro e em prédios públicos de Roma.')
c.T('Como se chamava a votação ateniense que podia mandar um cidadão para o exílio por dez anos?', 'Ostracismo',
    ['Plebiscito', 'Anátema', 'Proscrição', 'Decimação', 'Excomunhão'], d=3, crest='atenas',
    src=('en', 'Ostracism', ['ten years']),
    x='Os eleitores escreviam o nome do escolhido em cacos de cerâmica, os óstracos, que deram nome à votação.')
c.T('Qual imperador, conquistador da Dácia, levou o Império Romano à sua maior extensão?', 'Trajano',
    ['Adriano', 'Augusto', 'Nero', 'Diocleciano', 'Vespasiano'], d=3, icon='map',
    src=('pt', 'Trajano', ['Dácia']),
    x='A Coluna de Trajano, em Roma, conta essa guerra num friso em espiral de cerca de 200 metros.')
c.T('Qual filósofo grego, segundo a tradição, morava num grande jarro de barro e desprezava todo luxo?', 'Diógenes',
    ['Epicuro', 'Zenão de Cítio', 'Heráclito', 'Tales de Mileto', 'Demócrito'], d=3, who='alexandre',
    src=('pt', 'Diógenes de Sinope', ['Alexandre']),
    x='Conta-se que, quando Alexandre lhe ofereceu o que quisesse, ele pediu só que o rei saísse da frente do seu sol.')
c.T('Segundo a tradição cristã, qual apóstolo foi crucificado de cabeça para baixo em Roma, no tempo de Nero?', 'Pedro',
    ['Paulo', 'André', 'Tiago', 'João', 'Tomé'], d=3, who='nero',
    src=('en', 'Saint Peter', ['upside down']),
    x='A Basílica de São Pedro, no Vaticano, foi erguida sobre o lugar onde a tradição situa o seu túmulo.')
c.T('Qual povo germânico, liderado por Alarico, saqueou Roma em 410?', 'Visigodos',
    ['Vândalos', 'Hunos', 'Ostrogodos', 'Francos', 'Lombardos'], d=3, crest='imperio_romano',
    src=('en', 'Sack of Rome (410)', ['Alaric']),
    x='Era a primeira vez em cerca de 800 anos que a cidade caía nas mãos de um inimigo; Santo Agostinho escreveu A Cidade de Deus em resposta.')
c.T('Qual naturalista romano morreu em 79 d.C. ao levar navios para perto do Vesúvio em erupção?', 'Plínio, o Velho',
    ['Plínio, o Jovem', 'Sêneca', 'Tácito', 'Suetônio', 'Tito Lívio'], d=4, stad='pompeia',
    src=('pt', 'Plínio, o Velho', ['Vesúvio']),
    x='Seu sobrinho assistiu a tudo do outro lado da baía e descreveu a erupção em duas cartas ao historiador Tácito.')
c.T('Qual líder ateniense promoveu, por volta de 508 a.C., as reformas consideradas o nascimento da democracia?', 'Clístenes',
    ['Péricles', 'Sólon', 'Drácon', 'Pisístrato', 'Licurgo'], d=4, crest='atenas',
    src=('en', 'Cleisthenes', ['508']),
    x='Ele reorganizou os cidadãos em dez tribos novas, misturando gente da cidade, do litoral e do interior.')
c.T('Qual reino helenístico, fundado por um general de Alexandre, dominou a Síria, a Mesopotâmia e o Irã?', 'Império Selêucida',
    ['Reino Ptolomaico', 'Reino Antigônida', 'Reino de Pérgamo', 'Reino Greco-Báctrio', 'Reino do Ponto'], d=4, crest='macedonia',
    src=('pt', 'Império Selêucida', ['Seleuco']),
    x='Seu fundador, Seleuco I, ergueu Antioquia, que se tornaria uma das maiores cidades do mundo romano.')
c.T('Qual escrita micênica, decifrada por Michael Ventris em 1952, revelou ser uma forma antiga de grego?', 'Linear B',
    ['Linear A', 'Cuneiforme', 'Hieróglifos cretenses', 'Alfabeto fenício', 'Escrita do Indo'], d=5, icon='scroll',
    src=('pt', 'Linear B', ['Ventris']),
    x='A Linear A, usada antes pelos minoicos em Creta, continua sem decifração.')
c.T('Qual invenção, uma ponte de abordagem com um gancho, ajudou Roma a vencer Cartago no mar na Primeira Guerra Púnica?', 'O corvo',
    ['O aríete', 'A balista', 'O onagro', 'A tartaruga', 'O escorpião'], d=5, crest='cartago',
    src=('en', 'Corvus (boarding device)', ['First Punic War']),
    x='A ponte cravava-se no convés inimigo e transformava a batalha naval numa luta de infantaria, em que os romanos eram mais fortes.')
c.T('Em qual rio da Índia o exército de Alexandre se recusou a seguir adiante, em 326 a.C.?', 'Hífase',
    ['Ganges', 'Indo', 'Eufrates', 'Oxus', 'Tigre'], d=5, icon='map',
    src=('en', 'Beas River', ['Alexander']),
    x='Depois de oito anos de marcha desde a Macedônia, os soldados queriam voltar para casa; Alexandre cedeu e deu meia-volta.')

# ── Personagens e estados ──
c.P('Qual governante romano deu nome ao mês de agosto?', 'augusto', d=1, who='cesar',
    src=('pt', 'Agosto', ['Augusto']),
    x='O Senado rebatizou o antigo mês Sextilis em 8 a.C.; julho, antes Quintilis, já homenageava Júlio César, seu pai adotivo.')
c.P('Qual imperador reconstruiu o Panteão de Roma, mas manteve na fachada o nome de Agripa, o construtor original?', 'adriano', d=3, stad='panteao',
    src=('en', 'Pantheon, Rome', ['Hadrian']),
    x='A cúpula tem no alto um óculo de cerca de 9 metros aberto para o céu; quando chove, a água escoa por furos no piso.')
c.P('Qual poeta latino guia Dante pelo Inferno e pelo Purgatório na Divina Comédia?', 'virgilio', d=3, who='dante',
    src=('pt', 'Divina Comédia', ['Virgílio']),
    x='Dante o chama de “meu mestre”: a obra mais famosa desse poeta narra a viagem de Eneias de Troia até a Itália.')
c.P('Qual pensador grego fundou em Crotona uma comunidade cujos membros, dizem, não podiam comer favas?', 'pitagoras', d=4, icon='book',
    src=('en', 'Pythagoras', ['beans']),
    x='Seus seguidores acreditavam na transmigração das almas e viam nos números a chave para entender o universo.')
c.P('De qual imperador é a estátua equestre de bronze do Capitólio que escapou da destruição por ser confundida com Constantino?', 'marco_aurelio', d=4, icon='crown',
    src=('en', 'Equestrian Statue of Marcus Aurelius', ['Constantine']),
    x='Na Idade Média muitas estátuas pagãs foram derretidas; esta sobreviveu porque julgavam retratar o primeiro imperador cristão.')

c.C('Qual pólis liderou a Liga de Delos e usou o tesouro da aliança para embelezar a própria cidade?', 'atenas', d=2, crest='persia',
    src=('pt', 'Liga de Delos', ['Atenas']),
    x='Em 454 a.C., o tesouro da liga saiu da ilha de Delos para a Acrópole, e parte dele ajudou a pagar o Partenon.')
c.C('Qual cidade, arrasada pelos romanos em 146 a.C. depois de um cerco de três anos, deu lugar à província romana da África?', 'cartago', d=2, crest='republica_romana',
    src=('pt', 'Cartago', ['146 a.C.']),
    x='No mesmo ano, Roma também destruiu Corinto, na Grécia: 146 a.C. selou o domínio romano sobre o Mediterrâneo.')
c.C('Qual cidade grega tinha sempre dois reis ao mesmo tempo, de duas famílias diferentes?', 'esparta', d=3, crest='atenas',
    src=('en', 'Sparta', ['Eurypontid']),
    x='Os reis vinham das casas dos Ágidas e dos Euripôntidas, e cinco éforos, eleitos a cada ano, fiscalizavam o seu poder.')
c.C('Qual reino tinha Pela como capital e um exército de falanges armadas com longas lanças, as sarissas?', 'macedonia', d=3, icon='sword',
    src=('en', 'Sarissa', ['Macedonian']),
    x='A sarissa podia passar de 5 metros de comprimento: as primeiras fileiras da falange formavam uma muralha de pontas.')

# ── Quem sou eu? ──
c.Q('Quem sou eu?', 'espartaco', ['Nasci na Trácia e, segundo alguns relatos, servi como auxiliar no exército romano.',
    'Fui vendido como escravo e treinado numa escola de gladiadores em Cápua.',
    'Em 73 a.C., fugi com algumas dezenas de companheiros e reuni um exército de milhares.',
    'Fui derrotado pelas legiões de Crasso, e milhares de seguidores foram crucificados ao longo da Via Ápia.'], 2,
    src=('pt', 'Espártaco', ['Cápua']),
    x='A revolta durou de 73 a 71 a.C. e, quase dois mil anos depois, virou filme de Stanley Kubrick com Kirk Douglas, em 1960.')
c.Q('Quem sou eu?', 'anibal', ['Meu pai me fez jurar, ainda menino, ódio eterno a Roma.',
    'Parti da Hispânia e atravessei os Pireneus e os Alpes com meu exército.',
    'Venci os romanos no lago Trasimeno e, em Canas, cerquei um exército inteiro.',
    'Derrotado em Zama, acabei no exílio e tomei veneno para não ser entregue aos romanos.'], 2,
    src=('pt', 'Aníbal', ['Trasimeno']),
    x='Por cerca de 15 anos ele percorreu a Itália sem perder uma grande batalha, mas nunca pôs cerco à própria Roma.')
c.Q('Quem sou eu?', 'constantino', ['Meu pai era um dos quatro governantes do Império, e as tropas me aclamaram na Britânia.',
    'Antes de uma batalha decisiva junto a uma ponte, teria visto um sinal no céu.',
    'Convoquei o primeiro concílio geral da Igreja, em Niceia, no ano 325.',
    'Refundei uma antiga cidade grega no Bósforo e dei a ela o meu nome.'], 3,
    src=('en', 'Constantine the Great', ['Nicaea']),
    x='Ele só foi batizado no leito de morte, em 337; a cidade que fundou foi capital imperial por quase 1.600 anos.')

# ── Linha do tempo ──
c.O('Coloque em ordem as fases de Roma, da mais antiga à mais recente?', [
    ('fund', 'Fundação de Roma', 'Segundo a lenda, por Rômulo', -753, {'flag': 'ITA'}),
    ('rep', 'Início da República', 'O último rei é expulso', -509, {'crest': 'republica_romana'}),
    ('imp', 'Augusto, primeiro imperador', 'Começa o Império', -27, {'face': 'augusto'}),
    ('queda', 'Queda do Império do Ocidente', 'O último imperador é deposto', 476, {'crest': 'imperio_romano'})],
    d=1, src=('pt', 'Roma Antiga', ['753 a.C.']))
c.O('Ordene estes marcos da Grécia clássica, do mais antigo ao mais recente?', [
    ('marat', 'Batalha de Maratona', 'Atenienses contra persas', -490, {'crest': 'persia'}),
    ('pelop', 'Início da Guerra do Peloponeso', 'Atenas contra Esparta', -431, {'crest': 'esparta'}),
    ('socr', 'Morte de Sócrates', 'Condenado a beber cicuta', -399, {'face': 'socrates'}),
    ('alex', 'Morte de Alexandre', 'Fim de um império relâmpago', -323, {'face': 'alexandre'})],
    d=3, src=('pt', 'Grécia Antiga', ['Peloponeso']))
c.O('Ponha em ordem estes fatos da República Romana, do mais antigo ao mais recente?', [
    ('rei', 'Expulsão do último rei', 'Nasce a República', -509, {'crest': 'republica_romana'}),
    ('pun1', 'Começa a Primeira Guerra Púnica', 'A disputa pela Sicília', -264, {'crest': 'cartago'}),
    ('cart', 'Destruição de Cartago', 'Fim da Terceira Guerra Púnica', -146, {'flag': 'TUN'}),
    ('espart', 'Revolta de Espártaco', 'Escravos em armas contra Roma', -73, {'face': 'espartaco'}),
    ('cesar', 'Assassinato de Júlio César', 'Os Idos de Março', -44, {'face': 'cesar'})],
    d=4, src=('pt', 'República Romana', ['509 a.C.']))

# ── Quem disse? ──
c.QT('Até tu, Brutus?', 'cesar', 1, ctx='Últimas palavras atribuídas a ele nos Idos de Março, 44 a.C.; a forma famosa vem de Shakespeare',
     src=('en', 'Et tu, Brute?', ['Suetonius']),
     x='Suetônio conta que César morreu sem dizer nada, mas que, segundo alguns, disse a Bruto em grego “kai sy, teknon?” (“também tu, filho?”).')
c.QT('O homem é, por natureza, um animal político.', 'aristoteles', 2, ctx='Livro I da Política, século IV a.C.',
     src=('en', 'Politics (Aristotle)', ['political animal']),
     x='Para o filósofo, quem vive fora da pólis, a cidade-Estado, ou é um animal selvagem ou é um deus.')
c.QT('Encontrei Roma uma cidade de tijolos e deixei-a uma cidade de mármore.', 'augusto', 2,
     ctx='Frase atribuída ao governante pelo biógrafo Suetônio, sobre as obras do seu reinado',
     src=('en', 'Augustus', ['Suetonius']),
     x='Do seu tempo são o Altar da Paz (Ara Pacis), o Fórum de Augusto e o primeiro Panteão, erguido por Agripa.')
c.QT('Aproveita o dia e confia o mínimo possível no amanhã.', 'Horácio', 3, t='Quem escreveu este verso?', typ='txt',
     wrong=['Virgílio', 'Ovídio', 'Catulo', 'Juvenal', 'Lucrécio'], ctx='Ode em latim, por volta de 23 a.C. — o famoso “carpe diem”',
     src=('pt', 'Carpe diem', ['Horácio']),
     x='O verso fala de colher o dia como se colhe um fruto maduro: “carpe” vem do verbo latino que significa colher.')
c.QT('Venham buscá-las!', 'leonidas', 3, ctx='Resposta atribuída a ele por Plutarco, quando o rei persa exigiu que os gregos entregassem as armas, 480 a.C.',
     src=('en', 'Molon labe', ['Leonidas']),
     x='Em grego, “molon labe”: a frase está gravada no monumento ao rei espartano erguido nas Termópilas em 1955.')
c.QT('Cartago deve ser destruída.', 'Catão, o Velho', 3, typ='txt',
     wrong=['Cícero', 'Cipião Africano', 'Sêneca', 'Júlio César', 'Pompeu'],
     ctx='Frase com que, segundo a tradição, um senador romano encerrava seus discursos nos anos anteriores à Terceira Guerra Púnica',
     src=('en', 'Carthago delenda est', ['Cato']),
     x='Ele repetia a frase até em debates sobre outros assuntos; Cartago foi arrasada em 146 a.C., três anos depois da morte dele.')
c.QT('Se queres a paz, prepara a guerra.', 'Vegécio', 5, t='De qual autor romano vem esta máxima?', typ='txt',
     wrong=['Suetônio', 'Tácito', 'Sêneca', 'Tito Lívio', 'Plínio, o Velho'],
     ctx='Adaptação de uma frase de um tratado militar romano tardio; em latim, “si vis pacem, para bellum”',
     src=('en', 'Si vis pacem, para bellum', ['Vegetius']),
     x='O tratado, o Epitoma rei militaris, foi um dos manuais militares mais copiados e lidos da Idade Média.')

# ── Batalhas ──
c.BT('Qual cidade grega venceu os persas nesta batalha, com a ajuda de Plateias?', 'atenas', 'Maratona · 490 a.C.', '?', 'persia', d=1,
     x='A lenda do mensageiro que correu até Atenas para anunciar a vitória inspirou a prova da maratona dos Jogos Olímpicos modernos.',
     src=('pt', 'Batalha de Maratona', ['Dario']))
c.BT('Quem sofreu nesta batalha uma das piores derrotas de sua história, cercado pelas tropas de Aníbal?', 'republica_romana', 'Canas · 216 a.C.', 'cartago', '?', d=2,
     x='Aníbal recuou o centro e fechou as alas sobre um exército maior: a manobra ainda é estudada nas academias militares.',
     src=('pt', 'Batalha de Canas', ['Aníbal']))
c.BT('Qual povo, unido por Vercingetórix, foi derrotado por César neste cerco?', 'Gauleses', 'Alésia · 52 a.C.', 'republica_romana', '?', d=2, typ='txt',
     wrong=['Germanos', 'Britanos', 'Iberos', 'Partos', 'Dácios'],
     x='César cercou Alésia com duas linhas de muralhas: uma contra os sitiados e outra contra o exército que vinha socorrê-los.',
     src=('pt', 'Batalha de Alésia', ['Vercingetórix']))
c.BT('Quem venceu esta batalha naval e, quatro anos depois, tornou-se o primeiro imperador de Roma?', 'augusto', 'Áccio · 31 a.C.', '?', 'Marco Antônio e Cleópatra', d=2, typ='player',
     x='A frota vencedora era comandada por Agripa, amigo de juventude do vencedor e mais tarde seu genro.',
     src=('en', 'Battle of Actium', ['Agrippa']))
c.BT('Qual chefe germânico, que tinha servido ao exército romano, comandou esta emboscada?', 'Armínio', 'Floresta de Teutoburgo · 9 d.C.', '?', 'imperio_romano', d=4, typ='txt',
     wrong=['Vercingetórix', 'Alarico', 'Odoacro', 'Genserico', 'Maroboduo'],
     x='Três legiões foram aniquiladas; segundo Suetônio, Augusto gritava: “Varo, devolve-me as minhas legiões!”',
     src=('en', 'Battle of the Teutoburg Forest', ['Arminius']))
c.BT('Qual reino Roma derrotou nesta batalha, cujo último rei, Perseu, acabou levado preso para Roma?', 'macedonia', 'Pidna · 168 a.C.', 'republica_romana', '?', d=4,
     x='A falange, imbatível em terreno plano, se desfez no terreno irregular, e as legiões, mais flexíveis, entraram pelas brechas.',
     src=('en', 'Battle of Pydna', ['Perseus']))

# ── Linhagens ──
c.LN('Quem completa a lista dos “cinco bons imperadores”?', 'adriano', 'Os cinco bons imperadores · Roma, 96–180',
     ['Nerva', 'Trajano', '?', 'Antonino Pio', 'Marco Aurélio'], d=3, era='ant',
     src=('en', 'Five Good Emperors', ['Hadrian']),
     x='Os quatro primeiros não deixaram filho homem vivo e adotaram o sucessor; a regra acabou quando Marco Aurélio passou o trono ao filho, Cômodo.')
c.LN('Quem completava o Segundo Triunvirato?', 'Lépido', 'Segundo Triunvirato · Roma, 43 a.C.', ['Otaviano', 'Marco Antônio', '?'], d=3,
     kind='grupo', era='ant', typ='txt', wrong=['Crasso', 'Pompeu', 'Bruto', 'Agripa', 'Cássio'],
     src=('pt', 'Segundo Triunvirato', ['Lépido']),
     x='Afastado por Otaviano em 36 a.C., perdeu o poder político, mas manteve até a morte o cargo de pontífice máximo.')
c.LN('Quem reinou entre o pai e o irmão nesta dinastia?', 'Tito', 'Dinastia flaviana · Roma, 69–96', ['Vespasiano', '?', 'Domiciano'], d=4,
     era='ant', typ='txt', wrong=['Nerva', 'Galba', 'Otão', 'Vitélio', 'Trajano'],
     src=('en', 'Flavian dynasty', ['Titus']),
     x='Em pouco mais de dois anos de governo, viu a erupção do Vesúvio e inaugurou o Coliseu, no ano 80.')
c.LN('Quem completava a primeira Tetrarquia, ao lado destes três?', 'Constâncio Cloro', 'Primeira Tetrarquia · 293', ['Diocleciano', 'Maximiano', 'Galério', '?'], d=5,
     kind='grupo', era='ant', typ='txt', wrong=['Constantino', 'Maxêncio', 'Licínio', 'Severo', 'Aureliano'],
     src=('en', 'Tetrarchy', ['Constantius']),
     x='Era o pai de Constantino, que as tropas aclamaram imperador em Eboracum, atual York, quando o pai morreu ali, em 306.')

# ── Manchetes ──
c.NW('Em que ano saiu esta manchete?', '1896', 'Jogos Olímpicos renascem em Atenas', 2, paper='Gazeta de Atenas',
     sub='Grego vence a maratona sob a ovação do estádio Panatenaico',
     wrong=['1880', '1888', '1892', '1900', '1904'], src=('pt', 'Jogos Olímpicos de Verão de 1896', ['Louis']),
     x='O vencedor da maratona, Spyridon Louis, era um carregador de água de um vilarejo perto de Atenas.')
c.NW('Em que ano saiu esta manchete?', '1900', 'Arqueólogo inglês desenterra em Creta o palácio do rei Minos', 4, paper='The Daily Courier',
     sub='Escavações em Cnossos revelam afrescos e um enorme labirinto de salas',
     wrong=['1871', '1884', '1912', '1922', '1936'], src=('en', 'Knossos', ['1900']),
     x='Arthur Evans comprou o terreno e chamou de “minoica” a civilização que encontrou ali, em homenagem ao rei lendário.')
c.NW('Em que ano saiu esta manchete?', '1820', 'Camponês encontra estátua de Afrodite na ilha de Milos', 5, paper='Courrier de l’Égée',
     sub='A escultura de mármore, sem os braços, deve seguir para Paris como presente ao rei',
     wrong=['1798', '1806', '1815', '1830', '1848'], src=('en', 'Venus de Milo', ['1820']),
     x='Hoje no Louvre, a Vênus de Milo é do período helenístico, de cerca de 150 a 125 a.C.; ninguém sabe ao certo em que posição estavam os braços.')

# ── Duelos ──
c.DU('Duelo: quem viveu primeiro?', 'socrates', 'cesar', 1, icon='hourglass',
     src=('pt', 'Sócrates', ['399 a.C.']),
     x='Sócrates morreu em 399 a.C., quase três séculos antes do nascimento de Júlio César.')
c.DU('Duelo: quem nasceu primeiro?', 'pitagoras', 'platao', 2, icon='hourglass',
     src=('en', 'Pythagoras', ['570']),
     x='Pitágoras nasceu por volta de 570 a.C., mais de um século antes de Platão, que admirava suas ideias sobre a alma e os números.')
c.DU('Duelo: quem nasceu primeiro?', 'anibal', 'cipiao', 3, icon='sword',
     src=('en', 'Hannibal', ['247']),
     x='O cartaginês era cerca de onze anos mais velho que o romano que o derrotaria em Zama.')
c.DU('Duelo: quem morreu primeiro?', 'cesar', 'cicero', 4, icon='sword',
     src=('en', 'Cicero', ['43 BC']),
     x='Cícero foi executado em dezembro de 43 a.C., por ordem de Marco Antônio, cerca de 21 meses depois dos Idos de Março.')

# ── Fato ou mito? ──
c.MY('Júlio César foi o primeiro imperador de Roma?', False, 1, who='cesar',
     x='Ele foi ditador vitalício, mas nunca imperador: o primeiro foi seu filho adotivo, Otaviano Augusto, a partir de 27 a.C.',
     src=('pt', 'Júlio César', ['ditador']))
c.MY('Nero tocou violino enquanto Roma pegava fogo, em 64 d.C.?', False, 2, who='nero',
     x='O violino só surgiria no século XVI; segundo Tácito, Nero estava em Âncio quando o fogo começou e voltou para organizar abrigos para quem perdera a casa.',
     src=('en', 'Great Fire of Rome', ['Antium']))
c.MY('Os romanos tinham salas, os vomitórios, para vomitar nos banquetes e continuar comendo?', False, 2, stad='coliseu',
     x='Vomitorium era a passagem por onde o público “jorrava” para fora do anfiteatro; a sala para vomitar é invenção moderna.',
     src=('en', 'Vomitorium', ['amphitheatre']))
c.MY('Nos Jogos Olímpicos da Grécia Antiga, os atletas da maioria das provas competiam nus?', True, 2, icon='trophy',
     x='A palavra “ginásio” vem do grego gymnós, que significa “nu”.',
     src=('en', 'Ancient Olympic Games', ['nude']))
c.MY('Sócrates não deixou nenhum texto escrito?', True, 2, who='platao',
     x='O que sabemos de suas ideias vem sobretudo dos diálogos de Platão e dos escritos de Xenofonte, seus discípulos.',
     src=('pt', 'Sócrates', ['Xenofonte']))
c.MY('A cesariana tem esse nome porque Júlio César nasceu de um parto assim?', False, 2, icon='bust',
     x='Na época, a operação só era feita em mães mortas ou morrendo, e a mãe de César, Aurélia, viveu até ele passar dos 40 anos.',
     src=('en', 'Caesarean section', ['Caesar']))
c.MY('As estátuas e os templos da Grécia Antiga eram brancos, sem pintura?', False, 3, stad='partenon',
     x='Vestígios de pigmentos mostram que esculturas e frisos eram pintados com cores vivas; o branco “clássico” é obra do tempo.',
     src=('en', 'Ancient Greek sculpture', ['painted']))
c.MY('Na Roma antiga, o polegar para baixo era com certeza o sinal para matar o gladiador vencido?', False, 4, icon='sword',
     x='Os textos romanos falam só em “polegar virado” (pollice verso), sem dizer a direção; a imagem popular vem de um quadro de Gérôme, de 1872.',
     src=('en', 'Pollice Verso (Gérôme)', ['1872']))

c.write()
