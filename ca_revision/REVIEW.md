# Reviewer guide — PassBook, Out Loud

You review finished episode scripts (`script/<EP>.txt` with a `.written` marker) before they are voiced. The pilot review of
P4-01 found 11 fact fixes and 6 ear fixes in one episode, so read every line against the sources.

Read first: `~/CA_PERSONAL/ca_revision/SPEC.md` (binding), `~/CA_PERSONAL/ca_passbook/docs/CAST.md` (sections 1–2), `~/CA_PERSONAL/ca_revision/briefs/INDEX.json`.
For each episode: `briefs/<EP>.md` (the only allowed fact source, with the lesson files it names under
`~/CA_PERSONAL/ca_passbook/content/subjects/<paper>/`), the script, and the writer's `notes/<EP>.md`.

Fix with minimal line edits (never rewrite the episode):
1. **Facts.** Every definition, list, order of points, test, formula, threshold, SA or section number and example detail
   against the brief or the lesson. A student will write this in the exam: a wrong word, a wrong order ICAI insists on, a
   mis-stated test or reason, a formula with a wrong term, or anything not in the sources must be corrected or removed.
   ICAI's English wording must match the source (a shortened ICAI wording from the brief is allowed; a paraphrase presented
   as "ICAI के words" is not — either quote it or drop "ICAI के words").
   Check the reasons in examples, not only the conclusions (P4-01: a café cluster was "a profit centre because new cafés need
   head-office approval" — that is why it is not an investment centre).
2. **Cast.** Nothing contradicts CAST.md (roles, company facts, who does what).
3. **Ear.** Read every line as if heard once with no screen: complete sentences, clear antecedents, no abbreviation the voice
   would mangle (Company Limited, Private Limited; "Information Technology" or "IT" only where unambiguous), numbers in Hindi
   words or English words inside English names per SPEC §7, no ambiguous numerals ("पहले नौ factors" can be heard as "the
   first nine"), English lists split so they can be followed, natural Hinglish with आप.
4. **Coverage.** Weighted by the brief's frequency table; a sub-topic ICAI asks often must not be missing or one-lined, and a
   repeated ICAI question type should be answerable from the episode. Stay within the word window (cut elsewhere to add).
5. **Structure and continuity.** Introduction (links from the previous chapter in INDEX order), 2–4 topic chapters, Exam
   angle, Summary (recap paragraph + two-line closing paragraph: lead-in to the next chapter by name, sign-off naming
   "PassBook, Out Loud" and "Arjun"). If the neighbouring scripts exist, make sure the hand-off agrees with them.
6. `python3 ~/CA_PERSONAL/ca_revision/tools/lint.py ~/CA_PERSONAL/ca_revision/script/<EP>.txt` → 0 errors (warnings only for ICAI definitions quoted
   whole).

Append a "Review" section to `notes/<EP>.md` listing each change (line, before → after, why) and anything you checked and kept.
When the script is right, `touch ~/CA_PERSONAL/ca_revision/script/<EP>.ready` (the voicing runner then voices it). Do not voice anything;
edit only your episodes' scripts and notes.

Report back per episode: number of fact fixes and ear fixes, the final lint line, and anything you could not resolve.
