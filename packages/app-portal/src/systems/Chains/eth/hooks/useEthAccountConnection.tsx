import { useModal } from 'connectkit';
import { isAddress } from 'viem';
import {
  useAccount,
  useBalance,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  usePublicClient,
  useWalletClient,
} from 'wagmi';

import { parseEthAddressToFuel } from '../utils';

import { useAsset } from './useAsset';

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
  const { asset } = useAsset({
    address: erc20Address && isAddress(erc20Address) ? erc20Address : undefined,
  });

  const { open: isConnecting, setOpen } = useModal();
  const { disconnect } = useDisconnect();
  const paddedAddress = parseEthAddressToFuel(address);

  return {
    handlers: {
      connect: () => setOpen(true),
      disconnect,
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
    asset,
  };
}
