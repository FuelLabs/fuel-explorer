import type { GQLTransactionOutputFragment } from '@fuel-explorer/graphql';
import type { TxIconType } from '~/systems/Transaction/types';

export const typeNameMap: Record<
  GQLTransactionOutputFragment['__typename'],
  string
> = {
  ContractOutput: 'OUTPUT',
  ContractCreated: 'CREATED',
  VariableOutput: 'VARIABLE',
  ChangeOutput: 'CHANGE',
  CoinOutput: 'COIN',
};

export const txIconTypeMap: Record<
  GQLTransactionOutputFragment['__typename'],
  TxIconType
> = {
  ContractOutput: 'Contract',
  ContractCreated: 'Contract Created',
  VariableOutput: 'Mint',
  ChangeOutput: 'Wallet',
  CoinOutput: 'Wallet',
};
