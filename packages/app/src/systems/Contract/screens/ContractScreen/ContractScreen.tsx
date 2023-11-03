'use client';

import type {
  ContractBalanceConnectionItemFragment,
  ContractItemFragment,
  Maybe,
} from '@fuel-explorer/graphql';
import { Address, Flex, VStack } from '@fuels/ui';
import { IconChecklist } from '@tabler/icons-react';
import { useState } from 'react';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';
import {
  ViewMode,
  ViewModes,
} from '~/systems/Core/components/ViewMode/ViewMode';

import { ContractScreenAdvanced } from '../../components/ContractScreenAdvanced';
import { ContractScreenSimple } from '../../components/ContractScreenSimple';

type ContractScreenProps = {
  contract?: Maybe<ContractItemFragment>;
  contractBalances?: Maybe<ContractBalanceConnectionItemFragment>;
};

export function ContractScreen({
  contract,
  contractBalances,
}: ContractScreenProps) {
  const [viewMode, setViewMode] = useState<ViewModes>(ViewModes.Simple);

  if (!contract) return null;

  return (
    <VStack gap="6" className="min-h-[65vh]">
      <PageTitle icon={<IconChecklist size={24} stroke={1.2} />}>
        <Flex justify="between" className="flex-1">
          <Flex align="center" gap={'5'}>
            Contract
            <Address full value={contract.id} fixed="b256" />
          </Flex>
          <ViewMode mode={viewMode} onChange={setViewMode} />
        </Flex>
      </PageTitle>
      {viewMode === ViewModes.Simple && (
        <ContractScreenSimple
          contract={contract}
          contractBalances={contractBalances}
        />
      )}
      {viewMode === ViewModes.Advanced && <ContractScreenAdvanced />}
    </VStack>
  );
}
