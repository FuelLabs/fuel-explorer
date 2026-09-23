# api-lite

## Running the e2e smoke suite locally

From the repo root (skip the `cp` if `.env` already exists):

```
npx pnpm@9.10.0 node:start
cp packages/app-explorer/.env.example packages/app-explorer/.env
npx pnpm@9.10.0 build:prod
npx pnpm@9.10.0 test:e2e-api-lite   # starts api-lite (RPC mode) + the built explorer
npx pnpm@9.10.0 node:stop
```
