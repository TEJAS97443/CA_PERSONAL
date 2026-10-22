#!/usr/bin/env python3
import re,glob,os,sys
BRAND=re.compile(r'castudynotes|canotes|t\.me/|Downloaded From|Join Us on Telegram',re.I)
def clean(t):
    out=[]
    for ln in t.split('\n'):
        s=ln.strip()
        if re.fullmatch(r'©?\s*The Institute of Chartered Accountants of India\.?',s,re.I): continue
        if re.fullmatch(r'\d{1,3}',s): continue
        if BRAND.search(s): continue
        out.append(ln.replace('\f',''))
    return '\n'.join(out)
pat=re.compile(r'^\s*SECTION\s*[–\-—:]*\s*B\s*[:\-–]?\s*(STRATEGIC\s*MANAGEMENT)?\s*$',re.I|re.M)
alt=re.compile(r'SECTION\s*[–\-—:]*\s*B\s*[:\-–]?\s*STRATEGIC\s*MANAGEMENT',re.I)
os.makedirs('sm',exist_ok=True)
for f in sorted(glob.glob('mtp-old-*.pdf.txt')):
    t=open(f,encoding='utf-8',errors='replace').read()
    ms=[m for m in pat.finditer(t)] or [m for m in alt.finditer(t)]
    base=os.path.basename(f).replace('.pdf.txt','')
    if not ms: print(f"{base:28s} NO MARKER (len {len(t)})"); continue
    cand=[m for m in ms if m.start()>len(t)*0.20]
    m=cand[0] if cand else ms[-1]
    sm=clean(t[m.start():])
    open(f'sm/{base}.sm.txt','w').write(sm)
    print(f"{base:28s} @{m.start():6d}/{len(t):6d} SM={len(sm):6d}")
