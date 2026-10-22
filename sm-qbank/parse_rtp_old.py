#!/usr/bin/env python3
"""Extract Section B (Strategic Management) Q&A from old-scheme ICAI Paper-7 RTP PDFs.

Mechanical extraction only: no text is generated, only cleaned/reflowed.
Output: work/<slug>-draft.json  (chapter assignment added later, by hand)
"""
import re, json, os, glob, sys, unicodedata

RAW = "/Users/ztejas/CA_PERSONAL/sm-qbank/raw"
WORK = "/Users/ztejas/CA_PERSONAL/sm-qbank/work"
os.makedirs(WORK, exist_ok=True)

FURN = [
    re.compile(r'^\s*©\s*The Institute of Chartered Accountants of India\s*$'),
    re.compile(r'^\s*(\d{1,3}\s+)?PAPER\s*[–\-—]\s*7\s*:\s*ENTER', re.I),
    re.compile(r'^\s*\d{0,3}\s*INTERMEDIATE.*EXAMINATION', re.I),
    re.compile(r'^\s*\d{1,3}\s*$'),
]
DROP_HEAD = re.compile(
    r'^\s*(Multiple Choice (Questions|Answers)|MULTIPLE CHOICE (QUESTIONS|ANSWERS)|'
    r'Descriptive (Questions|Answers|answers)|Brief answers|Statement type of question.*|'
    r'Short notes|Differences between the two concepts|'
    r'SUGGESTED ANSWERS.*)\s*$')

CHAP_HEAD = re.compile(r'^\s*Chapter\s*(\d+)\s*[-–:]\s*(.+?)\s*$')
GROUP_HEAD = re.compile(r'^\s*(Multiple Choice Questions|MULTIPLE CHOICE QUESTIONS|'
                        r'Descriptive Questions|Descriptive answers|Descriptive Answers|'
                        r'Brief answers|Statement type of question.*|Short notes|'
                        r'Differences between the two concepts)\s*$')

BULLET_PUA = re.compile(r'^(\s*)([-])\s*(.*)$')
BULLET_REAL = re.compile(r'^(\s*)([•●▪◦‣·])\s*(.*)$')

ROM = ['i','ii','iii','iv','v','vi','vii','viii','ix','x','xi','xii','xiii','xiv',
       'xv','xvi','xvii','xviii','xix','xx']
ALPHA = list('abcdefghijklmnopqrstuvwxyz')

LABEL = re.compile(r'^(\s*)\(([A-Za-z]{1,6}|\d{1,2})\)\s*(.*)$')
LABEL_DOT = re.compile(r'^(\s*)([A-Za-z]|\d{1,2})\.\s+(.*)$')


def strip_furniture(lines):
    return [l for l in lines if not any(p.search(l) for p in FURN)]


def norm_bullets(lines):
    out = []
    for l in lines:
        m = BULLET_PUA.match(l)
        if m:
            out.append(m.group(1) + '• ' + m.group(3)); continue
        m = BULLET_REAL.match(l)
        if m:
            out.append(m.group(1) + '• ' + m.group(3)); continue
        # stray PUA chars anywhere
        l = re.sub(r'[-]', '', l)
        out.append(l)
    return out


def label_of(line):
    """Return (indent, label, kind, text) or None."""
    m = LABEL.match(line)
    if m:
        ind, lab, txt = len(m.group(1)), m.group(2), m.group(3)
    else:
        m = LABEL_DOT.match(line)
        if not m:
            return None
        ind, lab, txt = len(m.group(1)), m.group(2), m.group(3)
    if lab.isdigit():
        kind = 'num'
    elif lab.lower() in ROM and lab.islower():
        kind = 'roman_l'
    elif lab.lower() in ROM and lab.isupper():
        kind = 'roman_u'
    elif lab.islower() and len(lab) == 1:
        kind = 'alpha_l'
    elif lab.isupper() and len(lab) == 1:
        kind = 'alpha_u'
    else:
        return None
    return (ind, lab, kind, txt)


def clean_text(s):
    s = s.replace(' ', ' ')
    s = re.sub(r'(\w)-\s+(?=[a-z])', r'\1-', s)      # need- based -> need-based
    s = re.sub(r'(\w)\s+-(?=[a-z])', r'\1-', s)      # plant -based -> plant-based
    s = re.sub(r'[ \t]{2,}', ' ', s)
    s = re.sub(r'\s+([,.;:?!])', r'\1', s)
    return s.strip()


def reflow(lines):
    """Join wrapped lines into paragraphs. lines: list of raw (indented) strings."""
    lines = [l for l in lines if l.strip()]
    if not lines:
        return ''
    ends = sorted(len(l.rstrip()) for l in lines)
    maxcol = ends[int(len(ends) * 0.9)] if ends else 100
    thresh = maxcol - 12
    paras = []
    cur = []
    prev_raw = None
    prev_body_ind = None
    prev_was_label = False
    for l in lines:
        raw = l.rstrip()
        ind = len(raw) - len(raw.lstrip())
        txt = raw.strip()
        is_bul = txt.startswith('•')
        lab = label_of(raw)
        is_lab = lab is not None
        if not cur:
            newp = True
        elif is_bul or is_lab:
            newp = True
        elif prev_body_ind is not None and ind < prev_body_ind - 3:
            newp = True
        elif len(prev_raw) < thresh and re.search(r'[.:;?!”"\')\]]$', prev_raw):
            newp = True
        elif prev_was_label and len(prev_raw) < thresh:
            newp = True
        else:
            newp = False
        if newp:
            if cur:
                paras.append(' '.join(cur))
            cur = [txt]
            prev_body_ind = None
        else:
            cur.append(txt)
            if prev_body_ind is None:
                prev_body_ind = ind
        prev_raw = raw
        prev_was_label = is_lab or is_bul
    if cur:
        paras.append(' '.join(cur))
    paras = [clean_text(p) for p in paras]
    paras = [p for p in paras if p]
    return '\n'.join(paras)


def split_top_items(lines, start_no=1):
    """Split into top-level numbered items using sequential numbering."""
    items = []
    cur = None
    expect = start_no
    pre = []
    for l in lines:
        s = l.strip()
        m = re.match(r'^(\s{0,12})(\d{1,2})\s*[.)]?\s+(\S.*)$', l)
        m2 = re.match(r'^\s*Answer\s+(\d{1,2})\s*$', l)
        if m2 and int(m2.group(1)) == expect:
            if cur: items.append(cur)
            cur = {'no': expect, 'lines': []}
            expect += 1
            continue
        mnum_only = re.match(r'^(\s{0,12})(\d{1,2})\s*[.)]\s*$', l)
        if mnum_only and int(mnum_only.group(2)) == expect:
            if cur: items.append(cur)
            cur = {'no': expect, 'lines': []}
            expect += 1
            continue
        if m and int(m.group(2)) == expect:
            if cur: items.append(cur)
            cur = {'no': expect, 'lines': [' ' * (len(m.group(1)) + 5) + m.group(3)]}
            expect += 1
            continue
        if cur is None:
            pre.append(l)
        else:
            cur['lines'].append(l)
    if cur: items.append(cur)
    return pre, items


def parse_qblock(lines):
    """Return list of item dicts with group/chapter context."""
    group = None
    chap = None
    mode = 'descriptive'
    ctx = []
    clean = []
    for l in lines:
        mc = CHAP_HEAD.match(l)
        mg = GROUP_HEAD.match(l)
        if mc:
            chap = f"Chapter {mc.group(1)}-{mc.group(2)}"
            mode = 'descriptive'
            ctx.append(('ctx', group, chap, mode))
            clean.append(None)
            continue
        if mg:
            g = mg.group(1)
            if 'Multiple Choice' in g or 'MULTIPLE CHOICE' in g:
                mode = 'mcq'; group = 'Multiple Choice Questions'
            else:
                mode = 'descriptive'; group = g
                chap = None if g.startswith('Descriptive') else chap
            ctx.append(('ctx', group, chap, mode))
            clean.append(None)
            continue
        clean.append(l)
    # re-walk keeping context per line
    group = None; chap = None; mode = 'descriptive'
    annotated = []
    for l in lines:
        mc = CHAP_HEAD.match(l); mg = GROUP_HEAD.match(l)
        if mc:
            chap = f"Chapter {mc.group(1)}-{mc.group(2)}"; mode = 'descriptive'; continue
        if mg:
            g = mg.group(1)
            if 'ultiple' in g or 'ULTIPLE' in g:
                mode = 'mcq'; group = 'Multiple Choice Questions'
            else:
                mode = 'descriptive'; group = g
                if g.lower().startswith('descriptive'):
                    pass
            continue
        annotated.append((l, group, chap, mode))

    pre, items = split_top_items([a[0] for a in annotated])
    # map item start -> context by matching line objects positionally
    idx = 0
    ann_lines = [a[0] for a in annotated]
    pos = 0
    for it in items:
        # find the position of this item's first content: search forward for the number
        while pos < len(ann_lines):
            l = ann_lines[pos]
            m = re.match(r'^(\s{0,12})(\d{1,2})\s*[.)]?\s+\S', l)
            mn = re.match(r'^(\s{0,12})(\d{1,2})\s*[.)]\s*$', l)
            ma = re.match(r'^\s*Answer\s+(\d{1,2})\s*$', l)
            num = None
            if m: num = int(m.group(2))
            elif mn: num = int(mn.group(2))
            elif ma: num = int(ma.group(1))
            if num == it['no']:
                it['group'] = annotated[pos][1]
                it['chapter_head'] = annotated[pos][2]
                it['mode'] = annotated[pos][3]
                pos += 1
                break
            pos += 1
        else:
            it['group'] = None; it['chapter_head'] = None; it['mode'] = 'descriptive'
    return items


def subparts(lines, want_kinds=('alpha_l',), min_count=2):
    """Split lines into subparts at the shallowest label indent."""
    labs = [(i, label_of(l)) for i, l in enumerate(lines)]
    labs = [(i, x) for i, x in labs if x]
    if not labs:
        return None
    minind = min(x[1][0] for x in labs)
    def is_alpha(x):
        return len(x[1]) == 1 and x[1].islower() and x[1].isalpha()
    if want_kinds == ('alpha_l',):
        sel = [(i, x) for i, x in labs if x[0] <= minind + 2 and is_alpha(x)]
    else:
        sel = [(i, x) for i, x in labs if x[0] <= minind + 2 and x[2] in want_kinds]
    if len(sel) < min_count:
        return None
    # must be a consecutive sequence from the start of the alphabet
    seq = [x[1] for i, x in sel]
    exp = ALPHA[:len(seq)] if want_kinds == ('alpha_l',) else ROM[:len(seq)]
    if seq != exp:
        return None
    out = []
    for k, (i, x) in enumerate(sel):
        end = sel[k + 1][0] if k + 1 < len(sel) else len(lines)
        body = [' ' * (x[0] + 4) + x[3]] + lines[i + 1:end]
        out.append({'label': x[1], 'lines': body})
    head = lines[:sel[0][0]]
    return head, out


def last_option_run(lines):
    """Find trailing run of option labels; return (option_list, cut_index)."""
    labs = [(i, label_of(l)) for i, l in enumerate(lines)]
    labs = [(i, x) for i, x in labs if x]
    if not labs:
        return None, len(lines)
    best = None
    for alphabet, kinds in ((ALPHA, ('alpha_l',)),
                            (list('ABCDEFGHIJ'), ('alpha_u',)),
                            ([str(n) for n in range(1, 10)], ('num',))):
        sel = [(i, x) for i, x in labs if x[2] in kinds]
        if len(sel) < 3:
            continue
        # walk from the end, collecting a descending consecutive run
        run = []
        want = None
        for i, x in reversed(sel):
            if want is None:
                if x[1] not in alphabet:
                    continue
                k = alphabet.index(x[1])
                if k < 2:
                    continue
                run = [(i, x)]
                want = k - 1
            else:
                if x[1] == alphabet[want]:
                    run.append((i, x)); want -= 1
                    if want < 0:
                        break
                else:
                    break
        run = list(reversed(run))
        if len(run) >= 3 and run[0][1][1] == alphabet[0]:
            if best is None or run[0][0] > best[0][0]:
                best = run
    if not best:
        return None, len(lines)
    opts = []
    for k, (i, x) in enumerate(best):
        end = best[k + 1][0] if k + 1 < len(best) else len(lines)
        opts.append({'label': x[1], 'text': reflow([' ' * (x[0] + 4) + x[3]] + lines[i + 1:end])})
    return opts, best[0][0]


def mcq_subquestions(lines):
    labs = [(i, label_of(l)) for i, l in enumerate(lines)]
    labs = [(i, x) for i, x in labs if x]
    if not labs:
        return None
    minind = min(x[1][0] for x in labs)
    near = [(i, x) for i, x in labs if x[0] <= minind + 4]
    rom = [(i, x) for i, x in near if x[2] == 'roman_l']
    if len(rom) >= 3 and [x[1] for i, x in rom] == ROM[:len(rom)]:
        sel = rom
    else:
        alp = [(i, x) for i, x in near
               if len(x[1]) == 1 and x[1].islower() and x[1].isalpha()]
        if len(alp) >= 6 and [x[1] for i, x in alp] == ALPHA[:len(alp)]:
            sel = alp
        else:
            return None
    out = []
    for k, (i, x) in enumerate(sel):
        end = sel[k + 1][0] if k + 1 < len(sel) else len(lines)
        out.append({'label': x[1], 'lines': [' ' * (x[0] + 4) + x[3]] + lines[i + 1:end]})
    return lines[:sel[0][0]], out


def extract(path, slug, attempt, sort, pdf_url, mirror_note):
    L = open(path, encoding='utf-8').read().split('\n')
    si = next(i for i, l in enumerate(L)
              if re.search(r'SECTION\s*[–\-—]?\s*B\s*:?\s*STRATEGIC\s+MANAGEMENT', l, re.I))
    ai = next(i for i, l in enumerate(L) if i > si and re.match(r'\s*SUGGESTED\s+ANSWERS', l, re.I))
    q = norm_bullets(strip_furniture(L[si + 1:ai]))
    a = norm_bullets(strip_furniture(L[ai + 1:]))
    a = [l for l in a if not DROP_HEAD.match(l)]

    qitems = parse_qblock(q)
    _, aitems = split_top_items(a)
    amap = {it['no']: it['lines'] for it in aitems}

    records = []
    for it in qitems:
        no = it['no']
        alines = amap.get(no, [])
        mode = it.get('mode', 'descriptive')
        if mode == 'mcq':
            sub = mcq_subquestions(it['lines'])
            if sub:
                head, subs = sub
                scen = reflow(head)
                for k, sq in enumerate(subs):
                    opts, cut = last_option_run(sq['lines'])
                    qtxt = reflow(sq['lines'][:cut])
                    rec = {
                        'qno': f"{no}({sq['label']})",
                        'kind': 'case-mcq' if scen and len(scen) > 400 else 'mcq',
                        'group': it.get('group'), 'chapter_head': it.get('chapter_head'),
                        'question': (
                            (scen + '\n\n' + qtxt) if (scen and len(scen) > 400 and k == 0)
                            else (f"[Shared case scenario — see question {no}({subs[0]['label']}).]\n" + qtxt)
                            if (scen and len(scen) > 400)
                            else ((scen + '\n' + qtxt) if scen else qtxt)),
                        'options': opts, 'answer': '', 'mcq_answer': None,
                        'sub': sq['label'], 'scenario_len': len(scen),
                    }
                    records.append(rec)
                # answers
                atext = ' '.join(x.strip() for x in alines)
                pos = 0
                for k, sq in enumerate(subs):
                    pat = re.compile(r'\(\s*' + re.escape(sq['label']) + r'\s*\)\s*\(?\s*([A-Ea-e])\s*\)?')
                    m = pat.search(atext, pos)
                    if m:
                        records[-len(subs) + k]['mcq_answer'] = m.group(1)
                        pos = m.end()
            else:
                opts, cut = last_option_run(it['lines'])
                qtxt = reflow(it['lines'][:cut])
                atext = ' '.join(x.strip() for x in alines)
                m = re.match(r'^\(?\s*([A-Ea-e])\s*\)?', atext.strip())
                records.append({
                    'qno': str(no), 'kind': 'mcq', 'group': it.get('group'),
                    'chapter_head': it.get('chapter_head'), 'question': qtxt,
                    'options': opts, 'answer': '', 'mcq_answer': m.group(1) if m else None,
                    'sub': None, 'scenario_len': 0,
                })
        else:
            sp = subparts(it['lines'], ('alpha_l',), 2)
            asp = subparts(alines, ('alpha_l',), 2) if alines else None
            if sp and asp and len(sp[1]) == len(asp[1]):
                stem = reflow(sp[0]) if sp[0] else ''
                ahead = reflow(asp[0]) if asp[0] else ''
                for qs, as_ in zip(sp[1], asp[1]):
                    records.append({
                        'qno': f"{no}({qs['label']})",
                        'kind': 'descriptive', 'group': it.get('group'),
                        'chapter_head': it.get('chapter_head'),
                        'question': ((stem + ' ') if stem else '') + reflow(qs['lines']),
                        'options': None,
                        'answer': ((ahead + '\n') if ahead else '') + reflow(as_['lines']),
                        'mcq_answer': None, 'sub': qs['label'], 'scenario_len': 0,
                    })
            else:
                records.append({
                    'qno': str(no), 'kind': 'descriptive', 'group': it.get('group'),
                    'chapter_head': it.get('chapter_head'),
                    'question': reflow(it['lines']), 'options': None,
                    'answer': reflow(alines), 'mcq_answer': None,
                    'sub': None, 'scenario_len': 0,
                })

    out = {
        'source': {
            'type': 'RTP', 'attempt': attempt, 'attempt_sort': sort, 'series': None,
            'scheme': 'old', 'paper': 'Paper 7B: Strategic Management',
            'pdf_url': pdf_url, 'local_file': f'raw/rtp-old-{slug}-p7.pdf',
            'retrieved': '2026-10-05', 'extract_ok': True, 'notes': mirror_note,
        },
        'questions': records,
    }
    with open(f'{WORK}/{slug}-draft.json', 'w', encoding='utf-8') as fh:
        json.dump(out, fh, ensure_ascii=False, indent=1)
    return out


META = {
 'may2018':  ('May 2018','2018-05','https://drive.google.com/uc?id=1HD9lJhMgFJj2wOXUaB3GlLLLC8WQtBK8&export=download'),
 'nov2018':  ('November 2018','2018-11','https://drive.google.com/uc?id=1_w382dSA2mU4TvA9mPVJCkkImN1oALSO&export=download'),
 'may2019':  ('May 2019','2019-05','https://drive.google.com/uc?id=1TOEejxUFqeLWfnw8wQeXrbZkmhqehvFX&export=download'),
 'nov2019':  ('November 2019','2019-11','https://cacult.com/wp-content/uploads/2021/05/rtp-nov-19-7.pdf'),
 'may2020':  ('May 2020','2020-05','https://cacult.com/wp-content/uploads/2021/05/rtp-may-20-6.pdf'),
 'nov2020':  ('November 2020','2020-11','https://cacult.com/wp-content/uploads/2021/05/rtp-nov-20-8.pdf'),
 'july2021': ('July 2021','2021-07','https://cacult.com/wp-content/uploads/2021/05/rtp-may-21-6.pdf'),
 'dec2021':  ('December 2021','2021-12','https://cacult.com/wp-content/uploads/2021/08/7-RTP-NOV-21-1.pdf'),
 'may2022':  ('May 2022','2022-05','https://cacult.com/wp-content/uploads/2022/03/SM-May-2022.pdf'),
 'nov2022':  ('November 2022','2022-11','https://cacult.com/wp-content/uploads/2022/10/Exam-7-IPC.pdf'),
 'may2023':  ('May 2023','2023-05','https://cacult.com/wp-content/uploads/2023/03/7..pdf'),
 'nov2023':  ('November 2023','2023-11','https://cacult.com/wp-content/uploads/2023/10/EIS.pdf'),
}
NOTE_CACULT = ('Mirror: CA Cult (https://cacult.com/rtps-ca-intermediate-course/), which hosts the '
               'official ICAI RTP PDF. Not retrieved from an icai.org URL.')
NOTE_CSW = ('Mirror: CA Study Web (https://castudyweb.com/ca-inter-rtp/) Google Drive copy of the '
            'official ICAI RTP PDF. Not retrieved from an icai.org URL.')

if __name__ == '__main__':
    for slug, (att, srt, url) in META.items():
        note = NOTE_CSW if 'drive.google' in url else NOTE_CACULT
        o = extract(f'{RAW}/rtp-old-{slug}-p7.txt', slug, att, srt, url, note)
        print(f"{slug:9s} {len(o['questions']):3d} records")
