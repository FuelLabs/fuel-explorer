import {
  Alert,
  Avatar,
  Box,
  Button,
  HStack,
  LoadingBox,
  LoadingWrapper,
  Separator,
  Text,
  TokenBadge,
  Tooltip,
  VStack,
  convertToUsd,
} from '@fuels/ui';
import { BN } from 'fuels';
import { DECIMAL_WEI } from 'fuels';
import { memo, useMemo } from 'react';
import { ErrorInline } from '~staking/systems/Core/components/ErrorInline/ErrorInline';
import { RegularInfoSection } from '~staking/systems/Core/components/RegularInfoSection/RegularInfoSection';
import { useFormattedTokenAmount } from '~staking/systems/Core/hooks/useFormattedTokenAmount';
import type { AssetRate } from '~staking/systems/Core/services/AssetsRateService';
import { formatAmount } from '~staking/systems/Core/utils/bn';

import { IconCheck, IconClock, IconInfoCircle } from '@tabler/icons-react';
import { LogoCosmos } from '~staking/systems/Core/components/LogoCosmos/LogoCosmos';
import { LogoEth } from '~staking/systems/Core/components/LogoEth/LogoEth';
import type { Validator } from '~staking/systems/Staking/types/validators';
import { getValidatorImage } from '../../utils/validatorImages';

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
            You're staking
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
          header="Selected Validator"
          text={validatorData?.description?.moniker}
          icon={
            <Avatar
              size="2"
              src={getValidatorImage(validatorData?.description?.moniker)}
              fallback={''}
            />
          }
        />
        <Separator size="4" />
        <Box className="flex flex-col gap-2">
          <Text size="2" weight="medium" className="text-gray-10">
            Sourced from
          </Text>
          {hasAmountFromSequencer && (
            <HStack gap="2" align="center">
              <LogoCosmos />
              <HStack gap="1" align="center">
                <Text weight="medium" className="text-heading text-base">
                  My Account
                </Text>
                <Text
                  weight="medium"
                  className="text-gray-10 text-sm leading-tight"
                >
                  (Balance in Sequencer)
                </Text>
              </HStack>
            </HStack>
          )}
          {hasAmountFromL1 && (
            <HStack gap="2" align="center">
              <LogoEth size="medium" />
              <HStack gap="1" align="center">
                <Text weight="medium" className="text-heading text-base">
                  My Account
                </Text>
                <Text
                  weight="medium"
                  className="text-gray-10 text-sm leading-tight"
                >
                  (Balance in Ethereum)
                </Text>
              </HStack>
              {needsApproval && (
                <Button size="1" onClick={onGoToApproval}>
                  Approve
                </Button>
              )}
              {isApprovalCompleted && (
                <Tooltip content="FUEL token spending is approved.">
                  <IconCheck size={24} className="shrink-0 text-green-11" />
                </Tooltip>
              )}
            </HStack>
          )}
        </Box>
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
        {hasAmountFromL1 && hasAmountFromSequencer && (
          <>
            <Separator size="4" />
            <HStack gap="2">
              <IconInfoCircle size={24} className="shrink-0 text-blue-11" />
              <VStack gap="1">
                <Text className="text-heading">
                  This Staking operation will require two transactions.
                </Text>
                <Text className="text-gray-10 text-sm">
                  This transaction will be funded by both your 'Balance on
                  Ethereum' and your 'Balance in Sequencer'. Therefore, this
                  operation will require two separate transactions to be
                  executed.
                </Text>
              </VStack>
            </HStack>
          </>
        )}
      </div>
      <div>
        {isBlocked && (
          <Alert color="orange" variant="surface" className="mb-4">
            <Alert.Icon>
              <IconClock size={18} className="text-orange-11" />
            </Alert.Icon>
            <Alert.Text className="text-orange-12">
              <Text size="2" weight="medium" className="block mb-1">
                Stake Currently Unavailable
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
            onClick={needsApproval ? onGoToApproval : onConfirm}
            disabled={(!isReadyToConfirm && !needsApproval) || isBlocked}
            isLoading={isSubmitting}
            loadingText="Submitting..."
          >
            {errorMsg ? 'Retry' : needsApproval ? 'Approve' : 'Submit Stake'}
          </Button>
        </HStack>
      </div>
    </div>
  );
}

export const ReviewStake = memo(_ReviewStake);
