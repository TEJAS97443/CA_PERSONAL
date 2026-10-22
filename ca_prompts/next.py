#!/usr/bin/env python3
"""Lead's scheduler for PassBook jobs.

    python3 -I ~/CA_PERSONAL/ca_prompts/next.py status            # counts + running jobs with their last checkpoint age
    python3 -I ~/CA_PERSONAL/ca_prompts/next.py ready [N]         # jobs whose deps are done and that are not started (writers before reviewers)
    python3 -I ~/CA_PERSONAL/ca_prompts/next.py start <job> <agentId>
    python3 -I ~/CA_PERSONAL/ca_prompts/next.py done <job>
    python3 -I ~/CA_PERSONAL/ca_prompts/next.py resume <job> <agentId>   # a fresh agent took over a dead job
"""
import json
import os
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
STATE = os.path.join(HERE, 'state.json')


def load():
    with open(os.path.join(HERE, 'jobs.json')) as f:
        jobs = json.load(f)
    st = {}
    if os.path.exists(STATE):
        with open(STATE) as f:
            st = json.load(f)
    return jobs, st


def save(st):
    tmp = STATE + '.tmp'
    with open(tmp, 'w') as f:
        json.dump(st, f, indent=1)
    os.replace(tmp, STATE)


def steps_done(job):
    path = os.path.join(HERE, 'progress', job + '.jsonl')
    done, last = set(), 0
    if os.path.exists(path):
        with open(path) as f:
            for line in f:
                try:
                    r = json.loads(line)
                    done.add(r['step'])
                    last = max(last, r['t'])
                except (ValueError, KeyError):
                    pass
    return done, last


def main(a):
    jobs, st = load()
    byid = {j['id']: j for j in jobs}
    cmd = a[1] if len(a) > 1 else 'status'
    if cmd in ('start', 'resume'):
        job, agent = a[2], a[3]
        assert job in byid, job
        e = st.setdefault(job, {})
        e.update(status='running', agent=agent)
        e.setdefault('started', time.time())
        if cmd == 'resume':
            e.setdefault('resumed', []).append(time.time())
        save(st)
        print(job, cmd, agent)
        return
    if cmd == 'done':
        st.setdefault(a[2], {})['status'] = 'done'
        st[a[2]]['finished'] = time.time()
        save(st)
        print(a[2], 'done')
        return
    if cmd == 'ready':
        lim = int(a[2]) if len(a) > 2 else 99
        out = []
        order = {'writer': 0, 'lab': 1, 'reviewer': 2}
        for j in sorted(jobs, key=lambda j: order.get(j.get('kind'), 3)):
            if st.get(j['id'], {}).get('status') in ('running', 'done'):
                continue
            if all(st.get(d, {}).get('status') == 'done' for d in j.get('deps', [])):
                out.append(j['id'])
        print(' '.join(out[:lim]))
        return
    # status
    cnt = {}
    for j in jobs:
        s = st.get(j['id'], {}).get('status', 'pending')
        cnt[s] = cnt.get(s, 0) + 1
    print(' '.join(f'{k}={v}' for k, v in sorted(cnt.items())))
    now = time.time()
    for j in jobs:
        e = st.get(j['id'], {})
        if e.get('status') == 'running':
            done, last = steps_done(j['id'])
            n = len(j.get('steps', []))
            age = f'{(now - last) / 60:.0f}m ago' if last else 'no checkpoint'
            print(f"  {j['id']:8} {sum(s in done for s in j.get('steps', []))}/{n} steps, last {age}  agent {e.get('agent')}")


if __name__ == '__main__':
    main(sys.argv)
