"""PYQ figures: the dark-mode tone of each figure (audit P1-20) and the WebP copies in data/figs (reused while the source PNG is unchanged).

tone = 'mono'    line art and greyscale scans: dark mode shows them inverted (invert(.88) hue-rotate(180deg)) on a dark surface
tone = 'colour'  keep the printed colours (dark mode shows them on a softened paper panel): a figure where at least CHROMA_SHARE of the
                 pixels are clearly coloured (HSV saturation and value both above 60 of 255: the multi-hue GA charts), or one whose question
                 names a fill colour ('a black square', 'the shaded cells', 'blue circles'), because an inverted figure would contradict it.
All figures of one question share its tone, so option figures never differ from each other in dark mode. FORCE overrides a file by name.

Why not the audit's first rule (mean saturation < 12 -> mono): a gallery check of all 249 figures in both themes (2026-10-16) showed that it
leaves nine figures as light boxes that invert cleanly (eight 2025 scans with a faint coloured watermark or tint, and one thin blue grid),
while the charts whose colours encode the data (pies, bars) are exactly the ones with at least 10 % clearly coloured pixels. Seven greyscale
figures keep their printed look because their question names a fill colour (cs-2019:GA10, cs-2026-2:Q2, Q8, Q9).

Grey paper: the 2007-2009 papers are scans of printed sheets. Their paper is grey (its level peaks at 232-242 of 255, not 255) and carries
show-through: faint text and table rules from the back of the sheet or the page beneath, at about 200-225, while the figure's own lines sit
below 150. So the scan shows as a grey box in light mode, and in dark mode the inverted paper (about 40-48) is lighter than the card's surface
(#22252C), so the box and the ghost text show through the 'lighten' blend. The WebP copy of such a scan is levelled: one white point for
all three channels, at the lower edge of the paper's own peak in the luminance histogram, maps the paper and everything lighter to white and
scales the rest linearly (the lines keep their weight, the ghost text goes; gallery check of the 15 such scans in both themes, 2026-10-16).
Only near-grey scans whose paper fills most of the image qualify (a colour figure's light ground and a large grey fill are design, not paper).
The source PNG is never changed. KEEP_PAPER exempts a file by name; the WebP records its recipe in XMP, so a rule change re-encodes it.

Sizes (audit P3-38): a figure record ships w and h, the pixel size of its image (the WebP copy is never resized, so the PNG header gives it),
so the card's <img> keeps its box before the image loads (no jump while reading, nothing reflows under a tap). Option figures ship them too
(OPTION_SIZES, on since WP9a's img.qc-optfig rule keeps the aspect ratio: height: auto and a width cap from the card's --r = w / h, so the
200 px height cap binds without stretching; before that rule a 581 x 589 figure in a 360 px option drew 285 x 200). Checked in Chrome with
the WebP requests held: all 85 option figures of the 22 questions keep the same box before and after load at 1440 and 390, light and dark.
"""
from __future__ import annotations

import functools
import os
import re
import shutil
import struct
from pathlib import Path

CHROMA_SHARE = 0.10
CHROMA_LEVEL = 60
COLOUR_WORDS = re.compile(r"\b(black|white|shaded|shade|shading|grey|gray|dark|darker|red|blue|green|yellow|orange|pink|purple|violet|brown|"
                          r"colou?red)\b", re.I)
FORCE: dict[str, str] = {}          # 'cs-2015-1-GA8-f1.png': 'colour' — add after a gallery check when the rules get one wrong
WEBP = {"quality": 88, "method": 6}

PAPER_GREY = 246                    # a scan whose paper (the commonest level of 160-255) peaks below this is grey paper
PAPER_SHARE = 0.6                   # ... when its paper (the peak's lower edge and up) is at least this share of the pixels
PAPER_SPAN = 24                     # the white point sits at most this far below the paper's peak
NEAR_GREY = 0.01                    # ... and fewer than this share of its pixels are clearly coloured (see CHROMA_LEVEL)
KEEP_PAPER: set[str] = set()        # 'cs-2007-Q5-f1.png': keep a scan's paper as printed (after a gallery check)
OPTION_SIZES = True                 # ship w/h on option figures too (see Sizes in the module notes)
XMP = ('<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" '
       'xmlns:gate="urn:gate-ascent:build" gate:recipe="{}"/></rdf:RDF></x:xmpmeta>')


def paper_white(hist: list[int]) -> int | None:
    """the white point that turns a scan's grey paper white, from its 256-level luminance histogram; None when the paper is already white
    (or there is no paper background): the lower edge of the paper's peak, the first level below it where the next four levels all hold
    under 2 % of the peak's pixels, at most PAPER_SPAN below the peak. Paper is the lightest thing on a scan: when 5 % of the pixels are
    10 or more levels lighter than the peak, the peak is a grey fill on white paper and nothing is levelled."""
    n = sum(hist)
    if not n:
        return None
    peak = max(range(160, 256), key=lambda v: hist[v])
    if peak >= PAPER_GREY or sum(hist[peak + 10:]) / n >= 0.05:
        return None
    edge = peak
    while edge > peak - PAPER_SPAN and not all(hist[edge - k] < hist[peak] * 0.02 for k in range(1, 5)):
        edge -= 1
    return edge if sum(hist[edge:]) / n >= PAPER_SHARE else None


def levels(white: int) -> list[int]:
    """the per-channel lookup table of a white point: white and lighter -> 255, the rest scaled linearly (black stays black)"""
    return [min(255, round(v * 255 / white)) for v in range(256)]


@functools.lru_cache(maxsize=None)
def _analyse(path: str, stamp: tuple[int, int]) -> tuple[float, float, int | None]:
    from PIL import Image, ImageChops, ImageStat
    with Image.open(path) as im:
        rgb = im.convert("RGB")
    hsv = rgb.convert("HSV")
    _, s, v = hsv.split()
    lit = ImageChops.multiply(s.point(lambda x: 255 if x > CHROMA_LEVEL else 0), v.point(lambda x: 255 if x > CHROMA_LEVEL else 0))
    n = hsv.size[0] * hsv.size[1]
    share = lit.histogram()[255] / n if n else 0.0
    white = paper_white(rgb.convert("L").histogram()) if share < NEAR_GREY else None
    return ImageStat.Stat(s).mean[0], share, white


def analyse(path: Path) -> tuple[float, float, int | None]:
    """(mean HSV saturation on 0-255, share of clearly coloured pixels, grey-paper white point or None) of an image file; each file is
    decoded once per build (tones() and write_webp() share the result while its size and mtime are unchanged)"""
    st = path.stat()
    return _analyse(str(path), (st.st_mtime_ns, st.st_size))


def chroma(path: Path) -> tuple[float, float]:
    """(mean HSV saturation on 0-255, share of clearly coloured pixels) of an image file"""
    return analyse(path)[:2]


def white_point(path: Path) -> int | None:
    """the white point the WebP copy of this figure is levelled with (None: copied as printed)"""
    return None if path.name in KEEP_PAPER else analyse(path)[2]


def recipe_of(webp: Path) -> str | None:
    """the recipe a WebP copy was made with ('' when plain, 'paper 224' when levelled), None when it cannot be read"""
    from PIL import Image
    try:
        with Image.open(webp) as im:
            x = im.info.get("xmp") or b""
    except Exception:                                   # noqa: BLE001 - an unreadable copy is simply made again
        return None
    m = re.search(r'gate:recipe="([^"]*)"', x.decode("utf-8", "replace") if isinstance(x, (bytes, bytearray)) else str(x))
    return m.group(1) if m else ""


FIG_DIRS = (("pyq", "figs"), ("bank", "figs"))     # GATE figures: pyq/figs/<paper>/; ICAI bank figures: bank/figs/<doc id>/ (docs/ICAI_BANK.md §9.6)


def fig_path(root: Path, paper: str, name: str) -> Path:
    """the source PNG of a question's figure: pyq/figs/<paper>/<name>, else bank/figs/<doc id>/<name>"""
    for d in FIG_DIRS:
        p = root.joinpath(*d) / paper / name
        if p.exists():
            return p
    return root.joinpath(*FIG_DIRS[0]) / paper / name


def tones(root: Path, questions: list[dict], warnings: list[str]) -> dict[tuple[str, str], str]:
    """{(paper, file name): 'mono' | 'colour'} for every figure the shipped questions use"""
    share: dict[tuple[str, str], float] = {}
    for q in questions:
        for f in q.get("figures") or []:
            k = (q["paper"], f["file"])
            if k in share:
                continue
            p = fig_path(root, q["paper"], f["file"])
            if not p.exists():
                warnings.append(f"{q['id']}: figure {f['file']} is missing from pyq/figs/{q['paper']}/ (and bank/figs/{q['paper']}/)")
                share[k] = 0.0
                continue
            try:
                share[k] = chroma(p)[1]
            except Exception as e:                       # noqa: BLE001 - an unreadable figure must not stop the build
                warnings.append(f"{q['id']}: could not read {p.name} for its tone ({e})")
                share[k] = 0.0
    tone: dict[tuple[str, str], str] = {}
    for q in questions:
        keys = [(q["paper"], f["file"]) for f in q.get("figures") or []]
        if not keys:
            continue
        text = " ".join([q.get("stem") or "", " ".join(q.get("options") or []), (q.get("group") or {}).get("context") or ""])
        colour = any(share.get(k, 0) >= CHROMA_SHARE for k in keys) or bool(COLOUR_WORDS.search(text))
        for k in keys:
            if colour or tone.get(k) == "colour":
                tone[k] = "colour"
            else:
                tone.setdefault(k, "mono")
    for k in list(tone):
        if k[1] in FORCE:
            tone[k] = FORCE[k[1]]
    return tone


def png_size(path: Path) -> tuple[int, int] | None:
    """(width, height) in pixels from a PNG's IHDR chunk, without decoding it (and without Pillow); None when the file is not a PNG"""
    with open(path, "rb") as f:
        head = f.read(24)
    if len(head) < 24 or head[:8] != b"\x89PNG\r\n\x1a\n" or head[12:16] != b"IHDR":
        return None
    w, h = struct.unpack(">II", head[16:24])
    return (w, h) if w and h else None


def sized(where: str | None) -> bool:
    """whether a figure placed at `where` ('stem', 'opt:A', ...) ships its size (option figures only with OPTION_SIZES)"""
    return OPTION_SIZES or not str(where or "").startswith("opt:")


def sizes(root: Path, questions: list[dict], warnings: list[str]) -> dict[tuple[str, str], tuple[int, int]]:
    """{(paper, file name): (w, h)} for every figure the shipped questions use whose PNG header can be read (P3-38)"""
    out: dict[tuple[str, str], tuple[int, int]] = {}
    seen: set[tuple[str, str]] = set()
    for q in questions:
        for f in q.get("figures") or []:
            k = (q["paper"], f["file"])
            if k in seen:
                continue
            seen.add(k)
            p = fig_path(root, q["paper"], f["file"])
            try:
                wh = png_size(p) if p.exists() else None
            except OSError:
                wh = None
            if wh:
                out[k] = wh
            elif p.exists():
                warnings.append(f"{q['id']}: could not read the size of {p.name} (not a PNG?), so its card reserves no box for it")
    return out


def write_webp(root: Path, old: Path, stage: Path, warnings: list[str]) -> tuple[int, int]:
    """data/figs/<paper>/<name>.webp for every pyq/figs/<paper>/<name>.png, grey paper levelled to white (see the module notes); a WebP from
    the previous build is hard-linked when it is newer than its PNG and was made with the same recipe (so a rebuild costs nothing for
    unchanged figures). Returns (converted, reused). Without Pillow the PNG is copied as it is."""
    try:
        from PIL import Image
    except ImportError:
        Image = None
    made = reused = 0
    pngs = [p for d in FIG_DIRS if root.joinpath(*d).exists() for p in sorted(root.joinpath(*d).glob("*/*.png"))]
    for p in pngs:
        rel = Path("figs") / p.parent.name / (p.stem + (".webp" if Image else ".png"))
        out, prev = stage / rel, old / rel
        out.parent.mkdir(parents=True, exist_ok=True)
        white = None
        if Image:
            try:
                white = white_point(p)
            except Exception as e:                       # noqa: BLE001 - an unreadable figure is copied as printed, with a warning
                warnings.append(f"figure {p.parent.name}/{p.name}: could not measure its paper ({e})")
        recipe = f"paper {white}" if white else ""
        if prev.exists() and prev.stat().st_mtime >= p.stat().st_mtime and prev.stat().st_size > 0 and \
                (not Image or recipe_of(prev) == recipe):
            try:
                os.link(prev, out)
            except OSError:
                shutil.copy2(prev, out)
            reused += 1
            continue
        if Image:
            with Image.open(p) as im:
                rgb = im.convert("RGB")
            if white:
                rgb = rgb.point(levels(white) * 3)
            rgb.save(out, "WEBP", **WEBP, **({"xmp": XMP.format(recipe).encode()} if recipe else {}))
        else:
            shutil.copy2(p, out)
        made += 1
    return made, reused
