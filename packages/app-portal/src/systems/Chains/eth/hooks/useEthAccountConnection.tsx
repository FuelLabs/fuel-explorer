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

import { parseEthAddressToFuel } from '../utils';

export function useEthAccountConnection(props?: {
  erc20Address?: `0x${string}`;
}) {
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

  return {
    handlers: {
      connect: () => setOpen(true),
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
