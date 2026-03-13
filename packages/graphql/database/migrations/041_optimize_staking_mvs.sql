-- Migration 041: Add statement_timeout protection and composite index
--
-- Adds statement_timeout to all MV refresh jobs to prevent runaway queries,
-- and a composite index on cosmos_events for efficient delegate joins.

-- ============================================================
-- 1. Add composite index on cosmos_events for the delegate join pattern
--    (cosmos_response_id, type, key, index) covers the delegate join
-- ============================================================
CREATE INDEX CONCURRENTLY IF NOT EXISTS cosmos_events_resp_type_key_idx_idx
ON indexer.cosmos_events (cosmos_response_id, type, key, index);

-- ============================================================
-- 2. Add statement_timeout to heavy MV refresh jobs
--    Using CHR(59) to represent semicolons inside the query strings,
--    since the migration runner splits on literal semicolons.
-- ============================================================

-- hourly_statistics
UPDATE indexer.database_jobs
SET query = 'SET statement_timeout = ''10min''' || CHR(59) || ' REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.hourly_statistics' || CHR(59) || ' RESET statement_timeout' || CHR(59)
WHERE query = 'REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.hourly_statistics';

-- recent_account_transactions_mv
UPDATE indexer.database_jobs
SET query = 'SET statement_timeout = ''30min''' || CHR(59) || ' REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.recent_account_transactions_mv' || CHR(59) || ' RESET statement_timeout' || CHR(59)
WHERE query = 'REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.recent_account_transactions_mv';

-- Update migration version
UPDATE indexer.migration SET version = 41;
