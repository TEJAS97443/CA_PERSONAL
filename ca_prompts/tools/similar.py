#!/usr/bin/env python3
"""Flag lesson examples/quiz questions that look like near-copies of ICAI questions or SM exercises.
    python3 -I ~/CA_PERSONAL/ca_prompts/tools/similar.py [paper ...]  -> ~/CA_PERSONAL/ca_prompts/similar.json + summary
Heuristic: 5-word shingle Jaccard-containment and shared distinctive numbers between each lesson block
(example prompt or quiz question) and sliding windows of ICAI question/SM text."""
import json, os, re, sys, glob
HOME = os.path.expanduser('~')
LES = os.path.join(HOME, 'CA_PERSONAL/ca_passbook/content/subjects')
QDIR = os.path.join(HOME, 'CA_PERSONAL/ca_sources/q')
SMDIR = os.path.join(HOME, 'CA_PERSONAL/ca_sources/sm')
PMAP = {'cma': (['new/p4', 'old/p3'], 'p4'), 'aud': (['new/p5', 'old/p6'], 'p5'), 'fm': (['new/p6', 'old/p8'], 'p6a'), 'sm': (['new/p6'], 'p6b')}
W = re.compile(r"[A-Za-z]+|\d[\d,\.]*")
STOPCAP = set()
def toks(s):
    out = []
    for m in W.finditer(s):
        t = m.group(0)
        if t[0].isdigit():
            out.append('#')
        elif t[0].isupper() and len(t) > 1 and not t.isupper():
            continue          # names change between copies: ignore capitalised words
        else:
            out.append(t.lower())
    return out
def rawnums(s): return {x.replace(',', '') for x in re.findall(r"\d[\d,\.]*", s)}
def shingles(t, k=6): return {' '.join(t[i:i+k]) for i in range(len(t)-k+1)}
def nums(t): return set()
def blocks(md):
    out = []
    lines = md.split('\n')
    i = 0
    while i < len(lines):
        m = re.match(r'^(:{3,})\s*example\s*(.*)$', lines[i])
        if m:
            buf = [m.group(2)]; i += 1
            while i < len(lines) and not re.match(r'^:{3,}\s*(answer|solution)', lines[i]):
                buf.append(lines[i]); i += 1
            out.append(('example', m.group(2).strip(), '\n'.join(buf)))
            continue
        m = re.match(r'^Q:(?!:)\s*(.*)$', lines[i])
        if m:
            buf = [m.group(1)]; i += 1
            while i < len(lines) and lines[i].strip() and not lines[i].startswith('>'):
                buf.append(lines[i]); i += 1
            out.append(('quiz', m.group(1)[:60], '\n'.join(buf)))
            continue
        i += 1
    return out
def corpus(paper):
    dirs, sm = PMAP[paper]
    docs = []
    for d in dirs:
        for f in glob.glob(os.path.join(QDIR, d, '*.txt')):
            docs.append((os.path.relpath(f, QDIR), open(f, errors='ignore').read()))
    for f in glob.glob(os.path.join(SMDIR, sm, 'txt', '*.txt')):
        txt = open(f, errors='ignore').read()
        k = txt.upper().find('TEST YOUR KNOWLEDGE')   # only the chapter's own exercises, not its body text
        if k >= 0:
            docs.append(('sm-tyk/' + os.path.relpath(f, SMDIR), txt[k:]))
    wins = []
    for name, txt in docs:
        t = toks(txt)
        for s in range(0, max(1, len(t) - 400), 150):
            w = t[s:s+400]
            wins.append((name, s, shingles(w), nums(w)))
    from collections import Counter
    dfs, dfn = Counter(), Counter()
    for _, _, sh, nu in wins:
        dfs.update(sh); dfn.update(nu)
    common_s = {k for k, v in dfs.items() if v > 6}
    common_n = {k for k, v in dfn.items() if v > 15}
    wins = [(n, s, sh - common_s, nu - common_n) for n, s, sh, nu in wins]
    return wins, common_s, common_n
def main():
    papers = sys.argv[1:] or list(PMAP)
    res = []
    for p in papers:
        wins, common_s, common_n = corpus(p)
        for f in sorted(glob.glob(os.path.join(LES, p, '*.md'))):
            lid = os.path.basename(f)[:-3]
            for kind, title, text in blocks(open(f).read()):
                t = toks(text)
                sh, nu = shingles(t) - common_s, nums(t) - common_n
                if len(sh) < 8: continue
                best = None
                for name, s, wsh, wnu in wins:
                    c = len(sh & wsh) / len(sh)
                    n = len(nu & wnu)
                    score = c + 0.08 * n
                    if best is None or score > best[0]:
                        best = (score, c, n, name, s)
                if best and (best[1] >= 0.20 or best[2] >= 5):
                    res.append({'lesson': lid, 'kind': kind, 'title': title, 'containment': round(best[1], 2), 'shared_numbers': best[2], 'source': best[3], 'offset': best[4]})
    out = os.path.join(HOME, 'CA_PERSONAL/ca_prompts', 'similar-' + '-'.join(papers) + '.json')
    json.dump(res, open(out, 'w'), indent=1)
    print('wrote', out)
    by = {}
    for r in res: by.setdefault(r['lesson'], []).append(r)
    print(len(res), 'flagged blocks in', len(by), 'lessons')
    for l, rs in sorted(by.items(), key=lambda x: -len(x[1]))[:40]:
        print(f"{l:28} {len(rs)}  " + '; '.join(f"{r['kind']}:{r['containment']}/{r['shared_numbers']}" for r in rs[:4]))
if __name__ == '__main__': main()
