import { useToast } from '@fuels/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef } from 'react';
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
  const incompleteSequencerOp = useMemo(() => {
    return pendingTransactions?.find(
      (tx) => isPendingSequencerOperation(tx) && !tx.completed,
    ) as PendingSequencerOperation | undefined;
  }, [pendingTransactions]);

  // Track the startedAt timestamp - use a ref to persist across renders
  // This ensures we don't reset the timeout on every render
  const fallbackStartedAtRef = useRef<number | null>(null);

  const startedAt = useMemo(() => {
    // If the operation has a stored startedAt, use it
    if (incompleteSequencerOp?.startedAt) {
      return incompleteSequencerOp.startedAt;
    }
    // Otherwise, use a stable fallback that doesn't change on re-renders
    if (incompleteSequencerOp && !fallbackStartedAtRef.current) {
      fallbackStartedAtRef.current = Date.now();
    }
    // Reset the ref if there's no incomplete operation
    if (!incompleteSequencerOp) {
      fallbackStartedAtRef.current = null;
    }
    return fallbackStartedAtRef.current ?? Date.now();
  }, [incompleteSequencerOp]);

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

    const queryKey = QUERY_KEYS.pendingTransactions(account.address);

    // Mark the operation as completed in the query cache
    queryClient.setQueryData(queryKey, (data: any[] = []) => {
      return data.map((tx) =>
        tx.sequencerHash === incompleteSequencerOp.sequencerHash
          ? { ...tx, completed: true }
          : tx,
      );
    });

    // Force subscribers to re-render by invalidating the query
    queryClient.invalidateQueries({ queryKey });

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

    const queryKey = QUERY_KEYS.pendingTransactions(account.address);

    // Mark as completed to unblock actions
    queryClient.setQueryData(queryKey, (data: any[] = []) => {
      return data.map((tx) =>
        tx.sequencerHash === incompleteSequencerOp.sequencerHash
          ? { ...tx, completed: true }
          : tx,
      );
    });

    // Force subscribers to re-render by invalidating the query
    queryClient.invalidateQueries({ queryKey });

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
