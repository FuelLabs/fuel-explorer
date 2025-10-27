import { useQuery } from '@tanstack/react-query';
import type {
  SequencerValidatorAddress,
  StakingAddress,
} from '~staking/systems/Core';
import { cosmosApi } from '~staking/systems/Core/utils/api';
import { QUERY_KEYS } from '../../../Core/utils/query';
import type { ServiceOptions } from '../types';
import type { ValidatorRewardsData } from './types';

const queryFn = async (
  validator?: SequencerValidatorAddress,
  address?: StakingAddress,
): Promise<ValidatorRewardsData> => {
  const data = await cosmosApi.get<ValidatorRewardsData>(
    `/cosmos/distribution/v1beta1/delegators/${address}/rewards/${validator}`,
  );

  return data;
};

export const useValidatorRewards = <T = ValidatorRewardsData>(
  validator?: SequencerValidatorAddress,
  address?: StakingAddress,
  options?: ServiceOptions<ValidatorRewardsData, Error, T>,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.validatorRewards(validator, address),
    queryFn: () => queryFn(validator, address),
    enabled: !!validator && !!address,
    ...options,
  });
};
