import { useAccount } from 'wagmi';
import { useSequencerOperationCompletion } from '~staking/systems/Staking/hooks/useSequencerOperationCompletion';
import { usePendingTransactions } from '../../hooks/usePendingTransactions';
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
            transaction={transaction}
          />
        );
      })}
    </div>
  );
}
