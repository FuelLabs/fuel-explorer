import type { GQLTransactionItemFragment } from '@fuel-explorer/graphql/sdk';
import type {
  OperationCoin,
  OperationFunctionCall,
  OperationName,
  OperationTransactionAddress,
} from 'fuels';
import type { ViewModes } from '../Core/components/ViewMode/constants';

export type TxRouteRouterParams = {
  params: {
    id: string;
    mode?: ViewModes;
  };
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

export type TransactionNode = GQLTransactionItemFragment & {
  summary?: Array<OperationExtended>;
};
export type PendingTransaction = { id: string; status: 'indexing' };
export type IndexedTransaction = { id: string; status: 'synced' };
export type PendingTransactionState = 'indexing' | 'submitted' | undefined;

export type AssetInfo = Partial<{
  assetId: string;
  symbol: string;
  name: string;
  decimals: string;
  icon: string;
  contractId: string;
  suspicious: boolean;
  verified: boolean;
  amountInUsd: string;
}>;

export type OperationExtended = {
  name?: OperationName;
  from?: OperationTransactionAddress;
  to?: OperationTransactionAddress;
  calls?: Array<
    OperationFunctionCall & {
      asset?: AssetInfo;
    }
  >;
  assetsSent?: Array<
    OperationCoin & {
      asset?: AssetInfo;
    }
  >;
};
