"""Tests for the hosted copy's builder (tools/hosted.py; audit P1-58, owner decision D13; WP16): versioned addresses in the page and the
stylesheets, the site marker and the script-linked manifest, the worker's SITE block, the folder rules, and a whole site built from a tiny
project, checked, tampered with and resealed.

    python3 -I -m unittest discover -s tests/py -p test_hosted.py -v      (from the project root; tests/pwa.test.js runs it too)
"""
import json
import shutil
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tools"))

import hosted   # noqa: E402

try:
    import PIL  # noqa: F401
    HAVE_PIL = True
except ImportError:
    HAVE_PIL = False


class Pieces(unittest.TestCase):
    def test_paths(self):
        self.assertEqual(hosted.bare("app/x.js?v=1a2b3c4d#t"), "app/x.js")
        self.assertTrue(hosted.local("app/x.js"))
        for ref in ("data:image/svg+xml,x", "https://cdn.example/x.js", "//cdn/x.js", "#top", "/abs/x.js", "mailto:a@b"):
            self.assertFalse(hosted.local(ref), ref)
        self.assertEqual(hosted.join("vendor/katex", "fonts/KaTeX_Main-Regular.woff2"), "vendor/katex/fonts/KaTeX_Main-Regular.woff2")
        self.assertEqual(hosted.join("vendor/fonts", "./inter.woff2?v=00000000"), "vendor/fonts/inter.woff2")
        self.assertEqual(hosted.join("app/css", "../img/x.png"), "app/img/x.png")
        self.assertIsNone(hosted.join("", "../outside.js"))

    def test_version_html(self):
        sha = {"app/a.css": "aaaaaaaa", "app/b.js": "bbbbbbbb"}
        html = '<link rel="icon" href="data:image/svg+xml,x"><link rel="stylesheet" href="app/a.css"><script src="app/b.js?v=00000000"></script><script src="app/gone.js"></script>'
        out, refs, lost = hosted.version_html(html, sha)
        self.assertIn('href="app/a.css?v=aaaaaaaa"', out)
        self.assertIn('src="app/b.js?v=bbbbbbbb"', out, "an old version is replaced")
        self.assertIn('href="data:image/svg+xml,x"', out)
        self.assertEqual(refs, ["app/a.css", "app/b.js"])
        self.assertEqual(lost, ["app/gone.js"])
        self.assertEqual(hosted.version_html(out, sha)[0], out, "idempotent")

    def test_version_css(self):
        sha = {"vendor/fonts/inter.woff2": "11111111", "vendor/katex/fonts/KaTeX_Main-Regular.woff2": "22222222"}
        css, lost = hosted.version_css('@font-face{src:url(inter.woff2) format("woff2")}.x{background:url("data:image/png;base64,AA")}', "vendor/fonts/fonts.css", sha)
        self.assertIn("url(inter.woff2?v=11111111)", css)
        self.assertIn('url("data:image/png;base64,AA")', css)
        self.assertEqual(lost, [])
        css2, lost2 = hosted.version_css("a{src:url('fonts/KaTeX_Main-Regular.woff2?v=99999999'),url(fonts/KaTeX_Main-Regular.woff)}", "vendor/katex/katex.min.css", sha)
        self.assertIn("url('fonts/KaTeX_Main-Regular.woff2?v=22222222')", css2)
        self.assertEqual(lost2, ["fonts/KaTeX_Main-Regular.woff"])

    def test_marker_and_snippets(self):
        html = '<!doctype html>\n<html lang="en" data-theme="light">\n<head>\n</head>\n<body></body></html>'
        once = hosted.mark_site(html)
        self.assertIn('<html lang="en" data-theme="light" data-site>', once)
        self.assertEqual(hosted.mark_site(once), once)
        a = hosted.put_links(once, hosted.links_snippet("manifest.webmanifest?v=11111111", "app/img/apple-touch-icon.png?v=22222222"))
        b = hosted.put_links(a, hosted.links_snippet("manifest.webmanifest?v=33333333", None))
        self.assertEqual(b.count("<!--site:links-->"), 1, "the snippet is replaced, not repeated")
        self.assertIn("manifest.webmanifest?v=33333333", b)
        self.assertNotIn("apple-touch-icon", b)
        self.assertIn("/^https?:$/.test(location.protocol)", b, "linked only over http(s)")
        self.assertNotRegex(hosted.LINKS.sub("", b), r'<link\b[^>]*rel="manifest"')
        pre = hosted.preload_snippet([["^//?$", ["app/js/views/home.js"]], ["^/l/[^/]+/?$", ["app/js/views/qcard.js", "app/js/views/lesson.js"]]],
                                     {"app/js/views/home.js": "aaaaaaaa", "app/js/views/qcard.js": "bbbbbbbb", "app/js/views/lesson.js": "cccccccc"})
        self.assertIn('["^/l/[^/]+/?$",["app/js/views/qcard.js?v=bbbbbbbb","app/js/views/lesson.js?v=cccccccc"]]', pre)
        self.assertIn("l.rel='preload';l.as='script'", pre)

    def test_worker_block(self):
        src = (ROOT / "sw.js").read_text()
        self.assertEqual(hosted.read_sw_site(src), {"ver": None}, "the source worker is unbuilt")
        site = {"ver": "deadbeef", "index": "11111111", "files": {"index.html": ["11111111", 10, 5]}, "precache": ["index.html"]}
        filled = hosted.fill_sw(src, site)
        self.assertEqual(hosted.read_sw_site(filled), site)
        self.assertEqual(hosted.read_sw_site(hosted.fill_sw(filled, dict(site, ver="cafebabe")))["ver"], "cafebabe", "refilled in place")
        with self.assertRaises(ValueError):
            hosted.fill_sw("no block here", site)

    def test_manifest_and_args(self):
        with self.assertRaises(ValueError):
            hosted.read_manifest("window.x = 1;\n")
        M = {"lessons": [{}] * 3, "papers": [{"year": 2007}, {"year": 2026}]}
        self.assertEqual(hosted.read_manifest('GAD.reg("manifest","main",' + json.dumps(M) + ");\n"), M)
        self.assertIn("3 lessons, 2 ICAI papers (2007–2026)", hosted.about_line(M))
        self.assertIn("CA Intermediate Group II", hosted.about_line({"lessons": []}))
        self.assertNotIn("papers", hosted.about_line({"lessons": [{}]}).split(":")[1].split(",")[0])
        r = Path("/p")
        self.assertIsNone(hosted.site_dir(["--check"], r))
        self.assertEqual(hosted.site_dir(["--site"], r), r / "_site")
        self.assertEqual(hosted.site_dir(["--site", "/tmp/out"], r), Path("/tmp/out"))
        self.assertEqual(hosted.site_dir(["--site=/tmp/o2"], r), Path("/tmp/o2"))
        self.assertEqual(hosted.site_dir(["--check", "site"], r), r / "_site")
        self.assertEqual(hosted.site_dir(["--check", "site", "/tmp/o3", "--x"], r), Path("/tmp/o3"))
        self.assertIsNone(hosted.site_dir(["site"], r), "'site' alone is not a flag")
        self.assertIn("PRECACHE_BUDGET_GZ", dir(hosted))

    def test_headers(self):
        h = hosted.headers_text()
        for rule in ("/index.html\n  Cache-Control: no-cache", "/sw.js\n  Cache-Control: no-cache", "/manifest.webmanifest\n  Cache-Control: no-cache",
                     "/data/*\n  Cache-Control: public, max-age=31536000, immutable", "X-Content-Type-Options: nosniff"):
            self.assertIn(rule, h)


def tiny_project(root: Path) -> None:
    """the smallest project build_site accepts: a page, base.css, the client and shell, a font sheet, the data manifest, the worker source"""
    w = lambda rel, text: ((root / rel).parent.mkdir(parents=True, exist_ok=True), (root / rel).write_text(text))   # noqa: E731
    w("index.html", '<!doctype html>\n<html lang="en" data-theme="light">\n<head>\n<link rel="icon" href="data:image/svg+xml,x">\n</head>\n<body>\n'
      '<link rel="stylesheet" href="vendor/fonts/fonts.css">\n<link rel="stylesheet" href="app/css/base.css">\n<script src="data/boot.js"></script>\n'
      '<script src="data/manifest.js"></script>\n<script src="app/js/core/pwa.js"></script>\n<script src="app/js/shell.js"></script>\n</body>\n</html>\n')
    w("app/css/base.css", ':root {\n  --bg: #F2F5FF;\n}\n[data-theme="dark"] {\n  --bg: #111215;\n}\n')
    w("app/js/core/pwa.js", "/* client */\n")
    w("app/js/shell.js", "/* shell */\n")
    w("app/js/views/home.js", "/* home */\n")
    w("app/.DS_Store", "finder")
    w("vendor/fonts/fonts.css", "@font-face{font-family:X;src:url(x.woff2) format('woff2')}\n")
    (root / "vendor/fonts/x.woff2").write_bytes(b"wOF2-not-really")
    w("vendor/fonts/LICENSE-x", "license\n")
    w("data/boot.js", "window.GAD={reg(){}};\n")
    w("data/lessons/os/os.a.js", 'GAD.reg("lesson","os.a",{});\n')
    w("data/manifest.js", 'GAD.reg("manifest","main",' + json.dumps({"built": "2026-10-17", "lessons": [{"id": "os.a"}], "papers": [{"year": 2026}], "files": {}, "ver": "x"}) + ");\n")
    shutil.copyfile(ROOT / "sw.js", root / "sw.js")


@unittest.skipUnless(HAVE_PIL, "Pillow draws the icons")
class WholeSite(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp(prefix="hosted-test-"))
        self.root = self.tmp / "project"
        tiny_project(self.root)

    def tearDown(self):
        shutil.rmtree(self.tmp, ignore_errors=True)

    def test_build_check_tamper_reseal(self):
        out, errors, warnings = self.tmp / "site", [], []
        rep = hosted.build_site(self.root, out, errors, warnings)
        self.assertEqual(errors, [])
        self.assertTrue(rep and rep["pre_files"] >= 5, rep)
        html = (out / "index.html").read_text()
        self.assertIn("data-site>", html)
        self.assertRegex(html, r'src="app/js/core/pwa\.js\?v=[0-9a-f]{8}"')
        self.assertRegex(html, r'src="data/manifest\.js\?v=[0-9a-f]{8}"')
        self.assertFalse((out / "app/.DS_Store").exists(), "dot files stay home")
        self.assertTrue((out / "vendor/fonts/LICENSE-x").exists(), "licences ship")
        self.assertRegex((out / "vendor/fonts/fonts.css").read_text(), r"url\(x\.woff2\?v=[0-9a-f]{8}\)")
        for name, size, _ in hosted.ICONS:
            self.assertTrue((out / "app/img" / name).stat().st_size > 200, name)
        man = json.loads((out / "manifest.webmanifest").read_text())
        self.assertEqual(man["background_color"].lower(), "#f2f5ff", "base.css's light --bg")
        self.assertTrue(any(i["purpose"] == "maskable" for i in man["icons"]))
        site = hosted.read_sw_site((out / "sw.js").read_text())
        self.assertEqual(site["index"], site["files"]["index.html"][0])
        self.assertIn("vendor/fonts/x.woff2", site["files"])
        self.assertNotIn("sw.js", site["files"])
        M = hosted.read_manifest((out / "data/manifest.js").read_text())
        self.assertIn("app/img/icon-192.png", M["files"], "the data manifest's table covers the shipped files")
        self.assertNotIn("data/manifest.js", M["files"])
        e2: list = []
        hosted.check_site(out, e2, [])
        self.assertEqual(e2, [], "a fresh build checks clean")
        # tampered: a file changes after the build, so its address is out of date until resealed
        (out / "data/lessons/os/os.a.js").write_text('GAD.reg("lesson","os.a",{"md":"new"});\n')
        e3: list = []
        hosted.check_site(out, e3, [])
        self.assertTrue(any("not sealed" in e for e in e3), e3)
        changed = hosted.seal(out)
        self.assertIn("data/manifest.js", changed)
        self.assertIn("sw.js", changed)
        e4: list = []
        hosted.check_site(out, e4, [])
        self.assertEqual(e4, [])
        self.assertEqual(hosted.seal(out), [], "sealing a sealed copy changes nothing")
        (out / "notes.md").write_text("private")
        e5: list = []
        hosted.check_site(out, e5, [])
        self.assertTrue(any("outside the hosted copy's allowlist" in e for e in e5), e5)

    def test_refuses_unsafe_targets(self):
        for bad in (self.root, self.root / "app" / "x", self.tmp):
            errors: list = []
            self.assertIsNone(hosted.build_site(self.root, bad, errors, []))
            self.assertTrue(errors, bad)
        other = self.tmp / "busy"
        other.mkdir()
        (other / "precious.txt").write_text("keep me")
        errors = []
        self.assertIsNone(hosted.build_site(self.root, other, errors, []))
        self.assertTrue((other / "precious.txt").exists(), "a folder that is not a site build is never replaced")

    def test_source_rules(self):
        errors: list = []
        hosted.check_source(self.root, errors, [])
        self.assertEqual(errors, [])
        p = self.root / "index.html"
        p.write_text(p.read_text().replace("<head>", '<head>\n<link rel="manifest" href="manifest.webmanifest">'))
        hosted.check_source(self.root, errors, [])
        self.assertTrue(any("static <link rel=\"manifest\">" in e for e in errors), errors)


if __name__ == "__main__":
    unittest.main()
