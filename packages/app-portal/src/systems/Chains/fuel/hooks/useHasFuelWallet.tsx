import { useFuel } from '@fuel-wallet/react';
import { useQuery } from '@tanstack/react-query';

export function useHasFuelWallet() {
  const { fuel } = useFuel();

  const { data: hasWallet, ...args } = useQuery({
    queryKey: ['hasWallet', fuel],
    queryFn: async () => {
      const hasWallet = await fuel?.hasWallet();
      return hasWallet || false;
    },
    initialData: true,
  });

  return {
    hasWallet,
    ...args,
  };
}
