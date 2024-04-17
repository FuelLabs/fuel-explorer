import type { GQLRecentTransactionFragment } from '@fuel-explorer/graphql';
import { TxList } from './TxList';

type TxListLoaderProps = {
  numberOfTxs?: number;
};

export const TxListLoader = ({ numberOfTxs = 4 }: TxListLoaderProps) => {
  const baseArray = Array.from(
    { length: numberOfTxs },
    (_, index) => index + 1,
  );
  const txs: GQLRecentTransactionFragment[] = baseArray.map((v) => ({
    __typename: 'Transaction',
    id: v.toString(),
    title: '',
    time: {
      __typename: 'ParsedTime',
      fromNow: null,
    },
  }));

  return <TxList isLoading transactions={txs} pageInfo={undefined} />;
};
