import { Suspense } from 'react';
import { TxListLoader } from '~/systems/Transactions/components/TxList/TxListLoader';
import { TxsTitle } from '~/systems/Transactions/components/TxsTitle/TxsTitle';
import { TxsScreenSync } from '~/systems/Transactions/pages/TxsScreenSync';
import type { TxsRouteProps } from '~/systems/Transactions/types';

export default async function Home({
  searchParams: { cursor, dir },
}: TxsRouteProps) {
  return (
    <>
      <TxsTitle />
      <Suspense key={cursor} fallback={<TxListLoader numberOfTxs={10} />}>
        <TxsScreenSync cursor={cursor} dir={dir} />
      </Suspense>
    </>
  );
}

export const revalidate = 10;
