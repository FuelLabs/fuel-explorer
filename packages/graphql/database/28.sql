-- Add composite indexes for search query performance optimization
-- These indexes optimize queries that filter by account_hash and order by _id

-- Composite index for getRecentTransactionsByOwner query (account_hash, _id DESC)
-- This allows the query to use index-only scan when fetching recent transactions for an account
CREATE INDEX ON indexer.transactions_accounts (account_hash, _id DESC);

-- Index on asset_id for fast asset lookups
CREATE INDEX ON indexer.assets_contracts (asset_id);
