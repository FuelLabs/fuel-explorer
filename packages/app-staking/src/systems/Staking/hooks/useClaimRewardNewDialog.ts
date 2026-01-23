import { useQueryClient } from '@tanstack/react-query';
import { useInterpret, useSelector } from '@xstate/react';
import { BN } from 'fuels';
import { useCallback, useEffect, useMemo } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import type { SequencerValidatorAddress } from '~staking/systems/Core/utils/address';
import {
  claimRewardNewMachine,
  claimRewardNewMachineSelectors,
} from '../machines/claimRewardNewDialogMachine';
import { useValidatorRewards } from '../services/useValidatorRewards/useValidatorRewards';

export function useClaimRewardNewDialog({
  validator,
}: { validator: SequencerValidatorAddress }) {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const queryClient = useQueryClient();
  const { address } = useAccount();

  const isReady = !!walletClient;

  const service = useInterpret(claimRewardNewMachine);

  const { data: rewardsData } = useValidatorRewards(validator, address, {
    select: ({ rewards }) => rewards,
  });

  const rewardAmount = useMemo(() => {
    return (
      rewardsData?.reduce((acc, curr) => {
        // Cosmos API returns decimal strings - truncate to integer for BN
        const integerAmount = Math.floor(Number(curr.amount ?? 0)).toString();
        return acc.add(new BN(integerAmount));
      }, new BN(0)) ?? null
    );
  }, [rewardsData]);

  useEffect(() => {
    if (validator) {
      service.send({
        type: 'SET_VALIDATOR',
        validator,
      });
    }
  }, [validator, service]);

  useEffect(() => {
    if (address) {
      service.send({ type: 'SET_ETH_ACCOUNT', ethAccount: address });
    }
  }, [address, service]);

  useEffect(() => {
    service.send({
      type: 'SET_AMOUNT',
      amount: rewardAmount,
    });
  }, [rewardAmount, service]);

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

  const onConfirm = useCallback(() => {
    service.send({ type: 'CONFIRM' });
  }, [service]);

  const isSubmitting = useSelector(service, (state) =>
    claimRewardNewMachineSelectors.isSubmitting(state),
  );

  const isReviewing = useSelector(service, (state) =>
    claimRewardNewMachineSelectors.isReviewing(state),
  );

  const claimRewardError = useSelector(service, (state) =>
    claimRewardNewMachineSelectors.getClaimRewardError(state.context),
  );

  const isGettingReviewDetails = useSelector(
    service,
    claimRewardNewMachineSelectors.isGettingReviewDetails,
  );

  const fee = useSelector(service, (state) => state.context.fee);
  const rates = useSelector(service, (state) => state.context.rates);

  const isBlocked = useSelector(service, (state) =>
    claimRewardNewMachineSelectors.isBlocked(state.context),
  );
  const blockingMessage = useSelector(service, (state) =>
    claimRewardNewMachineSelectors.getBlockingMessage(state.context),
  );

  return {
    state: useSelector(service, (state) => state),
    send: service.send,
    isReady,
    isSubmitting,
    isReviewing,
    isGettingReviewDetails,
    onConfirm,
    fee,
    rates,
    onClose: () => service.send({ type: 'CLOSE' }),
    claimRewardError,
    isBlocked,
    blockingMessage,
  };
}
