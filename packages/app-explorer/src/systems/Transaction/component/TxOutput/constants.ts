import type { GQLTransactionOutputFragment } from '@fuel-explorer/graphql';
import type { TxIconType } from '~/systems/Transaction/types';

// i18n keys for the item type label.
export const typeNameMap: Record<
  GQLTransactionOutputFragment['__typename'],
  string
> = {
  ContractOutput: 'tx.output_type.contract',
  ContractCreated: 'tx.output_type.created',
  VariableOutput: 'tx.output_type.variable',
  ChangeOutput: 'tx.output_type.change',
  CoinOutput: 'tx.output_type.coin',
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
