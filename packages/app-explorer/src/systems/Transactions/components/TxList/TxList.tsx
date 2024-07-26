'use client';
import type { GQLRecentTransactionsQuery } from '@fuel-explorer/graphql/sdk';
import { GqlPageInfo } from '@fuel-ts/account/dist/providers/__generated__/operations';
import type { BaseProps } from '@fuels/ui';
import { Flex, Grid, cx } from '@fuels/ui';
import { useRouter } from 'next/navigation';
import { Routes } from '~/routes';
import { Pagination } from '~/systems/Core/components/Pagination/Pagination';
import { TxCard } from '../TxCard/TxCard';

export type TxListProps = BaseProps<{
  transactions: GQLRecentTransactionsQuery['transactions']['nodes'];
  hidePagination?: boolean;
  isLoading?: boolean;
  pageInfo?: GqlPageInfo;
}>;

export function TxList({
  transactions = [],
  hidePagination,
  className,
  isLoading,
  pageInfo,
}: TxListProps) {
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
            prevCursor={pageInfo?.startCursor}
            nextCursor={pageInfo?.endCursor}
            className="mt-6 flex mobile:justify-end"
            onChange={(cursor, dir) =>
              router.push(Routes.home(cursor, dir), {
                scroll: false,
              })
            }
            pageInfo={pageInfo}
          />
        </Flex>
      )}
    </div>
  );
}
