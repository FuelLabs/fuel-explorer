import { Button } from '@fuels/ui';
import { useTranslation } from 'react-i18next';
import { tv } from 'tailwind-variants';

type BridgeTxListEmptyProps = {
  isConnecting: boolean;
  onClick: () => void;
};

export const BridgeTxListNotConnected = ({
  isConnecting,
  onClick,
}: BridgeTxListEmptyProps) => {
  const { t } = useTranslation();
  const classes = styles();

  return (
    <div className={classes.root()}>
      <p className={classes.text()}>{t('portal.history.not_connected')}</p>
      <Button
        isLoading={isConnecting}
        variant="ghost"
        color="gray"
        className={classes.connectButton()}
        onClick={onClick}
        aria-label={t('portal.history.connect_fuel_wallet')}
      >
        {t('portal.history.connect_fuel_wallet')}
      </Button>
    </div>
  );
};

const styles = tv({
  slots: {
    root: 'fuel-appear flex flex-wrap items-center justify-between gap-4 border-t border-[var(--fuel-border)] py-8',
    connectButton: 'whitespace-nowrap',
    text: 'm-0 text-base text-[var(--fuel-element-low-em)]',
  },
});
