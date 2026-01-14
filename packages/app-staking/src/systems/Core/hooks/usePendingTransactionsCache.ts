import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { Address } from 'viem';
import { useAccount } from 'wagmi';
import { QUERY_KEYS } from '../utils/query';
import type {
  PendingTransaction,
  PendingTransactionTypeL1,
} from './usePendingTransactions';

export const usePendingTransactionsCache = () => {
  const queryClient = useQueryClient();
  const account = useAccount();

  const getPendingTransaction = useCallback(
    (token: Address, type: PendingTransactionTypeL1) => {
      const data = queryClient.getQueryData<PendingTransaction[]>(
        QUERY_KEYS.pendingTransactions(account?.address),
      );
      const tx = data?.find((tx) => tx.token === token && tx.type === type);

      return tx;
    },
    [queryClient, account?.address],
  );

  const addPendingTransaction = useCallback(
    (transaction: Omit<PendingTransaction, 'displayed'>) => {
      queryClient.setQueryData<PendingTransaction[]>(
        QUERY_KEYS.pendingTransactions(account?.address),
        (data = []) => {
          return [
            ...data,
            { ...transaction, displayed: false } as PendingTransaction,
          ];
        },
      );
    },
    [queryClient, account?.address],
  );

  const removePendingTransaction = useCallback(
    (hash: string) => {
      queryClient.setQueryData<Array<PendingTransaction>>(
        QUERY_KEYS.pendingTransactions(account?.address),
        (data = []) => {
          return data.filter(
            (tx) => tx.hash !== hash && tx.sequencerHash !== hash,
          );
        },
      );
    },
    [queryClient, account?.address],
  );

  const updatePendingTransactionDisplayed = useCallback(
    (hash: string, displayed: boolean) => {
      queryClient.setQueryData<PendingTransaction[]>(
        QUERY_KEYS.pendingTransactions(account?.address),
        (data = []) => {
          return data.map((tx) =>
            tx.hash === hash ? { ...tx, displayed } : tx,
          );
        },
      );
    },
    [queryClient, account?.address],
  );

  const markPendingTransactionAsCompleted = useCallback(
    (hash: string) => {
      const queryKey = QUERY_KEYS.pendingTransactions(account?.address);

      queryClient.setQueryData<PendingTransaction[]>(queryKey, (data = []) => {
        return data.map((tx) =>
          tx.hash === hash || tx.sequencerHash === hash
            ? { ...tx, completed: true }
            : tx,
        );
      });

      // Force subscribers to re-render by invalidating the query
      queryClient.invalidateQueries({ queryKey });
    },
    [queryClient, account?.address],
  );

  return {
    getPendingTransaction,
    addPendingTransaction,
    removePendingTransaction,
    updatePendingTransactionDisplayed,
    markPendingTransactionAsCompleted,
  };
};
