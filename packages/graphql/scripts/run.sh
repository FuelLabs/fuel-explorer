#!/bin/bash

if [ "$1" = "api" ]; then
    echo "Running API"  
    pnpm start:api
elif [ "$1" = "syncer" ]; then
    echo "Running backfill in background (no-op if clean)"
    npx tsx src/backfill.ts &
    echo "Running Syncer"
    pnpm start:syncer
fi
