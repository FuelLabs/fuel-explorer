import { Copyable, shortAddress } from '@fuels/ui';
import { FuelToken, TOKENS } from 'app-commons';
import type { BN } from 'fuels';
import { useTranslation } from 'react-i18next';
import { LogoEth } from '~staking/systems/Core/components/LogoEth/LogoEth';
import { RegularInfoSection } from '~staking/systems/Core/components/RegularInfoSection/RegularInfoSection';
import { useFormattedTokenAmount } from '~staking/systems/Core/hooks/useFormattedTokenAmount';
import { ReviewLayout } from '../ReviewLayout/ReviewLayout';

interface StakeApprovalProps {
  amount?: BN | null;
  rates: any[];
  onApprove: () => void;
  onBack: () => void;
  fromAccount?: string;
  isLoadingApproval?: boolean;
  errorMsg?: string | null;
}

const v2 = TOKENS[FuelToken.V2];
const { symbol, decimals } = v2;

export function StakeApproval({
  amount,
  rates,
  onApprove,
  fromAccount = '',
  onBack,
  isLoadingApproval,
  errorMsg,
}: StakeApprovalProps) {
  const { t } = useTranslation();
  const { formattedAmount, originalAmount, tooltipAmount, formattedAmountUsd } =
    useFormattedTokenAmount({
      amount: amount || null,
      symbol,
      decimals,
      rates,
    });

  // Display a truncated version of the address
  const displayAddress = shortAddress(fromAccount);

  return (
    <ReviewLayout
      label={t('staking.dialog.approve_title')}
      symbol={symbol}
      amount={formattedAmount.display}
      fullAmount={tooltipAmount ? originalAmount.display : undefined}
      usd={`(${formattedAmountUsd})`}
      error={errorMsg}
      onBack={onBack}
      isBackDisabled={isLoadingApproval}
      confirmLabel={t('staking.review.approve')}
      onConfirm={onApprove}
      isLoading={isLoadingApproval}
      loadingText={t('staking.dialog.approving')}
    >
      <p className="m-0 text-[14px] leading-[18px] text-[var(--fuel-element-low-em)]">
        {t('staking.dialog.approve_body')}
      </p>
      <RegularInfoSection
        header={t('staking.dialog.from_account')}
        text={<Copyable value={fromAccount}>{displayAddress}</Copyable>}
        icon={<LogoEth />}
      />
    </ReviewLayout>
  );
}
