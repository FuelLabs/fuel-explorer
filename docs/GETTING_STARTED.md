# Getting Started

## Requirements

This project includes both frontend and contracts. To begin, install dependencies:

- [Node.js v20.11.0 or latest stable](https://nodejs.org/en/). We recommend using [nvm](https://github.com/nvm-sh/nvm) to install.
- [PNPM v7.18.2 or latest stable](https://pnpm.io/installation/)
- [Docker v20.0.21 or latest stable](https://docs.docker.com/get-docker/)
- [Docker Compose v2.15.1 or latest stable](https://docs.docker.com/get-docker/)
- [Rust v1.68.2 or latest `stable`](https://www.rust-lang.org/tools/install)
- [Forc v0.37.1 with latest toolchain with forc index version v0.8.0](https://install.fuel.network/latest)

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

### 📒 - Run development

This command will start all the development services;

- It will start a `fuel-core` local node;
- It will start the explorer `graphql` API;

```
pnpm dev
```

### 📗 Development

<!-- ### 💻 - Run Web App

Start a local development frontend. After running the below command you can open [http://localhost:3004](http://localhost:3004) in your browser to view the frontend.

```sh
pnpm dev
``` -->

This section has a brief description of each directory. More details can be found inside each package, by clicking on the links.

- [packages/app](../packages/app/) Frontend application
- [packages/graphql](../packages/graphql/) Explorer Graphql API
- [docker](../docker/) Network and postgres

## 🧰 Useful Scripts

To make life easier we added as many useful scripts as possible to our [package.json](../package.json). These are some of the most used during development:

```sh
pnpm <command name>
```

| Script         | Description                                                          |
| -------------- | -------------------------------------------------------------------- |
| `node:start`   | Run the local network with `fuel-core` and the `faucet` API.         |
| `node:stop`    | Stop all containers without removing data                            |
| `node:clean`   | Stop and remove all development containers that are running locally. |
| `node:restart` | Restart all containers without removing data                         |

> Other scripts can be found in [package.json](../package.json).

<!-- ## Run Tests

To run all tests against the node and contract configured in `packages/app/.env` (or `packages/app/.env.test` if the file exists):

```sh
pnpm test
``` -->
