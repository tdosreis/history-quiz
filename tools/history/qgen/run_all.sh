#!/bin/bash
# regenerate tools/questions/*.json from the DSL files, then merge into index.html
cd "$(dirname "$0")"
PY=/Users/tiagodosreis/miniconda3/bin/python3
rm -f ../../questions/*.json
for f in c*.py; do $PY "$f" || exit 1; done
