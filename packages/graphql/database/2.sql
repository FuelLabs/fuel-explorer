DROP TABLE indexer.accounts cascade;
CREATE TABLE indexer.accounts (
    _id SERIAL PRIMARY KEY,
    account_id character varying(66) NOT NULL UNIQUE,
    balance BIGINT NOT NULL DEFAULT 0,
    transaction_count INTEGER NOT NULL DEFAULT 0,
    first_transaction_timestamp timestamp without time zone NOT NULL,
    recent_transaction_timestamp timestamp without time zone NOT NULL
);
CREATE UNIQUE INDEX ON indexer.accounts(_id);
CREATE UNIQUE INDEX ON indexer.accounts(account_id);
CREATE INDEX ON indexer.accounts(transaction_count);
CREATE INDEX ON indexer.accounts(recent_transaction_timestamp);
CREATE INDEX ON indexer.accounts(first_transaction_timestamp);