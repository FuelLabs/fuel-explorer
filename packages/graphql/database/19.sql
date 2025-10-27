BEGIN;
-- Change serial to bigserial (preserves auto-increment behavior)
ALTER TABLE indexer.receipts ALTER COLUMN _id TYPE bigint USING _id::bigint;

-- Update the sequence to use bigint values
ALTER SEQUENCE indexer.receipts__id_seq AS bigint;

-- Update foreign key column in receipts_data table (this table actually exists)
ALTER TABLE indexer.receipts_data ALTER COLUMN receipt_id TYPE bigint;
COMMIT;