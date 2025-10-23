import {
  Avatar,
  Button,
  LoadingBox,
  LoadingWrapper,
  Separator,
  Text,
  TokenBadge,
  Tooltip,
  convertToUsd,
} from '@fuels/ui';
import { BN } from 'fuels';
import { DECIMAL_WEI } from 'fuels';
import { memo, useMemo } from 'react';
import { useAccount } from 'wagmi';
import { ErrorInline } from '~staking/systems/Core/components/ErrorInline/ErrorInline';
import { LogoCosmos } from '~staking/systems/Core/components/LogoCosmos/LogoCosmos';
import { RegularInfoSection } from '~staking/systems/Core/components/RegularInfoSection/RegularInfoSection';
import type { AssetRate } from '~staking/systems/Core/services/AssetsRateService';
import type { SequencerValidatorAddress } from '~staking/systems/Core/utils/address';
import { formatAmount } from '~staking/systems/Core/utils/bn';
import { useValidator } from '../../services/useValidator';
import { useValidatorRewards } from '../../services/useValidatorRewards/useValidatorRewards';
import { getValidatorImage } from '../../utils/validatorImages';

interface Props {
  decimals: number;
  symbol: string;
  errorMsg?: string | null;
  isSubmitting: boolean;
  isReady: boolean;
  fee: BN;
  rates: AssetRate[];
  isGettingReviewDetails: boolean;
  onConfirm: () => void;
  validator: SequencerValidatorAddress;
}

function _ReviewClaimReward({
  decimals,
  symbol,
  errorMsg,
  isSubmitting,
  isReady,
  fee = new BN(0),
  rates = [],
  onConfirm,
  isGettingReviewDetails,
  validator,
}: Props) {
  const { validator: validatorData, isLoading: isLoadingValidatorData } =
    useValidator(validator);
  const { address } = useAccount();
  const { data: rewardsData } = useValidatorRewards(validator, address, {
    select: ({ rewards }) => rewards,
  });
  const rewardBN = useMemo(() => {
    return rewardsData?.reduce((acc, curr) => {
      return acc.add(new BN(curr.amount.split('.')[0] ?? 0));
    }, new BN(0));
  }, [rewardsData]);
  const ratesData = useMemo(() => {
    const tokenRate = rates?.find(
      (rate) => rate.symbol.toLowerCase() === symbol.toLowerCase(),
    );

    const ethRate = rates?.find((rate) => rate.symbol.toLowerCase() === 'eth');

    return {
      token: tokenRate?.rate || 0,
      eth: ethRate?.rate || 0,
    };
  }, [rates, symbol]);

  const {
    formatted: formattedAmount,
    original: originalAmount,
    tooltip: tooltipAmount,
  } = useMemo(() => {
    return formatAmount(rewardBN, decimals);
  }, [rewardBN, decimals]);

  const {
    formatted: formattedFee,
    // original: originalFee,
    // tooltip: tooltipFee,
  } = useMemo(() => {
    return formatAmount(fee, DECIMAL_WEI);
  }, [fee]);

  const { formatted: formattedAmountUsd } = useMemo(() => {
    return convertToUsd(rewardBN || new BN(0), decimals, ratesData.token);
  }, [rewardBN, decimals, ratesData.token]);

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
            Amount to claim
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
            <LoadingWrapper
              isLoading={isGettingReviewDetails}
              loadingEl={<LoadingBox className="w-20 h-5" />}
              regularEl={
                <Text weight="regular" className="text-muted text-lg">
                  ({formattedAmountUsd})
                </Text>
              }
            />
          </div>
        </div>
        <Separator size="4" />
        <RegularInfoSection
          header="From"
          icon={
            <Avatar
              size="2"
              src={getValidatorImage(validatorData?.description?.moniker)}
              fallback={''}
            />
          }
          text={validatorData?.description?.moniker}
          isLoading={isLoadingValidatorData}
          loadingEl={<LoadingBox className="w-36 h-6" />}
        />
        <Separator size="4" />
        <RegularInfoSection
          header="To"
          text="My Account"
          textSupport="(Balance in Sequencer)"
          icon={<LogoCosmos />}
        />
        <Separator size="4" />
        <RegularInfoSection
          header="Network Fee"
          text={formattedFeeUsd}
          textSupport={
            isGettingReviewDetails ? undefined : `(${formattedFee.display} ETH)`
          }
          // textSupportTooltip={
          //   tooltipFee ? `${originalFee.display} ETH` : undefined
          // }
          isLoading={isGettingReviewDetails}
        />
      </div>
      <div>
        <ErrorInline error={errorMsg} className="mb-1" />
        <Button
          type="button"
          className="rounded-md w-full"
          size="3"
          onClick={onConfirm}
          disabled={!isReady}
          isLoading={isSubmitting}
          loadingText="Submitting..."
        >
          {errorMsg ? 'Retry' : 'Claim Rewards'}
        </Button>
      </div>
    </div>
  );
}

export const ReviewClaimReward = memo(_ReviewClaimReward);
