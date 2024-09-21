# This image contains the graphql server
# built for the fuel-explorer
FROM node:20 AS base

ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -y postgresql-client

# Expose the ENVs to the env of the container
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV HOST="localhost"
ENV SERVER_PORT="${SERVER_PORT:-3000}"
ENV SYNCER_PORT="${SYNCER_PORT:-3001}"
ENV FUEL_PROVIDER="${FUEL_PROVIDER:-https://testnet.fuel.network/v1/graphql}"
ENV SERVER_BUILD=true
ENV SYNC_MISSING=true
ENV DB_HOST="${DB_HOST}"
ENV DB_PORT="${DB_PORT}"
ENV DB_NAME="${DB_NAME}"
ENV DB_USER="${DB_USER}"
ENV DB_PASS="${DB_PASS}"
ENV RABBITMQ_HOST="${RABBITMQ_HOST}"
ENV RABBITMQ_PORT="${RABBITMQ_PORT}"
ENV RABBITMQ_USER="${RABBITMQ_USER}"
ENV RABBITMQ_PASS="${RABBITMQ_PASS}"

RUN corepack enable

FROM base AS build
COPY . /app
WORKDIR /app
RUN pnpm install --frozen-lockfile

FROM base AS explorer
COPY --from=build /app /app-explorer
WORKDIR /app-explorer/packages/graphql

RUN pnpm build:lib

EXPOSE ${SERVER_PORT}
RUN chown -R node:node /app-explorer
CMD ["sh", "./scripts/run.sh"]
