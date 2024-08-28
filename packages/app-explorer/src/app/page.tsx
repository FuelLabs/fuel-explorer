'use client';
import { GridTable } from '@fuels/ui';
import { Suspense } from 'react';
import { useState } from 'react';
import { columns, data } from '~/systems/Home/components/DataTable/data';
import { TxListLoader } from '~/systems/Transactions/components/TxList/TxListLoader';
import { TxsAccountTable } from '~/systems/Transactions/components/TxsAccontTable/TxsAccountTable';
import { TxsTitle } from '~/systems/Transactions/components/TxsTitle/TxsTitle';
import { TxsTokenTable } from '~/systems/Transactions/components/TxsTokenTable/TxsTokenTable';
import type { TxsRouteProps } from '~/systems/Transactions/types';

export default function Home({ searchParams: { page = '1' } }: TxsRouteProps) {
  const [activeTab, setActiveTab] = useState('Top Tokens');
  return (
    <>
      <TxsTitle activeTab={activeTab} setActiveTab={setActiveTab} />

      <Suspense
        key={page}
        fallback={<TxListLoader page={page} numberOfTxs={10} />}
      >
        {activeTab === 'Top Tokens' ? (
          <GridTable
            onPageChanged={() => {}}
            data={data}
            columns={columns}
            pageCount={1}
          />
        ) : activeTab === 'Top NFTs' ? (
          <TxsTokenTable />
        ) : activeTab === 'Top Accounts' ? (
          <TxsAccountTable />
        ) : (
          ''
        )}
      </Suspense>
    </>
  );
}
