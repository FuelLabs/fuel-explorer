import { Button, IconCheck, Tooltip } from '@fuels/ui';
import { BN } from 'fuels';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { LogoCosmos } from '~staking/systems/Core/components/LogoCosmos/LogoCosmos';
import { LogoEth } from '~staking/systems/Core/components/LogoEth/LogoEth';
import { useFormattedTokenAmount } from '~staking/systems/Core/hooks/useFormattedTokenAmount';
import type { AssetRate } from '~staking/systems/Core/services/AssetsRateService';
import type { Validator } from '~staking/systems/Staking/types/validators';
import {
  NetworkFeeRow,
  ReviewLayout,
  ValidatorRow,
} from '../ReviewLayout/ReviewLayout';

interface Props {
  amount: BN | null;
  amountFromSequencer?: BN;
  amountFromL1?: BN;
  decimals: number;
  symbol: string;
  errorMsg?: string | null;
  isSubmitting: boolean;
  fee: BN;
  rates: AssetRate[];
  isGettingReviewDetails: boolean;
  onConfirm: () => void;
  onBack: () => void;
  validatorData?: Validator;
  needsApproval?: boolean;
  onGoToApproval?: () => void;
  isApprovalCompleted?: boolean;
  isReadyToConfirm?: boolean;
  isBlocked?: boolean;
  blockingMessage?: string;
}

function _ReviewStake({
  amount,
  amountFromSequencer,
  amountFromL1,
  decimals,
  symbol,
  errorMsg,
  isSubmitting,
  fee = new BN(0),
  rates = [],
  onConfirm,
  isGettingReviewDetails,
  onBack,
  validatorData,
  needsApproval,
  onGoToApproval,
  isApprovalCompleted,
  isReadyToConfirm,
  isBlocked = false,
  blockingMessage,
}: Props) {
  const { t } = useTranslation();
  const {
    formattedAmount,
    originalAmount,
    tooltipAmount,
    formattedAmountUsd,
    ratesData,
  } = useFormattedTokenAmount({
    amount,
    decimals,
    symbol,
    rates,
  });

  const hasAmountFromL1 = amountFromL1?.gt(0);
  const hasAmountFromSequencer = amountFromSequencer?.gt(0);

  return (
    <ReviewLayout
      label={t('staking.dialog.staking_now')}
      symbol={symbol}
      amount={formattedAmount.display}
      fullAmount={tooltipAmount ? originalAmount.display : undefined}
      usd={`(${formattedAmountUsd})`}
      warning={
        isBlocked
          ? {
              title: t('staking.dialog.stake_unavailable'),
              message: blockingMessage,
            }
          : undefined
      }
      error={errorMsg}
      onBack={onBack}
      isBackDisabled={isSubmitting}
      confirmLabel={
        needsApproval
          ? t('staking.review.approve')
          : t('staking.dialog.submit_stake')
      }
      onConfirm={() => (needsApproval ? onGoToApproval?.() : onConfirm())}
      isConfirmDisabled={
        (!isReadyToConfirm && !needsApproval) ||
        isBlocked ||
        isGettingReviewDetails
      }
      isLoading={isSubmitting || isGettingReviewDetails}
      loadingText={
        isGettingReviewDetails
          ? t('staking.review.checking')
          : t('staking.review.submitting')
      }
    >
      <ValidatorRow
        header={t('staking.dialog.selected_validator')}
        moniker={validatorData?.description?.moniker}
      />
      <div className="flex flex-col gap-2">
        <span className="fuel-label">{t('staking.dialog.sourced_from')}</span>
        {hasAmountFromSequencer && (
          <div className="flex items-center gap-2">
            <LogoCosmos />
            <span className="text-[16px] font-medium text-heading">
              {t('staking.review.my_account')}
            </span>
            <span className="text-[14px] text-[var(--fuel-element-low-em)]">
              {t('staking.review.balance_sequencer')}
            </span>
          </div>
        )}
        {hasAmountFromL1 && (
          <div className="flex items-center gap-2">
            <LogoEth size="medium" />
            <span className="text-[16px] font-medium text-heading">
              {t('staking.review.my_account')}
            </span>
            <span className="text-[14px] text-[var(--fuel-element-low-em)]">
              {t('staking.review.balance_ethereum')}
            </span>
            {needsApproval && (
              <Button size="1" type="button" onClick={onGoToApproval}>
                {t('staking.review.approve')}
              </Button>
            )}
            {isApprovalCompleted && (
              <Tooltip content={t('staking.dialog.approved')}>
                <IconCheck
                  size={20}
                  className="fuel-appear shrink-0 text-[var(--fuel-brand-text)]"
                />
              </Tooltip>
            )}
          </div>
        )}
      </div>
      <NetworkFeeRow
        fee={fee}
        ethRate={ratesData.eth}
        isLoading={isGettingReviewDetails}
      />
      {hasAmountFromL1 && hasAmountFromSequencer && (
        <div className="flex items-start gap-3">
          <span aria-hidden className="fuel-square mt-[5px] shrink-0" />
          <div className="flex flex-col gap-1">
            <span className="text-[16px] text-heading">
              {t('staking.dialog.two_tx_title')}
            </span>
            <span className="text-[14px] leading-[18px] text-[var(--fuel-element-low-em)]">
              {t('staking.dialog.two_tx_body')}
            </span>
          </div>
        </div>
      )}
    </ReviewLayout>
  );
}

export const ReviewStake = memo(_ReviewStake);
