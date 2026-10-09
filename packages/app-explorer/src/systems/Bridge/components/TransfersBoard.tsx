import { Button, IconChevronRight, LoadingBox } from '@fuels/ui';
import { Routes } from 'app-commons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  BRIDGE_STEP_ID,
  BRIDGE_STEP_STATUS_ID,
  type BridgeStepId,
  type BridgeStepStatusId,
} from '~portal/systems/Bridge/components/BridgeSteps';
import { useBridgeTxs } from '~portal/systems/Bridge/hooks';
import {
  isEthChain,
  isFuelChain,
  useFuelAccountConnection,
  useTxEthToFuel,
  useTxFuelToEth,
} from '~portal/systems/Chains';
import type { TransfersRailProps } from './BridgePageShell';

type Kind = 'loading' | 'action' | 'progress' | 'settled';

type Step = {
  id: BridgeStepId;
  name: string;
  status: string;
  statusId?: BridgeStepStatusId;
  isLoading?: boolean;
  isDone?: boolean;
  isSelected?: boolean;
};

type RowData = {
  direction: 'deposit' | 'withdraw';
  steps?: Step[];
  settled: boolean;
  loading: boolean;
  amount?: string;
  symbol?: string;
  onOpen: () => void;
};

const COLUMNS =
  'items-center gap-x-6 gap-y-3 px-6 tablet:px-10 tablet:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.4fr)_96px]';
const ROW_GRID = `grid ${COLUMNS} border-t border-[var(--fuel-border)] py-4`;
const GROUP: Record<Kind, number> = {
  action: 0,
  progress: 1,
  loading: 1,
  settled: 2,
};

type Entry =
  | { id: string; txHash: string; nonce: BigInt }
  | { id: string; txHash: string; nonce?: undefined };

function currentStep(steps: Step[] | undefined) {
  return steps?.find((s) => s.isSelected) ?? steps?.find((s) => !s.isDone);
}

function kindOf({ steps, settled }: RowData): Kind {
  if (settled) return 'settled';
  if (!steps) return 'loading';
  const current = currentStep(steps);
  // Automatic confirmations need nothing from the user.
  if (
    current?.id === BRIDGE_STEP_ID.confirmTransaction &&
    !current.isLoading &&
    current.statusId !== BRIDGE_STEP_STATUS_ID.automatic
  ) {
    return 'action';
  }
  return 'progress';
}

function StepTrack({ steps }: { steps: Step[] }) {
  const current = currentStep(steps);
  return (
    <span aria-hidden className="flex w-full max-w-[160px] gap-[2px]">
      {steps.map((step) => (
        <span
          key={step.id}
          className={`block h-[2px] flex-1 ${
            step.isDone
              ? 'bg-[var(--fuel-element-high-em)]'
              : step === current
                ? 'bg-[var(--fuel-element-mid-em)]'
                : 'bg-[var(--fuel-line)]'
          }`}
        />
      ))}
    </span>
  );
}

function TransferRow({ data, kind }: { data: RowData; kind: Kind }) {
  const { t } = useTranslation();
  if (kind === 'settled') return null;

  const deposit = data.direction === 'deposit';
  const current = currentStep(data.steps);

  return (
    <li className={`${ROW_GRID} fuel-appear`}>
      <span className="flex min-w-0 flex-col">
        <span className="font-medium text-heading">
          {deposit ? t('bridge.board.deposit') : t('bridge.board.withdraw')}
        </span>
        <span className="truncate text-[14px] leading-[18px] text-[var(--fuel-element-low-em)]">
          {deposit
            ? t('bridge.board.route_deposit')
            : t('bridge.board.route_withdraw')}
        </span>
      </span>

      <span className="flex items-baseline gap-2">
        {data.amount ? (
          <>
            <span className="fuel-stat-sm whitespace-nowrap">
              {data.amount}
            </span>
            <span className="fuel-label">{data.symbol}</span>
          </>
        ) : (
          <LoadingBox className="h-5 w-24" />
        )}
      </span>

      <span className="flex min-w-0 flex-col gap-2">
        {kind === 'loading' || !current ? (
          <LoadingBox className="h-4 w-32" />
        ) : (
          <>
            <span className="flex items-center gap-2">
              <span
                aria-hidden
                className={
                  kind === 'action'
                    ? 'fuel-square'
                    : 'size-2 shrink-0 border border-[var(--fuel-indicator-border)]'
                }
              />
              <span
                className={`fuel-label ${
                  kind === 'action'
                    ? 'text-[var(--fuel-element-high-em)]'
                    : 'text-[var(--fuel-element-mid-em)]'
                }`}
              >
                {kind === 'action'
                  ? t('bridge.board.action_needed')
                  : `${current.name} · ${current.status}`}
              </span>
            </span>
            {data.steps && <StepTrack steps={data.steps} />}
          </>
        )}
      </span>

      <span className="tablet:justify-self-end">
        {kind === 'action' && (
          <Button size="2" onClick={data.onOpen}>
            {t('bridge.board.continue')}
          </Button>
        )}
        {kind === 'progress' && (
          <Button size="2" variant="ghost" color="gray" onClick={data.onOpen}>
            {t('bridge.board.details')}
          </Button>
        )}
      </span>
    </li>
  );
}

type ReportProps = { id: string; report: (id: string, kind: Kind) => void };

function DepositRow({
  txHash,
  nonce,
  id,
  report,
}: ReportProps & { txHash: string; nonce: BigInt }) {
  const tx = useTxEthToFuel({ id: txHash, messageSentEventNonce: nonce });
  const data: RowData = {
    direction: 'deposit',
    steps: tx.steps,
    settled: !!tx.status?.isReceiveDone,
    loading: !!tx.isLoadingReceipts,
    amount: tx.amount,
    symbol: tx.asset?.symbol,
    onOpen: () =>
      tx.handlers.openTxEthToFuel({
        txId: txHash,
        messageSentEventNonce: nonce,
      }),
  };
  const kind = kindOf(data);
  useEffect(() => report(id, kind), [report, id, kind]);
  return <TransferRow data={data} kind={kind} />;
}

function WithdrawRow({ txHash, id, report }: ReportProps & { txHash: string }) {
  const tx = useTxFuelToEth({ txId: txHash });
  const data: RowData = {
    direction: 'withdraw',
    steps: tx.steps,
    settled: !!tx.status?.isReceiveDone,
    loading: !!tx.isLoadingTxResult,
    amount: tx.amount,
    symbol: tx.asset?.symbol,
    onOpen: () => tx.handlers.openTxFuelToEth({ txId: txHash }),
  };
  const kind = kindOf(data);
  useEffect(() => report(id, kind), [report, id, kind]);
  return <TransferRow data={data} kind={kind} />;
}

export function TransfersBoard({
  onCollapse,
  onCountChange,
}: Partial<TransfersRailProps>) {
  const { t } = useTranslation();
  const { handlers: fuelHandlers, isConnecting } = useFuelAccountConnection();
  const { bridgeTxs, isLoading, shouldShowNotConnected, shouldShowEmpty } =
    useBridgeTxs();
  const [kinds, setKinds] = useState<Record<string, Kind>>({});

  const report = useCallback((id: string, kind: Kind) => {
    setKinds((prev) => (prev[id] === kind ? prev : { ...prev, [id]: kind }));
  }, []);

  // Deposits and withdrawals use different hooks, so each tx becomes one
  // renderable entry with a stable id.
  const entries = useMemo<Entry[]>(
    () =>
      (bridgeTxs ?? []).flatMap((tx): Entry[] => {
        if (
          isEthChain(tx.fromNetwork) &&
          isFuelChain(tx.toNetwork) &&
          tx.txHash &&
          tx.nonce != null
        ) {
          return [
            {
              id: `${tx.txHash}-${tx.nonce}`,
              txHash: tx.txHash as string,
              nonce: tx.nonce as BigInt,
            },
          ];
        }
        if (
          isFuelChain(tx.fromNetwork) &&
          isEthChain(tx.toNetwork) &&
          tx.txHash
        ) {
          return [{ id: tx.txHash as string, txHash: tx.txHash as string }];
        }
        return [];
      }),
    [bridgeTxs],
  );

  // Action first, then in progress. Settled rows render nothing.
  const ordered = useMemo(
    () =>
      entries
        .map((entry, index) => ({ entry, index }))
        .sort(
          (a, b) =>
            GROUP[kinds[a.entry.id] ?? 'loading'] -
              GROUP[kinds[b.entry.id] ?? 'loading'] || a.index - b.index,
        )
        .map(({ entry }) => entry),
    [entries, kinds],
  );

  const open = entries.filter((e) => kinds[e.id] !== 'settled');
  const stillLoading = entries.some(
    (e) => (kinds[e.id] ?? 'loading') === 'loading',
  );
  const showEmpty = !isLoading && !stillLoading && open.length === 0;
  const known = !shouldShowNotConnected && !isLoading && !stillLoading;
  const openCount = known ? open.length : 0;

  useEffect(() => onCountChange?.(openCount), [onCountChange, openCount]);

  return (
    <section className="fuel-edge min-w-0" aria-labelledby="transfers-title">
      <div className="flex items-center justify-between gap-4 px-6 pt-8 pb-6 tablet:px-10">
        <h2
          id="transfers-title"
          className="m-0 font-medium text-heading text-[28px] leading-[32px] tracking-[-1.12px]"
        >
          {t('bridge.board.title')}
        </h2>
        <span className="flex items-center gap-4">
          {known && (
            <span className="fuel-label" aria-live="polite">
              {t('bridge.board.count', { count: open.length })}
            </span>
          )}
          {onCollapse && (
            <Button
              size="2"
              variant="ghost"
              color="gray"
              aria-label={t('bridge.board.collapse')}
              aria-controls="transfers-board"
              aria-expanded
              onClick={onCollapse}
              className="hidden desktop:inline-flex"
            >
              <IconChevronRight size={16} aria-hidden />
            </Button>
          )}
        </span>
      </div>

      {!shouldShowNotConnected && open.length > 0 && (
        <div
          aria-hidden
          className={`fuel-label hidden tablet:grid ${COLUMNS} py-3`}
        >
          <span>{t('bridge.board.col_what')}</span>
          <span>{t('bridge.board.col_amount')}</span>
          <span>{t('bridge.board.col_status')}</span>
          <span />
        </div>
      )}

      <ol className="m-0 list-none p-0">
        {ordered.map((entry) =>
          entry.nonce !== undefined ? (
            <DepositRow
              key={entry.id}
              id={entry.id}
              txHash={entry.txHash}
              nonce={entry.nonce}
              report={report}
            />
          ) : (
            <WithdrawRow
              key={entry.id}
              id={entry.id}
              txHash={entry.txHash}
              report={report}
            />
          ),
        )}
      </ol>

      {isLoading && (
        <div
          className="border-t border-[var(--fuel-border)] px-6 py-4 tablet:px-10"
          role="status"
          aria-label={t('bridge.board.loading')}
        >
          <LoadingBox className="h-6 w-full max-w-[420px]" />
        </div>
      )}

      {shouldShowNotConnected && (
        <div className="flex flex-col items-start gap-4 border-t border-[var(--fuel-border)] px-6 py-8 tablet:flex-row tablet:items-center tablet:justify-between tablet:px-10">
          <p className="m-0 text-[16px] leading-[20px] tracking-[-0.32px] text-[var(--fuel-element-low-em)]">
            {t('bridge.board.connect')}
          </p>
          <Button
            size="2"
            color="gray"
            variant="outline"
            isLoading={isConnecting}
            onClick={fuelHandlers.connect}
          >
            {t('bridge.board.connect_button')}
          </Button>
        </div>
      )}

      {!shouldShowNotConnected && (shouldShowEmpty || showEmpty) && (
        <div className="flex flex-col items-start gap-4 border-t border-[var(--fuel-border)] px-6 py-8 tablet:flex-row tablet:items-center tablet:justify-between tablet:px-10">
          <p className="m-0 text-[16px] leading-[20px] tracking-[-0.32px] text-[var(--fuel-element-low-em)]">
            {shouldShowEmpty ? t('bridge.board.none') : t('bridge.board.empty')}
          </p>
          {!shouldShowEmpty && (
            <Button
              as={Link}
              to={Routes.bridgeHistory()}
              size="2"
              color="gray"
              variant="outline"
            >
              {t('bridge.board.open_history')}
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
