import { Badge } from '@fuels/ui';
import { useContext } from 'react';
import { ReceiptContext } from '~/systems/Transaction/component/TxScripts/context';

import { getBadgeColor } from './utils';

export function TxReceiptBadge() {
  const { receipt, hasPanic } = useContext(ReceiptContext);
  const type = receipt?.item?.receiptType ?? 'UNKNOWN';
  const color = getBadgeColor(Boolean(hasPanic), receipt?.item);
  return (
    <div>
      <Badge size="1" className="font-mono" variant="ghost" color={color}>
        {type}
      </Badge>
    </div>
  );
}
