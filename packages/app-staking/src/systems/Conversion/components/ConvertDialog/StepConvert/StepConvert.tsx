import {
  Button,
  LoadingBox,
  LoadingWrapper,
  Tooltip,
  useToast,
} from '@fuels/ui';
import { CURRENT_NETWORK_CONTRACTS, FuelToken, TOKENS } from 'app-commons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { Address } from 'viem';
import { Routes } from '~staking/routes';
import type { ConversionMachineState } from '~staking/systems/Conversion/machines/conversionMachine';
import { getShortError } from '~staking/systems/Core';
import { AnimatedError } from '~staking/systems/Core/components/AnimatedError/AnimatedError';
import { ViewInExplorer } from '~staking/systems/Core/components/ViewInExplorer/ViewInExplorer';
import { useFormatBalance } from '~staking/systems/Core/hooks/useFormatBalance';
import { PendingTransactionTypeL1 } from '~staking/systems/Core/hooks/usePendingTransactions';
import { usePendingTransactionsCache } from '~staking/systems/Core/hooks/usePendingTransactionsCache';
import { bnToBigInt } from '~staking/systems/Core/utils/bn';
import { useTokenMigration } from '~staking/systems/Staking/hooks/useTokenMigration';

type StepConvertProps = {
  token: Address;
  ctx: ConversionMachineState['context'];
  onClose: () => void;
};

const DAY_IN_SEC = 24 * 60 * 60;
const REGULAR_LOCK_YEARS = 2;

const defaultPeriod = (REGULAR_LOCK_YEARS * 365 * DAY_IN_SEC).toString(); // 2 years

const { symbol: symbolV1, decimals: decimalsV1 } = TOKENS[FuelToken.V1];
const { symbol: symbolV2, decimals: decimalsV2 } = TOKENS[FuelToken.V2];

export const StepConvert = ({ token, ctx, onClose }: StepConvertProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addPendingTransaction } = usePendingTransactionsCache();
  const { migrate, isMigrating, error: errorMigration } = useTokenMigration();

  const amountV1 = bnToBigInt(ctx.amount);
  const amountV1Format = useFormatBalance(amountV1, decimalsV1);
  const amountV2 =
    (amountV1 * CURRENT_NETWORK_CONTRACTS.MIGRATOR_MULTIPLIER) /
    CURRENT_NETWORK_CONTRACTS.MIGRATOR_DOWNSCALING_FACTOR;
  const amountV2Format = useFormatBalance(amountV2, decimalsV2);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    migrate({
      amount: amountV1,
      period: defaultPeriod,
      options: {
        onSuccess: (hash) => {
          addPendingTransaction({
            hash,
            token,
            symbol: symbolV1,
            formatted: amountV1Format.formatted.display,
            type: PendingTransactionTypeL1.Migrate,
            layer: 'l1',
          });
          onClose();
          toast({
            title: t('staking.upgrade.migration_submitted'),
            description: `${amountV1Format.formatted.display} ${symbolV1}`,
            action: <ViewInExplorer hash={hash} />,
            variant: 'info',
          });
          navigate(Routes.stakingL1());
        },
      },
    });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col flex-1">
      <div className="mt-8 flex flex-1 flex-col">
        <div className="flex flex-col gap-3 pb-4">
          <span className="fuel-label">{t('staking.upgrade.v1_amount')}</span>
          <div className="flex items-baseline gap-2">
            <LoadingWrapper
              isLoading={!amountV1Format}
              loadingEl={<LoadingBox className="h-6 w-28 !rounded-none" />}
              regularEl={
                <Tooltip
                  content={`${amountV1Format.original.display} ${symbolV1}`}
                  delayDuration={0}
                >
                  <span className="fuel-stat-sm fuel-appear">
                    {amountV1Format.formatted.display}
                  </span>
                </Tooltip>
              }
            />
            <span className="fuel-label">{symbolV1}</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-[var(--fuel-border)] pt-4">
          <span className="fuel-label">{t('staking.upgrade.receive')}</span>
          <div className="flex items-baseline gap-2">
            <LoadingWrapper
              isLoading={amountV2Format == null}
              loadingEl={<LoadingBox className="h-6 w-28 !rounded-none" />}
              regularEl={
                <Tooltip
                  content={`${amountV2Format.original.display} ${symbolV2}`}
                  delayDuration={0}
                >
                  <span className="fuel-stat-sm fuel-appear">
                    {amountV2Format.formatted.display}
                  </span>
                </Tooltip>
              }
            />
            <span className="fuel-label">{symbolV2}</span>
          </div>
        </div>
        <AnimatedError
          error={errorMigration ? getShortError(errorMigration) : undefined}
        />
      </div>
      <div className="my-5 border-t border-[var(--fuel-border)]" />
      <Button className="w-full" isLoading={isMigrating} type="submit">
        {t('staking.upgrade.submit')}
      </Button>
    </form>
  );
};
