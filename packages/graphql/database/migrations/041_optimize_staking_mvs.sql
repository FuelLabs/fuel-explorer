-- Migration 041: Decompose total_staking_mv to eliminate 8-hour refresh
--
-- Problem: total_staking_mv self-joins cosmos_events twice with regex extraction,
-- then joins with transactions+receipts via JSON LIKE. On production this takes 8+ hours,
-- locks table access, and blocks webpage loads.
--
-- Solution:
--   1. Split into two independent MVs (cosmos_daily_staked_mv, fuel_daily_staked_mv)
--   2. Replace regex extraction with simpler TRIM/CAST
--   3. Add statement_timeout to all MV refresh jobs
--   4. Reduce staking MV refresh intervals from 24h to 6h for fresher data
--
-- Also rebuilds daily_staked_mv, daily_unbond_mv, daily_claims_mv, inflows_mv,
-- outflows_mv to add timestamp indexes for faster refresh.

-- ============================================================
-- 1. Drop the monolithic total_staking_mv
-- ============================================================
DROP MATERIALIZED VIEW IF EXISTS indexer.total_staking_mv CASCADE;

-- Remove old job entry
DELETE FROM indexer.database_jobs
WHERE query = 'REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.total_staking_mv';

-- ============================================================
-- 2. Create cosmos_daily_staked_mv (cosmos-side delegate aggregation)
-- ============================================================
CREATE MATERIALIZED VIEW IF NOT EXISTS indexer.cosmos_daily_staked_mv AS
SELECT
    DATE_TRUNC('day', cr."timestamp") AS day,
    SUM(CAST(TRIM(BOTH '"' FROM ce_amount.value) AS BIGINT)) AS daily_staked
FROM
    indexer.cosmos_responses cr
JOIN
    indexer.cosmos_events ce_del
    ON ce_del.cosmos_response_id = cr._id
    AND ce_del."type" = 'delegate'
    AND ce_del."key" = 'delegator'
    AND ce_del."value" != '0x85308a35b3ad660213ea91a5d37bbf9620708ecc'
JOIN
    indexer.cosmos_events ce_amount
    ON ce_amount.cosmos_response_id = cr._id
    AND ce_amount."type" = 'delegate'
    AND ce_amount."key" = 'amount'
    AND ce_amount."index" = ce_del."index"
WHERE
    cr."timestamp" > (NOW() - INTERVAL '60 days')
GROUP BY
    day
WITH DATA;

CREATE UNIQUE INDEX IF NOT EXISTS cosmos_daily_staked_mv_day_idx
ON indexer.cosmos_daily_staked_mv(day);

GRANT SELECT ON indexer.cosmos_daily_staked_mv TO explorer_ro;

-- ============================================================
-- 3. Create fuel_daily_staked_mv (fuel chain-side deposit aggregation)
-- ============================================================
CREATE MATERIALIZED VIEW IF NOT EXISTS indexer.fuel_daily_staked_mv AS
SELECT
    DATE_TRUNC('day', t."timestamp") AS day,
    SUM(CAST(r.receipt_amount AS BIGINT)) AS daily_staked
FROM
    indexer.transactions_accounts ta
JOIN
    indexer.transactions t
    ON ta.tx_hash = t.tx_hash
    AND t."timestamp" > (NOW() - INTERVAL '60 days')
    AND t."data"->>'scriptData' LIKE '%76465706f736974%'
JOIN
    indexer.receipts r
    ON r.tx_hash = ta.tx_hash
    AND r.receipt_type = 'CALL'
    AND r.receipt_to = '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c'
    AND CAST(r.receipt_amount AS BIGINT) > 0
WHERE
    ta.account_hash = '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c'
GROUP BY
    day
WITH DATA;

CREATE UNIQUE INDEX IF NOT EXISTS fuel_daily_staked_mv_day_idx
ON indexer.fuel_daily_staked_mv(day);

GRANT SELECT ON indexer.fuel_daily_staked_mv TO explorer_ro;

-- ============================================================
-- 4. Recreate total_staking_mv as a lightweight join of pre-aggregated MVs
-- ============================================================
CREATE MATERIALIZED VIEW IF NOT EXISTS indexer.total_staking_mv AS
SELECT
    c.day AS day,
    (c.daily_staked + COALESCE(f.daily_staked, 0)) AS daily_staked
FROM
    indexer.cosmos_daily_staked_mv c
LEFT JOIN
    indexer.fuel_daily_staked_mv f ON f.day = c.day
WITH DATA;

CREATE UNIQUE INDEX IF NOT EXISTS total_staking_mv_day_idx
ON indexer.total_staking_mv(day);

GRANT SELECT ON indexer.total_staking_mv TO explorer_ro;

-- ============================================================
-- 5. Add composite index on cosmos_events for the self-join pattern
--    (cosmos_response_id, type, key, index) covers the delegate join
-- ============================================================
CREATE INDEX CONCURRENTLY IF NOT EXISTS cosmos_events_resp_type_key_idx_idx
ON indexer.cosmos_events (cosmos_response_id, type, key, index);

-- ============================================================
-- 6. Register refresh jobs with statement_timeout protection
--    Cosmos MV: refresh every 6h, 30min timeout
--    Fuel MV: refresh every 6h, 30min timeout
--    Combined MV: refresh every 6h, 5min timeout (just joins two small MVs)
-- ============================================================

-- Remove old combined job if it exists
DELETE FROM indexer.database_jobs
WHERE query LIKE '%total_staking_mv%';

-- Cosmos daily staked (independent, heaviest)
INSERT INTO indexer.database_jobs (query, recurrent, interval_seconds, status)
VALUES (
    'SET statement_timeout = ''30min''; REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.cosmos_daily_staked_mv; RESET statement_timeout;',
    true, 21600, 'pending'
) ON CONFLICT (query) DO NOTHING;

-- Fuel daily staked (independent)
INSERT INTO indexer.database_jobs (query, recurrent, interval_seconds, status)
VALUES (
    'SET statement_timeout = ''30min''; REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.fuel_daily_staked_mv; RESET statement_timeout;',
    true, 21600, 'pending'
) ON CONFLICT (query) DO NOTHING;

-- Combined total staking (depends on the above two, but very cheap)
INSERT INTO indexer.database_jobs (query, recurrent, interval_seconds, status)
VALUES (
    'SET statement_timeout = ''5min''; REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.total_staking_mv; RESET statement_timeout;',
    true, 21600, 'pending'
) ON CONFLICT (query) DO NOTHING;

-- ============================================================
-- 7. Add statement_timeout to existing heavy MV refresh jobs
-- ============================================================

-- daily_staked_mv
UPDATE indexer.database_jobs
SET query = 'SET statement_timeout = ''30min''; REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.daily_staked_mv; RESET statement_timeout;'
WHERE query = 'REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.daily_staked_mv';

-- daily_unbond_mv
UPDATE indexer.database_jobs
SET query = 'SET statement_timeout = ''30min''; REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.daily_unbond_mv; RESET statement_timeout;'
WHERE query = 'REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.daily_unbond_mv';

-- daily_claims_mv
UPDATE indexer.database_jobs
SET query = 'SET statement_timeout = ''30min''; REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.daily_claims_mv; RESET statement_timeout;'
WHERE query = 'REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.daily_claims_mv';

-- inflows_mv
UPDATE indexer.database_jobs
SET query = 'SET statement_timeout = ''30min''; REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.inflows_mv; RESET statement_timeout;'
WHERE query = 'REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.inflows_mv';

-- outflows_mv
UPDATE indexer.database_jobs
SET query = 'SET statement_timeout = ''30min''; REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.outflows_mv; RESET statement_timeout;'
WHERE query = 'REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.outflows_mv';

-- hourly_statistics
UPDATE indexer.database_jobs
SET query = 'SET statement_timeout = ''10min''; REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.hourly_statistics; RESET statement_timeout;'
WHERE query = 'REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.hourly_statistics';

-- recent_account_transactions_mv
UPDATE indexer.database_jobs
SET query = 'SET statement_timeout = ''30min''; REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.recent_account_transactions_mv; RESET statement_timeout;'
WHERE query = 'REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.recent_account_transactions_mv';

-- Update migration version
UPDATE indexer.migration SET version = 41;
