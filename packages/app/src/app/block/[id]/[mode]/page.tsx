import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { BlockScreenSimple } from '~/systems/Block/components/BlockScreenSimple';
import {
  BlockScreenSimpleSync,
  BlockScreenAdvancedSync,
} from '~/systems/Block/screens/BlockScreenSync';
import { ViewModes } from '~/systems/Core/components/ViewMode/ViewMode';

type BlockProps = {
  params: {
    id: string;
    mode: ViewModes;
  };
};

export default async function Block({ params: { id, mode } }: BlockProps) {
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
      redirect(`/block/${id}/${ViewModes.Simple}`);
  }
}

export const fetchCache = 'force-cache';
export const revalidate = Infinity;
