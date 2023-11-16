'use client';

import { ViewModes } from '~/systems/Core/components/ViewMode/ViewMode';
import { useViewMode } from '~/systems/Core/hooks/useViewMode';

import { TxScreenAdvanced } from '../../component/TxScreen/TxScreenAdvanced';
import { TxScreenSimple } from '../../component/TxScreen/TxScreenSimple';
import type { TransactionNode } from '../../types';

type TxScreenProps = {
  transaction: TransactionNode;
};

export function TxScreen({ transaction: tx }: TxScreenProps) {
  const { viewMode } = useViewMode();
  return (
    <>
      {viewMode === ViewModes.Simple && <TxScreenSimple transaction={tx} />}
      {viewMode === ViewModes.Advanced && <TxScreenAdvanced transaction={tx} />}
    </>
  );
}
