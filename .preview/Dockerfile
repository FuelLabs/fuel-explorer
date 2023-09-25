FROM node:20-slim AS base

# Receive envs on build time
ARG IS_PREVIEW
ARG GRAPHQL_API
ARG FUEL_PROVIDER_URL

# Expose the args to the env of the container
ENV IS_PREVIEW="${IS_PREVIEW}"
ENV GRAPHQL_API="${GRAPHQL_API}"
ENV FUEL_PROVIDER_URL="${FUEL_PROVIDER_URL}"

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY . /preview

WORKDIR /preview

RUN pnpm install --frozen-lockfile
ENV NODE_OPTIONS="--max-old-space-size=1024"
RUN pnpm build:preview

EXPOSE 3000

CMD ["pnpm", "start"]