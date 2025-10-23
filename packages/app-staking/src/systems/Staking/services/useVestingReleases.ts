import { CURRENT_NETWORK_CONTRACTS } from 'app-commons';
import type { Address } from 'viem';
import { useReadContract } from 'wagmi';
import { tokenFaucetAbi } from '~staking/contracts/tokenFaucet/tokenFaucetAbi';

export const useVestingReleases = (address?: Address) => {
  return useReadContract({
    address: CURRENT_NETWORK_CONTRACTS.FUEL_VESTING,
    abi: tokenFaucetAbi,
    functionName: 's_releases',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });
};
