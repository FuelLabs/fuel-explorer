ALTER TABLE indexer.blocks ALTER COLUMN timestamp TYPE TIMESTAMPTZ USING timestamp AT TIME ZONE 'UTC';
ALTER TABLE indexer.transactions ALTER COLUMN timestamp TYPE TIMESTAMPTZ USING timestamp AT TIME ZONE 'UTC';

CREATE USER explorer_ro WITH PASSWORD '';
GRANT CONNECT ON DATABASE explorer TO explorer_ro;
GRANT USAGE ON SCHEMA indexer TO explorer_ro;
GRANT SELECT ON ALL TABLES IN SCHEMA indexer TO explorer_ro;
