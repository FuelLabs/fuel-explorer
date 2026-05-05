-- Migration 050: Tune autovacuum thresholds for large tables
--
-- The default autovacuum scale factors (vacuum=0.1, analyze=0.05) require
-- autovacuum to wait for ~10% of the table to change before vacuuming and ~5%
-- before analyzing. On tables with hundreds of millions to billions of rows
-- this means autovacuum and autoanalyze rarely (or never) fire on the normal
-- write churn pattern, leaving stats stale and dead tuples accumulating.
--
-- Per-table overrides below scale the trigger thresholds proportionally to
-- table size so they fire on a more reasonable absolute change.

-- 1.92B rows; default analyze trigger ~96M rows of churn.
ALTER TABLE indexer.transactions_accounts
  SET (autovacuum_vacuum_scale_factor = 0.005,
       autovacuum_analyze_scale_factor = 0.001);

-- 5.01B rows; default analyze trigger ~250M rows of churn.
ALTER TABLE indexer.inputs
  SET (autovacuum_vacuum_scale_factor = 0.005,
       autovacuum_analyze_scale_factor = 0.001);

-- 548M rows; default analyze trigger ~27M rows of churn.
ALTER TABLE indexer.transactions
  SET (autovacuum_vacuum_scale_factor = 0.005,
       autovacuum_analyze_scale_factor = 0.001);

-- 462M rows with steady UPDATE churn (1%+ dead tuples observed); slightly
-- looser than the insert-mostly tables above.
ALTER TABLE indexer.balance
  SET (autovacuum_vacuum_scale_factor = 0.01,
       autovacuum_analyze_scale_factor = 0.005);
