"""Manchetes (front pages of famous days, 1750-2000: ask the year or who is in it)
and Fato ou mito? (popular misconceptions and surprising true facts)."""
from qdsl import Cat

Y = 'Em que ano saiu esta manchete?'

# ── Manchetes ── the front page of the day
c = Cat('manchetes', 'Manchetes', '📰', 'A primeira página do dia', '#37474F', order=66)

# d1
c.NW(Y, '1822', 'Brasil rompe com Portugal e declara sua independência', 1, paper='Diário do Rio',
     sub='Às margens do riacho Ipiranga, em São Paulo, o príncipe regente proclama o fim dos laços com Lisboa',
     wrong=['1808', '1815', '1817', '1821', '1824'], src=('pt', 'Independência do Brasil', ['1822']),
     x='Dom Pedro foi aclamado imperador em 12 de outubro daquele ano e coroado em 1º de dezembro, no Rio de Janeiro.')
c.NW(Y, '1950', 'Uruguai vence no Maracanã e fica com a Copa do Mundo', 1, paper='Diário Esportivo',
     sub='Diante de cerca de 200 mil pessoas, a seleção brasileira perde de virada, por 2 a 1, o jogo decisivo',
     wrong=['1938', '1954', '1958', '1962', '1966'], src=('pt', 'Copa do Mundo FIFA de 1950', ['Ghiggia']),
     x='O gol da virada foi de Alcides Ghiggia, a 11 minutos do fim; a derrota ficou conhecida como Maracanaço.')
c.NW(Y, '1970', 'Brasil é tricampeão e fica com a Taça Jules Rimet para sempre', 1, paper='Jornal dos Esportes',
     sub='No Estádio Azteca, a seleção vence a Itália por 4 a 1 na final da Copa do México',
     wrong=['1958', '1962', '1966', '1974', '1982'], src=('pt', 'Copa do Mundo FIFA de 1970', ['Jules Rimet']),
     x='A taça ficou com o Brasil por ser o primeiro tricampeão, mas foi roubada da sede da CBF, no Rio, em 1983, e nunca foi recuperada.')
c.NW('De qual cientista é a teoria confirmada nesta manchete?', 'einstein', 'Eclipse confirma a teoria da relatividade', 1,
     paper='Correio Científico', typ='player',
     sub='Fotos tiradas em Sobral, no Ceará, e na ilha do Príncipe mostram a luz das estrelas desviada pelo Sol',
     src=('en', 'Eddington experiment', ['Sobral']),
     x='O eclipse foi em 29 de maio de 1919; quando o resultado foi anunciado, em novembro, o físico virou celebridade mundial.')

# d2
c.NW(Y, '1961', 'Arame farpado divide Berlim da noite para o dia', 2, paper='Diário de Berlim',
     sub='Soldados da Alemanha Oriental fecham a passagem entre os setores da cidade; famílias ficam separadas',
     wrong=['1949', '1953', '1956', '1958', '1963'], src=('pt', 'Muro de Berlim', ['1961']),
     x='A cerca de arame foi erguida em poucas horas, na madrugada de 13 de agosto; nos dias seguintes, começou a subir o muro de concreto.')
c.NW(Y, '1953', 'Nasce a Petrobras: "o petróleo é nosso"', 2, paper='Correio Nacional',
     sub='Lei sancionada pelo presidente cria a estatal que terá o monopólio da exploração de petróleo no país',
     wrong=['1939', '1945', '1950', '1956', '1961'], src=('pt', 'Petrobras', ['1953']),
     x='A lei foi sancionada por Getúlio Vargas em 3 de outubro, depois de uma campanha popular que mobilizou estudantes, militares e intelectuais.')
c.NW('Quem é a rainha desta manchete?', 'victoria', 'Morre a rainha que deu nome a uma era', 2, paper='Correio de Londres', typ='player',
     sub='Depois de mais de seis décadas no trono, a monarca morre na ilha de Wight; o filho, Eduardo VII, assume a coroa',
     src=('pt', 'Vitória do Reino Unido', ['1901']),
     x='Ela teve nove filhos, e tantos netos casados em cortes estrangeiras que ganhou o apelido de "avó da Europa".')
c.NW('Quem é o líder desta manchete?', 'mlk', 'Líder dos direitos civis é morto a tiros em Memphis', 2, paper='Diário de Washington', typ='player',
     sub='O pastor batista, Nobel da Paz de 1964, estava na sacada de um motel; tinha ido à cidade apoiar uma greve de lixeiros',
     src=('pt', 'Martin Luther King Jr.', ['Memphis']),
     x='Na véspera, num discurso, ele dissera ter visto "a terra prometida" e que talvez não chegasse lá com seus ouvintes.')
c.NW('Quem é o guerrilheiro desta manchete?', 'che', 'Guerrilheiro argentino é morto na Bolívia', 2, paper='Jornal das Américas', typ='player',
     sub='Capturado pelo Exército boliviano perto de La Higuera, o ex-ministro do governo cubano foi executado no dia seguinte',
     src=('pt', 'Che Guevara', ['Bolívia']),
     x='Seus restos só foram localizados em 1997, numa vala perto da pista de pouso de Vallegrande, e levados para Santa Clara, em Cuba.')
c.NW('Quem é o médico desta manchete?', 'freud', 'Médico vienense de 82 anos troca a Áustria anexada por Londres', 2, paper='Gazeta de Viena', typ='player',
     sub='O criador da psicanálise deixa a cidade com a família, fugindo da perseguição nazista',
     src=('pt', 'Sigmund Freud', ['1938']),
     x='Ele morreu em Londres no ano seguinte, em setembro de 1939; a casa onde passou seu último ano virou o Museu Freud.')
c.NW('Quem é o general aclamado nesta manchete?', 'de_gaulle', 'General desfila pelos Champs-Élysées na Paris libertada', 2, paper='Le Courrier de Paris', typ='player',
     sub='Um dia depois da rendição alemã na cidade, ele caminha do Arco do Triunfo à praça da Concórdia sob aplausos',
     src=('pt', 'Libertação de Paris', ['1944']),
     x='Na noite da libertação, no Hôtel de Ville, ele discursou: "Paris ultrajada! Paris quebrada! Paris martirizada! Mas Paris libertada!"')
c.NW('Quem é o revolucionário desta manchete?', 'lenin', 'Exilado volta à Rússia e é recebido por multidão em Petrogrado', 2, paper='Jornal do Norte', typ='player',
     sub='O líder bolchevique atravessou a Alemanha num trem lacrado e desembarcou na Estação Finlândia',
     src=('en', 'Finland Station', ['Lenin']),
     x='Os alemães facilitaram a viagem esperando que ele tirasse a Rússia da guerra, o que de fato aconteceu meses depois.')
c.NW('Quem é o premiado desta manchete?', 'churchill', 'Primeiro-ministro britânico ganha o Nobel de Literatura', 2, paper='Diário de Estocolmo', typ='player',
     sub='A Academia Sueca premia suas memórias da Segunda Guerra Mundial e seus discursos',
     src=('pt', 'Winston Churchill', ['Nobel']),
     x='Ocupado com uma conferência internacional nas Bermudas, ele não foi a Estocolmo: a esposa, Clementine, recebeu o prêmio em seu lugar.')

# d3
c.NW(Y, '1974', 'Cravos nos fuzis: cai a ditadura em Portugal', 3, paper='Diário de Lisboa',
     sub='Capitães do Movimento das Forças Armadas derrubam o regime do Estado Novo quase sem disparar um tiro',
     wrong=['1968', '1970', '1972', '1976', '1980'], src=('pt', 'Revolução dos Cravos', ['Grândola']),
     x='A senha para as tropas saírem dos quartéis foi a canção "Grândola, Vila Morena", transmitida pelo rádio pouco depois da meia-noite de 25 de abril.')
c.NW(Y, '1937', 'Dirigível gigante pega fogo ao pousar nos Estados Unidos', 3, paper='The Morning Ledger',
     sub='O Hindenburg explode em Lakehurst, Nova Jersey, diante de repórteres e câmeras de cinema',
     wrong=['1925', '1929', '1933', '1941', '1946'], src=('en', 'Hindenburg disaster', ['Lakehurst']),
     x='Das 97 pessoas a bordo, 35 morreram; a tragédia encerrou a era dos grandes dirigíveis de passageiros.')
c.NW(Y, '1975', 'Angola proclama sua independência', 3, paper='Jornal de Luanda',
     sub='Em Luanda, Agostinho Neto anuncia o nascimento da nova república, em meio à guerra civil',
     wrong=['1961', '1968', '1971', '1974', '1979'], src=('pt', 'Angola', ['1975']),
     x='No mesmo ano ficaram independentes Moçambique, Cabo Verde e São Tomé e Príncipe; o Brasil foi o primeiro país a reconhecer a independência angolana.')
c.NW(Y, '1936', 'Atleta negro americano conquista quatro medalhas de ouro em Berlim', 3, paper='Gazeta Olímpica',
     sub='Diante das tribunas nazistas, ele vence os 100 m, os 200 m, o salto em distância e o revezamento',
     wrong=['1924', '1928', '1932', '1948', '1952'], src=('pt', 'Jesse Owens', ['1936']),
     x='O campeão, Jesse Owens, recebeu em 1976 a Medalha Presidencial da Liberdade, uma das maiores honrarias civis dos Estados Unidos.')
c.NW(Y, '1986', 'Ônibus espacial explode 73 segundos depois do lançamento', 3, paper='Diário da Flórida',
     sub='Os sete tripulantes do Challenger morrem; entre eles estava uma professora que daria aulas do espaço',
     wrong=['1979', '1981', '1983', '1988', '1990'], src=('en', 'Space Shuttle Challenger disaster', ['O-ring']),
     x='A causa foi a falha de um anel de vedação num dos foguetes laterais, endurecido pelo frio daquela manhã.')
c.NW('Quem é o chanceler desta manchete?', 'bismarck', 'Jovem Kaiser força a saída do chanceler que unificou a Alemanha', 3, paper='Berliner Abendblatt', typ='player',
     sub='Depois de quase 20 anos à frente do governo imperial, o velho estadista prussiano entrega o cargo',
     src=('pt', 'Otto von Bismarck', ['1890']),
     x='A revista inglesa Punch publicou uma charge famosa da saída, "Dispensando o piloto", com o velho chanceler descendo de um navio.')
c.NW('Quem é o líder desta manchete?', 'ho_chi_minh', 'Em Hanói, líder revolucionário proclama a independência do Vietnã', 3, paper='Correio do Oriente', typ='player',
     sub='Diante de uma multidão na praça Ba Dinh, ele cita a Declaração de Independência dos Estados Unidos',
     src=('pt', 'Ho Chi Minh', ['1945']),
     x='A guerra contra os franceses só terminaria em 1954, com a vitória vietnamita em Dien Bien Phu.')
c.NW('Quem é o escritor homenageado nesta manchete?', 'victor_hugo', 'Dois milhões de pessoas acompanham o poeta até o Panteão', 3, paper='Le Petit Journal', typ='player',
     sub='Depois de passar a noite sob o Arco do Triunfo, o caixão do velho romancista recebe funeral de Estado',
     src=('en', 'Victor Hugo', ['Panthéon']),
     x='Ele pediu em testamento para ser levado no "carro fúnebre dos pobres", e assim atravessou Paris.')

# d4
c.NW(Y, '1927', 'Aviador cruza o Atlântico sozinho e pousa em Paris', 4, paper='Le Matin des Ailes',
     sub='Depois de 33 horas e meia sem escalas desde Nova York, o Spirit of St. Louis aterrissa em Le Bourget',
     wrong=['1909', '1915', '1921', '1935', '1939'], src=('pt', 'Charles Lindbergh', ['1927']),
     x='O piloto, Charles Lindbergh, tinha 25 anos e ganhou um prêmio de 25 mil dólares oferecido a quem fizesse o voo entre as duas cidades.')
c.NW(Y, '1985', 'Destroços do Titanic são achados no fundo do Atlântico', 4, paper='Diário do Mar',
     sub='Câmeras rebocadas por um navio filmam o casco partido em dois a quase 4 mil metros de profundidade',
     wrong=['1972', '1977', '1981', '1989', '1993'], src=('en', 'Wreck of the Titanic', ['Ballard']),
     x='A expedição franco-americana foi liderada por Robert Ballard e Jean-Louis Michel, 73 anos depois do naufrágio.')
c.NW(Y, '1991', 'Múmia de mais de 5 mil anos é achada no gelo dos Alpes', 4, paper='Gazeta Alpina',
     sub='Caminhantes encontram o corpo na fronteira entre a Áustria e a Itália; ele ainda carregava um machado de cobre',
     wrong=['1979', '1983', '1987', '1995', '1998'], src=('pt', 'Ötzi', ['1991']),
     x='Batizado de Ötzi, ele tinha uma ponta de flecha cravada no ombro, que só foi descoberta em 2001, numa radiografia.')
c.NW('Quem é o escritor desta manchete?', 'tolstoi', 'Escritor de 82 anos morre numa estação de trem', 4, paper='Gazeta de Moscou', typ='player',
     sub='O conde tinha fugido de sua propriedade de Iasnaia Poliana dias antes; repórteres acompanharam sua agonia em Astapovo',
     src=('en', 'Leo Tolstoy', ['Astapovo']),
     x='Ele foi enterrado num bosque de Iasnaia Poliana, num túmulo simples, sem cruz nem lápide.')

# d5
c.NW(Y, '1939', 'Navio funerário anglo-saxão é desenterrado na Inglaterra', 5, paper='The East Anglian Courier',
     sub='Em Sutton Hoo, arqueólogos acham um elmo de ferro, joias de ouro e a marca de um barco de 27 metros no solo',
     wrong=['1922', '1928', '1934', '1946', '1952'], src=('en', 'Sutton Hoo', ['1939']),
     x='A dona do terreno, Edith Pretty, doou todo o tesouro ao Museu Britânico, onde ele está até hoje.')
c.NW(Y, '1898', '"Eu acuso...!"', 5, paper="L'Aurore",
     sub='Em carta aberta ao presidente da República, Émile Zola denuncia a condenação de um capitão inocente',
     wrong=['1871', '1885', '1894', '1906', '1914'], src=('pt', 'Caso Dreyfus', ['1898']),
     x='O capitão Alfred Dreyfus, condenado em 1894 por uma traição que não cometeu, só foi inocentado em 1906.')
c.write()


# ── Fato ou mito? ── stamped true or false
c = Cat('fato_mito', 'Fato ou mito?', '🔎', 'O que todo mundo repete', '#455A64', order=67)

# d1
c.MY('Galileu Galilei foi condenado pela Inquisição a morrer na fogueira?', False, 1, who='galileu',
     x='Condenado em 1633, ele passou o resto da vida em prisão domiciliar e morreu em casa, em 1642. Quem morreu na fogueira, em 1600, foi o filósofo Giordano Bruno.',
     src=('pt', 'Galileu Galilei', ['1633']))
c.MY('O Taj Mahal, na Índia, foi construído para ser o palácio de um imperador?', False, 1, stad='taj_mahal',
     x='É um mausoléu: o imperador mogol Shah Jahan o ergueu para a esposa Mumtaz Mahal, morta em 1631, e ele mesmo foi sepultado ali.',
     src=('pt', 'Taj Mahal', ['mausoléu']))
c.MY('O Cristo Redentor é uma das Sete Maravilhas do Mundo Antigo?', False, 1, stad='cristo_redentor',
     x='Inaugurado em 1931, ele entrou em 2007 na lista das "Novas Sete Maravilhas", feita por votação popular; das antigas, só a Grande Pirâmide continua de pé.',
     src=('pt', 'Cristo Redentor', ['2007']))
c.MY('Charles Darwin afirmou que o ser humano descende dos macacos de hoje, como o chimpanzé?', False, 1, who='darwin',
     x='Ele defendeu que humanos e macacos têm ancestrais em comum: chimpanzés e gorilas são nossos parentes, e não nossos avós.',
     src=('pt', 'Charles Darwin', ['evolução']))
c.MY('Santos Dumont inventou o relógio de pulso?', False, 2, who='santos_dumont',
     x='Relógios de pulso já existiam; em 1904, Louis Cartier criou um modelo para o amigo aviador ver as horas sem soltar os comandos, e a moda pegou entre os homens.',
     src=('pt', 'Santos Dumont', ['Cartier']))
c.MY('O Titanic levava botes salva-vidas suficientes para todos a bordo?', False, 1, icon='ship',
     x='Os 20 botes comportavam cerca de 1.180 pessoas, pouco mais da metade das cerca de 2.200 a bordo; as regras da época não exigiam mais que isso.',
     src=('pt', 'RMS Titanic', ['botes']))
c.MY('Leonardo da Vinci desenhou projetos de máquinas voadoras, séculos antes do avião?', True, 1, who='leonardo',
     x='Seus cadernos têm esboços de asas que batiam como as de um pássaro, de um parafuso aéreo que lembra o helicóptero e de um paraquedas.',
     src=('en', 'Leonardo da Vinci', ['flying machine']))

# d2
c.MY('A suástica foi inventada pelos nazistas?', False, 2, icon='scroll',
     x='O símbolo tem milhares de anos e é sagrado até hoje no hinduísmo, no budismo e no jainismo; os nazistas se apropriaram dele nos anos 1920.',
     src=('pt', 'Suástica', ['hindu']))
c.MY('Quando os portugueses chegaram, todos os povos indígenas do Brasil falavam a mesma língua, o tupi?', False, 2, crest='brasil_colonia',
     x='Havia centenas de línguas, de troncos e famílias diferentes, como o macro-jê e o aruaque; o tupi era falado em boa parte do litoral, onde os portugueses desembarcaram.',
     src=('pt', 'Povos indígenas do Brasil', ['línguas']))
c.MY('Pompeia foi destruída por rios de lava do Vesúvio?', False, 2, stad='pompeia',
     x='A cidade foi soterrada por cinzas, pedra-pomes e nuvens de gás e detritos ardentes; foi esse material que guardou as formas dos corpos encontrados.',
     src=('pt', 'Pompeia', ['cinzas']))
c.MY('A família de Cleópatra, a dinastia ptolomaica, tinha origem grega, e não egípcia?', True, 2, who='cleopatra',
     x='A dinastia descendia de Ptolomeu, general macedônio de Alexandre, o Grande; Cleópatra teria sido a primeira da família a aprender a língua egípcia.',
     src=('pt', 'Cleópatra VII', ['Ptolomeu']))
c.MY('Cristóvão Colombo morreu acreditando que tinha chegado à Ásia?', True, 2, who='colombo',
     x='Até morrer, em 1506, ele sustentou que as terras que encontrou ficavam nas Índias; por isso os povos da América foram chamados de "índios".',
     src=('pt', 'Cristóvão Colombo', ['1506']))
c.MY('Nas Termópilas, os 300 espartanos lutaram sozinhos contra o exército persa?', False, 2, crest='esparta',
     x='O rei Leônidas comandava alguns milhares de gregos de várias cidades; no último dia, além dos espartanos, ficaram centenas de téspios e de tebanos.',
     src=('pt', 'Batalha das Termópilas', ['Leônidas']))
c.MY('O rei Henrique VIII mandou executar quatro de suas seis esposas?', False, 2, who='henrique_viii',
     x='Só duas foram decapitadas: Ana Bolena, em 1536, e Catarina Howard, em 1542. Das outras, duas tiveram o casamento anulado, uma morreu após o parto e a última sobreviveu ao rei.',
     src=('pt', 'Henrique VIII de Inglaterra', ['Ana Bolena']))
c.MY('Quando foi inaugurada, em 1886, a Estátua da Liberdade tinha cor de cobre, e não verde?', True, 2, stad='estatua_liberdade',
     x='Feita de chapas de cobre, ela tinha a cor de uma moeda nova; a camada verde, a pátina, formou-se aos poucos, com a chuva e o ar do mar, nas décadas seguintes.',
     src=('pt', 'Estátua da Liberdade', ['cobre']))
c.MY('O Rio de Janeiro já foi a sede do governo de todo o Império Português?', True, 2, who='dom_joao_vi',
     x='Entre 1808 e 1821, com a corte instalada na cidade, era do Rio que se governavam Portugal e todas as suas colônias.',
     src=('pt', 'Transferência da corte portuguesa para o Brasil', ['1808']))
c.MY('A Torre de Pisa começou a inclinar ainda durante a construção?', True, 2, stad='torre_pisa',
     x='A obra começou em 1173 e, por causa do solo mole, a torre já afundava de um lado quando chegou ao segundo andar; os andares de cima foram feitos um pouco tortos para compensar.',
     src=('pt', 'Torre de Pisa', ['1173']))

# d3
c.MY('A França ainda executava condenados na guilhotina em 1977?', True, 3, flag='FRA',
     x='A última execução foi em 10 de setembro de 1977, em Marselha; a pena de morte só foi abolida no país em 1981.',
     src=('en', 'Guillotine', ['1977']))
c.MY('A Biblioteca de Alexandria foi destruída de uma só vez, num grande incêndio?', False, 3, icon='book',
     x='O incêndio de 48 a.C., na guerra de Júlio César, foi só um episódio: a biblioteca definhou ao longo de séculos, com cortes de verbas, expurgos e guerras.',
     src=('pt', 'Biblioteca de Alexandria', ['César']))
c.MY('Stonehenge foi construído pelos druidas celtas?', False, 3, stad='stonehenge',
     x='As pedras foram erguidas entre cerca de 3000 e 2000 a.C., muito antes dos druidas; a ligação com eles foi inventada por antiquários dos séculos XVII e XVIII.',
     src=('en', 'Stonehenge', ['Druid']))
c.MY('O céu estrelado da bandeira do Brasil reproduz o céu do Rio de Janeiro na manhã de 15 de novembro de 1889?', True, 3, flag='BRA',
     x='Cada estrela representa um estado ou o Distrito Federal; o céu aparece como se fosse visto de fora da esfera celeste, por isso fica invertido.',
     src=('pt', 'Bandeira do Brasil', ['1889']))
c.MY('Os samurais lutavam só com espadas e arcos, sem usar armas de fogo?', False, 3, icon='helmet',
     x='Os portugueses levaram o arcabuz ao Japão em 1543, e logo os japoneses fabricavam milhares; em batalhas como a de Nagashino, em 1575, ele foi usado em massa.',
     src=('en', 'Battle of Nagashino', ['arquebus']))
c.MY('O coração de D. Pedro I está guardado numa igreja de Portugal?', True, 3, who='dom_pedro_i',
     x='Ele o deixou à cidade do Porto, que defendeu na guerra civil portuguesa; o coração fica na Igreja da Lapa e veio ao Brasil em 2022, no bicentenário da Independência.',
     src=('pt', 'Pedro I do Brasil', ['coração']))
c.MY('A gripe espanhola de 1918 começou na Espanha?', False, 3, icon='flask',
     x='A origem é incerta, mas nada aponta para a Espanha: o nome pegou porque o país, neutro na guerra, noticiava a doença livremente, enquanto os países em combate censuravam a imprensa.',
     src=('pt', 'Gripe espanhola', ['Espanha']))
c.MY('Em 1582, dez dias sumiram do calendário em países como Portugal, Espanha e Itália?', True, 3, icon='hourglass',
     x='Para corrigir o atraso do calendário juliano, o papa Gregório XIII decretou que o dia seguinte a 4 de outubro seria 15 de outubro.',
     src=('pt', 'Calendário gregoriano', ['1582']))
c.MY('Albert Einstein foi convidado para ser presidente de Israel?', True, 3, who='einstein',
     x='Em 1952, após a morte de Chaim Weizmann, o governo israelense lhe ofereceu o cargo; ele recusou, dizendo não ter aptidão nem experiência para lidar com pessoas.',
     src=('pt', 'Albert Einstein', ['Israel']))

# d4
c.MY('A Declaração de Independência dos Estados Unidos foi assinada pela maioria dos delegados no dia 4 de julho de 1776?', False, 4, crest='estados_unidos',
     x='Em 4 de julho o Congresso aprovou o texto; a cópia oficial em pergaminho só foi assinada pela maioria em 2 de agosto, e algumas assinaturas vieram depois.',
     src=('en', 'United States Declaration of Independence', ['August 2']))
c.MY('Durante a Lei Seca, nos Estados Unidos, era crime consumir bebidas alcoólicas?', False, 4, flag='USA',
     x='De 1920 a 1933, a lei proibia fabricar, transportar e vender bebidas alcoólicas, mas não consumi-las: quem tinha estoque em casa podia beber.',
     src=('en', 'Prohibition in the United States', ['1933']))
c.MY('O Partenon ficou em ruínas por causa de uma explosão de pólvora no século XVII?', True, 4, stad='partenon',
     x='Em 1687, os otomanos usavam o templo como paiol; durante um cerco, um disparo da artilharia veneziana acertou a pólvora, e a explosão derrubou boa parte da estrutura.',
     src=('pt', 'Partenon', ['1687']))
c.MY('O Hino Nacional Brasileiro foi tocado por décadas sem uma letra oficial?', True, 4, icon='lyre',
     x='A melodia de Francisco Manuel da Silva já era tocada nos anos 1830; a letra de Osório Duque-Estrada, escrita em 1909, só foi oficializada em 1922.',
     src=('pt', 'Hino Nacional Brasileiro', ['1922']))
c.MY('O Brasil declarou guerra à Alemanha e participou da Primeira Guerra Mundial?', True, 4, flag='BRA',
     x='Depois do afundamento de navios brasileiros por submarinos alemães, o país entrou na guerra em 1917; mandou uma divisão naval para patrulhar o Atlântico e uma missão médica à França.',
     src=('en', 'Brazil during World War I', ['1917']))
c.MY('O imperador Calígula nomeou seu cavalo, Incitatus, cônsul de Roma?', False, 4, crest='imperio_romano',
     x='Os autores antigos dizem apenas que ele planejava fazer isso, e a história pode ser fofoca de inimigos; o cavalo nunca ocupou o cargo.',
     src=('en', 'Incitatus', ['consul']))

# d5
c.MY('Para ter a independência reconhecida por Portugal, o Brasil aceitou pagar uma indenização?', True, 5, crest='imperio_brasil',
     x='Pelo tratado de 1825, com mediação britânica, o Brasil pagou 2 milhões de libras esterlinas, em boa parte para cobrir um empréstimo português em Londres.',
     src=('pt', 'Independência do Brasil', ['1825']))
c.MY('Os Estados Unidos já tiveram um presidente que nunca foi eleito nem para presidente nem para vice?', True, 5, flag='USA',
     x='Gerald Ford virou vice em 1973, nomeado após a renúncia de Spiro Agnew, e assumiu a Presidência em 1974, quando Nixon renunciou; perdeu a eleição de 1976.',
     src=('pt', 'Gerald Ford', ['1974']))
c.MY('Os médicos já usavam a famosa máscara em forma de bico durante a Peste Negra, no século XIV?', False, 5, icon='flask',
     x='Na Peste Negra, de 1347 a 1351, ela não existia: a máscara de bico, recheada de ervas aromáticas, surgiu no século XVII e é atribuída ao médico francês Charles de Lorme.',
     src=('en', 'Plague doctor', ['Lorme']))
c.write()
