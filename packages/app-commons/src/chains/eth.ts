import type { Chain } from 'viem';
import { foundry, mainnet, sepolia } from 'wagmi/chains';
import { ETH_CHAIN_NAME } from '../constants/chainName';

type ChainName = 'foundry' | 'sepolia' | 'mainnet';

export const ETH_CHAINS: Record<ChainName, Chain> = {
  foundry,
  sepolia,
  mainnet,
};

export const ETH_CHAIN: Chain = ETH_CHAINS[ETH_CHAIN_NAME];
