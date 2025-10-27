alter table indexer.assets_contracts add column owner text null;
create index on indexer.assets_contracts (owner);
update indexer.migration set version = 3;
