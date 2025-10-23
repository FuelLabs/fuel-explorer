import { useQuery } from '@tanstack/react-query';
import type { StakingAddress } from '~staking/systems/Core';
import { cosmosApi } from '~staking/systems/Core/utils/api';
import { QUERY_KEYS } from '../../Core/utils/query';

export type SharedSequencerBalance = {
  denom: string;
  amount: string;
};

export type SharedSequencerBalances = {
  balances: SharedSequencerBalance[];
};

const queryFn = async (
  address?: StakingAddress,
): Promise<SharedSequencerBalance> => {
  const data = await cosmosApi.get<SharedSequencerBalances>(
    `/cosmos/bank/v1beta1/spendable_balances/${address}?pagination_limit=1000`,
  );

  return data.balances[0] ?? { denom: '', amount: '0' };
};

export function useSharedSequencerBalance(address: StakingAddress | undefined) {
  return useQuery({
    queryKey: QUERY_KEYS.sequencerBalance(address),
    queryFn: () => queryFn(address),
    enabled: !!address,
  });
}
