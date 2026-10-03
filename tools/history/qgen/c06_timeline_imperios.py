from qdsl import Cat

# ───────────────────────── Linha do tempo ─────────────────────────
c = Cat('linha_do_tempo', 'Linha do tempo', '⏳', 'Ordene do mais antigo ao mais novo', '#0f7b6c', order=41)
def O(t, cards, d, src):
    c.O(t if t.endswith('?') else t.rstrip('.') + '?', cards, d, src=src)
F = lambda x: {'face': x}
C = lambda x: {'crest': x}

O('Linha do tempo: o que veio primeiro — o nascimento de Sócrates, Leonardo da Vinci, Napoleão ou Einstein?',
  [('socrates','Sócrates','Nascimento',-470,F('socrates')),('leonardo','Leonardo da Vinci','Nascimento',1452,F('leonardo')),('napoleao','Napoleão Bonaparte','Nascimento',1769,F('napoleao')),('einstein','Albert Einstein','Nascimento',1879,F('einstein'))], 1, ('pt','Napoleão Bonaparte',['1769']))
O('Linha do tempo: ordene o nascimento de Cleópatra, Carlos Magno, Gutenberg e Galileu.',
  [('cleopatra','Cleópatra VII','Nascimento',-69,F('cleopatra')),('carlos_magno','Carlos Magno','Nascimento',742,F('carlos_magno')),('gutenberg','Gutenberg','Nascimento',1400,F('gutenberg')),('galileu','Galileu Galilei','Nascimento',1564,F('galileu'))], 2, ('pt','Galileu Galilei',['1564']))
O('Linha do tempo: o que veio primeiro — a morte de Alexandre, a de Júlio César, a de Joana d\'Arc ou a de Lincoln?',
  [('alexandre','Alexandre, o Grande','Morte',-323,F('alexandre')),('cesar','Júlio César','Morte',-44,F('cesar')),('joana','Joana d\'Arc','Morte',1431,F('joana_darc')),('lincoln','Abraham Lincoln','Morte',1865,F('lincoln'))], 2, ('pt','Abraham Lincoln',['1865']))
O('Linha do tempo: ordene Colombo na América, Lutero e as 95 teses, a Revolução Francesa e a Primeira Guerra.',
  [('colombo','Colombo chega à América','Primeira viagem',1492,F('colombo')),('lutero','95 teses de Lutero','Reforma',1517,F('lutero')),('bastilha','Queda da Bastilha','Revolução Francesa',1789,C('franca_revolucionaria')),('guerra','Início da Primeira Guerra','Sarajevo',1914,C('austria_hungria'))], 1, ('pt','Primeira Guerra Mundial',['1914']))
O('Linha do tempo: ordene os eventos do Brasil — Cabral, Independência, Lei Áurea e Brasília.',
  [('cabral','Cabral chega ao Brasil','Porto Seguro',1500,F('cabral')),('indep','Independência do Brasil','Grito do Ipiranga',1822,F('dom_pedro_i')),('aurea','Lei Áurea','Abolição',1888,F('princesa_isabel')),('brasilia','Inauguração de Brasília','JK',1960,F('jk'))], 1, ('pt','História do Brasil',['1822']))
O('Linha do tempo: o que veio primeiro — a Grande Pirâmide, o Partenon, o Coliseu ou Santa Sofia?',
  [('piramide','Pirâmide de Quéops','Egito Antigo',-2560,C('egito_antigo')),('partenon','Partenon','Atenas',-432,C('atenas')),('coliseu','Coliseu','Roma',80,C('imperio_romano')),('santa_sofia','Santa Sofia','Constantinopla',537,C('bizancio'))], 2, ('pt','Pirâmide de Quéops',['Quéops']))
O('Linha do tempo: ordene a queda de Constantinopla, a Magna Carta, o Tratado de Tordesilhas e a Paz de Vestfália.',
  [('magna','Magna Carta','Inglaterra',1215,C('inglaterra')),('const','Queda de Constantinopla','Otomanos',1453,F('maome_ii')),('tordesilhas','Tratado de Tordesilhas','Portugal e Espanha',1494,C('espanha')),('vestfalia','Paz de Vestfália','Fim da Guerra dos Trinta Anos',1648,C('sacro_imperio'))], 3, ('pt','Paz de Vestfália',['1648']))
O('Linha do tempo: quem nasceu primeiro — Mozart, Beethoven, Chopin ou Tchaikovsky?',
  [('mozart','Mozart','Nascimento',1756,F('mozart')),('beethoven','Beethoven','Nascimento',1770,F('beethoven')),('chopin','Chopin','Nascimento',1810,F('chopin')),('tchaikovsky','Tchaikovsky','Nascimento',1840,F('tchaikovsky'))], 3, ('pt','Frédéric Chopin',['1810']))
O('Linha do tempo: ordene a independência dos EUA, a do Haiti, a do Brasil e a da Índia.',
  [('eua','Independência dos EUA','Declaração de 1776',1776,F('jefferson')),('haiti','Independência do Haiti','Toussaint e Dessalines',1804,F('toussaint')),('brasil','Independência do Brasil','D. Pedro I',1822,F('dom_pedro_i')),('india','Independência da Índia','Gandhi',1947,F('gandhi'))], 2, ('pt','Independência da Índia',['1947']))
O('Linha do tempo: ordene o voo de Santos Dumont, a Revolução Russa, o fim da Segunda Guerra e a chegada à Lua.',
  [('dumont','Voo do 14-Bis','Santos Dumont',1906,F('santos_dumont')),('russa','Revolução Russa','Lênin',1917,F('lenin')),('fim','Fim da Segunda Guerra','1945',1945,F('churchill')),('lua','Homem na Lua','Apollo 11',1969,F('armstrong'))], 1, ('pt','Apollo 11',['1969']))
O('Linha do tempo: ordene a morte de Tutancâmon, de Péricles, de Augusto e de Maomé II.',
  [('tut','Tutancâmon','Morte',-1323,F('tutancamon')),('pericles','Péricles','Morte',-429,F('pericles')),('augusto','Augusto','Morte',14,F('augusto')),('maome','Maomé II','Morte',1481,F('maome_ii'))], 4, ('pt','Augusto',['14']))
O('Linha do tempo: ordene o nascimento de Darwin, Marx, Tolstói e Freud.',
  [('darwin','Darwin','Nascimento',1809,F('darwin')),('marx','Karl Marx','Nascimento',1818,F('marx')),('tolstoi','Tolstói','Nascimento',1828,F('tolstoi')),('freud','Sigmund Freud','Nascimento',1856,F('freud'))], 3, ('pt','Sigmund Freud',['1856']))
O('Linha do tempo: ordene Maratona, a travessia dos Alpes por Aníbal, o Rubicão de César e a queda de Roma.',
  [('medicas','Batalha de Maratona','Guerras Médicas',-490,C('atenas')),('punicas','Aníbal atravessa os Alpes','Guerras Púnicas',-218,F('anibal')),('cesar','César cruza o Rubicão','Guerra civil',-49,F('cesar')),('queda','Queda de Roma do Ocidente','476',476,C('imperio_romano'))], 3, ('pt','Guerras Púnicas',['218 a.C.']))
O('Linha do tempo: ordene a Primeira Cruzada, a Guerra dos Cem Anos, a Peste Negra e a Primeira Guerra Mundial.',
  [('cruz','Primeira Cruzada','Início',1096,F('saladino')),('cem','Guerra dos Cem Anos','Início',1337,F('joana_darc')),('peste','Peste Negra chega à Europa','1347',1347,C('veneza')),('guerra','Primeira Guerra Mundial','Início',1914,C('imperio_alemao'))], 4, ('pt','Peste Negra',['1347']))
O('Linha do tempo: ordene a morte de Zumbi, a de Tiradentes, a de D. Pedro I e a de Getúlio Vargas.',
  [('zumbi','Zumbi dos Palmares','Morte',1695,F('zumbi')),('tira','Tiradentes','Morte',1792,F('tiradentes')),('pedro','Dom Pedro I','Morte',1834,F('dom_pedro_i')),('getulio','Getúlio Vargas','Morte',1954,F('getulio'))], 2, ('pt','Getúlio Vargas',['1954']))
O('Linha do tempo: ordene o Muro de Berlim (construção), Mandela livre, o fim da URSS e o 11 de setembro.',
  [('muro','Construção do Muro de Berlim','1961',1961,C('urss')),('queda','Queda do Muro de Berlim','1989',1989,C('urss')),('mandela','Mandela é libertado','1990',1990,F('mandela')),('onze','Atentados de 11 de setembro','2001',2001,C('estados_unidos'))], 3, ('pt','Muro de Berlim',['1961']))
c.write()

# ───────────────────────── Impérios e civilizações ─────────────────────────
c = Cat('imperios', 'Impérios e Civilizações', '🌍', 'Estados que fizeram a História', '#8A5A2B', order=42)
c.C('Qual estado, com capital em Cuzco, dominava os Andes quando os espanhóis chegaram?', 'inca', 1, icon='map', src=('pt', 'Império Inca', ['Cusco']))
c.C('Qual estado, com capital em Tenochtitlán, foi derrubado por Cortés?', 'asteca', 1, icon='pyramid', src=('pt', 'Império Asteca', ['Tenochtitlán']))
c.C('Qual civilização construiu as pirâmides de Gizé e os templos de Karnak?', 'egito_antigo', 1, icon='pyramid', src=('pt', 'Egito Antigo', ['Gizé']))
c.C('Qual império, fundado por Ciro, o Grande, foi o maior do mundo antigo até Alexandre?', 'persia', 2, icon='crown', src=('pt', 'Império Aquemênida', ['Ciro']))
c.C('Qual cidade-Estado grega educava seus cidadãos para a guerra e liderou a Liga do Peloponeso?', 'esparta', 1, icon='sword', src=('pt', 'Esparta', ['Peloponeso']))
c.C('Qual cidade-Estado grega foi o berço da democracia e do teatro?', 'atenas', 1, icon='column', src=('pt', 'Atenas', ['democracia']))
c.C('Qual potência do norte da África rivalizou com Roma nas Guerras Púnicas?', 'cartago', 1, icon='ship', src=('pt', 'Cartago', ['Roma']))
c.C('Qual estado, de Augusto a Rômulo Augústulo, dominou o Mediterrâneo por séculos?', 'imperio_romano', 1, icon='crown', src=('pt', 'Império Romano', ['Augusto']))
c.C('Qual império, com capital em Constantinopla, durou até 1453?', 'bizancio', 2, stad='santa_sofia', src=('pt', 'Império Bizantino', ['1453']))
c.C('Qual império islâmico, com capital em Bagdá, viu florescer a Casa da Sabedoria?', 'califado_abassida', 3, icon='book', src=('pt', 'Califado Abássida', ['Bagdá']))
c.C('Qual império fundado por Gengis Khan chegou a ir do Pacífico ao Leste Europeu?', 'imperio_mongol', 1, icon='sword', src=('pt', 'Império Mongol', ['Gengis Khan']))
c.C('Qual império conquistou Constantinopla em 1453 e governou o Oriente Médio por séculos?', 'imperio_otomano', 1, stad='mesquita_azul', src=('pt', 'Império Otomano', ['1453']))
c.C('Qual dinastia chinesa construiu a Cidade Proibida?', 'ming', 2, stad='cidade_proibida', src=('pt', 'Dinastia Ming', ['Cidade Proibida']))
c.C('Qual estado indiano, de Akbar a Aurangzeb, construiu o Taj Mahal?', 'mogol', 2, stad='taj_mahal', src=('pt', 'Império Mogol', ['Taj Mahal']))
c.C('Qual império do oeste africano, famoso pelo ouro e por Mansa Mussa, tinha Tombuctu como centro cultural?', 'mali', 3, icon='map', src=('pt', 'Império do Mali', ['Mansa Mussa']))
c.C('Qual estado europeu, liderado por Frederico, o Grande, tinha Berlim como centro?', 'prussia', 3, stad='brandemburgo', src=('pt', 'Prússia', ['Frederico']))
c.C('Qual império, de Pedro, o Grande a Nicolau II, era governado por czares?', 'imperio_russo', 2, stad='kremlin', src=('pt', 'Império Russo', ['czar']))
c.C('Qual estado nasceu com a Revolução de 1917 e acabou em 1991?', 'urss', 1, icon='flag', src=('pt', 'União Soviética', ['1991']))
c.C('Qual estado europeu foi governado por Napoleão como imperador?', 'imperio_frances', 2, stad='arco_triunfo', src=('pt', 'Primeiro Império Francês', ['Napoleão']))
c.C('Qual estado, no século XIX, teve a rainha Vitória e dominou colônias em todos os continentes?', 'imperio_britanico', 1, stad='torre_londres', src=('pt', 'Império Britânico', ['Vitória']))
c.C('Qual império, com sede na Península Ibérica, tinha Madri como centro e o Escorial como símbolo?', 'imperio_espanhol', 2, stad='escorial', src=('pt', 'Império Espanhol', ['Filipe II']))
c.C('Qual império ultramarino teve como símbolo as caravelas e a Torre de Belém?', 'imperio_portugues', 2, stad='torre_belem', src=('pt', 'Império Português', ['Lisboa']))
c.C('Qual estado asiático, com capital em Angkor, construiu o maior templo do mundo?', 'khmer', 3, stad='angkor_wat', src=('pt', 'Império Khmer', ['Angkor']))
c.C('Qual civilização mesoamericana, de pirâmides e calendário, construiu Chichén Itzá?', 'maia', 2, stad='chichen_itza', src=('pt', 'Civilização maia', ['Chichén Itzá']))
c.C('Qual república italiana de mercadores dominou o Mediterrâneo oriental, com a Basílica de São Marcos?', 'veneza', 3, stad='sao_marcos', src=('pt', 'República de Veneza', ['São Marcos']))
c.C('Qual estado do Japão, de 1603 a 1868, foi governado por xoguns de uma mesma família?', 'tokugawa', 3, stad='himeji', src=('pt', 'Xogunato Tokugawa', ['xogun']))
c.C('Qual império de língua e leis próprias reinou de 962 a 1806 na Europa Central?', 'sacro_imperio', 4, icon='crown', src=('pt', 'Sacro Império Romano-Germânico', ['1806']))
c.C('Qual estado, no século XVII, foi a potência marítima da Europa, com a Companhia das Índias?', 'holanda', 3, icon='ship', src=('pt', 'República das Sete Províncias Unidas', ['Companhia']))
c.C('Qual império foi unificado por um primeiro imperador em 221 a.C. e ergueu uma grande muralha?', 'dinastia_qin', 3, stad='muralha_china', src=('pt', 'Dinastia Qin', ['221 a.C.']))
c.C('Qual reino, no atual Etiópia, adotou o cristianismo no século IV?', 'axum', 4, icon='column', src=('pt', 'Reino de Axum', ['cristianismo']))
c.C('Qual império da Mesopotâmia, de Hamurabi, tinha os Jardins Suspensos?', 'babilonia', 2, stad='portao_ishtar', src=('pt', 'Babilônia', ['Hamurabi']))
c.C('Qual império da Europa Central, dos Habsburgos, existiu de 1867 a 1918?', 'austria_hungria', 3, icon='crown', src=('pt', 'Áustria-Hungria', ['1867']))
c.C('Qual estado asiático desmoronou em 1912, encerrando milênios de governo imperial na China?', 'qing', 3, stad='cidade_proibida', src=('pt', 'Dinastia Qing', ['1912']))
c.write()
