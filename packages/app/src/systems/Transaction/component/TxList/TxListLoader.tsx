/* eslint-disable @typescript-eslint/no-explicit-any */
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
    node: { id: v },
  })) as any;

  return <TxList isLoading transactions={txs} page={page} />;
};
