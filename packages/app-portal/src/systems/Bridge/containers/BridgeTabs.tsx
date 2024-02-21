import type { AnimationControls } from 'framer-motion';

import { ButtonSwitch } from '@fuels/ui';
import { useBridge } from '../hooks';

type BridgeTabsProps = {
  fromControls: AnimationControls;
  toControls: AnimationControls;
};

export const BridgeTabs = ({ fromControls, toControls }: BridgeTabsProps) => {
  const { handlers, isWithdraw } = useBridge();

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
  const handleDepositAnimation = async () => {
    moveVertically(fromControls, 78);
    await moveVertically(toControls, -78, 999);
  };

  const handleWithdrawAnimation = async () => {
    moveVertically(fromControls, 78, 999);
    await moveVertically(toControls, -78);
  };

  return (
    <ButtonSwitch
      leftButton={{
        label: 'Deposit to Fuel',
        active: !isWithdraw,
        props: {
          onClick: () => {
            if (isWithdraw) {
              handleDepositAnimation();
              handlers.goToDeposit();
            }
          },
        },
      }}
      rightButton={{
        label: 'Withdraw from Fuel',
        active: !!isWithdraw,
        props: {
          onClick: () => {
            if (!isWithdraw) {
              handleWithdrawAnimation();
              handlers.goToWithdraw();
            }
          },
        },
      }}
    />
  );
};
