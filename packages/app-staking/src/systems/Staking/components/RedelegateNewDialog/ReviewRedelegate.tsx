import {
  Alert,
  Avatar,
  Button,
  HStack,
  LoadingBox,
  LoadingWrapper,
  Separator,
  Text,
  TokenBadge,
  Tooltip,
  convertToUsd,
} from '@fuels/ui';
import { IconClock } from '@tabler/icons-react';
import { BN } from 'fuels';
import { DECIMAL_WEI } from 'fuels';
import { memo, useMemo } from 'react';
import { ErrorInline } from '~staking/systems/Core/components/ErrorInline/ErrorInline';
import { RegularInfoSection } from '~staking/systems/Core/components/RegularInfoSection/RegularInfoSection';
import { useFormattedTokenAmount } from '~staking/systems/Core/hooks/useFormattedTokenAmount';
import type { AssetRate } from '~staking/systems/Core/services/AssetsRateService';
import { formatAmount } from '~staking/systems/Core/utils/bn';

import type { Validator } from '~staking/systems/Staking/types/validators';
import { getValidatorImage } from '../../utils/validatorImages';

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

  const { formatted: formattedFee } = useMemo(() => {
    return formatAmount(fee, DECIMAL_WEI);
  }, [fee]);

  const { formatted: formattedFeeUsd } = useMemo(() => {
    if (isGettingReviewDetails) {
      return { formatted: '0', original: new BN(0) };
    }
    return convertToUsd(fee, DECIMAL_WEI, ratesData.eth);
  }, [fee, ratesData.eth, isGettingReviewDetails]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Text size="3" weight="medium">
            You're redelegating
          </Text>
          <div className="flex items-center gap-2">
            <TokenBadge image="/assets/fuel.png" symbol={symbol} size="small" />
            <Tooltip
              content={`${originalAmount.display} ${symbol}`}
              delayDuration={0}
              open={tooltipAmount ? undefined : false}
            >
              <Text
                weight="bold"
                className="font-mono text-[24px] text-gray-12"
              >
                {formattedAmount.display}
              </Text>
            </Tooltip>
            <Text weight="regular" className="text-muted text-lg">
              ({formattedAmountUsd})
            </Text>
          </div>
        </div>
        <Separator size="4" />
        <RegularInfoSection
          header="From"
          text={fromValidatorData?.description?.moniker}
          icon={
            <Avatar
              size="2"
              src={getValidatorImage(fromValidatorData?.description?.moniker)}
              fallback={''}
            />
          }
        />
        <Separator size="4" />
        <RegularInfoSection
          header="To"
          text={toValidatorData?.description?.moniker}
          icon={
            <Avatar
              size="2"
              src={getValidatorImage(toValidatorData?.description?.moniker)}
              fallback={''}
            />
          }
        />
        <Separator size="4" />
        <RegularInfoSection
          header="Network Fee"
          text={
            <LoadingWrapper
              isLoading={isGettingReviewDetails}
              loadingEl={<LoadingBox className="w-[120px] h-[16px] my-1" />}
              regularEl={formattedFeeUsd}
            />
          }
          textSupport={
            isGettingReviewDetails ? undefined : `(${formattedFee.display} ETH)`
          }
        />
      </div>
      <div>
        {isBlocked && (
          <Alert color="orange" variant="surface" className="mb-4">
            <Alert.Icon>
              <IconClock size={18} className="text-orange-11" />
            </Alert.Icon>
            <Alert.Text className="text-orange-12">
              <Text size="2" weight="medium" className="block mb-1">
                Please Wait
              </Text>
              <Text size="1">{blockingMessage}</Text>
            </Alert.Text>
          </Alert>
        )}
        <ErrorInline error={errorMsg} className="mb-1" />
        <HStack gap="3" className="w-full">
          <Button
            variant="outline"
            color="gray"
            type="button"
            className="rounded-md flex-1"
            size="3"
            onClick={onBack}
            disabled={isSubmitting}
          >
            ← Back
          </Button>
          <Button
            type="button"
            className="rounded-md flex-1"
            size="3"
            onClick={onConfirm}
            disabled={!isReady || isBlocked}
            isLoading={isSubmitting}
            loadingText="Submitting..."
          >
            {errorMsg ? 'Retry' : 'Submit Redelegate'}
          </Button>
        </HStack>
      </div>
    </div>
  );
}

export const ReviewRedelegate = memo(_ReviewRedelegate);
