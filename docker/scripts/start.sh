#!/bin/bash

set -e

echo "\n\nStarting docker..."
docker compose --env-file .env up -d --build

function deployIndexer() {
    INDEXER_URL="http://localhost:29987/api/health";

    if curl --silent --head --request GET $INDEXER_URL | grep "200 OK" > /dev/null; then
        echo "\nDeploy indexer..."
        pnpm --filter=indexer run deploy
    else
        sleep .5
        deployIndexer
    fi
}

echo "\n\nWaiting for indexer..."
deployIndexer