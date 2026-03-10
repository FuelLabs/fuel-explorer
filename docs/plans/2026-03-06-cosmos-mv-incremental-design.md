# Replace Cosmos Materialized Views with Incremental Aggregation Tables

**Date:** 2026-03-06
**Status:** Approved
**Context:** Incident reported by Luiz Bolsoni and Brandon Kite — Cosmos MV refresh taking 8+ hours, causing table locks and degraded page load times.

## Problem

Six staking-related materialized views refresh daily by re-scanning the entire `cosmos_events`, `cosmos_responses`, `transactions`, `receipts`, and `outputs` tables. As data grows, these refreshes take progressively longer. Even with `CONCURRENTLY`, the refresh query itself holds heavy locks and consumes significant DB resources for hours.

### Affected MVs (all from migration 019)
- `daily_staked_mv` — L2 staking deposits (Fuel transactions)
- `daily_unbond_mv` — L2 unbonding withdrawals
- `daily_claims_mv` — L2 reward claims
- `total_staking_mv` — Combined L1 (Cosmos) + L2 (Fuel) staking
- `inflows_mv` — Token inflows to treasury addresses
- `outflows_mv` — Token outflows from treasury addresses

### Not Affected (kept as-is)
- `hourly_statistics` — Already optimized (24h window, migration 036)
- `recent_account_transactions_mv` — Simple join, 7-day window, refreshes fine

## Solution: Approach C — Incremental Aggregation

Replace the 6 staking MVs with regular tables that are updated incrementally during indexing. No background refresh needed.

### New Tables

```sql
indexer.daily_staked_agg    (day DATE PK, daily_staked NUMERIC)
indexer.daily_unbond_agg    (day DATE PK, daily_unbond NUMERIC)
indexer.daily_claims_agg    (day DATE PK, daily_claims NUMERIC)
indexer.total_staking_agg   (day DATE PK, l1_staked NUMERIC DEFAULT 0, l2_staked NUMERIC DEFAULT 0)
indexer.daily_inflows_agg   (day DATE PK, amount NUMERIC)
indexer.daily_outflows_agg  (day DATE PK, amount NUMERIC)
```

### Write Path

**`NewAddBlockRange.ts` (block consumer)** — After processing each transaction's receipts, detect staking operations using the same filters as the current MV definitions and upsert into aggregate tables:

| Pattern | Target Table |
|---------|-------------|
| `scriptData LIKE '%76465706f736974%'` + CALL receipt to staking contract | `daily_staked_agg` + `total_staking_agg.l2_staked` |
| `scriptData LIKE '%87769746864726177%'` + TRANSFER_OUT receipt | `daily_unbond_agg` |
| `scriptData LIKE '%d636c61696d5f72657761726473%'` + TRANSFER_OUT receipt | `daily_claims_agg` |
| CoinOutput to/from treasury addresses | `daily_inflows_agg` / `daily_outflows_agg` |

**`IndexCosmos.ts` (cosmos indexer)** — After inserting `delegate` type events, extract amount and upsert into `total_staking_agg.l1_staked`.

### Read Path

Existing read queries in StakingDAO/resolvers change table name only (e.g., `daily_staked_mv` → `daily_staked_agg`). Same columns, same semantics.

`total_staking_agg` read query: `SELECT day, l1_staked + l2_staked AS daily_staked FROM total_staking_agg`

### Migration Plan

Single migration file:
1. Create 6 new aggregate tables
2. Backfill from existing data using the same queries the MVs use
3. Drop the 6 materialized views
4. Delete the 6 MV refresh jobs from `database_jobs`

### Deployment Order
1. Deploy code changes first (indexing logic writes to aggregate tables)
2. Run migration (creates tables, backfills, drops MVs)
3. Tables are immediately populated — no refresh delay

### Rollback
Re-run migration 019 to recreate MVs and their refresh jobs. MV definitions are idempotent.

### 60-Day Window
Current MVs filter `timestamp > NOW() - INTERVAL '60 days'`. Aggregate tables accumulate all data. Read queries apply the 60-day filter. Optional: periodic cleanup job to delete rows older than 60 days (much cheaper than a full MV refresh).

## Constants

Staking contract: `0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c`
Fuel asset ID: `0x1d5d97005e41cae2187a895fd8eab0506111e0e2f3331cd3912c15c24e3c1d82`
Treasury addresses:
- `0xdb491b442f68ebaa785f077805158ebfddeede7063f16d5a26e1073ff6987601`
- `0xafdda1cd084ed0f56d35f570b2e9d34e7c7380191058e2a2fb16e0c58cbbc7c2`
Cosmos excluded delegator: `0x85308a35b3ad660213ea91a5d37bbf9620708ecc`
