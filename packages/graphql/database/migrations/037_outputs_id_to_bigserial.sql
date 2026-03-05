-- Change serial to bigserial (preserves auto-increment behavior)
-- The outputs table hit the max value of its int4 sequence (2,147,483,647)
-- This was missed in the original bigserial migrations (020-027)
ALTER TABLE indexer.outputs ALTER COLUMN _id TYPE bigint USING _id::bigint;

-- Update the sequence to use bigint values
ALTER SEQUENCE indexer.outputs__id_seq AS bigint;
