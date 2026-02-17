-- Preventive migration: inputs table also uses SERIAL (int4)
-- Converting to bigserial before hitting the max value limit
ALTER TABLE indexer.inputs ALTER COLUMN _id TYPE bigint USING _id::bigint;

-- Update the sequence to use bigint values
ALTER SEQUENCE indexer.inputs__id_seq AS bigint;
