import {
  type QueryClient,
  type QueryKey,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
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
// Hitting the cap while older events remain sets `truncated`.
const ALL_EVENTS_MAX_PAGES = 20;

// Cache shape. The hook's public `data` is `nodes` alone.
// `hasNextPage` means this walk will request another page, not that the
// API still has history past the 1000 cap.
type AllStakingEventsCache = {
  nodes: StakingEvent[];
  truncated: boolean;
  hasNextPage: boolean;
};

// Reads every page, newest first, chained on endCursor. Each page is written
// into the cache before the next request, so the first page renders while older
// pages load. A refetch keeps the list already cached until the new walk has
// at least as many events, so the Transactions tab does not shrink to one page
// while it refreshes. A failed page rejects and leaves the pages already
// written in the cache.
export async function walkStakingEvents({
  address,
  queryClient,
  queryKey,
}: {
  address: Address | undefined;
  queryClient: QueryClient;
  queryKey: QueryKey;
}): Promise<AllStakingEventsCache> {
  const previous = queryClient.getQueryData<AllStakingEventsCache>(queryKey);
  const nodes: StakingEvent[] = [];
  let before: number | undefined;
  let result: AllStakingEventsCache = {
    nodes: [],
    truncated: false,
    hasNextPage: false,
  };

  for (let page = 0; page < ALL_EVENTS_MAX_PAGES; page++) {
    const data = await getStakingEvents({
      address,
      before,
      after: undefined,
      itemsPerPage: ALL_EVENTS_PAGE_SIZE,
    });
    nodes.push(...data.nodes);
    const historyEnded = !data.pageInfo.hasPreviousPage;
    const hitCap = page + 1 >= ALL_EVENTS_MAX_PAGES;
    result = {
      nodes: nodes.slice(),
      truncated: hitCap && !historyEnded,
      hasNextPage: !historyEnded && !hitCap,
    };
    const last = historyEnded || hitCap;
    if (!previous || last || nodes.length >= previous.nodes.length) {
      queryClient.setQueryData(queryKey, result);
    }
    if (last) return result;
    before = data.pageInfo.endCursor;
  }

  return result;
}

// One cached read shared by the board and the transactions tab. The key starts
// with the shared events key and includes 'all' and the address, so the
// existing invalidations refresh it.
export const useAllStakingEvents = (address: Address | undefined) => {
  const queryClient = useQueryClient();
  const queryKey = [
    ...QUERY_KEYS.stakingEvents(undefined, undefined, undefined, undefined),
    'all',
    address,
  ];

  const query = useQuery({
    queryKey,
    enabled: !!address,
    queryFn: () => walkStakingEvents({ address, queryClient, queryKey }),
  });

  const hasNextPage = query.data?.hasNextPage ?? false;
  const isFetchingNextPage = query.isFetching && hasNextPage;

  return {
    ...query,
    data: query.data?.nodes,
    truncated: query.data?.truncated ?? false,
    hasNextPage,
    isFetchingNextPage,
  };
};
