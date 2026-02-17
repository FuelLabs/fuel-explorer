BEGIN;
-- Preventive migration: predicates table also uses SERIAL (int4)
-- Converting to bigserial before hitting the max value limit
ALTER TABLE indexer.predicates ALTER COLUMN _id TYPE bigint USING _id::bigint;

-- Update the sequence to use bigint values
ALTER SEQUENCE indexer.predicates__id_seq AS bigint;
COMMIT;
