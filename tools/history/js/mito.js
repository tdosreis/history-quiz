
/* ═══════════════════════════════════════════════════
   MITO OU FATO? — a claim on a card: drag it to the left if it is a myth,
   to the right if it is true (or tap the buttons). The card turns over and
   its back says which, stamped, and why. Three misses and the game is over;
   the deck is dealt from a seed, so a friend can be sent the same cards in
   the same order (js/desafio.js).
   Each card: [id, 'm' myth | 'f' fact, the claim, why, its picture
   (f: a face, s: a drawn scene, b: a flag), where and when].
═══════════════════════════════════════════════════ */
const MF_CARDS = [
  ['napoleao_baixo', 'm', 'Napoleão Bonaparte era muito baixinho.', 'Media cerca de 1,69 m, a altura comum de um francês da época. A fama veio da diferença entre a polegada francesa e a inglesa — e das caricaturas britânicas.', 'f:napoleao', 'França · século XIX'],
  ['vikings_chifres', 'm', 'Os vikings usavam capacetes com chifres.', 'Nenhum capacete viking com chifres foi encontrado. Os chifres nasceram nos figurinos de uma ópera de Wagner, em 1876.', 's:drakkar', 'Escandinávia · século IX'],
  ['terra_plana', 'm', 'Na Idade Média, quase todo mundo achava que a Terra era plana.', 'Os sábios medievais sabiam que a Terra é redonda — os gregos já tinham até calculado o seu tamanho. O mito se espalhou no século XIX.', 's:aula_medieval', 'Europa · Idade Média'],
  ['colombo_redonda', 'm', 'Colombo queria provar que a Terra era redonda.', 'Isso qualquer pessoa instruída já sabia. A discussão era sobre o tamanho: Colombo achava a Terra bem menor do que ela é — e errou feio.', 'f:colombo', 'Espanha · 1492'],
  ['brioches', 'm', 'Maria Antonieta disse: “Que comam brioches!”', 'Não há prova nenhuma. A frase aparece nas Confissões de Rousseau, escritas quando ela ainda era uma menina na Áustria.', 'f:maria_antonieta', 'França · século XVIII'],
  ['gladiadores', 'm', 'Os gladiadores sempre lutavam até a morte.', 'Um gladiador custava caro para treinar e alimentar. Muitas lutas terminavam com o perdedor poupado.', 's:arena_gladiadores', 'Roma antiga'],
  ['muralha_lua', 'm', 'A Grande Muralha da China pode ser vista da Lua a olho nu.', 'Da Lua, nem os continentes mostram contornos assim. Mesmo de uma órbita baixa ela quase não se distingue: é comprida, mas estreita e da cor do terreno.', 'b:CHN', 'China'],
  ['einstein_mat', 'm', 'Einstein foi reprovado em matemática na escola.', 'Ele já dominava o cálculo antes dos 15 anos. Aos 16, não passou no exame de entrada da faculdade em Zurique — por causa das outras matérias; em matemática e física foi brilhante.', 'f:einstein', 'Suíça · 1895'],
  ['piramides_escravos', 'm', 'As pirâmides de Gizé foram erguidas por multidões de escravos.', 'Perto delas foram achadas as vilas dos operários: trabalhadores organizados em turmas, bem alimentados e enterrados com honra ao lado da obra do faraó.', 's:piramides_gize', 'Egito · c. 2500 a.C.'],
  ['nero_violino', 'm', 'Nero tocou violino enquanto Roma ardia.', 'O violino só seria inventado uns 1.450 anos depois. E, segundo Tácito, Nero estava em Âncio quando o fogo começou, e voltou para organizar o socorro.', 'f:nero', 'Roma · 64 d.C.'],
  ['vomitorio', 'm', 'Os romanos tinham uma sala só para vomitar e voltar a comer.', 'O vomitório era a passagem por onde o público “jorrava” para fora do anfiteatro. A sala do vômito é invenção moderna.', 's:forum_romano', 'Roma antiga'],
  ['salem', 'm', 'As acusadas de bruxaria em Salém foram queimadas na fogueira.', 'Em Salém, em 1692, 19 pessoas foram enforcadas e um homem morreu esmagado sob pedras. Ninguém foi queimado.', 'b:USA', 'Salém · 1692'],
  ['bastilha', 'm', 'A Bastilha estava cheia de presos políticos quando foi tomada.', 'Em 14 de julho de 1789 havia só sete presos lá dentro. O povo foi buscar a pólvora — e derrubar um símbolo.', 's:ev_revolucao_francesa', 'Paris · 1789'],
  ['liberdade_verde', 'm', 'A Estátua da Liberdade sempre foi verde.', 'Ela chegou da França cor de cobre, brilhante. O verde é a pátina que o ar e a chuva formaram sobre o metal em cerca de trinta anos.', 'b:USA', 'Nova York · 1886'],
  ['newton_cabeca', 'm', 'Uma maçã caiu na cabeça de Newton, e assim ele descobriu a gravidade.', 'O próprio Newton contou que pensou na gravidade ao ver uma maçã cair no pomar — mas nunca disse que ela caiu na sua cabeça.', 's:macieira_newton', 'Inglaterra · 1666'],
  ['galileu_telescopio', 'm', 'Galileu inventou o telescópio.', 'O telescópio surgiu na Holanda, em 1608. Galileu fez os seus no ano seguinte, melhores, e os apontou para o céu.', 'f:galileu', 'Itália · 1609'],
  ['mozart_salieri', 'm', 'Mozart foi envenenado pelo rival Salieri.', 'Não há prova nenhuma — os dois até trabalharam juntos. A lenda cresceu com uma peça de Púchkin e com o filme Amadeus.', 'f:mozart', 'Viena · 1791'],
  ['pedro_cavalo', 'm', 'D. Pedro I proclamou a Independência montado num belo cavalo.', 'Segundo as testemunhas, ele montava uma besta — uma mula, mais firme na subida da serra. O cavalo é do quadro de Pedro Américo, pintado 66 anos depois.', 'f:dom_pedro_i', 'Ipiranga · 1822'],
  ['tiradentes_barba', 'm', 'Tiradentes foi enforcado com barba e cabelos compridos, como nos quadros.', 'Os condenados tinham a cabeça e a barba raspadas. A imagem de cabelos longos, parecida com a de Cristo, foi criada depois, pela República.', 'f:tiradentes', 'Rio de Janeiro · 1792'],
  ['relogio_dumont', 'm', 'Santos Dumont inventou o relógio de pulso.', 'Já existiam relógios de pulso femininos. Em 1904, Louis Cartier fez um para que ele não tirasse as mãos dos comandos — e a moda pegou entre os homens.', 'f:santos_dumont', 'Paris · 1904'],
  ['polo_massa', 'm', 'Marco Polo trouxe o macarrão da China para a Itália.', 'Já se comia massa na Itália antes da viagem dele: no século XII, um geógrafo árabe descreveu a produção de massa seca na Sicília.', 'f:marco_polo', 'Veneza · 1295'],
  ['pisa', 'm', 'A Torre de Pisa foi construída torta de propósito.', 'Ela começou a inclinar ainda durante a obra, no século XII, porque o solo é mole demais de um lado.', 'b:ITA', 'Pisa · século XII'],
  ['chocolate_doce', 'm', 'Os astecas tomavam chocolate doce, como o de hoje.', 'O xocolatl era amargo, espumoso e às vezes temperado com pimenta. O açúcar só entrou na receita depois, com os espanhóis.', 's:tenochtitlan', 'México · século XV'],
  ['olimpiadas_ouro', 'm', 'Os campeões das Olimpíadas da Grécia antiga ganhavam medalha de ouro.', 'O prêmio em Olímpia era uma coroa de ramos de oliveira. As medalhas só vieram com os Jogos modernos.', 's:estadio_olimpia', 'Olímpia · Antiguidade'],
  ['maias_2012', 'm', 'Os maias previram o fim do mundo para 2012.', 'Em 2012 só se fechava um grande ciclo do calendário maia — como um hodômetro que vira. Nenhum texto maia fala em fim do mundo.', 's:tikal', 'Mesoamérica'],
  ['big_ben', 'm', 'Big Ben é o nome da torre do relógio de Londres.', 'Big Ben é o apelido do grande sino lá dentro. A torre se chama Torre Elizabeth desde 2012.', 'b:ENG', 'Londres · 1859'],
  ['estatuas_brancas', 'm', 'As estátuas gregas eram brancas, como as vemos hoje.', 'Eram pintadas com cores vivas: a pele, as roupas, os olhos. A tinta se perdeu com os séculos, e restou o mármore nu.', 'f:pericles', 'Grécia antiga'],
  ['biblioteca', 'm', 'A Biblioteca de Alexandria foi destruída num único grande incêndio.', 'Ela foi definhando ao longo de séculos: falta de verba, guerras, um incêndio na época de César. Não houve uma noite fatal.', 's:biblioteca_alexandria', 'Alexandria · Antiguidade'],
  ['cesariana', 'm', 'Júlio César nasceu de uma cesariana.', 'Em Roma, a operação só era feita em mães mortas ou morrendo — e a mãe de César, Aurélia, viveu muitos anos depois do parto.', 'f:cesar', 'Roma · 100 a.C.'],
  ['cesar_imperador', 'm', 'Júlio César foi o primeiro imperador de Roma.', 'César foi ditador, e Roma ainda era uma república. O primeiro imperador foi o seu herdeiro, Augusto, em 27 a.C.', 'f:augusto', 'Roma · século I a.C.'],
  ['esfinge_nariz', 'm', 'Soldados de Napoleão arrancaram o nariz da Esfinge a tiros de canhão.', 'Desenhos feitos décadas antes de Napoleão chegar ao Egito já mostram a Esfinge sem o nariz.', 's:piramides_gize', 'Egito · 1798'],
  ['peste_bico', 'm', 'Na Peste Negra de 1348, os médicos usavam máscaras com bico de pássaro.', 'A máscara de bico só aparece no século XVII, quase trezentos anos depois. Na Peste Negra não havia esse traje.', 's:peste_negra', 'Europa · 1348'],
  ['sexta13', 'm', 'O azar da sexta-feira 13 vem da prisão dos templários.', 'Os templários foram mesmo presos numa sexta, 13 de outubro de 1307 — mas a superstição só aparece no fim do século XIX. A ligação foi inventada depois.', 's:ev_cruzadas', 'França · 1307'],
  ['caligula', 'm', 'O imperador Calígula nomeou o seu cavalo cônsul de Roma.', 'Segundo Suetônio, ele só planejava fazer isso — talvez para humilhar o Senado. O cavalo Incitato tinha estábulo de mármore, mas nunca teve cargo.', 's:loba_capitolina', 'Roma · 40 d.C.'],
  ['medieval_agua', 'm', 'Na Idade Média, quase ninguém bebia água.', 'Bebia-se água, sim — de poços, fontes e rios. A cerveja fraca era comum, mas como alimento, não por medo da água.', 's:campo_feudal', 'Europa · Idade Média'],
  ['vikings_sujos', 'm', 'Os vikings eram famosos pela falta de higiene.', 'Arqueólogos acham pentes, pinças e limpadores de orelha nos seus túmulos. O sábado, em nórdico antigo, era o “dia de lavar”.', 'b:NOR', 'Escandinávia · século X'],
  ['bruxas_milhoes', 'm', 'Milhões de mulheres foram queimadas como bruxas na Europa.', 'Os historiadores estimam de 40 a 60 mil execuções por bruxaria em três séculos — uma tragédia, mas longe dos milhões.', 'b:GER', 'Europa · séculos XV a XVIII'],
  ['edison_lampada', 'm', 'Thomas Edison criou a primeira lâmpada elétrica.', 'Já havia lâmpadas elétricas décadas antes dele. Em 1879, Edison fez uma que durava muitas horas e podia ser vendida em massa.', 'f:edison', 'Estados Unidos · 1879'],
  ['colombo_asia', 'm', 'Colombo morreu sabendo que tinha chegado a um novo continente.', 'Até morrer, em 1506, ele acreditava ter chegado à Ásia. Quem defendeu que era um “Novo Mundo” foi Américo Vespúcio — e o nome ficou com ele.', 'f:vespucio', 'Espanha · 1506'],
  ['tomate', 'm', 'O molho de tomate é uma receita da Roma antiga.', 'O tomate é americano: só chegou à Itália no século XVI, depois das viagens de Colombo.', 's:tenochtitlan', 'Roma antiga'],
  ['guindaste', 'm', 'Os cavaleiros medievais precisavam de um guindaste para subir no cavalo.', 'Uma armadura completa pesava uns 25 kg, bem distribuídos no corpo. Os cavaleiros montavam sozinhos — e até corriam e pulavam com ela.', 's:torre_branca', 'Europa · Idade Média'],
  ['colombo_espanhol', 'm', 'Cristóvão Colombo era espanhol.', 'Ele era de Gênova, na Itália. Navegou para os reis da Espanha depois que Portugal recusou o seu plano.', 'f:colombo', 'Gênova · 1451'],
  ['cabral_primeiro', 'm', 'Pedro Álvares Cabral foi o primeiro europeu a chegar ao litoral do Brasil.', 'Meses antes, em janeiro de 1500, o espanhol Vicente Pinzón já tinha tocado o litoral do Nordeste. Mas foi a viagem de Cabral que tomou posse da terra para Portugal.', 'f:cabral', 'Brasil · 1500'],
  ['titanic', 'm', 'O Titanic foi o maior naufrágio da História.', 'Em 1945, o navio alemão Wilhelm Gustloff foi afundado com mais de 9 mil mortos — seis vezes mais que o Titanic.', 's:titanic', 'Atlântico · 1912'],
  ['trezentos', 'm', 'Só 300 espartanos enfrentaram os persas nas Termópilas.', 'Eram 300 espartanos, mas com eles lutavam milhares de outros gregos; no último dia, cerca de 700 téspios ficaram ao seu lado até o fim.', 'f:leonidas', 'Grécia · 480 a.C.'],
  ['socrates_livros', 'm', 'Sócrates escreveu muitos livros de filosofia.', 'Ele não escreveu nada. Conhecemos as suas ideias pelos diálogos do discípulo Platão e pelos textos de Xenofonte.', 'f:socrates', 'Atenas · século V a.C.'],
  ['alexandre_velho', 'm', 'Alexandre, o Grande, morreu velho, cansado de tantas conquistas.', 'Ele morreu na Babilônia aos 32 anos, depois de levar o seu exército do Egito até a Índia.', 'f:alexandre', 'Babilônia · 323 a.C.'],
  ['incas_milhares', 'm', 'Os incas foram vencidos por um exército de milhares de espanhóis.', 'Pizarro tinha cerca de 170 homens em Cajamarca, em 1532. Pesaram as armas, os cavalos, as epidemias e uma guerra civil entre os incas.', 'f:atahualpa', 'Peru · 1532'],

  ['cleopatra_lua', 'f', 'Cleópatra viveu mais perto da chegada do homem à Lua do que da construção da Grande Pirâmide.', 'A pirâmide de Quéops foi erguida por volta de 2560 a.C.; Cleópatra morreu em 30 a.C., mais de 2.500 anos depois. Dela até 1969 são menos de 2.000.', 'f:cleopatra', 'Egito · 30 a.C.'],
  ['oxford', 'f', 'A Universidade de Oxford é mais antiga que a cidade asteca de Tenochtitlán.', 'Já se ensinava em Oxford por volta de 1096. Tenochtitlán foi fundada em 1325.', 's:aula_medieval', 'Inglaterra · século XI'],
  ['roma_maome', 'f', 'O Império Romano ainda existia quando Maomé nasceu.', 'A metade oriental do império, com capital em Constantinopla, durou até 1453. Maomé nasceu por volta de 570.', 's:hagia_sofia', 'Constantinopla · século VI'],
  ['cem_anos', 'f', 'A Guerra dos Cem Anos durou mais de cem anos.', 'Foram 116 anos, de 1337 a 1453 — com muitas tréguas no meio.', 's:ev_guerra_cem_anos', 'França e Inglaterra · 1337'],
  ['guerra_curta', 'f', 'A guerra mais curta da História durou menos de uma hora.', 'Em 27 de agosto de 1896, a Guerra Anglo-Zanzibari durou cerca de 40 minutos: os navios britânicos bombardearam o palácio até o sultão fugir.', 's:dhow_oceano', 'Zanzibar · 1896'],
  ['dez_dias', 'f', 'Em 1582, dez dias foram apagados do calendário.', 'Para acertar o calendário com o Sol, o papa Gregório XIII mandou pular do dia 4 direto para o dia 15 de outubro.', 'b:ITA', 'Roma · 1582'],
  ['outubro', 'f', 'A Revolução de Outubro, na Rússia, aconteceu em novembro.', 'A Rússia ainda usava o calendário juliano: o 25 de outubro de lá era o 7 de novembro do resto da Europa.', 's:ev_revolucao_russa', 'Rússia · 1917'],
  ['vikings_america', 'f', 'Os vikings chegaram à América quase 500 anos antes de Colombo.', 'Há restos de um povoado nórdico em L’Anse aux Meadows, no Canadá, de por volta do ano 1000.', 'f:leif', 'Terra Nova · c. 1000'],
  ['lincoln_luta', 'f', 'Abraham Lincoln está no Hall da Fama da luta livre dos Estados Unidos.', 'Na juventude, em Illinois, ele era um lutador temido — dizem que perdeu uma única vez. Recebeu a homenagem em 1992.', 'f:lincoln', 'Illinois · 1830'],
  ['eiffel', 'f', 'A Torre Eiffel deveria ter sido desmontada depois de 20 anos.', 'A licença era só até 1909. Ela se salvou porque virou uma ótima antena para o rádio e o telégrafo.', 'b:FRA', 'Paris · 1889'],
  ['urina', 'f', 'Os romanos usavam urina para lavar roupa.', 'A amônia da urina tirava as manchas. As lavanderias recolhiam urina em vasos nas ruas — e o imperador Vespasiano chegou a cobrar imposto sobre ela.', 's:forum_romano', 'Roma antiga'],
  ['porcos', 'f', 'Na Idade Média, animais eram levados a julgamento.', 'Porcos, ratos e até insetos foram processados em tribunais. Em 1386, em Falaise, na França, uma porca foi condenada e executada vestida de gente.', 's:campo_feudal', 'França · 1386'],
  ['rio_capital', 'f', 'O Rio de Janeiro já foi a sede do governo de Portugal.', 'De 1808 a 1821, com a corte fugida de Napoleão, todo o império português foi governado do Rio.', 's:corte_1808', 'Rio de Janeiro · 1808'],
  ['pedro2_foto', 'f', 'D. Pedro II foi um dos primeiros fotógrafos do Brasil.', 'Aos 14 anos, em 1840, comprou um daguerreótipo, poucos meses depois de a novidade chegar ao país. Deixou uma enorme coleção de fotos.', 'f:dom_pedro_ii', 'Rio de Janeiro · 1840'],
  ['pedro2_telefone', 'f', 'D. Pedro II testou o telefone de Graham Bell.', 'Foi na Exposição da Filadélfia, em 1876. Conta-se que, ao ouvir a voz, ele exclamou: “Meu Deus, isto fala!”', 's:telefone_bell', 'Filadélfia · 1876'],
  ['aurea', 'f', 'A Lei Áurea, que aboliu a escravidão no Brasil, tinha só dois artigos.', 'Art. 1º: é declarada extinta a escravidão no Brasil. Art. 2º: revogam-se as disposições em contrário. A princesa Isabel a assinou em 13 de maio de 1888.', 'f:princesa_isabel', 'Rio de Janeiro · 1888'],
  ['brasil_ultimo', 'f', 'O Brasil foi o último país das Américas a abolir a escravidão.', 'A Lei Áurea só veio em 1888, depois de mais de três séculos de escravidão e de anos de luta abolicionista.', 's:ev_abolicao_br', 'Brasil · 1888'],
  ['gregos_nus', 'f', 'Os atletas das Olimpíadas antigas competiam nus.', 'A palavra “ginásio” vem do grego gymnós, que quer dizer nu.', 's:estadio_olimpia', 'Olímpia · Antiguidade'],
  ['purpura', 'f', 'Na Antiguidade, o tecido roxo era um luxo de reis e imperadores.', 'A púrpura de Tiro saía de milhares de moluscos para tingir um único manto — e custava uma fortuna. Em Roma, virou a cor dos imperadores.', 's:navio_fenicio', 'Tiro · Antiguidade'],
  ['quipu', 'f', 'Os incas registravam números com nós em cordas.', 'Os quipus guardavam contas, censos e tributos: o tipo de nó e a sua posição na corda davam o valor.', 's:muralha_inca', 'Andes · século XV'],
  ['gengis_dna', 'f', 'Um estudo genético sugere que milhões de homens vivos descendem de Gêngis Khan.', 'Em 2003, cientistas acharam uma mesma linhagem do cromossomo Y em cerca de 16 milhões de homens da Ásia — provavelmente a da família dele.', 'f:gengis', 'Mongólia · século XIII'],
  ['monalisa', 'f', 'A Mona Lisa já foi roubada do Louvre.', 'Em 1911, um vidraceiro que tinha trabalhado no museu a levou escondida debaixo do avental. Ela só voltou dois anos depois — e o sumiço a deixou ainda mais famosa.', 'f:leonardo', 'Paris · 1911'],
  ['leonardo_espelho', 'f', 'Leonardo da Vinci escrevia de trás para a frente.', 'Os seus cadernos estão em escrita espelhada, da direita para a esquerda: leem-se bem diante de um espelho.', 's:maquina_voadora', 'Itália · c. 1500'],
  ['romanos_zero', 'f', 'Os algarismos romanos não tinham o zero.', 'Não há zero entre I, V, X, L, C, D e M. O zero como número chegou à Europa vindo da Índia, pelos árabes.', 'f:al_khwarizmi', 'Roma antiga'],
  ['arabicos', 'f', 'Os chamados algarismos arábicos nasceram na Índia.', 'Os sábios árabes os aprenderam com os indianos e os levaram até a Europa — daí o nome.', 's:casa_sabedoria', 'Índia · século VI'],
  ['einstein_israel', 'f', 'Albert Einstein foi convidado para ser presidente de Israel.', 'Em 1952 lhe ofereceram o cargo. Ele recusou, dizendo que não tinha jeito nem experiência para lidar com pessoas.', 'f:einstein', 'Israel · 1952'],
  ['curie_dois', 'f', 'Marie Curie ganhou dois Prêmios Nobel, em ciências diferentes.', 'O de Física, em 1903, e o de Química, em 1911. Até hoje é a única pessoa premiada em duas ciências diferentes.', 'f:marie_curie', 'Paris · 1911'],
  ['curie_cadernos', 'f', 'Os cadernos de Marie Curie ainda são radioativos.', 'Eles ficam em caixas de chumbo em Paris. Quem quer consultá-los assina um termo de responsabilidade e usa roupa de proteção.', 's:radio_curie', 'Paris · hoje'],
  ['gatos', 'f', 'No Egito antigo, gatos eram mumificados.', 'Milhares de múmias de gato foram encontradas. Eles eram ligados à deusa Bastet, e matar um podia custar a vida.', 's:cheia_do_nilo', 'Egito antigo'],
  ['roseta', 'f', 'A Pedra de Roseta tem o mesmo texto escrito de três formas.', 'Em hieróglifos, em demótico e em grego. Comparando o grego com os hieróglifos, Champollion os decifrou em 1822.', 's:decifracao', 'Egito · 196 a.C.'],
  ['pao_japao', 'f', 'A palavra japonesa para pão, pan, veio do português.', 'Os portugueses chegaram ao Japão em 1543 e deixaram palavras como pan — e, dizem, a receita que virou o tempurá.', 'b:JPN', 'Japão · 1543'],
  ['tregua_natal', 'f', 'Na Primeira Guerra, soldados inimigos pararam de lutar para comemorar o Natal.', 'No Natal de 1914, em vários trechos da frente ocidental, alemães e britânicos cantaram, trocaram presentes e até jogaram bola na terra de ninguém.', 's:ev_primeira_guerra', 'Bélgica · 1914'],
  ['cravos', 'f', 'A Revolução dos Cravos derrubou a ditadura em Portugal quase sem tiros.', 'Em 25 de abril de 1974 os militares saíram às ruas, e o povo pôs cravos nos canos das espingardas. Morreram poucas pessoas.', 'b:POR', 'Lisboa · 1974'],
  ['piramide_branca', 'f', 'A Grande Pirâmide já foi branca e brilhante.', 'Ela era revestida de calcário branco polido, que refletia o sol. A maior parte dessas pedras foi levada mais tarde para construções do Cairo.', 's:piramides_gize', 'Egito · c. 2560 a.C.'],
  ['concreto', 'f', 'O concreto romano ficava mais forte debaixo d’água.', 'Misturado com cinza vulcânica, ele reage com a água do mar e cria cristais novos. Há portos romanos de pé há 2.000 anos.', 's:corvo_romano', 'Roma antiga'],
  ['salvador', 'f', 'Salvador foi a primeira capital do Brasil.', 'Foi a sede do governo de 1549 a 1763, quando a capital passou para o Rio de Janeiro.', 's:salvador_colonial', 'Bahia · 1549'],
  ['brasilia', 'f', 'Brasília foi construída em menos de quatro anos.', 'As obras começaram em 1956 e a cidade foi inaugurada em 21 de abril de 1960, com milhares de candangos trabalhando dia e noite.', 'f:jk', 'Planalto Central · 1960'],
  ['sao_paulo', 'f', 'A cidade de São Paulo nasceu de um colégio de jesuítas.', 'Em 25 de janeiro de 1554, os padres Manuel da Nóbrega e José de Anchieta fundaram um colégio no planalto de Piratininga.', 's:patio_do_colegio', 'São Paulo · 1554'],
  ['feb', 'f', 'Na Segunda Guerra, soldados brasileiros lutaram na Itália.', 'A Força Expedicionária Brasileira mandou cerca de 25 mil homens. A tomada de Monte Castello, em 1945, ficou famosa.', 's:ev_segunda_guerra', 'Itália · 1944'],
  ['anticitera', 'f', 'Os gregos antigos fizeram uma máquina de engrenagens para prever eclipses.', 'O Mecanismo de Anticítera, achado num naufrágio, tem dezenas de engrenagens de bronze e mais de 2.000 anos.', 's:naufragio_anticitera', 'Grécia · século II a.C.'],
  ['pompeia', 'f', 'Nas paredes de Pompeia há pichações de 2.000 anos.', 'Há propaganda de eleição, recados de amor, piadas e até queixas de clientes — tudo guardado pelas cinzas do Vesúvio.', 's:forum_romano', 'Pompeia · 79 d.C.'],
  ['corte_francesa', 'f', 'A corte da Inglaterra falou francês por quase 300 anos.', 'Depois da conquista normanda, em 1066, a elite falava francês. Só em 1362 o inglês voltou aos tribunais.', 'f:guilherme_conquistador', 'Inglaterra · 1066'],
  ['cleopatra_grega', 'f', 'Cleópatra era de uma família de origem grega.', 'Ela descendia de Ptolomeu, um general macedônio de Alexandre. Foi a primeira da família a aprender a língua egípcia.', 'f:cleopatra', 'Alexandria · século I a.C.'],
  ['laika', 'f', 'O primeiro ser vivo a dar a volta na Terra em órbita foi uma cadela.', 'Laika subiu no Sputnik 2 em 1957. Infelizmente, morreu poucas horas depois do lançamento: não havia como trazê-la de volta.', 's:ev_corrida_espacial', 'União Soviética · 1957'],
  ['beethoven', 'f', 'Beethoven estava praticamente surdo quando estreou a Nona Sinfonia.', 'Em 1824, no fim da estreia, uma cantora teve de virá-lo para a plateia para que ele visse os aplausos.', 'f:beethoven', 'Viena · 1824'],
  ['mumia_nariz', 'f', 'Os egípcios tiravam o cérebro das múmias pelo nariz.', 'Com um gancho de metal, como contou Heródoto — e exames nas múmias confirmam o caminho aberto atrás do nariz.', 's:tumba_aberta', 'Egito antigo'],
  ['catorze_bis', 'f', 'O 14-bis de Santos Dumont voou em Paris diante de testemunhas.', 'Em 23 de outubro de 1906, no campo de Bagatelle, ele voou uns 60 metros; em novembro, 220 metros, e o voo entrou para os registros oficiais.', 's:catorze_bis', 'Paris · 1906'],
  ['darwin', 'f', 'Darwin passou só umas cinco semanas nas ilhas Galápagos.', 'Em 1835 o Beagle ficou por lá cerca de cinco semanas — o bastante para recolher os animais que o fariam pensar por décadas.', 's:beagle_galapagos', 'Galápagos · 1835'],
  ['joana', 'f', 'Joana d’Arc tinha uns 19 anos quando morreu.', 'Ela comandou tropas aos 17 e foi queimada em Rouen, em 1431, com cerca de 19 anos.', 'f:joana_darc', 'França · 1431'],
  ['voto_feminino', 'f', 'As brasileiras conquistaram o direito de votar antes das francesas.', 'O Código Eleitoral de 1932 deu o voto às mulheres no Brasil; na França, elas só votaram pela primeira vez em 1945.', 's:sufragistas', 'Brasil · 1932'],
  ['calendario_rev', 'f', 'A Revolução Francesa criou um calendário com semanas de dez dias.', 'Os meses tinham três “décadas” de dez dias, com nomes como Termidor e Brumário. Durou uns doze anos.', 's:guilhotina', 'França · 1793'],
  ['napoleao_corso', 'f', 'Napoleão nasceu falando corso e nunca perdeu o sotaque no francês.', 'Ele nasceu na Córsega em 1769, um ano depois de a ilha passar para a França. A sua primeira língua era o corso, parente do italiano.', 'f:napoleao', 'Córsega · 1769'],
  ['machado', 'f', 'Machado de Assis era neto de escravizados libertos.', 'Os seus avós paternos eram pardos libertos. Ele cresceu pobre no Morro do Livramento e chegou a fundar a Academia Brasileira de Letras.', 'f:machado', 'Rio de Janeiro · 1839'],
  ['greve_egito', 'f', 'Os artesãos do Egito antigo fizeram greve.', 'Por volta de 1157 a.C., os trabalhadores das tumbas reais cruzaram os braços porque a ração atrasou — é a greve mais antiga registrada.', 's:escriba_egipcio', 'Egito · c. 1157 a.C.'],
  ['castelo_banheiro', 'f', 'Os castelos medievais já tinham banheiros.', 'As latrinas ficavam em nichos na muralha e despejavam direto no fosso — que, por isso, ninguém queria atravessar a nado.', 's:torre_branca', 'Europa · Idade Média'],
  ['oculos', 'f', 'Os óculos foram inventados na Idade Média.', 'Os óculos de leitura surgiram na Itália por volta de 1286; um frade de Pisa falou deles num sermão em 1306.', 's:oficina_artesao', 'Itália · 1286'],
  ['papa_cadaver', 'f', 'Um papa já foi julgado depois de morto.', 'Em 897, o corpo do papa Formoso foi desenterrado, vestido e posto num trono para ser julgado: foi o “Sínodo do Cadáver”.', 's:coroacao_800', 'Roma · 897'],
];
const MF = MF_CARDS.map(([id, v, c, x, pic, t]) => ({ id, v, c, x, pic, t }));
const MF_LIVES = 3;
/* what the score makes you, at the end */
const MF_RANKS = [[0, 'Crédulo', 'Você acreditaria em qualquer pergaminho!'], [3, 'Desconfiado', 'Já torce o nariz para uma boa história.'],
  [6, 'Cético de carteirinha', 'Não engole qualquer lenda.'], [10, 'Caça-mitos', 'As lendas tremem quando você chega.'],
  [15, 'Detetive da História', 'Nenhum boato escapa da sua lupa.'], [25, 'Oráculo da verdade', 'Nem o Oráculo de Delfos acertava tanto.']];
let mf = null;   // { seed, rs, deck, i, lives, score, streak, phase: 'card'|'rev'|'end', pick, ok, log, best0, anim, selo }

function mfRnd() {
  let t = (mf.rs = (mf.rs + 0x6D2B79F5) | 0);
  t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
function mfNew(seed) {
  if (seed == null) seed = (Math.random() * CHAL_SEED_MAX) | 0;
  mf = { seed, rs: seed, deck: MF.map(c => c.id), i: 0, lives: MF_LIVES, score: 0, streak: 0, phase: 'card', pick: null, ok: null, log: [], best0: LS.get('mfBest', 0), anim: 'in' };
  for (let k = mf.deck.length - 1; k > 0; k--) { const j = Math.floor(mfRnd() * (k + 1)); [mf.deck[k], mf.deck[j]] = [mf.deck[j], mf.deck[k]]; }
}
function startMito() {
  isDaily = false; isSurv = false; isMil = false; isRev = false;
  runSelos = [];
  mfNew(chalSeed('f'));
  sc = 'mito';
  go();
}
const mfCard = () => MF.find(c => c.id === mf.deck[mf.i]);

function mfAnswer(v) {
  if (!mf || mf.phase !== 'card') return;
  const c = mfCard();
  mf.pick = v; mf.ok = v === c.v; mf.phase = 'rev'; mf.anim = 'flip'; mf.selo = null;
  mf.log.push({ id: c.id, pick: v, ok: mf.ok });
  if (mf.ok) {
    mf.score++; mf.streak++;
    stats.mfRight = (stats.mfRight || 0) + 1;
    const seen = new Set(LS.get('mfSeen', [])); seen.add(c.id); LS.set('mfSeen', [...seen]); stats.mfSeen = seen.size;
    /* every fifth right, the card's scene goes into the stamp album, if it is drawn and not there yet */
    if (mf.score % 5 === 0 && c.pic.startsWith('s:') && awardSelo(c.pic.slice(2))) mf.selo = c.pic.slice(2);
  } else { mf.streak = 0; mf.lives--; }
  LS.set('stats', stats);
  go();
  try { mf.ok ? snd.correct(Math.min(mf.streak - 1, 8)) : (snd.wrong(), haptic([28, 45, 28])); } catch (e) {}
  /* the stamp comes down once the card has turned */
  setTimeout(() => { if (sc !== 'mito' || !mf || mf.phase !== 'rev') return;
    try { snd.stamp(); } catch (e) {}
    const el = document.querySelector('.mf-verdict');
    try { if (mf.ok) { fx.splash(el, c.v === 'f' ? '#3A9C6E' : '#B3402F', 9); streakMark(mf.streak); } else fx.edge('#B3402F', false); } catch (e) {}
  }, FX_STILL ? 0 : 460);
}
function mfNext() {
  if (!mf || mf.phase !== 'rev') return;
  if (mf.lives <= 0 || mf.i >= mf.deck.length - 1) { if (mf.i >= mf.deck.length - 1 && mf.lives > 0) mf.all = true; return mfEnd(); }
  mf.i++; mf.phase = 'card'; mf.pick = null; mf.ok = null; mf.anim = 'in';
  go();
}
function mfEnd() {
  mf.phase = 'end';
  stats.mfGames = (stats.mfGames || 0) + 1;
  stats.mfBest = Math.max(stats.mfBest || 0, mf.score);
  mf.isBest = mf.score > mf.best0;
  if (mf.isBest) LS.set('mfBest', mf.score);
  LS.set('stats', stats);
  window._newMedals = newMedals();
  _mfImg = null;
  setTimeout(() => { mfImage().then(b => { _mfImg = b; }).catch(() => {}); }, 900);
  setTimeout(() => { try { snd.final(mf.score >= 6); } catch (e) {} }, 200);
  go();
  if (mf.isBest && mf.score >= 6) setTimeout(() => { try { fx.rain(mf.score >= 15 ? 80 : 36, ['#B3402F', '#3A9C6E', '#E0B968']); } catch (e) {} }, 350);
}

/* a card's picture: a face, a drawn scene, a flag */
function mfPic(p) {
  const [k, id] = [p.slice(0, 1), p.slice(2)];
  if (k === 'f') { const f = PL.find(x => x.id === id); if (f && f.img) return `<span class="mf-pic mf-p-face"><img src="${f.img}" alt="" aria-hidden="true" draggable="false"></span>`; }
  if (k === 's' && SCENE[id]) return `<span class="mf-pic mf-p-scene">${sceneSvg({ id }, 300)}</span>`;
  if (k === 'b' && FLAGS[id]) return `<span class="mf-pic mf-p-flag"><svg viewBox="0 0 9 6" preserveAspectRatio="none" aria-hidden="true">${FLAGS[id]}</svg></span>`;
  return `<span class="mf-pic mf-p-scene">${ART.hourglass(200)}</span>`;
}
/* three wax seals: a miss breaks one */
const MF_SEAL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.6l2.3 1.7 2.8-.4 1.2 2.6 2.6 1.2-.4 2.8 1.7 2.3-1.7 2.3.4 2.8-2.6 1.2-1.2 2.6-2.8-.4L12 22.4l-2.3-1.7-2.8.4-1.2-2.6-2.6-1.2.4-2.8L1.6 12l1.7-2.3-.4-2.8 2.6-1.2 1.2-2.6 2.8.4z"/><circle cx="12" cy="12" r="5.6" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.2"/></svg>';
const mfSeals = () => `<span class="mf-seals" aria-label="${mf.lives} de ${MF_LIVES} vidas">${Array.from({ length: MF_LIVES }, (_, k) =>
  `<i class="mf-seal${k >= mf.lives ? ' is-off' : ''}${k === mf.lives && mf.phase === 'rev' && !mf.ok ? ' is-breaking' : ''}">${MF_SEAL}</i>`).join('')}</span>`;
const mfWord = v => v === 'f' ? 'Fato' : 'Mito';

function mitoHtml() {
  if (!mf) mfNew();
  if (mf.phase === 'end') return mitoEndHtml();
  const c = mfCard(), rev = mf.phase === 'rev';
  const best = Math.max(mf.best0, mf.score);
  return `
  <div class="pg mf-pg${rev ? ' is-rev' : ''}">
    ${topbar('Mito ou fato?', fromGab ? 'bgab' : '')}
    <div class="mf-head">
      ${mfSeals()}
      <span class="mf-run"><b class="num">${mf.score}</b> ${mf.score === 1 ? 'certa' : 'certas'}<small>Recorde ${best}</small></span>
    </div>
    <div class="mf-stage">
      <i class="mf-under mf-under-2" aria-hidden="true"></i><i class="mf-under" aria-hidden="true"></i>
      <div id="mf-card" class="mf-card${rev ? ' is-turned' : ''}${mf.anim === 'flip' ? ' is-flipping' : mf.anim === 'in' ? ' is-coming' : ''}">
        <div class="mf-face mf-front"${rev ? ' aria-hidden="true"' : ''}>
          ${mfPic(c.pic)}
          <span class="mf-tag">${_esc(c.t)}</span>
          <p class="mf-claim">${_esc(c.c)}</p>
          <span class="mf-hint mf-hint-m" aria-hidden="true">Mito</span><span class="mf-hint mf-hint-f" aria-hidden="true">Fato</span>
        </div>
        <div class="mf-face mf-back"${rev ? ' role="status"' : ' aria-hidden="true"'}>
          ${rev ? `<span class="mf-verdict is-${c.v}">${mfWord(c.v)}</span>
          <span class="mf-said ${mf.ok ? 'good' : 'bad'}">${mf.ok ? `${ICON.check('currentColor', 12)} Você acertou` : `${ICON.cross('currentColor', 12)} Você disse ${mfWord(mf.pick).toLowerCase()}`}</span>
          <p class="mf-claim-sm">${_esc(c.c)}</p>
          <p class="mf-x">${_esc(c.x)}</p>
          ${mf.selo ? seloWonLine(mf.selo) : ''}` : ''}
        </div>
      </div>
    </div>
    ${rev ? `<div class="mf-btns"><button id="mf-next" class="btn ${mf.lives > 0 ? 'btn-brass' : 'btn-ghost'} btn-lg" type="button">${mf.lives > 0 && !(mf.i >= mf.deck.length - 1) ? `Próxima ${ICON.back('currentColor', 12).replace('<svg', '<svg style="transform:scaleX(-1)"')}` : 'Ver resultado'}</button></div>`
    : `<div class="mf-btns">
        <button id="mf-m" class="mf-btn is-m" type="button">${ICON.cross('currentColor', 16)}<b>Mito</b></button>
        <span class="mf-or" aria-hidden="true">arraste<br>a carta</span>
        <button id="mf-f" class="mf-btn is-f" type="button">${ICON.check('currentColor', 16)}<b>Fato</b></button>
      </div>`}
  </div>`;
}

function mitoEndHtml() {
  const n = mf.score, [, rank, line] = MF_RANKS.filter(r => n >= r[0]).pop();
  const miss = mf.log.filter(l => !l.ok).slice(-3).map(l => MF.find(c => c.id === l.id));
  return `
  <div class="pg pg-center mf-end">
    <div class="eyebrow">Mito ou fato?</div>
    <div class="mf-badge">
      <span class="mf-badge-k">Sociedade dos Céticos</span>
      ${wreathed(n >= 10, `<div class="display prize-pop brass mf-end-n">${n}</div>`)}
      <span class="mf-badge-u">${n === 1 ? 'acerto' : 'acertos'}</span>
      <span class="mf-rank">${rank}</span>
      <small>${mf.all ? 'Você passou por todas as cartas!' : line}</small>
    </div>
    ${chalBanner() || `<p class="small muted">${mf.isBest ? 'Seu novo recorde!' : `Recorde: ${mf.best0}`}</p>`}
    ${miss.length ? `<div class="mf-miss"><span class="mf-miss-k">${miss.length === 1 ? 'O que te pegou' : 'Os que te pegaram'}</span>
      ${miss.map(c => `<span class="mf-miss-row"><b class="is-${c.v}">${mfWord(c.v)}</b><span>${_esc(c.c)}</span></span>`).join('')}</div>` : ''}
    ${selosStrip()}
    ${medalChips()}
    <div class="foot-row" style="margin-top:6px;">
      <button id="mf-share" class="btn btn-ghost btn-sm" type="button">${chalMine() ? 'Desafiar' : 'Compartilhar'}</button>
      <button id="mf-again" class="btn btn-brass" type="button">De novo</button>
      <button id="bhome" class="btn btn-ghost btn-sm" type="button">Início</button>
    </div>
  </div>`;
}
const mfShareText = () => {
  const [, rank] = MF_RANKS.filter(r => mf.score >= r[0]).pop();
  const row = mf.log.slice(0, 24).map(l => l.ok ? '🟩' : '🟥').join('') + (mf.log.length > 24 ? '…' : '');
  return `Mito ou fato? 🔍 History Quiz\n${row}\n${mf.score} ${mf.score === 1 ? 'acerto' : 'acertos'} · ${rank}${mf.isBest ? ' · recorde!' : ''}\n${chalShareTail(chalMine())}`;
};

/* the result as a picture to share: the membership card of the Sociedade dos Céticos — the score,
   the rank, a square for each card answered, the claim that got you, and the society's round stamp */
let _mfImg = null;
async function mfImage() {
  const n = mf.score, [, rank] = MF_RANKS.filter(r => n >= r[0]).pop();
  const miss = mf.log.filter(l => !l.ok).map(l => MF.find(c => c.id === l.id)).pop();
  try { await Promise.all(['italic 700 84px Fraunces', '700 250px Fraunces', 'italic 500 40px Fraunces', '800 30px Archivo'].map(f => document.fonts.load(f))); } catch (e) {}
  const W = 1080, H = 1350, c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d');
  const bg = g.createRadialGradient(W / 2, H * .45, 60, W / 2, H / 2, H * .85);
  bg.addColorStop(0, '#5A3620'); bg.addColorStop(1, '#25150B');
  g.fillStyle = bg; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 1800; i++) { g.fillStyle = `rgba(0,0,0,${(.04 + Math.random() * .08).toFixed(3)})`; g.fillRect(Math.random() * W, Math.random() * H, 2, 2); }
  /* the index card, a little askew, ruled like a library's */
  const cw = 900, ch = 1150;
  g.save(); g.translate(W / 2, H / 2); g.rotate(-.018);
  g.shadowColor = 'rgba(0,0,0,.55)'; g.shadowBlur = 40; g.shadowOffsetY = 18;
  g.fillStyle = '#F6EFDC'; g.fillRect(-cw / 2, -ch / 2, cw, ch);
  g.shadowColor = 'transparent';
  g.fillStyle = 'rgba(70,110,160,.2)'; for (let y = -ch / 2 + 150; y < ch / 2 - 20; y += 52) g.fillRect(-cw / 2, y, cw, 2.5);
  g.fillStyle = 'rgba(190,60,50,.4)'; g.fillRect(-cw / 2 + 70, -ch / 2, 3, ch);
  const text = (t, font, col, y, ls, x) => { g.font = font; g.fillStyle = col; g.textAlign = 'center'; try { g.letterSpacing = ls || '0px'; } catch (e) {} g.fillText(t, x || 0, y); };
  text('SOCIEDADE DOS CÉTICOS', '800 34px Archivo', '#7B5A22', -ch / 2 + 92, '9px');
  text('carteira de sócio · Mito ou fato?', 'italic 500 34px Fraunces', '#6B5B45', -ch / 2 + 140);
  text(String(n), '700 250px Fraunces', '#2A241C', -ch / 2 + 410);
  text(n === 1 ? 'ACERTO' : 'ACERTOS', '800 28px Archivo', '#8C7A60', -ch / 2 + 462, '7px');
  text(rank, 'italic 700 84px Fraunces', '#2A241C', -ch / 2 + 580);
  /* a square for every card answered, in rows */
  const sq = 34, gap = 10, per = 18, rows = mf.log.slice(0, per * 2), x0 = -((Math.min(rows.length, per)) * (sq + gap) - gap) / 2;
  rows.forEach((l, i) => { g.fillStyle = l.ok ? '#2E7D4F' : '#B3402F'; g.fillRect(x0 + (i % per) * (sq + gap), -ch / 2 + 630 + Math.floor(i / per) * (sq + gap), sq, sq); });
  /* the claim that got you, word-wrapped */
  if (miss) {
    text('O QUE ME PEGOU', '800 26px Archivo', '#8C7A60', -ch / 2 + 760, '6px');
    g.font = 'italic 500 40px Fraunces'; try { g.letterSpacing = '0px'; } catch (e) {}
    const words = ('“' + miss.c + '”').split(' '), lines = []; let line = '';
    words.forEach(w => { const t = line ? line + ' ' + w : w; if (g.measureText(t).width > 660 && line) { lines.push(line); line = w; } else line = t; });
    lines.push(line);
    lines.slice(0, 3).forEach((l, i) => text(l, 'italic 500 40px Fraunces', '#2A241C', -ch / 2 + 815 + i * 52));
    text('era ' + mfWord(miss.v).toUpperCase(), '800 30px Archivo', miss.v === 'f' ? '#2E7D4F' : '#B3402F', -ch / 2 + 815 + Math.min(3, lines.length) * 52 + 14, '6px');
  } else text('Nenhuma lenda me enganou.', 'italic 500 42px Fraunces', '#2A241C', -ch / 2 + 815);
  /* the society's stamp, round, in red ink */
  g.save(); g.translate(cw / 2 - 125, ch / 2 - 115); g.rotate(-.3); g.globalAlpha = .8;
  g.strokeStyle = '#B3402F'; g.lineWidth = 7; g.beginPath(); g.arc(0, 0, 108, 0, Math.PI * 2); g.stroke();
  g.lineWidth = 3; g.beginPath(); g.arc(0, 0, 74, 0, Math.PI * 2); g.stroke();
  const ring = 'HISTORY QUIZ · MITO OU FATO · ';
  g.font = '800 21px Archivo'; g.fillStyle = '#B3402F'; g.textAlign = 'center'; try { g.letterSpacing = '0px'; } catch (e) {}
  [...ring].forEach((ch2, i) => { g.save(); g.rotate(i / ring.length * Math.PI * 2); g.fillText(ch2, 0, -84); g.restore(); });
  g.font = '800 34px Archivo'; g.fillText('SÓCIO', 0, 4); g.font = '700 22px Archivo'; g.fillText('Nº ' + (mf.seed % 9000 + 1000), 0, 34);
  g.restore();
  g.restore();
  text('tdosreis.github.io/history-quiz', '700 26px Archivo', 'rgba(241,228,196,.75)', H - 34, '2px', W / 2);
  return new Promise(ok => c.toBlob(ok, 'image/png'));
}

/* the card follows the finger: to the left it reads Mito, to the right Fato; let go far enough and that is the answer.
   A turned card is thrown away the same way, and the next one comes up from the pile. */
function mfThrow(dir) {
  const el = document.getElementById('mf-card');
  if (!el || FX_STILL) return mfNext();
  el.style.transition = 'transform .26s cubic-bezier(.4, 0, .8, .6), opacity .26s';
  el.style.transform = `translateX(${dir * 130}%) rotate(${dir * 18}deg)${mf.phase === 'rev' ? ' rotateY(180deg)' : ''}`;
  el.style.opacity = '0';
  try { snd.swipe(); } catch (e) {}
  setTimeout(mfNext, 220);
}
function wireMito() {
  if (!mf) return;
  const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  const ready = tapArmed();
  on('mf-m', () => { if (ready()) mfAnswer('m'); });
  on('mf-f', () => { if (ready()) mfAnswer('f'); });
  on('mf-next', () => { if (ready()) mfThrow(mf.ok === false ? -1 : 1); });
  on('mf-again', () => { snd.select(); startMito(); });
  on('mf-share', () => {
    const txt = mfShareText();
    if (_mfImg && navigator.canShare) {
      const file = new File([_mfImg], 'mito-ou-fato.png', { type: 'image/png' });
      if (navigator.canShare({ files: [file] })) { navigator.share({ files: [file], text: txt }).catch(() => {}); return; }
    }
    if (navigator.share) navigator.share({ text: txt }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(txt).then(() => {
      const b = document.getElementById('mf-share'); if (b) { b.dataset.l = b.dataset.l || b.textContent; b.textContent = 'Copiado!'; setTimeout(() => { b.textContent = b.dataset.l; }, 1600); } }).catch(() => {});
  });
  mf.anim = null;
  const el = document.getElementById('mf-card');
  if (!el || mf.phase === 'end') return;
  let x0 = null, y0 = 0, dx = 0, id = null;
  const turned = () => mf.phase === 'rev';
  const set = d => {
    el.style.transform = `translateX(${d}px) rotate(${d / 18}deg)${turned() ? ' rotateY(180deg)' : ''}`;
    if (!turned()) { el.style.setProperty('--mf-m', Math.max(0, Math.min(1, -d / 90)).toFixed(2)); el.style.setProperty('--mf-f', Math.max(0, Math.min(1, d / 90)).toFixed(2)); }
  };
  el.addEventListener('pointerdown', e => {
    if (e.button > 0) return;
    x0 = e.clientX; y0 = e.clientY; dx = 0; id = e.pointerId;
    el.style.transition = 'none'; el.style.animation = 'none';
  });
  el.addEventListener('pointermove', e => {
    if (x0 == null || e.pointerId !== id) return;
    dx = e.clientX - x0;
    if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(e.clientY - y0)) { try { el.setPointerCapture(id); } catch (er) {} }
    set(dx);
  });
  const up = e => {
    if (x0 == null || e.pointerId !== id) return;
    x0 = null;
    if (Math.abs(dx) > 80) {
      if (turned()) return mfThrow(dx < 0 ? -1 : 1);
      if (ready()) return mfAnswer(dx < 0 ? 'm' : 'f');
    }
    el.style.transition = 'transform .3s cubic-bezier(.2, 1.4, .4, 1)'; set(0);
    el.style.setProperty('--mf-m', 0); el.style.setProperty('--mf-f', 0);
  };
  el.addEventListener('pointerup', up);
  el.addEventListener('pointercancel', up);
}
/* the keyboard: left is myth, right is fact; Enter (or either arrow, on a turned card) goes on */
document.addEventListener('keydown', ev => {
  if (sc !== 'mito' || !mf || ev.altKey || ev.ctrlKey || ev.metaKey) return;
  if (mf.phase === 'card' && ev.key === 'ArrowLeft') { ev.preventDefault(); mfAnswer('m'); }
  else if (mf.phase === 'card' && ev.key === 'ArrowRight') { ev.preventDefault(); mfAnswer('f'); }
  else if (mf.phase === 'rev' && (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight' || (ev.key === 'Enter' && document.activeElement === document.body))) { ev.preventDefault(); mfThrow(ev.key === 'ArrowLeft' ? -1 : 1); }
});
