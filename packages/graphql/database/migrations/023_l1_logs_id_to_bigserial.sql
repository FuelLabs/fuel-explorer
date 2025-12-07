BEGIN;
-- Change serial to bigserial (preserves auto-increment behavior)
ALTER TABLE indexer.contract_l1_logs ALTER COLUMN _id TYPE bigint USING _id::bigint;

-- Update the sequence to use bigint values
ALTER SEQUENCE indexer.contract_l1_logs__id_seq AS bigint;
COMMIT;