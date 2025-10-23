drop table indexer.cosmos_index;
drop table indexer.cosmos_responses;
drop table indexer.cosmos_events;

create table indexer.cosmos_index (
    block_height int
);

create table indexer.cosmos_responses (
    _id serial primary key,
    block_height int,
    tx_hash text,
    data text,
    timestamp timestamp without time zone
);

create index on indexer.cosmos_responses (block_height);
create index on indexer.cosmos_responses (tx_hash);
create index on indexer.cosmos_responses (timestamp);

create table indexer.cosmos_events (
    _id serial primary key,
    cosmos_response_id int,
    type text,
    key text,
    value text,
    index int
);

create index on indexer.cosmos_events (cosmos_response_id);
create index on indexer.cosmos_events (type);
create index on indexer.cosmos_events (key);
create index on indexer.cosmos_events (value);
create index on indexer.cosmos_events (type, key, value);

insert into indexer.cosmos_index (block_height) values (1);
