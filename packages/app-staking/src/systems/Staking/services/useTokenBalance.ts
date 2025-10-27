import { type Address, erc20Abi } from 'viem';
import { useReadContract } from 'wagmi';

export const useTokenBalance = (
  contract: Address,
  account: Address | undefined,
) => {
  return useReadContract({
    address: contract,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: account ? [account] : undefined,
    query: {
      enabled: !!account,
    },
  });
};
