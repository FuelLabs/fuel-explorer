import { useQueryClient } from '@tanstack/react-query';
import { useInterpret, useSelector } from '@xstate/react';
import { useEffect } from 'react';
import { usePublicClient, useWalletClient } from 'wagmi';
import { useIsStakingContractPaused } from '~staking/hooks/useIsStakingContractPaused';
import {
  type MachineEvents,
  redelegateStatusDialogMachine,
  redelegateStatusDialogMachineSelectors,
} from '~staking/systems/Staking/machines/redelegateStatusDialogMachine';
import { RedelegateStatus } from '~staking/systems/Staking/machines/redelegateStatusDialogMachine';

interface Props {
  identifier: string;
}

export function useRedelegateStatusDialog({ identifier }: Props) {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const queryClient = useQueryClient();
  const isPaused = useIsStakingContractPaused({
    conditions: {
      pauser: [], // Define appropriate pausers
    },
  });

  const service = useInterpret(redelegateStatusDialogMachine, {
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

  const redelegateEvent = useSelector(
    service,
    redelegateStatusDialogMachineSelectors.getEvent,
  );

  const error = useSelector(
    service,
    redelegateStatusDialogMachineSelectors.getError,
  );

  const isError = useSelector(
    service,
    redelegateStatusDialogMachineSelectors.isError,
  );

  const rates = useSelector(
    service,
    redelegateStatusDialogMachineSelectors.getRates,
  );

  const isFetching = useSelector(
    service,
    redelegateStatusDialogMachineSelectors.isFetchingEvent,
  );

  const isWaitingForReceipt = useSelector(
    service,
    redelegateStatusDialogMachineSelectors.isWaitingForReceipt,
  );

  const isLoading = isFetching && !redelegateEvent?.statusInfo;
  const isFinalized = redelegateEvent?.status === RedelegateStatus.Finalized;
  const isFinalizedNow = useSelector(
    service,
    redelegateStatusDialogMachineSelectors.isFinalized,
  );

  const dateFinalized =
    redelegateEvent?.statusInfo[RedelegateStatus.TransactionSent]?.ethTx
      ?.timestamp;

  const txHash = useSelector(
    service,
    redelegateStatusDialogMachineSelectors.getTxHash,
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
    redelegateEvent,
    error: errorMessage,
    txHash,
    rates,
  };
}
