import { AnimatedDialog, VStack } from '@fuels/ui';
import { CURRENT_NETWORK_CONTRACTS, FuelToken, TOKENS } from 'app-commons';
import { AnimatePresence } from 'framer-motion';
import { useIsStakingContractPaused } from '~staking/hooks/useIsStakingContractPaused';
import type { SequencerValidatorAddress } from '~staking/systems/Core/utils/address';
import { ReviewStake } from '~staking/systems/Staking/components/StakeNewDialog/ReviewStake';
import { StakeAmount } from '~staking/systems/Staking/components/StakeNewDialog/StakeAmount';
import { StakeApproval } from '~staking/systems/Staking/components/StakeNewDialog/StakeApproval';
import { responsiveDialogStyles } from '~staking/systems/Staking/constants/styles/dialogContent';
import { useStakeNewDialog } from '~staking/systems/Staking/hooks/useStakeNewDialog';
import { useValidator } from '../../services/useValidator';
import {
  LastPageWrapper,
  MiddlePageWrapper,
} from '../PagesTransition/PagesTransition';
import { FirstPageWrapper } from '../PagesTransition/PagesTransition';
import { PausedContractDialogStakingContent } from '../PausedContractDialogStakingContent/PausedContractDialogStakingContent';

export const StakeNewDialog = ({
  validator: validatorInput,
}: { validator: SequencerValidatorAddress }) => {
  const {
    amount,
    totalBalance,
    isSubmitting,
    isGettingReviewDetails,
    formError,
    goToReview,
    onConfirm,
    onAmountChange,
    onClose,
    isReady,
    fee,
    rates,
    stakeError,
    isReviewPage,
    goBackToAmount,
    validator,
    validators,
    validatorController,
    amountFromSequencer,
    amountFromL1,
    needsApproval,
    goToApproval,
    isApprovalCompleted,
    isApprovalPage,
    onApprove,
    fromAccount,
    goBackToReview,
    isLoadingApproval,
    approvalError,
    isReadyToConfirm,
    navigationDirection,
    isBlocked,
    blockingMessage,
  } = useStakeNewDialog({ validator: validatorInput });
  const isPaused = useIsStakingContractPaused({
    conditions: {
      pauser: [CURRENT_NETWORK_CONTRACTS.SEQUENCER_INTERFACE],
    },
  });

  const { validator: validatorData } = useValidator(validator);

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
          aria-describedby="Stake"
          className={responsiveDialogStyle.content({
            sizing: 'auto',
          })}
          onPointerDownOutside={
            // avoid closing the dialog when clicking on the review page
            isReviewPage
              ? (e) => {
                  e.preventDefault();
                }
              : undefined
          }
          onEscapeKeyDown={
            // avoid closing the dialog when pressing escape key
            isReviewPage
              ? (e) => {
                  e.preventDefault();
                }
              : undefined
          }
        >
          <VStack className="h-full" gap="7">
            <AnimatePresence mode="wait" initial={false}>
              {isReviewPage ? (
                <MiddlePageWrapper direction={navigationDirection}>
                  <AnimatedDialog.Title>Review: Stake</AnimatedDialog.Title>
                </MiddlePageWrapper>
              ) : isApprovalPage ? (
                <LastPageWrapper>
                  <AnimatedDialog.Title>Approval</AnimatedDialog.Title>
                </LastPageWrapper>
              ) : (
                <FirstPageWrapper>
                  <AnimatedDialog.Title>Stake</AnimatedDialog.Title>
                </FirstPageWrapper>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait" initial={false}>
              {isReviewPage ? (
                <MiddlePageWrapper direction={navigationDirection}>
                  <ReviewStake
                    amount={amount}
                    decimals={decimals}
                    symbol={symbol}
                    errorMsg={stakeError}
                    isSubmitting={isSubmitting}
                    isGettingReviewDetails={isGettingReviewDetails}
                    fee={fee}
                    rates={rates}
                    onConfirm={onConfirm}
                    onBack={goBackToAmount}
                    validatorData={validatorData}
                    amountFromSequencer={amountFromSequencer}
                    amountFromL1={amountFromL1}
                    needsApproval={needsApproval}
                    onGoToApproval={goToApproval}
                    isApprovalCompleted={isApprovalCompleted}
                    isReadyToConfirm={isReadyToConfirm}
                    isBlocked={isBlocked}
                    blockingMessage={blockingMessage}
                  />
                </MiddlePageWrapper>
              ) : isApprovalPage ? (
                <LastPageWrapper>
                  <StakeApproval
                    amount={amountFromL1}
                    rates={rates}
                    onApprove={onApprove}
                    fromAccount={fromAccount}
                    onBack={goBackToReview}
                    isLoadingApproval={isLoadingApproval}
                    errorMsg={approvalError}
                  />
                </LastPageWrapper>
              ) : (
                <FirstPageWrapper>
                  <StakeAmount
                    isReady={isReady}
                    totalBalance={totalBalance}
                    decimals={decimals}
                    symbol={symbol}
                    onAmountChange={onAmountChange}
                    goToReview={goToReview}
                    amount={amount}
                    errorMsg={formError}
                    rates={rates}
                    isGettingReviewDetails={isGettingReviewDetails}
                    validators={validators || []}
                    validatorController={validatorController}
                    validatorData={validatorData}
                  />
                </FirstPageWrapper>
              )}
            </AnimatePresence>
          </VStack>
        </AnimatedDialog.Content>
      )}
    </AnimatedDialog>
  );
};
