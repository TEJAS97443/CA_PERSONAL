#!/bin/sh
# usage: tools/shot.sh "<hash route>" out.png [width] [height] [extra query like profile=demo&theme=dark]
# Headless Chrome screenshot of the app at a route.
# Chrome's smallest headless viewport is 500 px wide, so for widths below 500 the app is loaded inside an <iframe> of exactly that width:
# media queries then see a true phone viewport (e.g. 390), and the PNG is cropped (top-left) to the requested width when the project venv has Pillow.
ROUTE="${1:-/}"; OUT="${2:-/tmp/shot.png}"; W="${3:-1440}"; H="${4:-1000}"; Q="${5:-}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
# Chrome leaves a copy of its component extensions (~0.6 MB) in $TMPDIR on every headless launch; give each run a private temp dir and remove it afterwards.
CTMP="$(mktemp -d -t shotchrome)"; trap 'rm -rf "$CTMP"' EXIT
URL="file://$ROOT/index.html?${Q}#${ROUTE}"
if [ "$W" -lt 500 ]; then
  WRAP="$CTMP/wrap.html"   # inside the private temp dir, which the trap removes (a mktemp name plus .html left an empty file behind every time)
  printf '<!doctype html><meta charset=utf-8><body style="margin:0;background:#888"><iframe src="%s" width="%s" height="%s" style="border:0;display:block"></iframe>' "$URL" "$W" "$H" > "$WRAP"
  TMPDIR="$CTMP" "$CH" --headless=new --disable-gpu --hide-scrollbars --no-first-run --window-size=500,$H --virtual-time-budget=8000 --screenshot="$OUT" "file://$WRAP" >/dev/null 2>&1
  PY="$ROOT/.venv/bin/python"; [ -x "$PY" ] && "$PY" -c "from PIL import Image; import sys; im = Image.open(sys.argv[1]); im.crop((0, 0, int(sys.argv[2]), im.height)).save(sys.argv[1])" "$OUT" "$W"
else
  TMPDIR="$CTMP" "$CH" --headless=new --disable-gpu --hide-scrollbars --no-first-run --window-size=$W,$H --virtual-time-budget=6000 --screenshot="$OUT" "$URL" >/dev/null 2>&1
fi
echo "$OUT"
