import { useAccount, useBalance } from 'wagmi';

export function useEthBalance(token?: `0x${string}`) {
  const { address } = useAccount();
  const { data: ethBalance } = useBalance({
    address,
    token,
  });

  return {
    ethBalance,
  };
}
