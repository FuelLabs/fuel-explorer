# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are chain readers: developers and people verifying blocks, transactions, accounts, and contracts on Fuel Ignition.

Bridge, staking, ecosystem discovery, and contributor token management ship in the same product. They are not the primary job.

## Product Purpose

Fuel Explorer is Fuel Labs' web application for reading Fuel Ignition. It shows blocks, transactions, accounts, contracts, and live network stats. Bridging, staking, the ecosystem directory, and contributor token releases ship in the same app.

Success is a reader verifying chain state, and completing those adjacent workflows, from data the product actually has.

## Positioning

Fuel Labs' explorer for Fuel Ignition. Chain reading, Ethereum–Fuel bridging, FUEL staking, the ecosystem directory, and the contributor token manager ship as one web app at app.fuel.network.

## Operating Context

Public app: https://app.fuel.network/

Confirmed networks: Fuel Ignition mainnet and testnet. The app also has chain settings for local and devnet.

The monorepo is one product:

- `packages/app-explorer` — Vite React app. Routes: home, blocks, block, transaction, account, contract, bridge and bridge history, staking, ecosystem and project pages, upgrade (token manager).
- `packages/app-portal` — bridge pages, ecosystem page, wallet connect, and shared providers, consumed by the explorer.
- `packages/app-staking` — staking flows consumed by the explorer.
- `packages/app-commons` — shared app code.
- `packages/ui` (`@fuels/ui`) — shared UI library.
- `packages/graphql` — shared GraphQL schema, generated SDK, and the domain layer that turns fuel-core data into explorer fields. It is not a standalone API or syncer.
- `packages/api-lite` — API server. Serves that GraphQL schema from the S3 block recorder and fuel-core, with a sqlite index. The Postgres-backed explorer API, syncer, and database were removed.
- `packages/e2e-tests` — Playwright tests.
- `docker/` — local Fuel node. Deploy notes live in `docker/vps/deploy.md`.

The ecosystem catalog is loaded from `https://raw.githubusercontent.com/FuelLabs/fuel-ecosystem/refs/heads/main/projects.json`.

Wallet connection is part of bridge and staking.

## Capabilities and Constraints

Confirmed surfaces:

- Search and inspect blocks, transactions, accounts, and contracts.
- Home: daily transactions, hourly TPS, fees, rolling stats, recent blocks and transactions, top apps.
- Bridge between Ethereum and Fuel, including transfer history.
- Stake: delegate FUEL to validators, or liquid stake through The Rig on Ignition.
- Ecosystem directory of apps, wallets, and infrastructure, with per-project pages.
- `/upgrade`: contributor grants and Fuel token release schedules.

Locales shipped in the explorer: en, ja, ko, zh-CN, zh-HK.

License: Apache-2.0. Author: Fuel Labs (`contact@fuel.sh`).

Do not invent users, usage metrics, testimonials, case studies, pricing, or project claims that are not in chain data or the ecosystem catalog.

Accessibility standard: not established.

## Brand Commitments

Name: Fuel Explorer. Organization: Fuel Labs. Public URL: https://app.fuel.network/. Product copy lives in `packages/app-explorer/src/locales/`. No further voice or identity constraints were set.

## Evidence on Hand

- UI copy: `packages/app-explorer/src/locales/` (`en`, `ja`, `ko`, `zh-cn`, `zh-hk`) and `packages/app-explorer/public/locales/`.
- Page descriptions: `packages/app-explorer/src/systems/Core/pageMeta.ts`. Home: "Blocks, transactions and live network stats for Fuel Ignition."
- Ecosystem catalog: the FuelLabs `fuel-ecosystem` `projects.json` URL above.

No testimonials, press quotes, benchmarks, or customer proof are on hand. Do not invent them.

## Product Principles

1. Chain reading is the primary job. Bridge, stake, ecosystem, and token management stay in the product and stay secondary to verification.
2. Show facts from the network and the ecosystem catalog. Do not invent users, metrics, testimonials, or project claims.
3. One web app covers the reader workflows. Package boundaries are implementation, not separate products.
4. Mainnet and testnet are both real operating environments.
5. Preserve the shipped locales. Do not add languages or rewrite factual copy without a product decision.
