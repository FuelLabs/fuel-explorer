import { Suspense } from 'react';
import { getBlock } from '~/systems/Block/actions/get-block';
import { BlockScreenSkeleton } from '~/systems/Block/components/BlockScreenSkeleton';
import { BlockScreen } from '~/systems/Block/screens/BlockScreen';

type BlockProps = {
  params: {
    id: string | null;
  };
};

export default async function Block({ params: { id = null } }: BlockProps) {
  const { block, producer } = await getBlock({ id });
  return (
    <Suspense fallback={<BlockScreenSkeleton />}>
      <BlockScreen blockNumberOrId={id} block={block} producer={producer} />
    </Suspense>
  );
}
