import { foundry, mainnet, sepolia } from 'wagmi/chains';

export type ChainName = 'foundry' | 'sepolia' | 'mainnet';
type Chains = typeof foundry | typeof sepolia | typeof mainnet;

export const ETH_CHAINS: Record<ChainName, Chains> = {
  foundry,
  sepolia,
  mainnet,
};
