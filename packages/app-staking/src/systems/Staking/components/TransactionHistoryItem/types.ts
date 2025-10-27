import type { StakingEvent } from '../../types/l1/events';

export type TransactionHistoryItemProps = {
  event: StakingEvent;
  hideSeparator?: boolean;
  isLoading?: boolean;
};
