import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { Routes } from '~/routes';
import { ViewModes } from '~/systems/Core/components/ViewMode/constants';
import { TxScreenLoader } from '~/systems/Transaction/component/TxScreen/TxScreenLoader';
import { TxScreenAdvancedSync } from '~/systems/Transaction/screens/TxScreenAdvancedSync';
import { TxScreenSimpleSync } from '~/systems/Transaction/screens/TxScreenSimpleSync';
import type { TxRouteProps } from '~/systems/Transaction/types';

export default async function Transaction({
  params: { id, mode },
}: TxRouteProps) {
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
      redirect(Routes.txSimple(id));
  }
}

export const fetchCache = 'force-cache';
export const revalidate = Infinity;
