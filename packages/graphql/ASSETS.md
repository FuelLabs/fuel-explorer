# Fuel Explorer Indexer - Assets API
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
