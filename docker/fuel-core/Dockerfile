FROM ghcr.io/fuellabs/fuel-core:v0.33.0

ARG FUEL_IP=0.0.0.0
ARG FUEL_PORT=4001
ARG CONSENSUS_KEY_SECRET="0xc8e615a4089466174459ef19cfd257d2e17adfabff3b8f219dbb5fb4eca87c50"

# dependencies
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -y curl jq && rm -rf /var/lib/apt/lists/*

# copy chain config
WORKDIR /fuel
COPY ./chain_config.json .
COPY ./metadata.json .
COPY ./state_config.json .
RUN curl \
	https://github.com/FuelLabs/fuel-core/tree/v0.34.0/bin/fuel-core/chainspec/local-testnet \
  -o ./state_transition_bytecode.wasm

# expose fuel node port
ENV FUEL_IP="${FUEL_IP}"
ENV FUEL_PORT="${FUEL_PORT}"
ENV CONSENSUS_KEY_SECRET="${CONSENSUS_KEY_SECRET}"
EXPOSE ${FUEL_PORT}

# copy over script and run
COPY ./fuel_core.sh .
CMD ["sh", "./fuel_core.sh"]
