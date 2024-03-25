import { FUEL_CHAIN } from 'app-commons';
import { buildBlockExplorerUrl } from 'fuels';
import { useMemo } from 'react';

export type ExplorerLinkProps = {
  network: 'ethereum' | 'fuel';
  providerUrl?: string;
  id: string;
};

export function useExplorerLink({
  network,
  providerUrl,
  id,
}: ExplorerLinkProps) {
  const href = useMemo<string>(() => {
    if (network === 'ethereum') {
      return `https://sepolia.etherscan.io/tx/${id}`;
    }

    if (network === 'fuel') {
      if (providerUrl === FUEL_CHAIN.providerUrl) {
        return `/tx/${id}`;
      }

      return buildBlockExplorerUrl({
        path: `transaction/${id}`,
        providerUrl,
      });
    }

    return '';
  }, [network, providerUrl, id]);

  return {
    href,
  };
}
