# This image contains the graphql server
# built for the fuel-explorer
FROM node:20-slim AS base

# Expose the ENVs to the env of the container
ENV PORT="${PORT}"
ENV FUEL_PROVIDER_BETA5="${FUEL_PROVIDER_BETA5}"
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable pnpm using corepack form node.js
RUN corepack enable

COPY . /app-explorer
WORKDIR /app-explorer

RUN pnpm install --frozen-lockfile

EXPOSE 4444

WORKDIR /app-explorer/packages/graphql

CMD ["pnpm", "start"]
