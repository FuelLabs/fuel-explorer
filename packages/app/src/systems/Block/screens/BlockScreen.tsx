'use client';

import type { BlockItemFragment, Maybe } from '@fuel-explorer/graphql';
import { Address, VStack } from '@fuels/ui';
import { IconCube } from '@tabler/icons-react';
import { useState } from 'react';
import { PageSubtitle } from '~/systems/Core/components/PageSubtitle/PageSubtitle';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';
import {
  ViewMode,
  ViewModes,
} from '~/systems/Core/components/ViewMode/ViewMode';
import { isValidAddress } from '~/systems/Core/utils/address';

import { BlockScreenAdvanced } from '../components/BlockScreenAdvanced';
import { BlockScreenSimple } from '../components/BlockScreenSimple';

type BlockScreenProps = {
  blockNumberOrId?: Maybe<string>;
  block?: Maybe<BlockItemFragment>;
  producer: Maybe<string>;
};

export function BlockScreen({
  blockNumberOrId,
  block,
  producer,
}: BlockScreenProps) {
  const [viewMode, setViewMode] = useState<ViewModes>(ViewModes.Simple);

  return (
    <VStack>
      <PageTitle
        icon={<IconCube size={24} stroke={2.4} />}
        rightElement={<ViewMode mode={viewMode} onChange={setViewMode} />}
      >
        Block
        {isValidAddress(blockNumberOrId) ? (
          <Address full value={blockNumberOrId || ''} fixed="b256" />
        ) : (
          <PageSubtitle>#{blockNumberOrId}</PageSubtitle>
        )}
      </PageTitle>
      {viewMode === ViewModes.Simple && (
        <BlockScreenSimple block={block} producer={producer} />
      )}
      {viewMode === ViewModes.Advanced && (
        <BlockScreenAdvanced block={block ? { ...block, producer } : null} />
      )}
    </VStack>
  );
}
