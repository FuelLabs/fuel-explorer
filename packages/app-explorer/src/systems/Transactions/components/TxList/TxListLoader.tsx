import type { GQLRecentTransactionsQuery } from '@fuel-explorer/graphql';
import { TxList } from './TxList';

type TxListLoaderProps = {
  numberOfTxs?: number;
  page: string;
};

export const TxListLoader = ({ numberOfTxs = 4, page }: TxListLoaderProps) => {
  console.log(page);
  const baseArray = Array.from(
    { length: numberOfTxs },
    (_, index) => index + 1,
  );
  const txs = baseArray.map((v) => ({
    id: `${v}`,
  })) as GQLRecentTransactionsQuery['transactions']['nodes'];

  return <TxList isLoading transactions={txs} route="home" />;
};
