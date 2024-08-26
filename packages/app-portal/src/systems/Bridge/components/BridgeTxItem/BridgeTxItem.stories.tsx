import { assets } from '@fuel-ts/account';

import { Flex, FuelLogo, Text } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { BridgeTxItem } from './BridgeTxItem';

export default {
  component: BridgeTxItem,
  title: 'BridgeTxItem',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Usage = () => {
  const classes = styles();

  return (
    <Flex align="center" justify="center" className={classes.storybook()}>
      <BridgeTxItem
        toLogo={<FuelLogo size={17} />}
        date={new Date()}
        amount="0.050"
        asset={assets[0]}
        fromLogo={
          <img width={18} height={18} src={assets[0].icon} alt={'ETH logo'} />
        }
        status={<Text className={classes.statusText()}>Settled</Text>}
        onClick={() => {}}
      />
    </Flex>
  );
};

export const Loading = () => {
  const classes = styles();

  return (
    <Flex align="center" justify="center" className={classes.storybook()}>
      <BridgeTxItem
        isLoading
        toLogo={<FuelLogo size={17} />}
        date={new Date()}
        amount="0.050"
        asset={assets[0]}
        fromLogo={
          <img width={18} height={18} src={assets[0].icon} alt={'ETH logo'} />
        }
        status={<Text className={classes.statusText()}>Settled</Text>}
        onClick={() => {}}
      />
    </Flex>
  );
};

const styles = tv({
  slots: {
    storybook: 'm-4 w-[328px] tablet:w-[400px]',
    article: 'flex-1',
    statusText: 'text-xs text-muted',
  },
});
