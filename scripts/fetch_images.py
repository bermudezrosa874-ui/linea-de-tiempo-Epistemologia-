"""Descarga imágenes de Wikimedia Commons al ancho indicado.

Uso: python -I scripts/fetch_images.py <carpeta_destino> <ancho> "File:A.jpg" "File:B.jpg" ...
Guarda cada archivo como <carpeta_destino>/<titulo_sin_prefijo_saneado>.jpg|png
"""
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

API = "https://commons.wikimedia.org/w/api.php"
UA = {"User-Agent": "LineaTiempoPedagogia/1.0 (trabajo academico UNAD)"}


def get(url):
    for intento in range(5):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code != 429:
                raise
            time.sleep(5 * (intento + 1))
    raise RuntimeError("demasiados 429: " + url)


def main(dest, width, titles):
    os.makedirs(dest, exist_ok=True)
    for t in titles:
        q = urllib.parse.urlencode({
            "action": "query", "titles": t, "prop": "imageinfo", "iiprop": "url|size",
            "iiurlwidth": width, "format": "json"})
        ii = list(json.loads(get(API + "?" + q))["query"]["pages"].values())[0]["imageinfo"][0]
        url = ii["thumburl"] if ii["width"] > int(width) else ii["url"]
        ext = os.path.splitext(urllib.parse.urlparse(url).path)[1].lower() or ".jpg"
        name = re.sub(r"[^A-Za-z0-9._-]+", "_", t[5:].rsplit(".", 1)[0]) + ext
        with open(os.path.join(dest, name), "wb") as f:
            f.write(get(url))
        print("OK", name)
        time.sleep(1.5)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], sys.argv[3:])
