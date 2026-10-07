"""Século XX (1914-2000): guerras mundiais, revoluções, Guerra Fria, descolonização e corrida espacial — all formats in one pack."""
from qdsl import Cat

c = Cat('seculo20', 'Século XX', '📻', 'Guerras, revoluções e a corrida espacial', '#37474F', order=58)

# ── Texto: seis alternativas ──
c.T('Qual foi o último czar da Rússia, derrubado pela revolução de 1917?', 'Nicolau II',
    ['Alexandre III', 'Alexandre II', 'Nicolau I', 'Pedro III', 'Alexandre I'], d=1, crest='imperio_russo',
    src=('pt', 'Nicolau II da Rússia', ['1917', 'Ecaterimburgo']),
    x='Em julho de 1918, ele, a mulher e os cinco filhos foram fuzilados pelos bolcheviques em Ecaterimburgo, nos montes Urais.')
c.T('Qual campo, na Polônia ocupada, foi o maior centro de extermínio do Holocausto, onde morreram cerca de 1,1 milhão de pessoas?', 'Auschwitz',
    ['Dachau', 'Buchenwald', 'Bergen-Belsen', 'Theresienstadt', 'Ravensbrück'], d=1, flag='POL',
    src=('en', 'Auschwitz concentration camp', ['Birkenau', '27 January']),
    x='O Exército Vermelho libertou o campo em 27 de janeiro de 1945; a data é hoje o Dia Internacional em Memória das Vítimas do Holocausto.')
c.T('Em qual usina da Ucrânia soviética aconteceu, em 1986, o mais grave acidente nuclear da história?', 'Chernobil',
    ['Three Mile Island', 'Fukushima', 'Kursk', 'Zaporíjia', 'Angra'], d=1, flag='UKR',
    src=('pt', 'Acidente nuclear de Chernobil', ['1986']),
    x='A cidade vizinha de Pripyat, com quase 50 mil moradores, foi evacuada às pressas e nunca mais voltou a ser habitada.')
c.T('Qual cadela soviética foi o primeiro animal a entrar em órbita da Terra, em 1957?', 'Laika',
    ['Belka', 'Strelka', 'Ham', 'Félicette', 'Zvezdochka'], d=1, icon='rocket',
    src=('pt', 'Laika', ['Sputnik 2', '1957']),
    x='Ela viajou no Sputnik 2, numa missão sem volta; décadas depois, soube-se que morreu poucas horas após o lançamento.')
c.T('Qual programa americano, que entrou em vigor em 1948, financiou a reconstrução da Europa Ocidental depois da Segunda Guerra?', 'Plano Marshall',
    ['Plano Dawes', 'New Deal', 'Doutrina Monroe', 'Plano Young', 'Plano Schlieffen'], d=2, flag='USA',
    src=('en', 'Marshall Plan', ['1948']),
    x='Os EUA enviaram mais de 13 bilhões de dólares; a URSS proibiu os países sob sua influência de aceitar a ajuda.')
c.T('Qual campanha, lançada por Mao Tsé-tung em 1966, mobilizou jovens Guardas Vermelhos contra professores, intelectuais e "inimigos de classe"?', 'Revolução Cultural',
    ['Grande Salto Adiante', 'Longa Marcha', 'Campanha das Cem Flores', 'Movimento Quatro de Maio', 'Revolta dos Boxers'], d=2, crest='china_popular',
    src=('en', 'Cultural Revolution', ['1966', 'Red Guards']),
    x='Escolas e universidades ficaram fechadas por anos, e milhões de jovens das cidades foram mandados para o campo "aprender com os camponeses".')
c.T('Qual país do norte da África conquistou a independência da França em 1962, depois de oito anos de guerra?', 'Argélia',
    ['Marrocos', 'Tunísia', 'Líbia', 'Egito', 'Mauritânia'], d=3, flag='FRA',
    src=('en', 'Algerian War', ['1954', '1962']),
    x='A guerra derrubou a Quarta República francesa e trouxe Charles de Gaulle de volta ao poder, em 1958.')
c.T('Qual lei americana, assinada em 1964, proibiu a segregação racial nos lugares públicos e a discriminação no trabalho?', 'Lei dos Direitos Civis',
    ['Lei do Direito ao Voto', 'Proclamação de Emancipação', 'Décima Terceira Emenda', 'Lei Seca', 'Lei dos Escravos Fugitivos'], d=3, who='mlk',
    src=('en', 'Civil Rights Act of 1964', ['segregation', 'Johnson']),
    x='Quem a assinou foi Lyndon Johnson, que assumira a presidência depois do assassinato de Kennedy, em novembro de 1963.')
c.T('Qual presidente sul-africano libertou Nelson Mandela em 1990 e dividiu com ele o Nobel da Paz de 1993?', 'F. W. de Klerk',
    ['P. W. Botha', 'Jan Smuts', 'Hendrik Verwoerd', 'John Vorster', 'Desmond Tutu'], d=3, crest='africa_do_sul',
    src=('en', 'F. W. de Klerk', ['1990', 'Nobel']),
    x='Em 1994, nas primeiras eleições abertas a todas as raças, Mandela foi eleito presidente e De Klerk tornou-se um dos seus vice-presidentes.')
c.T('Ao longo de qual paralelo a Coreia foi dividida em 1945, entre uma zona soviética ao norte e uma americana ao sul?', 'Paralelo 38',
    ['Paralelo 17', 'Paralelo 49', 'Paralelo 42', 'Paralelo 33', 'Paralelo 24'], d=3, icon='map',
    src=('en', '38th parallel north', ['Korea', '1945']),
    x='A Guerra da Coreia (1950–1953) terminou só com um armistício, e a fronteira ficou perto da mesma linha, cercada por uma zona desmilitarizada.')
c.T('Qual tratado de 1918 tirou a Rússia bolchevique da Primeira Guerra, à custa de enormes perdas de território?', 'Tratado de Brest-Litovsk',
    ['Tratado de Versalhes', 'Tratado de Trianon', 'Tratado de Sèvres', 'Tratado de Rapallo', 'Tratado de Saint-Germain'], d=4, who='lenin',
    src=('en', 'Treaty of Brest-Litovsk', ['1918', 'Ukraine']),
    x='A Rússia abriu mão da Polônia, dos países bálticos, da Finlândia e da Ucrânia; o tratado foi anulado meses depois, com a derrota alemã.')
c.T('Qual telegrama alemão, interceptado pelos britânicos em 1917, propunha ao México uma aliança contra os Estados Unidos?', 'Telegrama Zimmermann',
    ['Telegrama Kruger', 'Despacho de Ems', 'Memorando Schlieffen', 'Telegrama Longo', 'Declaração Balfour'], d=4, flag='MEX',
    src=('en', 'Zimmermann Telegram', ['Mexico', '1917']),
    x='Em troca, o México recuperaria o Texas, o Novo México e o Arizona. A revelação da mensagem ajudou a levar os EUA à guerra, em abril de 1917.')
c.T('Qual conferência de 1955, na Indonésia, reuniu 29 países da Ásia e da África e é vista como precursora do Movimento dos Não Alinhados?', 'Conferência de Bandung',
    ['Conferência de Genebra', 'Conferência de Bretton Woods', 'Conferência de Potsdam', 'Conferência Tricontinental', 'Conferência de Belgrado'], d=5, icon='globe',
    src=('en', 'Bandung Conference', ['1955', 'Sukarno']),
    x='Entre os presentes estavam Nehru, da Índia, Nasser, do Egito, Zhou Enlai, da China, e o anfitrião, o presidente indonésio Sukarno.')
c.T('Qual grupo de estudantes de Munique espalhou panfletos contra o regime nazista e teve seus líderes executados em 1943?', 'Rosa Branca',
    ['Orquestra Vermelha', 'Piratas de Edelweiss', 'Círculo de Kreisau', 'Juventude Swing', 'Igreja Confessante'], d=5, flag='GER',
    src=('en', 'White Rose', ['Sophie Scholl', '1943']),
    x='Sophie Scholl, de 21 anos, e o irmão Hans foram presos ao distribuir panfletos na Universidade de Munique e executados quatro dias depois.')
c.T('Quem se tornou, em 1960, a primeira mulher do mundo eleita para chefiar um governo, como primeira-ministra do Ceilão?', 'Sirimavo Bandaranaike',
    ['Indira Gandhi', 'Golda Meir', 'Margaret Thatcher', 'Benazir Bhutto', 'Corazon Aquino'], d=5, who='pankhurst',
    src=('en', 'Sirimavo Bandaranaike', ['1960', 'Ceylon']),
    x='Ela entrou na política depois do assassinato do marido, também primeiro-ministro, em 1959, e governou o atual Sri Lanka em três períodos diferentes.')
c.T('Além do Brasil, qual país latino-americano mandou uma unidade de combate lutar fora das Américas na Segunda Guerra, o Esquadrão 201, de aviação de caça?', 'México',
    ['Argentina', 'Chile', 'Colômbia', 'Cuba', 'Venezuela'], d=5, icon='plane',
    src=('en', '201st Fighter Squadron', ['Philippines', 'P-47']),
    x='Os pilotos mexicanos voaram caças P-47 nas Filipinas, em 1945 — o mesmo avião do grupo de caça brasileiro do "Senta a Pua!", na Itália.')

# ── Personagens e estados ──
c.P('Qual líder revolucionário, morto em 1924, teve o corpo embalsamado e exposto num mausoléu na Praça Vermelha, em Moscou?', 'lenin', d=1, stad='kremlin',
    src=('en', "Lenin's Mausoleum", ['1924']),
    x='O mausoléu fica colado à muralha do Kremlin; o corpo passa por banhos químicos regulares para se conservar.')
c.P('Qual presidente americano prometeu, em 1961, levar um homem à Lua e trazê-lo de volta antes do fim da década?', 'kennedy', d=1, icon='rocket',
    src=('en', 'We choose to go to the Moon', ['Rice University']),
    x='O discurso mais lembrado sobre a meta foi feito na Universidade Rice, em Houston, em 1962: "Nós escolhemos ir à Lua".')
c.P('Qual primeira-ministra britânica comandou a guerra contra a Argentina pelas Ilhas Malvinas, em 1982?', 'thatcher', d=2, flag='ARG',
    src=('pt', 'Guerra das Malvinas', ['Thatcher', '1982']),
    x='O conflito durou 74 dias; a derrota apressou o fim da ditadura militar argentina, em 1983.')
c.C('Qual estado nasceu em dezembro de 1922, unindo a Rússia, a Ucrânia, a Bielorrússia e a Transcaucásia?', 'urss', d=1, who='lenin',
    src=('en', 'Treaty on the Creation of the Union of Soviet Socialist Republics', ['1922']),
    x='Chegou a reunir 15 repúblicas e cobria cerca de um sexto das terras do planeta; foi dissolvido em dezembro de 1991.')
c.C('Qual império se desfez em 1918, no fim da Primeira Guerra, dando origem a novos países como a Tchecoslováquia?', 'austria_hungria', d=2, flag='CZE',
    src=('pt', 'Áustria-Hungria', ['1918']),
    x='O império reunia mais de dez povos e línguas; o tiro que matou o seu herdeiro, em Sarajevo, foi o estopim da guerra que o destruiu.')
c.C('Qual império, fundado por volta de 1300, teve seu sultanato abolido em 1922, abrindo caminho para a república de Atatürk?', 'imperio_otomano', d=2, who='ataturk',
    src=('pt', 'Império Otomano', ['1922']),
    x='O último sultão, Mehmed VI, deixou Istambul a bordo de um navio de guerra britânico; o califado foi extinto em 1924.')
c.C('Qual estado invadiu a Etiópia em 1935 e, por isso, sofreu sanções da Liga das Nações?', 'italia_fascista', d=3, who='haile_selassie',
    src=('en', 'Second Italo-Ethiopian War', ['1935', 'League of Nations']),
    x='As sanções deixaram o petróleo de fora; em maio de 1936, o imperador partiu para o exílio e as tropas invasoras entraram em Adis Abeba.')

# ── Quem sou eu? ──
c.Q('Quem sou eu?', 'fdr', ['Nasci em 1882 numa família rica do estado de Nova York.',
                            'Em 1921, uma doença me tirou o movimento das pernas, mas não me impediu de chegar à presidência.',
                            'Enfrentei a Grande Depressão com um pacote de programas chamado New Deal.',
                            'Fui o único presidente do meu país eleito quatro vezes.'], 2,
    src=('en', 'Franklin D. Roosevelt', ['New Deal', '1882']))
c.Q('Quem sou eu?', 'de_gaulle', ['Fui ferido e feito prisioneiro em Verdun, na Primeira Guerra.',
                                  'Em junho de 1940, falei de Londres pelo rádio e chamei meus compatriotas a continuar lutando.',
                                  'Fundei uma nova República em 1958 e a presidi por mais de dez anos.',
                                  'O maior aeroporto de Paris leva o meu nome.'], 2,
    src=('en', 'Charles de Gaulle', ['Verdun', '1958']))
c.Q('Quem sou eu?', 'ataturk', ['Nasci em 1881 em Salônica, cidade que hoje pertence à Grécia.',
                                'Em 1915, comandei tropas que barraram o desembarque aliado em Galípoli.',
                                'Troquei o alfabeto árabe pelo latino e dei às mulheres do meu país o direito de votar.',
                                'O parlamento me deu um sobrenome que significa "pai dos turcos".'], 3,
    src=('en', 'Mustafa Kemal Atatürk', ['Gallipoli', '1881']))

# ── Linha do tempo ──
c.O('Coloque estes marcos da Segunda Guerra Mundial em ordem, do mais antigo ao mais recente?', [
    ('polonia', 'Invasão da Polônia', 'A Alemanha ataca e a guerra começa', 1939, {'flag': 'POL'}),
    ('pearl', 'Ataque a Pearl Harbor', 'Os EUA entram na guerra', 1941, {'flag': 'USA'}),
    ('stalingrado', 'Rendição em Stalingrado', 'O VI Exército alemão se entrega', 1943, {'crest': 'urss'}),
    ('diad', 'Dia D', 'Desembarque aliado na Normandia', 1944, {'flag': 'FRA'}),
    ('hiroshima', 'Bomba de Hiroshima', 'O Japão se rende dias depois', 1945, {'flag': 'JPN'})], d=2,
    src=('pt', 'Segunda Guerra Mundial', ['Pearl Harbor', 'Stalingrado']))
c.O('Coloque estes acontecimentos em ordem, do mais antigo ao mais recente?', [
    ('sarajevo', 'Atentado de Sarajevo', 'Morre o herdeiro austro-húngaro', 1914, {'crest': 'austria_hungria'}),
    ('outubro', 'Revolução de Outubro', 'Os bolcheviques tomam o poder', 1917, {'face': 'lenin'}),
    ('versalhes', 'Tratado de Versalhes', 'A paz imposta à Alemanha', 1919, {'face': 'wilson'}),
    ('roma', 'Marcha sobre Roma', 'Mussolini chega ao poder', 1922, {'crest': 'italia_fascista'}),
    ('crash', 'Quebra da Bolsa de Nova York', 'Começa a Grande Depressão', 1929, {'flag': 'USA'})], d=2,
    src=('en', 'Interwar period', ['1919', '1929']))
c.O('Coloque estes marcos da corrida espacial em ordem, do mais antigo ao mais recente?', [
    ('sputnik', 'Sputnik 1', 'O primeiro satélite artificial', 1957, {'crest': 'urss'}),
    ('gagarin', 'Voo de Gagarin', 'O primeiro ser humano no espaço', 1961, {'face': 'gagarin'}),
    ('leonov', 'Primeira caminhada espacial', 'Alexei Leonov sai da nave em órbita', 1965, {'crest': 'urss'}),
    ('apollo', 'Apollo 11', 'Os primeiros passos na Lua', 1969, {'face': 'armstrong'}),
    ('mir', 'Estação Mir', 'O primeiro módulo entra em órbita', 1986, {'crest': 'urss'})], d=3,
    src=('en', 'Space Race', ['Sputnik', 'Leonov']))
c.O('Do mais antigo ao mais recente, em que ordem estes líderes chegaram ao poder?', [
    ('lenin', 'Lênin', 'Assume o governo da Rússia', 1917, {'face': 'lenin'}),
    ('ataturk', 'Atatürk', 'Primeiro presidente da Turquia', 1923, {'face': 'ataturk'}),
    ('fdr', 'Franklin D. Roosevelt', 'Toma posse na Casa Branca', 1933, {'face': 'fdr'}),
    ('churchill', 'Winston Churchill', 'Vira primeiro-ministro em plena guerra', 1940, {'face': 'churchill'}),
    ('degaulle', 'Charles de Gaulle', 'Primeiro presidente da Quinta República', 1959, {'face': 'de_gaulle'})], d=4,
    src=('en', 'Mustafa Kemal Atatürk', ['1923']))

# ── Quem disse? ──
c.QT('Eu sou um berlinense.', 'kennedy', 2, ctx='Discurso diante de uma multidão em Berlim Ocidental, junho de 1963',
     src=('en', 'Ich bin ein Berliner', ['1963']))
c.QT('Vamos lá!', 'gagarin', 1, ctx='No momento da decolagem da Vostok 1, em abril de 1961',
     src=('en', 'Yuri Gagarin', ['Poyekhali']))
c.QT('A única coisa que devemos temer é o próprio medo.', 'fdr', 3, ctx='Primeiro discurso de posse, em plena Grande Depressão, março de 1933',
     src=('en', 'First inauguration of Franklin D. Roosevelt', ['fear itself']))
c.QT('De Stettin, no Báltico, até Trieste, no Adriático, uma cortina de ferro desceu sobre o continente.', 'churchill', 3,
     ctx='Discurso numa faculdade de Fulton, no Missouri, Estados Unidos, março de 1946',
     src=('en', 'Iron Curtain', ['Fulton']))
c.QT('O mundo precisa ser tornado seguro para a democracia.', 'wilson', 4,
     ctx='Discurso ao Congresso pedindo a declaração de guerra à Alemanha, abril de 1917',
     src=('en', 'United States declaration of war on Germany (1917)', ['safe for democracy']))
c.QT('Viva o Quebec livre!', 'de_gaulle', 4, ctx='Da sacada da prefeitura de Montreal, numa visita oficial ao Canadá, julho de 1967',
     src=('en', 'Vive le Québec libre', ['1967']))

# ── Batalhas ──
c.BT('Contra quem a Força Aérea Real defendeu os céus britânicos nesta batalha?', 'alemanha_nazista', 'Batalha da Inglaterra · 1940', 'reino_unido', '?', d=1,
     x='Foi a primeira grande campanha travada só no ar; sobre os pilotos da RAF, Churchill disse: "Nunca tantos deveram tanto a tão poucos."',
     src=('en', 'Battle of Britain', ['1940', 'Luftwaffe']))
c.BT('Quem defendia as praias da Normandia contra o desembarque aliado nesta batalha?', 'alemanha_nazista', 'Normandia · 1944', 'Aliados', '?', d=1,
     x='Em 6 de junho de 1944, mais de 150 mil soldados cruzaram o canal da Mancha: foi a maior invasão por mar da história.',
     src=('en', 'Normandy landings', ['1944', 'Omaha']))
c.BT('Qual país atacou os franceses nesta batalha, a mais longa da Primeira Guerra Mundial?', 'Alemanha', 'Verdun · 1916', 'FRA', '?', d=2, typ='txt',
     wrong=['Áustria-Hungria', 'Império Otomano', 'Bulgária', 'Rússia', 'Itália'],
     x='Durou cerca de dez meses, de fevereiro a dezembro de 1916; o grito francês "Eles não passarão!" virou símbolo da resistência.',
     src=('en', 'Battle of Verdun', ['1916', 'Falkenhayn']))
c.BT('Qual país afundou quatro porta-aviões japoneses nesta batalha, a virada da guerra no Pacífico?', 'estados_unidos', 'Midway · 1942', '?', 'imperio_japones', d=2,
     x='Os vencedores tinham decifrado parte do código naval japonês e sabiam onde e quando viria o ataque.',
     src=('en', 'Battle of Midway', ['1942', 'carriers']))
c.BT('Ao lado da França, qual país lançou esta ofensiva, que lhe custou quase 60 mil baixas só no primeiro dia?', 'Reino Unido', 'Somme · 1916', '?', 'imperio_alemao', d=3, typ='txt',
     wrong=['Estados Unidos', 'Itália', 'Rússia', 'Bélgica', 'Japão'],
     x='Foi uma das batalhas mais sangrentas da história, com mais de um milhão de mortos e feridos; em setembro, ali entraram em ação os primeiros tanques.',
     src=('en', 'Battle of the Somme', ['1916', 'tanks']))
c.BT('Qual comandante alemão foi derrotado pelos britânicos de Montgomery nesta batalha, no Egito?', 'Erwin Rommel', 'El Alamein · 1942', 'reino_unido', '?', d=3, typ='txt',
     wrong=['Heinz Guderian', 'Erich von Manstein', 'Friedrich Paulus', 'Gerd von Rundstedt', 'Walter Model'],
     x='Churchill escreveu depois: "Antes de Alamein, nunca tivemos uma vitória. Depois de Alamein, nunca tivemos uma derrota."',
     src=('en', 'Second Battle of El Alamein', ['Rommel', 'Montgomery']))
c.BT('Qual império teve um exército inteiro cercado e destruído nesta batalha, nas primeiras semanas da Primeira Guerra?', 'imperio_russo', 'Tannenberg · 1914', 'imperio_alemao', '?', d=4,
     x='A vitória fez a fama dos generais Hindenburg e Ludendorff, que depois passaram a comandar todo o esforço de guerra alemão.',
     src=('en', 'Battle of Tannenberg', ['Hindenburg', 'Ludendorff']))

# ── Linhagens e grupos ──
c.LN('Quem completa o trio de líderes do Eixo Roma–Berlim–Tóquio?', 'Benito Mussolini', 'Potências do Eixo · Segunda Guerra Mundial',
     ['Adolf Hitler', '?', 'Hideki Tojo'], d=1, kind='grupo', era='new', typ='txt',
     wrong=['Francisco Franco', 'Philippe Pétain', 'Josef Stálin', 'António de Oliveira Salazar', 'Neville Chamberlain'],
     src=('en', 'Axis powers', ['Mussolini', 'Tojo']),
     x='Tojo era o primeiro-ministro japonês; depois da guerra, foi julgado e executado, enquanto o imperador Hirohito seguiu no trono.')
c.LN('Qual país completa os membros permanentes do Conselho de Segurança da ONU?', 'China', 'Conselho de Segurança da ONU · 1945',
     ['Estados Unidos', 'União Soviética', 'Reino Unido', 'França', '?'], d=2, kind='grupo', era='new', typ='txt',
     wrong=['Japão', 'Alemanha', 'Índia', 'Brasil', 'Canadá'],
     src=('en', 'United Nations Security Council', ['veto', 'permanent']),
     x='Os cinco têm direito de veto; desde o fim de 1991, a cadeira soviética pertence à Rússia.')
c.LN('Quem foi o último desta linha de dirigentes soviéticos?', 'gorbachev', 'Líderes do Partido Comunista da URSS · 1953–1991',
     ['Nikita Khrushchov', 'Leonid Brejnev', 'Iuri Andropov', 'Konstantin Tchernenko', '?'], d=2, era='new',
     src=('en', 'List of leaders of the Soviet Union', ['Chernenko']),
     x='Ele assumiu em 1985, aos 54 anos, depois que três antecessores idosos morreram em menos de três anos.')
c.LN('Qual país completa os seis fundadores da Comunidade Econômica Europeia?', 'Luxemburgo', 'Tratado de Roma · 1957',
     ['França', 'Alemanha Ocidental', 'Itália', 'Bélgica', 'Holanda', '?'], d=3, kind='grupo', era='new', typ='txt',
     wrong=['Reino Unido', 'Dinamarca', 'Espanha', 'Suíça', 'Áustria'],
     src=('en', 'Treaty of Rome', ['Luxembourg']),
     x='O Reino Unido só entrou em 1973, junto com a Irlanda e a Dinamarca, e saiu em 2020.')
c.LN('Quem completava os "Quatro Grandes" da Conferência de Paz de Paris?', 'Vittorio Orlando', 'Os "Quatro Grandes" · Paris, 1919',
     ['Woodrow Wilson', 'David Lloyd George', 'Georges Clemenceau', '?'], d=4, kind='grupo', era='new', typ='txt',
     wrong=['Benito Mussolini', 'Giovanni Giolitti', 'Vítor Emanuel III', "Gabriele D'Annunzio", 'Luigi Cadorna'],
     src=('en', 'Big Four (World War I)', ['Orlando']),
     x='O italiano chegou a abandonar a conferência em protesto, porque a Itália não recebeu todos os territórios que esperava.')

# ── Manchetes ──
c.NW('Em que ano saiu esta manchete?', '1929', 'Pânico em Wall Street: ações despencam', 1, paper='Diário Financeiro',
     sub='Quinta-feira negra arrasa investidores; banqueiros tentam conter as vendas',
     wrong=['1919', '1923', '1926', '1933', '1937'], src=('pt', 'Crise de 1929', ['1929']),
     x='O crash abriu a Grande Depressão: em 1933, perto de um quarto dos trabalhadores americanos estava sem emprego.')
c.NW('Em que ano saiu esta manchete?', '1919', 'Paz assinada no Salão dos Espelhos', 3, paper='Gazeta de Paris',
     sub='Alemanha aceita as duras condições impostas pelos vencedores da guerra',
     wrong=['1914', '1916', '1917', '1918', '1920'], src=('pt', 'Tratado de Versalhes', ['1919']),
     x='O tratado foi assinado em 28 de junho de 1919, exatamente cinco anos depois do atentado de Sarajevo.')
c.NW('Em que ano saiu esta manchete?', '1933', 'Hitler é nomeado chanceler da Alemanha', 2, paper='Correio de Berlim',
     sub='O presidente Hindenburg entrega o governo ao líder do partido nazista',
     wrong=['1923', '1929', '1931', '1936', '1939'], src=('en', 'Adolf Hitler', ['1933', 'Hindenburg']),
     x='Em menos de dois meses, uma lei deu a ele o poder de governar por decreto, sem o Parlamento.')
c.NW('Em que ano saiu esta manchete?', '1948', 'Proclamado o Estado de Israel', 4, paper='Jornal do Oriente',
     sub='Em Tel Aviv, David Ben-Gurion lê a declaração de independência',
     wrong=['1945', '1946', '1947', '1949', '1956'], src=('en', 'Israeli Declaration of Independence', ['1948', 'Ben-Gurion']),
     x='No ano anterior, a sessão da ONU que aprovou a partilha da Palestina foi presidida pelo brasileiro Oswaldo Aranha.')
c.NW('Em que ano saiu esta manchete?', '1962', 'Kennedy anuncia bloqueio naval a Cuba', 2, paper='Diário da Tarde',
     sub='Fotos aéreas revelam mísseis soviéticos instalados na ilha',
     wrong=['1959', '1960', '1961', '1963', '1965'], src=('pt', 'Crise dos mísseis de Cuba', ['1962']),
     x='Por 13 dias de outubro, o mundo esteve perto de uma guerra nuclear; a crise acabou com a retirada dos mísseis.')
c.NW('Em que ano saiu esta manchete?', '1968', 'Tanques do Pacto de Varsóvia entram em Praga', 4, paper='Gazeta de Viena',
     sub='Invasão põe fim às reformas da "Primavera" tchecoslovaca',
     wrong=['1956', '1961', '1964', '1972', '1980'], src=('en', 'Warsaw Pact invasion of Czechoslovakia', ['1968']),
     x='Doze anos antes, em 1956, os soviéticos já tinham esmagado com tanques uma revolta na Hungria.')
c.NW('Em que ano saiu esta manchete?', '1975', 'Saigon cai e a guerra chega ao fim', 3, paper='Correio do Oriente',
     sub='Tanques do Norte entram no palácio presidencial; últimos americanos saem de helicóptero',
     wrong=['1965', '1968', '1970', '1973', '1979'], src=('en', 'Fall of Saigon', ['1975']),
     x='No ano seguinte, o Vietnã foi reunificado e Saigon passou a se chamar Cidade de Ho Chi Minh.')
c.NW('Quem é o líder desta manchete?', 'Willy Brandt', 'Chanceler alemão se ajoelha em Varsóvia', 5, paper='Gazeta de Varsóvia',
     sub='Diante do memorial aos heróis do gueto, gesto silencioso surpreende o mundo',
     wrong=['Konrad Adenauer', 'Helmut Kohl', 'Helmut Schmidt', 'Ludwig Erhard', 'Kurt Georg Kiesinger'],
     src=('en', 'Kniefall von Warschau', ['Brandt', '1970']),
     x='O gesto, em dezembro de 1970, virou símbolo do pedido de perdão alemão pelos crimes nazistas; no ano seguinte, ele ganhou o Nobel da Paz.')

# ── Duelos ──
c.DU('Duelo: quem morreu primeiro?', 'lenin', 'gandhi', 2, icon='hourglass',
     src=('en', 'Vladimir Lenin', ['1924']),
     x='Lênin morreu em janeiro de 1924, aos 53 anos; Gandhi foi assassinado em janeiro de 1948.')
c.DU('Duelo: o que aconteceu primeiro?', 'Revolução Russa de Outubro', 'Fim da Primeira Guerra Mundial', 2, typ='txt', icon='hourglass',
     src=('pt', 'Revolução de Outubro', ['1917']),
     x='A revolução foi em 1917, e a Rússia bolchevique saiu da guerra antes mesmo do armistício de novembro de 1918.')
c.DU('Duelo: o que aconteceu primeiro?', 'Primeiro voo humano ao espaço', 'Início da construção do Muro de Berlim', 4, typ='txt', icon='hourglass',
     src=('en', 'Vostok 1', ['12 April 1961']),
     x='Gagarin voou em 12 de abril de 1961; o Muro começou a ser erguido quatro meses depois, em 13 de agosto.')

# ── Fato ou mito? ──
c.MY('Durante toda a Guerra Fria, Estados Unidos e União Soviética nunca declararam guerra um ao outro?', True, 1, crest='urss',
     x='Por isso a guerra foi "fria": as superpotências se enfrentaram de forma indireta, apoiando lados opostos em conflitos como os da Coreia, do Vietnã e do Afeganistão.',
     src=('pt', 'Guerra Fria', ['Coreia']))
c.MY('No Natal de 1914, soldados britânicos e alemães chegaram a parar de lutar e confraternizar entre as trincheiras?', True, 2, icon='dove',
     x='Em vários trechos da frente, trocaram cigarros e comida, cantaram e enterraram seus mortos; há relatos até de partidas de futebol.',
     src=('en', 'Christmas truce', ['football']))
c.MY('O Muro de Berlim cercava toda a Berlim Ocidental, e não apenas cortava a cidade ao meio?', True, 3, stad='muro_berlim',
     x='Berlim Ocidental era uma ilha dentro da Alemanha Oriental: dos cerca de 155 km do Muro, só uns 43 km cortavam a cidade; o resto a separava do território oriental ao redor.',
     src=('en', 'Berlin Wall', ['155']))
c.MY('A Revolução de Outubro, na Rússia, aconteceu em novembro pelo calendário que usamos hoje?', True, 3, stad='palacio_inverno',
     x='A Rússia ainda seguia o calendário juliano, 13 dias atrasado: o 25 de outubro de 1917 de lá era o nosso 7 de novembro.',
     src=('en', 'October Revolution', ['Julian']))
c.MY('Hitler chegou ao poder vencendo uma eleição com a maioria dos votos dos alemães?', False, 3, flag='GER',
     x='Na eleição livre mais favorável, em julho de 1932, os nazistas tiveram cerca de 37% dos votos; Hitler foi nomeado chanceler pelo presidente Hindenburg.',
     src=('en', 'Adolf Hitler', ['Hindenburg', 'chancellor']))
c.MY('Os primeiros animais mandados de propósito ao espaço foram moscas-das-frutas?', True, 4, icon='rocket',
     x='Em 1947, os americanos lançaram moscas-das-frutas num foguete V-2 capturado dos alemães; a cápsula voltou de paraquedas com elas vivas.',
     src=('en', 'Animals in space', ['fruit flies', '1947']))

c.write()
