#!/usr/bin/env python3
"""Layout-preserving PDF text extraction; drops watermark overlays (large fonts) and mirror branding."""
import re, subprocess, sys, html, os
BRAND = re.compile(r'castudynotes|canotes|t\.me/|Downloaded From|Join Us on Telegram', re.I)
CW = 6.3   # approx px per character column

def extract(pdf, max_font=29):
    xml = subprocess.run(['pdftohtml','-xml','-i','-stdout',pdf],
                         capture_output=True, text=True, errors='replace').stdout
    pages=[]
    for pg in re.split(r'<page ', xml)[1:]:
        fonts={m.group(1):int(m.group(2)) for m in re.finditer(r'<fontspec id="(\d+)" size="(-?\d+)"',pg)}
        runs=[]
        for m in re.finditer(r'<text top="(-?\d+)" left="(-?\d+)" width="(-?\d+)" height="(-?\d+)" font="(\d+)">(.*?)</text>',pg,re.S):
            top,left,w,fid,txt=int(m.group(1)),int(m.group(2)),int(m.group(3)),m.group(5),m.group(6)
            if fonts.get(fid,0)>max_font: continue
            t=html.unescape(re.sub(r'<[^>]+>','',txt))
            if not t.strip(): continue
            if BRAND.search(t): continue
            runs.append((top,left,w,t))
        runs.sort(key=lambda r:(r[0],r[1]))
        lines=[]
        for r in runs:
            if lines and abs(r[0]-lines[-1][0])<=5: lines[-1][1].append(r)
            else: lines.append([r[0],[r]])
        out=[]
        for _,items in lines:
            items.sort(key=lambda r:r[1])
            buf=''; prev_end=None
            for top,left,w,t in items:
                if prev_end is None:
                    buf=' '*int(round(left/CW))+t
                else:
                    gap=left-prev_end
                    if gap>3: buf+=' '*max(1,int(round(gap/CW)))+t
                    else: buf+=t
                prev_end=left+w
            out.append(buf.rstrip())
        pages.append('\n'.join(out))
    txt='\n\n'.join(pages)
    # normalise global left margin
    ind=[len(l)-len(l.lstrip()) for l in txt.split('\n') if l.strip()]
    if ind:
        shift=min(ind)
        if shift>0: txt='\n'.join(l[shift:] if l.strip() else l for l in txt.split('\n'))
    return txt

if __name__=='__main__':
    for p in sys.argv[1:]:
        out=extract(p); open(p+'.txt','w').write(out)
        print(f"{os.path.basename(p)}: {len(out)} chars")
