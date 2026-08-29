# Railway deployment

Two Railway services built from this repo's Dockerfiles: `api` (private
networking only, a volume at `/data`) and `explorer` (nginx, a public domain,
proxies `/api/` to `api` over Railway's private IPv6 network). `docker/vps/nginx.conf.template`
resolves `api.railway.internal` at request time via nginx's `resolver`
directive, so restarts that change the api service's private address do not
require rebuilding the explorer image.

## Telling Railway which Dockerfile to build

Railway needs to know each service builds from a Dockerfile under
`docker/vps/`, not the repo root. There are two ways to set that:

1. **`RAILWAY_DOCKERFILE_PATH` service variable (recommended).** Set it to
   `docker/vps/Dockerfile.api-lite` (api) or `docker/vps/Dockerfile.explorer`
   (explorer). No per-service dashboard config needed — the command sequence
   below sets it like any other variable, so the whole setup is scriptable
   from the CLI.
2. **Config-as-code JSON files.** `docker/vps/railway.api.json` and
   `docker/vps/railway.explorer.json` (schema
   `https://railway.com/railway.schema.json`) declare `build.dockerfilePath`,
   the healthcheck path (`/health` for api, `/` for explorer), and a restart
   policy. To use these instead, open each service's Settings in the Railway
   dashboard and set "Config file path" to the matching JSON file with root
   directory `/`. This requires one dashboard visit per service; the variable
   above does not.

Both files are committed so either method works. The variable is recommended
because the command sequence below can set it in the same breath as the
other variables, with no dashboard step.

## Prerequisites

```bash
npm i -g @railway/cli   # or: brew install railway
railway login           # opens a browser; log in with your Okta email
```

In the Railway dashboard, create a new **empty** project (e.g. named
`fuel-explorer-lite`) and add two **empty** services to it named `api` and
`explorer` — do not connect either to a GitHub repo; they will be filled by
`railway up` below.

## Command sequence

Run from the repo root (`fuel-explorer/`). `railway link` prompts
interactively to pick the project/environment created above.

```bash
railway link

# api: build settings + runtime config
railway variables --service api \
  --set "RAILWAY_DOCKERFILE_PATH=docker/vps/Dockerfile.api-lite" \
  --set "BLOCK_SOURCE=rpc" \
  --set "FUEL_PROVIDER=https://mainnet.fuel.network/v1/graphql" \
  --set "DATA_DIR=/data" \
  --set "INDEX_RETENTION_DAYS=1" \
  --set "INDEX_MAX_BYTES=3500000000" \
  --set "DISK_CACHE_BYTES=1000000000" \
  --set "MEMORY_CACHE_BYTES=134217728" \
  --set "RPC_MAX_BLOCKS_PER_SECOND=5" \
  --set "PORT=3000"

# api: staking/bridge history ingestion. Without ETH_RPC_URL the L1 poller
# stays disabled and /staking/* and /bridge/* return 503; the other four vars
# have defaults and stay optional even then.
#   ETH_RPC_URL         - an Alchemy or Infura HTTPS URL with the key inside
#   FUEL_CHAIN          - mainnet or testnet (default: inferred from FUEL_PROVIDER's host)
#   COSMOS_START_HEIGHT - sequencer block to start cosmos ingestion from (default: tip minus 200,000)
#   COSMOS_REST_URL     - sequencer cosmos REST base (default: resolved from FUEL_PROVIDER's chain)
#   COSMOS_INDEXER_URL  - sequencer indexer base for withdrawal proofs (default: resolved from FUEL_CHAIN)
railway variables --service api \
  --set "ETH_RPC_URL=<alchemy-or-infura-https-url-with-key>" \
  --set "FUEL_CHAIN=mainnet" \
  --set "COSMOS_START_HEIGHT=<sequencer-tip-minus-200000>" \
  --set "COSMOS_REST_URL=<sequencer-rest-url-override>" \
  --set "COSMOS_INDEXER_URL=<sequencer-indexer-url-override>"

# api: persistent volume for the block index (Hobby plan volumes cap at 5 GB,
# hence the smaller INDEX_MAX_BYTES/DISK_CACHE_BYTES above vs. the droplet's).
railway volume --service api add --mount-path /data

# explorer: build settings + runtime config. API_UPSTREAM is api's private
# DNS name; NGINX_RESOLVER is Railway's private-network IPv6 resolver.
railway variables --service explorer \
  --set "RAILWAY_DOCKERFILE_PATH=docker/vps/Dockerfile.explorer" \
  --set "VITE_FUEL_INDEXER_API=/api" \
  --set "API_UPSTREAM=api.railway.internal:3000" \
  --set "NGINX_RESOLVER=[fd12::10]" \
  --set 'RATE_LIMIT_KEY=$xff_first'
# RATE_LIMIT_KEY=$xff_first only because Railway's edge rewrites X-Forwarded-For as "client, edge" (verified 2026-08-29: a client-supplied header is replaced); leave it unset when nginx is itself the public edge.

# Deploy both services. `railway up` uploads the working tree directly
# (no git push, no GitHub connection needed).
railway up --service api
railway up --service explorer

# Public domain for explorer, pointed at nginx's port 80.
railway domain --service explorer --port 80
```

Note: `railway volume add`'s `--service` flag belongs to the parent `railway
volume` command, not the `add` subcommand — `railway volume add --mount-path
/data --service api` fails with "unexpected argument '--service'" on CLI
4.8.0; `railway volume --service api add --mount-path /data` is the form the
installed CLI accepts.

## Verify

```bash
curl https://<domain>/api/health
```

## Switching to S3 later

Same idea as the droplet (below): set `BLOCK_SOURCE=s3` and the `AWS_*` /
`S3_BUCKET` variables on the `api` service with `railway variables --service
api --set ...`, then `railway up --service api` to redeploy. Out of scope for
this task.

# Deploying to a DigitalOcean droplet

This covers building the two VPS images, pushing them to GHCR, and running
them on a DigitalOcean droplet with `docker-compose.prod.yml`.

## 1. Build and push the images

Build locally with the dev compose file, tag for GHCR, then push. Replace
`$OWNER` with the GitHub org or user that owns the GHCR packages.

```bash
docker compose -f docker/vps/docker-compose.yml build

docker tag fuel-explorer-vps/api-lite:local ghcr.io/$OWNER/fuel-explorer-vps-api-lite:latest
docker tag fuel-explorer-vps/explorer:local ghcr.io/$OWNER/fuel-explorer-vps-explorer:latest

docker login ghcr.io

docker push ghcr.io/$OWNER/fuel-explorer-vps-api-lite:latest
docker push ghcr.io/$OWNER/fuel-explorer-vps-explorer:latest
```

## 2. Create the droplet

- Size: Basic, 2 vCPU / 2 GB RAM / 50 GB disk.
- Region: sgp1.
- Image: Docker (DigitalOcean Marketplace).
- Cloud firewall: allow inbound 22 (SSH) and 80 (HTTP) only.

## 3. Prepare the droplet

Add 2 GB of swap (the 2 GB droplet needs headroom for the API's disk cache):

```bash
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

Copy the compose file and env template, then fill in the env file:

```bash
mkdir -p /opt/explorer && cd /opt/explorer
# copy docker-compose.prod.yml and .env.example here (scp, git clone, etc.)
cp .env.example .env
```

Edit `.env` and set:

```
REGISTRY_OWNER=$OWNER
BLOCK_SOURCE=rpc
```

Leave the AWS keys blank — `BLOCK_SOURCE=rpc` needs none.

## 4. Run

```bash
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

## 5. Verify

```bash
curl localhost/api/health
docker stats
```

## 6. Switching to S3 later

Edit `.env` on the droplet: set `BLOCK_SOURCE=s3` and fill in
`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, and `S3_BUCKET`.
Then restart just the API:

```bash
docker compose -f docker-compose.prod.yml up -d api
```

## Testnet

Build the frontend against testnet by passing the build variable `NETWORK=testnet` (selects `packages/app-explorer/.env.testnet`; default `mainnet`). Point the api at testnet with `FUEL_PROVIDER=https://testnet.fuel.network/v1/graphql`. For `BLOCK_SOURCE=s3` the testnet recorder bucket is `fuel-blocks-testnet-us-east-1` in `us-east-1`.
