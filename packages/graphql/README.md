## Mock API

This is a mock api for block-explorer

## Run development server

```sh
pnpm dev
```

## Docker

```
docker run \
  -e FUEL_PROVIDER=https://testnet.fuel.network/v1/graphql \
  -e SERVER_PORT=3000 \
  -p 3333:3000 \
  ghcr.io/fuellabs/fuel-explorer:main
```
