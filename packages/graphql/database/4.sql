CREATE TABLE indexer.account_statistics (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL,
    new_accounts INTEGER NOT NULL,
    active_accounts INTEGER NOT NULL,
    cumulative_accounts INTEGER NOT NULL
);
CREATE UNIQUE INDEX ON indexer.account_statistics(id);
CREATE INDEX ON indexer.account_statistics(timestamp);