-- Add indexes for statistics queries optimization
-- These queries scan the full transactions/blocks table filtered by timestamp
-- Without these indexes, AWS RDS performs expensive sequential scans

-- Index on transactions.timestamp for getTotalFee() and other statistics queries
-- This is critical because getTotalFee scans all transactions from the last 24 hours
CREATE INDEX ON indexer.transactions ("timestamp" DESC);

-- Index on blocks.timestamp for tps(), getMaxTps(), and other block statistics
-- Queries filter by timestamp range to get last 24 hours of data
CREATE INDEX ON indexer.blocks ("timestamp" DESC);

-- Consider adding a BRIN index for even better performance on very large tables
-- BRIN indexes are more efficient for naturally sorted data like timestamps
-- CREATE INDEX ON indexer.transactions USING BRIN ("timestamp");

-- Add to maintenance jobs for periodic ANALYZE to update index statistics
INSERT INTO indexer.database_jobs (query, recurrent, interval_seconds, status)
VALUES
  ('ANALYZE indexer.transactions', true, 86400, 'pending'),
  ('ANALYZE indexer.blocks', true, 86400, 'pending')
ON CONFLICT DO NOTHING;
