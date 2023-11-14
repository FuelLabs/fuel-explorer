import { getAccountTransactions } from '~/systems/Account/actions/get-account-transactions';
import { AccountTransactions } from '~/systems/Account/screens/AccountTransactions';

type PageProps = {
  params: {
    id: string | null;
  };
};

export default async function AccountTransactionsPage({
  params: { id },
}: PageProps) {
  const txs = await getAccountTransactions({ owner: id });
  return <AccountTransactions transactions={txs.edges} />;
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
