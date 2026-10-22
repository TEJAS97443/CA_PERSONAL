#!/usr/bin/env python3
"""OCR scanned PDFs with Apple Vision (~/DSA_PERSONAL/gate_cse/tools/ocr/ocr) and write <pdf>.txt with page markers.

Usage: ~/DSA_PERSONAL/gate_cse/.venv/bin/python -I ocr_pdf.py [--dpi 300] [--jobs 6] [--force] PDF [PDF...]
- each page rendered to ~/CA_PERSONAL/ca_sources/q/_scratch/ocrtmp/ (PNG), OCR'd (en-US), boxes cached as JSON in
  ~/CA_PERSONAL/ca_sources/q/_scratch/ocr/<pdf-rel>/p<N>.json
- lines rebuilt from boxes (vertical-centre clustering, x-sorted, wide gaps kept as 3 spaces)
- pages whose OCR text is not English (Hindi-medium pages; Vision has no Hindi model) are replaced by
  a marker line '[Hindi-language page: not OCR'd - Apple Vision has no Hindi model]'
Writes <pdf without .pdf>.txt and prints per-file stats (pages, english pages, hindi pages, mean confidence).
"""
import concurrent.futures as cf
import json
import os
import re
import subprocess
import sys

import pymupdf

OCR = os.path.expanduser('~/DSA_PERSONAL/gate_cse/tools/ocr/ocr')
Q = os.path.expanduser('~/CA_PERSONAL/ca_sources/q')
TMP = os.path.join(Q, '_scratch', 'ocrtmp')
CACHE = os.path.join(Q, '_scratch', 'ocr')
WORDS = set()
for wf in ('/usr/share/dict/words',):
    if os.path.exists(wf):
        with open(wf) as f:
            WORDS.update(w.strip().lower() for w in f if w.strip())
WORDS.update('the of and to in is a for be by on are as with or at from that which any its it an'.split())


def ocr_page(args):
    pdf, rel, k, dpi, force = args[:5]
    rot = args[5] if len(args) > 5 else 0
    cdir = os.path.join(CACHE, rel)
    os.makedirs(cdir, exist_ok=True)
    cj = os.path.join(cdir, f'p{k}.json' if not rot else f'p{k}r{rot}.json')
    if os.path.exists(cj) and not force:
        with open(cj) as f:
            return k, json.load(f)
    d = pymupdf.open(pdf)
    mat = pymupdf.Matrix(dpi / 72, dpi / 72)
    if rot:
        mat = mat.prerotate(rot)
    pix = d[k - 1].get_pixmap(matrix=mat)
    png = os.path.join(TMP, rel.replace('/', '__') + f'-p{k}r{rot}.png')
    pix.save(png)
    r = subprocess.run([OCR, png], capture_output=True, text=True)
    os.remove(png)
    rows = json.loads(r.stdout) if r.returncode == 0 and r.stdout.strip() else []
    data = {'dpi': dpi, 'w': pix.width, 'h': pix.height, 'rows': rows, 'rotated': rot}
    with open(cj, 'w') as f:
        json.dump(data, f)
    return k, data


def lines_from(rows):
    rows = [r for r in rows if r['t'].strip()]
    if not rows:
        return []
    rows.sort(key=lambda r: r['y'] + r['h'] / 2)
    hs = sorted(r['h'] for r in rows)
    medh = hs[len(hs) // 2]
    lines = []
    for r in rows:
        cy = r['y'] + r['h'] / 2
        if lines and abs(cy - lines[-1]['cy']) < 0.45 * medh:
            ln = lines[-1]
            ln['items'].append(r)
            ln['cy'] = sum(i['y'] + i['h'] / 2 for i in ln['items']) / len(ln['items'])
        else:
            lines.append({'cy': cy, 'items': [r]})
    out = []
    for ln in lines:
        items = sorted(ln['items'], key=lambda r: r['x'])
        s = ''
        prev_end = None
        for it in items:
            t = it['t'].strip()
            if prev_end is not None:
                cw = max(1.0, it['w'] / max(1, len(t)))
                gap = it['x'] - prev_end
                s += '   ' if gap > 3 * cw else ' '
            s += t
            prev_end = it['x'] + it['w']
        out.append(s)
    return out


def isword(t):
    t = t.lower()
    return t in WORDS or t.rstrip('s') in WORDS or t.rstrip('d') in WORDS or t[:-2] in WORDS


BOILER = re.compile(r'The\s+Institute\s+of\s+Chartered\s+Accountants\s+of\s+India|\bMarks\b|P\.?\s?T\.?\s?O\.?|'
                    r'Hindi\s+Version|\bRoll\s+No\b', re.I)


def english_ratio(lines):
    toks = re.findall(r'[A-Za-z]{4,}', BOILER.sub(' ', ' '.join(lines)))
    if len(toks) < 8:
        return len(toks), 0.0
    good = sum(1 for t in toks if isword(t))
    return len(toks), good / len(toks)


def good_lines(lines):
    """lines (outside boilerplate) with >=4 alphabetic tokens of which >=70% are English words - Hindi pages
    OCR'd with the en-US model almost never have more than one; English pages with show-through noise keep many"""
    g = 0
    for ln in lines:
        if BOILER.search(ln):
            continue
        toks = re.findall(r'[A-Za-z]{3,}', ln)
        if len(toks) >= 4 and sum(1 for t in toks if isword(t)) >= 0.7 * len(toks):
            g += 1
    return g


def garbage_line_ratio(lines):
    """share of text lines (>=3 alphabetic tokens) in which fewer than 40% of tokens are English words"""
    n = bad = 0
    for ln in lines:
        toks = re.findall(r'[^\W\d_]+', ln)
        if len(toks) < 3:
            continue
        n += 1
        if sum(1 for t in toks if len(t) >= 2 and t.isascii() and isword(t)) < 0.4 * len(toks):
            bad += 1
    return n, (bad / n if n else 0.0)


def main():
    args = sys.argv[1:]
    dpi, jobs, force = 300, 6, False
    if '--dpi' in args:
        i = args.index('--dpi'); dpi = int(args[i + 1]); del args[i:i + 2]
    if '--jobs' in args:
        i = args.index('--jobs'); jobs = int(args[i + 1]); del args[i:i + 2]
    if '--force' in args:
        args.remove('--force'); force = True
    os.makedirs(TMP, exist_ok=True)
    for pdf in args:
        pdf = os.path.abspath(pdf)
        rel = os.path.relpath(pdf, Q)
        n = pymupdf.open(pdf).page_count
        with cf.ThreadPoolExecutor(jobs) as ex:
            res = dict(ex.map(ocr_page, [(pdf, rel, k, dpi, force) for k in range(1, n + 1)]))
        # pages scanned upside-down: if the page reads poorly, OCR it rotated by 180 degrees and keep that
        # version when it reads clearly better (English) - recorded in map.json as 'rotated_pages'
        orig = {k: res[k] for k in range(1, n + 1)}
        weak = [k for k in range(1, n + 1) if english_ratio(lines_from(res[k]['rows']))[1] < 0.4]
        rotated = []
        if weak:
            with cf.ThreadPoolExecutor(jobs) as ex:
                rres = dict(ex.map(ocr_page, [(pdf, rel, k, dpi, force, 180) for k in weak]))
            for k in weak:
                n0, r0 = english_ratio(lines_from(res[k]['rows']))
                n1, r1 = english_ratio(lines_from(rres[k]['rows']))
                if n1 >= 20 and r1 >= 0.8 and r0 < 0.4:
                    res[k] = rres[k]
                    rotated.append(k)
        out, eng, hin, blank, confs = [], 0, 0, 0, []
        cls, plines, gl = {}, {}, {}
        hindi_from = 10 ** 6
        for k in range(1, n + 1):
            lines = lines_from(res[k]['rows'])
            plines[k] = lines
            ntok, ratio = english_ratio(lines)
            letters = re.findall(r'[^\W\d_]', ' '.join(lines))
            foreign = sum(1 for ch in letters if ord(ch) > 0x24F or 0xC0 <= ord(ch) <= 0x24F)
            fr = foreign / len(letters) if letters else 0
            gn, gr = garbage_line_ratio(lines)
            if re.search(r'Hindi\s*Version', ' '.join(lines + lines_from(orig[k]['rows'])), re.I):
                hindi_from = min(hindi_from, k)
            g = good_lines(lines)
            gl[k] = g
            nalpha = len(re.findall(r'[^\W\d_]{2,}', BOILER.sub(' ', ' '.join(lines))))
            if not lines:
                cls[k] = 'blank'
            elif k >= hindi_from:
                cls[k] = 'hi'
            elif g >= 4:
                cls[k] = 'en'
            elif g <= 1 and (nalpha >= 15 or (len(letters) >= 20 and fr > 0.04)):
                cls[k] = 'hi'
            else:
                cls[k] = 'amb'     # thin page (rough-work page, booklet code) or 2-3 good lines
        # bilingual booklets: English half first, Hindi half after. Find the start s of the trailing
        # mostly-Hindi block (>=70% of decided pages are Hindi, page s itself Hindi); split there.
        split = n + 1
        for st in range(1, n + 1):
            if cls[st] != 'hi':
                continue
            dec = [cls[j] for j in range(st, n + 1) if cls[j] in ('en', 'hi')]
            if dec and sum(1 for c in dec if c == 'hi') / len(dec) >= 0.7:
                split = st
                break
        # an undecided page (few or garbled tokens) right before the Hindi block is the Hindi cover/first page
        while split <= n and split - 1 >= 2 and cls[split - 1] == 'amb' and gl[split - 1] <= 1:
            split -= 1
        for k in range(1, n + 1):
            if cls[k] != 'blank':
                cls[k] = 'hi' if k >= split else 'en'
        for k in range(1, n + 1):
            out.append(f'=== p.{k} ===')
            c = cls[k]
            if c == 'blank':
                blank += 1
                out.append('[blank page or no text recognised]')
            elif c.startswith('hi'):
                hin += 1
                out.append("[Hindi-language page: not OCR'd - Apple Vision has no Hindi model]")
            else:
                eng += 1
                confs.extend(r['c'] for r in res[k]['rows'])
                out.extend(plines[k])
        with open(os.path.join(CACHE, rel, 'map.json'), 'w') as f:
            json.dump({'english_pages': [k for k in range(1, n + 1) if cls[k] == 'en'],
                       'hindi_pages': [k for k in range(1, n + 1) if cls[k] == 'hi'],
                       'blank_pages': [k for k in range(1, n + 1) if cls[k] == 'blank'],
                       'rotated_pages': rotated}, f)
        txt = pdf[:-4] + '.txt'
        with open(txt, 'w') as f:
            f.write('\n'.join(out) + '\n')
        mc = sum(confs) / len(confs) if confs else 0
        print(json.dumps({'file': rel, 'pages': n, 'english': eng, 'hindi': hin, 'blank': blank,
                          'mean_conf': round(mc, 3), 'rotated': rotated,
                          'map': ''.join({'en': 'E', 'hi': 'H', 'blank': '.'}[cls[k]]
                                         for k in range(1, n + 1))}))


if __name__ == '__main__':
    main()
