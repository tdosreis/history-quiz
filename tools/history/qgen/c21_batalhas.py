"""Batalhas: two banners, one side hidden — famous battles and sieges of every
era and continent, none of them already on a strip elsewhere in the bank."""
from qdsl import Cat

c = Cat('batalhas', 'Batalhas', '⚔️', 'Duas bandeiras, um lado escondido', '#8C2F2F', order=63)

# ── d1 ──
c.BT('Qual rei macedônio venceu esta batalha, decisiva para a sua conquista do Oriente?', 'alexandre', 'Gaugamela · 331 a.C.', '?', 'persia', d=1, typ='player',
     x='O rei derrotado fugiu do campo e, no ano seguinte, foi assassinado por um de seus próprios sátrapas.',
     src=('en', 'Battle of Gaugamela', ['Darius', '331']))
c.BT('Qual país tomou esta capital, levando ao fim da guerra na Europa?', 'urss', 'Berlim · 1945', 'alemanha_nazista', '?', d=1,
     x='O líder do país derrotado se matou num abrigo subterrâneo enquanto a batalha acontecia.',
     src=('en', 'Battle of Berlin', ['Reichstag', 'Soviet']))
c.BT('Qual país comandou o cerco a esta cidade soviética, que durou quase 900 dias?', 'alemanha_nazista', 'Leningrado · 1941–1944', 'urss', '?', d=1,
     x='Centenas de milhares de civis morreram de fome e frio; a comida chegava por uma estrada sobre um lago congelado.',
     src=('en', 'Siege of Leningrad', ['872', 'Ladoga']))
c.BT('Qual país desembarcou tropas nesta ilha, numa batalha eternizada pela foto de uma bandeira sendo hasteada?', 'estados_unidos', 'Iwo Jima · 1945', '?', 'imperio_japones', d=1,
     x='A famosa foto foi tirada no alto do monte Suribachi, o ponto mais elevado da ilha.',
     src=('en', 'Battle of Iwo Jima', ['Suribachi', '1945']))
c.BT('Quem os franceses e os britânicos detiveram nesta batalha, a poucas dezenas de quilômetros de Paris?', 'Alemanha', 'Marne · 1914', 'França e Reino Unido', '?', d=1, typ='txt',
     wrong=['Áustria-Hungria', 'Império Otomano', 'Itália', 'Bulgária', 'Rússia'],
     x='Táxis de Paris ajudaram a levar soldados de reforço para a frente de batalha.',
     src=('en', 'First Battle of the Marne', ['taxi', '1914']))
c.BT('Qual conquistador espanhol capturou o imperador inca nesta emboscada?', 'pizarro', 'Cajamarca · 1532', '?', 'inca', d=1, typ='player',
     x='Preso, o soberano ofereceu encher um grande cômodo de ouro, e o dobro em prata, em troca da liberdade.',
     src=('en', 'Battle of Cajamarca', ['Pizarro', 'Atahualpa']))
c.BT('Qual conquistador espanhol comandou o cerco a esta cidade, com milhares de aliados indígenas?', 'cortes', 'Tenochtitlán · 1521', '?', 'asteca', d=1, typ='player',
     x='Sobre as ruínas da cidade, erguida numa ilha no meio de um lago, nasceu a atual Cidade do México.',
     src=('en', 'Fall of Tenochtitlan', ['Cortés', '1521']))
c.BT('Contra quem os milicianos coloniais lutaram nestes primeiros combates da Revolução Americana?', 'Britânicos', 'Lexington e Concord · 1775', 'Milícias coloniais', '?', d=1, typ='txt',
     wrong=['Franceses', 'Espanhóis', 'Holandeses', 'Russos', 'Mexicanos'],
     x='Um poema de Ralph Waldo Emerson chamou o disparo dos milicianos na ponte de Concord de "o tiro ouvido ao redor do mundo".',
     src=('en', 'Battles of Lexington and Concord', ['1775', 'Emerson']))
c.BT('Qual reino conquistou esta cidade do norte da África, dando início à sua expansão ultramarina?', 'Portugal', 'Ceuta · 1415', '?', 'Sultanato Merínida', d=1, typ='txt',
     wrong=['Castela', 'Aragão', 'Inglaterra', 'França', 'Veneza'],
     x='A cidade fica na margem africana do estreito de Gibraltar, passagem entre o Atlântico e o Mediterrâneo.',
     src=('en', 'Conquest of Ceuta', ['1415', 'Marinid']))
c.BT('Qual guerrilheiro argentino comandou os rebeldes nesta batalha decisiva da Revolução Cubana?', 'che', 'Santa Clara · 1958', '?', 'Exército de Batista', d=1, typ='player',
     x='O trem blindado que os rebeldes fizeram descarrilar virou monumento na cidade.',
     src=('en', 'Battle of Santa Clara', ['Guevara', '1958']))

# ── d2 ──
c.BT('Quem saqueou esta cidade, pondo fim ao Califado Abássida?', 'imperio_mongol', 'Bagdá · 1258', '?', 'califado_abassida', d=2,
     x='Conta-se que as águas do rio Tigre ficaram escuras com a tinta dos livros jogados nelas.',
     src=('en', 'Siege of Baghdad (1258)', ['Hulagu', 'Abbasid']))
c.BT('Quem controlava esta cidade antes de ela ser conquistada por D. Afonso Henriques?', 'Mouros', 'Lisboa · 1147', 'portugal', '?', d=2, typ='txt',
     wrong=['Castelhanos', 'Leoneses', 'Normandos', 'Vikings', 'Bizantinos'],
     x='Cruzados ingleses, flamengos e alemães, de passagem a caminho da Terra Santa, ajudaram no cerco.',
     src=('en', 'Siege of Lisbon', ['Afonso', '1147']))
c.BT('Quem conquistou esta cidade, o último reduto muçulmano na Península Ibérica?', 'Reis Católicos', 'Granada · 1492', '?', 'Emirado de Granada', d=2, typ='txt',
     wrong=['Almorávidas', 'Portugueses', 'Franceses', 'Otomanos', 'Almóadas'],
     x='Ao se render, em 2 de janeiro, o último emir entregou as chaves da cidade aos vencedores.',
     src=('en', 'Granada War', ['Granada', '1492']))
c.BT('Contra quem as tropas comandadas por Caxias lutaram nesta batalha?', 'Paraguai', 'Avaí · 1868', 'imperio_brasil', '?', d=2, typ='txt',
     wrong=['Argentina', 'Uruguai', 'Bolívia', 'Chile', 'Peru'],
     x='Pedro Américo retratou o combate numa tela gigantesca, uma das maiores pinturas históricas do Brasil.',
     src=('pt', 'Batalha do Avaí', ['1868', 'Caxias']))
c.BT('Contra quem as tropas brasileiras lutaram nesta batalha da guerra de independência na Bahia?', 'Portugueses', 'Pirajá · 1822', 'Brasileiros', '?', d=2, typ='txt',
     wrong=['Holandeses', 'Franceses', 'Espanhóis', 'Paraguaios', 'Argentinos'],
     x='Segundo a tradição, um corneteiro tocou "avançar" em vez de "recuar" e mudou o rumo do combate.',
     src=('en', 'Battle of Pirajá', ['Pirajá', '1822']))
c.BT('Qual líder comandou os patriotas que venceram esta batalha, decisiva para a independência da atual Colômbia?', 'bolivar', 'Boyacá · 1819', '?', 'Realistas espanhóis', d=2, typ='player',
     x='Três dias depois da vitória, os vencedores entraram em Bogotá, abandonada pelo vice-rei.',
     src=('en', 'Battle of Boyacá', ['Bolívar', '1819']))
c.BT('Qual país tomou esta missão fortificada, defendida por rebeldes texanos?', 'México', 'Álamo · 1836', '?', 'Texanos', d=2, typ='txt',
     wrong=['Espanha', 'Estados Unidos', 'França', 'Reino Unido', 'Cuba'],
     x='"Lembrem-se do Álamo!" virou o grito de guerra dos texanos poucas semanas depois.',
     src=('en', 'Battle of the Alamo', ['Santa Anna', '1836']))
c.BT('Quem bombardeou este forte, dando início à Guerra de Secessão?', 'Confederados', 'Forte Sumter · 1861', '?', 'União', d=2, typ='txt',
     wrong=['Britânicos', 'Mexicanos', 'Franceses', 'Espanhóis', 'Seminoles'],
     x='O bombardeio durou cerca de 34 horas, e a guarnição se rendeu sem nenhuma morte em combate.',
     src=('en', 'Battle of Fort Sumter', ['Confederate', '1861']))
c.BT('Qual país organizou esta retirada por mar, com a ajuda de centenas de barcos civis?', 'Reino Unido', 'Dunquerque · 1940', '?', 'alemanha_nazista', d=2, typ='txt',
     wrong=['Estados Unidos', 'União Soviética', 'Canadá', 'Itália', 'Japão'],
     x='A operação de resgate recebeu o codinome de Operação Dínamo.',
     src=('en', 'Dunkirk evacuation', ['Dynamo', '1940']))
c.BT('Contra quem a Alemanha lançou esta ofensiva, palco de uma das maiores batalhas de tanques da história?', 'urss', 'Kursk · 1943', 'alemanha_nazista', '?', d=2,
     x='A ofensiva, de codinome Operação Cidadela, foi suspensa depois de pouco mais de uma semana.',
     src=('en', 'Battle of Kursk', ['Citadel', '1943']))
c.BT('Quem derrotou esta invasão de exilados treinados pela CIA?', 'cuba', 'Baía dos Porcos · 1961', '?', 'Brigada 2506', d=2,
     x='O fracasso foi um vexame para o governo Kennedy, que tinha assumido apenas três meses antes.',
     src=('en', 'Bay of Pigs Invasion', ['Brigade 2506', 'Kennedy']))
c.BT('Quem tomou esta cidade e destruiu o Segundo Templo?', 'imperio_romano', 'Jerusalém · 70 d.C.', 'Rebeldes judeus', '?', d=2,
     x='O Muro das Lamentações é parte da antiga muralha de contenção da esplanada do templo destruído.',
     src=('en', 'Siege of Jerusalem (70 CE)', ['Titus', 'Temple']))
c.BT('Quem lançou esta ofensiva-surpresa durante o feriado do Ano-Novo lunar?', 'Vietnã do Norte e vietcongues', 'Ofensiva do Tet · 1968', '?', 'Vietnã do Sul e EUA', d=2, typ='txt',
     wrong=['Khmer Vermelho', 'China', 'União Soviética', 'Coreia do Norte', 'Pathet Lao'],
     x='Militarmente foi um revés para os atacantes, mas abalou o apoio da opinião pública americana à guerra.',
     src=('en', 'Tet Offensive', ['Viet Cong', '1968']))
c.BT('Qual reino foi derrotado pelos escoceses de Robert Bruce nesta batalha?', 'inglaterra', 'Bannockburn · 1314', 'Reino da Escócia', '?', d=2,
     x='A independência escocesa acabou reconhecida num tratado assinado em 1328.',
     src=('en', 'Battle of Bannockburn', ['Bruce', '1314']))
c.BT('Quem a aliança de romanos e visigodos deteve nesta batalha, na Gália?', 'Hunos', 'Campos Cataláunicos · 451', 'Romanos e visigodos', '?', d=2, typ='txt',
     wrong=['Vândalos', 'Lombardos', 'Ávaros', 'Magiares', 'Vikings'],
     x='O rei dos visigodos, Teodorico I, morreu em combate, mas seu exército saiu vitorioso.',
     src=('en', 'Battle of the Catalaunian Plains', ['Attila', '451']))
c.BT('Quem foi derrotado por Júlio César nesta batalha decisiva da guerra civil romana?', 'Pompeu', 'Farsalos · 48 a.C.', 'Júlio César', '?', d=2, typ='txt',
     wrong=['Crasso', 'Marco Antônio', 'Catilina', 'Espártaco', 'Vercingetórix'],
     x='O derrotado fugiu para o Egito, onde foi assassinado ao chegar, a mando do jovem rei Ptolomeu XIII.',
     src=('en', 'Battle of Pharsalus', ['Pompey', '48 BC']))
c.BT('Qual rei inglês comandou os cruzados nesta vitória sobre as tropas de Saladino?', 'ricardo', 'Arsuf · 1191', '?', 'ayubida', d=2, typ='player',
     x='Os dois líderes nunca se encontraram pessoalmente, embora tenham negociado uma trégua no ano seguinte.',
     src=('en', 'Battle of Arsuf', ['Richard', 'Saladin']))
c.BT('Qual reino perdeu esta batalha para os arqueiros ingleses?', 'França', 'Crécy · 1346', 'inglaterra', '?', d=2, typ='txt',
     wrong=['Escócia', 'Castela', 'Portugal', 'Aragão', 'Flandres'],
     x='Eduardo, o Príncipe Negro, então com apenas 16 anos, comandou uma das alas do exército vencedor.',
     src=('en', 'Battle of Crécy', ['longbow', '1346']))

# ── d3 ──
c.BT('Qual cidade, aliada de Tebas, foi derrotada pelos macedônios nesta batalha?', 'atenas', 'Queroneia · 338 a.C.', 'macedonia', '?', d=3,
     x='O príncipe herdeiro do lado vencedor, então com 18 anos, comandou a cavalaria.',
     src=('en', 'Battle of Chaeronea (338 BC)', ['Philip', 'Athens']))
c.BT('Quem Constantino enfrentou nesta batalha às portas de Roma, depois de, segundo a tradição, ver um sinal no céu?', 'Maxêncio', 'Ponte Mílvia · 312', 'Constantino I', '?', d=3, typ='txt',
     wrong=['Licínio', 'Diocleciano', 'Galério', 'Maximiano', 'Teodósio'],
     x='O derrotado morreu afogado no rio Tibre durante a fuga.',
     src=('en', 'Battle of the Milvian Bridge', ['Maxentius', '312']))
c.BT('Qual império não conseguiu tomar esta ilha, defendida pelos Cavaleiros Hospitalários?', 'imperio_otomano', 'Malta · 1565', 'Cavaleiros Hospitalários', '?', d=3,
     x='Os defensores resistiram por quase quatro meses, até a chegada de reforços vindos da Sicília.',
     src=('en', 'Great Siege of Malta', ['Hospitaller', '1565']))
c.BT('Qual reino perdeu nesta batalha o posto de grande potência do norte da Europa?', 'suecia', 'Poltava · 1709', 'Czarado da Rússia', '?', d=3,
     x='O rei derrotado fugiu para o Império Otomano, onde passou os cinco anos seguintes.',
     src=('en', 'Battle of Poltava', ['Charles XII', '1709']))
c.BT('Quem foi derrotado nesta batalha, também conhecida como Batalha das Nações?', 'imperio_frances', 'Leipzig · 1813', 'Sexta Coalizão', '?', d=3,
     x='Mais de 500 mil soldados lutaram nela, a maior batalha da Europa até a Primeira Guerra Mundial.',
     src=('en', 'Battle of Leipzig', ['Nations', '1813']))
c.BT('Quem atravessou os Andes com seu exército e venceu esta batalha, decisiva para a independência do Chile?', 'san_martin', 'Chacabuco · 1817', '?', 'Realistas espanhóis', d=3, typ='player',
     x="O chileno Bernardo O'Higgins comandou uma das divisões e depois governou o país.",
     src=('en', 'Battle of Chacabuco', ['San Martín', '1817']))
c.BT('Contra quem a Brigada Ligeira britânica fez sua desastrosa carga nesta batalha?', 'imperio_russo', 'Balaclava · 1854', 'reino_unido', '?', d=3,
     x='Um poema de Tennyson eternizou a carga, provocada por uma ordem mal compreendida.',
     src=('en', 'Battle of Balaclava', ['Light Brigade', '1854']))
c.BT('Qual império perdeu sua frota nesta batalha, que abriu caminho para a independência da Grécia?', 'imperio_otomano', 'Navarino · 1827', 'Reino Unido, França e Rússia', '?', d=3,
     x='Foi a última grande batalha naval travada só com navios a vela.',
     src=('en', 'Battle of Navarino', ['1827', 'Ottoman']))
c.BT('Qual governante argentino foi derrubado depois de perder esta batalha?', 'Juan Manuel de Rosas', 'Caseros · 1852', 'Brasil, Uruguai e Entre Ríos', '?', d=3, typ='txt',
     wrong=['Bartolomé Mitre', 'Domingo Sarmiento', 'Justo José de Urquiza', 'Manuel Belgrano', 'Juan Perón'],
     x='O derrotado partiu para o exílio na Inglaterra, onde viveu até morrer, em 1877.',
     src=('en', 'Battle of Caseros', ['Rosas', '1852']))
c.BT('Qual país teve sua frota destruída pelos americanos nesta batalha, nas Filipinas?', 'Espanha', 'Baía de Manila · 1898', 'USA', '?', d=3, typ='txt',
     wrong=['Japão', 'Reino Unido', 'Alemanha', 'França', 'Portugal'],
     x='Os vencedores não tiveram nenhum morto em combate.',
     src=('en', 'Battle of Manila Bay', ['Dewey', '1898']))
c.BT('Qual país perdeu um de seus navios mais modernos depois desta batalha, perto do Uruguai?', 'alemanha_nazista', 'Rio da Prata · 1939', 'reino_unido', '?', d=3,
     x='Avariado, o navio buscou abrigo em Montevidéu e depois foi afundado pela própria tripulação.',
     src=('en', 'Battle of the River Plate', ['Graf Spee', 'Montevideo']))
c.BT('Quem venceu esta batalha no pampa gaúcho, contra as tropas do governo imperial?', 'Farroupilhas', 'Seival · 1836', '?', 'imperio_brasil', d=3, typ='txt',
     wrong=['Cabanos', 'Balaios', 'Sabinos', 'Praieiros', 'Maragatos'],
     x='No dia seguinte à vitória, os vencedores proclamaram uma república independente.',
     src=('en', 'Battle of Seival', ['Seival', '1836']))
c.BT('Qual rei comandava o exército derrotado nesta batalha da Guerra Civil Inglesa?', 'Carlos I', 'Naseby · 1645', 'Parlamentaristas', '?', d=3, typ='txt',
     wrong=['Jaime I', 'Jaime II', 'Henrique VIII', 'Guilherme III', 'Ricardo III'],
     x='Cartas secretas do rei, capturadas no campo de batalha, foram publicadas pelos vencedores.',
     src=('en', 'Battle of Naseby', ['Charles I', '1645']))
c.BT('Contra quem a Marinha Real britânica travou esta batalha, a maior batalha naval da Primeira Guerra?', 'imperio_alemao', 'Jutlândia · 1916', 'reino_unido', '?', d=3,
     x='Os britânicos perderam mais navios, mas a frota inimiga quase não voltou a deixar o porto.',
     src=('en', 'Battle of Jutland', ['Jellicoe', '1916']))
c.BT('Quem invadiu a Inglaterra e foi derrotado nesta batalha, semanas antes de Hastings?', 'Noruegueses', 'Stamford Bridge · 1066', 'inglaterra', '?', d=3, typ='txt',
     wrong=['Normandos', 'Suecos', 'Francos', 'Bretões', 'Galeses'],
     x='O irmão rebelde do rei inglês lutou ao lado dos invasores e morreu na batalha.',
     src=('en', 'Battle of Stamford Bridge', ['Hardrada', 'Tostig']))
c.BT('Quem controlava esta cidade portuária, retomada num ousado desembarque anfíbio comandado por MacArthur?', 'Coreia do Norte', 'Inchon · 1950', 'Forças da ONU', '?', d=3, typ='txt',
     wrong=['China', 'União Soviética', 'Japão', 'Coreia do Sul', 'Vietnã do Norte'],
     x='O desembarque virou o rumo da guerra, e Seul foi retomada cerca de duas semanas depois.',
     src=('en', 'Battle of Inchon', ['MacArthur', '1950']))

# ── d4 ──
c.BT('Qual cidade-Estado perdeu nesta batalha a fama de invencível em terra?', 'esparta', 'Leuctra · 371 a.C.', 'Tebas', '?', d=4,
     x='O general vencedor, Epaminondas, concentrou suas tropas numa ala de profundidade fora do comum.',
     src=('en', 'Battle of Leuctra', ['Epaminondas', '371']))
c.BT('Qual rei indiano enfrentou o exército de Alexandre nesta batalha, com elefantes de guerra?', 'Poro', 'Hidaspes · 326 a.C.', 'macedonia', '?', d=4, typ='txt',
     wrong=['Chandragupta Máuria', 'Ashoka', 'Bindusara', 'Dhana Nanda', 'Kanishka'],
     x='Impressionado com a coragem do rei derrotado, o vencedor o manteve no trono como aliado.',
     src=('en', 'Battle of the Hydaspes', ['Porus', '326']))
c.BT('Quem destruiu o exército de Crasso nesta batalha, na Mesopotâmia?', 'Partos', 'Carras · 53 a.C.', 'republica_romana', '?', d=4, typ='txt',
     wrong=['Persas sassânidas', 'Selêucidas', 'Citas', 'Gauleses', 'Germanos'],
     x='As águias das legiões perdidas só voltaram a Roma em 20 a.C., num acordo negociado por Augusto.',
     src=('en', 'Battle of Carrhae', ['Crassus', 'Parthian']))
c.BT('Qual império perdeu a Síria depois desta derrota para os exércitos árabes?', 'bizancio', 'Yarmuk · 636', 'Califado Rashidun', '?', d=4,
     x='A batalha durou seis dias, às margens de um afluente do rio Jordão.',
     src=('en', 'Battle of the Yarmuk', ['Rashidun', '636']))
c.BT('Qual império da África Ocidental nasceu desta vitória sobre o reino de Sosso?', 'mali', 'Kirina · c. 1235', '?', 'Reino de Sosso', d=4,
     x='A história da batalha é contada até hoje pelos griôs, os contadores de histórias da região.',
     src=('en', 'Battle of Kirina', ['Sundiata', 'Sosso']))
c.BT('Qual ordem militar foi derrotada por poloneses e lituanos nesta batalha?', 'Ordem Teutônica', 'Grunwald · 1410', 'Polônia e Lituânia', '?', d=4, typ='txt',
     wrong=['Templários', 'Hospitalários', 'Ordem de Avis', 'Ordem de Calatrava', 'Ordem de Santiago'],
     x='O grão-mestre da ordem morreu em combate, junto com boa parte de seus cavaleiros.',
     src=('en', 'Battle of Grunwald', ['Teutonic', '1410']))
c.BT('Quem o príncipe de Moscou, Dmitri Donskoi, derrotou nesta batalha?', 'Horda de Ouro', 'Kulikovo · 1380', 'Grão-Principado de Moscou', '?', d=4, typ='txt',
     wrong=['Canato da Crimeia', 'Canato de Kazan', 'Império Otomano', 'Ordem Teutônica', 'Reino da Polônia'],
     x='A vitória não encerrou o domínio estrangeiro sobre a Rússia, que só terminou em 1480.',
     src=('en', 'Battle of Kulikovo', ['Golden Horde', '1380']))
c.BT('Qual reino europeu venceu esta batalha naval, que abriu caminho para o seu domínio do oceano Índico?', 'Portugal', 'Diu · 1509', '?', 'Mamelucos e aliados indianos', d=4, typ='txt',
     wrong=['Espanha', 'Veneza', 'Inglaterra', 'Holanda', 'França'],
     x='O vice-rei vencedor queria vingar a morte do filho, morto pela mesma coalizão um ano antes.',
     src=('en', 'Battle of Diu', ['Almeida', '1509']))
c.BT('Qual sultão indiano morreu defendendo esta fortaleza contra os britânicos?', 'Tipu Sultan', 'Seringapatam · 1799', 'Britânicos', '?', d=4, typ='txt',
     wrong=['Haidar Ali', 'Siraj ud-Daulah', 'Aurangzeb', 'Bahadur Shah II', 'Ranjit Singh'],
     x='Um dos oficiais do cerco era Arthur Wellesley, que anos depois venceria Napoleão em Waterloo.',
     src=('en', 'Siege of Seringapatam (1799)', ['Tipu', 'Wellesley']))
c.BT('Quem o exército anglo-egípcio derrotou nesta batalha, no Sudão?', 'Mahdistas', 'Omdurman · 1898', 'Anglo-egípcios', '?', d=4, typ='txt',
     wrong=['Zulus', 'Bôeres', 'Axântis', 'Etíopes', 'Ndebeles'],
     x='O jovem Winston Churchill participou de uma carga de cavalaria nesta batalha.',
     src=('en', 'Battle of Omdurman', ['Mahdist', 'Churchill']))
c.BT('Quem a Polônia deteve às portas de sua capital nesta batalha?', 'Exército Vermelho', 'Varsóvia · 1920', 'POL', '?', d=4, typ='txt',
     wrong=['Exército Branco', 'Exército austro-húngaro', 'Exército prussiano', 'Wehrmacht', 'Exército sueco'],
     x='Os poloneses chamam a vitória de "Milagre do Vístula".',
     src=('en', 'Battle of Warsaw (1920)', ['Vistula', 'Red Army']))
c.BT('Qual movimento rebelde perdeu sua capital neste cerco, que pôs fim a uma das guerras mais mortíferas do século XIX?', 'Taipings', 'Nanquim · 1864', 'qing', '?', d=4, typ='txt',
     wrong=['Boxers', 'Turbantes Amarelos', 'Lótus Branco', 'Kuomintang', 'Guardas Vermelhos'],
     x='A cidade caiu em julho, semanas depois da morte do líder rebelde.',
     src=('en', 'Taiping Rebellion', ['Nanjing', '1864']))

# ── d5 ──
c.BT('Qual dos Reinos Combatentes esmagou o exército de Zhao nesta batalha, na China?', 'Qin', 'Changping · 260 a.C.', 'Reino de Zhao', '?', d=5, typ='txt',
     wrong=['Chu', 'Qi', 'Yan', 'Wei', 'Han'],
     x='Segundo as crônicas antigas, o vencedor mandou executar a maior parte dos soldados que se renderam.',
     src=('en', 'Battle of Changping', ['Zhao', 'Qin']))
c.BT('Quem foi derrotado pelas cidades da Liga Lombarda nesta batalha?', 'sacro_imperio', 'Legnano · 1176', 'Liga Lombarda', '?', d=5,
     x='O comandante derrotado caiu do cavalo durante a luta e chegou a ser dado como morto.',
     src=('en', 'Battle of Legnano', ['Barbarossa', '1176']))
c.BT('Qual clã teve sua célebre cavalaria destruída pelos arcabuzeiros inimigos nesta batalha?', 'Clã Takeda', 'Nagashino · 1575', 'Clãs Oda e Tokugawa', '?', d=5, typ='txt',
     wrong=['Clã Mōri', 'Clã Hōjō', 'Clã Uesugi', 'Clã Shimazu', 'Clã Imagawa'],
     x='Os atiradores ficaram protegidos atrás de paliçadas de madeira, à beira de um riacho.',
     src=('en', 'Battle of Nagashino', ['Takeda', 'arquebus']))
c.BT('Qual reino africano perdeu seu rei nesta batalha contra os portugueses?', 'Reino do Congo', 'Mbwila · 1665', 'portugal', '?', d=5, typ='txt',
     wrong=['Reino do Ndongo', 'Reino de Matamba', 'Império Monomotapa', 'Reino do Daomé', 'Império Axânti'],
     x='Depois da derrota, o reino mergulhou em décadas de guerras civis.',
     src=('en', 'Battle of Mbwila', ['Kongo', '1665']))
c.BT('Qual país tomou este morro fortificado do Peru na Guerra do Pacífico?', 'Chile', 'Morro de Arica · 1880', 'PER', '?', d=5, typ='txt',
     wrong=['Bolívia', 'Argentina', 'Equador', 'Colômbia', 'Brasil'],
     x='O coronel Francisco Bolognesi morreu na defesa e virou herói nacional peruano.',
     src=('en', 'Battle of Arica', ['Bolognesi', '1880']))

c.write()
