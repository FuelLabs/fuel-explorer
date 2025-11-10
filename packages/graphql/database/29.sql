-- Create materialized view for recent account transactions (last 7 days)
-- This optimizes searches for accounts with many transactions by avoiding full table scans
-- The view includes a unique index for concurrent refresh capability

CREATE MATERIALIZED VIEW IF NOT EXISTS indexer.recent_account_transactions_mv AS
SELECT
  account_hash,
  tx_hash,
  _id,
  block_id,
  created_at
FROM
  indexer.transactions_accounts
WHERE
  created_at > NOW() - INTERVAL '7 days'
WITH DATA;

-- Create unique index for concurrent refresh (required for CONCURRENTLY keyword)
CREATE UNIQUE INDEX IF NOT EXISTS recent_account_transactions_mv_idx
ON indexer.recent_account_transactions_mv(account_hash, _id DESC);

-- Grant read access to explorer_ro user
GRANT SELECT ON indexer.recent_account_transactions_mv TO explorer_ro;

-- Add to database jobs for periodic refresh (every 4 hours to keep data fresh)
INSERT INTO indexer.database_jobs (query, recurrent, interval_seconds, status)
VALUES (
  'REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.recent_account_transactions_mv',
  true,
  14400,
  'pending'
)
ON CONFLICT DO NOTHING;
