import { BLOCK_EXPLORER_URL, FUEL_CHAIN } from 'app-commons';
import { buildBlockExplorerUrl } from 'fuels';
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
      if (providerUrl === FUEL_CHAIN.providerUrl) {
        return `${BLOCK_EXPLORER_URL}tx/${id}`;
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
