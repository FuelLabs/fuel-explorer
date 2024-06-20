import { ToggleGroup } from '@fuels/ui';
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

  function getDefaultValue() {
    if (isEthChain(fromNetwork)) return 'deposit';
    if (isFuelChain(fromNetwork)) return 'withdraw';
  }

  return (
    <ToggleGroup
      defaultValue={getDefaultValue()}
      value={getDefaultValue()}
      className={classes.toggle()}
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
    toggle: [
      'w-full rounded-md fuel-[ToggleGroupItem]:h-9',
      'fuel-[ToggleGroupItem]:text-md',
    ],
  },
});
