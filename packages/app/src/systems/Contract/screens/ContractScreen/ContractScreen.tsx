'use client';

import type { ContractItemFragment, Maybe } from '@fuel-explorer/graphql';
import { Flex, VStack } from '@fuels/ui';
import { IconChecklist } from '@tabler/icons-react';
import { useState } from 'react';
import { PageSubtitle } from '~/systems/Core/components/PageSubtitle/PageSubtitle';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';
import {
  ViewMode,
  ViewModes,
} from '~/systems/Core/components/ViewMode/ViewMode';

import { ContractScreenAdvanced } from '../../components/ContractScreenAdvanced/ContractScreenAdvanced';
import { ContractScreenSimple } from '../../components/ContractScreenSimple/ContractScreenSimple';

type ContractScreenProps = {
  contract?: Maybe<ContractItemFragment>;
};

export function ContractScreen({ contract }: ContractScreenProps) {
  const [viewMode, setViewMode] = useState<ViewModes>(ViewModes.Simple);

  if (!contract) return null;

  return (
    <VStack gap="6" className="min-h-[65vh]">
      <PageTitle icon={<IconChecklist size={24} stroke={1.2} />}>
        <Flex justify="between" className="flex-1">
          <Flex align="center" gap={'5'}>
            Contract
            <PageSubtitle>Microchain: pool_funds</PageSubtitle>
          </Flex>
          <ViewMode mode={viewMode} onChange={setViewMode} />
        </Flex>
      </PageTitle>
      {viewMode === ViewModes.Simple && <ContractScreenSimple />}
      {viewMode === ViewModes.Advanced && <ContractScreenAdvanced />}
    </VStack>
  );
}
