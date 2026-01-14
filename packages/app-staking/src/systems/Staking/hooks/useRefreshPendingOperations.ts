import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useAccount } from 'wagmi';
import {
  isPendingSequencerOperation,
  usePendingTransactions,
} from '~staking/systems/Core/hooks/usePendingTransactions';
import { cosmosApi } from '~staking/systems/Core/utils/api';
import { QUERY_KEYS } from '~staking/systems/Core/utils/query';

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
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Collect all pending sequencer operation hashes
  const pendingHashes =
    pendingTransactions
      ?.filter((tx) => isPendingSequencerOperation(tx) && !tx.completed)
      .map((tx) => tx.sequencerHash) ?? [];

  const refreshPendingOperations = useCallback(async () => {
    if (!account?.address || !pendingTransactions || pendingHashes.length === 0)
      return;

    setIsRefreshing(true);

    try {
      // Check status of all pending operations in parallel
      const statusResults = await Promise.all(
        pendingHashes.map(async (hash) => {
          try {
            const response = await cosmosApi.get<{ tx_response?: unknown }>(
              `/cosmos/tx/v1beta1/txs/${hash}`,
            );
            // cosmosApi.get returns parsed JSON data, not HTTP response
            // If tx_response exists, the transaction is on chain
            return { hash, isCompleted: !!response?.tx_response };
          } catch {
            return { hash, isCompleted: false };
          }
        }),
      );

      // Build a map of completed hashes
      const completedHashes = new Set(
        statusResults.filter((r) => r.isCompleted).map((r) => r.hash),
      );

      if (completedHashes.size > 0) {
        const queryKey = QUERY_KEYS.pendingTransactions(account.address);

        // Update all completed operations in the cache
        queryClient.setQueryData(queryKey, (data: any[] = []) => {
          return data.map((tx) => {
            if (!isPendingSequencerOperation(tx) || tx.completed) {
              return tx;
            }

            return completedHashes.has(tx.sequencerHash)
              ? { ...tx, completed: true }
              : tx;
          });
        });

        // Force subscribers to re-render by invalidating the query
        queryClient.invalidateQueries({ queryKey });
      }
    } finally {
      setIsRefreshing(false);
    }
  }, [account?.address, queryClient, pendingTransactions, pendingHashes]);

  return {
    refreshPendingOperations,
    isRefreshing,
    pendingOperationCount: pendingHashes.length,
  };
};
