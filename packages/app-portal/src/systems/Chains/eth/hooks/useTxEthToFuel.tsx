import { useMemo } from 'react';
import { Services, store } from '~portal/store';
import { getAssetEth, getAssetFuel } from '~portal/systems/Assets/utils';
import { useExplorerLink } from '~portal/systems/Bridge/hooks/useExplorerLink';
import type { BridgeTxsMachineState } from '~portal/systems/Bridge/machines';

import { useAsset } from '../../../Assets/hooks/useAsset';
import { useFuelAccountConnection } from '../../fuel';
import type { TxEthToFuelMachineState } from '../machines';
import { isErc20Address } from '../utils';

import type { HexAddress } from 'app-commons';
import { deepCompare } from '../utils/deepCompare';

const bridgeTxsSelectors = {
  txEthToFuel: (txId?: HexAddress) => (state: BridgeTxsMachineState) => {
    if (!txId) return undefined;

    const machine = state.context?.ethToFuelTxRefs?.[txId]?.getSnapshot();

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
    const { ethTxId, erc20Token } = state.context;

    if (!ethTxId) return undefined;

    const confirmTransactionText = isErc20Address(erc20Token?.address)
      ? 'Action'
      : 'Automatic';

    const steps = [
      {
        name: 'Submit to bridge',
        status: 'Done!',
        isDone: true,
      },
      {
        name: 'Settlement',
        // TODO: put correct time left '~XX minutes left', how?
        status: status.isSettlementDone ? 'Done!' : 'Waiting',
        isLoading: status.isSettlementLoading,
        isDone: status.isSettlementDone,
        isSelected: status.isSettlementSelected,
      },
      {
        name: 'Confirm transaction',
        status: status.isReceiveDone ? 'Done!' : confirmTransactionText,
        isLoading: status.isConfirmTransactionLoading,
        isDone: status.isReceiveDone,
        isSelected: status.isConfirmTransactionSelected,
      },
      {
        name: 'Receive on Fuel',
        status: status.isReceiveDone ? 'Done!' : 'Automatic',
        isLoading: false,
        isDone: status.isReceiveDone,
        isSelected: false,
      },
    ];

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
};

export function useTxEthToFuel({ id }: { id: string }) {
  const { wallet: fuelWallet } = useFuelAccountConnection();
  const txId = id.startsWith('0x') ? (id as HexAddress) : undefined;
  const { href: explorerLink } = useExplorerLink({
    network: 'ethereum',
    id,
  });

  const txEthToFuelState = store.useSelector(
    Services.bridgeTxs,
    bridgeTxsSelectors.txEthToFuel(txId),
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

    return {
      steps,
      status,
      amount,
      date,
      erc20Token,
      ethTxId,
      isLoadingReceipts,
    };
  }, [txEthToFuelState]);

  const { asset } = useAsset({
    ethTokenId: erc20Token?.address,
  });
  const assetEthNetwork = asset ? getAssetEth(asset) : undefined;
  const assetFuelNetwork = asset ? getAssetFuel(asset) : undefined;
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
      ethTxId,
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
