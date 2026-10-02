import { GQLWithdrawStatusType } from '@fuel-explorer/graphql/sdk';
import { useQuery } from '@tanstack/react-query';
import { FuelToken, TOKENS } from 'app-commons';
import { DECIMAL_FUEL, bn } from 'fuels';
import { useMemo } from 'react';
import type { Address } from 'viem';
import { useAccount } from 'wagmi';
import { formatAmount } from '~staking/systems/Core/utils/bn';
import { QUERY_KEYS } from '~staking/systems/Core/utils/query';
import { useRigClaimable } from '../../hooks/useRigClaimable';
import { getStakingEvents } from '../../hooks/useStakingEvents/useStakingEvents';
import { useAccountValidators } from '../../services/useAccountValidators';
import { useRewards } from '../../services/useRewards';
import type { StakingEvent } from '../../types/l1/events';

const { decimals } = TOKENS[FuelToken.V2];
// The API rejects a page size above 50.
const EVENTS_PAGE_SIZE = 50;
// Safety stop at 1000 events. Most accounts finish in the first request.
const EVENTS_MAX_PAGES = 20;

// An unfinished undelegate or withdraw can sit behind many newer events, so the
// board reads the whole history, newest first, instead of one page.
async function getAllStakingEvents(address: Address) {
  const nodes: StakingEvent[] = [];
  let before: number | undefined;
  for (let page = 0; page < EVENTS_MAX_PAGES; page++) {
    const data = await getStakingEvents({
      address,
      before,
      after: undefined,
      itemsPerPage: EVENTS_PAGE_SIZE,
    });
    nodes.push(...data.nodes);
    if (!data.pageInfo.hasNextPage) break;
    before = data.pageInfo.endCursor;
  }
  return nodes;
}

export type AttentionRow =
  | { kind: 'rig-claim'; key: string; amount: string }
  | {
      kind: 'claim';
      key: string;
      validator: string;
      name: string;
      amount: ReturnType<typeof formatAmount>;
    }
  | {
      kind: 'action' | 'progress' | 'failed';
      key: string;
      event: StakingEvent;
      endsAt: number;
      amount: ReturnType<typeof formatAmount>;
    };

// Same status reading as the transaction history rows.
function eventKind(event: StakingEvent) {
  if (event.status === GQLWithdrawStatusType.Finalized) return null;
  if (event.status === GQLWithdrawStatusType.ReadyToProcessWithdraw) {
    return 'action';
  }
  if (event.status === GQLWithdrawStatusType.Skipped) return 'failed';
  return 'progress';
}

const GROUP = { rig: 0, claim: 0, action: 0, progress: 1, failed: 2 } as const;

export type Lane = 'rig' | 'ethereum';

// The board shows one path at a time. Ethereum data is not requested on the Rig path.
export function useAttentionRows(lane: Lane) {
  const onEthereum = lane === 'ethereum';
  const { address: walletAddress, isConnected } = useAccount();
  const address = onEthereum ? walletAddress : undefined;
  const { pendingDeposit } = useRigClaimable();
  const rewards = useRewards(address);
  const positions = useAccountValidators(address, {
    select: (data) => data.validators,
  });
  const events = useQuery({
    // Starts with the shared events key, so the existing invalidations refresh it.
    queryKey: [
      ...QUERY_KEYS.stakingEvents(undefined, undefined, undefined, undefined),
      'attention',
      address,
    ],
    queryFn: () => getAllStakingEvents(address as Address),
    enabled: !!address,
  });

  const rows = useMemo(() => {
    const list: AttentionRow[] = [];

    if (!onEthereum && pendingDeposit?.gt(0)) {
      list.push({
        kind: 'rig-claim',
        key: 'rig-claim',
        amount: pendingDeposit.format({ units: DECIMAL_FUEL, precision: 2 }),
      });
    }

    for (const entry of onEthereum ? (rewards.data?.rewards ?? []) : []) {
      // The API returns decimal strings, so each amount is cut to an integer first.
      const total = (entry.reward ?? []).reduce(
        (sum, item) => sum.add(bn(Math.floor(Number(item.amount ?? 0)))),
        bn(0),
      );
      if (total.isZero()) continue;
      const position = positions.data?.find(
        (item) => item.operator_address === entry.validator_address,
      );
      list.push({
        kind: 'claim',
        key: `claim-${entry.validator_address}`,
        validator: entry.validator_address,
        name: position?.description.moniker ?? entry.validator_address,
        amount: formatAmount(total, decimals),
      });
    }

    for (const event of onEthereum ? (events.data ?? []) : []) {
      const kind = eventKind(event);
      if (!kind) continue;
      const finishes = Date.parse(event.timestampToFinish ?? '');
      list.push({
        kind,
        key: `event-${event.id}`,
        event,
        endsAt: Number.isNaN(finishes) ? Number.POSITIVE_INFINITY : finishes,
        amount: formatAmount(event.amount, decimals),
      });
    }

    const group = (row: AttentionRow) =>
      GROUP[row.kind === 'rig-claim' ? 'rig' : row.kind];
    const endsAt = (row: AttentionRow) =>
      'endsAt' in row ? row.endsAt : Number.NEGATIVE_INFINITY;

    return list.sort(
      (a, b) =>
        group(a) - group(b) ||
        // Infinity - Infinity is NaN, so equal ends are compared directly.
        (endsAt(a) === endsAt(b) ? 0 : endsAt(a) < endsAt(b) ? -1 : 1),
    );
  }, [onEthereum, pendingDeposit, rewards.data, positions.data, events.data]);

  const isLoading =
    onEthereum &&
    isConnected &&
    (rewards.isPending || events.isPending || positions.isPending);

  return {
    rows,
    needsConnect: onEthereum && !isConnected,
    isLoading,
    hasPositions: (positions.data?.length ?? 0) > 0,
  };
}
