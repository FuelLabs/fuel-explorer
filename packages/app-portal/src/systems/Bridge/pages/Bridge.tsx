import { LayoutGroup, motion } from 'framer-motion';
import { getAssetEth } from '~portal/systems/Assets/utils';
import {
  EthAccountConnection,
  FuelAccountConnection,
  isEthChain,
  isFuelChain,
  useFuelAccountConnection,
} from '~portal/systems/Chains';

import {
  Alert,
  Card,
  HStack,
  InputAmount,
  Link,
  LoadingBox,
  Text,
  VStack,
} from '@fuels/ui';
import { IconAlertCircle } from '@tabler/icons-react';
import { tv } from 'tailwind-variants';
import { BridgeButton } from '../containers/BridgeButton';
import { BridgeTabs } from '../containers/BridgeTabs';
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
  const { timeToWithdrawFormatted } = useWithdrawDelay();
  const ethAssetAddress = asset ? getAssetEth(asset)?.address : undefined;
  const isEthFrom = isEthChain(fromNetwork);
  const isFuelTo = isFuelChain(toNetwork);

  const items = [
    <motion.div key="eth" layout>
      <EthAccountConnection label={isEthFrom ? 'From' : 'To'} />
    </motion.div>,
    <motion.div key="fuel" layout>
      <FuelAccountConnection label={isFuelTo ? 'To' : 'From'} />
    </motion.div>,
  ];

  function getItemsOrder() {
    return isEthFrom ? items : items.reverse();
  }

  return (
    <VStack gap="4">
      <BridgeTabs />
      {fromNetwork && toNetwork ? (
        <Card>
          <Card.Body as={VStack} className="gap-2">
            <HStack className="items-center justify-between">
              <Text className={classes.textNetwork()}>Network</Text>
            </HStack>
            <LayoutGroup>{getItemsOrder()}</LayoutGroup>
          </Card.Body>
        </Card>
      ) : (
        <LoadingBox className="w-full h-[201px]" />
      )}
      <Card>
        <Card.Body as={VStack} className="gap-2">
          <Text className={classes.textNetwork()}>Asset amount</Text>

          <InputAmount balance={assetBalance}>
            <InputAmount.Field
              disabled={!ethAddress && !fuelAddress}
              value={assetAmount}
              color="green"
              onChange={(val) =>
                handlers.changeAssetAmount({ assetAmount: val || undefined })
              }
              placeholder="0.00"
            >
              <InputAmount.Slot className="flex flex-row flex-1 basis-1/2 justify-end">
                <InputAmount.ButtonMaxBalance />
                <InputAmount.CoinSelector
                  asset={{
                    name: asset?.symbol,
                    imageUrl: asset?.icon || '',
                    address: ethAssetAddress,
                  }}
                  onClick={handlers.openAssetsDialog}
                />
              </InputAmount.Slot>
            </InputAmount.Field>

            <InputAmount.Balance />
          </InputAmount>

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
        </Card.Body>
      </Card>
      <BridgeButton />
      <Alert color="orange">
        <Alert.Icon>
          <IconAlertCircle size="md" />
        </Alert.Icon>
        <Alert.Text>
          Any assets deposited to Fuel can take up to {timeToWithdrawFormatted}{' '}
          to withdraw back to Ethereum. Learn more about our architecture and
          security in our&nbsp;
          <Link
            target="_blank"
            href="https://github.com/FuelLabs/fuel-bridge/blob/main/docs/ARCHITECTURE.md"
            rel="noreferrer"
            isExternal
          >
            docs
          </Link>
        </Alert.Text>
      </Alert>
    </VStack>
  );
};

export const styles = tv({
  slots: {
    card: 'p-0',
    cardBody: 'p-7',
    textNetwork: 'text-heading',
  },
});
