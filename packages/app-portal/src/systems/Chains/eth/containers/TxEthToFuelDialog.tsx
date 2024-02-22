import { useAsset } from '~portal/systems/Assets/hooks/useAsset';
import { shortAddress } from '~portal/systems/Core';
import { useOverlay } from '~portal/systems/Overlay';

import { Box, Button, Dialog, Text, VStack } from '@fuels/ui';
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
    <>
      <Dialog.Close aria-label="Close Transaction Dialog" />
      <Dialog.Title>
        Deposit
        <Box className={classes.divider()} />
      </Dialog.Title>
      <VStack gap="3">
        <VStack gap="1">
          <Text>Status</Text>
          <BridgeSteps steps={steps} />
        </VStack>
        <Box className={classes.divider()} />
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
      </VStack>
    </>
  );
}

const styles = tv({
  slots: {
    divider: 'h-[2px] bg-border mt-2 w-full',
    actionButton: 'w-full',
  },
});
