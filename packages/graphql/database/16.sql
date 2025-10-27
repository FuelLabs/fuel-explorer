ALTER TABLE indexer.blocks ADD COLUMN da_height text;
create index on indexer.blocks (da_height);