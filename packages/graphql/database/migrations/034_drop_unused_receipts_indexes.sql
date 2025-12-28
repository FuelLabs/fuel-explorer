-- Migration 33: Drop unused indexes on receipts table
-- 
-- Analysis: Performance Insights showed INSERT INTO indexer.receipts was 73% of DB load
-- Index usage stats revealed 3 indexes with 0 scans consuming ~28 GB
-- 
-- Findings:
--   receipts_transaction_id_idx: 0 scans, 11 GB - no code queries by transaction_id
--   receipts_receipt_type_idx:   0 scans, 8.3 GB - filter applied after tx_hash join
--   receipts_receipt_to_idx:     0 scans, 8.5 GB - filter applied after tx_hash join
--
-- Expected impact:
--   - ~40% reduction in INSERT latency (3 fewer indexes to maintain)
--   - ~28 GB disk space savings
--
-- NOTE: For production, run DROP INDEX CONCURRENTLY manually (cannot run in transaction):
--   DROP INDEX CONCURRENTLY IF EXISTS indexer.receipts_transaction_id_idx;
--   DROP INDEX CONCURRENTLY IF EXISTS indexer.receipts_receipt_type_idx;
--   DROP INDEX CONCURRENTLY IF EXISTS indexer.receipts_receipt_to_idx;

-- For dev/local environments (small tables, ok to lock briefly):
DROP INDEX IF EXISTS indexer.receipts_transaction_id_idx;
DROP INDEX IF EXISTS indexer.receipts_receipt_type_idx;
DROP INDEX IF EXISTS indexer.receipts_receipt_to_idx;

-- Update migration version
UPDATE indexer.migration SET version = 33;
