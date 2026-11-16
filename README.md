# History Quiz

Quiz de História em que se joga por um lugar nela (Para a História: dezesseis degraus, e a cada um o nome do
jogador é lembrado por mais tempo — de um dia a para sempre), com álbum de figurinhas
de personagens, brasões, nações e monumentos. PWA (`index.html` com a página e os estilos, `app.js`
com o jogo) + Trusted Web Activity Android. Irmão do [Futebol Quiz BR](https://github.com/tdosreis/futebol-quiz): mesmo motor, outro conteúdo.

- Jogue: https://tdosreis.github.io/history-quiz/
- Pacote Android: `io.github.tdosreis.historyquiz`

## Como o conteúdo vira app

```
tools/history/*.tsv        figuras, estados, eventos, países, monumentos (fonte da verdade)
tools/history/fetch_images.py   busca fotos livres na Wikimedia Commons (img/, data/*.json)
tools/history/qgen/*.py    banco de perguntas escrito à mão (DSL) -> tools/questions/*.json
tools/history/build.py     injeta os dados na página (entre marcadores /*@@nome@@*/)
tools/history/page.py      lê index.html + app.js como um texto só e os grava de novo separados
tools/merge_questions.py   valida e injeta as perguntas escritas
tools/check_questions.py   confere cada pergunta contra o artigo da Wikipédia citado em `src`
tools/history/test_all.py  suíte completa em um único Chrome headless
```

Fluxo típico: editar um `.tsv` ou `qgen/*.py` → `tools/history/qgen/run_all.sh` →
`python3 tools/merge_questions.py` → `python3 tools/history/build.py` → `python3 tools/history/test_all.py`.
Fora do macOS, aponte `CHROME` para o Chrome/Chromium e use `CI=1` (roda headless com `--no-sandbox`).

O jogo fica num arquivo próprio, `app.js`, e não dentro do `index.html`: assim o navegador compila o
script uma vez e guarda o resultado, e o app abre ~40% mais rápido num celular modesto. A página chama
`app.js?v=<hash do conteúdo>` (o `build.py` carimba o mesmo hash no `sw.js`), para que uma página nova
nunca rode um script antigo do cache. Os dois arquivos podem ser editados à mão; as ferramentas leem e
gravam os dois juntos por `tools/history/page.py`.

## A escalada: Para a História

O jogo principal não vale dinheiro: vale memória. São dezesseis degraus, e cada um é o tempo pelo qual o nome
do jogador será lembrado — um dia, um ano, um século, três milênios, para sempre —, do quinto em diante com o
rosto de quem o mundo já lembra há esse tempo (`tools/history/js/fama.js`). No fim, a placa com o nome, no
material que ele mereceu: dito ao vento, na areia, a giz, a tinta, em bronze, em mármore, nas estrelas.

Cinco dos dezesseis degraus são **provas** (`js/prova.js`): uma rodada de um dos outros jogos, jogada pelo degrau,
na tela do próprio jogo — a régua do Que ano?, o alfinete do Onde foi?, um evento na Cronologia, três «antes ou
depois?», cartas de Mito ou fato?, uma cena da Máquina do tempo, um nome para soletrar e pares para ligar
(`js/maos.js`). Cada escalada sorteia as suas, da mesma semente que sorteia as perguntas, então um desafio
mandado a um amigo tem as mesmas provas. `provaAuto(acerta)` joga a prova da vez até o veredito: é com ela que
a suíte e a sonda de layout sobem escaladas inteiras.

A capa (`js/home.js`) tem uma coisa só para fazer, a escalada; embaixo, a placa do jogador, os cinco jogos do
dia e duas portas: o álbum e a página **Jogos**. O álbum é um livro só, com três seções sob a mesma tira de abas
— figurinhas no mapa, selos, vitrine — e a figurinha do próprio jogador, a Nº 000 (`js/eu.js`), reimpressa em
prata, holográfica e ouro conforme ele sobe.

## Os formatos de pergunta

Além das clássicas (texto, personagem, estado, "Quem sou eu?", linha do tempo), a História pergunta
do seu jeito — cada formato é a própria figura do cartão, com um efeito e um som
(`tools/history/js/formats.js`, `tools/history/css/formats.css`):

| Formato | DSL (`qgen/qdsl.py`) | O que aparece |
|---|---|---|
| Quem disse? | `c.QT(frase, resposta, ctx=…, kind=…)` | a frase escrita a tinta; gravada em pedra, num diário de bordo ou numa carta lacrada |
| Batalha | `c.BT(t, resposta, 'Lugar · ano', lado_a, lado_b)` | dois estandartes e as espadas cruzadas, um lado escondido |
| Linhagem | `c.LN(t, resposta, título, ['A', '?', 'C'], kind='grupo')` | uma sucessão (ou um conselho) com um elo faltando |
| Manchete | `c.NW(t, resposta, manchete, paper=…, sub=…)` | a primeira página do dia |
| Duelo | `c.DU(t, certo, outro)` | só duas cartas e o VS |
| Fato ou mito? | `c.MY(t, True/False, x=…)` | dois carimbos; o certo desce na revelação |

Toda resposta escrita tem figura (rosto, brasão, bandeira, foto do monumento ou um desenho do tipo
de resposta), e toda pergunta mostra o personagem, monumento ou estado que menciona.

## Os brasões

Cada estado tem o seu emblema histórico, desenhado em SVG no escudo da sua cultura — o Λ num hoplon
espartano, a águia e os raios num scutum, a coruja numa tetradracma, os três leões num escudo inglês,
o mon dos Tokugawa, a águia no nopal num chimalli asteca, a bandeira de uma república moderna
(`tools/history/js/brasoes/`: as formas, a paleta e os ajudantes em `_core.js`, as feras heráldicas em
`01_bestas.js`, um arquivo por região). `node tools/history/brasao_preview.js saida.png [ids | arquivo.js]`
mostra cada brasão grande e nos discos do jogo, no claro e no escuro. Só entram na página os arquivos
listados em `brasoes/READY`.

## Arte com Gemini

`tools/gemini/` repinta os retratos e as fotos de monumentos no traço do ateliê. Rode pela aba
Actions (precisa do segredo `GEMINI_API_KEY` no repositório):

- **Gemini paint test** — alguns retratos lado a lado (`compare.jpg` no branch `gemini-tests`);
  `busts`: `sculpture` (o busto continua busto) ou `alive` (o rosto pintado vivo)
- **Gemini paint batch** — todas as figuras e monumentos, no branch `gemini-batch`

Depois de revisar: `python3 tools/gemini/integrate.py <pasta ai-batch>` e `python3 tools/history/build.py`.
As pinturas entram com nomes novos, para que o cache dos celulares as receba.

Veja `PLAY_STORE_LISTING.md` para a publicação na Google Play.
