# This image contains the graphql server
# built for the fuel-explorer
FROM node:20-slim AS base

# Expose the ENVs to the env of the container
ENV PATH="$PNPM_HOME:$PATH"
ENV PNPM_HOME="/pnpm"

# We need this to build graphql codegen after PNPM install
ARG FUEL_PROVIDER

# Enable pnpm using corepack form node.js
RUN corepack enable

# Install dependencies for the entire monorepo
COPY . /app-explorer
WORKDIR /app-explorer

# Install dependencies for the entire monorepo
RUN pnpm install --ignore-scripts

# Expose the specified port
EXPOSE ${SERVER_PORT}
EXPOSE ${SYNCER_PORT}

# Start GraphQL server
WORKDIR /app-explorer
CMD ["./scripts/run.sh"]
