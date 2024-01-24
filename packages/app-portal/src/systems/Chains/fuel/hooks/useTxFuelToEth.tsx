import { useTransaction } from '@fuels-portal/sdk-react';
import { useInterpret, useSelector } from '@xstate/react';
import { fromTai64ToUnix, getReceiptsMessageOut } from 'fuels';
import { useEffect, useMemo } from 'react';
import { store } from '~/store';

import { useEthAccountConnection } from '../../eth/hooks';
import type { TxFuelToEthMachineState } from '../machines';
import { txFuelToEthMachine } from '../machines';
import { FUEL_UNITS } from '../utils';

import { useFuelAccountConnection } from './useFuelAccountConnection';

const selectors = {
  status: (state: TxFuelToEthMachineState) => {
    const isSubmitToBridgeLoading = state.hasTag('isSubmitToBridgeLoading');
    const isSubmitToBridgeSelected = state.hasTag('isSubmitToBridgeSelected');
    const isSubmitToBridgeDone = state.hasTag('isSubmitToBridgeDone');
    const isSettlementLoading = state.hasTag('isSettlementLoading');
    const isSettlementSelected = state.hasTag('isSettlementSelected');
    const isSettlementDone = state.hasTag('isSettlementDone');
    const isConfirmTransactionSelected = state.hasTag(
      'isConfirmTransactionSelected'
    );
    const isConfirmTransactionLoading = state.hasTag(
      'isConfirmTransactionLoading'
    );
    const isConfirmTransactionDone = state.hasTag('isConfirmTransactionDone');
    const isWaitingEthWalletApproval = state.hasTag(
      'isWaitingEthWalletApproval'
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
    const status = selectors.status(state);

    function getConfirmStatusText() {
      if (status.isWaitingEthWalletApproval) return 'Action required';
      if (status.isConfirmTransactionDone) return 'Done!';
      return 'Action';
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
        // TODO: put correct time left '~XX days left', how? waiting for message Proof in this stage
        status: status.isSettlementDone ? 'Done!' : 'Waiting',
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
        name: 'Receive on ETH',
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
  amountSent: (state: TxFuelToEthMachineState) => {
    const fuelTxResult = state.context.fuelTxResult;

    const messageOutReceipt = getReceiptsMessageOut(
      fuelTxResult?.receipts || []
    )[0];

    const amountSent = messageOutReceipt?.amount;
    return amountSent;
  },
};

export function useTxFuelToEth({
  txId,
  skipAnalyzeTx,
}: {
  txId: string;
  skipAnalyzeTx?: boolean;
}) {
  const { walletClient: ethWalletClient, publicClient: ethPublicClient } =
    useEthAccountConnection();
  const { provider: fuelProvider } = useFuelAccountConnection();
  const service = useInterpret(txFuelToEthMachine);
  const status = useSelector(service, selectors.status);
  const steps = useSelector(service, selectors.steps);
  const fuelTxResult = useSelector(service, selectors.fuelTxResult);
  const fuelTxAmount = useSelector(service, selectors.amountSent);

  const fuelTxDate = useMemo(
    () =>
      fuelTxResult?.time
        ? new Date(fromTai64ToUnix(fuelTxResult?.time) * 1000)
        : undefined,
    [fuelTxResult?.time]
  );

  const { transaction: fuelTx } = useTransaction(txId);

  useEffect(() => {
    if (txId && !skipAnalyzeTx && fuelProvider) {
      service.send('START_ANALYZE_TX', {
        input: {
          fuelTxId: txId,
          fuelProvider,
          ethPublicClient,
        },
      });
    }
  }, [txId, fuelProvider, ethPublicClient, skipAnalyzeTx]);

  function relayToEth() {
    service.send('RELAY_TO_ETH', {
      input: {
        ethWalletClient,
      },
    });
  }

  return {
    handlers: {
      close: store.closeOverlay,
      relayToEth,
      openTxFuelToEth: store.openTxFuelToEth,
    },
    fuelTx,
    fuelTxDate,
    fuelTxAmount: fuelTxAmount?.format({
      precision: 9,
      units: FUEL_UNITS,
    }),
    steps,
    status,
  };
}
