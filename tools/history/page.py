"""The page is two files: index.html (the markup and the styles) and app.js (the game's script).

A browser compiles a script that arrives as its own file away from the page, and keeps what it
compiled for the next launch; one inlined in the HTML it compiles again every time. Measured on a
phone-speed CPU, a launch went from ~1.4 s to ~0.85 s. index.html names the script with its content
hash, app.js?v=<hash>, so a new page never runs an old script out of a cache.

The tools still see one text: read() puts app.js back where its <script> tag is, write() takes it
out again. Both sides of the split can be edited by hand.

    import page
    s = page.read()          # index.html with app.js inlined, as the page always was
    ...                      # edit s
    page.write(s)            # index.html + app.js (and the version stamped into sw.js)
"""
import hashlib, io, os, re

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
HTML = os.path.join(ROOT, "index.html")
APP = os.path.join(ROOT, "app.js")
SW = os.path.join(ROOT, "sw.js")
TAG = re.compile(r'<script src="app\.js\?v=([0-9a-f]+)"></script>')


def _rd(p):
    return io.open(p, encoding="utf-8").read()


def read():
    """index.html with the script back inline."""
    s = _rd(HTML)
    m = TAG.search(s)
    if not m:
        return s                     # still one file
    return s[:m.start()] + "<script>" + _rd(APP) + "</script>" + s[m.end():]


def app_text():
    """Just the game's script."""
    return _rd(APP) if os.path.exists(APP) else main_script(_rd(HTML))[2]


def main_script(s):
    """(start, end, body) of the one big inline script: the first <script> after the styles."""
    a = s.index("<script>", s.index("</style>"))
    b = s.index("</script>", a)
    return a, b + len("</script>"), s[a + len("<script>"):b]


def write(s):
    """Split the page text into index.html + app.js, and tell the service worker which app.js is current."""
    a, b, body = main_script(s)
    v = hashlib.sha1(body.encode("utf-8")).hexdigest()[:10]
    io.open(APP, "w", encoding="utf-8").write(body)
    io.open(HTML, "w", encoding="utf-8").write(s[:a] + '<script src="app.js?v=%s"></script>' % v + s[b:])
    sw = _rd(SW)
    sw2 = re.sub(r"const APP = 'app\.js\?v=[0-9a-f]*';", "const APP = 'app.js?v=%s';" % v, sw)
    if sw2 != sw:
        io.open(SW, "w", encoding="utf-8").write(sw2)
    return v
