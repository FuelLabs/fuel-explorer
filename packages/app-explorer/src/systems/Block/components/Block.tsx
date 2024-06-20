'use client';

import type { BlockItemFragment, Maybe } from '@fuel-explorer/graphql';
import { ViewModes } from '~/systems/Core/components/ViewMode/constants';

import { BlockHeader } from './BlockHeader';
import { BlockScreenAdvanced } from './BlockScreenAdvanced';
import { BlockScreenSimple } from './BlockScreenSimple';

type BlockScreenProps = {
  id: string;
  viewMode: ViewModes;
  block?: Maybe<BlockItemFragment>;
  producer: Maybe<string>;
  isLoading?: boolean;
};

export async function Block({
  id,
  viewMode,
  block,
  producer,
  isLoading,
}: BlockScreenProps) {
  return (
    <>
      <BlockHeader isLoading={isLoading} id={id} />
      {viewMode === ViewModes.Simple && (
        <BlockScreenSimple
          block={block}
          producer={producer}
          isLoading={isLoading}
        />
      )}
      {viewMode === ViewModes.Advanced && (
        <BlockScreenAdvanced block={block ? { ...block, producer } : null} />
      )}
    </>
  );
}
