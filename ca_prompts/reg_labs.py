#!/usr/bin/env python3
"""Pre-register every PassBook lab from LABS.md in ~/CA_PERSONAL/ca_passbook/content/labs.json with status "planned".
Keeps existing entries (and their status) untouched.

    python3 -I ~/CA_PERSONAL/ca_prompts/reg_labs.py
"""
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
TARGET = os.path.expanduser('~/CA_PERSONAL/ca_passbook/content/labs.json')


def rows():
    out = []
    with open(os.path.join(HERE, 'LABS.md')) as f:
        for line in f:
            cells = [c.strip() for c in line.strip().strip('|').split('|')]
            if len(cells) == 6 and re.fullmatch(r'[a-z][a-z0-9-]*', cells[0]) and cells[0] != 'id':
                lab, title, topics, shows, _chal, _embed = cells
                tops = [t.strip() for t in topics.split(',')]
                subject = tops[0].split('.')[0]
                blurb = shows.split(';')[0].strip()
                blurb = blurb[0].upper() + blurb[1:]
                if not blurb.endswith('.'):
                    blurb += '.'
                out.append({'id': lab, 'title': title, 'subject': subject,
                            'topics': [t for t in tops if '.' in t] or [], 'blurb': blurb,
                            'keywords': [], 'status': 'planned'})
    return out


def main():
    cur = []
    if os.path.exists(TARGET):
        with open(TARGET) as f:
            cur = json.load(f)
    have = {e['id'] for e in cur}
    add = [r for r in rows() if r['id'] not in have]
    cur.extend(add)
    tmp = TARGET + '.tmp'
    with open(tmp, 'w') as f:
        json.dump(cur, f, indent=2)
        f.write('\n')
    os.replace(tmp, TARGET)
    print('added', len(add), 'labs; total', len(cur))


if __name__ == '__main__':
    main()
