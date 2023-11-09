'use client';

import type { GetLastTransactionsQuery } from '@fuel-explorer/graphql';
import { Grid } from '@fuels/ui';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'react-use';
import { Pagination } from '~/systems/Core/components/Pagination/Pagination';

import { TxCard } from '../TxCard/TxCard';

type TxListProps = {
  page?: string;
  transactions: GetLastTransactionsQuery['transactions']['edges'];
  hidePagination?: boolean;
};

export function TxList({
  page: currentPage = '1',
  transactions = [],
  hidePagination,
}: TxListProps) {
  const page = Number(currentPage);
  const { width } = useWindowSize();
  const router = useRouter();

  return (
    <div className="p-4 md:p-8 xl:p-0">
      <Grid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 gap-y-6 gap-x-6">
        {transactions.map((transaction) => (
          <TxCard key={transaction.node.id} transaction={transaction.node} />
        ))}
      </Grid>
      {!hidePagination && width < 640 && (
        <Pagination
          page={page}
          className="mt-6"
          onChange={(page) => router.push(`/transactions/${page}`)}
        />
      )}
    </div>
  );
}
