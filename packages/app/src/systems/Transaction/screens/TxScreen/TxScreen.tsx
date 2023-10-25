'use client';

import type { Maybe } from '@fuel-explorer/graphql';
import { Flex, VStack } from '@fuels/ui';
import { useState } from 'react';
import {
  ViewMode,
  ViewModes,
} from '~/systems/Core/components/ViewMode/ViewMode';

import { TxBreadcrumb } from '../../component/TxBreadcrumb/TxBreadcrumb';
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
    <VStack gap="6" className="min-h-[75vh]">
      <Flex align="center" justify="between">
        <TxBreadcrumb transactionId={tx.id} />
        <ViewMode mode={viewMode} onChange={setViewMode} />
      </Flex>
      {viewMode === ViewModes.Simple && <TxScreenSimple transaction={tx} />}
      {viewMode === ViewModes.Advanced && <TxScreenAdvanced transaction={tx} />}
    </VStack>
  );
}
