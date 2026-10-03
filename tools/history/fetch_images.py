#!/usr/bin/env python3
"""Fetch a freely-licensed Wikimedia Commons picture for every row of a TSV.

  python3 tools/history/fetch_images.py figures      # tools/history/figures.tsv  -> img/
  python3 tools/history/fetch_images.py monuments    # tools/history/monuments.tsv

For each row the Wikipedia article gives a Wikidata item; the item's P18 image
(the picture Wikidata editors chose to stand for it) is a Commons file, so it
is always freely licensed. The article's own thumbnail is the fallback, and is
accepted only when it is served from /wikipedia/commons/.

Writes
  img/<hash>.webp                      the picture, cropped to the album's 3:4 window
  data/history_images.json             id -> {img, file, author, license, url}
Safe to re-run: ids already in the JSON are skipped (use --force ID,ID to redo).
"""
import io, os, re, sys, json, time, hashlib, urllib.request, urllib.parse
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
UA = "HistoryQuiz/1.0 (https://tdosreis.github.io/history-quiz/; tiagor.reis@gmail.com)"
KIND = sys.argv[1] if len(sys.argv) > 1 else "figures"
FORCE = set((sys.argv[sys.argv.index("--force") + 1] if "--force" in sys.argv else "").split(","))
OUT = os.path.join(ROOT, "data", "history_images.json" if KIND == "figures" else "history_monument_images.json")
W, H = (420, 560) if KIND == "figures" else (640, 480)
FREE = re.compile(r"^(public domain|pd|cc0|cc[- ]by|cc[- ]by[- ]sa|attribution|gfdl|no restrictions|copyrighted free use)", re.I)


def get(url, binary=False, tries=4):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=40) as r:
                d = r.read()
            return d if binary else json.loads(d.decode("utf-8"))
        except Exception as e:
            if i == tries - 1:
                raise
            time.sleep(2 + 3 * i)


def strip(h):
    return re.sub(r"<[^>]+>", "", h or "").replace("&amp;", "&").strip()


def commons_info(fname):
    q = urllib.parse.urlencode({"action": "query", "format": "json", "prop": "imageinfo",
        "titles": "File:" + fname, "iiprop": "url|extmetadata", "iiurlwidth": 900})
    d = get("https://commons.wikimedia.org/w/api.php?" + q)
    page = next(iter(d["query"]["pages"].values()))
    ii = (page.get("imageinfo") or [None])[0]
    if not ii:
        return None
    m = ii.get("extmetadata", {})
    lic = strip((m.get("LicenseShortName") or {}).get("value", ""))
    author = strip((m.get("Artist") or {}).get("value", "")) or "Wikimedia Commons"
    return {"url": ii.get("thumburl") or ii["url"], "page": ii.get("descriptionurl"),
            "license": lic, "author": author[:90], "file": fname}


def wikidata_image(qid):
    d = get("https://www.wikidata.org/w/api.php?action=wbgetclaims&format=json&property=P18&entity=" + qid)
    cl = (d.get("claims") or {}).get("P18") or []
    # prefer the item's preferred-rank image
    cl.sort(key=lambda c: 0 if c.get("rank") == "preferred" else 1)
    for c in cl:
        v = ((c.get("mainsnak") or {}).get("datavalue") or {}).get("value")
        if v:
            return v
    return None


def find(lang, title):
    s = get("https://%s.wikipedia.org/api/rest_v1/page/summary/%s" % (lang, urllib.parse.quote(title.replace(" ", "_"))))
    qid = s.get("wikibase_item")
    if qid:
        fn = wikidata_image(qid)
        if fn:
            info = commons_info(fn)
            if info and FREE.search(info["license"] or "free"):
                return info
    src = (s.get("thumbnail") or {}).get("source") or ""
    if "/wikipedia/commons/" in src:
        fn = urllib.parse.unquote(src.split("/")[-2] if "/thumb/" in src else src.split("/")[-1])
        info = commons_info(fn)
        if info:
            return info
    return None


def crop(im, w, h, top_bias=0.18):
    """Cut to w:h. Portraits keep their heads, so the window sits high on a tall
    picture and in the middle of a wide one."""
    im = im.convert("RGB")
    iw, ih = im.size
    tr = w / h
    if iw / ih > tr:                       # too wide: trim the sides, centred
        nw = int(ih * tr); x = (iw - nw) // 2
        im = im.crop((x, 0, x + nw, ih))
    else:                                  # too tall: trim the bottom more than the top
        nh = int(iw / tr); y = int((ih - nh) * top_bias)
        im = im.crop((0, y, iw, y + nh))
    return im.resize((w, h), Image.LANCZOS)


def main():
    rows = [l.rstrip("\n").split("|") for l in io.open(os.path.join(ROOT, "tools", "history", KIND + ".tsv"), encoding="utf-8")
            if l.strip() and not l.startswith("#")]
    done = json.load(io.open(OUT, encoding="utf-8")) if os.path.exists(OUT) else {}
    os.makedirs(os.path.join(ROOT, "img"), exist_ok=True)
    wiki_col = 2 if KIND == "figures" else 3
    for r in rows:
        pid, wiki = r[0], r[wiki_col]
        if pid in done and pid not in FORCE:
            continue
        lang, title = wiki.split(":", 1)
        try:
            info = find(lang, title)
            if not info and lang == "pt":
                info = find("en", title)
            if not info:
                print("  -- %-22s no free picture" % pid); continue
            data = get(info["url"], binary=True)
            im = crop(Image.open(io.BytesIO(data)), W, H)
            name = "img/" + hashlib.sha1((pid + info["file"]).encode()).hexdigest()[:16] + ".webp"
            im.save(os.path.join(ROOT, name), "WEBP", quality=80, method=6)
            done[pid] = {"img": name, "file": info["file"], "author": info["author"],
                         "license": info["license"], "url": info["page"]}
            print("  ok %-22s %-18s %s" % (pid, info["license"][:18], info["file"][:50]))
        except Exception as e:
            print("  !! %-22s %s" % (pid, str(e)[:80]))
        json.dump(done, io.open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        time.sleep(0.4)
    json.dump(done, io.open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    miss = [r[0] for r in rows if r[0] not in done]
    print("\n%d/%d have a picture; missing: %s" % (len(rows) - len(miss), len(rows), ", ".join(miss)))


main()
