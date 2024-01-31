import { useAssets } from '~/systems/Assets/hooks/useAssets';

import { useEthAccountConnection } from './useEthAccountConnection';

export const useFaucetErc20 = () => {
  const { walletClient, publicClient } = useEthAccountConnection();
  const { handlers, isLoadingFaucet } = useAssets();

  function faucetErc20({ address }: { address?: string }) {
    handlers.faucetErc20({ address, walletClient, publicClient });
  }

  return {
    handlers: {
      faucetErc20: walletClient ? faucetErc20 : undefined,
    },
    isLoadingFaucet,
  };
};
