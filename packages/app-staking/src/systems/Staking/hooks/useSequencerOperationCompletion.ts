import { useToast } from '@fuels/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import {
  type PendingSequencerOperation,
  isPendingSequencerOperation,
  usePendingTransactions,
} from '~staking/systems/Core/hooks/usePendingTransactions';
import { QUERY_KEYS } from '~staking/systems/Core/utils/query';
import { useSequencerOperationStatus } from './useSequencerOperationStatus';

/**
 * Hook that monitors pending sequencer operations and automatically marks them
 * as completed when they're confirmed on the sequencer chain.
 *
 * Also handles timeout scenarios - if an operation takes too long (>10 min),
 * it will be marked as completed to unblock actions, with a warning toast.
 *
 * This ensures that blocking notices automatically disappear once the operation
 * has been finalized, improving user experience.
 *
 * Call this hook in a global context (e.g., in your app layout) so it runs
 * continuously and monitors all pending operations.
 */
export const useSequencerOperationCompletion = () => {
  const queryClient = useQueryClient();
  const account = useAccount();
  const { toast } = useToast();
  const { data: pendingTransactions } = usePendingTransactions();

  // Get the first incomplete sequencer operation
  const incompleteSequencerOp = pendingTransactions?.find(
    (tx) => isPendingSequencerOperation(tx) && !tx.completed,
  ) as PendingSequencerOperation | undefined;

  // Get the startedAt timestamp from the operation (use the stored value, fallback to just started)
  const startedAt = incompleteSequencerOp?.startedAt ?? Date.now();

  // Monitor the status of the pending operation
  const { data: operationStatus, hasExceededTimeout } =
    useSequencerOperationStatus(
      incompleteSequencerOp?.sequencerHash,
      startedAt,
    );

  // Update the pending transaction when operation completes
  useEffect(() => {
    if (!incompleteSequencerOp || !account?.address) {
      return;
    }

    const shouldComplete = operationStatus?.isCompleted || hasExceededTimeout;
    if (!shouldComplete) return;

    // Mark the operation as completed in the query cache
    queryClient.setQueryData(
      QUERY_KEYS.pendingTransactions(account.address),
      (data: any[] = []) => {
        return data.map((tx) =>
          tx.sequencerHash === incompleteSequencerOp.sequencerHash
            ? { ...tx, completed: true }
            : tx,
        );
      },
    );

    // Show appropriate toast
    if (hasExceededTimeout) {
      toast({
        title: 'Operation status uncertain',
        description:
          'The sequencer operation is taking longer than expected. Actions have been unblocked. Please check your transaction status manually.',
        variant: 'warning',
      });
    } else if (operationStatus?.isCompleted) {
      toast({
        title: 'Sequencer operation complete',
        description: 'Your operation has been processed successfully.',
        variant: 'success',
      });
    }
  }, [
    operationStatus?.isCompleted,
    hasExceededTimeout,
    incompleteSequencerOp,
    account?.address,
    queryClient,
    toast,
  ]);

  // Handle failed operations
  useEffect(() => {
    if (
      !operationStatus?.isFailed ||
      !incompleteSequencerOp ||
      !account?.address
    ) {
      return;
    }

    // Mark as completed to unblock actions
    queryClient.setQueryData(
      QUERY_KEYS.pendingTransactions(account.address),
      (data: any[] = []) => {
        return data.map((tx) =>
          tx.sequencerHash === incompleteSequencerOp.sequencerHash
            ? { ...tx, completed: true }
            : tx,
        );
      },
    );

    toast({
      title: 'Sequencer operation failed',
      description:
        'The operation failed on the sequencer. Your funds are safe. Please try again.',
      variant: 'error',
    });
  }, [
    operationStatus?.isFailed,
    incompleteSequencerOp,
    account?.address,
    queryClient,
    toast,
  ]);
};
