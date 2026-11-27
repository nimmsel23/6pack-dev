#!/usr/bin/env bash
set -euo pipefail
repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd -P)"
exec "${COACH_ROOT:-$(dirname "$repo_root")/coach-dev}/bin/coach-video-control"
