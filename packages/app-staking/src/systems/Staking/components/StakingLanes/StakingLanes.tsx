import { useConnectUI } from '@fuels/react';
import { LoadingBox } from '@fuels/ui';
import { FuelToken, TOKENS } from 'app-commons';
import { motion, useReducedMotion } from 'framer-motion';
import { DECIMAL_FUEL } from 'fuels';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Routes } from '~staking/routes';
import { formatAmount } from '~staking/systems/Core/utils/bn';
import {
  type RigClaimStatus,
  useRigClaimable,
} from '../../hooks/useRigClaimable';
import { useStakedBalanceL1 } from '../../services/useTotalStake';
import { IconRig } from '../StakingMigrationBanner/IconRig';

const { symbol, decimals } = TOKENS[FuelToken.V2];

type LaneProps = {
  to: string;
  active: boolean;
  logo: ReactNode;
  name: string;
  figureLabel?: string;
  figure?: string;
  unit?: string;
  readout?: ReactNode;
  busy?: boolean;
};

// One highlight and one marker are shared by both lanes, so they glide to the
// lane you pick instead of switching on and off.
const GLIDE = {
  type: 'spring',
  stiffness: 520,
  damping: 42,
  mass: 0.9,
} as const;

function Lane({
  to,
  active,
  logo,
  name,
  figureLabel,
  figure,
  unit,
  readout,
  busy,
}: LaneProps) {
  const reduced = useReducedMotion();
  const transition = reduced ? { duration: 0 } : GLIDE;
  return (
    <Link
      to={to}
      aria-current={active ? 'page' : undefined}
      aria-busy={busy || undefined}
      className={[
        'group relative isolate grid min-w-0 gap-6 px-6 py-6 text-inherit no-underline tablet:px-10 tablet:py-8',
        'min-[720px]:grid-cols-[1fr_auto] min-[720px]:items-end',
        'fuel-hover-fill focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--fuel-ring)]',
      ].join(' ')}
    >
      {active && (
        <motion.span
          aria-hidden
          layoutId="staking-lane-highlight"
          transition={transition}
          className="absolute inset-0 -z-10 bg-[var(--fuel-card)]"
        />
      )}
      <span className="flex min-w-0 flex-col gap-3">
        <span className="flex items-center gap-3">
          <span
            aria-hidden
            className="relative size-2 shrink-0 border border-[var(--fuel-indicator-border)]"
          >
            {active && (
              <motion.span
                layoutId="staking-lane-marker"
                transition={transition}
                className="fuel-square absolute -inset-px"
              />
            )}
          </span>
          <span className="flex h-7 items-center">{logo}</span>
        </span>
        <span className="font-medium text-heading text-[24px] leading-[28px] tracking-[-0.96px]">
          {name}
        </span>
      </span>
      <span className="flex flex-col gap-1 min-[720px]:items-end">
        {readout ?? (
          <>
            <span className="fuel-label">{figureLabel}</span>
            <span className="flex items-baseline gap-2">
              <span className="fuel-stat whitespace-nowrap">{figure}</span>
              <span className="fuel-label">{unit}</span>
            </span>
          </>
        )}
      </span>
    </Link>
  );
}

function RigReadout({
  status,
  pendingDeposit,
}: {
  status: RigClaimStatus;
  pendingDeposit:
    | { format: (options: { units: number; precision: number }) => string }
    | undefined;
}) {
  const { t } = useTranslation();
  const { connect } = useConnectUI();

  if (status === 'disconnected') {
    return (
      <button
        type="button"
        className="m-0 max-w-[280px] cursor-pointer border-0 bg-transparent p-0 text-left text-[16px] leading-[20px] tracking-[-0.32px] text-[var(--fuel-element-low-em)] min-[720px]:text-right"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          connect();
        }}
      >
        {t('staking.lane_rig_connect')}
      </button>
    );
  }

  if (status === 'loading') {
    return (
      <>
        <span className="fuel-label">{t('staking.lane_rig_figure')}</span>
        <span className="sr-only">{t('staking.lane_rig_checking')}</span>
        <LoadingBox className="h-[34px] w-24 !rounded-none" />
      </>
    );
  }

  if (status === 'error') {
    return (
      <>
        <span className="fuel-label">{t('staking.lane_rig_figure')}</span>
        <span
          role="alert"
          className="max-w-[220px] text-[16px] leading-[20px] tracking-[-0.32px] text-[var(--fuel-element-low-em)] min-[720px]:text-right"
        >
          {t('home.unavailable')}
        </span>
      </>
    );
  }

  const figure = pendingDeposit
    ? pendingDeposit.format({ units: DECIMAL_FUEL, precision: 2 })
    : '0';

  return (
    <>
      <span className="fuel-label">{t('staking.lane_rig_figure')}</span>
      <span className="flex items-baseline gap-2">
        <span className="fuel-stat whitespace-nowrap">{figure}</span>
        <span className="fuel-label">stFUEL</span>
      </span>
    </>
  );
}

export function StakingLanes() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { isConnected } = useAccount();
  const { pendingDeposit, status } = useRigClaimable();
  const { total } = useStakedBalanceL1();
  const onEthereum = pathname.includes('/on-ethereum');

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
        busy={status === 'loading'}
        readout={<RigReadout status={status} pendingDeposit={pendingDeposit} />}
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
        figureLabel={t('staking.lane_ethereum_figure')}
        figure={ethereumFigure}
        unit={symbol}
      />
    </nav>
  );
}
