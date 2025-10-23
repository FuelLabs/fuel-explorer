#!/bin/bash

if [ "$1" = "api" ]; then
    echo "Running API"  
    pnpm start:api
elif [ "$1" = "syncer" ]; then
    echo "Running Syncer"
    pnpm start:syncer
fi
