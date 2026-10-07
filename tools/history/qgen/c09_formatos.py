"""History's own formats: citação, batalha, linhagem, manchete, duelo, fato ou mito.
Each category is one format; tools/history/js/formats.js draws them."""
from qdsl import Cat

# ── Quem disse? ── the sentence on a sheet of paper
c = Cat('citacoes', 'Quem disse?', '🪶', 'Citação: quem disse ou escreveu', '#6D4C41', order=43)
c.QT('Vim, vi, venci.', 'cesar', 1, ctx='Mensagem a Roma depois da vitória em Zela, 47 a.C.', src=('pt', 'Veni, vidi, vici', ['Zela']))
c.QT('A sorte está lançada.', 'cesar', 2, ctx='Ao atravessar o Rubicão com suas legiões, 49 a.C.', src=('pt', 'Alea jacta est', ['Rubicão']))
c.QT('Penso, logo existo.', 'descartes', 1, ctx='Discurso do Método, 1637', src=('pt', 'Cogito, ergo sum', ['Discurso do Método']))
c.QT('Eu tenho um sonho.', 'mlk', 1, ctx='Marcha sobre Washington, agosto de 1963', src=('pt', 'I Have a Dream', ['1963']))
c.QT('Independência ou morte!', 'dom_pedro_i', 1, ctx='Às margens do riacho Ipiranga, 7 de setembro de 1822', src=('pt', 'Independência do Brasil', ['Ipiranga']))
c.QT('Não tenho nada a oferecer senão sangue, trabalho, lágrimas e suor.', 'churchill', 2, ctx='Primeiro discurso como primeiro-ministro, maio de 1940', src=('en', 'Blood, toil, tears and sweat', ['1940']))
c.QT('Proletários de todos os países, uni-vos!', 'marx', 2, ctx='Manifesto escrito a quatro mãos, Londres, 1848', src=('pt', 'Manifesto Comunista', ['1848']))
c.QT('Dai-me um ponto de apoio e moverei o mundo.', 'arquimedes', 2, ctx='Frase que os antigos lhe atribuíam, sobre a alavanca', src=('pt', 'Arquimedes', ['alavanca']))
c.QT('Saio da vida para entrar na História.', 'getulio', 2, ctx='Carta-testamento, agosto de 1954', src=('pt', 'Carta-testamento', ['1954']))
c.QT('Se vi mais longe, foi por estar sobre ombros de gigantes.', 'newton', 3, ctx='Carta a Robert Hooke, 1675', src=('en', 'Standing on the shoulders of giants', ['Hooke']))
c.QT('Este é um pequeno passo para um homem, um salto gigantesco para a humanidade.', 'armstrong', 1, ctx='Mar da Tranquilidade, 20 de julho de 1969', src=('pt', 'Apollo 11', ['Tranquilidade']))
c.QT('Só sei que nada sei.', 'socrates', 1, ctx='Segundo a Apologia escrita por um de seus discípulos', src=('pt', 'Só sei que nada sei', ['Apologia']))
c.QT('Ser ou não ser, eis a questão.', 'shakespeare', 1, ctx='Monólogo do príncipe da Dinamarca, ato III', src=('pt', 'Ser ou não ser', ['Hamlet']))
c.QT('O homem nasce livre, e por toda parte encontra-se a ferros.', 'rousseau', 3, ctx='Primeira linha do Contrato Social, 1762', src=('pt', 'Do Contrato Social', ['1762']))
c.QT('O Estado sou eu.', 'luis_xiv', 2, ctx='Frase atribuída ao Rei Sol, provavelmente apócrifa', src=('pt', 'Luís XIV de França', ['Rei Sol']))
c.QT('A imaginação é mais importante que o conhecimento.', 'einstein', 2, ctx='Entrevista ao Saturday Evening Post, 1929', src=('en', 'Albert Einstein', ['imagination']))
c.write()

# ── Batalhas ── two banners and the crossed swords, one side hidden
c = Cat('batalhas', 'Batalhas', '⚔️', 'Duas bandeiras, um lado escondido', '#8C2F2F', order=44)
c.BT('Contra quem os 300 espartanos de Leônidas resistiram nesta batalha?', 'persia', 'Termópilas · 480 a.C.', 'esparta', '?', d=1,
     x='Os invasores só passaram pelo desfiladeiro depois de uma traição.', src=('pt', 'Batalha das Termópilas', ['Xerxes']))
c.BT('Qual cidade grega comandou a frota que venceu os persas nesta batalha naval?', 'atenas', 'Salamina · 480 a.C.', '?', 'persia', d=2,
     x='Temístocles atraiu as galeras persas para um estreito onde não podiam manobrar.', src=('pt', 'Batalha de Salamina', ['Temístocles']))
c.BT('Quem Roma derrotou nesta batalha, pondo fim à Segunda Guerra Púnica?', 'cartago', 'Zama · 202 a.C.', 'republica_romana', '?', d=2,
     x='Cipião levou a guerra ao norte da África e venceu o maior general inimigo.', src=('pt', 'Batalha de Zama', ['Aníbal']))
c.BT('Quem derrotou o Primeiro Império Francês em Waterloo, ao lado da Prússia?', 'reino_unido', 'Waterloo · 1815', 'imperio_frances', '?', d=2,
     x='A linha aliada resistiu o dia inteiro, até a chegada dos prussianos de Blücher.', src=('pt', 'Batalha de Waterloo', ['Wellington']))
c.BT('Quem a União Soviética cercou e derrotou nesta batalha decisiva?', 'alemanha_nazista', 'Stalingrado · 1942–1943', 'urss', '?', d=1,
     x='O VI Exército alemão se rendeu em fevereiro de 1943.', src=('pt', 'Batalha de Stalingrado', ['1943']))
c.BT('Quem invadiu a Inglaterra e venceu esta batalha?', 'Normandos', 'Hastings · 1066', '?', 'inglaterra', d=2, typ='txt',
     wrong=['Vikings', 'Escoceses', 'Francos', 'Bretões', 'Saxões'],
     x='O comandante vencedor foi coroado rei da Inglaterra no Natal de 1066.', src=('pt', 'Batalha de Hastings', ['normandos']))
c.BT('Contra quem o Egito de Ramsés II lutou nesta batalha de carros de guerra?', 'Hititas', 'Kadesh · c. 1274 a.C.', 'egito_antigo', '?', d=3, typ='txt',
     wrong=['Assírios', 'Babilônios', 'Núbios', 'Filisteus', 'Fenícios'],
     x='A batalha terminou sem vencedor claro e levou a um dos primeiros tratados de paz conhecidos.', src=('pt', 'Batalha de Kadesh', ['hititas']))
c.BT('Qual aliança cristã venceu a frota otomana nesta batalha?', 'Liga Santa', 'Lepanto · 1571', '?', 'imperio_otomano', d=3, typ='txt',
     wrong=['Liga Hanseática', 'Liga de Delos', 'Tríplice Aliança', 'Liga de Cambrai', 'Liga de Augsburgo'],
     x='Foi a última grande batalha de galeras a remo; Cervantes lutou nela e perdeu o movimento de uma mão.', src=('pt', 'Batalha de Lepanto', ['Liga Santa']))
c.BT('Quem deteve o avanço dos mongóis nesta batalha, na Palestina?', 'Mamelucos', 'Ain Jalut · 1260', '?', 'imperio_mongol', d=4, typ='txt',
     wrong=['Seljúcidas', 'Cruzados', 'Abássidas', 'Omíadas', 'Otomanos'],
     x='Foi a primeira grande derrota dos mongóis numa batalha campal.', src=('pt', 'Batalha de Ain Jalut', ['mamelucos']))
c.BT('Quem expulsou os holandeses de Pernambuco nos montes desta batalha?', 'Luso-brasileiros', 'Guararapes · 1648', '?', 'holanda', d=3, typ='txt',
     wrong=['Franceses', 'Espanhóis', 'Ingleses', 'Suecos', 'Dinamarqueses'],
     x='Houve duas batalhas nos montes Guararapes, em 1648 e 1649; em 1654, os holandeses deixaram o Recife.', src=('pt', 'Batalhas dos Guararapes', ['holandeses']))
c.write()

# ── Linhagens ── a succession or a council, one link missing
c = Cat('linhagens', 'Dinastias e alianças', '🌳', 'Complete a linhagem', '#7B5E1E', order=45)
c.LN('Quem completa a dinastia Tudor?', 'elizabeth_i', 'Dinastia Tudor · Inglaterra', ['Henrique VII', 'Henrique VIII', 'Eduardo VI', 'Maria I', '?'], d=2, era='mod',
     src=('pt', 'Dinastia Tudor', ['Isabel']), x='A última dos Tudor reinou 44 anos e não deixou herdeiros.')
c.LN('Quem é o elo que falta na Casa de Bragança no Brasil?', 'dom_pedro_i', 'Casa de Bragança no Brasil', ['Dom João VI', '?', 'Dom Pedro II'], d=1, era='new',
     src=('pt', 'Casa de Bragança', ['Pedro']))
c.LN('Quem foi o primeiro desta linha de imperadores romanos?', 'augusto', 'Dinastia júlio-claudiana', ['?', 'Tibério', 'Calígula', 'Cláudio', 'Nero'], d=2, era='ant',
     src=('pt', 'Dinastia júlio-claudiana', ['Augusto']))
c.LN('Quem abre a lista dos presidentes do Brasil?', 'deodoro', 'Os primeiros presidentes do Brasil', ['?', 'Floriano Peixoto', 'Prudente de Morais', 'Campos Sales'], d=1, era='new',
     src=('pt', 'Lista de presidentes do Brasil', ['Deodoro']))
c.LN('Quem completava o Primeiro Triunvirato?', 'Crasso', 'Primeiro Triunvirato · Roma, 60 a.C.', ['Júlio César', 'Pompeu', '?'], d=3, kind='grupo', era='ant', typ='txt',
     wrong=['Marco Antônio', 'Lépido', 'Bruto', 'Catão', 'Sila'], src=('pt', 'Primeiro Triunvirato', ['Crasso']),
     x='Crasso, o homem mais rico de Roma, morreu em 53 a.C. lutando contra os partos.')
c.LN('Quem se sentou à mesa com estes dois em Ialta?', 'Josef Stálin', 'Conferência de Ialta · fevereiro de 1945', ['Winston Churchill', 'Franklin D. Roosevelt', '?'], d=1, kind='grupo', era='new', typ='txt',
     wrong=['Harry Truman', 'Benito Mussolini', 'Chiang Kai-shek', 'Clement Attlee', 'Leon Trótski'], src=('pt', 'Conferência de Ialta', ['Stalin']))
c.LN('Quem foi o rei que completa a dinastia de Avis?', 'Manuel I', 'Dinastia de Avis · Portugal', ['João I', 'Duarte I', 'Afonso V', 'João II', '?'], d=4, era='med', typ='txt',
     wrong=['Sebastião I', 'Afonso Henriques', 'Dinis I', 'João III', 'Pedro I'], src=('pt', 'Dinastia de Avis', ['Manuel']),
     x='No reinado de Manuel I, Vasco da Gama chegou à Índia e Cabral ao Brasil.')
c.LN('Quem é o filósofo que falta nesta linhagem de mestre e discípulo?', 'platao', 'Mestre e discípulo · Atenas', ['Sócrates', '?', 'Aristóteles', 'Alexandre, o Grande'], d=1, era='ant',
     src=('pt', 'Platão', ['Sócrates']), x='Platão foi aluno de Sócrates e professor de Aristóteles, que educou Alexandre.')
c.write()

# ── Manchetes ── the front page of the day
c = Cat('manchetes', 'Manchetes', '📰', 'A primeira página do dia', '#37474F', order=46)
c.NW('Em que ano saiu esta manchete?', '1969', 'Homem pisa na Lua', 1, paper='Diário da Manhã', sub='Astronautas da Apollo 11 caminham no Mar da Tranquilidade',
     wrong=['1961', '1965', '1967', '1971', '1972'], src=('pt', 'Apollo 11', ['1969']))
c.NW('Em que ano saiu esta manchete?', '1989', 'Cai o Muro de Berlim', 1, paper='Gazeta Europeia', sub='Multidão atravessa a fronteira entre as duas Alemanhas',
     wrong=['1985', '1987', '1990', '1991', '1993'], src=('pt', 'Queda do Muro de Berlim', ['1989']))
c.NW('Em que ano saiu esta manchete?', '1912', 'Titanic afunda no Atlântico Norte', 2, paper='The Evening Post', sub='Transatlântico bate num iceberg na viagem inaugural',
     wrong=['1905', '1908', '1910', '1914', '1916'], src=('pt', 'RMS Titanic', ['1912']))
c.NW('Em que ano saiu esta manchete?', '1914', 'Arquiduque assassinado em Sarajevo', 2, paper='Wiener Abendpost', sub='Herdeiro do trono austro-húngaro é morto a tiros',
     wrong=['1908', '1911', '1912', '1916', '1918'], src=('pt', 'Assassinato de Francisco Fernando', ['1914']))
c.NW('Em que ano saiu esta manchete?', '1889', 'Proclamada a República', 1, paper='Gazeta da Corte', sub='Marechal depõe o Imperador; a família imperial parte para o exílio',
     wrong=['1822', '1831', '1871', '1888', '1891'], src=('pt', 'Proclamação da República do Brasil', ['1889']))
c.NW('Em que ano saiu esta manchete?', '1917', 'Bolcheviques tomam o Palácio de Inverno', 2, paper='Jornal do Norte', sub='Revolução em Petrogrado derruba o governo provisório',
     wrong=['1905', '1914', '1918', '1922', '1924'], src=('pt', 'Revolução de Outubro', ['1917']))
c.NW('Quem é o herói desta manchete?', 'santos_dumont', 'Brasileiro voa em Paris no 14-Bis', 1, paper='Le Petit Parisien', sub='Aparelho mais pesado que o ar decola diante de uma comissão oficial',
     typ='player', src=('pt', '14-bis', ['1906']))
c.NW('Quem governava o Brasil no dia desta manchete?', 'jk', 'Brasília é inaugurada', 1, paper='Correio do Planalto', sub='A nova capital nasce no Planalto Central, em 21 de abril',
     typ='player', src=('pt', 'Brasília', ['Juscelino']))
c.NW('Em que ano saiu esta manchete?', '1945', 'Alemanha se rende', 1, paper='A Gazeta', sub='Termina a guerra na Europa; multidões celebram nas ruas',
     wrong=['1943', '1944', '1946', '1947', '1949'], src=('pt', 'Dia da Vitória na Europa', ['1945']))
c.write()

# ── Duelo ── only two cards on the board
c = Cat('duelos', 'Duelo', '🤺', 'Só dois na disputa', '#5D4037', order=47)
c.DU('Duelo: quem nasceu primeiro?', 'leonardo', 'michelangelo', 1, icon='hourglass', src=('pt', 'Leonardo da Vinci', ['1452']))
c.DU('Duelo: quem nasceu primeiro?', 'colombo', 'cabral', 2, icon='hourglass', src=('pt', 'Cristóvão Colombo', ['1451']))
c.DU('Duelo: quem viveu primeiro?', 'socrates', 'aristoteles', 1, icon='hourglass', src=('pt', 'Sócrates', ['Atenas']))
c.DU('Duelo: quem governou primeiro?', 'ramses_ii', 'cleopatra', 1, icon='pyramid', src=('pt', 'Ramessés II', ['XIX dinastia']))
c.DU('Duelo: quem morreu mais jovem?', 'alexandre', 'cesar', 2, icon='sword', src=('pt', 'Alexandre, o Grande', ['32']))
c.DU('Duelo: qual destes estados surgiu primeiro?', 'han', 'imperio_romano', 3, typ=None, icon='hourglass', src=('pt', 'Dinastia Han', ['206']))
c.DU('Duelo: o que aconteceu primeiro?', 'Chegada de Colombo à América', 'Chegada de Cabral ao Brasil', 1, typ='txt', icon='ship', src=('pt', 'Cristóvão Colombo', ['1492']))
c.DU('Duelo: qual invenção veio primeiro?', 'Telefone de Bell', 'Lâmpada de Edison', 3, typ='txt', icon='gear', src=('pt', 'Telefone', ['1876']))
c.DU('Duelo: qual destes foi construído primeiro?', 'Coliseu', 'Muralha de Adriano', 3, typ='txt', icon='column', src=('pt', 'Coliseu', ['80']))
c.DU('Duelo: quem chegou primeiro ao poder?', 'lenin', 'getulio', 2, icon='flag', src=('pt', 'Vladimir Lênin', ['1917']))
c.write()

# ── Fato ou mito? ── stamped true or false
c = Cat('fato_mito', 'Fato ou mito?', '🔎', 'O que todo mundo repete', '#455A64', order=48)
c.MY('Napoleão Bonaparte era um homem muito baixo para a sua época?', False, 2, who='napoleao',
     x='Media por volta de 1,69 m, a altura comum de um francês do seu tempo; a fama veio da propaganda inglesa e da confusão entre polegadas francesas e inglesas.',
     src=('en', 'Napoleon', ['height']))
c.MY('Os vikings usavam capacetes com chifres nas batalhas?', False, 1, icon='sword',
     x='Nenhum capacete viking com chifres foi encontrado: a imagem nasceu nos figurinos de óperas do século XIX.', src=('pt', 'Vikings', ['capacete']))
c.MY('Charles Darwin e Abraham Lincoln nasceram no mesmo dia?', True, 3, icon='hourglass',
     x='Os dois nasceram em 12 de fevereiro de 1809, um na Inglaterra e o outro no Kentucky.', src=('pt', 'Charles Darwin', ['12 de fevereiro de 1809']))
c.MY('Cleópatra viveu mais perto da chegada do homem à Lua do que da construção da Grande Pirâmide de Gizé?', True, 2, icon='pyramid',
     x='A Grande Pirâmide tem cerca de 4.500 anos; Cleópatra morreu em 30 a.C., uns 2.000 anos antes da Apollo 11.', src=('pt', 'Cleópatra VII', ['30 a.C.']))
c.MY('Na Idade Média, a maioria dos sábios acreditava que a Terra era plana?', False, 2, icon='globe',
     x='Os estudiosos medievais sabiam que a Terra é redonda desde os gregos; o mito da "Terra plana medieval" foi espalhado no século XIX.', src=('pt', 'Mito da Terra plana', ['século XIX']))
c.MY('A Grande Muralha da China pode ser vista da Lua a olho nu?', False, 1, icon='castle',
     x='É longa, mas estreita demais: nenhum astronauta das missões Apollo a viu da Lua.', src=('pt', 'Grande Muralha da China', ['Lua']))
c.MY('Albert Einstein foi reprovado em matemática na escola?', False, 1, icon='gear',
     x='Ele dominava cálculo antes dos 15 anos; o boato surgiu de uma mudança na escala de notas de uma escola suíça.', src=('en', 'Albert Einstein', ['mathematics']))
c.MY('O Império Bizantino durou quase mil anos depois da queda de Roma no Ocidente?', True, 2, crest='bizancio',
     x='O Império Romano do Oriente resistiu de 476 até 1453, quando Constantinopla caiu diante dos otomanos.', src=('pt', 'Império Bizantino', ['1453']))
c.MY('Maria Antonieta disse "Que comam brioches!" ao saber que o povo não tinha pão?', False, 2, who='maria_antonieta',
     x='Não há registro de que tenha dito: a frase aparece nas Confissões de Rousseau, escritas quando ela ainda era criança na Áustria.', src=('pt', 'Que comam brioches', ['Rousseau']))
c.MY('Tutancâmon tornou-se faraó ainda criança?', True, 1, icon='pyramid',
     x='Subiu ao trono por volta dos nove anos de idade e morreu perto dos 18.', src=('pt', 'Tutancâmon', ['nove']))
c.MY('Os gladiadores romanos sempre lutavam até a morte?', False, 2, icon='sword',
     x='Gladiadores custavam caro para treinar; muitos combates terminavam com a rendição de um deles, e a morte era a exceção.', src=('pt', 'Gladiador', ['morte']))
c.MY('O Brasil foi o último país das Américas a abolir a escravidão?', True, 1, flag='BRA',
     x='A Lei Áurea, de 13 de maio de 1888, fez do Brasil o último país independente das Américas a abolir a escravidão.', src=('pt', 'Lei Áurea', ['1888']))
c.write()
