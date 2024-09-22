import { createServer } from 'http';
import {
  getOrDeployECR20Contract,
  getOrDeployL2Bridge,
  getTokenId,
  setupEnvironment,
} from '@fuel-bridge/test-utils';

// Environment variables
const {
  PORT,
  L1_CHAIN_HTTP,
  DEPLOYMENTS_HTTP,
  FUEL_GRAPHQL_ENDPOINT,
  PK_ETH_WALLET,
} = process.env;
const APP_PORT = PORT || 9090;

async function main() {
  // Setup environment
  const env = await setupEnvironment({
    http_ethereum_client: L1_CHAIN_HTTP,
    http_fuel_client: FUEL_GRAPHQL_ENDPOINT,
    http_deployer: DEPLOYMENTS_HTTP,
    pk_eth_signer2: PK_ETH_WALLET,
  });

  // Deploy or get existing ERC20 contract
  const ETHToken = await getOrDeployECR20Contract(env);

  // Deploy or get existing L2 bridge
  const { contract, implementation } = await getOrDeployL2Bridge(
    env,
    env.eth.fuelERC20Gateway,
  );

  // Set asset issuer ID
  const fuelContractId = contract.id.toHexString();
  await env.eth.fuelERC20Gateway.setAssetIssuerId(fuelContractId);

  // Get ERC20 address and token ID
  const erc20Address = (await ETHToken.getAddress()).toLowerCase();
  const tokenId = getTokenId(contract, erc20Address);

  // Start the server with deployment details
  await startServer({
    ETH_ERC20: erc20Address,
    FUEL_TokenContract: fuelContractId,
    FUEL_TokenContractImplementation: implementation.id.toHexString(),
    FUEL_TokenAsset: tokenId,
  });
}

function startServer(deployments: Record<string, string>) {
  return new Promise((resolve) => {
    createServer((req, res) => {
      // Add CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Request-Method', '*');
      res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      res.setHeader('Access-Control-Allow-Headers', '*');

      if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
      }

      // Handle requests
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

// Start the main function
main()
  .then(() => {
    console.log(`Server listening on port ${APP_PORT}`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
