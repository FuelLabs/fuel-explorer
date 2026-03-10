-- Migration 045: Reclaim disk space from deleted receipts
--
-- Migration 044 deleted ~86M non-MESSAGE_OUT rows from indexer.receipts using DELETE.
-- DELETE marks rows as dead tuples but doesn't release disk space.
-- VACUUM FULL rewrites the table, reclaiming all dead tuple space.
--
-- WARNING: VACUUM FULL takes an exclusive lock on the table.
-- Run during a maintenance window when the syncer is stopped.
-- Expected to reclaim ~37GB in production.

VACUUM FULL indexer.receipts;

-- Also vacuum inputs after dropping the data column in migration 044
VACUUM FULL indexer.inputs;

UPDATE indexer.migration SET version = 45;
