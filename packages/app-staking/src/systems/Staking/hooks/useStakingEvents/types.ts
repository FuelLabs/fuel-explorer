import type { Address } from 'viem';
import type { StakingEvent } from '../../types/l1/events';

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
