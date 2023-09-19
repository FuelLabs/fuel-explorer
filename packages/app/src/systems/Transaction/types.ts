import type { Transaction } from '@fuel-explorer/graphql';
import type { BNInput } from 'fuels';

export enum TxTypeEnum {
  'contract-call' = 'contract-call',
  mint = 'mint',
  transfer = 'transfer',
  burn = 'burn',
}
export enum TxStatusEnum {
  idle = 'idle',
  pending = 'pending',
  success = 'success',
  error = 'error',
}

export type TxStatus = keyof typeof TxStatusEnum;
export type TxType = keyof typeof TxTypeEnum;

export const TX_TYPES = Object.values(TxTypeEnum);
export const TX_STATUS = Object.values(TxStatusEnum);

export type TxItem = {
  // From indexer
  transaction: Transaction;
  // Parsed Props
  type: TxType;
  status: TxStatus;
  gasUsed: BNInput;
  timestamp: string;
  totalAssets: number;
  totalOperations: number;
};
