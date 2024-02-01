## Mock API

This is a mock api for block-explorer

## Run development server

```sh
pnpm dev
```

## Docker

```
docker run \
  -e FUEL_PROVIDER=https://beta-5.fuel.network/graphql \
  -e SERVER_PORT=3000 \
  -p 3333:3000 \
  ghcr.io/fuellabs/fuel-explorer:main
```
