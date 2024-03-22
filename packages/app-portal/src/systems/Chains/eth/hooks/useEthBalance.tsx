import { useAccount, useBalance, useBlockNumber } from 'wagmi';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useEthBalance(token?: `0x${string}`) {
  const queryClient = useQueryClient();

  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: ethBalance, queryKey: ethBalanceQueryKey } = useBalance({
    address,
    token,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ethBalanceQueryKey });
  }, [queryClient, blockNumber, ethBalanceQueryKey]);

  return {
    ethBalance,
  };
}
