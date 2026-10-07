import {
  Avatar,
  Button,
  IconArrowLeft,
  LoadingBox,
  LoadingWrapper,
  TokenBadge,
  Tooltip,
  convertToUsd,
} from '@fuels/ui';
import { type BN, DECIMAL_WEI } from 'fuels';
import { type ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorInline } from '~staking/systems/Core/components/ErrorInline/ErrorInline';
import { LogoCosmos } from '~staking/systems/Core/components/LogoCosmos/LogoCosmos';
import { LogoEth } from '~staking/systems/Core/components/LogoEth/LogoEth';
import { RegularInfoSection } from '~staking/systems/Core/components/RegularInfoSection/RegularInfoSection';
import { formatAmount } from '~staking/systems/Core/utils/bn';
import { getValidatorImage } from '../../utils/validatorImages';

type ReviewLayoutProps = {
  /** Row label above the amount, for example "You're staking". */
  label: string;
  symbol: string;
  amount: string;
  /** Full amount for the tooltip. Leave out when the figure is not shortened. */
  fullAmount?: string;
  usd?: ReactNode;
  /** The rows under the amount. Each one gets a hairline above it. */
  children?: ReactNode;
  warning?: { title: string; message?: string };
  error?: string | null;
  onBack?: () => void;
  isBackDisabled?: boolean;
  confirmLabel: string;
  onConfirm: () => void;
  isConfirmDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  confirmTitle?: string;
  /** Show the retry label once an error appears. On by default. */
  retryOnError?: boolean;
};

export function AmountHero({
  label,
  symbol,
  amount,
  fullAmount,
  usd,
  isLoading,
}: Pick<
  ReviewLayoutProps,
  'label' | 'symbol' | 'amount' | 'fullAmount' | 'usd'
> & {
  isLoading?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 pb-4">
      <span className="fuel-label">{label}</span>
      <div className="flex min-w-0 items-center gap-3">
        <TokenBadge image="/assets/fuel.png" symbol={symbol} size="small" />
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="h-6 w-28 !rounded-none" />}
          regularEl={
            <>
              <Tooltip
                content={`${fullAmount} ${symbol}`}
                delayDuration={0}
                open={fullAmount ? undefined : false}
              >
                <span className="fuel-stat-sm fuel-appear truncate">
                  {amount}
                </span>
              </Tooltip>
              {usd != null && (
                <span className="text-[14px] leading-[18px] text-[var(--fuel-element-low-em)]">
                  {usd}
                </span>
              )}
            </>
          }
        />
      </div>
    </div>
  );
}

// The one layout every review step shares: an amount, hairline-separated
// rows, an optional warning row, and a square back and confirm pair.
export function ReviewLayout({
  label,
  symbol,
  amount,
  fullAmount,
  usd,
  children,
  warning,
  error,
  onBack,
  isBackDisabled,
  confirmLabel,
  onConfirm,
  isConfirmDisabled,
  isLoading,
  loadingText,
  confirmTitle,
  retryOnError = true,
}: ReviewLayoutProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col">
        <AmountHero
          label={label}
          symbol={symbol}
          amount={amount}
          fullAmount={fullAmount}
          usd={usd}
        />
        <div className="flex flex-col [&>*]:border-t [&>*]:border-[var(--fuel-border)] [&>*]:py-4">
          {children}
        </div>
      </div>
      <div>
        {warning && (
          <div
            role="status"
            className="fuel-appear mb-4 flex items-start gap-3 border-t border-[var(--fuel-border)] pt-4"
          >
            <span
              aria-hidden
              className="mt-[5px] size-2 shrink-0 border border-[var(--fuel-element-high-em)] bg-[var(--fuel-element-high-em)]"
            />
            <div className="flex min-w-0 flex-col gap-1">
              <span className="fuel-label text-[var(--fuel-element-high-em)]">
                {warning.title}
              </span>
              {warning.message && (
                <span className="text-[14px] leading-[18px] text-[var(--fuel-element-low-em)]">
                  {warning.message}
                </span>
              )}
            </div>
          </div>
        )}
        <ErrorInline error={error} className="mb-1" />
        <div className="flex w-full gap-3">
          {onBack && (
            <Button
              variant="ghost"
              color="gray"
              type="button"
              className="flex-1"
              size="3"
              leftIcon={IconArrowLeft}
              onClick={onBack}
              disabled={isBackDisabled}
            >
              {t('staking.review.back')}
            </Button>
          )}
          <Button
            type="button"
            className="flex-1"
            size="3"
            onClick={onConfirm}
            disabled={isConfirmDisabled}
            isLoading={isLoading}
            loadingText={loadingText}
            title={confirmTitle}
          >
            {error && retryOnError ? t('staking.review.retry') : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function NetworkFeeRow({
  fee,
  ethRate,
  isLoading,
}: { fee: BN; ethRate: number; isLoading?: boolean }) {
  const { t } = useTranslation();
  const { formatted: formattedFee } = useMemo(
    () => formatAmount(fee, DECIMAL_WEI),
    [fee],
  );
  const { formatted: formattedFeeUsd } = useMemo(() => {
    if (isLoading) return { formatted: '0' };
    return convertToUsd(fee, DECIMAL_WEI, ethRate);
  }, [fee, ethRate, isLoading]);

  return (
    <RegularInfoSection
      header={t('staking.review.fee')}
      text={
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={
            <LoadingBox className="my-1 h-[16px] w-[120px] !rounded-none" />
          }
          regularEl={formattedFeeUsd}
        />
      }
      textSupport={isLoading ? undefined : `(${formattedFee.display} ETH)`}
    />
  );
}

export function AccountRow({
  header,
  kind,
}: { header: string; kind: 'sequencer' | 'ethereum' }) {
  const { t } = useTranslation();
  return (
    <RegularInfoSection
      header={header}
      text={t('staking.review.my_account')}
      textSupport={
        kind === 'sequencer'
          ? t('staking.review.balance_sequencer')
          : t('staking.review.balance_ethereum')
      }
      icon={kind === 'sequencer' ? <LogoCosmos /> : <LogoEth size="medium" />}
    />
  );
}

export function ValidatorRow({
  header,
  moniker,
  isLoading,
}: { header: string; moniker?: string; isLoading?: boolean }) {
  return (
    <RegularInfoSection
      header={header}
      text={moniker}
      isLoading={isLoading}
      loadingEl={<LoadingBox className="h-6 w-36 !rounded-none" />}
      icon={<Avatar size="2" src={getValidatorImage(moniker)} fallback={''} />}
    />
  );
}
