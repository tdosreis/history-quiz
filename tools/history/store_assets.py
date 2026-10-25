#!/usr/bin/env python3
"""Render the Play Store phone screenshots (1000x1800) and the feature graphic (1024x500).

  python3 tools/history/store_assets.py [name ...]
"""
import io, os, subprocess, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
CHROME = os.environ.get("CHROME", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
EXTRA = ["--no-sandbox"] if os.environ.get("CI") else []
OUT = os.path.join(ROOT, "store-assets")
CHROME_H = 87   # the part of a headless window that is not page (see probe_fit.py)
os.makedirs(OUT, exist_ok=True)

SEED = """album=new Set(PL.filter(function(p,i){return i%3!==1}).map(function(p){return p.id})); LS.set('album',[...album]);
 stats={games:37,correct:412,answered:560,bestStreak:9,perfect:3,hard80:2,survBest:11}; LS.set('stats',stats); LS.set('milBest',150000);"""
def Q(cat, pick, extra=""):
    return ("diffKey='dificil'; cat=buildGame('dificil'); var q=CATS.find(function(c){return c.id==='%s'}).qs.find(function(q){return %s}); "
            "cat.qs=[q]; qi=0; sel.clear(); pts=72; streak=5; runLog=[3,3,3,3,3]; sc='quiz'; tMax=20; tLeft=14; disp=getDisp(q); %s go();") % (cat, pick, extra)

STATES = {
 "shot-01-home": SEED + " heroSticker=function(){var h=PL.find(function(p){return p.id==='napoleao'});return {p:h,num:PL.indexOf(h)+1}}; sc='home'; go();",
 "shot-02-milhao": ("isMil=true; rung=10; banked=5000; diffKey='moderado'; var g=buildMilhao(); cat=g; qi=10; sel.clear(); pts=480; streak=4; runLog=[3,3,3,3,3,3,3,3,3,3]; sc='quiz'; tMax=30; tLeft=22; disp=getDisp(cat.qs[qi]); go();"),
 "shot-03-album": SEED + " albView='map'; amapView='WORLD'; sc='album'; go();",
 "shot-04-onde": ("chal={g:'o',seed:4242,score:0,accepted:true}; startOnde(); chal=null;"
                  " var q=onde.qs[0]; ondeSetPin(ondeXY(q.at[0]+0.6, q.at[1]+0.9)); ondeCommit(); ondeNext();"
                  " q=onde.qs[1]; ondeSetPin(ondeXY(q.at[0]+2.2, q.at[1]-3.1)); ondeCommit();"
                  " var xy=ondeXY(q.at[0]+1, q.at[1]-1.5); onde.v={cx:xy[0],cy:xy[1],z:3.2}; go();"),
 "shot-05-cronologia": ("chal={g:'c',seed:90210,score:0,accepted:true}; startCron(); chal=null;"
                        " for (var k=0;k<9;k++){ var e=cron.cur, r=cron.line.findIndex(function(x){return x.y>e.y}); cronPlace(r<0?cron.line.length:r); cronNext(); }"),
 "shot-06-hoje": "startHoje();",
 "shot-07-pessoas": Q("renascimento", "q.type==='player' && q.t.indexOf('Mona Lisa')>0"),
 "shot-08-batalha": Q("batalhas", "q.battle && q.battle.lbl.indexOf('Waterloo')===0"),
}

def shot(name, js, w=500, h=900, scale=2, light=True):
    src = io.open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
    if light:
        src = src.replace('<html lang="pt-BR">', '<html lang="pt-BR" data-theme="light">', 1)
    tail = ("<style>.b,.b *,.alb-slot,.alb-slot *{animation:none!important;opacity:1!important}"
            "*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition:none!important}</style>"
            "<script>window.addEventListener('load',function(){setTimeout(function(){%s},800);});</script>") % js
    tmp = os.path.join(ROOT, "_store_%s.html" % name)
    io.open(tmp, "w", encoding="utf-8").write(src.replace("</body>", tail + "</body>"))
    out = os.path.join(OUT, name + ".png")
    try:
        subprocess.run([CHROME] + EXTRA + ["--headless", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
                        "--window-size=%d,%d" % (w, h + CHROME_H), "--force-device-scale-factor=%d" % scale,
                        "--virtual-time-budget=6000", "--screenshot=" + out, "file://" + tmp],
                       capture_output=True, timeout=120)
    finally:
        os.remove(tmp)
    # headless Chrome keeps CHROME_H px of the window for itself and leaves them
    # blank under the page: the window is that much taller, and the blank cut off
    from PIL import Image
    im = Image.open(out)
    im.crop((0, 0, w * scale, h * scale)).save(out)
    print("wrote", out)

def feature():
    ids = ["cleopatra", "napoleao", "marie_curie", "dom_pedro_ii"]
    import json
    imgs = {}
    src = io.open(os.path.join(ROOT, "data", "history_images.json"), encoding="utf-8").read()
    d = json.loads(src)
    cards = "".join('<div class="c" style="--r:%sdeg"><img src="file://%s"/></div>' % (r, os.path.join(ROOT, d[i]["img"]))
                    for i, r in zip(ids, (-8, -3, 3, 8)))
    html = """<!doctype html><meta charset=utf-8><style>
    @font-face{font-family:Fraunces;font-weight:500 700;src:url(file://@@ROOT@@/img/fonts/fraunces-latin.woff2)}
    @font-face{font-family:Fraunces;font-style:italic;font-weight:500 700;src:url(file://@@ROOT@@/img/fonts/fraunces-italic-latin.woff2)}
    @font-face{font-family:Archivo;font-weight:400 800;src:url(file://@@ROOT@@/img/fonts/archivo-latin.woff2)}
    body{margin:0;width:1024px;height:500px;background:#7B1E3A;position:relative;overflow:hidden;font-family:Archivo,sans-serif}
    .bg{position:absolute;inset:0;background:radial-gradient(circle at 78% 40%,#9A2B4D,#7B1E3A 60%,#4A1224)}
    h1{position:absolute;left:56px;top:120px;margin:0;color:#F3EAD3;font:600 92px/0.95 Fraunces,Georgia,serif}
    h1 em{color:#E0B968}
    p{position:absolute;left:60px;top:330px;margin:0;color:#F3EAD3;font:700 26px Archivo,sans-serif;letter-spacing:.04em;width:430px;line-height:1.3}
    .row{position:absolute;right:26px;top:84px;display:flex;gap:0}
    .c{width:150px;height:215px;margin-left:-14px;background:#EFE4CA;padding:8px 8px 22px;box-shadow:0 8px 24px #0006;transform:rotate(var(--r));margin-top:calc(var(--r)*3)}
    .c img{width:134px;height:185px;object-fit:cover;display:block}
    </style><div class=bg></div><h1>History<br><em>Quiz</em></h1><p>16 degraus até o milhão.<br>Do Egito Antigo à Guerra Fria.</p><div class=row>@@CARDS@@</div>""".replace("@@CARDS@@", cards).replace("@@ROOT@@", ROOT)
    tmp = os.path.join(ROOT, "_feature.html")
    io.open(tmp, "w", encoding="utf-8").write(html)
    out = os.path.join(OUT, "feature-graphic.png")
    try:
        subprocess.run([CHROME] + EXTRA + ["--headless", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
                        "--window-size=1024,%d" % (500 + CHROME_H), "--virtual-time-budget=6000", "--screenshot=" + out, "file://" + tmp],
                       capture_output=True, timeout=120)
    finally:
        os.remove(tmp)
    # as with the screenshots: the window is CHROME_H taller than the page, and the blank under it is cut off
    from PIL import Image
    Image.open(out).crop((0, 0, 1024, 500)).save(out)
    print("wrote", out)

if __name__ == "__main__":
    want = sys.argv[1:] or list(STATES) + ["feature"]
    for n in want:
        if n == "feature": feature()
        else: shot(n, STATES[n], w=540, h=960)
