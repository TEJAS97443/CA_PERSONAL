"""Post-process extracted txt files (idempotent):
 - apply text_fixes.json (broken words / missing glyphs verified against page image + OCR)
 - append Apple-Vision OCR of figure/image text that is not in the PDF text layer (pages listed in
   <paper>/_ocr_supplement.json), rendered as a layout block, between [OCR-SUPPLEMENT ...] and [/OCR-SUPPLEMENT]
 - record ocr_supplement_pages / text_fixes in toc.json; rebuild combined unit files

usage: python -I apply_ocr.py <paper> ...
"""
import json, os, re, statistics, sys

import pymupdf

HOME = os.path.expanduser('~')
SM = os.path.join(HOME, 'CA_PERSONAL/ca_sources', 'sm')
FIXES = json.load(open(os.path.join(HOME, 'CA_PERSONAL/ca_sources', '_tools', 'text_fixes.json')))
OPEN = '[OCR-SUPPLEMENT'
CLOSE = '[/OCR-SUPPLEMENT]'
MARK = re.compile(r'^=== p\.(\d+)(?: \[[^\]]+\])? ===$')


def split_pages(text):
    head, pages, order, cur = [], {}, [], None
    for line in text.split('\n'):
        m = MARK.match(line.strip())
        if m:
            cur = int(m.group(1)); pages[cur] = [line]; order.append(cur)
        elif cur is None:
            head.append(line)
        else:
            pages[cur].append(line)
    return head, pages, order


def strip_ocr(lines):
    out, skip = [], False
    for l in lines:
        if l.startswith(OPEN):
            skip = True; continue
        if l.startswith(CLOSE):
            skip = False; continue
        if not skip:
            out.append(l)
    while len(out) > 1 and not out[-1].strip():
        out.pop()
    return out


def layout(rows, page_w_px):
    if not rows:
        return []
    cw = statistics.median([r[4] / max(1, len(r[0])) for r in rows]) or 8
    rows = sorted(rows, key=lambda r: (r[3] + r[5] / 2, r[2]))
    lines = []
    for r in rows:
        yc = r[3] + r[5] / 2
        if lines and abs(lines[-1]['y'] - yc) < 0.55 * max(r[5], lines[-1]['h']):
            lines[-1]['rows'].append(r)
        else:
            lines.append({'y': yc, 'h': r[5], 'rows': [r]})
    x0 = min(r[2] for r in rows)
    out = []
    for L in lines:
        s = ''
        for r in sorted(L['rows'], key=lambda r: r[2]):
            col = int((r[2] - x0) / cw)
            if len(s) > 0:
                col = max(col, len(s) + 2)
            s = s.ljust(col) + r[0]
        out.append(s.rstrip())
    return out


def groups(absent_rows, all_rows):
    """y-ranges around runs of OCR rows whose words are not in the text layer -> all OCR rows in those ranges"""
    ab = sorted([r for r in all_rows if r[0] in set(absent_rows)], key=lambda r: r[3])
    if not ab:
        return []
    hmed = statistics.median([r[5] for r in all_rows]) or 20
    gs, cur = [], [ab[0]]
    for r in ab[1:]:
        if r[3] - (cur[-1][3] + cur[-1][5]) > 3.0 * hmed:
            gs.append(cur); cur = [r]
        else:
            cur.append(r)
    gs.append(cur)
    out = []
    for g in gs:
        y0 = min(r[3] for r in g) - 0.4 * hmed
        y1 = max(r[3] + r[5] for r in g) + 0.4 * hmed
        out.append([r for r in all_rows if y0 <= r[3] + r[5] / 2 <= y1])
    return out


def run(paper):
    tocp = os.path.join(SM, paper, 'toc.json')
    toc = json.load(open(tocp))
    qa = {(r['pdf'], r['page']): r for r in json.load(open(os.path.join(SM, paper, '_ocr_qa.json')))}
    supp = json.load(open(os.path.join(SM, paper, '_ocr_supplement.json')))
    fixes = [f for f in FIXES if f['paper'] == paper]
    targets = []
    for c in toc:
        for t in (c['units'] or [c]):
            targets.append((c, t))
    n_fix = n_supp = 0
    for c, t in targets:
        path = os.path.join(SM, paper, t['txt'])
        head, pages, order = split_pages(open(path, encoding='utf-8').read())
        pdfrel = os.path.join(paper, t['pdf'])
        doc = pymupdf.open(os.path.join(SM, pdfrel))
        t['text_fixes'] = []
        for f in fixes:
            if f['txt'] == t['txt'] and f['page'] in pages:
                blk = '\n'.join(pages[f['page']])
                if f['old'] in blk:
                    pages[f['page']] = blk.replace(f['old'], f['new']).split('\n')
                    t['text_fixes'].append({'page': f['page'], 'old': f['old'], 'new': f['new']})
                    n_fix += 1
                elif f['new'] not in blk:
                    print('  WARN fix not applied', f)
        # headings
        for h in t.get('headings_detail', []):
            for f in t['text_fixes']:
                if h['page'] == f['page']:
                    old_c = re.sub(r'\s+', ' ', f['old'])
                    if old_c in h['h']:
                        h['h'] = h['h'].replace(old_c, f['new'])
        if 'headings_detail' in t:
            t['headings'] = [h['h'] for h in t['headings_detail']]
        t['ocr_supplement_pages'] = []
        for p in order:
            pages[p] = strip_ocr(pages[p])
            sp = supp.get(t['txt'], {}).get(str(p))
            if not sp:
                continue
            r = qa[(pdfrel, p)]
            pw = doc[p - 1].rect.width * 150 / 72
            ph = doc[p - 1].rect.height * 150 / 72
            blocks = []
            for g in groups(sp['lines'], r['rows']):
                y0 = min(x[3] for x in g) / ph * 100
                y1 = max(x[3] + x[5] for x in g) / ph * 100
                blocks.append((y0, y1, layout(g, pw)))
            if not blocks:
                continue
            pages[p].append('')
            for y0, y1, lines in blocks:
                pages[p].append('%s: image/figure text that is NOT in the PDF text layer, read by Apple Vision OCR from the page '
                                'image (figure spans ~%d%%-%d%% of page height); check the rendered PDF page for layout] '
                                % (OPEN, y0, y1))
                pages[p].extend(lines)
                pages[p].append(CLOSE)
            pages[p].append('')
            t['ocr_supplement_pages'].append(p)
            n_supp += 1
        with open(path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(head) + '\n')
            for p in order:
                f.write('\n'.join(pages[p]).rstrip('\n') + '\n\n')
    # rebuild combined files for chapters split into units
    for c in toc:
        if c['units']:
            parts = [open(os.path.join(SM, paper, u['txt']), encoding='utf-8').read() for u in c['units']]
            with open(os.path.join(SM, paper, c['txt']), 'w', encoding='utf-8') as f:
                f.write('# Combined file: units I-%s of Chapter %d (each unit is a separate ICAI PDF; page markers restart per unit).\n\n'
                        % (['I', 'II', 'III', 'IV', 'V', 'VI'][len(c['units']) - 1], c['ch']))
                f.write('\n'.join(parts))
            c['headings'] = [h for u in c['units'] for h in u['headings']]
    json.dump(toc, open(tocp, 'w'), indent=1, ensure_ascii=False)
    print(paper, 'fixes applied', n_fix, 'pages with OCR supplement', n_supp)


if __name__ == '__main__':
    for p in sys.argv[1:]:
        run(p)
