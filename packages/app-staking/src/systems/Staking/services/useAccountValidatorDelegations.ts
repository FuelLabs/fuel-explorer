import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type {
  SequencerValidatorAddress,
  StakingAddress,
} from '~staking/systems/Core';
import { cosmosApi } from '~staking/systems/Core/utils/api';
import { QUERY_KEYS } from '../../Core/utils/query';
import type { ServiceOptions } from './types';

export interface AccountDelegation {
  delegation_response: {
    delegation: {
      delegator_address: string;
      validator_address: string;
      shares: string;
    };
    balance: {
      denom: string;
      amount: string;
    };
  };
}

const queryFn = async (
  address?: StakingAddress,
  validator?: SequencerValidatorAddress,
): Promise<AccountDelegation> => {
  const data = await cosmosApi.get<AccountDelegation>(
    `/cosmos/staking/v1beta1/validators/${validator}/delegations/${address}`,
  );

  return data;
};

interface Props<T = AccountDelegation> {
  address: StakingAddress | undefined;
  validator: SequencerValidatorAddress | undefined;
  options?: ServiceOptions<AccountDelegation, Error, T>;
}

/**
 * @description Get the total amount of tokens delegated delegated by the account to the specific validator
 * @param address Account address
 * @param validator Validator address
 * @param options Query options
 * @returns Total amount of tokens delegated delegated by the account to the specific validator
 */
export const useAccountValidatorDelegations = <T = AccountDelegation>({
  address,
  validator,
  options,
}: Props<T>) => {
  return useQuery({
    queryKey: QUERY_KEYS.accountValidatorDelegations(address, validator),
    queryFn: () => queryFn(address, validator),
    enabled: !!address,
    placeholderData: keepPreviousData,
    ...options,
  });
};
