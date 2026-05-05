#!/bin/bash

if [ "$1" = "api" ]; then
    echo "Running API"  
    pnpm start:api
elif [ "$1" = "syncer" ]; then
    echo "Running backfill (one-shot, no-op if clean)"
    npx tsx src/backfill.ts || echo "Backfill failed, continuing..."
    echo "Running Syncer"
    pnpm start:syncer
fi
