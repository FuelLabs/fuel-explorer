# This image contains the graphql server
# built for the fuel-explorer
FROM node:20-slim AS base

# Expose the ENVs to the env of the container
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV SYNCER_PORT="${SYNCER_PORT:-3000}"
ENV SERVER_PORT="${SERVER_PORT:-3001}"
ENV FUEL_PROVIDER="${FUEL_PROVIDER:-https://testnet.fuel.network/v1/graphql}"
ENV SERVER_BUILD=true
ENV SYNC_MISSING=false

# Enable pnpm using corepack form node.js
RUN corepack enable

# Install dependencies for the entire monorepo
COPY . /app-explorer
WORKDIR /app-explorer

# Install dependencies for the entire monorepo
RUN pnpm install --ignore-scripts
RUN pnpm install -g pm2

# Expose the specified port
EXPOSE ${SYNCER_PORT}
EXPOSE ${SERVER_PORT}

# Start GraphQL server
WORKDIR /app-explorer

CMD ["sh", "./scripts/run.sh"]

