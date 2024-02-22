import { ToggleGroup } from '@fuels/ui';
import type { AnimationControls } from 'framer-motion';
import { tv } from 'tailwind-variants';
import { useBridge } from '../hooks';

type BridgeTabsProps = {
  fromControls: AnimationControls;
  toControls: AnimationControls;
};

export const BridgeTabs = ({ fromControls, toControls }: BridgeTabsProps) => {
  const { handlers, isWithdraw } = useBridge();
  const classes = styles();

  const moveVertically = async (
    control: AnimationControls,
    factor = 15,
    zIndex = 1,
  ) => {
    control.set({ y: factor, zIndex });
    await control.start({
      y: 0,
      zIndex: 'auto',
      transition: { duration: 0.3 },
    });
  };

  const handleDeposit = async () => {
    handlers.goToDeposit();
    await Promise.all([
      moveVertically(fromControls, 78),
      moveVertically(toControls, -78, 999),
    ]);
  };

  const handleWithdraw = async () => {
    handlers.goToWithdraw();
    await Promise.all([
      moveVertically(fromControls, 78, 999),
      moveVertically(toControls, -78),
    ]);
  };

  function getDefaultValue() {
    return isWithdraw ? 'withdraw' : 'bridge';
  }

  return (
    <ToggleGroup
      type="single"
      defaultValue={getDefaultValue()}
      className={classes.toggle()}
    >
      <ToggleGroup.Item
        value="bridge"
        aria-label="Bridge"
        onClick={handleDeposit}
      >
        Deposit
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="withdraw"
        aria-label="Withdraw"
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
