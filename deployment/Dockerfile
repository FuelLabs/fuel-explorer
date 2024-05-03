# This image contains the graphql server
# built for the fuel-explorer
FROM node:20-slim AS base

# Setup environment variables
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV SERVER_PORT="${SERVER_PORT:-3004}"
ENV FUEL_PROVIDER="${FUEL_PROVIDER:-https://beta-5.fuel.network/graphql}"
ENV SERVER_BUILD="${SERVER_BUILD}"
ENV SYNC_MISSING="${SYNC_MISSING}"
ENV DB_MIGRATE="${DB_MIGRATE}"
ENV DB_HOST="${DB_HOST}"
ENV DB_PORT="${DB_PORT}"
ENV DB_USER="${DB_USER}"
ENV DB_PASS="${DB_PASS}"
ENV DB_NAME="${DB_NAME}"
ENV PM2_HOME=/app-explorer/.pm2

# Enable pnpm using corepack from node.js
RUN corepack enable

# Create a non-privileged user
RUN useradd -m fuel

# Copy application code
COPY . /app-explorer

# Change ownership of the app-explorer to the non-privileged user
RUN chown -R fuel:fuel /app-explorer

# Install dependencies for the entire monorepo
WORKDIR /app-explorer
RUN pnpm install
RUN pnpm db:setup

# Expose the specified port
EXPOSE ${SERVER_PORT}

# Switch to non-privileged user
USER fuel

WORKDIR /app-explorer
CMD ["/app-explorer/scripts/run.sh"]

