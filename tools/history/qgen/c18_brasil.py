"""História do Brasil: da Terra de Santa Cruz à Nova República — all formats mixed."""
from qdsl import Cat

c = Cat('brasil', 'História do Brasil', '🇧🇷', 'Da Terra de Santa Cruz à Nova República', '#1F7A4D', order=59)

# ── Texto: seis alternativas ──
# d1
c.T('Na política do café com leite, durante a Primeira República, quais estados se revezavam no controle da Presidência?', 'São Paulo e Minas Gerais',
    ['Rio de Janeiro e Minas Gerais', 'São Paulo e Rio Grande do Sul', 'Bahia e Pernambuco', 'São Paulo e Rio de Janeiro', 'Minas Gerais e Rio Grande do Sul'],
    d=1, crest='brasil_republica', src=('pt', 'Política do café com leite', ['Minas Gerais', 'São Paulo']),
    x='O revezamento não era perfeito: o gaúcho Hermes da Fonseca e o paraibano Epitácio Pessoa também chegaram à Presidência nesse período.')
c.T('Qual estado pegou em armas contra o governo de Getúlio Vargas na Revolução Constitucionalista de 1932?', 'São Paulo',
    ['Minas Gerais', 'Rio Grande do Sul', 'Rio de Janeiro', 'Pernambuco', 'Bahia'], d=1, who='getulio',
    src=('pt', 'Revolução Constitucionalista de 1932', ['9 de julho']),
    x='O levante começou em 9 de julho, hoje feriado estadual paulista; os rebeldes exigiam uma nova Constituição e resistiram por quase três meses.')
c.T('Qual político mineiro foi eleito presidente pelo Colégio Eleitoral, em 1985, mas morreu antes de tomar posse?', 'Tancredo Neves',
    ['José Sarney', 'Ulysses Guimarães', 'Paulo Maluf', 'Franco Montoro', 'Leonel Brizola'], d=1, crest='brasil_republica',
    src=('pt', 'Tancredo Neves', ['1985', 'Colégio Eleitoral']),
    x='Adoeceu na véspera da posse e morreu em 21 de abril de 1985, data da morte de Tiradentes; quem governou foi o vice, José Sarney.')
c.T('Os "caras-pintadas" foram às ruas em 1992 para pedir o impeachment de qual presidente?', 'Fernando Collor',
    ['José Sarney', 'Itamar Franco', 'Fernando Henrique Cardoso', 'João Figueiredo', 'Tancredo Neves'], d=1, stad='catedral_brasilia',
    src=('pt', 'Fernando Collor de Mello', ['impeachment', '1992']),
    x='Foi o primeiro presidente eleito pelo voto direto depois da ditadura; renunciou no dia do julgamento no Senado, mas teve os direitos políticos suspensos assim mesmo.')
c.T('Como eram chamadas as comunidades formadas por pessoas escravizadas que fugiam do cativeiro, como Palmares?', 'Quilombos',
    ['Senzalas', 'Engenhos', 'Missões', 'Sesmarias', 'Capitanias'], d=1, who='zumbi',
    src=('pt', 'Quilombo', ['Palmares']),
    x='Muitas comunidades quilombolas existem até hoje, e a Constituição de 1988 garante a elas o direito às terras que ocupam.')
c.T('Qual produto da floresta amazônica enriqueceu Manaus e Belém na virada do século XIX para o XX e pagou o luxuoso Teatro Amazonas?', 'Borracha',
    ['Cacau', 'Castanha-do-pará', 'Café', 'Açúcar', 'Algodão'], d=1, icon='coins',
    src=('pt', 'Ciclo da borracha', ['Manaus']),
    x='O ciclo entrou em crise nos anos 1910, quando a borracha das plantações britânicas na Ásia, nascidas de sementes levadas da Amazônia, dominou o mercado.')
c.T('Quem formava a principal mão de obra dos engenhos de açúcar do Nordeste colonial a partir do fim do século XVI?', 'Africanos escravizados',
    ['Imigrantes italianos', 'Imigrantes japoneses', 'Colonos alemães', 'Operários assalariados', 'Prisioneiros holandeses'], d=1, icon='chains',
    src=('pt', 'Escravidão no Brasil', ['açúcar']),
    x='Nas primeiras décadas, os engenhos usaram sobretudo indígenas escravizados; aos poucos, o tráfico atlântico substituiu essa mão de obra.')
c.T('Em que ano a família real portuguesa desembarcou no Brasil, fugindo das tropas de Napoleão?', '1808',
    ['1792', '1800', '1815', '1821', '1822'], d=1, who='dom_joao_vi',
    src=('pt', 'Transferência da corte portuguesa para o Brasil', ['1808']),
    x='A esquadra deixou Lisboa no fim de novembro de 1807; D. João desembarcou primeiro em Salvador, em janeiro, e só em março chegou ao Rio.')
# d2
c.T('Como se chamava a cobrança forçada dos impostos atrasados sobre o ouro, cuja ameaça precipitou a Inconfidência Mineira?', 'Derrama',
    ['Capitação', 'Dízimo', 'Finta', 'Sisa', 'Talha'], d=2, who='tiradentes',
    src=('pt', 'Derrama', ['Inconfidência']),
    x='A Coroa exigia 100 arrobas de ouro por ano; com as minas em declínio, o que faltava seria cobrado de toda a população de uma só vez.')
c.T('Qual revolta popular, iniciada no Grão-Pará em 1835, chegou a tomar Belém e a pôr um governo rebelde no poder?', 'Cabanagem',
    ['Balaiada', 'Sabinada', 'Revolução Farroupilha', 'Revolução Praieira', 'Revolta dos Malês'], d=2, crest='imperio_brasil',
    src=('pt', 'Cabanagem', ['Belém', '1835']),
    x='O nome vem das cabanas de barro e palha onde vivia boa parte dos rebeldes, indígenas, negros e mestiços pobres das margens dos rios.')
c.T('No bipartidarismo imposto pelo regime militar, qual partido fazia a oposição consentida ao governo?', 'MDB',
    ['ARENA', 'UDN', 'PTB', 'PSD', 'PCB'], d=2, crest='brasil_republica',
    src=('pt', 'Aliança Renovadora Nacional', ['MDB']),
    x='O AI-2, de 1965, extinguiu os partidos existentes; a ARENA apoiava o governo e o MDB reunia a oposição tolerada pelo regime.')
c.T('Qual marinheiro, apelidado de "Almirante Negro", liderou a Revolta da Chibata, em 1910?', 'João Cândido',
    ['Marcílio Dias', 'André Rebouças', 'Francisco José do Nascimento', 'Joaquim Nabuco', 'Almirante Tamandaré'], d=2, icon='ship',
    src=('pt', 'Revolta da Chibata', ['João Cândido', '1910']),
    x='Os marinheiros tomaram encouraçados na baía de Guanabara e exigiram o fim dos castigos com chibata, ainda aplicados mais de 20 anos depois da abolição.')
c.T('Quem foi o primeiro governador-geral do Brasil, enviado à Bahia em 1549 para fundar Salvador?', 'Tomé de Sousa',
    ['Duarte da Costa', 'Mem de Sá', 'Martim Afonso de Sousa', 'Duarte Coelho', 'Estácio de Sá'], d=2, crest='brasil_colonia',
    src=('pt', 'Tomé de Sousa', ['1549']),
    x='Com ele chegaram os primeiros jesuítas ao Brasil, liderados pelo padre Manuel da Nóbrega.')
# d3
c.T('Qual conflito, entre 1912 e 1916, opôs sertanejos às forças do governo numa região disputada pelo Paraná e por Santa Catarina?', 'Guerra do Contestado',
    ['Guerra de Canudos', 'Revolução Federalista', 'Sedição de Juazeiro', 'Revolta dos Muckers', 'Revolta da Chibata'], d=3, icon='train',
    src=('pt', 'Guerra do Contestado', ['1912', 'Santa Catarina']),
    x='A ferrovia entre São Paulo e o Rio Grande do Sul expulsou milhares de posseiros das terras à beira dos trilhos, e muitos seguiram líderes religiosos chamados de monges.')
c.T('Qual revolta de 1824, nascida em Pernambuco contra a Constituição outorgada por D. Pedro I, terminou com a execução de Frei Caneca?', 'Confederação do Equador',
    ['Revolução Pernambucana', 'Revolução Praieira', 'Sabinada', 'Balaiada', 'Guerra dos Mascates'], d=3, who='dom_pedro_i',
    src=('pt', 'Confederação do Equador', ['Frei Caneca', '1824']),
    x='Condenado à forca, Frei Caneca acabou fuzilado em 1825, porque nenhum carrasco aceitou enforcá-lo.')
c.T('Qual jesuíta, chamado por Fernando Pessoa de "Imperador da língua portuguesa", defendeu os indígenas do Maranhão e escreveu o Sermão da Sexagésima?', 'Padre Antônio Vieira',
    ['José de Anchieta', 'Manuel da Nóbrega', 'Gregório de Matos', 'Bartolomeu de Gusmão', 'Frei Caneca'], d=3, icon='church',
    src=('en', 'António Vieira', ['1608', '1697']),
    x='Nasceu em Lisboa em 1608, veio criança para a Bahia e morreu em Salvador, em 1697, aos 89 anos.')
c.T('De qual corrente filosófica, muito influente entre os militares republicanos, vem o lema "Ordem e Progresso" da bandeira brasileira?', 'Positivismo',
    ['Iluminismo', 'Liberalismo', 'Marxismo', 'Romantismo', 'Utilitarismo'], d=3, flag='BRA',
    src=('pt', 'Bandeira do Brasil', ['Comte']),
    x='A bandeira republicana foi adotada em 19 de novembro de 1889; o círculo azul mostra o céu do Rio de Janeiro na manhã de 15 de novembro.')
c.T('Qual tratado de 1903, negociado pelo Barão do Rio Branco com a Bolívia, incorporou o Acre ao Brasil?', 'Tratado de Petrópolis',
    ['Tratado de Madri', 'Tratado de Santo Ildefonso', 'Tratado de Ayacucho', 'Tratado de Assunção', 'Tratado de Badajoz'], d=3, who='rio_branco',
    src=('pt', 'Tratado de Petrópolis', ['1903', 'Acre']),
    x='O Brasil pagou 2 milhões de libras esterlinas e se comprometeu a construir a Estrada de Ferro Madeira-Mamoré.')
# d4
c.T('Qual povoação os portugueses fundaram em 1680 na margem norte do Rio da Prata, bem em frente a Buenos Aires?', 'Colônia do Sacramento',
    ['Montevidéu', 'Laguna', 'Rio Grande', 'Maldonado', 'Assunção'], d=4, crest='imperio_portugues',
    src=('pt', 'Colônia do Sacramento', ['1680']),
    x='A colônia trocou de mãos várias vezes entre portugueses e espanhóis; hoje fica no Uruguai, e seu centro histórico é Patrimônio Mundial da UNESCO.')
c.T('Qual lei de 1850 determinou que as terras públicas só poderiam ser obtidas por compra, dificultando o acesso de libertos e imigrantes pobres à propriedade?', 'Lei de Terras',
    ['Lei Eusébio de Queirós', 'Lei do Ventre Livre', 'Lei de Sesmarias', 'Código Comercial', 'Lei Saraiva'], d=4, icon='map',
    src=('pt', 'Lei de Terras', ['1850']),
    x='Foi assinada em 18 de setembro de 1850, duas semanas depois da Lei Eusébio de Queirós, que proibiu o tráfico de africanos.')
c.T('Como ficou conhecida a onda de especulação e inflação do início da República, provocada pela emissão desenfreada de dinheiro na gestão do ministro Rui Barbosa?', 'Encilhamento',
    ['Funding Loan', 'Convênio de Taubaté', 'Crack de 1929', 'Plano Cruzado', 'Milagre econômico'], d=4, who='deodoro',
    src=('pt', 'Encilhamento', ['Rui Barbosa']),
    x='O nome vem do turfe: encilhamento é o momento em que os cavalos são selados e os apostadores fazem suas últimas apostas.')
c.T('Qual revolta liberal de 1848, em Pernambuco, foi a última das grandes rebeliões provinciais do Império?', 'Revolução Praieira',
    ['Confederação do Equador', 'Revolução Pernambucana', 'Sabinada', 'Cabanagem', 'Guerra dos Mascates'], d=4, crest='imperio_brasil',
    src=('pt', 'Revolução Praieira', ['1848']),
    x='O nome vem do jornal liberal Diário Novo, cuja sede ficava na Rua da Praia, no Recife.')
c.T('Qual unidade de conta, criada em 1994, serviu de ponte entre o cruzeiro real e o real durante a implantação do Plano Real?', 'URV',
    ['ORTN', 'BTN', 'Cruzado Novo', 'UFIR', 'Cruzeiro'], d=4, icon='coins',
    src=('pt', 'Unidade Real de Valor', ['1994']),
    x='Por quatro meses, preços e salários foram expressos em URV; em 1º de julho de 1994, cada URV virou um real, e 2.750 cruzeiros reais viraram um real.')
# d5
c.T('Que nome Antônio Conselheiro deu ao arraial que fundou às margens do rio Vaza-Barris e que ficou conhecido como Canudos?', 'Belo Monte',
    ['Monte Santo', 'Bom Jesus', 'Nova Jerusalém', 'Santa Cruz', 'Juazeiro'], d=5, icon='church',
    src=('pt', 'Guerra de Canudos', ['Belo Monte']),
    x='Em poucos anos, o arraial reuniu milhares de moradores; o Exército só o destruiu na quarta expedição, em outubro de 1897.')
c.T('Qual navegador espanhol chegou ao litoral do atual Brasil em janeiro de 1500, meses antes de Cabral?', 'Vicente Yáñez Pinzón',
    ['Juan Díaz de Solís', 'Juan Sebastián Elcano', 'Francisco de Orellana', 'Fernão de Magalhães', 'Hernán Cortés'], d=5, icon='ship',
    src=('pt', 'Vicente Yáñez Pinzón', ['1500']),
    x='Pinzón havia comandado a caravela Niña na primeira viagem de Colombo, em 1492.')
c.T('Qual bandeirante comandou, entre 1648 e 1651, uma expedição de milhares de quilômetros pelo interior que terminou descendo o rio Amazonas?', 'Antônio Raposo Tavares',
    ['Fernão Dias Pais', 'Domingos Jorge Velho', 'Bartolomeu Bueno da Silva', 'Manuel de Borba Gato', 'Pedro Teixeira'], d=5, icon='compass',
    src=('pt', 'Antônio Raposo Tavares', ['1648']),
    x='Antes disso, em 1628, ele atacou as missões jesuíticas do Guairá, no atual Paraná, e escravizou milhares de indígenas guaranis.')
c.T('Qual padre paulista, regente único do Império entre 1835 e 1837, havia criado a Guarda Nacional quando era ministro da Justiça?', 'Diogo Antônio Feijó',
    ['Pedro de Araújo Lima', 'Francisco de Lima e Silva', 'Bernardo Pereira de Vasconcelos', 'Evaristo da Veiga', 'José Bonifácio'], d=5, crest='imperio_brasil',
    src=('pt', 'Diogo Antônio Feijó', ['Guarda Nacional']),
    x='Pressionado pela oposição e pelas revoltas nas províncias, renunciou em 1837 e deixou o cargo para Araújo Lima.')

# ── Personagens ──
c.P('Qual rei foi aclamado no Rio de Janeiro, em 1818, dois anos depois da morte da mãe, a rainha D. Maria I?', 'dom_joao_vi', d=2, crest='portugal',
    src=('pt', 'João VI de Portugal', ['1818']),
    x='Ele já governava como príncipe regente desde 1799, porque a mãe sofria de uma doença mental.')
c.P('Qual governante também foi rei de Portugal, com o nome de D. Pedro IV, em 1826?', 'dom_pedro_i', d=2, crest='portugal',
    src=('pt', 'Pedro I do Brasil', ['Pedro IV']),
    x='Abdicou da coroa portuguesa em favor da filha, Maria da Glória, e anos depois voltou à Europa para lutar pelo trono dela numa guerra civil.')
c.P('Qual militar brasileiro dividiu com o ex-presidente americano Theodore Roosevelt o comando de uma expedição pela Amazônia, em 1913 e 1914?', 'rondon', d=3, flag='USA',
    src=('pt', 'Cândido Rondon', ['Roosevelt']),
    x='Um rio que eles exploraram, até então chamado Rio da Dúvida, foi rebatizado como Rio Roosevelt.')
c.P('Qual militar recebeu seu primeiro título de nobreza, o de barão, depois de sufocar a Balaiada, no Maranhão?', 'duque_caxias', d=3, crest='imperio_brasil',
    src=('pt', 'Luís Alves de Lima e Silva', ['Balaiada']),
    x='O título veio de Caxias, cidade maranhense que ele retomou dos rebeldes; depois ele ainda seria conde, marquês e, por fim, duque.')

# ── Estados ──
c.C('Qual reino europeu tentou fundar uma colônia na baía de Guanabara, em 1555, até ser expulso pelos portugueses, em 1567?', 'francia', d=3, stad='cristo_redentor',
    src=('pt', 'França Antártica', ['Villegagnon', '1555']),
    x='A expedição era chefiada por Nicolas Durand de Villegagnon; na luta para expulsar os invasores, Estácio de Sá fundou a cidade do Rio de Janeiro, em 1565.')
c.C('Qual país emprestou o dinheiro para construir a Companhia Siderúrgica Nacional, em Volta Redonda, num acordo que aproximou o Brasil dos Aliados na Segunda Guerra?', 'estados_unidos', d=3, who='getulio',
    src=('pt', 'Companhia Siderúrgica Nacional', ['Volta Redonda']),
    x='A usina de Volta Redonda começou a produzir aço em 1946 e virou o grande símbolo da industrialização da Era Vargas.')
c.C('Qual estado ocupou Salvador, então capital do Brasil, entre 1624 e 1625?', 'holanda', d=3, crest='brasil_colonia',
    src=('pt', 'Invasões holandesas no Brasil', ['1624']),
    x='Uma grande frota luso-espanhola, a Jornada dos Vassalos, retomou a cidade em 1625; cinco anos depois, os invasores voltaram, desta vez a Pernambuco.')

# ── Quem sou eu? ──
c.Q('Quem sou eu?', 'dom_pedro_ii', ['Gostava mais de livros, línguas e ciências do que de cerimônias, e conheci pessoalmente sábios como Pasteur e Victor Hugo.',
    'Perdi a mãe com um ano de idade e, aos cinco, vi meu pai partir para a Europa.',
    'Fui declarado maior de idade aos 14 anos para poder governar.',
    'Governei por quase meio século, até ser deposto por um golpe militar em 1889.'], 1, crest='imperio_brasil',
    src=('pt', 'Pedro II do Brasil', ['1825', '1889']),
    x='Morreu no exílio, em Paris, em 1891; décadas depois, seus restos voltaram ao Brasil e hoje estão na catedral de Petrópolis.')
c.Q('Quem sou eu?', 'leopoldina', ['Nasci em Viena, filha do imperador da Áustria, e era apaixonada por botânica e mineralogia.',
    'Cientistas e pintores europeus vieram ao Brasil na comitiva do meu casamento.',
    'Casei-me com o herdeiro do trono português e fui mãe de um futuro imperador.',
    'Em setembro de 1822, presidi o Conselho de Estado e escrevi ao meu marido defendendo a separação de Portugal.'], 2, stad='museu_ipiranga',
    src=('pt', 'Maria Leopoldina da Áustria', ['Viena', '1822']),
    x='Morreu em 1826, aos 29 anos; seus restos estão hoje na cripta do Monumento à Independência, no Ipiranga, em São Paulo.')
c.Q('Quem sou eu?', 'jose_bonifacio', ['Estudei em Coimbra e passei décadas na Europa como naturalista, descrevendo minerais novos.',
    'Voltei ao Brasil em 1819, já com mais de 50 anos.',
    'Em 1822 fui ministro e o principal conselheiro do príncipe regente.',
    'Rompi com o imperador, fui exilado na França e, depois, nomeado tutor do filho dele.',
    'Sou lembrado como o Patriarca da Independência.'], 3, crest='imperio_brasil',
    src=('pt', 'José Bonifácio de Andrada e Silva', ['Coimbra', 'Patriarca']),
    x='Como mineralogista, descreveu a petalita, o mineral em que o elemento lítio seria descoberto, em 1817.')

# ── Linha do tempo ──
c.O('Coloque em ordem, do mais antigo ao mais recente, estes marcos das capitais do Brasil?', [
    ('salvador', 'Fundação de Salvador', 'Primeira capital', 1549, {'crest': 'brasil_colonia'}),
    ('rio', 'Capital vai para o Rio', 'O ouro de Minas', 1763, {'crest': 'imperio_portugues'}),
    ('corte', 'Chegada da corte', 'Fuga de Napoleão', 1808, {'face': 'dom_joao_vi'}),
    ('brasilia', 'Inauguração de Brasília', 'Capital no Planalto', 1960, {'face': 'jk'})],
    d=2, src=('pt', 'Rio de Janeiro', ['1763', '1960']))
c.O('Coloque em ordem, do mais antigo ao mais recente, estes acontecimentos do Império?', [
    ('equador', 'Confederação do Equador', 'Revolta em Pernambuco', 1824, {'crest': 'imperio_brasil'}),
    ('abdica', 'Abdicação de D. Pedro I', 'Começa a Regência', 1831, {'face': 'dom_pedro_i'}),
    ('maioridade', 'Golpe da Maioridade', 'Um imperador de 14 anos', 1840, {'face': 'dom_pedro_ii'}),
    ('eusebio', 'Lei Eusébio de Queirós', 'Fim do tráfico de africanos', 1850, {'crest': 'imperio_brasil'}),
    ('paraguai', 'Começa a Guerra do Paraguai', 'Invasão de Mato Grosso', 1864, {'flag': 'PAR'})],
    d=3, src=('pt', 'Império do Brasil', ['1831', '1840']))
c.O('Coloque em ordem, da mais antiga à mais recente, estas revoltas da Primeira República?', [
    ('canudos', 'Guerra de Canudos', 'Sertão da Bahia', 1896, {'crest': 'brasil_republica'}),
    ('vacina', 'Revolta da Vacina', 'Ruas do Rio de Janeiro', 1904, {'face': 'oswaldo_cruz'}),
    ('chibata', 'Revolta da Chibata', 'Baía de Guanabara', 1910, {'flag': 'BRA'}),
    ('contestado', 'Guerra do Contestado', 'Paraná e Santa Catarina', 1912, {'crest': 'brasil_republica'}),
    ('prestes', 'Coluna Prestes', 'Marcha pelo interior', 1925, {'flag': 'BRA'})],
    d=4, src=('pt', 'República Velha', ['Canudos', 'Chibata']))

# ── Quem disse? ──
c.QT('Se é para o bem de todos e felicidade geral da nação, estou pronto: diga ao povo que fico.', 'dom_pedro_i', 1,
     ctx='Rio de Janeiro, 9 de janeiro de 1822, diante do pedido para que não voltasse a Portugal',
     src=('pt', 'Dia do Fico', ['1822']), x='A data entrou para a história como o Dia do Fico, um passo decisivo rumo à Independência.')
c.QT('Trabalhadores do Brasil!', 'getulio', 2,
     ctx='Saudação com que o presidente abria seus discursos do Dia do Trabalho, transmitidos pelo rádio',
     src=('pt', 'Getúlio Vargas', ['trabalhadores']),
     x='O rádio foi a grande arma de propaganda do Estado Novo, com programas oficiais como A Hora do Brasil.')
c.QT('Temos ódio à ditadura. Ódio e nojo.', 'Ulysses Guimarães', 3,
     ctx='Discurso do presidente da Assembleia Constituinte na promulgação da nova Constituição, 5 de outubro de 1988', typ='txt',
     wrong=['Tancredo Neves', 'José Sarney', 'Fernando Henrique Cardoso', 'Mário Covas', 'Franco Montoro'],
     src=('pt', 'Ulysses Guimarães', ['1988']),
     x='Ele chamou a nova Carta de "Constituição Cidadã"; morreu em 1992, num acidente de helicóptero no litoral do Rio, e seu corpo nunca foi encontrado.')
c.QT('A escravidão permanecerá por muito tempo como a característica nacional do Brasil.', 'Joaquim Nabuco', 4,
     ctx='Livro de memórias Minha Formação, 1900', typ='txt',
     wrong=['Rui Barbosa', 'André Rebouças', 'José do Patrocínio', 'Castro Alves', 'Luís Gama'],
     src=('pt', 'Joaquim Nabuco', ['Minha Formação']),
     x='Pernambucano, foi um dos líderes da campanha abolicionista no Parlamento e, na República, o primeiro embaixador do Brasil nos Estados Unidos.')

# ── Batalhas ──
c.BT('Quem venceu a esquadra paraguaia nesta batalha naval, travada no rio Paraná, perto de Corrientes?', 'imperio_brasil', 'Riachuelo · 1865', '?', 'PAR', d=2,
     x='A esquadra do almirante Barroso afundou boa parte dos navios inimigos e garantiu aos aliados o controle dos rios.',
     src=('pt', 'Batalha Naval do Riachuelo', ['Barroso', '1865']))
c.BT('Qual país lançou este ataque de surpresa ao acampamento das tropas brasileiras, na que é considerada a maior batalha campal da América do Sul?', 'Paraguai', 'Tuiuti · 1866', '?', 'imperio_brasil', d=2, typ='txt',
     wrong=['Bolívia', 'Chile', 'Peru', 'Argentina', 'Uruguai'],
     x='Em 24 de maio de 1866, mais de 50 mil soldados se enfrentaram; o ataque fracassou e custou milhares de mortos aos atacantes.',
     src=('pt', 'Batalha de Tuiuti', ['1866']))
c.BT('Quem defendia esta posição na Itália, conquistada pela Força Expedicionária Brasileira?', 'alemanha_nazista', 'Monte Castelo · 1945', 'brasil_republica', '?', d=2,
     x='Depois de quatro ataques fracassados, os pracinhas tomaram o monte em 21 de fevereiro de 1945.',
     src=('pt', 'Batalha de Monte Castelo', ['1945']))
c.BT('Contra quem os sertanejos lutaram nesta batalha no Piauí?', 'Portugueses', 'Jenipapo · Campo Maior, 1823', 'Piauienses e cearenses', '?', d=3, typ='txt',
     wrong=['Holandeses', 'Franceses', 'Paraguaios', 'Argentinos', 'Ingleses'],
     x='Os sertanejos perderam, mas a tropa do major Fidié, desgastada, recuou para o Maranhão, onde acabou se rendendo.',
     src=('pt', 'Batalha do Jenipapo', ['Fidié', '1823']))
c.BT('Contra quem o exército imperial lutou nesta batalha da Guerra da Cisplatina?', 'Províncias Unidas do Rio da Prata', 'Passo do Rosário · 1827', 'imperio_brasil', '?', d=4, typ='txt',
     wrong=['Paraguai', 'Bolívia', 'Chile', 'Peru', 'Grã-Colômbia'],
     x='A guerra pela antiga Província Cisplatina terminou em 1828 com a criação de um novo país independente: o Uruguai.',
     src=('pt', 'Batalha do Passo do Rosário', ['1827']))

# ── Linhagens ──
c.LN('Qual país completa a aliança que enfrentou o Paraguai?', 'Uruguai', 'Tríplice Aliança · 1865', ['Império do Brasil', 'Argentina', '?'], d=1, kind='grupo', era='new', typ='txt',
     wrong=['Chile', 'Bolívia', 'Peru', 'Portugal', 'Venezuela'], src=('pt', 'Guerra do Paraguai', ['Uruguai', 'Tríplice Aliança']),
     x='O tratado da aliança foi assinado em Buenos Aires, em 1º de maio de 1865.')
c.LN('Quem é o presidente que falta nesta sequência?', 'Itamar Franco', 'Presidentes da Nova República', ['José Sarney', 'Fernando Collor', '?', 'Fernando Henrique Cardoso'], d=2, era='new', typ='txt',
     wrong=['Tancredo Neves', 'Ulysses Guimarães', 'Marco Maciel', 'Leonel Brizola', 'Luiz Inácio Lula da Silva'], src=('pt', 'Itamar Franco', ['1992']),
     x='Vice de Collor, assumiu a Presidência com o impeachment, em 1992, e seu governo lançou o Plano Real, em 1994.')
c.LN('Quem completa esta lista de presidentes eleitos pelo voto popular?', 'jk', 'Presidentes eleitos · 1945–1960', ['Eurico Gaspar Dutra', 'Getúlio Vargas', '?', 'Jânio Quadros'], d=2, era='new',
     src=('pt', 'Lista de presidentes do Brasil', ['Juscelino']),
     x='Juscelino venceu a eleição de 1955 com cerca de 36% dos votos: na época não havia segundo turno.')
c.LN('Qual general completa a lista dos presidentes do regime militar?', 'Emílio Médici', 'Presidentes do regime militar · 1964–1985',
     ['Castelo Branco', 'Costa e Silva', '?', 'Ernesto Geisel', 'João Figueiredo'], d=3, era='new', typ='txt',
     wrong=['Eurico Dutra', 'Henrique Lott', 'Café Filho', 'Juarez Távora', 'Golbery do Couto e Silva'], src=('pt', 'Emílio Garrastazu Médici', ['1969']),
     x='Entre Costa e Silva e Médici, o país foi governado por dois meses por uma junta formada pelos três ministros militares, em 1969.')
c.LN('Qual poeta completa o trio de árcades envolvidos na Inconfidência Mineira?', 'Alvarenga Peixoto', 'Poetas da Inconfidência · 1789',
     ['Tomás Antônio Gonzaga', 'Cláudio Manuel da Costa', '?'], d=4, kind='grupo', era='mod', typ='txt',
     wrong=['Basílio da Gama', 'Santa Rita Durão', 'Gregório de Matos', 'Castro Alves', 'Gonçalves Dias'], src=('pt', 'Inconfidência Mineira', ['Alvarenga Peixoto']),
     x='Gonzaga, autor de Marília de Dirceu, foi degredado para Moçambique; Cláudio Manuel da Costa morreu na prisão, em Vila Rica.')

# ── Manchetes ──
c.NW('Em que ano saiu esta manchete?', '1888', 'Extinta a escravidão no Brasil', 1, paper='Folha da Corte',
     sub='Princesa regente assina a lei no Paço da Cidade; multidão festeja nas ruas do Rio',
     wrong=['1871', '1885', '1886', '1889', '1891'], src=('pt', 'Lei Áurea', ['1888']),
     x='Em 17 de maio, uma missa campal no Rio, com a presença da princesa, reuniu milhares de pessoas para celebrar a abolição.')
c.NW('Quem é o líder desta manchete?', 'getulio', 'Revolução vitoriosa: gaúcho assume o governo provisório', 2, paper='Jornal da Capital',
     sub='Junta que depôs Washington Luís entrega o poder ao chefe da revolução; soldados do Sul amarram cavalos no obelisco da Avenida Rio Branco',
     typ='player', src=('pt', 'Revolução de 1930', ['Washington Luís']),
     x='Ele tomou posse em 3 de novembro de 1930: era o fim da Primeira República e o começo de 15 anos seguidos de Vargas no poder.')
c.NW('Em que ano saiu esta manchete?', '1954', 'Morre o presidente; o país em comoção', 2, paper='Diário da Guanabara',
     sub='Tiro no Palácio do Catete; carta deixada ao povo diz que ele sai da vida para entrar na História',
     wrong=['1945', '1950', '1951', '1955', '1956'], src=('pt', 'Getúlio Vargas', ['1954']),
     x='A carta-testamento foi lida no rádio no mesmo dia, e multidões tomaram as ruas; ele foi sepultado em São Borja, sua cidade natal.')
c.NW('Em que ano saiu esta manchete?', '1984', 'Emenda das diretas é derrotada na Câmara', 2, paper='Gazeta do Planalto',
     sub='Faltaram 22 votos; milhões tinham ido às ruas pedir eleição direta para presidente',
     wrong=['1979', '1982', '1985', '1986', '1989'], src=('pt', 'Emenda Dante de Oliveira', ['1984']),
     x='A emenda teve 298 votos a favor, mas precisava de 320; o presidente seguinte foi escolhido por um Colégio Eleitoral.')
c.NW('Em que ano saiu esta manchete?', '1942', 'Brasil declara guerra à Alemanha e à Itália', 3, paper='Gazeta Carioca',
     sub='Decisão vem depois do afundamento de navios mercantes brasileiros por submarinos',
     wrong=['1939', '1940', '1941', '1943', '1944'], src=('pt', 'Brasil na Segunda Guerra Mundial', ['1942']),
     x='Em agosto daquele ano, um único submarino alemão afundou seis navios brasileiros na costa do Nordeste em poucos dias.')

# ── Duelo ──
c.DU('Duelo: quem nasceu primeiro?', 'tiradentes', 'jose_bonifacio', 3, icon='hourglass', src=('pt', 'Tiradentes', ['1746']),
     x='Tiradentes nasceu em 1746; José Bonifácio, em 1763, e viveu até 1838 — viu a Independência que o alferes não chegou a ver.')
c.DU('Duelo: o que aconteceu primeiro?', 'Lei Áurea', 'Proclamação da República', 1, typ='txt', crest='imperio_brasil', src=('pt', 'Lei Áurea', ['1888']),
     x='A abolição veio em maio de 1888; a monarquia caiu um ano e meio depois, em novembro de 1889.')
c.DU('Duelo: quem nasceu primeiro?', 'oswaldo_cruz', 'santos_dumont', 4, icon='hourglass', src=('pt', 'Oswaldo Cruz', ['1872']),
     x='Oswaldo Cruz nasceu em agosto de 1872, em São Luiz do Paraitinga (SP); Santos Dumont, em julho de 1873, em Minas Gerais.')

# ── Fato ou mito? ──
c.MY('D. Pedro I proclamou a Independência montado num cavalo imponente, como no famoso quadro de Pedro Américo?', False, 2, who='dom_pedro_i',
     x='Testemunhas contam que ele montava uma besta, isto é, uma mula, animal mais resistente para subir a serra; o quadro, concluído em 1888, idealizou a cena.',
     src=('pt', 'Independência do Brasil', ['Pedro Américo']))
c.MY('Tiradentes foi enforcado no Rio de Janeiro, e não em Minas Gerais?', True, 2, stad='ouro_preto',
     x='Foi executado no Rio em 21 de abril de 1792; o corpo foi esquartejado e a cabeça, exposta em Vila Rica, a atual Ouro Preto.',
     src=('pt', 'Tiradentes', ['1792']))
c.MY('A Revolta dos Malês, em Salvador, foi organizada principalmente por africanos muçulmanos?', True, 3, icon='scroll',
     x='Malê vem do iorubá imale, "muçulmano"; o levante estourou em janeiro de 1835, durante o Ramadã, e muitos rebeldes levavam amuletos com trechos do Alcorão.',
     src=('pt', 'Revolta dos Malês', ['1835']))
c.MY('A Lei Áurea garantiu indenização aos senhores pelos escravizados libertados?', False, 3, who='princesa_isabel',
     x='O texto tinha só dois artigos: declarava extinta a escravidão e revogava as disposições em contrário. Não houve indenização aos senhores nem amparo aos libertos.',
     src=('pt', 'Lei Áurea', ['1888']))
c.MY('D. Pedro II já tinha uma câmera fotográfica aos 14 anos?', True, 3, stad='museu_imperial',
     x='Em 1840 ele comprou um daguerreótipo, meses depois de o aparelho chegar ao Brasil; tornou-se um grande colecionador de fotografias.',
     src=('en', 'Pedro II of Brazil', ['photograph']))

c.write()
