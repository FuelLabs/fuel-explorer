-- Migration 043: Replace staking materialized views with aggregate tables
--
-- Problem: The 6 staking materialized views (daily_staked_mv, daily_unbond_mv,
-- daily_claims_mv, total_staking_mv, inflows_mv, outflows_mv) refresh daily by
-- scanning millions of rows. The total_staking_mv alone was taking 8+ hours,
-- locking tables and degrading page loads.
--
-- Solution: Replace all MVs with regular aggregate tables that will be
-- incrementally updated during indexing. This eliminates the expensive full-table
-- scans and lock contention. Migration 041 partially addressed this by decomposing
-- total_staking_mv into smaller MVs -- this migration supersedes that by
-- eliminating all MVs entirely.

-- ============================================================================
-- Step 1: Create aggregate tables
-- ============================================================================

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

-- ============================================================================
-- Step 2: Grant SELECT to explorer_ro
-- ============================================================================

GRANT SELECT ON indexer.daily_staked_agg TO explorer_ro;
GRANT SELECT ON indexer.daily_unbond_agg TO explorer_ro;
GRANT SELECT ON indexer.daily_claims_agg TO explorer_ro;
GRANT SELECT ON indexer.total_staking_agg TO explorer_ro;
GRANT SELECT ON indexer.daily_inflows_agg TO explorer_ro;
GRANT SELECT ON indexer.daily_outflows_agg TO explorer_ro;

-- ============================================================================
-- Step 3: Backfill aggregate tables from existing data
-- ============================================================================

-- Backfill daily_staked_agg (L2 fuel staking deposits)
INSERT INTO indexer.daily_staked_agg (day, daily_staked)
SELECT DATE_TRUNC('day', t."timestamp")::date AS day, SUM(CAST(r.receipt_amount AS BIGINT))
FROM indexer.transactions_accounts ta
JOIN indexer.transactions t ON ta.tx_hash = t.tx_hash AND t."data"->>'scriptData' LIKE '%76465706f736974%'
JOIN indexer.receipts r ON r.tx_hash = t.tx_hash AND r.receipt_type = 'CALL' AND r.receipt_to = '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c' AND CAST(r.receipt_amount AS BIGINT) > 0
WHERE ta.account_hash = '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c'
GROUP BY day
ON CONFLICT (day) DO UPDATE SET daily_staked = EXCLUDED.daily_staked;

-- Backfill daily_unbond_agg
INSERT INTO indexer.daily_unbond_agg (day, daily_unbond)
SELECT DATE_TRUNC('day', t."timestamp")::date AS day, SUM(CAST(r.receipt_amount AS BIGINT))
FROM indexer.transactions_accounts ta
JOIN indexer.transactions t ON ta.tx_hash = t.tx_hash AND t."data"->>'scriptData' LIKE '%87769746864726177%'
JOIN indexer.receipts r ON r.tx_hash = ta.tx_hash AND r.receipt_type = 'TRANSFER_OUT' AND r.receipt_asset_id = '0x1d5d97005e41cae2187a895fd8eab0506111e0e2f3331cd3912c15c24e3c1d82' AND CAST(r.receipt_amount AS BIGINT) > 0
WHERE ta.account_hash = '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c'
GROUP BY day
ON CONFLICT (day) DO UPDATE SET daily_unbond = EXCLUDED.daily_unbond;

-- Backfill daily_claims_agg
INSERT INTO indexer.daily_claims_agg (day, daily_claims)
SELECT DATE_TRUNC('day', t."timestamp")::date AS day, (SUM(CAST(r.receipt_amount AS BIGINT)) / 1000000000)
FROM indexer.transactions_accounts ta
JOIN indexer.transactions t ON ta.tx_hash = t.tx_hash AND t."data"->>'scriptData' LIKE '%d636c61696d5f72657761726473%'
JOIN indexer.receipts r ON r.tx_hash = ta.tx_hash AND r.receipt_type = 'TRANSFER_OUT' AND r.receipt_asset_id = '0x1d5d97005e41cae2187a895fd8eab0506111e0e2f3331cd3912c15c24e3c1d82' AND CAST(r.receipt_amount AS BIGINT) > 0
WHERE ta.account_hash = '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c'
GROUP BY day
ON CONFLICT (day) DO UPDATE SET daily_claims = EXCLUDED.daily_claims;

-- Backfill total_staking_agg - L1 cosmos side
INSERT INTO indexer.total_staking_agg (day, l1_staked, l2_staked)
SELECT DATE_TRUNC('day', cr."timestamp")::date AS day, SUM(CAST(TRIM(BOTH '"' FROM ce_amount.value) AS BIGINT)), 0
FROM indexer.cosmos_responses cr
JOIN indexer.cosmos_events ce_del ON ce_del.cosmos_response_id = cr._id AND ce_del."type" = 'delegate' AND ce_del."key" = 'delegator' AND ce_del."value" != '0x85308a35b3ad660213ea91a5d37bbf9620708ecc'
JOIN indexer.cosmos_events ce_amount ON ce_amount.cosmos_response_id = cr._id AND ce_amount."type" = 'delegate' AND ce_amount."key" = 'amount' AND ce_amount."index" = ce_del."index"
GROUP BY day
ON CONFLICT (day) DO UPDATE SET l1_staked = EXCLUDED.l1_staked;

-- Backfill total_staking_agg - L2 fuel side
INSERT INTO indexer.total_staking_agg (day, l1_staked, l2_staked)
SELECT DATE_TRUNC('day', t."timestamp")::date AS day, 0, SUM(CAST(r.receipt_amount AS BIGINT))
FROM indexer.transactions_accounts ta
JOIN indexer.transactions t ON ta.tx_hash = t.tx_hash AND t."data"->>'scriptData' LIKE '%76465706f736974%'
JOIN indexer.receipts r ON r.tx_hash = ta.tx_hash AND r.receipt_type = 'CALL' AND r.receipt_to = '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c' AND CAST(r.receipt_amount AS BIGINT) > 0
WHERE ta.account_hash = '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c'
GROUP BY day
ON CONFLICT (day) DO UPDATE SET l2_staked = EXCLUDED.l2_staked;

-- Backfill daily_inflows_agg
INSERT INTO indexer.daily_inflows_agg (day, amount)
SELECT DATE_TRUNC('day', t."timestamp")::date AS day, SUM((i.data->>'amount')::numeric)
FROM indexer.transactions_accounts a
JOIN indexer.transactions t ON a.tx_hash = t.tx_hash
JOIN indexer.outputs i ON i.transaction_id = t._id
WHERE account_hash IN ('0xdb491b442f68ebaa785f077805158ebfddeede7063f16d5a26e1073ff6987601', '0xafdda1cd084ed0f56d35f570b2e9d34e7c7380191058e2a2fb16e0c58cbbc7c2')
AND i.data->>'assetId' = '0x1d5d97005e41cae2187a895fd8eab0506111e0e2f3331cd3912c15c24e3c1d82'
AND i.data->>'to' NOT IN ('0xdb491b442f68ebaa785f077805158ebfddeede7063f16d5a26e1073ff6987601', '0xafdda1cd084ed0f56d35f570b2e9d34e7c7380191058e2a2fb16e0c58cbbc7c2')
AND i.data->>'__typename' = 'CoinOutput'
GROUP BY day
ON CONFLICT (day) DO UPDATE SET amount = EXCLUDED.amount;

-- Backfill daily_outflows_agg
INSERT INTO indexer.daily_outflows_agg (day, amount)
SELECT DATE_TRUNC('day', t."timestamp")::date AS day, SUM((i.data->>'amount')::numeric)
FROM indexer.transactions_accounts a
JOIN indexer.transactions t ON a.tx_hash = t.tx_hash
JOIN indexer.outputs i ON i.transaction_id = t._id
WHERE account_hash IN ('0xdb491b442f68ebaa785f077805158ebfddeede7063f16d5a26e1073ff6987601', '0xafdda1cd084ed0f56d35f570b2e9d34e7c7380191058e2a2fb16e0c58cbbc7c2')
AND i.data->>'assetId' = '0x1d5d97005e41cae2187a895fd8eab0506111e0e2f3331cd3912c15c24e3c1d82'
AND i.data->>'to' IN ('0xdb491b442f68ebaa785f077805158ebfddeede7063f16d5a26e1073ff6987601', '0xafdda1cd084ed0f56d35f570b2e9d34e7c7380191058e2a2fb16e0c58cbbc7c2')
AND i.data->>'__typename' = 'CoinOutput'
GROUP BY day
ON CONFLICT (day) DO UPDATE SET amount = EXCLUDED.amount;

-- ============================================================================
-- Step 4: Drop old materialized views
-- ============================================================================

DROP MATERIALIZED VIEW IF EXISTS indexer.total_staking_mv CASCADE;
DROP MATERIALIZED VIEW IF EXISTS indexer.cosmos_daily_staked_mv CASCADE;
DROP MATERIALIZED VIEW IF EXISTS indexer.fuel_daily_staked_mv CASCADE;
DROP MATERIALIZED VIEW IF EXISTS indexer.daily_staked_mv CASCADE;
DROP MATERIALIZED VIEW IF EXISTS indexer.daily_unbond_mv CASCADE;
DROP MATERIALIZED VIEW IF EXISTS indexer.daily_claims_mv CASCADE;
DROP MATERIALIZED VIEW IF EXISTS indexer.inflows_mv CASCADE;
DROP MATERIALIZED VIEW IF EXISTS indexer.outflows_mv CASCADE;

-- ============================================================================
-- Step 5: Delete MV refresh jobs from database_jobs
-- ============================================================================

DELETE FROM indexer.database_jobs WHERE query LIKE '%daily_staked_mv%';
DELETE FROM indexer.database_jobs WHERE query LIKE '%daily_unbond_mv%';
DELETE FROM indexer.database_jobs WHERE query LIKE '%daily_claims_mv%';
DELETE FROM indexer.database_jobs WHERE query LIKE '%total_staking_mv%';
DELETE FROM indexer.database_jobs WHERE query LIKE '%inflows_mv%';
DELETE FROM indexer.database_jobs WHERE query LIKE '%outflows_mv%';
DELETE FROM indexer.database_jobs WHERE query LIKE '%cosmos_daily_staked_mv%';
DELETE FROM indexer.database_jobs WHERE query LIKE '%fuel_daily_staked_mv%';

-- ============================================================================
-- Step 6: Add cleanup job for rows older than 90 days
-- ============================================================================

INSERT INTO indexer.database_jobs (query, recurrent, interval_seconds, status)
VALUES (
    'DELETE FROM indexer.daily_staked_agg WHERE day < NOW() - INTERVAL ''90 days''; DELETE FROM indexer.daily_unbond_agg WHERE day < NOW() - INTERVAL ''90 days''; DELETE FROM indexer.daily_claims_agg WHERE day < NOW() - INTERVAL ''90 days''; DELETE FROM indexer.total_staking_agg WHERE day < NOW() - INTERVAL ''90 days''; DELETE FROM indexer.daily_inflows_agg WHERE day < NOW() - INTERVAL ''90 days''; DELETE FROM indexer.daily_outflows_agg WHERE day < NOW() - INTERVAL ''90 days'';',
    true, 86400, 'pending'
) ON CONFLICT (query) DO NOTHING;

-- ============================================================================
-- Step 7: Update migration version
-- ============================================================================

UPDATE indexer.migration SET version = 43;
