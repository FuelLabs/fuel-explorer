import { GQLWithdrawStatusType } from '@fuel-explorer/graphql/sdk';
import { useQueryClient } from '@tanstack/react-query';
import { useInterpret, useSelector } from '@xstate/react';
import { CURRENT_NETWORK_CONTRACTS } from 'app-commons';
import { useEffect } from 'react';
import { usePublicClient, useWalletClient } from 'wagmi';
import { useIsStakingContractPaused } from '~staking/hooks/useIsStakingContractPaused';
import {
  type MachineEvents,
  withdrawStatusDialogMachine,
  withdrawStatusDialogMachineSelectors,
} from '~staking/systems/Staking/machines/withdrawStatusDialogMachine';

interface Props {
  identifier: string;
}

export function useWithdrawStatusDialog({ identifier }: Props) {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const queryClient = useQueryClient();
  const isPaused = useIsStakingContractPaused({
    conditions: {
      pauser: [CURRENT_NETWORK_CONTRACTS.SEQUENCER_INTERFACE],
    },
  });

  const service = useInterpret(withdrawStatusDialogMachine, {
    context: {
      eventId: identifier,
      queryClient,
    },
  });

  useEffect(() => {
    if (identifier) {
      service.send({
        type: 'SET_L1_EVENT_ID',
        eventId: identifier,
      } as MachineEvents);
    }
  }, [service, identifier]);

  useEffect(() => {
    if (publicClient && walletClient && queryClient) {
      service.send({
        type: 'SET_CLIENTS',
        publicClient,
        walletClient,
        queryClient,
      });
    }
  }, [publicClient, walletClient, service, queryClient]);

  const finalize = () => {
    service.send({ type: 'FINALIZE' });
  };

  const stakingEvent = useSelector(
    service,
    withdrawStatusDialogMachineSelectors.getEvent,
  );

  const error = useSelector(
    service,
    withdrawStatusDialogMachineSelectors.getError,
  );

  const isError = useSelector(
    service,
    withdrawStatusDialogMachineSelectors.isError,
  );

  const rates = useSelector(
    service,
    withdrawStatusDialogMachineSelectors.getRates,
  );

  const isCheckingPaused = useSelector(
    service,
    withdrawStatusDialogMachineSelectors.isCheckingPaused,
  );
  const isFetching = useSelector(
    service,
    withdrawStatusDialogMachineSelectors.isFetchingEvent,
  );
  const isFinalizing = useSelector(
    service,
    withdrawStatusDialogMachineSelectors.isFinalizing,
  );
  const isWaitingForReceipt = useSelector(
    service,
    withdrawStatusDialogMachineSelectors.isWaitingForReceipt,
  );
  const isReceiptSuccess = useSelector(
    service,
    withdrawStatusDialogMachineSelectors.isReceiptSuccess,
  );
  const isLoading = isFetching && !stakingEvent?.statusInfo;
  const isFinalized = stakingEvent?.status === GQLWithdrawStatusType.Finalized;
  const isFinalizedNow = useSelector(
    service,
    withdrawStatusDialogMachineSelectors.isFinalized,
  );
  const dateFinalized =
    stakingEvent?.statusInfo[GQLWithdrawStatusType.ReadyToProcessWithdraw]
      ?.ethTx?.timestamp;
  const txHash = useSelector(
    service,
    withdrawStatusDialogMachineSelectors.getTxHash,
  );
  const errorMessage =
    (typeof error === 'object' &&
      error &&
      'message' in (error as Error) &&
      error?.message) ||
    (error as string | undefined);

  return {
    finalize,
    isPaused,
    isCheckingPaused,
    isFetching,
    isFinalizing,
    isFinalized,
    isFinalizedNow,
    isError,
    isWaitingForReceipt,
    isReceiptSuccess,
    isLoading,
    dateFinalized,
    stakingEvent,
    error: errorMessage,
    txHash,
    rates,
  };
}
