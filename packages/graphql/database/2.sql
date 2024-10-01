CREATE TABLE indexer.block_statistics (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL,
    number_of_blocks INTEGER NOT NULL,
    cumulative_block_reward NUMERIC NOT NULL,
    start_block INTEGER NOT NULL,
    end_block INTEGER NOT NULL
);

CREATE UNIQUE INDEX ON indexer.block_statistics(id);
CREATE INDEX ON indexer.block_statistics(timestamp);