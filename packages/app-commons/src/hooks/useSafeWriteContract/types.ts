import type { Address } from 'viem';

export interface SafeWriteConditions {
  pauser?: Address[];
}

export interface SafeWriteContractParams {
  conditions?: SafeWriteConditions;
}
