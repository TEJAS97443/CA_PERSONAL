# Frontend redesign - spec (2026-10-13)

Goal: GATE Ascent should look and read like a premium, professional learning product. The first screen sells the *content* (what GATE actually
asks, how deep we go, how it all connects), not the learner's chores. No "Today's goals", no streak/consistency widgets, no greeting card on the home page.

## 0. Hard rules (apply to every agent)

* Static, offline, `file://` safe. Classic `<script>` tags, UMD modules, vanilla JS, no bundler, no CDN, no external requests, no new runtime dependency. Fonts/KaTeX are already vendored.
* Every number on screen is computed from real data (`GA.data.D`, the manifest, `localStorage`). **Never invent a statistic, a testimonial, a user count or an "X% of students" claim.** Hooks may only state things we can recompute from the bank/lessons.
* Light + dark theme parity (use the tokens in `app/css/base.css`; add new tokens only in `app/css/site.css`). Subject colour = `--h` (hue) as in existing cards.
* Responsive: 360 px phone -> 1920 px desktop. Test at 390, 820, 1440 widths. No horizontal page scroll; wide visuals scroll inside their own box.
* Accessibility: semantic landmarks/headings, visible focus, `aria-label`s on icon-only buttons, colour is never the only signal, `prefers-reduced-motion` disables animation, contrast >= WCAG AA.
* Performance: home paints without loading lesson/question bodies (only the manifest). Heavy visuals are inline SVG/CSS, lazily initialised with `IntersectionObserver`.
* Do not break anything: `node tests/run.js` (1150+ pass), `python3 -I tools/smoke.py`, `build.py --check`, selftest. New pure logic gets Node tests. Update `index.html` script order and `docs/ARCHITECTURE.md` for anything you add.
* Inclusive language (no master/slave/whitelist/blacklist in code or UI copy; the existing "Master theorem" lesson wording is a pending user decision - do not touch it).
* Scratch/screenshots: use `$TMPDIR/<your-job>`; delete PNGs when you've looked at them. Screenshot with headless Chrome:
  `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,3000 --virtual-time-budget=6000 --screenshot=<png> "file://$HOME/DSA_PERSONAL/gate_cse/index.html#/map"` (add `?theme=dark`, `&profile=demo` as needed; `?profile=demo` has synthetic progress, the default profile is a fresh learner - **both must look good**; the empty profile is the first-impression case).
  `tools/preview_lesson.py` is for lessons only. If Chrome is slow, raise `--virtual-time-budget`.

## 1. Information architecture

| Route | Screen | Notes |
|---|---|---|
| `/` | **Home** (new, content-first marketing page) | no personal widgets except one slim "Continue" strip when real progress exists |
| `/map` | **Content map** (new, signature page) | three lenses, see 4 |
| `/syllabus` | Syllabus (existing, polish) | tidy, consistent with new design system |
| `/s/:subject` | **Subject page** (existing, upgraded) | hero + stats + topic map + learning order + labs + PYQ trend |
| `/progress` | **My progress** (the old dashboard, moved) | "Today's goals" card removed, sidebar streak card removed |
| `/pyq` `/test` `/flash` `/notebook` `/labs` `/plan` `/settings` `/l/:id` `/lab/:id` `/q/:id` | existing | inherit new shell/tokens; no functional change |

Sidebar groups: **Explore** (Home, Content map, Syllabus) - **Practise** (PYQ bank, Tests & mocks, Flashcards, Error notebook) - **Tools** (Interactive labs, Planner) - **Me** (My progress, Settings).
Top bar: search (prominent, `/` or Cmd-K), theme toggle, a quiet "Content map" shortcut. No countdown pill, no streak.

## 2. Voice and "clickbait" (curiosity hooks that are TRUE)

Headlines are specific, numeric, and verifiable; they open a curiosity gap that the linked page closes. Patterns (numbers are computed, these are examples):
* "The topic GATE has asked in 24 of 26 papers" -> opens that topic's lesson.
* "Four subjects carry 60% of all CS marks" -> opens the marks map.
* "13 questions where the official answer key is arguable. We show both sides." -> opens the disputes list.
* "Break quicksort on your own input in 30 seconds" -> opens the sort lab.
* "Same idea, 9 papers, 9 disguises" -> opens a sub-topic's PYQ timeline.
Rules: no fake urgency, no "most students", no superlatives we cannot compute, no emoji spam (at most one small icon per card, from `GA.icon`). Copy is plain English, confident, short. Sentence case.

## 3. Home page - sections, top to bottom

1. **Hero.** Strong headline (e.g. "Crack GATE CSE by learning what GATE actually asks."), one-line sub with live numbers, two CTAs (*Explore the content map*, *Browse 1,985 solved PYQs*), small secondary link (*Take a 20-minute diagnostic*). Right side: a live, subtle mini content map (constellation of the 14 subjects, hover highlights, click -> subject). Fresh-profile friendly.
2. **Proof strip.** Real counts: lessons, solved PYQs, papers (2007-2026), interactive labs, flashcards, diagrams. Animated count-up (reduced-motion safe). Each links somewhere.
3. **"Curiosity" hook grid.** 6-9 cards from `GA.insights.hooks()`; each = kicker, big computed number, headline, one-line payoff, deep link. Mixed kinds: frequency, concentration, trend, trap, dispute, lab, path.
4. **Content map teaser.** The interactive map (component from the map agent: `GA.mapviz.mount(el, opts)`), "See the whole syllabus on one page" + CTA to `/map`.
5. **Where the marks are.** Per-subject average marks per paper (bars) + 20-year sparkline; sortable; each row -> subject page. A short "how to read this" line.
6. **Subject grid.** 14 rich cards: colour, icon, area, lessons, PYQs, avg marks/paper, top 3 topics (by frequency), prerequisites hint, "Start" CTA.
7. **Labs showcase.** 29 labs as a gallery with one-line "what you can break" and tag chips; featured lab on top. Deep link `/lab/:id`.
8. **PYQ explorer teaser.** Year x subject heatmap (marks), hover tooltips, click -> `/pyq?...`; plus "paper of the year" quick links.
9. **Learning paths.** 3-4 curated, computed paths (From zero, Crash course by marks, Weak-subject rescue, Last 30 days), each with lesson count, hours, PYQs covered and a *Start path* link.
10. **How a lesson works.** Visual anatomy: intuition -> tricks & traps -> worked examples -> interactive lab -> quiz -> PYQs -> flashcards. Uses a real lesson as the example.
11. **Why you can trust it.** Truthful differentiators from real data: every worked number re-derived by scripts, answer-key disputes flagged, 191 interactive embeds, offline, your data stays in your browser.
12. **FAQ + footer.** Short FAQ (syllabus coverage, offline use, progress storage, GATE dates, how PYQs are sourced), then a proper footer (Explore, Practise, Tools, About/credits, keyboard shortcuts, data-privacy line).
Plus: when `GA.store` shows real progress, a slim "Continue where you left off" bar sits under the hero (no widgets, no goals).

## 4. Content map (`/map`)

Three lenses, one canvas, a segmented control and shareable URL state (`#/map?lens=...&subject=...`):
1. **Syllabus map (default)** - subject -> topic -> sub-topic as an interactive treemap/sunburst or radial tree, area = PYQ marks (toggle: lessons, minutes, PYQs), colour = subject hue, search-to-locate, click drills in, breadcrumb, side panel with the node's lessons, labs, top questions and "start here". Keyboard navigable; screen-reader friendly list fallback.
2. **Prerequisite map** - a "metro map" of lessons from their `needs` edges (layered, left-to-right), filter by subject, highlight the learning path to a chosen lesson, node = lesson (title, minutes, tier), done-state from progress when it exists.
3. **Exam map** - year x topic/subject matrix (marks), brush a range of years, click a cell -> the questions; trend annotations computed from data.
The reusable renderer is `GA.mapviz` (mini mode for the home hero / teaser, full mode for `/map`).

## 5. Subject page (`/s/:subject`)

Hero (subject colour, area, official syllabus line), stats (lessons, hours, PYQs, avg marks/paper, share of marks, trend sparkline), **topic map** (mini mapviz scoped to the subject), **learning order** (prerequisite-sorted lesson list with tiers/minutes/done state), **what GATE asks** (top topics by frequency with year chips), **labs** for the subject, **PYQ timeline**, hooks scoped to the subject, prev/next subject. All numbers from `GA.insights`.

## 6. Design system (shipped by the shell agent as `app/css/site.css`, used by everyone)

Display/type scale (hero 56/64, h2 36, eyebrow, lead), spacing scale, section wrapper `.sec` (max width 1180, generous vertical rhythm), `.eyebrow`, `.lead`, `.btn-xl`, `.pill`, `.card-xl` (hover lift, subject accent line), `.grid-auto`, `.stat-big`, `.reveal` (IntersectionObserver fade/slide, reduced-motion safe), gradient-mesh background utility, section dividers, tooltip primitive, skeleton, subject-colour helpers (`style="--h:262"`), focus ring, dark-mode variants. Existing component classes keep working.

## 7. Data module - `app/js/core/insights.js` (`GA.insights`, UMD, Node-testable)

Pure functions of `D` (the catalogue from `GA.data.D`; build.py may add a small `stats` block to the manifest for things D lacks: diagrams, quizzes, lab embeds per lesson, disputed question ids). Memoised. API (shapes are binding):
* `build(D, extra) -> I` (also `GA.insights.get()` after boot).
* `I.totals` = `{lessons, cards, diagrams, quizzes, labs, labEmbeds, papers, questions, years:[min,max], marks, disputes}`.
* `I.subjects` = array of `{id, name, short, hue, area, official, lessons, minutes, cards, pyqs, marks, marksPerPaper, share, trend:[{year,marks}], topics:[{id,name,pyqs,marks,papers,lessons}], topTopics:[...3], labs:[labIds], firstLesson}`.
* `I.topicFrequency(limit)` -> topics ranked by number of distinct papers that asked them (+ marks, years asked).
* `I.yearSubject()` -> `{years:[...], subjects:[...], cells:[[marks]]}`; `I.yearTopic(subject)` same for topics.
* `I.graph(subject|null)` -> `{nodes:[{id,title,subject,topic,minutes,tier,level}], edges:[{from,to}], levels:n}` from lesson `needs` (cycle-safe, layered).
* `I.paths()` -> curated paths `[{id,title,blurb,lessons:[ids],minutes,pyqs,marks}]` (prerequisites respected).
* `I.labCards()` -> labs with subject, blurb, tags, `embeddedIn:[lessonIds]`, `featured` flag.
* `I.hooks(n, {subject})` -> `[{id, kind, kicker, stat:{value,unit}, title, body, href, subject, evidence:{...}}]`; every hook is template-driven, only emitted when its condition holds in the data, and `evidence` lets a unit test recompute the number from raw data.
Tests: `tests/insights.test.js` recomputes every headline number from the raw catalogue.

## 8. Ownership (no two agents edit the same file)

* **insights agent**: `app/js/core/insights.js`, `tests/insights.test.js`, minimal `build.py` manifest `stats`, index.html script tag for insights.
* **shell agent**: `app/js/shell.js`, `app/css/shell.css`, `app/css/site.css`, `index.html`, `app/js/views/dashboard.js` (-> `/progress`, goals/streak removed), route table, nav, topbar, mobile drawer, stub `views/home.js` + `views/map.js` (only if absent), `tests/` + `selftest.js` route fixes.
* **home agent**: `app/js/views/home.js`, `app/css/home.css`.
* **map agent**: `app/js/views/map.js`, `app/js/core/mapviz.js` (+ `GA.mapviz`), `app/css/map.css`.
* **subject agent**: `app/js/views/syllabus.js` (subject + syllabus screens), `app/css/subject.css`.
* **polish/QA agent**: screenshots at 390/820/1440 in light+dark for every redesigned screen, fixes, regression runs, docs.

## 9. Acceptance

A first-time visitor (empty profile) sees a confident, content-rich page; every number matches the data; nothing resembles a to-do list; light/dark/phone all clean; the old dashboard still works at `/progress`; all tests/smoke/selftest pass; `docs/ARCHITECTURE.md` and README updated.
