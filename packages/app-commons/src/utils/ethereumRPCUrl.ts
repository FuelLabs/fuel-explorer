import { ALCHEMY_ID, INFURA_ID } from '../config';
import { ETH_CHAIN_NAME } from '../constants/chainName';

/**
 * Generates a default RPC URL based on the current chain.
 * For "foundry", it returns the local endpoint; for other networks, it returns a standard HTTP endpoint.
 */
export function getDefaultRpcUrl(): string | undefined {
  const network = ETH_CHAIN_NAME.toLowerCase();

  switch (network) {
    case 'mainnet':
      return 'https://cloudflare-eth.com';
    case 'foundry':
      return 'http://localhost:8545';
    case 'sepolia':
      return undefined;
    default:
      return `https://${network}.rpc.thirdweb.com`;
  }
}

/**
 * Returns an array of fallback RPC endpoints.
 * This list will be used to configure both ethers.FallbackProvider and viem fallback transport.
 */
// should remove this isVercelApi after we remove the get-transactions vercel api
export function getFallbackEndpoints() {
  const alchemyId = ALCHEMY_ID;
  if (ETH_CHAIN_NAME.toLowerCase() === 'foundry') {
    return ['http://localhost:8545'];
  }

  if (ETH_CHAIN_NAME.toLowerCase() === 'sepolia') {
    return [`https://eth-sepolia.g.alchemy.com/v2/${alchemyId}`];
  }

  if (ETH_CHAIN_NAME.toLowerCase() === 'mainnet') {
    return [
      `https://eth-mainnet.g.alchemy.com/v2/${alchemyId}`,
      `https://mainnet.infura.io/v3/${INFURA_ID}`,
      'https://eth.llamarpc.com',
    ];
  }
  return [];
}
