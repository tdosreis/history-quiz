#!/usr/bin/env python3
"""One-time patches to the sticker album, medals and sheets: football words and rules -> history's."""
import io, os, re, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
P = os.path.join(ROOT, "index.html")
s = io.open(P, encoding="utf-8").read()
applied = []

def region(start_pat, end_pat, new, tag):
    global s
    if "/*@@%s@@*/" % tag in s: return
    m = re.search(start_pat, s, re.M)
    if not m: sys.exit("start not found for " + tag)
    n = re.compile(end_pat, re.M).search(s, m.end())
    if not n: sys.exit("end not found for " + tag)
    s = s[:m.start()] + "/*@@%s@@*/\n%s\n/*@@/%s@@*/\n" % (tag, new.strip("\n"), tag) + s[n.start():]
    applied.append(tag)

def sub(old, new, tag, count=1):
    global s
    if old not in s:
        if new in s: return
        sys.exit("text not found for " + tag + ": " + old[:70])
    s = s.replace(old, new, count); applied.append(tag)

# ── icons history needs ──
sub("  calendar: _ico('M4.5 5.5h15v15h-15zM4.5 10h15M9 3v4.4M15 3v4.4'),\n};",
    """  calendar: _ico('M4.5 5.5h15v15h-15zM4.5 10h15M9 3v4.4M15 3v4.4'),
  scroll: _ico('M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 0 2 2H9a2 2 0 0 1-2-2V4zM7 4a2 2 0 0 0-2 2v1h2M11 9h6M11 13h6'),
  flag:   _ico('M5 21V4M5 4h11l-2 4 2 4H5'),
  column: _ico('M5 5h14M6 8h12M8 8v10M12 8v10M16 8v10M6 18h12M5 21h14'),
  globe:  _ico('M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18'),
  torch:  _ico('M12 3c3 3 3 6 0 9-3-3-3-6 0-9zM9 12h6l-1 9h-4z'),
};""", "icons")

# ── the back of the sticker ──
region(r"^function playerFacts\(p\) \{", r"^/\* The reverse of an album card, shaped like the front", '''
function playerFacts(p) {
  const out = [];
  out.push(`${POS_NAME[p.pos]} · ${CTRY_NAME[p.ctry] || p.ctry}`);
  if (p.era) out.push(eraTxt(p.era));
  const honours = [];
  if (p.nb) honours.push(p.nb === 1 ? 'Prêmio Nobel' : `${p.nb} Prêmios Nobel`);
  if (p.ev && p.ev.length) honours.push(p.ev.slice(0, 2).map(e => EVENTS[e].n).join(' · '));
  /* "Napoleão Bonaparte" already says Bonaparte — only print the epithet
     when it is not sitting in the name already. */
  const nick = p.nick && !p.n.toLowerCase().includes(p.nick.toLowerCase()) ? p.nick : null;
  return { line: out.join(' · '), honours,
           clubs: (p.clubs || []).slice(0, 4).map(clubName).join(' · '), nick };
}

function clubFacts(c) {
  return { line: `${yearTxt(c.f)} – ${c.e ? yearTxt(c.e) : 'hoje'} · ${REGION[c.s]}`, honours: [], clubs: '', nick: c.a };
}
''', "facts")
sub("const yrs = p.era ? `${p.era[0]}–${p.era[1]}` : '';", "const yrs = p.era ? eraTxt(p.era) : '';", "back-yrs")

# ── the rarest sheet: monuments, where football had mascots ──
region(r"^/\* ═+\n   MASCOTES — the rarest sheet", r"^/\* ═+\n   THE OTHER STICKERS", r'''
/* ═══════════════════════════════════════════════════
   MONUMENTOS — the rarest sheet in the album

   A state's monument turns up only when you answer that state a second time:
   the first time earns its brasão, coming back to it earns the stone it left
   behind. Monuments with no state of their own — Petra, Stonehenge — are
   stuck by the question that shows their photograph.
   Every picture is a photograph from Wikimedia Commons, printed in a round
   window; the credits screen lists each one.
═══════════════════════════════════════════════════ */
let _mpN = 0;
const monDisc = (k, c1, c2, id = 'mp' + (++_mpN)) => `<svg viewBox="0 0 80 80" width="100%" aria-hidden="true"
  style="display:block;width:100%;height:100%;"><defs><clipPath id="${id}"><circle cx="40" cy="40" r="33"/></clipPath></defs>
  <rect width="80" height="80" fill="var(--retro-card)"/>
  <circle cx="40" cy="40" r="35.5" fill="${c2 || '#E9DDC1'}"/>
  <image href="${STAD_IMGS[k] || ''}" x="7" y="7" width="66" height="66" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/>
  <circle cx="40" cy="40" r="33" fill="none" stroke="${c1 || '#7B1E3A'}" stroke-width="2.5"/>
</svg>`;
const MASC_ART = {};
const MASCOTS = {};
Object.keys(STAD).forEach(k => {
  MASCOTS[k] = { n: STAD[k].name, art: k, p: STAD[k].p || '', city: STAD[k].city };
  MASC_ART[k] = (c1, c2) => monDisc(k, c1, c2);
});
/* the first monument of a state the album does not hold yet */
const nextMonument = id => Object.keys(MASCOTS).find(k => MASCOTS[k].p === id && !album.has(SK.msc(k)));
''', "monuments")

sub("      if (album.has(SK.esc(id)) && MASCOTS[id]) out.push(SK.msc(id));",
    "      if (album.has(SK.esc(id))) { const mk = nextMonument(id); if (mk) out.push(SK.msc(mk)); }", "earn-monument")
if False: sub("  if (q.flag && ALL_SET.has(SK.sel(q.flag))) out.push(SK.sel(q.flag));",
    "  if (q.flag && ALL_SET.has(SK.sel(q.flag))) out.push(SK.sel(q.flag));\n  if (q.stad && MASCOTS[q.stad] && !MASCOTS[q.stad].p) out.push(SK.msc(q.stad));", "earn-stad")

# stk(): descriptors
sub("return { kind:'escudo',  id, n: clubName(id), sub:'Escudo' }; }", "return { kind:'escudo',  id, n: clubName(id), sub:'Brasão' }; }", "stk-esc")
sub("return { kind:'selecao', id: c, n: CTRY_NAME[c] || c, sub:'Seleção' }; }", "return { kind:'selecao', id: c, n: CTRY_NAME[c] || c, sub:'Nação' }; }", "stk-sel")
sub("return { kind:'mascote', id, n: m.n || '', sub: clubName(id) }; }", "return { kind:'mascote', id, n: m.n || '', sub: m.city || '' }; }", "stk-msc")

# figExtra: the band and the art of each kind
sub("    band = br ? br.s : 'EXTERIOR';", "    band = br ? REGION[br.s].toUpperCase() : '';", "fx-band")
sub("    band = 'SELEÇÃO';\n    art  = selecaoArt(st.id);", "    band = 'NAÇÃO';\n    art  = selecaoArt(st.id);", "fx-sel")
region(r"^    band = 'MASCOTE';", r"^  const c = opts\.copy \|\| null;", '''
    band = 'MONUMENTO';
    const m  = MASCOTS[st.id] || {};
    const br = CL.find(c => c.id === m.p);
    tint = br ? ` style="background:${hexA(br.c1, .16)}"` : '';
    art  = `<span class="fig-msc">${(MASC_ART[m.art] || (() => ''))(br && br.c1, br && br.c2)}</span>`;
  }
''', "fx-msc")

# ── the cards themselves: when and where, in centuries ──
sub("const MODERN_FROM = 2000;", "const MODERN_FROM = 1850;", "modern-from")
region(r"^const CTRY_COLORS = \{", r"^const ctryColors = ", r"""
const CTRY_COLORS = {
  BRA:['#FEDF00','#009B3A'], ARG:['#74ACDF','#F6B40E'], POR:['#DA291C','#046A38'],
  FRA:['#002395','#ED2939'], NED:['#AE1C28','#21468B'], GER:['#DD0000','#FFCE00'],
  ITA:['#008C45','#CD212A'], ENG:['#CE1124','#0A2C6B'], ESP:['#AA151B','#F1BF00'],
  URU:['#0038A8','#F6B40E'], BEL:['#FAE042','#ED2939'], CRO:['#FF0000','#171796'],
  COL:['#FCD116','#003893'], SWE:['#FECC00','#006AA7'], POL:['#DC143C','#EEEEEE'],
  EGY:['#CE1126','#111111'], CMR:['#007A5E','#FCD116'], NOR:['#BA0C2F','#00205B'],
  UKR:['#FFDD00','#0057B7'], HUN:['#CE2939','#477050'], CZE:['#D7141A','#11457E'],
  DEN:['#C8102E','#EEEEEE'], RUS:['#0039A6','#D52B1E'], MEX:['#006847','#CE1126'],
  CHI:['#D52B1E','#0039A6'], GHA:['#CE1126','#006B3F'], SCO:['#0065BD','#EEEEEE'],
  WAL:['#C8102E','#00AB39'], SEN:['#00853F','#FDEF42'], NGA:['#008751','#EEEEEE'],
  BUL:['#00966E','#D62612'], CIV:['#F77F00','#009E60'], LBR:['#BF0A30','#002868'],
  USA:['#B22234','#3C3B6E'], GRC:['#0D5EAF','#EEEEEE'], TUR:['#E30A17','#EEEEEE'], IRN:['#239F40','#DA0000'],
  IRQ:['#CE1126','#111111'], ISR:['#0038B8','#EEEEEE'], IND:['#FF9933','#138808'], CHN:['#DE2910','#FFDE00'],
  MNG:['#C4272F','#015197'], TUN:['#E70013','#EEEEEE'], AUT:['#ED2939','#EEEEEE'], CUB:['#002A8F','#CF142B'],
  VEN:['#FFCC00','#00247D'], HAI:['#00209F','#D21034'], ZAF:['#007749','#FFB81C'], MLI:['#14B53A','#FCD116'],
  MAR:['#C1272D','#006233'], UZB:['#0099B5','#1EB53A'], NPL:['#DC143C','#003893'], VNM:['#DA251D','#FFFF00'],
  CHE:['#DA291C','#EEEEEE'], SRB:['#C6363C','#0C4076'], MKD:['#D20000','#FFE600'], ETH:['#078930','#DA121D'],
  AGO:['#CC092F','#111111'], JPN:['#BC002D','#EEEEEE'], PER:['#D91023','#EEEEEE'], PAR:['#D52B1E','#0038A8'],
  IRL:['#169B62','#FF883E'], ROU:['#002B7F','#FCD116'], KOR:['#CD2E3A','#0047A0'], ALG:['#006233','#D21034'],
};
""", "ctry-colors")
sub("const bandDec = yr => 'ANOS ' + decName(Math.floor(yr / 10) * 10);", "const bandDec = yr => 'SÉC. ' + centTxt(yr).slice(7).toUpperCase();", "banddec")
sub("""    (opts.hideEra || opts.noYear || !yr) ? ''
      : opts.hideCtry ? bandDec(yr) : String(Math.floor(yr / 10) * 10).slice(2),""", """    (opts.hideEra || opts.noYear || !yr) ? ''
      : opts.hideCtry ? bandDec(yr) : '',""", "bandtxt")

# ── pages of the album: by age, not by decade ──
region(r"^function albumPages\(items\) \{", r"^/\* The end of a section is printed as a pitch", r"""
function albumPages(items) {
  if (!items.length) return [];
  const dec = g => g.p.era ? g.p.era[0] : 1800;
  const sorted = items.slice().sort((a, b) => dec(a) - dec(b) || a.n - b.n);
  const pages = [];
  for (let i = 0; i < sorted.length; i += ALB_PER) {
    const its = sorted.slice(i, i + ALB_PER);
    const ds = its.map(dec);
    /* the page is printed on the paper of the age most of it belongs to */
    const tally = {};
    ds.forEach(d => { const k = decStyle(d); tally[k] = (tally[k] || 0) + 1; });
    const main = ds[Math.floor(ds.length / 2)];
    pages.push({ from: ds[0], to: ds[ds.length - 1], main, items: its });
  }
  return pages;
}

/* What a spread is called: the age its cards were born in, then the span. */
const AGES = [[-Infinity, 476, 'Antiguidade'], [476, 1450, 'Idade Média'], [1450, 1789, 'Idade Moderna'],
              [1789, 1914, 'Século XIX'], [1914, Infinity, 'Século XX']];
const ageOf = y => (AGES.find(a => y >= a[0] && y < a[1]) || AGES[AGES.length - 1])[2];
const decName = d => centTxt(d).replace('século ', '');
const decLabel = pg => {
  const a = ageOf(pg.from), b = ageOf(pg.to);
  return a === b ? a : `${a} – ${b}`;
};

/* Which paper the spread is printed on. The album spans five thousand years, and
   a page of papyrus-age cards has no business looking like a page of modern ones. */
""", "album-pages")
sub("""const decStyle = d => d <= 1940 ? 'dec-a' : d <= 1960 ? 'dec-b'
                    : d <= 1970 ? 'dec-c' : d <= 1980 ? 'dec-d'
                    : d <= 1990 ? 'dec-e' : d <= 2000 ? 'dec-f' : 'dec-g';""",
"""const decStyle = d => d < 500 ? 'dec-a' : d < 1450 ? 'dec-b'
                    : d < 1650 ? 'dec-c' : d < 1800 ? 'dec-d'
                    : d < 1900 ? 'dec-e' : d < 1950 ? 'dec-f' : 'dec-g';""", "decstyle")

# the back of the other stickers
region(r"^  const lines = \[\];\n  if \(st\.kind === 'escudo'\) \{", r"^  const c = copyOf\(sid\);\n  return `\n    <span class=\"figback", """
  const lines = [];
  if (st.kind === 'escudo') {
    const cl = CL.find(c => c.id === st.id);
    if (cl) lines.push(`${REGION[cl.s]} · ${yearTxt(cl.f)} – ${cl.e ? yearTxt(cl.e) : 'hoje'}`);
    const men = PL.filter(x => (x.clubs || []).includes(st.id));
    if (men.length) lines.push(men.slice(0, 4).map(x => x.n).join(' · '));
  } else if (st.kind === 'selecao') {
    const men = PL.filter(x => x.ctry === st.id);
    lines.push(`${men.length} ${men.length === 1 ? 'figurinha' : 'figurinhas'} no álbum`);
    const nb = men.reduce((a, x) => a + (x.nb || 0), 0);
    if (nb) lines.push(`Prêmios Nobel: ${nb}`);
    lines.push(men.slice(0, 4).map(x => x.n).join(' · '));
  } else {
    const m = MASCOTS[st.id] || {};
    lines.push(`Monumento · ${m.city || ''}`);
    if (m.p) lines.push(`Ligado ${toClub(m.p)}`);
  }
""", "extraback")
sub("    kind === 'escudo'  ? ICON.shield('currentColor', 30)\n  : kind === 'selecao' ? ICON.shirt('currentColor', 30)\n  : kind === 'mascote' ? ICON.star('currentColor', 30)",
    "    kind === 'escudo'  ? ICON.shield('currentColor', 30)\n  : kind === 'selecao' ? ICON.flag('currentColor', 30)\n  : kind === 'mascote' ? ICON.column('currentColor', 30)", "ghost")
sub("const UNPAINTED = new Set(['nedved', 'gento', 'rossi', 'antony', 'butragueno', 'meazza']);", "const UNPAINTED = new Set([]);", "unpainted")
sub("(FAMOUS.has(p.id) || (p.wc && p.wc.length) || p.bo > 0));", "(FAMOUS.has(p.id) || p.nb > 0));", "hero")

# ── medals ──
for old, new, tag in [
 ("{ id:'first',  ic:'ball', n:'Estreia',", "{ id:'first',  ic:'scroll', n:'Estreia',", 'm1'),
 ("{ id:'ten',    ic:'shirt', n:'Rodada',", "{ id:'ten',    ic:'column', n:'Rodada',", 'm2'),
 ("{ id:'alb25',  ic:'shirt', n:'Começou a colar'", "{ id:'alb25',  ic:'column', n:'Começou a colar'", 'm3'),
 ("{ id:'alb60',  ic:'ball',  n:'Sessenta coladas'", "{ id:'alb60',  ic:'scroll',  n:'Sessenta coladas'", 'm4'),
 ("n:'Todos os craques', d:'Colecione todos os jogadores',", "n:'Todos os personagens', d:'Colecione todas as figuras da História',", 'm5'),
 ("{ id:'albEsc', ic:'shield', n:'Chapa dos escudos', d:`Colecione os ${ESCUDOS.length} escudos`,", "{ id:'albEsc', ic:'shield', n:'Galeria dos brasões', d:`Colecione os ${ESCUDOS.length} brasões`,", 'm6'),
 ("{ id:'albSel', ic:'shirt',  n:'Todas as seleções', d:`Colecione as ${SELECOES.length} seleções`,", "{ id:'albSel', ic:'flag',  n:'Todas as nações', d:`Colecione as ${SELECOES.length} nações`,", 'm7'),
 ("{ id:'albMsc', ic:'star',   n:'Folha dos mascotes', d:`Colecione os ${MASCOTES.length} mascotes`,", "{ id:'albMsc', ic:'column',   n:'Folha dos monumentos', d:`Colecione os ${MASCOTES.length} monumentos`,", 'm8'),
 ("/* The mascots only turn up on a club you have already answered once, so this\n     is the one that asks you to go back through the book. */", "/* The monuments only turn up on a state you have already answered once, so this\n     is the one that asks you to go back through the book. */", 'm9'),
]:
    sub(old, new, tag)

# ── the album's sections ──
region(r"^    const LANGS = \{", r"^    const sidOf  = g => g\.sid \|\| g\.p\.id;", r"""
    const LANGS = {
      BRA:'Brazil · Brasilien · Brésil · Brasile', ARG:'Argentina · Argentinien · Argentine',
      ITA:'Italy · Italien · Italie · Italia',     GER:'Germany · Deutschland · Allemagne',
      ENG:'England · Angleterre · Inghilterra',    FRA:'France · Frankreich · Francia',
      ESP:'Spain · Spanien · Espagne · Spagna',    POR:'Portugal · Portogallo',
      NED:'Holland · Niederlande · Pays-Bas',      URU:'Uruguay · Uruguai',
      USA:'United States · Vereinigte Staaten',    GRC:'Greece · Griechenland · Grèce · Grecia',
      RUS:'Russia · Russland · Russie · Russia',   EGY:'Egypt · Ägypten · Égypte · Egitto',
      CHN:'China · Chine · Cina',                  AUT:'Austria · Österreich · Autriche',
      IRQ:'Iraq · Irak · Irak · Iraq',             TUR:'Turkey · Türkei · Turquie · Turchia',
      IRN:'Iran · Persia · Perse',                 POL:'Poland · Polen · Pologne · Polonia',
    };
    /* Sections that are not countries: what the band, the tab and the pages
       of each are called. */
    const SEC = {
      __resto:    { t:'RESTO DO MUNDO', tab:'RDM', langs:'Rest of the world · Rest der Welt',
                    ic: () => ICON.globe('currentColor', 15) },
      __escudos:  { t:'BRASÕES',        tab:'BRS', langs:'Coats of arms · Wappen · Stemmi',
                    page:'Brasões', ic: () => ICON.shield('currentColor', 14) },
      __selecoes: { t:'NAÇÕES',         tab:'NAÇ', langs:'Nations · Nationen · Nazioni',
                    page:'Nações', ic: () => ICON.flag('currentColor', 14) },
      __mascotes: { t:'MONUMENTOS',     tab:'MON', langs:'Monuments · Denkmäler · Monumenti',
                    page:'Monumentos', ic: () => ICON.column('currentColor', 14) },
    };
""", "alb-sec")
region(r"^const albPitch = wide => \{", r"^/\* What an empty pocket has printed in it", r"""
const albPitch = wide => {
  /* a certificate border: a frame, an inner rule and the corners of a seal */
  const r = [[3, 6, 94, 88], [8, 14, 84, 72]];
  const cross = wide ? '<line x1="50" y1="6" x2="50" y2="94"/>' : '<line x1="3" y1="50" x2="97" y2="50"/>';
  return `<svg class="alb-pitch" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <rect x="0" y="0" width="100" height="100"/>${cross}
    ${r.map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`).join('')}</svg>`;
};

""", "alb-pitch")

io.open(P, "w", encoding="utf-8").write(s)
print("applied:", ", ".join(applied) or "nothing (already applied)")
