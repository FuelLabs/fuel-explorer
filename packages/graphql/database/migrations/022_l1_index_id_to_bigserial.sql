BEGIN;
-- Change serial to bigserial (preserves auto-increment behavior)
ALTER TABLE indexer.contract_l1_index ALTER COLUMN _id TYPE bigint USING _id::bigint;

-- Update the sequence to use bigint values
ALTER SEQUENCE indexer.contract_l1_index__id_seq AS bigint;
COMMIT;