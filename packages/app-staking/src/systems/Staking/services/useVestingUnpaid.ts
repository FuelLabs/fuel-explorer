import { CURRENT_NETWORK_CONTRACTS } from 'app-commons';
import type { Address } from 'viem';
import { useReadContract } from 'wagmi';
import { tokenReleaseAbi } from '~staking/contracts/tokenFaucet/tokenReleaseAbi';

export const useVestingUnpaid = (address?: Address) => {
  return useReadContract({
    address: CURRENT_NETWORK_CONTRACTS.FUEL_VESTING,
    abi: tokenReleaseAbi,
    functionName: 'unpaid',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });
};
