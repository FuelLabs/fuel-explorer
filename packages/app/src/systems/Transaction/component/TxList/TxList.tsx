'use client';

import type { GetLastTransactionsQuery } from '@fuel-explorer/graphql';
import type { BaseProps } from '@fuels/ui';
import { Flex, Grid, cx } from '@fuels/ui';
import { useRouter } from 'next/navigation';
import { Pagination } from '~/systems/Core/components/Pagination/Pagination';

import { TxCard } from '../TxCard/TxCard';

type TxListProps = BaseProps<{
  page?: string;
  transactions: GetLastTransactionsQuery['transactions']['edges'];
  hidePagination?: boolean;
}>;

export function TxList({
  page: currentPage = '1',
  transactions = [],
  hidePagination,
  className,
}: TxListProps) {
  const page = Number(currentPage);
  const router = useRouter();

  return (
    <div className={cx('py-4 tablet:py-8 desktop:py-0', className)}>
      <Grid
        className={
          'grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:gap-x-8 gap-y-6 gap-x-6'
        }
      >
        {transactions.map((transaction) => (
          <TxCard key={transaction.node.id} transaction={transaction.node} />
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
