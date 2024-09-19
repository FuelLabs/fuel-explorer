import { Badge, Icon } from '@fuels/ui';
import type { BadgeProps, BaseProps, IconComponent } from '@fuels/ui';
import {
  IconCode,
  IconCoins,
  IconFlame,
  IconMailForward,
  IconScript,
  IconSwitch3,
  IconTransfer,
  IconWallet,
} from '@tabler/icons-react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import type { TxIconType, TxStatus } from '../../types';

const TX_ICON_MAP: Record<TxIconType, IconComponent> = {
  'Contract Created': IconCode,
  Script: IconCode,
  ContractCall: IconCode,
  Mint: IconCoins,
  Transfer: IconTransfer,
  Burn: IconFlame,
  Contract: IconScript,
  Wallet: IconWallet,
  Predicate: IconSwitch3,
  Message: IconMailForward,
} as const;

export const TX_INTENT_MAP: Record<TxStatus, any> = {
  Success: 'green',
  Failure: 'red',
  Submitted: 'gray',
  Info: 'sky',
  Warning: 'yellow',
} as const;

export const TX_STATUS_MAP: Record<TxStatus, string> = {
  Success: 'Success',
  Submitted: 'Submitted',
  Failure: 'Failure',
  Info: 'Info',
  Warning: 'Waiting',
} as const;

type TxIconProps = VariantProps<typeof styles> &
  BaseProps<{
    type: TxIconType;
    status?: TxStatus;
    color?: BadgeProps['color'];
    label?: string;
  }>;

export function TxIcon({
  type,
  status,
  size = 'md',
  className,
  color,
  label: initLabel,
  ...props
}: TxIconProps) {
  const label = initLabel ?? TX_STATUS_MAP[status || 'Submitted'];
  const classes = styles({ size });
  return (
    <Badge
      {...props}
      aria-label={label}
      className={classes.root({ className })}
      color={color || TX_INTENT_MAP[status || 'Submitted']}
      radius="full"
      variant="ghost"
    >
      <Icon className={classes.icon()} icon={TX_ICON_MAP[type]} />
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
        root: 'w-9 h-9',
        icon: 'w-4 h-4',
      },
      md: {
        root: 'w-10 h-10',
        icon: 'w-5 h-5',
      },
      lg: {
        root: 'w-11 h-11',
        icon: 'w-6 h-6',
      },
    },
  },
});
