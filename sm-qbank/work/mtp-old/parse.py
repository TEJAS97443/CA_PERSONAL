#!/usr/bin/env python3
"""Parse ICAI old-scheme MTP Paper 7 Section B (Strategic Management) into structured blocks."""
import re, sys, os

MARKS = re.compile(r'\((?:\d+(?:\s*[x×X+]\s*\d+)+\s*=\s*)?(\d+(?:\.\d+)?)\s*Marks?\.?\)', re.I)
HDR = re.compile(r'^(SECTION|Time Allowed|Maximum Marks|SUGGESTED ANSWER|Question No|Questions? \d+ and|Attempt any|Question \d+ \(Attempt|Question 1|All questions|QUESTIONS$|ANSWERS$|Answers$|PART\s+[IV]+|Answer all|Division|Note:)', re.I)

# ICAI PDF text layers occasionally split a word with a stray space; none of these
# fragments is an English word, so re-joining them is safe and restores the printed wording.
GLYPHSPLIT = re.compile(r'(?<=[a-z][a-z]) (ve|ng|ed|ly|ing|er|tion|ted|ion|nt|rs|es)\b')

def norm(s):
    out=[re.sub(r'[ \t]+',' ',l).strip() for l in s.replace('­','').split('\n')]
    return re.sub(r'\n{2,}','\n\n','\n'.join(out)).strip()

def fix_artefacts(t):
    t = GLYPHSPLIT.sub(r'\1', t)
    t = re.sub(r'(?<=[a-zA-Z]) -(?=[a-z])','-',t)
    t = re.sub(r'(?<=[a-zA-Z])- (?=[a-z]{2,})','-',t)
    t = re.sub(r'[ \t]{2,}',' ',t)
    t = re.sub(r'\s+([,;.])',r'\1',t)
    return t.strip()

def strip_marks(t):
    marks=None
    ms=list(MARKS.finditer(t))
    if ms:
        v=float(ms[-1].group(1)); marks=int(v) if v==int(v) else v
    t = MARKS.sub('', t)
    return re.sub(r'\n{3,}','\n\n',t).strip(), marks

def preclean(sm):
    lines=[]
    for l in sm.split('\n'):
        s=l.strip()
        if not s: lines.append(''); continue
        if HDR.match(s): continue
        lines.append(l)
    return '\n'.join(lines)

def split_top(sm):
    cands=[(int(m.group(2)), len(m.group(1)), m.start(), m.end())
           for m in re.finditer(r'^([ \t]*)(\d{1,2})(?:\.[ \t]*(?=\S|$)|[ \t]{2,}(?=[^\d\s]))', sm, re.M)]
    if not cands: return []
    ones=[c for c in cands if c[0]==1 and c[1]<=8]
    if not ones: return []
    base=ones[0]; ind=base[1]
    seq=[base]; expect=2
    for c in cands:
        if c[2] <= base[2]: continue
        if c[0]==expect and abs(c[1]-ind)<=2:
            seq.append(c); expect+=1
    out=[]
    for i,c in enumerate(seq):
        end = seq[i+1][2] if i+1<len(seq) else len(sm)
        ls = sm.rfind('\n',0,c[2])+1
        out.append((c[0], ' '*(c[3]-ls) + sm[c[3]:end]))
    return out

def split_sub(body):
    """Return list of (letter|None, text). Picks the shallowest consistent (letter) sequence."""
    cands=[(m.group(2), len(m.group(1)), m.start(), m.end())
           for m in re.finditer(r'^([ \t]*)\(([a-zA-Z])\)(?:[ \t]+(?=\S)|[ \t]*$)', body, re.M)]
    if not cands: return [(None, body)]
    def nxt(ch): return chr(ord(ch)+1)
    best=None
    for ind in sorted({c[1] for c in cands}):
        pool=[c for c in cands if abs(c[1]-ind)<=1]
        for case in ('upper','lower'):
            p=[c for c in pool if (c[0].isupper() if case=='upper' else c[0].islower())]
            if not p: continue
            expect='A' if case=='upper' else 'a'
            seq=[]
            for c in p:
                if c[0]==expect:
                    seq.append(c); expect=nxt(expect)
            if seq and (best is None or len(seq)>len(best[1])):
                best=(ind,seq,case)
        if best: break
    if not best: return [(None, body)]
    ind,seq,case=best
    # extend across looser indentation for sub-parts that sit at an odd column
    while True:
        expect=nxt(seq[-1][0]); found=None
        for c in cands:
            if c[2]>seq[-1][2] and c[0]==expect and abs(c[1]-ind)<=8:
                found=c; break
        if not found: break
        seq.append(found)
    parts=[]
    pre=body[:seq[0][2]].strip()
    if len(pre)>=10: parts.append((None,pre))
    for i,c in enumerate(seq):
        end = seq[i+1][2] if i+1<len(seq) else len(body)
        ls = body.rfind('\n',0,c[2])+1
        parts.append((c[0], ' '*(c[3]-ls) + body[c[3]:end]))
    return parts

def parse(path):
    sm=preclean(open(path,encoding='utf-8',errors='replace').read())
    return {str(n): split_sub(b) for n,b in split_top(sm)}

if __name__=='__main__':
    for f in sys.argv[1:]:
        print('#'*25, os.path.basename(f))
        for n,subs in parse(f).items():
            for l,t in subs:
                tt,mk=strip_marks(norm(t))
                lab=f'{n}({l})' if l else n
                print(f'--- Q{lab} marks={mk} len={len(tt)}')
                print('   ', fix_artefacts(tt)[:220].replace('\n',' / '))
