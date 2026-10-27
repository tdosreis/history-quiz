"""Three new formats (tools/history/js/formats.js):
Charadas (a story told in emoji, read in order), Detalhes (a famous face under
the magnifying glass) and O intruso (four tiles, three alike)."""
from qdsl import Cat

# ───────────────────────── Charadas ─────────────────────────
c = Cat('charadas', 'Charadas', '🧩', 'Histórias contadas em figuras', '#6A4C93', order=70)
WHO = 'Quem a charada esconde?'
def R(a, pics, d, src, x, k=None, t=WHO):
    c.RB(t, a, pics, d=d, k=k, typ='player', src=src, x=x)
def RT(t, a, wrong, pics, d, src, x, k=None):
    c.RB(t, a, pics, d=d, k=k, typ='txt', wrong=wrong, src=src, x=x)

# d1
RT('Que episódio a charada conta?', 'Guerra de Troia',
   ['Guerra do Peloponeso', 'Guerras Médicas', 'Guerras Púnicas', 'Guerra dos Cem Anos', 'Guerra das Rosas'],
   ['🐴', '🎁', '🏰'], 1, ('pt', 'Cavalo de Troia', ['Troia']), k='Um conflito lendário',
   x='Segundo a lenda, contada na Odisseia e na Eneida, os gregos se esconderam dentro de um cavalo de madeira deixado de presente às portas de Troia.')
RT('Que tragédia a charada conta?', 'Naufrágio do Titanic',
   ['Naufrágio do Lusitania', 'Explosão do Hindenburg', 'Terremoto de Lisboa', 'Erupção do Vesúvio', 'Grande Incêndio de Roma'],
   ['🚢', '🧊', '💔'], 1, ('pt', 'RMS Titanic', ['iceberg']),
   x='O Titanic bateu num iceberg em sua viagem inaugural e afundou na madrugada de 15 de abril de 1912.')
RT('Que desastre a charada conta?', 'Destruição de Pompeia',
   ['Terremoto de Lisboa', 'Grande Incêndio de Roma', 'Queda de Constantinopla', 'Saque de Roma', 'Peste Negra'],
   ['🌋', '🏛️', '💀'], 1, ('pt', 'Pompeia', ['Vesúvio']),
   x='A erupção do Vesúvio, em 79 d.C., soterrou Pompeia e Herculano sob as cinzas.')
RT('Que acontecimento a charada conta?', 'Queda do Muro de Berlim',
   ['Construção do Muro de Berlim', 'Revolução de Veludo', 'Queda da Bastilha', 'Fim do apartheid', 'Crise dos Mísseis de Cuba'],
   ['🧱', '🔨', '🎉'], 1, ('pt', 'Queda do Muro de Berlim', ['1989']),
   x='Na noite de 9 de novembro de 1989, multidões atravessaram o muro e começaram a quebrá-lo a marteladas.')
RT('Que guerra a charada conta?', 'Guerra dos Cem Anos',
   ['Guerra dos Trinta Anos', 'Guerra dos Sete Anos', 'Guerra das Rosas', 'Guerra de Secessão', 'Guerras Napoleônicas'],
   ['💯', '📅', '⚔️'], 1, ('pt', 'Guerra dos Cem Anos', ['1337', '1453']),
   x='Apesar do nome, a guerra entre a Inglaterra e a França durou 116 anos, de 1337 a 1453.')
RT('Que lenda a charada conta?', 'Fundação de Roma',
   ['Fundação de Atenas', 'Fundação de Cartago', 'Fundação de Constantinopla', 'Fundação de Alexandria', 'Fundação de Esparta'],
   ['🐺', '👶', '👶'], 1, ('pt', 'Rómulo e Remo', ['loba']),
   x='Pela lenda, os gêmeos Rômulo e Remo foram amamentados por uma loba; Rômulo teria fundado Roma em 753 a.C.')
R('newton', ['🍎', '⬇️', '🤔'], 1, ('pt', 'Isaac Newton', ['maçã']),
  'A história da maçã foi contada pelo próprio Newton, já velho, a um amigo; mas, no relato, a fruta só cai da árvore: a pancada na cabeça é um enfeite posterior.')
R('cesar', ['🏛️', '🗡️', '🗡️', '🗡️'], 1, ('pt', 'Assassinato de Júlio César', ['Idos de Março']),
  'Júlio César foi morto a punhaladas numa reunião do Senado, nos Idos de Março (15 de março) de 44 a.C.', k='Idos de Março')
R('armstrong', ['🌕', '👣', '🚩'], 1, ('pt', 'Neil Armstrong', ['Apollo 11']),
  'Armstrong deixou a primeira pegada humana na Lua em julho de 1969, na missão Apollo 11.')
R('henrique_viii', ['👑', '💍', '6️⃣'], 1, ('pt', 'Henrique VIII de Inglaterra', ['seis']),
  'Das seis esposas de Henrique VIII, duas foram decapitadas: Ana Bolena e Catarina Howard.')
R('van_gogh', ['🌻', '👂', '✂️'], 1, ('pt', 'Vincent van Gogh', ['orelha']),
  'Em dezembro de 1888, em Arles, depois de uma briga com o pintor Paul Gauguin, Van Gogh cortou a própria orelha esquerda.')
R('beethoven', ['🎹', '🙉', '🎵'], 1, ('pt', 'Ludwig van Beethoven', ['surdez']),
  'Beethoven começou a perder a audição antes dos 30 anos e continuou compondo mesmo surdo.')
R('colombo', ['⛵', '⛵', '⛵', '🌎'], 1, ('pt', 'Cristóvão Colombo', ['Pinta', 'Niña']),
  'Colombo partiu em 1492 com três navios, a Santa María, a Pinta e a Niña, e chegou às Américas pensando estar na Ásia.')
R('cleopatra', ['🐍', '👑'], 1, ('pt', 'Cleópatra', ['áspide']),
  'Segundo a tradição, Cleópatra se matou com a picada de uma áspide, em 30 a.C., depois da derrota para Otaviano.')
R('tiradentes', ['🦷', '⛰️', '⚖️'], 1, ('pt', 'Tiradentes', ['dentista']),
  'Joaquim José da Silva Xavier ganhou o apelido porque também trabalhava como dentista; foi enforcado em 1792.')
R('shakespeare', ['💀', '🤔', '🎭'], 1, ('pt', 'Hamlet', ['Yorick']),
  'A cena em que Hamlet segura a caveira do bobo Yorick é uma das mais famosas do teatro.')
R('joana_darc', ['👧', '⚔️', '🔥'], 1, ('pt', "Joana d'Arc", ['Rouen']),
  "Joana d'Arc liderou tropas francesas aos 17 anos e foi queimada pelos ingleses em Rouen, em 1431, aos 19.")
R('gagarin', ['🚀', '🌍', '🥇'], 1, ('pt', 'Yuri Gagarin', ['Vostok 1']),
  'Em 12 de abril de 1961, Gagarin deu uma volta completa ao redor da Terra a bordo da Vostok 1.')
R('dom_pedro_i', ['🗡️', '📣', '🏞️'], 1, ('pt', 'Independência do Brasil', ['Ipiranga']),
  'Em 7 de setembro de 1822, às margens do riacho Ipiranga, Dom Pedro proclamou a independência. Testemunhas contaram que ele montava uma mula, e não o cavalo do quadro de Pedro Américo.',
  k='Às margens de um riacho')

# d2
RT('Que protesto a charada conta?', 'Festa do Chá de Boston',
   ['Massacre de Boston', 'Guerra do Ópio', 'Lei do Selo', 'Revolta da Cachaça', 'Conjuração Mineira'],
   ['🍵', '📦', '🌊'], 2, ('pt', 'Festa do Chá de Boston', ['1773']),
   x='Em 1773, colonos disfarçados jogaram no porto de Boston 342 caixas de chá da Companhia das Índias Orientais, em protesto contra os impostos britânicos.')
RT('Que revolta a charada conta?', 'Revolta da Vacina',
   ['Revolta da Chibata', 'Guerra de Canudos', 'Revolta dos Malês', 'Cabanagem', 'Revolta da Armada'],
   ['💉', '😠', '🏙️'], 2, ('pt', 'Revolta da Vacina', ['1904']), k='Rio de Janeiro, 1904',
   x='Em 1904, a vacinação obrigatória contra a varíola, defendida por Oswaldo Cruz, levou o Rio a uma semana de motins.')
RT('Que guerra a charada conta?', 'Guerra das Rosas',
   ['Guerra dos Cem Anos', 'Guerra dos Trinta Anos', 'Guerra Civil Inglesa', 'Guerra dos Farrapos', 'Guerra de Secessão'],
   ['🌹', '⚔️', '🌹'], 2, ('pt', 'Guerra das Rosas', ['Lancaster', 'York']), k='Um conflito inglês',
   x='A Guerra das Rosas (1455–1487) opôs duas casas inglesas: Lancaster, da rosa vermelha, e York, da rosa branca.')
RT('Que herói a charada esconde?', 'Guilherme Tell',
   ['Robin Hood', 'Rei Artur', 'El Cid', 'Siegfried', 'Ulisses'],
   ['🍎', '🧒', '🏹'], 2, ('pt', 'Guilherme Tell', ['maçã']), k='Uma lenda suíça',
   x='Conta a lenda que Guilherme Tell foi obrigado a acertar com uma flecha uma maçã posta sobre a cabeça do próprio filho.')
R('arquimedes', ['🛁', '💧', '👑'], 2, ('pt', 'Arquimedes', ['Eureka']),
  "Diz a tradição que Arquimedes, ao entrar na banheira, entendeu como saber se a coroa do rei era de ouro puro e saiu gritando 'Eureka!'.")
R('magalhaes', ['⛵', '🌍', '🔄'], 2, ('pt', 'Fernão de Magalhães', ['Elcano']),
  'Magalhães morreu nas Filipinas, em 1521; a primeira volta ao mundo foi completada por Juan Sebastián Elcano, em 1522.')
R('anibal', ['🐘', '⛰️', '❄️', '⚔️'], 2, ('pt', 'Aníbal', ['Alpes']),
  'Em 218 a.C., Aníbal atravessou os Alpes com seu exército e dezenas de elefantes para atacar Roma.')
R('santos_dumont', ['🎈', '🗼', '⌚'], 2, ('pt', 'Santos Dumont', ['Torre Eiffel']),
  'Em 1901, Santos Dumont contornou a Torre Eiffel com o dirigível nº 6 e ganhou o Prêmio Deutsch. Também ajudou a popularizar o relógio de pulso.')
R('darwin', ['🚢', '🏝️', '🐢', '🐦'], 2, ('pt', 'Charles Darwin', ['Galápagos']),
  'Nas ilhas Galápagos, em 1835, Darwin observou tartarugas e tentilhões que o ajudaram a pensar a evolução das espécies.')
R('galileu', ['🔭', '🌕', '⚖️'], 2, ('pt', 'Galileu Galilei', ['Inquisição']),
  'Galileu apontou um telescópio para o céu em 1609 e, em 1633, foi julgado pela Inquisição por defender que a Terra gira em torno do Sol.')
R('lutero', ['📜', '🔨', '🚪', '⛪'], 2, ('pt', 'Noventa e Cinco Teses', ['Wittenberg']),
  'Em 1517, Lutero divulgou suas 95 teses, segundo a tradição pregando-as na porta da igreja do castelo de Wittenberg.')
R('maria_antonieta', ['🍰', '👑'], 2, ('pt', 'Qu\'ils mangent de la brioche', ['Rousseau']),
  "Não há prova de que Maria Antonieta tenha dito 'que comam brioches': a frase já aparece nas Confissões de Rousseau, escritas quando ela era criança.",
  k='Uma frase que lhe atribuem')
R('nero', ['🔥', '🎻', '🏛️'], 2, ('pt', 'Grande Incêndio de Roma', ['Âncio']),
  'Nero não tocou violino no incêndio de Roma, em 64 d.C.: o instrumento só surgiria no século XVI, e ele estava em Âncio quando o fogo começou.',
  k='O que dizem, mas não é verdade')
R('leonardo', ['🖼️', '🙂', '🚁'], 2, ('pt', 'Leonardo da Vinci', ['Mona Lisa']),
  'Leonardo pintou a Mona Lisa e desenhou máquinas voadoras, como o famoso parafuso aéreo, quatro séculos antes do primeiro helicóptero.')
R('gandhi', ['🧂', '🚶', '🌊'], 2, ('pt', 'Marcha do Sal', ['1930']),
  'Em 1930, Gandhi marchou quase 400 km até o mar para fazer sal, desafiando o monopólio britânico.')
R('rosa_parks', ['🚌', '💺', '✊'], 2, ('pt', 'Rosa Parks', ['Montgomery']),
  'Em 1955, em Montgomery, Rosa Parks se recusou a ceder seu lugar no ônibus a um passageiro branco e foi presa; o boicote que se seguiu durou mais de um ano.')
R('tutancamon', ['👦', '👑', '⚱️'], 2, ('pt', 'Tutancâmon', ['Howard Carter']),
  'Tutancâmon virou faraó por volta dos 9 anos; sua tumba, quase intacta, foi encontrada por Howard Carter em 1922.')
R('marie_curie', ['☢️', '🧪', '🏅', '🏅'], 2, ('pt', 'Marie Curie', ['Nobel']),
  'Marie Curie foi a primeira pessoa a ganhar dois prêmios Nobel: o de Física, em 1903, e o de Química, em 1911.')
R('pasteur', ['🥛', '🔥', '🦠'], 2, ('pt', 'Pasteurização', ['Pasteur']),
  'A pasteurização, que aquece o alimento para matar micróbios, leva o nome de Louis Pasteur.')
R('fleming', ['🧫', '🍄', '💊'], 2, ('pt', 'Penicilina', ['Fleming']),
  'Em 1928, Fleming notou que um mofo tinha matado as bactérias ao seu redor numa placa esquecida no laboratório; a substância que o mofo produzia ganhou o nome de penicilina.')
R('marco_polo', ['🐫', '🏯', '📖'], 2, ('pt', 'Marco Polo', ['Kublai']),
  'As viagens de Marco Polo à China de Kublai Khan foram contadas no livro que ele ditou na prisão, em Gênova.', k='De Veneza à China')
R('lincoln', ['🎩', '🧔', '📜', '⛓️'], 2, ('pt', 'Proclamação de Emancipação', ['1863']),
  'Em 1863, Lincoln assinou a Proclamação de Emancipação, que declarava livres os escravizados dos estados rebeldes.')
R('zumbi', ['⛰️', '✊', '⛓️'], 2, ('pt', 'Zumbi dos Palmares', ['Palmares']),
  'Zumbi liderou o Quilombo dos Palmares, na serra da Barriga, em Alagoas; morreu em 20 de novembro de 1695, data do Dia da Consciência Negra.', k='Um quilombo na serra')
R('mlk', ['🎤', '💭', '🕊️'], 2, ('pt', 'I Have a Dream', ['1963']),
  "O discurso 'Eu tenho um sonho' foi feito em 1963, diante de cerca de 250 mil pessoas, em Washington.")
R('gengis', ['🐎', '🏹', '⛺'], 2, ('pt', 'Gengis Khan', ['1206']),
  'Gengis Khan uniu as tribos mongóis e fundou, em 1206, o império que se tornaria o maior território contínuo da história.', k='Mongólia, 1206')
R('princesa_isabel', ['✍️', '⛓️', '🕊️'], 2, ('pt', 'Lei Áurea', ['1888']),
  'Em 13 de maio de 1888, a princesa Isabel assinou a Lei Áurea, que aboliu a escravidão no Brasil.', k='13 de maio de 1888')

# d3
R('amundsen', ['🛷', '🐕', '❄️', '🏁'], 3, ('pt', 'Roald Amundsen', ['Polo Sul']),
  'Amundsen chegou ao Polo Sul em dezembro de 1911, com trenós puxados por cães, um mês antes do britânico Robert Scott.')
R('camoes', ['🚢', '💥', '🏊', '📜'], 3, ('pt', 'Luís de Camões', ['Mekong']),
  'Conta-se que Camões sobreviveu a um naufrágio na foz do rio Mekong nadando com o manuscrito de Os Lusíadas.')
R('mansa_musa', ['👑', '🐪', '💰', '🕋'], 3, ('pt', 'Mansa Musa', ['Meca']),
  'Na peregrinação a Meca, em 1324, Mansa Mussa gastou tanto ouro no Cairo que o preço do metal caiu por anos.')
c.write()

# ───────────────────────── Detalhes ─────────────────────────
c = Cat('detalhes', 'Detalhes', '🔍', 'Rostos famosos de perto', '#8A5A2B', order=71)
EYES, FACE, BEARD = 'De quem é este olhar?', 'De quem é este rosto?', 'De quem é esta barba?'
def D(who, name, wrong, x, y, d, src, xx, z=3, t=FACE):
    c.DT(who, name, wrong, x=x, y=y, z=z, d=d, t=t, src=src, x_=xx)

# d1
D('frida', 'Frida Kahlo', ['Tarsila do Amaral', 'Clarice Lispector', 'Simone de Beauvoir', 'Rosa Parks', 'Madre Teresa de Calcutá'],
  50, 25, 1, ('pt', 'Frida Kahlo', ['autorretratos']), 'Frida Kahlo pintou dezenas de autorretratos; as sobrancelhas unidas eram uma marca que ela nunca quis disfarçar.', t=EYES)
D('einstein', 'Albert Einstein', ['Sigmund Freud', 'Nikola Tesla', 'Niels Bohr', 'Thomas Edison', 'Charles Darwin'],
  50, 25, 1, ('pt', 'Albert Einstein', ['1921']), 'Einstein ganhou o Nobel de Física de 1921 pela explicação do efeito fotoelétrico, não pela relatividade.', t=EYES)
D('gandhi', 'Mahatma Gandhi', ['Ho Chi Minh', 'Nelson Mandela', 'Hailé Selassié', 'Mustafa Kemal Atatürk', 'Martin Luther King Jr.'],
  50, 25, 1, ('pt', 'Mahatma Gandhi', ['África do Sul']), 'Gandhi estudou Direito em Londres e viveu mais de 20 anos na África do Sul antes de liderar a luta pela independência da Índia.')
D('churchill', 'Winston Churchill', ['Franklin D. Roosevelt', 'Charles de Gaulle', 'Otto von Bismarck', 'Woodrow Wilson', 'Getúlio Vargas'],
  50, 25, 1, ('pt', 'Winston Churchill', ['Nobel de Literatura']), 'Churchill também ganhou um Nobel: o de Literatura, em 1953.')

# d2
D('van_gogh', 'Vincent van Gogh', ['Claude Monet', 'Rembrandt', 'Francisco de Goya', 'Piotr Tchaikovsky', 'Friedrich Nietzsche'],
  40, 30, 2, ('pt', 'Vincent van Gogh', ['autorretratos']), 'Van Gogh pintou mais de 35 autorretratos, em boa parte porque não tinha dinheiro para pagar modelos.', t=EYES)
D('lincoln', 'Abraham Lincoln', ['Dom Pedro II', 'Karl Marx', 'Charles Darwin', 'Thomas Jefferson', 'Liev Tolstói'],
  50, 55, 2, ('pt', 'Abraham Lincoln', ['Grace Bedell']), 'Lincoln deixou a barba crescer depois de eleito, em 1860, a conselho de uma menina de 11 anos, Grace Bedell, que lhe escreveu uma carta.', t=BEARD)
D('dali', 'Salvador Dalí', ['Pablo Picasso', 'Charlie Chaplin', 'Santos Dumont', 'Albert Einstein', 'Friedrich Nietzsche'],
  50, 55, 2, ('pt', 'A Persistência da Memória', ['1931']), 'Dalí pintou A Persistência da Memória, a dos relógios moles, em 1931.', t='De quem é este bigode?')
D('che', 'Che Guevara', ['Fidel Castro', 'Simón Bolívar', 'José de San Martín', 'Ho Chi Minh', 'Vladimir Lênin'],
  50, 25, 2, ('pt', 'Guerrillero Heroico', ['Korda']), 'A foto mais famosa de Che, o Guerrillero Heroico, foi tirada por Alberto Korda em Havana, em 1960.', t=EYES)
D('elizabeth_i', 'Elizabeth I', ['Maria Antonieta', 'Rainha Vitória', 'Isabel I de Castela', 'Catarina, a Grande', 'Maria Teresa'],
  50, 40, 2, ('pt', 'Isabel I de Inglaterra', ['Virgínia']), 'Elizabeth I nunca se casou e foi chamada de Rainha Virgem; a colônia da Virgínia ganhou o nome em sua homenagem.')
D('luis_xiv', 'Luís XIV', ['Napoleão Bonaparte', 'Henrique VIII', 'Pedro, o Grande', 'Frederico, o Grande', 'Filipe II'],
  50, 25, 2, ('pt', 'Luís XIV de França', ['1643', '1715']), 'Luís XIV reinou 72 anos, de 1643 a 1715: o reinado mais longo da história da França e um dos mais longos do mundo.')
D('mozart', 'Wolfgang Amadeus Mozart', ['Ludwig van Beethoven', 'Johann Sebastian Bach', 'Frédéric Chopin', 'Piotr Tchaikovsky', 'Heitor Villa-Lobos'],
  50, 25, 2, ('pt', 'Wolfgang Amadeus Mozart', ['600']), 'Mozart compôs suas primeiras peças aos 5 anos e deixou mais de 600 obras em 35 anos de vida.')
D('beethoven', 'Ludwig van Beethoven', ['Wolfgang Amadeus Mozart', 'Johann Sebastian Bach', 'Frédéric Chopin', 'Piotr Tchaikovsky', 'Victor Hugo'],
  50, 25, 2, ('pt', 'Sinfonia n.º 9 (Beethoven)', ['surdo']), 'Quando a Nona Sinfonia estreou, em 1824, Beethoven já estava praticamente surdo.', t=EYES)
D('maria_antonieta', 'Maria Antonieta', ['Elizabeth I', 'Rainha Vitória', 'Maria Teresa', 'Catarina, a Grande', 'Dona Leopoldina'],
  50, 25, 2, ('pt', 'Maria Antonieta', ['Viena']), 'Maria Antonieta nasceu em Viena: era filha da imperatriz Maria Teresa da Áustria.')
D('santos_dumont', 'Santos Dumont', ['Oswaldo Cruz', 'Barão do Rio Branco', 'Getúlio Vargas', 'Machado de Assis', 'Marechal Rondon'],
  50, 25, 2, ('pt', 'Santos Dumont', ['Cartier']), 'Santos Dumont pediu ao amigo Louis Cartier um relógio que pudesse ver sem tirar as mãos dos controles: assim ajudou a popularizar o relógio de pulso.')
D('freud', 'Sigmund Freud', ['Karl Marx', 'Charles Darwin', 'Albert Einstein', 'Friedrich Nietzsche', 'Louis Pasteur'],
  50, 25, 2, ('pt', 'Sigmund Freud', ['Londres']), 'Freud fugiu de Viena para Londres em 1938, depois da anexação da Áustria pela Alemanha nazista.', t=EYES)
D('marx', 'Karl Marx', ['Charles Darwin', 'Friedrich Nietzsche', 'Vladimir Lênin', 'Liev Tolstói', 'Dom Pedro II'],
  50, 35, 2, ('pt', 'Karl Marx', ['Londres']), 'Marx viveu em Londres de 1849 até morrer, em 1883; lá escreveu O Capital e lá está enterrado.', z=3.5)

# d3
D('napoleao', 'Napoleão Bonaparte', ['Luís XIV', 'Duque de Wellington', 'Maximilien Robespierre', 'Horatio Nelson', 'Frederico, o Grande'],
  50, 40, 3, ('pt', 'Napoleão Bonaparte', ['altura']), 'Napoleão não era baixinho: media cerca de 1,69 m, um pouco acima da média dos franceses da época; a fama vem da confusão entre polegadas francesas e inglesas e das caricaturas britânicas.')
D('shakespeare', 'William Shakespeare', ['Miguel de Cervantes', 'Luís de Camões', 'Galileu Galilei', 'Johannes Kepler', 'René Descartes'],
  60, 30, 3, ('pt', 'Retrato Chandos', ['Shakespeare']), 'O brinco de ouro aparece no Retrato Chandos, que talvez seja o único pintado com Shakespeare ainda vivo.')
D('henrique_viii', 'Henrique VIII', ['Luís XIV', 'Filipe II', 'Carlos V', 'Ricardo Coração de Leão', 'Guilherme, o Conquistador'],
  40, 30, 3, ('pt', 'Henrique VIII de Inglaterra', ['Ana Bolena']), 'Henrique VIII se casou seis vezes e rompeu com o papa para poder anular o primeiro casamento.')
D('newton', 'Isaac Newton', ['Gottfried Leibniz', 'René Descartes', 'Johannes Kepler', 'Galileu Galilei', 'Blaise Pascal'],
  50, 25, 3, ('pt', 'Isaac Newton', ['Casa da Moeda']), 'Newton também dirigiu a Casa da Moeda inglesa, onde caçou falsificadores, e presidiu a Royal Society.', t=EYES)
D('picasso', 'Pablo Picasso', ['Salvador Dalí', 'Candido Portinari', 'Claude Monet', 'Franz Kafka', 'Ernest Hemingway'],
  50, 40, 3, ('pt', 'Guernica (pintura)', ['1937']), 'Picasso pintou Guernica em 1937, depois do bombardeio da cidade basca na Guerra Civil Espanhola.')
D('tesla', 'Nikola Tesla', ['Thomas Edison', 'Albert Einstein', 'Sigmund Freud', 'Henry Ford', 'Alexander Fleming'],
  50, 40, 3, ('pt', 'Tesla (unidade)', ['Nikola Tesla']), 'O tesla, unidade de densidade de fluxo magnético do Sistema Internacional, leva o seu nome.')
D('victor_hugo', 'Victor Hugo', ['Charles Dickens', 'Liev Tolstói', 'Fiódor Dostoiévski', 'Mark Twain', 'Machado de Assis'],
  50, 25, 3, ('pt', 'Victor Hugo', ['Os Miseráveis']), 'Victor Hugo escreveu Os Miseráveis e O Corcunda de Notre-Dame; cerca de 2 milhões de pessoas acompanharam seu funeral, em Paris, em 1885.', t=EYES)
D('rembrandt', 'Rembrandt', ['Johannes Vermeer', 'Diego Velázquez', 'Albrecht Dürer', 'Francisco de Goya', 'Rafael Sanzio'],
  50, 25, 3, ('pt', 'Rembrandt', ['autorretratos']), 'Rembrandt pintou cerca de 40 autorretratos a óleo, da juventude à velhice.', t=EYES)
D('darwin', 'Charles Darwin', ['Karl Marx', 'Liev Tolstói', 'Gregor Mendel', 'Louis Pasteur', 'Charles Dickens'],
  50, 40, 3, ('pt', 'Charles Darwin', ['Beagle']), 'A barba famosa veio tarde: Darwin só a deixou crescer depois dos 50 anos, por volta de 1862. Nos retratos de quando voltou da viagem do Beagle, aparece sem barba.')

# d4
D('dom_pedro_ii', 'Dom Pedro II', ['Karl Marx', 'Charles Darwin', 'Abraham Lincoln', 'Liev Tolstói', 'Dom Pedro I'],
  50, 55, 4, ('pt', 'Pedro II do Brasil', ['Maioridade']), 'Dom Pedro II assumiu o trono aos 14 anos, em 1840, com o Golpe da Maioridade.', t=BEARD)
D('michelangelo', 'Michelangelo', ['Leonardo da Vinci', 'Rafael Sanzio', 'Sandro Botticelli', 'Albrecht Dürer', 'Galileu Galilei'],
  50, 55, 4, ('pt', 'Teto da Capela Sistina', ['1508', '1512']), 'Michelangelo passou quatro anos, de 1508 a 1512, pintando o teto da Capela Sistina.', t=BEARD)

# a second sitting: more faces, more of them from the last two centuries
D('nietzsche', 'Friedrich Nietzsche', ['Karl Marx', 'Sigmund Freud', 'Otto von Bismarck', 'Charles Darwin', 'Liev Tolstói'],
  50, 55, 2, ('pt', 'Friedrich Nietzsche', ['Basileia']), 'Nietzsche virou professor de filologia na Universidade da Basileia com apenas 24 anos.', t='De quem é este bigode?')
D('mandela', 'Nelson Mandela', ['Martin Luther King Jr.', 'Hailé Selassié', 'Mahatma Gandhi', 'Toussaint Louverture', 'Ho Chi Minh'],
  50, 55, 2, ('pt', 'Nelson Mandela', ['1994']), 'Mandela passou 27 anos preso e, em 1994, foi eleito o primeiro presidente negro da África do Sul.', t=EYES)
D('kennedy', 'John F. Kennedy', ['Franklin D. Roosevelt', 'Woodrow Wilson', 'Juscelino Kubitschek', 'Charles de Gaulle', 'Winston Churchill'],
  50, 55, 2, ('pt', 'John F. Kennedy', ['1917']), 'Kennedy foi o primeiro presidente americano nascido no século XX e, aos 43 anos, o mais jovem eleito.', t='De quem é este sorriso?')
D('tolstoi', 'Liev Tolstói', ['Fiódor Dostoiévski', 'Karl Marx', 'Charles Darwin', 'Dom Pedro II', 'Victor Hugo'],
  50, 25, 2, ('pt', 'Guerra e Paz', ['Tolstói']), 'Guerra e Paz, de Tolstói, tem centenas de personagens e passa pela invasão da Rússia por Napoleão, em 1812.', t=BEARD)
D('fidel', 'Fidel Castro', ['Che Guevara', 'Karl Marx', 'Ho Chi Minh', 'Vladimir Lênin', 'Simón Bolívar'],
  50, 55, 2, ('pt', 'Fidel Castro', ['1959']), 'Fidel Castro governou Cuba por quase cinquenta anos, de 1959 a 2008.', t=BEARD)
D('marie_curie', 'Marie Curie', ['Florence Nightingale', 'Ada Lovelace', 'Rainha Vitória', 'Emmeline Pankhurst', 'Simone de Beauvoir'],
  50, 55, 2, ('pt', 'Marie Curie', ['radioativ']), 'Os cadernos de laboratório de Marie Curie ainda são radioativos e ficam guardados em caixas forradas de chumbo.', t=EYES)
D('anne_frank', 'Anne Frank', ['Frida Kahlo', 'Clarice Lispector', 'Simone de Beauvoir', 'Rosa Parks', 'Madre Teresa de Calcutá'],
  50, 40, 2, ('pt', 'Anne Frank', ['diário']), 'Anne Frank ganhou o diário no aniversário de 13 anos, em 1942, pouco antes de a família se esconder em Amsterdã.', t=EYES)
D('washington', 'George Washington', ['Thomas Jefferson', 'Benjamin Franklin', 'Abraham Lincoln', 'James Cook', 'Duque de Wellington'],
  50, 40, 2, ('pt', 'George Washington', ['1797']), 'Washington foi o primeiro presidente dos Estados Unidos e deixou o cargo por vontade própria, depois de dois mandatos, em 1797.', t=EYES)
D('de_gaulle', 'Charles de Gaulle', ['Winston Churchill', 'Franklin D. Roosevelt', 'Getúlio Vargas', 'Mustafa Kemal Atatürk', 'Juscelino Kubitschek'],
  50, 25, 2, ('pt', 'Apelo de 18 de Junho', ['BBC']), 'Em 18 de junho de 1940, De Gaulle falou pela rádio BBC, de Londres, chamando os franceses a resistir à ocupação alemã.')
D('galileu', 'Galileu Galilei', ['Johannes Kepler', 'Nicolau Copérnico', 'Leonardo da Vinci', 'Isaac Newton', 'Michelangelo'],
  50, 55, 2, ('pt', 'Luas galileanas', ['1610']), 'Galileu descobriu as quatro maiores luas de Júpiter em 1610; hoje elas são chamadas de luas galileanas.', t=EYES)
D('machado', 'Machado de Assis', ['Carlos Drummond de Andrade', 'Oswaldo Cruz', 'Luís Gama', 'Dom Pedro II', 'José do Patrocínio'],
  50, 25, 2, ('pt', 'Academia Brasileira de Letras', ['1897']), 'Machado de Assis foi um dos fundadores da Academia Brasileira de Letras, em 1897, e seu primeiro presidente.', t='De quem são estes óculos?')
D('lenin', 'Vladimir Lênin', ['Karl Marx', 'Ho Chi Minh', 'Mikhail Gorbachev', 'Fidel Castro', 'Liev Tolstói'],
  50, 40, 3, ('pt', 'Mausoléu de Lenin', ['Praça Vermelha']), 'Vladimir Ilitch Ulianov adotou o pseudônimo Lênin; seu corpo embalsamado fica exposto num mausoléu na Praça Vermelha, em Moscou.', t=EYES)
D('mlk', 'Martin Luther King Jr.', ['Nelson Mandela', 'John F. Kennedy', 'Hailé Selassié', 'Abraham Lincoln', 'Mahatma Gandhi'],
  50, 40, 3, ('pt', 'Martin Luther King Jr.', ['Nobel']), 'Martin Luther King Jr. recebeu o Nobel da Paz em 1964, aos 35 anos.', t=EYES)
D('dickens', 'Charles Dickens', ['Victor Hugo', 'Mark Twain', 'Liev Tolstói', 'Charles Darwin', 'Fiódor Dostoiévski'],
  50, 40, 3, ('pt', 'Charles Dickens', ['Oliver Twist']), 'Muitos romances de Dickens, como Oliver Twist, saíram primeiro em capítulos, em revistas, e os leitores esperavam ansiosos pelo próximo.', t=BEARD)
D('pasteur', 'Louis Pasteur', ['Charles Darwin', 'Gregor Mendel', 'Alexander Fleming', 'Karl Marx', 'Sigmund Freud'],
  50, 40, 3, ('pt', 'Louis Pasteur', ['raiva']), 'Em julho de 1885, Pasteur tratou com sua vacina contra a raiva Joseph Meister, um menino de 9 anos mordido por um cão raivoso; o menino sobreviveu, e o caso tornou a vacina famosa.')
D('hemingway', 'Ernest Hemingway', ['George Orwell', 'Mark Twain', 'Franz Kafka', 'Charlie Chaplin', 'Gabriel García Márquez'],
  50, 25, 3, ('pt', 'Ernest Hemingway', ['1954']), 'Hemingway dirigiu ambulâncias na Primeira Guerra e ganhou o Nobel de Literatura em 1954.', t='De quem é este bigode?')
D('victoria', 'Rainha Vitória', ['Elizabeth I', 'Maria Antonieta', 'Catarina, a Grande', 'Maria Teresa', 'Dona Leopoldina'],
  50, 40, 3, ('pt', 'Vitória do Reino Unido', ['1837', '1901']), 'A Rainha Vitória reinou 63 anos, de 1837 a 1901, e deu nome a toda uma época: a era vitoriana.', t=EYES)
D('catarina_grande', 'Catarina, a Grande', ['Maria Antonieta', 'Maria Teresa', 'Elizabeth I', 'Rainha Vitória', 'Isabel I de Castela'],
  50, 40, 3, ('pt', 'Catarina II da Rússia', ['Pedro III']), 'Catarina, a Grande, nasceu princesa alemã e subiu ao trono da Rússia em 1762, num golpe contra o próprio marido, Pedro III.')
D('gagarin', 'Yuri Gagarin', ['Neil Armstrong', 'Mikhail Gorbachev', 'Alan Turing', 'John F. Kennedy', 'Charles de Gaulle'],
  50, 40, 3, ('pt', 'Yuri Gagarin', ['1961']), 'Yuri Gagarin tinha 27 anos quando se tornou o primeiro ser humano a ir ao espaço, em 1961.', t=EYES)
D('getulio', 'Getúlio Vargas', ['Juscelino Kubitschek', 'Marechal Deodoro', 'Barão do Rio Branco', 'Santos Dumont', 'Oswaldo Cruz'],
  50, 25, 3, ('pt', 'Consolidação das Leis do Trabalho', ['1943']), 'Getúlio Vargas criou a CLT, a Consolidação das Leis do Trabalho, em 1943.', t=EYES)
D('niemeyer', 'Oscar Niemeyer', ['Juscelino Kubitschek', 'Carlos Drummond de Andrade', 'Candido Portinari', 'Heitor Villa-Lobos', 'Paulo Freire'],
  50, 25, 3, ('pt', 'Oscar Niemeyer', ['105']), 'Niemeyer viveu até quase 105 anos e continuou projetando até o fim da vida.')
D('bolivar', 'Simón Bolívar', ['José de San Martín', 'Toussaint Louverture', 'Napoleão Bonaparte', 'Duque de Caxias', 'Marechal Deodoro'],
  50, 25, 4, ('pt', 'Simón Bolívar', ['Bolívia']), 'A Bolívia ganhou o nome em homenagem a Simón Bolívar, o Libertador.')
c.write()

# ───────────────────────── O intruso ─────────────────────────
c = Cat('intrusos', 'O intruso', '🧐', 'Três têm algo em comum', '#2E6B5E', order=72)
def O(a, tiles, k, d, src, x=None):
    c.OD(a, tiles, k, d=d, src=src, x=x)
def OT(a, tiles, k, d, src, x=None):
    c.OD(a, tiles, k, d=d, typ='txt', src=src, x=x)

# d1
O('pericles', ['cesar', 'augusto', 'nero', 'pericles'], 'governaram Roma', 1, ('pt', 'Péricles', ['Atenas']),
  'Péricles governou Atenas, no século V a.C.; os outros três mandaram em Roma.')
O('picasso', ['newton', 'einstein', 'darwin', 'picasso'], 'foram cientistas', 1, ('pt', 'Pablo Picasso', ['pintor']))
O('rembrandt', ['mozart', 'beethoven', 'bach', 'rembrandt'], 'foram compositores', 1, ('pt', 'Rembrandt', ['pintor']))
O('gutenberg', ['vasco_gama', 'cabral', 'magalhaes', 'gutenberg'], 'foram navegadores portugueses', 1, ('pt', 'Johannes Gutenberg', ['imprensa']),
  'Gutenberg, alemão, criou na Europa a prensa de tipos móveis; Magalhães, português, navegou a serviço da Espanha.')
O('getulio', ['dom_pedro_i', 'dom_pedro_ii', 'dom_joao_vi', 'getulio'], 'usaram coroa: foram reis ou imperadores', 1, ('pt', 'Getúlio Vargas', ['presidente']))
O('marie_curie', ['cleopatra', 'elizabeth_i', 'catarina_grande', 'marie_curie'], 'foram rainhas ou imperatrizes', 1, ('pt', 'Marie Curie', ['Nobel']))
O('chopin', ['van_gogh', 'monet', 'picasso', 'chopin'], 'foram pintores', 1, ('pt', 'Frédéric Chopin', ['compositor']))
O('confucio', ['socrates', 'platao', 'aristoteles', 'confucio'], 'foram filósofos da Grécia antiga', 1, ('pt', 'Confúcio', ['China']))
O('hamurabi', ['ramses_ii', 'tutancamon', 'aquenaton', 'hamurabi'], 'foram faraós do Egito', 1, ('pt', 'Hamurabi', ['Babilônia']),
  'Hamurabi foi rei da Babilônia, na Mesopotâmia, e é lembrado por seu código de leis.')
O('tarsila', ['machado', 'clarice', 'drummond', 'tarsila'], 'foram escritores brasileiros', 1, ('pt', 'Tarsila do Amaral', ['pintora']))
O('luis_xiv', ['henrique_viii', 'elizabeth_i', 'victoria', 'luis_xiv'], 'reinaram na Inglaterra', 1, ('pt', 'Luís XIV de França', ['França']))

# d2
O('velazquez', ['shakespeare', 'cervantes', 'camoes', 'velazquez'], 'foram escritores', 2, ('pt', 'Diego Velázquez', ['pintor']))
O('churchill', ['kennedy', 'mlk', 'gandhi', 'churchill'], 'foram assassinados', 2, ('pt', 'Winston Churchill', ['1965']),
  'Churchill morreu de causas naturais, em 1965, aos 90 anos.')
O('cortes', ['bolivar', 'san_martin', 'toussaint', 'cortes'], 'lideraram lutas de libertação na América Latina', 2, ('pt', 'Hernán Cortés', ['astecas']),
  'Hernán Cortés fez o caminho oposto: conquistou o Império Asteca para a Espanha, no século XVI.')
O('darwin', ['edison', 'tesla', 'santos_dumont', 'darwin'], 'foram inventores', 2, ('pt', 'Charles Darwin', ['naturalista']),
  'Darwin foi naturalista: não inventou máquinas, mas explicou a evolução das espécies pela seleção natural.')
O('leonidas', ['ciro', 'dario', 'xerxes', 'leonidas'], 'foram reis da Pérsia', 2, ('pt', 'Leónidas I', ['Termópilas']),
  'Leônidas foi rei de Esparta e morreu nas Termópilas, em 480 a.C., lutando contra o exército persa de Xerxes.')
O('lutero', ['voltaire', 'rousseau', 'montesquieu', 'lutero'], 'foram pensadores do Iluminismo, no século XVIII', 2, ('pt', 'Martinho Lutero', ['Reforma']),
  'Lutero viveu dois séculos antes: foi o líder da Reforma Protestante, no século XVI.')
O('duque_caxias', ['luis_gama', 'patrocinio', 'zumbi', 'duque_caxias'], 'lutaram contra a escravidão no Brasil', 2, ('pt', 'Luís Alves de Lima e Silva', ['Exército']),
  'O Duque de Caxias foi militar do Império e é o patrono do Exército Brasileiro.')
O('goya', ['leonardo', 'michelangelo', 'botticelli', 'goya'], 'foram artistas do Renascimento italiano', 2, ('pt', 'Francisco de Goya', ['espanhol']),
  'Goya foi um pintor espanhol que viveu entre os séculos XVIII e XIX, bem depois do Renascimento.')
O('franklin', ['washington', 'lincoln', 'kennedy', 'franklin'], 'foram presidentes dos Estados Unidos', 2, ('pt', 'Benjamin Franklin', ['Independência']),
  'Benjamin Franklin assinou a Declaração de Independência, mas nunca foi presidente.')
O('toussaint', ['mandela', 'haile_selassie', 'shaka', 'toussaint'], 'nasceram na África', 2, ('pt', 'Toussaint Louverture', ['Haiti']),
  'Toussaint Louverture nasceu em São Domingos, a colônia francesa que viria a ser o Haiti.')
O('gandhi', ['marx', 'lenin', 'fidel', 'gandhi'], 'defenderam o comunismo', 2, ('pt', 'Mahatma Gandhi', ['não violência']))
O('frida', ['marie_curie', 'ada_lovelace', 'hipacia', 'frida'], 'dedicaram a vida à ciência ou à matemática', 2, ('pt', 'Frida Kahlo', ['pintora']))
O('carlos_magno', ['gengis', 'kublai', 'tamerlao', 'carlos_magno'], 'comandaram impérios nascidos nas estepes da Ásia', 2, ('pt', 'Carlos Magno', ['francos']),
  'Carlos Magno foi rei dos francos e, no ano 800, coroado imperador do Ocidente.')
O('thatcher', ['pedro_grande', 'catarina_grande', 'gorbachev', 'thatcher'], 'governaram a Rússia ou a União Soviética', 2, ('pt', 'Margaret Thatcher', ['Reino Unido']),
  'Margaret Thatcher governou o Reino Unido como primeira-ministra, de 1979 a 1990.')
O('rio_branco', ['getulio', 'jk', 'deodoro', 'rio_branco'], 'foram presidentes do Brasil', 2, ('pt', 'José Paranhos, Barão do Rio Branco', ['chanceler']),
  'O Barão do Rio Branco foi diplomata e ministro das Relações Exteriores; resolveu por negociação e arbitragem várias disputas de fronteira do Brasil, como a do Acre.')

# d3
O('dom_pedro_i', ['santos_dumont', 'machado', 'niemeyer', 'dom_pedro_i'], 'nasceram no Brasil', 3, ('pt', 'Pedro I do Brasil', ['Queluz']),
  'Dom Pedro I nasceu em Portugal, no Palácio de Queluz, perto de Lisboa, e veio para o Brasil aos 9 anos, com a corte.')
O('freud', ['einstein', 'niels_bohr', 'fleming', 'freud'], 'ganharam o Prêmio Nobel', 3, ('pt', 'Sigmund Freud', ['Nobel']),
  'Freud foi indicado ao Nobel muitas vezes, mas nunca ganhou.')

# ── with words ──
OT('Coliseu', ['Pirâmide de Gizé', 'Farol de Alexandria', 'Colosso de Rodes', 'Coliseu'], 'estão entre as Sete Maravilhas do Mundo Antigo', 2,
   ('pt', 'Sete maravilhas do mundo antigo', ['Colosso de Rodes']), 'O Coliseu, de Roma, entrou em outra lista: a das Sete Maravilhas do Mundo Moderno, eleitas em 2007.')
OT('Gettysburg', ['Austerlitz', 'Waterloo', 'Iena', 'Gettysburg'], 'foram batalhas de Napoleão', 2,
   ('pt', 'Batalha de Gettysburg', ['1863']), 'Gettysburg foi uma batalha da Guerra de Secessão dos Estados Unidos, em 1863.')
OT('São Paulo', ['Salvador', 'Rio de Janeiro', 'Brasília', 'São Paulo'], 'são ou já foram capitais do Brasil', 1,
   ('pt', 'Capitais do Brasil', ['Salvador']), 'Salvador foi a capital de 1549 a 1763; o Rio, até 1960; desde então, Brasília.')
OT('Tenochtitlán', ['Machu Picchu', 'Cusco', 'Sacsayhuamán', 'Tenochtitlán'], 'ficam no Peru, no coração do antigo Império Inca', 3,
   ('pt', 'Tenochtitlán', ['astecas']), 'Tenochtitlán era a capital dos astecas; sobre ela foi construída a Cidade do México.')
OT('Batalha de Stalingrado', ['Crise dos Mísseis de Cuba', 'Queda do Muro de Berlim', 'Corrida espacial', 'Batalha de Stalingrado'], 'aconteceram durante a Guerra Fria', 2,
   ('pt', 'Batalha de Stalingrado', ['1942']), 'Stalingrado (1942–1943) foi uma batalha da Segunda Guerra Mundial, antes da Guerra Fria.')
OT('Inconfidência Mineira', ['Cabanagem', 'Sabinada', 'Balaiada', 'Inconfidência Mineira'], 'foram revoltas do Período Regencial', 3,
   ('pt', 'Período regencial', ['Cabanagem', 'Sabinada', 'Balaiada']), 'A Inconfidência Mineira foi descoberta em 1789, ainda no Brasil colônia, antes mesmo de a revolta começar.')
OT('Telescópio', ['Papel', 'Pólvora', 'Bússola', 'Telescópio'], 'são invenções da China antiga', 2,
   ('pt', 'Quatro Grandes Invenções', ['bússola', 'pólvora']), 'O telescópio surgiu na Holanda, em 1608; papel, pólvora, bússola e imprensa são as Quatro Grandes Invenções da China.')
OT('Mogóis', ['Astecas', 'Incas', 'Maias', 'Mogóis'], 'foram povos das Américas antes de Colombo', 1,
   ('pt', 'Império Mogol', ['Índia']), 'Os mogóis governaram a Índia a partir do século XVI; foram eles que construíram o Taj Mahal.')
OT('Júpiter', ['Zeus', 'Poseidon', 'Hermes', 'Júpiter'], 'são deuses gregos', 2,
   ('pt', 'Júpiter (mitologia)', ['Zeus']), 'Júpiter é o nome romano do deus que os gregos chamavam de Zeus.')
OT('Escrita cuneiforme', ['Hieróglifos', 'Papiro', 'Múmias', 'Escrita cuneiforme'], 'são marcas do Egito antigo', 2,
   ('pt', 'Escrita cuneiforme', ['Mesopotâmia']), 'A escrita cuneiforme nasceu na Mesopotâmia, gravada com estilete em tábuas de argila.')
OT('Mayflower', ['Santa María', 'Pinta', 'Niña', 'Mayflower'], 'foram navios da primeira viagem de Colombo', 2,
   ('pt', 'Mayflower', ['1620']), 'O Mayflower levou os peregrinos ingleses à América do Norte, em 1620.')
OT('Estados Unidos', ['Alemanha', 'Itália', 'Japão', 'Estados Unidos'], 'formaram o Eixo na Segunda Guerra Mundial', 1,
   ('pt', 'Potências do Eixo', ['Alemanha', 'Itália', 'Japão']), 'Os Estados Unidos lutaram do lado dos Aliados a partir de dezembro de 1941, depois do ataque japonês a Pearl Harbor.')
OT('Maria Stuart', ['Ana Bolena', 'Catarina de Aragão', 'Jane Seymour', 'Maria Stuart'], 'foram esposas de Henrique VIII', 3,
   ('pt', 'Maria I da Escócia', ['Elizabeth']), 'Maria Stuart foi rainha da Escócia e acabou executada em 1587, por ordem de Elizabeth I, filha de Henrique VIII.')
OT('Penso, logo existo', ['Vim, vi, venci', 'A sorte está lançada', 'Até tu, Brutus?', 'Penso, logo existo'], 'são frases atribuídas a Júlio César', 2,
   ('pt', 'Cogito, ergo sum', ['Descartes']), "'Penso, logo existo' é de René Descartes, filósofo francês do século XVII.")
OT('Lei Seca', ['Lei do Ventre Livre', 'Lei dos Sexagenários', 'Lei Áurea', 'Lei Seca'], 'foram leis contra a escravidão no Brasil', 2,
   ('pt', 'Lei Áurea', ['1888']), 'A Lei Seca proibiu as bebidas alcoólicas nos Estados Unidos, de 1920 a 1933. A Lei do Ventre Livre (1871) e a dos Sexagenários (1885) prepararam o caminho da Lei Áurea (1888).')
OT('O Nascimento de Vênus', ['Mona Lisa', 'A Última Ceia', 'A Dama com Arminho', 'O Nascimento de Vênus'], 'são obras de Leonardo da Vinci', 2,
   ('pt', 'O Nascimento de Vénus', ['Botticelli']), 'O Nascimento de Vênus é de Sandro Botticelli, pintado por volta de 1485.')
OT('A Ronda Noturna', ['Os Girassóis', 'A Noite Estrelada', 'Os Comedores de Batata', 'A Ronda Noturna'], 'foram pintados por Van Gogh', 3,
   ('pt', 'A Ronda Noturna', ['Rembrandt']), 'A Ronda Noturna é de Rembrandt, de 1642, mais de dois séculos antes de Van Gogh.')
OT('Dom Quixote', ['Hamlet', 'Romeu e Julieta', 'Macbeth', 'Dom Quixote'], 'são peças de Shakespeare', 1,
   ('pt', 'Dom Quixote', ['Cervantes']), 'Dom Quixote é o romance de Miguel de Cervantes; ele e Shakespeare morreram em 1616, com dias de diferença.')
OT('O Guarani', ['Dom Casmurro', 'Memórias Póstumas de Brás Cubas', 'Quincas Borba', 'O Guarani'], 'são romances de Machado de Assis', 2,
   ('pt', 'O Guarani', ['José de Alencar']), 'O Guarani é de José de Alencar, publicado em 1857.')
c.write()
