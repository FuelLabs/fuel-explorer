import { FuelToken, TOKENS } from 'app-commons';
import { DECIMAL_FUEL } from 'fuels';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Routes } from '~staking/routes';
import { formatAmount } from '~staking/systems/Core/utils/bn';
import { useRigClaimable } from '../../hooks/useRigClaimable';
import { useStakedBalanceL1 } from '../../services/useTotalStake';
import { IconRig } from '../StakingMigrationBanner/IconRig';

const { symbol, decimals } = TOKENS[FuelToken.V2];

type LaneProps = {
  to: string;
  active: boolean;
  logo: ReactNode;
  name: string;
  lead: string;
  figureLabel: string;
  figure: string;
  unit: string;
};

function Lane({
  to,
  active,
  logo,
  name,
  lead,
  figureLabel,
  figure,
  unit,
}: LaneProps) {
  return (
    <Link
      to={to}
      aria-current={active ? 'page' : undefined}
      className={[
        'group relative grid min-w-0 gap-6 px-6 py-6 text-inherit no-underline tablet:px-10 tablet:py-8',
        'min-[720px]:grid-cols-[1fr_auto] min-[720px]:items-end',
        'fuel-hover-fill focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--fuel-ring)]',
        active ? 'bg-[var(--fuel-card)]' : '',
      ].join(' ')}
    >
      <span className="flex min-w-0 flex-col gap-3">
        <span className="flex items-center gap-3">
          <span
            aria-hidden
            className={`size-2 shrink-0 border ${
              active
                ? 'fuel-square'
                : 'border-[var(--fuel-indicator-border)] bg-transparent'
            }`}
          />
          <span className="flex h-7 items-center">{logo}</span>
        </span>
        <span className="font-medium text-heading text-[24px] leading-[28px] tracking-[-0.96px]">
          {name}
        </span>
        <span className="max-w-[360px] text-[14px] leading-[18px] text-[var(--fuel-element-low-em)]">
          {lead}
        </span>
      </span>
      <span className="flex flex-col gap-1 min-[720px]:items-end">
        <span className="fuel-label">{figureLabel}</span>
        <span className="flex items-baseline gap-2">
          <span className="fuel-stat whitespace-nowrap">{figure}</span>
          <span className="fuel-label">{unit}</span>
        </span>
      </span>
    </Link>
  );
}

export function StakingLanes() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { isConnected } = useAccount();
  const { pendingDeposit } = useRigClaimable();
  const { total } = useStakedBalanceL1();
  const onEthereum = pathname.includes('/on-ethereum');

  const rigFigure = pendingDeposit
    ? pendingDeposit.format({ units: DECIMAL_FUEL, precision: 2 })
    : '0';
  const ethereumFigure = isConnected
    ? formatAmount(total, decimals).formatted.display
    : '—';

  return (
    <nav
      aria-label={t('staking.lanes_label')}
      className="fuel-edge grid min-w-0 min-[720px]:grid-cols-2 [&>*+*]:border-t [&>*+*]:border-[var(--fuel-line)] min-[720px]:[&>*+*]:border-t-0 min-[720px]:[&>*+*]:border-l"
    >
      <Lane
        to={Routes.stakingRig()}
        active={!onEthereum}
        logo={<IconRig size={28} />}
        name={t('staking.tab_rig')}
        lead={t('staking.lane_rig_lead')}
        figureLabel={t('staking.lane_rig_figure')}
        figure={rigFigure}
        unit="stFUEL"
      />
      <Lane
        to={Routes.stakingL1()}
        active={onEthereum}
        logo={
          <img
            src="/assets/eth.svg"
            alt=""
            className="size-7 shrink-0 rounded-full"
          />
        }
        name={t('staking.tab_ethereum')}
        lead={t('staking.lane_ethereum_lead')}
        figureLabel={t('staking.lane_ethereum_figure')}
        figure={ethereumFigure}
        unit={symbol}
      />
    </nav>
  );
}
