import { Flex, FuelLogo } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { AccountConnectionInput } from './AccountConnectionInput';

export default {
  component: AccountConnectionInput,
  title: 'AccountConnectionInput',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Usage = () => {
  const classes = styles();

  return (
    <Flex align="center" justify="center" className={classes.storybook()}>
      <AccountConnectionInput
        networkName="Fuel"
        networkImage={<FuelLogo size={18} />}
        label="To"
        isConnecting={false}
        onConnect={() => {}}
      />
    </Flex>
  );
};

export const Loading = () => {
  const classes = styles();

  return (
    <Flex align="center" justify="center" className={classes.storybook()}>
      <AccountConnectionInput
        networkName="Fuel"
        networkImage={<FuelLogo size={18} />}
        label="To"
        isConnecting={true}
        onConnect={() => {}}
      />
    </Flex>
  );
};

export const ConnectedAccount = () => {
  const classes = styles();

  return (
    <Flex align="center" justify="center" className={classes.storybook()}>
      <AccountConnectionInput
        networkName="Fuel"
        networkImage={<FuelLogo size={18} />}
        label="To"
        isConnecting={false}
        account={{
          address:
            '0xad85ee7a4169d664e54c5a2f4b9a46abade83e3601ef8faade87dd989017a43b',
        }}
        onConnect={() => {}}
      />
    </Flex>
  );
};

export const ConnectedENSAccount = () => {
  const classes = styles();

  return (
    <Flex align="center" justify="center" className={classes.storybook()}>
      <AccountConnectionInput
        networkName="Fuel"
        networkImage={<FuelLogo size={18} />}
        label="To"
        isConnecting={false}
        account={{
          address:
            '0xad85ee7a4169d664e54c5a2f4b9a46abade83e3601ef8faade87dd989017a43b',
          alias: 'luizasfight.eth',
        }}
        onConnect={() => {}}
      />
    </Flex>
  );
};

export const styles = tv({
  slots: {
    storybook: 'm-6',
  },
});
