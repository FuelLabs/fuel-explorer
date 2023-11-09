'use client';

import type {
  ContractBalanceConnectionItemFragment,
  ContractItemFragment,
  Maybe,
} from '@fuel-explorer/graphql';
import { Address, VStack } from '@fuels/ui';
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
      <PageTitle
        icon={<IconChecklist size={24} stroke={1.2} />}
        rightElement={<ViewMode mode={viewMode} onChange={setViewMode} />}
      >
        Contract
        <Address value={contract.id} fixed="b256" />
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
