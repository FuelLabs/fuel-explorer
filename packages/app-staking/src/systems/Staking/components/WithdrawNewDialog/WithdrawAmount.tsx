import { Button, Text, VStack } from '@fuels/ui';
import type { BN } from 'fuels';
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
  return (
    <form className="flex flex-col flex-1 gap-8">
      <VStack gap="8" justify="center" className="flex-1">
        <VStack gap="0">
          <Text className="font-medium text-gray-12 mb-1">
            How much would you like to withdraw?
          </Text>
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
        variant="solid"
        color="green"
        size="4"
        className="w-full font-medium text-[0.8125rem] leading-[20px]"
        disabled={!isReady || !amount?.gt(0) || !!errorMsg}
        onClick={goToReview}
        type="button"
        isLoading={isGettingReviewDetails}
      >
        {errorMsg ? errorMsg : 'Review →'}
      </Button>
    </form>
  );
}
