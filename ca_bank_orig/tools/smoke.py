#!/usr/bin/env python3
"""Headless-Chrome end-to-end smoke test: drives the real UI through its self-test (app/js/selftest.js).

    python3 -I tools/smoke.py [demo] [census]     exit 1 on any FAIL

Three passes: the main self-test (profile 'selftest', or 'demo' when asked; your real progress is never touched), a short touch pass in a
Chrome that behaves like a touch-first phone (coarse pointer, no hover: field sizes, tap-to-open tips, the palette's Cancel, dialog focus), and
the nav-fit pass (audit P2-44): the top bar at 704, 764, 768 and 780 px, fresh and with demo data, and at 820, 1100 and 1280 px with demo data,
must keep its last item inside its padding without folding more than it needs.
'census' adds an advisory report of saturated pixels per screen (audit P1-57): it never fails the run.
"""
import os
import re
import shutil
import struct
import subprocess
import sys
import tempfile
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TOUCH = "--blink-settings=primaryPointerType=2,availablePointerTypes=2,primaryHoverType=1,availableHoverTypes=1"
args = sys.argv[1:]
profile = "demo" if "demo" in args else "selftest"


def chrome(url, extra=(), budget=60000, timeout=180):
    """run headless Chrome on url with a private temp dir (Chrome leaves ~0.6 MB per launch in TMPDIR otherwise); returns stdout"""
    tmp = tempfile.mkdtemp(prefix="chrome-")
    try:
        try:
            r = subprocess.run([CH, "--headless=new", "--disable-gpu", "--no-first-run", f"--virtual-time-budget={budget}", *extra, url],
                               capture_output=True, text=True, timeout=timeout, env=dict(os.environ, TMPDIR=tmp))
        except subprocess.TimeoutExpired:
            return ""                   # a Chrome that hung on a busy machine: the caller's retry (or its 'did not finish' line) takes over
        return r.stdout
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def selftest(query, extra=()):
    # the main pass takes about 60 s of page time (its last INFO line says how much): a 150 s virtual-time budget leaves room for new steps
    out = chrome(f"file://{ROOT}/index.html?{query}", (*extra, "--dump-dom"), budget=150000, timeout=300)
    m = re.search(r'<pre id="selftest">(.*?)</pre>', out, re.S)
    if not m:
        print("self-test did not finish; last DOM bytes:", out[-400:])
        sys.exit(2)
    return m.group(1).replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&")


NAVFIT = [(w, p) for w in (704, 764, 768, 780) for p in ("profile=navfit&", "profile=demo&seeddemo=1&")] + \
         [(w, "profile=demo&seeddemo=1&") for w in (820, 1100, 1280)]


def navfit():
    """the nav-fit pass: one Chrome per width (4 at a time); returns the PASS / FAIL / INFO lines"""
    from concurrent.futures import ThreadPoolExecutor

    def one(job):
        w, p = job
        # a busy machine (several Chromes at once) can run out of the virtual-time budget before the check prints: one retry, alone and longer
        for budget in (20000, 45000):
            out = chrome(f"file://{ROOT}/index.html?{p}selftest=1&navfit=1#/", ("--dump-dom", f"--window-size={w},900"), budget=budget, timeout=150)
            m = re.search(r'<pre id="selftest">(.*?)</pre>', out, re.S)
            if m:
                return m.group(1).replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&").replace("\nDONE", "")
        return f"FAIL nav fit at {w} px: the check did not finish"

    with ThreadPoolExecutor(max_workers=4) as ex:
        return list(ex.map(one, NAVFIT))


def png_pixels(path):
    """(width, height, rows of RGB tuples) of an 8-bit RGB/RGBA PNG, decoded with the standard library only"""
    data = Path(path).read_bytes()
    assert data[:8] == b"\x89PNG\r\n\x1a\n"
    pos, idat, w = 8, b"", 0
    while pos < len(data):
        n, kind = struct.unpack(">I4s", data[pos:pos + 8])
        body = data[pos + 8:pos + 8 + n]
        if kind == b"IHDR":
            w, h, depth, ctype = struct.unpack(">IIBB", body[:10])
            assert depth == 8 and ctype in (2, 6), "8-bit RGB or RGBA only"
            bpp = 3 if ctype == 2 else 4
        elif kind == b"IDAT":
            idat += body
        pos += 12 + n
    raw, stride, prev, rows, i = zlib.decompress(idat), w * bpp, bytearray(w * bpp), [], 0
    for _ in range(h):
        f, line = raw[i], bytearray(raw[i + 1:i + 1 + stride]); i += 1 + stride
        for x in range(stride):
            a = line[x - bpp] if x >= bpp else 0
            b, c = prev[x], prev[x - bpp] if x >= bpp else 0
            if f == 1: line[x] = (line[x] + a) & 255
            elif f == 2: line[x] = (line[x] + b) & 255
            elif f == 3: line[x] = (line[x] + ((a + b) >> 1)) & 255
            elif f == 4:
                p = a + b - c; pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
                line[x] = (line[x] + (a if pa <= pb and pa <= pc else b if pb <= pc else c)) & 255
        rows.append(line); prev = line
    return w, h, bpp, rows


def saturated_share(path):
    """share of pixels with HSV saturation >= 0.4 and value >= 0.25 (every 2nd pixel of every 2nd row)"""
    w, h, bpp, rows = png_pixels(path)
    hit = tot = 0
    for y in range(0, h, 2):
        r = rows[y]
        for x in range(0, w * bpp, 2 * bpp):
            mx, mn = max(r[x], r[x + 1], r[x + 2]), min(r[x], r[x + 1], r[x + 2])
            tot += 1
            if mx >= 64 and (mx - mn) / mx >= 0.4:
                hit += 1
    return 100.0 * hit / max(1, tot)


def census():
    """advisory (P1-57): saturated pixels on each screen's first view; the approved home sits near 13.7–15 % at 1440 px. Never a gate."""
    from concurrent.futures import ThreadPoolExecutor
    routes = ["/", "/syllabus", "/pyq", "/test", "/labs", "/map", "/progress", "/plan"]
    rows = [(p, t, w, h) for p in ("", "profile=demo&seeddemo=1&") for t in ("light", "dark") for (w, h) in ((1440, 900),)] + \
           [(p, "light", 500, 844) for p in ("", "profile=demo&seeddemo=1&")]
    tmp = Path(tempfile.mkdtemp(prefix="census-"))

    def shot(job):
        (p, t, w, h), r, k = job
        png = tmp / f"c{k}.png"
        chrome(f"file://{ROOT}/index.html?{p}theme={t}#{r}", ("--hide-scrollbars", "--force-prefers-reduced-motion", "--force-device-scale-factor=0.25",
                                                              f"--window-size={w},{h}", f"--screenshot={png}"), budget=5000, timeout=90)
        try:
            return saturated_share(png) if png.exists() else None
        finally:
            png.unlink(missing_ok=True)

    jobs = [(row, r, k) for k, (row, r) in enumerate((row, r) for row in rows for r in routes)]
    print("\nsaturated-pixel census (advisory, first screen at 1440 and 500 px; not a gate)")
    try:
        with ThreadPoolExecutor(max_workers=4) as ex:
            res = list(ex.map(shot, jobs))
        for n, row in enumerate(rows):
            p, t, w, h = row
            cells = [f"{r} {v:4.1f}%" if v is not None else f"{r} -" for r, v in zip(routes, res[n * len(routes):(n + 1) * len(routes)])]
            print(f"  {'demo ' if p else 'fresh'} {t:5} {w:4}px: " + " · ".join(cells))
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


text = selftest(f"profile={profile}&selftest=1")
print(text)
touch = selftest("profile=selftest-touch&selftest=1&touch=1", (TOUCH,))
print("\n# touch pass (coarse pointer, no hover)\n" + touch)
fit = "\n".join(navfit())
print("\n# nav fit (P2-44)\n" + fit)
lines = (text + "\n" + touch + "\n" + fit).splitlines()
fails = [l for l in lines if l.startswith("FAIL")]
print(f"\n{sum(1 for l in lines if l.startswith('PASS'))} passed, {len(fails)} failed")
if "census" in args:
    census()
sys.exit(1 if fails else 0)
