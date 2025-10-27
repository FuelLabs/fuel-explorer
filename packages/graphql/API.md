# Fuel Explorer Indexer - API
### Instructions for consuming Assets data from Indexer API

API endpoint:
`/assets/<assetId>`  - get information about any asset (including NFTs)

URLs to consume:
- Mainnet: https://mainnet-explorer.fuel.network
- Testnet: https://explorer-indexer-testnet.fuel.network


`curl` example of usage
```
curl 'https://mainnet-explorer.fuel.network/assets/0x44b09d7143aa7b1aac7844ee9cfc38893b12d20c3822ecb18dbf2c6846ea63f0'
```


the result contains a JSON with the asset information, here are the details about each prop:
| Property | Description |
|----------|-------------|
| assetId | Actual ID of the asset |
| contractId | Contract ID that minted the asset |
| subId | SubId used to calculate the assetId |
| name | Asset name |
| symbol | Asset symbol |
| decimals | Asset decimals configuration |
| suspicious | true if symbol matches any verified asset symbols |
| metadata | Key-value object with SRC7/SRC9 standard metadata |
| isNFT | true if asset is NFT ( [supply=1, decimals=0](https://docs.fuel.network/docs/sway-standards/src-20-native-asset/#non-fungible-asset-restrictions) )|
| verified | true if asset is in Fuel's verified assets list |
| owner | Current assetId owner (NFTs only) |
| uri | Parsed URL from “metadata.uri” or “metadata.URI”. Some [logic](https://github.com/FuelLabs/fuel-ex-demo/blob/ee73408a0ef0323eeb92414d5ed92d65e3f3f78f/packages/graphql/src/infra/gateway/AssetGateway.ts#L63-L95) is applied to try defining a reasonable uri for the API consumer |

### Instructions for consuming Assets data owned by an Account from Indexer API

API endpoint:
`/accounts/<address>/assets?last=<size>`  - get assets owned by an account (including NFTs)

URLs to consume:
- Mainnet: https://mainnet-explorer.fuel.network
- Testnet: https://explorer-indexer-testnet.fuel.network


`curl` example of usage
```
curl 'https://mainnet-explorer.fuel.network/accounts/0x196a68Ba237e921FeC5F01552E5e4df60b2619900254DD4cDe42557814508F57/assets?last=10'
```


the result contains a JSON with an array of asset information and balance of each asset, here are the details about each prop:
| Property | Description |
|----------|-------------|
| balance | Balance of the asset owner by account |
| assetId | Actual ID of the asset |
| contractId | Contract ID that minted the asset |
| subId | SubId used to calculate the assetId |
| name | Asset name |
| symbol | Asset symbol |
| decimals | Asset decimals configuration |
| suspicious | true if symbol matches any verified asset symbols |
| metadata | Key-value object with SRC7/SRC9 standard metadata |
| isNFT | true if asset is NFT ( [supply=1, decimals=0](https://docs.fuel.network/docs/sway-standards/src-20-native-asset/#non-fungible-asset-restrictions) )|
| verified | true if asset is in Fuel's verified assets list |
| owner | Current assetId owner (NFTs only) |
| uri | Parsed URL from “metadata.uri” or “metadata.URI”. Some [logic](https://github.com/FuelLabs/fuel-ex-demo/blob/ee73408a0ef0323eeb92414d5ed92d65e3f3f78f/packages/graphql/src/infra/gateway/AssetGateway.ts#L63-L95) is applied to try defining a reasonable uri for the API consumer |

### Instructions for consuming Blocks data from Indexer API

API endpoint:
`/blocks/<height>`  - get information about any block

URLs to consume:
- Mainnet: https://mainnet-explorer.fuel.network
- Testnet: https://explorer-indexer-testnet.fuel.network


`curl` example of usage
```
curl 'https://mainnet-explorer.fuel.network/blocks/4000000'
```

the result contains a JSON with an array of block information:
| Property | Description |
|----------|-------------|
| id | Actual ID of the Block |
| header | Contains the header information of the block |
| height | Height of the Block |
| consensus | Consensus informations of the Block |
| transactions | Transactions of the Block |