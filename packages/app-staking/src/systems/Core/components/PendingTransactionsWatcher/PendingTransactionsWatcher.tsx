import { useAccount } from 'wagmi';
import { useSequencerOperationCompletion } from '~staking/systems/Staking/hooks/useSequencerOperationCompletion';
import {
  type PendingTransactionL1,
  usePendingTransactions,
} from '../../hooks/usePendingTransactions';
import { TransactionReceiptWatcher } from './TransactionReceiptWatcher/TransactionReceiptWatcher';

export function PendingTransactionsWatcher() {
  const { isConnected } = useAccount();
  const { data = [] } = usePendingTransactions();

  useSequencerOperationCompletion();

  if (!isConnected) return null;

  return (
    <div className="hidden">
      {data.map((transaction) => {
        return (
          <TransactionReceiptWatcher
            key={transaction.hash}
            // Sequencer operations have always reached this watcher too; the
            // cast keeps that behavior and only settles the type.
            transaction={transaction as PendingTransactionL1}
          />
        );
      })}
    </div>
  );
}
