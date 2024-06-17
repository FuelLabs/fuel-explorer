FROM ghcr.io/fuellabs/fuel-core:v0.28.0

ARG FUEL_IP=0.0.0.0
ARG FUEL_PORT=4002
ARG SERVICE_NAME="fuel-core-testnet-sepolia"

# dependencies
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -y curl jq && rm -rf /var/lib/apt/lists/*

# copy chain config
WORKDIR /fuel
COPY ./chain_config.json .
COPY ./metadata.json .
COPY ./state_config.json .
COPY ./state_transition_bytecode.wasm .

ENV FUEL_IP="${FUEL_IP}"
ENV FUEL_PORT="${FUEL_PORT}"
ENV SERVICE_NAME="${SERVICE_NAME}"
ENV RELAYER_URL="${RELAYER_URL}"
ENV P2P_KEY_SECRET="${P2P_KEY_SECRET}"
EXPOSE ${FUEL_PORT}

# copy over script and run
COPY ./run.sh .
CMD ["sh", "./run.sh"]
