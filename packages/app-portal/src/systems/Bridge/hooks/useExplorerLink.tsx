import { getBlockExplorerLink } from '@fuel-wallet/sdk';
import { useMemo } from 'react';

export type ExplorerLinkProps = {
  network: 'ethereum' | 'fuel' | string | undefined;
  providerUrl?: string;
  id?: string;
};
export function useExplorerLink({
  network,
  providerUrl,
  id,
}: ExplorerLinkProps) {
  const href = useMemo(() => {
    if (network === 'ethereum') {
      return `https://sepolia.etherscan.io/tx/${id}`;
    }

    if (network === 'fuel') {
      return getBlockExplorerLink({
        path: `transaction/${id || ''}`,
        providerUrl,
      });
    }
  }, [network, providerUrl, id]);

  return {
    href,
  };
}
