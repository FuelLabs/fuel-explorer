import { foundry, sepolia } from 'wagmi/chains';

type ChainName = typeof process.env.NEXT_PUBLIC_ETH_CHAIN_NAME;
type Chains = typeof foundry | typeof sepolia;

export const ETH_CHAINS: Record<ChainName, Chains> = {
  foundry,
  sepolia,
};
