import { buildBlockExplorerUrl } from 'fuels';
import { useMemo } from 'react';
import { FUEL_PROVIDER, VITE_BLOCK_EXPLORER_URL } from '~/config';

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
      if (providerUrl === FUEL_PROVIDER) {
        return `${VITE_BLOCK_EXPLORER_URL}tx/${id}`;
      }
      return buildBlockExplorerUrl({
        path: `transaction/${id || ''}`,
        providerUrl,
      });
    }
  }, [network, providerUrl, id]);

  return {
    href,
  };
}
