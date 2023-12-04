import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { ViewModes } from '~/systems/Core/components/ViewMode/ViewMode';

import { TxScreenAdvancedSync, TxScreenSimpleSync } from '../TxScreen/TxScreen';
import { TxScreenSkeleton } from '../TxScreen/TxScreenSkeleton';

export function TxScreenSync({ mode, id }: { mode: ViewModes; id: string }) {
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

// Revalidate cache every 10 seconds
export const revalidate = Infinity;
