import { useInterpret, useSelector } from '@xstate/react';
import { useEffect } from 'react';
import { useTransaction } from 'wagmi';
import { store } from '~/store';

import { useFuelAccountConnection } from '../../fuel';
import type { TxEthToFuelMachineState } from '../machines';
import { txEthToFuelMachine } from '../machines';

import { useBlocks } from './useBlocks';
import { useCachedBlocksDates } from './useCachedBlocksDates';
import { useEthAccountConnection } from './useEthAccountConnection';

const selectors = {
  status: (state: TxEthToFuelMachineState) => {
    const isSettlementLoading = state.hasTag('isSettlementLoading');
    const isSettlementSelected = state.hasTag('isSettlementSelected');
    const isSettlementDone = state.hasTag('isSettlementDone');
    const isConfirmTransactionLoading = state.hasTag(
      'isConfirmTransactionLoading'
    );
    const isConfirmTransactionSelected = state.hasTag(
      'isConfirmTransactionSelected'
    );
    const isReceiveDone = state.hasTag('isReceiveDone');

    return {
      isSettlementLoading,
      isSettlementSelected,
      isSettlementDone,
      isConfirmTransactionLoading,
      isConfirmTransactionSelected,
      isReceiveDone,
    };
  },
  steps: (state: TxEthToFuelMachineState) => {
    const status = selectors.status(state);
    const { ethTxId } = state.context;

    if (!ethTxId) return undefined;

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
        status: status.isReceiveDone ? 'Done!' : 'Automatic',
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
};

export function useTxEthToFuel({
  id,
  skipAnalyzeTx,
}: {
  id: string;
  skipAnalyzeTx?: boolean;
}) {
  const txId = id.startsWith('0x') ? (id as `0x${string}`) : undefined;
  const { publicClient: ethPublicClient } = useEthAccountConnection();
  const { provider: fuelProvider, address: fuelAddress } =
    useFuelAccountConnection();
  const { data: ethTx } = useTransaction({
    hash: txId,
  });

  const { blockDates, notCachedHashes } = useCachedBlocksDates(
    ethTx?.blockHash ? [ethTx?.blockHash] : undefined
  );
  const { blocks } = useBlocks(notCachedHashes);
  const service = useInterpret(txEthToFuelMachine);
  const steps = useSelector(service, selectors.steps);
  const status = useSelector(service, selectors.status);
  const amount = useSelector(service, selectors.amount);
  useEffect(() => {
    if (
      txId &&
      fuelProvider &&
      fuelAddress &&
      !skipAnalyzeTx &&
      ethPublicClient
    ) {
      service.send('START_ANALYZE_TX', {
        input: {
          ethTxId: txId,
          fuelProvider,
          fuelAddress,
          ethPublicClient,
        },
      });
    }
  }, [
    txId,
    fuelProvider,
    fuelAddress,
    service,
    ethPublicClient,
    skipAnalyzeTx,
  ]);

  const ethBlockDate = ethTx?.blockHash
    ? blockDates?.[ethTx.blockHash] ||
      blocks?.find((block) => block.hash === ethTx.blockHash)?.date
    : undefined;

  return {
    handlers: {
      close: store.closeOverlay,
      openTxEthToFuel: store.openTxEthToFuel,
    },
    ethBlockDate,
    steps,
    status,
    amount,
  };
}
