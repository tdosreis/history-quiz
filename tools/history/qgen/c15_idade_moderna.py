"""Idade Moderna (1450-1789): navegações, Renascimento, Reforma, absolutismo e Luzes — all formats in one pack."""
from qdsl import Cat

c = Cat('idade_moderna', 'Idade Moderna', '🧭', 'Navegações, Renascimento e reis absolutos', '#3F5F73', order=56)

# ── Texto: seis alternativas ──
c.T('Qual cidade italiana, governada pela família Médici, é considerada o berço do Renascimento?', 'Florença',
    ['Roma', 'Veneza', 'Milão', 'Nápoles', 'Gênova'], d=1, icon='palette',
    src=('en', 'Florence', ['Renaissance']),
    x='Ali trabalharam Brunelleschi, Botticelli, Leonardo e o jovem Michelangelo, muitos deles com dinheiro dos Médici, uma família de banqueiros.')
c.T('Que nome recebeu o movimento religioso iniciado por Martinho Lutero em 1517?', 'Reforma Protestante',
    ['Contrarreforma', 'Renascimento', 'Iluminismo', 'Cisma do Oriente', 'Cruzadas'], d=1, who='lutero',
    src=('en', 'Reformation', ['1517']),
    x='O nome "protestante" surgiu em 1529, quando príncipes luteranos protestaram formalmente contra uma decisão da Dieta de Espira.')
c.T('Para qual língua Lutero traduziu a Bíblia, aproximando o texto sagrado das pessoas comuns?', 'Alemão',
    ['Latim', 'Grego', 'Hebraico', 'Holandês', 'Inglês'], d=1, icon='book',
    src=('en', 'Luther Bible', ['1534']),
    x='O Novo Testamento saiu em 1522, e a Bíblia completa, em 1534; a tradução ajudou a firmar o alemão escrito moderno.')
c.T('Qual movimento intelectual do século XVIII defendia a razão contra o absolutismo e a intolerância religiosa?', 'Iluminismo',
    ['Renascimento', 'Romantismo', 'Humanismo', 'Barroco', 'Positivismo'], d=1, who='voltaire',
    src=('pt', 'Iluminismo', ['século XVIII']),
    x='As ideias circulavam em salões, cafés e livros proibidos, e inspiraram a independência dos Estados Unidos e a Revolução Francesa.')
c.T('Como se chama o sistema em que o rei concentra todos os poderes, comum na Europa dos séculos XVII e XVIII?', 'Absolutismo',
    ['Parlamentarismo', 'Feudalismo', 'Federalismo', 'Republicanismo', 'Anarquismo'], d=1, who='luis_xiv',
    src=('en', 'Absolute monarchy', ['Louis XIV']),
    x='Na Inglaterra, o modelo perdeu a disputa: em 1689, a Declaração de Direitos submeteu o rei às leis aprovadas pelo Parlamento.')
c.T('Qual era o nome da nau capitânia de Colombo na viagem de 1492?', 'Santa Maria',
    ['Pinta', 'Niña', 'São Gabriel', 'Victoria', 'Mayflower'], d=2, icon='ship',
    src=('en', 'Christopher Columbus', ['Santa María']),
    x='A Santa Maria encalhou no litoral do Haiti na noite de Natal de 1492; com a madeira dela, os marinheiros ergueram o forte La Navidad.')
c.T('Que oceano Fernão de Magalhães batizou assim por causa das águas calmas que encontrou ao entrar nele?', 'Pacífico',
    ['Atlântico', 'Índico', 'Ártico', 'Antártico', 'Mar Tenebroso'], d=2, who='magalhaes',
    src=('en', 'Ferdinand Magellan', ['Pacific']),
    x='A travessia durou mais de três meses quase sem comida: os marinheiros chegaram a comer o couro que protegia as vergas dos navios.')
c.T('Que doença, causada pela falta de vitamina C, matava muitos marinheiros nas longas viagens das Grandes Navegações?', 'Escorbuto',
    ['Peste bubônica', 'Malária', 'Varíola', 'Cólera', 'Febre amarela'], d=2, who='vasco_gama',
    src=('en', 'Scurvy', ['vitamin C']),
    x='Na viagem de Vasco da Gama à Índia, a doença matou dezenas de homens; frutas cítricas só viraram regra na marinha britânica no fim do século XVIII.')
c.T('Qual é o salão mais famoso do Palácio de Versalhes, com 73 metros de comprimento e 17 janelas voltadas para os jardins?', 'Galeria dos Espelhos',
    ['Salão de Hércules', 'Sala do Trono', 'Capela Real', 'Galeria das Batalhas', 'Salão da Paz'], d=2, stad='versalhes',
    src=('en', 'Hall of Mirrors', ['357']),
    x='Diante das janelas, 357 espelhos, um luxo caríssimo na época, refletem a luz; ali foram proclamados o Império Alemão, em 1871, e assinado o tratado que encerrou a Primeira Guerra, em 1919.')
c.T('Qual flor provocou na Holanda, em 1637, uma das primeiras bolhas especulativas da história?', 'Tulipa',
    ['Rosa', 'Orquídea', 'Lírio', 'Girassol', 'Cravo'], d=2, crest='holanda',
    src=('en', 'Tulip mania', ['1637']),
    x='No auge, alguns bulbos raros eram vendidos por mais de dez vezes o salário anual de um artesão; os preços despencaram em fevereiro de 1637.')
c.T('Como ficou conhecido o período de 1580 a 1640 em que Portugal e Espanha tiveram o mesmo rei?', 'União Ibérica',
    ['Restauração', 'Reconquista', 'Pacto Ibérico', 'Regência', 'Interregno'], d=2, crest='espanha',
    src=('pt', 'União Ibérica', ['1580']),
    x='A crise começou com o sumiço de D. Sebastião em Alcácer-Quibir; em 1º de dezembro de 1640, uma revolta em Lisboa pôs D. João IV no trono e devolveu a independência a Portugal.')
c.T('Qual ministro do rei D. José I expulsou os jesuítas de Portugal e de todo o império português, em 1759?', 'Marquês de Pombal',
    ['Conde de Linhares', 'Duque de Palmela', 'Marquês de Sá da Bandeira', 'Conde da Barca', 'Marquês de Marialva'], d=2, crest='portugal',
    src=('en', 'Suppression of the Society of Jesus', ['Pombal']),
    x='No mesmo governo, a capital do Brasil passou de Salvador para o Rio de Janeiro, em 1763.')
c.T('Qual concílio, reunido entre 1545 e 1563, organizou a resposta da Igreja Católica à Reforma?', 'Concílio de Trento',
    ['Concílio de Niceia', 'Concílio de Constança', 'Concílio Vaticano I', 'Concílio de Latrão', 'Concílio de Basileia'], d=2, icon='church',
    src=('en', 'Council of Trent', ['1545']),
    x='Trento fica no norte da atual Itália; o concílio criou os seminários para formar padres e padronizou a missa, rezada em latim até a década de 1960.')
c.T('Qual cardeal foi o principal ministro de Luís XIII de 1624 até morrer, em 1642, e ajudou a fortalecer o absolutismo francês?', 'Cardeal Richelieu',
    ['Cardeal Mazarin', 'Cardeal Fleury', 'Cardeal Wolsey', 'Cardeal Cisneros', 'Cardeal Granvelle'], d=2, icon='church',
    src=('en', 'Cardinal Richelieu', ['Louis XIII']),
    x='Ele é o grande vilão de Os Três Mosqueteiros, de Alexandre Dumas, e fundou a Academia Francesa, em 1635.')
c.T('Em que cidade alemã Lutero era professor quando divulgou suas 95 teses, em 1517?', 'Wittenberg',
    ['Worms', 'Augsburgo', 'Nuremberg', 'Leipzig', 'Erfurt'], d=3, who='lutero',
    src=('en', 'Ninety-five Theses', ['Wittenberg']),
    x='Segundo a tradição, ele pregou as teses na porta da Igreja do Castelo; certo é que as enviou ao arcebispo de Mainz em 31 de outubro de 1517.')
c.T('Como ficou conhecido o massacre de protestantes franceses, os huguenotes, iniciado em Paris em agosto de 1572?', 'Noite de São Bartolomeu',
    ['Vésperas Sicilianas', 'Noite de São João', 'Massacre de Vassy', 'Dia das Barricadas', 'Noite das Facas Longas'], d=3, crest='francia',
    src=('en', "St. Bartholomew's Day massacre", ['1572']),
    x='A matança começou dias depois do casamento do protestante Henrique de Navarra, futuro Henrique IV, com a católica Margarida de Valois.')
c.T('Qual empresa holandesa, fundada em 1602, é apontada como a primeira a ter ações negociadas em bolsa?', 'Companhia das Índias Orientais',
    ['Companhia das Índias Ocidentais', 'Companhia de Moscóvia', 'Liga Hanseática', 'Companhia da Baía de Hudson', 'Companhia do Mississippi'], d=3, icon='ship',
    src=('en', 'Dutch East India Company', ['1602']),
    x='A VOC tinha exército e frota próprios, podia firmar tratados e fundou a Cidade do Cabo, em 1652, como escala na rota para a Ásia.')
c.T('Como se chamavam os soldados de infantaria de elite do sultão otomano, recrutados ainda meninos em famílias cristãs dos Bálcãs?', 'Janízaros',
    ['Mamelucos', 'Sipaios', 'Cossacos', 'Hussardos', 'Pretorianos'], d=3, crest='imperio_otomano',
    src=('en', 'Janissary', ['devshirme']),
    x='O recrutamento se chamava devshirme: os meninos eram convertidos ao islã e treinados por anos. O corpo foi extinto pelo próprio sultão em 1826.')
c.T('Como se chamava o trabalho forçado, herdado do tempo dos incas, que os espanhóis impuseram aos indígenas nas minas de prata de Potosí?', 'Mita',
    ['Encomienda', 'Sesmaria', 'Corveia', 'Peonagem', 'Capitação'], d=4, icon='coins',
    src=('en', "Mit'a", ['Potosí']),
    x='Entre os incas, a mita era um turno de trabalho devido ao Estado; o vice-rei Francisco de Toledo a transformou, na década de 1570, em recrutamento em massa para as minas.')
c.T('A quantas léguas a oeste das ilhas de Cabo Verde passava a linha do Tratado de Tordesilhas?', '370 léguas',
    ['100 léguas', '170 léguas', '270 léguas', '500 léguas', '1.000 léguas'], d=3, icon='map',
    src=('en', 'Treaty of Tordesillas', ['370']),
    x='A bula Inter caetera, de 1493, fixava a linha a 100 léguas; Portugal negociou e a empurrou para oeste, o que deixou parte do futuro Brasil do seu lado.')
c.T('Qual édito, assinado por Henrique IV em 1598, garantiu liberdade de culto aos protestantes franceses?', 'Édito de Nantes',
    ['Édito de Milão', 'Édito de Fontainebleau', 'Édito de Worms', 'Édito de Potsdam', 'Édito de Tessalônica'], d=4, crest='francia',
    src=('en', 'Edict of Nantes', ['1598']),
    x='Luís XIV revogou o édito em 1685, e milhares de huguenotes fugiram para a Holanda, a Inglaterra e a Prússia.')
c.T('Qual ministro de Luís XIV aplicou o mercantilismo criando manufaturas reais e uma companhia francesa das Índias Orientais?', 'Jean-Baptiste Colbert',
    ['Nicolas Fouquet', 'Cardeal Mazarin', 'Jacques Necker', 'Duque de Sully', 'Turgot'], d=4, who='luis_xiv',
    src=('en', 'Jean-Baptiste Colbert', ['Louis XIV']),
    x='Colbert também criou a Academia de Ciências, em 1666, e reorganizou a marinha francesa; na França, seu protecionismo ganhou o nome de colbertismo.')
c.T('Qual tratado de 1529 dividiu entre Portugal e Espanha o outro lado do mundo, resolvendo a disputa pelas ilhas Molucas?', 'Tratado de Saragoça',
    ['Tratado de Tordesilhas', 'Tratado de Madri', 'Tratado de Alcáçovas', 'Tratado de Lisboa', 'Tratado de Utrecht'], d=5, icon='globe',
    src=('en', 'Treaty of Zaragoza', ['1529']),
    x='A Espanha abriu mão das Molucas, as ilhas do cravo-da-índia, em troca de 350 mil ducados pagos por Portugal.')
c.T('Qual tratado de 1648 reconheceu oficialmente a independência da República Holandesa em relação à Espanha?', 'Paz de Münster',
    ['Tratado de Utrecht', 'Paz de Augsburgo', 'Tratado dos Pireneus', 'Tratado de Nimega', 'Tratado de Ryswick'], d=5, crest='holanda',
    src=('en', 'Peace of Münster', ['1648']),
    x='Assinada em Münster como parte da Paz de Vestfália, encerrou a Guerra dos Oitenta Anos, iniciada em 1568.')
c.T('Qual anatomista de Bruxelas publicou em 1543 A Estrutura do Corpo Humano, livro que fundou a anatomia moderna?', 'André Vesálio',
    ['William Harvey', 'Ambroise Paré', 'Paracelso', 'Miguel Servet', 'Gabriele Falloppio'], d=5, who='galeno',
    src=('en', 'Andreas Vesalius', ['1543']),
    x='Dissecando cadáveres pessoalmente, ele corrigiu erros de Galeno, que se baseara em macacos e outros animais; o livro saiu no mesmo ano da obra de Copérnico.')

# ── Personagens ──
c.P('Qual monarca espanhol é homenageado no nome do arquipélago asiático colonizado pela Espanha a partir de 1565?', 'felipe_ii', d=2, crest='imperio_espanhol',
    src=('en', 'Philippines', ['Philip II']),
    x='O nome foi dado pela expedição de Ruy López de Villalobos, no começo da década de 1540, quando Filipe ainda era príncipe herdeiro.')
c.P('Qual rainha mandou executar a prima Maria Stuart, rainha da Escócia, em 1587?', 'elizabeth_i', d=2, flag='SCO',
    src=('en', 'Mary, Queen of Scots', ['1587']),
    x='Maria Stuart passou quase 19 anos presa na Inglaterra; ironicamente, foi o filho dela, Jaime, quem herdou a coroa inglesa em 1603.')
c.P('Qual imperador abdicou entre 1555 e 1556, dividindo seus domínios entre o filho e o irmão, e se recolheu ao mosteiro de Yuste?', 'carlos_v', d=3, crest='sacro_imperio',
    src=('en', 'Charles V, Holy Roman Emperor', ['Yuste']),
    x='O filho, Filipe II, ficou com a Espanha, a Itália e as Américas; o irmão, Fernando, que já governava a Áustria, herdou o título imperial.')
c.P('Qual artista alemão fez a famosa gravura de um rinoceronte, em 1515, sem nunca ter visto o animal?', 'durer', d=4, icon='palette',
    src=('en', "Dürer's Rhinoceros", ['1515']),
    x='Ele se baseou numa carta e num esboço de um rinoceronte indiano que chegara a Lisboa como presente para o rei D. Manuel I.')

# ── Estados ──
c.C('Qual estado viveu uma Era de Ouro no século XVII, com pintores como Rembrandt e Vermeer e a bolsa de valores de Amsterdã?', 'holanda', d=2, who='rembrandt',
    src=('en', 'Dutch Golden Age', ['Rembrandt']),
    x='Pequena e sem rei, a república tinha a maior frota mercante da Europa e chegou a dominar parte do Nordeste brasileiro.')
c.C('Qual república, governada por um doge, perdeu a ilha de Chipre para os otomanos em 1571?', 'veneza', d=2, crest='imperio_otomano',
    src=('en', 'Republic of Venice', ['Cyprus']),
    x='Meses depois, a frota veneziana ajudou a vencer os otomanos em Lepanto, mas Chipre não foi recuperada.')
c.C('Qual império de fé xiita, rival dos otomanos, viveu seu auge com o xá Abbas I, que fez de Isfahan a sua capital?', 'safavida', d=4, icon='crown',
    src=('en', 'Abbas the Great', ['Isfahan']),
    x='Com ajuda de navios ingleses, Abbas I tomou dos portugueses a ilha de Ormuz, no golfo Pérsico, em 1622.')

# ── Quem sou eu? ──
c.Q('Quem sou eu?', 'vasco_gama', ['Nasci em Sines, no litoral do Alentejo.',
    'Em 1497, parti de Lisboa com quatro navios, a serviço de D. Manuel I.',
    'Depois de contornar a África, cheguei a Calicute em 1498.',
    'Morri em Cochim, em 1524, como vice-rei da Índia.'], 1,
    src=('en', 'Vasco da Gama', ['Sines']),
    x='A viagem de ida e volta durou mais de dois anos, e só cerca de um terço dos homens voltou vivo a Lisboa.')
c.Q('Quem sou eu?', 'cervantes', ['Nasci em Alcalá de Henares, em 1547.',
    'Fui ferido em Lepanto e perdi o movimento da mão esquerda.',
    'Passei cinco anos cativo de piratas em Argel.',
    'Criei um fidalgo que enfrentava moinhos de vento, ao lado do escudeiro Sancho Pança.'], 1,
    src=('en', 'Miguel de Cervantes', ['Algiers']),
    x='Dom Quixote saiu em duas partes, em 1605 e 1615, e costuma ser apontado como o primeiro romance moderno.')
c.Q('Quem sou eu?', 'magalhaes', ['Nasci em Portugal e combati na Índia e em Malaca.',
    'Sem o apoio do rei português, ofereci meus serviços à Espanha.',
    'Em 1520, encontrei uma passagem no extremo sul da América.',
    'Fui morto nas Filipinas, em 1521, e minha expedição completou a volta ao mundo sem mim.'], 2,
    src=('en', 'Ferdinand Magellan', ['Mactan']),
    x='Das cinco naus que partiram em 1519, só a Victoria voltou à Espanha, em 1522, com 18 homens, sob o comando de Juan Sebastián Elcano.')
c.Q('Quem sou eu?', 'solimao', ['Nasci em Trebizonda, às margens do mar Negro, em 1494.',
    'Tomei Belgrado e a ilha de Rodes no começo do meu reinado.',
    'Venci em Mohács, em 1526, e cerquei Viena em 1529, sem conseguir tomá-la.',
    'Meus súditos me chamavam de "o Legislador".'], 3,
    src=('en', 'Suleiman the Magnificent', ['Lawgiver']),
    x='No seu reinado, o arquiteto Sinan ergueu em Istambul a mesquita Süleymaniye, uma das maiores da cidade.')
c.Q('Quem sou eu?', 'catarina_grande', ['Nasci princesa alemã, em Stettin, com o nome de Sofia.',
    'Cheguei ao trono em 1762, num golpe contra o meu próprio marido.',
    'Troquei cartas com Voltaire e comprei a biblioteca de Diderot.',
    'Anexei a Crimeia e governei por 34 anos.'], 3,
    src=('en', 'Catherine the Great', ['Diderot']),
    x='No seu reinado, a Rússia ganhou saída para o mar Negro e fundou cidades como Odessa, em 1794.')

# ── Linha do tempo ──
c.O('Coloque estes marcos das Grandes Navegações em ordem, do mais antigo ao mais recente?', [
    ('dias', 'Bartolomeu Dias dobra o cabo da Boa Esperança', 'Extremo sul da África', 1488, {'crest': 'portugal'}),
    ('colombo', 'Colombo chega à América', 'Primeira viagem, a serviço da Espanha', 1492, {'face': 'colombo'}),
    ('gama', 'Vasco da Gama chega à Índia', 'Calicute, pela rota do Cabo', 1498, {'face': 'vasco_gama'}),
    ('cabral', 'Cabral chega ao Brasil', 'A frota seguia para a Índia', 1500, {'face': 'cabral'}),
    ('volta', 'Fim da primeira volta ao mundo', 'A nau Victoria regressa à Espanha', 1522, {'face': 'magalhaes'})], d=2,
    src=('en', 'Age of Discovery', ['1488']))
c.O('Coloque estes episódios da Reforma e da Contrarreforma em ordem, do mais antigo ao mais recente?', [
    ('teses', 'Lutero divulga as 95 teses', 'Wittenberg', 1517, {'face': 'lutero'}),
    ('supremacia', 'Henrique VIII vira chefe da Igreja inglesa', 'Ato de Supremacia', 1534, {'face': 'henrique_viii'}),
    ('institutas', 'Calvino publica as Institutas', 'Primeira edição, em Basileia', 1536, {'face': 'calvino'}),
    ('trento', 'Abertura do Concílio de Trento', 'A resposta católica à Reforma', 1545, {'crest': 'sacro_imperio'}),
    ('bartolomeu', 'Massacre da Noite de São Bartolomeu', 'Paris', 1572, {'crest': 'francia'})], d=3,
    src=('en', 'Reformation', ['1517']))
c.O('Coloque estas obras da Revolução Científica em ordem de publicação, da mais antiga à mais recente?', [
    ('revolutionibus', 'Das Revoluções das Esferas Celestes', 'A Terra sai do centro do Universo', 1543, {'face': 'copernico'}),
    ('mensageiro', 'O Mensageiro das Estrelas', 'As luas de Júpiter vistas pela luneta', 1610, {'face': 'galileu'}),
    ('metodo', 'Discurso do Método', 'A dúvida como ponto de partida', 1637, {'face': 'descartes'}),
    ('principia', 'Principia', 'A gravitação universal', 1687, {'face': 'newton'})], d=3,
    src=('en', 'Scientific Revolution', ['1543']))
c.O('Coloque estes acontecimentos do século XVII em ordem, do mais antigo ao mais recente?', [
    ('vestfalia', 'Paz de Vestfália', 'Fim da Guerra dos Trinta Anos', 1648, {'crest': 'sacro_imperio'}),
    ('carlos', 'Execução do rei Carlos I', 'Londres, depois da Guerra Civil', 1649, {'crest': 'inglaterra'}),
    ('nantes', 'Revogação do Édito de Nantes', 'Luís XIV proíbe o culto protestante', 1685, {'face': 'luis_xiv'}),
    ('gloriosa', 'Revolução Gloriosa', 'Guilherme de Orange desembarca na Inglaterra', 1688, {'flag': 'NED'})], d=5,
    src=('en', 'Peace of Westphalia', ['1648']))

# ── Quem disse? ──
c.QT('E, no entanto, ela se move.', 'galileu', 1,
     ctx='Frase que a lenda põe na boca de um sábio forçado pela Inquisição a negar que a Terra gira, 1633',
     src=('en', 'And yet it moves', ['Galileo']),
     x='Não há registro de que tenha dito isso diante dos juízes, o que seria arriscado demais; ele passou o resto da vida em prisão domiciliar, perto de Florença.')
c.QT('Não posso nem quero me retratar de nada, pois agir contra a consciência não é seguro nem correto.', 'lutero', 2,
     ctx='Diante do imperador Carlos V e dos príncipes alemães, em Worms, 1521',
     src=('en', 'Diet of Worms', ['1521']),
     x='O imperador o declarou fora da lei; a caminho de casa, ele foi "sequestrado" por aliados e escondido no castelo de Wartburg.')
c.QT('É muito mais seguro ser temido do que amado, quando se tem de escolher entre os dois.', 'maquiavel', 2, t='Quem escreveu esta frase?',
     ctx='Capítulo XVII de um pequeno tratado sobre como conquistar e manter o poder, escrito em 1513',
     src=('en', 'The Prince', ['1513']),
     x='O livro circulou em cópias manuscritas e só foi impresso em 1532, cinco anos depois da morte do autor.')
c.QT('Sei que tenho o corpo de uma mulher fraca e frágil, mas tenho o coração e o estômago de um rei.', 'elizabeth_i', 3,
     ctx='Discurso às tropas reunidas em Tilbury, diante da ameaça de invasão espanhola, 1588',
     src=('en', 'Speech to the Troops at Tilbury', ['1588']),
     x='Quando o discurso foi feito, a frota inimiga já tinha sido batida, mas ainda se temia um desembarque de tropas vindas de Flandres.')
c.QT('Paris bem vale uma missa.', 'Henrique IV', 3, typ='txt',
     wrong=['Luís XIV', 'Francisco I', 'Carlos IX', 'Luís XIII', 'Henrique III'],
     ctx='Frase atribuída a um rei protestante que se converteu ao catolicismo para ser aceito no trono da França, 1593',
     src=('en', 'Henry IV of France', ['1593']),
     x='Não há prova de que ele tenha dito a frase, mas a conversão foi real: no ano seguinte, Paris abriu as portas ao primeiro rei Bourbon.')
c.QT('Ousa saber! Tem a coragem de servir-te de teu próprio entendimento.', 'kant', 4, t='Quem escreveu esta frase?',
     ctx='Ensaio de 1784 que responde à pergunta "O que é o Esclarecimento?"',
     src=('en', 'Sapere aude', ['Kant']),
     x='O lema em latim, Sapere aude, vem do poeta romano Horácio; o ensaio o transformou na divisa do Iluminismo.')

# ── Batalhas ──
c.BT('Qual reino derrotou a Invencível Armada enviada por Filipe II?', 'inglaterra', 'Invencível Armada · 1588', '?', 'espanha', d=1,
     x='Brulotes, navios incendiados lançados contra a frota ancorada em Calais, desfizeram a formação espanhola; tempestades fizeram o resto na volta.',
     src=('en', 'Spanish Armada', ['Calais']))
c.BT('Qual império teve de levantar o cerco desta cidade, derrotado por um exército de socorro cristão?', 'imperio_otomano', 'Viena · 1683', 'sacro_imperio', '?', d=2,
     x='A carga dos hussardos alados do rei polonês João III Sobieski decidiu a batalha e marcou o início do recuo otomano na Europa.',
     src=('en', 'Battle of Vienna', ['Sobieski']))
c.BT('Qual reino sofreu esta derrota, em que o próprio rei foi feito prisioneiro?', 'francia', 'Pavia · 1525', 'sacro_imperio', '?', d=3,
     x='Francisco I foi levado preso para Madri e só foi solto em 1526, depois de assinar um tratado que logo renegou.',
     src=('en', 'Battle of Pavia', ['Francis I']))
c.BT('Qual reino perdeu nesta batalha o seu jovem rei, Luís II, e começou a cair sob o domínio otomano?', 'Hungria', 'Mohács · 1526', '?', 'imperio_otomano', d=4, typ='txt',
     wrong=['Polônia', 'Sérvia', 'Valáquia', 'Áustria', 'Moldávia'],
     x='O rei, de 20 anos, morreu afogado num riacho ao fugir; Buda caiu em 1541, e o centro do país ficou sob domínio otomano por cerca de 150 anos.',
     src=('en', 'Battle of Mohács', ['Louis II']))
c.BT('Contra quem os suecos lutaram nesta batalha da Guerra dos Trinta Anos, em que morreu o rei Gustavo Adolfo?', 'sacro_imperio', 'Lützen · 1632', 'suecia', '?', d=4,
     x='Os suecos venceram, mas o rei morreu numa carga de cavalaria em meio à neblina e à fumaça; do outro lado, o comandante era Wallenstein.',
     src=('en', 'Battle of Lützen (1632)', ['Wallenstein']))
c.BT('Quem venceu esta batalha, que abalou a fama de invencíveis dos terços espanhóis?', 'francia', 'Rocroi · 1643', '?', 'espanha', d=5,
     x='O comandante vitorioso, o duque de Enghien, futuro "Grande Condé", tinha apenas 21 anos.',
     src=('en', 'Battle of Rocroi', ['Enghien']))

# ── Dinastias ──
c.LN('Qual rei completa esta sequência de Bourbons no trono da França?', 'luis_xiv', 'Reis Bourbon da França · 1589–1792',
     ['Henrique IV', 'Luís XIII', '?', 'Luís XV', 'Luís XVI'], d=1, era='mod',
     src=('en', 'House of Bourbon', ['Louis XIV']),
     x='Luís XV era bisneto do Rei Sol: o filho e o neto de Luís XIV morreram antes dele, e o trono saltou duas gerações.')
c.LN('Quem abre esta linhagem de reis Habsburgo da Espanha?', 'carlos_v', 'Habsburgos da Espanha · 1516–1700',
     ['?', 'Filipe II', 'Filipe III', 'Filipe IV', 'Carlos II'], d=3, era='mod',
     src=('en', 'Habsburg Spain', ['Philip II']),
     x='Na Espanha ele era Carlos I; a morte de Carlos II sem filhos, em 1700, levou os Bourbon ao trono de Madri.')
c.LN('Quem fecha a linhagem dos Stuart no trono inglês?', 'Ana', 'Os Stuart no trono inglês · 1603–1714',
     ['Jaime I', 'Carlos I', 'Carlos II', 'Jaime II', 'Guilherme III e Maria II', '?'], d=4, era='mod', typ='txt',
     wrong=['Maria I', 'Jorge I', 'Elizabeth I', 'Vitória', 'Eduardo VI'],
     src=('en', 'House of Stuart', ['Anne']),
     x='No reinado dela, os Atos de União de 1707 criaram a Grã-Bretanha; morreu sem filhos vivos, e o trono passou a Jorge I, de Hanôver.')
c.LN('Quem é o soberano que falta nesta linha da Casa de Bragança?', 'Maria I', 'Casa de Bragança · Portugal, 1640–1816',
     ['João IV', 'Afonso VI', 'Pedro II', 'João V', 'José I', '?'], d=4, era='mod', typ='txt',
     wrong=['João VI', 'Carlota Joaquina', 'Sebastião', 'Maria II', 'Afonso Henriques'],
     src=('pt', 'Maria I de Portugal', ['1816']),
     x='Já afastada do governo por doença mental, chegou ao Brasil com a corte em 1808 e morreu no Rio de Janeiro, em 1816; o filho reinou depois como D. João VI.')

# ── Manchetes ──
c.NW('Em que ano saiu esta manchete?', '1755', 'Terremoto, maremoto e incêndio destroem Lisboa', 3, paper='Gazeta do Reino',
     sub='Tremor no Dia de Todos os Santos derruba igrejas cheias de fiéis',
     wrong=['1640', '1703', '1750', '1762', '1777'],
     src=('en', '1755 Lisbon earthquake', ['All Saints']),
     x='A reconstrução da Baixa, com ruas retas e prédios de estrutura antissísmica, foi comandada pelo futuro Marquês de Pombal.')
c.NW('Quem é o comandante desta manchete?', 'cook', 'Endeavour volta a Londres depois de três anos no Pacífico', 3, paper='Gazeta de Londres',
     sub='Expedição mapeou a Nova Zelândia e a costa leste da Nova Holanda', typ='player',
     src=('en', 'James Cook', ['Endeavour']),
     x='A missão oficial da viagem era observar, no Taiti, a passagem de Vênus diante do Sol, em 1769.')
c.NW('Em que ano saiu esta manchete?', '1783', 'Homens sobem aos céus num balão de ar quente', 4, paper='Correio de Paris',
     sub='Primeiro voo livre com tripulantes cruza a cidade diante de uma multidão',
     wrong=['1752', '1769', '1776', '1789', '1794'],
     src=('en', 'Montgolfier brothers', ['1783']),
     x="Em 21 de novembro, Pilâtre de Rozier e o marquês d'Arlandes voaram uns 9 km sobre Paris num balão dos irmãos Montgolfier.")

# ── Duelo ──
c.DU('Duelo: quem viveu primeiro?', 'shakespeare', 'voltaire', 1, icon='hourglass',
     src=('en', 'Voltaire', ['1694']),
     x='Shakespeare morreu em 1616; Voltaire nasceu em 1694 e foi um dos primeiros a apresentar o dramaturgo inglês ao público francês.')
c.DU('Duelo: quem nasceu primeiro?', 'michelangelo', 'rafael', 2, icon='palette',
     src=('en', 'Raphael', ['1483']),
     x='Michelangelo nasceu em 1475; Rafael, em 1483, morreu bem antes dele, em 1520, com apenas 37 anos.')
c.DU('Duelo: o que aconteceu primeiro?', 'Fundação de São Paulo', 'Fundação de Nova Amsterdã (Nova York)', 2, typ='txt', icon='map',
     src=('pt', 'São Paulo', ['1554']),
     x='São Paulo nasceu em 1554 com um colégio jesuíta; Nova Amsterdã, a futura Nova York, só surgiu na década de 1620, como entreposto holandês.')
c.DU('Duelo: quem nasceu primeiro?', 'cervantes', 'shakespeare', 3, icon='quill',
     src=('en', 'Miguel de Cervantes', ['1547']),
     x='Cervantes nasceu em 1547, e Shakespeare, em 1564; os dois morreram em 1616, e o 23 de abril virou o Dia Mundial do Livro.')
c.DU('Duelo: quem morreu primeiro?', 'kepler', 'galileu', 4, icon='telescope',
     src=('en', 'Johannes Kepler', ['1630']),
     x='Galileu nasceu sete anos antes, em 1564, mas sobreviveu a Kepler, morto em 1630, por mais de onze anos.')
c.DU('Duelo: qual destes reinos surgiu primeiro?', 'prussia', 'reino_unido', 5, typ=None, icon='crown',
     src=('en', 'Kingdom of Prussia', ['1701']),
     x='O Reino da Prússia nasceu em 1701, quando o eleitor de Brandemburgo se coroou rei; a Grã-Bretanha surgiu da união da Inglaterra com a Escócia, em 1707.')

# ── Fato ou mito? ──
c.MY('Colombo teve de provar que a Terra era redonda, contra quem achava que ela era plana?', False, 1, who='colombo',
     x='Os sábios do século XV já sabiam que a Terra é esférica; a discussão era sobre o tamanho dela, que Colombo subestimou muito.',
     src=('en', 'Myth of the flat Earth', ['Columbus']))
c.MY('A rainha Elizabeth I da Inglaterra nunca se casou?', True, 1, who='elizabeth_i',
     x='Chamada de "Rainha Virgem", inspirou o nome da colônia da Virgínia; sem filhos, deixou o trono para Jaime VI da Escócia.',
     src=('en', 'Elizabeth I', ['Virgin Queen']))
c.MY('Uma maçã caiu na cabeça de Isaac Newton e lhe deu a ideia da gravitação?', False, 2, who='newton',
     x='Newton contou ter pensado na gravidade ao ver uma maçã cair no jardim da família; a pancada na cabeça foi acrescentada à história depois.',
     src=('en', 'Isaac Newton', ['apple']))
c.MY('Voltaire escreveu "Posso não concordar com uma palavra do que dizes, mas defenderei até a morte o teu direito de dizê-lo"?', False, 3, who='voltaire',
     x='A frase foi criada em 1906 pela escritora inglesa Evelyn Beatrice Hall, para resumir a atitude dele numa biografia.',
     src=('en', 'Evelyn Beatrice Hall', ['1906']))
c.MY('O czar Pedro, o Grande, cobrava um imposto de quem quisesse manter a barba?', True, 3, who='pedro_grande',
     x='Em 1698, para "europeizar" a Rússia, ele mandou raspar as barbas; quem pagava a taxa recebia uma ficha que servia de comprovante.',
     src=('en', 'Beard tax', ['1698']))
c.MY('Michelangelo pintou o teto da Capela Sistina deitado de costas num andaime?', False, 3, who='michelangelo',
     x='Ele trabalhou de pé, num andaime que ele mesmo projetou, com a cabeça inclinada para trás; chegou a escrever um poema reclamando da posição.',
     src=('en', 'Sistine Chapel ceiling', ['scaffold']))
c.write()
