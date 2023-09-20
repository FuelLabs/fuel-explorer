import type { TransactionItemFragment } from '@fuel-explorer/graphql';
import type { BNInput } from 'fuels';

export enum TxTypeEnum {
  ContractCall = 'ContractCall',
  Mint = 'Mint',
  Transfer = 'Transfer',
  Burn = 'Burn',
}
export enum TxStatusEnum {
  Submitted = 'Submitted',
  Success = 'Success',
  Failure = 'Failure',
}

export type TxStatus = keyof typeof TxStatusEnum;
export type TxType = keyof typeof TxTypeEnum;

export const TX_TYPES = Object.keys(TxTypeEnum);
export const TX_STATUS = Object.keys(TxStatusEnum);

export type TransactionNode = TransactionItemFragment;

export type TxItem = {
  // From indexer
  transaction: TransactionNode;
  // Parsed Props
  type: TxType;
  status: TxStatus;
  gasUsed: BNInput;
  timestamp: string;
  totalAssets: number;
  totalOperations: number;
  totalAccounts: number;
};
