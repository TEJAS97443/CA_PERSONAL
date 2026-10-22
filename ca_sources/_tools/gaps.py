"""Find places where the text layer is missing glyphs: big horizontal gaps between consecutive letters on one visual line
(chars grouped by baseline across PDF blocks)."""
import sys, pymupdf

def visual_lines(page, ytol=2.0):
    chars = []
    for b in page.get_text('rawdict')['blocks']:
        for l in b.get('lines', []):
            for s in l['spans']:
                for c in s['chars']:
                    chars.append((round(c['origin'][1], 1), c['bbox'][0], c, s['size'], s['font']))
    chars.sort(key=lambda t: (t[0], t[1]))
    lines = []
    for t in chars:
        if lines and abs(lines[-1][-1][0] - t[0]) <= ytol:
            lines[-1].append(t)
        else:
            lines.append([t])
    for L in lines:
        L.sort(key=lambda t: t[1])
    return lines

def find_gaps(page, k=0.4):
    res = []
    for L in visual_lines(page):
        txt = ''.join(t[2]['c'] for t in L)
        for (ya, xa, a, sa, fa), (yc, xc, c, sc, fc) in zip(L, L[1:]):
            if not (a['c'].isalpha() and c['c'].isalpha()):
                continue
            gap = c['bbox'][0] - a['bbox'][2]
            if gap > k * max(sa, sc):
                res.append({'before': a['c'], 'after': c['c'], 'gap': round(gap, 1), 'size': sa, 'font': fa,
                            'bbox': [a['bbox'][0] - 40, min(a['bbox'][1], c['bbox'][1]) - 2, c['bbox'][2] + 40, max(a['bbox'][3], c['bbox'][3]) + 2],
                            'line': txt})
    return res

if __name__ == '__main__':
    tot = 0
    for f in sys.argv[1:]:
        d = pymupdf.open(f)
        n = 0
        for p in d:
            for x in find_gaps(p):
                n += 1
                if n <= 6:
                    print('   ', f, p.number + 1, x['gap'], x['size'], x['font'], repr(x['line'][:90]))
        tot += n
        print(f, n)
    print('TOTAL', tot)
