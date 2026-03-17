-- Migration 047: Add composite index for balance lookups
--
-- Problem: IndexBalance fetches the latest balance per (account_hash, asset_id) pair.
-- The new batched LATERAL query and the old per-pair query both use:
--   WHERE account_hash = $1 AND asset_id = $2 ORDER BY _id DESC LIMIT 1
-- Without a composite index, PostgreSQL uses separate single-column indexes and
-- must filter/sort remaining rows, leading to excessive I/O on the 96M+ row table.
--
-- Solution: Composite index on (account_hash, asset_id, _id DESC) so each lookup
-- becomes a single index seek returning exactly 1 row with no post-filter sort.
--
-- Benchmark (testnet, 96M rows, 20 pairs):
--   Before (DISTINCT ON, no composite index): 36,669ms, 676K rows fetched, 101MB disk sort
--   After  (LATERAL + this index):                0.3ms,    20 rows fetched, no sort

CREATE INDEX CONCURRENTLY IF NOT EXISTS balance_account_asset_id_idx
ON indexer.balance (account_hash, asset_id, _id DESC);
