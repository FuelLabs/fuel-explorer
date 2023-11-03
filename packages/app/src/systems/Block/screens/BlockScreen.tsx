'use client';

import type { BlockItemFragment, Maybe } from '@fuel-explorer/graphql';
import { Flex, Text, VStack } from '@fuels/ui';
import { IconCube } from '@tabler/icons-react';
import { useState } from 'react';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';
import {
  ViewMode,
  ViewModes,
} from '~/systems/Core/components/ViewMode/ViewMode';

import { BlockScreenSimple } from '../components/BlockScreenSimple';

type BlockScreenProps = {
  blockNumber?: Maybe<string>;
  block?: Maybe<BlockItemFragment>;
  producer: Maybe<string>;
};

export function BlockScreen({
  blockNumber,
  block,
  producer,
}: BlockScreenProps) {
  const [viewMode, setViewMode] = useState<ViewModes>(ViewModes.Simple);

  return (
    <VStack>
      <PageTitle icon={<IconCube size={24} stroke={2.4} />}>
        <Flex justify="between" className="flex-1">
          <Flex align="center" gap={'5'}>
            Block
            <Text size="4">#{blockNumber}</Text>
          </Flex>
          <ViewMode mode={viewMode} onChange={setViewMode} />
        </Flex>
      </PageTitle>
      {viewMode === ViewModes.Simple && (
        <BlockScreenSimple block={block} producer={producer} />
      )}
      {viewMode === ViewModes.Advanced && <div>Advanced</div>}
    </VStack>
  );
}
