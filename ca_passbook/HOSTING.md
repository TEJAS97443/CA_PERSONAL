# Hosting PassBook

Phones cannot open the app from a folder (`file://`), so this project can build a **hosted copy**: the same app as static files, made to be
served over HTTPS, installable on a phone's home screen and working offline after the first visit. The build only writes a folder; nothing is
uploaded anywhere. Choosing a host and publishing is your step (owner decision D13). Opening `index.html` from the project folder works as before.

## 1. Build the copy

```
.venv/bin/python build.py --site                 # writes _site/
.venv/bin/python build.py --site /path/to/folder # or anywhere else (an empty folder, or an earlier site build: nothing else is replaced)
```

`--site` runs the normal build first (so `data/` is current), then writes the copy and checks it. It needs the project's `.venv` (Pillow
draws the app icons) and uses Node, when it is on the PATH, to read the shell's route table. A run takes about 15 seconds. The last line
reports the size, for example: *771 files, 22.0 MB (about 9.2 MB gzip); app shell precached by the service worker: 85 files (1.4 MB gzip)*.

What goes in, and nothing else (`--check site` fails on any other file):

| file | what it is |
|---|---|
| `index.html` | the app's page, with every file it loads addressed as `<path>?v=<content hash>`, plus three small http(s)-only scripts: the web-manifest link, the home-screen icon link and a hint that starts the first screen's view file early |
| `app/`, `data/`, `vendor/` | the app, its content and its fonts, copied from the project; stylesheets get versioned font addresses and `data/manifest.js` lists the hash of every shipped file |
| `app/img/icon-*.png`, `app/img/apple-touch-icon.png` | the logo drawn from the app's own mark: 192 and 512 px, a maskable 512 px and the 180 px iPhone icon |
| `manifest.webmanifest` | name, colours (base.css `--bg`), icons and a description built from the real counts |
| `sw.js` | the service worker, with this version's table of files, hashes and sizes |
| `_headers` | cache rules for hosts that read it (Netlify, Cloudflare Pages) |
| `.nojekyll` | stops GitHub Pages from running Jekyll over the folder |

The 758 MB project (the official PDFs, crops, the virtual environment, tools, docs, this audit) stays at home.

## 2. Check it

```
python3 build.py --check site            # the source rules, and the build in _site/ (or: --check site /path/to/folder)
node --experimental-websocket tools/perf/hosted.js walk        # a real Chrome: install, offline, update, installability (~1 min)
node --experimental-websocket tools/perf/hosted.js selftest    # the app's own ?selftest=1, served over http (~5 min)
node --experimental-websocket tools/perf/hosted.js budget      # the measured budgets below (~40 s)
```

`--check site` re-derives every address and hash and fails when anything is out of date ("not sealed"): a file edited after the build, a stray
file, a missing icon. The three walks serve a throw-away copy of the folder from 127.0.0.1 only and delete everything they made.

## 3. Try it on this computer

```
node tools/perf/server.js _site                 # http://127.0.0.1:8787/ (add --port N)
```

The test server listens on this machine only (127.0.0.1) and has no option to listen anywhere else. It serves the folder the way a host would:
brotli or gzip, revalidation, and the rules in `_headers`. Service workers run on `http://127.0.0.1` and `http://localhost` because browsers
treat those as secure.

To try it on an Android phone without exposing anything to your network: connect the phone by USB, open `chrome://inspect/#devices` in desktop
Chrome, turn on **Port forwarding** (`8787` → `localhost:8787`), then open `http://localhost:8787` in Chrome on the phone. An iPhone has no
such path; check it on your host's preview address instead.

## 4. Publish (your choice of host)

Whatever the host:

* **HTTPS** is required (service workers and installing only work on secure pages).
* Upload the **contents** of the folder, unchanged: no minifying, renaming or re-encoding, because every address carries the file's hash and the
  service worker checks each file against it. The copy works at a site root or in a sub-folder (all addresses are relative).
* Compression (brotli or gzip) is recommended for `.js`, `.css`, `.html`, `.json` and `.webmanifest`.
* The copy is public content: no accounts, nothing collected, no requests to any other site. Progress stays in each learner's browser.
  It needs no login, and nothing private should ever be put in the folder.

Host notes:

* **Netlify or Cloudflare Pages**: deploy the folder (drag and drop, or their CLI). Both read `_headers`. Deploys are atomic, so learners never
  see half an update.
* **GitHub Pages**: push the folder's contents to the branch or folder Pages serves. Pages ignores `_headers` and caches everything for
  10 minutes, which is still correct (every file is versioned and checked); a new version is noticed up to 10 minutes later.
* **Any other static host** (nginx, Apache, S3 with CloudFront, …): apply the same rules as `_headers`:
  `Cache-Control: no-cache` for `/`, `/index.html`, `/sw.js` and `/manifest.webmanifest`; `Cache-Control: public, max-age=31536000, immutable`
  for `/app/*`, `/data/*` and `/vendor/*`; `Content-Type: application/manifest+json` for `.webmanifest` (and `text/javascript`, `font/woff2`,
  `image/webp`, `image/png` for those types). If the host is not atomic (a plain file sync), upload in three steps:
  `app/`, `data/` and `vendor/` first, then `index.html` and `manifest.webmanifest`, then `sw.js` **last**. A page then never points at files
  that are not there yet, and a new version is never announced before all of its files are.

## 5. Updating

Change content or code, run `build.py --site` again and upload the whole folder (replacing the old one; old files left behind do no harm).
What learners see:

* The next time the app opens (or comes back into view after an hour), it finds the new version and downloads only the files that changed,
  in the background. Then **Update ready · Restart** appears in the Me menu and in Settings → Your data.
* An update never takes over during a test: while one is in progress, the line says it applies after the test and Restart refuses with that
  reason. Other open tabs reload when the update takes over; a tab with a test on screen reloads when the test ends.
* If a learner opens a screen whose file changed before restarting, new lesson or question text is shown anyway; changed code is refused (the
  screen says it did not load) and a toast says a newer version is ready and how to restart.
* To roll back, build the older version and upload it: learners get it as an update.

## 6. On the learner's phone

* **Offline**: after one visit, the app shell (every screen, the fonts, the icons) is stored, together with whatever that visit opened. Lessons,
  papers, solutions, flashcards and figures are kept as they are opened. Offline, a lesson that was never opened says it did not load because
  the phone is offline (not that it is missing), and a new mock says its questions need a connection and starts nothing. Settings → Your data
  offers **Save everything for offline** (about 9 MB to download).
* **Storage**: Settings shows *On this phone: progress … · offline copy … · Protected / Not protected*. The app asks the browser to keep its
  storage once there is something to lose (the first finished lesson or the tenth answer) and again when installed; Chrome and Safari decide
  without a prompt. Firefox asks the learner, so there it happens only from **Keep my progress safe**.
* **Installing**: Chrome offers it, and the Me menu shows **Install app** while it does. On iPhone: Share → Add to Home Screen. The installed
  iPhone app keeps its own storage, separate from Safari's, so export a backup in Safari first and import it in the app. Safari also deletes a
  site's storage after 7 days without a visit unless the app is installed.
* **Moving between devices or browsers**: Settings → Export backup, then Import backup on the other one.

## 7. Measured budgets

Measured with `tools/perf/hosted.js budget`: Chrome on this computer at 390 × 844 with an Android user agent, CPU slowed 4×, DevTools network
presets applied to the page and to its service worker, the copy served over HTTP/2 with brotli from 127.0.0.1; median of 3 runs, each in a
fresh browser profile (17 Oct 2026). A real host adds its own distance; the presets model the phone's network.

| | budget | measured |
|---|---|---|
| First visit, Home on Fast 4G (no service worker yet) | ≤ 1.5 s | 1.34 s |
| Repeat visit, Home on Slow 4G with the service worker | ≤ 1.0 s | 0.39 s |
| First lesson on Slow 4G with the service worker | ≤ 2.0 s | 0.66 s |

The first visit was 1.52 s until the site's `index.html` started the first screen's view file together with the boot set (one round trip less).
`tools/perf/measure.js` holds the network presets and the method; the audit's original measurements are in `_audit/ev/gap-hosted/`.

## 8. If something looks wrong

* *"Update ready" never appears*: the host or a CDN caches `sw.js`. It must be served with `Cache-Control: no-cache`.
* *A screen says it did not load while online*: a file is missing on the host (an incomplete upload). Upload the whole folder again;
  `--check site` on the folder you uploaded tells you whether it is complete.
* *A learner wants a clean start of the offline copy*: the browser's site settings for the host → clear the site's data. That also deletes
  their progress, so export a backup first.
