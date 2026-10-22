"""OCR cross-check of the text layer: render each chapter page, OCR it with Apple Vision, and list words that OCR
sees but the extracted text lacks (missing glyphs, broken words, scanned pages).

usage: python -I ocr_qa.py <paper> ...   -> <paper>/_ocr_qa.json
"""
import json, os, re, subprocess, sys, tempfile
from multiprocessing import Pool

import pymupdf

HOME = os.path.expanduser('~')
SM = os.path.join(HOME, 'CA_PERSONAL/ca_sources', 'sm')
OCR = os.path.join(HOME, 'DSA_PERSONAL/gate_cse', 'tools', 'ocr', 'ocr')
TMP = tempfile.mkdtemp(prefix='smocr-')
WORD = re.compile(r'[A-Za-z]{4,}')


def txt_pages(path):
    pages, cur = {}, None
    for line in open(path, encoding='utf-8'):
        m = re.match(r'^=== p\.(\d+)(?: \[[^\]]+\])? ===$', line.strip())
        if m:
            cur = int(m.group(1)); pages[cur] = ''
        elif cur:
            pages[cur] += line
    return pages


def job(args):
    pdf, pno, text, raw = args
    d = pymupdf.open(pdf)
    png = os.path.join(TMP, '%s-%d.png' % (re.sub(r'\W', '_', pdf[-40:]), pno))
    d[pno - 1].get_pixmap(dpi=150).save(png)
    try:
        out = subprocess.run([OCR, png], capture_output=True, text=True, timeout=120).stdout
        rows = json.loads(out or '[]')
    except Exception:  # noqa: BLE001
        rows = []
    finally:
        os.remove(png)
    rows = [r for r in rows if r['c'] >= 0.5]
    ocr_txt = ' '.join(r['t'] for r in rows)
    raw_l = raw.lower()
    have = set(WORD.findall(raw_l))
    raw_ns = re.sub(r'[^a-z]', '', raw_l)
    ocr_l = ocr_txt.lower()
    ocr_have = set(re.findall(r'[a-z]{3,}', ocr_l))
    ocr_ns = re.sub(r'[^a-z]', '', ocr_l)
    ow = WORD.findall(ocr_l)
    absent = sorted(set(w for w in ow if w not in have and w not in raw_ns))
    # OCR lines carrying absent words (figure text that is not in the text layer)
    absent_lines = [r['t'] for r in rows if any(w in absent for w in WORD.findall(r['t'].lower()))]
    tw = re.findall(r'[a-z]{3,}', text.lower())
    text_only = sorted(set(w for w in tw if w not in ocr_have and w not in ocr_ns))
    return {'pdf': os.path.relpath(pdf, SM), 'page': pno, 'ocr_words': len(ow), 'text_words': len(tw),
            'ocr_absent': absent, 'n_ocr_absent': len(absent), 'ocr_absent_lines': absent_lines,
            'text_not_in_ocr': text_only, 'n_text_not_in_ocr': len(text_only),
            'rows': [[r['t'], round(r['c'], 2), round(r['x']), round(r['y']), round(r['w']), round(r['h'])] for r in rows]}


def run(paper):
    toc = json.load(open(os.path.join(SM, paper, 'toc.json')))
    tasks = []
    for c in toc:
        for t in (c['units'] or [c]):
            pages = txt_pages(os.path.join(SM, paper, t['txt']))
            pdf = os.path.join(SM, paper, t['pdf'])
            raw = subprocess.run(['pdftotext', '-layout', '-enc', 'UTF-8', pdf, '-'], capture_output=True, text=True).stdout.split('\f')
            for p, txt in pages.items():
                tasks.append((pdf, p, txt, raw[p - 1]))
    with Pool(6) as pool:
        res = pool.map(job, tasks, chunksize=4)
    json.dump(res, open(os.path.join(SM, paper, '_ocr_qa.json'), 'w'), indent=0)
    tot_o = sum(r['ocr_words'] for r in res)
    print(paper, 'pages', len(res), 'ocr words', tot_o, 'ocr-absent', sum(r['n_ocr_absent'] for r in res),
          'text-not-in-ocr', sum(r['n_text_not_in_ocr'] for r in res))


if __name__ == '__main__':
    for p in sys.argv[1:]:
        run(p)
