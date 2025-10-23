import { type Address, erc20Abi } from 'viem';
import { useReadContract } from 'wagmi';

export const useTokenAllowance = (
  token: Address,
  spender: Address,
  owner: Address | undefined,
) => {
  return useReadContract({
    address: token,
    abi: erc20Abi,
    functionName: 'allowance',
    args: owner ? [owner, spender] : undefined,
    query: {
      enabled: !!owner,
    },
  });
};
