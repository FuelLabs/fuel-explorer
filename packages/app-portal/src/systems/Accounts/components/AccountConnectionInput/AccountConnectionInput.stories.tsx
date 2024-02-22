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
            'fuel14kz7u7jpd8txfe2vtgh5hxjx4wk7s03kq8hcl2k7slwe3yqh5sas974464',
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
            'fuel14kz7u7jpd8txfe2vtgh5hxjx4wk7s03kq8hcl2k7slwe3yqh5sas974464',
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
