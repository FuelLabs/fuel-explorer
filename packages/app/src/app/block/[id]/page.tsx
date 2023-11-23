import { Suspense } from 'react';
import { BlockLoader } from '~/systems/Block/components/BlockLoader';
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
    <Suspense fallback={<BlockLoader />}>
      <BlockScreen id={id} viewMode={viewMode} />
    </Suspense>
  );
}
