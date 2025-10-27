ALTER TABLE indexer.blocks
ADD COLUMN total_fee character varying(66);
ALTER TABLE indexer.contract_l1_logs ALTER COLUMN timestamp TYPE TIMESTAMPTZ USING timestamp AT TIME ZONE 'UTC';
ALTER TABLE indexer.cosmos_responses ALTER COLUMN timestamp TYPE TIMESTAMPTZ USING timestamp AT TIME ZONE 'UTC';
