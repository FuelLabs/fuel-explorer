import type { Asset } from 'fuels';
import { useAssets } from '~portal/systems/Assets/hooks/useAssets';
import { useEthAccountConnection } from './useEthAccountConnection';

export const useFaucetErc20 = () => {
  const { walletClient, publicClient } = useEthAccountConnection();
  const { handlers, isLoadingFaucet } = useAssets();

  function faucetErc20({ address, asset }: { address?: string; asset: Asset }) {
    handlers.faucetErc20({
      asset,
      address,
      walletClient,
      publicClient,
    });
  }

  return {
    handlers: {
      faucetErc20: walletClient ? faucetErc20 : undefined,
    },
    isLoadingFaucet,
  };
};
