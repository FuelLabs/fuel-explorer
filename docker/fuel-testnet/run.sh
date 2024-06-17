#!/bin/sh
set -euo

if [ -z "$RELAYER_URL" ]; then
	echo "Must specify \$RELAYER_URL."
	exit 1
fi
if [ -z "$P2P_KEY_SECRET" ]; then
	echo "Must specify \$P2P_KEY_SECRET."
	exit 1
fi

# start the Fuel client
echo "Starting fuel node."
exec /root/fuel-core run \
	--service-name="${SERVICE_NAME:-"fuel-core-testnet-sepolia"}" \
	--keypair "${P2P_KEY_SECRET}" \
	--relayer "${RELAYER_URL}" \
	--ip="${FUEL_IP}" --port="${FUEL_PORT}" --peering-port=30333 \
	--snapshot . \
	--db-path=/data/fuel-sepolia-testnet \
	--utxo-validation --poa-instant false --enable-p2p \
	--reserved-nodes /dns4/p2p-testnet.fuel.network/tcp/30333/p2p/16Uiu2HAmDxoChB7AheKNvCVpD4PHJwuDGn8rifMBEHmEynGHvHrf \
	--sync-header-batch-size 100 \
	--enable-relayer \
	--relayer-v2-listening-contracts=0x01855B78C1f8868DE70e84507ec735983bf262dA \
	--relayer-da-deploy-height=5827607 \
	--relayer-log-page-size=500 \
	--sync-block-stream-buffer-size 30
