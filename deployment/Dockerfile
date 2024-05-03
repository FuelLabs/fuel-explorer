# This image contains the graphql server
# built for the fuel-explorer
FROM node:20-slim AS base

# Expose the ENVs to the env of the container
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

ENV SERVER_PORT="${SERVER_PORT:-3004}"
ENV FUEL_PROVIDER="${FUEL_PROVIDER:-https://beta-5.fuel.network/graphql}"
ENV SERVER_BUILD="${SERVER_BUILD}"
ENV SYNC_MISSING="${SYNC_MISSING}"
ENV DB_MIGRATE="${DB_MIGRATE}"

# Database config
ENV DB_HOST="${DB_HOST}"
ENV DB_PORT="${DB_PORT}"
ENV DB_USER="${DB_USER}"
ENV DB_PASS="${DB_PASS}"
ENV DB_NAME="${DB_NAME}"

# Enable pnpm using corepack form node.js
RUN corepack enable

# Install dependencies for the entire monorepo
COPY . /app-explorer
WORKDIR /app-explorer
ENV PM2_HOME=/tmp/.pm2

# Install dependencies for the entire monorepo
RUN pnpm install
RUN pnpm add -g pm2 tsx

# Expose the specified port
EXPOSE ${SERVER_PORT}
WORKDIR /app-explorer
CMD ["./scripts/run.sh"]
