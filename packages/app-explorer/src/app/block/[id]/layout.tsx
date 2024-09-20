import type { ReactNode } from 'react';
import { getBlock } from '~/systems/Block/actions/get-block';
import { BlockHeader } from '~/systems/Block/components/BlockHeader';
import type { BlockRouteParams } from '~/systems/Block/types';

export default async function BlockLayout({
  children,
  params: { id },
}: {
  children: ReactNode;
  params: BlockRouteParams;
}) {
  const { producer } = await getBlock({ id });
  return (
    <>
      <BlockHeader producer={producer} />
      {children}
    </>
  );
}

export const revalidate = 10;
