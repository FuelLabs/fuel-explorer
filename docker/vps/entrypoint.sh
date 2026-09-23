#!/bin/sh
set -eu

# Railway attaches the DATA_DIR volume root-owned on every deploy, so the chown
# must run at container start.
DATA_DIR=${DATA_DIR:-/data}
mkdir -p "$DATA_DIR"
chown -R node:node "$DATA_DIR"

exec su-exec node "$@"
