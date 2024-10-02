#!/bin/sh
set -euo

# Number of retries for HTTP requests
RETRIES=${RETRIES:-160}

# JSON-RPC request payload
JSON='{"jsonrpc":"2.0","id":0,"method":"net_version","params":[]}'

# Path to the Fuel database
FUEL_DB_PATH=./mnt/db/

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

# Check if L1_CHAIN_HTTP environment variable is set
if [ -z "$L1_CHAIN_HTTP" ]; then
    translate "must_specify_l1_chain_http"
    exit 1
fi

if [ -z "$DEPLOYMENTS_HTTP" ]; then
    translate "must_specify_deployments_http"
    exit 1
fi

# Wait for the L1 chain to be up and running
translate "waiting_for_l1_chain"
curl \
    --fail \
    --show-error \
    --silent \
    -H "Content-Type: application/json" \
    --retry-connrefused \
    --retry $RETRIES \
    --retry-delay 1 \
    -d $JSON \
    $L1_CHAIN_HTTP > /dev/null
translate "connected_to_l1_chain"

# Fetch the deployment data from the deployer
translate "waiting_for_deployment_data"
curl \
    --fail \
    --show-error \
    --silent \
    --retry-connrefused \
    --retry-all-errors \
    --retry $RETRIES \
    --retry-delay 5 \
    $DEPLOYMENTS_HTTP \
    -o addresses.json
translate "got_deployment_data"

# Extract the FuelMessagePortal contract address from the deployment data
export FUEL_MESSAGE_PORTAL_CONTRACT_ADDRESS=$(cat "./addresses.json" | jq -r .FuelMessagePortal)
translate "fuel_message_portal_address" $FUEL_MESSAGE_PORTAL_CONTRACT_ADDRESS
translate "l1_chain_http" $L1_CHAIN_HTTP

# Start the Fuel node
translate "starting_fuel_node"
exec /root/fuel-core run \
    --ip $FUEL_IP \
    --port $FUEL_PORT \
    --db-type in-memory \
    --utxo-validation \
    --vm-backtrace \
    --enable-relayer \
    --relayer $L1_CHAIN_HTTP \
    --relayer-v2-listening-contracts $FUEL_MESSAGE_PORTAL_CONTRACT_ADDRESS \
    --poa-interval-period 1sec \
    --debug \
    --min-gas-price 0 \
    --snapshot ./
