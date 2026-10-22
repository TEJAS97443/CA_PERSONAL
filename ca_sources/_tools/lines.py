"""Group PDF spans into visual lines (same baseline), across blocks. Returns list of dicts per page."""
import re

def page_lines(page, ytol=2.5):
    d = page.get_text('dict')
    spans = []
    for b in d['blocks']:
        for l in b.get('lines', []):
            for s in l['spans']:
                if not s['text'].strip():
                    continue
                x0, y0, x1, y1 = s['bbox']
                spans.append({'x0': x0, 'x1': x1, 'y0': y0, 'y1': y1, 'base': s['origin'][1], 'text': s['text'],
                              'font': s['font'], 'size': round(s['size'], 1), 'flags': s['flags'], 'color': s['color']})
    spans.sort(key=lambda s: (round(s['base']), s['x0']))
    lines = []
    for s in spans:
        if lines and abs(lines[-1]['base'] - s['base']) <= ytol:
            lines[-1]['spans'].append(s)
        else:
            lines.append({'base': s['base'], 'spans': [s]})
    out = []
    for L in lines:
        sp = sorted(L['spans'], key=lambda s: s['x0'])
        txt = ''
        prev = None
        for s in sp:
            if prev is not None:
                gap = s['x0'] - prev['x1']
                if gap > 1.5 and not txt.endswith(' ') and not s['text'].startswith(' '):
                    txt += ' '
            txt += s['text']
            prev = s
        bold = all(('Bold' in s['font'] or 'Black' in s['font'] or s['flags'] & 16) for s in sp if s['text'].strip())
        size = max(s['size'] for s in sp)
        out.append({'base': L['base'], 'x0': sp[0]['x0'], 'text': re.sub(r'\s+', ' ', txt).strip(), 'bold': bold,
                    'size': size, 'fonts': sorted(set(s['font'] for s in sp)), 'color': sp[0]['color']})
    return out
