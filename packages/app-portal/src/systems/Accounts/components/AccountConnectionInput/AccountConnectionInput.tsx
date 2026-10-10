import { LoadingBox } from '@fuels/ui';
import { IconX } from '@fuels/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { tv } from 'tailwind-variants';
import { shortAddress } from '~portal/systems/Core';

type AccountConnectionInputProps = {
  networkName?: string;
  networkImage: ReactNode | string;
  label?: string;
  disconnectLabel?: string;
  disconnectIcon?: ReactNode;
  isConnecting?: boolean;
  account?: {
    address?: string;
    alias?: string;
    avatar?: string;
  };
  onConnect: () => void;
  onDisconnect?: () => void;
  isLoading?: boolean;
  isConnected: boolean;
};

export const AccountConnectionInput = ({
  networkName,
  networkImage,
  label,
  disconnectLabel,
  disconnectIcon = <IconX size={12} />,
  isConnecting: _isConnecting,
  account,
  onConnect: _onConnect,
  onDisconnect,
  isLoading,
  isConnected,
}: AccountConnectionInputProps) => {
  const { t } = useTranslation();
  const classes = styles();

  const connected = !!account?.address && isConnected;

  return (
    <div className={classes.root()}>
      <div className="flex min-w-0 flex-col gap-2">
        <span className={classes.label()}>{label}</span>
        <div className="flex items-center gap-2">
          {typeof networkImage === 'string' ? (
            <img
              className="size-5 shrink-0 rounded-full"
              src={networkImage}
              alt={networkName}
            />
          ) : (
            networkImage
          )}
          <span className={classes.network()}>{networkName}</span>
        </div>
      </div>

      {connected && (
        <div className="flex flex-col items-end gap-2">
          <button
            type="button"
            className={classes.disconnect()}
            onClick={onDisconnect}
            disabled={!isConnected}
          >
            {disconnectLabel ?? t('portal.account.disconnect')}
            {disconnectIcon}
          </button>
          {account.address ? (
            <span className={classes.address()} title={account.address}>
              <span className="sr-only">
                {t('portal.account.connected_wallet', {
                  network: networkName,
                })}{' '}
              </span>
              {shortAddress(account.alias, {
                minLength: 16,
              }) ||
                shortAddress(account.address, {
                  start: 6,
                  end: 6,
                })}
            </span>
          ) : isLoading ? (
            <LoadingBox className="h-[20px] w-[100px]" />
          ) : null}
        </div>
      )}
    </div>
  );
};

export const styles = tv({
  slots: {
    root: [
      'flex min-h-[72px] items-center justify-between gap-2 px-5 py-3',
      'border border-[var(--fuel-line)] bg-[var(--fuel-card)]',
    ],
    label: 'fuel-eyebrow text-[var(--fuel-element-low-em)]',
    network: 'fuel-stat-sm truncate',
    disconnect: [
      'fuel-label inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0',
      'transition-colors duration-150 hover:text-heading focus-visible:text-heading',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fuel-focus)]',
      'disabled:cursor-default disabled:opacity-50',
      'motion-reduce:transition-none',
    ],
    address:
      'whitespace-nowrap font-mono text-sm tabular-nums text-[var(--fuel-element-mid-em)]',
  },
});
