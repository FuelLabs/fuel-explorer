'use client';

import type { BlockItemFragment, Maybe } from '@fuel-explorer/graphql';
import { ViewModes } from '~/systems/Core/components/ViewMode/ViewMode';

import { BlockScreenAdvanced } from './BlockScreenAdvanced';
import { BlockScreenSimple } from './BlockScreenSimple';
import { BlockTitle } from './BlockTitle';

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
      <BlockTitle isLoading={isLoading} id={id} />
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
