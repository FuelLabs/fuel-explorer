import { AnimatedDialog, VStack } from '@fuels/ui';
import { CURRENT_NETWORK_CONTRACTS, FuelToken, TOKENS } from 'app-commons';
import { AnimatePresence } from 'framer-motion';
import { useIsStakingContractPaused } from '~staking/hooks/useIsStakingContractPaused';
import { ReviewWithdraw } from '~staking/systems/Staking/components/WithdrawNewDialog/ReviewWithdraw';
import { WithdrawAmount } from '~staking/systems/Staking/components/WithdrawNewDialog/WithdrawAmount';
import { responsiveDialogStyles } from '~staking/systems/Staking/constants/styles/dialogContent';
import { useWithdrawNewDialog } from '~staking/systems/Staking/hooks/useWithdrawNewDialog';
import { LastPageWrapper } from '../PagesTransition/PagesTransition';
import { FirstPageWrapper } from '../PagesTransition/PagesTransition';
import { PausedContractDialogStakingContent } from '../PausedContractDialogStakingContent/PausedContractDialogStakingContent';

export const WithdrawNewDialog = () => {
  const {
    amount,
    balance,
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
    withdrawError,
    isReviewPage,
    goBackToAmount,
    isBlocked,
    blockingMessage,
    state,
  } = useWithdrawNewDialog();

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
          aria-describedby="Withdraw"
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
                  <AnimatedDialog.Title>Withdraw</AnimatedDialog.Title>
                </FirstPageWrapper>
              ) : (
                <LastPageWrapper>
                  <AnimatedDialog.Title>Review: Withdraw</AnimatedDialog.Title>
                </LastPageWrapper>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait" initial={false}>
              {!isReviewPage ? (
                <FirstPageWrapper>
                  <WithdrawAmount
                    isReady={isReady}
                    balance={balance}
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
                  <ReviewWithdraw
                    state={state}
                    amount={amount}
                    decimals={decimals}
                    symbol={symbol}
                    errorMsg={withdrawError}
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
