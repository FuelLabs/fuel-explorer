## Mock API

This is a mock api for block-explorer

## Run development server

```sh
pnpm dev
```

## Docker

```
docker run \
  -e FUEL_PROVIDER=http://testnet.fuel.network/v1/graphql \
  -e SERVER_PORT=3000 \
  -e SYNC_MISSING=true \
  -e DB_HOST=192.168.3.240 \
  -e DB_PORT=5435 \
  -e DB_USER=postgres \
  -e DB_PASS=postgres \
  -e DB_NAME=postgres \
  -p 3333:3000 \
  ghcr.io/fuellabs/fuel-explorer:main
```
