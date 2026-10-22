# Content guide — writing a PassBook lesson (CA Intermediate Group II)

A PassBook lesson takes a CA Intermediate student from "I read the module once and it blurred" to "I can write this for full
marks on 8, 10 or 12 January 2027". It lives in `content/subjects/<paper>/<lesson-id>.md`, where `<paper>` is `cma` (Paper 4),
`aud` (Paper 5), `fm` (Paper 6A) or `sm` (Paper 6B) and `<lesson-id>` is a sub-topic id from `content/syllabus/syllabus.txt`
(e.g. `cma.mc.bep`). **The exemplars to imitate are `content/subjects/cma/cma.mc.bep.md` (a numerical lesson) and
`content/subjects/aud/aud.report.sa705.md` (a theory lesson) — read both first, then open their rendered previews.** This guide is the
contract; `build.py --check` and `node tools/lint_content.js` enforce what can be enforced.

The reader is a student two to eleven weeks from the exam, attending classes, short of time, often reading on a phone. They need three
things from each lesson: to **understand** the idea (so it sticks), to **reproduce** what ICAI marks (formats, Standard wording,
answer structure), and to **practise** it. Everything in a lesson serves one of those three.

## 1. What a lesson must do

Every lesson contains these `##` sections, in this order (exact names; the app reads them):

| `## Section` | depth | purpose |
|---|---|---|
| In plain words | Quick | The idea in everyday language, told through the PassBook cast (§2a). One `::: analogy`. A `::: key` box with the single most important insight. No formulas or section numbers yet. Must stand alone: a student who reads only this section and the Recap gets the idea. |
| How it works | Exam | The mechanism step by step (`::: steps` or a numbered list), at least one diagram (§4), the ICAI vocabulary introduced and defined. For a Standard on Auditing: its objective, the requirements in ICAI's order, and what the auditor actually does. |
| Formats and formulas | Exam | *(required for numerical lessons, optional otherwise)* ICAI pro-formas as tables (cost sheet, process account, reconciliation statement, variance layout, cash budget, statement of working capital ...), `::: formula` blocks with every symbol named, `::: definition` blocks for terms ICAI defines. A format is shown exactly as ICAI lays it out, with a line telling the reader to reproduce it from memory. |
| Worked examples | Exam | **Numerical lessons: at least two** `:::: example` blocks with real numbers in the ICAI style (given data, "Required:", full working with working notes inside `::: answer`). **Theory lessons: at least two case scenarios** in the ICAI style ("Comment", "State with reasons", "Advise the auditor") with the full model answer inside `::: answer`. At least one example per lesson must be at the difficulty of a real ICAI question. Nothing above the fold may give the answer away (§4). |
| Under the hood | Deep | *(optional)* Finer points from the Study Material: exceptions, alternative methods, the rarely asked but examinable corners, links between topics. Only here may detail pile up. |
| Exam angle | Exam | How ICAI examines this, from the real RTPs, MTPs and past papers (§6): what is asked, for how many marks, in what words, the traps. `::: exam` blocks; `::: trick` blocks for mnemonics and shortcuts that are *correct in general* (state their conditions). |
| Answer frame | Exam | *(required for theory lessons and for the theory parts of numerical lessons)* The skeleton of a full-marks answer: for audit case questions ICAI's own pattern **relevant provision / Standard → facts of the case → analysis → conclusion**; for "explain"/"distinguish" questions the points ICAI's suggested answers give marks for, in a table or list. Optionally a three-rung ladder: an answer that loses marks, one that passes, one that gets full marks (`::: cols`). |
| Common mistakes | Exam | At least two `::: mistake` blocks — what students actually get wrong, and the fix. Title them with personality ("Hall of Shame: the abnormal loss that went to costing P&L at the wrong rate"). |
| Practice | Exam | A `::: quiz` with 4–6 **original** questions (§5): at least one numerical for numerical lessons, at least one case-style MCQ in the format ICAI uses in the 30-mark MCQ part of Papers 5 and 6, and one that catches the commonest mistake. |
| Recap | Quick | 5–8 bullets someone could revise from in 60 seconds the night before. Each bullet a fact, a formula or a rule, not a slogan. |
| Flashcards | — | 8–12 cards (`Q:: … / A:: …`). Removed from the reading text and served by the flashcard trainer. Good cards: one fact each, phrased the way ICAI asks ("SA 705: when is a disclaimer of opinion given?"), formulas, format headings in order, numerical thresholds stated in the Study Material. |

The depth switch on the lesson page shows *Quick* (plain words + recap: the "short notes" view), *Exam* (everything except Under the
hood) or *Deep* (all). So the Quick view must work as stand-alone short notes, and the Exam view must hold everything needed for full marks.

Size: about **1,200–2,800 words** of prose per lesson (tables, formulas, diagrams and quiz text excluded). A lesson on a whole Standard or a
whole numerical method is at the top of the range; a small topic (direct expenses, audit trail) at the bottom. Reading time `minutes:`
honest at ~200 wpm plus time to work the examples.

## 2. Voice: fun to read, exact to write

**The reading is fun; the facts and the model answers are exact.** The user is a CA student who learns best when the reading is
enjoyable: a dry module tone fails even when it is correct. So humour is a requirement, not decoration. And every joke must carry the
lesson: the funny bit *is* the example, the mistake, the memory hook.

* Plain, warm, direct. Short sentences. Define every term the first time it appears, in the same sentence. Address the reader as "you".
* Start from a concrete situation with the cast (§2a), then name the idea. Never open with a definition.
* Humour lives in: the opening story, analogies, example set-ups ("Kesar wants to know if the Diwali gift-box line breaks even"), comic
  `###` sub-headings (the `##` section names are fixed), mistake titles ("Hall of Shame"), the occasional one-line aside in a recap.
  Humour never lives inside: a definition, a formula, a format, a model answer, a Standard's requirement, or a quiz answer key.
* Model answers and answer frames are written the way a full-marks ICAI answer is written: formal, the Standard's own words
  ("sufficient appropriate audit evidence", "pervasive", "those charged with governance"), no jokes, no slang.
* No emojis. Exclamation marks only inside a character's spoken line, and rarely. Light Hinglish is allowed only inside a character's
  spoken line ("Sab adjust ho jayega"), never in explanations, answers or cards.
* Bold the terms a student must be able to write; italics sparingly; `==highlight==` for the one phrase examiners look for.
* Indian conventions: `₹` with lakh/crore grouping (`₹12,50,000`, `₹1.2 crore`), Indian company names, Indian English spelling.
* Inclusive terminology only: never master/slave, whitelist/blacklist. ("Master budget" is ICAI's term for the summary budget: use it
  where ICAI does, it refers to the summary of budgets, not a person; do not invent other uses.)
* Character dialogue is written as quotes with the speaker in bold: `> **Kesar:** Profit is profit, no? Why do I need a break-even?`
  Keep each exchange to 2–6 lines. A lesson has at most three dialogue blocks.

### 2a. The PassBook cast (shared by every lesson: keep them consistent)

The whole app follows one company and the people around it. Use the cast to make examples memorable; any lesson may use any of them.

* **Tapri Tea Co. Ltd** — a chai-and-snacks company from Indore that grew from one roadside stall (the original "tapri") into a
  national brand: packaged chai premix, kulhad cafés in 40 cities, a samosa factory, a cold-chain fleet, an app for delivery. It is the
  client, the cost object, the investment decision and the strategic case all at once.
* **Kesar Mehra** — founder and MD. Big heart, bigger plans, allergic to paperwork. Running gags: wants to put everything into
  "miscellaneous expenses"; says "Sab adjust ho jayega" right before something cannot be adjusted; launches a new product every
  festival.
* **Ritu Sharma** — Tapri's cost accountant. Calm, precise, slightly tired. Running gag: "Per unit, please." She is the voice of
  Paper 4.
* **Dev Malhotra** — Tapri's CFO. Spreadsheet romantic, NPV evangelist. Running gag: discounts everything, including compliments
  ("Thanks Dev, nice tie." "Present value of that is lower than you think."). The voice of Paper 6A.
* **Iyer & Associates, Chartered Accountants** — Tapri's statutory auditors. **Ms. Lakshmi Iyer**, the engagement partner: stern,
  fair, asks exactly the question an examiner asks ("Evidence, Bunty. Where is the evidence?"). The voice of Paper 5.
* **Bunty (Varun Khanna)** — article assistant at Iyer & Associates, first year, eager. Running gag: "Bunty's tick" — ticking
  vouchers before reading them; he learns professional skepticism the hard way. He makes the mistakes the reader would make.
* **BrewBucks** — the global coffee chain entering Tapri's cities; the competitor in Paper 6B cases. **Ananya Rao** is Tapri's head
  of strategy (calm, uses frameworks like a chef uses knives).
* Other entities when a topic needs them (a bank, a hospital, a trust, a municipality, a co-operative, an LLP, a government
  department): invent a plausible Indian name and keep it inside the lesson.

Never let the story carry a fact the reader needs: facts go in prose, tables, formulas, formats and answers. A reader who skips every
dialogue must lose no marks.
