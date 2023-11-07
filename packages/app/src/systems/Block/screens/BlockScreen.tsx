'use client';

import type { BlockItemFragment, Maybe } from '@fuel-explorer/graphql';
import { Address, Flex, VStack } from '@fuels/ui';
import { IconCube } from '@tabler/icons-react';
import { useState } from 'react';
import { PageSubtitle } from '~/systems/Core/components/PageSubtitle/PageSubtitle';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';
import {
  ViewMode,
  ViewModes,
} from '~/systems/Core/components/ViewMode/ViewMode';
import { isValidAddress } from '~/systems/Core/utils/address';

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
        className="px-4 grid sm:flex"
      >
        <Flex className="col-start-1 row-start-2">Block</Flex>
        <Flex align="center" className="justify-end col-start-2 row-start-2">
          {isValidAddress(blockNumberOrId) ? (
            <Address full value={blockNumberOrId || ''} fixed="b256" />
          ) : (
            <PageSubtitle>#{blockNumberOrId}</PageSubtitle>
          )}
        </Flex>
        <ViewMode
          mode={viewMode}
          className="justify-end col-start-2 row-start-1 sm:ml-auto"
          onChange={setViewMode}
        />
      </PageTitle>
      {viewMode === ViewModes.Simple && (
        <BlockScreenSimple block={block} producer={producer} />
      )}
      {viewMode === ViewModes.Advanced && <div>Advanced</div>}
    </VStack>
  );
}
