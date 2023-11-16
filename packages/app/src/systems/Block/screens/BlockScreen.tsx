'use client';

import type { BlockItemFragment, Maybe } from '@fuel-explorer/graphql';
import { ViewModes } from '~/systems/Core/components/ViewMode/ViewMode';
import { useViewMode } from '~/systems/Core/hooks/useViewMode';

import { BlockScreenAdvanced } from '../components/BlockScreenAdvanced';
import { BlockScreenSimple } from '../components/BlockScreenSimple';

type BlockScreenProps = {
  blockNumberOrId?: Maybe<string>;
  block?: Maybe<BlockItemFragment>;
  producer: Maybe<string>;
};

export function BlockScreen({ block, producer }: BlockScreenProps) {
  const { viewMode } = useViewMode();
  return (
    <>
      {viewMode === ViewModes.Simple && (
        <BlockScreenSimple block={block} producer={producer} />
      )}
      {viewMode === ViewModes.Advanced && (
        <BlockScreenAdvanced block={block ? { ...block, producer } : null} />
      )}
    </>
  );
}
