import { Badge } from '@fuels/ui';
import { useContext } from 'react';
import { ReceiptContext } from '~/systems/Transaction/component/TxScripts/context';

import { getBadgeColor } from './utils';

export function TxReceiptBadge() {
  const { receipt, hasPanic } = useContext(ReceiptContext);
  const type = receipt?.item?.receiptType ?? 'UNKNOWN';
  const color = getBadgeColor(Boolean(hasPanic), receipt?.item);
  return (
    <Badge
      size="1"
      className="font-mono ml-14 tablet:ml-0 self-start tablet:self-center justify-center"
      variant="ghost"
      color={color}
    >
      {type}
    </Badge>
  );
}
