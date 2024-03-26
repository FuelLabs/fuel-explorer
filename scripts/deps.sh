#!/bin/bash

# User should define here the Dependencies to link locally
# LINK_FUELS=true
# LINK_FUEL_UI=true
# LINK_FUEL_TS=true
# LINK_FUEL_CONNECTORS=true

# Figure out dependencies to link
deps=""
if [ "$LINK_FUEL_TS" = true ]; then
	fuel_ts_deps="fuels @fuel-ts/utils"
	deps="$deps $fuel_ts_deps"
fi

if [ "$LINK_FUEL_UI" = true ]; then
	fuel_ui_deps="@fuel-ui/react @fuel-ui/css"
	deps="$deps $fuel_ui_deps"
fi

if [ "$LINK_FUELS" = true ]; then
	fuels_deps="@fuels/react-xstore @fuels/local-storage @fuels/ts-config @fuels/jest @fuels/tsup-config"
	deps="$deps $fuels_deps"
fi

if [ "$LINK_FUEL_CONNECTORS" = true ]; then
	fuels_deps="@fuels/connectors @fuel-connectors/fuel-development-wallet @fuel-connectors/fuel-wallet @fuel-connectors/fuelet-wallet"
	deps="$deps $fuels_deps"
fi

if [ -n "$deps" ]; then
	# Link dependencies to local pnpm store
	pnpm link --global $deps &&
		pnpm -r exec pnpm link --global $deps
fi

echo "$deps"
