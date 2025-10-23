import { useAsset } from '~portal/systems/Assets/hooks/useAsset';
import { shortAddress } from '~portal/systems/Core';
import { useOverlay } from '~portal/systems/Overlay';

import { Button, Dialog, HStack, VStack } from '@fuels/ui';
import { IconX } from '@tabler/icons-react';
import { useFuelAsset } from 'app-commons';
import { tv } from 'tailwind-variants';
import { useAssets } from '~portal/systems/Assets/hooks';
import {
  BridgeSteps,
  BridgeTxOverview,
} from '~portal/systems/Bridge/components';
import { BridgeTxProgress } from '~portal/systems/Bridge/components/BridgeTxProgress/BridgeTxProgress';
import { useFuelAccountConnection } from '../../fuel';
import { DEPOSIT_DURATION_MINUTES, useTxEthToFuel } from '../hooks';

export function TxEthToFuelDialog({ onClose }: { onClose: () => void }) {
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
    id: metadata.txId,
    messageSentEventNonce: metadata.messageSentEventNonce,
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
        <HStack justify="between" className="w-full">
          <Dialog.Title className="mb-0 justify-between">Deposit</Dialog.Title>
          <IconX
            className="cursor-pointer text-white"
            onClick={onClose}
            size={20}
          />
        </HStack>
        <BridgeTxProgress
          initial={date}
          duration={DEPOSIT_DURATION_MINUTES}
          isDone={status?.isReceiveDone}
        />
      </div>
      <BridgeSteps steps={steps} />
      <BridgeTxOverview
        transactionId={shortAddress(metadata.txId)}
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
          Confirm Transaction
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
