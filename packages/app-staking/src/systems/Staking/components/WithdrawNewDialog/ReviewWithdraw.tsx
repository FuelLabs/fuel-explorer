import { BN } from 'fuels';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { RegularInfoSection } from '~staking/systems/Core/components/RegularInfoSection/RegularInfoSection';
import { useFormattedTokenAmount } from '~staking/systems/Core/hooks/useFormattedTokenAmount';
import type { AssetRate } from '~staking/systems/Core/services/AssetsRateService';
import {
  AccountRow,
  NetworkFeeRow,
  ReviewLayout,
} from '../ReviewLayout/ReviewLayout';

interface Props {
  amount: BN | null;
  decimals: number;
  symbol: string;
  errorMsg?: string | null;
  isSubmitting: boolean;
  isReady: boolean;
  fee: BN;
  rates: AssetRate[];
  isGettingReviewDetails: boolean;
  onConfirm: () => void;
  onBack: () => void;
  isBlocked?: boolean;
  blockingMessage?: string;
  finalizationPeriod?: string;
}

function _ReviewWithdraw({
  amount,
  decimals,
  symbol,
  errorMsg,
  isSubmitting,
  isReady,
  fee = new BN(0),
  rates = [],
  onConfirm,
  isGettingReviewDetails,
  onBack,
  isBlocked = false,
  blockingMessage,
  finalizationPeriod,
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

  return (
    <ReviewLayout
      label={t('staking.dialog.withdrawing_now')}
      symbol={symbol}
      amount={formattedAmount.display}
      fullAmount={tooltipAmount ? originalAmount.display : undefined}
      usd={`(${formattedAmountUsd})`}
      warning={
        isBlocked
          ? {
              title: t('staking.dialog.withdraw_unavailable'),
              message: blockingMessage,
            }
          : undefined
      }
      error={errorMsg}
      onBack={onBack}
      isBackDisabled={isSubmitting}
      confirmLabel={t('staking.dialog.submit_withdraw')}
      onConfirm={onConfirm}
      isConfirmDisabled={!isReady || isBlocked || isGettingReviewDetails}
      isLoading={isSubmitting || isGettingReviewDetails}
      loadingText={
        isGettingReviewDetails
          ? t('staking.review.checking')
          : t('staking.review.submitting')
      }
      confirmTitle={isBlocked ? blockingMessage : ''}
    >
      <AccountRow header={t('staking.review.from')} kind="sequencer" />
      <AccountRow header={t('staking.review.to')} kind="ethereum" />
      <NetworkFeeRow
        fee={fee}
        ethRate={ratesData.eth}
        isLoading={isGettingReviewDetails}
      />
      {finalizationPeriod && (
        <RegularInfoSection
          header={t('staking.review.time_to_complete')}
          text={finalizationPeriod}
        />
      )}
    </ReviewLayout>
  );
}

export const ReviewWithdraw = memo(_ReviewWithdraw);
