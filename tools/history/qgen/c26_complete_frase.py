"""Complete a frase: famous lines with one word left out (the citação strip with a gap,
tools/history/js/formats.js), the word to choose among six."""
from qdsl import Cat

c = Cat('complete_frase', 'Complete a frase', '✍️', 'Frases célebres com uma palavra faltando', '#7B1E3A', order=73)
T = 'Que palavra completa a frase?'
def F(quote, a, wrong, d, ctx, src, x, kind=None):
    c.QT(quote, a, d=d, ctx=ctx, t=T, typ='txt', wrong=wrong, kind=kind, src=src, x=x)

# d1
F('Vim, vi, ___.', 'venci', ['lutei', 'parti', 'reinei', 'voltei', 'cheguei'], 1, 'Júlio César, 47 a.C.',
  ('pt', 'Veni, vidi, vici', ['César']), 'Júlio César escreveu ao Senado “Veni, vidi, vici” depois de uma vitória relâmpago na Batalha de Zela, em 47 a.C.')
F('Penso, logo ___.', 'existo', ['sou', 'vivo', 'aprendo', 'duvido', 'falo'], 1, 'René Descartes, 1637',
  ('pt', 'Cogito, ergo sum', ['Descartes']), 'A frase está no Discurso do Método, de 1637: se duvido de tudo, ao menos sei que estou pensando.')
F('Independência ou ___!', 'Morte', ['Glória', 'Guerra', 'Liberdade', 'Exílio', 'Revolução'], 1, 'Dom Pedro, às margens do Ipiranga, 1822',
  ('pt', 'Independência do Brasil', ['Ipiranga']), 'O brado de 7 de setembro de 1822 virou o lema da independência do Brasil.')
F('Eu tenho um ___.', 'sonho', ['plano', 'desejo', 'direito', 'caminho', 'destino'], 1, 'Martin Luther King Jr., Washington, 1963',
  ('pt', 'I Have a Dream', ['1963']), 'O discurso foi feito na Marcha sobre Washington, em agosto de 1963, diante do Memorial a Lincoln.')
F('É um pequeno passo para o homem, um salto ___ para a humanidade.', 'gigante', ['enorme', 'imenso', 'histórico', 'novo', 'infinito'], 1,
  'Neil Armstrong, na Lua, 1969', ('pt', 'Apollo 11', ['Armstrong']), 'Armstrong disse a frase ao pisar na Lua, em 20 de julho de 1969 (já 21 em Greenwich).')
F('Liberdade, igualdade, ___.', 'fraternidade', ['justiça', 'verdade', 'solidariedade', 'prosperidade', 'unidade'], 1, 'Lema da Revolução Francesa',
  ('pt', 'Liberdade, igualdade, fraternidade', ['Revolução Francesa']), 'O lema nasceu na Revolução Francesa e hoje é o lema oficial da República Francesa.')
F('Ser ou não ser, eis a ___.', 'questão', ['dúvida', 'resposta', 'verdade', 'escolha', 'sentença'], 1, 'Hamlet, de William Shakespeare',
  ('pt', 'Ser ou não ser', ['Hamlet']), 'O monólogo está no terceiro ato de Hamlet, escrita por volta de 1600.')
F('No meio do caminho tinha uma ___.', 'pedra', ['árvore', 'ponte', 'casa', 'flor', 'porta'], 1, 'Carlos Drummond de Andrade, 1928',
  ('pt', 'No Meio do Caminho', ['Drummond']), 'O poema saiu na Revista de Antropofagia, em 1928, e escandalizou muita gente pela repetição.')
F('Minha terra tem ___, onde canta o sabiá.', 'palmeiras', ['coqueiros', 'laranjeiras', 'montanhas', 'florestas', 'cachoeiras'], 1,
  'Gonçalves Dias, Canção do Exílio, 1843', ('pt', 'Canção do Exílio', ['sabiá']), 'Gonçalves Dias escreveu a Canção do Exílio em Coimbra, em 1843, com saudade do Brasil.')
F('Diga ao povo que ___!', 'fico', ['parto', 'volto', 'reino', 'venci', 'luto'], 1, 'Dom Pedro, Rio de Janeiro, 9 de janeiro de 1822',
  ('pt', 'Dia do Fico', ['1822']), 'No Dia do Fico, Dom Pedro desobedeceu às cortes de Lisboa, que exigiam sua volta a Portugal.')

# d2
F('A sorte está ___.', 'lançada', ['decidida', 'escrita', 'feita', 'selada', 'contra nós'], 2, 'Júlio César, ao cruzar o Rubicão, 49 a.C.',
  ('pt', 'Alea jacta est', ['Rubicão']), 'Ao atravessar o rio Rubicão com suas tropas, César desafiou o Senado e começou uma guerra civil.')
F('Só sei que nada ___.', 'sei', ['tenho', 'vejo', 'digo', 'quero', 'entendo'], 2, 'Atribuída a Sócrates',
  ('pt', 'Só sei que nada sei', ['Sócrates']), 'A frase resume o que Platão conta na Apologia: Sócrates se achava sábio só por saber que não sabia.')
F('Até tu, ___?', 'Brutus', ['Marco Antônio', 'Cássio', 'Pompeu', 'Otaviano', 'Cícero'], 2, 'Júlio César, na peça de Shakespeare',
  ('pt', 'Et tu, Brute?', ['Shakespeare']), 'As últimas palavras de César são uma criação de Shakespeare; os autores antigos não as registram assim.')
F('Navegar é preciso; ___ não é preciso.', 'viver', ['morrer', 'lutar', 'sonhar', 'voltar', 'chegar'], 2, 'General romano Pompeu, segundo Plutarco',
  ('pt', 'Navegar é preciso', ['Pompeu']), 'Fernando Pessoa e Caetano Veloso tornaram a frase famosa em português; ela vem do general Pompeu, contado por Plutarco.')
F('O Estado sou ___.', 'eu', ['nós', 'o povo', 'Deus', 'a França', 'o rei'], 2, 'Atribuída a Luís XIV',
  ('pt', 'Luís XIV de França', ['Estado']), 'Não há prova de que Luís XIV tenha dito a frase, mas ela resume o absolutismo do seu reinado.')
F('Proletários de todos os países, ___-vos!', 'uni', ['levantai', 'armai', 'libertai', 'erguei', 'organizai'], 2, 'Marx e Engels, Manifesto Comunista, 1848',
  ('pt', 'Manifesto Comunista', ['1848']), 'É a frase final do Manifesto Comunista, publicado em Londres em fevereiro de 1848.')
F('Conhece-te a ti ___.', 'mesmo', ['próprio', 'inteiro', 'primeiro', 'sempre', 'agora'], 2, 'Inscrição no templo de Apolo, em Delfos',
  ('pt', 'Conhece-te a ti mesmo', ['Delfos']), 'A frase estava gravada no templo de Apolo em Delfos, e Sócrates fez dela um lema.')
F('A religião é o ___ do povo.', 'ópio', ['pão', 'consolo', 'espelho', 'grito', 'coração'], 2, 'Karl Marx, 1844',
  ('pt', 'A religião é o ópio do povo', ['Marx']), 'Marx escreveu a frase em 1844; ela vem logo depois de chamar a religião de “suspiro da criatura oprimida”.')
F('Ninguém nasce mulher: ___-se mulher.', 'torna', ['faz', 'aprende', 'descobre', 'vive', 'escolhe'], 2, 'Simone de Beauvoir, O Segundo Sexo, 1949',
  ('pt', 'O Segundo Sexo', ['Beauvoir']), 'A frase abre o segundo volume de O Segundo Sexo, livro de 1949 que marcou o feminismo.')
F('Pão e ___.', 'circo', ['vinho', 'água', 'festa', 'trabalho', 'ouro'], 2, 'O poeta romano Juvenal, sobre o povo de Roma',
  ('pt', 'Pão e circo', ['Juvenal']), 'Juvenal reclamava que o povo de Roma só queria duas coisas: comida de graça e espetáculos.')
F('Tudo vale a pena se a alma não é ___.', 'pequena', ['vazia', 'fraca', 'triste', 'pobre', 'covarde'], 2, 'Fernando Pessoa, Mensagem, 1934',
  ('pt', 'Mar Português', ['Pessoa']), 'O verso é do poema Mar Português, sobre os navegadores, do livro Mensagem, de 1934.')
F('Saio da vida para entrar na ___.', 'História', ['glória', 'memória', 'lenda', 'paz', 'morte'], 2, 'Getúlio Vargas, carta-testamento, 1954',
  ('pt', 'Carta-testamento', ['Getúlio']), 'É a última frase da carta deixada por Getúlio Vargas antes de se matar, no Palácio do Catete, em 24 de agosto de 1954.')
F('Os homens nascem e permanecem livres e ___ em direitos.', 'iguais', ['unidos', 'fortes', 'irmãos', 'felizes', 'senhores'], 2,
  'Declaração dos Direitos do Homem e do Cidadão, 1789', ('pt', 'Declaração dos Direitos do Homem e do Cidadão', ['1789']),
  'É o primeiro artigo da Declaração aprovada na França em agosto de 1789, semanas depois da Queda da Bastilha.')

# d3
F('E, no entanto, ela se ___.', 'move', ['cala', 'esconde', 'perde', 'rende', 'apaga'], 3, 'Atribuída a Galileu, depois do julgamento, 1633',
  ('pt', 'Eppur si muove', ['Galileu']), 'Segundo a lenda, Galileu murmurou a frase sobre a Terra depois de ser obrigado a negar que ela se move; não há registro de que tenha dito.')
F('Ou ficar a pátria livre, ou ___ pelo Brasil.', 'morrer', ['lutar', 'viver', 'cantar', 'sofrer', 'sangrar'], 3, 'Hino da Independência, letra de Evaristo da Veiga',
  ('pt', 'Hino da Independência do Brasil', ['Evaristo da Veiga']), 'A música do Hino da Independência foi composta pelo próprio Dom Pedro I.')
F('E o sol da liberdade, em raios ___, brilhou no céu da pátria nesse instante.', 'fúlgidos', ['dourados', 'brilhantes', 'ardentes', 'radiantes', 'gloriosos'], 3,
  'Hino Nacional Brasileiro, letra de Osório Duque-Estrada', ('pt', 'Hino Nacional Brasileiro', ['fúlgidos']), '“Fúlgidos” quer dizer brilhantes, cintilantes. A letra do hino foi oficializada em 1922.')
F('Eu sou eu e a minha ___.', 'circunstância', ['história', 'consciência', 'liberdade', 'verdade', 'sombra'], 3, 'José Ortega y Gasset, 1914',
  ('pt', 'José Ortega y Gasset', ['circunstância']), 'O filósofo espanhol escreveu a frase em 1914: ninguém se entende fora do seu tempo e do seu lugar.')
c.write()
