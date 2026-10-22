#!/usr/bin/env python3
"""Fetch / copy every entry of a plan file into ~/CA_PERSONAL/ca_sources/q/<dest>.

Usage: python3 -I fetch.py PLAN.json [--verify-copies] [--only REGEX]
- entries with copy_from: shutil.copy2 (never move/edit the original); with --verify-copies the live URL
  is also downloaded to _scratch/verify/ and its sha256 compared with the copy.
- entries with url: curl with a browser UA (retry 3x); file must start with %PDF.
Results are merged into ~/CA_PERSONAL/ca_sources/q/_scratch/fetchlog.json keyed by dest.
"""
import datetime
import hashlib
import json
import os
import re
import shutil
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


def curl(url, out):
    code = ''
    for i in range(3):
        r = subprocess.run(['curl', '-s', '-L', '-m', '180', '-A', UA, '-w', '%{http_code}', url, '-o', out],
                           capture_output=True, text=True)
        code = r.stdout.strip()
        if code == '200' and os.path.exists(out) and os.path.getsize(out) > 1000:
            with open(out, 'rb') as f:
                if f.read(5) == b'%PDF-':
                    return code, True
        time.sleep(2 + 3 * i)
    return code, False


def main():
    plan = json.load(open(sys.argv[1]))
    verify = '--verify-copies' in sys.argv
    only = None
    if '--only' in sys.argv:
        only = re.compile(sys.argv[sys.argv.index('--only') + 1])
    log = json.load(open(LOG)) if os.path.exists(LOG) else {}
    today = datetime.date.today().isoformat()
    for e in plan:
        dest = e['dest']
        if only and not only.search(dest):
            continue
        out = os.path.join(Q, dest)
        os.makedirs(os.path.dirname(out), exist_ok=True)
        rec = log.get(dest, {})
        if e.get('copy_from'):
            src = e['copy_from']
            if not os.path.exists(out) or sha(out) != sha(src):
                shutil.copy2(src, out)
            rec.update(dest=dest, mode='copy', copy_from=src, sha256=sha(out), bytes=os.path.getsize(out),
                       fetched=rec.get('fetched') or today, url=e.get('url'))
            if verify and e.get('url'):
                vdir = os.path.join(Q, '_scratch', 'verify')
                os.makedirs(vdir, exist_ok=True)
                vout = os.path.join(vdir, dest.replace('/', '__'))
                code, ok = curl(e['url'], vout)
                rec['live_check'] = {'date': today, 'http': code, 'ok': ok,
                                     'sha256': sha(vout) if ok else None,
                                     'identical': ok and sha(vout) == rec['sha256']}
            print('COPY', dest, rec.get('live_check', {}).get('identical', ''))
        elif e.get('url'):
            if os.path.exists(out) and rec.get('sha256') == sha(out):
                print('HAVE', dest)
                continue
            code, ok = curl(e['url'], out)
            if not ok:
                print('FAIL', code, dest, e['url'])
                rec.update(dest=dest, mode='download', url=e['url'], http=code, ok=False, fetched=today)
                if os.path.exists(out):
                    os.rename(out, out + '.bad')
            else:
                rec.update(dest=dest, mode='download', url=e['url'], http=code, ok=True, fetched=today,
                           sha256=sha(out), bytes=os.path.getsize(out))
                print('GOT ', dest, os.path.getsize(out))
        else:
            continue
        log[dest] = rec
        with open(LOG, 'w') as f:
            json.dump(log, f, indent=1)


if __name__ == '__main__':
    main()
