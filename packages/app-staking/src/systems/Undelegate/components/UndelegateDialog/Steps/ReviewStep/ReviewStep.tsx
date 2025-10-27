import {
  HStack,
  LoadingBox,
  LoadingWrapper,
  Separator,
  Text,
  Tooltip,
} from '@fuels/ui';
import { TokenBadge, convertToUsd } from '@fuels/ui';
import { FuelToken, type HexAddress, TOKENS } from 'app-commons';
import { type BN, DECIMAL_WEI } from 'fuels';
import { memo, useMemo } from 'react';
import { AnimatedError } from '~staking/systems/Core/components/AnimatedError/AnimatedError';

import { formatAmount } from '~staking/systems/Core/utils/bn';

import { IconSquareLetterX } from '@tabler/icons-react';
import type { SequencerValidatorAddress } from '~staking/systems/Core';
import type { AssetRate } from '~staking/systems/Core/services/AssetsRateService';
import { ButtonConfirm } from './ButtonConfirm';

const { symbol: fuelSymbol, decimals } = TOKENS[FuelToken.V2];

interface Props {
  amount: BN;
  error: string | null;
  fee: BN;
  rates: AssetRate[];
  validatorName: string | null | undefined;
  validatorAddress: HexAddress | SequencerValidatorAddress | null;
  onSubmit: () => void;
  isLoadingValidator: boolean;
  submitData: {
    label: string;
    disabled: boolean;
  };
}

function _ReviewStep({
  amount,
  error,
  fee,
  rates: incomingRates,
  validatorName,
  validatorAddress,
  submitData,
  onSubmit,
  isLoadingValidator,
}: Props) {
  const rates = useMemo(() => {
    const fuelRate = incomingRates?.find(
      (rate) => rate.symbol.toLowerCase() === fuelSymbol.toLowerCase(),
    );

    const ethRate = incomingRates?.find(
      (rate) => rate.symbol.toLowerCase() === 'eth',
    );

    return {
      fuel: fuelRate?.rate || 0,
      eth: ethRate?.rate || 0,
    };
  }, []);

  const {
    formatted: formattedAmount,
    original: originalAmount,
    tooltip: tooltipAmount,
  } = useMemo(() => {
    return formatAmount(amount, decimals);
  }, [amount]);

  const {
    formatted: formattedFee,
    original: originalFee,
    tooltip: tooltipFee,
  } = useMemo(() => {
    return formatAmount(fee, DECIMAL_WEI);
  }, [fee]);

  const { formatted: formattedAmountUsd } = useMemo(() => {
    return convertToUsd(amount, decimals, rates.fuel);
  }, [amount, rates.fuel]);

  const { formatted: formattedFeeUsd } = useMemo(() => {
    return convertToUsd(fee, DECIMAL_WEI, rates.eth);
  }, [fee, rates.eth]);

  return (
    <div className="flex flex-col gap-8 mt-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Text size="3" weight="medium">
            You're undelegating
          </Text>
          <div className="flex items-center gap-2">
            <TokenBadge
              image="/assets/fuel.png"
              symbol={fuelSymbol}
              size="small"
            />
            <Tooltip
              content={`${originalAmount.display} ${fuelSymbol}`}
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
          </div>

          <div className="flex items-center gap-1">
            <Text size="2" weight="bold" className="text-gray-10">
              Relative value in USD:{' '}
            </Text>
            <LoadingWrapper
              isLoading={!rates.fuel}
              loadingEl={<LoadingBox className="w-[40px] h-[12px] my-1" />}
              regularEl={
                <Text size="2" weight="bold" className="text-gray-12">
                  {formattedAmountUsd}
                </Text>
              }
            />
          </div>
        </div>
        <Separator size="4" />
        <div className="flex flex-col gap-1">
          <Text size="2" weight="medium" className="text-gray-10">
            From
          </Text>
          <LoadingWrapper
            isLoading={isLoadingValidator}
            regularEl={
              <Text size="3" weight="medium" className="text-gray-12">
                {validatorName || validatorAddress}
              </Text>
            }
            loadingEl={<LoadingBox className="w-[120px] h-[16px] my-1" />}
          />
        </div>
        <Separator size="4" />
        <div className="flex flex-col gap-1">
          <Text size="2" weight="medium" className="text-gray-10">
            To
          </Text>
          <Text size="3" weight="medium" className="text-gray-12">
            My Account{' '}
            <span className="text-sm text-gray-10">(Balance in Sequencer)</span>
          </Text>
        </div>
        <Separator size="4" />
        <div className="flex flex-col gap-1">
          <Text size="2" weight="medium" className="text-gray-10">
            Fee (network)
          </Text>
          <LoadingWrapper
            isLoading={!fee || fee.isZero() || !rates.eth}
            loadingEl={<LoadingBox className="w-[120px] h-[16px] my-1" />}
            regularEl={
              <Text size="3" weight="medium" className="text-gray-12">
                {formattedFeeUsd}{' '}
                <Tooltip
                  content={`${originalFee.display} ETH`}
                  delayDuration={0}
                  open={tooltipFee ? undefined : false}
                >
                  <span className="text-sm text-gray-10">
                    ({formattedFee.display} ETH)
                  </span>
                </Tooltip>
              </Text>
            }
          />
        </div>
      </div>
      <div>
        <HStack
          gap="2"
          data-error={!!error}
          className="mb-3 hidden data-[error=true]:flex"
        >
          <IconSquareLetterX
            size={18}
            className="mt-[3px] mb-auto text-red-11"
          />
          <AnimatedError
            error={error}
            className="text-[15px] font-medium text-left text-red-11 "
          />
        </HStack>
        <ButtonConfirm onClick={onSubmit} submitData={submitData} />
      </div>
    </div>
  );
}

export const ReviewStep = memo(_ReviewStep);
