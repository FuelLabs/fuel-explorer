# This image contains a preview environment
# of the fuel-explorer containing;
# graphql server, next.js app ui, and storybooks
FROM node:20-slim AS base

# Receive envs on build time
ARG IS_PREVIEW=true
ARG GRAPHQL_API=http://localhost:4444/graphql

# Expose the args to the env of the container
ENV IS_PREVIEW="${IS_PREVIEW}"
ENV GRAPHQL_API="${GRAPHQL_API}"

# Expose the ENVs to the env of the container
ENV FUEL_PROVIDER_URL="${FUEL_PROVIDER_URL}"
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable pnpm using corepack form node.js
RUN corepack enable

COPY . /preview
WORKDIR /preview

RUN pnpm install --frozen-lockfile
RUN pnpm build:preview

EXPOSE 3000
EXPOSE 4444

CMD ["pnpm", "start"]
