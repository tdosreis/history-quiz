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

Veja `PLAY_STORE_LISTING.md` para a publicação na Google Play.
