# This image contains the graphql server
# built for the fuel-explorer
FROM node:20-slim AS base

# Expose the ENVs to the env of the container
ENV PORT="${PORT}"
ENV FUEL_PROVIDER="${FUEL_PROVIDER:-https://beta-5.fuel.network/graphql}"
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV SERVER_BUILD=true

# Enable pnpm using corepack form node.js
RUN corepack enable

# Install dependencies for the entire monorepo
COPY . /app-explorer
WORKDIR /app-explorer

# Install dependencies for the entire monorepo
RUN pnpm install

# Expose the specified port
EXPOSE ${PORT}

# Start GraphQL server
WORKDIR /app-explorer
CMD ["pnpm", "server:start"]
