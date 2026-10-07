"""Idade Média (476-1453), do mundo todo menos o Extremo Oriente — all formats in one pack."""
from qdsl import Cat

c = Cat('medieval', 'Idade Média', '🏰', 'Castelos, cruzadas e califas', '#5B4636', order=52)

# ── Texto: seis alternativas ──
c.T('Que parte de um castelo medieval podia ser erguida para impedir a passagem sobre o fosso?', 'Ponte levadiça',
    ['Ameia', 'Torre de menagem', 'Seteira', 'Barbacã', 'Muralha'], d=1, icon='castle',
    src=('en', 'Drawbridge', ['moat']),
    x='Erguida, a ponte também tapava a entrada; muitas vezes, logo atrás dela, ainda havia o rastrilho, uma pesada grade que descia para fechar o portão.')
c.T('Como se chamava o nobre que recebia terras de um senhor e, em troca, lhe jurava fidelidade e serviço militar?', 'Vassalo',
    ['Servo', 'Suserano', 'Burguês', 'Clérigo', 'Mercador'], d=1, icon='crown',
    src=('en', 'Vassal', ['fief']),
    x='Na cerimônia da homenagem, o vassalo punha as mãos entre as mãos do senhor e jurava fidelidade.')
c.T('Na Europa medieval, como se chamavam os guerreiros nobres que combatiam a cavalo, com armadura, a serviço de um senhor feudal?', 'Cavaleiros',
    ['Samurais', 'Legionários', 'Hoplitas', 'Mosqueteiros', 'Gladiadores'], d=1, icon='sword',
    src=('en', 'Knight', ['horse']),
    x='Um menino nobre costumava começar como pajem, passar a escudeiro e só depois ser armado cavaleiro.')
c.T('Que língua a Igreja e as universidades usavam na Europa ocidental durante a Idade Média?', 'Latim',
    ['Grego', 'Francês', 'Hebraico', 'Aramaico', 'Alemão'], d=1, icon='book',
    src=('en', 'Medieval Latin', ['Church']),
    x='Por isso um estudante podia sair de Lisboa e assistir às aulas em Paris ou Bolonha sem aprender outra língua.')
c.T('Para qual cidade os muçulmanos se voltam na hora de rezar?', 'Meca',
    ['Medina', 'Jerusalém', 'Bagdá', 'Damasco', 'Cairo'], d=1, icon='map',
    src=('en', 'Qibla', ['Kaaba']),
    x='Nos primeiros anos do Islã, os fiéis rezavam voltados para Jerusalém; a direção mudou para a Caaba, em Meca, em 624.')
c.T('Qual é o livro sagrado do Islã, que reúne as revelações que Maomé teria recebido?', 'Alcorão',
    ['Torá', 'Talmude', 'Vedas', 'Avesta', 'Evangelho'], d=1, icon='book',
    src=('en', 'Quran', ['Uthman']),
    x='O nome significa "recitação"; a versão-padrão do texto foi fixada por volta de 650, no governo do califa Otomão.')
c.T('Como os muçulmanos chamavam a parte da Península Ibérica que estava sob seu domínio?', 'Al-Andalus',
    ['Magrebe', 'Levante', 'Ifríquia', 'Hejaz', 'Anatólia'], d=2, stad='alhambra',
    src=('en', 'Al-Andalus', ['Córdoba']),
    x='O nome sobrevive na Andaluzia, no sul da Espanha; no século X, Córdoba era uma das maiores cidades da Europa.')
c.T('Que arma incendiária, capaz de arder até sobre a água, era o trunfo secreto da frota bizantina?', 'Fogo grego',
    ['Pólvora negra', 'Fogo de Santelmo', 'Fogo-fátuo', 'Napalm', 'Azeite fervente'], d=2, crest='bizancio',
    src=('en', 'Greek fire', ['Byzantine']),
    x='A receita era tão bem guardada que se perdeu: até hoje não se sabe exatamente do que ele era feito.')
c.T('Como se chamavam as associações medievais de artesãos de um mesmo ofício, que fixavam preços e formavam aprendizes?', 'Corporações de ofício',
    ['Sindicatos', 'Feiras', 'Comunas', 'Burgos', 'Ordens mendicantes'], d=2, icon='gear',
    src=('en', 'Guild', ['apprentice']),
    x='Para virar mestre, o artesão muitas vezes tinha de apresentar aos examinadores da corporação uma peça exemplar, a sua "obra-prima".')
c.T('Qual arma fez a fama dos arqueiros ingleses e galeses na Guerra dos Cem Anos?', 'Arco longo',
    ['Besta', 'Lança', 'Catapulta', 'Mosquete', 'Funda'], d=2, flag='ENG',
    src=('en', 'English longbow', ['yew']),
    x='Feito de teixo, tinha quase a altura de um homem; em Azincourt, em 1415, suas flechas ajudaram a derrotar um exército francês maior.')
c.T('Como se chama a mudança de Maomé de Meca para Medina, em 622, que marca o ano 1 do calendário islâmico?', 'Hégira',
    ['Ramadã', 'Haje', 'Jihad', 'Sharia', 'Sunna'], d=2, icon='hourglass',
    src=('en', 'Hijrah', ['622']),
    x='Medina se chamava Yathrib; depois passou a ser conhecida como Madinat an-Nabi, "a cidade do Profeta".')
c.T('Em que ano tropas muçulmanas atravessaram o estreito de Gibraltar e começaram a conquista da Península Ibérica?', '711',
    ['622', '732', '756', '800', '1085'], d=3, flag='MAR',
    src=('en', 'Umayyad conquest of Hispania', ['711']),
    x='O comandante era Tárique; o rochedo onde desembarcou, Jabal Tariq ("monte de Tárique"), deu origem ao nome Gibraltar.')
c.T('Qual ordem religiosa, nascida no mosteiro de Monte Cassino, na Itália do século VI, tem como lema "Ora et labora"?', 'Beneditinos',
    ['Franciscanos', 'Dominicanos', 'Jesuítas', 'Templários', 'Carmelitas'], d=3, icon='book',
    src=('en', 'Benedict of Nursia', ['Monte Cassino']),
    x='São Bento é padroeiro da Europa; no Brasil, o Mosteiro de São Bento do Rio de Janeiro foi fundado por monges da ordem no século XVI.')
c.T('Em que ano os cruzados da Primeira Cruzada tomaram Jerusalém?', '1099',
    ['1095', '1071', '1147', '1187', '1204'], d=3, icon='sword',
    src=('en', 'Siege of Jerusalem (1099)', ['1099']),
    x='O cerco terminou em julho de 1099 com o massacre de grande parte dos moradores muçulmanos e judeus da cidade.')
c.T('Qual papa pregou a Primeira Cruzada no Concílio de Clermont, em 1095?', 'Urbano II',
    ['Gregório VII', 'Inocêncio III', 'Leão III', 'Bonifácio VIII', 'Silvestre II'], d=3, crest='francia',
    src=('en', 'Pope Urban II', ['Clermont']),
    x='Segundo os cronistas, a multidão respondeu ao discurso gritando "Deus vult!", ou seja, "Deus o quer!".')
c.T('Em qual cidade os papas moraram entre 1309 e 1376, longe de Roma?', 'Avignon',
    ['Lyon', 'Paris', 'Reims', 'Marselha', 'Toulouse'], d=3, crest='francia',
    src=('en', 'Avignon Papacy', ['1309']),
    x='Sete papas, todos franceses, viveram ali; o Palácio dos Papas, erguido nesse período, é um dos maiores edifícios góticos da Europa.')
c.T('Que tratado de 843 dividiu o império de Carlos Magno entre os seus três netos?', 'Tratado de Verdun',
    ['Tratado de Tordesilhas', 'Tratado de Troyes', 'Concordata de Worms', 'Tratado de Zamora', 'Paz de Vestfália'], d=3, who='carlos_magno',
    src=('en', 'Treaty of Verdun', ['843']),
    x='Carlos, o Calvo, ficou com o oeste, embrião da França; Luís, o Germânico, com o leste; e Lotário, com a faixa do meio e o título de imperador.')
c.T('Qual soberano do Sacro Império esperou três dias na neve, diante do castelo de Canossa, para obter o perdão do papa Gregório VII?', 'Henrique IV',
    ['Frederico Barba-Ruiva', 'Oto I', 'Frederico II', 'Conrado III', 'Carlos IV'], d=4, crest='sacro_imperio',
    src=('en', 'Investiture Controversy', ['Canossa']),
    x='Foi em 1077, no auge da Querela das Investiduras; "ir a Canossa" virou expressão para quem é obrigado a se humilhar.')
c.T('Qual cidade alemã liderava a Liga Hanseática, a rede de cidades mercantis do mar do Norte e do Báltico?', 'Lübeck',
    ['Hamburgo', 'Bremen', 'Colônia', 'Rostock', 'Berlim'], d=4, flag='GER',
    src=('en', 'Hanseatic League', ['Lübeck']),
    x='Chamada de "Rainha da Hansa", ela sediava as assembleias da liga; o Holstentor, de tijolos vermelhos, ainda guarda a entrada da cidade velha.')
c.T('Em qual prado à beira do Tâmisa o rei João selou a Magna Carta, em 1215?', 'Runnymede',
    ['Westminster', 'Windsor', 'Hastings', 'Cantuária', 'Greenwich'], d=4, crest='inglaterra',
    src=('en', 'Runnymede', ['Magna Carta']),
    x='O prado fica entre Windsor e Staines; ali o rei se encontrou com os barões rebeldes, que tinham tomado Londres semanas antes.')
c.T('Em que cidade o rei D. Dinis criou, em 1290, a primeira universidade portuguesa, depois transferida para Coimbra?', 'Lisboa',
    ['Porto', 'Braga', 'Évora', 'Guimarães', 'Santarém'], d=4, crest='portugal',
    src=('en', 'University of Coimbra', ['1290']),
    x='A universidade mudou-se várias vezes entre Lisboa e Coimbra até se fixar em Coimbra de vez, em 1537.')
c.T('Qual rei ostrogodo governou a Itália a partir de Ravena entre 493 e 526?', 'Teodorico, o Grande',
    ['Alarico I', 'Genserico', 'Totila', 'Vitiges', 'Gelimer'], d=5, crest='bizancio',
    src=('en', 'Theodoric the Great', ['Ravenna']),
    x='Passou a juventude como refém em Constantinopla; seu mausoléu em Ravena tem o teto feito de um único bloco de pedra.')
c.T('Qual rei visigodo foi derrotado pelos muçulmanos de Tárique na batalha de Guadalete, em 711?', 'Rodrigo',
    ['Recaredo I', 'Alarico II', 'Leovigildo', 'Pelágio', 'Vamba'], d=5, icon='crown',
    src=('en', 'Roderic', ['Guadalete']),
    x='Toledo, a capital visigoda, caiu pouco depois; anos mais tarde, um nobre chamado Pelágio iniciou a resistência cristã nas Astúrias.')
c.T('Qual califa omíada mandou erguer a Cúpula da Rocha, em Jerusalém, concluída por volta de 691?', 'Abd al-Malik',
    ['Muawiya I', 'Yazid I', 'Al-Walid I', 'Hisham', 'Omar II'], d=5, icon='column',
    src=('en', 'Dome of the Rock', ['Abd al-Malik']),
    x='É a mais antiga obra da arquitetura islâmica ainda de pé; foi erguida no Monte do Templo, sobre a rocha sagrada que lhe dá o nome.')

# ── Personagem: o rosto certo entre dez ──
c.P('Qual rei da Inglaterra, num reinado de dez anos, passou só cerca de seis meses no próprio reino?', 'ricardo', d=3, crest='inglaterra',
    src=('en', 'Richard I of England', ['Lionheart']),
    x='Passou o reinado entre a cruzada, um cativeiro no Sacro Império e as guerras na França; morreu de um ferimento de besta em 1199.')
c.P('Qual sultão mandou levar navios por terra, sobre toras untadas, para driblar a corrente que fechava o Chifre de Ouro?', 'maome_ii', d=2, crest='bizancio',
    src=('en', 'Fall of Constantinople', ['Golden Horn']),
    x='Dezenas de navios cruzaram a colina de Gálata em abril de 1453; pouco mais de um mês depois, Constantinopla caiu.')
c.P('Qual imperador bizantino pensou em fugir durante a Revolta de Nika, em 532, mas foi convencido a ficar pela esposa, Teodora?', 'justiniano', d=4, stad='santa_sofia',
    src=('en', 'Nika riots', ['Theodora']),
    x='Segundo Procópio, Teodora disse que "a púrpura é uma bela mortalha"; a revolta foi esmagada e, sobre as ruínas, ergueu-se a nova Santa Sofia.')
c.P('Qual rei mandou fazer o Domesday Book, o grande levantamento das terras e bens da Inglaterra concluído em 1086?', 'guilherme_conquistador', d=3, stad='torre_londres',
    src=('en', 'Domesday Book', ['William']),
    x='O apelido "Livro do Juízo Final" veio do povo: das suas informações não havia apelação, como no Juízo Final.')
c.P('Qual califa enviou a Carlos Magno um elefante chamado Abul-Abbas?', 'harun', d=4, who='carlos_magno',
    src=('en', 'Abul-Abbas', ['Harun']),
    x='O elefante chegou a Aachen em 802 e viveu até 810; em 807, o califa ainda mandou ao imperador um relógio de água com autômatos.')

# ── Estado: o brasão certo ──
c.C('Qual reino teve Afonso Henriques como primeiro rei, no século XII?', 'portugal', d=1, icon='crown',
    src=('en', 'Afonso I of Portugal', ['Ourique']),
    x='Reconhecido como rei em Zamora, em 1143, ele tomou Lisboa dos mouros em 1147, com a ajuda de cruzados a caminho da Terra Santa.')
c.C('Os habitantes deste império medieval falavam grego, mas chamavam a si mesmos de "romanos". Que império era esse?', 'bizancio', d=2, flag='GRC',
    src=('en', 'Byzantine Empire', ['Romans']),
    x='O nome "bizantino" foi criado por historiadores ocidentais bem depois de 1453; os turcos chamavam esse povo de "Rum", ou seja, romanos.')
c.C('Qual reino germânico, de Clóvis a Carlos Magno, deu origem às atuais França e Alemanha?', 'francos', d=2, who='carlos_magno',
    src=('en', 'Francia', ['Clovis']),
    x='O nome França vem desse povo; Clóvis, batizado em Reims, adotou o catolicismo, e não o arianismo seguido por outros reis germânicos.')
c.C('Qual república marítima, comandada pelo doge Enrico Dandolo, transportou a Quarta Cruzada que saqueou Constantinopla em 1204?', 'veneza', d=3, crest='bizancio',
    src=('en', 'Fourth Crusade', ['Dandolo']),
    x='Os quatro cavalos de bronze da Basílica de São Marcos foram levados do Hipódromo de Constantinopla nesse saque.')

# ── Quem sou eu? ──
c.Q('Quem sou eu?', 'carlos_magno', ['Meu avô deteve um exército muçulmano numa batalha célebre, perto de Poitiers.',
    'Passei mais de trinta anos em guerra contra os saxões.',
    'Minha corte ficava em Aachen, onde reuni sábios de toda a Europa.',
    'No Natal do ano 800, o papa Leão III me coroou imperador, em Roma.'], 1,
    src=('en', 'Charlemagne', ['Leo III']))
c.Q('Quem sou eu?', 'saladino', ['Nasci numa família curda, em Tikrit, às margens do Tigre.',
    'Fui vizir do Egito e pus fim ao califado fatímida.',
    'Derrotei os cruzados nos Cornos de Hattin.',
    'Em 1187 entrei em Jerusalém; anos depois, negociei uma trégua com Ricardo Coração de Leão.'], 3,
    src=('en', 'Saladin', ['Tikrit']))
c.Q('Quem sou eu?', 'ibn_battuta', ['Nasci em Tânger, no norte da África, no início do século XIV.',
    'Parti aos 21 anos em peregrinação a Meca e só voltei para casa 24 anos depois.',
    'Conheci Constantinopla, a Índia e o Império do Mali, onde visitei Tombuctu.',
    'Por ordem do sultão, ditei em Fez as memórias das minhas viagens, a Rihla.'], 4,
    src=('en', 'Ibn Battuta', ['Tangier']))

# ── Linha do tempo ──
c.O('Do mais antigo ao mais recente: em que ordem aconteceram estes marcos da Idade Média?', [
    ('roma', 'Queda de Roma', 'Fim do Império do Ocidente', 476, {'crest': 'imperio_romano'}),
    ('carlos', 'Carlos Magno é coroado', 'Imperador no Natal', 800, {'face': 'carlos_magno'}),
    ('hastings', 'Batalha de Hastings', 'Normandos conquistam a Inglaterra', 1066, {'face': 'guilherme_conquistador'}),
    ('const', 'Queda de Constantinopla', 'Fim do Império Bizantino', 1453, {'face': 'maome_ii'})], d=2,
    src=('en', 'Middle Ages', ['476']))
c.O('Coloque em ordem estes momentos do mundo islâmico medieval, do mais antigo ao mais recente?', [
    ('iberia', 'Conquista da Península Ibérica', 'Tropas omíadas cruzam Gibraltar', 711, {'crest': 'califado_omiada'}),
    ('bagda', 'Fundação de Bagdá', 'Nova capital dos abássidas', 762, {'crest': 'califado_abassida'}),
    ('jerusalem', 'Saladino retoma Jerusalém', 'Derrota dos cruzados', 1187, {'face': 'saladino'}),
    ('saque', 'Mongóis saqueiam Bagdá', 'Fim do califado abássida', 1258, {'crest': 'imperio_mongol'})], d=3,
    src=('en', 'Abbasid Caliphate', ['1258']))
c.O('Ordene estes personagens medievais pela data de nascimento, do mais antigo ao mais recente?', [
    ('justiniano', 'Justiniano I', 'Imperador bizantino', 482, {'face': 'justiniano'}),
    ('harun', 'Harune Arraxide', 'Califa de Bagdá', 763, {'face': 'harun'}),
    ('saladino', 'Saladino', 'Sultão do Egito e da Síria', 1137, {'face': 'saladino'}),
    ('dante', 'Dante Alighieri', 'Poeta florentino', 1265, {'face': 'dante'}),
    ('joana', "Joana d'Arc", 'Heroína francesa', 1412, {'face': 'joana_darc'})], d=3,
    src=('en', 'Saladin', ['1137']))
c.O('Ordene estes episódios das Cruzadas, do mais antigo ao mais recente?', [
    ('clermont', 'Urbano II prega a cruzada', 'Concílio de Clermont', 1095, {'crest': 'francia'}),
    ('hattin', 'Saladino vence em Hattin', 'Jerusalém volta ao domínio muçulmano', 1187, {'face': 'saladino'}),
    ('acre1191', 'Ricardo Coração de Leão toma Acre', 'Cerco ao lado de Filipe Augusto', 1191, {'face': 'ricardo'}),
    ('saque', 'Cruzados saqueiam Constantinopla', 'Venezianos e cavaleiros latinos', 1204, {'crest': 'bizancio'})], d=4,
    src=('en', 'Crusades', ['1204']))

# ── Quem disse? ──
c.QT('Deixai toda esperança, vós que entrais.', 'dante', 1, t='Quem escreveu esta frase?',
     ctx='Inscrição no portão do Inferno, num poema do início do século XIV',
     src=('en', 'Inferno (Dante)', ['Virgil']),
     x='O verso está no Canto III do Inferno, a primeira parte da Divina Comédia, escrita em toscano, e não em latim.')
c.QT('Nenhum homem livre será preso ou despojado de seus bens senão pelo julgamento legal de seus pares ou pela lei da terra.',
     'Magna Carta', 2, t='De qual documento vem este trecho?', typ='txt',
     wrong=['Bula de Ouro', 'Código de Justiniano', 'Édito de Milão', 'Concordata de Worms', 'Tratado de Tordesilhas'],
     ctx='Cláusula 39 de um pergaminho imposto por barões rebeldes, 1215',
     src=('en', 'Magna Carta', ['39']),
     x='Mantida nas versões posteriores da carta, a cláusula segue em vigor na Inglaterra e inspirou o devido processo legal, presente até na Constituição brasileira.')
c.QT('Se não estou, que Deus me ponha nela; se estou, que Deus me guarde nela.', 'joana_darc', 3,
     ctx='Resposta a uma pergunta-armadilha sobre a graça de Deus, num julgamento em Ruão, 1431',
     src=('en', 'Joan of Arc', ['Rouen']),
     x='Dizer "sim" soaria como presunção, e "não", como confissão de culpa; os escrivães anotaram o espanto dos juízes com a resposta.')
c.QT('Matai-os todos; Deus reconhecerá os seus.', 'Arnaud Amalric', 5, typ='txt',
     wrong=['Simão de Montfort', 'Inocêncio III', 'Bernardo de Claraval', 'Domingos de Gusmão', 'Filipe Augusto'],
     ctx='Frase atribuída por um cronista ao legado do papa no massacre de Béziers, 1209',
     src=('en', 'Arnaud Amalric', ['Béziers']),
     x='Quem a registrou foi o monge Cesário de Heisterbach, mais de uma década depois, e a autenticidade é discutida; o massacre, na Cruzada Albigense, é certo.')

# ── Batalhas ──
c.BT("Quem levantou o cerco desta cidade, com Joana d'Arc à frente das tropas?", 'francia', 'Orléans · 1429', '?', 'inglaterra', d=1,
     x='A vitória deu fama à "Donzela de Orléans" e abriu caminho para a coroação de Carlos VII em Reims, no mesmo ano.',
     src=('en', 'Siege of Orléans', ['Joan']))
c.BT('Quem os francos de Carlos Martel detiveram nesta batalha?', 'califado_omiada', 'Poitiers · 732', 'francos', '?', d=2,
     x='A vitória deu enorme prestígio a Carlos Martel: seu filho Pepino se tornaria rei, e seu neto, Carlos Magno, imperador.',
     src=('en', 'Battle of Tours', ['Umayyad']))
c.BT('Qual reino venceu esta batalha da Guerra dos Cem Anos, mesmo em desvantagem numérica?', 'inglaterra', 'Azincourt · 1415', '?', 'francia', d=2,
     x='A vitória veio no dia de São Crispim, graças sobretudo aos arqueiros com seus arcos longos.',
     src=('en', 'Battle of Agincourt', ['longbow']))
c.BT('Quem os portugueses derrotaram nesta batalha, garantindo a coroa de D. João I?', 'Castela', 'Aljubarrota · 1385', 'portugal', '?', d=2, typ='txt',
     wrong=['Granada', 'Inglaterra', 'Marrocos', 'Sacro Império', 'Veneza'],
     x='Ao lado do rei, o condestável Nuno Álvares Pereira comandou os portugueses; em agradecimento, D. João I mandou erguer o Mosteiro da Batalha.',
     src=('en', 'Battle of Aljubarrota', ['Castile']))
c.BT('Quem derrotou o exército bizantino nesta batalha e capturou o imperador Romano IV?', 'Turcos seljúcidas', 'Manziquerta · 1071', 'bizancio', '?', d=3, typ='txt',
     wrong=['Turcos otomanos', 'Mamelucos', 'Mongóis', 'Árabes abássidas', 'Fatímidas'],
     x='A derrota abriu a Anatólia aos turcos; anos depois, Bizâncio pediu ajuda ao Ocidente, e o papa convocou a Primeira Cruzada.',
     src=('en', 'Battle of Manzikert', ['Alp Arslan']))
c.BT('Qual estado muçulmano esmagou o exército cruzado nesta batalha, perto do mar da Galileia?', 'ayubida', 'Hattin · 1187', '?', 'Reino de Jerusalém', d=3,
     x='Sem água, sob o calor de julho, os cruzados foram cercados; três meses depois, o sultão vencedor entrou em Jerusalém.',
     src=('en', 'Battle of Hattin', ['Saladin']))
c.BT('Qual dinastia muçulmana foi derrotada pelos reinos cristãos ibéricos nesta batalha?', 'Almóadas', 'Las Navas de Tolosa · 1212', 'Reinos cristãos', '?', d=4, typ='txt',
     wrong=['Almorávidas', 'Omíadas', 'Nacéridas', 'Abássidas', 'Merínidas'],
     x='A vitória abriu o vale do Guadalquivir: Córdoba caiu para Castela em 1236, e Sevilha, em 1248.',
     src=('en', 'Battle of Las Navas de Tolosa', ['Almohad']))
c.BT('Quem o rei Oto I derrotou de vez nesta batalha, no sul da atual Alemanha?', 'Magiares', 'Lechfeld · 955', 'Reino da Germânia', '?', d=5, typ='txt',
     wrong=['Vikings', 'Eslavos', 'Ávaros', 'Sarracenos', 'Búlgaros'],
     x='A vitória pôs fim às incursões húngaras no Ocidente e deu a Oto prestígio para ser coroado imperador em Roma, em 962.',
     src=('en', 'Battle of Lechfeld', ['Otto']))

# ── Dinastias e alianças ──
c.LN('Quem é o elo que falta nesta linhagem de governantes francos?', 'carlos_magno', 'Os carolíngios · de pai para filho',
     ['Carlos Martel', 'Pepino, o Breve', '?', 'Luís, o Piedoso'], d=2, era='med',
     src=('en', 'Carolingian dynasty', ['Pepin']),
     x='O nome da dinastia vem de Carolus, "Carlos" em latim; Carlos Martel nunca foi rei: governava como prefeito do palácio.')
c.LN('Quem completa a sucessão dos primeiros reis Plantagenetas da Inglaterra?', 'ricardo', 'Casa Plantageneta · Inglaterra',
     ['Henrique II', '?', 'João Sem Terra', 'Henrique III'], d=2, era='med',
     src=('en', 'House of Plantagenet', ['Henry II']),
     x='O cruzado e João Sem Terra eram irmãos, filhos de Henrique II e de Leonor da Aquitânia, que antes fora rainha da França.')
c.LN('Quem fundou esta dinastia de reis da França, que governou por mais de três séculos?', 'Hugo Capeto', 'Reis da França · 987–1108',
     ['?', 'Roberto II', 'Henrique I', 'Filipe I'], d=4, era='med', typ='txt',
     wrong=['Clóvis I', 'Pepino, o Breve', 'Luís IX', 'Filipe Augusto', 'Carlos Martel'],
     src=('en', 'House of Capet', ['Hugh Capet']),
     x='Os capetianos diretos reinaram de 987 a 1328; ramos da mesma família, como os Valois e os Bourbon, ocuparam o trono até 1848.')
c.LN('Quem completa o trio de soberanos que liderou a Terceira Cruzada?', 'Frederico Barba-Ruiva', 'Terceira Cruzada · 1189–1192',
     ['Ricardo Coração de Leão', 'Filipe II da França', '?'], d=3, kind='grupo', era='med', typ='txt',
     wrong=['Luís IX da França', 'Henrique IV', 'Oto I', 'Godofredo de Bulhão', 'Balduíno I'],
     src=('en', 'Third Crusade', ['Barbarossa']),
     x='O imperador morreu afogado num rio da Anatólia, em 1190, antes de chegar à Terra Santa; boa parte do seu exército voltou para casa.')

# ── Duelo ──
c.DU('Duelo: quem viveu primeiro?', 'carlos_magno', 'joana_darc', 1, icon='hourglass',
     src=('en', 'Charlemagne', ['800']),
     x='Carlos Magno morreu em 814; Joana d\'Arc nasceu cerca de seis séculos depois, por volta de 1412.')
c.DU('Duelo: quem nasceu primeiro?', 'avicena', 'averroes', 3, icon='book',
     src=('en', 'Avicenna', ['980']),
     x='Avicena nasceu perto de Bukhara, em 980; Averróis, em Córdoba, em 1126 — quase um século e meio depois.')
c.DU('Duelo: quem nasceu primeiro?', 'carlos_magno', 'harun', 4, icon='hourglass',
     src=('en', 'Harun al-Rashid', ['763']),
     x='Os dois foram contemporâneos e trocaram embaixadas; o califa morreu em 809, e Carlos Magno, mais velho, em 814.')
c.DU('Duelo: qual destes estados surgiu primeiro?', 'portugal', 'mali', 3, typ=None, icon='hourglass',
     src=('en', 'Mali Empire', ['1235']),
     x='Portugal foi reconhecido como reino em 1143; o Império do Mali nasceu por volta de 1235, com Sundiata Keita.')
c.DU('Duelo: qual destas catedrais começou a ser construída primeiro?', 'Notre-Dame de Paris', 'Catedral de Colônia', 4, typ='txt', icon='church',
     src=('en', 'Notre-Dame de Paris', ['1163']),
     x='Notre-Dame foi iniciada em 1163; a de Colônia, começada em 1248, só ficou pronta em 1880, mais de 600 anos depois.')

# ── Fato ou mito? ──
c.MY('A Guerra dos Cem Anos durou exatamente cem anos?', False, 1, crest='inglaterra',
     x='Durou 116 anos, de 1337 a 1453, com longas tréguas no meio; o nome foi dado bem depois, por historiadores.',
     src=('en', "Hundred Years' War", ['116']))
c.MY('As pessoas da Idade Média quase nunca tomavam banho?', False, 2, icon='castle',
     x='Banhos públicos eram comuns nas cidades medievais; eles só entraram em declínio no século XVI, em parte pelo medo de que espalhassem doenças.',
     src=('en', 'Public bathing', ['Middle Ages']))
c.MY('Os vikings chegaram à América do Norte quase 500 anos antes de Colombo?', True, 2, who='leif',
     x="As ruínas nórdicas de L'Anse aux Meadows, no Canadá, guardam madeira cortada ali com ferramentas de metal no ano 1021.",
     src=('en', "L'Anse aux Meadows", ['1021']))
c.MY('Os cavaleiros de armadura eram tão pesados que precisavam de um guindaste para subir no cavalo?', False, 2, icon='sword',
     x='Uma armadura completa pesava em geral de 15 a 25 kg, bem distribuídos pelo corpo; o cavaleiro montava sozinho, corria e se levantava do chão.',
     src=('en', 'Plate armour', ['kg']))
c.MY('Os algarismos que usamos hoje, como 1, 2 e 3, foram inventados pelos árabes?', False, 2, who='al_khwarizmi',
     x='Eles nasceram na Índia; sábios do mundo islâmico, como Al-Khwarizmi, os difundiram, e Fibonacci os popularizou na Europa em 1202.',
     src=('en', 'Arabic numerals', ['India']))
c.MY('A Universidade de Oxford é mais antiga que o Império Asteca?', True, 2, icon='book',
     x='Já se dava aula em Oxford em 1096; a cidade asteca de Tenochtitlán só foi fundada em 1325, e o império, por volta de 1428.',
     src=('en', 'University of Oxford', ['1096']))
c.MY('Cavaleiros que partiam para as Cruzadas trancavam as esposas em cintos de castidade?', False, 3, icon='castle',
     x='Não há prova confiável disso; a maioria dos cintos de museu foi feita nos séculos XVIII e XIX, e vários museus os retiraram de exposição.',
     src=('en', 'Chastity belt', ['medieval']))
c.MY('Na Idade Média, animais chegaram a ser levados a julgamento em tribunais?', True, 3, icon='scales',
     x='Em Falaise, na Normandia, em 1386, uma porca que matara uma criança foi julgada, condenada e executada em praça pública.',
     src=('en', 'Animal trial', ['Falaise']))
c.MY('A Igreja medieval proibia completamente a dissecação de cadáveres?', False, 4, icon='book',
     x='Em Bolonha, Mondino de Luzzi dissecava cadáveres em aulas públicas por volta de 1315 e escreveu um manual de anatomia usado por dois séculos.',
     src=('en', 'Mondino de Luzzi', ['dissection']))

c.write()
