import { cssObj } from '@fuel-ui/css';
import { Alert, Box, Card, InputAmount, Link, Text } from '@fuel-ui/react';
import { motion, useAnimationControls } from 'framer-motion';
import { getAssetEth } from '~portal/systems/Assets/utils';
import {
  EthAccountConnection,
  FuelAccountConnection,
  isEthChain,
  isFuelChain,
  useFuelAccountConnection,
} from '~portal/systems/Chains';

import { BridgeButton, BridgeTabs } from '../containers';
import { useBridge } from '../hooks';
import { useWithdrawDelay } from '../hooks/useWithdrawDelay';

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
  const { balance } = useFuelAccountConnection();

  const fromControls = useAnimationControls();
  const toControls = useAnimationControls();
  const { timeToWithdrawFormatted } = useWithdrawDelay();

  if (!fromNetwork || !toNetwork) return null;

  const ethAssetAddress = asset ? getAssetEth(asset)?.address : undefined;

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
            <Text color="intentsBase12">Asset amount</Text>
            <InputAmount
              isDisabled={!ethAddress && !fuelAddress}
              balance={assetBalance}
              value={assetAmount}
              asset={{
                name: asset?.symbol,
                imageUrl: asset?.icon || '',
                address: ethAssetAddress,
              }}
              onClickAsset={handlers.openAssetsDialog}
              onChange={(val) =>
                handlers.changeAssetAmount({ assetAmount: val || undefined })
              }
            />
          </Box.Stack>
          {isFuelChain(toNetwork) && balance?.eq(0) && !!ethAssetAddress && (
            <Alert status="warning">
              <Alert.Description>
                You don&apos;t have any ETH on Fuel to pay for gas. We recommend
                you bridge some ETH before you bridge any other assets.
              </Alert.Description>
            </Alert>
          )}
          <BridgeButton />
          <Alert status="warning">
            <Alert.Description>
              Any assets deposited to Fuel can take up to{' '}
              {timeToWithdrawFormatted} to withdraw back to Ethereum. Learn more
              about our architecture and security in our&nbsp;
              <Link
                isExternal
                href="https://github.com/FuelLabs/fuel-bridge/blob/main/docs/ARCHITECTURE.md"
              >
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
