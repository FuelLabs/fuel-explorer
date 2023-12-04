import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { BlockScreenSkeleton } from '~/systems/Block/components/BlockScreenSkeleton';
import {
  BlockScreenSimpleSync,
  BlockScreenAdvancedSync,
} from '~/systems/Block/screens/BlockScreen';
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
        <Suspense fallback={<BlockScreenSkeleton />}>
          <BlockScreenSimpleSync id={id} />
        </Suspense>
      );
    case ViewModes.Advanced:
      return (
        <Suspense fallback={<BlockScreenSkeleton />}>
          <BlockScreenAdvancedSync id={id} />
        </Suspense>
      );
    default:
      redirect(`/block/${id}/${ViewModes.Simple}`);
  }
}
