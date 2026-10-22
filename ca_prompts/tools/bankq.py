#!/usr/bin/env python3
"""Shared queue of ICAI transcription batches (new scheme first).
    python3 -I ~/CA_PERSONAL/ca_prompts/tools/bankq.py claim <agent-job>   -> prints the claimed batch as JSON (or "none")
    python3 -I ~/CA_PERSONAL/ca_prompts/tools/bankq.py done <batch-id> ["note"]
    python3 -I ~/CA_PERSONAL/ca_prompts/tools/bankq.py release <batch-id>   (give a claimed batch back, e.g. you ran out of room)
    python3 -I ~/CA_PERSONAL/ca_prompts/tools/bankq.py status
Claims are directories in ~/CA_PERSONAL/ca_prompts/bank_claims/<id> (atomic mkdir); done adds a 'done' file inside."""
import json, os, sys, time
H = os.path.expanduser('~/CA_PERSONAL/ca_prompts')
B = json.load(open(os.path.join(H, 'bank_batches.json')))
C = os.path.join(H, 'bank_claims')
SCOPE = os.environ.get('BANKQ_SCOPE', 'new')
def eligible(b): return all(d.startswith(SCOPE + '/') for d in b['docs']) if SCOPE != 'all' else True
cmd = sys.argv[1] if len(sys.argv) > 1 else 'status'
if cmd == 'claim':
    for b in B:
        if not eligible(b): continue
        d = os.path.join(C, b['id'])
        try:
            os.mkdir(d)
        except FileExistsError:
            continue
        open(os.path.join(d, 'claimed'), 'w').write(f"{sys.argv[2] if len(sys.argv) > 2 else '?'} {time.time()}\n")
        print(json.dumps(b)); sys.exit(0)
    print('none')
elif cmd == 'done':
    open(os.path.join(C, sys.argv[2], 'done'), 'w').write(' '.join(sys.argv[3:]) + f" {time.time()}\n"); print('ok')
elif cmd == 'release':
    import shutil; shutil.rmtree(os.path.join(C, sys.argv[2]), ignore_errors=True); print('released')
else:
    el = [b for b in B if eligible(b)]
    cl = [b for b in el if os.path.isdir(os.path.join(C, b['id']))]
    dn = [b for b in cl if os.path.exists(os.path.join(C, b['id'], 'done'))]
    print(f"scope={SCOPE}: {len(el)} batches, {sum(b['est_items'] for b in el)} items | claimed {len(cl)} | done {len(dn)} ({sum(b['est_items'] for b in dn)} items)")
