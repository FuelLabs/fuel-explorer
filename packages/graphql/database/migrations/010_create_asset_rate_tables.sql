create table if not exists indexer.assets_rate_provider (
	asset_id text not null,
	symbol text not null,
	value text not null,
	provider text not null,
	primary key (symbol)
);

-- network independent
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x', 'BTC', 'bitcoin', 'coingecko') on conflict (symbol) do nothing;

-- mainnet
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07', 'ETH', 'ethereum', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x1d5d97005e41cae2187a895fd8eab0506111e0e2f3331cd3912c15c24e3c1d82', 'FUEL', 'fuel', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0xa38a5a8beeb08d95744bc7f58528073f4052b254def59eba20c99c202b5acaa3', 'WETH', 'weth', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x239ed6e12b7ce4089ee245244e3bf906999a6429c2a9a445a1e1faf56914a4ab', 'weETH', 'wrapped-eeth', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0xbae80f7fb8aa6b90d9b01ef726ec847cc4f59419c4d5f2ea88fec785d1b0e849', 'rsETH', 'kelp-dao-restaked-eth', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0xf3f9a0ed0ce8eac5f89d6b83e41b3848212d5b5f56108c54a205bb228ca30c16', 'rETH', 'reth', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x7843c74bef935e837f2bcf67b5d64ecb46dd53ff86375530b0caf3699e8ffafe', 'wbETH', 'wrapped-beacon-eth', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0xaf3111a248ff7a3238cdeea845bb2d43cf3835f1f6b8c9d28360728b55b9ce5b', 'Manta mBTC', 'manta-mbtc', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0xafd219f513317b1750783c6581f55530d6cf189a5863fd18bd1b3ffcec1714b4', 'Manta mETH', 'manta-meth', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x89cb9401e55d49c3269654dd1cdfb0e80e57823a4a7db98ba8fc5953b120fef4', 'Manta mUSD', 'manta-musd', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x0aa5eb2bb97ca915288b653a2529355d4dc66de2b37533213f0e4aeee3d3421f', 'pumpBTC', 'pumpbtc', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0xb5ecb0a1e08e2abbabf624ffea089df933376855f468ade35c6375b00c33996a', 'FBTC', 'ignition-fbtc', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x1186afea9affb88809c210e13e2330b5258c2cef04bb8fff5eff372b7bd3f40f', 'SolvBTC', 'solv-btc', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x7a4f087c957d30218223c2baaaa365355c9ca81b6ea49004cfb1590a5399216f', 'SolvBTC.BBN', 'solv-protocol-solvbtc-bbn', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x9e46f919fbf978f3cad7cd34cca982d5613af63ff8aab6c379e4faa179552958', 'sDAI', 'savings-dai', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0xa0265fb5c32f6e8db3197af3c7eb05c48ae373605b8165b6f4a51c5b0ba4812e', 'USDT', 'tether', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x286c479da40dc953bddc3bb4c453b608bba2e0ac483b077bd475174115395e6b', 'USDC', 'usd-coin', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0xb6133b2ef9f6153eb869125d23dcf20d1e735331b5e41b15a6a7a6cec70e8651', 'USDe', 'usde', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0xd05563025104fc36496c15c7021ad6b31034b0e89a356f4f818045d1f48808bc', 'sUSDe', 'ethena-staked-usde', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x1a7815cc9f75db5c24a5b0814bfb706bb9fe485333e98254015de8f48f84c67b', 'wstETH', 'wrapped-steth', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x91b3559edb2619cde8ffb2aa7b3c3be97efd794ea46700db7092abeee62281b0', 'ezETH', 'everclear-bridged-ezeth', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x1493d4ec82124de8f9b625682de69dcccda79e882b89a55a8c737b12de67bd68', 'pzETH', 'renzo-restaked-lst', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x4fc8ac9f101df07e2c2dec4a53c8c42c439bdbe5e36ea2d863a61ff60afafc30', 'steakLRT', 'steakhouse-resteaking-vault', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x33a6d90877f12c7954cca6d65587c25e9214c7bed2231c188981c7114c1bdb78', 'USDF', 'usdf', 'coingecko') on conflict (symbol) do nothing;
-- insert into indexer.assets_rate_provider (asset_id, symbol, coingecko_id) values ('0x642a5db59ec323c2f846d4d4cf3e58d78aff64accf4f8f6455ba0aa3ef000a3b', 'Mantle mETH', '');
-- insert into indexer.assets_rate_provider (asset_id, symbol, coingecko_id) values ('0x78d4522ec607f6e8efb66ea49439d1ee48623cf763f9688a8eada025def033d9', 'rsUSDe', '');
-- insert into indexer.assets_rate_provider (asset_id, symbol, coingecko_id) values ('0x962792286fbc9b1d5860b4551362a12249362c21594c77abf4b3fe2bbe8d977a', 'rstETH', '');
-- insert into indexer.assets_rate_provider (asset_id, symbol, coingecko_id) values ('0x05fc623e57bd7bc1258efa8e4f62b05af5471d73df6f2c2dc11ecc81134c4f36', 'amphrETH', '');
-- insert into indexer.assets_rate_provider (asset_id, symbol, coingecko_id) values ('0xf2fc648c23a5db24610a1cf696acc4f0f6d9a7d6028dd9944964ab23f6e35995', 'Re7LRT', '');

-- testnet

insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07', 'ETH', 'ethereum', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x324d0c35a4299ef88138a656d5272c5a3a9ccde2630ae055dacaf9d13443d53b', 'FUEL', 'fuel', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0xa38a5a8beeb08d95744bc7f58528073f4052b254def59eba20c99c202b5acaa3', 'WETH', 'weth', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x239ed6e12b7ce4089ee245244e3bf906999a6429c2a9a445a1e1faf56914a4ab', 'weETH', 'wrapped-eeth', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0xbae80f7fb8aa6b90d9b01ef726ec847cc4f59419c4d5f2ea88fec785d1b0e849', 'rsETH', 'kelp-dao-restaked-eth', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0xf3f9a0ed0ce8eac5f89d6b83e41b3848212d5b5f56108c54a205bb228ca30c16', 'rETH', 'reth', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x7843c74bef935e837f2bcf67b5d64ecb46dd53ff86375530b0caf3699e8ffafe', 'wbETH', 'wrapped-beacon-eth', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0xaf3111a248ff7a3238cdeea845bb2d43cf3835f1f6b8c9d28360728b55b9ce5b', 'Manta mBTC', 'manta-mbtc', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0xafd219f513317b1750783c6581f55530d6cf189a5863fd18bd1b3ffcec1714b4', 'Manta mETH', 'manta-meth', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x89cb9401e55d49c3269654dd1cdfb0e80e57823a4a7db98ba8fc5953b120fef4', 'Manta mUSD', 'manta-musd', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x0aa5eb2bb97ca915288b653a2529355d4dc66de2b37533213f0e4aeee3d3421f', 'pumpBTC', 'pumpbtc', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0xb5ecb0a1e08e2abbabf624ffea089df933376855f468ade35c6375b00c33996a', 'FBTC', 'ignition-fbtc', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x1186afea9affb88809c210e13e2330b5258c2cef04bb8fff5eff372b7bd3f40f', 'SolvBTC', 'solv-btc', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x7a4f087c957d30218223c2baaaa365355c9ca81b6ea49004cfb1590a5399216f', 'SolvBTC.BBN', 'solv-protocol-solvbtc-bbn', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x9e46f919fbf978f3cad7cd34cca982d5613af63ff8aab6c379e4faa179552958', 'sDAI', 'savings-dai', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0xa0265fb5c32f6e8db3197af3c7eb05c48ae373605b8165b6f4a51c5b0ba4812e', 'USDT', 'tether', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0xc26c91055de37528492e7e97d91c6f4abe34aae26f2c4d25cff6bfe45b5dc9a9', 'USDC', 'usd-coin', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x86a1beb50c844f5eff9afd21af514a13327c93f76edb89333af862f70040b107', 'USDe', 'usde', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0xd2886b34454e2e0de47a82d8e6314b26e1e1312519247e8e2ef137672a909aeb', 'sUSDe', 'ethena-staked-usde', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0xb42cd9ddf61898da1701adb3a003b0cf4ca6df7b5fe490ec2c295b1ca43b33c8', 'wstETH', 'wrapped-steth', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x91b3559edb2619cde8ffb2aa7b3c3be97efd794ea46700db7092abeee62281b0', 'ezETH', 'everclear-bridged-ezeth', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x1493d4ec82124de8f9b625682de69dcccda79e882b89a55a8c737b12de67bd68', 'pzETH', 'renzo-restaked-lst', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x4fc8ac9f101df07e2c2dec4a53c8c42c439bdbe5e36ea2d863a61ff60afafc30', 'steakLRT', 'steakhouse-resteaking-vault', 'coingecko') on conflict (symbol) do nothing;
insert into indexer.assets_rate_provider (asset_id, symbol, value, provider) values ('0x33a6d90877f12c7954cca6d65587c25e9214c7bed2231c188981c7114c1bdb78', 'USDF', 'usdf', 'coingecko') on conflict (symbol) do nothing;

create index if not exists assets_rate_provider_asset_id_idx on indexer.assets_rate_provider (asset_id);
create index if not exists assets_rate_provider_symbol_idx on indexer.assets_rate_provider (symbol);

create table if not exists indexer.assets_rates (
	_id serial,
	asset_id text not null,
	symbol text not null,
	rate numeric not null,
	timestamp timestamp without time zone NOT NULL,
	primary key (_id)
);

create index if not exists assets_rates_id_idx on indexer.assets_rates (_id);
create index if not exists assets_rates_asset_id_idx on indexer.assets_rates (asset_id);
create index if not exists assets_rates_symbol_idx on indexer.assets_rates (symbol);

update indexer.migration set version = 9;
