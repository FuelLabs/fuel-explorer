import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { L1_TO_SEQUENCER_TYPE_MAP } from '~staking/systems/Core/hooks/usePendingTransactions';
import { invalidateQueries } from '~staking/systems/Core/utils/invalidateQueries';
import { useWaitForEthBlockSync } from '~staking/systems/Staking/services/useWaitForEthBlockSync';
import { usePendingTransactionsCache } from '../../../hooks/usePendingTransactionsCache';
import {
  cosmosInvalidations,
  transactionTypeInvalidations,
  transactionsToRemoveImmediately,
} from './constants';
import type { TransactionReceiptWatcherProps } from './types';

export function TransactionReceiptWatcher({
  transaction,
}: TransactionReceiptWatcherProps) {
  const isSequencerHash =
    transaction?.hash && !transaction.hash?.startsWith('0x');
  const queryClient = useQueryClient();
  const { address } = useAccount();

  const hasProcessedRef = useRef(false);
  const hasShownErrorToastRef = useRef(false);

  const {
    removePendingTransaction,
    updatePendingTransactionDisplayed,
    markPendingTransactionAsCompleted,
    convertL1ToSequencerOperation,
  } = usePendingTransactionsCache();

  const { isSuccess: isConfirmed, isError } = useWaitForTransactionReceipt({
    hash: transaction.hash,
    query: {
      enabled: !isSequencerHash && !!transaction.hash,
    },
  });

  const waitForBlock = !!cosmosInvalidations?.[transaction.type];

  const { targetReached } = useWaitForEthBlockSync(
    waitForBlock && isConfirmed && !isSequencerHash
      ? transaction.hash
      : undefined,
  );

  const isCompleted =
    isConfirmed && (!waitForBlock || (targetReached && waitForBlock));

  useEffect(() => {
    if (hasProcessedRef.current) {
      return;
    }

    if (isConfirmed) {
      hasProcessedRef.current = true;

      const queries = transactionTypeInvalidations?.[transaction.type];
      const SequencerInvalidations = cosmosInvalidations[transaction.type]?.({
        address,
      });
      if (SequencerInvalidations)
        invalidateQueries(queryClient, SequencerInvalidations);
      if (queries) invalidateQueries(queryClient, queries);

      // Check if this transaction type requires sequencer tracking
      const sequencerType = L1_TO_SEQUENCER_TYPE_MAP[transaction.type];
      const requiresSequencerTracking = !!sequencerType;

      if (requiresSequencerTracking) {
        // Convert to sequencer operation for long-term tracking
        // useSequencerOperationCompletion will handle the completion tracking
        convertL1ToSequencerOperation(transaction.hash, transaction.hash);
      } else {
        // For operations that don't need sequencer tracking, mark as completed immediately
        markPendingTransactionAsCompleted(transaction?.hash);
      }

      if (isCompleted) {
        if (transactionsToRemoveImmediately[transaction.type])
          removePendingTransaction(transaction.hash);
      }
      if (!transaction.displayed) {
        updatePendingTransactionDisplayed(transaction.hash, true);
      }
    }
  }, [
    isCompleted,
    address,
    transaction,
    isConfirmed,
    updatePendingTransactionDisplayed,
    queryClient,
    removePendingTransaction,
    transaction?.hash,
    markPendingTransactionAsCompleted,
    convertL1ToSequencerOperation,
  ]);

  useEffect(() => {
    if (hasShownErrorToastRef.current) return;

    if (isError && !transaction?.displayed) {
      hasShownErrorToastRef.current = true;

      updatePendingTransactionDisplayed(transaction.hash, true);
    }
  }, [isError, transaction, updatePendingTransactionDisplayed]);

  return null;
}
