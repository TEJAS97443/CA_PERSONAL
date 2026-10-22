"""Analyse stored OCR rows (_ocr_qa.json) against the text layer.

1. figure text: OCR words (dictionary words, len>=4) absent from the ligature-normalised text layer -> pages whose
   figures/images carry text that is not in the PDF text layer. Writes <paper>/_ocr_supplement.json
   {txt_rel: {page: [ocr lines]}} for apply_ocr.py.
2. missing glyphs: OCR lines that match the text layer except for 1-3 letters the text layer lacks (e.g. 'STRA GIC'
   for 'STRATEGIC'). Printed for review and saved to <paper>/_ocr_glyph_candidates.json.

usage: python -I ocr_analyze.py <paper> ...
"""
import difflib, json, os, re, subprocess, sys

HOME = os.path.expanduser('~')
sys.path.insert(0, os.path.join(HOME, 'CA_PERSONAL/ca_sources', '_tools'))
from extract import TRANS  # noqa: E402

SM = os.path.join(HOME, 'CA_PERSONAL/ca_sources', 'sm')
DICT = set()
for p in ('/usr/share/dict/words', '/usr/share/dict/web2'):
    if os.path.exists(p):
        DICT |= {w.strip().lower() for w in open(p, encoding='utf-8', errors='ignore')}
WORD = re.compile(r'[a-z]{4,}')


def norm(t):
    return t.translate(TRANS).lower()


def inflect_ok(w):
    if w in DICT:
        return True
    for suf in ('s', 'es', 'ed', 'ing', 'ly', 'ies', 'er', 'ers', 'al', 'ion', 'ions', 'ment', 'ments', 'ity'):
        if w.endswith(suf) and (w[:-len(suf)] in DICT or w[:-len(suf)] + 'e' in DICT or w[:-len(suf)] + 'y' in DICT):
            return True
    return False


def run(paper, min_dict=4):
    res = json.load(open(os.path.join(SM, paper, '_ocr_qa.json')))
    toc = json.load(open(os.path.join(SM, paper, 'toc.json')))
    pdf2txt = {}
    for c in toc:
        for t in (c['units'] or [c]):
            pdf2txt[os.path.join(paper, t['pdf'])] = t['txt']
    raw_cache = {}
    supp, glyph = {}, []
    for r in res:
        pdf = r['pdf']
        if pdf not in raw_cache:
            raw_cache[pdf] = subprocess.run(['pdftotext', '-layout', '-enc', 'UTF-8', os.path.join(SM, pdf), '-'],
                                            capture_output=True, text=True).stdout.split('\f')
        raw = norm(raw_cache[pdf][r['page'] - 1])
        have = set(WORD.findall(raw))
        ns = re.sub(r'[^a-z0-9]', '', raw)
        rows = r['rows']
        absent_rows, absent_words = [], set()
        for t, c, x, y, w, h in rows:
            ws = [w_ for w_ in WORD.findall(t.lower()) if w_ not in have and w_ not in ns]
            if ws:
                absent_rows.append(t)
                absent_words |= set(ws)
        dict_absent = sorted(w for w in absent_words if inflect_ok(w))
        if len(dict_absent) >= min_dict:
            supp.setdefault(pdf2txt[pdf], {})[str(r['page'])] = {'lines': absent_rows, 'dict_words': dict_absent}
        # missing-glyph / split-word candidates: adjacent text-layer fragments a, b (one of them not a word) such that an
        # OCR word on the page is a + (0-3 letters) + b
        ocr_words = set()
        for t, c, x, y, w, h in rows:
            if c >= 0.5:
                ocr_words |= set(re.findall(r'[a-z]{4,}', t.lower()))
        toks = re.findall(r'[A-Za-z]+|[^A-Za-z\s]+|\s+', raw_cache[pdf][r['page'] - 1].translate(TRANS))
        seq = [(i, t_) for i, t_ in enumerate(toks) if t_.isalpha()]
        for (i1, a_), (i2, b_) in zip(seq, seq[1:]):
            if any(not toks[k].isspace() for k in range(i1 + 1, i2)) or '\n' in ''.join(toks[i1 + 1:i2]):
                continue
            al, bl = a_.lower(), b_.lower()
            if inflect_ok(al) and inflect_ok(bl):
                continue            # both real words: not a broken word
            if len(al) < 2 or (len(bl) < 2 and not (len(al) >= 5 and not inflect_ok(al))):
                continue
            for W in ocr_words:
                gap = len(W) - len(al) - len(bl)
                if 0 <= gap <= 3 and W.startswith(al) and W.endswith(bl) and inflect_ok(W) and len(W) >= 5:
                    glyph.append({'pdf': pdf, 'page': r['page'], 'text': a_ + ' ' + b_, 'ocr_word': W, 'lost': W[len(al):len(W) - len(bl)]})
                    break
    json.dump(supp, open(os.path.join(SM, paper, '_ocr_supplement.json'), 'w'), indent=1, ensure_ascii=False)
    json.dump(glyph, open(os.path.join(SM, paper, '_ocr_glyph_candidates.json'), 'w'), indent=1, ensure_ascii=False)
    npages = sum(len(v) for v in supp.values())
    print('%s: figure-text pages %d; missing-glyph candidates %d' % (paper, npages, len(glyph)))
    for g in glyph:
        print('   GLYPH', g['pdf'], g['page'], repr(g['text']), '->', g['ocr_word'], 'lost=%r' % g['lost'])
    return supp, glyph


if __name__ == '__main__':
    for p in sys.argv[1:]:
        run(p)
