create table if not exists indexer.balance_index (
    block_height integer not null
);

insert into indexer.balance_index (block_height) select 1 where not exists (select 1 from indexer.balance_index);

create table if not exists indexer.balance (
    _id serial not null,
    block_height integer not null,
    tx_hash text not null,
	account_hash text not null,
    asset_id text not null,
    balance text not null,
    primary key (_id)
);

create index if not exists balance_block_height_idx on indexer.balance (block_height);
create index if not exists balance_tx_hash_idx on indexer.balance (tx_hash);
create index if not exists balance_account_hash_idx on indexer.balance (account_hash);
create index if not exists balance_asset_id_idx on indexer.balance (asset_id);
create unique index if not exists balance_unique_idx on indexer.balance (tx_hash, account_hash, asset_id);
