#!/bin/sh
# usage: tools/shot.sh "<hash route>" out.png [width] [height] [extra query like profile=demo&theme=dark]
# Headless Chrome screenshot of the app at a route.
# Chrome's smallest headless viewport is 500 px wide, so for widths below 500 the app is loaded inside an <iframe> of exactly that width:
# media queries then see a true phone viewport (e.g. 390), and the PNG is cropped (top-left) to the requested width when the project venv has Pillow.
# Open folds: "fold=open" (or "open=1") in the extra query opens every answer fold, Hint and Show answer before the screenshot (the app's
# ?probe opener, P0-24), at any width; without "probe=1" the probe's overflow report is taken off the picture, with it the report stays (top left).
#   tools/shot.sh "/l/cma.mc.bep" /tmp/m.png 390 6000 "fold=open"
ROUTE="${1:-/}"; OUT="${2:-/tmp/shot.png}"; W="${3:-1440}"; H="${4:-1000}"; Q="${5:-}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
# SHOT_CALM=1 renders with reduced motion, so entrance animations (a fold opening, Home's hero) are already finished in the PNG
CALM=""; [ -n "$SHOT_CALM" ] && CALM="--force-prefers-reduced-motion"
FOLD=""; PROBE=""
case "&$Q&" in *"&fold=open&"*|*"&open=1&"*) FOLD=1 ;; esac
case "$Q" in *probe=1*) PROBE=1 ;; esac
[ -n "$FOLD" ] && [ -z "$PROBE" ] && Q="${Q}&probe=1"     # the app opens the folds through its probe (shell.js)
# virtual-time budget (ms): SHOT_BUDGET overrides; a probe=1 run on a long lesson needs ~30 s before its overflow report appears
B1=8000; B2=6000; case "$Q" in *probe=1*) B1=30000; B2=30000;; esac; [ -n "$SHOT_BUDGET" ] && B1=$SHOT_BUDGET && B2=$SHOT_BUDGET
# Chrome leaves a copy of its component extensions (~0.6 MB) in $TMPDIR on every headless launch; give each run a private temp dir and remove it afterwards.
CTMP="$(mktemp -d -t shotchrome)"; trap 'rm -rf "$CTMP"' EXIT
URL="file://$ROOT/index.html?${Q}#${ROUTE}"
if [ "$W" -lt 500 ] || [ -n "$FOLD" ]; then
  WRAP="$CTMP/wrap.html"   # inside the private temp dir, which the trap removes (a mktemp name plus .html left an empty file behind every time)
  # folds asked for without probe=1: the wrapper removes the probe's report box as soon as it appears, so it covers nothing
  CLEAN=""; [ -n "$FOLD" ] && [ -z "$PROBE" ] && CLEAN='<script>setInterval(function(){try{var d=document.querySelector("iframe").contentDocument,p=d&&d.querySelector(".probe-out");if(p)p.remove()}catch(e){}},250)</script>'
  printf '<!doctype html><meta charset=utf-8><body style="margin:0;background:#888"><iframe src="%s" width="%s" height="%s" style="border:0;display:block"></iframe>%s' "$URL" "$W" "$H" "$CLEAN" > "$WRAP"
  WW=$W; [ "$WW" -lt 500 ] && WW=500
  TMPDIR="$CTMP" "$CH" --headless=new --disable-gpu --hide-scrollbars --no-first-run --allow-file-access-from-files $CALM --window-size=$WW,$H --virtual-time-budget=$B1 --screenshot="$OUT" "file://$WRAP" >/dev/null 2>&1
  PY="$ROOT/.venv/bin/python"; [ -x "$PY" ] && [ "$W" -lt 500 ] && "$PY" -c "from PIL import Image; import sys; im = Image.open(sys.argv[1]); im.crop((0, 0, int(sys.argv[2]), im.height)).save(sys.argv[1])" "$OUT" "$W"
else
  TMPDIR="$CTMP" "$CH" --headless=new --disable-gpu --hide-scrollbars --no-first-run $CALM --window-size=$W,$H --virtual-time-budget=$B2 --screenshot="$OUT" "$URL" >/dev/null 2>&1
fi
echo "$OUT"
