import { Suspense } from 'react';
import { getLastTxs } from '~/systems/Transaction/actions/get-last-txs';
import { TxList } from '~/systems/Transaction/component/TxList/TxList';
import { TxListSkeleton } from '~/systems/Transaction/component/TxList/TxListSkeleton';

type PageProps = {
  searchParams: {
    page?: string;
  };
};

export default async function Transactions({
  searchParams: { page = '1' },
}: PageProps) {
  const txs = await getLastTxs({ page: Number(page) });
  return (
    <Suspense fallback={<TxListSkeleton />}>
      <TxList transactions={txs} page={page} />
    </Suspense>
  );
}

export const revalidate = 10;
