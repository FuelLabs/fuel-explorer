import { FUEL_INDEXER_API } from 'app-commons';
import type { Address } from 'viem';
import type { SequencerValidatorAddress } from '~staking/systems/Core';
import {
  type PendingTransaction,
  PendingTransactionTypeL1,
} from '~staking/systems/Core/hooks/usePendingTransactions';
import { api } from '~staking/systems/Core/utils/api';
import {
  type OperationBlockingInfo,
  checkOperationBlocking,
} from '~staking/systems/Core/utils/blocking';
import { convertEthAddressToSequencerValidatorAddress } from '~staking/systems/Staking/utils/convertEthAddressToSequencerValidatorAddress';
import type { StakingEventsData } from '../hooks/useStakingEvents/types';
import type {
  StakingEvent,
  StakingEventClaimRewards,
  StakingEventRedelegate,
  StakingEventStake,
  StakingEventUndelegate,
} from '../types/l1/events';
import { StakingEventType } from '../types/l1/events';

const DEFAULT_EVENTS_PER_PAGE = 25;
const PLACEHOLDER_HASH =
  '0x0000000000000000000000000000000000000000' as Address;
const PLACEHOLDER_TOKEN =
  '0x0000000000000000000000000000000000000000' as Address;

const buildStakingEventsUrl = (address: string) => {
  const queryParams = new URLSearchParams({
    address,
    last: DEFAULT_EVENTS_PER_PAGE.toString(),
  });

  return `${FUEL_INDEXER_API}/staking/events?${queryParams.toString()}`;
};

const isPendingEvent = (event: StakingEvent) => {
  // Use status field (same as Transactions page) to decide pending.
  // Pending = anything not Finalized or Skipped.
  return event.status !== 'Finalized' && event.status !== 'Skipped';
};

const getEventValidator = (
  event: StakingEvent,
): SequencerValidatorAddress | undefined => {
  switch (event.type) {
    case StakingEventType.Stake:
      return convertEthAddressToSequencerValidatorAddress(
        (event as StakingEventStake).validator,
      );
    case StakingEventType.Undelegate:
      return convertEthAddressToSequencerValidatorAddress(
        (event as StakingEventUndelegate).validator,
      );
    case StakingEventType.ReDelegate:
      return convertEthAddressToSequencerValidatorAddress(
        (event as StakingEventRedelegate).fromValidator,
      );
    case StakingEventType.ClaimRewards:
      return convertEthAddressToSequencerValidatorAddress(
        (event as StakingEventClaimRewards).validator,
      );
    default:
      return undefined;
  }
};

const mapEventToPendingType = (
  event: StakingEvent,
): PendingTransactionTypeL1 | null => {
  switch (event.type) {
    case StakingEventType.Stake:
      return PendingTransactionTypeL1.Delegate;
    case StakingEventType.ReDelegate:
      return PendingTransactionTypeL1.Redelegate;
    case StakingEventType.Undelegate:
      return PendingTransactionTypeL1.Undelegate;
    case StakingEventType.ClaimRewards:
      return PendingTransactionTypeL1.ClaimReward;
    case StakingEventType.Withdraw:
      return PendingTransactionTypeL1.WithdrawStart;
    default:
      return null;
  }
};

const toPendingTransactions = (
  events: StakingEvent[],
): PendingTransaction[] => {
  return events
    .filter(isPendingEvent)
    .map((event) => {
      const type = mapEventToPendingType(event);
      if (!type) return null;
      return {
        type,
        layer: 'l1',
        hash: PLACEHOLDER_HASH,
        token: PLACEHOLDER_TOKEN,
        symbol: 'FUEL',
        formatted: '0',
        displayed: true,
        completed: false,
        validator: getEventValidator(event),
      } as PendingTransaction;
    })
    .filter(Boolean) as PendingTransaction[];
};

export const getBlockingInfoFromStakingEvents = async (
  address: string | undefined,
  action: PendingTransactionTypeL1,
  validator?: SequencerValidatorAddress,
): Promise<OperationBlockingInfo> => {
  if (!address) return { isBlocked: false };
  try {
    const url = buildStakingEventsUrl(address);
    const data = await api.get<StakingEventsData>(url);
    const pendingTransactions = toPendingTransactions(data.nodes);
    return checkOperationBlocking(pendingTransactions, action, validator);
  } catch {
    return { isBlocked: false };
  }
};
