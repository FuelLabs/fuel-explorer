import { type Address, erc20Abi } from 'viem';
import { useReadContract } from 'wagmi';

type Query = {
  enabled?: boolean;
  refetchInterval?: number;
};

export const useTokenAllowance = (
  token: Address | undefined,
  spender: Address | undefined,
  owner: Address | undefined,
  query?: Query,
) => {
  return useReadContract({
    address: token,
    abi: erc20Abi,
    functionName: 'allowance',
    args: owner && spender ? [owner, spender] : undefined,
    query: {
      ...query,
      // Add automatic refetch every 5 seconds to catch allowance updates
      refetchInterval: query?.refetchInterval ?? 5000,
    },
  });
};
