import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { Routes } from '~/routes';
import { BlockScreenSimple } from '~/systems/Block/components/BlockScreenSimple';
import { BlockScreenAdvancedSync } from '~/systems/Block/screens/BlockScreenAdvancedSync';
import { BlockScreenSimpleSync } from '~/systems/Block/screens/BlockScreenSimpleSync';
import type { BlockRouteProps } from '~/systems/Block/types';
import { ViewModes } from '~/systems/Core/components/ViewMode/constants';

export default async function Block({ params: { id, mode } }: BlockRouteProps) {
  switch (mode) {
    case ViewModes.Simple:
      return (
        <Suspense fallback={<BlockScreenSimple isLoading={true} />}>
          <BlockScreenSimpleSync id={id} />
        </Suspense>
      );
    case ViewModes.Advanced:
      return (
        <Suspense fallback={<BlockScreenSimple isLoading={true} />}>
          <BlockScreenAdvancedSync id={id} />
        </Suspense>
      );
    default:
      redirect(Routes.blockSimple(id));
  }
}

export const dynamic = 'force-static';
export const invalidate = Infinity;
