#!/usr/bin/env bash
# Reassemble the two large zips (stored as 95 MB parts because GitHub limits files to 100 MB) and verify their checksums.
set -euo pipefail
cd "$(dirname "$0")"
for z in "ca_passbook 2.zip" "ca_passbook.zip"; do
  cat "$z".part-* > "$z"
done
shasum -a 256 -c zip-checksums.sha256
echo "Restored: ca_passbook 2.zip, ca_passbook.zip"
