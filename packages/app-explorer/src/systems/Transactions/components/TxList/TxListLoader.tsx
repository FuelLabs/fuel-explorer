import type { GQLRecentTransactionsQuery } from '@fuel-explorer/graphql';
import { TxList } from './TxList';

type TxListLoaderProps = {
  numberOfTxs?: number;
  className?: string;
};

export const TxListLoader = ({
  numberOfTxs = 4,
  className,
}: TxListLoaderProps) => {
  const txs = Array.from({ length: numberOfTxs }, (_, i) => ({
    id: `${i + 1}`,
  })) as GQLRecentTransactionsQuery['transactions']['nodes'];

  return (
    <TxList
      isLoading
      transactions={txs}
      className={className}
      route="home"
      hidePagination={false}
      pageInfoLoading={true}
    />
  );
};
