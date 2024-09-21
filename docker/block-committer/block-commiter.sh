#!/bin/sh
set -euo

# Detect system language
if [ -n "${LANG:-}" ]; then
    SYSTEM_LANG=${LANG%%.*}
elif [ -n "${LC_ALL:-}" ]; then
    SYSTEM_LANG=${LC_ALL%%.*}
elif command -v locale > /dev/null 2>&1; then
    SYSTEM_LANG=$(locale | grep LANG | cut -d= -f2 | cut -d_ -f1)
elif command -v chcp > /dev/null 2>&1; then
    SYSTEM_LANG=$(chcp | awk '{print $NF}')
    case $SYSTEM_LANG in
        1254) SYSTEM_LANG="tr" ;; # Turkish
        1252) SYSTEM_LANG="en" ;; # English
        936) SYSTEM_LANG="zh" ;;  # Chinese
        932) SYSTEM_LANG="ja" ;;  # Japanese
        850) SYSTEM_LANG="es" ;;  # Spanish
        437) SYSTEM_LANG="de" ;;  # German
        860) SYSTEM_LANG="fr" ;;  # French
        *) SYSTEM_LANG="en" ;;    # Default to English
    esac
else
    SYSTEM_LANG="en" # Default to English
fi

# Load translations from JSON file
TRANSLATIONS=$(cat translations.json | jq -r ".${SYSTEM_LANG}")

# Translation function
translate() {
    echo $(echo $TRANSLATIONS | jq -r ".$1")
}

RETRIES=${RETRIES:-60}
DELAY=${DELAY:-10}
JSON='{"jsonrpc":"2.0","id":0,"method":"net_version","params":[]}'

if [ -z "$ETHEREUM_RPC" ]; then
    translate "must_specify_ethereum_rpc"
    exit 1
fi
if [ -z "$FUEL_GRAPHQL_ENDPOINT" ]; then
    translate "must_specify_fuel_graphql_endpoint"
    exit 1
fi
if [ -z "$DEPLOYMENTS_HTTP" ]; then
    translate "must_specify_deployments_http"
    exit 1
fi

echo $FUEL_GRAPHQL_ENDPOINT/health

# wait for the base layer to be up
translate "waiting_for_fuel_core_chain"
curl \
    --fail \
    --show-error \
    --silent \
    --retry-connrefused \
    --retry $RETRIES \
    --retry-delay $DELAY \
    $FUEL_GRAPHQL_ENDPOINT/health > /dev/null
translate "connected_to_fuel_core_chain"

# get the deployments file from the deployer
translate "waiting_for_l1_chain_deployment_data"
curl \
    --fail \
    --show-error \
    --silent \
    --retry-connrefused \
    --retry-all-errors \
    --retry $RETRIES \
    --retry-delay $DELAY \
    $DEPLOYMENTS_HTTP \
    -o addresses.json
translate "got_l1_chain_deployment_data"

# pull data from deployer dump
export STATE_CONTRACT_ADDRESS=$(cat "./addresses.json" | jq -r .FuelChainState)
translate "state_contract_address"
echo "STATE_CONTRACT_ADDRESS: $STATE_CONTRACT_ADDRESS"
translate "ethereum_rpc"
echo "ETHEREUM_RPC: $ETHEREUM_RPC"
translate "fuel_graphql_endpoint"
echo "FUEL_GRAPHQL_ENDPOINT: $FUEL_GRAPHQL_ENDPOINT"

# start the Block Commiter
translate "starting_block_commiter"
exec /root/fuel-block-committer
