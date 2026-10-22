"""Extract ICAI study-material PDFs to page-marked text + build toc.json.

usage: python -I extract.py <paper> [<paper> ...]   (paper in p4 p5 p6a p6b)
Reads  ~/CA_PERSONAL/ca_sources/sm/<paper>/pdf/*.pdf   (never executes anything from there)
Writes ~/CA_PERSONAL/ca_sources/sm/<paper>/txt/*.txt, ~/CA_PERSONAL/ca_sources/sm/<paper>/toc.json, ~/CA_PERSONAL/ca_sources/sm/<paper>/_extract_log.json
Text = poppler `pdftotext -layout` per page (a words-based layout pass; ICAI PDFs often omit space glyphs, so
PyMuPDF get_text("text") puts each word of a justified line on its own line and scrambles table columns), then cleaned.
Headings = PyMuPDF span fonts (bold SegoeUI Black/Bold, size >= 12, numbered) with PDF page numbers.
"""
import collections, json, os, re, subprocess, sys
import pymupdf

HOME = os.path.expanduser('~')
sys.path.insert(0, os.path.join(HOME, 'CA_PERSONAL/ca_sources', '_tools'))
from chapters import PAPERS          # noqa: E402
from lines import page_lines        # noqa: E402

SM = os.path.join(HOME, 'CA_PERSONAL/ca_sources', 'sm')
DL = {r['local']: r for r in json.load(open(os.path.join(SM, '_downloads.json')))}

# Symbol / Wingdings private-use code points seen in these PDFs -> plain text
PUA = {0xF02A: '*', 0xF03D: '=', 0xF044: 'Δ', 0xF051: '', 0xF05B: '[', 0xF05C: '∴', 0xF05D: ']',
       0xF06C: '-', 0xF06E: '-', 0xF06F: '-', 0xF071: '-', 0xF072: '-', 0xF0A7: '-', 0xF0A8: '-', 0xF0B7: '-',
       0xF0D8: '-', 0xF0FC: '-', 0xF0B4: '×', 0xF0B8: '÷',
       0xF0E6: '(', 0xF0E7: '', 0xF0E8: '', 0xF0E9: '[', 0xF0EA: '', 0xF0EB: '',
       0xF0F6: ')', 0xF0F7: '', 0xF0F8: '', 0xF0F9: ']', 0xF0FA: '', 0xF0FB: '',
       0xF8EB: '(', 0xF8EC: '', 0xF8ED: '', 0xF8EE: '[', 0xF8EF: '', 0xF8F0: '',
       0xF8F6: ')', 0xF8F7: '', 0xF8F8: '', 0xF8F9: ']', 0xF8FA: '', 0xF8FB: ''}
LIG = {'ﬀ': 'ff', 'ﬁ': 'fi', 'ﬂ': 'fl', 'ﬃ': 'ffi', 'ﬄ': 'ffl', 'ﬅ': 'st', 'ﬆ': 'st',
       ' ': ' ', '­': '', '​': '', '‐': '-', '‑': '-', '﻿': ''}
TRANS = {**PUA, **{ord(k): v for k, v in LIG.items()}}
FOOTER = re.compile(r'^\s*©\s*The Institute of Chartered Accountants of India\s*$', re.I)
MATH_FONTS = ('CambriaMath', 'MT-Extra', 'EuclidSymbol', 'TimesNewRomanPS-ItalicMT', 'Symbol')
BRACKET_PIECES = set(range(0xF0E6, 0xF0EC)) | set(range(0xF0F6, 0xF0FC)) | set(range(0xF8EB, 0xF8F1)) | set(range(0xF8F6, 0xF8FC))
BULLETS = set('♦•●▪■□◊➢✓·-–') | {chr(c) for c, v in PUA.items() if v == '-'}
NUM = re.compile(r'^(\d{1,2}(?:\.\d{1,2}){0,3}[A-Z]?)(\.?)\s+(\S.*)$')
UNNUM_HEADS = re.compile(r'^(LEARNING OUTCOMES?|CHAPTER OVERVIEW|SUMMARY|TEST YOUR KNOWLEDGE|MULTIPLE CHOICE QUESTIONS.*|'
                         r'THEORETICAL QUESTIONS|PRACTICAL QUESTIONS|ANSWERS.*|CASE SCENARIOS?.*|UNIT\s*[-–]?\s*[IVX]+.*|'
                         r'ILLUSTRATIONS?|ANNEXURE.*|APPENDIX.*|CASE STUDY.*|CASE STUDIES|QUESTIONS)$', re.I)


def slug(s, n=60):
    s = re.sub(r'[^a-z0-9]+', '-', s.lower().replace('&', 'and')).strip('-')
    return s[:n].rstrip('-')


def clean_line(line):
    line = line.translate(TRANS)
    # ICAI sets the rupee sign in a 'Rupee' font whose glyph is the backtick; one real opening quote exists
    line = re.sub(r"`(?=[A-Z][A-Za-z]+[^`’']{0,60}’)", '‘', line)
    line = line.replace('`', '₹')
    line = re.sub(r'^(\s*)Checkbox\s+(?=\S)', r'\1', line)   # icon alt-text that poppler emits before some P5 box titles
    return line.rstrip()


def norm_head(s):
    s = re.sub(r'\b\d{1,2}\.\d{1,3}\b', ' ', s)
    s = re.sub(r'(?<!\S)[a-z](?!\S)', ' ', s)        # stray single letters ('a') ICAI leaves in running heads
    s = re.sub(r'[^A-Za-z&:,()\- ]', ' ', s)
    return re.sub(r'\s+', ' ', s).strip().upper()


def layout_pages(pdf):
    out = subprocess.run(['pdftotext', '-layout', '-enc', 'UTF-8', pdf, '-'], capture_output=True, text=True, check=True).stdout
    pages = out.split('\f')
    if pages and not pages[-1].strip():
        pages = pages[:-1]
    return pages


def learn_headers(pages, known):
    cnt = collections.Counter()
    for p in pages:
        first = [l for l in p.splitlines() if l.strip()][:2]
        for l in first:
            h = norm_head(l)
            if len(h) >= 5:
                cnt[h] += 1
    n = max(1, len(pages))
    heads = {h for h, c in cnt.items() if c >= max(2, 0.15 * n)}
    heads |= {norm_head(k) for k in known}
    return heads


def clean_page(raw, heads, chno):
    lines = [clean_line(l) for l in raw.splitlines()]
    lines = [l for l in lines if not FOOTER.match(l)]
    label = None
    lab_re = re.compile(r'(?<![\d.])(%s\.\d{1,3})(?![\d])' % chno) if chno else None
    # running head: inspect first 4 non-empty lines
    idx = [i for i, l in enumerate(lines) if l.strip()][:4]
    drop = set()
    tok = r'(\d{1,2}\.\d{1,3}\.?|[a-z]|x{0,3}(?:ix|iv|v?i{0,3}))'
    junk = re.compile(r'^%s(\s+%s)*$' % (tok, tok))
    for i in idx:
        l = lines[i]
        h = norm_head(l)
        labs = lab_re.findall(l) if lab_re else []
        if h in heads or junk.match(l.strip()):
            if labs and label is None:
                label = labs[0]
            drop.add(i)
            continue
        break
    lines = [l for i, l in enumerate(lines) if i not in drop]
    # dedent
    ne = [l for l in lines if l.strip()]
    if ne:
        ind = min(len(l) - len(l.lstrip(' ')) for l in ne)
        lines = [l[ind:] if len(l) >= ind else l.lstrip() for l in lines]
    txt = '\n'.join(lines).strip('\n')
    txt = re.sub(r'\n{3,}', '\n\n', txt)
    return txt, label


def page_info(page):
    """headings + formula flag from PyMuPDF spans"""
    heads = []
    formula = False
    d = page.get_text('dict')
    for b in d['blocks']:
        for l in b.get('lines', []):
            for s in l['spans']:
                if s['font'].startswith(MATH_FONTS) and any(not c.isspace() and c not in BULLETS for c in s['text']):
                    formula = True
                if any(ord(c) in BRACKET_PIECES for c in s['text']):
                    formula = True
    L = page_lines(page)
    i = 0
    while i < len(L):
        ln = L[i]
        t = ln['text'].translate(TRANS).strip()
        t = re.sub(r'^(\d{1,2}(?:\.\d{1,2}){1,3}\.?)(?=[A-Z][a-z]|[A-Z]{2})', r'\1 ', t)   # '4.4.4General' -> '4.4.4 General'
        big = ln['size'] >= 11.9 and ln['bold'] and ln['size'] < 20
        black = any('Black' in f for f in ln['fonts'])
        m = NUM.match(t)
        if big and m and (black or ln['size'] >= 13.5 or m.group(1).count('.') >= 1):
            # merge wrapped continuation lines of the same style
            j = i + 1
            while j < len(L) and L[j]['bold'] and abs(L[j]['size'] - ln['size']) < 0.6 and \
                    0 < L[j]['base'] - L[j - 1]['base'] < ln['size'] * 1.7 and not NUM.match(L[j]['text']) and \
                    L[j]['x0'] >= ln['x0'] - 4 and len(L[j]['text']) < 90:
                t += ' ' + L[j]['text'].translate(TRANS).strip()
                j += 1
            heads.append({'h': re.sub(r'\s+', ' ', t), 'num': m.group(1), 'size': ln['size'], 'numbered': True})
            i = j
            continue
        if big and ln['size'] >= 13.5 and UNNUM_HEADS.match(t):
            heads.append({'h': t, 'num': None, 'size': ln['size'], 'numbered': False})
        i += 1
    return heads, formula


def level(h, top_size):
    if not h['numbered']:
        return 1
    if h['size'] >= top_size - 0.6:
        return 1
    if h['size'] >= 13.5:
        return 2
    return 3


def extract_doc(paper, pdfname, chno, title, out_txt, meta_lines):
    pdfpath = os.path.join(SM, paper, 'pdf', pdfname)
    doc = pymupdf.open(pdfpath)
    raw = layout_pages(pdfpath)
    if len(raw) != doc.page_count:
        raise SystemExit('page count mismatch %s %d vs %d' % (pdfpath, len(raw), doc.page_count))
    heads_known = PAPERS[paper]['headers'] + [title.upper(), title.upper().replace(' - ', ' – ')]
    heads = learn_headers(raw, heads_known)
    pages_out, labels, all_heads, formula_pages, empty_pages = [], [], [], [], []
    for i, rp in enumerate(raw):
        txt, lab = clean_page(rp, heads, chno)
        labels.append(lab)
        hs, formula = page_info(doc[i])
        for h in hs:
            h['page'] = i + 1
        all_heads.extend(hs)
        if formula:
            formula_pages.append(i + 1)
        if len(txt.strip()) < 40:
            empty_pages.append(i + 1)
        pages_out.append(txt)
    # printed labels: pages are consecutive, so take the most common (label - index) offset; running heads sometimes
    # glue two copies of the label together ('3.113.11'), so parsed labels are only votes
    label_conflicts = []
    if chno:
        votes = collections.Counter()
        for i, lab in enumerate(labels):
            if lab:
                votes[int(lab.split('.')[1]) - i] += 1
        off = votes.most_common(1)[0][0] if votes else 1
        fixed = ['%s.%d' % (chno, i + off) for i in range(len(labels))]
        for i, lab in enumerate(labels):
            if lab and lab != fixed[i] and not lab.startswith(fixed[i]):
                label_conflicts.append((i + 1, lab, fixed[i]))
        labels = fixed
    sizes = [h['size'] for h in all_heads if h['numbered']]
    top = max(collections.Counter(round(s) for s in sizes if s >= 14.5).keys(), default=16) if sizes else 16
    for h in all_heads:
        h['level'] = level(h, top)
        h['printed'] = labels[h['page'] - 1]
    with open(out_txt, 'w', encoding='utf-8') as f:
        for m in meta_lines:
            f.write('# ' + m + '\n')
        f.write('\n')
        for i, t in enumerate(pages_out):
            lab = labels[i]
            f.write('=== p.%d%s ===\n' % (i + 1, ' [%s]' % lab if lab else ''))
            f.write(t + '\n\n')
    return {'pages': [1, doc.page_count], 'printed': [labels[0], labels[-1]] if chno else None, 'labels': labels,
            'headings': all_heads, 'formula_pages': formula_pages, 'low_text_pages': empty_pages,
            'running_heads': sorted(heads), 'label_conflicts': label_conflicts}


def meta(paper, pdfname, what):
    rel = os.path.join(paper, 'pdf', pdfname)
    r = DL.get(rel, {})
    return ['ICAI Board of Studies - Intermediate (New Scheme) Study Material - ' + PAPERS[paper]['title'],
            what,
            'Edition: July 2024, Reprint August 2025 (cover: "Relevant for May 2026 Examination"); ICAI lists this edition as applicable for January 2027',
            'Source: %s  (local ../pdf/%s, sha256 %s)' % (r.get('url', '?'), pdfname, r.get('sha256', '?')[:16]),
            'Page markers "=== p.N [X.Y] ===": N = page number inside the PDF file above, X.Y = ICAI printed page number',
            'Text: poppler pdftotext -layout (columns of tables kept), symbol-font bullets -> "-", Rupee-font backtick -> ₹, running heads/footers removed. Equations from MathType objects are not reliable as text: see formula_pages in toc.json and render the PDF page']


def run(paper):
    P = PAPERS[paper]
    txtdir = os.path.join(SM, paper, 'txt')
    os.makedirs(txtdir, exist_ok=True)
    toc, log = [], {}
    for name, label, pdfname in P['extra']:
        out = os.path.join(txtdir, name + '.txt')
        r = extract_doc(paper, pdfname, None, label, out, meta(paper, pdfname, label))
        log[name] = {k: r[k] for k in ('pages', 'low_text_pages')}
    for ch in P['chapters']:
        chno, title, src, module = ch
        base = '%02d-%s' % (chno, slug(title))
        if isinstance(src, list):
            units, heads_all, combined = [], [], []
            for u, utitle, updf in src:
                out = os.path.join(txtdir, '%s-u%d.txt' % (base, u))
                r = extract_doc(paper, updf, chno, title, out,
                                meta(paper, updf, 'Chapter %d: %s - Unit %s: %s' % (chno, title, ['I', 'II', 'III', 'IV', 'V', 'VI'][u - 1], utitle)))
                units.append({'u': u, 'title': utitle, 'pdf': 'pdf/' + updf, 'pages': r['pages'], 'printed': r['printed'],
                              'txt': 'txt/' + os.path.basename(out),
                              'headings': [h['h'] for h in r['headings']],
                              'headings_detail': [{k: h[k] for k in ('h', 'level', 'page', 'printed', 'numbered')} for h in r['headings']],
                              'formula_pages': r['formula_pages']})
                heads_all += [h['h'] for h in r['headings']]
                combined.append(open(out, encoding='utf-8').read())
                log[base + '-u%d' % u] = r
            comb = os.path.join(txtdir, base + '.txt')
            with open(comb, 'w', encoding='utf-8') as f:
                f.write('# Combined file: units I-%s of Chapter %d (each unit is a separate ICAI PDF; page markers restart per unit).\n\n'
                        % (['I', 'II', 'III', 'IV', 'V', 'VI'][len(units) - 1], chno))
                f.write('\n'.join(combined))
            toc.append({'ch': chno, 'title': title, 'module': module, 'pdf': None, 'pages': None,
                        'printed': [units[0]['printed'][0], units[-1]['printed'][1]], 'txt': 'txt/' + base + '.txt',
                        'units': units, 'headings': heads_all,
                        'note': 'Chapter is published as one PDF per unit; pages/txt are per unit (txt here = all units concatenated).'})
        else:
            out = os.path.join(txtdir, base + '.txt')
            r = extract_doc(paper, src, chno, title, out, meta(paper, src, 'Chapter %d: %s' % (chno, title)))
            toc.append({'ch': chno, 'title': title, 'module': module, 'pdf': 'pdf/' + src, 'pages': r['pages'], 'printed': r['printed'],
                        'txt': 'txt/' + base + '.txt', 'units': [],
                        'headings': [h['h'] for h in r['headings']],
                        'headings_detail': [{k: h[k] for k in ('h', 'level', 'page', 'printed', 'numbered')} for h in r['headings']],
                        'formula_pages': r['formula_pages']})
            log[base] = r
    extra = [{'name': n, 'title': t, 'pdf': 'pdf/' + p, 'txt': 'txt/%s.txt' % n} for n, t, p in P['extra']]
    with open(os.path.join(SM, paper, 'toc.json'), 'w', encoding='utf-8') as f:
        json.dump(toc, f, indent=1, ensure_ascii=False)
    with open(os.path.join(SM, paper, '_extract_log.json'), 'w', encoding='utf-8') as f:
        json.dump({'extra_files': extra, 'docs': log}, f, indent=1, ensure_ascii=False)
    print(paper, 'chapters', len(toc), 'headings', sum(len(c['headings']) for c in toc))


if __name__ == '__main__':
    for p in sys.argv[1:]:
        run(p)
