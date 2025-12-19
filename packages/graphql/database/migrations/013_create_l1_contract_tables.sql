drop table if exists indexer.contract_l1_logs;
drop table if exists indexer.contract_l1_args;
drop table if exists indexer.contract_l1_index;

create table if not exists indexer.contract_l1_index (
    _id serial primary key,
    contract_hash text unique,
    block_height int,
    name text,
    status text,
    network text
);

create index if not exists contract_l1_index_contract_hash_idx on indexer.contract_l1_index (contract_hash);

insert into indexer.contract_l1_index (contract_hash, block_height, name, status, network) values ('0xBa0e6bF94580D49B5Aaaa54279198D424B23eCC3', 21220898, 'SequencerProxy', 'active', 'mainnet') on conflict (contract_hash) do nothing;
insert into indexer.contract_l1_index (contract_hash, block_height, name, status, network) values ('0x481aeEB9bdFe08f050d22F0b352356691c4B0b59', 21220911, 'FuelStreamX', 'active', 'mainnet') on conflict (contract_hash) do nothing;
insert into indexer.contract_l1_index (contract_hash, block_height, name, status, network) values ('0xC20c2EA5fC5f26200f3339512f336c2ecE41FC18', 21414415, 'RewardDistribution', 'active', 'mainnet') on conflict (contract_hash) do nothing;
insert into indexer.contract_l1_index (contract_hash, block_height, name, status, network) values ('0xAEB0c00D0125A8a788956ade4f4F12Ead9f65DDf', 21039400, 'FuelMessagePortal', 'active', 'mainnet') on conflict (contract_hash) do nothing;
insert into indexer.contract_l1_index (contract_hash, block_height, name, status, network) values ('0xa4cA04d02bfdC3A2DF56B9b6994520E69dF43F67', 20678194, 'FuelERC20GatewayV4', 'active', 'mainnet') on conflict (contract_hash) do nothing;
insert into indexer.contract_l1_index (contract_hash, block_height, name, status, network) values ('0xf3D20Db1D16A4D0ad2f280A5e594FF3c7790f130', 20620432, 'FuelChainState', 'active', 'mainnet') on conflict (contract_hash) do nothing;
insert into indexer.contract_l1_index (contract_hash, block_height, name, status, network) values ('0x675B68AA4d9c2d3BB3F0397048e62E6B7192079c', 21213754, 'Token', 'active', 'mainnet') on conflict (contract_hash) do nothing;

insert into indexer.contract_l1_index (contract_hash, block_height, name, status, network) values ('0x0E5CAcD6899a1E2a4B4E6e0c8a1eA7feAD3E25eD', 7203292, 'SequencerProxy', 'active', 'testnet') on conflict (contract_hash) do nothing;
insert into indexer.contract_l1_index (contract_hash, block_height, name, status, network) values ('0x130F143e0F6d87371ca510e11340C2F3cD407a2b', 7203302, 'FuelStreamX', 'active', 'testnet') on conflict (contract_hash) do nothing;
insert into indexer.contract_l1_index (contract_hash, block_height, name, status, network) values ('0x7c8deB33b992629130CE160f766881A191d874ce', 7334044, 'RewardDistribution', 'active', 'testnet') on conflict (contract_hash) do nothing;
insert into indexer.contract_l1_index (contract_hash, block_height, name, status, network) values ('0x01855B78C1f8868DE70e84507ec735983bf262dA', 6339191, 'FuelMessagePortal', 'active', 'testnet') on conflict (contract_hash) do nothing;
insert into indexer.contract_l1_index (contract_hash, block_height, name, status, network) values ('0xd1d5a4379dccC46D5c8D1c6c2656ce705698e359', 6626184, 'FuelERC20GatewayV4', 'active', 'testnet') on conflict (contract_hash) do nothing;
insert into indexer.contract_l1_index (contract_hash, block_height, name, status, network) values ('0xf38F1e65adc58fc74BaaA132f645Aa5307F2d304', 6505507, 'FuelChainState', 'active', 'testnet') on conflict (contract_hash) do nothing;
insert into indexer.contract_l1_index (contract_hash, block_height, name, status, network) values ('0xd7Fc4e8FB2c05567C313f4C9b9e07641a361a550', 7203281, 'Token', 'active', 'testnet') on conflict (contract_hash) do nothing;


create table if not exists indexer.contract_l1_logs (
    _id serial primary key,
    contract_hash text,
    block_height int,
    tx_hash text,
    event text,
    signature text,
    raw_log jsonb default '{}',
    decoded_args jsonb default '{}',
    decoded_data jsonb default '{}',
    timestamp timestamp without time zone,
    log_index int
);

create index if not exists contract_l1_logs_contract_hash_idx on indexer.contract_l1_logs (contract_hash);
create index if not exists contract_l1_logs_event_idx on indexer.contract_l1_logs (event);
create unique index if not exists contract_l1_logs_block_log_idx on indexer.contract_l1_logs (block_height, log_index);

create table if not exists indexer.contract_l1_args (
    _id serial primary key,
    contract_l1_log_id int,
    key text,
    value text
);

create index if not exists contract_l1_args_key_value_idx on indexer.contract_l1_args (key, value);
create unique index if not exists contract_l1_args_log_key_idx on indexer.contract_l1_args (contract_l1_log_id, key);
