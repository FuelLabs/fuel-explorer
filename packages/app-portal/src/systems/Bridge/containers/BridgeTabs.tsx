import { ToggleGroup } from '@fuels/ui';
import { useMemo } from 'react';
import { tv } from 'tailwind-variants';
import { isEthChain, isFuelChain } from '~portal/systems/Chains';
import { useBridge } from '../hooks';

export const BridgeTabs = () => {
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
        aria-label="Deposit Tab"
        onClick={handleDeposit}
      >
        Deposit
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="withdraw"
        aria-label="Withdraw Tab"
        onClick={handleWithdraw}
      >
        Withdraw
      </ToggleGroup.Item>
    </ToggleGroup>
  );
};

const styles = tv({
  slots: {
    toggle: ['w-full rounded-md h-9', 'fuel-[ToggleGroupItem]:text-md'],
  },
});
