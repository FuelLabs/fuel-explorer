import { LoadingBox, LoadingWrapper } from '@fuels/ui';
import { convertToUsd } from '@fuels/ui';
import { FuelToken, type HexAddress, TOKENS } from 'app-commons';
import type { BN } from 'fuels';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { formatAmount } from '~staking/systems/Core/utils/bn';

import type { SequencerValidatorAddress } from '~staking/systems/Core';
import { RegularInfoSection } from '~staking/systems/Core/components/RegularInfoSection/RegularInfoSection';
import type { AssetRate } from '~staking/systems/Core/services/AssetsRateService';
import {
  AccountRow,
  NetworkFeeRow,
  ReviewLayout,
} from '~staking/systems/Staking/components/ReviewLayout/ReviewLayout';

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
  const { t } = useTranslation();
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

  const { formatted: formattedAmountUsd } = useMemo(() => {
    return convertToUsd(amount, decimals, rates.fuel);
  }, [amount, rates.fuel]);

  return (
    <div className="mt-8">
      <ReviewLayout
        label={t('staking.dialog.undelegating_now')}
        symbol={fuelSymbol}
        amount={formattedAmount.display}
        fullAmount={tooltipAmount ? originalAmount.display : undefined}
        usd={
          <LoadingWrapper
            isLoading={!rates.fuel}
            loadingEl={<LoadingBox className="h-3 w-10 !rounded-none" />}
            regularEl={`(${formattedAmountUsd})`}
          />
        }
        error={error}
        confirmLabel={submitData.label}
        retryOnError={false}
        onConfirm={onSubmit}
        isConfirmDisabled={submitData.disabled}
      >
        <RegularInfoSection
          header={t('staking.review.from')}
          isLoading={isLoadingValidator}
          loadingEl={<LoadingBox className="h-4 w-[120px] !rounded-none" />}
          text={validatorName || validatorAddress}
        />
        <AccountRow header={t('staking.review.to')} kind="sequencer" />
        <NetworkFeeRow
          fee={fee}
          ethRate={rates.eth}
          isLoading={!fee || fee.isZero() || !rates.eth}
        />
      </ReviewLayout>
    </div>
  );
}

export const ReviewStep = memo(_ReviewStep);
