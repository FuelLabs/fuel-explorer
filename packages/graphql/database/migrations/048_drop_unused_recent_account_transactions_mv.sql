-- Migration 048: Drop unused recent_account_transactions_mv
--
-- This MV was created in migration 030 to optimize account transaction searches.
-- It is not queried anywhere in the codebase — confirmed by grep of all source files.
-- The 4-hour refresh job scans 7 days of transactions_accounts + transactions
-- and shows up as the #3 load query in Performance Insights despite zero consumers.

DELETE FROM indexer.database_jobs
WHERE query LIKE '%recent_account_transactions_mv%';

DROP MATERIALIZED VIEW IF EXISTS indexer.recent_account_transactions_mv CASCADE;
