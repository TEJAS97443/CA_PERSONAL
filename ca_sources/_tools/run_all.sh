#!/bin/sh
# Rebuild everything under ~/CA_PERSONAL/ca_sources/sm from the downloaded PDFs (order matters).
# Downloads are untrusted data: these scripts only read them; nothing is executed from the download folders.
set -e
PY="$HOME/DSA_PERSONAL/gate_cse/.venv/bin/python -I"
T="$HOME/CA_PERSONAL/ca_sources/_tools"
cd "$HOME/CA_PERSONAL/ca_sources/sm"
python3 -I "$T/download_sm.py"                       # skips files already downloaded (see _downloads.json)
$PY "$T/extract.py" p4 p5 p6a p6b                    # txt/*.txt + toc.json (+ _extract_log.json)
for p in p4 p5 p6a p6b; do python3 -I "$T/check_toc.py" --merge $p; done   # vs ICAI printed Detailed Contents
# OCR QA is slow (~20 min): re-run only if PDFs change. It writes <paper>/_ocr_qa.json
[ "$1" = "--ocr" ] && $PY "$T/ocr_qa.py" p6b p6a p5 p4
$PY "$T/ocr_analyze.py" p4 p5 p6a p6b                # -> _ocr_supplement.json, _ocr_glyph_candidates.json
$PY "$T/apply_ocr.py" p4 p5 p6a p6b                  # text_fixes.json + OCR blocks for image-only figures
$PY "$T/ed_diff.py" p4 p5 p6b                        # July 2024 vs July 2026 edition comparison
$PY "$T/make_sources.py"                             # ~/CA_PERSONAL/ca_sources/SOURCES.md
