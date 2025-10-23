alter table indexer.assets_contracts add column metadata jsonb default '{}';
update indexer.migration set version = 4;
