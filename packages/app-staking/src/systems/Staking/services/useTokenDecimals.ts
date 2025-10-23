import { keepPreviousData } from '@tanstack/react-query';
import type { HexAddress } from 'app-commons';
import { erc20Abi } from 'viem';
import { useReadContract } from 'wagmi';

export const useTokenDecimals = (contract: HexAddress | undefined) => {
  return useReadContract({
    address: contract,
    abi: erc20Abi,
    functionName: 'decimals',
    query: {
      enabled: !!contract,
      gcTime: Number.POSITIVE_INFINITY,
      placeholderData: keepPreviousData,
      meta: {
        persist: true,
      },
    },
  });
};
