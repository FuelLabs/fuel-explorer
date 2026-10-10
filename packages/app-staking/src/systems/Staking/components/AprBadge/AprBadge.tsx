import { HelperIcon, IconInfoCircle } from '@fuels/ui';
import { useQuery } from '@tanstack/react-query';
import { FUEL_INDEXER_API } from 'app-commons';
import clsx from 'clsx';
import { urlJoin } from 'fuels';
import { useTranslation } from 'react-i18next';

export function AprBadge({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { data: apy } = useQuery({
    queryKey: ['fuel', 'staking', 'apy'],
    queryFn: async () => {
      const { amount } = await fetch(
        urlJoin(FUEL_INDEXER_API, '/staking/apy'),
      ).then((resp) => resp.json());
      return amount;
    },
    refetchOnWindowFocus: false,
  });

  return apy ? (
    <span
      className={clsx(
        'fuel-label fuel-appear inline-flex items-center gap-2 border border-[var(--fuel-line)] px-2 py-1 text-[var(--fuel-brand-text)]',
        className,
      )}
    >
      {t('staking.apr.value', { apy })}
      <HelperIcon
        message={t('staking.apr.tip')}
        icon={IconInfoCircle}
        iconSize={14}
      />
    </span>
  ) : null;
}
