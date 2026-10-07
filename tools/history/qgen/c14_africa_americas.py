"""África e Américas (fora o Brasil) — two categories, all formats mixed."""
from qdsl import Cat

# ════════════════════════════════════════════════════════════════════
#  ÁFRICA
# ════════════════════════════════════════════════════════════════════
c = Cat('africa', 'África', '🌍', 'Reinos e impérios africanos', '#C07A2C', order=54)

# ── Texto: seis alternativas ──
c.T('Qual deserto as caravanas de camelos cruzavam levando sal para o sul e trazendo de volta o ouro da África ocidental?', 'Saara',
    ['Kalahari', 'Namibe', 'Gobi', 'Atacama', 'Sonora'], d=1, flag='MLI',
    src=('en', 'Trans-Saharan trade', ['salt']),
    x='Em Taghaza, no meio do deserto, até as casas e a mesquita eram feitas de blocos de sal, contou o viajante Ibn Battuta no século XIV.')
c.T('Por causa da colonização, qual língua europeia é hoje a oficial de Angola, Moçambique e Cabo Verde?', 'Português',
    ['Francês', 'Inglês', 'Espanhol', 'Holandês', 'Italiano'], d=1, flag='AGO',
    src=('en', 'Portuguese-speaking African countries', ['Mozambique']),
    x='As cinco ex-colônias portuguesas na África, com Guiné-Bissau e São Tomé e Príncipe, ficaram independentes entre 1973 e 1975.')
c.T('Por qual nome do seu clã, usado como apelido carinhoso, Nelson Mandela era chamado pelos sul-africanos?', 'Madiba',
    ['Mzee', 'Mwalimu', 'Osagyefo', 'Bwana', 'Ras'], d=2, flag='ZAF',
    src=('en', 'Nelson Mandela', ['Madiba']),
    x='Também o chamavam de Tata, "pai" em xhosa; Mzee, Mwalimu e Osagyefo eram os apelidos de Kenyatta, Nyerere e Nkrumah.')
c.T('Qual rio passava junto a Tombuctu e Gao, as grandes cidades comerciais dos impérios do Mali e Songai?', 'Níger',
    ['Nilo', 'Congo', 'Zambeze', 'Senegal', 'Limpopo'], d=2, crest='mali',
    src=('en', 'Niger River', ['Timbuktu']),
    x='O Níger faz uma grande curva em direção ao Saara; ali, onde o rio encontra o deserto, cresceram os entrepostos das caravanas.')
c.T('Em qual país atual ficam as ruínas de Cartago, a grande rival de Roma?', 'Tunísia',
    ['Líbia', 'Marrocos', 'Argélia', 'Egito', 'Líbano'], d=2, crest='cartago',
    src=('en', 'Carthage', ['Tunis']),
    x='Os restos de Cartago ficam num subúrbio de Túnis, a capital do país, e são Patrimônio Mundial da UNESCO desde 1979.')
c.T('Qual reino da África ocidental, no sul da atual Nigéria, criou as placas e cabeças de metal saqueadas por uma expedição britânica em 1897?', 'Benin',
    ['Daomé', 'Axante', 'Oió', 'Congo', 'Songai'], d=3, icon='bust',
    src=('en', 'Benin Bronzes', ['1897']),
    x='Milhares de peças, conhecidas como "bronzes do Benin", foram levadas para museus da Europa e dos Estados Unidos; nos últimos anos, várias começaram a ser devolvidas à Nigéria.')
c.T('Qual rei europeu governou o Estado Livre do Congo como propriedade pessoal, a partir de 1885, com um regime brutal de trabalho forçado?', 'Leopoldo II',
    ['Leopoldo I', 'Alberto I', 'Guilherme II', 'Napoleão III', 'Afonso XIII'], d=3, icon='crown',
    src=('en', 'Congo Free State', ['Leopold II']),
    x='As denúncias sobre a coleta de borracha causaram escândalo internacional, e a Bélgica assumiu o território como colônia em 1908.')
c.T('Qual império, o primeiro grande reino do ouro na África ocidental, antecedeu o Mali e tinha sua capital em Kumbi Saleh?', 'Gana',
    ['Songai', 'Benin', 'Kanem', 'Axum', 'Congo'], d=4, icon='coins',
    src=('en', 'Ghana Empire', ['Mali']),
    x='O país que hoje se chama Gana fica bem mais ao sul: só adotou o nome do antigo império ao se tornar independente, em 1957.')
c.T('Qual reino da África central teve um rei cristão, Afonso I, que no século XVI trocava cartas com os reis de Portugal?', 'Reino do Congo',
    ['Reino de Ndongo', 'Reino do Benin', 'Império do Mali', 'Reino Zulu', 'Império Songai'], d=4, crest='imperio_portugues',
    src=('en', 'Afonso I of Kongo', ['Portugal']),
    x='Numa dessas cartas, Afonso I se queixou ao rei D. João III do tráfico de escravizados que despovoava o seu reino.')
c.T('Qual cidade, capital do reino de Cuxe no atual Sudão, deu nome a uma grande necrópole de pirâmides?', 'Méroe',
    ['Tebas', 'Axum', 'Cartago', 'Alexandria', 'Tombuctu'], d=5, icon='pyramid',
    src=('en', 'Meroë', ['pyramids']),
    x='As pirâmides de Cuxe são menores e mais íngremes que as do Egito, e foram erguidas muitos séculos depois delas.')
c.T('Qual cidade da Etiópia é famosa pelas igrejas medievais escavadas inteiras na rocha?', 'Lalibela',
    ['Axum', 'Gondar', 'Adis Abeba', 'Harar', 'Méroe'], d=4, flag='ETH',
    src=('en', 'Lalibela', ['churches']),
    x='A cidade leva o nome do rei que mandou escavar as igrejas, por volta do ano 1200, para criar uma "nova Jerusalém" na África.')

# ── Personagens e estados ──
c.P('Qual líder, futuro herói de outra independência, viveu mais de vinte anos na África do Sul, onde criou seus métodos de resistência não violenta?', 'gandhi', d=2, flag='ZAF',
    src=('en', 'Mahatma Gandhi', ['South Africa']),
    x='Em 1893, foi expulso de um vagão de primeira classe em Pietermaritzburg por ser indiano; o episódio mudou a sua vida.')
c.P('Qual chanceler recebeu em sua capital, entre 1884 e 1885, a conferência que fixou as regras da partilha da África entre as potências europeias?', 'bismarck', d=3, icon='map',
    src=('en', 'Berlin Conference', ['Bismarck']),
    x='Nenhum africano foi convidado: catorze países, quase todos europeus, decidiram as regras para ocupar o continente.')
c.C('Qual império da África ocidental, com capital em Gao, dominou o comércio do Saara até ser derrotado por um exército marroquino armado de arcabuzes, em 1591?', 'songai', d=3, icon='cannon',
    src=('en', 'Songhai Empire', ['1591']),
    x='Na Batalha de Tondibi, as armas de fogo marroquinas venceram um exército bem maior, que lutava com lanças, arcos e cavalaria.')
c.C('Qual reino africano cunhava moedas próprias de ouro, prata e bronze e controlava o porto de Adúlis, no mar Vermelho?', 'axum', d=4, icon='coins',
    src=('en', 'Kingdom of Aksum', ['Adulis']),
    x='No século III, o profeta persa Mani o contou entre as quatro grandes potências do mundo, ao lado de Roma, da Pérsia e da China.')

# ── Quem sou eu? ──
c.Q('Quem sou eu?', 'haile_selassie', [
    'Governei por mais de quarenta anos um antigo império cristão do leste da África.',
    'Fui coroado imperador em 1930 e deposto por militares em 1974.',
    'Em 1936, pedi ajuda à Liga das Nações contra a invasão do meu país pela Itália fascista.',
    'O movimento rastafári, nascido na Jamaica, tirou seu nome da forma como eu era chamado antes da coroação: Ras Tafari.'],
    d=3, icon='crown', src=('en', 'Haile Selassie', ['Rastafari']),
    x='Seu nome de coroação significa "Poder da Trindade"; antes de reinar, ele já governava o país como regente desde 1916.')
c.Q('Quem sou eu?', 'shaka', [
    'Fui filho de um chefe, mas cresci longe da corte do meu pai, ao lado da minha mãe, Nandi.',
    'Armei meus guerreiros com uma lança curta de estocada e os fiz atacar em formação de "chifres de búfalo".',
    'Transformei um pequeno clã num poderoso reino no sudeste da África, no início do século XIX.',
    'Fui assassinado em 1828 por dois meios-irmãos; um deles me sucedeu no trono.'],
    d=3, icon='sword', src=('en', 'Shaka', ['Dingane']),
    x='Seus regimentos eram formados por homens da mesma idade, e o exército chegou a reunir dezenas de milhares de guerreiros.')

# ── Linha do tempo ──
c.O('Coloque em ordem, do mais antigo ao mais recente?', [
    ('anibal', 'Aníbal cruza os Alpes', 'O general de Cartago invade a Itália', -218, {'face': 'anibal'}),
    ('musa', 'Mansa Mussa vai a Meca', 'A peregrinação do rei do Mali', 1324, {'face': 'mansa_musa'}),
    ('shaka', 'Shaka assume o poder', 'Nasce o Reino Zulu', 1816, {'face': 'shaka'}),
    ('adwa', 'Batalha de Adwa', 'A Etiópia vence a Itália', 1896, {'flag': 'ETH'}),
    ('mandela', 'Mandela toma posse', 'Fim do apartheid', 1994, {'face': 'mandela'}),
], d=2, src=('en', 'Mansa Musa', ['1324']))
c.O('Do mais antigo ao mais recente, ordene estes marcos do fim do domínio colonial na África?', [
    ('egito', 'Egito deixa de ser protetorado britânico', 'Nasce o Reino do Egito', 1922, {'flag': 'EGY'}),
    ('marrocos', 'Marrocos se livra do domínio francês', 'Fim do protetorado', 1956, {'flag': 'MAR'}),
    ('mali', 'Mali se torna independente', 'O "Ano da África"', 1960, {'flag': 'MLI'}),
    ('angola', 'Angola proclama a independência', 'Fim do domínio português', 1975, {'flag': 'AGO'}),
], d=3, src=('en', 'Decolonisation of Africa', ['Angola']))

# ── Quem disse? ──
c.QT('É um ideal pelo qual espero viver e que espero alcançar. Mas, se for preciso, é um ideal pelo qual estou preparado para morrer.', 'mandela', 2,
     ctx='Discurso no banco dos réus de um julgamento político em Pretória, 1964',
     src=('en', 'Rivonia Trial', ['Mandela']),
     x='Condenado à prisão perpétua nesse mesmo julgamento, ele só deixaria a prisão em fevereiro de 1990.')
c.QT('Enfim, a batalha terminou! E assim Gana, a sua amada pátria, está livre para sempre!', 'Kwame Nkrumah', 4, typ='txt',
     wrong=['Jomo Kenyatta', 'Patrice Lumumba', 'Julius Nyerere', 'Léopold Senghor', 'Nelson Mandela'],
     ctx='Discurso à meia-noite em Acra, 6 de março de 1957',
     src=('en', 'Kwame Nkrumah', ['1957']),
     x='Ele governou o país, a antiga Costa do Ouro, até ser deposto em 1966, e foi um dos grandes defensores do pan-africanismo.')

# ── Batalhas ──
c.BT('Qual país europeu tentou conquistar a Etiópia e foi derrotado nesta batalha?', 'Itália', 'Adwa · 1896', 'ETH', '?', d=2, typ='txt',
     wrong=['Reino Unido', 'França', 'Portugal', 'Alemanha', 'Bélgica'],
     x='A vitória do imperador Menelik II garantiu a independência etíope e virou símbolo para todo o continente africano.',
     src=('en', 'Battle of Adwa', ['Menelik']))
c.BT('Quem os zulus derrotaram nesta batalha, um dos maiores reveses de um exército colonial na África?', 'Britânicos', 'Isandlwana · 1879', 'Zulus', '?', d=3, typ='txt',
     wrong=['Bôeres', 'Portugueses', 'Franceses', 'Alemães', 'Holandeses'],
     x='Armados sobretudo de lanças e escudos, os guerreiros do rei Cetshwayo venceram tropas com fuzis e artilharia.',
     src=('en', 'Battle of Isandlwana', ['Cetshwayo']))
c.BT('Qual reino perdeu nesta batalha, no Marrocos, o seu jovem rei, desaparecido em combate?', 'Portugal', 'Alcácer-Quibir · 1578', '?', 'Marrocos', d=2, typ='txt',
     wrong=['Espanha', 'França', 'Inglaterra', 'Império Otomano', 'Veneza'],
     x='O rei sumiu sem deixar herdeiros; dois anos depois, o reino perdeu a independência para a coroa vizinha, por 60 anos.',
     src=('en', 'Battle of Alcácer Quibir', ['1578']))

# ── Linhagens ──
c.LN('Quem abre a lista de presidentes da África do Sul depois do apartheid?', 'mandela', 'Presidentes da África do Sul · desde 1994',
     ['?', 'Thabo Mbeki', 'Kgalema Motlanthe', 'Jacob Zuma'], d=1, era='new',
     src=('en', 'President of South Africa', ['Mbeki']),
     x='Eleito em 1994, ele governou um só mandato e deixou o cargo em 1999, aos 80 anos.')
c.LN('Quem completa esta sucessão de reis zulus?', 'Dingane', 'Reis zulus · século XIX',
     ['Shaka', '?', 'Mpande', 'Cetshwayo'], d=5, era='new', typ='txt',
     wrong=['Dinuzulu', 'Senzangakhona', 'Moshoeshoe', 'Mzilikazi', 'Sobhuza'],
     src=('en', 'Zulu Kingdom', ['Dingane']),
     x='Ele subiu ao trono depois de participar do assassinato do meio-irmão, em 1828, e foi derrotado pelos bôeres em Blood River, em 1838.')

# ── Manchetes ──
c.NW('Em que ano saiu esta manchete?', '1990', 'Mandela deixa a prisão depois de 27 anos', 2, paper='Diário do Cabo',
     sub='De punho erguido, o líder do CNA caminha para fora da prisão Victor Verster',
     wrong=['1985', '1988', '1989', '1992', '1994'], src=('en', 'Nelson Mandela', ['1990']),
     x='Quatro anos depois, nas primeiras eleições abertas a todos os sul-africanos, ele foi eleito presidente.')
c.NW('Em que ano saiu esta manchete?', '1976', 'Estudantes marcham em Soweto contra o ensino em africâner', 4, paper='Jornal de Joanesburgo',
     sub='Polícia reprime o protesto a tiros; o levante se espalha pelo país',
     wrong=['1960', '1964', '1970', '1984', '1990'], src=('en', 'Soweto uprising', ['1976']),
     x='O 16 de junho, dia em que a marcha começou, é hoje feriado na África do Sul: o Dia da Juventude.')

# ── Duelo ──
c.DU('Duelo: quem viveu primeiro?', 'anibal', 'mansa_musa', 1, icon='hourglass',
     src=('en', 'Hannibal', ['247']),
     x='Mais de 1.400 anos separam o general de Cartago do rei do Mali.')
c.DU('Duelo: quem nasceu primeiro?', 'nzinga', 'shaka', 3, icon='hourglass',
     src=('en', 'Nzinga of Ndongo and Matamba', ['1583']),
     x='A rainha angolana nasceu por volta de 1583, cerca de dois séculos antes do fundador do Reino Zulu.')

# ── Fato ou mito? ──
c.MY('Mansa Mussa levou tanto ouro em sua peregrinação a Meca que o preço do metal caiu no Cairo por anos?', True, 2, who='mansa_musa',
     x='O cronista al-Umari contou, uns doze anos depois, que o ouro ainda valia menos no Egito por causa dos gastos e presentes do rei do Mali.',
     src=('en', 'Mansa Musa', ['Cairo']))
c.MY('As muralhas do Grande Zimbábue foram erguidas por povos vindos de fora da África, como fenícios ou árabes?', False, 2, icon='castle',
     x='Essa ideia foi espalhada por colonos europeus; a arqueologia mostra que a cidade foi construída por ancestrais do povo xona, entre os séculos XI e XV.',
     src=('en', 'Great Zimbabwe', ['Shona']))
c.MY('Depois de destruir Cartago, em 146 a.C., os romanos salgaram a terra para que nada mais crescesse ali?', False, 4, crest='republica_romana',
     x='Nenhum texto antigo fala em sal: a história só aparece em autores modernos, e Roma acabou fundando uma nova Cartago no mesmo lugar.',
     src=('en', 'Salting the earth', ['Carthage']))
c.write()


# ════════════════════════════════════════════════════════════════════
#  AMÉRICAS
# ════════════════════════════════════════════════════════════════════
c = Cat('americas', 'Américas', '🌎', 'Maias, astecas, incas e independências', '#2E7D6B', order=55)

# ── Texto: seis alternativas ──
c.T('Em que dia os Estados Unidos comemoram a sua independência?', '4 de julho',
    ['14 de julho', '7 de setembro', '1º de maio', '12 de outubro', '25 de dezembro'], d=1, flag='USA',
    src=('en', 'Independence Day (United States)', ['July 4']),
    x='Nesse dia, em 1776, o Congresso Continental aprovou a Declaração de Independência, em Filadélfia.')
c.T('Qual país sul-americano recebeu o nome em homenagem a Simón Bolívar?', 'Bolívia',
    ['Colômbia', 'Equador', 'Peru', 'Paraguai', 'Uruguai'], d=1, who='bolivar',
    src=('en', 'Bolivia', ['Bolívar']),
    x='A república foi proclamada em 1825, no território que os espanhóis chamavam de Alto Peru.')
c.T('Que animal, trazido pelos espanhóis, os astecas e os incas nunca tinham visto antes da conquista?', 'Cavalo',
    ['Lhama', 'Cachorro', 'Jaguar', 'Alpaca', 'Condor'], d=1, who='cortes',
    src=('en', 'Columbian exchange', ['horse']),
    x='Os cavalos já tinham existido na América, mas se extinguiram lá há uns 10 mil anos; a cavalaria espanhola causou espanto nas batalhas.')
c.T('Que ideia matemática os maias usavam muitos séculos antes de ela chegar à Europa?', 'O zero',
    ['Os números negativos', 'O número pi', 'Os logaritmos', 'As frações decimais', 'A raiz quadrada'], d=2, stad='chichen_itza',
    src=('en', 'Maya numerals', ['zero']),
    x='Os maias contavam de 20 em 20 e escreviam o zero com o desenho de uma concha.')
c.T('Qual líder camponês do sul do México comandou o Exército Libertador do Sul e lutou pela reforma agrária na Revolução Mexicana?', 'Emiliano Zapata',
    ['Pancho Villa', 'Francisco Madero', 'Venustiano Carranza', 'Porfirio Díaz', 'Benito Juárez'], d=2, flag='MEX',
    src=('en', 'Emiliano Zapata', ['Morelos']),
    x='Seu Plano de Ayala, de 1911, exigia devolver aos povoados as terras tomadas pelas grandes fazendas.')
c.T('Qual mulher indígena serviu de intérprete e conselheira de Hernán Cortés durante a conquista do México?', 'La Malinche',
    ['Pocahontas', 'Sacagawea', 'Anacaona', 'Bartolina Sisa', 'Micaela Bastidas'], d=3, who='moctezuma',
    src=('en', 'La Malinche', ['Nahuatl']),
    x='Ela falava náuatle e maia; um espanhol que tinha vivido entre os maias passava as falas para o castelhano.')
c.T('Qual cidade mineira da atual Bolívia, ao pé do "Cerro Rico", foi a mais famosa fonte de prata do Império Espanhol?', 'Potosí',
    ['Zacatecas', 'Guanajuato', 'Huancavelica', 'Ouro Preto', 'Cuzco'], d=3, crest='imperio_espanhol',
    src=('en', 'Potosí', ['silver']),
    x='A riqueza era tanta que "vale um Potosí" virou expressão espanhola para algo de valor enorme; até Cervantes cita as minas de Potosí no Dom Quixote.')
c.T('Qual revolucionário mexicano atacou a cidade americana de Columbus, no Novo México, em 1916?', 'Pancho Villa',
    ['Emiliano Zapata', 'Francisco Madero', 'Venustiano Carranza', 'Álvaro Obregón', 'Victoriano Huerta'], d=4, flag='USA',
    src=('en', 'Pancho Villa', ['Columbus']),
    x='Em resposta, os Estados Unidos mandaram ao México uma expedição de quase um ano, que nunca conseguiu capturá-lo.')
c.T('Como se chamavam as "ilhas" de cultivo, feitas de lama e plantas, que os astecas criavam nas águas rasas dos lagos?', 'Chinampas',
    ['Socalcos', 'Polders', 'Quipus', 'Calpullis', 'Milpas'], d=4, crest='asteca',
    src=('en', 'Chinampa', ['Aztec']),
    x='Ainda hoje há chinampas em Xochimilco, na Cidade do México, onde os turistas passeiam em barcos coloridos.')
c.T('Qual soberano inca transformou o pequeno reino de Cuzco num grande império, a partir de 1438?', 'Pachacuti',
    ['Atahualpa', 'Huáscar', 'Manco Cápac', 'Huayna Cápac', 'Túpac Amaru'], d=4, stad='machu_picchu',
    src=('en', 'Pachacuti', ['1438']),
    x='Machu Picchu provavelmente foi construída como propriedade real para ele, por volta de 1450.')
c.T('Qual líder indígena, que dizia descender dos incas, comandou em 1780, no Peru, uma grande rebelião contra o domínio espanhol?', 'Túpac Amaru II',
    ['Atahualpa', 'Manco Inca', 'Lautaro', 'Caupolicán', 'Guaicaipuro'], d=4, crest='imperio_espanhol',
    src=('en', 'Túpac Amaru II', ['1780']),
    x='Seu nome verdadeiro era José Gabriel Condorcanqui; adotou o nome de Túpac Amaru, o último inca de Vilcabamba. Capturado, foi executado em Cuzco em 1781.')

# ── Personagens e estados ──
c.P('Qual general atravessou o rio Delaware na noite de Natal de 1776 para atacar de surpresa as tropas inimigas em Trenton?', 'washington', d=2, icon='ship',
    src=('en', 'Battle of Trenton', ['Delaware']),
    x='A cena virou um quadro famoso, pintado em 1851 por um artista alemão-americano, com o general de pé no barco.')
c.C('Qual país se tornou independente em 1804, depois da única revolta de escravizados que deu origem a uma nação?', 'haiti', d=2, flag='FRA',
    src=('en', 'Haitian Revolution', ['1804']),
    x='Foi o segundo país das Américas a se tornar independente, depois dos Estados Unidos, e o primeiro da América Latina.')
c.C('Qual república, criada em 1819 com Bolívar na presidência, se desfez em 1831 dando origem a três países, entre eles a Venezuela e o Equador?', 'gran_colombia', d=3, who='bolivar',
    src=('en', 'Gran Colombia', ['1831']),
    x='O nome oficial era República de Colômbia; "Grã-Colômbia" é como os historiadores a chamam, para distingui-la do país atual.')

# ── Quem sou eu? ──
c.Q('Quem sou eu?', 'toussaint', [
    'Nasci escravizado numa colônia francesa do Caribe, por volta de 1743.',
    'Já era livre quando estourou a grande revolta de 1791, da qual me tornei o principal general.',
    'Lutei contra ingleses e espanhóis e cheguei a governar toda a ilha de São Domingos.',
    'Preso a mando de Napoleão, morri em 1803 numa fortaleza nas montanhas do Jura, na França.'],
    d=3, icon='chains', src=('en', 'Toussaint Louverture', ['Joux']),
    x='Ele morreu meses antes da independência do Haiti, proclamada em 1º de janeiro de 1804 por seu antigo tenente Dessalines.')
c.Q('Quem sou eu?', 'san_martin', [
    'Nasci em 1778 no vice-reino do Rio da Prata, mas fui educado na Espanha.',
    'Lutei no exército espanhol contra as tropas de Napoleão antes de voltar à América.',
    'Atravessei a cordilheira dos Andes com o Exército dos Andes para libertar o Chile.',
    'Proclamei a independência do Peru em Lima, em 1821, e me encontrei com Bolívar em Guayaquil.'],
    d=3, flag='CHI', src=('en', 'José de San Martín', ['Guayaquil']),
    x='Depois do encontro com Bolívar, retirou-se da luta e passou os últimos anos exilado na França, onde morreu em 1850.')

# ── Linha do tempo ──
c.O('Do mais antigo ao mais recente, coloque estes marcos da América antiga em ordem?', [
    ('olmeca', 'Olmecas esculpem cabeças colossais', 'San Lorenzo, Golfo do México', -1200, {'flag': 'MEX'}),
    ('tenoch', 'Fundação de Tenochtitlán', 'Os mexicas no lago Texcoco', 1325, {'crest': 'asteca'}),
    ('pacha', 'Pachacuti começa a expansão inca', 'A partir de Cuzco', 1438, {'crest': 'inca'}),
    ('colombo', 'Colombo chega às Antilhas', 'A primeira viagem', 1492, {'face': 'colombo'}),
    ('cortes', 'Cortés desembarca no México', 'Começa a conquista', 1519, {'face': 'cortes'}),
], d=3, src=('en', 'Tenochtitlan', ['1325']))
c.O('Coloque em ordem, da mais antiga à mais recente, estas independências nas Américas?', [
    ('paraguai', 'Paraguai rompe com a Espanha', 'Revolução de maio em Assunção', 1811, {'flag': 'PAR'}),
    ('argentina', 'Argentina declara a independência', 'Congresso de Tucumán', 1816, {'flag': 'ARG'}),
    ('chile', 'Chile proclama a independência', 'Um ano depois de Chacabuco', 1818, {'flag': 'CHI'}),
    ('mexico', 'México conquista a independência', 'O Exército Trigarante entra na capital', 1821, {'flag': 'MEX'}),
    ('cuba', 'Nasce a República de Cuba', 'Fim da ocupação americana', 1902, {'flag': 'CUB'}),
], d=4, src=('en', 'Latin American wars of independence', ['Chile']))

# ── Quem disse? ──
c.QT('Que o governo do povo, pelo povo e para o povo não desapareça da Terra.', 'lincoln', 2,
     ctx='Discurso num cemitério militar da Pensilvânia, novembro de 1863',
     src=('en', 'Gettysburg Address', ['people']),
     x='O discurso tem pouco mais de 270 palavras e durou uns dois minutos.')
c.QT('A América é ingovernável para nós. Quem serve a uma revolução ara no mar.', 'bolivar', 5, kind='carta',
     ctx='Carta de 1830, escrita semanas antes de morrer, desiludido com a desunião das novas repúblicas',
     src=('en', 'Simón Bolívar', ['1830']),
     x='Ele morreu em dezembro de 1830, perto de Santa Marta, na Colômbia, quando se preparava para deixar o país.')

# ── Batalhas ──
c.BT('Quem a União derrotou nesta batalha de três dias, na Pensilvânia?', 'Confederados', 'Gettysburg · 1863', 'União', '?', d=1, typ='txt',
     wrong=['Britânicos', 'Mexicanos', 'Franceses', 'Espanhóis', 'Canadenses'],
     x='Foi a batalha mais sangrenta da Guerra de Secessão e pôs fim à invasão do Norte comandada pelo general Lee.',
     src=('en', 'Battle of Gettysburg', ['Lee']))
c.BT('Que jovem nação, com a ajuda da França, cercou e venceu os britânicos de Cornwallis nesta batalha?', 'estados_unidos', 'Yorktown · 1781', '?', 'reino_unido', d=2,
     x='A rendição britânica praticamente decidiu a guerra; a paz que reconheceu a independência foi assinada em Paris, em 1783.',
     src=('en', 'Siege of Yorktown', ['Cornwallis']))
c.BT('Quem o exército mexicano derrotou nesta batalha, hoje lembrada no feriado de Cinco de Mayo?', 'Franceses', 'Puebla · 1862', 'MEX', '?', d=3, typ='txt',
     wrong=['Espanhóis', 'Americanos', 'Britânicos', 'Texanos', 'Austríacos'],
     x='A vitória só adiou a invasão: em 1863 os franceses tomaram a capital e, no ano seguinte, puseram Maximiliano no trono.',
     src=('en', 'Battle of Puebla', ['1862']))
c.BT('Quem comandou os independentistas nesta batalha, que selou o fim do domínio espanhol na América do Sul?', 'Antonio José de Sucre', 'Ayacucho · 1824', 'ESP', '?', d=4, typ='txt',
     wrong=['Simón Bolívar', 'José de San Martín', "Bernardo O'Higgins", 'Francisco de Miranda', 'José Antonio Páez'],
     x='Bolívar estava em Lima; a vitória coube ao seu general de confiança, então com 29 anos, que capturou o próprio vice-rei do Peru.',
     src=('en', 'Battle of Ayacucho', ['Sucre']))

# ── Linhagens ──
c.LN('Qual presidente completa o grupo esculpido no Monte Rushmore?', 'lincoln', 'Monte Rushmore · Dakota do Sul',
     ['George Washington', 'Thomas Jefferson', 'Theodore Roosevelt', '?'], d=2, kind='grupo', era='new',
     src=('en', 'Mount Rushmore', ['Lincoln']),
     x='Cada rosto tem cerca de 18 metros de altura; a escultura foi feita entre 1927 e 1941.')
c.LN('Qual soberano asteca falta nesta sucessão?', 'moctezuma', 'Tlatoanis de Tenochtitlán · 1486–1521',
     ['Ahuitzotl', '?', 'Cuitláhuac', 'Cuauhtémoc'], d=3, era='mod',
     src=('en', 'Cuitláhuac', ['Cuauhtémoc']),
     x='Cuitláhuac reinou só uns 80 dias e morreu de varíola; Cuauhtémoc, o último, resistiu até o fim do cerco de Tenochtitlán.')
c.LN('Quem completa este grupo de comandantes da Revolução Cubana?', 'che', 'Comandantes da Sierra Maestra · 1959',
     ['Fidel Castro', 'Raúl Castro', 'Camilo Cienfuegos', '?'], d=2, kind='grupo', era='new',
     src=('en', 'Cuban Revolution', ['Cienfuegos']),
     x='Era o único estrangeiro do grupo: nascido na Argentina, recebeu a cidadania cubana em 1959.')

# ── Manchetes ──
c.NW('Em que ano saiu esta manchete?', '1959', 'Batista foge e os rebeldes entram em Havana', 2, paper='El Heraldo Habanero',
     sub='Os guerrilheiros barbudos da Sierra Maestra derrubam a ditadura',
     wrong=['1953', '1956', '1957', '1961', '1962'], src=('en', 'Cuban Revolution', ['1959']),
     x='O ditador fugiu na madrugada do Ano-Novo; Fidel Castro chegou a Havana uma semana depois, aclamado pela multidão.')
c.NW('Em que ano saiu esta manchete?', '1910', 'Madero chama o México às armas contra Porfirio Díaz', 3, paper='Gazeta do México',
     sub='O levante está marcado para o dia 20 de novembro',
     wrong=['1876', '1898', '1905', '1914', '1917'], src=('en', 'Mexican Revolution', ['1910']),
     x='Díaz governava o México havia mais de trinta anos; caiu em 1911, mas a revolução continuou por quase uma década.')

# ── Duelo ──
c.DU('Duelo: quem nasceu primeiro?', 'washington', 'bolivar', 1, icon='hourglass',
     src=('en', 'George Washington', ['1732']),
     x='Washington nasceu em 1732, mais de meio século antes do Libertador, que é de 1783.')
c.DU('Duelo: quem nasceu primeiro?', 'san_martin', 'bolivar', 4, icon='hourglass',
     src=('en', 'José de San Martín', ['1778']),
     x='O argentino nasceu em 1778, cinco anos antes do venezuelano; os dois se encontraram uma única vez, em Guayaquil, em 1822.')

# ── Fato ou mito? ──
c.MY('Os maias previram que o mundo acabaria em 2012?', False, 1, crest='maia',
     x='Em 2012 terminava apenas um grande ciclo do calendário maia, a Conta Longa; nenhum texto maia fala em fim do mundo.',
     src=('en', '2012 phenomenon', ['Maya']))
c.MY('George Washington usava dentaduras de madeira?', False, 2, who='washington',
     x='Ele perdeu quase todos os dentes, mas suas dentaduras eram de marfim, metal e dentes humanos e de animais, nunca de madeira.',
     src=('en', 'George Washington', ['teeth']))
c.MY('O chocolate já era consumido pelos maias e astecas antes da chegada dos europeus?', True, 1, icon='amphora',
     x='Eles tomavam o cacau como uma bebida amarga e espumante, às vezes com pimenta; as sementes chegavam a servir de moeda.',
     src=('en', 'History of chocolate', ['Maya']))
c.write()
