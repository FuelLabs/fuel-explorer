import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { FUEL_INDEXER_API } from 'app-commons';
import { api } from '~staking/systems/Core/utils/api';
import { QUERY_KEYS } from '~staking/systems/Core/utils/query';
import type {
  GetStakingEventsParams,
  StakingEventsData,
  UseStakingEventsPagination,
  UseStakingEventsParams,
} from './types';

const DEFAULT_EVENTS_PER_PAGE = 10;

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

const getStakingEvents = async (
  params: GetStakingEventsParams,
): Promise<StakingEventsData> => {
  const url = buildStakingEventsUrl(params);
  const data = await api.get<StakingEventsData>(url);
  return data;
};

const getCursorParams = (pagination: UseStakingEventsPagination) => {
  const { direction, cursor, itemsPerPage } = pagination;

  return {
    before: direction === 'next' ? cursor : undefined,
    after: direction === 'prev' ? cursor : undefined,
    itemsPerPage: itemsPerPage ?? DEFAULT_EVENTS_PER_PAGE,
  };
};

export const useStakingEvents = ({
  address,
  pagination,
}: UseStakingEventsParams) => {
  const { before, after, itemsPerPage } = getCursorParams(pagination);

  return useQuery({
    queryKey: QUERY_KEYS.stakingEvents(address, before, after, itemsPerPage),
    queryFn: () => getStakingEvents({ address, before, after, itemsPerPage }),
    placeholderData: keepPreviousData,
    enabled: !!address,
  });
};
