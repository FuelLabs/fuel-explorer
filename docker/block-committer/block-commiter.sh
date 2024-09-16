#!/bin/sh
set -euo pipefail

# Define default values for retries and delay
RETRIES=${RETRIES:-60}
DELAY=${DELAY:-10}
JSON='{"jsonrpc":"2.0","id":0,"method":"net_version","params":[]}' # JSON payload example

# Ensure required environment variables are set
if [ -z "${ETHEREUM_RPC:-}" ]; then
    echo "Must specify \`ETHEREUM_RPC\`."
    exit 1
fi
if [ -z "${FUEL_GRAPHQL_ENDPOINT:-}" ]; then
    echo "Must specify \`FUEL_GRAPHQL_ENDPOINT\`."
    exit 1
fi
if [ -z "${DEPLOYMENTS_HTTP:-}" ]; then
    echo "Must specify \`DEPLOYMENTS_HTTP\`."
    exit 1
fi

echo "Checking Fuel GraphQL endpoint: $FUEL_GRAPHQL_ENDPOINT/health"

# Wait for the Fuel Core chain to be up
echo "Waiting for Fuel Core chain."
curl \
    --fail \
    --show-error \
    --silent \
    --retry-connrefused \
    --retry $RETRIES \
    --retry-delay $DELAY \
    "$FUEL_GRAPHQL_ENDPOINT/health" > /dev/null
echo "Connected to Fuel Core chain."

# Retrieve the deployments file from the deployer
echo "Waiting for L1 chain deployment data."
curl \
    --fail \
    --show-error \
    --silent \
    --retry-connrefused \
    --retry-all-errors \
    --retry $RETRIES \
    --retry-delay $DELAY \
    "$DEPLOYMENTS_HTTP" \
    -o addresses.json
echo "Got L1 chain deployment data."

# Extract data from the deployments file
export STATE_CONTRACT_ADDRESS=$(jq -r .FuelChainState < ./addresses.json)
echo "STATE_CONTRACT_ADDRESS: $STATE_CONTRACT_ADDRESS"
echo "ETHEREUM_RPC: $ETHEREUM_RPC"
echo "FUEL_GRAPHQL_ENDPOINT: $FUEL_GRAPHQL_ENDPOINT"

# Start the Block Committer
echo "Starting block committer"
exec /root/fuel-block-committer
