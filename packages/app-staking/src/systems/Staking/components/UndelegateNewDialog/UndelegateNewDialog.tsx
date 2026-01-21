import { AnimatedDialog, VStack } from '@fuels/ui';
import { TOKENS } from 'app-commons';
import { FuelToken } from 'app-commons';
import { CURRENT_NETWORK_CONTRACTS } from 'app-commons';
import { AnimatePresence } from 'framer-motion';
import { useIsStakingContractPaused } from '~staking/hooks/useIsStakingContractPaused';
import type { SequencerValidatorAddress } from '~staking/systems/Core/utils/address';
import { responsiveDialogStyles } from '../../constants/styles/dialogContent';
import { useUndelegateNewDialog } from '../../hooks/useUndelegateNewDialog';
import { useValidator } from '../../services/useValidator';
import { FirstPageWrapper } from '../PagesTransition/PagesTransition';
import { LastPageWrapper } from '../PagesTransition/PagesTransition';
import { PausedContractDialogStakingContent } from '../PausedContractDialogStakingContent/PausedContractDialogStakingContent';
import { ReviewUndelegate } from './ReviewUndelegate';
import { UndelegateAmount } from './UndelegateAmount';
const v2 = TOKENS[FuelToken.V2];
const { symbol, decimals } = v2;

export const UndelegateNewDialog = ({
  validator,
}: { validator: SequencerValidatorAddress }) => {
  const {
    amount,
    stakedAmount,
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
    undelegateError,
    isReviewPage,
    goBackToAmount,
    isBlocked,
    blockingMessage,
  } = useUndelegateNewDialog({ validator });
  const isPaused = useIsStakingContractPaused({
    conditions: {
      pauser: [CURRENT_NETWORK_CONTRACTS.SEQUENCER_INTERFACE],
    },
  });

  const { validator: validatorData } = useValidator(validator);

  const responsiveDialogStyle = responsiveDialogStyles();

  return (
    <AnimatedDialog onOpenChange={(open) => !open && onClose()} open>
      {isPaused ? (
        <PausedContractDialogStakingContent />
      ) : (
        <AnimatedDialog.Content
          open
          aria-describedby="Undelegate"
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
              {!isReviewPage ? (
                <FirstPageWrapper>
                  <AnimatedDialog.Title>Undelegate</AnimatedDialog.Title>
                </FirstPageWrapper>
              ) : (
                <LastPageWrapper>
                  <AnimatedDialog.Title>
                    Review: Undelegate
                  </AnimatedDialog.Title>
                </LastPageWrapper>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait" initial={false}>
              {!isReviewPage ? (
                <FirstPageWrapper>
                  <UndelegateAmount
                    isReady={isReady}
                    stakedAmount={stakedAmount}
                    decimals={decimals}
                    symbol={symbol}
                    onAmountChange={onAmountChange}
                    goToReview={goToReview}
                    amount={amount}
                    errorMsg={formError}
                    rates={rates}
                    isGettingReviewDetails={isGettingReviewDetails}
                  />
                </FirstPageWrapper>
              ) : (
                <LastPageWrapper>
                  <ReviewUndelegate
                    validator={validatorData}
                    amount={amount}
                    decimals={decimals}
                    symbol={symbol}
                    errorMsg={undelegateError}
                    isSubmitting={isSubmitting}
                    isGettingReviewDetails={isGettingReviewDetails}
                    isReady={isReady}
                    fee={fee}
                    rates={rates}
                    onConfirm={onConfirm}
                    onBack={goBackToAmount}
                    isBlocked={isBlocked}
                    blockingMessage={blockingMessage}
                  />
                </LastPageWrapper>
              )}
            </AnimatePresence>
          </VStack>
        </AnimatedDialog.Content>
      )}
    </AnimatedDialog>
  );
};
