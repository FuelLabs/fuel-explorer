import { useToast } from '@fuels/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { invalidateQueries } from '~staking/systems/Core/utils/invalidateQueries';
import { useWaitForEthBlockSync } from '~staking/systems/Staking/services/useWaitForEthBlockSync';
import { usePendingTransactionsCache } from '../../../hooks/usePendingTransactionsCache';
import { ViewInExplorer } from '../../ViewInExplorer/ViewInExplorer';
import {
  cosmosInvalidations,
  transactionTypeInvalidations,
  transactionTypeLabel,
  transactionsToRemoveImmediately,
} from './constants';
import type { TransactionReceiptWatcherProps } from './types';

export function TransactionReceiptWatcher({
  transaction,
}: TransactionReceiptWatcherProps) {
  const isSequencerHash =
    transaction?.hash && !transaction.hash?.startsWith('0x');
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { address } = useAccount();

  // Track if we've already processed this transaction to prevent double toasts
  const hasProcessedRef = useRef(false);
  const hasShownErrorToastRef = useRef(false);

  const {
    removePendingTransaction,
    updatePendingTransactionDisplayed,
    markPendingTransactionAsCompleted,
  } = usePendingTransactionsCache();

  const { isSuccess: isConfirmed, isError } = useWaitForTransactionReceipt({
    hash: transaction.hash,
    query: {
      enabled: !isSequencerHash && !!transaction.hash,
    },
  });

  const waitForBlock = !!cosmosInvalidations?.[transaction.type];

  const { targetReached } = useWaitForEthBlockSync(
    waitForBlock && isConfirmed && !isSequencerHash && !isSequencerHash
      ? transaction.hash
      : undefined,
  );

  const isCompleted =
    isConfirmed && (!waitForBlock || (targetReached && waitForBlock));

  useEffect(() => {
    // Skip if we've already processed this confirmation
    if (hasProcessedRef.current) {
      return;
    }

    if (isConfirmed) {
      // Mark as processed immediately to prevent double processing
      hasProcessedRef.current = true;

      const queries = transactionTypeInvalidations?.[transaction.type];
      const SequencerInvalidations = cosmosInvalidations[transaction.type]?.({
        address,
      });
      if (SequencerInvalidations)
        invalidateQueries(queryClient, SequencerInvalidations);
      if (queries) invalidateQueries(queryClient, queries);

      // Mark transaction as completed when confirmed on L1
      // This unblocks UI actions immediately after L1 confirmation
      markPendingTransactionAsCompleted(transaction?.hash);

      if (isCompleted) {
        // Remove transaction from pending list only after full completion
        // (including block sync for cosmos invalidations)
        if (transactionsToRemoveImmediately[transaction.type])
          removePendingTransaction(transaction.hash);
      }
      if (!transaction.displayed) {
        updatePendingTransactionDisplayed(
          transaction.hash,
          true,
          transaction.layer || 'l1',
        );
        toast({
          title: `${transactionTypeLabel[transaction.type]} has been confirmed`,
          description: `${transaction.formatted} ${transaction.symbol}`,
          variant: 'success',
        });
      }
    }
  }, [
    isCompleted,
    address,
    transaction,
    isConfirmed,
    toast,
    updatePendingTransactionDisplayed,
    queryClient,
    removePendingTransaction,
    transaction?.hash,
    markPendingTransactionAsCompleted,
  ]);

  useEffect(() => {
    // Skip if we've already shown the error toast
    if (hasShownErrorToastRef.current) return;

    if (isError && !transaction?.displayed) {
      hasShownErrorToastRef.current = true;

      updatePendingTransactionDisplayed(
        transaction.hash,
        true,
        transaction.layer || 'l1',
      );
      toast({
        title: `${transactionTypeLabel[transaction.type]} has failed`,
        description: `${transaction.formatted} ${transaction.symbol}`,
        action: <ViewInExplorer hash={transaction.hash} />,
        variant: 'error',
      });
    }
  }, [isError, toast, transaction, updatePendingTransactionDisplayed]);

  return null;
}
