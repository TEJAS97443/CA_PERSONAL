#!/usr/bin/env python3
"""Stitch the footer-free cover onto the footered body, and add chapter bookmarks.

Run after make-pdf.js:  python3 merge-pdf.py [outname.pdf]
"""
import re
import sys
from pathlib import Path

import pypdf

ROOT = Path(__file__).resolve().parent
FULL = ROOT / "_full.pdf"
COVER = ROOT / "_cover.pdf"
OUT = ROOT / (sys.argv[1] if len(sys.argv) > 1 else "CA-Inter-SM-QuestionBank.pdf")

CH_RE = re.compile(r"^\s*CHAPTER\s+([1-5])\b", re.M | re.I)
# every section starts a fresh page, so a section heading is one of the page's first lines
HEADINGS = [
    ("How to use this book", re.compile(r"^How to use this book$")),
    ("What is inside", re.compile(r"^What is inside$")),
    ("What the 2023 syllabus changed", re.compile(r"^What the 2023 syllabus changed$")),
    ("Most repeated topics", re.compile(r"^Most repeated topics$")),
    ("Case scenarios & standalone MCQs", re.compile(r"^Case scenarios & standalone MCQs$")),
    ("Appendix — not in syllabus", re.compile(r"^Questions no longer in the syllabus$")),
    ("Sources", re.compile(r"^Sources$")),
]
FRONT = 4          # the first four headings are front matter, listed before the chapters
CH_NAMES = {
    1: "Introduction to Strategic Management",
    2: "Strategic Analysis: External Environment",
    3: "Strategic Analysis: Internal Environment",
    4: "Strategic Choices",
    5: "Strategy Implementation and Evaluation",
}


def main() -> None:
    if not FULL.exists() or not COVER.exists():
        sys.exit("run make-pdf.js first (missing _full.pdf / _cover.pdf)")

    full = pypdf.PdfReader(str(FULL))
    cover = pypdf.PdfReader(str(COVER))
    if len(cover.pages) != 1:     # only page 1 is used: anything past it would be lost
        sys.exit(f"cover runs to {len(cover.pages)} pages — tighten the cover CSS")
    w = pypdf.PdfWriter()

    w.add_page(cover.pages[0])                 # clean cover, no footer
    for p in full.pages[1:]:                   # body, footered
        w.add_page(p)

    # bookmarks: find the first page where each chapter opener appears
    seen_ch: dict[int, int] = {}
    seen_h: dict[str, int] = {}
    for i, page in enumerate(w.pages):
        try:
            txt = page.extract_text() or ""
        except Exception:                       # noqa: BLE001
            continue
        for m in CH_RE.finditer(txt):
            n = int(m.group(1))
            # a chapter opener page also carries the chapter name
            if n not in seen_ch and CH_NAMES[n].split(":")[0][:16].lower() in txt.lower():
                seen_ch[n] = i
        top = [ln.strip() for ln in txt.split("\n") if ln.strip()][:2]
        for label, rx in HEADINGS:
            if label not in seen_h and any(rx.match(ln) for ln in top):
                seen_h[label] = i

    w.add_outline_item("Cover", 0)
    for label, _rx in HEADINGS[:FRONT]:
        if label in seen_h:
            w.add_outline_item(label, seen_h[label])
    for n in sorted(seen_ch):
        w.add_outline_item(f"Chapter {n} — {CH_NAMES[n]}", seen_ch[n])
    for label, _rx in HEADINGS[FRONT:]:
        if label in seen_h:
            w.add_outline_item(label, seen_h[label])

    w.add_metadata({
        "/Title": "CA Intermediate — Strategic Management Question Bank (RTP · MTP · Past Exams)",
        "/Subject": "ICAI CA Intermediate Paper 6B Strategic Management, chapter-wise question bank",
        "/Keywords": "CA Inter, Strategic Management, ICAI, RTP, MTP, past exam, question bank",
        "/Creator": "sm-qbank build",
    })

    with open(OUT, "wb") as fh:
        w.write(fh)
    print(f"  {OUT.name}: {len(w.pages)} pages, "
          f"{len(seen_ch)} chapter bookmarks, {len(seen_h)} section bookmarks")


if __name__ == "__main__":
    main()
