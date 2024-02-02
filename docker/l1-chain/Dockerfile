# ====== Build Image ======
FROM node:18-alpine AS BUILD_IMAGE

# dependencies
RUN apk --no-cache add git
RUN npm i -g pnpm

# set workdir
WORKDIR /l1chain

# clone the contracts repo
RUN git clone --depth 1 --branch main https://github.com/FuelLabs/fuel-bridge.git /tmp/fuel-bridge
RUN mv /tmp/fuel-bridge/packages/solidity-contracts /l1chain/portal-contracts

# copy over the fuel chain and replace consts values
ADD ./.fuelChainConsts.env /l1chain/portal-contracts/.fuelChainConsts.env
WORKDIR /l1chain/portal-contracts

# build the ethereum contracts and environment
RUN pnpm install
# replace the fuel chain consts values and change contract code
RUN pnpm ts-node scripts/replaceFuelChainConsts.ts
# run contract compile with the new consts
RUN pnpm compile

# remove build dependencies
# RUN pnpm prune --prod
COPY ./hardhat/hardhat.config.ts .

# ====== Final Image ======
FROM node:18-alpine

ARG L1_IP=0.0.0.0
ARG L1_PORT=8545
ARG SERVE_PORT=8081

# dependencies
RUN apk --no-cache add curl
RUN npm i -g pnpm

# set workdir
WORKDIR /l1chain

# clone the contracts repo
COPY --from=BUILD_IMAGE /l1chain/portal-contracts ./portal-contracts
WORKDIR /l1chain/portal-contracts

# expose node and server port
ENV L1_IP="${L1_IP}"
ENV L1_PORT="${L1_PORT}"
ENV SERVE_PORT="${SERVE_PORT}"
EXPOSE ${L1_PORT}
EXPOSE ${SERVE_PORT}

# copy over script and run
COPY ./l1_chain.sh /l1chain/l1_chain.sh
CMD ["sh", "/l1chain/l1_chain.sh"]
