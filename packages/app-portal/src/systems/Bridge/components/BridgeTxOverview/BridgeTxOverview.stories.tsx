import { assets } from '@fuel-ts/account';
import { bn } from 'fuels';

import { Flex } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { BridgeTxOverview } from './BridgeTxOverview';

export default {
  component: BridgeTxOverview,
  title: 'BridgeTxOverview',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Usage = () => {
  const classes = styles();

  return (
    <Flex align="center" justify="center" className={classes.storybook()}>
      <BridgeTxOverview
        transactionId={bn(1234567876543456).toHex()}
        date={new Date()}
        isDeposit={true}
        amount="1.500"
        asset={assets[0]}
        ethAsset={assets[0]}
      />
    </Flex>
  );
};

export const Withdrawal = () => {
  const classes = styles();
  return (
    <Flex align="center" justify="center" className={classes.storybook()}>
      <BridgeTxOverview
        transactionId={bn(1234567876543456).toHex()}
        date={new Date()}
        asset={assets[0]}
        amount="1.500"
        ethAsset={assets[0]}
      />
    </Flex>
  );
};

export const Loading = () => {
  const classes = styles();
  return (
    <Flex align="center" justify="center" className={classes.storybook()}>
      <BridgeTxOverview
        isLoading
        transactionId={bn(1234567876543456).toHex()}
        date={new Date()}
        isDeposit={true}
        amount="1.500"
        asset={assets[0]}
        ethAsset={assets[0]}
      />
    </Flex>
  );
};

const styles = tv({
  slots: {
    storybook: 'm-4 w-[348px]',
  },
});
