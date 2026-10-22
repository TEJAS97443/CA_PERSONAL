import sys, json, os, glob, re
sys.path.insert(0,'/Users/ztejas/CA_PERSONAL/sm-qbank/work/mtp-old')
from build import build
slugs=[os.path.basename(f).replace('mtp-old-','').replace('-q.sm.txt','')
       for f in sorted(glob.glob('sm/mtp-old-*-q.sm.txt'))]
allrecs={}
tot=0
for s in slugs:
    try: rs=build(s)
    except Exception as e:
        print(f"{s}: ERROR {e}"); continue
    allrecs[s]=rs; tot+=len(rs)
    short=[r['qno'] for r in rs if len(r['question'])<25]
    noans=[r['qno'] for r in rs if r['kind']=='descriptive' and len(r['answer'])<40]
    nomcq=[r['qno'] for r in rs if r['kind'] in ('mcq','case-mcq') and not r['mcq_answer']]
    noopt=[r['qno'] for r in rs if r['kind'] in ('mcq','case-mcq') and not r['options']]
    print(f"{s:14s} n={len(rs):3d}  short={short}  noans={noans}  no_mcq_ans={nomcq} no_opts={noopt}")
json.dump(allrecs, open('/Users/ztejas/CA_PERSONAL/sm-qbank/work/mtp-old/draft.json','w'), indent=1, ensure_ascii=False)
print("TOTAL", tot)
