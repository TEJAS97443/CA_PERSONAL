#!/usr/bin/env python3
"""Write <pdf>.txt (page.get_text("text") with '=== p.N ===' markers) for text-layer PDFs.

Usage: ~/DSA_PERSONAL/gate_cse/.venv/bin/python -I extract_text.py REGEX [--min-chars 40]
Only PDFs under ~/CA_PERSONAL/ca_sources/q whose relative path matches REGEX. PDFs that look scanned (most pages
without a text layer) are skipped and listed as NEEDS-OCR (use ocr_pdf.py for them).

Glyph repairs (font-aware; the PDF text layer is otherwise left exactly as PyMuPDF returns it):
- Symbol/Wingdings bullets in the private-use area (U+F0B7, U+F0A8, U+F0A7, U+F0D8, Wingdings U+F06C,
  U+F076, U+F09F, U+F0FC) -> '-'
- Symbol-font private-use maths glyphs -> their Unicode equivalents (x, therefore, beta, brackets,
  bracket/brace extension pieces U+239B-U+23AD)
- '`' drawn in ICAI's 'Rupee' font -> '₹' (ICAI typesets the rupee sign as a backtick in that font)
- Cambria Math glyphs mis-mapped to Ethiopic/Malayalam/Sinhala code points -> ( ) and √; a Times New
  Roman Arabic-yeh bullet -> '-'; typographic ligatures (U+FB00-FB04) -> plain letters
Per-page: if a code point appears in more than one font class on the page, the page text is rebuilt
from spans so that each glyph gets its own font's mapping.
Stats are merged into ~/CA_PERSONAL/ca_sources/q/_scratch/textstats.json.
"""
import glob
import json
import os
import re
import sys

import pymupdf

Q = os.path.expanduser('~/CA_PERSONAL/ca_sources/q')
STATS = os.path.join(Q, '_scratch', 'textstats.json')

BULLET = '-'
SYMBOL = {
    0xF020: ' ', 0xF028: '(', 0xF029: ')', 0xF02A: '*', 0xF02E: '.', 0xF030: '0', 0xF031: '1', 0xF032: '2',
    0xF033: '3', 0xF034: '4', 0xF035: '5', 0xF036: '6', 0xF037: '7', 0xF038: '8', 0xF039: '9',
    0xF044: 'Δ', 0xF0BB: '≈', 0xF06F: 'ο', 0xF070: 'π', 0xF0B9: '≠', 0xF0B0: '°',
    0xF02B: '+', 0xF05B: '[', 0xF05C: '∴', 0xF05D: ']', 0xF062: 'β', 0xF0B4: '×', 0xF0B8: '÷',
    0xF0B7: BULLET, 0xF0A8: BULLET, 0xF0A3: '≤', 0xF0B3: '≥', 0xF0B1: '±', 0xF0D6: '√', 0xF0E5: '∑',
    0xF0AE: '→', 0xF0DE: '⇒', 0xF061: 'α', 0xF073: 'σ', 0xF06D: 'μ', 0xF0A5: '∞', 0xF02D: '−', 0xF03D: '=',
    0xF0E6: '⎛', 0xF0E7: '⎜', 0xF0E8: '⎝', 0xF0E9: '⎡', 0xF0EA: '⎢', 0xF0EB: '⎣', 0xF0EC: '⎧',
    0xF0ED: '⎨', 0xF0EE: '⎩', 0xF0EF: '⎪', 0xF0F6: '⎞', 0xF0F7: '⎟', 0xF0F8: '⎠', 0xF0F9: '⎤',
    0xF0FA: '⎥', 0xF0FB: '⎦', 0xF0FC: '⎫', 0xF0FD: '⎬', 0xF0FE: '⎭',
    0xF8E7: '⎯', 0xF8EB: '⎛', 0xF8EC: '⎜', 0xF8ED: '⎝', 0xF8EE: '⎡', 0xF8EF: '⎢', 0xF8F0: '⎣',
    0xF8F6: '⎞', 0xF8F7: '⎟', 0xF8F8: '⎠', 0xF8F9: '⎤', 0xF8FA: '⎥', 0xF8FB: '⎦',
    0xF8F1: '⎧', 0xF8F2: '⎨', 0xF8F3: '⎩', 0xF8F4: '⎪', 0xF8FC: '⎫', 0xF8FD: '⎬', 0xF8FE: '⎭',
}
WING = {0xF06C: BULLET, 0xF076: BULLET, 0xF09F: BULLET, 0xF0A7: BULLET, 0xF0D8: BULLET, 0xF0FC: BULLET,
        0xF0A8: BULLET, 0xF0B7: BULLET, 0xF06E: BULLET, 0xF071: BULLET, 0xF075: BULLET, 0xF0B2: BULLET,
        0xF06F: BULLET, 0xF0A2: BULLET, 0xF09E: BULLET, 0xF0E8: BULLET, 0xF0F0: BULLET}
OTHER_PUA = {0xF0B7: BULLET, 0xF0A8: BULLET, 0xF06C: BULLET}   # bullets in other fonts (e.g. SegoeUI)
# Cambria Math glyphs whose ToUnicode entries point at unrelated scripts (checked against rendered pages):
# Ethiopic/Malayalam code points are big parentheses, Sinhala ones are radical signs.
CAMBRIA = {'\u1240': '(', '\u1241': ')', '\u1246': '(', '\u1247': ')', '\u0d6c': '(', '\u0d70': ')',
           '\u0da7': '√', '\u0da8': '√'}
TNR = {'\u064a': BULLET}    # Arabic yeh used as a bullet glyph in a Times New Roman span
SPECIAL = set(CAMBRIA) | set(TNR) | {'`'}
# banner lines stamped on every page by the castudynotes.com mirror (not ICAI text) - removed as whole lines
BANNERS = {'www.castudynotes.com', 'Downloaded From www.castudynotes.com',
           'Join Us on Telegram http://t.me/canotes_ipcc'}
LIG = {'\ufb00': 'ff', '\ufb01': 'fi', '\ufb02': 'fl', '\ufb03': 'ffi', '\ufb04': 'ffl'}   # typographic ligatures


def fclass(font):
    f = font.split('+')[-1].lower()
    if 'rupee' in f:
        return 'rupee'
    if 'wingding' in f:
        return 'wing'
    if 'symbol' in f:
        return 'symbol'
    if 'cambriamath' in f:
        return 'cambria'
    if 'timesnewroman' in f:
        return 'tnr'
    return 'other'


def mapchar(ch, fc):
    o = ord(ch)
    if ch == '`':
        return '₹' if fc == 'rupee' else ch
    if fc == 'cambria' and ch in CAMBRIA:
        return CAMBRIA[ch]
    if fc == 'tnr' and ch in TNR:
        return TNR[ch]
    if 0xE000 <= o <= 0xF8FF:
        table = {'symbol': SYMBOL, 'wing': WING}.get(fc, OTHER_PUA)
        return table.get(o, ch)
    return ch


def page_text(p, st):
    text = p.get_text('text')
    dd = p.get_text('rawdict')
    use = {}       # char -> set(font classes)
    for b in dd['blocks']:
        for ln in b.get('lines', []):
            for s in ln['spans']:
                fc = fclass(s['font'])
                for c in s['chars']:
                    ch = c['c']
                    if ch in SPECIAL or 0xE000 <= ord(ch) <= 0xF8FF:
                        use.setdefault(ch, set()).add(fc)
    if not use:
        return text
    if all(len(v) == 1 for v in use.values()):
        for ch, fcs in use.items():
            rep = mapchar(ch, next(iter(fcs)))
            n = text.count(ch)
            if rep != ch:
                key = 'rupee' if ch == '`' else ('pua_mapped' if 0xE000 <= ord(ch) <= 0xF8FF else 'mathfont_mapped')
                st[key] = st.get(key, 0) + n
                text = text.replace(ch, rep)
            elif 0xE000 <= ord(ch) <= 0xF8FF:
                st['pua_unmapped'] = st.get('pua_unmapped', 0) + n
                st.setdefault('pua_unmapped_cp', []).append('%04X' % ord(ch))
        return text
    # mixed fonts for the same code point: rebuild from spans
    st['span_rebuilt_pages'] = st.get('span_rebuilt_pages', []) + [p.number + 1]
    out = []
    for b in dd['blocks']:
        if b['type'] != 0:
            continue
        for ln in b['lines']:
            s_out = ''
            for s in ln['spans']:
                fc = fclass(s['font'])
                for c in s['chars']:
                    ch = c['c']
                    rep = mapchar(ch, fc)
                    if rep != ch:
                        key = 'rupee' if ch == '`' else ('pua_mapped' if 0xE000 <= ord(ch) <= 0xF8FF else 'mathfont_mapped')
                        st[key] = st.get(key, 0) + 1
                    elif 0xE000 <= ord(ch) <= 0xF8FF:
                        st['pua_unmapped'] = st.get('pua_unmapped', 0) + 1
                    s_out += rep
            out.append(s_out + '\n')
    return ''.join(out)


def main():
    rx = re.compile(sys.argv[1])
    minc = int(sys.argv[sys.argv.index('--min-chars') + 1]) if '--min-chars' in sys.argv else 40
    stats = json.load(open(STATS)) if os.path.exists(STATS) else {}
    for f in sorted(glob.glob(os.path.join(Q, '*', '*', '*.pdf'))):
        rel = os.path.relpath(f, Q)
        if not rx.search(rel):
            continue
        d = pymupdf.open(f)
        if os.path.exists(os.path.join(Q, '_scratch', 'ocr', rel, 'map.json')):
            print('OCR-ALREADY', rel, '(text comes from ocr_pdf.py; not overwritten)')
            stats[rel] = {'mode': 'ocr', 'pages': d.page_count}
            continue
        lens = [len(p.get_text('text').strip()) for p in d]
        empty = [i + 1 for i, x in enumerate(lens) if x < minc]
        if len(empty) > d.page_count / 2:
            print('NEEDS-OCR', rel, f'{len(empty)}/{d.page_count} pages without text')
            stats[rel] = {'mode': 'needs-ocr', 'pages': d.page_count, 'empty_pages': empty}
            continue
        st = {'mode': 'pdf', 'pages': d.page_count, 'empty_pages': empty}
        parts = []
        for p in d:
            parts.append(f'=== p.{p.number + 1} ===\n')
            t = page_text(p, st)
            kept = []
            for ln in t.split('\n'):
                if ln.strip() in BANNERS:
                    st['mirror_banner_lines_removed'] = st.get('mirror_banner_lines_removed', 0) + 1
                else:
                    kept.append(ln)
            t = '\n'.join(kept)
            nlig = sum(t.count(k) for k in LIG)
            if nlig:
                st['ligatures'] = st.get('ligatures', 0) + nlig
                for k, v in LIG.items():
                    t = t.replace(k, v)
            parts.append(t if t.endswith('\n') or not t else t + '\n')
        if 'pua_unmapped_cp' in st:
            st['pua_unmapped_cp'] = sorted(set(st['pua_unmapped_cp']))
        with open(f[:-4] + '.txt', 'w') as fo:
            fo.write(''.join(parts))
        stats[rel] = st
        print('TXT', rel, {k: v for k, v in st.items() if k not in ('mode',)})
    with open(STATS, 'w') as fo:
        json.dump(stats, fo, indent=1)


if __name__ == '__main__':
    main()
