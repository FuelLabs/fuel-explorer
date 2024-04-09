import { TxList } from './TxList';

type TxListLoaderProps = {
  numberOfTxs?: number;
};

export const TxListLoader = ({ numberOfTxs = 4 }: TxListLoaderProps) => {
  const baseArray = Array.from(
    { length: numberOfTxs },
    (_, index) => index + 1,
  );
  const txs = baseArray.map((v) => ({
    node: { id: v },
  })) as any;

  return <TxList isLoading transactions={txs} pageInfo={undefined} />;
};
