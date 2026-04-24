-- Migration 042: Drop unused and redundant indexes
--
-- Analysis from pg_stat_user_indexes (0 scans = never used by any query):
--
-- transactions_hash_idx (148 MB prod est.) - 0 scans, redundant with transactions_tx_hash_key (UNIQUE)
-- blocks_hash_idx (147 MB prod est.) - 0 scans, redundant with blocks_id_key (UNIQUE)
-- transactions_timestamp_idx (27 MB) - 0 scans, superseded by transactions_timestamp_idx1 (DESC)
-- blocks_da_height_idx (8.7 MB) - 0 scans, no code references
-- cosmos_events_type_idx - 2 scans, fully covered by (type, key, value) composite
-- cosmos_events_key_idx - 0 scans, fully covered by (type, key, value) composite
-- cosmos_events_value_idx - 0 scans, rarely queried standalone
--
-- Expected savings: ~330 MB+ on production (proportional to table growth)
-- Additional benefit: faster INSERT/UPDATE on these tables (fewer indexes to maintain)
--
-- NOTE: For production, run DROP INDEX CONCURRENTLY manually outside a transaction:
--   DROP INDEX CONCURRENTLY IF EXISTS indexer.transactions_hash_idx;
--   DROP INDEX CONCURRENTLY IF EXISTS indexer.blocks_hash_idx;
--   DROP INDEX CONCURRENTLY IF EXISTS indexer.transactions_timestamp_idx;
--   DROP INDEX CONCURRENTLY IF EXISTS indexer.blocks_da_height_idx;
--   DROP INDEX CONCURRENTLY IF EXISTS indexer.cosmos_events_type_idx;
--   DROP INDEX CONCURRENTLY IF EXISTS indexer.cosmos_events_key_idx;
--   DROP INDEX CONCURRENTLY IF EXISTS indexer.cosmos_events_value_idx;

-- For dev/local environments:
DROP INDEX IF EXISTS indexer.transactions_hash_idx;
DROP INDEX IF EXISTS indexer.blocks_hash_idx;
DROP INDEX IF EXISTS indexer.transactions_timestamp_idx;
DROP INDEX IF EXISTS indexer.blocks_da_height_idx;
DROP INDEX IF EXISTS indexer.cosmos_events_type_idx;
DROP INDEX IF EXISTS indexer.cosmos_events_key_idx;
DROP INDEX IF EXISTS indexer.cosmos_events_value_idx;

-- Update migration version
UPDATE indexer.migration SET version = 42;
