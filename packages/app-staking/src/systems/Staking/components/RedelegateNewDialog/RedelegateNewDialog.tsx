import { AnimatedDialog, VStack } from '@fuels/ui';
import { CURRENT_NETWORK_CONTRACTS, FuelToken, TOKENS } from 'app-commons';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useIsStakingContractPaused } from '~staking/hooks/useIsStakingContractPaused';
import type { SequencerValidatorAddress } from '~staking/systems/Core/utils/address';
import { RedelegateAmount } from '~staking/systems/Staking/components/RedelegateNewDialog/RedelegateAmount';
import { ReviewRedelegate } from '~staking/systems/Staking/components/RedelegateNewDialog/ReviewRedelegate';
import { responsiveDialogStyles } from '~staking/systems/Staking/constants/styles/dialogContent';
import { useRedelegateNewDialog } from '~staking/systems/Staking/hooks/useRedelegateNewDialog';
import { useValidator } from '../../services/useValidator';
import { LastPageWrapper } from '../PagesTransition/PagesTransition';
import { FirstPageWrapper } from '../PagesTransition/PagesTransition';
import { PausedContractDialogStakingContent } from '../PausedContractDialogStakingContent/PausedContractDialogStakingContent';
import { StepIndicator } from '../StepIndicator/StepIndicator';
export const RedelegateNewDialog = ({
  validator,
}: { validator: SequencerValidatorAddress }) => {
  const { t } = useTranslation();
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
    redelegateError,
    isReviewPage,
    goBackToAmount,
    validators,
    toValidatorController,
    isBlocked,
    blockingMessage,
  } = useRedelegateNewDialog({ validator });
  const isPaused = useIsStakingContractPaused({
    conditions: {
      pauser: [CURRENT_NETWORK_CONTRACTS.SEQUENCER_INTERFACE],
    },
  });

  const { validator: toValidatorData } = useValidator(
    toValidatorController.field.value,
  );
  const { validator: fromValidatorData } = useValidator(validator);

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
          aria-describedby="Redelegate"
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
            <div className="flex items-center justify-between gap-4">
              <AnimatePresence mode="wait" initial={false}>
                {!isReviewPage ? (
                  <FirstPageWrapper>
                    <AnimatedDialog.Title>
                      {t('staking.dialog.redelegate')}
                    </AnimatedDialog.Title>
                  </FirstPageWrapper>
                ) : (
                  <LastPageWrapper>
                    <AnimatedDialog.Title>
                      {t('staking.dialog.review_redelegate')}
                    </AnimatedDialog.Title>
                  </LastPageWrapper>
                )}
              </AnimatePresence>
              <StepIndicator
                current={isReviewPage ? 1 : 0}
                total={2}
                label={t('staking.dialog.step_of', {
                  current: (isReviewPage ? 1 : 0) + 1,
                  total: 2,
                })}
              />
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {!isReviewPage ? (
                <FirstPageWrapper>
                  <RedelegateAmount
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
                    validators={validators || []}
                    toValidatorController={toValidatorController}
                    toValidatorData={toValidatorData}
                  />
                </FirstPageWrapper>
              ) : (
                <LastPageWrapper>
                  <ReviewRedelegate
                    amount={amount}
                    decimals={decimals}
                    symbol={symbol}
                    errorMsg={redelegateError}
                    isSubmitting={isSubmitting}
                    isGettingReviewDetails={isGettingReviewDetails}
                    isReady={isReady}
                    fee={fee}
                    rates={rates}
                    onConfirm={onConfirm}
                    onBack={goBackToAmount}
                    fromValidatorData={fromValidatorData}
                    toValidatorData={toValidatorData}
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
