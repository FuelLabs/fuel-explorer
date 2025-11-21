-- Create materialized view for hourly statistics to eliminate expensive JSON extraction
-- getTotalFee() query was taking 11+ seconds due to full table scan + JSON extraction
-- This view pre-computes hourly aggregations and refreshes every 10 minutes

-- Force drop if exists (handle stuck migrations)
DROP MATERIALIZED VIEW IF EXISTS indexer.hourly_statistics CASCADE;
DROP INDEX IF EXISTS hourly_statistics_hour_idx;

-- Create the materialized view
CREATE MATERIALIZED VIEW indexer.hourly_statistics AS
SELECT
  date_trunc('hour', t."timestamp") AS hour,
  SUM((t.data->'status'->>'totalFee')::numeric) AS total_fee,
  SUM((t.data->'status'->>'gasUsed')::bigint) AS total_gas_used
FROM indexer.transactions t
WHERE t."timestamp" > NOW() - INTERVAL '30 days'
GROUP BY date_trunc('hour', t."timestamp");

-- Create unique index for concurrent refresh (required for CONCURRENTLY keyword)
CREATE UNIQUE INDEX hourly_statistics_hour_idx
ON indexer.hourly_statistics(hour);

-- Grant read access to explorer_ro user
GRANT SELECT ON indexer.hourly_statistics TO explorer_ro;

-- Schedule periodic refresh every 10 minutes (600 seconds)
INSERT INTO indexer.database_jobs (query, recurrent, interval_seconds, status)
VALUES (
  'REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.hourly_statistics',
  true,
  600,
  'pending'
)
ON CONFLICT DO NOTHING;

-- Add ANALYZE job for this view (daily)
INSERT INTO indexer.database_jobs (query, recurrent, interval_seconds, status)
VALUES (
  'ANALYZE indexer.hourly_statistics',
  true,
  86400,
  'pending'
)
ON CONFLICT DO NOTHING;
