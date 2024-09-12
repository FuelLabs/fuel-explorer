import type { ReactNode } from 'react';
import { BlockHeader } from '~/systems/Block/components/BlockHeader';
import type { BlockRouteParams } from '~/systems/Block/types';

export default function BlockLayout({
  children,
  params: { id },
}: {
  children: ReactNode;
  params: BlockRouteParams;
}) {
  return (
    <>
      <BlockHeader id={id} />
      {children}
    </>
  );
}

export const revalidate = 10;
