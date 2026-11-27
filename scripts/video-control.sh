#!/usr/bin/env bash
# Lokales Control-Panel bauen und bei Bedarf starten, ohne bestehende Dienste anzufassen.
set -euo pipefail
repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd -P)"
cd "$repo_root"
./scripts/pnpm-cloud.sh run build:video-control
if ! systemctl --user is-active --quiet sixpack-video-control.service; then
  systemd-run --user --collect --unit=sixpack-video-control \
    --description='6Pack Video-Control (localhost:5173)' \
    /usr/bin/python3 -m http.server 5173 --bind 127.0.0.1 --directory "$repo_root/dist-video-control"
fi
printf '%s\n' 'Video-Control: http://localhost:5173/video-control.html'
