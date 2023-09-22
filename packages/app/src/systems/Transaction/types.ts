import type { TransactionItemFragment } from '@fuel-explorer/graphql';
import type { BNInput } from '@fuel-ts/math';

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
  Info = 'Info',
  Warning = 'Warning',
}

export enum TxAccountTypeEnum {
  Wallet = 'Wallet',
  Contract = 'Contract',
  Predicate = 'Predicate',
}

export type TxStatus = keyof typeof TxStatusEnum;
export type TxType = keyof typeof TxTypeEnum;
export type TxAccountType = keyof typeof TxAccountTypeEnum;

export const TX_TYPES = Object.keys({ ...TxTypeEnum, ...TxAccountTypeEnum });
export const TX_STATUS = Object.keys(TxStatusEnum);

export type TransactionNode = TransactionItemFragment;

export type TxItem = {
  // From indexer
  transaction: TransactionNode;
  // Parsed Props
  title: TxAccountType | TxType;
  type: TxType;
  status: TxStatus;
  gasUsed: BNInput;
  timestamp: string;
  totalAssets: number;
  totalOperations: number;
  totalAccounts: number;
};
