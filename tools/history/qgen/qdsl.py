"""A tiny DSL for writing the question bank, and the exporter.

    from qdsl import Cat
    c = Cat('roma', 'Roma Antiga', '🏟️', 'Do Lácio ao Império', '#9E1B1B')
    c.T('Em que ano caiu Constantinopla?', '1453', ['1204', '1492', '1389', '1517', '1571'],
        d=2, icon='castle', src=('pt', 'Queda de Constantinopla', ['1453']), x='...')
    c.P('Qual imperador...?', ['augusto'], d=1, icon='crown', src=(...))   # figure answer(s)
    c.C('Qual estado...?', 'atenas', d=2, icon='column', src=(...))         # polity answer
    c.O('Coloque em ordem ...', [('id','Rótulo','sub',ano,{'face':'cesar'}), ...], src=(...))
    c.write()
"""
import io, json, os, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
OUT = os.path.join(ROOT, "tools", "questions")


class Cat:
    def __init__(self, cid, name, emoji, tag, col, diff="Variado", flag=None, order=50):
        self.meta = {"id": cid, "name": name, "tag": tag, "col": col, "diff": diff}
        if flag: self.meta["flag"] = flag
        else: self.meta["emoji"] = emoji
        self.qs, self.order = [], order

    @staticmethod
    def _art(kw):
        for k in ("icon", "who", "crest", "flag", "stad"):
            if kw.get(k):
                return {k: kw[k]}
        return {"icon": "scroll"}

    def _row(self, t, typ, a, d, kw, extra=None):
        r = {"t": t}
        if typ: r["type"] = typ
        if extra: r.update(extra)
        r["a"] = a
        r["d"] = d
        r["art"] = self._art(kw)
        s = kw.get("src")
        if not s: raise SystemExit("no src for: " + t)
        r["src"] = list(s[:2]) + [list(s[2])]
        if kw.get("x"): r["x"] = kw["x"]
        if kw.get("xs"): r["xs"] = kw["xs"]
        return r

    def T(self, t, a, wrong, d=2, **kw):
        """txt question: six choices, the answer(s) among them."""
        ans = [a] if isinstance(a, str) else list(a)
        ch = ans + list(wrong)
        if len(ch) != 6 or len({c.lower() for c in ch}) != 6:
            raise SystemExit("need 6 distinct choices (%d): %s :: %s" % (len(ch), t, ch))
        self.qs.append(self._row(t, "txt", ans, d, kw, {"choices": ch}))

    def P(self, t, a, d=2, **kw):
        a = [a] if isinstance(a, str) else a
        ex = {"fixed": kw["fixed"]} if kw.get("fixed") else None
        self.qs.append(self._row(t, "player", a, d, kw, ex))

    def Q(self, t, a, clues, d=2, **kw):
        """'Quem sou eu?' card: three to five clues, answer a figure id."""
        a = [a] if isinstance(a, str) else a
        kw.setdefault("icon", "bust")
        self.qs.append(self._row(t, "player", a, d, kw, {"clues": clues}))

    def C(self, t, a, d=2, **kw):
        a = [a] if isinstance(a, str) else a
        ex = {"fixed": kw["fixed"]} if kw.get("fixed") else None
        self.qs.append(self._row(t, None, a, d, kw, ex))

    def O(self, t, cards, d=3, **kw):
        """cards: (id, label, sub, year, {'face'|'crest'|'flag': x})"""
        order = [{"id": i, "y": y, "label": l, "sub": s, **pic} for i, l, s, y, pic in cards]
        ans = [e["id"] for e in sorted(order, key=lambda e: e["y"])]
        s = kw.get("src")
        r = {"t": t, "type": "order", "a": ans, "order": order, "d": d, "src": list(s[:2]) + [list(s[2])]}
        self.qs.append(r)

    # ── history's own formats (tools/history/js/formats.js) ──
    # Each strip is the question's picture, so these rows carry no `art`.
    # `a` is a figure id (typ='player'), a polity id (typ=None) or, with
    # typ='txt', the right text with `wrong` the five other choices.
    def _strip(self, t, a, d, typ, wrong, key, val, kw):
        ans = [a] if isinstance(a, str) else list(a)
        r = {"t": t}
        if typ: r["type"] = typ
        if typ == "txt":
            ch = ans + list(wrong or [])
            if len(ch) != 6 or len({c.lower() for c in ch}) != 6:
                raise SystemExit("need 6 distinct choices (%d): %s :: %s" % (len(ch), t, ch))
            r["choices"] = ch
        r[key] = val
        r["a"] = ans
        r["d"] = d
        s = kw.get("src")
        if not s: raise SystemExit("no src for: " + t)
        r["src"] = list(s[:2]) + [list(s[2])]
        if kw.get("x"): r["x"] = kw["x"]
        self.qs.append(r)

    def QT(self, quote, a, d=2, ctx=None, t="Quem disse esta frase?", typ="player", wrong=None, kind=None, **kw):
        """Citação: the sentence on a sheet; name who said or wrote it.
        kind: 'pedra' (carved), 'diario' (ship's log), 'carta' (sealed letter) —
        left out, it is chosen from the speaker and the context."""
        v = {"q": quote}
        if ctx: v["ctx"] = ctx
        if kind: v["kind"] = kind
        self._strip(t, a, d, typ, wrong, "quote", v, kw)

    def BT(self, t, a, lbl, side_a, side_b, d=2, x=None, typ=None, wrong=None, **kw):
        """Batalha: two sides (polity ids, country codes or names), one of them '?'."""
        v = {"lbl": lbl, "a": side_a, "b": side_b}
        if x: v["x"] = x
        self._strip(t, a, d, typ, wrong, "battle", v, kw)

    def LN(self, t, a, title, rows, d=3, kind=None, sub=None, era=None, typ="player", wrong=None, **kw):
        """Linhagem: a succession (arrows) or, kind='grupo', a council/alliance; one row '?'."""
        v = {"t": title, "rows": rows}
        if kind: v["kind"] = kind
        if sub: v["sub"] = sub
        if era: v["era"] = era
        self._strip(t, a, d, typ, wrong, "line", v, kw)

    def NW(self, t, a, h, d=2, paper=None, sub=None, date=None, city=None, typ="txt", wrong=None, **kw):
        """Manchete: a front page; the headline must not name the answer."""
        v = {"h": h}
        for k, x in (("paper", paper), ("sub", sub), ("date", date), ("city", city)):
            if x: v[k] = x
        self._strip(t, a, d, typ, wrong, "news", v, kw)

    def DU(self, t, a, other, d=1, typ="player", **kw):
        """Duelo: two cards only. typ='player'/None: a and other are ids;
        typ='txt': a and other are the two texts."""
        r = {"t": t}
        if typ: r["type"] = typ
        if typ == "txt":
            r["choices"] = [a, other]
        else:
            r["fixed"] = [a, other]
        r["duel"] = True
        r["a"] = [a]
        r["d"] = d
        r["art"] = self._art(kw)
        s = kw.get("src")
        if not s: raise SystemExit("no src for: " + t)
        r["src"] = list(s[:2]) + [list(s[2])]
        if kw.get("x"): r["x"] = kw["x"]
        self.qs.append(r)

    def MY(self, t, fact, d=2, **kw):
        """Fato ou mito: a claim people repeat; fact=True if it is true. Always give x."""
        r = {"t": t, "type": "txt", "choices": ["Fato", "Mito"], "duel": True, "myth": True,
             "a": ["Fato" if fact else "Mito"], "d": d, "art": self._art(kw)}
        s = kw.get("src")
        if not s: raise SystemExit("no src for: " + t)
        r["src"] = list(s[:2]) + [list(s[2])]
        if not kw.get("x"): raise SystemExit("a myth needs its explanation (x): " + t)
        r["x"] = kw["x"]
        self.qs.append(r)

    def write(self):
        os.makedirs(OUT, exist_ok=True)
        d = dict(self.meta); d["qs"] = self.qs
        p = os.path.join(OUT, "%02d_%s.json" % (self.order, self.meta["id"]))
        io.open(p, "w", encoding="utf-8").write(json.dumps(d, ensure_ascii=False, indent=1))
        print("%-22s %3d questions" % (self.meta["id"], len(self.qs)))
