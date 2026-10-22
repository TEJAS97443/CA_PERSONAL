#!/bin/sh
# Per-lesson edit lock shared by all agents that edit existing lessons.
#   sh ~/CA_PERSONAL/ca_prompts/tools/lock.sh take <lesson-id>   -> exit 0 if you now hold it, 1 if someone else does (skip it, come back later)
#   sh ~/CA_PERSONAL/ca_prompts/tools/lock.sh drop <lesson-id>
d="$HOME/CA_PERSONAL/ca_prompts/locks/$2"
case "$1" in
  take) mkdir "$d" 2>/dev/null && date +%s > "$d/t" && exit 0; exit 1;;
  drop) rm -rf "$d"; exit 0;;
esac
