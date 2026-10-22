"""Compare the Jan-2027-applicable edition (July 2024, reprint Aug 2025) with the newer July 2026 edition
("Relevant for May 2027 and onward examinations") chapter by chapter: headings added/removed and text similarity,
plus a few Paper 5 sensitive terms. Writes <paper>/_edition_diff_may2027.json and prints a summary.

usage: python -I ed_diff.py p4 p5 p6b
"""
import difflib, json, os, re, subprocess, sys
import pymupdf

HOME = os.path.expanduser('~')
sys.path.insert(0, os.path.join(HOME, 'CA_PERSONAL/ca_sources', '_tools'))
from extract import page_info, TRANS  # noqa: E402

SM = os.path.join(HOME, 'CA_PERSONAL/ca_sources', 'sm')
TERMS = ['SQM 1', 'SQM 2', 'SQC 1', 'SA 220 (Revised)', 'SA 220', 'SA 600 (Revised)', 'SA 600', 'SA 299', 'CARO, 2020', 'CARO 2020',
         'Standard on Quality Management', 'Quality Management', 'Income-tax Act, 2025', 'Income-tax Act, 1961', 'GeM', 'ERP']


def words(pdf):
    t = subprocess.run(['pdftotext', '-enc', 'UTF-8', pdf, '-'], capture_output=True, text=True).stdout.translate(TRANS)
    t = re.sub(r'©\s*The Institute of Chartered Accountants of India', ' ', t)
    return t, re.findall(r"[A-Za-z0-9₹%]+", t)


def heads(pdf):
    d = pymupdf.open(pdf)
    out = []
    for p in d:
        hs, _ = page_info(p)
        out += [re.sub(r'\s+', ' ', h['h']).strip() for h in hs if h['numbered']]
    return out, d.page_count


def norm(h):
    return re.sub(r'[^a-z0-9]+', ' ', h.lower()).strip()


def run(paper):
    old_dir = os.path.join(SM, paper, 'pdf')
    new_dir = os.path.join(old_dir, 'may2027-edition')
    res = []
    for f in sorted(os.listdir(new_dir)):
        if not f.startswith('ch'):
            continue
        a, b = os.path.join(old_dir, f), os.path.join(new_dir, f)
        if not os.path.exists(a):
            continue
        ha, na = heads(a)
        hb, nb = heads(b)
        sa, sb = {norm(x): x for x in ha}, {norm(x): x for x in hb}
        removed = [sa[k] for k in sa if k not in sb]
        added = [sb[k] for k in sb if k not in sa]
        ta, wa = words(a)
        tb, wb = words(b)
        sm = difflib.SequenceMatcher(None, wa, wb, autojunk=False)
        ratio = sm.ratio()
        ins = sum(j2 - j1 for op, i1, i2, j1, j2 in sm.get_opcodes() if op in ('insert', 'replace'))
        dele = sum(i2 - i1 for op, i1, i2, j1, j2 in sm.get_opcodes() if op in ('delete', 'replace'))
        terms = {t: [ta.count(t), tb.count(t)] for t in TERMS if ta.count(t) or tb.count(t)}
        r = {'file': f, 'pages_jan2027_ed': na, 'pages_may2027_ed': nb, 'word_similarity': round(ratio, 3),
             'words_jan2027_ed': len(wa), 'words_may2027_ed': len(wb), 'words_inserted_in_new': ins, 'words_deleted_from_old': dele,
             'headings_only_in_jan2027_ed': removed, 'headings_only_in_may2027_ed': added, 'term_counts_[jan27ed,may27ed]': terms}
        res.append(r)
        print('%s %s pages %d->%d sim %.3f +%d -%d words; heads -%d +%d' % (paper, f, na, nb, ratio, ins, dele, len(removed), len(added)))
    json.dump(res, open(os.path.join(SM, paper, '_edition_diff_may2027.json'), 'w'), indent=1, ensure_ascii=False)


if __name__ == '__main__':
    for p in sys.argv[1:]:
        run(p)
