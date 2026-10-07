import { Button, Tooltip } from '@fuels/ui';
import { FuelToken, TOKENS } from 'app-commons';
import { useModal } from 'connectkit';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import {
  stakingTxDialogEvents,
  stakingTxDialogStore,
} from '~staking/systems/Staking/store/stakingTxDialogStore';
import { useETA } from '../../hooks/useETA';
import {
  typeLabelKey,
  withdrawType,
} from '../TransactionHistoryItem/constants';
import { type AttentionRow, useAttentionRows } from './useAttentionRows';

const RIG_URL = 'https://rig.st';
const { symbol } = TOKENS[FuelToken.V2];

const COLUMNS =
  'items-center gap-x-6 gap-y-2 px-6 tablet:px-10 min-[720px]:grid-cols-[96px_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_96px]';
const ROW_GRID = `grid ${COLUMNS} border-t border-[var(--fuel-border)] py-4`;

function Lane({ rig }: { rig: boolean }) {
  const { t } = useTranslation();
  return (
    <span className="fuel-label flex items-center gap-2 text-[var(--fuel-element-mid-em)]">
      <span
        aria-hidden
        className={`size-2 shrink-0 border border-[var(--fuel-indicator-border)] ${
          rig ? 'bg-transparent' : 'bg-[var(--fuel-element-high-em)]'
        }`}
      />
      {rig ? t('staking.lane_rig') : t('staking.lane_ethereum')}
    </span>
  );
}

function Amount({
  display,
  full,
  unit = symbol,
}: { display: string; full?: string; unit?: string }) {
  const figure = (
    <span className="fuel-stat-sm whitespace-nowrap">{display}</span>
  );
  return (
    <span className="flex items-baseline gap-2">
      {full ? (
        <Tooltip content={`${full} ${unit}`} delayDuration={0}>
          {figure}
        </Tooltip>
      ) : (
        figure
      )}
      <span className="fuel-label">{unit}</span>
    </span>
  );
}

function ReadyMark({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2 text-[var(--fuel-element-high-em)]">
      <span aria-hidden className="fuel-square" />
      <span className="fuel-label text-[var(--fuel-element-high-em)]">
        {label}
      </span>
    </span>
  );
}

function ProgressMark({
  start,
  end,
}: { start: string | undefined; end: string | undefined }) {
  const { t } = useTranslation();
  const { eta, progress } = useETA({ startDate: start, endDate: end });
  return (
    <span className="flex min-w-0 flex-col gap-2">
      <span className="flex items-center gap-2">
        <span
          aria-hidden
          className="size-2 shrink-0 border border-[var(--fuel-indicator-border)]"
        />
        <span className="fuel-label text-[var(--fuel-element-mid-em)]">
          {eta
            ? t('staking.board.time_left', { eta })
            : t('staking.board.in_progress')}
        </span>
      </span>
      {typeof progress === 'number' && (
        <span
          aria-hidden
          className="block h-[2px] w-full max-w-[160px] bg-[var(--fuel-line)]"
        >
          <span
            className="block h-full bg-[var(--fuel-element-high-em)]"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </span>
      )}
    </span>
  );
}

function BoardRow({ row }: { row: AttentionRow }) {
  const { t } = useTranslation();

  if (row.kind === 'rig-claim') {
    return (
      <li className={ROW_GRID}>
        <Lane rig />
        <span className="font-medium text-heading">
          {t('staking.board.rig_claim')}
        </span>
        <Amount display={row.amount} unit="stFUEL" />
        <ReadyMark label={t('staking.board.ready')} />
        <span className="min-[720px]:justify-self-end">
          <Button
            as="a"
            href={RIG_URL}
            target="_blank"
            rel="noreferrer"
            size="2"
          >
            {t('staking.open_rig')}
          </Button>
        </span>
      </li>
    );
  }

  if (row.kind === 'claim') {
    return (
      <li className={ROW_GRID}>
        <Lane rig={false} />
        <span className="flex min-w-0 flex-col">
          <span className="font-medium text-heading">
            {t('staking.board.claim_rewards')}
          </span>
          <span className="truncate text-[14px] leading-[18px] text-[var(--fuel-element-low-em)]">
            {row.name}
          </span>
        </span>
        <Amount
          display={row.amount.formatted.display}
          full={row.amount.original.display}
        />
        <ReadyMark label={t('staking.board.ready')} />
        <span className="min-[720px]:justify-self-end">
          <Button
            size="2"
            onClick={() =>
              stakingTxDialogStore.send(
                stakingTxDialogEvents.open('TxClaimRewardNew', row.validator),
              )
            }
          >
            {t('staking.board.claim')}
          </Button>
        </span>
      </li>
    );
  }

  const { event } = row;
  const openStatus = () =>
    stakingTxDialogStore.send(
      stakingTxDialogEvents.open(withdrawType[event.type], event.id),
    );

  return (
    <li className={ROW_GRID}>
      <Lane rig={false} />
      <span className="font-medium text-heading">
        {t(typeLabelKey[event.type])}
      </span>
      <Amount
        display={row.amount.formatted.display}
        full={row.amount.original.display}
      />
      {row.kind === 'action' && (
        <ReadyMark label={t('staking.board.action_needed')} />
      )}
      {row.kind === 'progress' && (
        <ProgressMark
          start={event.statusInfo?.TransactionSent?.ethTx.timestamp}
          end={event.timestampToFinish}
        />
      )}
      <span className="min-[720px]:justify-self-end">
        {row.kind === 'action' ? (
          <Button size="2" onClick={openStatus}>
            {t('staking.board.continue')}
          </Button>
        ) : (
          <Button size="2" variant="ghost" color="gray" onClick={openStatus}>
            {t('staking.board.details')}
          </Button>
        )}
      </span>
    </li>
  );
}

export function AttentionBoard() {
  const { t } = useTranslation();
  const { setOpen } = useModal();
  const { pathname } = useLocation();
  const lane = pathname.includes('/on-ethereum') ? 'ethereum' : 'rig';
  const { rows, needsConnect, isLoading } = useAttentionRows(lane);

  // An empty board is only noise: it shows when something needs the user or
  // the wallet is not connected. The positions list below has its own way to
  // start staking.
  if (rows.length === 0 && !needsConnect) return null;

  return (
    <section className="fuel-edge min-w-0" aria-labelledby="board-title">
      <div className="flex items-center justify-between gap-4 px-6 py-4 tablet:px-10">
        <h2 id="board-title" className="fuel-label m-0 text-heading">
          {t('staking.board.title')}
        </h2>
        {!needsConnect && !isLoading && (
          <span className="fuel-label" aria-live="polite">
            {t('staking.board.count', { count: rows.length })}
          </span>
        )}
      </div>

      {rows.length > 0 && (
        <div
          aria-hidden
          className={`fuel-label hidden min-[720px]:grid ${COLUMNS} border-t border-[var(--fuel-border)] py-3`}
        >
          <span>{t('staking.board.col_lane')}</span>
          <span>{t('staking.board.col_what')}</span>
          <span>{t('staking.board.col_amount')}</span>
          <span>{t('staking.board.col_status')}</span>
          <span />
        </div>
      )}

      <ol className="m-0 list-none p-0">
        {rows.map((row) => (
          <BoardRow key={row.key} row={row} />
        ))}
      </ol>

      {needsConnect && (
        <div className="flex flex-col items-start gap-4 border-t border-[var(--fuel-border)] px-6 py-8 tablet:flex-row tablet:items-center tablet:justify-between tablet:px-10">
          <p className="m-0 text-[16px] leading-[20px] tracking-[-0.32px] text-[var(--fuel-element-low-em)]">
            {t('staking.connect_tokens')}
          </p>
          <Button
            size="2"
            color="gray"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            {t('staking.connect_ethereum')}
          </Button>
        </div>
      )}
    </section>
  );
}
