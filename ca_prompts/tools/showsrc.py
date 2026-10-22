#!/usr/bin/env python3
"""Print the ICAI/SM source text a flagged block matched:  python3 -I ~/CA_PERSONAL/ca_prompts/tools/showsrc.py <source> <offset>
(source and offset as in similar-<paper>.json). Prints ~400 words starting at that token offset."""
import os, re, sys
HOME = os.path.expanduser('~')
src, off = sys.argv[1], int(sys.argv[2])
if src.startswith('sm-tyk/'):
    path = os.path.join(HOME, 'CA_PERSONAL/ca_sources/sm', src[len('sm-tyk/'):])
    txt = open(path, errors='ignore').read(); k = txt.upper().find('TEST YOUR KNOWLEDGE'); txt = txt[k:]
else:
    path = os.path.join(HOME, 'CA_PERSONAL/ca_sources/q', src); txt = open(path, errors='ignore').read()
W = re.compile(r"[A-Za-z]+|\d[\d,\.]*")
spans = [m.span() for m in W.finditer(txt)]
a = spans[min(off, len(spans)-1)][0]; b = spans[min(off+400, len(spans)-1)][1]
print(path); print(txt[a:b])
