import { type Address, parseAbi } from 'viem';
import { useReadContract } from 'wagmi';

const ethLimitAmount = parseAbi([
  'function limitAmount() view returns (uint256)',
]);

const erc20LimitAmount = parseAbi([
  'function limitAmount(address) view returns (uint256)',
]);

export const useWithdrawLimit = (
  address: Address | undefined,
  token: Address | undefined,
) => {
  return useReadContract({
    address,
    abi: token ? erc20LimitAmount : ethLimitAmount,
    functionName: 'limitAmount',
    args: token ? [token] : undefined,
    query: {
      staleTime: Number.POSITIVE_INFINITY,
      enabled: !!address,
    },
  });
};
