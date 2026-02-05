drop table if exists indexer.cosmos_events;
drop table if exists indexer.cosmos_responses;
drop table if exists indexer.cosmos_index;

create table if not exists indexer.cosmos_index (
    block_height int
);

create table if not exists indexer.cosmos_responses (
    _id serial primary key,
    block_height int,
    tx_hash text,
    data text,
    timestamp timestamp without time zone
);

create index if not exists cosmos_responses_block_height_idx on indexer.cosmos_responses (block_height);
create index if not exists cosmos_responses_tx_hash_idx on indexer.cosmos_responses (tx_hash);
create index if not exists cosmos_responses_timestamp_idx on indexer.cosmos_responses (timestamp);

create table if not exists indexer.cosmos_events (
    _id serial primary key,
    cosmos_response_id int,
    type text,
    key text,
    value text,
    index int
);

create index if not exists cosmos_events_response_id_idx on indexer.cosmos_events (cosmos_response_id);
create index if not exists cosmos_events_type_idx on indexer.cosmos_events (type);
create index if not exists cosmos_events_key_idx on indexer.cosmos_events (key);
create index if not exists cosmos_events_value_idx on indexer.cosmos_events (value);
create index if not exists cosmos_events_type_key_value_idx on indexer.cosmos_events (type, key, value);

insert into indexer.cosmos_index (block_height) select 1 where not exists (select 1 from indexer.cosmos_index);
