'use client';

import type { Maybe } from '@fuel-explorer/graphql';
import { Flex, Text, VStack } from '@fuels/ui';
import { IconCube } from '@tabler/icons-react';
import { useState } from 'react';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';
import {
  ViewMode,
  ViewModes,
} from '~/systems/Core/components/ViewMode/ViewMode';

type BlockScreenProps = {
  blockNumber?: Maybe<string>;
};

export function BlockScreen({ blockNumber }: BlockScreenProps) {
  const [viewMode, setViewMode] = useState<ViewModes>(ViewModes.Simple);

  return (
    <VStack>
      <PageTitle icon={<IconCube size={24} stroke={2.4} />}>
        <Flex justify="between" className="flex-1">
          <Flex align="center" gap={'5'}>
            Block
            <Text className="text-sm text-muted">#{blockNumber}</Text>
          </Flex>
          <ViewMode mode={viewMode} onChange={setViewMode} />
        </Flex>
      </PageTitle>
      {viewMode === ViewModes.Simple && <div>Simple</div>}
      {viewMode === ViewModes.Advanced && <div>Advanced</div>}
    </VStack>
  );
}
