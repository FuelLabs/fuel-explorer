import { useReadContract } from 'wagmi';
import { ETH_CHAIN } from '../../chains/eth';
import { CURRENT_NETWORK_CONTRACTS } from '../../utils/stakingAddresses';
import { abi } from '../usePausedContract/abi';

const PAUSED_POLL_INTERVAL_MS = 60_000;

export const useFuelStreamXPaused = () => {
  const { data } = useReadContract({
    address: CURRENT_NETWORK_CONTRACTS.FUEL_STREAM_X,
    abi,
    functionName: 'paused',
    chainId: ETH_CHAIN.id,
    query: {
      refetchInterval: PAUSED_POLL_INTERVAL_MS,
      meta: { persist: false },
    },
  });

  return data === true;
};
