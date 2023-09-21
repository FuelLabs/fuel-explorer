/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@fuel-explorer/ui/Badge';
import type { IconComponent } from '@fuel-explorer/ui/Icon';
import { Icon } from '@fuel-explorer/ui/Icon';
import type { BaseProps } from '@fuel-explorer/ui/types';
import {
  IconCode,
  IconCoins,
  IconFlame,
  IconTransfer,
} from '@tabler/icons-react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { type TxStatus, type TxType } from '../../types';

type TxIconProps = VariantProps<typeof styles> &
  BaseProps<{
    type: TxType;
    status: TxStatus;
  }>;

const TX_ICON_MAP: Record<TxType, IconComponent> = {
  ContractCall: IconCode,
  Mint: IconCoins,
  Transfer: IconTransfer,
  Burn: IconFlame,
};

const TX_INTENT_MAP: Record<TxStatus, any> = {
  Success: 'green',
  Failure: 'red',
  Submitted: 'gray',
};

const TX_STATUS_MAP: Record<TxStatus, string> = {
  Success: 'Success',
  Submitted: 'Submitted',
  Failure: 'Failure',
};

export function TxIcon({
  type,
  status,
  size = 'md',
  className,
  ...props
}: TxIconProps) {
  const label = TX_STATUS_MAP[status];
  const classes = styles({ size });
  return (
    <Badge
      {...props}
      variant="soft"
      radius="full"
      aria-label={label}
      color={TX_INTENT_MAP[status]}
      className={classes.root({ className })}
    >
      <Icon icon={TX_ICON_MAP[type]} className={classes.icon()} />
    </Badge>
  );
}

const styles = tv({
  slots: {
    root: 'inline-flex items-center justify-center',
    icon: 'text-current',
  },
  variants: {
    size: {
      sm: {
        root: 'w-8 h-8',
        icon: 'w-4 h-4',
      },
      md: {
        root: 'w-10 h-10',
        icon: 'w-5 h-5',
      },
      lg: {
        root: 'w-12 h-12',
        icon: 'w-6 h-6',
      },
    },
  },
});
