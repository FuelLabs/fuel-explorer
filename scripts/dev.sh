#!/bin/bash

deps=$(./scripts/deps.sh)

if [ -n "$deps" ]; then
	echo "-#### Running dev with linked dependencies from local pnpm store:"
	echo "$deps"
fi

export LINK_DEPS="$deps"

# Run the dev env requested
if [ -z "$1" ]; then
	pnpm turbo:run build:lib
	pnpm turbo:run --filter=./packages/graphql-new --filter ./packages/app-explorer dev --parallel
fi
