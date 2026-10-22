#!/usr/bin/env python3
"""Read an ICAI PDF for transcription (docs/ICAI_BANK.md §8, §9).

    python3 -I tools/bank/seg.py <doc> --info                      the document's files, their pages and the source notes
    python3 -I tools/bank/seg.py <doc> [pages]                     text with layout of pages (default all): '3', '20-22', '3,5'
    python3 -I tools/bank/seg.py <doc> --find "words" [--find …]  the pages that contain every one of the words (case-insensitive)
    .venv/bin/python -I tools/bank/seg.py <doc> --png 21 [--clip x0,y0,x1,y1] [--zoom 2] [-o out.png]
                                                                   render a page, or a region of it in PDF points (needs PyMuPDF)
    .venv/bin/python -I tools/bank/seg.py <doc> --words 21        the page's words with their boxes (x0 y0 x1 y1 word), to find a --clip

<doc> is a document id (n-p4-rtp-sep2026), optionally with the file part (n-p4-pyq-may2026:a, :q, :qa), a manifest file
(new/p4/rtp-sep2026-qa.pdf) or a path to a PDF. Without a part the answers file is used when there is one (ICAI's Suggested Answers
reproduce the questions), else the question file. Text comes from `pdftotext -layout` with ICAI's Rupee-font backtick shown as ₹
(the count is printed to stderr); a scanned paper (manifest text mode 'ocr') prints the OCR text kept next to the PDF instead, which
needs checking against the rendered page. Page numbers are the PDF's physical pages (1-based): the numbers to cite in q: and a:.
"""
from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tools"))
from buildlib import bank as bank_mod     # noqa: E402

SOURCES = ROOT / "bank" / "sources.json"


def src_root() -> Path:
    env = os.environ.get("CA_SOURCES_Q")
    if env:
        return Path(env)
    r = json.loads(SOURCES.read_text()).get("root", "~/CA_PERSONAL/ca_sources/q") if SOURCES.exists() else "~/CA_PERSONAL/ca_sources/q"
    return Path(os.path.expanduser(r))


def sources() -> dict:
    return json.loads(SOURCES.read_text()).get("files", {}) if SOURCES.exists() else {}


def sm_root() -> Path:
    """~/CA_PERSONAL/sm-qbank: the SM import's own copies of the old-scheme Paper 7 PDFs (sources entries with origin 'sm-qbank')"""
    return Path(os.environ.get("SM_QBANK", str(Path.home() / "CA_PERSONAL/sm-qbank")))


def path_of(f: str, entry: dict | None) -> Path:
    """the PDF of a sources entry: under ~/CA_PERSONAL/ca_sources/q, or under ~/CA_PERSONAL/sm-qbank for the SM import's files ('sm-qbank/raw/…')"""
    if (entry or {}).get("origin") == "sm-qbank" or f.startswith("sm-qbank/"):
        return sm_root() / f.split("/", 1)[1]
    return src_root() / f


def files_of_doc(doc: str) -> dict[str, str]:
    """{part: manifest file} for a document id ('q', 'a', 'qa', 'a-6a' …)"""
    m = bank_mod.DOC_ID.match(doc)
    if not m:
        return {}
    scheme = bank_mod.SCHEMES[m.group("s")]
    out = {}
    for f, e in sources().items():
        if e.get("scheme") == scheme and e.get("paper") == m.group("paper") and e.get("kind") == m.group("kind") \
                and e.get("attempt") == m.group("attempt") and (e.get("series") or None) == (m.group("series") or None):
            out[e.get("part") or "qa"] = f
    return out


def resolve(arg: str) -> tuple[Path, dict | None, str]:
    """-> (pdf path, manifest entry or None, manifest file or the path)"""
    S = sources()
    if arg in S:
        return path_of(arg, S[arg]), S[arg], arg
    if arg.endswith(".pdf") and Path(arg).exists():
        p = Path(arg).resolve()
        try:
            rel = p.relative_to(src_root().resolve()).as_posix()
            return p, S.get(rel), rel
        except ValueError:
            return p, None, str(p)
    doc, _, part = arg.partition(":")
    fs = files_of_doc(doc)
    if not fs:
        raise SystemExit(f"seg.py: {arg!r} is not a document id, a manifest file or a PDF (bank/sources.json has no file for it)")
    if part:
        f = fs.get(part) or next((v for k, v in fs.items() if k.startswith(part)), None)
        if not f:
            raise SystemExit(f"seg.py: {doc} has no part {part!r}; it has {', '.join(sorted(fs))}")
    else:
        f = fs.get("a") or fs.get("qa") or fs.get("a-6a") or fs.get("q")
    return path_of(f, S[f]), S[f], f


def page_list(spec: str | None, n: int) -> list[int]:
    if not spec:
        return list(range(1, n + 1))
    out = []
    for part in spec.split(","):
        part = part.strip()
        if "-" in part:
            a, b = part.split("-")
            out.extend(range(int(a), int(b) + 1))
        elif part:
            out.append(int(part))
    return [p for p in out if 1 <= p <= n]


def page_count(pdf: Path, entry: dict | None) -> int:
    if entry and entry.get("pages"):
        return int(entry["pages"])
    if shutil.which("pdfinfo"):
        r = subprocess.run(["pdfinfo", str(pdf)], capture_output=True, text=True)
        m = re.search(r"^Pages:\s+(\d+)", r.stdout, re.M)
        if m:
            return int(m.group(1))
    return 0


def page_texts(pdf: Path, entry: dict | None, pages: list[int]) -> dict[int, str]:
    """{page: text with layout}; ICAI's Rupee-font backtick becomes ₹. A scanned paper ('ocr') gives the OCR text kept next to the PDF."""
    if entry and entry.get("text") == "ocr":
        txt = pdf.with_suffix(".txt")
        out: dict[int, str] = {}
        if txt.exists():
            cur = None
            for ln in txt.read_text().split("\n"):
                m = re.match(r"^=== p\.(\d+)", ln)
                if m:
                    cur = int(m.group(1))
                    out[cur] = ""
                elif cur is not None:
                    out[cur] += ln + "\n"
        return {p: out.get(p, "") for p in pages}
    if not shutil.which("pdftotext"):
        raise SystemExit("seg.py needs pdftotext (poppler): brew install poppler")
    res = {}
    lo, hi = min(pages), max(pages)
    r = subprocess.run(["pdftotext", "-layout", "-f", str(lo), "-l", str(hi), str(pdf), "-"], capture_output=True, text=True)
    chunks = r.stdout.split("\f")
    for k, p in enumerate(range(lo, hi + 1)):
        if p in pages:
            res[p] = chunks[k] if k < len(chunks) else ""
    return res


def rupee(text: str) -> tuple[str, int]:
    n = text.count("`")
    return text.replace("`", "₹"), n


def main(argv: list[str]) -> int:
    if not argv or argv[0] in ("-h", "--help"):
        print(__doc__)
        return 0
    arg, rest = argv[0], argv[1:]
    pdf, entry, name = resolve(arg)
    if not pdf.exists():
        raise SystemExit(f"seg.py: {pdf} does not exist (the PDFs live under {src_root()})")
    n = page_count(pdf, entry)
    opts = {"pages": None, "png": None, "clip": None, "zoom": 2.0, "out": None, "find": [], "info": False, "words": None}
    i = 0
    while i < len(rest):
        a = rest[i]
        if a == "--png":
            opts["png"] = int(rest[i + 1]); i += 2
        elif a == "--words":
            opts["words"] = int(rest[i + 1]); i += 2
        elif a == "--clip":
            opts["clip"] = [float(x) for x in rest[i + 1].split(",")]; i += 2
        elif a == "--zoom":
            opts["zoom"] = float(rest[i + 1]); i += 2
        elif a == "-o":
            opts["out"] = rest[i + 1]; i += 2
        elif a == "--find":
            opts["find"].append(rest[i + 1].lower()); i += 2
        elif a == "--info":
            opts["info"] = True; i += 1
        else:
            opts["pages"] = a; i += 1
    if opts["info"]:
        m = bank_mod.DOC_ID.match(arg.partition(":")[0])
        fs = files_of_doc(arg.partition(":")[0]) if m else {"": name}
        for part, f in sorted(fs.items()):
            e = sources().get(f) or {}
            print(f"{part or 'file'}: {f}  ({e.get('pages')} pages, text {e.get('text')}, sha256 {str(e.get('sha256'))[:12]}…)\n  url: {e.get('url')}\n  notes: {e.get('notes')}\n")
        return 0
    if opts["png"] or opts["words"]:
        try:
            import pymupdf as fitz      # PyMuPDF >= 1.24
        except ImportError:
            try:
                import fitz            # older PyMuPDF
            except ImportError:
                raise SystemExit("--png / --words need PyMuPDF: run with ~/CA_PERSONAL/ca_passbook/.venv/bin/python -I tools/bank/seg.py …")
        d = fitz.open(str(pdf))
        if opts["words"]:
            pg = d[opts["words"] - 1]
            print(f"page {opts['words']}: {pg.rect.width:.0f} x {pg.rect.height:.0f} pt")
            for w in pg.get_text("words"):
                print(f"{w[0]:6.1f} {w[1]:6.1f} {w[2]:6.1f} {w[3]:6.1f}  {w[4]}")
            return 0
        pg = d[opts["png"] - 1]
        clip = fitz.Rect(*opts["clip"]) if opts["clip"] else None
        pix = pg.get_pixmap(matrix=fitz.Matrix(opts["zoom"], opts["zoom"]), clip=clip)
        out = opts["out"] or f"/tmp/seg-{Path(name).stem}-p{opts['png']}.png"
        Path(out).parent.mkdir(parents=True, exist_ok=True)
        pix.save(out)
        print(out)
        return 0
    pages = page_list(opts["pages"], n)
    texts = page_texts(pdf, entry, pages)
    if opts["find"]:
        hits = [p for p, t in texts.items() if all(w in rupee(t)[0].lower() for w in opts["find"])]
        print(", ".join(map(str, hits)) if hits else "no page has all of: " + " · ".join(opts["find"]))
        return 0
    total = 0
    for p in pages:
        t, k = rupee(texts.get(p, ""))
        total += k
        print(f"=== p.{p} ===")
        print(t.rstrip("\n"))
    if total:
        print(f"[seg.py: {total} Rupee-font backtick(s) shown as ₹]", file=sys.stderr)
    if entry and entry.get("text") == "ocr":
        print("[seg.py: this is OCR text of a scan: check every number and table against the rendered page (--png)]", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
