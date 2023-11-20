import { Suspense } from 'react';
import { BlockScreenSkeleton } from '~/systems/Block/components/BlockScreenSkeleton';
import { BlockScreen } from '~/systems/Block/screens/BlockScreen';
import { ViewModes } from '~/systems/Core/components/ViewMode/ViewMode';

type BlockProps = {
  params: {
    id: string;
  };
  searchParams: {
    view: ViewModes;
  };
};

export default async function Block({
  params: { id },
  searchParams: { view: viewMode = ViewModes.Simple },
}: BlockProps) {
  return (
    <Suspense fallback={<BlockScreenSkeleton />}>
      <BlockScreen id={id} viewMode={viewMode} />
    </Suspense>
  );
}
