import { IconButton, VStack } from '@fuels/ui';
import { IconRefresh } from '@tabler/icons-react';
import { useModal } from 'connectkit';
import { type Variants, motion } from 'framer-motion';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  AnimatedTable,
  type Cell,
} from '~staking/systems/Core/components/AnimatedTable/AnimatedTable';
import { CELL_ANIMATE_ACTIONS_SMALL } from '~staking/systems/Core/components/AnimatedTable/styles';
// import { useTempStakingTransactions } from '../../hooks/useTempStakingTransactions';
import { ListPagination } from '~staking/systems/Core/components/ListPagination/ListPagination';
import { DelegatedPositionsConnect } from '../../components/DelegatedPositions/DelegatedPositionsConnect';
import { TransactionHistoryEmpty } from '../../components/TransactionHistoryEmpty/TransactionHistoryEmpty';
import {
  TransactionHistoryItem,
  transactionHistoryItemClassNames,
} from '../../components/TransactionHistoryItem/TransactionHistoryItem';
import type { UseStakingEventsPagination } from '../../hooks/useStakingEvents/types';
import { useStakingEvents } from '../../hooks/useStakingEvents/useStakingEvents';
import { stakingTxDialogEvents } from '../../store/stakingTxDialogStore';
import { stakingTxDialogStore } from '../../store/stakingTxDialogStore';

const PENDING_TRANSACTIONS_CELLS: Cell[] = [
  {
    id: 'date',
    title: 'Date',
    className: transactionHistoryItemClassNames.dateCol,
  },
  {
    id: 'type',
    title: 'Type',
    className: transactionHistoryItemClassNames.typeCol,
  },
  {
    id: 'amount',
    title: 'Amount',
    className: transactionHistoryItemClassNames.amountCol,
  },
  {
    id: 'eta',
    title: 'Status',
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

export const TransactionHistory = () => {
  const { address, isConnected } = useAccount();
  const { setOpen } = useModal();

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<UseStakingEventsPagination>({
    cursor: undefined,
    direction: undefined,
    itemsPerPage: itemsPerPage,
  });
  const {
    data,
    isPlaceholderData,
    isFetching,
    isLoading: isLoadingQuery,
    isPending,
    refetch,
  } = useStakingEvents({
    address,
    pagination,
  });

  const handleRefresh = () => {
    refetch();
  };

  const handleStartStaking = () => {
    stakingTxDialogStore.send(stakingTxDialogEvents.open('TxStakeNew'));
  };
  const handleConnect = () => {
    setOpen(true);
  };
  const fetchPreviousPage = () => {
    if (currentPage === 1) return;
    if (currentPage === 2) {
      setPagination({
        cursor: undefined,
        direction: 'prev',
        itemsPerPage: itemsPerPage,
      });
      setCurrentPage(1);

      return;
    }

    setPagination({
      cursor: data?.pageInfo.startCursor,
      direction: 'prev',
      itemsPerPage: itemsPerPage,
    });
    setCurrentPage(currentPage - 1);
  };

  const fetchNextPage = () => {
    setPagination({
      cursor: data?.pageInfo.endCursor,
      direction: 'next',
      itemsPerPage: itemsPerPage,
    });
    setCurrentPage(currentPage + 1);
  };

  const handlePerPageChange = (perPage: number) => {
    setItemsPerPage(perPage);
    setPagination({
      cursor: undefined,
      direction: undefined,
      itemsPerPage: perPage,
    });
    setCurrentPage(1);
  };

  const hasTransactions = (data?.nodes || []).length > 0;
  const isLoading = isPending || isLoadingQuery || isFetching;
  const shouldShowList = isConnected && (hasTransactions || isLoading);
  const shouldShowEmpty = isConnected && !shouldShowList && !hasTransactions;
  const shouldShowListContent = shouldShowList && hasTransactions && !isLoading;
  const shouldShowListLoading = shouldShowList && isLoading;

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
              <div className="flex relative">
                <IconButton
                  aria-label="Refresh list"
                  variant="ghost"
                  color="gray"
                  size="1"
                  icon={IconRefresh}
                  isLoading={isLoading}
                  onClick={handleRefresh}
                  className="absolute right-0 top-2"
                />
              </div>
              <AnimatedTable headerCells={PENDING_TRANSACTIONS_CELLS}>
                {shouldShowListLoading &&
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
                {shouldShowListContent &&
                  data?.nodes.map((transaction, idx) => {
                    return (
                      <TransactionHistoryItem
                        key={transaction.id}
                        event={transaction}
                        hideSeparator={idx === data.nodes.length - 1}
                      />
                    );
                  })}
              </AnimatedTable>
              <ListPagination
                currentPage={currentPage}
                isLoadingPrevPage={
                  isFetching && pagination.direction === 'prev'
                }
                isLoadingNextPage={
                  isFetching && pagination.direction === 'next'
                }
                onNextPage={
                  isPlaceholderData ||
                  !data?.pageInfo.hasPreviousPage ||
                  isFetching
                    ? undefined
                    : fetchNextPage
                }
                onPrevPage={
                  isPlaceholderData || !data?.pageInfo.hasNextPage || isFetching
                    ? undefined
                    : fetchPreviousPage
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
