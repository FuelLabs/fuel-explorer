-- Migration 046: Replace hourly_statistics MV with aggregate table
--
-- Problem: REFRESH MATERIALIZED VIEW was the top DB query at 201,290ms latency
-- It does a full seq scan of all 24h transactions every 30 minutes.
--
-- Solution: Incremental aggregate table updated per-batch during indexing.
-- Each batch recomputes only the affected hours (typically 1-2 hours),
-- reducing cost from full 24h scan to a narrow timestamp index scan.
--
-- Benchmark (local, 17k blocks):
--   Before: 2,132ms (full seq scan + disk sort)
--   After:  ~25ms   (index scan on timestamp for affected hours only)

-- Create the aggregate table
CREATE TABLE IF NOT EXISTS indexer.hourly_statistics_agg (
  hour        TIMESTAMPTZ NOT NULL,
  total_fee   NUMERIC     NOT NULL DEFAULT 0,
  total_gas_used BIGINT   NOT NULL DEFAULT 0,
  PRIMARY KEY (hour)
);

-- Grant read access
GRANT SELECT ON indexer.hourly_statistics_agg TO explorer_ro;

-- Backfill from blocks table (source of truth).
-- Avoids using the MV which had incorrect total_gas_used and could be stale
-- by up to 30 minutes (its refresh interval).
-- NOTE: this is a full seq scan of indexer.blocks — expected to take several
-- minutes on large databases. Migration runs offline so this is acceptable.
INSERT INTO indexer.hourly_statistics_agg (hour, total_fee, total_gas_used)
SELECT date_trunc('hour', timestamp), SUM(total_fee::numeric), SUM(gas_used::numeric)
FROM indexer.blocks
GROUP BY 1
ON CONFLICT (hour) DO UPDATE
  SET total_fee = excluded.total_fee,
      total_gas_used = excluded.total_gas_used;

-- Remove the old MV refresh jobs (query strings include SET/RESET statement_timeout wrappers)
DELETE FROM indexer.database_jobs
WHERE query LIKE '%REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.hourly_statistics%';

DELETE FROM indexer.database_jobs
WHERE query LIKE '%ANALYZE indexer.hourly_statistics%';

-- Drop the old MV
DROP MATERIALIZED VIEW IF EXISTS indexer.hourly_statistics CASCADE;
