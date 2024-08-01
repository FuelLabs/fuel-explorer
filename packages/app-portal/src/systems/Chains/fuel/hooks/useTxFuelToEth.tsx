import type { Asset } from '@fuel-ts/account';
import { DateTime, ReceiptType, getReceiptsMessageOut, hexlify } from 'fuels';
import { useMemo } from 'react';
import { Services, store } from '~portal/store';
import { useAssets } from '~portal/systems/Assets';
import { getAssetEth } from '~portal/systems/Assets/utils';
import { useExplorerLink } from '~portal/systems/Bridge/hooks/useExplorerLink';
import type { BridgeTxsMachineState } from '~portal/systems/Bridge/machines';

import { useEthAccountConnection } from '../../eth/hooks';
import { isSameEthAddress, parseFuelAddressToEth } from '../../eth/utils';
import type { TxFuelToEthMachineState } from '../machines';
import { distanceToNow } from '../utils';

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

    const messageOutReceipt = getReceiptsMessageOut(
      fuelTxResult?.receipts || [],
    )[0];

    if (messageOutReceipt) {
      const burnReceipt = fuelTxResult?.receipts?.find(
        (receipt) => receipt.type === ReceiptType.Burn,
      );
      if (burnReceipt) {
        const receipt = burnReceipt as Extract<
          typeof burnReceipt,
          { type: ReceiptType.Burn }
        >;
        const amount = receipt.val;
        const ethAssetId = messageOutReceipt.data
          ? parseFuelAddressToEth(
              hexlify(messageOutReceipt.data).replace('0x', '').slice(72, 136),
            )
          : undefined;
        const ethAsset = assets
          .map((asset) => ({
            asset,
            ethNetwork: getAssetEth(asset),
          }))
          .find(({ ethNetwork }) => {
            return isSameEthAddress(ethNetwork?.address, ethAssetId);
          });

        return {
          asset: ethAsset?.asset,
          amount: amount.format({
            precision: ethAsset?.ethNetwork?.decimals,
          }),
        };
      }
    }

    const asset = assets.find((asset) => asset.symbol === 'ETH');

    if (!asset) return undefined;

    const ethNetwork = getAssetEth(asset);

    return {
      asset,
      amount: messageOutReceipt?.amount?.format({
        precision: ethNetwork?.decimals,
      }),
    };
  },
  isLoadingTxResult: (state: TxFuelToEthMachineState) => {
    return state.matches('submittingToBridge.waitingFuelTxResult');
  },
  estimatedTimeRemaining: (state: TxFuelToEthMachineState) => {
    const estimatedFinishDate = state.context.estimatedFinishDate;
    if (!estimatedFinishDate) return undefined;

    return distanceToNow(estimatedFinishDate);
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
  } = useMemo(() => {
    if (!txFuelToEthState) return {};

    const steps = txFuelToEthSelectors.steps(txFuelToEthState);
    const status = txFuelToEthSelectors.status(txFuelToEthState);
    const fuelTxResult = txFuelToEthSelectors.fuelTxResult(txFuelToEthState);
    const assetAmount =
      txFuelToEthSelectors.assetAmount(assets)(txFuelToEthState);
    const isLoadingTxResult =
      txFuelToEthSelectors.isLoadingTxResult(txFuelToEthState);
    const estimatedTimeRemaining =
      txFuelToEthSelectors.estimatedTimeRemaining(txFuelToEthState);

    return {
      steps,
      status,
      fuelTxResult,
      asset: assetAmount?.asset,
      amount: assetAmount?.amount,
      isLoadingTxResult,
      estimatedTimeRemaining,
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
    fuelTxResult,
    date,
    asset,
    amount,
    steps,
    status,
    isLoadingTxResult,
    estimatedTimeRemaining,
    explorerLink,
  };
}
