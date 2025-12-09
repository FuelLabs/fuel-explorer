create table if not exists indexer.assets_contracts (
	asset_id text not null,
	contract_id text not null,
	transaction_id text not null,
	sub_id text,
	name text,
	symbol text,
	decimals integer,
	error text,
	primary key (asset_id, contract_id)
);
create index if not exists assets_contracts_asset_id_idx on indexer.assets_contracts (asset_id);
create index if not exists assets_contracts_contract_id_idx on indexer.assets_contracts (contract_id);
update indexer.migration set version = 1;
