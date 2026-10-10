import { useMemo } from 'react';
import { Services, store } from '~portal/store';
import {
  getAssetEthCurrentChain,
  getAssetFuelCurrentChain,
} from '~portal/systems/Assets/utils';
import {
  BRIDGE_STEP_ID,
  BRIDGE_STEP_STATUS_ID,
  type BridgeStep,
  type BridgeStepStatusId,
} from '~portal/systems/Bridge/components/BridgeSteps';
import { useExplorerLink } from '~portal/systems/Bridge/hooks/useExplorerLink';
import type { BridgeTxsMachineState } from '~portal/systems/Bridge/machines';
import { ethToFuelTxKey } from '~portal/systems/Bridge/utils/txKey';

import { useAsset } from '../../../Assets/hooks/useAsset';
import { distanceToNow, useFuelAccountConnection } from '../../fuel';
import type { TxEthToFuelMachineState } from '../machines';
import { isErc20Address, parseFuelAddressToEth } from '../utils';

import type { HexAddress } from 'app-commons';
import dayjs from 'dayjs';
import { deepCompare } from '../utils/deepCompare';

export const DEPOSIT_DURATION_MINUTES = 30;

const bridgeTxsSelectors = {
  txEthToFuel: (machineId?: string) => (state: BridgeTxsMachineState) => {
    if (!machineId) return undefined;

    const machine = state.context?.ethToFuelTxRefs?.[machineId]?.getSnapshot();

    return machine;
  },
};

const txEthToFuelSelectors = {
  status: (state: TxEthToFuelMachineState) => {
    const isSettlementLoading = state.hasTag('isSettlementLoading');
    const isSettlementSelected = state.hasTag('isSettlementSelected');
    const isSettlementDone = state.hasTag('isSettlementDone');
    const isConfirmTransactionLoading = state.hasTag(
      'isConfirmTransactionLoading',
    );
    const isConfirmTransactionSelected = state.hasTag(
      'isConfirmTransactionSelected',
    );
    const isReceiveDone = state.hasTag('isReceiveDone');
    const isWaitingFuelWalletApproval = state.hasTag(
      'isWaitingFuelWalletApproval',
    );

    return {
      isSettlementLoading,
      isSettlementSelected,
      isSettlementDone,
      isConfirmTransactionLoading,
      isConfirmTransactionSelected,
      isReceiveDone,
      isWaitingFuelWalletApproval,
    };
  },
  steps: (state: TxEthToFuelMachineState) => {
    const status = txEthToFuelSelectors.status(state);
    const date = txEthToFuelSelectors.blockDate(state);
    const { ethTxId, erc20Token } = state.context;

    if (!ethTxId) return undefined;

    const confirmIsAutomatic = !isErc20Address(erc20Token?.address);
    const confirmTransactionText = confirmIsAutomatic ? 'Automatic' : 'Action';
    const confirmStatusId = status.isReceiveDone
      ? BRIDGE_STEP_STATUS_ID.done
      : confirmIsAutomatic
        ? BRIDGE_STEP_STATUS_ID.automatic
        : BRIDGE_STEP_STATUS_ID.action;

    function getSettlementStatus(): {
      status: string;
      statusId: BridgeStepStatusId;
      eta?: string;
    } {
      if (status.isSettlementDone) {
        return { status: 'Done!', statusId: BRIDGE_STEP_STATUS_ID.done };
      }
      if (date) {
        const target = dayjs(date)
          .add(DEPOSIT_DURATION_MINUTES, 'minutes')
          .toDate();
        const eta = distanceToNow(target);
        return {
          status: `~${eta} left`,
          statusId: BRIDGE_STEP_STATUS_ID.timeLeft,
          eta,
        };
      }
      return { status: 'Waiting', statusId: BRIDGE_STEP_STATUS_ID.waiting };
    }
    const settlementStatus = getSettlementStatus();

    const steps = [
      {
        id: BRIDGE_STEP_ID.submitToBridge,
        name: 'Submit to bridge',
        status: 'Done!',
        statusId: BRIDGE_STEP_STATUS_ID.done,
        isDone: true,
      },
      {
        id: BRIDGE_STEP_ID.settlement,
        name: 'Settlement',
        status: settlementStatus.status,
        statusId: settlementStatus.statusId,
        eta: settlementStatus.eta,
        isLoading: status.isSettlementLoading,
        isDone: status.isSettlementDone,
        isSelected: status.isSettlementSelected,
      },
      {
        id: BRIDGE_STEP_ID.confirmTransaction,
        name: 'Confirm transaction',
        status: status.isReceiveDone ? 'Done!' : confirmTransactionText,
        statusId: confirmStatusId,
        isLoading: status.isConfirmTransactionLoading,
        isDone: status.isReceiveDone,
        isSelected: status.isConfirmTransactionSelected,
      },
      {
        id: BRIDGE_STEP_ID.receiveOnFuel,
        name: 'Receive on Fuel',
        status: status.isReceiveDone ? 'Done!' : 'Automatic',
        statusId: status.isReceiveDone
          ? BRIDGE_STEP_STATUS_ID.done
          : BRIDGE_STEP_STATUS_ID.automatic,
        isLoading: false,
        isDone: status.isReceiveDone,
        isSelected: false,
      },
    ] satisfies BridgeStep[];

    return steps;
  },
  amount: (state: TxEthToFuelMachineState) => {
    const { amount } = state.context;

    return amount;
  },
  blockDate: (state: TxEthToFuelMachineState) => {
    const { blockDate } = state.context;

    return blockDate;
  },
  erc20Token: (state: TxEthToFuelMachineState) => {
    const { erc20Token } = state.context;
    return erc20Token;
  },
  ethTxId: (state: TxEthToFuelMachineState) => {
    const { ethTxId } = state.context;
    return ethTxId;
  },
  isLoadingReceipts: (state: TxEthToFuelMachineState) => {
    return state.matches('checkingSettlement.gettingReceiptsInfo');
  },
  selectFromToAddresses: (state: TxEthToFuelMachineState) => {
    return {
      sender: parseFuelAddressToEth(state.context.sender),
      recipient: state.context.recipient?.toString(),
    };
  },
};

// `id` is undefined while the dialog plays its exit animation: closing the
// overlay clears its metadata before the dialog unmounts.
export function useTxEthToFuel({
  id,
  messageSentEventNonce,
}: { id: string | undefined; messageSentEventNonce: BigInt | undefined }) {
  const { wallet: fuelWallet } = useFuelAccountConnection();
  const txId = id?.startsWith('0x') ? (id as HexAddress) : undefined;
  const { href: explorerLink } = useExplorerLink({
    network: 'ethereum',
    id: id ?? '',
  });
  const machineId = ethToFuelTxKey(txId, messageSentEventNonce);

  const txEthToFuelState = store.useSelector(
    Services.bridgeTxs,
    bridgeTxsSelectors.txEthToFuel(machineId),
    deepCompare,
  );

  const {
    steps,
    status,
    amount,
    date,
    erc20Token,
    ethTxId,
    isLoadingReceipts,
    fromAddress,
    toAddress,
  } = useMemo(() => {
    if (!txEthToFuelState) return {};

    const steps = txEthToFuelSelectors.steps(txEthToFuelState);
    const status = txEthToFuelSelectors.status(txEthToFuelState);
    const amount = txEthToFuelSelectors.amount(txEthToFuelState);
    const date = txEthToFuelSelectors.blockDate(txEthToFuelState);
    const erc20Token = txEthToFuelSelectors.erc20Token(txEthToFuelState);
    const ethTxId = txEthToFuelSelectors.ethTxId(txEthToFuelState);
    const isLoadingReceipts =
      txEthToFuelSelectors.isLoadingReceipts(txEthToFuelState);
    const fromToAddresses =
      txEthToFuelSelectors.selectFromToAddresses(txEthToFuelState);

    return {
      steps,
      status,
      amount,
      date,
      erc20Token,
      ethTxId,
      isLoadingReceipts,
      fromAddress: fromToAddresses.sender,
      toAddress: fromToAddresses.recipient,
    };
  }, [txEthToFuelState]);

  const { asset } = useAsset({
    ethTokenId: erc20Token?.address,
  });
  const assetEthNetwork = asset ? getAssetEthCurrentChain(asset) : undefined;
  const assetFuelNetwork = asset ? getAssetFuelCurrentChain(asset) : undefined;
  const formattedAmount = amount?.format({
    // if it's erc20 token, the value is bigger and we should use ETH decimals of the token
    units: erc20Token ? assetEthNetwork?.decimals : undefined,
    precision: assetFuelNetwork?.decimals,
    minPrecision: 3,
  });

  function relayMessageToFuel() {
    if (!ethTxId || !fuelWallet) return;

    store.relayMessageEthToFuel({
      input: {
        fuelWallet,
      },
      machineId,
    });
  }

  const shouldShowConfirmButton =
    isErc20Address(erc20Token?.address) &&
    (status?.isWaitingFuelWalletApproval ||
      status?.isConfirmTransactionLoading);

  return {
    handlers: {
      close: store.closeOverlay,
      openTxEthToFuel: store.openTxEthToFuel,
      relayMessageToFuel,
    },
    fromAddress,
    toAddress,
    date,
    steps,
    status,
    shouldShowConfirmButton,
    amount: formattedAmount,
    asset,
    isLoadingReceipts,
    explorerLink,
  };
}
