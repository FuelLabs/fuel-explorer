CREATE SCHEMA IF NOT EXISTS indexer;

CREATE TABLE IF NOT EXISTS indexer.blocks (
    _id integer PRIMARY KEY,
    id character varying(66) NOT NULL UNIQUE,
    timestamp timestamp without time zone NOT NULL,
    data jsonb NOT NULL,
    gas_used character varying(66),
    producer character varying(66)
);

CREATE INDEX IF NOT EXISTS blocks_id_idx ON indexer.blocks(_id);
CREATE INDEX IF NOT EXISTS blocks_hash_idx ON indexer.blocks(id);
CREATE INDEX IF NOT EXISTS blocks_timestamp_idx ON indexer.blocks(timestamp);

CREATE TABLE IF NOT EXISTS indexer.transactions (
    _id character varying(66) PRIMARY KEY,
    tx_hash character varying(66) NOT NULL UNIQUE,
    timestamp timestamp without time zone,
    data jsonb NOT NULL,
    block_id integer NOT NULL REFERENCES indexer.blocks(_id)
);

CREATE INDEX IF NOT EXISTS transactions_id_idx ON indexer.transactions(_id);
CREATE INDEX IF NOT EXISTS transactions_hash_idx ON indexer.transactions(tx_hash);
CREATE INDEX IF NOT EXISTS transactions_timestamp_idx ON indexer.transactions(timestamp);
CREATE INDEX IF NOT EXISTS transactions_block_id_idx ON indexer.transactions(block_id);

CREATE TABLE IF NOT EXISTS indexer.contracts (
    _id SERIAL PRIMARY KEY,
    contract_hash character varying(66) NOT NULL UNIQUE,
    data jsonb NOT NULL
);

CREATE INDEX IF NOT EXISTS contracts_id_idx ON indexer.contracts(_id);
CREATE INDEX IF NOT EXISTS contracts_hash_idx ON indexer.contracts(contract_hash);

CREATE TABLE IF NOT EXISTS indexer.inputs (
    _id SERIAL PRIMARY KEY,
    data jsonb NOT NULL,
    transaction_id character varying(66) NOT NULL REFERENCES indexer.transactions(_id)
);

CREATE INDEX IF NOT EXISTS inputs_id_idx ON indexer.inputs(_id);
CREATE INDEX IF NOT EXISTS inputs_transaction_id_idx ON indexer.inputs(transaction_id);

CREATE TABLE IF NOT EXISTS indexer.outputs (
    _id SERIAL PRIMARY KEY,
    data jsonb NOT NULL,
    transaction_id character varying(66) NOT NULL REFERENCES indexer.transactions(_id)
);

CREATE INDEX IF NOT EXISTS outputs_id_idx ON indexer.outputs(_id);
CREATE INDEX IF NOT EXISTS outputs_transaction_id_idx ON indexer.outputs(transaction_id);

CREATE TABLE IF NOT EXISTS indexer.predicates (
    _id SERIAL PRIMARY KEY,
    bytecode text NOT NULL,
    address character varying(66) NOT NULL UNIQUE
);

CREATE INDEX IF NOT EXISTS predicates_id_idx ON indexer.predicates(_id);
CREATE INDEX IF NOT EXISTS predicates_address_idx ON indexer.predicates(address);

CREATE TABLE IF NOT EXISTS indexer.transactions_accounts (
	_id text not null,
	block_id integer not null,
	tx_hash text not null,
	account_hash text not null,
	primary key (_id, block_id, tx_hash, account_hash)
);

CREATE INDEX IF NOT EXISTS transactions_accounts_id_idx ON indexer.transactions_accounts (_id);
CREATE INDEX IF NOT EXISTS transactions_accounts_block_id_idx ON indexer.transactions_accounts (block_id);
CREATE INDEX IF NOT EXISTS transactions_accounts_tx_hash_idx ON indexer.transactions_accounts (tx_hash);
CREATE INDEX IF NOT EXISTS transactions_accounts_account_hash_idx ON indexer.transactions_accounts (account_hash);

CREATE TABLE IF NOT EXISTS indexer.migration (
    version integer not null
);

INSERT INTO indexer.migration (version) SELECT 0 WHERE NOT EXISTS (SELECT 1 FROM indexer.migration);
