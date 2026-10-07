import { Button, VStack } from '@fuels/ui';
import { useModal } from 'connectkit';
import { type Variants, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import {
  AnimatedTable,
  type Cell,
} from '~staking/systems/Core/components/AnimatedTable/AnimatedTable';
import { CELL_ANIMATE_ACTIONS_SMALL } from '~staking/systems/Core/components/AnimatedTable/styles';
import { ListPagination } from '~staking/systems/Core/components/ListPagination/ListPagination';
import { DelegatedPositionsConnect } from '../../components/DelegatedPositions/DelegatedPositionsConnect';
import { TransactionHistoryEmpty } from '../../components/TransactionHistoryEmpty/TransactionHistoryEmpty';
import {
  type StatusFilter,
  TransactionHistoryFilters,
  type TypeFilter,
} from '../../components/TransactionHistoryFilters/TransactionHistoryFilters';
import {
  TransactionHistoryItem,
  transactionHistoryItemClassNames,
} from '../../components/TransactionHistoryItem/TransactionHistoryItem';
import { eventStatus } from '../../components/TransactionHistoryItem/constants';
import { useAllStakingEvents } from '../../hooks/useStakingEvents/useStakingEvents';
import { stakingTxDialogEvents } from '../../store/stakingTxDialogStore';
import { stakingTxDialogStore } from '../../store/stakingTxDialogStore';
import type { StakingEventType } from '../../types/l1/events';

const PENDING_TRANSACTIONS_CELLS: Cell[] = [
  {
    id: 'date',
    title: 'staking.table.date',
    className: transactionHistoryItemClassNames.dateCol,
  },
  {
    id: 'type',
    title: 'staking.table.type',
    className: transactionHistoryItemClassNames.typeCol,
  },
  {
    id: 'amount',
    title: 'staking.table.amount',
    className: transactionHistoryItemClassNames.amountCol,
  },
  {
    id: 'eta',
    title: 'staking.table.status',
    className: transactionHistoryItemClassNames.etaCol,
  },
  {
    id: 'actions',
    title: '',
    className: transactionHistoryItemClassNames.actionsCol,
    animate: CELL_ANIMATE_ACTIONS_SMALL,
  },
];

export const DELEGATED_POSITIONS_CELLS_OBJ = PENDING_TRANSACTIONS_CELLS.reduce<
  Record<string, string | undefined>
>((acc, cell) => {
  acc[cell.id] = cell.className;
  return acc;
}, {});

const animations: Variants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

// The API cannot filter, so the tab reads the whole history once (shared with
// the board) and filters and pages it here.
export const TransactionHistory = () => {
  const { t } = useTranslation();
  const { address, isConnected } = useAccount();
  const { setOpen } = useModal();
  const {
    data: events,
    isPending,
    isFetching,
    refetch,
  } = useAllStakingEvents(address);
  const cells = useMemo(
    () =>
      PENDING_TRANSACTIONS_CELLS.map((cell) => ({
        ...cell,
        title: cell.title ? t(cell.title) : '',
      })),
    [t],
  );

  const [status, setStatus] = useState<StatusFilter>('all');
  const [type, setType] = useState<TypeFilter>('all');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { counts, types, filtered } = useMemo(() => {
    const all = events ?? [];
    const ofType =
      type === 'all' ? all : all.filter((event) => event.type === type);
    const counts: Record<StatusFilter, number> = {
      all: ofType.length,
      action: 0,
      progress: 0,
      completed: 0,
      failed: 0,
    };
    for (const event of ofType) counts[eventStatus(event)]++;
    return {
      counts,
      types: Array.from(new Set(all.map((event) => event.type))),
      filtered:
        status === 'all'
          ? ofType
          : ofType.filter((event) => eventStatus(event) === status),
    };
  }, [events, status, type]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const page = Math.min(currentPage, pageCount);
  const rows = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleStatusChange = (next: StatusFilter) => {
    setStatus(next);
    setCurrentPage(1);
  };
  const handleTypeChange = (next: TypeFilter) => {
    setType(next);
    setCurrentPage(1);
  };
  const clearFilters = () => {
    handleStatusChange('all');
    setType('all');
  };
  const handleStartStaking = () => {
    stakingTxDialogStore.send(stakingTxDialogEvents.open('TxStakeNew'));
  };
  const handleConnect = () => {
    setOpen(true);
  };
  const handlePerPageChange = (perPage: number) => {
    setItemsPerPage(perPage);
    setCurrentPage(1);
  };

  const hasTransactions = (events ?? []).length > 0;
  const shouldShowList = isConnected && (hasTransactions || isPending);
  const shouldShowEmpty = isConnected && !isPending && !hasTransactions;

  return (
    <VStack gap="0">
      {isConnected ? (
        <motion.div
          key="list"
          variants={animations}
          initial="closed"
          animate="open"
          exit="closed"
          className="flex flex-col"
        >
          {shouldShowList && (
            <>
              <TransactionHistoryFilters
                status={status}
                type={type}
                counts={counts}
                types={types as StakingEventType[]}
                isRefreshing={isFetching}
                onStatusChange={handleStatusChange}
                onTypeChange={handleTypeChange}
                onRefresh={() => refetch()}
              />
              <AnimatedTable headerCells={cells}>
                {isPending &&
                  Array(itemsPerPage)
                    .fill(0)
                    .map((_, index) => (
                      <TransactionHistoryItem
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        event={{} as any}
                        isLoading
                        hideSeparator={index === itemsPerPage - 1}
                      />
                    ))}
                {!isPending &&
                  rows.map((transaction, idx) => (
                    <TransactionHistoryItem
                      key={transaction.id}
                      event={transaction}
                      hideSeparator={idx === rows.length - 1}
                    />
                  ))}
              </AnimatedTable>
              {!isPending && rows.length === 0 && (
                <div className="fuel-appear flex flex-col items-start gap-4 border-t border-[var(--fuel-border)] py-8 tablet:flex-row tablet:items-center tablet:justify-between">
                  <p className="m-0 text-[16px] leading-[20px] tracking-[-0.32px] text-[var(--fuel-element-low-em)]">
                    {t('staking.history.no_match')}
                  </p>
                  <Button
                    size="2"
                    variant="ghost"
                    color="gray"
                    onClick={clearFilters}
                  >
                    {t('staking.history.clear')}
                  </Button>
                </div>
              )}
              <ListPagination
                currentPage={page}
                onNextPage={
                  page < pageCount ? () => setCurrentPage(page + 1) : undefined
                }
                onPrevPage={
                  page > 1 ? () => setCurrentPage(page - 1) : undefined
                }
                perPage={itemsPerPage}
                onPerPageChange={handlePerPageChange}
              />
            </>
          )}
          {shouldShowEmpty && (
            <TransactionHistoryEmpty onStartStaking={handleStartStaking} />
          )}
        </motion.div>
      ) : (
        <DelegatedPositionsConnect onConnect={handleConnect} />
      )}
    </VStack>
  );
};
