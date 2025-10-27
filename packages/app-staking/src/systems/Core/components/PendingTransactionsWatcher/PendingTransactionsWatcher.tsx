import { useAccount } from 'wagmi';
import { usePendingTransactions } from '../../hooks/usePendingTransactions';
import { TransactionReceiptWatcher } from './TransactionReceiptWatcher/TransactionReceiptWatcher';

export function PendingTransactionsWatcher() {
  const { isConnected } = useAccount();
  const { data = [] } = usePendingTransactions();

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
