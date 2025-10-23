import { useProvider } from '@fuels/react';
import { type QueryKey, useQuery } from '@tanstack/react-query';
import type { CoinQuantity, Provider } from 'fuels';
import { useChainId } from 'wagmi';
import { useDefaultAssets } from '~portal/systems/Assets/hooks/useDefaultAssets';
import { AssetService } from '~portal/systems/Assets/services';
import type { AlchemyAssetBalance } from '~portal/systems/Assets/types';

/**
 * Fetches balances from either Fuel or Ethereum network;
 * @param address - The address to fetch balances for
 * @param isEth - Fetches via Alchemy, non-external (Fuel) fetches via Fuel SDK
 */
export function useBalances({
  address,
  isEth,
  keys,
}: {
  address: string | null | undefined;
  isEth: boolean | undefined;
  keys?: QueryKey;
}) {
  const { provider } = useProvider();
  const chainId = useChainId();
  const networkName = isEth ? 'evm' : 'fuel';

  const { defaultAssets } = useDefaultAssets();

  return useQuery<Array<CoinQuantity> | Array<AlchemyAssetBalance>>({
    queryKey: ['balances', address, networkName, ...(keys || [])],
    queryFn: async () => {
      if (isEth) {
        return await AssetService.fetchEthereumBalances(
          address,
          defaultAssets,
          chainId,
        );
      }

      return AssetService.getFuelBalances({
        address: address,
        provider: provider as Provider | undefined,
      });
    },
    // placeholderData: keepPreviousData,
    refetchOnMount: true,
    refetchInterval: 3000, // Add automatic polling for both ETH and Fuel balances
    enabled: !!address && !!defaultAssets,
  });
}
