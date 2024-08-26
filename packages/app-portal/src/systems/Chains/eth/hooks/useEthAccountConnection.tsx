'use client';
import { useModal } from 'connectkit';
import { useEffect } from 'react';
import type { PublicClient } from 'viem';
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  usePublicClient,
  useWalletClient,
} from 'wagmi';

import type { AssetEth } from '~portal/systems/Assets/utils';
import { useOverlay } from '~portal/systems/Overlay';
import { parseEthAddressToFuel } from '../utils';

export function useEthAccountConnection() {
  const overlay = useOverlay();
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: address });
  const publicClient = usePublicClient() as PublicClient;
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
    publicClient: (publicClient || undefined) as typeof publicClient,
  };
}
