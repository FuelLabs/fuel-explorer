import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { Address } from 'viem';
import { useAccount } from 'wagmi';
import { QUERY_KEYS } from '../utils/query';
import {
  L1_TO_SEQUENCER_TYPE_MAP,
  type PendingSequencerOperation,
  type PendingTransaction,
  type PendingTransactionL1,
  type PendingTransactionTypeL1,
  isPendingTransactionL1,
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

      queryClient.invalidateQueries({ queryKey });
    },
    [queryClient, account?.address],
  );

  /**
   * Converts an L1 pending transaction to a sequencer operation.
   * This is called when an L1 transaction is confirmed, to track the full
   * sequencer operation which takes 20-30 minutes to complete.
   *
   * @param l1Hash - The hash of the confirmed L1 transaction
   * @param sequencerHash - The sequencer transaction hash to track
   */
  const convertL1ToSequencerOperation = useCallback(
    (l1Hash: string, sequencerHash: string) => {
      const queryKey = QUERY_KEYS.pendingTransactions(account?.address);

      queryClient.setQueryData<PendingTransaction[]>(queryKey, (data = []) => {
        // Find the L1 transaction
        const l1Tx = data.find(
          (tx) => tx.hash === l1Hash && isPendingTransactionL1(tx),
        ) as PendingTransactionL1 | undefined;

        if (!l1Tx) return data;

        // Get the corresponding sequencer operation type
        const sequencerType = L1_TO_SEQUENCER_TYPE_MAP[l1Tx.type];
        if (!sequencerType) {
          // No sequencer tracking needed for this type
          return data;
        }

        // Create the sequencer operation
        const sequencerOp: PendingSequencerOperation = {
          type: sequencerType,
          layer: 'sequencer',
          hash: l1Tx.hash,
          sequencerHash,
          token: l1Tx.token,
          symbol: l1Tx.symbol,
          formatted: l1Tx.formatted,
          validator: l1Tx.validator,
          amount: l1Tx.amount,
          decimals: l1Tx.decimals,
          displayed: true, // Already displayed from L1 confirmation
          completed: false,
          startedAt: Date.now(),
        };

        // Remove the L1 transaction and add the sequencer operation
        return [...data.filter((tx) => tx.hash !== l1Hash), sequencerOp];
      });

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
    convertL1ToSequencerOperation,
  };
};
