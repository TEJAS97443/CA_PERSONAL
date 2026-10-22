"""Tests for the ICAI question bank's build module and tools (docs/ICAI_BANK.md §4, §8, §10, §11): the file format, validation (provenance,
tags, tables, keys, marks), the choice rule, paper rows, check.py's number and marks helpers, the SM import's text and key helpers and the
plan's item estimate.

    python3 -I -m unittest discover -s tests/py -p test_bank.py -v      (from the project root; tests/bank.test.js runs it too)
"""
import collections
import json
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tools"))
sys.path.insert(0, str(ROOT / "tools" / "bank"))

from buildlib import bank   # noqa: E402
import syllabus as syl_mod  # noqa: E402
import check                # noqa: E402
import plan                 # noqa: E402
import smimport             # noqa: E402

SYL = syl_mod.load()
SYL["subjects_by_id"] = {s["id"]: s for s in SYL["subjects"]}
SOURCES = {"new/p4/rtp-sep2026-qa.pdf": {"scheme": "new", "paper": "p4", "kind": "rtp", "attempt": "sep2026", "series": None, "part": "qa",
                                         "url": "https://example.invalid/rtp.pdf", "sha256": "ab" * 32, "pages": 40},
           "new/p4/mtp-sep2026-s1-q.pdf": {"scheme": "new", "paper": "p4", "kind": "mtp", "attempt": "sep2026", "series": "s1", "part": "q",
                                           "url": "https://example.invalid/q.pdf", "sha256": "cd" * 32, "pages": 12},
           "new/p4/mtp-sep2026-s1-a.pdf": {"scheme": "new", "paper": "p4", "kind": "mtp", "attempt": "sep2026", "series": "s1", "part": "a",
                                           "url": "https://example.invalid/a.pdf", "sha256": "ef" * 32, "pages": 20}}

RTP = """---
doc: n-p4-rtp-sep2026
paper: p4
kind: rtp
attempt: sep2026
qfile: new/p4/rtp-sep2026-qa.pdf
afile: new/p4/rtp-sep2026-qa.pdf
status: checked
by: test
date: 2026-10-20
---

---
case: c1
qno: 1
q: 1-2
---
#### Case
A company has the following data:

| Item | Amount (₹) |
|---|---:|
| Material | 1,000 |

---
item: q1i
case: c1
qno: 1
part: (i)
type: mcq
key: B
tags: cma.mat.eoq
q: 2
---
#### Question
The EOQ is:
#### Options
(A) 100
(B) 200
(C) 300
(D) 400

---
item: q5
qno: 5
type: descriptive
tags: cma.mat.eoq, cma.mat.levels
q: 7
a: 26-27
---
#### Question
Explain the EOQ.
#### Answer
EOQ is the order size that minimises cost.
"""


def write_tree(files: dict) -> tempfile.TemporaryDirectory:
    d = tempfile.TemporaryDirectory()
    root = Path(d.name)
    for rel, body in files.items():
        p = root / rel
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(body if isinstance(body, str) else json.dumps(body))
    return d


def run_check(text: str, name: str = "bank/items/new/p4/n-p4-rtp-sep2026.md", sources: dict | None = None):
    with write_tree({name: text, "bank/sources.json": {"root": "~/x", "files": sources or SOURCES}}) as d:
        root = Path(d)
        errors, warnings = [], []
        r = bank.check_file(root / name, root, SYL, sources or SOURCES, True, errors, warnings)
        return r, errors, warnings


class FormatTest(unittest.TestCase):
    def test_parse_valid_rtp(self):
        r, errors, _ = run_check(RTP)
        self.assertEqual(errors, [])
        self.assertEqual([it["key"] for it in r["items"]], ["q1i", "q5"])
        self.assertEqual(r["subject"], "cma")
        self.assertEqual(r["items"][0]["key_obj"], {"kind": "single", "value": "B"})
        self.assertEqual(r["items"][0]["options"]["B"], "200")
        self.assertEqual(r["items"][1]["tags"], ["cma.mat.eoq", "cma.mat.levels"])
        self.assertIsNone(r["items"][0]["marks"], "an RTP prints no marks")

    def expect_error(self, text, needle, **kw):
        _, errors, _ = run_check(text, **kw)
        self.assertTrue(any(needle in e for e in errors), f"no error with {needle!r} in {errors}")

    def test_missing_provenance(self):
        self.expect_error(RTP.replace("qfile: new/p4/rtp-sep2026-qa.pdf\n", ""), "needs 'qfile:'")
        self.expect_error(RTP.replace("qfile: new/p4/rtp-sep2026-qa.pdf", "qfile: new/p4/nope.pdf"), "is not in bank/sources.json")
        self.expect_error(RTP.replace("q: 7\n", ""), "'q:' gives the question pages")
        self.expect_error(RTP.replace("q: 7\n", "q: 99\n"), "outside the 40 pages")

    def test_unknown_keys_and_bad_values(self):
        self.expect_error(RTP.replace("by: test", "by: test\ncolour: red"), "unknown document key 'colour'")
        self.expect_error(RTP.replace("key: B", "key: E"), "key 'E' is A-D")
        self.expect_error(RTP.replace("status: checked", "status: done"), "status is one of")
        self.expect_error(RTP.replace("doc: n-p4-rtp-sep2026", "doc: n-p4-rtp-sep2025"), "doc must be")

    def test_tags(self):
        self.expect_error(RTP.replace("tags: cma.mat.eoq\n", "tags: cma.nope\n"), "is not an id")
        self.expect_error(RTP.replace("tags: cma.mat.eoq\n", "tags: sm.ext.porter\n"), "belongs to sm")
        self.expect_error(RTP.replace("tags: cma.mat.eoq\n", ""), "tags every item")
        _, errors, _ = run_check(RTP.replace("tags: cma.mat.eoq\n", "").replace("status: checked", "status: draft"))
        self.assertFalse(any("tags every item" in e for e in errors), "a draft may leave tags for later")

    def test_tables_and_options(self):
        self.expect_error(RTP.replace("| Material | 1,000 |", "| Material | 1,000 | extra |"), "table")
        self.expect_error(RTP.replace("(D) 400\n", ""), "four options (A) to (D)")

    def test_marks(self):
        mtp = RTP.replace("kind: rtp", "kind: mtp").replace("doc: n-p4-rtp-sep2026", "doc: n-p4-mtp-sep2026-s1\nseries: s1") \
            .replace("qfile: new/p4/rtp-sep2026-qa.pdf", "qfile: new/p4/mtp-sep2026-s1-q.pdf").replace("afile: new/p4/rtp-sep2026-qa.pdf", "afile: new/p4/mtp-sep2026-s1-a.pdf") \
            .replace("a: 26-27", "a: 12-13")
        name = "bank/items/new/p4/n-p4-mtp-sep2026-s1.md"
        self.expect_error(mtp, "marks: (MTPs and exam papers print marks", name=name)
        ok = mtp.replace("type: mcq", "marks: 2\ntype: mcq").replace("type: descriptive", "marks: 5\ntype: descriptive")
        r, errors, _ = run_check(ok, name=name)
        self.assertEqual(errors, [])
        self.assertEqual([it["marks"] for it in r["items"]], [2, 5])
        none = ok.replace("marks: 2\n", "marks: none\n")
        self.expect_error(none, "marks: none needs a note", name=name)
        r, errors, _ = run_check(none.replace("marks: none\n", "marks: none\nnote: the Suggested Answers print no marks for Part I MCQs\n"), name=name)
        self.assertEqual(errors, [])
        self.assertIsNone(r["items"][0]["marks"])

    def test_imported_status_ships_and_needs_tags(self):
        r, errors, _ = run_check(RTP.replace("status: checked", "status: imported"))
        self.assertEqual(errors, [])
        self.assertEqual(r["status"], "imported")
        self.expect_error(RTP.replace("status: checked", "status: imported").replace("tags: cma.mat.eoq\n", ""), "tags every item")

    def test_text_problems(self):
        self.assertTrue(bank.text_problems("Price ` 500"), "a backtick rupee is ICAI's Rupee font, not text")
        self.assertEqual(bank.text_problems("Price ₹ 500"), [])


class ChoiceTest(unittest.TestCase):
    def test_parse_choice(self):
        self.assertEqual(bank.parse_choice("all")["all"], True)
        c = bank.parse_choice("q1; any 4 of q2-q6")
        self.assertEqual(c["compulsory"], [1])
        self.assertEqual(c["groups"], [{"n": 4, "of": [2, 3, 4, 5, 6]}])
        c = bank.parse_choice("q1, q2; any 3 of q3-q6")
        self.assertEqual(c["compulsory"], [1, 2])
        with self.assertRaises(ValueError):
            bank.parse_choice("any 5 of q2-q6")
        with self.assertRaises(ValueError):
            bank.parse_choice("question one")

    def test_sm_import_choice_regexes(self):
        t = "Question paper comprises of 5 questions, Answer Question No. 6 which is compulsory and any 3 out of the remaining 4 questions."
        mc = smimport.CHOICE_C.search(t)
        mn = smimport.CHOICE_N.search(t, mc.end())
        self.assertEqual((mc.group(1), mn.group(1), mn.group(2)), ("6", "3", "4"))
        t2 = "Question 1 and 2 are compulsory. Attempt any three questions out of remaining four questions."
        mc = smimport.CHOICE_C.search(t2)
        mn = smimport.CHOICE_N.search(t2, mc.end())
        self.assertEqual((mc.group(1), mc.group(2), mn.group(1), mn.group(2)), ("1", "2", "three", "four"))


class CheckToolTest(unittest.TestCase):
    def test_nums(self):
        self.assertEqual(check.nums("₹ 18,20,000 and 2.5% of 1{,}000; 0.50"), ["1820000", "2.5", "1000", "0.50"])
        self.assertEqual(check.nums(r"$\frac{2 \times 300}{4}$"), ["2", "300", "4"])

    def test_strip_marks(self):
        t, marks = check.strip_marks("(a) Explain. (5 Marks)\n(5 x 2 = 10 Marks)\nPART I – Case Scenario based MCQs (30 Marks)\n"
                                     "(d) Is it part of their Key Success Factors (2 Marks)")
        self.assertEqual(marks, [5, 2, 2, 2, 2, 2, 2], "a Part's total is not a question's marks; 'part of' is not a Part")
        self.assertNotIn("Marks", t)

    def test_pair_splits(self):
        missing = collections.Counter({"150": 1, "100": 1, "4": 1, "0": 1, "20": 1})
        extra = collections.Counter({"40": 1})
        check.pair_splits(missing, extra)
        self.assertEqual(extra, collections.Counter())
        self.assertNotIn("4", missing)

    def test_heads_and_clean_page(self):
        words = ["alpha", "beta", "gamma", "delta", "omega"]
        pages = {p: f"INTERMEDIATE EXAMINATION: MAY 2026\nbody {words[p - 1]} text\n{p}" for p in range(1, 6)}
        hd = check.heads(pages)
        self.assertIn("INTERMEDIATE EXAMINATION: MAY #", hd)
        self.assertEqual(check.clean_page(pages[3], hd), "body gamma text")
        self.assertIn("\n4\n", "\n" + check.clean_page("a\n4\nb", set()) + "\n", "a lone number inside a page is kept (a stacked fraction)")


class SmImportTest(unittest.TestCase):
    def test_key_of(self):
        self.assertEqual(smimport.key_of("1(A)(i)", False), ("q1a-i", 1, "(A)(i)", False))
        self.assertEqual(smimport.key_of("1(ii)", False), ("q1ii", 1, "(ii)", False))
        self.assertEqual(smimport.key_of("4(b) (OR)", False), ("q4b-or", 4, "(b) OR", True))
        self.assertEqual(smimport.key_of("8(b)-OR", False), ("q8b-or", 8, "(b) OR", True))
        self.assertEqual(smimport.key_of("9", True), ("m9", 9, "", False))
        self.assertEqual(smimport.key_of("1(A)1", False)[0], "q1a-1")
        for k in ("q1a-i", "q1ii", "q4b-or", "m9", "q1a-1"):
            self.assertTrue(bank.ITEM_KEY.match(k))

    def test_md_of(self):
        md = smimport.md_of("Lead line\n• first point\n• second *point*\n2. Numbered line\n| A | B |\n| --- | --- |\n| 1 | 2 |\nClose $5")
        self.assertEqual(md, "Lead line\n\n- first point\n- second \\*point\\*\n\n2\\. Numbered line\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n\nClose \\$5")
        self.assertEqual(bank.table_problems(md), [])

    def test_split_case_and_label(self):
        case = "A" * 320 + "\nBased on the above Case Scenario, answer the MCQs.\nWhich strategy is this?"
        head, tail = smimport.split_case(case)
        self.assertTrue(head.endswith("answer the MCQs."))
        self.assertEqual(tail, "Which strategy is this?")
        self.assertEqual(smimport.split_case("short text\nWhich?"), ("", "short text\nWhich?"))
        self.assertEqual(smimport.strip_label("(ii) EcoForge’s plan", "(A)(ii)"), "EcoForge’s plan")
        self.assertEqual(smimport.REF_NOTE.sub("", "[Shared case scenario — see question 1(i).]\nWhat next?"), "What next?")

    def test_tags_for(self):
        q = {"chapter": 2, "chapter_source": "icai", "topic_tags": []}
        self.assertEqual(smimport.tags_for(q, "Conduct a Porter's Five Forces analysis.", "")[0], ["sm.ext.porter"])
        tags, note = smimport.tags_for({"chapter": 5, "chapter_source": "mapped"}, "Distinguish between two kinds of planning.", "")
        self.assertEqual(tags, ["sm.impl"])
        self.assertIn("sub-topic tagging still needed", note)
        tags, note = smimport.tags_for({"chapter": "MCQ"}, "Which quadrant of the BCG matrix is a cash cow?", "")
        self.assertEqual(tags[0], "sm.choice.portfolio")
        self.assertIn("from keywords", note)
        tags, note = smimport.tags_for({"chapter": "MCQ"}, "Pick one.", "")
        self.assertEqual(tags, [])


class PlanTest(unittest.TestCase):
    def test_count_items(self):
        texts = {1: "1. (a) Explain X. (5 Marks)\n(b) Explain Y. (3 + 2 = 5 Marks)\n(c) State Z. (4 Marks)\nPART II (70 Marks)",
                 2: "2. Which one?\n(a) a\n(b) b\n(c) c\n(d) d\n3. Which two?\n(a) a\n(b) b\n(c) c\n(d) d"}
        n, how = plan.count_items(texts, [1, 2], "pyq")
        self.assertEqual(n, 5, how)               # 3 marks lines + 2 MCQs the Suggested Answers print without marks
        n, how = plan.count_items({1: "1. Explain A.\n2. Explain B.\n3. State C."}, [1], "rtp")
        self.assertEqual(n, 5, how)               # 3 question numbers x 1.7


if __name__ == "__main__":
    unittest.main()
