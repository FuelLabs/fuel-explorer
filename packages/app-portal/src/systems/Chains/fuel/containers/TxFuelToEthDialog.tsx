import { useAsset } from '~/systems/Assets/hooks/useAsset';
import { BridgeSteps, BridgeTxOverview } from '~/systems/Bridge';
import { shortAddress } from '~/systems/Core';
import { useOverlay } from '~/systems/Overlay';

import { Box, Button, Dialog, Text, VStack } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { useTxFuelToEth } from '../hooks';

export function TxFuelToEthDialog() {
  const classes = styles();
  const { asset: ethAsset } = useAsset();
  const { metadata } = useOverlay<{ txId: string }>();
  const {
    steps,
    status,
    handlers,
    date,
    asset,
    amount,
    explorerLink,
    isLoadingTxResult,
  } = useTxFuelToEth({
    txId: metadata.txId,
  });

  return (
    <>
      <Dialog.Close aria-label="Close Transaction Dialog" />
      <Dialog.Title>
        Withdrawal
        <Box className={classes.divider()} />
      </Dialog.Title>
      <VStack gap="3">
        <VStack gap="1">
          <Text>Status</Text>
          <BridgeSteps steps={steps} />
        </VStack>
        <Box className={classes.divider()} />
        <BridgeTxOverview
          explorerLink={explorerLink}
          transactionId={shortAddress(metadata.txId)}
          date={date}
          isDeposit={false}
          asset={asset}
          ethAsset={ethAsset}
          amount={amount}
          isLoading={isLoadingTxResult}
        />
      </VStack>
      {(status?.isWaitingEthWalletApproval ||
        status?.isConfirmTransactionLoading) && (
        <Button
          className={classes.actionButton()}
          isLoading={status.isConfirmTransactionLoading}
          onClick={handlers.relayToEth}
        >
          Confirm Transaction
        </Button>
      )}
    </>
  );
}

const styles = tv({
  slots: {
    divider: 'h-[2px] bg-border mt-2 w-full',
    actionButton: 'w-full',
  },
});
