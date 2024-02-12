import { cssObj } from '@fuel-ui/css';
import { Box, Button, Dialog, Text } from '@fuel-ui/react';
import { useAsset } from '~/systems/Assets/hooks/useAsset';
import { BridgeSteps, BridgeTxOverview } from '~/systems/Bridge';
import { shortAddress } from '~/systems/Core';
import { useOverlay } from '~/systems/Overlay';

import { useEthAccountConnection } from '../../eth';
import { useTxFuelToEth } from '../hooks';

export function TxFuelToEthDialog() {
  const { asset: ethAsset } = useAsset();
  const { metadata } = useOverlay<{ txId: string }>();
  const {
    isConnected,
    isConnecting,
    handlers: ethHandlers,
  } = useEthAccountConnection();
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
      <Dialog.Heading>
        Withdrawal
        <Box css={styles.divider} />
      </Dialog.Heading>
      <Dialog.Description>
        <Box.Stack gap="$2">
          <Text color="intentsBase12">Status</Text>
          <BridgeSteps steps={steps} />
          <Box css={styles.border} />
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
        </Box.Stack>
      </Dialog.Description>
      {(status?.isWaitingEthWalletApproval ||
        status?.isConfirmTransactionLoading) && (
        <Dialog.Footer>
          {isConnected ? (
            <Button
              intent="primary"
              css={styles.actionButton}
              isLoading={status.isConfirmTransactionLoading}
              onClick={handlers.relayToEth}
            >
              Confirm Transaction
            </Button>
          ) : (
            <Button
              intent="primary"
              css={styles.actionButton}
              isLoading={isConnecting}
              onClick={ethHandlers.connect}
            >
              Connect Ethereum Wallet
            </Button>
          )}
        </Dialog.Footer>
      )}
    </>
  );
}

const styles = {
  border: cssObj({
    my: '$4',
    borderBottom: '1px solid $border',
  }),
  actionButton: cssObj({
    width: '$full',
  }),
  divider: cssObj({
    h: '1px',
    bg: '$border',
    mt: '$5',
  }),
};
