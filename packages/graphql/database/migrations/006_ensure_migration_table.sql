create table if not exists indexer.migration (
    version integer not null
);
update indexer.migration set version = 5;
