import { Alert, Button, Grid, cx } from '@fuels/ui';
import { IconInfoCircle, IconLink } from '@tabler/icons-react';
import { Routes as PortalRoutes } from 'app-commons';
import { memo } from 'react';
import { Pagination } from '~/systems/Core/components/Pagination/Pagination';
import { TxCard } from '../TxCard/TxCard';

import type { GQLPageInfo } from '@fuel-explorer/graphql';
import { useNavigate, useSearchParams } from 'react-router-dom';

export type TxListProps = {
  transactions?: any[]; // Accept any transaction-like object for compatibility
  hidePagination?: boolean;
  pageInfoLoading?: boolean;
  isLoading?: boolean;
  pageInfo?: GQLPageInfo;
  owner?: string;
  route: 'home' | 'accountTxs' | 'blockSimple' | 'contractTxs';
  showBridgeWarning?: boolean;
  className?: string;
};

function _TxList({
  transactions = [],
  hidePagination,
  pageInfoLoading,
  className,
  isLoading,
  pageInfo,
  showBridgeWarning = false,
}: TxListProps) {
  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams();
  function setQueryParams(cursor: string, dir: 'after' | 'before') {
    const searchParams = new URLSearchParams();
    searchParams.set('cursor', cursor);
    searchParams.set('dir', dir);
    setSearchParams(searchParams);
  }
  const enablePagination = !hidePagination && pageInfo && !pageInfoLoading;
  const loadingPagination = !hidePagination && pageInfoLoading;

  return (
    <div className={cx('py-4 laptop:py-0', className)}>
      {showBridgeWarning && !!transactions.length && (
        <Alert color="blue" className="mt-1 mb-6">
          <Alert.Icon>
            <IconInfoCircle size="md" />
          </Alert.Icon>
          <Alert.Text>
            Bridge transactions will not appear here. You must connect your
            wallet and go to{' '}
            <Button
              onClick={() => {
                navigate(PortalRoutes.bridgeHistory());
              }}
              variant="link"
              className="mx-0.5 mb-0 mt-[-1px] text-blue-12"
            >
              Bridge {'>'} History
              <IconLink className="text-inherit" size={18} />
            </Button>
            to view your bridge transactions.
          </Alert.Text>
        </Alert>
      )}
      <Grid className={'flex flex-col gap-6'}>
        {transactions.map((transaction) => (
          <TxCard
            key={transaction.id}
            isLoading={isLoading}
            transaction={transaction}
          />
        ))}
      </Grid>

      {enablePagination && (
        <Pagination
          prevCursor={pageInfo?.startCursor}
          nextCursor={pageInfo?.endCursor}
          className="mt-6 flex justify-end"
          onChange={(cursor: string, dir: 'after' | 'before') =>
            setQueryParams(cursor, dir)
          }
          pageInfo={pageInfo}
        />
      )}
      {loadingPagination && (
        <Pagination
          prevCursor={'0x0'}
          nextCursor={'0x0'}
          className="mt-6 flex justify-end"
          pageInfo={{
            hasNextPage: true,
            hasPreviousPage: true,
            endCursor: 'x',
            startCursor: 'x',
          }}
        />
      )}
    </div>
  );
}

export const TxList = memo(_TxList);
