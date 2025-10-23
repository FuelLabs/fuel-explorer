import { LayoutGroup, motion } from 'framer-motion';

import {
  EthAccountConnection,
  FuelAccountConnection,
  isEthChain,
  isFuelChain,
  useFuelAccountConnection,
} from '~portal/systems/Chains';

import {
  Alert,
  AnimatedHeight,
  Box,
  Button,
  Card,
  HStack,
  InputAmount,
  Link,
  LoadingBox,
  Text,
  Tooltip,
  VStack,
  shortAddress,
} from '@fuels/ui';
import { IconAlertCircle, IconInfoCircleFilled } from '@tabler/icons-react';
import { IconUserCircle } from '@tabler/icons-react';
import { Routes } from 'app-commons';
import { Address } from 'fuels';
import { useEffect } from 'react';
import { tv } from 'tailwind-variants';
import { BridgeWithdrawWarning } from '../components/BridgeWithdrawWarning/BridgeWithdrawWarning';
import { BridgeButton } from '../containers/BridgeButton';
import { BridgeTabs } from '../containers/BridgeTabs';
import { useBridge } from '../hooks';
import { useIsNonNativeConnector } from '../hooks/useIsNonNativeConnector';
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
    assetFormat,
    handlers,
    allowance,
    ethAssetAddress,
    toCustomAddress,
  } = useBridge();
  const { balance, account } = useFuelAccountConnection();
  const { timeToWithdrawFormatted } = useWithdrawDelay();

  const isEthFrom = isEthChain(fromNetwork);
  const isFuelTo = isFuelChain(toNetwork);

  const { isNonNative } = useIsNonNativeConnector();

  useEffect(() => {
    async function handleKeyPress(e: KeyboardEvent) {
      if (e.metaKey && e.shiftKey && e.key.toLowerCase() === 'e') {
        const pastedAddress = await navigator.clipboard.readText();
        const address = Address.fromDynamicInput(pastedAddress);
        const customAddress = address.toString();
        handlers.changeToAddress({ toCustomAddress: customAddress });
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handlers]);

  const items = [
    <motion.div key="eth" className="mt-2" layout>
      <EthAccountConnection label={isEthFrom ? 'From' : 'To'} />
    </motion.div>,
    <motion.div key="fuel" className="mt-2" layout>
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
        <>
          <Card>
            <Card.Body>
              <Text className={classes.textNetwork()}>Network</Text>
              <VStack gap="4">
                <LayoutGroup>{getItemsOrder()}</LayoutGroup>
                {isEthFrom && toCustomAddress && (
                  <Alert
                    variant="soft"
                    color="blue"
                    size="1"
                    className="border border-blue-6"
                  >
                    <Alert.Icon>
                      <IconInfoCircleFilled size="md" />
                    </Alert.Icon>

                    <Alert.Text>
                      Sending to a custom Fuel account: <br />
                      <b>{shortAddress(toCustomAddress, 22, 20)}</b>
                    </Alert.Text>
                  </Alert>
                )}
              </VStack>
              <AnimatedHeight enabled={isNonNative === true}>
                <div className="pt-2">
                  <Alert
                    variant="soft"
                    color="blue"
                    size="1"
                    className="border border-blue-6"
                  >
                    <Alert.Icon>
                      <IconInfoCircleFilled size="md" />
                    </Alert.Icon>
                    <Alert.Text>
                      Please note: EVM/SVM addresses will differ from your{' '}
                      <b>Fuel predicate address</b>. This is expected behavior.
                      <Box className="mt-2">
                        You can manage your assets in{' '}
                        <Button
                          as="a"
                          href={Routes.account(account || '', 'transactions')}
                          size="1"
                          color="blue"
                          variant="link"
                          rightIcon={IconUserCircle}
                          className="rounded-md mt-0 ml-0.5"
                          aria-label="Transaction History"
                        >
                          My Account
                        </Button>
                      </Box>
                    </Alert.Text>
                  </Alert>
                </div>
              </AnimatedHeight>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body as={VStack} className="gap-2">
              <Text className={classes.textNetwork()}>Asset amount</Text>

              <InputAmount balance={assetBalance} formatOpts={assetFormat}>
                <InputAmount.Field
                  disabled={!ethAddress && !fuelAddress}
                  value={assetAmount}
                  color="green"
                  onChange={(val) =>
                    handlers.changeAssetAmount({
                      assetAmount: val || undefined,
                    })
                  }
                  placeholder="0.00"
                >
                  <InputAmount.Slot className="flex flex-row justify-end gap-2 sm:!flex sm:!flex-row sm:!flex-nowrap sm:!justify-end mobile:!gap-1 mobile:!ml-1">
                    {assetBalance?.gt(0) && asset?.symbol === 'ETH' ? (
                      <Tooltip content={<>Max = balance - fee</>}>
                        <InputAmount.ButtonMaxBalance className="mobile:px-1" />
                      </Tooltip>
                    ) : (
                      <InputAmount.ButtonMaxBalance className="mobile:!text-xs mobile:px-1" />
                    )}
                    <InputAmount.CoinSelector
                      className="mobile:!text-xs mobile:!px-2 mobile:!min-w-0"
                      asset={{
                        name: asset?.symbol,
                        imageUrl: asset?.icon || '',
                        address: ethAssetAddress,
                      }}
                      onClick={handlers.openAssetsDialog}
                    />
                  </InputAmount.Slot>
                </InputAmount.Field>

                <HStack gap="2" justify="between">
                  <InputAmount.Balance balance={assetBalance} />
                  {isEthFrom && !!ethAssetAddress && (
                    <InputAmount.Balance
                      balance={allowance.tokensAllowance}
                      color="blue"
                      label={'Allowance'}
                    />
                  )}
                </HStack>
              </InputAmount>

              <BridgeWithdrawWarning />

              {isFuelChain(toNetwork) &&
                balance?.eq(0) &&
                !!ethAssetAddress && (
                  <Alert color="orange">
                    <Alert.Icon>
                      <IconAlertCircle size="md" />
                    </Alert.Icon>
                    <Alert.Text>
                      You don&apos;t have any ETH on Fuel to pay for gas. We
                      recommend you bridge some ETH before you bridge any other
                      assets.
                    </Alert.Text>
                  </Alert>
                )}
            </Card.Body>
          </Card>
        </>
      ) : (
        <>
          <LoadingBox className="w-full h-[216px]" />
          <LoadingBox className="w-full h-[151px]" />
        </>
      )}
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
            href="https://docs.fuel.network/docs/fuel-book/the-architecture/security-on-fuel/"
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
