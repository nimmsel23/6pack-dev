#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd -P)"
cloud_state="$repo_root/.pnpm-cloud"

can_write_to() {
  local directory="$1"
  [[ -d "$directory" ]] || return 1
  local probe
  probe="$(mktemp "$directory/.sixpack-pnpm-write-test.XXXXXX" 2>/dev/null)" || return 1
  rm -f -- "$probe"
}

runtime_dir="${XDG_RUNTIME_DIR:-}"
if [[ -z "$runtime_dir" ]] || ! can_write_to "$runtime_dir"; then
  runtime_dir="$cloud_state/runtime"
  mkdir -p -- "$runtime_dir"
  chmod 700 "$runtime_dir"
fi
export XDG_RUNTIME_DIR="$runtime_dir"

data_dir="${XDG_DATA_HOME:-${HOME:?HOME must be set}/.local/share}"
if ! can_write_to "$data_dir"; then
  data_dir="$cloud_state/data"
  mkdir -p -- "$data_dir"
fi
export XDG_DATA_HOME="$data_dir"

exec pnpm "$@"
