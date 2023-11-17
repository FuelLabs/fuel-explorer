/* eslint-disable @typescript-eslint/no-explicit-any */
import { TxList } from './TxList';

export const TxListLoader = () => {
  const txs = [1, 2, 3, 4].map((v) => ({ node: { id: v } }));

  return <TxList isLoading transactions={txs as any} />;
};
