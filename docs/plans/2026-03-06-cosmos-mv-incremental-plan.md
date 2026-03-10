# Replace Cosmos MVs with Incremental Aggregation — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace 6 staking materialized views with incrementally-updated aggregate tables to eliminate 8-hour refresh locks.

**Architecture:** New regular tables are upserted during block/cosmos indexing. A single migration creates tables, backfills data, drops MVs and their refresh jobs. Migration 041 (intermediate MV optimization) is superseded.

**Tech Stack:** PostgreSQL, TypeScript (Node.js), existing query batch pattern via `executeTransaction()`

---

### Task 1: Create the SQL Migration

**Files:**
- Create: `packages/graphql/database/migrations/043_replace_staking_mvs_with_agg_tables.sql`

**Step 1: Write the migration file**

```sql
-- Migration 043: Replace staking MVs with incremental aggregate tables
--
-- Problem: 6 staking MVs refresh daily, scanning entire cosmos_events/transactions/receipts.
-- total_staking_mv takes 8+ hours, causing table locks and degraded page loads.
--
-- Solution: Replace MVs with regular tables updated incrementally during indexing.
-- No background refresh needed. Eliminates all 6 MV refresh jobs.

-- ============================================================
-- 1. Create aggregate tables
-- ============================================================

CREATE TABLE IF NOT EXISTS indexer.daily_staked_agg (
    day DATE PRIMARY KEY,
    daily_staked NUMERIC NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS indexer.daily_unbond_agg (
    day DATE PRIMARY KEY,
    daily_unbond NUMERIC NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS indexer.daily_claims_agg (
    day DATE PRIMARY KEY,
    daily_claims NUMERIC NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS indexer.total_staking_agg (
    day DATE PRIMARY KEY,
    l1_staked NUMERIC NOT NULL DEFAULT 0,
    l2_staked NUMERIC NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS indexer.daily_inflows_agg (
    day DATE PRIMARY KEY,
    amount NUMERIC NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS indexer.daily_outflows_agg (
    day DATE PRIMARY KEY,
    amount NUMERIC NOT NULL DEFAULT 0
);

-- Grant read access
GRANT SELECT ON indexer.daily_staked_agg TO explorer_ro;
GRANT SELECT ON indexer.daily_unbond_agg TO explorer_ro;
GRANT SELECT ON indexer.daily_claims_agg TO explorer_ro;
GRANT SELECT ON indexer.total_staking_agg TO explorer_ro;
GRANT SELECT ON indexer.daily_inflows_agg TO explorer_ro;
GRANT SELECT ON indexer.daily_outflows_agg TO explorer_ro;

-- ============================================================
-- 2. Backfill from existing data
-- ============================================================

-- daily_staked_agg (from L2 fuel transactions)
INSERT INTO indexer.daily_staked_agg (day, daily_staked)
SELECT
    DATE_TRUNC('day', t."timestamp")::date AS day,
    SUM(CAST(r.receipt_amount AS BIGINT)) AS daily_staked
FROM
    indexer.transactions_accounts ta
JOIN indexer.transactions t
    ON ta.tx_hash = t.tx_hash
    AND t."data"->>'scriptData' LIKE '%76465706f736974%'
JOIN indexer.receipts r
    ON r.tx_hash = t.tx_hash
    AND r.receipt_type = 'CALL'
    AND r.receipt_to = '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c'
    AND CAST(r.receipt_amount AS BIGINT) > 0
WHERE
    ta.account_hash = '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c'
GROUP BY day
ON CONFLICT (day) DO UPDATE SET daily_staked = EXCLUDED.daily_staked;

-- daily_unbond_agg
INSERT INTO indexer.daily_unbond_agg (day, daily_unbond)
SELECT
    DATE_TRUNC('day', t."timestamp")::date AS day,
    SUM(CAST(r.receipt_amount AS BIGINT)) AS daily_unbond
FROM
    indexer.transactions_accounts ta
JOIN indexer.transactions t
    ON ta.tx_hash = t.tx_hash
    AND t."data"->>'scriptData' LIKE '%87769746864726177%'
JOIN indexer.receipts r
    ON r.tx_hash = ta.tx_hash
    AND r.receipt_type = 'TRANSFER_OUT'
    AND r.receipt_asset_id = '0x1d5d97005e41cae2187a895fd8eab0506111e0e2f3331cd3912c15c24e3c1d82'
    AND CAST(r.receipt_amount AS BIGINT) > 0
WHERE
    ta.account_hash = '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c'
GROUP BY day
ON CONFLICT (day) DO UPDATE SET daily_unbond = EXCLUDED.daily_unbond;

-- daily_claims_agg
INSERT INTO indexer.daily_claims_agg (day, daily_claims)
SELECT
    DATE_TRUNC('day', t."timestamp")::date AS day,
    (SUM(CAST(r.receipt_amount AS BIGINT)) / 1000000000) AS daily_claims
FROM
    indexer.transactions_accounts ta
JOIN indexer.transactions t
    ON ta.tx_hash = t.tx_hash
    AND t."data"->>'scriptData' LIKE '%d636c61696d5f72657761726473%'
JOIN indexer.receipts r
    ON r.tx_hash = ta.tx_hash
    AND r.receipt_type = 'TRANSFER_OUT'
    AND r.receipt_asset_id = '0x1d5d97005e41cae2187a895fd8eab0506111e0e2f3331cd3912c15c24e3c1d82'
    AND CAST(r.receipt_amount AS BIGINT) > 0
WHERE
    ta.account_hash = '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c'
GROUP BY day
ON CONFLICT (day) DO UPDATE SET daily_claims = EXCLUDED.daily_claims;

-- total_staking_agg - L1 cosmos side
INSERT INTO indexer.total_staking_agg (day, l1_staked, l2_staked)
SELECT
    DATE_TRUNC('day', cr."timestamp")::date AS day,
    SUM(CAST(TRIM(BOTH '"' FROM ce_amount.value) AS BIGINT)) AS l1_staked,
    0 AS l2_staked
FROM
    indexer.cosmos_responses cr
JOIN indexer.cosmos_events ce_del
    ON ce_del.cosmos_response_id = cr._id
    AND ce_del."type" = 'delegate'
    AND ce_del."key" = 'delegator'
    AND ce_del."value" != '0x85308a35b3ad660213ea91a5d37bbf9620708ecc'
JOIN indexer.cosmos_events ce_amount
    ON ce_amount.cosmos_response_id = cr._id
    AND ce_amount."type" = 'delegate'
    AND ce_amount."key" = 'amount'
    AND ce_amount."index" = ce_del."index"
GROUP BY day
ON CONFLICT (day) DO UPDATE SET l1_staked = EXCLUDED.l1_staked;

-- total_staking_agg - L2 fuel side (add to existing rows or create new)
INSERT INTO indexer.total_staking_agg (day, l1_staked, l2_staked)
SELECT
    DATE_TRUNC('day', t."timestamp")::date AS day,
    0 AS l1_staked,
    SUM(CAST(r.receipt_amount AS BIGINT)) AS l2_staked
FROM
    indexer.transactions_accounts ta
JOIN indexer.transactions t
    ON ta.tx_hash = t.tx_hash
    AND t."data"->>'scriptData' LIKE '%76465706f736974%'
JOIN indexer.receipts r
    ON r.tx_hash = ta.tx_hash
    AND r.receipt_type = 'CALL'
    AND r.receipt_to = '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c'
    AND CAST(r.receipt_amount AS BIGINT) > 0
WHERE
    ta.account_hash = '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c'
GROUP BY day
ON CONFLICT (day) DO UPDATE SET l2_staked = EXCLUDED.l2_staked;

-- daily_inflows_agg
INSERT INTO indexer.daily_inflows_agg (day, amount)
SELECT
    DATE_TRUNC('day', t."timestamp")::date AS day,
    SUM((i.data->>'amount')::numeric) AS amount
FROM
    indexer.transactions_accounts a
JOIN indexer.transactions t ON a.tx_hash = t.tx_hash
JOIN indexer.outputs i ON i.transaction_id = t._id
WHERE
    account_hash IN (
        '0xdb491b442f68ebaa785f077805158ebfddeede7063f16d5a26e1073ff6987601',
        '0xafdda1cd084ed0f56d35f570b2e9d34e7c7380191058e2a2fb16e0c58cbbc7c2'
    )
    AND i.data->>'assetId' = '0x1d5d97005e41cae2187a895fd8eab0506111e0e2f3331cd3912c15c24e3c1d82'
    AND i.data->>'to' NOT IN (
        '0xdb491b442f68ebaa785f077805158ebfddeede7063f16d5a26e1073ff6987601',
        '0xafdda1cd084ed0f56d35f570b2e9d34e7c7380191058e2a2fb16e0c58cbbc7c2'
    )
    AND i.data->>'__typename' = 'CoinOutput'
GROUP BY day
ON CONFLICT (day) DO UPDATE SET amount = EXCLUDED.amount;

-- daily_outflows_agg
INSERT INTO indexer.daily_outflows_agg (day, amount)
SELECT
    DATE_TRUNC('day', t."timestamp")::date AS day,
    SUM((i.data->>'amount')::numeric) AS amount
FROM
    indexer.transactions_accounts a
JOIN indexer.transactions t ON a.tx_hash = t.tx_hash
JOIN indexer.outputs i ON i.transaction_id = t._id
WHERE
    account_hash IN (
        '0xdb491b442f68ebaa785f077805158ebfddeede7063f16d5a26e1073ff6987601',
        '0xafdda1cd084ed0f56d35f570b2e9d34e7c7380191058e2a2fb16e0c58cbbc7c2'
    )
    AND i.data->>'assetId' = '0x1d5d97005e41cae2187a895fd8eab0506111e0e2f3331cd3912c15c24e3c1d82'
    AND i.data->>'to' IN (
        '0xdb491b442f68ebaa785f077805158ebfddeede7063f16d5a26e1073ff6987601',
        '0xafdda1cd084ed0f56d35f570b2e9d34e7c7380191058e2a2fb16e0c58cbbc7c2'
    )
    AND i.data->>'__typename' = 'CoinOutput'
GROUP BY day
ON CONFLICT (day) DO UPDATE SET amount = EXCLUDED.amount;

-- ============================================================
-- 3. Drop old materialized views
-- ============================================================

-- Drop views added by migration 041 first (depend on the originals)
DROP MATERIALIZED VIEW IF EXISTS indexer.total_staking_mv CASCADE;
DROP MATERIALIZED VIEW IF EXISTS indexer.cosmos_daily_staked_mv CASCADE;
DROP MATERIALIZED VIEW IF EXISTS indexer.fuel_daily_staked_mv CASCADE;

-- Drop original views from migration 019
DROP MATERIALIZED VIEW IF EXISTS indexer.daily_staked_mv CASCADE;
DROP MATERIALIZED VIEW IF EXISTS indexer.daily_unbond_mv CASCADE;
DROP MATERIALIZED VIEW IF EXISTS indexer.daily_claims_mv CASCADE;
DROP MATERIALIZED VIEW IF EXISTS indexer.inflows_mv CASCADE;
DROP MATERIALIZED VIEW IF EXISTS indexer.outflows_mv CASCADE;

-- ============================================================
-- 4. Remove MV refresh jobs from database_jobs
-- ============================================================

DELETE FROM indexer.database_jobs WHERE query LIKE '%daily_staked_mv%';
DELETE FROM indexer.database_jobs WHERE query LIKE '%daily_unbond_mv%';
DELETE FROM indexer.database_jobs WHERE query LIKE '%daily_claims_mv%';
DELETE FROM indexer.database_jobs WHERE query LIKE '%total_staking_mv%';
DELETE FROM indexer.database_jobs WHERE query LIKE '%inflows_mv%';
DELETE FROM indexer.database_jobs WHERE query LIKE '%outflows_mv%';
DELETE FROM indexer.database_jobs WHERE query LIKE '%cosmos_daily_staked_mv%';
DELETE FROM indexer.database_jobs WHERE query LIKE '%fuel_daily_staked_mv%';

-- ============================================================
-- 5. Optional: Add cleanup job to purge rows older than 90 days
-- ============================================================

INSERT INTO indexer.database_jobs (query, recurrent, interval_seconds, status)
VALUES (
    'DELETE FROM indexer.daily_staked_agg WHERE day < NOW() - INTERVAL ''90 days''; DELETE FROM indexer.daily_unbond_agg WHERE day < NOW() - INTERVAL ''90 days''; DELETE FROM indexer.daily_claims_agg WHERE day < NOW() - INTERVAL ''90 days''; DELETE FROM indexer.total_staking_agg WHERE day < NOW() - INTERVAL ''90 days''; DELETE FROM indexer.daily_inflows_agg WHERE day < NOW() - INTERVAL ''90 days''; DELETE FROM indexer.daily_outflows_agg WHERE day < NOW() - INTERVAL ''90 days'';',
    true, 86400, 'pending'
) ON CONFLICT (query) DO NOTHING;

-- Update migration version
UPDATE indexer.migration SET version = 43;
```

**Step 2: Verify migration syntax locally**

Run: `psql -h 127.0.0.1 -p 5435 -U postgres -d postgres -f packages/graphql/database/migrations/043_replace_staking_mvs_with_agg_tables.sql`
Expected: All statements complete without error. Tables created, backfill runs (fast on small local DB), MVs dropped.

**Step 3: Verify tables exist and backfill worked**

Run: `psql -h 127.0.0.1 -p 5435 -U postgres -d postgres -c "SELECT * FROM indexer.daily_staked_agg LIMIT 5; SELECT * FROM indexer.total_staking_agg LIMIT 5;"`
Expected: Rows present (or empty if local DB hasn't synced staking transactions yet — that's fine).

**Step 4: Verify MVs are gone**

Run: `psql -h 127.0.0.1 -p 5435 -U postgres -d postgres -c "SELECT matviewname FROM pg_matviews WHERE schemaname = 'indexer';"`
Expected: Only `hourly_statistics` and `recent_account_transactions_mv` remain.

**Step 5: Verify refresh jobs removed**

Run: `psql -h 127.0.0.1 -p 5435 -U postgres -d postgres -c "SELECT query FROM indexer.database_jobs WHERE query LIKE '%REFRESH%';"`
Expected: Only `hourly_statistics` and `recent_account_transactions_mv` refresh jobs remain.

---

### Task 2: Create Staking Constants File

**Files:**
- Create: `packages/graphql/src/constants/staking.ts`

**Step 1: Write the constants file**

```typescript
// Staking contract and asset constants used for incremental aggregation.
// These match the hardcoded values in migration 019 MV definitions.

export const STAKING_CONTRACT =
  '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c';

export const FUEL_ASSET_ID =
  '0x1d5d97005e41cae2187a895fd8eab0506111e0e2f3331cd3912c15c24e3c1d82';

export const TREASURY_ADDRESSES = [
  '0xdb491b442f68ebaa785f077805158ebfddeede7063f16d5a26e1073ff6987601',
  '0xafdda1cd084ed0f56d35f570b2e9d34e7c7380191058e2a2fb16e0c58cbbc7c2',
];

// Hex-encoded scriptData substrings that identify staking operations
export const SCRIPT_DATA_DEPOSIT = '76465706f736974'; // "deposit"
export const SCRIPT_DATA_WITHDRAW = '87769746864726177'; // "withdraw"
export const SCRIPT_DATA_CLAIM_REWARDS = 'd636c61696d5f72657761726473'; // "claim_rewards"

// Cosmos excluded delegator (internal/system delegator)
export const COSMOS_EXCLUDED_DELEGATOR =
  '0x85308a35b3ad660213ea91a5d37bbf9620708ecc';
```

---

### Task 3: Add Staking Aggregation to Block Consumer

**Files:**
- Modify: `packages/graphql/src/application/uc/NewAddBlockRange.ts`

**Step 1: Write the staking aggregation method**

Add to `NewAddBlockRange` class after the `getAccounts` method. This method inspects each transaction and its receipts/outputs for staking patterns, then returns upsert queries for the aggregate tables.

```typescript
// Add import at top of file:
import {
  STAKING_CONTRACT,
  FUEL_ASSET_ID,
  TREASURY_ADDRESSES,
  SCRIPT_DATA_DEPOSIT,
  SCRIPT_DATA_WITHDRAW,
  SCRIPT_DATA_CLAIM_REWARDS,
} from '~/constants/staking';

// Add method to class:
getStakingAggQueries(
  transactionData: GQLTransaction,
  timestamp: string,
): { statement: string; params: any }[] {
  const queries: { statement: string; params: any }[] = [];
  const scriptData = (transactionData as any).scriptData || '';
  const receipts = (transactionData as any).status?.receipts || [];
  const day = new Date(timestamp).toISOString().split('T')[0];

  // L2 staking deposit
  if (scriptData.includes(SCRIPT_DATA_DEPOSIT)) {
    for (const r of receipts) {
      if (
        r.__typename === 'CallReceipt' &&
        r.to === STAKING_CONTRACT &&
        BigInt(r.amount || '0') > 0n
      ) {
        queries.push({
          statement:
            'INSERT INTO indexer.daily_staked_agg (day, daily_staked) VALUES ($1, $2) ON CONFLICT (day) DO UPDATE SET daily_staked = indexer.daily_staked_agg.daily_staked + $2',
          params: [day, r.amount],
        });
        queries.push({
          statement:
            'INSERT INTO indexer.total_staking_agg (day, l1_staked, l2_staked) VALUES ($1, 0, $2) ON CONFLICT (day) DO UPDATE SET l2_staked = indexer.total_staking_agg.l2_staked + $2',
          params: [day, r.amount],
        });
      }
    }
  }

  // L2 unbonding withdrawal
  if (scriptData.includes(SCRIPT_DATA_WITHDRAW)) {
    for (const r of receipts) {
      if (
        r.__typename === 'TransferOutReceipt' &&
        r.assetId === FUEL_ASSET_ID &&
        BigInt(r.amount || '0') > 0n
      ) {
        queries.push({
          statement:
            'INSERT INTO indexer.daily_unbond_agg (day, daily_unbond) VALUES ($1, $2) ON CONFLICT (day) DO UPDATE SET daily_unbond = indexer.daily_unbond_agg.daily_unbond + $2',
          params: [day, r.amount],
        });
      }
    }
  }

  // L2 claim rewards
  if (scriptData.includes(SCRIPT_DATA_CLAIM_REWARDS)) {
    for (const r of receipts) {
      if (
        r.__typename === 'TransferOutReceipt' &&
        r.assetId === FUEL_ASSET_ID &&
        BigInt(r.amount || '0') > 0n
      ) {
        const claimAmount = BigInt(r.amount) / 1000000000n;
        queries.push({
          statement:
            'INSERT INTO indexer.daily_claims_agg (day, daily_claims) VALUES ($1, $2) ON CONFLICT (day) DO UPDATE SET daily_claims = indexer.daily_claims_agg.daily_claims + $2',
          params: [day, claimAmount.toString()],
        });
      }
    }
  }

  // Inflows/outflows from treasury addresses
  if (transactionData.outputs) {
    for (const output of transactionData.outputs) {
      if (
        output.__typename === 'CoinOutput' &&
        (output as any).assetId === FUEL_ASSET_ID
      ) {
        const to = (output as any).to;
        const amount = (output as any).amount;
        const isTreasuryAccount = transactionData.inputs?.some(
          (input: any) =>
            input.__typename === 'InputCoin' &&
            TREASURY_ADDRESSES.includes(input.owner),
        );

        if (isTreasuryAccount) {
          if (!TREASURY_ADDRESSES.includes(to)) {
            // Outflow: from treasury to external
            queries.push({
              statement:
                'INSERT INTO indexer.daily_inflows_agg (day, amount) VALUES ($1, $2) ON CONFLICT (day) DO UPDATE SET amount = indexer.daily_inflows_agg.amount + $2',
              params: [day, amount],
            });
          } else {
            // Inflow: to treasury
            queries.push({
              statement:
                'INSERT INTO indexer.daily_outflows_agg (day, amount) VALUES ($1, $2) ON CONFLICT (day) DO UPDATE SET amount = indexer.daily_outflows_agg.amount + $2',
              params: [day, amount],
            });
          }
        }
      }
    }
  }

  return queries;
}
```

**Step 2: Hook into the transaction processing loop**

In the `execute` method, after the outputs processing block (after line 159), add:

```typescript
// After the outputs block, before the closing of the transaction loop:
const stakingQueries = this.getStakingAggQueries(
  transactionData,
  block.timestamp,
);
queries.push(...stakingQueries);
```

**Step 3: Verify consumer still runs**

Run: `pnpm --filter=graphql run-dev:consumer`
Expected: Consumer starts without errors. New staking queries execute as part of the transaction batch.

---

### Task 4: Add Cosmos L1 Staking Aggregation

**Files:**
- Modify: `packages/graphql/src/application/uc/IndexCosmos.ts`

**Step 1: Add L1 delegation upsert after event insertion**

After the batch insert of `cosmos_events` (after line 74), add logic to detect `delegate` events and upsert into `total_staking_agg`:

```typescript
// Add import at top:
import { COSMOS_EXCLUDED_DELEGATOR } from '~/constants/staking';

// After the cosmos_events batch insert (after line 74), before height++:
// Aggregate L1 delegation events
for (const event of tx.events) {
  if (event.type === 'delegate') {
    const delegatorAttr = event.attributes.find(
      (a: any) => a.key === 'delegator',
    );
    const amountAttr = event.attributes.find(
      (a: any) => a.key === 'amount',
    );
    if (
      delegatorAttr &&
      amountAttr &&
      delegatorAttr.value !== COSMOS_EXCLUDED_DELEGATOR
    ) {
      const amount = amountAttr.value.replace(/[^0-9]/g, '');
      if (amount && BigInt(amount) > 0n) {
        const day = new Date(tx.timestamp).toISOString().split('T')[0];
        await connection.query(
          'INSERT INTO indexer.total_staking_agg (day, l1_staked, l2_staked) VALUES ($1, $2, 0) ON CONFLICT (day) DO UPDATE SET l1_staked = indexer.total_staking_agg.l1_staked + $2',
          [day, amount],
        );
      }
    }
  }
}
```

**Step 2: Verify cosmos indexer still runs**

Run: `pnpm --filter=graphql run-dev:cosmos`
Expected: Cosmos indexer starts and processes blocks. L1 delegation events are upserted into `total_staking_agg`.

---

### Task 5: Run Migration and End-to-End Verification

**Step 1: Run the migration on local DB**

Run: `cd packages/graphql && pnpm db:migrate`
Expected: Migration 043 applies successfully.

**Step 2: Verify aggregate tables exist**

Run: `psql -h 127.0.0.1 -p 5435 -U postgres -d postgres -c "\dt indexer.*agg*"`
Expected: 6 aggregate tables listed.

**Step 3: Verify MVs are dropped**

Run: `psql -h 127.0.0.1 -p 5435 -U postgres -d postgres -c "SELECT matviewname FROM pg_matviews WHERE schemaname = 'indexer';"`
Expected: Only `hourly_statistics` and `recent_account_transactions_mv`.

**Step 4: Verify refresh jobs cleaned up**

Run: `psql -h 127.0.0.1 -p 5435 -U postgres -d postgres -c "SELECT _id, query, status FROM indexer.database_jobs ORDER BY _id;"`
Expected: No jobs referencing any of the 6 dropped MVs or the 041 decomposed MVs.

**Step 5: Run full stack and verify aggregation works**

Run: `pnpm dev:graphql:all`
Expected: All 4 processes start. As blocks are synced, check aggregate tables for new data:
`psql -h 127.0.0.1 -p 5435 -U postgres -d postgres -c "SELECT * FROM indexer.daily_staked_agg ORDER BY day DESC LIMIT 5;"`

---

### Task 6: Commit

```bash
git add packages/graphql/database/migrations/043_replace_staking_mvs_with_agg_tables.sql
git add packages/graphql/src/constants/staking.ts
git add packages/graphql/src/application/uc/NewAddBlockRange.ts
git add packages/graphql/src/application/uc/IndexCosmos.ts
git commit -m "perf: replace staking MVs with incremental aggregate tables

Eliminates 8-hour materialized view refresh that was locking tables and
degrading page load times. Six staking MVs are replaced with regular
tables that are upserted during block/cosmos indexing."
```
