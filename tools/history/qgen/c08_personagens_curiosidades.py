import csv, io, os, random
from qdsl import Cat, ROOT

# ───────────────────────── Quem foi? ─────────────────────────
c = Cat('personagens', 'Quem foi?', '👤', 'Feitos de reis, sábios e rebeldes', '#6D4C41', order=33)
c.P('Qual faraó fundou uma nova capital e tentou impor o culto a Aton?', ['aquenaton'], 3, icon='pyramid', src=('pt', 'Aquenáton', ['Amarna']))
c.P('Qual rei persa fundou o primeiro grande império e libertou os judeus do cativeiro na Babilônia?', ['ciro'], 3, icon='crown', src=('pt', 'Ciro II, o Grande', ['Babilônia']))
c.P('Qual rei persa comandou a primeira invasão da Grécia, derrotada em Maratona?', ['dario'], 4, icon='sword', src=('pt', 'Dario I', ['Maratona']))
c.P('Qual rei persa, filho de Dario, invadiu a Grécia em 480 a.C. e foi derrotado em Salamina?', ['xerxes'], 4, icon='sword', src=('pt', 'Xerxes I', ['Salamina']))
c.P('Qual imperador bizantino reconquistou parte do Ocidente, construiu Santa Sofia e codificou o direito romano?', ['justiniano'], 3, stad='santa_sofia', src=('pt', 'Justiniano I', ['Santa Sofia']))
c.P('Qual chefe huno invadiu a Gália e a Itália em meados do século V?', ['atila'], 2, icon='sword', src=('pt', 'Átila', ['Gália']))
c.P('Qual filósofo árabe de Córdoba comentou Aristóteles e influenciou o pensamento europeu?', ['averroes'], 4, icon='book', src=('pt', 'Averróis', ['Aristóteles']))
c.P('Qual viajante marroquino percorreu cerca de 120 mil km pelo mundo islâmico no século XIV?', ['ibn_battuta'], 3, icon='map', src=('pt', 'Ibn Battuta', ['viagens']))
c.P('Qual conquistador turco-mongol fundou um império com capital em Samarcanda no século XIV?', ['tamerlao'], 3, icon='sword', src=('pt', 'Tamerlão', ['Samarcanda']))
c.P('Qual imperador do Sacro Império e rei da Espanha enfrentou Lutero na Dieta de Worms?', ['carlos_v'], 3, icon='crown', src=('pt', 'Carlos V do Sacro Império Romano-Germânico', ['Worms']))
c.P('Qual rei da Espanha enviou a Invencível Armada contra a Inglaterra, em 1588?', ['felipe_ii'], 2, stad='escorial', src=('pt', 'Filipe II de Espanha', ['Armada']))
c.P('Qual capitão britânico explorou o Pacífico e foi morto no Havaí, em 1779?', ['cook'], 3, icon='ship', src=('pt', 'James Cook', ['Havaí']))
c.P('Qual pintor espanhol retratou os fuzilamentos de 3 de maio de 1808?', ['goya'], 3, icon='bust', src=('pt', 'Francisco de Goya', ['3 de Maio']))
c.P('Qual cientista holandês de origem portuguesa foi excomungado e escreveu a Ética?', ['spinoza'], 4, icon='book', src=('pt', 'Baruch de Espinoza', ['Ética']))
c.P('Qual conquistador viking-normando se tornou rei da Inglaterra em 1066?', ['guilherme_conquistador'], 2, icon='crown', src=('pt', 'Guilherme I de Inglaterra', ['1066']))
c.P('Qual imperador mongol fundou a dinastia Yuan e recebeu Marco Polo?', ['kublai'], 3, icon='crown', src=('pt', 'Kublai Khan', ['Marco Polo']))
c.P('Qual rainha de Angola do século XVII negociou e guerreou contra os portugueses?', ['nzinga'], 3, icon='crown', src=('en', 'Nzinga of Ndongo and Matamba', ['Portuguese']))
c.P('Qual presidente americano foi assassinado em Dallas, em 1963?', ['kennedy'], 1, icon='flag', src=('pt', 'John F. Kennedy', ['Dallas']))
c.P('Qual político alemão, o Chanceler de Ferro, criou o primeiro sistema moderno de previdência social?', ['bismarck'], 4, icon='cannon', src=('pt', 'Otto von Bismarck', ['previdência']))
c.P('Qual líder turco aboliu o califado e modernizou o país após 1923?', ['ataturk'], 3, icon='flag', src=('pt', 'Mustafa Kemal Atatürk', ['califado']))
c.P('Qual imperador etíope foi derrubado em 1974 após reinar por mais de 40 anos?', ['haile_selassie'], 4, icon='crown', src=('pt', 'Hailé Selassié I', ['1974']))
c.P('Qual cientista dinamarquês debateu física quântica com Einstein?', ['niels_bohr'], 4, icon='book', src=('pt', 'Niels Bohr', ['Einstein']))
c.P('Qual explorador norueguês foi o primeiro a chegar ao Polo Sul, em 1911?', ['amundsen'], 3, icon='map', src=('pt', 'Roald Amundsen', ['Polo Sul']))
c.P('Qual santo e filósofo dominicano escreveu sobre fé e razão no século XIII?', ['tomas_aquino'], 3, icon='book', src=('pt', 'Tomás de Aquino', ['dominicano']))
c.P('Qual imperador japonês assistiu à transição de xogunato para monarquia moderna?', ['meiji'], 3, icon='crown', src=('pt', 'Imperador Meiji', ['xogunato']))
c.P('Qual líder indígena sioux ficou famoso pela resistência às invasões das Black Hills?', ['touro_sentado'], 3, icon='sword', src=('pt', 'Touro Sentado', ['Black Hills']))
c.P('Qual ex-presidente americano é lembrado pelo New Deal contra a Grande Depressão?', ['fdr'], 2, icon='flag', src=('pt', 'Franklin D. Roosevelt', ['New Deal']))
c.write()

# ───────────────────────── Monumentos e Lugares ─────────────────────────
c = Cat('monumentos', 'Monumentos e Lugares', '🗺️', 'Pedras que contam histórias', '#3F6FB5', order=34)
rows = [l.rstrip('\n').split('|') for l in io.open(os.path.join(ROOT, 'tools', 'history', 'monuments.tsv'), encoding='utf-8') if l.strip() and not l.startswith('#')]
names = {r[0]: r[1] for r in rows}
city = {r[0]: r[2] for r in rows}
rnd = random.Random(7)
keys = [r[0] for r in rows]
HARD = {'petra', 'portao_ishtar', 'karnak', 'forum_romano', 'muralha_adriano', 'aqueduto_segovia', 'sao_marcos', 'escorial', 'jeronimos', 'palacio_inverno', 'catedral_brasilia', 'museu_imperial', 'brandemburgo', 'capitolio', 'himeji', 'persepolis', 'abu_simbel', 'museu_ipiranga'}
VARS = ['Que monumento é este?', 'Qual é este monumento histórico?', 'Que lugar famoso aparece na foto?', 'Como se chama esta construção?']
for n_, (k, r) in enumerate(zip(keys, rows)):
    others = [x for x in keys if x != k]
    wrong = [names[x] for x in rnd.sample(others, 5)]
    c.T(VARS[n_ % 4], names[k], wrong, 4 if k in HARD else 2, stad=k, src=(r[3].split(':')[0], r[3].split(':', 1)[1], [names[k].split()[-1]]))
placeQ = [('piramide_queops', 'Em que país fica a Pirâmide de Quéops?', 'Egito', ['México', 'Peru', 'Sudão', 'Iraque', 'Líbia']),
          ('taj_mahal', 'Em que país fica o Taj Mahal?', 'Índia', ['Paquistão', 'Irã', 'Turquia', 'Nepal', 'Bangladesh']),
          ('machu_picchu', 'Em que país fica Machu Picchu?', 'Peru', ['Bolívia', 'Equador', 'México', 'Chile', 'Colômbia']),
          ('chichen_itza', 'Em que país fica Chichén Itzá?', 'México', ['Guatemala', 'Peru', 'Honduras', 'Cuba', 'Belize']),
          ('partenon', 'Em que cidade fica o Partenon?', 'Atenas', ['Roma', 'Esparta', 'Corinto', 'Istambul', 'Delfos']),
          ('coliseu', 'Em que cidade fica o Coliseu?', 'Roma', ['Atenas', 'Milão', 'Florença', 'Veneza', 'Nápoles']),
          ('santa_sofia', 'Em que cidade fica Santa Sofia?', 'Istambul', ['Atenas', 'Roma', 'Moscou', 'Cairo', 'Belgrado']),
          ('kremlin', 'Em que cidade fica o Kremlin?', 'Moscou', ['São Petersburgo', 'Kiev', 'Minsk', 'Varsóvia', 'Praga']),
          ('torre_belem', 'Em que cidade fica a Torre de Belém?', 'Lisboa', ['Porto', 'Madri', 'Sevilha', 'Coimbra', 'Faro']),
          ('muralha_china', 'Em que país fica a Grande Muralha?', 'China', ['Japão', 'Mongólia', 'Coreia', 'Índia', 'Vietnã']),
          ('angkor_wat', 'Em que país fica Angkor Wat?', 'Camboja', ['Tailândia', 'Vietnã', 'Laos', 'Mianmar', 'Indonésia']),
          ('cristo_redentor', 'Em que cidade brasileira fica o Cristo Redentor?', 'Rio de Janeiro', ['São Paulo', 'Salvador', 'Brasília', 'Belo Horizonte', 'Recife']),
          ('ouro_preto', 'Em que estado brasileiro fica Ouro Preto?', 'Minas Gerais', ['Bahia', 'São Paulo', 'Goiás', 'Espírito Santo', 'Rio de Janeiro']),
          ('museu_ipiranga', 'Em que cidade fica o Museu do Ipiranga?', 'São Paulo', ['Rio de Janeiro', 'Santos', 'Salvador', 'Campinas', 'Curitiba']),
          ('estatua_liberdade', 'Em que cidade fica a Estátua da Liberdade?', 'Nova York', ['Washington', 'Boston', 'Filadélfia', 'Chicago', 'Los Angeles']),
          ('sagrada_familia', 'Em que cidade fica a Sagrada Família?', 'Barcelona', ['Madri', 'Valência', 'Sevilha', 'Lisboa', 'Granada']),
          ('stonehenge', 'Em que país fica Stonehenge?', 'Inglaterra', ['Escócia', 'Irlanda', 'França', 'País de Gales', 'Dinamarca']),
          ('muro_berlim', 'Em que cidade ficava o Muro que dividiu a Alemanha?', 'Berlim', ['Bonn', 'Munique', 'Viena', 'Praga', 'Varsóvia'])]
for k, t, a, w in placeQ:
    c.T(t, a, w, 2, stad=k, src=('pt', {'piramide_queops':'Pirâmide de Quéops','taj_mahal':'Taj Mahal','machu_picchu':'Machu Picchu','chichen_itza':'Chichén Itzá','partenon':'Partenon','coliseu':'Coliseu','santa_sofia':'Santa Sofia','kremlin':'Kremlin de Moscou','torre_belem':'Torre de Belém','muralha_china':'Grande Muralha da China','angkor_wat':'Angkor Wat','cristo_redentor':'Cristo Redentor (Rio de Janeiro)','ouro_preto':'Ouro Preto','museu_ipiranga':'Museu do Ipiranga','estatua_liberdade':'Estátua da Liberdade','sagrada_familia':'Templo Expiatório da Sagrada Família','stonehenge':'Stonehenge','muro_berlim':'Muro de Berlim'}[k], [a.split()[0]]))
c.write()

# ───────────────────────── Curiosidades ─────────────────────────
c = Cat('curiosidades', 'Curiosidades da História', '🎲', 'Fatos que poucos sabem', '#00897B', order=35)
c.T('Qual o animal que, segundo os romanos, salvou o Capitólio com seus gritos, quando os gauleses atacaram?', 'Gansos', ['Cães', 'Cavalos', 'Corujas', 'Galos', 'Lobos'], 3, icon='castle', src=('pt', 'Saque de Roma (387 a.C.)', ['gansos']))
c.T('Qual jogo de tabuleiro, surgido na Índia por volta do século VI, chegou à Europa pelos árabes?', 'Xadrez', ['Gamão', 'Go', 'Damas', 'Senet', 'Mahjong'], 2, icon='gear', src=('pt', 'Xadrez', ['Índia']))
c.T('Qual doença matou mais soldados que as batalhas na Guerra da Crimeia, segundo Florence Nightingale?', 'Doenças infecciosas e falta de higiene', ['Frio extremo', 'Fome apenas', 'Afogamentos', 'Intoxicação por gás', 'Acidentes de cavalo'], 4, icon='torch', src=('pt', 'Florence Nightingale', ['higiene']))
c.T('Em que século surgiu a imprensa de tipos móveis na Europa, com Gutenberg?', 'XV', ['XII', 'XIII', 'XIV', 'XVI', 'XVII'], 2, icon='book', src=('pt', 'Johannes Gutenberg', ['século XV']))
c.T('Qual foi a primeira capital do Brasil independente?', 'Rio de Janeiro', ['Salvador', 'São Paulo', 'Brasília', 'Recife', 'Ouro Preto'], 2, icon='map', src=('pt', 'Rio de Janeiro', ['capital']))
c.T('Qual cidade do mundo foi capital de três impérios: romano, bizantino e otomano?', 'Istambul (Constantinopla)', ['Atenas', 'Alexandria', 'Roma', 'Antioquia', 'Bagdá'], 3, stad='santa_sofia', src=('pt', 'Istambul', ['Bizâncio']))
c.T('Qual rio Júlio César cruzou, em 49 a.C., simbolizando o início da guerra civil?', 'Rubicão', ['Tibre', 'Pó', 'Danúbio', 'Reno', 'Arno'], 2, icon='sword', src=('pt', 'Rubicão', ['César']))
c.T('Qual o nome do navio de Charles Darwin na viagem que inspirou sua teoria?', 'HMS Beagle', ['Mayflower', 'Bounty', 'Victory', 'Endeavour', 'Santa Maria'], 2, icon='ship', src=('pt', 'HMS Beagle', ['Darwin']))
c.T('Qual a ilha onde Napoleão morreu em 1821, no Atlântico Sul?', 'Santa Helena', ['Elba', 'Ascensão', 'Trindade', 'Córsega', 'Madeira'], 2, icon='ship', src=('pt', 'Santa Helena', ['Napoleão']))
c.T('Qual a mulher que, em 1903, ganhou o Nobel de Física e depois o de Química, em 1911?', 'Marie Curie', ['Irène Joliot-Curie', 'Lise Meitner', 'Rosalind Franklin', 'Dorothy Hodgkin', 'Ada Lovelace'], 2, icon='book', src=('pt', 'Marie Curie', ['1911']))
c.T('Qual o animal que Aníbal levou na travessia dos Alpes?', 'Elefantes', ['Camelos', 'Rinocerontes', 'Cavalos brancos', 'Touros', 'Mamutes'], 1, icon='sword', src=('pt', 'Aníbal', ['elefantes']))
c.T('Qual país tem o maior número de pirâmides do mundo, mais que o Egito?', 'Sudão', ['México', 'Peru', 'China', 'Indonésia', 'Etiópia'], 5, icon='pyramid', src=('pt', 'Pirâmides núbias', ['Sudão']))
c.T('Qual o maior império da história por área contínua, no século XIII?', 'Mongol', ['Romano', 'Persa', 'Otomano', 'Britânico', 'Inca'], 2, icon='sword', src=('pt', 'Império Mongol', ['maior']))
c.T('Qual objeto de ouro e ferro era usado para identificar os imperadores do Sacro Império, e hoje está em Viena?', 'A coroa imperial', ['A espada de Carlos Magno', 'O cetro de Otão', 'O Santo Graal', 'A lança do destino', 'O manto de Cristo'], 5, icon='crown', src=('pt', 'Coroa Imperial do Sacro Império Romano-Germânico', ['Viena']))
c.T('Qual alimento, trazido do Peru, salvou a Europa de várias fomes a partir do século XVIII?', 'Batata', ['Milho', 'Mandioca', 'Tomate', 'Cacau', 'Feijão'], 2, icon='globe', src=('pt', 'Batata', ['Peru']))
c.T('Qual o ano em que as mulheres passaram a votar no Brasil, por decreto de Getúlio Vargas?', '1932', ['1889', '1922', '1946', '1964', '1988'], 3, icon='flag', src=('pt', 'Voto feminino no Brasil', ['1932']))
c.T('Qual civilização antiga já usava vidros, cosméticos e sabão e era chamada de “berço da civilização”?', 'Mesopotâmia', ['Grécia', 'Roma', 'China', 'Maia', 'Fenícia'], 3, icon='map', src=('pt', 'Mesopotâmia', ['berço']))
c.T('Qual a sigla da organização internacional criada em 1945, com sede em Nova York?', 'ONU', ['OTAN', 'OEA', 'UE', 'OMC', 'FMI'], 1, icon='globe', src=('pt', 'Organização das Nações Unidas', ['Nova Iorque']))
c.T('Qual o objeto de uma crença antiga: segundo a lenda, uma espada fincada numa rocha, ligada ao rei Artur?', 'Excalibur', ['Durandal', 'Joyeuse', 'Tizona', 'Gram', 'Anduril'], 3, icon='sword', src=('pt', 'Excalibur', ['Artur']))
c.write()
