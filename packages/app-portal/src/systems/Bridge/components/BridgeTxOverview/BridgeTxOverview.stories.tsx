import { cssObj } from "@fuel-ui/css";
import { Box } from "@fuel-ui/react";
import assetList from "@fuels/assets";
import { bn } from "fuels";

import { BridgeTxOverview } from "./BridgeTxOverview";

export default {
  component: BridgeTxOverview,
  title: "BridgeTxOverview",
  parameters: {
    layout: "fullscreen",
  },
};

export const Usage = () => {
  return (
    <Box.Flex align="center" justify="center" css={styles.storybook}>
      <BridgeTxOverview
        transactionId={bn(1234567876543456)}
        date={new Date()}
        isDeposit={true}
        amount="1.500"
        asset={assetList[0]}
        ethAsset={assetList[0]}
      />
    </Box.Flex>
  );
};

export const Withdrawal = () => {
  return (
    <Box.Flex align="center" justify="center" css={styles.storybook}>
      <BridgeTxOverview
        transactionId={bn(1234567876543456)}
        date={new Date()}
        asset={assetList[0]}
        amount="1.500"
        ethAsset={assetList[0]}
      />
    </Box.Flex>
  );
};

export const Loading = () => {
  return (
    <Box.Flex align="center" justify="center" css={styles.storybook}>
      <BridgeTxOverview
        isLoading
        transactionId={bn(1234567876543456)}
        date={new Date()}
        isDeposit={true}
        amount="1.500"
        asset={assetList[0]}
        ethAsset={assetList[0]}
      />
    </Box.Flex>
  );
};

const styles = {
  storybook: cssObj({
    margin: "20px",
    width: "348px",
  }),
};
