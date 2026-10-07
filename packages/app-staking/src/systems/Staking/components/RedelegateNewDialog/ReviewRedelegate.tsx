import { BN } from 'fuels';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
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
  fromValidatorData?: Validator;
  toValidatorData?: Validator;
  isBlocked?: boolean;
  blockingMessage?: string;
}

function _ReviewRedelegate({
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
  fromValidatorData,
  toValidatorData,
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

  return (
    <ReviewLayout
      label={t('staking.dialog.redelegating_now')}
      symbol={symbol}
      amount={formattedAmount.display}
      fullAmount={tooltipAmount ? originalAmount.display : undefined}
      usd={`(${formattedAmountUsd})`}
      warning={
        isBlocked
          ? {
              title: t('staking.dialog.please_wait'),
              message: blockingMessage,
            }
          : undefined
      }
      error={errorMsg}
      onBack={onBack}
      isBackDisabled={isSubmitting}
      confirmLabel={t('staking.dialog.submit_redelegate')}
      onConfirm={onConfirm}
      isConfirmDisabled={!isReady || isBlocked || isGettingReviewDetails}
      isLoading={isSubmitting || isGettingReviewDetails}
      loadingText={
        isGettingReviewDetails
          ? t('staking.review.checking')
          : t('staking.review.submitting')
      }
    >
      <ValidatorRow
        header={t('staking.review.from')}
        moniker={fromValidatorData?.description?.moniker}
      />
      <ValidatorRow
        header={t('staking.review.to')}
        moniker={toValidatorData?.description?.moniker}
      />
      <NetworkFeeRow
        fee={fee}
        ethRate={ratesData.eth}
        isLoading={isGettingReviewDetails}
      />
    </ReviewLayout>
  );
}

export const ReviewRedelegate = memo(_ReviewRedelegate);
