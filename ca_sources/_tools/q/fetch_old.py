#!/usr/bin/env python3
"""Fetch old-scheme plan entries: try each candidate URL live; with --wayback also try the Wayback
Machine raw capture (web.archive.org/web/2id_/<url>) of each candidate. First real PDF wins.

Usage: python3 -I fetch_old.py PLAN.json [--wayback] [--only REGEX] [--force]
Results merged into ~/CA_PERSONAL/ca_sources/q/_scratch/fetchlog.json (keyed by dest); the plan entry is updated
in place with 'url' (the official URL that was obtained), 'source' and 'wayback_url' when relevant.
"""
import datetime
import hashlib
import json
import os
import re
import subprocess
import sys
import time

UA = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/124.0 Safari/537.36')
Q = os.path.expanduser('~/CA_PERSONAL/ca_sources/q')
LOG = os.path.join(Q, '_scratch', 'fetchlog.json')


def sha(path):
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for b in iter(lambda: f.read(1 << 20), b''):
            h.update(b)
    return h.hexdigest()


def get(url, out, tries=2):
    code = ''
    for i in range(tries):
        r = subprocess.run(['curl', '-s', '-L', '-m', '180', '-A', UA, '-w', '%{http_code}', url, '-o', out],
                           capture_output=True, text=True)
        code = r.stdout.strip()
        if code == '200' and os.path.exists(out) and os.path.getsize(out) > 1000:
            with open(out, 'rb') as f:
                if f.read(5) == b'%PDF-':
                    return code, True
        if code in ('404', '403', '410'):
            break
        time.sleep(2 + 3 * i)
    if os.path.exists(out):
        os.remove(out)
    return code, False


def main():
    pf = sys.argv[1]
    plan = json.load(open(pf))
    wb = '--wayback' in sys.argv
    mirrors = '--mirrors' in sys.argv
    force = '--force' in sys.argv
    only = re.compile(sys.argv[sys.argv.index('--only') + 1]) if '--only' in sys.argv else None
    log = json.load(open(LOG)) if os.path.exists(LOG) else {}
    today = datetime.date.today().isoformat()
    for e in plan:
        dest = e['dest']
        if only and not only.search(dest):
            continue
        out = os.path.join(Q, dest)
        os.makedirs(os.path.dirname(out), exist_ok=True)
        if os.path.exists(out) and not force and log.get(dest, {}).get('ok'):
            lg = log[dest]
            e['url'], e['source'], e['wayback_url'] = lg.get('url'), lg.get('source'), lg.get('wayback_url')
            if lg.get('mirror_page'):
                e['mirror_page'] = lg['mirror_page']
            print('HAVE', dest)
            continue
        tried = []
        got = None
        for c in e['candidates']:
            code, ok = get(c, out)
            tried.append(f'{c} -> {code}')
            if ok:
                got = (c, 'boslive' if 'boslive.icai.org' in c else 'icai', None)
                break
        if not got and wb:
            for c in e['candidates']:
                w = 'https://web.archive.org/web/2id_/' + c
                code, ok = get(w, out, tries=3)
                tried.append(f'{w} -> {code}')
                if ok:
                    got = (c, 'wayback', w)
                    break
        if not got and mirrors:
            for m in e.get('mirrors') or []:
                code, ok = get(m['url'], out, tries=2)
                tried.append(f"{m['url']} -> {code}")
                if ok:
                    got = (m['url'], 'mirror:' + m['site'], None)
                    e['mirror_page'] = m.get('page')
                    break
        rec = {'dest': dest, 'tried': tried, 'fetched': today}
        if got and e.get('mirror_page'):
            rec['mirror_page'] = e['mirror_page']
        if got:
            e['url'], e['source'], e['wayback_url'] = got
            rec.update(ok=True, url=got[0], source=got[1], wayback_url=got[2], sha256=sha(out),
                       bytes=os.path.getsize(out))
            print('GOT ', got[1], dest, os.path.getsize(out))
        else:
            rec.update(ok=False)
            print('FAIL', dest, ' | '.join(tried)[-200:])
        log[dest] = rec
        with open(LOG, 'w') as f:
            json.dump(log, f, indent=1)
    with open(pf, 'w') as f:
        json.dump(plan, f, indent=1)


if __name__ == '__main__':
    main()
