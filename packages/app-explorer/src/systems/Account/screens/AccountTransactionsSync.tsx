import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useAccountTransactions } from '~/hooks/useApi';
import { EmptyTransactions } from '~/systems/Core/components/EmptyBlocks/EmptyTransactions';
import { PageState } from '~/systems/Core/components/PageState/PageState';
import { TxDim } from '~/systems/Transaction/component/TxNotice/TxNotice';
import { BridgeNotice } from '~/systems/Transactions/components/BridgeNotice/BridgeNotice';
import { TxList } from '~/systems/Transactions/components/TxList/TxList';
import { TxListLoader } from '~/systems/Transactions/components/TxList/TxListLoader';

type AccountTransactionsProps = {
  id: string;
  cursor?: string | null;
  dir?: 'after' | 'before';
};

export function AccountTransactionsSync({
  id,
  cursor,
  dir = 'after',
}: AccountTransactionsProps) {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const _cursor = searchParams.get('cursor') ?? cursor;
  const _dir = (searchParams.get('dir') ?? dir) as 'after' | 'before';

  const {
    data: txs,
    isLoading,
    isFetching,
    error,
  } = useAccountTransactions(id, {
    cursor: _cursor || undefined,
    direction: _dir,
  });

  // Bridge notice - always visible
  const notice = <BridgeNotice className="mt-1 mb-6" />;

  // The loader shows on the first load only. A refetch keeps the list and dims it.
  if (isLoading) {
    return (
      <>
        {notice}
        <TxListLoader numberOfTxs={10} />
      </>
    );
  }

  if (error) {
    return (
      <>
        {notice}
        <PageState
          tone="error"
          title={t('account.error_transactions')}
          description={error.message}
        />
      </>
    );
  }

  if (!txs?.nodes?.length) {
    return (
      <>
        {notice}
        <EmptyTransactions entity="account" />
      </>
    );
  }

  return (
    <>
      {notice}
      <TxDim busy={isFetching}>
        <TxList
          transactions={txs.nodes}
          pageInfo={txs.pageInfo}
          owner={id}
          route="accountTxs"
        />
      </TxDim>
    </>
  );
}
