import { ToggleGroup } from '@fuels/ui';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { tv } from 'tailwind-variants';
import { isEthChain, isFuelChain } from '~portal/systems/Chains';
import { useBridge } from '../hooks';

export const BridgeTabs = () => {
  const { t } = useTranslation();
  const { handlers, fromNetwork } = useBridge();
  const classes = styles();

  const handleDeposit = async () => {
    handlers.goToDeposit();
  };

  const handleWithdraw = async () => {
    handlers.goToWithdraw();
  };

  const value = useMemo(() => {
    if (isEthChain(fromNetwork)) return 'deposit';
    if (isFuelChain(fromNetwork)) return 'withdraw';
    return 'deposit';
  }, [fromNetwork]);

  return (
    <ToggleGroup
      defaultValue={value}
      value={value}
      className={classes.toggle()}
      size="2"
    >
      <ToggleGroup.Item
        value="deposit"
        aria-label={t('portal.bridge.deposit_tab')}
        onClick={handleDeposit}
      >
        {t('portal.bridge.deposit')}
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="withdraw"
        aria-label={t('portal.bridge.withdraw_tab')}
        onClick={handleWithdraw}
      >
        {t('portal.bridge.withdraw')}
      </ToggleGroup.Item>
    </ToggleGroup>
  );
};

const styles = tv({
  slots: {
    toggle: ['w-full h-9', 'fuel-[ToggleGroupItem]:text-md'],
  },
});
