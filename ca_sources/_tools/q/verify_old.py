#!/usr/bin/env python3
"""Open every old-scheme PDF and check paper / attempt / series against its slot.

Usage: ~/DSA_PERSONAL/gate_cse/.venv/bin/python -I verify_old.py [REGEX]
Prints one line per file: OK/CHECK, slot, what the PDF says (paper title, exam line, test-series line),
pages, text chars, mirror watermark hits. Scanned PDFs (no text) are reported as SCAN (check by OCR).
"""
import glob
import os
import re
import sys

import pymupdf

Q = os.path.expanduser('~/CA_PERSONAL/ca_sources/q')
PAPER = {'p3': r'COST\s+AND\s+MANAGEMENT\s+ACCOUNTING', 'p6': r'AUDITING\s+AND\s+ASSURANCE',
         'p8': r'FINANCIAL\s+MANAGEMENT\s+(AND|&)\s+ECONOMICS'}
MON = {'nov': 'NOVEMBER', 'may': 'MAY', 'jan': 'JANUARY', 'jul': 'JULY', 'dec': 'DECEMBER'}
# RTP/MTP labels ICAI used for the deferred attempts
ALT = {'jul2021': ['MAY,? 2021', 'JULY,? 2021', 'MARCH,? 2021', 'APRIL,? 2021'],
       'dec2021': ['NOVEMBER,? 2021', 'DECEMBER,? 2021', 'OCTOBER,? 2021'],
       'jan2021': ['JANUARY,? 2021'], 'nov2020': ['NOVEMBER,? 2020', 'OCTOBER,? 2020'],
       'may2020': ['MAY,? 2020', 'MARCH,? 2020', 'APRIL,? 2020'], 'nov2019': ['NOVEMBER,? 2019', 'OCTOBER,? 2019'],
       'may2022': ['MAY,? 2022', 'MARCH,? 2022', 'APRIL,? 2022'], 'nov2022': ['NOVEMBER,? 2022', 'SEPTEMBER,? 2022', 'OCTOBER,? 2022'],
       'may2023': ['MAY,? 2023', 'MARCH,? 2023', 'APRIL,? 2023'], 'nov2023': ['NOVEMBER,? 2023', 'SEPTEMBER,? 2023', 'OCTOBER,? 2023']}


def main():
    rx = re.compile(sys.argv[1]) if len(sys.argv) > 1 else None
    for f in sorted(glob.glob(os.path.join(Q, 'old', '*', '*.pdf'))):
        rel = os.path.relpath(f, Q)
        if rx and not rx.search(rel):
            continue
        paper = rel.split('/')[1]
        m = re.match(r'(pyq|rtp|mtp)-([a-z]+\d{4})(?:-(s\d))?-(q|a|qa)\.pdf', os.path.basename(f))
        kind, att, ser, part = m.groups()
        d = pymupdf.open(f)
        texts = [p.get_text('text') for p in d]
        chars = sum(len(t.strip()) for t in texts)
        head = '\n'.join(texts[:3])
        allt = '\n'.join(texts)
        if chars < 200 * d.page_count / 10:
            print(f'SCAN  {rel:32s} p={d.page_count} chars={chars}')
            continue
        okp = bool(re.search(PAPER[paper], allt, re.I))
        oka = any(re.search(a, allt, re.I) for a in ALT[att])
        ts = re.search(r'(Test Series\s*:?\s*[A-Za-z]+,?\s*20\d\d|MOCK TEST PAPER\s*[-–]?\s*(?:SERIES\s*)?[-–]?\s*(I{1,2}|1|2)\b)', head, re.I)
        okser = True
        if kind == 'mtp' and ts and ts.group(2):
            n = {'I': 's1', '1': 's1', 'II': 's2', '2': 's2'}[ts.group(2).upper()]
            okser = n == ser
        wm = len(re.findall(r'castudynotes|cacult|telegram\s*@|@canotes', allt, re.I))
        ex = re.search(r'(INTERMEDIATE[^\n]{0,15}EXAMINATION[^\n]{0,25})', head)
        status = 'OK   ' if (okp and oka and okser) else 'CHECK'
        print(f'{status} {rel:32s} p={d.page_count:3d} paper={okp} att={oka} ser={okser} wm={wm} '
              f'| {(ex.group(1).strip() if ex else "")[:45]} | {(ts.group(0) if ts else "")[:40]}')


if __name__ == '__main__':
    main()
