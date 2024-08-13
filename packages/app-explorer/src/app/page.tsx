'use client';

import { Suspense } from 'react';
import GridTable from '~/systems/Home/components/DataTable/GridTable';
import { columns, data } from '~/systems/Home/components/DataTable/data';
import { TxListLoader } from '~/systems/Transactions/components/TxList/TxListLoader';
import { TxsTitle } from '~/systems/Transactions/components/TxsTitle/TxsTitle';
import type { TxsRouteProps } from '~/systems/Transactions/types';

export default function Home({ searchParams: { page = '1' } }: TxsRouteProps) {
  return (
    <>
      <TxsTitle />

      <Suspense
        key={page}
        fallback={<TxListLoader page={page} numberOfTxs={10} />}
      >
        <GridTable data={data} columns={columns} pageCount={1} />
      </Suspense>
    </>
  );
}
