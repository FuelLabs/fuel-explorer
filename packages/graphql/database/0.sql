create table transactions_accounts (
	tx_hash text not null,
	account_hash text not null,
	primary key (tx_hash, account_hash)
);
create index on transactions_accounts (tx_hash);
create index on transactions_accounts (account_hash);
