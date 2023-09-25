FROM node:20-slim AS base

# Expose the ENVs to the env of the container
ENV PORT="${PORT}"
ENV PUBLIC_FUEL_NODE_URL="${PUBLIC_FUEL_NODE_URL}"
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable pnpm using corepack form node.js
RUN corepack enable

COPY . /preview

WORKDIR /preview

RUN pnpm install --frozen-lockfile
RUN pnpm turbo run start --filter=graphql

EXPOSE 3000

CMD ["pnpm", "start"]
