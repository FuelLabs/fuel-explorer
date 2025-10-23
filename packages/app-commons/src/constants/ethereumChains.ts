import { foundry, mainnet, sepolia } from 'wagmi/chains';
import type { ETH_CHAIN_NAME } from './chainName';

/**
 * Provides a centralized mapping of chain names to wagmi chain objects.
 */
export const ETH_CHAINS_MAP: Record<
  typeof ETH_CHAIN_NAME,
  typeof foundry | typeof sepolia | typeof mainnet
> = {
  foundry,
  sepolia,
  mainnet,
};
