# Frontend v3 — spec (2026-10-15, binding)

The user rejected 7 looks across two rounds, then approved round 3: **the research-led app layout in `_vibes/v3/app.html`, palette Cobalt Pop, top nav,
plus all four "extras" (GATE Wrapped recap, mascot, streak with freeze, cards due / XP).** Evidence and rules: `_vibes/v3/RESEARCH.md` (read it).
The mockup is the visual reference: open `_vibes/v3/app.html?palette=cobalt&theme=light` (and `theme=dark`, `screen=lesson|practice`, `extras=1`, `first=1`)
and port its look and code freely. Where the mockup and this spec disagree, this spec wins; where both are silent, follow RESEARCH.md.

## 0. Hard rules (every agent)

* Static, offline, `file://` safe: classic `<script>` tags, UMD modules, vanilla JS, no bundler, no CDN, no network, no new dependency. Fonts and KaTeX are vendored.
* **Real data only.** Every number comes from `GA.data.D`, the manifest, `GA.insights` or `localStorage` (`GA.store.state`). No invented statistics, testimonials, user counts, urgency timers.
  Personal widgets (streak, XP, Wrapped, mocks sparkline, progress rings) read the learner's own state; with no data they show an honest empty or first-run state.
* **Only edit files you own (section 8).** Need something from another owner? Use the interface in section 7, or ask the lead in your final report. You may override another owner's CSS
  from your own stylesheet (loaded later) when that is cleaner.
* Light + dark parity, theme `auto` follows `prefers-color-scheme`. Use tokens (section 1), never raw hex in view CSS (labs/diagrams included; `--viz-*` for series colours).
* Responsive 360 → 1920. Test 390, 820, 1440. No horizontal page scroll; wide figures scroll inside their own box. Phone ≤ 700 px: bottom tab bar (section 2).
* Accessibility: landmarks, headings in order, visible focus, `aria-label` on icon buttons, colour never the only signal (✓/✕ icons with success/danger), contrast ≥ WCAG AA,
  `prefers-reduced-motion` disables motion, anything self-moving > 5 s has a pause control.
* Motion is feedback (rule 8): on user action or state change, ≤ 300 ms, slide > fade. Count-ups and ring fills run once. Lab previews animate on hover/focus/tap only. Nothing loops beside text.
* Inclusive language (no master/slave/whitelist/blacklist in code or copy; the existing "Master theorem" lesson wording is a pending user decision: do not touch).
* Do not break anything: `node tests/run.js` (1234+ pass), `python3 build.py --check`, `python3 -I tools/smoke.py` (and `demo`), `?selftest=1`. New pure logic gets Node tests.
  Update `docs/ARCHITECTURE.md` for what you add (append a short section under your own heading; the QA agent merges).
* Screenshots: `tools/shot.sh "<route>" <png> <w> <h> "<query>"` (e.g. `"theme=dark&profile=demo&seeddemo=1"`). The **fresh profile** (no query) is the first-impression case;
  `?profile=demo&seeddemo=1` gives synthetic progress. Both must look good. Scratch and PNGs in `$TMPDIR/<your-job>` (it survives until a restart); delete PNGs once looked at.
* Log progress lines to `~/DSA_PERSONAL/gate_prompts/v3/progress/<job>.log` (one line per finished step) so a resumed agent can continue after an outage.

## 1. Tokens (Cobalt Pop) — `app/css/base.css`, already set by the lead

Existing token names are kept so old CSS keeps working. Meaning in v3:

| token | role | light | dark |
|---|---|---|---|
| `--bg` | page | #F2F5FF | #111215 |
| `--surface` | cards, panels | #FFFFFF | #1B1D23 |
| `--surface-2`, `--surface-3` | nested / pressed surfaces | mixes | mixes |
| `--ink`, `--ink-2`, `--muted`, `--faint` | text levels | #0E1530 … #4D5675 | #F1F3F8 … #A3A8B6 |
| `--accent` (= primary, cobalt) | links, active nav, selected, progress, focus | #2450E0 | #6B8CFF |
| `--accent-ink` | text on primary fills | #FFFFFF | #111215 |
| `--accent-soft`, `--accent-soft-2` | primary tints (tiles, chips, hover) | | |
| `--pop` (coral) | **the one main CTA per screen** (Von Restorff) | #D6245E | #FF6B6B |
| `--pop-ink` | text on `--pop` | #FFFFFF | #111215 |
| `--ok` / `--warn` / `--bad` (+ `-soft`) | success / warning / error; always with an icon | #047857 / #9A5B00 / #B4233C | #3DDC97 / #FFC24B / #F25F7A |
| `--edge-neutral`, `--edge-accent`, `--edge-pop` | the press-depth edge colour of buttons | | |
| `--lift` | the one card shadow (light only; none in dark) | | |
| `--r-xs … --r-xl` | radii 8 / 12 / 16 / 22 / 28 | | |

Rules: 60 % bg, 30 % surface, ≤ 10 % primary + pop. Max ~4 hues per screen. **No rainbow subject colours**: subject identity = icon + name; `--h` hues may survive only as a tiny dot
or inside data visualisations (map, heatmap) where colour encodes a series. No glass, glow, gradient text, gradient-mesh backdrops, pure #000/#FFF page backgrounds.

**Approved bold layer and the hero-panel exception (audit P1-57, 2026-10-16).** The "≤ 10 % primary + pop" split above is a heuristic for the app as a
whole, not a limit on a screen's hero. Hero panels are approved exceptions to it: the solid cobalt resume panel and Wrapped card on the returning Home,
the subject hero's panel, the /plan Road card, the /progress "Your habit" card (D10), the /test start-here hero's cobalt half and the /labs featured
card's cobalt frame (D21), the result hero's cobalt half (P2-69) and the lesson footer's flip-card back. With them a first screen may pass 10 %,
capped near the mockup home's level (13.7–15 % saturated pixels on its first screen at 1440 px). /pyq, /map, /flash and lessons stay calm, and the coral
stays the only warm hue, exactly once per screen. **Bold-layer review rule:** the approved bold layer is the solid cobalt panels, numerals of 24 px or
more, the answer fills (the learner's pick and the correct answer) and the coral. Every change ships with before/after contact sheets (1440 and 390 px,
light and dark, fresh and demo profiles) that list each of these elements it removes or mutes, and each removal needs the owner's sign-off.
`tools/smoke.py` may report a saturated-pixel census per screen as advice, never as a failing gate.

## 2. Shell (owner: shell)

* **Top nav only** (no sidebar): logo "GATE Ascent", Home `/`, Learn `/syllabus` (also lights for `/s/…`, `/l/…`), PYQs `/pyq` (+`/q/…`), Tests `/test`, Labs `/labs` (+`/lab/…`), Map `/map`;
  sliding active marker; ⌘K / `/` search box (the existing `GA.search` palette, restyled); the engage chips slot (section 7); theme toggle; a **Me** avatar menu: Flashcards `/flash` (with due count),
  Error notebook `/notebook`, Planner `/plan`, My progress `/progress`, GATE Wrapped `/wrapped`, Settings `/settings`, Keyboard shortcuts.
* Phone ≤ 700 px: compact top bar (logo, search icon, chips, avatar) + **bottom tab bar** Home · Learn · PYQs · Labs · Me (Me opens the menu as a sheet). Safe-area insets.
* Page width: content max 1240 px; reading pages define their own column. Breadcrumbs move into each page header (views call `GA.shell.crumbs` as today; render them under the nav, small).
* Remove sidebar code, the `[` collapse shortcut, sidebar CSS, `profile.sidebar` usage (keep the stored field harmless). Keep every route, `GO_KEYS`, skip link, anchors, probe, demo marker.
* Add route `['/wrapped', 'wrapped']`, `FILE.wrapped = 'wrapped'` (the engage agent writes `app/js/views/wrapped.js`).
* Components (`components.css`, `site.css`): v3 versions of `.btn` (press-depth NeoPOP edge, 44–48 px, radius 14; variants: default neutral, `.primary` cobalt, `.pop` coral = main CTA,
  `.ghost`, `.sm`, `.lg`), chips (small, calm; no pill soup), segmented control, inputs/selects, tabs, tables, modal, toast, tooltip, skeleton, progress bar + ring, stat tile,
  cards (`.card`: surface, radius 22, `--lift`), `.sec` sections. Port from the mockup. Everything that uses the old classes must still render.

## 3. Home `/` (owner: home)

Port the mockup's home, in this order (RESEARCH §3): (1) **Resume hero** — the learner's real next lesson (`GA.stats.nextLessons` / last opened) with a live thumbnail;
for the "Paging and page tables" lesson use the mockup's address-translation figure; for others a generic live figure that fits the subject (or the lesson's first diagram);
the only `.pop` CTA "Resume". Fresh profile: **first-run hero** "Pick a subject" + a playable real PYQ. (2) count-up **number strip** (real totals). (3) **Subject bento** sized by marks/paper,
progress rings from local data, top topic chip. (4) **What the papers say**: 4 findings from `GA.insights.hooks()`, big digits first. (5) **Try a lab**: 3 real labs, preview animates on hover/tap.
(6) **Random PYQ** inline: real questions with short stems, no figures, MCQ/NAT; check, feedback (burst / shake, `navigator.vibrate(15)`), shuffle, "Open in bank". (7) **Mocks**: next mock CTA +
sparkline of the learner's real test scores (empty state if none). (8) **GATE Wrapped** card (engage) once there is enough data. The **mascot** sits beside the hero with its gaze on the Resume CTA.
Phone: first screenful = hero + number strip only. Keep `tests/home.test.js` meaningful (update it).

## 4. Lesson `/l/:id` (owner: lesson)

RESEARCH §4: slim reading-progress bar; breadcrumb; title; **"Why it matters"** line from real data (this sub-topic's PYQ count, papers, marks; fall back to the subject's numbers);
a 3-line **key ideas** box (from the lesson's Recap section, else the first sentences of each H2); one 660–700 px reading column (Source Serif), distinct H2/H3, bold key terms;
sticky TOC right on desktop (with reading progress), collapsible on phone; analogy and humour boxes clearly labelled side-boxes; labs/diagrams inline, user-started; each section's existing
self-check questions styled as **Check yourself** with burst/shake feedback; footer: **Next lesson** (`.pop`), related PYQs, this lesson's flashcards (flip card). Levels Intuition/Standard/Deep stay.
All 334 lessons must still render (diagram, kmap, circuit, wave, shapes, seq, tables, KaTeX, code). Use `tools/preview_lesson.py` and `tools/shot.sh` on a spread of lessons from every subject.

## 5. Practice (owner: practice)

PYQ bank `/pyq`: calm rows (paper · Q · subject · topic · marks · type as plain text separated by "·", state dot, difficulty glyph), filters in a tidy bar, subject filter as a segmented/scroll row
(not 15 rainbow pills). Question page `/q/:id` and the test runner `/test/run/:id`: the mockup's practice screen — question card, options as big tappable rows with letter keys,
press-depth buttons, `.pop` on the single main action (Check answer / Next), burst on correct, shake on wrong, `navigator.vibrate`, animated solution reveal, badges (official key · cross-checked /
key questioned / our answer) as calm text with an icon, question palette, timer with pause, mark for review, GATE marking note. Tests hub `/test`, results `/test/result/:id`, flashcards `/flash`
(card flip, rating buttons), error notebook `/notebook`. Keep every behaviour (scoring, MSQ, NAT ranges, calculator, review mode, SRS) unchanged.

## 6. Hubs (owner: hubs)

Syllabus `/syllabus`, subject `/s/:subject`, content map `/map` (+`GA.mapviz` colours), labs gallery `/labs` and lab page `/lab/:id` frame, My progress `/progress`, planner `/plan`,
settings `/settings` + `/about`. Same language: page header (title, one-line real-data subtitle), solid cards, bento where it helps, rings/bars in primary, one `.pop` CTA per screen.
Labs: the 29 lab internals must stay legible in both themes (tokens only; check every lab once). Map: series colours via `--viz-*`, no rainbow chrome.

## 7. Interfaces

* `GA.engage` (owner: engage, `app/js/core/engage.js`, UMD, Node-testable):
  * `compute(state, D, today)` → `{ streak: {current, best, activeToday, freezes, frozen: [days], nextFreezeIn}, xp: {total, today, week, byKind: {...}}, due: {cards, lessons}, level: {n, from, to} }`
    — pure, derived from existing state (`act`, `log`, `lessons`, `cards`, `labs`, `tests`) plus `state.eng` (freeze bookkeeping only).
  * XP (derived, never stored, no double counting): lesson completed 50; first correct PYQ attempt 10 (later correct 3, wrong 1); flashcard review 1 (max 60/day);
    lab challenge solved 15; finished test 100 (+1 per mark scored). Levels every 500 XP.
  * Streak with freeze: a day counts when `GA.stats.dayActive`. One freeze is earned per 7 consecutive active days (hold at most 2). On boot, missed days between the last active day and
    yesterday consume freezes (marked in `state.eng.frozen`); the streak survives a frozen day. `GA.engage.tick(store, today)` persists that (call it once at boot; owner: engage via `actions.js`).
  * `renderChips(el)`: the top-nav chips: streak (flame icon + days, freeze count in the tooltip), XP (level + bar on hover), cards due (→ `/flash`). Quiet, small, accessible; hidden when zero/new.
  * `wrapped(state, D, {from, to})` → recap stats (time studied, lessons done, PYQs solved + accuracy, best subject, hardest topic, longest streak, labs run, cards reviewed, XP), only real.
  * `GA.mascot.svg({size, gaze: 'left'|'right'|'up'|'down', mood: 'idle'|'happy'|'think'})` (`app/js/core/mascot.js`): a small, friendly, original SVG character (not a copy of Duolingo/Brilliant);
    its eyes look along `gaze`. `GA.mascot.say(el, text)` for a tiny speech bubble on empty/finished states.
  * View `app/js/views/wrapped.js` (`GA.views.wrapped`): story-style slides (tap/arrow keys, pause, progress segments), range picker (this week / this month / all time / last mock),
    **Save as image** (draw the summary on a `<canvas>`, download PNG), empty state when there is not enough data.
* Shell calls `GA.engage && GA.engage.renderChips(el)` on every refresh (store change, navigation). Home uses `GA.engage.compute`, `GA.mascot.svg` and links to `/wrapped`.
* Stubs for `engage.js`, `mascot.js`, `wrapped.js`, `engage.css`, `hubs.css` already exist and are wired into `index.html` by the lead, so nobody else has to touch it for them.

## 8. Ownership (one owner per file)

| job | files |
|---|---|
| **shell** | `index.html`, `app/js/shell.js`, `app/css/shell.css`, `app/css/components.css`, `app/css/site.css`, `app/css/base.css` (fine-tuning only, keep section 1), `app/js/core/ui.js`, `app/js/core/search.js`, `app/js/core/reveal.js`, `tests/shell.test.js`, `tests/reveal.test.js`, `app/js/selftest.js`, `tools/smoke.py` (route/selector fixes only) |
| **engage** | `app/js/core/engage.js`, `app/js/core/mascot.js`, `app/js/views/wrapped.js`, `app/css/engage.css`, `tests/engage.test.js`, `app/js/core/store.js` (state.eng + migration), `app/js/core/actions.js` (tick hook), `app/js/core/demo.js` (seed eng data) |
| **home** | `app/js/views/home.js`, `app/css/home.css`, `tests/home.test.js` |
| **lesson** | `app/js/views/lesson.js`, `app/css/lesson.css`, `app/js/viz/diagram.js` (colours/legibility only), `app/js/core/md.js` (markup hooks only, keep tests green) |
| **practice** | `app/js/views/pyq.js`, `app/js/views/qcard.js`, `app/js/views/test.js`, `app/js/views/flash.js`, `app/js/views/notebook.js`, `app/css/views.css` |
| **hubs** | `app/js/views/syllabus.js`, `app/css/subject.css`, `app/js/views/map.js`, `app/css/map.css`, `app/js/core/mapviz.js`, `app/js/views/labs.js`, `app/css/labs.css`, `app/js/labs/*.js` (colours/legibility only), `app/js/views/progress.js`, `app/js/views/plan.js`, `app/js/views/settings.js`, `app/css/hubs.css`, `app/js/core/charts.js` |
| **qa** (last) | anything, to fix integration issues; screenshots of every route at 390/820/1440 × light/dark × fresh/demo; docs (`README.md`, `docs/ARCHITECTURE.md`) |

## 9. Acceptance

A first-time visitor sees a bold, colourful, uncluttered *app* (not a website) that matches the approved mockup; one coral CTA per screen; every number real; light/dark/phone clean;
all old routes work; tests, build check, smoke and selftest pass; the four extras work on real local data and stay quiet for a fresh profile.
