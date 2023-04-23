# Getting Started

## Requirements

This project includes both frontend and contracts. To begin, install dependencies:

- [Node.js v18.14.1 or latest stable](https://nodejs.org/en/). We recommend using [nvm](https://github.com/nvm-sh/nvm) to install.
- [PNPM v7.18.2 or latest stable](https://pnpm.io/installation/)
- [Docker v20.0.21 or latest stable](https://docs.docker.com/get-docker/)
- [Docker Compose v2.15.1 or latest stable](https://docs.docker.com/get-docker/)
- [Rust v1.68.2 or latest `stable`](https://www.rust-lang.org/tools/install)
- [Forc v0.37.1 with latest toolchain with forc index version v0.8.0](https://install.fuel.network/latest)
- [WebAssembly](https://github.com/fuellabs/fuel-indexer#webassembly)

## Running Project Locally

### 📚 - Getting the Repository

1. Visit the [Fuel Explorer](https://github.com/FuelLabs/fuel-explorer) repo and fork the project.
2. Then clone your forked copy to your local machine and get to work.

```sh
git clone https://github.com/FuelLabs/fuel-explorer
cd fuel-explorer
```

### 📦 - Install Dependencies

```sh
pnpm install
```

### 📒 - Run Services

In this step, we are going to;

- launch a local `fuel-core` and a indexer;

```sh
pnpm services:start
```

> The indexer will start indexing the blocks from the `fuel-core` node. This process may take couple of minutes until all the blocks are indexed. If you need to have more Transactions you can change `start_block` on the [indexer.manifest.yaml](../packages/indexer/indexer.manifest.yaml).

To stop the node, run:

```sh
pnpm services:stop
```

## 📗 Indexer

### 🚧 - Run deploymnent watcher

When developing this process will automatically deploy your code changes to the indexer.

```sh
pnpm dev:indexer
```

> When changing the indexer code, it's possible that the data schema is not compatible with previous versions. In this cases run `pnpm clean:indexer` to restart the indexing with the new schema.

### 🔍 See logs from the indexer

On development you may need to see the logs of the indexer to debug some issues. To do that you can run:

```sh
docker logs -f fuel-explorer-indexer
```

<!-- ### 💻 - Run Web App

Start a local development frontend. After running the below command you can open [http://localhost:3004](http://localhost:3004) in your browser to view the frontend.

```sh
pnpm dev
``` -->

## 📗 Project Overview

This section has a brief description of each directory. More details can be found inside each package, by clicking on the links.

- [packages/indexer](../packages/indexer/) Indexing logic for the Fuel Explorer
- [packages/app](../packages/app/) Frontend application
- [docker](../docker/) Network, postgres and indexer configurations

## 🧰 Useful Scripts

To make life easier we added as many useful scripts as possible to our [package.json](../package.json). These are some of the most used during development:

```sh
pnpm <command name>
```

| Script             | Description                                                                  |
| ------------------ | ---------------------------------------------------------------------------- |
| `dev:indexer`      | Run development server for Indexer [packages/indexer](../packages/indexer/). |
| `clean:indexer`    | Clean all data from indexer and restart all services                         |
| `services:stop`    | Stop and remove all development containers that are running locally.         |
| `services:start`   | Run the local network with `fuel-core` and the `faucet` API.                 |
| `services:down`    | Stop all containers without removing data                                    |
| `services:restart` | Restart all containers without removing data                                 |

> Other scripts can be found in [package.json](../package.json).

<!-- ## Run Tests

To run all tests against the node and contract configured in `packages/app/.env` (or `packages/app/.env.test` if the file exists):

```sh
pnpm test
``` -->
