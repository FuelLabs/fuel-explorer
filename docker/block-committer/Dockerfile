FROM ghcr.io/fuellabs/fuel-block-committer:v0.4.0

ARG ETHEREUM_WALLET_KEY=""
ARG COMMIT_INTERVAL=1
ARG COMMITER_IP=0.0.0.0
ARG COMMITER_PORT=8888
ARG ETHEREUM_CHAIN="hardhat"
ARG ETHEREUM_RPC=""
ARG FUEL_GRAPHQL_ENDPOINT=""

# dependencies
ENV DEBIAN_FRONTEND=noninteractive
# Swap to apt's geo-routing mirror — picks the nearest healthy mirror per
# request, dramatically faster than the default archive.ubuntu.com round-robin
# (which has been throttling CI builds).
RUN sed -i \
    -e 's|http://archive\.ubuntu\.com/ubuntu|mirror+http://mirrors.ubuntu.com/mirrors.txt|g' \
    -e 's|http://security\.ubuntu\.com/ubuntu|mirror+http://mirrors.ubuntu.com/mirrors.txt|g' \
    /etc/apt/sources.list
RUN apt update && apt install -y curl jq && rm -rf /var/lib/apt/lists/*

# copy chain config
WORKDIR /block-committer

# expose fuel node port
ENV ETHEREUM_WALLET_KEY="${ETHEREUM_WALLET_KEY}"
ENV COMMIT_INTERVAL="${COMMIT_INTERVAL}"
ENV HOST="${COMMITER_IP}"
ENV PORT="${COMMITER_PORT}"
ENV ETHEREUM_CHAIN="${ETHEREUM_CHAIN}"
ENV ETHEREUM_RPC="${ETHEREUM_RPC}"
ENV FUEL_GRAPHQL_ENDPOINT="${FUEL_GRAPHQL_ENDPOINT}"
EXPOSE ${PORT}

# copy over script and run
COPY ./block-commiter.sh .
CMD ["sh", "./block-commiter.sh"]
