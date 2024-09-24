create table indexer.assets_contracts (
	asset_id text not null,
	contract_id text not null,
	transaction_id text not null,
	name text,
	symbol text,
	decimals integer,
	error text,
	primary key (asset_id, contract_id)
);
create index on indexer.assets_contracts (asset_id);
create index on indexer.assets_contracts (contract_id);
