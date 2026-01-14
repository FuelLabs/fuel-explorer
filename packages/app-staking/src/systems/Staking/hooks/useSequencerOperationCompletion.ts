import { useToast } from '@fuels/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAccount } from 'wagmi';
import {
  type PendingSequencerOperation,
  isPendingSequencerOperation,
  usePendingTransactions,
} from '~staking/systems/Core/hooks/usePendingTransactions';
import { QUERY_KEYS } from '~staking/systems/Core/utils/query';
import { useSequencerOperationStatus } from './useSequencerOperationStatus';

export const useSequencerOperationCompletion = () => {
  const queryClient = useQueryClient();
  const account = useAccount();
  const { toast } = useToast();
  const { data: pendingTransactions } = usePendingTransactions();

  const incompleteSequencerOp = useMemo(() => {
    return pendingTransactions?.find(
      (tx) => isPendingSequencerOperation(tx) && !tx.completed,
    ) as PendingSequencerOperation | undefined;
  }, [pendingTransactions]);

  const fallbackStartedAtRef = useRef<number | null>(null);

  const startedAt = useMemo(() => {
    if (incompleteSequencerOp?.startedAt) {
      return incompleteSequencerOp.startedAt;
    }
    if (incompleteSequencerOp && !fallbackStartedAtRef.current) {
      fallbackStartedAtRef.current = Date.now();
    }
    if (!incompleteSequencerOp) {
      fallbackStartedAtRef.current = null;
    }
    return fallbackStartedAtRef.current ?? Date.now();
  }, [incompleteSequencerOp]);

  const { data: operationStatus, hasExceededTimeout } =
    useSequencerOperationStatus(
      incompleteSequencerOp?.sequencerHash,
      startedAt,
    );

  const markCompleted = useCallback(
    (sequencerHash: string) => {
      if (!account?.address) return;
      const queryKey = QUERY_KEYS.pendingTransactions(account.address);
      queryClient.setQueryData(queryKey, (data: any[] = []) =>
        data.map((tx) =>
          tx.sequencerHash === sequencerHash ? { ...tx, completed: true } : tx,
        ),
      );
      queryClient.invalidateQueries({ queryKey });
    },
    [account?.address, queryClient],
  );

  useEffect(() => {
    if (!incompleteSequencerOp) return;

    const shouldComplete = operationStatus?.isCompleted || hasExceededTimeout;
    if (!shouldComplete) return;

    markCompleted(incompleteSequencerOp.sequencerHash);

    if (hasExceededTimeout) {
      toast({
        title: 'Operation status uncertain',
        description:
          'The sequencer operation is taking longer than expected. Actions have been unblocked.',
        variant: 'warning',
      });
    } else {
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
    markCompleted,
    toast,
  ]);

  useEffect(() => {
    if (!operationStatus?.isFailed || !incompleteSequencerOp) return;

    markCompleted(incompleteSequencerOp.sequencerHash);
    toast({
      title: 'Sequencer operation failed',
      description:
        'The operation failed. Your funds are safe. Please try again.',
      variant: 'error',
    });
  }, [operationStatus?.isFailed, incompleteSequencerOp, markCompleted, toast]);
};
