#!/usr/bin/env python3
"""Render a lesson to PNG slices you can look at (agents: use the Read tool on the printed paths).

    .venv/bin/python tools/preview_lesson.py content/subjects/os/os.sched.rr.md [--dark] [--width 900] [--slice 1500]

Writes /tmp/preview/<lesson-id>-<n>.png. Uses headless Chrome; takes about 5 seconds.
"""
import subprocess, tempfile, os, shutil
_ctmp = tempfile.mkdtemp(prefix="chrome-")
chrome_env = dict(os.environ, TMPDIR=_ctmp)
import atexit; atexit.register(lambda: shutil.rmtree(_ctmp, ignore_errors=True))
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
args = [a for a in sys.argv[1:] if not a.startswith("--")]
src = Path(args[0]).resolve()
dark = "--dark" in sys.argv
width = int(sys.argv[sys.argv.index("--width") + 1]) if "--width" in sys.argv else 900
slice_h = int(sys.argv[sys.argv.index("--slice") + 1]) if "--slice" in sys.argv else 1500
out = Path("/tmp/preview"); out.mkdir(exist_ok=True)
html = out / f"{src.stem}.html"
subprocess.run(["node", str(ROOT / "tools" / "render_lesson_html.js"), str(src), str(html), "dark" if dark else "light"], check=True)
png = out / f"{src.stem}-full.png"
CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
png.unlink(missing_ok=True)     # so a timeout below can never pick up a stale screenshot
try:    # Chrome can be slow on a loaded machine; the PNG is often written before the timeout, so keep going if it exists
    subprocess.run([CH, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", f"--window-size={width},30000",
                    "--virtual-time-budget=4000", f"--screenshot={png}", f"file://{html}"], capture_output=True, timeout=400, env=chrome_env)
except subprocess.TimeoutExpired:
    if not png.exists():
        raise
im = Image.open(png).convert("RGB")
# trim the empty bottom (the window is taller than the page)
px = im.load()
h = im.height
while h > 200 and all(px[x, h - 1] == px[0, h - 1] for x in range(0, im.width, 40)):
    h -= 1
im = im.crop((0, 0, im.width, min(im.height, h + 40)))
n = 0
for y in range(0, im.height, slice_h):
    n += 1
    p = out / f"{src.stem}-{n}.png"
    im.crop((0, y, im.width, min(im.height, y + slice_h))).save(p)
    print(p)
