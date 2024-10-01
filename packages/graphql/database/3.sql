CREATE TABLE indexer.transaction_statistics (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL,
    start_block INTEGER NOT NULL,
    end_block INTEGER NOT NULL,
    transaction_count INTEGER NOT NULL,
    transaction_count_cumulative INTEGER NOT NULL,
    gas_used INTEGER NOT NULL,
    gas_used_cumulative INTEGER NOT NULL,
    fee_spent INTEGER NOT NULL,
    fee_spent_cumulative INTEGER NOT NULL,
);

CREATE UNIQUE INDEX ON indexer.transaction_statistics(id);
CREATE INDEX ON indexer.transaction_statistics(timestamp);