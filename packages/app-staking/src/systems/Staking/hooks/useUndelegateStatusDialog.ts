import { useQueryClient } from '@tanstack/react-query';
import { useInterpret, useSelector } from '@xstate/react';
import { useEffect } from 'react';
import { usePublicClient, useWalletClient } from 'wagmi';
import { useIsStakingContractPaused } from '~staking/hooks/useIsStakingContractPaused';
import {
  type MachineEvents,
  undelegateStatusDialogMachine,
  undelegateStatusDialogMachineSelectors,
} from '~staking/systems/Staking/machines/undelegateStatusDialogMachine';
import { UndelegateStatus } from '~staking/systems/Staking/machines/undelegateStatusDialogMachine';

interface Props {
  identifier: string;
}

export function useUndelegateStatusDialog({ identifier }: Props) {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const queryClient = useQueryClient();
  const isPaused = useIsStakingContractPaused({
    conditions: {
      pauser: [], // Define appropriate pausers
    },
  });

  const service = useInterpret(undelegateStatusDialogMachine, {
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

  const undelegateEvent = useSelector(
    service,
    undelegateStatusDialogMachineSelectors.getEvent,
  );

  const error = useSelector(
    service,
    undelegateStatusDialogMachineSelectors.getError,
  );

  const isError = useSelector(
    service,
    undelegateStatusDialogMachineSelectors.isError,
  );

  const rates = useSelector(
    service,
    undelegateStatusDialogMachineSelectors.getRates,
  );

  const isFetching = useSelector(
    service,
    undelegateStatusDialogMachineSelectors.isFetchingEvent,
  );

  const isWaitingForReceipt = useSelector(
    service,
    undelegateStatusDialogMachineSelectors.isWaitingForReceipt,
  );

  const isLoading = isFetching && !undelegateEvent?.statusInfo;
  const isFinalized = undelegateEvent?.status === UndelegateStatus.Finalized;
  const isFinalizedNow = useSelector(
    service,
    undelegateStatusDialogMachineSelectors.isFinalized,
  );

  const dateFinalized =
    undelegateEvent?.statusInfo[UndelegateStatus.TransactionSent]?.ethTx
      ?.timestamp;

  const txHash = useSelector(
    service,
    undelegateStatusDialogMachineSelectors.getTxHash,
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
    undelegateEvent,
    error: errorMessage,
    txHash,
    rates,
  };
}
