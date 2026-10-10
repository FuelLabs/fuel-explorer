import { Icon, cx } from '@fuels/ui';
import type { BaseProps, IconComponent } from '@fuels/ui';
import {
  IconCode,
  IconCoins,
  IconFlame,
  IconMailForward,
  IconScript,
  IconSwitch3,
  IconTransfer,
  IconWallet,
} from '@fuels/ui';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import type { TxIconType, TxStatus } from '../../types';
import { type TxChipKind, TxSquare } from '../TxItem/TxChip';

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

// Marker colour per status. Submitted and Info carry no marker.
export const TX_CHIP_KIND_MAP: Record<TxStatus, TxChipKind | undefined> = {
  Success: 'success',
  Failure: 'failed',
  Submitted: undefined,
  Info: undefined,
  Warning: 'pending',
} as const;

const ICON_COLOR: Record<TxStatus, string> = {
  Success: 'text-[var(--fuel-brand-text)]',
  Failure: 'text-[var(--fuel-danger-text)]',
  Submitted: 'text-[var(--fuel-element-mid-em)]',
  Info: 'text-[var(--fuel-element-mid-em)]',
  Warning: 'text-[var(--fuel-element-low-em)]',
};

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
    radius?: string;
    color?: string;
    label?: string;
  }>;

// Corners are always square; radius and color are kept so callers still compile.
export function TxIcon({
  type,
  status,
  size = 'md',
  className,
  radius: _radius,
  color: _color,
  label: initLabel,
  ...props
}: TxIconProps) {
  const current = status || 'Submitted';
  const label = initLabel ?? TX_STATUS_MAP[current];
  const classes = styles({ size });
  const kind = TX_CHIP_KIND_MAP[current];
  return (
    <span
      {...props}
      role="img"
      aria-label={label}
      className={classes.root({
        className: cx(ICON_COLOR[current], className),
      })}
    >
      <Icon className={classes.icon()} icon={TX_ICON_MAP[type]} />
      {kind && <TxSquare kind={kind} className="absolute -right-px -top-px" />}
    </span>
  );
}

const styles = tv({
  slots: {
    root: 'relative inline-flex shrink-0 items-center justify-center border border-[var(--fuel-border)]',
    icon: 'text-current',
  },
  variants: {
    size: {
      sm: {
        root: 'w-9 h-9',
        icon: 'w-4 h-4',
      },
      md: {
        root: 'w-[38px] h-[38px]',
        icon: 'w-5 h-5',
      },
      lg: {
        root: 'w-11 h-11',
        icon: 'w-6 h-6',
      },
    },
  },
});
