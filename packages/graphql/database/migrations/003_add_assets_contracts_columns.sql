alter table indexer.assets_contracts add column block_id integer null;
alter table indexer.assets_contracts add column _id text null;

create index on indexer.assets_contracts (_id);
create index on indexer.assets_contracts (transaction_id);
create index on indexer.assets_contracts (sub_id);
create index on indexer.assets_contracts (block_id);
update indexer.migration set version = 2;
