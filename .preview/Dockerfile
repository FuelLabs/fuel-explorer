FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /preview

WORKDIR /preview

RUN pnpm install --frozen-lockfile
RUN pnpm build:preview

EXPOSE 3000

CMD ["pnpm", "start"]