# @fuel-explorer/graphql

This package no longer runs a standalone API or syncer. It is a shared library: GraphQL schemas, generated SDK types, the domain layer that turns fuel-core JSON into explorer fields, and a handful of value objects and DAOs, imported by both the frontend (`packages/app-explorer`, via the `@fuel-explorer/graphql` and `@fuel-explorer/graphql/sdk` exports) and the API server in `packages/api-lite`.

The explorer's Postgres-backed API and syncer, and the Postgres database itself, were removed. The explorer now runs on `packages/api-lite`, which serves the same GraphQL schema from the S3 block recorder and fuel-core, with a sqlite index, and no database to operate. See `docker/vps/deploy.md` for how it is deployed.
