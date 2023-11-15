'use client';

import type { Maybe } from '@fuel-explorer/graphql';
import { Address, VStack, useBreakpoints } from '@fuels/ui';
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
  const { isLaptop } = useBreakpoints();

  if (!tx) return null;

  return (
    <VStack className="min-h-[65vh] gap-8 laptop:gap-14 tablet:mb-10">
      <PageTitle
        icon={<IconChecklist size={24} stroke={1.2} />}
        rightElement={<ViewMode mode={viewMode} onChange={setViewMode} />}
      >
        Transaction
        <Address full={isLaptop} value={tx.id} fixed="b256" />
      </PageTitle>
      {viewMode === ViewModes.Simple && <TxScreenSimple transaction={tx} />}
      {viewMode === ViewModes.Advanced && <TxScreenAdvanced transaction={tx} />}
    </VStack>
  );
}
