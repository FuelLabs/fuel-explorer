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

  // Get ALL incomplete sequencer operations, not just the first one
  const incompleteSequencerOps = useMemo(() => {
    return (pendingTransactions?.filter(
      (tx) => isPendingSequencerOperation(tx) && !tx.completed,
    ) ?? []) as PendingSequencerOperation[];
  }, [pendingTransactions]);

  // Track fallback startedAt times for each operation by sequencerHash
  const fallbackStartedAtMapRef = useRef<Map<string, number>>(new Map());

  // Clean up old entries when operations are removed
  useEffect(() => {
    const currentHashes = new Set(
      incompleteSequencerOps.map((op) => op.sequencerHash),
    );
    const mapRef = fallbackStartedAtMapRef.current;

    // Remove entries for operations that are no longer tracked
    for (const hash of mapRef.keys()) {
      if (!currentHashes.has(hash)) {
        mapRef.delete(hash);
      }
    }
  }, [incompleteSequencerOps]);

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

  // Set up timeouts for each incomplete operation
  useEffect(() => {
    if (incompleteSequencerOps.length === 0) return;

    const timeoutIds: ReturnType<typeof setTimeout>[] = [];

    for (const op of incompleteSequencerOps) {
      // Get or create startedAt time for this operation
      let startedAt = op.startedAt;
      if (!startedAt) {
        const existingFallback = fallbackStartedAtMapRef.current.get(
          op.sequencerHash,
        );
        if (existingFallback) {
          startedAt = existingFallback;
        } else {
          startedAt = Date.now();
          fallbackStartedAtMapRef.current.set(op.sequencerHash, startedAt);
        }
      }

      const elapsed = Date.now() - startedAt;
      const remaining = MAX_COMPLETION_DELAY_MS - elapsed;

      if (remaining <= 0) {
        // Already expired, mark as completed immediately
        markCompleted(op.sequencerHash);
      } else {
        // Set up timeout for this operation
        const timeoutId = setTimeout(() => {
          markCompleted(op.sequencerHash);
        }, remaining);
        timeoutIds.push(timeoutId);
      }
    }

    return () => {
      for (const timeoutId of timeoutIds) {
        clearTimeout(timeoutId);
      }
    };
  }, [incompleteSequencerOps, markCompleted]);
};
