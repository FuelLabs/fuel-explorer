import { getAccountTransactions } from '~/systems/Account/actions/get-account-transactions';
import { TxList } from '~/systems/Transaction/component/TxList/TxList';

type PageProps = {
  params: {
    id: string | null;
  };
};

export default async function AccountTransactions({
  params: { id },
}: PageProps) {
  const txs = await getAccountTransactions({ owner: id });
  return <TxList transactions={txs.edges} />;
}

// Revalidate cache every 10 seconds
export const revalidate = 1;
