import re, glob, os

RAW="/Users/ztejas/CA_PERSONAL/sm-qbank/raw"
FURN=[re.compile(p) for p in [
 r'^\s*©\s*The Institute of Chartered Accountants of India\s*$',
 r'PAPER\s*[–\-—]\s*7\s*:\s*ENTER',
 r'INTERMEDIATE.*EXAMINATION',
 r'^\s*\d{1,3}\s*$',
]]
def load(f):
    return open(f, encoding='utf-8').read().split("\n")

for f in sorted(glob.glob(RAW+"/rtp-old-*-p7.txt")):
    L=load(f)
    si=None; ai=None
    for i,l in enumerate(L):
        if si is None and re.search(r'SECTION\s*[–\-—]?\s*B\s*:?\s*STRATEGIC\s+MANAGEMENT', l, re.I): si=i
        if si is not None and ai is None and i>si and re.match(r'\s*SUGGESTED\s+ANSWERS', l, re.I): ai=i
    print("="*90)
    print(os.path.basename(f), "sectionB@",si, "answers@",ai, "total",len(L))
    # headings in Q block
    for i in range(si+1, ai):
        l=L[i]
        if not l.strip(): continue
        if any(p.search(l) for p in FURN): continue
        ind=len(l)-len(l.lstrip())
        s=l.strip()
        if re.match(r'^\d{1,2}[.)]?\s', s) and ind<=10:
            print(f"   Q ind={ind:2d} :: {s[:70]}")
        elif re.match(r'^\(', s) and ind<=16:
            print(f"     sub ind={ind:2d} :: {s[:60]}")
        elif not re.match(r'^[\(•●]', s) and ind<=10:
            print(f"  HEAD ind={ind:2d} :: {s[:80]}")
