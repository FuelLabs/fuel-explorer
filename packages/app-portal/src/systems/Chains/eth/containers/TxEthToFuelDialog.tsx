import { useAsset } from '~portal/systems/Assets/hooks/useAsset';
import { shortAddress } from '~portal/systems/Core';
import { useOverlay } from '~portal/systems/Overlay';

import { Button, Dialog, VStack } from '@fuels/ui';
import { useFuelAsset } from 'app-commons';
import { useTranslation } from 'react-i18next';
import { tv } from 'tailwind-variants';
import { useAssets } from '~portal/systems/Assets/hooks';
import {
  BridgeSteps,
  BridgeTxOverview,
} from '~portal/systems/Bridge/components';
import { BridgeTxProgress } from '~portal/systems/Bridge/components/BridgeTxProgress/BridgeTxProgress';
import { useFuelAccountConnection } from '../../fuel';
import { DEPOSIT_DURATION_MINUTES, useTxEthToFuel } from '../hooks';

export function TxEthToFuelDialog() {
  const { t } = useTranslation();
  const classes = styles();
  const { asset: ethAsset } = useAsset();
  const { hasAsset, external } = useFuelAccountConnection();
  const { metadata } = useOverlay<{
    txId: string;
    messageSentEventNonce: BigInt;
  }>();
  const {
    steps,
    date,
    asset,
    handlers,
    shouldShowConfirmButton,
    status,
    isLoadingReceipts,
    amount,
    explorerLink,
    fromAddress,
    toAddress,
  } = useTxEthToFuel({
    id: metadata?.txId,
    messageSentEventNonce: metadata?.messageSentEventNonce,
  });
  const fuelAsset = useFuelAsset(asset);
  const { handlers: assetsHandlers } = useAssets();

  // show only if it's not ETH
  const shouldShowAddAssetToWallet =
    !!asset &&
    !external &&
    asset?.symbol !== ethAsset?.symbol &&
    !hasAsset(fuelAsset?.assetId || '');

  return (
    <VStack className="max-w-md">
      <div>
        <Dialog.Title className="mb-0 pr-10">
          {t('portal.bridge.deposit')}
        </Dialog.Title>
        <Dialog.CloseButton aria-label={t('portal.dialog.close')} />
        <BridgeTxProgress
          initial={date}
          duration={DEPOSIT_DURATION_MINUTES}
          isDone={status?.isReceiveDone}
        />
      </div>
      <BridgeSteps steps={steps} />
      <BridgeTxOverview
        transactionId={shortAddress(metadata?.txId)}
        date={date}
        isDeposit={true}
        asset={asset}
        isLoading={isLoadingReceipts}
        amount={amount}
        ethAsset={ethAsset}
        explorerLink={explorerLink}
        from={fromAddress}
        to={toAddress}
        onAddAssetToWallet={
          shouldShowAddAssetToWallet
            ? () => assetsHandlers.addAssetToWallet(asset)
            : undefined
        }
      />
      {shouldShowConfirmButton && (
        <Button
          className={classes.actionButton()}
          isLoading={status?.isConfirmTransactionLoading}
          onClick={handlers.relayMessageToFuel}
        >
          {t('portal.dialog.confirm_transaction')}
        </Button>
      )}
    </VStack>
  );
}

const styles = tv({
  slots: {
    actionButton: 'w-full',
  },
});
