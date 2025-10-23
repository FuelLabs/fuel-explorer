import type { Address } from 'viem';
import type { StakingEvent } from '../../types/l1/events';

export interface UseStakingEventsPagination {
  direction: 'next' | 'prev' | undefined;
  cursor: number | undefined;
  itemsPerPage?: number;
}

export interface UseStakingEventsParams {
  address: Address | undefined;
  pagination: UseStakingEventsPagination;
}

export interface GetStakingEventsParams {
  address: Address | undefined;
  before: number | undefined;
  after: number | undefined;
  itemsPerPage: number;
}

export interface StakingEventsData {
  nodes: StakingEvent[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: number;
    endCursor: number;
  };
}
