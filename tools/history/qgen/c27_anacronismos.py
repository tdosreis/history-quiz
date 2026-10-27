"""Anacronismo: a scene of a time and a place, four things pinned on it, one of them out of its time
(tools/history/js/formats.js). The explanation says when the intruder really appeared."""
from qdsl import Cat

c = Cat('anacronismos', 'Anacronismo', '⏰', 'Um objeto fora do seu tempo', '#8C3B2A', order=74)
def A(place, scene, items, a, d, src, x):
    c.AN(place, scene, items, a, d=d, src=src, x=x)

# d1
A('Gizé, c. 2560 a.C.', 'piramides_gize', [('📜', 'Papiro'), ('🏺', 'Jarro de cerâmica'), ('🌾', 'Trigo'), ('⌚', 'Relógio de pulso')], 'Relógio de pulso', 1,
  ('pt', 'Relógio de pulso', ['século XX']), 'O relógio de pulso só se popularizou no início do século XX; os egípcios mediam o tempo pelo Sol e pelas estrelas.')
A('Porto Seguro, 1500', 'chegada_cabral', [('⚓', 'Âncora'), ('✝️', 'Cruz'), ('🦜', 'Papagaio'), ('🚲', 'Bicicleta')], 'Bicicleta', 1,
  ('pt', 'Bicicleta', ['século XIX']), 'A bicicleta só foi inventada no século XIX; Cabral chegou com uma frota de naus e caravelas.')
A('Tombuctu, 1324', 'caravana_mali', [('🐪', 'Camelo'), ('🧂', 'Sal'), ('📚', 'Manuscritos'), ('🚂', 'Trem')], 'Trem', 1,
  ('pt', 'Locomotiva', ['1825']), 'A primeira ferrovia pública com locomotiva a vapor abriu em 1825, na Inglaterra; as caravanas do Saara andavam de camelo, carregadas de sal e ouro.')
A('Na Lua, 1969', 'pouso_lua', [('🚀', 'Foguete'), ('📷', 'Câmera fotográfica'), ('🚩', 'Bandeira'), ('📱', 'Smartphone')], 'Smartphone', 1,
  ('pt', 'Smartphone', ['2007']), 'Os smartphones de tela sensível ao toque se popularizaram a partir de 2007; os astronautas da Apollo 11 fotografaram a Lua com câmeras Hasselblad.')
A('No Titanic, 1912', 'titanic', [('🎻', 'Violino'), ('🧊', 'Gelo'), ('☕', 'Xícara de chá'), ('💻', 'Computador portátil')], 'Computador portátil', 1,
  ('pt', 'Computador portátil', ['1981']), 'O primeiro computador portátil de sucesso, o Osborne 1, é de 1981; o Titanic pediu socorro por telegrafia sem fio, com o sistema de Marconi.')
A('Serra da Barriga, 1680', 'quilombo_palmares', [('🥁', 'Tambor'), ('🏹', 'Arco e flecha'), ('🌽', 'Milho'), ('🎸', 'Guitarra elétrica')], 'Guitarra elétrica', 1,
  ('pt', 'Guitarra elétrica', ['1930']), 'A guitarra elétrica só surgiu nos anos 1930; nos quilombos, tocavam-se tambores e atabaques de origem africana.')

# d2
A('Roma, 44 a.C.', 'forum_romano', [('🍷', 'Vinho'), ('🏺', 'Ânfora'), ('🗡️', 'Punhal'), ('🍅', 'Tomate')], 'Tomate', 2,
  ('pt', 'Tomate', ['América']), 'O tomate é americano: só chegou à Europa no século XVI, depois das viagens à América. Os romanos nunca o provaram.')
A('Atenas, século V a.C.', 'teatro_grego', [('🎭', 'Máscara de teatro'), ('🍯', 'Mel'), ('📜', 'Rolo de papiro'), ('👓', 'Óculos')], 'Óculos', 2,
  ('pt', 'Óculos', ['século XIII']), 'Os óculos foram inventados na Itália, no fim do século XIII; os gregos liam rolos de papiro sem eles.')
A('Viagem viking, ano 900', 'drakkar', [('🛡️', 'Escudo'), ('⚔️', 'Espada'), ('🐟', 'Peixe seco'), ('🧭', 'Bússola')], 'Bússola', 2,
  ('pt', 'Bússola', ['século XII']), 'A bússola magnética só chegou à Europa por volta do século XII; os vikings se guiavam pelo Sol, pelas estrelas e pelas aves.')
A('Londres, ano 1100', 'torre_branca', [('🏹', 'Arco e flecha'), ('🐎', 'Cavalo'), ('🕯️', 'Vela'), ('🥔', 'Batata')], 'Batata', 2,
  ('pt', 'Batata', ['Andes']), 'A batata veio dos Andes e só chegou à Europa na segunda metade do século XVI.')
A('Um feudo, ano 1200', 'campo_feudal', [('🐄', 'Vaca'), ('🌾', 'Trigo'), ('🍺', 'Cerveja'), ('🌽', 'Milho')], 'Milho', 2,
  ('pt', 'Milho', ['México']), 'O milho foi domesticado no México há milhares de anos e só chegou à Europa depois de 1492.')
A('Coliseu, ano 80', 'arena_gladiadores', [('🦁', 'Leão'), ('🛡️', 'Escudo'), ('🔱', 'Tridente'), ('🍫', 'Chocolate')], 'Chocolate', 2,
  ('pt', 'Chocolate', ['cacau']), 'O cacau é americano: os europeus só conheceram o chocolate no século XVI, depois da conquista do México pelos espanhóis.')
A('Constantinopla, ano 537', 'hagia_sofia', [('🕯️', 'Vela'), ('✝️', 'Cruz'), ('🖼️', 'Ícone'), ('☕', 'Café')], 'Café', 2,
  ('pt', 'Café', ['Iêmen']), 'O café como bebida só aparece no século XV, no Iêmen; chegou a Constantinopla no século XVI.')
A('Alexandria, 250 a.C.', 'biblioteca_alexandria', [('📜', 'Rolo de papiro'), ('🐈', 'Gato'), ('🏺', 'Ânfora'), ('🔭', 'Telescópio')], 'Telescópio', 2,
  ('pt', 'Telescópio', ['1608']), 'O telescópio foi inventado na Holanda, em 1608; os astrônomos de Alexandria observavam o céu a olho nu.')
A('Capela Sistina, 1510', 'afresco_vaticano', [('🎨', 'Tintas'), ('🕯️', 'Vela'), ('🍞', 'Pão'), ('💡', 'Lâmpada elétrica')], 'Lâmpada elétrica', 2,
  ('pt', 'Lâmpada incandescente', ['1879']), 'A lâmpada elétrica de Edison é de 1879; Michelangelo pintava o teto à luz do dia e de velas.')
A('Versalhes, 1685', 'versalhes_espelhos', [('🕯️', 'Velas'), ('🎻', 'Violino'), ('👑', 'Coroa'), ('📷', 'Câmera fotográfica')], 'Câmera fotográfica', 2,
  ('pt', 'Fotografia', ['Niépce']), 'A fotografia só nasceu no século XIX: a mais antiga que se conhece foi feita por Niépce, por volta de 1826.')
A('Paris, 1793', 'guilhotina', [('🍞', 'Pão'), ('📰', 'Jornal'), ('🕯️', 'Vela'), ('☎️', 'Telefone')], 'Telefone', 2,
  ('pt', 'Telefone', ['1876']), 'O telefone foi patenteado por Graham Bell em 1876, quase um século depois da Revolução Francesa.')
A('Inglaterra, 1830', 'locomotiva_vapor', [('🎩', 'Cartola'), ('☂️', 'Guarda-chuva'), ('🕰️', 'Relógio'), ('✈️', 'Avião')], 'Avião', 2,
  ('pt', 'Avião', ['1903']), 'O avião só levantou voo no século XX: os irmãos Wright voaram em 1903, e Santos Dumont, com o 14-Bis, em 1906. Em 1830, a grande novidade era a locomotiva a vapor.')
A('Rio de Janeiro, 1808', 'corte_1808', [('⛵', 'Navio a vela'), ('👑', 'Coroa'), ('🍌', 'Banana'), ('📻', 'Rádio')], 'Rádio', 2,
  ('pt', 'Rádio', ['Marconi']), 'As primeiras transmissões de rádio são do fim do século XIX; a corte portuguesa chegou ao Brasil de navio, depois de cerca de dois meses de viagem.')
A('Londres, 1910', 'sufragistas', [('📰', 'Jornal'), ('🚲', 'Bicicleta'), ('☂️', 'Guarda-chuva'), ('📺', 'Televisão')], 'Televisão', 2,
  ('pt', 'Televisão', ['1926']), 'A primeira demonstração pública de televisão foi feita por John Logie Baird em 1926, em Londres; as sufragistas espalhavam suas ideias em jornais e cartazes.')
A('Amsterdã, 1943', 'anexo_secreto', [('📓', 'Diário'), ('📻', 'Rádio'), ('🚲', 'Bicicleta'), ('💿', 'CD')], 'CD', 2,
  ('pt', 'Disco compacto', ['1982']), 'O CD chegou às lojas em 1982; no Anexo Secreto, a família de Anne Frank ouvia as notícias da guerra pelo rádio.')
A('Bletchley Park, 1941', 'maquina_enigma', [('📻', 'Rádio'), ('✏️', 'Lápis'), ('☕', 'Chá'), ('🖱️', 'Mouse de computador')], 'Mouse de computador', 2,
  ('pt', 'Mouse', ['Engelbart']), 'O mouse foi inventado nos anos 1960, por Douglas Engelbart; em Bletchley, as mensagens eram decifradas com papel, lápis e as máquinas Bombe.')
A('Cabo Canaveral, 1962', 'ev_corrida_espacial', [('🚀', 'Foguete'), ('📺', 'Televisão'), ('☎️', 'Telefone'), ('🌐', 'Internet')], 'Internet', 2,
  ('pt', 'Internet', ['World Wide Web']), 'A ARPANET, avó da internet, só entrou no ar em 1969; a internet se espalhou pelo mundo nos anos 1980 e 1990, e a web é de 1991.')
A('Europa, 1348', 'peste_negra', [('🐀', 'Rato'), ('🕯️', 'Vela'), ('🔔', 'Sino'), ('💉', 'Seringa hipodérmica')], 'Seringa hipodérmica', 2,
  ('pt', 'Seringa', ['1853']), 'A seringa hipodérmica só foi inventada em 1853; na Peste Negra, ninguém sabia que a doença vinha de uma bactéria.')
A('Maratona, 490 a.C.', 'mensageiro_maratona', [('🛡️', 'Escudo'), ('🍇', 'Uvas'), ('🏺', 'Ânfora'), ('🥇', 'Medalha de ouro')], 'Medalha de ouro', 2,
  ('pt', 'Medalha olímpica', ['1896']), 'Nos jogos da Grécia antiga, o vencedor ganhava só uma coroa de ramos de oliveira. As medalhas vieram com os Jogos modernos: em 1896, o campeão levava uma medalha de prata, e a de ouro só apareceu em 1904.')

# d3
A('Tenochtitlán, 1500', 'tenochtitlan', [('🌽', 'Milho'), ('🌶️', 'Pimenta'), ('🦃', 'Peru'), ('🐴', 'Cavalo')], 'Cavalo', 3,
  ('pt', 'Cavalo', ['Américas']), 'Não havia cavalos nas Américas quando os europeus chegaram: eles vieram com os espanhóis, e Cortés os levou ao México em 1519.')
A('Cusco, 1450', 'muralha_inca', [('🦙', 'Lhama'), ('🥔', 'Batata'), ('🌽', 'Milho'), ('🐄', 'Vaca')], 'Vaca', 3,
  ('pt', 'Gado', ['Américas']), 'Não havia bois nem vacas nas Américas: o gado chegou com os europeus e só alcançou os Andes depois da conquista espanhola, nos anos 1530. Os incas criavam lhamas e alpacas.')
A('China, 210 a.C.', 'exercito_terracota', [('🐎', 'Cavalo'), ('⚔️', 'Espada de bronze'), ('🥢', 'Pauzinhos'), ('🧨', 'Pólvora')], 'Pólvora', 3,
  ('pt', 'Pólvora', ['século IX']), 'A pólvora foi inventada por alquimistas chineses por volta do século IX, mais de mil anos depois de Qin Shi Huang.')
A('Runnymede, 1215', 'runnymede', [('📜', 'Pergaminho'), ('🐎', 'Cavalo'), ('🏰', 'Castelo'), ('🍵', 'Chá')], 'Chá', 3,
  ('pt', 'Chá', ['Inglaterra']), 'O chá só chegou à Inglaterra por volta de 1650; virou moda na corte com a rainha Catarina de Bragança, a partir de 1662, e costume nacional no século XVIII. A Magna Carta foi selada sem ele.')
A('Filadélfia, 1776', 'ev_independencia_eua', [('🕯️', 'Vela'), ('📜', 'Pergaminho'), ('🔔', 'Sino'), ('🖊️', 'Caneta esferográfica')], 'Caneta esferográfica', 3,
  ('pt', 'Caneta esferográfica', ['Bíró']), 'A caneta esferográfica moderna foi patenteada pelo húngaro László Bíró em 1938; a Declaração de Independência foi escrita com pena e tinta.')
A('Lisboa, 1497', 'ev_grandes_navegacoes', [('🧭', 'Bússola'), ('⚓', 'Âncora'), ('📜', 'Carta de marear'), ('🔭', 'Luneta')], 'Luneta', 3,
  ('pt', 'Luneta', ['1608']), 'A luneta só apareceu em 1608, na Holanda; Vasco da Gama navegava com bússola, astrolábio e cartas de marear.')
A('Monte Cassino, ano 800', 'monte_cassino', [('📜', 'Pergaminho'), ('🕯️', 'Vela'), ('🔔', 'Sino'), ('📚', 'Livros impressos')], 'Livros impressos', 3,
  ('pt', 'Prensa móvel', ['Gutenberg']), 'Na Europa, os livros só passaram a ser impressos com a prensa de tipos móveis de Gutenberg, por volta de 1450; antes, os monges copiavam tudo à mão, em pergaminho.')
A('Ur, c. 2100 a.C.', 'zigurate_ur', [('🍺', 'Cerveja'), ('🌾', 'Cevada'), ('🐄', 'Gado'), ('🪙', 'Moedas cunhadas')], 'Moedas cunhadas', 3,
  ('pt', 'Moeda', ['Lídia']), 'As primeiras moedas cunhadas surgiram na Lídia, na atual Turquia, por volta de 600 a.C.; em Ur, pagava-se com cevada ou com prata pesada na balança.')
c.write()
