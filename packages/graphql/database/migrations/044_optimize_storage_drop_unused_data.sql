-- Migration 044: Optimize storage by removing unused data
--
-- Problem: Three tables store data the API never reads, consuming ~53GB locally
-- and likely 500GB+ in production:
--   - outputs (6.4GB): Never read by any DAO or resolver
--   - receipts (37GB): Only 42 MESSAGE_OUT rows out of 86M are ever read
--   - inputs (9.6GB): Only the nonce field is read (for bridge withdrawals)
--
-- Solution: Truncate outputs, delete non-MESSAGE_OUT receipts, extract nonce
-- from inputs JSON and drop the data column.

-- ============================================================================
-- Step 1: Truncate outputs table (never read by API)
-- ============================================================================

TRUNCATE indexer.outputs;

-- ============================================================================
-- Step 2: Delete non-MESSAGE_OUT receipts (only type read by BridgeDAO)
-- ============================================================================

DELETE FROM indexer.receipts WHERE receipt_type != 'MESSAGE_OUT';

-- ============================================================================
-- Step 3: Truncate receipts_data (write-only, never read by API)
-- ============================================================================

TRUNCATE indexer.receipts_data;

-- ============================================================================
-- Step 4: Extract nonce from inputs JSON, drop data column
-- ============================================================================

ALTER TABLE indexer.inputs ADD COLUMN IF NOT EXISTS nonce TEXT;

UPDATE indexer.inputs SET nonce = data->>'nonce' WHERE data IS NOT NULL;

ALTER TABLE indexer.inputs DROP COLUMN IF EXISTS data;

CREATE INDEX IF NOT EXISTS idx_inputs_nonce ON indexer.inputs (nonce) WHERE nonce IS NOT NULL;

-- ============================================================================
-- Step 5: Update migration version
-- ============================================================================

UPDATE indexer.migration SET version = 44;
