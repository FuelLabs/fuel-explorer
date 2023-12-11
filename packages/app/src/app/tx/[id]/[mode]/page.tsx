import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { ViewModes } from '~/systems/Core/components/ViewMode/ViewMode';
import { TxScreenLoader } from '~/systems/Transaction/component/TxScreen/TxScreenLoader';
import {
  TxScreenAdvancedSync,
  TxScreenSimpleSync,
} from '~/systems/Transaction/screens/TxScreenSync/TxScreenSync';

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
        <Suspense fallback={<TxScreenLoader />}>
          <TxScreenAdvancedSync id={id} />
        </Suspense>
      );
    case ViewModes.Simple:
      return (
        <Suspense fallback={<TxScreenLoader />}>
          <TxScreenSimpleSync id={id} />
        </Suspense>
      );
    default:
      redirect(`/tx/${id}/simple`);
  }
}

export const fetchCache = 'force-cache';
export const revalidate = Infinity;
