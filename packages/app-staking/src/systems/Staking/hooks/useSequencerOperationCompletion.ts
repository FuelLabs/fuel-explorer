import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAccount } from 'wagmi';
import {
  type PendingSequencerOperation,
  isPendingSequencerOperation,
  usePendingTransactions,
} from '~staking/systems/Core/hooks/usePendingTransactions';
import { QUERY_KEYS } from '~staking/systems/Core/utils/query';

// Maximum wait before unblocking (sequencer operations typically take 20-30 minutes)
const MAX_COMPLETION_DELAY_MS = 35 * 60 * 1000;

export const useSequencerOperationCompletion = () => {
  const queryClient = useQueryClient();
  const account = useAccount();
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

  const markCompleted = useCallback(
    (sequencerHash: string) => {
      if (!account?.address) return;
      // Address normalization is handled by QUERY_KEYS.pendingTransactions
      const queryKey = QUERY_KEYS.pendingTransactions(account.address);
      queryClient.setQueryData(queryKey, (data: any[] = []) => {
        const updated = data.map((tx) =>
          tx.sequencerHash === sequencerHash ? { ...tx, completed: true } : tx,
        );
        // Remove completed transactions to keep cache clean
        return updated.filter((tx) => !tx.completed);
      });
      queryClient.invalidateQueries({ queryKey });
    },
    [account?.address, queryClient],
  );

  useEffect(() => {
    if (!incompleteSequencerOp) return;

    const elapsed = Date.now() - startedAt;
    const remaining = MAX_COMPLETION_DELAY_MS - elapsed;

    if (remaining <= 0) {
      markCompleted(incompleteSequencerOp.sequencerHash);
      return;
    }

    const timeoutId = setTimeout(() => {
      markCompleted(incompleteSequencerOp.sequencerHash);
    }, remaining);

    return () => clearTimeout(timeoutId);
  }, [incompleteSequencerOp, startedAt, markCompleted]);
};
