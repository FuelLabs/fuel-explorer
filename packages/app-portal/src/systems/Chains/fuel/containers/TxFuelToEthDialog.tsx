import { useAsset } from '~portal/systems/Assets/hooks/useAsset';
import {
  BridgeSteps,
  BridgeTxOverview,
} from '~portal/systems/Bridge/components';
import { shortAddress } from '~portal/systems/Core';
import { useOverlay } from '~portal/systems/Overlay';

import { Button, Dialog, VStack } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { useEthAccountConnection } from '../../eth';
import { useTxFuelToEth } from '../hooks';

export function TxFuelToEthDialog() {
  const classes = styles();
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
    <VStack className="max-w-sm">
      <Dialog.Title className="mb-0">Withdraw</Dialog.Title>
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
      />
      {(status?.isWaitingEthWalletApproval ||
        status?.isConfirmTransactionLoading) && (
        <>
          {isConnected ? (
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
          )}
        </>
      )}
    </VStack>
  );
}

const styles = tv({
  slots: {
    actionButton: 'w-full',
  },
});
