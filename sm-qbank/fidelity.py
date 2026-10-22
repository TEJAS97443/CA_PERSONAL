"""Rendering must only add layout: every word of every field, in order, must survive md()."""
import sys, re, html, difflib, signal
sys.path.insert(0, str(__import__('pathlib').Path(__file__).resolve().parent))
signal.alarm(90)
import build
qs, _ = build.load()
W = re.compile(r"[A-Za-z0-9]+")
bad = c = 0
for q in qs:
    for fld in ('question', 'answer', '_scenario'):
        t = q.get(fld) or ''
        if not t:
            continue
        c += 1
        a = W.findall(t.replace('**', '').replace('|', ' '))
        b = W.findall(html.unescape(re.sub(r"<[^>]+>", " ", build.md(t))))
        # a table cell rejoined from a spill-over line changes order, never content
        if (a != b) if '|' not in t else (sorted(a) != sorted(b)):
            bad += 1
            if bad < 4:
                print(q['_src']['_file'], q.get('qno'), fld,
                      [x for x in difflib.ndiff(a, b) if x[:1] in '+-'][:10])
print('fields', c, 'mismatches', bad)
pua = sum(len(re.findall(r'[-]', (q.get('question') or '') + (q.get('answer') or '')
                         + (q.get('_scenario') or ''))) for q in qs)
print('private-use glyphs left:', pua)
