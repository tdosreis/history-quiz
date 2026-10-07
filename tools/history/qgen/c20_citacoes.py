"""Quem disse? — famous sentences from every era and region, as usually quoted in Brazil.
Only the citação format (QT): the answer is a figure id when the speaker is in the album,
otherwise typ='txt' with five plausible speakers of the same era."""
from qdsl import Cat

c = Cat('citacoes', 'Quem disse?', '🪶', 'Citação: quem disse ou escreveu', '#6D4C41', order=62)

# ── d1 ──
c.QT('Águas são muitas, infindas. E em tal maneira é graciosa que, querendo-a aproveitar, dar-se-á nela tudo.',
     'Pero Vaz de Caminha', 1, t='Quem escreveu este trecho?', typ='txt',
     wrong=['Pedro Álvares Cabral', 'Américo Vespúcio', 'Bartolomeu Dias', 'Nicolau Coelho', 'Duarte Pacheco Pereira'],
     ctx='Carta ao rei D. Manuel, escrita em Porto Seguro em 1º de maio de 1500',
     src=('pt', 'Carta de Pero Vaz de Caminha', ['1500']),
     x='Chamada de "certidão de nascimento" do Brasil, a carta ficou guardada por séculos na Torre do Tombo, em Lisboa, e só foi publicada em 1817.')
c.QT('Não tive filhos, não transmiti a nenhuma criatura o legado da nossa miséria.', 'machado', 1,
     t='Quem escreveu esta frase?', ctx='Última linha de um romance narrado por um defunto, 1881',
     src=('pt', 'Memórias Póstumas de Brás Cubas', ['1881']),
     x='O livro é dedicado "ao verme que primeiro roeu as frias carnes do meu cadáver" e marcou o início do Realismo no Brasil.')
c.QT('E agora, José? A festa acabou, a luz apagou, o povo sumiu, a noite esfriou.', 'drummond', 1,
     t='Quem escreveu estes versos?', ctx='Poema de um livro publicado em 1942, em plena Segunda Guerra Mundial',
     src=('pt', 'Carlos Drummond de Andrade', ['Itabira']),
     x='Nascido em Itabira, Minas Gerais, o poeta passou décadas no serviço público, no Rio de Janeiro, sem deixar de escrever poemas e crônicas.')
c.QT('Minha terra tem palmeiras, onde canta o sabiá; as aves que aqui gorjeiam não gorjeiam como lá.',
     'Gonçalves Dias', 1, t='Quem escreveu estes versos?', typ='txt',
     wrong=['Castro Alves', 'Olavo Bilac', 'Álvares de Azevedo', 'Machado de Assis', 'José de Alencar'],
     ctx='Poema escrito em Coimbra, Portugal, em 1843, por um estudante com saudade da pátria',
     src=('pt', 'Canção do Exílio', ['Gonçalves Dias']),
     x='O Hino Nacional cita o poema entre aspas: "Nossos bosques têm mais vida", "Nossa vida" no teu seio "mais amores".')
c.QT('Canta, ó deusa, a cólera de Aquiles, filho de Peleu, cólera funesta que trouxe aos aqueus incontáveis dores.', 'homero', 1,
     t='Quem compôs estes versos?', ctx='Abertura de um poema épico sobre a Guerra de Troia, por volta do século VIII a.C.',
     src=('pt', 'Ilíada', ['Aquiles']),
     x='O poema não narra a guerra inteira: cobre só algumas semanas do décimo e último ano do cerco de Troia.')
c.QT('A religião é o ópio do povo.', 'marx', 1,
     ctx='Introdução a uma crítica da filosofia do direito de Hegel, publicada em 1844',
     src=('en', 'Opium of the people', ['Marx']),
     x='Na passagem completa, a religião também é "o suspiro da criatura oprimida, o coração de um mundo sem coração".')
c.QT('Gênio é um por cento inspiração e noventa e nove por cento transpiração.', 'edison', 1,
     ctx='Frase atribuída a um inventor americano, citada em jornais no início do século XX',
     src=('en', 'Thomas Edison', ['Menlo Park']),
     x='Ele registrou mais de mil patentes nos Estados Unidos, entre elas a do fonógrafo e a de uma lâmpada incandescente durável.')
c.QT('Na natureza nada se cria, nada se perde, tudo se transforma.', 'Antoine Lavoisier', 1,
     t='A quem se atribui este princípio, na forma em que é citado até hoje?', typ='txt',
     wrong=['Isaac Newton', 'Robert Boyle', 'John Dalton', 'Dmitri Mendeleiev', 'Louis Pasteur'],
     ctx='Forma popular de um princípio enunciado num tratado de química publicado em Paris em 1789',
     src=('en', 'Antoine Lavoisier', ['1789']),
     x='No texto original, o princípio diz que a quantidade de matéria é a mesma antes e depois de qualquer operação química.')
c.QT('Não pergunte o que o seu país pode fazer por você; pergunte o que você pode fazer pelo seu país.', 'kennedy', 1,
     ctx='Discurso de posse em Washington, janeiro de 1961',
     src=('en', 'Inauguration of John F. Kennedy', ['1961']),
     x='Aos 43 anos, ele foi o mais jovem presidente eleito dos Estados Unidos; foi assassinado em Dallas menos de três anos depois.')
c.QT('Apesar de tudo, ainda acredito que as pessoas são realmente boas de coração.', 'anne_frank', 1,
     ctx='Diário escrito num esconderijo em Amsterdã, julho de 1944',
     src=('en', 'The Diary of a Young Girl', ['1947']),
     x='O esconderijo foi descoberto em agosto de 1944; o pai, único sobrevivente da família, publicou o diário em 1947.')
c.QT('Até a vitória, sempre!', 'che', 1,
     ctx='Fecho da carta de despedida de um guerrilheiro que deixou Cuba, lida em público em Havana, outubro de 1965',
     src=('en', 'Che Guevara', ['Bolivia']),
     x='Ele deixou o governo cubano para levar a guerrilha ao Congo e depois à Bolívia, onde foi capturado e executado em 1967.')

# ── d2 ──
c.QT('Ninguém nasce odiando outra pessoa pela cor de sua pele, por sua origem ou por sua religião. Para odiar, as pessoas precisam aprender.', 'mandela', 2,
     ctx='Autobiografia publicada em 1994, o ano em que o autor chegou à Presidência do seu país',
     src=('en', 'Long Walk to Freedom', ['1994']),
     x='O trecho continua: "e, se podem aprender a odiar, podem ser ensinadas a amar". O autor passou 27 anos preso, boa parte deles na ilha Robben.')
c.QT('Se não fosse imperador, desejaria ser professor.', 'dom_pedro_ii', 2,
     ctx='Frase atribuída a um monarca apaixonado por ciências, línguas e educação, no século XIX',
     src=('pt', 'Pedro II do Brasil', ['1889']),
     x='Na Exposição do Centenário dos EUA, na Filadélfia, em 1876, ele testou o telefone recém-inventado por Graham Bell.')
c.QT('O sertanejo é, antes de tudo, um forte.', 'Euclides da Cunha', 2, t='Quem escreveu esta frase?', typ='txt',
     wrong=['Graciliano Ramos', 'Guimarães Rosa', 'Monteiro Lobato', 'José de Alencar', 'Rachel de Queiroz'],
     ctx='Livro sobre a Guerra de Canudos, publicado em 1902',
     src=('pt', 'Os Sertões', ['Euclides da Cunha']),
     x='O autor acompanhou o fim da guerra, em 1897, como correspondente do jornal O Estado de S. Paulo.')
c.QT('Morrer, se preciso for; matar, nunca.', 'rondon', 2,
     ctx='Lema adotado nas expedições pelo interior do Brasil, nos contatos com povos indígenas',
     src=('pt', 'Cândido Rondon', ['Mato Grosso']),
     x='Ele dirigiu o Serviço de Proteção aos Índios, criado em 1910, e deu nome ao estado de Rondônia.')
c.QT('Há mais coisas entre o céu e a terra, Horácio, do que sonha a tua filosofia.', 'shakespeare', 2,
     t='Quem escreveu esta fala?', ctx='Fala de um príncipe ao amigo, logo depois de ver um fantasma, no ato I de uma tragédia, c. 1600',
     src=('pt', 'Hamlet', ['Dinamarca']),
     x='No Brasil, a fala costuma ser citada de memória como "...do que sonha a nossa vã filosofia".')
c.QT('O coração tem razões que a própria razão desconhece.', 'pascal', 2,
     ctx='Pensamentos, anotações de um matemático francês reunidas e publicadas após sua morte, 1670',
     src=('en', 'Pensées', ['1670']),
     x='Ainda adolescente, o autor construiu uma das primeiras calculadoras mecânicas da história, para aliviar as contas de impostos do pai.')
c.QT('Lembre-se de que tempo é dinheiro.', 'franklin', 2,
     ctx='Conselhos a um jovem comerciante, Filadélfia, 1748',
     src=('en', 'Benjamin Franklin', ['Philadelphia']),
     x='O autor também inventou o para-raios e as lentes bifocais, e ajudou a redigir a Declaração de Independência americana.')
c.QT('Consideramos estas verdades evidentes por si mesmas: que todos os homens são criados iguais.', 'jefferson', 2,
     t='Quem redigiu esta frase?', ctx='Documento aprovado na Filadélfia em 4 de julho de 1776',
     src=('pt', 'Declaração de Independência dos Estados Unidos', ['Jefferson']),
     x='O autor morreu em 4 de julho de 1826, exatamente 50 anos depois, no mesmo dia que John Adams.')
c.QT('O que não me mata me fortalece.', 'nietzsche', 2,
     ctx='Crepúsculo dos Ídolos, livro de aforismos escrito em 1888',
     src=('en', 'Twilight of the Idols', ['1888']),
     x='No original alemão: "Was mich nicht umbringt, macht mich stärker". Em janeiro de 1889, o autor sofreu um colapso mental em Turim.')
c.QT('Todos os animais são iguais, mas alguns animais são mais iguais que outros.', 'orwell', 2,
     t='Quem escreveu esta frase?', ctx='Fábula política publicada na Inglaterra em 1945',
     src=('en', 'Animal Farm', ['1945']),
     x='A fábula satiriza a Revolução Russa e o stalinismo: o porco Napoleão representa Stálin.')
c.QT('Ninguém nasce mulher: torna-se mulher.', 'beauvoir', 2,
     ctx='Ensaio publicado em Paris em 1949',
     src=('en', 'The Second Sex', ['1949']),
     x='O livro, O Segundo Sexo, entrou no Índice de Livros Proibidos do Vaticano; a autora foi companheira do filósofo Jean-Paul Sartre.')
c.QT('Condenai-me, não importa. A história me absolverá.', 'fidel', 2,
     ctx='Autodefesa no julgamento pelo ataque ao quartel Moncada, Santiago de Cuba, outubro de 1953',
     src=('en', 'History Will Absolve Me', ['Moncada']),
     x='Condenado a 15 anos de prisão, ele foi anistiado em 1955 e chegou ao poder em Havana em janeiro de 1959.')
c.QT('Sigam-me os que forem brasileiros!', 'duque_caxias', 2,
     ctx='Grito atribuído ao comandante ao liderar a carga na ponte de Itororó, Guerra do Paraguai, dezembro de 1868',
     src=('pt', 'Batalha de Itororó', ['Caxias']),
     x='Aos 65 anos, ele teria avançado à frente da tropa com a espada em punho. Seu aniversário, 25 de agosto, é o Dia do Soldado.')
c.QT('Forças terríveis levantam-se contra mim e me intrigam ou infamam.', 'Jânio Quadros', 2, typ='txt',
     wrong=['João Goulart', 'Juscelino Kubitschek', 'Café Filho', 'Eurico Gaspar Dutra', 'Tancredo Neves'],
     ctx='Carta de renúncia à Presidência da República, agosto de 1961',
     src=('pt', 'Jânio Quadros', ['1961']),
     x='Ele ficou menos de sete meses no cargo; a crise que se seguiu levou à adoção do parlamentarismo para que o vice pudesse tomar posse.')
c.QT('Lutaremos nas praias, lutaremos nos campos de pouso, lutaremos nos campos e nas ruas, lutaremos nas colinas; nunca nos renderemos.', 'churchill', 2,
     ctx='Discurso na Câmara dos Comuns, em Londres, depois da retirada aliada de Dunquerque, junho de 1940',
     src=('en', 'We shall fight on the beaches', ['Dunkirk']),
     x='Dias antes, mais de 300 mil soldados aliados tinham sido retirados das praias de Dunquerque por navios de guerra e barcos civis.')
c.QT('Ontem, 7 de dezembro de 1941 — uma data que viverá na infâmia —, os Estados Unidos foram súbita e deliberadamente atacados.', 'fdr', 2,
     ctx='Discurso ao Congresso americano, um dia depois do ataque a Pearl Harbor',
     src=('en', 'Day of Infamy speech', ['1941']),
     x='Menos de uma hora depois do discurso, o Congresso aprovou a declaração de guerra ao Japão.')
c.QT('A interpretação dos sonhos é a estrada real para o conhecimento do inconsciente.', 'freud', 2,
     ctx='Livro de um médico vienense lançado em novembro de 1899, com a data de 1900 na capa',
     src=('en', 'The Interpretation of Dreams', ['1899']),
     x='A primeira tiragem, de apenas 600 exemplares, levou oito anos para se esgotar; o autor ainda veria mais sete edições do livro.')
c.QT('O único cansaço que eu sentia era o cansaço de ceder.', 'rosa_parks', 2,
     ctx='Autobiografia de 1992, lembrando o dia em que foi presa num ônibus em Montgomery, Alabama, em 1955',
     src=('en', 'Rosa Parks', ['Montgomery']),
     x='A prisão desencadeou um boicote aos ônibus de Montgomery que durou 381 dias e terminou com o fim da segregação nos ônibus da cidade.')

# ── d3 ──
c.QT('As armas e os barões assinalados que, da ocidental praia lusitana, por mares nunca de antes navegados, passaram ainda além da Taprobana.', 'camoes', 2,
     t='Quem escreveu estes versos?', ctx='Abertura de um poema épico publicado em Lisboa em 1572',
     src=('pt', 'Os Lusíadas', ['1572']),
     x='Taprobana era o nome antigo do Sri Lanka. O poema, que celebra a viagem de Vasco da Gama à Índia, tem dez cantos e 1.102 estrofes.')
c.QT('Pedro, se o Brasil se separar, antes seja para ti, que me hás de respeitar, do que para algum desses aventureiros.', 'dom_joao_vi', 3,
     ctx='Conselho atribuído ao rei ao deixar o filho como regente e voltar a Lisboa, abril de 1821',
     src=('pt', 'João VI de Portugal', ['1821']),
     x='O rei partiu para Lisboa em abril de 1821; um ano e meio depois, em setembro de 1822, o filho proclamou a Independência.')
c.QT('Tupi, or not tupi, that is the question.', 'Oswald de Andrade', 3, t='Quem escreveu esta frase?', typ='txt',
     wrong=['Mário de Andrade', 'Tarsila do Amaral', 'Menotti Del Picchia', 'Graça Aranha', 'Raul Bopp'],
     ctx='Manifesto publicado na Revista de Antropofagia, São Paulo, 1928',
     src=('pt', 'Manifesto Antropófago', ['1928']),
     x='O manifesto foi inspirado no quadro Abaporu, que Tarsila do Amaral pintou e deu de presente ao autor, então seu marido.')
c.QT('Senhor Deus dos desgraçados! Dizei-me vós, Senhor Deus! Se é loucura... se é verdade tanto horror perante os céus?!',
     'Castro Alves', 3, t='Quem escreveu estes versos?', typ='txt',
     wrong=['Gonçalves Dias', 'Álvares de Azevedo', 'Casimiro de Abreu', 'Fagundes Varela', 'Olavo Bilac'],
     ctx='Poema de 1868 contra o tráfico de africanos escravizados pelo Atlântico',
     src=('pt', 'Castro Alves', ['Navio Negreiro']),
     x='O autor de "O Navio Negreiro" morreu em 1871, com apenas 24 anos, e ficou conhecido como o "Poeta dos Escravos".')
c.QT('No começo, pensei que estava lutando para salvar seringueiras; depois, a Floresta Amazônica. Agora percebo que estou lutando pela humanidade.',
     'chico_mendes', 3, ctx='Reflexão de um líder sindical e ambientalista brasileiro, nos anos 1980',
     src=('en', 'Chico Mendes', ['rubber']),
     x='Ele foi assassinado na porta de casa, em Xapuri, no Acre, em dezembro de 1988, a mando de um fazendeiro da região.')
c.QT('Uma vida sem exame não vale a pena ser vivida.', 'socrates', 3,
     ctx='Defesa diante de um tribunal de Atenas, 399 a.C., segundo o relato de um discípulo',
     src=('en', 'Apology (Plato)', ['Socrates']),
     x='Condenado à morte, ele recusou até um plano de fuga preparado pelo amigo Críton e bebeu cicuta.')
c.QT('Mais uma vitória como esta sobre os romanos e estaremos completamente perdidos.', 'Pirro do Épiro', 3, typ='txt',
     wrong=['Aníbal', 'Alexandre, o Grande', 'Antíoco III', 'Filipe II da Macedônia', 'Seleuco I'],
     ctx='Comentário atribuído por Plutarco a um rei grego depois da batalha de Ásculo, 279 a.C.',
     src=('en', 'Pyrrhic victory', ['Pyrrhus']),
     x='Da frase nasceu a expressão "vitória de Pirro": um triunfo que custa tão caro que equivale a uma derrota.')
c.QT('Que artista morre comigo!', 'nero', 3,
     ctx='Últimas palavras atribuídas pelo biógrafo Suetônio a um imperador romano, 68 d.C.',
     src=('en', 'Nero', ['Suetonius']),
     x='O imperador gostava de se apresentar como cantor e citarista e chegou a competir nos Jogos Olímpicos, na Grécia.')
c.QT('Uma jornada de mil léguas começa com um único passo.', 'Lao-Tsé', 3, typ='txt',
     wrong=['Confúcio', 'Sun Tzu', 'Mêncio', 'Mozi', 'Han Feizi'],
     ctx='Capítulo 64 do Tao Te Ching, clássico da China antiga',
     src=('en', 'Tao Te Ching', ['Laozi']),
     x='O nome do autor quer dizer "Velho Mestre"; muitos estudiosos duvidam de que ele tenha sido uma pessoa real.')
c.QT('Não contei nem a metade do que vi.', 'marco_polo', 3,
     ctx='Resposta atribuída a ele no leito de morte, Veneza, 1324, quando lhe pediram que admitisse ter exagerado',
     src=('en', 'Marco Polo', ['Columbus']),
     x='Cristóvão Colombo tinha um exemplar, em latim, do livro de viagens dele, com muitas anotações à mão nas margens.')
c.QT('Num lugar da Mancha, de cujo nome não quero lembrar-me, vivia não há muito tempo um fidalgo...', 'cervantes', 3,
     t='Quem escreveu esta frase?', ctx='Primeira frase de um romance publicado em Madri em 1605',
     src=('pt', 'Dom Quixote', ['1605']),
     x='O autor perdeu o movimento da mão esquerda na batalha naval de Lepanto, em 1571, e ganhou o apelido de "maneta de Lepanto".')
c.QT('Isso está bem dito, mas é preciso cultivar nosso jardim.', 'voltaire', 3,
     ctx='Última frase de um conto filosófico publicado em 1759',
     src=('en', 'Candide', ['1759']),
     x='O conto, Cândido, zomba do otimismo do mestre Pangloss, para quem tudo vai bem "no melhor dos mundos possíveis".')
c.QT('Não é da benevolência do açougueiro, do cervejeiro ou do padeiro que esperamos o nosso jantar, mas da consideração que eles têm pelo próprio interesse.',
     'adam_smith', 3, ctx='Tratado de economia publicado em Londres em 1776',
     src=('en', 'The Wealth of Nations', ['1776']),
     x='No mesmo livro aparece a famosa "mão invisível" do mercado, expressão que surge uma única vez em toda a obra.')
c.QT('Muitos anos depois, diante do pelotão de fuzilamento, o coronel Aureliano Buendía havia de recordar aquela tarde remota em que seu pai o levou para conhecer o gelo.',
     'garcia_marquez', 3, t='Quem escreveu esta frase?', ctx='Primeira frase de um romance publicado em Buenos Aires em 1967',
     src=('en', 'One Hundred Years of Solitude', ['Macondo']),
     x='O romance se passa na cidade imaginária de Macondo; o autor, colombiano, recebeu o Nobel de Literatura em 1982.')
c.QT('O poder político nasce do cano de uma arma.', 'Mao Tsé-tung', 3, typ='txt',
     wrong=['Vladimir Lênin', 'Josef Stálin', 'Zhou Enlai', 'Deng Xiaoping', 'Chiang Kai-shek'],
     ctx='Reunião de emergência do Partido Comunista Chinês, agosto de 1927',
     src=('en', 'Political power grows out of the barrel of a gun', ['Mao']),
     x='A frase entrou no Livro Vermelho, coletânea de citações do líder distribuída aos milhões durante a Revolução Cultural.')
c.QT('O sono da razão produz monstros.', 'goya', 4, t='Quem pôs esta legenda numa de suas gravuras?',
     ctx='Prancha 43 da série Os Caprichos, Madri, 1799',
     src=('en', 'The Sleep of Reason Produces Monsters', ['Caprichos']),
     x='A série de 80 gravuras satirizava a superstição, a Inquisição e os costumes da sociedade espanhola da época.')

# ── d4 ──
c.QT('O escravo que mata o senhor, seja em que circunstância for, mata sempre em legítima defesa.', 'luis_gama', 4,
     ctx='Frase atribuída a um advogado autodidata e abolicionista que libertou centenas de escravizados nos tribunais de São Paulo',
     src=('pt', 'Luís Gama', ['abolicionista']),
     x='Nascido livre em Salvador, foi vendido como escravo pelo próprio pai aos 10 anos; aprendeu a ler, reuniu provas de que nascera livre e fugiu em 1848.')
c.QT('Deste Planalto Central, desta solidão que em breve se transformará em cérebro das altas decisões nacionais, lanço os olhos mais uma vez sobre o amanhã do meu país.',
     'jk', 3, ctx='Primeira visita ao local da futura capital, outubro de 1956',
     src=('pt', 'Juscelino Kubitschek', ['Brasília']),
     x='A nova capital foi inaugurada menos de quatro anos depois, em 21 de abril de 1960.')
c.QT('Para fazer brilhar a justiça na terra, destruir o mau e o perverso e impedir que o forte oprima o fraco.', 'hamurabi', 3,
     t='Quem mandou gravar esta frase?', ctx='Prólogo de um código de leis gravado numa estela de pedra negra, c. 1754 a.C.',
     src=('en', 'Code of Hammurabi', ['Akkadian']),
     x='Escrito em acadiano, com caracteres cuneiformes, o código reúne 282 leis; as penas variavam conforme a classe social da vítima.')
c.QT('Uma andorinha só não faz verão.', 'aristoteles', 4,
     ctx='Tratado de ética do século IV a.C., ao explicar que um único dia feliz não torna ninguém feliz',
     src=('en', 'Nicomachean Ethics', ['Aristotle']),
     x='No original grego, uma andorinha só não faz a primavera; o "verão" é do provérbio popular, que corre em várias línguas.')
c.QT('Ninguém me livrará deste padre turbulento?', 'Henrique II da Inglaterra', 4, typ='txt',
     wrong=['Ricardo Coração de Leão', 'João Sem-Terra', 'Guilherme, o Conquistador', 'Eduardo I', 'Henrique VIII'],
     ctx='Desabafo atribuído a um rei inglês contra o arcebispo de Cantuária, 1170; quatro cavaleiros o tomaram como uma ordem',
     src=('en', 'Thomas Becket', ['Henry II']),
     x='O arcebispo Thomas Becket foi morto dentro da catedral; canonizado em 1173, tornou-se um dos santos mais populares da Inglaterra.')
c.QT('A filosofia está escrita neste grandíssimo livro sempre aberto diante dos nossos olhos, o universo; e ele está escrito em língua matemática.',
     'galileu', 4, ctx='O Ensaiador, livro publicado em Roma em 1623',
     src=('en', 'The Assayer', ['1623']),
     x='O livro nasceu de uma polêmica sobre a natureza dos cometas com um padre jesuíta, Orazio Grassi.')
c.QT('Duas coisas enchem a alma de admiração e respeito sempre novos: o céu estrelado sobre mim e a lei moral dentro de mim.', 'kant', 4,
     ctx='Conclusão da Crítica da Razão Prática, 1788',
     src=('en', 'Critique of Practical Reason', ['1788']),
     x='A frase está numa placa junto ao túmulo do filósofo em Königsberg, cidade hoje chamada Kaliningrado, na Rússia.')
c.QT('A mulher nasce livre e permanece igual ao homem em direitos.', 'Olympe de Gouges', 4, typ='txt',
     wrong=['Mary Wollstonecraft', 'Madame Roland', 'Charlotte Corday', 'Madame de Staël', 'Théroigne de Méricourt'],
     ctx='Artigo 1º de uma declaração de direitos publicada em Paris em 1791',
     src=('en', 'Declaration of the Rights of Woman and of the Female Citizen', ['1791']),
     x='O texto respondia à Declaração dos Direitos do Homem e do Cidadão, de 1789; a autora foi guilhotinada em 1793.')
c.QT('Nada é mais precioso do que a independência e a liberdade.', 'ho_chi_minh', 4,
     ctx='Apelo transmitido pelo rádio de Hanói durante a guerra contra os Estados Unidos, julho de 1966',
     src=('en', 'Ho Chi Minh', ['Hanoi']),
     x='A rede de trilhas pela selva do Laos e do Camboja que abastecia os guerrilheiros do sul ficou conhecida como Trilha Ho Chi Minh.')
c.QT('No campo da observação, o acaso só favorece os espíritos preparados.', 'pasteur', 4,
     ctx='Aula inaugural na Faculdade de Ciências de Lille, 1854',
     src=('en', 'Louis Pasteur', ['rabies']),
     x='Em 1885, ele aplicou pela primeira vez a vacina contra a raiva num menino mordido por um cão, Joseph Meister.')

# ── d5 ──
c.QT('Como são numerosas as tuas obras, ocultas aos olhos dos homens, ó deus único, sem outro igual!', 'aquenaton', 5,
     ctx='Grande Hino ao disco solar, atribuído ao próprio faraó e gravado num túmulo de Amarna, século XIV a.C.',
     src=('en', 'Great Hymn to the Aten', ['Akhenaten']),
     x='Muitos estudiosos apontam a semelhança do hino com o Salmo 104 da Bíblia.')
c.QT('Todos os homens são meus filhos.', 'ashoka', 5,
     ctx='Édito gravado em rocha na região conquistada de Kalinga, século III a.C.',
     src=('en', 'Edicts of Ashoka', ['Kalinga']),
     x='O imperador mandou gravar éditos em rochas e colunas por todo o império; a roda de uma dessas colunas está na bandeira da Índia.')
c.QT('Até que a filosofia que considera uma raça superior e outra inferior seja finalmente e permanentemente desacreditada e abandonada, haverá guerra.',
     'haile_selassie', 5, ctx='Discurso na Assembleia Geral da ONU, Nova York, outubro de 1963',
     src=('en', 'Haile Selassie', ['League of Nations']),
     x='Em 1976, Bob Marley transformou o discurso na letra da canção "War".')
c.QT('Não é porque as coisas são difíceis que não ousamos; é porque não ousamos que elas são difíceis.', 'Sêneca', 5, typ='txt',
     wrong=['Cícero', 'Marco Aurélio', 'Epicteto', 'Plutarco', 'Lucrécio'],
     ctx='Uma das 124 cartas a Lucílio escritas por um filósofo estoico romano, século I',
     src=('en', 'Seneca the Younger', ['Lucilius']),
     x='Preceptor do jovem Nero, o filósofo acabou obrigado pelo antigo aluno a se matar, em 65 d.C.')
c.QT('Ouçam-me, meus chefes! Estou cansado. Meu coração está doente e triste. De onde o sol está agora, não lutarei nunca mais.',
     'Chefe Joseph', 5, typ='txt',
     wrong=['Touro Sentado', 'Cavalo Louco', 'Gerônimo', 'Nuvem Vermelha', 'Tecumseh'],
     ctx='Palavras atribuídas a um líder indígena ao se render ao exército americano, Montana, outubro de 1877',
     src=('en', 'Chief Joseph', ['1877']),
     x='Seu povo, os Nez Perce, fugia rumo ao Canadá e foi cercado a menos de 70 km da fronteira, depois de uma marcha de quase 2.000 km.')

c.write()
