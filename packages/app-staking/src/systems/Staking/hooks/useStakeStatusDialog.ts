import { useQueryClient } from '@tanstack/react-query';
import { useInterpret, useSelector } from '@xstate/react';
import { useEffect } from 'react';
import { usePublicClient, useWalletClient } from 'wagmi';
import { useIsStakingContractPaused } from '~staking/hooks/useIsStakingContractPaused';
import {
  type MachineEvents,
  stakeStatusDialogMachine,
  stakeStatusDialogMachineSelectors,
} from '~staking/systems/Staking/machines/stakeStatusDialogMachine';
import { StakeStatus } from '~staking/systems/Staking/machines/stakeStatusDialogMachine';

interface Props {
  identifier: string;
}

export function useStakeStatusDialog({ identifier }: Props) {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const queryClient = useQueryClient();
  const isPaused = useIsStakingContractPaused({
    conditions: {
      pauser: [], // Define appropriate pausers
    },
  });

  const service = useInterpret(stakeStatusDialogMachine, {
    context: {
      eventId: identifier,
      queryClient,
    },
  });

  useEffect(() => {
    if (identifier) {
      service.send({
        type: 'SET_EVENT_ID',
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

  const stakeEvent = useSelector(
    service,
    stakeStatusDialogMachineSelectors.getEvent,
  );

  const error = useSelector(
    service,
    stakeStatusDialogMachineSelectors.getError,
  );

  const isError = useSelector(
    service,
    stakeStatusDialogMachineSelectors.isError,
  );

  const rates = useSelector(
    service,
    stakeStatusDialogMachineSelectors.getRates,
  );

  const isFetching = useSelector(
    service,
    stakeStatusDialogMachineSelectors.isFetchingEvent,
  );

  const isWaitingForReceipt = useSelector(
    service,
    stakeStatusDialogMachineSelectors.isWaitingForReceipt,
  );

  const isLoading = isFetching && !stakeEvent?.statusInfo;
  const isFinalized = stakeEvent?.status === StakeStatus.Finalized;
  const isFinalizedNow = useSelector(
    service,
    stakeStatusDialogMachineSelectors.isFinalized,
  );

  const dateFinalized =
    stakeEvent?.statusInfo[StakeStatus.TransactionSent]?.ethTx?.timestamp;

  const txHash = useSelector(
    service,
    stakeStatusDialogMachineSelectors.getTxHash,
  );

  const errorMessage =
    (typeof error === 'object' &&
      error &&
      'message' in (error as Error) &&
      error?.message) ||
    (error as string | undefined);

  return {
    isPaused,
    isFetching,
    isFinalized,
    isFinalizedNow,
    isError,
    isWaitingForReceipt,
    isLoading,
    dateFinalized,
    stakeEvent,
    error: errorMessage,
    txHash,
    rates,
  };
}
