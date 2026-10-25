"""Consulta la API de Wikimedia Commons: busca archivos o lee metadatos de licencia.

Uso:
  python -I scripts/commons.py search "texto de busqueda"
  python -I scripts/commons.py info "File:Nombre.jpg" ["File:Otro.jpg" ...]
"""
import json
import re
import sys
import urllib.parse
import urllib.request

API = "https://commons.wikimedia.org/w/api.php"
UA = {"User-Agent": "LineaTiempoPedagogia/1.0 (trabajo academico UNAD)"}


def call(params):
    params["format"] = "json"
    req = urllib.request.Request(API + "?" + urllib.parse.urlencode(params), headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def strip(html):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", html or "")).strip()


def search(q):
    d = call({"action": "query", "list": "search", "srsearch": q, "srnamespace": 6, "srlimit": 12})
    for h in d["query"]["search"]:
        print(h["title"])


def info(titles):
    d = call({
        "action": "query", "titles": "|".join(titles), "prop": "imageinfo",
        "iiprop": "url|size|mime|extmetadata", "iiurlwidth": 1200,
    })
    for p in d["query"]["pages"].values():
        ii = (p.get("imageinfo") or [None])[0]
        if not ii:
            print("NO ENCONTRADO:", p["title"])
            continue
        m = ii["extmetadata"]
        g = lambda k: strip(m.get(k, {}).get("value", ""))
        print("---", p["title"])
        print("  licencia:", g("LicenseShortName"), "|", g("UsageTerms"), "| copyrighted:", g("Copyrighted"))
        print("  autor:", g("Artist")[:150])
        print("  fecha:", g("DateTimeOriginal") or g("DateTime"))
        print("  credito:", g("Credit")[:150])
        print("  tamano:", ii["width"], "x", ii["height"], ii["mime"])
        print("  pagina:", ii["descriptionurl"])
        print("  thumb1200:", ii.get("thumburl"))
        print("  original:", ii["url"])


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    if sys.argv[1] == "search":
        search(" ".join(sys.argv[2:]))
    else:
        info(sys.argv[2:])
