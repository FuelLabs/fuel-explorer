## Mock API

This is a mock api for block-explorer

## Run development server

```sh
pnpm dev
```

## Docker

```
docker run \
  -e NEXT_PUBLIC_FUEL_CHAIN_NAME=fuelBeta5 \
  -e SERVER_PORT=3000 \
  -p 3333:3000 \
  ghcr.io/fuellabs/fuel-explorer:main
```
