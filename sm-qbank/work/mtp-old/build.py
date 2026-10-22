#!/usr/bin/env python3
"""Build draft question records from cleaned SM sections of ICAI old-scheme MTP Paper 7B."""
import re, os, sys, json, glob
sys.path.insert(0,'/Users/ztejas/CA_PERSONAL/sm-qbank/work/mtp-old')
from parse import (parse, split_top, split_sub, preclean, norm, strip_marks,
                   fix_artefacts, GLYPHSPLIT)

ROMAN = ['i','ii','iii','iv','v','vi','vii','viii','ix','x','xi','xii','xiii','xiv','xv',
         'xvi','xvii','xviii','xix','xx']

# ---------- table -> markdown -----------------------------------------------
def _gaps(l):
    return [(m.start()+1, m.end()-1) for m in re.finditer(r'\S {3,}\S', l)]

def to_md_tables(block):
    lines = block.split('\n')
    G = [(_gaps(l) if l.strip() else None) for l in lines]
    out=[]; i=0
    while i < len(lines):
        if not G[i]:
            out.append(lines[i]); i+=1; continue
        j=i
        while j < len(lines) and G[j]: j+=1
        region = list(range(i,j))
        md = _region_to_md(lines, G, region)
        if md is None: out.extend(lines[i:j])
        else: out.extend(md)
        i=j
    return '\n'.join(out)

def _region_to_md(lines, G, region):
    if len(region) < 3: return None
    width = max(len(lines[k]) for k in region)
    cover = {}
    for k in region:
        for a,b in G[k]:
            for c in range(a,b+1): cover[c]=cover.get(c,0)+1
    lo, hi = int(width*0.18), int(width*0.82)
    inrange = {c:v for c,v in cover.items() if lo <= c <= hi}
    if not inrange: return None
    split = max(inrange, key=lambda c: (inrange[c], -abs(c-width//2)))
    if inrange[split] < 0.75*len(region): return None
    rows=[]
    for k in region:
        l = lines[k]
        hit = [g for g in G[k] if g[0] <= split <= g[1]]
        if hit:
            g = hit[0]
            rows.append((l[:g[0]].strip(), l[g[1]:].strip()))
        else:
            near = min(G[k], key=lambda g: min(abs(g[0]-split), abs(g[1]-split)))
            if min(abs(near[0]-split), abs(near[1]-split)) <= 8:
                rows.append((l[:near[0]].strip(), l[near[1]:].strip()))
            else:
                rows.append((l.strip(), ''))
    merged=[]
    for left,right in rows:
        lead = left or right
        new_row = (not merged) or bool(lead and (lead[0].isupper() or lead[0].isdigit()
                   or lead[0] in '\u2022-\u2013\u25cf*\u25aa'))
        if new_row: merged.append([left,right])
        else:
            if left:  merged[-1][0]=(merged[-1][0]+' '+left).strip()
            if right: merged[-1][1]=(merged[-1][1]+' '+right).strip()
    if len(merged) < 2: return None
    def esc(s): return re.sub(r'\s{2,}',' ',s).replace('|','\\|').strip()
    out=[f'| {esc(merged[0][0])} | {esc(merged[0][1])} |', '| --- | --- |']
    for r in merged[1:]:
        out.append(f'| {esc(r[0])} | {esc(r[1])} |')
    return out

ORPHAN=re.compile(r'\(?\s*\d+(?:\s*[x×X+]\s*\d+)*\s*=?\s*\d*\s*Marks?\.?\s*\)?\s*$',re.I)

def tidy(block, table=True):
    if table: block = to_md_tables(block)
    t, marks = strip_marks(norm(block))
    t = fix_artefacts(t)
    m = ORPHAN.search(t)
    if m and re.search(r'Marks?', m.group(0), re.I):
        t = t[:m.start()].rstrip()
        if marks is None:
            d=re.findall(r'(\d+)', m.group(0))
            if d: marks=int(d[-1])
    return t.strip(), marks

def tidy_ans(block):
    md = to_md_tables(block)
    lines=[]
    for l in md.split('\n'):
        s=re.sub(r'[ \t]+',' ',l).strip()
        lines.append(s)
    t=re.sub(r'\n{2,}','\n\n','\n'.join(lines)).strip()
    t=re.sub(GLYPHSPLIT, r'\1', t)
    t=re.sub(r'(?<=[a-zA-Z]) -(?=[a-z])','-',t)
    t=re.sub(r'(?<=[a-zA-Z])- (?=[a-z]{2,})','-',t)
    return t.strip()

# ---------- MCQ parsing ------------------------------------------------------
OPT = re.compile(r'^([ \t]*)(?:\(([a-dA-D])\)|([a-dA-D])\.)[ \t]+(?=\S)', re.M)

def grab_options(txt):
    """Split trailing (a)-(d)/a.-d. options off a stem."""
    """Return (stem, [{'label','text'}]) splitting trailing (a)-(d) / a.-d. options."""
    cands=[((m.group(2) or m.group(3)).lower(), m.start(), m.end(), len(m.group(1)))
           for m in OPT.finditer(txt)]
    seq=[]; expect='a'
    for c in cands:
        if c[0]==expect:
            seq.append(c); expect=chr(ord(expect)+1)
        if expect>'d': break
    if len(seq)<2: return txt.strip(), None
    stem=txt[:seq[0][1]]
    opts=[]
    for i,c in enumerate(seq):
        end = seq[i+1][1] if i+1<len(seq) else len(txt)
        o,_=tidy(txt[c[2]:end])
        opts.append({'label':c[0],'text':o})
    return stem, opts

def parse_mcq_block(block):
    """Parse a Q1-style MCQ block -> list of item dicts."""
    out=[]
    labs=[(m.group(2), m.start(), m.end(), len(m.group(1)))
          for m in re.finditer(r'^([ \t]*)\(([A-Za-z]+)\)(?:[ \t]+|[ \t]*$)', block, re.M)]
    if not labs: return []
    # --- Type 1: flat roman list (i)...(xv) ---
    rseq=[]; ri=0
    for l in labs:
        if ri<len(ROMAN) and l[0].lower()==ROMAN[ri]:
            rseq.append(l); ri+=1
    _up=[l for l in labs if len(l[0])==1 and l[0].isupper()]
    _hasAB=False
    _e='A'
    for l in _up:
        if l[0]==_e: _e=chr(ord(_e)+1)
    _hasAB = _e >= 'C'
    if len(rseq)>=5 and not _hasAB:
        for i,c in enumerate(rseq):
            e = rseq[i+1][1] if i+1<len(rseq) else len(block)
            ls=block.rfind('\n',0,c[1])+1
            body=' '*(c[2]-ls)+block[c[2]:e]
            stem,opts=grab_options(body)
            st,_=tidy(stem); _,mk=tidy(body)
            out.append({'label':'('+c[0].lower()+')','stem':st,'options':opts,'marks':mk,
                        'scenario':None,'kind':'mcq'})
        return out
    # --- Type 2: lettered sub-parts (A)...(I) ---
    lseq=None
    up=[l for l in labs if len(l[0])==1 and l[0].isupper()]
    s=[]; expect='A'
    for l in up:
        if l[0]==expect: s.append(l); expect=chr(ord(expect)+1)
    if len(s)>=2: lseq=s
    if lseq is None:
        ind0=labs[0][3]
        pool=[l for l in labs if abs(l[3]-ind0)<=2 and len(l[0])==1]
        for first in ('A','a'):
            s=[]; expect=first
            for l in pool:
                if l[0]==expect: s.append(l); expect=chr(ord(expect)+1)
            if s: lseq=s; break
    if not lseq: return []
    for i,c in enumerate(lseq):
        e = lseq[i+1][1] if i+1<len(lseq) else len(block)
        ls = block.rfind('\n',0,c[1])+1
        body=' '*(c[2]-ls)+block[c[2]:e]
        cands=[]
        for style,rx in (('num_dot', r'^([ \t]{4,})(\d{1,2})\.[ \t]+(?=\S)'),
                         ('num_par', r'^([ \t]{4,})\((\d{1,2})\)[ \t]+(?=\S)'),
                         ('rom_par', r'^([ \t]{4,})\(([ivxIVX]{1,5})\)[ \t]+(?=\S)'),
                         ('rom_dot', r'^([ \t]{4,})([ivxIVX]{1,5})\.[ \t]+(?=\S)')):
            hits=[(len(m.group(1)), m.group(2).lower(), m.start(), m.end())
                  for m in re.finditer(rx, body, re.M)]
            order = ROMAN if style.startswith('rom') else [str(k) for k in range(1,31)]
            seq=[]; k=0
            for ind,lab,s_,e_ in hits:
                if k<len(order) and lab==order[k]:
                    seq.append((lab,s_,e_)); k+=1
            if len(seq)<2: continue
            withopt=0
            for j,n in enumerate(seq):
                ne = seq[j+1][1] if j+1<len(seq) else len(body)
                _,o = grab_options(body[n[2]:ne])
                if o and len(o)>=3: withopt+=1
            cands.append((-withopt, -len(seq), seq))
        cands=[c for c in cands if -c[0] >= max(2, int(0.6*-c[1]))]
        nseq = sorted(cands, key=lambda x:(x[0],x[1]))[0][2] if cands else []
        if len(nseq)>=2:
            sc,_=tidy(body[:nseq[0][1]])
            for k,n in enumerate(nseq):
                ne = nseq[k+1][1] if k+1<len(nseq) else len(body)
                ls2=body.rfind('\n',0,n[1])+1
                raw=' '*(n[2]-ls2)+body[n[2]:ne]
                stem,opts=grab_options(raw)
                st,_=tidy(stem); _,mk=tidy(raw)
                out.append({'label':f'({c[0].upper()}){n[0]}','stem':st,'options':opts,
                            'marks':mk,'scenario':sc if k==0 else '','kind':'case-mcq'})
        else:
            stem,opts=grab_options(body)
            st,_=tidy(stem); _,mk=tidy(body)
            out.append({'label':'('+c[0].upper()+')','stem':st,'options':opts,'marks':mk,
                        'scenario':None,'kind':'mcq' if opts else 'descriptive'})
    return out

def parse_answer_key(block):
    """Return ({index->letter} for numbered/roman grid, {LETTER->letter})."""
    grid={}; letters={}
    lines=[l for l in block.split('\n')]
    for i,l in enumerate(lines):
        heads=re.findall(r'\((\d+|[ivxIVX]+)\)', l)
        if len(heads)>=3 and i+1<len(lines):
            vals=re.findall(r'\(([a-d])\)|(?<![a-zA-Z])([a-d])(?![a-zA-Z])', lines[i+1])
            vals=[a or b for a,b in vals]
            if len(vals)>=len(heads):
                for h,v in zip(heads,vals): grid[h.lower()]=v
    for m in re.finditer(r'^[ \t]*\(([A-Za-z]+)\)[ \t]+\(([a-d])\)[ \t]*$', block, re.M):
        letters[m.group(1).upper()]=m.group(2)
    for m in re.finditer(r'^[ \t]*\(([A-Za-z]+)\)[ \t]*\n[ \t]*\(([a-d])\)[ \t]*$', block, re.M):
        letters.setdefault(m.group(1).upper(), m.group(2))
    return grid, letters

# ---------- driver -----------------------------------------------------------
ATTEMPTS = {
 'may2018':('May 2018','2018-05'), 'nov2018':('Nov 2018','2018-11'),
 'may2019':('May 2019','2019-05'), 'nov2019':('Nov 2019','2019-11'),
 'may2020':('May 2020','2020-05'), 'nov2020':('Nov 2020','2020-11'),
 'jan2021':('Jan 2021','2021-01'), 'july2021':('July 2021','2021-07'),
 'dec2021':('Dec 2021','2021-12'), 'may2022':('May 2022','2022-05'),
 'nov2022':('Nov 2022','2022-11'), 'may2023':('May 2023','2023-05'),
 'nov2023':('Nov 2023','2023-11'),
}

PATCH={}
_pp='/Users/ztejas/CA_PERSONAL/sm-qbank/work/mtp-old/may2023-s2-answers.json'
if os.path.exists(_pp):
    import json as _j; PATCH['may2023-s2']=_j.load(open(_pp))

def build(slug):
    """slug e.g. 'may2023-s1'"""
    base=f'sm/mtp-old-{slug}'
    qt=open(base+'-q.sm.txt',encoding='utf-8').read()
    ap=base+'-a.sm.txt'
    at=open(ap,encoding='utf-8').read() if os.path.exists(ap) and os.path.getsize(ap)>200 else ''
    qblocks={str(k):v for k,v in split_top(preclean(qt))}
    ablocks={str(k):v for k,v in split_top(preclean(at))} if at else {}
    recs=[]
    attempt=slug.split('-')[0]; series='I' if slug.endswith('s1') else 'II'
    pid=f'mtp-old-{slug}'
    for n in sorted(qblocks, key=lambda x:int(x)):
        qb=qblocks[n]; ab=ablocks.get(n,'')
        mcqs=parse_mcq_block(qb) if n=='1' else []
        if mcqs and any(m['options'] for m in mcqs):
            grid,letters=parse_answer_key(ab) if ab else ({},{})
            for m in mcqs:
                lab=m['label']
                ans=None
                if m['kind']=='case-mcq':
                    num=lab.split(')')[1]
                    ans=grid.get(num)
                else:
                    key=lab.strip('()')
                    ans=letters.get(key.upper()) or grid.get(key.lower())
                q=re.sub(r'\s*\n\s*',' ',m['stem']).strip()
                if m['scenario']: q=m['scenario']+'\n\n'+q
                elif m['scenario']=='': q='[Refer to the case scenario given in Question 1'+(
                    '(%s)'%lab[1] if len(lab)>2 else '')+'.]\n\n'+q
                recs.append({'qno':f'1{lab}','kind':m['kind'],'marks':m['marks'],
                             'question':q,'options':m['options'],'answer':'',
                             'mcq_answer':ans,
                             '_stem':re.sub(r'\s*\n\s*',' ',m['stem']).strip()})
            continue
        subs=split_sub(qb); asubs=dict(split_sub(ab)) if ab else {}
        stem=''
        for l,t in subs:
            qtx,mk=tidy(t)
            if l is None:
                if len(subs)>1: stem=qtx; continue
            at_=asubs.get(l,'') if asubs else ''
            if not at_ and l is None and ab: at_=ab
            atx=tidy_ans(at_) if at_ else ''
            full=(stem+'\n'+qtx).strip() if stem else qtx
            recs.append({'qno':f'{n}({l})' if l else str(n),'kind':'descriptive','marks':mk,
                         'question':full,'options':None,'answer':atx,'mcq_answer':None,
                         '_stem':full})
    p=PATCH.get(slug)
    if p:
        for r in recs:
            if r['kind'] in ('mcq','case-mcq') and not r['mcq_answer']:
                key=r['qno'].replace('1(','').replace(')','')
                k=key[-1] if key[-1].isdigit() else key
                if r['kind']=='case-mcq': k=r['qno'].split(')')[-1]
                r['mcq_answer']=p['mcq'].get(k)
            elif r['kind']=='descriptive' and not r['answer']:
                r['answer']=p['answers'].get(r['qno'],'')
    for i,r in enumerate(recs,1):
        r['id']=f'{pid}-q{i}'
    return recs

if __name__=='__main__':
    for slug in sys.argv[1:]:
        rs=build(slug)
        print('#'*20, slug, len(rs),'records')
        for r in rs:
            print(f"  {r['id']:22s} {r['qno']:8s} {r['kind']:11s} m={str(r['marks']):4s} "
                  f"mcq={r['mcq_answer']} q={len(r['question']):5d} a={len(r['answer']):5d}")
