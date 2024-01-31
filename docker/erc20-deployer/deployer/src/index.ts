import {
  getOrDeployECR20Contract,
  getOrDeployFuelTokenContract,
  getTokenId,
  setupEnvironment,
} from '@fuel-bridge/test-utils';
import { createServer } from 'http';

const {
  PORT,
  L1_CHAIN_HTTP,
  DEPLOYMENTS_HTTP,
  FUEL_GRAPHQL_ENDPOINT,
  PK_ETH_WALLET,
} = process.env;
const APP_PORT = PORT || 9090;

async function main() {
  const env = await setupEnvironment({
    http_ethereum_client: L1_CHAIN_HTTP,
    http_fuel_client: FUEL_GRAPHQL_ENDPOINT,
    http_deployer: DEPLOYMENTS_HTTP,
    pk_eth_signer2: PK_ETH_WALLET,
    pk_eth_deployer: PK_ETH_WALLET,
  });
  const ETHToken = await getOrDeployECR20Contract(env);
  const FuelToken = await getOrDeployFuelTokenContract(
    env,
    ETHToken,
    env.eth.fuelERC20Gateway,
    {
      gasPrice: 1,
      gasLimit: 1_000_000,
    },
    9
  );
  const tokenId = getTokenId(FuelToken);
  await startServer({
    ETH_ERC20: ETHToken.address,
    FUEL_TokenContract: FuelToken.id.toB256(),
    FUEL_TokenAsset: tokenId,
  });
}

function startServer(deployments: Record<string, string>) {
  return new Promise((resolve) => {
    createServer(function (req, res) {
      switch (req.url) {
        case '/health':
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('OK');
          break;
        case '/deployments':
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(deployments));
          break;
        default:
          res.writeHead(404, 'Not Found');
          res.end();
      }
    }).listen(Number(APP_PORT), 511, () => resolve(true));
  });
}

main()
  .then(() => {
    console.log(`Server listening on port ${APP_PORT}`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
