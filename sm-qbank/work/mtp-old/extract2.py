#!/usr/bin/env python3
"""Layout extraction via pdftotext -bbox-layout.
 - exact word coordinates (works on DRM-flagged ICAI PDFs)
 - drops oversized watermark overlays and mirror branding
 - detects two-column tables geometrically and emits markdown pipe tables
"""
import re, subprocess, sys, html, os
BRAND=re.compile(r'castudynotes|canotes|t\.me/|Downloaded\s+From|Join\s+Us\s+on\s+Telegram',re.I)
CHARW = 5.45
STEP  = 1.0

def page_words(pg, max_h):
    out=[]
    for m in re.finditer(r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)</word>',pg,re.S):
        x0,y0,x1,y1=(float(m.group(i)) for i in range(1,5))
        t=html.unescape(m.group(5))
        if not t.strip(): continue
        if y1-y0 > max_h: continue
        if (x1-x0)/max(1,len(t.strip())) > 12.0: continue   # stretched watermark glyphs
        out.append((y0,x0,x1,t))
    return out

def make_lines(words):
    words=sorted(words,key=lambda w:(w[0],w[1]))
    lines=[]
    for w in words:
        if lines and abs(w[0]-lines[-1][0])<=3.0: lines[-1][1].append(w)
        else: lines.append([w[0],[w]])
    for L in lines: L[1].sort(key=lambda w:w[1])
    keep=[]
    for L in lines:
        s=' '.join(w[3] for w in L[1]).strip()
        if BRAND.search(s): continue
        if re.fullmatch(r'©?\s*The Institute of Chartered Accountants of India\.?\s*\d{0,3}',s,re.I): continue
        if re.fullmatch(r'\d{1,3}',s): continue
        keep.append(L)
    return keep

def render(L, indent0=0.0):
    buf=''; pend=None
    for y0,x0,x1,t in L[1]:
        col=int(round((x0-indent0)/CHARW))
        if pend is None: buf=' '*max(0,col)+t
        elif col>len(buf): buf+=' '*(col-len(buf))+t
        elif x0-pend > 0.8: buf+=' '+t
        else: buf+=t
        pend=x1
    return buf.rstrip()

MARKSPAT=re.compile(r'\((?:\d+(?:\s*[x×X+]\s*\d+)*\s*=\s*)?\d+(?:\.\d+)?\s*Marks?\.?\)\s*$',re.I)

def _core_words(L):
    """Words excluding a trailing right-aligned '(n Marks)' annotation."""
    ws=L[1]
    for cut in range(len(ws)-1, max(-1,len(ws)-9), -1):
        tail=' '.join(w[3] for w in ws[cut:])
        if MARKSPAT.search(tail) and cut>0 and ws[cut][1]-ws[cut-1][2] > 6:
            return ws[:cut]
    return ws

def find_tables(lines):
    """Return [(i,j,split_x)] for two-column table regions, detected geometrically."""
    n=len(lines)
    if n<4: return []
    core=[_core_words(L) for L in lines]
    xs=[w[1] for L in lines for w in L[1]]; xe=[w[2] for L in lines for w in L[1]]
    lo,hi=min(xs),max(xe); span=hi-lo
    if span<=0: return []
    cand=[lo+span*0.15+k*STEP for k in range(int(span*0.70/STEP)+1)]
    if len(cand)<5: return []
    def free(i,x): return not any(w[1]-1.0<=x<=w[2]+1.0 for w in lines[i][1])
    def both(i,x):
        c=core[i]
        return any(w[2]<=x for w in c) and len([w for w in c if w[1]>=x])>=2
    F=[[free(i,x) for x in cand] for i in range(n)]
    B=[[both(i,x) for x in cand] for i in range(n)]
    results=[]; used=set()
    for bw,minrich,minfrac in ((3,3,0.5),(1,4,0.6)):
        rng=range(max(1,bw),len(cand)-max(1,bw))
        offs=tuple(range(-bw,bw+1))
        while True:
            best=None
            for k in rng:
                i=0
                while i<n:
                    if i in used or not all(F[i][k+d] for d in offs):
                        i+=1; continue
                    j=i
                    while j<n and j not in used and all(F[j][k+d] for d in offs):
                        j+=1
                    L=j-i
                    b=sum(1 for t in range(i,j) if B[t][k])
                    rich=sum(1 for t in range(i,j)
                             if B[t][k] and len([w for w in core[t] if w[1]>=cand[k]])>=3)
                    if L>=4 and b>=3 and b>=minfrac*L and rich>=minrich:
                        sc=(b,L)
                        if best is None or sc>best[0]: best=(sc,i,j,k)
                    i=j
            if not best: break
            _,i,j,k=best
            used.update(range(i,j))
            def _r(t): return any(w[1]>=cand[k] for w in lines[t][1])
            while i<j and not B[i][k]: i+=1
            while j>i and not (B[j-1][k] or _r(j-1)): j-=1
            if j-i>=2: results.append((i,j,cand[k]))
    return sorted(results)

def table_md(lines,i,j,split,pageof=None):
    rows=[]
    prev_y=None; spacings=[]
    for k in range(i,j):
        y=lines[k][0]
        if prev_y is not None: spacings.append(y-prev_y)
        prev_y=y
    med=sorted(spacings)[len(spacings)//2] if spacings else 14.0
    merged=[]; prev_y=None
    for k in range(i,j):
        L=lines[k]
        left=' '.join(w[3] for w in L[1] if w[2]<=split)
        right=' '.join(w[3] for w in L[1] if w[1]>=split)
        lead=(left or right).strip()
        gap = (L[0]-prev_y) if prev_y is not None else None
        if pageof is not None and k>i and pageof[k]!=pageof[k-1]: gap=None
        prev_y=L[0]
        pgbrk = pageof is not None and k>i and pageof[k]!=pageof[k-1]
        newrow = (not merged) or (gap is not None and not pgbrk and gap>med*1.45) or bool(
                 lead and (lead[0].isupper() or lead[0].isdigit() or lead[0] in '•-–●*▪→'))
        if newrow: merged.append([left.strip(),right.strip()])
        else:
            if left.strip():  merged[-1][0]=(merged[-1][0]+' '+left.strip()).strip()
            if right.strip(): merged[-1][1]=(merged[-1][1]+' '+right.strip()).strip()
    merged=[r for r in merged if (r[0] or r[1])]
    if len(merged)<2: return None
    lbl=sum(1 for r in merged if re.fullmatch(r'[\(\u2022\-]?\s*[a-dA-D0-9ivxIVX]{1,4}\s*[\).]?', r[0] or ''))
    if lbl >= 0.5*len(merged): return None        # option / numbered list, not a table
    def esc(s): return re.sub(r'\s{2,}',' ',s).replace('|','\\|').strip()
    out=[f'| {esc(merged[0][0])} | {esc(merged[0][1])} |','| --- | --- |']
    for r in merged[1:]: out.append(f'| {esc(r[0])} | {esc(r[1])} |')
    return out

def extract(pdf, max_h=22.0):
    xml=subprocess.run(['pdftotext','-bbox-layout',pdf,'-'],capture_output=True,text=True,
                       errors='replace').stdout
    lines=[]; pageof=[]
    for pi,pg in enumerate(re.split(r'<page ',xml)[1:]):
        ls=make_lines(page_words(pg,max_h))
        lines.extend(ls); pageof.extend([pi]*len(ls))
    if not lines: return ''
    tabs=find_tables(lines)
    covered={}
    for (i,j,sp) in tabs:
        for k in range(i,j): covered[k]=(i,j,sp)
    out=[]; k=0; prev_pg=0
    while k < len(lines):
        if pageof[k]!=prev_pg:
            out.append(''); prev_pg=pageof[k]
        if k in covered:
            i,j,sp=covered[k]
            md=table_md(lines,i,j,sp,pageof)
            if md: out.extend(md)
            else: out.extend(render(lines[t]) for t in range(i,j))
            k=j; 
            if k<len(lines): prev_pg=pageof[k-1]
        else:
            out.append(render(lines[k])); k+=1
    txt='\n'.join(out)
    ind=[len(l)-len(l.lstrip()) for l in txt.split('\n')
         if l.strip() and not l.lstrip().startswith('|')]
    if ind:
        sh=min(ind)
        if sh>0:
            res=[]
            for l in txt.split('\n'):
                if l.lstrip().startswith('|'): res.append(l.lstrip())
                elif l.strip(): res.append(l[sh:])
                else: res.append(l)
            txt='\n'.join(res)
    return txt

if __name__=='__main__':
    for p in sys.argv[1:]:
        out=extract(p); open(p+'.txt','w').write(out)
        print(f"{os.path.basename(p)}: {len(out)}")
