import { useQuery } from '@tanstack/react-query';
import type { HexAddress } from 'app-commons';
import type { SequencerValidatorAddress } from '~staking/systems/Core';
import { cosmosApi } from '~staking/systems/Core/utils/api';
import { QUERY_KEYS } from '../../Core/utils/query';
import type { ServiceOptions } from './types';

type BaseAccount = {
  address: SequencerValidatorAddress;
  pub_key: null;
  account_number: string;
  sequence: string;
};

type Vesting = {
  denom: string;
  amount: string;
};

interface Account extends Partial<BaseAccount> {
  base_account?: BaseAccount;
  vesting_account?: {
    base_vesting_account: {
      base_account: BaseAccount;
      original_vesting: Vesting[];
      delegated_free: [{ denom: string; amount: string }];
      delegated_vesting: [{ denom: string; amount: string }];
      end_time: string;
    };
    start_time: string;
  };
}

export type AccountData = {
  account: Account;
};

const queryFn = async (
  address?: SequencerValidatorAddress | HexAddress,
): Promise<AccountData> => {
  const data = await cosmosApi.get<AccountData>(
    `/cosmos/auth/v1beta1/accounts/${address}`,
  );

  return data;
};

export const useSequencerAccount = <T = AccountData>(
  address?: SequencerValidatorAddress | HexAddress,
  options?: ServiceOptions<AccountData, Error, T>,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.sequencerAccount(address),
    queryFn: () => queryFn(address),
    enabled: !!address,
    gcTime: !address ? 0 : 300_000, //5 minutes
    ...options,
  });
};
