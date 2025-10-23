FROM ghcr.io/fuellabs/fuel-core:v0.45.1

ARG FUEL_IP=0.0.0.0
ARG FUEL_PORT=4001
ARG CONSENSUS_KEY_SECRET="0xc8e615a4089466174459ef19cfd257d2e17adfabff3b8f219dbb5fb4eca87c50"

# dependencies
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -y curl jq && rm -rf /var/lib/apt/lists/*
RUN apt update && apt install -y git curl jq && rm -rf /var/lib/apt/lists/*

# copy chain config
WORKDIR /fuel

COPY ./genesis_coins.json .

#  Fuel Core 0.43.1, needs to be changed when core version is updated
RUN git clone \
    https://github.com/FuelLabs/chain-configuration.git \
    /chain-configuration && \
    cd /chain-configuration && \
    git checkout f3e89dabff27341b4a78cbca7254761104afcebc

# Copy the base local configuration
RUN cp -R /chain-configuration/local/* ./

# Copy the testnet consensus parameters and state transition bytecode
RUN cp /chain-configuration/upgradelog/ignition-devnet/consensus_parameters/17.json \
    ./latest_consensus_parameters.json
RUN cp /chain-configuration/upgradelog/ignition-devnet/state_transition_function/30.wasm \
    ./state_transition_bytecode.wasm

# update local state_config with custom genesis coins config
RUN jq '.coins = input' \
    state_config.json genesis_coins.json > tmp.json \
    && mv tmp.json state_config.json

# update local chain_config with testnet consensus parameters
RUN jq '.consensus_parameters = input' \
    chain_config.json latest_consensus_parameters.json > tmp.json \
    && mv tmp.json chain_config.json

# update local chain_config with the correct `genesis_state_transition_version`
RUN jq '.genesis_state_transition_version = 30' chain_config.json > tmp.json \
    && mv tmp.json chain_config.json

# expose fuel node port
ENV FUEL_IP="${FUEL_IP}"
ENV FUEL_PORT="${FUEL_PORT}"
ENV CONSENSUS_KEY_SECRET="${CONSENSUS_KEY_SECRET}"
EXPOSE ${FUEL_PORT}

# copy over script and run
COPY ./fuel_core.sh .
CMD ["sh", "./fuel_core.sh"]
