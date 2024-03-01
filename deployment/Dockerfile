# This image contains the graphql server
# built for the fuel-explorer
FROM node:20-slim AS base

# Expose the ENVs to the env of the container
ENV PORT="${PORT}"
ENV NEXT_PUBLIC_FUEL_CHAIN_NAME="${NEXT_PUBLIC_FUEL_CHAIN_NAME:-fuelBeta5}"
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV SERVER_BUILD=true

# Enable pnpm using corepack form node.js
RUN corepack enable

# Install dependencies for the entire monorepo
COPY packages/app-commons ./packages/app-commons
COPY packages/graphql ./packages/graphql
COPY package.json turbo.json pnpm-workspace.yaml ./

# Install dependencies for the entire monorepo
RUN pnpm install

# Expose the specified port
EXPOSE ${PORT}

# Start GraphQL server
WORKDIR /packages/graphql
CMD ["pnpm", "server:start"]
