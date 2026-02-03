BEGIN;
-- Change serial to bigserial (preserves auto-increment behavior)
ALTER TABLE indexer.receipts_data ALTER COLUMN _id TYPE bigint USING _id::bigint;

-- Update the sequence to use bigint values
ALTER SEQUENCE indexer.receipts_data__id_seq AS bigint;
COMMIT;