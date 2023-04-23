FROM ghcr.io/fuellabs/fuel-core:v0.17.10

ENV MIN_GAS_PRICE="${MIN_GAS_PRICE}"
ENV CONSENSUS_KEY_SECRET="${CONSENSUS_KEY}"

# Install curl to use on healthcheck config
RUN apt update && apt install curl -y && apt install zip -y

WORKDIR /root/

COPY chainConfig.json .
COPY node-beta.zip .

RUN unzip node-beta.zip -d /mnt/node-beta

# https://stackoverflow.com/a/44671685
# https://stackoverflow.com/a/40454758
# hadolint ignore=DL3025
CMD ./fuel-core run \
    --ip 0.0.0.0 \
    --port 4000 \
    --db-path /mnt/node-beta \
    --utxo-validation \
    --min-gas-price ${MIN_GAS_PRICE} \
    --chain ./chainConfig.json

EXPOSE ${PORT}
