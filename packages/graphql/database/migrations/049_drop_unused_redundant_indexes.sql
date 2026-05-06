-- Migration 049: Drop unused redundant indexes
--
-- Each index below has 0 (or 1) scans in pg_stat_user_indexes, is not backed
-- by a UNIQUE/PK constraint, and is either an exact-column duplicate of
-- another index or fully covered as a leading-column prefix of a wider
-- composite. Dropping them changes no current query plan and removes the
-- corresponding write amplification.

-- Non-unique duplicate of UNIQUE blocks_id_key (constraint).
DROP INDEX CONCURRENTLY IF EXISTS indexer.blocks_id_idx1;

-- Single-column (_id) covered by leading column of the composite PK
-- (_id, block_id, tx_hash, account_hash).
DROP INDEX CONCURRENTLY IF EXISTS indexer.transactions_accounts__id_idx;

-- Non-unique duplicate of inputs_pkey on (_id).
DROP INDEX CONCURRENTLY IF EXISTS indexer.inputs__id_idx1;

-- Single-column (tx_hash) covered by leading column of the composite UNIQUE
-- balance_tx_hash_account_hash_asset_id_idx (tx_hash, account_hash, asset_id).
DROP INDEX CONCURRENTLY IF EXISTS indexer.balance_tx_hash_idx;

-- Identical column definition to balance_account_asset_id_idx2
-- on (account_hash, asset_id, _id DESC) — the latter is the one in active use.
DROP INDEX CONCURRENTLY IF EXISTS indexer.balance_account_hash_asset_id__id_idx;
