# This image contains the graphql server
# built for the fuel-explorer
FROM node:20-slim AS base

# Expose the ENVs to the env of the container
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV SERVER_PORT="${SERVER_PORT:-3000}"
ENV SYNCER_PORT="${SYNCER_PORT:-3001}"
ENV FUEL_PROVIDER="${FUEL_PROVIDER:-https://testnet.fuel.network/v1/graphql}"
ENV SERVER_BUILD=true
ENV SYNC_MISSING=false

# Enable pnpm using corepack form node.js
RUN corepack enable

FROM base AS build
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS explorer
COPY --from=build /app /app-explorer
WORKDIR /app-explorer/packages/graphql
EXPOSE ${SERVER_PORT}
CMD ["sh", "./scripts/run.sh"]
