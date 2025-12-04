-- Migration 34: Optimize hourly_statistics MV from 7 days to 24 hours
--
-- Analysis: AWS Performance Insights showed hourly_statistics refresh was 36% of DB load
-- The API only queries 24 hours of data (BlockDAO.ts getTotalFee), but MV stored 7 days
--
-- Before: 7 days of data refreshed every 30 minutes
-- After:  24 hours of data refreshed every 30 minutes
--
-- Expected impact:
--   - ~7x reduction in refresh query cost
--   - ~7x reduction in MV storage size
--   - Faster refresh completion time

-- Recreate the materialized view with 24-hour window
DROP MATERIALIZED VIEW IF EXISTS indexer.hourly_statistics CASCADE;

CREATE MATERIALIZED VIEW indexer.hourly_statistics AS
SELECT
  date_trunc('hour', t."timestamp") AS hour,
  SUM((t.data->'status'->>'totalFee')::numeric) AS total_fee,
  SUM((t.data->'status'->>'gasUsed')::bigint) AS total_gas_used
FROM indexer.transactions t
WHERE t."timestamp" > NOW() - INTERVAL '24 hours'
GROUP BY date_trunc('hour', t."timestamp");

-- Recreate unique index for concurrent refresh
CREATE UNIQUE INDEX hourly_statistics_hour_idx
ON indexer.hourly_statistics(hour);

-- Grant read access to explorer_ro user
GRANT SELECT ON indexer.hourly_statistics TO explorer_ro;

-- Update migration version
UPDATE indexer.migration SET version = 34;

