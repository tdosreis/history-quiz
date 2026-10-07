"""Era das Revoluções (1750-1914): da Bastilha à Belle Époque — all formats mixed."""
from qdsl import Cat

c = Cat('revolucoes', 'Era das Revoluções', '🔥', 'Da Bastilha à Belle Époque', '#9A3412', order=57)

# ── Texto: seis alternativas ──
c.T('Qual canção, composta em 1792 para os soldados da Revolução, tornou-se o hino nacional da França?', 'A Marselhesa',
    ['A Internacional', 'Ça Ira', 'A Carmanhola', 'Deus Salve o Rei', 'Hino da Carta'], d=1, stad='arco_triunfo',
    src=('en', 'La Marseillaise', ['1792', 'Rouget de Lisle', 'Strasbourg']),
    x='Foi composta em Estrasburgo por Rouget de Lisle, mas ganhou o nome por ser cantada pelos voluntários de Marselha que marcharam até Paris.')
c.T('Qual campanha de Napoleão, em 1812, terminou em desastre, com o exército dizimado pelo frio e pela fome na retirada?', 'A invasão da Rússia',
    ['A campanha do Egito', 'A campanha da Itália', 'A Guerra Peninsular', 'A campanha da Áustria', 'Os Cem Dias'], d=1, who='napoleao',
    src=('en', 'French invasion of Russia', ['1812', 'Moscow']),
    x='Ao chegar a Moscou, Napoleão encontrou a cidade quase vazia e logo em chamas; a retirada no inverno destruiu a maior parte da Grande Armée.')
c.T('Qual canal, aberto à navegação em 1914, ligou o oceano Atlântico ao Pacífico?', 'Canal do Panamá',
    ['Canal de Suez', 'Canal de Kiel', 'Canal de Corinto', 'Canal Erie', 'Canal da Nicarágua'], d=1, icon='ship',
    src=('en', 'Panama Canal', ['1914', 'yellow fever']),
    x='Os franceses começaram a obra nos anos 1880 e desistiram depois de milhares de mortes por malária e febre amarela; os americanos a concluíram.')
c.T('Qual combustível, tirado de minas, alimentava as máquinas a vapor e as locomotivas da Revolução Industrial?', 'Carvão',
    ['Petróleo', 'Gás natural', 'Diesel', 'Querosene', 'Álcool'], d=1, icon='train',
    src=('en', 'Industrial Revolution', ['coal']),
    x='A Grã-Bretanha tinha grandes jazidas de carvão e de ferro, uma das razões de a Revolução Industrial ter começado lá.')
c.T('Como ficou conhecido o período de 1837 a 1901 na história britânica, marcado pelas fábricas, pelas ferrovias e pela expansão do império?', 'Era Vitoriana',
    ['Era Georgiana', 'Era Eduardiana', 'Era Elisabetana', 'Era Tudor', 'Belle Époque'], d=1, crest='imperio_britanico',
    src=('en', 'Victorian era', ['1837', '1901']),
    x='Foi a época de Charles Dickens, dos trens a vapor e da Grande Exposição de 1851, montada no Palácio de Cristal, em Londres.')
c.T('Como ficou conhecida a corrida das potências europeias para dividir e colonizar o continente africano, no fim do século XIX?', 'Partilha da África',
    ['Grande Jogo', 'Destino Manifesto', 'Doutrina Monroe', 'Questão do Oriente', 'Corrida do Ouro'], d=2, icon='map',
    src=('en', 'Scramble for Africa', ['1870', '1914']),
    x='Em 1870, cerca de 10% da África estava sob controle europeu; em 1914, perto de 90%.')
c.T('Qual medida de Napoleão, de 1806, proibiu os países sob seu domínio de comerciar com a Grã-Bretanha?', 'Bloqueio Continental',
    ['Código Civil', 'Concordata', 'Lei dos Suspeitos', 'Tratado de Tilsit', 'Pacto de Família'], d=2, crest='imperio_frances',
    src=('en', 'Continental System', ['1806', 'Portugal']),
    x='Portugal se recusou a aderir e foi invadido pelos franceses; a família real portuguesa partiu então para o Brasil, no fim de 1807.')
c.T('Qual romance antiescravista, publicado em 1852 por Harriet Beecher Stowe, tornou-se um dos livros mais vendidos do século XIX?', 'A Cabana do Pai Tomás',
    ['As Aventuras de Huckleberry Finn', 'Moby Dick', 'A Letra Escarlate', 'Mulherzinhas', 'O Último dos Moicanos'], d=2, icon='book',
    src=('en', "Uncle Tom's Cabin", ['1852', '300,000']),
    x='Só no primeiro ano, vendeu 300 mil exemplares nos Estados Unidos e ajudou a espalhar a causa abolicionista no Norte.')
c.T('Como eram chamados os revolucionários populares de Paris que usavam calças compridas, e não os calções curtos da elite?', 'Sans-culottes',
    ['Girondinos', 'Jacobinos', 'Montanheses', 'Chouans', 'Termidorianos'], d=3, crest='franca_revolucionaria',
    src=('en', 'Sans-culottes', ['culottes']),
    x='O nome quer dizer "sem culotes": os calções até o joelho, usados com meias de seda, eram roupa de nobres e burgueses ricos.')
c.T('Qual movimento operário britânico, entre 1838 e 1857, reuniu milhões de assinaturas em petições pelo voto de todos os homens adultos?', 'Cartismo',
    ['Ludismo', 'Fabianismo', 'Owenismo', 'Sufragismo', 'Trabalhismo'], d=3, crest='reino_unido',
    src=('en', 'Chartism', ["People's Charter", '1838']),
    x='O nome vem da "Carta do Povo", de 1838. O movimento fracassou, mas quase todas as suas reivindicações, como o voto secreto, viraram lei décadas depois.')
c.T('Qual padre escreveu, em 1789, o panfleto "O que é o Terceiro Estado?", que inflamou a Revolução Francesa?', 'Emmanuel Sieyès',
    ['Jean-Paul Marat', 'Camille Desmoulins', 'Mirabeau', 'Condorcet', 'Lafayette'], d=4, icon='quill',
    src=('en', 'What Is the Third Estate?', ['Sieyès', '1789']),
    x='O texto respondia assim: "O que é o Terceiro Estado? Tudo. O que tem sido até agora? Nada. O que deseja? Ser alguma coisa."')

# ── Personagens ──
c.P('Qual governante fugiu do exílio na ilha de Elba, em 1815, e voltou ao poder por cerca de cem dias?', 'napoleao', d=1, crest='imperio_frances',
    src=('en', 'Hundred Days', ['Elba', 'Grenoble']),
    x='Perto de Grenoble, as tropas enviadas para detê-lo passaram para o seu lado, e ele chegou a Paris sem combate, em 20 de março.')
c.P('Qual compositor pretendia dedicar sua Terceira Sinfonia a Napoleão, mas riscou o nome dele da partitura quando o general se proclamou imperador?', 'beethoven', d=2, who='napoleao',
    src=('en', 'Symphony No. 3 (Beethoven)', ['Napoleon', 'Eroica']),
    x='A sinfonia acabou publicada como "Eroica", composta "para celebrar a memória de um grande homem".')
c.P('Qual general britânico expulsou os exércitos de Napoleão de Portugal e da Espanha, na Guerra Peninsular, antes de enfrentá-lo em pessoa?', 'wellington', d=2, flag='POR',
    src=('en', 'Lines of Torres Vedras', ['Wellington', 'Lisbon']),
    x='Para defender Lisboa, mandou erguer as Linhas de Torres Vedras, uma rede de fortes que os franceses não conseguiram atravessar.')
c.P('Qual monarca visitou a Exposição do Centenário dos Estados Unidos, em 1876, e se encantou com o telefone de Alexander Graham Bell?', 'dom_pedro_ii', d=3, flag='USA',
    src=('en', 'Centennial Exposition', ['Pedro II', 'Bell']),
    x='Ele abriu a exposição, na Filadélfia, ao lado do presidente Ulysses Grant, e percorreu os Estados Unidos por cerca de três meses.')
c.P('Qual escritor viveu quase vinte anos no exílio, a maior parte nas ilhas do Canal da Mancha, por se opor ao imperador Napoleão III?', 'victor_hugo', d=3, flag='FRA',
    src=('en', 'Victor Hugo', ['Guernsey', 'Napoleon III']),
    x='Em Guernsey, terminou Os Miseráveis, publicado em 1862; só voltou a Paris quando o Segundo Império caiu, em 1870.')

# ── Estados ──
c.C('Qual país comprou o Alasca do Império Russo, em 1867, por 7,2 milhões de dólares?', 'estados_unidos', d=1, crest='imperio_russo',
    src=('en', 'Alaska Purchase', ['1867', 'Seward']),
    x='Críticos da época apelidaram a compra de "a loucura de Seward", nome do secretário de Estado americano que a negociou.')
c.C('Qual império asiático venceu a China em 1895 e a Rússia em 1905, tornando-se uma potência mundial?', 'imperio_japones', d=2, crest='qing',
    src=('en', 'First Sino-Japanese War', ['1895', 'Taiwan']),
    x='Na guerra contra a China, ficou com a ilha de Taiwan, que governou até 1945.')
c.C('Qual reino, governado por Guilherme I e Bismarck, venceu em poucos anos a Dinamarca, a Áustria e a França?', 'prussia', d=2, who='bismarck',
    src=('en', 'Unification of Germany', ['Denmark', 'Austria']),
    x='As três guerras, em 1864, 1866 e 1870–1871, terminaram com o rei Guilherme I proclamado imperador alemão.')
c.C('Qual império foi apelidado de "o doente da Europa" no século XIX, enquanto perdia territórios nos Bálcãs?', 'imperio_otomano', d=3, flag='GRC',
    src=('en', 'Sick man of Europe', ['Ottoman', 'Nicholas I']),
    x='A expressão é atribuída ao czar Nicolau I, da Rússia, que contava com a partilha dos territórios do vizinho.')

# ── Quem sou eu? ──
c.Q('Quem sou eu?', 'victoria', ['Tornei-me rainha em 1837, com apenas 18 anos.',
                                 'Casei-me com meu primo alemão Alberto, e tivemos nove filhos.',
                                 'Meus filhos e netos se casaram em tantas casas reais que me chamaram de "avó da Europa".',
                                 'Recebi também o título de Imperatriz da Índia, e meu nome batizou toda uma época britânica.'], d=1, icon='crown',
    src=('en', 'Queen Victoria', ['Empress of India', 'Albert']))
c.Q('Quem sou eu?', 'garibaldi', ['Nasci em Nice, em 1807, e fui marinheiro na juventude.',
                                  'Exilado, lutei na América do Sul, inclusive na Revolução Farroupilha, no sul do Brasil.',
                                  'Lá conheci minha companheira, uma catarinense que lutou ao meu lado.',
                                  'Em 1860, desembarquei na Sicília com mil voluntários de camisa vermelha.'], d=2, icon='sword',
    src=('en', 'Giuseppe Garibaldi', ['Nice', 'Anita']))
c.Q('Quem sou eu?', 'robespierre', ['Nasci em Arras, em 1758, e fui advogado.',
                                    'Meus admiradores me chamavam de "o Incorruptível".',
                                    'Fui a voz mais influente do Comitê de Salvação Pública durante o Terror.',
                                    'Em julho de 1794, no golpe do 9 Termidor, fui preso e levado à guilhotina.'], d=2, icon='scales',
    src=('en', 'Maximilien Robespierre', ['Arras', 'Incorruptible']))

# ── Linha do tempo ──
c.O('Coloque estes marcos em ordem, do mais antigo ao mais recente?', [
    ('eua', 'Independência dos EUA', 'Declaração assinada na Filadélfia', 1776, {'flag': 'USA'}),
    ('bastilha', 'Queda da Bastilha', 'Começa a Revolução Francesa', 1789, {'crest': 'franca_revolucionaria'}),
    ('waterloo', 'Batalha de Waterloo', 'Napoleão é derrotado de vez', 1815, {'face': 'wellington'}),
    ('primavera', 'Primavera dos Povos', 'Revoluções sacodem a Europa', 1848, {'face': 'marx'}),
], d=2, src=('en', 'Age of Revolution', ['1776', '1848']))
c.O('Coloque em ordem, do mais antigo ao mais recente, estes marcos do fim da escravidão?', [
    ('haiti', 'Revolta dos escravizados em São Domingos', 'Começa a Revolução Haitiana', 1791, {'face': 'toussaint'}),
    ('brit', 'Lei de abolição no Império Britânico', 'Aprovada pelo Parlamento em Londres', 1833, {'crest': 'imperio_britanico'}),
    ('franca', 'França abole a escravidão nas colônias', 'Decreto da Segunda República', 1848, {'flag': 'FRA'}),
    ('eua', '13ª Emenda nos Estados Unidos', 'Abolição em todo o país', 1865, {'face': 'lincoln'}),
    ('brasil', 'Lei Áurea', 'Assinada pela princesa regente', 1888, {'face': 'princesa_isabel'}),
], d=3, src=('en', 'Abolitionism', ['1833', '1888']))
c.O('Coloque estas invenções em ordem, da mais antiga à mais recente?', [
    ('watt', 'Máquina a vapor de Watt', 'Patente do condensador separado', 1769, {'flag': 'SCO'}),
    ('rocket', 'Locomotiva Rocket', 'Vence a competição de Rainhill', 1829, {'flag': 'ENG'}),
    ('morse', 'Primeira linha telegráfica de Morse', 'Washington–Baltimore', 1844, {'flag': 'USA'}),
    ('lampada', 'Lâmpada incandescente de Edison', 'Teste em Menlo Park', 1879, {'face': 'edison'}),
    ('14bis', 'Voo do 14-Bis', 'Campo de Bagatelle, Paris', 1906, {'face': 'santos_dumont'}),
], d=3, src=('en', "Stephenson's Rocket", ['1829', 'Rainhill']))

# ── Quem disse? ──
c.QT('Soldados, do alto destas pirâmides, quarenta séculos vos contemplam!', 'napoleao', 2,
     ctx='Frase atribuída ao general antes de uma batalha no Egito, julho de 1798',
     src=('en', 'Battle of the Pyramids', ['forty centuries']),
     x='Na batalha, os franceses derrotaram os mamelucos que dominavam o Egito.')
c.QT('As grandes questões do nosso tempo não serão decididas por discursos e votos da maioria, mas por ferro e sangue.', 'bismarck', 2,
     ctx='Discurso à comissão de orçamento do parlamento prussiano, setembro de 1862',
     src=('en', 'Blood and Iron (speech)', ['1862']),
     x='A expressão "ferro e sangue" virou o resumo da política que uniu a Alemanha por meio de três guerras.')
c.QT('A Inglaterra espera que cada homem cumpra o seu dever.', 'nelson', 3,
     ctx='Sinal de bandeiras içado na nau capitânia antes de uma batalha naval, outubro de 1805',
     src=('en', 'England expects that every man will do his duty', ['Trafalgar']),
     x='O almirante foi atingido por um atirador francês durante a batalha, mas ainda soube da vitória antes de morrer.')
c.QT('Ao me derrubar, cortaram apenas o tronco da árvore da liberdade dos negros. Ela voltará a brotar pelas raízes, porque são numerosas e profundas.', 'toussaint', 4,
     ctx='Ao ser embarcado preso num navio rumo à França, 1802',
     src=('en', 'Toussaint Louverture', ['Fort de Joux', '1802']),
     x='Morreu numa prisão gelada nas montanhas do Jura, em abril de 1803, menos de um ano antes da independência do Haiti.')
c.QT('O que é, para o escravo americano, o seu 4 de Julho?', 'Frederick Douglass', 4, typ='txt',
     wrong=['Harriet Tubman', 'John Brown', 'William Lloyd Garrison', 'Booker T. Washington', 'Sojourner Truth'],
     ctx='Discurso em Rochester, Nova York, a convite de abolicionistas, 5 de julho de 1852',
     src=('en', 'What to the Slave Is the Fourth of July?', ['Rochester', '1852']),
     x='O orador tinha fugido da escravidão em Maryland e se tornou o mais célebre abolicionista negro dos Estados Unidos.')
c.QT('Audácia, mais audácia, sempre audácia, e a França estará salva!', 'Georges Danton', 5, typ='txt',
     wrong=['Jean-Paul Marat', 'Camille Desmoulins', 'Saint-Just', 'Mirabeau', 'Lafayette'],
     ctx='Discurso à Assembleia em setembro de 1792, com os prussianos avançando sobre Paris',
     src=('en', 'Georges Danton', ['audace']),
     x='Em abril de 1794, o próprio orador acabou guilhotinado, em pleno Terror.')
c.QT('A Itália é apenas uma expressão geográfica.', 'Klemens von Metternich', 5, typ='txt',
     wrong=['Napoleão III', 'Lord Palmerston', 'Talleyrand', 'Francisco José I', 'Camillo Cavour'],
     ctx='Correspondência diplomática de 1847, sobre a península dividida em vários Estados',
     src=('en', 'Klemens von Metternich', ['Italy', 'Congress of Vienna']),
     x='Catorze anos depois, em 1861, foi proclamado o Reino da Itália.')

# ── Batalhas ──
c.BT('Quem venceu esta batalha, também chamada "dos Três Imperadores"?', 'imperio_frances', 'Austerlitz · 1805', '?', 'Rússia e Áustria', d=2,
     x='O vencedor completava naquele dia um ano da sua coroação como imperador.',
     src=('en', 'Battle of Austerlitz', ['Three Emperors']))
c.BT('Quem a frota britânica derrotou nesta batalha naval?', 'França e Espanha', 'Trafalgar · 1805', 'reino_unido', '?', d=2, typ='txt',
     wrong=['França e Holanda', 'Espanha e Portugal', 'Rússia e Turquia', 'França e Rússia', 'Holanda e Dinamarca'],
     x='A vitória consolidou a supremacia naval britânica, que duraria por todo o século XIX.',
     src=('en', 'Battle of Trafalgar', ['Spanish']))
c.BT('Qual império enfrentou o exército de Napoleão nesta batalha sangrenta, a caminho de Moscou?', 'imperio_russo', 'Borodino · 1812', 'imperio_frances', '?', d=1,
     x='Foi o dia mais sangrento das guerras napoleônicas; uma semana depois, os franceses entraram em Moscou.',
     src=('en', 'Battle of Borodino', ['Moscow', 'Kutuzov']))
c.BT('Qual reino, à frente dos estados alemães, capturou o imperador francês nesta batalha?', 'prussia', 'Sedan · 1870', '?', 'Segundo Império Francês', d=3,
     x='Napoleão III foi feito prisioneiro, e dois dias depois Paris proclamou a república.',
     src=('en', 'Battle of Sedan', ['Napoleon III']))
c.BT('Quem o exército de Dessalines derrotou nesta batalha, a última antes da independência do Haiti?', 'França', 'Vertières · 1803', 'HAI', '?', d=3, typ='txt',
     wrong=['Espanha', 'Reino Unido', 'Holanda', 'Portugal', 'Estados Unidos'],
     x='Em 1º de janeiro de 1804, o Haiti declarou independência, a primeira nação nascida de uma revolta de escravizados.',
     src=('en', 'Battle of Vertières', ['Dessalines']))
c.BT('Quem teve a frota destruída por Nelson nesta batalha, deixando seu exército preso no Egito?', 'franca_revolucionaria', 'Abukir (Nilo) · 1798', 'reino_unido', '?', d=4,
     x='O general que comandava a expedição voltou para casa no ano seguinte e deixou o exército para trás.',
     src=('en', 'Battle of the Nile', ['Aboukir']))
c.BT('Quem foi derrotado nesta batalha por franceses e piemonteses, na luta pela unificação italiana?', 'Império Austríaco', 'Solferino · 1859', 'França e Piemonte-Sardenha', '?', d=4, typ='txt',
     wrong=['Império Russo', 'Reino da Prússia', 'Império Otomano', 'Reino das Duas Sicílias', 'Estados Papais'],
     x='A carnificina impressionou o suíço Henry Dunant, que depois ajudou a fundar a Cruz Vermelha.',
     src=('en', 'Battle of Solferino', ['Dunant']))

# ── Linhagens ──
c.LN('Quem foi o terceiro presidente dos Estados Unidos?', 'jefferson', 'Primeiros presidentes dos EUA', ['George Washington', 'John Adams', '?', 'James Madison', 'James Monroe'], d=2, era='mod',
     src=('en', 'List of presidents of the United States', ['Jefferson']),
     x='Em 1803, comprou da França o território da Louisiana, quase dobrando o tamanho do país.')
c.LN('Qual regime falta nesta sequência da França revolucionária?', 'Consulado', 'França · 1789–1815', ['Monarquia constitucional', 'Convenção', 'Diretório', '?', 'Império'], d=3, era='mod', typ='txt',
     wrong=['Restauração', 'Monarquia de Julho', 'Segunda República', 'Comuna de Paris', 'Regência'],
     src=('en', 'French Consulate', ['Directory', 'Brumaire']),
     x='Napoleão chegou ao poder como Primeiro Cônsul com o golpe do 18 Brumário, em novembro de 1799.')
c.LN('Quem foi o segundo imperador da Alemanha unificada?', 'Frederico III', 'Imperadores alemães · 1871–1918', ['Guilherme I', '?', 'Guilherme II'], d=4, era='new', typ='txt',
     wrong=['Frederico Guilherme IV', 'Frederico II', 'Luís II', 'Francisco José I', 'Oto I'],
     src=('en', 'Frederick III, German Emperor', ['99 days']),
     x='Reinou só 99 dias em 1888, já doente de câncer na garganta: foi o "Ano dos Três Imperadores".')

# ── Manchetes ──
c.NW('Em que ano saiu esta manchete?', '1789', 'Povo de Paris toma a Bastilha', 1, paper='Folha de Paris',
     sub='Multidão invade a fortaleza-prisão em busca de pólvora; o governador é morto',
     wrong=['1776', '1783', '1792', '1793', '1799'], src=('en', 'Storming of the Bastille', ['1789', 'gunpowder']),
     x='O 14 de julho virou a data nacional da França.')
c.NW('Quem é o presidente desta manchete?', 'lincoln', 'Presidente é baleado num teatro de Washington', 1, paper='The Evening Star',
     sub='Ator simpatizante do Sul dispara no camarote; o país ainda celebrava o fim da guerra', typ='player',
     src=('en', 'Assassination of Abraham Lincoln', ["Ford's Theatre", 'Booth']),
     x='John Wilkes Booth atirou no Teatro Ford em 14 de abril de 1865, cinco dias depois da rendição do general Lee.')
c.NW('Em que ano saiu esta manchete?', '1804', 'General é coroado imperador em Notre-Dame', 2, paper='Le Moniteur Universel',
     sub='O papa Pio VII abençoa a cerimônia na catedral de Paris',
     wrong=['1799', '1802', '1806', '1808', '1812'], src=('en', 'Coronation of Napoleon', ['1804', 'Pius VII']),
     x='O quadro de Jacques-Louis David sobre a cerimônia, exposto no Louvre, tem quase dez metros de largura.')
c.NW('Em que ano saiu esta manchete?', '1848', 'Rei Luís Filipe abdica e Paris proclama a república', 3, paper='Le National',
     sub='Barricadas tomam a capital; a onda revolucionária se espalha pela Europa',
     wrong=['1815', '1830', '1851', '1870', '1871'], src=('en', 'French Revolution of 1848', ['Louis Philippe', '1848']),
     x='Naquele mesmo ano, a nova república francesa aboliu a escravidão em suas colônias.')
c.NW('Em que ano saiu esta manchete?', '1871', 'Rei da Prússia é proclamado imperador alemão em Versalhes', 3, paper='Vossische Zeitung',
     sub='Cerimônia na Galeria dos Espelhos sela a unificação da Alemanha',
     wrong=['1848', '1862', '1866', '1870', '1888'], src=('en', 'Unification of Germany', ['Hall of Mirrors', '1871']),
     x='Os alemães escolheram o palácio dos reis da França, enquanto suas tropas ainda cercavam Paris.')
c.NW('Quem é o explorador encontrado nesta manchete?', 'livingstone', 'Repórter encontra o missionário desaparecido na África', 3, paper='New York Herald',
     sub='Enviado do jornal acha o escocês em Ujiji, às margens do lago Tanganica', typ='player',
     src=('en', 'David Livingstone', ['Ujiji', 'Stanley']),
     x='Ao encontrá-lo, o jornalista Henry Stanley teria dito a frase que ficou famosa: "Dr. Livingstone, eu presumo?"')
c.NW('Em que ano saiu esta manchete?', '1895', 'Fotografias animadas encantam o público num café de Paris', 3, paper='Le Petit Journal',
     sub='Irmãos Lumière cobram ingresso pela primeira sessão pública de cinema',
     wrong=['1876', '1889', '1901', '1906', '1912'], src=('en', 'Auguste and Louis Lumière', ['1895', 'Grand Café']),
     x='A primeira sessão, em 28 de dezembro, exibiu dez filmes curtos, entre eles a saída dos operários da fábrica dos Lumière, em Lyon.')
c.NW('Em que ano saiu esta manchete?', '1861', 'Czar liberta milhões de servos', 4, paper='Gazeta de São Petersburgo',
     sub='Manifesto de Alexandre II põe fim à servidão na Rússia',
     wrong=['1825', '1848', '1855', '1870', '1881'], src=('en', 'Emancipation reform of 1861', ['1861', 'Alexander II']),
     x='Mais de 20 milhões de servos ganharam a liberdade, quase dois anos antes da Proclamação de Emancipação de Lincoln.')
c.NW('Em que ano saiu esta manchete?', '1870', 'Tropas italianas entram em Roma pela Porta Pia', 5, paper='La Nazione',
     sub='O papa perde o que restava dos Estados Pontifícios',
     wrong=['1848', '1859', '1861', '1866', '1871'], src=('en', 'Capture of Rome', ['Porta Pia', '1870']),
     x='A guarnição francesa que protegia o papa tinha partido para lutar contra a Prússia, abrindo caminho para os italianos.')

# ── Duelos ──
c.DU('Duelo: quem chegou primeiro ao poder?', 'napoleao', 'bismarck', 1, icon='crown',
     src=('en', 'Otto von Bismarck', ['1862']),
     x='Napoleão tomou o poder em 1799; Bismarck só passou a chefiar o governo prussiano em 1862.')
c.DU('Duelo: qual destes estados surgiu primeiro?', 'haiti', 'imperio_brasil', 2, typ=None, icon='hourglass',
     src=('en', 'Haiti', ['1804']),
     x='O Haiti declarou independência em 1804; o Brasil, em 1822.')
c.DU('Duelo: qual destas guerras terminou primeiro?', 'Guerra de Secessão', 'Guerra do Paraguai', 2, typ='txt', icon='sword',
     src=('en', 'Paraguayan War', ['1870']),
     x='A Guerra de Secessão acabou em 1865; a do Paraguai, só em 1870.')
c.DU('Duelo: quem nasceu primeiro?', 'wellington', 'napoleao', 4, icon='hourglass',
     src=('en', 'Arthur Wellesley, 1st Duke of Wellington', ['1769']),
     x='Os dois nasceram em 1769: Wellington, provavelmente em 1º de maio; Napoleão, em 15 de agosto.')
c.DU('Duelo: quem morreu primeiro?', 'beethoven', 'bolivar', 5, icon='hourglass',
     src=('en', 'Ludwig van Beethoven', ['1827']),
     x='Beethoven morreu em Viena em março de 1827; Bolívar, na Colômbia, em dezembro de 1830.')

# ── Fato ou mito? ──
c.MY('Quando foi tomada, em 1789, a Bastilha estava lotada de presos políticos?', False, 2, crest='franca_revolucionaria',
     x='Havia só sete presos: quatro falsificadores, dois considerados loucos e um nobre detido a pedido da própria família.',
     src=('en', 'Storming of the Bastille', ['forgers']))
c.MY('Na coroação de 1804, foi o papa quem pôs a coroa na cabeça de Napoleão?', False, 2, stad='notre_dame',
     x='O papa Pio VII abençoou a cerimônia, mas Napoleão coroou a si mesmo e depois coroou a imperatriz Josefina.',
     src=('en', 'Coronation of Napoleon', ['Pius VII', 'Josephine']))
c.MY('Abraham Lincoln foi o primeiro presidente dos Estados Unidos a ser assassinado?', True, 2, flag='USA',
     x='Depois dele, também foram assassinados James Garfield (1881), William McKinley (1901) e John F. Kennedy (1963).',
     src=('en', 'Assassination of Abraham Lincoln', ['first', 'Booth']))
c.MY('A rainha Vitória teve o reinado mais longo da história britânica?', False, 2, crest='reino_unido',
     x='Reinou 63 anos e 7 meses, recorde até 2015, quando foi superada por Elizabeth II, que ficou mais de 70 anos no trono.',
     src=('en', 'Queen Victoria', ['Elizabeth II']))
c.MY('A Torre Eiffel foi erguida para durar só 20 anos e depois ser desmontada?', True, 2, stad='torre_eiffel',
     x='A licença previa a demolição em 1909; a torre foi salva por sua utilidade como antena de rádio e telégrafo.',
     src=('en', 'Eiffel Tower', ['20 years', 'radio']))
c.MY('A guilhotina recebeu o nome de quem a inventou?', False, 3, icon='scales',
     x='O médico Joseph-Ignace Guillotin só propôs um método de execução igual para todos; a máquina foi projetada pelo cirurgião Antoine Louis.',
     src=('en', 'Joseph-Ignace Guillotin', ['Antoine Louis']))
c.MY('A Proclamação de Emancipação de Lincoln, de 1863, libertou de imediato todos os escravizados dos Estados Unidos?', False, 3, who='lincoln',
     x='Ela valia só para os estados rebeldes do Sul; a escravidão acabou em todo o país com a 13ª Emenda, em 1865.',
     src=('en', 'Emancipation Proclamation', ['Thirteenth Amendment']))
c.MY('Para ter a independência reconhecida, o Haiti foi obrigado a pagar uma indenização à França?', True, 4, flag='HAI',
     x='Em 1825, sob a ameaça de navios de guerra, o Haiti aceitou pagar 150 milhões de francos aos antigos colonos e teve de se endividar por décadas para quitar a conta.',
     src=('en', 'Haitian independence debt', ['indemnity', '1825']))
c.MY('Tropas britânicas já incendiaram a Casa Branca, em Washington?', True, 4, stad='capitolio',
     x='Em agosto de 1814, na Guerra de 1812, os britânicos tomaram Washington e queimaram a residência do presidente e o Capitólio.',
     src=('en', 'Burning of Washington', ['1814', 'White House']))

c.write()
