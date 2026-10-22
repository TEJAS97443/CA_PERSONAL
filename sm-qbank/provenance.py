#!/usr/bin/env python3
"""Provenance check: is every question and answer actually in its ICAI source PDF?

Method (adapted from the old-scheme PYQ extractor's check): normalise both texts to
lowercase alphanumeric words, build 5-word shingles, and measure what fraction of a
record's shingles occur anywhere in its source documents' text. Verbatim copies with
permitted clean-ups (de-hyphenation, re-wrapped lines) score ~1.0; paraphrase or
invention scores low. Tables legitimately score lower because converting ICAI's
two-column layout to a markdown table changes reading order.

python3 provenance.py          summary + worst records
python3 provenance.py --all    every record below threshold
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data"
RAW = ROOT / "raw"
CACHE = ROOT / "work" / "prov"
K = 5
Q_MIN = 0.85     # questions are prose; near-verbatim expected
A_MIN = 0.70     # answers include re-laid-out tables
SHOW_ALL = "--all" in sys.argv

WORD = re.compile(r"[a-z0-9]+")


def words(t: str) -> list[str]:
    t = (t or "").lower()
    t = re.sub(r"(\w)-\s*\n\s*(\w)", r"\1\2", t)       # hyphen across a line break
    return WORD.findall(t)


def shingles(ws: list[str]) -> set[tuple]:
    return {tuple(ws[i:i + K]) for i in range(len(ws) - K + 1)}


def pdf_text(pdf: Path) -> str:
    """Text of a PDF, from an existing dump if the extractor left one, else pdftotext."""
    for cand in (pdf.with_suffix(".txt"), Path(str(pdf) + ".txt")):
        if cand.exists() and cand.stat().st_size > 0:
            return cand.read_text(errors="ignore")
    CACHE.mkdir(parents=True, exist_ok=True)
    out = CACHE / (pdf.name + ".txt")
    if not out.exists():
        subprocess.run(["pdftotext", "-layout", str(pdf), str(out)],
                       capture_output=True, check=False)
    return out.read_text(errors="ignore") if out.exists() else ""


def source_pdfs(doc_file: Path, src: dict) -> list[Path]:
    found: list[Path] = []
    lf = src.get("local_file")
    vals = lf if isinstance(lf, list) else re.split(r"[,;]\s*", lf or "")
    for v in vals:
        v = v.strip()
        if v:
            p = (ROOT / v) if not v.startswith("/") else Path(v)
            if p.exists():
                found.append(p)
    # every raw PDF that shares the data file's stem (question paper + answers, etc.)
    found += sorted(RAW.glob(doc_file.stem + "*.pdf"))
    # filenames mentioned in notes (the extractors sometimes record extra parts there)
    for name in re.findall(r"[\w.\-]+\.pdf", src.get("notes") or ""):
        p = RAW / Path(name).name
        if p.exists():
            found.append(p)
    seen, uniq = set(), []
    for p in found:
        if p.resolve() not in seen:
            seen.add(p.resolve())
            uniq.append(p)
    return uniq


def main() -> None:
    rows = []
    unverifiable = defaultdict(int)
    for f in sorted(DATA.glob("*.json")):
        doc = json.loads(f.read_text())
        src = doc.get("source") or {}
        pdfs = source_pdfs(f, src)
        text = "\n".join(pdf_text(p) for p in pdfs)
        # a line-end hyphen may be a split word ("manage-/ment") or a compound
        # ("cross-/functional"); accept either reading of the source
        src_sh = shingles(words(text)) | shingles(WORD.findall(text.lower()))
        scan = len(src_sh) < 200           # image-only scan: nothing to check against
        flat = " " + " ".join(words(text)) + " "

        def cov(ws):
            sh = shingles(ws)
            if sh:
                return len(sh & src_sh) / len(sh)
            if ws:                       # shorter than one shingle: exact phrase lookup
                return 1.0 if (" " + " ".join(ws) + " ") in flat else 0.0
            return None

        def qcov(t: str):
            """Split-out sub-parts repeat their shared stem ("Distinguish between the
            following: ..."). Verify the stem and the body separately in that case."""
            full = cov(words(t))
            m = re.match(r"\s*([^:\n]{3,90}?):\s+(.+)", t or "", re.S)
            if not m or len(words(m.group(1))) > 24:
                return full
            stem_ok = (cov(words(m.group(1))) or 0) >= 0.99
            body = cov(words(m.group(2)))
            if stem_ok and body is not None:
                return max(full or 0.0, body)
            return full

        from build import REF_NOTE  # compiler-written pointers are not ICAI text
        for q in doc.get("questions") or []:
            q = dict(q)
            q["question"] = REF_NOTE.sub("", q.get("question") or "", count=1)
            if scan:
                unverifiable[f.name] += 1
                continue
            rows.append((f.name, q.get("id") or q.get("qno"), qcov(q.get("question") or ""),
                         cov(words(q.get("answer"))), "|" in (q.get("answer") or "")))

    qs = [r for r in rows if r[2] is not None]
    an = [r for r in rows if r[3] is not None]
    q_bad = [r for r in qs if r[2] < Q_MIN]
    a_bad = [r for r in an if r[3] < A_MIN and not r[4]]
    a_tab = [r for r in an if r[3] < A_MIN and r[4]]

    def pct(xs, i):
        return sum(r[i] for r in xs) / len(xs) if xs else 0

    print(f"records checked        : {len(rows)}")
    print(f"mean question coverage : {pct(qs, 2):.3f}   below {Q_MIN}: {len(q_bad)}")
    print(f"mean answer coverage   : {pct(an, 3):.3f}   below {A_MIN}: {len(a_bad)} prose, "
          f"{len(a_tab)} table (expected)")
    if unverifiable:
        print("unverifiable (image-only source, transcribed):")
        for k, v in unverifiable.items():
            print(f"    {k}: {v} records")
    lim = None if SHOW_ALL else 12
    if q_bad:
        print("\nlowest question coverage:")
        for r in sorted(q_bad, key=lambda r: r[2])[:lim]:
            print(f"    {r[2]:.2f}  {r[0]}  {r[1]}")
    if a_bad:
        print("\nlowest prose-answer coverage:")
        for r in sorted(a_bad, key=lambda r: r[3])[:lim]:
            print(f"    {r[3]:.2f}  {r[0]}  {r[1]}")
    sys.exit(1 if (q_bad or a_bad) else 0)


if __name__ == "__main__":
    main()
