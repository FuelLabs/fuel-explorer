import { useQueryClient } from '@tanstack/react-query';
import { useInterpret, useSelector } from '@xstate/react';
import { useEffect } from 'react';
import { usePublicClient, useWalletClient } from 'wagmi';
import { useIsStakingContractPaused } from '~staking/hooks/useIsStakingContractPaused';
import {
  type MachineEvents,
  claimRewardStatusDialogMachine,
  claimRewardStatusDialogMachineSelectors,
} from '~staking/systems/Staking/machines/claimRewardStatusDialogMachine';
import { ClaimStatus } from '~staking/systems/Staking/machines/claimRewardStatusDialogMachine';

interface Props {
  identifier: string;
}

export function useClaimRewardStatusDialog({ identifier }: Props) {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const queryClient = useQueryClient();
  const isPaused = useIsStakingContractPaused({
    conditions: {
      pauser: [], // Define appropriate pausers
    },
  });

  const service = useInterpret(claimRewardStatusDialogMachine, {
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

  const claimEvent = useSelector(
    service,
    claimRewardStatusDialogMachineSelectors.getEvent,
  );

  const error = useSelector(
    service,
    claimRewardStatusDialogMachineSelectors.getError,
  );

  const isError = useSelector(
    service,
    claimRewardStatusDialogMachineSelectors.isError,
  );

  const rates = useSelector(
    service,
    claimRewardStatusDialogMachineSelectors.getRates,
  );

  const isFetching = useSelector(
    service,
    claimRewardStatusDialogMachineSelectors.isFetchingEvent,
  );

  const isWaitingForReceipt = useSelector(
    service,
    claimRewardStatusDialogMachineSelectors.isWaitingForReceipt,
  );

  const isLoading = isFetching && !claimEvent?.statusInfo;
  const isFinalized = claimEvent?.status === ClaimStatus.Finalized;
  const isFinalizedNow = useSelector(
    service,
    claimRewardStatusDialogMachineSelectors.isFinalized,
  );

  const dateFinalized =
    claimEvent?.statusInfo[ClaimStatus.TransactionSent]?.ethTx?.timestamp;

  const txHash = useSelector(
    service,
    claimRewardStatusDialogMachineSelectors.getTxHash,
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
    claimEvent,
    error: errorMessage,
    txHash,
    rates,
  };
}
