#!/usr/bin/env python3
"""Boot index.html in headless Chrome and print every script error it throws.

  python3 tools/history/boot.py            # errors only
  python3 tools/history/boot.py --eval 'JS' # also print the value of JS after boot
"""
import io, os, re, subprocess, sys, html
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
src = io.open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
ev = sys.argv[sys.argv.index("--eval") + 1] if "--eval" in sys.argv else "null"
head = "<script>window.__errs=[];window.addEventListener('error',function(e){__errs.push((e.message||'')+' @line '+e.lineno);});" \
       "window.addEventListener('unhandledrejection',function(e){__errs.push('promise: '+e.reason);});</script>"
tail = ("<script>window.addEventListener('load',function(){setTimeout(function(){var v;try{v=JSON.stringify((function(){return %s})());}catch(x){v='EVAL ERR '+x}"
        "var p=document.createElement('pre');p.id='probe';p.textContent=JSON.stringify({errs:__errs,v:v});document.body.appendChild(p);},1500);});</script>") % ev
out = src.replace("<head>", "<head>" + head, 1).replace("</body>", tail + "</body>")
tmp = os.path.join(ROOT, "_boot.html")
io.open(tmp, "w", encoding="utf-8").write(out)
try:
    r = subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--allow-file-access-from-files",
                        "--virtual-time-budget=6000", "--dump-dom", "file://" + tmp],
                       capture_output=True, text=True, timeout=120)
finally:
    os.remove(tmp)
m = re.search(r'<pre id="probe">(.*?)</pre>', r.stdout, re.S)
if not m:
    print("no probe output; stderr:", r.stderr[-500:]); sys.exit(2)
import json
d = json.loads(html.unescape(m.group(1)))
for e in d["errs"]: print("ERR", e)
if ev != "null": print("VALUE", d["v"])
print("%d error(s)" % len(d["errs"]))
