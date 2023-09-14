import { Badge, Icon } from '@fuel-ui/react';

import {
  TX_ICON_MAP,
  TX_INTENT_MAP,
  TX_STATUS_MAP,
  type TxStatus,
  type TxType,
} from '../../types';

type TxIconProps = {
  type: TxType;
  status: TxStatus;
  size?: 'sm' | 'md' | 'lg';
};

export function TxIcon({ type, status, size = 'sm' }: TxIconProps) {
  const icon = <Icon icon={TX_ICON_MAP[type]} />;
  const label = TX_STATUS_MAP[status];
  return (
    <Badge
      variant="ghost"
      intent={TX_INTENT_MAP[status]}
      aria-label={label}
      css={styles.root}
      data-size={size}
    >
      {icon}
    </Badge>
  );
}

const styles = {
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&[data-size="sm"]': {
      width: '$8',
      height: '$8',
    },
    '&[data-size="md"]': {
      width: '$10',
      height: '$10',
    },
    '&[data-size="lg"]': {
      width: '$12',
      height: '$12',

      '.fuel_Icon svg': {
        width: '24px !important',
        height: '24px !important',
      },
    },
  },
};
