#!/usr/bin/env python3
"""One-time patches that turn the football engine's rules into history's.
Each patch replaces a named region and refuses to run twice."""
import io, os, re, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
P = os.path.join(ROOT, "index.html")
s = io.open(P, encoding="utf-8").read()
applied = []


def region(start_pat, end_pat, new, tag):
    """Replace from the line matching start_pat up to (not including) the line matching end_pat."""
    global s
    if "/*@@%s@@*/" % tag in s:
        return
    m = re.search(start_pat, s, re.M)
    if not m:
        sys.exit("start not found for " + tag)
    n = re.compile(end_pat, re.M).search(s, m.end())
    if not n:
        sys.exit("end not found for " + tag)
    s = s[:m.start()] + "/*@@%s@@*/\n%s\n/*@@/%s@@*/\n" % (tag, new.strip("\n"), tag) + s[n.start():]
    applied.append(tag)


def sub(old, new, tag, count=1):
    global s
    if old not in s:
        if new in s: return
        sys.exit("text not found for " + tag + ": " + old[:60])
    s = s.replace(old, new, count)
    applied.append(tag)


# ── difficulty buttons ──
sub("emoji:'⚽', ic:'bolt'", "emoji:'📜', ic:'bolt'", "diffs-emoji")
sub("desc:'Mesma posição e era · 20s'", "desc:'Mesma área e época · 20s'", "diffs-desc")

# ── how confusable two polities are ──
region(r"^/\* Confusability between clubs \*/", r"^/\* ── Reading the question for clues", '''
/* Confusability between polities */
function simClub(cand, ref) {
  let sc = 0;
  if (cand.s === ref.s) sc += 42;                                          // same part of the world
  sc += Math.max(0, 22 - Math.abs((cand.f || 0) - (ref.f || 0)) / 40);   // founded around the same time
  if ((cand.e > 0) === (ref.e > 0)) sc += 20;                              // both gone / both still here
  if ((cand.f < 0) === (ref.f < 0)) sc += 16;                              // both ancient / both not
  return sc;
}
''', "simclub")

# ── the clue reader ──
region(r"^const DEMONYM = \[", r"^/\* ── Which questions may cross the generations", r'''
const DEMONYM = CTRY_STEMS;
const POS_WORDS = [
  ['governante', 'GOV'], ['imperador', 'GOV'], ['imperatriz', 'GOV'], [' rei ', 'GOV'], ['rainha', 'GOV'],
  ['farao', 'GOV'], ['presidente', 'GOV'], ['soberano', 'GOV'], ['primeiro-ministro', 'GOV'], ['sultao', 'GOV'],
  ['califa', 'GOV'], ['czar', 'GOV'], ['tsar', 'GOV'], ['chanceler', 'GOV'],
  ['general', 'GEN'], ['estrategista', 'GEN'], ['conquistador', 'GEN'], ['guerreiro', 'GEN'], ['almirante', 'GEN'],
  ['filosofo', 'PEN'], ['cientista', 'PEN'], ['matematic', 'PEN'], ['fisico', 'PEN'], ['pensador', 'PEN'],
  ['inventor', 'PEN'], ['medico', 'PEN'], ['astronomo', 'PEN'], ['naturalista', 'PEN'], ['economista', 'PEN'],
  ['pintor', 'ART'], ['escritor', 'ART'], ['poeta', 'ART'], ['compositor', 'ART'], ['musico', 'ART'],
  ['arquitet', 'ART'], ['escultor', 'ART'], ['dramaturgo', 'ART'], ['romancista', 'ART'], ['artista', 'ART'],
  ['revolucionari', 'REV'], ['reformador', 'REV'], ['abolicionista', 'REV'], ['ativista', 'REV'], ['libertador', 'REV'],
  ['explorador', 'EXP'], ['navegador', 'EXP'], ['navegante', 'EXP'], ['viajante', 'EXP'], ['astronauta', 'EXP'], ['cosmonauta', 'EXP'],
];

const _romanVal = r => { const m = { i:1, v:5, x:10, l:50, c:100 }; let n = 0, p = 0;
  for (const ch of r.split('').reverse()) { const v = m[ch] || 0; n += v < p ? -v : v; p = Math.max(p, v); } return n; };
/* the year a question is about, if it says one: "1789", "356 a.C.", "século XVIII" */
function yearCue(t) {
  let m = /\b(\d{1,4})\s*a\.?\s?c\b/.exec(t);
  if (m) return -parseInt(m[1], 10);
  m = /seculo ([ivxlc]+)( a\.?\s?c)?\b/.exec(t);
  if (m) { const n = _romanVal(m[1]); if (n) return m[2] ? -(n * 100 - 50) : (n * 100 - 50); }
  m = /\b(1[0-9]{3}|20[0-2][0-9]|[5-9][0-9]{2})\b/.exec(t);
  return m ? parseInt(m[1], 10) : null;
}

function qCues(q) {
  if (q._cues) return q._cues;
  const t = ' ' + _fold(q.t) + ' ';
  const cues = { ctry: null, pos: null, year: null };
  for (const [w, code] of DEMONYM) if (t.indexOf(w) !== -1) { cues.ctry = code; break; }
  for (const [w, pos]  of POS_WORDS) if (t.indexOf(w) !== -1) { cues.pos = pos; break; }
  cues.year = yearCue(t);
  cues.any = !!(cues.ctry || cues.pos || cues.year !== null);
  q._cues = cues;
  return cues;
}
''', "cues")
sub("const ALL_TIME = /(todos os tempos|de todos|da historia|na historia|recordista|maior artilheiro da|mais titulos|toda a historia)/;",
    "const ALL_TIME = /(todos os tempos|toda a historia|da historia mundial|de todos|ao longo da historia)/;", "alltime")
# year cues can be 0/negative now
sub("if (cues.year) q._hideEra = true;", "if (cues.year !== null && cues.year !== undefined) q._hideEra = true;", "hideera")
sub("if (cues.year && p.era && (p.era[0] > cues.year + 2 || p.era[1] < cues.year - 2)) return false;",
    "if (cues.year !== null && p.era && (p.era[0] > cues.year + 2 || p.era[1] < cues.year - 2)) return false;", "cuefits-year")
sub("""  if (cues.year && p.era) {
    const gap = p.era[0] > cues.year ? p.era[0] - cues.year
              : p.era[1] < cues.year ? cues.year - p.era[1] : 0;
    sc += Math.max(0, 26 - gap * 2.2);
  }""", """  if (cues.year !== null && p.era) {
    const gap = p.era[0] > cues.year ? p.era[0] - cues.year
              : p.era[1] < cues.year ? cues.year - p.era[1] : 0;
    sc += Math.max(0, 26 - gap * 0.5);
  }""", "cuesim-year")
# the one-generation window: a century is the history quiz's generation
sub("const win  = strict >= 0.9 ? 13 : strict >= 0.4 ? 17 : 26;", "const win  = strict >= 0.9 ? 80 : strict >= 0.4 ? 120 : 200;", "window")

# ── difficulty by fame, not by debut year ──
region(r"^const FAMOUS = new Set", r"^function _qBase\(q\) \{", r'''
const FAMOUS = new Set(['napoleao','cleopatra','einstein','leonardo','cesar','alexandre','gandhi','newton','colombo',
  'cabral','tiradentes','dom_pedro_i','dom_pedro_ii','princesa_isabel','santos_dumont','churchill','mandela','mlk',
  'shakespeare','mozart','beethoven','marie_curie','darwin','galileu','lincoln','washington','zumbi','vasco_gama',
  'gengis','ramses_ii','tutancamon','picasso','van_gogh','freud','marx','lenin','che','fidel','kennedy','augusto',
  'nero','luis_xiv','michelangelo','joana_darc','socrates','platao','aristoteles','machado','getulio','anne_frank']);

/* How hard a question is, on a scale of five.
   The category sets the base; what moves it is the answer itself — a famous
   name is easier than an obscure one whatever the category, and being asked
   for two names is harder than being asked for one. */
function qTier(q) {
  return Math.max(1, Math.min(5, _qBase(q) + _qShift(q)));
}

function _qShift(q) {
  if (q.type !== 'player') return 0;
  const ans = (q.a || []).map(id => PL.find(x => x.id === id)).filter(Boolean);
  let shift = ans.length > 1 ? 1 : 0;        // "selecione os 2" is harder
  if (!ans.length) return shift;
  if (ans.some(p => FAMOUS.has(p.id))) return shift - 1;
  return shift;
}

''', "tier-head")
open(P, "w", encoding="utf-8").write(s)
print("applied:", ", ".join(applied) or "nothing (already applied)")

# ── no more scoreboards and lineups: those were football's two extra ways to ask ──
s = io.open(P, encoding="utf-8").read()
region(r"^/\* ── Two new ways to ask", r"^/\* ═+\n   O BARALHO DA RODADA", "/* (the scoreboard and the lineup were football's; history has none) */", "noscore")
sub("${q.score || q.xi ? ' qcard-strip' : ''}", "", "qcard-strip")
sub("${q.score ? scoreStrip(q.score, q) : q.xi ? xiStrip(q.xi) : ''}", "", "qcard-strip2")
io.open(P, "w", encoding="utf-8").write(s)
print("applied (2):", ", ".join(applied))
