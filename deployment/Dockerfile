FROM node:20 AS base

ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -y postgresql-client

# Expose the ENVs to the env of the container
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV SERVER_PORT="${SERVER_PORT:-3000}"
ENV SYNCER_PORT="${SYNCER_PORT:-3001}"
ENV FUEL_PROVIDER="${FUEL_PROVIDER:-https://testnet.fuel.network/v1/graphql}"
ENV SERVER_BUILD=true
ENV SYNC_MISSING=true
ENV DB_HOST="${DB_HOST:-localhost}"
ENV DB_PORT="${DB_PORT:-5432}"
ENV DB_NAME="${DB_NAME:-postgres}"
ENV DB_USER="${DB_USER:-postgres}"
ENV DB_PASS="${DB_PASS:-postgres}"
ENV RABBITMQ_HOST="${RABBITMQ_HOST:-localhost}"
ENV RABBITMQ_PORT="${RABBITMQ_PORT:-5672}"
ENV RABBITMQ_USER="${RABBITMQ_USER:-guest}"
ENV RABBITMQ_PASS="${RABBITMQ_PASS:-guest}"

RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS build
COPY . /app
WORKDIR /app
RUN pnpm install --frozen-lockfile

FROM base AS explorer
COPY --chown=node:node --from=build /app /app-explorer
WORKDIR /app-explorer/packages/graphql

RUN pnpm build:lib

EXPOSE ${SERVER_PORT}
CMD ["sh", "./scripts/run.sh"]
