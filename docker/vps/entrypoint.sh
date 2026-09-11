#!/bin/sh
set -eu

# Railway (re)attaches the DATA_DIR volume root-owned on every deploy, regardless
# of ownership baked into the image, so this must chown at container start, not
# just at build time. The container therefore has to start as root for this one
# step, then drop to the unprivileged `node` user (uid 1000, built into the
# node:20-alpine base) via su-exec before running the app.
DATA_DIR=${DATA_DIR:-/data}
mkdir -p "$DATA_DIR"
chown -R node:node "$DATA_DIR"

exec su-exec node "$@"
