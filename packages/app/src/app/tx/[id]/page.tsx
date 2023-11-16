import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { getTx } from '~/systems/Transaction/actions/get-tx';
import { TxScreen } from '~/systems/Transaction/screens/TxScreen/TxScreen';
import { TxScreenSkeleton } from '~/systems/Transaction/screens/TxScreen/TxScreenSkeleton';

type TransactionProps = {
  params: {
    id?: string | null;
  };
};

export default async function Transaction({
  params: { id = null },
}: TransactionProps) {
  const tx = await getTx({ id });
  if (!tx) return redirect('/');
  return (
    <Suspense fallback={<TxScreenSkeleton />}>
      <TxScreen transaction={tx} />
    </Suspense>
  );
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
