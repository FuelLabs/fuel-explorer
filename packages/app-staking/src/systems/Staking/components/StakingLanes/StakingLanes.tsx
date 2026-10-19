import { useConnectUI } from '@fuels/react';
import { LoadingBox, Square } from '@fuels/ui';
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

// The ecosystem banner's dither, kept to the two corners. The art is white dots
// on black: screen drops the black on dark, and inverted, multiply drops the white on light.
const LANE_ART = '/illustrations/liquid-dither-poster.webp';
const LANE_ART_CLASS = [
  'pointer-events-none absolute inset-0 size-full object-cover opacity-40 [image-rendering:pixelated]',
  'invert mix-blend-multiply dark:invert-0 dark:mix-blend-screen dark:brightness-75',
  '[mask-image:radial-gradient(ellipse_47%_90%_at_0%_0%,black_26%,transparent_72%),radial-gradient(ellipse_47%_90%_at_100%_100%,black_26%,transparent_72%)]',
].join(' ');

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

// Both lanes sit side by side at every width, so they read as tabs. One
// highlight is shared, so it glides sideways to the lane you pick.
const GLIDE = {
  type: 'spring',
  stiffness: 520,
  damping: 42,
  mass: 0.9,
} as const;

// 20 px below the tablet width so a long balance fits half of 320 px. The full value
// stays in the title when the figure is cut.
function Figure({ value }: { value: string | undefined }) {
  return (
    <span
      title={value}
      className="fuel-stat min-w-0 truncate whitespace-nowrap text-[20px] leading-[24px] tablet:text-[32px] tablet:leading-[34px]"
    >
      {value}
    </span>
  );
}

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
        'group relative isolate grid min-w-0 content-between gap-4 px-4 py-5 text-inherit no-underline tablet:gap-6 tablet:px-10 tablet:py-8',
        'laptop:grid-cols-[1fr_auto] laptop:items-end',
        'fuel-hover-fill focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--fuel-focus)]',
      ].join(' ')}
    >
      {active && (
        <motion.span
          aria-hidden
          layoutId="staking-lane-highlight"
          transition={transition}
          className="absolute inset-0 -z-10 overflow-hidden bg-[var(--fuel-card)]"
        >
          <img src={LANE_ART} alt="" className={LANE_ART_CLASS} />
        </motion.span>
      )}
      <span className="flex min-w-0 flex-col gap-3">
        <span className="flex items-center gap-3">
          <Square kind="idle" className="relative">
            {/* The marker stays in place and fades, while the highlight glides. */}
            <Square
              className={`absolute -inset-px transition-opacity duration-200 motion-reduce:transition-none ${active ? 'opacity-100' : 'opacity-0'}`}
            />
          </Square>
          <span className="flex h-7 items-center">{logo}</span>
        </span>
        <span className="font-medium text-heading text-[18px] leading-[22px] tracking-[-0.54px] tablet:text-[24px] tablet:leading-[28px] tablet:tracking-[-0.96px]">
          {name}
        </span>
      </span>
      <span className="flex flex-col gap-1 laptop:items-end">
        {readout ?? (
          <>
            <span className="fuel-label">{figureLabel}</span>
            <span className="flex items-baseline gap-2">
              <Figure value={figure} />
              <span className="fuel-label normal-case">{unit}</span>
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
  const disconnected = status === 'disconnected';

  // The wallet check settles into either the connect prompt or a figure, and
  // the two differ in height. The unused one stays in the same grid cell as an
  // invisible spacer, so the lane keeps one height and the page below does not
  // move. Spacer text comes from CSS content, so it never reaches the DOM text.
  return (
    <span className="grid laptop:justify-items-end [&>*]:col-start-1 [&>*]:row-start-1 [&>*]:self-end">
      {disconnected ? (
        <>
          <button
            type="button"
            className={`${CONNECT_BUTTON} cursor-pointer`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              connect();
            }}
          >
            {t('staking.lane_rig_connect')}
          </button>
          <span
            aria-hidden
            className="invisible flex flex-col gap-1 laptop:items-end"
          >
            <span
              data-text={t('staking.lane_rig_figure')}
              className="fuel-label before:content-[attr(data-text)]"
            />
            <span className="h-6 tablet:h-[34px]" />
          </span>
        </>
      ) : (
        <>
          <button
            type="button"
            disabled
            tabIndex={-1}
            aria-hidden
            data-text={t('staking.lane_rig_connect')}
            className={`${CONNECT_BUTTON} invisible before:content-[attr(data-text)]`}
          />
          <span className="flex flex-col gap-1 laptop:items-end">
            <RigFigure status={status} pendingDeposit={pendingDeposit} />
          </span>
        </>
      )}
    </span>
  );
}

const CONNECT_TEXT =
  'm-0 max-w-[280px] text-left text-[16px] leading-[20px] tracking-[-0.32px] text-[var(--fuel-element-low-em)] laptop:text-right';

// The spacer uses the same element and classes as the live control, so the
// two boxes wrap and size the same way.
const CONNECT_BUTTON = `${CONNECT_TEXT} border-0 bg-transparent p-0`;

function RigFigure({
  status,
  pendingDeposit,
}: {
  status: Exclude<RigClaimStatus, 'disconnected'>;
  pendingDeposit:
    | { format: (options: { units: number; precision: number }) => string }
    | undefined;
}) {
  const { t } = useTranslation();

  if (status === 'loading') {
    return (
      <>
        <span className="fuel-label">{t('staking.lane_rig_figure')}</span>
        <span className="sr-only">{t('staking.lane_rig_checking')}</span>
        <LoadingBox className="h-6 w-24 !rounded-none tablet:h-[34px]" />
      </>
    );
  }

  if (status === 'error') {
    return (
      <>
        <span className="fuel-label">{t('staking.lane_rig_figure')}</span>
        <span
          role="alert"
          className="max-w-[220px] text-[16px] leading-[20px] tracking-[-0.32px] text-[var(--fuel-element-low-em)] laptop:text-right"
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
        <Figure value={figure} />
        <span className="fuel-label normal-case">stFUEL</span>
      </span>
    </>
  );
}

function EthereumReadout({
  connected,
  loading,
  failed,
  figure,
}: {
  connected: boolean;
  loading: boolean;
  failed: boolean;
  figure: string;
}) {
  const { t } = useTranslation();
  const label = (
    <span className="fuel-label">{t('staking.lane_ethereum_figure')}</span>
  );

  if (connected && loading) {
    return (
      <>
        {label}
        <span className="sr-only">{t('staking.status.loading')}</span>
        <LoadingBox className="h-6 w-24 !rounded-none tablet:h-[34px]" />
      </>
    );
  }

  if (connected && failed) {
    return (
      <>
        {label}
        <span
          role="alert"
          className="max-w-[220px] text-[16px] leading-[20px] tracking-[-0.32px] text-[var(--fuel-element-low-em)] laptop:text-right"
        >
          {t('home.unavailable')}
        </span>
      </>
    );
  }

  return (
    <>
      {label}
      <span className="flex items-baseline gap-2">
        <Figure value={figure} />
        <span className="fuel-label normal-case">{symbol}</span>
      </span>
    </>
  );
}

export function StakingLanes() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { isConnected } = useAccount();
  const { pendingDeposit, status } = useRigClaimable();
  const { total, isPending, isError } = useStakedBalanceL1();
  const onEthereum = pathname.includes('/on-ethereum');

  const ethereumFigure = isConnected
    ? formatAmount(total, decimals).formatted.display
    : '—';

  return (
    <nav
      aria-label={t('staking.lanes_label')}
      className="fuel-cell grid min-w-0 grid-cols-2 [&>*+*]:border-l [&>*+*]:border-[var(--fuel-line)]"
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
        busy={isConnected && isPending}
        readout={
          <EthereumReadout
            connected={isConnected}
            loading={isPending}
            failed={isError}
            figure={ethereumFigure}
          />
        }
      />
    </nav>
  );
}
