BEGIN;
-- Preventive migration: contracts table also uses SERIAL (int4)
-- Converting to bigserial before hitting the max value limit
ALTER TABLE indexer.contracts ALTER COLUMN _id TYPE bigint USING _id::bigint;

-- Update the sequence to use bigint values
ALTER SEQUENCE indexer.contracts__id_seq AS bigint;
COMMIT;
