alter table indexer.blocks add column transactions_count integer null;
update indexer.migration set version = 8;
