'use client';

import type { GetLastTransactionsQuery } from '@fuel-explorer/graphql';
import type { BaseProps } from '@fuels/ui';
import { Flex, Grid } from '@fuels/ui';
import { useRouter } from 'next/navigation';
import { Pagination } from '~/systems/Core/components/Pagination/Pagination';

import { TxCard } from '../TxCard/TxCard';

type TxListProps = BaseProps<{
  page?: string;
  transactions: GetLastTransactionsQuery['transactions']['edges'];
  hidePagination?: boolean;
  isLoading?: boolean;
}>;

export function TxList({
  page: currentPage = '1',
  transactions = [],
  hidePagination,
  className,
  isLoading,
}: TxListProps) {
  const page = Number(currentPage);
  const router = useRouter();

  return (
    <div className={className}>
      <Grid className={'flex flex-col gap-6'}>
        {transactions.map((transaction) => (
          <TxCard
            key={transaction.node.id}
            isLoading={isLoading}
            transaction={transaction.node}
          />
        ))}
      </Grid>
      {!hidePagination && (
        <Flex className="mobile:justify-end">
          <Pagination
            page={page}
            className="mt-6 flex mobile:justify-end"
            onChange={(page) => router.push(`/transactions?page=${page}`)}
          />
        </Flex>
      )}
    </div>
  );
}
