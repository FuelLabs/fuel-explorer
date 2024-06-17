# This image contains the graphql server
# built for the fuel-explorer
FROM node:20-slim AS base

# Expose the ENVs to the env of the container
ENV PORT=3000
ENV FUEL_PROVIDER="${FUEL_PROVIDER:-https://testnet.fuel.network/v1/graphql}"
ENV SERVER_BUILD=true
ENV NEXT_PUBLIC_ETH_CHAIN_NAME="sepolia"
ENV NEXT_PUBLIC_FUEL_CHAIN_NAME="fuelLocal"
ENV NEXT_PUBLIC_FUEL_VERSION="0.26.0"
ENV NEXT_PUBLIC_IS_PUBLIC_PREVIEW=false
ENV NEXT_PUBLIC_WALLET_INSTALL="https://chrome.google.com/webstore/detail/fuel-wallet/dldjpboieedgcmpkchcjcbijingjcgok"
ENV NEXT_PUBLIC_WALLET_INSTALL_NEXT="https://next-wallet.fuel.network/docs/install/#install-from-source-code"

# Install dependencies for the entire monorepo
COPY ./packages/app-explorer/.next /app/.next
COPY ./packages/app-explorer/public /app/public
COPY ./deployment/ui/package.json /app/package.json
WORKDIR /app

# Install dependencies for the entire monorepo
RUN npm install

# Expose the specified port
EXPOSE ${PORT}

# Start GraphQL server
WORKDIR /app
CMD ["npm", "run", "start"]
