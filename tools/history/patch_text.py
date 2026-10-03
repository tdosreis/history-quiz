#!/usr/bin/env python3
"""One-time patches to the user-visible words: football's vocabulary -> history's."""
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

sub("st.kind === 'escudo' ? 'ESCUDO' : st.kind === 'selecao' ? 'SELEÇÃO' : 'MASCOTE'", "st.kind === 'escudo' ? 'BRASÃO' : st.kind === 'selecao' ? 'NAÇÃO' : 'MONUMENTO'", "share-band")
sub("else if (st.kind === 'escudo') drawCover(await loadImg(LOGOS[st.id]), true);", "else if (st.kind === 'escudo') drawCover(await loadImg(crestURI(st.id)), true);", "share-crest")
sub("só no aniversário do craque — nunca reimpressas", "só no aniversário do personagem — nunca reimpressas", "vitrine")
sub('<p class="home-indep">App independente · sem vínculo com clubes, federações ou a FIFA</p>', '<p class="home-indep">App independente · imagens da Wikimedia Commons</p>', "home-indep")
sub("const msg = pct >= 80 ? 'Craque!' : pct >= 50 ? 'Boa jogada!' : 'Treina mais!';", "const msg = pct >= 80 ? 'Mestre da História!' : pct >= 50 ? 'Muito bem!' : 'Hora de estudar!';", "endmsg")
sub("""          ? (q.a.length > 1 ? `Marque os ${q.a.length} jogadores certos` : 'Marque o jogador certo')
          : (q.a.length > 1 ? `Marque os ${q.a.length} times certos`     : 'Marque o time certo')}</p>""",
    """          ? (q.a.length > 1 ? `Marque os ${q.a.length} personagens certos` : 'Marque o personagem certo')
          : (q.a.length > 1 ? `Marque os ${q.a.length} estados certos`     : 'Marque o estado certo')}</p>""", "hint")

# the story behind an answer: only what the question itself carries
region(r"^function storyFor\(q\) \{", r"^/\* After the reveal, the run waits for you", """
function storyFor(q) {
  if (!q) return '';
  return q.x || '';
}
""", "story")

# the credits screen
region(r'^      <div class="note" style="font-size:11.5px;line-height:1.45;">\n        <div style="font-weight:800;color:var\(--brass\);margin-bottom:3px;">App independente</div>',
       r'^      <!-- The cap was a flat 330px', """
      <div class="note" style="font-size:11.5px;line-height:1.45;">
        <div style="font-weight:800;color:var(--brass);margin-bottom:3px;">App independente</div>
        Este quiz é um projeto educativo, sem vínculo, patrocínio ou aprovação de
        nenhum governo, museu, instituição ou marca. Os nomes de pessoas, povos e
        lugares são fatos históricos de domínio comum.
        Se você é titular de algum direito e quer que algo seja retirado, escreva
        para tiagor.reis@gmail.com — atendemos rápido.
      </div>
      <p class="small muted" style="font-size:11px;">
        As imagens vêm da <b style="color:var(--ink);">Wikimedia Commons</b> e são usadas sob
        licenças livres (CC / domínio público): bustos, pinturas, gravuras e
        fotografias de monumentos, impressas aqui em serigrafia.
        Obrigado a cada autor listado abaixo.<br><br>
        As bandeiras dos países foram desenhadas para este app. Os brasões dos
        estados e impérios são ilustrações próprias, feitas para identificá-los
        no jogo — não reproduzem nenhum símbolo oficial.
      </p>
""", "credits")

# the sentence under the home hero etc. may still say football: swept by the grep below
io.open(P, "w", encoding="utf-8").write(s)
print("applied:", ", ".join(applied) or "nothing (already applied)")
