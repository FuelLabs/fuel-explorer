import { useQuery } from '@tanstack/react-query';
import { cosmosApi } from '~staking/systems/Core/utils/api';
import { QUERY_KEYS } from '../../Core/utils/query';

import type { ServiceOptions } from './types';

export type PoolData = {
  pool: {
    not_bonded_tokens: string;
    bonded_tokens: string;
  };
};

const queryFn = async () => {
  const data = await cosmosApi.get<PoolData>('/cosmos/staking/v1beta1/pool');
  return data;
};

export const usePool = <T = PoolData>(
  options?: ServiceOptions<PoolData, Error, T>,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.pool,
    queryFn,
    ...options,
  });
};
