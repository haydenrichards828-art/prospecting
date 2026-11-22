#!/usr/bin/env bash
# One check before pushing a change to Prospect.
#   bash tools/check.sh baseline   before editing: saves screenshots of every screen
#   bash tools/check.sh            after editing: code valid, no new style name clashes, screens compared, design numbers
set -u; cd "$(dirname "$0")/.."; BASE=/tmp/prospect-baseline; NOW=/tmp/prospect-now; ok=1
curl -s -o /dev/null localhost:8765/ || { (setsid nohup python3 -m http.server 8765 >/dev/null 2>&1 &); sleep 1; }
if [ "${1:-}" = baseline ]; then rm -rf "$BASE"; node tools/screens.js "$BASE"; exit; fi
echo "1. Code is valid";      node --check v2.js && echo "   v2.js ok" || ok=0
echo "2. Style name clashes"; python3 tools/class_clash.py | tail -2 || ok=0
echo "3. Every screen";       rm -rf "$NOW"; node tools/screens.js "$NOW" $( [ -d "$BASE" ] && echo "$BASE" ) || ok=0
echo "4. Design numbers";     node tools/design_check.js 2>/dev/null | grep -E "distinct|fails|under 24|cut off" | sed 's/ rgb.*//'
echo "5. Main jobs: taps, typing, screens, response"; node tools/tasks.js | sed 's/^/   /' || ok=0
echo "6. Nothing cut off";       node tools/clip_check.js | tail -12 | sed 's/^/   /'; [ ${PIPESTATUS[0]} -eq 0 ] || ok=0
echo "7. Version numbers";    grep -o 'v2\.\(js\|css\)?v=[0-9]*' index.html | sort | uniq -c
[ $ok = 1 ] && echo "All checks passed." || { echo "Something failed above."; exit 1; }
