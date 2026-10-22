#!/usr/bin/env python3
"""Write ~/CA_PERSONAL/ca_sources/q/COVERAGE.md from manifest.json + gaps.json (reasons for missing documents).

Usage: python3 -I build_coverage.py
gaps.json (in this tools dir): {"<scheme>/<paper>/<attempt>/<col>": "reason", ...} where col is one of
pyq-q, pyq-a, rtp, mtp-s1, mtp-s2; key "<scheme>/*/<attempt>/<col>" applies to every paper.
"""
import datetime
import json
import os

Q = os.path.expanduser('~/CA_PERSONAL/ca_sources/q')
TOOLS = os.path.expanduser('~/CA_PERSONAL/ca_sources/_tools/q')
NEW_ATT = ['may2024', 'sep2024', 'jan2025', 'may2025', 'sep2025', 'jan2026', 'may2026', 'sep2026', 'jan2027']
OLD_ATT = ['nov2019', 'may2020', 'nov2020', 'jan2021', 'jul2021', 'dec2021', 'may2022', 'nov2022', 'may2023',
           'nov2023']
LABEL = {'may2024': 'May 2024', 'sep2024': 'Sep 2024', 'jan2025': 'Jan 2025', 'may2025': 'May 2025',
         'sep2025': 'Sep 2025', 'jan2026': 'Jan 2026', 'may2026': 'May 2026', 'sep2026': 'Sep 2026',
         'jan2027': 'Jan 2027', 'nov2019': 'Nov 2019', 'may2020': 'May 2020', 'nov2020': 'Nov 2020',
         'jan2021': 'Jan 2021', 'jul2021': 'Jul 2021', 'dec2021': 'Dec 2021', 'may2022': 'May 2022',
         'nov2022': 'Nov 2022', 'may2023': 'May 2023', 'nov2023': 'Nov 2023'}
PAPERS = {'new': [('p4', 'P4 Cost and Management Accounting'), ('p5', 'P5 Auditing and Ethics'),
                  ('p6', 'P6 Financial Management and Strategic Management')],
          'old': [('p3', 'old P3 Cost and Management Accounting'), ('p6', 'old P6 Auditing and Assurance'),
                  ('p8', 'old P8 Financial Management and Economics for Finance (FM = Section A)')]}
COLS = [('pyq-q', 'PYQ question paper'), ('pyq-a', 'PYQ suggested answers'), ('rtp', 'RTP'),
        ('mtp-s1', 'MTP Series I (q / a)'), ('mtp-s2', 'MTP Series II (q / a)')]


def main():
    man = json.load(open(os.path.join(Q, 'manifest.json')))
    gp = os.path.join(TOOLS, 'gaps.json')
    gaps = json.load(open(gp)) if os.path.exists(gp) else {}
    have = {}
    for e in man:
        col = {'pyq': 'pyq-' + e['part'][0], 'rtp': 'rtp', 'mtp': 'mtp-' + (e['series'] or '')}[e['kind']]
        have.setdefault((e['scheme'], e['paper'], e['attempt'], col), []).append(e)
    L = ['# Question-document coverage (ICAI CA Intermediate, Group II papers)', '',
         f'Generated {datetime.date.today().isoformat()} from `manifest.json` by `~/CA_PERSONAL/ca_sources/_tools/q/build_coverage.py`.',
         'Cell legend: **Y** = file present (source in brackets when not ICAI\'s own live copy: '
         '*sm* = copied from ~/CA_PERSONAL/sm-qbank, *wb* = Wayback capture of the ICAI URL, *mirror* = third-party copy); '
         '`q`/`a` = question / answer file of an MTP pair; **--** = missing, reason in the numbered note. '
         'PYQ question papers are image scans (text by OCR).', '']
    foot = []

    def fn(reason):
        if reason not in foot:
            foot.append(reason)
        return f'[{foot.index(reason) + 1}]'

    def tag(es):
        t = set()
        for e in es:
            s = e['source']
            if s.startswith('copied'):
                t.add('sm')
            elif s == 'wayback':
                t.add('wb')
            elif s.startswith('mirror'):
                t.add('mirror')
        return (' (' + ','.join(sorted(t)) + ')') if t else ''

    for scheme in ('new', 'old'):
        atts = NEW_ATT if scheme == 'new' else OLD_ATT
        if not any(e['scheme'] == scheme for e in man) and scheme == 'old' and not any(k.startswith('old/') for k in gaps):
            continue
        L.append('## ' + ('New scheme (applies 1:1 to the January 2027 syllabus)' if scheme == 'new'
                          else 'Old scheme (practice only; papers renumbered in the new scheme)'))
        L.append('')
        for paper, title in PAPERS[scheme]:
            L.append('### ' + title)
            L.append('')
            L.append('| Attempt | ' + ' | '.join(c[1] for c in COLS) + ' |')
            L.append('|---|' + '---|' * len(COLS))
            for a in atts:
                row = []
                for col, _ in COLS:
                    es = have.get((scheme, paper, a, col), [])
                    reason = gaps.get(f'{scheme}/{paper}/{a}/{col}') or gaps.get(f'{scheme}/*/{a}/{col}')
                    if col.startswith('mtp'):
                        parts = {e['part'] for e in es}
                        if es:
                            cell = 'Y ' + '/'.join(p for p in ('q', 'a') if p in parts) + tag(es)
                            if reason:
                                cell += ' ' + fn(reason)
                        else:
                            cell = '-- ' + fn(reason or 'not found')
                    else:
                        if es:
                            cell = 'Y' + tag(es)
                            if len(es) > 1:
                                cell += f' ({len(es)} files)'
                            if reason:
                                cell += ' ' + fn(reason)
                        else:
                            cell = '-- ' + fn(reason or 'not found')
                    row.append(cell)
                L.append(f'| {LABEL[a]} | ' + ' | '.join(row) + ' |')
            L.append('')
    L.append('## Notes')
    L.append('')
    for i, r in enumerate(foot, 1):
        L.append(f'{i}. {r}')
    L.append('')
    with open(os.path.join(Q, 'COVERAGE.md'), 'w') as f:
        f.write('\n'.join(L))
    print('\n'.join(L))


if __name__ == '__main__':
    main()
