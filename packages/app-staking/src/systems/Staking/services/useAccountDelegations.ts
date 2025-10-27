import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { StakingAddress } from '~staking/systems/Core';
import { cosmosApi } from '~staking/systems/Core/utils/api';
import { QUERY_KEYS } from '../../Core/utils/query';
import type { ServiceOptions } from './types';

export interface AccountDelegations {
  delegation_responses: Array<{
    delegation: {
      delegator_address: string;
      validator_address: string;
      shares: string;
    };
    balance: {
      denom: string;
      amount: string;
    };
  }>;
  pagination: {
    next_key: string;
    total: string;
  };
}

const queryFn = async (
  address?: StakingAddress,
): Promise<AccountDelegations> => {
  const data = await cosmosApi.get<AccountDelegations>(
    `/cosmos/staking/v1beta1/delegations/${address}`,
  );

  return data;
};

interface Props<T = AccountDelegations> {
  address: StakingAddress | undefined;
  options?: ServiceOptions<AccountDelegations, Error, T>;
}

/**
 * @description Get the total amount of tokens delegated delegated by the account to the specific validator
 * @param address Account address
 * @param options Query options
 * @returns Total amount of tokens delegated delegated by the account to the specific validator
 */
export const useAccountDelegations = <T = AccountDelegations>({
  address,
  options,
}: Props<T>) => {
  return useQuery({
    queryKey: QUERY_KEYS.accountDelegations(address),
    queryFn: () => queryFn(address),
    enabled: !!address,
    placeholderData: keepPreviousData,
    ...options,
  });
};
