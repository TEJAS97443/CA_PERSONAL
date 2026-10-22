#!/usr/bin/env python3
"""Identify ICAI PDFs in a directory: paper title, attempt/exam line, test-series line, page count,
metadata dates, and any mirror watermark text.

Usage: ~/DSA_PERSONAL/gate_cse/.venv/bin/python -I identify.py DIR_OR_FILES...
"""
import collections
import glob
import os
import re
import sys

import pymupdf

PAPER = re.compile(r'PAPER\s*[-–—:]?\s*\d+[A-B]?\s*[:\-–]\s*[A-Z][A-Z &,]+', re.I)
EXAM = re.compile(r'(INTERMEDIATE[^\n]{0,30}EXAMINATION[^\n]{0,30}|EXAMINATION\s*:\s*[A-Z]+[ ,]*20\d\d|'
                  r'(MAY|NOVEMBER|DECEMBER|JULY|JANUARY|JUNE)[, ]+20\d\d|Test Series[^\n]{0,40}|'
                  r'MOCK TEST PAPER[^\n]{0,30}|Series\s*[-–]?\s*I{1,2}\b[^\n]{0,30}|REVISION TEST PAPER[^\n]{0,20}|'
                  r'SUGGESTED ANSWER[^\n]{0,20})', re.I)
MIRROR = re.compile(r'(cacult|castudy|castudyweb|castudynotes|telegram|t\.me/|www\.[a-z0-9-]+\.(com|in)\b)', re.I)


def main():
    files = []
    for a in sys.argv[1:]:
        files += sorted(glob.glob(os.path.join(a, '*.pdf'))) if os.path.isdir(a) else [a]
    for f in files:
        try:
            d = pymupdf.open(f)
        except Exception as ex:  # noqa: BLE001
            print(os.path.basename(f), 'OPEN-ERROR', ex)
            continue
        papers, exams, mirr = collections.Counter(), collections.Counter(), collections.Counter()
        chars = 0
        for i, p in enumerate(d):
            t = p.get_text('text')
            chars += len(t.strip())
            if i < 6 or i == d.page_count - 1:
                for m in PAPER.finditer(t):
                    papers[re.sub(r'\s+', ' ', m.group(0)).strip()[:60]] += 1
                for m in EXAM.finditer(t):
                    exams[re.sub(r'\s+', ' ', m.group(0)).strip()[:50]] += 1
            for m in MIRROR.finditer(t):
                mirr[m.group(0).lower()] += 1
        md = d.metadata or {}
        print(f"{os.path.basename(f):34s} p={d.page_count:3d} chars={chars:6d} "
              f"created={md.get('creationDate', '')[2:10]} prod={md.get('producer', '')[:20]!r}\n"
              f"    papers={papers.most_common(2)}\n    exams={exams.most_common(4)}"
              + (f"\n    MIRROR-TEXT={mirr.most_common(3)}" if mirr else ''))


if __name__ == '__main__':
    main()
