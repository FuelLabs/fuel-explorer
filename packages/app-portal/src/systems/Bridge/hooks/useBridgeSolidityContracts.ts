import { useNamedQuery } from '@fuels/react';
import { getBridgeSolidityContracts } from 'app-commons';

export function useBridgeSolidityContracts({
  query: { enabled },
}: {
  query: {
    enabled?: boolean;
  };
}) {
  return useNamedQuery('bridgeSolidityContracts', {
    queryKey: ['fuel', 'bridge', 'solidity-contracts'],
    queryFn: getBridgeSolidityContracts,
    placeholderData: undefined,
    enabled,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
