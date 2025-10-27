alter table indexer.assets_contracts add column total_supply numeric default null;
update indexer.migration set version = 6;
