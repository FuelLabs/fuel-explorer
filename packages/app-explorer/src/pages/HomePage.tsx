import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { fetchTxsData } from '~/systems/Transactions/actions/fetchTxsData';
import { TxList } from '~/systems/Transactions/components/TxList/TxList';
import { TxListLoader } from '~/systems/Transactions/components/TxList/TxListLoader';
import { TxsTitle } from '~/systems/Transactions/components/TxsTitle/TxsTitle';

export function HomePage({
  cursor,
  dir = 'after',
}: { cursor?: string | null; dir?: 'after' | 'before' }) {
  const [searchParams] = useSearchParams();
  const _cursor = searchParams.get('cursor') ?? cursor;
  const _dir = (searchParams.get('dir') ?? dir) as 'after' | 'before';
  const {
    data: txs,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['last-transactions', _cursor, _dir],
    queryFn: async () => {
      const data = await fetchTxsData(_cursor, _dir);
      console.log(data.pageInfo);
      return data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Fuel Explorer - Home</title>
        <meta
          name="description"
          content="Explore the Fuel blockchain - blocks, transactions, and network statistics"
        />
      </Helmet>
      <TxsTitle />
      {isLoading || isFetching || txs.nodes.length === 0 ? (
        <div>
          <TxListLoader numberOfTxs={10} />
        </div>
      ) : (
        <TxList
          transactions={txs?.nodes}
          pageInfo={txs?.pageInfo}
          route="home"
        />
      )}
    </>
  );
}
