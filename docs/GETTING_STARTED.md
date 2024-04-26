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

### 📒 - Run local node

This command will start essential development services;

- `L1` local node (to handle ethereum blockchain);
- `Fuel` local node (to handle L2 chain);
- `Postgres` database (that we use to index data); 

```
pnpm node:start
```

> You can check more details in [docker-compose.yml](https://github.com/FuelLabs/fuel-explorer/blob/main/docker/docker-compose.yml) file.

### 💻 Run Web App

Now that you have the local node running, you can start the frontend.

First, let's create a `.env` file in the root of `packages/app-explorer` folder.

```sh
cp packages/app-explorer/.env.example packages/app-explorer/.env
```

Then, you can start the frontend with the following command:

After running the below command you can open [http://localhost:3000](http://localhost:3000) in your browser to view the explorer working.

```sh
pnpm dev
``` 

<!-- ## Run Tests

To run all tests against the node and contract configured in `packages/app/.env` (or `packages/app/.env.test` if the file exists):

```sh
pnpm test
``` -->

## 🧰 Useful Scripts

To make life easier we added as many useful scripts as possible to our [package.json](../package.json). 
These are some of the most used during development:

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
