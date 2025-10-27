import type { BN } from 'fuels';

export const bnToBigInt = (bn: BN): bigint => BigInt(bn.toHex());
