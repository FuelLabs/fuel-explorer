import { bn } from 'fuels';
import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useAccountDelegations } from './useAccountDelegations';

export function useStakedBalanceL1() {
  const { address } = useAccount();
  const { data: delegations } = useAccountDelegations({ address });
  const totalStaked = useMemo(() => {
    const delegationsResponse = delegations?.delegation_responses || [];
    return delegationsResponse.reduce((acc, delegation) => {
      return acc.add(delegation.balance.amount);
    }, bn(0));
  }, [delegations]);

  return {
    total: totalStaked,
  };
}
