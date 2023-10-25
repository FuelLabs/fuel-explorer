'use client';

import type { Maybe } from '@fuel-explorer/graphql';
import { Address, Flex, VStack } from '@fuels/ui';
import { IconChecklist } from '@tabler/icons-react';
import { useState } from 'react';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';
import {
  ViewMode,
  ViewModes,
} from '~/systems/Core/components/ViewMode/ViewMode';

import { TxScreenAdvanced } from '../../component/TxScreen/TxScreenAdvanced';
import { TxScreenSimple } from '../../component/TxScreen/TxScreenSimple';
import type { TransactionNode } from '../../types';

type TxScreenProps = {
  transaction?: Maybe<TransactionNode>;
};

export function TxScreen({ transaction: tx }: TxScreenProps) {
  const [viewMode, setViewMode] = useState<ViewModes>(ViewModes.Simple);

  if (!tx) return null;

  return (
    <VStack gap="6" className="min-h-[65vh]">
      <PageTitle icon={<IconChecklist size={24} stroke={1.2} />}>
        Transaction
        <Address full value={tx.id} fixed="b256" />
        <Flex className="flex-1 justify-end">
          <ViewMode mode={viewMode} onChange={setViewMode} />
        </Flex>
      </PageTitle>
      {viewMode === ViewModes.Simple && <TxScreenSimple transaction={tx} />}
      {viewMode === ViewModes.Advanced && <TxScreenAdvanced transaction={tx} />}
    </VStack>
  );
}
