-- Convert timestamps to timestamptz
ALTER TABLE indexer.blocks ALTER COLUMN timestamp TYPE TIMESTAMPTZ USING timestamp AT TIME ZONE 'UTC';
ALTER TABLE indexer.transactions ALTER COLUMN timestamp TYPE TIMESTAMPTZ USING timestamp AT TIME ZONE 'UTC';

-- Grant permissions to read-only user (user may not exist in dev, that's ok)
GRANT USAGE ON SCHEMA indexer TO explorer_ro;
GRANT SELECT ON ALL TABLES IN SCHEMA indexer TO explorer_ro;
