"""The hosted copy of PassBook (audit P1-58, owner decision D13; owner WP16). How to build, test and host it: HOSTING.md.

    build.py --site [DIR]          the normal build, then a hostable copy in DIR (default _site/): index.html, app/, data/ and vendor/ only, every
                                   file asked for as <path>?v=<sha8>, the service worker (sw.js), the web manifest and its icons, _headers
    build.py --check site [DIR]    validate as --check does, plus the hosted-copy rules for the source and, when DIR holds a site build, that build

Nothing is published: the owner chooses the host. file:// is unchanged: the source index.html carries no version, no manifest link and
registers no worker. Only the copy written here does (it marks <html data-site>, which app/js/core/pwa.js reads).

The copy is self-consistent: every hash is taken over the files as written to DIR (stylesheets get versioned url()s, the data manifest's
`files` table and `ver` are recomputed), so a copy made while app/ is being edited is still right. seal(DIR) recomputes everything in place
and is idempotent; tools/perf uses it to make a second version of a copy for the update walk.
"""
from __future__ import annotations

import gzip
import io
import json
import os
import re
import shutil
import subprocess
from pathlib import Path

from buildlib import boot as boot_mod
from buildlib import output as out_mod

ALLOW = ("index.html", "app", "data", "vendor")                  # what is copied from the project (758 MB of PDFs, crops and tools stay home)
SITE_TOP = {"index.html", "sw.js", "manifest.webmanifest", "_headers", ".nojekyll", "app", "data", "vendor"}
OK_EXT = {".js", ".css", ".png", ".webp", ".woff2", ".woff", ".ttf", ".svg", ".json"}
COMPRESSED = {".js", ".css", ".html", ".json", ".webmanifest", ".svg", ".txt"}
UNTABLED = {"sw.js", "_headers", ".nojekyll"}                      # never requested by the app, so not in the worker's table
KATEX_PRE = ("Main-Regular", "Main-Bold", "Main-Italic", "Math-Italic", "AMS-Regular", "Size1-Regular", "Size2-Regular", "Size3-Regular",
             "Size4-Regular")                                     # the KaTeX faces nearly every formula uses; the rest load on first use
ICONS = (("icon-192.png", 192, "any"), ("icon-512.png", 512, "any"), ("icon-maskable-512.png", 512, "maskable"), ("apple-touch-icon.png", 180, "apple"))
PRECACHE_BUDGET_GZ = 1600 * 1024                                   # the app shell a first visit downloads in the background (measured: 1.2 MB)
SITE_BLOCK = re.compile(r"/\*SITE\*/.*?/\*SITE\*/", re.S)
LINKS = re.compile(r"<!--site:links-->.*?<!--/site:links-->\n?", re.S)
PRELOAD = re.compile(r"<!--site:preload-->.*?<!--/site:preload-->\n?", re.S)
REF = re.compile(r'\b(href|src)="([^"]*)"')
CSS_URL = re.compile(r"""url\(\s*(['"]?)([^'")]+)\1\s*\)""")
NOT_LOCAL = re.compile(r"^(?:[A-Za-z][A-Za-z0-9+.-]*:|//|#|/)")
MANIFEST_HEAD, MANIFEST_TAIL = 'GAD.reg("manifest","main",', ");\n"


# ---------------------------------------------------------------- small pure helpers (tests/py/test_hosted.py)
def bare(ref: str) -> str:
    """a reference without its query and fragment"""
    return ref.split("#", 1)[0].split("?", 1)[0]


def local(ref: str) -> bool:
    return bool(ref) and not NOT_LOCAL.match(ref)


def join(base_dir: str, ref: str) -> str | None:
    """a relative reference resolved against a site folder ('vendor/fonts' + 'inter.woff2'); None when it leaves the site"""
    parts = [p for p in (base_dir.split("/") if base_dir else [])]
    for p in bare(ref).split("/"):
        if p in ("", "."):
            continue
        if p == "..":
            if not parts:
                return None
            parts.pop()
        else:
            parts.append(p)
    return "/".join(parts)


def version_html(html: str, sha: dict[str, str]) -> tuple[str, list[str], list[str]]:
    """every local href/src as <path>?v=<sha8> -> (html, the local paths referenced in order, the ones that are not in sha)"""
    refs, lost = [], []

    def sub(m):
        attr, val = m.group(1), m.group(2)
        if not local(val):
            return m.group(0)
        p = join("", val)
        if p is None or p not in sha:
            lost.append(bare(val))
            return m.group(0)
        refs.append(p)
        return f'{attr}="{p}?v={sha[p]}"'
    return REF.sub(sub, html), refs, lost


def version_css(css: str, css_path: str, sha: dict[str, str]) -> tuple[str, list[str]]:
    """every local url() of a stylesheet at css_path as <path>?v=<sha8>, relative as written -> (css, targets that are not in sha)"""
    base = css_path.rsplit("/", 1)[0] if "/" in css_path else ""
    lost = []

    def sub(m):
        q, val = m.group(1), m.group(2).strip()
        if not local(val):
            return m.group(0)
        p = join(base, val)
        if p is None or p not in sha:
            lost.append(bare(val))
            return m.group(0)
        return f"url({q}{bare(val)}?v={sha[p]}{q})"
    return CSS_URL.sub(sub, css), lost


def mark_site(html: str) -> str:
    """<html … data-site>: the hosted copy's marker (app/js/core/pwa.js)"""
    return re.sub(r"<html\b([^>]*)>", lambda m: m.group(0) if "data-site" in m.group(1) else f"<html{m.group(1)} data-site>", html, count=1)


def links_snippet(webmanifest: str, apple: str | None) -> str:
    """the web manifest and the home-screen icon, linked by script and only over http(s): a static manifest link logs CORS errors on file://"""
    pairs = [["manifest", webmanifest]] + ([["apple-touch-icon", apple]] if apple else [])
    return ("<!--site:links--><script>/* hosted copy (build.py --site): linked only over http(s), never from a folder */\n"
            f"if(/^https?:$/.test(location.protocol)){json.dumps(pairs)}.forEach(function(x){{var l=document.createElement('link');l.rel=x[0];l.href=x[1];"
            "document.head.appendChild(l);});</script><!--/site:links-->\n")


def put_links(html: str, snippet: str) -> str:
    html = LINKS.sub("", html)
    return html.replace("</head>", snippet + "</head>", 1)


def route_table(site: Path) -> list | None:
    """[[pattern, [view files]]] from the shell's own ROUTES, FILE and DEPS tables (app/js/shell.js, run in Node); None without Node"""
    node = shutil.which("node")
    if not node:
        return None
    js_ = ("globalThis.GA={};require('./app/js/core/util.js');require('./app/js/core/icons.js');const T=require('./app/js/shell.js');"
           "console.log(JSON.stringify(T.ROUTES.map(([p,v])=>['^'+p.replace(/\\/:[a-z]+/gi,'/[^/]+')+'/?$',"
           "[...(T.DEPS[v]||[]),T.FILE[v]].map(f=>'app/js/views/'+f+'.js')])))")
    r = subprocess.run([node, "-e", js_], cwd=site, capture_output=True, text=True)
    return json.loads(r.stdout) if r.returncode == 0 and r.stdout.strip().startswith("[") else None


def preload_snippet(routes: list, sha) -> str:
    """the first screen's view files start with the boot set instead of after the shell has booted: one round trip less on a first visit
    (measured: Home on Fast 4G 1.52 -> 1.3 s). Over http(s) only; on a repeat visit the worker answers them from its cache."""
    table = [[pat, [f"{f}?v={sha[f]}" for f in files if f in sha]] for pat, files in routes]
    return ("<!--site:preload--><script>/* hosted copy (build.py --site): the first screen's view file starts loading with the boot set */\n"
            "(function(){if(!/^https?:$/.test(location.protocol))return;var p=location.hash.replace(/^#/,'').split('?')[0].split('#')[0]||'/',R="
            + json.dumps(table, separators=(",", ":")) +
            ";for(var i=0;i<R.length;i++)if(new RegExp(R[i][0]).test(p)){R[i][1].forEach(function(h){var l=document.createElement('link');"
            "l.rel='preload';l.as='script';l.href=h;document.head.appendChild(l);});break;}})();</script><!--/site:preload-->\n")


def fill_sw(src: str, site: dict) -> str:
    """the worker with its SITE block filled in"""
    if len(SITE_BLOCK.findall(src)) != 1:
        raise ValueError("sw.js must hold exactly one /*SITE*/ … /*SITE*/ block")
    block = "/*SITE*/const SITE = " + json.dumps(site, separators=(",", ":"), sort_keys=True) + ";/*SITE*/"
    return SITE_BLOCK.sub(lambda m: block, src, count=1)


def read_sw_site(src: str) -> dict | None:
    m = SITE_BLOCK.search(src)
    if not m:
        return None
    body = m.group(0)[len("/*SITE*/"):-len("/*SITE*/")].strip()
    body = re.sub(r"^const SITE\s*=\s*", "", body).rstrip(";").strip()
    try:
        return json.loads(body)
    except ValueError:
        return {"ver": None} if re.fullmatch(r"\{\s*ver:\s*null.*\}", body, re.S) else None


def read_manifest(text: str) -> dict:
    if not (text.startswith(MANIFEST_HEAD) and text.endswith(MANIFEST_TAIL)):
        raise ValueError("data/manifest.js is not the build's GAD.reg(\"manifest\",\"main\",…) file")
    return json.loads(text[len(MANIFEST_HEAD):-len(MANIFEST_TAIL)])


def headers_text() -> str:
    """cache rules for hosts that read a _headers file (Netlify, Cloudflare Pages); others: HOSTING.md"""
    return """# PassBook, hosted copy: written by build.py --site (HOSTING.md). Every app file is asked for as <path>?v=<content hash>, so app/, data/ and
# vendor/ may be cached for a year; the page, the service worker and the web manifest are always revalidated, so a new version is seen at once.
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
/
  Cache-Control: no-cache
/index.html
  Cache-Control: no-cache
/sw.js
  Cache-Control: no-cache
/manifest.webmanifest
  Cache-Control: no-cache
  Content-Type: application/manifest+json
/app/*
  Cache-Control: public, max-age=31536000, immutable
/data/*
  Cache-Control: public, max-age=31536000, immutable
/vendor/*
  Cache-Control: public, max-age=31536000, immutable
"""


def webmanifest(colours: dict, icons: dict[str, str], about: str) -> str:
    """the web manifest; icons = {file name: sha8}; colours = base.css's --bg (light first paint, so the splash matches it)"""
    bg = colours.get("light", "#F6F7F9")
    rows = [{"src": f"app/img/{n}?v={icons[n]}", "sizes": f"{s}x{s}", "type": "image/png", "purpose": k}
            for n, s, k in ICONS if k in ("any", "maskable") and n in icons]
    return json.dumps({"name": "PassBook — CA Inter Group II", "short_name": "PassBook", "description": about, "lang": "en", "dir": "ltr",
                       "start_url": "./index.html", "scope": "./", "display": "standalone", "background_color": bg, "theme_color": bg,
                       "categories": ["education"], "icons": rows}, ensure_ascii=False, indent=1) + "\n"


def about_line(M: dict) -> str:
    """the manifest's description, from the content itself"""
    years = sorted(p.get("year") for p in M.get("papers", []) if p.get("year"))
    span = f" ({years[0]}–{years[-1]})" if years else ""
    papers = f", {len(M.get('papers', []))} ICAI papers{span}" if M.get("papers") else ""
    return (f"CA Intermediate Group II (Papers 4, 5 and 6): {len(M.get('lessons', []))} lessons{papers}, labs and flashcards. "
            "Works offline; your progress stays on this device.")


def draw_icon(size: int, kind: str) -> bytes:
    """the logo as a PNG: the polyline of app/js/shell.js's LOGO (the tick M5 12.8 9.8 17.2 19 7.2, a 2.6-unit round white stroke on a
    24-unit cobalt tile). 'any' = the favicon exactly (rounded tile, transparent corners); 'maskable' = full bleed, the mark inside the 80 % safe
    circle; 'apple' = full bleed and opaque (iOS rounds it itself). Drawn 4x larger and scaled down for clean edges."""
    from PIL import Image, ImageDraw

    ss, cobalt, white = 4, (0x24, 0x50, 0xE0, 255), (255, 255, 255, 255)
    W = size * ss
    img = Image.new("RGBA", (W, W), (0, 0, 0, 0) if kind == "any" else cobalt)
    d = ImageDraw.Draw(img)
    unit = W / 24
    if kind == "any":
        d.rounded_rectangle((0, 0, W - 1, W - 1), radius=round(6 * unit), fill=cobalt)
    scale = {"any": 1.0, "maskable": 0.74, "apple": 0.84}[kind]
    pts = [(5, 12.8), (9.8, 17.2), (19, 7.2)]
    if kind == "any":
        P = [(x * unit, y * unit) for x, y in pts]
    else:                                                          # the glyph's box (5..19 × 7.2..17.2) centred on the tile
        P = [((12 + (x - 12) * scale) * unit, (12 + (y - 12.2) * scale) * unit) for x, y in pts]
    w = 2.6 * scale * unit
    d.line(P, fill=white, width=round(w), joint="curve")
    r = w / 2
    for x, y in (P[0], P[-1]):
        d.ellipse((x - r, y - r, x + r, y + r), fill=white)
    out = img.resize((size, size), Image.LANCZOS)
    if kind != "any":
        out = out.convert("RGB")
    out = out.quantize(colors=64, method=Image.Quantize.FASTOCTREE)    # two colours and their soft edges: a palette PNG is a quarter of the size
    buf = io.BytesIO()
    out.save(buf, "PNG", optimize=True)
    return buf.getvalue()


# ---------------------------------------------------------------- the site folder
def files_of(site: Path) -> list[str]:
    return sorted(p.relative_to(site).as_posix() for p in site.rglob("*") if p.is_file())


def gz_len(path: str, data: bytes) -> int:
    return len(gzip.compress(data, 9, mtime=0)) if os.path.splitext(path)[1] in COMPRESSED else len(data)


def precache_list(files: dict, boot_refs: list[str]) -> list[str]:
    """the app shell: the page, its boot set, every view and core module, the lesson-lab framework, the icons and the web fonts"""
    pre = ["index.html", "manifest.webmanifest"] + [p for p in files if p.startswith("app/img/")] + list(boot_refs)
    pre += [p for p in files if re.fullmatch(r"app/js/views/[^/]+\.js", p)]
    pre += [p for p in files if re.fullmatch(r"app/js/core/[^/]+\.js", p) and p != "app/js/core/demo.js"]
    pre += ["app/js/labs/framework.js"] + [p for p in files if re.fullmatch(r"vendor/fonts/[^/]+\.woff2", p)]
    pre += [f"vendor/katex/fonts/KaTeX_{n}.woff2" for n in KATEX_PRE]
    seen, out = set(), []
    for p in pre:
        if p in files and p not in seen:
            seen.add(p)
            out.append(p)
    return out


def seal(site: Path, report: dict | None = None, dry: bool = False) -> list[str]:
    """version everything in place, in dependency order: stylesheets' url()s, the web manifest's icons, the data manifest's files and ver, the
    page, the worker's table, _headers. Idempotent; returns the files it changed (dry: would change, writing nothing) and fills report."""
    rep = report if report is not None else {}
    rep["lost"] = lost = []
    changed: list[str] = []
    cache: dict[str, str | None] = {}

    def sha_of(rel: str) -> str | None:
        if rel not in cache:
            p = site / rel
            cache[rel] = out_mod.sha8(p.read_bytes()) if p.is_file() else None
        return cache[rel]

    def write(rel: str, text: str) -> None:
        p = site / rel
        if (p.read_text() if p.is_file() else None) != text:
            changed.append(rel)
            if not dry:
                p.write_text(text)
        cache[rel] = out_mod.sha8(text.encode())                    # later steps see the new hash (in a dry run too)

    class Sha(dict):                                               # sha8 by path, computed on first use
        def __contains__(self, k):
            return sha_of(k) is not None

        def __getitem__(self, k):
            return sha_of(k)
    sha = Sha()

    for rel in files_of(site):                                     # 1. stylesheets (they point at fonts, never at each other)
        if rel.endswith(".css"):
            css, miss = version_css((site / rel).read_text(), rel, sha)
            lost += [f"{rel}: {m}" for m in miss if not re.search(r"\.(woff|ttf)$", m)]   # KaTeX's woff/ttf fallbacks are not shipped (woff2 only)
            write(rel, css)
    if (site / "manifest.webmanifest").is_file():                  # 2. the web manifest's icons
        m = json.loads((site / "manifest.webmanifest").read_text())
        for ic in m.get("icons", []):
            p = join("", ic["src"])
            if p in sha:
                ic["src"] = f"{bare(ic['src'])}?v={sha[p]}"
            else:
                lost.append(f"manifest.webmanifest: {bare(ic['src'])}")
        write("manifest.webmanifest", json.dumps(m, ensure_ascii=False, indent=1) + "\n")
    mpath = "data/manifest.js"                                     # 3. the data manifest: files and ver over the files as shipped
    M = read_manifest((site / mpath).read_text())
    M["files"] = {r: sha_of(r) for r in files_of(site) if r.split("/", 1)[0] in ("app", "data", "vendor") and r != mpath}
    M["ver"] = out_mod.stamp(M, M["files"])
    write(mpath, out_mod.reg_text("manifest", "main", M))
    rep["manifest_ver"], rep["about"] = M["ver"], about_line(M)
    html, refs, miss = version_html(mark_site(PRELOAD.sub("", LINKS.sub("", (site / "index.html").read_text()))), sha)   # 4. the page
    lost += [f"index.html: {m}" for m in miss]
    wm, apple = "manifest.webmanifest", "app/img/apple-touch-icon.png"
    html = put_links(html, links_snippet(f"{wm}?v={sha[wm]}" if wm in sha else wm, f"{apple}?v={sha[apple]}" if apple in sha else None))
    routes = route_table(site)
    if routes:
        html = html.replace("</head>", preload_snippet(routes, sha) + "</head>", 1)
    else:
        rep.setdefault("notes", []).append("no first-screen preload: Node is not on PATH (the copy works without it, one round trip slower)")
    write("index.html", html)
    rep["boot"] = refs
    files = {}                                                     # 5. the worker's table (sizes as on disk: a dry run that would change
    for rel in files_of(site):                                     #    anything reports it above anyway)
        if rel not in UNTABLED:
            b = (site / rel).read_bytes()
            files[rel] = [sha_of(rel), len(b), gz_len(rel, b)]
    pre = precache_list(files, refs)
    if (site / "sw.js").is_file():
        info = {"ver": out_mod.sha8(json.dumps(files, sort_keys=True).encode()), "built": M.get("built"), "data": M["ver"],
                "index": files["index.html"][0], "files": files, "precache": pre}
        write("sw.js", fill_sw((site / "sw.js").read_text(), info))
        rep["site_ver"] = info["ver"]
    write("_headers", headers_text())                              # 6. the host's cache rules, and no Jekyll on GitHub Pages
    write(".nojekyll", "")
    rep["files"], rep["precache"] = files, pre
    return changed


# ---------------------------------------------------------------- checks
def check_source(root: Path, errors: list[str], warnings: list[str]) -> None:
    """the hosted-copy rules for the project's own index.html and sw.js (they also keep file:// clean)"""
    html_p, sw_p = root / "index.html", root / "sw.js"
    if not html_p.is_file():
        return
    html = re.sub(r"<!--.*?-->", "", html_p.read_text(), flags=re.S)       # comments may name what they describe
    if re.search(r"<link\b[^>]*\brel=\"manifest\"", html):
        errors.append("index.html: a static <link rel=\"manifest\"> logs CORS errors on file://; the site build links it by script over http(s) only (P1-58)")
    if re.search(r"<html\b[^>]*\bdata-site\b", html):
        errors.append("index.html: data-site belongs to the site build only (build.py --site); the source must never register the service worker")
    if "?v=" in "".join(v for _, v in REF.findall(html)):
        errors.append("index.html: ?v= versions belong to the site build only; the source links plain paths (file:// stays unchanged)")
    order = [bare(v) for _, v in REF.findall(html) if local(v)]
    for need in ("app/js/core/pwa.js", "app/js/shell.js"):
        if need not in order:
            errors.append(f"index.html does not load {need}")
    if "app/js/core/pwa.js" in order and "app/js/shell.js" in order and order.index("app/js/core/pwa.js") > order.index("app/js/shell.js"):
        errors.append("index.html: app/js/core/pwa.js must load before app/js/shell.js (the shell reads GA.pwa at boot)")
    for p in order:
        if p.startswith("data/"):
            continue                    # generated by build.py (a fresh checkout or --check before the first build has no data/ yet)
        if not (root / p).is_file():
            errors.append(f"index.html links {p}, which does not exist")
    if not sw_p.is_file():
        errors.append("sw.js (the service worker's source) is missing")
    else:
        src = sw_p.read_text()
        if len(SITE_BLOCK.findall(src)) != 1:
            errors.append("sw.js must hold exactly one /*SITE*/ … /*SITE*/ block for build.py --site to fill")
        elif (read_sw_site(src) or {}).get("ver") is not None:
            errors.append("sw.js: the source's SITE block must be the empty one (ver null); only the site build fills it")


def check_site(site: Path, errors: list[str], warnings: list[str], report: dict | None = None) -> dict:
    """a site build: only allowed files, every address sealed (seal() would change nothing), the worker's table true to the files on disk"""
    rep = report if report is not None else {}
    before = len(errors)
    for rel in files_of(site):
        top, name = rel.split("/", 1)[0], rel.rsplit("/", 1)[-1]
        if name == ".DS_Store":
            warnings.append(f"{site.name}/{rel}: a Finder file; delete it before uploading (hosts serve it to anyone)")
        elif top not in SITE_TOP:
            errors.append(f"{site.name}/{rel} is outside the hosted copy's allowlist ({', '.join(sorted(SITE_TOP))})")
        elif top in ("app", "data", "vendor") and (name.startswith(".") or not (os.path.splitext(name)[1] in OK_EXT or name.startswith("LICENSE"))):
            errors.append(f"{site.name}/{rel}: not a kind of file the app ships ({', '.join(sorted(OK_EXT))}, LICENSE)")
    for need in ("index.html", "sw.js", "manifest.webmanifest", "_headers", "data/manifest.js"):
        if not (site / need).is_file():
            errors.append(f"{site.name}/{need} is missing")
    if len(errors) > before:
        return rep
    would = seal(site, rep, dry=True)
    for rel in would:
        errors.append(f"{site.name}/{rel} is not sealed: an address or a hash is out of date (run build.py --site again)")
    for x in rep.get("lost", []):
        errors.append(f"{site.name}/{x} names a file the copy does not have")
    site_info = read_sw_site((site / "sw.js").read_text()) or {}
    files = site_info.get("files") or {}
    for p in site_info.get("precache") or []:
        if p not in files:
            errors.append(f"{site.name}/sw.js precaches {p}, which is not in its table")
    html = re.sub(r"<!--(?!site:|/site:).*?-->", "", (site / "index.html").read_text(), flags=re.S)
    if not re.search(r"<html\b[^>]*\bdata-site\b", html):
        errors.append(f"{site.name}/index.html lacks the data-site marker, so it would never start its service worker")
    if re.search(r"<link\b[^>]*\brel=\"manifest\"", LINKS.sub("", html)):
        errors.append(f"{site.name}/index.html has a static manifest link (CORS errors when the copy is opened from a folder)")
    try:
        man = json.loads((site / "manifest.webmanifest").read_text())
        if not any(i.get("purpose") == "maskable" for i in man.get("icons", [])) or not man.get("start_url"):
            errors.append(f"{site.name}/manifest.webmanifest lacks a maskable icon or a start_url (not installable)")
    except ValueError as e:
        errors.append(f"{site.name}/manifest.webmanifest is not JSON: {e}")
    pre = site_info.get("precache") or []
    pre_raw, pre_gz = sum(files[p][1] for p in pre if p in files), sum(files[p][2] for p in pre if p in files)
    rep.update(pre_files=len(pre), pre_raw=pre_raw, pre_gz=pre_gz, all_files=len(files), all_raw=sum(f[1] for f in files.values()),
               all_gz=sum(f[2] for f in files.values()), ver=site_info.get("ver"))
    if pre_gz > PRECACHE_BUDGET_GZ:
        warnings.append(f"hosted copy: the app shell a first visit downloads in the background is {pre_gz // 1024} KB gzip, over its "
                        f"{PRECACHE_BUDGET_GZ // 1024} KB budget (tools/hosted.py PRECACHE_BUDGET_GZ)")
    return rep


def describe(rep: dict, site: Path) -> str:
    mb = lambda n: f"{n / 1048576:.1f} MB"           # noqa: E731
    return (f"hosted copy {rep.get('ver')} in {site}: {rep.get('all_files')} files, {mb(rep.get('all_raw', 0))} (about {mb(rep.get('all_gz', 0))} gzip) · "
            f"app shell precached by the service worker: {rep.get('pre_files')} files, {rep.get('pre_raw', 0) // 1024} KB "
            f"({rep.get('pre_gz', 0) // 1024} KB gzip) · data manifest ver {rep.get('manifest_ver')}")


# ---------------------------------------------------------------- building
def site_dir(argv: list[str], root: Path) -> Path | None:
    """the folder asked for: --site [DIR], --site=DIR, or --check site [DIR]; None when no site is asked for"""
    for i, a in enumerate(argv):
        if a.startswith("--site="):
            return Path(a.split("=", 1)[1]).expanduser()
        if a == "--site" or (a == "site" and "--check" in argv):
            nxt = argv[i + 1] if i + 1 < len(argv) else None
            return Path(nxt).expanduser() if nxt and not nxt.startswith("-") else root / "_site"
    return None


def looks_like_site(p: Path) -> bool:
    return (p / "sw.js").is_file() and (p / "index.html").is_file() and (p / "data" / "manifest.js").is_file()


def unsafe_target(root: Path, out: Path) -> str | None:
    """why the copy may not be written to out, or None"""
    root, out = root.resolve(), out.resolve()
    if out == root or root.is_relative_to(out):
        return "is the project folder or contains it"
    for d in ("app", "data", "vendor", "content", "pyq", "tools", "docs", "tests", "_audit", "_raw", "_vibes", ".venv"):
        if out.is_relative_to(root / d):
            return f"is inside the project's {d}/"
    if out.exists() and (not out.is_dir() or (any(out.iterdir()) and not looks_like_site(out))):
        return "exists and is not an earlier site build (refusing to replace it)"
    return None


def build_site(root: Path, out: Path, errors: list[str], warnings: list[str]) -> dict | None:
    """write the hosted copy to out (via a sibling temp folder, swapped in only when it checks clean); returns the report"""
    why = unsafe_target(root, out)
    if why:
        errors.append(f"--site {out}: the folder {why}")
        return None
    check_source(root, errors, warnings)
    if errors:
        return None
    try:
        import PIL  # noqa: F401
    except ImportError:
        errors.append("--site draws the app icons with Pillow: run it with the project's .venv/bin/python")
        return None
    out = out.resolve()
    tmp = out.parent / f".{out.name}-tmp-{os.getpid()}"
    shutil.rmtree(tmp, ignore_errors=True)
    try:
        for top in ALLOW:
            src = root / top
            if src.is_file():
                tmp.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(src, tmp / top)
                continue
            for p in sorted(src.rglob("*")):
                rel = p.relative_to(root)
                if not p.is_file() or any(part.startswith(".") or part == "__pycache__" for part in rel.parts):
                    continue
                (tmp / rel).parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(p, tmp / rel)
        (tmp / "app" / "img").mkdir(parents=True, exist_ok=True)
        icons = {}
        for name, size, kind in ICONS:
            b = draw_icon(size, kind)
            (tmp / "app" / "img" / name).write_bytes(b)
            icons[name] = out_mod.sha8(b)
        M = read_manifest((tmp / "data" / "manifest.js").read_text())
        colours = boot_mod.css_bg((root / "app" / "css" / "base.css").read_text())
        (tmp / "manifest.webmanifest").write_text(webmanifest(colours, icons, about_line(M)))
        shutil.copyfile(root / "sw.js", tmp / "sw.js")
        rep: dict = {}
        seal(tmp, rep)
        check_site(tmp, errors, warnings, rep)
        if errors:
            shutil.rmtree(tmp, ignore_errors=True)
            return None
        if out.exists():
            old = out.parent / f".{out.name}-old-{os.getpid()}"
            os.rename(out, old)
            os.rename(tmp, out)
            shutil.rmtree(old, ignore_errors=True)
        else:
            os.rename(tmp, out)
        return rep
    except BaseException:
        shutil.rmtree(tmp, ignore_errors=True)
        raise


def check(root: Path, out: Path | None, errors: list[str], warnings: list[str]) -> str | None:
    """--check site [DIR]: the source rules, and the site build in DIR when there is one; returns a line for the summary"""
    check_source(root, errors, warnings)
    if out is None:
        return None
    if not out.exists():
        return f"no site build at {out} yet (build.py --site writes one)"
    if not looks_like_site(out):
        errors.append(f"{out} is not a site build (no sw.js, index.html and data/manifest.js)")
        return None
    rep = check_site(out, errors, warnings)
    return describe(rep, out) if rep.get("ver") else None
