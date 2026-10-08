# History Quiz

Quiz de História em formato de programa de auditório (Rumo ao Milhão), com álbum de figurinhas
de personagens, brasões, nações e monumentos. PWA em um único `index.html` + Trusted Web Activity
Android. Irmão do [Futebol Quiz BR](https://github.com/tdosreis/futebol-quiz): mesmo motor, outro conteúdo.

- Jogue: https://tdosreis.github.io/history-quiz/
- Pacote Android: `io.github.tdosreis.historyquiz`

## Como o conteúdo vira app

```
tools/history/*.tsv        figuras, estados, eventos, países, monumentos (fonte da verdade)
tools/history/fetch_images.py   busca fotos livres na Wikimedia Commons (img/, data/*.json)
tools/history/qgen/*.py    banco de perguntas escrito à mão (DSL) -> tools/questions/*.json
tools/history/build.py     injeta os dados em index.html (entre marcadores /*@@nome@@*/)
tools/merge_questions.py   valida e injeta as perguntas escritas
tools/check_questions.py   confere cada pergunta contra o artigo da Wikipédia citado em `src`
tools/history/test_all.py  suíte completa em um único Chrome headless
```

Fluxo típico: editar um `.tsv` ou `qgen/*.py` → `tools/history/qgen/run_all.sh` →
`python3 tools/merge_questions.py` → `python3 tools/history/build.py` → `python3 tools/history/test_all.py`.
Fora do macOS, aponte `CHROME` para o Chrome/Chromium e use `CI=1` (roda headless com `--no-sandbox`).

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
