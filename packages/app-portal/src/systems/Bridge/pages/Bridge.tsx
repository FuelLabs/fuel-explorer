import { motion, useAnimationControls } from 'framer-motion';
import { getAssetEth } from '~/systems/Assets/utils';
import {
  EthAccountConnection,
  FuelAccountConnection,
  isEthChain,
  isFuelChain,
  useFuelAccountConnection,
} from '~/systems/Chains';

import { InputAmount } from '@fuel-ui/react';
import { Alert, Box, Card, Link, Text, VStack } from '@fuels/ui';
import { IconAlertCircle } from '@tabler/icons-react';
import { tv } from 'tailwind-variants';
import { BridgeButton, BridgeTabs } from '../containers';
import { useBridge } from '../hooks';
import { useWithdrawDelay } from '../hooks/useWithdrawDelay';

export const Bridge = () => {
  const classes = styles();
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
      <Card.Body className={classes.cardBody()}>
        <BridgeTabs fromControls={fromControls} toControls={toControls} />
        <Box className={classes.divider()} />
        <VStack gap="6">
          {Boolean(fromNetwork && toNetwork) && (
            <VStack gap="2">
              <Text className={classes.textNetwork()}>Network</Text>
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
            </VStack>
          )}
          <VStack gap="2">
            <Text className={classes.textNetwork()}>Asset amount</Text>
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
          </VStack>
          {isFuelChain(toNetwork) && balance?.eq(0) && !!ethAssetAddress && (
            <Alert color="orange">
              <Alert.Icon>
                <IconAlertCircle size="md" />
              </Alert.Icon>
              <Alert.Text>
                You don&apos;t have any ETH on Fuel to pay for gas. We recommend
                you bridge some ETH before you bridge any other assets.
              </Alert.Text>
            </Alert>
          )}
          <BridgeButton />
          <Alert color="orange">
            <Alert.Icon>
              <IconAlertCircle size="md" />
            </Alert.Icon>
            <Alert.Text>
              Any assets deposited to Fuel can take up to{' '}
              {timeToWithdrawFormatted} to withdraw back to Ethereum. Learn more
              about our architecture and security in our&nbsp;
              <Link
                isExternal
                href="https://github.com/FuelLabs/fuel-bridge/blob/main/docs/ARCHITECTURE.md"
              >
                docs
              </Link>
            </Alert.Text>
          </Alert>
        </VStack>
      </Card.Body>
    </Card>
  );
};

export const styles = tv({
  slots: {
    cardBody: 'p-7',
    divider: ['h-1 bg-border mt-1 mb-5'],
    textNetwork: 'text-heading',
  },
});
