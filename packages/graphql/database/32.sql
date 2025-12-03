-- Migration 32: Add MOOR token rate provider (CMC DEX)
-- MOOR is the governance token of the Moor protocol on Fuel Network

-- Add MOOR token for mainnet using CMC DEX as price source
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) 
values ('0xa9d7987a3f2c2fb02b287c3a2ef619046e930848c6050d31efef48ad6d3bdee8', 'MOOR', 'Fuel Network', 'cmc-dex')
on conflict (symbol) do update set asset_id = excluded.asset_id, value = excluded.value, provider = excluded.provider;

-- Update migration version
UPDATE indexer.migration SET version = 33;

