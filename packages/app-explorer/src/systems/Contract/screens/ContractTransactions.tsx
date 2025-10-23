import { useSearchParams } from 'react-router-dom';
import { useContractTransactions } from '~/hooks/useApi';
import { TxListLoader } from '~/systems/Transactions/components/TxList/TxListLoader';
import { ContractTransactionsList } from '../components/ContractTransactionsList';

type ContractTransactionsProps = {
  id: string;
  cursor?: string | null | undefined;
  dir?: 'after' | 'before';
};

export function ContractTransactions({
  id,
  cursor,
  dir = 'after',
}: ContractTransactionsProps) {
  const [searchParams] = useSearchParams();
  const _cursor = searchParams.get('cursor') ?? cursor;
  const _dir = (searchParams.get('dir') ?? dir) as 'after' | 'before';
  const {
    data: txs,
    isLoading,
    isFetching,
    error,
  } = useContractTransactions(id, {
    cursor: _cursor || undefined,
    direction: _dir,
  });

  if (isLoading || isFetching) {
    return (
      <TxListLoader
        numberOfTxs={10}
        className="-mt-4 tablet:mt-0 laptop:mt-6"
      />
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Failed to load contract transactions</p>
      </div>
    );
  }

  return <ContractTransactionsList contractId={id} txs={txs} />;
}
