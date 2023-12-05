import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { ViewModes } from '~/systems/Core/components/ViewMode/ViewMode';
import {
  TxScreenAdvancedSync,
  TxScreenSimpleSync,
} from '~/systems/Transaction/screens/TxScreen/TxScreen';
import { TxScreenSkeleton } from '~/systems/Transaction/screens/TxScreen/TxScreenSkeleton';

type TransactionProps = {
  params: {
    id: string;
    mode: ViewModes;
  };
};

export default async function Transaction({
  params: { id, mode },
}: TransactionProps) {
  switch (mode) {
    case ViewModes.Advanced:
      return (
        <Suspense fallback={<TxScreenSkeleton />}>
          <TxScreenAdvancedSync id={id} />
        </Suspense>
      );
    case ViewModes.Simple:
      return (
        <Suspense fallback={<TxScreenSkeleton />}>
          <TxScreenSimpleSync id={id} />
        </Suspense>
      );
    default:
      redirect(`/tx/${id}/simple`);
  }
}

export const fetchCache = 'force-cache';
export const revalidate = Infinity;
