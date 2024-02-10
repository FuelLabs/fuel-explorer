import { buildBlockExplorerUrl } from 'fuels';
import { useMemo } from 'react';
import { VITE_BLOCK_EXPLORER_URL } from '~/config';
import { FUEL_CHAIN } from '~/systems/Chains';

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
      if (providerUrl === FUEL_CHAIN.providerUrl) {
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
