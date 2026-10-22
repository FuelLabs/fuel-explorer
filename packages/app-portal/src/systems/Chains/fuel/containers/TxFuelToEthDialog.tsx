import { useAsset } from '~portal/systems/Assets/hooks/useAsset';
import {
  BridgeSteps,
  BridgeTxOverview,
} from '~portal/systems/Bridge/components';
import { shortAddress } from '~portal/systems/Core';
import { useOverlay } from '~portal/systems/Overlay';

import {
  Alert,
  type AlertProps,
  Button,
  Copyable,
  Dialog,
  VStack,
} from '@fuels/ui';
import { WarningToast } from 'app-commons';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { tv } from 'tailwind-variants';
import { useAssets } from '~portal/systems/Assets';
import { BridgeTxProgress } from '~portal/systems/Bridge/components/BridgeTxProgress/BridgeTxProgress';
import { useEthAccountConnection } from '../../eth';
import { useFuelAccountConnection, useTxFuelToEth } from '../hooks';

const WITHDRAW_DURATION_DAYS = 7;
const WITHDRAW_DURATION_MINUTES = WITHDRAW_DURATION_DAYS * 24 * 60;

interface ErrorAlert {
  errorMessage: string;
  alertColor: AlertProps['color'];
  alertIcon: string;
}

const RED_ICON = 'text-[var(--fuel-danger-text)]';

export function TxFuelToEthDialog() {
  const { t } = useTranslation();
  const classes = styles();
  const { asset: ethAsset } = useAsset();
  const { metadata } = useOverlay<{ txId: string }>();
  const { external } = useFuelAccountConnection();
  const {
    isConnected,
    isConnecting,
    handlers: ethHandlers,
  } = useEthAccountConnection();
  const {
    fromAddress,
    toAddress,
    steps,
    status,
    handlers,
    date,
    asset,
    amount,
    explorerLink,
    isLoadingTxResult,
    error,
  } = useTxFuelToEth({
    txId: metadata?.txId,
  });
  const { handlers: assetsHandlers } = useAssets();

  // show only if it's not ETH
  const shouldShowAddAssetToWallet =
    !!asset && !external && asset?.symbol !== ethAsset?.symbol;

  const { errorMessage, alertColor, alertIcon } = useMemo<ErrorAlert>(() => {
    if (!error) return { errorMessage: '', alertColor: 'red', alertIcon: '' };

    if (error instanceof WarningToast) {
      return {
        errorMessage: error.message,
        alertColor: undefined,
        alertIcon: '',
      };
    }

    // try to get details first to avoid showing big message from eth wallet
    const msg = 'details' in error ? (error.details as string) : error.message;
    return { errorMessage: msg, alertColor: 'red', alertIcon: RED_ICON };
  }, [error]);

  return (
    <VStack className="max-w-md">
      <div>
        <Dialog.Title className="mb-0 pr-10">
          {t('portal.bridge.withdraw')}
        </Dialog.Title>
        <Dialog.CloseButton aria-label={t('portal.dialog.close')} />
        <BridgeTxProgress
          initial={date}
          duration={WITHDRAW_DURATION_MINUTES}
          isDone={status?.isReceiveDone}
        />
      </div>
      <BridgeSteps steps={steps} />
      <BridgeTxOverview
        explorerLink={explorerLink}
        transactionId={shortAddress(metadata?.txId)}
        date={date}
        isDeposit={false}
        asset={asset}
        ethAsset={ethAsset}
        amount={amount}
        isLoading={isLoadingTxResult}
        from={fromAddress}
        to={toAddress}
        onAddAssetToWallet={
          shouldShowAddAssetToWallet
            ? () => assetsHandlers.addAssetToWallet(asset)
            : undefined
        }
      />
      {errorMessage && (
        <Alert color={alertColor} className="text-sm">
          <Copyable
            as="div"
            value={errorMessage}
            iconClassName={`mr-1 ${alertIcon}`}
          >
            <Alert.Text className="whitespace-pre-line">
              {errorMessage}
            </Alert.Text>
          </Copyable>
        </Alert>
      )}
      {(status?.isWaitingEthWalletApproval ||
        status?.isConfirmTransactionLoading) &&
        (isConnected ? (
          <Button
            className={classes.actionButton()}
            isLoading={status.isConfirmTransactionLoading}
            onClick={handlers.relayToEth}
          >
            {t('portal.dialog.confirm_transaction')}
          </Button>
        ) : (
          <Button
            className={classes.actionButton()}
            isLoading={isConnecting}
            onClick={ethHandlers.connect}
          >
            {t('portal.dialog.connect_eth_wallet')}
          </Button>
        ))}
    </VStack>
  );
}

const styles = tv({
  slots: {
    actionButton: 'w-full',
  },
});
