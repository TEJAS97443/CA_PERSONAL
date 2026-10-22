#!/usr/bin/env python3
"""Report a checkpoint of your job to the live dashboard (the user watches it).

    python3 -I ~/CA_PERSONAL/ca_prompts/progress.py <job> <step> ["short note"]
    python3 -I ~/CA_PERSONAL/ca_prompts/progress.py <job> --steps        list your job's steps and which are done

<job> is the JOB= value in your brief (e.g. w-dm1). <step> is one of your job's steps, e.g. "start",
"dm.logic.props:draft", "report". Mark each step the moment it is finished; marking again is harmless.
"""
import json
import os
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))


def main(argv):
    if len(argv) < 3:
        print(__doc__)
        return 2
    job, step = argv[1], argv[2]
    with open(os.path.join(HERE, 'jobs.json')) as f:
        jobs = {j['id']: j for j in json.load(f)}
    if job not in jobs:
        print('unknown job ' + job + '; see ~/CA_PERSONAL/ca_prompts/jobs.json')
        return 1
    steps = jobs[job]['steps']
    path = os.path.join(HERE, 'progress', job + '.jsonl')
    done = set()
    if os.path.exists(path):
        with open(path) as f:
            for line in f:
                try:
                    done.add(json.loads(line)['step'])
                except (ValueError, KeyError):
                    pass
    if step == '--steps':
        for s in steps:
            print(('[x] ' if s in done else '[ ] ') + s)
        return 0
    if step not in steps:
        print('unknown step "' + step + '" for ' + job + '. Your steps:\n  ' + '\n  '.join(steps))
        return 1
    os.makedirs(os.path.dirname(path), exist_ok=True)
    note = ' '.join(argv[3:])[:200]
    with open(path, 'a') as f:
        f.write(json.dumps({'t': time.time(), 'step': step, 'note': note}) + '\n')
    done.add(step)
    print(f'{job}: {step} ok ({sum(1 for s in steps if s in done)}/{len(steps)} steps done)')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
