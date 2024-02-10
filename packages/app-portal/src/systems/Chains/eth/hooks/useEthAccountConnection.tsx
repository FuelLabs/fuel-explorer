import { useModal } from 'connectkit';
import {
  useAccount,
  useBalance,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  usePublicClient,
  useWalletClient,
} from 'wagmi';
import type { AssetEth } from '~/systems/Assets/utils';

import { useEffect } from 'react';
import { useOverlay } from '~/systems/Overlay';
import { parseEthAddressToFuel } from '../utils';

export function useEthAccountConnection(props?: {
  erc20Address?: `0x${string}`;
}) {
  const overlay = useOverlay();
  const { erc20Address } = props || {};
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: address });
  const { data: balance } = useBalance({
    address,
    token: erc20Address,
  });
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const { open: isConnecting, setOpen } = useModal();
  const { disconnect } = useDisconnect();
  const paddedAddress = parseEthAddressToFuel(address);

  useEffect(() => {
    overlay.settings.closeOnBlur = !isConnecting;
  }, [isConnecting]);

  async function addAsset(asset: AssetEth) {
    if (asset.address && walletClient) {
      await walletClient?.watchAsset({
        type: 'ERC20',
        options: {
          address: asset.address,
          decimals: asset.decimals,
          symbol: asset.symbol,
        },
      });
    }
  }

  function connect() {
    overlay.settings.closeOnBlur = false;
    setOpen(true);
  }

  return {
    handlers: {
      connect,
      disconnect,
      addAsset,
    },
    address,
    paddedAddress,
    ens: {
      name: ensName || undefined,
      avatar: ensAvatar || undefined,
    },
    isConnected,
    isConnecting,
    signer: walletClient || undefined,
    walletClient: walletClient || undefined,
    publicClient: publicClient || undefined,
    balance,
  };
}
