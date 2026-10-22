#!/usr/bin/env python3
"""Wayback helpers.

  python3 -I wb.py cdx URL [--prefix]             list captures (timestamp original status mimetype length)
  python3 -I wb.py page TIMESTAMP URL OUT.html    fetch raw capture (id_) and list its PDF links
  python3 -I wb.py links FILE.html                list PDF links (text | href) of a saved page
"""
import html
import re
import subprocess
import sys
import time
import urllib.parse


def curl(url, out=None, tries=4):
    for i in range(tries):
        args = ['curl', '-s', '-L', '-m', '180', '-w', '%{http_code}', url]
        if out:
            args += ['-o', out]
        r = subprocess.run(args, capture_output=True, text=not out)
        if out:
            code = r.stdout.decode().strip() if isinstance(r.stdout, bytes) else r.stdout.strip()
            if code == '200':
                return code
        else:
            body = r.stdout
            if body and not body.rstrip().endswith('504 Gateway Time-out</h1></center>'):
                return body
        time.sleep(3 + 5 * i)
    return code if out else ''


def links(path):
    t = open(path, encoding='utf-8', errors='replace').read()
    s = re.sub(r'<script.*?</script>|<style.*?</style>', '', t, flags=re.S)
    out = []
    for m in re.finditer(r'<a [^>]*href="([^"]+\.pdf)"[^>]*>(.*?)</a>', s, re.S | re.I):
        x = html.unescape(re.sub(r'<[^>]+>|\s+', ' ', m.group(2))).strip()
        href = re.sub(r'^https?://web\.archive\.org/web/\d+[a-z_]*/', '', m.group(1))
        out.append((x, href))
    return out


def main():
    cmd = sys.argv[1]
    if cmd == 'cdx':
        url = sys.argv[2]
        q = 'https://web.archive.org/cdx/search/cdx?url=' + urllib.parse.quote(url, safe='') + \
            '&output=txt&fl=timestamp,original,statuscode,mimetype,length&limit=500'
        if '--prefix' in sys.argv:
            q += '&matchType=prefix&collapse=urlkey'
        print(curl(q))
    elif cmd == 'page':
        ts, url, out = sys.argv[2:5]
        code = curl(f'https://web.archive.org/web/{ts}id_/{url}', out)
        print('http', code)
        for x, h in links(out):
            print(f'  {x[:60]:60s} | {h}')
    elif cmd == 'links':
        for x, h in links(sys.argv[2]):
            print(f'  {x[:60]:60s} | {h}')


if __name__ == '__main__':
    main()
