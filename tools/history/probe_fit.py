#!/usr/bin/env python3
"""Nothing in this app should scroll (History Quiz; ported from Futebol Quiz). This measures whether that is true.

  CI=1 CHROME=/path/to/chromium python3 tools/history/probe_fit.py [size-label ...]

Renders every screen at several real phone sizes and reports anything taller
than the viewport: the page itself, and any .scroll-y box whose content
overflows its own frame. Screens are driven through the real state machine,
and the deals are repeated, because one deal is not a sample — a ten-tile
board with a long "Você sabia?" is the case that overflows, and it only turns
up on some questions.

The fonts are the app's own (img/fonts), so every screen is measured in
Fraunces and Archivo, as players see it, with or without a network.

The Android nav bar is simulated the way the album work found it had to be:
headless reports env(safe-area-inset-bottom) as 0, so the inset is string-
replaced into the source before rendering.
"""
import subprocess, os, io, re, json, sys

ROOT   = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
CHROME = os.environ.get("CHROME", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")

# label, css width, css height, simulated bottom inset
CHROME_H = 87   # headless browser chrome, measured

SIZES = [
    ("small-360x640",  360, 640, 0),
    ("iphone-390x844", 390, 844, 0),
    ("pixel-412x915",  412, 915, 48),
    ("tall-360x780",   360, 780, 40),
    ("chrome-tab-412x750", 412, 750, 0),   # a 412px phone inside Chrome's address bar and nav bar
]

PROBE = r"""
  function fit(label){
    var de = document.documentElement, b = document.body;
    var vh = de.clientHeight;
    /* #qz is capped to the viewport and clips, so the page can no longer
       grow: what matters now is whether a screen's content is TALLER than
       the frame it is being drawn into, i.e. whether anything is cut off. */
    var qz = document.getElementById('qz');
    var pgEl = document.querySelector('#ct > .pg');
    var over = Math.max(de.scrollHeight - vh, 0);
    /* the vitrine is a scrolling showcase by design (a .scroll-y page, like the
       credits' list): only its frame has to fit, not what scrolls inside it */
    var scrolls = label === 'vitrine' && pgEl && /scroll-y/.test(pgEl.className);
    if (qz && pgEl) over = Math.max(over, (scrolls ? pgEl.clientHeight : pgEl.scrollHeight) - qz.clientHeight,
                                    qz.scrollHeight - qz.clientHeight);
    /* Créditos is the one box in the app allowed to scroll: it is ~200 photo
       attributions, a licence obligation rather than gameplay, and paginating
       a legal list would be worse to read. Its FRAME still has to fit, which
       the page check above enforces — only its contents may run long. */
    var boxes = [];
    /* the Cronologia's line of time grows by an event a turn and is a scrolling list by design: its frame
       is held to the screen like any other block, the events inside it may run on */
    if (label !== 'credits' && label !== 'vitrine') document.querySelectorAll('.scroll-y:not(.cron-line)').forEach(function(el){
      var d = el.scrollHeight - el.clientHeight;
      if (d > 1) boxes.push({cls: (el.className||'').slice(0,40), over: Math.round(d)});
    });
    /* what is actually making the page tall: the direct children of the
       screen, so the report names a block rather than the whole page */
    var tall = [];
    if (over > 1) {
      var pg = document.querySelector('#ct > .pg') || document.querySelector('#ct');
      if (pg) Array.prototype.forEach.call(pg.children, function(el){
        var r = el.getBoundingClientRect();
        tall.push({cls: (el.className||el.tagName||'').slice(0,26), h: Math.round(r.height)});
      });
      tall.sort(function(a,b){ return b.h - a.h; });
      tall = tall.slice(0, 4);
    }
    /* the verdict sheet comes up over the board: the right card must stay clear of it
       (measured from the layout, so the sheet's rising animation does not count) */
    var rv = document.getElementById('rvl');
    if (sc === 'reveal' && rv && qz) {
      var m = (rv.style.transform || '').match(/scale\(([\d.]+)\)/), sk = m ? +m[1] : 1;
      var top = qz.getBoundingClientRect().bottom - rv.offsetHeight * sk;
      document.querySelectorAll('.board .b-correct').forEach(function(g){
        var d = g.getBoundingClientRect().bottom - top;
        if (d > 6) boxes.push({cls: 'right card under the sheet', over: Math.round(d)});
      });
    }
    if (over > 1 || boxes.length) all.push({label: label, over: Math.round(over), vh: vh,
                                            boxes: boxes.slice(0,3), tall: tall});
    seen++;
  }
"""

DRIVE = r"""
  /* the still screens */
  ['home','album','medals','credits','difficulty','vitrine'].forEach(function(s){ sc=s; go(); fit(s); });
  /* the album: the world and its four parts, then every page of every place */
  ['WORLD','EU','AS','AF','AM'].forEach(function(v){ albView='map'; amapView=v; sc='album'; go(); fit('album/mapa-'+v); });
  albPlaces().order.forEach(function(c){
    var n = placePages(c).length;
    for (var pg=0; pg<n; pg++){ albView='place'; albCtry=c; albPage=pg; sc='album'; go(); fit('album/'+c+'/'+pg); }
  });
  albView='map';

  /* boards: several deals per level, because tile count varies by question */
  ['facil','moderado','dificil'].forEach(function(k){
    for (var i=0;i<3;i++){ diffKey=k; startGame(); fit("quiz/"+k); }
  });

  /* the ladder, every rung — the tall boards and the cartas especiais */
  for (var r=0;r<LADDER.length;r++){
    startMilhao(); rung=r; qi=r; disp=dealDisp(r); tMax=qTime(); tLeft=tMax;
    if (cat.qs[r]._special){ sc='card'; go(); fit('carta/'+cat.qs[r]._special); }
    sc='quiz'; go(); fit('milhao/rung'+(r+1));
    if (cat.qs[r].clues){ cat.qs[r]._shown=cat.qs[r].clues.length; go(); fit('milhao/rung'+(r+1)+'-4pistas'); }
  }

  /* the ladder sheet and the final-answer beat */
  startMilhao(); rung=9; qi=9; disp=dealDisp(9); sc='quiz'; ladderOpen=true; go(); fit('ladder-sheet');
  ladderOpen=false;
  startMilhao(); rung=ASK_FROM_RUNG; qi=rung; disp=dealDisp(qi); sel=new Set([disp[0].id]);
  sc='ask'; go(); fit('resposta-final');

  /* THE REVEAL — verdict + sticker back + "Você sabia?" + Próxima, all of it
     under the board. This is the one the player reported. Hold it on screen
     and try a lot of questions, long stories included. */
  advanceAfterReveal = function(){};
  ['moderado','dificil'].forEach(function(k){
    for (var i=0;i<7;i++){
      diffKey=k; startGame();
      var j = i % cat.qs.length;
      qi=j; disp=getDisp(cat.qs[j]); sel=new Set(cat.qs[j].a); tLeft=Math.round(tMax*0.6);
      doReveal();
      var st = document.querySelector('.story');
      fit('reveal/'+k+(st?'+story':''));
    }
  });
  for (var i=0;i<7;i++){
    startMilhao(); var r2=i%LADDER.length; rung=r2; qi=r2;
    disp=dealDisp(r2); sel=new Set(cat.qs[r2].a); tLeft=10; doReveal();
    var st2 = document.querySelector('.story');
    fit('reveal/milhao-rung'+(r2+1)+(st2?'+story':''));
  }
  /* and a miss, which prints the right answer as well */
  for (var i=0;i<4;i++){
    diffKey="dificil"; startGame();
    var q3=cat.qs[i%cat.qs.length]; qi=cat.qs.indexOf(q3); disp=getDisp(q3);
    var bad=disp.find(function(o){ return !q3.a.includes(o.id); });
    sel=new Set(bad?[bad.id]:[]); tLeft=5; doReveal();
    fit('reveal/errou');
  }

  /* the strips with a tall board under them, the right card dealt last (the bottom row, under the sheet) */
  [['charada-txt', function(q){ return q.rebus && q.type==='txt'; }],
   ['charada-fig', function(q){ return q.rebus && q.type==='player'; }],
   ['detalhe', function(q){ return q.detail; }],
   ['intruso-fig', function(q){ return q.odd && q.type==='player'; }],
   ['intruso-txt', function(q){ return q.odd && q.type==='txt'; }],
   ['citacao-fig', function(q){ return q.quote && q.type==='player'; }]].forEach(function(f){
    var qs5 = CATS.flatMap(function(c){ return c.qs; }).filter(f[1]);
    for (var i=0;i<3 && qs5.length;i++){
      var q5 = qs5[(i*11) % qs5.length];
      diffKey='moderado'; startGame(); cat.qs[0]=q5; qi=0; disp=getDisp(q5);
      var ai = disp.findIndex(function(o){ return q5.a.includes(o.id); });
      if (ai >= 0) disp.push(disp.splice(ai, 1)[0]);
      sc='quiz'; go(); fit('quiz/'+f[0]);
      sel=new Set(q5.a); tLeft=8; doReveal();
      fit('reveal/'+f[0]+(document.querySelector('.story')?'+story':''));
    }
  });

  /* the endings */
  startMilhao(); banked=1000000; rung=LADDER.length; cashed=true; sc='end'; go(); fit('end/milhao-win');
  startMilhao(); banked=5000; rung=7; cashed=false; sc='end'; go(); fit('end/milhao-queda');
  startMilhao(); banked=0; rung=1; cashed=false; sc='end'; go(); fit('end/milhao-zero');
  diffKey='moderado'; startGame(); nCorrect=14; sc='end'; go(); fit('end/treino');
  startSurvival(); nCorrect=9; sc='end'; go(); fit('end/mata-mata');

  /* the stamp album: every page of every theme, some stamps won */
  seloAll().forEach(function(id, i){ if (i % 3 === 0) awardSelo(id); });
  SELO_THEMES.forEach(function(t){
    var n = Math.ceil(seloBy()[t[0]].length / SELO_PER);
    for (var pg=0; pg<n; pg++){ seloTheme=t[0]; seloPage=pg; sc='selos'; go(); fit('selos/'+t[0]+'/'+pg); }
  });
  /* a right answer that wins a stamp prints it under the verdict */
  var withSelo = CATS.flatMap(function(c){ return c.qs.map(function(q){ return Object.assign({}, q, {_cat:c}); }); })
    .filter(function(q){ return seloOfQ(q) && !q.order; });
  for (var i=0;i<6;i++){
    var q4 = withSelo[(i*37) % withSelo.length]; delete selos[seloOfQ(q4)];
    diffKey='dificil'; startGame(); cat.qs[0]=q4; qi=0; disp=getDisp(q4); sel=new Set(q4.a); tLeft=8; doReveal();
    fit('reveal/selo'+(document.querySelector('.story')?'+story':''));
  }
  sc='end'; go(); fit('end/treino+selos');

  /* Que ano?: each event guessed and revealed, and the result */
  for (var g=0; g<3; g++){
    startAno();
    for (var k=0; k<ano.qs.length; k++){
      ano.i=k; ano.phase='guess'; go(); fit('ano/guess');
      ano.guess=ano.qs[k].e.y+3; anoCommit(); fit('ano/reveal'+(ano.qs[k].e.x?'+story':'')+(ano.log[ano.log.length-1].selo?'+selo':''));
    }
    ano.phase='end'; go(); fit('ano/end');
  }
  /* the fullest results: every year nailed (stamps and badges all at once) */
  startAno();
  for (var k2=0; k2<ano.qs.length; k2++){ ano.i=k2; ano.phase='guess'; ano.guess=ano.qs[k2].e.y; anoCommit(); }
  ano.i=ano.qs.length-1; anoNext(); window._newMedals = MEDALS.slice(0, 3); go(); fit('ano/end-cheio');
  /* Onde foi?: each event on the whole world, with a pin zoomed in, revealed near and far, and the result */
  for (var g2=0; g2<3; g2++){
    startOnde();
    for (var k4=0; k4<onde.qs.length; k4++){
      onde.i=k4; onde.phase='guess'; onde.pin=null; onde.v={cx:180,cy:67,z:1}; go(); fit('onde/guess');
      var at=onde.qs[k4].at, xy=ondeXY(at[0]+(k4%2?9:0.2), at[1]+(k4%3?14:0.3));
      onde.v={cx:xy[0],cy:xy[1],z:4}; go(); ondeSetPin(xy); fit('onde/pin');
      ondeCommit(); fit('onde/reveal'+(onde.qs[k4].e.x?'+story':'')+(onde.log[onde.log.length-1].selo?'+selo':''));
    }
    onde.phase='end'; go(); fit('onde/end');
  }
  startOnde();
  for (var k5=0; k5<onde.qs.length; k5++){ onde.i=k5; onde.phase='guess'; ondeSetPin(ondeXY(onde.qs[k5].at[0], onde.qs[k5].at[1])); ondeCommit(); }
  onde.i=onde.qs.length-1; ondeNext(); window._newMedals = MEDALS.slice(0, 3); go(); fit('onde/end-cheio');
  /* O desafio: the screen a link opens on, for every game, and who won, on each game's results */
  ['tf','tm','td','m','a','o','c'].forEach(function(g){
    chal = { g: g, seed: 12345, score: g==='m' ? 1000000 : g[0]==='t' ? 23456 : g==='c' ? 258 : 1000, more: g==='m' ? 16 : g[0]==='t' ? 20 : null, code: 'x' };
    sc='desafio'; go(); fit('desafio/'+g);
  });
  chal = { g:'o', seed: 4242, score: 815, more: null, accepted: true };
  startOnde(); for (var k6=0; k6<onde.qs.length; k6++){ onde.i=k6; onde.phase='guess'; ondeSetPin(ondeXY(onde.qs[k6].at[0], onde.qs[k6].at[1])); ondeCommit(); }
  onde.i=onde.qs.length-1; ondeNext(); window._newMedals = MEDALS.slice(0, 3); go(); fit('desafio/onde-end');
  chal = { g:'a', seed: 4243, score: 815, more: null, accepted: true };
  startAno(); for (var k7=0; k7<ano.qs.length; k7++){ ano.i=k7; ano.phase='guess'; ano.guess=ano.qs[k7].e.y; anoCommit(); }
  ano.i=ano.qs.length-1; anoNext(); window._newMedals = MEDALS.slice(0, 3); go(); fit('desafio/ano-end');
  chal = { g:'tm', seed: 4244, score: 815, more: 9, accepted: true };
  diffKey='moderado'; startGame(); clearInterval(tmr); pts=900; nCorrect=11; finishRun(); window._newMedals = MEDALS.slice(0, 3); sc='end'; go(); fit('desafio/treino-end');
  chal = { g:'m', seed: 4245, score: 5000, more: 7, accepted: true };
  startMilhao(); clearInterval(tmr); rung=9; banked=50000; finishRun(); window._newMedals = MEDALS.slice(0, 3); sc='end'; go(); fit('desafio/milhao-end');
  chal = { g:'c', seed: 4246, score: 12, more: null, accepted: true };
  startCron(); for (var k10=0; k10<14; k10++){ var e10=cron.cur, r10=cron.line.findIndex(function(x){return x.y>e10.y;}); cronPlace(r10<0 ? cron.line.length : r10); cron.cur=cron.deck.pop(); cron.phase='place'; }
  cron.lives=0; cron.phase='reveal'; cronNext(); window._newMedals = MEDALS.slice(0, 3); go(); fit('desafio/cron-end');
  chal = null; isMil = false;
  /* Cronologia: the first turn, a line growing long, each turn placed and revealed, right and wrong, and the result */
  for (var g3=0; g3<2; g3++){
    startCron(); fit('cron/first');
    for (var k9=0; k9<26; k9++){
      cron.phase='place'; go(); fit('cron/place');
      var n9=cron.line.length, e9=cron.cur, r9=cron.line.findIndex(function(x){return x.y>e9.y;}); if (r9<0) r9=n9;
      cronPlace(k9%4===3 ? (r9===0 ? n9 : 0) : r9);
      fit('cron/reveal'+(cron.last.ok?'':'-errou')+(cron.last.e.x?'+story':'')+(cron.last.selo?'+selo':''));
      cron.lives=CRON_LIVES; cron.cur=cron.deck.pop();
    }
    cron.lives=0; cron.phase='reveal'; go(); fit('cron/reveal-fim');
    cronNext(); window._newMedals = MEDALS.slice(0, 3); go(); fit('cron/end');
  }
  /* the Cronologia's door, fresh, with the day's line begun and with it laid; the day's line and its end */
  LS.set('cronDia', null); sc='cronMenu'; go(); fit('cron/menu');
  startCronDia(); fit('cron/dia-first');
  for (var k12=0; k12<6; k12++){ var e12=cron.cur, r12=cron.line.findIndex(function(x){return x.y>e12.y;}); cronPlace(r12<0?cron.line.length:r12); cronNext(); }
  sc='cronMenu'; go(); fit('cron/menu-continuar'); sc='home'; go(); fit('home/cron-continuar');
  startCronDia(); while (cron.phase !== 'end') { if (cron.phase === 'place') cronPlace(0 === cron.line.findIndex(function(x){return x.y>cron.cur.y;}) ? cron.line.length : 0); else cronNext(); }
  window._newMedals = MEDALS.slice(0, 3); go(); fit('cron/dia-end');
  sc='cronMenu'; go(); fit('cron/menu-feita'); startCronDia(); fit('cron/dia-rever');
  LS.set('cronDia', null);
  /* Antes ou depois?: guesses, right ones (some with a story), misses, a miss on time, the results */
  for (var g13=0; g13<8; g13++){
    startAod(); fit('aod/guess');
    for (var k13=0; k13<g13; k13++){ aodAnswer(aod.b.y<aod.a.y?'antes':'depois'); aodNext(); }
    fit('aod/guess-'+aod.score);
    aodAnswer(aod.b.y<aod.a.y?'antes':'depois'); fit('aod/certo'+(aod.b.x?'+story':'')+(aod.selo?'+selo':'')); aodNext();
    aodAnswer(g13%3===2 ? null : aod.b.y<aod.a.y?'depois':'antes'); fit('aod/errou'+(aod.b.x?'+story':''));
    aodNext(); window._newMedals = g13%2 ? MEDALS.slice(0, 3) : []; go(); fit('aod/end');
  }
  sc='cronMenu'; go(); fit('cron/menu-aod');
  /* Jornada: every page fresh, part-way and done, a stop's sheet, a stop's results, and the Que ano? door */
  var keepJ = LS.get('jornada', null);
  [null, { st: { nilo: 3, atenas: 2, roma: 1, castelos: 1 }, pts: {} }].forEach(function(pr){
    LS.set('jornada', pr);
    for (var k14=0; k14<JOR_ERAS.length; k14++){ jorPage=k14; jorSel=null; sc='jornada'; go(); fit('jornada/pg'+k14+(pr?'-meio':'-nova'));
      jorSel=JOR_STOPS.indexOf(JOR_ERAS[k14].stops[0]); go(); fit('jornada/sheet'+k14+(pr?'-meio':'-nova')); }
  });
  var all3 = {}; JOR_STOPS.forEach(function(s){ all3[s.id]=3; }); LS.set('jornada', { st: all3, pts: {} });
  for (var k15=0; k15<JOR_ERAS.length; k15++){ jorPage=k15; jorSel=null; sc='jornada'; go(); fit('jornada/pg'+k15+'-feita'); }
  LS.set('jornada', { st: { nilo: 1 }, pts: {} });
  [1, 6].forEach(function(i16){ startJor(i16); nCorrect = i16 === 1 ? 7 : 3; pts = 400; window._newMedals = MEDALS.slice(0, 2); finishRun(); go(); fit('jornada/fim-' + i16); });
  LS.set('jornada', keepJ); jorPage=null; jorSel=null;
  sc='anoMenu'; go(); fit('ano/menu');
  /* Retrato de época: the door, every question, a portrait for each kind on top */
  var keepRet = LS.get('retrato', null);
  startRetrato(); fit('retrato/intro');
  for (var k17=0; k17<RET_QS.length; k17++){ ret.phase='q'; ret.i=k17; go(); fit('retrato/q'+(k17+1)); }
  for (var k18=0; k18<4; k18++){ ret.phase='q'; ret.i=RET_QS.length-1; ret.picks=RET_QS.map(function(){ return k18; }); retPick(k18); fit('retrato/res-'+k18); }
  [[2,2,3,1,2,0,1,2],[0,3,1,2,0,2,0,0]].forEach(function(pk, j){ ret.phase='q'; ret.i=RET_QS.length-1; ret.picks=pk.slice(0, -1); retPick(pk[pk.length-1]); window._newMedals = MEDALS.slice(0, 2); go(); fit('retrato/res+medalhas'+j); });
  LS.set('retrato', keepRet); ret=null;
  /* Anacronismo: each one asked and revealed */
  CATS.flatMap(function(c){ return c.qs; }).filter(function(q){ return q.anachro; }).slice(0, 12).forEach(function(q, j){
    diffKey='moderado'; startGame(); cat.qs[0]=q; qi=0; disp=getDisp(q); sc='quiz'; go(); fit('anacronismo/'+j);
    sel=new Set(q.a); tLeft=8; doReveal(); fit('anacronismo/'+j+'-rev'+(document.querySelector('.story')?'+story':''));
  });
  /* Metas da semana: fresh, one met with its stamp, all three met */
  LS.set('metas', null); sc='metas'; go(); fit('metas/nova');
  var sm=metasState(), lm=metasList(); sm.base[lm[0].m.id]=lm[0].m.v()-lm[0].n; sm.base[lm[1].m.id]=lm[1].m.v()-Math.floor(lm[1].n/2); LS.set('metas', sm); metasCheck(); go(); fit('metas/uma');
  metasList().forEach(function(g){ sm.base[g.m.id]=g.m.v()-g.n; }); LS.set('metas', sm); metasCheck(); go(); fit('metas/todas');
  document.querySelectorAll('.meta-toast').forEach(function(e){ e.remove(); }); LS.set('metas', null);
  /* Hoje na História: days through the year, each date guessed and revealed, the result, and the cover once it is done */
  for (var g4=0; g4<4; g4++){
    ano = buildHoje(new Date(2026, g4*3, 3+g4*7)); sc='ano';
    for (var k11=0; k11<ano.qs.length; k11++){
      ano.i=k11; ano.phase='guess'; go(); fit('hoje/guess');
      ano.guess=ano.qs[k11].e.y+2; anoCommit(); fit('hoje/reveal'+(ano.qs[k11].e.x?'+story':''));
    }
    ano.i=ano.qs.length-1; anoNext(); window._newMedals = g4 ? [] : MEDALS.slice(0, 3); go(); fit('hoje/end');
  }
  LS.set('hojeRes', { day: dayIndex(), pts: 420 }); sc='home'; go(); fit('home/hoje-feito');
  LS.set('hojeRes', null);
  /* Revisar: ten misses filed, the round, and its end with more left to review */
  var rq = CATS.flatMap(function(c){ return c.qs; }).slice(0, 14), rf = {};
  rq.forEach(function(q){ rf[q.t] = [0, dayIndex()]; }); LS.set('rev', rf);
  sc='home'; go(); fit('home/revisar');
  startRev(); clearInterval(tmr); fit('revisar/quiz');
  for (var k8=0; k8<cat.qs.length; k8++){ qi=k8; disp=getDisp(cat.qs[k8]); sel=new Set(k8 % 2 ? cat.qs[k8].a : ['x']); tLeft=30; doReveal(); }
  finishRun(); window._newMedals = MEDALS.slice(0, 3); sc='end'; go(); fit('revisar/end');
  isRev = false; LS.set('rev', {});
  /* and a training round won outright: the pack opened, stamps and badges */
  selos = {}; diffKey='moderado'; startGame();
  cat.qs = withSelo.slice(0, 10); disp = getDisp(cat.qs[0]);
  for (var k3=0; k3<cat.qs.length; k3++){ qi=k3; disp=getDisp(cat.qs[k3]); sel=new Set(cat.qs[k3].a); tLeft=8; doReveal(); }
  finishRun(); runPackOpened=true; window._newMedals = MEDALS.slice(0, 3); sc='end'; go(); fit('end/treino-cheio');
"""

def run(label, w, h, inset):
    src = io.open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
    if inset:
        src = re.sub(r"env\(safe-area-inset-bottom,\s*0px\)", "%dpx" % inset, src)
    # Measure the settled layout, not the entrance. Every screen slides in by
    # 6px and the reveal panel by 16px, and a measurement taken mid-flight
    # reads those as overflow -- which is exactly the constant +6 and +22 this
    # probe reported on screens that plainly fit.
    src = src.replace("</head>", "<style>*,*::before,*::after{animation:none !important;"
                      "transition:none !important}</style></head>")
    js = ("(function(){var all=[],seen=0;" + PROBE + "try{" + DRIVE
          + "}catch(e){all.push({label:'EXCEPTION',over:0,vh:0,boxes:[],"
            "tall:[{cls:(e&&(e.stack||e.message))||String(e),h:0}]});}"
            "var d=document.createElement('pre');d.id='OUT';"
            "d.textContent=JSON.stringify({checked:seen,bad:all});"
            "document.body.appendChild(d);})();")
    tmp = os.path.join(ROOT, "_fit.html")
    io.open(tmp, "w", encoding="utf-8").write(
        src.replace("</body>", "<script>window.addEventListener('load',function(){"
                    "setTimeout(function(){" + js + "},400)});</script></body>"))
    try:
        dom = subprocess.run([CHROME] + (["--no-sandbox"] if os.environ.get("CI") else []) + ["--headless", "--disable-gpu", "--hide-scrollbars",
                              # --window-size is the WINDOW: headless still keeps ~87px of
                              # browser chrome, so a "640" window was measuring a 553px
                              # viewport and the labels were lying about which phone failed.
                              "--window-size=%d,%d" % (w, h + CHROME_H), "--allow-file-access-from-files",
                              "--virtual-time-budget=20000", "--dump-dom", "file://" + tmp],
                             capture_output=True, text=True, timeout=560).stdout
    finally:
        if os.path.exists(tmp): os.remove(tmp)
    m = re.search(r'<pre id="OUT">(.*?)</pre>', dom, re.S)
    if not m:
        print("  %s: NO OUTPUT" % label)
        for u in re.findall(r"Uncaught[^<\n]*", dom)[:3]: print("     " + u)
        return None
    return json.loads(m.group(1).replace("&quot;", '"').replace("&amp;", "&")
                                .replace("&lt;", "<").replace("&gt;", ">"))

want = sys.argv[1:]
total_bad = 0
for label, w, h, inset in SIZES:
    if want and label not in want: continue
    r = run(label, w, h, inset)
    if r is None: total_bad += 1; continue
    # one line per distinct screen, worst overflow kept
    worst = {}
    for b in r["bad"]:
        k = b["label"]
        if k not in worst or b["over"] > worst[k]["over"]: worst[k] = b
    print("\n== %s (%dx%d, inset %d) — %d states checked, %d overflowing =="
          % (label, w, h, inset, r["checked"], len(worst)))
    for k in sorted(worst, key=lambda k: -worst[k]["over"]):
        b = worst[k]
        bits = "  ".join("%s %dpx" % (t["cls"], t["h"]) for t in b["tall"])
        box = "  ".join("%s +%d" % (x["cls"], x["over"]) for x in b["boxes"])
        print("   %-34s page +%-4d %s%s" % (k, b["over"], bits, ("  | box: " + box) if box else ""))
    total_bad += len(worst)

print("\n%s" % ("PASS — nothing scrolls" if total_bad == 0
                else "FAIL — %d screen/size combinations overflow" % total_bad))
sys.exit(0 if total_bad == 0 else 1)
