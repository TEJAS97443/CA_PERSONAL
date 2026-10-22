"""Cross-check toc.json headings (font-detected) against ICAI's printed DETAILED CONTENTS in the initial pages.

usage: python -I check_toc.py <paper> ...   -> prints a report, writes <paper>/_contents_check.json
"""
import json, os, re, subprocess, sys, unicodedata

HOME = os.path.expanduser('~')
SM = os.path.join(HOME, 'CA_PERSONAL/ca_sources', 'sm')
IPS = {'p4': ['m1-ip.pdf', 'm2-ip.pdf'], 'p5': ['m1-ip.pdf', 'm2-ip.pdf'], 'p6a': ['m1-ip.pdf', 'm2-ip.pdf'], 'p6b': ['ip.pdf']}
LEADER = re.compile(r'^(?P<title>.*?)\s*(?:\.{3,}|…|\.\s?\.\s?\.)[.…\s]*(?P<pg>\d{1,2}\s?\.\s?\d{1,3})\s*(?:[-–]\s*\d{1,2}\.\d{1,3})?\s*$')
CHAP = re.compile(r'^\s*CHAPTER\s*[-–:]?\s*(\d{1,2})\b', re.I)
UNIT = re.compile(r'^\s*UNIT\s*[-–:]?\s*([IVX]+)\b', re.I)
NUMT = re.compile(r'^\s*(\d{1,2}(?:\.\d{1,2}){0,3}[A-Z]?)\.?\s+(.*)$')


def norm_num(n):
    return n.rstrip('.') if n else n


def parse_contents(paper):
    entries = {}
    for ip in IPS[paper]:
        txt = subprocess.run(['pdftotext', '-layout', os.path.join(SM, paper, 'pdf', ip), '-'], capture_output=True, text=True).stdout
        m0 = re.search(r'DETAILED\s+CONTENTS', txt, re.I)   # (str.upper() shifts indices: ligatures expand)
        if not m0:
            continue
        i = m0.start()
        ch = None
        pending = ''
        for raw in txt[i:].splitlines():
            line = raw.strip()
            if not line or line.startswith('©') or re.fullmatch(r'[ivxlc]+|\d+\.?', line, re.I):
                continue
            m = CHAP.match(line)
            if m:
                ch = int(m.group(1)); entries.setdefault(ch, []); pending = ''
                continue
            if ch is None:
                continue
            m = LEADER.match(line)
            if m:
                title = (pending + ' ' + m.group('title')).strip()
                pending = ''
                pg = m.group('pg').replace(' ', '')
                nm = NUMT.match(title)
                num, t = (norm_num(nm.group(1)), nm.group(2)) if nm else (None, title)
                if not t.strip() and num is None:
                    continue
                entries[ch].append({'num': num, 'title': re.sub(r'\s+', ' ', t).strip(' .'), 'printed': pg})
            else:
                if UNIT.match(line) or line.upper().startswith(('MODULE', 'CONTENTS')):
                    pending = ''
                    continue
                pending = (pending + ' ' + line).strip() if len(pending) < 160 else line
    return entries


def run(paper):
    toc = json.load(open(os.path.join(SM, paper, 'toc.json')))
    cont = parse_contents(paper)
    report = []
    for c in toc:
        dets = []
        if c.get('units'):
            for u in c['units']:
                dets += u['headings_detail']
        else:
            dets = c['headings_detail']
        found = {}
        for h in dets:
            m = NUMT.match(h['h'])
            if m and h['numbered']:
                found.setdefault(norm_num(m.group(1)), h)
        exp = [e for e in cont.get(c['ch'], []) if e['num']]
        missing = [e for e in exp if e['num'] not in found]
        expnums = {e['num'] for e in exp}
        extra = [h for k, h in found.items() if k not in expnums]
        report.append({'ch': c['ch'], 'title': c['title'], 'contents_numbered': len(exp), 'detected_numbered': len(found),
                       'missing_in_detected': missing, 'not_in_contents': [{'h': h['h'], 'page': h['page']} for h in extra]})
        print('%s ch%-2d contents=%3d detected=%3d missing=%d extra=%d  %s' % (paper, c['ch'], len(exp), len(found), len(missing), len(extra), c['title']))
        for e in missing:
            print('      MISSING  %-8s %-60s [%s]' % (e['num'], e['title'][:60], e['printed']))
        for h in extra:
            print('      EXTRA    %-70s p%d' % (h['h'][:70], h['page']))
    json.dump({'contents': cont, 'report': report}, open(os.path.join(SM, paper, '_contents_check.json'), 'w'), indent=1, ensure_ascii=False)




LIGS = {'ﬀ': 'ff', 'ﬁ': 'fi', 'ﬂ': 'fl', 'ﬃ': 'ffi', 'ﬄ': 'ffl'}


def txt_pages(path):
    pages, cur, lab = {}, None, {}
    for line in open(path, encoding='utf-8'):
        m = re.match(r'^=== p\.(\d+)(?: \[([^\]]+)\])? ===$', line.strip())
        if m:
            cur = int(m.group(1)); pages[cur] = ''; lab[cur] = m.group(2)
        elif cur:
            pages[cur] += line
    return pages, lab


def squash(s):
    s = ''.join(unicodedata.normalize('NFKC', ch) if 0xFB00 <= ord(ch) <= 0xFB06 else ch for ch in s)
    return re.sub(r'[^a-z0-9]+', ' ', s.lower()).strip()


def merge(paper):
    """add headings that ICAI's printed contents list but font detection missed (located by searching the page text)"""
    tp = os.path.join(SM, paper, 'toc.json')
    toc = json.load(open(tp))
    chk = json.load(open(os.path.join(SM, paper, '_contents_check.json')))
    rep = {r['ch']: r for r in chk['report']}
    added = 0
    for c in toc:
        miss = rep[c['ch']]['missing_in_detected']
        if not miss:
            continue
        targets = c['units'] if c.get('units') else [c]
        for e in miss:
            key = squash(e['title'])
            dets = [h for t in targets for h in t['headings_detail']]
            if any(squash(NUMT.match(h['h']).group(2) if NUMT.match(h['h']) else h['h']) == key for h in dets):
                print('  skip (same title already detected under another number)', paper, c['ch'], e['num'], e['title'])
                continue
            for t in targets:
                pages, lab = txt_pages(os.path.join(SM, paper, t['txt']))
                exp = rep[c['ch']]
                prev_pages = [h['page'] for h in t['headings_detail'] if h['numbered']]
                start = 3 if len(pages) > 6 else 1
                hit = next((p for p in sorted(pages) if p >= start and key and key in squash(pages[p])), None)
                if hit:
                    depth = e['num'].count('.') + 1
                    title = ''.join(unicodedata.normalize('NFKC', ch) if 0xFB00 <= ord(ch) <= 0xFB06 else ch for ch in e['title'])
                    t['headings_detail'].append({'h': '%s %s' % (e['num'], title),
                                                 'level': min(3, depth if depth > 1 else 2), 'page': hit, 'printed': lab.get(hit),
                                                 'numbered': True, 'from_contents': True})
                    t['headings_detail'].sort(key=lambda h: h['page'])
                    t['headings'] = [h['h'] for h in t['headings_detail']]
                    added += 1
                    print('  added', paper, c['ch'], e['num'], e['title'], 'p%d' % hit)
                    break
            else:
                print('  NOT FOUND', paper, c['ch'], e['num'], e['title'])
        if c.get('units'):
            c['headings'] = [h for u in c['units'] for h in u['headings']]
    json.dump(toc, open(tp, 'w'), indent=1, ensure_ascii=False)
    return added


if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    for p in args:
        run(p)
        if '--merge' in sys.argv:
            merge(p)
