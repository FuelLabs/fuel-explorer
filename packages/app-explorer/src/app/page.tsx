import { Suspense } from 'react';
import { TxListLoader } from '~/systems/Transactions/components/TxList/TxListLoader';
import { TxsTitle } from '~/systems/Transactions/components/TxsTitle/TxsTitle';
import { TxsScreenSync } from '~/systems/Transactions/pages/TxsScreenSync';
import type { TxsRouteProps } from '~/systems/Transactions/types';

export default async function Home({
  searchParams: { after, before },
}: TxsRouteProps) {
  return (
    <>
      <TxsTitle />
      <Suspense
        key={after || before}
        fallback={<TxListLoader numberOfTxs={10} />}
      >
        <TxsScreenSync after={after} before={before} />
      </Suspense>
    </>
  );
}

export const revalidate = 10;
