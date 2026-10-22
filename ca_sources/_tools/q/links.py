#!/usr/bin/env python3
"""Fetch (or read cached) HTML page(s) and list links with anchor text.

Usage: python3 -I links.py CACHE_DIR URL [URL...] [--pdf] [--grep REGEX]
Cached HTML saved as CACHE_DIR/<sanitised-url>.html (untrusted; regex-parsed only).
"""
import html
import os
import re
import subprocess
import sys

UA = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/124.0 Safari/537.36')


def fetch(cache, url, refresh=False):
    name = re.sub(r'[^A-Za-z0-9._-]+', '_', url)[-150:] + '.html'
    path = os.path.join(cache, name)
    if refresh or not os.path.exists(path) or os.path.getsize(path) < 100:
        r = subprocess.run(['curl', '-s', '-L', '-m', '90', '-A', UA, '-w', '%{http_code}',
                            url, '-o', path], capture_output=True, text=True)
        code = r.stdout.strip()
    else:
        code = 'cached'
    with open(path, encoding='utf-8', errors='replace') as f:
        return code, f.read()


def links(text):
    out = []
    for m in re.finditer(r'<a\b[^>]*?href\s*=\s*["\']([^"\']+)["\'][^>]*>(.*?)</a>', text, re.S | re.I):
        href = html.unescape(m.group(1).strip())
        t = re.sub(r'<[^>]+>', ' ', m.group(2))
        t = html.unescape(re.sub(r'\s+', ' ', t)).strip()
        out.append((href, t))
    return out


def main():
    args = sys.argv[1:]
    cache = args.pop(0)
    os.makedirs(cache, exist_ok=True)
    pdf = '--pdf' in args
    refresh = '--refresh' in args
    rx = None
    if '--grep' in args:
        i = args.index('--grep')
        rx = re.compile(args[i + 1], re.I)
        del args[i:i + 2]
    urls = [a for a in args if not a.startswith('--')]
    for u in urls:
        code, t = fetch(cache, u, refresh)
        tm = re.search(r'<title>(.*?)</title>', t, re.S | re.I)
        print(f'## {u} [{code}] {len(t)}b title={tm.group(1).strip()[:80] if tm else ""}')
        for href, txt in links(t):
            if pdf and '.pdf' not in href.lower():
                continue
            if rx and not (rx.search(href) or rx.search(txt)):
                continue
            print(f'  {txt[:110]!s:110} | {href}')


if __name__ == '__main__':
    main()
