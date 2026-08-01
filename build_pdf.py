#!/usr/bin/env python3
"""
Builds Magoya_Knowledge_Experience.pdf — a linear, one-scene-per-page PDF
of the deck, for sharing by email or printing.

The web version is scroll/click-driven (only one scene visible in the DOM
at a time). For print we render ALL 14 scenes stacked as full pages via
index.html?print=1 (see js/deck.js — it adds a `print-all` class to <body>,
which css/deck.css's @media print rule turns into one page per scene).

Requires a local Chrome/Chromium. Regenerate after any content change:
    python3 build_pdf.py
    python3 build_pdf.py --client-name "John Deere" --client-logo assets/logos/clients/john-deere.svg
"""
import argparse
import http.server
import threading
import subprocess
import shutil
import sys
import os
import urllib.parse

PORT = 8935
OUT = "Magoya_Knowledge_Experience.pdf"
CHROME_CANDIDATES = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    shutil.which("google-chrome"),
    shutil.which("chromium"),
]


def find_chrome():
    for c in CHROME_CANDIDATES:
        if c and os.path.exists(c):
            return c
    sys.exit("No Chrome/Chromium found — install one or edit CHROME_CANDIDATES.")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--client-name", default=None, help='e.g. "John Deere" — adds a "Prepared for" line to the PDF cover')
    parser.add_argument("--client-logo", default=None, help="path relative to this folder, e.g. assets/logos/clients/john-deere.svg — optional even with --client-name")
    args = parser.parse_args()

    root = os.path.dirname(os.path.abspath(__file__))
    os.chdir(root)

    handler = http.server.SimpleHTTPRequestHandler
    server = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()

    chrome = find_chrome()
    query = "print=1"
    if args.client_name:
        query += f"&client={urllib.parse.quote(args.client_name)}"
        if args.client_logo:
            query += f"&logo={urllib.parse.quote(args.client_logo)}"
    url = f"http://127.0.0.1:{PORT}/index.html?{query}"
    print(f"Rendering {url} -> {OUT} using {chrome}")

    subprocess.run([
        chrome,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={OUT}",
        "--print-to-pdf-no-header",
        "--no-sandbox",
        "--virtual-time-budget=15000",
        url,
    ], check=True)

    server.shutdown()
    print(f"Done: {os.path.join(root, OUT)}")


if __name__ == "__main__":
    main()
