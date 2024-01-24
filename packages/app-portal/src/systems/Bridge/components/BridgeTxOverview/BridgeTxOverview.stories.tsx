import { cssObj } from '@fuel-ui/css';
import { Box } from '@fuel-ui/react';
import { bn } from 'fuels';

import ethImage from '../../../../../public/eth-logo.svg';

import { BridgeTxOverview } from './BridgeTxOverview';

export default {
  component: BridgeTxOverview,
  title: 'BridgeTxOverview',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Usage = () => {
  return (
    <Box.Flex align="center" justify="center" css={styles.storybook}>
      <BridgeTxOverview
        transactionId={bn(1234567876543456)}
        date={new Date()}
        isDeposit={true}
        asset={{ imageUrl: ethImage, assetSymbol: 'ETH', assetAmount: '1.500' }}
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
        asset={{ imageUrl: ethImage, assetSymbol: 'ETH', assetAmount: '1.500' }}
      />
    </Box.Flex>
  );
};

const styles = {
  storybook: cssObj({
    margin: '20px',
    width: '348px',
  }),
};
