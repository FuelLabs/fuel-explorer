FROM node:18-alpine

# Setup workdir
WORKDIR /ecr20-deployer

# Copy deployer project
ADD ./deployer /erc20-deployer/deployer

# Run install inside the depdencies
WORKDIR /erc20-deployer/deployer

# Install Git
RUN apk update && apk add --no-cache git

RUN npm i -g pnpm

# build the ethereum contracts and environment
RUN pnpm install

# expose env variables
ENV L1_CHAIN_HTTP="${L1_CHAIN_HTTP}"
ENV FUEL_GRAPHQL_ENDPOINT="${FUEL_GRAPHQL_ENDPOINT}"
ENV DEPLOYMENTS_HTTP="${DEPLOYMENTS_HTTP}"
ENV PORT="${PORT}"
ENV PK_ETH_WALLET="${PK_ETH_WALLET}"
EXPOSE ${PORT}

# copy over script and run
CMD ["pnpm", "start"]


      # L1_CHAIN_HTTP=http://localhost:8545 \
      # FUEL_GRAPHQL_ENDPOINT=http://localhost:4000/graphql \
      # DEPLOYMENTS_HTTP=http://localhost:8080 \
      # PK_ETH_WALLET=59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d \
      # pnpm start