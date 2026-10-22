"""Tests for the ICAI question bank's build module and tools (docs/ICAI_BANK.md §4, §8, §10, §11): the file format, validation (provenance,
tags, tables, keys, marks), the choice rule, paper rows, check.py's number and marks helpers, the SM import's text and key helpers and the
plan's item estimate.

    python3 -I -m unittest discover -s tests/py -p test_bank.py -v      (from the project root; tests/bank.test.js runs it too)
"""
import collections
import re
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
        self.assertEqual(bank.parse_choice("q1; any 4 of q2-q6")["parts"], [], "an old rule means what it meant")

    def test_parse_part_choice(self):
        c = bank.parse_choice("q1; any 4 of q2-q6; q1: any 7 of (a)-(h)")
        self.assertEqual((c["compulsory"], c["groups"]), ([1], [{"n": 4, "of": [2, 3, 4, 5, 6]}]))
        self.assertEqual(c["parts"], [{"q": 1, "n": 7, "of": [f"({x})" for x in "abcdefgh"], "span": "(a)–(h)"}])
        self.assertEqual(bank.parse_choice("q1; any 4 of q2-q6; q6: any 4 of a-e")["parts"][0]["of"], ["(a)", "(b)", "(c)", "(d)", "(e)"])
        self.assertEqual(bank.parse_choice("q1; any 4 of q2-q6; q1: any 7 of (i)-(viii)")["parts"][0]["of"],
                         ["(i)", "(ii)", "(iii)", "(iv)", "(v)", "(vi)", "(vii)", "(viii)"], "a range of roman numerals")
        self.assertEqual(bank.parse_choice("q1; q2: any 2 of (a), (c), (e)")["parts"][0]["of"], ["(a)", "(c)", "(e)"])
        self.assertEqual(bank.part_labels("(a)-(c), (e)"), ["(a)", "(b)", "(c)", "(e)"])
        a = bank.parse_choice("all; q1: any 2 of (a)-(c); q2: any 2 of (a)-(c)")
        self.assertTrue(a["all"]); self.assertEqual([p["q"] for p in a["parts"]], [1, 2])
        for bad, why in (("q1: any 7 of (a)-(h)", "a part choice needs the questions' rule first"),
                         ("q1; q1: any 8 of (a)-(h)", "choose fewer than the parts"),
                         ("q1; q1: any 7 of (a)-(h); q1: any 6 of (a)-(g)", "one part choice a question"),
                         ("q1; q6: any four of (a)-(e)", "a number, not a word"),
                         ("q1; q6: any 2 of (c)-(a)", "backwards"),
                         ("q1; q6: any 2 of (a), (a), (b)", "named twice"),
                         ("all; any 4 of q2-q6", "'all' takes part choices only")):
            with self.assertRaises(ValueError, msg=why):
                bank.parse_choice(bad)

    def paper(self, choice: str, q1: str = "(a) (b) (c)", ins: str = "Maximum Marks – 11", extra: str = ""):
        """an MTP file: one MCQ (2), Q1 of 2-mark parts, Q2 and Q3 of 5 marks, under a choice rule"""
        head = f"""---
doc: n-p4-mtp-sep2026-s1
paper: p4
kind: mtp
attempt: sep2026
series: s1
qfile: new/p4/mtp-sep2026-s1-q.pdf
afile: new/p4/mtp-sep2026-s1-a.pdf
q: 1
choice: {choice}
status: checked
by: test
date: 2026-10-20
---
#### Instructions
{ins}

"""
        def item(key, qno, marks, part=None, typ="descriptive", more=""):
            return (f"---\nitem: {key}\nqno: {qno}\n" + (f"part: {part}\n" if part else "") + f"marks: {marks}\ntype: {typ}\n"
                    + ("key: B\n" if typ == "mcq" else "") + f"tags: cma.mat.eoq\n{more}q: 2\na: 3\n---\n#### Question\nExplain {key}.\n"
                    + ("#### Options\n(A) 1\n(B) 2\n(C) 3\n(D) 4\n" if typ == "mcq" else "") + "#### Answer\nICAI's answer.\n\n")
        body = item("m1", 1, 2, typ="mcq")
        for lab in q1.split():
            body += item("q1" + lab.strip("()"), 1, 2, lab)
        body += extra + item("q2", 2, 5) + item("q3", 3, 5)
        return head + body

    def test_part_choice_validation_and_maximum(self):
        name = "bank/items/new/p4/n-p4-mtp-sep2026-s1.md"
        r, errors, warnings = run_check(self.paper("q1; any 1 of q2-q3; q1: any 2 of (a)-(c)"), name=name)
        self.assertEqual(errors, [])
        self.assertEqual(warnings, [], "the MCQ 2 + two 2-mark parts + one of Q2/Q3 = the printed 11")
        self.assertEqual(bank.choice_max(r["items"], r["choice"]), 11)
        self.assertEqual(bank.choice_max(r["items"], bank.parse_choice("q1; any 1 of q2-q3")), 13, "without the part choice Q1 counts 6")
        _, errors, warnings = run_check(self.paper("q1; any 1 of q2-q3"), name=name)
        self.assertEqual(errors, [])
        self.assertTrue(any("maximum" in w and "is 13" in w and "Maximum Marks 11" in w for w in warnings), warnings)
        _, errors, _ = run_check(self.paper("q1; any 1 of q2-q3; q1: any 2 of (a)-(d)"), name=name)
        self.assertTrue(any("names part(s) (d)" in e and "its parts: (a), (b), (c)" in e for e in errors), errors)
        _, errors, _ = run_check(self.paper("q1; any 1 of q2-q3; q4: any 1 of (a)-(b)"), name=name)
        self.assertTrue(any("question 4 has no descriptive item" in e for e in errors), errors)
        _, errors, _ = run_check(self.paper("q1; any 1 of q2-q3; q1: any 9 of (a)-(c)"), name=name)
        self.assertTrue(any("choose fewer than the 3 parts" in e for e in errors), errors)
        # an OR alternative is the part it replaces: (b)'s OR does not add a part or marks
        orb = "---\nitem: q1b-or\nqno: 1\npart: (b)\nmarks: 2\ntype: descriptive\nalt: q1b\ntags: cma.mat.eoq\nq: 2\na: 3\n---\n#### Question\nOr.\n#### Answer\nA.\n\n"
        text = self.paper("q1; any 1 of q2-q3; q1: any 2 of (a)-(c)").replace("---\nitem: q1c\n", orb + "---\nitem: q1c\n")
        r, errors, warnings = run_check(text, name=name)
        self.assertEqual((errors, warnings), ([], []))
        self.assertEqual(bank.part_of(r["items"][3], r["items"]), "(b)")
        # sub-parts belong to their first-level part: (c)(i) + (c)(ii) are part (c), worth 2 + 2
        sub = self.paper("all; q1: any 2 of (a)-(c)", q1="(a) (b)", ins="Maximum Marks – 18",
                         extra="".join(f"---\nitem: q1c-{x}\nqno: 1\npart: (c)({x})\nmarks: 2\ntype: descriptive\ntags: cma.mat.eoq\nq: 2\na: 3\n---\n"
                                       f"#### Question\nPart {x}.\n#### Answer\nA.\n\n" for x in ("i", "ii")))
        r, errors, warnings = run_check(sub, name=name)
        self.assertEqual(errors, [])
        self.assertEqual(bank.choice_max(r["items"], r["choice"]), 2 + 4 + 2 + 5 + 5, "(c) is the largest part; 'all' counts Q2 and Q3")
        self.assertEqual(warnings, [])

    def test_paper_row_ships_part_choice_ids(self):
        tree = {"bank/items/new/p4/n-p4-mtp-sep2026-s1.md": self.paper("q1; any 1 of q2-q3; q1: any 2 of (a)-(c)"),
                "bank/sources.json": {"root": "~/x", "files": SOURCES}}
        with write_tree(tree) as d:
            errors, warnings = [], []
            papers, qs = bank.load(Path(d), SYL, False, errors, warnings)
        self.assertEqual(errors, [])
        p = papers[0]
        self.assertTrue(p["sittable"])
        rule = p["choice"]["all"]
        self.assertEqual((rule["compulsory"], rule["groups"]), ([1], [{"n": 1, "of": [2, 3]}]))
        self.assertEqual(rule["parts"], [{"no": 1, "n": 2, "of": ["(a)", "(b)", "(c)"], "span": "(a)–(c)",
                                          "ids": [["n-p4-mtp-sep2026-s1-q1a"], ["n-p4-mtp-sep2026-s1-q1b"], ["n-p4-mtp-sep2026-s1-q1c"]]}])
        with write_tree(dict(tree, **{"bank/items/new/p4/n-p4-mtp-sep2026-s1.md": self.paper("q1; any 1 of q2-q3")})) as d:
            papers, _ = bank.load(Path(d), SYL, False, [], [])
        self.assertNotIn("parts", papers[0]["choice"]["all"], "a rule without part choices ships as before")

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
        t, marks = check.strip_marks("(d) 85.73%, ₹ 25,07,700        (5 x 2 Marks)")
        self.assertEqual(marks, [2, 2, 2, 2, 2], "'(5 x 2 Marks)' without its total is five 2-mark questions")
        self.assertNotIn("Marks", t)
        t, marks = check.strip_marks("(iv) Cash received        3,91,680\n        (5 Marks × 4 = 20 Marks)")
        self.assertEqual(marks, [5, 5, 5, 5], "'(5 Marks × 4 = 20 Marks)' (marks first) is four 5-mark questions")
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

    def test_page_numbers_and_lone_lines(self):
        self.assertEqual(check.clean_page("8\n45\nbody\n10", set()), "8\n45\nbody",
                         "a lone number opening a page is content (a stacked fraction's numerator); the foot's page number goes")
        words = ["alpha", "beta", "gamma", "delta", "omega", "sigma"]
        # even pages: the running foot, then the page number on a line of its own; odd pages: both on one line
        den = [45, 7, 12, 3, 99, 8]
        pages = {p: f"body {words[p - 1]}\n{words[p - 1]} =\n{den[p - 1]}\n" + ("JANUARY 2025 EXAMINATION\n" + str(p + 69) if p % 2 == 0
                                                             else f"{p + 69}          JANUARY 2025 EXAMINATION") for p in range(1, 7)}
        pns = check.page_numbers(pages)
        self.assertEqual(pns[3], {72})
        hd = check.heads(pages)
        self.assertIn("JANUARY # EXAMINATION", hd, "one running foot, with or without its page number on the line")
        self.assertEqual(check.clean_page(pages[2], hd, pns[2]), "body beta\nbeta =\n7", "a fraction's lone number stays")
        self.assertEqual(check.clean_page(pages[3], hd, pns[3]), "body gamma\ngamma =\n12")
        self.assertEqual(check.clean_page("body\nx =\n12", hd, {50}), "body\nx =",
                         "a page that shows no number of the sequence: its lone last line is its page number, as before")
        self.assertEqual(check.page_numbers({p: f"body {words[p - 1]}" for p in range(1, 6)}), {})

    def test_digit_lines_and_head_variants(self):
        words = ["alpha", "beta", "gamma", "delta", "omega"]
        pages = {p: f"body {words[p - 1]}\n1,13,778\n0.907\n3.\n{p}" for p in range(1, 6)}
        hd = check.heads(pages)
        self.assertFalse([h for h in hd if not re.search(r"[A-Za-z]", h)], "a line holding no letter is never a running head")
        self.assertEqual(check.clean_page(pages[2], hd, check.page_numbers(pages).get(2)), "body beta\n1,13,778\n0.907\n3.")
        self.assertEqual([check.lone_number(x) for x in ("(12)", "- 4 -", "3.", "1,13,778", "0.907")], [12, 4, 3, None, None])
        self.assertEqual(check.shape_key("PAPER – 6: FINANCIAL MANAGEMENT & STRATEGIC MANAGEMENT"),
                         check.shape_key("PAPER 6 : Financial Management and Strategic Management"), "'&' / 'AND', case and dashes aside")

    def test_marks_sum_without_total(self):
        sums = []
        t, marks = check.strip_marks("(c) Explain the two.          (1 + 3 Marks)", sums)
        self.assertEqual((marks, sums), ([1, 3], [([1, 3], 4)]), "'(1 + 3 Marks)' is '(1 + 3 = 4 Marks)' without its total")
        self.assertNotIn("Marks", t)
        t, marks = check.strip_marks("(d) Compute.   (5 x 2 Marks = 10 Marks)")
        self.assertEqual(marks, [2, 2, 2, 2, 2], "'(5 x 2 Marks = 10 Marks)' is five 2-mark questions")
        self.assertNotIn("Marks", t)

    def test_question_heads(self):
        layout = "Question 1\n(a) Explain.\nAnswer\n(a) Because.\nQuestion 2\nState.\nAnswer\nIt is."
        self.assertEqual(check.question_heads(layout), {1, 2}, "past papers print 'Question N' once and head the answer 'Answer'")
        self.assertEqual(check.question_heads("1. (a) Explain.\n1. (a) Because."), set(), "an RTP or MTP numbers both sides")
        self.assertEqual(check.question_heads("Question 1\nState.\nAnswer 1\nIt is.\nAnswer\nx"), set())

    def test_furniture(self):
        page = ("Mock Test Paper - Series I: July, 2026\nDate of Paper: 3rd August, 2026\nTime of Paper: 10 A.M. to 1 P.M.\n"
                "INTERMEDIATE GROUP – II\nPAPER – 5: AUDITING AND ETHICS\nTime Allowed – 3 Hours          Maximum Marks – 100\n"
                "PAPER 4: another paper's title\nThe paper 5 of the series")
        self.assertEqual([n for _, ns in check.furniture(page, 5, False) for n in ns], ["2026", "3", "2026", "10", "1", "5"])
        self.assertEqual([n for _, ns in check.furniture(page, 5, True) for n in ns][-2:], ["3", "100"],
                         "an answers file reprints the question paper's time and marks line")
        self.assertEqual(check.furniture("PAPER 6A : FINANCIAL MANAGEMENT", 6, False), [("PAPER 6A : FINANCIAL MANAGEMENT", ["6"])])
        self.assertEqual(check.letters_of("PAPER 6A: FINANCIAL"), "paper a financial")
        self.assertEqual(check.furniture("MOCK TEST PAPER 1\n8A: FINANCIAL MANAGEMENT\nTest Series: September 2023", 8, True),
                         [("MOCK TEST PAPER 1", ["1"]), ("8A: FINANCIAL MANAGEMENT", ["8"]), ("Test Series: September 2023", ["2023"])])

    def test_numbers_more(self):
        self.assertEqual(check.nums("Rs.1,70,000 and No.5; 2.5.1"), ["170000", "5", "2.5"], "a number after 'Rs.' keeps its first digit")
        self.assertEqual(check.nums("nP₀ = P₁ × 10 and 𝟒,𝟒𝟒𝟒; 500¹; (62,500 – 76,250)²"), ["0", "1", "10", "4444", "5001", "62500", "76250", "2"],
                         "subscripts and math digits read; a superscript runs into a digit before it (as the text layer prints '5,001')")
        self.assertEqual(check.strip_marks("(a) Explain. [2 Marks]")[1], [2], "an MTP's '[2 Marks]'")

    def test_pair_spaced(self):
        missing = collections.Counter({"6": 1, "3": 1, "0": 4, "18": 1})
        extra = collections.Counter({"600000": 1, "300000": 1, "18001": 1})
        check.pair_spaced(missing, extra, "₹ 6, 00, 000\n3, 00, 000 units\n18, 000 units")
        self.assertEqual((missing, extra), (collections.Counter({"18": 1, "0": 0}) - collections.Counter(), collections.Counter({"18001": 1})),
                         "a run pairs only with its own number")
        missing, extra = collections.Counter({"1": 1, "2": 1, "3": 1}), collections.Counter({"123": 1})
        check.pair_spaced(missing, extra, "items 1, 2, 3")
        self.assertEqual(extra, collections.Counter({"123": 1}), "a list is not a grouped number")
        missing, extra = collections.Counter({"1": 1, "0": 1}), collections.Counter({"10000": 1})
        check.pair_spaced(missing, extra, "the scrap value is Rs.1 0,000, and")
        self.assertEqual((+missing, +extra), (collections.Counter(), collections.Counter()), "'Rs.1 0,000': a digit split off by a space")

    def test_words_and_lines(self):
        self.assertEqual(check.words_of("ﬁgures, eﬀects and ﬂows: ﬃ ﬄ"), ["figures", "effects", "and", "flows", "ffi", "ffl"])
        self.assertTrue(check.prints_line("ANSWERS\nCase Scenario 1\n1. (A)", "Case Scenario 1"))
        self.assertFalse(check.prints_line("Case Scenario 12", "Case Scenario 1"))


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

    def test_paras_rejoin(self):
        import paras
        g = paras.Geometry([])
        # printed lines of one page: a wrapped line, its continuation, a short last line, a gap, a new paragraph, a labelled line,
        # a short line, a two-column row
        spec = [("Competitive advantage is the position of a firm to maintain", 72, 520, 100, False, False),
                ("a favourable market position than its rivals and it", 72, 521, 113, False, False),
                ("lasts.", 72, 100, 126, False, False),
                ("Strategy is partly proactive and partly reactive in its", 72, 521, 150, False, False),
                ("each of the following is a separate point of ICAI", 93, 521, 163, True, False),
                ("Short line", 72, 200, 176, False, False),
                ("Formulation focuses on   Implementation focuses on", 72, 521, 189, False, True),
                ("effectiveness. efficiency.", 72, 300, 202, False, False)]
        for k, (t, x, x1, y, lab, cols) in enumerate(spec):
            ln = paras.Line()
            ln.pdf, ln.page, ln.idx, ln.x, ln.x1, ln.lab, ln.cw, ln.y, ln.pitch, ln.margin = "a.pdf", 1, k, x, x1, lab, 4.5, y, 13.0, 522
            ln.key, ln.first, ln.cols = paras.norm(t), t.split()[0], cols
            g.lines.append(ln)
            g.by_end[ln.key[-8:]].append(ln)
        text = "\n".join(t for t, *_ in spec)
        out = paras.rejoin(text, g).split("\n")
        self.assertEqual(out[0], "Competitive advantage is the position of a firm to maintain a favourable market position than its rivals and it lasts.")
        self.assertEqual(out[1], "Strategy is partly proactive and partly reactive in its")     # a paragraph gap above it, a label after it
        self.assertEqual(out[2:], [t for t, *_ in spec[4:]])                                       # labelled, short, two-column: kept
        self.assertEqual(paras.join2("well-", "defined"), "well-defined")
        self.assertEqual(paras.join2("profits -", "and"), "profits - and")
        self.assertFalse(paras.joinable_text("| a | b |", "next"))
        self.assertFalse(paras.joinable_text("a full line", "(ii) a label"))


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
