#!/usr/bin/env python3
"""Scan boslive.icai.org Android MTP endpoint for series ids and list papers + PDF links.

Usage: python3 -I boslive_scan.py OUTDIR first last
Writes OUTDIR/series.json: [{id, title, papers:[{heading, date, q, a}]}]
Raw HTML pages kept in OUTDIR/html/<id>.html (untrusted data; parsed with regex only).
"""
import html
import json
import os
import re
import subprocess
import sys

UA = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/124.0 Safari/537.36')
URL = 'https://boslive.icai.org/androidapi/mock_test_paper_details.php?id={}'


def fetch(i, path):
    if not os.path.exists(path) or os.path.getsize(path) < 200:
        subprocess.run(['curl', '-s', '-m', '60', '-A', UA, URL.format(i), '-o', path])
    with open(path, encoding='utf-8', errors='replace') as f:
        return f.read()


def parse(text):
    m = re.search(r'<h3>(.*?)</h3>', text, re.S)
    title = html.unescape(re.sub(r'\s+', ' ', m.group(1)).strip()) if m else ''
    papers = []
    parts = re.split(r'<h4 class="panel-heading">', text)
    for p in parts[1:]:
        heading = html.unescape(p.split('</h4>', 1)[0].strip())
        dm = re.search(r'date\.png[^>]*>\s*([^<]*)<', p)
        q = re.search(r'name="question_link" value="([^"]*)"', p)
        a = re.search(r'name="answer_link" value="([^"]*)"', p)
        papers.append({'heading': heading,
                       'date': dm.group(1).strip() if dm else '',
                       'q': q.group(1) if q else None,
                       'a': a.group(1) if a else None})
    return title, papers


def main():
    out, first, last = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
    os.makedirs(os.path.join(out, 'html'), exist_ok=True)
    res = []
    for i in range(first, last + 1):
        t = fetch(i, os.path.join(out, 'html', f'{i}.html'))
        title, papers = parse(t)
        res.append({'id': i, 'title': title, 'papers': papers})
        print(i, '|', title, '|', len(papers))
    with open(os.path.join(out, 'series.json'), 'w') as f:
        json.dump(res, f, indent=1)


if __name__ == '__main__':
    main()
