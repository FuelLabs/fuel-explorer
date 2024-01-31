import { Suspense } from 'react';
import { TxListLoader } from '~/systems/Transactions/components/TxList/TxListLoader';
import { TxsTitle } from '~/systems/Transactions/components/TxsTitle/TxsTitle';
import { TxsScreenSync } from '~/systems/Transactions/pages/TxsScreenSync';
import type { TxsRouteProps } from '~/systems/Transactions/types';

export default async function Home({
  searchParams: { page = '1' },
}: TxsRouteProps) {
  return (
    <>
      <TxsTitle />
      <Suspense
        key={page}
        fallback={<TxListLoader page={page} numberOfTxs={10} />}
      >
        <TxsScreenSync page={page} />
      </Suspense>
    </>
  );
}

export const revalidate = 10;
