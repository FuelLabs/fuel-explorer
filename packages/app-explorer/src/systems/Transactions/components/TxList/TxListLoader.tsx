import type { GetLastTransactionsQuery } from '@fuel-explorer/graphql';
import { TxList } from './TxList';

type TxListLoaderProps = {
  page?: string;
  numberOfTxs?: number;
};

export const TxListLoader = ({
  numberOfTxs = 4,
  page = '1',
}: TxListLoaderProps) => {
  const baseArray = Array.from(
    { length: numberOfTxs },
    (_, index) => index + 1,
  );
  const txs = baseArray.map((v) => ({
    node: { id: `${v}` },
  })) as GetLastTransactionsQuery['transactions']['edges'];

  return <TxList isLoading transactions={txs} page={page} />;
};
