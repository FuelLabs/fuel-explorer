import { FuelToken, TOKENS } from 'app-commons';
import { DECIMAL_FUEL, bn } from 'fuels';
import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { formatAmount } from '~staking/systems/Core/utils/bn';
import { useRigClaimable } from '../../hooks/useRigClaimable';
import { useAllStakingEvents } from '../../hooks/useStakingEvents/useStakingEvents';
import { useAccountValidators } from '../../services/useAccountValidators';
import { useRewards } from '../../services/useRewards';
import type { StakingEvent } from '../../types/l1/events';
import { eventStatus } from '../TransactionHistoryItem/constants';

const { decimals } = TOKENS[FuelToken.V2];

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
      kind: 'action' | 'progress';
      key: string;
      event: StakingEvent;
      endsAt: number;
      amount: ReturnType<typeof formatAmount>;
    };

// A failed transaction is history, not work: it stays in Your transactions
// and off the board.
function eventKind(event: StakingEvent) {
  const status = eventStatus(event);
  return status === 'action' || status === 'progress' ? status : null;
}

const GROUP = { rig: 0, claim: 0, action: 0, progress: 1 } as const;

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
  const events = useAllStakingEvents(address);

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

    return list.sort((a, b) => {
      const byGroup = group(a) - group(b);
      if (byGroup) return byGroup;
      // Infinity - Infinity is NaN, so equal ends are compared directly.
      if (endsAt(a) === endsAt(b)) return 0;
      // Items run by nearest finish.
      return endsAt(a) < endsAt(b) ? -1 : 1;
    });
  }, [onEthereum, pendingDeposit, rewards.data, positions.data, events.data]);

  // Disabled queries (no address) sit in pending forever. History reports
  // success on the first page, so it is still loading while another page is
  // outstanding. A failure stays an error so the board does not look empty.
  const watching = !!address && isConnected;
  const settled = (query: { isSuccess: boolean; isError: boolean }) =>
    query.isSuccess || query.isError;
  const eventsSettled =
    events.isError ||
    (settled(events) && !events.hasNextPage && !events.isFetchingNextPage);
  const isLoading =
    watching && !(settled(rewards) && eventsSettled && settled(positions));
  const isError =
    watching && (rewards.isError || events.isError || positions.isError);

  const refetch = () => {
    if (rewards.isError) void rewards.refetch();
    if (events.isError) void events.refetch();
    if (positions.isError) void positions.refetch();
  };

  return {
    rows,
    needsConnect: onEthereum && !isConnected,
    isLoading,
    isError,
    refetch,
    truncated: onEthereum && events.truncated,
  };
}
