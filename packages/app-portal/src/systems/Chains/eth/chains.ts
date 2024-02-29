import { ETH_CHAIN_NAME } from 'app-commons';
import { foundry, sepolia } from 'wagmi/chains';

type Chains = typeof foundry | typeof sepolia;

export const ETH_CHAINS: Record<typeof ETH_CHAIN_NAME, Chains> = {
  foundry,
  sepolia,
};
