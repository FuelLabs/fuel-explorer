'use client';

import type { Maybe } from '@fuel-explorer/graphql';
import { Address, VStack } from '@fuels/ui';
import { IconChecklist } from '@tabler/icons-react';
import { useState } from 'react';
import { useMedia } from 'react-use';
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
  const displayFullAddress = useMedia('(min-width: 868px)');

  if (!tx) return null;

  return (
    <VStack gap="6" className="min-h-[65vh]">
      <PageTitle
        icon={<IconChecklist size={24} stroke={1.2} />}
        rightElement={<ViewMode mode={viewMode} onChange={setViewMode} />}
      >
        Transaction
        <Address full={displayFullAddress} value={tx.id} fixed="b256" />
      </PageTitle>
      {viewMode === ViewModes.Simple && <TxScreenSimple transaction={tx} />}
      {viewMode === ViewModes.Advanced && <TxScreenAdvanced transaction={tx} />}
    </VStack>
  );
}
