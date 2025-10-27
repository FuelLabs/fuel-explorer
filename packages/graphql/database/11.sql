create table indexer.balance_index (
    block_height integer not null
);

insert into indexer.balance_index (block_height) values (1);

create table indexer.balance (
    _id serial not null,
    block_height integer not null,
    tx_hash text not null,
	account_hash text not null,
    asset_id text not null,
    balance text not null,
    primary key (_id)
);

create index on indexer.balance (block_height);
create index on indexer.balance (tx_hash);
create index on indexer.balance (account_hash);
create index on indexer.balance (asset_id);
create unique index on indexer.balance (tx_hash, account_hash, asset_id);
