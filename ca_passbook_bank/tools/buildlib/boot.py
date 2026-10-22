"""The first paint (audit P2-78): before any stylesheet has loaded, a phone on a slow network paints index.html's own colours. The page may
paint its background inline for both themes, and its theme-color metas colour the browser bar; `build.py --check` keeps every one of these
literal hex values equal to base.css's --bg (light in `:root`, dark in `[data-theme="dark"]`), so a cold load shows no flash of another colour.
An inline background is optional (index.html is WP1's, and WP16's in wave 2); when present, its light and dark values are both checked.
"""
from __future__ import annotations

import re
from pathlib import Path

HEX = r"#[0-9A-Fa-f]{3}(?:[0-9A-Fa-f]{3})?\b"


def norm_hex(h: str) -> str:
    h = h.lower()
    return "#" + "".join(c * 2 for c in h[1:]) if len(h) == 4 else h


def css_bg(css: str) -> dict[str, str]:
    """{'light', 'dark'}: --bg of the first top-level `:root {` and `[data-theme="dark"] {` blocks (the print block is indented, so skipped)"""
    out = {}
    for theme, sel in (("light", r":root"), ("dark", r"\[data-theme=\"?dark\"?\]")):
        m = re.search(rf"^{sel}\s*\{{([^}}]*)\}}", css, re.M)
        v = m and re.search(rf"--bg\s*:\s*({HEX})", m.group(1))
        if v:
            out[theme] = norm_hex(v.group(1))
    return out


def _rules(css: str, dark: bool = False):
    """(selector, declarations, dark) for every rule of a stylesheet, descending into @media blocks (a prefers-color-scheme: dark query
    makes its rules dark)"""
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    i = 0
    while i < len(css):
        o = css.find("{", i)
        if o < 0:
            return
        head = css[i:o].strip()
        depth, j = 1, o + 1
        while j < len(css) and depth:
            depth += {"{": 1, "}": -1}.get(css[j], 0)
            j += 1
        body = css[o + 1:j - 1]
        if head.startswith("@media"):
            yield from _rules(body, dark or bool(re.search(r"prefers-color-scheme\s*:\s*dark", head)))
        elif not head.startswith("@"):
            yield head, body, dark
        i = j


def inline_backgrounds(html: str) -> list[tuple[str, str, str]]:
    """[(theme, hex, selector)] for every `background` / `background-color` hex on html or :root in index.html's inline <style> blocks"""
    out = []
    for style in re.findall(r"<style\b[^>]*>(.*?)</style>", html, re.S | re.I):
        for sel, body, dark in _rules(style):
            for one in sel.split(","):
                one = one.strip()
                if not re.match(r"^(?:html|:root)\b", one):
                    continue
                m = re.search(rf"background(?:-color)?\s*:\s*[^;]*?({HEX})", body)
                if m:
                    theme = "dark" if dark or re.search(r"dark", one) else "light"
                    out.append((theme, norm_hex(m.group(1)), one))
    return out


def theme_metas(html: str) -> list[tuple[str, str]]:
    """[(theme, hex)] of the <meta name="theme-color" media="(prefers-color-scheme: …)"> tags"""
    out = []
    for tag in re.findall(r"<meta\b[^>]*>", html, re.I):
        attrs = dict((k.lower(), v) for k, v in re.findall(r'([\w-]+)\s*=\s*"([^"]*)"', tag))
        if attrs.get("name", "").lower() != "theme-color" or not re.fullmatch(HEX, attrs.get("content", "")):
            continue
        m = re.search(r"prefers-color-scheme\s*:\s*(light|dark)", attrs.get("media", ""))
        if m:
            out.append((m.group(1), norm_hex(attrs["content"])))
    return out


def check(root: Path, errors: list[str], warnings: list[str]) -> dict:
    """compare index.html's first-paint colours with base.css; returns {'bg', 'inline', 'metas'} for the summary and the tests"""
    css_p, html_p = root / "app" / "css" / "base.css", root / "index.html"
    if not css_p.exists() or not html_p.exists():
        return {}
    bg = css_bg(css_p.read_text())
    if set(bg) != {"light", "dark"}:
        errors.append("app/css/base.css: cannot find --bg in both :root and [data-theme=\"dark\"] (the first-paint check needs them)")
        return {"bg": bg}
    html = html_p.read_text()
    inline, metas = inline_backgrounds(html), theme_metas(html)
    for theme, hx, sel in inline:
        if hx != bg[theme]:
            errors.append(f"index.html: the inline {theme} background {hx} ({sel}) is not base.css's --bg {bg[theme]}; a cold load would flash "
                          f"the wrong colour (P2-78)")
    if inline and {t for t, _, _ in inline} != {"light", "dark"}:
        warnings.append("index.html: the inline first-paint background covers only the "
                        f"{'light' if inline[0][0] == 'light' else 'dark'} theme; give both themes their --bg (P2-78)")
    for theme, hx in metas:
        if hx != bg[theme]:
            errors.append(f"index.html: <meta name=\"theme-color\"> for {theme} is {hx}, not base.css's --bg {bg[theme]} (P2-78, P2-51)")
    return {"bg": bg, "inline": inline, "metas": metas}
