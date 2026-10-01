import { GQLWithdrawStatusType } from '@fuel-explorer/graphql/sdk';
import { FuelToken, TOKENS } from 'app-commons';
import { DECIMAL_FUEL, bn } from 'fuels';
import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { formatAmount } from '~staking/systems/Core/utils/bn';
import { useRigClaimable } from '../../hooks/useRigClaimable';
import { useStakingEvents } from '../../hooks/useStakingEvents/useStakingEvents';
import { useAccountValidators } from '../../services/useAccountValidators';
import { useRewards } from '../../services/useRewards';
import type { StakingEvent } from '../../types/l1/events';

const { decimals } = TOKENS[FuelToken.V2];
const BOARD_EVENTS = {
  cursor: undefined,
  direction: undefined,
  itemsPerPage: 20,
} as const;

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
  const events = useStakingEvents({ address, pagination: BOARD_EVENTS });

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

    for (const event of onEthereum ? (events.data?.nodes ?? []) : []) {
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
