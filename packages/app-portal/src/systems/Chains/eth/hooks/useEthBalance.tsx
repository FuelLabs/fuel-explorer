import type { HexAddress } from 'app-commons';
import { useAccount, useBalance } from 'wagmi';

export function useEthBalance(token?: HexAddress) {
  const { address } = useAccount();
  const { data: ethBalance } = useBalance({
    address,
    token,
    query: {
      refetchInterval: 5000,
    },
  });

  return {
    ethBalance,
  };
}
