import type { GQLTransactionOutputFragment } from '@fuel-explorer/graphql';
import type { CardProps } from '@fuels/ui';
import type { InputContract } from '~/systems/Transaction/component/TxInput/TxInputContract/types';

export type TxOutputProps<T = GQLTransactionOutputFragment> = CardProps & {
  output: T;
  getContractByIndex: (index: number) => InputContract | undefined;
  txStatus?: string | null;
};
