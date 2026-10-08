"""History-only checks for tools/merge_questions.py.

Two give-aways the generic checks cannot see:
  - a battle caption that names a leader of the hidden side ("Napoleão venceu"
    under a strip that hides the French Empire);
  - a modern national flag drawn for a question set before that flag existed
    (the flag of the People's Republic on a question about 1895).
"""
import io, os, re, unicodedata

H = os.path.dirname(os.path.abspath(__file__))

# the year each flag, as the album draws it, came into use (close variants count)
FLAG_SINCE = dict(
    BRA=1889, ARG=1812, POR=1911, FRA=1794, NED=1660, GER=1919, BUL=1878, ITA=1797, ENG=1200, SCO=1200,
    IRL=1919, ESP=1785, POL=1831, RUS=1700, HUN=1848, CZE=1920, AUT=1230, CHE=1500, DEN=1300, NOR=1821,
    SRB=1835, MKD=1995, GRC=1822, TUR=1793, IRN=1980, IRQ=1963, ISR=1948, EGY=1952, TUN=1831, MAR=1915,
    MLI=1961, ETH=1897, AGO=1975, ZAF=1994, IND=1947, NPL=1900, CHN=1949, MNG=1945, JPN=1870, VNM=1945,
    UZB=1991, USA=1777, MEX=1821, CUB=1850, HAI=1804, VEN=1811, COL=1819, PER=1825, CHI=1817, URU=1830,
    PAR=1842, BEL=1831, CRO=1990, UKR=1918)

# first names and titles too common to point at one person
COMMON = set("""henrique carlos luis joao pedro filipe guilherme frederico maria isabel elizabeth jorge francisco
afonso manuel jose duque imperador imperatriz rainha grande primeiro segundo santo santa principe princesa
alexandre ricardo eduardo leopoldo fernando nicolau""".split())


def fold(x):
    x = unicodedata.normalize("NFD", str(x).lower())
    return "".join(c for c in x if unicodedata.category(c) != "Mn")


def _rows(name):
    p = os.path.join(H, name)
    return [l.rstrip("\n").split("|") for l in io.open(p, encoding="utf-8") if l.strip() and not l.startswith("#")]


_FIG = None


def _figures():
    """[(the states and countries a figure is tied to, distinctive words of the name)]"""
    global _FIG
    if _FIG is None:
        _FIG = []
        for r in _rows("figures.tsv"):
            if len(r) < 8:
                continue
            words = [w for w in re.split(r"[\s\-']+", fold(r[1])) if len(w) >= 5 and w not in COMMON]
            _FIG.append((set(re.split(r"[;,]", r[6] + "," + r[7])) - {""}, words))
    return _FIG


def years(txt):
    ys = [-int(m.group(1)) if m.group(2) else int(m.group(1))
          for m in re.finditer(r"(?<![\d.,])(\d{3,4})(\s*a\.\s*C\.)?(?![\d.,]?\d)", txt)]
    for m in re.finditer(r"seculo ([ivxl]+)( a\.?c\.?)?", fold(txt)):
        val, rom, v = dict(i=1, v=5, x=10, l=50), m.group(1), 0
        for i, ch in enumerate(rom):
            v += -val[ch] if i + 1 < len(rom) and val[rom[i + 1]] > val[ch] else val[ch]
        ys.append(-v * 100 if m.group(2) else (v - 1) * 100 + 50)
    return ys


def lint(q, bad):
    bt = q.get("battle")
    if isinstance(bt, dict) and q.get("a") and q.get("type") != "txt":
        hid = q["a"][0]
        shown = bt.get("a") if bt.get("b") == "?" else bt.get("b")
        cap = fold(bt.get("x", ""))
        # "tied to" covers enemies too (Cipião, the conqueror of Carthage): only
        # someone tied to the hidden side alone gives it away
        hit = [w for sides, words in _figures() if hid in sides and shown not in sides for w in words
               if re.search(r"(^|[^a-z])" + re.escape(w) + r"([^a-z]|$)", cap)]
        if hit:
            bad(f"the battle caption names someone of the hidden side ({hit[0]})")
    # a timeline card shows its label and subtitle while the question is open; only the year is held back
    for e in q.get("order") or []:
        if re.search(r"(?<![\d.,])\d{3,4}(?![\d.,]?\d)", str(e.get("sub", ""))):
            bad(f"timeline card '{e.get('label')}': the subtitle shows a year, which gives the order away")
    flag = (q.get("art") or {}).get("flag")
    if flag in FLAG_SINCE:
        ys = years(q.get("t", ""))
        if ys and min(ys) < FLAG_SINCE[flag] - 5:
            bad(f"art: the flag of {flag} dates from {FLAG_SINCE[flag]}, the question from {min(ys)} — use a period brasão or an icon")
