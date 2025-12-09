BEGIN;
-- Change serial to bigserial (preserves auto-increment behavior)
ALTER TABLE indexer.cosmos_responses ALTER COLUMN _id TYPE bigint USING _id::bigint;

-- Update the sequence to use bigint values
ALTER SEQUENCE indexer.cosmos_responses__id_seq AS bigint;
COMMIT;