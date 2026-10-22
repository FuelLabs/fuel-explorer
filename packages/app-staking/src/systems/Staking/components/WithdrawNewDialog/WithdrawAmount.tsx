import { Button, IconArrowRight, VStack } from '@fuels/ui';
import type { BN } from 'fuels';
import { useTranslation } from 'react-i18next';
import type { AssetRate } from '~staking/systems/Core/services/AssetsRateService';
import { WithdrawInput } from './WithdrawInput';

interface WithdrawAmountProps {
  isReady: boolean;
  amount: BN | null;
  balance: BN | undefined;
  decimals: number;
  symbol: string;
  onAmountChange: (value: BN | null) => void;
  goToReview: () => void;
  errorMsg?: string | null;
  isGettingReviewDetails?: boolean;
  rates?: AssetRate[];
}

export function WithdrawAmount({
  isReady,
  amount,
  balance,
  decimals,
  symbol,
  onAmountChange,
  goToReview,
  errorMsg,
  isGettingReviewDetails,
  rates,
}: WithdrawAmountProps) {
  const { t } = useTranslation();
  return (
    <form className="flex flex-col flex-1 gap-8">
      <VStack gap="8" justify="center" className="flex-1">
        <VStack gap="0">
          <span className="fuel-label mb-2">
            {t('staking.dialog.how_much_withdraw')}
          </span>
          <WithdrawInput
            amount={amount}
            balance={balance}
            decimals={decimals}
            symbol={symbol}
            error={errorMsg}
            handleChange={onAmountChange}
            rates={rates}
          />
        </VStack>
      </VStack>

      <Button
        size="3"
        className="w-full"
        disabled={!isReady || !amount?.gt(0) || !!errorMsg}
        onClick={goToReview}
        type="button"
        isLoading={isGettingReviewDetails}
        rightIcon={errorMsg ? undefined : IconArrowRight}
      >
        {errorMsg ? errorMsg : t('staking.dialog.review')}
      </Button>
    </form>
  );
}
