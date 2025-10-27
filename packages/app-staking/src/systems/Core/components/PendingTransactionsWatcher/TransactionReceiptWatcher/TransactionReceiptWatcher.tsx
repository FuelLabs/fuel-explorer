import { useToast } from '@fuels/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
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
    if (isConfirmed) {
      const queries = transactionTypeInvalidations?.[transaction.type];
      const SequencerInvalidations = cosmosInvalidations[transaction.type]?.({
        address,
      });
      if (SequencerInvalidations)
        invalidateQueries(queryClient, SequencerInvalidations);
      if (queries) invalidateQueries(queryClient, queries);
      if (isCompleted) {
        markPendingTransactionAsCompleted(transaction?.hash);
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
          // Just notify but don't remove failed pending transactions

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
    if (isError && !transaction?.displayed) {
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
