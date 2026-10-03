#!/usr/bin/env python3
"""Screenshot the page after running some JS.   shot.py OUT.png 'js' [WIDTHxHEIGHT]"""
import io, os, subprocess, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
out, js = sys.argv[1], sys.argv[2]
size = sys.argv[3] if len(sys.argv) > 3 else "500x900"
w, h = size.split("x")
src = io.open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
tail = "<script>window.addEventListener('load',function(){setTimeout(function(){%s},700);});</script>" % js
tmp = os.path.join(ROOT, "_shot.html")
io.open(tmp, "w", encoding="utf-8").write(src.replace("</body>", tail + "</body>"))
try:
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--allow-file-access-from-files", "--hide-scrollbars",
                    "--window-size=%s,%s" % (w, h), "--virtual-time-budget=5000", "--screenshot=" + out, "file://" + tmp],
                   capture_output=True, text=True, timeout=120)
finally:
    os.remove(tmp)
print("wrote", out)
