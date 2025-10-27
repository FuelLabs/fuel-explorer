import type { SupportedChain } from '../Chains';

export type BridgeTx = {
  date?: Date;
  txHash: string;
  nonce?: BigInt;
  fromNetwork: SupportedChain;
  toNetwork: SupportedChain;
};
