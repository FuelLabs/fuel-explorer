import { cssObj } from '@fuel-ui/css';
import { Card, Box, Text, InputAmount, Alert, Link } from '@fuel-ui/react';
import { motion, useAnimationControls } from 'framer-motion';
import {
  EthAccountConnection,
  FuelAccountConnection,
  isEthChain,
  isFuelChain,
} from '~/systems/Chains';

import { BridgeButton, BridgeTabs } from '../containers';
import { useBridge } from '../hooks';

export const Bridge = () => {
  const {
    ethAddress,
    fuelAddress,
    fromNetwork,
    toNetwork,
    assetAmount,
    assetBalance,
    asset,
    handlers,
  } = useBridge();

  const fromControls = useAnimationControls();
  const toControls = useAnimationControls();

  if (!fromNetwork || !toNetwork) return null;

  return (
    <Card>
      <Card.Body css={styles.cardBody}>
        <BridgeTabs fromControls={fromControls} toControls={toControls} />
        <Box css={styles.divider} />
        <Box.Stack gap="$6">
          {Boolean(fromNetwork && toNetwork) && (
            <Box.Stack gap="$2">
              <Text color="intentsBase12">Network</Text>
              <motion.div animate={fromControls}>
                {isEthChain(fromNetwork) && (
                  <EthAccountConnection label="From" />
                )}
                {isFuelChain(fromNetwork) && (
                  <FuelAccountConnection label="From" />
                )}
              </motion.div>
              <motion.div animate={toControls}>
                {isEthChain(toNetwork) && <EthAccountConnection label="To" />}
                {isFuelChain(toNetwork) && <FuelAccountConnection label="To" />}
              </motion.div>
            </Box.Stack>
          )}
          <Box.Stack gap="$2">
            <Text color="intentsBase12">Asset</Text>
            <InputAmount
              isDisabled={!ethAddress && !fuelAddress}
              balance={assetBalance}
              value={assetAmount}
              asset={{
                name: asset?.symbol,
                imageUrl: asset?.image,
              }}
              onChange={(val) =>
                handlers.changeAssetAmount({ assetAmount: val || undefined })
              }
              // TODO: enable this when we include erc-20 deposit
              // onClickAsset={handlers.openAssetsDialog}
            />
          </Box.Stack>
          <BridgeButton />
          <Alert status="warning">
            <Alert.Description>
              Any assets deposited to Fuel takes 7 days to withdraw back to
              Ethereum. Learn more about our architecture and security in
              our&nbsp;
              <Link isExternal href="https://fuel.sh/">
                docs
              </Link>
            </Alert.Description>
          </Alert>
        </Box.Stack>
      </Card.Body>
    </Card>
  );
};

const styles = {
  cardBody: cssObj({
    p: '$7',
  }),
  divider: cssObj({
    h: '1px',
    bg: '$border',
    mt: '$1',
    mb: '$5',
  }),
};
