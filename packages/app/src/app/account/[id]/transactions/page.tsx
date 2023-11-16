import { Suspense } from 'react';
import { getAccountTransactions } from '~/systems/Account/actions/get-account-transactions';
import { AccountTransactions } from '~/systems/Account/screens/AccountTransactions';
import { TxListSkeleton } from '~/systems/Transaction/component/TxList/TxListSkeleton';

type PageProps = {
  params: {
    id: string | null;
  };
};

export default async function AccountTransactionsPage({
  params: { id },
}: PageProps) {
  const txs = await getAccountTransactions({ owner: id });
  return (
    <Suspense fallback={<TxListSkeleton />}>
      <AccountTransactions transactions={txs.edges} />
    </Suspense>
  );
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
