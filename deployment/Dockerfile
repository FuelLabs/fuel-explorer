FROM node:20-slim AS base

# Expose the ENVs to the env of the container
ENV PORT="${PORT}"
ENV FUEL_PROVIDER_URL="${FUEL_PROVIDER_URL}"
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable pnpm using corepack form node.js
RUN corepack enable

COPY . /app
WORKDIR /app

RUN pnpm install --frozen-lockfile

EXPOSE 3000

WORKDIR /app/packages/graphql

CMD ["pnpm", "start"]
