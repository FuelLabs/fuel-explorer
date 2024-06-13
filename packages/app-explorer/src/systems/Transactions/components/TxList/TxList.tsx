'use client';
import type { GQLRecentTransactionsQuery } from '@fuel-explorer/graphql-new';
import type { BaseProps } from '@fuels/ui';
import { Flex, Grid, cx } from '@fuels/ui';
import { useRouter } from 'next/navigation';
import { Routes } from '~/routes';
import { Pagination } from '~/systems/Core/components/Pagination/Pagination';
import { TxCard } from '../TxCard/TxCard';

export type TxListProps = BaseProps<{
  page?: string;
  transactions: GQLRecentTransactionsQuery['transactions']['nodes'];
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
    <div className={cx('py-4 tablet:py-8 desktop:py-0', className)}>
      <Grid className={'flex flex-col gap-6'}>
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
            page={page}
            className="mt-6 flex mobile:justify-end"
            onChange={(page) =>
              router.push(Routes.home(page.toString()), {
                scroll: false,
              })
            }
          />
        </Flex>
      )}
    </div>
  );
}
