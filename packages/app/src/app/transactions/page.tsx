import { search } from '~/systems/Core/actions/search';
import { Layout } from '~/systems/Core/components/Layout/Layout';
import { getLastTxs } from '~/systems/Transaction/actions/get-last-txs';
import { TxList } from '~/systems/Transaction/component/TxList/TxList';

import { TransactionsTitle } from './title';

type PageProps = {
  searchParams: {
    page?: string;
    searchQuery?: string;
  };
};

export default async function Transactions({
  searchParams: { page = '1', searchQuery = '' },
}: PageProps) {
  const txs = await getLastTxs({ page: Number(page) });
  const searchResult = await search({ query: searchQuery });
  console.log('result in page', searchResult);
  return (
    <Layout
      hero
      searchResult={searchResult}
      contentClassName="[&_.rt-ContainerInner]:space-y-2 tablet:[&_.rt-ContainerInner]:space-y-2 laptop:[&_.rt-ContainerInner]:space-y-10"
    >
      <TransactionsTitle />
      <TxList transactions={txs} page={page} />
    </Layout>
  );
}

export const revalidate = 10;
