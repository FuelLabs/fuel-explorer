import { Tabs } from '@fuel-ui/react';
import type { AnimationControls } from 'framer-motion';

import { useBridge } from '../hooks';

type BridgeTabsProps = {
  fromControls: AnimationControls;
  toControls: AnimationControls;
};

export const BridgeTabs = ({ fromControls, toControls }: BridgeTabsProps) => {
  const { handlers, isWithdraw } = useBridge();

  const moveVertically = async (
    control: AnimationControls,
    factor: number = 15,
    zIndex: number = 1
  ) => {
    control.set({ y: factor, zIndex });
    await control.start({
      y: 0,
      zIndex: 'auto',
      transition: { duration: 0.3 },
    });
  };
  const handleDepositAnimation = async () => {
    moveVertically(fromControls, 78);
    await moveVertically(toControls, -78, 999);
  };

  const handleWithdrawAnimation = async () => {
    moveVertically(fromControls, 78, 999);
    await moveVertically(toControls, -78);
  };

  return (
    <Tabs defaultValue={isWithdraw ? 'withdraw' : 'deposit'} variant="subtle">
      <Tabs.List aria-label="Manage deposits">
        <Tabs.Trigger
          value="deposit"
          onClick={() => {
            if (isWithdraw) {
              handleDepositAnimation();
              handlers.goToDeposit();
            }
          }}
        >
          Deposit to Fuel
        </Tabs.Trigger>
        <Tabs.Trigger
          value="withdraw"
          onClick={() => {
            if (!isWithdraw) {
              handleWithdrawAnimation();
              handlers.goToWithdraw();
            }
          }}
        >
          Withdraw from Fuel
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs>
  );
};
