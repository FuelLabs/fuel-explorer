import { useAsset } from '~portal/systems/Assets/hooks/useAsset';
import { shortAddress } from '~portal/systems/Core';
import { useOverlay } from '~portal/systems/Overlay';

import { Alert, Button, Dialog, VStack } from '@fuels/ui';
import { IconAlertCircle } from '@tabler/icons-react';
import { tv } from 'tailwind-variants';
import {
  BridgeSteps,
  BridgeTxOverview,
} from '~portal/systems/Bridge/components';
import { useTxEthToFuel } from '../hooks';

export function TxEthToFuelDialog() {
  const classes = styles();
  const { asset: ethAsset } = useAsset();
  const { metadata } = useOverlay<{ txId: string }>();
  const {
    autoClose,
    steps,
    date,
    asset,
    handlers,
    shouldShowConfirmButton,
    status,
    isLoadingReceipts,
    amount,
    explorerLink,
  } = useTxEthToFuel({
    id: metadata.txId,
  });

  return (
    <VStack className="max-w-sm">
      <Dialog.Title className="mb-0 justify-between">Deposit</Dialog.Title>
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
      {autoClose ? (
        <Alert color="orange">
          <Alert.Icon>
            <IconAlertCircle size="md" />
          </Alert.Icon>
          <Alert.Text>
            This page will automatically close once the <b>Deposit</b> is
            complete.
          </Alert.Text>
        </Alert>
      ) : null}
    </VStack>
  );
}

const styles = tv({
  slots: {
    actionButton: 'w-full',
  },
});
