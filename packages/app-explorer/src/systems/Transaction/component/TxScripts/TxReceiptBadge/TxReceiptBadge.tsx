import { useContext } from 'react';
import { TxChip } from '~/systems/Transaction/component/TxItem/TxChip';
import { ReceiptContext } from '~/systems/Transaction/component/TxScripts/context';

import { getBadgeKind } from './utils';

export function TxReceiptBadge() {
  const { receipt, hasPanic } = useContext(ReceiptContext);
  const type = receipt?.item?.receiptType ?? 'UNKNOWN';
  const kind = getBadgeKind(Boolean(hasPanic), receipt?.item);
  return (
    <TxChip
      kind={kind}
      className="ml-14 self-start tablet:ml-0 tablet:self-center"
    >
      {type}
    </TxChip>
  );
}
