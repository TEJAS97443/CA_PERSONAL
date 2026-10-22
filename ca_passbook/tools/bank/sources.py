#!/usr/bin/env python3
"""Vendor the ICAI source manifest into the repo: bank/sources.json (docs/ICAI_BANK.md §4, §8).

    python3 -I tools/bank/sources.py            refresh bank/sources.json from ~/CA_PERSONAL/ca_sources/q/manifest.json (and the SM import's sources)
    python3 -I tools/bank/sources.py --check    say whether bank/sources.json is current (exit 1 when not)

bank/sources.json = {"root": "~/CA_PERSONAL/ca_sources/q", "files": {"<manifest file>": {scheme, paper, kind, attempt, attempt_label, series, part,
url, listing, source, fetched, sha256, bytes, pages, text, txt, notes}}}. The build reads only this file, so it runs without
~/CA_PERSONAL/ca_sources; the tools (seg.py, check.py) read the PDFs under "root". Entries added by the SM import (tools/bank/smimport.py) carry
"origin": "sm-qbank" and are kept across refreshes.
"""
from __future__ import annotations

import json
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "bank" / "sources.json"
SRC_ROOT = Path(os.environ.get("CA_SOURCES_Q", str(Path.home() / "CA_PERSONAL/ca_sources" / "q")))
KEEP = ("scheme", "paper", "kind", "attempt", "attempt_label", "series", "part", "url", "listing", "source", "fetched", "sha256",
        "bytes", "pages", "text", "txt", "notes")


def build() -> dict:
    man = json.loads((SRC_ROOT / "manifest.json").read_text())
    files = {}
    for e in man:
        files[e["file"]] = {k: e.get(k) for k in KEEP}
    old = json.loads(OUT.read_text()) if OUT.exists() else {}
    for f, e in (old.get("files") or {}).items():
        if e.get("origin") == "sm-qbank" and f not in files:
            files[f] = e
    return {"root": "~/" + str(SRC_ROOT.relative_to(Path.home())) if str(SRC_ROOT).startswith(str(Path.home())) else str(SRC_ROOT),
            "note": "Vendored from ~/CA_PERSONAL/ca_sources/q/manifest.json by tools/bank/sources.py; do not edit by hand.",
            "files": dict(sorted(files.items()))}


def main(argv: list[str]) -> int:
    new = build()
    text = json.dumps(new, ensure_ascii=False, indent=1) + "\n"
    cur = OUT.read_text() if OUT.exists() else ""
    if "--check" in argv:
        print("bank/sources.json is current" if cur == text else "bank/sources.json is out of date: run python3 -I tools/bank/sources.py")
        return 0 if cur == text else 1
    if cur != text:
        OUT.parent.mkdir(parents=True, exist_ok=True)
        tmp = OUT.with_suffix(".tmp")
        tmp.write_text(text)
        os.replace(tmp, OUT)
    print(f"bank/sources.json: {len(new['files'])} files")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
