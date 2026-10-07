from qdsl import Cat

# ───────────────────────── Egito e Mesopotâmia ─────────────────────────
c = Cat('egito_mesopotamia', 'Antigo Oriente', '🏺', 'Egito, Mesopotâmia, Pérsia e vizinhos', '#B8860B', order=10)
c.T('Qual rio fertilizava as terras do Egito Antigo?', 'Nilo', ['Tigre', 'Eufrates', 'Indo', 'Danúbio', 'Jordão'], 1, icon='pyramid',
    src=('pt', 'Egito Antigo', ['Nilo']), x='As cheias anuais do Nilo deixavam um limo fértil nas margens: sem ele, o Egito seria deserto.')
c.T('Como se chamava a escrita sagrada dos antigos egípcios, feita de desenhos?', 'Hieróglifos', ['Cuneiforme', 'Runas', 'Alfabeto fenício', 'Linear B', 'Ogham'], 1, icon='scroll',
    src=('pt', 'Hieróglifo', ['Egito']))
c.T('Qual pedra, encontrada em 1799, ajudou a decifrar os hieróglifos?', 'Pedra de Roseta', ['Pedra de Roma', 'Código de Hamurabi', 'Estela de Merneptá', 'Pedra do Sol', 'Obelisco de Karnak'], 2, icon='scroll',
    src=('pt', 'Pedra de Roseta', ['1799']), x='Jean-François Champollion decifrou os hieróglifos em 1822, comparando os três textos gravados na pedra.')
c.P('Qual faraó mandou construir os templos de Abu Simbel e reinou por mais de sessenta anos?', ['ramses_ii'], 2, stad='abu_simbel',
    src=('pt', 'Ramessés II', ['Abu Simbel']))
c.P('Qual faraó teve a tumba descoberta quase intacta por Howard Carter, em 1922?', ['tutancamon'], 1, icon='pyramid',
    src=('pt', 'Tutancâmon', ['Howard Carter']), x='O faraó-menino morreu por volta dos 18 anos; sua máscara de ouro virou símbolo do Egito Antigo.')
c.P('Qual mulher governou o Egito como faraó por cerca de vinte anos, usando barba cerimonial?', ['hatexepsute'], 3, icon='crown',
    src=('pt', 'Hatexepsute', ['faraó']))
c.P('Qual faraó tentou impor o culto a um único deus, o disco solar Aton?', ['aquenaton'], 3, icon='pyramid',
    src=('pt', 'Aquenáton', ['Aton']))
c.P('Qual rainha do Egito se aliou a Júlio César e depois a Marco Antônio?', ['cleopatra'], 1, icon='crown',
    src=('pt', 'Cleópatra VII', ['César', 'Antônio']))
c.T('Qual é a maior das pirâmides de Gizé?', 'A de Quéops', ['A de Quéfren', 'A de Miquerinos', 'A de Djoser', 'A de Medum', 'A de Snefru'], 2, stad='piramide_queops',
    src=('pt', 'Pirâmide de Quéops', ['Quéops']), x='Por mais de 3.800 anos, a Grande Pirâmide foi a construção mais alta feita pelo ser humano.')
c.T('Para que serviam as pirâmides do Egito?', 'Tumbas de faraós', ['Observatórios astronômicos', 'Celeiros reais', 'Templos de sacrifício', 'Fortalezas militares', 'Palácios de verão'], 1, icon='pyramid',
    src=('pt', 'Pirâmide', ['tumba']))
c.T('Qual processo preservava o corpo dos faraós após a morte?', 'Mumificação', ['Cremação', 'Embalsamamento grego', 'Congelamento', 'Petrificação', 'Defumação'], 1, icon='pyramid',
    src=('pt', 'Mumificação', ['Egito']))
c.T('Qual deus egípcio, de cabeça de chacal, guiava os mortos e cuidava da mumificação?', 'Anúbis', ['Hórus', 'Rá', 'Osíris', 'Thot', 'Seth'], 2, icon='pyramid',
    src=('pt', 'Anúbis', ['chacal']))
c.T('Qual era o deus-sol principal do panteão egípcio?', 'Rá', ['Osíris', 'Anúbis', 'Hórus', 'Ptah', 'Sobek'], 2, icon='pyramid',
    src=('pt', 'Rá', ['Sol']))
c.T('Como se chamava o soberano do Egito Antigo?', 'Faraó', ['Sultão', 'Califa', 'Imperador', 'Xá', 'Regente'], 1, icon='crown',
    src=('pt', 'Faraó', ['Egito']))
c.T('O que o Egito Antigo escrevia sobre rolos feitos de uma planta do Nilo?', 'Papiro', ['Pergaminho', 'Argila', 'Seda', 'Bambu', 'Couro'], 1, icon='scroll',
    src=('pt', 'Papiro', ['Egito']))
c.T('Qual civilização criou a escrita cuneiforme, em placas de argila?', 'Sumérios', ['Egípcios', 'Fenícios', 'Gregos', 'Hititas', 'Persas'], 2, icon='scroll',
    src=('pt', 'Escrita cuneiforme', ['sumér']), x='A palavra “cuneiforme” vem do latim cuneus, “cunha”: o formato dos sinais feitos por uma cunha na argila.')
c.T('Entre quais rios se desenvolveu a Mesopotâmia?', 'Tigre e Eufrates', ['Nilo e Jordão', 'Indo e Ganges', 'Danúbio e Reno', 'Tigre e Nilo', 'Eufrates e Jordão'], 1, icon='map',
    src=('pt', 'Mesopotâmia', ['Tigre', 'Eufrates']), x='“Mesopotâmia” significa “terra entre rios”, em grego.')
c.P('Qual rei da Babilônia ordenou um dos primeiros códigos de leis escritos, com a regra “olho por olho”?', ['hamurabi'], 2, icon='scroll',
    src=('pt', 'Hamurabi', ['código']), x='O Código de Hamurabi foi gravado numa estela de basalto de mais de dois metros, hoje no Museu do Louvre.')
c.P('Qual rei babilônico, segundo a tradição, mandou erguer os Jardins Suspensos?', ['nabucodonosor'], 3, stad='portao_ishtar',
    src=('pt', 'Nabucodonosor II', ['Jardins Suspensos']))
c.C('Qual império mesopotâmico tinha a cidade de Nínive como capital e uma biblioteca com milhares de tabuletas?', 'assiria', 4, icon='book',
    src=('pt', 'Império Assírio', ['Nínive']))
c.T('Qual cidade da Mesopotâmia era famosa pelo Portão de Ishtar e pelos Jardins Suspensos?', 'Babilônia', ['Nínive', 'Ur', 'Susa', 'Persépolis', 'Tebas'], 2, stad='portao_ishtar',
    src=('pt', 'Babilônia', ['Ishtar']))
c.T('Qual civilização mesopotâmica inventou a roda e o arado, segundo os achados arqueológicos?', 'Sumérios', ['Hititas', 'Acádios', 'Assírios', 'Caldeus', 'Elamitas'], 3, icon='gear',
    src=('pt', 'Suméria', ['roda']))
c.T('Qual o nome dos templos em degraus da Mesopotâmia, ligados à Torre de Babel?', 'Zigurates', ['Pirâmides', 'Obeliscos', 'Mastabas', 'Pagodes', 'Tholos'], 2, icon='pyramid',
    src=('pt', 'Zigurate', ['templo']))
c.T('Qual povo do Oriente Médio criou um alfabeto que deu origem ao alfabeto grego?', 'Fenícios', ['Hebreus', 'Egípcios', 'Persas', 'Assírios', 'Lídios'], 2, icon='ship',
    src=('pt', 'Fenícia', ['alfabeto']))
c.T('Qual o nome do primeiro faraó a reunir o Alto e o Baixo Egito, segundo a tradição?', 'Narmer (Menés)', ['Djoser', 'Quéops', 'Ramsés', 'Tutmés', 'Akhenaton'], 4, icon='crown',
    src=('pt', 'Narmer', ['Alto e Baixo Egito']))
c.T('Qual construção do Egito Antigo é considerada a pirâmide mais antiga, em degraus?', 'A de Djoser, em Sacará', ['A de Quéops', 'A de Miquerinos', 'A Pirâmide Vermelha', 'A de Quéfren', 'A de Unas'], 4, icon='pyramid',
    src=('pt', 'Pirâmide de Djoser', ['Sacará']))
c.T('Quem, segundo a Bíblia, libertou os hebreus da escravidão no Egito?', 'Moisés', ['Abraão', 'Davi', 'Salomão', 'Josué', 'Isaque'], 1, icon='scroll',
    src=('pt', 'Moisés', ['Egito']))
c.P('Qual rei de Israel, filho de Davi, é lembrado pela sabedoria e pela construção do Primeiro Templo em Jerusalém?', ['salomao'], 2, icon='crown',
    src=('pt', 'Salomão', ['Templo']))
c.T('Qual a grande estátua com corpo de leão e rosto humano que guarda as pirâmides de Gizé?', 'Esfinge', ['Colosso', 'Quimera', 'Grifo', 'Minotauro', 'Anúbis'], 1, stad='esfinge',
    src=('pt', 'Esfinge de Gizé', ['leão']))
c.T('Em qual cidade egípcia ficam os templos de Karnak e o Vale dos Reis?', 'Luxor (antiga Tebas)', ['Alexandria', 'Mênfis', 'Gizé', 'Assuã', 'Heliópolis'], 3, stad='karnak',
    src=('pt', 'Luxor', ['Karnak']))
c.T('Como os egípcios chamavam a “Casa da Vida”, onde se copiavam textos e se ensinava a escrever?', 'Per-Ankh', ['Pirâmide', 'Serapeu', 'Mastaba', 'Cartela', 'Naos'], 5, icon='book',
    src=('en', 'House of Life', ['Per-Ankh']))
c.T('Qual dessas invenções é atribuída aos antigos egípcios?', 'Calendário solar de 365 dias', ['Pólvora', 'Imprensa', 'Bússola', 'Relógio mecânico', 'Papel de arroz'], 3, icon='hourglass',
    src=('pt', 'Calendário egípcio', ['365']))
c.T('Qual povo conquistou o Egito em 525 a.C. e o incorporou ao seu império?', 'Persas', ['Romanos', 'Gregos', 'Assírios', 'Hititas', 'Babilônios'], 4, icon='crown',
    src=('pt', 'Egito Antigo', ['525 a.C.']))
c.T('Qual cidade fundada por Alexandre, o Grande, tornou-se capital do Egito ptolomaico?', 'Alexandria', ['Mênfis', 'Tebas', 'Gizé', 'Cairo', 'Heliópolis'], 2, icon='ship',
    src=('pt', 'Alexandria', ['Alexandre']), x='A Biblioteca de Alexandria chegou a guardar centenas de milhares de rolos e atraiu sábios de todo o mundo antigo.')
c.T('Qual a última dinastia a governar o Egito Antigo, da qual Cleópatra fez parte?', 'Ptolomaica', ['Ramessida', 'Saíta', 'Persa', 'Tutmósida', 'Hicsa'], 4, icon='crown',
    src=('pt', 'Dinastia ptolomaica', ['Cleópatra']))
c.T('O Código de Hamurabi está gravado em qual material?', 'Basalto', ['Mármore', 'Argila crua', 'Ouro', 'Papiro', 'Madeira'], 4, icon='scroll',
    src=('pt', 'Código de Hamurabi', ['basalto']))
c.T('Qual civilização construiu a cidade de Ur, uma das primeiras do mundo?', 'Sumérios', ['Egípcios', 'Persas', 'Hititas', 'Fenícios', 'Gregos'], 3, icon='pyramid',
    src=('pt', 'Ur', ['sumér']))
c.T('Em que região do mundo surgiram as primeiras cidades e a escrita?', 'Mesopotâmia', ['Vale do Indo', 'China', 'Egito', 'Grécia', 'Mesoamérica'], 2, icon='map',
    src=('pt', 'Mesopotâmia', ['primeiras cidades']))
c.T('Qual título era dado aos escribas do Egito, indispensáveis à administração do Estado?', 'Escribas', ['Vizires', 'Sacerdotes', 'Nomarcas', 'Capatazes', 'Arquitetos'], 3, icon='scroll',
    src=('pt', 'Escriba', ['Egito']))
c.T('Qual constelação ou estrela os egípcios associavam à cheia do Nilo?', 'Sírio', ['Polaris', 'Órion', 'Vega', 'Antares', 'Cruzeiro do Sul'], 5, icon='globe',
    src=('pt', 'Sírius', ['Egito']))
c.T('Como era chamado o vale na margem oeste do Nilo, onde ficam as tumbas de Tutancâmon e Ramsés?', 'Vale dos Reis', ['Vale das Rainhas', 'Vale do Indo', 'Vale da Morte', 'Vale de Gizé', 'Vale dos Nobres'], 3, icon='pyramid',
    src=('pt', 'Vale dos Reis', ['Tutancâmon']))
c.write()

# ───────────────────────── Grécia Antiga ─────────────────────────
c = Cat('grecia', 'Grécia Antiga', '🏛️', 'Da pólis ao Helenismo', '#1F4E8C', order=11)
c.T('Qual cidade grega é considerada o berço da democracia?', 'Atenas', ['Esparta', 'Corinto', 'Tebas', 'Delfos', 'Olímpia'], 1, stad='partenon',
    src=('pt', 'Democracia ateniense', ['Atenas']))
c.T('Qual templo domina a Acrópole de Atenas, dedicado à deusa Atena?', 'Partenon', ['Erecteion', 'Panteão', 'Templo de Zeus', 'Coliseu', 'Pórtico de Átalo'], 1, stad='partenon',
    src=('pt', 'Partenon', ['Atena']), x='O Partenon foi concluído em 432 a.C., na época de Péricles, e sobreviveu a séculos como templo, igreja e mesquita.')
c.P('Qual estadista dominou Atenas na sua Era de Ouro e liderou a construção do Partenon?', ['pericles'], 2, stad='partenon',
    src=('pt', 'Péricles', ['Partenon']))
c.P('Qual rei espartano morreu com seus guerreiros na Batalha das Termópilas, em 480 a.C.?', ['leonidas'], 1, icon='sword',
    src=('pt', 'Leônidas I', ['Termópilas']), x='Os famosos “300” eram a guarda pessoal de Leônidas; milhares de outros gregos lutaram ao lado deles.')
c.C('Qual cidade-Estado grega educava seus meninos desde os sete anos para a vida militar?', 'esparta', 1, icon='sword',
    src=('pt', 'Esparta', ['agogê']))
c.T('Quais povos se enfrentaram nas Guerras Médicas?', 'Gregos e persas', ['Gregos e romanos', 'Persas e egípcios', 'Atenienses e fenícios', 'Gregos e cartagineses', 'Macedônios e hititas'], 2, icon='sword',
    src=('pt', 'Guerras greco-persas', ['persas']))
c.T('Em que batalha de 490 a.C. os atenienses derrotaram os persas, dando nome a uma corrida de longa distância?', 'Maratona', ['Salamina', 'Plateias', 'Termópilas', 'Egospótamos', 'Queroneia'], 2, icon='sword',
    src=('pt', 'Batalha de Maratona', ['490 a.C.']), x='Segundo a lenda, um mensageiro correu de Maratona a Atenas para anunciar a vitória — e caiu morto de exaustão.')
c.P('Qual filósofo ateniense foi condenado a beber cicuta, em 399 a.C.?', ['socrates'], 1, icon='bust',
    src=('pt', 'Sócrates', ['cicuta']))
c.P('Qual filósofo, discípulo de Sócrates, fundou a Academia e escreveu A República?', ['platao'], 2, icon='book',
    src=('pt', 'Platão', ['Academia']))
c.P('Qual filósofo foi tutor de Alexandre, o Grande, e fundou o Liceu?', ['aristoteles'], 2, icon='book',
    src=('pt', 'Aristóteles', ['Alexandre']))
c.P('Qual matemático grego dá nome a um célebre teorema sobre triângulos retângulos?', ['pitagoras'], 1, icon='book',
    src=('pt', 'Pitágoras', ['teorema']))
c.P('Qual médico grego é chamado “pai da Medicina” e dá nome a um juramento?', ['hipocrates'], 2, icon='book',
    src=('pt', 'Hipócrates', ['juramento']))
c.P('Qual matemático de Siracusa teria gritado “Eureka!” ao descobrir o princípio do empuxo?', ['arquimedes'], 2, icon='gear',
    src=('pt', 'Arquimedes', ['Eureka']))
c.P('Qual autor dos Elementos é chamado “pai da Geometria”?', ['euclides'], 3, icon='book',
    src=('pt', 'Euclides', ['Elementos']))
c.P('Qual poeta é tradicionalmente apontado como autor da Ilíada e da Odisseia?', ['homero'], 2, icon='book',
    src=('pt', 'Homero', ['Ilíada']))
c.P('Qual dramaturgo ateniense escreveu Édipo Rei?', ['sofocles'], 3, icon='scroll',
    src=('pt', 'Sófocles', ['Édipo']))
c.P('Qual historiador grego é chamado “pai da História” por suas Histórias sobre as Guerras Médicas?', ['herodoto'], 3, icon='book',
    src=('pt', 'Heródoto', ['Guerras']))
c.T('Qual a cidade grega que sediava os jogos em honra a Zeus, a cada quatro anos?', 'Olímpia', ['Atenas', 'Delfos', 'Corinto', 'Esparta', 'Micenas'], 2, icon='trophy',
    src=('pt', 'Olímpia (Grécia)', ['Zeus']), x='Os Jogos Olímpicos da Antiguidade começaram em 776 a.C. e duraram mais de mil anos, até serem proibidos em 393 d.C.')
c.T('Em qual cidade grega ficava o famoso oráculo consultado antes de grandes decisões?', 'Delfos', ['Olímpia', 'Atenas', 'Esparta', 'Tebas', 'Corinto'], 2, icon='column',
    src=('pt', 'Oráculo de Delfos', ['Apolo']))
c.T('Como se chamavam as cidades-Estado gregas, independentes entre si?', 'Pólis', ['Satrapias', 'Províncias', 'Feudos', 'Nomos', 'Colônias'], 2, icon='column',
    src=('pt', 'Pólis', ['cidade-Estado']))
c.T('Como os gregos chamavam o espaço público central da cidade, para o comércio e o debate?', 'Ágora', ['Acrópole', 'Pórtico', 'Teatro', 'Fórum', 'Estádio'], 2, icon='column',
    src=('pt', 'Ágora', ['praça']))
c.T('Qual a guerra entre Atenas e Esparta e seus aliados, entre 431 e 404 a.C.?', 'Guerra do Peloponeso', ['Guerra de Troia', 'Guerras Médicas', 'Guerras Púnicas', 'Guerra Sagrada', 'Guerra de Corinto'], 2, icon='sword',
    src=('pt', 'Guerra do Peloponeso', ['Esparta']))
c.T('Qual guerra mitológica, narrada por Homero, teria sido causada pelo rapto de Helena?', 'Guerra de Troia', ['Guerra do Peloponeso', 'Guerra de Corinto', 'Guerra Médica', 'Guerra de Tebas', 'Guerra de Creta'], 1, icon='sword',
    src=('pt', 'Guerra de Troia', ['Helena']))
c.T('Qual civilização anterior à Grécia clássica construiu o palácio de Cnossos, em Creta?', 'Minoica', ['Micênica', 'Fenícia', 'Hitita', 'Dórica', 'Etrusca'], 4, icon='column',
    src=('pt', 'Civilização minoica', ['Cnossos']))
c.T('Qual rei macedônio, pai de Alexandre, unificou a Grécia após a Batalha de Queroneia?', 'Filipe II', ['Filipe V', 'Pirro', 'Cassandro', 'Perseu', 'Antígono'], 3, icon='crown',
    src=('pt', 'Filipe II da Macedônia', ['Queroneia']))
c.P('Qual rei da Macedônia criou, em pouco mais de uma década, um império do Egito à Índia?', ['alexandre'], 1, icon='sword',
    src=('pt', 'Alexandre, o Grande', ['Índia']))
c.T('Como se chama o período da cultura grega espalhada pelo mundo após as conquistas de Alexandre?', 'Helenístico', ['Clássico', 'Arcaico', 'Homérico', 'Micênico', 'Bizantino'], 3, icon='globe',
    src=('pt', 'Período helenístico', ['Alexandre']))
c.T('Qual o nome do cavalo de Alexandre, o Grande?', 'Bucéfalo', ['Pégaso', 'Incitatus', 'Bayard', 'Marengo', 'Sleipnir'], 3, icon='sword',
    src=('pt', 'Bucéfalo', ['Alexandre']))
c.T('Qual o regime político de Atenas, em que os cidadãos votavam as leis na assembleia?', 'Democracia', ['Monarquia', 'Oligarquia', 'Tirania', 'Teocracia', 'Aristocracia'], 1, icon='column',
    src=('pt', 'Democracia ateniense', ['assembleia']))
c.T('Quem NÃO podia votar na democracia ateniense?', 'Mulheres, escravos e estrangeiros', ['Camponeses', 'Soldados', 'Comerciantes ricos', 'Artesãos', 'Marinheiros'], 3, icon='column',
    src=('pt', 'Democracia ateniense', ['mulheres']))
c.T('Qual a maior das ilhas gregas, sede da civilização minoica?', 'Creta', ['Rodes', 'Corfu', 'Naxos', 'Samos', 'Lesbos'], 3, icon='map',
    src=('pt', 'Creta', ['minoica']))
c.T('Qual o nome da fortaleza elevada de Atenas, onde fica o Partenon?', 'Acrópole', ['Ágora', 'Pnyx', 'Areópago', 'Cidadela de Tebas', 'Lícabeto'], 2, stad='partenon',
    src=('pt', 'Acrópole de Atenas', ['Partenon']))
c.T('Qual obra de Homero narra a volta de Odisseu para casa depois da Guerra de Troia?', 'Odisseia', ['Ilíada', 'Eneida', 'Argonáuticas', 'Teogonia', 'Os Trabalhos e os Dias'], 2, icon='book',
    src=('pt', 'Odisseia', ['Odisseu']))
c.T('Qual formação militar grega de soldados com escudos e lanças, lado a lado, era a base dos exércitos das pólis?', 'Falange', ['Legião', 'Testudo', 'Coorte', 'Esquadrão', 'Cunha'], 3, icon='sword',
    src=('pt', 'Falange', ['hoplita']))
c.T('Qual poeta grega da ilha de Lesbos ficou conhecida pelos versos líricos sobre o amor?', 'Safo', ['Hipácia', 'Aspásia', 'Corina', 'Erina', 'Safira'], 4, icon='book',
    src=('pt', 'Safo', ['Lesbos']))
c.T('Qual civilização grega arcaica de Micenas foi lembrada nos poemas de Homero?', 'Micênica', ['Minoica', 'Dórica', 'Jônica', 'Etrusca', 'Fenícia'], 4, icon='column',
    src=('pt', 'Civilização micênica', ['Micenas']))
c.T('Qual das Sete Maravilhas do Mundo Antigo ficava na ilha de Rodes?', 'O Colosso', ['O Farol', 'O Mausoléu', 'O Templo de Ártemis', 'A Estátua de Zeus', 'Os Jardins Suspensos'], 4, icon='column',
    src=('pt', 'Colosso de Rodes', ['Rodes']))
c.T('Em que século a.C. viveram Sócrates, Platão e Péricles, no auge de Atenas?', 'V e IV a.C.', ['VIII e VII a.C.', 'III e II a.C.', 'I a.C. e I d.C.', 'X e IX a.C.', 'VI e V d.C.'], 3, icon='hourglass',
    src=('pt', 'Atenas', ['século V a.C.']))
c.write()
