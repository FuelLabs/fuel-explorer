create table transactions_accounts (
	_id text not null,
	block_id integer not null,
	tx_hash text not null,
	account_hash text not null,
	primary key (_id, block_id, tx_hash, account_hash)
);
create index on transctions_accounts (_id);
create index on transactions_accounts (block_id);
create index on transactions_accounts (tx_hash);
create index on transactions_accounts (account_hash);
