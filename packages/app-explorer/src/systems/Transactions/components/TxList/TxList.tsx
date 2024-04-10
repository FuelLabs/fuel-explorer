'use client';

import type {
  GQLRecentTransactionFragment,
  GQLRecentTransactionsQuery,
} from '@fuel-explorer/graphql-new';
import type { BaseProps } from '@fuels/ui';
import { Flex, Grid, cx } from '@fuels/ui';
import { useRouter } from 'next/navigation';
import { Routes } from '~/routes';
import { Pagination } from '~/systems/Core/components/Pagination/Pagination';

import { TxCard } from '../TxCard/TxCard';

export type TxListProps = BaseProps<{
  transactions: GQLRecentTransactionFragment[];
  pageInfo?: GQLRecentTransactionsQuery['transactions']['pageInfo'];
  hidePagination?: boolean;
  isLoading?: boolean;
}>;

export function TxList({
  transactions,
  pageInfo,
  hidePagination,
  className,
  isLoading,
}: TxListProps) {
  const router = useRouter();

  return (
    <div className={cx('py-4 tablet:py-8 desktop:py-0', className)}>
      <Grid className="flex flex-col gap-6">
        {transactions.map((transaction) => (
          <TxCard
            key={transaction.id}
            isLoading={isLoading}
            transaction={transaction}
          />
        ))}
      </Grid>
      {!hidePagination && (
        <Flex className="mobile:justify-end">
          <Pagination
            hasPrev={pageInfo?.hasNextPage}
            hasNext={pageInfo?.hasPreviousPage}
            onPrev={() =>
              router.push(Routes.home.after(pageInfo?.endCursor ?? ''), {
                scroll: false,
              })
            }
            onNext={() =>
              router.push(Routes.home.before(pageInfo?.startCursor ?? ''), {
                scroll: false,
              })
            }
            className="mt-6 flex mobile:justify-end"
          />
        </Flex>
      )}
    </div>
  );
}
