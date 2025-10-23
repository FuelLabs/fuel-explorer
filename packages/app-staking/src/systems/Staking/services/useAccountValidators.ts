import { useQuery } from '@tanstack/react-query';
import type {
  SequencerValidatorAddress,
  StakingAddress,
} from '~staking/systems/Core';
import { cosmosApi } from '~staking/systems/Core/utils/api';
import { QUERY_KEYS } from '../../Core/utils/query';
import type { ServiceOptions } from './types';

export type AccountValidator = {
  operator_address: SequencerValidatorAddress;
  consensus_pubkey: {
    '@type': string;
    key: string;
  };
  jailed: boolean;
  status: string;
  tokens: string;
  delegator_shares: string;
  description: {
    moniker: string;
    identity: string;
    website: string;
    security_contact: string;
    details: string;
  };
  unbonding_height: string;
  unbonding_time: string;
  commission: {
    commission_rates: {
      rate: string;
      max_rate: string;
      max_change_rate: string;
    };
    update_time: string;
  };
  min_self_delegation: string;
  unbonding_on_hold_ref_count: string;
  unbonding_ids: string[];
};

export type AccountValidatorsData = {
  validators: AccountValidator[];
  pagination: {
    next_key: string | null;
    total: string;
  };
};

const queryFn = async (
  address?: StakingAddress,
): Promise<AccountValidatorsData> => {
  try {
    const data = await cosmosApi.get<AccountValidatorsData>(
      `/cosmos/staking/v1beta1/delegators/${address}/validators`,
    );
    return data;
  } catch (error) {
    console.error('useAccountValidators - error:', error);
    throw error;
  }
};

export const useAccountValidators = <T = AccountValidatorsData>(
  address?: StakingAddress,
  options?: ServiceOptions<AccountValidatorsData, Error, T>,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.accountValidators(address),
    queryFn: () => queryFn(address),
    enabled: !!address,
    ...options,
  });
};
