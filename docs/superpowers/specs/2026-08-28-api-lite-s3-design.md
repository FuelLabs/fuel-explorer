# api-lite: explorer API served from the S3 block recorder

Date: 2026-08-28
Status: approved design, not implemented

## Goal

Run the Fuel explorer on a 1 vCPU / 1 GB RAM / 25 GB disk host with no Postgres. Blocks and transactions come from the fuel-core recorder bucket `fuel-blocks-mainnet-ap-northeast-1`. A decoding and caching layer serves the existing explorer GraphQL schema so the frontend in `packages/app-explorer` runs unchanged. Target is full explorer functionality except the homepage graphs, which are not a hard requirement. Sync lag is acceptable. The result is load tested locally and reported. If the host budget is not enough, the budget is raised, not the functionality cut.

## Feasibility limit, stated up front

Account history, predicates, and minted-asset lists need inverted indexes. Production holds 1.92 B rows in `transactions_accounts` for that. At about 80 bytes per row in sqlite that is about 150 GB, estimated. No cheap host holds it. This design therefore indexes a retention window backward from the tip, sized by disk, with `INDEX_RETENTION_DAYS` as the knob. Inside the window every query works. Outside it, account history returns what fuel-core can answer, which is nothing, and the page says so. Raising the host budget widens the window. It never reaches genesis.

## Non-goals

- 24 h TPS, gas, and fee charts. `statistics` and `tps` are computed from cached blocks only.
- Bridge and staking pages. They read L1 and sequencer data, not blocks.
- USD values. They need asset rates.
- Replacing the production indexer in `packages/graphql`.

## Facts the design depends on

| Fact | Source |
| --- | --- |
| One S3 object per block. Key is the height as 4 big-endian bytes, each as two hex chars, slash separated. Block 59300000 = `03/88/d8/a0`. | `fuel-o2/packages/analytics-syncer/src/services/s3Reader.ts:24-35` |
| Object is gzip protobuf. Gzip detected by magic bytes. | `s3Reader.ts:56-65` |
| Protobuf schema has full header, every tx type with inputs, outputs, witnesses, policies, metadata, and per-tx receipts. | `fuel-o2/packages/analytics-syncer/proto/api.proto` |
| `metadata.id` is not populated in the objects. Ids must be computed. | `fuel-o2/packages/analytics-syncer/src/services/txId.ts` header comment |
| Bucket is private. Public read policy is commented out. | `fuel-deployment-v2/terraform/fuel-prod-mainnet-tokyo/apps/mainnet/block-recorder-s3.tf` |
| The explorer domain layer turns fuel-core GraphQL JSON into explorer fields and imports no database connection. `drizzle-orm/pg-core` imports there are column type helpers only. | `packages/graphql/src/domain`, 718 lines |
| Frontend calls one GraphQL endpoint, `VITE_FUEL_INDEXER_API/graphql`, and fuel-core directly only for the sync banner. | `packages/app-explorer/src/services/graphqlClient.ts:33-46`, `src/systems/Core/hooks/useSyncMetrics.ts:29` |
| fuel-core `transaction(id)` returns the block height for a tx hash. | Verified against `https://mainnet.fuel.network/v1/graphql` on 2026-08-28 |

## Architecture

```
browser ──> nginx (frontend, static) ──> api-lite (Node 20, graphql-yoga)
                                            │
                        ┌───────────────────┼─────────────────────┐
                        ▼                   ▼                     ▼
                  S3 GetObject        fuel-core GraphQL       sqlite (index)
                  block by height     tip height, hash→height,  /data/index.db
                  gzip+protobuf       passthrough queries
                        │
                        ▼
                  decode → fuel-core JSON shape → packages/graphql domain layer
                        │
                        ▼
                  LRU (memory, 128 MB) + disk cache /data/blocks/<height>.json (5 GB cap)
```

One new package: `packages/api-lite`. One new compose service in `docker/vps/docker-compose.yml`. Both containers share the 1 CPU / 1 GB limit.

## Components

### 1. `S3BlockSource`

- `@aws-sdk/client-s3` `GetObject` with `s3KeyForBlock(height)`.
- Credentials from `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`. Optional `S3_ENDPOINT` for MinIO in tests.
- Gunzip when the first two bytes are `1f 8b`.
- Returns the raw protobuf `Block` message decoded with `protobufjs` and `api.proto` copied from o2.
- A missing object is a `BlockNotFound` error, not a retry.

### 2. `BlockDecoder`

Maps the protobuf `Block` to the fuel-core GraphQL JSON shape, typed as `GQLBlock` and `GQLTransaction` from `packages/graphql/src/graphql/generated/sdk-provider`.

- Header: `id`, `height`, `daHeight`, `time` as TAI64 string, `transactionsCount`, `messageReceiptCount`, `applicationHash`, `prevRoot`, `transactionsRoot`.
- Consensus: `PoAConsensus { signature }`. Signature is not in the object. Field is null.
- Per transaction: every field in `fragment TransactionItem` of `packages/graphql/src/graphql/queries/sdk/tx-fragment.graphql`.
- Transaction id and `rawPayload`: build a `fuels` SDK `Transaction` struct from the proto, encode with `TransactionCoder`, id = sha256(chainId bytes ++ encoded). Covers Script, Create, Mint, Upgrade, Upload, Blob. Chain id is read once at boot from fuel-core `chain { consensusParameters { chainId } }`.
- Status: `SuccessStatus` when the `ScriptResult` receipt result is 0 and no `Panic` or `Revert` receipt exists, else `FailureStatus`. Mint transactions are always `SuccessStatus`. Both carry `time` and `block { id header { height ... } }`.
- `totalGas`: `gasUsed` from the `ScriptResult` receipt.
- `totalFee`: computed with `fuels` `calculateGasFee` from `gasUsed`, the block Mint tx `gas_price`, and consensus parameters `gasPriceFactor`, plus policy `tip`. Parity is verified in tests against fuel-core `totalFee` for the fixture blocks. If parity fails for a tx type, that type returns `totalFee: null` and the failure is recorded in the test.
- Receipts: all 13 receipt types mapped field by field to the `Receipt` GraphQL type. Hex fields as `0x` strings, numbers as decimal strings.
- Inputs and outputs: every variant in the proto maps to the GraphQL union member of the same name.

### 3. `BlockStore`

- `get(height)`: memory LRU, then `/data/blocks/<height>.json`, then `S3BlockSource` + `BlockDecoder`. Writes through to both caches.
- Memory LRU: `lru-cache`, max size 128 MB by JSON byte length.
- Disk: 5 GB cap, `DISK_CACHE_BYTES`. An eviction pass runs every 10 min and deletes oldest by mtime past the cap.
- `getRange(from, to)`: parallel `get` with concurrency 8.
- Every decoded block is handed to the `Indexer` for the `Index` write.

### 4. `Index` (sqlite)

- `better-sqlite3`, file `/data/index.db`, WAL mode, `synchronous=NORMAL`.
- Tables, all keyed so rows sort by height for cheap range deletes:
  - `blocks(height INTEGER PRIMARY KEY, block_hash BLOB UNIQUE, time INTEGER, tx_count INTEGER)`
  - `txs(height INTEGER, tx_index INTEGER, tx_hash BLOB, PRIMARY KEY(height, tx_index))` with index on `tx_hash`
  - `tx_accounts(account BLOB, height INTEGER, tx_index INTEGER, PRIMARY KEY(account, height DESC, tx_index))`. Accounts are input owners, senders, recipients, contract ids, output `to` and contract ids, the same set as `packages/graphql/src/application/uc/NewAddBlockRange.ts:431-464`.
  - `predicates(address BLOB PRIMARY KEY, bytecode BLOB)`
  - `assets(asset_id BLOB PRIMARY KEY, contract_id BLOB, sub_id BLOB, height INTEGER)` from `Mint` receipts, with index on `contract_id`
  - `contracts(contract_id BLOB PRIMARY KEY, height INTEGER)` from `ContractCreated` outputs
  - `meta(key TEXT PRIMARY KEY, value TEXT)` holding `indexed_from` and `indexed_to`
- Hash lookups: sqlite hit, else fuel-core `transaction(id)` or `block(id)` for the height, then the block is decoded and indexed on the way. Unknown to fuel-core returns null.
- Retention: every hour delete every table's rows with `height` below the height that is `INDEX_RETENTION_DAYS` old, then `indexed_from` moves up. `predicates` and `contracts` are kept.

### 4b. `Indexer`

- Forward: every block the `TipTracker` decodes is written to the `Index` in one sqlite transaction.
- Backward: a worker walks from `indexed_from - 1` down to the retention floor, in batches of 20 blocks with S3 concurrency 8, at most 1 batch in flight, and yields to request handling between batches. It stops at the floor and resumes after restarts from `meta`.
- Backfill throughput sets how long the window takes to fill. It is measured in the load test, not assumed.

### 5. `TipTracker`

- Polls fuel-core `blocks(last: 1)` every 5 s. Holds `latestHeight`.
- On each new height, calls `BlockStore.get` for it so the recent list is warm. If the S3 object is not there yet, retries that height on the next poll. The served tip is the highest height that decoded, not the fuel-core tip.

### 6. GraphQL server

`graphql-yoga` at `/graphql`, schema built from `packages/graphql/src/graphql/schemas/{fuelcore,explorer}.graphql`. Resolvers:

| Query | Behaviour |
| --- | --- |
| `block(height)` | `BlockStore.get` → `BlockEntity` from `packages/graphql/src/domain/Block`. |
| `block(id)` | `Index` block lookup then as above. |
| `blocks(first/last/after/before)` | Cursor is the height. Default page 10. Range read from `BlockStore.getRange`. `hasNextPage` from tip. |
| `transaction(id)` | `Index` tx lookup → block → the tx at `tx_index` → `TransactionEntity`. |
| `transactionsByBlockId(blockId)` | Height or hash resolved, then all txs of that block, paginated in memory. `pageInfo.totalCount` is the block's tx count. |
| `transactions(first/last/after/before)` | Cursor is `height-index` in the same zero-padded form as `packages/graphql/src/infra/dao/Transaction.ts:16-18`. Walks blocks downward from the tip until the page is full. |
| `search(query)` | Numeric → block by height. 32-byte hash → block, tx, contract, account, predicate, in that priority, all from the `Index`. |
| `transactionsByOwner(owner, ownerType)` | `tx_accounts` range scan for the account, newest first, page 10, cursor `height-index`. `totalCount` capped at 1001 as production does. Empty when the account has no rows in the window. |
| `predicate(address)` | `predicates` table. |
| `assetsByContract(contractId)` | `assets` table by contract. `asset(assetId)` from the same table plus verified-assets metadata. |
| `contracts` | `contracts` table, newest first. |
| `getBlocksDashboard` | Last 6 cached blocks. `blockSize` is the JSON byte length. USD fields null. |
| `tps`, `statistics` | Computed over blocks currently in the memory LRU. Series are hourly buckets over that window. `totalFee24hrs` null. |
| `balances`, `coins`, `contract`, `contractBalances`, `chain`, `nodeInfo` | Forwarded to fuel-core with the same variables. |
| `balanceByBlockHeight`, staking, bridge | Empty connection or null. Schema unchanged so the frontend does not break. |

Asset `name`, `symbol`, `icon`, `decimals` on inputs, outputs, and receipts come from `packages/graphql/src/infra/cache/VerifiedAssets.ts`, which fetches a JSON list over HTTP. `amountInUsd`, `feeInUsd`, `gasUsedInUsd` are null.

Per-process `DataCache` from `packages/graphql/src/infra/cache/DataCache.ts` with 5 s TTL on `getBlocksDashboard`, `tps`, `statistics`, and the `transactions` first page.

### 7. Container

- `docker/vps/Dockerfile.api-lite`: build stage installs the monorepo with pnpm and bundles `packages/api-lite` with `tsup` into one file. Runtime stage is `node:20-alpine` with `better-sqlite3` native build, `/data` volume.
- Compose service `api` on port 3000, env from `docker/vps/.env` (gitignored): AWS keys, `AWS_REGION=ap-northeast-1`, `S3_BUCKET=fuel-blocks-mainnet-ap-northeast-1`, `FUEL_PROVIDER=https://mainnet.fuel.network/v1/graphql`, `DATA_DIR=/data`, `DISK_CACHE_BYTES=5368709120`, `MEMORY_CACHE_BYTES=134217728`, `INDEX_RETENTION_DAYS=3`, `INDEX_MAX_BYTES=15000000000`.
- nginx proxies `/graphql` to `api:3000` so the frontend is built with `VITE_FUEL_INDEXER_API=` empty and calls same-origin. This avoids a rebuild per host.
- Resource split under the shared 1 GB: api-lite `NODE_OPTIONS=--max-old-space-size=384`.

## Error handling

- S3 `NoSuchKey` → GraphQL `null` for that block, HTTP 200. Logged at info with the height.
- S3 auth or network error → GraphQL error `S3_UNAVAILABLE`, HTTP 200. Cached blocks keep serving.
- fuel-core unreachable → tip stays at the last known height, hash misses return null. `/health` reports `fuelCore: down`.
- Decoder throws on an unknown proto variant. The block is not cached and the error carries the height and tx index.
- sqlite write failure is logged and ignored. Reads then fall through to fuel-core.

## Testing

- Fixtures: one committed `.bin` object per tx type, fetched once from the bucket with a script `scripts/fetch-fixture.ts <height>`. Fixture heights are chosen from mainnet so each type appears: Script, Create, Mint, Upgrade, Upload, Blob, plus a block with a `FailureStatus` tx.
- Decoder unit tests: decode each fixture, assert against a committed JSON of the fuel-core `block(height)` response for the same height, field by field, excluding `consensus.signature` and USD fields.
- Fee parity test: for every tx in the fixtures, `totalFee` equals fuel-core's value. Failures list the tx type.
- `BlockStore` tests: LRU eviction by bytes, disk eviction by cap, S3 source mocked.
- Resolver tests: `graphql-yoga` executed in-process against fixtures for every query in the table above.
- `Index` tests: in-memory sqlite, forward write, account lookup order, retention delete, resume from `meta`.
- Integration: `docker compose up`, `curl` each query, open the frontend and load `/`, a block page, a tx page, an account page, and search.

## Load test

Run locally against the compose stack with the 1 CPU / 1 GB limit in place, using `k6` from the host.

1. Warm: backfill running, no requests. Record backfill blocks per second, RSS, CPU, disk growth per hour.
2. Read mix, 10 min, 20 virtual users: 40% homepage bundle (`getBlocksDashboard`, `transactions` first page, `blocks` first page), 30% tx page by hash from the indexed window, 20% account page, 10% search. Record p50, p95, p99, error rate, RSS, CPU.
3. Cold miss: 200 tx pages by hash outside the disk cache. Record S3 latency p50 and p95.
4. Repeat step 2 with backfill running.

Report format: one table per step with the numbers above, then the verdict against the spec. If p95 for a block page exceeds 1 s or RSS exceeds the limit under step 4, the report names which resource to raise and by how much.

## Sizing

Measured after build, not before. Targets: api-lite RSS under 300 MB with a full 128 MB LRU. Disk cache 5 GB. Index gets the rest, about 15 GB. At 80 tx/s and about 3 account rows per tx, 30 days is 200 M tx rows plus 600 M account rows. That does not fit. `INDEX_RETENTION_DAYS` starts at 3 and the load test reports real bytes per block so the number can be set from data. Retention is also enforced by `INDEX_MAX_BYTES=15000000000`: when the file passes it, the floor moves up until it is under.

## Open items

1. AWS read credentials for the bucket. Required before fixtures can be fetched.
2. `consensus.signature` is absent from the recorder object. The block page shows it. Either hide it in the frontend later or fetch from fuel-core on demand. Decision deferred, field null for now.
3. Fee derivation exactness per tx type. Decided by the parity test.

## Addendum 2026-08-28, after first live run

Measured on the live stack: index growth about 67 KB per block, about 5.8 GB per day. `INDEX_MAX_BYTES=15 GB` therefore holds about 2 days. The user accepted a 2-day window.

### A1. Account history beyond the window

`transactionsByOwner` pages that fall below `indexed_from`, or accounts with no rows in the index, are forwarded to fuel-core's native `transactionsByOwner(owner, first, after)` for the list of transaction ids and block heights. Each returned transaction is then rendered from S3 through `BlockStore`. Cost: one fuel-core call plus up to 10 S3 reads per page. fuel-core indexes addresses only, so contract ids stay window-bound. Cursor format stays `height-index`; when the page comes from fuel-core, the cursor is fuel-core's own cursor prefixed with `fc:` so the next page goes back to fuel-core.

### A2. Homepage charts from the index

The `blocks` table gains `gas_used INTEGER` and `total_fee INTEGER`, filled from each transaction's `status.totalGas` and `status.totalFee` at index time. `time` is stored as unix seconds. Two new `Index` queries:

- `hourlySeries(sinceUnix)`: per-hour `txCount`, `blocks`, `gasUsed`, `totalFee` from `blocks WHERE time >= ?` grouped by `time / 3600`.
- `tenMinuteSeries(sinceUnix)`: same grouped by `time / 600`, used for TPS peaks.

`statistics` and `tps` read those series for the last 24 h, or for the whole indexed window when it is shorter. Series `date` values are epoch milliseconds as strings, which the frontend charts parse with `dayjs(Number(date))`. `totalFee24hrs` and `valueInUsd` use the base-asset USD price from CoinGecko's public `simple/price` endpoint, cached 10 min, null on failure. `rollingStats60s` and `getBlocksDashboard` keep reading the memory cache.

### A3. Independent loading per homepage tile

`packages/app-explorer/src/systems/Home/components/Hero/hooks/useFuelExplorerStatus.tsx` is split into three hooks with their own query keys and refetch intervals: dashboard blocks (5 s), rolling stats (10 s), chart series (60 s). Every `LoadingWrapper` in `Hero.tsx` uses the `isPending` of the hook it renders. This is the only frontend change. It is compatible with the production API because the queries are unchanged.

### A4. Order

Tasks 18 to 21 run after Task 16 and before the load test, so the load test measures the final build.
