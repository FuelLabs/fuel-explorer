import type { Asset } from 'fuels';
import { DateTime } from 'fuels';
import { useMemo } from 'react';
import { Services, store } from '~portal/store';
import { useAssets } from '~portal/systems/Assets';
import { useExplorerLink } from '~portal/systems/Bridge/hooks/useExplorerLink';
import type { BridgeTxsMachineState } from '~portal/systems/Bridge/machines';

import { useEthAccountConnection } from '../../eth/hooks';
import type { TxFuelToEthMachineState } from '../machines';
import { distanceToNow } from '../utils';

import { parseFuelAddressToEth } from '../../eth';
import { getAssetAmountWithdrawed } from '../utils/transaction';
import { useFuelAccountConnection } from './useFuelAccountConnection';

const bridgeTxsSelectors = {
  txFuelToEth: (txId?: string) => (state: BridgeTxsMachineState) => {
    if (!txId) return undefined;

    const machine = state.context?.fuelToEthTxRefs?.[txId]?.getSnapshot();

    return machine;
  },
};

const txFuelToEthSelectors = {
  status: (state: TxFuelToEthMachineState) => {
    const isSubmitToBridgeLoading = state.hasTag('isSubmitToBridgeLoading');
    const isSubmitToBridgeSelected = state.hasTag('isSubmitToBridgeSelected');
    const isSubmitToBridgeDone = state.hasTag('isSubmitToBridgeDone');
    const isSettlementLoading = state.hasTag('isSettlementLoading');
    const isSettlementSelected = state.hasTag('isSettlementSelected');
    const isSettlementDone = state.hasTag('isSettlementDone');
    const isConfirmTransactionSelected = state.hasTag(
      'isConfirmTransactionSelected',
    );
    const isConfirmTransactionLoading = state.hasTag(
      'isConfirmTransactionLoading',
    );
    const isConfirmTransactionDone = state.hasTag('isConfirmTransactionDone');
    const isWaitingEthWalletApproval = state.hasTag(
      'isWaitingEthWalletApproval',
    );
    const isReceiveLoading = state.hasTag('isReceiveLoading');
    const isReceiveSelected = state.hasTag('isReceiveSelected');
    const isReceiveDone = state.hasTag('isReceiveDone');

    return {
      isSubmitToBridgeLoading,
      isSubmitToBridgeSelected,
      isSubmitToBridgeDone,
      isSettlementLoading,
      isSettlementSelected,
      isSettlementDone,
      isConfirmTransactionSelected,
      isConfirmTransactionLoading,
      isConfirmTransactionDone,
      isWaitingEthWalletApproval,
      isReceiveLoading,
      isReceiveSelected,
      isReceiveDone,
    };
  },
  steps: (state: TxFuelToEthMachineState) => {
    const status = txFuelToEthSelectors.status(state);
    const estimatedTimeRemaining =
      txFuelToEthSelectors.estimatedTimeRemaining(state);

    function getConfirmStatusText() {
      if (status.isWaitingEthWalletApproval) return 'Action required';
      if (status.isConfirmTransactionDone) return 'Done!';
      return 'Action';
    }

    function getSettlementStatusText() {
      if (status.isSettlementDone) return 'Done!';
      if (estimatedTimeRemaining) return `~${estimatedTimeRemaining} left`;
      return 'Waiting';
    }

    const steps = [
      {
        name: 'Submit to bridge',
        // TODO: put correct time left '~XX minutes left', how?
        status: status.isSubmitToBridgeDone ? 'Done!' : 'Waiting',
        isLoading: status.isSubmitToBridgeLoading,
        isSelected: status.isSubmitToBridgeSelected,
        isDone: status.isSubmitToBridgeDone,
      },
      {
        name: 'Settlement',
        status: getSettlementStatusText(),
        isLoading: status.isSettlementLoading,
        isDone: status.isSettlementDone,
        isSelected: status.isSettlementSelected,
      },
      {
        name: 'Confirm transaction',
        status: getConfirmStatusText(),
        isLoading: status.isConfirmTransactionLoading,
        isDone: status.isConfirmTransactionDone,
        isSelected: status.isConfirmTransactionSelected,
      },
      {
        name: 'Receive on Ethereum',
        status: status.isReceiveDone ? 'Done!' : 'Automatic',
        isLoading: status.isReceiveLoading,
        isDone: status.isReceiveDone,
        isSelected: status.isReceiveSelected,
      },
    ];
    return steps;
  },
  fuelTxResult: (state: TxFuelToEthMachineState) => {
    const fuelTxResult = state.context.fuelTxResult;
    return fuelTxResult;
  },
  assetAmount: (assets: Asset[]) => (state: TxFuelToEthMachineState) => {
    const fuelTxResult = state.context.fuelTxResult;

    const assetAmount = getAssetAmountWithdrawed({
      txResult: fuelTxResult,
      assets,
    });

    return assetAmount;
  },
  isLoadingTxResult: (state: TxFuelToEthMachineState) => {
    return state.matches('submittingToBridge.waitingFuelTxResult');
  },
  estimatedTimeRemaining: (state: TxFuelToEthMachineState) => {
    const estimatedFinishDate = state.context.estimatedFinishDate;
    if (!estimatedFinishDate) return undefined;

    return distanceToNow(estimatedFinishDate);
  },
  selectFromToAddresses: (state: TxFuelToEthMachineState) => {
    return {
      sender: state.context.sender?.toString(),
      recipient: parseFuelAddressToEth(state.context.recipient),
    };
  },
  error: (state: TxFuelToEthMachineState) => {
    return state.context.error;
  },
};

export function useTxFuelToEth({ txId }: { txId: string }) {
  const { walletClient: ethWalletClient } = useEthAccountConnection();
  const { provider: fuelProvider } = useFuelAccountConnection();
  const { assets } = useAssets();
  const { href: explorerLink } = useExplorerLink({
    network: 'fuel',
    providerUrl: fuelProvider?.url,
    id: txId,
  });

  const txFuelToEthState = store.useSelector(
    Services.bridgeTxs,
    bridgeTxsSelectors.txFuelToEth(txId),
  );

  const {
    steps,
    status,
    fuelTxResult,
    asset,
    amount,
    isLoadingTxResult,
    estimatedTimeRemaining,
    fromAddress,
    toAddress,
    error,
  } = useMemo(() => {
    if (!txFuelToEthState) return {};

    const error = txFuelToEthSelectors.error(txFuelToEthState);
    const steps = txFuelToEthSelectors.steps(txFuelToEthState);
    const status = txFuelToEthSelectors.status(txFuelToEthState);
    const fuelTxResult = txFuelToEthSelectors.fuelTxResult(txFuelToEthState);
    const assetAmount =
      txFuelToEthSelectors.assetAmount(assets)(txFuelToEthState);
    const isLoadingTxResult =
      txFuelToEthSelectors.isLoadingTxResult(txFuelToEthState);
    const estimatedTimeRemaining =
      txFuelToEthSelectors.estimatedTimeRemaining(txFuelToEthState);
    const fromToAddresses =
      txFuelToEthSelectors.selectFromToAddresses(txFuelToEthState);

    return {
      steps,
      status,
      fuelTxResult,
      asset: assetAmount?.asset,
      amount: assetAmount?.amount,
      isLoadingTxResult,
      estimatedTimeRemaining,
      fromAddress: fromToAddresses?.sender,
      toAddress: fromToAddresses?.recipient,
      error,
    };
  }, [txFuelToEthState, assets]);

  // TODO: remove this conversion when sdk already returns the date in unix format
  const date = useMemo(
    () =>
      fuelTxResult?.time
        ? new Date(DateTime.fromTai64(fuelTxResult?.time).toUnixMilliseconds())
        : undefined,
    [fuelTxResult?.time],
  );

  function relayToEth() {
    if (!ethWalletClient) return;

    store.relayTxFuelToEth({
      input: {
        ethWalletClient,
        assets,
      },
      fuelTxId: txId,
    });
  }

  return {
    handlers: {
      close: store.closeOverlay,
      relayToEth,
      openTxFuelToEth: store.openTxFuelToEth,
    },
    fromAddress,
    toAddress,
    fuelTxResult,
    date,
    asset,
    amount,
    steps,
    status,
    isLoadingTxResult,
    estimatedTimeRemaining,
    explorerLink,
    error,
  };
}
