import { cssObj } from "@fuel-ui/css";
import { Box, FuelLogo } from "@fuel-ui/react";

import { AccountConnectionInput } from "./AccountConnectionInput";

export default {
  component: AccountConnectionInput,
  title: "AccountConnectionInput",
  parameters: {
    layout: "fullscreen",
  },
};

export const Usage = () => {
  return (
    <Box.Flex align="center" justify="center" css={styles.storybook}>
      <AccountConnectionInput
        networkName="Fuel"
        networkImage={<FuelLogo size={18} />}
        label="To"
        isConnecting={false}
        onConnect={() => {}}
      />
    </Box.Flex>
  );
};

export const Loading = () => {
  return (
    <Box.Flex align="center" justify="center" css={styles.storybook}>
      <AccountConnectionInput
        networkName="Fuel"
        networkImage={<FuelLogo size={18} />}
        label="To"
        isConnecting={true}
        onConnect={() => {}}
      />
    </Box.Flex>
  );
};

export const ConnectedAccount = () => {
  return (
    <Box.Flex align="center" justify="center" css={styles.storybook}>
      <AccountConnectionInput
        networkName="Fuel"
        networkImage={<FuelLogo size={18} />}
        label="To"
        isConnecting={false}
        account={{
          address:
            "fuel14kz7u7jpd8txfe2vtgh5hxjx4wk7s03kq8hcl2k7slwe3yqh5sas974464",
        }}
        onConnect={() => {}}
      />
    </Box.Flex>
  );
};

export const ConnectedENSAccount = () => {
  return (
    <Box.Flex align="center" justify="center" css={styles.storybook}>
      <AccountConnectionInput
        networkName="Fuel"
        networkImage={<FuelLogo size={18} />}
        label="To"
        isConnecting={false}
        account={{
          address:
            "fuel14kz7u7jpd8txfe2vtgh5hxjx4wk7s03kq8hcl2k7slwe3yqh5sas974464",
          alias: "luizasfight.eth",
        }}
        onConnect={() => {}}
      />
    </Box.Flex>
  );
};

const styles = {
  storybook: cssObj({
    margin: "20px",
  }),
};
