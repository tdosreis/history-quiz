"""Antigo Oriente: Egito, Mesopotâmia, Pérsia, fenícios, hebreus e o Vale do Indo."""
from qdsl import Cat

c = Cat('antigo_oriente', 'Antigo Oriente', '🏺', 'Egito, Mesopotâmia, Pérsia e vizinhos', '#A0662A', order=50)

# ── d1 ──
c.T('Qual mar os navegadores fenícios dominaram com suas rotas de comércio?', 'Mediterrâneo',
    ['Mar Báltico', 'Mar do Norte', 'Mar Cáspio', 'Mar da China', 'Mar de Aral'], d=1, icon='ship',
    src=('en', 'Phoenicia', ['Mediterranean']),
    x='Fundaram colônias de Chipre à Espanha, como Cádis e Cartago, e espalharam seu alfabeto pelo Mediterrâneo.')
c.T('Qual animal doméstico representava a deusa egípcia Bastet?', 'Gato',
    ['Cachorro', 'Cavalo', 'Camelo', 'Porco', 'Coelho'], d=1, crest='egito_antigo',
    src=('en', 'Bastet', ['cat']),
    x='Em Bubástis, a cidade de Bastet, foram achados cemitérios com milhares de gatos mumificados, oferecidos à deusa.')
c.T('Segundo a Bíblia, qual jovem pastor venceu o gigante Golias e depois se tornou rei de Israel?', 'Davi',
    ['Saul', 'Salomão', 'Josué', 'Sansão', 'Gideão'], d=1, crest='israel_antigo',
    src=('en', 'David', ['Goliath']),
    x='Uma estela do século IX a.C., achada em Tel Dan, no norte de Israel, traz uma inscrição que a maioria dos estudiosos lê como "Casa de Davi".')
c.T('Segundo a Bíblia, que torre os homens tentaram erguer até o céu, antes de Deus confundir suas línguas?', 'Torre de Babel',
    ['Torre de Davi', 'Torre de Jericó', 'Torre de Nínive', 'Torre de Sião', 'Torre de Ur'], d=1, icon='castle',
    src=('en', 'Tower of Babel', ['Etemenanki']),
    x='Muitos historiadores ligam a história ao Etemenanki, um zigurate gigantesco dedicado ao deus Marduk na Babilônia.')
c.P('Qual rainha do Egito, segundo a tradição, se matou com a picada de uma áspide?', 'cleopatra', d=1, who='augusto',
    src=('en', 'Cleopatra', ['asp']),
    x='Ela morreu em 30 a.C., depois da derrota para Otaviano; naquele mesmo ano o Egito virou província romana.')
c.Q('Quem sou eu?', 'salomao', ['Recebi a visita de uma rainha vinda do reino de Sabá.',
    'Mandei construir o primeiro grande templo de Jerusalém.',
    'Meu pai foi um rei famoso, que na juventude venceu um gigante.',
    'Ficou célebre minha sentença: propor dividir um bebê ao meio para descobrir a verdadeira mãe.'], 1,
    src=('en', 'Solomon', ['Sheba']),
    x='Até hoje, "decisão salomônica" quer dizer uma solução sábia para um caso difícil.')
c.DU('Duelo: qual destas maravilhas do mundo antigo continua de pé?', 'Grande Pirâmide de Gizé', 'Jardins Suspensos da Babilônia', 1,
     typ='txt', icon='column', src=('en', 'Seven Wonders of the Ancient World', ['Giza']),
     x='É a mais antiga das sete maravilhas e a única que sobreviveu; a existência dos Jardins Suspensos nunca foi comprovada.')
c.DU('Duelo: quem reinou por mais tempo?', 'ramses_ii', 'tutancamon', 1, icon='crown',
     src=('en', 'Ramesses II', ['66']),
     x='Ramsés II reinou 66 anos; Tutancâmon, só cerca de nove, e morreu antes dos 20.')
c.DU('Duelo: qual destes povos escrevia com hieróglifos?', 'Egípcios', 'Sumérios', 1, typ='txt', icon='book',
     src=('en', 'Egyptian hieroglyphs', ['Egyptian']),
     x='Os sumérios escreviam em cuneiforme, com uma cunha sobre placas de argila mole.')
c.MY('As pirâmides de Gizé foram erguidas por multidões de escravos?', False, 1, stad='piramide_queops',
     src=('en', 'Great Pyramid of Giza', ['workers']),
     x='Escavações em Gizé acharam a vila e os túmulos dos operários: eram trabalhadores egípcios, não escravos, e recebiam rações de pão e cerveja.')
c.O('Em que ordem estes fatos aconteceram, do mais antigo ao mais recente?', [
    ('piramides', 'Pirâmides de Gizé', 'Antigo Império', -2560, {'crest': 'egito_antigo'}),
    ('cleopatra', 'Morte de Cleópatra', 'Fim do Egito ptolomaico', -30, {'face': 'cleopatra'}),
    ('tumba', 'Descoberta da tumba de Tutancâmon', 'Vale dos Reis', 1922, {'face': 'tutancamon'})], d=1,
    src=('pt', 'Tutancâmon', ['1922']))

# ── d2 ──
c.T('Qual deus egípcio, senhor do mundo dos mortos, era pintado como uma múmia de pele verde?', 'Osíris',
    ['Rá', 'Anúbis', 'Hórus', 'Seth', 'Amon'], d=2, icon='pyramid',
    src=('en', 'Osiris', ['green']),
    x='Segundo o mito, foi morto e despedaçado pelo irmão Seth; Ísis reuniu os pedaços e o trouxe de volta à vida.')
c.T('Qual inseto, que rola bolas de esterco, era sagrado no Egito e simbolizava o Sol nascente?', 'Escaravelho',
    ['Abelha', 'Louva-a-deus', 'Gafanhoto', 'Libélula', 'Formiga'], d=2, stad='karnak',
    src=('en', 'Khepri', ['scarab']),
    x='Os egípcios viam no besouro empurrando sua bola o deus Khepri rolando o disco solar pelo céu, a cada manhã.')
c.T('Qual rainha egípcia, esposa de Aquenáton, ficou célebre por um busto pintado guardado em Berlim?', 'Nefertiti',
    ['Nefertari', 'Hatexepsute', 'Cleópatra', 'Tiye', 'Ankhesenamon'], d=2, who='aquenaton',
    src=('en', 'Nefertiti Bust', ['Berlin']),
    x='O busto foi achado em 1912 em Amarna, na oficina do escultor Tutmés; um dos olhos nunca recebeu a pupila de cristal.')
c.T('Em que país atual ficam as ruínas da antiga Babilônia?', 'Iraque',
    ['Irã', 'Síria', 'Egito', 'Turquia', 'Arábia Saudita'], d=2, crest='babilonia',
    src=('pt', 'Babilônia', ['Iraque']),
    x='Os tijolos azuis do Portão de Ishtar foram levados para Berlim, onde o portão foi remontado no Museu Pergamon.')
c.T('Qual rei lendário de Uruk é o herói da mais antiga grande obra literária conhecida?', 'Gilgamesh',
    ['Enkidu', 'Marduk', 'Sargão', 'Utnapishtim', 'Hamurabi'], d=2, flag='IRQ',
    src=('en', 'Epic of Gilgamesh', ['Uruk']),
    x='Na epopeia, um sobrevivente conta a Gilgamesh a história de um dilúvio muito parecida com a da Arca de Noé.')
c.T('Como é chamado o período em que os judeus de Jerusalém foram deportados por Nabucodonosor II, no século VI a.C.?', 'Cativeiro da Babilônia',
    ['Êxodo', 'Diáspora romana', 'Exílio assírio', 'Cisma do Norte', 'Revolta dos Macabeus'], d=2, stad='portao_ishtar',
    src=('en', 'Babylonian captivity', ['Nebuchadnezzar']),
    x='O exílio acabou depois que os persas de Ciro tomaram a Babilônia, em 539 a.C., e permitiram a volta a Jerusalém.')
c.C('Qual civilização antiga dividia o ano em três estações (inundação, plantio e colheita) conforme as cheias de seu grande rio?', 'egito_antigo', d=2, icon='hourglass',
    src=('en', 'Egyptian calendar', ['Akhet']),
    x='As estações se chamavam Akhet, Peret e Shemu, cada uma com quatro meses de 30 dias; somavam-se cinco dias de festa no fim.')
c.Q('Quem sou eu?', 'hamurabi', ['Reinei numa cidade às margens do Eufrates, no século XVIII a.C.',
    'Comecei com um reino pequeno e terminei senhor de quase toda a Mesopotâmia.',
    'Mandei gravar centenas de leis numa estela de pedra negra.',
    'No alto da estela, apareço diante do deus-sol Shamash.'], 2,
    src=('en', 'Code of Hammurabi', ['Shamash']),
    x='A estela foi achada em 1901 em Susa, no Irã, para onde fora levada como troféu de guerra; hoje está no Louvre.')
c.LN('Quem completa a família divina: o pai, a mãe e o filho?', 'Hórus', 'A família de Osíris · Egito', ['Osíris', 'Ísis', '?'], d=2,
     kind='grupo', era='ant', typ='txt', wrong=['Seth', 'Anúbis', 'Rá', 'Thot', 'Ptah'],
     src=('en', 'Horus', ['Isis']),
     x='O Olho de Hórus, perdido e recuperado na luta contra Seth, virou amuleto de proteção e de cura.')
c.LN('Quem é o faraó que falta nesta dinastia?', 'ramses_ii', 'XIX dinastia · Egito', ['Ramsés I', 'Seti I', '?', 'Merneptá'], d=2, era='ant',
     src=('en', 'Ramesses II', ['Merneptah']),
     x='Merneptá era o 13º filho: o pai viveu tanto que os doze irmãos mais velhos morreram antes dele.')
c.BT('Qual império teve a capital saqueada nesta batalha?', 'assiria', 'Nínive · 612 a.C.', 'babilonia', '?', d=2,
     x='Babilônios e medos, aliados, arrasaram a cidade; em poucos anos o império derrotado desapareceu do mapa.',
     src=('en', 'Nineveh', ['612']))
c.NW('Em que ano saiu esta manchete?', '1922', 'Tumba de faraó é encontrada quase intacta no Vale dos Reis', 2, paper='Correio do Cairo',
     sub='Câmara selada há mais de 3 mil anos guarda carros, joias e estátuas douradas',
     wrong=['1899', '1912', '1919', '1926', '1932'], src=('pt', 'Tutancâmon', ['1922']),
     x='Quando lorde Carnarvon perguntou se via algo, Howard Carter teria respondido: "Sim, coisas maravilhosas".')
c.DU('Duelo: qual escrita surgiu primeiro?', 'Cuneiforme', 'Alfabeto fenício', 2, typ='txt', icon='scroll',
     src=('en', 'Cuneiform', ['Sumer']),
     x='O cuneiforme surgiu na Suméria por volta de 3200 a.C.; o alfabeto fenício, cerca de dois mil anos depois.')
c.DU('Duelo: o que aconteceu primeiro?', 'Reinado de Tutancâmon', 'Fundação de Roma', 2, typ='txt', icon='hourglass',
     src=('en', 'Tutankhamun', ['1332']),
     x='Tutancâmon morreu por volta de 1323 a.C.; Roma, pela tradição, foi fundada em 753 a.C., quase 600 anos depois.')
c.MY('A Esfinge de Gizé perdeu o nariz com um tiro de canhão dos soldados de Napoleão?', False, 2, stad='esfinge',
     src=('en', 'Great Sphinx of Giza', ['nose']),
     x='Desenhos feitos décadas antes da chegada de Napoleão já mostram a Esfinge sem nariz; um autor árabe do século XV conta que foi quebrado de propósito.')
c.MY('A maldição de Tutancâmon matou quem abriu sua tumba?', False, 2, who='tutancamon',
     src=('en', 'Curse of the pharaohs', ['Carter']),
     x='Howard Carter, que liderou a escavação, viveu mais 16 anos; estudos não acharam mais mortes entre os presentes do que o esperado.')
c.MY('A divisão da hora em 60 minutos, e do minuto em 60 segundos, vem da matemática da Mesopotâmia?', True, 2, icon='hourglass',
     src=('en', 'Sexagesimal', ['Babylonian']),
     x='Sumérios e babilônios contavam em base 60, número com muitos divisores; o sistema sobreviveu na medida do tempo e dos ângulos.')

# ── d3 ──
c.T('No julgamento dos mortos, diante de Osíris, o coração do morto era pesado numa balança contra o quê?', 'Uma pena',
    ['Um grão de trigo', 'Um escaravelho de ouro', 'Uma moeda de prata', 'Um olho de Hórus', 'Uma pedra do Nilo'], d=3, icon='book',
    src=('en', 'Maat', ['feather']),
    x='A pena representava Maat, a verdade e a justiça; se o coração pesasse mais, era devorado pela monstruosa Ammit.')
c.T('Qual religião antiga do Irã tem Ahura Mazda como deus supremo?', 'Zoroastrismo',
    ['Maniqueísmo', 'Mitraísmo', 'Budismo', 'Jainismo', 'Hinduísmo'], d=3, flag='IRN',
    src=('en', 'Zoroastrianism', ['Ahura Mazda']),
    x='Ainda hoje há fiéis, sobretudo no Irã e na Índia, onde são chamados parses.')
c.T('Em que país ficam hoje as ruínas de Mohenjo-daro, uma das grandes cidades do Vale do Indo?', 'Paquistão',
    ['Índia', 'Afeganistão', 'Irã', 'Bangladesh', 'Nepal'], d=3, icon='map',
    src=('en', 'Mohenjo-daro', ['Pakistan']),
    x='Por volta de 2500 a.C., a cidade já tinha ruas em grade, poços, banheiros nas casas e esgotos cobertos.')
c.T('Qual achado de 1947, em cavernas de Qumran, revelou cópias da Bíblia hebraica mil anos mais antigas que as conhecidas?', 'Manuscritos do Mar Morto',
    ['Códice Sinaítico', 'Biblioteca de Nag Hammadi', 'Cartas de Amarna', 'Papiros de Oxirrinco', 'Tabuletas de Ebla'], d=3, icon='scroll',
    src=('en', 'Dead Sea Scrolls', ['Qumran']),
    x='Segundo o relato mais conhecido, os primeiros rolos foram achados por pastores beduínos que procuravam uma cabra perdida.')
c.P('Qual faraó assinou com os hititas um dos mais antigos tratados de paz conhecidos?', 'ramses_ii', d=3, flag='TUR',
    src=('en', 'Ramesses II', ['Hattusili']),
    x='O texto foi gravado em hieróglifos nos templos egípcios e, em acádio, em tabuletas da capital hitita; uma cópia está exposta na sede da ONU.')
c.P('Segundo Heródoto, qual rei persa mandou chicotear o mar quando uma tempestade destruiu suas pontes sobre o Helesponto?', 'xerxes', d=3, who='herodoto',
    src=('en', 'Xerxes I', ['Hellespont']),
    x='O historiador conta que foram 300 chibatadas e que o rei ainda mandou jogar grilhões nas águas.')
c.C('Qual império construiu a Estrada Real, de Susa a Sardes, com postos de troca de cavalos para os mensageiros?', 'persia', d=3, who='dario',
    src=('en', 'Royal Road', ['Sardis']),
    x='Heródoto admirou esses mensageiros: sua frase sobre eles, que nem neve nem chuva os detinham, virou lema não oficial dos correios dos EUA.')
c.Q('Quem sou eu?', 'nabucodonosor', ['Reinei na Babilônia por mais de quarenta anos.',
    'Fui filho do rei que libertou a Babilônia do domínio assírio.',
    'Mandei revestir de tijolos azuis vidrados um portão dedicado à deusa Ishtar.',
    'A Bíblia conta que tomei Jerusalém e que o profeta Daniel interpretou meus sonhos.'], 3,
    src=('en', 'Nebuchadnezzar II', ['Ishtar Gate']),
    x='No sonho decifrado por Daniel, uma estátua tinha pés de barro: daí a expressão "gigante com pés de barro".')
c.Q('Quem sou eu?', 'aquenaton', ['Fui filho de Amenófis III, um dos faraós mais ricos do Egito.',
    'Troquei meu nome de nascimento por outro, em honra do disco solar.',
    'Fundei uma capital nova no deserto, no lugar hoje chamado Amarna.',
    'Depois que morri, meus sucessores tentaram apagar minha memória dos monumentos.'], 3,
    src=('en', 'Akhenaten', ['Amarna']),
    x='Depois dele, o culto a Amon voltou: o jovem Tutancáton até trocou de nome para Tutancâmon.')
c.QT('O Egito é uma dádiva do Nilo.', 'herodoto', 3, ctx='Escrita por um viajante grego que visitou o Egito no século V a.C.',
     src=('en', 'Herodotus', ['Egypt']),
     x='O "pai da História" viajou pelo Egito e descreveu as cheias do rio, as pirâmides e até a mumificação.')
c.QT('Rei do mundo, grande rei, rei poderoso, rei da Babilônia, rei da Suméria e da Acádia, rei dos quatro cantos do mundo.', 'ciro', 3,
     ctx='Cilindro de argila escrito em acádio depois da conquista da Babilônia, 539 a.C.',
     src=('en', 'Cyrus Cylinder', ['Babylon']),
     x='O cilindro foi encontrado em 1879 nas ruínas da Babilônia e hoje está no Museu Britânico.')
c.LN('Quem é o rei persa que falta nesta linhagem?', 'xerxes', 'De pai para filho · Pérsia aquemênida', ['Dario I', '?', 'Artaxerxes I'], d=3, era='ant',
     src=('en', 'Xerxes I', ['Artaxerxes']),
     x='Foi ele quem invadiu a Grécia em 480 a.C.: passou pelas Termópilas, mas teve a frota derrotada em Salamina.')
c.BT('Qual reino os persas de Ciro derrotaram nesta batalha, pouco antes de tomar a capital inimiga?', 'babilonia', 'Ópis · 539 a.C.', 'persia', '?', d=3,
     x='Semanas depois, a Babilônia caiu quase sem luta, e o rei Nabonido foi capturado.',
     src=('en', 'Battle of Opis', ['Nabonidus']))
c.NW('Em que ano saiu esta manchete?', '1822', 'Decifrado o segredo dos hieróglifos', 3, paper='Folha Literária de Paris',
     sub='Estudioso francês lê nomes de faraós com a ajuda da Pedra de Roseta',
     wrong=['1799', '1801', '1815', '1836', '1848'], src=('en', 'Jean-François Champollion', ['1822']),
     x='Diz-se que Champollion, ao entender o sistema, correu ao irmão gritando "Consegui!" e desmaiou.')
c.MY('Ainda havia mamutes vivos quando a Grande Pirâmide de Gizé foi construída?', True, 3, icon='globe',
     src=('en', 'Woolly mammoth', ['Wrangel']),
     x='Uma população isolada sobreviveu na ilha de Wrangel, no Ártico, até cerca de 4 mil anos atrás, séculos depois da pirâmide.')
c.MY('Na mumificação, os egípcios retiravam o cérebro do morto pelo nariz?', True, 3, crest='egito_antigo',
     src=('en', 'Ancient Egyptian funerary practices', ['brain']),
     x='Usavam um gancho de metal e descartavam o cérebro; já o coração ficava no corpo, porque seria pesado no julgamento dos mortos.')
c.MY('A escrita da civilização do Vale do Indo já foi decifrada?', False, 3, flag='IND',
     src=('en', 'Indus script', ['deciphered']),
     x='Os sinais aparecem em milhares de selos, mas os textos são curtos demais e nenhuma inscrição bilíngue foi encontrada.')
c.O('Do mais antigo ao mais recente, em que ordem aconteceram estes marcos?', [
    ('cuneiforme', 'Primeira escrita cuneiforme', 'Suméria', -3200, {'flag': 'IRQ'}),
    ('codigo', 'Código de Hamurabi', 'Babilônia', -1754, {'face': 'hamurabi'}),
    ('kadesh', 'Batalha de Kadesh', 'Egito contra hititas', -1274, {'face': 'ramses_ii'}),
    ('cartago', 'Fundação de Cartago', 'Colonos de Tiro', -814, {'crest': 'cartago'}),
    ('babilonia', 'Ciro toma a Babilônia', 'Pérsia', -539, {'face': 'ciro'})], d=3,
    src=('en', 'Code of Hammurabi', ['Babylon']))

# ── d4 ──
c.T('Qual povo estrangeiro dominou o norte do Egito entre o Médio e o Novo Império?', 'Hicsos',
    ['Hititas', 'Núbios', 'Líbios', 'Assírios', 'Povos do Mar'], d=4, icon='sword',
    src=('en', 'Hyksos', ['Ahmose']),
    x='Foram expulsos por volta de 1550 a.C. por Amósis I, fundador da XVIII dinastia, que abriu o Novo Império.')
c.T('Qual reino da Núbia conquistou o Egito no século VIII a.C. e reinou como a XXV dinastia?', 'Cuxe',
    ['Axum', 'Punt', 'Sabá', 'Mitani', 'Elam'], d=4, flag='EGY',
    src=('en', 'Twenty-fifth Dynasty of Egypt', ['Kush']),
    x='Os reis cuxitas, como Piye e Taharqa, governaram do delta do Nilo ao atual Sudão até serem expulsos pelos assírios.')
c.T('Qual era a capital do Império Hitita, na atual Turquia?', 'Hatusa',
    ['Nínive', 'Susa', 'Ugarit', 'Mari', 'Assur'], d=4, flag='TUR',
    src=('en', 'Hattusa', ['Hittite']),
    x='Lá foram achadas milhares de tabuletas, entre elas a versão hitita do tratado de paz com Ramsés II.')
c.P('Qual faraó enviou uma célebre expedição de navios à Terra de Punt, em busca de incenso e mirra, e a retratou em seu templo funerário?', 'hatexepsute', d=4, icon='ship',
    src=('en', 'Hatshepsut', ['Punt']),
    x='Os relevos mostram navios carregados de árvores de incenso, ébano, marfim e até babuínos vivos.')
c.P('Qual rei persa foi sepultado num túmulo de pedra em Pasárgada, a capital que ele mesmo fundou?', 'ciro', d=4, crest='persia',
    src=('en', 'Pasargadae', ['Cyrus']),
    x='O nome da cidade inspirou Manuel Bandeira no poema "Vou-me embora pra Pasárgada", de 1930.')
c.C('Qual império conquistou Samaria e pôs fim ao Reino de Israel do norte, no século VIII a.C.?', 'assiria', d=4, crest='israel_antigo',
    src=('en', 'Kingdom of Israel (Samaria)', ['Assyria']),
    x='Parte da população foi deportada, e daí nasceu a lenda das "dez tribos perdidas" de Israel.')
c.QT('Sou o grande rei, rei dos reis, rei da Pérsia, rei das nações, filho de Histaspes, neto de Arsames, um aquemênida.', 'dario', 4,
     ctx='Abertura de uma inscrição em três línguas, gravada num penhasco do oeste do Irã, por volta de 520 a.C.',
     src=('en', 'Behistun Inscription', ['Hystaspes']),
     x='Como a Pedra de Roseta para os hieróglifos, a inscrição de Behistun foi a chave para decifrar a escrita cuneiforme.')
c.QT('Meu nome é Ozymandias, rei dos reis: contemplai minhas obras, ó poderosos, e desesperai!', 'ramses_ii', 4,
     t='Sobre qual faraó foi escrito este poema?', ctx='Soneto do poeta inglês Percy Shelley, 1818, sobre a estátua partida de um rei',
     src=('en', 'Ozymandias', ['Ramesses II']),
     x='Ozymandias era o nome grego de Ramsés II; no poema, da estátua colossal só restam as pernas e o rosto na areia.')
c.BT('Quem o faraó Tutmés III enfrentou nesta batalha, considerada a primeira registrada em detalhes?', 'Coalizão cananeia', 'Megido · século XV a.C.',
     'egito_antigo', '?', d=4, typ='txt', wrong=['Hititas', 'Hicsos', 'Povos do Mar', 'Assírios', 'Núbios'],
     x='O nome da cidade deu origem a Armagedom, a batalha final do Apocalipse.',
     src=('en', 'Thutmose III', ['Megiddo']))
c.BT('Qual reino, aliado aos últimos assírios, foi derrotado pelos babilônios nesta batalha?', 'egito_antigo', 'Carquemis · 605 a.C.',
     'babilonia', '?', d=4,
     x='Os babilônios eram comandados pelo príncipe herdeiro Nabucodonosor, coroado rei naquele mesmo ano.',
     src=('en', 'Battle of Carchemish', ['605']))
c.O('Coloque estes capítulos da história egípcia em ordem, do mais antigo ao mais recente?', [
    ('unificacao', 'Unificação do Alto e do Baixo Egito', 'Narmer', -3100, {'crest': 'egito_antigo'}),
    ('djoser', 'Pirâmide de degraus de Djoser', 'Sacará', -2670, {'flag': 'EGY'}),
    ('hatexepsute', 'Reinado de Hatexepsute', 'XVIII dinastia', -1479, {'face': 'hatexepsute'}),
    ('amarna', 'Aquenáton funda Amarna', 'Culto a Aton', -1346, {'face': 'aquenaton'}),
    ('persas', 'Conquista persa do Egito', 'Cambises II', -525, {'crest': 'persia'})], d=4,
    src=('en', 'Ancient Egypt', ['Narmer']))
c.NW('Em que ano saiu esta manchete?', '1968', 'Templos de Abu Simbel são salvos das águas do Nilo', 4, paper='Diário do Nilo',
     sub='Blocos cortados um a um foram remontados 65 metros acima, a salvo do lago da nova represa de Assuã',
     wrong=['1952', '1956', '1960', '1974', '1979'], src=('en', 'Abu Simbel temples', ['1968']),
     x='A operação, de 1964 a 1968, foi coordenada pela UNESCO e contou com ajuda de dezenas de países.')

# ── d5 ──
c.T('Qual faraó, pai de Quéops, construiu a Pirâmide Vermelha e a Pirâmide Curvada, em Dachur?', 'Snefru',
    ['Djoser', 'Quéfren', 'Miquerinos', 'Unas', 'Teti'], d=5, stad='piramide_queops',
    src=('en', 'Sneferu', ['Bent Pyramid']),
    x='A Pirâmide Curvada muda de inclinação no meio da subida; a Vermelha, logo depois, foi a primeira pirâmide de faces lisas bem-sucedida.')
c.T('Em que língua foi escrita a maior parte das Cartas de Amarna, a correspondência diplomática dos faraós?', 'Acádio',
    ['Egípcio', 'Aramaico', 'Hitita', 'Hebraico', 'Grego'], d=5, icon='scroll',
    src=('en', 'Amarna letters', ['Akkadian']),
    x='Escritas em cuneiforme, em tabuletas de argila, mostram faraós trocando presentes e queixas com reis da Babilônia, de Mitani e dos hititas.')
c.T('Que invasores o faraó Ramsés III derrotou numa grande batalha naval, por volta de 1175 a.C., retratada no templo de Medinet Habu?', 'Povos do Mar',
    ['Hicsos', 'Hititas', 'Assírios', 'Persas', 'Núbios'], d=5, icon='ship',
    src=('en', 'Sea Peoples', ['Medinet Habu']),
    x='Esses navegadores de origem incerta são associados ao colapso de vários reinos da Idade do Bronze, como o hitita e a cidade de Ugarit.')
c.LN('Quem é o neto que completa esta linhagem?', 'Naram-Sin', 'Avô, filho e neto · Império Acádio', ['Sargão da Acádia', 'Manishtushu', '?'], d=5,
     era='ant', typ='txt', wrong=['Gilgamesh', 'Ur-Nammu', 'Shulgi', 'Gudea', 'Hamurabi'],
     src=('en', 'Naram-Sin of Akkad', ['Manishtushu']),
     x='Foi o primeiro rei mesopotâmico a se declarar deus em vida e se dizia "rei dos quatro cantos do mundo".')
c.NW('Em que ano saiu esta manchete?', '1872', 'Tabuleta da Mesopotâmia narra um dilúvio como o de Noé', 5, paper='Correio de Londres',
     sub='Funcionário do Museu Britânico decifra trecho de uma antiga epopeia',
     wrong=['1799', '1822', '1849', '1901', '1922'], src=('en', 'Epic of Gilgamesh', ['George Smith']),
     x='Conta-se que George Smith ficou tão emocionado ao ler o trecho que começou a tirar a roupa na sala do museu.')

c.write()
