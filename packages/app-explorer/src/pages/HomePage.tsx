import { Button } from '@fuels/ui';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { PageState } from '~/systems/Core/components/PageState/PageState';
import { SyncStatusMonitor } from '~/systems/Core/components/SyncStatusMonitor/SyncStatusMonitor';
import { fetchTxsData } from '~/systems/Transactions/actions/fetchTxsData';
import { TxList } from '~/systems/Transactions/components/TxList/TxList';
import { TxListLoader } from '~/systems/Transactions/components/TxList/TxListLoader';
import { TxsTitle } from '~/systems/Transactions/components/TxsTitle/TxsTitle';

export function HomePage({
  cursor,
  dir = 'after',
}: { cursor?: string | null; dir?: 'after' | 'before' }) {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const _cursor = searchParams.get('cursor') ?? cursor;
  const _dir = (searchParams.get('dir') ?? dir) as 'after' | 'before';
  const {
    data: txs,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['last-transactions', _cursor, _dir],
    queryFn: () => fetchTxsData(_cursor, _dir),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <SyncStatusMonitor />
      <TxsTitle />
      {isError && !txs ? (
        <PageState
          title={t('home.error_title')}
          description={t('home.error_description')}
          action={<Button onClick={() => refetch()}>{t('core.retry')}</Button>}
        />
      ) : isLoading || !txs || txs.nodes.length === 0 ? (
        <div>
          <TxListLoader numberOfTxs={10} />
        </div>
      ) : (
        // Refetches keep the previous page on screen, dimmed.
        <div
          aria-busy={isFetching}
          className={`transition-opacity duration-200 motion-reduce:transition-none ${
            isFetching ? 'opacity-60' : 'opacity-100'
          }`}
        >
          <TxList
            transactions={txs.nodes}
            pageInfo={txs.pageInfo}
            route="home"
            showApps
          />
        </div>
      )}
    </>
  );
}
