#!/usr/bin/env python3
"""Build the download/copy plan for NEW-scheme P4/P5/P6 question documents.

Reads cached ICAI listing pages (_scratch/html) and the boslive series scan (_scratch/boslive/series.json).
Writes ~/CA_PERSONAL/ca_sources/q/_scratch/plan-new.json: a list of entries
  {scheme, paper, kind, attempt, series, part, url, listing, dest, copy_from?, notes}
Run: python3 -I plan_new.py
"""
import html
import json
import os
import re

HOME = os.path.expanduser('~')
Q = os.path.join(HOME, 'CA_PERSONAL/ca_sources', 'q')
SCR = os.path.join(Q, '_scratch')
HT = os.path.join(SCR, 'html')
SMQ = os.path.join(HOME, 'CA_PERSONAL/sm-qbank')

ATTEMPTS = ['may2024', 'sep2024', 'jan2025', 'may2025', 'sep2025', 'jan2026', 'may2026', 'sep2026']
NAME = {'may2024': 'May 2024', 'sep2024': 'September 2024', 'jan2025': 'January 2025',
        'may2025': 'May 2025', 'sep2025': 'September 2025', 'jan2026': 'January 2026',
        'may2026': 'May 2026', 'sep2026': 'September 2026', 'jan2027': 'January 2027'}
PAPERNO = {'p4': '4', 'p5': '5', 'p6': '6'}


def page(url):
    name = re.sub(r'[^A-Za-z0-9._-]+', '_', url)[-150:] + '.html'
    with open(os.path.join(HT, name), encoding='utf-8', errors='replace') as f:
        return f.read()


def links(t):
    out = []
    for m in re.finditer(r'<a\b[^>]*?href\s*=\s*["\']([^"\']+)["\'][^>]*>(.*?)</a>', t, re.S | re.I):
        txt = html.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', m.group(2)))).strip()
        out.append((html.unescape(m.group(1).strip()), txt))
    return out


def paper_link(lst, p):
    """first link whose text is 'Paper-N: ...' / 'Paper N ...' for paper p"""
    n = PAPERNO[p]
    for h, t in lst:
        if re.match(r'Paper[\s-]*' + n + r'\s*[:\s]', t) and h.lower().endswith('.pdf'):
            return h, t
    return None, None


def main():
    plan = []

    def add(**e):
        e.setdefault('series', None)
        e.setdefault('notes', '')
        plan.append(e)

    # ---------- PYQ question papers (one listing page, attempts newest first)
    lp = 'https://www.icai.org/post/question-papers-intermediate-course'
    t = page(lp)
    s = re.sub(r'<script.*?</script>', '', t, flags=re.S)
    heads = list(re.finditer(r'(September|May|January)\s+(20\d\d)', s))
    lst = []
    for m in re.finditer(r'<a\b[^>]*?href\s*=\s*["\']([^"\']+\.pdf)["\'][^>]*>(.*?)</a>', s, re.S | re.I):
        prev = [h for h in heads if h.start() < m.start()]
        if not prev:
            continue
        mon, yr = prev[-1].group(1), prev[-1].group(2)
        att = {'September': 'sep', 'May': 'may', 'January': 'jan'}[mon] + yr
        txt = html.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', m.group(2)))).strip()
        lst.append((att, m.group(1), txt))
    for att in ATTEMPTS:
        for p in ('p4', 'p5', 'p6'):
            hits = [(h, x) for a, h, x in lst if a == att and re.match(r'Paper[\s-]*' + PAPERNO[p] + r'\s*:', x)]
            if not hits:
                print('MISSING QP', att, p)
                continue
            add(scheme='new', paper=p, kind='pyq', attempt=att, part='q', url=hits[0][0], listing=lp,
                label=hits[0][1])

    # ---------- PYQ suggested answers (one page per attempt)
    for att in ATTEMPTS:
        lp = 'https://www.icai.org/post/sugg-ans-inter-' + att
        try:
            t = page(lp)
        except FileNotFoundError:
            t = ''
        lst = links(t)
        for p in ('p4', 'p5', 'p6'):
            if p == 'p6' and att == 'may2025':
                for sub, rx in (('6a', r'Paper-6A'), ('6b', r'Paper-6B')):
                    h = [x for x in lst if re.match(rx, x[1])]
                    add(scheme='new', paper=p, kind='pyq', attempt=att, part='a', sub=sub, url=h[0][0],
                        listing=lp, label=h[0][1])
                continue
            h, x = paper_link(lst, p)
            if not h:
                print('NO SA', att, p)
                continue
            add(scheme='new', paper=p, kind='pyq', attempt=att, part='a', url=h, listing=lp, label=x)

    # ---------- RTP (one page per attempt; 'sept2024' slug for Sep 2024)
    for att in ATTEMPTS:
        slug = 'sept2024' if att == 'sep2024' else att
        lp = 'https://www.icai.org/post/rtp-intermediate-course-' + slug
        lst = links(page(lp))
        for p in ('p4', 'p5', 'p6'):
            h, x = paper_link(lst, p)
            if not h:
                print('NO RTP', att, p)
                continue
            add(scheme='new', paper=p, kind='rtp', attempt=att, part='qa', url=h, listing=lp, label=x)

    # ---------- MTP via boslive android endpoint
    with open(os.path.join(SCR, 'boslive', 'series.json')) as f:
        series = json.load(f)
    pid = {'p4': '51', 'p5': '52', 'p6': '53'}
    for s in series:
        title = s['title']
        if 'Intermediate' not in title:
            continue
        m = re.search(r'(May|September|January|November)\s+(20\d\d)', title)
        if not m:
            continue
        att = {'September': 'sep', 'May': 'may', 'January': 'jan', 'November': 'nov'}[m.group(1)] + m.group(2)
        sr = re.search(r'Series\D*?\b(I{1,3})\b', title).group(1)
        if att not in ATTEMPTS and att != 'jan2027':
            continue
        ser = {'I': 's1', 'II': 's2'}[sr]
        for p in ('p4', 'p5', 'p6'):
            for pp in s['papers']:
                q = pp['q'] or ''
                a = pp['a'] or ''
                if not re.match(r'Paper-' + PAPERNO[p] + ':', pp['heading']):
                    continue
                lp = 'https://boslive.icai.org/androidapi/mock_test_paper_details.php?id=%d' % s['id']
                for part, fn in (('q', q), ('a', a)):
                    add(scheme='new', paper=p, kind='mtp', attempt=att, series=ser, part=part,
                        url=('https://boslive.icai.org/mock_test_paper/' + fn) if fn else None,
                        listing=lp, label=pp['heading'] + ' | ' + pp['date'] + ' | ' + title,
                        boslive_id=s['id'])
    # destinations
    for e in plan:
        name = e['kind'] + '-' + e['attempt'] + ('-' + e['series'] if e['series'] else '') + '-' + e['part']
        if e.get('sub'):
            name += '-' + e['sub']
        e['dest'] = os.path.join('new', e['paper'], name + '.pdf')
    # P6: map to sm-qbank raw copies
    smq_map = {}
    for att in ATTEMPTS:
        smq_map[('pyq', att, None, 'q')] = 'pyq-%s-qp.pdf' % att
        smq_map[('pyq', att, None, 'a')] = 'pyq-%s-sa.pdf' % att
        smq_map[('rtp', att, None, 'qa')] = 'rtp-%s-p6.pdf' % att
        for ser in ('s1', 's2'):
            for part in ('q', 'a'):
                smq_map[('mtp', att, ser, part)] = 'mtp-%s-%s-%s.pdf' % (att, ser, part)
    for e in plan:
        if e['paper'] != 'p6':
            continue
        key = (e['kind'], e['attempt'], e['series'], e['part'])
        fn = smq_map.get(key)
        if e.get('sub') == '6a':
            fn = 'pyq-may2025-sa-mcq.pdf'
        elif e.get('sub') == '6b':
            fn = 'pyq-may2025-sa.pdf'
        if fn and os.path.exists(os.path.join(SMQ, 'raw', fn)):
            e['copy_from'] = os.path.join(SMQ, 'raw', fn)
    with open(os.path.join(SCR, 'plan-new.json'), 'w') as f:
        json.dump(plan, f, indent=1)
    for e in plan:
        print(e['dest'], '|', e['url'], '|', os.path.basename(e.get('copy_from', '')) or '-')
    print(len(plan), 'entries')


if __name__ == '__main__':
    main()
