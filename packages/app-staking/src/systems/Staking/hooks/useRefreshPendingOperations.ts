import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';
import {
  isPendingSequencerOperation,
  usePendingTransactions,
} from '~staking/systems/Core/hooks/usePendingTransactions';
import { QUERY_KEYS } from '~staking/systems/Core/utils/query';
import { useSequencerOperationStatus } from './useSequencerOperationStatus';

/**
 * Hook that provides a manual way to check and update the status of pending sequencer operations.
 *
 * This is useful to add a "Refresh" button in the UI so users can manually check if their
 * operations have completed on the sequencer.
 *
 * @example
 * const { refreshPendingOperations, isRefreshing } = useRefreshPendingOperations();
 *
 * <Button onClick={refreshPendingOperations} disabled={isRefreshing}>
 *   {isRefreshing ? 'Checking...' : 'Refresh Status'}
 * </Button>
 */
export const useRefreshPendingOperations = () => {
  const queryClient = useQueryClient();
  const account = useAccount();
  const { data: pendingTransactions } = usePendingTransactions();

  // Collect all pending sequencer operation hashes
  const pendingHashes =
    pendingTransactions
      ?.filter((tx) => isPendingSequencerOperation(tx) && !tx.completed)
      .map((tx) => tx.sequencerHash) ?? [];

  // Check status of all pending operations
  const statusChecks = pendingHashes.map((hash) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSequencerOperationStatus(hash),
  );

  const isRefreshing = statusChecks.some((check) => check.isLoading);

  const refreshPendingOperations = useCallback(async () => {
    if (!account?.address || !pendingTransactions) return;

    // Update all completed operations in the cache
    queryClient.setQueryData(
      QUERY_KEYS.pendingTransactions(account.address),
      (data: any[] = []) => {
        return data.map((tx) => {
          if (!isPendingSequencerOperation(tx) || tx.completed) {
            return tx;
          }

          // Check if this operation's status query has completed
          const statusQuery = statusChecks.find(
            (check) => check.data?.isCompleted,
          );

          return statusQuery?.data?.isCompleted
            ? { ...tx, completed: true }
            : tx;
        });
      },
    );

    // Refetch all pending operation statuses
    statusChecks.forEach((check) => {
      if (check.refetch) {
        // @ts-ignore
        check.refetch();
      }
    });
  }, [account?.address, queryClient, pendingTransactions, statusChecks]);

  return {
    refreshPendingOperations,
    isRefreshing,
    pendingOperationCount: pendingHashes.length,
  };
};
