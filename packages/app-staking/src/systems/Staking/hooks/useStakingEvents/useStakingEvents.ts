import { useQuery } from '@tanstack/react-query';
import { FUEL_INDEXER_API } from 'app-commons';
import type { Address } from 'viem';
import { api } from '~staking/systems/Core/utils/api';
import { QUERY_KEYS } from '~staking/systems/Core/utils/query';
import type { StakingEvent } from '../../types/l1/events';
import type { GetStakingEventsParams, StakingEventsData } from './types';

const buildStakingEventsUrl = (params: GetStakingEventsParams) => {
  const { address = '', before, after, itemsPerPage } = params;
  const queryParams = new URLSearchParams({
    address,
    last: itemsPerPage.toString(),
  });

  if (before) {
    queryParams.append('before', before.toString());
  }
  if (after) {
    queryParams.append('after', after.toString());
  }

  return `${FUEL_INDEXER_API}/staking/events?${queryParams.toString()}`;
};

export const getStakingEvents = async (
  params: GetStakingEventsParams,
): Promise<StakingEventsData> => {
  const url = buildStakingEventsUrl(params);
  const data = await api.get<StakingEventsData>(url);
  return data;
};

// The API rejects a page size above 50.
const ALL_EVENTS_PAGE_SIZE = 50;
// Safety stop at 1000 events. Most accounts finish in the first request.
const ALL_EVENTS_MAX_PAGES = 20;

// The whole history, newest first. An unfinished undelegate or withdraw can
// sit behind many newer events, and filters need every event to count them.
async function getAllStakingEvents(address: Address) {
  const nodes: StakingEvent[] = [];
  let before: number | undefined;
  for (let page = 0; page < ALL_EVENTS_MAX_PAGES; page++) {
    const data = await getStakingEvents({
      address,
      before,
      after: undefined,
      itemsPerPage: ALL_EVENTS_PAGE_SIZE,
    });
    nodes.push(...data.nodes);
    // Pages are newest-first; hasPreviousPage says older events sit past endCursor.
    if (!data.pageInfo.hasPreviousPage) break;
    before = data.pageInfo.endCursor;
  }
  return nodes;
}

// One cached read shared by the board and the transactions tab. The key starts
// with the shared events key, so the existing invalidations refresh it.
export const useAllStakingEvents = (address: Address | undefined) =>
  useQuery({
    queryKey: [
      ...QUERY_KEYS.stakingEvents(undefined, undefined, undefined, undefined),
      'all',
      address,
    ],
    queryFn: () => getAllStakingEvents(address as Address),
    enabled: !!address,
  });
