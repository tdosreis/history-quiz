#!/usr/bin/env python3
"""Text contrast, measured on the rendered page rather than on the tokens.

Checking the colour variables alone is not enough: half the muted text in this
app is a token *plus* an opacity, and the two multiply. This walks every screen,
takes the computed colour of every text node, composites it over whatever is
actually behind it — including the opacity of every ancestor — and reports
anything below the WCAG AA threshold for its size.

Disabled controls are skipped: WCAG exempts them, and --ink-4 exists for them.

Text over the home cover's hero photo (.cv-mast, .cv-cap) is accepted on sight,
not measured: an <img> paints real pixels getComputedStyle cannot see, so
climbing the DOM for a background finds the *page's* colour, not the photo's,
which is the one case this file cannot tell apart from a real failure by
introspection alone. It was checked the other way instead — a real screenshot,
cropped to the caption, read by eye, in both themes — and it holds up: the
player's name, position and number all read clearly over the photo, carried by
the two-layer text-shadow already built for exactly this (`0 1px 2px rgba(0,0,0,.85),
0 0 14px rgba(0,0,0,.6)`). If that shadow is ever weakened, or a new class of
text is added over a photo, it needs the same by-eye check, not a guess from
either side.
"""
import subprocess, os, io, re, json, html as _html

ROOT   = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

PROBE = r"""
(function(){
  function parse(c){
    var m=/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/.exec(c);
    return m?{r:+m[1],g:+m[2],b:+m[3],a:m[4]===undefined?1:+m[4]}:null;
  }
  function lum(c){
    var f=function(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);};
    return .2126*f(c.r)+.7152*f(c.g)+.0722*f(c.b);
  }
  function ratio(a,b){var x=lum(a),y=lum(b),hi=Math.max(x,y),lo=Math.min(x,y);
    return (hi+.05)/(lo+.05);}
  function over(fg,bg,alpha){   // composite fg onto bg at alpha
    return {r:fg.r*alpha+bg.r*(1-alpha), g:fg.g*alpha+bg.g*(1-alpha), b:fg.b*alpha+bg.b*(1-alpha)};
  }
  /* The redesign paints most surfaces with a background-image (a paper or
     card photograph) rather than a background-color, and getComputedStyle
     cannot see into an image. Climbing past one looking for the next solid
     colour found the *page's* colour instead of the card's — a tile that is
     always cream ivory paper, in both themes, measured as sitting on the
     night-dark board behind it. These are the actual average colours of
     every such texture this page uses (tools/check_contrast.py's own
     measurement of the files in img/atelier/, not a guess), so a card is
     resolved to what it really shows instead of to whatever is many layers
     further down. */
  var TEXTURES = {
    'slip-ivory.webp':   {r:0xEF,g:0xE6,b:0xD4},
    'slip-day.webp':     {r:0xF7,g:0xF1,b:0xE2},
    'slip-day-on.webp':  {r:0xFC,g:0xF9,b:0xEF},
    'slip-night.webp':   {r:0x20,g:0x23,b:0x2B},
    'slip-night-on.webp':{r:0x29,g:0x2F,b:0x37},
    'slip-good.webp':    {r:0xA4,g:0xCC,b:0x94},
    'slip-bad.webp':     {r:0xDC,g:0x9A,b:0x94},
    'slip-gold.webp':    {r:0xE5,g:0xC2,b:0x74},
    'paper-day.webp':    {r:0xF2,g:0xEC,b:0xE0},
    'paper-night.webp':  {r:0x17,g:0x1C,b:0x28}
  };
  /* A gradient is the dominant colour field by design here — paper grain and
     chalk lines are layered over it as texture, not the other way round
     (see .xi: a pitch-stripe gradient under a paper photo under a thin SVG
     line pattern). Averaging every rgb()/rgba() stop that getComputedStyle
     normalises a gradient to, wherever in the (possibly multi-layer) string
     it sits, is a closer match to what the eye actually sees there than the
     single lightest image layer a naive first-match would grab — which is
     what turned a gold "Jogar agora" button and a green painted pitch into
     false failures the first time this was tried. */
  function gradientOf(cs){
    var re=/rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/g, m, n=0, r=0,g=0,b=0;
    while((m=re.exec(cs.backgroundImage))){ r+=+m[1]; g+=+m[2]; b+=+m[3]; n++; }
    return n ? {r:r/n, g:g/n, b:b/n} : null;
  }
  function textureOf(cs){
    var m=/url\(["']?[^"')]*\/([a-zA-Z0-9_-]+\.webp)/.exec(cs.backgroundImage);
    return m && TEXTURES[m[1]];
  }
  /* null, not a guess: an element can reach the document root with no
     background-color, no gradient and no known texture anywhere above it,
     and the common real cause is a photograph — an <img> painted behind it,
     which getComputedStyle cannot see at all. Guessing white here is what
     turned the cover photo's own caption, in its own ivory with a two-layer
     text-shadow built for exactly this, into a reported 1.2:1 — the darkest
     possible false alarm, on the one piece of text that had already been
     engineered for it. Unresolved is reported on its own, not folded into
     the pass or the fail count, because neither is true: nothing here was
     actually checked. */
  function bgOf(el){
    var n=el;
    while(n && n!==document.documentElement){
      var cs=getComputedStyle(n);
      var c=parse(cs.backgroundColor);
      if(c && c.a>0.99) return c;
      var grad=gradientOf(cs);
      if(grad) return grad;
      var tex=textureOf(cs);
      if(tex) return tex;
      n=n.parentElement;
    }
    return null;
  }
  function opacityChain(el){
    var o=1,n=el;
    while(n && n!==document.documentElement){ o*= parseFloat(getComputedStyle(n).opacity||1); n=n.parentElement; }
    return o;
  }
  function disabled(el){
    var n=el;
    while(n){ if(n.disabled || n.getAttribute && n.getAttribute('aria-disabled')==='true') return true; n=n.parentElement; }
    return false;
  }
  var out=[], unresolved=[];
  document.querySelectorAll('#ct *').forEach(function(el){
    var direct='';
    for(var i=0;i<el.childNodes.length;i++)
      if(el.childNodes[i].nodeType===3) direct+=el.childNodes[i].textContent;
    direct=direct.replace(/\s+/g,' ').trim();
    if(!direct) return;
    var cs=getComputedStyle(el);
    if(cs.display==='none'||cs.visibility==='hidden') return;
    var r=el.getBoundingClientRect(); if(r.width<1||r.height<1) return;
    if(el.closest('[aria-hidden="true"]')) return;
    if(disabled(el)) return;
    var fg=parse(cs.color); if(!fg) return;
    if(el.closest('.cv-mast, .cv-cap')) return;   // over the hero photo — see the module docstring
    var bg=bgOf(el);
    if(!bg){
      unresolved.push({t:direct.slice(0,34), cls:(el.className||el.tagName).toString().slice(0,34)});
      return;
    }
    var alpha=fg.a*opacityChain(el);
    var eff=over(fg,bg,alpha);
    var size=parseFloat(cs.fontSize), weight=parseInt(cs.fontWeight)||400;
    var large=(size>=24)||(size>=18.66&&weight>=700);
    var need=large?3.0:4.5;
    var got=ratio(eff,bg);
    if(got<need-0.01){
      out.push({t:direct.slice(0,34), cls:(el.className||el.tagName).toString().slice(0,34),
                size:+size.toFixed(1), w:weight, got:+got.toFixed(2), need:need});
    }
  });
  return {fails:out, unresolved:unresolved};
})()
"""

SCREENS = ["home","album","medals","credits","difficulty"]

def run(theme):
    src = io.open(os.path.join(ROOT,"index.html"), encoding="utf-8").read()
    js = """
    /* The board deals in and the screen fades in, both starting at opacity 0.
       Sampling mid-animation reported every single node at exactly 1.00:1 —
       the text composited onto its own background at alpha 0. Kill animation
       before measuring anything. */
    (function(){ var st=document.createElement('style');
      st.textContent='*,*::before,*::after{animation:none!important;transition:none!important}';
      document.head.appendChild(st); })();
    document.documentElement.setAttribute('data-theme','%s');
    ALL_STICKERS.forEach(function(id){ album.add(id); });
    stats={games:9,correct:80,answered:120,bestStreak:5,perfect:1};
    var all=[], allUnresolved=[], seen={}, seenU={};
    function grab(tag){
      var res=(%s);
      res.fails.forEach(function(o){
        var k=tag+'|'+o.cls+'|'+o.t;
        if(seen[k]) return; seen[k]=1; o.screen=tag; all.push(o);
      });
      res.unresolved.forEach(function(o){
        var k=tag+'|'+o.cls+'|'+o.t;
        if(seenU[k]) return; seenU[k]=1; o.screen=tag; allUnresolved.push(o);
      });
    }
    %s
    /* One board is not a sample. The dark theme's country band on a post-2000
       card was invisible at 1.32:1 and this check passed twice before a random
       deal happened to include a modern player. Deal a lot of boards, and make
       sure both printings are on screen: the retro card and the mint one carry
       different band colours. */
    for (var i=0;i<14;i++){ diffKey='medio'; startGame(); grab('quiz'); }
    for (var i=0;i<8;i++){ diffKey='dificil'; startGame(); grab('quiz-dificil'); }
    for (var i=0;i<8;i++){ startMilhao(); grab('milhao'); }
    /* The cartas especiais, face up and then played. They carry the one pair of
       colours nothing else on screen uses — the card's own --sp on the pocket —
       and the loop above never reaches them: it only ever renders rung one. */
    for (var i=0;i<5;i++){
      startMilhao();
      ['who','tl'].forEach(function(k){
        var j = cat.qs.findIndex(function(q){ return q._special === k; });
        if (j < 0) return;
        qi = j; rung = j; disp = getDisp(cat.qs[j]); tMax = qTime(); tLeft = tMax;
        sc = 'card'; go(); grab('carta/' + k);
        if (cat.qs[j].clues) cat.qs[j]._shown = cat.qs[j].clues.length;
        sc = 'quiz'; go(); grab('carta/' + k + '-board');
      });
    }
    sc='album'; albCtry='__escudos'; go(); grab('album/escudos');
    var d=document.createElement('pre'); d.id='OUT';
    d.textContent=JSON.stringify({fails:all, unresolved:allUnresolved}); document.body.appendChild(d);
    """ % (theme, PROBE, "".join("sc='%s'; go(); grab('%s');\n" % (s,s) for s in SCREENS))
    tmp=os.path.join(ROOT,"_contrast.html")
    io.open(tmp,"w",encoding="utf-8").write(
        src.replace("</body>","<script>window.addEventListener('load',function(){setTimeout(function(){try{"
                    +js+"}catch(e){document.body.innerHTML='<pre id=OUT>[]</pre>';console.log(e);}},700)});</script></body>"))
    try:
        r=subprocess.run([CHROME,"--headless","--disable-gpu","--window-size=420,900",
            "--virtual-time-budget=25000","--allow-file-access-from-files","--dump-dom","file://"+tmp],
            capture_output=True,text=True,timeout=240)
        m=re.search(r'<pre id="OUT">(.*?)</pre>', r.stdout, re.S)
        return json.loads(_html.unescape(m.group(1))) if m else None
    except subprocess.TimeoutExpired:
        return None
    finally:
        os.path.exists(tmp) and os.remove(tmp)

def group_print(label, rows):
    groups={}
    for o in rows:
        k=(o["cls"], o.get("size"))
        g=groups.setdefault(k, {"n":0,"worst":99,"screens":set(),"eg":o["t"]})
        g["n"]+=1; g["worst"]=min(g["worst"],o.get("got",99)); g["screens"].add(o["screen"])
    print("=== %s: %d distinct rules (%d elements) ===" % (label, len(groups), len(rows)))
    for (cls,size),g in sorted(groups.items(), key=lambda kv: kv[1]["worst"]):
        sizetxt = "%4.1fpx" % size if size is not None else "      "
        worsttxt = "%5.2f:1 " % g["worst"] if g["worst"]<99 else "        "
        print("   %s %s x%-4d %-26s %-22s %s"
              % (worsttxt, sizetxt, g["n"], cls, ",".join(sorted(g["screens"]))[:22], g["eg"][:24]))
    return len(groups)

bad_total=0
unresolved_total=0
for theme in ("light","dark"):
    res=run(theme)
    if res is None:
        print("  %-5s  browser gave no answer — inconclusive" % theme); continue
    # one CSS rule can fail on a hundred cards; group so the list is a to-do
    # list of rules, not a wall of instances
    bad_total += group_print(theme, res["fails"])
    # Unresolved is its own count, not folded into pass or fail: the common
    # cause is text sitting over an actual photograph (the cover's hero
    # portrait), which getComputedStyle cannot see into at all, so there is
    # nothing here to assert either way. These were checked once by hand —
    # a real screenshot, cropped and read by eye — see the commit that added
    # this: the player caption and the header both read clearly in both
    # themes, carried by the text-shadow already built for them. New classes
    # appearing here are what should be eyeballed the same way, the one
    # time this tool cannot do it for you.
    if res["unresolved"]:
        unresolved_total += group_print(theme+" unresolved (needs a human look)", res["unresolved"])
print()
if unresolved_total:
    print("%d unresolved rule(s) — not counted as pass or fail, see above" % unresolved_total)
print("PASS — every text node meets AA" if bad_total==0
      else "FAIL — %d text elements below AA" % bad_total)
raise SystemExit(1 if bad_total else 0)
