-- Migration 34: Add VACUUM job for receipts table
--
-- After dropping 3 unused indexes (migration 33), add recurring VACUUM
-- to maintain table health and reclaim dead tuple space.
--
-- VACUUM ANALYZE:
--   - Reclaims space from dead tuples (from updates/deletes)
--   - Updates statistics for query planner
--   - Does NOT lock the table (safe for production)

-- Add VACUUM ANALYZE job for receipts (every 12 hours = 43200 seconds)
-- This is more frequent than other tables due to high INSERT volume (~195/sec)
INSERT INTO indexer.database_jobs (query, recurrent, interval_seconds, status)
VALUES ('VACUUM ANALYZE indexer.receipts', true, 43200, 'pending')
ON CONFLICT (query) DO NOTHING;

-- Update migration version
UPDATE indexer.migration SET version = 34;
