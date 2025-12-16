# Database Migration Guide

## Commands

```bash
pnpm db:migrate           # Run pending migrations
pnpm db:migrate:dry       # Preview without executing
pnpm db:migrate:status    # Show migration status
pnpm db:migrate:seed      # Seed _migrations table (production upgrade only)
```

## Creating Migrations

1. Create file in `database/migrations/` with format `{NNN}_{description}.sql`
2. Write idempotent SQL (use `IF NOT EXISTS`, `IF EXISTS`)
3. Test with `pnpm db:migrate:dry` then `pnpm db:migrate`

## Production Deployment

### First-Time (Existing Database)

```bash
# Connect to production
kubectl port-forward -n fuel-explorer svc/postgresql 5432:5432

# Set env vars
export DB_HOST=localhost DB_PORT=5432 DB_USER=explorer DB_PASS=<pwd> DB_NAME=explorer

# Seed _migrations table (marks all as executed without re-running)
cd packages/graphql && pnpm db:migrate:seed
```

### Standard Deployment

```bash
pnpm db:migrate:status    # Check pending
pnpm db:migrate:dry       # Preview
pnpm db:migrate           # Execute
```

## Environment Variables

| Variable | Default |
|----------|---------|
| `DB_SCHEMA` | `indexer` |
| `DB_HOST` | `localhost` |
| `DB_PORT` | `5435` |
| `DB_USER` | `postgres` |
| `DB_PASS` | `postgres` |
| `DB_NAME` | `postgres` |
