#!/usr/bin/env python3
"""Syntax-check the page's main script with JavaScriptCore (no browser needed)."""
import io, os, re, subprocess, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
JSC = "/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc"
s = io.open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
a = s.index("\n<script>\n", s.index("</style>")) + len("\n<script>\n")
b = s.index("\n</script>", a)
first_line = s[:a].count("\n") + 1
js = s[a:b]
io.open("/tmp/_main.js", "w", encoding="utf-8").write(js)
io.open("/tmp/_chk.js", "w").write("var src=readFile('/tmp/_main.js');try{new Function(src);print('SYNTAX OK')}catch(e){print('SYNTAX ERROR: '+e.message+' (script line '+e.line+')')}")
out = subprocess.run([JSC, "/tmp/_chk.js"], capture_output=True, text=True).stdout.strip()
print(out)
m = re.search(r"script line (\d+)", out)
if m:
    n = int(m.group(1)); print("page line", first_line + n - 1)
    lines = js.split("\n")
    for i in range(max(0, n - 4), min(len(lines), n + 2)): print("%6d  %s" % (first_line + i, lines[i][:150]))
