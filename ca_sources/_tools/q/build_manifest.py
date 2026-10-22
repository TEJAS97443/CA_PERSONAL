#!/usr/bin/env python3
"""Build ~/CA_PERSONAL/ca_sources/q/manifest.json from plan files + fetch log + text stats + notes.

Usage: python3 -I build_manifest.py
Inputs (all under ~/CA_PERSONAL/ca_sources/q/_scratch unless noted):
  plan-new.json, plan-old.json (if present)   planned entries (dest, url, listing, copy_from, source, notes)
  fetchlog.json                              sha256 / fetched date / live re-check of copies
  textstats.json, ocr/<rel>/map.json         text mode, glyph repairs, OCR page maps
  ~/CA_PERSONAL/ca_sources/_tools/q/notes.json           hand-written notes keyed by relative file path
Every entry is written only if its PDF exists on disk (one entry per file).
"""
import hashlib
import json
import os
import re

Q = os.path.expanduser('~/CA_PERSONAL/ca_sources/q')
SCR = os.path.join(Q, '_scratch')
TOOLS = os.path.expanduser('~/CA_PERSONAL/ca_sources/_tools/q')
ORDER = ['nov2019', 'may2020', 'nov2020', 'jan2021', 'jul2021', 'dec2021', 'may2022', 'nov2022', 'may2023',
         'nov2023', 'may2024', 'sep2024', 'jan2025', 'may2025', 'sep2025', 'jan2026', 'may2026', 'sep2026',
         'jan2027']
LABEL = {'may2024': 'May 2024', 'sep2024': 'September 2024', 'jan2025': 'January 2025', 'may2025': 'May 2025',
         'sep2025': 'September 2025', 'jan2026': 'January 2026', 'may2026': 'May 2026',
         'sep2026': 'September 2026', 'jan2027': 'January 2027', 'nov2019': 'November 2019',
         'may2020': 'May 2020', 'nov2020': 'November 2020', 'jan2021': 'January 2021', 'jul2021': 'July 2021',
         'dec2021': 'December 2021', 'may2022': 'May 2022', 'nov2022': 'November 2022', 'may2023': 'May 2023',
         'nov2023': 'November 2023'}


def sha(path):
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for b in iter(lambda: f.read(1 << 20), b''):
            h.update(b)
    return h.hexdigest()


def pages_of(txt):
    t = open(txt, encoding='utf-8').read()
    parts = re.split(r'^=== p\.(\d+) ===\n', t, flags=re.M)[1:]
    return [(int(parts[i]), parts[i + 1]) for i in range(0, len(parts), 2)]


def first(pages, rx, start=1):
    r = re.compile(rx, re.M)
    for k, body in pages:
        if k >= start and r.search(body):
            return k
    return None


def rng(a, b):
    return f'p.{a}' if a == b else f'pp.{a}-{b}'


def auto_notes(e, txt, npages):
    """structural notes derived from the extracted text"""
    if not os.path.exists(txt):
        return ''
    pg = pages_of(txt)
    n = npages
    kind, part, paper = e['kind'], e['part'], e['paper']
    newp6 = paper == 'p6' and e['scheme'] == 'new'
    out = []
    if kind == 'pyq' and part == 'q':
        mp = os.path.join(SCR, 'ocr', e['dest'], 'map.json')
        if os.path.exists(mp):
            m = json.load(open(mp))
            en, hi = m['english_pages'], m['hindi_pages']
            s = f'Image-only scan of the exam question-paper booklet (no usable text layer); .txt is Apple Vision OCR (en-US) of the English pages {rng(en[0], en[-1])}'
            if hi:
                s += f'; Hindi-medium pages {rng(hi[0], hi[-1])} are marked in the .txt but not OCR\'d (Vision has no Hindi model)'
            else:
                s += '; no Hindi half in this scan'
            out.append(s)
            eng = [x for x in pg if x[0] in en]
            p1 = first(eng, r'MCQ\s*Portion|PART\s*[-–]?\s*(I|1)\s+30\s*Marks', 2)
            p2 = first(eng, r'PART\s*[-–]?\s*(II|Il|I1|11)\b', 2)
            if p1:
                out.append(f'contains Part I MCQs ({rng(p1, p2 - 1)}) and Part II descriptive ({rng(p2, en[-1])})')
            elif p2:
                out.append(f'contains Part II descriptive questions only ({rng(p2, en[-1])}); the Part I MCQ booklet is not in ICAI\'s published scan')
            out.append('OCR caveat: the rupee sign is often read as R, ?, <, *, 2 or 3 and table columns are flattened into lines - check figures against the PDF or the Suggested Answers')
    elif kind == 'pyq' and part == 'a':
        key = [k for k, b in pg if re.search(r'^\s*Answer Key\s*$', b, re.M)]
        p2 = first(pg, r'^\s*(PART\s*[-–]?\s*II|Part\s*II)\b')
        p1 = first(pg, r'^\s*(PART\s*[-–]?\s*I\b|Part\s*I\b|Part\s*I\s*MCQs)')
        if p1 and key:
            out.append(f'Part I MCQs from p.{p1} (questions reproduced, then an \'Answer Key\' table of correct options only, no workings, on {", ".join("p." + str(k) for k in key)})')
        elif not key and e['scheme'] == 'new':
            out.append('no Part I MCQs and no MCQ answer key in this document (descriptive Part II only)')
        if newp6:
            a = first(pg, r'^\s*SECTION\s*A\s*:\s*FINANCIAL', (p2 or 1))
            b = first(pg, r'^\s*SECTION\s*[-–]\s*B\s*:\s*STRATEGIC', (p2 or 1))
            if a and b:
                out.append(f'Section A FM descriptive (Q1-4) {rng(a, b - 1)}; Section B SM descriptive (Q5-8) {rng(b, n)}')
            elif a:
                out.append(f'Section A FM descriptive (Q1-4) {rng(a, n)}')
            elif b:
                out.append(f'Section B SM descriptive (Q5-8) {rng(b, n)}')
        elif p2:
            out.append(f'Part II descriptive from p.{p2}')
        out.append('ICAI reproduces each question before its answer')
    elif kind == 'rtp':
        if newp6:
            b = first(pg, r'^\s*6B\s*:')
            fa = first(pg, r'^\s*SUGGESTED ANSWERS?', 1)
            sa = first(pg, r'^\s*SUGGESTED ANSWERS?', (b or 1) + 1)
            out.append(f'6A Financial Management: questions {rng(1, fa - 1)}, answers {rng(fa, b - 1)}; 6B Strategic Management: questions {rng(b, sa - 1)}, answers {rng(sa, n)}')
        else:
            a = first(pg, r'^\s*SUGGESTED ANSWERS?')
            if a:
                out.append(f'questions {rng(1, a - 1)}, suggested answers/hints {rng(a, n)}')
        if e['scheme'] == 'new':
            out.append('ICAI per-paper RTP file: no cover page; attempt printed in the running head')
    elif kind == 'mtp':
        t1 = re.sub(r'\s+', ' ', pg[0][1])[:200] if pg else ''
        m = re.search(r'(Mock Test Paper\s*-\s*Series\s*I+\s*:?[^D]*?)\s*Date of Paper\s*:?\s*([^T]*?)\s*Time', t1)
        if m:
            out.append(f'{m.group(1).strip()}; date of paper {m.group(2).strip()}')
        else:
            m2 = re.search(r'Test Series\s*:?\s*([A-Za-z]+,?\s*20\d\d)\s*MOCK TEST PAPER\s*[-–]?\s*([IV12]+)', t1, re.I)
            if m2:
                out.append(f'printed: Test Series {m2.group(1)}, Mock Test Paper {m2.group(2)}')
        if newp6:
            b = first(pg, r'^\s*PAPER\s*6B\s*:')
            if b:
                out.append(f'6A FM {rng(1, b - 1)}, 6B SM {rng(b, n)}')
    return '; '.join(out)


def old_notes(e, txt, n, lg, st):
    out = []
    src = lg.get('source') or e.get('source') or ''
    att, kind, paper = e['attempt'], e['kind'], e['paper']
    dead = [c for c in e.get('candidates') or [] if 'resource.cdn.icai.org' in c or 'boslive' in c]
    if src.startswith('mirror:'):
        if dead:
            out.append('ICAI\'s own copy is gone: ' + ', '.join(dead) + ' returns 404 and the Wayback Machine holds no '
                       'usable capture (checked 2026-10-20)')
        else:
            out.append('ICAI\'s original file name for this document is not recoverable (its BoS listing page was '
                       'de-linked and not archived); no ICAI or Wayback copy found')
        out.append(f"taken from the mirror {lg.get('url')} (listed on {lg.get('mirror_page')})")
        if 'castudynotes' in src:
            out.append(f"the mirror stamps a diagonal 'www.castudynotes.com' watermark plus 'Downloaded From "
                       f"www.castudynotes.com' / 'Join Us on Telegram' banners on every page; these "
                       f"{st.get('mirror_banner_lines_removed', 0)} banner lines are removed from the .txt (whole-line "
                       f"match only), nothing else changed; the PDF itself is kept as downloaded")
        else:
            out.append('no mirror watermark or banner found in the text layer; the PDF metadata is the original '
                       'Word export, consistent with an unmodified ICAI file')
        out.append('paper and attempt checked by opening the file (running heads / test-series line)')
    elif src == 'wayback':
        out.append(f"ICAI CDN copy now returns 404; taken from the Wayback Machine capture {lg.get('wayback_url')}")
    if kind == 'pyq' and att == 'jul2021' and e['part'] == 'a':
        rng_ = {'p3': 'Paper 3 = PDF pp.53-80 (printed pp.49-76)', 'p6': 'Paper 6 = PDF pp.33-47 (printed pp.29-43)',
                'p8': 'Paper 8 = PDF pp.64-95 (printed pp.60-91)'}[paper]
        out.append('ICAI\'s per-paper July 2021 file (66989/66992/66994bos54005inter-pN.pdf) is 404 with no Wayback '
                   'capture, so this is ICAI\'s own Group-wise Suggested Answers compilation for July 2021 (listed on '
                   'https://www.icai.org/post/15963), whole group in one PDF: ' + rng_ +
                   (' (same file as old/p8/pyq-jul2021-a.pdf)' if paper == 'p6' else
                    ' (same file as old/p6/pyq-jul2021-a.pdf)' if paper == 'p8' else ''))
    if kind == 'rtp' and att == 'jul2021':
        out.append('published by ICAI as the RTP for May 2021; that examination was deferred and held in July 2021')
    if kind == 'rtp' and att == 'dec2021':
        out.append('published by ICAI as the RTP for November 2021; that examination was held in December 2021')
    if kind == 'mtp' and att == 'jul2021':
        out.append('MTP for the May 2021 examination (held July 2021)')
    if kind == 'mtp' and att == 'dec2021':
        out.append('MTP for the November 2021 cycle (held December 2021)')
    if kind == 'pyq' and paper == 'p6' and e['part'] in ('q', 'a'):
        out.append('old Paper 6 carried a separate 30-mark Part I MCQ booklet; ICAI published only the 70-mark '
                   'descriptive part (Q1-6) as question paper and Suggested Answers - no MCQs or MCQ answers')
    if paper == 'p8' and os.path.exists(txt):
        pg = pages_of(txt)
        b = first(pg, r'^\s*(PAPER\s*[-–]?\s*8B\s*:?\s*ECONOMICS|SECTION\s*[-–:]?\s*:?\s*B\b|'
                      r'PART\s*[-–]?\s*B\s*:?\s*ECONOMICS)', 1)
        if paper == 'p8' and att == 'jul2021' and kind == 'pyq' and e['part'] == 'a':
            b = None   # group compilation: page ranges given above
        if b:
            out.append(f'Section A Financial Management (8A) {rng(1, b - 1)}, Section B Economics for Finance (8B) from '
                       f'p.{b} (FM is the part relevant to new P6A)')
    return '; '.join(out)


def main():
    plan = []
    for fn in ('plan-new.json', 'plan-old.json'):
        p = os.path.join(SCR, fn)
        if os.path.exists(p):
            plan += json.load(open(p))
    log = json.load(open(os.path.join(SCR, 'fetchlog.json')))
    tst = json.load(open(os.path.join(SCR, 'textstats.json')))
    npath = os.path.join(TOOLS, 'notes.json')
    notes = json.load(open(npath)) if os.path.exists(npath) else {}
    smq = {}
    for fn in ('manifest-pyq-new.json', 'manifest-rtp-new.json', 'manifest-mtp-new.json'):
        d = json.load(open(os.path.expanduser('~/CA_PERSONAL/sm-qbank/' + fn)))
        smq[fn] = d
    import pymupdf  # noqa: E402  (only needed for page counts)
    out = []
    for e in plan:
        rel = e['dest']
        pdf = os.path.join(Q, rel)
        if not os.path.exists(pdf):
            continue
        lg = log.get(rel, {})
        st = tst.get(rel, {})
        d = pymupdf.open(pdf)
        npages = d.page_count
        if lg.get('source') and e['scheme'] == 'old':
            source = lg['source']
        elif e.get('source'):
            source = e['source']
        elif e.get('copy_from'):
            source = 'copied from ~/CA_PERSONAL/sm-qbank/raw/' + os.path.basename(e['copy_from'])
        elif 'boslive.icai.org' in (e.get('url') or ''):
            source = 'boslive'
        elif 'web.archive.org' in (e.get('url') or ''):
            source = 'wayback'
        else:
            source = 'icai'
        mode = st.get('mode')
        text = 'ocr' if mode == 'ocr' else ('pdf' if mode == 'pdf' else None)
        nl = []
        if e.get('copy_from'):
            lc = lg.get('live_check') or {}
            if lc.get('identical'):
                nl.append(f'byte-identical to the live official file at the url above, re-downloaded {lc["date"]}')
            nl.append('retrieved by the ~/CA_PERSONAL/sm-qbank job on 2026-10-05 (see ~/CA_PERSONAL/sm-qbank/manifest-*-new.json)')
        if e.get('notes'):
            nl.append(e['notes'])
        an = auto_notes(e, pdf[:-4] + '.txt', npages)
        if an:
            nl.append(an)
        if e['scheme'] == 'old':
            on = old_notes(e, pdf[:-4] + '.txt', npages, lg, st)
            if on:
                nl.append(on)
        if text == 'pdf':
            rep = []
            if st.get('rupee'):
                rep.append(f"{st['rupee']} rupee signs (ICAI 'Rupee' font backtick) -> ₹")
            if st.get('pua_mapped'):
                rep.append(f"{st['pua_mapped']} Symbol/Wingdings private-use glyphs -> bullets '-' / maths symbols")
            if st.get('mathfont_mapped'):
                rep.append(f"{st['mathfont_mapped']} mis-mapped Cambria Math brackets/radicals -> ( ) √")
            if st.get('ligatures'):
                rep.append(f"{st['ligatures']} ligatures expanded")
            if rep:
                nl.append('text repairs: ' + ', '.join(rep))
            if st.get('pua_unmapped'):
                nl.append(f"{st['pua_unmapped']} unmapped private-use glyph(s) left as-is ({', '.join(st.get('pua_unmapped_cp', []))})")
            if st.get('empty_pages'):
                nl.append('pages without text layer: ' + ', '.join(map(str, st['empty_pages'])))
        if rel in notes:
            nl.append(notes[rel])
        if not nl:
            nl.append('official file downloaded live from the listing page above')
        out.append({
            'scheme': e['scheme'], 'paper': e['paper'], 'kind': e['kind'], 'attempt': e['attempt'],
            'attempt_label': LABEL.get(e['attempt'], e['attempt']),
            'series': e.get('series'), 'part': e['part'] + ('-' + e['sub'] if e.get('sub') else ''),
            'file': rel, 'url': (lg.get('url') if e['scheme'] == 'old' else None) or e.get('url'),
            'listing': ('https://www.icai.org/post/15963' if 'inter-gp' in (lg.get('url') or '') else
                        e.get('listing') or lg.get('mirror_page')), 'source': source,
            'fetched': lg.get('fetched'), 'sha256': sha(pdf), 'bytes': os.path.getsize(pdf), 'pages': npages,
            'text': text, 'txt': rel[:-4] + '.txt' if os.path.exists(pdf[:-4] + '.txt') else None,
            'notes': '. '.join(x.rstrip('.') for x in nl if x) + ('.' if nl else ''),
        })
    pk = {'p3': 3, 'p4': 4, 'p5': 5, 'p6': 6, 'p8': 8}
    kk = {'pyq': 0, 'rtp': 1, 'mtp': 2}
    out.sort(key=lambda x: (x['scheme'] != 'new', pk[x['paper']], kk[x['kind']], ORDER.index(x['attempt']),
                            x['series'] or '', x['part']))
    with open(os.path.join(Q, 'manifest.json'), 'w') as f:
        json.dump(out, f, indent=1, ensure_ascii=False)
    print(len(out), 'entries')


if __name__ == '__main__':
    main()
