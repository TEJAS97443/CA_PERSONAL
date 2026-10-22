"""Write ~/CA_PERSONAL/ca_sources/SOURCES.md: one row per downloaded document."""
import hashlib, json, os, time
import pymupdf

HOME = os.path.expanduser('~')
SM = os.path.join(HOME, 'CA_PERSONAL/ca_sources', 'sm')
DL = json.load(open(os.path.join(SM, '_downloads.json')))
APP = json.load(open(os.path.join(SM, '_applicability', 'sources.json')))
PAPER = {'p4': 'P4 Cost and Management Accounting', 'p5': 'P5 Auditing and Ethics', 'p6a': 'P6A Financial Management', 'p6b': 'P6B Strategic Management'}


def pages(path):
    try:
        return pymupdf.open(path).page_count
    except Exception:  # noqa: BLE001
        return '?'


rows = []
for r in DL:
    path = os.path.join(SM, r['local'])
    ed = ('July 2024 edition, Reprint August 2025 (cover: "Relevant for May, 2026 Examination"); applicable for Jan 2027'
          if r['edition_set'] == 'jan2027' else
          'July 2026 edition (cover: "Relevant for May, 2027 and onward Examinations"); NOT applicable for Jan 2027')
    rows.append((PAPER[r['paper']], r['label'] if r['edition_set'] == 'jan2027' else r['label'].replace('May 2027 set ', 'July 2026 ed. '),
                 ed, r['url'], r['fetched'], r['size'], r['sha256'], pages(path), 'sm/' + r['local']))
for a in APP:
    path = os.path.join(SM, '_applicability', 'pdf', a['file'])
    b = open(path, 'rb').read()
    rows.append(('All (applicability)', a['title'], a['edition'], a['url'], a['fetched'], len(b), hashlib.sha256(b).hexdigest(),
                 pages(path), 'sm/_applicability/pdf/' + a['file']))

with open(os.path.join(HOME, 'CA_PERSONAL/ca_sources', 'SOURCES.md'), 'w', encoding='utf-8') as f:
    f.write('# Sources: ICAI BoS study material for CA Intermediate Group II (new scheme), January 2027 attempt\n\n')
    f.write('Generated %s by `_tools/make_sources.py`. Edition is read from the module initial pages (page ii) of each set; '
            'chapter PDFs do not print the edition themselves. Local paths are relative to `~/CA_PERSONAL/ca_sources/`. '
            'The primary set (used for all `txt/` and `toc.json`) is the July 2024 edition, Reprint August 2025, which ICAI\'s '
            '16 Sep 2026 notice lists for the January 2027 examination. The July 2026 edition is kept only for reference in '
            '`sm/<paper>/pdf/may2027-edition/`.\n\n' % time.strftime('%Y-%m-%d'))
    f.write('| paper | title | edition printed in the PDF | URL | fetched | size (bytes) | sha256 | pages | local file |\n')
    f.write('|---|---|---|---|---|---|---|---|---|\n')
    for row in rows:
        f.write('| ' + ' | '.join(str(x).replace('|', '/') for x in row) + ' |\n')
print(len(rows), 'rows')
