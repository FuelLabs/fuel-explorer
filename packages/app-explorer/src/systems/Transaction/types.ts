import type { GQLTransactionItemFragment } from '@fuel-explorer/graphql/sdk';
import type { ViewModes } from '../Core/components/ViewMode/constants';

export type TxRouteParams = {
  id: string;
  mode?: ViewModes;
};

export type TxRouteProps = {
  params: TxRouteParams;
};

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
export type TxIconType =
  | TxType
  | TxAccountType
  | 'Message'
  | 'Contract Created'
  | 'Script';

export const TX_TYPES = Object.keys({ ...TxTypeEnum, ...TxAccountTypeEnum });
export const TX_STATUS = Object.keys(TxStatusEnum);
export const TX_ICON_TYPES = TX_TYPES.concat(['Message']);

export type TransactionNode = GQLTransactionItemFragment;
