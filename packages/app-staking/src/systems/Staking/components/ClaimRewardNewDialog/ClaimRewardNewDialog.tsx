import { AnimatedDialog, VStack } from '@fuels/ui';
import { CURRENT_NETWORK_CONTRACTS, FuelToken, TOKENS } from 'app-commons';
import { useIsStakingContractPaused } from '~staking/hooks/useIsStakingContractPaused';
import type { SequencerValidatorAddress } from '~staking/systems/Core/utils/address';
import { responsiveDialogStyles } from '~staking/systems/Staking/constants/styles/dialogContent';
import { useClaimRewardNewDialog } from '../../hooks/useClaimRewardNewDialog';
import { PausedContractDialogStakingContent } from '../PausedContractDialogStakingContent/PausedContractDialogStakingContent';
import { ReviewClaimReward } from './ReviewClaimReward';

export const ClaimRewardNewDialog = ({
  validator,
}: { validator: SequencerValidatorAddress }) => {
  const {
    isSubmitting,
    isGettingReviewDetails,
    onConfirm,
    onClose,
    isReady,
    fee,
    rates,
    claimRewardError,
    isBlocked,
    blockingMessage,
  } = useClaimRewardNewDialog({ validator });
  const isPaused = useIsStakingContractPaused({
    conditions: {
      pauser: [CURRENT_NETWORK_CONTRACTS.SEQUENCER_INTERFACE],
    },
  });

  const responsiveDialogStyle = responsiveDialogStyles();

  const v2 = TOKENS[FuelToken.V2];
  const { symbol, decimals } = v2;

  return (
    <AnimatedDialog onOpenChange={(open) => !open && onClose()} open>
      {isPaused ? (
        <PausedContractDialogStakingContent />
      ) : (
        <AnimatedDialog.Content
          open
          aria-describedby="ClaimReward"
          className={responsiveDialogStyle.content({
            sizing: 'auto',
          })}
        >
          <VStack className="h-full" gap="7">
            <AnimatedDialog.Title>Review: Claim Rewards</AnimatedDialog.Title>

            <ReviewClaimReward
              validator={validator}
              decimals={decimals}
              symbol={symbol}
              errorMsg={claimRewardError}
              isSubmitting={isSubmitting}
              isGettingReviewDetails={isGettingReviewDetails}
              isReady={isReady}
              fee={fee}
              rates={rates}
              onConfirm={onConfirm}
              isBlocked={isBlocked}
              blockingMessage={blockingMessage}
            />
          </VStack>
        </AnimatedDialog.Content>
      )}
    </AnimatedDialog>
  );
};
