import { GridFrame, Reveal, cx } from '@fuels/ui';
import { memo } from 'react';
import { Pagination } from '~/systems/Core/components/Pagination/Pagination';
import { useTxApps } from '../../hooks/useTxApps';
import { BridgeNotice } from '../BridgeNotice/BridgeNotice';
import { TxCard } from '../TxCard/TxCard';

import type { GQLPageInfo } from '@fuel-explorer/graphql';
import { useSearchParams } from 'react-router-dom';

export type TxListProps = {
  transactions?: any[]; // Accept any transaction-like object for compatibility
  hidePagination?: boolean;
  pageInfoLoading?: boolean;
  isLoading?: boolean;
  pageInfo?: GQLPageInfo;
  owner?: string;
  route: 'home' | 'accountTxs' | 'blockSimple' | 'contractTxs';
  showBridgeWarning?: boolean;
  showApps?: boolean;
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
  showApps = false,
}: TxListProps) {
  const { apps, isPending: appsPending } = useTxApps(
    transactions,
    showApps && !isLoading,
  );
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
        <BridgeNotice className="mt-1 mb-6" />
      )}
      <GridFrame className="grid-cols-1">
        {transactions.map((transaction, index) => (
          <Reveal key={transaction.id} delay={Math.min(index, 9) * 0.03}>
            <TxCard
              isLoading={isLoading}
              transaction={transaction}
              apps={apps?.[transaction.id]}
              appsPending={appsPending && transaction.title === 'Script'}
              appsDelay={Math.min(index, 9) * 0.04}
            />
          </Reveal>
        ))}
      </GridFrame>

      {enablePagination && (
        <Pagination
          prevCursor={pageInfo?.startCursor}
          nextCursor={pageInfo?.endCursor}
          className="mt-6 flex justify-end pr-[17px]"
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
          className="mt-6 flex justify-end pr-[17px]"
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
