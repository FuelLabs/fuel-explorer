import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useContractTransactions } from '~/hooks/useApi';
import { PageState } from '~/systems/Core/components/PageState/PageState';
import { TxDim } from '~/systems/Transaction/component/TxNotice/TxNotice';
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
  const { t } = useTranslation();
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

  if (isLoading) {
    return (
      <TxListLoader
        numberOfTxs={10}
        className="-mt-4 tablet:mt-0 laptop:mt-6"
      />
    );
  }

  if (error) {
    return <PageState tone="error" title={t('contract.error_transactions')} />;
  }

  return (
    <TxDim busy={isFetching}>
      <ContractTransactionsList contractId={id} txs={txs} />
    </TxDim>
  );
}
