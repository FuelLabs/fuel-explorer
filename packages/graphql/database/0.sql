DROP SCHEMA indexer cascade;
CREATE SCHEMA indexer;

CREATE TABLE indexer.blocks (
    _id integer PRIMARY KEY,
    id character varying(66) NOT NULL UNIQUE,
    timestamp timestamp without time zone NOT NULL,
    data jsonb NOT NULL,
    gas_used character varying(66),
    producer character varying(66)
);

CREATE UNIQUE INDEX ON indexer.blocks(_id);
CREATE UNIQUE INDEX ON indexer.blocks(id);
CREATE INDEX ON indexer.blocks(timestamp);
CREATE INDEX ON indexer.blocks(id);
CREATE INDEX ON indexer.blocks(_id);

CREATE TABLE indexer.transactions (
    _id character varying(66) PRIMARY KEY,
    tx_hash character varying(66) NOT NULL UNIQUE,
    timestamp timestamp without time zone,
    data jsonb NOT NULL,
    block_id integer NOT NULL REFERENCES indexer.blocks(_id)
);

CREATE UNIQUE INDEX ON indexer.transactions(_id);
CREATE UNIQUE INDEX ON indexer.transactions(tx_hash);
CREATE INDEX ON indexer.transactions(timestamp);
CREATE INDEX ON indexer.transactions(_id);
CREATE INDEX ON indexer.transactions(block_id);
CREATE INDEX ON indexer.transactions(tx_hash);

CREATE TABLE indexer.contracts (
    _id SERIAL PRIMARY KEY,
    contract_hash character varying(66) NOT NULL UNIQUE,
    data jsonb NOT NULL
);

CREATE UNIQUE INDEX ON indexer.contracts(_id);
CREATE UNIQUE INDEX ON indexer.contracts(contract_hash);
CREATE INDEX ON indexer.contracts(_id);
CREATE INDEX ON indexer.contracts(contract_hash);

CREATE TABLE indexer.inputs (
    _id SERIAL PRIMARY KEY,
    data jsonb NOT NULL,
    transaction_id character varying(66) NOT NULL REFERENCES indexer.transactions(_id)
);

CREATE UNIQUE INDEX ON indexer.inputs(_id);
CREATE INDEX ON indexer.inputs(_id);
CREATE INDEX ON indexer.inputs(transaction_id);

CREATE TABLE indexer.outputs (
    _id SERIAL PRIMARY KEY,
    data jsonb NOT NULL,
    transaction_id character varying(66) NOT NULL REFERENCES indexer.transactions(_id)
);

CREATE UNIQUE INDEX ON indexer.outputs(_id);
CREATE INDEX ON indexer.outputs(_id);
CREATE INDEX ON indexer.outputs(transaction_id);

CREATE TABLE indexer.predicates (
    _id SERIAL PRIMARY KEY,
    bytecode text NOT NULL,
    address character varying(66) NOT NULL UNIQUE
);

CREATE UNIQUE INDEX ON indexer.predicates(_id);
CREATE UNIQUE INDEX ON indexer.predicates(address);
CREATE INDEX ON indexer.predicates(_id);
CREATE INDEX ON indexer.predicates(address);

create table indexer.transactions_accounts (
	_id text not null,
	block_id integer not null,
	tx_hash text not null,
	account_hash text not null,
	primary key (_id, block_id, tx_hash, account_hash)
);
create index on indexer.transactions_accounts (_id);
create index on indexer.transactions_accounts (block_id);
create index on indexer.transactions_accounts (tx_hash);
create index on indexer.transactions_accounts (account_hash);

CREATE TABLE indexer.accounts (
    _id SERIAL PRIMARY KEY,
    account_id character varying(66) NOT NULL UNIQUE,
    transaction_count INTEGER NOT NULL DEFAULT 0,
    data jsonb NOT NULL DEFAULT '{}',
    first_transaction_timestamp timestamp without time zone NOT NULL,
    recent_transaction_timestamp timestamp without time zone NOT NULL
);
CREATE UNIQUE INDEX ON indexer.accounts(_id);
CREATE UNIQUE INDEX ON indexer.accounts(account_id);
CREATE INDEX ON indexer.accounts(transaction_count);
CREATE INDEX ON indexer.accounts(recent_transaction_timestamp);
CREATE INDEX ON indexer.accounts(first_transaction_timestamp);