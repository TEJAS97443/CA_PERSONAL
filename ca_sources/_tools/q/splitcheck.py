#!/usr/bin/env python3
"""Report likely split words in .txt files (pdf-mode): adjacent alphabetic tokens a b where a+b is an
English word but a or b alone is not. Usage: python3 -I splitcheck.py GLOB..."""
import collections, glob, os, re, sys
W = set(w.strip().lower() for w in open('/usr/share/dict/words') if w.strip())
def ok(t):
    t = t.lower()
    return t in W or t.rstrip('s') in W or (t.endswith('ed') and t[:-2] in W) or (t.endswith('ing') and t[:-3] in W)
tot = collections.Counter(); ex = {}
for pat in sys.argv[1:]:
    for f in sorted(glob.glob(os.path.expanduser(pat))):
        t = open(f).read()
        c = 0
        for m in re.finditer(r'\b([A-Za-z]{2,})[ ]([a-z]{2,})\b', t):
            a, b = m.group(1), m.group(2)
            if ok(a + b) and (not ok(a) or not ok(b)) and len(a + b) >= 6:
                c += 1; tot[(a + ' ' + b)] += 1
                ex.setdefault(f, []).append(a + ' ' + b)
        if c:
            print(f'{c:4d} {os.path.relpath(f, os.path.expanduser("~/CA_PERSONAL/ca_sources/q"))} e.g. {ex[f][:6]}')
print('TOP', tot.most_common(40))
