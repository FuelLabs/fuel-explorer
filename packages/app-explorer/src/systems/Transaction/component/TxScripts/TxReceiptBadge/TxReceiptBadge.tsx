import { useContext } from 'react';

import { Badge } from '@fuels/ui';
import { TxScriptsContext } from '~/systems/Transaction/component/TxScripts/ReceiptItem/constants';
import { getBadgeColor } from './utils';

export function TxReceiptBadge() {
  const { receipt, hasPanic } = useContext(TxScriptsContext);
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
