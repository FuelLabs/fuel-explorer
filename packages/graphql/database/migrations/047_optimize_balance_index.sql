-- Migration 047: Add composite index for balance lookups
--
-- Problem: IndexBalance queries `select balance ... where account_hash = $1 and asset_id = $2
-- order by _id desc limit 1` at 43.27 calls/sec (top DB load query).
-- Separate single-column indexes on account_hash and asset_id force PostgreSQL
-- to use one index and filter/sort the rest, leading to excessive I/O.
--
-- Solution: Composite index on (account_hash, asset_id, _id DESC) so the query
-- becomes a single index seek with no post-filter sort.

CREATE INDEX CONCURRENTLY IF NOT EXISTS balance_account_asset_id_idx
ON indexer.balance (account_hash, asset_id, _id DESC);
