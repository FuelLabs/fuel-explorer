import { useQuery } from '@tanstack/react-query';
import type {
  SequencerValidatorAddress,
  StakingAddress,
} from '~staking/systems/Core';
import { cosmosApi } from '~staking/systems/Core/utils/api';
import { QUERY_KEYS } from '../../Core/utils/query';
import type { ServiceOptions } from './types';

export type Reward = {
  amount: string;
  denom: string;
};

export type RewardsData = {
  rewards: Array<{
    validator_address: SequencerValidatorAddress;
    reward: Array<Reward>;
  }>;
  total: Array<Reward>;
};

const queryFn = async (address?: StakingAddress): Promise<RewardsData> => {
  const data = await cosmosApi.get<RewardsData>(
    `/cosmos/distribution/v1beta1/delegators/${address}/rewards`,
  );

  return data;
};

export const useRewards = <T = RewardsData>(
  address?: StakingAddress,
  options?: ServiceOptions<RewardsData, Error, T>,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.rewards(address),
    queryFn: () => queryFn(address),
    enabled: !!address,
    ...options,
  });
};
