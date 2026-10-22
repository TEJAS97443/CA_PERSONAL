# Architecture

> **PassBook fork notes (2026-10-20).** This document was written for GATE Ascent (`~/DSA_PERSONAL/gate_cse`), whose engine PassBook forks unchanged in
> design: everything below still describes how the app works. What changed for CA Intermediate Group II:
> * **Content model.** Subjects are ICAI papers (`cma` P4 100 marks, `aud` P5 100, `fm` P6A 50, `sm` P6B 50; syllabus `@subject … | paper=P4 | marks=100`).
>   `tools/syllabus.py` parses `paper` and integer `marks`; `GA.insights` subject rows carry `paper`, `paperMarks`, `examShare`, and every
>   weight that used PYQ marks a paper (bento, ranking, planner shares, labs order) uses the paper's marks. Lesson sections come from
>   `content/sections.json` (order, required, one-of groups, depth levels and the Quick / Exam / Deep labels), read by
>   `tools/buildlib/lessons.py`, shipped as `manifest.sections` (`D.sections`) for `views/lesson.js` and `views/revise.js`.
> * **Exam calendar.** `content/exam.json` holds ICAI's January 2027 Group II days with `papers: {P4, P5, P6}` (not `papers.CS`), the time
>   and reading time, source URL and SHA-256. `GA.stats.exam()` counts to the first paper day still ahead (basis `'official paper day'`;
>   `'assumed'` only when a cycle has days but no papers) and returns `paper: {code, name, day}`; `GA.stats.paperDays(D)` maps each subject
>   to its day; `U.untilExam` says '80 days to Paper 4'. The streak bridge exempts every official paper day and the day after.
> * **No question bank yet.** `pyq/sources/manifest.json` is empty, so the build ships zero questions. `GA.ui.bankIsEmpty(D)`,
>   `GA.ui.bankEmptyCard()` and `GA.ui.str.bankEmpty` ('ICAI past papers, RTPs and MTPs are being added') give every question screen one
>   honest empty state; `GA.stats.nextStep` never names a test, a mock or a past-question count while `D.questions` is empty. `::: pyq`
>   blocks are optional and warn on unknown ids. The GATE question model (MCQ/MSQ/NAT, negative marking, the 65-question blueprint) is
>   still the machinery behind `scoring.js`, `testgen.js` and `qcard.js`; the ICAI bank job replaces it (see `~/CA_PERSONAL/ca_prompts/reports/fork.md`).
> * **Labs.** The 29 GATE labs are gone; `content/labs.json` is managed with `tools/lab_status.py` (add / set / status, locked); a
>   `planned` lab without its file is a build warning and a "coming soon" card in the app. `tests/fixtures/fixture-bep.js` keeps the
>   framework tests running with no real lab.
> * **Names and storage.** PassBook, Tick (the mascot, an auditor's tick), PassBook Wrapped, the tab "Questions"; localStorage keys
>   `passbook:<profile>` (never GATE Ascent's `gate-ascent:`), backups `{app: 'passbook'}`, service-worker cache `pb-files`.
> * **Tests.** Logic tests that needed GATE content run on `tests/fixtures/catalogue.js` (every CA sub-topic as a lesson, a synthetic MCQ
>   bank) via `tests/next-states.js` `catalogue()` until the shipped catalogue is big enough; GATE-content tests were removed.

PassBook (forked from GATE Ascent) is a **static, offline-capable single-page app**. There is no server and no framework: open `index.html` from disk (or any static host).
Everything the learner sees is either *content* compiled by `build.py` into `data/*.js`, or *state* kept in `localStorage`. Every number on screen is a pure
function of those two things (`app/js/core/stats.js` for the learner's progress, `app/js/core/insights.js` for facts about the content); nothing is hard-coded, sampled or invented.

## 1. Design decisions

| Decision | Why |
|---|---|
| Classic `<script>` tags, UMD modules, no bundler | ES modules are blocked on `file://`; the app must work by double-clicking `index.html`. Core modules also `require()` in Node, so they are unit-tested without a browser. |
| Data shipped as `data/*.js` calling `GAD.reg(ns, key, value)` | `fetch()` of JSON is blocked on `file://`; script tags are not. Subjects, papers, solutions and flashcards are separate files loaded **on demand**. |
| Hash router (`#/l/os.sched.rr`) | Deep links and back/forward without a server. |
| One versioned JSON document per profile in `localStorage` | Simple, exportable, migratable. Profiles: `main`, `demo` (`?profile=demo`, synthetic learner), `selftest`. They use different keys, so demo data can never leak into real progress. |
| Content in plain text (Markdown dialect, a syllabus DSL, JSON question records) | Diff-able, reviewable, agent- and human-writable, validated by the build. |
| Derived, never stored, statistics | Streaks, mastery, weak topics, due-lists, the study plan are recomputed from the attempt log on every render, so they can never drift from reality. |

## 2. Repository map

```
index.html                  stylesheet + script order matters (core modules before shell.js; site.css after the base sheets)
build.py                    validate everything, write data/ and docs/COVERAGE.md
app/js/core/                pure logic + shared UI services (see §4)
app/js/viz/diagram.js       the diagram kit (gantt, graph, tree, table, memory, seq, layers, bits, flow, plot, array, kmap, circuit, wave, shapes, venn, er, nest)
app/js/labs/                lab framework + one file per lab (pure compute() + controls)
app/js/views/               one file per screen, loaded lazily by the router (home, map, progress, syllabus, lesson, pyq, test, flash, notebook, plan, labs, settings, wrapped; qcard is shared)
app/js/shell.js             layout (top nav, Me menu, phone tab bar, breadcrumbs, the 404 screen), route table, keyboard shortcuts, boot
app/js/selftest.js          in-browser end-to-end test (loaded only with ?selftest=1)
app/css/                    base (tokens, themes), components, shell, views, lesson, labs, then site (design-system primitives) and the
                            per-page sheets: home, map, subject, hubs, engage (see §4b)
content/syllabus/syllabus.txt   the syllabus tree (single source of truth for every id)
content/subjects/<subj>/<id>.md one lesson per sub-topic (see docs/CONTENT_GUIDE.md)
content/labs.json           lab catalogue (status ready | planned)
pyq/sources/                manifest of official PDFs (URL, Wayback timestamp), sha256 of every download
pyq/parsed/<paper>.json     transcribed + verified question records; <paper>.key.json = machine-parsed official key
pyq/meta/<paper>.json       editorial tags (subject/topic/subtopic/difficulty) and worked solutions
pyq/figs/<paper>/           figure crops cut from the official PDFs
pyq/work/                   scratch for the import pipeline (page crops, drafts, blind answers) - not shipped
_raw/                       the downloaded official PDFs (untrusted data; never executed)
data/                       GENERATED by build.py - never edited by hand
tools/                      import, QA and authoring tools (see docs/PYQ_IMPORT.md)
tests/                      Node tests: node tests/run.js [pattern]
docs/                       this folder
vendor/                     KaTeX 0.16, Inter, Source Serif 4, JetBrains Mono (self-hosted)
```

## 3. Data flow

```
official PDFs ──fetch.py──> _raw/ ──workbench.py──> pyq/work/ ──autoparse.py──> pyq/parsed/*.json (status "auto")
                                                                 └─ human/agent transcription + verification ─> status "verified"
syllabus.txt ┐
lessons *.md ├─ build.py (validate, lint, compile) ─> data/*.js ─> index.html (GAD.reg) ─> views
labs.json    │
pyq/meta     ┘                       localStorage (state) ─────────────────────────────────┘
```

`build.py` refuses to write `data/` if anything is inconsistent: unknown syllabus ids, a lesson without its required sections, a PYQ citing a question that does not
exist, broken math, a diagram spec the kit cannot draw, a tag that is not in the syllabus tree, and so on (question-level checks - option counts, key agreement, figure text - are
`tools/pyq/validate.py`, run per paper during import). A normal build ships **only `verified`** questions; the
development flags `--include-auto` and `--dev-tags` exist so the UI can be exercised before verification finishes and must never be used for a release.

## 4. Runtime modules (`app/js/core`)

| module | responsibility |
|---|---|
| `util.js`, `icons.js` | DOM helpers, date helpers (`today()`, `daysBetween`), debounce, script loader; one SVG icon sprite |
| `store.js` | the state document, migrations, persistence (debounced flush, `pagehide` flush, `storage` event sync), export/import (a backup is kept before every import) |
| `actions.js` | **the only writers of state**: record an attempt, finish a test, review a card, mark a lesson, notebook edits, goals |
| `scoring.js` | GATE marking: MCQ -1/3 (1 mark) and -2/3 (2 marks); MSQ all-or-nothing, no negative; NAT inclusive ranges; marks-to-all; "one of" alternatives; linked-answer rule |
| `srs.js` | spaced repetition (SM-2 style: again/hard/good/easy), intervals capped at half the days left to the exam so everything is seen before GATE |
| `stats.js` | every derived number: completion, subject mastery, weak topics, accuracy, streaks, heatmap, due lists, countdown, mock analytics, recommended next lessons |
| `testgen.js` | builds tests: a past paper, a mock with the real blueprint (10 GA + 25 x 1-mark + 30 x 2-mark), subject / topic quizzes, diagnostic, custom; and `summarise()` for results |
| `planner.js` | the personalised plan: phases by days left (learn > 100, practise 100-45, mocks 45-14, final <= 14), weekly focus subjects (marks share x (1 - mastery), weighted by lessons available), today's checklist |
| `data.js` | lazy loaders for lessons, flashcards, papers, solutions; the in-memory catalogue (`GA.data.D`) with lookups |
| `md.js` | the Markdown dialect: containers (`:::`), quizzes, PYQ embeds, lab embeds, KaTeX, code highlighting, diagram fences |
| `charts.js`, `ui.js`, `router.js`, `search.js` | SVG charts (rings, radar, heatmap, bars, subject glyphs), toasts / dialogs / shortcuts / theme (`auto` follows the system) / answer feedback (burst, shake, vibrate), the hash router, the ⌘K command palette across lessons / topics / questions / labs |
| `engage.js`, `mascot.js` | `GA.engage`: streak with freezes, XP and levels, cards due, the GATE Wrapped numbers and the nav chips, all derived from the state (§4b, Engagement); `GA.mascot`: "Peak", the small SVG character whose gaze points at the screen's main action |
| `demo.js` | a synthetic learner for screenshots and tests (demo profile only; refused on `main`) |
| `reveal.js` | `GA.reveal`: `.reveal` fade-ins, `[data-count]` count-ups, `whenVisible(el, fn)` lazy initialisation (returns a cancel function), the `[data-ftip]` floating tooltip; IntersectionObserver-based, reduced-motion safe. Elements that leave the document are dropped from its observers on the next render, so a closed view is never kept alive |
| `insights.js` | `GA.insights`: pure facts about the content (topic frequency, marks per subject and year, prerequisite graph, curated paths, curiosity hooks), each recomputable from the catalogue; memoised (build about 3 ms, all hooks about 16 ms uncached) |
| `mapviz.js` | `GA.mapviz`: the content-map renderer. `mount(el, {mode:'full', lens})` draws the three `/map` lenses (syllabus treemap, prerequisite metro map, exam matrix) with URL state; `mount(el, {mode:'mini', variant:'treemap'})` draws the subject-page topic map (the `'constellation'` variant is kept but no screen uses it since the v3 home). Every handle has `destroy()`, which removes its observers, timers, listeners and tooltip |

## 4a. Screens, routes and styles

| route | view (file) | screen |
|---|---|---|
| `/` | `home` (`views/home.js`, `home.css`) | the app home: resume hero (the learner's next lesson with its live figure; a first-run "pick a subject" + playable PYQ for a fresh profile), number strip, subject bento sized by marks, what the papers say, try a lab, random PYQ, mocks, GATE Wrapped card (§4b) |
| `/syllabus`, `/s/:subject` | `syllabus`, `subject` (`views/syllabus.js`, `subject.css`) | the syllabus index (14 expandable subject cards, per-node lesson / PYQ counts, tier and status as text, search + tier / status filters, URL `?q=&tier=&status=&open=`) and the subject pages (hero with one start / continue CTA, number strip, hooks, topic map, learning order, what GATE asks, PYQ timeline, labs, prev / next; `?t=<topic>` scrolls to a topic) |
| `/l/:id` | `lesson` (`views/lesson.js`, `lesson.css`) | a lesson; `?path=<id>` adds a slim path bar (step n of N, previous / next on the path) and the footer follows the path |
| `/pyq`, `/q/:id` | `pyq`, `question` (`views/pyq.js`, `qcard.js`) | the PYQ bank and one question. URL filters `q subject topic sub year from to paper type marks sec diff status syl sort page`, plus `type=NAT,MSQ`, `disputed=1` (the disputed keys in the manifest `stats.disputes`) and `special=1` (marks to all / several answers); each active filter is a removable chip. Pure helpers `GA.pyqLib` (`tests/pyq.test.js`, `tests/practice.test.js`) |
| `/test`, `/test/run/:id`, `/test/result/:id` | `testhub`, `testrun`, `testresult` (`views/test.js`) | tests and mocks; `/test?new=mock` / `?new=diagnostic` start one like the hub's buttons |
| `/flash`, `/flash/:deck`, `/notebook` | `flash`, `notebook` | flashcards (decks per subject, topic or lesson) and the error notebook |
| `/labs`, `/lab/:id` | `labs`, `lab` (`views/labs.js`, `labs.css`) | the labs gallery (`?subject=`) and one lab |
| `/map` | `map` (`views/map.js`, `map.css`, renderer `core/mapviz.js`) | the content map (syllabus, prerequisite and exam lenses; `1` `2` `3` switch lens; state in the URL) |
| `/progress`, `/plan`, `/wrapped` | `progress`, `plan`, `wrapped` | My progress (a fresh profile sees one start card, no empty charts), the planner, GATE Wrapped (`?range=week|month|all|mock`, `&slide=n`) |
| `/settings`, `/about` | `settings`, `about` (`views/settings.js`) | settings (exam, goals, theme, backup, demo profile) and sources / method / credits |
| anything else | the shell's 404 | a card with the mascot, the address, one coral "Go to Home" and search |

The route table, the top-nav tabs (`NAV`), the Me menu (`ME`), the phone tab bar (`TABBAR`) and the `g x` shortcuts are plain data at the top of `app/js/shell.js`;
`tests/shell.test.js` checks that every route has a view file, every nav link a route, and every shortcut a unique combo.
Shortcuts: `/` or Cmd/Ctrl-K search, `t` theme, `?` help, and `g h` home, `g m` map, `g s` syllabus, `g p` PYQ bank, `g t` tests, `g f` flashcards,
`g n` notebook, `g l` labs, `g r` planner, `g g` my progress, `g w` GATE Wrapped, `g ,` settings.
A view may call `GA.shell.layout('bleed')` in `enter()` to drop the page padding and width cap (the shell resets it on every navigation); bleed pages lay out their
content with `.sec` sections.

**Styles.** `base.css` owns the colour tokens and both themes (§4b); `components.css` the shared components; `site.css` layout / type / depth tokens and the shared
primitives (`.sec`, `.sec-head`, `.page-h`, `.btn-xl`, `.pill`, `.card-xl`, `.icon-tile`, `.grid-*`, `.stat-big`, `.stat-grid`, `.reveal`, tooltips `[data-tip-pos]` / `.tt` / `[data-ftip]`,
`.skel`, `.scroll-x`, `.dotl`, `.hl-list`; `.mesh` and `.grad-text` remain as no-ops). Any element with `style="--h:<hue>"` gets `--subj` (the subject hue, for tiny dots and data
series only) while `--subj-ink` / `--subj-soft` are neutral, so old subject-tinted markup renders calm. Page sheets (`home.css`, `map.css`, `subject.css`, `hubs.css`,
`engage.css`, `views.css`, `lesson.css`, `labs.css`) use tokens only, never raw colours.

### How the progress numbers are defined

* **Syllabus completion** = lessons marked done / lessons that exist (and per subject). Unwritten lessons are shown as planned, never counted as done.
* **Subject mastery** = 0.30 x lessons + 0.55 x practice accuracy + 0.15 x flashcards maturity, each with a 45-day half-life on evidence, damped when coverage is thin.
  A subject with no evidence shows "no data", not 0 %.
* **Weak topics** rank by `(historical marks share of the topic) x (1 - your accuracy there)`, so a rarely-asked weak topic does not outrank a heavily-asked one.
* **Streak** (`GA.engage`, shown as the nav chip and in GATE Wrapped) counts a day when `GA.stats.dayActive` holds: any answer, card review or finished lesson, or 10 minutes of study; freezes are explained in §4b.
* **Mock analytics** come from stored test results: score, accuracy, attempt rate, section split, time per question, negative-marks lost.

## 4b. The v3 interface (2026-10-15)

The look the user approved after rejecting seven others: the research-led app layout of `_vibes/v3/app.html` in the **Cobalt Pop** palette, a top nav, and four
extras (GATE Wrapped, the mascot, a streak with freezes, cards due / XP). The binding spec is `docs/FRONTEND_V3_SPEC.md`, the evidence behind it `_vibes/v3/RESEARCH.md`.
The 2026-10-16/17 design audit (wave 1) changed much of what this section describes; where they differ, §10 (the contract) and §11 (what was built) are current.

### Design language

* **An app, not a website**: a persistent shell, solid cards (surface, radius 22, the one `--lift` shadow; none in dark mode), bento grids where they help, bold 850-weight
  titles (one page-title size app-wide: `clamp(30px, 1.4vw + 22px, 42px)`, 28–34 px on phones; the one exception: the lesson H1, 46 / 34 px, see Lesson page), a one-line real-data subtitle under every title, breadcrumbs only on
  pages below a hub. Calm reading pages (lessons): one Source Serif column, labelled side-boxes, nothing that moves by itself.
* **Colour**: about 60 % background, 30 % surface, at most 10 % cobalt primary plus coral. Cobalt (`--accent`) is links, the active tab, selected states, progress and focus;
  `.btn.primary` is cobalt. **Coral (`--pop`) is the one main call to action per screen** (Von Restorff); `tools/smoke.py` fails a screen with two. Success / warning / error
  always carry an icon (✓ / ✕), never colour alone. **No rainbow subject colours**: a subject is a glyph (`GA.charts.subj`) plus its name; hues survive only as data
  series (`--viz-*` in the map, notebook and charts). No glass, glow, gradient text or mesh backdrops; light and dark are equal themes and `auto` follows the system.
* **Contrast**: every text level passes WCAG AA on `--surface` and `--surface-2` in both themes (`--faint` is #68708C light / #8A8F9E dark); text is never dimmed with
  `opacity` below what keeps AA on its fill (CTA kickers, segmented counts).
* **Motion is feedback**: ≤ 300 ms, on a user action or a state change (press-depth buttons, burst on a right answer, shake on a wrong one, `navigator.vibrate`, card flip,
  sliding tab markers); count-ups, ring sweeps and the home hero figure run once per session; lab previews animate on hover / focus / tap only; Wrapped auto-advance
  has Pause. `prefers-reduced-motion` turns all of it off (`base.css` also stops looping skeletons).
* **Focus and structure**: a visible cobalt focus ring on everything focusable (including the lab stage, which takes Space / arrow keys), headings in order on every screen
  (one `h1`), `aria-label` on icon buttons, landmarks and a skip link.

### Tokens (`app/css/base.css`)

`--bg` #F2F5FF / #111215, `--surface` #FFFFFF / #1B1D23 (+ `--surface-2`, `--surface-3`), text `--ink` · `--ink-2` · `--muted` · `--faint`, `--accent` #2450E0 / #6B8CFF with
`--accent-ink` and `--accent-soft(-2)`, `--pop` #D6245E / #FF6B6B with `--pop-ink`, `--ok` / `--warn` / `--bad` (+ `-soft`), the button edges `--edge-neutral` / `-accent` / `-pop`,
`--lift`, radii `--r-xs … --r-xl` (8 / 12 / 16 / 22 / 28). Older token names are kept so earlier CSS keeps rendering (`--primary` = `--accent`).

### Shell and components

* **Shell** (`app/js/shell.js`, `app/css/shell.css`): a sticky **top nav** (`header.topbar`; `--bar-h` is its own height, 68 px, 58 px at ≤ 700 px; `--topbar` =
  `--nav-h` is the room it takes: that height plus the top safe-area inset, 0 on short landscape screens where it scrolls away) with the logo, six tabs
  (`NAV`: Home `/`, Learn `/syllabus` (+ `/s/…`, `/l/…`), PYQs `/pyq` (+ `/q/…`), Tests `/test`, Labs `/labs` (+ `/lab/…`), Map `/map`) and a sliding active
  marker (`.tn-ind`; it slides only when the active tab changes), the engage chips slot `#tb-chips` (`GA.engage.renderChips(el)` on every refresh; time-on-task
  store changes, which fire every few seconds while reading, re-check the chips at most once a minute and repaint only when streak / XP / due changed, so a day
  that becomes active through reading alone shows within a minute), the search box
  (opens `GA.search`), the theme toggle and the **Me** avatar menu (`ME`: Flashcards with the due count, Error notebook with the open count, Planner, My progress,
  GATE Wrapped, Settings, Keyboard shortcuts, and a Theme Auto / Light / Dark picker). Me pages light the avatar instead of a tab.
  **Phones (≤ 700 px)**: a compact bar (logo, chips, search icon, avatar) plus a fixed **bottom tab bar** (`TABBAR`: Home · Learn · PYQs · Labs · Me); Me opens the
  same menu as a bottom sheet, which also lists Tests and the Content map. `--tabbar` holds the space the bar takes (0 elsewhere and in exam mode), so fixed or
  sticky bottom UI should sit at `bottom: var(--tabbar)`. Tablet (701–1000 px) drops the brand name, the tab icons and the theme button (it is in the Me menu).
  If engage's chips still do not fit, `fit()` folds the nav step by step (`.fit-1` tab icons, `.fit-2` search to an icon, `.fit-3` brand name, `.fit-4` tighter tabs).
  `body.in-exam` (the test runner) hides tabs, chips, search, the Me menu and the tab bar.
* **Breadcrumbs**: views keep calling `GA.shell.crumbs([[label, href], …])`. With two or more parts they render small, under the nav (`.crumbs-row`); a view can host
  them in its own page header instead by rendering `<nav data-crumbs></nav>` (the shell fills it after the view has rendered; call `crumbs()` again if the view
  re-renders that header). One-part crumbs only set `document.title`. `GA.shell.layout('bleed')` works as before (content max is now 1240 px, `--page-max`).
* **404**: an unknown route renders a card in the app's language (mascot, the address, the one coral "Go to Home", search); no tab is lit.
* **API**: `GA.shell.crumbs`, `.layout`, `.menu(open)` (`.drawer` is an alias), `.refresh()`, `.shortcuts()`. Route `/wrapped` → `views/wrapped.js`; `g w` jumps there.
  Dev aid: `?open=me | search (&q=…) | keys | toast` opens that UI after boot, for screenshots.
* **Theme** (`app/js/core/ui.js`): `GA.ui.setTheme('auto'|'light'|'dark')` stores the preference; `auto` follows `prefers-color-scheme` live (`GA.ui.watchTheme`);
  `t` / the nav button flip light ↔ dark explicitly; `?theme=` forces one for a page load. `GA.ui.themePref()` reads the stored preference.
* **Feedback helpers** (`ui.js`): `GA.ui.burst(el)` (correct answer), `GA.ui.shake(el)` (wrong answer), `GA.ui.buzz(ms)` (`navigator.vibrate`, Android only); all
  respect reduced motion. Modals become bottom sheets on phones; toasts sit bottom-centre above the tab bar.
* **Palette** (`app/js/core/search.js`): the mockup's command palette: results keep their score order, grouped by type (Continue, Questions, Lessons, Topics,
  Labs, Jump to) with an icon tile per row; an empty query lists the learner's lessons in progress (real local data), then actions.
* **Components** (`components.css`, every view inherits them; old class names keep rendering): press-depth `.btn` (44 px, radius 14, a NeoPOP edge in
  `--edge-*` that compresses on press) with `.primary` (cobalt), `.pop` (coral, the one main CTA per screen; `.accent` is an alias), `.ghost`, `.sm` (36 px),
  `.lg` (52 px), `.icon`, `.on`, `.ok`, `.bad`, `.block`; calm `.chip` (radius 9; `.chip.subj` is neutral with a tiny hue dot, no rainbow), `.seg`, `.input` / `select.input`,
  `.switch`, `.bar`, `.ring`, `.segs`, `.tabs`, `table.t`, `.empty`, `.sk`, `.toast`, `.modal`, `[data-tip]`, `.stat` and the `.stats` number strip, `.card`
  (surface, radius 22, `--lift`), `.burst` / `.shake`. `site.css` primitives in the same language: `.sec` (sections ~46 px apart, max 1240 px), `.sec-head`, `.sec-h`
  (title row with a link on the right), `.page-h` (page title + one-line subtitle + actions), `.btn-xl` (= `.btn.lg` family; `.primary` is cobalt now), `.link` /
  `.link-arrow` (bold ink on a cobalt underline; plain cobalt inside running text), `.pill`, `.card-xl`, `.icon-tile`, `.stat-big`, `.stat-grid`, `.reveal`
  (300 ms), tooltips. `--primary` now equals the cobalt `--accent`; `--subj-ink` / `--subj-soft` are neutral, so old subject-tinted markup renders calm while
  `--subj` (the hue) stays for tiny dots and data series. Radii follow base.css (`--r-xl` 28 px).
* `GA.reveal.whenVisible(el, fn, {margin})` accepts a px number as well as a CSS length (`GA.reveal.marginOf`).

### Home

`/` (`app/js/views/home.js`, styles `app/css/home.css`, every class `.hm-*`) is the app home of FRONTEND_V3_SPEC.md §3, ported from `_vibes/v3/app.html`. Sections, in order:

* **Resume hero** (`GA.homeLib.heroModel`): a test in progress (its real answer sheet), else the most recently opened unfinished lesson, else the next one from
  `GA.stats.nextLessons`; it prints the lesson's self-checks answered (segments = `stats.quiz[id]`), reading time left (estimated minutes minus `lessons[id].secs`),
  when it was opened and its PYQ marks (`I.lessonInfo`). The figure: the mockup's address translation for `os.mem.paging`, otherwise the lesson's **first diagram**
  (`firstDiagram(md)` + `GA.diagram.render`, lazily loaded, built in once) over a strip of the GATE years that asked the sub-topic. The only `.btn.pop` on the page is
  its CTA. A fresh profile (`hasProgress` false) gets the **first-run hero**: the two CS subjects with the most marks per paper, three subject buttons, "Pick a subject"
  (scrolls to the bento) and a playable real 1-mark PYQ. `GA.mascot.svg` sits beside the CTA with `gaze` left (phones: above it, gaze down).
* **Number strip** (`stripItems`): totals from `GA.insights` plus the learner's own counts (lessons done, PYQs tried, papers sat, labs tried, cards due from
  `GA.engage.compute().due`); count-up once per session through `[data-count]` (`GA.reveal`).
* **Subject bento** (`bentoTiles`): sorted by `marksPerPaper`, sizes by rank (xl xl l l m×6 s s xs xs packs a 12-column grid, and a 6-column one at tablet widths;
  tested), tint strength `--k` = share of the top average, ring = `GA.stats.subjects()` mastery ("New" without evidence), chip = most-asked topic.
* **What the papers say**: `pickFindings(I.hooks())`, the four templates of the mockup (frequency, no negative marking, fast track, disputed keys) when present; text
  verbatim from the hooks, visuals from `hookViz` (ticks, `split` NAT/MSQ/MCQ marks, `duo` time vs marks share, …).
* **Try a lab**: CPU Scheduling, Page Replacement and IP Addressing cards with previews computed by `rr`, `pageTrace` and `subnet` (cross-checked against the labs'
  own simulators in `tests/home.test.js`); they build on mouse hover, keyboard focus, or a first tap (a second tap opens the lab).
* **Random PYQ**: `isCandidate` (CS, keyed, in the 2027 syllabus, no figure, not grouped, MCQ or NAT) and `isShort` (short plain stem, four short options or a range key);
  a paper file is loaded on demand and an unattempted question preferred. Answers are marked by `GA.scoring.mark` and recorded with
  `GA.actions.attempt(…, 'p')` like the bank; feedback uses `GA.ui.burst` / `shake` / `buzz`; the worked solution loads on demand; Shuffle; "Open in bank".
* **Mocks**: facts from the real blueprint (`TG.mock`: 65 questions, 100 marks, 3 h), sparkline of the learner's finished tests (`sparkModel`, share of the marks),
  an honest empty state; "Start mock" links `#/test?new=mock`.
* **GATE Wrapped** card: only behind the one Wrapped gate, `GA.engage.recap()` (P2-36); links its `href`. The audit's Home (first-run hero, the returning order of D2,
  the question of the day, the season copy) is described in §11.4.

Motion runs once per session (entrance, count-ups, ring fills, sparkline, the hero figure; Replay redraws it) and never under reduced motion. Phones (≤ 700 px): the first
screenful is the hero and the number strip (a returning hero drops its figure; the first-run question moves below the strip via `display: contents`).

### Lesson page

`/l/:id` (`app/js/views/lesson.js`, styles `app/css/lesson.css`, classes `.lsn-*`), FRONTEND_V3_SPEC.md §4.

* **Layout**: one 690 px Source Serif column with a sticky "On this page" rail beside it (`.lsn-rail` > `nav.lsn-toc`, `#outline`: the H2s with each section's H3s,
  built from the markdown; 236 px above 1180 px, 200 px from 1001 to 1180 px). At ≤ 1000 px the rail is hidden. A slim section bar (`button.lsn-sbar`, D3) then shows the
  current section and k/N under the top bar on scroll-up once the header is out of view, and hides on scroll-down, never because the page scrolled itself. It opens the
  contents as a bottom sheet (`.lsn-sheet`, role=dialog, an overlay-stack entry, so Back, Esc, X and the scrim close it). The shell breadcrumbs sit in the header
  (`nav.lsn-crumb[data-crumbs]`; the last crumb is hidden because the H1 follows). On a `?path=` a one-line path bar sits above them.
* **Title**: the lesson H1 is the one exception to the app-wide page-title size: 850 weight, 46 px (34 px at ≤ 700 px, 30 pt in print). On a reading page the title is
  the only heading above a long serif column (P3-13, kept).
* **Header**: title, the lesson summary, minutes / tier / flashcards (+ legacy flag), the Intuition / Standard / Deep levels (segmented, sliding marker; `profile.depth`, sections
  keep `data-lv` and `.lsn-body[data-depth]` hides them), "Builds on" prerequisites (✓ when done), **Why it matters** and **Key ideas**.
* **Reading progress**: `div.lsn-readbar` is appended to `<body>` (fixed, so a transformed ancestor cannot break it) and placed under whatever sticky/fixed bar the shell draws
  (measured with `elementsFromPoint`, cached); one rAF-throttled capture-phase scroll listener drives the bar, the current / read sections and "k of N" (the rail's own
  4 px bar was removed, P1-09). All listeners, the bar and the lab handles are released in `leave()`. The position (P1-01): the view calls `GA.actions.setLessonAt` only once
  the visit has moved off the heading it landed on (the top; Back's restored place or a `#heading` count as landing), never for the first section, never for the heading
  already saved, never in the first 20 s (`GA.lessonLib.readAt`, tests/lesson.test.js), and once more on leave. A header line 'Continue at <section> · about N min left'
  shows when `lessons[id].at` is set and the lesson is unfinished. An anchored visit (`#/l/<id>#<h>`, Resume) lands focus on that heading (§11.1).
* **Pure helpers** `GA.lessonLib` (tests/lesson.test.js): `keyIdeas(md, 3)` = the first three Recap bullets, each cut to its first sentence when longer than ~150 shown characters
  (`sentences()` never splits inside `$maths$`, code, bold, brackets, `[[links]]` or after "e.g."), falling back to the first sentence of each teaching section;
  `why(I, meta)` = this sub-topic's questions / papers (of the papers that had its section) / marks / last year from `GA.insights.subtopic`, else the subject's
  questions, papers and marks per paper; `practiceLink` = `#/pyq?subject&topic&sub` with exactly the count the bank filter shows (sub-topic, else topic, else subject);
  `neighbours` (syllabus order), `progressOf` (bar maths).
* **Body widgets** (`GA.widgets`): `::: quiz` renders as **Check yourself** (option rows with letter keys; radios/checkboxes stay real inputs, visually hidden; MCQ and MSQ are
  checked with a primary Check button, NAT on Enter too); a right answer bursts from the option's key and buzzes (`navigator.vibrate(15)`), a wrong one shakes the options;
  correct / wrong / missed options carry ✓ / ✕ icons, not only colour. Attempts still go through `GA.actions.recordLessonQuiz`. `::: pyq` rows are calm (paper · Q, marks · type,
  ✓ solved / ✕ missed) and open `GA.qcard` in place. `::: lab` embeds mount when near the viewport (`GA.reveal.whenVisible`) and never play by themselves. An embed
  (P1-16) reads: the lesson's head (name plus 'Try it', `.ga-lab-embed > .lab-eh`), the Given line (`GA.lab.given`) with 'Change the inputs' (a collapsed panel before the
  stage, at every width), the stage with the views that fit 250 px ('N more views'), at most four tiles, then 'Show the numbers' and 'Open full lab →'.
  The body renders in parts (P1-11): `GA.lessonLib.chunks()` splits at `##` and `pieces()` at `###`; the first section renders with the header, then one piece per task;
  `#lesson-body[data-full]` marks the end. Everything renders at once on Back or reload, or up to `GA.router.pendingAnchor()`; depth-hidden sections are empty placeholders
  until first shown.
* **Legibility guards**: `GA.fit.all(root)` (§10.9) in the first frame, again only if fonts were loading, after a depth change and on fold toggles: every diagram keeps
  ≥ 80 % of its drawn width (or is redrawn in its phone layout), wide maths and tables become scroll boxes with a cue, prose tables become row cards on phones; lesson.js runs
  one extra inline-maths pass after it, and its old `fitFigures` / `fitMaths` run only when GA.fit is absent. No lesson scrolls the page sideways at 360 px. Side-boxes (`.co-*`) are labelled cards
  with a coloured edge (primary; trick = ok, mistake/warning = bad, exam = warn); code follows the theme with token syntax colours; no raw hex in lesson.css.
* **Footer**: Mark as understood; the **Next lesson** card with the screen's one `.btn.pop`, whose target is `GA.stats.nextStep(scope 'after:<id>')` (the route from
  `?path=` or `profile.route`) with `GA.lessonLib.after()` as fallback, kicker 'Next lesson · k of n in <topic>' or 'Next on <route> · step k of N'; at a subject's end the
  **End of <Subject>** card (`tally()`: understood / self-checks / PYQs tried; coral 'Practise <Subject> PYQs' to `#/pyq?subject=`; Peak only when all are understood);
  quiet links (Next in order / Next subject / Back to); Related PYQs, labs, flashcards, the flip card; Previous and 'Step k of N in <Subject>'.
* **Print**: lesson.css `@media print` plus beforeprint / afterprint in lesson.js (render everything, open folds, show the self-check answers, print light).

### Practice: question card, bank, question page, tests, flashcards, notebook

* **Question card** (`views/qcard.js`, styles in `views.css` "question card"): the mockup's practice card, shared by the bank, `/q/:id`, the runner, results, the notebook and
  lesson embeds. Header = subject short code, paper · Q (mono), subject · topic · marks · type · difficulty as plain text, and the provenance badge as calm text with an icon
  (*official key · cross-checked*, *key questioned*, *our answer*, *no official key*; read lazily from the solution's `c` record). Options are big tappable rows with letter keys
  (still `label.qc-o` + hidden radio/checkbox, so keys and the self-test work); after checking they show ✓ / ✕ icons, not colour alone. Feedback: burst on correct, shake on wrong,
  `navigator.vibrate` (all off under reduced motion; `GA.qcard.fx = {burst, shake, buzz, calm}` is shared with flashcards). The worked solution is a `<details class="qc-sd">`
  with an animated reveal. New presentation options, behaviour unchanged without them: `cta: 'pop'` (the screen's one coral action: Check answer, then Next),
  `progress {i, n, label}`, `prev` / `next {href, label, end}`, `mark` (bookmark shown as "Mark for review" in the bar), `onRetry`. `GA.qcard.markingNote(q)` is the GATE rule
  sentence (MCQ −1/3 / −2/3, MSQ and NAT no negative). On phones the bar becomes one full-width main action plus a quiet icon-over-label toolbar.
* **Bank** `/pyq`: header with real counts and the `.pop` "Practise N"; a tidy filter bar (search, sort, Filters with an active-count badge, the subject row as a scrolling
  segmented control without subject colours, the advanced panel); one panel of hairline rows "paper · Q · subject · topic · marks · type" with a state dot and difficulty glyph,
  expanding into cards. The practice queue label is now the active filters ("Computer Organization & Architecture · Cache memory", or "All PYQs").
  Pure helpers added to `GA.pyqLib`: `texPlain(tex)` (fractions with nested or brace-less arguments become `a/(b)`, spacing commands go), `plain(markdown)` and `snippet(q, n)`
  (row previews keep maths readable instead of dropping it; `tests/practice.test.js`).
* **Question page** `/q/:id`: set header (queue label or paper) with the topic's bank count, the card, and a side panel: time on this question (pauses, stops once checked),
  a palette of the set (all of it when ≤ 30, else blocks of 20 with ‹ ›; attempted / marked = bookmarked / current from the store), the marking note, lessons, related questions.
* **Runner** `/test/run/:id`: same layout. Calculator and Submit sit in the page header (a sticky clock bar replaces them at ≤ 980 px), the clock has **Pause** (hides the question,
  stops `elapsedMs` and per-question time; time already only counted while the page was open), palette states ans / na / nv / mk / am keep their classes, `body.in-exam` hides
  the phone tab bar. **Hub** `/test`: one coral CTA (Resume a live test, else the diagnostic for a new learner, else the mock), the mock blueprint, attempts with a sparkline,
  past papers. `?new=mock` starts a mock like the button (resumes a live test instead) and `?new=diagnostic` a diagnostic; both rewrite the URL to `#/test` first so Back does not
  start another. **Result**: score hero with a correct / wrong / skipped split and the trend of recent tests, a number strip, by subject, time bars, next steps, review rows.
* **Flashcards** `/flash`: number strip + coral "Review N due" (a first-run card for a profile with no reviews), decks with subject glyphs, the per-lesson table folded away.
  The session is a 3D flip card (front: prompt; back: prompt recap + answer, `#fa`), press-depth Again / Hard / Good / Easy buttons with the SRS preview intervals.
  **Notebook** `/notebook`: reason breakdown (`--viz-*` series colours), subjects (top 6, the rest folded), entries with reason toggles, a note, Retry / resolve / remove.

### Hubs: syllabus, subject pages, content map, labs, My progress, planner, settings

| file | what |
|---|---|
| `app/css/hubs.css` | the hub primitives every hub screen shares: `.hb-head` (title, one real-data `.hb-sub` line, `.hb-acts` with at most one `.pop`; top-level pages carry no eyebrow above the title, so every tab's title sits at the same height; `.hb-eb` remains for the subject and lab pages, where it names the subject), `.hb-card` (surface, radius 22, `--lift`; `.tight`, `.flush`), `.hb-stats`/`.hb-stat` number strip (wraps 3 + 2 / 2-up with hairlines below 1100 px), `.hb-sec`/`.hb-sh` section heads, `.hb-ic` icon tiles, `.hb-bar` (primary; `.anim` sweeps once), `.hb-seg` pills, `.hb-chip`, `.hb-heat`, `.hb-meta` (·-separated text), `.hb-st` state marks (done = check, started = ring), `.btn.hb-go` (two-line CTA: kicker + target). `--hb-lift` is a shadow-list-safe twin of `--lift` (`none` in dark breaks `box-shadow: a, var(--lift)`). Then My progress (`.pg-*`), planner (`.pl-*`), settings / about (`.st-*`, `.ab-*`) |
| `app/js/core/charts.js` | `GA.charts.subj(id, cls)` (alias `GA.subjIcon`): one 24 px stroke glyph per subject, the subject's identity next to its name everywhere in the hubs (no subject colours). `ring()` adds a round cap and `--rc` so `.hb .ring` sweeps in once; `radar()` dots use `--accent`. Tested in `tests/charts.test.js` |
| `app/js/views/syllabus.js` + `app/css/subject.css` | `/s/:subject`: hero card (glyph, name, official line, progress bar or most-asked-topic chip, the `.pop` start / continue CTA; a primary panel with marks per paper for every GATE year, PYQs, papers, CS share and rank), number strip, sticky pill nav, hooks as finding cards, topic map card (`GA.mapviz` mini), learning order as one card per topic, what GATE asks, PYQ timeline (columns replay when the measure changes), lab cards, prev / next cards. `/syllabus`: header with the `.pop` next lesson, number strip, what changed in 2027, sticky search + tier / status pills (selects on phones), 14 expandable subject cards (glyph, counts, marks-a-paper bar, a ring once there is progress) |
| `app/js/views/progress.js` | `/progress`: header line from real totals + `.pop` continue; four ring stat cards; subject mastery as ring tiles (strongest first); mock analytics; PYQ bank by year; fix these first; revision due; up next; a GATE Wrapped link once 3 days are active. Fresh profile: one start card (mascot, `.pop` diagnostic), where to start, what appears later |
| `app/js/views/plan.js` | `/plan`: header line (days left, phase, minutes planned), today's checklist with the first open task as `.pop`, a primary countdown card, the four phases (current outlined), weekly focus (glyph chips; rows become cards on phones) |
| `app/js/views/settings.js` | `/settings`: exam + goals, theme (auto / light / dark via `GA.ui.setTheme`), data (Export backup is the `.pop`), demo, shortcuts. `/about`: sources header line, method cards, the papers table with SHA-256 |

* Subject identity is glyph + name; hues survive only inside the content map's data (see below). Every number is computed as before (`GA.insights`, `GA.stats`, `GA.planner`).
* Motion: rings sweep and first-screen bars grow once on load; the hero year columns rise once; nothing else moves until the learner acts; all off under reduced motion.
* Phones: no horizontal scroll at 360 / 390 on any hub route (checked with `?probe=1`); the subject hero stacks (panel under the CTA), the in-page nav scrolls sideways.
* **Content map** (`views/map.js`, `map.css`, `core/mapviz.js`): `.hb-head` header, the lens switcher is a segmented tablist with a sliding primary marker (`1` `2` `3`, arrows, URL state as before),
  mapviz panels are solid cards. Series colours come only from `--viz-*`: `GA.mapviz.seriesOf(subjectId)` maps each subject to one of the eight tokens by family
  (maths f, GA c, DL + COA b, PDS + ALG a, TOC + CD h, OS e, DB g, CN d; `SERIES`, `SERIES_NAME`, tested in `tests/mapviz.test.js`), every node carries `--sc`, cells mix
  `--sc` into `--surface`, and a legend names the families. A treemap scoped to one subject (the subject page) stays neutral. The side panel carries the screen's one
  `.pop`: "Zoom into <biggest subject>" on the overview, "Start here / Continue: <lesson>" (two-line) on a subject or topic, "Open the lesson" on a sub-topic.
* **Labs** (`views/labs.js`, `labs.css` `.lb-*`): `/labs` has the header, a subject filter (`?subject=`), the solid cobalt featured card (D21) and subject sections in
  page order, most marks first, with no dense packing: each section spans two rows of `.lb-gs` (subgrid: heading row and card row), so sections sharing a row share card
  height. A card's numbers line is its last line, with record chips above it on desktop. The featured eyebrow comes from `lastLab(st, list)` → `{c, by}`: `time` (the lab
  record's `at`) gives 'Continue where you left off', `test` (the newest `lab:` challenge row) 'Your last lab challenge', `opened` 'Your most-opened lab'; a fresh profile
  gets the most-asked lab. `/lab/:id`: `GA.lab.mount` draws the lab, the view restyles the framework header (subject glyph, real-data meta line, 'Test yourself' = `.pop`)
  and appends "Built into these lessons" and the strict PYQ attribution. Lab stage: `.lab-view > .lab-html {min-width: 0}` for every lab, so wide drawings scroll inside
  their `.dg` box.

### Engagement: streak, XP, cards due, GATE Wrapped, mascot

| file | what |
|---|---|
| `app/js/core/engage.js` | `GA.engage`, pure and Node-tested. `compute(state, D, today)` -> `{streak, xp, due, level, fresh}`; `wrapped(state, D, {from, to, today})` -> recap numbers; `ranges(state, today)` (this week from Monday, this month, all time, the run-up to the last mock); `recap(state, D, today)` (the home card's default: this month, else all time, else `null`); `tick(store, today)`; `renderChips(el)` (browser only, memoised until the store changes) |
| `app/js/core/mascot.js` | `GA.mascot`: "Peak", an original summit-shaped character. `svg({size, gaze, mood, label})`, `say(el, text, opts)`, `shapes()` (the drawing as data), `draw(ctx, o)` (the same drawing on a canvas), `colors()` (resolved `--m-*` tokens) |
| `app/js/views/wrapped.js` | `/wrapped` (`?range=week|month|all|mock`, `&slide=n` opens one slide, paused). Pure models `_slides`, `_summary`, `_facts` are Node-tested |
| `app/css/engage.css` | mascot tokens `--m-*`, the nav chips `.eg-*`, the bubble `.ms-*`, Wrapped `.wr-*` |

* **Streak.** A day is active by `GA.stats.dayActive` (any answer, card or lesson, or 10 minutes). The run counts active days; an idle *today* never breaks it.
  One freeze is earned on every 7th active day of a run (hold at most 2). `tick()` runs once at boot (`actions.js` listens to the store's new `ready` event, so the shell
  does not call it; it also runs after an import and when a tab left open comes back on a new day): the missed days between the last active day and yesterday are
  frozen **only if the freezes held cover all of them**; a longer gap breaks the streak and the freezes are kept. Frozen days keep a run alive but do not lengthen it,
  and a frozen day counts only while a freeze is really held, so edited bookkeeping cannot invent streaks. Day maths uses UTC day numbers (tested in six time zones).
* **XP is derived, never stored**, each event once: lesson completed 50; practice/revision PYQ answer: first correct 10, later correct 3, wrong 1; answers inside a test
  earn nothing per answer because the finished test pays 100 + 1 per whole mark (tests with no answer earn nothing); card review 1 (max 60 a day); lab challenge solved 15.
  Levels every 500 XP.
* **Store v2** (`store.js`): `state.eng = {v: 1, frozen: [day keys]}` (the only engagement data stored) and `state.logArch`: when the attempt log outgrows `LOG_CAP`, the
  trimmed rows are folded per mode and key into `{n, upTo, m: {mode: {key: [answers, correct]}}}`, so XP and all-time Wrapped totals never shrink. v1 documents migrate on load and import.
* **Wrapped** shows only real numbers and only slides with data (days on a calendar, time with a per-day chart, PYQ answers as dots, subject accuracy bars, lessons grid,
  XP sources, the last mock against earlier tests, a summary). Auto-advance (6.5 s) has Pause; it pauses on hold and on a hidden tab, and never starts with reduced motion.
  Not enough data (two active days plus 10 answers, a lesson, 20 card reviews or a test) gives an honest empty state. *Save as image* paints the summary on a 1080 x 1350 canvas.
* **Demo** (`demo.js`): the last 16 days form a live streak with one missed day (9 days ago) covered by a freeze through the real `tick()`, plus lab challenges, so chips, XP and Wrapped all have data.

## 5. Question model

A record in `pyq/parsed/<paper>.json` (full schema in `pyq/TRANSCRIBE.md`):

```jsonc
{ "id": "cs-2019:CS13", "section": "CS", "no": 13, "marks": 1, "type": "MCQ",       // MCQ | MSQ | NAT
  "stem": "markdown with $maths$", "options": ["…", "…", "…", "…"],
  "figures": [{"file": "…png", "where": "stem", "alt": "…", "describe": "…"}],       // every figure has accessible text
  "group": {"kind": "common-data|linked|passage", "role": "first|second", "context": "…"},
  "answer": {"kind": "single|multi|range|oneof|mta", …}, "key_raw": "C",            // copied from the official key
  "transcription": {"status": "auto|verified|needs-review", "notes": "…"} }
```

Tags and solutions are editorial and live separately in `pyq/meta/<paper>.json` so a re-transcription never destroys them.
**Provenance is part of the data**: every paper carries its source URL, Wayback timestamp and the sha256 of the downloaded PDF (`pyq/sources/fetched.json`), shown in the
app under *About -> Sources*. Question text and keys are never invented; a question that could not be verified is flagged `needs-review` and says so in the UI.

## 6. Content model

* **Syllabus DSL** (`content/syllabus/syllabus.txt`): `@subject`, `## topic | name | syl=<official wording> | in|legacy|extra`, `- subtopic | name | tier`.
  Status flags keep the scope honest: `in` = named in the GATE 2027 syllabus, `legacy` = in earlier syllabi but examined historically, `extra` = never named but regularly asked.
* **Lessons**: Markdown with required sections, validated by `tools/buildlib/lessons.py` and `tools/lint_content.js`. Flashcards are extracted from the lesson's last section.
* **Labs**: a lab is a pure `compute(values) -> {frames, stats, table}` plus declarative controls; the framework draws controls, a player, and a "challenge" mode. See `docs/LAB_GUIDE.md`.
* **Diagrams**: JSON specs rendered to SVG by one kit, so lessons, solutions and labs look alike and respect light/dark themes. Gallery: `docs/diagram-gallery.html`.

## 7. Testing

| layer | command | what it covers |
|---|---|---|
| Unit (Node) | `node tests/run.js` | scoring rules, SRS scheduling, stats formulas, planner phases, test generation, the Markdown renderer, the diagram kit, each lab's algorithms against textbook and real GATE answers, content insights (every hook number and every hook link), the PYQ URL filters, the map model and layouts (`tests/mapviz.test.js`), the home page helpers and its links (`tests/home.test.js`), the shell's route / nav / Me menu / tab-bar / shortcut tables, the count-up formatter, the syllabus filter and subject-page model (`tests/syllabus.test.js`), streak / freeze / XP / Wrapped maths in six time zones (`tests/engage.test.js`), the lesson helpers (`tests/lesson.test.js`), the PYQ row previews (`tests/practice.test.js`), the subject glyphs and charts (`tests/charts.test.js`) |
| Tooling (Python) | `python3 -I -m unittest discover -s tests/py` | answer-key normal forms (single / multi / range / oneof / marks-to-all), blind-answer comparison used for the solution cross-check, tag validation |
| Content | `python3 build.py --check` | syllabus, lessons, PYQ references, math, diagrams |
| Data | `python3 -I tools/pyq/validate.py <paper> [--ship]` | every question: option count, key agreement, figure text, math balance |
| End to end | `python3 -I tools/smoke.py [demo]` | headless Chrome drives the real UI through `app/js/selftest.js` (every route, home and progress, practice, a full timed test, results, flashcards, labs, search, shortcuts, the Me menu, theme, the Wrapped empty state, the 404, persistence; every screen it opens must show at most one coral `.pop` CTA and no NaN / undefined) |
| Visual | `tools/shot.sh "/route" out.png [w] [h] [query]` | screenshots at any width / theme for review (widths below 500 are rendered in an iframe); add `probe=1` to the query to print any horizontal overflow on screen. Shell dev aid: `?open=me \| search (&q=…) \| keys \| toast` opens that UI after boot |

## 8. Extending

* **A lesson**: add `content/subjects/<subject>/<subtopic-id>.md` per `docs/CONTENT_GUIDE.md`, run `python3 build.py`.
* **A lab**: `docs/LAB_GUIDE.md`; register in `content/labs.json` with `tools/lab_status.py <id> ready` once tested.
* **A paper / the next year's paper**: `docs/PYQ_IMPORT.md`.
* **A subject or topic**: edit `syllabus.txt`; every id is validated everywhere it is used.

## 9. Known limitations

* Difficulty is an editorial estimate, not an official statistic (the About page says so).
* Multi-session years (2014-2017, 2021, 2024-2026) are separate papers with separate question sets. The few questions that GATE repeats between papers are kept as separate records (identical text is not merged).
* Progress lives in the browser profile; use *Settings -> Export* to back it up or move it. There is no sync service by design.

## 10. Audit implementation: interface contract

Written by WP0 (lead prep) on 2026-10-16, before wave 1. The owner approved the whole design audit, `_audit/PROPOSAL.md` (215 items, P0–P3), with the
rulings in `_audit/DECISIONS.md`; where the two differ, DECISIONS.md wins. The work runs as packages with disjoint file ownership (PROPOSAL.md §4):
wave 1 = WP1–WP13, with WP9 split into **WP9a** (`views/qcard.js`, `views.css`) and **WP9b** (`views/pyq.js`, `core/pyqlib.js`, `bank.css`);
wave 2 = WP14–WP16, and in wave 2 `index.html` and `app/js/shell.js` belong to WP16. This section is the contract between the packages: every
cross-package API with its signature, return shape and owner. It binds like FRONTEND_V3_SPEC.md.

**Rules for every package**
1. Code against this section, not against another package's current code. When an API you consume is not there yet, feature-detect it
   (`if (GA.fit && GA.fit.all) …`) and keep today's behaviour without it. Never define another package's API in your own file.
2. Owners implement these names and shapes exactly. Adding fields or options is fine; renaming, removing or changing a meaning goes through the lead
   (list it under contributions_needed in your result). Defaults are written `= x`.
3. Pure functions take `(state, D, …, today)` so Node tests can pin the date; browser conveniences read the live store (`GA.store.state`,
   `GA.data.D`, `U.today()`). Days are local `'YYYY-MM-DD'` keys, times are ms timestamps. `X` below means `D.exam` (§10.5), `I` means
   `GA.insights.get()` (or `GA.insights.build(D, stats)` in Node).
4. One coral (`.btn.pop`) per screen, including empty and done states (D18; only filter no-match states are exempt); real data only; copy per
   CONTENT_GUIDE §2b (D19). The bold-layer review rule and the hero-panel exception are in FRONTEND_V3_SPEC.md §1.
5. Packages land in any order, so a change to stored data or to a shared definition must keep old readers working until they have switched (the
   sequencing notes in §10.5 and §10.6 say how). A change that moves a number another package's test pins (due, completion, marks a paper) is
   reported for the lead, not fixed in the other package's test.

### 10.1 Wave-0 stubs and load order (WP0)

| file | owner | what it will hold | where it loads |
|---|---|---|---|
| `app/js/core/calc.js` | WP10 | `GA.calc`, the calculator's no-eval evaluator (P0-15); only the runner calls it, so WP10 chooses its API | `index.html`, after scoring.js |
| `app/js/core/fit.js` | WP8 | `GA.fit` (§10.9) | `index.html`, after md.js |
| `app/js/core/pyqlib.js` | WP9b | `GA.pyqLib`, moved out of views/pyq.js (§10.10) | `index.html`, after fit.js and above search.js, its first consumer |
| `app/css/bank.css` | WP9b | the bank's rules from views.css "== PYQ bank ==" and the phone filter sheet | right after views.css |
| `app/css/tests.css` | WP10 | views.css "== tests: hub ==", "== tests: runner (exam mode) ==", "== tests: result ==" | after bank.css |
| `app/css/retention.css` | WP11 | views.css "== flashcards ==" and "== notebook ==" (the flip fix, P0-25, moves first) | after tests.css |
| `app/css/content.css` | WP8 | lesson-content rendering shared by lessons, cards, solutions, labs and home widgets | after lesson.css, before labs.css |
| `app/js/views/revise.js` | WP15 (wave 2) | `GA.views.revise` (§10.12) | not linked: views load lazily from the shell's `FILE` table |
| `app/css/revise.css` | WP15 (wave 2) | the revision sheet and its print rules | after engage.css |
| `app/css/pwa.css` | WP16 (wave 2) | install and update rows, offline states | last |

The JS stubs register nothing on `GA` (Node `require()` returns an empty object), so every feature test is false and nothing changes until the
owner lands; the CSS stubs hold only a header comment; the revise stub is a valid view that no route reaches yet. The positions are chosen for the
cascade: a rule moved out of views.css into bank, tests or retention keeps its place relative to every other sheet; content.css follows the lesson
and card sheets whose older rules it replaces and precedes labs.css and the page sheets, which may specialise it; site.css stays after labs.css
(tests/shell.test.js). Whoever restructures `index.html` later (WP1 in wave 1, P2-78; WP16 in wave 2) keeps these relative orders.

### 10.2 Shell services (WP1)

* **Fresh view host** (P0-02): before each `enter(ctx, out)` the shell puts a new child element into `#view` (`replaceChildren`) and passes it as
  `out`, so listeners a view delegates on `out` die with the visit. A view never binds on `#view`, `document` or `window` without removing the listener
  in `leave()`. `#view` keeps `data-layout` (`GA.shell.layout`).
* `GA.ui.say(text, level = 'polite')`: announces through one persistent pair of live regions (`'polite'` | `'assertive'`); toasts, route changes
  and changed counts all use it (P1-48). Returns nothing.
* `GA.ui.overlay.push({id, close})` → id, `GA.ui.overlay.pop(id?)`, `GA.ui.overlay.top()` → id | null (P1-47): one stack for the Me sheet, the
  palette, `GA.ui.modal` / `confirm` and the bank's phone filter sheet. `push` adds a history entry; Back closes only the top overlay, by calling its
  `close()` (which removes the overlay and touches nothing else); `pop()` closes the top overlay from code and consumes its history entry; `pop(id)`
  does so only when `id` is on top. Links inside an overlay navigate with `location.replace`.
* `GA.ui.touch`: a boolean getter, true on touch-first devices (`(hover: none) and (pointer: coarse)`); read it at render time for 'Tap …' copy and
  to hide key hints (P3-40).
* `GA.ui.roving(group, {items = '[role="radio"], button', orientation = 'horizontal'})` → `destroy()`: one tab stop for a radio-like group;
  arrows, Home and End move focus and selection (P3-15).
* `GA.ui.loadFailed(el, {what, retry})` → `el` (P1-59): replaces el's content with a failure card built on `UI.empty`. `what` (`'lesson'` |
  `'question'` | `'solution'` | `'paper'` | `'cards'` | `'search'` | `'lab'` | `'test'` | `'view'`) picks the title, one line comes from
  `navigator.onLine`, and 'Try again' runs `retry` (default `GA.router.resolve()`). The 'run build.py' wording appears only when `location.protocol` is `file:`.
* `UI.empty(icon, title, text, actions, {peak, say})`: today's builder (it returns an HTML string) plus an optional fifth argument:
  `peak: true | {gaze, mood}` puts Peak (64 px) above the title and `say` gives him a one-line bubble. Peak only on not-found and true empty or finished
  states (P2-70); filter no-match states and load errors keep the plain icon.
* **Info tip** (P1-55): the one touch-safe tip is GA.reveal's floating `[data-ftip]`. A trigger is a `<button type="button">` with
  `data-ftip="<text>"` and a visually hidden copy of the text; hover and focus show it, a tap toggles it until an outside tap, a scroll or Esc, and
  while it shows the trigger has `aria-describedby`. Hit area at least 24 px (44 px on coarse pointers). `[data-tip]` stays only as the desktop label
  of icon buttons that already have an `aria-label`.
* `GA.shell.notFound({kind, id, back: {href, label}})` (P3-31): renders the shared not-found card into the current view host (title 'Not found ·
  GATE Ascent', Peak, `back` as the coral). Views call it for unknown ids instead of drawing their own. A `back.href` to a tab's first screen is
  always labelled 'Go to <tab>' with the tab's icon; other hrefs keep the caller's label. The router gives a URIError thrown by a view's `enter()`
  (an id that decodes once more, '#/q/50%25') this card too, never the error card (P3-36). `?selftest=1` without `&profile=` runs in the throw-away
  'selftest' profile (`GA.shell.profileOf`), and the self-test refuses to run in 'main'.
* `GA.shell.has(path)` → boolean: true when a route matches `path`. Wave-1 owners use it to prepare links to wave-2 screens
  (`GA.shell.has('/rev/os')`); the links then appear by themselves once WP16 adds the route.
* `GA.ui.str` (P2-28, P2-66): the shared wording table for statuses, answers and toasts, for example `GA.ui.str.ourEstimate` ('our estimate'),
  `GA.ui.str.legacy` ('legacy · not in the 2027 syllabus'), `GA.ui.str.noKey` ('No official key') and the tier labels `GA.ui.str.tier` =
  `{core: 'Core', standard: 'Extended', advanced: 'Advanced'}` (D14: the label changes, the data keeps 'standard'). Until it exists, keep your current
  string.
* `GA.ui.report({kind, id})` (P3-48, D16): opens the copy-only 'Report a problem' sheet (the id, its paper or lesson, the build date `D.built`, the
  learner's words, a Copy button; no network, nothing stored). The question card (WP9a) and the lesson page (WP7) call it.
* `GA.ui.toast(msg, kind, {peak})`: today's toast; `{peak: true}` adds the 28 px Peak head of a milestone toast (P2-38: at most one per session; WP2
  decides when).
* `GA.ui.singleKeys()` → boolean (P3-17): false when the learner turned single-key shortcuts off in Settings (WP6 writes `profile.keys = false`
  with `setProfile`). `GA.ui.key` and every view's own key handler then skip single-key shortcuts; Mod+K and Escape always work.
* CSS tokens (WP1, base.css / shell.css): `--bar-h` = the top bar's own height (68 px; 58 px at ≤ 700 px); `--topbar` = `--nav-h` = the room the
  sticky bar takes (that height plus `env(safe-area-inset-top)`; 0 under `max-height: 500px` landscape, where the bar scrolls away), for every sticky
  top and `scroll-padding-top` (P2-55). Both are registered `<length>`s, so `getPropertyValue` returns px. `--tabbar` (exists) for fixed or sticky bottom UI.
* Router (P1-01, P1-48): Back and Forward restore the scroll position of their history entry; new navigations start at the top; an anchor
  (`#/l/<id>#<heading>`) wins. After a navigation that started inside `#view`, focus goes to the new view's `[data-focus]` element, else its h1;
  views mark a better target with `data-focus`. `GA.router.resolve()` stays the retry.

### 10.3 Learning model (WP4): hasProgress, the one order, routes, nextStep

* `GA.stats.hasProgress(state)` → boolean (P0-22). True when the learner did something on purpose: a live test, any lesson record, any question
  record (an answer, a 'seen' check, a bookmark or a note), a finished test, any card record or any lab record. Time on a page alone (`state.act`) never
  counts. It is the one predicate for stats, rings, KPI tiles and empty states (Home, My progress, Flashcards) and replaces the views' own versions.
  Home's first-run hero is a next-step rule instead: it shows while `nextStep(...).rule === 'start'` and no test is live or finished.
* `I.order(subject)` → lesson ids: the one learning order (P1-02). In-subject prerequisites first, syllabus order otherwise, and the lessons outside
  the 2027 syllabus text (status `legacy` or `extra`) last, as one group (P2-08). The subject page, the map's panels, nextStep, the lesson footer, the
  planner's learn rows and new flashcards all use it. `I.order(null)` covers every lesson.
* `I.subjects[i].perPaper` and `I.subject(id).perPaper` (P1-03): the like-for-like marks a paper: the subject's share of each paper's technical
  marks, in-syllabus questions only, averaged over the papers that had its section, × 85 (GA stays 15). The hero sentence, the bento, the syllabus
  bars, the subject hero, the mock blueprint, the planner and nextStep's ranking use it; `marksPerPaper` stays the raw average for old callers, and
  the year timeline and the exam map keep raw marks.
* `I.labCards()` (P1-37): `pyqs`, `marks` and `papers` become the strict attribution (the sub-topics of the lessons that embed the lab, within its
  topics), and each card gains `subs` (those sub-topic ids) for the link `#/pyq?sub=<a,b>`; the bank's `topic` and `sub` filters accept comma lists
  (WP9b). Labs (WP12), subject cards (WP5) and Home (WP3) print that one number.
* `state.profile.route` = a path id from `I.paths()` / `I.path(id)` (`'zero'`, `'crash'`, `'last30'`, `'rescue:<subject>'`, the fast tracks) or
  null (P1-06). Set with `GA.actions.setProfile({route})` from the Learn tab's Routes row or the planner's setup card; 'Change' sets null. It is the only
  place a chosen route is stored, so path ids stay stable when routes are renamed ('Fast track: <subject>', P1-52).
* `state.profile.focus` = the current subject id or null (P0-08 rule 4). Written only by the lesson view (WP7), with
  `GA.actions.setProfile({focus: lesson.subject})`, when the lesson URL carries `focus=1` or `path=<route>`. Links that carry `focus=1`: the subject
  page's lesson rows and hero (WP5) and every coral built from `nextStep` with scope `'all'` or `'subject:…'` (its `href` already includes it). Search
  results, in-text links and the lesson footer do not, so a peek never moves the current subject.

**`GA.stats.nextStep(state, D, {kind = 'any', scope = 'all', today = U.today(), I, route})`** → step | null (P0-08, P1-61, P2-72, D1, D20).
`route` is only for scope `'after:…'` (the URL's `path`, which wins over `profile.route` there).

```
step = {
  kind:    'test' | 'lesson' | 'retry' | 'cards' | 'warmup' | 'mock' | 'season' | 'date',
  rule:    'live' | 'continue' | 'route' | 'subject' | 'start' | 'final' | 'eve' | 'day' | 'done' | 'end',
  label:   'Resume test' | 'Continue' | 'Next up' | 'Start here' | 'Revise' | 'Retry' | 'Review' | 'Quick 20' | 'Warm up'
           | 'Take a full mock' | 'See your season' | 'Set my next exam date',     // the kicker: first line of a two-line coral
  title:   string,          // what it opens: the lesson or test title, '5 missed questions', '12 due cards', 'GATE 2027, wrapped'
  id:      string | null,   // the lesson id of a lesson step, the live test id of 'test', else null
  subject: string | null,   // the subject id of a lesson step (kickers print U.medName of its name: 'Start here · Programming & DS')
  minutes: number | null,   // the lesson's minutes or the session's estimate
  reason:  string,          // one real reason from data: '7 PYQs in 6 of 30 papers', 'after Pointers and pointer arithmetic', '3 of 10 answered · 18:20 left'
  href:    string,          // a link from §10.4; a lesson step is '#/l/<id>' + '?focus=1' (not for scope 'after:…') + '#<heading>' when a position is saved
  season:  string           // GA.stats.season(state, D.exam, today), echoed for consumers and tests
}
```

Precedence for `scope: 'all'` (the shared next step):
1. kind `'any'` only: a live test (`state.live` with an id) → 'Resume test' (rule `'live'`, href `#/test/run/<id>`), in every season.
2. The season (§10.5):
   * `'day'` (exam day; only for a learner-set or official CS date), kind `'any'` → 'Warm up' · '10 cards you know' (`#/flash/all?mode=warm`)
     when any card has been reviewed, else the 10-question warm-up (`#/test?new=warmup`).
   * `'eve'` (the day before; same condition), kind `'any'` → 'Quick 20' · 'your shakiest due cards' (`#/flash/all?mode=quick`) when a card is due
     or has been reviewed, else 'Retry' when notebook misses are due, else the 10-question warm-up.
   * `'final'` (2–14 days left, and 0–1 days left with an assumed date), both kinds; the step never names an unopened lesson:
     (a) 'Continue' as in rule 3a → (b) 'Revise' the first lesson due for a re-read (`GA.stats.due(...).lessons[0]`) → kind `'any'` only:
     (c) 'Retry' · min(5, due) missed questions (`#/notebook?retry=5`) → (d) 'Review' · N due cards (`#/flash/all`) → (e) 'Quick 20' · 'cards you
     know least' when any card has been reviewed → (f) 'Take a full mock' (`#/test?new=mock`). Kind `'lesson'` after (b): 'Revise' the finished lesson
     that comes due soonest; with no finished lesson at all it falls through to rule 3, because a lesson consumer always names a lesson (the planner
     carries the 'no new topics' advice).
   * `'eve'` and `'day'` with kind `'lesson'`: the `'final'` chain.
   * `'done'` (after the exam), kind `'any'` → 'See your season' (href `GA.engage.recap().href`, the season range) once recap() is ready, else
     'Set my next exam date' (`#/plan?set=exam`); kind `'lesson'` → rule 3.
   * `'normal'` and `'between'` → rule 3.
3. The normal rules:
   * (a) **Continue** (rule `'continue'`): the newest real lesson record, if it is unfinished. A record is real when it is done, has `secs >= 120`,
     has a self-check answered (`quiz`) or has a saved position (`at`); anything else is a peek and is skipped. Only the newest real record counts:
     when it is done, go on.
   * (b) **Route** (rule `'route'`): with `profile.route` set, the route's first not-done lesson in the route's own order (marks-ranked routes may
     start with GA, because the learner chose them) → 'Next up', reason 'On route: Crash course · 12 of 91'. A finished route falls through.
   * (c) **Current subject** (rule `'subject'`): `profile.focus`, else the subject of the newest real record → its first not-done lesson with status
     `in`, in `I.order(subject)` → 'Next up'. A finished subject hands over to the next unfinished subject in rule (d)'s ranking, with a computed
     reason ('Operating Systems done · next: Databases').
   * (d) **Start here** (rule `'start'`): nothing started → `I.order(top)[0]`, where top is the CS-section subject with the most marks a paper by the
     like-for-like metric (P1-03): Programming & DS today (`pds.c.basics`), never GA (D1). Rule (c)'s hand-over uses the same ranking.
   * (e) every in-syllabus lesson done (rule `'end'`): kind `'any'` → 'Take a full mock'; kind `'lesson'` → null (consumers then show 'Take a full
     mock', P2-71).
4. Never an input: PYQ answers, card reviews, labs, peeks, the diagnostic (P1-56), time on a page. Prerequisites are soft: no readiness filter (the
   'prerequisites done' filter of nextLessons goes), while the lesson's 'Builds on' chips stay.

Other scopes are in-content navigation (no live test, no route unless stated, no season):
* `'subject:<id>'` (the subject hero and list badge, the map's subject and topic panels; WP5): rule 3a within that subject, then that subject's first
  not-done lesson with status `in` in `I.order(id)`; null when the subject is finished (the page then shows its done state with the coral 'Practise
  <Subject> PYQs', like P1-08's end card).
* `'after:<lessonId>'` (the lesson footer, WP7; P1-02, P1-08): on the active route (`route`, else `profile.route`) when it contains the lesson, the
  route's next not-done lesson after it; else the next not-done lesson after it in `I.order(<its subject>)`. At the subject's end → null, and the
  footer shows P1-08's 'End of <Subject>' card with the coral 'Practise <Subject> PYQs'. The quiet plain-successor link ('Next in order: … · ✓ done')
  is WP7's. No `focus=1`.

`GA.stats.nextLesson(state, D, {scope, today, I, route})` = `nextStep(state, D, {kind: 'lesson', scope, today, I, route})`.
`GA.stats.nextLessons()` stays for old callers, but no screen names a next step from it any more.

Consumers. Kind `'any'`: the Home hero in every season (WP3; P1-61's 'plan's first open task' is the same thing because WP6 orders the final-season
rows by this chain, §10.8), the /progress header and start card (WP6), palette row 1 (WP1, P2-46). Kind `'lesson'`: the /syllabus header (WP5), the
/map overview and panels (WP5), the subject hero and list badge (WP5, `subject:`), the lesson footer (WP7, `after:`), /plan's learn rows (WP6) and the
diagnostic result (WP10, with Home's label; P1-56). The map's 'Zoom into …' is a plain button that skips GA, not a next step.

The 12 learner states (WP4). `tests/next-states.js` (WP4; not a `.test.js` file, so `tests/run.js` does not run it on its own) exports
`states(D, I, today)` → `[{name, state, today}]`; `tests/next.test.js` (WP4) checks nextStep against the table below, and each consumer adds its
agreement check to its own test file, so no package waits for another: `GA.homeLib.heroModel` (WP3, tests/home.test.js), the planner's first learn
row (WP6, tests/planner.test.js) and palette row 1 (WP1). `?selftest=1` (WP1) asserts that the global corals' hrefs match. Ids are today's content:

| # | state | kind 'any' | kind 'lesson' |
|---|---|---|---|
| 1 | fresh | Start here · `pds.c.basics` | same |
| 2 | one PYQ answered | Start here · `pds.c.basics` | same |
| 3 | first lesson done (`pds.c.basics`) | Next up · `pds.c.control` | same |
| 4 | mid-subject: PDS steps 1–6 done, `pds.c.mem` open | Continue · `pds.c.mem` | same |
| 5 | state 4 plus a 2-second peek at a CN lesson | Continue · `pds.c.mem` | same |
| 6 | route `crash` chosen, its first 2 lessons done | Next up · `ga.verbal.vocab` (the route's next) | same |
| 7 | a live diagnostic, 3 of 10 answered | Resume test | Start here · `pds.c.basics` |
| 8 | state 4 plus 12 cards due | Continue · `pds.c.mem` | same |
| 9 | state 4 plus 6 notebook misses due | Continue · `pds.c.mem` | same |
| 10 | 10 days to a learner-set date, `pds.c.mem` open | Continue · `pds.c.mem` | same |
| 11 | 10 days to a learner-set date, nothing open, a lesson due for a re-read | Revise · that lesson | same |
| 12 | the demo profile | Continue · its newest real unfinished lesson | same |

* `GA.stats.due(state, D, today)` keeps its shape `{cards, cardIds, newCards, questions, lessons}` with one definition of a due card (P2-74): seen
  (`s.last`) and `s.due <= today`, so lapsed 'Again' cards count. `questions` counts unresolved notebook entries only (P2-41). The chips, the Me
  badges, the planner, /flash and the home strip all read it.

### 10.4 Session links

Every coral, planner row and next step links to one of these, so a row opens its exact session (P2-68). A handler that acts on a query
(`mode`, `retry`, `new`, `set`, `practise`) replaces the URL after acting, so Back does not repeat it.

| href | opens | owner |
|---|---|---|
| `#/l/<id>` (+ `?focus=1`, `?path=<route>`, `#<heading>`) | a lesson; `focus=1` sets the current subject; `#<heading>` resumes at a saved section | WP7 |
| `#/flash/all` | 'Review N due': due cards only, with minutes (P1-41) | WP11 |
| `#/flash/<deck>` | one deck (a subject, a topic or a lesson id; P0-07): its due cards, then its new cards within the daily new-card cap | WP11 |
| `#/flash/<deck>?mode=new` | 'Learn 10 new from your lessons', drawn from finished, then opened, then the next planned lessons in learning order, within the daily new-card cap (`profile.goals.cards`, labelled 'New flashcards a day'; P1-41, P2-40, D8) | WP11 |
| `#/flash/all?mode=quick` | 'Quick 20': cards you know least (final 14 days) or your shakiest due cards (the eve) | WP11 |
| `#/flash/all?mode=warm` | 'Warm up: 10 cards you know' (exam day) | WP11 |
| `#/notebook?retry=5` | a queue of the 5 most urgent due misses (the planner's constant, P1-43) | WP11 |
| `#/pyq?<filters>&practise=10` | 'Practise 10' on that filter (unseen first, then missed; the bank's coral), opening its first question | WP9b |
| `#/test?new=mock` · `?new=diagnostic` · `?new=warmup` | a mock (or resume the live one), the diagnostic, the 10-question warm-up; each behind P0-03's guard | WP10 |
| `#/test/run/<id>` | resume the live test | WP10 |
| `#/plan?set=exam` | the exam date and daily time sheet (P1-46); every 'Set it' and 'Change the exam date' links here | WP6 |
| `#/wrapped?range=<key>` | GATE Wrapped (`GA.engage.recap().href`) | WP2 |
| `#/rev/<subject>` | the revision sheet (wave 2) | WP15 (route: WP16) |

### 10.5 Exam date, season, countdown and the review cap (WP4; data WP13; store and formatter WP2; SRS WP11)

**Cycle data** (WP13): `content/exam.json` → `manifest.exam = {cycles: [cycle, …]}`, sorted by first day; `build.py --check` rejects non-ISO or
unsorted dates and warns when the newest cycle has ended. `data.js` (WP4) exposes it as `D.exam` (undefined on an older manifest).

```
cycle = { id: 'gate-2027', label: 'GATE 2027', organiser: 'IIT Madras',
          days:    ['2027-02-06', '2027-02-07', '2027-02-13', '2027-02-14', '2027-02-20', '2027-02-21'],   // every exam day, sorted
          papers:  { CS: [] },        // the official CS paper day(s) once published; empty until then
          result:  '2027-03-19',      // results day, or null
          source:  'https://gate2027.iitm.ac.in/important_dates', checked: '2026-10-16',
          note:    'All dates are liable to change' }
```

**Fallback** (WP4): until WP13 lands, or whenever `X` has no cycles, `GA.stats.exam` uses exactly that cycle (GATE 2027, organised by IIT Madras:
exam days 6–7, 13–14 and 20–21 Feb 2027; results 19 Mar 2027; the CS paper date not yet published), exported as `GA.stats.EXAM_FALLBACK = {cycles: [cycle]}`.

**Store fields** (WP2, migration v3): `profile.examDate` = `'YYYY-MM-DD'` | null, and `profile.examSet` = true only when the learner chose the date
(the date sheet, Settings, the planner's setup card or the one-tap confirm). The untouched default (`examDate === '2027-02-06'` on a profile that never
changed it) counts as unset. `GA.actions.setProfile({examDate})` with a date also sets `examSet: true` (choosing a date is setting it);
`{examDate: null}` clears both. Every reader moves to `GA.stats.exam`: stats.js, planner.js, actions.js, engage.js, flash.js, progress.js, plan.js,
settings.js, home.js and selftest.js; Settings' exam-day chips come from `cycle.days`, and content-scope strings such as 'GATE 2027 syllabus' stay.
*Sequencing* (rule 5): `exam()` reads `set` as `examSet === true`, or, on a profile not yet migrated (`examSet` undefined), any `examDate` other than
`'2027-02-06'`. v3 adds `examSet` (true for any other stored date, false for the untouched default) but keeps the stored string, and `blank()` keeps the legacy `'2027-02-06'` with
`examSet: false`, until no file outside store.js reads `profile.examDate` directly; then unset profiles store `examDate: null` (the last WP2 change of
wave 1b, checked with a grep). New readers never see the difference.

**`GA.stats.exam(state, X, today)`** →

```
{ date:     'YYYY-MM-DD' | null,       // the exam day the app counts to
  set:      boolean,                   // profile.examSet
  basis:    'yours' | 'official CS day' | 'assumed' | null,
  label:    string,                    // cycle.label; else 'GATE ' + year for a Jan–Mar date; else 'your exam'
  cycle:    cycle | null,              // the cycle the date belongs to
  daysLeft: integer | null,            // U.daysBetween(today, date): 0 on the day, negative after it, null without a date
  last:     { date, label, cycle, daysAgo } | null   // the most recent exam day already behind the learner ('done', Wrapped's season range)
}
```
* Learner-set (`examSet` and a date): that date, basis `'yours'`, also after it has passed (`daysLeft < 0`); `cycle` = the cycle whose days contain it,
  else the cycle of the same year, else null.
* Unset: the first cycle with a day on or after today. When `papers.CS` lists exactly one day on or after today: that day, basis `'official CS day'`;
  otherwise the earliest remaining exam day (CS days first once published), basis `'assumed'`. Inside the exam window this rolls forward to the next
  remaining day, which is when 'Which day is your paper?' offers the remaining days.
* No upcoming cycle and no learner date: `date`, `basis` and `daysLeft` are null and `label` names the next exam (`'GATE ' + (newest cycle's year + 1)`),
  for 'GATE 2028 dates are not out yet. Pick a target date and change it when the organising institute announces them.'
* `last`: a learner-set date that has passed, else the last day of the newest cycle that ended before today; null when there is none.

**`GA.stats.season(state, X, today)`** → `'normal'` | `'final'` | `'eve'` | `'day'` | `'done'` | `'between'`:
* An exam ahead (`daysLeft >= 0`): `'day'` when `daysLeft` is 0 and the basis is `'yours'` or `'official CS day'`; `'eve'` when it is 1 with the same
  basis; `'final'` when it is 14 or less (this includes 0 and 1 days with an assumed date: those learners see 'GATE 2027 starts tomorrow. Is your paper
  tomorrow? Set your date'); otherwise `'normal'`.
* No exam ahead: `'done'` when `last.daysAgo` is 1–30 and the learner set a date or `hasProgress(state)`; otherwise `'between'` (no countdown, no cap).
  A new future date ends 'done' at once.
* The season recipes (P1-61, P2-72, D20) are the consumers': the shared step in §10.3, the day in §10.8, and /flash, /test and Home per the page plans,
  one coral per screen in every season. The streak bridge (P2-73, WP2) exempts the exam day and the day after only for basis `'yours'` or
  `'official CS day'`, never an assumed date.

**The one phase function** (P0-20): `GA.stats.phaseOf(daysLeft)` (WP4) → `'learn'` (more than 100 days) | `'practice'` (46–100) | `'mocks'` (15–45)
| `'final'` (0–14) | null (no exam ahead), half-open ranges, shared by the plan header, the road, the weekly table and the checklist (WP6).
`GA.stats.countdown(state, today, X)` keeps its shape `{days, weeks, phase, date}` (plus `basis`, `label`), computed from `exam()` and `phaseOf()`;
`days` and `date` are null when there is no date.

**`U.untilExam(E)`** (WP2, util.js; P1-46) → 'GATE 2027 is today' | 'GATE 2027 is tomorrow' | '12 days to GATE 2027' | 'GATE 2027 was on 6 Feb' | ''
(no date), where `E` is an `exam()` result. Callers append the assumed note ('first exam day, assumed · Set it', linking `#/plan?set=exam`).
`U.plural(n, word, plural?)` already exists: use it for '1 mark' and every count.

**`SRS.capFor(daysLeft)`** (WP11, srs.js; P0-26) → integer days | null: null when `daysLeft` is null or 1 or less (no exam ahead, the eve, exam day and
after: reviews then follow natural spacing, on purpose); otherwise `Math.max(1, Math.floor(daysLeft / 2))`. `daysLeft` is
`GA.stats.exam(state, D.exam, today).daysLeft`. It is the one cap for card reviews (`GA.actions.reviewCard`), PYQ retries (`GA.actions.attempt`) and
the flash previews, so a button's label is the stored interval by construction.
* `SRS.review(c, grade, today, {cap})` → `{due, ivl, ease, reps, lapses, last}`: `ivl` is the earned SM-2 interval and the cap never overwrites it;
  `due = U.addDays(today, cap == null ? ivl : Math.min(ivl, cap))` (Again: today). An early review grows from the elapsed days but never below the
  earned interval. `isMature`, `strength` and the 'mature' tile read the earned `ivl`.
* `SRS.preview(c, today, {cap})` → the four day gaps `[again, hard, good, easy]`, each equal to `U.daysBetween(today, review(c, g, today, {cap}).due)`.
* Transition: until actions.js (WP2) passes `{cap}`, srs.js keeps accepting the old `{maxIvl}` as a cap on the due date (not on `ivl`). The 7-day floor
  and the '2027-02-06' fallback in actions.js and flash.js go. actions.js loads before stats.js, so it reads `GA.stats` and `GA.data.D` at call time.
  P0-26 ships before 1 Feb 2027.

### 10.6 Store and actions (WP2)

**Store** (`GA.store`, store.js):
* `VERSION` 3. The v3 migration runs on load and on import: it removes `cards['undefined']` and any card key that is not a card id, keeps the first of
  any duplicate test id, joins notes once, on the upgrade to v3 (`nb[id].note` into `q[id].note`, different texts joined by a blank line;
  `nb[id].note` is left as a copy until the notebook, WP11, reads `q[id].note`, then deleted), adds `profile.examSet` and treats the untouched default exam date as unset (§10.5, with its
  sequencing), adds `profile.route`, `profile.focus` and `profile.lastExport` (null), and moves
  `state.cards[old]` to `state.cards[new]` once per manifest card-id alias (`manifest.cardAliases`, P3-51). sanitize() checks per-field types (P1-51):
  `q`, `nb`, `lessons`, `cards`, `labs`, `act`, `seen` and `profile` are objects, `log` and `tests` arrays, `live` and `plan` an object or null;
  malformed entries are dropped after the raw text is saved as one rotating `:corrupt-` copy.
* Saving (P0-12): a failed write is reported, never swallowed. A failed flush emits `'error'` (with the Error) and sets `GA.store.saveError`; the next
  successful flush clears it and emits `'saved'`. WP1 draws the one persistent banner from these events; WP6's Settings shows the usage.
* `GA.store.usage()` → `{chars, keys: [{key, chars, kind: 'state' | 'before-import' | 'corrupt' | 'other'}]}` for this app's keys, measured from string
  lengths (never `navigator.storage.estimate()`); `GA.store.dropKeys(keys)` deletes spare keys ('Free space'), never the live profile key.
* `GA.store.rawText()` → the stored JSON text of this profile, even when it could not be parsed ('Download my saved data' on the boot recovery card and
  the router's error card, P1-51).
* `GA.store.lastImport()` → `{key, at}` | null (a kept ':before-import' copy younger than 7 days), `GA.store.undoImport()` swaps it back and reloads
  (P2-75: Settings and the router's error card). `importJSON(text)` validates before replacing anything and throws
  `Error('This file is not a GATE Ascent backup')`; Settings toasts only after the re-rendered view resolves.
* The shell subscribes to `'corrupt'` before `GA.store.init()` (P1-51).
* `GA.store.persist()` → Promise of true | false | null (P2-49): on http(s), `navigator.storage.persist()` where the browser decides silently; null on
  `file:` or when unknown. `GA.store.persisted` holds the last answer for Settings' 'On this phone' line.

**Actions** (`GA.actions`, actions.js, the only writers of state):
* `setLessonAt(id, h)` → `state.lessons[id].at = {h, t: Date.now()}` (P1-01), with `h` the current section's heading id. The lesson view (WP7) calls
  it only once the visit has moved off the heading it landed on (the top; Back's restored place or a `#heading` count as landing), never for the first
  section, never for the heading already saved, never in the first 20 s (`GA.lessonLib.readAt`), so a peek saves no position (nextStep counts a saved
  position as real reading). Home's Resume and nextStep's Continue open `#/l/<id>#<h>`.
* `setNote(qid, text)` → the one note store `state.q[qid].note`; empty or blank text deletes it (P1-27). The card (WP9a), the notebook (WP11) and the
  bank's 'Has my note' filter read only `q[id].note`; `notebookSet` no longer takes `note`.
* `setSeen(qid)` → `state.q[qid].seen = Date.now()` (D9, P1-23): a checked answer that cannot be graded (no official key: the 2007–2010 papers, and any
  question the key leaves ungraded). It never touches `n`, `ok`, `lastOk`, `firstOk`, `srs`, the notebook, `act` or XP. The palette, set counts and the
  bank dot read `e.n || e.seen` as 'seen'; accuracy, mastery and the due lists ignore it.
* `setFlag(key, value = Date.now())` → `state.seen[key] = value`: one-off UI flags (P2-38's once-per-boot milestone toasts, dismissed cards). This is
  the old `setSeen(k, v)`, which had no callers.
* `lastExport(when = Date.now())` → `state.profile.lastExport = when` (P2-49): Settings' Export (WP6) calls it once the download or share has resolved.
  Readers use `state.profile.lastExport` (null = never) for 'Last backup: never / 12 Oct' and the Me header's backup line.
* `setPlan(snapshot)` → `state.plan = snapshot`, the planner's day (§10.8; P0-19).
* `setProfile(patch)` (exists) is also the writer of `route`, `focus`, `examDate` and `examSet`.
* `attempt()` and `reviewCard()` pass `{cap: SRS.capFor(daysLeft)}` (§10.5). `finishTest()` ignores a test id already stored and `reviewCard()`
  ignores an unknown card id (P0-02).

### 10.7 Engagement (WP2)

* `GA.engage.recap(state?, D?, today?)` → `{range: {key, from, to, label}, href, w}` | null: the single Wrapped gate (P2-36). With no arguments it
  reads the live store (memoised like `current()`). Every Wrapped link and card (Home, /progress, the XP tip, the result page) renders only when it is
  non-null. In the `'done'` season its range is the season (`key: 'season'`: first active day → exam day; preselected from exam day to 30 days after,
  P2-72), and `GA.engage.ranges()` lists it.
* `GA.engage.current()` → `compute()` of the live store, memoised (exists): `{streak, xp, due, level, fresh}`. It feeds the chips and the Me sheet's
  header ('Level 7 · 148 XP to level 8', the streak and freezes, only for profiles with XP; P2-38).
* `GA.engage.xpFor(state, kind, id, ok)` → integer, the one source for inline XP lines (P2-38). For `'pyq'` (id = question id; ok = correct),
  `'lesson'` (completing it), `'card'` and `'lab'` (a solved challenge) it is the XP that recording the event now would add, so call it with the
  state before the action is recorded; for `'test'` (id = a stored test id) it is the XP the ledger credits that test. Caps and eligibility follow D8
  option 2: lab XP only without Peek and at most 10 solves a day; test XP only with at least one graded answer and 10 % answered; cards at most 60 a day.
  The approved XP table is unchanged. UI rule: show it only on success ('Correct · +1 mark · +10 XP', 'Correct again · +3 XP', 'Understood · +50 XP',
  '+N XP' on the flash finish and the result chip, 'Solved · +15 XP' in labs), never in the runner and never on a wrong answer.

### 10.8 The planner's day (WP6)

* **`GA.planner.day(state, D, today)`** → the day's snapshot (P0-19), pure:

```
{ day, examDate, minutes,          // the snapshot's key: rebuilt only when one of these changes
  season,                          // GA.stats.season(state, D.exam, today)
  tasks: [{ id, kind: 'revise' | 'learn' | 'practice' | 'mock' | 'warmup', title, minutes, href, done, progress: 'k/n' | null, why }],
  notes: [string],                 // lines that are not tasks (the eve's 'Before you sleep: admit card printed, …')
  left,                            // open tasks: the Me menu's neutral 'N left' badge (P3-29); 0 hides it
  next,                            // the first open task or null: the plan's coral, and the flash and notebook finish corals (P2-68)
  done,                            // every task done: Peak, "Today's plan: done" and the coral 'Add one more task' (D18)
  fresh }                          // true when built now rather than read from state.plan
```
  It reuses `state.plan` when `day`, `examDate` and `minutes` match and re-judges each row's `done` from state (the lesson finished today, cards
  reviewed with none due, N retries today, N answers in that subject today, a mock finished today); otherwise it builds a new list (`fresh: true`).
* **`GA.planner.current()`** (browser) → `day()` for the live store, memoised per store change; when the result is fresh it persists it with
  `GA.actions.setPlan()` so the list stays fixed for the day. The Me badge (WP1), the flash and notebook finish cards (WP11) and the /plan view use
  this one.
* Rows: revision first; learn rows = `nextStep(kind 'lesson')`, then the current subject's next lessons in `I.order` (none in the final season, on
  the eve or on exam day); in the Learn phase the first practice row is the planned lesson's sub-topic PYQs, then the week's focus; every row links its
  exact session (§10.4). In the final season the day starts with nextStep's chain in the same order (Finish the started lesson, Revise the due re-read,
  Retry 5 missed, Review N cards, Quick 20, else a full mock), so `current().next` and `nextStep(kind 'any')` name the same target (tested in states 10
  and 11 of §10.3). Eve and exam-day recipes per P1-61; after the exam per P2-72.
* Weekly focus picks only the practice rows and their reasons; the planner never names a lesson that nextStep would not (P1-45).

### 10.9 GA.fit (WP8, core/fit.js)

* `GA.fit.figures(root)`: every `figure.dg > svg.dgs[width]` under `root` keeps at least 80 % of its drawn width; a wider one scrolls inside its box
  with the 'Swipe sideways →' cue (`.dg-wide`), and scalable kinds re-lay out at phone width (P1-12).
* `GA.fit.maths(root)`: inline maths wider than its line becomes its own scroll box (`.m-wide`); display maths steps down to 85 % (desktop) or 75 %
  (phone), then gets the right-edge fade, the swipe line and a focusable label (P0-17).
* `GA.fit.tables(root)`: an overflowing table gets the sticky first column, the fade and the swipe line; prose tables become row cards below 600 px (P1-13).
* `GA.fit.all(root)`: the three in one batched read-then-write pass (P1-11); idempotent, so call it again after a fold opens or Deep is chosen.
* `GA.fit.watch(el)` → `stop()`: one ResizeObserver on `el` that re-runs `all(el)` when its width changes by 8 px or more (debounced). Question cards
  (WP9a, created in `GA.qcard.create`; it covers detached cards, a loaded solution, fold toggles, the runner's `show()` and rotation), the home widgets
  (WP3) and lab stages (WP12) use it. The lesson page (WP7) instead calls `all(body)` after render, on `fonts.ready` when fonts were loading, at the end
  of applyDepth and from one capture-phase 'toggle' listener on the body (P2-67); no body-wide observer.
* Lab internals (`.ga-lab-embed`) are skipped unless `root` is the lab stage itself (WP12 calls `GA.fit.all(stage)` after each draw, P2-60).
  The cue styles live in content.css. Until WP8 lands `GA.fit` is undefined: WP7 keeps its local fitFigures and fitMaths, the others skip the pass.

### 10.10 GA.pyqLib and the question card (WP9b, WP9a)

* Moves from views/pyq.js with every current name: `FKEYS`, `TYPES`, `KEYF`, `parse(query)` → filter state, `types(v)`, `chipLabels(D, f)`,
  `filter(D, f, S, post, opts)`, `disputedIds()`, `texPlain(tex)`, `plain(markdown)`, `snippet(q, n = 190)`. views/pyq.js uses this same object and never
  reassigns it; `GA.queue` stays in views/pyq.js.
* New: `parseQuery(text, {alias, stop} = D.search)` → `{year, set, section: 'GA' | 'CS' | null, no, idLike, terms, ignored}` (P1-26): one parser for
  the bank and the palette. Year, set and section plus number are read in any order ('q37 2019', '2019 set 3 cs 37'); `idLike` is true when nothing
  else is left (the palette then lists Questions first); `terms` are the remaining lower-case words with aliases expanded (kmap → karnaugh) and stop
  words removed; `ignored` lists dropped tokens for 'Ignored: lr'. Tokens of 3 letters or fewer match word starts only.
* New: `trapLine(solution, picks)` → string | null (P1-40, D17): the sentence(s) of the solution's Trap paragraph that cite the picked letter(s),
  at most 160 characters, ready for `MD.inline`; null when none cites them. Callers show it after Check on a keyed, undisputed MCQ or MSQ only (never
  on a disputed key, an unkeyed paper, a NAT or in the runner): the question card (WP9a) and Home's PYQ (WP3).
* Consumers: core/search.js (WP1), lesson PYQ rows (WP7, `snippet`), the notebook (WP11, `snippet`). tests/pyq.test.js and tests/practice.test.js
  require the new path once the lib moves.
* `GA.qcard.create(q, opts)` (WP9a) keeps its options (`mode`, `onChange`, `onCheck`, `onRetry`, `resp`, `number`, `attemptMode`, `cta`, `progress`,
  `prev`, `next`, `mark`) and its return shape (`{el, getResponse, setResponse, lock, reveal, check, checked}`); new options are additive. Inside, it
  runs `GA.fit.watch(el)`, records an ungraded check with `GA.actions.setSeen`, takes inline XP from `GA.engage.xpFor` (never in the runner) and
  names the bookmark 'Bookmark' outside the runner (D5). The bank, the question page, the runner, results, the notebook, lesson embeds and Home use it.

### 10.11 Data loaders and build fields (WP4 data.js, WP13 build)

* **Loaders reject** (P1-59): `GA.data.lesson(id)`, `paper(id)`, `question(qid)`, `questions(qids)`, `solution(qid)`, `cardsOf(subject)`,
  `solutionsOf(subject)` and `searchPostings()` (and `lessonsOf` while it exists) reject with an Error carrying `file` when a file fails to load or does
  not register. They resolve null only for an unknown id or a question without a solution. Callers that want a quiet fallback keep their own `.catch`;
  views show `GA.ui.loadFailed`. `U.loadScript` forgets a failed source, so a retry really re-requests it.
* `GA.data.lesson(id)` is the only lesson-text loader: with the per-lesson split (P1-60, D13) it loads `data/lessons/<subject>/<id>.js` (each file
  registers `GAD.reg('lesson', id, record)`; `manifest.lessonFiles === 'split'` says they exist) and `lessonsOf` goes, so add no new `lessonsOf`
  callers. Card files stay per subject.
* Build fields (WP13; feature-detect each until it lands):
  * Question flag bits on top of today's (FIG 1, SOL 2, KEY 4, SPECIAL 8, REVIEW 16, GROUP 32, LEGACY 64): **MTA 128** (the official key gave marks to
    all; pools exclude it, P0-04), **CHECKED 256** and **DISPUTE 512** (the provenance badge without loading solutions, P2-77). data.js exposes
    `q.mta`, `q.checked`, `q.disputed`.
  * Paper rows: `keySrc` = `'file'` | `'paper'` | null (the proposal's key_src: a separate key PDF, the key printed inside the question paper, or none)
    and `src.key = {url, wayback, sha256, page?, note?}` for both kinds (GATE 2020: the question paper's file, `#page=17`, 'key on pp. 17–18'; P0-21).
  * Paper files: `figures[i].tone` = `'mono'` | `'colour'` (dark-mode treatment, P1-20).
  * Search: `data/search-pyq.js` postings also index topic and sub-topic names and alphanumeric tokens (3nf, lr1, 2pl); the alias table and stop words
    ship in the manifest as `manifest.search = {alias: {kmap: ['karnaugh'], …}, stop: […]}` → `D.search` (P1-26).
  * Lab examples carry structured `pyq: '<question id>'` ids that `build.py --check` verifies; labels are formatted at render time (P1-38, WP12).
  * `pyq/sources/results.json` → `manifest.results = [{exam: 'GATE 2026', paper: 'CS', papers: [ids], qualifying: {<category>: marks}, source:
    {url, wayback, sha256}, checked}]` → `D.results` (D11: a qualifying-mark line only, never a prediction).
  * `manifest.exam` (§10.5); `manifest.files = {path: sha8}` and `manifest.ver` (P1-58: `U.loadScript` and `GA.data.figUrl` append `?v=<sha8>` when
    present, harmless on `file:`); `manifest.cardAliases = {oldId: newId}` (P3-51); `manifest.lessonFiles` (above).

### 10.12 Wave 2: revision sheet, hosted copy, design system (WP14–WP16)

* **WP15, revision sheet** (P1-53, D12a): `GA.views.revise = {enter(ctx, out), leave()}` in `app/js/views/revise.js`, styles and print rules in
  `revise.css`. Route `/rev/:subject` → view key `revise`, file `revise`, added by WP16. The sheet is compiled at runtime in `I.order(subject)` from
  `GA.data.lesson(id)`: title, 'asked N times' (`I.lessonInfo`), the Recap bullets, formula and key boxes; tricks and mistakes behind toggles; a
  'Last 30 days' filter (the `last30` route's lessons). Entry points live in their owners' files behind `GA.shell.has('/rev/' + subject)`: the subject
  hero (WP5), the planner's final-stretch revise task (WP6), a palette action (WP1). D12 approved nothing else: no 'Saved & notes' screen, no 'Next up
  today' card on Home.
* **WP16, hosted copy** (P1-58, D13): owns `index.html` and `app/js/shell.js` in wave 2 (the `/rev` route, worker registration, the install and update
  rows in the Me menu), `build.py --site` and `--check site`, `sw.js`, `manifest.webmanifest`, icons and `_headers`. It never activates an update while
  `state.live` is set; file:// keeps working unchanged; nothing is published (D13: produce the output and HOSTING.md only). It exposes
  `GA.pwa = {hosted, status() → Promise of {installed, update, persisted, cached: {bytes, files}}, restart(), saveAll() → Promise of {bytes, files},
  on(event, fn)}` (event `'update'`); Settings (WP6) renders its 'On this phone' and 'Update ready · Restart' rows only when `GA.pwa` exists.
* **WP14, design system**: consolidates every sheet listed in §10.1 among the others; merging or removing a sheet needs WP16's `index.html` change;
  `tests/css-ratchet.test.js` is WP14's. The bold-layer review applies to its merges too (FRONTEND_V3_SPEC.md §1).

### 10.13 Shared helpers

* `GA.scoring.parseNat(raw)` → number | null (exists, WP10): a NAT response is accepted only when it parses (P0-16). New, WP10:
  `GA.scoring.natClean(text)` → the text filtered to digits, one '.', and a leading minus, for the four NAT boxes (question card WP9a, lesson
  self-check WP8, home PYQ WP3, lab challenge WP12), each with its own 44 px ± button on coarse pointers. A comma is never read as a decimal point.
* util.js (WP2): `U.untilExam(E)` (§10.5), `U.medName(name)` (moved from home.js: the medium subject name for kickers, P3-41), `U.pctMarks`, `U.hm`
  (P3-27). If P3-28 ships `profile.dayStart`, `U.today()` and `U.dayOf(t)` apply it everywhere; callers keep using them and never build day keys
  from a `Date` themselves.
* `GA.scoring.summary(t, D)` (WP10; P0-04, P0-05, P2-34) → `{score, max, correct, wrong, skipped, mta, notEvaluated, ungraded, attempted, total,
  accuracy, scored, full}`, derived from `t.states` at read time so stored records read correctly too: `correct` excludes marks to all, `accuracy` =
  correct ÷ (correct + wrong), `max` counts graded questions only, `scored` is false when nothing was graded ('Not scored' everywhere) and `full` means
  a paper or mock sitting. Every reader of stored tests uses it (the hub and result, WP10; My progress, WP6; Home's mock card, WP3; Wrapped and XP,
  WP2; `GA.stats.testTrend`, WP4), and trends, best and latest use only `full && scored` records. Until it exists, read the stored fields as today.
* `GA.lab.mount(host, id, {cfg, compact})` and `GA.lab.mountEmbed(host, id, cfg)` (WP12) keep their signatures; a compact mount never records a
  lab run on mount, only on the first real interaction inside it (P0-10).
* `GA.mascot.say(el, text, opts)` (exists) for finished and empty states; `GA.homeLib` stays Home's own.

## 11. Audit implementation (wave 1, 2026-10-16 → 17)

Wave 1 (WP1–WP13, WP9 split into 9a and 9b) built the approved audit's P0, P1 and its own P2/P3 items against the contract in §10; the integration pass
(Integrate 1) then applied the cross-package requests that were still open and checked the whole app together. This section is what now exists: the
names other code may rely on, the rules behind the screens, and the few places where a package chose between readings of the spec. §10 stays the
contract; where this section adds an option or a field, it is additive. Wave 2 (WP14 design-system consolidation, WP15 the revision sheet, WP16 the
hosted copy) has not run yet.

**How it is checked.** `node tests/run.js` (1,878 tests), `python3 build.py --check`, `python3 -I tools/smoke.py` and `… demo` (335 browser checks each:
the main self-test, a touch pass with a coarse pointer, and the nav-fit pass at 704–1280 px), and `?selftest=1` itself. The self-test asserts exactly one
coral on every routed screen and seeded empty or finished state (D18), that the palette's row 1, Home, /progress and /syllabus name the same next step
(P0-08), the P0-01 radio group, the P0-13 keys and the P0-14 in-place search, Back and anchors (P1-01), overlays on history (P1-47), focus and
announcements (P1-48), load failures (P1-59), the 16 px touch fields (P1-50) and the tap-safe tips (P1-55). Its last INFO line gives the page time it
used; smoke.py's main budget is 150 s of virtual time (the run takes about 56 s), and a nav-fit Chrome that runs out of time is retried once.

### 11.1 Shell, navigation, search (WP1)

* **View host** (P0-02): the lazy route handler puts a fresh `div.vh[data-view=<name>]` into `#view` (`replaceChildren`) and passes it as `out`; a view
  whose file arrives after the learner moved on is not entered (`ctx.stale()`).
* **Overlays** (P1-47): `GA.ui.overlay = {push({id, kind, close}) → id, pop(id?) → Promise, top(), has(id), size(), clear(), busy(), after(fn), follow(href), onPop()}`.
  `push` writes `history.state.ov`, reusing a stale overlay entry instead of adding steps. `pop` closes at once and consumes the entry with a `history.back()`
  deferred by one task, skipped when code has already navigated (in Chrome a `back()` still in flight undoes an immediate hash navigation). While a back is
  in flight pushes queue and `GA.router.go` waits through `after()`. `follow(href)` = `location.replace` + clear, for links inside the Me menu, dialogs and the
  palette. A popstate whose `history.state` is null is a fresh navigation: overlays close only when the path changes, so a sheet survives a `replace()` on its
  own screen. `GA.ui.modal` / `confirm`, the Me sheet, the palette and the bank's phone filter sheet are on the stack; single-key shortcuts are off while any
  overlay is open. `GA.ui.modal` focuses the dialog itself on touch and the first control elsewhere (`o.focus` overrides); `GA.ui.isolate(el)` → undo (inert
  outside el); `GA.ui.trap(el)` → untrap.
* **Speech and touch**: `GA.ui.say(text, 'polite' | 'assertive')` through `#ga-live-polite` / `#ga-live-assertive`, debounced; toasts are aria-hidden visuals that
  speak through it; `GA.ui.toast(msg, kind, {peak})`. `GA.ui.touch` is a getter for `(hover: none) and (pointer: coarse)`.
* **Failure and empty cards**: `GA.ui.loadFailed(el, {what, retry, main})` and `GA.ui.loadFailedText(what, online, protocol)`; the coral appears only when the
  card fills the view. `UI.empty(icon, title, text, actions, {peak, say})`.
* **Tips** (P1-55): `GA.ui.infoTip(text, {label, html, cls})` → `<button class="itip" data-ftip>`; `GA.reveal.tip.open(el, pin)`, `.owner`, `.pinned`. Chart marks
  carry `data-ftip` beside their SVG `<title>`.
* **Router**: each history entry gets a key in `history.state.k`; positions `{y, h, o}` (the heading above the fold and the offset past it) live in sessionStorage
  `gate-ascent:scroll` (60 entries). They are restored on Back, Forward, reload and re-render; new navigations go to the top; `GA.router.pendingAnchor()` (set by
  the shell) wins, and `GA.router.settle(getY)` re-applies a position while lazy figures grow. After a navigation from inside the view, focus goes to
  `[data-focus]` or the h1 (no ring on such a heading, shell.css) and the title is announced, but not on a re-render. When an anchor is pending the shell then
  moves focus on to the anchor heading (`tabindex=-1`, `preventScroll`), so Tab continues from the reader's place; a first load keeps the browser's own start.
  The error card offers Try again (coral), Download my saved data and Undo last import; a load failure (`Error.file`, `.loadFailed`) gets `loadFailed`.
* **Shell**: `Shell.has(path)`, `Shell.download(name, text)`, `Shell.exportBackup()`; the `#save-warn` banner follows the store's `error` / `saved` events (kind
  `quota | blocked | write | held`); the Me header line `#me-status` comes from `GA.stats.exam`; the Planner badge reads `GA.planner.current().left`. Dev aids:
  `?open=savefail[&kind=]`, `?probe=1[&open=1]` (page / clipped / scrolls-inside; KaTeX's glyph boxes, SVG drawings and 1–2 px clip boxes never count).
* **First paint and boot** (P3-34, P1-51): index.html's inline script reads the store's tiny `gate-ascent:<profile>:theme` key and parses the progress document only
  when that key was never written (tests/shell.test.js runs the script). The boot recovery card's 'Start fresh, data kept aside' calls `GA.store.reset({keep: true})`,
  with a by-hand fallback when no store started.
* **Palette** (`GA.search`): the Node-loadable part is `norm`, `words`, `index(D, places)`, `parse` / `parseLocal`, `query(X, text, {filter, post, postFailed})`,
  `emptyRows(state, D, places, today)`, `places()`, `ed1`; the DOM part `open(prefill, opener)`, `close()`, `isOpen`. With GA.pyqLib loaded the **Questions** group is
  the bank's own list for `#/pyq?q=<text>` (`GA.pyqLib.filter(D, GA.pyqLib.parse({q}), null, postings)`): rows are its first 4 (40 on the Questions tab, 8 for paper
  queries) in the palette's order, the 'All N' row is its size and links to the bank, there is no count while the postings load and no row for a question number
  the rows already show. Lessons, topics and labs keep the palette's own aliases and spellings. The empty palette: row 1 = `nextStep(kind 'any')`, the Due rows
  (cards counted as today's share, `SRS.dayShare`, and hidden at 0; the 5 most urgent notebook retries), lessons in progress, the most-asked CS topics, places
  not in the bar. A failed postings load shows 'Question search is offline · Try again'.
* **CSS**: `--bar-h`, `--topbar` = `--nav-h` (§10.2); `@media print` forces the light tokens; `.itip`, `.save-warn`, `.me-status` / `.me-st`, `.pcancel`, two-line `.pitem` rows.

### 11.2 Store, actions, engagement, Wrapped (WP2)

* **Store v3**: `saveError.kind` is `quota | blocked | write | held` (`held` = the stored text could not be read or kept aside, so the main key is never
  overwritten). `GA.store.issue` = this session's boot problem `{kind: 'corrupt' | 'repaired', key, at, count, paths}`; new events `repaired` and `saved`
  (`{recovered, chars}`, after every good write); `corrupt`, `repaired` and `error` wait for their first late subscriber; listener exceptions are caught and logged.
  Kept copies rotate only after the new copy is written. `importJSON(text, {noCopy})` throws `code 'no-room'` with nothing changed, else returns
  `{repaired, paths, copy}`; Settings answers 'no-room' with Export first and, after a second yes, the import without a copy. Also `reset({keep})`, `keyText(k)`,
  `GA.store.key`, `Store.LEGACY_EXAM`, `Store.MSG`. No localStorage at all (Node) is memory mode, not an error; access that throws is `blocked`. Time on task
  saves at most once a minute (`LAZY_MS`), everything is written on pagehide or a hidden tab, and `'<profile>:theme'` mirrors the theme. The v3 migration
  repaired duplicates, cleared an untouched default exam date and dropped the notebook's old note mirror: `q[id].note` is the one note (P1-27).
* **Records**: log mode `'lx'` is a checked lab challenge that earns no XP. A lab record is `{runs, ch: {n, ok, peek?}, at?}`, `at` stamped by `labRun` and
  `labChallenge` (the time /labs' 'Continue where you left off' reads).
* **Actions**: `labChallenge(labId, ok, {peek})`, `setPlan(snapshot)`, `setFlag(k, v)`, `setSeen(qid)`, `setLessonAt(id, h)`, `lastExport(when)`;
  `setProfile({examDate})` also sets `examSet` (`null` clears both); `finishTest` returns true or false (false for an id already stored); `reviewCard` returns
  null when it ignores a call; SRS calls pass `{cap}`. Change tags `at`, `note`, `bm`, `flag`, `plan` and `seen` do not make engage recompute.
* **Engage**: `XP.labDayCap = 10`, `XP.testMinShare = 0.1`; `labSolvesOn`, `testInfo`, `testEarns`, `xpFor(state, kind, id, ok, {peek, today})` (the one source of
  inline '+N XP' lines; 0 after the day's tenth lab solve). `recap()` with no arguments reads the live store, memoised like `current()`, and returns
  `{range, href, w, slides, keys}`; `ranges()` includes the `season` range (P2-72). Wrapped: `GA.views.wrapped._rangeLabel(r)` builds the picker label (' season'
  hides at ≤ 420 px), `.wr-card.last` fills the closing slide's bar, a kicker is capped at 72 % only beside Peak.
* **Peak once per screen** (P2-70): the milestone toast's head (`.toast .t-peak`, 28 px, engage.css) makes the page's own Peak (`#view svg.mascot`,
  `.mascot-say`) step aside with its box kept until the toast goes; tests.css does the same for the result hero's `.tr-peak`.
* **Util**: `U.medName`, `U.untilExam`, `U.verOf`, `U.verUrl` (versioned script URLs from `manifest.files`); `U.loadScript` rejects with an Error carrying `.file`;
  one fixed set of month and weekday names (`U.fmtDay`, `U.fmtWhen`, `U.dayKey`: '16 Sep 2026', never 'Sept'; P3-27).
* **For the owner**: lab XP eligibility is decided when the solve is recorded, not re-derived from history, so totals never go down and trimming the log never
  changes XP; applying the cap to past days instead would lower some learners' XP.

### 11.3 Learning model (WP4)

* **exam()**: `set` is also true for a valid stored date other than '2027-02-06' when `examSet` is false (stores written before `setProfile` set the flag).
  Everywhere the contract's own rules apply, an unset flag means the default date or null, so results there are unchanged.
* **'after:' scope**: the next not-done lesson in `I.order` stays within the lesson's status group (in-syllabus, or outside 2027), so the in-syllabus sequence ends at
  the subject's end card; a route with nothing left after the lesson falls back to the subject order. `nextLessons(state, D, n, opts)` never applies the season
  rules: `all[0]` is the shared next lesson under the normal rules, then the route or current subject in `I.order`, then the next subjects by ranking.
* **Season rules** (§10.5): the final stretch is Continue → Revise → Retry 5 → 'Review N due cards' (today's share, `SRS.dayShare`; 'N more wait for tomorrow'; no
  card step once the day's limit is reached) → Quick 20 (only with nothing due) → the 10-question warm-up when an assumed date is 0–1 days away, else a full mock.
  The eve: Quick 20 → Retry → the warm-up test. Exam day: 'Warm up · 10 cards you know' → the warm-up test. A bounded round already done today
  (`SRS.roundDone`) is never named again: exam day then says 'Open today's plan' (kind `plan`). After the exam: 'See your season' (`GA.engage.recap`) or 'Set my next
  exam date'.
* **Additions**: `GA.stats.realLesson(rec)`, `GA.stats.EXAM_FALLBACK`, `countdown().basis` and `.label`, `GA.stats.RETRY {first: 1, resolve: 3}` (the notebook's
  timing; any copy about it reads these numbers), `due().questions` = open notebook entries only, `I.ranking`, `I.subjects[i].perPaper` and `.csShare` (= perPaper
  / 85, unrounded; CS shares sum to 1; null outside CS; `share` stays the raw share of every banked mark), `labCards()` subs and `pyqHref` ('#/pyq?sub=a,b,c'),
  `rescue()` `subjectMinutes` / `saves` / `worth`, 'Fast track: <subject>' paths, `GA.data.loadError`, `err.file` and `err.loadFailed`. Step reasons are real data
  ('opened yesterday', '7 PYQs in 6 of 30 papers', 'On route: Crash course · 2 of 91', '3 of 10 answered · 19:00 left').
* **Tests**: `tests/next-states.js` exports `states(D, I, today = '2026-10-16')` → `[{n, name, state, today, expect}]`, `blank()`, `demoState(today)` and `TODAY`
  (built without store.js; the demo is seeded in a child process with `U.today` pinned). `tests/data.test.js` runs its promise checks in a child process.

### 11.4 Home (WP3)

* **Hero**: `homeLib.stepFor(state, D, I, {today})` = `GA.stats.nextStep(kind 'any', scope 'all')`; `homeLib.heroModel(state, D, I, {step, today, now, exam})` →
  `{first, kind 'first' | 'lesson' | 'test' | 'task', href, cta, kicker, line, eyebrow, title, lead, rest, when, note, segs, figure, mood}`. `isFirstRun(state, step)`
  is true while the rule is 'start' and no test is live or finished: the two-line coral 'Start here · <lesson> · <subject> · <min>' and 'or pick a subject' (D1).
  Season copy follows D20 / P1-61. The hero figure is the lesson's best diagram fitted to the measured box (`diagramsOf`, `svgSize`, `bestDiagram`,
  `FIT {min .85, max 1.3, crop .8, thin 3.2}`; 220–300 px, 260 px stacked at ≤ 980 px); its build-in animates parts with `translate`, never `transform`, so the kit's
  SVG transform attributes stay in force (the same trap applies to any CSS animation on diagram-kit children).
* **Order**: `homeLib.sections(state, step)` → `ORDER.first` or `ORDER.returning` (D2: hero → my numbers → practice row → bento → findings → labs).
* **Practice row**: the question of the day (D12: a daily-seeded pick, then Shuffle as before; `qotd*` helpers), the tests card (a live test; else the diagnostic until a
  test is finished; the next full mock in the final fortnight; the warm-up on the eve and exam day) and the Wrapped card behind `GA.engage.recap()`.
* **Inline questions**: the first-run pool is easy 1-mark questions of the top two CS subjects (`isFirstRunQ`); candidates exclude disputed and marks-to-all
  questions; NAT boxes use `GA.scoring.natClean` with a ± key on touch. After an answer: the reveal of D17 option C (the wrong pick keeps its fill, the key is
  filled green, the banner is neutral with a Trap line from `GA.pyqLib.trapLine`), the worked-solution fold (capped at 420 px with a fade on desktop),
  Learn this, Another question / Open in bank; announcements through `GA.ui.say`; `GA.fit.all` and `GA.fit.watch` on the widget. Dev aid: `#/?try=<qid>` pins the
  widget's question (the self-test pins the long-option cs-2014-1:CS29 for its open-state check). 'Cards reviewed' counts `SRS.isSeen`. `continueTarget` is gone.
* **For the owner**: at the approved hero proportions, 100 of 331 hero drawings at 1440 px still have median labels of 8–9.9 px (each limited by the 260 px height
  or the 554 px width); a 300 px budget would lift most of them but makes the hero about 40 px taller.

### 11.5 Learn hub and content map (WP5)

* **/syllabus**: a header coral = `nextStep(kind 'lesson')`; the Routes row (From zero, 80 % of the marks, Crash course, Last 30 days) is the one writer of
  `profile.route` besides /plan's setup card; the key groups `.sy-kt` (tiers), `.sy-ks` (legacy / extra), `.sy-kp` ('Your lessons: done · started', only with
  progress); state dots are aria-hidden with a visually hidden ', done' / ', started' on each row; 'What changed in 2027' wraps.
* **/s/:subject**: lessons first (P1-04): sections `sj-lessons`, `sj-marks`, `sj-years`, `sj-labs` (the old `sj-map` / `sj-order` / `sj-asks` / `sj-pyq` ids are gone),
  topic anchors `sj-t-<topic>` and `sj-t-outside` (`?t=outside`); the hero coral = `nextStep(scope 'subject:<id>')`; the progress block appears only after real
  reading (`realLesson`) or PYQ attempts; the 'Fast track' link opens `#/l/<id>?path=rescue:<subject>` without enrolling a route.
* **Content map**: `GA.mapviz.yearMatrix` gives rows per year (`cols`, `ycols`, `cells` with `part` / `naYears`, `ycells`) and takes `opts.has(row, paper)`;
  `annotate()` reads `ycols`; new `binYears(years, size, {from, to})`, `hasSection`, `panelOrder(M, node, I)`. Topic panels' coral is `scope 'subject:<id>'`; the exam
  lens's coral is 'Practise 10 questions' for the scope and years in view (`#/pyq?…&practise=10`); the 2007–10 bin is drawn half-hatched.
* `tests/syllabus.test.js` exports `stepFor`, `headerCta`, `heroCta`, `sequence`, `routesModel`, `onRoute`, `perSince`, `pickHooks`, `hookCard`.

### 11.6 My progress, planner, settings, charts (WP6)

* **GA.planner** (core/planner.js): `phaseOf`, `phases(today, examDate, {start})` → `[{id, label, from, to, days, state, current, past, span}]`, `shares(D, I)`,
  `weeklyFocus(state, D, today, weeks, {I, daysLeft})`, `day(state, D, today, {I, E, season, nextStep, due})`, `judge`, `more`, `addOne()`, `current()`, `pace`,
  `build`, `todayTasks`, `stored`, `minTxt`, `seasonRecord(state, E)` → `[{id, label, from, to, lessons, answers, tests}] | null` ('Your season'),
  `nextCycle` / `nextLabel(D, E, today)` (the next exam after one the learner sat, P2-72) and `recommended(state, D, today, o)` (the shared lesson step with the
  route cleared, for /plan's 'Recommended' chip); `examOf`, `seasonFrom`, `seasonOf`, `cyclesOf`, `cycleFor`, `labelFor` and `hasProgress` defer to GA.stats.
* **The day snapshot** (§10.8): `{v: 1, day, examDate, minutes, route, season, tasks: [{id, kind, title, minutes, href, why, target?, scope?, lesson?, subject?, qids?,
  extra?}], notes, warmup}`; `route` and `season` are part of the rebuild key, and a same-day rebuild keeps finished rows. `day()` also returns `phase`, `warmup`,
  `empty` and `minutesPlanned`. Exam day has no tasks: the optional warm-up sits in `warmup` and is the /plan coral. The card row counts today's share of the due
  cards (`SRS.dayShare`; 'Today's share of the 150 due; the rest stay due for tomorrow') and is done once that share is reviewed, so in the final fortnight /plan,
  Home, /flash and the palette all name the same number.
* **/plan**: `#/plan?set=exam` opens the exam-date sheet, then replaces the URL; the first-visit setup card's flag is `seen['plan-setup']`; 'On route: <path> · n of
  N · Change' sits in the header; on phones the setup card follows Today in the DOM, so the coral stays on the first screen. Choices made where the spec left
  room: lesson time a day = the larger of half the daily time and the daily time minus 20 practice minutes; 'fits' means the days needed are at most the days
  left minus 14; a full mock every third day in the mock phase.
* **/progress** (P1-42, D10): actions first; the one solid cobalt surface is 'Your habit'; the Wrapped link lives inside it behind `recap()`; after the exam a
  'Your <exam> season' line ('Your exam season' for a date of your own).
* **Settings and About**: `GA.settingsLib = {aboutCounts, keyCell, countsOf, readBackup}` (the file loads in Node); the About page's spaced-repetition sentence is
  `SRS.capText(E, minutes)` (one wording, checked against `review()`), the 'New flashcards a day' hint names the final fortnight's review limit, and the import
  confirm dates the backup with `U.fmtDay`.
* **Charts**: `line()` and `bars()` place `o.refs` labels out of the data's way, else draw a dashed key in the top margin (`.ch-refk`); every mark carries `data-ftip`.
  `.hb-nw` keeps a short note on one line with its link; a finished Road phase is dimmed by colour, not opacity (AA on cobalt).

### 11.7 Lesson page (WP7)

§4b 'Lesson page' is current. Pure helpers added to `GA.lessonLib`: `optionMark`, `isDone`, `orderOf`, `place`, `routeOf`, `after`, `tally`, `nextSubject`,
`needsLine`, `headWords`, `chunks`, `pieces`, `minutesLeft`, `barText`, `flagTip`, `readAt`. Header order: crumb, H1 (`tabindex -1`), summary, meta and levels (the
outside-2027 flag is a `data-ftip` button), 'Continue at …', Why it matters, Key ideas, Builds on (a one-line disclosure on phones). Jumps call `ensure()` first,
then scroll instantly and hold the heading about 1.5 s. The lesson and the question card each carry a copy-only 'Report a problem' dialog (D16) until a shared
`GA.ui.report` exists; the tier label reads `GA.ui.str.tier` ('Extended', D14) and unknown ids use `GA.shell.notFound`.

### 11.8 Lesson content rendering (WP8)

* **GA.fit** (core/fit.js) follows §10.9: `figures` / `maths` / `tables` / `all(root)` return how many elements changed; `watch(el)` → stop() re-runs `all(el)` when the
  width moves 8 px or more, when the content height changes (a solution loads, a fold opens; debounced), on a capture-phase `toggle`, and when a hidden element
  shows again. Extras: `GA.fit.zoom(fig)` and the pure `GA.fit.plan.{figure, maths, table, texFits, MIN_SCALE, PHONE}` (tests/md.test.js); under Node GA.fit holds
  only `.plan`. Markers: figures `.dg-wide` + a sticky `button.dg-cue[data-fit-zoom]`, `data-fitw` / `data-w0` on redrawn figures (the original svg is kept and
  restored when the column widens); maths `.m-wide` (inline, with tabindex and a right-edge fade, `.fit-end` at the scroll end), display formulas `data-fs` with an
  inline font size, `.fit-x`, `.fit-end`, role=group while wide; tables `.tw-x` (sticky first column and cue) and `.tw-cards` (row cards; `.tw-lab` labels aria-hidden,
  ARIA table roles). A block md.js marks `.fit-late` (the self-check) is fitted by the next pass wherever it is; a pass that starts a web-font load runs again after
  `document.fonts.ready`. Inline formulas are measured fragment by fragment, so a wrapped formula with one unbreakable wide piece is caught too.
* **md.js**: KaTeX output is htmlAndMathml with the annotation stripped and the TeX kept in `data-tex` (P0-18; no aria-label); output is memoised per KaTeX object;
  a top-level `\qquad` gives `span.m.md.mrows > span.mrow` (rows that wrap, P0-17); tables get `.tw[data-prose]`; gantt / plot / memory / layers figures drawn wider
  than 340 px get `figure[data-spec]` for their phone layouts. New exports: `sections(src, opts)` → `[{id, html}]`, `splitQquad(tex)`, `proseTable(head, rows)`,
  `natClean(text)`, `displayLint(tex)`, `glyphs()` (characters KaTeX had no metrics for: ⟕ ⟖ ⟗), `textOf`, `sayMd`. In the browser md.js installs delegated
  document listeners once: the NAT filter, the ± key, the Check guard and copying maths as TeX. `.katex { position: relative }` (content.css) makes every formula
  the containing block of its MathML copy, so it never escapes a scroll box.
* **diagram.js**: `render({...spec, phone: true, w})` draws the phone layouts (without `phone` the output is byte-identical); `canRelayout(spec)`, `relayoutTypes`,
  `wrapText`. Text-safe tones: solid fills that carry text get `sh-tx`; a letter on a shaded die face marks the face `sh-ftx` (dark theme: the top face drops to
  40 % of its colour, the left to 30 %, so the light ink reads at 4.5:1 or more); a muted label on a tint is `on-tint` (`on-tint-3` under three or more tints).
  K-map groups with `n` draw numbered loop badges and legend numbers, and `describe()` names them; the kit's smallest labels are 10 px.
* **Trade-off for the owner** (P0-18 vs P1-11): the MathML makes lessons about 40 % heavier in DOM (median open task 302 → 433 ms at 4× CPU); the progressive render
  of §4b is the approved answer. P3-37 waits on real Android and Windows screenshots of the outer-join signs (db.ra.advanced, db.ra.ops,
  db.integrity.constraints): if they show as boxes, a 3-glyph OFL subset; if not, no change.

### 11.9 Question card and PYQ bank (WP9a, WP9b)

* **Card** (views/qcard.js, views.css): one radio group per single-answer card (P0-01); keys never grade or leave by accident (P0-13). After Check the answer loop stays
  in view: the visible band is below `.topbar` / `.save-warn` and above the card's docked main action, the tab bar and anything a page paints over the card's lower
  half (found by hit-testing up from the bottom edge), so pages may dock panels such as `#qend` over a card without a contract change. A right answer scrolls only
  the verdict into view, 40 ms after Check; a miss or a peek scrolls once, when its fold opens; review mode never scrolls; reduced motion jumps. `GA.qcard.lib` gained
  `scrollNeed(bottomEdge, topEdge, band)`, `noteToast`, `minus`, `reportText(q, {label, paper, built, words})` and `copyHint(touch, mac)`. Every `<details>` the
  card draws carries `data-loaded="1"`, so a page's capture-phase `toggle` handler acts only on its own rows (the bank's, the result's `.pqr`, the lesson's `.pq-row`).
  The phone header wraps the paper part in `.qc-idp`; on phones toasts rise above a docked card. Option figures are `box-sizing: content-box`, so the build's
  width and height are the image's own pixels and the 4 px padding sits outside (P3-38).
* **GA.pyqLib** (core/pyqlib.js, §10.10) adds `STATUS`, `SORTS`, `defaultSort`, `listOf`, `seenOf`, `inPaper`, `base`, `bankKey(f)`, `practiseSet(list, S, {n, served})` →
  `{ids, pool, keyed, wrapped}`, `setName(D, f)`, `testable(list)` → `{keyed, ok, why}`, `pageKey(k, s)` → `'check' | 'next' | 'prev' | 'A'…'D' | null`,
  `numbering(qs)`, `printed(q)`, `paperGroups(qs)` → `[{sec, title, cells: [{id, no, label}]}]`, `norm`, `words`, `ed1`, `trapLine(solution, picks)` (the solution
  record or its Markdown string `s`; picks a letter or a list; → the Trap sentence that cites them, ≤ 160 characters, or null),
  `planNext(plan, step, {skip})` → `{kicker, title, minutes, href, from: 'plan' | 'step'} | null` (read like `GA.flashLib.nextCoral`), `nbAfter(state, ids, today,
  retryDay)` → `{resolved, back, due, when, last}` and `nbLine(r, today)` ('1 resolved · 4 back for a retry from tomorrow'). Sub and topic filters accept comma lists.
* **GA.queue**: `set(ids, label, {bank, f, key, kind, back: {href, label}})` plus `res` and `ms` per id for the end-of-set summary. A `bank` set ends as P1-22 approved
  (retry the misses, else the next 10 computed from the stored filter, else back to the bank); a `notebook` set ends on the day plan's next open task, else the
  shared step, else 'Back to the notebook', with a line of what the retries did; a `test` set (the result page's practise) ends 'Back to the result'.
* **Pages**: `#/pyq?<filters>&practise=N` (1–30, default 10) starts a set and replaces the address; the bank's search types in place (P0-14); filter, sort and page
  changes and in-queue Next / Previous / Skip replace the history entry; the phone filter sheet is an overlay; views get decoded route params (the question view
  decodes once more only when the id is not in the catalogue, so an old double-encoded link still opens).

### 11.10 Tests and mocks (WP10)

* `GA.scoring.fullSittings(tests, D)` → `[{t, m}]` (scored paper and mock sittings, oldest first, each with `summary()`), the only input of any score trend;
  `GA.scoring.standing`; `GA.testgen.status(q, lv)` → `'ans' | 'am' | 'mk' | 'na' | 'nv'`; `GA.testgen.counts(questions, lv)` → `{sections: [{sec, total, ans, am,
  mk, na, nv, answered, unanswered}], total}`; `GA.testgen.offer(state, {season, phase, cardsSeen})` → `{kind: 'resume' | 'warmcards' | 'warmup' | 'mock' |
  'diagnostic', id?}` (the hub's start-here hero); `begin()` preloads a test's questions before saving `state.live`.
* The runner uses its own `.xm-*` classes (`.exam`, `.pal`, `.pb`, `#next`, `#end`, `[data-end]`, `#t-diag` are kept for the self-test) and becomes the top bar in exam
  mode at ≤ 980 px (tests.css hides `.topbar` and `.crumbs-row` and makes `.save-warn` relative inside `body.in-exam`). Full-length sittings follow GATE CBT semantics
  (D7). The technical section is labelled 'CS & IT'. On phones the action row is one row of 56 px buttons that wraps (Save & next on its own line) where it cannot
  fit; at ≤ 340 px the bar tightens so a 3-hour clock and '47 of 65 / 16 answered' fit 320 px. Hub hooks: `#t-diag`, `#t-mock`, `#t-warm`, `#t-sub`, `[data-paper]`.
* The result hero's Peak shows only for a first or best scored full-length sitting and steps aside while a Peak-headed toast is up.

### 11.11 Flashcards and notebook (WP11)

* **srs.js**: `capFor(daysLeft)` → null when daysLeft is null or ≤ 1, else `max(1, floor(d / 2))`; `review(c, g, today, {cap})` keeps the earned interval and caps
  only the due date (Again = today; for caps of 11 days or more a capped due date moves up to 10 % earlier; a mature card the cap already pulled forward, answered
  Good or Easy under a cap of 7 days or less, keeps its natural spacing); an early review grows from the elapsed days and never drops below the earned interval;
  `preview(c, today, {cap})` → the four gaps; `MAX_IVL` 365; `cards[id].first` records the first review (the daily new-card cap reads it). The final fortnight's
  daily review limit: `reviewLimit(minutes)`, `reviewsOn(cards, day)`, `minutesOf(state)`, `dayShare(state, due, day, season)` → `{on, limit, used, left, minutes,
  due, today, over}`, `limitWords(minutes)`; `capText(E, minutes)` → `{now, rule}` (the longest gap named is min(cap, MAX_IVL)); `roundDone(state, day, season)` and
  `ROUND {quick: 20, warm: 10}`. `{maxIvl}` is still read as an old name of `{cap}`; no caller passes it any more.
* **flash.js** `GA.flashLib` (pure): `deckOf`, `deckCards`, `queueFor(state, D, today, {deck, mode, I, season})`, `hubModel`, `finishModel`, `nextCoral(plan, step,
  {skip})`, `parseSession`, `previewFor`, `gapLabel`, `capNote`, `examOf`, `emptyActions`, `againOf`, `skipLink`, `roundDone`, `sessionTitle`, `fallbackStep`.
  Sessions (§10.4): `#/flash/all` is due cards only (in the final fortnight today's share, weakest first; the wave-1 transition that served new cards there when
  nothing was due is gone, and that empty round's coral is 'Learn 10 new from your lessons'); `#/flash/<deck>`; `?mode=new | quick | warm | more` ('Review 20 more':
  the due cards past the day's limit); the mode leaves the address once the cards have loaded.
* **notebook.js** `GA.nbLib` (pure): `PAGE 20`, `RETRY_N 5`, `entries`, `isOpen`, `isDue`, `dueList`, `retryIds`, `parseFilter` and `filterQuery` (status, subject,
  reason with 'none', sort, n), `select` (rank = dueList), `noteOf`, `whenOf`, `tally`, `coralOf`. `#/notebook?retry=N` (1–20, default 5) sets a `notebook` queue and is
  replaced in the address; filter changes use `history.replaceState`; the empty state's timing comes from `GA.stats.RETRY`. retention.css holds every flashcard and
  notebook rule.

### 11.12 Labs (WP12)

* `GA.labs` pure helpers: `typedEdit(kind, raw, hold)` → `{text, hold, warn}`, `check(spec, raw, want, hold)` (hold = invalid, nothing recorded), `ctlFits(h, nav, vh)`,
  `numMode`, `notesOf`, `numericCols`, the embed sizing `viewBudget`, `viewPlan`, `fitCount`, `tileBasis` (`EMBED_H` 698), `given`, `presetInfo`, `pyqLabel`, `examples`,
  `gatePresetFor` and `optionsHtml` (select options are `[value, label, group, question id]`; `examples: true` loads a GATE program as a preset).
* Challenges have a real test state (P0-09) and record through `GA.actions.labChallenge(id, ok, {peek})`; the 'Solved · +15 XP' line is `GA.engage.xpFor(…, {peek})`.
* `GA.lab.mount(host, id, {cfg, compact, ex, onExample})`: `ex` = a GATE question id to load, `onExample(id | null)` fires when the loaded example changes; compact mounts
  prefix their ids with `lbN-`; the full page keeps `#lab-rand` and `#lab-chal`; unknown ids call `GA.shell.notFound({kind: 'lab', id, back: '#/labs'})`. Controls may
  carry `short` (the Given line's label); `given()` leaves out a later 'none' choice, a number at its declared default, a 'More options' toggle and '#' comment lines.
  `.lab-ctl > .lab-edit` is the lab page's phone-only 'Edit inputs', `.lab-gv > .lab-edit` the embed's always-visible 'Change the inputs'. `.lab-stage`'s
  scroll-margin-top adds to html's scroll-padding-top on purpose, so 'Back to exploring' stays in view in the test state. Every draw runs `GA.fit` on the stage.
  The lab tables' small inputs (`.ltab .input.sm`) are scoped, so components.css owns `.input.sm` elsewhere and touch fields stay 16 px.
* **For the owner** (P1-16): the ≤ 700 px embed target at 1440 is met at the median only (708 px; 101 of 191 embeds above 700), because a drawing taller than the
  250 px budget is always shown whole for legibility (tcp-window timelines, schedule and parser tables).

### 11.13 Build and data (WP13)

* `manifest.exam.cycles` (content/exam.json), `manifest.files` (path → sha8) and `manifest.ver`, `manifest.lessonFiles = 'split'` with `data/lessons/<subject>/<id>.js`,
  the flag bits 128 (marks to all), 256 (checked) and 512 (disputed), `manifest.search`, `manifest.results` (pyq/sources/results.json), `manifest.cardAliases`; GATE 2020's
  key is the one printed in the question paper (`keySrc: 'paper'`, `src.key` with its page; P0-21).
* Figures: `figures[i].tone`; option figures (`opt:X`) carry `w` and `h` like stem figures (`OPTION_SIZES`; the build-data test fails, and the switch must go back,
  if `.qc-optfig` loses `height: auto` or its `--r` width cap). The data/figs WebP copies of grey-paper scans (paper peak below 246, near-grey, mostly paper: the 15
  scans from 2007–2009) are levelled to white at the lower edge of the paper peak; the source PNGs in pyq/figs are unchanged; each levelled copy carries XMP
  `gate:recipe="paper N"`, so a changed rule re-encodes only those; `tools/buildlib/figures.py` `KEEP_PAPER` exempts a file. Names, URLs and tones are unchanged.
* `tools/check_math.js` reports the glyph list and `displayLint` notes (NOTE lines never fail).

### 11.14 The integration pass (Integrate 1, 2026-10-17)

Requests the packages could not make in their own files, now applied: the final fortnight's card count is one number everywhere (planner card row and
judge, the palette's Due row and the About sentence read `SRS.dayShare` / `SRS.capText`; flash.test.js has no pending notes left); the first-paint theme key
(P3-34); the boot recovery card through `GA.store.reset({keep})`; the notebook's empty-state timing from `GA.stats.RETRY`; 'Your exam season'; the import's
'no-room' path; lab records' `at`; `{cap}` only in SRS calls; nextStep's round-done guard; the one-Peak-per-screen rule; the Road card's done phases dimmed
by colour; the lab tables' small inputs scoped; `.katex` as a containing block everywhere; lettered die faces in dark (P1-14); content-box option figures
(P3-38); the result page and lesson toggle guards; the result's practise queue with its own back link; a full-length runner bar that fits 320 px (P1-28);
the anchor focus hand-off (P1-01, P1-48); the transition at `#/flash/all` removed; the self-test steps WP3, WP5, WP7, WP9a, WP9b and WP11 asked for; a
retry for the nav-fit check, a larger main budget and a shot.sh that leaves no temp files.

A headless sweep (CDP) of 23 routes plus a test result at 1440 and 390 px, light and dark, fresh and demo found one coral on every screen, no page that scrolls
sideways or clips, no console error, no NaN, and the same next step on Home, the palette's row 1, /syllabus, /progress, /map and the /plan learn row, with
subject pages and lesson footers on their scoped step.

**Still open** (none breaks a check): owner decisions (the P1-57 sign-off for the subject-page numerals WP5 moved into the hero line and the two /syllabus strip
numerals it removed; P3-37's device screenshots; the hero figure height and the embed height above; the lab XP rule; the pending 'Master theorem' wording and
answer-key disputes, untouched); P0-15's calculator sheet takes 57–68 % of a phone screen under 760 px tall instead of half, with every key reachable;
P3-06's headed tables (219 empty `<th>` cells in 116 lessons, 18 tables with none) and a shared `GA.ui.report` (both copy-only dialogs work); the sync lab's
'Example program' select still cites papers in free text, and three labels name the keyed option; optional search spellings (normalisation / normalization) in
GA.pyqLib. Wave 2 (WP14–WP16) follows.

### 11.15 Design-system consolidation (WP14, wave 2)
* One primitives layer: the hub primitives (`.hb-head`, `.hb-card`, `.hb-sec` / `.hb-sh`, `.hb-stats`, icon tiles, links, bars, rings, chips, meta
  lines, state dots, the first-run card) moved from hubs.css into components.css with their names kept (P2-52); page sheets specialise them.
* One segmented control: `.seg` and `.hb-seg` are one rule set near the top of components.css with two selected looks: tint (filters, options,
  settings) and solid (the one view switch of a screen). Dead selectors were deleted (site.css lists them).
* CTAs sized by role (P2-53): hero and hub-header corals `.lg` or two-line, never more than two lines; task-flow buttons 44 px; full width on phones.
* Tap targets (P2-54): no phone target under 24 px with a neighbour inside its 24 px circle. The two year charts (`.sj-cols` on /s/:subject,
  `.pg-yrs` on /progress) keep 24 px columns and scroll sideways, opened on the latest year; `.pg-yrs` uses `width: 0; min-width: 100%` so the
  auto grid track of `.pg-flow` does not grow to the chart's 20 × 24 px. Small meta links get `::after` hit areas at ≤ 700 px. Open: 44 px hit
  areas for the remaining 24–44 px targets.
* `tests/css-ratchet.test.js`: per sheet, the count of literal border-radius px and font sizes in px may only go down (lower LIMIT when a sheet
  improves; a new sheet must be added); one segmented-control base rule; the radius scale and `--card-edge` exist.

### 11.16 Formula sheets (WP15, P1-53, D12a)
* `GA.views.revise` (app/js/views/revise.js, styles app/css/revise.css under the root class `.rv-sheet`; `.rv` is taken by the labs' slider values).
  `GA.reviseLib` holds the pure helpers: `extract(md)` → {key, items [{kind: 'formula' | 'fact'}], recap, bullets, tricks, exam, mistakes} cut with
  md.js's own rules; `plan(D, I, subject)` → rows in `I.order` with pyqs / papers / last30 / status; `options(query, profile, hasLast30)`,
  `hrefOf(subject, o)`, `anchorOf(id)` = 'rv-' + id with dots as '-'; `index`, `pick` and the HTML builders.
* Links: `#/rev`, `#/rev/<subject>?only=all|last30&facts=1&tricks=1&mistakes=1`, anchors `#/rev/os#rv-os-mem-tlb`. 'Tables and facts' is a third
  toggle, off by default, so the default sheet is exactly what D12 approved (key idea, formula boxes, Recap).
* Entry points: the Me menu row (shell.js STUDY), the Learn header link beside Content map and the subject hero's neutral 'Formula sheet' button
  (syllabus.js, both behind `GA.shell.has`), a line under the planner's Today list in the final stretch and on the eve (plan.js `.pl-revl`), and
  the palette: a 'Formula sheets' place plus one 'Formula sheet: <subject>' row per subject tagged with its code ('os formulas', 'toc revision').
* 'Saved & notes' (the rest of P2-65) was not approved and is not built.

### 11.17 Hosted copy (WP16, P1-58, D13)
* `build.py --site [DIR]` (default `_site/`) runs the normal build, then tools/hosted.py copies index.html, app/, data/ and vendor/, draws the icons,
  writes manifest.webmanifest, and `seal(DIR)` versions everything in dependency order: CSS url()s → web-manifest icons → data/manifest.js files and
  ver → index.html (?v= on every href/src, `<html data-site>`, http(s)-only links for the manifest and apple icon, a first-route view preload from
  shell.js ROUTES / FILE / DEPS) → sw.js SITE {ver, built, data, index, files {path: [sha8, raw, gzip]}, precache} → _headers, .nojekyll. seal is
  idempotent. `--check site [DIR]` adds a dry seal ('not sealed'), the allowlist, precache ⊆ table, the maskable icon and the precache budget
  (warns above 1.6 MB gzip; now 1,440 KB).
* sw.js (unbuilt it unregisters itself): one cache `ga-files` keyed `<scope><path>?v=<sha8>`; strict install of the shell; first-use caching with
  SHA-256 checks; never activates during a test; posts {type: 'stale'} to pages. `GA.pwa` (app/js/core/pwa.js): installable, installed, line(),
  install(), check(), restart(), testRunning(), persist(), saveAll(); events update, installable, stale, saving.
* Lazy sheets are found with `link[href*="css/…"]` (not `$=`): on the hosted copy their addresses end in ?v=<sha8>.
* tools/perf: cdp.js, server.js (127.0.0.1 only), measure.js, hosted.js `walk` (32 checks: install, offline, update, never during a test,
  prefetch, saveAll, install row), `selftest`, `budget` (first visit ≤ 1.5 s Fast 4G, repeat ≤ 1.0 s and first lesson ≤ 2.0 s on Slow 4G, CPU 4×).
  HOSTING.md is the owner's guide; nothing is published by the build.

### 11.18 Finishing pass (2026-10-17)
Wave 2's build and check runs were cut off by a session end; the rest was finished and verified by hand: WP14's half-done CSS checked (every sheet
parses, the segmented-control block in place), the year charts' tap targets, the ratchet test, P1-53's entry points, the follow-ups WP15 and WP16
asked for (this section, the README line, the self-test routes /rev and /rev/os, the `href*=` sheet checks, shell.test.js's /rev assertion), and a
re-check of the P0/P1 items the wave-1 checks had left partial. Results and what is still open: _audit/DONE.md.
