# Verifier guide — PassBook, Out Loud (final fact gate)

Every episode was written by one agent and reviewed by another. Reviewers fixed many real errors, but a review can also
introduce claims beyond the sources (the lead once removed a P6A-06 line as unsupported and a verifier showed the
lesson did support it, so cite the exact supporting words for every line you keep or change). Your job is to make sure **no line in the final script says anything the sources do not
support** — above all the lines a reviewer added or changed.

Read first: `~/CA_PERSONAL/ca_revision/SPEC.md` §1 and §7, `~/CA_PERSONAL/ca_passbook/docs/CAST.md` §1–2.

For each of your episodes `<EP>`:
1. Read `notes/<EP>.md` — the writer's notes and the reviewer's **Review** section (every change: line, before → after, why).
2. For **every line the reviewer added or changed** (and every "coverage" line), find the supporting passage in
   `briefs/<EP>.md` or the lesson files the brief names (`~/CA_PERSONAL/ca_passbook/content/subjects/<paper>/<id>.md`). Check the exact
   claim: the condition, the direction (more/less, favourable/adverse), the number, the order of points, the attribution
   (ICAI vs CIMA vs "the Study Material"), the SA/section number. If it is not supported, or says more than the source, fix it
   with a minimal edit (or remove it) so the line says only what the source says.
3. Then read the **whole script once** and flag any other claim you cannot find in the sources: an absolute ("हमेशा",
   "सबसे ज़्यादा", "ICAI हर बार"), a rule with an extra case, a reason that the lesson does not give, a figure not in the
   sources. Fix the same way. Do not polish style and do not rewrite lines that are supported.
4. Keep the structure, the hand-offs between episodes, and the word window
   (`python3 ~/CA_PERSONAL/ca_revision/tools/lint.py ~/CA_PERSONAL/ca_revision/script/<EP>.txt` → 0 errors).
5. Append a "Verification" section to `notes/<EP>.md`: each line you checked that the reviewer changed (supported: source
   file + the words that support it; or fixed: before → after, why), and any other fix.

Leave the `.ready` marker in place (the voicing runner re-voices only the lines you change). Do not voice anything; edit only
your episodes' scripts and notes. Report per episode: lines verified, fixes made, final lint line.
