#!/usr/bin/env python3
"""Build the history data layer and splice it into index.html.

Sources (tools/history/*.tsv, data/history_*.json) -> JavaScript blocks, written
between sentinels in index.html:

    /*@@name@@*/ ... /*@@/name@@*/

Run after editing any TSV or after fetching pictures:

    python3 tools/history/build.py

The first run (migrate) swaps out the football blocks and plants the sentinels;
later runs just refill them.
"""
import io, os, re, sys, json

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
H = os.path.join(ROOT, "tools", "history")
PAGE = os.path.join(ROOT, "index.html")


def rows(name, n):
    out = []
    for l in io.open(os.path.join(H, name), encoding="utf-8"):
        l = l.rstrip("\n")
        if not l.strip() or l.startswith("#"):
            continue
        r = l.split("|")
        r += [""] * (n - len(r))
        out.append(r)
    return out


def js(s):
    return json.dumps(s, ensure_ascii=False)


def q(s):
    return "'" + s.replace("\\", "\\\\").replace("'", "\\'") + "'"


# ───────────────────────── brace matching ─────────────────────────
def match(s, start):
    """End (exclusive) of the bracket opened at s[start], skipping strings,
    template literals and comments."""
    pairs = {"[": "]", "{": "}", "(": ")"}
    op = s[start]; cl = pairs[op]
    depth, k, n = 0, start, len(s)
    while k < n:
        c = s[k]
        if c in "'\"`":
            qc, k = c, k + 1
            while k < n:
                if s[k] == "\\": k += 2; continue
                if s[k] == qc: break
                if qc == "`" and s[k] == "$" and s[k + 1:k + 2] == "{":
                    k = match(s, k + 1); continue
                k += 1
        elif c == "/" and s[k + 1:k + 2] == "/":
            k = s.index("\n", k)
        elif c == "/" and s[k + 1:k + 2] == "*":
            k = s.index("*/", k) + 1
        elif c == op:
            depth += 1
        elif c == cl:
            depth -= 1
            if depth == 0:
                return k + 1
        k += 1
    raise ValueError("unbalanced")


def stmt_end(s, decl_start):
    """End of the `const X = <literal>;` that starts at decl_start."""
    eq = s.index("=", decl_start)
    i = eq + 1
    while s[i] in " \n": i += 1
    e = match(s, i)
    if s[e:e + 1] == ";": e += 1
    return e


# ───────────────────────── data → JS ─────────────────────────
ART_OF = {  # article used before a polity's name; '' = none ("em Atenas")
    "atenas": "", "esparta": "", "babilonia": "", "cartago": "", "portugal": "", "cuba": "", "israel_antigo": "o",
    "haiti": "o", "veneza": "", "republica_florentina": "a", "estados_unidos": "os", "brasil_republica": "o",
    "india": "a", "turquia": "a", "suecia": "a", "holanda": "a", "espanha": "a", "inglaterra": "a", "francia": "a",
    "prussia": "a", "gran_colombia": "a", "africa_do_sul": "a", "urss": "a", "italia_fascista": "a",
    "alemanha_nazista": "a", "china_popular": "a", "reino_unido": "o", "franca_revolucionaria": "a",
}
FEM_FIRST = {"República", "Dinastia", "Civilização", "Reino"}  # Reino is masculine, removed below
FEM_FIRST = {"República", "Dinastia", "Civilização"}


def polity_art(pid, name):
    if pid in ART_OF: return ART_OF[pid]
    w = name.split()[0]
    return "a" if w in FEM_FIRST else "o"


def gen_cl():
    P = rows("polities.tsv", 9)
    out = ["const CL = ["]
    for pid, n, a, s, f, e, c1, c2, em in P:
        out.append("  { id:%s, n:%s, a:%s, s:%s, c1:%s, c2:%s, em:%s, f:%s, e:%s, art:%s }," % (
            q(pid), q(n), q(a), q(s), q(c1), q(c2), q(em), f, e, q(polity_art(pid, n))))
    out.append("];")
    out.append("const REGION = { EU:'Europa', AS:'Ásia', AF:'África', AM:'Américas' };")
    out.append("const REGION_DE = { EU:'da', AS:'da', AF:'da', AM:'das' };")
    return "\n".join(out)


def gen_stad():
    M = rows("monuments.tsv", 5)
    imgs = {}
    p = os.path.join(ROOT, "data", "history_monument_images.json")
    if os.path.exists(p): imgs = json.load(io.open(p, encoding="utf-8"))
    out = ["const STAD = {"]
    for k, n, city, wiki, pol in M:
        if k not in imgs: continue
        out.append("  %s: { name:%s, city:%s, p:%s }," % (k, q(n), q(city), q(pol)))
    out.append("};")
    out.append("const STAD_IMGS = {")
    for k, n, city, wiki, pol in M:
        if k in imgs: out.append("  %s: %s," % (k, q(imgs[k]["img"])))
    out.append("};")
    return "\n".join(out)


def gen_pl():
    F = rows("figures.tsv", 11)
    imgs = json.load(io.open(os.path.join(ROOT, "data", "history_images.json"), encoding="utf-8"))
    out = ["const PL = ["]
    missing = []
    for r in F:
        if r[0] not in imgs: missing.append(r[0]); continue
        out.append("  { id:%s, n:%s, img:%s }," % (q(r[0]), q(r[1]), q(imgs[r[0]]["img"])))
    out.append("];")
    return "\n".join(out), missing


def gen_lib():
    C = rows("ctries.tsv", 5)
    names = {c[0]: c[1] for c in C}
    out = []
    out.append("const POS_NAME = { GOV:'Poder', GEN:'Guerra', PEN:'Ideias', ART:'Artes', REV:'Reforma', EXP:'Viagens' };")
    out.append("const CTRY_NAME = " + js(names).replace('"', "'") + ";")
    out.append("const CTRY_ART = " + js({c[0]: c[2] for c in C if c[2]}).replace('"', "'") + ";")
    out.append("const CTRY_BAND = " + js({c[0]: c[4] for c in C if c[4]}).replace('"', "'") + ";")
    stems = []
    for c in C:
        for st in c[3].split(";"):
            if st: stems.append([st, c[0]])
    # longest stem first so 'irland' does not eat 'irlanda do norte'-like prefixes
    stems.sort(key=lambda x: -len(x[0]))
    out.append("const CTRY_STEMS = " + js(stems).replace('"', "'") + ";")
    out.append(LIB_FUNCS)
    return "\n".join(out)


LIB_FUNCS = r"""
/* "do Egito", "da França", "de Portugal" — the article each country takes */
const ctryDe = c => { const a = CTRY_ART[c], n = CTRY_NAME[c] || c;
  return (a === 'o' ? 'do ' : a === 'a' ? 'da ' : a === 'os' ? 'dos ' : a === 'as' ? 'das ' : 'de ') + n; };
const ctryEm = c => { const a = CTRY_ART[c], n = CTRY_NAME[c] || c;
  return (a === 'o' ? 'no ' : a === 'a' ? 'na ' : a === 'os' ? 'nos ' : a === 'as' ? 'nas ' : 'em ') + n; };
const bandCtry = c => (CTRY_BAND[c] || CTRY_NAME[c] || c).toUpperCase();

/* A polity is "o Império Romano", "a França", "Atenas" — the article decides
   every "pelo", "do" and "no" the generated questions need. */
const _pa = id => { const c = CL.find(x => x.id === id); return c ? c.art : 'o'; };
const _pn = id => (typeof clubName === 'function' ? clubName(id) : id);
const byClub = id => ({ o:'pelo ', a:'pela ', os:'pelos ', as:'pelas ', '':'por ' }[_pa(id)]) + _pn(id);
const ofClub = id => ({ o:'do ', a:'da ', os:'dos ', as:'das ', '':'de ' }[_pa(id)]) + _pn(id);
const inClub = id => ({ o:'no ', a:'na ', os:'nos ', as:'nas ', '':'em ' }[_pa(id)]) + _pn(id);
const toClub = id => ({ o:'ao ', a:'à ', os:'aos ', as:'às ', '':'a ' }[_pa(id)]) + _pn(id);
const theClub = id => ({ o:'o ', a:'a ', os:'os ', as:'as ', '':'' }[_pa(id)]) + _pn(id);

/* Where a birthplace is uncertain, or has changed hands since, "nasceu em…" is not asked:
   a question that has to be argued is not a question. */
const NAT_SKIP = new Set(['atila', 'espartaco', 'homero', 'herodoto', 'euclides', 'carlos_magno', 'atahualpa', 'leif',
  'kant', 'catarina_grande', 'garibaldi', 'nightingale', 'freud', 'ataturk', 'orwell', 'clarice', 'sidarta', 'wu_zetian',
  'sun_tzu', 'confucio', 'salomao', 'hamurabi', 'nabucodonosor', 'ciro', 'dario', 'xerxes', 'al_khwarizmi', 'avicena']);

/* "a Revolução Francesa", "o Renascimento", "as Cruzadas" */
const EV_ART = { Revolução:'a', Guerra:'a', Guerras:'as', Cruzadas:'as', Renascimento:'o', Peste:'a', Grandes:'as', Reforma:'a',
  Iluminismo:'o', Independência:'a', Independências:'as', Conquistas:'as', Queda:'a', Primeira:'a', Segunda:'a',
  Descolonização:'a', Direitos:'os', Corrida:'a', Unificação:'a', Abolição:'a' };
const theEvent = id => { const n = (EVENTS[id] || {}).n || id; return (EV_ART[n.split(' ')[0]] || 'a') + ' ' + n; };

/* Years, with the era they belong to: 356 a.C., 1789. */
const yearTxt = y => (y < 0 ? (-y) + ' a.C.' : String(y));
const eraTxt = e => !e ? '' : (e[0] < 0 && e[1] < 0) ? `${-e[0]}–${-e[1]} a.C.`
  : (e[0] < 0) ? `${-e[0]} a.C.–${e[1]}` : `${e[0]}–${e[1]}`;
const ROMAN = n => { const m = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
  let s = ''; m.forEach(([v, r]) => { while (n >= v) { s += r; n -= v; } }); return s; };
/* the century of a year: 1789 -> XVIII, -356 -> IV a.C. */
const centNum = y => y > 0 ? Math.ceil(y / 100) : -Math.floor(y / 100) ;
const centTxt = y => 'século ' + ROMAN(centNum(y)) + (y < 0 ? ' a.C.' : '');
"""


def gen_meta():
    F = rows("figures.tsv", 11)
    imgs = json.load(io.open(os.path.join(ROOT, "data", "history_images.json"), encoding="utf-8"))
    E = rows("events.tsv", 4)
    out = ["const CLUB_NAMES = {};",
           "function clubName(id) {\n  const c = CL.find(x => x.id === id);\n  return c ? c.n : id;\n}",
           "const PL_META = {"]
    for r in F:
        if r[0] not in imgs: continue
        affs = [a for a in r[7].split(",") if a]
        out.append("  %s: { pos:%s, era:[%s,%s], ctry:%s, clubs:[%s] }," % (
            r[0], q(r[3]), r[4], r[5], q(r[6]), ", ".join(q(a) for a in affs)))
    out.append("};")
    out.append("PL.forEach(p => Object.assign(p, PL_META[p.id] || { pos:'GOV', era:[1800,1850], ctry:'BRA', clubs:[] }));")
    out.append("const CL_META = {};")
    out.append("/* the great events a figure lived through — what football called World Cups */")
    out.append("const EVENTS = {")
    for i, n, a, b in E:
        out.append("  %s: { n:%s, y:[%s,%s] }," % (i, q(n), a, b))
    out.append("};")
    out.append("const EV = {")
    for r in F:
        if r[0] in imgs and r[9]:
            out.append("  %s: [%s]," % (r[0], ", ".join(q(e) for e in r[9].split(",") if e)))
    out.append("};")
    out.append("const NB = {")
    for r in F:
        if r[0] in imgs and r[10]: out.append("  %s: %s," % (r[0], r[10]))
    out.append("};")
    out.append("const NICK = {")
    for r in F:
        if r[0] in imgs and r[8]: out.append("  %s: %s," % (r[0], q(r[8])))
    out.append("};")
    out.append("PL.forEach(p => { p.ev = EV[p.id] || []; p.nb = NB[p.id] || 0; p.nick = NICK[p.id] || null; });")
    return "\n".join(out)


def gen_images():
    figs = json.load(io.open(os.path.join(ROOT, "data", "history_images.json"), encoding="utf-8"))
    mp = os.path.join(ROOT, "data", "history_monument_images.json")
    mons = json.load(io.open(mp, encoding="utf-8")) if os.path.exists(mp) else {}
    out = ["const LOGOS = {};", "const HIDE_CRESTS = new Set([]);", "const XCREST_NAME = {};", "const XCREST = {};",
           "const PORT_IMGS = {};", gen_stad(), "const PEOPLE = {};", "const MSC_PAINTED = new Set([]);", "const CREDITS = {"]
    for d in (figs, mons):
        for k, v in d.items():
            a = re.sub(r"\s+", " ", v["author"]).replace("\\", "").replace("'", "’").strip()[:80]
            lic = re.sub(r"\s+", " ", v["license"]).replace("'", "’").strip()
            out.append("  %s: { a:%s, l:%s }," % (q(v["img"]), q(a), q(lic)))
    out.append("};")
    return "\n".join(out)


BLOCKS = {}


def build_blocks():
    pl, missing = gen_pl()
    if missing: print("  (no picture yet for %d figures: %s)" % (len(missing), ", ".join(missing[:12]) + ("…" if len(missing) > 12 else "")))
    cats = "const CATS = [\n  /* NEW-QS:BEGIN — written by tools/merge_questions.py from tools/questions/*.json */\n  /* NEW-QS:END */\n];"
    return {
        "data_cl_cats": "const PORT = {};\n" + gen_cl() + "\n" + gen_stad_stub() + "\n" + cats,
        "data_pl_lib": pl + "\n" + gen_lib(),
        "data_meta": gen_meta(),
        "data_images": gen_images(),
    }


def gen_stad_stub():
    return "/* STAD / STAD_IMGS are defined with the images */"


def put(s, name, body):
    a, b = "/*@@%s@@*/" % name, "/*@@/%s@@*/" % name
    i, j = s.find(a), s.find(b)
    if i < 0 or j < 0:
        sys.exit("sentinel %s missing — run migrate first" % name)
    return s[:i + len(a)] + "\n" + body + "\n" + s[j:]


def main():
    s = io.open(PAGE, encoding="utf-8").read()
    if "/*@@data_cl_cats@@*/" not in s:
        s = migrate(s)
    # the merged questions live inside the CATS block; keep them across a rebuild
    B, E_ = "/* NEW-QS:BEGIN", "/* NEW-QS:END */"
    kept = None
    if B in s and E_ in s:
        a = s.index(B); a = s.index("\n", a) + 1
        kept = s[a:s.index(E_)]
    blocks = build_blocks()
    if kept is not None:
        blocks["data_cl_cats"] = blocks["data_cl_cats"].replace("  " + E_, kept + "  " + E_)
    for k, v in blocks.items():
        s = put(s, k, v)
    if "/*@@gen@@*/" not in s:
        i = s.index("function GEN_QS(tier) {"); e = match(s, s.index("{", i))
        s = s[:i] + "/*@@gen@@*/\n/*@@/gen@@*/" + s[e:]
    s = put(s, "gen", io.open(os.path.join(H, "js", "gen.js"), encoding="utf-8").read())
    if "/*@@specials@@*/" not in s:
        a = s.index("/* Copas do Mundo: ano → [sede, campeã]")
        e_ = s.index("/* ── Where these two are actually played")
        s = s[:a] + "/*@@specials@@*/\n/*@@/specials@@*/\n" + s[e_:]
    s = put(s, "specials", io.open(os.path.join(H, "js", "specials.js"), encoding="utf-8").read())
    s = put(s, "flags_extra", io.open(os.path.join(H, "js", "flags_extra.js"), encoding="utf-8").read())
    s = put(s, "art", "\n".join(io.open(os.path.join(H, "js", f), encoding="utf-8").read() for f in ("art_head.js", "art_tail.js")))
    s = put(s, "formats", "\n".join(io.open(os.path.join(H, "js", f), encoding="utf-8").read() for f in ("formats.js", "almanac.js")))
    s = put(s, "formats_css", io.open(os.path.join(H, "css", "formats.css"), encoding="utf-8").read())
    io.open(PAGE, "w", encoding="utf-8").write(s)
    print("index.html updated: %d bytes" % len(s.encode("utf-8")))


def banner_start(s, title, after=0):
    """Index of the `/* ═══` line that opens the banner whose first text line is `title`
    (searching from `after`, because some titles also occur inside the CSS)."""
    i = s.index(title, after)
    return s.rindex("/* ═", 0, i)


def migrate(s):
    """One-time: cut the football blocks out and plant sentinels."""
    def wrap(s, a, b, name):
        assert b > a, (name, a, b)
        return s[:a] + "/*@@%s@@*/\n/*@@/%s@@*/\n" % (name, name) + s[b:]
    code = s.index("\n<script>\n", s.index("</style>"))   # everything below is the main script

    a = banner_start(s, "DATA — CLUBS", code); b = banner_start(s, "DATA — PLAYER POOL", a)
    s = wrap(s, a, b, "data_cl_cats")
    a = banner_start(s, "DATA — PLAYER POOL", code); b = banner_start(s, "FLAGS — drawn, not typed", a)
    s = wrap(s, a, b, "data_pl_lib")
    i = s.index("const FLAGS = {", code); e = stmt_end(s, i)
    s = s[:e] + "\n/*@@flags_extra@@*/\n/*@@/flags_extra@@*/" + s[e:]
    a = s.index("/* Display names for clubs outside the Brazilian crest set */", code)
    b = banner_start(s, "IMAGES — CLUB LOGOS", a)
    s = wrap(s, a, b, "data_meta")
    a = banner_start(s, "IMAGES — CLUB LOGOS", code); b = banner_start(s, "MIXED GAME BUILDER", a)
    s = wrap(s, a, b, "data_images")
    a = banner_start(s, "SVG — PLAYER PORTRAIT", code); b = banner_start(s, "SCREENS", a)
    s = wrap(s, a, b, "art")
    return s


if __name__ == "__main__":
    main()
