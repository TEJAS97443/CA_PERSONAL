"""Tests for the build's data layer (tools/buildlib; audit WP13): exam calendar, official results, flashcard id ledger, staged output and
content stamps, lab-example citations, search vocabulary, question flag bits, key provenance, key notes, figure tones, the first-paint
colours and the drawings in worked solutions.

    python3 -I -m unittest discover -s tests/py -p test_buildlib.py -v      (from the project root; tests/build-data.test.js runs it too)
"""
import datetime
import json
import os
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tools"))

from buildlib import boot, cards, exam, output, presets, pyq, results, search, textnorm   # noqa: E402

try:
    import PIL  # noqa: F401
    from buildlib import figures
except ImportError:                     # Pillow is a build dependency; without it the figure tests are skipped
    figures = None


def tree(files: dict) -> tempfile.TemporaryDirectory:
    """a temporary project root holding {relative path: text or JSON-able object}"""
    d = tempfile.TemporaryDirectory()
    for rel, body in files.items():
        p = Path(d.name) / rel
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(body if isinstance(body, str) else json.dumps(body))
    return d


CYCLE = {"id": "icai-inter-2027-01", "label": "CA Inter January 2027", "organiser": "ICAI", "group": "Group II",
         "days": ["2027-01-08", "2027-01-10", "2027-01-12"], "papers": {"P4": ["2027-01-08"], "P5": ["2027-01-10"], "P6": ["2027-01-12"]},
         "time": {"start": "14:00", "end": "17:00", "reading": "13:45", "zone": "IST"},
         "result": None, "source": "https://resource.cdn.icai.org/94359exam-aps6372-stu-iff-jan2027.pdf", "checked": "2026-10-20"}


class ExamCalendar(unittest.TestCase):
    """P1-46: content/exam.json -> manifest.exam; --check rejects bad dates and warns when the newest cycle has ended"""

    def load(self, doc, today=datetime.date(2026, 10, 16)):
        with tree({"content/exam.json": doc}) as d:
            e, w = [], []
            return exam.load(Path(d), e, w, today=today), e, w

    def test_valid_cycle_ships_with_its_note(self):
        out, e, w = self.load({"cycles": [CYCLE]})
        self.assertEqual(e, [])
        self.assertEqual(w, [])
        self.assertEqual(out["cycles"][0]["days"], CYCLE["days"])
        self.assertEqual(out["cycles"][0]["note"], "Dates as announced by ICAI; verify on icai.org")
        self.assertEqual(out["cycles"][0]["papers"]["P4"], ["2027-01-08"])
        self.assertEqual(out["cycles"][0]["time"]["reading"], "13:45")

    def test_rejects_unsorted_and_non_iso_days(self):
        for days in (["2027-01-10", "2027-01-08"], ["8 Jan 2027"], ["2027-02-30"], ["2027-01-08", "2027-01-08"]):
            out, e, _ = self.load({"cycles": [dict(CYCLE, days=days)]})
            self.assertIsNone(out, days)
            self.assertTrue(e, days)

    def test_rejects_paper_day_outside_the_cycle_bad_codes_and_early_result(self):
        self.assertTrue(self.load({"cycles": [dict(CYCLE, papers={"P4": ["2027-01-09"]})]})[1])
        self.assertTrue(self.load({"cycles": [dict(CYCLE, papers={"CS": ["2027-01-08"]})]})[1], "a paper code is P4, P5, P6 or P6A")
        self.assertTrue(self.load({"cycles": [dict(CYCLE, result="2027-01-10")]})[1])
        self.assertTrue(self.load({"cycles": [dict(CYCLE, time={"start": "2 PM"})]})[1])
        self.assertEqual(self.load({"cycles": [dict(CYCLE, papers={"P5": ["2027-01-10"]}, result="2027-02-03")]})[1], [])

    def test_rejects_missing_fields_http_source_and_unsorted_or_overlapping_cycles(self):
        self.assertTrue(self.load({"cycles": [{k: v for k, v in CYCLE.items() if k != "organiser"}]})[1])
        self.assertTrue(self.load({"cycles": [dict(CYCLE, source="http://www.icai.org/")]})[1])
        nxt = dict(CYCLE, id="icai-inter-2027-05", label="CA Inter May 2027", days=["2027-05-10"], papers={"P4": ["2027-05-10"]}, result=None)
        self.assertEqual(self.load({"cycles": [CYCLE, nxt]})[1], [])
        self.assertTrue(self.load({"cycles": [nxt, CYCLE]})[1])
        self.assertTrue(self.load({"cycles": [CYCLE, dict(nxt, days=["2027-01-10"], papers={})]})[1])
        self.assertTrue(self.load({"cycles": []})[1])
        self.assertTrue(self.load("{not json")[1])

    def test_warns_once_the_newest_cycle_has_ended(self):
        out, e, w = self.load({"cycles": [CYCLE]}, today=datetime.date(2027, 3, 1))
        self.assertEqual(e, [])
        self.assertIsNotNone(out)
        self.assertTrue(any("ended" in x for x in w), w)

    def test_absent_file_falls_back_quietly(self):
        with tree({}) as d:
            e, w = [], []
            self.assertIsNone(exam.load(Path(d), e, w))
            self.assertEqual(e, [])
            self.assertEqual(len(w), 1)

    def test_the_shipped_calendar_is_valid(self):
        e, w = [], []
        out = exam.load(ROOT, e, w, today=datetime.date(2026, 10, 16))
        self.assertEqual(e, [])
        self.assertEqual(out["cycles"][0]["days"], CYCLE["days"])
        self.assertEqual(out["cycles"][0]["papers"], CYCLE["papers"])
        self.assertEqual(out["cycles"][0]["source"], CYCLE["source"])


def bank():
    import syllabus
    syl = syllabus.load()
    syl["subjects_by_id"] = {s["id"]: s for s in syl["subjects"]}
    e, w = [], []
    papers, questions = pyq.load_papers(ROOT, syl, False, False, e, w)
    assert not e, e
    return syl, papers, questions


SYL, PAPERS, QUESTIONS = bank()
# the results module (GATE's sourced qualifying marks, D11) is inert in PassBook (no pyq/sources/results.json); its rules are tested on a fixture
RPAPERS = [{"id": i, "year": int(i[3:7]), "marks": 100} for i in ("cs-2026-1", "cs-2026-2", "cs-2025-1", "cs-2025-2")]
RESULT = {"exam": "GATE 2026", "paper": "CS", "papers": ["cs-2026-1", "cs-2026-2"], "organiser": "IIT Guwahati", "outOf": 100,
          "qualifying": {"General": 30, "OBC-NCL/EWS": 27, "SC/ST/PwD": 20},
          "source": {"url": "https://gate2026.iitg.ac.in/cut-off.html", "wayback": "20261001134100", "sha256": "6ed7485a" * 8},
          "checked": "2026-10-16"}


class OfficialResults(unittest.TestCase):
    """P2-35 / D11: sourced qualifying marks only"""

    def load(self, recs):
        with tree({"pyq/sources/results.json": {"results": recs}}) as d:
            e, w = [], []
            return results.load(Path(d), RPAPERS, e, w), e

    def test_valid_record(self):
        out, e = self.load([RESULT])
        self.assertEqual(e, [])
        self.assertEqual(out[0]["qualifying"]["General"], 30)
        self.assertNotIn("registered", out[0])

    def test_rejects_bad_records(self):
        bad = [dict(RESULT, papers=["cs-2026-9"]), dict(RESULT, papers=["cs-2025-1"]), dict(RESULT, outOf=150),
               dict(RESULT, qualifying={"OBC-NCL/EWS": 27}), dict(RESULT, qualifying={"General": 130}), dict(RESULT, paper="DA"),
               dict(RESULT, exam="2026"), dict(RESULT, checked="16 Oct 2026"),
               dict(RESULT, source=dict(RESULT["source"], url="http://gate2026.iitg.ac.in/cut-off.html")),
               dict(RESULT, source=dict(RESULT["source"], sha256="abc")), dict(RESULT, source=dict(RESULT["source"], wayback="2026"))]
        for r in bad:
            out, e = self.load([r])
            self.assertEqual(out, [], r)
            self.assertTrue(e, r)
        self.assertTrue(self.load([RESULT, RESULT])[1])

    def test_sorted_newest_first_and_no_shipped_file(self):
        older = dict(RESULT, exam="GATE 2025", papers=["cs-2025-1", "cs-2025-2"])
        self.assertEqual([r["exam"] for r in self.load([older, RESULT])[0]], ["GATE 2026", "GATE 2025"])
        e, w = [], []
        self.assertEqual(results.load(ROOT, PAPERS, e, w), [])
        self.assertEqual(e, [])


class CardLedger(unittest.TestCase):
    """P3-51: a card edited in place keeps its review history through an alias; moves and removals only warn"""

    def run_update(self, old, cur):
        w = []
        led, added = cards.update({"lessons": old, "aliases": {}}, cur, w)
        return led, added, w

    def test_first_build_and_unchanged(self):
        led, added = cards.update({"lessons": {}, "aliases": {}}, {"l1": ["a", "b"]}, [])
        self.assertEqual((led["lessons"], led["aliases"], added), ({"l1": ["a", "b"]}, {}, []))
        led, added, w = self.run_update({"l1": ["a", "b"]}, {"l1": ["a", "b"]})
        self.assertEqual((added, w), ([], []))

    def test_edit_in_place_aliases_and_ships(self):
        led, added, w = self.run_update({"l1": ["a", "b", "c"]}, {"l1": ["a", "B", "c"]})
        self.assertEqual(added, [("b", "B")])
        self.assertEqual(led["aliases"], {"b": "B"})
        self.assertEqual(cards.shipped(led, {"a", "B", "c"}), {"b": "B"})
        self.assertEqual(w, [])

    def test_edit_plus_append_still_aliases(self):
        self.assertEqual(self.run_update({"l1": ["a", "b"]}, {"l1": ["a", "B", "x"]})[1], [("b", "B")])

    def test_chains_collapse_and_an_edit_back_needs_no_alias(self):
        w = []
        led, _ = cards.update({"lessons": {"l1": ["a"]}, "aliases": {}}, {"l1": ["b"]}, w)
        led, _ = cards.update(led, {"l1": ["c"]}, w)
        self.assertEqual(led["aliases"], {"a": "c", "b": "c"})
        led2, _ = cards.update({"lessons": {"l1": ["b"]}, "aliases": {"a": "b"}}, {"l1": ["a"]}, w)
        self.assertEqual(led2["aliases"], {"b": "a"})            # a -> a is dropped; the edited version's history returns to a
        self.assertEqual(cards.shipped(led2, {"a"}), {"b": "a"})

    def test_moves_and_removals_only_warn(self):
        for old, cur in ((["a", "b", "c"], ["a", "c", "b"]), (["a", "b", "c"], ["a", "c"]), (["a", "b"], ["b", "x"])):
            led, added, w = self.run_update({"l1": old}, {"l1": cur})
            self.assertEqual(added, [], (old, cur))
            self.assertTrue(w, (old, cur))

    def test_appending_is_silent_and_a_removed_lesson_keeps_its_row(self):
        led, added, w = self.run_update({"l1": ["a"], "gone": ["g"]}, {"l1": ["a", "b"]})
        self.assertEqual((added, w), ([], []))
        self.assertEqual(led["lessons"]["gone"], ["g"])

    def test_shipped_drops_dead_targets_and_live_sources(self):
        led = {"lessons": {}, "aliases": {"a": "b", "c": "d", "e": "f"}}
        self.assertEqual(cards.shipped(led, {"b", "d", "c"}), {"a": "b"})

    def test_save_is_atomic_and_skips_unchanged(self):
        with tree({}) as d:
            led = {"lessons": {"l1": ["a"]}, "aliases": {}}
            self.assertTrue(cards.save(Path(d), led))
            self.assertFalse(cards.save(Path(d), led))
            self.assertEqual(cards.load(Path(d), [])["lessons"], {"l1": ["a"]})
            self.assertEqual([p.name for p in (Path(d) / "content").iterdir()], ["card-ids.json"])

    def test_the_shipped_ledger_matches_the_lessons(self):    # (an empty ledger while no lesson has cards)
        e = []
        led = cards.load(ROOT, e)
        self.assertEqual(e, [])
        self.assertIsInstance(led["lessons"], dict)
        self.assertTrue(all(isinstance(v, list) and all(c.startswith(k + "#") for c in v) for k, v in led["lessons"].items()))


class StagedOutput(unittest.TestCase):
    """data/ is built in a staging tree and swapped in at once; content stamps for versioned URLs (P1-58)"""

    def test_commit_swaps_the_whole_tree(self):
        with tempfile.TemporaryDirectory() as d:
            live = Path(d) / "data"
            (live / "old").mkdir(parents=True)
            (live / "old" / "x.js").write_text("old")
            (live / "keep.js").write_text("stale")
            st = output.Stage(live)
            st.write("keep.js", "fresh")
            st.reg("lessons/os/os.a.js", "lesson", "os.a", {"md": "</script>"})
            self.assertEqual(sorted(st.files("data")), ["data/keep.js", "data/lessons/os/os.a.js"])
            self.assertEqual((live / "keep.js").read_text(), "stale")          # nothing changes until commit
            st.commit()
            self.assertEqual((live / "keep.js").read_text(), "fresh")
            self.assertFalse((live / "old").exists())
            self.assertIn("<\\/script>", (live / "lessons" / "os" / "os.a.js").read_text())
            self.assertEqual(sorted(p.name for p in Path(d).iterdir()), ["data"])  # no staging or old tree left behind

    def test_commit_without_a_live_tree_and_abort(self):
        with tempfile.TemporaryDirectory() as d:
            live = Path(d) / "data"
            st = output.Stage(live)
            st.write("a.js", "1")
            st.commit()
            self.assertEqual((live / "a.js").read_text(), "1")
            st2 = output.Stage(live)
            st2.write("a.js", "2")
            st2.abort()
            self.assertEqual((live / "a.js").read_text(), "1")
            self.assertEqual(sorted(p.name for p in Path(d).iterdir()), ["data"])

    def test_hash_tree_skips_hidden_files_and_stamp_ignores_the_build_date(self):
        with tree({"app/a.js": "a", "app/.DS_Store": "x", "app/.cache/b.js": "b", "app/sub/c.css": "c"}) as d:
            h = output.hash_tree(Path(d) / "app", "app")
            self.assertEqual(sorted(h), ["app/a.js", "app/sub/c.css"])
            self.assertEqual(h["app/a.js"], output.sha8(b"a"))
            m = {"built": "2026-10-16", "lessons": [1]}
            s1 = output.stamp(m, h)
            self.assertEqual(s1, output.stamp(dict(m, built="2026-10-17", files=h, ver="x"), dict(reversed(list(h.items())))))
            self.assertNotEqual(s1, output.stamp(m, dict(h, **{"app/a.js": "00000000"})))
            self.assertNotEqual(s1, output.stamp(dict(m, lessons=[2]), h))
            self.assertRegex(s1, r"^[0-9a-f]{8}$")

    def test_write_atomic(self):
        with tree({}) as d:
            p = Path(d) / "docs" / "X.md"
            self.assertTrue(output.write_atomic(p, "x"))
            self.assertFalse(output.write_atomic(p, "x"))
            self.assertEqual([q.name for q in p.parent.iterdir()], ["X.md"])


class LabExampleCitations(unittest.TestCase):
    """P1-38: structured citations must exist (error); ids loose in a label only warn"""

    def test_classify(self):
        qids = {"cs-2015-1:CS46", "cs-2012:Q42"}
        e, w = [], []
        n = presets.classify([
            {"lab": "x", "i": 0, "label": "[cs-2012:Q42] Pipeline", "tag": ["cs-2012:Q42"], "pyq": None},
            {"lab": "x", "i": 1, "label": "Disk", "tag": None, "pyq": ["cs-2015-1:Q46"]},
            {"lab": "x", "i": 2, "label": "GATE 2015 Q46 [cs-2015-1:Q46]: SSTF", "tag": None, "pyq": None},
            {"lab": "x", "i": 3, "label": "No paper", "tag": None, "pyq": None},
        ], qids, e, w)
        self.assertEqual(n, {"presets": 4, "cited": 3, "structured": 2})
        self.assertEqual(len(e), 1)
        self.assertIn("example 2 cites cs-2015-1:Q46", e[0])
        self.assertIn("did you mean cs-2015-1:CS46?", e[0])
        self.assertEqual(len(w), 1)
        self.assertIn("example 3", w[0])



class SearchVocabulary(unittest.TestCase):
    """P1-26: one normalisation with the runtimes, topic names and alphanumeric tokens in the postings, a derived alias table"""

    def test_norm(self):
        cases = {"LR(1) parser": "lr1 parser", "Banker's algorithm": "banker algorithm", "Go-Back-N": "go back n", "IEEE 754": "ieee 754",
                 "L'Hôpital": "lhopital", "ε-NFA": "epsilon nfa", "B+ tree": "bplus tree", "3NF and 2PL": "3nf and 2pl", None: ""}
        for raw, want in cases.items():
            self.assertEqual(textnorm.norm(raw), want, raw)

    def test_index_words_and_topic_tokens(self):
        self.assertEqual(search.index_words("Find $x^2$ of the LR(1) items in a DFA"), {"find", "lr1", "items", "dfa"})
        q = {"stem": "Which is true?", "topic": "t", "subtopic": "s"}
        nodes = {"t": {"name": "Deadlock"}, "s": {"name": "Banker's algorithm"}}
        self.assertTrue({"deadlock", "banker", "algorithm"} <= search.question_tokens(q, nodes))

    def test_postings_drop_words_that_are_everywhere(self):
        qs = [{"stem": "common word%d" % i} for i in range(search.MAX_POSTINGS + 1)]
        post = search.postings(qs, {})
        self.assertNotIn("common", post)
        self.assertEqual(post["word0"], [0])

    def test_derived_aliases(self):
        a = search.derived_aliases(["A Translation Lookaside Buffer (TLB) caches page-table entries.",
                                    "The TLB (translation lookaside buffer) again.", "Some Random Words (XYZ) here.",
                                    "Inline $x (TLB)$ maths is ignored.", "It is (IT) nothing."])
        self.assertEqual(a.get("tlb"), ["translation lookaside buffer"])
        self.assertNotIn("xyz", a)
        self.assertNotIn("it", a)

    def test_search_meta_keeps_subject_words_free(self):
        m = search.search_meta(["Operating System (OS) basics", "Dynamic Programming (DP) tables"], {"os"})
        self.assertNotIn("os", m["alias"])
        self.assertIn("dynamic programming", m["alias"]["dp"])
        self.assertEqual(m["alias"]["kmap"], ["karnaugh"])
        self.assertEqual(m["stop"], sorted(search.STOP))


class FlagBits(unittest.TestCase):
    """P0-04 (MTA), P2-77 (CHECKED, DISPUTE): the manifest's flags column"""

    def flags(self, **q):
        base = {"subtopic": None, "topic": None, "figures": None}
        return pyq.flags_of(dict(base, **q), SYL)

    def test_bits(self):
        F = pyq.FLAG
        mta = self.flags(answer={"kind": "mta"}, check={"agrees": True})
        self.assertEqual(mta & (F["MTA"] | F["SPECIAL"] | F["KEY"]), F["MTA"] | F["SPECIAL"] | F["KEY"])
        self.assertFalse(self.flags(answer={"kind": "oneof", "value": ["A", "B"]}) & F["MTA"])
        self.assertTrue(self.flags(answer={"kind": "oneof", "value": ["A", "B"]}) & F["SPECIAL"])
        self.assertTrue(self.flags(answer={"kind": "single", "value": "A"}, check={"agrees": True}) & F["CHECKED"])
        disputed = self.flags(answer={"kind": "single", "value": "A"}, check={"agrees": False, "dispute": "B is right"})
        self.assertEqual(disputed & (F["DISPUTE"] | F["CHECKED"]), F["DISPUTE"])
        self.assertTrue(self.flags(answer=None, check={"blind": "B"}) & F["CHECKED"])
        self.assertFalse(self.flags(answer=None, check={}) & F["CHECKED"])



class KeyProvenance(unittest.TestCase):
    """P0-21: every keyed paper names its key source; GATE 2020's key is printed in its question paper"""


    def test_a_same_file_key_must_name_the_question_paper(self):
        qp = {"url": "https://example.org/qp.pdf"}
        files = {"pyq/sources/manifest.json": {"papers": {"cs-2030": {"year": 2030, "set": 1, "organiser": "IIT X", "qp": [qp],
                                                                      "key": [{"url": "https://example.org/other.pdf", "same_file_pages": [9]}]}}},
                 "pyq/sources/fetched.json": {"f1": {"paper": "cs-2030", "kind": "qp", "url": qp["url"], "sha256": "ab" * 32,
                                                     "retrieved": "2030-03-01T00:00:00"}},
                 "pyq/parsed/cs-2030.json": {"questions": [{"id": "cs-2030:Q1", "section": "CS", "no": 1, "type": "MCQ", "marks": 1,
                                                            "stem": "x", "answer": {"kind": "single", "value": "A"},
                                                            "transcription": {"status": "verified"}}]}}
        with tree(files) as d:
            e, w = [], []
            papers, _ = pyq.load_papers(Path(d), SYL, False, False, e, w)
            self.assertTrue(any("same_file_pages" in x for x in e), e)
            self.assertEqual(papers[0]["src"]["key"]["note"], "key on p. 9")


@unittest.skipIf(figures is None, "Pillow is not installed")
class FigureTones(unittest.TestCase):
    """P1-20: line art inverts in dark mode ('mono'); colour charts and figures whose question names a fill colour keep their colours"""

    def png(self, d, name, colour):
        from PIL import Image, ImageDraw
        im = Image.new("RGB", (60, 40), "white")
        dr = ImageDraw.Draw(im)
        if colour:
            dr.rectangle([0, 0, 40, 40], fill=(220, 40, 40))
        else:
            dr.line([0, 0, 59, 39], fill="black", width=2)
        p = Path(d) / "pyq" / "figs" / "cs-2030" / name
        p.parent.mkdir(parents=True, exist_ok=True)
        im.save(p)

    def test_tones(self):
        with tempfile.TemporaryDirectory() as d:
            for name, colour in (("a.png", False), ("b.png", True), ("c.png", False), ("d.png", False), ("e.png", False)):
                self.png(d, name, colour)
            qs = [{"id": "q1", "paper": "cs-2030", "stem": "Trace the graph", "figures": [{"file": "a.png"}]},
                  {"id": "q2", "paper": "cs-2030", "stem": "Read the chart", "figures": [{"file": "b.png"}, {"file": "c.png"}]},
                  {"id": "q3", "paper": "cs-2030", "stem": "How many shaded cells?", "figures": [{"file": "d.png"}]},
                  {"id": "q4", "paper": "cs-2030", "stem": "Pick one", "figures": [{"file": "missing.png"}]}]
            w = []
            t = figures.tones(Path(d), qs, w)
            self.assertEqual(t[("cs-2030", "a.png")], "mono")
            self.assertEqual((t[("cs-2030", "b.png")], t[("cs-2030", "c.png")]), ("colour", "colour"))   # siblings share a tone
            self.assertEqual(t[("cs-2030", "d.png")], "colour")
            self.assertEqual(t[("cs-2030", "missing.png")], "mono")
            self.assertEqual(len(w), 1)

    def test_webp_copies_are_reused_while_the_png_is_unchanged(self):
        with tempfile.TemporaryDirectory() as d:
            self.png(d, "a.png", False)
            old, s1, s2 = Path(d) / "old", Path(d) / "s1", Path(d) / "s2"
            self.assertEqual(figures.write_webp(Path(d), old, s1, []), (1, 0))
            os.rename(s1, old)
            self.assertEqual(figures.write_webp(Path(d), old, s2, []), (0, 1))
            self.assertTrue((s2 / "figs" / "cs-2030" / "a.webp").stat().st_size > 0)


class FigureSizes(unittest.TestCase):
    """P3-38: each figure ships its pixel size from the PNG header (no decoding, no Pillow), so a card keeps the image's box before it loads;
    option figures wait for img.qc-optfig to keep its aspect ratio (OPTION_SIZES)"""

    @staticmethod
    def png_bytes(w, h):
        import struct
        import zlib
        ihdr = struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)
        return b"\x89PNG\r\n\x1a\n" + struct.pack(">I", 13) + b"IHDR" + ihdr + struct.pack(">I", zlib.crc32(b"IHDR" + ihdr))

    def test_png_size_reads_the_header_only(self):
        from buildlib import figures as F
        with tempfile.TemporaryDirectory() as d:
            ok, bad, short = Path(d) / "a.png", Path(d) / "b.png", Path(d) / "c.png"
            ok.write_bytes(self.png_bytes(581, 589) + b"not a real image body")
            bad.write_bytes(b"GIF89a" + b"\0" * 40)
            short.write_bytes(b"\x89PNG")
            self.assertEqual(F.png_size(ok), (581, 589))
            self.assertIsNone(F.png_size(bad))
            self.assertIsNone(F.png_size(short))

    def test_sizes_and_which_figures_ship_them(self):
        from buildlib import figures as F
        with tempfile.TemporaryDirectory() as d:
            figs = Path(d) / "pyq" / "figs" / "cs-2030"
            figs.mkdir(parents=True)
            (figs / "a.png").write_bytes(self.png_bytes(60, 40))
            (figs / "b.png").write_bytes(self.png_bytes(30, 20))
            (figs / "c.png").write_bytes(b"not a png")
            qs = [{"id": "q1", "paper": "cs-2030", "figures": [{"file": "a.png", "where": "stem"}]},
                  {"id": "q2", "paper": "cs-2030", "figures": [{"file": "b.png", "where": "opt:A"}, {"file": "a.png", "where": "stem"}]},
                  {"id": "q3", "paper": "cs-2030", "figures": [{"file": "c.png", "where": "stem"}, {"file": "gone.png", "where": "stem"}]}]
            w = []
            got = F.sizes(Path(d), qs, w)
            self.assertEqual(got, {("cs-2030", "a.png"): (60, 40), ("cs-2030", "b.png"): (30, 20)})
            self.assertEqual(len(w), 1, w)          # c.png is not a PNG; a missing file is the tone check's warning, not a second one
            self.assertIn("c.png", w[0])
        self.assertTrue(F.sized("stem") and F.sized(None) and F.sized("group"))
        self.assertEqual(F.sized("opt:A"), F.OPTION_SIZES)

class GreyPaper(unittest.TestCase):
    """P1-20 (WP9a's gallery residual): a scan's grey paper and the show-through on it turn white in the WebP copy, so it neither shows as a
    grey box in light mode nor as a lighter box with ghost text once dark mode inverts it; white paper, colour figures and grey fills are
    copied as printed; the recipe travels in the WebP, so a changed rule re-encodes exactly the copies it affects"""

    def scan(self, d, name, paper=(229, 236), white=0, colour=False, fill=None):
        """a 120 x 80 'scan': paper noise in `paper`, a dark line, faint show-through at 214; `white` columns of pure white, a red block, or
        a grey fill over most of a white page"""
        import random
        from PIL import Image, ImageDraw
        rnd = random.Random(7)
        im = Image.new("RGB", (120, 80))
        px = im.load()
        for y in range(80):
            for x in range(120):
                v = 255 if x < white else rnd.randint(*paper)
                px[x, y] = (v, v, v)
        dr = ImageDraw.Draw(im)
        if fill:
            im.paste((255, 255, 255), (0, 0, 120, 80))
            dr.rectangle([0, 0, 100, 79], fill=(fill,) * 3)
        dr.text((8, 60), "show-through", fill=(214, 214, 214))
        dr.line([4, 4, 116, 50], fill=(40, 40, 40), width=3)
        if colour:
            dr.rectangle([90, 0, 119, 79], fill=(220, 40, 40))
        p = Path(d) / "pyq" / "figs" / "cs-2030" / name
        p.parent.mkdir(parents=True, exist_ok=True)
        im.save(p)
        return p

    def test_paper_white_reads_the_paper_peak(self):
        h = [0] * 256
        h[255] = 1000
        self.assertIsNone(figures.paper_white(h))                       # white paper
        h = [0] * 256
        for v in range(226, 241):
            h[v] = 60
        h[234] = 400                                                    # the paper's peak, its noise down to 226
        h[40] = 30                                                      # ink
        self.assertEqual(figures.paper_white(h), 226)
        h[100] = 5000                                                   # mostly dark: no paper background
        self.assertIsNone(figures.paper_white(h))
        h = [0] * 256
        for v in range(190, 240):
            h[v] = 70                                                   # a long tail above 2 % of the peak at every level ...
        h[240] = 3000                                                   # ... so the white point stops PAPER_SPAN below the peak
        self.assertEqual(figures.paper_white(h), 240 - figures.PAPER_SPAN)
        h = [0] * 256
        h[200], h[255] = 700, 300                                       # a grey fill on white paper is not paper
        self.assertIsNone(figures.paper_white(h))
        self.assertEqual(figures.levels(224)[224], 255)
        self.assertEqual((figures.levels(224)[0], figures.levels(224)[112]), (0, 128))

    def test_grey_paper_is_levelled_and_the_recipe_is_kept(self):
        from PIL import Image
        with tempfile.TemporaryDirectory() as d:
            self.scan(d, "g.png")
            self.scan(d, "w.png", white=120)                            # white paper
            self.scan(d, "c.png", colour=True)                          # a colour figure on grey paper
            self.scan(d, "f.png", fill=205)                             # a grey fill over most of a white page
            root, old, s1, s2, s3 = Path(d), Path(d) / "old", Path(d) / "s1", Path(d) / "s2", Path(d) / "s3"
            figs = root / "pyq" / "figs" / "cs-2030"
            self.assertEqual([figures.white_point(figs / n) for n in ("g.png", "w.png", "c.png", "f.png")], [229, None, None, None])
            self.assertEqual(figures.write_webp(root, old, s1, []), (4, 0))
            out = s1 / "figs" / "cs-2030"
            self.assertEqual([figures.recipe_of(out / n) for n in ("g.webp", "w.webp", "c.webp", "f.webp")], ["paper 229", "", "", ""])
            with Image.open(out / "g.webp") as im:
                g = im.convert("L")
            hist = g.histogram()
            self.assertGreater(sum(hist[250:]) / sum(hist), 0.9, "the paper is white")
            self.assertLess(min(g.getpixel((60, y)) for y in range(20, 34)), 90, "the line keeps its weight")
            with Image.open(out / "f.webp") as im:
                self.assertLess(abs(im.convert("L").getpixel((95, 75)) - 205), 6, "a grey fill keeps its tone")
            with Image.open(figs / "g.png") as im:
                self.assertLess(max(im.convert("L").histogram()[250:]), 1, "the source PNG is never changed")
            os.rename(s1, old)
            self.assertEqual(figures.write_webp(root, old, s2, []), (0, 4))     # same recipes: every copy reused
            shutil_rm(old)
            os.rename(s2, old)
            figures.KEEP_PAPER.add("g.png")
            try:
                self.assertEqual(figures.write_webp(root, old, s3, []), (1, 3))     # the exempted scan alone is made again, as printed
                self.assertEqual(figures.recipe_of(s3 / "figs" / "cs-2030" / "g.webp"), "")
            finally:
                figures.KEEP_PAPER.discard("g.png")


def shutil_rm(p: Path) -> None:
    import shutil
    shutil.rmtree(p, ignore_errors=True)


if __name__ == "__main__":
    unittest.main()


class KeyNotes(unittest.TestCase):
    """P2-24: the card shows one short learner-facing sentence, never the build log; P2-28: an unkeyed paper names its own organiser"""

    def test_rules(self):
        R = pyq.reader_key_note
        self.assertIsNone(R({}))
        self.assertEqual(R({"key_note": "code A, key page 2"}),
                         "From page 2 of the official key, under paper code A, the code of the question paper transcribed here.")
        self.assertEqual(R({"key_note": "Key PDF page 2 lists this MSQ with the single key \"A\". key.json parsed it as kind single; recorded here as "
                                        "multi [\"A\"] (MSQ normal form: exactly this option).", "answer": {"kind": "multi", "value": ["A"]}}),
                         "The official key (page 2) lists one correct option for this MSQ: select A only.")
        self.assertEqual(R({"key_note": "Official key (key0.pdf p. 1, CS-1 table, GA Q.9; the same table is printed on pp. 41-43 of the question "
                                        "paper) reads \"C OR D\" (either is accepted). The machine-parsed key.json has no row for this question.",
                            "answer": {"kind": "oneof", "alts": []}}),
                         "Checked by hand against page 1 of the official key, which accepts either answer.")
        self.assertEqual(R({"key_note": "key.json row GA 10 is empty (the tick-icon decoder found no answer). Key PDF page 5, Question Number 10: "
                                        "option 3 (C) carries the green tick.", "answer": {"kind": "single", "value": "C"}}),
                         "Checked by hand against page 5 of the official key.")
        self.assertIsNone(R({"key_note": "Something nobody has a rule for."}), "an unknown note is left for the build to warn about")




class FirstPaint(unittest.TestCase):
    """P2-78: index.html's literal first-paint colours equal base.css's --bg in both themes"""
    CSS = ':root {\n  --bg: #F2F5FF; --ink: #000;\n}\n[data-theme="dark"] {\n  --bg: #111215;\n}\n@media print {\n  :root, [data-theme="dark"] {\n    --bg: #FFFFFF;\n  }\n}\n'

    def test_reads_base_css(self):
        self.assertEqual(boot.css_bg(self.CSS), {"light": "#f2f5ff", "dark": "#111215"})

    def test_inline_backgrounds_and_metas(self):
        html = ('<meta name="theme-color" content="#F2F5FF" media="(prefers-color-scheme: light)">'
                '<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#111215">'
                '<style>/* first paint */ html{background:#F2F5FF} html[data-theme="dark"]{background-color:#111215}'
                ' @media (prefers-color-scheme: dark) { html:not([data-theme=light]) { background: #111215 } } .x{background:#fff}</style>')
        self.assertEqual(boot.inline_backgrounds(html), [("light", "#f2f5ff", "html"), ("dark", "#111215", 'html[data-theme="dark"]'),
                                                         ("dark", "#111215", "html:not([data-theme=light])")])
        self.assertEqual(boot.theme_metas(html), [("light", "#f2f5ff"), ("dark", "#111215")])

    def test_check_flags_a_mismatch(self):
        good = '<meta name="theme-color" content="#F2F5FF" media="(prefers-color-scheme: light)"><style>html{background:#F2F5FF}html[data-theme=dark]{background:#111215}</style>'
        with tree({"app/css/base.css": self.CSS, "index.html": good}) as d:
            e, w = [], []
            boot.check(Path(d), e, w)
            self.assertEqual((e, w), ([], []))
        bad = good.replace("html[data-theme=dark]{background:#111215}", "html[data-theme=dark]{background:#000000}")
        with tree({"app/css/base.css": self.CSS, "index.html": bad}) as d:
            e, w = [], []
            boot.check(Path(d), e, w)
            self.assertEqual(len(e), 1)
            self.assertIn("dark background #000000", e[0])
        one = '<style>html{background:#F2F5FF}</style>'
        with tree({"app/css/base.css": self.CSS, "index.html": one}) as d:
            e, w = [], []
            boot.check(Path(d), e, w)
            self.assertEqual(e, [])
            self.assertEqual(len(w), 1, "only one theme painted inline")
        with tree({"app/css/base.css": self.CSS, "index.html": "<title>x</title>"}) as d:
            e, w = [], []
            self.assertEqual(boot.check(Path(d), e, w)["inline"], [])
            self.assertEqual((e, w), ([], []), "no inline background yet: nothing to compare")

    def test_the_shipped_files_agree(self):
        e, w = [], []
        r = boot.check(ROOT, e, w)
        self.assertEqual(e, [])
        self.assertEqual({t for t, _ in r["metas"]}, {"light", "dark"})


class SolutionDiagrams(unittest.TestCase):
    """P3-14: the drawings in worked solutions parse and have an accessible name; the build names the three written before the rule"""

    TEXT = ('Intro.\n\n```diagram title="The tree"\n{"type":"tree","root":{"label":"a"}}\n```\n\nThen:\n\n```diagram\n{"type":"graph","nodes":[]}\n```\n\n'
            '::: diagram The flow graph\n{"type":"graph","nodes":[]}\n:::\n\n```diagram\n{"type":"table","head":["x"],"rows":[["1"]]}\n```\n\n'
            '```diagram\n{"type":"plot","caption":"f(x)"}\n```\n\n```diagram\n{"type": nope}\n```\n')

    def test_finds_fences_and_blocks_and_their_names(self):
        ds = pyq.solution_diagrams(self.TEXT)
        self.assertEqual([(d["type"], d["named"]) for d in ds],
                         [("tree", True), ("graph", False), ("graph", True), ("table", True), ("plot", True), ("diagram", False)])
        self.assertIsNone(ds[-1]["spec"], "invalid JSON")
        self.assertEqual(pyq.solution_diagrams(None), [])

    def test_named_solution_titles_the_first_unnamed_drawing(self):
        w = []
        qid = next(iter(pyq.SOLUTION_DIAGRAM_NAMES))
        out = pyq.named_solution(qid, self.TEXT, w)
        self.assertEqual(w, [])
        self.assertIn('{"title": ' + json.dumps(pyq.SOLUTION_DIAGRAM_NAMES[qid], ensure_ascii=False) + ', "type":"graph","nodes":[]}', out)
        self.assertEqual([d["named"] for d in pyq.solution_diagrams(out)][:3], [True, True, True])
        self.assertEqual(pyq.named_solution("cs-1999:Q1", self.TEXT, w), self.TEXT, "no entry: unchanged")
        self.assertEqual(pyq.named_solution(qid, '```diagram\n{}\n```', w), '```diagram\n{"title": ' + json.dumps(pyq.SOLUTION_DIAGRAM_NAMES[qid], ensure_ascii=False) + '}\n```')
        named = '```diagram title="x"\n{"type":"graph"}\n```'
        self.assertEqual(pyq.named_solution(qid, named, w), named)
        self.assertEqual(len(w), 1)
        self.assertIn("remove its entry", w[0])

    def test_check_reports_unnamed_and_broken(self):
        e, w = [], []
        n = pyq.check_solution_diagrams([{"id": "cs-1:Q1", "solution": self.TEXT}, {"id": "cs-1:Q2"}], e, w)
        self.assertEqual(n, 6)
        self.assertEqual(len(e), 1)
        self.assertIn("cs-1:Q1", e[0])
        self.assertEqual(len(w), 1)
        self.assertIn("cs-1:Q1 (graph)", w[0])

