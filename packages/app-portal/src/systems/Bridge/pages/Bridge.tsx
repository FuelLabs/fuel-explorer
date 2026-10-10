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
  Box,
  Button,
  HStack,
  InputAmount,
  Link,
  LoadingBox,
  Tooltip,
  VStack,
  shortAddress,
} from '@fuels/ui';
import { IconAlertCircle, IconInfoCircle } from '@fuels/ui';
import { IconUserCircle } from '@fuels/ui';
import { AnimatedHeight } from '@fuels/ui';
import { Routes } from 'app-commons';
import { Address } from 'fuels';
import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { BridgeWithdrawWarning } from '../components/BridgeWithdrawWarning/BridgeWithdrawWarning';
import { BridgeButton } from '../containers/BridgeButton';
import { useBridge } from '../hooks';
import { useIsNonNativeConnector } from '../hooks/useIsNonNativeConnector';
import { useWithdrawDelay } from '../hooks/useWithdrawDelay';

export const Bridge = () => {
  const { t } = useTranslation();
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
    <motion.div key="eth" layout>
      <EthAccountConnection side={isEthFrom ? 'from' : 'to'} />
    </motion.div>,
    <motion.div key="fuel" layout>
      <FuelAccountConnection side={isFuelTo ? 'to' : 'from'} />
    </motion.div>,
  ];

  function getItemsOrder() {
    return isEthFrom ? items : items.reverse();
  }

  return (
    <VStack gap="4">
      {fromNetwork && toNetwork ? (
        <>
          <div>
            <VStack gap="2">
              <LayoutGroup>{getItemsOrder()}</LayoutGroup>
              <AnimatedHeight enabled={isEthFrom && !!toCustomAddress}>
                <Alert size="1">
                  <Alert.Icon>
                    <IconInfoCircle size={16} />
                  </Alert.Icon>

                  <Alert.Text>
                    {t('portal.bridge.custom_address_notice')} <br />
                    <b className="font-mono">
                      {shortAddress(toCustomAddress ?? '', 22, 20)}
                    </b>
                  </Alert.Text>
                </Alert>
              </AnimatedHeight>
            </VStack>
            <AnimatedHeight enabled={isNonNative === true}>
              <div className="pt-2">
                <Alert size="1">
                  <Alert.Icon>
                    <IconInfoCircle size={16} />
                  </Alert.Icon>
                  <Alert.Text>
                    <Trans
                      i18nKey="portal.bridge.non_native_notice"
                      components={{ strong: <b /> }}
                    />
                    <Box className="mt-2">
                      {t('portal.bridge.manage_assets_in')}{' '}
                      <Button
                        as="a"
                        href={Routes.account(account || '', 'transactions')}
                        size="1"
                        variant="link"
                        rightIcon={IconUserCircle}
                        className="mt-0 ml-0.5"
                        aria-label={t('portal.bridge.transaction_history')}
                      >
                        {t('portal.bridge.my_account')}
                      </Button>
                    </Box>
                  </Alert.Text>
                </Alert>
              </div>
            </AnimatedHeight>
          </div>
          <VStack gap="2">
            <InputAmount balance={assetBalance} formatOpts={assetFormat}>
              <InputAmount.Field
                disabled={!ethAddress && !fuelAddress}
                aria-label={t('portal.bridge.amount_label')}
                value={assetAmount}
                onChange={(val) =>
                  handlers.changeAssetAmount({
                    assetAmount: val || undefined,
                  })
                }
                placeholder="0.00"
              >
                <InputAmount.Slot className="flex flex-row justify-end gap-2 sm:!flex sm:!flex-row sm:!flex-nowrap sm:!justify-end mobile:!gap-1 mobile:!ml-1">
                  {assetBalance?.gt(0) && asset?.symbol === 'ETH' ? (
                    <Tooltip content={t('portal.bridge.max_tooltip')}>
                      <InputAmount.ButtonMaxBalance className="mobile:px-1" />
                    </Tooltip>
                  ) : (
                    <InputAmount.ButtonMaxBalance className="mobile:!text-xs mobile:px-1" />
                  )}
                  <InputAmount.CoinSelector
                    variant="ghost"
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
                    className="fuel-label"
                    label={t('portal.bridge.allowance')}
                  />
                )}
              </HStack>
            </InputAmount>

            <BridgeWithdrawWarning />

            <AnimatedHeight
              enabled={
                isFuelChain(toNetwork) && !!balance?.eq(0) && !!ethAssetAddress
              }
            >
              <Alert className="!border-l-[var(--fuel-warning)]">
                <Alert.Icon className="!text-[var(--fuel-warning-text)]">
                  <IconAlertCircle size={16} />
                </Alert.Icon>
                <Alert.Text>{t('portal.bridge.no_gas_warning')}</Alert.Text>
              </Alert>
            </AnimatedHeight>
          </VStack>
        </>
      ) : (
        <>
          <LoadingBox className="w-full h-[152px]" />
          <LoadingBox className="w-full h-[86px]" />
        </>
      )}
      <BridgeButton />
      <Alert>
        <Alert.Icon>
          <IconInfoCircle size={16} />
        </Alert.Icon>
        <Alert.Text>
          {t('portal.bridge.withdraw_delay', { time: timeToWithdrawFormatted })}{' '}
          <Link
            target="_blank"
            href="https://docs.fuel.network/docs/fuel-book/the-architecture/security-on-fuel/"
            rel="noreferrer"
            isExternal
          >
            {t('footer.docs')}
          </Link>
        </Alert.Text>
      </Alert>
    </VStack>
  );
};
