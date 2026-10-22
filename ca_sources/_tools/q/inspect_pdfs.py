#!/usr/bin/env python3
"""Print title-page facts for PDFs under ~/CA_PERSONAL/ca_sources/q matching a regex.

Usage: ~/DSA_PERSONAL/gate_cse/.venv/bin/python -I inspect_pdfs.py REGEX [--chars N] [--page K]
Shows pages, text chars per page (min/total), number of image-only pages, and the first N chars
of page K (default 1) text with newlines as ' | '.
"""
import glob
import os
import re
import sys

import pymupdf

Q = os.path.expanduser('~/CA_PERSONAL/ca_sources/q')


def main():
    rx = re.compile(sys.argv[1])
    n = int(sys.argv[sys.argv.index('--chars') + 1]) if '--chars' in sys.argv else 300
    k = int(sys.argv[sys.argv.index('--page') + 1]) if '--page' in sys.argv else 1
    for f in sorted(glob.glob(os.path.join(Q, '*', '*', '*.pdf'))):
        rel = os.path.relpath(f, Q)
        if not rx.search(rel):
            continue
        d = pymupdf.open(f)
        lens = [len(p.get_text('text').strip()) for p in d]
        empty = sum(1 for x in lens if x < 30)
        t = d[min(k, d.page_count) - 1].get_text('text').strip()
        t = re.sub(r'\s*\n\s*', ' | ', t)[:n]
        print(f'{rel:34s} p={d.page_count:3d} chars={sum(lens):6d} imgonly={empty:3d} :: {t}')


if __name__ == '__main__':
    main()
