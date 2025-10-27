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
  HStack,
  VStack,
} from '@fuels/ui';
import { IconX } from '@tabler/icons-react';
import { WarningToast } from 'app-commons';
import clsx from 'clsx';
import { useMemo } from 'react';
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

export function TxFuelToEthDialog({ onClose }: { onClose: () => void }) {
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
    txId: metadata.txId,
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
        alertColor: 'orange',
        alertIcon: 'text-orange-11',
      };
    }

    // try to get details first to avoid showing big message from eth wallet
    const msg = 'details' in error ? (error.details as string) : error.message;
    return { errorMessage: msg, alertColor: 'red', alertIcon: 'text-red-11' };
  }, [error]);

  return (
    <VStack className="max-w-md">
      <div>
        <HStack justify="between" className="w-full">
          <Dialog.Title className="mb-0 justify-between">Withdraw</Dialog.Title>
          <IconX
            className="cursor-pointer text-white"
            onClick={onClose}
            size={20}
          />
        </HStack>
        <BridgeTxProgress
          initial={date}
          duration={WITHDRAW_DURATION_MINUTES}
          isDone={status?.isReceiveDone}
        />
      </div>
      <BridgeSteps steps={steps} />
      <BridgeTxOverview
        explorerLink={explorerLink}
        transactionId={shortAddress(metadata.txId)}
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
        <Alert variant="outline" color={alertColor} className="text-sm">
          <Copyable
            as="div"
            value={errorMessage}
            iconClassName={clsx('mr-1', alertIcon)}
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
            Confirm Transaction
          </Button>
        ) : (
          <Button
            className={classes.actionButton()}
            isLoading={isConnecting}
            onClick={ethHandlers.connect}
          >
            Connect Ethereum Wallet
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
